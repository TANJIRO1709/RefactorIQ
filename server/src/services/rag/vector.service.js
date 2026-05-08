import pinecone from "../../config/pinecone.js";

import embeddings from "./embedding.service.js";

const index = pinecone.index("ai-reviewer");

export const storeEmbedding = async (id, text) => {
  const vector = await embeddings.embedQuery(text);

  await index.upsert([
    {
      id,
      values: vector,
      metadata: {
        text,
      },
    },
  ]);
};