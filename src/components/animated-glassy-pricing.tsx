import React, { useRef, useEffect, useState } from 'react';
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";
// --- Internal Helper Components (Not exported) --- //

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glProgramRef = useRef<WebGLProgram | null>(null);
  const glBgColorLocationRef = useRef<WebGLUniformLocation | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const [backgroundColor, setBackgroundColor] = useState([0.02, 0.02, 0.02]); // Default to dark

  useEffect(() => {
    const root = document.documentElement;
    const updateColor = () => {
      const isDark = root.classList.contains('dark');
      // For pricing page, we follow the user request to keep it dark
      setBackgroundColor([0.02, 0.02, 0.02]); 
    };
    updateColor();
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateColor();
        }
      }
    });
    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const gl = glRef.current;
    const program = glProgramRef.current;
    const location = glBgColorLocationRef.current;
    if (gl && program && location) {
      gl.useProgram(program);
      gl.uniform3fv(location, new Float32Array(backgroundColor));
    }
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) { console.error("WebGL not supported"); return; }
    glRef.current = gl;

    const vertexShaderSource = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){ return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0; }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff = center-uv;
        float len = length(diff);
        len += variation(diff,vec2(0.,1.),5.,2.);
        len -= variation(diff,vec2(1.,0.),5.,2.);
        float circle = smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        uv.x *= 1.5; uv.x -= 0.25;
        float mask = 0.0;
        float radius = .35;
        vec2 center = vec2(.5);
        mask += paintCircle(uv,center,radius,.035).r;
        mask += paintCircle(uv,center,radius-.018,.01).r;
        mask += paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;
        vec3 foregroundColor=vec3(v.x,v.y,.7-v.y*v.x);
        vec3 color=mix(uBackgroundColor,foregroundColor,mask);
        color=mix(color,vec3(1.),paintCircle(uv,center,radius,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Could not create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation error");
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) throw new Error("Could not create program");
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    glProgramRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const iResLoc = gl.getUniformLocation(program, 'iResolution');
    glBgColorLocationRef.current = gl.getUniformLocation(program, 'uBackgroundColor');
    gl.uniform3fv(glBgColorLocationRef.current, new Float32Array(backgroundColor));

    let animationFrameId: number;
    const render = (time: number) => {
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full block z-0 bg-background" />;
};


// --- EXPORTED Building Blocks --- //

/**
 * We export the Props interface so you can easily type the data for your plans.
 */
export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: 'primary' | 'secondary';
}

/**
 * We export the PricingCard component itself in case you want to use it elsewhere.
 */
export const PricingCard = ({
  planName, description, price, features, buttonText, isPopular = false, buttonVariant = 'primary'
}: PricingCardProps) => {
  const cardClasses = `
    backdrop-blur-[14px] bg-gradient-to-br rounded-2xl shadow-xl flex-1 w-full max-w-[400px] px-6 py-8 md:px-8 md:py-10 flex flex-col transition-all duration-500
    from-black/5 to-black/0 border border-black/10
    dark:from-white/10 dark:to-white/5 dark:border-white/10 dark:backdrop-brightness-[0.91]
    ${isPopular ? 'lg:scale-105 relative ring-2 ring-cyan-400/20 dark:from-white/20 dark:to-white/10 dark:border-cyan-400/30 shadow-2xl z-10' : 'z-0'}
  `;
  const buttonClasses = `
    mt-auto w-full py-2.5 rounded-xl font-semibold text-[14px] transition font-sans
    ${buttonVariant === 'primary' 
      ? 'bg-cyan-400 hover:bg-cyan-300 text-foreground' 
      : 'bg-black/10 hover:bg-black/20 text-foreground border border-black/20 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20'
    }
  `;

  return (
    <div className={cardClasses.trim()}>
      {isPopular && (
        <div className="absolute -top-4 right-4 px-3 py-1 text-[12px] font-semibold rounded-full bg-cyan-400 text-foreground dark:text-black">
          Most Popular
        </div>
      )}
      <div className="mb-3">
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-extralight tracking-[-0.03em] text-foreground font-display leading-tight">{planName}</h2>
        <p className="text-[14px] md:text-[16px] text-foreground/70 mt-2 font-sans leading-relaxed">{description}</p>
      </div>
      <div className="my-6 flex items-baseline gap-2">
        {price.toLowerCase() === 'custom' ? (
          <span className="text-[32px] md:text-[36px] font-extralight text-foreground font-display">Custom Pricing</span>
        ) : (
          <>
            <span className="text-[40px] md:text-[48px] font-extralight text-foreground font-display leading-none">${price}</span>
            <span className="text-[14px] text-foreground/70 font-sans">/mo</span>
          </>
        )}
      </div>
      <div className="card-divider w-full mb-5 h-px bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1)_50%,transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09)_20%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.09)_80%,transparent)]"></div>
      <ul className="flex flex-col gap-2 text-[14px] text-foreground/90 mb-6 font-sans">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckIcon className="text-cyan-400 w-4 h-4" /> {feature}
          </li>
        ))}
      </ul>
      <RippleButton className={buttonClasses.trim()}>{buttonText}</RippleButton>
    </div>
  );
};


/**
 * We export the FeaturedStartupPlan component for unique, full-width "Startup Builder" style sections.
 * This version is highly interactive with mouse-tracking glows and feature tiles.
 */
export const FeaturedStartupPlan = ({
  planName, description, features, buttonText
}: Omit<PricingCardProps, 'price' | 'buttonVariant' | 'isPopular'>) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full max-w-7xl mt-12 md:mt-24 p-6 sm:p-10 md:p-20 rounded-3xl md:rounded-[3rem] backdrop-blur-3xl bg-white/[0.03] border border-white/10 relative overflow-hidden group shadow-[0_0_50px_rgba(122,92,255,0.1)] transition-all duration-500 hover:shadow-[0_0_80px_rgba(122,92,255,0.2)]"
    >
      {/* Moving Border Beam Effect */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-border-beam" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#7A5CFF] to-transparent animate-border-beam-v" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-border-beam" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#7A5CFF] to-transparent animate-border-beam-v" />
      </div>

      {/* Dynamic Mouse Tracking Glow */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(122,92,255,0.15), transparent 80%)`,
        }}
      />

      {/* Static Decorative Glows */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#7A5CFF]/5 via-transparent to-[#4F46E5]/5 z-0" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#7A5CFF]/10 blur-[120px] rounded-full animate-pulse z-0" />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Left Content */}
        <div className="lg:w-2/5 flex flex-col">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-[10px] sm:text-xs font-bold mb-8 tracking-[0.2em] uppercase shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Premium Founder Edition
          </div>
          
          <h2 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-extralight tracking-[-0.04em] text-white leading-[1] md:leading-[0.9] font-display mb-6 md:mb-8">
            {planName.split(' ').map((word, i) => (
              <span key={i} className="block last:text-cyan-400 last:font-normal">{word}</span>
            ))}
          </h2>
          
          <p className="text-[18px] md:text-[22px] lg:text-[24px] text-foreground/70 font-sans font-light leading-relaxed mb-8 md:mb-10 border-l-2 border-[#7A5CFF]/30 pl-6">
            {description}
          </p>
          
          <div className="group/link flex items-center gap-4 text-white hover:text-cyan-400 transition-colors cursor-pointer mt-auto">
            <div className="w-12 h-px bg-white/20 group-hover/link:w-20 group-hover/link:bg-cyan-400/50 transition-all duration-500" />
            <span className="text-sm font-semibold tracking-widest uppercase">{buttonText}</span>
          </div>
        </div>

        {/* Right Feature Grid with Tiles */}
        <div className="lg:w-3/5 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-cyan-400/30 hover:bg-white/[0.08] transition-all duration-300 group/tile relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 blur-3xl group-hover/tile:bg-cyan-400/10 transition-all" />
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                  <CheckIcon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[17px] md:text-[19px] text-white font-medium font-sans">
                    {feature}
                  </span>
                  <div className="h-0.5 w-0 bg-cyan-400/50 group-hover/tile:w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
          
          {/* Extra Magic Card */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-r from-[#7A5CFF]/10 to-transparent border border-[#7A5CFF]/20 flex items-center justify-between mt-4">
            <div>
              <p className="text-white font-semibold text-lg">Ready to disrupt the market?</p>
              <p className="text-foreground/60 text-sm">Join 50+ successful founders powered by TAMx AI.</p>
            </div>
            <div className="hidden sm:block">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020202] bg-white/10" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- EXPORTED Customizable Page Component --- //

interface ModernPricingPageProps {
  /** The main title. Can be a string or a ReactNode for more complex content. */
  title: React.ReactNode;
  /** The subtitle text appearing below the main title. */
  subtitle: React.ReactNode;
  /** An array of plan objects that conform to PricingCardProps. */
  plans: PricingCardProps[];
  /** Optional featured plan data for "Startup Builder" style full-width sections. */
  featuredPlan?: Omit<PricingCardProps, 'price' | 'buttonVariant' | 'isPopular'>;
  /** Whether to show the animated WebGL background. Defaults to true. */
  showAnimatedBackground?: boolean;
}

export const ModernPricingPage = ({
  title,
  subtitle,
  plans,
  featuredPlan,
  showAnimatedBackground = true,
}: ModernPricingPageProps) => {
  return (
    <div className="dark bg-background text-foreground min-h-screen w-full overflow-x-hidden pb-20">
      {showAnimatedBackground && <ShaderCanvas />}
      <main className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 pt-32">
        <div className="w-full max-w-5xl mx-auto text-center mb-10 md:mb-16">
          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[72px] font-extralight leading-[1.1] tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-cyan-500 to-blue-600 dark:from-white dark:via-cyan-300 dark:to-blue-400 font-display">
            {title}
          </h1>
          <p className="mt-4 text-[15px] sm:text-[18px] md:text-[20px] text-foreground/80 max-w-3xl mx-auto font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>
        
        {/* Main Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center items-stretch w-full max-w-7xl px-2 sm:px-4">
          {plans.map((plan) => (
            <div key={plan.planName} className="flex h-full">
              <PricingCard {...plan} />
            </div>
          ))}
        </div>

        {/* Featured Section (Startup Builder) */}
        {featuredPlan && (
          <FeaturedStartupPlan {...featuredPlan} />
        )}
      </main>
    </div>
  );
};