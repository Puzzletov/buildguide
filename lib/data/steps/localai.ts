import type { Step } from "../types";

export function localAISteps(tool: string): Step[] {
  const s: Record<string, Step[]> = {
    ollama: [
      {
        title: "Install Ollama and verify installation",
        body: `<p>Download Ollama from <a href="https://ollama.com" target="_blank" class="ext-link">ollama.com</a> and install for your OS.</p>
<p>Then verify CLI access:</p>
<div class="code-block"><button class="copy-btn">Copy</button>ollama --version</div>`,
      },
      {
        title: "Check machine capacity before model pull",
        body: `<p>Match model size to hardware:</p>
<p>8 GB RAM: small models<br>16 GB RAM: better balanced models<br>32 GB+ RAM or dedicated GPU: larger models</p>
<p>Start with smaller models first, then scale up after baseline tests.</p>`,
      },
      {
        title: "Pull your first model",
        body: `<p>Download a starter model:</p>
<div class="code-block"><button class="copy-btn">Copy</button>ollama pull llama3.2</div>
<p>Alternative starter options: <code>mistral</code>, <code>qwen2.5</code>.</p>`,
      },
      {
        title: "Run model locally and validate output",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>ollama run llama3.2</div>
<p>Run 5 to 10 representative prompts and evaluate response quality, latency, and consistency.</p>`,
      },
      {
        title: "Expose local API for tooling integration",
        body: `<p>Ollama exposes a local endpoint by default. You can connect coding tools to it for lower-cost workflows.</p>
<p>Set this up in <a href="/guide/aitools" class="ext-link">AI coding tools</a> when choosing Cline, OpenClaw, or other provider-flexible agents.</p>`,
      },
      {
        title: "Debug local model issues methodically",
        body: `<p>If responses fail or are too slow, check these in order:</p>
<p>1) model installed<br>2) available RAM/VRAM<br>3) prompt length<br>4) competing background apps</p>
<div class="code-block"><button class="copy-btn">Copy</button>ollama list
ollama ps</div>
<div class="success-box">Ollama setup complete with local runtime validation and troubleshooting flow.</div>`,
      },
    ],

    lmstudio: [
      {
        title: "Install LM Studio",
        body: `<p>Download LM Studio from <a href="https://lmstudio.ai" target="_blank" class="ext-link">lmstudio.ai</a> and install it like a standard desktop app.</p>
<p>No account is required for local model use.</p>`,
      },
      {
        title: "Choose a model aligned to your hardware",
        body: `<p>Inside LM Studio, search model library and start with a compact quantized model (for example Q4 variants).</p>
<p>Smaller quantized models reduce memory pressure and improve local responsiveness.</p>`,
      },
      {
        title: "Load model and test baseline prompt suite",
        body: `<p>Load the model in chat and test consistent prompts for your use case.</p>
<p>Measure: quality, hallucination frequency, and response time.</p>`,
      },
      {
        title: "Enable local inference server",
        body: `<p>Open the developer/server tab and start the local API server.</p>
<p>This exposes an OpenAI-compatible local endpoint for external tools.</p>`,
      },
      {
        title: "Connect coding tools or apps to LM Studio endpoint",
        body: `<p>Use the local endpoint in tools that support custom provider URLs.</p>
<p>For full coding-agent setup, follow <a href="/guide/aitools" class="ext-link">AI coding tools</a> and apply this endpoint as the provider backend.</p>`,
      },
      {
        title: "Troubleshoot model loading and stability",
        body: `<p>If loading fails: reduce model size, close heavy apps, and re-test with one model loaded at a time.</p>
<p>If answers degrade: lower temperature and tighten prompt constraints using <a href="/guide/prompting" class="ext-link">Prompt Engineering</a>.</p>
<div class="success-box">LM Studio setup complete with local API server integration path.</div>`,
      },
    ],
  };

  return s[tool] || [];
}
