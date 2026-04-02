'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, AlertTriangle } from 'lucide-react'

export function ChaosToControl() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0.2, 0.3], [0.8, 1])

  const problemItems = [
    'Multiple platforms',
    'Inventory mismatch',
    'Manual order processing',
    'Delayed deliveries',
    'Data scattered everywhere'
  ]

  const solutionItems = [
    'Unified product catalog',
    'Automated order routing',
    'Real-time inventory sync',
    'Smart fulfillment system',
    'One dashboard control'
  ]

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Stop Managing Tools.<br />
            <span className="gradient-text">Start Running a System.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            From the chaos of fragmented operations to the control of a unified ecosystem.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Chaos Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 p-8 rounded-3xl bg-red-500/5 border border-red-500/20 backdrop-blur-md relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/30" />
            <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> The Chaos
            </h3>
            <ul className="space-y-4">
              {problemItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/50 group-hover:text-white/80 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 relative h-48 overflow-hidden rounded-xl border border-red-500/10 grayscale group-hover:grayscale-0 transition-all duration-500">
               <Image 
                src="/images/ecommerce/chaos.png"
                alt="Operational Chaos"
                fill
                className="object-cover opacity-60 animate-[pulse_10s_infinite]"
              />
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 p-8 rounded-3xl bg-[#4F46E5]/5 border border-[#4F46E5]/20 backdrop-blur-md relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#4F46E5]/30" />
            <h3 className="text-2xl font-bold text-[#4F46E5] mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" /> The TAMX Solution
            </h3>
            <ul className="space-y-4">
              {solutionItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/70 group-hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]/60" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 relative h-48 overflow-hidden rounded-xl border border-[#4F46E5]/10 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.2)] transition-all duration-500">
              <Image 
                src="/images/ecommerce/control.png"
                alt="Unified Control System"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
