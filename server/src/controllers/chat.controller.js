import client from "../services/ai/openai.service.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const model = client.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    const prompt = `
You are an expert software engineering mentor.

User Question:
${message}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.status(200).json({
      reply: response,
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    res.status(500).json({
      message: "Chat Failed",
      error: error.message,
    });
  }
};