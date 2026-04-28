'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';
import { Mail, Phone, MapPin, ArrowUpRight, ChevronDown, CheckCircle2, Linkedin, Facebook, Instagram } from 'lucide-react';
import { AnimatedBackground } from '@/components/home/AnimatedBackground';
import { PageSection } from '@/components/layout/PageSection';
import { GlobalNetworkSphere } from '@/components/contact/GlobalNetworkSphere';
import { MeetingModal } from '@/components/contact/MeetingModal';
import { ConsultationSection } from '@/components/contact/ConsultationSection';
import { submitContact } from '@/app/_actions/contact';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@tamxai.com', href: 'mailto:info@tamxai.com' },
  { icon: Phone, label: 'Phone', value: '+92 3353898844', href: 'tel:+923353898844' },
  { icon: MapPin, label: 'HQ', value: 'Regional Plan 9, NASTP', href: '#' },
];

const socials = [
  { name: 'LinkedIn', icon: Linkedin },
  { name: 'Facebook', icon: Facebook },
  { name: 'Instagram', icon: Instagram },
];

const budgets = [
  '<$25k',
  '$25k - $100k',
  '$100k - $500k',
  '$500k+',
];

const countryCodes = [
  { code: '+1', flag: '🇺🇸' },
  { code: '+44', flag: '🇬🇧' },
  { code: '+971', flag: '🇦🇪' },
  { code: '+65', flag: '🇸🇬' },
  { code: '+92', flag: '🇵🇰' },
];

const mapNodes = [
  { city: 'San Francisco', top: '35%', left: '15%', active: true },
  { city: 'London', top: '25%', left: '46%', active: true },
  { city: 'Dubai', top: '45%', left: '62%', active: true },
  { city: 'Singapore', top: '65%', left: '82%', active: true },
];

interface ContactClientProps {
  serviceNames: string[]
  productNames: string[]
}

export function ContactClient({ serviceNames, productNames }: ContactClientProps) {
  const technicalFocusOptions = {
    services: serviceNames,
    products: productNames,
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    flag: '🇺🇸',
    service: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'service' | 'budget' | 'country' | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<'services' | 'products' | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { finished } = usePreloader();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectOption = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    const result = await submitContact({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      countryCode: formData.countryCode,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
    });
    setIsSubmitting(false);
    if (result.error) {
      setSubmitError(result.error);
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <main className="bg-dark-primary min-h-screen relative selection:bg-brand-lavender/30">
      <AnimatedBackground />

      {/* SECTION 1 — Cinematic 3D Hero */}
      <section
        ref={heroRef}
        className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden border-b border-white/5"
      >
        <GlobalNetworkSphere />

        <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="container mx-auto px-6 relative z-10 text-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={finished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-purple/10 border border-brand-lavender/20 text-brand-lavender font-bold text-sm uppercase tracking-widest mb-8 md:mb-12"
            >
                <div className="size-2 rounded-full bg-brand-lavender animate-pulse" />
                Open for Global Partnerships
            </motion.div>

            <div className="relative w-full mb-12 flex justify-center">
                <div className="relative w-full max-w-[1000px]">
                    <h2
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-bold text-nowrap text-center opacity-[0.03] pointer-events-none select-none z-0"
                    >
                        TAMX.AI &nbsp; TAMX.AI &nbsp; TAMX.AI
                    </h2>

                    <h1
                        className="relative z-10 text-3xl/[1.7rem] sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-light text-center sm:text-left mx-auto sm:w-[500px] md:w-[660px] xl:w-[830px] 2xl:w-[1000px]"
                    >
                        <motion.div
                            initial={{ x: 150, opacity: 0 }}
                            animate={finished ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
                            transition={{ duration: 2, ease: 'anticipate' }}
                            className="flex justify-center sm:justify-start"
                        >
                            <div className="overflow-hidden py-2 md:py-3">
                                <span>Let&#39;s </span>
                                <span className="italic font-bold pr-2">Build Something</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -150, opacity: 0 }}
                            animate={finished ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
                            transition={{ duration: 2, ease: 'anticipate' }}
                            className="text-right mt-0 flex justify-center sm:justify-end"
                        >
                            <div className="overflow-hidden py-2 md:py-3">
                                <span className="italic font-bold gradient-text">Together </span>
                                <span>With TAMx</span>
                            </div>
                        </motion.div>
                    </h1>
                </div>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={finished ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1.8, ease: 'anticipate', delay: 0.4 }}
                className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-16 leading-relaxed opacity-70 relative z-10"
            >
                Ready to transform your business with intelligent digital systems? <br className="hidden md:block" />
                Our team is ready to help solve your most complex challenges.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={finished ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1.8, ease: 'anticipate', delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
                <button
                  onClick={() => document.getElementById('contact-content')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative flex items-center gap-4 px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 bg-white shadow-glow-lavender text-dark-primary font-bold text-base"
                >
                    Get Your Project →
                </button>
                <button
                  onClick={() => setIsSchedulerOpen(true)}
                  className="group relative flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-base hover:bg-white/5 transition-all duration-500"
                >
                    Schedule a Consultation
                </button>
            </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
        >
            <div className="w-[2px] h-12 bg-gradient-to-b from-brand-lavender to-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted">Explore</span>
        </motion.div>
      </section>



      {/* SECTION 2 — Contact Form + Info */}
      <PageSection id="contact-content" fullHeight={false} className="bg-transparent py-20 md:py-32 min-h-screen flex items-center">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side: Text & Info */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="p-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-lavender w-fit mb-8 font-bold text-sm uppercase tracking-widest">
                    Enterprise Inquiry
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-tighter">
                    Ready to <span className="gradient-text">Scale?</span>
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-lg opacity-70">
                    Use our secure form to submit your requirements. Our enterprise solutions team typically responds within 4 business hours to high-priority inquiries.
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
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:bg-brand-purple group-hover:border-brand-purple transition-all duration-500 shadow-xl group-hover:shadow-glow-purple">
                                <info.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-1">{info.label}</p>
                                <p className="text-xl font-medium text-white group-hover:text-brand-lavender transition-colors">{info.value}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="pt-12 border-t border-white/5">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted mb-8">Global Networks</p>
                    <div className="flex flex-wrap gap-4">
                        {socials.map((social) => (
                            <button key={social.name} className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-brand-lavender transition-all duration-300">
                                {social.name}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Right Side: Enhanced Form */}
            <motion.div
                initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="w-full relative"
            >
                <div className="absolute -inset-4 bg-brand-lavender/10 blur-[100px] opacity-20 pointer-events-none" />

                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-16 rounded-[3rem] bg-white/5 border border-brand-lavender/20 backdrop-blur-3xl text-center"
                    >
                        <div className="size-24 rounded-full bg-brand-lavender/20 flex items-center justify-center mx-auto mb-8 shadow-glow-lavender">
                            <CheckCircle2 className="w-12 h-12 text-brand-lavender" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Request Received</h3>
                        <p className="text-text-secondary opacity-70 mb-8">Our strategy team is reviewing your project. Expect a response within 4-12 hours.</p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="px-8 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                        >
                            Send Another
                        </button>
                    </motion.div>
                ) : (
                    <form className="w-full flex flex-col gap-8 relative z-10" onSubmit={handleSubmit}>
                        {/* Name Row */}
                        <div className="flex w-full gap-8 flex-wrap sm:flex-nowrap">
                            <div className="w-full flex flex-col group/input">
                                <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2 group-focus-within/input:text-brand-lavender transition-colors">First Name</label>
                                <input
                                    placeholder="Enter first name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="outline-none border-b-2 border-white/10 focus:border-brand-lavender transition-all duration-500 bg-transparent py-4 px-1 text-white text-xl placeholder:opacity-0 focus:placeholder:opacity-30"
                                    required
                                    type="text"
                                />
                            </div>
                            <div className="w-full flex flex-col group/input">
                                <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2 group-focus-within/input:text-brand-lavender transition-colors">Last Name</label>
                                <input
                                    placeholder="Enter last name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="outline-none border-b-2 border-white/10 focus:border-brand-lavender transition-all duration-500 bg-transparent py-4 px-1 text-white text-xl placeholder:opacity-0 focus:placeholder:opacity-30"
                                    required
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Email Row */}
                        <div className="flex w-full flex-col group/input">
                            <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2 group-focus-within/input:text-brand-lavender transition-colors">Business Email</label>
                            <input
                                placeholder="name@company.com"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="outline-none border-b-2 border-white/10 focus:border-brand-lavender transition-all duration-500 bg-transparent py-4 px-1 text-white text-xl placeholder:opacity-0 focus:placeholder:opacity-30"
                                required
                                type="email"
                            />
                        </div>

                        {/* Phone Row */}
                        <div className="flex w-full flex-col group/input">
                            <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2 group-focus-within/input:text-brand-lavender transition-colors">Phone Number</label>
                            <div className="flex gap-4">
                                <div className="relative w-32" ref={openDropdown === 'country' ? dropdownRef : null}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenDropdown(openDropdown === 'country' ? null : 'country')}
                                        className="w-full outline-none border-b-2 border-white/10 focus:border-brand-lavender transition-all duration-300 bg-transparent py-4 px-1 cursor-pointer text-left flex items-center justify-between"
                                    >
                                        <span className="text-white text-xl">
                                            {formData.flag} {formData.countryCode}
                                        </span>
                                        <ChevronDown className={`w-5 h-5 text-brand-lavender transition-transform duration-300 ${openDropdown === 'country' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openDropdown === 'country' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 w-full mt-2 bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden z-20 shadow-2xl backdrop-blur-xl max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
                                            >
                                                {countryCodes.map((item) => (
                                                    <div
                                                        key={item.code}
                                                        onClick={() => {
                                                            setFormData(p => ({ ...p, countryCode: item.code, flag: item.flag }));
                                                            setOpenDropdown(null);
                                                        }}
                                                        className="px-6 py-4 flex items-center justify-between hover:bg-white/5 cursor-pointer text-white/90 transition-colors border-b border-white/5 last:border-0"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xl">{item.flag}</span>
                                                            <span className="font-medium">{item.code}</span>
                                                        </div>
                                                        {formData.countryCode === item.code && <CheckCircle2 className="w-4 h-4 text-brand-lavender" />}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <input
                                    placeholder="(555) 000-0000"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="flex-1 outline-none border-b-2 border-white/10 focus:border-brand-lavender transition-all duration-500 bg-transparent py-4 px-1 text-white text-xl"
                                    required
                                    type="tel"
                                />
                            </div>
                        </div>

                        {/* Dropdowns Row */}
                        <div className="flex w-full gap-8 flex-wrap sm:flex-nowrap">
                            <div className="w-full flex flex-col" ref={openDropdown === 'service' ? dropdownRef : null}>
                                <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2">Technical Focus</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setOpenDropdown(openDropdown === 'service' ? null : 'service')}
                                        className="w-full outline-none border-b-2 border-white/10 focus:border-brand-lavender transition-all duration-300 bg-transparent py-4 px-1 cursor-pointer text-left flex items-center justify-between"
                                    >
                                        <span className={`text-xl ${formData.service ? 'text-white' : 'text-white/30'}`}>
                                            {formData.service || 'Select Focus...'}
                                        </span>
                                        <ChevronDown className={`w-5 h-5 text-brand-lavender transition-transform duration-300 ${openDropdown === 'service' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openDropdown === 'service' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                onMouseLeave={() => setHoveredCategory(null)}
                                                className="absolute top-full left-0 mt-2 flex gap-2 z-20"
                                            >
                                                {/* Main Categories Menu */}
                                                <div className="w-48 bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                                                    {(['services', 'products'] as const).map((cat) => (
                                                        <div
                                                            key={cat}
                                                            onMouseEnter={() => setHoveredCategory(cat)}
                                                            className={`px-6 py-4 flex items-center justify-between cursor-pointer transition-colors border-b border-white/5 last:border-0 ${hoveredCategory === cat ? 'bg-white/10 text-brand-lavender' : 'text-white/70 hover:bg-white/5'}`}
                                                        >
                                                            <span className="font-bold capitalize">{cat}</span>
                                                            <ArrowUpRight className={`w-4 h-4 transition-transform ${hoveredCategory === cat ? 'translate-x-1 -translate-y-1' : 'opacity-30'}`} />
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Sub-menu (Hover Reveal) */}
                                                <AnimatePresence>
                                                    {hoveredCategory && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -10 }}
                                                            className="w-64 bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
                                                        >
                                                            <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 py-2">
                                                                {technicalFocusOptions[hoveredCategory].map((item) => (
                                                                    <div
                                                                        key={item}
                                                                        onClick={() => selectOption('service', item)}
                                                                        className="px-6 py-3 flex items-center justify-between hover:bg-white/5 cursor-pointer text-white/90 transition-colors group/item"
                                                                    >
                                                                        <span className="text-sm font-medium group-hover/item:text-brand-lavender">{item}</span>
                                                                        {formData.service === item && <CheckCircle2 className="w-4 h-4 text-brand-lavender" />}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className="w-full flex flex-col" ref={openDropdown === 'budget' ? dropdownRef : null}>
                                <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2">Project Scale</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
                                        className="w-full outline-none border-b-2 border-white/10 focus:border-brand-lavender transition-all duration-300 bg-transparent py-4 px-1 cursor-pointer text-left flex items-center justify-between"
                                    >
                                        <span className={`text-xl ${formData.budget ? 'text-white' : 'text-white/30'}`}>
                                            {formData.budget || 'Select Scale...'}
                                        </span>
                                        <ChevronDown className={`w-5 h-5 text-brand-lavender transition-transform duration-300 ${openDropdown === 'budget' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openDropdown === 'budget' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 w-full mt-2 bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden z-20 shadow-2xl backdrop-blur-xl max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
                                            >
                                                {budgets.map((item) => (
                                                    <div
                                                        key={item}
                                                        onClick={() => selectOption('budget', item)}
                                                        className="px-6 py-4 flex items-center justify-between hover:bg-white/5 cursor-pointer text-white/90 transition-colors border-b border-white/5 last:border-0"
                                                    >
                                                        <span className="font-medium">{item}</span>
                                                        {formData.budget === item && <CheckCircle2 className="w-4 h-4 text-brand-lavender" />}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Message Row */}
                        <div className="group/input">
                            <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2 group-focus-within/input:text-brand-lavender transition-colors">Brief Description</label>
                            <textarea
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Describe your technical requirements..."
                                className="w-full outline-none border-b-2 border-white/10 focus:border-brand-lavender transition-all duration-500 bg-transparent py-4 px-1 text-white text-xl resize-none placeholder:opacity-0 focus:placeholder:opacity-30"
                                required
                            />
                        </div>

                        {submitError && (
                            <p className="text-red-400 text-sm font-medium">{submitError}</p>
                        )}

                        <div className="flex flex-wrap gap-6 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`group relative flex items-center gap-4 px-10 py-4 rounded-full overflow-hidden transition-all duration-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 bg-white shadow-glow-lavender'}`}
                            >
                                <div className="absolute inset-0 bg-brand-lavender translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
                                <span className={`relative z-10 transition-colors duration-500 font-bold text-sm md:text-base ${isSubmitting ? 'text-dark-primary' : 'text-dark-primary group-hover:text-white'}`}>
                                    {isSubmitting ? 'Submitting Request...' : 'Initialize Project →'}
                                </span>
                                {isSubmitting ? (
                                    <div className="relative z-10 size-5 border-b-2 border-dark-primary rounded-full animate-spin" />
                                ) : (
                                    <div className="relative z-10 w-8 h-8 rounded-full bg-dark-primary/5 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10">
                                        <ArrowUpRight className="w-5 h-5 text-dark-primary group-hover:text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => document.getElementById('meeting')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative flex items-center gap-4 px-10 py-4 rounded-full border border-brand-lavender/30 text-white font-bold text-sm md:text-base hover:bg-white/5 transition-all duration-500 hover:border-brand-lavender/60 active:scale-95"
                            >
                                <span>Schedule Meeting</span>
                                <ArrowUpRight className="w-5 h-5 text-brand-lavender group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
         </div>
      </PageSection>

      {/* SECTION 3 — Consultation Scheduler */}
      <ConsultationSection onOpenScheduler={() => setIsSchedulerOpen(true)} />

      {/* SECTION 4 — Global Headquarters (Map) */}
      <PageSection id="location" fullHeight={false} className="bg-transparent py-20 md:py-32 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 text-center">
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-brand-lavender font-bold uppercase tracking-widest text-xs mb-4"
            >
                Global Presence
            </motion.p>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tighter"
            >
                Engineered <span className="gradient-text">Anywhere.</span>
            </motion.h2>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto opacity-60">Our specialized engineering teams operate across global technical hubs to support enterprise deployments in real-time.</p>
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="max-w-[1400px] mx-auto w-full aspect-[4/3] sm:aspect-video lg:aspect-[21/9] bg-white/5 rounded-[2rem] md:rounded-[4rem] border border-white/5 relative overflow-hidden group shadow-2xl"
        >
            {/* World Map Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000" />

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    d="M 15% 35% Q 30% 20% 46% 25% Q 55% 35% 62% 45% Q 72% 55% 82% 65%"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    className="animate-flowing-line"
                />
                <defs>
                    <linearGradient id="lineGradient" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Pulsing Location Pins */}
            {mapNodes.map((node) => (
                <div
                    key={node.city}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group/node"
                    style={{ top: node.top, left: node.left }}
                >
                    <div className="relative">
                        <div className="size-4 rounded-full bg-brand-lavender relative z-10 shadow-glow-lavender" />
                        <div className="absolute inset-0 size-4 rounded-full bg-brand-lavender animate-ping opacity-40" />
                        <div className="absolute inset-0 size-8 -translate-x-1/4 -translate-y-1/4 rounded-full bg-brand-lavender/20 animate-pulse" />

                        {/* Label */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 rounded-xl bg-dark-primary/90 border border-white/10 backdrop-blur-xl whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-all duration-300 translate-y-2 group-hover/node:translate-y-0">
                            <span className="text-white font-bold text-sm tracking-tight">{node.city}</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Global Mesh Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 via-transparent to-dark-primary/20 pointer-events-none" />
        </motion.div>
      </PageSection>

      <MeetingModal isOpen={isSchedulerOpen} onClose={() => setIsSchedulerOpen(false)} />
    </main>
  );
}
