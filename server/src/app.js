import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import reviewRoutes from "./routes/review.routes.js";
import streamRoutes from "./routes/stream.routes.js";

const app = express();

// Render sits behind a proxy; needed for correct client IPs in rate limiting
app.set("trust proxy", 1);

// CLIENT_URL: comma-separated allowed origins (e.g. https://your-app.vercel.app). Unset = allow all (dev).
app.use(
  cors({
    origin: process.env.CLIENT_URL
      ? process.env.CLIENT_URL.split(",").map((o) => o.trim())
      : true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use(
  "/api",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false })
);

app.use("/api/review", reviewRoutes);

app.use("/api/stream", streamRoutes);

export default app;
