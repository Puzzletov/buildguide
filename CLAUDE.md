# Project: BuildGuide

## What this is
A guided setup wizard for non-technical users. Helps people choose and set up software tools.

## Hard rules - never violate these
- Never commit .env files. Add to .gitignore before first commit.
- Never hardcode API keys, URLs, or secrets in source code.
- All schema changes via Supabase migrations only - never use the dashboard to alter production schema.
- RLS must be enabled on every Supabase table. Default deny.
- Never use TypeScript `any`. Use `unknown` and narrow it.
- Never log sensitive data (passwords, tokens, user PII).
- SUPABASE_SERVICE_ROLE_KEY is server-side only - never reference it in app/ components.
- All API routes must validate input with Zod before processing.
- All API routes must be rate limited.
- Every interactive element needs a data-testid attribute.
- No @ts-ignore comments. Fix the type properly.
- Run `npm run check` before every commit. If it fails, don't commit.

## Scripts
- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript check (no emit)
- `npm run test:unit` - Vitest unit tests
- `npm run test:e2e` - Playwright E2E tests
- `npm run check` - runs lint + typecheck + test:unit in sequence

## Architecture
- Next.js App Router. No Pages Router.
- All tool content lives in lib/data/. Never in components.
- State: Zustand store for guide flow state.
- DB: Supabase. Use server client in Server Components and API routes; browser client in Client Components.
- Styling: Tailwind CSS only. No inline styles except for dynamic values.

## Content rule
Never alter the text content of tool descriptions, step guides, or UI copy without explicit instruction.
The content in lib/data/ is the source of truth. Treat it as read-only unless specifically asked to change it.

