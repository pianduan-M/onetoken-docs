# 图片生成接口

> 为了方便开发者调用不同的图像生成模型，Onetoken 提供了统一的图片生成接口

## 可用模型列表

### Nano Banana

- [gemini-2.5-flash-image ](https://onetoken.one/model/gemini-2.5-flash-image)—— 社区又称Nano Banana 🍌。
- [gemini-3-pro-image-preview](https://onetoken.one/model/gemini-3-pro-image-preview) —— 社区又称Nano Banana PRO 🍌是Google Gemini系列中的下一代AI图像生成与编辑模型，也是Gemini 2.5 Flash Image(Nano Banana)的升级版。该模型融合多模态Transformer和扩散模型,原生支持2K(2048×2048)及4K分辨率输出,在图像质量、文字渲染、物理推理等方面实现显著提升。 图片输出的费用为每 100 万个 token 120 美元。输出 1024x1024 像素 (1K) 到 2048x2048 像素 (2K) 的图片会消耗 1,120 个 token，相当于每张图片 0.134 美元。输出尺寸最大为 4096x4096 像素 (4K) 的图片会消耗 2,000 个 token，相当于每张图片 0.24 美元。
- [gemini-3.1-flash-image-preview](https://onetoken.one/model/gemini-3.1-flash-image-preview) ——

### OpenAI 模型

- [gpt-image-1.5 ](https://onetoken.one/model/gpt-image-1.5)—— OpenAI 最新的图像生成模型，它具有更好的指令遵循性和对提示的执行能力。
- [gpt-image-1](https://onetoken.one/model/gpt-image-1) —— 多模态语言模型，它接受文本和图像输入，并生成图像输出。
- [gpt-image-1-mini](https://onetoken.one/model/gpt-image-1-mini) —— gpt-image-1 的经济型版本。

### Imagen 模型

- [imagen-4.0-ultra-generate-001](https://onetoken.one/model/imagen-4.0-ultra-generate-001)
- [imagen-4.0-generate-001](https://onetoken.one/model/imagen-4.0-generate-001)
- [imagen-4.0-fast-generate-001](https://onetoken.one/model/imagen-4.0-fast-generate-001)
- [imagen-4.0-fast-generate-preview-06-06](https://onetoken.one/model/imagen-4.0-fast-generate-preview-06-06)
- [imagen-3.0-generate-002](https://onetoken.one/model/imagen-3.0-generate-002)

### Qwen 模型

- [qwen-image](https://onetoken.one/model/qwen-image) —— Qwen 系列中的一个图像生成基础模型，在复杂文本渲染和精确图像编辑方面取得了显著进展。
- [qwen-image-edit](https://onetoken.one/model/qwen-image-edit) —— Qwen 图像编辑模型。

## openai 通用格式 图像生成 (Images)

使用原生 OpenAI 格式，根据提示词（Prompt）创建图像。

---

### 📌 基础信息

- **接口地址**: `POST /v1/images/generations/`
- **请求域名**: `https://onetoken.one`
- **认证方式**: `Bearer Token`
- **内容类型**: `application/json`

---

### 📥 请求参数 (Request Body)

| 参数名         | 类型      | 必选   | 默认值      | 描述                                                                       |
| :------------- | :-------- | :----- | :---------- | :------------------------------------------------------------------------- |
| **model**      | `string`  | 否     | `dall-e-2`  | 选用的模型：`dall-e-2`、`dall-e-3` 或 `gpt-image-1`。                      |
| **prompt**     | `string`  | **是** | -           | 图像的文本描述。GPT-image-1 最大 32k 字符。                                |
| **n**          | `integer` | 否     | `1`         | 生成数量（1-10）。`dall-e-3` 仅支持 1。                                    |
| **size**       | `string`  | 否     | `1024x1024` | 尺寸。`gpt-image-1` 支持 `1024x1024`、`1536x1024`、`1024x1536` 或 `自动`。 |
| **background** | `string`  | 否     | `自动`      | 背景透明度（仅限 `gpt-image-1`）：`透明`、`不透明`、`自动`。               |
| **moderation** | `string`  | 否     | `自动`      | 内容审核级别：`低`（限制较少）或 `自动`。                                  |
| **quality**    | `string`  | 否     | -           | 生成图像的质量（HD/Standard）。                                            |
| **style**      | `string`  | 否     | -           | 图像风格。                                                                 |

---

### 📤 响应结果 (Response)

**状态码: 200 OK**

| 字段名              | 类型      | 描述                        |
| :------------------ | :-------- | :-------------------------- |
| **created**         | `integer` | 请求创建的 Unix 时间戳。    |
| **data**            | `array`   | 图像对象列表。              |
| └─ **url**          | `string`  | 图像的托管 URL 地址。       |
| └─ **b64_json**     | `string`  | 图像的 Base64 编码数据。    |
| **usage**           | `object`  | 消耗统计信息。              |
| └─ **total_tokens** | `integer` | 本次请求总消耗的 Token 数。 |

---

### 📝 请求示例

```json
{
  "model": "gpt-image-1",
  "prompt": "一只可爱的海獭宝宝",
  "n": 1,
  "size": "1024x1024",
  "background": "透明"
}
```

### 📝 返回示例

```json
{
  "created": 1713833628,
  "data": [
    {
      "url": "https://example.com/generated_image.png",
      "b64_json": ""
    }
  ],
  "usage": {
    "total_tokens": 100,
    "input_tokens": 50,
    "output_tokens": 50,
    "input_tokens_details": {
      "text_tokens": 10,
      "image_tokens": 40
    }
  }
}
```

---

### 💡 注意事项

1. **透明度支持**: 当 `background` 设置为 `透明` 时，建议确保后端返回格式为支持透明通道的 `png` 或 `webp`。
2. **模型差异**: 不同的模型（DALL-E vs GPT-image）对 `size` 和 `n` 的限制不同，请根据实际业务需求选择模型。

## Openai 通用格式 编辑图像 (Image Edits)

在给定原始图像和提示词的情况下，对图像进行编辑或扩展（如：补全、修改局部内容）。

---

### 📌 基础信息

- **接口地址**: `POST /v1/images/edits/`
- **请求域名**: `https://onetoken.one`
- **认证方式**: `Bearer Token`
- **内容类型**: `multipart/form-data`（注意：由于涉及文件上传，须使用 Form-Data 格式）

---

### 📥 请求参数 (Form-Data)

| 参数名              | 类型      | 必选   | 描述                                                                                                          |
| :------------------ | :-------- | :----- | :------------------------------------------------------------------------------------------------------------ |
| **image**           | `file`    | **是** | 要编辑的图像。必须是方形的 PNG 文件，小于 4MB。若不提供 mask，则 image 必须自带透明度（Alpha 通道）作为遮罩。 |
| **prompt**          | `string`  | **是** | 描述所需结果的文本。最大长度 1000 字符。例如："一只戴着贝雷帽的海獭"。                                        |
| **mask**            | `file`    | 否     | 遮罩图像。完全透明区域（Alpha 为 0）指示原图中需要被编辑/替换的位置。必须为 PNG，小于 4MB，尺寸须与原图一致。 |
| **model**           | `string`  | 否     | 使用的模型，例如 `dall-e-2`。                                                                                 |
| **n**               | `integer` | 否     | 生成图像的数量 (1-10)，默认 1。                                                                               |
| **size**            | `string`  | 否     | 分辨率：`256x256`、`512x512` 或 `1024x1024`。                                                                 |
| **response_format** | `string`  | 否     | 返回格式：`url` 或 `b64_json`。                                                                               |
| **user**            | `string`  | 否     | 终端用户唯一标识符。                                                                                          |

---

### 📤 响应结果 (Response)

**状态码: 200 OK**

| 字段名          | 类型      | 描述                     |
| :-------------- | :-------- | :----------------------- |
| **created**     | `integer` | 创建时间戳。             |
| **data**        | `array`   | 结果列表。               |
| └─ **url**      | `string`  | 编辑后的图像 URL。       |
| └─ **b64_json** | `string`  | 图像的 Base64 编码数据。 |

---

### 📝 请求示例 (cURL)

```bash
curl https://onetoken.one/v1/images/edits/ \
  -H "Authorization: Bearer $YOUR_API_KEY" \
  -F image="@otter.png" \
  -F mask="@mask.png" \
  -F prompt="A cute baby sea otter wearing a beret" \
  -F n=1 \
  -F size="1024x1024"
```

---

### 💡 注意事项

1. **图像格式**: 必须使用 **PNG**。这是因为编辑功能依赖 Alpha 通道（透明度）来识别“需要重绘”的区域。
2. **遮罩原理**:
   - 如果你上传了 `mask` 文件，模型会修改 `mask` 中透明的部分。
   - 如果没传 `mask`，模型会修改 `image` 本身透明的部分。
3. **尺寸限制**: 上传的图片必须是正方形（1:1）。

## 千问格式 生成图像

通过通义千问百炼系列的 Qwen-Image 模型生成图片。该接口支持提示词自动优化和中式风格的深度理解。

---

### 📌 基础信息

- **接口地址**: `POST /v1/images/generations`
- **认证方式**: `Bearer Token`
- **内容类型**: `application/json`

---

### 📥 请求参数 (Request Body)

| 参数名                 | 类型      | 必选   | 描述                                                    |
| :--------------------- | :-------- | :----- | :------------------------------------------------------ |
| **model**              | `string`  | **是** | 模型名称，例如：`qwen-image-plus` 或 `qwen-image-max`。 |
| **input**              | `object`  | **是** | 输入内容对象。                                          |
| └─ **messages**        | `array`   | **是** | 包含角色和内容的列表。通常 `role` 为 `user`。           |
| └─ └─ **content**      | `array`   | **是** | 内容列表，其中包含 `text` 字段（图像描述文本）。        |
| **parameters**         | `object`  | 否     | 控制生成效果的参数对象。                                |
| └─ **negative_prompt** | `string`  | 否     | 反向提示词，指定不希望在图像中出现的内容。              |
| └─ **prompt_extend**   | `boolean` | 否     | 是否开启 AI 自动优化提示词（默认为 true）。             |
| └─ **watermark**       | `boolean` | 否     | 是否在生成图中添加水印。                                |
| └─ **size**            | `string`  | 否     | 图像尺寸，例如 `1328*1328`、`1024*1024` 等。            |

---

### 📤 响应结果 (Response)

**状态码: 200 OK**

| 字段名                | 类型      | 描述                                     |
| :-------------------- | :-------- | :--------------------------------------- |
| **created**           | `integer` | 创建时的 Unix 时间戳。                   |
| **data**              | `array`   | 生成结果列表。                           |
| └─ **url**            | `string`  | 生成图像的下载链接。                     |
| └─ **b64_json**       | `string`  | 图像的 Base64 编码数据（如果要求返回）。 |
| └─ **revised_prompt** | `string`  | AI 自动优化后的最终提示词内容。          |

---

### 📝 请求示例

```json
{
  "model": "qwen-image-plus",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "text": "一副典雅庄重的对联悬挂于厅堂之中，房间是个安静古典的中式布置，桌子上放着一些青花瓷。"
          }
        ]
      }
    ]
  },
  "parameters": {
    "prompt_extend": true,
    "watermark": false,
    "size": "1328*1328"
  }
}
```

### 📝 返回示例

```json
{
  "created": 1713833628,
  "data": [
    {
      "url": "https://example.com/qwen_output_image.png",
      "revised_prompt": "An elegant Chinese living room with blue and white porcelain..."
    }
  ]
}
```

---

### 💡 开发者建议

1. **结构说明**: 该接口采用“通义千问原生格式”，与标准的 OpenAI 格式相比，Prompt 被包裹在 `input.messages` 的数组结构中。
2. **文字理解**: Qwen 系列模型对中文成语、对联及中式意境（如岳阳楼、青花瓷）有极佳的还原能力。
3. **提示词优化**: 建议保持 `prompt_extend: true`，这能让生成的画面细节更丰富。

## 千问格式 编辑图像

通过通义千问百炼系列的 Qwen-Image-Edit 模型，根据参考图（如深度图、边缘图等）和提示词生成或编辑图像。

---

### 📌 基础信息

- **接口地址**: `POST /v1/images/edits`
- **认证方式**: `Bearer Token` (`Authorization: Bearer sk-xxxxxx`)
- **内容类型**: `application/json`

---

### 📥 请求参数 (Request Body)

| 参数名                 | 类型      | 必选   | 描述                                                    |
| :--------------------- | :-------- | :----- | :------------------------------------------------------ |
| **model**              | `string`  | **是** | 模型名称，例如：`qwen-image-edit-plus`。                |
| **input**              | `object`  | **是** | 输入内容对象。                                          |
| └─ **messages**        | `array`   | **是** | 包含消息列表。                                          |
| └─ └─ **role**         | `string`  | **是** | 角色，通常为 `user`。                                   |
| └─ └─ **content**      | `array`   | **是** | 包含 `image` (参考图 URL) 和 `text` (编辑描述) 的数组。 |
| **parameters**         | `object`  | 否     | 控制参数对象。                                          |
| └─ **n**               | `integer` | 否     | 生成图像的数量。                                        |
| └─ **negative_prompt** | `string`  | 否     | 反向提示词。                                            |
| └─ **prompt_extend**   | `boolean` | 否     | 是否开启提示词自动扩展优化（默认 true）。               |
| └─ **watermark**       | `boolean` | 否     | 是否添加水印。                                          |
| └─ **size**            | `string`  | 否     | 输出图像尺寸。                                          |

---

### 📤 响应结果 (Response)

**状态码: 200 OK**

| 字段名                | 类型      | 描述                        |
| :-------------------- | :-------- | :-------------------------- |
| **created**           | `integer` | Unix 时间戳。               |
| **data**              | `array`   | 结果列表。                  |
| └─ **url**            | `string`  | 编辑后的图像 URL 地址。     |
| └─ **b64_json**       | `string`  | 图像的 Base64 数据。        |
| └─ **revised_prompt** | `string`  | AI 优化后的实际执行提示词。 |

---

### 📝 请求示例

```json
{
  "model": "qwen-image-edit-plus",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "image": "https://example.com/reference_depth_map.webp"
          },
          {
            "text": "生成一张符合深度图的图像，遵循以下描述：一辆红色的破旧自行车停在一条泥泞的小路上，背景是茂密的原始森林"
          }
        ]
      }
    ]
  },
  "parameters": {
    "n": 1,
    "prompt_extend": true,
    "watermark": false
  }
}
```

---

### 💡 开发者建议

1. **参考图模式**: 与 OpenAI 的透明遮罩编辑不同，Qwen 的编辑接口常用于“结构控制”，例如提供一张深度图或线稿图，让模型在此基础上生成符合描述的图像。
2. **多模态输入**: 在 `content` 数组中，必须同时包含一个 `image` 对象和一个 `text` 对象，以确保模型既有视觉参考又有文本指令。

## 1. Nano Banana 格式

### 1.1 纯文生图

::: code-group

```bash [纯文生图]
curl -X POST 'https://onetoken.one/v1beta/models/gemini-2.5-flash-image:generateContent' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer sk-你的token' \
  -d '{
  "contents": [
    {
      "parts": [
        {
          "text": "一只可爱的猫咪在阳光下打盹"
        }
      ]
    }
  ],
  "generationConfig": {
    "imageConfig": {
      "aspectRatio": "1:1"
    }
  }
}'
```

```bash [带参考图 (最多 3 张)]
curl -X POST 'https://onetoken.one/v1beta/models/gemini-2.5-flash-image:generateContent' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer sk-你的token' \
  -d '{
  "contents": [
    {
      "parts": [
        {
          "text": "把这张图片变成水彩画风格"
        },
        {
          "inlineData": {
            "mimeType": "image/png",
            "data": "<Base64图片数据,不含data:image/png;base64,前缀>"
          }
        }
      ]
    }
  ],
  "generationConfig": {
    "imageConfig": {
      "aspectRatio": "1:1"
    }
  }
}'
```

:::

### 请求参数

| 参数          | 说明          | 可选值                                                                  |
| ------------- | ------------- | ----------------------------------------------------------------------- |
| `text`        | 提示词 (必需) | 任意文本                                                                |
| `aspectRatio` | 宽高比        | `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `3:2`, `2:3`, `5:4`, `4:5`, `21:9` |
| `inlineData`  | 参考图片      | 最多 3 张, Base64 编码                                                  |

### 响应格式

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "inlineData": {
              "mimeType": "image/png",
              "data": "<Base64图片数据>"
            }
          }
        ]
      }
    }
  ]
}
```

---

## 2. Nano Banana Pro (gemini-3-pro-image-preview)

::: code-group

```bash [纯文生图]
curl -X POST 'https://onetoken.one/v1beta/models/gemini-3-pro-image-preview:generateContent' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer sk-你的token' \
  -d '{
  "contents": [
    {
      "parts": [
        {
          "text": "一只可爱的猫咪在阳光下打盹"
        }
      ]
    }
  ],
  "generationConfig": {
    "imageConfig": {
      "aspectRatio": "1:1",
      "imageSize": "2K"
    }
  }
}'
```

```bash [带参考图]
// 带参考图 (最多 14 张: 6 物体 + 5 人物 + 3 自由)
curl -X POST 'https://onetoken.one/v1beta/models/gemini-3-pro-image-preview:generateContent' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer sk-你的token' \
  -d '{
  "contents": [
    {
      "parts": [
        {
          "text": "参考这张图片,生成类似风格的作品"
        },
        {
          "inlineData": {
            "mimeType": "image/jpeg",
            "data": "<Base64图片数据>"
          }
        }
      ]
    }
  ],
  "generationConfig": {
    "imageConfig": {
      "aspectRatio": "16:9",
      "imageSize": "4K"
    }
  }
}'
```

:::

### 参数说明

| 参数          | 说明          | 可选值                                                                  |
| ------------- | ------------- | ----------------------------------------------------------------------- |
| `text`        | 提示词 (必需) | 任意文本                                                                |
| `aspectRatio` | 宽高比        | `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `3:2`, `2:3`, `5:4`, `4:5`, `21:9` |
| `imageSize`   | 分辨率        | `1K` (标清), `2K` (高清), `4K` (超清)                                   |
| `inlineData`  | 参考图片      | 最多 14 张, Base64 编码                                                 |

## Gemini 3.1 Flash Image Preview (Nano Banana 2)

### 2.1 基础文生图 (Text-to-Image)

此示例展示了如何通过简单的文本描述生成高质量图像。

Bash

```
curl -X POST 'https://onetoken.one/v1beta/models/gemini-3.1-flash-image-preview:generateContent' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer sk-你的token' \
  -d '{
  "contents": [
    {
      "parts": [
        {
          "text": "一张赛博朋克风格的上海街景，霓虹灯倒映在雨后的路面上，写实风格"
        }
      ]
    }
  ],
  "generationConfig": {
    "imageConfig": {
      "aspectRatio": "16:9",
      "imageSize": "2K",
      "enableWebSearch": true
    }
  }
}'
```

### 2.2 多模态编辑与参考 (Image-to-Image / Editing)

支持最多 **14 张** 参考图，用于风格迁移、人物一致性（Character Consistency）或局部编辑。

Bash

```
curl -X POST 'https://onetoken.one/v1beta/models/gemini-3.1-flash-image-preview:generateContent' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer sk-你的token' \
  -d '{
  "contents": [
    {
      "parts": [
        {
          "text": "保持图中人物特征，将背景更换为繁华的纽约时代广场，并在其手中添加一个冰淇淋"
        },
        {
          "inlineData": {
            "mimeType": "image/jpeg",
            "data": "<Base64图片数据>"
          }
        }
      ]
    }
  ],
  "generationConfig": {
    "imageConfig": {
      "aspectRatio": "3:4",
      "imageSize": "4K"
    }
  }
}'
```

---

### 2.3 参数说明 (Parameter Specifications)

相较于 3.0 版本，3.1 Flash Image 增加了更多的比例选项和搜索增强开关。

| **参数**            | **说明**     | **可选值 / 限制**                                                                  |
| ------------------- | ------------ | ---------------------------------------------------------------------------------- |
| **text**            | 提示词       | 必需。支持多语言，i18n 文本渲染能力大幅提升。                                      |
| **aspectRatio**     | 宽高比       | **新增：** 1:4, 4:1, 1:8, 8:1 **常规：** 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 21:9 |
| **imageSize**       | 分辨率       | 0.5K (快速预览), **1K (默认)**, 2K, 4K                                             |
| **enableWebSearch** | **搜索增强** | `true` (默认) 或 `false`。开启后利用 Google 搜索确保地标、特定物品的准确性。       |
| **inlineData**      | 参考图片     | 最多 **14 张** (单                                                                 |
