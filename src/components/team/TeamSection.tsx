'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { teamData } from './teamData';
import TeamCard from './TeamCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['Engineering', 'Science', 'Design', 'Leadership'];

export default function TeamSection() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // Scroll animation logic for snappy "shrink upward" reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 98%", "start 60%"]
  });

  const springConfig = { damping: 12, stiffness: 150 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const scale = useTransform(smoothProgress, [0, 1], [0.7, 1]);
  const y = useTransform(smoothProgress, [0, 1], ["350px", "0px"]);
  const clipPath = useTransform(
    smoothProgress,
    [0, 1],
    ["inset(30% 30% 30% 30% round 100px)", "inset(0% 0% 0% 0% round 0px)"]
  );
  const opacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

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
      ref={containerRef}
      id="team-grid" 
      className="relative bg-black overflow-hidden pt-[100px] pb-[120px]"
    >
      <motion.div
        style={{
          scale,
          y,
          clipPath,
          opacity,
        }}
        className="px-6 md:px-20 py-10 w-full"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10 w-main mx-auto">
          
          {/* LEFT COLUMN: Sidebar - Aligned to Vision/Story titles */}
          <div className="w-full lg:col-span-4 flex flex-col items-start lg:sticky lg:top-[120px] h-fit">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight"
            >
              Meet Our<br />Team
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-base sm:text-lg text-foreground/70 font-light leading-relaxed mb-10 max-w-sm"
            >
             Meet the passionate individuals behind TAMx Technologies. Our diverse team brings together a wealth of experience in technology, business strategy, and creative problem-solving. Each member is committed to driving innovation and ensuring our clients achieve their goals.
            </motion.p>

            {/* Static Badges (Not Clickable) */}
            <div className="flex flex-wrap lg:flex-row gap-3 w-full overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
               {categories.map((cat) => (
                 <div
                   key={cat}
                   className="whitespace-nowrap px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[#111111] text-white/80 border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)] cursor-default"
                 >
                   {cat}
                 </div>
               ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Hierarchy Grid - Aligned to "Blue Box" */}
          <div className="w-full lg:col-start-5 lg:col-end-13 relative z-10 lg:pl-12 lg:border-l border-brand-purple/20">
            
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
               <div className="w-full mb-16 px-2">
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
      </motion.div>

      {/* Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/10 to-transparent blur-[100px]" />
    </section>
  );
}
