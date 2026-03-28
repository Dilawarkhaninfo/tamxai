'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Story3DBackground } from './Story3DBackground';
import { CTAFloating3D } from './CTAFloating3D';

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
            <div className="text-3xl sm:text-5xl/tight 2xl:text-6xl/tight font-semibold">
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

export const StorySection = () => {
  const storyText = "Founded by Ahmed Malik, TAMx Technologies began with a single goal: to solve real-world problems using innovative technology. With years of experience in AI, software development, and startup growth, Ahmed envisioned a company that blends cutting-edge solutions with real business impact.";
  const words = storyText.split(" ");
  const highlightedWords = ['solve', 'innovative', 'cutting-edge', 'business', 'impact'];

  const lineReveal = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -20 },
    visible: { 
      clipPath: 'inset(0 0% 0 0)', 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const wordReveal = {
    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 1.2, 
        delay: 0.3 + (i * 0.015),
        ease: [0.215, 0.61, 0.355, 1.0] as any 
      }
    })
  };

  return (
    <section className="relative min-h-screen py-32 w-full flex items-center justify-center overflow-hidden bg-black px-6 md:px-0" id="story">
      {/* Unique 3D Background */}
      <Story3DBackground />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-95" />
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="relative z-20 w-main mx-auto"
      >
        <div className="grid grid-cols-12 gap-y-16">
          
          {/* Top Left: Mask Reveal Title */}
          <div className="col-start-1 col-end-13 lg:col-start-1 lg:col-end-6 self-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-6 text-brand-purple text-xs md:text-sm font-black uppercase mb-12"
            >
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="h-[2px] bg-brand-purple" 
              />
              Our Journey
            </motion.div>
            
            <div className="space-y-4">
              <div className="overflow-hidden">
                 <motion.h3 
                  variants={lineReveal}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-none tracking-tighter text-white"
                >
                  Our <span className="text-brand-purple italic">Story</span>
                </motion.h3>
              </div>
            </div>
          </div>

          {/* Bottom Right: Choreographed Text Reveal - Aligned to "Blue Box" */}
          <div className="col-start-1 lg:col-start-5 col-end-13 relative lg:-mt-24 z-10">
            <div className="flex flex-wrap text-left lg:pl-12 border-l border-brand-purple/20">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordReveal}
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mr-3 mb-3 tracking-tight ${
                    highlightedWords.includes(word.toLowerCase().replace(/[.,]/g, "")) 
                      ? "text-white font-semibold shimmer-text" 
                      : "text-white/60"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Decorative expanding stroke */}
            <motion.div 
               initial={{ scaleX: 0, opacity: 0 }}
               whileInView={{ scaleX: 1, opacity: 1 }}
               transition={{ duration: 1.5, delay: 1.5, ease: "circInOut" }}
               className="mt-14 h-[1px] w-full bg-gradient-to-r from-brand-purple/50 via-brand-purple to-transparent origin-left"
            />
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .shimmer-text {
          background: linear-gradient(
            to right,
            #fff 20%,
            #a78bfa 40%,
            #a78bfa 60%,
            #fff 80%
          );
          background-size: 200% auto;
          color: #fff;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.8, 
                delay: 0.2 + idx * 0.1,
                ease: [0.215, 0.61, 0.355, 1.0] as any 
            }}
            viewport={{ once: true, margin: "-10%" }}
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

// --- Final CTA Section ---
export const AboutCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const atmosOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.9, 0.9, 0]);
  const atmosY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen lg:h-[850px] flex items-start justify-center overflow-hidden bg-black pb-32 pt-32"
    >
      
      {/* Full-Section 3D Neural AI Core Atmosphere */}
      <motion.div 
        style={{ opacity: atmosOpacity, y: atmosY }}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      >
        <CTAFloating3D />
      </motion.div>

      <div className="w-main mx-auto relative z-10 px-6 md:px-0">
        <div className="flex flex-col gap-8 max-w-3xl h-full justify-start translate-y-[-15%]">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-6 text-brand-purple text-xs md:text-sm font-black uppercase mb-2"
          >
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: 64 }}
               transition={{ duration: 1, ease: "circOut" }}
               className="h-[2px] bg-brand-purple" 
            />
            Your Next Chapter
          </motion.div>

          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter"
            >
              Join Us on <br />
              This <span className="text-brand-purple italic">Journey</span>
            </motion.h2>

            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.5 }}
               className="max-w-xl text-base sm:text-lg lg:text-xl text-white/50 leading-relaxed font-light"
            >
              We invite you to explore our team’s dedication to excellence and how TAMx Technologies can transform your business. 
              Together, let’s build a smarter, more connected future.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-4 flex flex-wrap gap-8 items-center"
          >
            <ReflexButton text="Start a Project" href="/contact" />
            
            <Link 
              className="lg:text-lg flex items-center gap-2 border-b border-white/20 hover:border-brand-purple transition-all duration-300 group font-medium" 
              href="/work"
            >
              Explore Our Work 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUpRight className="size-5 text-brand-purple" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

    </div>
  );
};
