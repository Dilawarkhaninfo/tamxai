'use client';

import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { year: '2022', title: 'Founding', desc: 'TAMx established with a vision to democratize high-end AI for enterprise.' },
  { year: '2023', title: 'Neural Core v1', desc: 'Launch of our first proprietary AI orchestration engine.' },
  { year: '2024', title: 'Global Expansion', desc: 'Established partnerships with Fortune 500 industry leaders across Europe & Asia.' },
  { year: '2025', title: 'AI Ecosystem', desc: 'Deploying the future of interconnected intelligent product suites.' },
];

export function TimelineSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#030712] py-32 overflow-hidden border-t border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-32">
            <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-lavender mb-8"
            >
                Our Evolution
            </motion.h2>
            <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-bold text-white tracking-tighter"
            >
                The <span className="gradient-text">Journey</span>
            </motion.h3>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-purple/40 via-brand-blue/40 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-32">
            {milestones.map((ms, idx) => (
              <motion.div
                key={ms.year}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content Side */}
                <div className={`w-full md:w-1/2 space-y-4 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-6xl md:text-8xl font-black text-white/5 tracking-tighter block">{ms.year}</span>
                  <h4 className="text-3xl font-bold text-white tracking-tight">{ms.title}</h4>
                  <p className="text-text-muted text-lg max-w-md mx-auto md:mx-0 font-medium opacity-80">{ms.desc}</p>
                </div>

                {/* Point in Middle */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center hidden md:flex">
                    <div className="w-4 h-4 rounded-full bg-brand-purple shadow-[0_0_20px_rgba(147,51,234,1)] z-20" />
                    <div className="absolute w-12 h-12 rounded-full border border-brand-purple/20 animate-ping" />
                </div>

                {/* Spacer Side */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none z-0" />
    </section>
  );
}
