# BACKEND_ADMIN_DASHBOARD.md
**Project:** TAMx — Dynamic Backend & Admin Dashboard Blueprint
**Backend Platform:** Supabase (Postgres + Auth + Storage + Realtime + Edge Functions)
**Frontend Stack:** Next.js 16.1.6 (App Router) · React 19 · TypeScript · Tailwind v4 · `@supabase/ssr` · `@supabase/supabase-js`
**Status of repo today:** Frontend complete, Admin UI shells complete with **mocked in-memory state** and **fake `localStorage` auth**. No database, no API routes, no real auth.

---

## 0. Document scope

This document is the source of truth for converting the existing static/mocked TAMx site + admin dashboard into a **fully dynamic, Supabase-powered system**. It covers:

1. System map (what already exists & how it talks)
2. Entity inventory & ER overview (derived from current screens & forms)
3. Complete Supabase schema (tables, columns, types, indexes)
4. Row-Level Security (RLS) policies per role
5. Supabase Storage bucket plan
6. Auth model (Supabase Auth → replaces fake `localStorage` flag)
7. API surface — server actions & route handlers
8. Frontend wiring plan — file-by-file replacement of mocks
9. Realtime, Triggers, Edge Functions
10. Migration & rollout sequence
11. Environment variables & secrets
12. Open decisions for the user

---

## 1. System map (current state)

### 1.1 Repository structure (relevant)
```
src/
├─ app/
│  ├─ layout.tsx                       (root, fonts, Preloader)
│  ├─ globals.css
│  ├─ (site)/                          ← Public marketing site
│  │  ├─ layout.tsx                    (Navbar + Footer + PageTransition)
│  │  ├─ page.tsx                      (home: hero, services, testimonials, FAQ, CTA)
│  │  ├─ about/   blog/[slug]   contact/   e-courses/   lms/
│  │  ├─ pricing/   product/{crm,ecommerce}/   services/   team/
│  └─ (admin)/admin/
│     ├─ login/page.tsx                ← fake auth: admin@tamx.ai / admin123 → localStorage
│     └─ (dashboard)/
│        ├─ layout.tsx                 ← reads localStorage('admin_auth')
│        ├─ page.tsx                   (overview: StatCards + Charts + activity)
│        ├─ analytics/   blog/   media/   pricing/   products/
│        ├─ projects/   services/   settings/   team/   users/
├─ components/
│  ├─ admin/                           (Sidebar, Header, BlogForm, ProductForm, ServiceForm,
│  │                                    ProjectForm, ProjectTable, UserForm, Modal,
│  │                                    DeleteConfirmModal, RichTextEditor, StatCard,
│  │                                    DashboardCharts, Toast)
│  ├─ home/  about/  blog/  contact/  layout/  lms/  product/  team/  ui/
├─ context/PreloaderContext.tsx
├─ data/
│  ├─ navigation.ts                    (SERVICES[], PRODUCTS[] — currently hard-coded)
│  └─ blogPosts.ts                     (BlogPost[] — currently hard-coded full HTML)
├─ hooks/   lib/
public/   .mcp.json (Supabase MCP pre-wired)
```

### 1.2 Data flow today
| Layer | Reality |
|------|---------|
| Public pages | Read from `src/data/*.ts` constants and component-local arrays. Zero network. |
| Admin pages | Each page (`blog/`, `services/`, `products/`, `team/`, `pricing/`, `users/`, `projects/`, `media/`, `settings/`) holds its own `useState` seeded with `INITIAL_*` arrays. Edits never persist. |
| Auth | `(admin)/admin/login/page.tsx` matches a hard-coded credential pair, writes `localStorage.setItem('admin_auth', 'true')`. `(dashboard)/layout.tsx` and `AdminSidebar.tsx`/`AdminHeader.tsx` read/clear that flag. |
| Forms | `BlogForm`, `ProductForm`, `ServiceForm`, `ProjectForm`, `UserForm` are visual-only — submit handlers call `onSubmit({})` with empty objects. |
| File uploads | `MediaPage`, `BlogForm`, `ProductForm`, `ProjectForm` `<input type="file">` exists but only `console.log`s. |
| Contact form (`(site)/contact/page.tsx`) | `await new Promise(r => setTimeout(r, 2000))` — fake submit. |
| MCP | `.mcp.json` already references `https://mcp.supabase.com/mcp?project_ref=ajozkyhcfuagjrgzpxyj`. Project exists. |
| Already installed | `@supabase/ssr ^0.9.0`, `@supabase/supabase-js ^2.99.1`. No client/server helpers wired yet. |

---

## 2. Entity inventory (derived from current screens & forms)

These entities come straight from what the admin already pretends to manage, plus the public site's data needs.

| # | Entity | Source UI / file | Relations |
|---|--------|------------------|-----------|
| 1 | **profiles** (admin users) | `(admin)/admin/(dashboard)/users/page.tsx`, `components/admin/UserForm.tsx` | 1:1 → `auth.users` |
| 2 | **services** | `(dashboard)/services/page.tsx`, `data/navigation.ts::SERVICES` | 1:N → `service_capabilities` |
| 3 | **service_capabilities** (`items[]`) | nested array inside SERVICES | N:1 → `services` |
| 4 | **products** (catalog of platforms: Ecommerce/LMS/CRM) | `(dashboard)/products/page.tsx`, `data/navigation.ts::PRODUCTS` | — |
| 5 | **pricing_plans** | `(dashboard)/pricing/page.tsx` | 1:N → `plan_features` |
| 6 | **plan_features** | features[] inside plan | N:1 → `pricing_plans` |
| 7 | **blog_posts** | `(dashboard)/blog/page.tsx`, `(site)/blog/page.tsx`, `data/blogPosts.ts` | N:1 → `blog_categories`, optional N:1 → `profiles` (author) |
| 8 | **blog_categories** | categories ['AI','Engineering','Design','Strategy','Healthcare'] | 1:N → `blog_posts` |
| 9 | **team_members** | `(dashboard)/team/page.tsx`, `components/team/teamData.ts` | — |
| 10 | **projects** (portfolio case studies) | `(dashboard)/projects/page.tsx`, `components/admin/ProjectTable.tsx` | 1:N → `project_images` |
| 11 | **project_images** | upload slots in `ProjectForm` | N:1 → `projects` |
| 12 | **testimonials** | `components/home/TestimonialsData.ts` | — |
| 13 | **faq_items** | `components/home/FaqData.ts` | — |
| 14 | **media_assets** | `(dashboard)/media/page.tsx` | (file lives in Storage) |
| 15 | **site_settings** (singleton) | `(dashboard)/settings/page.tsx` | — |
| 16 | **contact_submissions** | `(site)/contact/page.tsx` | — |
| 17 | **meeting_bookings** | `components/contact/MeetingModal.tsx` | — |
| 18 | **activity_log** | "Recent Activity" panel on dashboard home | — |
| 19 | **analytics_events** *(optional)* | `(dashboard)/analytics/page.tsx` | — |

---

## 3. Supabase schema — `supabase/migrations/0001_init.sql`

> All tables live in schema `public`. Times are `timestamptz default now()`. PKs are `uuid default gen_random_uuid()` unless noted. Run in SQL editor or via `supabase db push`.

### 3.1 Enums
```sql
create type public.user_role     as enum ('admin', 'editor', 'viewer');
create type public.user_status   as enum ('active', 'inactive', 'suspended');
create type public.post_status   as enum ('published', 'draft', 'scheduled', 'archived');
create type public.project_status as enum ('published', 'draft', 'archived');
create type public.submission_status as enum ('new', 'in_review', 'contacted', 'closed');
create type public.booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
create type public.media_kind    as enum ('image', 'vector', 'document', 'video', 'code', 'audio', 'other');
```

### 3.2 Profiles (1:1 with `auth.users`)
```sql
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text unique not null,
  full_name     text not null,
  role          user_role not null default 'viewer',
  status        user_status not null default 'active',
  avatar_url    text,
  last_login_at timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index profiles_role_idx on public.profiles(role);
```

### 3.3 Content: services & capabilities
```sql
create table public.services (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique not null,
  icon         text not null,                -- lucide-react icon name (e.g. 'Code', 'Brain')
  href         text not null default '/services',
  description  text not null,
  is_published boolean not null default true,
  position     int not null default 0,        -- ordering on /services + nav
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index services_published_pos_idx on public.services(is_published, position);

create table public.service_capabilities (
  id          uuid primary key default gen_random_uuid(),
  service_id  uuid not null references public.services(id) on delete cascade,
  label       text not null,
  position    int  not null default 0
);
create index service_capabilities_service_idx on public.service_capabilities(service_id, position);
```

### 3.4 Products (Ecommerce / LMS / CRM cards in nav)
```sql
create table public.products (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique not null,
  icon         text not null,                -- lucide name
  href         text not null,                -- e.g. '/product/ecommerce'
  description  text not null,
  is_published boolean not null default true,
  position     int not null default 0,
  hero_image   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
```

### 3.5 Pricing
```sql
create table public.pricing_plans (
  id           uuid primary key default gen_random_uuid(),
  plan_name    text not null,
  description  text not null default '',
  price        text not null,                -- '129' or 'Custom' (matches current UI)
  currency     text not null default 'USD',
  billing_cycle text not null default 'month',
  button_text  text not null default 'Get Started',
  is_popular   boolean not null default false,
  is_active    boolean not null default true,
  position     int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table public.plan_features (
  id        uuid primary key default gen_random_uuid(),
  plan_id   uuid not null references public.pricing_plans(id) on delete cascade,
  label     text not null,
  position  int  not null default 0
);
create index plan_features_plan_idx on public.plan_features(plan_id, position);
```

### 3.6 Blog
```sql
create table public.blog_categories (
  id        uuid primary key default gen_random_uuid(),
  name      text unique not null,            -- 'AI', 'Engineering', 'Design', 'Strategy', 'Healthcare'
  slug      text unique not null,
  position  int not null default 0
);

create table public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  category_id  uuid references public.blog_categories(id) on delete set null,
  cover_url    text,
  author_id    uuid references public.profiles(id) on delete set null,
  author_name  text not null,                -- denormalized for guest authors / archival
  excerpt      text not null default '',
  content_html text not null default '',     -- HTML body (already used by current site)
  read_minutes int  not null default 5,
  status       post_status not null default 'draft',
  is_featured  boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index blog_posts_status_idx on public.blog_posts(status, published_at desc);
create index blog_posts_category_idx on public.blog_posts(category_id);
create index blog_posts_featured_idx on public.blog_posts(is_featured) where is_featured;
```

### 3.7 Team
```sql
create table public.team_members (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  role         text not null,
  company      text not null default 'TAMx',
  category     text not null default 'Leadership', -- 'Leadership' | 'Engineering' | 'Design'
  description  text not null default '',
  quote        text,
  is_founder   boolean not null default false,
  avatar_url   text,
  position     int not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
```

### 3.8 Projects (portfolio)
```sql
create table public.projects (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique not null,
  industry     text not null,                -- 'AI', 'FinTech', 'HealthTech', etc.
  description  text not null default '',
  cover_url    text,
  status       project_status not null default 'draft',
  published_at timestamptz,
  position     int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table public.project_images (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  url         text not null,
  alt         text,
  position    int  not null default 0
);
```

### 3.9 Testimonials & FAQ
```sql
create table public.testimonials (
  id        uuid primary key default gen_random_uuid(),
  name      text not null,
  role      text not null,
  company   text not null,
  body      text not null,
  rating    int  not null default 5 check (rating between 1 and 5),
  avatar_url text,
  position  int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.faq_items (
  id        uuid primary key default gen_random_uuid(),
  question  text not null,
  answer    text not null,
  position  int  not null default 0,
  is_active boolean not null default true
);
```

### 3.10 Media library (rows that mirror Storage objects)
```sql
create table public.media_assets (
  id           uuid primary key default gen_random_uuid(),
  bucket       text not null default 'media',
  path         text not null,                -- storage object path
  filename     text not null,
  mime         text not null,
  kind         media_kind not null,
  size_bytes   bigint not null,
  width        int,
  height       int,
  alt_text     text,
  uploaded_by  uuid references public.profiles(id) on delete set null,
  created_at   timestamptz not null default now(),
  unique(bucket, path)
);
create index media_assets_kind_idx on public.media_assets(kind);
```

### 3.11 Site settings (singleton)
```sql
create table public.site_settings (
  id          int primary key default 1 check (id = 1),  -- enforce single row
  contact_email   text not null default 'info@tamxai.com',
  contact_phone   text not null default '+92 3353898844',
  contact_address text not null default 'Regional Plan 9, NASTP',
  social_linkedin  text,
  social_instagram text,
  social_facebook  text,
  social_twitter   text,
  meta_title      text,
  meta_description text,
  updated_at      timestamptz not null default now(),
  updated_by      uuid references public.profiles(id) on delete set null
);
insert into public.site_settings(id) values (1) on conflict do nothing;
```

### 3.12 Contact submissions
```sql
create table public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text not null,
  email        text not null,
  phone        text,
  country_code text,
  service      text,                          -- selected from SERVICES/PRODUCTS title
  budget       text,                          -- '<$25k' | '$25k - $100k' | ...
  message      text not null,
  status       submission_status not null default 'new',
  source       text default 'contact_page',
  user_agent   text,
  ip_inet      inet,
  created_at   timestamptz not null default now()
);
create index contact_submissions_status_idx on public.contact_submissions(status, created_at desc);
```

### 3.13 Meeting bookings
```sql
create table public.meeting_bookings (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  email       text not null,
  company     text,
  topic       text not null default 'Strategy Consultation',
  scheduled_at timestamptz not null,
  duration_min int not null default 30,
  notes       text,
  status      booking_status not null default 'pending',
  created_at  timestamptz not null default now()
);
create index meeting_bookings_when_idx on public.meeting_bookings(scheduled_at);
```

### 3.14 Activity log (powers the dashboard "Recent Activity" panel)
```sql
create table public.activity_log (
  id         bigint generated always as identity primary key,
  actor_id   uuid references public.profiles(id) on delete set null,
  actor_name text,                            -- denormalized for deleted users
  entity     text not null,                   -- 'project' | 'blog' | 'service' | 'user' | ...
  entity_id  uuid,
  action     text not null,                   -- 'created' | 'updated' | 'deleted' | 'published'
  meta       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index activity_log_recent_idx on public.activity_log(created_at desc);
```

### 3.15 Analytics events (lightweight; optional — Vercel Analytics may suffice)
```sql
create table public.analytics_events (
  id         bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  path       text not null,
  event      text not null default 'page_view',
  country    text,
  device     text,
  referrer   text,
  session_id text,
  meta       jsonb not null default '{}'::jsonb
);
create index analytics_events_path_time_idx on public.analytics_events(path, occurred_at desc);
```

### 3.16 Universal `updated_at` trigger
```sql
create or replace function public.tg_set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end $$ language plpgsql;

-- attach to every table that has updated_at
do $$
declare t text;
begin
  foreach t in array array[
    'profiles','services','products','pricing_plans','blog_posts',
    'team_members','projects','site_settings'
  ] loop
    execute format(
      'create trigger trg_%I_updated_at before update on public.%I
       for each row execute function public.tg_set_updated_at();', t, t);
  end loop;
end $$;
```

### 3.17 Seed (reproduces today's hard-coded content)
Convert `src/data/navigation.ts`, `src/data/blogPosts.ts`, `src/components/home/FaqData.ts`, `src/components/home/TestimonialsData.ts`, `src/components/team/teamData.ts` into a `supabase/seed.sql`. The seed step is the *one-time* dump of current static data into Postgres.

---

## 4. Row-Level Security (RLS)

Roles are derived from `profiles.role`. We use a single helper:

```sql
create or replace function public.current_role() returns user_role
language sql stable as $$
  select role from public.profiles where id = auth.uid();
$$;
```

Enable RLS on **every** table (`alter table … enable row level security;`).

### 4.1 Public-readable content
Tables: `services`, `service_capabilities`, `products`, `pricing_plans`, `plan_features`, `blog_categories`, `blog_posts (status='published')`, `team_members (is_active)`, `projects (status='published')`, `project_images`, `testimonials (is_active)`, `faq_items (is_active)`, `site_settings`.

```sql
-- example for blog_posts
create policy "blog_posts_public_read" on public.blog_posts
  for select using (status = 'published' and published_at <= now());

create policy "blog_posts_admin_full" on public.blog_posts
  for all to authenticated
  using (current_role() in ('admin','editor'))
  with check (current_role() in ('admin','editor'));
```

Apply the analogous pattern to the rest. **Editors** can write content tables; **admins** can additionally manage users, settings, and pricing.

### 4.2 Profiles
```sql
create policy "profiles_self_read"   on public.profiles for select using (id = auth.uid());
create policy "profiles_admin_read"  on public.profiles for select using (current_role() = 'admin');
create policy "profiles_self_update" on public.profiles for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));  -- can't self-promote
create policy "profiles_admin_write" on public.profiles for all
  using (current_role() = 'admin') with check (current_role() = 'admin');
```

### 4.3 Submissions (write-only from public, read-only for admins)
```sql
-- contact_submissions
create policy "contact_public_insert" on public.contact_submissions
  for insert to anon, authenticated with check (true);
create policy "contact_admin_read"    on public.contact_submissions
  for select to authenticated using (current_role() in ('admin','editor'));
create policy "contact_admin_update"  on public.contact_submissions
  for update to authenticated using (current_role() in ('admin','editor'));
```
Same shape for `meeting_bookings`.

### 4.4 Storage
```sql
-- buckets created in §5; RLS lives on storage.objects
create policy "media_public_read" on storage.objects
  for select using (bucket_id = 'media');
create policy "media_admin_write" on storage.objects
  for all to authenticated using (
    bucket_id = 'media' and current_role() in ('admin','editor')
  );
```

---

## 5. Storage buckets

| Bucket | Public? | Allowed mime | Used by |
|--------|---------|--------------|---------|
| `media` | yes (signed URLs optional) | `image/*`, `video/*`, `application/pdf`, `image/svg+xml`, `application/json` | Media library, blog covers, project gallery, hero images |
| `avatars` | yes | `image/*` | Team members, admin profile pictures |
| `private-attachments` | **no** | any | Internal contact-form file attachments (future) |

Path conventions:
- `media/blog/{post_id}/cover.{ext}`
- `media/projects/{project_id}/{ordinal}.{ext}`
- `media/products/{slug}/hero.{ext}`
- `avatars/team/{member_id}.{ext}`
- `avatars/users/{user_id}.{ext}`

---

## 6. Authentication

**Replace** `localStorage('admin_auth')` with Supabase Auth using `@supabase/ssr`.

### 6.1 Files to add
```
src/lib/supabase/client.ts        // browser client (createBrowserClient)
src/lib/supabase/server.ts        // server client (createServerClient + cookies())
src/lib/supabase/middleware.ts    // refresh session on every request
src/lib/auth/getSession.ts        // typed helpers: getUser(), requireAdmin()
src/middleware.ts                 // gate /admin/** routes
```

### 6.2 Files to change
| File | Change |
|------|--------|
| `(admin)/admin/login/page.tsx` | Replace dummy `setTimeout` with `supabase.auth.signInWithPassword({ email, password })`. On success → `router.push('/admin')`. |
| `(admin)/admin/(dashboard)/layout.tsx` | Drop `localStorage` check. Server component or middleware-gated. Read user via `getUser()`; redirect to `/admin/login` if missing or `profile.role` not in (`admin`,`editor`,`viewer`). |
| `components/admin/AdminSidebar.tsx`, `AdminHeader.tsx` | Replace `handleLogout` with `await supabase.auth.signOut()` then `router.push('/admin/login')`. Replace hard-coded "Ahmed Malik / Super Admin" with `profile.full_name` + `profile.role`. |

### 6.3 Bootstrap admin
First admin is created by inserting into `auth.users` (via Supabase dashboard "Add user") and then upserting `profiles` with `role='admin'`. After that, admins create more users via `/admin/users`.

A **DB trigger** auto-creates a `profiles` row when a `auth.users` row is created:
```sql
create or replace function public.tg_handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email), 'viewer');
  return new;
end $$ language plpgsql security definer;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.tg_handle_new_user();
```

---

## 7. API surface

We will use **Server Actions** for write paths (Next 16 App Router) and **server-side reads** in RSC. No custom REST API is necessary; Supabase is the API. Where third-party callers are needed (e.g. webhooks), use `app/api/*` route handlers.

### 7.1 Server actions (new file: `src/app/_actions/`)
| Action | Used by |
|--------|---------|
| `services.create / update / delete / reorder` | `(dashboard)/services/page.tsx` |
| `products.create / update / delete / reorder` | `(dashboard)/products/page.tsx` |
| `pricing.upsertPlan / deletePlan / reorderFeatures` | `(dashboard)/pricing/page.tsx` |
| `blog.upsertPost / publish / unpublish / delete` | `(dashboard)/blog/page.tsx` |
| `team.upsertMember / delete / reorder` | `(dashboard)/team/page.tsx` |
| `projects.upsertProject / addImage / removeImage / publish` | `(dashboard)/projects/page.tsx` |
| `users.invite / updateRole / suspend / delete` | `(dashboard)/users/page.tsx` |
| `settings.update` | `(dashboard)/settings/page.tsx` |
| `media.upload / delete / rename` | `(dashboard)/media/page.tsx` |
| `contact.submit` (public, anon-allowed) | `(site)/contact/page.tsx` |
| `bookings.create` | `components/contact/MeetingModal.tsx` |

Every write action also writes a row to `activity_log` (server-side helper `logActivity({entity, action, entity_id, meta})`).

### 7.2 Public reads (RSC)
Convert these from client-side static imports to server-side Supabase queries:
- `(site)/page.tsx` — fetch services, testimonials, faq, hero stats.
- `(site)/blog/page.tsx` & `[slug]/page.tsx` — fetch from `blog_posts` (replace `import { blogPosts } from '@/data/blogPosts'`).
- `(site)/services/page.tsx` — fetch services + capabilities.
- `(site)/team/page.tsx` — fetch team_members.
- `(site)/pricing/page.tsx` — fetch pricing_plans + plan_features.
- `(site)/contact/page.tsx` — fetch services/products lists for the dropdowns from DB.
- Footer/Navbar — fetch `site_settings` once at the layout level.

Use `revalidateTag()` after mutations so RSC reads stay fresh.

---

## 8. Frontend wiring plan — file-by-file

| File | Today | Change |
|------|-------|--------|
| `src/data/navigation.ts` | exports `SERVICES`, `PRODUCTS` const arrays | keep file, but turn it into a typed schema + a server-side fetch helper `getNavigation()` that hits Supabase; gradually delete consumers of the static export. |
| `src/data/blogPosts.ts` | full HTML for every post | seed once into DB, then **delete** this file once `(site)/blog/*` reads from Supabase. |
| `src/components/home/FaqData.ts` / `TestimonialsData.ts` | static arrays | seed → fetch from DB; delete once consumers migrate. |
| `src/components/team/teamData.ts` | static array | seed → fetch from DB. |
| `(admin)/admin/(dashboard)/blog/page.tsx` | `useState(INITIAL_POSTS)` | replace with `useQuery`-style hook (or RSC + form action). Save → server action; refresh via `router.refresh()` or Realtime. |
| `(admin)/admin/(dashboard)/services/page.tsx` | `useState(INITIAL_SERVICES)` | same pattern; capabilities saved via dedicated action; reorder via drag (optional, post-MVP). |
| `(admin)/admin/(dashboard)/products/page.tsx` | `useState(INITIAL_PRODUCTS)` | same pattern. |
| `(admin)/admin/(dashboard)/team/page.tsx` | `useState(INITIAL_TEAM)` | same pattern; image becomes Storage `avatars/team/{id}` URL. |
| `(admin)/admin/(dashboard)/pricing/page.tsx` | `useState(INITIAL_PLANS)` | same pattern; features in child table. |
| `(admin)/admin/(dashboard)/users/page.tsx` | `useState(mockUsers)` | calls `users.invite/updateRole/suspend/delete` actions backed by `auth.admin.*` (service role) — must run in a **server-only** module. |
| `(admin)/admin/(dashboard)/projects/page.tsx` + `ProjectTable.tsx` | `useState(mockProjects)` | same pattern; multi-image upload via Storage. |
| `(admin)/admin/(dashboard)/media/page.tsx` | `mockMedia[]`, `console.log` upload | real Storage upload + insert into `media_assets`; grid reads from table; delete removes both row and object. |
| `(admin)/admin/(dashboard)/settings/page.tsx` | `useState` only | `settings.update` server action writes the singleton row. |
| `(admin)/admin/(dashboard)/page.tsx` (overview) | hard-coded stats + activity | counts from `count(*)` queries; recent activity from `activity_log` (last 10). |
| `(admin)/admin/(dashboard)/analytics/page.tsx` | mock numbers | aggregate `analytics_events` (or render Vercel Analytics embeds — see §11). |
| `(site)/contact/page.tsx` | fake `setTimeout` | `contact.submit` server action; service/budget options come from DB. |
| `components/contact/MeetingModal.tsx` | local state only | `bookings.create` server action; emit confirmation email via Edge Function (§9.3). |

### 8.1 Suggested data hook
```ts
// src/lib/supabase/hooks.ts
export function useTable<T>(table: string, query?: (q: PostgrestQueryBuilder<any>) => any) { /* SWR-ish wrapper, or just useEffect+useState */ }
```
Or skip hooks and do RSC + form actions everywhere — preferred for admin pages where SEO doesn't matter but we want zero client-side data plumbing.

---

## 9. Realtime, triggers, edge functions

### 9.1 Realtime
- Enable replication on: `blog_posts`, `services`, `products`, `team_members`, `projects`, `pricing_plans`, `contact_submissions`, `activity_log`.
- Admin pages subscribe to their table → instant multi-user collaboration ("Sarah just published a post" toast).

### 9.2 Triggers
- `on_auth_user_created` → seed `profiles` (§6.3).
- `tg_set_updated_at` on every content table.
- `tg_log_activity` (optional): AFTER INSERT/UPDATE/DELETE on key tables → write `activity_log` row.

### 9.3 Edge functions (Deno)
| Function | Trigger | Purpose |
|----------|---------|---------|
| `notify-contact` | DB webhook on `contact_submissions` insert | Send email to `site_settings.contact_email` via Resend/SendGrid. |
| `notify-booking` | DB webhook on `meeting_bookings` insert | Calendar invite (.ics) + confirmation email. |
| `image-optimize` | Storage `media` upload | Generate webp + thumbnail variants, write `media_assets` row with width/height. |
| `seed-rotate` | Cron (optional) | Daily roll-up of `analytics_events` into a `daily_traffic` table to power the dashboard chart cheaply. |

---

## 10. Migration & rollout sequence

Concrete, ordered. Each step ends in a green build.

1. **Wire Supabase clients.** Add `@supabase/ssr` browser+server helpers, `middleware.ts`, env vars (§11). Verify a no-op call from a server component.
2. **Migrations + seed.** Create `supabase/migrations/0001_init.sql` (§3) and `supabase/seed.sql` (§3.17). Push.
3. **RLS.** Add policies (§4). Verify with `select` from both `anon` and `authenticated` JWTs.
4. **Storage.** Create the 3 buckets (§5). Apply storage policies.
5. **Real auth.** Replace login + dashboard layout gating (§6). Delete `localStorage('admin_auth')` references everywhere. Bootstrap one admin user.
6. **Public read migration.** Switch one section at a time: services → testimonials → FAQ → team → blog list → blog detail → pricing → projects portfolio. Delete the corresponding entry from `src/data/*` only after the page reads from DB.
7. **Admin write migration.** Same order as #6, but for `(dashboard)/*` pages. After each: cards/forms persist across reload.
8. **Media library.** Wire real uploads + DB rows. Replace blog/project/team `image` fields with Storage URLs picked through the library.
9. **Public submissions.** Real contact form + meeting booking actions. Wire `notify-contact` / `notify-booking` Edge functions.
10. **Activity log + Realtime.** Activity table fed by triggers; dashboard "Recent Activity" reads it; subscribe via Realtime.
11. **Analytics.** Either swap to Vercel Analytics (recommended; see §11) or implement the `analytics_events` ingest endpoint and dashboard aggregations.
12. **Hardening.** RLS audit, anon-rate-limiting on submissions (Edge function or Vercel BotID), soft-delete review.

---

## 11. Environment & configuration

### 11.1 Required env vars (`.env.local`, then `vercel env add`)
```
NEXT_PUBLIC_SUPABASE_URL=https://ajozkyhcfuagjrgzpxyj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...           # server-only; never expose to client
SUPABASE_JWT_SECRET=...                  # only if you sign custom JWTs
RESEND_API_KEY=...                       # for notify-* edge functions (or SENDGRID_API_KEY)
NEXT_PUBLIC_SITE_URL=https://tamx.ai
```

### 11.2 Vercel notes (relevant to the 2026 platform)
- Use **Fluid Compute** defaults. Middleware (`src/middleware.ts`) runs on Fluid; full Node available.
- Pull envs locally with `vercel env pull` once the Vercel CLI is installed (`npm i -g vercel`).
- Consider `vercel.ts` instead of `vercel.json` for typed config (rewrites to Supabase, cron for `seed-rotate` if used).
- For analytics, prefer **Vercel Analytics** + **Speed Insights** over a custom `analytics_events` ingest unless you need per-event SQL.
- For uploads, prefer signed-upload URLs from a Server Action so the service-role key never touches the browser.

---

## 12. Open decisions (need user input before coding)

| # | Decision | Why it matters | Suggested default |
|---|----------|----------------|-------------------|
| D1 | Email provider for `notify-*` functions | Resend (simplest), SendGrid, AWS SES | Resend |
| D2 | Analytics: custom (`analytics_events`) vs Vercel Analytics | DB-aggregated charts give richer admin views; Vercel is one switch | Vercel Analytics + Speed Insights, drop `analytics_events` |
| D3 | Soft delete vs hard delete | Affects undo + GDPR | Soft (`deleted_at timestamptz`) for `blog_posts`, `projects`, `team_members`, `users`; hard for `media_assets` (cascade Storage) |
| D4 | Multi-author blog | Today posts are signed by `Ahmed Malik` only | Allow any `editor`/`admin` to author; expose `author_id` selector |
| D5 | Internationalization | None today | Park as v2; schema already supports a future `locale` column |
| D6 | Rich text format for blog body | Today raw HTML strings; current `RichTextEditor.tsx` is a placeholder | Keep HTML in `content_html`; later migrate to MDX or Tiptap JSON in a `content_json jsonb` column |
| D7 | Newsletter / marketing list | Not in current UI | Add `newsletter_subscriptions` table only when the section is built |
| D8 | Contact-form spam protection | None today | Vercel BotID + a server-action rate-limit |
| D9 | Who can read `contact_submissions` and `meeting_bookings`? | Privacy | `admin` + `editor` only (matches §4.3) |
| D10 | Activity-log retention | Could grow unbounded | 180-day TTL via Edge cron, or partitioned table |

---

## 13. Done definition

The work in this document is complete when:

- [ ] No file under `src/data/` or `src/components/**/Data.ts` is imported by a page; all reads come from Supabase.
- [ ] No `localStorage('admin_auth')` reference exists in the repo.
- [ ] No `INITIAL_*` mock array exists in any `(admin)/admin/(dashboard)/**` page.
- [ ] Public site `/blog`, `/services`, `/team`, `/pricing`, `/contact`, `/(home)` render entirely from DB rows.
- [ ] Admin can sign in, create/edit/delete every entity in §2, upload media, change settings, and changes appear instantly on the public site (with `revalidateTag` or Realtime).
- [ ] RLS is on for every table; a logged-out browser cannot mutate anything.
- [ ] Contact form and meeting modal persist real submissions and trigger notifications.

---

*End of document. The next session will start at §10 step 1.*
