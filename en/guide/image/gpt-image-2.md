---
title: "gpt-image-2 Model API Tutorial"
sidebarTitle: "gpt-image-2"
description: "Quickly master the Text-to-Image and Image Editing APIs for the gpt-image-2 model via NewAPI."
---

## Prerequisites

Before making API calls, please ensure you have obtained the following credentials:

<CardGroup cols={2}>
  <Card title="Base URL" icon="link">
   API Endpoint, formatted as:
    `https://api.onetoken.one`
  </Card>
  <Card title="API Key" icon="key">
    The token generated in the OneToken dashboard, formatted as:
    `sk-xxxxxxxxxxxx`
  </Card>
</CardGroup>

---

## 1. Text to Image API

This endpoint is used to generate a brand-new image from scratch based on the text prompt you provide.

### Request Information

<ParamField path="POST" type="/v1/images/generations/" required>
  Standard OpenAI-compatible image generation path.
</ParamField>

### Request Format

application/json

### Request Parameters

 <ParamField body="model" type="string" required>
    Must be set to `gpt-image-2`.
  </ParamField>
  <ParamField body="prompt" type="string" required>
    A description of the desired image, supported in both English and Chinese.
  </ParamField>
  <ParamField body="n" type="integer" default="1">
    The number of images to generate.
  </ParamField>
  <ParamField body="size" type="string" default="1024x1024">
    The resolution of the image, e.g., `1024x1024` or `512x512`.
  </ParamField>
  <ParamField body="quality" type="string" default="">
   The quality of the image that will be generated.
  </ParamField>

### Code Examples

<CodeGroup>

```bash cURL
curl [https://api.onetoken.one/v1/images/generations/](https://api.onetoken.one/v1/images/generations/) \
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

url = "[https://api.onetoken.one/v1/images/generations/](https://api.onetoken.one/v1/images/generations/)"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer sk-xxxxxxxxxxxx"
}
data = {
    "model": "gpt-image-2",
    "prompt": "A cute cat wearing sunglasses vacationing on the beach",
    "n": 1,
    "size": "1024x1024"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())

```

</CodeGroup>

---

## 2. Image Edits API

This endpoint is used to modify an existing image. You need to provide an **original image** and a **mask image** (transparent areas in the mask image indicate parts that need to be modified/replaced).

### Request Information

### Request Format

multipart/form-data

### Request Parameters

### Code Examples

<CodeGroup>

```bash cURL
curl -X POST "[https://api.onetoken.one/v1/images/edits/](https://api.onetoken.one/v1/images/edits/)" \
  -H "Authorization: Bearer sk-xxxxxxxxxxxx" \
  -F image="cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png" \
  -F prompt="A cute baby sea otter wearing a beret."

```

```python Python
import requests

url = "[https://api.onetoken.one/v1/images/edits/](https://api.onetoken.one/v1/images/edits/)"
body = {
  "image": "cmMtdXBsb2FkLTE2ODc4MzMzNDc3NTEtMjA=/31225951_59371037e9_small.png",
  "prompt": "A cute baby sea otter wearing a beret."
}
response = requests.request("POST", url, data = body, headers = {
  "Content-Type": "multipart/form-data",
  "Authorization": "Bearer sk-xxxxxxxxxxxx"
})

print(response.text)

```

</CodeGroup>

---

## 3. Response Data Structure

Upon a successful API call, a JSON object containing the image data will be returned.

### Success Response Example

```json
{
  "created": 1718112345,
  "data": [
    {
      // Depending on the response_format field
      // "url": "[https://cdn.your-domain.com/images/abc123xyz.png](https://cdn.your-domain.com/images/abc123xyz.png)",
      "b64_json": "xxx"
    }
  ]
}
```
