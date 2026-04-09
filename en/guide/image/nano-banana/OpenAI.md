---
title: OpenAI chat format
icon: openai
---

## OpenAI chat format (Chat Completions + Gemini image)

Standard OpenAI Chat Completions, with chat-style prompts driving Gemini image generation.

---

### Basics

- **Endpoint**: `POST /v1/chat/completions`
- **Auth**: `Bearer Token`
- **Content-Type**: `application/json`

---

### Request body

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **model** | `string` | **Yes** | e.g. `gemini-3-pro-image-preview`. |
| **messages** | `array` | **Yes** | Chat messages. |
| └─ **role** | `string` | **Yes** | `user`, `assistant`, `system`. |
| └─ **content** | `string` | **Yes** | Prompt, e.g. “draw a cat”. |
| **stream** | `boolean` | **Yes** | Streaming; use `false` for image generation. |
| **extra_body** | `object` | No | Vendor extensions. |
| └─ **google** | `object` | No | Google-specific block. |
| └─ └─ **image_config** | `object` | No | Image settings. |
| └─ └─ └─ **aspect_ratio** | `string` | No | e.g. `16:9`, `1:1`. |
| └─ └─ └─ **image_size** | `string` | No | e.g. `2K`, `4K`. |

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **id** | `string` | Request id. |
| **object** | `string` | `chat.completion`. |
| **choices** | `array` | Results. |
| └─ **message** | `object` | `role` + `content` (image often as Markdown + base64). |
| └─ **finish_reason** | `string` | e.g. `stop`. |
| **usage** | `object` | Token usage. |

---

### Request example

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

### Response example

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

### Tips

1. **Extracting images**: `content` often embeds `![image](data:image/jpeg;base64,...)`—parse the data URI for display.
2. **extra_body**: Standard OpenAI SDK extension slot for vendor options without breaking the protocol.
3. **Mock**: For local tests, `http://127.0.0.1:4523/mock/7707339`.
