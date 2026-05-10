import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tamxai.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/product/crm`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/product/ecommerce`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/e-courses`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/lms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Dynamic blog post URLs
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { getPublishedPostSlugs } = await import('@/app/_actions/blog');
      const slugs = await getPublishedPostSlugs();
      blogPages = slugs.map((slug) => ({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch {
    // If DB is unreachable, skip dynamic pages
  }

  return [...staticPages, ...blogPages];
}
