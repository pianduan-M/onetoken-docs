---
title: 编辑图像
icon: brush
---

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
