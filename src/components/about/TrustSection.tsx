'use client';

import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'QuantumCore', logo: 'QC' },
  { name: 'Nexus AI', logo: 'NX' },
  { name: 'Vanguard', logo: 'VG' },
  { name: 'HealSync', logo: 'HS' },
  { name: 'Lumina', logo: 'LM' },
  { name: 'Quantix', logo: 'QX' },
];

export function TrustSection() {
  return (
    <section className="relative min-h-[60vh] w-full flex flex-col items-center justify-center bg-black py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-lavender mb-20"
        >
            Trusted by Visionary Organizations
        </motion.h2>

        <div className="relative h-64 flex items-center justify-center">
            {/* Curved Path Visualization (Subtle) */}
            <svg 
                className="absolute w-full max-w-4xl h-full opacity-10" 
                viewBox="0 0 1000 200"
                fill="none"
            >
                <path 
                    d="M0 100 C 250 180, 750 20, 1000 100" 
                    stroke="white" 
                    strokeWidth="1" 
                />
            </svg>

            {/* Orbiting Logos */}
            <div className="flex gap-12 md:gap-24 overflow-hidden relative w-full">
                <motion.div 
                    animate={{ x: ['0%'], transition: { duration: 0 } }}
                    className="flex gap-24 items-center whitespace-nowrap animate-infinite-scroll"
                >
                    {[...partners, ...partners].map((partner, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-4 group cursor-default">
                            <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-3xl group-hover:border-brand-purple/40 group-hover:bg-white/10 transition-all duration-500">
                                <span className="text-2xl font-black text-white/40 group-hover:text-white transition-colors tracking-tighter uppercase">{partner.logo}</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted opacity-40 group-hover:opacity-100 transition-opacity">{partner.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
