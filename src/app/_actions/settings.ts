'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'

export async function getSettings() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single()
  return data
}

export async function updateSettings(formData: {
  contact_email: string
  contact_phone: string
  contact_address: string
  social_linkedin?: string
  social_instagram?: string
  social_facebook?: string
  social_twitter?: string
  meta_title?: string
  meta_description?: string
}) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('site_settings')
    .update({ ...formData, updated_by: user?.id ?? null })
    .eq('id', 1)

  if (error) return { error: error.message }

  await logActivity({ entity: 'settings', action: 'updated', meta: { fields: Object.keys(formData) } })
  revalidatePath('/admin/settings')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function changePassword(newPassword: string) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { error: error.message }
  return { success: true }
}

