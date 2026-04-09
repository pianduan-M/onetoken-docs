---
title: Gemini native format
icon: google
---

## Gemini content generation (native format)

Call Gemini multimodal models (e.g. Nano Banana) with native `generateContent`: text, images, and optional “thinking” traces.

---

### Basics

- **Endpoint**: `POST /v1beta/models/{model}:generateContent/`
- **Path**: `model` — e.g. `gemini-3-pro-image-preview`.
- **Auth**: `Bearer Token`
- **Content-Type**: `application/json`

---

### Request body

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **contents** | `array` | **Yes** | Conversation turns. |
| └─ **role** | `string` | No | e.g. `user`. |
| └─ **parts** | `array` | **Yes** | Message parts. |
| └─ └─ **text** | `string` | **Yes** | Prompt / text input. |
| **generationConfig** | `object` | **Yes** | Generation settings. |
| └─ **responseModalities** | `array` | **Yes** | `TEXT`, `IMAGE`, etc. |
| └─ **thinkingConfig** | `object` | No | Thinking / chain-of-thought. |
| └─ └─ **includeThoughts** | `boolean` | No | Return model “thoughts” before the answer. |
| └─ **imageConfig** | `object` | **Yes** | Image settings. |
| └─ └─ **aspectRatio** | `string` | **Yes** | e.g. `16:9`, `1:1`, `4:3`. |
| └─ └─ **imageSize** | `string` | **Yes** | e.g. `4K`, `1024x1024`. |

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **candidates** | `array` | Model outputs. |
| └─ **content** | `object` | Role + `parts` (text and/or image). |
| └─ **finishReason** | `string` | e.g. `STOP`. |
| └─ **safetyRatings** | `array` | Safety scores. |
| **usageMetadata** | `object` | Token usage (prompt, candidates, total). |

---

### Example (image)

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "draw a futuristic city at sunset"
        }
      ]
    }
  ],
  "generationConfig": {
    "responseModalities": ["TEXT", "IMAGE"],
    "imageConfig": {
      "aspectRatio": "16:9",
      "imageSize": "4K"
    },
    "thinkingConfig": {
      "includeThoughts": true
    }
  }
}
```

---

### Tips

1. **Thoughts**: `includeThoughts: true` surfaces how the model interprets the prompt—useful for debugging complex prompts.
2. **Multimodal**: With both `TEXT` and `IMAGE`, you often get explanatory text then the image.
3. **Model id**: Ensure `{model}` matches what your key can access.
