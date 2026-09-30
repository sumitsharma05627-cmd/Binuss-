import React from 'react';
import {
  Search,
  ShieldCheck,
  MousePointerClick,
  Filter,
  Rocket,
  CheckCircle2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { GROWTH_PIPELINE_STAGES } from '../../data/growth';
import { useTheme } from '../../context/ThemeContext';

interface GrowthPipeline2DProps {
  activeStageIndex: number;
  onSelectStage: (index: number) => void;
  isVisible?: boolean;
}

const STAGE_ICONS = [Search, ShieldCheck, MousePointerClick, Filter, Rocket];

export const GrowthPipeline2D: React.FC<GrowthPipeline2DProps> = ({
  activeStageIndex,
  onSelectStage,
  isVisible = true
}) => {
  const { themeConfig } = useTheme();

  if (!isVisible) return null;

  return (
    <div className="relative w-full py-6 select-none">
      {/* Background Track Circuit */}
      <div className="hidden md:block absolute top-[52px] left-[8%] right-[8%] h-[3px] bg-white/10 rounded-full">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`
          }}
          initial={{ width: '0%' }}
          animate={{
            width: `${(activeStageIndex / (GROWTH_PIPELINE_STAGES.length - 1)) * 100}%`
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* 5 Interactive Pipeline Stage Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
        {GROWTH_PIPELINE_STAGES.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          const isPassed = idx < activeStageIndex;
          const Icon = STAGE_ICONS[idx] || TrendingUp;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelectStage(idx)}
              className={`group flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 text-left md:text-center cursor-pointer ${
                isActive
                  ? 'bg-slate-900/90 border-2 shadow-2xl backdrop-blur-xl scale-[1.03]'
                  : 'bg-slate-950/40 border border-white/5 hover:border-white/20 hover:bg-slate-900/50'
              }`}
              style={{
                borderColor: isActive ? themeConfig.primaryColor : undefined,
                boxShadow: isActive ? `0 0 35px -8px ${themeConfig.primaryColor}50` : undefined
              }}
            >
              {/* Node Icon Circle */}
              <div
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
                  isActive
                    ? 'text-slate-950 shadow-lg scale-110'
                    : isPassed
                    ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-400'
                    : 'bg-white/[0.04] border border-white/10 text-slate-400 group-hover:text-white'
                }`}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`
                    : undefined
                }}
              >
                <Icon className="w-6 h-6" />
                {isPassed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-[9px] font-black">
                    ✓
                  </div>
                )}
              </div>

              {/* Step & Title */}
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded"
                  style={{
                    color: isActive ? themeConfig.primaryColor : '#94a3b8',
                    backgroundColor: isActive ? `${themeConfig.primaryColor}15` : 'rgba(255,255,255,0.05)'
                  }}
                >
                  STAGE {stage.step}
                </span>
              </div>

              <h4
                className={`font-display text-sm font-bold tracking-tight mb-1 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                }`}
              >
                {stage.title}
              </h4>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {stage.subtitle}
              </p>

              {/* Active Indicator Bar */}
              {isActive && (
                <motion.div
                  layoutId="activePipelineIndicator"
                  className="mt-3 w-10 h-1 rounded-full"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Helper Hint */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Click any stage node to inspect its commercial mechanisms and architecture</span>
      </div>
    </div>
  );
};
