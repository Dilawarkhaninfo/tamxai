import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedPostBySlug, getPublishedPosts, getPublishedPostSlugs } from '@/app/_actions/blog';
import { BlogDetailClient } from './BlogDetailClient';

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on the TAMx blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on the TAMx blog.`,
      url: `/blog/${slug}`,
      type: 'article',
      ...(post.cover_url ? { images: [{ url: post.cover_url }] } : {}),
    },
  };
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
