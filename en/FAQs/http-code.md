---
title: HTTP status codes
icon: code-compare
---

When an API call fails, check the HTTP status code first, then use `error.message` and `error.code` to identify the cause. One status code can have several causes. Messages and error body formats can also vary by endpoint or upstream model provider.

## Common status codes

| Status | Meaning and common causes | What to do |
| --- | --- | --- |
| `200 OK` | The request succeeded. A streaming request may also return `200` when the connection opens. | Read the response; for streams, handle subsequent data and errors during the stream. |
| `201 Created`, `202 Accepted`, `204 No Content` | A resource was created, an asynchronous task was accepted, or the request succeeded without a response body. Usage depends on the endpoint. | Follow the endpoint documentation to read the resource, poll the task, or finish without parsing a JSON body. |
| `400 Bad Request` | Invalid body, parameters, or model options. Some `400` errors are passed through from upstream. | Check JSON, required fields, parameter values, and model support; correct the request using `error.message`. |
| `401 Unauthorized` | Missing, invalid, or expired API key. | Check `Authorization: Bearer <API_KEY>` and confirm the key is valid. Repeating the same request will not fix authentication. |
| `402 Payment Required` | Some endpoints or upstream providers may use this for insufficient balance or quota. | Check your balance, subscription, and token quota. Use the actual status and error returned by the endpoint. |
| `403 Forbidden` | Your account, group, model, token, or source IP lacks access. It can also indicate insufficient balance or subscription quota. | Check `error.code` and the message, then review permissions, allowed IPs, balance, and quota. `insufficient_user_quota` indicates insufficient quota. |
| `404 Not Found` | The path or resource does not exist. Some upstream providers may also use it for an unknown model. | Verify the path, resource ID, and model name. The gateway may instead return `503` when no model channel is available. |
| `408 Request Timeout`, `504 Gateway Timeout` | Request processing or an upstream response timed out. | Review the client timeout. Before retrying, check whether the task was already created to avoid duplicates. |
| `413 Content Too Large` | The request body exceeds an endpoint limit. | Reduce the file or body size and check the endpoint's limits. |
| `422 Unprocessable Content` | Some endpoints or upstream providers accept the request format but cannot process its content, such as input that fails validation. | Adjust the input using the error message and the endpoint's rules. |
| `429 Too Many Requests` | A platform, model, or upstream rate limit was reached. | Honor `Retry-After` if present; otherwise reduce the request rate and use exponential backoff. |
| `500 Internal Server Error` | Server-side processing failed. | Retry a limited number of times later. If it persists, provide the request ID and time. |
| `502 Bad Gateway` | The gateway or upstream returned an invalid response. | Retry a limited number of times later and check upstream availability. |
| `503 Service Unavailable` | No model channel is available for the current group, or an upstream service is unavailable or rate limited. | Verify the model name and group access first. Retry later for a temporary limit or outage. |

<Note>
  `403` with `insufficient_user_quota` is a common current gateway response for insufficient account balance or subscription quota. Some endpoint docs and upstream examples use `402`; rely on the actual HTTP status and error returned.
</Note>

## Common error codes

`error.code` helps distinguish causes, but it is not guaranteed to be present. Errors passed through from upstream may use other codes or response formats.

| HTTP status | `error.code` | Common cause and action |
| --- | --- | --- |
| `403` | `insufficient_user_quota` | Account balance or subscription quota is insufficient. Add funds, adjust the subscription, or check token quota. |
| `403` | `access_denied` | The token restricts source IPs. Check the allowed IPs or ranges. |
| `503` | `model_not_found` | The model name is invalid or no channel is available in the current group. Verify the name in the [model catalog](https://onetoken.one/pricing) and check group access. |
| `400` | `prompt_missing`, `prompt_too_long` | Some image endpoints require a prompt or limit its length. Check the endpoint's parameter limits. |
| `400` | `text_too_long` | Input text is too long for some audio endpoints. Shorten the input. |
| `400` | `size_not_supported` | An image endpoint does not support the requested size. Select a supported size. |
| `400` | `n_not_within_range` | `n` is outside an endpoint's allowed range. Adjust the output count. |

## Error responses and troubleshooting

OpenAI-compatible endpoints usually place errors in an `error` object, for example:

```json
{
  "error": {
    "message": "... (request id: <request-id>)",
    "type": "new_api_error",
    "code": "model_not_found"
  }
}
```

For troubleshooting, record the HTTP status, `error.code`, `error.message`, request time, and model name. Keep the `X-Oneapi-Request-Id` response header when present. Native Claude endpoints or errors passed through from upstream may use a different response format or request ID field. Do not send your full API key, prompts, or other sensitive data to support.

Retry temporary errors such as `429`, `500`, `502`, `503`, and `504` only a limited number of times. For `503` with `error.code` set to `model_not_found`, check the model and group before retrying. For image, video, and other requests that may create a task or incur charges, check the task status before retrying. Fix the cause of `400`, `401`, access-denied, and insufficient-quota errors first.
