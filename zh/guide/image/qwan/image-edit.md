---
title: 图像编辑
icon: brush
---

## 百炼 Qwen-Image 系列

通过通义千问百炼系列的 Qwen-Image-Edit 模型，根据参考图（如深度图、边缘图等）和提示词生成或编辑图像。

---

### 模型预览

#### 千问模型


| **模型名称**                    | **模型简介**                                       | **输出图像规格**                                             |
| ------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| qwen-image-edit-plus            | 千问图像编辑Plus系列，支持多图输出与自定义分辨率。 | 图像分辨率：<br /> - **可指定**：宽和高的取值范围均为`[512, 2048]`像素。<br /> - **默认**：总像素数接近 1024*1024，宽高比与输入图（多图输入时为最后一张）相近。<br />图像格式：png<br />图像张数：1-6张 |
| qwen-image-edit-plus-2025-12-15 |                                                    |                                                              |
| qwen-image-edit                 | 支持单图编辑和多图融合。                           | 图像分辨率：**不可指定**。生成规则同上方的**默认**规则。<br />图像格式：png<br />图像张数：固定1张 |



###  基础信息

- **接口地址**: `POST /v1/images/edits`
- **认证方式**: `Bearer Token` (`Authorization: Bearer sk-xxxxxx`)
- **内容类型**: `application/json`

---

### **请求头（Headers）**

**Content-Type** `string` ****（必选）**

请求内容类型。此参数必须设置为`application/json`。

**Authorization** `string`**（必选）**

请求身份认证。接口使用阿 API-Key 进行身份认证。示例值：Bearer sk-xxxx。



###  请求参数 (Request Body) 

通义千问格式 

| 参数名                 | 类型      | 必选   | 描述                                                         |
| :--------------------- | :-------- | :----- | :----------------------------------------------------------- |
| **model**              | `string`  | **是** | 模型名称，例如：`qwen-image-edit-plus`。                     |
| **input**              | `object`  | **是** | 输入内容对象。                                               |
| └─ **messages**        | `array`   | **是** | 包含消息列表。                                               |
| └─ └─ **role**         | `string`  | **是** | 角色，通常为 `user`。                                        |
| └─ └─ **content**      | `array`   | **是** | 包含 `image` (参考图 URL) 和 `text` (编辑描述) 的数组。      |
| └─ └─ └─ ** image **   | `string`  | 是     | \- 图像格式：JPG、JPEG、PNG、BMP、TIFF、WEBP和GIF。<br />输出图像为PNG格式，对于GIF动图，仅处理其第一帧。<br />- 图像分辨率：为获得最佳效果，建议图像的宽和高均在384像素至3072像素之间。分辨率过低可能导致生成效果模糊，过高则会增加处理时长。<br />- 图像大小：不超过10MB。<br />- 输入格式 file 平台会自动转成 base64，如果需要传公网 url 请使用通义千问格式传参 <br />**支持的输入格式** <br />1. 公网URL：<br />- 支持 HTTP 和 HTTPS 协议。<br />- 示例值：`https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/fpakfo/image36.webp`。<br />2. 临时URL：<br />- 支持OSS协议，必须通过上传文件获取临时 URL<br />- 示例值：`oss://dashscope-instant/xxx/2024-07-18/xxx/cat.png`。 <br />3. 传入 Base64 编码图像后的字符串<br />- 示例值：`data:image/jpeg;base64,GDU7MtCZz...`（示例已截断，仅做演示） |
| └─ └─ └─ ** text **    | `string`  | 是     | 正向提示词，用于描述期望生成的图像内容、风格和构图。 <br />支持中英文，长度不超过800个字符，每个汉字、字母、数字或符号计为一个字符，超过部分会自动截断。<br />示例值：图1中的女生穿着图2中的黑色裙子按图3的姿势坐下，保持其服装、发型和表情不变，动作自然流畅。<br />**注意**：`content`数组中必须包含且仅包含一个`text`对象，否则将报错。 |
| **parameters**         | `object`  | 否     | 控制参数对象。                                               |
| └─ **n**               | `integer` | 否     | 生成图像的数量，默认值为1。<br />对于qwen-image-2.0系列、qwen-image-edit-max、qwen-image-edit-plus系列模型，可选择输出1-6张图片。<br />对于`qwen-image-edit`，仅支持输出1张图片。 |
| └─ **negative_prompt** | `string`  | 否     | 反向提示词，用来描述不希望在画面中看到的内容，可以对画面进行限制。<br />支持中英文，长度上限500个字符，每个汉字、字母、数字或符号计为一个字符，超过部分会自动截断。<br />示例值：低分辨率、错误、最差质量、低质量、残缺、多余的手指、比例不良等。 |
| └─ **watermark**       | `boolean` | 否     | 是否添加水印。                                               |
| └─ **seed**            | *integer* | 否     | 随机数种子，取值范围`[0,2147483647]`。<br />使用相同的`seed`参数值可使生成内容保持相对稳定。若不提供，算法将自动使用随机数种子。<br />**注意**：模型生成过程具有概率性，即使使用相同的`seed`，也不能保证每次生成结果完全一致。 |

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
