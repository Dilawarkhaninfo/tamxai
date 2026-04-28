"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Plus, Search, Trash2, Edit2, Eye, EyeOff,
  Star, StarOff, Filter, ChevronDown, Save, User, Tag,
  Clock, Image as ImageIcon, X
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { ToastContainer } from '@/components/admin/Toast';
import { Modal } from '@/components/admin/Modal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { upsertPost, deletePost } from '@/app/_actions/blog';
import type { BlogPost, BlogCategory, PostStatus } from '@/lib/supabase/types';

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const STATUS_COLORS: Record<PostStatus, string> = {
  published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  archived: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

interface Props {
  initialPosts: BlogPost[];
  initialCategories: BlogCategory[];
}

interface FormState {
  id?: string;
  title: string;
  slug: string;
  category_id: string;
  cover_url: string;
  author_name: string;
  excerpt: string;
  content_html: string;
  read_minutes: number;
  status: PostStatus;
  is_featured: boolean;
}

const defaultForm = (): FormState => ({
  title: '',
  slug: '',
  category_id: '',
  cover_url: '',
  author_name: '',
  excerpt: '',
  content_html: '',
  read_minutes: 5,
  status: 'draft',
  is_featured: false,
});

export function BlogAdminClient({ initialPosts, initialCategories }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [categories] = useState<BlogCategory[]>(initialCategories);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<PostStatus | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm());
  const [saving, setSaving] = useState(false);

  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function openCreate() {
    setForm(defaultForm());
    setModalOpen(true);
  }

  function openEdit(post: BlogPost) {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      category_id: post.category_id ?? '',
      cover_url: post.cover_url ?? '',
      author_name: post.author_name,
      excerpt: post.excerpt,
      content_html: post.content_html,
      read_minutes: post.read_minutes,
      status: post.status,
      is_featured: post.is_featured,
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const result = await upsertPost({
      ...form,
      category_id: form.category_id || undefined,
      cover_url: form.cover_url || undefined,
    });
    setSaving(false);
    if (result.error) {
      showToast(result.error, 'error');
      return;
    }
    showToast(form.id ? 'Post updated successfully' : 'Post published to stream', 'success');
    setModalOpen(false);
    router.refresh();
    // Optimistic update
    if (result.data) {
      if (form.id) {
        setPosts((prev) => prev.map((p) => (p.id === form.id ? { ...p, ...result.data! } : p)));
      } else {
        setPosts((prev) => [result.data as BlogPost, ...prev]);
      }
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deletePost(deleteTarget.id, deleteTarget.title);
    if (result.error) {
      showToast(result.error, 'error');
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    showToast('Post deleted successfully', 'success');
    setDeleteTarget(null);
    router.refresh();
  }

  async function toggleFeatured(post: BlogPost) {
    const result = await upsertPost({
      id: post.id,
      title: post.title,
      slug: post.slug,
      author_name: post.author_name,
      excerpt: post.excerpt,
      content_html: post.content_html,
      read_minutes: post.read_minutes,
      status: post.status,
      is_featured: !post.is_featured,
      category_id: post.category_id ?? undefined,
      cover_url: post.cover_url ?? undefined,
    });
    if (result.error) { showToast(result.error, 'error'); return; }
    setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, is_featured: !post.is_featured } : p));
    showToast(`Post ${!post.is_featured ? 'featured' : 'unfeatured'}`, 'success');
    router.refresh();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-purple-600/10 text-purple-400">
              <FileText size={20} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Blog Management</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">
            Editorial Stream — {posts.length} articles
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={16} /> New Article
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'published', 'draft', 'scheduled', 'archived'] as const).map((s) => (
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

      {/* Table */}
      <div className="bg-[#090E1A] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Article</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Author</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Category</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Read</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">
                      No articles found
                    </td>
                  </tr>
                ) : (
                  filtered.map((post, i) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {post.cover_url ? (
                            <img src={post.cover_url} alt="" className="w-12 h-8 object-cover rounded-lg opacity-80" />
                          ) : (
                            <div className="w-12 h-8 bg-purple-600/10 rounded-lg flex items-center justify-center">
                              <FileText size={14} className="text-purple-400" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-bold text-white line-clamp-1">{post.title}</p>
                            <p className="text-[10px] text-slate-600 font-mono">{post.slug}</p>
                          </div>
                          {post.is_featured && (
                            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-widest">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-400 font-medium">{post.author_name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${STATUS_COLORS[post.status]}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500 font-medium">
                          {post.blog_categories?.name ?? '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500 font-mono">{post.read_minutes}m</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleFeatured(post)}
                            className="p-2 rounded-xl text-slate-600 hover:text-amber-400 hover:bg-amber-500/5 transition-all"
                            title={post.is_featured ? 'Unfeature' : 'Feature'}
                          >
                            {post.is_featured ? <Star size={15} className="fill-amber-400 text-amber-400" /> : <StarOff size={15} />}
                          </button>
                          <button
                            onClick={() => openEdit(post)}
                            className="p-2 rounded-xl text-slate-600 hover:text-purple-400 hover:bg-purple-500/5 transition-all"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(post)}
                            className="p-2 rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/5 transition-all"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Article' : 'New Article'}>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Article title..."
                required
              />
            </div>
            {/* Slug */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-mono text-slate-400 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="article-slug"
                required
              />
            </div>
            {/* Author */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Author</label>
              <input
                value={form.author_name}
                onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Author name"
                required
              />
            </div>
            {/* Read Minutes */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Read Time (min)</label>
              <input
                type="number"
                min={1}
                value={form.read_minutes}
                onChange={(e) => setForm((f) => ({ ...f, read_minutes: parseInt(e.target.value) || 1 }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
              />
            </div>
            {/* Category */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
              >
                <option value="">Uncategorized</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            {/* Status */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</label>
              <div className="flex gap-2 flex-wrap">
                {(['published', 'draft', 'scheduled', 'archived'] as PostStatus[]).map((s) => (
                  <label key={s} className="cursor-pointer">
                    <input
                      type="radio"
                      name="post-status"
                      value={s}
                      checked={form.status === s}
                      onChange={() => setForm((f) => ({ ...f, status: s }))}
                      className="sr-only"
                    />
                    <div className={`px-3 py-2 text-[9px] font-black uppercase tracking-widest border rounded-xl transition-all ${form.status === s ? 'bg-purple-600/10 border-purple-500/50 text-purple-400' : 'bg-[#010205] border-white/5 text-slate-500 hover:bg-white/5'}`}>
                      {s}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {/* Cover URL */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Cover Image URL</label>
              <input
                value={form.cover_url}
                onChange={(e) => setForm((f) => ({ ...f, cover_url: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="https://..."
              />
            </div>
            {/* Excerpt */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={3}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                placeholder="Brief excerpt..."
                required
              />
            </div>
            {/* Content HTML */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Content (HTML)</label>
              <textarea
                value={form.content_html}
                onChange={(e) => setForm((f) => ({ ...f, content_html: e.target.value }))}
                rows={8}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white font-mono placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                placeholder="<p>Article content...</p>"
                required
              />
            </div>
            {/* Featured */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setForm((f) => ({ ...f, is_featured: !f.is_featured }))}
                  className={`relative w-12 h-6 rounded-full border transition-all ${form.is_featured ? 'bg-purple-600 border-purple-500' : 'bg-[#010205] border-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_featured ? 'left-[26px]' : 'left-0.5'}`} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                  Featured Article
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/5">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-6 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={15} />
              {saving ? 'Saving...' : form.id ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.title}
        message="This will permanently remove the article from the stream."
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
