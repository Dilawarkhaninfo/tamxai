'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqData, FaqItem } from './FaqData';

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      id="faq" 
      className="relative w-full py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* Decorative Particle Spheres */}
      <div className="absolute top-0 left-0 w-1/3 h-1/2 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] opacity-20">
          <DecorativeSphere />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-[-10%] right-[-10%] opacity-20">
          <DecorativeSphere />
        </div>
      </div>

      {/* Background Radial Glows (matching site theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-main m-auto">
        {/* Section Header (matching ServicesSection exactly) */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 xl:gap-24 justify-between mb-16 md:mb-24">
          <div className="whitespace-nowrap">
            <h2 className="text-3xl sm:text-5xl xl:text-6xl font-semibold leading-tight text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="font-light max-w-[390px] text-gray-400">
            <p>
              Everything you need to know about working with TAMx and building your next digital product.
            </p>
          </div>
        </div>

        {/* FAQ Layout */}
        <div className="max-w-[900px] mx-auto flex flex-col gap-4 md:gap-5">
          {faqData.map((item, index) => (
            <FaqCard 
              key={item.id} 
              item={item} 
              isOpen={openId === item.id} 
              onClick={() => toggleItem(item.id)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Subtle Depth Glow */}
      <div className="block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[1000px] bg-[radial-gradient(circle,#B4B5ED_0%,#696AAC_40%,transparent_70%)] opacity-5 pointer-events-none z-0" />
    </section>
  );
}

interface FaqCardProps {
  item: FaqItem;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FaqCard({ item, isOpen, onClick, index }: FaqCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`
        group relative rounded-[24px] border transition-all duration-500 overflow-hidden
        ${isOpen ? 'border-brand-purple/40 bg-white/[0.05] shadow-[0_0_30px_rgba(105,106,172,0.1)]' : 'border-zinc-800/50 bg-[#08080c] hover:border-zinc-700/80 hover:bg-white/[0.03]'}
        backdrop-blur-xl
      `}
    >
      <button
        onClick={onClick}
        className="w-full text-left p-6 sm:p-8 md:p-10 flex items-center justify-between gap-4 z-10 relative"
      >
        <span className="text-lg sm:text-xl md:text-2xl font-semibold text-[#F2F3FF] tracking-tight transition-colors duration-300 group-hover:text-white">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`flex-shrink-0 ${isOpen ? 'text-brand-purple' : 'text-gray-500'}`}
        >
          <ChevronDown size={24} strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          >
            <div className="px-6 pb-8 sm:px-8 sm:pb-10 md:px-10 md:pb-12 pt-0 text-gray-400 text-base md:text-lg leading-relaxed font-light">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item.answer}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Hover Glow Line (matching ServiceCard depth) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Internal Radial Glow (matching TestimonialCard) */}
      <div className="block absolute inset-0 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-[radial-gradient(circle,#B4B5ED_0%,#696AAC_40%,transparent_70%)] opacity-10 pointer-events-none z-0" />
    </motion.div>
  );
}

function DecorativeSphere() {
  const [mounted, setMounted] = useState(false);
  const timeRef = useRef(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const animate = () => {
      timeRef.current += 0.003;
      setTick(prev => prev + 1);
      requestAnimationFrame(animate);
    };
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  const particles = [];
  const count = 150;
  const radius = 200;

  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);
    particles.push({ x, y, z, id: i, offset: i * 0.1 });
  }

  return (
    <div className="relative w-[500px] h-[500px]" style={{ perspective: '1000px' }}>
      <div className="w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {particles.map((p) => {
          const depth = (p.z + radius) / (2 * radius);
          const time = timeRef.current;
          const float = Math.sin(time + p.offset) * 2;
          return (
            <div
              key={p.id}
              className="absolute rounded-full bg-white"
              style={{
                width: '1.5px',
                height: '1.5px',
                left: '50%',
                top: '50%',
                transform: `translate3d(${p.x + float}px, ${p.y + float}px, ${p.z}px) scale(${0.5 + depth})`,
                opacity: depth * 0.4,
                boxShadow: `0 0 10px rgba(255,255,255,${depth * 0.5})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
