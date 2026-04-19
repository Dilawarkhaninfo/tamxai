'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Sparkles, Globe, ShieldCheck } from 'lucide-react';

export const HomeVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring physics for animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transformations for the cinematic effect
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [10, 0, -10]);
  const y = useTransform(smoothProgress, [0, 1], [50, -50]);
  
  // Parallax for the text and background elements
  const textY = useTransform(smoothProgress, [0, 1], [50, -150]);
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center py-12 overflow-hidden bg-black select-none"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ scale: glowScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-purple/10 rounded-full blur-[180px] opacity-30" 
        />
        <motion.div 
          style={{ y: textY }}
          className="absolute top-1/4 right-[10%] opacity-20"
        >
          <Globe className="text-brand-purple w-24 h-24 stroke-[1]" />
        </motion.div>
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [-50, 200]) }}
          className="absolute bottom-1/4 left-[10%] opacity-20"
        >
          <Sparkles className="text-brand-purple w-16 h-16 stroke-[1]" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Floating Title with Parallax */}
        <motion.div 
          style={{ y: textY, opacity }}
          className="text-center mb-10 pointer-events-none"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-black mb-4 tracking-tighter"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-purple to-white/40">
              EXPERIENCE THE FUTURE
            </span>
          </motion.h2>
          <p className="text-white/50 text-lg md:text-xl font-light tracking-[0.2em] uppercase">
            TAMX • Shaping Innovation
          </p>
        </motion.div>

        {/* Video Container with 3D Transform */}
        <motion.div
           style={{ 
             scale, 
             rotateX,
             perspective: 1000
           }}
           className="relative group perspective-1000"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
        >
          {/* External Glowing Frame */}
          <div className="absolute -inset-[1px] bg-gradient-to-br from-brand-purple/40 via-transparent to-brand-blue/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]" />
          
          <div 
            onClick={togglePlay}
            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer bg-neutral-900 overflow-hidden"
          >
            {/* Cinematic Overlay Gradients */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-60" />
            
            {/* Main Video Element */}
            <video 
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover z-10 scale-[1.01]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source 
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>

            {/* Central Play/Pause Animation */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <AnimatePresence mode="wait">
                {!isPlaying && (
                  <motion.div
                    key="play-btn"
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                    className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl"
                  >
                    <Play size={40} className="fill-current ml-2" />
                  </motion.div>
                )}
                {isPlaying && isHovered && (
                  <motion.div
                    key="pause-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl"
                  >
                    <Pause size={40} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-40 flex items-end justify-between translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-[1px] bg-brand-purple" />
                  <span className="text-[10px] text-white/70 uppercase tracking-[0.5em] font-medium">TAMX Official Showcase</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Our Journey 2024</h3>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleMute}
                  className="w-14 h-14 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 transition-all duration-300 backdrop-blur-xl group/btn"
                >
                  <AnimatePresence mode="wait">
                    {isMuted ? (
                      <motion.div key="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <VolumeX size={20} className="group-hover/btn:scale-110 transition-transform" />
                      </motion.div>
                    ) : (
                      <motion.div key="unmuted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Volume2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Progress Bar (Visual Only for now) */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-brand-purple shadow-[0_0_15px_rgba(105,106,172,0.8)] z-50 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-[10s] ease-linear origin-left" />
          </div>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0.6, 0.9], [0, 1]) }}
          className="mt-12 flex justify-center items-center gap-10 opacity-30"
        >
          <div className="flex items-center gap-3 text-white/40 text-xs tracking-widest uppercase">
            <ShieldCheck size={14} /> Secure & Reliable
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-3 text-white/40 text-xs tracking-widest uppercase">
            <Globe size={14} /> Global Solutions
          </div>
        </motion.div>
      </div>
    </section>
  );
};
