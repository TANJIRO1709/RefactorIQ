export const chunkCode = (code) => {
  const size = 1000;

  const chunks = [];

  for (let i = 0; i < code.length; i += size) {
    chunks.push(code.slice(i, i + size));
  }

  return chunks;
};