import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createReview,
  getMyReviews,
  getMyStats,
  getReviewById,
} from "../controllers/review.controller.js";
import {
  analyzePR,
  analyzeRepo,
  analyzeRepoStream,
} from "../controllers/github.controller.js";

const router = express.Router();

router.use(protect);

// Paste code review
router.post("/", createReview);

// Dashboard
router.get("/", getMyReviews);
router.get("/stats", getMyStats);

// PR review
router.post("/pr", analyzePR);

// Full repo review (non-streaming JSON)
router.post("/repo", analyzeRepo);

// Full repo review (streaming SSE) ← used by the UI
router.post("/repo/stream", analyzeRepoStream);

// Must stay last so it doesn't shadow /stats
router.get("/:id", getReviewById);

export default router;
