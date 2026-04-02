---
title: 图像编辑
icon: brush
---

## 百炼 Qwen-Image 系列

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
