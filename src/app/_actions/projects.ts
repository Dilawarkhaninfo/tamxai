'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'
import type { ProjectStatus } from '@/lib/supabase/types'

export async function getProjects() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data } = await supabase
    .from('projects')
    .select('*, project_images(id, url, alt, position)')
    .order('position')
  return data ?? []
}

export async function upsertProject(formData: {
  id?: string
  title: string
  slug: string
  industry: string
  description: string
  cover_url?: string
  status: ProjectStatus
}) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const payload = {
    title: formData.title,
    slug: formData.slug,
    industry: formData.industry,
    description: formData.description,
    cover_url: formData.cover_url || null,
    status: formData.status,
    published_at: formData.status === 'published' ? new Date().toISOString() : null,
  }

  let result
  if (formData.id) {
    result = await supabase.from('projects').update(payload).eq('id', formData.id).select().single()
  } else {
    result = await supabase.from('projects').insert(payload).select().single()
  }

  if (result.error) return { error: result.error.message }
  await logActivity({ entity: 'project', entity_id: result.data?.id, action: formData.id ? 'updated' : 'created', meta: { title: formData.title } })
  revalidatePath('/admin/projects')
  return { data: result.data }
}

export async function deleteProject(id: string, title: string) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) return { error: error.message }
  await logActivity({ entity: 'project', entity_id: id, action: 'deleted', meta: { title } })
  revalidatePath('/admin/projects')
  return { success: true }
}

