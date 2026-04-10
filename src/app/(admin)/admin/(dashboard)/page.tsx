"use client";

import React from 'react';
import { StatCard } from '@/components/admin/StatCard';
import { TrafficChart, EngagementChart } from '@/components/admin/DashboardCharts';
import { 
  Briefcase, 
  FileText, 
  Users, 
  Eye,
  Plus,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const recentActivities = [
  { id: 1, type: 'project', title: 'TAMx Mobile App', action: 'published', time: '2 hours ago', status: 'live' },
  { id: 2, type: 'blog', title: 'The Future of AI in B2B', action: 'updated', time: '5 hours ago', status: 'draft' },
  { id: 3, type: 'user', title: 'Sarah Wilson', action: 'joined as Editor', time: '1 day ago', status: 'active' },
  { id: 4, type: 'project', title: 'Cloud Infrastructure', action: 'deleted', time: '2 days ago', status: 'removed' },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400">Welcome back, Ahmed. Here's what's happening with TAMx today.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
             View Website
             <ArrowUpRight size={16} />
           </button>
           <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
             <Plus size={18} />
             New Project
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Projects" 
          value="42" 
          icon={Briefcase} 
          trend={{ value: '12%', isUp: true }} 
          color="purple" 
        />
        <StatCard 
          title="Published Blogs" 
          value="128" 
          icon={FileText} 
          trend={{ value: '8%', isUp: true }} 
          color="blue" 
        />
        <StatCard 
          title="Active Clients" 
          value="1,240" 
          icon={Users} 
          trend={{ value: '5%', isUp: true }} 
          color="cyan" 
        />
        <StatCard 
          title="Website Views" 
          value="84.2K" 
          icon={Eye} 
          trend={{ value: '3%', isUp: false }} 
          color="lavender" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TrafficChart />
        <EngagementChart />
      </div>

      {/* Bottom Grid: Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold">Recent Activity</h4>
            <button className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">View All</button>
          </div>
          
          <div className="space-y-1">
            {recentActivities.map((activity, idx) => (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'project' ? 'bg-purple-500/10 text-purple-400' :
                    activity.type === 'blog' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-cyan-500/10 text-cyan-400'
                  }`}>
                    {activity.type === 'project' ? <Briefcase size={18} /> : 
                     activity.type === 'blog' ? <FileText size={18} /> : <Users size={18} />}
                  </div>
                  <div>
                    <h5 className="font-semibold text-white group-hover:text-purple-300 transition-colors">{activity.title}</h5>
                    <p className="text-sm text-slate-500">
                      <span className="capitalize text-slate-400">{activity.action}</span> • {activity.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                     activity.status === 'live' ? 'bg-emerald-500/10 text-emerald-400' :
                     activity.status === 'draft' ? 'bg-amber-500/10 text-amber-400' :
                     'bg-slate-500/10 text-slate-400'
                   }`}>
                     {activity.status}
                   </span>
                   <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Stats / Mini Cards */}
        <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
           <div className="relative z-10 flex flex-col h-full">
              <h4 className="text-lg font-bold mb-2">TAMx Insights</h4>
              <p className="text-sm text-slate-300 mb-6">Your website traffic has increased by 15% this week. Keep up the great work!</p>
              
              <div className="mt-auto space-y-4">
                 <div className="p-4 bg-[#030712]/60 backdrop-blur-md border border-white/5 rounded-xl">
                   <div className="flex justify-between items-end mb-2">
                     <span className="text-xs text-slate-400">Server Status</span>
                     <span className="text-xs text-emerald-400 font-bold">Optimal</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981]" 
                      />
                   </div>
                 </div>

                 <div className="p-4 bg-[#030712]/60 backdrop-blur-md border border-white/5 rounded-xl">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs text-slate-400">Cloud Storage</span>
                      <span className="text-xs text-blue-400 font-bold">64.8 GB / 100 GB</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '64.8%' }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" 
                      />
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Decoration */}
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <ArrowUpRight size={120} className="rotate-12 transition-transform duration-500" />
           </div>
        </div>
      </div>
    </div>
  );
}
