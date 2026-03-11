'use client';

import Image from 'next/image';

export function AnimatedBackground() {
  return (
    <div className="light-rays-bg absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 1 }}>
      <Image
        alt="Light rays TAMX AI"
        src="/LightRays.webp"
        width={880}
        height={975}
        priority
        className="h-auto"
        style={{ color: 'transparent' }}
      />
    </div>
  );
}
