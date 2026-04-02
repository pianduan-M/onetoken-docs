---
title: Qwen Code
icon: code
---

> 利用 Onetoken 平台的任何大语言模型为 Qwen Code 提供支持。

## 快速配置指引：

### 1️⃣ 全局安装 npm 包

确保你的 Node.js 版本 >= 20，然后终端运行：

```shell theme={null}
npm install -g @qwen-code/qwen-code
qwen --version
```

更多详细说明可以参考[官方仓库](https://github.com/QwenLM/qwen-code)

### 2️⃣ 环境变量配置

在系统环境变量中填入 Onetoken 密钥和转发地址，密钥可以在 Onetoken [「Keys」页面](https://onetoken.one/token) 生成。

比如在 \~/.zshrc 中添加：

```shell theme={null}
export OPENAI_API_KEY="your_onetoken_key"
export OPENAI_BASE_URL="https://onetoken.one/v1"
export OPENAI_MODEL="your_model"
```

<Tip>
  对于 Mac 用户，你可以在`用户名`目录通过快捷键 `⌘ + ⇧ + .` 显示隐藏的 .zshrc 文件，用系统的「文本编辑」APP 打开并添加上述内容。
</Tip>

### 3️⃣ 使配置生效

添加配置之后，终端执行 `source ~/.zshrc`，回车即可。

### 4️⃣ 启动并使用

终端输入

```shell theme={null}
qwen
```

启动之后输入 `/about` 确认配置，回车，可以看到当前的版本信息和选择的大模型：

<img src="https://mintcdn.com/aihubmix/UgvkHPDoK6o04763/public/cn/Qwen-code.png?fit=max&auto=format&n=UgvkHPDoK6o04763&q=85&s=fbf0fe0ae179a4a00c1842a068144a8d" alt="about" width="1990" height="2034" data-path="public/cn/Qwen-code.png" />

<Note>
  有网友反馈 Qwen Code 存在一定的卡壳概率，我们推荐为[密钥 ↗](https://onetoken.one/token)设置**有限额度**来规避不必要的浪费
</Note>

接下来正常使用即可。
