'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from './activity'

export async function getPlans() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { data } = await supabase
    .from('pricing_plans')
    .select('*, plan_features(id, label, position)')
    .order('position')
  return data ?? []
}

export async function upsertPlan(formData: {
  id?: string
  plan_name: string
  description: string
  price: string
  button_text: string
  is_popular: boolean
  is_active: boolean
  features: { label: string; position: number }[]
}) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any

  const payload = {
    plan_name: formData.plan_name,
    description: formData.description,
    price: formData.price,
    button_text: formData.button_text,
    is_popular: formData.is_popular,
    is_active: formData.is_active,
  }

  let planId = formData.id
  if (planId) {
    const { error } = await supabase.from('pricing_plans').update(payload).eq('id', planId)
    if (error) return { error: error.message }
  } else {
    const { data, error } = await supabase.from('pricing_plans').insert(payload).select('id').single()
    if (error) return { error: error.message }
    planId = data.id
  }

  await supabase.from('plan_features').delete().eq('plan_id', planId)
  if (formData.features.length > 0) {
    await supabase.from('plan_features').insert(
      formData.features.map((f) => ({ plan_id: planId!, label: f.label, position: f.position }))
    )
  }

  await logActivity({ entity: 'pricing', entity_id: planId, action: formData.id ? 'updated' : 'created', meta: { plan_name: formData.plan_name } })
  revalidatePath('/admin/pricing')
  revalidatePath('/pricing')
  return { success: true }
}

export async function deletePlan(id: string, name: string) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
  const { error } = await supabase.from('pricing_plans').delete().eq('id', id)
  if (error) return { error: error.message }
  await logActivity({ entity: 'pricing', entity_id: id, action: 'deleted', meta: { plan_name: name } })
  revalidatePath('/admin/pricing')
  return { success: true }
}

