import type { Step } from "../types";

export function websiteSteps(tool: string): Step[] {
  const s: Record<string, Step[]> = {
    framer: [
      { title: 'Go to Framer.com and create a free account',
        body: `<p>Framer is a visual website builder — no coding required at all. Go to their website and sign up for free. You don't need a credit card.</p>
<div class="info-box">🔗 <a href="https://framer.com" target="_blank" class="ext-link">framer.com</a> — click the <strong>"Get started for free"</strong> button in the top right corner.</div>
<p>Sign up with your Google account or email address. Takes about 60 seconds.</p>` },
      { title: 'Create a new project and describe your site to the AI',
        body: `<p>After signing in, you'll see a dashboard. Click the large <strong>"+ New project"</strong> button — it'll be prominent in the centre or top-left of the screen.</p>
<p>Framer will show you a text box and ask you to describe your website. Type something specific, like:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>A portfolio website for a freelance graphic designer. Clean, minimal, black and white. Show a grid of project thumbnails on the homepage.</div>
<div class="tip-box">💡 The more specific you are, the better the result. Mention your name, what you do, and the style you want.</div>` },
      { title: 'Review what the AI built and start editing',
        body: `<p>Framer will generate a website for you in about 30 seconds. It'll look like a real, designed website — not a blank template.</p>
<p>To change any text, just <strong>double-click on it</strong> and start typing. To change an image, click on it and you'll see options appear on the right side of the screen.</p>
<p>Don't try to make it perfect right now. Just check that the overall layout and style feels right — you can polish it later.</p>
<div class="tip-box">💡 If you don't like the design, click <strong>"Regenerate"</strong> to get a different version. Try a few before committing to one.</div>` },
      { title: 'Replace placeholder text with your real content',
        body: `<p>The AI will have put placeholder text and images throughout. Work through the site and replace them with your actual words and photos.</p>
<p>Click the <strong>navigation bar</strong> at the top to update your site name or logo. Click each section to update headings, body text, and button labels.</p>
<div class="tip-box">💡 Write your About section as if you're explaining what you do to a friend — conversational and honest works better than formal marketing language.</div>` },
      { title: 'Publish your website',
        body: `<p>When you're ready (or even when you're just curious to see it live), click the <strong>"Publish"</strong> button — it's in the top right corner of the editor, a coloured button you can't miss.</p>
<p>Framer gives you a free URL immediately, something like <code>yourname.framer.website</code>. Click it to open your live site in a new tab.</p>
<div class="success-box">🎉 Your website is now live on the internet! Anyone with the link can visit it right now.</div>
<div class="tip-box">💡 To get a proper domain like <em>yourname.com</em>, go to <strong>Settings → Domains</strong> in Framer. You can buy a domain there or connect one you already own.</div>` },
    ],

    squarespace: [
      { title: 'Go to Squarespace and start a free trial',
        body: `<p>Squarespace gives you a 14-day free trial before you need to pay anything. Go to their website and click <strong>"Get Started"</strong>.</p>
<div class="info-box">🔗 <a href="https://squarespace.com" target="_blank" class="ext-link">squarespace.com</a></div>
<p>Create an account with your email address.</p>` },
      { title: 'Answer their setup questions and pick a template',
        body: `<p>Squarespace will ask you a few questions: what type of site you're building (business, portfolio, blog, etc.) and what industry you're in. Answer honestly — it helps them show you the most relevant templates.</p>
<p>Browse the templates and pick one that feels right. Don't overthink this — every template can be customised. Look for one where the overall layout appeals to you.</p>` },
      { title: 'Edit your pages using the visual editor',
        body: `<p>Click on any section of your site to edit it. Squarespace uses a block-based editor: click a block to select it, then click <strong>Edit</strong> to change the content.</p>
<p>Work through each page: replace the placeholder text, swap out images (click an image → <strong>Replace</strong>), and update the navigation menu with your real page names.</p>
<div class="tip-box">💡 Use <strong>Pages</strong> in the left sidebar (it looks like a list icon — ☰ stacked lines) to add, remove, or rename pages.</div>` },
      { title: 'Set up your domain and billing to go live',
        body: `<p>Squarespace plans start at about $16/month. In your account settings, choose a plan and enter your payment details.</p>
<p>You can either register a new custom domain through Squarespace, or connect a domain you already own. Go to <strong>Settings → Domains</strong> to set this up.</p>
<div class="tip-box">💡 Buying a domain through Squarespace is often free for the first year on annual plans — check the current offer when you sign up.</div>` },
      { title: 'Publish and go live',
        body: `<p>When you're ready, go to <strong>Settings → Site Availability</strong> and change it from <em>"Private"</em> to <em>"Public"</em>. Your site is now live.</p>
<div class="success-box">🎉 Your Squarespace site is now live and accessible to anyone on the internet.</div>` },
    ],

    webflow: [
      { title: 'Sign up for a free Webflow account',
        body: `<div class="info-box">🔗 <a href="https://webflow.com" target="_blank" class="ext-link">webflow.com</a> — click "Get started — it's free"</div>
<p>The free plan lets you design and build but limits publishing to a <em>yoursite.webflow.io</em> address. You'll upgrade to a paid plan to use a custom domain or remove their branding.</p>` },
      { title: 'Complete Webflow University basics first',
        body: `<p>Before you try to build, spend an hour with Webflow University. This is their free learning platform and it saves you hours of frustration.</p>
<div class="info-box">🔗 <a href="https://university.webflow.com" target="_blank" class="ext-link">university.webflow.com</a> — start with "Webflow 101"</div>
<div class="tip-box">💡 This is genuinely worth doing. Webflow has a learning curve, but once it clicks, it's very powerful.</div>` },
      { title: 'Start from a template',
        body: `<p>In the Webflow dashboard, click <strong>New Project</strong> and choose <strong>Start from a template</strong>. Browse the free templates — there are hundreds. Pick one that's close to what you need.</p>
<p>Starting from a blank canvas is much harder. Always start from a template.</p>` },
      { title: 'Customise using the visual editor',
        body: `<p>Click any element on the canvas to select it. The right panel shows its styling options — colours, fonts, sizes, spacing. The left panel shows your page structure.</p>
<p>Take your time. Webflow is more like design software than a website builder — changes are precise and intentional.</p>
<div class="tip-box">💡 Press <strong>Ctrl+Z</strong> (Windows) or <strong>Cmd+Z</strong> (Mac) frequently. Webflow has full undo history.</div>` },
      { title: 'Publish your site',
        body: `<p>Click the <strong>Publish</strong> button in the top right — it looks like an upward arrow or rocket icon. Choose your staging domain to publish a free preview, or upgrade to publish to a custom domain.</p>
<div class="success-box">🎉 Your Webflow site is live.</div>` },
    ],

    githubpages: [
      { title: 'Create a free GitHub account',
        body: `<p>GitHub is where your website files will live. It's free.</p>
<div class="info-box">🔗 <a href="https://github.com" target="_blank" class="ext-link">github.com</a> — click "Sign up" in the top right corner. The corner button is a small blue or green button.</div>
<p>Choose a username carefully — it'll be part of your site's free URL: <em>yourusername.github.io</em></p>` },
      { title: 'Create your website files using AI',
        body: `<p>You need an HTML file to start. Go to <a href="https://claude.ai" target="_blank" class="ext-link">claude.ai</a> and ask it:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Create a complete single-page HTML website for [describe what you need]. Include CSS styling in the same file. Make it clean, modern, and mobile-friendly. Give me just the HTML code.</div>
<p>Copy the HTML code it produces. We'll use this in the next step.</p>` },
      { title: 'Create a repository and upload your files',
        body: `<p>In GitHub, click the green <strong>"New"</strong> button on the left sidebar (it looks like a book with a plus sign), or the <strong>"+"</strong> icon in the top right then "New repository".</p>
<p>Name the repository exactly: <code>yourusername.github.io</code> — replacing "yourusername" with your actual GitHub username. Tick <strong>"Add a README file"</strong> then click <strong>"Create repository"</strong>.</p>
<p>In the repository, click <strong>"Add file" → "Create new file"</strong>. Name it <code>index.html</code> and paste your HTML code. Scroll down and click <strong>"Commit new file"</strong>.</p>` },
      { title: 'Enable GitHub Pages',
        body: `<p>In your repository, click the <strong>Settings</strong> tab — it's along the top row of tabs, and has a gear (⚙�?) icon next to it.</p>
<p>Scroll down the left sidebar and click <strong>"Pages"</strong> (it'll have a small page icon). Under "Branch", select <strong>main</strong> and click <strong>Save</strong>.</p>
<div class="tip-box">💡 It takes about 2–3 minutes for your site to go live after enabling this. Be patient.</div>` },
      { title: 'Visit your live site',
        body: `<p>After a few minutes, your site is live at: <code>yourusername.github.io</code></p>
<div class="success-box">🎉 Your free GitHub Pages site is now live. To update it, just edit the index.html file in GitHub.</div>
<p>To add a custom domain, go back to Settings → Pages and enter your domain in the "Custom domain" field. You'll also need to configure your domain's DNS settings — your domain registrar (where you bought the domain) can help with this.</p>` },
    ],

    netlify: [
      { title: 'Create your website files first',
        body: `<p>Netlify hosts your files — it doesn't create them. First, get your website files ready. The easiest way:</p>
<p>Go to <a href="https://claude.ai" target="_blank" class="ext-link">claude.ai</a> and type:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Create a complete single-page HTML website for [describe your site]. Include all CSS in the same file. Make it clean, professional, and mobile-friendly.</div>
<p>Save the HTML it gives you as a file called <code>index.html</code> on your computer.</p>` },
      { title: 'Sign up for a free Netlify account',
        body: `<div class="info-box">🔗 <a href="https://netlify.com" target="_blank" class="ext-link">netlify.com</a> — click "Sign up" (free, no credit card needed)</div>
<p>Sign up with your GitHub account or email. The free plan is genuinely generous — most personal sites never need to upgrade.</p>` },
      { title: 'Drag and drop your files to deploy',
        body: `<p>On the Netlify dashboard, you'll see a box that says <strong>"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here."</strong></p>
<p>Open your computer's file browser and find your <code>index.html</code> file. Drag it directly onto that box in the Netlify browser window.</p>
<div class="success-box">🎉 That's it. Netlify instantly gives you a live URL — something like <em>amazing-name-123.netlify.app</em>.</div>` },
      { title: 'Set up a custom domain (optional)',
        body: `<p>Your Netlify site has a random URL by default. To use a proper custom domain, go to <strong>Domain settings</strong> on your site dashboard.</p>
<p>You can buy a domain through Netlify, or connect one you already own. Netlify gives you free HTTPS (the padlock icon in browsers) automatically.</p>
<div class="tip-box">💡 To update your site, just drag and drop a new version of your files onto Netlify. It redeploys instantly.</div>` },
    ],

    v0: [
      { title: 'Go to v0.dev and sign up',
        body: `<div class="info-box">🔗 <a href="https://v0.dev" target="_blank" class="ext-link">v0.dev</a> — click "Sign up" or "Get started"</div>
<p>v0 is made by Vercel, a reputable web infrastructure company. Sign up with your GitHub account (recommended) or email.</p>
<p>The free tier gives you a limited number of "generations" per month. Paid plans start at ~$10/month for more.</p>` },
      { title: 'Describe what you want to build',
        body: `<p>In the prompt box, describe your website or component in plain English. Be specific and detailed:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>A landing page for a dog walking service called "Happy Paws". Include a hero section with a photo placeholder, a list of services with icons, pricing cards for 3 tiers, and a simple contact form. Use a friendly, warm colour palette with greens and yellows.</div>
<p>Click the arrow button or press Enter to generate.</p>` },
      { title: 'Iterate on the design with follow-up prompts',
        body: `<p>v0 will generate a design. You can refine it by typing follow-up instructions in the same chat:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>Make the header taller and add a navigation menu with: Home, Services, Pricing, Contact</div>
<p>Keep refining until you're happy with it. You're not writing code — you're describing changes in plain language.</p>
<div class="tip-box">💡 v0 generates React code. If you just want HTML, add "as a single HTML file with no frameworks" to your prompt.</div>` },
      { title: 'Export the code',
        body: `<p>When you're happy with the design, click the <strong>"Code"</strong> tab above the preview to see the generated code. Click <strong>"Copy"</strong> or the download icon.</p>
<p>Alternatively, click <strong>"Open in StackBlitz"</strong> or <strong>"Deploy"</strong> to publish directly to Vercel's hosting.</p>` },
      { title: 'Deploy your site',
        body: `<p>The simplest path: click <strong>"Deploy to Vercel"</strong> directly from v0. This creates a live URL in about 60 seconds for free.</p>
<p>Or save the code as <code>index.html</code> and drag it onto <a href="https://netlify.com" target="_blank" class="ext-link">Netlify</a> for free hosting.</p>
<div class="success-box">🎉 Your AI-generated website is now live!</div>` },
    ],

    wordpress: [
      { title: 'Sign up for WordPress.com',
        body: `<div class="info-box">🔗 <a href="https://wordpress.com" target="_blank" class="ext-link">wordpress.com</a> — click "Get Started"</div>
<p>Choose a site address (something like <em>yourname.wordpress.com</em>). The free plan works fine to start. You can upgrade later to get a custom domain.</p>` },
      { title: 'Choose a theme (visual style)',
        body: `<p>After creating your account, WordPress will ask you to choose a theme — this is the overall design of your site. Browse the options and pick one that suits your purpose.</p>
<p>Don't spend too long on this. Themes can be changed later without losing your content.</p>
<div class="tip-box">💡 Click the <strong>Appearance</strong> menu item on the left sidebar (it looks like a paint palette 🎨) to browse and change themes at any time.</div>` },
      { title: 'Create your key pages',
        body: `<p>Go to <strong>Pages → Add New</strong> (the left sidebar has a "Pages" item with a document icon 📄). Create these essential pages:</p>
<p><strong>Home</strong> — your welcome page<br><strong>About</strong> — who you are<br><strong>Contact</strong> — how to reach you</p>
<p>Click inside the white editor area and start typing. The editor is similar to a Google Doc.</p>` },
      { title: 'Set your homepage and navigation',
        body: `<p>Go to <strong>Settings → Reading</strong> (Settings is at the very bottom of the left sidebar, looks like a gear ⚙�?). Set <em>"Your homepage displays"</em> to <strong>"A static page"</strong> and choose your Home page.</p>
<p>Then go to <strong>Appearance → Menus</strong> to add your pages to the navigation bar at the top of your site.</p>` },
      { title: 'Publish and optionally upgrade',
        body: `<p>Your site is already live at <em>yourname.wordpress.com</em>. Share this link with anyone.</p>
<p>To get a proper custom domain (like <em>yourname.com</em>), go to <strong>Upgrades → Domain</strong>. The Personal plan (around $4/month billed annually) includes a free domain for the first year.</p>
<div class="success-box">🎉 Your WordPress site is live!</div>` },
    ],
  };
  return s[tool] || [];
}


