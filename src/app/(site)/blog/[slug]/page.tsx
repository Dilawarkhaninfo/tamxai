import { notFound } from 'next/navigation';
import { getPublishedPostBySlug, getPublishedPosts, getPublishedPostSlugs } from '@/app/_actions/blog';
import { BlogDetailClient } from './BlogDetailClient';

// Force dynamic so every request fetches fresh content from Supabase.
// generateStaticParams still pre-generates known slugs at build time when
// env vars are available; if they're not (e.g. first deploy before vars are
// set), we silently return [] and fall back to on-demand rendering.
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    // Guard: skip static generation if Supabase URL is not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
    const slugs = await getPublishedPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    // If DB is unreachable at build time, render all slugs on-demand
    return [];
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({ ...p, content: '' }));

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
