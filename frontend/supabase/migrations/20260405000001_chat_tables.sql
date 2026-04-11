-- ============================================================
-- Chat tables: chat_sessions, chat_messages
-- ============================================================

-- Chat sessions
create table if not exists public.chat_sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete set null,
  guest_name   text,
  guest_email  text,
  status       text not null default 'open' check (status in ('open', 'closed')),
  assigned_to  uuid references auth.users(id) on delete set null,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Chat messages
create table if not exists public.chat_messages (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid references public.chat_sessions(id) on delete cascade not null,
  sender_id    uuid references auth.users(id) on delete set null,
  sender_role  text not null default 'customer' check (sender_role in ('customer', 'agent', 'bot')),
  body         text not null,
  is_read      boolean not null default false,
  created_at   timestamptz default now()
);

-- Indexes
create index if not exists idx_chat_sessions_status    on public.chat_sessions(status);
create index if not exists idx_chat_sessions_user      on public.chat_sessions(user_id);
create index if not exists idx_chat_messages_session   on public.chat_messages(session_id);
create index if not exists idx_chat_messages_created   on public.chat_messages(created_at);

-- RLS
alter table public.chat_sessions enable row level security;
alter table public.chat_messages  enable row level security;

-- Updated_at trigger for chat_sessions
create or replace function public.update_chat_session_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger chat_sessions_updated_at
  before update on public.chat_sessions
  for each row execute function public.update_chat_session_updated_at();

-- Chat sessions policies
-- Anyone can insert (guest or authenticated)
create policy "Anyone can create chat session" on public.chat_sessions
  for insert with check (true);

-- Users see their own sessions, guests see all open (session_id tracked client-side)
create policy "Users view own chat sessions" on public.chat_sessions
  for select using (
    auth.uid() = user_id
    or user_id is null  -- guest sessions readable by anyone (controlled by session_id knowledge)
  );

-- Users can update their own session (e.g., close it)
create policy "Users update own chat session" on public.chat_sessions
  for update using (auth.uid() = user_id or user_id is null);

-- Admins manage all sessions
create policy "Admins manage all chat sessions" on public.chat_sessions
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Chat messages policies
-- Anyone can insert messages into a session (customer or agent)
create policy "Anyone can send chat message" on public.chat_messages
  for insert with check (true);

-- Messages visible to session participants
create policy "Session participants can read messages" on public.chat_messages
  for select using (true);  -- controlled at app layer via session_id

-- Admins manage all messages
create policy "Admins manage all chat messages" on public.chat_messages
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Enable realtime for chat_messages
alter publication supabase_realtime add table public.chat_messages;
alter publication supabase_realtime add table public.chat_sessions;
