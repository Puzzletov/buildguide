export type GlyphTone = "cyan" | "blue" | "green" | "amber" | "rose";

export interface GlyphMeta {
  label: string;
  tone: GlyphTone;
}

const GOAL_GLYPHS: Record<string, GlyphMeta> = {
  website: { label: "WEB", tone: "cyan" },
  webapp: { label: "APP", tone: "blue" },
  chatbot: { label: "BOT", tone: "green" },
  aitools: { label: "AIC", tone: "amber" },
  localai: { label: "LCL", tone: "rose" },
  automation: { label: "AUT", tone: "blue" },
  mobileapp: { label: "MOB", tone: "cyan" },
  notsure: { label: "QRY", tone: "amber" },
  database: { label: "DB", tone: "green" },
  deployment: { label: "DEP", tone: "blue" },
  security: { label: "SEC", tone: "rose" },
  testing: { label: "TST", tone: "cyan" },
  bestpractices: { label: "OPS", tone: "green" },
  prompting: { label: "PRM", tone: "amber" },
  agentdev: { label: "AGT", tone: "blue" },
  designflow: { label: "DSN", tone: "cyan" },
};

const TOOL_GLYPHS: Record<string, GlyphMeta> = {
  framer: { label: "FRM", tone: "cyan" },
  squarespace: { label: "SQR", tone: "rose" },
  webflow: { label: "WFL", tone: "blue" },
  githubpages: { label: "GHP", tone: "blue" },
  netlify: { label: "NTL", tone: "green" },
  v0: { label: "V0", tone: "amber" },
  wordpress: { label: "WPS", tone: "cyan" },
  vscode: { label: "VSC", tone: "blue" },
  terminal: { label: "TRM", tone: "rose" },
  dependencies: { label: "DEP", tone: "green" },
  cursor: { label: "CSR", tone: "amber" },
  claudecode: { label: "CLD", tone: "blue" },
  copilot: { label: "COP", tone: "green" },
  cline: { label: "CLN", tone: "rose" },
  opencode: { label: "OPN", tone: "cyan" },
  aider: { label: "ADR", tone: "blue" },
  openclaw: { label: "OCL", tone: "amber" },
  antigravity: { label: "AGV", tone: "rose" },
  supabase: { label: "SUP", tone: "green" },
  ollama: { label: "OLL", tone: "rose" },
  lmstudio: { label: "LMS", tone: "cyan" },
  planetscale: { label: "PSC", tone: "blue" },
  neon: { label: "NEO", tone: "green" },
  mongodb: { label: "MDB", tone: "amber" },
  sqlite: { label: "SQL", tone: "cyan" },
  redis: { label: "RDS", tone: "rose" },
  firebase: { label: "FBR", tone: "amber" },
  vercel: { label: "VCL", tone: "blue" },
  "netlify-deploy": { label: "NTD", tone: "green" },
  railway: { label: "RLW", tone: "rose" },
  flyio: { label: "FLY", tone: "cyan" },
  "env-separation": { label: "ENV", tone: "blue" },
  vitest: { label: "VIT", tone: "green" },
  jest: { label: "JST", tone: "amber" },
  playwright: { label: "PWT", tone: "rose" },
  "testing-library": { label: "TLY", tone: "blue" },
  msw: { label: "MSW", tone: "cyan" },
  "security-guide": { label: "SEC", tone: "rose" },
  "bestpractices-guide": { label: "OPS", tone: "green" },
  "prompting-guide": { label: "PRM", tone: "amber" },
  "agentdev-guide": { label: "AGT", tone: "blue" },
  "designflow-guide": { label: "DSN", tone: "cyan" },
  "chatbot-stack": { label: "STK", tone: "green" },
  chatgpt: { label: "CGP", tone: "cyan" },
  codex: { label: "CDX", tone: "blue" },
  "claude-api": { label: "CLA", tone: "rose" },
  googleaistudio: { label: "GAS", tone: "amber" },
  geminiapi: { label: "GEM", tone: "blue" },
  deepseek: { label: "DSK", tone: "green" },
  minimax: { label: "MMX", tone: "rose" },
  kimi: { label: "KIM", tone: "cyan" },
  openrouter: { label: "ORT", tone: "amber" },
};

const FALLBACK_TONES: GlyphTone[] = ["cyan", "blue", "green", "amber", "rose"];

function hashTone(seed: string): GlyphTone {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_TONES[hash % FALLBACK_TONES.length];
}

function compactLabel(value: string): string {
  const clean = value.replace(/[^a-z0-9]/gi, "").toUpperCase();
  if (clean.length >= 3) {
    return clean.slice(0, 3);
  }
  if (clean.length === 2) {
    return clean;
  }
  if (clean.length === 1) {
    return `${clean}X`;
  }
  return "N/A";
}

export function getGoalGlyph(path: string): GlyphMeta {
  return GOAL_GLYPHS[path] ?? { label: compactLabel(path), tone: hashTone(path) };
}

export function getToolGlyph(toolId: string, fallbackName?: string): GlyphMeta {
  if (TOOL_GLYPHS[toolId]) {
    return TOOL_GLYPHS[toolId];
  }
  const base = fallbackName && fallbackName.trim().length > 0 ? fallbackName : toolId;
  return { label: compactLabel(base), tone: hashTone(base) };
}
