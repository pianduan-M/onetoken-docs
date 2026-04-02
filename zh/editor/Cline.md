---
title: Cline
icon: code
---

> Cline 是一款智能编程辅助插件，可用于自动化代码生成、任务拆解、执行命令与文件修改等开发场景。使用时可以选择 OneToken 作为 Provider，完成复杂编程任务。

Cline官网地址：[https://cline.bot/](https://cline.bot/)

---

## 前置条件

- 获取 OneToken API Key。

  获取地址：[https://onetoken.one/console/token](https://onetoken.one/console/token)

- 安装 **Visual Studio Code** 或 **IntelliJ IDEA**。

---

## 在 VS Code 中使用 Cline

### 1. 安装 Cline

打开 VS Code，进入扩展商店，搜索 Cline 并完成安装。

<img src="/images/cline/1.png" />

### 2. 模型配置与 API key

安装完成后，点击左侧边栏的 **Cline 图标**，进入配置页面，选择 **API Provider**。

<img src="https://mintcdn.com/aihubmix/fAZvgUjRR77N4zl1/public/cn/cline2.png?fit=max&auto=format&n=fAZvgUjRR77N4zl1&q=85&s=bff2adbc79740a8ce9ca9dc70670eeff" alt="Cline2 Pn" width="2528" height="1710" data-path="public/cn/cline2.png" />

切换「OneToken」作为Provider，并填入配置信息。

| 配置项       | 说明                      |
| :----------- | :------------------------ |
| API Provider | 在下拉框选择 **OneToken** |
| API Key      | 填入 OneToken API Key     |
| Model        | 选择使用的模型            |

### 3. 使用 Cline

在输入框上方，可以通过 **Auto-approve** 设置 Cline 的读写权限和命令执行权限。 开启这些权限将提升自动化能力，但也可能增加 Token 消耗，建议在充分了解 Cline 行为后再启用。

Cline 提供两种工作模式，可在对话框底部切换：

- **Plan 模式**：聚焦信息收集、问题拆解和任务规划，不会直接修改文件。
- **Act 模式**：根据计划执行修改、运行命令并完成任务。

---

## 在 IntelliJ IDEA 中使用 Cline

### 1. 安装 Cline

打开 IDEA，进入插件市场，搜索 Cline 并安装。

<img src="/images/cline/2.png" alt="Clien3 Pn" />

### 2. 模式选择

初次启用时，选择**Bring my own API Key → Continue。**

<img src="https://mintcdn.com/aihubmix/177cW8a8bnAUe4Hz/public/cn/cline4.png?fit=max&auto=format&n=177cW8a8bnAUe4Hz&q=85&s=01a1757af0e1e1ad813ac4f70244aac9" alt="Cline4 Pn" width="3024" height="1834" data-path="public/cn/cline4.png" />

### 3. 模型配置与 API key

安装完成后，点击右侧边栏的 **Cline 图标**，进入配置页。

<img src="https://mintcdn.com/aihubmix/jNOrTRkBjc0JR2m_/public/cn/cline5.png?fit=max&auto=format&n=jNOrTRkBjc0JR2m_&q=85&s=101f22aca288174cc5fdf9c7226278d8" alt="Cline5 Pn" width="2738" height="1674" data-path="public/cn/cline5.png" />

切换「OneToken」作为Provider，并填入配置信息。

| 配置项       | 说明                      |
| :----------- | :------------------------ |
| API Provider | 在下拉框选择 **OneToken** |
| API Key      | 填入 OneToken API Key     |
| Model        | 选择使用的模型            |

### 4. 使用Cline

DEA 中的使用方式与 VS Code 基本一致：

- 可在输入框上方启用 Auto-approve 权限；
- 可在界面底部切换 **Plan** 与 **Act** 模式。

## MCP （Model Context Protocol）支持

Cline 支持通过插件安装 MCP Client 服务。

> 支持的 MCP 可以通过 [Cline MCP- marketplace](https://cline.bot/mcp-marketplace) 查询

<img src="https://mintcdn.com/aihubmix/177cW8a8bnAUe4Hz/public/cn/cline6.png?fit=max&auto=format&n=177cW8a8bnAUe4Hz&q=85&s=e224b07f60c3759dd195ae4b592cc8c8" alt="Cline6 Pn" width="614" height="352" data-path="public/cn/cline6.png" />

## 模型建议

软件开发的不同阶段对 AI 能力的要求各不相同。选择合适的模型，可以在需求分析、编码、测试与部署的各个阶段提升效率。

### 1. 设计与架构阶段

该阶段更依赖模型的抽象推理、系统设计能力和领域知识，适合选择具备强推理与规划能力的模型。

- o1
- gemini-2.5-pro

### 2. 开发阶段

该阶段需要模型在代码生成、模式理解、函数补全、调试建议方面表现稳定，适合选择综合代码能力强的模型。

- gemini-2.5-pro
- claude-sonnet-4-5
- gpt-5
- coding-glm-4.6（高性价比）
- qwen3-coder-plus

### 3. 测试阶段

该阶段更关注边界条件、稳健性、异常流程与用例生成，适合选择擅长代码分析与推理的模型。

- claude-3-7-sonnet
- o3 / o4-mini
- gpt-5

### 4. 部署与审查阶段

该阶段需要模型具备较大的上下文窗口，以理解完整代码库，从而进行审查、重构建议或部署验证。

- gemini-2.5-pro
- gpt-5
- o3 / o4-mini
