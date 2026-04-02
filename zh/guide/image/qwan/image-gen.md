---
title: 生成图像
icon: image
---

## (百炼 Qwen-Image 系列)

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
