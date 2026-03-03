# BuildGuide â€” Full Agent Build Prompt

> Hand this entire document to your AI coding agent (Claude Code, Cursor, Copilot, etc.) as the starting brief. It is self-contained. The agent should read it fully before writing a single line of code.

---

## 1. What You Are Building

**BuildGuide** is a public-facing web application that guides non-technical people through setting up software tools, step by step, without overwhelming them.

It is a **wizard-style guided setup companion**. The user selects a goal (e.g. "I want to build a website"), answers a few preference questions (budget, speed, quality), then gets shown one tool option at a time with plain-English explanations. They can skip options, go back, see a summary of all options, choose one, and follow a step-by-step setup guide for that tool.

The current implementation is a fully working **single HTML file** (`guide-v2.html`). Your job is to take that file and turn it into a proper, production-ready web application â€” with a maintainable codebase, a database for saving progress, staging and production environments, proper security, and a full test suite.

Do **not** rewrite the UI logic from scratch. Preserve every tool definition, every step, every piece of copy, every interaction. The HTML file is the source of truth for content and UX. You are migrating and hardening it, not redesigning it.

---

## 2. Tech Stack

Use this stack exactly unless you have a specific technical reason to deviate (document the reason if you do):

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR, file-based routing, API routes, edge-ready |
| Language | **TypeScript** throughout | Type safety, better agent-assisted development |
| Styling | **Tailwind CSS** | Utility-first, consistent with the existing design |
| Database | **Supabase (PostgreSQL)** | Auth + DB + realtime + free tier; see Â§6 |
| Auth | **Supabase Auth** | Email/password + OAuth (Google) |
| Hosting | **Vercel** | Zero-config Next.js deployment, preview URLs per PR |
| Testing | **Vitest + Playwright** | Unit + integration + E2E; see Â§9 |
| CI/CD | **GitHub Actions** | Runs tests + lint + type-check on every PR |

---

## 3. Repository Structure

```
buildguide/
â”œâ”€â”€ .github/
â”‚   â”œâ”€â”€ workflows/
â”‚   â”‚   â”œâ”€â”€ ci.yml                  # Runs on every PR: lint, typecheck, unit tests, E2E
â”‚   â”‚   â””â”€â”€ deploy.yml              # Deploys main â†’ production after CI passes
â”‚   â”œâ”€â”€ agents/
â”‚   â”‚   â”œâ”€â”€ Planner.agent.md
â”‚   â”‚   â”œâ”€â”€ Builder.agent.md
â”‚   â”‚   â”œâ”€â”€ Reviewer.agent.md
â”‚   â”‚   â””â”€â”€ SecurityAuditor.agent.md
â”‚   â”œâ”€â”€ prompts/
â”‚   â”‚   â”œâ”€â”€ feature.prompt.md
â”‚   â”‚   â”œâ”€â”€ migration.prompt.md
â”‚   â”‚   â””â”€â”€ code-review.prompt.md
â”‚   â””â”€â”€ copilot-instructions.md     # AI agent hard rules (see Â§12)
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ layout.tsx
â”‚   â”œâ”€â”€ page.tsx                    # Home â€” goal selection screen
â”‚   â”œâ”€â”€ guide/
â”‚   â”‚   â”œâ”€â”€ [path]/
â”‚   â”‚   â”‚   â””â”€â”€ page.tsx            # Dynamic route per goal path
â”‚   â”‚   â””â”€â”€ layout.tsx
â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â”œâ”€â”€ progress/
â”‚   â”‚   â”‚   â””â”€â”€ route.ts            # Save/load user progress
â”‚   â”‚   â””â”€â”€ health/
â”‚   â”‚       â””â”€â”€ route.ts            # Health check endpoint
â”‚   â””â”€â”€ globals.css
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ guide/
â”‚   â”‚   â”œâ”€â”€ GoalGrid.tsx
â”‚   â”‚   â”œâ”€â”€ PriorityKnobs.tsx
â”‚   â”‚   â”œâ”€â”€ ToolCarousel.tsx
â”‚   â”‚   â”œâ”€â”€ ToolCard.tsx
â”‚   â”‚   â”œâ”€â”€ SummaryGrid.tsx
â”‚   â”‚   â”œâ”€â”€ StepGuide.tsx
â”‚   â”‚   â””â”€â”€ CompletionScreen.tsx
â”‚   â””â”€â”€ ui/
â”‚       â”œâ”€â”€ Badge.tsx
â”‚       â”œâ”€â”€ Button.tsx
â”‚       â”œâ”€â”€ CodeBlock.tsx
â”‚       â”œâ”€â”€ TipBox.tsx
â”‚       â””â”€â”€ ProgressBar.tsx
â”œâ”€â”€ lib/
â”‚   â”œâ”€â”€ supabase/
â”‚   â”‚   â”œâ”€â”€ client.ts               # Browser Supabase client
â”‚   â”‚   â”œâ”€â”€ server.ts               # Server Supabase client (SSR)
â”‚   â”‚   â””â”€â”€ middleware.ts           # Auth middleware
â”‚   â”œâ”€â”€ data/
â”‚   â”‚   â”œâ”€â”€ tools.ts                # All tool definitions (migrated from HTML)
â”‚   â”‚   â”œâ”€â”€ paths.ts                # PATH_TOOLS mapping
â”‚   â”‚   â”œâ”€â”€ steps/
â”‚   â”‚   â”‚   â”œâ”€â”€ website.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ aitools.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ localai.ts
â”‚   â”‚   â”‚   â””â”€â”€ supabase.ts
â”‚   â”‚   â””â”€â”€ types.ts                # Shared TypeScript types
â”‚   â””â”€â”€ utils/
â”‚       â”œâ”€â”€ sort.ts                 # sortToolsByPriority logic
â”‚       â””â”€â”€ progress.ts             # Progress save/load logic
â”œâ”€â”€ supabase/
â”‚   â”œâ”€â”€ migrations/
â”‚   â”‚   â””â”€â”€ 0001_initial_schema.sql
â”‚   â””â”€â”€ seed.sql
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ unit/
â”‚   â”‚   â”œâ”€â”€ sort.test.ts
â”‚   â”‚   â”œâ”€â”€ tools.test.ts
â”‚   â”‚   â””â”€â”€ progress.test.ts
â”‚   â”œâ”€â”€ integration/
â”‚   â”‚   â””â”€â”€ api/
â”‚   â”‚       â””â”€â”€ progress.test.ts
â”‚   â””â”€â”€ e2e/
â”‚       â”œâ”€â”€ website-path.spec.ts
â”‚       â”œâ”€â”€ aitools-path.spec.ts
â”‚       â””â”€â”€ summary-screen.spec.ts
â”œâ”€â”€ .env.example                    # All env var names, no values
â”œâ”€â”€ .env.local                      # Local dev secrets â€” NEVER committed
â”œâ”€â”€ .env.staging                    # Staging-specific non-secrets only
â”œâ”€â”€ .gitignore
â”œâ”€â”€ .editorconfig
â”œâ”€â”€ tailwind.config.ts
â”œâ”€â”€ tsconfig.json
â”œâ”€â”€ vitest.config.ts
â”œâ”€â”€ playwright.config.ts
â”œâ”€â”€ next.config.ts
â””â”€â”€ package.json
```

---

## 4. Content Migration

The file `guide-v2.html` contains all the tool definitions, step content, and UI logic. Migrate it as follows:

### 4.1 Tool Definitions â†’ `lib/data/tools.ts`

Extract the `TOOL_LIBRARY` object from the HTML file into a typed TypeScript module.

```typescript
// lib/data/types.ts
export type Tier = 'tbadge-free' | 'tbadge-paid' | 'tbadge-fast' | 'tbadge-quality' | 'tbadge-best' | 'tbadge-nocode'
export type MeterLevel = number // 0â€“100

export interface ToolMeters {
  cost: MeterLevel
  speed: MeterLevel
  quality: MeterLevel
}

export interface ToolDetail {
  Cost: string
  Speed: string
  'Skill needed': string
  'Best for': string
}

export interface ToolVerdict {
  type: 'good' | 'warn'
  text: string
}

export interface Step {
  title: string
  body: string // HTML string â€” preserve as-is, render with dangerouslySetInnerHTML
}

export interface Tool {
  id: string
  name: string
  icon: string
  tagline: string
  badges: Tier[]
  badgeLabels: string[]
  meters: ToolMeters
  desc: string // HTML string
  details: ToolDetail
  verdict: ToolVerdict
  steps: Step[]
  nextSteps: string[]
}
```

Do not alter any text content during migration. Copy it verbatim.

### 4.2 Steps â†’ `lib/data/steps/`

Each step generator function (`websiteSteps`, `aiToolSteps`, `localAISteps`, `supabaseSteps`) becomes its own file returning `Record<string, Step[]>`.

### 4.3 Path Mapping â†’ `lib/data/paths.ts`

The `PATH_TOOLS` object migrates directly.

### 4.4 Utility Logic â†’ `lib/utils/`

- `sortToolsByPriority()` â†’ `lib/utils/sort.ts`
- Progress save/load â†’ `lib/utils/progress.ts`
- State management â†’ React context or Zustand (prefer Zustand for this use case â€” simpler, no boilerplate)

---

## 5. New Paths to Add to the Guide

Add the following new goal paths to `PATH_TOOLS` and create the corresponding tool cards and step guides. These are the new content areas requested:

### 5.1 Databases (`path: 'database'`)

**Goal card copy:** "Set up a database â€” Store, query, and manage data for your app"

**Tools to include:**

| Tool ID | Name | Icon | Tagline |
|---|---|---|---|
| `supabase` | Supabase | âš¡ | Already exists |
| `planetscale` | PlanetScale | ðŸŒ | Serverless MySQL, branches like Git |
| `neon` | Neon | ðŸŒ¿ | Serverless Postgres, instant branching |
| `mongodb` | MongoDB Atlas | ðŸƒ | Flexible document database, generous free tier |
| `sqlite` | SQLite + Turso | ðŸª¶ | Embedded SQL, perfect for small apps |
| `redis` | Redis / Upstash | âš¡ | In-memory cache and message queue |
| `firebase` | Firebase Realtime DB | ðŸ”¥ | Simple key-value, realtime sync, Google's platform |

**Step guides to write for each:**
1. Create account / install
2. Create your first database / project
3. Understand your connection string (explain what it is, where to keep it safe)
4. Connect from your app (code snippet)
5. Run your first query
6. Set up backups / understand data retention

**Meters:** Assign cost/speed/quality scores that reflect reality:
- Supabase: cost 85, speed 80, quality 92
- Neon: cost 90, speed 85, quality 88
- PlanetScale: cost 75, speed 78, quality 90
- MongoDB Atlas: cost 80, speed 82, quality 85
- SQLite+Turso: cost 95, speed 90, quality 78
- Redis/Upstash: cost 88, speed 95, quality 85 (note: not a primary DB, a complement)
- Firebase: cost 70, speed 88, quality 75

### 5.2 Staging & Production (`path: 'deployment'`)

**Goal card copy:** "Deploy properly â€” Set up staging and production environments the right way"

**Tools/concepts to cover:**

| Tool/Concept | Description |
|---|---|
| Vercel (staging + prod) | Preview deployments per PR, production on main branch |
| Netlify (staging + prod) | Branch deploys, split testing |
| Railway | Simple staging/prod with databases included |
| Fly.io | Docker-based, full control |
| Environment separation | The concept of dev/staging/prod and why it matters |

**Step guide: "Set up staging and production on Vercel"** (primary path):
1. What staging and production mean â€” explain the concept plainly: *"Staging is a copy of your live app where you test changes before real users see them. Production is the real thing."*
2. Connect your GitHub repository to Vercel
3. Understand automatic preview deployments â€” every PR gets a unique URL
4. Set up environment variables in Vercel (staging vs production â€” different values for same keys)
5. Set up branch protection rules â€” require CI to pass before merging
6. How to promote staging to production â€” merge to main
7. Set up rollback â€” how to undo a bad deployment

### 5.3 Security (`path: 'security'`)

**Goal card copy:** "Secure your project â€” Common security mistakes and how to avoid them"

This path is different â€” it's not a tool selection, it's a sequential guide. Skip the carousel entirely for this path. Route directly to a multi-chapter step guide.

**Chapters (each is a "step"):**

1. **Never commit secrets** â€” What a secret is (API keys, database passwords, JWT secrets). How to use `.env` files. Why `.env.local` must be in `.gitignore`. What to do if you accidentally commit a secret (rotate it immediately, it's compromised forever in git history).

2. **Environment variables the right way** â€” `.env.example` contains key names, never values. `.env.local` for local dev. Separate values in staging vs production. Never hardcode strings like `"sk-ant-abc123"` directly in code.

3. **Row Level Security (RLS)** â€” What RLS is (your database's built-in access control). Why default-deny matters. A concrete example: without RLS, any logged-in user can read every other user's data. With RLS, they can only read their own. How to enable and write basic policies in Supabase.

4. **Authentication basics** â€” Never roll your own auth. Use Supabase Auth, Clerk, or NextAuth. Session tokens belong in httpOnly cookies, not localStorage. Always validate sessions server-side.

5. **Input validation** â€” Never trust data from a form or URL. Use Zod for schema validation. Validate on the server even if you validate on the client. SQL injection is still real.

6. **Dependency security** â€” Run `npm audit` regularly. Pin dependency versions in `package.json`. Review lockfile changes in PRs. Use Dependabot or Renovate for automated updates.

7. **HTTPS and headers** â€” Vercel and Netlify give you HTTPS free. Set security headers: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`. Use the `next/headers` security headers preset.

8. **Rate limiting** â€” What it is and why it matters. Use Upstash Redis + `@upstash/ratelimit` for simple rate limiting on API routes. Protect login endpoints especially.

### 5.4 Unit Testing (`path: 'testing'`)

**Goal card copy:** "Write tests â€” Make sure your code works and keeps working"

**Tools to include:**

| Tool | Role |
|---|---|
| Vitest | Fast unit tests for TypeScript/JavaScript |
| Jest | The classic â€” widely used, lots of resources |
| Playwright | End-to-end browser tests |
| Testing Library | Test React components the right way |
| MSW (Mock Service Worker) | Mock API calls in tests |

**Step guide: "Set up Vitest for your project"** (primary path):
1. What tests are for â€” explain with an analogy: *"A test is like an automated checklist. Instead of manually clicking through your app every time you change something, tests do it for you in seconds."*
2. Install Vitest
3. Write your first test â€” a simple pure function (e.g. a price formatter)
4. Write your first component test with Testing Library
5. Run tests and read the output
6. Set up CI to run tests on every PR (GitHub Actions snippet)

### 5.5 Best Practices (`path: 'bestpractices'`)

**Goal card copy:** "Best practices â€” The habits that separate a hobby project from a professional one"

This path is also sequential â€” no carousel. A direct multi-step guide covering:

1. **No hardcoded values** â€” What hardcoding means. Examples: `const API_URL = "https://api.mysite.com"` should be `process.env.NEXT_PUBLIC_API_URL`. Magic numbers should be named constants. Strings that appear in multiple places should be a single variable.

2. **Never commit `.env` files** â€” Your `.gitignore` must include `.env*` (except `.env.example`). Add it before your first commit, not after. Use `git rm --cached .env` if you accidentally added it already.

3. **Use TypeScript, not `any`** â€” Every `any` is a lie to the compiler. Use `unknown` for genuinely unknown types, then narrow it. Use Zod to derive TypeScript types from runtime validation schemas.

4. **Consistent error handling** â€” Never swallow errors silently with empty catch blocks. Every async function should handle its errors explicitly. Define a standard error response shape for your API and stick to it.

5. **Commit messages that explain why, not what** â€” `fix: prevent user data leak in /api/profile` is useful. `update stuff` is useless. Use Conventional Commits format: `feat:`, `fix:`, `chore:`, `docs:`, `test:`.

6. **Linting and formatting** â€” ESLint + Prettier. Run them in CI. Configure pre-commit hooks with `husky` + `lint-staged` so lint errors never reach the repo.

7. **Keep secrets out of logs** â€” Never `console.log(user)` if user contains passwords or tokens. Redact sensitive fields before logging. In production, use a structured logging library (e.g. `pino`).

8. **Review dependency lockfiles** â€” When you see a lockfile change in a PR, read it. New or updated packages should be intentional. Unexpected lockfile changes can be a supply chain attack vector.

9. **Principle of least privilege** â€” Your frontend code should have the minimum permissions it needs. Service accounts should have read-only access unless they specifically need to write. Supabase `anon` key is fine for frontend; `service_role` key must stay server-side only.

10. **Document your decisions** â€” A short `docs/` folder with `architecture.md`, `decisions.md` (why you chose each tool), and `environments.md` is worth its weight in gold six months later.

---

## 6. Database Schema

Create migrations in `supabase/migrations/`. All schema changes must be migrations â€” never use the Supabase dashboard to modify production schema directly.

```sql
-- 0001_initial_schema.sql

-- User progress: saves where a user is in their guide
create table if not exists public.user_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  session_id  text,                    -- for anonymous users without accounts
  path        text not null,           -- e.g. 'website', 'aitools'
  tool_id     text,                    -- e.g. 'framer', 'cursor'
  step_index  integer default 0,
  priorities  jsonb,                   -- { cost: 'free', speed: 'fast', quality: 'high' }
  completed   boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- RLS: users can only read/write their own progress
alter table public.user_progress enable row level security;

create policy "Users can read own progress"
  on public.user_progress for select
  using (auth.uid() = user_id or session_id = current_setting('app.session_id', true));

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id or session_id is not null);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id or session_id = current_setting('app.session_id', true));

-- Tool completions: which guides has a user finished
create table if not exists public.completions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  session_id  text,
  tool_id     text not null,
  path        text not null,
  completed_at timestamptz default now()
);

alter table public.completions enable row level security;

create policy "Users can read own completions"
  on public.completions for select
  using (auth.uid() = user_id);

create policy "Users can insert own completions"
  on public.completions for insert
  with check (auth.uid() = user_id);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger user_progress_updated_at
  before update on public.user_progress
  for each row execute function update_updated_at();
```

---

## 7. Environment Configuration

### 7.1 `.env.example` (commit this)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # Server-side only â€” never expose to browser

# App
NEXT_PUBLIC_APP_URL=              # e.g. https://buildguide.app
NEXT_PUBLIC_APP_ENV=              # 'development' | 'staging' | 'production'

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

### 7.2 `.gitignore` (must include)

```
.env
.env.local
.env.staging
.env.production
.env*.local
```

**Never commit any file containing real secrets, even temporarily.**

### 7.3 Staging vs Production Environment Variables

Set in Vercel dashboard under Project Settings â†’ Environment Variables:

- `NEXT_PUBLIC_APP_ENV=staging` on the `staging` branch
- `NEXT_PUBLIC_APP_ENV=production` on the `main` branch
- Separate Supabase project for staging (different URL and keys)
- Staging Supabase project contains no real user data

---

## 8. Environments Setup

### 8.1 Local Development
- `.env.local` â€” local Supabase project or Supabase local dev server
- Run Supabase locally: `npx supabase start`
- All dev work happens against local or a dedicated dev Supabase project

### 8.2 Staging
- Vercel preview deployment triggered automatically on every PR to `main`
- Or: a dedicated `staging` branch that deploys to a fixed staging URL
- Separate Supabase project: `buildguide-staging`
- Staging URL example: `staging.buildguide.app`
- Purpose: test the full stack before merging to production

### 8.3 Production
- Deployed from `main` branch only
- Requires CI to pass (lint + typecheck + unit tests + E2E)
- Separate Supabase project: `buildguide-prod`
- Production URL: `buildguide.app`
- Never test features directly in production

### 8.4 Branch Protection Rules (set up in GitHub)

```
Branch: main
- Require pull request before merging
- Require status checks to pass: ci / test, ci / lint, ci / typecheck
- Require at least 1 review
- Do not allow bypassing the above settings
```

---

## 9. Testing

### 9.1 Unit Tests (`tests/unit/`)

Write unit tests for all pure functions:

```typescript
// tests/unit/sort.test.ts
import { describe, it, expect } from 'vitest'
import { sortToolsByPriority } from '@/lib/utils/sort'

describe('sortToolsByPriority', () => {
  it('puts free tools first when cost=free', () => {
    const tools = ['cursor', 'framer', 'githubpages']
    const priorities = { cost: 'free', speed: 'medium', quality: 'medium' }
    const sorted = sortToolsByPriority(tools, priorities)
    // githubpages (cost:100) should come before cursor (cost:55)
    expect(sorted.indexOf('githubpages')).toBeLessThan(sorted.indexOf('cursor'))
  })

  it('puts high quality tools first when quality=high', () => { ... })
  it('handles empty tool list', () => { ... })
  it('handles tools not in TOOL_LIBRARY gracefully', () => { ... })
})

// tests/unit/tools.test.ts
describe('TOOL_LIBRARY', () => {
  it('every tool has required fields', () => { ... })
  it('every tool has at least one step', () => { ... })
  it('meter values are between 0 and 100', () => { ... })
  it('every tool referenced in PATH_TOOLS exists in TOOL_LIBRARY', () => { ... })
})
```

### 9.2 Integration Tests (`tests/integration/`)

```typescript
// tests/integration/api/progress.test.ts
describe('POST /api/progress', () => {
  it('saves progress for an anonymous session', () => { ... })
  it('requires session_id or auth token', () => { ... })
  it('returns 400 for invalid path', () => { ... })
  it('returns 405 for GET requests', () => { ... })
})
```

### 9.3 End-to-End Tests (`tests/e2e/`)

```typescript
// tests/e2e/website-path.spec.ts
import { test, expect } from '@playwright/test'

test('user can complete the website path with Framer', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="goal-card-website"]')
  // set priorities
  await page.click('[data-testid="knob-cost-free"]')
  await page.click('[data-testid="knob-speed-fast"]')
  await page.click('[data-testid="knob-quality-medium"]')
  await page.click('[data-testid="pri-continue"]')
  // Framer should be first (free + fast)
  await expect(page.locator('[data-testid="tool-name"]')).toContainText('Framer')
  await page.click('[data-testid="car-choose"]')
  // step through all steps
  const steps = await page.locator('[data-testid="steps-next-btn"]').count()
  for (let i = 0; i < steps - 1; i++) {
    await page.click('[data-testid="steps-next-btn"]')
  }
  await expect(page.locator('[data-testid="done-title"]')).toBeVisible()
})

test('user can skip tools and reach the summary screen', async ({ page }) => { ... })
test('back navigation works correctly throughout the flow', async ({ page }) => { ... })
test('progress is saved and restored on page reload', async ({ page }) => { ... })
```

Add `data-testid` attributes to all interactive elements during the component build. This is non-optional.

### 9.4 CI Configuration (`.github/workflows/ci.yml`)

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.STAGING_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.STAGING_SUPABASE_ANON_KEY }}

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.STAGING_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.STAGING_SUPABASE_ANON_KEY }}
          NEXT_PUBLIC_APP_URL: http://localhost:3000
```

---

## 10. Security Requirements

These are non-negotiable. The agent must implement all of them.

### 10.1 Secrets Management
- `SUPABASE_SERVICE_ROLE_KEY` must never appear in client-side code or be logged
- All API routes that use the service role key must run server-side only
- Add a lint rule or CI check that fails if `SUPABASE_SERVICE_ROLE_KEY` appears in any `app/` component file

### 10.2 Row Level Security
- Every table in Supabase must have RLS enabled with a default-deny policy
- No table may have RLS disabled in the production migration
- A migration that disables RLS should fail the PR review

### 10.3 Input Validation
- Use **Zod** for all API route input validation
- All user-supplied input (query params, request bodies, path params) is validated before use
- Return a `400` with a schema error, never pass unvalidated input to the database

```typescript
// app/api/progress/route.ts
import { z } from 'zod'

const ProgressSchema = z.object({
  path: z.enum(['website', 'aitools', 'localai', 'webapp', 'chatbot',
                 'automation', 'mobileapp', 'database', 'deployment',
                 'security', 'testing', 'bestpractices', 'notsure']),
  tool_id: z.string().max(50).optional(),
  step_index: z.number().int().min(0).max(50),
  priorities: z.object({
    cost: z.enum(['free', 'low', 'any']),
    speed: z.enum(['fast', 'medium', 'slow']),
    quality: z.enum(['high', 'medium', 'basic']),
  }).optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = ProgressSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  // proceed with parsed.data
}
```

### 10.4 Security Headers (`next.config.ts`)

```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',        value: 'on' },
  { key: 'X-Frame-Options',               value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',        value: 'nosniff' },
  { key: 'Referrer-Policy',               value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',            value: 'camera=(), microphone=(), geolocation=()' },
]
```

### 10.5 Rate Limiting

Apply rate limiting to all API routes using Upstash Redis:

```typescript
// lib/utils/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
})
```

---

## 11. Best Practices to Enforce Throughout

The agent must follow these in every file it creates. Failure to do so is a build error.

| Rule | Implementation |
|---|---|
| No hardcoded strings | All URLs, keys, feature flags, and repeated strings are env vars or named constants |
| No `.env` files committed | `.gitignore` covers `*.env*` except `.env.example` |
| No `any` in TypeScript | `strict: true` in `tsconfig.json`; ESLint rule `@typescript-eslint/no-explicit-any: error` |
| No empty catch blocks | ESLint rule `no-empty: error`; `no-empty-catch` |
| No `console.log` in production | ESLint rule `no-console: warn`; use structured logging in API routes |
| No secrets in logs | Never log request bodies, user objects, or env vars |
| No direct DB access from components | All DB access goes through API routes or server actions |
| Validate all external input | Zod on all API routes; never access `req.body` without parsing |
| No `// @ts-ignore` | Use proper types; `@ts-ignore` is a PR rejection |
| Migrations only, no dashboard SQL | Document this in `CLAUDE.md` / `copilot-instructions.md` |
| `data-testid` on all interactive elements | Required for E2E tests |

---

## 12. AI Agent Instructions (`copilot-instructions.md` / `CLAUDE.md`)

Create both files with this content (the first for GitHub Copilot, the second for Claude Code):

```markdown
# Project: BuildGuide

## What this is
A guided setup wizard for non-technical users. Helps people choose and set up software tools.

## Hard rules â€” never violate these
- Never commit .env files. Add to .gitignore before first commit.
- Never hardcode API keys, URLs, or secrets in source code.
- All schema changes via Supabase migrations only â€” never use the dashboard to alter production schema.
- RLS must be enabled on every Supabase table. Default deny.
- Never use TypeScript `any`. Use `unknown` and narrow it.
- Never log sensitive data (passwords, tokens, user PII).
- SUPABASE_SERVICE_ROLE_KEY is server-side only â€” never reference it in app/ components.
- All API routes must validate input with Zod before processing.
- All API routes must be rate limited.
- Every interactive element needs a data-testid attribute.
- No @ts-ignore comments. Fix the type properly.
- Run `npm run check` before every commit. If it fails, don't commit.

## Scripts
- `npm run dev` â€” local dev server
- `npm run build` â€” production build
- `npm run lint` â€” ESLint
- `npm run typecheck` â€” TypeScript check (no emit)
- `npm run test:unit` â€” Vitest unit tests
- `npm run test:e2e` â€” Playwright E2E tests
- `npm run check` â€” runs lint + typecheck + test:unit in sequence

## Architecture
- Next.js App Router. No Pages Router.
- All tool content lives in lib/data/. Never in components.
- State: Zustand store for guide flow state.
- DB: Supabase. Use server client in Server Components and API routes; browser client in Client Components.
- Styling: Tailwind CSS only. No inline styles except for dynamic values.

## Content rule
Never alter the text content of tool descriptions, step guides, or UI copy without explicit instruction.
The content in lib/data/ is the source of truth. Treat it as read-only unless specifically asked to change it.
```

---

## 13. `package.json` Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:integration": "vitest run tests/integration",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "db:start": "supabase start",
    "db:stop": "supabase stop",
    "db:migrate": "supabase db push",
    "db:generate-types": "supabase gen types typescript --local > lib/supabase/database.types.ts",
    "check": "npm run lint && npm run typecheck && npm run test:unit"
  }
}
```

---

## 14. Build Order

Follow this order. Do not skip phases. Commit after each phase with a clear message.

```
Phase 1: Project scaffold
  - next.js init, tsconfig strict, tailwind, eslint, prettier
  - .gitignore (includes .env*)
  - .env.example with all keys
  - CLAUDE.md + copilot-instructions.md
  - package.json scripts
  commit: "chore: scaffold project with Next.js, TypeScript, Tailwind"

Phase 2: Data layer
  - lib/data/types.ts
  - lib/data/tools.ts (migrated from guide-v2.html)
  - lib/data/paths.ts
  - lib/data/steps/*.ts (all step content)
  - lib/utils/sort.ts
  - Unit tests for all of the above
  commit: "feat: migrate tool library and step content from HTML prototype"

Phase 3: Database
  - Supabase local setup
  - supabase/migrations/0001_initial_schema.sql
  - lib/supabase/client.ts + server.ts
  - API routes: /api/progress, /api/health
  - Integration tests for API routes
  commit: "feat: add Supabase schema, client, and progress API"

Phase 4: UI components
  - All components in components/guide/ and components/ui/
  - Preserve all UX logic exactly as in guide-v2.html
  - Add data-testid to every interactive element
  - Zustand store for guide state
  commit: "feat: implement guide UI components from HTML prototype"

Phase 5: Pages and routing
  - app/page.tsx (home)
  - app/guide/[path]/page.tsx
  - app/layout.tsx
  commit: "feat: implement pages and routing"

Phase 6: Testing
  - E2E tests for all guide paths
  - Fix any failures
  commit: "test: add Playwright E2E tests for guide flows"

Phase 7: Security hardening
  - Security headers in next.config.ts
  - Rate limiting on all API routes
  - Audit: check no secrets in code, no RLS disabled, Zod on all routes
  commit: "security: add headers, rate limiting, input validation audit"

Phase 8: CI/CD
  - .github/workflows/ci.yml
  - .github/workflows/deploy.yml
  - Verify CI passes on a test PR
  commit: "ci: add GitHub Actions for lint, typecheck, test, deploy"
```

---

## 15. Definition of Done

The project is done when:

- [ ] `npm run check` passes with zero errors or warnings
- [ ] All unit tests pass
- [ ] All E2E tests pass against the staging deployment
- [ ] No `.env` files are committed (verify with `git ls-files | grep -E '\.env'`)
- [ ] No hardcoded secrets anywhere (`grep -r "sk-ant\|eyJ\|postgres://" src/` returns nothing)
- [ ] Every Supabase table has RLS enabled (verify in Supabase dashboard â†’ Authentication â†’ Policies)
- [ ] Staging and production are separate Supabase projects
- [ ] A PR to `main` cannot be merged without CI passing
- [ ] The guide works end-to-end: home â†’ priorities â†’ carousel â†’ summary â†’ step guide â†’ completion
- [ ] All new paths from Â§5 (databases, staging, security, testing, best practices) are complete with tool cards and step guides
- [ ] `npm run db:generate-types` runs without error and produces a valid types file

---

## 16. Appendix: Source File

The complete working prototype is in `guide-v2.html`. This is attached alongside this prompt. All tool IDs, tool content, step content, and UX flows in that file are the source of truth. Do not invent tool definitions or step content â€” migrate and extend what is already there.

When in doubt about what the UI should look like or how a flow should work: open `guide-v2.html` in a browser and follow it.
```

