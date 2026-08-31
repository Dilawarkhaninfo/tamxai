'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendBookingAdminNotification, sendBookingClientConfirmation } from '@/lib/email'
import type { BookingStatus } from '@/lib/supabase/types'

export async function getBookings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('meeting_bookings')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('meeting_bookings')
    .update({ status })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/bookings')
  return { success: true }
}

export async function deleteBooking(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('meeting_bookings').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/bookings')
  return { success: true }
}

export async function submitBooking(data: {
  full_name: string
  email: string
  company: string
  topic: string
  scheduled_at: string
  duration_min: number
}) {
  let dbError: string | null = null

  // Use admin client with service role to bypass anon RLS restriction
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('meeting_bookings').insert({
      full_name: data.full_name,
      email: data.email,
      company: data.company,
      topic: data.topic || '',
      scheduled_at: data.scheduled_at,
      duration_min: data.duration_min || 30,
      status: 'pending',
    })
    if (error) {
      console.error('Supabase booking insert error:', error.message)
      dbError = error.message
    }
  } catch (err: any) {
    console.error('Database connection error in submitBooking:', err?.message || err)
    dbError = err?.message || 'Database error'
  }

  // Send email notifications to both admin and client
  try {
    await Promise.all([
      sendBookingAdminNotification(data),
      sendBookingClientConfirmation(data),
    ])
  } catch (emailError) {
    console.error('Booking email failed:', emailError)
  }

  if (dbError && !process.env.SMTP_USER) {
    return { error: dbError }
  }

  try {
    revalidatePath('/admin/bookings')
  } catch {}
  return { success: true }
}
