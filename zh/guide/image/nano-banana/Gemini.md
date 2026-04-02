---
title: Gemini 聊天格式
icon: google
---

## Gemini 内容生成 (Gemini Native Format)

该接口用于调用 Gemini 原生多模态模型（如 Nano Banana 系列），支持文本生成、图像生成以及“思维链”过程的返回。

---

### 📌 基础信息

- **接口地址**: `POST /v1beta/models/{model}:generateContent/`
- **请求参数 (Path)**:
  - `model`: 模型名称，例如 `gemini-3-pro-image-preview`。
- **认证方式**: `Bearer Token`
- **内容类型**: `application/json`

---

### 📥 请求参数 (Request Body)

| 参数名                    | 类型      | 必选   | 描述                                     |
| :------------------------ | :-------- | :----- | :--------------------------------------- |
| **contents**              | `array`   | **是** | 对话内容列表。                           |
| └─ **role**               | `string`  | 否     | 角色（如 `user`）。                      |
| └─ **parts**              | `array`   | **是** | 包含消息组成部分的列表。                 |
| └─ └─ **text**            | `string`  | **是** | 提示词或文本输入。                       |
| **generationConfig**      | `object`  | **是** | 生成配置对象。                           |
| └─ **responseModalities** | `array`   | **是** | 响应模态，可选值：`TEXT`, `IMAGE`。      |
| └─ **thinkingConfig**     | `object`  | 否     | 思考配置。                               |
| └─ └─ **includeThoughts** | `boolean` | 否     | 是否返回模型生成时的思考逻辑（思维链）。 |
| └─ **imageConfig**        | `object`  | **是** | 图像生成配置。                           |
| └─ └─ **aspectRatio**     | `string`  | **是** | 纵横比，如 `16:9`, `1:1`, `4:3`。        |
| └─ └─ **imageSize**       | `string`  | **是** | 图像质量/尺寸，如 `4K`, `1024x1024`。    |

---

### 📤 响应结果 (Response)

**状态码: 200 OK**

| 字段名               | 类型     | 描述                                                     |
| :------------------- | :------- | :------------------------------------------------------- |
| **candidates**       | `array`  | 生成的备选内容列表。                                     |
| └─ **content**       | `object` | 包含生成的角色和具体 `parts`（可能包含文本或图像数据）。 |
| └─ **finishReason**  | `string` | 停止生成的原因（如 `STOP`）。                            |
| └─ **safetyRatings** | `array`  | 安全性评估评分。                                         |
| **usageMetadata**    | `object` | Token 消耗元数据（Prompt, Candidates, Total）。          |

---

### 📝 请求示例 (生成图像)

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "draw a futuristic city at sunset"
        }
      ]
    }
  ],
  "generationConfig": {
    "responseModalities": ["TEXT", "IMAGE"],
    "imageConfig": {
      "aspectRatio": "16:9",
      "imageSize": "4K"
    },
    "thinkingConfig": {
      "includeThoughts": true
    }
  }
}
```

---

### 💡 开发者建议

1. **思维链返回**: 通过设置 `includeThoughts: true`，你可以看到模型在绘图前是如何理解你的需求并进行“构思”的，这对于调试复杂提示词非常有用。
2. **多模态响应**: 在 `responseModalities` 中同时包含 `TEXT` 和 `IMAGE` 时，模型会先给出描述性文字，再生成对应的图像。
3. **模型版本**: 请确保路径中的 `{model}` 参数与您当前使用的 API 权限相匹配。
