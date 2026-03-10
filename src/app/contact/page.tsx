'use client';

import React from 'react';
import { ImmersiveHero } from '@/components/ui/ImmersiveHero';
import { PageSection } from '@/components/layout/PageSection';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowUpRight } from 'lucide-react';

const contactImages = [
  'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop', // Office / Communication
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // Global network
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', // Circuitry
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@tamx.ai', href: 'mailto:hello@tamx.ai' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 000-TAMX', href: 'tel:+15550008269' },
  { icon: MapPin, label: 'Office', value: 'Silicon Valley, CA', href: '#' },
];

const socials = [
  { name: 'LinkedIn', icon: Globe },
  { name: 'X / Twitter', icon: Globe },
  { name: 'GitHub', icon: Globe },
  { name: 'Dribbble', icon: Globe },
];

export default function ContactPage() {
  return (
    <main className="bg-dark-primary min-h-screen">
      {/* Section 1 — Hero */}
      <ImmersiveHero
        title="Let’s Build Something Together"
        highlightedWord="Together"
        subheading="Ready to transform your business with intelligent digital systems? Our team is standing by to help you solve your most complex challenges."
        images={contactImages}
      />

      {/* Section 2 — Contact Form + Info */}
      <PageSection id="contact-content" className="bg-[#030712]">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left Side: Text & Info */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="p-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-lavender w-fit mb-8 font-bold text-sm uppercase tracking-widest">
                    Contact Us
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                    Start Your <span className="gradient-text">Journey</span> With TAMx
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-lg">
                    Have a vision but need the technical expertise to realize it? Tell us about your project, and our specialists will reach out within 24 hours.
                </p>

                <div className="space-y-8 mb-16">
                    {contactInfo.map((info, idx) => (
                        <motion.a
                            key={info.label}
                            href={info.href}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 group hover:translate-x-2 transition-all duration-300"
                        >
                            <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/5 text-white group-hover:bg-brand-purple group-hover:border-brand-purple transition-all duration-500 shadow-xl">
                                <info.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-1">{info.label}</p>
                                <p className="text-xl font-bold text-white group-hover:text-brand-lavender transition-colors">{info.value}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="pt-12 border-t border-white/5">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted mb-8">Follow Our Progress</p>
                    <div className="flex flex-wrap gap-4">
                        {socials.map((social) => (
                            <button key={social.name} className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-brand-purple transition-all duration-300">
                                {social.name}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
                initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="p-16 rounded-[4rem] bg-[#0F172A] border border-white/5 shadow-22xl relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-lavender/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-lavender/30 to-transparent" />
                
                <h3 className="text-4xl font-bold text-white mb-12 flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-brand-lavender/10 text-brand-lavender">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    Project Inquiry
                </h3>

                <form className="space-y-10 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3 group/input">
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted group-focus-within/input:text-brand-lavender transition-colors">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white focus:outline-none focus:border-brand-lavender transition-all duration-500 placeholder:text-white/5" 
                                placeholder="Dilawar Khan"
                            />
                        </div>
                        <div className="space-y-3 group/input">
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted group-focus-within/input:text-brand-lavender transition-colors">Email Address</label>
                            <input 
                                type="email" 
                                className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white focus:outline-none focus:border-brand-lavender transition-all duration-500 placeholder:text-white/5" 
                                placeholder="hello@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 group/input">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted group-focus-within/input:text-brand-lavender transition-colors">Company / Organization</label>
                        <input 
                            type="text" 
                            className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white focus:outline-none focus:border-brand-lavender transition-all duration-500 placeholder:text-white/5" 
                            placeholder="TAMx Labs"
                        />
                    </div>

                    <div className="space-y-3 group/input">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted group-focus-within/input:text-brand-lavender transition-colors">Project Description</label>
                        <textarea 
                            rows={4}
                            className="w-full px-0 py-4 bg-transparent border-b border-white/10 text-white focus:outline-none focus:border-brand-lavender transition-all duration-500 placeholder:text-white/5 resize-none" 
                            placeholder="Tell us what you're building..."
                        />
                    </div>

                    <button className="group/btn relative w-full py-6 rounded-2xl bg-white text-dark-primary font-bold text-xl flex items-center justify-center gap-4 transition-all duration-500 hover:shadow-glow-lavender hover:scale-[1.02] active:scale-[0.98] mt-12">
                        <span className="relative z-10">Send Inquiry</span>
                        <Send className="w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                </form>
            </motion.div>
         </div>
      </PageSection>

      {/* Section 3 — Global Presence (Map Mockup) */}
      <PageSection id="location" className="bg-black">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="max-w-[1400px] mx-auto rounded-[4rem] aspect-[21/9] bg-[#0F172A] border border-white/5 relative overflow-hidden group shadow-22xl"
        >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-10 group-hover:scale-105 group-hover:opacity-30 transition-all duration-[3000ms]" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/95 via-dark-primary/40 to-transparent" />
            
            <div className="absolute inset-0 p-16 md:p-24 flex flex-col justify-end">
                <div>
                    <div className="p-4 rounded-full bg-brand-lavender/10 border border-brand-lavender/20 text-brand-lavender w-fit mb-8 shadow-glow-lavender">
                        <MapPin className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Global <span className="gradient-text">Headquarters</span></h2>
                    <p className="text-text-secondary text-xl max-w-lg leading-relaxed opacity-70">Our specialized engineering teams operate across major technical hubs to support global deployments in real-time.</p>
                </div>
            </div>

            {/* Pulsing Location Pins */}
            <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-brand-lavender shadow-[0_0_30px_rgba(168,85,247,1)] animate-ping" />
            <div className="absolute top-1/2 left-2/3 w-4 h-4 rounded-full bg-brand-lavender shadow-[0_0_30px_rgba(168,85,247,1)] animate-ping [animation-delay:1s]" />
            <div className="absolute top-1/4 left-3/4 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,1)] animate-ping [animation-delay:2s]" />
        </motion.div>
      </PageSection>

      {/* Section 4 — Final CTA */}
      <PageSection id="consultation" className="bg-[#030712] relative overflow-hidden">
        <div className="text-center relative z-20">
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                Ready for a <span className="gradient-text">Private Consultation?</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12">
                Join our roster of prestige clients and begin your digital transformation today.
            </p>
            <button className="group relative flex items-center gap-4 px-12 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 bg-white mx-auto shadow-2xl">
                <span className="relative z-10 text-dark-primary font-bold text-xl">Schedule Now</span>
                <div className="w-10 h-10 rounded-full bg-dark-primary/5 flex items-center justify-center transition-colors group-hover:bg-dark-primary/10">
                    <ArrowUpRight className="w-6 h-6 text-dark-primary transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            </button>
        </div>
      </PageSection>
    </main>
  );
}
