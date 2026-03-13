'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import type { Swiper as SwiperType } from 'swiper';
import type { IconType } from 'react-icons';
import {
  SiFigma, SiSketch, SiCanva, SiFramer, SiInvision, SiSquarespace,
  SiReact, SiFlutter, SiNextdotjs, SiNodedotjs, SiDocker, SiTypescript,
  SiHubspot, SiSalesforce, SiMixpanel, SiZapier, SiMailchimp, SiAirtable,
  SiGooglecloud, SiFirebase, SiCircleci, SiTrustpilot, SiTwilio, SiStripe,
  SiKaggle, SiPytorch, SiOpenai, SiKeras, SiHuggingface, SiTensorflow,
  SiArduino, SiRaspberrypi, SiGrafana, SiApachekafka, SiPlatformio, SiEspressif,
} from 'react-icons/si';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  title: string;
  link: string;
  description: string;
  services: string[];
  toolIcons: IconType[];
}

const servicesData: ServiceItem[] = [
  {
    id: '01',
    title: 'Product Design',
    link: '/services',
    description: 'End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.',
    services: ['User Research & Strategy', 'UX Flows & Wireframes', 'UI Systems & Prototypes', 'Design Ops & Dev Handoff'],
    toolIcons: [SiFigma, SiSketch, SiCanva, SiFramer, SiInvision, SiSquarespace],
  },
  {
    id: '02',
    title: 'Development',
    link: '/services',
    description: 'Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps.',
    services: ['Frontend Platforms (React / Next)', 'Backend APIs & Microservices (Node)', 'Mobile & Cross-platform (Flutter)', 'CI/CD & Cloud Ops (Docker)'],
    toolIcons: [SiReact, SiFlutter, SiNextdotjs, SiNodedotjs, SiDocker, SiTypescript],
  },
  {
    id: '03',
    title: 'GTM Strategy',
    link: '/services',
    description: 'Data-driven go-to-market for SaaS and AI—clear positioning, smart pricing, and repeatable growth loops from ICP to post-launch analytics.',
    services: ['ICP & Segmentation', 'Positioning, Narrative & Messaging', 'Pricing & Packaging', 'Demand Gen & Content Engine'],
    toolIcons: [SiHubspot, SiSalesforce, SiMixpanel, SiZapier, SiMailchimp, SiAirtable],
  },
  {
    id: '04',
    title: 'Healthcare Apps',
    link: '/services',
    description: 'Secure, compliant healthcare software—from telehealth to EHR integrations—built for HIPAA and auditability.',
    services: ['HIPAA & PHI Compliance', 'Telehealth & Patient Portals', 'EHR Integrations (FHIR / HL7)', 'Audit Logging & Access Controls'],
    toolIcons: [SiGooglecloud, SiFirebase, SiCircleci, SiTrustpilot, SiTwilio, SiStripe],
  },
  {
    id: '05',
    title: 'AI Development',
    link: '/services',
    description: 'Build production\u2011ready AI—rapid prototyping to deployed models with solid evals, observability, and safety.',
    services: ['LLM Apps & Agents (RAG / Tools)', 'Fine\u2011tuning & Prompt Optimization', 'Model Evals, Guardrails & Monitoring', 'Vision, NLP & Speech Pipelines'],
    toolIcons: [SiKaggle, SiPytorch, SiOpenai, SiKeras, SiHuggingface, SiTensorflow],
  },
  {
    id: '06',
    title: 'IoT Development',
    link: '/services',
    description: 'From device firmware to cloud ingestion—secure, reliable IoT systems with OTA updates and real\u2011time telemetry.',
    services: ['Embedded Firmware & Drivers', 'BLE / Zigbee / LoRa Connectivity', 'MQTT Ingestion & Stream Processing', 'Edge AI & OTA Update Pipelines'],
    toolIcons: [SiArduino, SiRaspberrypi, SiApachekafka, SiGrafana, SiPlatformio, SiEspressif],
  },
];

function ArrowSvg({ className }: { className?: string }) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z" />
    </svg>
  );
}

function ServiceCard({ id, title, description, services, toolIcons, link, active }: ServiceItem & { active: boolean }) {
  return (
    <Link href={link} className="w-full hover:scale-[1.02] block duration-500 transition-transform ease-out group">
      <div
        className={`
          p-px grow shrink-0 relative border border-zinc-600 lg:border-zinc-700
          ring-1 lg:ring-0 ring-white/20 ring-inset shadow-none overflow-hidden rounded-3xl
          w-full h-[460px] duration-500
          ${active ? 'scale-100 bg-primary' : 'scale-90 bg-[#12122a]'}
        `}
      >
        <div className="px-5 py-8 sm:py-10 sm:px-10 h-full relative z-10">
          <div
            className={`
              w-full h-full duration-200 absolute inset-0 rounded-3xl
              ${active ? 'bg-primary' : 'bg-[#12122a]'}
            `}
          />

          <div className="h-full relative">
            {/* Arrow icon with hover slide effect */}
            <div className="-rotate-45 absolute right-0 top-0 overflow-hidden size-8 sm:size-9 lg:size-10">
              <div className="relative group-hover:translate-x-full transition-transform duration-300 ease-[cubic-bezier(.15,-0.26,.43,1.41)]">
                <ArrowSvg className="size-full" />
                <ArrowSvg className="size-full absolute right-full top-0" />
              </div>
            </div>

            {/* Content area — slides up when active to reveal details */}
            <div className={`relative h-full z-10 duration-500 ${active ? '-translate-y-full' : ''}`}>
              {/* Preview layer: number + title */}
              <div className="flex flex-col justify-between h-full">
                <h4 className="block text-3xl sm:text-4xl font-semibold">{id}</h4>
                <h2
                  className={`
                    text-xl pr-1 2xl:text-2xl font-semibold origin-top-left
                    transition-transform will-change-transform duration-500
                    ${active ? 'scale-[1.2] translate-y-full' : 'scale-100'}
                  `}
                >
                  {title}
                </h2>
              </div>

              {/* Details layer: description + services + tools */}
              <div className="flex flex-col gap-6 justify-between h-full">
                <h2 className="text-xl pr-1 2xl:text-2xl font-semibold opacity-0">{title}</h2>
                <div className="flex justify-between">
                  <p className="text-sm 2xl:text-base">{description}</p>
                </div>
                <div className="flex gap-6 justify-between flex-col sm:flex-row sm:gap-8">
                  <div>
                    <h3 className="text-foreground/60 text-lg">Services</h3>
                    <div className="flex flex-col text-sm gap-1">
                      {services.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-foreground/60 text-lg">Tools</h3>
                    <div className="grid grid-cols-3 gap-x-1 gap-y-3 sm:gap-x-2 sm:gap-y-4 lg:gap-x-4 lg:gap-y-4 pt-1 w-[100px] text-center">
                      {toolIcons.map((Icon, i) => (
                        <span key={i} className="text-2xl xl:text-3xl opacity-90" aria-hidden="true">
                          <Icon />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Radial gradient glow */}
        <div className="block absolute inset-0 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-[radial-gradient(circle,#B4B5ED_0%,#696AAC_40%,transparent_70%)] opacity-15 pointer-events-none" />
      </div>
    </Link>
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

  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    updateBullets(swiper);
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isDesktop || !triggerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current!;
      const totalWidth = cards.scrollWidth;
      const parentWidth = cards.parentElement?.offsetWidth || window.innerWidth;
      const maxScroll = totalWidth - parentWidth;

      if (maxScroll <= 0) return;

      gsap.to(cards, {
        x: -maxScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${maxScroll * 1.5}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const total = servicesData.length;
            const newIndex = Math.min(total - 1, Math.round(progress * (total - 1)));
            setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
          },
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  const header = (
    <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 xl:gap-24 justify-between">
      <div className="whitespace-nowrap">
        <h2 className="text-3xl sm:text-5xl xl:text-6xl font-semibold leading-tight">
          Our Services
        </h2>
      </div>
      <div className="font-light max-w-[390px]">
        <p>
          We offer comprehensive digital solutions that transform your business
          and drive innovation across every touchpoint.
        </p>
      </div>
    </div>
  );

  return (
    <section id="service-section">
      {/* ─── Desktop: GSAP horizontal scroll with pinning ─── */}
      {isDesktop && (
        <div ref={triggerRef} className="h-screen flex flex-col justify-center">
          {header}
          <div className="relative overflow-visible mt-8">
            <div className="hidden lg:block absolute -left-[500px] top-0 h-full w-[500px] bg-gradient-to-r from-background from-75% to-transparent z-10 pointer-events-none" />
            <div className="hidden lg:block absolute -right-[300px] top-0 h-full w-[300px] bg-gradient-to-l from-background from-75% to-transparent z-10 pointer-events-none" />

            <div ref={cardsRef} className="flex">
              {servicesData.map((service, index) => (
                <div
                  key={service.id}
                  className="transition-all duration-500 ease-in-out service-card lg:w-[340px] xl:w-[380px] 2xl:w-[460px] shrink-0"
                >
                  <ServiceCard active={activeIndex === index} {...service} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Mobile / Tablet: Swiper carousel ─── */}
      {!isDesktop && (
        <>
          {header}
          <div className="relative overflow-visible mt-10" id="service-cards">
            <div className="flex mb-8 justify-between items-center">
              <button
                aria-label="Previous slide"
                className={`px-5 border border-foreground/30 rounded-full transition-colors slider-prev ${
                  isBeginning ? 'opacity-30 pointer-events-none' : 'hover:bg-foreground/10 cursor-pointer'
                }`}
              >
                <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="size-7 sm:size-10" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
              </button>
              <div className="slider-pagination flex cursor-pointer" />
              <button
                aria-label="Next slide"
                className={`px-5 border border-foreground/30 rounded-full transition-colors slider-next ${
                  isEnd ? 'opacity-30 pointer-events-none' : 'hover:bg-foreground/10 cursor-pointer'
                }`}
              >
                <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="size-7 sm:size-10" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
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
                <SwiperSlide key={service.id} className="!w-auto transition-all duration-500 ease-in-out">
                  <div className="transition-all duration-500 ease-in-out service-card w-full shrink-0">
                    <ServiceCard active={activeIndex === index} {...service} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </section>
  );
}
