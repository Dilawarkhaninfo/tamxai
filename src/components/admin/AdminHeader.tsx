"use client";

import React from 'react';
import { Bell, Search, User, Menu, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/supabase/types';

interface AdminHeaderProps {
  onMenuClick?: () => void;
  profile: Pick<Profile, 'full_name' | 'role' | 'avatar_url'>;
}

const ROLE_LABELS: Record<string, string> = {
  admin: 'Super Admin',
  editor: 'Content Editor',
  viewer: 'Viewer',
};

export function AdminHeader({ onMenuClick, profile }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="h-20 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Mobile menu */}
      <button onClick={onMenuClick} className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
        <Menu size={24} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search projects, blogs, or settings..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
          <Bell size={20} className="group-hover:animate-pulse" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#030712] shadow-[0_0_8px_#9333EA]" />
        </button>

        <div className="h-8 w-[1px] bg-white/5" />

        <div className="flex items-center gap-3 p-1.5 hover:bg-white/5 rounded-xl transition-all group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{profile.full_name}</p>
            <p className="text-[10px] text-purple-400 font-medium uppercase tracking-wider">
              {ROLE_LABELS[profile.role] ?? profile.role}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-[1px] shadow-lg shadow-purple-500/10">
            <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
              ) : (
                <User className="text-slate-400" size={20} />
              )}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest ml-2"
          >
            <LogOut size={12} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
