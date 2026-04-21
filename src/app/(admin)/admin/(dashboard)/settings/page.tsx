"use client";

import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Share2, 
  Save,
  Shield,
  Lock,
  Zap,
  Cpu,
  RefreshCw,
  Instagram,
  Linkedin,
  Facebook,
  Eye,
  EyeOff,
  Check,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/admin/Toast';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [socials, setSocials] = useState({
    linkedin: 'https://linkedin.com/company/tamxai',
    instagram: 'https://instagram.com/tamxai',
    facebook: 'https://facebook.com/tamxai'
  });

  const [contact, setContact] = useState({
    email: 'ops@tamx.ai',
    phone: '+1.TAMX.AI',
    address: 'Innovation District, Global Node A-1'
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Settings & Contact info synchronized', 'success');
    }, 1000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      showToast('New passwords do not match', 'error');
      return;
    }
    showToast('Password updated successfully', 'success');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-10 max-w-6xl pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-slate-500/10 text-slate-400 border border-white/5 shadow-inner">
              <SettingsIcon size={22} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">System <span className="text-slate-500">Settings</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest opacity-60">Architect your global identity and secure your node.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-white group"
        >
          {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          
          {/* Identity & SEO */}
          <section className="bg-[#090E1A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
             <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                      <Globe size={18} />
                   </div>
                   <h3 className="font-black text-white uppercase tracking-widest text-xs">Global Identity</h3>
                </div>
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
             </div>
             <div className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Company Entity</label>
                      <input type="text" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white font-black transition-all" defaultValue="TAMx AI" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Platform Alias</label>
                      <input type="text" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white font-black transition-all" defaultValue="tamx.ai" />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Meta Description (SEO)</label>
                   <textarea className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 h-32 text-slate-400 font-medium leading-relaxed transition-all resize-none" defaultValue="Building the next generation of autonomous digital intelligence." />
                </div>
             </div>
          </section>

          {/* Contact Details */}
          <section className="bg-[#090E1A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
             <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                      <Smartphone size={18} />
                   </div>
                   <h3 className="font-black text-white uppercase tracking-widest text-xs">Reachability</h3>
                </div>
                <Check size={16} className="text-blue-500/50" />
             </div>
             <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Operations Email</label>
                   <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                      <input 
                        type="email" 
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-mono font-bold transition-all" 
                      />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Phone Line</label>
                   <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                      <input 
                        type="text" 
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-mono font-bold transition-all" 
                      />
                   </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Physical Node (Address)</label>
                   <div className="relative">
                      <MapPin className="absolute left-6 top-6 text-slate-700" size={18} />
                      <textarea 
                        value={contact.address}
                        onChange={(e) => setContact({ ...contact, address: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-24 text-slate-400 transition-all font-medium resize-none" 
                      />
                   </div>
                </div>
             </div>
          </section>

          {/* Social Presence */}
          <section className="bg-[#090E1A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
             <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <Share2 size={18} />
                   </div>
                   <h3 className="font-black text-white uppercase tracking-widest text-xs">Social Grid</h3>
                </div>
                <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />)}
                </div>
             </div>
             <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-3">
                   <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">
                      <Linkedin size={12} className="text-blue-400" /> LinkedIn
                   </label>
                   <input 
                     type="text" 
                     value={socials.linkedin}
                     onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                     className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-emerald-400/80 font-mono transition-all" 
                   />
                </div>
                <div className="space-y-3">
                   <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">
                      <Instagram size={12} className="text-pink-400" /> Instagram
                   </label>
                   <input 
                     type="text" 
                     value={socials.instagram}
                     onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                     className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-emerald-400/80 font-mono transition-all" 
                   />
                </div>
                <div className="space-y-3">
                   <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">
                      <Facebook size={12} className="text-blue-600" /> Facebook
                   </label>
                   <input 
                     type="text" 
                     value={socials.facebook}
                     onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                     className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-emerald-400/80 font-mono transition-all" 
                   />
                </div>
             </div>
          </section>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-10">
          {/* Change Password */}
          <section className="bg-[#0D121F] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                      <Lock size={18} />
                   </div>
                   <h4 className="font-black text-white uppercase tracking-widest text-xs">Access Control</h4>
                </div>
                
                <form onSubmit={handleChangePassword} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">New Terminal Password</label>
                      <div className="relative">
                         <input 
                            type={showPassword ? 'text' : 'password'}
                            value={passwordData.new}
                            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-white transition-all font-mono" 
                            placeholder="••••••••"
                         />
                         <button 
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                         >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                         </button>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Update</label>
                      <input 
                         type={showPassword ? 'text' : 'password'}
                         value={passwordData.confirm}
                         onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                         className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-white transition-all font-mono" 
                         placeholder="••••••••"
                      />
                   </div>
                   <button 
                     type="submit"
                     className="w-full py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-2xl text-[10px] font-black text-orange-400 hover:text-orange-300 transition-all uppercase tracking-[0.2em] mt-4 shadow-lg shadow-orange-500/5 group/btn"
                   >
                      <span className="flex items-center justify-center gap-2">
                         <Shield size={14} className="group-hover/btn:rotate-12 transition-transform" />
                         Sync Credentials
                      </span>
                   </button>
                </form>
             </div>
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-500/5 blur-[60px] pointer-events-none group-hover:bg-orange-500/10 transition-all duration-1000" />
          </section>

          {/* System Health */}
          <section className="bg-[#090E1A] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Cpu size={18} />
                   </div>
                   <span className="text-xs font-black text-white uppercase tracking-widest">Node Health</span>
                </div>
                <div className="space-y-8">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[8px] font-black tracking-[0.4em] text-slate-600">
                          <span>STORAGE CLUSTER</span>
                          <span className="text-cyan-400">42%</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '42%' }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]" 
                          />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between text-[8px] font-black tracking-[0.4em] text-slate-600">
                          <span>NEURAL UPTIME</span>
                          <span className="text-emerald-400">99.9%</span>
                       </div>
                       <div className="flex gap-1.5">
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                            <div key={i} className={`h-4 w-1 rounded-full ${i < 12 ? 'bg-emerald-500/50' : 'bg-emerald-500 animate-pulse'}`} />
                          ))}
                       </div>
                    </div>
                    <button className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[9px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest mt-4">
                       <RefreshCw size={14} />
                       Re-Index Node
                    </button>
                </div>
             </div>
             <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />
          </section>
        </div>
      </div>
    </div>
  );
}
