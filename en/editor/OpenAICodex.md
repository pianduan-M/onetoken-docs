---
title: OpenAI Codex
icon: code
---

> Use OpenAI Codex CLI and the desktop app through the OneToken API.

This guide explains how to install Codex and configure the OneToken API manually. Windows, macOS, and Linux use the same configuration values; only the configuration paths and editing commands differ.

## Before you start

1. Get a OneToken API key from the [OneToken API token page](https://onetoken.one/console/token).
2. Make sure the key is valid and has enough quota and model access.
3. Install Node.js 16 or later. The current LTS release is recommended.

> Replace `YOUR_ONETOKEN_API_KEY` in the examples with your real key. Keep API keys in local configuration files only. Never commit them to Git or publish them.

## Install Codex

### Desktop app

Visit the [OpenAI Codex download page](https://openai.com/codex/) to get the desktop app. Desktop platform support can change, so follow the systems listed on the download page. The CLI can be configured on all three platforms with the steps below.

### CLI

Run the following command in Terminal, PowerShell, or CMD:

```bash theme={null}
npm install -g @openai/codex
```

Verify the installation:

```bash theme={null}
codex --version
```

If your system cannot find `codex`, close and reopen the terminal, or check that the npm global installation directory is included in `PATH`.

## Configure the API manually

Codex uses two files for a custom model provider:

| File | Purpose |
| --- | --- |
| `auth.json` | Stores your API key |
| `config.toml` | Stores the provider, API endpoint, model, and reasoning settings |

The default configuration directory is `~/.codex`. If you set the `CODEX_HOME` environment variable, Codex uses that directory instead. The platform paths below assume `CODEX_HOME` is not set.

### 1. Edit `auth.json`

The file content is the same on all three platforms:

```json theme={null}
{
  "OPENAI_API_KEY": "YOUR_ONETOKEN_API_KEY"
}
```

### 2. Edit `config.toml`

The file content is the same on all three platforms:

```toml theme={null}
model = "gpt-5.2"
model_provider = "OneToken"
model_reasoning_effort = "high"
personality = "pragmatic"
cli_auth_credentials_store = "file"

[model_providers.OneToken]
name = "OneToken"
base_url = "https://onetoken.one/v1"
wire_api = "responses"
requires_openai_auth = true
supports_websockets = false
```

Configuration notes:

- Set `base_url` to `https://onetoken.one/v1`. Do not append `/responses`.
- Set `model` to a model name listed in the [OneToken model catalog](https://onetoken.one/pricing). If the model name changes, update this value.
- `model_reasoning_effort` accepts `high`, `medium`, or `low`.
- `cli_auth_credentials_store = "file"` tells Codex to read credentials from `auth.json`, which matches the manual setup in this guide. Treat this file like a password.
- The `model_provider` value must match the `[model_providers.OneToken]` section name. This guide uses `OneToken` as the provider ID.
- To maintain multiple configurations, create a separate `$CODEX_HOME/<profile-name>.config.toml` file for each one (`~/.codex/<profile-name>.config.toml` when `CODEX_HOME` is not set), then start Codex with `codex --profile <profile-name>`. A profile file is not required for the basic setup.

## Platform-specific paths and editing steps

<Tabs>
  <Tab title="Windows">
    ### Configuration directory

    Windows stores the configuration in the current user's `.codex` directory:

    ```text theme={null}
    C:\Users\<your-username>\.codex
    ```

    You can also enter this path in File Explorer:

    ```text theme={null}
    %USERPROFILE%\.codex
    ```

    `.codex` may be hidden. Create it if it does not exist.

    ### Create and edit files with PowerShell

    1. Open PowerShell.
    2. Create the directory and both files:

    ```powershell theme={null}
    $codexDir = Join-Path $env:USERPROFILE ".codex"
    New-Item -ItemType Directory -Force -Path $codexDir | Out-Null
    New-Item -ItemType File -Force -Path (Join-Path $codexDir "auth.json") | Out-Null
    New-Item -ItemType File -Force -Path (Join-Path $codexDir "config.toml") | Out-Null
    ```

    3. Open each file and paste the JSON and TOML content shown above:

    ```powershell theme={null}
    notepad "$env:USERPROFILE\.codex\auth.json"
    notepad "$env:USERPROFILE\.codex\config.toml"
    ```

    4. Save the files as UTF-8. Make sure the names are not `auth.json.txt` or `config.toml.txt`.

    ### Create and edit files with CMD

    You can also run the following commands in CMD:

    ```bat theme={null}
    if not exist "%USERPROFILE%\.codex" mkdir "%USERPROFILE%\.codex"
    if not exist "%USERPROFILE%\.codex\auth.json" type nul > "%USERPROFILE%\.codex\auth.json"
    if not exist "%USERPROFILE%\.codex\config.toml" type nul > "%USERPROFILE%\.codex\config.toml"
    notepad "%USERPROFILE%\.codex\auth.json"
    notepad "%USERPROFILE%\.codex\config.toml"
    ```

    If Codex cannot find Bash when running project commands, install [Git for Windows](https://git-scm.com/downloads), then use Git Bash or reopen PowerShell.
  </Tab>

  <Tab title="macOS">
    ### Configuration directory

    macOS stores the configuration in:

    ```text theme={null}
    ~/.codex
    ```

    The full path is usually similar to `/Users/<your-username>/.codex`.

    ### Create and edit files in Terminal

    1. Open Terminal.
    2. Create the directory and both files:

    ```bash theme={null}
    mkdir -p ~/.codex
    touch ~/.codex/auth.json ~/.codex/config.toml
    ```

    3. Open the files with the built-in `nano` editor:

    ```bash theme={null}
    nano ~/.codex/auth.json
    nano ~/.codex/config.toml
    ```

    Paste the JSON and TOML content shown above into the corresponding files. In `nano`, press `Control + O`, press Enter to save, then press `Control + X` to exit.

    4. Restrict access to the directory and API key file:

    ```bash theme={null}
    chmod 700 ~/.codex
    chmod 600 ~/.codex/auth.json ~/.codex/config.toml
    ```

    You can also press `Command + Shift + G` in Finder and enter `~/.codex` to open the directory.
  </Tab>

  <Tab title="Linux">
    ### Configuration directory

    Linux stores the configuration in the current user's home directory:

    ```text theme={null}
    ~/.codex
    ```

    The full path is usually similar to `/home/<your-username>/.codex`.

    ### Create and edit files in Terminal

    1. Open a terminal.
    2. Create the directory and both files:

    ```bash theme={null}
    mkdir -p ~/.codex
    touch ~/.codex/auth.json ~/.codex/config.toml
    ```

    3. Open the files with `nano` or another text editor:

    ```bash theme={null}
    nano ~/.codex/auth.json
    nano ~/.codex/config.toml
    ```

    Paste the JSON and TOML content shown above into the corresponding files. In `nano`, press `Control + O`, press Enter to save, then press `Control + X` to exit.

    4. Restrict access to the directory and files:

    ```bash theme={null}
    chmod 700 ~/.codex
    chmod 600 ~/.codex/auth.json ~/.codex/config.toml
    ```

    Do not use `sudo` to create these files. Otherwise, they may belong to `root`, and your normal user may not be able to read or update them.
  </Tab>
</Tabs>

## Start and verify Codex

After saving the configuration, close and reopen your terminal. Go to your project directory and start Codex:

<CodeGroup>
  ```bash macOS / Linux theme={null}
  cd /path/to/your/project
  codex
  ```

  ```powershell Windows PowerShell theme={null}
  Set-Location "C:\path\to\your\project"
  codex
  ```

  ```bat Windows CMD theme={null}
  cd /d C:\path\to\your\project
  codex
  ```
</CodeGroup>

Enter a simple task such as “Reply with: setup complete”. If Codex responds, the API configuration is working.

You can also run a non-interactive check:

```bash theme={null}
codex -q "Reply with only: setup complete"
```

If Codex still uses the old settings, fully quit the CLI or desktop app and start it again. The CLI and desktop app should use the same `.codex` directory for the current user.

## Configure with CC-Switch

If you prefer not to edit the files manually, use CC-Switch:

1. Open CC-Switch and add a provider.

<img src="/images/codex/1.png" alt="Add a Codex provider" width="2072" height="1374" />

2. Select **OneToken** from the presets.

<img src="/images/codex/2.png" alt="Select the OneToken preset" width="2072" height="1374" />

3. Enter your OneToken key in **API Key**, then click **Add**.

<img src="/images/codex/3.png" alt="Enter the API key" width="2072" height="1374" />

4. Return to the home screen, select **OneToken**, and click **Enable**.

<img src="/images/codex/4.png" alt="Enable OneToken" width="2072" height="1374" />

CC-Switch writes to the current user's `.codex` directory. Restart Codex after switching providers so it loads the new configuration.

## Use the Codex desktop app

1. Start the Codex desktop app and choose a workspace folder.
2. Enter a simple task to test the connection.
3. If the app asks you to sign in or does not load the configuration, quit the app. Check `auth.json` and `config.toml` in the current user's `.codex` directory, then start the app again.

![Codex desktop app](/images/OpenAICodex/4.webp)

## Troubleshooting

### 401 or 403 responses

- Check that the API key in `auth.json` is complete, valid, and has no extra spaces.
- Confirm the key's quota, expiration, and model permissions.
- Confirm that `base_url` is `https://onetoken.one/v1` and does not contain a duplicated `/v1`.

### Model not found

Open the [OneToken model catalog](https://onetoken.one/pricing), copy an available model name, and update `model` in `config.toml`.

### Configuration is not applied

- Make sure the files are in the current user's `.codex` directory, not the project directory or another user's directory.
- On Windows, check that the files were not saved as `auth.json.txt` or `config.toml.txt`.
- Make sure the provider section and `model_provider` both use `OneToken`, including matching capitalization. Newer Codex versions do not require a `[profiles.OneToken]` table in `config.toml`.
- Fully quit and restart the Codex CLI or desktop app.

### View command help

```bash theme={null}
codex -h
```

Common examples:

```text theme={null}
codex -m <model> "your task"
codex -q "your task"
codex --auto-edit "your task"
```

`--auto-edit` and `--full-auto` reduce the number of confirmation prompts. Use them only in project directories where you understand the risks. Avoid options that bypass all safety confirmations unless you are performing temporary local testing.
