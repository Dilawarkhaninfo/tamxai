import { getPosts, getCategories } from '@/app/_actions/blog';
import { BlogAdminClient } from '@/components/admin/BlogAdminClient';

export default async function BlogManagementPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <BlogAdminClient initialPosts={posts as any[]} initialCategories={categories as any[]} />;
}
