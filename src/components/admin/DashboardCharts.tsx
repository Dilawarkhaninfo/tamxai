"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Simple Line Chart ---
export function TrafficChart() {
  const data = [30, 45, 35, 60, 55, 80, 75, 90, 85, 110, 100, 130];
  const max = Math.max(...data);
  const width = 800;
  const height = 200;
  
  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - (val / max) * height
  }));

  const pathData = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-bold text-white">Website Traffic</h4>
          <p className="text-sm text-slate-400">Visitor volume over the last 12 months</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_#9333EA]" />
            <span className="text-slate-300">Unique Visitors</span>
          </div>
        </div>
      </div>
      
      <div className="h-[200px] w-full relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((p) => (
            <line
              key={p}
              x1="0"
              y1={height * (1 - p)}
              x2={width}
              y2={height * (1 - p)}
              stroke="white"
              strokeOpacity="0.05"
            />
          ))}

          {/* Line Path */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Area Fill */}
          <motion.path
            d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
            fill="url(#areaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#9333EA"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + i * 0.1 }}
              className="drop-shadow-[0_0_8px_#9333EA]"
            />
          ))}

          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

// --- Simple Bar Chart ---
export function EngagementChart() {
  const data = [65, 40, 80, 50, 90, 70, 45, 85];
  const labels = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'];

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-bold text-white">Blog Engagement</h4>
          <p className="text-sm text-slate-400">Average read time per post (minutes)</p>
        </div>
      </div>

      <div className="h-[200px] flex items-end justify-between gap-2 px-2">
        {data.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="w-full relative">
               <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className="w-full bg-gradient-to-t from-blue-600/40 to-blue-400 rounded-t-lg group-hover:to-cyan-400 transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-500" />
              </motion.div>
              {/* Tooltip on hover */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1E293B] text-[10px] font-bold text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {val}m
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
