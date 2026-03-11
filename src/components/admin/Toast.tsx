"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
}

export function ToastContainer({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence mode="popLayout" initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300,
              mass: 0.8
            }}
            className={cn(
               "pointer-events-auto min-w-[340px] max-w-md backdrop-blur-xl border relative overflow-hidden flex items-start gap-4 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
               toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10' :
               toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 shadow-red-500/10' :
               'bg-blue-500/10 border-blue-500/20 shadow-blue-500/10'
            )}
          >
            {/* Glowing Accent */}
            <div className={cn(
              "absolute -left-1 -top-1 w-24 h-24 blur-3xl opacity-20 pointer-events-none",
              toast.type === 'success' ? 'bg-emerald-500' :
              toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            )} />

            <div className={cn(
              "p-2 rounded-xl shrink-0 shadow-lg",
              toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
              toast.type === 'error' ? 'bg-red-500/20 text-red-400' :
              'bg-blue-500/20 text-blue-400'
            )}>
              {toast.type === 'success' && <CheckCircle2 size={18} />}
              {toast.type === 'error' && <AlertCircle size={18} />}
              {toast.type === 'info' && <Info size={18} />}
            </div>
            
            <div className="flex-1 pt-0.5">
              <p className="text-[13px] font-bold text-white leading-tight uppercase tracking-tight">{toast.message}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest">{toast.type === 'success' ? 'Confirmed' : 'System Alert'}</p>
            </div>

            <button 
              onClick={() => removeToast(toast.id)}
              className="text-slate-500 hover:text-white transition-all p-1 hover:bg-white/5 rounded-lg"
            >
              <X size={14} />
            </button>

            {/* Premium Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={cn(
                  "h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                  toast.type === 'success' ? 'bg-emerald-500 shadow-emerald-500/50' :
                  toast.type === 'error' ? 'bg-red-500 shadow-red-500/50' :
                  'bg-blue-500 shadow-blue-500/50'
                )}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
