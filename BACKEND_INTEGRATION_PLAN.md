# BACKEND_INTEGRATION_PLAN.md
**Project:** TAMx — Seed-to-Production Backend Integration
**Backend:** Supabase (Postgres + Auth + Storage + Realtime + Edge Functions)
**Companion docs:** `BACKEND_ADMIN_DASHBOARD.md` (schema + RLS reference)
**Generated artefacts:** `seed/site-content.json`, `seed/admin-data.json`

---

## 1. Why this plan exists

The repo today ships a finished Next.js front-end and a finished admin UI shell. **Every page reads from in-memory mocks.** The user has confirmed *the current data is the data we want to launch with*. So the work is:

1. Capture today's mocked content as JSON (done — see §2).
2. Provision Supabase: schema, RLS, Storage buckets.
3. Import the JSON into Supabase verbatim.
4. Re-point every page (public + admin) from local mocks to Supabase.
5. Replace fake `localStorage` auth with Supabase Auth.
6. Move every image referenced by JSON into Supabase Storage and rewrite URLs.

This document is the **execution playbook**. The schema and RLS already live in `BACKEND_ADMIN_DASHBOARD.md` — don't duplicate them here.

---

## 2. The seed JSON files

### 2.1 What was produced
| File | Size | Contents |
|---|---|---|
| `seed/site-content.json` | ~140 KB | `site_settings`, `navigation`, `services` (+capabilities), `products`, `pricing_plans` (+features), `blog_categories`, `blog_posts` (full HTML), `team_members`, `faq_items`, `testimonials`, `trusted_clients` |
| `seed/admin-data.json` | ~8 KB | `profiles`, `projects`, `media_assets`, `contact_submissions`, `meeting_bookings`, `activity_log`, `dashboard_kpis`, `analytics_kpis`, `top_countries`, `device_breakdown` |

### 2.2 How they were produced
`scripts/generate-seed-json.mjs` — a self-contained Node ESM script that:
- Reads the existing `src/data/*.ts` and `src/components/**/*Data.ts` source files.
- Strips TypeScript syntax (imports, interfaces, type annotations).
- Stubs every imported identifier as `{ name: 'X' }` so lucide icons survive as plain strings (`Paintbrush`, `Code`, …).
- Evaluates the cleaned module body in a `Function` sandbox.
- Maps every entity to the **exact column shape** used in the schema in `BACKEND_ADMIN_DASHBOARD.md` § 3.

To regenerate after editing the source data files:
```bash
node scripts/generate-seed-json.mjs
```

### 2.3 Counts captured (verified by the script)
```
services         6      blog_categories  5
products         3      blog_posts      15   (1 featured)
pricing_plans    3      team_members     7   (1 founder)
faq_items        7      testimonials     6
trusted_clients  8      profiles         4   (admin demo)
projects         6      media_assets     6
activity_log     4
```

### 2.4 Image references — important
Every `cover_url`, `avatar_url`, `hero_image`, and `image` in `site-content.json` is currently either:
- **External Unsplash URL** (most blog covers, contact-page imagery), or
- **Repo-local path** (`/images/AhmedAbdullah.jpeg`, `/p1.jpg`, `/Tamx_logo.png`, etc.)

Per the requirement, these all move to **Supabase Storage** during import. See §5.

---

## 3. Module-by-module integration matrix

Each row links an admin module → its public-site consumer → the seed JSON section → the Supabase table → the file(s) that must change.

| # | Module | Admin page | Public consumer | Seed JSON key | Table | Files to refactor |
|---|---|---|---|---|---|---|
| 1 | Auth & Profiles | `/admin/login`, `/admin/users` | (header avatar) | `admin-data.json::profiles` | `profiles` (+ `auth.users`) | `(admin)/admin/login/page.tsx`, `(dashboard)/layout.tsx`, `components/admin/{AdminSidebar,AdminHeader}.tsx`, `components/admin/UserForm.tsx` |
| 2 | Services | `/admin/services` | `/`, `/services`, Navbar | `site-content.json::services` (+ capabilities) | `services`, `service_capabilities` | `(dashboard)/services/page.tsx`, `(site)/services/page.tsx`, `components/home/ServicesSection.tsx`, `data/navigation.ts` |
| 3 | Products | `/admin/products` | Navbar mega-menu, `/product/*` | `site-content.json::products` | `products` | `(dashboard)/products/page.tsx`, `components/layout/Navbar.tsx`, `data/navigation.ts` |
| 4 | Pricing | `/admin/pricing` | `/pricing` | `site-content.json::pricing_plans` (+ features) | `pricing_plans`, `plan_features` | `(dashboard)/pricing/page.tsx`, `(site)/pricing/page.tsx`, `components/animated-glassy-pricing.tsx` |
| 5 | Blog | `/admin/blog` | `/blog`, `/blog/[slug]` | `site-content.json::blog_categories`, `blog_posts` | `blog_categories`, `blog_posts` | `(dashboard)/blog/page.tsx`, `(site)/blog/page.tsx`, `(site)/blog/[slug]/page.tsx`, `data/blogPosts.ts` (delete after) |
| 6 | Team | `/admin/team` | `/`, `/team`, `/about` | `site-content.json::team_members` | `team_members` | `(dashboard)/team/page.tsx`, `(site)/team/page.tsx`, `components/team/teamData.ts` (delete after) |
| 7 | Projects (portfolio) | `/admin/projects` | (future portfolio page) | `admin-data.json::projects` | `projects`, `project_images` | `(dashboard)/projects/page.tsx`, `components/admin/{ProjectTable,ProjectForm}.tsx` |
| 8 | FAQ | (add to settings) | `/`, `/contact` | `site-content.json::faq_items` | `faq_items` | `components/home/FaqSection.tsx`, `components/home/FaqData.ts` (delete after) |
| 9 | Testimonials | (add to admin) | `/` | `site-content.json::testimonials` | `testimonials` | `components/home/TestimonialsSection.tsx`, `components/home/TestimonialsData.ts` (delete after) |
| 10 | Trusted clients | (add to admin) | `/` | `site-content.json::trusted_clients` | `trusted_clients` *(new table)* | `components/home/TrustedBySection.tsx` |
| 11 | Media library | `/admin/media` | (used by all uploads) | `admin-data.json::media_assets` | `media_assets` + Storage `media` bucket | `(dashboard)/media/page.tsx` |
| 12 | Site settings | `/admin/settings` | Navbar, Footer, Contact | `site-content.json::site_settings`, `navigation.footer_columns` | `site_settings` | `(dashboard)/settings/page.tsx`, `components/layout/{Navbar,Footer}.tsx` |
| 13 | Contact submissions | (add view to dashboard) | `/contact` form | `admin-data.json::contact_submissions` | `contact_submissions` | `(site)/contact/page.tsx` |
| 14 | Meeting bookings | (add view to dashboard) | `MeetingModal` | `admin-data.json::meeting_bookings` | `meeting_bookings` | `components/contact/MeetingModal.tsx` |
| 15 | Activity log | Dashboard "Recent Activity" panel | — | `admin-data.json::activity_log` | `activity_log` | `(admin)/admin/(dashboard)/page.tsx` |
| 16 | Analytics | `/admin/analytics` | — | `admin-data.json::{dashboard_kpis, analytics_kpis, top_countries, device_breakdown}` | (Vercel Analytics + view) | `(dashboard)/analytics/page.tsx`, `(dashboard)/page.tsx` |

---

## 4. Execution sequence (do these in order)

The numbered tasks below are also created as Claude Code Task IDs (#10 onward) so progress can be tracked through `TaskList`.

### Phase A — Foundation
**A1. Provision Supabase clients**
- Add `src/lib/supabase/{client,server,middleware}.ts` using `@supabase/ssr` (already installed).
- Add `src/middleware.ts` to gate `/admin/**`.
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- Smoke test: a server component logs `auth.getUser()` and returns null without errors.

**A2. Run schema migration**
- Create `supabase/migrations/0001_init.sql` from `BACKEND_ADMIN_DASHBOARD.md` § 3.
- Add the new table needed for module #10 above:
  ```sql
  create table public.trusted_clients (
    id text primary key,
    name text not null,
    logo_url text,
    position int not null default 0,
    is_active boolean not null default true
  );
  ```
- Apply the universal `updated_at` trigger and the `on_auth_user_created` profile trigger.

**A3. Apply RLS policies**
- Per-table policies from `BACKEND_ADMIN_DASHBOARD.md` § 4.
- Verify with two test JWTs (anonymous and an `admin` user) that:
  - anon can `select` published content but cannot `insert/update/delete`,
  - anon can `insert` into `contact_submissions` and `meeting_bookings`,
  - admin/editor can write to content tables.

### Phase B — Storage & data import
**B1. Create Storage buckets**
- Buckets: `media` (public), `avatars` (public), `private-attachments` (private).
- Apply storage policies (admin/editor write, public read on `media` + `avatars`).

**B2. Migrate images into `media` bucket**
- Run `scripts/upload-seed-images.mjs` (to be written — see §5). It walks `seed/site-content.json` + `seed/admin-data.json`, downloads every external `cover_url` / `image`, copies every repo-local `/images/*` and `/Tamx_logo.png`, uploads to deterministic paths in the `media` bucket, and patches the JSON with the new public URLs. Output: `seed/site-content.images-rewritten.json` + `seed/admin-data.images-rewritten.json`.

**B3. Import JSON → Postgres**
- Run `scripts/seed-import.mjs` (to be written — see §6). It uses the **service-role** key, in this order, with `upsert` on the natural keys:
  1. `blog_categories` → 2. `services` → 3. `service_capabilities`
  4. `products` → 5. `pricing_plans` → 6. `plan_features`
  7. `team_members` → 8. `faq_items` → 9. `testimonials`
  10. `trusted_clients` → 11. `blog_posts`
  12. `site_settings` (single row upsert on `id=1`)
  13. `projects` → 14. `media_assets` → 15. `activity_log`
- Profiles are imported separately after `auth.users` rows exist (B4).

**B4. Bootstrap admin user**
- In Supabase dashboard, "Add user" → `admin@tamx.ai` / strong password.
- Trigger `on_auth_user_created` creates the matching `profiles` row.
- Promote: `update profiles set role='admin', full_name='Ahmed Malik' where email='admin@tamx.ai';`
- Run `scripts/seed-import.mjs --profiles` to upsert the remaining 3 demo users (`sarah`, `alex`, `m.scott`) — they get auth users via `auth.admin.createUser()` then their profile fields synced.

### Phase C — Auth replacement
**C1. Replace fake login**
- `(admin)/admin/login/page.tsx`: swap dummy `setTimeout` for `supabase.auth.signInWithPassword()`. On success → `router.push('/admin')`.
- Delete every reference to `localStorage.getItem('admin_auth')` / `localStorage.setItem('admin_auth', ...)` / `localStorage.removeItem('admin_auth')`. Files: `(dashboard)/layout.tsx`, `components/admin/AdminSidebar.tsx`, `components/admin/AdminHeader.tsx`.
- `(dashboard)/layout.tsx` becomes a server component that calls `requireAdmin()` and redirects to `/admin/login` if unauthenticated.
- Sidebar/Header read `profile.full_name` and `profile.role` from a server-fetched session prop (or a small client `useSession()` hook that reads from `supabase.auth.getSession()`).

**C2. Wire user-management actions**
- `(dashboard)/users/page.tsx` and `components/admin/UserForm.tsx`: connect to `users.invite / updateRole / suspend / delete` server actions backed by `auth.admin.*` (server-only module).

### Phase D — Public-side wiring
Switch the public site to read from Supabase. **One section at a time** so the build stays green.

**D1. Site settings + navigation** → fetch once at root layout, pass via context, replace hard-coded values in Navbar/Footer.

**D2. Home page** — services, testimonials, FAQ, trusted clients, hero stats, CTA copy.

**D3. /services** — replace `expandedServices` array with DB rows; render capabilities from `service_capabilities`.

**D4. /pricing** — replace any hard-coded plan arrays with DB rows.

**D5. /team** + `/about` team section — replace `teamData.ts` consumers.

**D6. /blog** + `/blog/[slug]` — replace `blogPosts.ts`. Generate `generateStaticParams()` from DB. Use `revalidateTag('blog')` from admin write actions.

**D7. /contact** — service/budget dropdowns sourced from DB. Real submit via `contact.submit` action.

**D8. /lms`, `/e-courses`, `/product/{crm,ecommerce}`** — for now hard-coded copy is acceptable; add a `pages` table only if/when the user wants to edit these from admin.

**D9. Delete dead static modules** once each consumer is migrated:
- `src/data/blogPosts.ts`
- `src/components/home/FaqData.ts`
- `src/components/home/TestimonialsData.ts`
- `src/components/team/teamData.ts`
- `src/data/navigation.ts` (or convert to a server-fetch helper)

### Phase E — Admin write paths
Replace every `useState(INITIAL_*)` with server actions. **One page at a time.**

**E1. Blog admin** (`/admin/blog`) — full CRUD via `blog.upsertPost / publish / unpublish / delete`. Cover image picker uses Media Library.

**E2. Services admin** (`/admin/services`) — services + nested capabilities.

**E3. Products admin** (`/admin/products`).

**E4. Team admin** (`/admin/team`) — avatar uploads land in `avatars/team/{member_id}.{ext}`.

**E5. Pricing admin** (`/admin/pricing`) — plans + nested features.

**E6. Projects admin** (`/admin/projects`) — multi-image gallery.

**E7. Settings** (`/admin/settings`) — singleton update + password change wired to `supabase.auth.updateUser({ password })`.

**E8. Media library** (`/admin/media`) — real Storage uploads + DB rows. Replace mock `console.log` upload with signed-upload URL flow.

**E9. New: testimonials admin section + trusted-clients admin section** (small CRUD pages added to sidebar).

### Phase F — Submissions & activity
**F1. Contact form** — real action, anti-spam (Vercel BotID or honeypot + rate limit), email notify via `notify-contact` Edge function.

**F2. Meeting modal** — real action, calendar invite via `notify-booking` Edge function.

**F3. Activity log** — DB triggers feeding `activity_log`; dashboard "Recent Activity" subscribes via Realtime.

### Phase G — Hardening
**G1. RLS audit** — confirm anonymous browser can't mutate anything.
**G2. Backups + point-in-time recovery** — enable in Supabase project.
**G3. Vercel deploy** — env vars in all environments, preview previews work, production protected by Rolling Releases.
**G4. Decide analytics path** — Vercel Analytics (recommended) or custom `analytics_events` ingest.

---

## 5. Image migration (`scripts/upload-seed-images.mjs`)

> To be written in Phase B2. The shape below is the contract.

**What it does**
1. Reads both seed JSONs.
2. Walks every value matching the URL fields (`cover_url`, `avatar_url`, `image`, `hero_image`, project `cover_url`).
3. For external URLs (`https://...unsplash...`): `fetch` → buffer.
4. For repo-local paths (`/images/AhmedAbdullah.jpeg`, `/Tamx_logo.png`, `/p1.jpg`, ...): read from `public/`. Files that don't exist locally (e.g. `/p1.jpg`) get a placeholder until real assets land.
5. Computes a deterministic destination path:
   - blog covers → `blog/{slug}/cover.{ext}`
   - team avatars → `team/{member_id}.{ext}`
   - product hero → `products/{slug}/hero.{ext}`
   - service hero (future) → `services/{slug}/hero.{ext}`
   - project cover → `projects/{slug}/cover.{ext}`
   - settings/global → `site/{key}.{ext}`
6. Uploads to bucket `media` (or `avatars` for people-photos) using `supabase.storage.from(bucket).upload(path, buffer, { upsert: true, contentType })`.
7. Replaces the original URL in-memory with the public URL: `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`.
8. Writes the rewritten JSONs to `seed/*.images-rewritten.json` (preserves originals).

**Idempotent.** Safe to re-run.

---

## 6. Database import (`scripts/seed-import.mjs`)

> To be written in Phase B3.

**Connects** with the service-role key. Imports in dependency order using `upsert(..., { onConflict: '<natural_key>' })`:

```
blog_categories          (slug)
services                 (slug)
service_capabilities     (composite: service_id + position)
products                 (slug)
pricing_plans            (id)
plan_features            (composite: plan_id + position)
team_members             (id)
faq_items                (id)
testimonials             (id)
trusted_clients          (id)
blog_posts               (slug)        ← references blog_categories.id via slug lookup
site_settings            (id=1)
projects                 (slug)
media_assets             (bucket+path)
activity_log             (append-only, no upsert)
```

Profiles are handled separately; see B4.

**Flags**
- `--dry-run` — don't write, just log counts.
- `--only=blog_posts,services` — partial reseed.
- `--profiles` — only run the profiles + auth users path.

---

## 7. Environment variables

```env
# .env.local (and Vercel)
NEXT_PUBLIC_SUPABASE_URL=https://ajozkyhcfuagjrgzpxyj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste from Supabase dashboard>
SUPABASE_SERVICE_ROLE_KEY=<paste, server-only>
SUPABASE_DB_URL=<connection string for migrations>
RESEND_API_KEY=<for notify-* edge functions>
NEXT_PUBLIC_SITE_URL=https://tamx.ai
```

The Vercel CLI is **not installed**. Once installed (`npm i -g vercel`), pull envs locally with `vercel env pull`. The repo already declares the Supabase MCP in `.mcp.json`, so Claude Code can talk to the project via MCP for migrations.

---

## 8. Done definition

- [ ] `seed/site-content.json` + `seed/admin-data.json` exist and match counts in §2.3.
- [ ] `node scripts/generate-seed-json.mjs` is reproducible.
- [ ] `node scripts/upload-seed-images.mjs` rewrites every URL to a Supabase Storage URL.
- [ ] `node scripts/seed-import.mjs` populates every table.
- [ ] No file imports `src/data/blogPosts.ts`, `FaqData.ts`, `TestimonialsData.ts`, or `teamData.ts` (they may exist as backups but no consumer references them).
- [ ] No `localStorage('admin_auth')` reference exists in the repo.
- [ ] Public pages (`/`, `/services`, `/pricing`, `/team`, `/blog`, `/blog/[slug]`, `/contact`) render entirely from Supabase.
- [ ] Every admin module in §3 persists changes; reload preserves edits.
- [ ] Every image referenced anywhere in the rendered HTML is served from `*.supabase.co/storage/v1/object/public/...`.
- [ ] RLS on every table; anonymous user cannot mutate anything except `contact_submissions` and `meeting_bookings`.
- [ ] Contact form and meeting modal write real rows + send notifications.
- [ ] One bootstrap admin can sign in and create more users.

---

## 9. Open decisions (carried over from BACKEND_ADMIN_DASHBOARD.md §12)

These are still unanswered. Please pick:
1. Email provider: **Resend** vs SendGrid vs SES.
2. Analytics: **Vercel Analytics** (recommended) vs custom `analytics_events`.
3. Soft delete vs hard delete on content tables.
4. Multi-author blog (yes/no).
5. Newsletter table (build now or later).
6. Spam protection on public forms: **Vercel BotID** vs honeypot+rate-limit.

Defaults in **bold** will be used if no answer is given before Phase B starts.

---

*End of plan. Companion: `BACKEND_ADMIN_DASHBOARD.md` for the schema/RLS reference.*
