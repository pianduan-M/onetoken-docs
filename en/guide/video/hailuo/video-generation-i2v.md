---
title: Create image-to-video job
icon: image
---

## Hailuo image-to-video

Upload a start frame and animate it with text + camera commands.

---

## Quick flow

```
1. Submit job → get task_id
2. Poll status → wait until status is completed for a public URL
```

### Basics

- **Endpoint**: `POST /v1/video/generations`
- **Auth**: `Bearer Token` (`Authorization: Bearer {{YOUR_API_KEY}}`)
- **Content-Type**: `application/json`

---

### Request body

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **model** | `string` | **Yes** | e.g. `MiniMax-Hailuo-2.3`, `MiniMax-Hailuo-2.3-Fast`, `I2V-01-Director`. |
| **prompt** | `string` | **Yes** | Motion description, max 2000 chars; optional bracket camera tags (see below). |
| **duration** | `integer` | **Yes** | `6` or `10` (model-dependent). |
| **metadata** | `object` | **Yes** | Extensions. |
| └─ **first_frame_image** | `string` | **Yes** | Start frame: public URL or base64 data URL. |
| └─ **resolution** | `string` | No | `512P`, `768P`, `1080P`. |
| └─ **prompt_optimizer** | `boolean` | No | Auto refine prompt (default true). |
| └─ **callback_url** | `string` | No | Status webhook. |
| └─ **aigc_watermark** | `boolean` | No | Watermark (default false). |

---

### Image rules

- **Formats**: JPG, JPEG, PNG, WebP
- **Size**: &lt; 20MB
- **Dimensions**: short edge &gt; 300px; aspect between 2:5 and 5:2

---

### Camera commands (sample)

- **Dolly**: `[dolly in]`, `[dolly out]`
- **Truck / pedestal**: `[truck left]`, `[truck right]`, `[pedestal up]`, `[pedestal down]`
- **Pan / tilt**: `[pan left]`, `[pan right]`, `[tilt up]`, `[tilt down]`
- **Zoom**: `[zoom in]`, `[zoom out]`

> **Compatibility:** Production may require **Chinese** bracket tags per the vendor. If needed, copy those literals from the Chinese documentation.

---

### Example

```json
{
  "model": "MiniMax-Hailuo-2.3",
  "prompt": "Contemporary dance, the people in the picture are performing, [dolly in]",
  "duration": 6,
  "metadata": {
    "first_frame_image": "https://example.com/start_frame.png",
    "resolution": "1080P",
    "prompt_optimizer": true,
    "aigc_watermark": false
  }
}
```

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **task_id** | `string` | Id for status polling. |
| **status** | `string` | e.g. `queued`, `processing`. |

---

### Notes

1. **Align prompt with image**: Describe motion that fits the frame; mismatched action vs. static scene may look poor.
2. **Speed**: `MiniMax-Hailuo-2.3-Fast` for faster turnaround.
3. **10s + `MiniMax-Hailuo-02`**: max `768P`.
