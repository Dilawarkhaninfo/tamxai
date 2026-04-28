"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, Trash2, Edit2, Save, Crown, User as UserIcon } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { ToastContainer } from '@/components/admin/Toast';
import { Modal } from '@/components/admin/Modal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { upsertTeamMember, deleteTeamMember } from '@/app/_actions/team';
import type { TeamMember } from '@/lib/supabase/types';

interface Props {
  initialMembers: TeamMember[];
}

interface FormState {
  id?: string;
  full_name: string;
  role: string;
  company: string;
  category: string;
  description: string;
  quote: string;
  is_founder: boolean;
  avatar_url: string;
  is_active: boolean;
}

const defaultForm = (): FormState => ({
  full_name: '',
  role: '',
  company: 'TAMx',
  category: '',
  description: '',
  quote: '',
  is_founder: false,
  avatar_url: '',
  is_active: true,
});

const CATEGORIES = ['Leadership', 'Engineering', 'Design', 'Marketing', 'Sales', 'Operations', 'Advisory'];

export function TeamAdminClient({ initialMembers }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm());
  const [saving, setSaving] = useState(false);

  const allCategories = Array.from(new Set(members.map((m) => m.category).filter(Boolean)));

  const filtered = members.filter((m) => {
    const matchSearch =
      m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'all' || m.category === filterCategory;
    return matchSearch && matchCat;
  });

  function openCreate() {
    setForm(defaultForm());
    setModalOpen(true);
  }

  function openEdit(member: TeamMember) {
    setForm({
      id: member.id,
      full_name: member.full_name,
      role: member.role,
      company: member.company,
      category: member.category,
      description: member.description,
      quote: member.quote ?? '',
      is_founder: member.is_founder,
      avatar_url: member.avatar_url ?? '',
      is_active: member.is_active,
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const result = await upsertTeamMember({
      ...form,
      quote: form.quote || undefined,
      avatar_url: form.avatar_url || undefined,
    });
    setSaving(false);
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast(form.id ? 'Team member updated' : 'Team member added', 'success');
    setModalOpen(false);
    router.refresh();
    if (result.data) {
      if (form.id) {
        setMembers((prev) => prev.map((m) => (m.id === form.id ? { ...m, ...result.data! } : m)));
      } else {
        setMembers((prev) => [...prev, result.data as TeamMember]);
      }
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteTeamMember(deleteTarget.id, deleteTarget.full_name);
    if (result.error) { showToast(result.error, 'error'); return; }
    setMembers((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    showToast('Team member removed', 'success');
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
              <Users size={20} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Team</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">
            Team Roster — {members.length} members
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team members..."
            className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterCategory === 'all' ? 'bg-purple-600/10 border-purple-500/30 text-purple-400' : 'bg-[#090E1A] border-white/5 text-slate-500 hover:text-white hover:bg-white/5'}`}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterCategory === cat ? 'bg-purple-600/10 border-purple-500/30 text-purple-400' : 'bg-[#090E1A] border-white/5 text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">
              No team members found
            </div>
          ) : (
            filtered.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#090E1A] border border-white/5 rounded-3xl p-6 space-y-4 hover:border-purple-500/20 transition-colors group relative overflow-hidden"
              >
                {member.is_founder && (
                  <div className="absolute top-4 right-4 p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <Crown size={12} className="text-amber-400" />
                  </div>
                )}

                <div className="flex flex-col items-center text-center gap-3">
                  {member.avatar_url ? (
                    <img
                      src={member.avatar_url}
                      alt={member.full_name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 shadow-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <UserIcon size={28} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">{member.full_name}</h3>
                    <p className="text-[11px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">{member.role}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">{member.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {member.category && (
                    <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-wider">
                      {member.category}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${member.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                    {member.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed text-center">{member.description}</p>

                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => openEdit(member)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 rounded-xl text-[10px] font-black text-slate-400 hover:text-purple-400 hover:bg-purple-500/5 transition-all uppercase tracking-widest"
                  >
                    <Edit2 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(member)}
                    className="p-2.5 bg-white/5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Member' : 'Add Member'}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Full Name</label>
              <input
                value={form.full_name}
                onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Full name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Role / Title</label>
              <input
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="CEO / CTO / Lead Engineer..."
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Company</label>
              <input
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="TAMx"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Avatar URL</label>
              <input
                value={form.avatar_url}
                onChange={(e) => setForm((f) => ({ ...f, avatar_url: e.target.value }))}
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
                placeholder="Brief bio..."
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Quote (optional)</label>
              <textarea
                value={form.quote}
                onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                rows={2}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                placeholder="Signature quote..."
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, is_founder: !f.is_founder }))}
                  className={`relative w-12 h-6 rounded-full border transition-all ${form.is_founder ? 'bg-amber-500 border-amber-400' : 'bg-[#010205] border-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_founder ? 'left-[26px]' : 'left-0.5'}`} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Founder</span>
              </label>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, is_active: !f.is_active }))}
                  className={`relative w-12 h-6 rounded-full border transition-all ${form.is_active ? 'bg-purple-600 border-purple-500' : 'bg-[#010205] border-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_active ? 'left-[26px]' : 'left-0.5'}`} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/5">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-all disabled:opacity-50">
              <Save size={15} />
              {saving ? 'Saving...' : form.id ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.full_name}
        message="This will permanently remove this team member from the roster."
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
