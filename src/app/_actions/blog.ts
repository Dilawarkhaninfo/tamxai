'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'
import type { PostStatus } from '@/lib/supabase/types'

export async function upsertPost(formData: {
  id?: string
  slug: string
  title: string
  category_id?: string
  cover_url?: string
  author_name: string
  excerpt: string
  content_html: string
  read_minutes: number
  status: PostStatus
  is_featured: boolean
}) {
  const supabase = await createClient()

  const payload = {
    slug: formData.slug,
    title: formData.title,
    category_id: formData.category_id || null,
    cover_url: formData.cover_url || null,
    author_name: formData.author_name,
    excerpt: formData.excerpt,
    content_html: formData.content_html,
    read_minutes: formData.read_minutes,
    status: formData.status,
    is_featured: formData.is_featured,
    published_at: formData.status === 'published' ? new Date().toISOString() : null,
  }

  let result
  if (formData.id) {
    result = await supabase
      .from('blog_posts')
      .update(payload)
      .eq('id', formData.id)
      .select()
      .single()
  } else {
    result = await supabase
      .from('blog_posts')
      .insert(payload)
      .select()
      .single()
  }

  if (result.error) return { error: result.error.message }

  await logActivity({
    entity: 'blog',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity_id: (result.data as any)?.id,
    action: formData.id ? 'updated' : 'created',
    meta: { title: formData.title },
  })

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return { data: result.data }
}

export async function deletePost(id: string, title: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) return { error: error.message }

  await logActivity({ entity: 'blog', entity_id: id, action: 'deleted', meta: { title } })
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return { success: true }
}

export async function getPosts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name, slug)')
    .order('created_at', { ascending: false })

  if (error) return []
  return data ?? []
}

export async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_categories')
    .select('*')
    .order('position')
  return data ?? []
}

// ─── Public-facing helpers ────────────────────────────────────────────────────

export interface PublicBlogPost {
  slug: string
  title: string
  category: string
  image: string
  author: string
  date: string
  readTime: string
  excerpt: string
  featured: boolean
}

export interface PublicBlogPostFull extends PublicBlogPost {
  content: string
}

export async function getPublishedPosts(): Promise<PublicBlogPost[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('slug, title, cover_url, author_name, excerpt, read_minutes, is_featured, published_at, blog_categories(name)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (!data) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((p: any) => ({
    slug: p.slug,
    title: p.title,
    category: p.blog_categories?.name ?? 'General',
    image: p.cover_url ?? '',
    author: p.author_name,
    date: p.published_at
      ? new Date(p.published_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
    readTime: `${p.read_minutes} min read`,
    excerpt: p.excerpt,
    featured: p.is_featured ?? false,
  }))
}

export async function getPublishedPostBySlug(slug: string): Promise<PublicBlogPostFull | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('slug, title, cover_url, author_name, excerpt, content_html, read_minutes, is_featured, published_at, blog_categories(name)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!data) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = data as any
  return {
    slug: p.slug,
    title: p.title,
    category: p.blog_categories?.name ?? 'General',
    image: p.cover_url ?? '',
    author: p.author_name,
    date: p.published_at
      ? new Date(p.published_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
    readTime: `${p.read_minutes} min read`,
    excerpt: p.excerpt,
    featured: p.is_featured ?? false,
    content: p.content_html,
  }
}

export async function getPublishedPostSlugs(): Promise<string[]> {
  // Use admin client to avoid cookies() call outside request scope (generateStaticParams)
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')

  if (!data) return []
  return data.map((p) => p.slug)
}
