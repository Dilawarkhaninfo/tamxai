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

// Fallback data used when Supabase env vars are not configured (e.g. first deploy)
const FALLBACK_SERVICES: NavService[] = []
const FALLBACK_PRODUCTS: NavProduct[] = []
const FALLBACK_SETTINGS: SiteSettings = {
  contact_email: 'info@tamxai.com',
  contact_phone: '+92 3353898844',
  contact_address: 'Regional Plan 9, NASTP, Islamabad, PK',
  social_linkedin: 'https://www.linkedin.com/company/tamxai/',
}

export async function getNavigationServices(): Promise<NavService[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return FALLBACK_SERVICES
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('services')
      .select('title, href, description, service_capabilities(label, position)')
      .eq('is_published', true)
      .order('position')

    if (!data) return FALLBACK_SERVICES

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((s: any) => ({
      title: s.title,
      href: s.href || '/services',
      desc: s.description,
      items: (s.service_capabilities as { label: string; position: number }[])
        .sort((a, b) => a.position - b.position)
        .map((c) => c.label),
    }))
  } catch {
    return FALLBACK_SERVICES
  }
}

export async function getNavigationProducts(): Promise<NavProduct[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return FALLBACK_PRODUCTS
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('title, href, description')
      .eq('is_published', true)
      .order('position')

    if (!data) return FALLBACK_PRODUCTS

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((p: any) => ({
      title: p.title,
      href: p.href,
      desc: p.description,
    }))
  } catch {
    return FALLBACK_PRODUCTS
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return FALLBACK_SETTINGS
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_settings')
      .select('contact_email, contact_phone, contact_address, social_linkedin')
      .single()

    return {
      contact_email: data?.contact_email ?? FALLBACK_SETTINGS.contact_email,
      contact_phone: data?.contact_phone ?? FALLBACK_SETTINGS.contact_phone,
      contact_address: data?.contact_address ?? FALLBACK_SETTINGS.contact_address,
      social_linkedin: data?.social_linkedin ?? FALLBACK_SETTINGS.social_linkedin,
    }
  } catch {
    return FALLBACK_SETTINGS
  }
}
