import client from "./openai.service.js";

export const reviewCode = async (code, language) => {
  try {
    const model = client.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    const prompt = `
You are an expert senior software engineer.

Review this ${language} code.

Find:
- Bugs
- Security vulnerabilities
- Performance issues
- Best practice violations

Return ONLY valid JSON in this exact format:

{
  "summary": "",
  "issues": [
    {
      "type": "",
      "severity": "",
      "line": 0,
      "message": ""
    }
  ],
  "fixedCode": ""
}

CODE:
${code}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("REVIEW ENGINE ERROR:", error);

    throw new Error("Failed to review code");
  }
};