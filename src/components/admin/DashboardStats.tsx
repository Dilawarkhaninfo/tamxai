"use client";

import { Briefcase, FileText, Users, Eye } from 'lucide-react';
import { StatCard } from './StatCard';

interface Props {
  totalProjects: number;
  publishedBlogs: number;
  activeTeam: number;
  activeServices: number;
}

export function DashboardStats({ totalProjects, publishedBlogs, activeTeam, activeServices }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Projects"   value={String(totalProjects)}   icon={Briefcase} trend={{ value: 'Live',   isUp: true }} color="purple" />
      <StatCard title="Published Posts"  value={String(publishedBlogs)}  icon={FileText}  trend={{ value: 'Live',   isUp: true }} color="blue" />
      <StatCard title="Team Members"     value={String(activeTeam)}      icon={Users}     trend={{ value: 'Active', isUp: true }} color="cyan" />
      <StatCard title="Active Services"  value={String(activeServices)}  icon={Eye}       trend={{ value: 'Live',   isUp: true }} color="lavender" />
    </div>
  );
}
