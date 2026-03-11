"use client";

import React from 'react';
import { Save, Laptop, Code2, Rocket, Brain, Stethoscope, Cpu, X, Plus } from 'lucide-react';

const icons = [
  { name: 'Laptop', icon: Laptop },
  { name: 'Code2', icon: Code2 },
  { name: 'Rocket', icon: Rocket },
  { name: 'Brain', icon: Brain },
  { name: 'Stethoscope', icon: Stethoscope },
  { name: 'Cpu', icon: Cpu },
];

export function ServiceForm({ initialData, onSubmit, onCancel }: { 
  initialData?: any, 
  onSubmit: (data: any) => void, 
  onCancel: () => void 
}) {
  return (
    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onSubmit({}); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Title */}
        <div className="space-y-3 md:col-span-2">
           <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Service Designation</label>
              <div className="h-[1px] flex-1 bg-white/5 ml-4" />
           </div>
           <input 
             type="text" 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-white placeholder:text-slate-700 shadow-inner" 
             placeholder="ENTERPRISE AI ARCHITECTURE"
             defaultValue={initialData?.title}
             required
           />
        </div>

        {/* Brand Icon */}
        <div className="md:col-span-2 space-y-4">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 text-center block">Representative System Icon</label>
           <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {icons.map((item) => (
                <label key={item.name} className="cursor-pointer group">
                  <input type="radio" name="icon" value={item.name} className="sr-only peer" defaultChecked={initialData?.icon === item.name} />
                  <div className="aspect-square rounded-2xl bg-[#010205] border border-white/5 flex items-center justify-center text-slate-600 hover:text-white hover:bg-white/[0.03] transition-all peer-checked:bg-purple-600/10 peer-checked:border-purple-500/50 peer-checked:text-purple-400 shadow-inner group-hover:scale-[1.05] active:scale-[0.95]">
                     <item.icon size={26} />
                  </div>
                </label>
              ))}
           </div>
        </div>

        {/* Description */}
        <div className="space-y-3 md:col-span-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Operational Overview</label>
           <textarea 
             className="w-full bg-[#010205] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all h-32 text-white font-medium placeholder:text-slate-700 custom-scrollbar shadow-inner" 
             placeholder="Describe the technical scope and business value..."
             defaultValue={initialData?.description}
           />
        </div>

        {/* Features Tagging */}
        <div className="space-y-3 md:col-span-2">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Capabilities & Modules</label>
           <div className="flex flex-wrap gap-2.5 p-6 bg-[#010205] border border-white/5 rounded-[2rem] min-h-[120px] shadow-inner items-start">
              {initialData?.features?.map((f: string) => (
                <div key={f} className="px-4 py-2 rounded-xl bg-purple-500/5 border border-purple-500/20 text-[10px] font-black text-purple-400 flex items-center gap-2.5 uppercase tracking-widest hover:border-purple-500/40 transition-colors group">
                   {f}
                   <X size={12} className="cursor-pointer group-hover:text-white transition-colors" />
                </div>
              ))}
              <button type="button" className="px-5 py-2.5 rounded-xl border-2 border-dashed border-white/5 text-[10px] font-black text-slate-600 flex items-center gap-2 hover:border-purple-500/30 hover:text-purple-400 hover:bg-purple-500/[0.02] transition-all uppercase tracking-widest">
                 <Plus size={14} />
                 Initialize Node
              </button>
           </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 pt-10 border-t border-white/5 mt-12 bg-black/20 -mx-6 sm:-mx-10 px-6 sm:px-10 pb-2">
         <button 
           type="button" 
           onClick={onCancel}
           className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-500 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
         >
           Cancel Action
         </button>
         <button 
           type="submit"
           className="flex-1 flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-[11px] font-black shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-white uppercase tracking-widest"
         >
           <Save size={18} />
           {initialData ? 'Synchronize Registry' : 'Deploy Service'}
         </button>
      </div>
    </form>
  );
}
