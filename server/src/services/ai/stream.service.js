import client from "./openai.service.js";

export const streamReview = async (code, language, res) => {
  try {
    const model = client.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    const prompt = `
You are a senior code reviewer.

Review this ${language} code professionally.

Find:
- Bugs
- Performance issues
- Security vulnerabilities
- Best practice violations
- Refactoring suggestions

CODE:
${code}
`;

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const content = chunk.text();

      res.write(
        `data: ${JSON.stringify({ content })}\n\n`
      );
    }

    res.write(`data: [DONE]\n\n`);

    res.end();
  } catch (error) {
    console.error("STREAM REVIEW ERROR:", error);

    res.write(
      `data: ${JSON.stringify({
        error: "Streaming failed",
      })}\n\n`
    );

    res.end();
  }
};