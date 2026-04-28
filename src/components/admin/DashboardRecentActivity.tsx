"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Users, Settings, ChevronRight, Package, Wrench } from 'lucide-react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActivityRow = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ENTITY_ICON: Record<string, React.ComponentType<any>> = {
  project:  Briefcase,
  blog:     FileText,
  user:     Users,
  service:  Wrench,
  product:  Package,
  settings: Settings,
};

const ENTITY_COLOR: Record<string, string> = {
  project:  'bg-purple-500/10 text-purple-400',
  blog:     'bg-blue-500/10 text-blue-400',
  user:     'bg-cyan-500/10 text-cyan-400',
  service:  'bg-indigo-500/10 text-indigo-400',
  product:  'bg-green-500/10 text-green-400',
  settings: 'bg-slate-500/10 text-slate-400',
};

const ACTION_BADGE: Record<string, string> = {
  published: 'bg-emerald-500/10 text-emerald-400',
  created:   'bg-blue-500/10 text-blue-400',
  updated:   'bg-amber-500/10 text-amber-400',
  deleted:   'bg-slate-500/10 text-slate-400',
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)   return 'just now';
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

interface Props { activity: ActivityRow[] }

export function DashboardRecentActivity({ activity }: Props) {
  return (
    <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-bold">Recent Activity</h4>
        <span className="text-xs text-purple-400 font-medium">Live from DB</span>
      </div>

      {activity.length === 0 ? (
        <div className="py-12 text-center text-slate-600 text-sm font-medium">
          No activity yet. Start creating content!
        </div>
      ) : (
        <div className="space-y-1">
          {activity.map((item, idx) => {
            const Icon  = ENTITY_ICON[item.entity] ?? FileText;
            const color = ENTITY_COLOR[item.entity] ?? 'bg-slate-500/10 text-slate-400';
            const badge = ACTION_BADGE[item.action]  ?? 'bg-slate-500/10 text-slate-400';
            const title = (item.meta as Record<string,string>)?.title
              || (item.meta as Record<string,string>)?.name
              || (item.meta as Record<string,string>)?.email
              || (item.meta as Record<string,string>)?.plan_name
              || item.entity;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white group-hover:text-purple-300 transition-colors capitalize">
                      {title}
                    </h5>
                    <p className="text-sm text-slate-500">
                      <span className="capitalize text-slate-400">{item.actor_name ?? 'System'}</span>
                      {' '}·{' '}{item.action}{' '}·{' '}{timeAgo(item.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${badge}`}>
                    {item.action}
                  </span>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
