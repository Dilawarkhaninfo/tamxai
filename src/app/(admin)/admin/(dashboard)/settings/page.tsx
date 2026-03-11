"use client";

import React from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Share2, 
  Save,
  Shield,
  Bell,
  Eye,
  Lock,
  Zap,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/admin/Toast';

export default function SettingsPage() {
  const { showToast } = useToast();

  const handleSave = () => {
    showToast('Settings saved successfully', 'success');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-lg bg-slate-500/10 text-slate-400">
               <SettingsIcon size={20} />
             </div>
             <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">System <span className="text-slate-500">Settings</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">Manage global website configuration, contact details, and social profiles.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-white"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="bg-[#090E1A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl group">
             <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                   <Globe size={18} className="text-purple-400" />
                   <h3 className="font-bold text-white uppercase tracking-widest text-sm">General Information</h3>
                </div>
                <div className="w-2 h-2 rounded-full bg-purple-500" />
             </div>
             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Company Name</label>
                   <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white font-bold transition-all" defaultValue="TAMx AI Systems" />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Website Title</label>
                   <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white font-bold transition-all" defaultValue="TAMx - Building Digital Futures" />
                </div>
                <div className="md:col-span-2 space-y-3">
                   <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Meta Description (SEO)</label>
                   <textarea className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 h-28 text-slate-400 font-medium leading-relaxed transition-all" defaultValue="TAMx Systems provides high-fidelity AI products and digital strategy for modern global enterprises." />
                </div>
             </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#090E1A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
             <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
                <Mail size={18} className="text-blue-400" />
                <h3 className="font-bold text-white uppercase tracking-widest text-sm">Contact Details</h3>
             </div>
             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Support Email</label>
                   <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                      <input type="email" className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-mono transition-all" defaultValue="ops@tamx.ai" />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Phone Number</label>
                   <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                      <input type="text" className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-mono transition-all" defaultValue="+1.TAMX.PROTO" />
                   </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                   <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Office Address</label>
                   <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-slate-700" size={16} />
                      <textarea className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-24 text-slate-400 transition-all font-medium" defaultValue="Sector 7, Innovation District, Global Node A-1" />
                   </div>
                </div>
             </div>
          </div>

          {/* Social Links */}
          <div className="bg-[#090E1A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
             <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
                <Share2 size={18} className="text-emerald-400" />
                <h3 className="font-bold text-white uppercase tracking-widest text-sm">Social Presence</h3>
             </div>
             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {['LinkedIn', 'Twitter', 'GitHub', 'Instagram'].map((platform) => (
                  <div key={platform} className="space-y-3">
                     <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">{platform}</label>
                     <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-emerald-400/70 font-mono transition-all" placeholder={`https://example.com/${platform.toLowerCase()}`} />
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
           <div className="bg-[#090E1A] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <Shield size={20} className="text-orange-500" />
                    <h4 className="font-bold text-white uppercase tracking-widest text-sm">Security</h4>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Two-Factor Auth</span>
                       <div className="w-10 h-5 bg-orange-500/20 rounded-full relative border border-orange-500/30">
                          <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                       </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Login Alerts</span>
                       <div className="w-10 h-5 bg-white/5 rounded-full relative border border-white/10">
                          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-slate-600 rounded-full" />
                       </div>
                    </div>
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest mt-4">
                       Adjust Security Layer
                    </button>
                 </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-orange-500/5 blur-[50px] pointer-events-none group-hover:bg-orange-500/10 transition-all" />
           </div>

           <div className="bg-[#090E1A] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 font-bold text-white uppercase tracking-widest">
                 <div className="flex items-center gap-3 mb-6">
                    <Cpu size={20} className="text-cyan-500" />
                    <span className="text-sm">Storage Status</span>
                 </div>
                 <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[8px] tracking-[0.4em]">
                           <span>STORAGE USAGE</span>
                           <span className="text-cyan-400 font-bold">42%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-cyan-500 w-[42%] shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-[8px] tracking-[0.4em]">
                           <span>CACHE STATUS</span>
                           <span className="text-cyan-400 font-bold">STABLE</span>
                        </div>
                        <div className="flex gap-1">
                           {[1,2,3,4,5,6,7,8].map(i => (
                             <div key={i} className={`h-3 w-1.5 rounded-full ${i < 7 ? 'bg-cyan-500' : 'bg-white/5'}`} />
                           ))}
                        </div>
                     </div>
                     <button className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-[9px] text-cyan-400 hover:text-cyan-300 transition-all uppercase tracking-widest mt-4">
                        <RefreshCw size={14} />
                        Clear System Cache
                     </button>
                 </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-cyan-500/5 blur-[50px] pointer-events-none" />
           </div>
        </div>
      </div>
    </div>
  );
}
