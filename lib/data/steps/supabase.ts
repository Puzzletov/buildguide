import type { Step } from "../types";

export function supabaseSteps(): Step[] {
  return [
    {
      title: "Create Supabase project with environment strategy",
      body: `<p>Open <a href="https://supabase.com" target="_blank" class="ext-link">supabase.com</a> and create a project for <code>development</code> first.</p>
<p>Plan separate projects for staging and production to avoid accidental data exposure.</p>`,
    },
    {
      title: "Create initial schema and security baseline",
      body: `<p>Create your first tables with clear ownership fields (for example <code>user_id</code>, <code>created_at</code>).</p>
<p>Enable Row Level Security (RLS) on every user-facing table before connecting frontend clients.</p>
<p>Need a deeper security walk-through? Open <a href="/guide/security" class="ext-link">Security Foundations</a>.</p>`,
    },
    {
      title: "Collect project URL and anon key safely",
      body: `<p>In project settings -> API, copy:</p>
<p>1) project URL<br>2) anon public key</p>
<p>Add them to your environment file:</p>
<div class="code-block"><button class="copy-btn">Copy</button>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key</div>
<div class="warn-box">Do not expose service role keys in client code.</div>`,
    },
    {
      title: "Install SDK and initialize one shared client",
      body: `<div class="code-block"><button class="copy-btn">Copy</button>npm install @supabase/supabase-js</div>
<p>Create one central client helper used by your app routes/components. Avoid duplicate ad-hoc client setup across files.</p>`,
    },
    {
      title: "Run first read/write test with policy checks",
      body: `<p>Test one insert and one select with a non-admin user context to confirm RLS is actually protecting rows.</p>
<div class="code-block"><button class="copy-btn">Copy</button>const { data, error } = await supabase.from("todos").select("*").limit(5);</div>
<p>Do not proceed until unauthorized reads are blocked as expected.</p>`,
    },
    {
      title: "Add auth, storage, and migration discipline",
      body: `<p>Enable auth provider(s) and configure storage buckets only after table and policy baseline is stable.</p>
<p>Track schema changes in SQL migrations, not manual dashboard-only edits.</p>`,
    },
    {
      title: "Use Supabase as part of full application architecture",
      body: `<p>Supabase is usually one part of your system: database, auth, storage, and optional functions.</p>
<p>For chatbots, combine Supabase with a model provider and backend orchestration. Follow <a href="/guide/chatbot" class="ext-link">Chatbot guide</a> to build the full stack.</p>
<div class="success-box">Supabase setup complete with secure baseline and production-ready structure.</div>`,
    },
  ];
}
