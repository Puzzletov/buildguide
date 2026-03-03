import type { Tool } from "./types";
import { aiToolSteps } from "./steps/aitools";
import { localAISteps } from "./steps/localai";
import { supabaseSteps } from "./steps/supabase";
import { websiteSteps } from "./steps/website";

export const LEGACY_TOOL_LIBRARY: Record<string, Tool> = {

  // ── WEBSITE TOOLS ─────────────────────────────────────────

  framer: {
    id:'framer', name:'Framer', icon:'🎨', tagline:'Visual website builder with built-in AI',
    badges:['tbadge-nocode','tbadge-free','tbadge-fast'],
    badgeLabels:['No code needed','Free plan','Very fast'],
    meters:{ cost:90, speed:95, quality:80 },
    desc:`<strong>Framer</strong> lets you design and publish a website without writing any code. It has an AI assistant that can build a first draft from a one-sentence description — you just describe your site, and it generates a full design. You then click on any part to change text, colours, and images.<br><br>The free plan is generous: you get a live website at a <em>yourname.framer.website</em> address. You can add a custom domain (like <em>yourname.com</em>) later for around $10/month.`,
    details:{ Cost:'Free plan available. Custom domain from ~$10/month.', Speed:'You can have a live site in under an hour.', 'Skill needed':'None — drag, click, and type.', 'Best for':'Portfolios, landing pages, small business sites.' },
    verdict:{ type:'good', text:"Excellent first choice if you've never built a website before. The AI first-draft feature saves hours of blank-page paralysis." },
    steps: websiteSteps('framer'),
    nextSteps:['Share the link with friends and ask for feedback','Replace all placeholder text with your real content','Add your own photos — real images make a huge difference','Consider connecting a custom domain when you\'re ready'],
  },

  squarespace: {
    id:'squarespace', name:'Squarespace', icon:'◻�?', tagline:'Polished templates, everything included',
    badges:['tbadge-paid','tbadge-fast','tbadge-quality'],
    badgeLabels:['Paid (~$16/mo)','Fast to launch','Very polished'],
    meters:{ cost:40, speed:85, quality:90 },
    desc:`<strong>Squarespace</strong> is an all-in-one website builder known for beautiful, professionally designed templates. It includes hosting, a custom domain, e-commerce, email marketing, and analytics in one place. Everything is polished out of the box — you won't end up with an ugly site if you follow the template.<br><br>It's a monthly subscription with no free tier, but many people find it worth it because everything just works together.`,
    details:{ Cost:'From $16/month (billed annually). No free plan.', Speed:'A few hours to a polished site.', 'Skill needed':'None — template-based.', 'Best for':'Small businesses, restaurants, photographers, e-commerce.' },
    verdict:{ type:'good', text:"Worth paying for if you want a very polished result without thinking about design. Especially good if you plan to sell products online." },
    steps: websiteSteps('squarespace'),
    nextSteps:['Set up your domain name (included in most plans)','Write your About page — visitors read this first','Add your products or services with photos and prices','Connect Google Analytics to track visitors'],
  },

  webflow: {
    id:'webflow', name:'Webflow', icon:'🌊', tagline:'Designer-level control without writing CSS',
    badges:['tbadge-paid','tbadge-quality','tbadge-best'],
    badgeLabels:['Free tier limited','High quality','Most flexible'],
    meters:{ cost:55, speed:40, quality:98 },
    desc:`<strong>Webflow</strong> gives you the power of hand-coded websites through a visual interface. Unlike simpler builders, you're controlling the actual HTML and CSS visually — which means you can build almost anything a developer could, without writing code.<br><br>The trade-off is a steeper learning curve. It's not for total beginners, but if you've used design tools like Figma or Sketch before, you'll find it familiar.`,
    details:{ Cost:'Free plan available (watermarked). From $14/month for a real site.', Speed:'Days to weeks — there\'s a learning curve.', 'Skill needed':'Helps to understand design basics.', 'Best for':'Designers who want full visual control; marketing teams.' },
    verdict:{ type:'warn', text:"Only choose Webflow if you're willing to spend time learning it. It rewards patience with exceptional results, but it's not a quick option." },
    steps: websiteSteps('webflow'),
    nextSteps:['Complete the Webflow University free courses first','Start with one of their templates rather than from scratch','Join the Webflow community forum — very helpful','Consider hiring a Webflow expert for complex projects'],
  },

  githubpages: {
    id:'githubpages', name:'GitHub Pages', icon:'�?�', tagline:'Free hosting for simple websites from code',
    badges:['tbadge-free','tbadge-quality'],
    badgeLabels:['Completely free','Custom domain free'],
    meters:{ cost:100, speed:45, quality:75 },
    desc:`<strong>GitHub Pages</strong> hosts your website for free, directly from code files you store on GitHub (a code storage platform). There's no visual editor — you write HTML, CSS, and optionally JavaScript files, then GitHub serves them as a live website.<br><br>It's genuinely free — no hidden costs, no ads. Your site will be at <em>yourusername.github.io</em> and you can connect a custom domain at no extra charge. Many developers use this for portfolios and documentation.`,
    details:{ Cost:'Completely free, including custom domains.', Speed:'A day or two to set up if you\'re new to this.', 'Skill needed':'Basic HTML/CSS, or use AI to write it for you.', 'Best for':'Developers, portfolios, documentation, simple landing pages.' },
    verdict:{ type:'warn', text:"Great if you're comfortable with basic code or willing to use AI to generate the HTML for you. Not ideal as a first step for complete beginners." },
    steps: websiteSteps('githubpages'),
    nextSteps:['Learn basic Git commands (just 5 commands covers 90% of use cases)','Use a static site generator like Astro or Hugo for more complex sites','Set up a custom domain in the repository settings','Add GitHub Actions to auto-publish when you make changes'],
  },

  netlify: {
    id:'netlify', name:'Netlify', icon:'🔷', tagline:'Deploy any website in seconds, free',
    badges:['tbadge-free','tbadge-fast'],
    badgeLabels:['Generous free plan','Extremely fast deploy'],
    meters:{ cost:95, speed:90, quality:82 },
    desc:`<strong>Netlify</strong> is a hosting platform that makes deploying a website as simple as dragging a folder. You drop your website files (HTML, CSS, images) onto Netlify's website and it instantly creates a live URL. No server setup, no configuration, nothing to install.<br><br>If you use v0 or another AI tool to generate your website code, Netlify is the easiest way to put it live. It's free for most personal projects and small sites.`,
    details:{ Cost:'Free plan covers most personal sites. Paid plans from $19/month.', Speed:'Your site is live in under 5 minutes once you have the files.', 'Skill needed':'Very little — drag and drop your files.', 'Best for':'Deploying AI-generated sites, static sites, developer projects.' },
    verdict:{ type:'good', text:"Excellent pairing with v0 or GitHub Copilot — build your site with AI, deploy it to Netlify in minutes for free." },
    steps: websiteSteps('netlify'),
    nextSteps:['Connect your GitHub repository for automatic re-deploys','Set up a custom domain in the domain settings','Enable form handling if your site has a contact form','Add environment variables for any API keys you need'],
  },

  v0: {
    id:'v0', name:'v0 by Vercel', icon:'✦', tagline:'AI generates your website or app from a description',
    badges:['tbadge-free','tbadge-fast','tbadge-quality'],
    badgeLabels:['Free tier available','AI-powered','Modern quality'],
    meters:{ cost:80, speed:85, quality:88 },
    desc:`<strong>v0</strong> (made by Vercel) is an AI tool that generates modern-looking website and app code from a plain English description. You describe what you want — "a landing page for a dog walking service with a booking form" — and it produces ready-to-use code in seconds.<br><br>Unlike Framer which is a visual editor, v0 gives you actual code. This means you can customise it deeply if you know how, or just copy it straight to Netlify to go live. The generated code uses React and Tailwind CSS — modern, professional tech.`,
    details:{ Cost:'Free tier available (limited prompts). From $10/month for more.', Speed:'A few minutes to generate, a few more to deploy.', 'Skill needed':'None to generate, some to customise the code.', 'Best for':'People who want AI-generated modern designs they can take further.' },
    verdict:{ type:'good', text:"An excellent modern option. Generate with v0, customise with Claude Code or Cursor, deploy to Netlify. A powerful free pipeline." },
    steps: websiteSteps('v0'),
    nextSteps:['Copy your generated code to a GitHub repository','Deploy to Netlify or Vercel for free hosting','Use Claude Code or Cursor to make customisations','Iterate — re-prompt v0 whenever you want to change the design'],
  },

  wordpress: {
    id:'wordpress', name:'WordPress.com', icon:'🔵', tagline:'The world\'s most popular website platform',
    badges:['tbadge-free','tbadge-quality'],
    badgeLabels:['Free plan available','Huge ecosystem'],
    meters:{ cost:75, speed:60, quality:82 },
    desc:`<strong>WordPress</strong> powers about 43% of all websites on the internet. It has thousands of free templates and plugins that add features like contact forms, galleries, e-commerce, and more. It's particularly well-suited for blogs and content-heavy sites.<br><br>WordPress.com (not to be confused with WordPress.org) is the hosted version — you don't need to manage servers. The free plan is functional but has limitations; paid plans unlock custom domains and remove their branding.`,
    details:{ Cost:'Free plan available. From ~$4/month for a custom domain.', Speed:'A couple of hours to a basic site.', 'Skill needed':'None for templates. Some for customisation.', 'Best for':'Blogs, news sites, content-heavy websites, anyone who wants a huge plugin ecosystem.' },
    verdict:{ type:'good', text:"Solid choice especially if you plan to publish content regularly. The blog tools are unmatched. Avoid if you want a very design-forward site — consider Framer or Webflow instead." },
    steps: websiteSteps('wordpress'),
    nextSteps:['Install a free theme that fits your style','Add an SEO plugin (Yoast SEO is free and excellent)','Write your first 3 pages: Home, About, Contact','Set up Google Search Console so Google knows your site exists'],
  },

  // ── AI CODING TOOLS ────────────────────────────────────────

  cursor: {
    id:'cursor', name:'Cursor', icon:'✦', tagline:'Code editor with AI built in — best for beginners',
    badges:['tbadge-fast','tbadge-best'],
    badgeLabels:['Fast to get started','Recommended for new coders'],
    meters:{ cost:55, speed:85, quality:88 },
    desc:`<strong>Cursor</strong> is a code editor (like Microsoft Word, but for code) with AI assistance built directly into it. Instead of switching between your editor and an AI chat window, Cursor lets you ask AI questions, get code suggestions, and have AI make changes — all inside the same application.<br><br>It looks like a familiar code editor but with AI superpowers. You press a keyboard shortcut, describe what you want, and the AI writes the code and shows you what it wants to change before applying anything.`,
    details:{ Cost:'Free plan available. Pro plan ~$20/month for heavy use.', Speed:'Installed and working within 20 minutes.', 'Skill needed':'Some basic comfort with code helps, but not required.', 'Best for':'People new to coding who want AI to guide them; anyone starting a new project.' },
    verdict:{ type:'good', text:'Most recommended starting point for people new to AI-assisted coding. The experience is seamless and the free tier is genuinely useful.' },
    steps: aiToolSteps('cursor'),
    nextSteps:['Try building something small — even a simple HTML page','Create a .cursorrules file to give Cursor context about your project','Join the Cursor Discord community for tips and templates','Upgrade to Pro if you hit the free tier limits regularly'],
  },

  claudecode: {
    id:'claudecode', name:'Claude Code', icon:'🧠', tagline:'Anthropic\'s AI coding agent — runs in your terminal',
    badges:['tbadge-paid','tbadge-quality','tbadge-best'],
    badgeLabels:['Pay per use','Very high quality','Best for complex tasks'],
    meters:{ cost:40, speed:80, quality:95 },
    desc:`<strong>Claude Code</strong> is an AI coding assistant made by Anthropic (the makers of Claude). Unlike Cursor, it doesn't replace your code editor — instead it runs in your terminal (a text-based control window) and can read your entire codebase, make changes across multiple files, run commands, and fix its own mistakes.<br><br>It's particularly powerful for complex tasks: refactoring large codebases, debugging tricky problems, implementing entire features from a single description. You pay based on usage, not a fixed monthly fee.`,
    details:{ Cost:'Pay per use — roughly $0.01–$0.10 per task depending on complexity.', Speed:'Installed in 10 minutes. Tasks run quickly.', 'Skill needed':'Comfortable with terminal/command line basics.', 'Best for':'Developers; complex multi-file tasks; existing codebases.' },
    verdict:{ type:'good', text:'Exceptional quality and autonomy. Best for developers or people willing to learn terminal basics. More powerful than most alternatives for serious work.' },
    steps: aiToolSteps('claudecode'),
    nextSteps:['Run /init in your project to create a CLAUDE.md context file','Try a complex task: "refactor this file to use TypeScript"','Set a monthly spend limit in your Anthropic account settings','Use /cost to track how much each session uses'],
  },

  copilot: {
    id:'copilot', name:'GitHub Copilot', icon:'�?�', tagline:'AI autocomplete and chat inside VS Code',
    badges:['tbadge-paid','tbadge-fast'],
    badgeLabels:['~$10/month','Works in VS Code'],
    meters:{ cost:50, speed:88, quality:82 },
    desc:`<strong>GitHub Copilot</strong> integrates into VS Code (a popular free code editor) and provides AI assistance as you type. It suggests whole lines or blocks of code automatically — like a very smart autocomplete. It also has a chat panel where you can ask questions, get explanations, and request code changes.<br><br>Copilot is made by GitHub (owned by Microsoft) and is one of the most widely used AI coding tools among professional developers. It requires a monthly subscription after a free trial.`,
    details:{ Cost:'~$10/month after free trial. Free for students and open-source contributors.', Speed:'Installed and working in under 30 minutes.', 'Skill needed':'Helpful to understand basic coding — suggestions make more sense then.', 'Best for':'Developers who already use VS Code; teams; daily coding use.' },
    verdict:{ type:'good', text:'Industry standard. If your team uses VS Code and GitHub already, this is the natural fit. Students can get it free.' },
    steps: aiToolSteps('copilot'),
    nextSteps:['Set up copilot-instructions.md in your project for better suggestions','Try Copilot Chat for explaining code you don\'t understand','Use @workspace in chat to ask questions about your whole project','Explore Copilot Edits for multi-file changes'],
  },

  cline: {
    id:'cline', name:'Cline', icon:'🔌', tagline:'Free VS Code extension — bring your own AI model',
    badges:['tbadge-free','tbadge-best'],
    badgeLabels:['Extension is free','Works with any AI'],
    meters:{ cost:80, speed:78, quality:86 },
    desc:`<strong>Cline</strong> (sometimes called Claude-dev) is a free VS Code extension that acts as an AI coding agent. The extension itself costs nothing — you connect it to whatever AI you want: Claude, GPT-4, or even a free local AI running on your computer.<br><br>Cline can read your entire project, create files, run commands, and make changes — but it always asks your permission before doing anything. This makes it feel safe even if you're new to AI coding tools.`,
    details:{ Cost:'Extension free. AI model cost varies — can be $0 with local Ollama.', Speed:'Installed in 15 minutes.', 'Skill needed':'None beyond installing VS Code.', 'Best for':'People who want control over which AI they use; budget-conscious users.' },
    verdict:{ type:'good', text:"Great flexibility — you choose and control the AI behind it. Pair it with Ollama for a completely free AI coding setup." },
    steps: aiToolSteps('cline'),
    nextSteps:['Create a .clinerules file to give Cline instructions about your project','Try connecting it to a local Ollama model for free, unlimited use','Explore the MCP (Model Context Protocol) servers for extra capabilities','Join the Cline Discord for tips and community prompts'],
  },

  opencode: {
    id:'opencode', name:'opencode', icon:'📟', tagline:'Terminal-based AI coding agent — open source and free',
    badges:['tbadge-free','tbadge-quality'],
    badgeLabels:['Open source','Supports many models'],
    meters:{ cost:85, speed:75, quality:85 },
    desc:`<strong>opencode</strong> is an open-source AI coding assistant that runs in your terminal. Like Claude Code, it works from the command line — but it's free and open-source, meaning anyone can read the code and contribute to it. It supports many AI model providers: Anthropic, OpenAI, Google, or local models via Ollama.<br><br>It has a clean terminal interface (called a TUI — Terminal User Interface) that makes it friendlier than a plain command line. Think of it like a mini control panel that appears inside your terminal.`,
    details:{ Cost:'Free and open source. Pay for whichever AI model you connect.', Speed:'Installed in about 20 minutes.', 'Skill needed':'Comfortable with terminal/command line.', 'Best for':'Developers who prefer open-source tools; those who want model flexibility.' },
    verdict:{ type:'good', text:"Excellent open-source alternative to Claude Code. Great for people who want transparency in their tools and flexibility over which AI model they use." },
    steps: aiToolSteps('opencode'),
    nextSteps:['Set your preferred model in the config file (~/.config/opencode/config.json)','Try connecting it to a local Ollama model for free coding assistance','Star the repository on GitHub to follow updates','Explore the opencode documentation for advanced features'],
  },

  aider: {
    id:'aider', name:'Aider', icon:'�?', tagline:'Terminal AI that works naturally with Git',
    badges:['tbadge-free','tbadge-quality'],
    badgeLabels:['Free & open source','Git-native'],
    meters:{ cost:85, speed:78, quality:87 },
    desc:`<strong>Aider</strong> is an AI coding assistant that lives in your terminal and understands Git (the most common code version control system). When Aider makes changes to your code, it automatically creates a clear Git commit — so every change is tracked and reversible. If the AI makes a mistake, you can undo it with one command.<br><br>This makes Aider particularly safe to use: you're always in control, and nothing is permanently lost. It supports Claude, GPT-4, and other models.`,
    details:{ Cost:'Free and open source. You pay for whichever AI model you connect.', Speed:'Installed in 15 minutes via pip.', 'Skill needed':'Comfortable with terminal; basic Git knowledge helps.', 'Best for':'Developers who use Git; anyone who wants an undo button on AI changes.' },
    verdict:{ type:'good', text:"The safest AI coding tool thanks to automatic Git commits. Every AI change is reversible. Highly recommended for anyone nervous about AI making mistakes." },
    steps: aiToolSteps('aider'),
    nextSteps:['Set ANTHROPIC_API_KEY or OPENAI_API_KEY in your shell profile','Try aider --model claude-sonnet-4-5 for Claude\'s best model','Use /undo if Aider makes a change you don\'t like','Explore --architect mode for complex multi-step tasks'],
  },

  openclaw: {
    id:'openclaw', name:'OpenClaw', icon:'🦞', tagline:'Lightweight agentic coding CLI — fast and scriptable',
    badges:['tbadge-free','tbadge-fast'],
    badgeLabels:['Free & open source','Terminal-native'],
    meters:{ cost:90, speed:85, quality:83 },
    desc:`<strong>OpenClaw</strong> is a lightweight command-line AI coding agent designed for speed and composability. Where tools like Claude Code and opencode have full TUI interfaces, OpenClaw stays minimal — it's designed to be piped into scripts, run in CI, or used from the terminal by developers who prefer lean tools.<br><br>It connects to any OpenAI-compatible API endpoint, which means you can use it with Claude, GPT-4, Gemini, or a local Ollama model. Because it's so small and fast, it's particularly useful for quick one-off tasks and automation pipelines.`,
    details:{ Cost:'Free and open source. Pay only for your chosen AI model.', Speed:'Installed in 5 minutes. Runs tasks immediately.', 'Skill needed':'Comfortable with the terminal. Basic shell scripting helps.', 'Best for':'Developers who want a fast, scriptable AI coding tool; CI/CD automation; power users.' },
    verdict:{ type:'good', text:"Best for developers who live in the terminal and want something lean. If you prefer richer interfaces, choose Cursor, Claude Code, or opencode instead." },
    steps: aiToolSteps('openclaw'),
    nextSteps:['Pipe OpenClaw into shell scripts to automate common tasks','Try connecting it to a local Ollama model for completely free use','Explore the --dry-run flag to preview changes before applying them','Set up an alias in your shell config for your most-used commands'],
  },

  supabase: {
    id:'supabase', name:'Supabase', icon:'⚡', tagline:'Free open-source backend — database, auth, storage, APIs',
    badges:['tbadge-free','tbadge-fast','tbadge-best'],
    badgeLabels:['Generous free plan','Fast to set up','Recommended backend'],
    meters:{ cost:85, speed:80, quality:92 },
    desc:`<strong>Supabase</strong> is a complete backend platform — it gives you a PostgreSQL database, user authentication, file storage, real-time data, and auto-generated APIs, all in one place. Think of it as the engine that powers your web or mobile app: it stores your data, handles logins, and lets your app read and write information securely.<br><br>It's open-source, which means you can run it yourself or use their hosted service. The free plan is very generous — most small apps never need to upgrade. It's particularly popular when building web apps with tools like Next.js, and it pairs beautifully with AI coding tools like Cursor and Claude Code.`,
    details:{ Cost:'Free plan: 500MB database, 1GB storage, 50,000 monthly active users. Paid from $25/month.', Speed:'Your first database is live in under 5 minutes.', 'Skill needed':'None to create. Some SQL knowledge helps to query data.', 'Best for':'Web apps, mobile apps, any project that needs a database and user accounts.' },
    verdict:{ type:'good', text:"The recommended choice for adding a database and authentication to any web or mobile app. The free tier is exceptionally generous and the developer experience is excellent." },
    steps: supabaseSteps(),
    nextSteps:['Install the Supabase JavaScript client: npm install @supabase/supabase-js','Set up Row Level Security (RLS) on all your tables — this controls who can see what data','Connect it to your frontend by copying the Project URL and anon key from your project settings','Explore Supabase Edge Functions for running server-side logic without a separate backend server'],
  },

  // ── LOCAL AI TOOLS ─────────────────────────────────────────

  ollama: {
    id:'ollama', name:'Ollama', icon:'🦙', tagline:'Easiest way to run AI models on your computer',
    badges:['tbadge-free','tbadge-fast'],
    badgeLabels:['Completely free','Easy to install'],
    meters:{ cost:100, speed:80, quality:80 },
    desc:`<strong>Ollama</strong> is the simplest way to run open-source AI models on your own computer. It handles all the complicated technical setup for you — you just install it like a normal app, type one command to download a model, and start chatting.<br><br>Everything stays on your computer. No data sent anywhere. No subscription. No internet required after the initial download.`,
    details:{ Cost:'Completely free, forever.', Speed:'Installed in 10 minutes. Download a model in 5 more.', 'Skill needed':'Comfortable typing commands in a terminal.', 'Best for':'Privacy-conscious users; offline use; pairing with Cline for free AI coding.' },
    verdict:{ type:'good', text:"The recommended starting point for local AI. Pair it with Open WebUI for a friendly chat interface, or with Cline for free AI-assisted coding." },
    steps: localAISteps('ollama'),
    nextSteps:['Install Open WebUI for a friendly chat interface','Try different models from ollama.com/library','Connect it to Cline in VS Code for free AI coding help','Try llava if you want a model that can understand images'],
  },

  lmstudio: {
    id:'lmstudio', name:'LM Studio', icon:'🎛�?', tagline:'Friendly visual app for running local AI',
    badges:['tbadge-free','tbadge-fast'],
    badgeLabels:['Free app','No terminal needed'],
    meters:{ cost:100, speed:85, quality:80 },
    desc:`<strong>LM Studio</strong> is a desktop application (like any normal Mac or Windows app) for downloading and running AI models locally. Unlike Ollama which uses the terminal, LM Studio has a full visual interface — you browse models, download them with a click, and chat in a built-in interface.<br><br>No terminal, no commands, nothing technical. Just download, install, and start using AI privately.`,
    details:{ Cost:'Completely free.', Speed:'Installed and chatting in 15 minutes.', 'Skill needed':'None — standard desktop app.', 'Best for':'People who are not comfortable with the terminal; those who want a visual experience.' },
    verdict:{ type:'good', text:"Best choice if you want to run local AI without touching the terminal. The most approachable local AI option for non-technical users." },
    steps: localAISteps('lmstudio'),
    nextSteps:['Try the built-in Chat tab to compare different models','Enable the local server to connect other apps to your local AI','Explore the model library for specialised models (coding, reasoning, multilingual)','Share with privacy-conscious friends — they\'ll love it'],
  },

};


