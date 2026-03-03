import type { Step } from "../types";

export const SECURITY_STEPS: Step[] = [
  {
    title: "Never commit secrets",
    body: "<p>Secrets include API keys, database passwords, JWT secrets, and tokens. Keep them in env files and secret managers only.</p><p>If you commit a secret even once, rotate it immediately. Git history is permanent enough to treat that secret as compromised forever.</p>",
  },
  {
    title: "Environment variables the right way",
    body: "<p><code>.env.example</code> should contain names only, no values. Use <code>.env.local</code> for local development.</p><p>Staging and production use different values for the same keys. Never hardcode secrets like <code>sk-ant-abc123</code> in source files.</p>",
  },
  {
    title: "Row Level Security (RLS)",
    body: "<p>RLS is database-level access control. Default deny means rows are private unless a policy allows access.</p><p>Without RLS, one logged-in user could read another user\'s data. With correct RLS, users can only access their own rows.</p>",
  },
  {
    title: "Authentication basics",
    body: "<p>Do not roll your own auth. Use Supabase Auth, Clerk, or NextAuth.</p><p>Store session tokens in httpOnly cookies, not localStorage, and always validate sessions server-side.</p>",
  },
  {
    title: "Input validation",
    body: "<p>Never trust form/query/URL input. Validate with Zod on the server, even if the client also validates.</p><p>SQL injection and malformed input are still real risks in modern apps.</p>",
  },
  {
    title: "Dependency security",
    body: "<p>Run <code>npm audit</code> regularly, pin dependency ranges responsibly, and review lockfile changes in PRs.</p><p>Use Dependabot or Renovate for regular patch updates.</p>",
  },
  {
    title: "HTTPS and headers",
    body: "<p>Use HTTPS everywhere (Vercel/Netlify provide it by default). Add security headers like CSP, X-Frame-Options, and X-Content-Type-Options.</p>",
  },
  {
    title: "Rate limiting",
    body: "<p>Rate limiting prevents brute force and abuse. Protect login and write-heavy endpoints first.</p><p>Upstash Redis + <code>@upstash/ratelimit</code> is a simple production-ready approach for Next.js API routes.</p>",
  },
];


