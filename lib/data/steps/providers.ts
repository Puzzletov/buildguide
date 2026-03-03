import type { Step } from "../types";

export function providerSteps(
  tool:
    | "chatbot-stack"
    | "chatgpt"
    | "codex"
    | "claude-api"
    | "googleaistudio"
    | "geminiapi"
    | "deepseek"
    | "minimax"
    | "kimi"
    | "openrouter",
): Step[] {
  if (tool === "chatbot-stack") {
    return [
      {
        title: "Understand the chatbot architecture first",
        body: `<p>A production chatbot is usually four parts:</p>
<p>1) <strong>Interface</strong> (web or mobile chat UI)<br>2) <strong>Model provider</strong> (OpenAI, Anthropic, Gemini, DeepSeek, MiniMax, Kimi, etc.)<br>3) <strong>Backend logic</strong> (routing, tool calls, moderation, retries)<br>4) <strong>Memory/data</strong> (for history, users, analytics)</p>
<div class="tip-box">Supabase is usually the memory/backend part, not the whole chatbot by itself.</div>`,
      },
      {
        title: "Set up coding foundations before model APIs",
        body: `<p>Before building chatbot features, complete these guides:</p>
<p>- <a href="/guide/aitools" class="ext-link">VS Code / terminal / dependencies setup</a><br>- <a href="/guide/database" class="ext-link">Database setup</a><br>- <a href="/guide/deployment" class="ext-link">Staging + production setup</a></p>`,
      },
      {
        title: "Pick one model provider for v1",
        body: `<p>Start with one provider to reduce complexity. Add fallbacks later.</p>
<p>Typical choices:</p>
<p>- OpenAI (ChatGPT / Codex)<br>- Anthropic (Claude API)<br>- Google (Gemini API)<br>- DeepSeek<br>- MiniMax<br>- Kimi K2.5</p>
<div class="tip-box">Use OpenRouter only if you need multi-provider routing from day one.</div>`,
      },
      {
        title: "Implement a server-side chat endpoint",
        body: `<p>Create one endpoint in your backend (for example <code>/api/chat</code>) that:</p>
<p>- validates input<br>- calls model provider API<br>- returns normalized response shape<br>- handles timeouts and retries</p>
<div class="code-block"><button class="copy-btn">Copy</button>POST /api/chat
{ "message": "user text", "sessionId": "abc123" }</div>`,
      },
      {
        title: "Add memory and user state",
        body: `<p>Store conversation messages and session metadata in a database (for example Supabase/Postgres).</p>
<p>Minimum tables:</p>
<p>- <code>chat_sessions</code><br>- <code>chat_messages</code><br>- <code>chat_feedback</code></p>
<div class="tip-box">If you use Supabase here, follow the full setup in <a href="/guide/database" class="ext-link">Set up a database</a>.</div>`,
      },
      {
        title: "Add guardrails before launch",
        body: `<p>Ship with these protections enabled:</p>
<p>- output moderation / safety policy<br>- request rate limiting<br>- input validation and size limits<br>- logging with redaction (no secrets)</p>
<p>Also complete: <a href="/guide/security" class="ext-link">Security guide</a>.</p>`,
      },
      {
        title: "Test and deploy in stages",
        body: `<p>Test first in staging with realistic prompts and failure cases (timeouts, provider errors, malformed output).</p>
<p>Then deploy to production with monitoring and rollback ready.</p>
<div class="success-box">You now have a robust chatbot build process rather than a single-tool setup.</div>`,
      },
    ];
  }

  if (tool === "chatgpt") {
    return [
      {
        title: "Use ChatGPT for rapid product planning",
        body: `<p>Start in ChatGPT for requirements, UX copy, and test prompts before coding integrations.</p>
<div class="info-box"><a href="https://chatgpt.com" target="_blank" class="ext-link">chatgpt.com</a></div>`,
      },
      {
        title: "Set a repeatable prompt template",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>Role: Product assistant
Goal: Draft chatbot requirements for customer support
Constraints: Keep answers under 120 tokens, ask clarifying question if context is missing
Output: Markdown with sections: scope, flows, risks, acceptance criteria</div>
<p>For deeper quality, follow <a href="/guide/prompting" class="ext-link">Prompt engineering guide</a>.</p>`,
      },
      {
        title: "Convert prototype prompts into API-ready specs",
        body: `<p>Document:</p>
<p>- system prompt<br>- user message structure<br>- expected response schema<br>- fallback behavior</p>
<p>Save in your repo as <code>docs/prompts.md</code>.</p>`,
      },
      {
        title: "Move from chat UI to API when ready",
        body: `<p>Use ChatGPT for ideation and OpenAI API for production app integration.</p>
<p>When integrating APIs, keep keys server-side only.</p>`,
      },
      {
        title: "Evaluate prompt performance",
        body: `<p>Run 20-50 representative prompts and score:</p>
<p>- factual correctness<br>- policy adherence<br>- latency<br>- user satisfaction</p>`,
      },
      {
        title: "Version your prompts",
        body: `<p>Track prompt revisions in git with changelog notes so behavior changes are auditable.</p>
<div class="success-box">ChatGPT becomes far more useful when prompts are versioned and tested like code.</div>`,
      },
    ];
  }

  if (tool === "codex") {
    return [
      {
        title: "Install Codex CLI",
        body: `<p>Install OpenAI Codex CLI globally:</p>
<div class="code-block"><button class="copy-btn">Copy</button>npm install -g @openai/codex
codex --help</div>
<div class="info-box"><a href="https://openai.com/codex/" target="_blank" class="ext-link">Codex overview</a></div>`,
      },
      {
        title: "Authenticate with OpenAI API key",
        body: `<p>Create an API key in OpenAI dashboard and export it:</p>
<div class="code-block"><button class="copy-btn">Copy</button>export OPENAI_API_KEY="sk-..."</div>
<p>Windows PowerShell:</p>
<div class="code-block"><button class="copy-btn">Copy</button>$env:OPENAI_API_KEY="sk-..."</div>`,
      },
      {
        title: "Run Codex in your repository root",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>cd /path/to/repo
codex</div>
<p>Start in approval/suggest mode first for safer onboarding.</p>`,
      },
      {
        title: "Use bounded prompts",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>Task: add retry logic to src/api/client.ts
Constraints: no new dependencies
Validation: run npm run test:unit and summarize failures</div>`,
      },
      {
        title: "Review every edit in git",
        body: `<p>Keep small commits and inspect diffs before merge.</p>
<div class="code-block"><button class="copy-btn">Copy</button>git status
git diff</div>`,
      },
      {
        title: "Harden for team workflows",
        body: `<p>Add project instructions (<code>AGENTS.md</code>/<code>CLAUDE.md</code>) and required checks before merge.</p>
<div class="success-box">Codex setup complete for production-oriented coding workflows.</div>`,
      },
    ];
  }

  if (tool === "claude-api") {
    return [
      {
        title: "Create Anthropic account and API key",
        body: `<div class="info-box"><a href="https://console.anthropic.com" target="_blank" class="ext-link">console.anthropic.com</a></div>
<p>Create an API key and copy it once into your secure secret manager.</p>`,
      },
      {
        title: "Store key in environment variables",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>export ANTHROPIC_API_KEY="sk-ant-..."</div>
<p>Do not commit keys to git or expose them in frontend code.</p>`,
      },
      {
        title: "Implement first server-side call",
        body: `<p>Build one backend endpoint that calls Claude and returns sanitized output.</p>`,
      },
      {
        title: "Define system prompt + response contract",
        body: `<p>Specify tone, refusal policy, output schema, and length constraints.</p>`,
      },
      {
        title: "Add retry and timeout handling",
        body: `<p>Handle provider errors gracefully and return user-safe fallback messages.</p>`,
      },
      {
        title: "Log usage and monitor cost",
        body: `<p>Track request volume, token usage, and failure reasons by feature.</p>
<div class="success-box">Claude API integration is production-ready when validation, retries, and monitoring are in place.</div>`,
      },
    ];
  }

  if (tool === "googleaistudio") {
    return [
      {
        title: "Open Google AI Studio and create project",
        body: `<div class="info-box"><a href="https://ai.google.dev/aistudio" target="_blank" class="ext-link">ai.google.dev/aistudio</a></div>
<p>Sign in and create/import a Google Cloud project for your Gemini work.</p>`,
      },
      {
        title: "Create Gemini API key",
        body: `<p>From AI Studio API Keys page, create a key and store it securely.</p>
<p>Set environment variable:</p>
<div class="code-block"><button class="copy-btn">Copy</button>export GEMINI_API_KEY="..."</div>`,
      },
      {
        title: "Prototype prompts in AI Studio first",
        body: `<p>Use AI Studio prompt interface to test system prompts and response styles before coding.</p>`,
      },
      {
        title: "Capture exact successful prompt config",
        body: `<p>Save model name, temperature, and output format that worked best.</p>`,
      },
      {
        title: "Move configuration to backend code",
        body: `<p>Port successful prompt config to your server-side endpoint.</p>
<p>For API details, follow the <a href="/guide/chatbot" class="ext-link">chatbot guide path</a> and Gemini API setup card.</p>`,
      },
      {
        title: "Set key safety and rotation policy",
        body: `<p>Restrict usage, rotate keys periodically, and keep client-side apps key-free.</p>
<div class="success-box">Google AI Studio is configured as your Gemini development workspace.</div>`,
      },
    ];
  }

  if (tool === "geminiapi") {
    return [
      {
        title: "Create Gemini API key in AI Studio",
        body: `<p>Create/manage keys from Google AI Studio.</p>
<div class="info-box"><a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" class="ext-link">Gemini API key guide</a></div>`,
      },
      {
        title: "Configure environment variable",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>export GEMINI_API_KEY="..."
# or
export GOOGLE_API_KEY="..."</div>`,
      },
      {
        title: "Send your first API request",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \\
  -H "x-goog-api-key: $GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -X POST \\
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'</div>`,
      },
      {
        title: "Integrate server-side in your app",
        body: `<p>Create one backend endpoint that calls Gemini and returns normalized response JSON.</p>`,
      },
      {
        title: "Add safety and validation",
        body: `<p>Validate inputs, cap prompt size, and sanitize output before rendering to users.</p>`,
      },
      {
        title: "Deploy and monitor",
        body: `<p>Track errors, latency, and token costs per route in staging before production rollout.</p>
<div class="success-box">Gemini API integration complete.</div>`,
      },
    ];
  }

  if (tool === "deepseek") {
    return [
      {
        title: "Create DeepSeek account and API key",
        body: `<div class="info-box"><a href="https://platform.deepseek.com" target="_blank" class="ext-link">platform.deepseek.com</a></div>
<p>Generate your API key and store it securely.</p>`,
      },
      {
        title: "Set API key env variable",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>export DEEPSEEK_API_KEY="..."</div>`,
      },
      {
        title: "Use OpenAI-compatible endpoint",
        body: `<p>DeepSeek supports OpenAI-compatible API format.</p>
<div class="code-block"><button class="copy-btn">Copy</button>base_url="https://api.deepseek.com"
# optional openai-compatible form
base_url="https://api.deepseek.com/v1"</div>`,
      },
      {
        title: "Run first chat completion call",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>curl https://api.deepseek.com/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \\
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello"}]}'</div>`,
      },
      {
        title: "Pick model mode by task",
        body: `<p>Use <code>deepseek-chat</code> for normal responses and <code>deepseek-reasoner</code> when deeper reasoning is needed.</p>`,
      },
      {
        title: "Add fallback and guardrails",
        body: `<p>Handle 429/5xx failures with retries and provider fallback for uptime.</p>
<div class="success-box">DeepSeek is integrated with a production-safe baseline.</div>`,
      },
    ];
  }

  if (tool === "minimax") {
    return [
      {
        title: "Create MiniMax account and API key",
        body: `<div class="info-box"><a href="https://platform.minimax.io/docs/api-reference/api-overview" target="_blank" class="ext-link">MiniMax API overview</a></div>
<p>Create a secret key from MiniMax API Keys section (pay-as-you-go or coding key).</p>`,
      },
      {
        title: "Choose protocol mode",
        body: `<p>MiniMax supports both Anthropic-compatible (recommended in docs) and OpenAI-compatible interfaces.</p>
<div class="code-block"><button class="copy-btn">Copy</button># OpenAI-compatible base
https://api.minimax.io/v1</div>`,
      },
      {
        title: "Set credentials in environment",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>export MINIMAX_API_KEY="..."</div>`,
      },
      {
        title: "Run first text generation call",
        body: `<p>Use one simple chat completion request first, then add tools/structured outputs after baseline works.</p>`,
      },
      {
        title: "Select model tier for your latency/cost target",
        body: `<p>MiniMax docs list model families (M2.5, highspeed, etc.). Choose one and benchmark with your real prompts.</p>`,
      },
      {
        title: "Add reliability and observability",
        body: `<p>Log provider response time, request IDs, and fallback triggers.</p>
<div class="success-box">MiniMax integration complete with protocol and model strategy documented.</div>`,
      },
    ];
  }

  if (tool === "kimi") {
    return [
      {
        title: "Create Moonshot/Kimi API account",
        body: `<p>Create an account and generate an API key in Moonshot platform console.</p>
<div class="info-box"><a href="https://platform.moonshot.ai" target="_blank" class="ext-link">platform.moonshot.ai</a></div>`,
      },
      {
        title: "Confirm endpoint and key pair",
        body: `<p>Use the endpoint and key type from the same platform (Moonshot Open Platform or Kimi Coding). Do not mix keys between providers.</p>`,
      },
      {
        title: "Set key in environment",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>export MOONSHOT_API_KEY="..."</div>`,
      },
      {
        title: "Run first OpenAI-compatible request",
        body: `<p>Use Moonshot Open Platform OpenAI-compatible endpoint:</p>
<div class="code-block"><button class="copy-btn">Copy</button>base_url="https://api.moonshot.ai/v1"</div>
<p>Then send one minimal chat completion call from your backend.</p>`,
      },
      {
        title: "Choose Kimi model for your use case",
        body: `<p>Pick a stable K2.5 model in platform docs first, then benchmark prompt quality and latency on your own tasks.</p>`,
      },
      {
        title: "Document failover and rate limits",
        body: `<p>Store provider limits and fallback order in <code>docs/decisions.md</code>.</p>
<div class="success-box">Kimi setup is complete with endpoint discipline and reproducible config.</div>`,
      },
    ];
  }

  return [
    {
      title: "Create OpenRouter account and API key",
      body: `<div class="info-box"><a href="https://openrouter.ai/docs/quickstart" target="_blank" class="ext-link">OpenRouter quickstart</a></div>
<p>Create a key in OpenRouter dashboard and set a spending limit for safety.</p>`,
    },
    {
      title: "Set API key in your environment",
      body: `<div class="code-block"><button class="copy-btn">Copy</button>export OPENROUTER_API_KEY="..."</div>`,
    },
    {
      title: "Call OpenRouter via OpenAI SDK",
      body: `<div class="code-block"><button class="copy-btn">Copy</button>import OpenAI from "openai";
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});</div>`,
    },
    {
      title: "Pick primary model and fallback model",
      body: `<p>Set one primary model and one fallback model (same prompt contract) for reliability.</p>`,
    },
    {
      title: "Tag requests for observability",
      body: `<p>Optionally set headers like <code>HTTP-Referer</code> and <code>X-OpenRouter-Title</code> for attribution and debugging.</p>`,
    },
    {
      title: "Control costs and monitor quality",
      body: `<p>Track per-model token usage and disable underperforming models quickly.</p>
<div class="success-box">OpenRouter is configured for multi-model routing with cost control.</div>`,
    },
  ];
}
