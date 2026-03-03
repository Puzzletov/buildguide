import type { Step } from "../types";

const VS_CODE_STEPS: Step[] = [
  {
    title: "Install VS Code",
    body: `<p>Download Visual Studio Code from the official website and install it like any normal desktop app.</p>
<div class="info-box"><a href="https://code.visualstudio.com" target="_blank" class="ext-link">code.visualstudio.com</a></div>
<p>When VS Code opens for the first time, you can skip the onboarding screens and start with a clean window.</p>`,
  },
  {
    title: "Install core prerequisites",
    body: `<p>Install these once before using AI coding tools:</p>
<p>- <strong>Git</strong> for version control<br>- <strong>Node.js LTS</strong> for JavaScript tooling<br>- <strong>Python</strong> only if you plan to use Python-based tools</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>git --version
node --version
npm --version</div>
<p>If a command fails, install the missing tool first, then run the check again.</p>`,
  },
  {
    title: "Set up your workspace and terminal",
    body: `<p>In VS Code, open your project folder with <strong>File -> Open Folder</strong>.</p>
<p>Open the integrated terminal with <strong>Ctrl + Backtick</strong> (Windows/Linux) or <strong>Cmd + Backtick</strong> (macOS).</p>
<div class="tip-box">Use one project per folder. Keep all commands inside that folder so installs stay isolated and predictable.</div>`,
  },
  {
    title: "Install quality extensions",
    body: `<p>Open Extensions (<strong>Ctrl/Cmd + Shift + X</strong>) and install:</p>
<p>- ESLint<br>- Prettier - Code formatter<br>- GitHub Copilot, Cline, or your preferred AI extension</p>
<p>This gives you linting, formatting, and AI assistance in one place.</p>`,
  },
  {
    title: "Run your first project command",
    body: `<p>Most JavaScript projects expose scripts in <code>package.json</code>. Start by installing dependencies, then running dev mode:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install
npm run dev</div>
<p>If <code>npm run dev</code> fails, read the first error line carefully and fix one issue at a time.</p>
<div class="success-box">VS Code is ready for AI-assisted development.</div>`,
  },
];

const TERMINAL_STEPS: Step[] = [
  {
    title: "Know what the terminal is for",
    body: `<p>The terminal is a text interface for running project commands. AI coding tools use it for installs, tests, and build scripts.</p>
<p>You do not need advanced shell skills. A small command set is enough for most projects.</p>`,
  },
  {
    title: "Open terminal correctly",
    body: `<p>Use VS Code's integrated terminal so commands run in your project context.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>pwd
ls</div>
<p><code>pwd</code> shows current folder, <code>ls</code> shows files. Confirm you are inside your project before running install or build commands.</p>`,
  },
  {
    title: "Use the minimum command set",
    body: `<p>Memorize these core commands:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>cd path/to/folder
ls
mkdir new-folder
npm install
npm run dev
npm test</div>
<p>These six commands cover most daily workflows for beginners.</p>`,
  },
  {
    title: "Read command errors the right way",
    body: `<p>When a command fails, do not retry blindly. Follow this order:</p>
<p>1) Read the first red error line<br>2) Confirm command spelling<br>3) Check tool version<br>4) Search exact error text</p>
<div class="tip-box">Copy the exact error output into your AI prompt. Precise logs produce precise fixes.</div>`,
  },
  {
    title: "Safe terminal practices",
    body: `<p>Before running destructive commands, verify what they do. Avoid random scripts from unknown sources.</p>
<p>Never paste secrets (API keys, database passwords) into shared terminals or public screenshots.</p>
<div class="success-box">Terminal basics complete. You can now follow modern AI coding guides safely.</div>`,
  },
];

const DEPENDENCY_STEPS: Step[] = [
  {
    title: "Pick one package manager and stay consistent",
    body: `<p>Use one package manager per repository: <strong>npm</strong>, <strong>pnpm</strong>, or <strong>yarn</strong>.</p>
<p>If a repo already has a lockfile (<code>package-lock.json</code>, <code>pnpm-lock.yaml</code>, or <code>yarn.lock</code>), keep using that tool.</p>`,
  },
  {
    title: "Initialize and install dependencies",
    body: `<p>For a new Node project:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm init -y
npm install</div>
<p>For an existing project, run only <code>npm install</code> in the root folder.</p>`,
  },
  {
    title: "Install runtime vs dev dependencies correctly",
    body: `<p>Runtime packages are needed by your app in production. Dev packages are only for local tooling and tests.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install axios
npm install -D typescript eslint prettier vitest</div>`,
  },
  {
    title: "Standardize scripts in package.json",
    body: `<p>Create predictable scripts so humans and AI tools run the same commands:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "vitest run",
    "check": "npm run build && npm run test"
  }
}</div>`,
  },
  {
    title: "Handle dependency issues quickly",
    body: `<p>When installs break:</p>
<p>1) delete <code>node_modules</code><br>2) delete lockfile only if corrupted<br>3) reinstall cleanly<br>4) run audit and update intentionally</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm audit
npm outdated</div>
<div class="success-box">Dependency management setup complete.</div>`,
  },
];

const CURSOR_STEPS: Step[] = [
  {
    title: "Install Cursor and sign in",
    body: `<p>Download Cursor and create an account.</p>
<div class="info-box"><a href="https://cursor.com" target="_blank" class="ext-link">cursor.com</a></div>
<p>Open your project folder and allow it to index the repository.</p>`,
  },
  {
    title: "Configure workspace rules",
    body: `<p>Create a <code>.cursorrules</code> file in your project root to guide behavior:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Write small, readable functions.
Do not modify secrets or .env files.
Ask before deleting files.
Run tests after major edits.</div>`,
  },
  {
    title: "Use structured prompts, not vague requests",
    body: `<p>Use this template when asking Cursor for changes:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Goal: [what to build]
Context: [current files and constraints]
Rules: [style, framework, limits]
Output: [exact files or diff expected]
Validation: [tests or checks to run]</div>`,
  },
  {
    title: "Review every proposed diff before apply",
    body: `<p>Cursor is fastest when you keep edit scope tight. Approve small, reviewable batches.</p>
<p>If output drifts, reject changes and provide a tighter prompt with explicit constraints.</p>
<div class="success-box">Cursor setup complete.</div>`,
  },
];

const CLAUDE_CODE_STEPS: Step[] = [
  {
    title: "Install Node.js LTS first",
    body: `<p>Claude Code requires Node.js 18+ (Node 20 LTS recommended).</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>node --version
npm --version</div>`,
  },
  {
    title: "Install Claude Code globally",
    body: `<p>Install using npm:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install -g @anthropic-ai/claude-code</div>
<p>If permissions fail, use a Node version manager (nvm/fnm) instead of sudo.</p>`,
  },
  {
    title: "Set your Anthropic API key",
    body: `<p>Create a key in Anthropic Console and export it in your shell session.</p>
<div class="info-box"><a href="https://console.anthropic.com" target="_blank" class="ext-link">console.anthropic.com</a></div>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>export ANTHROPIC_API_KEY="sk-ant-..."</div>
<p>Windows PowerShell:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>$env:ANTHROPIC_API_KEY="sk-ant-..."</div>`,
  },
  {
    title: "Initialize the project context",
    body: `<p>Open terminal in your repository and start Claude Code:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>cd /path/to/project
claude
/init</div>
<p>This creates project context instructions so responses stay aligned with your repo.</p>`,
  },
  {
    title: "Use prompt engineering for predictable output",
    body: `<p>Use explicit, testable instructions:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Implement: add pagination to /api/posts.
Constraints: keep existing response shape.
Files allowed: app/api/posts/route.ts, tests/integration/api/posts.test.ts
Validation: run npm run test:integration and report failures only.</div>
<div class="success-box">Claude Code setup complete.</div>`,
  },
];

const COPILOT_STEPS: Step[] = [
  {
    title: "Install VS Code and sign in to GitHub",
    body: `<p>Copilot works inside VS Code.</p>
<div class="info-box"><a href="https://code.visualstudio.com" target="_blank" class="ext-link">code.visualstudio.com</a></div>
<p>Sign in with your GitHub account in VS Code before enabling Copilot.</p>`,
  },
  {
    title: "Enable Copilot and Copilot Chat extensions",
    body: `<p>Open Extensions panel and install:</p>
<p>- GitHub Copilot<br>- GitHub Copilot Chat</p>
<div class="info-box"><a href="https://github.com/features/copilot" target="_blank" class="ext-link">github.com/features/copilot</a></div>`,
  },
  {
    title: "Set repository instructions",
    body: `<p>Create <code>.github/copilot-instructions.md</code> with coding rules, style preferences, and security constraints.</p>
<p>This improves consistency across suggestions and chat responses.</p>`,
  },
  {
    title: "Use chat with structured tasks",
    body: `<p>Ask for one deliverable at a time and include acceptance criteria.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Refactor this component to remove duplicated state.
Keep behavior unchanged.
Show a before/after summary.
Add one unit test for the extracted helper.</div>
<div class="success-box">Copilot setup complete.</div>`,
  },
];

const CLINE_STEPS: Step[] = [
  {
    title: "Install Cline extension in VS Code",
    body: `<p>Open Extensions and install <strong>Cline</strong> by saoudrizwan.</p>
<p>Then open the Cline panel in the left sidebar.</p>`,
  },
  {
    title: "Connect a model provider",
    body: `<p>In Cline settings, select a provider (Anthropic/OpenAI/Ollama) and add credentials.</p>
<div class="tip-box">Use local Ollama models if you want a low-cost or offline setup.</div>`,
  },
  {
    title: "Set approval and execution rules",
    body: `<p>Keep user confirmations enabled for file writes and terminal commands, especially in early setup.</p>
<p>Limit scope to your project folder and block destructive commands.</p>`,
  },
  {
    title: "Give Cline bounded prompts",
    body: `<p>Example prompt:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Create a health-check endpoint in app/api/health/route.ts.
Do not modify unrelated files.
Return JSON: { status: "ok", timestamp: ISO string }.
Run tests related to API routes only.</div>
<div class="success-box">Cline setup complete.</div>`,
  },
];

const OPENCODE_STEPS: Step[] = [
  {
    title: "Install opencode CLI",
    body: `<p>Install opencode globally (Node.js required):</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install -g opencode-ai</div>
<p>Then confirm installation:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>opencode --version</div>`,
  },
  {
    title: "Configure model credentials",
    body: `<p>Set your model provider key in environment variables before starting sessions.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>export ANTHROPIC_API_KEY="sk-ant-..."</div>`,
  },
  {
    title: "Start in project root and run focused tasks",
    body: `<p>Open your repository, then start opencode:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>cd /path/to/repo
opencode</div>
<p>Use small, verifiable prompts and review proposed edits before accepting.</p>`,
  },
  {
    title: "Debug failures with logs and dry runs",
    body: `<p>When behavior is off, capture command output and rerun with narrower instructions.</p>
<p>Keep a known-good baseline by committing before large AI sessions.</p>
<div class="success-box">opencode setup complete.</div>`,
  },
];

const OPENCLAW_STEPS: Step[] = [
  {
    title: "Verify Node and npm versions",
    body: `<p>OpenClaw needs Node.js 18+.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>node --version
npm --version</div>`,
  },
  {
    title: "Install OpenClaw globally",
    body: `<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install -g openclaw
openclaw --version</div>
<p>If install permission errors appear, configure npm with a user directory or use nvm/fnm.</p>`,
  },
  {
    title: "Set provider keys safely",
    body: `<p>Set API credentials in environment variables and keep them out of source control.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>export ANTHROPIC_API_KEY="sk-ant-..."</div>
<p>Windows PowerShell:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>$env:ANTHROPIC_API_KEY="sk-ant-..."</div>`,
  },
  {
    title: "Run your first task with dry-run",
    body: `<p>Start in your project directory and preview changes first:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>cd /path/to/project
openclaw --dry-run -p "Refactor duplicated API validation logic into one helper."</div>
<p>Remove <code>--dry-run</code> only after the plan matches your intent.</p>`,
  },
  {
    title: "Use a repeatable debugging checklist",
    body: `<p>When OpenClaw fails, verify:</p>
<p>1) binary path<br>2) version<br>3) API key loaded<br>4) project directory<br>5) prompt scope</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>which openclaw
openclaw --version
echo $ANTHROPIC_API_KEY</div>
<div class="success-box">OpenClaw setup complete.</div>`,
  },
];

const AIDER_STEPS: Step[] = [
  {
    title: "Install Aider using pipx (recommended)",
    body: `<p>Use pipx for isolated CLI installs:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>python3 --version
pipx install aider-chat</div>
<p>If pipx is missing, install it first from official docs.</p>`,
  },
  {
    title: "Set model API key",
    body: `<p>Set Anthropic or OpenAI key in your shell:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>export ANTHROPIC_API_KEY="sk-ant-..."</div>`,
  },
  {
    title: "Run Aider in a git repository",
    body: `<p>Aider works best with Git so every AI change can be reviewed and reverted.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>cd /path/to/repo
git status
aider --model claude-sonnet-4-5</div>`,
  },
  {
    title: "Prompt with clear acceptance tests",
    body: `<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Add request timeout handling in src/api/client.ts.
Keep existing exports unchanged.
Add tests for timeout and retry behavior.
Run npm run test and summarize results.</div>
<div class="success-box">Aider setup complete.</div>`,
  },
];

const ANTIGRAVITY_STEPS: Step[] = [
  {
    title: "Install Antigravity from official release channel",
    body: `<p>Install Antigravity from its official website or release channel for your OS.</p>
<div class="info-box"><a href="https://antigravity.dev" target="_blank" class="ext-link">antigravity.dev</a></div>
<p>If your team uses a custom enterprise build, follow your internal installer instructions instead.</p>`,
  },
  {
    title: "Connect your model provider",
    body: `<p>Add your preferred model/API provider in Antigravity settings (Anthropic/OpenAI/local endpoint).</p>
<p>Store credentials in environment variables or encrypted settings, never in code files.</p>`,
  },
  {
    title: "Open repository and set project rules",
    body: `<p>Before first run, define boundaries:</p>
<p>- allowed directories<br>- required confirmation for destructive edits<br>- test command to run after changes</p>
<div class="tip-box">This keeps agent behavior predictable and safe for larger repositories.</div>`,
  },
  {
    title: "Run one focused task and validate output",
    body: `<p>Start with a narrow prompt and explicit validation:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Goal: add loading and error states to dashboard cards.
Constraints: keep existing API contract unchanged.
Validation: npm run lint && npm run test.</div>
<div class="success-box">Antigravity baseline setup complete.</div>`,
  },
];

const AI_CODING_STEPS: Record<string, Step[]> = {
  vscode: VS_CODE_STEPS,
  terminal: TERMINAL_STEPS,
  dependencies: DEPENDENCY_STEPS,
  cursor: CURSOR_STEPS,
  claudecode: CLAUDE_CODE_STEPS,
  copilot: COPILOT_STEPS,
  cline: CLINE_STEPS,
  opencode: OPENCODE_STEPS,
  openclaw: OPENCLAW_STEPS,
  aider: AIDER_STEPS,
  antigravity: ANTIGRAVITY_STEPS,
};

export function aiCodingSteps(toolId: string): Step[] {
  return AI_CODING_STEPS[toolId] ?? [];
}
