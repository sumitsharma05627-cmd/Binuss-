import React, { useState } from 'react';
import {
  Globe,
  Zap,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Code2,
  BarChart3,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface HeroCore2DProps {
  className?: string;
  isCompact?: boolean;
  isVisible?: boolean;
}

export const HeroCore2D: React.FC<HeroCore2DProps> = ({
  className = '',
  isCompact = false,
  isVisible = true
}) => {
  const { themeConfig } = useTheme();
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 'speed',
      title: 'Ultra-Fast Web',
      stat: '0.8s LCP',
      detail: 'Clean TypeScript & zero bloat',
      icon: Zap,
      color: 'emerald'
    },
    {
      id: 'leads',
      title: 'Direct Conversion',
      stat: '+310% Funnel',
      detail: 'Instant WhatsApp & qualified call routing',
      icon: MessageSquare,
      color: 'teal'
    },
    {
      id: 'rank',
      title: 'Rank #1 Local',
      stat: 'Top 3 Maps',
      detail: 'High-intent organic buyer discovery',
      icon: TrendingUp,
      color: 'cyan'
    }
  ];

  if (!isVisible) return null;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${
        isCompact ? 'w-[320px] h-[320px]' : 'w-full max-w-[560px] h-[460px] sm:h-[520px]'
      } ${className}`}
    >
      {/* Radiant Background Ambient Glow */}
      <div
        className="absolute inset-0 rounded-full blur-[90px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${themeConfig.primaryColor} 0%, ${themeConfig.accentColor} 50%, transparent 80%)`
        }}
      />

      {/* SVG Animated Circuit & Concentric Orbit Rings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={themeConfig.primaryColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={themeConfig.accentColor} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Outer Orbit */}
        <circle
          cx="250"
          cy="250"
          r={isCompact ? '135' : '195'}
          stroke="url(#orbitGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="animate-[spin_45s_linear_infinite]"
        />

        {/* Middle Orbit */}
        <circle
          cx="250"
          cy="250"
          r={isCompact ? '95' : '140'}
          stroke={themeConfig.primaryColor}
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="4 6"
          className="animate-[spin_30s_linear_infinite_reverse]"
        />

        {/* Inner Tech Ring */}
        <circle
          cx="250"
          cy="250"
          r={isCompact ? '65' : '90'}
          stroke={themeConfig.accentColor}
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />

        {/* Animated Radial Energy Rays */}
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const r1 = isCompact ? 70 : 95;
          const r2 = isCompact ? 125 : 185;
          const x1 = 250 + Math.cos(rad) * r1;
          const y1 = 250 + Math.sin(rad) * r1;
          const x2 = 250 + Math.cos(rad) * r2;
          const y2 = 250 + Math.sin(rad) * r2;
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={themeConfig.primaryColor}
              strokeOpacity="0.2"
              strokeDasharray="2 4"
            />
          );
        })}
      </svg>

      {/* Central Interactive Nexus Hub */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className={`relative z-10 flex flex-col items-center justify-center rounded-3xl backdrop-blur-2xl bg-slate-950/80 border border-white/15 shadow-2xl p-6 text-center ${
          isCompact ? 'w-44 h-44' : 'w-56 h-56 sm:w-64 sm:h-64'
        }`}
        style={{
          boxShadow: `0 0 50px -10px ${themeConfig.primaryColor}40`
        }}
      >
        {/* Glowing Engine Icon */}
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 shadow-lg transition-transform duration-300 hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${themeConfig.primaryColor}25, ${themeConfig.accentColor}15)`,
            border: `1px solid ${themeConfig.primaryColor}50`
          }}
        >
          <Cpu className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: themeConfig.primaryColor }} />
        </div>

        <div className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-slate-400 mb-0.5">
          ENGINE STATUS
        </div>
        <div className="font-display font-black text-sm sm:text-lg text-white tracking-tight flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Growth Active</span>
        </div>

        {!isCompact && (
          <div className="mt-2.5 pt-2.5 border-t border-white/10 w-full flex items-center justify-around text-[10px] text-slate-300">
            <div>
              <span className="font-bold text-white block">99.4</span>
              <span className="text-slate-500">Speed</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <span className="font-bold text-emerald-400 block">100%</span>
              <span className="text-slate-500">Code IP</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <span className="font-bold text-cyan-400 block">#1</span>
              <span className="text-slate-500">SEO</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Orbiting Interactive Pillar Cards (Only in full mode) */}
      {!isCompact && (
        <>
          {/* Top-Right: Fast Web */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActivePillar(0)}
            className="absolute -top-2 right-2 sm:right-6 z-20 cursor-pointer p-3 sm:p-3.5 rounded-2xl backdrop-blur-xl bg-slate-900/85 border border-white/10 hover:border-emerald-400/50 shadow-xl transition-all w-40 sm:w-44"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-white">Ultra-Fast Web</span>
            </div>
            <div className="text-xs font-bold text-emerald-400">0.8s Load Time</div>
            <div className="text-[10px] text-slate-400">Zero template bloat</div>
          </motion.div>

          {/* Bottom-Right: Conversion Funnel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActivePillar(1)}
            className="absolute -bottom-2 right-0 sm:right-4 z-20 cursor-pointer p-3 sm:p-3.5 rounded-2xl backdrop-blur-xl bg-slate-900/85 border border-white/10 hover:border-teal-400/50 shadow-xl transition-all w-44 sm:w-48"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-teal-400/20 text-teal-300 flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-white">WhatsApp & Call</span>
            </div>
            <div className="text-xs font-bold text-teal-300">+310% Inquiries</div>
            <div className="text-[10px] text-slate-400">High-intent client routing</div>
          </motion.div>

          {/* Left-Center: Local Dominance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActivePillar(2)}
            className="absolute top-1/3 -left-2 sm:-left-6 z-20 cursor-pointer p-3 sm:p-3.5 rounded-2xl backdrop-blur-xl bg-slate-900/85 border border-white/10 hover:border-cyan-400/50 shadow-xl transition-all w-40 sm:w-44"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-white">Local Search</span>
            </div>
            <div className="text-xs font-bold text-cyan-300">Top 3 Google Maps</div>
            <div className="text-[10px] text-slate-400">Organic territory capture</div>
          </motion.div>
        </>
      )}
    </div>
  );
};
