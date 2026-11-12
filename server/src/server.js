import "./config/env.js";

import app from "./app.js";
import connectDB from "./config/db.js";

const missing = ["MONGO_URI", "GEMINI_API_KEY"].filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});