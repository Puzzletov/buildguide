import type { Step } from "../types";

export function deploymentSteps(tool: "vercel" | "netlify-deploy" | "railway" | "flyio" | "env-separation"): Step[] {
  if (tool === "vercel") {
    return [
      {
        title: "Understand staging vs production",
        body: `<p><strong>Staging is a copy of your live app where you test changes before real users see them. Production is the real thing.</strong></p><p>Never ship directly to production without validation in staging/preview first.</p>`,
      },
      {
        title: "Connect your GitHub repository to Vercel",
        body: `<p>Sign into Vercel, click <strong>Add New Project</strong>, and import your repository.</p>`,
      },
      {
        title: "Preview deployments for every PR",
        body: `<p>Each pull request gets a unique preview URL automatically. Use it for review and QA before merge.</p>`,
      },
      {
        title: "Set environment variables by environment",
        body: `<p>Set the same key names with different values for Preview/Staging and Production.</p><div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>NEXT_PUBLIC_APP_ENV=staging
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...</div>`,
      },
      {
        title: "Set branch protection and CI requirements",
        body: `<p>In GitHub, require CI checks and at least one review on <code>main</code> before merge.</p>`,
      },
      {
        title: "Promote and rollback safely",
        body: `<p>Merging to <code>main</code> promotes to production. If a release fails, restore a previous deployment from Vercel history.</p>`,
      },
    ];
  }

  if (tool === "netlify-deploy") {
    return [
      { title: "Create Netlify site from Git", body: "<p>Import your repository and configure build settings.</p>" },
      { title: "Use branch deploys", body: "<p>Enable branch deploys so staging branches get separate URLs.</p>" },
      { title: "Set environment variables", body: "<p>Use different values for production and branch deploy contexts.</p>" },
      { title: "Add deploy previews to PRs", body: "<p>Review PR previews before merging.</p>" },
      { title: "Configure split testing if needed", body: "<p>Use Netlify split testing for gradual rollouts.</p>" },
      { title: "Rollback from deploy history", body: "<p>Restore a known-good deploy from Netlify UI.</p>" },
    ];
  }

  if (tool === "railway") {
    return [
      { title: "Create Railway project", body: "<p>Create a project and connect your repo.</p>" },
      { title: "Provision services", body: "<p>Add app + database services in the same project.</p>" },
      { title: "Separate environments", body: "<p>Use separate services/projects for staging vs production.</p>" },
      { title: "Configure env vars", body: "<p>Set env vars per environment, never hardcode secrets.</p>" },
      { title: "Deploy from branches", body: "<p>Use staged branch deploys first, then promote.</p>" },
      { title: "Monitor and rollback", body: "<p>Use Railway logs/metrics and redeploy previous revision if needed.</p>" },
    ];
  }

  if (tool === "flyio") {
    return [
      { title: "Install Fly CLI and login", body: "<p>Install <code>flyctl</code>, then authenticate.</p>" },
      { title: "Create app and regions", body: "<p>Create Fly app, choose region strategy, and volume if required.</p>" },
      { title: "Define staging/prod apps", body: "<p>Use separate Fly apps (or orgs) for staging and production.</p>" },
      { title: "Configure secrets", body: "<p>Set secrets with <code>fly secrets set</code> for each environment.</p>" },
      { title: "Deploy from Docker", body: "<p>Build and deploy via Dockerfile and <code>fly deploy</code>.</p>" },
      { title: "Rollback strategy", body: "<p>Use release history to roll back if health checks fail.</p>" },
    ];
  }

  return [
    { title: "Define dev, staging, production", body: "<p>Dev is local, staging mirrors prod, production serves real users.</p>" },
    { title: "Use separate resources", body: "<p>Each environment needs isolated databases, keys, and storage.</p>" },
    { title: "Align configuration keys", body: "<p>Keep same key names across environments, values differ per env.</p>" },
    { title: "Add release gates", body: "<p>Require tests and review before promoting from staging to prod.</p>" },
    { title: "Observe each environment", body: "<p>Track logs/metrics separately to speed up debugging.</p>" },
    { title: "Document promotion + rollback", body: "<p>Write the exact merge/promote/rollback process in docs.</p>" },
  ];
}


