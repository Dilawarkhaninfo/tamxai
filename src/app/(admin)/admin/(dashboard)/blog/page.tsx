"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Clock,
  X,
  Check,
  ImageIcon,
  Type,
  Layout,
  ExternalLink,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/admin/Toast';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-ai-2024',
    title: 'The Future of AI Architecture in 2024',
    category: 'AI & Machine Learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    author: 'Ahmed Abdullah',
    date: 'April 20, 2024',
    readTime: '6 min read',
    excerpt: 'Exploring how neural radiance fields and transformer models are evolving to reshape digital product design.',
    content: '<p>Long content here...</p>',
    featured: true
  },
  {
    id: '2',
    slug: 'scaling-enterprises',
    title: 'Scaling Enterprises with Intelligent Automation',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    author: 'Talha Yaseen',
    date: 'April 15, 2024',
    readTime: '4 min read',
    excerpt: 'A deep dive into how TAMx helps businesses transition from legacy systems to cloud-native AI infrastructures.',
    content: '<p>Long content here...</p>',
    featured: false
  }
];

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'AI Software Development',
    author: 'Ahmed Abdullah',
    image: '',
    excerpt: '',
    content: '',
    featured: false
  });

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData({ 
        title: post.title, 
        slug: post.slug, 
        category: post.category, 
        author: post.author,
        image: post.image,
        excerpt: post.excerpt,
        content: post.content,
        featured: !!post.featured
      });
    } else {
      setEditingPost(null);
      setFormData({ 
        title: '', 
        slug: '', 
        category: 'AI Software Development', 
        author: 'Ahmed Abdullah',
        image: '',
        excerpt: '',
        content: '',
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      showToast('Title and Slug are required', 'error');
      return;
    }

    const postData = {
      ...formData,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read' // Simplified for now
    };

    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...postData } : p));
      showToast('Blog post updated', 'success');
    } else {
      const newPost = {
        id: Math.random().toString(36).substr(2, 9),
        ...postData
      };
      setPosts([newPost, ...posts]);
      showToast('New blog post published', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this post permanently?')) {
      setPosts(posts.filter(p => p.id !== id));
      showToast('Post deleted', 'success');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              <FileText size={22} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Blog <span className="text-slate-500">Editor</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest opacity-60">Manage your thought leadership and industry insights.</p>
        </div>

        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl text-xs font-black shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-white group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          Write Post
        </button>
      </div>

      {/* Search & Filters */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-400 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search articles by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#090E1A] border border-white/5 rounded-3xl pl-12 pr-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-bold transition-all placeholder:text-slate-600 shadow-inner"
        />
      </div>

      {/* Post List (Table-like but modded) */}
      <div className="overflow-hidden border border-white/5 rounded-[2.5rem] bg-[#090E1A] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
             <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                   <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Article Details</th>
                   <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest hidden md:table-cell">Metrics</th>
                   <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest hidden lg:table-cell">Status</th>
                   <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.01] group transition-colors">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover:border-orange-500/30 transition-colors">
                              <img src={post.image} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-black text-white hover:text-orange-400 transition-colors cursor-pointer">{post.title}</h4>
                                {post.featured && <Star size={12} className="text-orange-400 fill-orange-400" />}
                              </div>
                              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                 <span className="text-orange-500/80">{post.category}</span>
                                 <span className="w-1 h-1 rounded-full bg-slate-800" />
                                 <span>{post.date}</span>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6 hidden md:table-cell">
                        <div className="space-y-1">
                           <div className="flex items-center gap-2 text-[10px] font-black text-white tracking-widest uppercase">
                              <User size={12} className="text-slate-600" />
                              {post.author}
                           </div>
                           <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 tracking-widest uppercase">
                              <Clock size={12} className="text-slate-700" />
                              {post.readTime}
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6 hidden lg:table-cell">
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-500/20">
                           Published
                        </span>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                           <button 
                             onClick={() => handleOpenModal(post)}
                             className="p-3 bg-white/5 hover:bg-orange-500/10 border border-white/5 hover:border-orange-500/30 rounded-xl text-slate-500 hover:text-orange-400 transition-all"
                           >
                              <Edit3 size={16} />
                           </button>
                           <button 
                              onClick={() => handleDelete(post.id)}
                              className="p-3 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 rounded-xl text-slate-700 hover:text-red-400 transition-all"
                           >
                              <Trash2 size={16} />
                           </button>
                        </div>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center text-slate-600 font-bold uppercase tracking-[0.2em] text-xs">
            No articles found matching your criteria.
          </div>
        )}
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
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-6xl bg-[#0D121F] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingPost ? 'Update' : 'Compose'} <span className="text-slate-500">Masterpiece</span>
                </h2>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 px-4 py-2 bg-black border border-white/10 rounded-full">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Featured</span>
                      <button 
                        onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                        className={`w-10 h-5 rounded-full relative transition-all ${formData.featured ? 'bg-orange-500' : 'bg-white/5'}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.featured ? 'right-1' : 'left-1'}`} />
                      </button>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <form onSubmit={handleSave} className="space-y-10">
                   {/* Row 1: Title & Slug */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Article Title</label>
                        <div className="relative">
                          <Type className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                          <input 
                            type="text" 
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-black transition-all"
                            placeholder="Designing the Future..."
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">URL Slug</label>
                        <div className="relative">
                          <Layout className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                          <input 
                            type="text" 
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-400 font-mono transition-all"
                            placeholder="future-of-ai"
                          />
                        </div>
                      </div>
                   </div>

                   {/* Row 2: Category & Author & Image */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Category</label>
                        <select 
                           value={formData.category}
                           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                           className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-bold transition-all appearance-none"
                        >
                           <option>AI Software Development</option>
                           <option>Engineering</option>
                           <option>Digital Marketing</option>
                           <option>Business Strategy</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Author</label>
                        <input 
                           type="text" 
                           value={formData.author}
                           onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                           className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-bold transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Cover Image URL</label>
                        <div className="relative">
                          <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                          <input 
                            type="text" 
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-bold transition-all placeholder:text-slate-800"
                            placeholder="https://unsplash..."
                          />
                        </div>
                      </div>
                   </div>

                   {/* Row 3: Excerpt */}
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Short Excerpt (SEO)</label>
                      <textarea 
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 h-24 text-slate-400 font-medium leading-relaxed transition-all resize-none"
                        placeholder="Explain the article in 160 characters..."
                      />
                   </div>

                   {/* Row 4: Main Content */}
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Article Content (HTML/Markdown Support)</label>
                      <div className="border border-white/10 rounded-[2rem] overflow-hidden bg-black">
                         <div className="flex items-center gap-2 p-2 bg-white/5 border-b border-white/5">
                            {['B', 'I', 'H1', 'H2', 'Link', 'Image'].map(btn => (
                              <button key={btn} type="button" className="px-3 py-1.5 hover:bg-white/10 rounded-lg text-[9px] font-black text-slate-500 transition-colors">{btn}</button>
                            ))}
                         </div>
                         <textarea 
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full h-[400px] bg-transparent p-8 text-sm focus:outline-none text-slate-400 font-mono leading-relaxed transition-all resize-none"
                            placeholder="<p>Start your story here...</p>"
                         />
                      </div>
                   </div>
                </form>
              </div>

              <div className="p-8 border-t border-white/5 bg-white/[0.02] flex gap-4 shrink-0">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-700 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Preview
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-2 px-20 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-[0.3em] shadow-xl shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <Check size={18} />
                  {editingPost ? 'Update Publication' : 'Launch Post'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
