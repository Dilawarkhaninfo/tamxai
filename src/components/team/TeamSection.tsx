'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teamData } from './teamData';
import TeamCard from './TeamCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['Engineering', 'Science', 'Design', 'Leadership'];

export default function TeamSection() {
  const [mobileIndex, setMobileIndex] = useState(0);

  const founder = teamData.find(m => m.isFounder) || teamData[0];
  const otherMembers = teamData.filter(m => m.id !== founder.id);

  const nextSlide = () => {
    setMobileIndex((prev) => (prev + 1) % otherMembers.length);
  };

  const prevSlide = () => {
    setMobileIndex((prev) => (prev - 1 + otherMembers.length) % otherMembers.length);
  };

  // Stagger variants for desktop
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section 
      id="team-grid" 
      className="relative bg-[#000000] overflow-hidden pt-[100px] pb-[120px] px-6 md:px-20"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* LEFT COLUMN: Sidebar (25%) */}
        <div className="w-full lg:w-1/4 flex flex-col items-start lg:sticky lg:top-[120px] h-fit">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.05] tracking-tight"
          >
            Meet Our<br />Team
          </motion.h2>

          {/* Static Badges (Not Clickable) */}
          <div className="flex flex-wrap lg:flex-row gap-3 w-full overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
             {categories.map((cat) => (
               <div
                 key={cat}
                 className="whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium bg-[#111111] text-white/80 border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)] cursor-default"
               >
                 {cat}
               </div>
             ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Hierarchy Grid (75%) */}
        <div className="w-full lg:w-3/4">
          
          {/* DESKTOP DESING (Hidden on Mobile) */}
          <div className="hidden lg:block">
             {/* Founder Centered Row */}
             <div className="flex justify-center mb-[60px]">
                <div className="w-full max-w-[380px]">
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                   >
                     <TeamCard item={founder} />
                   </motion.div>
                </div>
             </div>

             {/* 6 Members Grid (3x2) */}
             <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8"
             >
               <AnimatePresence mode="popLayout">
                 {otherMembers.slice(0, 6).map((member) => (
                   <motion.div
                     key={member.id}
                     layout
                     variants={{
                       hidden: { opacity: 0, y: 20 },
                       visible: { opacity: 1, y: 0 }
                     }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                   >
                     <TeamCard item={member} />
                   </motion.div>
                 ))}
               </AnimatePresence>
             </motion.div>
          </div>

          {/* MOBILE DESIGN (Slider) */}
          <div className="lg:hidden flex flex-col items-center">
             {/* Founder at top */}
             <div className="w-full mb-16">
                <TeamCard item={founder} />
             </div>

             {/* Horizontal Slider for Rest */}
             <div className="relative w-full overflow-hidden">
                <div className="relative h-[480px] flex items-center justify-center">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={mobileIndex}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, { offset }) => {
                          if (offset.x < -50) nextSlide();
                          else if (offset.x > 50) prevSlide();
                        }}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0, scale: 1.02 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full max-w-[320px] cursor-grab active:cursor-grabbing will-change-transform"
                      >
                         <TeamCard item={otherMembers[mobileIndex]} />
                      </motion.div>
                   </AnimatePresence>

                   {/* Slider Nav Buttons */}
                   <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 pointer-events-none">
                      <button 
                        onClick={prevSlide}
                        className="size-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md pointer-events-auto hover:bg-brand-purple/20 transition-all active:scale-95 shadow-[0_0_15px_rgba(167,139,250,0.15)]"
                      >
                         <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={nextSlide}
                        className="size-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md pointer-events-auto hover:bg-brand-purple/20 transition-all active:scale-95 shadow-[0_0_15px_rgba(167,139,250,0.15)]"
                      >
                         <ChevronRight size={24} />
                      </button>
                   </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-8">
                   {otherMembers.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setMobileIndex(index)}
                        className={`size-2.5 rounded-full transition-all duration-500 ${
                          mobileIndex === index 
                            ? 'bg-brand-purple w-8 shadow-[0_0_10px_rgba(167,139,250,0.5)]' 
                            : 'bg-white/20'
                        }`}
                      />
                   ))}
                </div>
             </div>
          </div>

        </div>

      </div>

      {/* FOUNDER VISION MESSAGE SECTION */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 mt-20 md:mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Background Glow */}
          <div className="absolute -inset-4 bg-brand-purple/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-16 flex flex-col items-center text-center">
            {/* Unique Style: Glowing Left/Top Accent */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-brand-purple/50 to-transparent" />

            {/* Quote Icon or Decorative Element */}
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 20px rgba(167,139,250,0.2)", "0 0 40px rgba(167,139,250,0.4)", "0 0 20px rgba(167,139,250,0.2)"] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="size-16 rounded-full bg-brand-purple/20 flex items-center justify-center mb-10 border border-brand-purple/30"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-purple">
                <path d="M10 11L8 17H5L7 11H5V7H11V11H10ZM18 11L16 17H13L15 11H13V7H19V11H18Z" fill="currentColor"/>
              </svg>
            </motion.div>

            {/* Visionary Quote */}
            <blockquote className="max-w-4xl">
              <p className="text-2xl md:text-4xl font-medium text-white italic leading-relaxed md:leading-tight tracking-tight mb-10">
                "{founder.quote}"
              </p>
              
              <footer className="flex flex-col items-center">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
                <cite className="not-italic">
                  <span className="block text-xl font-bold text-white mb-1 uppercase tracking-widest leading-none">
                    {founder.name}
                  </span>
                  <span className="block text-sm font-medium text-brand-purple/80 uppercase tracking-[0.2em]">
                    {founder.role}
                  </span>
                </cite>
              </footer>
            </blockquote>

            {/* Interactive Glow Corners */}
            <div className="absolute bottom-0 right-0 size-32 bg-brand-purple/10 blur-[60px] rounded-full pointer-events-none" />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
