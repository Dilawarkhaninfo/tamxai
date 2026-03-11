"use client";

import React from 'react';
import { Save, User, Shield, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export function UserForm({ initialData, onSubmit, onCancel }: { 
  initialData?: any, 
  onSubmit: (data: any) => void, 
  onCancel: () => void 
}) {
  return (
    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onSubmit({}); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Full Name */}
        <div className="space-y-3 md:col-span-2">
           <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Identity & Profile</label>
              <div className="h-[1px] flex-1 bg-white/5 ml-4" />
           </div>
           <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={18} />
              <input 
                type="text" 
                className="w-full bg-[#010205] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-white placeholder:text-slate-700 shadow-inner" 
                placeholder="JOHN DOE"
                defaultValue={initialData?.name}
                required
              />
           </div>
        </div>

        {/* Email & Role */}
        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Communication Channel</label>
           <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="email" 
                className="w-full bg-[#010205] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-700 font-medium" 
                placeholder="PRO.USER@TAMX.AI"
                defaultValue={initialData?.email}
                required
              />
           </div>
        </div>

        <div className="space-y-3">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">System Privilege</label>
           <div className="relative group">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-400 transition-colors" size={18} />
              <select 
                className="w-full bg-[#010205] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none text-white font-bold"
                defaultValue={initialData?.role || ""}
              >
                <option value="" disabled>Select Privilege</option>
                <option value="Admin">Global Administrator</option>
                <option value="Editor">Content Architect</option>
                <option value="Viewer">System Observer</option>
              </select>
           </div>
        </div>

        {/* Password (Only for new users) */}
        {!initialData && (
          <div className="space-y-3 md:col-span-2">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Access Credentials</label>
             <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-[#010205] border border-white/5 rounded-2xl pl-12 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono text-white tracking-[0.5em]" 
                  placeholder="••••••••••••"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                   <EyeOff size={18} />
                </button>
             </div>
             <p className="text-[9px] text-slate-600 mt-2 uppercase tracking-[0.2em] font-black ml-1">Complexity requirement: 12+ characters, alphanumeric, symbols.</p>
          </div>
        )}

        {/* Status Mapping */}
        <div className="md:col-span-2 space-y-4">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Account Operational Status</label>
           <div className="flex gap-2">
              {['active', 'inactive', 'suspended'].map((status) => (
                <label key={status} className="flex-1 cursor-pointer group">
                  <input type="radio" name="status" value={status} className="sr-only peer" defaultChecked={initialData?.status === status || (status === 'active' && !initialData)} />
                  <div className="h-full px-4 py-4 text-center text-[9px] font-black uppercase tracking-[0.2em] border border-white/5 rounded-2xl bg-[#010205] transition-all peer-checked:bg-purple-600/10 peer-checked:border-purple-500/50 peer-checked:text-purple-400 group-hover:bg-white/5 shadow-inner">
                    {status}
                  </div>
                </label>
              ))}
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
           className="flex-1 flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-white uppercase tracking-widest"
         >
           <Save size={18} />
           {initialData ? 'Update Privileges' : 'Deploy Identity'}
         </button>
      </div>
    </form>
  );
}
