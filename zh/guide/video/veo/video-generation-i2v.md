---
title: 创建生成视频任务
icon: image
---

## (Veo Image-to-Video)

该接口允许用户通过上传一张首帧图片，并结合提示词描述，生成连贯的高质量动态视频。支持音画同步、自定义音色以及错峰生成模式。

---

## 快速开始

视频生成是异步操作，整个流程分为三步：

```
1. 提交任务 → 获得 task_id
2. 轮询状态 → 等待 status 变为 succeeded 返回公网链接
```

### 📌 基础信息

- **接口地址**: `POST /v1/video/generations`
- **认证方式**: `Bearer Token` (`Authorization: Bearer {{YOUR_API_KEY}}`)
- **内容类型**: `application/json`

---

### 📥 请求参数 (Request Body)

| 参数名           | 类型      | 必选   | 描述                                                                                                                                                      |
| :--------------- | :-------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **model**        | `string`  | **是** | 模型名称。可选：`veo-2.0-generate-001`、`veo-3.0-fast-generate-001`、`veo-3.0-generate-001`、`veo-3.1-fast-generate-preview`、 `veo-3.1-generate-preview` |
| **prompt**       | `string`  | **是** | 视频动作描述。字符长度限制 5000 以内。                                                                                                                    |
| **aspect_ratio** | `string`  | **是** | 宽高比                                                                                                                                                    |
| **images**       | `array`   | **是** | 支持，通过 `input_reference` 传入首帧图片（Veo 3.1），使用时 `seconds` 固定为 `"8"`                                                                       |
| **seconds**      | `integer` | 否     | 时长 Veo 3/3.1："4"、"6"、"8"；Veo 2："5"~"8"（默认 "8"）                                                                                                 |
| **size**         | `string`  | 否     | 分辨率 720p（默认）、1080p、4k（4K 仅 Veo 3+），或像素格式如 1280x720、1920x1080                                                                          |

---

### 🖼️ 图片规格要求

- **格式**: PNG, JPEG, JPG, WebP。
- **大小**: 图片文件不超过 50MB（POST Body 限制 20MB）。
- **比例**: 图片长宽比需在 **1:4 到 4:1** 之间。

---

### 📤 响应结果 (Response)

**状态码: 200 OK (任务已提交)**

| 字段名         | 类型      | 描述                                 |
| :------------- | :-------- | :----------------------------------- |
| **id**         | `string`  | 任务实例 ID。                        |
| **task_id**    | `string`  | 任务 ID（用于状态查询）。            |
| **status**     | `string`  | 任务当前状态（如 `queued` 排队中）。 |
| **progress**   | `integer` | 生成进度百分比。                     |
| **created_at** | `integer` | 任务创建时间戳。                     |

```json
{
  "id": "task_MQKsdsosLYRreob4Z4NzTFxZKtSoVRWZ",
  "task_id": "task_MQKsdsosLYRreob4Z4NzTFxZKtSoVRWZ",
  "object": "video",
  "model": "veo-2.0-generate-001",
  "status": "queued",
  "progress": 0,
  "created_at": 1775116001
}
```

---

### 📝 请求示例

```json
{
  "model": "Veoq3-turbo",
  "prompt": "Contemporary dance, the people in the picture are performing contemporary dance.",
  "images": ["https://example.com/dance_start_frame.png"],
  "duration": 7
}
```

---

### 💡 开发者建议

1. **音频拆分**: 仅在 Q2、Q1 模型下支持 `audio_type` 的精细拆分（如仅保留音效或仅保留人声）。
2. **错峰任务管理**: 错峰模式任务如果 48 小时内未完成会自动取消并返还积分，您也可以在任务处理前手动取消。
3. **提示词推荐**: 如果您对描述词没有把握，可以开启 `is_rec: true`，系统会自动优化并生成效果更好的视频。
4. **回调签名**: Veo 推送回调时采用签名算法，建议在服务端进行验签以保证安全性。
