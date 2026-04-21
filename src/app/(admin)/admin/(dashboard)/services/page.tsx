"use client";

import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Settings2, 
  Trash2, 
  ChevronRight, 
  Zap, 
  ListPlus,
  Box,
  Image as ImageIcon,
  Check,
  X,
  Code,
  Layout,
  Search,
  Paintbrush
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/admin/Toast';

interface ServiceItem {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  href: string;
  desc: string;
  items: string[];
}

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'AI Software Development',
    icon: 'Code',
    href: '/services',
    desc: 'Building intelligent, scalable AI-powered applications for web and mobile.',
    items: ['WEB DEVELOPMENT', 'APP DEVELOPMENT', 'Cloud-Native AI Architecture', 'Scalable Microservices']
  },
  {
    id: '2',
    title: 'Product Design',
    icon: 'Paintbrush',
    href: '/services',
    desc: 'Crafting premium, user-centric experiences that define modern digital products.',
    items: ['User Research & Design Strategy', 'UX Architecture & Wireframing', 'High-Fidelity UI Design', 'Design Systems']
  }
];

export default function ServicesManagementPage() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    icon: 'Code',
    href: '/services',
    desc: '',
    newPoint: ''
  });

  const [servicePoints, setServicePoints] = useState<string[]>([]);

  const handleOpenModal = (service?: ServiceItem) => {
    if (service) {
      setEditingService(service);
      setFormData({ 
        title: service.title, 
        icon: service.icon, 
        href: service.href, 
        desc: service.desc,
        newPoint: ''
      });
      setServicePoints([...service.items]);
    } else {
      setEditingService(null);
      setFormData({ title: '', icon: 'Code', href: '/services', desc: '', newPoint: '' });
      setServicePoints([]);
    }
    setIsModalOpen(true);
  };

  const handleAddPoint = () => {
    if (formData.newPoint.trim()) {
      setServicePoints([...servicePoints, formData.newPoint.trim()]);
      setFormData({ ...formData, newPoint: '' });
    }
  };

  const handleRemovePoint = (idx: number) => {
    setServicePoints(servicePoints.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.desc) {
      showToast('Title and Description are required', 'error');
      return;
    }

    const serviceData = {
      title: formData.title,
      icon: formData.icon,
      href: formData.href,
      desc: formData.desc,
      items: servicePoints
    };

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...serviceData } : s));
      showToast('Service updated successfully', 'success');
    } else {
      const newService = {
        id: Math.random().toString(36).substr(2, 9),
        ...serviceData
      };
      setServices([...services, newService]);
      showToast('New service category added', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this service?')) {
      setServices(services.filter(s => s.id !== id));
      showToast('Service removed', 'success');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Zap size={22} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Service <span className="text-slate-500">Inventory</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest opacity-60">Architect your technical offerings and capabilities.</p>
        </div>

        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl text-xs font-black shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-white group"
        >
          <Box size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {services.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group bg-[#090E1A] border border-white/5 rounded-[3rem] p-10 hover:border-indigo-500/30 transition-all duration-700 shadow-2xl relative overflow-hidden flex flex-col"
            >
              {/* Decorative Glow */}
              <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-1000" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                    <Code size={32} /> {/* Using fallback for preview */}
                  </div>
                  <div className="flex items-center gap-3">
                     <button 
                       onClick={() => handleOpenModal(service)}
                       className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all"
                     >
                        <Settings2 size={16} />
                     </button>
                     <button 
                        onClick={() => handleDelete(service.id)}
                        className="p-3 bg-white/5 hover:bg-red-500/10 border border-white/5 rounded-xl text-slate-700 hover:text-red-400 transition-all"
                     >
                        <Trash2 size={16} />
                     </button>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{service.title}</h3>
                <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed opacity-80">{service.desc}</p>

                <div className="mt-auto space-y-3">
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                      <ListPlus size={14} />
                      Core Capabilities
                   </div>
                   <div className="grid grid-cols-1 gap-2">
                      {service.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs text-indigo-300/80 font-bold uppercase tracking-wider bg-white/[0.02] p-3 rounded-xl border border-white/5">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                           {item}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-4xl bg-[#0D121F] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingService ? 'Edit' : 'Configure New'} <span className="text-slate-500">Service</span>
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Service Title</label>
                        <input 
                          type="text" 
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white font-black transition-all"
                          placeholder="e.g. Neural Link Systems"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Icon Token</label>
                           <select 
                              value={formData.icon}
                              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                              className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white font-bold transition-all appearance-none"
                           >
                              <option>Code</option>
                              <option>Paintbrush</option>
                              <option>Brain</option>
                              <option>Cpu</option>
                              <option>TrendingUp</option>
                           </select>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Page Link</label>
                           <input 
                              type="text" 
                              value={formData.href}
                              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                              className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-400 font-mono transition-all"
                           />
                         </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Market Description</label>
                        <textarea 
                          value={formData.desc}
                          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-40 text-slate-400 font-medium leading-relaxed transition-all resize-none"
                          placeholder="Enter a compelling value proposition..."
                        />
                      </div>
                   </div>

                   <div className="flex flex-col">
                      <div className="space-y-2 mb-6">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Add Key Deliverable</label>
                        <div className="flex gap-2">
                           <input 
                             type="text" 
                             value={formData.newPoint}
                             onChange={(e) => setFormData({ ...formData, newPoint: e.target.value })}
                             onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPoint())}
                             className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white font-bold transition-all"
                             placeholder="e.g. End-to-end Encryption"
                           />
                           <button 
                             type="button"
                             onClick={handleAddPoint}
                             className="p-4 bg-indigo-600 rounded-2xl text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                           >
                             <Plus size={20} />
                           </button>
                        </div>
                      </div>

                      <div className="space-y-1 overflow-y-auto max-h-[400px] flex-1 pb-4 custom-scrollbar">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 mb-2 block">Current Roadmap / Items</label>
                         {servicePoints.map((p, i) => (
                           <motion.div 
                             key={i} 
                             initial={{ opacity: 0, x: 10 }}
                             animate={{ opacity: 1, x: 0 }}
                             className="group/item flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-indigo-500/20 transition-all"
                           >
                              <div className="flex items-center gap-3">
                                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                                 <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{p}</span>
                              </div>
                              <button 
                                onClick={() => handleRemovePoint(i)}
                                className="p-2 text-slate-700 hover:text-red-400 opacity-0 group-hover/item:opacity-100 transition-all"
                              >
                                <Trash2 size={12} />
                              </button>
                           </motion.div>
                         ))}
                         {servicePoints.length === 0 && (
                           <div className="text-center py-20 bg-black/40 rounded-3xl border border-dashed border-white/5 text-slate-700 text-[10px] font-black uppercase tracking-widest">
                             List defines your service scope
                           </div>
                         )}
                      </div>
                   </div>
                </form>
              </div>

              <div className="p-8 border-t border-white/5 bg-white/[0.01] flex gap-4 shrink-0">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-600 uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Discard
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-2 px-16 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  <Check size={18} />
                  {editingService ? 'Update Deployment' : 'Launch Service'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
