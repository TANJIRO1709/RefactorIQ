import mongoose from "mongoose";
import Review from "../models/Review.js";
import { reviewCode } from "../services/ai/reviewEngine.js";

export const createReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    // Validation
    if (!code || typeof code !== "string") {
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

      return res.status(502).json({
        success: false,
        message: "AI returned an invalid response, please try again",
      });
    }

    const score = Number(parsed.score);

    // Save review
    const review = await Review.create({
      user: req.user._id,

      language: language || "javascript",

      originalCode: code,

      reviewedCode: parsed.fixedCode || "",

      summary: parsed.summary || "",

      score: Number.isFinite(score) ? Math.min(100, Math.max(0, Math.round(score))) : null,

      issues: Array.isArray(parsed.issues) ? parsed.issues : [],
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Review failed, please try again",
    });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .select("language originalCode score summary createdAt issues");

    res.json(reviews);
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to load reviews" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, review });
  } catch (error) {
    console.error("GET REVIEW ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to load review" });
  }
};

export const getMyStats = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .sort({ createdAt: 1 })
      .select("language score issues createdAt");

    const scored = reviews.filter((r) => typeof r.score === "number");
    const issuesByType = {};
    const langCount = {};
    let totalIssues = 0;

    for (const r of reviews) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
      for (const issue of r.issues) {
        const type = (issue.type || "other").toLowerCase();
        issuesByType[type] = (issuesByType[type] || 0) + 1;
        totalIssues++;
      }
    }

    res.json({
      totalReviews: reviews.length,
      avgScore: scored.length
        ? Math.round(scored.reduce((sum, r) => sum + r.score, 0) / scored.length)
        : 0,
      totalIssues,
      issuesByType,
      topLanguages: Object.entries(langCount)
        .map(([language, count]) => ({ language, count }))
        .sort((a, b) => b.count - a.count),
      trend: scored.slice(-20).map((r) => ({
        date: r.createdAt.toISOString().slice(0, 10),
        score: r.score,
      })),
    });
  } catch (error) {
    console.error("GET STATS ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to load stats" });
  }
};
