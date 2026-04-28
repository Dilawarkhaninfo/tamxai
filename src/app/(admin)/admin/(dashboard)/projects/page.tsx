import { getProjects } from '@/app/_actions/projects';
import { ProjectsAdminClient } from '@/components/admin/ProjectsAdminClient';
import { Briefcase } from 'lucide-react';

export default async function ProjectsPage() {
  const projects = await getProjects();
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
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ProjectsAdminClient initialProjects={projects as any[]} />
    </div>
  );
}

