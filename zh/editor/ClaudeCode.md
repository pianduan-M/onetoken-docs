---
title: Claude Code
icon: code
---

> 在 Onetoken 中使用 Claude Code

## 快速开始

本指南将帮助您在几分钟内使用由 Onetoken 提供的 Claude Code.

### 1. 安装 Claude Code

#### 本地安装

<CodeGroup>
  ```shellscript macOS theme={null}
  curl -fsSL https://claude.ai/install.sh | bash
  ```

```shellscript Windows theme={null}
irm https://claude.ai/install.ps1 | iex
```

</CodeGroup>

#### 使用 npm 安装

需要 [Node.js 18 或更高版本](https://nodejs.org/en/download/)

```shellscript theme={null}
npm install -g @anthropic-ai/claude-code
```

### 2. 配置 Onetoken API

要通过兼容 Anthropic API 的方式来接入 Onetoken 的模型服务，需要配置以下环境变量。

1. 将`ANTHROPIC_BASE_URL` 设置为`https://onetoken.one`
2. `ANTHROPIC_AUTH_TOKEN` 设置为从 [Onetoken 平台](https://console.aihubmix.com/token) 获取的 API Key
3. `ANTHROPIC_MODEL`：设置为[模型列表](https://onetoken.one/models)中支持的模型。

<Tabs>
  <Tab title="macOS">
    1) 在终端中执行以下命令，查看默认 Shell 类型。

    ```shellscript  theme={null}
    echo $SHELL
    ```

    2. 根据 Shell 类型设置环境变量，命令如下：

    <CodeGroup>
      ```shellscript Zsh theme={null}
      # ONETOKEN_API_KEY 替换为你从 ONETOKEN 平台获取的 Key
      echo 'export ANTHROPIC_BASE_URL="https://onetoken.one"' >> ~/.zshrc
      echo 'export ANTHROPIC_AUTH_TOKEN="ONETOKEN_API_KEY"' >> ~/.zshrc
      echo 'export ANTHROPIC_MODEL="claude-sonnet-4-5"' >> ~/.zshrc
      ```

      ```shellscript Bash theme={null}
      # ONETOKEN_API_KEY 替换为你从 ONETOKEN 平台获取的 Key
      echo 'export ANTHROPIC_BASE_URL="https://onetoken.one"' >> ~/.bash_profile
      echo 'export ANTHROPIC_AUTH_TOKEN="ONETOKEN_API_KEY"' >> ~/.bash_profile
      echo 'export ANTHROPIC_MODEL="claude-sonnet-4-5"' >> ~/.bash_profile
      ```
    </CodeGroup>

    3. 在终端中执行下列命令，使环境变量生效。

    <CodeGroup>
      ```shellscript Zsh theme={null}
      source ~/.zshrc
      ```

      ```shellscript Bash theme={null}
      source ~/.bash_profile
      ```
    </CodeGroup>

    4. 打开一个新的终端，执行下列命令，查看环境变量是否生效。

    ```shellscript  theme={null}
    echo $ANTHROPIC_BASE_URL
    echo $ANTHROPIC_AUTH_TOKEN
    echo $ANTHROPIC_MODEL
    ```

  </Tab>

  <Tab title="Windows">
    在 Windows 中，可以通过 CMD 或 PowerShell 将 AiHubMix 的 Base URL 和 [API Key](https://help.aliyun.com/zh/model-studio/get-api-key) 设置为环境变量。

    <Tabs>
      <Tab title="CMD">
        1. 在 CMD 中运行以下命令，设置环境变量。

        ```shellscript  theme={null}
        REM Onetoken API Key 替换 ONETOKEN_API_KEY
        setx ANTHROPIC_AUTH_TOKEN "ONETOKEN_API_KEY"
        setx ANTHROPIC_BASE_URL "https://onetoken.one"
        setx ANTHROPIC_MODEL "claude-sonnet-4-5"
        ```

        2. 打开一个新的 CMD 窗口，运行以下命令，检查环境变量是否生效。

        ```shellscript  theme={null}
        echo %ANTHROPIC_AUTH_TOKEN%
        echo %ANTHROPIC_BASE_URL%
        echo %ANTHROPIC_MODEL%
        ```
      </Tab>

      <Tab title="PowerShell">
        1. 在 PowerShell 中运行以下命令，设置环境变量。

        ```shellscript  theme={null}
        # Onetoken API Key 替换 ONETOKEN_API_KEY
        [Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "ONETOKEN_API_KEY", [EnvironmentVariableTarget]::User)
        [Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://onetoken.one", [EnvironmentVariableTarget]::User)
        [Environment]::SetEnvironmentVariable("ANTHROPIC_MODEL", "claude-sonnet-4-5", [EnvironmentVariableTarget]::User)
        ```

        2. 打开一个新的 PowerShell 窗口，运行以下命令，检查环境变量是否生效。

        ```shellscript  theme={null}
        echo $env:ANTHROPIC_AUTH_TOKEN
        echo $env:ANTHROPIC_BASE_URL
        echo $env:ANTHROPIC_MODEL
        ```
      </Tab>
    </Tabs>

  </Tab>
</Tabs>

### 3. 开始使用

完成配置后，进入你的工作目录，在终端运行 `claude` 命令开始使用 Claude Code。

```bash theme={null}
$ cd /path/your-project
> claude
```

初次使用 Claude Code 时，可能会强制要求登录 Anthropic 账户。请按以下步骤操作以跳过该流程：

<img src="https://mintcdn.com/aihubmix/HZpz50Qb6hBBcBVb/public/cn/cc-7.jpg?fit=max&auto=format&n=HZpz50Qb6hBBcBVb&q=85&s=0d1309bcea8f4170809d104bc2b380a6" alt="Cc 7" width="1622" height="438" data-path="public/cn/cc-7.jpg" />

1. 定位用户主目录下的 `.claude.json` 文件，具体路径如下：
   - macOS / Linux: `~/.claude.json`
   - Windows: `C:\Users\%USERNAME%\.claude.json`
2. 设置`hasCompletedOnboarding` 字段的值为 `true`

```json theme={null}
{
  "hasCompletedOnboarding": true
}
```

3. 保存文件，然后在终端中重新运行 `claude` 。

#### （可选）更多配置模型的方式

Claude Code 支持以下模型配置方式，**按优先级从高到低排列**，优先级高的配置会覆盖优先级低的配置。

1. **对话期间：** 执行`/model <模型名称>`命令切换模型。适用于临时切换模型。

```text theme={null}
/model claude-sonnet-4-5
```

2. **启动 Claude Code 时：** 执行`claude --model <模型名称>`指定模型。适用于单次会话。

```text theme={null}
claude --model claude-sonnet-4-5
```

3. **设置环境变量**：可按任务复杂度配置不同级别的模型，Claude Code 会根据任务类型自动选择合适的模型。适用于全局生效。

```shellscript theme={null}
export ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-5"
export ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-5"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5"
```

其中：

- `ANTHROPIC_DEFAULT_OPUS_MODEL`：用于复杂推理、架构设计等高难度任务。
- `ANTHROPIC_DEFAULT_SONNET_MODEL`：用于代码编写、功能实现等日常任务。
- `ANTHROPIC_DEFAULT_HAIKU_MODEL`：用于语法检查、文件搜索等简单任务。

4. **在 setting.json 配置文件中永久设置**：在项目根目录或用户主目录创建`settings.json`文件，并写入模型配置信息，可分别进行项目级或用户级的永久配置。

```json theme={null}
{
  "env": {
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5"
  }
}
```

## 通过 cc-switch 配置

1. 运行 CC-Switch，点击「添加供应商」。

<img src="/images/claudecode/1.png" />

2. 在预设列表中选择「自定义配置」。

<img src="/images/claudecode/2.png" />

3. 在「API Key」栏中填写你的密钥和请求地址

<img src="/images/claudecode/3.png" />

4. 配置完成后，点击「添加」保存设置。

<img src="/images/claudecode/4.png" />

5. 返回首页，在供应商列表中选择「onetoken」，点击「启动」即可使用。

<img src="/images/claudecode/5.png" />

## 通过 VS Code 插件配置

1. 运行 VS Code，安装插件。

<Frame>
    <img src="https://mintcdn.com/aihubmix/XPAbnoWWzjetSWAU/images/iShot_2026-03-25_11.44.03.jpg?fit=max&auto=format&n=XPAbnoWWzjetSWAU&q=85&s=7fd42add3df2e072c3d8d85eb19c785d" alt="I Shot 2026 03 25 11 44 03" width="1958" height="724" data-path="images/iShot_2026-03-25_11.44.03.jpg" />
</Frame>

2. 按下 `Ctrl + Shift + P` (或 `Cmd + Shift + P`)，输入 `Settings` 打开设置。

<Frame>
    <img src="https://mintcdn.com/aihubmix/XPAbnoWWzjetSWAU/images/iShot_2026-03-25_11.47.48.jpg?fit=max&auto=format&n=XPAbnoWWzjetSWAU&q=85&s=c7b448a36e1886a4a1cdc9103f3844f6" alt="I Shot 2026 03 25 11 47 48" width="1772" height="976" data-path="images/iShot_2026-03-25_11.47.48.jpg" />
</Frame>

3. 搜索 `Claude Code` ，找到 `Claude Code: Environment Variable` → `Edit in settings.json` 。

<Frame>
    <img src="https://mintcdn.com/aihubmix/XPAbnoWWzjetSWAU/images/iShot_2026-03-25_11.49.37.jpg?fit=max&auto=format&n=XPAbnoWWzjetSWAU&q=85&s=3f5a87bc619bcb552eb4ed78da6527b6" alt="I Shot 2026 03 25 11 49 37" width="1940" height="1248" data-path="images/iShot_2026-03-25_11.49.37.jpg" />
</Frame>

4. 在 `claudeCode.environmentVariables` 中填入 Onetoken 相关信息。

<Frame>
    <img src="/images/claudecode/6.png" alt="I Shot 2026 03 25 11 53 07" width="1156" height="304" data-path="images/iShot_2026-03-25_11.53.07.jpg" />
</Frame>

## 常见问题

### Q：在 Claude Code 中使用，提示「401 , No token provided....」

打开 Claude 终端，输入 `/config` ，找到 `Use custom API key` 选项，检查 Token 是否正确配置。

<img src="https://mintcdn.com/aihubmix/Sq3QhNkLGyt6npNr/public/cn/cc-6.png?fit=max&auto=format&n=Sq3QhNkLGyt6npNr&q=85&s=27b1369c8b3970c789b7585e060bde07" alt="install" width="1220" height="760" data-path="public/cn/cc-6.png" />

### Q：macOS 中安装成功后仍然报错：`zsh: command not found: claude`

这是因为 Claude CLI 已安装，但其可执行目录未加入系统 `PATH`。

1. 确认 Claude 安装路径。Claude Code 官方脚本通常安装在以下目录之一：

- `~/.claude/bin`
- `~/.local/bin`

在终端执行：

```shellscript theme={null}
ls -l ~/.claude/bin
或
ls -l ~/.local/bin | grep claude
```

如果看到 claude 文件，说明安装成功，只是 PATH 未配置。

2. 将安装目录加入 PATH。根据实际安装位置执行对应命令：

##### 情况 A：安装在 `~/.claude/bin`

```shellscript theme={null}
echo 'export PATH="$HOME/.claude/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

##### 情况 B：安装在 `~/.local/bin`

```shellscript theme={null}
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

3. 验证是否生效。执行：

```text theme={null}
which claude
claude -v
```

若能看到 `claude` 路径及版本号，说明安装成功。

### Q：Claude Code 无法连接 Anthropic 服务

升级到最新版本的 Claude Code 后，若出现无法连接 Anthropic 服务或认证失败的情况，通常是由于认证请求头名称已发生调整所致。新版本要求将请求头由 `ANTHROPIC_API_KEY` 修改为 `ANTHROPIC_AUTH_TOKEN`，API Key 的值无需更换，仅需更新请求头名称并重新加载配置即可。具体操作可参考本文档重新配置。

### Q: Login:API Error: 403

<img src="/images/claudecode/7.png" />

cc升级到最新版，并且关闭ccs的本地代理跟故障转移功能

## 更多资源

- [Github](https://github.com/inferera/aihubmix/blob/main/packages/claude-code/README.md)
- [npm 包](https://www.npmjs.com/package/@aihubmix/claude-code)
- [官方最佳实践](https://www.anthropic.com/engineering/claude-code-best-practices)
- [官方配置指引](https://docs.anthropic.com/en/docs/claude-code/settings#settings-files)

祝你使用愉快！
