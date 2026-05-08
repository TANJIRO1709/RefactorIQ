import Review from "../models/Review.js";
import { reviewCode } from "../services/ai/reviewEngine.js";

export const createReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Code is required",
      });
    }

    const aiResponse = await reviewCode(code, language);

    const parsed = JSON.parse(aiResponse);

    const review = await Review.create({
      user: req.user._id,

      language,

      originalCode: code,

      reviewedCode: parsed.fixedCode,

      summary: parsed.summary,

      issues: parsed.issues,
    });

    res.status(201).json(review);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};