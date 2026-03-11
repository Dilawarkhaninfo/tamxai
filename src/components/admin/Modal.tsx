"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-saturate-150"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)', transition: { duration: 0.2 } }}
            transition={{ 
              type: "spring", 
              damping: 22, 
              stiffness: 260,
              mass: 1
            }}
            className="relative w-full max-w-2xl bg-[#090E1A]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-white/5"
          >
            {/* Elegant Header */}
            <div className="px-6 py-6 sm:px-10 sm:py-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-b from-white/[0.03] to-transparent">
               <div>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white uppercase leading-none">
                      {title}
                    </h2>
                 </div>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-2 ml-5">Enterprise Configuration</p>
               </div>
               <button 
                 onClick={onClose}
                 className="p-3 hover:bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all group backdrop-blur-md border border-white/5"
               >
                 <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
               </button>
            </div>

            {/* Premium Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10">
               {children}
            </div>

            {/* Decorative Gradients */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/10 blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[90px] pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
