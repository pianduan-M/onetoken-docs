---
title: Create text-to-video job
icon: text
---

## Vidu video

Text-to-video with Vidu models: optional audio, off-peak mode, watermarks, and more.

---

## Quick flow

```
1. Submit job → get task_id
2. Poll status → wait until completed for a public URL
```

### Basics

- **Endpoint**: `POST /v1/video/generations`
- **Auth**: `Bearer Token` (`Authorization: Bearer {{YOUR_API_KEY}}`)
- **Content-Type**: `application/json`

---

### Request body

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **model** | `string` | **Yes** | e.g. `viduq3-turbo` (fast), `viduq3-pro` (quality), `viduq2`, `viduq1`. |
| **prompt** | `string` | **Yes** | Up to 5000 chars. |
| **duration** | `integer` | No | Seconds. Q3: 1–16; Q2: 1–10; Q1: fixed 5. |
| **seed** | `integer` | No | Random if 0 or omitted. |
| **metadata** | `object` | No | Extra options. |
| └─ **aspect_ratio** | `string` | No | Default `16:9`; `9:16`, `1:1`, etc. (3:4 / 4:3 Q2/Q3 only). |
| └─ **resolution** | `string` | No | `540p`, `720p`, `1080p` (Q1: 1080p only). |
| └─ **audio** | `boolean` | No | Audio/video together (SFX / lines). Q3 only, default true. |
| └─ **bgm** | `boolean` | No | Auto BGM, default false. |
| └─ **off_peak** | `boolean` | No | Off-peak mode: lower credits, deliver within 48h. |
| └─ **callback_url** | `string` | **Yes** | Webhook for status updates. |
| └─ **watermark** | `boolean` | No | Add watermark. |

---

### Model comparison

| Model | Strengths | Duration | Resolution |
| :-- | :-- | :-- | :-- |
| **viduq3-pro** | Top quality, vivid 3D feel | 1–16s | 540p / 720p / 1080p |
| **viduq3-turbo** | Fast, cost-effective | 1–16s | 540p / 720p / 1080p |
| **viduq2** | Latest general | 1–10s | 540p / 720p / 1080p |
| **viduq1** | Smooth cuts, stable camera | 5s | 1080p |

---

### Response

**200 OK (submitted)**

| Field | Type | Description |
| :-- | :-- | :-- |
| **id** | `string` | Task id. |
| **task_id** | `string` | Same, for polling. |
| **status** | `string` | e.g. `queued`. |
| **progress** | `integer` | Progress. |
| **created_at** | `integer` | Created at. |

---

### Example

```json
{
  "model": "viduq3-turbo",
  "prompt": "Camera on a woman sitting in a café; she looks toward the window as the camera drifts slowly, warm color grade, relaxed cozy mood.",
  "duration": 7,
  "seed": 3,
  "metadata": {
    "aspect_ratio": "16:9",
    "resolution": "1080p",
    "audio": true,
    "bgm": false,
    "off_peak": false,
    "callback_url": "https://your-api.com/v1/callback/vidu"
  }
}
```

---
