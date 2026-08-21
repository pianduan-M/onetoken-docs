---
title: Configure OneToken in DeepSeek Harness
icon: code
---

[DeepSeek Harness](https://www.deepseek.com/harness/) is an AI coding tool from DeepSeek. You can add OneToken as a custom model provider and use OneToken-supported models in Harness.

## Prerequisites

Before you begin, make sure you have:

- Installed Node.js and npm.
- Created an API key in the [OneToken console](https://onetoken.one/console/token).
- Copied the model ID you want to use from the [OneToken model marketplace](https://onetoken.one/pricing).

## Install and start DeepSeek Harness

Run the following command in your terminal:

```bash
npx @deepseek-ai/dsh web
```

After the command starts, open DeepSeek Harness in your browser.

## Configure OneToken

### 1. Open Settings

Click **Settings** in the lower-left corner.

<img src="/images/DeepseekHarness/en/1.png" alt="Settings entry on the DeepSeek Harness home page" />

### 2. Add a custom provider

Open **Models**, then click **Add a custom provider**.

<img src="/images/DeepseekHarness/en/2.png" alt="Add a custom provider button in DeepSeek Harness model settings" />

### 3. Enter the provider details

Complete the provider configuration with these values:

- **Provider ID**: Enter `onetoken`. The value must begin with a lowercase letter.
- **Display name**: Enter `OneToken`, or choose another recognizable name.
- **Base URL**: Enter `https://onetoken.one/v1`.
- **API protocol**: Select `openai-completions`.
- **API key**: Paste your OneToken API key.

Add the models you want to use under **Models**:

- In the first field, enter the model ID copied from the OneToken model marketplace, such as `deepseek-v4-flash-0731`.
- In the second field, enter the name that Harness should display, such as `DeepSeek-V4-Flash`.
- To configure more models, click **Add model** and enter each additional model.

Review the configuration, then click **Apply**.

<img src="/images/DeepseekHarness/en/3.png" alt="OneToken custom provider configuration in DeepSeek Harness" />

## Select a workspace and model

Return to the home page and select an existing workspace from the workspace menu. To use a different local directory, click **Add workspace**.

<img src="/images/DeepseekHarness/en/4.png" alt="Selecting a workspace in DeepSeek Harness" />

Open the model menu in the lower-right corner of the prompt box. Select the model you configured and the effort level you want. Enter a task and send it to start using the model.

<img src="/images/DeepseekHarness/en/5.png" alt="Selecting a OneToken model in DeepSeek Harness" />

<Note>
  Never expose your API key in screenshots, logs, or public files.
</Note>
