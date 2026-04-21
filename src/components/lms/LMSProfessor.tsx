'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'
import { Sparkles, BarChart, FileJson } from 'lucide-react'

const highlights = [
  {
    title: 'Adaptive & Personalized Learning',
    description: 'The AI Professor adapts to each learner’s pace providing customized lessons and recommendations for a seamless learning experience.',
    icon: Sparkles
  },
  {
    title: 'Automated Administrative Tasks',
    description: 'It handles attendance tracking, assignment grading, course management, and progress monitoring, reducing manual workload for educators.',
    icon: BarChart
  },
  {
    title: 'Content Generation & Enhancement',
    description: 'AI auto-generates study materials, provides multilingual support, converts text to speech, and enhances videos with transcripts and interactive elements.',
    icon: FileJson
  }
]

export function LMSProfessor() {
  return (
    <PageSection id="lms-professor" fullHeight={false} className="bg-background py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 max-w-2xl px-4">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 sm:mb-16 leading-tight"
          >
            Meet Your <span className="gradient-text">AI Professor</span> <br />
            24/7 Guide
          </motion.h2>

          <div className="space-y-12">
            {highlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 sm:gap-8 group"
              >
                <div className="shrink-0 p-4 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 text-brand-purple group-hover:bg-brand-purple/20 group-hover:scale-110 transition-all duration-500 shadow-glow-purple">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-brand-lavender transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-lg aspect-square lg:aspect-auto"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img 
                src="/images/lms/ai_professor.png" 
                alt="Realistic AI Professor Avatar"
                className="w-full h-auto drop-shadow-2xl rounded-3xl"
              />
            </motion.div>
            
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-purple/20 blur-[120px] rounded-full -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-blue/20 blur-[80px] rounded-full -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </PageSection>
  )
}
