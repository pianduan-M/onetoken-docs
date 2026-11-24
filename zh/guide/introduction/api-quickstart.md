---
title: API 快速开始指南
icon: rocket
---

## 账号注册

- 💰 最低充值金额：**$1**
- 🔗 注册链接：[点击注册](https://onetoken.one/register)

## 配置步骤

### 1. 获取令牌

1. 登录后台系统
2. 进入"令牌"页面
3. 点击"添加令牌"获取 API Key

### 2. 接口配置

- 使用 OpenAI SDK 调用 Chat Completions 或 Responses 时，将 `BASE_URL` 设为 `https://onetoken.one/v1`。
- 使用 Anthropic SDK 调用 Claude Messages 时，将 `BASE_URL` 设为 `https://onetoken.one`。
- 使用 cURL、Postman 或要求填写完整接口地址的客户端时，将 `https://onetoken.one` 与下表中的请求路径拼接。

### 3. 模型选择

- 模型名称位于首页 -> "支持模型"列表的第一列

#### 按模型选择调用协议

| 厂商 / 模型 | 推荐协议 | HTTP 请求路径 |
| --- | --- | --- |
| OpenAI GPT（新接入） | OpenAI Responses | `POST /v1/responses` |
| Anthropic Claude | [Claude Messages](/zh/api/texts/general/claude-messages) | `POST /v1/messages` |
| Google Gemini | Gemini 原生 `generateContent` | `POST /v1beta/models/{model}:generateContent` |
| DeepSeek、通义千问（Qwen）、智谱 GLM、MiniMax | [OpenAI Chat Completions](/zh/api/texts/general/chat-completions) | `POST /v1/chat/completions` |

已有 Chat Completions 集成，或希望用同一套请求格式切换多个厂商时，可以继续使用 OpenAI Chat Completions。调用前请在模型详情中核对支持的接口类型。 [OneToken 模型广场](https://onetoken.one/pricing)

## 测试验证

可通过以下方式验证配置：

1. 在聊天页面进行在线测试
2. 使用 API 工具（如 Postman）进行接口测试

### OpenAI Chat Completions 配置示例

```json
{
  "base_url": "https://onetoken.one/v1",
  "api_key": "your_token_here",
  "model": "selected_model_name"
}
```

> **提示**：建议先在聊天页面进行测试，确认配置正确后再进行开发集成
