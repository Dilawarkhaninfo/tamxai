import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminDashboardShell } from '@/components/admin/AdminDashboardShell';
import type { Profile } from '@/lib/supabase/types';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  const { data } = await supabase
    .from('profiles')
    .select('id, full_name, role, avatar_url, email')
    .eq('id', user.id)
    .single();

  const profile = data as Pick<Profile, 'id' | 'full_name' | 'role' | 'avatar_url' | 'email'> | null;

  if (!profile) redirect('/admin/login');

  return <AdminDashboardShell profile={profile}>{children}</AdminDashboardShell>;
}
