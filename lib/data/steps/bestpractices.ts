import type { Step } from "../types";

export const BEST_PRACTICE_STEPS: Step[] = [
  {
    title: "No hardcoded values",
    body: "<p>Hardcoding environment-specific values creates hidden coupling. Use named constants and env vars instead.</p>",
  },
  {
    title: "Never commit .env files",
    body: "<p>Add env ignore rules before first commit. If already tracked, remove from git index and rotate any leaked secrets.</p>",
  },
  {
    title: "Use TypeScript, not any",
    body: "<p>Prefer explicit types. Use <code>unknown</code> for untrusted data, then narrow with runtime checks or Zod.</p>",
  },
  {
    title: "Consistent error handling",
    body: "<p>Avoid empty catch blocks. Return a consistent API error shape and log safely.</p>",
  },
  {
    title: "Commit messages explain why",
    body: "<p>Use Conventional Commits and include impact/context, not vague messages like <code>update stuff</code>.</p>",
  },
  {
    title: "Linting and formatting",
    body: "<p>Use ESLint + Prettier in CI and pre-commit hooks to keep code quality stable.</p>",
  },
  {
    title: "Keep secrets out of logs",
    body: "<p>Do not log full request/user objects containing tokens or passwords. Redact sensitive fields.</p>",
  },
  {
    title: "Review dependency lockfiles",
    body: "<p>Lockfile changes should be intentional. Review unexpected package additions carefully.</p>",
  },
  {
    title: "Principle of least privilege",
    body: "<p>Use minimal permissions in frontend keys and service accounts. Keep privileged keys server-side only.</p>",
  },
  {
    title: "Document decisions",
    body: "<p>Maintain docs for architecture, tool choices, and environment conventions so future changes stay coherent.</p>",
  },
];


