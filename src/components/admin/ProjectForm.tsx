"use client";

import React, { useRef } from 'react';
import { Save, X, Image as ImageIcon, Plus } from 'lucide-react';

export function ProjectForm({ initialData, onSubmit, onCancel }: { 
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
      console.log('Selected file:', file.name);
      // In a real application, you would handle the file upload here
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
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Venture Title</label>
              <div className="h-[1px] flex-1 bg-white/5 ml-4" />
           </div>
           <input 
             type="text" 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-white placeholder:text-slate-700 shadow-inner" 
             placeholder="QUANTUM-CORE INFRASTRUCTURE"
             defaultValue={initialData?.title}
             required
           />
        </div>

        {/* Industry & Status */}
        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Technical Sector</label>
           <select 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none text-white font-bold"
             defaultValue={initialData?.industry || ""}
           >
             <option value="" disabled>Select Domain</option>
             <option value="AI">Neural Networks / AI</option>
             <option value="FinTech">Decentralized Finance</option>
             <option value="HealthTech">Bio-Technology</option>
             <option value="Cloud">Edge Computing</option>
             <option value="eCommerce">Next-Gen Commerce</option>
           </select>
        </div>

        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Lifecycle Status</label>
           <div className="flex gap-2">
              {['published', 'draft', 'archived'].map((status) => (
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

        {/* Description */}
        <div className="space-y-3 md:col-span-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Mission Narrative</label>
           <textarea 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all h-32 text-white font-medium placeholder:text-slate-700 shadow-inner custom-scrollbar" 
             placeholder="Outline the architectural goals and ecosystem impact..."
             defaultValue={initialData?.description}
           />
        </div>

        {/* Media Upload */}
        <div className="space-y-3 md:col-span-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Project Visual Assets</label>
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button 
                type="button" 
                onClick={handleUploadClick}
                className="aspect-video bg-gradient-to-br from-white/[0.02] to-transparent border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-white hover:border-purple-500/50 transition-all group relative overflow-hidden"
              >
                 <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity blur-[40px]" />
                 <Plus size={24} className="group-hover:scale-110 transition-all text-purple-400" />
                 <span className="text-[9px] font-black uppercase tracking-widest">Add Frame</span>
              </button>
              {/* Dummy existing images */}
              <div className="aspect-video bg-[#010205] border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-inner">
                 <ImageIcon size={24} className="text-slate-800" />
                 <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button type="button" className="p-2 bg-red-500/10 rounded-xl text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20">
                       <X size={16} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 pt-10 border-t border-white/5 mt-12 bg-black/20 -mx-6 sm:-mx-10 px-6 sm:px-10 pb-2">
         <button 
           type="button" 
           onClick={onCancel}
           className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-500 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
         >
           Cancel Deployment
         </button>
         <button 
           type="submit"
           className="flex-1 flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-white uppercase tracking-widest"
         >
           <Save size={18} />
           {initialData ? 'Update Core Registry' : 'Launch New Venture'}
         </button>
      </div>
    </form>
  );
}
