'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export function ProductCTA() {
  return (
    <section className="pt-24 pb-48 px-6 relative overflow-hidden bg-white/[0.01]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-purple/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 rounded-[60px] p-10 md:p-20 relative z-20 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(122,92,255,0.1)]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/ecommerce/cta.png"
            alt="E-Commerce Hero Context"
            fill
            className="object-cover opacity-20 filter grayscale group-hover:grayscale-0 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="md:w-1/2 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Your E-Commerce <br />
            Journey Starts <span className="text-[#00D1FF]">Here</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-white/50 mb-10 font-light leading-relaxed"
          >
            Whether you're a wholesaler, seller, or entrepreneur — TAMX gives you the power to scale. Join the future of unified commerce today.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact"
                className="px-10 py-5 bg-[#00D1FF] text-background rounded-full font-bold flex items-center gap-2 hover:bg-[#7A5CFF] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.5)] active:shadow-inner no-underline"
              >
                Get Started Now <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact"
                className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition-all duration-300 no-underline"
              >
                Book Demo
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="md:w-1/2 relative h-[300px] w-full flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Visual Dashboard Representation */}
            <motion.div
               animate={{ 
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
               <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-[#00D1FF]/20 to-[#7A5CFF]/20 border border-white/10 backdrop-blur-xl flex flex-col p-6 shadow-2xl">
                 <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '80%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-[#00D1FF]" 
                    />
                 </div>
                 <div className="space-y-3">
                   {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/5" />
                        <div className="flex-1 space-y-1 mt-1">
                          <div className="w-full h-1 bg-white/10 rounded-full" />
                          <div className="w-1/2 h-1 bg-white/5 rounded-full" />
                        </div>
                      </div>
                   ))}
                 </div>
                 <div className="mt-auto flex justify-between items-center">
                    <div className="w-12 h-4 bg-[#7A5CFF]/20 rounded-full" />
                    <CheckCircle className="w-6 h-6 text-[#00D1FF] animate-pulse" />
                 </div>
               </div>
               {/* Decorative Glows */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D1FF] blur-[80px] opacity-20" />
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#7A5CFF] blur-[80px] opacity-20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
