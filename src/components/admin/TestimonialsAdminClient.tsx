"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, Plus, Search, Trash2, Edit2, Save, Star, Upload, User as UserIcon } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin/Toast';
import { Modal } from '@/components/admin/Modal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { upsertTestimonial, deleteTestimonial } from '@/app/_actions/testimonials';
import { getUploadUrl, registerMediaAsset, getPublicUrl } from '@/app/_actions/media';
import type { Testimonial } from '@/lib/supabase/types';

interface Props { initialTestimonials: Testimonial[] }

interface FormState {
  id?: string; name: string; role: string; company: string; body: string;
  rating: number; avatar_url: string; is_active: boolean;
}

const defaultForm = (): FormState => ({
  name: '', role: '', company: '', body: '', rating: 5, avatar_url: '', is_active: true,
});

export function TestimonialsAdminClient({ initialTestimonials }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();
  const [items, setItems] = useState(initialTestimonials);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const r = await getUploadUrl(file.name, file.type);
      if ('error' in r) { showToast(r.error!, 'error'); return; }
      await fetch(r.signedUrl!, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
      await registerMediaAsset({ path: r.path!, filename: file.name, mime: file.type, size_bytes: file.size });
      const url = await getPublicUrl(r.path!);
      setForm(f => ({ ...f, avatar_url: url }));
      showToast('Avatar uploaded', 'success');
    } catch { showToast('Upload failed', 'error'); }
    finally { setUploading(false); }
  }

  const filtered = items.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.company.toLowerCase().includes(search.toLowerCase())
  );

  function openCreate() { setForm(defaultForm()); setModalOpen(true); }
  function openEdit(t: Testimonial) {
    setForm({ id: t.id, name: t.name, role: t.role, company: t.company, body: t.body, rating: t.rating, avatar_url: t.avatar_url ?? '', is_active: t.is_active });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const result = await upsertTestimonial({ ...form, avatar_url: form.avatar_url || undefined });
    setSaving(false);
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast(form.id ? 'Testimonial updated' : 'Testimonial added', 'success');
    setModalOpen(false); router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteTestimonial(deleteTarget.id, deleteTarget.name);
    if (result.error) { showToast(result.error, 'error'); return; }
    setItems(prev => prev.filter(t => t.id !== deleteTarget.id));
    showToast('Testimonial deleted', 'success'); setDeleteTarget(null);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-amber-600/10 text-amber-400"><MessageSquareQuote size={20} /></div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Testimonials</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">{items.length} testimonials</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-lg hover:shadow-amber-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search testimonials..."
          className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">No testimonials found</div>
          ) : filtered.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.03 }}
              className="bg-[#090E1A] border border-white/5 rounded-3xl p-6 space-y-4 hover:border-amber-500/20 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {t.avatar_url ? (
                    <img src={t.avatar_url} alt={t.name} className="w-12 h-12 rounded-2xl object-cover border border-white/10" />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400"><UserIcon size={20} /></div>
                  )}
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">{t.name}</h3>
                    <p className="text-[10px] text-amber-400 font-bold">{t.role}</p>
                    <p className="text-[10px] text-slate-500">{t.company}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${t.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                  {t.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />)}</div>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed italic">&ldquo;{t.body}&rdquo;</p>
              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button onClick={() => openEdit(t)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 rounded-xl text-[10px] font-black text-slate-400 hover:text-amber-400 hover:bg-amber-500/5 transition-all uppercase tracking-widest"><Edit2 size={13} /> Edit</button>
                <button onClick={() => setDeleteTarget(t)} className="p-2.5 bg-white/5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Full Name</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Sarah Khan"
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Role</label>
              <input required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="CTO"
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Company</label>
              <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Finova AI"
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Rating</label>
              <div className="flex gap-2 py-3">
                {[1,2,3,4,5].map(r => (
                  <button key={r} type="button" onClick={() => setForm(f => ({ ...f, rating: r }))}
                    className="p-1 hover:scale-110 transition-transform">
                    <Star size={22} className={r <= form.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Avatar</label>
              {form.avatar_url && <img src={form.avatar_url} alt="Preview" className="w-14 h-14 rounded-2xl object-cover border border-white/10 mb-2" />}
              <div className="flex gap-3">
                <input value={form.avatar_url} onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))} placeholder="URL or upload..."
                  className="flex-1 bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all" />
                <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()}
                  className="px-4 py-3.5 bg-amber-600/10 border border-amber-500/20 rounded-2xl text-amber-400 hover:bg-amber-600/20 transition-all disabled:opacity-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                  <Upload size={14} /> {uploading ? '...' : 'Upload'}
                </button>
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Testimonial</label>
              <textarea required value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={4} placeholder="What the client said..."
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                  className={`relative w-12 h-6 rounded-full border transition-all ${form.is_active ? 'bg-amber-500 border-amber-400' : 'bg-[#010205] border-white/10'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_active ? 'left-[26px]' : 'left-0.5'}`} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active / Visible</span>
              </label>
            </div>
          </div>
          <div className="flex gap-4 pt-6 border-t border-white/5">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg transition-all disabled:opacity-50">
              <Save size={15} /> {saving ? 'Saving...' : form.id ? 'Update' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        itemName={deleteTarget?.name} message="This will permanently remove this testimonial." />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
