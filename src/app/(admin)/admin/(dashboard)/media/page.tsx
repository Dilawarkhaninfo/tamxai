"use client";

import React, { useState, useRef } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Download, 
  Trash2, 
  Grid,
  List,
  FileCode,
  FileText,
  Filter,
  Eye,
  CloudUpload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/admin/Toast';

const mockMedia = [
  { id: '1', name: 'hero_primary_render.webp', size: '2.4 MB', type: 'image', date: 'Mar 10, 2024', dim: '3840x2160' },
  { id: '2', name: 'tamx_identity_v2.svg', size: '12 KB', type: 'vector', date: 'Mar 08, 2024', dim: 'Flexible' },
  { id: '3', name: 'cloud_infra_blueprint.png', size: '1.2 MB', type: 'image', date: 'Mar 02, 2024', dim: '1920x1080' },
  { id: '4', name: 'system_manual_v1.pdf', size: '450 KB', type: 'document', date: 'Feb 28, 2024', dim: 'N/A' },
  { id: '5', name: 'neural_mesh_motion.mp4', size: '12.8 MB', type: 'video', date: 'Feb 25, 2024', dim: '1080p' },
  { id: '6', name: 'corporate_font_spec.json', size: '4 KB', type: 'code', date: 'Feb 20, 2024', dim: 'N/A' },
];

export default function MediaPage() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      showToast('Asset deleted successfully', 'error');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`Uploading ${file.name}...`, 'success');
    }
  };

  return (
    <div className="space-y-8">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
               <ImageIcon size={20} />
             </div>
             <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">Media <span className="text-blue-500">Library</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">Manage and organize all digital assets and brand resources.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleUploadClick}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-white"
          >
            <CloudUpload size={18} />
            Upload Assets
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#090E1A] border border-white/5 rounded-3xl p-6 shadow-2xl">
         <div className="relative flex-1 w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input 
              type="text" 
              placeholder="Search assets by name or type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-800"
            />
         </div>
         <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-1 bg-black p-1.5 rounded-xl border border-white/5">
               <button className="p-2 bg-white/5 rounded-lg text-white"><Grid size={18} /></button>
               <button className="p-2 text-slate-600 hover:text-white transition-all"><List size={18} /></button>
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all">
                <Filter size={14} />
                Filter Type
            </button>
         </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        <AnimatePresence>
          {mockMedia.map((asset) => (
            <motion.div 
              key={asset.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-[#090E1A] border border-white/5 rounded-[2rem] overflow-hidden aspect-square hover:border-blue-500/50 transition-all duration-500 shadow-2xl"
            >
               {/* Preview */}
               <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-8 text-center group-hover:blur-sm transition-all duration-500">
                  <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-700 group-hover:text-blue-500/40 transition-colors mb-4">
                     {asset.type === 'image' && <ImageIcon size={32} />}
                     {asset.type === 'vector' && <FileCode size={32} />}
                     {asset.type === 'document' && <FileText size={32} />}
                     {asset.type === 'video' && <Eye size={32} />}
                     {asset.type === 'code' && <FileCode size={32} />}
                  </div>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest truncate w-full">{asset.name}</p>
                  <p className="text-[8px] font-bold text-slate-800 uppercase tracking-widest mt-1">{asset.size}</p>
               </div>

               {/* Overlay */}
               <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                     <span className="px-2 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 text-[8px] font-bold text-blue-400 uppercase tracking-widest">
                        {asset.type}
                     </span>
                     <div className="flex gap-2">
                        <button className="p-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-white hover:text-black transition-all shadow-2xl"><Download size={14} /></button>
                        <button 
                          onClick={() => handleDelete(asset.id)}
                          className="p-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-2xl"
                        ><Trash2 size={14} /></button>
                     </div>
                  </div>
                  
                  <div className="space-y-1">
                     <p className="text-xs font-bold text-white truncate uppercase">{asset.name}</p>
                     <p className="text-[8px] text-white/50 font-bold uppercase tracking-widest">{asset.date}</p>
                  </div>
               </div>

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}

          {/* Add Asset Dropzone */}
          <motion.button 
            onClick={handleUploadClick}
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-slate-700 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-500 aspect-square group shadow-none"
          >
             <div className="p-5 rounded-full bg-white/5 group-hover:bg-blue-500/10 transition-all">
                <CloudUpload size={48} className="transition-transform duration-500" />
             </div>
             <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-1">Upload Asset</span>
                <span className="text-[8px] font-bold text-slate-800 uppercase tracking-widest">Drag and drop files</span>
             </div>
          </motion.button>
        </AnimatePresence>
      </div>
    </div>
  );
}
