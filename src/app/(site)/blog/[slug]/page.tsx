import { notFound } from 'next/navigation';
import { getPublishedPostBySlug, getPublishedPosts, getPublishedPostSlugs } from '@/app/_actions/blog';
import { BlogDetailClient } from './BlogDetailClient';

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts in the same category (excluding current)
  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({ ...p, content: '' }));

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
