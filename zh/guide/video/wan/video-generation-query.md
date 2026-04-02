---
title: 查询任务状态
icon: bar-progress
---

## (Wan Video Status)

通过提交生成任务时获得的 `task_id`，实时查询 Wan 视频生成任务的进度、状态及最终结果链接。

---

### 📌 基础信息

- **接口地址**: `GET /v1/video/generations/{task_id}`
- **认证方式**: `Bearer Token` (`Authorization: Bearer sk-xxxxxx`)
- **内容类型**: `application/json`

---

### 📥 请求参数 (Path)

| 参数名      | 类型     | 必选   | 描述                       |
| :---------- | :------- | :----- | :------------------------- |
| **task_id** | `string` | **是** | 视频生成任务的唯一标识符。 |

---

### 📤 响应结果 (Response)

**状态码: 200 OK**

| 字段名          | 类型      | 描述                                                                                  |
| :-------------- | :-------- | :------------------------------------------------------------------------------------ |
| **id**          | `string`  | 任务 ID。                                                                             |
| **task_id**     | `string`  | 任务 ID（同上）。                                                                     |
| **status**      | `string`  | 任务状态：`queued` (排队), `processing` (生成中), `success` (成功), `failed` (失败)。 |
| **progress**    | `integer` | 任务生成进度 (0-100)。                                                                |
| **video_url**   | `string`  | **视频下载链接**（仅在 status 为 success 时返回）。                                   |
| **fail_reason** | `string`  | 失败原因（仅在 status 为 failed 时返回）。                                            |
| **created_at**  | `integer` | 任务创建的 Unix 时间戳。                                                              |

---

### 📝 请求示例 (cURL)

```bash
curl -X GET "http://192.168.5.29:4000/v1/video/generations/task_xGOhEWZIx3qiVkqL7rCE0np45eaTM2HA" \
 -H "Authorization: Bearer $YOUR_API_KEY"
```

---

### 📝 返回示例 (成功)

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

### 💡 开发者建议

1. **轮询机制**: 视频生成通常需要一定时间，建议客户端在提交任务后，每隔 5-10 秒请求一次此接口直至获取结果。
2. **状态机处理**:
   - 处于 `queued` 或 `processing` 时，前端可展示进度条。
   - 变为 `success` 时，直接展示/下载 `video_url`。
   - 变为 `failed` 时，根据 `fail_reason` 提示用户。
3. **环境注意**: 示例中的 URL 为测试环境 `192.168.5.29:4000`，请在上线前切换至正式环境域名。
