"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  color: 'purple' | 'blue' | 'cyan' | 'lavender';
}

const colorMap = {
  purple: 'from-purple-600/20 to-purple-900/10 border-purple-500/20 text-purple-400',
  blue: 'from-blue-600/20 to-blue-900/10 border-blue-500/20 text-blue-400',
  cyan: 'from-cyan-600/20 to-cyan-900/10 border-cyan-500/20 text-cyan-400',
  lavender: 'from-fuchsia-600/20 to-fuchsia-900/10 border-fuchsia-500/20 text-fuchsia-400',
};

const iconBgMap = {
  purple: 'bg-purple-500/10 text-purple-400',
  blue: 'bg-blue-500/10 text-blue-400',
  cyan: 'bg-cyan-500/10 text-cyan-400',
  lavender: 'bg-fuchsia-500/10 text-fuchsia-400',
};

export function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br backdrop-blur-sm transition-all duration-300",
        colorMap[color]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full",
                trend.isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              )}>
                {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {trend.value}
              </div>
              <span className="text-xs text-slate-500">vs last month</span>
            </div>
          )}
        </div>

        <div className={cn("p-3 rounded-xl", iconBgMap[color])}>
           <Icon size={24} />
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 blur-[60px] opacity-20 bg-current pointer-events-none" />
    </motion.div>
  );
}
