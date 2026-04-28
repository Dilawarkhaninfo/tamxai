"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { ToastContainer, useToast } from './Toast';
import { cn } from '@/lib/utils';
import type { Profile } from '@/lib/supabase/types';

interface Props {
  children: React.ReactNode;
  profile: Pick<Profile, 'id' | 'full_name' | 'role' | 'avatar_url' | 'email'>;
}

export function AdminDashboardShell({ children, profile }: Props) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  // Welcome toast on first mount
  useEffect(() => {
    const key = 'admin_welcomed';
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      setTimeout(() => showToast(`Welcome back, ${profile.full_name}! Dashboard synchronized.`, 'success'), 800);
    }
  }, [profile.full_name, showToast]);

  // Close mobile sidebar on navigation
  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <div className="min-h-screen bg-[#030712] text-white flex overflow-x-hidden">
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <main className={cn("flex-1 transition-all duration-300", isCollapsed ? "lg:pl-[80px]" : "lg:pl-[280px]")}>
          <div className="flex flex-col min-h-screen">
            <AdminHeader
              onMenuClick={() => setIsMobileOpen(true)}
              profile={profile}
            />
            <div className="p-4 md:p-8 pb-12 overflow-x-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
