"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, Plus, Trash2, Edit2, Save, X, Star, CheckCircle2
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { ToastContainer } from '@/components/admin/Toast';
import { Modal } from '@/components/admin/Modal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { upsertPlan, deletePlan } from '@/app/_actions/pricing';
import type { PricingPlan } from '@/lib/supabase/types';

interface Props {
  initialPlans: PricingPlan[];
}

interface FeatureItem { label: string; position: number }

interface FormState {
  id?: string;
  plan_name: string;
  description: string;
  price: string;
  button_text: string;
  is_popular: boolean;
  is_active: boolean;
  features: FeatureItem[];
}

const defaultForm = (): FormState => ({
  plan_name: '',
  description: '',
  price: '',
  button_text: 'Get Started',
  is_popular: false,
  is_active: true,
  features: [],
});

export function PricingAdminClient({ initialPlans }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PricingPlan | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm());
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');

  function openCreate() {
    setForm(defaultForm());
    setModalOpen(true);
  }

  function openEdit(plan: PricingPlan) {
    setForm({
      id: plan.id,
      plan_name: plan.plan_name,
      description: plan.description,
      price: plan.price,
      button_text: plan.button_text,
      is_popular: plan.is_popular,
      is_active: plan.is_active,
      features: (plan.plan_features ?? []).map((f) => ({ label: f.label, position: f.position })),
    });
    setModalOpen(true);
  }

  function addFeature() {
    if (!newFeature.trim()) return;
    setForm((f) => ({
      ...f,
      features: [...f.features, { label: newFeature.trim(), position: f.features.length }],
    }));
    setNewFeature('');
  }

  function removeFeature(idx: number) {
    setForm((f) => ({
      ...f,
      features: f.features.filter((_, i) => i !== idx).map((feat, i) => ({ ...feat, position: i })),
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const result = await upsertPlan(form);
    setSaving(false);
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast(form.id ? 'Plan updated' : 'Plan created', 'success');
    setModalOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deletePlan(deleteTarget.id, deleteTarget.plan_name);
    if (result.error) { showToast(result.error, 'error'); return; }
    setPlans((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    showToast('Plan deleted', 'success');
    setDeleteTarget(null);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-purple-600/10 text-purple-400">
              <DollarSign size={20} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Pricing Plans</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">
            Pricing Tiers — {plans.length} plans
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={16} /> New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence initial={false}>
          {plans.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">
              No plans configured
            </div>
          ) : (
            plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                className={`relative bg-[#090E1A] border rounded-3xl p-6 space-y-5 transition-colors ${plan.is_popular ? 'border-purple-500/40 shadow-lg shadow-purple-600/10' : 'border-white/5 hover:border-purple-500/20'}`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg">
                    <Star size={10} className="fill-white text-white" />
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Most Popular</span>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-black text-white uppercase tracking-tight">{plan.plan_name}</h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{plan.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shrink-0 ${plan.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                    {plan.is_active ? 'Active' : 'Off'}
                  </span>
                </div>

                <div>
                  <span className="text-3xl font-black text-white">
                    {plan.price.toLowerCase() === 'custom' ? 'Custom' : `$${plan.price}`}
                  </span>
                  {plan.price.toLowerCase() !== 'custom' && (
                    <span className="text-xs text-slate-500 ml-1">/{plan.billing_cycle ?? 'mo'}</span>
                  )}
                </div>

                {plan.plan_features && plan.plan_features.length > 0 && (
                  <ul className="space-y-2">
                    {plan.plan_features.slice(0, 5).map((feat) => (
                      <li key={feat.id} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <CheckCircle2 size={13} className="text-purple-400 shrink-0" />
                        {feat.label}
                      </li>
                    ))}
                    {plan.plan_features.length > 5 && (
                      <li className="text-[10px] text-slate-600 pl-5">+{plan.plan_features.length - 5} more features</li>
                    )}
                  </ul>
                )}

                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => openEdit(plan)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 rounded-xl text-[10px] font-black text-slate-400 hover:text-purple-400 hover:bg-purple-500/5 transition-all uppercase tracking-widest"
                  >
                    <Edit2 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(plan)}
                    className="p-2.5 bg-white/5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={form.id ? 'Edit Plan' : 'New Plan'}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Plan Name</label>
              <input
                value={form.plan_name}
                onChange={(e) => setForm((f) => ({ ...f, plan_name: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Starter / Pro / Enterprise"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Price</label>
              <input
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm font-mono text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="49"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Button Text</label>
              <input
                value={form.button_text}
                onChange={(e) => setForm((f) => ({ ...f, button_text: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Get Started"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
                placeholder="Short plan description..."
                required
              />
            </div>

            {/* Toggles */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, is_popular: !f.is_popular }))}
                  className={`relative w-12 h-6 rounded-full border transition-all ${form.is_popular ? 'bg-purple-600 border-purple-500' : 'bg-[#010205] border-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_popular ? 'left-[26px]' : 'left-0.5'}`} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Most Popular</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, is_active: !f.is_active }))}
                  className={`relative w-12 h-6 rounded-full border transition-all ${form.is_active ? 'bg-emerald-600 border-emerald-500' : 'bg-[#010205] border-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_active ? 'left-[26px]' : 'left-0.5'}`} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active</span>
              </label>
            </div>

            {/* Features */}
            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Features</label>
              <div className="flex gap-2">
                <input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className="flex-1 bg-[#010205] border border-white/5 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                  placeholder="Add feature..."
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-3 bg-purple-600/20 border border-purple-500/20 rounded-2xl text-purple-400 hover:bg-purple-600/30 transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {form.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl">
                    <CheckCircle2 size={13} className="text-purple-400 shrink-0" />
                    <span className="text-xs text-slate-300 flex-1">{feat.label}</span>
                    <button type="button" onClick={() => removeFeature(idx)} className="text-slate-600 hover:text-red-400 transition-colors">
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/5">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-all disabled:opacity-50">
              <Save size={15} />
              {saving ? 'Saving...' : form.id ? 'Update Plan' : 'Create Plan'}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.plan_name}
        message="This will permanently remove this pricing plan."
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
