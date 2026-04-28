'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'
import { Zap, Activity } from 'lucide-react'
import Image from 'next/image'

export function LMSGrowth() {
  return (
    <PageSection id="lms-growth" fullHeight={false} className="bg-dark-primary py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 px-4">
        <div className="flex-1 max-w-xl">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight"
          >
            Cognitive Skill Evolution <br />
            <span className="gradient-text">Precision</span> Navigator
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-xl leading-relaxed mb-10 opacity-80"
          >
            TAMX AI analyzes your unique learning signature to craft a personalized roadmap. Experience a dynamic curriculum that evolves in real-time, ensuring mastery through data-driven insights and adaptive challenges.
          </motion.p>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-1 w-32 bg-brand-lavender rounded-full mb-12"
          />

          <motion.div
            whileHover={{ rotate: -5, scale: 1.05 }}
            className="w-fit mb-8 relative group/icon"
          >
            <div className="w-20 h-20 md:w-28 md:h-28 relative">
              <div className="absolute inset-0 bg-brand-purple/20 rounded-full blur-xl group-hover/icon:bg-brand-purple/40 transition-colors" />
              <div className="relative h-full w-full rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent" />
                <div className="flex flex-col items-center gap-1 relative z-10">
                   <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center border border-white/20 shadow-inner">
                     <Zap className="w-5 h-5 md:w-7 md:h-7 text-white fill-current" />
                   </div>
                   <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-brand-lavender" />
                      <span className="text-[8px] md:text-[10px] text-brand-lavender font-bold tracking-widest uppercase">Live Path</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 w-full relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative z-10 p-6 rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-blue/10 pointer-events-none opacity-40" />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-2xl"
            >
              <img 
                src="/images/lms/growth_path.png" 
                alt="AI Cognitive Growth Dashboard"
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 shadow-2xl"
              />
            </motion.div>
          </motion.div>
          
          {/* Animated Glow behind the map */}
          <div className="absolute -inset-10 bg-brand-purple/10 blur-[100px] rounded-full group-hover:bg-brand-purple/20 transition-all duration-1000 -z-0" />
        </div>
      </div>
    </PageSection>
  )
}
