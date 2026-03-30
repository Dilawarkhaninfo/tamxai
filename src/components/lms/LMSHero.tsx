'use client'

import { motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Play } from 'lucide-react'

export function LMSHero() {
  return (
    <section className="relative min-h-screen pt-24 sm:pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-padding max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="text-sm font-medium text-brand-lavender tracking-wider uppercase">Next-Gen Education</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]"
          >
            AI-Powered Learning, <br />
            <span className="gradient-text">10x Smarter,</span> <br />
            Gamified, and <span className="text-brand-lavender">Personalized</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Boost student engagement, improve retention, reduce workload, and gain real-time insights—all with an Learning Experience Platform trusted by educators and built for your institution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Link 
              href="/contact"
              className="group relative px-8 py-4 bg-brand-purple text-white rounded-full font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-glow-purple no-underline"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Page <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            
            <Link 
              href="/contact#meeting"
              className="group px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-all hover:border-white/20 active:scale-95 backdrop-blur-md no-underline"
            >
              <Play className="w-4 h-4 fill-white" />
              Schedule a Meeting
            </Link>
          </motion.div>
        </div>

        {/* Laptop Mockup and Character */}
        <div className="relative w-full max-w-6xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glossy Under-glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-brand-purple/20 blur-[100px] rounded-full" />
            
            <motion.div
              animate={{ 
                y: [0, -25, 0],
                rotateZ: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="relative z-20"
            >
              <Image 
                src="/images/lms/dashboard_mockup.png"
                alt="TAMx LMS Premium Dashboard"
                width={1138}
                height={669}
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(105,106,172,0.3)] rounded-2xl md:rounded-[2rem] border border-white/10"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-16 -right-6 md:-right-12 md:top-0 w-32 sm:w-40 md:w-56 lg:w-72 z-30 pointer-events-none"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.05, 1],
                  filter: [
                    'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))',
                    'drop-shadow(0 0 40px rgba(168, 85, 247, 0.7))',
                    'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              >
                <Image 
                  src="/images/lms/assistant_orb.png" 
                  alt="TAMx AI Assistant Orb"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
              
              {/* Orb Glow Ring */}
              <motion.div
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="absolute inset-0 bg-brand-purple/30 blur-3xl rounded-full -z-10"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
