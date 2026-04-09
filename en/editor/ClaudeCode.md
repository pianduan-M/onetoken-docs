---
title: Claude Code
icon: code
---

> Use Claude Code with Onetoken

## Quickstart

This guide gets Claude Code talking to Onetoken in a few minutes.

### 1. Install Claude Code

#### Install script

<CodeGroup>
  ```shellscript macOS theme={null}
  curl -fsSL https://claude.ai/install.sh | bash
  ```

```shellscript Windows theme={null}
irm https://claude.ai/install.ps1 | iex
```

</CodeGroup>

#### npm

Requires [Node.js 18+](https://nodejs.org/en/download/)

```shellscript theme={null}
npm install -g @anthropic-ai/claude-code
```

### 2. Point Claude Code at Onetoken

For Anthropic-compatible access via Onetoken, set:

1. `ANTHROPIC_BASE_URL` → `https://onetoken.one`
2. `ANTHROPIC_AUTH_TOKEN` → API key from [Onetoken](https://console.aihubmix.com/token)
3. `ANTHROPIC_MODEL` → a model id from the [model list](https://onetoken.one/models)

<Tabs>
  <Tab title="macOS">
    1) Check your default shell:

    ```shellscript  theme={null}
    echo $SHELL
    ```

    2. Append exports (replace `ONETOKEN_API_KEY`):

    <CodeGroup>
      ```shellscript Zsh theme={null}
      echo 'export ANTHROPIC_BASE_URL="https://onetoken.one"' >> ~/.zshrc
      echo 'export ANTHROPIC_AUTH_TOKEN="ONETOKEN_API_KEY"' >> ~/.zshrc
      echo 'export ANTHROPIC_MODEL="claude-sonnet-4-5"' >> ~/.zshrc
      ```

      ```shellscript Bash theme={null}
      echo 'export ANTHROPIC_BASE_URL="https://onetoken.one"' >> ~/.bash_profile
      echo 'export ANTHROPIC_AUTH_TOKEN="ONETOKEN_API_KEY"' >> ~/.bash_profile
      echo 'export ANTHROPIC_MODEL="claude-sonnet-4-5"' >> ~/.bash_profile
      ```
    </CodeGroup>

    3. Reload:

    <CodeGroup>
      ```shellscript Zsh theme={null}
      source ~/.zshrc
      ```

      ```shellscript Bash theme={null}
      source ~/.bash_profile
      ```
    </CodeGroup>

    4. Verify in a new terminal:

    ```shellscript  theme={null}
    echo $ANTHROPIC_BASE_URL
    echo $ANTHROPIC_AUTH_TOKEN
    echo $ANTHROPIC_MODEL
    ```

  </Tab>

  <Tab title="Windows">
    In CMD or PowerShell, set Onetoken base URL and [API key](https://onetoken.one/token) as user env vars.

    <Tabs>
      <Tab title="CMD">
        1. Run:

        ```shellscript  theme={null}
        REM Replace ONETOKEN_API_KEY
        setx ANTHROPIC_AUTH_TOKEN "ONETOKEN_API_KEY"
        setx ANTHROPIC_BASE_URL "https://onetoken.one"
        setx ANTHROPIC_MODEL "claude-sonnet-4-5"
        ```

        2. New CMD window:

        ```shellscript  theme={null}
        echo %ANTHROPIC_AUTH_TOKEN%
        echo %ANTHROPIC_BASE_URL%
        echo %ANTHROPIC_MODEL%
        ```
      </Tab>

      <Tab title="PowerShell">
        1. Run:

        ```shellscript  theme={null}
        # Replace ONETOKEN_API_KEY
        [Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "ONETOKEN_API_KEY", [EnvironmentVariableTarget]::User)
        [Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://onetoken.one", [EnvironmentVariableTarget]::User)
        [Environment]::SetEnvironmentVariable("ANTHROPIC_MODEL", "claude-sonnet-4-5", [EnvironmentVariableTarget]::User)
        ```

        2. New PowerShell window:

        ```shellscript  theme={null}
        echo $env:ANTHROPIC_AUTH_TOKEN
        echo $env:ANTHROPIC_BASE_URL
        echo $env:ANTHROPIC_MODEL
        ```
      </Tab>
    </Tabs>

  </Tab>
</Tabs>

### 3. Run

From your project:

```bash theme={null}
$ cd /path/your-project
> claude
```

First launch may ask you to sign in to Anthropic. To skip:

<img src="https://mintcdn.com/aihubmix/HZpz50Qb6hBBcBVb/public/cn/cc-7.jpg?fit=max&auto=format&n=HZpz50Qb6hBBcBVb&q=85&s=0d1309bcea8f4170809d104bc2b380a6" alt="Cc 7" width="1622" height="438" data-path="public/cn/cc-7.jpg" />

1. Edit `~/.claude.json` (macOS/Linux) or `C:\Users\%USERNAME%\.claude.json` (Windows).
2. Set `hasCompletedOnboarding` to `true`:

```json theme={null}
{
  "hasCompletedOnboarding": true
}
```

3. Save and run `claude` again.

#### More ways to pick models (priority high → low)

1. **In session**: `/model <name>` for a one-off switch.

```text theme={null}
/model claude-sonnet-4-5
```

2. **CLI flag**: `claude --model <name>` for one run.

```text theme={null}
claude --model claude-sonnet-4-5
```

3. **Env defaults** (global):

```shellscript theme={null}
export ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-5"
export ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-5"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5"
```

- **OPUS** — hard reasoning / architecture  
- **SONNET** — everyday coding  
- **HAIKU** — quick checks, search  

4. **`settings.json`** (project or user home):

```json theme={null}
{
  "env": {
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5"
  }
}
```

## CC-Switch

1. Open CC-Switch → **Add provider**.

<img src="/images/claudecode/1.png" />

2. Choose **Custom**.

<img src="/images/claudecode/2.png" />

3. Enter API key and endpoint.

<img src="/images/claudecode/3.png" />

4. **Add** to save.

<img src="/images/claudecode/4.png" />

5. Home → select **onetoken** → **Start**.

<img src="/images/claudecode/5.png" />

## VS Code extension

1. Install the extension.

<Frame>
    <img src="https://mintcdn.com/aihubmix/XPAbnoWWzjetSWAU/images/iShot_2026-03-25_11.44.03.jpg?fit=max&auto=format&n=XPAbnoWWzjetSWAU&q=85&s=7fd42add3df2e072c3d8d85eb19c785d" alt="I Shot 2026 03 25 11 44 03" width="1958" height="724" data-path="images/iShot_2026-03-25_11.44.03.jpg" />
</Frame>

2. `Ctrl + Shift + P` / `Cmd + Shift + P` → **Settings**.

<Frame>
    <img src="https://mintcdn.com/aihubmix/XPAbnoWWzjetSWAU/images/iShot_2026-03-25_11.47.48.jpg?fit=max&auto=format&n=XPAbnoWWzjetSWAU&q=85&s=c7b448a36e1886a4a1cdc9103f3844f6" alt="I Shot 2026 03 25 11 47 48" width="1772" height="976" data-path="images/iShot_2026-03-25_11.47.48.jpg" />
</Frame>

3. Search **Claude Code** → `Claude Code: Environment Variable` → **Edit in settings.json**.

<Frame>
    <img src="https://mintcdn.com/aihubmix/XPAbnoWWzjetSWAU/images/iShot_2026-03-25_11.49.37.jpg?fit=max&auto=format&n=XPAbnoWWzjetSWAU&q=85&s=3f5a87bc619bcb552eb4ed78da6527b6" alt="I Shot 2026 03 25 11 49 37" width="1940" height="1248" data-path="images/iShot_2026-03-25_11.49.37.jpg" />
</Frame>

4. Fill `claudeCode.environmentVariables` with Onetoken values.

<Frame>
    <img src="/images/claudecode/6.png" alt="I Shot 2026 03 25 11 53 07" width="1156" height="304" data-path="images/iShot_2026-03-25_11.53.07.jpg" />
</Frame>

## FAQ

### Q: `401 , No token provided...`

In the Claude terminal run `/config`, enable **Use custom API key**, verify the token.

<img src="https://mintcdn.com/aihubmix/Sq3QhNkLGyt6npNr/public/cn/cc-6.png?fit=max&auto=format&n=Sq3QhNkLGyt6npNr&q=85&s=27b1369c8b3970c789b7585e060bde07" alt="install" width="1220" height="760" data-path="public/cn/cc-6.png" />

### Q: `zsh: command not found: claude` on macOS

The binary exists but isn’t on `PATH`. Common locations:

- `~/.claude/bin`
- `~/.local/bin`

```shellscript theme={null}
ls -l ~/.claude/bin
# or
ls -l ~/.local/bin | grep claude
```

**If in `~/.claude/bin`:**

```shellscript theme={null}
echo 'export PATH="$HOME/.claude/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**If in `~/.local/bin`:**

```shellscript theme={null}
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Check:

```text theme={null}
which claude
claude -v
```

### Q: Cannot reach Anthropic

Newer Claude Code builds expect **`ANTHROPIC_AUTH_TOKEN`** instead of `ANTHROPIC_API_KEY`. Update the header name and reload env—key value stays the same. Follow the env steps above.

### Q: Login API Error 403

<img src="/images/claudecode/7.png" />

Upgrade Claude Code to the latest version and disable CC-Switch local proxy / failover if enabled.

## More links

- [GitHub](https://github.com/inferera/aihubmix/blob/main/packages/claude-code/README.md)
- [npm package](https://www.npmjs.com/package/@aihubmix/claude-code)
- [Anthropic best practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Official settings](https://docs.anthropic.com/en/docs/claude-code/settings#settings-files)

Happy coding!
