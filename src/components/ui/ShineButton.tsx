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
        px-8 py-4 rounded-lg
        font-semibold text-white
        gradient-purple-blue
        transition-all duration-300
        hover:scale-105 hover:shadow-[0_8px_30px_rgba(147,51,234,0.5)]
        group
        ${className}
      `}
      {...props}
    >
      {/* Shine effect overlay */}
      <span
        className="absolute inset-0 w-full h-full
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          -translate-x-full
          group-hover:translate-x-full
          transition-transform duration-700 ease-in-out
          pointer-events-none"
      />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
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
