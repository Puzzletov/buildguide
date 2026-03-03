import type { Step } from "../types";

export function aiToolSteps(tool: string): Step[] {
  const s: Record<string, Step[]> = {
    cursor: [
      { title: 'Download and install Cursor',
        body: `<p>Cursor is a code editor — think of it like a very smart version of Microsoft Word, but for writing code. Download it for free.</p>
<div class="info-box">🔗 <a href="https://cursor.sh" target="_blank" class="ext-link">cursor.sh</a> — click the big "Download" button in the centre of the page</div>
<p>On <strong>Mac</strong>: open the downloaded .dmg file, drag Cursor to your Applications folder, then double-click it to open.<br>On <strong>Windows</strong>: run the downloaded .exe installer and follow the prompts.</p>` },
      { title: 'Sign up for a free Cursor account',
        body: `<p>When Cursor opens for the first time, a sign-in window will appear automatically. Click <strong>"Sign up"</strong> and create a free account with your email or Google account.</p>
<p>The free plan gives you a meaningful number of AI requests per month — more than enough to get started and learn.</p>
<div class="tip-box">💡 After signing in, Cursor may ask if you want to import settings from VS Code (another editor). You can skip this if you haven't used VS Code before.</div>` },
      { title: 'Open your project folder',
        body: `<p>In Cursor, go to <strong>File → Open Folder</strong> — "File" is in the menu bar at the very top of the screen on Mac, or at the top of the Cursor window on Windows.</p>
<p>Select the folder where your project lives. If you don't have one yet, create an empty folder on your Desktop first, then open that.</p>
<div class="tip-box">💡 Cursor works with folders, not individual files. Always open the top-level folder of your project.</div>` },
      { title: 'Open the AI Composer panel',
        body: `<p>Press <strong>Cmd+I</strong> on Mac (the Cmd key has ⌘ on it) or <strong>Ctrl+I</strong> on Windows. A panel will slide in from the side — this is Cursor Composer, your main AI assistant.</p>
<p>Type what you want to build or change, like:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Create a simple HTML webpage with a navigation bar, a hero section with a headline and button, and a footer. Make it clean and modern.</div>
<p>Press Enter. Cursor will generate the code and show you exactly what it wants to create or change.</p>` },
      { title: 'Review and accept the changes',
        body: `<p>Cursor will show you a diff — a colour-coded view of what it wants to change (green = added, red = removed). Review it to make sure it looks right.</p>
<p>Click <strong>"Accept All"</strong> to apply the changes, or <strong>"Reject All"</strong> if you don't like it and want to try a different approach.</p>
<div class="success-box">✓ You've successfully used AI to write code! You can continue asking Cursor to add features, fix problems, or improve what it's built.</div>
<div class="tip-box">💡 Create a file called <code>.cursorrules</code> in your project folder to give Cursor standing instructions — like "always write simple, readable code" or "explain what you're doing".</div>` },
    ],

    claudecode: [
      { title: 'Check you have Node.js installed',
        body: `<p>Claude Code requires Node.js (a software toolkit) to be installed on your computer. Check by opening your Terminal (on Mac, press <strong>Cmd+Space</strong>, type "Terminal", press Enter — it opens a black or white text window). On Windows, press <strong>Windows key</strong>, search for "Command Prompt" or "PowerShell" and open it.</p>
<p>In the terminal window, type this and press Enter:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>node --version</div>
<p>If you see something like <code>v20.0.0</code> (any number 18 or higher), you're good. If you get an error, download Node.js from <a href="https://nodejs.org" target="_blank" class="ext-link">nodejs.org</a> — click the "LTS" button (LTS = Long Term Support, the stable version).</p>` },
      { title: 'Install Claude Code',
        body: `<p>In your terminal window, paste this command exactly and press Enter:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install -g @anthropic-ai/claude-code</div>
<p>You'll see text scrolling as it downloads and installs. This takes 1–2 minutes. When it stops and you see the prompt again (a <code>$</code> or <code>%</code> symbol), it's done.</p>
<div class="tip-box">⚠�? If you see "permission denied" on Mac, type <code>sudo npm install -g @anthropic-ai/claude-code</code> instead. It will ask for your Mac login password — type it (you won't see the characters, that's normal) and press Enter.</div>` },
      { title: 'Get your API key from Anthropic',
        body: `<p>Claude Code needs an API key — think of it as a personal password that lets your copy of Claude Code talk to Anthropic's AI.</p>
<div class="info-box">🔗 <a href="https://console.anthropic.com" target="_blank" class="ext-link">console.anthropic.com</a> — sign up or sign in, then look for <strong>"API Keys"</strong> in the left sidebar</div>
<p>Click <strong>"Create Key"</strong>, give it a name (like "my laptop"), and copy the key — it starts with <code>sk-ant-api</code>. Save it somewhere safe (like a password manager). You'll only see it once.</p>
<div class="tip-box">💡 You'll need to add a small credit (e.g. $5) to use the API. Go to <strong>Billing</strong> in the console to add a card. Each task typically costs a few cents.</div>` },
      { title: 'Navigate to your project and start Claude Code',
        body: `<p>In your terminal, navigate to your project folder. Type <code>cd</code> (which stands for "change directory"), a space, then drag your project folder from Finder/File Explorer into the terminal window — it'll auto-fill the path. Press Enter.</p>
<p>Or type it manually — for example:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>cd ~/Desktop/my-project</div>
<p>Then start Claude Code:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>claude</div>
<p>On first run, it'll ask for your API key. Paste it in and press Enter.</p>` },
      { title: 'Give it your first task',
        body: `<p>Claude Code shows a prompt — a <code>&gt;</code> symbol — waiting for your instruction. Type what you want it to do, as if talking to a developer:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Create a simple to-do list web app with HTML, CSS, and JavaScript. Include the ability to add items, mark them as done, and delete them.</div>
<p>Claude Code will plan the work, show you which files it'll create, and ask your permission before making any changes. Type <code>y</code> and press Enter to confirm.</p>
<div class="success-box">✓ Claude Code is set up! Run <code>/init</code> in any project to have it read your codebase and create a helpful CLAUDE.md context file.</div>` },
    ],

    copilot: [
      { title: 'Download and install VS Code',
        body: `<p>GitHub Copilot lives inside VS Code, a popular free code editor made by Microsoft.</p>
<div class="info-box">🔗 <a href="https://code.visualstudio.com" target="_blank" class="ext-link">code.visualstudio.com</a> — click the big blue "Download" button</div>
<p>Install it like any other app. When you open VS Code for the first time, you'll see a welcome screen with options — you can skip all of them for now.</p>` },
      { title: 'Subscribe to GitHub Copilot',
        body: `<p>Copilot requires a monthly subscription after a free trial. First, create a free GitHub account if you don't have one.</p>
<div class="info-box">🔗 <a href="https://github.com/features/copilot" target="_blank" class="ext-link">github.com/features/copilot</a> — click "Start a free trial"</div>
<div class="tip-box">💡 If you're a student, go to <a href="https://education.github.com" target="_blank" class="ext-link">education.github.com</a> — Copilot is free for verified students.</div>` },
      { title: 'Install the GitHub Copilot extension',
        body: `<p>In VS Code, find the <strong>Extensions</strong> icon in the left sidebar. It looks like four small squares arranged in a 2×2 grid, with the top-right square slightly offset — like a puzzle piece being placed. It's the fifth icon from the top on the left edge.</p>
<p>Click it, then in the search box that appears, type <strong>"GitHub Copilot"</strong>. The first result should be "GitHub Copilot" by GitHub. Click the blue <strong>"Install"</strong> button.</p>
<p>Also search for and install <strong>"GitHub Copilot Chat"</strong> — this adds a chat panel for asking questions.</p>` },
      { title: 'Sign in to GitHub in VS Code',
        body: `<p>After installing, you'll see a notification in the bottom-right corner of VS Code asking you to sign in. Click <strong>"Sign in to GitHub"</strong>.</p>
<p>A browser window will open automatically. Log in to your GitHub account and click <strong>"Authorize"</strong>. Switch back to VS Code — you'll see a small Copilot icon (it looks like the GitHub cat/octocat logo) appear in the bottom status bar, confirming it's working.</p>` },
      { title: 'Try Copilot out',
        body: `<p>Open or create any code file. Start typing — Copilot will suggest completions in <em>grey/italic text</em>. Press <strong>Tab</strong> to accept the suggestion.</p>
<p>To chat with Copilot, click the chat bubble icon in the left sidebar (it looks like a speech bubble 💬 — it'll be in the sidebar after installing Copilot Chat). Ask it anything:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Explain what this code does</div>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Add a dark mode toggle to this page</div>
<div class="success-box">✓ Copilot is ready to help. It works in the background as you type.</div>` },
    ],

    cline: [
      { title: 'Install VS Code if you don\'t have it',
        body: `<p>Cline lives inside VS Code (a free code editor from Microsoft).</p>
<div class="info-box">🔗 <a href="https://code.visualstudio.com" target="_blank" class="ext-link">code.visualstudio.com</a> — click the blue Download button</div>
<p>Install and open it. You'll see a welcome screen — you can close it by pressing the X on the "Welcome" tab.</p>` },
      { title: 'Install the Cline extension',
        body: `<p>In VS Code, click the <strong>Extensions</strong> icon in the left sidebar. It's the fifth icon down — it looks like four squares in a 2×2 grid, with the top-right square pulled slightly away, like a puzzle piece. The keyboard shortcut is <strong>Cmd+Shift+X</strong> (Mac) or <strong>Ctrl+Shift+X</strong> (Windows).</p>
<p>In the search box, type <strong>"Cline"</strong>. Install the extension by <strong>saoudrizwan</strong>. After installing, a new icon will appear in the left sidebar — it looks like a small robot or the Cline logo.</p>` },
      { title: 'Connect Cline to an AI model',
        body: `<p>Click the Cline icon in the left sidebar to open the Cline panel. Click the <strong>gear icon ⚙�?</strong> in the top-right corner of the Cline panel to open settings.</p>
<p><strong>Option A — Use Claude (best quality, pay per use):</strong> Select "Anthropic" from the provider dropdown. Paste your API key from <a href="https://console.anthropic.com" target="_blank" class="ext-link">console.anthropic.com</a>.</p>
<p><strong>Option B — Use a free local model (no cost, needs Ollama installed):</strong> Select "Ollama" from the provider dropdown, then choose a model you've already downloaded via Ollama.</p>` },
      { title: 'Open a project and give Cline a task',
        body: `<p>In VS Code, go to <strong>File → Open Folder</strong> and open your project folder. Then click the Cline robot icon in the sidebar to open the chat panel.</p>
<p>Type your request:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Create an HTML file called index.html with a simple landing page for a coffee shop. Include a header, a menu section, and a contact section.</div>
<p>Cline will show you exactly what it wants to do before making any changes. Click <strong>"Approve"</strong> to let it proceed.</p>
<div class="tip-box">💡 Cline never does anything without your explicit approval. You can always click "Reject" on any step.</div>` },
    ],

    opencode: [
      { title: 'Install opencode via the terminal',
        body: `<p>opencode runs in your terminal (a text-based control window). To open the terminal on <strong>Mac</strong>: press Cmd+Space, type "Terminal", press Enter. On <strong>Windows</strong>: press Windows key, type "PowerShell", open it.</p>
<p>Install opencode by pasting this command and pressing Enter:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install -g opencode-ai</div>
<div class="tip-box">💡 If you don't have Node.js installed, download it first from <a href="https://nodejs.org" target="_blank" class="ext-link">nodejs.org</a> (click "LTS"). Then come back and run the install command above.</div>` },
      { title: 'Set up your AI model API key',
        body: `<p>opencode needs access to an AI model. The easiest option is Anthropic's Claude.</p>
<p>Get your key from <a href="https://console.anthropic.com" target="_blank" class="ext-link">console.anthropic.com</a> — sign up, go to API Keys, click "Create Key".</p>
<p>Then set it in your terminal. On <strong>Mac/Linux</strong>:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>export ANTHROPIC_API_KEY="your-key-here"</div>
<p>On <strong>Windows PowerShell</strong>:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>$env:ANTHROPIC_API_KEY="your-key-here"</div>
<div class="tip-box">💡 To make this permanent (so you don't need to set it every session), add the export line to your shell profile file (~/.zshrc on modern Macs, ~/.bashrc on Linux).</div>` },
      { title: 'Navigate to your project and start opencode',
        body: `<p>In your terminal, navigate to your project folder. Type <code>cd</code> followed by the path to your folder. If your project is on your Desktop in a folder called "mysite":</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>cd ~/Desktop/mysite</div>
<p>Then start opencode:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>opencode</div>
<p>A TUI (Terminal User Interface) will open — it's a visual panel that appears inside your terminal window, making it much friendlier than a plain command line.</p>` },
      { title: 'Give it a task',
        body: `<p>In the opencode interface, type your request and press Enter:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Create a simple REST API with Node.js and Express that has endpoints for getting and adding items to a list.</div>
<p>opencode will plan the work, show you what it intends to do, and proceed. Type <code>/help</code> at any time to see available commands.</p>
<div class="success-box">✓ opencode is running! It supports many models — switch between them in the config or with the /model command.</div>` },
    ],

    aider: [
      { title: 'Install Aider via the terminal',
        body: `<p>Aider requires Python to be installed. Check by opening your terminal and typing:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>python3 --version</div>
<p>If you see a version number, you have Python. If not, download it from <a href="https://python.org" target="_blank" class="ext-link">python.org</a> (click Downloads, choose the latest version).</p>
<p>Then install Aider:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>pip install aider-chat</div>` },
      { title: 'Set your API key',
        body: `<p>Aider needs an AI model. Get a key from <a href="https://console.anthropic.com" target="_blank" class="ext-link">console.anthropic.com</a> (for Claude) or <a href="https://platform.openai.com" target="_blank" class="ext-link">platform.openai.com</a> (for GPT-4).</p>
<p>Set it in your terminal. On Mac/Linux (for Claude):</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>export ANTHROPIC_API_KEY="sk-ant-..."</div>` },
      { title: 'Navigate to your project and start Aider',
        body: `<p>In your terminal, go to your project folder:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>cd ~/Desktop/my-project</div>
<p>Start Aider with Claude:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>aider --model claude-sonnet-4-5</div>
<p>Aider will start up and show you which files it can see in your project.</p>` },
      { title: 'Make your first code change',
        body: `<p>At the Aider prompt, type what you want changed:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Add a responsive navigation bar to index.html with links to: Home, About, Contact, and Blog</div>
<p>Aider will make the change and <strong>automatically create a Git commit</strong> — a saved snapshot — so the change is always reversible.</p>
<div class="tip-box">💡 If you don't like a change, type <code>/undo</code> to reverse it instantly. This is what makes Aider particularly safe.</div>
<div class="success-box">✓ Aider is set up! Every change it makes is saved in Git, so you always have a safety net.</div>` },
    ],

    openclaw: [
      { title: "Check prerequisites (Node + npm)",
        body: `<p>OpenClaw runs on Node.js. In your terminal, verify both Node and npm are available:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>node --version
npm --version</div>
<p>Use Node 18+ (Node 20 LTS recommended). If you do not have Node, install the LTS version from <a href="https://nodejs.org" target="_blank" class="ext-link">nodejs.org</a>.</p>` },
      { title: "Install OpenClaw globally",
        body: `<p>Install OpenClaw with npm:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install -g openclaw</div>
<p>Confirm the CLI was installed:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>openclaw --version</div>
<div class="tip-box">If you hit permission errors on macOS/Linux, avoid <code>sudo</code> first: configure npm to use a user directory or install via nvm.</div>` },
      { title: "Set your model provider key",
        body: `<p>OpenClaw needs a model provider key. Anthropic example:</p>
<div class="info-box"><a href="https://console.anthropic.com" target="_blank" class="ext-link">console.anthropic.com</a> -> API Keys -> Create Key</div>
<p>Set it for the current terminal session:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>export ANTHROPIC_API_KEY="sk-ant-..."</div>
<p>Windows PowerShell:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>$env:ANTHROPIC_API_KEY="sk-ant-..."</div>
<div class="tip-box">Never commit keys to git. Keep them in environment variables only.</div>` },
      { title: "Persist your API key (survives terminal restarts)",
        body: `<p>macOS/Linux (zsh): add this line to <code>~/.zshrc</code> then restart terminal:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc</div>
<p>Windows PowerShell (persistent user environment variable):</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY","sk-ant-...","User")</div>` },
      { title: "Run your first task in a project folder",
        body: `<p>Move into your project directory, then run a clear single-task prompt:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>cd ~/Desktop/myproject
openclaw -p "Create a reusable button component and replace duplicated button markup in the app."</div>
<p>OpenClaw will analyze files, propose changes, and apply them.</p>` },
      { title: "Use dry-run mode before real edits",
        body: `<p>For safer workflows, preview what OpenClaw would change:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>openclaw --dry-run -p "Refactor hardcoded colors into CSS variables."</div>
<p>When the plan looks correct, rerun without <code>--dry-run</code>.</p>` },
      { title: "Troubleshooting checklist",
        body: `<p>If setup fails, check these in order:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>which openclaw
openclaw --version
echo $ANTHROPIC_API_KEY
node --version</div>
<p>On Windows PowerShell, replace the third command with:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>$env:ANTHROPIC_API_KEY</div>
<div class="success-box">OpenClaw setup complete. Use <code>--dry-run</code> by default and move to live edits once output is predictable.</div>` },
    ],
  };
  return s[tool] || [];
}


