import React from 'react';
import {
  Globe,
  Search,
  Target,
  Share2,
  Sparkles,
  Filter,
  TrendingUp,
  Cpu,
  Zap,
  Code2,
  Compass,
  ArrowUpRight,
  Video,
  Flame
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface ServiceIcon2DProps {
  type: 'website' | 'seo' | 'ads' | 'social' | 'branding' | 'leads' | 'growth' | 'ai' | 'creator';
  isHovered?: boolean;
  isVisible?: boolean;
}

export const ServiceIcon2D: React.FC<ServiceIcon2DProps> = ({
  type,
  isHovered = false,
  isVisible = true
}) => {
  const { themeConfig } = useTheme();

  if (!isVisible) return null;

  // Visual configuration based on service type
  const renderVisual = () => {
    switch (type) {
      case 'website':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-3">
            {/* 2D Browser Window Mockup */}
            <div className={`w-full max-w-[130px] rounded-xl bg-slate-950/80 border border-emerald-500/30 shadow-lg overflow-hidden transition-all duration-300 ${isHovered ? 'scale-105 border-emerald-400' : ''}`}>
              <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.04] border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                <div className="ml-1.5 h-1.5 w-10 rounded-full bg-white/10" />
              </div>
              <div className="p-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="h-2 w-12 rounded bg-emerald-500/40" />
                  <Code2 className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="grid grid-cols-2 gap-1 pt-1">
                  <div className="h-6 rounded bg-white/[0.04] border border-white/5 flex items-center justify-center">
                    <span className="text-[8px] font-mono text-emerald-300">0.8s</span>
                  </div>
                  <div className="h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Zap className="w-2.5 h-2.5 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`relative p-3 rounded-2xl bg-slate-950/70 border border-teal-500/30 transition-all duration-300 ${isHovered ? 'scale-105 border-teal-400 shadow-teal-500/20 shadow-lg' : ''}`}>
              <div className="flex items-end gap-1.5 h-12 px-1 mb-1">
                <div className="w-3 h-5 rounded-t bg-teal-500/30" />
                <div className="w-3 h-8 rounded-t bg-teal-500/50" />
                <div className="w-3 h-12 rounded-t bg-teal-400 shadow-lg shadow-teal-400/30" />
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center shadow-md font-bold text-[10px]">
                #1
              </div>
              <div className="text-[9px] font-bold text-teal-300 text-center uppercase tracking-wider">
                Google Rank
              </div>
            </div>
          </div>
        );

      case 'ads':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`relative w-24 h-24 rounded-full border border-dashed border-cyan-400/40 flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110 border-cyan-300' : ''}`}>
              <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-400/60 flex items-center justify-center shadow-inner">
                <Target className={`w-8 h-8 text-cyan-300 transition-transform ${isHovered ? 'scale-110 rotate-12' : ''}`} />
              </div>
              <div className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[9px] font-extrabold uppercase tracking-tight shadow">
                4.8x ROI
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`p-4 rounded-2xl bg-slate-950/70 border border-violet-500/30 transition-all duration-300 ${isHovered ? 'scale-105 border-violet-400 shadow-violet-500/20 shadow-lg' : ''}`}>
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Share2 className="w-8 h-8 text-violet-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-violet-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-violet-400" />
              </div>
              <div className="text-[9px] font-bold text-violet-300 text-center uppercase tracking-wider mt-1">
                Engagement
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`relative p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 transition-all duration-300 ${isHovered ? 'scale-105 border-amber-400 shadow-amber-500/20 shadow-lg' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-400/30 border border-amber-400/50 flex items-center justify-center mx-auto mb-1">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <div className="text-[9px] font-bold text-amber-300 text-center uppercase tracking-wider">
                Identity
              </div>
            </div>
          </div>
        );

      case 'leads':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`p-3.5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 transition-all duration-300 ${isHovered ? 'scale-105 border-emerald-400 shadow-emerald-500/20 shadow-lg' : ''}`}>
              <div className="flex flex-col items-center gap-1 mb-1">
                <Filter className="w-7 h-7 text-emerald-400" />
                <div className="w-8 h-1 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[9px] font-extrabold text-emerald-300 text-center uppercase tracking-tight">
                Direct WhatsApp
              </div>
            </div>
          </div>
        );

      case 'growth':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`p-3.5 rounded-2xl bg-slate-950/70 border border-blue-500/30 transition-all duration-300 ${isHovered ? 'scale-105 border-blue-400 shadow-blue-500/20 shadow-lg' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/40 flex items-center justify-center mx-auto mb-1.5">
                <TrendingUp className="w-6 h-6 text-blue-300" />
              </div>
              <div className="text-[9px] font-bold text-blue-300 text-center uppercase tracking-wider">
                Scale Velocity
              </div>
            </div>
          </div>
        );

      case 'creator':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`p-3.5 rounded-2xl bg-slate-950/70 border border-pink-500/30 transition-all duration-300 ${isHovered ? 'scale-105 border-pink-400 shadow-pink-500/25 shadow-lg' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-400/40 flex items-center justify-center mx-auto mb-1.5 relative">
                <Video className="w-6 h-6 text-pink-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              </div>
              <div className="text-[9px] font-bold text-pink-300 text-center uppercase tracking-wider flex items-center justify-center gap-1">
                <Flame className="w-2.5 h-2.5 text-rose-400" />
                <span>Collab & UGC</span>
              </div>
            </div>
          </div>
        );

      case 'ai':
      default:
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`p-3.5 rounded-2xl bg-slate-950/70 border border-teal-500/30 transition-all duration-300 ${isHovered ? 'scale-105 border-teal-400 shadow-teal-500/20 shadow-lg' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-400/40 flex items-center justify-center mx-auto mb-1.5">
                <Cpu className="w-6 h-6 text-teal-300" />
              </div>
              <div className="text-[9px] font-bold text-teal-300 text-center uppercase tracking-wider">
                AI Automation
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[140px] select-none">
      {/* Subtle radial ambient background light */}
      <div
        className={`absolute inset-4 rounded-full blur-xl opacity-20 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-40' : ''
        }`}
        style={{
          background: themeConfig.primaryColor
        }}
      />
      {renderVisual()}
    </div>
  );
};
