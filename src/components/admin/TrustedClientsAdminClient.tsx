"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, Search, Trash2, Edit2, Save, Upload, Building2 } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin/Toast';
import { Modal } from '@/components/admin/Modal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { upsertTrustedClient, deleteTrustedClient } from '@/app/_actions/trusted-clients';
import { getUploadUrl, registerMediaAsset, getPublicUrl } from '@/app/_actions/media';
import type { TrustedClient } from '@/lib/supabase/types';

interface Props { initialClients: TrustedClient[] }

interface FormState {
  id?: string; name: string; logo_url: string; is_active: boolean;
}

const defaultForm = (): FormState => ({ name: '', logo_url: '', is_active: true });

export function TrustedClientsAdminClient({ initialClients }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();
  const [items, setItems] = useState(initialClients);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TrustedClient | null>(null);
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
      setForm(f => ({ ...f, logo_url: url }));
      showToast('Logo uploaded', 'success');
    } catch { showToast('Upload failed', 'error'); }
    finally { setUploading(false); }
  }

  const filtered = items.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  function openCreate() { setForm(defaultForm()); setModalOpen(true); }
  function openEdit(c: TrustedClient) {
    setForm({ id: c.id, name: c.name, logo_url: c.logo_url ?? '', is_active: c.is_active });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const result = await upsertTrustedClient({ ...form, logo_url: form.logo_url || undefined });
    setSaving(false);
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast(form.id ? 'Client updated' : 'Client added', 'success');
    setModalOpen(false); router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteTrustedClient(deleteTarget.id, deleteTarget.name);
    if (result.error) { showToast(result.error, 'error'); return; }
    setItems(prev => prev.filter(c => c.id !== deleteTarget.id));
    showToast('Client removed', 'success'); setDeleteTarget(null);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-cyan-600/10 text-cyan-400"><Award size={20} /></div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Trusted Clients</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">Industry Leaders — {items.length} partners</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-lg hover:shadow-cyan-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Plus size={16} /> Add Client
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..."
          className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">No clients found</div>
          ) : filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.03 }}
              className="bg-[#090E1A] border border-white/5 rounded-2xl p-5 space-y-3 hover:border-cyan-500/20 transition-colors group text-center">
              {c.logo_url ? (
                <div className="w-full h-16 flex items-center justify-center">
                  <img src={c.logo_url} alt={c.name} className="max-h-full max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              ) : (
                <div className="w-full h-16 flex items-center justify-center">
                  <Building2 size={28} className="text-slate-700" />
                </div>
              )}
              <p className="text-[11px] font-black text-white uppercase tracking-tight truncate">{c.name}</p>
              <span className={`inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${c.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                {c.is_active ? 'Active' : 'Hidden'}
              </span>
              <div className="flex gap-1 pt-2 border-t border-white/5">
                <button onClick={() => openEdit(c)} className="flex-1 p-2 bg-white/5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"><Edit2 size={12} /></button>
                <button onClick={() => setDeleteTarget(c)} className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"><Trash2 size={12} /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Client' : 'Add Client'}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Client / Company Name</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Google, Microsoft..."
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Logo</label>
              {form.logo_url && (
                <div className="h-20 bg-white/5 rounded-2xl flex items-center justify-center p-4 mb-2 border border-white/5">
                  <img src={form.logo_url} alt="Preview" className="max-h-full max-w-full object-contain" />
                </div>
              )}
              <div className="flex gap-3">
                <input value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))} placeholder="URL or upload..."
                  className="flex-1 bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all" />
                <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()}
                  className="px-4 py-3.5 bg-cyan-600/10 border border-cyan-500/20 rounded-2xl text-cyan-400 hover:bg-cyan-600/20 transition-all disabled:opacity-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                  <Upload size={14} /> {uploading ? '...' : 'Upload'}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                className={`relative w-12 h-6 rounded-full border transition-all ${form.is_active ? 'bg-cyan-500 border-cyan-400' : 'bg-[#010205] border-white/10'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_active ? 'left-[26px]' : 'left-0.5'}`} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active / Visible</span>
            </label>
          </div>
          <div className="flex gap-4 pt-6 border-t border-white/5">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg transition-all disabled:opacity-50">
              <Save size={15} /> {saving ? 'Saving...' : form.id ? 'Update' : 'Add Client'}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        itemName={deleteTarget?.name} message="This will permanently remove this client." />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
