'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Layout, Code2, Rocket, Brain, Stethoscope, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: 'Product Design',
    description: 'End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.',
    services: [
      'User Research & Strategy',
      'UX Flows & Wireframes',
      'UI Systems & Prototypes',
      'Design Ops & Dev Handoff',
    ],
    tools: ['Figma', 'Sketch', 'Adobe XD', 'Blender'],
    icon: Layout,
  },
  {
    id: '02',
    title: 'Development',
    description: 'Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps.',
    services: [
      'Frontend Platforms (React / Next)',
      'Backend APIs & Microservices (Node)',
      'Mobile & Cross-platform (Flutter)',
      'CI/CD & Cloud Ops (Docker)',
    ],
    tools: ['React', 'Next.js', 'Node', 'TypeScript', 'Docker'],
    icon: Code2,
  },
  {
    id: '03',
    title: 'GTM Strategy',
    description: 'Data-driven go-to-market for SaaS and AI—clear positioning, smart pricing, and repeatable growth loops from ICP to post-launch analytics.',
    services: [
      'ICP & Segmentation',
      'Positioning, Narrative & Messaging',
      'Pricing & Packaging',
      'Demand Gen & Content Engine',
    ],
    tools: ['HubSpot', 'GA4', 'Zapier', 'Automation'],
    icon: Rocket,
  },
  {
    id: '04',
    title: 'Healthcare Apps',
    description: 'Secure, compliant healthcare software—from telehealth to EHR integrations—built for HIPAA and auditability.',
    services: [
      'HIPAA & PHI Compliance',
      'Telehealth & Patient Portals',
      'EHR Integrations (FHIR / HL7)',
      'Audit Logging & Access Controls',
    ],
    tools: ['AWS', 'Auth0', 'Cloud Systems'],
    icon: Stethoscope,
  },
  {
    id: '05',
    title: 'AI Development',
    description: 'Build production-ready AI—rapid prototyping to deployed models with solid evals, observability, and safety.',
    services: [
      'LLM Apps & Agents (RAG / Tools)',
      'Fine-tuning & Prompt Optimization',
      'Model Evals & Monitoring',
      'Vision, NLP & Speech Pipelines',
    ],
    tools: ['TensorFlow', 'PyTorch', 'LangChain'],
    icon: Brain,
  },
  {
    id: '06',
    title: 'IoT Development',
    description: 'From device firmware to cloud ingestion—secure, reliable IoT systems with OTA updates and real-time telemetry.',
    services: [
      'Embedded Firmware',
      'BLE / Zigbee / LoRA',
      'MQTT & Stream Processing',
      'Edge AI & OTA Update Pipelines',
    ],
    tools: ['Raspberry Pi', 'MQTT', 'Edge Systems'],
    icon: Cpu,
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Desktop Horizontal Scroll logic
        const totalWidth = sectionRef.current?.scrollWidth || 0;
        const windowWidth = window.innerWidth;
        const xDist = totalWidth - windowWidth;

        const pin = gsap.fromTo(
          sectionRef.current,
          { translateX: 0 },
          {
            translateX: -xDist,
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              end: `+=${xDist * 1.5}`,
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        // Active card triggers
        const cards = gsap.utils.toArray<HTMLElement>(".service-card");
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: pin.scrollTrigger?.animation,
            start: "left center+=20%",
            end: "right center-=20%",
            onEnter: () => activateCard(card, i),
            onEnterBack: () => activateCard(card, i),
            onLeave: () => deactivateCard(card, i),
            onLeaveBack: () => deactivateCard(card, i),
          });
        });
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile Vertical Scroll logic
        const mobileCards = gsap.utils.toArray<HTMLElement>(".service-card");
        mobileCards.forEach((card) => {
          gsap.set(card.querySelectorAll(".card-desc, .card-footer"), {
            opacity: 1,
            visibility: "visible",
            y: 0,
          });

          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
          });
        });
      });

      function activateCard(card: HTMLElement, index: number) {
        const isPurple = index % 2 === 0;
        gsap.to(card, {
          backgroundColor: isPurple ? "#5A3FD8" : "#1e1b4b",
          borderColor: isPurple ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)",
          boxShadow: isPurple ? "0 30px 60px rgba(90, 63, 216, 0.5)" : "0 20px 40px rgba(0, 0, 0, 0.4)",
          scale: 1.05,
          duration: 0.8,
          ease: "power3.out",
        });

        const title = card.querySelector(".card-title");
        const desc = card.querySelector(".card-desc");
        const footer = card.querySelector(".card-footer");
        const previewTitle = card.querySelector(".preview-title");
        const previewId = card.querySelector(".preview-id");

        // Restore visibility for all active elements
        gsap.set([title, desc, footer], { visibility: "visible" });
        gsap.set(previewTitle, { visibility: "hidden" });

        const tl = gsap.timeline();
        tl.to(previewId, { opacity: 0, y: -20, duration: 0.3 })
          .fromTo(title, { opacity: 0, scale: 0.9, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" })
          .fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
          .fromTo(footer, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
      }

      function deactivateCard(card: HTMLElement, index: number) {
        gsap.to(card, {
          backgroundColor: "#0F172A",
          borderColor: "rgba(255,255,255,0.1)",
          boxShadow: "none",
          scale: 1,
          duration: 0.5,
          ease: "power3.inOut",
        });

        const title = card.querySelector(".card-title");
        const desc = card.querySelector(".card-desc");
        const footer = card.querySelector(".card-footer");
        const previewTitle = card.querySelector(".preview-title");
        const previewId = card.querySelector(".preview-id");

        gsap.to([title, desc, footer], {
          opacity: 0,
          y: 20,
          duration: 0.4,
          onComplete: () => {
            gsap.set([desc, footer, title], { visibility: "hidden" });
          },
        });

        gsap.set([previewTitle, previewId], { visibility: "visible" });
        gsap.fromTo([previewTitle, previewId], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      // Parallax logic
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 15;
        const yPos = (clientY / window.innerHeight - 0.5) * 15;

        gsap.to(".service-card", {
          xPercent: xPos,
          yPercent: yPos,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      self.add(() => window.removeEventListener("mousemove", handleMouseMove));
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#030712]">
      <div ref={triggerRef} className="overflow-hidden relative min-h-screen py-32">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-8 mb-24 grid grid-cols-1 md:grid-cols-2 items-end gap-8 relative z-20">
          <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
            Our Services
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
            We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
          </p>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-blue/5 opacity-50" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(90,63,216,0.05),transparent_70%)]" />
        </div>

        <div ref={sectionRef} className="flex h-[70vh] items-center px-[10vw] gap-[40px] w-fit relative z-10 whitespace-nowrap">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="service-card flex-shrink-0 w-[450px] h-[580px] rounded-[24px] border border-white/5 bg-[#0F172A] p-10 flex flex-col justify-between group relative overflow-hidden transition-all duration-700 whitespace-normal shadow-2xl"
            >
              {/* Top Row - ID and Arrow */}
              <div className="flex justify-between items-start w-full relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="preview-id text-4xl font-bold text-white/10 font-display">
                    {service.id}
                  </span>
                  <h2 className="card-title text-3xl font-bold text-white invisible opacity-0 whitespace-nowrap">
                    {service.title}
                  </h2>
                </div>
                <div className="p-3 rounded-full border border-white/10 bg-white/5 group-hover:bg-brand-purple/20 transition-all duration-300">
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Middle - Description (Only active) */}
              <div className="relative z-10 flex-grow flex items-center pt-4">
                <p className="card-desc text-lg text-white/90 leading-relaxed invisible opacity-0">
                  {service.description}
                </p>
              </div>

              {/* Bottom - Preview Title (Inactive) or Services/Tools (Active) */}
              <div className="relative z-10 w-full mt-auto">
                <h3 className="preview-title text-3xl font-bold text-white block">
                  {service.title}
                </h3>
                
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
                        <span key={tool} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-white/70">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Pattern Decoration */}
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
    </section>
  );
}