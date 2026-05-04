
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  brief text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_submissions enable row level security;
create policy "Anyone can insert contact" on public.contact_submissions for insert with check (true);

create table public.copilot_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.copilot_messages enable row level security;
create policy "Anyone can insert copilot msg" on public.copilot_messages for insert with check (true);
create policy "Anyone can read own session" on public.copilot_messages for select using (true);
create index on public.copilot_messages(session_id, created_at);
