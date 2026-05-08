import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import reviewRoutes from "./routes/review.routes.js";
import streamRoutes from "./routes/stream.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/review", reviewRoutes);

app.use("/api/stream", streamRoutes);

export default app;