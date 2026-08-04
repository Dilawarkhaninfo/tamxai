'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Use next/dynamic with ssr: false to prevent hydration errors and improve client-side performance.
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
})

interface SplineSceneProps {
  scene: string
  className?: string
}

export const SplineScene = React.memo(function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
})

export default SplineScene
