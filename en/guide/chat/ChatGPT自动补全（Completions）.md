---
title: Text completions
---

## Completion object

Represents a completion response from the API. **Note:** streaming and non-streaming completions share the same shape (unlike the chat endpoint).

| Field | Type | Description |
| --- | --- | --- |
| id | string | Unique completion id |
| choices | array | Generated completions for the prompt |
| created | integer | Unix timestamp (seconds) |
| model | string | Model used |
| system_fingerprint | string | Backend fingerprint |
| object | string | Always `text_completion` |
| usage | object | Token usage |
| completion_tokens | integer | Tokens in the completion |
| prompt_tokens | integer | Tokens in the prompt |
| total_tokens | integer | Total tokens (prompt + completion) |

```JSON
{
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "gpt-3.5-turbo",
  "choices": [
    {
      "text": "\n\nThis is indeed a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 7,
    "total_tokens": 12
  }
}
```
