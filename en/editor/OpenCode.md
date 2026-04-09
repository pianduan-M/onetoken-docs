---
title: OpenCode
icon: code
---

## Connect a third-party API in OpenCode

OpenCode is an open-source coding assistant with flexible API wiring. Point it at a relay or direct provider for better models or pricing (DeepSeek, SiliconFlow, etc.).

---

## Step 1: Gather credentials

1. **API key**: [Onetoken console](https://onetoken.one/console/token)
2. **Base URL**: e.g. `https://onetoken.one/v1`
3. **Model id**: e.g. `deepseek-ai/DeepSeek-V3`

---

## Step 2: Open settings

1. Launch **OpenCode**.
2. **Settings gear** (lower left) → **Settings**.
3. Search for `OpenCode` or `AI Provider`.
4. Set **Provider** to `OpenAI Compatible` (or `Custom`).

---

## Step 3: Fill in fields

### 1. Base URL

Set **OpenAI Compatible: Base URL** to your proxy.

> End with `/v1`, **without** `/chat/completions`.

### 2. API key

Paste into **OpenAI Compatible: API Key**.

### 3. Models

Under **Custom Models** / **Model Map**:

- **Add Item**
- Display name (e.g. `DeepSeek`)
- Real model id from the provider (e.g. `deepseek-chat`)

---

## Step 4: Test

1. Open **Chat** (robot icon in the sidebar).
2. Pick your **custom model** in the switcher.
3. Send a prompt (e.g. “implement quicksort”) to verify connectivity.

---

## Advanced: environment variables

OpenCode can read `.env` or system env:

- `OPENAI_API_BASE` — third-party base URL  
- `OPENAI_API_KEY` — key  

---

## Troubleshooting

| Error | Likely cause | Fix |
| :-- | :-- | :-- |
| **Model Not Found** | Wrong model id | Match the provider list exactly. |
| **Invalid API Key** | Bad or expired key | Regenerate; strip newlines. |
| **Network Error** | TLS / proxy | Adjust proxy for CN relays. |
| **Stream Mode Error** | Streaming unsupported | Try disabling **Enable Streaming**. |

---

> **Tip**: OpenCode works well with local stacks. For **LM Studio** or **LocalAI**, set Base URL to `http://localhost:xxxx/v1` for offline use.
