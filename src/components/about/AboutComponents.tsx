'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// --- Hero Section ---
const AnimatedLine = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <div className="overflow-clip relative block text-left w-full h-fit">
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative block"
    >
      {text}
    </motion.div>
  </div>
);

const WatchOurStoryButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    buttonRef.current.style.setProperty('--reflextX', `${x}px`);
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      type="button"
      className="relative px-10 py-2.5 rounded-[40px] text-lg font-semibold overflow-hidden transition-all duration-300 isolate group cursor-pointer"
      style={{
        background: 'linear-gradient(93.92deg, #8587e3 -13.51%, #4c4dac 40.91%, #696aac 113.69%)',
        boxShadow: '0 0 10px #696aac, inset 0 0 2px rgba(255, 255, 255, 0.61)',
      } as any}
    >
      <span className="relative z-10 transition-colors duration-300">Watch Our Story</span>
      {/* Reflex Effect */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 left-[var(--reflextX,50%)] w-24 h-24 -ml-12 bg-white/30 rounded-full blur-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
      />
    </button>
  );
};

export const AboutHero = () => {
  return (
    <section className="pt-32 mobile:pt-52 md:pt-60 pb-20 sm:pb-40">
      <div className="relative z-10 flex flex-col gap-40 sm:gap-80 w-main m-auto">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-10">
          <h1 className="uppercase text-lg sm:text-xl xl:text-2xl/tight font-normal shrink-0 pt-1 2xl:pt-3">
            <AnimatedLine text="Companies create products." delay={0.1} />
            <AnimatedLine text="TAMx Creates Impact." delay={0.2} />
          </h1>
          <div className="max-w-3xl 2xl:max-w-[920px]">
            <div className="text-4xl/tight sm:text-5xl/tight 2xl:text-6xl/tight font-semibold">
              <AnimatedLine text="We're a design-led AI studio" delay={0.3} />
              <AnimatedLine text="turning complex challenges into" delay={0.4} />
              <AnimatedLine text="measurable results." delay={0.5} />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-20 mobile:mt-40 sm:mt-64 flex flex-col sm:flex-row gap-6 items-center"
            >
              <Link href="#story">
                <WatchOurStoryButton />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Story Section (Narrative + Map) ---
const StoryWordReveal = ({ progress }: { progress: any }) => {
  // We split the text into two lines as per the reference HTML
  const lines = [
    "Antimatter AI operates at the intersection of cutting-edge",
    "technology and transformative design."
  ];

  return (
    <div className="relative mt-10" id="story-container">
       <div className="text-[32px] sm:text-[42px] xl:text-[52px] font-semibold leading-tight tracking-tight">
          {/* Foreground (Revealing) text */}
          <div id="story-text" className="absolute inset-0 pointer-events-none z-10">
              {lines.map((line, i) => (
                <div key={i} className="overflow-hidden" aria-hidden="true" style={{ position: 'relative', display: 'block', textAlign: 'start' }}>
                  <motion.div 
                    style={{ 
                      maxWidth: useTransform(progress, [0.1 + i * 0.3, 0.4 + i * 0.3], ["0%", "100%"]),
                    }}
                    className="overflow-hidden whitespace-nowrap text-foreground"
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
          </div>
          {/* Ghost (Background) text */}
          <div className="text-foreground/10 relative z-0">
              {lines.map((line, i) => <span key={i} className="block">{line}</span>)}
          </div>
       </div>
    </div>
  );
};

export const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  return (
    <div className="pt-40 mt-40 w-main mx-auto" id="story" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl text-foreground/65 uppercase tracking-wider">OUR STORY</h2>
      </motion.div>

      <StoryWordReveal 
        progress={scrollYProgress} 
      />

      {/* Map + Founded Section — Exact Replica */}
      <div className="flex flex-col md:flex-row justify-between mt-32 sm:mt-40 items-center gap-10 md:gap-0">
        <div className="relative">
          {/* Base Layer: Accent (Purple Dots) visible first */}
          <img 
            alt="World map accent" 
            loading="lazy" 
            width="639" 
            height="470" 
            decoding="async" 
            data-nimg="1"
            className="max-w-[500px] xl:max-w-[639px] w-full" 
            src="/images/dotted-world-map-atlanta_accent.svg" 
            style={{ color: 'transparent' }} 
          />
          
          {/* Animated Overlay: Full Map (Atlanta) reveals from city coordinates */}
          <motion.div 
            initial={{ 
              clipPath: 'circle(0% at 48% 73%)',
              opacity: 1 
            }}
            whileInView={{ 
              clipPath: 'circle(100% at 48% 73%)',
              opacity: 1 
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "200px" }}
            className="absolute top-0 left-0 w-full h-full"
          >
             <img 
                alt="World map" 
                loading="lazy" 
                width="639" 
                height="470" 
                decoding="async" 
                data-nimg="1"
                className="max-w-[500px] xl:max-w-[639px] w-full" 
                src="/images/dotted-world-map-atlanta.svg" 
                style={{ color: 'transparent' }} 
              />
          </motion.div>
        </div>

        <div 
          className="text-2xl xl:text-3xl font-semibold max-w-md xl:max-w-xl" 
          id="story-paragraph"
          aria-label="Founded in Atlanta by marketers, designers, and engineers, we set out to make AI accessible, human, and visually inspiring."
        >
          <div aria-hidden="true" style={{ position: 'relative', display: 'block', textAlign: 'start', overflow: 'clip' }}>
            <motion.div
              initial={{ transform: "translate(0px, 100%)" }}
              whileInView={{ transform: "translate(0px, 0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{ position: 'relative', display: 'block', textAlign: 'start' }}
            >
              Founded in Atlanta by <span className="text-tertiary">marketers, </span>
            </motion.div>
          </div>
          <div aria-hidden="true" style={{ position: 'relative', display: 'block', textAlign: 'start', overflow: 'clip' }}>
            <motion.div
              initial={{ transform: "translate(0px, 100%)" }}
              whileInView={{ transform: "translate(0px, 0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{ position: 'relative', display: 'block', textAlign: 'start' }}
            >
              <span className="text-tertiary">designers, and engineers</span>, we set out to 
            </motion.div>
          </div>
          <div aria-hidden="true" style={{ position: 'relative', display: 'block', textAlign: 'start', overflow: 'clip' }}>
            <motion.div
              initial={{ transform: "translate(0px, 100%)" }}
              whileInView={{ transform: "translate(0px, 0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{ position: 'relative', display: 'block', textAlign: 'start' }}
            >
              make AI accessible, human, and visually 
            </motion.div>
          </div>
          <div aria-hidden="true" style={{ position: 'relative', display: 'block', textAlign: 'start', overflow: 'clip' }}>
            <motion.div
              initial={{ transform: "translate(0px, 100%)" }}
              whileInView={{ transform: "translate(0px, 0px)" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{ position: 'relative', display: 'block', textAlign: 'start' }}
            >
              inspiring.
            </motion.div>
          </div>
        </div>
      </div>

      {/* Grid Section: Things that matter — Exact Replica */}
      <div className="py-20 sm:py-40">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold">
            Things that <span className="text-tertiary">matter.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-5 w-full mt-20 flex-wrap">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
          >
            <div className="p-8 2xl:p-18 flex flex-col gap-5 pt-32 lg:pt-54 2xl:pt-60 rounded-xl border border-foreground/19 h-full">
              <h3 className="font-semibold text-3xl md:text-4xl xl:text-5xl max-w-xs">Design-First Innovation</h3>
              <p className="max-w-xs">Award-winning UI/UX and 3D web experiences</p>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             viewport={{ once: true }}
          >
            <div className="p-8 2xl:p-18 flex flex-col gap-5 pt-32 lg:pt-54 2xl:pt-60 rounded-xl border border-foreground/19 h-full">
              <h3 className="font-semibold text-3xl md:text-4xl xl:text-5xl max-w-xs">Engineering Excellence</h3>
              <p className="max-w-xs">Next.js, GSAP, Three.js, and scalable AI architectures</p>
            </div>
          </motion.div>

          <motion.div
             className="sm:col-span-2 lg:col-span-1"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             viewport={{ once: true }}
          >
            <div className="p-8 2xl:p-18 flex flex-col gap-5 pt-32 lg:pt-54 2xl:pt-60 rounded-xl border border-foreground/19 h-full">
              <h3 className="font-semibold text-3xl md:text-4xl xl:text-5xl max-w-3xs md:max-w-xs">Real-World Impact</h3>
              <p className="max-w-xs">From healthcare to enterprise AI, our work drives measurable outcomes</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- Beliefs Section — Exact Replica ---
export const BeliefsSection = () => {
  const beliefs = [
    "Design first, always. — Every product starts with empathy and storytelling.",
    "AI should amplify humans, not replace them.",
    "Innovation is only meaningful when it drives impact.",
    "We move fast — but never at the cost of quality or integrity."
  ];

  return (
    <div className="py-20 sm:py-40 w-main mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-center text-3xl md:text-4xl font-bold">How We Think</h2>
        <p className="text-center italic mt-5 sm:text-xl">
          We don&apos;t just build products — we <br /> build momentum.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl text-foreground/65 mt-20 uppercase">CORE BELIEFS</h3>
      </motion.div>

      <div className="flex flex-col mt-5">
        {beliefs.map((belief, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
            viewport={{ once: true }}
            className="py-4 sm:py-8 border-b last:border-b-0 border-foreground/40"
          >
            <div className="relative pl-10">
              <h4 className="absolute top-0 left-0 text-foreground/50">0{idx + 1}</h4>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                {belief}
              </p>
            </div>
          </motion.div>
        ))}
       </div>
    </div>
  );
};

// --- Reusable Reflex Button ---
const ReflexButton = ({ text, href }: { text: string; href: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    buttonRef.current.style.setProperty('--reflextX', `${x}px`);
  };

  return (
    <Link href={href}>
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        type="button"
        className="relative px-10 py-2.5 rounded-[40px] text-lg font-semibold overflow-hidden transition-all duration-300 isolate group cursor-pointer text-white"
        style={{
          background: 'linear-gradient(93.92deg, #8587e3 -13.51%, #4c4dac 40.91%, #696aac 113.69%)',
          boxShadow: '0 0 10px #696aac, inset 0 0 2px rgba(255, 255, 255, 0.61)',
        } as any}
      >
        <span className="relative z-10 transition-colors duration-300">{text}</span>
        {/* Reflex Effect */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 left-[var(--reflextX,50%)] w-24 h-24 -ml-12 bg-white/30 rounded-full blur-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        />
      </button>
    </Link>
  );
};

// --- Final CTA Section — Exact Replica ---
export const AboutCTA = () => {
  return (
    <div className="mobile:h-[900px] md:h-[800px] xl:h-[950px] relative overflow-hidden">
      <div className="w-main mx-auto relative z-10 py-20">
        <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
          <div>
            <h2 className="text-xl mobile:text-2xl lg:text-3xl xl:text-4xl text-foreground">Let&apos;s Create Something</h2>
            <h3 className="italic text-4xl mobile:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground">That Matters</h3>
          </div>
          <div className="flex flex-col items-end text-right md:pt-4">
            <p className="max-w-[320px] sm:max-w-md text-foreground text-sm mobile:text-lg leading-snug">
              We&apos;ve built AI for good, for growth, and for the <br className="hidden md:block" />
              greater impact. What will we build with you?
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-24 flex flex-row gap-8 capitalize items-center">
          <ReflexButton text="Start a Project" href="/contact" />
          
          <Link 
            className="lg:text-xl flex items-center gap-2 border-b border-white/20 hover:border-accent transition-all duration-300" 
            href="/work"
          >
            Explore Our Work 
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="size-7" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>

      <div className="relative mb-20 mobile:absolute wide:pl-20 wide:left-1/2 mobile:top-64 overflow-hidden md:top-44 lg:top-28 xl:top-20 right-0 mobile:-right-24 md:right-0 mt-10">
        <div className="relative w-full mobile:w-4xl lg:w-[950px] xl:w-[1480px] flex justify-end ml-[35%] mobile:ml-0">
          <div className="w-[200%] mobile:w-full grow shrink-0">
            <video 
              src="/Antimatter-astronaut-loop-1.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              poster="/Antimatter-astronaut-fallback.webp" 
              className="rotate-12 lg:rotate-0 w-full opacity-40 grayscale"
            />
          </div>
          <div className="w-20 absolute right-0 h-full from-20% bg-gradient-to-l top-0 from-background to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
