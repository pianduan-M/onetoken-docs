---
title: Create video generation job
icon: image
---

## Veo image-to-video

Start image + prompt for high-quality video. (Doc mirrors upstream fields; includes audio/voice/off-peak notes where listed.)

---

## Quick flow

```
1. Submit job → get task_id
2. Poll status → wait until succeeded for a public URL
```

### Basics

- **Endpoint**: `POST /v1/video/generations`
- **Auth**: `Bearer Token` (`Authorization: Bearer {{YOUR_API_KEY}}`)
- **Content-Type**: `application/json`

---

### Request body

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **model** | `string` | **Yes** | e.g. `veo-2.0-generate-001`, `veo-3.0-fast-generate-001`, `veo-3.0-generate-001`, `veo-3.1-fast-generate-preview`, `veo-3.1-generate-preview`. |
| **prompt** | `string` | **Yes** | Motion description, max 5000 chars. |
| **aspect_ratio** | `string` | **Yes** | Aspect ratio. |
| **images** | `array` | **Yes** | First frame via `input_reference` (Veo 3.1); when used, `seconds` is fixed to `"8"`. |
| **seconds** | `integer` | No | Veo 3 / 3.1: `"4"`, `"6"`, `"8"`; Veo 2: `"5"`–`"8"` (default `"8"`). |
| **size** | `string` | No | `720p` (default), `1080p`, `4k` (4K Veo 3+), or pixel sizes like `1280x720`, `1920x1080`. |

---

### Image rules

- **Formats**: PNG, JPEG, JPG, WebP
- **Size**: ≤ 50MB file (POST body limit 20MB)
- **Aspect**: between **1:4 and 4:1**

---

### Response

**200 OK (submitted)**

| Field | Type | Description |
| :-- | :-- | :-- |
| **id** | `string` | Instance id. |
| **task_id** | `string` | Poll id. |
| **status** | `string` | e.g. `queued`. |
| **progress** | `integer` | Percent. |
| **created_at** | `integer` | Created at. |

```json
{
  "id": "task_MQKsdsosLYRreob4Z4NzTFxZKtSoVRWZ",
  "task_id": "task_MQKsdsosLYRreob4Z4NzTFxZKtSoVRWZ",
  "object": "video",
  "model": "veo-2.0-generate-001",
  "status": "queued",
  "progress": 0,
  "created_at": 1775116001
}
```

---

### Request example

```json
{
  "model": "Veoq3-turbo",
  "prompt": "Contemporary dance, the people in the picture are performing contemporary dance.",
  "images": ["https://example.com/dance_start_frame.png"],
  "duration": 7
}
```

---

### Notes

1. **audio_type** split (SFX vs speech) applies on Q2 / Q1 models only, per upstream docs.
2. **Off-peak**: Jobs not finished in 48h may auto-cancel with refund; you can cancel earlier.
3. **is_rec**: System prompt optimization when unsure (+ credits).
4. **Callback signing**: Verify Veo webhook signatures server-side.
