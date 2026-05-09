import { getPRFiles, getRepoFiles, parseRepoUrl } from "../services/github/github.service.js";
import { reviewCode } from "../services/ai/reviewEngine.js";
import client from "../services/ai/openai.service.js";

// Existing: Analyze a PR
export const analyzePR = async (req, res) => {
  try {
    const { token, owner, repo, pull_number } = req.body;

    const files = await getPRFiles({ token, owner, repo, pull_number });
    const reviews = [];

    for (const file of files) {
      if (!file.patch) continue;
      const aiReview = await reviewCode(file.patch, "diff");
      reviews.push({ filename: file.filename, review: aiReview });
    }

    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "PR Analysis Failed" });
  }
};

// NEW: Stream review of an entire GitHub repo by URL
export const analyzeRepoStream = async (req, res) => {
  try {
    const { repoUrl, token } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ success: false, message: "repoUrl is required" });
    }

    // Parse URL → owner/repo
    const { owner, repo } = parseRepoUrl(repoUrl);

    // SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);

    send({ type: "status", message: `Fetching files from ${owner}/${repo}...` });

    // Fetch repo files
    let files;
    try {
      files = await getRepoFiles({ token, owner, repo, maxFiles: 25 });
    } catch (err) {
      send({ type: "error", message: err.message });
      return res.end();
    }

    if (!files.length) {
      send({ type: "error", message: "No reviewable code files found in this repository." });
      return res.end();
    }

    send({ type: "status", message: `Found ${files.length} files. Starting AI review...` });
    send({ type: "meta", totalFiles: files.length, owner, repo });

    // Review each file with streaming
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      send({
        type: "file_start",
        filename: file.filename,
        index: i,
        total: files.length,
      });

      try {
        const model = client.getGenerativeModel({ model: "gemini-flash-latest" });

        // Detect language from extension
        const ext = file.filename.split(".").pop();
        const langMap = {
          js: "JavaScript", jsx: "React JSX", ts: "TypeScript", tsx: "React TSX",
          py: "Python", java: "Java", go: "Go", rb: "Ruby", php: "PHP",
          cs: "C#", cpp: "C++", c: "C", swift: "Swift", kt: "Kotlin",
          rs: "Rust", vue: "Vue", svelte: "Svelte",
        };
        const language = langMap[ext] || ext;

        const prompt = `
You are a senior software engineer doing a thorough code review.

File: ${file.filename}
Language: ${language}

Review this code and provide:
1. A brief summary of what this file does
2. Bugs or logic errors found
3. Security vulnerabilities
4. Performance issues
5. Code quality & best practice violations
6. Specific improvement suggestions

Be concise but specific. Reference line content when relevant.

CODE:
\`\`\`${language}
${file.content.slice(0, 8000)}
\`\`\`
`;

        const result = await model.generateContentStream(prompt);

        for await (const chunk of result.stream) {
          const content = chunk.text();
          send({ type: "chunk", filename: file.filename, content });
        }

        send({ type: "file_done", filename: file.filename, index: i });
      } catch (err) {
        send({ type: "file_error", filename: file.filename, message: "Failed to review this file" });
      }
    }

    send({ type: "done", message: "Repository review complete!" });
    res.end();
  } catch (error) {
    console.error("REPO ANALYSIS ERROR:", error);
    res.write(`data: ${JSON.stringify({ type: "error", message: "Repository analysis failed" })}\n\n`);
    res.end();
  }
};

// NEW: Non-streaming repo review (returns full JSON)
export const analyzeRepo = async (req, res) => {
  try {
    const { repoUrl, token } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ success: false, message: "repoUrl is required" });
    }

    const { owner, repo } = parseRepoUrl(repoUrl);
    const files = await getRepoFiles({ token, owner, repo, maxFiles: 15 });

    if (!files.length) {
      return res.status(404).json({ success: false, message: "No reviewable files found" });
    }

    const reviews = [];

    for (const file of files) {
      const ext = file.filename.split(".").pop();
      const aiReview = await reviewCode(file.content.slice(0, 6000), ext);

      let parsed;
      try {
        parsed = JSON.parse(aiReview);
      } catch {
        parsed = { summary: aiReview, issues: [], fixedCode: "" };
      }

      reviews.push({ filename: file.filename, ...parsed });
    }

    res.json({ success: true, owner, repo, totalFiles: files.length, reviews });
  } catch (error) {
    console.error("REPO REVIEW ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};