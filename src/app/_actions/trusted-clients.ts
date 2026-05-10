'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'

export async function getTrustedClients() {
  const supabase = await createClient()
  const { data } = await supabase.from('trusted_clients').select('*').order('position')
  return data ?? []
}

export async function getActiveTrustedClients() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('trusted_clients')
    .select('*')
    .eq('is_active', true)
    .order('position')
  return data ?? []
}

export async function upsertTrustedClient(formData: {
  id?: string
  name: string
  logo_url?: string
  is_active: boolean
}) {
  const supabase = await createClient()
  const payload = {
    name: formData.name,
    logo_url: formData.logo_url || null,
    is_active: formData.is_active,
  }

  let result
  if (formData.id) {
    result = await supabase.from('trusted_clients').update(payload).eq('id', formData.id).select().single()
  } else {
    result = await supabase.from('trusted_clients').insert({ id: formData.name.toLowerCase().replace(/\s+/g, '-'), ...payload }).select().single()
  }
  if (result.error) return { error: result.error.message }
  await logActivity({ entity: 'trusted_client', entity_id: result.data?.id, action: formData.id ? 'updated' : 'created', meta: { name: formData.name } })
  revalidatePath('/admin/trusted-clients')
  revalidatePath('/', 'layout')
  return { data: result.data }
}

export async function deleteTrustedClient(id: string, name: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('trusted_clients').delete().eq('id', id)
  if (error) return { error: error.message }
  await logActivity({ entity: 'trusted_client', entity_id: id, action: 'deleted', meta: { name } })
  revalidatePath('/admin/trusted-clients')
  revalidatePath('/', 'layout')
  return { success: true }
}
