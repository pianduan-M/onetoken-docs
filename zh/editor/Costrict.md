---
title: Costrict 配置教程
icon: code
---

CoStrict 是一款开源、实用的研发编程工具，基于代码大模型，实现代码补全、智能问答、代码审查、代码优化、单测编写、注释生成等功能。

## 安装 cli

```
npm install -g @costrict/cs

```

1. 安装成功后终端执行 `cs web` 打开 web 设置页面， 点击设置添加自定义提供商

<img src="/images/costrict/1.png" />

<img src="/images/costrict/2.png" />

<img src="/images/costrict/3.png" />

2. 提交成功后 control + c 关闭 当前 web 命令 从新在终端输入 `cs` 回车, 输入` /models` 选择我们刚新增的模型， 回车开始使用

<img src="/images/costrict/4.png" />

<img src="/images/costrict/5.png" />

## 在 vs code 中使用

1. 打开 vs code 点击扩展商店搜索 `costrict` 安装

<img src="/images/costrict/6.png" />

2. 打开 `costrict` 插件，选择使用其他提供商

<img src="/images/costrict/7.png" />

3. 在下拉列表中选择 `OpenAl Compatible`

<img src="/images/costrict/8.png" />

4. 填入相关信息

<img src="/images/costrict/9.png" />
