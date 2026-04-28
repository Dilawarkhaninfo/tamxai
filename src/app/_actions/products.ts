'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'

export async function getProducts() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data } = await supabase.from('products').select('*').order('position')
  return data ?? []
}

export async function upsertProduct(formData: {
  id?: string
  title: string
  slug: string
  icon: string
  href: string
  description: string
  is_published: boolean
}) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  let result
  if (formData.id) {
    result = await supabase.from('products').update(formData).eq('id', formData.id).select().single()
  } else {
    const { id: _, ...payload } = formData
    result = await supabase.from('products').insert(payload).select().single()
  }

  if (result.error) return { error: result.error.message }
  await logActivity({ entity: 'product', entity_id: result.data?.id, action: formData.id ? 'updated' : 'created', meta: { title: formData.title } })
  revalidatePath('/admin/products')
  return { success: true }
}

export async function deleteProduct(id: string, title: string) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { error: error.message }
  await logActivity({ entity: 'product', entity_id: id, action: 'deleted', meta: { title } })
  revalidatePath('/admin/products')
  return { success: true }
}

