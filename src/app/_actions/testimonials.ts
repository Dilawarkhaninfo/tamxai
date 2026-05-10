'use server'

import { createClient } from '@/lib/supabase/server'

export async function getActiveTestimonials() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('position')
  return data ?? []
}
