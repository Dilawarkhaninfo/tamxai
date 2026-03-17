'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function TeamVision() {
  const words = "We envision a future where intelligent systems empower businesses to operate faster, smarter, and more efficiently. At TAMx, we are committed to building scalable AI-driven solutions that redefine how modern organizations grow and innovate.".split(" ");

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B0F1C]">
      {/* Cinematic Background with Floating Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Soft Background Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(105,106,172,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.08)_0%,transparent_50%)]" />
        
        {/* Floating Light Orbs for depth */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -50, 50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 size-[400px] bg-brand-purple/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 40, 0],
            y: [0, 60, -30, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 size-[350px] bg-blue-500/10 blur-[100px] rounded-full"
        />

        {/* Cinematic light beam sweep */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(180, 181, 237, 0.3) 50%, transparent 100%)',
            filter: 'blur(120px)',
            transform: 'skewX(-25deg)'
          }}
        />
      </div>

      <div className="relative z-10 w-main mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-brand-purple-light text-[10px] md:text-sm font-semibold uppercase tracking-[0.4em] mb-12 flex items-center justify-center gap-4 opacity-50">
            <span className="w-8 md:w-12 h-px bg-current opacity-20" />
            Our Vision
            <span className="w-8 md:w-12 h-px bg-current opacity-20" />
          </h2>

          <div className="flex flex-wrap justify-center max-w-5xl mx-auto mb-16 px-4">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15, filter: 'blur(8px)', scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ scale: 1.05, color: '#fff', transition: { duration: 0.2 } }}
                className={`text-2xl md:text-4xl lg:text-5xl font-light leading-snug mr-3 mb-2 cursor-default transition-colors duration-500 ${
                  ['intelligent', 'empower', 'TAMx', 'AI-driven', 'redefine'].includes(word.replace(/[.,]/g, "")) 
                    ? "font-semibold text-white bg-gradient-to-r from-brand-purple to-blue-400 bg-clip-text text-transparent" 
                    : "text-foreground/40"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, duration: 1, ease: 'anticipate' }}
          >
            <Link href="/contact" className="inline-block group">
              <div className="flex items-center gap-6 px-12 py-6 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-brand-purple/30 hover:bg-white/[0.05] transition-all duration-700 shadow-2xl shadow-brand-purple/5 group-active:scale-95">
                <span className="text-white font-light text-lg tracking-wide">Start Your Project</span>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-brand-purple group-hover:text-white transition-all duration-700 transform group-hover:rotate-[360deg] shadow-lg">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1C] via-transparent to-[#0B0F1C] pointer-events-none opacity-60" />
    </section>
  );
}
