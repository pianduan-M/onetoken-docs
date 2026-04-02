---
title: 创建图生视频任务
icon: image
---

## (Vidu Image-to-Video)

该接口允许用户通过上传一张首帧图片，并结合提示词描述，生成连贯的高质量动态视频。支持音画同步、自定义音色以及错峰生成模式。

---

## 快速开始

视频生成是异步操作，整个流程分为三步：

```
1. 提交任务 → 获得 task_id
2. 轮询状态 → 等待 status 变为 completed 返回公网链接
```

### 📌 基础信息

- **接口地址**: `POST /v1/video/generations`
- **认证方式**: `Bearer Token` (`Authorization: Bearer {{YOUR_API_KEY}}`)
- **内容类型**: `application/json`

---

### 📥 请求参数 (Request Body)

| 参数名              | 类型      | 必选   | 描述                                                               |
| :------------------ | :-------- | :----- | :----------------------------------------------------------------- |
| **model**           | `string`  | **是** | 模型名称。可选：`viduq3-turbo`、`viduq3-pro`、`viduq2`、`viduq1`。 |
| **prompt**          | `string`  | **是** | 视频动作描述。字符长度限制 5000 以内。                             |
| **images**          | `array`   | **是** | **首帧图像**。仅支持 1 张图，可传图片 URL 或 Base64 编码。         |
| **duration**        | `integer` | 否     | 时长(秒)。默认 5 秒。Q3系列支持 1-16s，Q2 支持 1-10s。             |
| **seed**            | `integer` | 否     | 随机种子。默认 0（随机）。                                         |
| **metadata**        | `object`  | 否     | 扩展配置对象。                                                     |
| └─ **audio**        | `boolean` | 否     | 是否开启音画同步（直出声音），默认 true。                          |
| └─ **audio_type**   | `string`  | 否     | 音频类型。`all` (音效+人声)、`speech_only`、`sound_effect_only`。  |
| └─ **voice_id**     | `string`  | 否     | 指定音色 ID。可复刻任意音色（Q3系列暂不支持）。                    |
| └─ **off_peak**     | `boolean` | 否     | **错峰模式**。48小时内生成，消耗积分更低。                         |
| └─ **callback_url** | `string`  | **是** | 异步通知回调地址，用于接收任务状态变更。                           |
| └─ **is_rec**       | `boolean` | 否     | 是否启用系统推荐提示词（开启后多消耗 10 积分）。                   |

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

---

### 📝 请求示例

```json
{
"model": "viduq3-turbo",
"prompt": "Contemporary dance, the people in the picture are performing contemporary dance.",
"images": [
"https://example.com/dance_start_frame.png"
],
"duration": 7,
"metadata": {
"audio": true,
"audio_type": "all",
"callback_url": "https://your-api.com/callback/vidu-i2v",
"off_peak": false
}
}
```

---

### 💡 开发者建议

1. **音频拆分**: 仅在 Q2、Q1 模型下支持 `audio_type` 的精细拆分（如仅保留音效或仅保留人声）。
2. **错峰任务管理**: 错峰模式任务如果 48 小时内未完成会自动取消并返还积分，您也可以在任务处理前手动取消。
3. **提示词推荐**: 如果您对描述词没有把握，可以开启 `is_rec: true`，系统会自动优化并生成效果更好的视频。
4. **回调签名**: Vidu 推送回调时采用签名算法，建议在服务端进行验签以保证安全性。
