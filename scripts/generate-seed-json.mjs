// Generates seed JSON files from the existing TypeScript data sources.
// Run with: node scripts/generate-seed-json.mjs
//
// Output:
//   seed/site-content.json   — public-site content (services, products, blog, team, faq, testimonials, pricing, settings)
//   seed/admin-data.json     — admin dashboard mock data (users, projects, media, activity)

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Reads a TS source file, strips type/interface declarations, and evaluates
 * the remaining export expression to extract the real JS value.
 *
 * It evaluates inside a `Function` constructor sandbox — there are no remote
 * inputs here, this only consumes our own source files.
 */
async function loadTsExport(relPath, exportName) {
  const src = await readFile(resolve(ROOT, relPath), 'utf8');

  // Collect every named import so we can stub them as { name: 'Foo' } objects.
  const importedNames = new Set();
  for (const m of src.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"][^'"]+['"]/g)) {
    for (const raw of m[1].split(',')) {
      const name = raw.trim().split(/\s+as\s+/i)[0].trim();
      if (name) importedNames.add(name);
    }
  }

  // 1) Drop import lines (single- and multi-line), and TS interface/type blocks.
  let cleaned = src
    .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]+['"];?/g, '')
    .replace(/import[^;\n]+;?/g, '')
    .replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\n\}\s*/g, '')
    .replace(/export\s+type\s+\w+[^=]*=[^;]+;?/g, '');

  // 2) Strip the type annotation on the export, e.g. `export const foo: Bar[] = [...]`
  //    becomes `const foo = [...]`.
  cleaned = cleaned.replace(/export\s+const\s+(\w+)\s*:\s*[^=]+=/g, 'const $1 =');
  cleaned = cleaned.replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =');

  // 3) Stub each imported identifier as a plain object that carries its name.
  //    This lets us preserve `icon: Paintbrush` as `{ name: 'Paintbrush' }`.
  const stubLines = Array.from(importedNames)
    .map((n) => `const ${n} = { name: ${JSON.stringify(n)} };`)
    .join('\n');

  // 4) Wrap and evaluate. The trailing `return` exposes the requested binding.
  const factory = new Function(`${stubLines}\n${cleaned}\nreturn ${exportName};`);
  return factory();
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readMinutesFromString(s) {
  const m = String(s || '').match(/(\d+)/);
  return m ? Number(m[1]) : 5;
}

function isoFromHumanDate(s) {
  // Examples in source: "Mar 15, 2026" or "Jan 28, 2026"
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

// ─────────────────────────────────────────────────────────────────────────────
// 1) site-content.json (public site)
// ─────────────────────────────────────────────────────────────────────────────

async function buildSiteContent() {
  const SERVICES_RAW = await loadTsExport('src/data/navigation.ts', 'SERVICES');
  const PRODUCTS_RAW = await loadTsExport('src/data/navigation.ts', 'PRODUCTS');
  const FAQ_RAW = await loadTsExport('src/components/home/FaqData.ts', 'faqData');
  const TESTIMONIALS_RAW = await loadTsExport('src/components/home/TestimonialsData.ts', 'testimonialsData');
  const TEAM_RAW = await loadTsExport('src/components/team/teamData.ts', 'teamData');
  const BLOG_RAW = await loadTsExport('src/data/blogPosts.ts', 'blogPosts');

  // Build category catalog from blog posts, preserving first-seen order.
  const categoryNames = [];
  for (const p of BLOG_RAW) if (!categoryNames.includes(p.category)) categoryNames.push(p.category);

  const blog_categories = categoryNames.map((name, i) => ({
    id: `cat-${slugify(name)}`,
    name,
    slug: slugify(name),
    position: i,
  }));

  const services = SERVICES_RAW.map((s, i) => ({
    id: `svc-${slugify(s.title)}`,
    title: s.title,
    slug: slugify(s.title),
    icon: s.icon?.displayName || s.icon?.name || (typeof s.icon === 'string' ? s.icon : 'Code'),
    href: s.href,
    description: s.desc,
    is_published: true,
    position: i,
    capabilities: (s.items || []).map((label, j) => ({ label, position: j })),
  }));

  const products = PRODUCTS_RAW.map((p, i) => ({
    id: `prod-${slugify(p.title)}`,
    title: p.title,
    slug: slugify(p.title),
    icon: p.icon?.displayName || p.icon?.name || (typeof p.icon === 'string' ? p.icon : 'Package'),
    href: p.href,
    description: p.desc,
    is_published: true,
    position: i,
    hero_image: null,
  }));

  const team_members = TEAM_RAW.map((m, i) => ({
    id: `team-${m.id}`,
    full_name: m.name,
    role: m.role,
    company: m.company || 'TAMx',
    category: m.category || 'Leadership',
    description: m.description || '',
    quote: m.quote || null,
    is_founder: !!m.isFounder,
    avatar_url: m.image,
    position: i,
    is_active: true,
  }));

  const faq_items = FAQ_RAW.map((f, i) => ({
    id: `faq-${f.id}`,
    question: f.question,
    answer: f.answer,
    position: i,
    is_active: true,
  }));

  const testimonials = TESTIMONIALS_RAW.map((t, i) => ({
    id: `testi-${t.id}`,
    name: t.name,
    role: t.role,
    company: t.company,
    body: t.text,
    rating: t.rating ?? 5,
    avatar_url: t.image || null,
    position: i,
    is_active: true,
  }));

  const blog_posts = BLOG_RAW.map((p) => ({
    id: `post-${slugify(p.slug)}`,
    slug: p.slug,
    title: p.title,
    category_slug: slugify(p.category),
    cover_url: p.image,
    author_name: p.author,
    excerpt: p.excerpt,
    content_html: p.content,
    read_minutes: readMinutesFromString(p.readTime),
    status: 'published',
    is_featured: !!p.featured,
    published_at: isoFromHumanDate(p.date),
    original_date_label: p.date,
  }));

  // Pricing plans live in admin/(dashboard)/pricing/page.tsx as INITIAL_PLANS.
  // They are not declared in src/data so we mirror them inline here.
  const pricing_plans = [
    {
      id: 'plan-starter',
      plan_name: 'Starter',
      description: 'Perfect for small projects and initial AI exploration.',
      price: '129',
      currency: 'USD',
      billing_cycle: 'month',
      button_text: 'Get Started',
      is_popular: false,
      is_active: true,
      position: 0,
      features: [
        'Access to basic AI models',
        'Up to 10,000 requests/mo',
        'Community support',
        'Standard response time',
      ],
    },
    {
      id: 'plan-business',
      plan_name: 'Business',
      description: 'Scaled intelligence for growing enterprises and teams.',
      price: '350',
      currency: 'USD',
      billing_cycle: 'month',
      button_text: 'Scale Now',
      is_popular: true,
      is_active: true,
      position: 1,
      features: [
        'Advanced neural processing',
        'Unlimited AI requests',
        'Priority 24/7 support',
        'Custom model fine-tuning',
        'Advanced analytics dashboard',
      ],
    },
    {
      id: 'plan-enterprise',
      plan_name: 'Enterprise',
      description: 'Custom-tailored solutions for global scale and precision.',
      price: 'Custom',
      currency: 'USD',
      billing_cycle: 'month',
      button_text: 'Contact Sales',
      is_popular: false,
      is_active: true,
      position: 2,
      features: [
        'Dedicated infrastructure',
        'On-premise deployment',
        'White-glove implementation',
        'Full API access',
        'SLA guarantees',
      ],
    },
  ];

  const trusted_clients = [
    { id: 'devkeytech', name: 'Devkeytech', position: 0 },
    { id: 'ignite', name: 'Ignite', position: 1 },
    { id: 'moit', name: 'MOIT', position: 2 },
    { id: 'metaversedeviser', name: 'MetaverseDeviser', position: 3 },
    { id: 'quicksilver', name: 'QuickSilver', position: 4 },
    { id: 'nicat', name: 'NICAT', position: 5 },
    { id: 'regionalplan9', name: 'RegionalPlan9', position: 6 },
    { id: 'fbbuilders', name: 'FBBuilders', position: 7 },
  ];

  const site_settings = {
    id: 1,
    contact_email: 'info@tamxai.com',
    contact_phone: '+92 3353898844',
    contact_address: 'Regional Plan 9, NASTP, Islamabad, PK',
    serving_note: 'Serving clients globally',
    social_linkedin: 'https://www.linkedin.com/company/tamxai/',
    social_instagram: '',
    social_facebook: '',
    social_twitter: '',
    meta_title: 'TAMx - Building Digital Solutions That Matter',
    meta_description:
      'AI-driven technology solutions for modern businesses. Transform your business with cutting-edge AI and technology solutions.',
    hero_stats: [
      { label: 'Projects Delivered', value: '30+' },
      { label: 'Satisfaction Rate', value: '100%' },
      { label: 'Support Anytime', value: '24/7' },
    ],
    hero_tagline: 'We empower organizations with AI to transform complex challenges into real world solutions.',
    cta_animated_text: 'powerful digital realities.',
  };

  const navigation = {
    primary: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Products', href: '/product' },
      { label: 'Blog', href: '/blog' },
      { label: 'Team', href: '/team' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
    footer_columns: [
      {
        title: 'Services',
        links: services.map((s) => ({ label: s.title, href: s.href })),
      },
      {
        title: 'Product',
        links: [
          { label: 'Ecommerce', href: '/product/ecommerce' },
          { label: 'LMS', href: '/lms' },
          { label: 'CRM', href: '/product/crm' },
          { label: 'E-Courses', href: '/e-courses' },
        ],
      },
      {
        title: 'Socials',
        links: [
          { label: 'LinkedIn', href: 'https://www.linkedin.com/company/tamxai/', icon: 'Linkedin' },
          { label: 'Instagram', href: '#', icon: 'Instagram' },
          { label: 'Facebook', href: '#', icon: 'Facebook' },
        ],
      },
    ],
  };

  return {
    _meta: {
      generated_at: new Date().toISOString(),
      generator: 'scripts/generate-seed-json.mjs',
      source_files: [
        'src/data/navigation.ts',
        'src/data/blogPosts.ts',
        'src/components/home/FaqData.ts',
        'src/components/home/TestimonialsData.ts',
        'src/components/team/teamData.ts',
      ],
      note: 'Image URLs in this file are the originals (Unsplash + /images/* in repo). After upload to Supabase Storage, replace with bucket URLs of the form: <SUPABASE_URL>/storage/v1/object/public/media/<path>.',
    },
    site_settings,
    navigation,
    services,
    products,
    pricing_plans,
    blog_categories,
    blog_posts,
    team_members,
    faq_items,
    testimonials,
    trusted_clients,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2) admin-data.json (dashboard-only)
// ─────────────────────────────────────────────────────────────────────────────

function buildAdminData() {
  const profiles = [
    { id: 'user-1', email: 'admin@tamx.ai',   full_name: 'Ahmed Malik',   role: 'admin',  status: 'active',    last_login_label: '2 mins ago' },
    { id: 'user-2', email: 'sarah@tamx.ai',   full_name: 'Sarah Wilson',  role: 'editor', status: 'active',    last_login_label: '5 hours ago' },
    { id: 'user-3', email: 'alex@tamx.ai',    full_name: 'Alex Chen',     role: 'viewer', status: 'inactive',  last_login_label: '3 days ago' },
    { id: 'user-4', email: 'm.scott@tamx.ai', full_name: 'Michael Scott', role: 'editor', status: 'suspended', last_login_label: '1 week ago' },
  ];

  const projects = [
    { id: 'proj-1', title: 'TAMx AI Platform',     slug: 'tamx-ai-platform',     industry: 'Artificial Intelligence', status: 'published', published_at: '2024-03-10', cover_url: '/p1.jpg', position: 0, description: '' },
    { id: 'proj-2', title: 'Nexus Cloud Sync',     slug: 'nexus-cloud-sync',     industry: 'Cloud Computing',         status: 'published', published_at: '2024-03-08', cover_url: '/p2.jpg', position: 1, description: '' },
    { id: 'proj-3', title: 'Aether Finance App',   slug: 'aether-finance-app',   industry: 'FinTech',                 status: 'draft',     published_at: null,         cover_url: '/p3.jpg', position: 2, description: '' },
    { id: 'proj-4', title: 'Quantum SEO Suite',    slug: 'quantum-seo-suite',    industry: 'Digital Marketing',       status: 'published', published_at: '2024-03-01', cover_url: '/p4.jpg', position: 3, description: '' },
    { id: 'proj-5', title: 'Zen Healthcare Portal',slug: 'zen-healthcare-portal',industry: 'HealthTech',              status: 'archived',  published_at: '2024-02-28', cover_url: '/p5.jpg', position: 4, description: '' },
    { id: 'proj-6', title: 'Orbit Logistics',      slug: 'orbit-logistics',      industry: 'Logistics',               status: 'draft',     published_at: null,         cover_url: '/p6.jpg', position: 5, description: '' },
  ];

  const media_assets = [
    { id: 'media-1', filename: 'hero_primary_render.webp',  mime: 'image/webp',         kind: 'image',    size_bytes: 2_400_000, width: 3840, height: 2160, path: 'media/library/hero_primary_render.webp',   created_at: '2024-03-10' },
    { id: 'media-2', filename: 'tamx_identity_v2.svg',      mime: 'image/svg+xml',      kind: 'vector',   size_bytes: 12_000,    width: null, height: null, path: 'media/library/tamx_identity_v2.svg',       created_at: '2024-03-08' },
    { id: 'media-3', filename: 'cloud_infra_blueprint.png', mime: 'image/png',          kind: 'image',    size_bytes: 1_200_000, width: 1920, height: 1080, path: 'media/library/cloud_infra_blueprint.png',  created_at: '2024-03-02' },
    { id: 'media-4', filename: 'system_manual_v1.pdf',      mime: 'application/pdf',    kind: 'document', size_bytes: 450_000,   width: null, height: null, path: 'media/library/system_manual_v1.pdf',       created_at: '2024-02-28' },
    { id: 'media-5', filename: 'neural_mesh_motion.mp4',    mime: 'video/mp4',          kind: 'video',    size_bytes: 12_800_000,width: 1920, height: 1080, path: 'media/library/neural_mesh_motion.mp4',     created_at: '2024-02-25' },
    { id: 'media-6', filename: 'corporate_font_spec.json',  mime: 'application/json',   kind: 'code',     size_bytes: 4_000,     width: null, height: null, path: 'media/library/corporate_font_spec.json',   created_at: '2024-02-20' },
  ];

  const contact_submissions = [];
  const meeting_bookings = [];

  const activity_log = [
    { id: 1, actor_name: 'Ahmed Malik',   entity: 'project', entity_id: 'proj-1', action: 'published', created_at_label: '2 hours ago', meta: { title: 'TAMx Mobile App' } },
    { id: 2, actor_name: 'Ahmed Malik',   entity: 'blog',    entity_id: null,     action: 'updated',   created_at_label: '5 hours ago', meta: { title: 'The Future of AI in B2B' } },
    { id: 3, actor_name: 'Ahmed Malik',   entity: 'user',    entity_id: 'user-2', action: 'created',   created_at_label: '1 day ago',   meta: { title: 'Sarah Wilson', role: 'Editor' } },
    { id: 4, actor_name: 'Ahmed Malik',   entity: 'project', entity_id: null,     action: 'deleted',   created_at_label: '2 days ago',  meta: { title: 'Cloud Infrastructure' } },
  ];

  const dashboard_kpis = [
    { key: 'total_projects',    label: 'Total Projects',    value: 42,        trend_value: '12%', trend_up: true,  color: 'purple'   },
    { key: 'published_blogs',   label: 'Published Blogs',   value: 128,       trend_value: '8%',  trend_up: true,  color: 'blue'     },
    { key: 'active_clients',    label: 'Active Clients',    value: '1,240',   trend_value: '5%',  trend_up: true,  color: 'cyan'     },
    { key: 'website_views',     label: 'Website Views',     value: '84.2K',   trend_value: '3%',  trend_up: false, color: 'lavender' },
  ];

  const analytics_kpis = [
    { key: 'bounce_rate',   label: 'Bounce Rate',   value: '24.5%',  trend_value: '2%',  trend_up: false, color: 'purple'   },
    { key: 'avg_session',   label: 'Avg. Session',  value: '4m 32s', trend_value: '15%', trend_up: true,  color: 'blue'     },
    { key: 'direct_traffic',label: 'Direct Traffic',value: '64%',    trend_value: '5%',  trend_up: true,  color: 'cyan'     },
    { key: 'click_rate',    label: 'Click Rate',    value: '3.8%',   trend_value: '1%',  trend_up: true,  color: 'lavender' },
  ];

  const top_countries = [
    { name: 'United States',  flag: '🇺🇸', sessions: '45.2K', share_pct: 54 },
    { name: 'United Kingdom', flag: '🇬🇧', sessions: '12.8K', share_pct: 15 },
    { name: 'Germany',        flag: '🇩🇪', sessions: '8.4K',  share_pct: 10 },
    { name: 'India',          flag: '🇮🇳', sessions: '6.1K',  share_pct: 7 },
    { name: 'Canada',         flag: '🇨🇦', sessions: '4.2K',  share_pct: 5 },
  ];

  const device_breakdown = [
    { label: 'Desktop', share_pct: 65 },
    { label: 'Mobile',  share_pct: 28 },
    { label: 'Tablet',  share_pct: 7  },
  ];

  return {
    _meta: {
      generated_at: new Date().toISOString(),
      generator: 'scripts/generate-seed-json.mjs',
      note: 'These rows are mocked in the existing admin pages. They are seeded into Supabase as initial data so the dashboard works the moment auth is wired.',
    },
    profiles,
    projects,
    media_assets,
    contact_submissions,
    meeting_bookings,
    activity_log,
    dashboard_kpis,
    analytics_kpis,
    top_countries,
    device_breakdown,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Run
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  await mkdir(resolve(ROOT, 'seed'), { recursive: true });

  const site = await buildSiteContent();
  await writeFile(
    resolve(ROOT, 'seed/site-content.json'),
    JSON.stringify(site, null, 2),
    'utf8',
  );

  const admin = buildAdminData();
  await writeFile(
    resolve(ROOT, 'seed/admin-data.json'),
    JSON.stringify(admin, null, 2),
    'utf8',
  );

  const counts = {
    services: site.services.length,
    products: site.products.length,
    pricing_plans: site.pricing_plans.length,
    blog_categories: site.blog_categories.length,
    blog_posts: site.blog_posts.length,
    team_members: site.team_members.length,
    faq_items: site.faq_items.length,
    testimonials: site.testimonials.length,
    trusted_clients: site.trusted_clients.length,
    profiles: admin.profiles.length,
    projects: admin.projects.length,
    media_assets: admin.media_assets.length,
    activity_log: admin.activity_log.length,
  };

  console.log('Seed JSON generated:');
  console.log('  seed/site-content.json');
  console.log('  seed/admin-data.json');
  console.log('Counts:', counts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
