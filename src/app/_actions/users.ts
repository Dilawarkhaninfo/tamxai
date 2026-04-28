'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'
import type { UserRole, UserStatus } from '@/lib/supabase/types'

export async function getUsers() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, status, last_login_at, created_at')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function inviteUser(formData: {
  email: string
  full_name: string
  role: UserRole
  password: string
}) {
  const admin = createAdminClient()

  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email: formData.email,
    password: formData.password,
    email_confirm: true,
    user_metadata: {},
  })

  if (authError) return { error: authError.message }

  // Update profile created by trigger
  await admin
    .from('profiles')
    .update({ full_name: formData.full_name, role: formData.role })
    .eq('id', authData.user.id)

  await logActivity({ entity: 'user', entity_id: authData.user.id, action: 'created', meta: { email: formData.email, role: formData.role } })
  revalidatePath('/admin/users')
  return { success: true }
}

export async function updateUserRole(id: string, role: UserRole) {
  const admin = createAdminClient()
  const { error } = await admin.from('profiles').update({ role }).eq('id', id)
  if (error) return { error: error.message }
  await logActivity({ entity: 'user', entity_id: id, action: 'role_updated', meta: { role } })
  revalidatePath('/admin/users')
  return { success: true }
}

export async function updateUserStatus(id: string, status: UserStatus) {
  const admin = createAdminClient()
  const { error } = await admin.from('profiles').update({ status }).eq('id', id)
  if (error) return { error: error.message }

  // Suspended users: revoke all sessions
  if (status === 'suspended') {
    await admin.auth.admin.signOut(id, 'global')
  }

  await logActivity({ entity: 'user', entity_id: id, action: 'status_updated', meta: { status } })
  revalidatePath('/admin/users')
  return { success: true }
}

export async function deleteUser(id: string, email: string) {
  const admin = createAdminClient()
  const { error } = await admin.auth.admin.deleteUser(id)
  if (error) return { error: error.message }
  await logActivity({ entity: 'user', entity_id: id, action: 'deleted', meta: { email } })
  revalidatePath('/admin/users')
  return { success: true }
}

