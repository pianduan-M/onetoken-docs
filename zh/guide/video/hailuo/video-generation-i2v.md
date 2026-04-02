---
title: 创建图生视频任务
icon: image
---

##  (海螺 Hailuo Image-to-Video)

该接口允许用户上传一张起始帧图片（静态图），并结合文本描述和运镜指令，生成动态视频。

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

| 参数名                   | 类型      | 必选   | 描述                                                                                 |
| :----------------------- | :-------- | :----- | :----------------------------------------------------------------------------------- |
| **model**                | `string`  | **是** | 模型名称。推荐：`MiniMax-Hailuo-2.3`, `MiniMax-Hailuo-2.3-Fast`, `I2V-01-Director`。 |
| **prompt**               | `string`  | **是** | 视频动作描述（最大 2000 字符）。支持通过 `[推进]`, `[左移]` 等指令控制镜头。         |
| **duration**             | `integer` | **是** | 视频时长（秒）。可选：`6` 或 `10`（取决于模型）。                                    |
| **metadata**             | `object`  | **是** | 扩展元数据。                                                                         |
| └─ **first_frame_image** | `string`  | **是** | **起始帧图片**。支持公网 URL 或 Base64 Data URL。                                    |
| └─ **resolution**        | `string`  | 否     | 分辨率。可选：`512P`, `768P`, `1080P`。                                              |
| └─ **prompt_optimizer**  | `boolean` | 否     | 是否自动优化提示词（默认 true）。                                                    |
| └─ **callback_url**      | `string`  | 否     | 任务状态回调通知地址。                                                               |
| └─ **aigc_watermark**    | `boolean` | 否     | 是否添加水印（默认 false）。                                                         |

---

### 🖼️ 图片规格要求

- **格式**: JPG, JPEG, PNG, WebP
- **体积**: 小于 20MB
- **尺寸**: 短边 > 300px，长宽比在 2:5 至 5:2 之间。

---

### 🎥 运镜指令 (部分展示)

在 `prompt` 中加入 `[]` 指令实现精确镜头运动：

- **推拉**: `[推进]`, `[拉远]`
- **移位**: `[左移]`, `[右移]`, `[上升]`, `[下降]`
- **摇摆**: `[左摇]`, `[右摇]`, `[上摇]`, `[下摇]`
- **变焦**: `[变焦推近]`, `[变焦拉远]`

---

### 📝 请求示例

```json
{
  "model": "MiniMax-Hailuo-2.3",
  "prompt": "Contemporary dance, the people in the picture are performing, [推进]",
  "duration": 6,
  "metadata": {
    "first_frame_image": "https://example.com/start_frame.png",
    "resolution": "1080P",
    "prompt_optimizer": true,
    "aigc_watermark": false
  }
}
```

---

### 📤 响应结果 (Response)

**状态码: 200 OK**

| 字段名      | 类型     | 描述                                    |
| :---------- | :------- | :-------------------------------------- |
| **task_id** | `string` | 任务唯一标识，用于后续查询进度。        |
| **status**  | `string` | 当前状态（如 `queued`, `processing`）。 |

---

### 💡 开发者建议

1. **图文契合度**: `prompt` 的描述应基于 `first_frame_image` 的内容进行动作扩展。如果图片是静态风景，Prompt 描述剧烈的人物动作，生成效果可能不佳。
2. **Fast 模型**: 如果对生成速度有要求，建议使用 `MiniMax-Hailuo-2.3-Fast` 模型。
3. **分辨率策略**: `MiniMax-Hailuo-02` 模型在生成 10s 视频时，最高支持 `768P` 分辨率。
