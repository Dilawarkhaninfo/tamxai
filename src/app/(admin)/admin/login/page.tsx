"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

// --- 3D Background Components ---

function ParticleBackground() {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => {
    const pts = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const r = THREE.MathUtils.randFloat(2, 5);
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#9333EA"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* Blue particles */}
      <Points positions={sphere.map(v => v * 1.1)} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3B82F6"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// --- Login Page Component ---

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Dummy Authentication
    setTimeout(() => {
      if (email === 'admin@tamx.ai' && password === 'admin123') {
        localStorage.setItem('admin_auth', 'true');
        router.push('/admin');
      } else {
        setError('Invalid credentials. Please use admin@tamx.ai / admin123');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#030712] text-white overflow-hidden font-sans">
      {/* Left Side: Brand Animation Area */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-[#090E1A]">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ParticleBackground />
          </Canvas>
        </div>
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />

        <div className="relative z-10 text-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
               <motion.div
                animate={{ 
                  boxShadow: ["0 0 20px rgba(147, 51, 234, 0.3)", "0 0 40px rgba(168, 85, 247, 0.6)", "0 0 20px rgba(147, 51, 234, 0.3)"],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-0.5 flex items-center justify-center"
               >
                 <div className="w-full h-full bg-[#030712] rounded-2xl flex items-center justify-center p-4">
                    <img src="/Tamx_logo.png" alt="TAMx Logo" className="w-full h-auto" />
                 </div>
               </motion.div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-xl text-slate-400 max-w-md mx-auto">
              Secure Administrative Management
            </p>
          </motion.div>
        </div>

        {/* Neural Network Lines (Subtle Overlay) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
           {/* You can add SVG lines here for neural network effect if needed */}
        </div>
      </div>

      {/* Main Container: Full Screen & Centered */}
      <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 lg:p-0">
        
        {/* Mobile 3D Element: Shows only on small screens */}
        <div className="absolute inset-0 lg:hidden pointer-events-none opacity-40">
          <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <ParticleBackground />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712]" />
        </div>

        {/* Login Form Wrapper */}
        <div className="relative z-10 w-full max-w-[420px] lg:max-w-none lg:w-[480px] lg:h-full lg:flex lg:flex-col lg:justify-center lg:px-16 lg:bg-[#030712] lg:border-l lg:border-white/5">
          <div className="max-w-md w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/[0.02] backdrop-blur-xl lg:bg-transparent border border-white/5 lg:border-none p-8 sm:p-10 lg:p-0 rounded-[2.5rem] lg:rounded-none shadow-2xl lg:shadow-none"
            >
              <div className="flex flex-col items-center lg:items-start mb-10">
                <div className="lg:hidden w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-[1px]">
                  <div className="w-full h-full bg-[#030712] rounded-2xl flex items-center justify-center p-3">
                    <img src="/Tamx_logo.png" alt="TAMx" className="w-full h-auto object-contain" />
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight text-center lg:text-left">Welcome Back</h2>
                <p className="text-slate-400 text-sm sm:text-base text-center lg:text-left max-w-[280px] sm:max-w-none">Enter your credentials to access the TAMx Admin Dashboard.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-[#010205] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-white placeholder:text-slate-700 shadow-inner"
                    placeholder="ADMIN@TAMX.AI"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
                    <a href="#" className="text-[9px] font-black text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest">Forgot?</a>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-4 bg-[#010205] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-white placeholder:text-slate-700 shadow-inner tracking-widest"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-red-400 text-[10px] font-black uppercase tracking-widest bg-red-400/5 p-4 rounded-xl border border-red-400/20 text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-black text-[11px] text-white uppercase tracking-[0.3em] hover:shadow-2xl hover:shadow-purple-500/40 active:scale-[0.98] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group shadow-xl"
                >
                  <span className={loading ? 'opacity-0' : 'opacity-100'}>Login</span>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                </button>
              </form>

              <div className="mt-12 lg:mt-16 pt-8 border-t border-white/5">
                <p className="text-[10px] font-black text-slate-600 text-center uppercase tracking-[0.2em]">
                  © {new Date().getFullYear()} TAMx Systems Architecture
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
