---
title: Image generation
icon: image
---

Create images from a text prompt using the native OpenAI-style API.

---

### Basics

- **Endpoint**: `POST /v1/images/generations/`
- **Host**: `https://onetoken.one`
- **Auth**: `Bearer Token`
- **Content-Type**: `application/json`

---

### Request body

| Field | Type | Required | Default | Description |
| :-- | :-- | :-- | :-- | :-- |
| **model** | `string` | No | `dall-e-2` | Model: `dall-e-2`, `dall-e-3`, or `gpt-image-1`. |
| **prompt** | `string` | **Yes** | - | Text description. Up to 32k chars for GPT-image-1. |
| **n** | `integer` | No | `1` | Number of images (1–10). `dall-e-3` only supports 1. |
| **size** | `string` | No | `1024x1024` | Size. `gpt-image-1`: `1024x1024`, `1536x1024`, `1024x1536`, or auto. |
| **background** | `string` | No | auto | Background transparency (`gpt-image-1` only): transparent, opaque, or auto. |
| **moderation** | `string` | No | auto | Moderation: low (fewer restrictions) or auto. |
| **quality** | `string` | No | - | Quality (HD / standard). |
| **style** | `string` | No | - | Style hint. |

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **created** | `integer` | Unix timestamp. |
| **data** | `array` | Image objects. |
| └─ **url** | `string` | Hosted image URL. |
| └─ **b64_json** | `string` | Base64 image data. |
| **usage** | `object` | Usage stats. |
| └─ **total_tokens** | `integer` | Total tokens for this request. |

---

### Request example

```json
{
  "model": "gpt-image-1",
  "prompt": "A cute baby sea otter",
  "n": 1,
  "size": "1024x1024",
  "background": "transparent"
}
```

### Response example

```json
{
  "created": 1713833628,
  "data": [
    {
      "url": "https://example.com/generated_image.png",
      "b64_json": ""
    }
  ],
  "usage": {
    "total_tokens": 100,
    "input_tokens": 50,
    "output_tokens": 50,
    "input_tokens_details": {
      "text_tokens": 10,
      "image_tokens": 40
    }
  }
}
```

---

### Notes

1. **Transparency**: When `background` is transparent, ensure the returned asset is PNG or WebP with an alpha channel.
2. **Model limits**: DALL·E vs GPT-image differ on `size` and `n`; pick the model that matches your constraints.
