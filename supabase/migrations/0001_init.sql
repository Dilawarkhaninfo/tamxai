-- ─────────────────────────────────────────────────────────────────────────────
-- TAMx — Initial Schema
-- ─────────────────────────────────────────────────────────────────────────────

-- Enums
create type public.user_role      as enum ('admin', 'editor', 'viewer');
create type public.user_status    as enum ('active', 'inactive', 'suspended');
create type public.post_status    as enum ('published', 'draft', 'scheduled', 'archived');
create type public.project_status as enum ('published', 'draft', 'archived');
create type public.submission_status as enum ('new', 'in_review', 'contacted', 'closed');
create type public.booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
create type public.media_kind     as enum ('image', 'vector', 'document', 'video', 'code', 'audio', 'other');

-- ── Profiles (1:1 with auth.users) ───────────────────────────────────────────
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text unique not null,
  full_name     text not null,
  role          public.user_role   not null default 'viewer',
  status        public.user_status not null default 'active',
  avatar_url    text,
  last_login_at timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index profiles_role_idx on public.profiles(role);

-- ── Services & capabilities ───────────────────────────────────────────────────
create table public.services (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique not null,
  icon         text not null,
  href         text not null default '/services',
  description  text not null,
  is_published boolean not null default true,
  position     int  not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index services_published_pos_idx on public.services(is_published, position);

create table public.service_capabilities (
  id         uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  label      text not null,
  position   int  not null default 0
);
create index service_capabilities_svc_idx on public.service_capabilities(service_id, position);

-- ── Products ──────────────────────────────────────────────────────────────────
create table public.products (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique not null,
  icon         text not null,
  href         text not null,
  description  text not null,
  is_published boolean not null default true,
  position     int  not null default 0,
  hero_image   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── Pricing ───────────────────────────────────────────────────────────────────
create table public.pricing_plans (
  id            uuid primary key default gen_random_uuid(),
  plan_name     text not null,
  description   text not null default '',
  price         text not null,
  currency      text not null default 'USD',
  billing_cycle text not null default 'month',
  button_text   text not null default 'Get Started',
  is_popular    boolean not null default false,
  is_active     boolean not null default true,
  position      int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table public.plan_features (
  id       uuid primary key default gen_random_uuid(),
  plan_id  uuid not null references public.pricing_plans(id) on delete cascade,
  label    text not null,
  position int  not null default 0
);
create index plan_features_plan_idx on public.plan_features(plan_id, position);

-- ── Blog ─────────────────────────────────────────────────────────────────────
create table public.blog_categories (
  id       uuid primary key default gen_random_uuid(),
  name     text unique not null,
  slug     text unique not null,
  position int not null default 0
);

create table public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  category_id  uuid references public.blog_categories(id) on delete set null,
  cover_url    text,
  author_id    uuid references public.profiles(id) on delete set null,
  author_name  text not null,
  excerpt      text not null default '',
  content_html text not null default '',
  read_minutes int  not null default 5,
  status       public.post_status not null default 'draft',
  is_featured  boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index blog_posts_status_idx    on public.blog_posts(status, published_at desc);
create index blog_posts_category_idx  on public.blog_posts(category_id);
create index blog_posts_featured_idx  on public.blog_posts(is_featured) where is_featured;

-- ── Team members ─────────────────────────────────────────────────────────────
create table public.team_members (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  role        text not null,
  company     text not null default 'TAMx',
  category    text not null default 'Leadership',
  description text not null default '',
  quote       text,
  is_founder  boolean not null default false,
  avatar_url  text,
  position    int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Projects (portfolio) ─────────────────────────────────────────────────────
create table public.projects (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique not null,
  industry     text not null,
  description  text not null default '',
  cover_url    text,
  status       public.project_status not null default 'draft',
  published_at timestamptz,
  position     int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table public.project_images (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url        text not null,
  alt        text,
  position   int not null default 0
);

-- ── Testimonials ─────────────────────────────────────────────────────────────
create table public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text not null,
  company    text not null,
  body       text not null,
  rating     int  not null default 5 check (rating between 1 and 5),
  avatar_url text,
  position   int not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── FAQ ───────────────────────────────────────────────────────────────────────
create table public.faq_items (
  id        uuid primary key default gen_random_uuid(),
  question  text not null,
  answer    text not null,
  position  int not null default 0,
  is_active boolean not null default true
);

-- ── Media assets ─────────────────────────────────────────────────────────────
create table public.media_assets (
  id          uuid primary key default gen_random_uuid(),
  bucket      text not null default 'media',
  path        text not null,
  filename    text not null,
  mime        text not null,
  kind        public.media_kind not null,
  size_bytes  bigint not null,
  width       int,
  height      int,
  alt_text    text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now(),
  unique(bucket, path)
);
create index media_assets_kind_idx on public.media_assets(kind);

-- ── Site settings (singleton) ────────────────────────────────────────────────
create table public.site_settings (
  id               int primary key default 1 check (id = 1),
  contact_email    text not null default 'info@tamxai.com',
  contact_phone    text not null default '+92 3353898844',
  contact_address  text not null default 'Regional Plan 9, NASTP, Islamabad, PK',
  social_linkedin  text,
  social_instagram text,
  social_facebook  text,
  social_twitter   text,
  meta_title       text,
  meta_description text,
  updated_at       timestamptz not null default now(),
  updated_by       uuid references public.profiles(id) on delete set null
);
insert into public.site_settings(id) values (1) on conflict do nothing;

-- ── Trusted clients ───────────────────────────────────────────────────────────
create table public.trusted_clients (
  id        text primary key,
  name      text not null,
  logo_url  text,
  position  int not null default 0,
  is_active boolean not null default true
);

-- ── Contact submissions ───────────────────────────────────────────────────────
create table public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text not null,
  email        text not null,
  phone        text,
  country_code text,
  service      text,
  budget       text,
  message      text not null,
  status       public.submission_status not null default 'new',
  source       text default 'contact_page',
  created_at   timestamptz not null default now()
);
create index contact_submissions_status_idx on public.contact_submissions(status, created_at desc);

-- ── Meeting bookings ──────────────────────────────────────────────────────────
create table public.meeting_bookings (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  email        text not null,
  company      text,
  topic        text not null default 'Strategy Consultation',
  scheduled_at timestamptz not null,
  duration_min int not null default 30,
  notes        text,
  status       public.booking_status not null default 'pending',
  created_at   timestamptz not null default now()
);
create index meeting_bookings_when_idx on public.meeting_bookings(scheduled_at);

-- ── Activity log ─────────────────────────────────────────────────────────────
create table public.activity_log (
  id         bigint generated always as identity primary key,
  actor_id   uuid references public.profiles(id) on delete set null,
  actor_name text,
  entity     text not null,
  entity_id  uuid,
  action     text not null,
  meta       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index activity_log_recent_idx on public.activity_log(created_at desc);

-- ─────────────────────────────────────────────────────────────────────────────
-- Universal updated_at trigger
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'profiles','services','products','pricing_plans',
    'blog_posts','team_members','projects','site_settings'
  ] loop
    execute format(
      'create trigger trg_%I_updated_at
       before update on public.%I
       for each row execute function public.tg_set_updated_at();', t, t);
  end loop;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Auto-create profile on new auth user
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.tg_handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'viewer'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.tg_handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- Helper: get current user's role from profiles (NOT from JWT metadata)
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.current_user_role()
returns public.user_role language sql stable security definer set search_path = ''
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Enable RLS on every table
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.profiles           enable row level security;
alter table public.services           enable row level security;
alter table public.service_capabilities enable row level security;
alter table public.products           enable row level security;
alter table public.pricing_plans      enable row level security;
alter table public.plan_features      enable row level security;
alter table public.blog_categories    enable row level security;
alter table public.blog_posts         enable row level security;
alter table public.team_members       enable row level security;
alter table public.projects           enable row level security;
alter table public.project_images     enable row level security;
alter table public.testimonials       enable row level security;
alter table public.faq_items          enable row level security;
alter table public.media_assets       enable row level security;
alter table public.site_settings      enable row level security;
alter table public.trusted_clients    enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.meeting_bookings   enable row level security;
alter table public.activity_log       enable row level security;

-- ─────────────────────────────────────────────────────────────────────────────
-- RLS policies
-- ─────────────────────────────────────────────────────────────────────────────

-- Profiles: own row + admin full access
create policy "profiles_own_read"    on public.profiles for select using (id = auth.uid());
create policy "profiles_admin_read"  on public.profiles for select using (public.current_user_role() = 'admin');
create policy "profiles_own_update"  on public.profiles for update using (id = auth.uid());
create policy "profiles_admin_all"   on public.profiles for all using (public.current_user_role() = 'admin');

-- Public readable content (anon + auth)
create policy "services_public_read"      on public.services           for select using (is_published = true);
create policy "services_admin_all"        on public.services           for all   using (public.current_user_role() in ('admin','editor'));
create policy "capabilities_public_read"  on public.service_capabilities for select using (true);
create policy "capabilities_admin_all"    on public.service_capabilities for all   using (public.current_user_role() in ('admin','editor'));

create policy "products_public_read"      on public.products           for select using (is_published = true);
create policy "products_admin_all"        on public.products           for all   using (public.current_user_role() in ('admin','editor'));

create policy "plans_public_read"         on public.pricing_plans      for select using (is_active = true);
create policy "plans_admin_all"           on public.pricing_plans      for all   using (public.current_user_role() in ('admin','editor'));
create policy "features_public_read"      on public.plan_features      for select using (true);
create policy "features_admin_all"        on public.plan_features      for all   using (public.current_user_role() in ('admin','editor'));

create policy "categories_public_read"    on public.blog_categories    for select using (true);
create policy "categories_admin_all"      on public.blog_categories    for all   using (public.current_user_role() in ('admin','editor'));

create policy "posts_public_read"         on public.blog_posts         for select using (status = 'published' and published_at <= now());
create policy "posts_admin_read"          on public.blog_posts         for select using (public.current_user_role() in ('admin','editor','viewer'));
create policy "posts_admin_write"         on public.blog_posts         for all    using (public.current_user_role() in ('admin','editor'));

create policy "team_public_read"          on public.team_members       for select using (is_active = true);
create policy "team_admin_all"            on public.team_members       for all   using (public.current_user_role() in ('admin','editor'));

create policy "projects_public_read"      on public.projects           for select using (status = 'published');
create policy "projects_admin_read"       on public.projects           for select using (public.current_user_role() in ('admin','editor','viewer'));
create policy "projects_admin_write"      on public.projects           for all    using (public.current_user_role() in ('admin','editor'));
create policy "proj_images_public_read"   on public.project_images     for select using (true);
create policy "proj_images_admin_all"     on public.project_images     for all   using (public.current_user_role() in ('admin','editor'));

create policy "testimonials_public_read"  on public.testimonials       for select using (is_active = true);
create policy "testimonials_admin_all"    on public.testimonials       for all   using (public.current_user_role() in ('admin','editor'));

create policy "faq_public_read"           on public.faq_items          for select using (is_active = true);
create policy "faq_admin_all"             on public.faq_items          for all   using (public.current_user_role() in ('admin','editor'));

create policy "media_admin_read"          on public.media_assets       for select using (public.current_user_role() in ('admin','editor','viewer'));
create policy "media_admin_write"         on public.media_assets       for all   using (public.current_user_role() in ('admin','editor'));

create policy "settings_public_read"      on public.site_settings      for select using (true);
create policy "settings_admin_write"      on public.site_settings      for all   using (public.current_user_role() = 'admin');

create policy "clients_public_read"       on public.trusted_clients    for select using (is_active = true);
create policy "clients_admin_all"         on public.trusted_clients    for all   using (public.current_user_role() in ('admin','editor'));

-- Submissions: anon can insert; admin/editor can read+update
create policy "contact_public_insert"     on public.contact_submissions for insert with check (true);
create policy "contact_admin_read"        on public.contact_submissions for select using (public.current_user_role() in ('admin','editor'));
create policy "contact_admin_update"      on public.contact_submissions for update using (public.current_user_role() in ('admin','editor'));
create policy "bookings_public_insert"    on public.meeting_bookings    for insert with check (true);
create policy "bookings_admin_read"       on public.meeting_bookings    for select using (public.current_user_role() in ('admin','editor'));

-- Activity log: authenticated writes; admin/editor/viewer reads
create policy "activity_admin_read"       on public.activity_log for select using (public.current_user_role() in ('admin','editor','viewer'));
create policy "activity_auth_insert"      on public.activity_log for insert with check (auth.uid() is not null);
