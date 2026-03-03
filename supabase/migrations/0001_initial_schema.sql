-- 0001_initial_schema.sql

create extension if not exists "pgcrypto";

create table if not exists public.user_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  session_id  text,
  path        text not null,
  tool_id     text,
  step_index  integer default 0,
  priorities  jsonb,
  completed   boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

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

create table if not exists public.completions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade,
  session_id   text,
  tool_id      text not null,
  path         text not null,
  completed_at timestamptz default now()
);

alter table public.completions enable row level security;

create policy "Users can read own completions"
  on public.completions for select
  using (auth.uid() = user_id or session_id = current_setting('app.session_id', true));

create policy "Users can insert own completions"
  on public.completions for insert
  with check (auth.uid() = user_id or session_id = current_setting('app.session_id', true));

create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger user_progress_updated_at
  before update on public.user_progress
  for each row execute function public.update_updated_at();

