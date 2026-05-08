import client from "./openai.service.js";

export const streamReview = async (code, language, res) => {
  const stream = await client.chat.completions.create({
    model: "gpt-4.1-mini",

    stream: true,

    messages: [
      {
        role: "system",
        content:
          "You are a senior code reviewer. Review code professionally.",
      },

      {
        role: "user",
        content: `
Review this ${language} code.

CODE:
${code}
        `,
      },
    ],
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";

    res.write(`data: ${JSON.stringify({ content })}\n\n`);
  }

  res.write(`data: [DONE]\n\n`);
};