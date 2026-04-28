"use client";

import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  DollarSign, 
  ListChecks,
  PlusCircle,
  X,
  Check,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/admin/Toast';

interface PricingPlan {
  id: string;
  planName: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const INITIAL_PLANS: PricingPlan[] = [
  {
    id: '1',
    planName: 'Starter',
    description: 'Perfect for small projects and initial AI exploration.',
    price: '129',
    features: ['Access to basic AI models', 'Up to 10,000 requests/mo', 'Community support', 'Standard response time'],
    buttonText: 'Get Started',
    isPopular: false
  },
  {
    id: '2',
    planName: 'Business',
    description: 'Scaled intelligence for growing enterprises and teams.',
    price: '350',
    features: ['Advanced neural processing', 'Unlimited AI requests', 'Priority 24/7 support', 'Custom model fine-tuning', 'Advanced analytics dashboard'],
    buttonText: 'Scale Now',
    isPopular: true
  },
  {
    id: '3',
    planName: 'Enterprise',
    description: 'Custom-tailored solutions for global scale and precision.',
    price: 'Custom',
    features: ['Dedicated infrastructure', 'On-premise deployment', 'White-glove implementation', 'Full API access', 'SLA guarantees'],
    buttonText: 'Contact Sales',
    isPopular: false
  }
];

export default function PricingManagementPage() {
  const [plans, setPlans] = useState<PricingPlan[]>(INITIAL_PLANS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    planName: '',
    description: '',
    price: '',
    buttonText: '',
    isPopular: false,
    newFeature: ''
  });

  const [features, setFeatures] = useState<string[]>([]);

  const handleOpenModal = (plan?: PricingPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({ 
        planName: plan.planName, 
        description: plan.description, 
        price: plan.price, 
        buttonText: plan.buttonText, 
        isPopular: !!plan.isPopular,
        newFeature: ''
      });
      setFeatures([...plan.features]);
    } else {
      setEditingPlan(null);
      setFormData({ planName: '', description: '', price: '', buttonText: '', isPopular: false, newFeature: '' });
      setFeatures([]);
    }
    setIsModalOpen(true);
  };

  const handleAddFeature = () => {
    if (formData.newFeature.trim()) {
      setFeatures([...features, formData.newFeature.trim()]);
      setFormData({ ...formData, newFeature: '' });
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.planName || !formData.price) {
      showToast('Name and Price are required', 'error');
      return;
    }

    const planData = {
      planName: formData.planName,
      description: formData.description,
      price: formData.price,
      buttonText: formData.buttonText || 'Get Started',
      isPopular: formData.isPopular,
      features: features
    };

    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...planData } : p));
      showToast('Pricing plan updated', 'success');
    } else {
      const newPlan = {
        id: Math.random().toString(36).substr(2, 9),
        ...planData
      };
      setPlans([...plans, newPlan]);
      showToast('New pricing plan created', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this pricing plan? This cannot be undone.')) {
      setPlans(plans.filter(p => p.id !== id));
      showToast('Plan deleted', 'success');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <Briefcase size={22} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Pricing <span className="text-slate-500">Models</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest opacity-60">Architect your service tiers and value propositions.</p>
        </div>

        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-xs font-black shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-white group"
        >
          <PlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
          Create Plan
        </button>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative bg-[#090E1A] border ${plan.isPopular ? 'border-blue-500/30' : 'border-white/5'} rounded-[2.5rem] overflow-hidden group shadow-2xl transition-all duration-500`}
            >
              {plan.isPopular && (
                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-500 rounded-full text-[10px] font-black text-white uppercase tracking-widest animate-pulse">
                    <Star size={10} fill="currentColor" />
                    Popular
                  </div>
                </div>
              )}

              <div className="p-8 md:p-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{plan.planName}</h3>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                
                <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed max-w-md">{plan.description}</p>

                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-4xl font-black text-white">${plan.price}</span>
                  {plan.price.toLowerCase() !== 'custom' && <span className="text-slate-600 font-bold uppercase tracking-widest text-xs">/ month</span>}
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                    <ListChecks size={14} />
                    Tier Features
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                        <CheckCircle2 size={14} className="text-blue-500 mt-0.5 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => handleOpenModal(plan)}
                    className="flex-1 py-4 bg-white/5 hover:bg-blue-500/10 border border-white/5 hover:border-blue-500/30 rounded-2xl text-[10px] font-black text-slate-500 hover:text-blue-400 transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                  >
                    <Edit2 size={14} />
                    Modify Tier
                  </button>
                  <button 
                    onClick={() => handleDelete(plan.id)}
                    className="p-4 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 rounded-2xl text-slate-700 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-4xl bg-[#0D121F] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingPlan ? 'Edit' : 'New'} <span className="text-slate-500">Tier Configuration</span>
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Plan Name</label>
                      <input 
                        type="text" 
                        value={formData.planName}
                        onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-bold transition-all"
                        placeholder="e.g. Professional"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Pricing (USD)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                        <input 
                          type="text" 
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-black transition-all"
                          placeholder="299 or Custom"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Plan Pitch (Subtitle)</label>
                      <textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-32 text-slate-400 font-medium leading-relaxed transition-all"
                        placeholder="Describe the value of this tier..."
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black rounded-2xl border border-white/10">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Mark as Most Popular</span>
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, isPopular: !formData.isPopular })}
                        className={`w-12 h-6 rounded-full transition-all relative ${formData.isPopular ? 'bg-blue-500' : 'bg-white/5'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isPopular ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Add Feature</label>
                       <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={formData.newFeature}
                            onChange={(e) => setFormData({ ...formData, newFeature: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                            className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-medium transition-all"
                            placeholder="Type feature and press Enter"
                          />
                          <button 
                            type="button"
                            onClick={handleAddFeature}
                            className="p-4 bg-blue-600 rounded-2xl text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                          >
                            <Plus size={20} />
                          </button>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Feature List Preview</label>
                       <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                          {features.map((f, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl group/feat"
                            >
                              <span className="text-[11px] text-slate-300 font-bold">{f}</span>
                              <button 
                                onClick={() => handleRemoveFeature(i)}
                                className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover/feat:opacity-100"
                              >
                                <Trash2 size={12} />
                              </button>
                            </motion.div>
                          ))}
                          {features.length === 0 && (
                            <div className="text-center py-10 text-slate-700 text-[10px] font-black uppercase tracking-widest border border-dashed border-white/5 rounded-2xl">
                              No features added yet
                            </div>
                          )}
                       </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-8 border-t border-white/5 bg-white/[0.02] flex gap-4 shrink-0">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-700 uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Discard Changes
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-2 px-16 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-[0.3em] shadow-xl shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <Check size={18} />
                  {editingPlan ? 'Overwrite Tier' : 'Finalize Tier'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
