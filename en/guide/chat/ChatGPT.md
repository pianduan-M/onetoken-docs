---
title: ChatGPT chat completions
---

## Response object

| Field | Type | Description |
| --- | --- | --- |
| id | string | Unique id for the chat completion |
| choices | array | Completion choices; multiple if `n` > 1 |
| created | integer | Unix timestamp (seconds) |
| model | string | Model used |
| system_fingerprint | string | Backend configuration fingerprint |
| object | string | Always `chat.completion` |
| usage | object | Token usage for this request |
| completion_tokens | integer | Tokens in the completion |
| prompt_tokens | integer | Tokens in the prompt |
| total_tokens | integer | Total tokens (prompt + completion) |

```JSON
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-3.5-turbo-0613",
  "system_fingerprint": "fp_44709d6fcb",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "\n\nHello there, how may I assist you today?",
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}
```

## Chat completion chunk object

| Field | Type | Description |
| --- | --- | --- |
| id | string | Same id across chunks in one completion |
| choices | array | Streaming choices; multiple if `n` > 1 |
| created | integer | Same timestamp across chunks |
| model | string | Model generating the stream |
| system_fingerprint | string | Backend fingerprint |
| object | string | Always `chat.completion.chunk` |

```JSON
{"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"gpt-3.5-turbo-0613", "system_fingerprint": "fp_44709d6fcb", "choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

{"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"gpt-3.5-turbo-0613", "system_fingerprint": "fp_44709d6fcb", "choices":[{"index":0,"delta":{"content":"Hello"},"finish_reason":null}]}

{"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"gpt-3.5-turbo-0613", "system_fingerprint": "fp_44709d6fcb", "choices":[{"index":0,"delta":{"content":"!"},"finish_reason":null}]}

....

{"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"gpt-3.5-turbo-0613", "system_fingerprint": "fp_44709d6fcb", "choices":[{"index":0,"delta":{"content":" today"},"finish_reason":null}]}

{"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"gpt-3.5-turbo-0613", "system_fingerprint": "fp_44709d6fcb", "choices":[{"index":0,"delta":{"content":"?"},"finish_reason":null}]}

{"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"gpt-3.5-turbo-0613", "system_fingerprint": "fp_44709d6fcb", "choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}
```
