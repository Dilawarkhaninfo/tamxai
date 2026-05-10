'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { sendAdminNotification, sendClientConfirmation } from '@/lib/email'
import type { SubmissionStatus } from '@/lib/supabase/types'

export async function getContactSubmissions() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/contacts')
  return { success: true }
}

export async function deleteSubmission(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('contact_submissions').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/contacts')
  return { success: true }
}

export async function submitContact(formData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  countryCode: string
  service: string
  budget: string
  message: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.from('contact_submissions').insert({
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone || null,
    country_code: formData.countryCode || null,
    service: formData.service || null,
    budget: formData.budget || null,
    message: formData.message,
  })
  if (error) return { error: error.message }

  // Send email notifications (non-blocking — don't fail the form if emails fail)
  try {
    await Promise.all([
      sendAdminNotification(formData),
      sendClientConfirmation(formData),
    ])
  } catch (emailError) {
    console.error('Email sending failed:', emailError)
    // Form submission still succeeds even if emails fail
  }

  return { success: true }
}
