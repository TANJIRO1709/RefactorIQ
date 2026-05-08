import express from "express";

import { streamCodeReview } from "../controllers/stream.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, streamCodeReview);

export default router;