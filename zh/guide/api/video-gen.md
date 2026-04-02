# 视频生成接口

> Onetoken 提供统一的视频生成 API，兼容 OpenAI Sora 接口格式，后端支持多家厂商模型

## 快速开始

视频生成是异步操作，整个流程分为三步：

```
1. 提交任务 → 获得 video_id
2. 轮询状态 → 等待 status 变为 completed 返回公网链接
3. 下载视频 → 获取 MP4 文件
```

**最简示例**

```shellscript theme={null}
# 第一步：提交视频生成任务
curl -X POST https://onetoken.one/v1/video/generations \
  -H "Authorization: Bearer $Onetoken_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "wan2.6-t2v",
    "prompt": "一只猫在钢琴上弹奏爵士乐，温暖的灯光，电影感镜头",
    "seconds": "5",
    "size": "1280x720"
  }'

# 响应示例：
# {
#   "id": "eyJtb2RlbCI6IndhbjI...",
#   "object": "video",
#   "status": "in_progress",
#   "model": "wan2.6-t2v",
#   "duration": 5,
#   "width": 1280,
#   "height": 720,
#   ...
# }

# 第二步：轮询查询状态（每 15 秒查询一次，直到 status 为 completed）
curl https://onetoken.one/v1/video/generations/{video_id} \
  -H "Authorization: Bearer $Onetoken_API_KEY"

# 第三步：下载视频
curl https://aihubmix.com/v1/videos/{video_id}/content \
  -H "Authorization: Bearer $AIHUBMIX_API_KEY" \
  --output video.mp4
```

## 接口概览

| 接口     | 方法 | 路径                                       | 说明               |
| :------- | :--- | :----------------------------------------- | :----------------- |
| 创建视频 | POST | `/v1/video/generations`                    | 提交视频生成任务   |
| 查询状态 | GET  | `/v1/video/generations/{video_id}`         | 查询任务状态与进度 |
| 查询状态 | GET  | `/v1/video/generations/{video_id}/content` | 获取内容           |

Base URL：`https://onetoken.one`

认证方式：Bearer Token

```shellscript theme={null}
Authorization: Bearer $Onetoken_API_KEY
```

## 支持的模型

### 文生视频（Text-to-Video）

| 厂商    | 模型名称                        | 特点                            |
| ------- | ------------------------------- | ------------------------------- |
| OpenAI  | sora-2                          | 标准视频生成，支持音画同步      |
| Google  | `veo-3.1-generate-preview`      | 最新 Veo 3.1，原生音频，支持 4K |
| Google  | `veo-3.1-fast-generate-preview` | Veo 3.1 快速版，生成速度更快    |
| Google  | `veo-3.0-fast-generate-001`     | Veo 3.0，高保真视频             |
| Google  | `veo-3.0-generate-001`          | Veo 3.0，高保真视频             |
| Google  | `veo-2.0-generate-001`          | Veo 2.0，稳定版                 |
| 阿里    | `wan2.6-r2v-flash`              | 通义万相最新版，音画同步        |
| Vidu AI | `viduq3-pro`                    | viduq3-pro，1080P 高清          |
| Vidu AI | `viduq3-turbo`                  | viduq3-turbo 1080P              |
| 海螺    | `MiniMax-Hailuo-2.3`            | 海螺视频生成 1080P              |

### 图生视频（Image-to-Video）

| 厂商    | 模型名称             | 特点                   |
| ------- | -------------------- | ---------------------- |
| 阿里    | `wan2.6-r2v-flash`   | 通义万相最新版图生视频 |
| Vidu AI | `viduq3-pro`         | viduq3-pro，1080P 高清 |
| Vidu AI | `viduq3-turbo`       | viduq3-turbo 1080P     |
| 海螺    | `MiniMax-Hailuo-2.3` | 海螺视频生成 1080P     |

## API 详细说明

每家视频模型参数跟请求路径可能不同

## 创建视频 sora-2 示例

### 请求头

```shellscript theme={null}
Authorization: Bearer $Onetoken_API_KEY
Content-Type: application/json
```

### 创建视频生成任务

```shellscript theme={null}
POST /v1/videos
```

#### **请求体**

| 参数              | 类型          | 必填 | 说明                                                                |
| :---------------- | :------------ | :--- | :------------------------------------------------------------------ |
| `model`           | string        | 是   | 模型名称，如 `wan2.6-t2v`、`sora-2`                                 |
| `prompt`          | string        | 是   | 视频描述文本                                                        |
| `seconds`         | string        | 否   | 视频时长（秒），统一使用字符串类型，如 `"5"`、`"8"`（见各模型详解） |
| `size`            | string        | 否   | 分辨率，格式 `宽x高`，如 `1920x1080`（各模型支持值不同）            |
| `input_reference` | string/object | 否   | 参考图片（图生视频），支持 URL 或 base64                            |

> 不同模型的响应格式略有差异，但都包含 `id`（video_id）和 `status` 字段。以 `status` 判断任务进度即可。

<Note>
  图生视频需通过 `input_reference` 参数传入参考图片。
</Note>

#### 查询视频进度

```shellscript theme={null}
GET /v1/videos/{video_id}
```

#### 获取视频内容

```shellscript theme={null}
GET /v1/videos/{video_id}/content
```

#### 响应示例（**通义万相/Veo**）

```json theme={null}
{
  "id": "eyJtb2RlbCI6IndhbjI...",
  "object": "video",
  "created": 1772460274,
  "model": "wan2.6-t2v",
  "status": "in_progress",
  "prompt": "一只猫在窗台上看雨",
  "duration": 5,
  "width": 1920,
  "height": 1080,
  "url": null,
  "error": null
}
```

**响应示例（Sora）**

```json theme={null}
{
  "id": "eyJtb2RlbCI6InNvcmEtMi...",
  "object": "video",
  "created_at": 1772451930,
  "status": "queued",
  "model": "sora-2",
  "progress": 0,
  "prompt": "A cinematic drone shot over mountains",
  "seconds": "8",
  "size": "1280x720"
}
```

#### 通用状态值说明

| 状态          | 说明                |
| :------------ | :------------------ |
| `queued`      | 排队中（Sora 特有） |
| `in_progress` | 生成中              |
| `completed`   | 生成完成，可以下载  |
| `failed`      | 生成失败            |

### 查询视频状态

```shellscript theme={null}
GET /v1/video/generations/{video_id}
```

轮询此接口检查任务是否完成。建议每 **15 秒** 查询一次。

#### **响应示例（生成完成 - 通义万相）**

```json theme={null}
{
  "id": "eyJtb2RlbCI6IndhbjI...",
  "object": "video",
  "status": "completed",
  "model": "wan2.5-t2v-preview",
  "duration": 5,
  "width": 1920,
  "height": 1080,
  "url": "https://onetoken.one/v1/video/generations/eyJtb2RlbCI6IndhbjI.../content",
  "error": null
}
```

#### **响应示例（生成完成 - Sora）**

```json theme={null}
{
  "id": "eyJtb2RlbCI6InNvcmEtMi...",
  "object": "video",
  "created_at": 1772451930,
  "status": "completed",
  "completed_at": 1772452114,
  "expires_at": 1772538330,
  "model": "sora-2",
  "progress": 100,
  "prompt": "A cinematic drone shot over mountains",
  "seconds": "8",
  "size": "1280x720"
}
```

> 所有模型均通过 `status == "completed"` 判断完成状态，然后调用 `/content` 接口下载。

### 下载视频内容

```shellscript theme={null}
GET /v1/video/generations/{video_id}/content
```

当状态为 `completed` 后，调用此接口下载 MP4 视频文件。

**响应**: 直接返回视频二进制流`Content-Type: video/mp4`）。

```shellscript theme={null}
curl https://onetoken.one/v1/video/generations/{video_id}/content \
  -H "Authorization: Bearer $Onetoken_API_KEY" \
  --output my_video.mp4
```

> **注意**：视频下载链接通常有 24 小时有效期，请及时下载保存。

### 删除视频任务

该接口用于删除已创建的视频任务。

```shellscript theme={null}
DELETE /v1/video/generations/{video_id}
```



## 海螺文生视频

1. 第一步调用创建任务接口

```
POST /v1/video/generations
```

### 请求参数 (Request Body)

| 参数名                 | 类型      | 必选   | 描述                                                         |
| :--------------------- | :-------- | :----- | :----------------------------------------------------------- |
| **model**              | `string`  | **是** | 模型名称。可用值：`MiniMax-Hailuo-2.3`, `MiniMax-Hailuo-02`, `T2V-01-Director`, `T2V-01`。 |
| **prompt**             | `string`  | **是** | 视频文本描述（最大 2000 字符）。支持通过 `[左移]`, `[推进]`, `[左摇]` 等指令进行运镜控制。 |
| **duration**           | `integer` | 否     | 视频时长（秒），默认 6。                                     |
| **metadata**           | `object`  | 否     | 任务配置元数据。                                             |
| └─**prompt_optimizer** | `boolean` | 否     | 是否自动优化 prompt（默认 true）。                           |
| └─ **resolution**      | `string`  | 否     | 视频分辨率。可用值：`720P`, `768P`, `1080P`。                |
| └─ **callback_url**    | `string`  | 否     | 异步通知回调 URL。                                           |
| └─ **aigc_watermark**  | `boolean` | 否     | 是否添加水印（默认 false）。                                 |

---

### 🎥 运镜控制指令详解

在 `prompt` 中使用 `[指令]` 格式可精确控制镜头，支持组合（如 `[左摇,上升]`）。

- **位移**: `[左移]`, `[右移]`, `[上升]`, `[下降]`
- **旋转/摇移**: `[左摇]`, `[右摇]`, `[上摇]`, `[下摇]`
- **空间**: `[推进]`, `[拉远]`, `[变焦推近]`, `[变焦拉远]`
- **特殊**: `[晃动]`, `[跟随]`, `[固定]`

---

###  响应结果 (Response)

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

###  请求示例

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

2. 第二步调用获取视频生成任务状态接口

```
/v1/video/generations/{task_id}
```

### 响应结果

```
{
    "code": "string",
    "message": "string",
    "data": {
        "id": 0,
        "created_at": 0,
        "updated_at": 0,
        "task_id": "string",
        "platform": "string",
        "user_id": 0,
        "group": "string",
        "channel_id": 0,
        "quota": 0,
        "action": "string",
        "status": "string",
        "fail_reason": "string",
        "result_url": "string",
        "submit_time": 0,
        "start_time": 0,
        "finish_time": 0,
        "progress": "string",
        "properties": {
            "input": "string",
            "upstream_model_name": "string",
            "origin_model_name": "string"
        },
        "data": {
            "base_resp": {
                "status_code": 0,
                "status_msg": "string"
            },
            "file_id": "string",
            "status": "string",
            "task_id": "string",
            "video_height": 0,
            "video_width": 0
        }
    }
}
```



## **完整调用示例**

::: code-group

```python 通义万相 theme={null}
import requests
import time

API_KEY = "Onetoken_API_KEY"
BASE_URL = "https://onetoken.one"
HEADERS = {
"Authorization": f"Bearer {API_KEY}",
"Content-Type": "application/json"
}

# 第一步：创建视频生成任务

response = requests.post(
f"{BASE_URL}/v1/video/generations",
headers=HEADERS,
json={
"model": "wan2.6-t2v",
"prompt": "一片星空下的沙漠，流星划过夜空，远处篝火的光芒在微风中摇曳",
"seconds": "5",
"size": "1920x1080"
}
)
result = response.json()
video_id = result["id"]
print(f"任务已创建，video_id: {video_id}")

# 第二步：轮询查询状态

while True:
status_response = requests.get(
f"{BASE_URL}/v1/video/generations/{video_id}",
headers=HEADERS
)
status_data = status_response.json()
current_status = status_data["status"]
print(f"当前状态: {current_status}")

    if current_status == "completed":
        print("视频生成完成！")
        break
    elif current_status == "failed":
        error_msg = status_data.get("error", {})
        if isinstance(error_msg, dict):
            error_msg = error_msg.get("message", "未知错误")
        print(f"生成失败: {error_msg}")
        break

    time.sleep(15)  # 每 15 秒查询一次

# 第三步：下载视频

video_response = requests.get(
f"{BASE_URL}/v1/video/generations/{video_id}/content",
headers=HEADERS
)
with open("output.mp4", "wb") as f:
f.write(video_response.content)
print(f"视频已保存为 output.mp4（{len(video_response.content) / 1024 / 1024:.1f} MB）")

```

```python Sora theme={null}
import requests
import time

API_KEY = "Onetoken_API_KEY"
BASE_URL = "https://onetoken.one"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# 创建视频生成任务
response = requests.post(
    f"{BASE_URL}/v1/video/generations",
    headers=HEADERS,
    json={
        "model": "sora-2",
        "prompt": "A cinematic shot of a futuristic city at sunset, flying cars in the background",
        "seconds": "8",       # 可选 "4"/"8"/"12"
        "size": "1280x720"    # 支持 1280x720, 720x1280, 1024x1792, 1792x1024
    }
)
result = response.json()
video_id = result["id"]
print(f"任务已创建，video_id: {video_id}")

# Sora 状态轮询（可能出现 queued -> in_progress -> completed）
while True:
    status_response = requests.get(
        f"{BASE_URL}/v1/video/generations/{video_id}",
        headers=HEADERS
    )
    status_data = status_response.json()
    current_status = status_data["status"]
    progress = status_data.get("progress", "")
    print(f"状态: {current_status}, 进度: {progress}%")

    if current_status == "completed":
        print("视频生成完成！")
        break
    elif current_status == "failed":
        print(f"生成失败: {status_data.get('error')}")
        break

    time.sleep(15)

# 下载视频
video_response = requests.get(
    f"{BASE_URL}/v1/video/generations/{video_id}/content",
    headers=HEADERS
)
with open("sora_output.mp4", "wb") as f:
    f.write(video_response.content)
print("视频已保存为 sora_output.mp4")
```

```javascript Node.js theme={null}
const API_KEY = "your_aihubmix_api_key";
const BASE_URL = "https://onetoken.one";

async function generateVideo() {
  // 第一步：创建任务（以 Veo 3.1 为例）
  const createResponse = await fetch(`${BASE_URL}/v1/video/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "veo-3.1-generate-preview",
      prompt: "一片星空下的沙漠，流星划过夜空",
      seconds: "8",
      size: "1280x720",
    }),
  });
  const { id: videoId } = await createResponse.json();
  console.log(`任务已创建: ${videoId}`);

  // 第二步：轮询状态
  let status = "in_progress";
  while (status !== "completed" && status !== "failed") {
    await new Promise((resolve) => setTimeout(resolve, 15000));
    const statusResponse = await fetch(
      `${BASE_URL}/v1/video/generations/${videoId}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      },
    );
    const result = await statusResponse.json();
    status = result.status;
    console.log(`当前状态: ${status}`);
  }

  if (status === "completed") {
    // 第三步：下载视频
    const videoResponse = await fetch(
      `${BASE_URL}/v1/video/generations/${videoId}/content`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      },
    );
    const fs = require("fs");
    const buffer = Buffer.from(await videoResponse.arrayBuffer());
    fs.writeFileSync("output.mp4", buffer);
    console.log("视频已保存为 output.mp4");
  }
}

generateVideo();
```

:::

## **FAQ**

### **视频生成需要多长时间？**

视频生成通常需要 1-5 分钟，具体时间取决于模型、分辨率和时长。建议设置 15 秒的轮询间隔。

### `input_reference` **参数怎么用？**

`input_reference` 用于图生视频场景，支持三种传入方式：

```json theme={null}
// 方式一：直接传入图片 URL
"input_reference": "https://example.com/image.jpg"

// 方式二：传入 base64 编码的图片（对象格式）
"input_reference": {
  "mime_type": "image/jpeg",
  "data": "<BASE64_ENCODED_IMAGE>"
}

// 方式三：传入 data URL
"input_reference": "data:image/jpeg;base64,<BASE64_ENCODED_IMAGE>"
```

### **视频下载链接有效期是多久？**

生成的视频下载链接通常有 **24 小时** 有效期，请及时下载保存。

### **各模型**`seconds` **参数有什么区别？**

| 模型                                      | 可选值               | 默认值 |
| ----------------------------------------- | -------------------- | ------ |
| Sora (`sora-2` / `sora-2-pro`)            | `"4"`, `"8"`, `"12"` | `"4"`  |
| Veo 3/3.1 (`veo-3.1-generate-preview` 等) | `"4"`, `"6"`, `"8"`  | `"8"`  |
| Veo 2 (`veo-2.0-generate-001`)            | `"5"`\~`"8"`         | `"8"`  |
| 通义万相 `wan2.6`                         | `"2"`\~`"15"`        | `"5"`  |
| 通义万相 `wan2.5`                         | `"5"`, `"10"`        | `"5"`  |
| 通义万相 `wan2.2`                         | `"5"`（固定）        | `"5"`  |
| 即梦AI (`jimeng-3.0-pro` 等)              | `"5"`, `"10"`        | `"5"`  |

\> **提示**：所有模型的 `seconds` 参数统一使用字符串类型传入（如 `"8"`），API 会自动处理。

### 不同模型`size` 参数格式有什么区别？

| 模型     | 支持的 size 值                                           |
| -------- | -------------------------------------------------------- |
| Sora     | `1280x720720x12801024x17921792x1024`                     |
| Veo      | 像素格式`1280x720` 等）或分辨率标签`720p1080p4k`）       |
| 通义万相 | 像素格式`x` 和 `*` 均可（如 `1920x1080` 或 `1920*1080`） |
| 即梦 AI  | 宽高比格式`16:99:16` 等）或像素格式                      |

**###** `seconds` **和** `duration` **有什么区别？**

两者含义相同，均表示视频时长。API 同时支持这两个参数名（Sora 除外，Sora 只接受 `seconds`）。推荐统一使用 `seconds`。

### 如何编写更好的 prompt？

- **描述具体场景**：包含主体、动作、环境、光线、氛围
- **指定镜头语言**：如"特写"、"航拍"、"推镜头"、"慢动作"
- **描述风格**：如"电影感"、"纪录片风格"、"动画风格"
- **中文模型用中文 prompt 效果更好**：通义万相针对中文优化
- **Veo 支持音频描述**：可在 prompt 中描述声音，如"鸟鸣声"、"钢琴旋律"

### 任务失败怎么处理？

当 `status` 为 `failed` 时，响应中的 `error` 字段会包含错误信息：

```json theme={null}
{
  "status": "failed",
  "error": {
    "message": "Video generation failed due to content policy violation",
    "type": "video_generation_error"
  }
}
```

常见失败原因包括：内容违规、prompt 过长、图片格式不支持等。请根据错误信息调整后重试。

Built with [Mintlify](https://mintlify.com).
