---
title: Image editing
icon: brush
---

## Bailian Qwen-Image series

Edit or generate from a reference (depth, edges, etc.) plus a prompt using Qwen-Image-Edit on Bailian.

---

### Basics

- **Endpoint**: `POST /v1/images/edits`
- **Auth**: `Bearer Token` (`Authorization: Bearer sk-xxxxxx`)
- **Content-Type**: `application/json`

---

### Request body

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **model** | `string` | **Yes** | e.g. `qwen-image-edit-plus`. |
| **input** | `object` | **Yes** | Input wrapper. |
| └─ **messages** | `array` | **Yes** | Message list. |
| └─ └─ **role** | `string` | **Yes** | Usually `user`. |
| └─ └─ **content** | `array` | **Yes** | Mix of `image` (reference URL) and `text` (edit instruction). |
| **parameters** | `object` | No | Controls. |
| └─ **n** | `integer` | No | Number of outputs. |
| └─ **negative_prompt** | `string` | No | Negative prompt. |
| └─ **prompt_extend** | `boolean` | No | Auto expand prompt (default true). |
| └─ **watermark** | `boolean` | No | Watermark on/off. |
| └─ **size** | `string` | No | Output size. |

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **created** | `integer` | Unix timestamp. |
| **data** | `array` | Results. |
| └─ **url** | `string` | Edited image URL. |
| └─ **b64_json** | `string` | Base64 data. |
| └─ **revised_prompt** | `string` | Final prompt after optimization. |

---

### Request example

```json
{
  "model": "qwen-image-edit-plus",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "image": "https://example.com/reference_depth_map.webp"
          },
          {
            "text": "Generate an image consistent with the depth map: a rusty red bicycle on a muddy path, dense old-growth forest in the background"
          }
        ]
      }
    ]
  },
  "parameters": {
    "n": 1,
    "prompt_extend": true,
    "watermark": false
  }
}
```

---

### Tips

1. **Reference mode**: Unlike OpenAI alpha-mask editing, Qwen edit is often used for **structure control**—depth maps, line art, etc.—then generate to match the text.
2. **Multimodal input**: `content` should include both an `image` object and a `text` object so the model has visual and textual guidance.
