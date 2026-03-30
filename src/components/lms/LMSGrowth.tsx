'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'
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
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
          >
            Gamified Growth <br />
            <span className="gradient-text">Conquer</span> Each Level
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-xl leading-relaxed mb-10 opacity-80"
          >
            Embark on a structured journey where every achievement unlocks new possibilities. Our interactive growth system ensures that you stay motivated and on track to master your skills.
          </motion.p>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-1 w-32 bg-brand-lavender rounded-full mb-12"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-fit"
          >
            <img 
              src="https://edeviser.com/wp-content/uploads/2025/03/mic-and-star-circles.svg" 
              alt="Decoration"
              className="w-16 h-auto opacity-30 invert"
            />
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
                src="https://edeviser.com/wp-content/uploads/2025/03/Map-1024x745.png" 
                alt="Gamified Growth Map"
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
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
