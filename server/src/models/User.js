import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: String,

    username: {
      type: String,
      required: true,
    },

    email: String,

    avatar: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);