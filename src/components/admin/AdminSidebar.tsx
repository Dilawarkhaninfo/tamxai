"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Wrench, 
  Package, 
  Image as ImageIcon, 
  BarChart3, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Briefcase, label: 'Projects', href: '/admin/projects' },
  { icon: FileText, label: 'Blog', href: '/admin/blog' },
  { icon: Wrench, label: 'Services', href: '/admin/services' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: ImageIcon, label: 'Media Library', href: '/admin/media' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({ isCollapsed, setIsCollapsed, isMobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    window.location.href = '/admin/login';
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '280px',
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0)
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-[#030712] border-r border-white/5 flex flex-col z-[70] transition-all duration-300 lg:translate-x-0",
          !isMobileOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-white/5 bg-[#010205]">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(0,0,0,0.8)] ring-1 ring-purple-500/20">
                  <img src="/Logo_tamx.png" alt="TAMx" className="w-full h-auto object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent uppercase">
                    TAM<span className="text-purple-500">x</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] -mt-0.5">
                    Management <span className="text-purple-500/50">Panel</span>
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="logo-small"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mx-auto"
              >
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center p-2 shadow-lg ring-1 ring-purple-500/20">
                  <img src="/Logo_tamx.png" alt="TAMx" className="w-full h-auto object-contain" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.label} href={item.href}>
                <div className={cn(
                  "group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-purple-600/10 text-white" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}>
                  {/* Active Indicator Gaps */}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-purple-500 rounded-full shadow-[0_0_10px_#9333EA]" />
                  )}

                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    isActive ? "text-purple-400" : "group-hover:text-purple-400 group-hover:scale-110"
                  )}>
                    <item.icon size={20} className={cn(
                      "transition-all duration-300",
                      isActive ? "drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]" : "group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]"
                    )} />
                  </div>

                  {!isCollapsed && (
                    <span className="font-medium whitespace-nowrap overflow-hidden">
                      {item.label}
                    </span>
                  )}

                  {/* Tooltip for collapsed mode */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-1 bg-[#1E293B] border border-white/10 rounded-md text-xs font-medium text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50 whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 group"
          >
            <div className="p-2 group-hover:scale-110 transition-transform">
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </div>
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Collapse</span>}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/5 rounded-xl transition-all duration-300 group"
          >
            <div className="p-2 group-hover:scale-110 transition-transform">
              <LogOut size={20} />
            </div>
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Log Out</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
