'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowUpRight, Layout, Code2, Rocket, Brain, Stethoscope, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: 'Product Design',
    link: '/services',
    description: 'End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.',
    services: ['User Research & Strategy', 'UX Flows & Wireframes', 'UI Systems & Prototypes', 'Design Ops & Dev Handoff'],
    tools: ['Figma', 'Sketch', 'Adobe XD', 'Blender'],
    icon: Layout,
  },
  {
    id: '02',
    title: 'Development',
    link: '/services',
    description: 'Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps.',
    services: ['Frontend Platforms (React / Next)', 'Backend APIs & Microservices (Node)', 'Mobile & Cross-platform (Flutter)', 'CI/CD & Cloud Ops (Docker)'],
    tools: ['React', 'Next.js', 'Node', 'TypeScript', 'Docker'],
    icon: Code2,
  },
  {
    id: '03',
    title: 'GTM Strategy',
    link: '/services',
    description: 'Data-driven go-to-market for SaaS and AI—clear positioning, smart pricing, and repeatable growth loops.',
    services: ['ICP & Segmentation', 'Positioning, Narrative & Messaging', 'Pricing & Packaging', 'Demand Gen & Content Engine'],
    tools: ['HubSpot', 'GA4', 'Zapier', 'Automation'],
    icon: Rocket,
  },
  {
    id: '04',
    title: 'Healthcare Apps',
    link: '/services',
    description: 'Secure, compliant healthcare software—from telehealth to EHR integrations—built for HIPAA and auditability.',
    services: ['HIPAA & PHI Compliance', 'Telehealth & Patient Portals', 'EHR Integrations (FHIR / HL7)', 'Audit Logging & Access Controls'],
    tools: ['AWS', 'Auth0', 'Cloud Systems'],
    icon: Stethoscope,
  },
  {
    id: '05',
    title: 'AI Development',
    link: '/services',
    description: 'Build production-ready AI—rapid prototyping to deployed models with solid evals, observability, and safety.',
    services: ['LLM Apps & Agents (RAG / Tools)', 'Fine-tuning & Prompt Optimization', 'Model Evals & Monitoring', 'Vision, NLP & Speech Pipelines'],
    tools: ['TensorFlow', 'PyTorch', 'LangChain'],
    icon: Brain,
  },
  {
    id: '06',
    title: 'IoT Development',
    link: '/services',
    description: 'From device firmware to cloud ingestion—secure, reliable IoT systems with OTA updates and real-time telemetry.',
    services: ['Embedded Firmware', 'BLE / Zigbee / LoRA', 'MQTT & Stream Processing', 'Edge AI & OTA Update Pipelines'],
    tools: ['Raspberry Pi', 'MQTT', 'Edge Systems'],
    icon: Cpu,
  },
];

function ServiceCard({
  id,
  title,
  description,
  services,
  active,
}: (typeof servicesData)[number] & { active: boolean }) {
  const bgClass = active
    ? 'lg:bg-primary bg-cover bg-bottom-right bg-no-repeat'
    : 'bg-cover bg-bottom-right bg-no-repeat';

  return (
    <div className="w-full hover:scale-[1.02] block duration-500 transition-transform ease-out group cursor-pointer">
      <div
        className={`p-px grow shrink-0 relative border border-zinc-600 lg:border-zinc-700 ring-1 lg:ring-0 ring-white/20 ring-inset shadow-none overflow-hidden rounded-3xl w-full h-[560px] ${bgClass} duration-500 ${active ? 'scale-100' : 'scale-90'}`}
      >
        <div className="px-5 py-8 sm:py-10 sm:px-10 h-full relative z-10">
          <div className={`w-full h-full duration-200 ${bgClass} absolute inset-0 rounded-3xl`} />
          <div className="h-full relative">
            <div className="-rotate-45 absolute right-0 top-0 overflow-hidden size-8 sm:size-9 lg:size-10">
              <div className="relative group-hover:translate-x-full transition-transform duration-300 ease-[cubic-bezier(.15,-0.26,.43,1.41)]">
                <ArrowUpRight className="size-full" />
                <ArrowUpRight className="size-full absolute right-full top-0" />
              </div>
            </div>

            <div className={`relative h-full z-10 duration-500 ${active ? '-translate-y-full' : ''}`}>
              <div className="flex flex-col justify-between h-full">
                <h4 className="block text-3xl sm:text-4xl font-semibold">{id}</h4>
                <h2 className={`text-xl pr-1 2xl:text-2xl font-semibold origin-top-left transition-transform will-change-transform duration-500 ${active ? 'scale-[1.2] translate-y-full' : 'scale-100'}`}>
                  {title}
                </h2>
              </div>

              <div className="flex flex-col gap-6 justify-between h-full">
                <h2 className="text-xl pr-1 2xl:text-2xl font-semibold opacity-0">{title}</h2>
                <div className="flex justify-between">
                  <p className="text-sm 2xl:text-base">{description}</p>
                </div>
                <div className="flex gap-6 justify-between flex-col sm:flex-row sm:gap-8">
                  <div>
                    <h3 className="text-foreground/60 text-lg">Services</h3>
                    <div className="flex flex-col text-sm gap-1">
                      {services.map((item, i) => (
                        <span key={i}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="block absolute inset-0 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-[radial-gradient(circle,#B4B5ED_0%,#696AAC_40%,transparent_70%)] opacity-10" />
      </div>
    </div>
  );
}

function renderBullet(index: number, className: string) {
  const base = className?.trim().length > 0 ? className : 'swiper-pagination-bullet';
  return `<span class="${base} custom-bullet block w-1 h-7 bg-foreground/70 hover:bg-foreground mx-[3px] transition-transform duration-300 ${index === 0 ? 'active' : index === 1 ? 'neighbor' : ''}"></span>`;
}

function updateBullets(swiper: SwiperType) {
  document.querySelectorAll('.custom-bullet').forEach((el, i) => {
    el.classList.remove('active', 'neighbor');
    if (i === swiper.activeIndex) el.classList.add('active');
    if (i === swiper.activeIndex - 1 || i === swiper.activeIndex + 1)
      el.classList.add('neighbor');
  });
}

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    updateBullets(swiper);
  }, []);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context((self) => {
      const totalWidth = sectionRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      const xDist = totalWidth - windowWidth;

      if (xDist <= 0) return;

      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: -xDist,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: `+=${xDist * 1.5}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.desktop-service-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: pin.scrollTrigger?.animation,
          start: 'left center+=20%',
          end: 'right center-=20%',
          onEnter: () => activateCard(card, i),
          onEnterBack: () => activateCard(card, i),
          onLeave: () => deactivateCard(card, i),
          onLeaveBack: () => deactivateCard(card, i),
        });
      });

      function activateCard(card: HTMLElement, index: number) {
        const isPurple = index % 2 === 0;
        gsap.to(card, {
          backgroundColor: isPurple ? '#5A3FD8' : '#1e1b4b',
          borderColor: isPurple ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
          boxShadow: isPurple ? '0 30px 60px rgba(90, 63, 216, 0.5)' : '0 20px 40px rgba(0, 0, 0, 0.4)',
          scale: 1.05,
          duration: 0.8,
          ease: 'power3.out',
        });

        const title = card.querySelector('.card-title');
        const desc = card.querySelector('.card-desc');
        const footer = card.querySelector('.card-footer');
        const previewTitle = card.querySelector('.preview-title');
        const previewId = card.querySelector('.preview-id');

        gsap.set([title, desc, footer], { visibility: 'visible' });
        gsap.set(previewTitle, { visibility: 'hidden' });

        const tl = gsap.timeline();
        tl.to(previewId, { opacity: 0, y: -20, duration: 0.3 })
          .fromTo(title, { opacity: 0, scale: 0.9, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' })
          .fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
          .fromTo(footer, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4');
      }

      function deactivateCard(card: HTMLElement, index: number) {
        gsap.to(card, {
          backgroundColor: '#0F172A',
          borderColor: 'rgba(255,255,255,0.1)',
          boxShadow: 'none',
          scale: 1,
          duration: 0.5,
          ease: 'power3.inOut',
        });

        const title = card.querySelector('.card-title');
        const desc = card.querySelector('.card-desc');
        const footer = card.querySelector('.card-footer');
        const previewTitle = card.querySelector('.preview-title');
        const previewId = card.querySelector('.preview-id');

        gsap.to([title, desc, footer], {
          opacity: 0,
          y: 20,
          duration: 0.4,
          onComplete: () => {
            gsap.set([desc, footer, title], { visibility: 'hidden' });
          },
        });

        gsap.set([previewTitle, previewId], { visibility: 'visible' });
        gsap.fromTo([previewTitle, previewId], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 15;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 15;
        gsap.to('.desktop-service-card', {
          xPercent: xPos,
          yPercent: yPos,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      self.add(() => window.removeEventListener('mousemove', handleMouseMove));
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8 mb-8 lg:mb-16">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
          Our Services
        </h2>
        <p className="text-base lg:text-xl text-text-secondary leading-relaxed max-w-xl">
          We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
        </p>
      </div>

      {/* Desktop: GSAP horizontal scroll with pinning */}
      {isDesktop && (
        <div ref={containerRef} className="bg-transparent">
          <div ref={triggerRef} className="overflow-hidden relative min-h-screen py-16">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-br from-brand-purple/5 via-transparent to-brand-blue/5 opacity-50" />
            </div>

            <div ref={sectionRef} className="flex h-[70vh] items-center px-[10vw] gap-10 w-fit relative z-10 whitespace-nowrap">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  className="desktop-service-card shrink-0 w-[450px] h-[580px] rounded-3xl border border-white/5 bg-[#0F172A] p-10 flex flex-col justify-between group relative overflow-hidden transition-all duration-700 whitespace-normal shadow-2xl"
                >
                  <div className="flex justify-between items-start w-full relative z-10">
                    <div className="flex flex-col gap-1">
                      <span className="preview-id text-4xl font-bold text-white/10 font-display">{service.id}</span>
                      <h2 className="card-title text-3xl font-bold text-white invisible opacity-0 whitespace-nowrap">{service.title}</h2>
                    </div>
                    <div className="p-3 rounded-full border border-white/10 bg-white/5 group-hover:bg-brand-purple/20 transition-all duration-300">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="relative z-10 grow flex items-center pt-4">
                    <p className="card-desc text-lg text-white/90 leading-relaxed invisible opacity-0">{service.description}</p>
                  </div>

                  <div className="relative z-10 w-full mt-auto">
                    <h3 className="preview-title text-3xl font-bold text-white block">{service.title}</h3>
                    <div className="card-footer invisible opacity-0 flex justify-between gap-6 border-t border-white/10 pt-8 mt-6">
                      <div className="flex-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Core Services</h4>
                        <ul className="flex flex-col gap-2.5">
                          {service.services.slice(0, 4).map((item) => (
                            <li key={item} className="text-[13px] text-white/80 flex items-center gap-2.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-lavender/40" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.tools.slice(0, 4).map((tool) => (
                            <span key={tool} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-white/70">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                    <div className="grid grid-cols-4 gap-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-white rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile/Tablet: Swiper with pagination + navigation */}
      {!isDesktop && (
        <div id="service-cards">
          <div className="flex mb-8 justify-between items-center">
            <button
              aria-label="Previous slide"
              className={`px-5 border border-foreground/30 rounded-full transition-colors slider-prev ${isBeginning ? 'opacity-30 pointer-events-none' : 'hover:bg-foreground/10 cursor-pointer'}`}
            >
              <ChevronLeft className="size-7 sm:size-10" />
            </button>
            <div className="slider-pagination flex cursor-pointer" />
            <button
              aria-label="Next slide"
              className={`px-5 border border-foreground/30 rounded-full transition-colors slider-next ${isEnd ? 'opacity-30 pointer-events-none' : 'hover:bg-foreground/10 cursor-pointer'}`}
            >
              <ChevronRight className="size-7 sm:size-10" />
            </button>
          </div>

          <Swiper
            className="overflow-visible w-full"
            slidesPerView={1}
            slidesOffsetAfter={30}
            spaceBetween={5}
            modules={[Navigation, Pagination]}
            navigation={{ nextEl: '.slider-next', prevEl: '.slider-prev' }}
            pagination={{ el: '.slider-pagination', clickable: true, renderBullet }}
            onSwiper={handleSlideChange}
            onSlideChange={handleSlideChange}
            style={{ overflow: 'visible' }}
            touchRatio={2}
            threshold={2}
            touchAngle={60}
            resistance
            resistanceRatio={0.5}
            longSwipesRatio={0.3}
            longSwipesMs={200}
            shortSwipes
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 5, slidesOffsetAfter: 0 },
            }}
          >
            {servicesData.map((service, index) => (
              <SwiperSlide key={service.title}>
                <div className="service-card w-full shrink-0">
                  <ServiceCard active={activeIndex === index} {...service} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
