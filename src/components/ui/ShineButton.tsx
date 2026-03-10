'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ShineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
}

export function ShineButton({ children, className = '', href, ...props }: ShineButtonProps) {
  const buttonContent = (
    <button
      className={`
        relative overflow-hidden
        px-10 py-4 rounded-full
        font-medium text-white
        bg-[#6a67ce]/80 backdrop-blur-md
        border border-white/20
        transition-all duration-300
        hover:bg-[#6a67ce] hover:border-white/40
        hover:shadow-[0_0_20px_rgba(106,103,206,0.3)]
        group
        ${className}
      `}
      {...props}
    >
      {/* Shine effect overlay */}
      <span
        className="absolute inset-0 w-full h-full
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          translate-x-full
          group-hover:animate-[shine_1.5s_ease-in-out_infinite]
          pointer-events-none"
      />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 text-lg">
        {children}
      </span>
    </button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
