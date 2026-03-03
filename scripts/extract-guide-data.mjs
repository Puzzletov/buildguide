import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const htmlPath = path.join(ROOT, "guide-v2.html");
const html = fs.readFileSync(htmlPath, "utf8");

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/i);
if (!scriptMatch) {
  throw new Error("Unable to locate main script block in guide-v2.html");
}
const script = scriptMatch[1];

function extractBetween(source, startToken, endToken) {
  const start = source.indexOf(startToken);
  if (start === -1) {
    throw new Error(`Missing start token: ${startToken}`);
  }
  const end = source.indexOf(endToken, start);
  if (end === -1) {
    throw new Error(`Missing end token: ${endToken}`);
  }
  return source.slice(start, end).trimEnd();
}

function extractBalancedObject(source, token) {
  const tokenPos = source.indexOf(token);
  if (tokenPos === -1) {
    throw new Error(`Missing token: ${token}`);
  }
  const startBrace = source.indexOf("{", tokenPos + token.length);
  if (startBrace === -1) {
    throw new Error(`No opening brace found for: ${token}`);
  }

  let mode = "normal";
  let depth = 0;
  let endBrace = -1;

  for (let i = startBrace; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1];

    if (mode === "line") {
      if (ch === "\n") mode = "normal";
      continue;
    }

    if (mode === "block") {
      if (ch === "*" && next === "/") {
        mode = "normal";
        i += 1;
      }
      continue;
    }

    if (mode === "single") {
      if (ch === "\\") {
        i += 1;
      } else if (ch === "'") {
        mode = "normal";
      }
      continue;
    }

    if (mode === "double") {
      if (ch === "\\") {
        i += 1;
      } else if (ch === '"') {
        mode = "normal";
      }
      continue;
    }

    if (mode === "template") {
      if (ch === "\\") {
        i += 1;
      } else if (ch === "`") {
        mode = "normal";
      }
      continue;
    }

    if (ch === "/" && next === "/") {
      mode = "line";
      i += 1;
      continue;
    }

    if (ch === "/" && next === "*") {
      mode = "block";
      i += 1;
      continue;
    }

    if (ch === "'") {
      mode = "single";
      continue;
    }

    if (ch === '"') {
      mode = "double";
      continue;
    }

    if (ch === "`") {
      mode = "template";
      continue;
    }

    if (ch === "{") {
      depth += 1;
      continue;
    }

    if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        endBrace = i;
        break;
      }
      continue;
    }
  }

  if (endBrace === -1) {
    throw new Error(`Failed to close object for: ${token}`);
  }

  return source.slice(startBrace, endBrace + 1);
}

const websiteFn = extractBetween(script, "function websiteSteps(tool) {", "\n\nfunction aiToolSteps(tool) {");
const aiFn = extractBetween(script, "function aiToolSteps(tool) {", "\n\nfunction supabaseSteps() {");
const supabaseFn = extractBetween(script, "function supabaseSteps() {", "\n\nfunction localAISteps(tool) {");
const localAiFn = extractBetween(script, "function localAISteps(tool) {", "\n\nfunction setPriority(");

const toolObject = extractBalancedObject(script, "const TOOL_LIBRARY =");
const pathObject = extractBalancedObject(script, "const PATH_TOOLS =");

const stepsDir = path.join(ROOT, "lib", "data", "steps");
fs.mkdirSync(stepsDir, { recursive: true });

fs.writeFileSync(
  path.join(stepsDir, "website.ts"),
  `import type { Step } from "../types";\n\n${websiteFn.replace("function websiteSteps(tool)", "export function websiteSteps(tool: string): Step[]")}\n`,
  "utf8",
);

fs.writeFileSync(
  path.join(stepsDir, "aitools.ts"),
  `import type { Step } from "../types";\n\n${aiFn.replace("function aiToolSteps(tool)", "export function aiToolSteps(tool: string): Step[]")}\n`,
  "utf8",
);

fs.writeFileSync(
  path.join(stepsDir, "supabase.ts"),
  `import type { Step } from "../types";\n\n${supabaseFn.replace("function supabaseSteps()", "export function supabaseSteps(): Step[]")}\n`,
  "utf8",
);

fs.writeFileSync(
  path.join(stepsDir, "localai.ts"),
  `import type { Step } from "../types";\n\n${localAiFn.replace("function localAISteps(tool)", "export function localAISteps(tool: string): Step[]")}\n`,
  "utf8",
);

const legacyToolsFile = `import type { Tool } from "./types";\nimport { aiToolSteps } from "./steps/aitools";\nimport { localAISteps } from "./steps/localai";\nimport { supabaseSteps } from "./steps/supabase";\nimport { websiteSteps } from "./steps/website";\n\nexport const LEGACY_TOOL_LIBRARY: Record<string, Tool> = ${toolObject};\n`;

fs.writeFileSync(path.join(ROOT, "lib", "data", "legacy-tools.ts"), legacyToolsFile, "utf8");

const legacyPathsFile = `export const LEGACY_PATH_TOOLS: Record<string, string[]> = ${pathObject};\n`;
fs.writeFileSync(path.join(ROOT, "lib", "data", "legacy-paths.ts"), legacyPathsFile, "utf8");

console.log("Extracted data from guide-v2.html into lib/data/");

