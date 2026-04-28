"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Plus, Search, Trash2, Edit2, Save,
  Image as ImageIcon, Globe, Archive, FileText
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { ToastContainer } from '@/components/admin/Toast';
import { Modal } from '@/components/admin/Modal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { upsertProject, deleteProject } from '@/app/_actions/projects';
import type { Project, ProjectStatus } from '@/lib/supabase/types';

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const STATUS_STYLES: Record<ProjectStatus, string> = {
  published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  archived: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

const STATUS_ICONS: Record<ProjectStatus, React.ReactNode> = {
  published: <Globe size={12} />,
  draft: <FileText size={12} />,
  archived: <Archive size={12} />,
};

interface Props {
  initialProjects: Project[];
}

interface FormState {
  id?: string;
  title: string;
  slug: string;
  industry: string;
  description: string;
  cover_url: string;
  status: ProjectStatus;
}

const defaultForm = (): FormState => ({
  title: '',
  slug: '',
  industry: '',
  description: '',
  cover_url: '',
  status: 'draft',
});

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education',
  'Real Estate', 'Logistics', 'Media', 'Government', 'Other',
];

export function ProjectsAdminClient({ initialProjects }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm());
  const [saving, setSaving] = useState(false);

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.industry.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function openCreate() {
    setForm(defaultForm());
    setModalOpen(true);
  }

  function openEdit(proj: Project) {
    setForm({
      id: proj.id,
      title: proj.title,
      slug: proj.slug,
      industry: proj.industry,
      description: proj.description,
      cover_url: proj.cover_url ?? '',
      status: proj.status,
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const result = await upsertProject({
      ...form,
      cover_url: form.cover_url || undefined,
    });
    setSaving(false);
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast(form.id ? 'Project updated' : 'Project created', 'success');
    setModalOpen(false);
    router.refresh();
    if (result.data) {
      if (form.id) {
        setProjects((prev) => prev.map((p) => (p.id === form.id ? { ...p, ...result.data! } : p)));
      } else {
        setProjects((prev) => [result.data as Project, ...prev]);
      }
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteProject(deleteTarget.id, deleteTarget.title);
    if (result.error) { showToast(result.error, 'error'); return; }
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    showToast('Project deleted', 'success');
    setDeleteTarget(null);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-purple-600/10 text-purple-400">
              <Briefcase size={20} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Projects</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">
            Portfolio — {projects.length} projects
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'draft', 'archived'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterStatus === s ? 'bg-purple-600/10 border-purple-500/30 text-purple-400' : 'bg-[#090E1A] border-white/5 text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">
              No projects found
            </div>
          ) : (
            filtered.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#090E1A] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/20 transition-colors group"
              >
                {/* Cover */}
                {proj.cover_url ? (
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={proj.cover_url}
                      alt={proj.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090E1A] via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-purple-600/5 via-transparent to-transparent flex items-center justify-center border-b border-white/5">
                    <ImageIcon size={36} className="text-purple-400/20" />
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight leading-tight flex-1">{proj.title}</h3>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shrink-0 ${STATUS_STYLES[proj.status]}`}>
                      {STATUS_ICONS[proj.status]}
                      {proj.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-wider">
                      {proj.industry}
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono">{proj.slug}</span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{proj.description}</p>

                  {proj.project_images && proj.project_images.length > 0 && (
                    <div className="flex gap-1.5">
                      {proj.project_images.slice(0, 4).map((img) => (
                        <img key={img.id} src={img.url} alt={img.alt ?? ''} className="w-10 h-8 object-cover rounded-lg opacity-60" />
                      ))}
                      {proj.project_images.length > 4 && (
                        <div className="w-10 h-8 bg-white/5 rounded-lg flex items-center justify-center text-[9px] font-black text-slate-500">
                          +{proj.project_images.length - 4}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => openEdit(proj)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 rounded-xl text-[10px] font-black text-slate-400 hover:text-purple-400 hover:bg-purple-500/5 transition-all uppercase tracking-widest"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(proj)}
                      className="p-2.5 bg-white/5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Project' : 'New Project'}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Project Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Project title"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-mono text-slate-400 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="project-slug"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Industry</label>
              <select
                value={form.industry}
                onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                required
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Cover Image URL</label>
              <input
                value={form.cover_url}
                onChange={(e) => setForm((f) => ({ ...f, cover_url: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                placeholder="Project description..."
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</label>
              <div className="flex gap-2">
                {(['published', 'draft', 'archived'] as ProjectStatus[]).map((s) => (
                  <label key={s} className="cursor-pointer">
                    <input
                      type="radio"
                      name="proj-status"
                      value={s}
                      checked={form.status === s}
                      onChange={() => setForm((f) => ({ ...f, status: s }))}
                      className="sr-only"
                    />
                    <div className={`px-4 py-2.5 text-[9px] font-black uppercase tracking-widest border rounded-xl transition-all ${form.status === s ? 'bg-purple-600/10 border-purple-500/50 text-purple-400' : 'bg-[#010205] border-white/5 text-slate-500 hover:bg-white/5'}`}>
                      {s}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/5">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-all disabled:opacity-50">
              <Save size={15} />
              {saving ? 'Saving...' : form.id ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.title}
        message="This will permanently remove this project from the portfolio."
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
