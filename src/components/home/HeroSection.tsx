'use client';

import { motion } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';

export function HeroSection() {
  const { finished } = usePreloader();

  return (
    <div className="relative z-20 h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={finished ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col w-main m-auto pt-10 pb-14 h-full relative z-10 justify-between"
      >
        <div className="flex justify-center items-center flex-1 min-h-0">
          <h1
            id="hero-title"
            className="text-3xl/[1.7rem] sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-light text-center sm:text-left sm:w-[500px] md:w-[660px] xl:w-[830px] 2xl:w-[1000px]"
          >
            <motion.div
              id="title1"
              initial={{ x: 150, opacity: 0 }}
              animate={finished ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
              transition={{ duration: 2, ease: 'anticipate' }}
              className="flex justify-center sm:justify-start"
            >
              <div className="overflow-hidden py-3">
                <span>Creating Small </span>
                <span className="italic font-bold pr-2">Digital</span>
              </div>
            </motion.div>

            <motion.div
              id="title2"
              initial={{ x: -150, opacity: 0 }}
              animate={finished ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
              transition={{ duration: 2, ease: 'anticipate' }}
              className="text-right mt-0 flex justify-center sm:justify-end"
            >
              <div className="overflow-hidden">
                <span className="italic font-bold">Solution </span>
                <span>that matters</span>
              </div>
            </motion.div>
          </h1>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={finished ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1.8, ease: 'anticipate', delay: finished ? 0.2 : 0 }}
          className="shrink-0"
        >
          <div
            id="hero-stats"
            className="flex flex-col md:flex-row justify-between w-full gap-6 md:gap-0 items-center md:items-end"
          >
            <div className="flex max-w-xs lg:max-w-lg flex-col gap-6 md:gap-10 md:items-start items-center text-center md:text-left">
              <p className="text-sm md:text-base">
                We empower organizations with AI to transfrom complex challenges into real world solutions.
              </p>
              <div className="flex text-lg">
                <a href="/contact">
                  <button
                    type="button"
                    className="group relative overflow-hidden rounded-full px-10 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(93.92deg, #8587e3 -13.51%, #4c4dac 40.91%, #696aac 113.69%)',
                      boxShadow: '0 0 10px #696aac, inset 0 0 2px rgba(255, 255, 255, 0.61)',
                    }}
                  >
                    <span className="relative z-10">Start Your Project</span>
                    <motion.div
                      className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[30%] h-full skew-x-[-25deg]"
                      animate={{
                        left: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        repeatDelay: 1,
                      }}
                    />
                  </button>
                </a>
              </div>
            </div>

            <div className="flex text-xs md:text-sm gap-6 mobile:gap-8 lg:gap-16 sm:justify-center md:justify-end justify-between w-full md:w-auto">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl flex items-center font-semibold text-nowrap">
                  30<span className="text-foreground/40">+</span>
                </h3>
                <h3 className="text-xs sm:text-sm leading-tight">
                  Projects <br /> Delivered
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl flex items-center font-semibold text-nowrap">
                  100<span className="text-foreground/40">%</span>
                </h3>
                <h3 className="text-xs sm:text-sm leading-tight">
                  Client<br />Satisfaction
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl flex items-center font-semibold text-nowrap">
                  24<span className="text-foreground/40">/</span>7
                </h3>
                <h3 className="text-xs sm:text-sm leading-tight">
                  Support<br />Available
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
