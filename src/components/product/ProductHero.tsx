'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, ShoppingCart, Factory, ShoppingBag, User } from 'lucide-react'

const Node = ({ icon: Icon, label, x, y, delay }: { icon: any, label: string, x: string, y: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className="absolute z-40 group"
    style={{ left: x, top: y }}
  >
    <div className="relative">
      {/* Node Glow */}
      <div className="absolute inset-0 bg-[#4F46E5]/20 blur-xl rounded-full scale-150 animate-pulse" />
      
      {/* Node Circle */}
      <div className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-2xl flex items-center justify-center p-3 transition-transform group-hover:scale-110 group-hover:border-[#4F46E5]/50 shadow-2xl">
        <Icon className="w-6 h-6 text-[#4F46E5]" />
      </div>

      {/* Node Label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap">{label}</span>
      </div>
    </div>
  </motion.div>
)

const DataStream = ({ d, delay }: { d: string, delay: number }) => (
  <motion.path
    d={d}
    fill="none"
    stroke="url(#dataGradient)"
    strokeWidth="2"
    strokeDasharray="10 20"
    initial={{ strokeDashoffset: 100, opacity: 0 }}
    animate={{ strokeDashoffset: 0, opacity: 1 }}
    transition={{
      strokeDashoffset: { duration: 10, repeat: Infinity, ease: 'linear' },
      opacity: { duration: 1, delay }
    }}
  />
)

export function ProductHero() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Particles/Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.08] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted && Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                opacity: Math.random() * 0.3 + 0.1
              }}
              animate={{ 
                y: [null, (Math.random() - 0.5) * 100 + 'px'],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="absolute w-1 h-1 bg-[#4F46E5] rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Global Background Gradients */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#7A5CFF]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#4F46E5]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-padding max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight"
          >
            The Future of <br />
            <span className="gradient-text">E-Commerce</span> <br />
            is <span className="text-[#7A5CFF]">Unified</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 mb-12 leading-relaxed max-w-xl font-light"
          >
            Evolve beyond fragmented operations. The TAMX E-Commerce Ecosystem streamlines your entire business journey—from product sourcing to global delivery—into a single, code-driven engine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-8"
          >
            <Link 
              href="/contact"
              className="group relative px-10 py-5 bg-[#7A5CFF] text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(122,92,255,0.4)] no-underline flex items-center gap-3 animate-[glowPulse_4s_infinite]"
            >
              <span className="relative z-10 transition-transform group-hover:-translate-x-1">Launch Your Store</span>
              <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            
            <Link 
              href="#ecosystem"
              className="group px-10 py-5 bg-white/[0.03] border border-white/10 text-white rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition-all hover:border-white/20 hover:scale-110 active:scale-95 backdrop-blur-md no-underline"
            >
              Explore Ecosystem
            </Link>
          </motion.div>
        </div>

        <div className="lg:w-1/2 relative min-h-[500px] flex items-center justify-center">
          {/* Holographic Visualization Container */}
          <div className="relative w-full aspect-square max-w-[600px]">
            {/* SVG Data Streams Overlay */}
            <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full z-30 pointer-events-none drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <defs>
                <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0" />
                  <stop offset="50%" stopColor="#7A5CFF" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                </linearGradient>
              </defs>
              <DataStream d="M 120,120 Q 300,50 480,250" delay={1} />
              <DataStream d="M 480,250 Q 400,450 150,450" delay={1.5} />
              <DataStream d="M 150,450 Q 80,300 120,120" delay={2} />
            </svg>

            {/* Floating Nodes */}
            <Node icon={Factory} label="Supplier" x="15%" y="15%" delay={0.6} />
            <Node icon={ShoppingBag} label="Sellers" x="75%" y="40%" delay={0.8} />
            <Node icon={User} label="Customers" x="20%" y="85%" delay={1.0} />

            {/* Central Holographic Globe (SVG-based) */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
                scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="absolute inset-[15%] rounded-full border border-white/5 bg-transparent"
            >
              {/* Orbital Rings */}
              <div className="absolute inset-0 border border-[#4F46E5]/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border border-[#7A5CFF]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-10 border border-white/5 rounded-full animate-[spin_25s_linear_infinite]" />
              
              {/* Globe Grid Effect */}
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 stroke-[#4F46E5] stroke-[0.2]">
                <circle cx="50" cy="50" r="48" fill="none" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <ellipse key={i} cx="50" cy="50" rx={48 - i * 6} ry="48" fill="none" />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <ellipse key={i} cx="50" cy="50" rx="48" ry={48 - i * 6} fill="none" />
                ))}
              </svg>
              
              {/* Inner Core Glow */}
              <div className="absolute inset-0 bg-radial-glow opacity-30 blur-2xl animate-pulse" />
            </motion.div>

            {/* Outer Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full border border-white/5 rounded-full opacity-5 hover:opacity-10 transition-opacity animate-ping-slow" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(122,92,255,0.4); }
          50% { box-shadow: 0 0 60px rgba(0,209,255,0.5); }
        }
        .animate-ping-slow {
          animation: ping 10s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
