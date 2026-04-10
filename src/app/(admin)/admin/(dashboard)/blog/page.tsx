"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  ExternalLink,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/admin/Modal';
import { BlogForm } from '@/components/admin/BlogForm';
import { useToast } from '@/components/admin/Toast';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';

// --- Blog Post Interface ---
interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'archived' | 'scheduled';
  date: string;
}

const mockBlogs: BlogPost[] = [
  { id: '1', title: 'The Future of AI in B2B', author: 'Ahmed Malik', category: 'Technology', status: 'published', date: '2024-03-10' },
  { id: '2', title: 'Optimizing Cloud Performance', author: 'Sarah Wilson', category: 'Cloud', status: 'published', date: '2024-03-08' },
  { id: '3', title: 'UX Design Systems for 2024', author: 'Alex Chen', category: 'Design', status: 'draft', date: '2024-03-05' },
  { id: '4', title: 'Scaling Your SaaS Business', author: 'Ahmed Malik', category: 'Business', status: 'archived', date: '2024-03-02' },
  { id: '5', title: 'Modern DevSecOps Practices', author: 'Ahmed Malik', category: 'Security', status: 'scheduled', date: '2024-03-15' },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const { showToast } = useToast();

  const filteredBlogs = blogs.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingPost) {
      setBlogs(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...data, title: data.title || p.title } : p));
      showToast('Article updated successfully', 'success');
    } else {
      const newBlog: BlogPost = {
        id: (blogs.length + 1).toString(),
        title: data.title || 'Untitled Article',
        author: data.author || 'Ahmed Malik',
        category: data.category || 'Uncategorized',
        status: data.status || 'draft',
        date: new Date().toISOString().split('T')[0],
        ...data
      };
      setBlogs(prev => [newBlog, ...prev]);
      showToast('Article published successfully', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (post: BlogPost) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      setBlogs(prev => prev.filter(p => p.id !== postToDelete.id));
      showToast('Article deleted successfully', 'error');
      setPostToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
               <FileText size={20} />
             </div>
             <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">Blog CMS <span className="text-blue-500">TAMx</span></h1>
          </div>
          <p className="text-slate-400 text-sm">Orchestrate your content engine with precision and style.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all self-start md:self-auto text-white"
        >
          <Plus size={18} />
          Create New Post
        </button>
      </div>

      {/* Blog Table Container */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#010205]/30">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search articles by title or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-600"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest">
             <Filter size={14} />
             Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-slate-500 font-black border-b border-white/10">
                <th className="px-6 py-4">Article Content</th>
                <th className="px-6 py-4">Author Info</th>
                <th className="px-6 py-4">Classification</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredBlogs.map((post) => (
                  <motion.tr 
                    key={post.id} 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                         <div className="w-20 h-12 rounded-lg bg-black border border-white/10 overflow-hidden flex-shrink-0 group-hover:border-blue-500/40 transition-colors">
                            <div className="w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent flex items-center justify-center">
                               <ImageIcon size={16} className="text-slate-700 group-hover:text-blue-400 transition-colors" />
                            </div>
                         </div>
                         <div className="max-w-[300px]">
                           <p className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-1">{post.title}</p>
                           <p className="text-[9px] text-slate-500 font-mono mt-0.5 uppercase tracking-widest">Modified: {post.date}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-[10px] font-black text-white">
                           {post.author.charAt(0)}
                         </div>
                         <span className="text-xs text-slate-300 font-bold uppercase tracking-tighter">{post.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-500 uppercase tracking-widest">{post.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                        post.status === 'published' ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" :
                        post.status === 'draft' ? "bg-amber-500/5 text-amber-400 border-amber-500/20" :
                        post.status === 'scheduled' ? "bg-blue-500/5 text-blue-400 border-blue-500/20" :
                        "bg-slate-500/5 text-slate-400 border-slate-500/20"
                      )}>
                        <div className={cn(
                          "w-1 h-1 rounded-full",
                          post.status === 'published' ? "bg-emerald-400" :
                          post.status === 'draft' ? "bg-amber-400" : 
                          post.status === 'scheduled' ? "bg-blue-400" : "bg-slate-400"
                        )} />
                        {post.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={() => handleEdit(post)}
                           className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                         >
                           <Edit2 size={16} />
                         </button>
                         <button 
                           onClick={() => handleDelete(post)}
                           className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                         >
                           <Trash2 size={16} />
                         </button>
                         <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/5 rounded-lg transition-all">
                           <ExternalLink size={16} />
                         </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {/* Professional Minimal Pagination */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between bg-[#010205]/30">
           <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Displaying <span className="text-white">{filteredBlogs.length}</span> articles</p>
           <div className="flex items-center gap-4">
              <button disabled className="text-slate-700 transition-colors cursor-not-allowed">
                 <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1">
                 {[1, 2, 3].map(i => (
                   <div key={i} className={cn("w-6 h-0.5 rounded-full transition-all duration-500", i === 1 ? "bg-blue-500" : "bg-white/10")} />
                 ))}
              </div>
              <button className="text-slate-500 hover:text-blue-400 transition-colors">
                 <ChevronRight size={18} />
              </button>
           </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingPost ? 'Edit Blog Publication' : 'New Blog Publication'}
      >
        <BlogForm 
          initialData={editingPost} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={postToDelete?.title}
        message="This article and all its content will be permanently removed from the publication database."
      />
    </div>
  );
}
