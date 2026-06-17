---
title: OpenClaw
icon: code
---

> OpenClaw is an open agent platform that runs on your machine and works through chat apps you already use.

## Install

<Note>
  Use Node **≥ 22** before installing.
</Note>

```shellscript theme={null}
npm install -g openclaw@latest
```

### Terminal onboarding

```shellscript theme={null}
openclaw onboard
```

Choose `Yes`

<img src="/images/OpenClaw/1.webp" alt="Oc 1" width="1212" height="814" data-path="public/cn/oc-1.png" />

Choose `QuickStart`

<img src="/images/OpenClaw/2.webp" alt="Oc 2" width="1212" height="814" data-path="public/cn/oc-2.png" />

Choose `Skip for now`

<img src="/images/OpenClaw/3.webp" alt="Oc 3" width="1212" height="814" data-path="public/cn/oc-3.png" />

Choose `All providers`

<img src="/images/OpenClaw/4.webp" alt="Oc 4" width="1212" height="814" data-path="public/cn/oc-4.png" />

Pick a default model (you can use `Keep current` and edit the config next)

<img src="/images/OpenClaw/5.webp" alt="Oc 5" width="1212" height="814" data-path="public/cn/oc-5.png" />

Link an account if needed, otherwise `Skip for now`

<img src="/images/OpenClaw/6.webp" alt="Oc 6" width="1212" height="814" data-path="public/cn/oc-6.png" />

Configure skills: choose `Yes`

<img src="/images/OpenClaw/7.webp" alt="Oc 7" width="1212" height="814" data-path="public/cn/oc-7.png" />

Choose `npm`

<img src="/images/OpenClaw/8.webp" alt="Oc 8" width="1212" height="814" data-path="public/cn/oc-8.png" />

Pick the skills you need

<img src="/images/OpenClaw/9.webp" alt="Oc 9" width="1212" height="814" data-path="public/cn/oc-9.png" />

Select all `No` where shown

<img src="/images/OpenClaw/10.webp" alt="Oc 10" width="1212" height="814" data-path="public/cn/oc-10.png" />

`Skip for now`

<img src="/images/OpenClaw/11.webp" alt="Oc 11" width="1212" height="814" data-path="public/cn/oc-11.png" />

Choose `Hatch in UI`

### 修改配置文件

打开 ~/.openclaw/openclaw.json 文件，增加以下配置：

```
{
"models": {
    "mode": "merge",
    "providers": {
      "onetoken": {
        "baseUrl": "https://onetoken.one/v1",
        "apiKey": "API_KEY",
        "api": "openai-completions",
        "models": [
          {
            "id": "claude-sonnet-4-5",
            "name": "claude-sonnet-4-5",
            "reasoning": false,
            "input": [
              "text"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 1000000,
            "maxTokens": 64000
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "onetoken/claude-sonnet-4-5"
      },
      "workspace": "your_workspace_path",
      "compaction": {
        "mode": "safeguard"
      },
      "maxConcurrent": 4,
      "subagents": {
        "maxConcurrent": 8
      }
    }
  }
}
```
