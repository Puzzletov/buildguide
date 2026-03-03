import type { Step } from "../types";

export const AGENT_DEV_STEPS: Step[] = [
  {
    title: "Pick one tiny agent mission",
    body: "<p>Start with one measurable job, not a general assistant.</p><p>Example: <code>Turn a product idea into a one-page spec with acceptance criteria.</code></p>",
  },
  {
    title: "Define clear inputs and output format",
    body: "<p>Agents work best with strict contracts. Decide what the agent receives and exactly what it must return.</p><div class=\"code-block\"><button class=\"copy-btn\" onclick=\"copyCode(this)\">Copy</button>Input: feature request text\nOutput: markdown with sections:\n- summary\n- user stories\n- acceptance criteria\n- risks</div>",
  },
  {
    title: "Write a system prompt with rules",
    body: "<p>Give the agent role, boundaries, and quality bar. Keep it short and explicit.</p><div class=\"code-block\"><button class=\"copy-btn\" onclick=\"copyCode(this)\">Copy</button>You are a product-spec agent.\nAlways return valid markdown.\nDo not invent facts.\nIf context is missing, ask one clarifying question first.</div>",
  },
  {
    title: "Add tools only when needed",
    body: "<p>Do not give every tool upfront. Add one tool at a time (search, file read/write, API call) based on mission needs.</p><p>Each extra tool increases failure surface and complexity.</p>",
  },
  {
    title: "Build a simple loop: plan, act, verify",
    body: "<p>Use a predictable execution loop:</p><div class=\"code-block\"><button class=\"copy-btn\" onclick=\"copyCode(this)\">Copy</button>1) Plan next action\n2) Execute one action\n3) Verify result\n4) Repeat until done or blocked</div>",
  },
  {
    title: "Add safety guardrails",
    body: "<p>Define hard limits before autonomous actions:</p><p>- max steps<br>- allowed file paths<br>- blocked commands<br>- required confirmation for destructive actions</p>",
  },
  {
    title: "Evaluate with a small test set",
    body: "<p>Create 5-10 representative tasks and score outputs for correctness, format compliance, and helpfulness.</p><p>Use the same test set after every prompt/tool change so you can see real improvement.</p>",
  },
  {
    title: "Ship v1 and instrument it",
    body: "<p>Log each run: input summary, actions, tool errors, final output quality. Add fast feedback from users and iterate weekly.</p><p>Good agent development is continuous tuning, not one-time setup.</p>",
  },
];
