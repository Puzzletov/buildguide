export const PATH_TOOLS: Record<string, string[]> = {
  website: ["framer", "v0", "netlify", "squarespace", "wordpress", "webflow", "githubpages"],
  aitools: ["cursor", "claudecode", "copilot", "cline", "opencode", "openclaw", "aider"],
  localai: ["lmstudio", "ollama"],
  webapp: ["supabase", "v0", "netlify", "cursor", "claudecode", "cline", "openclaw"],
  chatbot: ["cursor", "claudecode", "cline", "supabase"],
  automation: ["cursor", "claudecode", "cline", "openclaw"],
  mobileapp: ["supabase", "cursor", "claudecode", "cline"],
  notsure: ["framer", "v0", "cursor", "ollama", "supabase"],
  database: ["supabase", "planetscale", "neon", "mongodb", "sqlite", "redis", "firebase"],
  deployment: ["vercel", "netlify-deploy", "railway", "flyio", "env-separation"],
  testing: ["vitest", "jest", "playwright", "testing-library", "msw"],
  security: ["security-guide"],
  bestpractices: ["bestpractices-guide"],
  prompting: ["prompting-guide"],
};

export const SEQUENTIAL_PATHS = new Set(["security", "bestpractices", "prompting"]);


