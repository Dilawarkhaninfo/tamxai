'use client';

import React from 'react';
import { ImmersiveHero } from '@/components/ui/ImmersiveHero';
import { PageSection } from '@/components/layout/PageSection';
import { CTASection } from '@/components/home/CTASection';
import { motion } from 'framer-motion';
import { Layout, Code2, Rocket, Brain, Stethoscope, Cpu, Search, PencilRuler, PlayCircle, BarChart3 } from 'lucide-react';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';

const servicesImages = [
  'https://images.unsplash.com/photo-1551288049-bbbda5366991?q=80&w=2070&auto=format&fit=crop', // Data dashboard
  'https://images.unsplash.com/photo-1518186239751-2467ef758332?q=80&w=2072&auto=format&fit=crop', // Futuristic lab
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop', // High tech manufacture
];

const expandedServices = [
  { icon: Layout, title: 'Product Design', desc: 'Crafting premium, user-centric experiences that define modern digital products.' },
  { icon: Code2, title: 'AI Software Development', desc: 'Developing intelligent, high-performance applications. (WEB & APP Development)' },
  { icon: Brain, title: 'Research & Development', desc: 'Pioneering frontier technologies through deep AI research, experimental prototyping, and technical feasibility studies.' },
  { icon: Rocket, title: 'Digital Marketing', desc: 'Driving exponential growth through data-driven performance marketing, global scaling, and strategic positioning.' },
  { icon: Stethoscope, title: 'SEO', desc: 'Dominating search landscapes with professional technical SEO, content authority, and organic growth strategies.' },
  { icon: Cpu, title: 'Solutions', desc: 'Comprehensive enterprise-grade solutions designed to streamline operations and accelerate digital transformation.' },
];

const workflowSteps = [
  { icon: Search, title: 'Discovery', desc: 'Deep dive into requirements, market analysis, and user needs.' },
  { icon: PencilRuler, title: 'Design', desc: 'Prototyping and visual identity development for seamless UX.' },
  { icon: Code2, title: 'Development', desc: 'Agile sprints with continuous integration and quality assurance.' },
  { icon: PlayCircle, title: 'Deployment', desc: 'Secure rollout and cloud infrastructure optimization.' },
  { icon: BarChart3, title: 'Optimization', desc: 'Post-launch monitoring and iterative feature refinement.' },
];

export default function ServicesPage() {
  return (
    <main className="bg-dark-primary min-h-screen">
      {/* Section 1 — Hero */}
      <ImmersiveHero
        title="Our Services"
        highlightedWord="Services"
        subheading="Comprehensive digital engineering and strategic consulting tailored for the AI-first era."
        images={servicesImages}
      />

      {/* Section 2 — Service Cards Grid */}
      <PageSection id="services-grid" className="bg-[#030712]" fullHeight={false}>
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Elite <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From initial concept to full-scale deployment, we offer a specialized suite of services to drive your digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {expandedServices.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="p-12 rounded-[3.5rem] bg-[#0F172A] border border-white/5 hover:border-brand-lavender/30 hover:bg-brand-lavender/[0.02] transition-all duration-700 group relative overflow-hidden shadow-22xl"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
                <service.icon className="w-32 h-32 text-white" />
              </div>
              <div className="p-5 rounded-2xl bg-brand-lavender/10 border border-brand-lavender/20 text-brand-lavender w-fit mb-10 group-hover:scale-110 group-hover:bg-brand-lavender/20 transition-all duration-500 shadow-glow-lavender">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-brand-lavender transition-colors duration-300">{service.title}</h3>
              <p className="text-text-secondary text-lg leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{service.desc}</p>
              
              {/* Bottom Decoration */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-lavender/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Section 3 — Workflow Process */}
      <PageSection id="workflow" className="bg-black overflow-hidden" fullHeight={false}>
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Workflow</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A battle-tested methodology that ensures precision, speed, and reliability throughout the development lifecycle.
          </p>
        </div>

        <div className="h-[800px] w-full relative">
          <RadialOrbitalTimeline 
            timelineData={workflowSteps.map((step, idx) => ({
              id: idx + 1,
              title: step.title,
              date: `Phase 0${idx + 1}`,
              content: step.desc,
              category: "Process",
              icon: step.icon,
              relatedIds: [
                idx > 0 ? idx : null,
                idx < workflowSteps.length - 1 ? idx + 2 : null
              ].filter((id): id is number => id !== null),
              status: idx === 0 ? "completed" : idx === 1 ? "in-progress" : "pending",
              energy: 100 - (idx * 15)
            }))} 
          />
        </div>
      </PageSection>

      {/* Section 4 — Technology Platform */}
      <PageSection id="platform" className="bg-[#030712]" fullHeight={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center p-12 md:p-20 rounded-[3.5rem] bg-[#0F172A]/50 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
            {/* Subtle Gradient Background */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/5 blur-[100px] rounded-full group-hover:bg-brand-blue/10 transition-colors duration-700" />
            
            <motion.div
               initial={{ opacity: 0, x: -40 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="relative z-10"
            >
                <div className="p-3 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-light w-fit mb-6 text-sm font-bold uppercase tracking-widest">
                    Enterprise Grade
                </div>
                <h2 className="text-4xl md:text-[56px] font-extralight text-white mb-8 leading-tight font-display">
                    Optimized for <br />
                    <span className="gradient-text font-normal">Scale & Speed</span>
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed mb-10 font-sans opacity-80">
                    Our platform integrates modern DevOps practices, automated testing, and cloud-native architecture to deliver robust solutions that grow with your business.
                </p>
                <div className="grid grid-cols-2 gap-12">
                    <div className="group/stat">
                        <p className="text-4xl font-bold text-white mb-2 group-hover/stat:text-brand-blue transition-colors duration-300">99.9%</p>
                        <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">Uptime SLA</p>
                    </div>
                    <div className="group/stat">
                        <p className="text-4xl font-bold text-white mb-2 group-hover/stat:text-brand-purple transition-colors duration-300">&lt;200ms</p>
                        <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">Edge Latency</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="aspect-square glass-effect rounded-[3rem] p-12 flex flex-col justify-center items-center relative overflow-hidden group/viz border border-white/10 bg-white/5 shadow-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-blue/10 pointer-events-none" />
                <div className="relative z-10 grid grid-cols-3 gap-8 md:gap-10">
                    {[...Array(9)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                y: [0, -10, 0],
                                rotateZ: [0, 5, 0],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{ 
                                duration: 3 + i * 0.5, 
                                repeat: Infinity, 
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                            className="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/viz:bg-white/10 transition-colors shadow-inner"
                        >
                            <div className={`w-3 h-3 md:w-5 md:h-5 rounded-full ${i % 2 === 0 ? 'bg-brand-purple' : 'bg-brand-blue'} shadow-[0_0_20px_rgba(147,51,234,0.6)]`} />
                        </motion.div>
                    ))}
                </div>
                <div className="mt-16 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  <p className="text-xs font-bold text-brand-lavender uppercase tracking-[0.3em]">Platform Active</p>
                </div>
            </motion.div>
        </div>
      </PageSection>

      {/* Section 5 — CTA */}
      <div className="relative w-main m-auto mb-40 sm:mb-60 mt-20 sm:mt-32 z-20">
        <CTASection />
      </div>
    </main>
  );
}
