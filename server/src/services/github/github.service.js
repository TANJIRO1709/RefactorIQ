import { Octokit } from "@octokit/rest";

// Existing: fetch PR files
export const getPRFiles = async ({ token, owner, repo, pull_number }) => {
  const octokit = new Octokit({ auth: token });
  const { data } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number,
  });
  return data;
};

// NEW: Parse a GitHub repo URL into { owner, repo }
export const parseRepoUrl = (repoUrl) => {
  try {
    const url = new URL(repoUrl);
    const parts = url.pathname.replace(/^\//, "").replace(/\/$/, "").split("/");
    if (parts.length < 2) throw new Error("Invalid GitHub repo URL");
    const repoName = parts[1].replace(/\.git$/, ""); // strip .git suffix
    return { owner: parts[0], repo: repoName };
  } catch {
    throw new Error("Invalid GitHub repo URL. Use format: https://github.com/owner/repo");
  }
};

// NEW: Recursively fetch all files in a repo (up to maxFiles limit)
export const getRepoFiles = async ({ token, owner, repo, maxFiles = 30 }) => {
  const octokit = new Octokit({ auth: token || undefined });

  // Get repo tree (recursive)
  const { data: repoData } = await octokit.repos.get({ owner, repo });
  const defaultBranch = repoData.default_branch;

  const { data: treeData } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: defaultBranch,
    recursive: "true",
  });

  // Filter to only reviewable code files
  const REVIEWABLE_EXTENSIONS = [
    ".js", ".jsx", ".ts", ".tsx", ".py", ".java", ".go",
    ".rb", ".php", ".cs", ".cpp", ".c", ".swift", ".kt",
    ".rs", ".vue", ".svelte",
  ];

  // Skip noisy/generated files
  const SKIP_PATTERNS = [
    "node_modules/", "dist/", "build/", ".next/", "coverage/",
    "package-lock.json", "yarn.lock", ".min.js", ".min.css",
    "__pycache__/", ".git/", "vendor/",
  ];

  const codeFiles = treeData.tree
    .filter((item) => {
      if (item.type !== "blob") return false;
      const path = item.path;
      if (SKIP_PATTERNS.some((p) => path.includes(p))) return false;
      return REVIEWABLE_EXTENSIONS.some((ext) => path.endsWith(ext));
    })
    .slice(0, maxFiles); // Cap to avoid huge repos

  // Fetch file contents in parallel (batched)
  const BATCH_SIZE = 5;
  const results = [];

  for (let i = 0; i < codeFiles.length; i += BATCH_SIZE) {
    const batch = codeFiles.slice(i, i + BATCH_SIZE);

    const fetched = await Promise.all(
      batch.map(async (file) => {
        try {
          const { data } = await octokit.repos.getContent({
            owner,
            repo,
            path: file.path,
          });

          // Content is base64 encoded
          const content = Buffer.from(data.content, "base64").toString("utf-8");

          // Skip very large files (>50KB)
          if (content.length > 50000) return null;

          return {
            filename: file.path,
            content,
            size: content.length,
          };
        } catch {
          return null; // Skip files that fail
        }
      })
    );

    results.push(...fetched.filter(Boolean));
  }

  return results;
};