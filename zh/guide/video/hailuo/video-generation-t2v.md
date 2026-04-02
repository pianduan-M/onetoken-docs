---
title: 创建文生视频生成任务
icon: text
---

## (海螺 Hailuo 视频)

通过海螺视频模型（MiniMax-Hailuo）根据文本描述生成高质量视频。支持通过 [指令] 语法实现精确的运镜控制。

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

| 参数名                  | 类型      | 必选   | 描述                                                                                       |
| :---------------------- | :-------- | :----- | :----------------------------------------------------------------------------------------- |
| **model**               | `string`  | **是** | 模型名称。可用值：`MiniMax-Hailuo-2.3`, `MiniMax-Hailuo-02`, `T2V-01-Director`, `T2V-01`。 |
| **prompt**              | `string`  | **是** | 视频文本描述（最大 2000 字符）。支持通过 `[左移]`, `[推进]`, `[左摇]` 等指令进行运镜控制。 |
| **duration**            | `integer` | 否     | 视频时长（秒），默认 6。                                                                   |
| **metadata**            | `object`  | 否     | 任务配置元数据。                                                                           |
| └─ **prompt_optimizer** | `boolean` | 否     | 是否自动优化 prompt（默认 true）。                                                         |
| └─ **resolution**       | `string`  | 否     | 视频分辨率。可用值：`720P`, `768P`, `1080P`。                                              |
| └─ **callback_url**     | `string`  | 否     | 异步通知回调 URL。                                                                         |
| └─ **aigc_watermark**   | `boolean` | 否     | 是否添加水印（默认 false）。                                                               |

---

### 🎥 运镜控制指令详解

在 `prompt` 中使用 `[指令]` 格式可精确控制镜头，支持组合（如 `[左摇,上升]`）。

- **位移**: `[左移]`, `[右移]`, `[上升]`, `[下降]`
- **旋转/摇移**: `[左摇]`, `[右摇]`, `[上摇]`, `[下摇]`
- **空间**: `[推进]`, `[拉远]`, `[变焦推近]`, `[变焦拉远]`
- **特殊**: `[晃动]`, `[跟随]`, `[固定]`

---

### 📤 响应结果 (Response)

**状态码: 200 OK (任务创建成功)**

| 字段名         | 类型      | 描述                                                          |
| :------------- | :-------- | :------------------------------------------------------------ |
| **id**         | `string`  | 任务 ID。                                                     |
| **task_id**    | `string`  | 任务 ID（同上）。                                             |
| **status**     | `string`  | 初始状态，通常为 `queued` (排队中) 或 `processing` (生成中)。 |
| **model**      | `string`  | 使用的模型。                                                  |
| **progress**   | `integer` | 生成进度 (0-100)。                                            |
| **created_at** | `integer` | 任务创建时间戳。                                              |

---

### 📝 请求示例

```json
{
  "model": "MiniMax-Hailuo-2.3",
  "prompt": "一只奔跑在森林中的小猫，[推进], 然后 [左摇]",
  "duration": 6,
  "metadata": {
    "prompt_optimizer": true,
    "resolution": "1080P",
    "callback_url": "https://your-server.com/callback"
  }
}
```

---

### 💡 开发者建议

1. **异步机制**: 本接口是异步的，调用成功仅代表任务创建成功。你需要通过 `callback_url` 接收推送，或者使用查询接口通过 `task_id` 获取最终视频链接。
2. **回调验证**: 配置 `callback_url` 后，MiniMax 会发送一个 POST 请求，你需要在 3 秒内原样返回其提供的 `challenge` 值以完成校验。
3. **分辨率匹配**: `MiniMax-Hailuo-2.3` 和 `02` 模型对 10s 视频仅支持 `768P`。
