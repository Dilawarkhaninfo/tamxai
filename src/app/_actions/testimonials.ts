'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'

export async function getTestimonials() {
  const supabase = await createClient()
  const { data } = await supabase.from('testimonials').select('*').order('position')
  return data ?? []
}

export async function getActiveTestimonials() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('position')
  return data ?? []
}

export async function upsertTestimonial(formData: {
  id?: string
  name: string
  role: string
  company: string
  body: string
  rating: number
  avatar_url?: string
  is_active: boolean
}) {
  const supabase = await createClient()
  const payload = {
    name: formData.name,
    role: formData.role,
    company: formData.company,
    body: formData.body,
    rating: formData.rating,
    avatar_url: formData.avatar_url || null,
    is_active: formData.is_active,
  }

  let result
  if (formData.id) {
    result = await supabase.from('testimonials').update(payload).eq('id', formData.id).select().single()
  } else {
    result = await supabase.from('testimonials').insert(payload).select().single()
  }
  if (result.error) return { error: result.error.message }
  await logActivity({ entity: 'testimonial', entity_id: result.data?.id, action: formData.id ? 'updated' : 'created', meta: { name: formData.name } })
  revalidatePath('/admin/testimonials')
  revalidatePath('/', 'layout')
  revalidatePath('/about')
  return { data: result.data }
}

export async function deleteTestimonial(id: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) return { error: error.message }
  await logActivity({ entity: 'testimonial', entity_id: id, action: 'deleted', meta: { name } })
  revalidatePath('/admin/testimonials')
  revalidatePath('/', 'layout')
  return { success: true }
}
