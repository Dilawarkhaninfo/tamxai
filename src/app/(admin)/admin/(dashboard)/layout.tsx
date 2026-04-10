"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, useToast } from '@/components/admin/Toast';
import { cn } from '@/lib/utils';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    // Basic Auth Check
    const isAuth = localStorage.getItem('admin_auth') === 'true';
    if (!isAuth && !pathname.includes('/login')) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // Show welcome toast on first load
  useEffect(() => {
    if (isAuthorized === true) {
      setTimeout(() => {
        showToast('Welcome back, Ahmed Malik! Dashboard synchronized.', 'success');
      }, 1000);
    }
  }, [isAuthorized]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (isAuthorized === null) return null;

  return (
    <div className="min-h-screen bg-[#030712] text-white flex overflow-x-hidden">
      <AdminSidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
         <main 
           className={cn(
             "flex-1 transition-all duration-300",
             isCollapsed ? "lg:pl-[80px]" : "lg:pl-[280px]"
           )}
         >
            <div className="flex flex-col min-h-screen">
               <AdminHeader onMenuClick={() => setIsMobileOpen(true)} />
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
