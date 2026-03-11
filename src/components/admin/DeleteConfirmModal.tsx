"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from './Modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
}

export function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion", 
  message = "This action is permanent and cannot be undone. Are you sure you want to proceed?",
  itemName
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center py-4">
        {/* Warning Icon with Pulse Animation */}
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-red-500/20 blur-[30px] rounded-full animate-pulse" />
           <div className="relative w-24 h-24 rounded-[2rem] bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 flex items-center justify-center text-red-500 shadow-2xl shadow-red-500/10">
              <Trash2 size={40} className="drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
           </div>
           <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-red-500 border-4 border-[#090E1A] flex items-center justify-center text-white shadow-lg">
              <AlertTriangle size={20} />
           </div>
        </div>

        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
          Destructive Action <span className="text-red-500">TAMx</span>
        </h3>
        
        <p className="text-slate-400 text-sm max-w-sm mb-2 leading-relaxed font-medium">
          {message}
        </p>

        {itemName && (
          <div className="px-4 py-2 bg-red-500/5 border border-red-500/10 rounded-xl mb-10">
             <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Target: </span>
             <span className="text-xs font-bold text-white uppercase tracking-tight">{itemName}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full mt-4">
           <button 
             onClick={onClose}
             className="py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
           >
             Neutralize / Back
           </button>
           <button 
             onClick={() => {
               onConfirm();
               onClose();
             }}
             className="py-4 px-6 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl text-xs font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
           >
             Confirm Deletion
           </button>
        </div>
      </div>
    </Modal>
  );
}
