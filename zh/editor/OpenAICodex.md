---
title: OpenAI Codex
icon: code
---

> 通过 OneToken API 使用 Codex

## 安装

### 官网下载（macOS 版本）

[https://openai.com/zh-Hans-CN/codex/](https://openai.com/zh-Hans-CN/codex/)

### 使用命令行安装

```bash theme={null}
npm install -g @openai/codex
```

## **环境变量配置**

### 使用配置文件配置

1. 修改 ` ~/.codex/config.toml` 配置文件，增加如下配置：

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

2. 修改 ` ~/.codex/auth.json` 配置文件，修改如下配置：

```json theme={null}
{
  "OPENAI_API_KEY": "Onetoken_API_KEY"
}
```

### 通过 cc-switch 配置

1. 运行 CC-Switch，添加供应商。

<img src="/images/codex/1.png" alt="Codex 1" width="2072" height="1374" data-path="public/cn/codex-1.png" />

2. 在预设列表中选择「OneToken」。

<img src="/images/codex/2.png" alt="Codex 2" width="2072" height="1374" data-path="public/cn/codex-2.png" />

3. 在「API Key」栏中填写你的密钥并点击「添加」保存设置。

<img src="/images/codex/3.png" alt="Codex 3" width="2072" height="1374" data-path="public/cn/codex-3.png" />

4. 返回首页，在供应商列表中选择「OneToken」，点击「启用」即可使用。

<img src="/images/codex/4.png" alt="Codex 4" width="2072" height="1374" data-path="public/cn/codex-4.png" />

## 使用 Codex

### 在终端中使用

1. 打开终端，定位到你的项目目录，然后运行 `codex` 命令。

```bash theme={null}
cd /你的项目路径
codex
```

2. 根据需求，设置权限。

<img src="https://mintcdn.com/aihubmix/7hQ6_nS3fMExXVXm/public/cn/codex-5.png?fit=max&auto=format&n=7hQ6_nS3fMExXVXm&q=85&s=ae7c5f193d3aa5c8723c879840732d78" alt="Codex 5" width="1212" height="814" data-path="public/cn/codex-5.png" />

3. 根据需求，选择需要使用的模型。

<img src="https://mintcdn.com/aihubmix/7hQ6_nS3fMExXVXm/public/cn/codex-6.png?fit=max&auto=format&n=7hQ6_nS3fMExXVXm&q=85&s=f942ebc707063463a3961347f8379553" alt="Codex 6" width="1212" height="814" data-path="public/cn/codex-6.png" />

4. 输入自然语言，若正常响应，则配置成功。

<img src="https://mintcdn.com/aihubmix/7hQ6_nS3fMExXVXm/public/cn/codex-8.png?fit=max&auto=format&n=7hQ6_nS3fMExXVXm&q=85&s=bf06aaa8c86834b20e5fef26fba84d50" alt="Codex 8" width="1212" height="814" data-path="public/cn/codex-8.png" />

### 在 Codex 桌面端使用

1. 打开 Codex 桌面端，选择工作目录。
2. 在输入框输入任务，若正常响应，则配置成功。

<img src="https://mintcdn.com/aihubmix/7hQ6_nS3fMExXVXm/public/cn/codex-9.png?fit=max&auto=format&n=7hQ6_nS3fMExXVXm&q=85&s=673289a767cd354a686d1e547a364e0d" alt="Codex 9" width="2632" height="1712" data-path="public/cn/codex-9.png" />

## 实用命令参考

### 帮助命令

```bash theme={null}
codex -h
```

### 完整命令选项

```bash theme={null}
Usage
  $ codex [options] <prompt>

Options
  -h, --help                 显示帮助信息并退出
  -m, --model <model>        指定使用的模型 (默认: codex-mini-latest)
  -i, --image <path>         包含图像输入的文件路径
  -v, --view <rollout>       查看之前保存的会话记录
  -q, --quiet                非交互模式，仅打印助手的最终输出
  -a, --approval-mode <mode> 覆盖审批策略: 'suggest', 'auto-edit', 或 'full-auto'

  --auto-edit                自动批准文件编辑；仍会提示确认命令
  --full-auto                自动批准沙箱环境中的编辑和命令

  --no-project-doc           不自动包含仓库中的 'codex.md' 文件
  --project-doc <file>       包含指定的 Markdown 文件作为上下文
  --full-stdout              不截断命令输出的 stdout/stderr

危险选项
  --dangerously-auto-approve-everything
                             跳过所有确认提示并直接执行命令（无沙箱保护）
                             仅用于临时本地测试环境

实验性选项
  -f, --full-context         以"完整上下文"模式启动，将整个仓库加载到上下文中
                             并在一次操作中应用批量编辑
                             仅兼容 --model 参数

示例
  $ codex "编写并运行一个打印 ASCII 艺术的 Python 程序"
  $ codex -q "修复构建问题"
```
