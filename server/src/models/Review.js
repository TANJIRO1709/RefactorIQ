import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  type: String,
  message: String,
  severity: String,
  line: Number,
});

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    language: String,

    originalCode: String,

    reviewedCode: String,

    summary: String,

    issues: [issueSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema);