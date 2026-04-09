---
title: Image editing
icon: brush
---

Edit or outpaint an image from a source image and prompt (inpainting, local changes, etc.).

---

### Basics

- **Endpoint**: `POST /v1/images/edits/`
- **Host**: `https://onetoken.one`
- **Auth**: `Bearer Token`
- **Content-Type**: `multipart/form-data` (file upload—use form data)

---

### Form fields

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **image** | `file` | **Yes** | Source PNG, square, &lt; 4MB. Without `mask`, the image must include transparency (alpha) as the edit region. |
| **prompt** | `string` | **Yes** | Desired result, max 1000 chars. E.g. “A cute baby sea otter wearing a beret.” |
| **mask** | `file` | No | Mask PNG, &lt; 4MB, same size as the image. Fully transparent pixels mark regions to edit. |
| **model** | `string` | No | e.g. `dall-e-2`. |
| **n** | `integer` | No | Number of images (1–10), default 1. |
| **size** | `string` | No | `256x256`, `512x512`, or `1024x1024`. |
| **response_format** | `string` | No | `url` or `b64_json`. |
| **user** | `string` | No | End-user id. |

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **created** | `integer` | Creation timestamp. |
| **data** | `array` | Results. |
| └─ **url** | `string` | Edited image URL. |
| └─ **b64_json** | `string` | Base64 image data. |

---

### cURL example

```bash
curl https://onetoken.one/v1/images/edits/ \
  -H "Authorization: Bearer $YOUR_API_KEY" \
  -F image="@otter.png" \
  -F mask="@mask.png" \
  -F prompt="A cute baby sea otter wearing a beret" \
  -F n=1 \
  -F size="1024x1024"
```

---

### Notes

1. **PNG only**—editing relies on the alpha channel to mark regions to repaint.
2. **Mask behavior**
   - With `mask`, transparent areas of the mask are edited.
   - Without `mask`, transparent areas of `image` are edited.
3. **Square images**—input must be 1:1.
