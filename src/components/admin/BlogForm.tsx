"use client";

import React, { useRef } from 'react';
import { Save, Image as ImageIcon, Plus, Tag, User } from 'lucide-react';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

export function BlogForm({ initialData, onSubmit, onCancel }: { 
  initialData?: any, 
  onSubmit: (data: any) => void, 
  onCancel: () => void 
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected blog image:', file.name);
    }
  };

  return (
    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onSubmit({}); }}>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Title */}
        <div className="space-y-3 md:col-span-2">
           <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Editorial Title</label>
              <div className="h-[1px] flex-1 bg-white/5 ml-4" />
           </div>
           <input 
             type="text" 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-white placeholder:text-slate-700 shadow-inner" 
             placeholder="THE FUTURE OF NEURAL INTERFACES"
             defaultValue={initialData?.title}
             required
           />
        </div>

        {/* Category & Visibility */}
        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Editorial Segment</label>
           <div className="relative group">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={18} />
              <select 
                className="w-full bg-[#010205] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none text-white font-bold"
                defaultValue={initialData?.category || ""}
              >
                <option value="" disabled>Select Segment</option>
                <option value="Technology">Technology</option>
                <option value="Design">Architecture & Design</option>
                <option value="Business">Strategic Business</option>
                <option value="AI">Artificial Intelligence</option>
              </select>
           </div>
        </div>

        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Protocol Status</label>
           <div className="flex gap-2">
              {['published', 'draft', 'scheduled'].map((status) => (
                <label key={status} className="flex-1 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="status" 
                    value={status} 
                    className="sr-only peer" 
                    defaultChecked={initialData?.status === status || (status === 'draft' && !initialData)}
                  />
                  <div className="h-full px-2 py-3.5 text-center text-[9px] font-black uppercase tracking-widest border border-white/5 rounded-xl bg-[#010205] transition-all peer-checked:bg-purple-600/10 peer-checked:border-purple-500/50 peer-checked:text-purple-400 group-hover:bg-white/5 shadow-inner">
                    {status}
                  </div>
                </label>
              ))}
           </div>
        </div>

        {/* Author & Read Time */}
        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Author Identity</label>
           <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="text" 
                className="w-full bg-[#010205] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white font-bold" 
                placeholder="DILAWAR KHAN"
                defaultValue={initialData?.author || "Dilawar Khan"}
              />
           </div>
        </div>

        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Temporal Duration (MIN)</label>
           <input 
             type="number" 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white font-mono text-center" 
             placeholder="08"
             defaultValue={initialData?.readTime || 5}
           />
        </div>

        {/* Rich Text Editor */}
        <div className="space-y-3 md:col-span-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Narrative Content</label>
           <div className="rounded-[2rem] border border-white/5 bg-[#010205] p-1 overflow-hidden shadow-inner">
              <RichTextEditor />
           </div>
        </div>

        {/* Featured Image */}
        <div className="space-y-3 md:col-span-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Cinematic Keyframe</label>
           <button 
             type="button"
             onClick={handleUploadClick}
             className="w-full aspect-video bg-gradient-to-br from-white/[0.02] to-transparent border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-500 hover:text-white hover:border-purple-500/50 hover:bg-white/[0.04] transition-all group relative overflow-hidden"
           >
              <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity blur-[60px]" />
              <div className="p-6 rounded-[2rem] bg-white/5 group-hover:scale-110 transition-transform duration-700">
                <ImageIcon size={40} className="text-purple-400" />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] mb-2 leading-none">Deploy Visual Asset</p>
                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Ultra-HD Recommended (WebP / AVIF)</p>
              </div>
           </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 pt-10 border-t border-white/5 mt-12 bg-black/20 -mx-6 sm:-mx-10 px-6 sm:px-10 pb-2">
         <button 
           type="button" 
           onClick={onCancel}
           className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-500 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
         >
           Discard Changes
         </button>
         <button 
           type="submit"
           className="flex-1 flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-white uppercase tracking-widest"
         >
           <Save size={18} />
           {initialData ? 'Update Protocol' : 'Publish to Stream'}
         </button>
      </div>
    </form>
  );
}
