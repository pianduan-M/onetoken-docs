---
title: Image editing
icon: brush
---

## Bailian Qwen-Image series

Use Qwen-Image-Edit (Tongyi Qwen Bailian) to generate or edit images from reference images (such as depth maps or edge maps) plus prompts.

---

### Model preview

#### Qwen models

| **Model**                       | **Summary**                                                                   | **Output image spec**                                                                                                                                                                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| qwen-image-edit-plus            | Qwen image editing Plus series with multi-image output and custom resolution. | Resolution:<br /> - **Configurable**: width and height each in `[512, 2048]` pixels.<br /> - **Default**: total pixels near 1024\*1024, with aspect ratio close to the input image (or the last image for multi-image input).<br />Format: PNG<br />Count: 1-6 images |
| qwen-image-edit-plus-2025-12-15 |                                                                               |                                                                                                                                                                                                                                                                       |
| qwen-image-edit                 | Supports single-image editing and multi-image fusion.                         | Resolution: **not configurable**. Uses the same **default** rule above.<br />Format: PNG<br />Count: fixed at 1 image                                                                                                                                                 |

### Basics

- **Endpoint**: `POST /v1/images/edits`
- **Auth**: `Bearer Token` (`Authorization: Bearer sk-xxxxxx`)
- **Content-Type**: `application/json`

---

### Request headers

**Content-Type** `string` **(required)**

Must be `application/json`.

**Authorization** `string` **(required)**

Bearer API key auth. Example: `Bearer sk-xxxx`.

### Request body

Qwen format.

| Field                  | Type      | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :--------------------- | :-------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **model**              | `string`  | **Yes**  | Model name, e.g. `qwen-image-edit-plus`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **input**              | `object`  | **Yes**  | Input object.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| └─ **messages**        | `array`   | **Yes**  | Message list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| └─ └─ **role**         | `string`  | **Yes**  | Role, usually `user`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| └─ └─ **content**      | `array`   | **Yes**  | Array containing `image` and `text`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| └─ └─ └─ **image**     | `string`  | Yes      | - Formats: JPG, JPEG, PNG, BMP, TIFF, WEBP, GIF.<br />- Output format is PNG; for GIF input, only the first frame is processed.<br />- Recommended resolution: both width and height between 384 and 3072 pixels.<br />- File size: &lt;=10MB.<br />- For file uploads, the platform auto-converts to base64. For public URLs, use Qwen-format parameters.<br />**Supported input forms**:<br />1) Public URL (HTTP/HTTPS), e.g. <br />2) Temporary OSS URL (obtained via upload), e.g. <br />3) Base64 string, e.g. |
| └─ └─ └─ **text**      | `string`  | Yes      | Positive prompt describing target content/style/composition.<br />Supports Chinese/English, max 800 chars (extra chars truncated).<br />Example: Make the girl in image 1 wear the black dress from image 2 and sit in the pose from image 3, while keeping hairstyle/expression unchanged and motion natural.<br />**Note**: `content` must contain exactly one `text` object, otherwise the request fails.                                                                                                      |
| **parameters**         | `object`  | No       | Control parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| └─ **n**               | `integer` | No       | Number of output images, default 1.<br />For qwen-image-2.0 series, qwen-image-edit-max, qwen-image-edit-plus series: 1-6 images.<br />For `qwen-image-edit`: only 1 image.                                                                                                                                                                                                                                                                                                                                       |
| └─ **negative_prompt** | `string`  | No       | Negative prompt for undesired content.<br />Supports Chinese/English, max 500 chars (extra truncated).<br />Example: low resolution, errors, worst quality, low quality, missing parts, extra fingers, bad proportions, etc.                                                                                                                                                                                                                                                                                      |
| └─ **watermark**       | `boolean` | No       | Add watermark or not.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| └─ **seed**            | `integer` | No       | Random seed in `[0,2147483647]`.<br />Same seed can improve consistency, but exact reproducibility is not guaranteed.                                                                                                                                                                                                                                                                                                                                                                                             |

---

### Response

**Status: 200 OK**

| Field                 | Type      | Description                               |
| :-------------------- | :-------- | :---------------------------------------- |
| **created**           | `integer` | Unix timestamp.                           |
| **data**              | `array`   | Results list.                             |
| └─ **url**            | `string`  | Edited image URL.                         |
| └─ **b64_json**       | `string`  | Base64 image data.                        |
| └─ **revised_prompt** | `string`  | Final optimized prompt used by the model. |

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
            "text": "Generate an image consistent with the depth map: a rusty red bicycle on a muddy path, with dense old-growth forest in the background"
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

### Developer tips

1. **Reference-image mode**: Unlike OpenAI alpha-mask editing, Qwen edit is often used for structural control (e.g. depth maps/line art), then generation follows your prompt.
2. **Multimodal input**: `content` must include both an `image` object and a `text` object so the model has both visual and textual guidance.
