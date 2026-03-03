import type { Step } from "../types";

const common: Record<string, { account: string; create: string; connect: string; query: string; backups: string }> = {
  supabase: {
    account: "Go to <a href='https://supabase.com' target='_blank' class='ext-link'>supabase.com</a> and create a free account.",
    create: "Click <strong>New project</strong>, choose your organization, project name, region, and database password.",
    connect: "Install <code>@supabase/supabase-js</code>, add your URL and anon key to <code>.env.local</code>, then initialize a client.",
    query: "Use SQL editor or client SDK to run <code>select * from your_table limit 10;</code>.",
    backups: "Enable backups in project settings and review retention limits on your plan.",
  },
  planetscale: {
    account: "Go to <a href='https://planetscale.com' target='_blank' class='ext-link'>planetscale.com</a> and sign up.",
    create: "Create a database, then create a development branch before writing schema changes.",
    connect: "Use MySQL connection string in your server runtime and keep credentials in env vars.",
    query: "Connect with a MySQL client and run a simple <code>SELECT NOW();</code>.",
    backups: "Review branch backups, deploy request history, and retention policy for your selected plan.",
  },
  neon: {
    account: "Go to <a href='https://neon.tech' target='_blank' class='ext-link'>neon.tech</a> and create an account.",
    create: "Create a project, then create your first branch/database from the dashboard.",
    connect: "Use the Postgres connection string in your server and keep it in <code>.env.local</code>.",
    query: "Open the SQL editor and run <code>select version();</code>.",
    backups: "Check point-in-time restore and retention rules for your branch and plan.",
  },
  mongodb: {
    account: "Go to <a href='https://www.mongodb.com/atlas' target='_blank' class='ext-link'>MongoDB Atlas</a> and create a free cluster.",
    create: "Create your first project and cluster, then create a database and collection.",
    connect: "Use the Atlas URI with user/password in env vars and connect via MongoDB driver.",
    query: "Run a basic find query: <code>db.collection.find({}).limit(5)</code>.",
    backups: "Configure snapshots/backup policy based on your tier and retention needs.",
  },
  sqlite: {
    account: "Install SQLite locally and create a Turso account at <a href='https://turso.tech' target='_blank' class='ext-link'>turso.tech</a>.",
    create: "Create a Turso database and initialize schema with a migration file.",
    connect: "Use Turso URL/token in env vars and connect with your SQLite-compatible client.",
    query: "Run <code>SELECT name FROM sqlite_master WHERE type='table';</code> to validate setup.",
    backups: "Review Turso replication/retention and export periodic dumps for safety.",
  },
  redis: {
    account: "Create an Upstash account at <a href='https://upstash.com' target='_blank' class='ext-link'>upstash.com</a>.",
    create: "Create a Redis database and copy REST URL/token.",
    connect: "Add Upstash credentials to env vars and connect with Redis or REST client.",
    query: "Run a first command like <code>SET welcome hello</code> then <code>GET welcome</code>.",
    backups: "Understand persistence/eviction. Redis is best as cache or queue, not your only source of truth.",
  },
  firebase: {
    account: "Go to <a href='https://firebase.google.com' target='_blank' class='ext-link'>firebase.google.com</a> and create a project.",
    create: "Enable Realtime Database and choose locked mode to start safely.",
    connect: "Install Firebase SDK, initialize app with config from project settings.",
    query: "Write and read your first key with a small test object.",
    backups: "Enable exports and review retention/compliance requirements in your region.",
  },
};

export function databaseSteps(tool: keyof typeof common): Step[] {
  const c = common[tool];
  return [
    {
      title: "Create your account / install",
      body: `<p>${c.account}</p><div class="tip-box">Use a dedicated project just for learning first so you can experiment safely.</div>`,
    },
    {
      title: "Create your first database / project",
      body: `<p>${c.create}</p><p>Keep names simple and consistent (for example: <code>buildguide-dev</code>).</p>`,
    },
    {
      title: "Understand your connection string",
      body: `<p>Your connection string is the address + credentials your app uses to reach the database.</p><p>Store it in <code>.env.local</code>, never commit it to git, and use separate values for dev, staging, and production.</p><div class="warn-box">If a connection string leaks, rotate credentials immediately.</div>`,
    },
    {
      title: "Connect from your app",
      body: `<p>${c.connect}</p><div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>const connection = process.env.DATABASE_URL;
if (!connection) throw new Error("Missing DATABASE_URL");</div>`,
    },
    {
      title: "Run your first query",
      body: `<p>${c.query}</p><p>Confirm the result in logs or dashboard so you know connectivity is correct end-to-end.</p>`,
    },
    {
      title: "Set up backups and retention",
      body: `<p>${c.backups}</p><p>Document your restore process before you need it in production.</p>`,
    },
  ];
}


