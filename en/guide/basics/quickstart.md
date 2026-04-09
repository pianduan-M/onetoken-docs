---
title: Quickstart
icon: rocket
---

Create an API key and make your first call.

## Call Onetoken API directly

::: tip
Replace `<Onetoken_API_KEY>` with your [Onetoken key](https://onetoken.one/token). Mind the key’s expiry and quota limits.
:::

For available `model` values, see the [model hub](https://onetoken.one/models) and copy the model name into your request.

::: code-group

```py [Python]
import requests
import json

response = requests.post(
    url="https://onetoken.one/v1/chat/completions",
    headers={
        "Authorization": "Bearer <Onetoken_API_KEY>",
        "Content-Type": "application/json",
    },
    data=json.dumps({
        "model": "gpt-4o-mini",  # replace with your model id
        "messages": [
            {
                "role": "user",
                "content": "What is the meaning of life?"
            }
        ]
    })
)
```

```ts [JavaScript]
// Try from https://onetoken.one; other origins may hit browser CORS limits
fetch("https://onetoken.one/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: "Bearer <Onetoken_API_KEY>",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: "What is the meaning of life?",
      },
    ],
  }),
});
```

```sh [Curl]
curl 'https://onetoken.one/v1/chat/completions' \
  -H 'Authorization: Bearer <Onetoken_API_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "user",
        "content": "What is the meaning of life?"
      }
    ]
  }'
```

:::

Streaming: add `"stream": true` to the request body.

## Use the OpenAI SDK

Replace `<Onetoken_API_KEY>` with your [Onetoken key](https://onetoken.one/token). For `model` names, use the [model hub](https://onetoken.one/models).

::: code-group

```py [Python]
from openai import OpenAI
import random

client = OpenAI(
    base_url="https://onetoken.one/v1",
    api_key="<Onetoken_API_KEY>",
)

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "developer",
            "content": "Always reply in English"
        },
        {
            "role": "user",
            "content": "What is the meaning of life?"
        }
    ],
    temperature=0.8,
    max_tokens=1024,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
    seed=random.randint(1, 1000000000),
)

print(completion.choices[0].message.content)
```

```js [JavaScript]
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://onetoken.one/v1",
  apiKey: "<Onetoken_API_KEY>",
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: "What is the meaning of life?",
      },
    ],
  });

  console.log(completion.choices[0].message);
}

main();
```

:::

For search-capable models, you can add:

```Python theme={null}
  web_search_options={}, # search options
```

Models: `gpt-4o-search-preview`, `gpt-4o-mini-search-preview`.

::: info
Search models may not support `temperature` and some other fine-grained parameters.
:::
