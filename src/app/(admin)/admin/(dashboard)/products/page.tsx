"use client";

import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  LayoutGrid, 
  ExternalLink,
  ShoppingCart,
  GraduationCap,
  Layout,
  Layers,
  ArrowRight,
  X,
  Check,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/admin/Toast';

interface ProductItem {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  href: string;
  desc: string;
}

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    title: 'Ecommerce',
    icon: 'ShoppingCart',
    href: '/product/ecommerce',
    desc: 'Full-featured ecommerce platform with inventory management, payments, and analytics.',
  },
  {
    id: '2',
    title: 'LMS',
    icon: 'GraduationCap',
    href: '/lms',
    desc: 'Learning management system with E-Courses, assessments, and progress tracking.',
  },
  {
    id: '3',
    title: 'CRM',
    icon: 'LayoutGrid',
    href: '/product',
    desc: 'Customer relationship management system to streamline your sales and support.',
  },
];

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    icon: 'ShoppingCart',
    href: '/product',
    desc: ''
  });

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (product?: ProductItem) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ 
        title: product.title, 
        icon: product.icon, 
        href: product.href, 
        desc: product.desc 
      });
    } else {
      setEditingProduct(null);
      setFormData({ title: '', icon: 'ShoppingCart', href: '/product', desc: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.desc) {
      showToast('Title and Description are required', 'error');
      return;
    }

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
      showToast('Product updated successfully', 'success');
    } else {
      const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setProducts([...products, newProduct]);
      showToast('New product added to catalog', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Permanently remove this product?')) {
      setProducts(products.filter(p => p.id !== id));
      showToast('Product removed', 'success');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <Layers size={22} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Product <span className="text-slate-500">Suite</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest opacity-60">Manage your SaaS platforms and digital ecosystems.</p>
        </div>

        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl text-xs font-black shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all uppercase tracking-[0.2em] text-white group"
        >
          <Plus size={18} className="group-hover:rotate-180 transition-transform duration-500" />
          Add Product
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-[#090E1A] border border-white/5 rounded-[2.5rem] p-8 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden h-full flex flex-col"
            >
               <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 border border-white/5 group-hover:scale-110 transition-transform">
                     <ShoppingCart size={24} />
                  </div>
                  <div className="flex gap-2">
                     <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-3 bg-white/5 hover:bg-cyan-500/10 rounded-xl text-slate-500 hover:text-cyan-400 transition-all"
                     >
                        <Edit3 size={14} />
                     </button>
                     <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-3 bg-white/5 hover:bg-red-500/10 rounded-xl text-slate-700 hover:text-red-400 transition-all"
                     >
                        <Trash2 size={14} />
                     </button>
                  </div>
               </div>

               <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">{product.title}</h3>
               <p className="text-slate-400 text-xs font-medium leading-relaxed opacity-70 mb-8">{product.desc}</p>
               
               <div className="mt-auto flex items-center justify-between">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{product.href}</div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-600 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all">
                     <ExternalLink size={14} />
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#0D121F] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingProduct ? 'Edit' : 'New'} <span className="text-slate-500">Product</span>
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Product Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white font-black transition-all"
                    placeholder="e.g. Nexus Core"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Icon Type</label>
                     <select 
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white font-bold transition-all appearance-none"
                     >
                        <option>ShoppingCart</option>
                        <option>GraduationCap</option>
                        <option>LayoutGrid</option>
                        <option>Zap</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Internal Route</label>
                     <input 
                        type="text" 
                        value={formData.href}
                        onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-400 font-mono transition-all"
                     />
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Description</label>
                  <textarea 
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 h-32 text-slate-400 font-medium leading-relaxed transition-all resize-none"
                    placeholder="What does this product do?"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-slate-600 uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl text-[11px] font-black text-white uppercase tracking-[0.3em] shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                  >
                    <Check size={18} />
                    {editingProduct ? 'Update Product' : 'Register Product'}
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
