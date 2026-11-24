---
title: API quickstart
icon: rocket
---

## Sign up

- Minimum top-up: **$1**
- Register: [Sign up](https://onetoken.one/register)

## Setup

### 1. Get a token

1. Log in to the console.
2. Open the **Tokens** page.
3. Click **Add token** to create an API key.

### 2. Configure the endpoint

- Set `BASE_URL` to `https://onetoken.one/v1` when you call Chat Completions or Responses with the OpenAI SDK.
- Set `BASE_URL` to `https://onetoken.one` when you call Claude Messages with the Anthropic SDK.
- For cURL, Postman, or any client that asks for the full endpoint URL, append the request path below to `https://onetoken.one`.

### 3. Choose a model

- Model names appear in the first column of the home **Supported models** list.

#### Choose an API protocol by model

| Provider or model | Recommended protocol | HTTP request path |
| --- | --- | --- |
| OpenAI GPT (new integrations) | OpenAI Responses | `POST /v1/responses` |
| Anthropic Claude | Claude Messages | `POST /v1/messages` |
| Google Gemini | Native Gemini `generateContent` | `POST /v1beta/models/{model}:generateContent` |
| DeepSeek, Qwen, Zhipu GLM, MiniMax | OpenAI Chat Completions | `POST /v1/chat/completions` |

Use OpenAI Chat Completions to keep an existing Chat Completions integration or to use the same request format across providers. Check the model details for supported endpoints before sending a request. [OneToken model catalog](https://onetoken.one/pricing)

## Verify

1. Test in the chat page in the console.
2. Or use an API client (e.g. Postman).

### OpenAI Chat Completions configuration example

```json
{
  "base_url": "https://onetoken.one/v1",
  "api_key": "your_token_here",
  "model": "selected_model_name"
}
```

> Test in the chat UI first, then wire it into your app.
