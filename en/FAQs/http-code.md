---
title: HTTP status codes
icon: code-compare
---

> Error code reference

<Note>
  * **400** usually means bad parameters—see the API docs. Many 400s are **passed through** from upstream.
  * Error payloads use **tid** (trace id) instead of response id for tracing.
</Note>

| HTTP code | Error id | Message | Typical cause |
| --- | --- | --- | --- |
| 503 | - | Incorrect model ID, or no permission for this model in the current group—check the model hub | No channel available |
| 503 | - | Provider rate limit—contact support for higher concurrency or retry later | Upstream throttling |
| 429 | - | Request rate exceeded | Too many requests |
| 403 | insufficient_user_quota | Insufficient balance—please top up | Low balance |
| 403 | - | Account suspended | Disabled / blocklist |
| 403 | - | Forbidden—insufficient permissions | Role permissions |
| 403 | - | Key allowed only from approved IP ranges (last 6 chars of key shown in message) | IP allowlist |
| 403 | - | Key not authorized for the requested model (last 6 chars of key shown) | Model not allowed for key |
| 403 | - | Key error—non-admin cannot pin channel (last 6 chars of key shown) | Channel override |
| 403 | - | Channel has been disabled | Channel off |
| 401 | - | Unauthorized—no access token supplied | Missing Authorization |
| 401 | - | Unauthorized—access token invalid or expired | Bad token |
| 400 | - | Bad Request—invalid channel ID | Bad channel id |
| 400 | prompt_missing | prompt is required | Image: missing prompt |
| 400 | prompt_too_long | prompt is too long | Prompt too long |
| 400 | text_too_long | input is too long | Audio input too long |
| 400 | size_not_supported | size not supported | Unsupported image size |
| 400 | n_not_within_range | invalid value of n | Invalid batch count `n` |
