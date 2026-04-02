---
title: 快速开始
icon: rocket
---

生成 API 密钥并进行首次调用

## 直接调用 Onetoken API

::: tip
其中 `<Onetoken_API_KEY>` 替换为 [Onetoken Key](https://onetoken.one/token)，注意 `key` 的有效期和额度限制。
:::

可使用的 `model` 列表，可查阅 [模型广场](https://onetoken.one/models) ，复制模型名称替换即可。

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
        "model": "gpt-4o-mini",  # 替换模型 id
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
// 请在 https://onetoken.one 域名下尝试，否则有浏览器跨域问题
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

支持流式调用，只需要增加参数 `stream: true`

## 使用 OpenAI SDK

其中 `<Onetoken_API_KEY>` 替换为 [Onetoken Key](https://onetoken.one/token)，注意 `key` 的有效期和额度限制。 可使用的 `model` 列表，可查阅 [模型广场](https://onetoken.one/models) ，复制模型名称替换即可。

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
            "content": "总是用中文回复"
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

对于支持搜索的模型，可以追加下方参数来支持：

```Python theme={null}
  web_search_options={}, # 搜索参数
```

可用模型：`gpt-4o-search-preview`、`gpt-4o-mini-search-preview`。

::: info
注意搜索模型暂不支持 `temperature` 等细节参数。
:::
