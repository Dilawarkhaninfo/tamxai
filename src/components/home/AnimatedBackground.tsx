'use client';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Flashlight from top-left spreading to bottom */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Main diagonal light beam - top-left to bottom */}
        <div 
          className="absolute top-0 left-0 w-[50%] h-full"
          style={{
            background: `
              linear-gradient(
                160deg,
                rgba(147, 51, 234, 0.3) 0%,
                rgba(139, 92, 246, 0.24) 10%,
                rgba(124, 58, 237, 0.18) 20%,
                rgba(99, 102, 241, 0.14) 30%,
                rgba(79, 70, 229, 0.10) 40%,
                rgba(67, 56, 202, 0.07) 50%,
                rgba(59, 130, 246, 0.05) 60%,
                transparent 80%
              )
            `,
            filter: 'blur(140px)',
            mixBlendMode: 'screen',
            animation: 'cinematicBreathe 10s ease-in-out infinite'
          }}
        />
        
        {/* Secondary glow layer */}
        <div 
          className="absolute top-0 left-0 w-[45%] h-[95%]"
          style={{
            background: `
              radial-gradient(
                ellipse at top left,
                rgba(147, 51, 234, 0.22) 0%,
                rgba(139, 92, 246, 0.17) 15%,
                rgba(124, 58, 237, 0.13) 25%,
                rgba(99, 102, 241, 0.10) 35%,
                rgba(79, 70, 229, 0.07) 45%,
                rgba(59, 130, 246, 0.05) 55%,
                transparent 75%
              )
            `,
            filter: 'blur(120px)',
            mixBlendMode: 'screen',
            animation: 'cinematicBreathe 10s ease-in-out infinite 1s'
          }}
        />
        
        {/* Bright source at top-left corner */}
        <div 
          className="absolute top-[5%] left-[5%] w-[450px] h-[450px]"
          style={{
            background: `
              radial-gradient(
                circle,
                rgba(255, 255, 255, 0.08) 0%,
                rgba(200, 180, 255, 0.12) 15%,
                rgba(147, 51, 234, 0.18) 30%,
                rgba(139, 92, 246, 0.14) 45%,
                transparent 70%
              )
            `,
            filter: 'blur(100px)',
            mixBlendMode: 'screen',
            animation: 'cinematicBreathe 10s ease-in-out infinite 2s'
          }}
        />

        {/* Light rays spreading downward */}
        <div 
          className="absolute top-0 left-0 w-[48%] h-full"
          style={{
            background: `
              linear-gradient(
                155deg,
                rgba(255, 255, 255, 0.04) 0%,
                rgba(220, 200, 255, 0.03) 15%,
                rgba(147, 51, 234, 0.025) 30%,
                rgba(99, 102, 241, 0.02) 45%,
                transparent 65%
              )
            `,
            filter: 'blur(90px)',
            mixBlendMode: 'screen',
            animation: 'cinematicBreathe 10s ease-in-out infinite 0.5s'
          }}
        />
      </div>

      {/* Scrolling TAMX text background */}
      <div className="absolute inset-0 flex flex-col justify-center gap-12 opacity-[0.04]">
        {/* Row 1 - scrolling right */}
        <div className="animate-scroll-right whitespace-nowrap">
          <span className="text-[200px] font-display font-bold tracking-[0.2em] text-transparent"
            style={{
              WebkitTextStroke: '2px rgba(147, 51, 234, 0.3)'
            }}
          >
            TAMX TAMX TAMX TAMX TAMX TAMX TAMX TAMX TAMX TAMX
          </span>
        </div>

        {/* Row 2 - scrolling left */}
        <div className="animate-scroll-left whitespace-nowrap">
          <span className="text-[200px] font-display font-bold tracking-[0.2em] text-transparent"
            style={{
              WebkitTextStroke: '2px rgba(59, 130, 246, 0.3)'
            }}
          >
            TAMX TAMX TAMX TAMX TAMX TAMX TAMX TAMX TAMX TAMX
          </span>
        </div>

        {/* Row 3 - scrolling right */}
        <div className="animate-scroll-right whitespace-nowrap">
          <span className="text-[200px] font-display font-bold tracking-[0.2em] text-transparent"
            style={{
              WebkitTextStroke: '2px rgba(147, 51, 234, 0.3)'
            }}
          >
            TAMX TAMX TAMX TAMX TAMX TAMX TAMX TAMX TAMX TAMX
          </span>
        </div>
      </div>
    </div>
  );
}
