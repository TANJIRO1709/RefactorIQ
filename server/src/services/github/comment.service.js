import { Octokit } from "@octokit/rest";

export const createInlineComment = async ({
  token,
  owner,
  repo,
  pull_number,
  body,
  commit_id,
  path,
  line,
}) => {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.pulls.createReviewComment({
    owner,
    repo,
    pull_number,
    body,
    commit_id,
    path,
    line,
  });
};