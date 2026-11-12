import client from "./openai.service.js";

export const reviewCode = async (code, language) => {
  try {
    const model = client.getGenerativeModel({
      model: "gemini-flash-latest",
      // Forces raw JSON output (no ```json fences) so JSON.parse works
      generationConfig: { responseMimeType: "application/json" },
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
  "score": 0,
  "issues": [
    {
      "type": "bug | security | performance | style",
      "severity": "Critical | High | Medium | Low",
      "line": 0,
      "message": ""
    }
  ],
  "fixedCode": ""
}

"score" is overall code quality from 0 (unusable) to 100 (excellent).

CODE:
${code}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("REVIEW ENGINE ERROR:", error);

    throw new Error("Failed to review code");
  }
};
