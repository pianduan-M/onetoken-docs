---
title: Void Editor
icon: code
---

## Void Editor 配置第三方 API 教程

Void Editor 作为一款开源、隐私优先的 AI 代码编辑器（Cursor 的开源替代品），支持用户直接连接到第三方 API。通过这种方式，你可以使用 **DeepSeek、OpenRouter、OneAPI** 或者任何兼容 OpenAI 接口协议的服务商。

---

## 准备工作

在开始之前，请确保你已经准备好以下信息：

1. **API Key**：从 [OneToken 平台](https://onetoken.one/console/token) 获取。
2. **Base URL**：接口的基准地址（例如 `https://onetoken.one/v1`）。
3. **模型名称**：你需要使用的具体模型 ID（例如 `deepseek-chat`）。

---

## 配置步骤

### 1. 进入设置界面

1. 启动 **Void Editor**。
2. 点击界面左下角的 **齿轮图标 (Settings)**
3. 点击第一项 Void’s Settings。

---

### 2. 配置 OpenAI 兼容协议 (最常用)

大多数第三方 API 转发站或国产大模型都支持 OpenAI 协议。

1. 在 Void 设置页面找到 **Main Providers**（服务商）列表。
2. 找到 **OpenAI Compatible** 选项。
3. **填入 Base URL**：
   - 找到 `Base URL` 输入框。
   - 粘贴你的服务商地址。注意：通常需要以 `/v1` 结尾。
4. **填入 API Key**：
   - 在 `API Key` 字段输入你的密钥。

<img src="/images/void/1.png" />

5. **添加模型 (Models)**：
   - 找到模型列表区域，点击 **Add Model**。
   - 输入模型在 API 里的真实 ID（如 `deepseek-reasoner` 或 `claude-3-5-sonnet`）。

<img src="/images/void/2.png" />

---

## 如何在聊天中使用

配置完成后，你可以通过以下方式调用：

1. 按 `Ctrl + L` (Windows) 或 `Cmd + L` (Mac) 打开侧边栏聊天框。
2. 在对话框上方的**模型选择下拉菜单**中，找到你刚才添加的第三方模型。
3. 输入一段代码或指令进行测试。

---

## 常见问题排查 (Troubleshooting)

| 错误现象                       | 可能原因          | 解决方法                                                  |
| :----------------------------- | :---------------- | :-------------------------------------------------------- |
| **Authentication Error (401)** | API Key 错误      | 检查 Key 是否复制完整，是否有前后空格。                   |
| **Resource Not Found (404)**   | Base URL 路径不对 | 尝试在 URL 末尾添加或删除 `/v1`。                         |
| **Connection Timeout**         | 网络环境限制      | 检查是否需要开启代理，或测试 API 地址在浏览器是否能访问。 |
| **Model Not Supported**        | 模型 ID 填错      | 确认服务商提供的模型 ID 拼写是否完全一致。                |

---

> **Pro-Tip (专业提示)**:
> Void 的核心优势在于它不经过中转服务器，直接从你的电脑发请求给服务商。因此，如果你在公司内网使用，请务必在 Void 的网络设置中配置好相关的 **Proxy (代理)**，否则可能会出现连接失败的情况。
