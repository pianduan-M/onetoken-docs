---
title: Get video job status
icon: bar-progress
---

## Hailuo video

Poll by `task_id` for progress and the final download URL.

---

### Basics

- **Endpoint**: `GET /v1/video/generations/{task_id}`
- **Auth**: `Bearer Token` (`Authorization: Bearer {{YOUR_API_KEY}}`)
- **Content-Type**: `application/json`

---

### Path

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **task_id** | `string` | **Yes** | Returned when the job was created. |

---

### Response

**200 OK**

| Field | Type | Description |
| :-- | :-- | :-- |
| **code** | `string` | Business code (`"200"` = ok). |
| **message** | `string` | Message. |
| **data** | `object` | Payload. |
| ├─ **status** | `string` | `processing`, `success`, `failed`, etc. |
| ├─ **progress** | `string` | Percent string, e.g. `"50"`. |
| ├─ **result_url** | `string` | Video URL when done. |
| ├─ **fail_reason** | `string` | If failed. |
| ├─ **submit_time** | `integer` | Submitted at. |
| ├─ **finish_time** | `integer` | Finished at. |
| └─ **video_width** | `integer` | Output width. |
| └─ **video_height** | `integer` | Output height. |

---

### cURL

```bash
curl -X GET "https://api.your-server.com/v1/video/generations/task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe" \
 -H "Authorization: Bearer $YOUR_API_KEY"
```

---

### Success example

```json
{
  "code": "200",
  "message": "success",
  "data": {
    "task_id": "task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe",
    "status": "success",
    "progress": "100",
    "result_url": "https://cdn.example.com/generated_video.mp4",
    "video_width": 1280,
    "video_height": 720,
    "submit_time": 1774595255,
    "finish_time": 1774595315
  }
}
```

Possible **status** values:

- Preparing  
- Queueing  
- Processing  
- Success  
- Fail  

Allowed values: Preparing, Queueing, Processing, Success, Fail

---
