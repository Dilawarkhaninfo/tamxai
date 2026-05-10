"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Search, Trash2, Eye, Mail, Clock, Building2, X, FileText } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin/Toast';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { updateBookingStatus, deleteBooking } from '@/app/_actions/bookings';
import type { MeetingBooking, BookingStatus } from '@/lib/supabase/types';

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  confirmed: { label: 'Confirmed', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  completed: { label: 'Completed', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
};

interface Props { initialBookings: MeetingBooking[] }

export function BookingsAdminClient({ initialBookings }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<MeetingBooking | null>(null);
  const [detailTarget, setDetailTarget] = useState<MeetingBooking | null>(null);

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.full_name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  async function handleStatusChange(id: string, status: BookingStatus) {
    const result = await updateBookingStatus(id, status);
    if (result.error) { showToast(result.error, 'error'); return; }
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    showToast('Status updated', 'success');
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteBooking(deleteTarget.id);
    if (result.error) { showToast(result.error, 'error'); return; }
    setBookings(prev => prev.filter(b => b.id !== deleteTarget.id));
    showToast('Booking deleted', 'success');
    setDeleteTarget(null);
  }

  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  function fmtDate(iso: string) { return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }); }
  function fmtTime(iso: string) { return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }); }
  function fmtFull(iso: string) { return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-indigo-600/10 text-indigo-400"><CalendarDays size={20} /></div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Meeting Bookings</h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-black">{pendingCount} PENDING</span>
            )}
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">{bookings.length} total bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or company..."
            className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterStatus === s ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400' : 'bg-[#090E1A] border-white/5 text-slate-500 hover:text-white hover:bg-white/5'}`}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">No bookings found</div>
          ) : filtered.map((bk, i) => {
            const cfg = STATUS_CONFIG[bk.status];
            return (
              <motion.div key={bk.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.03 }}
                className="bg-[#090E1A] border border-white/5 rounded-3xl p-6 space-y-4 hover:border-indigo-500/20 transition-colors group">
                {/* Date Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex flex-col items-center justify-center">
                      <span className="text-[9px] font-black text-indigo-400 uppercase">{new Date(bk.scheduled_at).toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="text-lg font-black text-white leading-none">{new Date(bk.scheduled_at).getDate()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">{bk.full_name}</p>
                      <p className="text-[10px] text-slate-500">{fmtTime(bk.scheduled_at)} &middot; {bk.duration_min}min</p>
                    </div>
                  </div>
                  <select value={bk.status} onChange={(e) => handleStatusChange(bk.id, e.target.value as BookingStatus)}
                    className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border bg-transparent cursor-pointer focus:outline-none ${cfg.color}`}>
                    <option value="pending" className="bg-[#0a0e1a]">Pending</option>
                    <option value="confirmed" className="bg-[#0a0e1a]">Confirmed</option>
                    <option value="completed" className="bg-[#0a0e1a]">Completed</option>
                    <option value="cancelled" className="bg-[#0a0e1a]">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-400"><Mail size={12} /><a href={`mailto:${bk.email}`} className="text-blue-400 hover:underline truncate">{bk.email}</a></div>
                  <div className="flex items-center gap-2 text-slate-400"><Building2 size={12} /><span className="text-slate-300">{bk.company}</span></div>
                  {bk.topic && <div className="flex items-start gap-2 text-slate-400"><FileText size={12} className="mt-0.5 shrink-0" /><span className="text-slate-400 line-clamp-2">{bk.topic}</span></div>}
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button onClick={() => setDetailTarget(bk)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 rounded-xl text-[10px] font-black text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all uppercase tracking-widest">
                    <Eye size={13} /> View
                  </button>
                  <button onClick={() => setDeleteTarget(bk)} className="p-2.5 bg-white/5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
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
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Booking Details</h3>
                  <button onClick={() => setDetailTarget(null)} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><X size={16} /></button>
                </div>
                <div className="space-y-4">
                  <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-2xl p-5 text-center">
                    <p className="text-2xl font-black text-white">{fmtFull(detailTarget.scheduled_at)}</p>
                    <p className="text-indigo-400 font-bold mt-1">{fmtTime(detailTarget.scheduled_at)} &middot; {detailTarget.duration_min} minutes</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Name</p><p className="text-sm text-white font-bold">{detailTarget.full_name}</p></div>
                    <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Company</p><p className="text-sm text-white">{detailTarget.company}</p></div>
                  </div>
                  <div className="flex items-center gap-2"><Mail size={14} className="text-blue-400" /><a href={`mailto:${detailTarget.email}`} className="text-sm text-blue-400 hover:underline">{detailTarget.email}</a></div>
                  {detailTarget.topic && (
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Project Goals</p>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5"><p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{detailTarget.topic}</p></div>
                    </div>
                  )}
                  <div className="pt-4 flex gap-3">
                    <a href={`mailto:${detailTarget.email}?subject=Your Strategy Call with TAMx — ${fmtDate(detailTarget.scheduled_at)}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest">
                      <Mail size={14} /> Send Meeting Link
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        itemName={deleteTarget?.full_name ?? ''} message="This will permanently remove this booking." />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
