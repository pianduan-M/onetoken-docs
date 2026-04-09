---
title: Image-to-video
icon: image
---

## Wan video generation

Image + text with Wan models for natural lighting and cinematic motion.

---

## Quick flow

```
1. Submit job → get task_id
2. Poll status → wait until completed for a public URL
```

### Basics

- **Endpoint**: `POST /v1/video/generations`
- **Auth**: `Bearer Token` (`Authorization: Bearer sk-xxxxxx`)
- **Content-Type**: `application/json`

---

### Request body

| Field | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| **model** | `string` | **Yes** | e.g. `wan2.6-i2v-flash`. |
| **prompt** | `string` | **Yes** | Describe motion (e.g. a kitten running on grass). |
| **input_reference** | `string` | **Yes** | **Reference image URL**—visual anchor for the clip. |
| **duration** | `integer` | **Yes** | Length in seconds, e.g. `5`. |

---

### Response

**200 OK (created)**

| Field | Type | Description |
| :-- | :-- | :-- |
| **id** | `string` | Task id. |
| **task_id** | `string` | Same, for polling. |
| **object** | `string` | `video`. |
| **model** | `string` | Model used. |
| **status** | `string` | e.g. `queued`. |
| **progress** | `integer` | 0–100. |
| **created_at** | `integer` | Unix time. |

---

### Request example

```json
{
"model": "wan2.6-i2v-flash",
"prompt": "A kitten running on grass, cinematic look, natural light and shadow",
"input_reference": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1024",
"duration": 5
}
```

---

### Response example

```json
{
"id": "task_xGOhEWZIx3qiVkqL7rCE0np45eaTM2HA",
"task_id": "task_xGOhEWZIx3qiVkqL7rCE0np45eaTM2HA",
"object": "video",
"model": "wan2.6-i2v-flash",
"status": "queued",
"progress": 0,
"created_at": 1775026176
}
```

---

### Notes

1. **Image quality** caps how good the video can look—prefer sharp, clear framing.
2. **Async**: Save `task_id` and poll the status API or use callbacks.
3. **Prompts**: Focus on **motion** and **atmosphere**, not restating static objects in the frame.
4. **Environments**: Example points at `http://192.168.5.29:4000` for testing—use production host when live.
