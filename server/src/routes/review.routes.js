import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createReview } from "../controllers/review.controller.js";
import {
  analyzePR,
  analyzeRepo,
  analyzeRepoStream,
} from "../controllers/github.controller.js";

const router = express.Router();

// Existing: paste code review
router.post("/", createReview);

// Existing: PR review
router.post("/pr", analyzePR);

// NEW: Full repo review (non-streaming JSON)
router.post("/repo", analyzeRepo);

// NEW: Full repo review (streaming SSE) ← use this for the UI
router.post("/repo/stream", analyzeRepoStream);

export default router;