---
title: "MiniMax-H3 模型调用教程"
sidebarTitle: "MiniMax-H3"
description: "使用 MiniMax-H3 创建文生视频、首尾帧图生视频和多模态参考生视频任务"
---

MiniMax-H3 支持文本、图片、视频和音频等多模态输入，可生成 `768P` 或 `2K` 视频。

<Info>
  OneToken 使用 OpenAI 兼容的视频生成接口。请求体外层只放 `model` `prompt` ，MiniMax-H3 的 `content`、`resolution`、`duration`、`ratio`、`callback_url` 和 `aigc_watermark` 均放在 `metadata` 中。
</Info>

## 准备工作

在开始调用之前，请确保你已获取以下信息：

<CardGroup cols={2}>
  <Card title="Base URL" icon="link">
    API 地址：`https://onetoken.one`
  </Card>
  <Card title="API Key" icon="key">
    在 OneToken 后台生成的令牌，形如：`sk-xxxxxxxxxxxx`
  </Card>
</CardGroup>

视频生成是异步操作。完整流程如下：

```text
1. 提交生成任务，获取 task_id
2. 使用 task_id 轮询任务状态
3. status 变为 succeeded 后读取视频 URL
```

## 1. 创建视频生成任务

### 请求信息

<ParamField path="POST" type="/v1/video/generations" required>
  创建 MiniMax-H3 视频生成任务。
</ParamField>

- **认证方式**：`Authorization: Bearer $YOUR_API_KEY`
- **内容类型**：`application/json`

### 请求体结构

```json
{
  "model": "MiniMax-H3",
  "prompt": "描述你想生成的视频",
  "metadata": {
    "resolution": "2K",
    "duration": 5,
    "ratio": "16:9",
    "callback_url": "https://example.com/webhooks/minimax-h3",
    "aigc_watermark": false
  }
}
```

<Warning>
  不要把 `content`、`resolution`、`duration`、`ratio`、`callback_url` 或 `aigc_watermark` 放在请求体外层。除 `model` `prompt` 外，这些字段都必须放在 `metadata` 中。
</Warning>

### 外层参数

<ParamField body="model" type="string" required>
  模型名称，固定填入 `MiniMax-H3`。
</ParamField>

<ParamField body="prompt" type="string" required>
  描述你想要生成的视频内容，支持中英文。最终会拼接到 `metadata.content` text 项中
</ParamField>

<ParamField body="metadata" type="object" required>
  MiniMax-H3 的生成参数对象。
</ParamField>

### metadata 参数

| 参数             | 类型      | 必选     | 描述                                                                          |
| :--------------- | :-------- | :------- | :---------------------------------------------------------------------------- |
| `content`        | `array`   | 是       | 多模态输入数组。每次请求必须包含至少一个非空的 `text` 项。                    |
| `resolution`     | `string`  | 是       | 视频分辨率。可选值：`768P`、`2K`。                                            |
| `duration`       | `integer` | 是       | 视频时长，单位为秒。可选整数：`4` 到 `15`。                                   |
| `ratio`          | `string`  | 条件必选 | 视频宽高比。可选值：`adaptive`、`21:9`、`16:9`、`4:3`、`1:1`、`3:4`、`9:16`。 |
| `callback_url`   | `string`  | 否       | 接收任务状态变更通知的公网回调地址。                                          |
| `aigc_watermark` | `boolean` | 否       | 是否添加 AIGC 标识水印。默认值为 `false`。                                    |

### content 元素

`metadata.content` 中的每个元素通过 `type` 区分输入类型。

| 字段            | 类型     | 必选     | 描述                                                       |
| :-------------- | :------- | :------- | :--------------------------------------------------------- |
| `type`          | `string` | 是       | 可选值：`text`、`image_url`、`video_url`、`audio_url`。    |
| `text`          | `string` | 条件必选 | 当 `type` 为 `text` 时必选。单个文本最多 7000 个字符。     |
| `image_url.url` | `string` | 条件必选 | 当 `type` 为 `image_url` 时必选。传入图片地址或 Data URI。 |
| `video_url.url` | `string` | 条件必选 | 当 `type` 为 `video_url` 时必选。仅用于多模态参考生视频。  |
| `audio_url.url` | `string` | 条件必选 | 当 `type` 为 `audio_url` 时必选。仅用于多模态参考生视频。  |
| `role`          | `string` | 条件必选 | 标记媒体用途。可选值见下表。                               |

### role 取值

| role              | 适用输入 | 描述                                                         |
| :---------------- | :------- | :----------------------------------------------------------- |
| `first_frame`     | 图片     | 首帧图片。仅传入一张图且省略 `role` 时，该图片默认作为首帧。 |
| `last_frame`      | 图片     | 尾帧图片。使用首尾帧模式时，应同时提供 `first_frame`。       |
| `reference_image` | 图片     | 多模态参考图片，最多 9 张。                                  |
| `reference_video` | 视频     | 多模态参考视频，最多 3 段。                                  |
| `reference_audio` | 音频     | 多模态参考音频，最多 3 段。                                  |

## 2. 选择生成模式

### 文生视频

`content` 只包含文本。此时 `ratio` 必填，且不能使用 `adaptive`。

```json
{
  "model": "MiniMax-H3",
  "prompt": "史诗级太空歌剧院线预告：女舰长独自站在巨大观景窗前，最后一支舰队正在集结并跃迁离去，强光爆闪、舰桥震动，她被留在原地。",
  "metadata": {
    "resolution": "2K",
    "duration": 5,
    "ratio": "16:9",
    "aigc_watermark": false
  }
}
```

### 图生视频

在文本之外传入首帧、尾帧或首尾帧图片。图生视频的宽高比由输入图片决定，因此 `ratio` 应设为 `adaptive`。

```json
{
  "model": "MiniMax-H3",
  "prompt": "镜头缓慢推进，人物转身看向远处，衣摆随风自然摆动。",
  "metadata": {
    "content": [
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/first-frame.png"
        },
        "role": "first_frame"
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/last-frame.png"
        },
        "role": "last_frame"
      }
    ],
    "resolution": "2K",
    "duration": 5,
    "ratio": "adaptive"
  }
}
```

### 多模态参考生视频

你可以组合参考图片、参考视频和参考音频。`ratio` 可省略，默认值为 `adaptive`；也可以显式指定固定比例。

```json
{
  "model": "MiniMax-H3",
  "prompt": "角色面对镜头说：Follow the wind, live free. 音色参考音频 1，动作和构图参考所提供的视频与图片",
  "metadata": {
    "content": [
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/character.png"
        },
        "role": "reference_image"
      },
      {
        "type": "video_url",
        "video_url": {
          "url": "https://example.com/motion-reference.mp4"
        },
        "role": "reference_video"
      },
      {
        "type": "audio_url",
        "audio_url": {
          "url": "https://example.com/voice-reference.mp3"
        },
        "role": "reference_audio"
      }
    ],
    "resolution": "2K",
    "duration": 5,
    "ratio": "9:16"
  }
}
```

<Warning>
  图生视频和多模态参考生视频不能混用。只要 `content` 中出现 `reference_image`、`reference_video` 或 `reference_audio`，就不能再使用 `first_frame` 或 `last_frame`，反之亦然。
</Warning>

## 3. 输入媒体要求

整个请求体不能超过 64 MB。Base64 编码通常会使数据体积增加约 33%，较大的媒体文件建议使用公网 URL。

媒体 URL 支持以下形式：

- 公网可访问的 HTTP 或 HTTPS URL。
- 对应媒体类型的 Data URI，例如 `data:image/png;base64,...`、`data:video/mp4;base64,...` 或 `data:audio/mp3;base64,...`。

### 图片限制

| 项目       | 限制                                            |
| :--------- | :---------------------------------------------- |
| 格式       | JPG、JPEG、PNG、WEBP、HEIC、HEIF                |
| 单文件大小 | 不超过 30 MB                                    |
| 宽高       | 256 到 5760 像素                                |
| 宽高比     | 0.4 到 2.5                                      |
| 数量       | 首帧最多 1 张、尾帧最多 1 张、参考图片最多 9 张 |

### 视频限制

| 项目       | 限制                                |
| :--------- | :---------------------------------- |
| 格式       | MP4、MOV                            |
| 视频编码   | H.264/AVC、H.265/HEVC               |
| 音频编码   | AAC、MP3                            |
| 单文件大小 | 不超过 50 MB                        |
| 数量       | 最多 3 段                           |
| 时长       | 单段 2 到 15 秒，总时长不超过 15 秒 |
| 宽高       | 256 到 5760 像素                    |
| 宽高比     | 0.4 到 2.5                          |
| 帧率       | 23.976 到 60 FPS                    |

### 音频限制

| 项目       | 限制                                |
| :--------- | :---------------------------------- |
| 格式       | WAV、MP3                            |
| 单文件大小 | 不超过 15 MB                        |
| 数量       | 最多 3 段                           |
| 时长       | 单段 2 到 15 秒，总时长不超过 15 秒 |

## 4. 发送请求

下面的示例创建一个 `2K`、5 秒、`16:9` 的文生视频任务。

<CodeGroup>

```bash cURL
curl -X POST "https://api.onetoken.one/v1/video/generations" \
  -H "Authorization: Bearer $YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "MiniMax-H3",
    "prompt":"电影感航拍镜头掠过雨后的未来城市，霓虹灯倒映在街道上。",
    "metadata": {
      "resolution": "2K",
      "duration": 5,
      "ratio": "16:9",
      "aigc_watermark": false
    }
  }'
```

```python Python
import os

import requests

response = requests.post(
    "https://api.onetoken.one/v1/video/generations",
    headers={
        "Authorization": f"Bearer {os.environ['ONETOKEN_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "model": "MiniMax-H3",
        "metadata": {
            "content": [
                {
                    "type": "text",
                    "text": "电影感航拍镜头掠过雨后的未来城市，霓虹灯倒映在街道上。",
                }
            ],
            "resolution": "2K",
            "duration": 5,
            "ratio": "16:9",
            "aigc_watermark": False,
        },
    },
    timeout=30,
)
response.raise_for_status()
print(response.json())
```

</CodeGroup>

### 创建成功响应

创建成功表示任务已经进入异步队列，不表示视频已经生成完成。

```json
{
  "task_id": "task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe",
  "status": "queued"
}
```

请保存完整的 `task_id`。后续查询必须原样使用该值。

## 5. 查询任务状态

### 请求信息

<ParamField path="GET" type="/v1/video/generations/{task_id}" required>
  查询任务状态和生成结果。
</ParamField>

<ParamField path="task_id" type="string" required>
  创建任务时返回的 OneToken 公开任务 ID，例如 `task_xxx`。
</ParamField>

```bash
curl "https://api.onetoken.one/v1/video/generations/task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe" \
  -H "Authorization: Bearer $YOUR_API_KEY"
```

### 成功响应

HTTP 状态码：`200`

```json
{
  "code": "success",
  "message": "",
  "data": {
    "id": 1024,
    "created_at": 1786939200,
    "updated_at": 1786939260,
    "task_id": "task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe",
    "platform": "minimax-h3",
    "user_id": 1001,
    "group": "default",
    "channel_id": 12,
    "quota": 4000000,
    "action": "generate",
    "status": "SUCCESS",
    "fail_reason": "",
    "result_url": "https://example.com/generated/minimax-h3-output.mp4",
    "submit_time": 1786939200,
    "start_time": 1786939205,
    "finish_time": 1786939260,
    "progress": "100%",
    "properties": {
      "input": "",
      "upstream_model_name": "MiniMax-H3",
      "origin_model_name": "MiniMax-H3"
    }
  }
}
```

### 返回参数

| 字段                         | 类型      | 描述                                                              |
| :--------------------------- | :-------- | :---------------------------------------------------------------- |
| `code`                       | `string`  | 请求成功时固定为 `success`。                                      |
| `message`                    | `string`  | 成功时通常为空。                                                  |
| `data.task_id`               | `string`  | OneToken 对外公开的任务 ID。                                      |
| `data.platform`              | `string`  | MiniMax-H3 任务的平台标识。                                       |
| `data.status`                | `string`  | NewAPI 中记录的任务状态。                                         |
| `data.progress`              | `string`  | 任务进度，例如 `10%`、`50%`、`100%`。                             |
| `data.fail_reason`           | `string`  | 任务失败原因。成功时为空。                                        |
| `data.result_url`            | `string`  | 生成成功的视频地址。任务未成功时可能不返回。                      |
| `data.quota`                 | `integer` | 本任务实际扣除的额度。                                            |
| `data.submit_time`           | `integer` | 任务提交时间，Unix 秒时间戳。                                     |
| `data.start_time`            | `integer` | 任务开始时间。尚未开始时为 `0`。                                  |
| `data.finish_time`           | `integer` | 任务完成时间。尚未完成时为 `0`。                                  |
| `data.properties`            | `object`  | 原始模型与上游模型信息。                                          |
| `data.data`                  | `object`  | MiniMax 上游原始响应。查询完成后，任务详情位于 `data.data.task`。 |
| `data.data.task.id`          | `string`  | MiniMax 上游任务 ID。该值不用于 OneToken 查询接口。               |
| `data.data.task.content.url` | `string`  | MiniMax 上游返回的视频地址。                                      |
| `data.data.task.usage`       | `object`  | MiniMax 上游返回的时长和参考图片用量。                            |

### 状态映射

| MiniMax 原始状态 `data.data.task.status` | NewAPI 任务状态 `data.status` | 进度   |
| :--------------------------------------- | :---------------------------- | :----- |
| `queued`                                 | `QUEUED`                      | `10%`  |
| `running`                                | `IN_PROGRESS`                 | `50%`  |
| `succeeded`                              | `SUCCESS`                     | `100%` |
| `failed`                                 | `FAILURE`                     | `100%` |
| `cancelled`                              | `FAILURE`                     | `100%` |
| 其他未知状态                             | `IN_PROGRESS`                 | `30%`  |

建议每隔 5 到 10 秒查询一次。以外层 `data.status` 判断任务是否结束，以 `data.result_url` 获取最终视频地址。

### 首次轮询前的数据

任务刚提交、尚未完成第一次上游轮询时，`data.data` 可能只包含创建任务时返回的 MiniMax 上游任务 ID：

```json
{
  "task_id": "424010985738629"
}
```

此时应继续轮询，不要把该上游 `task_id` 替换到查询 URL 中。

### 任务失败响应

任务生成失败时，查询接口仍然返回 HTTP `200`，顶层 `code` 仍为 `success`。失败状态和原因位于任务对象中。

```json
{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe",
    "platform": "minimax-h3",
    "status": "FAILURE",
    "progress": "100%",
    "fail_reason": "上游返回的错误信息",
    "data": {
      "task": {
        "id": "424010985738629",
        "model": "MiniMax-H3",
        "status": "failed",
        "error": {
          "code": "InvalidParameter",
          "message": "上游返回的错误信息"
        }
      }
    }
  }
}
```

### 任务不存在

任务 ID 不存在或不属于当前用户时，接口返回 HTTP `400`：

```json
{
  "code": "task_not_exist",
  "message": "task_not_exist",
  "data": null
}
```

## 6. 回调通知

传入 `metadata.callback_url` 后，MiniMax 会先向该地址发送包含 `challenge` 的验证请求。你的服务需要在 3 秒内原样返回 `challenge`。验证成功后，任务状态变化时会向该地址发送 POST 通知。

回调不能替代查询接口。你的服务仍应保留通过 `task_id` 主动查询任务的能力。

## 7. 错误响应

接口使用 OpenAI 风格的错误对象，并返回对应的 HTTP 状态码。

```json
{
  "type": "error",
  "error": {
    "type": "bad_request_error",
    "message": "invalid params, content must include a non-empty text item (prompt is required) (2013)",
    "http_code": "400"
  },
  "request_id": "021785229015510a2c883cf675b9804d"
}
```

| HTTP 状态码 | 错误类型                     | 描述                     |
| :---------- | :--------------------------- | :----------------------- |
| `400`       | `bad_request_error`          | 请求参数不合法。         |
| `401`       | `authorized_error`           | API Key 缺失或无效。     |
| `402`       | `insufficient_balance_error` | 账户余额或额度不足。     |
| `422`       | `unprocessable_entity_error` | 输入内容未通过安全检查。 |
| `429`       | `rate_limit_error`           | 请求触发限流。           |
| `500`       | `server_error`               | 服务端处理失败。         |

排查问题时，请保留响应中的 `request_id`。
