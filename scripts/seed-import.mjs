// Imports seed JSON into Supabase using service-role key.
// Run: node scripts/seed-import.mjs [--dry-run] [--only=table1,table2]

import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args   = process.argv.slice(2);
const DRY    = args.includes('--dry-run');
const ONLY   = args.find(a => a.startsWith('--only='))?.split('=')[1]?.split(',') ?? null;
const should = t => !ONLY || ONLY.includes(t);

const URL_  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_ || !KEY) { console.error('Missing env vars.'); process.exit(1); }

const db = createClient(URL_, KEY, { auth: { autoRefreshToken: false, persistSession: false } });

async function load(f) {
  return JSON.parse(await readFile(resolve(ROOT, f), 'utf8'));
}

async function upsert(table, rows, conflictCol = 'id') {
  if (!should(table)) return {};
  if (DRY) { console.log(`[DRY] ${table}: ${rows.length} rows`); return {}; }
  const { error } = await db.from(table).upsert(rows, { onConflict: conflictCol });
  if (error) console.error(`  ✗ ${table}:`, error.message);
  else       console.log(`  ✓ ${table}: ${rows.length} rows`);
  return {};
}

async function insert(table, rows) {
  if (!should(table)) return;
  if (DRY) { console.log(`[DRY] ${table}: ${rows.length} rows`); return; }
  if (rows.length === 0) { console.log(`  ↷ ${table}: 0 rows, skip`); return; }
  const { error } = await db.from(table).insert(rows);
  if (error) console.error(`  ✗ ${table}:`, error.message);
  else       console.log(`  ✓ ${table}: ${rows.length} rows`);
}

async function main() {
  let site, admin;
  try { site  = await load('seed/site-content.images-rewritten.json'); }
  catch { site  = await load('seed/site-content.json'); console.warn('  ℹ using original image URLs'); }
  try { admin = await load('seed/admin-data.images-rewritten.json'); }
  catch { admin = await load('seed/admin-data.json'); }

  // ── ID maps: slug-id → real UUID ──────────────────────────────────────────
  const catMap  = {}; // slug → uuid
  const svcMap  = {}; // old id → uuid
  const planMap = {}; // old id → uuid
  const teamMap = {}; // old id → uuid
  const faqMap  = {};
  const testiMap= {};

  console.log('\nImporting site content…');

  // 1. Blog categories
  if (should('blog_categories')) {
    const rows = site.blog_categories.map(c => {
      const id = randomUUID();
      catMap[c.slug] = id;
      return { id, name: c.name, slug: c.slug, position: c.position };
    });
    await insert('blog_categories', rows);
  }

  // 2. Services
  if (should('services')) {
    const rows = site.services.map(s => {
      const id = randomUUID();
      svcMap[s.id] = id;
      return { id, title: s.title, slug: s.slug, icon: s.icon, href: s.href,
               description: s.description, is_published: s.is_published, position: s.position };
    });
    await insert('services', rows);
  }

  // 3. Service capabilities
  if (should('service_capabilities') && Object.keys(svcMap).length > 0) {
    const rows = site.services.flatMap(s =>
      (s.capabilities ?? []).map(c => ({
        id: randomUUID(),
        service_id: svcMap[s.id],
        label: c.label,
        position: c.position,
      }))
    );
    await insert('service_capabilities', rows);
  }

  // 4. Products
  if (should('products')) {
    const rows = site.products.map(p => ({
      id: randomUUID(),
      title: p.title,
      slug: p.slug,
      icon: p.icon,
      href: p.href,
      description: p.description,
      is_published: p.is_published,
      position: p.position,
      hero_image: p.hero_image ?? null,
    }));
    await insert('products', rows);
  }

  // 5. Pricing plans
  if (should('pricing_plans')) {
    const rows = site.pricing_plans.map(p => {
      const id = randomUUID();
      planMap[p.id] = id;
      return { id, plan_name: p.plan_name, description: p.description, price: p.price,
               currency: p.currency, billing_cycle: p.billing_cycle, button_text: p.button_text,
               is_popular: p.is_popular, is_active: p.is_active, position: p.position };
    });
    await insert('pricing_plans', rows);
  }

  // 6. Plan features
  if (should('plan_features') && Object.keys(planMap).length > 0) {
    const rows = site.pricing_plans.flatMap(p =>
      (p.features ?? []).map((label, i) => ({
        id: randomUUID(),
        plan_id: planMap[p.id],
        label,
        position: i,
      }))
    );
    await insert('plan_features', rows);
  }

  // 7. Team members
  if (should('team_members')) {
    const rows = site.team_members.map(m => {
      const id = randomUUID();
      teamMap[m.id] = id;
      return { id, full_name: m.full_name, role: m.role, company: m.company,
               category: m.category, description: m.description,
               quote: m.quote ?? null, is_founder: m.is_founder,
               avatar_url: m.avatar_url ?? null, position: m.position, is_active: m.is_active };
    });
    await insert('team_members', rows);
  }

  // 8. FAQ items
  if (should('faq_items')) {
    const rows = site.faq_items.map(f => {
      const id = randomUUID();
      faqMap[f.id] = id;
      return { id, question: f.question, answer: f.answer, position: f.position, is_active: f.is_active };
    });
    await insert('faq_items', rows);
  }

  // 9. Testimonials
  if (should('testimonials')) {
    const rows = site.testimonials.map(t => {
      const id = randomUUID();
      testiMap[t.id] = id;
      return { id, name: t.name, role: t.role, company: t.company, body: t.body,
               rating: t.rating, avatar_url: t.avatar_url ?? null,
               position: t.position, is_active: t.is_active };
    });
    await insert('testimonials', rows);
  }

  // 10. Trusted clients (text PK — use slug id as-is)
  if (should('trusted_clients')) {
    const rows = site.trusted_clients.map(c => ({
      id: c.id, name: c.name, logo_url: c.logo_url ?? null,
      position: c.position, is_active: true,
    }));
    await upsert('trusted_clients', rows, 'id');
  }

  // 11. Blog posts
  if (should('blog_posts')) {
    const rows = site.blog_posts.map(p => ({
      id: randomUUID(),
      slug: p.slug,
      title: p.title,
      category_id: p.category_slug ? (catMap[p.category_slug] ?? null) : null,
      cover_url: p.cover_url ?? null,
      author_name: p.author_name,
      excerpt: p.excerpt,
      content_html: p.content_html,
      read_minutes: p.read_minutes,
      status: p.status,
      is_featured: p.is_featured,
      published_at: p.published_at ?? null,
    }));
    await insert('blog_posts', rows);
  }

  // 12. Site settings (singleton upsert on id=1)
  if (should('site_settings')) {
    const s = site.site_settings;
    if (!DRY) {
      const { error } = await db.from('site_settings').upsert({
        id: 1,
        contact_email:    s.contact_email,
        contact_phone:    s.contact_phone,
        contact_address:  s.contact_address,
        social_linkedin:  s.social_linkedin || null,
        social_instagram: s.social_instagram || null,
        social_facebook:  s.social_facebook  || null,
        social_twitter:   s.social_twitter   || null,
        meta_title:       s.meta_title        || null,
        meta_description: s.meta_description || null,
      }, { onConflict: 'id' });
      if (error) console.error('  ✗ site_settings:', error.message);
      else       console.log('  ✓ site_settings: 1 row');
    } else {
      console.log('[DRY] site_settings: 1 row');
    }
  }

  console.log('\nImporting admin data…');

  // 13. Projects
  if (should('projects')) {
    const rows = admin.projects.map(p => ({
      id: randomUUID(),
      title: p.title,
      slug: p.slug,
      industry: p.industry,
      description: p.description || '',
      cover_url: p.cover_url ?? null,
      status: p.status,
      published_at: p.published_at ?? null,
      position: p.position,
    }));
    await insert('projects', rows);
  }

  // 14. Activity log (append only, no upsert)
  if (should('activity_log') && !DRY) {
    const { count } = await db.from('activity_log').select('id', { count: 'exact', head: true });
    if ((count ?? 0) === 0) {
      const rows = admin.activity_log.map(a => ({
        actor_name: a.actor_name ?? null,
        entity:     a.entity,
        entity_id:  null,
        action:     a.action,
        meta:       a.meta ?? {},
      }));
      const { error } = await db.from('activity_log').insert(rows);
      if (error) console.error('  ✗ activity_log:', error.message);
      else       console.log(`  ✓ activity_log: ${rows.length} rows`);
    } else {
      console.log(`  ↷ activity_log: ${count} rows already exist, skip`);
    }
  }

  console.log('\nAll done.');
}

main().catch(e => { console.error(e); process.exit(1); });
