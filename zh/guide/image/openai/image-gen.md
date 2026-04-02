---
title: 图像生成
icon: image
---

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
