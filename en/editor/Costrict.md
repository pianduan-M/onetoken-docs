---
title: Costrict Configuration Tutorial
icon: code
---

CoStrict is an open-source, practical R&D programming tool based on a large code model, enabling features such as code completion, intelligent Q&A, code review, code optimization, unit test writing, and comment generation.

## Install CLI

```npm install -g @costrict/cs

```

1. After successful installation, execute `cs web` in the terminal to open the web settings page. Click Settings to add a custom provider.

<img src="/images/costrict/1_en.png" />

<img src="/images/costrict/2_en.png" />

<img src="/images/costrict/3_en.png" />

2. After successful submission, press Control + C to close the current web command. Re-enter `cs` in the terminal and press Enter. Then type `/models`, select the model we just added, and press Enter to start using it.

<img src="/images/costrict/4.png" />

<img src="/images/costrict/5.png" />

## Using it in VS Code

1. Open VS Code, click the Extensions Store, search for `costrict`, and install it.

<img src="/images/costrict/6.png" />

2. Open the `costrict` plugin and select to use another provider.

<img src="/images/costrict/7.png" />

3. Select `OpenAI Compatible` from the drop-down list.

<img src="/images/costrict/8.png" />

4. Fill in the relevant information.

<img src="/images/costrict/9.png" />
