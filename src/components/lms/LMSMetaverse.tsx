'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'
import { ShineButton } from '@/components/ui/ShineButton'
import { ArrowUpRight, Network, Cpu, Zap, Activity } from 'lucide-react'

export function LMSMetaverse() {
  return (
    <PageSection id="ai-ecosystem" fullHeight={false} className="bg-background py-16 md:py-32 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center px-4 relative container-padding w-full max-w-7xl mx-auto">
        {/* Background Blob Enhancement */}
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-brand-purple/5 blur-[100px] rounded-full -z-10 animate-pulse pointer-events-none" />
        
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-brand-lavender font-bold tracking-widest uppercase text-[10px] md:text-sm">• Advanced AI Ecosystem</span>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-brand-lavender to-transparent" />
          </motion.div>

          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[1.05] tracking-tight">
            Experience <span className="gradient-text">Synchronized <br className="hidden sm:block" /> Intelligence</span> Like Never Before
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-8 mb-8 md:mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 relative group/icon"
            >
              {/* Unique Technical Core Design */}
              <div className="w-20 h-20 md:w-28 md:h-28 relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-brand-purple/20 rounded-2xl blur-xl group-hover/icon:bg-brand-purple/40 transition-colors" />
                
                {/* The Box */}
                <div className="relative h-full w-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl">
                  {/* Decorative internal lines */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-0 left-1/2 w-px h-full bg-white" />
                    <div className="absolute left-0 top-1/2 h-px w-full bg-white" />
                  </div>
                  
                  {/* Rotating Elements */}
                  <div className="absolute w-full h-full animate-[spin_10s_linear_infinite] opacity-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-lavender rounded-full" />
                  </div>

                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="flex -space-x-2">
                       <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center border border-white/30 shadow-lg">
                         <Cpu className="w-5 h-5 md:w-7 md:h-7 text-white" />
                       </div>
                       <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mt-2">
                         <Network className="w-5 h-5 md:w-7 md:h-7 text-brand-lavender" />
                       </div>
                    </div>
                    <div className="flex items-center gap-1">
                       <div className="w-1.5 h-1.5 bg-brand-lavender rounded-full animate-pulse" />
                       <span className="text-[8px] md:text-[10px] text-brand-lavender font-bold tracking-tighter uppercase">Sync Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-4 md:space-y-6">
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl opacity-90 font-medium">
                Step into a synchronized digital workspace where TAMX AI orchestrates real-time collaboration. Our platform moves beyond traditional boundaries, providing a unified hub for complex problem-solving and collective intelligence.
              </p>
              <p className="text-base md:text-xl text-text-secondary leading-relaxed max-w-xl opacity-80">
                Immersive simulations allow hands-on mastery in fields like strategic analysis, advanced technology, and professional engineering, making abstract concepts actionable.
              </p>
            </div>
          </div>

          <ShineButton href="https://calendly.com/team-edeviser" className="group scale-90 sm:scale-100 origin-left">
            Explore the Ecosystem
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </ShineButton>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative group mt-12 lg:mt-0"
        >
          {/* Main Metaverse Image with custom frame/shadow */}
          <div className="absolute -inset-2 bg-gradient-to-br from-brand-purple/30 to-brand-lavender/30 blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-1000 -z-10" />
          <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl backdrop-blur-3xl p-1 md:p-2 bg-white/5">
            <img 
              src="/images/lms/sync_intelligence.png" 
              alt="AI Synchronized Intelligence Hub" 
              className="w-full h-auto rounded-[1.2rem] md:rounded-[2rem] group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
          
          {/* Decorative floating element */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 md:-bottom-10 -left-6 md:-left-10 w-24 h-24 md:w-32 md:h-32 bg-brand-lavender/10 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl -z-10"
          />
        </motion.div>
      </div>
    </PageSection>
  )
}
