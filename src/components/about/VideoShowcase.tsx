'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Shield, Zap, Cpu, Activity, Layers } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, delay, x, y }: { icon: any, delay: number, x: string, y: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.2, 0.1],
      scale: [0.9, 1.1, 0.9],
      x: [0, 5, 0],
      y: [0, -5, 0]
    }}
    transition={{ 
      duration: 6, 
      delay, 
      repeat: Infinity,
      ease: "easeInOut" 
    }}
    className="absolute text-brand-purple/10 pointer-events-none"
    style={{ left: x, top: y }}
  >
    <Icon size={28} strokeWidth={1} />
  </motion.div>
);

export const VideoShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
      className="relative py-24 md:py-32 overflow-hidden bg-black"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-15">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-brand-purple/5 rounded-full blur-[160px]" />
        <FloatingIcon icon={Cpu} delay={0} x="10%" y="30%" />
        <FloatingIcon icon={Zap} delay={2} x="85%" y="40%" />
        <FloatingIcon icon={Shield} delay={4} x="15%" y="70%" />
      </div>

      <div className="relative z-10 w-main mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          style={{ y, opacity }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl text-brand-purple uppercase tracking-[0.4em] font-bold mb-8"
          >
            Experience Our Vision
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 leading-relaxed font-light tracking-wide px-4"
          >
            Watch our introductory video to learn more about TAMx Technologies and our vision for transforming the future through technology. In this video, you will see our core values, the innovative solutions we provide, and how we can support your business journey.
          </motion.p>
        </motion.div>

        {/* Video Card Container */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="relative max-w-3xl mx-auto"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            onClick={togglePlay}
            className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-pointer bg-black"
          >
            {/* Main Video */}
            <video 
              ref={videoRef}
              src="/video/tamx_video.mp4"
              className="absolute inset-0 w-full h-full object-cover z-10"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />

            {/* Play/Pause Minimal Overlay - Themed & Professional */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  isHovered && (
                    <motion.div
                      key="pause"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="w-20 h-20 bg-brand-purple/80 rounded-full flex items-center justify-center text-white backdrop-blur-md shadow-[0_0_30px_rgba(105,106,172,0.4)] border border-white/10"
                    >
                       <Pause size={32} />
                    </motion.div>
                  )
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="w-20 h-20 bg-brand-purple/80 rounded-full flex items-center justify-center text-white backdrop-blur-md shadow-[0_0_40px_rgba(105,106,172,0.6)] border border-white/10"
                  >
                    <Play size={32} className="fill-current ml-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Small Volume Toggle - Professional Theme */}
            <div className="absolute bottom-6 right-6 z-40">
              <button
                onClick={toggleMute}
                className="w-10 h-10 bg-black/60 hover:bg-black/80 text-white/70 hover:text-white rounded-full flex items-center justify-center border border-white/10 transition-all duration-300 backdrop-blur-md shadow-lg"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Subtle Label Overlay */}
            <div className="absolute bottom-6 left-8 z-30 pointer-events-none opacity-40 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
              <span className="text-[10px] text-white uppercase tracking-[0.3em] font-medium">TAMx Official</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
