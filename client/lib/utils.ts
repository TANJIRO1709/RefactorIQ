import clsx from "clsx";

export function cn(...inputs: string[]) {
  return clsx(...inputs);
}
// Detect language from file extension
export function detectLanguage(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();

  const map: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    tsx: "typescript",
    jsx: "javascript",
    py: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    go: "go",
    rs: "rust",
    php: "php",
    rb: "ruby",
  };

  return map[ext || ""] || "plaintext";
}

// Format date
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Truncate long strings
export function truncate(str: string, n = 80) {
  return str.length > n ? str.slice(0, n) + "..." : str;
}

// Severity color mapping
export function severityColor(
  severity: "critical" | "warning" | "info"
) {
  return {
    critical: "bg-red-900/40 text-red-400 border-red-800",
    warning: "bg-yellow-900/40 text-yellow-400 border-yellow-800",
    info: "bg-blue-900/40 text-blue-400 border-blue-800",
  }[severity];
}

// Count issues
export function countIssues(review: string) {
  return {
    bugs: (review.match(/bug|error|fix/gi) || []).length,
    security:
      (review.match(/security|vulnerability|injection|xss/gi) || []).length,
    perf:
      (review.match(/performance|slow|optimize/gi) || []).length,
  };
}