import client from "./openai.service.js";

export const reviewCode = async (code, language) => {
  const prompt = `
You are an expert senior software engineer.

Review this ${language} code.

Find:
- Bugs
- Security vulnerabilities
- Performance issues
- Best practice violations

Return JSON format:
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

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.2,
  });

  return response.choices[0].message.content;
};