---
title: Embeddings
---

## [Embeddings](https://platform.openai.com/docs/api-reference/embeddings)

Get vector representations of inputs for models and algorithms that consume embeddings.

Guide: [Embeddings](https://platform.openai.com/docs/guides/embeddings)

## [Embedding object](https://platform.openai.com/docs/api-reference/embeddings/object)

Represents one embedding returned by the API.

**index** / integer  
Index of this embedding in the list.

**embedding** / array  
The vector (list of floats). Length depends on the model—see the [embeddings guide](https://platform.openai.com/docs/guides/embeddings).

**object** / string  
Always `embedding`.

```JSON
{
  "object": "embedding",
  "embedding": [
    0.0023064255,
    -0.009327292,
    .... (1536 floats total for ada-002)
    -0.0028842222,
  ],
  "index": 0
}
```
