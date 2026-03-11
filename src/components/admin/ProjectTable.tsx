"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/admin/Modal';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { useToast } from '@/components/admin/Toast';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';

interface Project {
  id: string;
  title: string;
  industry: string;
  status: 'published' | 'draft' | 'archived';
  date: string;
  image: string;
  description?: string;
}

const mockProjects: Project[] = [
  { id: '1', title: 'TAMx AI Platform', industry: 'Artificial Intelligence', status: 'published', date: '2024-03-10', image: '/p1.jpg' },
  { id: '2', title: 'Nexus Cloud Sync', industry: 'Cloud Computing', status: 'published', date: '2024-03-08', image: '/p2.jpg' },
  { id: '3', title: 'Aether Finance App', industry: 'FinTech', status: 'draft', date: '2024-03-05', image: '/p3.jpg' },
  { id: '4', title: 'Quantum SEO Suite', industry: 'Digital Marketing', status: 'published', date: '2024-03-01', image: '/p4.jpg' },
  { id: '5', title: 'Zen Healthcare Portal', industry: 'HealthTech', status: 'archived', date: '2024-02-28', image: '/p5.jpg' },
  { id: '6', title: 'Orbit Logistics', industry: 'Logistics', status: 'draft', date: '2024-02-25', image: '/p6.jpg' },
];

export function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const { showToast } = useToast();

  const projectsPerPage = 5;

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handleCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingProject) {
      // Update existing
      setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...data, title: data.title || p.title } : p));
      showToast('Project updated successfully', 'success');
    } else {
      // Create new
      const newProject: Project = {
        id: (projects.length + 1).toString(),
        title: data.title || 'New Project',
        industry: data.industry || 'Technology',
        status: data.status || 'draft',
        date: new Date().toISOString().split('T')[0],
        image: '/p1.jpg',
        ...data
      };
      setProjects(prev => [newProject, ...prev]);
      showToast('New project created successfully', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      showToast('Project deleted successfully', 'error');
      setProjectToDelete(null);
    }
  };

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Table Header / Toolbar */}
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#010205]/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#030712] border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5 transition-all text-slate-300">
              <Filter size={18} />
              Filter
            </button>
            <button 
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold border-b border-white/10">
                <th className="px-6 py-4 text-center w-16">#</th>
                <th className="px-6 py-4">Project Info</th>
                <th className="px-6 py-4">Industry</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Release Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {currentProjects.map((project, index) => (
                  <motion.tr 
                    key={project.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 text-center">
                       <span className="text-xs font-mono text-slate-600">{(currentPage - 1) * projectsPerPage + index + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-black border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center p-2 group-hover:border-purple-500/30 transition-colors">
                            <ImageIcon size={20} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">{project.title}</p>
                          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">ID: {project.id.padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{project.industry}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                        project.status === 'published' ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" :
                        project.status === 'draft' ? "bg-amber-500/5 text-amber-400 border-amber-500/20" :
                        "bg-slate-500/5 text-slate-400 border-slate-500/20"
                      )}>
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full animate-pulse",
                          project.status === 'published' ? "bg-emerald-400" :
                          project.status === 'draft' ? "bg-amber-400" : "bg-slate-400"
                        )} />
                        {project.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-500">
                      {project.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={() => handleEdit(project)}
                           className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Edit"
                         >
                           <Edit2 size={16} />
                         </button>
                         <button 
                           onClick={() => handleDelete(project)}
                           className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all" title="Delete"
                         >
                           <Trash2 size={16} />
                         </button>
                         <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-400/5 rounded-lg transition-all" title="View">
                           <ExternalLink size={16} />
                         </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between bg-[#010205]/30">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            Showing <span className="text-white">{(currentPage - 1) * projectsPerPage + 1}</span> - <span className="text-white">{Math.min(currentPage * projectsPerPage, filteredProjects.length)}</span> of <span className="text-white">{filteredProjects.length}</span> entries
          </p>
          <div className="flex items-center gap-1">
             <button 
               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
               disabled={currentPage === 1}
               className="p-2 text-slate-500 hover:text-white disabled:opacity-10 disabled:cursor-not-allowed transition-all hover:bg-white/5 rounded-lg"
             >
               <ChevronLeft size={18} />
             </button>
             <div className="flex items-center gap-1 px-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                      currentPage === i + 1 ? "bg-purple-500 w-4 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "bg-white/10 hover:bg-white/30"
                    )}
                  />
                ))}
             </div>
             <button 
               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
               disabled={currentPage === totalPages}
               className="p-2 text-slate-500 hover:text-white disabled:opacity-10 disabled:cursor-not-allowed transition-all hover:bg-white/5 rounded-lg"
             >
               <ChevronRight size={18} />
             </button>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingProject ? 'Edit Project' : 'Create New Project'}
      >
        <ProjectForm 
          initialData={editingProject} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={projectToDelete?.title}
        message="This project and all its associated data will be permanently removed from the system architecture."
      />
    </>
  );
}
