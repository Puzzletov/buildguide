import type { Step } from "../types";

export function supabaseSteps(): Step[] {
  return [
    { title: 'Create a free Supabase account',
      body: `<p>Supabase is the engine behind your app — it stores all your data, handles user logins, and provides the APIs your app uses to read and write information.</p>
<div class="info-box">🔗 <a href="https://supabase.com" target="_blank" class="ext-link">supabase.com</a> — click "Start your project" (it's free, no credit card needed)</div>
<p>Sign up with your GitHub account — this is the recommended method as it's faster and you'll likely need GitHub anyway.</p>` },
    { title: 'Create a new project',
      body: `<p>After signing in, you'll see your Supabase dashboard — a control panel for all your projects. Click the green <strong>"New project"</strong> button.</p>
<p>Fill in:</p>
<p><strong>Name:</strong> something short like "my-app" or your app's name — this is just for you to identify it<br>
<strong>Database Password:</strong> click "Generate a password" — Supabase will create a strong password automatically. Click the copy icon 📋 next to it and save it in a password manager or secure note. You'll need it later.<br>
<strong>Region:</strong> choose the location closest to where most of your users will be (e.g. "West EU" for Europe)</p>
<p>Click <strong>"Create new project"</strong> and wait about 2 minutes while Supabase sets up your database.</p>` },
    { title: 'Explore your project dashboard',
      body: `<p>Once your project is ready, you'll see the Supabase Studio — a visual interface for your database. The left sidebar has several sections (each has a small icon):</p>
<p>🗃 <strong>Table Editor</strong> — see and edit your data like a spreadsheet<br>
�? <strong>SQL Editor</strong> — run database commands directly (advanced)<br>
🔑 <strong>Authentication</strong> — manage users and login settings<br>
📦 <strong>Storage</strong> — store files, images, documents<br>
⚡ <strong>Edge Functions</strong> — run server-side code</p>
<div class="tip-box">💡 Start with the Table Editor — it's the most visual and beginner-friendly part.</div>` },
    { title: 'Create your first database table',
      body: `<p>Think of a table like a spreadsheet — rows are records, columns are the data fields. Click <strong>Table Editor</strong> in the left sidebar (it looks like a grid icon 🗃), then click <strong>"New table"</strong>.</p>
<p>Give it a name — for example, if you're building a to-do app, call it <code>todos</code>. Supabase automatically adds an <code>id</code> column (a unique number for each row) and a <code>created_at</code> column (when it was created).</p>
<p>Click <strong>"Add column"</strong> to add your own fields. For a to-do app you might add: <code>title</code> (type: text) and <code>is_complete</code> (type: bool — meaning true/false).</p>
<p>Click <strong>"Save"</strong> when done.</p>` },
    { title: 'Get your API keys to connect your app',
      body: `<p>Your app needs two pieces of information to talk to Supabase. Click the gear icon ⚙�? at the very bottom of the left sidebar, then click <strong>"API"</strong>.</p>
<p>You'll see:</p>
<p>📋 <strong>Project URL</strong> — the address of your database (looks like <code>https://abc123.supabase.co</code>)<br>
🔑 <strong>anon public key</strong> — a safe key your frontend code can use (it's okay to put this in your app)</p>
<p>Copy both of these. In your app's code (or in a <code>.env</code> file), add them like this:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here</div>
<div class="tip-box">💡 Never share your <strong>service_role</strong> key (also shown on this page) — that key bypasses all security and should only ever be used on a secure server, never in frontend code.</div>` },
    { title: 'Install the Supabase client and make your first query',
      body: `<p>In your project terminal, install the Supabase JavaScript library:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>npm install @supabase/supabase-js</div>
<p>Then in your code, set it up and fetch data:</p>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copy</button>import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Fetch all todos
const { data, error } = await supabase
  .from('todos')
  .select('*')

console.log(data)</div>
<div class="success-box">✓ Supabase is connected! Your app can now read and write data. Next: set up Row Level Security (RLS) in the Supabase dashboard under Authentication → Policies — this controls who can see whose data.</div>` },
  ];
}


