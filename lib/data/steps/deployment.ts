import type { Step } from "../types";

export function deploymentSteps(tool: "vercel" | "netlify-deploy" | "railway" | "flyio" | "env-separation"): Step[] {
  if (tool === "vercel") {
    return [
      {
        title: "Define dev, staging, and production",
        body: `<p><strong>Dev</strong> is local work, <strong>staging</strong> is a safe test mirror, and <strong>production</strong> is real users.</p>
<p>Keep data and credentials separated per environment from day one.</p>`,
      },
      {
        title: "Import repository into Vercel",
        body: `<p>Sign in at <a href="https://vercel.com" target="_blank" class="ext-link">vercel.com</a>, click <strong>Add New Project</strong>, and import your Git repository.</p>
<p>Verify build command and output settings before first deploy.</p>`,
      },
      {
        title: "Enable preview deploys for pull requests",
        body: `<p>Each PR should produce a unique preview URL automatically.</p>
<p>Use preview links for QA and stakeholder signoff before merge.</p>`,
      },
      {
        title: "Configure environment variables per environment",
        body: `<p>Set the same key names with different values for Preview and Production.</p>
<div class="code-block"><button class="copy-btn">Copy</button>NEXT_PUBLIC_APP_ENV=staging
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...</div>
<p>Store all secrets in Vercel settings, never in repository files.</p>`,
      },
      {
        title: "Set release gates in GitHub",
        body: `<p>Protect <code>main</code> branch with required checks: lint, typecheck, tests, and at least one review.</p>
<p>This prevents unverified code from reaching production.</p>`,
      },
      {
        title: "Promote and rollback safely",
        body: `<p>Merge to <code>main</code> only after preview validation. If production fails, restore a previous deployment from Vercel history.</p>
<p>Document rollback owner and exact procedure in project docs.</p>
<div class="success-box">Vercel deployment flow complete with controlled promotion and rollback.</div>`,
      },
    ];
  }

  if (tool === "netlify-deploy") {
    return [
      {
        title: "Connect repository and configure build settings",
        body: `<p>Import your repository into Netlify and set build command + publish directory.</p>
<div class="code-block"><button class="copy-btn">Copy</button>Build command: npm run build
Publish directory: dist</div>`,
      },
      {
        title: "Use branch deploys for staging",
        body: `<p>Enable branch deploys so staging branches get dedicated URLs for QA.</p>
<p>Keep production tied to one protected branch only.</p>`,
      },
      {
        title: "Set env vars by deploy context",
        body: `<p>Configure environment variables separately for production and branch deploy contexts.</p>
<p>Never reuse production secrets in staging contexts.</p>`,
      },
      {
        title: "Enable deploy previews in PR workflow",
        body: `<p>Use deploy preview links in code review so feature changes are verified visually before merge.</p>`,
      },
      {
        title: "Prepare rollback and incident notes",
        body: `<p>Use deploy history to restore a known-good release quickly.</p>
<p>Keep an incident note template for failed release analysis.</p>`,
      },
      {
        title: "Run production launch checklist",
        body: `<p>Validate forms, redirects, core pages, analytics, and error monitoring on production URL.</p>
<div class="success-box">Netlify deployment pipeline ready for staging and production use.</div>`,
      },
    ];
  }

  if (tool === "railway") {
    return [
      {
        title: "Create Railway project and services",
        body: `<p>Create a project in <a href="https://railway.app" target="_blank" class="ext-link">railway.app</a> and provision app + database services.</p>
<p>Name services clearly: <code>app-staging</code>, <code>db-staging</code>, etc.</p>`,
      },
      {
        title: "Connect repository and configure build",
        body: `<p>Link your repository and verify build/start commands for each service.</p>
<p>Keep deployment settings versioned in config when possible.</p>`,
      },
      {
        title: "Separate staging and production services",
        body: `<p>Use independent Railway services/projects for staging and production workloads.</p>
<p>Do not share one database between both environments.</p>`,
      },
      {
        title: "Configure secrets and service variables",
        body: `<p>Set required environment variables in Railway for each service and environment.</p>
<p>Validate values with one health-check route after deploy.</p>`,
      },
      {
        title: "Add logs, alerts, and migration safety",
        body: `<p>Enable logs/metrics and ensure database migrations run in controlled order.</p>
<p>Test rollback path before the first production release.</p>`,
      },
      {
        title: "Promote with verification checklist",
        body: `<p>Promote changes to production only after staging feature and regression checks pass.</p>
<div class="success-box">Railway deployment flow complete with isolated environments and migration discipline.</div>`,
      },
    ];
  }

  if (tool === "flyio") {
    return [
      {
        title: "Install Fly CLI and authenticate",
        body: `<p>Install <code>flyctl</code> from <a href="https://fly.io/docs/hands-on/install-flyctl/" target="_blank" class="ext-link">Fly docs</a>, then run:</p>
<div class="code-block"><button class="copy-btn">Copy</button>fly auth login</div>`,
      },
      {
        title: "Create app and configure Docker image",
        body: `<p>Create your Fly app and confirm Dockerfile build reproducibility.</p>
<p>Define health checks and exposed ports in Fly configuration.</p>`,
      },
      {
        title: "Separate staging and production apps",
        body: `<p>Use separate Fly apps (or organizations) for staging and production.</p>
<p>Keep secrets and volumes isolated per app.</p>`,
      },
      {
        title: "Set secrets and deploy",
        body: `<div class="code-block"><button class="copy-btn">Copy</button>fly secrets set DATABASE_URL=...
fly deploy</div>
<p>Validate deployment status and health checks before traffic routing.</p>`,
      },
      {
        title: "Configure observability and rollback",
        body: `<p>Monitor app logs and metrics for resource saturation, latency spikes, and restart loops.</p>
<p>Practice rollback using release history before production incidents occur.</p>`,
      },
      {
        title: "Document operating runbook",
        body: `<p>Record deploy, migration, and rollback procedures with owner responsibilities.</p>
<div class="success-box">Fly.io deployment setup complete with infra-level controls in place.</div>`,
      },
    ];
  }

  return [
    {
      title: "Define environment boundaries clearly",
      body: `<p>Every project should have separate <strong>dev</strong>, <strong>staging</strong>, and <strong>production</strong> environments.</p>
<p>This prevents test changes from impacting live users.</p>`,
    },
    {
      title: "Use isolated infrastructure per environment",
      body: `<p>Each environment needs its own database, secrets, storage buckets, and API credentials.</p>
<p>Never point staging code to production data by convenience.</p>`,
    },
    {
      title: "Keep variable names consistent across environments",
      body: `<p>Use identical key names everywhere, only values should change.</p>
<div class="code-block"><button class="copy-btn">Copy</button>DATABASE_URL
NEXT_PUBLIC_APP_ENV
REDIS_URL</div>`,
    },
    {
      title: "Gate promotions with checks",
      body: `<p>Require lint, typecheck, test suite, and review signoff before promoting from staging to production.</p>`,
    },
    {
      title: "Observe each environment independently",
      body: `<p>Separate logs, metrics, and alerts for dev, staging, and production so incidents are isolated and diagnosable.</p>`,
    },
    {
      title: "Write and rehearse rollback process",
      body: `<p>Document exact rollback commands/steps and run a rehearsal so production recovery is fast and predictable.</p>
<div class="success-box">Environment separation is in place and release risk is significantly reduced.</div>`,
    },
  ];
}
