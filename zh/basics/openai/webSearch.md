---
title: "OpenAI API 联网搜索使用指南"
sidebarTitle: "联网搜索"
icon: globe
---

你可以通过 OneToken 的 Responses API 和 `web_search` 工具，让 GPT 系列模型搜索最新信息并返回来源引用。本页介绍调用方式、响应结构和计费规则。

## 接入方式

在 OneToken 中，使用 **Responses API（`/v1/responses`）**，并在 `tools` 中添加 **`web_search`** 即可启用联网搜索。**默认分组的 API Key 即可使用，无需额外开通。**

```
端点：   POST https://onetoken.one/v1/responses
工具：   tools: [{"type": "web_search"}]
模型：   gpt-5.5 / gpt-5.4（实测验证）
```

## 模型表现参考

以下为原文记录的 2026 年 6 月 11 日测试数据，供选型参考。搜索次数、延迟和 token 用量会随问题与搜索结果变化。

| 模型    | 联网结果                                            | 引用                   | 单次问答搜索次数 | 延迟  |
| ------- | --------------------------------------------------- | ---------------------- | ---------------- | ----- |
| gpt-5.4 | ✅ 准确返回当周新闻                                 | ✅ 结构化 url_citation | 1 次             | ~11s |
| gpt-5.5 | ✅ 准确返回当周新闻（自动界定时间窗、多源交叉验证） | ✅ 结构化 url_citation | ~8 次           | ~51s |

<Tip>
  如果你更关注速度和成本，可以选择 **gpt-5.4**；如果需要更广的检索范围，可以选择 **gpt-5.5**。搜索轮次和检索内容增加时，费用与延迟也会相应增加。
</Tip>

## 快速上手

将示例中的 `YOUR_ONETOKEN_API_KEY` 替换为你的 OneToken API Key。

### cURL

```bash theme={null}
curl https://onetoken.one/v1/responses \
  -H "content-type: application/json" \
  -H "authorization: Bearer YOUR_ONETOKEN_API_KEY" \
  -d '{
    "model": "gpt-5.4",
    "max_output_tokens": 8192,
    "tools": [{"type": "web_search"}],
    "input": "Anthropic 最近一周发布了什么新模型？请搜索并附来源链接"
  }'
```

### Python（OpenAI SDK）

```python theme={null}
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_ONETOKEN_API_KEY",  # 默认分组即可
    base_url="https://onetoken.one/v1",
)

resp = client.responses.create(
    model="gpt-5.4",                  # 或 gpt-5.5
    max_output_tokens=8192,           # 建议至少 8192；推理 token 也占用此额度
    tools=[{"type": "web_search"}],
    input="Anthropic 最近一周发布了什么新模型？请搜索并附来源链接",
)

# 1) 最终回答文本
print(resp.output_text)

# 2) 本次实际搜索次数（计费依据，见下文）
search_calls = [item for item in resp.output if item.type == "web_search_call"]
print(f"本次搜索 {len(search_calls)} 次")

# 3) 来源引用（结构化 url_citation）
for item in resp.output:
    if item.type == "message":
        for content in item.content:
            for ann in getattr(content, "annotations", []) or []:
                print(f"来源: {ann.title} | {ann.url}")
```

### 响应结构说明

`output` 数组按执行顺序包含：

| item type         | 含义                                                                  |
| ----------------- | --------------------------------------------------------------------- |
| `web_search_call` | 一次实际执行的搜索（**计费按此条目数**）                              |
| `reasoning`       | 模型推理过程（gpt-5 系列）                                            |
| `message`         | 最终回答，其 `content[].annotations` 含 `url_citation`（title + url） |

`status` 为 `completed` 表示响应已完成。如果返回 `incomplete`，请检查 `incomplete_details`；若原因为输出 token 达到上限，可以调大 `max_output_tokens` 后重试。

## 计费说明

联网搜索费用包括**工具调用费**和**检索内容 token 费**：

| 项目                  | 价格                            | 说明                                                                                                                                        |
| --------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **工具调用费**        | **\$10 / 1000 次**（\$0.01/次） | **工具名：`web_search`**；按响应 `output` 中 `web_search_call` 条目数计——一次提问可能触发多次搜索（gpt-5.4 通常 1 次，gpt-5.5 通常 5–8 次） |
| **检索内容 token 费** | 按模型标准 input 价             | 搜索结果会注入模型上下文，按 input token 计费。**这部分往往是大头**：实测 gpt-5.4 单次问答约 9k input token，gpt-5.5 约 48–54k              |

<Info>
  原文测试中的单次问答开销参考：gpt-5.4 约为 \$0.01 搜索费加 9k input token 费用；gpt-5.5 约为 \$0.08 搜索费加 50k input token 费用。实际费用请以 OneToken 当前计费规则和调用账单为准。
</Info>

## 注意事项

1. **使用 Responses API 和 `web_search` 工具**：gpt-5 系列模型不支持 Chat Completions 的 `web_search_options` 参数，使用该参数会返回 400 `Unknown parameter: 'web_search_options'`。该参数用于 `*-search-preview` 专用模型。
2. **建议将 `max_output_tokens` 设置为至少 8192**：该额度同时包含推理 token 和最终回答 token。上限过小时，响应可能因额度耗尽而返回 `status: "incomplete"`；即使没有最终回答，已消耗的 token 仍会计费。
3. 旧版工具类型 `web_search_preview` 同样可用，行为一致；新接入建议直接用 `web_search`。
4. 如需控制成本，可以选用 gpt-5.4，或在提示词中要求减少搜索次数，例如“最多搜索 2 次”。提示词不能保证搜索次数上限，请以实际返回的 `web_search_call` 数量为准。

## FAQ

**Q：怎么确认这次回答真的联网了？**

A：检查响应 `output` 中是否包含 `type="web_search_call"` 的条目，并查看 `message` 的 `content[].annotations` 中是否包含 `url_citation`。搜索调用记录和来源引用可以帮助你核对工具执行情况；不要仅凭回答正文判断是否联网。

**Q：需要更换分组或使用特殊 API Key 吗？**

A：不需要。你可以使用 OneToken 默认分组的 API Key 调用联网搜索。

**Q：支持哪些模型？**

A：本页示例使用 gpt-5.4，也可以改为 gpt-5.5。其他模型是否可用，请以 OneToken 当前支持的模型和工具能力为准，并在接入前检查搜索调用记录与来源引用。

## 相关文档

<CardGroup cols={2}>
  <Card title="API 快速开始" icon="sparkles" href="/zh/guide/basics/quickstart">
    了解 OneToken API 的基础调用方式
  </Card>

  <Card title="API 使用手册" icon="book-open" href="/zh/guide/api/user-manual">
    查看 API Key、模型和调用配置说明
  </Card>
</CardGroup>
