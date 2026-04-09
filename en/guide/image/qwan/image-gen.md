---
title: Image generation
icon: image
---

## Bailian Qwen-Image series

Generate images with Tongyi Qwen Bailian Qwen-Image models. The API supports prompt rewriting and strong Chinese-style semantic understanding.

---

### Basics

- **Endpoint**: `POST /v1/images/generations`
- **Auth**: `Bearer Token`
- **Content-Type**: `application/json`

### Model overview

#### Wan models

| **Model**                            | **Summary**                                                                                                                           | **Output image format**                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| wan2.6-t2i `**recommended**`         | Wan 2.6 supports flexible sizing under total-pixel and aspect-ratio constraints (same as wan2.5).                                     | Resolution: total pixels between [1280*1280, 1440*1440]; aspect ratio [1:4, 4:1]; format: PNG |
| wan2.5-t2i-preview `**recommended**` | Wan 2.5 preview supports flexible sizing under pixel/aspect constraints (for example 768\*2700; versions <=2.2 cap one side at 1400). |                                                                                               |
| wan2.2-t2i-flash                     | Wan 2.2 flash is ~50% faster than 2.1.                                                                                                | Resolution: width and height both in [512, 1440]; format: PNG                                 |
| wan2.2-t2i-plus                      | Wan 2.2 pro provides improved stability and success rate vs 2.1.                                                                      |                                                                                               |
| wanx2.1-t2i-turbo                    | Wan 2.1 turbo.                                                                                                                        |                                                                                               |
| wanx2.1-t2i-plus                     | Wan 2.1 plus.                                                                                                                         |                                                                                               |
| wanx2.0-t2i-turbo                    | Wan 2.0 turbo.                                                                                                                        |                                                                                               |

#### Qwen models

| **Model**                  | **Summary**                                                                                         | **Output image spec**                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| qwen-image-2.0-pro         | Qwen image generation/editing Pro series. Stronger text rendering, realism, and semantic following. | Resolution: free width/height, with output dimensions each within 512 to 2048. Default resolution is `2028*2048`. Format: PNG. Count: 1-6 images.                     |
| qwen-image-plus-2026-01-09 | Qwen image generation Plus series, good at diverse styles and text rendering.                       | Default resolution `1664*928`. Optional resolutions/aspect ratios: `1664*928` (**default**) 16:9, `1472*1104` 4:3, `1328*1328` 1:1, `1104*1472` 3:4, `928*1664` 9:16. |
| qwen-image                 |                                                                                                     |                                                                                                                                                                       |

### Request headers

**Content-Type** `string` **(required)**

Must be `application/json`.

**Authorization** `string` **(required)**

Bearer API key auth. Example: `Bearer sk-xxxx`.

### Request body

| Field                  | Type            | Required | Description                                                                                                                                                                                                                                                                                                 |
| ---------------------- | --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **model**              | `string`        | **Yes**  | Model name, e.g. `qwen-image-plus` or `qwen-image-max`.                                                                                                                                                                                                                                                     |
| **input**              | `object`        | **Yes**  | Image description payload.                                                                                                                                                                                                                                                                                  |
| └─ **messages**        | `array[object]` | Yes      | Message list.                                                                                                                                                                                                                                                                                               |
| └─ └─ **role**         | `string`        | No       | Role.                                                                                                                                                                                                                                                                                                       |
| └─ └─ **content**      | `array[object]` |          |                                                                                                                                                                                                                                                                                                             |
| └─ └─ └─ **text**      | `string`        |          | Prompt text.                                                                                                                                                                                                                                                                                                |
| **parameters**         | `object`        | No       | Generation controls.                                                                                                                                                                                                                                                                                        |
| └─ **negative_prompt** | `string`        | No       | Negative prompt for undesired content. Supports Chinese/English, max 500 chars (extra chars are truncated). Example: low resolution, low quality, distorted limbs/fingers, oversaturated colors, waxy skin, low face detail, over-smoothing, AI-looking artifacts, chaotic composition, blurry/warped text. |
| └─ **prompt_extend**   | `boolean`       | No       | Enable smart prompt rewriting. This optimizes only the positive prompt. `true` (**default**): enable rewriting for richer details. `false`: disable for tighter control.                                                                                                                                    |
| └─ **watermark**       | `boolean`       | No       | Add `Qwen-Image` watermark at bottom-right. Default `false`.                                                                                                                                                                                                                                                |
| └─ **size**            | `string`        | No       | Output size, e.g. `1328*1328`, `1024*1024`; width and height must both be 512-1440.                                                                                                                                                                                                                         |
| └─ **n**               | `integer`       | No       | Number of images. Range 1-4, default `4`. Billed per image; set to 1 for testing.                                                                                                                                                                                                                           |
| └─ **seed**            | `integer`       | No       | Random seed in `[0,2147483647]`. Same seed can improve consistency, but exact results are still not guaranteed.                                                                                                                                                                                             |

---

### Response

**Status: 200 OK**

| Field                 | Type      | Description                         |
| --------------------- | --------- | ----------------------------------- |
| **created**           | `integer` | Unix timestamp.                     |
| **data**              | `array`   | Generated images list.              |
| └─ **url**            | `string`  | Download URL.                       |
| └─ **b64_json**       | `string`  | Base64 image data (when requested). |
| └─ **revised_prompt** | `string`  | Final AI-optimized prompt.          |

---

### Request example

```json
{
  "model": "wan2.2-t2i-flash",
  "prompt": "A kitten running on grass, cinematic look, natural light and shadow",
  "size": "960*1390"
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
  ...
}
```

---

### Developer tips

1. **Language understanding**: Qwen models are strong at Chinese idioms, couplets, and Chinese aesthetics (e.g. Yueyang Tower, blue-and-white porcelain).
2. **Prompt optimization**: Keep `prompt_extend: true` to get richer image details.
