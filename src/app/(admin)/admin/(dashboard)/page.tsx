import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { DashboardRecentActivity } from '@/components/admin/DashboardRecentActivity';
import { DashboardQuickActions } from '@/components/admin/DashboardQuickActions';
import { TrafficChart, EngagementChart } from '@/components/admin/DashboardCharts';
import Link from 'next/link';

async function getDashboardStats() {
  const supabase = await createClient();

  const [projects, posts, team, services] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('team_members').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('services').select('id', { count: 'exact', head: true }).eq('is_published', true),
  ]);

  return {
    totalProjects:  projects.count ?? 0,
    publishedBlogs: posts.count    ?? 0,
    activeTeam:     team.count     ?? 0,
    activeServices: services.count ?? 0,
  };
}

async function getRecentActivity() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8);
  return (data ?? []) as Record<string, unknown>[];
}

export default async function DashboardHome() {
  const [stats, activity] = await Promise.all([getDashboardStats(), getRecentActivity()]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400">Real-time data from your TAMx database.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
              View Website ↗
            </button>
          </Link>
          <Link href="/admin/blog">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              + New Post
            </button>
          </Link>
        </div>
      </div>

      {/* Stats — client component owns the Lucide icons */}
      <DashboardStats
        totalProjects={stats.totalProjects}
        publishedBlogs={stats.publishedBlogs}
        activeTeam={stats.activeTeam}
        activeServices={stats.activeServices}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TrafficChart />
        <EngagementChart />
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <DashboardRecentActivity activity={activity} />
        <DashboardQuickActions />
      </div>
    </div>
  );
}
