---
title: "MiniMax-H3 API tutorial"
sidebarTitle: "MiniMax-H3"
description: "Use MiniMax-H3 to create text-to-video, first-and-last-frame image-to-video, and multimodal reference-to-video jobs"
---

MiniMax-H3 supports multimodal inputs such as text, images, video, and audio. It can generate videos in `768P` or `2K` resolution.

<Info>
  OneToken uses an OpenAI-compatible video generation API. At the top level of the request body, include only `model` and `prompt`. Place the MiniMax-H3 `content`, `resolution`, `duration`, `ratio`, `callback_url`, and `aigc_watermark` fields inside `metadata`.
</Info>

## Prerequisites

Before you make a request, make sure you have the following information:

<CardGroup cols={2}>
  <Card title="Base URL" icon="link">
    API endpoint: `https://onetoken.one`
  </Card>
  <Card title="API Key" icon="key">
    A token generated in the OneToken dashboard, such as `sk-xxxxxxxxxxxx`
  </Card>
</CardGroup>

Video generation is asynchronous. The complete flow is:

```text
1. Submit a generation job and get a task_id
2. Poll the job status with the task_id
3. Read the video URL after status changes to succeeded
```

## 1. Create a video generation job

### Request information

<ParamField path="POST" type="/v1/video/generations" required>
  Create a MiniMax-H3 video generation job.
</ParamField>

- **Authentication**: `Authorization: Bearer $YOUR_API_KEY`
- **Content type**: `application/json`

### Request body structure

```json
{
  "model": "MiniMax-H3",
  "metadata": {
    "content": [
      {
        "type": "text",
        "text": "Describe the video you want to generate"
      }
    ],
    "resolution": "2K",
    "duration": 5,
    "ratio": "16:9",
    "callback_url": "https://example.com/webhooks/minimax-h3",
    "aigc_watermark": false
  }
}
```

<Warning>
  Do not place `content`, `resolution`, `duration`, `ratio`, `callback_url`, or `aigc_watermark` at the top level of the request body. Except for `model` and `prompt`, all these fields must be inside `metadata`.
</Warning>

### Top-level parameters

<ParamField body="model" type="string" required>
  The model name. Set it to `MiniMax-H3`.
</ParamField>

<ParamField body="prompt" type="string" required>
  Describe the video you want to generate. Both English and Chinese are supported. The value is appended to the text item in `metadata.content`.
</ParamField>

<ParamField body="metadata" type="object" required>
  The MiniMax-H3 generation parameters.
</ParamField>

### metadata parameters

| Parameter        | Type      | Required    | Description                                                                                     |
| :--------------- | :-------- | :---------- | :---------------------------------------------------------------------------------------------- |
| `content`        | `array`   | Yes         | An array of multimodal inputs. Every request must contain at least one non-empty `text` item.    |
| `resolution`     | `string`  | Yes         | The video resolution. Supported values: `768P` and `2K`.                                        |
| `duration`       | `integer` | Yes         | The video duration in seconds. Supported integer values: `4` through `15`.                      |
| `ratio`          | `string`  | Conditional | The video aspect ratio. Supported values: `adaptive`, `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, and `9:16`. |
| `callback_url`   | `string`  | No          | A public callback URL that receives job status updates.                                         |
| `aigc_watermark` | `boolean` | No          | Whether to add an AIGC watermark. The default is `false`.                                       |

### content items

The `type` field identifies the input type of each item in `metadata.content`.

| Field           | Type     | Required    | Description                                                                                  |
| :-------------- | :------- | :---------- | :------------------------------------------------------------------------------------------- |
| `type`          | `string` | Yes         | Supported values: `text`, `image_url`, `video_url`, and `audio_url`.                         |
| `text`          | `string` | Conditional | Required when `type` is `text`. Each text value can contain up to 7,000 characters.          |
| `image_url.url` | `string` | Conditional | Required when `type` is `image_url`. Provide an image URL or Data URI.                       |
| `video_url.url` | `string` | Conditional | Required when `type` is `video_url`. Only available for multimodal reference-to-video jobs.  |
| `audio_url.url` | `string` | Conditional | Required when `type` is `audio_url`. Only available for multimodal reference-to-video jobs.  |
| `role`          | `string` | Conditional | Identifies how the media is used. See the supported values below.                            |

### role values

| role              | Input type | Description                                                                                         |
| :---------------- | :--------- | :-------------------------------------------------------------------------------------------------- |
| `first_frame`     | Image      | The first-frame image. If you provide only one image and omit `role`, it is used as the first frame. |
| `last_frame`      | Image      | The last-frame image. When you use first-and-last-frame mode, also provide a `first_frame`.          |
| `reference_image` | Image      | A multimodal reference image. You can provide up to 9 images.                                       |
| `reference_video` | Video      | A multimodal reference video. You can provide up to 3 videos.                                       |
| `reference_audio` | Audio      | Multimodal reference audio. You can provide up to 3 audio clips.                                    |

## 2. Choose a generation mode

### Text-to-video

For text-to-video generation, `content` contains only text. The `ratio` field is required and cannot be set to `adaptive`.

```json
{
  "model": "MiniMax-H3",
  "metadata": {
    "content": [
      {
        "type": "text",
        "text": "An epic space-opera theatrical trailer: a female captain stands alone before a vast observation window as the last fleet assembles and jumps away. Bright flashes erupt, the bridge shakes, and she is left behind."
      }
    ],
    "resolution": "2K",
    "duration": 5,
    "ratio": "16:9",
    "aigc_watermark": false
  }
}
```

### Image-to-video

In addition to text, provide a first-frame image, a last-frame image, or both. The input images determine the aspect ratio, so set `ratio` to `adaptive`.

```json
{
  "model": "MiniMax-H3",
  "metadata": {
    "content": [
      {
        "type": "text",
        "text": "The camera slowly pushes in. The character turns to look into the distance while their clothes move naturally in the wind."
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/first-frame.png"
        },
        "role": "first_frame"
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/last-frame.png"
        },
        "role": "last_frame"
      }
    ],
    "resolution": "2K",
    "duration": 5,
    "ratio": "adaptive"
  }
}
```

### Multimodal reference-to-video

You can combine reference images, reference videos, and reference audio. You can omit `ratio` to use the default value of `adaptive`, or explicitly specify a fixed aspect ratio.

```json
{
  "model": "MiniMax-H3",
  "metadata": {
    "content": [
      {
        "type": "text",
        "text": "The character faces the camera and says: Follow the wind, live free. Use reference audio 1 for the voice, and use the provided video and image as motion and composition references."
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/character.png"
        },
        "role": "reference_image"
      },
      {
        "type": "video_url",
        "video_url": {
          "url": "https://example.com/motion-reference.mp4"
        },
        "role": "reference_video"
      },
      {
        "type": "audio_url",
        "audio_url": {
          "url": "https://example.com/voice-reference.mp3"
        },
        "role": "reference_audio"
      }
    ],
    "resolution": "2K",
    "duration": 5,
    "ratio": "9:16"
  }
}
```

<Warning>
  You cannot combine image-to-video mode with multimodal reference-to-video mode. If `content` contains `reference_image`, `reference_video`, or `reference_audio`, you cannot use `first_frame` or `last_frame`, and vice versa.
</Warning>

## 3. Input media requirements

The entire request body must not exceed 64 MB. Base64 encoding typically increases the data size by approximately 33%. Use a public URL for larger media files.

Media URLs support the following formats:

- A publicly accessible HTTP or HTTPS URL.
- A Data URI for the corresponding media type, such as `data:image/png;base64,...`, `data:video/mp4;base64,...`, or `data:audio/mp3;base64,...`.

### Image limits

| Item          | Limit                                                                 |
| :------------ | :-------------------------------------------------------------------- |
| Formats       | JPG, JPEG, PNG, WEBP, HEIC, HEIF                                      |
| File size     | Up to 30 MB per file                                                   |
| Dimensions    | 256 to 5,760 pixels                                                    |
| Aspect ratio  | 0.4 to 2.5                                                             |
| Count         | Up to 1 first frame, 1 last frame, and 9 reference images             |

### Video limits

| Item          | Limit                                                        |
| :------------ | :----------------------------------------------------------- |
| Formats       | MP4, MOV                                                     |
| Video codecs  | H.264/AVC, H.265/HEVC                                        |
| Audio codecs  | AAC, MP3                                                     |
| File size     | Up to 50 MB per file                                         |
| Count         | Up to 3 videos                                               |
| Duration      | 2 to 15 seconds per video, up to 15 seconds total            |
| Dimensions    | 256 to 5,760 pixels                                          |
| Aspect ratio  | 0.4 to 2.5                                                   |
| Frame rate    | 23.976 to 60 FPS                                             |

### Audio limits

| Item          | Limit                                                        |
| :------------ | :----------------------------------------------------------- |
| Formats       | WAV, MP3                                                     |
| File size     | Up to 15 MB per file                                         |
| Count         | Up to 3 audio clips                                          |
| Duration      | 2 to 15 seconds per clip, up to 15 seconds total             |

## 4. Send a request

The following example creates a `2K`, 5-second, `16:9` text-to-video job.

<CodeGroup>

```bash cURL
curl -X POST "https://api.onetoken.one/v1/video/generations" \
  -H "Authorization: Bearer $YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "MiniMax-H3",
    "metadata": {
      "content": [
        {
          "type": "text",
          "text": "A cinematic aerial shot glides over a futuristic city after the rain, with neon lights reflected in the streets."
        }
      ],
      "resolution": "2K",
      "duration": 5,
      "ratio": "16:9",
      "aigc_watermark": false
    }
  }'
```

```python Python
import os

import requests

response = requests.post(
    "https://api.onetoken.one/v1/video/generations",
    headers={
        "Authorization": f"Bearer {os.environ['ONETOKEN_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "model": "MiniMax-H3",
        "metadata": {
            "content": [
                {
                    "type": "text",
                    "text": "A cinematic aerial shot glides over a futuristic city after the rain, with neon lights reflected in the streets.",
                }
            ],
            "resolution": "2K",
            "duration": 5,
            "ratio": "16:9",
            "aigc_watermark": False,
        },
    },
    timeout=30,
)
response.raise_for_status()
print(response.json())
```

</CodeGroup>

### Successful creation response

A successful creation response means the job has entered the asynchronous queue. It does not mean the video is complete.

```json
{
  "task_id": "task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe",
  "status": "queued"
}
```

Save the complete `task_id`. You must use this value exactly as returned for subsequent queries.

## 5. Query job status

### Request information

<ParamField path="GET" type="/v1/video/generations/{task_id}" required>
  Query the job status and generation result.
</ParamField>

<ParamField path="task_id" type="string" required>
  The public OneToken job ID returned when you created the job, such as `task_xxx`.
</ParamField>

```bash
curl "https://api.onetoken.one/v1/video/generations/task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe" \
  -H "Authorization: Bearer $YOUR_API_KEY"
```

### Successful response

HTTP status code: `200`

```json
{
  "code": "success",
  "message": "",
  "data": {
    "id": 1024,
    "created_at": 1786939200,
    "updated_at": 1786939260,
    "task_id": "task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe",
    "platform": "minimax-h3",
    "user_id": 1001,
    "group": "default",
    "channel_id": 12,
    "quota": 4000000,
    "action": "generate",
    "status": "SUCCESS",
    "fail_reason": "",
    "result_url": "https://example.com/generated/minimax-h3-output.mp4",
    "submit_time": 1786939200,
    "start_time": 1786939205,
    "finish_time": 1786939260,
    "progress": "100%",
    "properties": {
      "input": "",
      "upstream_model_name": "MiniMax-H3",
      "origin_model_name": "MiniMax-H3"
    },
    "data": {
      "task": {
        "id": "424010985738629",
        "model": "MiniMax-H3",
        "status": "succeeded",
        "created_at": 1786939200,
        "updated_at": 1786939260,
        "content": {
          "url": "https://example.com/generated/minimax-h3-output.mp4"
        },
        "resolution": "2K",
        "duration": 5,
        "usage": {
          "total_seconds": 5,
          "input_seconds": 0,
          "output_seconds": 5,
          "input_image_count": 0
        },
        "ratio": "16:9",
        "task_type": "generation",
        "modality": "video"
      }
    }
  }
}
```

### Response fields

| Field                        | Type      | Description                                                                                         |
| :--------------------------- | :-------- | :-------------------------------------------------------------------------------------------------- |
| `code`                       | `string`  | Always `success` when the request succeeds.                                                         |
| `message`                    | `string`  | Usually empty when the request succeeds.                                                            |
| `data.task_id`               | `string`  | The job ID exposed by OneToken.                                                                     |
| `data.platform`              | `string`  | The platform identifier for the MiniMax-H3 job.                                                     |
| `data.status`                | `string`  | The job status recorded by NewAPI.                                                                  |
| `data.progress`              | `string`  | Job progress, such as `10%`, `50%`, or `100%`.                                                      |
| `data.fail_reason`           | `string`  | The reason the job failed. Empty for a successful job.                                              |
| `data.result_url`            | `string`  | The generated video URL. It might not be returned until the job succeeds.                           |
| `data.quota`                 | `integer` | The actual quota deducted for this job.                                                             |
| `data.submit_time`           | `integer` | The job submission time as a Unix timestamp in seconds.                                             |
| `data.start_time`            | `integer` | The job start time. This is `0` until the job starts.                                                |
| `data.finish_time`           | `integer` | The job completion time. This is `0` until the job completes.                                       |
| `data.properties`            | `object`  | Information about the original model and upstream model.                                            |
| `data.data`                  | `object`  | The raw MiniMax upstream response. After polling completes, job details are in `data.data.task`.     |
| `data.data.task.id`          | `string`  | The MiniMax upstream job ID. Do not use this value with the OneToken query endpoint.                 |
| `data.data.task.content.url` | `string`  | The video URL returned by MiniMax.                                                                  |
| `data.data.task.usage`       | `object`  | Duration and reference-image usage returned by MiniMax.                                             |

### Status mapping

| MiniMax status `data.data.task.status` | NewAPI job status `data.status` | Progress |
| :------------------------------------- | :------------------------------ | :------- |
| `queued`                               | `QUEUED`                        | `10%`    |
| `running`                              | `IN_PROGRESS`                   | `50%`    |
| `succeeded`                            | `SUCCESS`                       | `100%`   |
| `failed`                               | `FAILURE`                       | `100%`   |
| `cancelled`                            | `FAILURE`                       | `100%`   |
| Any other unknown status               | `IN_PROGRESS`                   | `30%`    |

Poll every 5 to 10 seconds. Use the outer `data.status` field to determine whether the job is complete, and use `data.result_url` to get the final video URL.

### Data before the first poll completes

Immediately after submission, before the first upstream poll completes, `data.data` might contain only the MiniMax upstream job ID returned during job creation:

```json
{
  "task_id": "424010985738629"
}
```

Continue polling in this case. Do not replace the `task_id` in the query URL with this upstream value.

### Failed job response

When generation fails, the query endpoint still returns HTTP `200`, and the top-level `code` remains `success`. The failure status and reason are in the job object.

```json
{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_pNzpa5Aw21zihhdYrACj6Jy0ZVW76BEe",
    "platform": "minimax-h3",
    "status": "FAILURE",
    "progress": "100%",
    "fail_reason": "Error message returned by upstream",
    "data": {
      "task": {
        "id": "424010985738629",
        "model": "MiniMax-H3",
        "status": "failed",
        "error": {
          "code": "InvalidParameter",
          "message": "Error message returned by upstream"
        }
      }
    }
  }
}
```

### Job not found

If the job ID does not exist or does not belong to the current user, the endpoint returns HTTP `400`:

```json
{
  "code": "task_not_exist",
  "message": "task_not_exist",
  "data": null
}
```

## 6. Callback notifications

When you provide `metadata.callback_url`, MiniMax first sends a verification request containing a `challenge` to that URL. Your service must return the same `challenge` within 3 seconds. After successful verification, MiniMax sends POST notifications to the URL when the job status changes.

Callbacks do not replace the query endpoint. Your service should still be able to query the job with `task_id`.

## 7. Error responses

The API uses OpenAI-style error objects and returns the corresponding HTTP status code.

```json
{
  "type": "error",
  "error": {
    "type": "bad_request_error",
    "message": "invalid params, content must include a non-empty text item (prompt is required) (2013)",
    "http_code": "400"
  },
  "request_id": "021785229015510a2c883cf675b9804d"
}
```

| HTTP status code | Error type                   | Description                                      |
| :--------------- | :--------------------------- | :----------------------------------------------- |
| `400`            | `bad_request_error`          | The request parameters are invalid.              |
| `401`            | `authorized_error`           | The API key is missing or invalid.                |
| `402`            | `insufficient_balance_error` | The account balance or quota is insufficient.    |
| `422`            | `unprocessable_entity_error` | The input did not pass the safety check.          |
| `429`            | `rate_limit_error`           | The request triggered a rate limit.               |
| `500`            | `server_error`               | Server-side processing failed.                    |

Keep the `request_id` from the response when you troubleshoot an issue.
