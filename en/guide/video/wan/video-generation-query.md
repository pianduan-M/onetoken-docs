---
title: Query job status
icon: bar-progress
---

## Wan video status

Poll with `task_id` for progress, state, and the final `video_url`.

---

### Basics

- **Endpoint**: `GET /v1/video/generations/{task_id}`
- **Auth**: `Bearer Token` (`Authorization: Bearer sk-xxxxxx`)
- **Content-Type**: `application/json`

---

### Path

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **task_id** | `string` | **Yes** | Task id from creation. |

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **id** | `string` | Task id. |
| **task_id** | `string` | Same. |
| **status** | `string` | `queued`, `processing`, `success`, `failed`. |
| **progress** | `integer` | 0–100. |
| **video_url** | `string` | Download URL when `success`. |
| **fail_reason** | `string` | When `failed`. |
| **created_at** | `integer` | Created at. |

---

### cURL

```bash
curl -X GET "http://192.168.5.29:4000/v1/video/generations/task_xGOhEWZIx3qiVkqL7rCE0np45eaTM2HA" \
 -H "Authorization: Bearer $YOUR_API_KEY"
```

---

### Success example

```json
{
  "id": "task_xGOhEWZIx3qiVkqL7rCE0np45eaTM2HA",
  "task_id": "task_xGOhEWZIx3qiVkqL7rCE0np45eaTM2HA",
  "object": "video",
  "model": "wan2.6-i2v-flash",
  "status": "success",
  "progress": 100,
  "video_url": "https://example.com/output/wan_video_result.mp4",
  "created_at": 1775026176
}
```

---

### Notes

1. **Polling**: Jobs take time—poll every 5–10s until terminal state.
2. **State machine**: `queued` / `processing` → show progress; `success` → use `video_url`; `failed` → show `fail_reason`.
3. **Host**: Replace test IP with production before launch.
