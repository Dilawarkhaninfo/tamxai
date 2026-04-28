"use client";

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  UserPlus,
  Image as ImageIcon,
  Check,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/admin/Toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const INITIAL_TEAM: TeamMember[] = [
  { id: '1', name: 'Ahmed Abdullah', role: 'Founder & CEO', image: '/images/AhmedAbdullah.jpeg' },
  { id: '2', name: 'Talha Yaseen', role: 'CTO', image: '/images/talha.png' },
  { id: '3', name: 'Taha Khan', role: 'CMO', image: '/images/Taha.png' },
  { id: '4', name: 'Hunain Ahmed', role: 'Software Engineer', image: '/images/HunainAhmed.png' },
];

export default function TeamManagementPage() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_TEAM);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: ''
  });

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({ name: member.name, role: member.role, image: member.image });
    } else {
      setEditingMember(null);
      setFormData({ name: '', role: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      showToast('Name and Role are required', 'error');
      return;
    }

    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } : m));
      showToast('Member updated successfully', 'success');
    } else {
      const newMember = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setMembers([...members, newMember]);
      showToast('Member added successfully', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      setMembers(members.filter(m => m.id !== id));
      showToast('Member removed from team', 'success');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <Users size={22} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Team <span className="text-slate-500">Management</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest opacity-60">Manage your core team members and their public visibility.</p>
        </div>

        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-white group"
        >
          <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
          Add Member
        </button>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#090E1A] border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white font-bold transition-all placeholder:text-slate-600 shadow-inner"
          />
        </div>
        <div className="bg-[#090E1A] border border-white/5 rounded-2xl p-4 flex items-center justify-between px-8 shadow-inner">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Members</span>
           <span className="text-2xl font-black text-white">{members.length}</span>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-[#090E1A] border border-white/5 rounded-[2.5rem] p-6 hover:border-purple-500/30 transition-all duration-500 shadow-xl relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/5 blur-[50px] group-hover:bg-purple-500/10 transition-all duration-700" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 border-2 border-white/5 relative">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <Users size={32} />
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tighter">{member.name}</h3>
                <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">{member.role}</p>

                <div className="flex items-center gap-3 w-full mt-2">
                  <button 
                    onClick={() => handleOpenModal(member)}
                    className="flex-1 py-3 bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 rounded-xl text-[10px] font-black text-slate-400 hover:text-purple-400 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Edit2 size={12} />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)}
                    className="p-3 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 rounded-xl text-slate-600 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="col-span-full py-20 text-center bg-[#090E1A]/50 border-2 border-dashed border-white/5 rounded-[3rem]">
            <Users className="w-16 h-16 text-slate-800 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-600 uppercase tracking-widest">No members found</h3>
            <p className="text-slate-700 text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0D121F] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingMember ? 'Edit' : 'Add New'} <span className="text-slate-500">Member</span>
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white font-bold transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Professional Role</label>
                  <input 
                    type="text" 
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white font-bold transition-all"
                    placeholder="e.g. Lead Designer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Image URL / Path</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                    <input 
                      type="text" 
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white font-mono transition-all"
                      placeholder="/images/member.png"
                    />
                  </div>
                  <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold ml-1">Example: /images/team/member-name.png</p>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    <Check size={18} />
                    {editingMember ? 'Update Profile' : 'Save Member'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
