'use server'

import { createClient } from '@/lib/supabase/server'

export interface NavService {
  title: string
  href: string
  desc: string
  items: string[]
}

export interface NavProduct {
  title: string
  href: string
  desc: string
}

export interface SiteSettings {
  contact_email: string
  contact_phone: string
  contact_address: string
  social_linkedin: string | null
}

export async function getNavigationServices(): Promise<NavService[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('services')
    .select('title, href, description, service_capabilities(label, position)')
    .eq('is_published', true)
    .order('position')

  if (!data) return []

  return data.map((s: any) => ({
    title: s.title,
    href: s.href || '/services',
    desc: s.description,
    items: (s.service_capabilities as { label: string; position: number }[])
      .sort((a, b) => a.position - b.position)
      .map((c) => c.label),
  }))
}

export async function getNavigationProducts(): Promise<NavProduct[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('title, href, description')
    .eq('is_published', true)
    .order('position')

  if (!data) return []

  return data.map((p: any) => ({
    title: p.title,
    href: p.href,
    desc: p.description,
  }))
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('contact_email, contact_phone, contact_address, social_linkedin')
    .single()

  return {
    contact_email: data?.contact_email ?? 'info@tamxai.com',
    contact_phone: data?.contact_phone ?? '',
    contact_address: data?.contact_address ?? '',
    social_linkedin: data?.social_linkedin ?? 'https://www.linkedin.com/company/tamxai/',
  }
}
