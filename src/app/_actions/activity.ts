'use server'

import { createClient } from '@/lib/supabase/server'

export async function logActivity(params: {
  entity: string
  entity_id?: string
  action: string
  meta?: Record<string, unknown>
}) {
  try {
    const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any
    const { data: { user } } = await supabase.auth.getUser()

    let actor_name: string | null = null
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()
      actor_name = (data as { full_name: string } | null)?.full_name ?? null
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('activity_log').insert({
      actor_id: user?.id ?? null,
      actor_name,
      entity: params.entity,
      entity_id: params.entity_id ?? null,
      action: params.action,
      meta: params.meta ?? {},
    })
  } catch {
    // Non-blocking â€” don't let logging fail the mutation
  }
}

