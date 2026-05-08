import client from "./openai.service.js";

export const generateLearningResources = async (
  issues
) => {
  const prompt = `
A developer has these coding mistakes:

${JSON.stringify(issues)}

Generate:
- concepts to learn
- docs
- youtube topics
- leetcode questions
- improvement roadmap

Return JSON.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};