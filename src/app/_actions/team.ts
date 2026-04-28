'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'

export async function getTeamMembers() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data } = await supabase.from('team_members').select('*').order('position')
  return data ?? []
}

export async function upsertTeamMember(formData: {
  id?: string
  full_name: string
  role: string
  company: string
  category: string
  description: string
  quote?: string
  is_founder: boolean
  avatar_url?: string
  is_active: boolean
}) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const payload = {
    full_name: formData.full_name,
    role: formData.role,
    company: formData.company || 'TAMx',
    category: formData.category,
    description: formData.description,
    quote: formData.quote || null,
    is_founder: formData.is_founder,
    avatar_url: formData.avatar_url || null,
    is_active: formData.is_active,
  }

  let result
  if (formData.id) {
    result = await supabase.from('team_members').update(payload).eq('id', formData.id).select().single()
  } else {
    result = await supabase.from('team_members').insert(payload).select().single()
  }

  if (result.error) return { error: result.error.message }
  await logActivity({ entity: 'team', entity_id: result.data?.id, action: formData.id ? 'updated' : 'created', meta: { name: formData.full_name } })
  revalidatePath('/admin/team')
  revalidatePath('/team')
  return { data: result.data }
}

export async function deleteTeamMember(id: string, name: string) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { error } = await supabase.from('team_members').delete().eq('id', id)
  if (error) return { error: error.message }
  await logActivity({ entity: 'team', entity_id: id, action: 'deleted', meta: { name } })
  revalidatePath('/admin/team')
  return { success: true }
}

