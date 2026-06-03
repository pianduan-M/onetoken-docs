---
title: Coder 配置
icon: code
---

## 在 Coder 中配置 OneToken 平台 API 完整指南

通过将 Coder 与 OneToken 平台结合，你可以轻松调用多种强大的大语言模型。以下是详细的图文配置步骤。

### 📝 准备工作

在开始配置之前，请确保你已经准备好以下内容：

- 已注册并登录 [OneToken 平台](https://onetoken.one/)。
- 已进入 [OneToken 令牌控制台](https://onetoken.one/console/token) 并生成了你的专属 **API Key**（请妥善保存，注意保密）。

---

### ⚙️ 配置步骤

**1. 进入 Agent 设置**
打开 Coder 界面，进入 Agent 专属页面。在页面中找到并点击“设置”图标，进入系统的配置后台。

<img src="/images/coder/0.png" />

**2. 访问 Agent 管理菜单**
在设置后台的导航栏中，点击“管理 Agent” (Manage Agent) 菜单，准备进行 API 线路的绑定。

<img src="/images/coder/1.png" />

**3. 选择模型提供商 (Provider)**
点击进入“提供商” (Providers) 页面。在支持的官方列表中，**请选择 OpenAI**。

> **💡 提示：** 为什么使用的是 OneToken 却要选择 OpenAI？
> 因为 OneToken 提供了完全兼容 OpenAI 标准格式的接口。通过选择 OpenAI 提供商并修改代理地址，我们就可以无缝接入 OneToken 的服务。

<img src="/images/coder/2.png" />

<img src="/images/coder/3.png" />

**4. 填写 API 核心参数**
这是最关键的一步，请在弹出的配置表单中准确填入以下信息：

- **BaseURL (地址)：** 填入 `https://onetoken.one/v1`
- **API Key (密钥)：** 填入你在准备工作中获取的 OneToken API Key。

确认信息无误后，点击“创建” (Create) 按钮保存配置。

<img src="/images/coder/4.png" />

**5. 创建并绑定具体模型**
提供商配置完成后，进入“模型” (Models) 页面。点击创建新模型，手动输入你需要使用的模型名称（例如 `gpt-4o`、`claude-3-5-sonnet` 等，具体名称请参考 OneToken 平台支持的模型列表），并将其关联到刚才创建的提供商上。

<img src="/images/coder/5.png" />

**6. 对话测试与使用**
配置全部完成后，返回 Coder 的主对话页面。
发送一条简单的测试消息（例如：“你好，请测试一下连接”）。如果模型能够正常且快速地回复，说明配置没有任何问题，你可以开始使用了！

<img src="/images/coder/6.png" />

---

### 🛠️ 常见问题排查 (FAQ)

如果在第 6 步测试时遇到报错，请检查以下几点：

- **地址格式错误**：检查 BaseURL 是否填错，确保末尾没有多余的斜杠（正确示范：`https://onetoken.one/v1`）。
- **密钥无效**：检查 API Key 是否复制完整，前后是否不小心混入了空格。
- **模型名称错误**：确保你在第 5 步填写的模型名称在 OneToken 平台上是真实存在且支持的。
