import { Octokit } from "@octokit/rest";

export const getPRFiles = async ({
  token,
  owner,
  repo,
  pull_number,
}) => {
  const octokit = new Octokit({
    auth: token,
  });

  const { data } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number,
  });

  return data;
};