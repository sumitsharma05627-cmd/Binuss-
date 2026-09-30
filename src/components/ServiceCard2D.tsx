import React from 'react';
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Code2,
  Zap,
  TrendingUp,
  Target,
  Share2,
  Palette,
  Filter,
  Compass,
  Cpu,
  ShieldCheck,
  Search,
  MessageSquare,
  Video,
  Flame,
  Play,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { ServiceItem } from '../types';

interface ServiceCard2DProps {
  service: ServiceItem;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  onInquire: (e: React.MouseEvent) => void;
  isVisible?: boolean;
}

export const ServiceCard2D: React.FC<ServiceCard2DProps> = ({
  service,
  index,
  isHovered,
  onHover,
  onClick,
  onInquire,
  isVisible = true
}) => {
  const accentColor = service.accentColor || '#10b981';

  // Render high-quality, tailored 2D micro-illustration
  const renderMicroIllustration = () => {
    switch (service.threeType) {
      case 'website':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            {/* Ambient Backlight */}
            <div
              className="absolute inset-2 rounded-2xl blur-xl opacity-25 transition-opacity duration-500 group-hover:opacity-50"
              style={{ background: accentColor }}
            />

            {/* Glass Browser Frame */}
            <div
              className={`relative w-48 rounded-xl bg-slate-950/80 border transition-all duration-300 overflow-hidden shadow-xl ${
                isHovered
                  ? 'border-emerald-400/80 -translate-y-1 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)]'
                  : 'border-white/10'
              }`}
            >
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between px-2.5 py-1.5 bg-white/[0.04] border-b border-white/5">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[8px] font-mono text-neutral-400">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span>fast.gwlweblab.dev</span>
                </div>
              </div>

              {/* Mock Viewport */}
              <div className="p-2.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-2 w-14 rounded-full bg-emerald-400/50" />
                    <div className="h-1.5 w-20 rounded-full bg-white/20" />
                  </div>
                  <div className="p-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  <div className="px-2 py-1 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <span className="text-[9px] text-neutral-400">LCP</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">0.8s</span>
                  </div>
                  <div className="px-2 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-[9px] text-emerald-300">Score</span>
                    <div className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-emerald-300">
                      <Zap className="w-2.5 h-2.5 fill-emerald-400" />
                      <span>99</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            <div
              className="absolute inset-2 rounded-2xl blur-xl opacity-20 transition-opacity duration-500 group-hover:opacity-45"
              style={{ background: accentColor }}
            />

            <div
              className={`relative w-48 p-3 rounded-xl bg-slate-950/80 border transition-all duration-300 shadow-xl ${
                isHovered
                  ? 'border-teal-400/80 -translate-y-1 shadow-[0_10px_25px_-5px_rgba(20,184,166,0.3)]'
                  : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-teal-300">
                  <Search className="w-3 h-3 text-teal-400" />
                  <span className="font-semibold">Google SERP</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-teal-400/20 border border-teal-400/40 text-[9px] font-bold text-teal-300">
                  Rank #1
                </span>
              </div>

              {/* Growth Bars */}
              <div className="flex items-end justify-between h-11 px-2 pt-1 bg-white/[0.02] rounded-lg border border-white/5">
                {[35, 52, 68, 82, 100].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-3.5 rounded-t transition-all duration-500 ${
                        i === 4
                          ? 'bg-gradient-to-t from-teal-500 to-teal-300 shadow-sm shadow-teal-400/50'
                          : 'bg-teal-500/30 group-hover:bg-teal-500/50'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[7px] text-neutral-500 font-mono">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ads':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            <div
              className="absolute inset-2 rounded-2xl blur-xl opacity-20 transition-opacity duration-500 group-hover:opacity-45"
              style={{ background: accentColor }}
            />

            <div
              className={`relative w-48 p-3 rounded-xl bg-slate-950/80 border transition-all duration-300 shadow-xl flex items-center justify-between ${
                isHovered
                  ? 'border-cyan-400/80 -translate-y-1 shadow-[0_10px_25px_-5px_rgba(6,182,212,0.3)]'
                  : 'border-white/10'
              }`}
            >
              {/* Concentric Crosshair Radar */}
              <div className="relative w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center">
                <div
                  className={`w-11 h-11 rounded-full border border-dashed border-cyan-400/60 flex items-center justify-center transition-transform duration-700 ${
                    isHovered ? 'rotate-45' : ''
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-cyan-300" />
                  </div>
                </div>
                <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>

              {/* Ad Intent Telemetry */}
              <div className="flex flex-col items-end gap-1.5">
                <div className="px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300">
                  4.8x ROAS
                </div>
                <div className="text-[9px] text-neutral-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>Zero Waste</span>
                </div>
                <span className="text-[8px] text-neutral-500 uppercase tracking-widest">
                  High-Intent
                </span>
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            <div
              className="absolute inset-2 rounded-2xl blur-xl opacity-20 transition-opacity duration-500 group-hover:opacity-45"
              style={{ background: accentColor }}
            />

            <div
              className={`relative w-48 p-3 rounded-xl bg-slate-950/80 border transition-all duration-300 shadow-xl flex items-center justify-between ${
                isHovered
                  ? 'border-violet-400/80 -translate-y-1 shadow-[0_10px_25px_-5px_rgba(139,92,246,0.3)]'
                  : 'border-white/10'
              }`}
            >
              <div className="relative w-14 h-14 rounded-xl bg-violet-950/40 border border-violet-500/30 flex items-center justify-center">
                <Share2
                  className={`w-6 h-6 text-violet-300 transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}
                />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-violet-400" />
              </div>

              <div className="flex flex-col gap-1 text-right">
                <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-[10px] font-mono font-semibold text-violet-300">
                  Multi-Channel
                </span>
                <span className="text-[10px] text-neutral-300 font-medium">
                  Continuous Reach
                </span>
                <span className="text-[8px] text-neutral-500 font-mono uppercase">
                  Engaged Community
                </span>
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            <div
              className="absolute inset-2 rounded-2xl blur-xl opacity-20 transition-opacity duration-500 group-hover:opacity-45"
              style={{ background: accentColor }}
            />

            <div
              className={`relative w-48 p-3 rounded-xl bg-slate-950/80 border transition-all duration-300 shadow-xl flex items-center justify-between ${
                isHovered
                  ? 'border-amber-400/80 -translate-y-1 shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)]'
                  : 'border-white/10'
              }`}
            >
              {/* Type & Identity Specimen */}
              <div className="w-14 h-14 rounded-xl bg-amber-950/40 border border-amber-500/30 flex flex-col items-center justify-center">
                <span className="font-display font-extrabold text-xl text-amber-300">Aa</span>
                <div className="flex gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-300">
                  <Palette className="w-3 h-3 text-amber-400" />
                  <span>Design System</span>
                </div>
                <span className="text-[9px] text-neutral-400 font-mono">
                  Visual Cohesion
                </span>
                <span className="text-[8px] text-neutral-500 uppercase tracking-wider">
                  Brand Guidelines
                </span>
              </div>
            </div>
          </div>
        );

      case 'leads':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            <div
              className="absolute inset-2 rounded-2xl blur-xl opacity-20 transition-opacity duration-500 group-hover:opacity-45"
              style={{ background: accentColor }}
            />

            <div
              className={`relative w-48 p-3 rounded-xl bg-slate-950/80 border transition-all duration-300 shadow-xl flex items-center justify-between ${
                isHovered
                  ? 'border-emerald-400/80 -translate-y-1 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)]'
                  : 'border-white/10'
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center">
                <Filter className="w-6 h-6 text-emerald-400 mb-0.5" />
                <span className="w-6 h-0.5 rounded-full bg-emerald-400" />
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>WhatsApp Ready</span>
                </div>
                <span className="text-[9px] text-neutral-400 font-mono">
                  Warm Pipeline
                </span>
                <span className="text-[8px] text-neutral-500 uppercase tracking-wider">
                  Auto-Qualified
                </span>
              </div>
            </div>
          </div>
        );

      case 'growth':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            <div
              className="absolute inset-2 rounded-2xl blur-xl opacity-20 transition-opacity duration-500 group-hover:opacity-45"
              style={{ background: accentColor }}
            />

            <div
              className={`relative w-48 p-3 rounded-xl bg-slate-950/80 border transition-all duration-300 shadow-xl flex items-center justify-between ${
                isHovered
                  ? 'border-blue-400/80 -translate-y-1 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.3)]'
                  : 'border-white/10'
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-center">
                <TrendingUp
                  className={`w-7 h-7 text-blue-300 transition-transform duration-300 ${
                    isHovered ? 'scale-110 translate-x-0.5 -translate-y-0.5' : ''
                  }`}
                />
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-[10px] font-mono font-bold text-blue-300">
                  <Compass className="w-3 h-3 text-blue-400" />
                  <span>Roadmap</span>
                </div>
                <span className="text-[9px] text-neutral-400 font-mono">
                  CAC Optimization
                </span>
                <span className="text-[8px] text-neutral-500 uppercase tracking-wider">
                  Revenue Predictability
                </span>
              </div>
            </div>
          </div>
        );

      case 'creator':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            <div
              className="absolute inset-2 rounded-2xl blur-xl opacity-25 transition-opacity duration-500 group-hover:opacity-55"
              style={{ background: '#ec4899' }}
            />

            <div
              className={`relative w-48 p-3 rounded-xl bg-slate-950/80 border transition-all duration-300 shadow-xl flex items-center justify-between ${
                isHovered
                  ? 'border-pink-400/90 -translate-y-1 shadow-[0_10px_25px_-5px_rgba(236,72,153,0.35)]'
                  : 'border-white/10'
              }`}
            >
              {/* Creator Live Recording Frame */}
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-pink-950/60 to-rose-950/60 border border-pink-500/40 flex flex-col items-center justify-center overflow-hidden">
                <Video
                  className={`w-6 h-6 text-pink-300 transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}
                />
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[8px] font-mono text-rose-300 font-bold tracking-wider">LIVE</span>
                </div>
              </div>

              {/* Creator Collab Metrics */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-[10px] font-mono font-bold text-pink-300 [data-theme='clean-light']:text-pink-800 [data-theme='clean-light']:bg-pink-100">
                  <Users className="w-3 h-3 text-pink-400 [data-theme='clean-light']:text-pink-700" />
                  <span>Brand x Creator</span>
                </div>
                <span className="text-[9px] text-neutral-200 [data-theme='clean-light']:text-slate-700 font-semibold flex items-center gap-1">
                  <Flame className="w-3 h-3 text-rose-400" />
                  <span>10x Authentic Reach</span>
                </span>
                <span className="text-[8px] text-pink-300 [data-theme='clean-light']:text-pink-700 font-mono uppercase tracking-wider font-bold">
                  UGC & Rev-Share
                </span>
              </div>
            </div>
          </div>
        );

      case 'ai':
      default:
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            <div
              className="absolute inset-2 rounded-2xl blur-xl opacity-20 transition-opacity duration-500 group-hover:opacity-45"
              style={{ background: accentColor }}
            />

            <div
              className={`relative w-48 p-3 rounded-xl bg-slate-950/80 border transition-all duration-300 shadow-xl flex items-center justify-between ${
                isHovered
                  ? 'border-teal-400/80 -translate-y-1 shadow-[0_10px_25px_-5px_rgba(45,212,191,0.3)]'
                  : 'border-white/10'
              }`}
            >
              <div className="relative w-14 h-14 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-center">
                <Cpu
                  className={`w-7 h-7 text-teal-300 transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}
                />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-teal-500/15 border border-teal-500/30 text-[10px] font-mono font-bold text-teal-300">
                  <Sparkles className="w-3 h-3 text-teal-400" />
                  <span>24/7 Autopilot</span>
                </div>
                <span className="text-[9px] text-neutral-400 font-mono">
                  Smart Triage
                </span>
                <span className="text-[8px] text-neutral-500 uppercase tracking-wider">
                  Zero Ops Friction
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      id={`service-card-${service.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.06,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative rounded-2xl p-6 transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        isHovered
          ? "bg-slate-900/85 [data-theme='clean-light']:bg-white -translate-y-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] [data-theme='clean-light']:shadow-[0_16px_32px_rgba(0,0,0,0.08)]"
          : "bg-[#090e1a]/60 [data-theme='clean-light']:bg-white hover:bg-[#0c1222]/80 [data-theme='clean-light']:hover:bg-slate-50 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] [data-theme='clean-light']:shadow-[0_4px_16px_rgba(0,0,0,0.04)] [data-theme='clean-light']:border-slate-200"
      } border backdrop-blur-xl`}
      style={{
        borderColor: isHovered ? `${accentColor}55` : 'rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Specular Inner Hairline Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {/* Ambient Hover Spotlight */}
      <div
        className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
        style={{
          background: accentColor,
          opacity: isHovered ? 0.22 : 0.04
        }}
      />

      {/* Top Bar: Sequence Number, Category Pill & Interactive Corner Action */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded-md border"
            style={{
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}35`,
              color: accentColor
            }}
          >
            {service.number}
          </span>
          {service.categoryTag && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 [data-theme='clean-light']:text-slate-600 font-semibold">
              {service.categoryTag}
            </span>
          )}
        </div>

        {/* Micro Action Button */}
        <div
          className="p-1.5 rounded-full border transition-all duration-300"
          style={{
            backgroundColor: isHovered ? `${accentColor}25` : 'rgba(255, 255, 255, 0.05)',
            borderColor: isHovered ? `${accentColor}60` : 'rgba(255, 255, 255, 0.1)',
            color: isHovered ? accentColor : '#94a3b8'
          }}
          title={`View ${service.title} details`}
        >
          <ArrowUpRight
            className={`w-4 h-4 transition-transform duration-300 ${
              isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''
            }`}
          />
        </div>
      </div>

      {/* 2D Micro-Illustration Stage */}
      <div className="relative z-10 py-1">{renderMicroIllustration()}</div>

      {/* Card Content */}
      <div className="mt-3 relative z-10">
        <h3
          className={`font-display text-xl font-bold mb-1.5 transition-colors duration-200 ${
            service.threeType === 'creator'
              ? "text-pink-300 [data-theme='clean-light']:text-pink-700 group-hover:text-pink-200 [data-theme='clean-light']:group-hover:text-pink-900 font-extrabold"
              : "text-white [data-theme='clean-light']:text-slate-900 group-hover:text-emerald-400 [data-theme='clean-light']:group-hover:text-emerald-600"
          }`}
        >
          {service.title}
        </h3>

        <p className="text-neutral-300 [data-theme='clean-light']:text-slate-600 text-xs sm:text-sm leading-relaxed mb-3.5 line-clamp-2">
          {service.shortDesc}
        </p>

        {/* Deliverable Micro-Pills */}
        {service.keyPills && service.keyPills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {service.keyPills.map((pill, pIdx) => (
              <span
                key={pIdx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-tight transition-all duration-200 text-neutral-300 [data-theme='clean-light']:text-slate-700"
                style={{
                  backgroundColor: isHovered ? `${accentColor}18` : 'rgba(255, 255, 255, 0.04)',
                  borderColor: isHovered ? `${accentColor}35` : 'rgba(255, 255, 255, 0.08)',
                  borderWidth: 1
                }}
              >
                <CheckCircle2
                  className="w-2.5 h-2.5 shrink-0"
                  style={{ color: accentColor }}
                />
                <span>{pill}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Bottom: Metric Highlight & Blueprint Action */}
      <div className="pt-3 border-t border-white/5 [data-theme='clean-light']:border-slate-200 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-[11px] text-neutral-400 [data-theme='clean-light']:text-slate-600 truncate max-w-[170px] font-mono">
            {service.metrics}
          </span>
        </div>

        <button
          type="button"
          onClick={onInquire}
          className="text-[11px] font-medium px-2 py-1 rounded-md transition-all duration-200 hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: `${accentColor}18`,
            color: accentColor
          }}
        >
          Inquire
        </button>
      </div>
    </motion.div>
  );
};
