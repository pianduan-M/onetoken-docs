---
title: OpenAI 聊天格式
icon: openai
---

## OpenAI 聊天格式 (OpenAI Chat Format / Gemini Image)

该接口采用标准的 OpenAI Chat Completions 结构进行封装，允许通过聊天指令触发 Gemini 的图像生成能力。

---

### 📌 基础信息

- **接口地址**: `POST /v1/chat/completions`
- **认证方式**: `Bearer Token`
- **内容类型**: `application/json`

---

### 📥 请求参数 (Request Body)

| 参数名                    | 类型      | 必选   | 描述                                           |
| :------------------------ | :-------- | :----- | :--------------------------------------------- |
| **model**                 | `string`  | **是** | 模型名称，如 `gemini-3-pro-image-preview`。    |
| **messages**              | `array`   | **是** | 聊天上下文列表。                               |
| └─ **role**               | `string`  | **是** | 角色（`user`, `assistant`, `system`）。        |
| └─ **content**            | `string`  | **是** | 提示词内容，例如 "draw a cat"。                |
| **stream**                | `boolean` | **是** | 是否开启流式输出（图像生成建议设为 `false`）。 |
| **extra_body**            | `object`  | 否     | 扩展参数（用于配置 Gemini 特有功能）。         |
| └─ **google**             | `object`  | 否     | Google 官方配置扩展。                          |
| └─ └─ **image_config**    | `object`  | 否     | 图像生成配置。                                 |
| └─ └─ └─ **aspect_ratio** | `string`  | 否     | 纵横比，如 `16:9`, `1:1`。                     |
| └─ └─ └─ **image_size**   | `string`  | 否     | 质量级别，如 `2K`, `4K`。                      |

---

### 📤 响应结果 (Response)

**状态码: 200 OK**

| 字段名               | 类型     | 描述                                                              |
| :------------------- | :------- | :---------------------------------------------------------------- |
| **id**               | `string` | 唯一请求 ID。                                                     |
| **object**           | `string` | 对象类型，固定为 `chat.completion`。                              |
| **choices**          | `array`  | 生成结果列表。                                                    |
| └─ **message**       | `object` | 包含 `role` 和 `content`（图像通常以 Markdown Base64 形式返回）。 |
| └─ **finish_reason** | `string` | 结束原因，如 `stop`。                                             |
| **usage**            | `object` | Token 消耗统计。                                                  |

---

### 📝 请求示例

```json
{
  "model": "gemini-3-pro-image-preview",
  "stream": false,
  "messages": [
    {
      "role": "user",
      "content": "draw a cat"
    }
  ],
  "extra_body": {
    "google": {
      "image_config": {
        "aspect_ratio": "16:9",
        "image_size": "2K"
      }
    }
  }
}
```

### 📝 返回示例

```json
{
  "id": "chatcmpl-20251211...",
  "model": "gemini-3-pro-image-preview",
  "object": "chat.completion",
  "created": 1765440499,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "![image](data:image/jpeg;base64,/9j/4AAQSk...)"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 4,
    "completion_tokens": 1359,
    "total_tokens": 1363
  }
}
```

---

### 💡 开发者建议

1. **图像获取**: 响应中的图像通常以 Markdown 格式 `![image](data:image/jpeg;base64,...)` 嵌入在 `content` 中，客户端解析时需提取 Base64 部分进行展示。
2. **参数兼容**: `extra_body` 字段是标准的 OpenAI SDK 扩展字段，用于传递下游模型特有的配置，不会破坏标准的 OpenAI 协议结构。
3. **Mock 测试**: 如需本地调试，可使用 Mock 地址 `http://127.0.0.1:4523/mock/7707339`。
