'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, Globe2, RefreshCw, DollarSign } from 'lucide-react'
import Image from 'next/image'

const points = [
  { icon: Zap, label: 'Launch in minutes', desc: 'Ready-to-go storefronts for immediate action.' },
  { icon: TrendingUp, label: 'Scale without inventory', desc: 'Sourcing made simple through our wholesale partners.' },
  { icon: Globe2, label: 'Reach unlimited customers', desc: 'Global fulfillment nodes for worldwide distribution.' },
  { icon: RefreshCw, label: 'Fully automated operations', desc: 'Orders, inventory, and payments handled by TAMX.' },
  { icon: DollarSign, label: 'Maximize profit margins', desc: 'Low overhead and bulk pricing for maximum ROI.' },
]

export function ScaleGrowth() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white/[0.02]">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/ecommerce/growth.png"
          alt="Digital City Scale"
          fill
          className="object-cover opacity-20 filter grayscale group-hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
            >
              Built for <span className="text-[#7A5CFF]">Growth</span>, <br />
              Designed for <span className="text-[#00D1FF]">Scale</span>
            </motion.h2>
            
            <div className="space-y-8">
              {points.map((point, idx) => (
                <motion.div
                  key={point.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center p-3 transition-colors group-hover:bg-[#00D1FF]/10 group-hover:border-[#00D1FF]/30">
                    <point.icon className="w-6 h-6 text-[#00D1FF]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00D1FF] transition-colors">{point.label}</h3>
                    <p className="text-white/40 text-sm">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative h-[400px] sm:h-[500px] w-full mt-10 lg:mt-0">
             {/* Animating Graph Visualization */}
            <div className="absolute inset-0 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col justify-end overflow-hidden shadow-[0_0_50px_rgba(122,92,255,0.2)]">
                <div className="absolute top-8 right-8 text-[#00D1FF]">
                  <TrendingUp className="w-12 h-12 animate-[bounce_3s_infinite]" />
                </div>
                
                <div className="flex items-end gap-2 h-full justify-between">
                  {mounted && Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${20 + Math.random() * 80}%` }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.5, 
                        delay: i * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="w-full bg-gradient-to-t from-[#7A5CFF]/20 to-[#00D1FF] rounded-t-lg relative"
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2 }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/40"
                      >
                         +{Math.floor(Math.random() * 50)}%
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 border-t border-white/10 pt-4 flex justify-between items-center">
                   <div className="text-xs text-white/50 uppercase tracking-widest font-semibold tracking-[0.2em]">Efficiency Multiplier</div>
                   <motion.div 
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     viewport={{ once: true }}
                     className="text-2xl font-bold text-[#00D1FF]"
                   >
                     10X
                   </motion.div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
