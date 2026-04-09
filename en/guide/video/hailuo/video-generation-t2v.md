---
title: Create text-to-video job
icon: text
---

## Hailuo (MiniMax-Hailuo) video

Text-to-video with Hailuo models. Use `[command]` syntax for camera control.

---

## Quick flow

Video jobs are **async**:

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
| **model** | `string` | **Yes** | e.g. `MiniMax-Hailuo-2.3`, `MiniMax-Hailuo-02`, `T2V-01-Director`, `T2V-01`. |
| **prompt** | `string` | **Yes** | Up to 2000 chars. Camera tags in brackets, e.g. `[truck left]`, `[dolly in]`, `[pan left]`. |
| **duration** | `integer` | No | Seconds, default 6. |
| **metadata** | `object` | No | Extra options. |
| └─ **prompt_optimizer** | `boolean` | No | Auto prompt refine (default true). |
| └─ **resolution** | `string` | No | `720P`, `768P`, `1080P`. |
| └─ **callback_url** | `string` | No | Webhook for async updates. |
| └─ **aigc_watermark** | `boolean` | No | Watermark (default false). |

---

### Camera commands

Use `[command]` in `prompt`; combine as `[pan left, pedestal up]`.

- **Truck / pedestal**: `[truck left]`, `[truck right]`, `[pedestal up]`, `[pedestal down]`
- **Pan / tilt**: `[pan left]`, `[pan right]`, `[tilt up]`, `[tilt down]`
- **Dolly / zoom**: `[dolly in]`, `[dolly out]`, `[zoom in]`, `[zoom out]`
- **Other**: `[handheld shake]`, `[follow]`, `[locked off]`

> **Compatibility:** The live API may still expect **Chinese** bracket keywords from the vendor. If a prompt is rejected, use the Chinese tag spellings from the Chinese docs or provider reference.

---

### Response

**200 OK (job created)**

| Field | Type | Description |
| :-- | :-- | :-- |
| **id** | `string` | Task id. |
| **task_id** | `string` | Same as id. |
| **status** | `string` | Often `queued` or `processing`. |
| **model** | `string` | Model used. |
| **progress** | `integer` | 0–100. |
| **created_at** | `integer` | Created at (Unix time). |

---

### Example

```json
{
  "model": "MiniMax-Hailuo-2.3",
  "prompt": "A kitten running through the forest, [dolly in], then [pan left]",
  "duration": 6,
  "metadata": {
    "prompt_optimizer": true,
    "resolution": "1080P",
    "callback_url": "https://your-server.com/callback"
  }
}
```

---

### Notes

1. **Async**: 200 only means the job was accepted—poll or use `callback_url` for the final URL.
2. **Callback verify**: MiniMax POSTs to `callback_url`; echo the `challenge` within ~3s to verify.
3. **Resolution**: `MiniMax-Hailuo-2.3` and `02` 10s clips may only allow `768P`.
