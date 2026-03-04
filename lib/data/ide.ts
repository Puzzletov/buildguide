import { GOAL_PATHS } from "./goals";
import { PATH_TOOLS } from "./paths";
import { TOOL_LIBRARY } from "./tools";
import type { Step, Tool } from "./types";

export interface IdeOption {
  id: "vscode" | "cursor" | "windsurf" | "zed" | "antigravity";
  name: string;
  icon: string;
  tagline: string;
  detail: string;
  badge: string;
  badgeStyle: "blue" | "green" | "teal" | "purple" | "pink";
  url: string;
}

export interface IdeAgentOption {
  id: "claudecode" | "codex" | "cline" | "opencode" | "copilot";
  name: string;
  icon: string;
  tagline: string;
  badges: string[];
  bestFor: string;
  cost: string;
  compatible: IdeOption["id"][];
}

export const WINDSURF_CASCADE_ID = "windsurf-cascade";

export const IDES: IdeOption[] = [
  {
    id: "vscode",
    name: "VS Code",
    icon: "Code",
    tagline: "Microsoft's free editor - the world's most popular",
    detail: "Free, open source, massive extension ecosystem",
    badge: "Most popular",
    badgeStyle: "blue",
    url: "https://code.visualstudio.com",
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: "Wand2",
    tagline: "VS Code fork with AI built directly into the editor",
    detail: "Best experience for AI-first development",
    badge: "Recommended",
    badgeStyle: "green",
    url: "https://cursor.com",
  },
  {
    id: "windsurf",
    name: "Windsurf",
    icon: "Wind",
    tagline: "Codeium's AI-native editor with built-in Cascade agent",
    detail: "Built for AI flows; Cascade included",
    badge: "Free AI included",
    badgeStyle: "teal",
    url: "https://codeium.com/windsurf",
  },
  {
    id: "zed",
    name: "Zed",
    icon: "Feather",
    tagline: "Blazing-fast editor with a minimalist workflow",
    detail: "Fast, focused, and lightweight",
    badge: "Fastest",
    badgeStyle: "purple",
    url: "https://zed.dev",
  },
  {
    id: "antigravity",
    name: "Antigravity",
    icon: "Globe2",
    tagline: "Visual website builder with live AI code generation",
    detail: "No-code and low-code visual builder",
    badge: "For designers",
    badgeStyle: "pink",
    url: "https://antigravity.dev",
  },
];

export const AI_AGENTS: IdeAgentOption[] = [
  {
    id: "claudecode",
    name: "Claude Code",
    icon: "Brain",
    tagline: "Anthropic's official CLI agent - most autonomous",
    badges: ["Paid (usage-based)", "Best for complex tasks"],
    bestFor: "Large refactors, multi-file features, and debugging",
    cost: "Pay per use (~$0.01-$0.10/task)",
    compatible: ["vscode", "cursor", "windsurf", "zed", "antigravity"],
  },
  {
    id: "codex",
    name: "OpenAI Codex CLI",
    icon: "Code2",
    tagline: "OpenAI's coding agent that runs in your terminal",
    badges: ["Paid", "Uses AGENTS.md"],
    bestFor: "OpenAI users and terminal-first coding workflows",
    cost: "Uses OpenAI API credits",
    compatible: ["vscode", "cursor", "windsurf", "zed"],
  },
  {
    id: "cline",
    name: "Cline",
    icon: "Plug",
    tagline: "Free extension - bring your own AI model",
    badges: ["Extension is free", "Works with many models"],
    bestFor: "VS Code and Cursor users who want model flexibility",
    cost: "Extension free; pay only for model API",
    compatible: ["vscode", "cursor"],
  },
  {
    id: "opencode",
    name: "opencode",
    icon: "Terminal",
    tagline: "Open-source terminal agent with transparent workflows",
    badges: ["Free and open source", "TUI interface"],
    bestFor: "Developers who want control and scriptability",
    cost: "Free; pay only for your selected model provider",
    compatible: ["vscode", "cursor", "windsurf", "zed", "antigravity"],
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    icon: "GitFork",
    tagline: "Autocomplete plus agent features in VS Code",
    badges: ["~$10/month", "Deep VS Code integration"],
    bestFor: "Teams already using GitHub and VS Code",
    cost: "$10/month after trial",
    compatible: ["vscode", "cursor"],
  },
];

export const IDE_COMPATIBLE_GOALS = [
  "website",
  "webapp",
  "chatbot",
  "mobileapp",
  "automation",
  "database",
  "deployment",
  "testing",
  "bestpractices",
] as const;

const IDE_GOAL_TOOL_HINT: Record<(typeof IDE_COMPATIBLE_GOALS)[number], string> = {
  website: "v0",
  webapp: "supabase",
  chatbot: "chatbot-stack",
  mobileapp: "supabase",
  automation: "opencode",
  database: "supabase",
  deployment: "vercel",
  testing: "vitest",
  bestpractices: "bestpractices-guide",
};

const IDE_SETUP_STEPS: Record<IdeOption["id"], Step[]> = {
  vscode: [
    {
      title: "Download and install VS Code",
      body: `<p>Install VS Code from the official download page.</p>
<div class="info-box"><a href="https://code.visualstudio.com" target="_blank" class="ext-link">code.visualstudio.com</a></div>`,
    },
    {
      title: "Open your project folder in VS Code",
      body: `<p>Open VS Code and go to <strong>File -> Open Folder</strong>. Pick your project root so terminal and extensions run in the right directory.</p>`,
    },
    {
      title: "Verify the built-in terminal works",
      body: `<p>Use <strong>Ctrl/Cmd + backtick</strong> to open the terminal and run:</p>
<div class="code-block"><button class="copy-btn" type="button">Copy</button>pwd
ls</div>`,
    },
  ],
  cursor: [
    {
      title: "Download Cursor and sign in",
      body: `<p>Install Cursor and sign in, then open your project folder.</p>
<div class="info-box"><a href="https://cursor.com" target="_blank" class="ext-link">cursor.com</a></div>`,
    },
    {
      title: "Enable project indexing",
      body: `<p>Wait for Cursor to finish indexing your repository so agent requests can reference the full codebase.</p>`,
    },
    {
      title: "Confirm terminal access in Cursor",
      body: `<p>Open the built-in terminal (<strong>Ctrl/Cmd + backtick</strong>) and run your normal project command.</p>
<div class="code-block"><button class="copy-btn" type="button">Copy</button>npm install
npm run dev</div>`,
    },
  ],
  windsurf: [
    {
      title: "Install Windsurf and open your project",
      body: `<p>Download Windsurf and open your project folder.</p>
<div class="info-box"><a href="https://codeium.com/windsurf" target="_blank" class="ext-link">codeium.com/windsurf</a></div>`,
    },
    {
      title: "Open Cascade assistant panel",
      body: `<p>Use <strong>Ctrl/Cmd + L</strong> to open Cascade. Windsurf ships with Cascade built in.</p>`,
    },
    {
      title: "Verify terminal and project context",
      body: `<p>Open Windsurf terminal and run:</p>
<div class="code-block"><button class="copy-btn" type="button">Copy</button>pwd
git status</div>`,
    },
  ],
  zed: [
    {
      title: "Install Zed and open your project folder",
      body: `<p>Download Zed and open your repository.</p>
<div class="info-box"><a href="https://zed.dev" target="_blank" class="ext-link">zed.dev</a></div>`,
    },
    {
      title: "Open Zed assistant panel",
      body: `<p>Use Zed's assistant shortcut (from the command palette) to verify AI panel access.</p>`,
    },
    {
      title: "Verify terminal workflow in Zed",
      body: `<p>Use Zed's terminal pane and confirm commands run in the project root.</p>
<div class="code-block"><button class="copy-btn" type="button">Copy</button>pwd
ls</div>`,
    },
  ],
  antigravity: [
    {
      title: "Install and launch Antigravity",
      body: `<p>Install Antigravity from the official website.</p>
<div class="info-box"><a href="https://antigravity.dev" target="_blank" class="ext-link">antigravity.dev</a></div>`,
    },
    {
      title: "Open or create your visual project",
      body: `<p>Create a project in Antigravity and verify code export or local sync folder location.</p>`,
    },
    {
      title: "Open system terminal for agent workflows",
      body: `<p>Antigravity is visual-first, so run external agents from your system terminal in the synced project folder.</p>`,
    },
  ],
};

const AGENT_SETUP_STEPS: Record<IdeAgentOption["id"] | typeof WINDSURF_CASCADE_ID, Step[]> = {
  claudecode: TOOL_LIBRARY.claudecode.steps.slice(0, 4),
  codex: TOOL_LIBRARY.codex.steps.slice(0, 4),
  cline: TOOL_LIBRARY.cline.steps.slice(0, 4),
  opencode: TOOL_LIBRARY.opencode.steps.slice(0, 3),
  copilot: TOOL_LIBRARY.copilot.steps.slice(0, 4),
  [WINDSURF_CASCADE_ID]: [
    {
      title: "Use Windsurf Cascade as your primary agent",
      body: `<p>Open Cascade with <strong>Ctrl/Cmd + L</strong>. It is built in and requires no extra extension setup.</p>`,
    },
    {
      title: "Create a focused first request",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>Create a new Next.js page called /health.
Show current timestamp and a status badge.
Keep styling minimal and accessible.</div>`,
    },
    {
      title: "Review and apply changes in small batches",
      body: `<p>Approve changes incrementally and run tests after each larger batch.</p>`,
    },
  ],
};

const PAIRING_STEPS: Record<string, Step[]> = {
  "vscode:claudecode": [
    {
      title: "Open your project and terminal in VS Code",
      body: `<p>Open your project folder, then open terminal with <strong>Ctrl/Cmd + backtick</strong>.</p>`,
    },
    {
      title: "Start Claude Code in the project root",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>cd ~/Desktop/my-project
claude</div>`,
    },
    {
      title: "Send your first bounded instruction",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>Create a new Next.js project in this folder with TypeScript and Tailwind CSS.</div>`,
    },
  ],
  "vscode:cline": [
    {
      title: "Install Cline extension in VS Code",
      body: `<p>Open Extensions (four-squares icon), search <strong>Cline</strong>, and install.</p>`,
    },
    {
      title: "Connect API key in Cline settings",
      body: `<p>Open Cline panel, click settings, and add your model provider key.</p>`,
    },
    {
      title: "Run your first task from Cline panel",
      body: `<p>Open your project and issue one focused instruction in Cline chat.</p>`,
    },
  ],
  "vscode:codex": [
    {
      title: "Install Codex CLI in VS Code terminal",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>npm install -g @openai/codex</div>`,
    },
    {
      title: "Set your OpenAI key in terminal session",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>export OPENAI_API_KEY="sk-..."</div>`,
    },
    {
      title: "Run codex from project root",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>codex</div>
<p>Create an <code>AGENTS.md</code> file in your project root so Codex has standing repo instructions.</p>`,
    },
  ],
  "cursor:claudecode": [
    {
      title: "Open project and terminal in Cursor",
      body: `<p>Open your repo in Cursor and use <strong>Ctrl/Cmd + backtick</strong> for terminal access.</p>`,
    },
    {
      title: "Run Claude Code alongside Cursor",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>claude</div>`,
    },
    {
      title: "Split responsibilities for speed",
      body: `<p>Use Cursor native AI for inline edits and Claude Code for multi-file autonomous tasks.</p>`,
    },
  ],
  "cursor:cline": [
    {
      title: "Install Cline in Cursor extensions",
      body: `<p>Open Extensions and install Cline, then open the Cline sidebar panel.</p>`,
    },
    {
      title: "Connect provider key in Cline",
      body: `<p>Add your preferred model API key in Cline settings.</p>`,
    },
    {
      title: "Use Cursor AI plus Cline together",
      body: `<p>Use Cursor Composer for quick edits and Cline for longer autonomous tasks across multiple files.</p>`,
    },
  ],
  "windsurf:*": [
    {
      title: "Use Cascade for built-in agent workflows",
      body: `<p>Open Cascade with <strong>Ctrl/Cmd + L</strong>; no setup required.</p>`,
    },
    {
      title: "Optionally run external terminal agents",
      body: `<p>Open Windsurf terminal and run your external agent if needed:</p>
<div class="code-block"><button class="copy-btn" type="button">Copy</button>claude
opencode</div>`,
    },
    {
      title: "Use side-by-side workflow",
      body: `<p>Use Cascade for quick UI/flow edits and external CLI agents for larger logic or repo-wide refactors.</p>`,
    },
  ],
  "antigravity:claudecode": [
    {
      title: "Keep design in Antigravity and logic in terminal agent",
      body: `<p>Design visually in Antigravity, then open your system terminal for code-level edits.</p>`,
    },
    {
      title: "Run Claude Code from Antigravity project folder",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>cd ~/Antigravity/my-project
claude</div>`,
    },
    {
      title: "Apply API and logic changes through Claude",
      body: `<p>Use Claude Code for integrations and business logic not covered by visual editing.</p>`,
    },
  ],
  "antigravity:opencode": [
    {
      title: "Open synced Antigravity folder in system terminal",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>cd ~/Antigravity/my-project</div>`,
    },
    {
      title: "Run opencode alongside Antigravity",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>opencode</div>`,
    },
    {
      title: "Split visual and code responsibilities",
      body: `<p>Use Antigravity for layout and UI edits; use opencode for logic, APIs, and automation scripts.</p>`,
    },
  ],
  "zed:claudecode": [
    {
      title: "Open Zed terminal from your project",
      body: `<p>Use Zed terminal pane and run Claude Code in project root.</p>
<div class="code-block"><button class="copy-btn" type="button">Copy</button>claude</div>`,
    },
    {
      title: "Use Zed AI for questions and Claude for execution",
      body: `<p>Zed assistant is ideal for quick explanations while Claude Code handles autonomous edits.</p>`,
    },
  ],
  "zed:opencode": [
    {
      title: "Run opencode from Zed terminal",
      body: `<div class="code-block"><button class="copy-btn" type="button">Copy</button>opencode</div>`,
    },
    {
      title: "Pair Zed speed with agent autonomy",
      body: `<p>Use Zed for editing speed and opencode for structured multi-file tasks.</p>`,
    },
  ],
};

function withSection(steps: Step[], sectionId: string, sectionLabel: string): Step[] {
  return steps.map((step) => ({
    ...step,
    sectionId,
    sectionLabel,
  }));
}

function getPairingSteps(ideId: IdeOption["id"], agentId: IdeAgentOption["id"] | typeof WINDSURF_CASCADE_ID): Step[] {
  return (
    PAIRING_STEPS[`${ideId}:${agentId}`] ??
    PAIRING_STEPS[`${ideId}:*`] ?? [
      {
        title: "Open your project in editor and terminal",
        body: "<p>Open your project folder and launch a terminal session in the same root directory.</p>",
      },
      {
        title: "Run your selected agent in project root",
        body: `<p>Start your agent and issue one focused task with explicit acceptance criteria.</p>`,
      },
    ]
  );
}

function getGoalTool(goalPath: (typeof IDE_COMPATIBLE_GOALS)[number]): Tool | null {
  const hinted = IDE_GOAL_TOOL_HINT[goalPath];
  if (hinted && TOOL_LIBRARY[hinted]) {
    return TOOL_LIBRARY[hinted];
  }
  const fallback = (PATH_TOOLS[goalPath] ?? []).find((id) => Boolean(TOOL_LIBRARY[id]));
  return fallback ? TOOL_LIBRARY[fallback] : null;
}

export function getCompatibleAgents(ideId: IdeOption["id"]): IdeAgentOption[] {
  return AI_AGENTS.filter((agent) => agent.compatible.includes(ideId));
}

export function buildIdeGuideTool(
  ideId: IdeOption["id"],
  agentId: IdeAgentOption["id"] | typeof WINDSURF_CASCADE_ID,
  goalPath: (typeof IDE_COMPATIBLE_GOALS)[number],
): Tool {
  const ide = IDES.find((item) => item.id === ideId) ?? IDES[0];
  const goal = GOAL_PATHS.find((item) => item.path === goalPath) ?? GOAL_PATHS[0];
  const agent =
    agentId === WINDSURF_CASCADE_ID
      ? {
          id: WINDSURF_CASCADE_ID,
          name: "Windsurf Cascade",
          icon: "Workflow",
          tagline: "Built-in Windsurf AI assistant",
          badges: ["Built in", "No extra install"],
          bestFor: "Windsurf-native development loops",
          cost: "Included with Windsurf",
          compatible: ["windsurf"],
        }
      : AI_AGENTS.find((item) => item.id === agentId) ?? AI_AGENTS[0];
  const goalTool = getGoalTool(goalPath);

  const steps: Step[] = [
    ...withSection(IDE_SETUP_STEPS[ide.id], "A", `${ide.name} setup`),
    ...withSection(
      AGENT_SETUP_STEPS[agent.id as keyof typeof AGENT_SETUP_STEPS] ?? AGENT_SETUP_STEPS.claudecode,
      "B",
      `${agent.name} setup`,
    ),
    ...withSection(getPairingSteps(ide.id, agent.id as IdeAgentOption["id"] | typeof WINDSURF_CASCADE_ID), "C", `Connect ${agent.name}`),
    ...withSection(
      goalTool?.steps ?? [
        {
          title: `Build your ${goal.title.toLowerCase()}`,
          body: "<p>Follow your preferred stack implementation plan and verify each step before moving forward.</p>",
        },
      ],
      "D",
      `Build ${goal.title.toLowerCase()}`,
    ),
  ];

  return {
    id: `ide-${ide.id}-${agent.id}-${goal.path}`,
    name: `${ide.name} + ${agent.name}`,
    icon: agent.icon,
    tagline: `Build path: ${goal.title} using ${goalTool?.name ?? "your selected stack"}`,
    badges: ["tbadge-best", "tbadge-quality", "tbadge-fast"],
    badgeLabels: ["Guided path", "Step-by-step", "Practical flow"],
    meters: { cost: 80, speed: 86, quality: 90 },
    desc: `<strong>IDE path selected.</strong> This guide combines editor setup, agent setup, pairing workflow, and implementation steps for <strong>${goal.title}</strong>.${goalTool ? ` Section D reuses steps from <strong>${goalTool.name}</strong>.` : ""}`,
    details: {
      Cost: agent.cost,
      Speed: "Fast start once IDE and agent are paired.",
      "Skill needed": "Beginner to intermediate, depending on chosen goal.",
      "Best for": agent.bestFor,
    },
    verdict: {
      type: "good",
      text: "This path is optimized for shipping through one editor + one agent with fewer context switches.",
    },
    steps,
    nextSteps: [
      "Save your setup commands in project docs for reuse",
      "Keep a reusable prompt template for coding tasks",
      "Add tests and deployment checks before production",
      "Revisit security and best practices guides before launch",
    ],
  };
}
