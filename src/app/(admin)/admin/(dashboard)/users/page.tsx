"use client";

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Shield, 
  Mail, 
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/admin/Modal';
import { UserForm } from '@/components/admin/UserForm';
import { useToast } from '@/components/admin/Toast';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';

const mockUsers = [
  { id: '1', name: 'Dilawar Khan', email: 'admin@tamx.ai', role: 'Admin', status: 'active', lastLogin: '2 mins ago' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@tamx.ai', role: 'Editor', status: 'active', lastLogin: '5 hours ago' },
  { id: '3', name: 'Alex Chen', email: 'alex@tamx.ai', role: 'Viewer', status: 'inactive', lastLogin: '3 days ago' },
  { id: '4', name: 'Michael Scott', email: 'm.scott@tamx.ai', role: 'Editor', status: 'suspended', lastLogin: '1 week ago' },
];

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any | null>(null);
  const { showToast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...data } : u));
      showToast('User permissions updated successfully', 'success');
    } else {
      const newUser = {
        id: (users.length + 1).toString(),
        name: data.name || 'New User',
        email: data.email || 'user@tamx.ai',
        role: data.role || 'Viewer',
        status: data.status || 'active',
        lastLogin: 'Never',
        ...data
      };
      setUsers(prev => [newUser, ...prev]);
      showToast('New user created successfully', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (user: any) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      showToast('User deleted successfully', 'error');
      setUserToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
               <Users size={20} />
             </div>
             <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">User <span className="text-indigo-500">Management</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">Manage administrative users, access levels, and security permissions.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={18} />
          Create User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
           <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#010205]/30">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#030712] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white placeholder:text-slate-700"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all">
                 <Filter size={14} />
                 Filter Role
              </button>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold border-b border-white/10">
                    <th className="px-6 py-5">Full Name & Email</th>
                    <th className="px-6 py-5 text-center">User Role</th>
                    <th className="px-6 py-5 text-center">Status</th>
                    <th className="px-6 py-5">Last Activity</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  <AnimatePresence mode="popLayout">
                    {filteredUsers.map((user) => (
                      <motion.tr 
                        key={user.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center text-white font-bold border border-white/5 group-hover:scale-105 transition-transform">
                                 {user.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="font-bold text-white uppercase tracking-tight text-sm group-hover:text-indigo-400 transition-colors">{user.name}</p>
                                 <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">{user.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                              <Shield size={14} className={cn(
                                user.role === 'Admin' ? 'text-purple-400' :
                                user.role === 'Editor' ? 'text-blue-400' : 'text-slate-400'
                              )} />
                              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{user.role}</span>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                           <div className={cn(
                             "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                             user.status === 'active' ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" : 
                             user.status === 'suspended' ? "bg-red-500/5 text-red-400 border-red-500/20" :
                             "bg-slate-500/5 text-slate-400 border-slate-500/20"
                           )}>
                             {user.status}
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{user.lastLogin}</span>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <div className="flex items-center justify-end gap-1 opacity-20 group-hover:opacity-100 transition-all">
                              <button
                                onClick={() => handleEdit(user)}
                                className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                              >
                                 <Edit2 size={16} />
                              </button>
                               <button
                                 onClick={() => handleDelete(user)}
                                 className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
                               >
                                 <Trash2 size={16} />
                              </button>
                           </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* Permissions Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { role: 'SYSTEM ADMINISTRATOR', desc: 'Complete access to all system protocols, configurations and security controls.', icon: ShieldAlert, color: 'purple' },
           { role: 'CONTENT EDITOR', desc: 'Permitted to manage projects, blog posts, and service catalog data.', icon: ShieldCheck, color: 'blue' },
           { role: 'SYSTEM VIEWER', desc: 'Authorized to view analytics and existing records without modification rights.', icon: UserCheck, color: 'slate' },
         ].map((p) => (
           <div key={p.role} className="p-8 bg-[#090E1A] border border-white/5 rounded-3xl hover:border-indigo-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4 relative z-10">
                 <div className="p-3 rounded-2xl bg-black border border-white/5 text-slate-400 group-hover:text-white transition-colors">
                    <p.icon size={24} />
                 </div>
                 <h4 className="font-bold text-white text-sm uppercase tracking-widest">{p.role}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium uppercase tracking-widest relative z-10 group-hover:text-slate-400 transition-colors">{p.desc}</p>
              
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/5 blur-[60px] pointer-events-none group-hover:bg-indigo-500/10 transition-all" />
           </div>
         ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingUser ? 'Edit User Permissions' : 'Create New User Account'}
      >
        <UserForm 
          initialData={editingUser} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={userToDelete?.name}
        message="This user account and all associated access privileges will be permanently revoked from the system."
      />
    </div>
  );
}
