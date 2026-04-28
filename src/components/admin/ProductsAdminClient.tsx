"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Search, Trash2, Edit2, Save, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { ToastContainer } from '@/components/admin/Toast';
import { Modal } from '@/components/admin/Modal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { upsertProduct, deleteProduct } from '@/app/_actions/products';
import type { Product } from '@/lib/supabase/types';

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

interface Props {
  initialProducts: Product[];
}

interface FormState {
  id?: string;
  title: string;
  slug: string;
  icon: string;
  href: string;
  description: string;
  is_published: boolean;
  hero_image: string;
}

const defaultForm = (): FormState => ({
  title: '',
  slug: '',
  icon: '',
  href: '',
  description: '',
  is_published: true,
  hero_image: '',
});

export function ProductsAdminClient({ initialProducts }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm());
  const [saving, setSaving] = useState(false);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  function openCreate() {
    setForm(defaultForm());
    setModalOpen(true);
  }

  function openEdit(prod: Product) {
    setForm({
      id: prod.id,
      title: prod.title,
      slug: prod.slug,
      icon: prod.icon,
      href: prod.href,
      description: prod.description,
      is_published: prod.is_published,
      hero_image: prod.hero_image ?? '',
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const result = await upsertProduct({
      id: form.id,
      title: form.title,
      slug: form.slug,
      icon: form.icon,
      href: form.href,
      description: form.description,
      is_published: form.is_published,
    });
    setSaving(false);
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast(form.id ? 'Product updated' : 'Product created', 'success');
    setModalOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteProduct(deleteTarget.id, deleteTarget.title);
    if (result.error) { showToast(result.error, 'error'); return; }
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    showToast('Product deleted', 'success');
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
              <Package size={20} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Products</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">
            Product Catalog — {products.length} entries
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={16} /> New Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">
              No products found
            </div>
          ) : (
            filtered.map((prod, i) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#090E1A] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/20 transition-colors group"
              >
                {/* Hero Image */}
                {prod.hero_image ? (
                  <div className="h-32 overflow-hidden">
                    <img src={prod.hero_image} alt={prod.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-purple-600/5 to-transparent flex items-center justify-center">
                    <ImageIcon size={32} className="text-purple-400/30" />
                  </div>
                )}

                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-lg shrink-0">
                        {prod.icon || '📦'}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-tight leading-tight">{prod.title}</h3>
                        <p className="text-[10px] text-slate-600 font-mono">{prod.slug}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shrink-0 ${prod.is_published ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                      {prod.is_published ? 'Live' : 'Draft'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{prod.description}</p>

                  <div className="flex gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => openEdit(prod)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 rounded-xl text-[10px] font-black text-slate-400 hover:text-purple-400 hover:bg-purple-500/5 transition-all uppercase tracking-widest"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(prod)}
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Product' : 'New Product'}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Product Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Product name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-mono text-slate-400 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="product-slug"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Icon (emoji/text)</label>
              <input
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="📦"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Href Link</label>
              <input
                value={form.href}
                onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="/products/your-product"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Hero Image URL</label>
              <input
                value={form.hero_image}
                onChange={(e) => setForm((f) => ({ ...f, hero_image: e.target.value }))}
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
                placeholder="Product description..."
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, is_published: !f.is_published }))}
                  className={`relative w-12 h-6 rounded-full border transition-all ${form.is_published ? 'bg-purple-600 border-purple-500' : 'bg-[#010205] border-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_published ? 'left-[26px]' : 'left-0.5'}`} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Published / Live</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/5">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-all disabled:opacity-50">
              <Save size={15} />
              {saving ? 'Saving...' : form.id ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.title}
        message="This will permanently remove this product from the catalog."
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
