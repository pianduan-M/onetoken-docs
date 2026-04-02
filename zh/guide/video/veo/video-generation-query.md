---
title: 获取视频生成任务状态
icon: bar-progress
---

## (Vidu 视频)

通过任务 ID 查询 Vidu 视频生成的详细状态。当任务完成时，可在此获取视频下载链接、封面图、音轨链接及消耗配额等信息。

---

### 📌 基础信息

- **接口地址**: `GET /v1/video/generations/{task_id}`
- **认证方式**: `Bearer Token` (`Authorization: Bearer {{YOUR_API_KEY}}`)
- **内容类型**: `application/json`

---

### 📥 请求参数 (Path)

| 参数名      | 类型     | 必选   | 描述                         |
| :---------- | :------- | :----- | :--------------------------- |
| **task_id** | `string` | **是** | 创建任务时返回的 `task_id`。 |

---

### 📤 响应结果 (Response)

**状态码: 200 OK**

---

### 📝 请求示例 (cURL)

```bash
curl -X GET "https://api.your-server.com/v1/video/generations/task_LK8YADXPxyoGME6wv79x8qId62v76PO5" \
 -H "Authorization: Bearer $YOUR_API_KEY"
```

---

### 📝 返回示例 (任务完成)

```json
{
  "code": "success",
  "message": "",
  "data": {
    "error": null,
    "format": "mp4",
    "metadata": null,
    "status": "succeeded", // 任务状态
    "task_id": "task_**",
    "url": "https://onetoken.one/v1/videos/task_MQKsdsosLYRreob4Z4NzTFxZKtSoVRWZ/content" // 公网地址
  }
}
```

### 任务状态码

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
  VeoStatusError = "error" // 错误（用于错误响应）
```

---

### 💡 开发者建议

1. **资源链接有效期**: 返回的 `result_url` 和 `cover_url` 通常带有 AWS S3 的预签名信息（`X-Amz-Signature`），具有时效性（通常为 24 小时）。建议在任务成功后尽快将文件转存到本地存储。
2. **多音轨处理**: 如果您在创建任务时开启了音频功能，可通过 `speech_url` 和 `sound_url` 分别获取纯人声和纯音效，方便进行后期二次剪辑。
3. **进度显示**: `data.progress` 字段可以直接用于前端进度条展示，它同步反映了后端 GPU 渲染的实时进度。
4. **积分核算**: `data.data.credits` 字段记录了该次视频生成实际消耗的系统配额，可用于您的计费系统对账。
