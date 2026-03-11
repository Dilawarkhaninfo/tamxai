"use client";

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer2,
  Clock,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { TrafficChart, EngagementChart } from '@/components/admin/DashboardCharts';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
           <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
             <BarChart3 size={20} />
           </div>
           <h1 className="text-3xl font-bold text-white">Website Analytics</h1>
        </div>
        <p className="text-slate-400">Deep dive into your website performance and user engagement metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Bounce Rate" value="24.5%" icon={ArrowUpRight} trend={{ value: '2%', isUp: false }} color="purple" />
        <StatCard title="Avg. Session" value="4m 32s" icon={Clock} trend={{ value: '15%', isUp: true }} color="blue" />
        <StatCard title="Direct Traffic" value="64%" icon={Globe} trend={{ value: '5%', isUp: true }} color="cyan" />
        <StatCard title="Click Rate" value="3.8%" icon={MousePointer2} trend={{ value: '1%', isUp: true }} color="lavender" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <TrafficChart />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
           <h4 className="font-bold text-white mb-6">Top Countries</h4>
           <div className="space-y-6">
              {[
                { name: 'United States', flag: '🇺🇸', sessions: '45.2K', share: '54%' },
                { name: 'United Kingdom', flag: '🇬🇧', sessions: '12.8K', share: '15%' },
                { name: 'Germany', flag: '🇩🇪', sessions: '8.4K', share: '10%' },
                { name: 'India', flag: '🇮🇳', sessions: '6.1K', share: '7%' },
                { name: 'Canada', flag: '🇨🇦', sessions: '4.2K', share: '5%' },
              ].map((country) => (
                <div key={country.name} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <span className="text-xl">{country.flag}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{country.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{country.sessions} Sessions</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-bold text-purple-400">{country.share}</p>
                      <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                         <div className="h-full bg-purple-500" style={{ width: country.share }} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EngagementChart />
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
           <h4 className="font-bold text-white mb-6">Device Breakdown</h4>
           <div className="flex items-center justify-around h-[200px]">
              {[
                { label: 'Desktop', icon: '💻', val: 65, color: 'bg-purple-500' },
                { label: 'Mobile', icon: '📱', val: 28, color: 'bg-blue-500' },
                { label: 'Tablet', icon: '📟', val: 7, color: 'bg-cyan-500' },
              ].map((device) => (
                <div key={device.label} className="flex flex-col items-center gap-4">
                   <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" 
                                strokeDasharray={`${device.val}, 100`} className={device.val > 0 ? 'text-purple-500' : 'text-slate-700'} 
                                strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-xl">{device.icon}</span>
                         <span className="text-[10px] font-bold text-white">{device.val}%</span>
                      </div>
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{device.label}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
