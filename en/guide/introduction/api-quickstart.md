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

#### Optional BASE_URL values

```
https://onetoken.one
https://onetoken.one/v1
https://onetoken.one/v1/chat/completions
```

> Different clients may need different BASE_URL values—try the options above in order.

### 3. Choose a model

- Model names appear in the first column of the home **Supported models** list.

## Verify

1. Test in the chat page in the console.
2. Or use an API client (e.g. Postman).

### Example config

```json
{
  "base_url": "https://onetoken.one",
  "api_key": "your_token_here",
  "model": "selected_model_name"
}
```

> Test in the chat UI first, then wire it into your app.
