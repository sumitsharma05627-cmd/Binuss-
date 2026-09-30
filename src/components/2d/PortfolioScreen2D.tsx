import React from 'react';
import { ProjectItem } from '../../types';
import { Lock, Sparkles, Globe, Phone, Award, BookOpen, Activity, MessageSquare, Sun, Moon } from 'lucide-react';

interface PortfolioScreen2DProps {
  project: ProjectItem;
  isHovered: boolean;
  isVisible?: boolean;
}

export const PortfolioScreen2D: React.FC<PortfolioScreen2DProps> = ({
  project,
  isHovered,
  isVisible = true
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`relative w-full h-[260px] sm:h-[290px] rounded-2xl overflow-hidden bg-[#090d1a] border transition-all duration-500 shadow-2xl flex flex-col select-none ${
        isHovered
          ? 'border-emerald-400/60 shadow-[0_12px_40px_rgba(16,185,129,0.2)] -translate-y-1'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/95 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/[0.05] border border-white/5 text-[10px] text-slate-400 font-mono max-w-[240px] truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">{project.websiteUrl?.replace('https://', '') || `${project.id}.gwlweblab.com`}</span>
        </div>

        <div className="w-8 flex justify-end items-center gap-1">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: project.accentColor }}
          />
        </div>
      </div>

      {/* Viewport: Tailored Simulated UI Preview */}
      <div className="relative flex-1 p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#080d19] to-[#04060b]">
        {/* Subtle Ambient Accent Glow */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ background: project.accentColor }}
        />

        {/* Mock Header Inside Frame */}
        <div className="space-y-2 relative z-10">
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase"
              style={{
                backgroundColor: `${project.accentColor}18`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}35`
              }}
            >
              {project.category}
            </span>

            {project.location && (
              <span className="text-[10px] text-slate-400 font-mono truncate max-w-[170px]">
                📍 {project.location.split(',')[0]}
              </span>
            )}
          </div>

          <h4 className="text-white font-display font-bold text-base sm:text-lg leading-tight truncate">
            {project.title}
          </h4>

          <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>

          {/* Distinctive Micro-Feature Tags for this Client Project */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {project.highlights?.slice(0, 3).map((hl, i) => (
              <span
                key={i}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Client Metrics & Quick Highlights */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 relative z-10">
          {project.stats.map((stat, i) => (
            <div
              key={i}
              className="p-1.5 sm:p-2 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-center"
            >
              <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider font-medium truncate">
                {stat.label}
              </span>
              <span
                className="text-xs sm:text-sm font-bold font-mono tracking-tight truncate"
                style={{ color: project.accentColor }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
