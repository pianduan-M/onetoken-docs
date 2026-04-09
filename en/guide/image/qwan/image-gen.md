---
title: Image generation
icon: image
---

## Bailian Qwen-Image series

Generate images with Tongyi Qwen Bailian Qwen-Image models. Supports prompt refinement and strong Chinese-style semantics.

---

### Basics

- **Endpoint**: `POST /v1/images/generations`
- **Auth**: `Bearer Token`
- **Content-Type**: `application/json`

### Model overview

| **Model** | **Summary** | **Output** |
| --- | --- | --- |
| wan2.6-t2i `**recommended**` | Wanxiang 2.6—free size within total pixel and aspect constraints (same idea as 2.5) | Resolution: total pixels in [1280×1280, 1440×1440]; aspect [1:4, 4:1]; PNG |
| wan2.5-t2i-preview `**recommended**` | Wanxiang 2.5 preview—flexible sizing within pixel/aspect bounds (e.g. 768×2700; 2.2 and below cap single side at 1400) | |
| wan2.2-t2i-flash | Wanxiang 2.2 flash—~50% faster than 2.1 | Resolution: both sides in [512, 1440]; PNG |
| wan2.2-t2i-plus | Wanxiang 2.2 plus—better stability vs 2.1 | |
| wanx2.1-t2i-turbo | Wanxiang 2.1 flash | |
| wanx2.1-t2i-plus | Wanxiang 2.1 plus | |
| wanx2.0-t2i-turbo | Wanxiang 2.0 flash | |

### Request body

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **model** | `string` | **Yes** | e.g. `qwen-image-plus` or `qwen-image-max`. |
| **content** | `string` | **Yes** | Image description text. |
| **parameters** | `object` | No | Generation controls. |
| └─ **negative_prompt** | `string` | No | Things to avoid. |
| └─ **prompt_extend** | `boolean` | No | AI prompt expansion (default true). |
| └─ **watermark** | `boolean` | No | Add watermark or not. |
| └─ **size** | `string` | No | e.g. `1328*1328`, `1024*1024`; width and height each 512–1440. |
| └─ **n** | `integer` | No | Number of images, 1–4, default `4`. Billed per image—use `1` for tests. |
| └─ **seed** | `integer` | No | Seed in `[0, 2147483647]`. Same seed tends to stabilize output but is not a hard guarantee. |

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **created** | `integer` | Unix timestamp. |
| **data** | `array` | Results. |
| └─ **url** | `string` | Download URL. |
| └─ **b64_json** | `string` | Base64 if requested. |
| └─ **revised_prompt** | `string` | Prompt after AI refinement. |

---

### Request example

```json
{
    "model": "wan2.2-t2i-flash",
    "prompt": "A kitten running on grass, cinematic look, natural light and shadow",
    "parameters":{
        "size": "960*1390"
    }
}
```

### Response example

```json
{
  "created": 1713833628,
  "data": [
    {
      "url": "https://example.com/qwen_output_image.png",
     	"b64_json": "",
      "revised_prompt": ""
    }
  ]
}
```

---

### Tips

1. **Chinese semantics**: Qwen is strong on idioms, couplets, and Chinese motifs (e.g. Yueyang Tower, blue-and-white porcelain).
2. **Prompt extend**: Keeping `prompt_extend: true` usually yields richer detail.
