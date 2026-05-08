import { getPRFiles } from "../services/github/github.service.js";

import { reviewCode } from "../services/ai/reviewEngine.js";

export const analyzePR = async (req, res) => {
  try {
    const { token, owner, repo, pull_number } = req.body;

    const files = await getPRFiles({
      token,
      owner,
      repo,
      pull_number,
    });

    const reviews = [];

    for (const file of files) {
      if (!file.patch) continue;

      const aiReview = await reviewCode(file.patch, "diff");

      reviews.push({
        filename: file.filename,
        review: aiReview,
      });
    }

    res.json(reviews);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "PR Analysis Failed",
    });
  }
};