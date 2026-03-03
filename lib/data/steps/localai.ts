import type { Step } from "../types";

export function localAISteps(tool: string): Step[] {
  const s: Record<string, Step[]> = {
    ollama: [
      { title: 'Download and install Ollama',
        body: `<div class="info-box">🔗 <a href="https://ollama.com" target="_blank" class="ext-link">ollama.com</a> — click the "Download" button and choose your operating system (Mac, Windows, or Linux)</div>
<p>On <strong>Mac</strong>: open the downloaded .zip file, then drag the Ollama app to your Applications folder. Double-click it to open — you'll see a small llama icon appear in your menu bar (the strip of icons at the very top right of your screen).<br>On <strong>Windows</strong>: run the installer file and follow the prompts. Ollama will appear in your system tray (bottom-right corner of the screen, near the clock).</p>` },
      { title: 'Check your computer\'s memory',
        body: `<p>AI models need RAM (memory) to run. Here's what works:</p>
<div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:16px;margin:14px 0;">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;">
    <div><strong>8GB RAM</strong><br><span style="color:var(--text2)">Small, fast models — good for chat</span></div>
    <div><strong>16GB RAM</strong><br><span style="color:var(--text2)">Medium models — better reasoning</span></div>
    <div><strong>32GB+ RAM</strong><br><span style="color:var(--text2)">Large models — best quality</span></div>
    <div><strong>Dedicated GPU</strong><br><span style="color:var(--text2)">Dramatically faster responses</span></div>
  </div>
</div>
<p>To check your RAM: on Mac — Apple menu (�?�) → "About This Mac". On Windows — Settings (⚙�?) → System → About.</p>` },
      { title: 'Open your terminal and download a model',
        body: `<p>Open your terminal. On <strong>Mac</strong>: press <strong>Cmd+Space</strong>, type "Terminal", press Enter. On <strong>Windows</strong>: press the Windows key, type "PowerShell", open it.</p>
<p>Download the recommended starter model by typing this and pressing Enter:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>ollama pull llama3.2</div>
<p>You'll see a progress bar as it downloads (about 2GB). Wait until it finishes and you see the <code>$</code> prompt again.</p>
<div class="tip-box">💡 If you have 16GB+ RAM and want better quality, also try: <code>ollama pull mistral</code> or <code>ollama pull llama3.1:8b</code></div>` },
      { title: 'Start chatting with your local AI',
        body: `<p>Type this command and press Enter:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>ollama run llama3.2</div>
<p>You'll see a <code>&gt;&gt;&gt; Send a message</code> prompt. Type anything and press Enter. Your AI responds — entirely on your computer, with no internet connection needed.</p>
<div class="success-box">✓ Your private local AI is running! Type <code>/bye</code> and press Enter when you want to exit.</div>
<div class="tip-box">💡 To see all models you have installed, type <code>ollama list</code>. To download more models, visit <a href="https://ollama.com/library" target="_blank" class="ext-link">ollama.com/library</a>.</div>` },
      { title: 'Get a nicer visual interface (optional)',
        body: `<p>The terminal works, but many people prefer a visual chat interface. The easiest option is <strong>LM Studio</strong> — it can connect to your Ollama models through a proper app window.</p>
<p>Or try <strong>Open WebUI</strong> if you have Docker installed — it gives you a full web browser interface similar to ChatGPT.</p>
<div class="info-box">🔗 <a href="https://lmstudio.ai" target="_blank" class="ext-link">lmstudio.ai</a> — download the free app for Mac or Windows</div>` },
    ],
    lmstudio: [
      { title: 'Download LM Studio',
        body: `<div class="info-box">🔗 <a href="https://lmstudio.ai" target="_blank" class="ext-link">lmstudio.ai</a> — click the big "Download" button and choose your OS (Mac/Windows/Linux)</div>
<p>Install it like a normal app. On Mac, drag it to Applications. On Windows, run the installer.</p>
<p>LM Studio is free to download and use. No account needed.</p>` },
      { title: 'Check your computer\'s memory',
        body: `<p>AI models need RAM to run. To check yours: on <strong>Mac</strong> — click the Apple logo (�?�) in the top-left corner → "About This Mac" → you'll see "Memory" listed. On <strong>Windows</strong> — press Windows key, go to Settings (⚙�?) → System → About → look for "RAM".</p>
<div class="tip-box">💡 8GB RAM can run small models. 16GB is comfortable. 32GB+ lets you run the best models.</div>` },
      { title: 'Find and download a model',
        body: `<p>Open LM Studio. You'll see a search bar at the top with a �? magnifying glass icon — this lets you search for models directly inside the app.</p>
<p>Search for <strong>"llama"</strong> and look for <strong>"Llama-3.2-3B"</strong> — this is a good starter model. Click the <strong>Download</strong> button next to it.</p>
<p>Wait for the download to finish. The progress bar shows in the bottom-left of the app.</p>
<div class="tip-box">💡 When choosing a model file, look for versions with "Q4_K_M" in the name — this means it's compressed to run efficiently while maintaining good quality.</div>` },
      { title: 'Load the model and start chatting',
        body: `<p>Click the <strong>Chat</strong> tab at the top of LM Studio (it looks like a speech bubble 💬). At the top of the chat panel, you'll see a model selector dropdown — click it and choose the model you just downloaded.</p>
<p>Wait a moment for the model to load (you'll see a loading indicator), then type your message in the text box at the bottom and press Enter.</p>
<div class="success-box">✓ You're chatting with a private AI running entirely on your computer! No data leaves your machine.</div>` },
      { title: 'Enable the local server (optional — for use with other apps)',
        body: `<p>LM Studio can act as a local AI server, allowing other apps (like Cline, or your own code) to use your local AI model.</p>
<p>Click the <strong>Developer</strong> tab — it looks like a small server or terminal icon, usually on the left sidebar. Click <strong>"Start Server"</strong>.</p>
<p>Your local AI is now available at <code>http://localhost:1234</code> — any app that supports OpenAI-compatible APIs can connect to it.</p>
<div class="tip-box">💡 In Cline (VS Code extension), select "LM Studio" as the provider and it will automatically find your running model.</div>` },
    ],
  };
  return s[tool] || [];
}

// �?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?
// PRIORITY LOGIC
// �?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?


