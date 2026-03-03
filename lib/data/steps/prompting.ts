import type { Step } from "../types";

export const PROMPT_ENGINEERING_STEPS: Step[] = [
  {
    title: "Use a 5-part prompt structure",
    body: `<p>For reliable outputs, use this structure every time: <strong>Role</strong>, <strong>Goal</strong>, <strong>Context</strong>, <strong>Constraints</strong>, and <strong>Output format</strong>.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Role: You are a senior [domain] assistant.
Goal: Help me [specific outcome].
Context: [project details, audience, tech stack].
Constraints: [time, budget, tools, style].
Output format: [bullets/table/checklist/code].</div>`,
  },
  {
    title: "Write specific goals, not vague requests",
    body: `<p>Vague: <code>"Improve this"</code>. Better: <code>"Reduce onboarding drop-off in step 2 by improving clarity and reducing form fields"</code>.</p>
<p>Include measurable intent when possible (time, quality, conversion, cost, latency).</p>`,
  },
  {
    title: "Provide concrete context",
    body: `<p>Include the exact inputs the model needs: current code, existing copy, target users, success criteria, and known constraints.</p>
<div class="tip-box">Without context, the model guesses. With context, it reasons.</div>`,
  },
  {
    title: "Constrain the output",
    body: `<p>Tell the model exactly how to respond: number of options, tone, format, length, and what to avoid.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Give me 3 options.
Each option must include:
- why it works
- tradeoffs
- implementation steps
Keep each option under 120 words.</div>`,
  },
  {
    title: "Use examples (few-shot)",
    body: `<p>If you want a specific style, include one good example and one bad example. Models imitate patterns quickly.</p>
<p>This is especially useful for email tone, UI copy, commit messages, and technical documentation.</p>`,
  },
  {
    title: "Prompt for debugging",
    body: `<p>When debugging, force a method: reproduce, isolate, inspect logs, form hypothesis, test fix, verify.</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>You are a debugging assistant.
Context: [error + logs + environment]
Task:
1) list likely root causes (ordered)
2) propose the fastest safe checks
3) provide minimal fix diff
4) provide verification checklist</div>`,
  },
  {
    title: "Iterate in short loops",
    body: `<p>Do not ask for a perfect answer in one shot. Use quick loops: prompt -> review -> tighten constraints -> prompt again.</p>
<p>Ask the model to self-critique before final output: "List weaknesses in your answer, then improve it."</p>`,
  },
  {
    title: "Use reusable prompt templates",
    body: `<p>Create a small library of proven prompts for your recurring tasks (feature planning, API design, copywriting, testing, debugging).</p>
<p>Store them in your repo under <code>docs/prompts.md</code> so the team can reuse consistent prompt quality.</p>`,
  },
];
