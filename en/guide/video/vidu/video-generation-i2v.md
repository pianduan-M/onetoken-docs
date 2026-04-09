---
title: Create image-to-video job
icon: image
---

## Vidu image-to-video

One start image plus a prompt for coherent video. Supports synced audio, custom voice, off-peak.

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
| **model** | `string` | **Yes** | `viduq3-turbo`, `viduq3-pro`, `viduq2`, `viduq1`. |
| **prompt** | `string` | **Yes** | Motion description, max 5000 chars. |
| **images** | `array` | **Yes** | **Start frame**—exactly 1 image (URL or base64). |
| **duration** | `integer` | No | Default 5s. Q3: 1–16s; Q2: 1–10s. |
| **seed** | `integer` | No | Default 0 = random. |
| **metadata** | `object` | No | Extra options. |
| └─ **audio** | `boolean` | No | Audio sync (default true). |
| └─ **audio_type** | `string` | No | `all`, `speech_only`, `sound_effect_only`. |
| └─ **voice_id** | `string` | No | Voice id (voice clone; Q3 not supported). |
| └─ **off_peak** | `boolean` | No | Off-peak, 48h window, lower credits. |
| └─ **callback_url** | `string` | **Yes** | Status webhook. |
| └─ **is_rec** | `boolean` | No | System prompt suggestions (+10 credits). |

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

---

### Example

```json
{
"model": "viduq3-turbo",
"prompt": "Contemporary dance, the people in the picture are performing contemporary dance.",
"images": [
"https://example.com/dance_start_frame.png"
],
"duration": 7,
"metadata": {
"audio": true,
"audio_type": "all",
"callback_url": "https://your-api.com/callback/vidu-i2v",
"off_peak": false
}
}
```

---

### Notes

1. **audio_type**: Fine-grained split only on Q2 / Q1.
2. **Off-peak**: Auto-cancel and refund if not done in 48h; you can cancel earlier.
3. **is_rec**: Turn on if you want the system to refine the prompt (+10 credits).
4. **Callback signing**: Verify Vidu signatures on your server.
