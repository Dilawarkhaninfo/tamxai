'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'

export async function getServices() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data } = await supabase
    .from('services')
    .select('*, service_capabilities(id, label, position)')
    .order('position')
  return data ?? []
}

export async function upsertService(formData: {
  id?: string
  title: string
  slug: string
  icon: string
  href: string
  description: string
  is_published: boolean
  capabilities: { label: string; position: number }[]
}) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const payload = {
    title: formData.title,
    slug: formData.slug,
    icon: formData.icon,
    href: formData.href,
    description: formData.description,
    is_published: formData.is_published,
  }

  let serviceId = formData.id
  if (serviceId) {
    const { error } = await supabase.from('services').update(payload).eq('id', serviceId)
    if (error) return { error: error.message }
  } else {
    const { data, error } = await supabase.from('services').insert(payload).select('id').single()
    if (error) return { error: error.message }
    serviceId = data.id
  }

  // Replace capabilities
  await supabase.from('service_capabilities').delete().eq('service_id', serviceId)
  if (formData.capabilities.length > 0) {
    await supabase.from('service_capabilities').insert(
      formData.capabilities.map((c) => ({ service_id: serviceId!, label: c.label, position: c.position }))
    )
  }

  await logActivity({ entity: 'service', entity_id: serviceId, action: formData.id ? 'updated' : 'created', meta: { title: formData.title } })
  revalidatePath('/admin/services')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteService(id: string, title: string) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) return { error: error.message }
  await logActivity({ entity: 'service', entity_id: id, action: 'deleted', meta: { title } })
  revalidatePath('/admin/services')
  return { success: true }
}

