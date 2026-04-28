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
