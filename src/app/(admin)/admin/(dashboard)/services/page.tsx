"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Layers, 
  Zap, 
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  ArrowUpRight,
  Laptop,
  Code2,
  Rocket,
  Brain,
  Stethoscope,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@/components/admin/Modal';
import { ServiceForm } from '@/components/admin/ServiceForm';
import { useToast } from '@/components/admin/Toast';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';

const iconMap: Record<string, any> = {
  Laptop,
  Code2,
  Rocket,
  Brain,
  Stethoscope,
  Cpu,
};

const mockServices = [
  { id: '1', title: 'AI Automation', description: 'Streamline business processes with intelligent agents and neural workflows.', features: ['Custom LLMs', 'RAG integration', 'Agentic Workflows'], tech: 'Python, OpenAI', icon: 'Brain' },
  { id: '2', title: 'Cloud Infrastructure', description: 'Scalable and secure cloud solutions for modern high-performance apps.', features: ['Kubernetes', 'CI/CD Ops', 'Edge Computing'], tech: 'AWS, Docker', icon: 'Cpu' },
  { id: '3', title: 'Web Experience', description: 'Next-generation web platforms with immersive 3D and motion.', features: ['Next.js', 'Three.js', 'Framer Motion'], tech: 'React, TS', icon: 'Laptop' },
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>(mockServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<any | null>(null);
  const { showToast } = useToast();

  const handleCreate = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingService) {
      setServices(prev => prev.map(s => s.id === editingService.id ? { ...s, ...data } : s));
      showToast('Service updated successfully', 'success');
    } else {
      const newService = {
        id: (services.length + 1).toString(),
        title: data.title || 'New Service',
        description: data.description || '',
        features: data.features || [],
        tech: data.tech || '',
        icon: data.icon || 'Rocket',
        ...data
      };
      setServices(prev => [newService, ...prev]);
      showToast('New service created successfully', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (service: any) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServices(prev => prev.filter(s => s.id !== serviceToDelete.id));
      showToast('Service deleted successfully', 'error');
      setServiceToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
               <Layers size={20} />
             </div>
             <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">Services <span className="text-cyan-500">Catalog</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">Manage and configure the technical services and professional offerings.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={18} />
          Create Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Zap;
            return (
              <motion.div 
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-[#090E1A] border border-white/5 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
              >
                 <div className="flex items-start justify-between mb-8">
                    <div className="p-4 rounded-2xl bg-black border border-white/5 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/5 transition-all duration-500 shadow-xl">
                       <Icon size={32} />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      <button 
                        onClick={() => handleEdit(service)}
                        className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all shadow-lg"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(service)}
                        className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-red-400 transition-all shadow-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                 </div>

                 <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                 <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium line-clamp-3">{service.description}</p>

                 <div className="space-y-3 mb-8">
                    {service.features.map((f: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                         <div className="w-1 h-1 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform" />
                         {f}
                      </div>
                    ))}
                 </div>

                 <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] font-mono">{service.tech}</span>
                    <button className="text-cyan-400 hover:translate-x-1 transition-transform">
                       <ArrowUpRight size={20} />
                    </button>
                 </div>

                 {/* Premium subtle gloss */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px] pointer-events-none group-hover:bg-cyan-500/10 transition-all" />
              </motion.div>
            );
          })}

          {/* Add New Placeholder */}
          <motion.button 
            onClick={handleCreate}
            layout
            className="border-2 border-dashed border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center gap-5 text-slate-600 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-500 group"
          >
             <div className="p-5 rounded-full bg-white/5 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-500 shadow-2xl">
               <Plus size={48} className="transition-transform group-hover:rotate-90 duration-500" />
             </div>
             <div className="text-center">
                <span className="font-bold uppercase tracking-[0.2em] text-[10px] block mb-1">Create New Service</span>
                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-widest text-center">Expand your professional portfolio</span>
             </div>
          </motion.button>
        </AnimatePresence>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingService ? 'Edit Service' : 'Create New Service'}
      >
        <ServiceForm 
          initialData={editingService} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={serviceToDelete?.title}
        message="This professional service offering and its technical specifications will be permanently removed from the system."
      />
    </div>
  );
}
