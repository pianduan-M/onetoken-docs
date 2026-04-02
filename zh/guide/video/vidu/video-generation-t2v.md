---
title: 创建文生视频生成任务
icon: text
---

## (Vidu 视频)

通过 Vidu 系列模型将文本描述转化为高品质视频。支持音画直出、错峰模式以及自定义水印等高级功能。

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

| 参数名              | 类型      | 必选   | 描述                                                                         |
| :------------------ | :-------- | :----- | :--------------------------------------------------------------------------- |
| **model**           | `string`  | **是** | 模型名称。可选：`viduq3-turbo` (快)、`viduq3-pro` (优)、`viduq2`、`viduq1`。 |
| **prompt**          | `string`  | **是** | 视频文本描述（最大 5000 字符）。                                             |
| **duration**        | `integer` | 否     | 时长(秒)。Q3系列: 1-16; Q2: 1-10; Q1: 固定 5。                               |
| **seed**            | `integer` | 否     | 随机种子。传 0 或不传则随机。                                                |
| **metadata**        | `object`  | 否     | 扩展配置对象。                                                               |
| └─ **aspect_ratio** | `string`  | 否     | 比例。默认 `16:9`。可选 `9:16`, `1:1` 等 (3:4/4:3 仅限 Q2/Q3)。              |
| └─ **resolution**   | `string`  | 否     | 分辨率。可选 `540p`, `720p`, `1080p` (Q1 仅支持 1080p)。                     |
| └─ **audio**        | `boolean` | 否     | **音视频直出**（含音效/台词）。仅 Q3 系列支持，默认 true。                   |
| └─ **bgm**          | `boolean` | 否     | 自动添加背景音乐。默认 false。                                               |
| └─ **off_peak**     | `boolean` | 否     | **错峰模式**。开启后积分消耗更低，48小时内生成。                             |
| └─ **callback_url** | `string`  | **是** | 回调地址。用于异步接收任务状态通知。                                         |
| └─ **watermark**    | `boolean` | 否     | 是否添加水印。                                                               |

---

### 🚀 模型特性对比

| 模型名称         | 核心优势           | 时长范围 | 分辨率支持          |
| :--------------- | :----------------- | :------- | :------------------ |
| **viduq3-pro**   | 顶级画质，生动立体 | 1 - 16s  | 540p / 720p / 1080p |
| **viduq3-turbo** | 极速生成，高性价比 | 1 - 16s  | 540p / 720p / 1080p |
| **viduq2**       | 最新通用模型       | 1 - 10s  | 540p / 720p / 1080p |
| **viduq1**       | 转场平滑，运镜稳定 | 5s       | 1080p               |

---

### 📤 响应结果 (Response)

**状态码: 200 OK (任务已提交)**

| 字段名         | 类型      | 描述                             |
| :------------- | :-------- | :------------------------------- |
| **id**         | `string`  | 任务唯一标识 ID。                |
| **task_id**    | `string`  | 任务 ID（用于查询）。            |
| **status**     | `string`  | 任务状态（如 `queued` 排队中）。 |
| **progress**   | `integer` | 生成进度。                       |
| **created_at** | `integer` | 创建时间戳。                     |

---

### 📝 请求示例

```json
{
  "model": "viduq3-turbo",
  "prompt": "镜头拍摄一个女性坐在咖啡馆里，女人抬头看着窗外，镜头缓缓移动，画面呈现暖色调，氛围轻松惬意。",
  "duration": 7,
  "seed": 3,
  "metadata": {
    "aspect_ratio": "16:9",
    "resolution": "1080p",
    "audio": true,
    "bgm": false,
    "off_peak": false,
    "callback_url": "https://your-api.com/v1/callback/vidu"
  }
}
```

---
