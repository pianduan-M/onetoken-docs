---
title: Get video job status
icon: bar-progress
---

## Vidu video

Poll by `task_id` for status, download URL, cover, audio stems, and credits used.

---

### Basics

- **Endpoint**: `GET /v1/video/generations/{task_id}`
- **Auth**: `Bearer Token` (`Authorization: Bearer {{YOUR_API_KEY}}`)
- **Content-Type**: `application/json`

---

### Path

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **task_id** | `string` | **Yes** | From job creation. |

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **code** | `string` | e.g. `success`. |
| **data** | `object` | Payload. |
| ├─ **status** | `string` | `QUEUED`, `PROCESSING`, `SUCCESS`, `FAILED`. |
| ├─ **progress** | `string` | e.g. `"100%"`. |
| ├─ **result_url** | `string` | Final MP4. |
| ├─ **submit_time** | `integer` | Submitted at. |
| ├─ **finish_time** | `integer` | Finished at. |
| └─ **data** (nested) | `object` | Video metadata. |
| &nbsp;&nbsp;&nbsp;└─ **creations** | `array` | Artifacts. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **cover_url** | `string` | Cover image. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **speech_url** | `string` | Dialogue / voice stem. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **sound_url** | `string` | SFX stem. |

---

### cURL

```bash
curl -X GET "https://api.your-server.com/v1/video/generations/task_LK8YADXPxyoGME6wv79x8qId62v76PO5" \
 -H "Authorization: Bearer $YOUR_API_KEY"
```

---

### Completed example

```json
{
"code": "success",
"message": "",
"data": {
"task_id": "task_LK8YADXPxyoGME6wv79x8qId62v76PO5",
"status": "SUCCESS",
"progress": "100%",
"result_url": "https://cdn.vidu.com/video.mp4?auth_key=...",
"submit_time": 1774597865,
"finish_time": 1774598074,
"properties": {
"upstream_model_name": "viduq3-turbo"
},
"data": {
"aspect_ratio": "16:9",
"resolution": "1080p",
"creations": [
{
"id": "935021721856000000",
"url": "https://cdn.vidu.com/video.mp4",
"cover_url": "https://cdn.vidu.com/cover.jpeg"
}
],
"credits": 98
}
}
}
```

---

### Notes

1. **URL expiry**: `result_url` / `cover_url` often use short-lived presigned URLs (~24h)—mirror to your storage quickly.
2. **Stems**: With audio enabled, use `speech_url` and `sound_url` for editing.
3. **Progress**: `data.progress` maps to GPU progress for UI.
4. **Credits**: `data.data.credits` is actual quota spent for reconciliation.
