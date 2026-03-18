'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from './teamData';
import Image from 'next/image';

export default function TeamCard({ item }: { item: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group cursor-default relative"
    >
      {/* Rectangular Image Container */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 transition-all duration-500 bg-[#0B1220]">
        {/* Triple-layer Gradient Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #0B1220 0%, #101A2E 50%, #0B1220 100%)'
          }}
        />
        
        {/* Soft Vignette & Radial Light Center */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 z-10 shadow-[inner_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none" />

        {/* Person Image */}
        <motion.div
          whileHover={{ scale: 1.02, filter: 'brightness(1.05)' }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-20 w-full h-full"
        >
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
             {/* Image Render */}
             {item.image ? (
               <div className="relative w-full h-full group-hover:scale-[1.02] transition-transform duration-700">
                 <Image
                   src={item.image}
                   alt={item.name}
                   fill
                   className="object-cover object-top"
                   priority
                 />
               </div>
             ) : (
               /* Initials Placeholder (Only if no image) */
               <div className="absolute inset-0 flex items-center justify-center bg-[#0B1220]">
                  <span className="text-6xl font-thin text-white/10 italic select-none">
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </span>
               </div>
             )}
          </div>
        </motion.div>
      </div>

      {/* Text Info */}
      <div className="flex flex-col gap-1 text-left px-1">
        <h4 className="text-[18px] md:text-[20px] font-semibold text-white tracking-tight leading-tight">
          {item.name}
        </h4>
        <p className="text-[14px] text-[#A0A4B8] font-medium tracking-wide">
          {item.role}{item.company && item.company !== 'TAMx' ? `, ${item.company}` : ''}
        </p>
      </div>

      {/* Subtle brand glow on hover */}
      <div className="absolute -inset-2 rounded-2xl bg-brand-purple/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
