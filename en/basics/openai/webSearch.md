---
title: "OpenAI API web search guide"
sidebarTitle: "Web search"
icon: globe
---

Use OneToken's Responses API and the `web_search` tool to let GPT models search for current information and return source citations. This page covers the request format, response structure, and billing.

## Integration

In OneToken, use the **Responses API (`/v1/responses`)** and add **`web_search`** to `tools` to enable web search. **An API key from the default group is sufficient; no additional activation is required.**

```
Endpoint: POST https://onetoken.one/v1/responses
Tool:     tools: [{"type": "web_search"}]
Models:   gpt-5.5 / gpt-5.4 (tested)
```

## Model performance reference

The following results were recorded on June 11, 2026, and are provided as a selection reference. Search count, latency, and token usage vary with the question and search results.

| Model  | Web search result                                  | Citation             | Searches per request | Latency |
| ------ | -------------------------------------------------- | -------------------- | -------------------- | ------- |
| gpt-5.4 | ✅ Accurately returned news from the current week | ✅ Structured `url_citation` | 1 | ~11s |
| gpt-5.5 | ✅ Accurately returned news with time-window detection and multi-source verification | ✅ Structured `url_citation` | ~8 | ~51s |

<Tip>
  Choose **gpt-5.4** when speed and cost matter more. Choose **gpt-5.5** when you need broader retrieval. More search rounds and injected results increase cost and latency.
</Tip>

## Quickstart

Replace `YOUR_ONETOKEN_API_KEY` in the examples with your OneToken API key.

### cURL

```bash theme={null}
curl https://onetoken.one/v1/responses \
  -H "content-type: application/json" \
  -H "authorization: Bearer YOUR_ONETOKEN_API_KEY" \
  -d '{
    "model": "gpt-5.4",
    "max_output_tokens": 8192,
    "tools": [{"type": "web_search"}],
    "input": "What new models has Anthropic released in the last week? Search the web and include source links."
  }'
```

### Python (OpenAI SDK)

```python theme={null}
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_ONETOKEN_API_KEY",  # The default group is sufficient
    base_url="https://onetoken.one/v1",
)

resp = client.responses.create(
    model="gpt-5.4",                  # or gpt-5.5
    max_output_tokens=8192,           # At least 8192 is recommended; reasoning tokens also use this limit
    tools=[{"type": "web_search"}],
    input="What new models has Anthropic released in the last week? Search the web and include source links.",
)

# 1) Final answer text
print(resp.output_text)

# 2) Actual search count for this request (used for billing)
search_calls = [item for item in resp.output if item.type == "web_search_call"]
print(f"This request performed {len(search_calls)} searches")

# 3) Source citations (structured url_citation)
for item in resp.output:
    if item.type == "message":
        for content in item.content:
            for ann in getattr(content, "annotations", []) or []:
                print(f"Source: {ann.title} | {ann.url}")
```

### Response structure

The `output` array contains these items in execution order:

| Item type | Meaning |
| --------- | ------- |
| `web_search_call` | One search that was actually executed. **Billing is based on the number of these items.** |
| `reasoning` | Model reasoning for GPT-5 models. |
| `message` | The final answer. Its `content[].annotations` contains `url_citation` entries with a title and URL. |

`status: "completed"` means the response finished successfully. If the response is `incomplete`, check `incomplete_details`. If the output token limit was reached, increase `max_output_tokens` and retry.

## Billing

Web search costs include a **tool call fee** and a **retrieved-content token fee**:

| Item | Price | Details |
| ---- | ----- | ------- |
| **Tool call fee** | **\$10 / 1,000 calls** (\$0.01/call) | **Tool:** `web_search`. Billed for each `web_search_call` item in the response `output`. One request can trigger multiple searches: typically 1 for gpt-5.4 and 5–8 for gpt-5.5. |
| **Retrieved-content token fee** | The model's standard input rate | Search results are added to the model context and billed as input tokens. **This is often the larger portion of the cost.** The recorded usage per request was about 9k input tokens for gpt-5.4 and 48–54k for gpt-5.5. |

<Info>
  In the original test, a single request cost approximately \$0.01 in search fees plus the cost of 9k input tokens for gpt-5.4, and \$0.08 in search fees plus the cost of 50k input tokens for gpt-5.5. Actual charges follow OneToken's current pricing and your usage bill.
</Info>

## Notes

1. **Use the Responses API with the `web_search` tool**: GPT-5 models do not support the Chat Completions `web_search_options` parameter. Using it returns 400 `Unknown parameter: 'web_search_options'`. That parameter is intended for `*-search-preview` models.
2. **Set `max_output_tokens` to at least 8192**: This limit includes both reasoning and final-answer tokens. If the limit is too low, the response may return `status: "incomplete"` after exhausting the allowance. Consumed tokens are still billed even when there is no final answer.
3. The legacy `web_search_preview` tool type is also available with the same behavior. New integrations should use `web_search`.
4. To control costs, choose gpt-5.4 or ask the model to reduce search activity, for example, “search at most twice.” Prompts cannot guarantee a search-count limit, so use the returned `web_search_call` count as the source of truth.

## FAQ

**Q: How can I confirm that the response actually used web search?**

A: Check that `output` contains an item with `type="web_search_call"`, and that `message.content[].annotations` contains `url_citation`. These records help you verify tool execution and source citations. Do not determine whether web search ran from the answer text alone.

**Q: Do I need a different group or a special API key?**

A: No. You can use an API key from the OneToken default group.

**Q: Which models are supported?**

A: The examples use gpt-5.4. You can also change the model to gpt-5.5. For other models, check OneToken's current model and tool support before integrating, then verify the search call and citation records.

## Related docs

<CardGroup cols={2}>
  <Card title="API quickstart" icon="sparkles" href="/en/guide/basics/quickstart">
    Learn the basics of calling the OneToken API
  </Card>

  <Card title="API user manual" icon="book-open" href="/en/guide/api/user-manual">
    Review API key, model, and client configuration
  </Card>
</CardGroup>
