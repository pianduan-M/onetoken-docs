---
title: 获取视频生成任务状态
icon: bar-progress
---

## (海螺 Hailuo 视频)

通过任务 ID 查询视频生成的实时状态、进度以及最终的视频下载链接。

---

### 基础信息

- **接口地址**: `GET /v1/video/generations/{task_id}`
- **认证方式**: `Bearer Token` (`Authorization: Bearer {{YOUR_API_KEY}}`)
- **内容类型**: `application/json`

---

### 请求参数 (Path)

| 参数名      | 类型     | 必选   | 描述                          |
| :---------- | :------- | :----- | :---------------------------- |
| **task_id** | `string` | **是** | 提交生成任务时返回的任务 ID。 |

---

### 响应结果 (Response)

**状态码: 200 OK**

| 字段名              | 类型      | 描述                                                                 |
| :------------------ | :-------- | :------------------------------------------------------------------- |
| **code**            | `string`  | 业务状态码（如 "200" 代表请求成功）。                                |
| **message**         | `string`  | 响应信息说明。                                                       |
| **data**            | `object`  | 任务详情对象。                                                       |
| ├─ **status**       | `string`  | 任务状态：`processing` (生成中), `success` (成功), `failed` (失败)。 |
| ├─ **progress**     | `string`  | 生成进度百分比（如 "50"）。                                          |
| ├─ **result_url**   | `string`  | 视频生成成功后的 **下载链接**。                                      |
| ├─ **fail_reason**  | `string`  | 如果任务失败，显示失败原因。                                         |
| ├─ **submit_time**  | `integer` | 任务提交的 Unix 时间戳。                                             |
| ├─ **finish_time**  | `integer` | 任务完成的 Unix 时间戳。                                             |
| └─ **video_width**  | `integer` | 生成视频的宽度（像素）。                                             |
| └─ **video_height** | `integer` | 生成视频的高度（像素）。                                             |

---

### 请求示例 (cURL)

```bash
curl -X GET "https://api.your-server.com/v1/video/generations/task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe" \
 -H "Authorization: Bearer $YOUR_API_KEY"
```

---

### 返回示例 (成功)

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

任务的当前状态。可能的状态值包括：

Preparing – 准备中
Queueing – 队列中
Processing – 生成中
Success – 成功
Fail – 失败
可用选项: Preparing, Queueing, Processing, Success, Fail

---
