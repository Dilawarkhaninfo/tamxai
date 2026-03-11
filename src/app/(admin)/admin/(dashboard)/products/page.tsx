"use client";

import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  ShoppingCart,
  Edit2,
  Trash2,
  Tag,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Boxes
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/admin/Modal';
import { ProductForm } from '@/components/admin/ProductForm';
import { useToast } from '@/components/admin/Toast';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';

const mockProducts = [
  { id: '1', name: 'TAMx Core ERP', category: 'Software', price: '$12,000', sales: 45, status: 'Active' },
  { id: '2', name: 'AI Vision API', category: 'API', price: '$299/mo', sales: 128, status: 'Active' },
  { id: '3', name: 'Cyber Sentinel', category: 'Security', price: '$1,500', sales: 32, status: 'Active' },
  { id: '4', name: 'Aether Engine', category: 'Engine', price: '$5,000', sales: 12, status: 'Draft' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any | null>(null);
  const { showToast } = useToast();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...data } : p));
      showToast('Product updated successfully', 'success');
    } else {
      const newProduct = {
        id: (products.length + 1).toString(),
        name: data.name || 'New Product',
        category: data.category || 'General',
        price: data.price || '$0',
        sales: 0,
        status: 'Active',
        ...data
      };
      setProducts(prev => [newProduct, ...prev]);
      showToast('Product added to catalog', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (product: any) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      showToast('Product removed from catalog', 'error');
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
               <Package size={20} />
             </div>
             <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">Inventory <span className="text-emerald-500">CMS</span></h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">Manage your digital assets and monetization pipelines.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-white"
        >
          <Plus size={18} />
          New Product
        </button>
      </div>

      {/* Stats Mini Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Sales', value: '$84,200', trend: '+12%', icon: TrendingUp, color: 'emerald' },
           { label: 'Active Licenses', value: '254', trend: '+5%', icon: Boxes, color: 'blue' },
           { label: 'Avg. Order', value: '$1,240', trend: '-2%', icon: ShoppingCart, color: 'purple' },
         ].map((stat, idx) => (
           <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/[0.08] transition-all">
              <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                 <p className="text-xl font-black text-white uppercase tracking-tight">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                 <stat.icon size={20} />
              </div>
           </div>
         ))}
      </div>

      {/* Product Table Container */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#010205]/30">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by product name or SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
                <Filter size={18} />
             </button>
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                Export CSV
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-slate-500 font-black border-b border-white/10">
                <th className="px-6 py-4">Product Identifier</th>
                <th className="px-6 py-4 text-center">Catalog</th>
                <th className="px-6 py-4">Monetization</th>
                <th className="px-6 py-4">Velocity</th>
                <th className="px-6 py-4 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-emerald-400 shadow-inner group-hover:border-emerald-500/30 transition-colors">
                            <Package size={18} />
                         </div>
                         <div>
                            <p className="font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{product.name}</p>
                            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em]">SKU: {`TMX-PROD-${product.id.padStart(3, '0')}`}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-[10px] font-black px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 uppercase tracking-widest">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-white font-mono group-hover:text-emerald-400 transition-colors">{product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="flex-1 max-w-[80px] h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(product.sales / 150) * 100}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" 
                            />
                         </div>
                         <span className="text-[10px] font-black text-slate-500 font-mono">{product.sales}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={() => handleEdit(product)}
                           className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                         >
                           <Edit2 size={16} />
                         </button>
                         <button 
                           onClick={() => handleDelete(product)}
                           className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                         >
                           <Trash2 size={16} />
                         </button>
                         <button className="p-2 text-slate-500 hover:text-emerald-400 hover:bg-emerald-400/5 rounded-lg transition-all">
                           <ArrowUpRight size={16} />
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingProduct ? 'Configure Product Engine' : 'Initialize New Product'}
      >
        <ProductForm 
          initialData={editingProduct} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={productToDelete?.name}
        message="This product unit will be decommissioned and removed from the active inventory catalog."
      />
    </div>
  );
}
