"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, Search, Trash2, Eye, Mail, Phone, MapPin, Clock, ChevronDown, X } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin/Toast';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { updateSubmissionStatus, deleteSubmission } from '@/app/_actions/contact';
import type { ContactSubmission, SubmissionStatus } from '@/lib/supabase/types';

const STATUS_CONFIG: Record<SubmissionStatus, { label: string; color: string }> = {
  new: { label: 'New', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  in_review: { label: 'In Review', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  contacted: { label: 'Contacted', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  closed: { label: 'Closed', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
};

interface Props { initialSubmissions: ContactSubmission[] }

export function ContactsAdminClient({ initialSubmissions }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(null);
  const [detailTarget, setDetailTarget] = useState<ContactSubmission | null>(null);

  const filtered = submissions.filter((s) => {
    const matchSearch =
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.message.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  async function handleStatusChange(id: string, status: SubmissionStatus) {
    const result = await updateSubmissionStatus(id, status);
    if (result.error) { showToast(result.error, 'error'); return; }
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    showToast('Status updated', 'success');
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteSubmission(deleteTarget.id);
    if (result.error) { showToast(result.error, 'error'); return; }
    setSubmissions(prev => prev.filter(s => s.id !== deleteTarget.id));
    showToast('Submission deleted', 'success');
    setDeleteTarget(null);
  }

  const newCount = submissions.filter(s => s.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-blue-600/10 text-blue-400"><Inbox size={20} /></div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Contact Submissions</h1>
            {newCount > 0 && (
              <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] font-black">{newCount} NEW</span>
            )}
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">{submissions.length} total submissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or message..."
            className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'new', 'in_review', 'contacted', 'closed'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterStatus === s ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' : 'bg-[#090E1A] border-white/5 text-slate-500 hover:text-white hover:bg-white/5'}`}>
              {s === 'all' ? 'All' : s === 'in_review' ? 'In Review' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#090E1A] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Name</th>
                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Email</th>
                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hidden lg:table-cell">Service</th>
                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="text-left px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hidden md:table-cell">Date</th>
                <th className="text-right px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="py-20 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">No submissions found</td></tr>
                ) : filtered.map((sub, i) => {
                  const cfg = STATUS_CONFIG[sub.status];
                  return (
                    <motion.tr key={sub.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-white">{sub.first_name} {sub.last_name}</p>
                        {sub.phone && <p className="text-[10px] text-slate-600 mt-0.5">{sub.country_code} {sub.phone}</p>}
                      </td>
                      <td className="px-6 py-4"><a href={`mailto:${sub.email}`} className="text-sm text-blue-400 hover:underline">{sub.email}</a></td>
                      <td className="px-6 py-4 hidden lg:table-cell"><span className="text-xs text-slate-400">{sub.service || '—'}</span></td>
                      <td className="px-6 py-4">
                        <select value={sub.status} onChange={(e) => handleStatusChange(sub.id, e.target.value as SubmissionStatus)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border bg-transparent cursor-pointer focus:outline-none ${cfg.color}`}>
                          <option value="new" className="bg-[#0a0e1a] text-white">New</option>
                          <option value="in_review" className="bg-[#0a0e1a] text-white">In Review</option>
                          <option value="contacted" className="bg-[#0a0e1a] text-white">Contacted</option>
                          <option value="closed" className="bg-[#0a0e1a] text-white">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-xs text-slate-500">{new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-1 justify-end">
                          <button onClick={() => setDetailTarget(sub)} className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all"><Eye size={14} /></button>
                          <button onClick={() => setDeleteTarget(sub)} className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailTarget && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetailTarget(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg bg-[#0a0e1a] border border-white/10 rounded-3xl p-8 pointer-events-auto shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Submission Details</h3>
                  <button onClick={() => setDetailTarget(null)} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><X size={16} /></button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Name</p><p className="text-sm text-white font-bold">{detailTarget.first_name} {detailTarget.last_name}</p></div>
                    <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Date</p><p className="text-sm text-white">{new Date(detailTarget.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p></div>
                  </div>
                  <div className="flex items-center gap-2"><Mail size={14} className="text-blue-400" /><a href={`mailto:${detailTarget.email}`} className="text-sm text-blue-400 hover:underline">{detailTarget.email}</a></div>
                  {detailTarget.phone && <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /><span className="text-sm text-white">{detailTarget.country_code} {detailTarget.phone}</span></div>}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                    <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Service</p><p className="text-sm text-white">{detailTarget.service || '—'}</p></div>
                    <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Budget</p><p className="text-sm text-white">{detailTarget.budget || '—'}</p></div>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Message</p>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5"><p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{detailTarget.message}</p></div>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <a href={`mailto:${detailTarget.email}?subject=Re: Your Inquiry at TAMx`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest">
                      <Mail size={14} /> Reply via Email
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        itemName={deleteTarget ? `${deleteTarget.first_name} ${deleteTarget.last_name}` : ''} message="This will permanently remove this contact submission." />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
