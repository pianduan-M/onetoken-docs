---
title: OpenAI Codex
icon: code
---

> Use Codex through the Onetoken API

## Install

### Official download (macOS)

[https://openai.com/codex/](https://openai.com/codex/)

### CLI

```bash theme={null}
npm install -g @openai/codex
```

## Environment / config

### Config files

1. Edit `~/.codex/config.toml`:

```toml theme={null}
profile = "OneToken"

[model_providers.OneToken]
name = "OneToken"
base_url = "https://onetoken.one/v1"
personality = "pragmatic"
wire_api = "responses"

[profiles.OneToken]
model = "gpt-5.2"
model_provider = "OneToken"
model_reasoning_effort = "high"
```

2. Edit `~/.codex/auth.json`:

```json theme={null}
{
  "OPENAI_API_KEY": "Onetoken_API_KEY"
}
```

### CC-Switch

1. Open CC-Switch → add a provider.

<img src="/images/codex/1.png" alt="Codex 1" width="2072" height="1374" data-path="public/cn/codex-1.png" />

2. Pick **OneToken** from presets.

<img src="/images/codex/2.png" alt="Codex 2" width="2072" height="1374" data-path="public/cn/codex-2.png" />

3. Paste your API key → **Add**.

<img src="/images/codex/3.png" alt="Codex 3" width="2072" height="1374" data-path="public/cn/codex-3.png" />

4. Select **OneToken** on the home screen → **Enable**.

<img src="/images/codex/4.png" alt="Codex 4" width="2072" height="1374" data-path="public/cn/codex-4.png" />

## Using Codex

### Terminal

1. `cd` to your project, run `codex`.

```bash theme={null}
cd /path/to/your/project
codex
```

2. Set permissions as prompted.

<img src="https://mintcdn.com/aihubmix/7hQ6_nS3fMExXVXm/public/cn/codex-5.png?fit=max&auto=format&n=7hQ6_nS3fMExXVXm&q=85&s=ae7c5f193d3aa5c8723c879840732d78" alt="Codex 5" width="1212" height="814" data-path="public/cn/codex-5.png" />

3. Choose a model.

<img src="https://mintcdn.com/aihubmix/7hQ6_nS3fMExXVXm/public/cn/codex-6.png?fit=max&auto=format&n=7hQ6_nS3fMExXVXm&q=85&s=f942ebc707063463a3961347f8379553" alt="Codex 6" width="1212" height="814" data-path="public/cn/codex-6.png" />

4. Type a natural-language task—if you get a reply, setup works.

<img src="https://mintcdn.com/aihubmix/7hQ6_nS3fMExXVXm/public/cn/codex-8.png?fit=max&auto=format&n=7hQ6_nS3fMExXVXm&q=85&s=bf06aaa8c86834b20e5fef26fba84d50" alt="Codex 8" width="1212" height="814" data-path="public/cn/codex-8.png" />

### Desktop app

1. Open Codex, pick a workspace folder.
2. Enter a task—if it responds, you’re good.

<img src="https://mintcdn.com/aihubmix/7hQ6_nS3fMExXVXm/public/cn/codex-9.png?fit=max&auto=format&n=7hQ6_nS3fMExXVXm&q=85&s=673289a767cd354a686d1e547a364e0d" alt="Codex 9" width="2632" height="1712" data-path="public/cn/codex-9.png" />

## CLI reference

### Help

```bash theme={null}
codex -h
```

### Options (excerpt)

```bash theme={null}
Usage
  $ codex [options] <prompt>

Options
  -h, --help                 Show help and exit
  -m, --model <model>        Model to use (default: codex-mini-latest)
  -i, --image <path>         Path to an image input file
  -v, --view <rollout>       Inspect a saved rollout
  -q, --quiet                Non-interactive: print only final assistant output
  -a, --approval-mode <mode>  Override approval: 'suggest', 'auto-edit', or 'full-auto'

  --auto-edit                Auto-approve file edits; still confirm shell commands
  --full-auto                Auto-approve edits and commands in the sandbox

  --no-project-doc           Do not auto-include repo `codex.md`
  --project-doc <file>       Include a specific Markdown file as context
  --full-stdout              Do not truncate command stdout/stderr

Dangerous
  --dangerously-auto-approve-everything
                             Skip all confirmations and run commands (no sandbox)
                             For temporary local testing only

Experimental
  -f, --full-context         “Full context” mode: load the whole repo and batch-edit
                             Requires --model

Examples
  $ codex "Write and run a Python program that prints ASCII art"
  $ codex -q "Fix the build"
```
