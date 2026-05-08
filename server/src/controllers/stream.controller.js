import { streamReview } from "../services/ai/stream.service.js";

export const streamCodeReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    await streamReview(code, language, res);

    res.end();
  } catch (error) {
    console.log(error);

    res.write(
      `data: ${JSON.stringify({
        error: "Streaming failed",
      })}\n\n`
    );

    res.end();
  }
};