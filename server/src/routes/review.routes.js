import express from "express";

import protect from "../middleware/auth.middleware.js";

import { createReview } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", createReview);

export default router;