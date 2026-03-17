'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';


const benefits = [
    { text: "Expert technical guidance", delay: 0 },
    { text: "Architecture recommendations", delay: 0.1 },
    { text: "Timeline and budget estimation", delay: 0.2 },
    { text: "Product strategy insights", delay: 0.3 }
];

export function ConsultationSection({ onOpenScheduler }: { onOpenScheduler: () => void }) {
  return (
    <section className="py-24 relative overflow-hidden bg-dark-secondary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-3 rounded-full bg-brand-lavender/10 border border-brand-lavender/20 text-brand-lavender w-fit mb-8 font-bold text-sm uppercase tracking-widest"
            >
              Direct Consultation
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight"
            >
               Schedule a <span className="gradient-text">Strategy <br /> Consultation</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary leading-relaxed mb-12 opacity-70 max-w-lg"
            >
              Book a 30-minute consultation with the TAMx team to discuss your project requirements and explore potential solutions tailored to your vision.
            </motion.p>

            <div className="space-y-6">
                {benefits.map((benefit, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + benefit.delay }}
                        className="flex items-center gap-4 text-white/90"
                    >
                        <div className="size-6 rounded-full bg-brand-lavender/20 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-brand-lavender" />
                        </div>
                        <span className="text-lg font-medium opacity-80">{benefit.text}</span>
                    </motion.div>
                ))}
            </div>
          </div>

          {/* Right Side: Scheduler Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className="absolute -inset-4 bg-brand-purple/20 blur-[120px] opacity-20" />
             
             <div 
                onClick={onOpenScheduler}
                className="relative bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 overflow-hidden cursor-pointer group hover:border-brand-lavender/30 transition-all duration-500 shadow-2xl"
             >
                <div className="flex items-center justify-between mb-12">
                     <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Available slots for</p>
                        <p className="text-white font-bold text-2xl">This Week</p>
                     </div>
                     <div className="size-12 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-lavender group-hover:bg-brand-purple group-hover:text-white transition-all">
                        <Zap className="w-6 h-6" />
                     </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { day: "Mon", slots: "3 left" },
                        { day: "Tue", slots: "1 left" },
                        { day: "Wed", slots: "Full" },
                        { day: "Thu", slots: "5 left" }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 group-hover:bg-white/10 transition-colors">
                            <p className="text-text-muted text-sm font-bold mb-1">{item.day}</p>
                            <p className={cn("text-lg font-bold", item.slots === "Full" ? "text-white/20" : "text-white")}>{item.slots}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <button className="px-10 py-5 rounded-full bg-brand-purple text-white font-bold group-hover:scale-105 transition-transform shadow-glow-purple">
                        Open Full Calendar
                    </button>
                </div>

                {/* Decorative particles */}
                <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                    <div className="size-32 rounded-full bg-brand-lavender blur-3xl" />
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
