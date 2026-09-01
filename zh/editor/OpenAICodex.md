---
title: OpenAI Codex
icon: openai
iconType: brands
---

> 通过 OneToken API 使用 OpenAI Codex CLI 和桌面端。

本页介绍如何安装 Codex，并手动配置 OneToken API。Windows、macOS 和 Linux 使用相同的配置内容，区别主要是配置文件所在位置和编辑方式。

## 开始前准备

1. 准备一个 OneToken API Key。可在 [OneToken API 令牌页面](https://onetoken.one/console/token) 创建或查看。
2. 确认 API Key 未过期，并且额度和模型权限满足使用要求。
3. 准备 Node.js 16 或更高版本（建议使用当前 LTS 版本）。

> 请将示例中的 `YOUR_ONETOKEN_API_KEY` 替换为真实密钥。API Key 只应保存在本机配置文件中，不要提交到 Git 仓库或公开发布。

## 安装 Codex

### 官方桌面端

请访问 [OpenAI Codex 下载页](https://openai.com/zh-Hans-CN/codex/) 获取桌面端。桌面端的系统支持情况以下载页显示为准；三个平台均可按本页步骤配置并使用 CLI。

### 命令行版本

在终端、PowerShell 或 CMD 中运行：

```bash theme={null}
npm install -g @openai/codex
```

安装完成后检查版本：

```bash theme={null}
codex --version
```

如果系统提示找不到 `codex`，请先关闭并重新打开终端，或检查 npm 全局安装目录是否已加入 `PATH`。

## 手动配置 API

Codex 使用两个文件保存自定义服务商配置：

| 文件 | 作用 |
| --- | --- |
| `auth.json` | 保存 API Key |
| `config.toml` | 保存服务商、接口地址、模型和推理强度 |

默认配置目录为 `~/.codex`。如果你设置了 `CODEX_HOME` 环境变量，Codex 会改用该变量指向的目录；下方平台路径均以未设置 `CODEX_HOME` 为前提。

### 1. 编辑 `auth.json`

三个平台的文件内容相同：

```json theme={null}
{
  "OPENAI_API_KEY": "YOUR_ONETOKEN_API_KEY"
}
```

### 2. 编辑 `config.toml`

三个平台的文件内容相同：

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

配置说明：

- `base_url` 必须填写 `https://onetoken.one/v1`，不要再额外拼接 `/responses`。
- `model` 应填写 OneToken 模型广场中的模型名称。如果模型名称发生变化，请修改此值。
- `model_reasoning_effort` 可设置为 `high`、`medium` 或 `low`。
- `cli_auth_credentials_store = "file"` 让 Codex 从 `auth.json` 读取凭据，适合本页的手动配置方式。该文件包含密钥，请妥善保护。
- `model_provider` 的值必须与 `[model_providers.OneToken]` 的区块名称一致。本页使用 `OneToken` 作为服务商标识。
- 如果你需要多个配置，可以为每个配置建立单独的 `$CODEX_HOME/<profile-name>.config.toml` 文件（未设置 `CODEX_HOME` 时就是 `~/.codex/<profile-name>.config.toml`），再使用 `codex --profile <profile-name>` 启动。基础配置不需要 profile 文件。

## 三个平台的文件位置和编辑方法

<Tabs>
  <Tab title="Windows">
    ### 配置目录

    Windows 的配置目录是当前用户目录下的 `.codex`：

    ```text theme={null}
    C:\Users\<你的用户名>\.codex
    ```

    也可以在文件资源管理器地址栏直接输入：

    ```text theme={null}
    %USERPROFILE%\.codex
    ```

    `.codex` 是隐藏目录。如果目录不存在，请先创建它。

    ### 使用 PowerShell 创建并编辑

    1. 打开 PowerShell。
    2. 运行以下命令创建目录和两个文件：

    ```powershell theme={null}
    $codexDir = Join-Path $env:USERPROFILE ".codex"
    New-Item -ItemType Directory -Force -Path $codexDir | Out-Null
    New-Item -ItemType File -Force -Path (Join-Path $codexDir "auth.json") | Out-Null
    New-Item -ItemType File -Force -Path (Join-Path $codexDir "config.toml") | Out-Null
    ```

    3. 分别打开文件，将上方对应的 JSON 和 TOML 内容粘贴进去：

    ```powershell theme={null}
    notepad "$env:USERPROFILE\.codex\auth.json"
    notepad "$env:USERPROFILE\.codex\config.toml"
    ```

    4. 保存文件。建议将文件编码保存为 UTF-8，并确认文件名不是 `auth.json.txt` 或 `config.toml.txt`。

    ### 使用 CMD 创建并编辑

    也可以在 CMD 中运行：

    ```bat theme={null}
    if not exist "%USERPROFILE%\.codex" mkdir "%USERPROFILE%\.codex"
    if not exist "%USERPROFILE%\.codex\auth.json" type nul > "%USERPROFILE%\.codex\auth.json"
    if not exist "%USERPROFILE%\.codex\config.toml" type nul > "%USERPROFILE%\.codex\config.toml"
    notepad "%USERPROFILE%\.codex\auth.json"
    notepad "%USERPROFILE%\.codex\config.toml"
    ```

    如果 Codex 在执行项目命令时提示找不到 Bash，可安装 [Git for Windows](https://git-scm.com/downloads)，然后使用 Git Bash 或重新打开 PowerShell 后再试。
  </Tab>

  <Tab title="macOS">
    ### 配置目录

    macOS 的配置目录是：

    ```text theme={null}
    ~/.codex
    ```

    其完整路径通常类似于 `/Users/<你的用户名>/.codex`。

    ### 使用终端创建并编辑

    1. 打开“终端”（Terminal）。
    2. 创建目录和文件：

    ```bash theme={null}
    mkdir -p ~/.codex
    touch ~/.codex/auth.json ~/.codex/config.toml
    ```

    3. 使用系统自带的 `nano` 编辑文件：

    ```bash theme={null}
    nano ~/.codex/auth.json
    nano ~/.codex/config.toml
    ```

    将上方对应的 JSON 和 TOML 内容分别粘贴进去。`nano` 的保存方式是按 `Control + O`、回车确认，再按 `Control + X` 退出。

    4. 设置文件权限，避免其他本机用户读取密钥：

    ```bash theme={null}
    chmod 700 ~/.codex
    chmod 600 ~/.codex/auth.json ~/.codex/config.toml
    ```

    也可以在 Finder 中按 `Command + Shift + G`，输入 `~/.codex` 打开配置目录。
  </Tab>

  <Tab title="Linux">
    ### 配置目录

    Linux 的配置目录是当前用户主目录下的 `.codex`：

    ```text theme={null}
    ~/.codex
    ```

    不同发行版的完整路径通常类似于 `/home/<你的用户名>/.codex`。

    ### 使用终端创建并编辑

    1. 打开终端。
    2. 创建目录和文件：

    ```bash theme={null}
    mkdir -p ~/.codex
    touch ~/.codex/auth.json ~/.codex/config.toml
    ```

    3. 使用 `nano` 或其他文本编辑器打开文件：

    ```bash theme={null}
    nano ~/.codex/auth.json
    nano ~/.codex/config.toml
    ```

    将上方对应的 JSON 和 TOML 内容分别粘贴进去。`nano` 的保存方式是按 `Control + O`、回车确认，再按 `Control + X` 退出。

    4. 设置目录和文件权限：

    ```bash theme={null}
    chmod 700 ~/.codex
    chmod 600 ~/.codex/auth.json ~/.codex/config.toml
    ```

    不建议使用 `sudo` 创建这些文件，否则文件可能归属于 `root`，导致普通用户启动 Codex 时无法读取或保存配置。
  </Tab>
</Tabs>

## 启动和验证

完成配置后，关闭并重新打开终端。进入项目目录并启动 Codex：

<CodeGroup>
  ```bash macOS / Linux theme={null}
  cd /你的项目路径
  codex
  ```

  ```powershell Windows PowerShell theme={null}
  Set-Location "C:\你的项目路径"
  codex
  ```

  ```bat Windows CMD theme={null}
  cd /d C:\你的项目路径
  codex
  ```
</CodeGroup>

在 Codex 中输入一个简单任务，例如“请回复：配置成功”。能够正常收到响应，说明 API 配置已生效。

也可以使用非交互模式快速验证：

```bash theme={null}
codex -q "请只回复：配置成功"
```

如果修改了配置后仍然读取旧设置，请完全退出 Codex 桌面端和终端，再重新启动。桌面端和 CLI 应使用同一个当前用户 `.codex` 目录；Windows、macOS、Linux 的路径请以本页对应平台为准。

## 通过 CC-Switch 配置

如果不想手动编辑文件，也可以使用 CC-Switch：

1. 打开 CC-Switch，添加供应商。

<img src="/images/codex/1.png" alt="添加 Codex 供应商" width="2072" height="1374" />

2. 在预设列表中选择 **OneToken**。

<img src="/images/codex/2.png" alt="选择 OneToken 预设" width="2072" height="1374" />

3. 在 **API Key** 栏填写 OneToken 密钥，点击 **添加** 保存。

<img src="/images/codex/3.png" alt="填写 API Key" width="2072" height="1374" />

4. 返回首页，选择 **OneToken**，点击 **启用**。

<img src="/images/codex/4.png" alt="启用 OneToken" width="2072" height="1374" />

CC-Switch 写入的配置仍然位于当前用户的 `.codex` 目录。切换供应商后，需要重新启动 Codex 才能读取新配置。

## 在 Codex 桌面端使用

1. 启动 Codex 桌面端并选择工作目录。
2. 输入一个简单任务进行测试。
3. 如果桌面端提示登录或没有读取到配置，请先退出桌面端，确认当前用户 `.codex` 目录中的 `auth.json` 和 `config.toml` 内容正确，再重新打开应用。

![Codex 桌面端](/images/OpenAICodex/4.webp)

## 常见问题

### 返回 401 或 403

- 检查 `auth.json` 中的 API Key 是否完整、有效且没有多余空格。
- 确认 API Key 对应的额度、有效期和模型权限。
- 确认 `base_url` 是 `https://onetoken.one/v1`，并且没有写成带重复 `/v1` 的地址。

### 提示模型不存在

打开 [OneToken 模型广场](https://onetoken.one/pricing)，复制可用的模型名称，然后修改 `config.toml` 中的 `model`。

### 配置没有生效

- 确认文件位于当前登录用户的 `.codex` 目录，而不是项目目录或其他用户目录。
- Windows 检查文件是否被保存成 `auth.json.txt` 或 `config.toml.txt`。
- 检查 TOML 的区块名称和 `model_provider` 是否都使用 `OneToken`，大小写必须一致。新版 Codex 不需要在 `config.toml` 中添加 `[profiles.OneToken]`。
- 完全退出并重新启动 Codex CLI 或桌面端。

### 如何查看命令帮助

```bash theme={null}
codex -h
```

常用选项示例：

```text theme={null}
codex -m <model> "你的任务"
codex -q "你的任务"
codex --auto-edit "你的任务"
```

`--auto-edit` 和 `--full-auto` 会放宽操作确认范围。请仅在你了解风险的项目目录中使用，并避免使用会跳过全部安全确认的危险选项。
