"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon, Upload, Trash2, Search, Copy, Check,
  File, Film, FileText as FileTextIcon, Code2, Music, X,
  Grid3X3, List, CloudUpload
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { ToastContainer } from '@/components/admin/Toast';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { getUploadUrl, registerMediaAsset, deleteMediaAsset } from '@/app/_actions/media';
import type { MediaAsset, MediaKind } from '@/lib/supabase/types';

// Builds the public URL client-side using the public env variable
function getPublicUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  return `${base}/storage/v1/object/public/media/${path}`;
}

interface Props {
  initialAssets: MediaAsset[];
}

const KIND_ICONS: Record<MediaKind, React.ReactNode> = {
  image: <ImageIcon size={16} />,
  vector: <ImageIcon size={16} />,
  video: <Film size={16} />,
  audio: <Music size={16} />,
  document: <FileTextIcon size={16} />,
  code: <Code2 size={16} />,
  other: <File size={16} />,
};

const KIND_COLORS: Record<MediaKind, string> = {
  image: 'text-purple-400 bg-purple-500/10',
  vector: 'text-blue-400 bg-blue-500/10',
  video: 'text-red-400 bg-red-500/10',
  audio: 'text-emerald-400 bg-emerald-500/10',
  document: 'text-orange-400 bg-orange-500/10',
  code: 'text-cyan-400 bg-cyan-500/10',
  other: 'text-slate-400 bg-slate-500/10',
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

interface UploadState {
  file: string;
  progress: number;
  done: boolean;
  error?: string;
}

export function MediaAdminClient({ initialAssets }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets);
  const [search, setSearch] = useState('');
  const [filterKind, setFilterKind] = useState<MediaKind | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deleteTarget, setDeleteTarget] = useState<MediaAsset | null>(null);
  const [uploading, setUploading] = useState<UploadState[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = assets.filter((a) => {
    const matchSearch = a.filename.toLowerCase().includes(search.toLowerCase());
    const matchKind = filterKind === 'all' || a.kind === filterKind;
    return matchSearch && matchKind;
  });

  const kinds: MediaKind[] = ['image', 'vector', 'video', 'audio', 'document', 'code', 'other'];

  async function uploadFile(file: File) {
    const stateItem: UploadState = { file: file.name, progress: 0, done: false };
    setUploading((prev) => [...prev, stateItem]);

    try {
      // Get signed upload URL
      const urlResult = await getUploadUrl(file.name, file.type);
      if ('error' in urlResult && urlResult.error) {
        setUploading((prev) =>
          prev.map((u) => u.file === file.name ? { ...u, error: urlResult.error, done: true } : u)
        );
        showToast(`Upload failed: ${urlResult.error}`, 'error');
        return;
      }

      const { signedUrl, path } = urlResult as { signedUrl: string; path: string };

      // Upload to Supabase Storage
      const res = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }

      // Register in DB
      const regResult = await registerMediaAsset({
        path,
        filename: file.name,
        mime: file.type,
        size_bytes: file.size,
      });

      if (regResult.error) throw new Error(regResult.error);

      setUploading((prev) =>
        prev.map((u) => u.file === file.name ? { ...u, progress: 100, done: true } : u)
      );

      if (regResult.data) {
        setAssets((prev) => [regResult.data as MediaAsset, ...prev]);
      }

      showToast(`${file.name} uploaded`, 'success');
      router.refresh();

      setTimeout(() => {
        setUploading((prev) => prev.filter((u) => u.file !== file.name));
      }, 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setUploading((prev) =>
        prev.map((u) => u.file === file.name ? { ...u, error: msg, done: true } : u)
      );
      showToast(msg, 'error');
    }
  }

  function handleFiles(files: FileList) {
    Array.from(files).forEach(uploadFile);
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteMediaAsset(deleteTarget.id, deleteTarget.path);
    const r = result as any;
    if (r.error) { showToast(String(r.error), 'error'); return; }
    setAssets((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    showToast('Asset deleted', 'success');
    setDeleteTarget(null);
    router.refresh();
  }

  function copyUrl(asset: MediaAsset) {
    const url = getPublicUrl(asset.path);
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(asset.id);
      showToast('URL copied to clipboard', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-purple-600/10 text-purple-400">
              <ImageIcon size={20} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Media Library</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">
            Asset Vault — {assets.length} files
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-3 bg-[#090E1A] border border-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            {viewMode === 'grid' ? <List size={18} /> : <Grid3X3 size={18} />}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Upload size={16} /> Upload
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          accept="image/*,video/*,audio/*,.pdf,.svg"
        />
      </div>

      {/* Drop Zone */}
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        animate={{ borderColor: dragOver ? 'rgba(147,51,234,0.5)' : 'rgba(255,255,255,0.05)' }}
        className="relative border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center gap-4 text-slate-500 transition-colors cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
      >
        <AnimatePresence>
          {dragOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-purple-600/5 rounded-[2.5rem] pointer-events-none"
            />
          )}
        </AnimatePresence>
        <div className={`p-5 rounded-[2rem] transition-all ${dragOver ? 'bg-purple-600/20 scale-110' : 'bg-white/5 group-hover:bg-purple-600/10 group-hover:scale-105'}`}>
          <CloudUpload size={36} className={`transition-colors ${dragOver ? 'text-purple-400' : 'text-slate-600 group-hover:text-purple-400'}`} />
        </div>
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-1">
            {dragOver ? 'Drop to Upload' : 'Drag & Drop Files Here'}
          </p>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Or click to browse — Images, Videos, Documents</p>
        </div>
      </motion.div>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploading.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#090E1A] border border-white/5 rounded-3xl p-5 space-y-3"
          >
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Uploading</p>
            {uploading.map((u, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${u.error ? 'bg-red-500/10 text-red-400' : 'bg-purple-500/10 text-purple-400'}`}>
                  <Upload size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-white truncate">{u.file}</p>
                  {u.error ? (
                    <p className="text-[10px] text-red-400">{u.error}</p>
                  ) : (
                    <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: u.done ? '100%' : '70%' }}
                        transition={{ duration: u.done ? 0.1 : 2 }}
                      />
                    </div>
                  )}
                </div>
                {u.done && !u.error && (
                  <Check size={16} className="text-emerald-400 shrink-0" />
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets..."
            className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterKind('all')}
            className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${filterKind === 'all' ? 'bg-purple-600/10 border-purple-500/30 text-purple-400' : 'bg-[#090E1A] border-white/5 text-slate-500 hover:text-white hover:bg-white/5'}`}
          >
            All
          </button>
          {kinds.map((k) => (
            <button
              key={k}
              onClick={() => setFilterKind(k)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${filterKind === k ? 'bg-purple-600/10 border-purple-500/30 text-purple-400' : 'bg-[#090E1A] border-white/5 text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              {KIND_ICONS[k]}
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence initial={false}>
            {filtered.length === 0 ? (
              <div className="col-span-full py-20 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">
                No assets found
              </div>
            ) : (
              filtered.map((asset, i) => {
                const url = getPublicUrl(asset.path);
                const isImage = asset.kind === 'image' || asset.kind === 'vector';
                return (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.02 }}
                    className="bg-[#090E1A] border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/20 transition-colors"
                  >
                    {/* Preview */}
                    <div className="aspect-square bg-gradient-to-br from-white/[0.02] to-transparent flex items-center justify-center relative overflow-hidden">
                      {isImage ? (
                        <img
                          src={url}
                          alt={asset.filename}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        <div className={`p-4 rounded-2xl ${KIND_COLORS[asset.kind]}`}>
                          {KIND_ICONS[asset.kind]}
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => copyUrl(asset)}
                          className="p-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
                          title="Copy URL"
                        >
                          {copiedId === asset.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(asset)}
                          className="p-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="p-3">
                      <p className="text-[10px] font-bold text-slate-300 truncate">{asset.filename}</p>
                      <p className="text-[9px] text-slate-600 font-mono mt-0.5">{formatBytes(asset.size_bytes)}</p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-[#090E1A] border border-white/5 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">File</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Kind</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Size</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Dimensions</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Uploaded</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">
                        No assets found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((asset, i) => (
                      <motion.tr
                        key={asset.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {(asset.kind === 'image' || asset.kind === 'vector') ? (
                              <img
                                src={getPublicUrl(asset.path)}
                                alt={asset.filename}
                                className="w-10 h-8 object-cover rounded-lg opacity-70"
                              />
                            ) : (
                              <div className={`w-10 h-8 rounded-lg flex items-center justify-center ${KIND_COLORS[asset.kind]}`}>
                                {KIND_ICONS[asset.kind]}
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-white">{asset.filename}</p>
                              <p className="text-[9px] text-slate-600 font-mono">{asset.mime}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${KIND_COLORS[asset.kind]}`}>
                            {asset.kind}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-slate-500 font-mono">{formatBytes(asset.size_bytes)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-slate-500 font-mono">
                            {asset.width && asset.height ? `${asset.width}×${asset.height}` : '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-slate-500">
                            {new Date(asset.created_at).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: '2-digit' })}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => copyUrl(asset)}
                              className="p-2 rounded-xl text-slate-600 hover:text-purple-400 hover:bg-purple-500/5 transition-all"
                              title="Copy URL"
                            >
                              {copiedId === asset.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                            <button
                              onClick={() => setDeleteTarget(asset)}
                              className="p-2 rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/5 transition-all"
                            >
                              <Trash2 size={14} />
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
      )}

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.filename}
        message="This will permanently delete this file from storage and the media library."
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
