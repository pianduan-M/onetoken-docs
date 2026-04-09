---
title: FAQ
icon: circle-question
---

Check here for common questions.

## 1. Models and security

### Does onetoken store my API request bodies?

- No. onetoken does not store request payloads or model responses. It only relays requests to providers and returns their responses.

### Why do Claude, GPT, Qwen “official apps” differ from API output?

The **model** is the same; official UIs add extra engineering (built-in prompts, tools, etc.).

- Web apps are like a furnished apartment: search, memory, calculators, system prompts, etc.
- API calls are like a shell: core capability only—you supply context and tools yourself.

### Why avoid GPT-5-class models in translation tools?

GPT-5 models target deep reasoning and structured output, not high-frequency realtime tasks.

- Slower (more reasoning steps).
- Higher token usage (system + reasoning context).
- Translation plugins may hit safety filters more often.

For translation or chat, prefer **GPT-4o mini** or **Gemini**-class lighter models for speed and stability.

### Why does GPT-5 sometimes say “I am GPT-4” when asked who it is?

That is **hallucination**: wrong but confident claims about identity or capabilities. It happens across GPT-4, GPT-5, Claude, etc.

- Not something we rewrite on the platform—it is normal LLM behavior.
- “GPT-5” is a product name assigned after training; the weights are not “aware” of the label.
- Web UIs can answer correctly via hidden system prompts; raw API calls may not.
- Identity answers over the API can be inconsistent because the model has no true self-knowledge.

### Gemini-3-Pro often times out—what should I do?

Increase the client timeout. Large models can think for a long time; complex jobs may exceed **30s**.

- If you need Gemini-3-Pro, raise the timeout.
- If you need speed, try lighter models (e.g. Gemini 2.0) with shorter timeouts.

### Why did one “hello” burn many tokens?

Some tools (Cline, Claude Code, etc.) attach **hidden context or system prompts**. That still counts as tokens.

So even a short user message can include long history or instructions from the **tool**, not from onetoken.

### What are the API concurrency limits?

There is no single global concurrency cap. If you hit concurrency issues, contact support.

### Why do identical prompts give different answers?

LLMs sample probabilistically (`temperature`, `top-p`, etc.), so token choices vary each run.

- For steadier output, lower `temperature` or tighten sampling.
- Context, system prompts, and network can also shift results.

### Claude replies cut off early—why?

onetoken supports two styles for Claude:

1. OpenAI Chat-compatible API  
2. Native Anthropic API  

On the **OpenAI-compatible** path, **max_tokens defaults to 4096**. If you do not set a higher value, output stops at that cap—usually not a “bug,” just the limit.

#### Longer answers

Set a higher `max_tokens`, e.g.:

```
completion = client.chat.completions.create(
  model="claude-sonnet-4-6",
  max_tokens=6000,
  messages=[
    {
      "role": "assistant",
      "content": "Always reply in English"
    },
    {
      "role": "user",
      "content": "What is the meaning of life?, over 6000 words"
    }
  ]
)
```

Stay within the model’s maximum. If it still truncates, share the model name and full request for support.

## 2. APIs and data

### Which endpoints exist?

Unified gateway, multiple conventions:

- OpenAI-style: `https://onetoken.one/v1` (GPT and compatible models)
- Claude forwarding: `https://onetoken.one` (Anthropic SDK-style calls)

### What do you log?

We log what billing and operations need: account, call metadata, model id, token usage, payments.

#### Privacy

- We do **not** store user prompts or model outputs for content analysis or resale.
- Underlying cloud or model vendors may keep their own access logs per **their** policies.

## 3. Model behavior

### What is an AI hallucination?

Output that is false, unsupported, or fabricated.

#### Causes can include

- Biased or incomplete training data  
- Overfitting  
- Randomness in decoding  

All major LLMs can hallucinate; it is not unique to one provider.

## 4. Usage and troubleshooting

### How do I monitor usage?

Use the onetoken console for volume, tokens, and billing. Filter by model and time window.

### When a call fails

Responses include codes and messages. Typical causes:

- Malformed request  
- Model unavailable or over quota  

### How should I manage API keys?

Create, revoke, and rotate keys in the console.

#### Security tips

- Never expose keys in public places  
- Separate keys per project  
- Rotate periodically  
