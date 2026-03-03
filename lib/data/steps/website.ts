import type { Step } from "../types";

export function websiteSteps(tool: string): Step[] {
  const s: Record<string, Step[]> = {
    framer: [
      {
        title: "Create your Framer workspace",
        body: `<p>Open <a href="https://framer.com" target="_blank" class="ext-link">framer.com</a> and create a free account.</p>
<p>Create one project called <code>website-v1</code> so your first build stays isolated from later experiments.</p>`,
      },
      {
        title: "Generate a first draft from a structured prompt",
        body: `<p>Use one clear prompt with target audience, outcome, and visual style:</p>
<div class="code-block"><button class="copy-btn">Copy</button>Build a one-page website for [business name].
Audience: [who visits]
Goal: [book a call, join newsletter, buy product]
Sections: Hero, benefits, social proof, FAQ, contact.
Style: clean, modern, high contrast, mobile-first.</div>
<p>Need help writing stronger prompts? Use <a href="/guide/prompting" class="ext-link">Prompt Engineering</a>.</p>`,
      },
      {
        title: "Replace placeholders with real content",
        body: `<p>Before styling tweaks, replace all placeholder copy and images.</p>
<p>Focus on user clarity: what you offer, who it is for, what action they should take next.</p>`,
      },
      {
        title: "Set responsive behavior and accessibility",
        body: `<p>Check each breakpoint (desktop/tablet/mobile). Fix text clipping, button overlap, and spacing collisions.</p>
<p>Confirm color contrast and make primary buttons obvious above the fold.</p>`,
      },
      {
        title: "Connect domain and publish",
        body: `<p>Publish first to the Framer subdomain, then connect a custom domain in settings.</p>
<p>After DNS propagation, verify:</p>
<p>1) HTTPS certificate active<br>2) Home page loads on mobile<br>3) Main call-to-action works</p>`,
      },
      {
        title: "Add analytics and launch checklist",
        body: `<p>Install analytics (for example PostHog or GA4) before sharing publicly.</p>
<div class="success-box">Framer launch complete. You now have a production-ready website baseline.</div>`,
      },
    ],

    squarespace: [
      {
        title: "Start trial and choose a base template",
        body: `<p>Open <a href="https://squarespace.com" target="_blank" class="ext-link">squarespace.com</a>, start a trial, and select a template close to your industry.</p>
<p>Do not over-optimize this choice. You can refine styling after core pages are done.</p>`,
      },
      {
        title: "Build the core pages first",
        body: `<p>Create <strong>Home</strong>, <strong>About</strong>, <strong>Services</strong>, and <strong>Contact</strong> before adding extra pages.</p>
<p>This keeps launch scope focused and prevents content sprawl.</p>`,
      },
      {
        title: "Set information hierarchy",
        body: `<p>Make one clear CTA per page. Keep headings specific and outcome-oriented.</p>
<p>Use short sections, clear spacing, and one message per block.</p>`,
      },
      {
        title: "Configure forms and domain",
        body: `<p>Connect your form destination email and verify delivery with a test submission.</p>
<p>Then connect or purchase a domain under <strong>Settings -> Domains</strong>.</p>`,
      },
      {
        title: "Publish and validate user journey",
        body: `<p>Publish the site and test the full journey as a user:</p>
<p>Landing page -> key content -> contact form submit -> confirmation.</p>
<div class="success-box">Squarespace setup complete with a validated conversion flow.</div>`,
      },
    ],

    webflow: [
      {
        title: "Set up Webflow and complete fundamentals",
        body: `<p>Create an account at <a href="https://webflow.com" target="_blank" class="ext-link">webflow.com</a>.</p>
<p>Before building, complete Webflow 101 from <a href="https://university.webflow.com" target="_blank" class="ext-link">Webflow University</a> to avoid layout and class-structure issues later.</p>`,
      },
      {
        title: "Start from a template and define page structure",
        body: `<p>Create a project from a template, then define page map and navigation before styling details.</p>
<p>Keep naming consistent for sections and reusable components.</p>`,
      },
      {
        title: "Build responsive layouts with reusable classes",
        body: `<p>Use class reuse intentionally. Avoid one-off class names that create maintenance debt.</p>
<p>Validate each breakpoint after every major section.</p>`,
      },
      {
        title: "Set CMS or static content strategy",
        body: `<p>If you need blogs/case studies, configure CMS collections now.</p>
<p>If not, stay static for speed and simpler maintenance.</p>`,
      },
      {
        title: "Publish safely and run QA",
        body: `<p>Publish to preview first, then production domain after final checks.</p>
<p>Run final QA: navigation, forms, page speed, and mobile layout integrity.</p>
<div class="success-box">Webflow site is ready with structured classes and responsive QA.</div>`,
      },
    ],

    githubpages: [
      {
        title: "Create GitHub account and repository",
        body: `<p>Sign in at <a href="https://github.com" target="_blank" class="ext-link">github.com</a> and create a repo named <code>yourusername.github.io</code>.</p>
<p>This repo name is required for user-site hosting.</p>`,
      },
      {
        title: "Generate or write website code",
        body: `<p>Create <code>index.html</code> plus any CSS/JS assets.</p>
<p>If you need AI help, use <a href="/guide/aitools" class="ext-link">AI coding tools setup</a> first, then generate files in your editor and commit them.</p>`,
      },
      {
        title: "Commit and push site files",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>git add .
git commit -m "feat: initial website"
git push origin main</div>
<p>Keep commits small and descriptive for rollback safety.</p>`,
      },
      {
        title: "Enable GitHub Pages",
        body: `<p>Open repository settings -> Pages -> Source branch <code>main</code>, folder <code>/ (root)</code>.</p>
<p>Save and wait for the deployment URL to appear.</p>`,
      },
      {
        title: "Connect custom domain and verify HTTPS",
        body: `<p>Add your custom domain in Pages settings and configure DNS records at your registrar.</p>
<p>Confirm HTTPS enforcement is enabled after certificate issuance.</p>
<div class="success-box">GitHub Pages deployment is live with version-controlled updates.</div>`,
      },
    ],

    netlify: [
      {
        title: "Prepare a deployable site folder",
        body: `<p>Netlify hosts built files. Ensure your output folder contains a valid <code>index.html</code> and assets.</p>
<p>For framework projects, run the build command first and deploy the build output directory.</p>`,
      },
      {
        title: "Create a Netlify project from Git",
        body: `<p>Sign in at <a href="https://netlify.com" target="_blank" class="ext-link">netlify.com</a> and connect your repository.</p>
<p>Prefer Git-based deploys over manual drag-and-drop for auditability and safer rollbacks.</p>`,
      },
      {
        title: "Configure build command and publish directory",
        body: `<p>Set the exact build command and publish directory for your stack.</p>
<div class="code-block"><button class="copy-btn">Copy</button>Build command: npm run build
Publish directory: out</div>
<p>Adjust directory based on framework output.</p>`,
      },
      {
        title: "Set environment variables and deploy previews",
        body: `<p>Add required env vars in Netlify site settings for production and branch deploy contexts.</p>
<p>Enable deploy previews so every PR gets its own review URL.</p>`,
      },
      {
        title: "Connect domain and enable launch checks",
        body: `<p>Attach your domain, confirm HTTPS, and test critical pages and forms.</p>
<p>Then document rollback steps from deploy history.</p>
<div class="success-box">Netlify setup complete with repeatable CI-style deployment flow.</div>`,
      },
    ],

    v0: [
      {
        title: "Create a v0 project and define outcome",
        body: `<p>Sign in at <a href="https://v0.dev" target="_blank" class="ext-link">v0.dev</a> and define your page objective before generation.</p>
<p>State conversion goal clearly: signups, bookings, demo requests, or sales.</p>`,
      },
      {
        title: "Generate with structured constraints",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>Create a landing page for [product].
Sections: hero, trust proof, features, pricing, FAQ, CTA.
Constraints: accessible contrast, mobile-first, no dense text blocks.
Output: production-ready React + Tailwind.</div>
<p>For stronger prompts and revision loops, use <a href="/guide/prompting" class="ext-link">Prompt Engineering</a>.</p>`,
      },
      {
        title: "Iterate in small revisions",
        body: `<p>Request one change at a time (for example, hero copy, then pricing layout, then CTA style).</p>
<p>This improves control and keeps diffs easier to review.</p>`,
      },
      {
        title: "Move code into your repository",
        body: `<p>Export generated code, commit it in git, and run locally before deployment.</p>
<p>If you need editor setup first, follow <a href="/guide/aitools" class="ext-link">AI coding tools setup</a>.</p>`,
      },
      {
        title: "Deploy and test conversion path",
        body: `<p>Deploy to Vercel or Netlify and test the core user flow from landing to CTA completion.</p>
<div class="success-box">v0 workflow complete: generated, refined, versioned, deployed, and tested.</div>`,
      },
    ],

    wordpress: [
      {
        title: "Create WordPress.com site and choose base theme",
        body: `<p>Open <a href="https://wordpress.com" target="_blank" class="ext-link">wordpress.com</a>, create a site, and pick a lightweight theme.</p>
<p>Keep theme simple at first. Content and structure matter more than heavy visual effects.</p>`,
      },
      {
        title: "Define content structure before plugins",
        body: `<p>Create essential pages and navigation first: Home, About, Services, Contact, Privacy.</p>
<p>Only add plugins after page structure and copy are stable.</p>`,
      },
      {
        title: "Configure homepage, menus, and forms",
        body: `<p>Set a static homepage, build navigation menus, and configure at least one working contact form.</p>
<p>Submit a test form and confirm response routing.</p>`,
      },
      {
        title: "Set SEO and performance baseline",
        body: `<p>Add SEO metadata, titles, and descriptions for key pages.</p>
<p>Optimize images and verify mobile readability before launch.</p>`,
      },
      {
        title: "Connect domain and publish",
        body: `<p>Connect a custom domain, publish publicly, and run final QA across desktop and mobile.</p>
<div class="success-box">WordPress setup complete with production essentials in place.</div>`,
      },
    ],
  };

  return s[tool] || [];
}
