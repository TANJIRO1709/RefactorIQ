import Review from "../models/Review.js";
import { reviewCode } from "../services/ai/reviewEngine.js";

export const createReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    // Validation
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    // Generate AI review
    const aiResponse = await reviewCode(code, language);

    let parsed;

    // Safely parse AI response
    try {
      parsed = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error("JSON PARSE ERROR:", parseError);

      return res.status(500).json({
        success: false,
        message: "Invalid AI response format",
        rawResponse: aiResponse,
      });
    }

    // Save review
    const review = await Review.create({
      user: req.user?._id || null,

      language: language || "javascript",

      originalCode: code,

      reviewedCode: parsed.fixedCode || "",

      summary: parsed.summary || "",

      issues: parsed.issues || [],
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};