---
title: "gpt-image-2 模型调用教程"
sidebarTitle: "gpt-image-2"
description: "快速掌握通过 NewAPI 调用 gpt-image-2 模型的文生图与图像编辑接口"
---

## 准备工作

在开始调用之前，请确保你已获取以下凭证：

<CardGroup cols={2}>
  <Card title="Base URL" icon="link">
   API 地址，形如：
    `https://api.onetoken.one`
  </Card>
  <Card title="API Key" icon="key">
    在 OneToken 后台生成的令牌，形如：
    `sk-xxxxxxxxxxxx`
  </Card>
</CardGroup>

---

## 1. 文生图接口 (Text to Image)

该接口用于根据你输入的文本提示词（Prompt）从零开始生成一张全新的图片。

### 请求信息

<ParamField path="POST" type="/v1/images/generations/" required>
  标准 OpenAI 兼容的图像生成路径。
</ParamField>

### 请求格式

application/json

### 请求参数

 <ParamField body="model" type="string" required>
    固定填入 `gpt-image-2`。
  </ParamField>
  <ParamField body="prompt" type="string" required>
    描述你想要生成的图片内容，支持中英文。
  </ParamField>
  <ParamField body="n" type="integer" default="1">
    生成图片的数量。
  </ParamField>
  <ParamField body="size" type="string" default="1024x1024">
    图片分辨率，例如 `1024x1024` 或 `512x512`。
  </ParamField>
  <ParamField body="quality" type="string" default="">
   将生成的图像的质量。
  </ParamField>

### 代码示例

<CodeGroup>

```bash cURL
curl [https://api.onetoken.one/v1/images/generations/](https://api.onetoken.one/v1/images/generations) \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-xxxxxxxxxxxx" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "A futuristic city with flying cars at sunset, cyberpunk style, highly detailed",
    "n": 1,
    "size": "1024x1024"
  }'

```

```python Python
import requests

url = "[https://api.onetoken.one/v1/images/generations/](https://api.onetoken.one/v1/images/generations)"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer sk-xxxxxxxxxxxx"
}
data = {
    "model": "gpt-image-2",
    "prompt": "一只戴着墨镜在海滩度假的可爱猫咪",
    "n": 1,
    "size": "1024x1024"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())

```

</CodeGroup>

---

## 2. 图像编辑接口 (Image Edits)

该接口用于对现有的图片进行修改。你需要提供一张**原图**，以及一张**掩码图（Mask）**（掩码图中透明的区域代表需要被修改/替换的地方）。

### 请求信息

<ParamField path="POST" type="/v1/images/edits/" required>
  标准 OpenAI 兼容的图像编辑路径。
</ParamField>

### 请求格式

multipart/form-data

### 请求参数

<ParamField body="model" type="string" required>
    固定填入 `gpt-image-2`。
  </ParamField>
  <ParamField body="prompt" type="string" required>
    描述你想要生成的图片内容，支持中英文。
  </ParamField>
  <ParamField body="n" type="integer" default="1">
    生成图片的数量。
  </ParamField>
  <ParamField body="size" type="string" default="1024x1024">
    图片分辨率，例如 `1024x1024` 或 `512x512`。
  </ParamField>
  <ParamField body="response_format" type="string" default="b64_json">
   生成的图像返回的格式。必须是url或b64_json。
  </ParamField>
  <ParamField body="image" type="file" default="">
   要编辑的图像。必须是有效的 PNG 文件，小于 4MB，并且是方形的。如果未提供遮罩，图像必须具有透明度，将用作遮罩。
  </ParamField>

### 代码示例

<CodeGroup>

```bash cURL
curl -X POST "https://api.onetoken.one/v1/images/edits/" \
  -H "Authorization: Bearer " \
  -F image="cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png" \
  -F prompt="A cute baby sea otter wearing a beret."

```

```python Python
import requests

url = "https://api.onetoken.one/v1/images/edits/"
body = {
  "image": "cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png",
  "prompt": "A cute baby sea otter wearing a beret."
}
response = requests.request("POST", url, data = body, headers = {
  "Content-Type": "multipart/form-data",
  "Authorization": "Bearer "
})

print(response.text)

```

</CodeGroup>

---

## 3. 返回数据结构

接口调用成功后，会返回一个包含图片 URL 的 JSON 对象。

### 成功响应示例

```json
{
  "created": 1718112345,
  "data": [
    {
      // 根据 response_format 字段
      // "url": "[https://cdn.your-domain.com/images/abc123xyz.png](https://cdn.your-domain.com/images/abc123xyz.png)",
      "b64_json": "xxx"
    }
  ]
}
```
