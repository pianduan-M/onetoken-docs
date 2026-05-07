---
title: Work Buddy
icon: lobster
---

#### 概述

WorkBuddy 支持接入第三方自定义模型，让你可以根据需求选择不同的大语言模型来驱动对话。本文将详细介绍接入 onetoken 平台完整配置流程。

1. 点击左侧头像弹出菜单点击设置 进入设置页 → 模型，通过图形界面管理自定义模型，无需手动操作配置文件。配置保存后自动持久化。

<img src="/images/workBuddy/1.png" />

<img src="/images/workBuddy/2.png" />

2. 点击添加模型 提供商滚动到最下面选择 自定义 / Custom

<img src="/images/workBuddy/3.png" />

<img src="/images/workBuddy/4.png" />

<img src="/images/workBuddy/5.png" />

3. 填写模型信息
   - 接口地址填写 `https://onetoken.one/v1`
   - API KEY 设置为从 [Onetoken 平台](https://onetoken.one/console/token) 获取的 API Key
   - 模型名称 设置为[模型列表](https://onetoken.one/pricing)中支持的模型。
   - 高级配置根据选择的模型能力进行配置
     填写好后点击保存

<img src="/images/workBuddy/6.png" />

4. 回到主窗口选择刚才添加的自定义模型，即可开始使用。

<img src="/images/workBuddy/7.png" />
