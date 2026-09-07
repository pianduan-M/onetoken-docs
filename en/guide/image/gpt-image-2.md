---
title: "gpt-image-2 Model API Tutorial"
sidebarTitle: "gpt-image-2"
description: "Quickly master the text-to-image and image editing APIs of the gpt-image-2 model."
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
   The quality of the image that will be generated. `low` `medium` `high` `auto`
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

<ParamField path="POST" type="/v1/images/edits/" required>
  Standard OpenAI-compatible image editing path.
</ParamField>

### Request Format

multipart/form-data

### Request Parameters

<ParamField body="model" type="string" required>
  Must be set to `gpt-image-2`.
</ParamField>
<ParamField body="prompt" type="string" required>
  A description of the desired image. Both English and Chinese are supported.
</ParamField>
<ParamField body="n" type="integer" default="1">
  The number of images to generate.
</ParamField>
<ParamField body="size" type="string" default="1024x1024">
  The image resolution, such as `1024x1024` or `512x512`.
</ParamField>
<ParamField body="output_format" type="string" default="png">
The format in which the generated images are returned. This parameter is only supported for the GPT image models. Must be one of png, jpeg, or webp.
</ParamField>
<ParamField body="image" type="file" default="">
  The images to edit. You can provide up to 16 images.
</ParamField>

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

```javascript JavaScript
const body = new FormData();
body.append("image", file1);
body.append("image", file2);
body.append("prompt", "A cute baby sea otter wearing a beret.");

fetch("https://api.onetoken.one/v1/images/edits/", {
  method: "POST",
  headers: {
    Authorization: "Bearer sk-xxxxxxxxxxxx",
  },
  body,
});
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

## 4. Common Sizes

Custom image dimensions must meet all of the following requirements:

| Constraint | Requirement |
| --- | --- |
| Minimum total pixels | ≥ `655,360` |
| Maximum total pixels | ≤ `8,294,400` |
| Width and height | Both must be multiples of `16` |
| Longest side | ≤ `3840` |
| Long side ÷ short side | ≤ `3` |

All recommended sizes below meet these requirements:

| Aspect ratio | Small | Medium | Large |
| --- | --- | --- | --- |
| 1:1 | `1024 × 1024` | `2048 × 2048` | `2880 × 2880` |
| 5:4 | `1280 × 1024` | `2000 × 1600` | `3200 × 2560` |
| 4:5 | `1024 × 1280` | `1600 × 2000` | `2560 × 3200` |
| 4:3 | `1024 × 768` | `2048 × 1536` | `3264 × 2448` |
| 3:4 | `768 × 1024` | `1536 × 2048` | `2448 × 3264` |
| 3:2 | `1152 × 768` | `2160 × 1440` | `3504 × 2336` |
| 2:3 | `768 × 1152` | `1440 × 2160` | `2336 × 3504` |
| 16:9 | `1280 × 720` | `2048 × 1152` | `3840 × 2160` |
| 9:16 | `720 × 1280` | `1152 × 2048` | `2160 × 3840` |
| 21:9 (simplified ratio: 7:3) | `1344 × 576` | `2016 × 864` | `3808 × 1632` |
| 9:21 (simplified ratio: 3:7) | `576 × 1344` | `864 × 2016` | `1632 × 3808` |
