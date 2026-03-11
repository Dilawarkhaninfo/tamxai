'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { AIPSphere } from './AIPSphere';

const testimonials = [
  {
    quote: "TAMx delivered a scalable AI platform that transformed our operations. Their technical depth and product vision are unmatched.",
    author: "Alexander Chen",
    role: "CTO, QuantumCore Logistics",
    company: "QuantumCore",
  }
];

export function TestimonialSection() {
  return (
    <section className="relative min-h-[70vh] w-full flex items-center justify-center bg-black py-20 overflow-hidden border-t border-white/5">
      {/* Cinematic 3D AI Sphere Backdrop */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AIPSphere />
      </div>

      {/* Cinematic Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 blur-[180px] rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-purple/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        {testimonials.map((testi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-brand-purple/10 border border-brand-purple/20 backdrop-blur-3xl mb-12"
            >
              <Quote className="w-10 h-10 text-brand-lavender opacity-60" />
            </motion.div>
            
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-12 leading-[1.3] tracking-tight font-display italic">
              "{testi.quote}"
            </h3>
            
            <div className="flex flex-col items-center">
              <div className="group relative">
                <div className="absolute -inset-4 bg-brand-purple/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue p-[1px] mb-6">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden backdrop-blur-3xl">
                        <span className="text-xl font-bold gradient-text">{testi.author[0]}</span>
                    </div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-1 tracking-tight">{testi.author}</h4>
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-text-muted">{testi.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
