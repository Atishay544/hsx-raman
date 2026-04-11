-- ============================================================
-- Admin-required tables: coupons, announcements, reviews
-- Plus: tracking_number on orders
-- ============================================================

-- Add tracking_number to orders if not present
alter table public.orders add column if not exists tracking_number text;

-- Coupons
create table if not exists public.coupons (
  id          uuid primary key default gen_random_uuid(),
  code        text unique not null,
  type        text not null default 'percent' check (type in ('percent', 'fixed')),
  value       numeric(10,2) not null check (value > 0),
  min_order   numeric(10,2) default 0,
  uses_count  integer not null default 0,
  max_uses    integer,
  expires_at  timestamptz,
  is_active   boolean not null default true,
  created_at  timestamptz default now()
);

-- Announcements
create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  message     text not null,
  link_url    text,
  link_text   text,
  bg_color    text not null default '#000000',
  text_color  text not null default '#ffffff',
  is_active   boolean not null default true,
  expires_at  timestamptz,
  sort_order  integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Reviews
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid references public.products(id) on delete cascade not null,
  user_id     uuid references auth.users(id) on delete cascade not null,
  rating      integer not null check (rating between 1 and 5),
  comment     text,
  is_approved boolean not null default false,
  is_rejected boolean not null default false,
  created_at  timestamptz default now(),
  unique(product_id, user_id)
);

-- Indexes
create index if not exists idx_coupons_code     on public.coupons(code);
create index if not exists idx_coupons_active   on public.coupons(is_active);
create index if not exists idx_announcements_active on public.announcements(is_active);
create index if not exists idx_reviews_product  on public.reviews(product_id);
create index if not exists idx_reviews_approved on public.reviews(is_approved);

-- RLS
alter table public.coupons       enable row level security;
alter table public.announcements enable row level security;
alter table public.reviews       enable row level security;

-- Coupons: public read active, admin all
create policy "Public read active coupons" on public.coupons
  for select using (is_active = true);
create policy "Admins manage coupons" on public.coupons for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Announcements: public read active, admin all
create policy "Public read active announcements" on public.announcements
  for select using (is_active = true);
create policy "Admins manage announcements" on public.announcements for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Reviews: approved visible publicly, users insert own, admins manage all
create policy "Public read approved reviews" on public.reviews
  for select using (is_approved = true);
create policy "Users insert own review" on public.reviews
  for insert with check (auth.uid() = user_id);
create policy "Users view own reviews" on public.reviews
  for select using (auth.uid() = user_id);
create policy "Admins manage reviews" on public.reviews for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
