'use client';

import React from 'react';
import { ImmersiveHero } from '@/components/ui/ImmersiveHero';
import { PageSection } from '@/components/layout/PageSection';
import { CTASection } from '@/components/home/CTASection';
import { motion } from 'framer-motion';
import { Layout, Code2, Rocket, Brain, Stethoscope, Cpu, Search, PencilRuler, PlayCircle, BarChart3 } from 'lucide-react';

const servicesImages = [
  'https://images.unsplash.com/photo-1551288049-bbbda5366991?q=80&w=2070&auto=format&fit=crop', // Data dashboard
  'https://images.unsplash.com/photo-1518186239751-2467ef758332?q=80&w=2072&auto=format&fit=crop', // Futuristic lab
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop', // High tech manufacture
];

const expandedServices = [
  { icon: Layout, title: 'Product Design', desc: 'Crafting intuitive, user-centric experiences that define premium digital products.' },
  { icon: Code2, title: 'Development', desc: 'Building scalable, high-performance applications with modern tech stacks.' },
  { icon: Brain, title: 'AI Engineering', desc: 'Integrating advanced LLMs and predictive models to automate complex workflows.' },
  { icon: Rocket, title: 'GTM Strategy', desc: 'Accelerating product-market fit through data-driven growth frameworks.' },
  { icon: Stethoscope, title: 'Healthcare Solutions', desc: 'Secure, compliant digital health platforms designed for patient impact.' },
  { icon: Cpu, title: 'IoT & Edge AI', desc: 'Real-time telemetry and edge intelligence for smart infrastructure.' },
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
      <PageSection id="services-grid" className="bg-[#030712]">
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
      <PageSection id="workflow" className="bg-black">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Workflow</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A battle-tested methodology that ensures precision, speed, and reliability throughout the development lifecycle.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Animated Gradient Line for timeline */}
          <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-[2px] bg-white/5 md:-translate-x-1/2 hidden sm:block">
            <motion.div 
               className="h-full w-full bg-gradient-to-b from-brand-lavender via-brand-blue to-transparent origin-top"
               initial={{ scaleY: 0 }}
               whileInView={{ scaleY: 1 }}
               transition={{ duration: 1.5, ease: "linear" }}
               viewport={{ once: true }}
            />
          </div>

          <div className="space-y-24">
            {workflowSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 flex ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className={`p-10 md:p-14 rounded-[3.5rem] bg-[#0F172A] border border-white/5 max-w-lg w-full hover:border-brand-lavender/30 transition-all duration-500 shadow-22xl group/step`}>
                    <div className="flex items-center gap-6 mb-8 text-brand-lavender">
                        <step.icon className="w-8 h-8 group-hover/step:scale-110 transition-transform" />
                        <span className="text-sm font-black uppercase tracking-[0.4em] opacity-40">Step 0{idx + 1}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6 leading-tight">{step.title}</h3>
                    <p className="text-text-secondary text-lg leading-relaxed opacity-80">{step.desc}</p>
                  </div>
                </div>

                <div className="relative z-10 p-5 rounded-full bg-dark-primary border-4 border-white/5 group hover:border-brand-lavender/40 transition-all duration-500 shadow-glow-lavender">
                  <div className="p-4 rounded-full bg-brand-lavender/10 text-brand-lavender group-hover:bg-brand-lavender/20 transition-colors">
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Section 4 — Technology Platform */}
      <PageSection id="platform" className="bg-[#030712]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
               initial={{ opacity: 0, x: -40 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
            >
                <div className="p-3 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-light w-fit mb-6 text-sm font-bold uppercase tracking-widest">
                    Enterprise Grade
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                    Optimized for <br />
                    <span className="gradient-text">Scale & Speed</span>
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed mb-10">
                    Our platform integrates modern DevOps practices, automated testing, and cloud-native architecture to deliver robust solutions that grow with your business.
                </p>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-3xl font-bold text-white mb-1">99.9%</p>
                        <p className="text-sm text-text-secondary uppercase tracking-wider">Uptime SLA</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white mb-1">&lt;200ms</p>
                        <p className="text-sm text-text-secondary uppercase tracking-wider">Edge Latency</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, rotateY: 20 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="aspect-square glass-effect rounded-[3rem] p-12 flex flex-col justify-center items-center relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent pointer-events-none" />
                <div className="relative z-10 grid grid-cols-3 gap-6">
                    {[...Array(9)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                y: [0, -10, 0],
                                rotateZ: [0, 5, 0]
                            }}
                            transition={{ 
                                duration: 3 + i, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                            className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                        >
                            <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-brand-purple' : 'bg-brand-blue'} shadow-[0_0_15px_rgba(147,51,234,0.5)]`} />
                        </motion.div>
                    ))}
                </div>
                <p className="mt-12 text-sm font-medium text-brand-lavender uppercase tracking-widest animate-pulse">Platform Active</p>
            </motion.div>
        </div>
      </PageSection>

      {/* Section 5 — CTA */}
      <CTASection />
    </main>
  );
}
