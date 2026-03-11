'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ArchitectureSection() {
  return (
    <section className="py-32 bg-[#030712] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <span className="text-brand-purple text-xs font-bold uppercase tracking-widest mb-6 block">The Backbone</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Solution Architecture</h2>
          <p className="text-xl text-text-secondary leading-relaxed mb-12">
            A distributed neural network orchestrator designed for petabyte-scale data flows, utilizing reinforcement learning for autonomous resource balancing.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h4 className="text-white font-bold mb-2">Data Pipeline</h4>
              <p className="text-sm text-text-muted">Zero-latency event streaming via Apache Kafka.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h4 className="text-white font-bold mb-2">AI Models</h4>
              <p className="text-sm text-text-muted">Custom Transformer architectures for sequence prediction.</p>
            </div>
          </div>
        </div>
        
        <div className="relative aspect-square">
            {/* Animated Diagram Placeholder */}
            <div className="absolute inset-0 bg-brand-purple/5 rounded-[4rem] border border-brand-purple/20 flex items-center justify-center">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="w-2/3 h-2/3 border-2 border-dashed border-brand-lavender/30 rounded-full flex items-center justify-center"
                >
                    <div className="w-1/2 h-1/2 bg-brand-purple/20 blur-3xl rounded-full" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                            <motion.div 
                               key={i}
                               initial={{ opacity: 0 }}
                               whileInView={{ opacity: 1 }}
                               transition={{ delay: i * 0.1 }}
                               className="w-4 h-4 rounded-sm bg-white/20 border border-white/40"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
