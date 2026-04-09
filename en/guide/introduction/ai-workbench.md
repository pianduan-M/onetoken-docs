---
title: AI workbench
icon: star
---

## AI workbench (OneToken account + API key)

The AI workbench is a **web app** that uses your OneToken **LLM API key** to:

- **Chat** (text, multi-turn, clear context)
- **Image generation** (text-to-image; pick models and parameters)
- **Video generation** (text-to-video; pick models and parameters)

> OneToken: **API relay** (sign up, billing, API keys, model selection).  
> AI workbench: **browser UI** (calls with your key and shows results).  
> Open: **https://ai.onetoken.one/**

---

![11.png](https://api.apifox.com/api/v1/projects/7459198/resources/621010/image-preview)

## 1. Prerequisites

- A OneToken account
- A valid OneToken **API key**
- Balance or quota (billing varies by model)

---

## 2. Register and get an API key

1. Sign up / log in on the OneToken site (follow on-page steps).
2. Open the console / dashboard.
3. Create and copy your **API key**
   - Prefer separate keys per use case for rotation and revocation.
4. (Optional) Confirm which models are enabled (chat, image, video).

> Treat your API key like a password—do not share it.

---

## 3. Log in to the workbench

1. Open **https://ai.onetoken.one/**
2. Sign in with your OneToken account (use one-click login if offered).
3. After login, check balance in the lower-left area.

---

## 4. Bind your OneToken API key

After you register, a key is created and tied to the workbench—open the workbench and you can start.

**Check that it works:**

- Balance refresh succeeds.
- You can send a chat and get a reply.

---

## 5. UI overview

The left sidebar usually includes:

- **AI chat**
- **AI image**
- **AI video**
- **History**, **New chat**, etc.

---

## 6. Chat from scratch

### 6.1 New conversation

- Click **New chat**
- Choose **AI chat**

### 6.2 Pick a model

Use the model dropdown (e.g. `gpt-5.2` in screenshots):

- Stronger reasoning / long context: heavier chat models
- Faster / cheaper: lighter models (per OneToken’s available list)

### 6.3 Send a message

- **Enter** to send
- **Ctrl/Cmd + Enter** for newline (follow on-page hints)

### 6.4 Common actions

- **Clear context**: reset session memory
- **New chat**: new thread
- **History**: switch threads in the sidebar

#### Example prompts

- “Rewrite this paragraph in a more professional tone: …”
- “Give me a 7-day fitness plan for beginners with equipment and diet sections.”
- “From this requirements doc, output API definitions and field specs (JSON).”

---

## 7. Image generation (text-to-image)

### 7.1 Open image mode

- Click **AI image** in the sidebar.

### 7.2 Choose an image model

Pick from models OneToken exposes.

### 7.3 Write a prompt

Include:

- Subject (person, scene, object)
- Style (realistic, anime, cyberpunk, watercolor, …)
- Composition (close-up, full body, top-down, wide)
- Light and mood (soft light, backlight, neon night)
- Quality hints (high detail, 8k, cinematic)

Optional negative prompt, e.g.:

- “low quality, blurry, bad hands, extra fingers”

### 7.4 Parameters and generate

Typical controls:

- Aspect ratio (1:1, 3:4, 16:9, …)
- Resolution
- Batch count
- Seed

Click **Generate** and wait for results.

#### Example prompt

> “An orange cat in an astronaut helmet floating inside a space capsule, blue Earth in the window, cinematic lighting, ultra-detailed, photorealistic.”

---

## 8. Video generation (text-to-video)

### 8.1 Open video mode

- Click **AI video**.

### 8.2 Choose a video model

Pick from models OneToken exposes.

### 8.3 Prompt tips

Include:

- Scene and subject
- Camera motion (push in, pull out, orbit, follow, pan)
- Duration and pacing (if supported)
- Style (realistic, animated, film-like)

### 8.4 Parameters and generate

Common options (when available):

- Duration (seconds)
- Resolution (720p / 1080p)
- Frame rate
- Aspect ratio (16:9 / 9:16)

Video jobs take longer—please wait.

#### Example prompt

> “Rainy city street at night, neon reflections on wet pavement, a person in a trench coat walks right to left, slow tracking shot, shallow depth of field, realistic.”

---

## 9. Billing

- The workbench **issues requests and shows output**.
- **Charges** follow OneToken rules for the model and usage (tokens, image/video jobs, resolution, duration, etc.).

Tips:

- Start with cheaper models for tests.
- For images/video, try low resolution / short clips first.

---

## 10. FAQ

### Q1: “Key not configured / no permission / 401”

- Confirm the key is active and not disabled.
- Refresh the page and **refresh balance**.

### Q2: Failures or timeouts?

- Image/video are slower—retry or wait.
- Switch model or lower resolution, duration, or batch size.
- Check OneToken status and balance.

### Q3: Why does “clear context” change behavior?

- The model no longer sees prior messages—useful for a fresh topic.

---

## 11. Security

- Do not paste keys in chats, tickets, or public repos.
- Rotate keys periodically; revoke leaked keys immediately.
- For teams, use per-member or per-project keys.

---

## 12. One-minute checklist

1. Sign up / log in to OneToken
2. Create and copy an API key
3. Open https://ai.onetoken.one/ and sign in
4. In **admin / settings**, paste the key if prompted and save
5. In **AI chat**, pick a model and send: “Hi, write a short product blurb.”
6. Try **AI image** and **AI video**

---
