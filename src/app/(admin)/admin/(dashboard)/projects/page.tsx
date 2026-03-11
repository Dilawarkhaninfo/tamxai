"use client";

import React from 'react';
import { ProjectTable } from '@/components/admin/ProjectTable';
import { Briefcase } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
           <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
             <Briefcase size={20} />
           </div>
           <h1 className="text-3xl font-bold text-white">Project Management</h1>
        </div>
        <p className="text-slate-400">Manage your portfolio projects, technology stacks, and case studies.</p>
      </div>

      <ProjectTable />
    </div>
  );
}
