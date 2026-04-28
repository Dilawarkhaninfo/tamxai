"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Settings, Save, Mail, Phone, MapPin, Linkedin,
  Instagram, Facebook, Twitter, Globe, Lock, Eye, EyeOff
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { ToastContainer } from '@/components/admin/Toast';
import { updateSettings, changePassword } from '@/app/_actions/settings';
import type { SiteSettings } from '@/lib/supabase/types';

const INPUT_CLASS = "w-full bg-[#030712] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all";

function SettingsField({ icon: Icon, label, value, onChange, type = 'text', placeholder }: {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={16} />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${INPUT_CLASS} pl-11`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

interface Props {
  initialSettings: SiteSettings | null;
}

interface SettingsFormState {
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  social_linkedin: string;
  social_instagram: string;
  social_facebook: string;
  social_twitter: string;
  meta_title: string;
  meta_description: string;
}

export function SettingsAdminClient({ initialSettings }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [form, setForm] = useState<SettingsFormState>({
    contact_email: initialSettings?.contact_email ?? '',
    contact_phone: initialSettings?.contact_phone ?? '',
    contact_address: initialSettings?.contact_address ?? '',
    social_linkedin: initialSettings?.social_linkedin ?? '',
    social_instagram: initialSettings?.social_instagram ?? '',
    social_facebook: initialSettings?.social_facebook ?? '',
    social_twitter: initialSettings?.social_twitter ?? '',
    meta_title: initialSettings?.meta_title ?? '',
    meta_description: initialSettings?.meta_description ?? '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'social' | 'seo' | 'security'>('contact');

  const TABS = [
    { id: 'contact' as const, label: 'Contact' },
    { id: 'social' as const, label: 'Social' },
    { id: 'seo' as const, label: 'SEO' },
    { id: 'security' as const, label: 'Security' },
  ];

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSavingSettings(true);
    const result = await updateSettings({
      contact_email: form.contact_email,
      contact_phone: form.contact_phone,
      contact_address: form.contact_address,
      social_linkedin: form.social_linkedin || undefined,
      social_instagram: form.social_instagram || undefined,
      social_facebook: form.social_facebook || undefined,
      social_twitter: form.social_twitter || undefined,
      meta_title: form.meta_title || undefined,
      meta_description: form.meta_description || undefined,
    });
    setSavingSettings(false);
    const r1 = result as any;
    if (r1.error) { showToast(r1.error, 'error'); return; }
    showToast('Settings saved successfully', 'success');
    router.refresh();
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }
    setSavingPassword(true);
    const result = await changePassword(newPassword);
    setSavingPassword(false);
    const r2 = result as any;
    if (r2.error) { showToast(r2.error, 'error'); return; }
    showToast('Password updated successfully', 'success');
    setNewPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-purple-600/10 text-purple-400">
          <Settings size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Site Settings</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
            System Configuration
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-[#090E1A] border border-white/5 rounded-2xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSaveSettings}>
        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#090E1A] border border-white/5 rounded-3xl p-8 space-y-6"
          >
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest mb-1">Contact Information</h2>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Public contact details displayed on the website</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SettingsField
                icon={Mail}
                label="Contact Email"
                value={form.contact_email}
                onChange={(v) => setForm((f) => ({ ...f, contact_email: v }))}
                type="email"
                placeholder="hello@tamx.ai"
              />
              <SettingsField
                icon={Phone}
                label="Contact Phone"
                value={form.contact_phone}
                onChange={(v) => setForm((f) => ({ ...f, contact_phone: v }))}
                placeholder="+61 400 000 000"
              />
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={16} />
                  <textarea
                    value={form.contact_address}
                    onChange={(e) => setForm((f) => ({ ...f, contact_address: e.target.value }))}
                    rows={2}
                    className={`${INPUT_CLASS} pl-11 resize-none`}
                    placeholder="123 Tech Street, Sydney NSW 2000"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#090E1A] border border-white/5 rounded-3xl p-8 space-y-6"
          >
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest mb-1">Social Media Links</h2>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Platform URLs for footer and contact sections</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SettingsField
                icon={Linkedin}
                label="LinkedIn"
                value={form.social_linkedin}
                onChange={(v) => setForm((f) => ({ ...f, social_linkedin: v }))}
                placeholder="https://linkedin.com/company/tamx"
              />
              <SettingsField
                icon={Instagram}
                label="Instagram"
                value={form.social_instagram}
                onChange={(v) => setForm((f) => ({ ...f, social_instagram: v }))}
                placeholder="https://instagram.com/tamxai"
              />
              <SettingsField
                icon={Facebook}
                label="Facebook"
                value={form.social_facebook}
                onChange={(v) => setForm((f) => ({ ...f, social_facebook: v }))}
                placeholder="https://facebook.com/tamxai"
              />
              <SettingsField
                icon={Twitter}
                label="X / Twitter"
                value={form.social_twitter}
                onChange={(v) => setForm((f) => ({ ...f, social_twitter: v }))}
                placeholder="https://x.com/tamxai"
              />
            </div>
          </motion.div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#090E1A] border border-white/5 rounded-3xl p-8 space-y-6"
          >
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest mb-1">SEO & Metadata</h2>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Default site meta tags for search engines</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Meta Title</label>
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={16} />
                  <input
                    value={form.meta_title}
                    onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))}
                    className={`${INPUT_CLASS} pl-11`}
                    placeholder="TAMx — AI-Powered Digital Solutions"
                    maxLength={60}
                  />
                </div>
                <p className="text-[10px] text-slate-600 ml-1">{form.meta_title.length}/60 chars</p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Meta Description</label>
                <textarea
                  value={form.meta_description}
                  onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
                  rows={3}
                  className={`${INPUT_CLASS} resize-none`}
                  placeholder="Transformative AI and digital solutions that drive real business outcomes..."
                  maxLength={160}
                />
                <p className="text-[10px] text-slate-600 ml-1">{form.meta_description.length}/160 chars</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Save Settings Button (for non-security tabs) */}
        {activeTab !== 'security' && (
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={savingSettings}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <Save size={15} />
              {savingSettings ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        )}
      </form>

      {/* Security Tab */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#090E1A] border border-white/5 rounded-3xl p-8 space-y-6"
        >
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-widest mb-1">Change Password</h2>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Update your admin account password</p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`${INPUT_CLASS} pl-11 pr-12`}
                  placeholder="Min. 8 characters"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${INPUT_CLASS} pl-11`}
                  placeholder="Repeat password"
                  required
                />
              </div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="text-[10px] text-red-400 font-bold ml-1">Passwords do not match</p>
              )}
            </div>

            {/* Password strength */}
            {newPassword && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Strength</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => {
                    const strength = newPassword.length >= 8 ? (
                      /[A-Z]/.test(newPassword) ? (/[0-9]/.test(newPassword) ? (/[^A-Za-z0-9]/.test(newPassword) ? 4 : 3) : 2) : 1
                    ) : 0;
                    return (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all ${level <= strength ? (strength >= 4 ? 'bg-emerald-500' : strength >= 3 ? 'bg-blue-500' : strength >= 2 ? 'bg-yellow-500' : 'bg-red-500') : 'bg-white/10'}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={savingPassword || !newPassword || newPassword !== confirmPassword}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock size={15} />
              {savingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </motion.div>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
