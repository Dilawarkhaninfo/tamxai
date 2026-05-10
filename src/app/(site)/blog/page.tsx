import type { Metadata } from 'next';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on AI, software engineering, product design, and digital strategy from the TAMx team. Stay ahead with expert perspectives.',
  openGraph: {
    title: 'Blog | TAMx',
    description: 'Expert insights on AI, software engineering, product design, and digital strategy.',
    url: '/blog',
  },
};

import { getPublishedPosts, getCategories } from '@/app/_actions/blog';
import { BlogClient } from './BlogClient';

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
  ]);

  const categoryNames = categories.map((c) => c.name);

  return <BlogClient posts={posts} categoryNames={categoryNames} />;
}
