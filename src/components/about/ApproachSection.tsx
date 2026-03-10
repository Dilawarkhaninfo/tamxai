'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
  { 
    step: '01', 
    title: 'Discovery', 
    desc: 'Deep architecture review and strategic alignment to identify technical constraints and core opportunities.',
    icon: Search,
    color: 'from-brand-purple/40 to-transparent'
  },
  { 
    step: '02', 
    title: 'Strategy', 
    desc: 'Crafting the blueprint for resilient AI integration and high-performance product roadmaps.',
    icon: PenTool,
    color: 'from-brand-blue/40 to-transparent'
  },
  { 
    step: '03', 
    title: 'Development', 
    desc: 'Engineering state-of-the-art systems with a focus on scalability, security, and exceptional code quality.',
    icon: Code,
    color: 'from-brand-lavender/40 to-transparent'
  },
  { 
    step: '04', 
    title: 'Launch', 
    desc: 'Precision deployment with real-time telemetry and continuous intelligence loops to ensure long-term success.',
    icon: Rocket,
    color: 'from-brand-purple/40 to-transparent'
  },
];

export function ApproachSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black py-32 overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter"
          >
            Our <span className="gradient-text">Precision</span> Approach
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto opacity-70 leading-relaxed font-medium"
          >
            A high-performance methodology designed to deliver technical excellence at every stage of the product lifecycle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="p-12 rounded-[3.5rem] bg-[#0F172A]/40 border border-white/5 hover:border-brand-purple/30 transition-all duration-700 group relative overflow-hidden backdrop-blur-3xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated Background Number */}
              <span className="block text-8xl font-black text-white/[0.03] mb-10 group-hover:text-brand-purple/[0.08] transition-colors tracking-tighter leading-none">{item.step}</span>
              
              {/* Icon with Glowing Backdrop */}
              <div className="relative mb-10 inline-flex">
                <div className={`absolute -inset-4 bg-gradient-to-br ${item.color} blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-1000`} />
                <item.icon className="w-10 h-10 text-white relative z-10 group-hover:scale-110 group-hover:text-brand-lavender transition-all duration-500" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 group-hover:translate-x-1 transition-transform tracking-tight">{item.title}</h3>
              <p className="text-text-muted leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity font-medium">
                {item.desc}
              </p>

              {/* Staggered Line Animation on Hover */}
              <div className="absolute bottom-10 left-12 right-12 h-[1px] bg-gradient-to-r from-brand-purple/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/10 to-transparent blur-[100px]" />
    </section>
  );
}
