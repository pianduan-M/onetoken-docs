---
title: 图生视频
icon: image
---

##  (Wan Video Generation)

基于 Wan 系列模型，通过一张参考图片和描述性文本，生成具有自然光影和电影感的动态视频任务。

---

## 快速开始

视频生成是异步操作，整个流程分为三步：

```
1. 提交任务 → 获得 task_id
2. 轮询状态 → 等待 status 变为 completed 返回公网链接
```

### 📌 基础信息

- **接口地址**: `POST /v1/video/generations`
- **认证方式**: `Bearer Token` (`Authorization: Bearer sk-xxxxxx`)
- **内容类型**: `application/json`

---

### 📥 请求参数 (Request Body)

| 参数名              | 类型      | 必选   | 描述                                                   |
| :------------------ | :-------- | :----- | :----------------------------------------------------- |
| **model**           | `string`  | **是** | 模型名称，例如：`wan2.6-i2v-flash`。                   |
| **prompt**          | `string`  | **是** | 视频内容及动作的文本描述（如：一只小猫在草地上奔跑）。 |
| **input_reference** | `string`  | **是** | **参考图 URL**。视频将以此图片作为视觉基准进行生成。   |
| **duration**        | `integer` | **是** | 视频时长（秒），例如 `5`。                             |

---

### 📤 响应结果 (Response)

**状态码: 200 OK (任务创建成功)**

| 字段名         | 类型      | 描述                                 |
| :------------- | :-------- | :----------------------------------- |
| **id**         | `string`  | 任务唯一标识 ID。                    |
| **task_id**    | `string`  | 任务 ID（用于后续状态查询）。        |
| **object**     | `string`  | 对象类型，固定为 `video`。           |
| **model**      | `string`  | 实际使用的模型名称。                 |
| **status**     | `string`  | 任务初始状态，如 `queued` (排队中)。 |
| **progress**   | `integer` | 当前进度 (0-100)。                   |
| **created_at** | `integer` | 任务创建的 Unix 时间戳。             |

---

### 📝 请求示例 (JSON)

```json
{
"model": "wan2.6-i2v-flash",
"prompt": "一只小猫在草地上奔跑，电影感，光影自然",
"input_reference": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1024",
"duration": 5
}
```

---

### 📝 返回示例

```json
{
"id": "task_xGOhEWZIx3qiVkqL7rCE0np45eaTM2HA",
"task_id": "task_xGOhEWZIx3qiVkqL7rCE0np45eaTM2HA",
"object": "video",
"model": "wan2.6-i2v-flash",
"status": "queued",
"progress": 0,
"created_at": 1775026176
}
```

---

### 💡 开发者建议

1. **参考图质量**: `input_reference` 提供的图片质量直接决定了视频的视觉上限，建议使用高清晰度、构图明确的图片。
2. **异步查询**: 该接口为异步任务创建接口。请记录返回的 `task_id`，并使用“获取视频生成任务状态”接口轮询结果，或等待回调通知。
3. **Prompt 编写**: 在图生视频模式下，Prompt 应侧重于描述图片中元素的**动作变化**和**环境氛围**，而不是重复描述图片中已有的静态物体。
4. **测试环境**: 当前配置指向测试服务器 `http://192.168.5.29:4000`，生产环境调用请更换为正式域名。
