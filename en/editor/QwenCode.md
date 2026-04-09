---
title: Qwen Code
icon: code
---

> Use any Onetoken-hosted LLM with Qwen Code.

## Quick setup

### 1. Install globally

Node.js **≥ 20**, then:

```shell theme={null}
npm install -g @qwen-code/qwen-code
qwen --version
```

See the [official repo](https://github.com/QwenLM/qwen-code) for details.

### 2. Environment variables

Add your Onetoken key and base URL (create keys on the [Keys page](https://onetoken.one/token)).

In `~/.zshrc` (example):

```shell theme={null}
export OPENAI_API_KEY="your_onetoken_key"
export OPENAI_BASE_URL="https://onetoken.one/v1"
export OPENAI_MODEL="your_model"
```

<Tip>
  On Mac, press `⌘ + ⇧ + .` in your home folder to show dotfiles, then edit `.zshrc` in TextEdit (or any editor).
</Tip>

### 3. Apply

Run `source ~/.zshrc`.

### 4. Run

```shell theme={null}
qwen
```

After launch, run `/about` to confirm version and model:

<img src="https://mintcdn.com/aihubmix/UgvkHPDoK6o04763/public/cn/Qwen-code.png?fit=max&auto=format&n=UgvkHPDoK6o04763&q=85&s=fbf0fe0ae179a4a00c1842a068144a8d" alt="about" width="1990" height="2034" data-path="public/cn/Qwen-code.png" />

<Note>
  Some users report occasional stalls—consider a **limited quota** on your [key](https://onetoken.one/token) to cap spend.
</Note>

You’re ready to use Qwen Code normally.
