---
title: 获取视频生成任务状态
icon: bar-progress
---

##  (Vidu 视频)

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

| 字段名                                                | 类型      | 描述                                                                                    |
| :---------------------------------------------------- | :-------- | :-------------------------------------------------------------------------------------- |
| **code**                                              | `string`  | 响应状态码（如 `success`）。                                                            |
| **data**                                              | `object`  | 任务详情核心数据。                                                                      |
| ├─ **status**                                         | `string`  | 任务总状态：`QUEUED` (排队), `PROCESSING` (处理中), `SUCCESS` (成功), `FAILED` (失败)。 |
| ├─ **progress**                                       | `string`  | 可读的进度百分比（如 "100%"）。                                                         |
| ├─ **result_url**                                     | `string`  | **视频下载链接**（生成的最终 MP4 链接）。                                               |
| ├─ **submit_time**                                    | `integer` | 任务提交时间戳。                                                                        |
| ├─ **finish_time**                                    | `integer` | 任务完成时间戳。                                                                        |
| └─ **data (嵌套)**                                    | `object`  | 视频元数据详情。                                                                        |
| &nbsp;&nbsp;&nbsp;└─ **creations**                    | `array`   | 生成物列表。                                                                            |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **cover_url**  | `string`  | 视频封面图链接。                                                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **speech_url** | `string`  | 生成的人声/台词音轨链接（如开启 audio）。                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **sound_url**  | `string`  | 生成的背景音效链接。                                                                    |

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

### 💡 开发者建议

1. **资源链接有效期**: 返回的 `result_url` 和 `cover_url` 通常带有 AWS S3 的预签名信息（`X-Amz-Signature`），具有时效性（通常为 24 小时）。建议在任务成功后尽快将文件转存到本地存储。
2. **多音轨处理**: 如果您在创建任务时开启了音频功能，可通过 `speech_url` 和 `sound_url` 分别获取纯人声和纯音效，方便进行后期二次剪辑。
3. **进度显示**: `data.progress` 字段可以直接用于前端进度条展示，它同步反映了后端 GPU 渲染的实时进度。
4. **积分核算**: `data.data.credits` 字段记录了该次视频生成实际消耗的系统配额，可用于您的计费系统对账。
