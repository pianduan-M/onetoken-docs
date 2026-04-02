---
title: OpenCode
icon: code
---

## OpenCode 配置第三方 API 教程

OpenCode 是一款开源的 AI 编程助手，支持高度自定义的 API 接入。通过配置第三方 API，你可以自由选择性能更强或性价比更高的模型（如 DeepSeek、SiliconFlow 等）。

---

## 第一步：获取 API 核心信息

在配置前，请准备好：

1. **API Key**：你的授权密钥。[Onetoken 平台](https://onetoken.one/console/token)
2. **Base URL**：接口地址（例如 `https://onetoken.one/v1`）。
3. **Model ID**：具体的模型名称（例如 `deepseek-ai/DeepSeek-V3`）。

---

## 第二步：进入配置界面

1. 启动 **OpenCode**。
2. 点击左下角的 **设置齿轮** -> **Settings**。
3. 在搜索框中输入 `OpenCode` 或 `AI Provider`。
4. 找到 **Provider** 选择框，将其设置为 `OpenAI Compatible`（或 `Custom`）。

---

## 第三步：填写参数

### 1. 设置 Base URL

找到 `OpenAI Compatible: Base URL` 选项，填入你的第三方代理地址。

> **注意**：请确保地址以 `/v1` 结尾，不要包含 `/chat/completions`。

### 2. 绑定 API Key

找到 `OpenAI Compatible: API Key` 选项，粘贴你的密钥。

### 3. 定义模型列表

找到 `Custom Models` 或 `Model Map` 选项：

- 点击 **Add Item**。
- 输入你想在界面上显示的名称（如 `DeepSeek`）。
- 输入模型在 API 服务商那里的真实 ID（如 `deepseek-chat`）。

---

## 第四步：启用与测试

1. 打开 OpenCode 的 **Chat 窗口** (通常是侧边栏的机器人图标)。
2. 在底部的模型切换器中，选择你刚刚添加的 **Custom Model**。
3. 发送一条指令（例如：`写一个快速排序`）来测试连通性。

---

## 进阶技巧：环境变量配置 (针对开发者)

如果你习惯通过终端或系统环境管理：
OpenCode 也支持读取 `.env` 文件或系统环境变量。你可以设置：

- `OPENAI_API_BASE`: 你的第三方 URL
- `OPENAI_API_KEY`: 你的密钥

---

## 常见问题处理

| 错误信息              | 可能原因           | 解决方法                                                                |
| :-------------------- | :----------------- | :---------------------------------------------------------------------- |
| **Model Not Found**   | 模型 ID 填写不匹配 | 检查服务商后台的模型列表，确保 ID 字符完全一致。                        |
| **Invalid API Key**   | 密钥失效或复制错误 | 重新生成 Key 并确保没有多余的换行符。                                   |
| **Network Error**     | 证书或代理问题     | 若使用国内中转，检查是否需要关闭/开启特定的网络代理。                   |
| **Stream Mode Error** | 接口不支持流式输出 | 在设置中尝试关闭 `Enable Streaming` 选项（虽然大多数现代 API 都支持）。 |

---

> **💡 建议**:
> OpenCode 对开源模型支持非常友好。如果你在本地部署了 **LM Studio** 或 **LocalAI**，只需将 Base URL 指向 `http://localhost:xxxx/v1` 即可实现完全离线的代码辅助。
