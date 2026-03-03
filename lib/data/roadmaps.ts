export interface RoadmapGuideLink {
  path: string;
  label: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  objective: string;
  links: RoadmapGuideLink[];
}

export interface PathBlueprint {
  title: string;
  summary: string;
  phases: RoadmapPhase[];
}

export const MASTER_ROADMAP: RoadmapPhase[] = [
  {
    id: "foundation",
    title: "Foundation",
    objective: "Set up coding environment, prompts, and security guardrails before building features.",
    links: [
      { path: "aitools", label: "AI tools setup" },
      { path: "prompting", label: "Prompt engineering" },
      { path: "security", label: "Security foundations" },
      { path: "bestpractices", label: "Best practices" },
    ],
  },
  {
    id: "build",
    title: "Build",
    objective: "Choose stack components for your goal and implement core product behavior.",
    links: [
      { path: "website", label: "Website build" },
      { path: "webapp", label: "Web app build" },
      { path: "chatbot", label: "Chatbot build" },
      { path: "database", label: "Database setup" },
    ],
  },
  {
    id: "ship",
    title: "Ship",
    objective: "Validate quality with tests and deploy through staging to production safely.",
    links: [
      { path: "testing", label: "Testing stack" },
      { path: "deployment", label: "Deployment flow" },
      { path: "agentdev", label: "Agent development" },
    ],
  },
];

export const PATH_BLUEPRINTS: Record<string, PathBlueprint> = {
  website: {
    title: "Website Blueprint",
    summary: "Pick a builder, generate structure, replace content, and launch with analytics and domain checks.",
    phases: [
      {
        id: "prep",
        title: "Prep",
        objective: "Define audience, goal, and page sections before choosing tools.",
        links: [
          { path: "prompting", label: "Prompt engineering" },
          { path: "designflow", label: "Design flow" },
        ],
      },
      {
        id: "build",
        title: "Build",
        objective: "Select one builder and produce a clean responsive site with real content.",
        links: [
          { path: "website", label: "Website tools" },
          { path: "aitools", label: "AI coding tools" },
        ],
      },
      {
        id: "ship",
        title: "Ship",
        objective: "Connect domain, verify forms, add analytics, and run mobile QA.",
        links: [
          { path: "testing", label: "Testing guide" },
          { path: "deployment", label: "Deployment guide" },
        ],
      },
    ],
  },
  webapp: {
    title: "Web App Blueprint",
    summary: "Combine frontend tooling, backend/data, and secure deployment with staged validation.",
    phases: [
      {
        id: "foundation",
        title: "Foundation",
        objective: "Set up editor, dependencies, and workflow guardrails.",
        links: [
          { path: "aitools", label: "AI tools setup" },
          { path: "security", label: "Security foundations" },
        ],
      },
      {
        id: "build",
        title: "Build",
        objective: "Implement app features with database schema and auth.",
        links: [
          { path: "database", label: "Database setup" },
          { path: "webapp", label: "Web app tools" },
        ],
      },
      {
        id: "ship",
        title: "Ship",
        objective: "Gate releases with tests and ship via staging to production.",
        links: [
          { path: "testing", label: "Testing guide" },
          { path: "deployment", label: "Deployment guide" },
        ],
      },
    ],
  },
  chatbot: {
    title: "Chatbot Blueprint",
    summary: "Build chatbot architecture first, then choose providers, memory, and guardrails intentionally.",
    phases: [
      {
        id: "architecture",
        title: "Architecture",
        objective: "Define interface, provider, orchestration endpoint, and memory model.",
        links: [
          { path: "chatbot", label: "Chatbot stack options" },
          { path: "database", label: "Database setup" },
        ],
      },
      {
        id: "provider",
        title: "Provider",
        objective: "Pick one model provider for v1 and benchmark quality/cost/latency.",
        links: [
          { path: "prompting", label: "Prompt engineering" },
          { path: "aitools", label: "AI tools and providers" },
        ],
      },
      {
        id: "reliability",
        title: "Reliability",
        objective: "Add moderation, rate limits, retries, and staged rollout checks.",
        links: [
          { path: "security", label: "Security foundations" },
          { path: "testing", label: "Testing guide" },
          { path: "deployment", label: "Deployment guide" },
        ],
      },
    ],
  },
  aitools: {
    title: "AI Coding Blueprint",
    summary: "Set up workspace fundamentals before choosing autonomous agents and model providers.",
    phases: [
      {
        id: "base",
        title: "Base setup",
        objective: "Install editor, terminal workflow, and dependency tooling.",
        links: [{ path: "aitools", label: "AI coding tools" }],
      },
      {
        id: "agent",
        title: "Agent setup",
        objective: "Configure one coding agent with scoped prompts and validation commands.",
        links: [
          { path: "agentdev", label: "Agent development" },
          { path: "prompting", label: "Prompt engineering" },
        ],
      },
      {
        id: "discipline",
        title: "Engineering discipline",
        objective: "Apply secure, testable, reviewable workflows across all AI-assisted edits.",
        links: [
          { path: "bestpractices", label: "Best practices" },
          { path: "security", label: "Security foundations" },
          { path: "testing", label: "Testing guide" },
        ],
      },
    ],
  },
  deployment: {
    title: "Deployment Blueprint",
    summary: "Separate environments, enforce release gates, and make rollback executable.",
    phases: [
      {
        id: "separation",
        title: "Environment separation",
        objective: "Create isolated dev, staging, and production resources.",
        links: [{ path: "deployment", label: "Deployment tools" }],
      },
      {
        id: "gates",
        title: "Release gates",
        objective: "Require tests and reviews before production promotion.",
        links: [
          { path: "testing", label: "Testing guide" },
          { path: "security", label: "Security foundations" },
        ],
      },
      {
        id: "operations",
        title: "Operations",
        objective: "Define monitoring and rollback ownership with documented runbooks.",
        links: [{ path: "bestpractices", label: "Best practices" }],
      },
    ],
  },
  database: {
    title: "Database Blueprint",
    summary: "Choose data layer based on workload, then secure schema, keys, and backups early.",
    phases: [
      {
        id: "choice",
        title: "Choose datastore",
        objective: "Match database type to app requirements and growth profile.",
        links: [{ path: "database", label: "Database options" }],
      },
      {
        id: "security",
        title: "Secure access",
        objective: "Use env vars, least privilege keys, and access policies.",
        links: [{ path: "security", label: "Security foundations" }],
      },
      {
        id: "durability",
        title: "Durability",
        objective: "Set backup, restore, and migration workflows before scale.",
        links: [
          { path: "deployment", label: "Deployment guide" },
          { path: "bestpractices", label: "Best practices" },
        ],
      },
    ],
  },
};
