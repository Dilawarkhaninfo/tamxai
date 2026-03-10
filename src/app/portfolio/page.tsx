'use client';

import React from 'react';
import { ImmersiveHero } from '@/components/ui/ImmersiveHero';
import { PageSection } from '@/components/layout/PageSection';
import { CTASection } from '@/components/home/CTASection';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const portfolioImages = [
  'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2072&auto=format&fit=crop', // Modern app UI
  'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop', // Abstract gradient
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', // High tech hardware
];

const projects = [
  {
    title: 'Nexus AI Platform',
    category: 'AI / Machine Learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    description: 'A comprehensive enterprise AI suite for predictive analytics and automated customer insights.',
  },
  {
    title: 'HealSync Mobile',
    category: 'Healthcare / IoT',
    image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=2070&auto=format&fit=crop',
    description: 'Real-time patient monitoring system with encrypted cloud synchronization and edge processing.',
  },
  {
    title: 'Lumina Dashboard',
    category: 'SaaS / Fintech',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda5366991?q=80&w=2070&auto=format&fit=crop',
    description: 'High-fidelity financial visualization tool with real-time trading signals and audit logging.',
  },
  {
    title: 'Quantix Supply Chain',
    category: 'Logistics / AI',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    description: 'Autonomous supply chain optimization platform utilizing reinforcement learning for route efficiency.',
  },
];

const metrics = [
  { label: 'Successful Deployments', value: '250+' },
  { label: 'Data Points Processed', value: '1.2B' },
  { label: 'Average Efficiency Gain', value: '45%' },
  { label: 'Client Retention', value: '100%' },
];

export default function PortfolioPage() {
  return (
    <main className="bg-dark-primary min-h-screen">
      {/* Section 1 — Hero */}
      <ImmersiveHero
        title="Our Portfolio"
        highlightedWord="Portfolio"
        subheading="A showcase of high-impact digital products and AI solutions delivered for global industry leaders."
        images={portfolioImages}
      />

      {/* Section 2 — Case Study Grid */}
      <PageSection id="projects" className="bg-[#030712]">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Exploring how we solve complex technological challenges through innovation, precision, and world-class engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="group relative rounded-[4rem] overflow-hidden bg-[#0F172A] border border-white/5 hover:border-brand-lavender/30 transition-all duration-1000 shadow-22xl"
            >
              <div className="aspect-[16/11] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-8 left-8 py-2 px-6 rounded-full bg-brand-lavender/10 backdrop-blur-3xl border border-brand-lavender/20">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-lavender">{project.category}</span>
                </div>
              </div>

              <div className="p-16 pt-12 relative">
                <div className="flex justify-between items-start mb-10">
                  <h3 className="text-4xl font-bold text-white group-hover:text-brand-lavender transition-colors duration-500 tracking-tight leading-none">{project.title}</h3>
                  <div className="p-5 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-lavender group-hover:border-brand-lavender group-hover:shadow-glow-lavender transition-all duration-700 -mt-2">
                    <ArrowUpRight className="w-6 h-6 text-white group-hover:text-dark-primary transition-colors" />
                  </div>
                </div>
                <p className="text-text-secondary text-xl leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-700 line-clamp-2">{project.description}</p>
                
                <div className="mt-12 pt-10 border-t border-white/5 flex gap-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-text-muted mb-2">Duration</span>
                        <span className="text-sm font-bold text-white/80">4 Months</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-text-muted mb-2">Role</span>
                        <span className="text-sm font-bold text-white/80">Full-Cycle Eng.</span>
                    </div>
                </div>
              </div>
              
              {/* Animated Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lavender/5 blur-[60px] group-hover:bg-brand-lavender/20 transition-colors duration-1000" />
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Section 3 — Featured Project (Split Layout) */}
      <PageSection id="featured" className="bg-black">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
            >
                 <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-brand-lavender text-sm font-bold uppercase tracking-widest mb-8">
                    Featured Project
                 </span>
                 <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                    Quantum <span className="gradient-text">Operating System</span>
                 </h2>
                 <p className="text-xl text-text-secondary leading-relaxed mb-10">
                    We partnered with QuantumCore to design the first intuitive interface for enterprise quantum computing. Our team reduced complex qubit manipulations into elegant, visual workflows.
                 </p>
                 <ul className="space-y-4 mb-12">
                    {['Zero-latency visualization', 'Adaptive AI error correction', 'Cloud-scale orchestration'].map((item) => (
                        <li key={item} className="flex items-center gap-4 text-white font-medium">
                            <div className="w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_10px_rgba(147,51,234,1)]" />
                            {item}
                        </li>
                    ))}
                 </ul>
                 <button className="text-white font-bold flex items-center gap-2 group border-b border-white/20 pb-2 hover:border-brand-purple transition-colors">
                    View Full Case Study <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-[4rem] overflow-hidden glass-effect p-1"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/40 to-brand-blue/40 mix-blend-overlay opacity-60" />
                <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Featured Platform" 
                    className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                />
                
                {/* Floating UI Mockup Element */}
                <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center p-12"
                >
                    <div className="w-full h-full border border-white/20 rounded-3xl bg-white/5 backdrop-blur-3xl shadow-2xl flex items-center justify-center">
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 rounded-full bg-brand-purple/20 border border-brand-purple/30 mx-auto mb-6 flex items-center justify-center">
                                <ArrowUpRight className="w-10 h-10 text-white" />
                            </div>
                            <p className="text-white text-2xl font-bold tracking-tight">Active Pulse Engine</p>
                            <div className="mt-6 flex justify-center gap-2">
                                <div className="w-12 h-1 bg-brand-purple rounded-full" />
                                <div className="w-4 h-1 bg-white/20 rounded-full" />
                                <div className="w-4 h-1 bg-white/20 rounded-full" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
         </div>
      </PageSection>

      {/* Section 4 — Client Impact */}
      <PageSection id="impact" className="bg-[#030712]">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 px-12">
            {metrics.map((metric, idx) => (
                <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        type: 'spring', 
                        stiffness: 100, 
                        delay: idx * 0.1,
                        duration: 1
                    }}
                    viewport={{ once: true }}
                    className="text-center relative group"
                >
                    <div className="absolute inset-0 bg-brand-lavender/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <h3 className="text-6xl md:text-[5.5rem] font-black text-white mb-6 tracking-tighter block relative z-10 leading-none">
                        <span className="gradient-text">{metric.value}</span>
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted relative z-10">{metric.label}</p>
                </motion.div>
            ))}
        </div>
      </PageSection>

      {/* Section 5 — CTA */}
      <CTASection />
    </main>
  );
}
