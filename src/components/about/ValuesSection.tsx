'use call client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Cpu, Target } from 'lucide-react';

const principles = [
  {
    title: 'Human-Centered Innovation',
    desc: 'We design AI that enhances human potential, placing empathy and usability at the core of every technical decision.',
    icon: Heart,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10'
  },
  {
    title: 'Engineering Excellence',
    desc: 'Our code is our craft. We maintain the highest standards of technical rigor, scalability, and system resilience.',
    icon: Cpu,
    color: 'text-brand-lavender',
    bg: 'bg-brand-purple/10'
  },
  {
    title: 'Responsible AI',
    desc: 'Ethical considerations are not an afterthought. We build transparent, bias-aware systems that respect privacy.',
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Scalable Systems',
    desc: 'We architect for growth. Our solutions are engineered to handle enterprise-scale complexity from day one.',
    icon: Target,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  }
];

export function ValuesSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#030712] py-32 overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[160px] rounded-full animate-float" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[140px] rounded-full animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-lavender text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
          >
            Our Philosophy
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold text-white tracking-tighter"
          >
            Core <span className="gradient-text">Principles</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-brand-purple/30 hover:bg-white/[0.04] transition-all duration-500 group relative"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-[0.01em]">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity font-medium">
                {item.desc}
              </p>
              
              {/* Subtle interactive glow on hover */}
              <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-1000 -z-10 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
