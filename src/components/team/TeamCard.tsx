'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from './teamData';

export default function TeamCard({ item }: { item: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -12, 
        backgroundColor: 'rgba(12, 18, 34, 0.8)',
        borderColor: 'rgba(105, 106, 172, 0.4)'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative p-10 md:p-12 rounded-[32px] border border-white/[0.05] backdrop-blur-2xl bg-[#08080c]/60 overflow-hidden group flex flex-col items-center text-center gap-8 shadow-2xl shadow-black/20"
    >
      {/* Top glass reflection */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      
      {/* Spotlight hover effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Profile Image Area */}
      <div className="relative">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#8587e3] to-[#4c4dac] p-[2px] shadow-[0_0_30px_rgba(105,106,172,0.2)] group-hover:shadow-[0_0_40px_rgba(105,106,172,0.4)] transition-all duration-700">
          <div className="w-full h-full rounded-full bg-[#0B0F1C] flex items-center justify-center overflow-hidden relative">
             {/* Subtle internal glow */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(133,135,227,0.1),transparent)]" />
             
             {/* Image placeholder or fallback */}
             <span className="text-4xl md:text-5xl font-light text-white/90 relative z-10 italic">
              {item.name.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Orbiting glow effect */}
        <div className="absolute -inset-4 rounded-full bg-brand-purple/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-150 rotate-45 pointer-events-none" />
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        <h4 className="text-2xl md:text-3xl font-light text-white tracking-tight group-hover:text-brand-purple-light transition-colors duration-500">
          {item.name}
        </h4>
        <div className="flex flex-col gap-1">
          <span className="text-brand-purple-light text-[11px] font-semibold uppercase tracking-[0.2em]">{item.role}</span>
          <span className="text-white/20 text-[10px] font-light tracking-[0.1em] uppercase">{item.company}</span>
        </div>
      </div>

      <p className="text-foreground/40 text-base font-light italic leading-relaxed px-4 group-hover:text-foreground/60 transition-colors duration-500">
        &ldquo;{item.description}&rdquo;
      </p>

      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-2 translate-y-2">
         <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02]">
            <div className="size-1.5 rounded-full bg-brand-purple animate-pulse" />
         </div>
      </div>
    </motion.div>
  );
}
