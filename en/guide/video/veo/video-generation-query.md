---
title: Get video job status
icon: bar-progress
---

## Veo video

Poll by `task_id` for status and the playable URL when the job succeeds.

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

---

### cURL

```bash
curl -X GET "https://api.your-server.com/v1/video/generations/task_LK8YADXPxyoGME6wv79x8qId62v76PO5" \
 -H "Authorization: Bearer $YOUR_API_KEY"
```

---

### Example (completed)

```json
{
  "code": "success",
  "message": "",
  "data": {
    "error": null,
    "format": "mp4",
    "metadata": null,
    "status": "succeeded",
    "task_id": "task_**",
    "url": "https://onetoken.one/v1/videos/task_MQKsdsosLYRreob4Z4NzTFxZKtSoVRWZ/content"
  }
}
```

### Status codes

```json
  VeoStatusPending = "pending"
  VeoStatusImageDownloading = "image_downloading"
  VeoStatusVideoGenerating = "video_generating"
  VeoStatusVideoGenerationCompleted = "video_generation_completed"
  VeoStatusVideoGenerationFailed = "video_generation_failed"
  VeoStatusVideoUpsampling = "video_upsampling"
  VeoStatusVideoUpsamplingCompleted = "video_upsampling_completed"
  VeoStatusVideoUpsamplingFailed = "video_upsampling_failed"
  VeoStatusCompleted = "completed"
  VeoStatusFailed = "failed"
  VeoStatusError = "error"
```

---

### Notes

1. **URL expiry**: Some providers return short-lived presigned URLs (`X-Amz-Signature`, ~24h)—copy to your storage promptly.
2. **Audio stems**: If the job created separate speech/SFX URLs, use them for post-production (when applicable).
3. **Progress**: Use `data.progress` for UI when present.
4. **Credits**: Use nested credit fields for billing reconciliation when the API returns them.

---
