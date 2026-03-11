"use client";

import React, { useRef } from 'react';
import { Save, Package, DollarSign, Tag, Plus, Image as ImageIcon } from 'lucide-react';

export function ProductForm({ initialData, onSubmit, onCancel }: { 
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
      console.log('Selected product image:', file.name);
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
        {/* Name */}
        <div className="space-y-3 md:col-span-2">
           <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Identity & Branding</label>
              <div className="h-[1px] flex-1 bg-white/5 ml-4" />
           </div>
           <div className="relative group">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={18} />
              <input 
                type="text" 
                className="w-full bg-[#010205] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-white placeholder:text-slate-700 shadow-inner" 
                placeholder="PRO-LEVEL AI CORE"
                defaultValue={initialData?.name}
                required
              />
           </div>
        </div>

        {/* Price & Category */}
        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Asset Valuation</label>
           <div className="relative group">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-400 transition-colors" size={18} />
              <input 
                type="text" 
                className="w-full bg-[#010205] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white font-mono" 
                placeholder="4,999.00"
                defaultValue={initialData?.price?.replace('$', '')}
              />
           </div>
        </div>

        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Protocol Type</label>
           <div className="relative group">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={18} />
              <select 
                className="w-full bg-[#010205] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none text-white font-bold"
                defaultValue={initialData?.category || ""}
              >
                <option value="" disabled>Select Segment</option>
                <option value="Software">Core Software</option>
                <option value="API">Neural API</option>
                <option value="Hardware">Quantum Hardware</option>
                <option value="Service">Premium Service</option>
              </select>
           </div>
        </div>

        {/* Inventory */}
        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Stock Level</label>
           <input 
             type="number" 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white font-bold" 
             placeholder="500"
             defaultValue={100}
           />
        </div>

        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">System Hash / SKU</label>
           <input 
             type="text" 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all uppercase text-white font-mono tracking-widest text-center" 
             placeholder="TMX-HASH-883"
             defaultValue={initialData?.sku || `HASH-${Math.floor(1000 + Math.random() * 9000)}`}
           />
        </div>

        {/* Media */}
        <div className="space-y-3 md:col-span-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Visual Asset</label>
           <button 
             type="button"
             onClick={handleUploadClick}
             className="w-full h-40 bg-gradient-to-br from-white/[0.02] to-transparent border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-white hover:border-purple-500/50 hover:bg-white/[0.04] transition-all group relative overflow-hidden"
           >
              <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity blur-[40px]" />
              <div className="p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-500">
                <Plus size={28} className="text-purple-400" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">Deploy Texture / Image</span>
              <p className="text-[9px] text-slate-600 font-bold uppercase">Max resolution 4K supported</p>
           </button>
        </div>

        {/* Specifications */}
        <div className="space-y-3 md:col-span-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Technical Specs</label>
           <textarea 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all h-32 text-white font-medium placeholder:text-slate-700 custom-scrollbar" 
             placeholder="• Optimized Neural Path&#10;• Real-time synchronization&#10;• Enterprise-grade encryption"
           />
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 pt-10 border-t border-white/5 mt-12 bg-black/20 -mx-6 sm:-mx-10 px-6 sm:px-10 pb-2">
         <button 
           type="button" 
           onClick={onCancel}
           className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-500 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
         >
           Discard
         </button>
         <button 
           type="submit"
           className="flex-1 flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-[11px] font-black shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-white uppercase tracking-widest"
         >
           <Save size={18} />
           {initialData ? 'Update Core Registry' : 'Initialize Asset'}
         </button>
      </div>
    </form>
  );
}
