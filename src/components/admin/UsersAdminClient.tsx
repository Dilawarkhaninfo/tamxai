"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Search, Trash2, Edit2, Save,
  ShieldCheck, Shield, Eye, UserX, UserCheck, Clock
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { ToastContainer } from '@/components/admin/Toast';
import { Modal } from '@/components/admin/Modal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { inviteUser, updateUserRole, updateUserStatus, deleteUser } from '@/app/_actions/users';
import type { Profile, UserRole, UserStatus } from '@/lib/supabase/types';

interface Props {
  initialUsers: Profile[];
}

interface InviteFormState {
  email: string;
  full_name: string;
  role: UserRole;
  password: string;
}

const defaultInviteForm = (): InviteFormState => ({
  email: '',
  full_name: '',
  role: 'viewer',
  password: '',
});

const ROLE_STYLES: Record<UserRole, string> = {
  admin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  editor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  viewer: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  admin: <ShieldCheck size={12} />,
  editor: <Shield size={12} />,
  viewer: <Eye size={12} />,
};

const STATUS_STYLES: Record<UserStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  suspended: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function UsersAdminClient({ initialUsers }: Props) {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [users, setUsers] = useState<Profile[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
  const [inviteForm, setInviteForm] = useState<InviteFormState>(defaultInviteForm());
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const result = await inviteUser(inviteForm);
    setSaving(false);
    if (result.error) { showToast(result.error, 'error'); return; }
    showToast(`User ${inviteForm.email} invited successfully`, 'success');
    setInviteOpen(false);
    setInviteForm(defaultInviteForm());
    router.refresh();
  }

  async function handleRoleChange(user: Profile, role: UserRole) {
    setUpdatingId(user.id);
    const result = await updateUserRole(user.id, role);
    setUpdatingId(null);
    if (result.error) { showToast(result.error, 'error'); return; }
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, role } : u));
    showToast(`Role updated to ${role}`, 'success');
    router.refresh();
  }

  async function handleStatusChange(user: Profile, status: UserStatus) {
    setUpdatingId(user.id);
    const result = await updateUserStatus(user.id, status);
    setUpdatingId(null);
    if (result.error) { showToast(result.error, 'error'); return; }
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, status } : u));
    showToast(`Status updated to ${status}`, 'success');
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const result = await deleteUser(deleteTarget.id, deleteTarget.email);
    if (result.error) { showToast(result.error, 'error'); return; }
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    showToast('User deleted', 'success');
    setDeleteTarget(null);
    router.refresh();
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: '2-digit' });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-purple-600/10 text-purple-400">
              <Users size={20} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Users</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] ml-11">
            Access Control — {users.length} accounts
          </p>
        </div>
        <button
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={16} /> Invite User
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-[#090E1A] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">User</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Role</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Last Login</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Joined</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-600 text-sm font-bold uppercase tracking-widest">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-sm font-black text-purple-400 shrink-0">
                            {user.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{user.full_name}</p>
                            <p className="text-[10px] text-slate-500 font-mono">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user, e.target.value as UserRole)}
                          disabled={updatingId === user.id}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border appearance-none cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-purple-500/30 ${ROLE_STYLES[user.role]} bg-transparent`}
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user, e.target.value as UserStatus)}
                          disabled={updatingId === user.id}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border appearance-none cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-purple-500/30 ${STATUS_STYLES[user.status]} bg-transparent`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock size={12} />
                          {formatDate(user.last_login_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">{formatDate(user.created_at)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setDeleteTarget(user)}
                            className="p-2 rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/5 transition-all"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      <Modal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite User">
        <form onSubmit={handleInvite} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Email Address</label>
              <input
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="user@example.com"
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Full Name</label>
              <input
                value={inviteForm.full_name}
                onChange={(e) => setInviteForm((f) => ({ ...f, full_name: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Full name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Role</label>
              <div className="flex gap-2">
                {(['admin', 'editor', 'viewer'] as UserRole[]).map((r) => (
                  <label key={r} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="user-role"
                      value={r}
                      checked={inviteForm.role === r}
                      onChange={() => setInviteForm((f) => ({ ...f, role: r }))}
                      className="sr-only"
                    />
                    <div className={`flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-black uppercase tracking-widest border rounded-xl transition-all ${inviteForm.role === r ? 'bg-purple-600/10 border-purple-500/50 text-purple-400' : 'bg-[#010205] border-white/5 text-slate-500 hover:bg-white/5'}`}>
                      {ROLE_ICONS[r]}
                      {r}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Initial Password</label>
              <input
                type="password"
                value={inviteForm.password}
                onChange={(e) => setInviteForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full bg-[#010205] border border-white/5 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="Secure password"
                minLength={8}
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/5">
            <button type="button" onClick={() => setInviteOpen(false)} className="px-6 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-all disabled:opacity-50">
              <UserCheck size={15} />
              {saving ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.email}
        message="This will permanently delete this user account and all associated data."
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
