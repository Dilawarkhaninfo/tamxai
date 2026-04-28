"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const ACTIONS = [
  { label: 'Write a blog post',  href: '/admin/blog',     color: 'text-orange-400' },
  { label: 'Add team member',    href: '/admin/team',     color: 'text-purple-400' },
  { label: 'Update pricing',     href: '/admin/pricing',  color: 'text-blue-400' },
  { label: 'Upload media',       href: '/admin/media',    color: 'text-cyan-400' },
  { label: 'Site settings',      href: '/admin/settings', color: 'text-slate-400' },
];

export function DashboardQuickActions() {
  return (
    <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
      <div className="relative z-10 flex flex-col h-full">
        <h4 className="text-lg font-bold mb-2">Quick Actions</h4>
        <p className="text-sm text-slate-300 mb-6">Jump straight to the section you need.</p>
        <div className="mt-auto space-y-3">
          {ACTIONS.map(item => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center justify-between p-3 bg-[#030712]/60 backdrop-blur-md border border-white/5 rounded-xl hover:border-purple-500/30 transition-all group/item cursor-pointer">
                <span className={`text-xs font-bold uppercase tracking-widest ${item.color}`}>{item.label}</span>
                <ChevronRight size={14} className="text-slate-600 group-hover/item:text-white transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <motion.div animate={{ rotate: [12, 14, 12] }} transition={{ repeat: Infinity, duration: 3 }}>
          <ArrowUpRight size={120} />
        </motion.div>
      </div>
    </div>
  );
}
