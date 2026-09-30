import React from 'react';
import {
  Compass,
  FileCode,
  Layout,
  Rocket,
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { PROCESS_STAGES } from '../../data/process';
import { useTheme } from '../../context/ThemeContext';

interface ProcessPath2DProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  isVisible?: boolean;
}

const STEP_ICONS = [Compass, Layout, FileCode, Rocket, TrendingUp];

export const ProcessPath2D: React.FC<ProcessPath2DProps> = ({
  currentStep,
  onSelectStep
}) => {
  const { themeConfig } = useTheme();

  return (
    <div className="relative w-full py-4 select-none">
      {/* Horizontal Progress Path (desktop) */}
      <div className="hidden lg:block relative mb-8 px-8">
        <div className="h-1.5 bg-white/10 [data-theme='clean-light']:bg-slate-200 rounded-full relative overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`
            }}
            initial={{ width: '0%' }}
            animate={{
              width: `${(currentStep / (PROCESS_STAGES.length - 1)) * 100}%`
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* 5 Milestone Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {PROCESS_STAGES.map((stage, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          const Icon = STEP_ICONS[idx] || Compass;

          return (
            <button
              key={stage.step}
              type="button"
              onClick={() => onSelectStep(idx)}
              className={`relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-slate-900/95 [data-theme='clean-light']:bg-white border-2 shadow-2xl backdrop-blur-xl scale-[1.02]"
                  : "bg-slate-950/60 [data-theme='clean-light']:bg-white/90 border border-white/10 [data-theme='clean-light']:border-slate-200 hover:border-white/20 hover:bg-slate-900/60 [data-theme='clean-light']:hover:bg-slate-50"
              }`}
              style={{
                borderColor: isActive ? themeConfig.primaryColor : undefined,
                boxShadow: isActive ? `0 0 30px -8px ${themeConfig.primaryColor}50` : undefined
              }}
            >
              {/* Header: Step Number & Icon */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'text-slate-950 shadow-md scale-105'
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-400 [data-theme='clean-light']:bg-emerald-50 [data-theme='clean-light']:text-emerald-700 border border-emerald-500/30"
                        : "bg-white/[0.06] text-slate-300 [data-theme='clean-light']:bg-slate-100 [data-theme='clean-light']:text-slate-600 border border-white/10 [data-theme='clean-light']:border-slate-200"
                    }`}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`
                        : undefined
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span
                    className="text-[10px] font-mono font-extrabold tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      color: isActive ? themeConfig.primaryColor : undefined
                    }}
                  >
                    PHASE {stage.step}
                  </span>
                </div>

                <h4
                  className={`font-display text-sm font-extrabold tracking-tight mb-1.5 ${
                    isActive
                      ? "text-white [data-theme='clean-light']:text-slate-950"
                      : "text-slate-100 [data-theme='clean-light']:text-slate-800"
                  }`}
                >
                  {stage.title}
                </h4>

                <p className="text-xs text-slate-300 [data-theme='clean-light']:text-slate-600 leading-relaxed line-clamp-2">
                  {stage.tagline}
                </p>
              </div>

              {/* Status Badge */}
              <div className="mt-3.5 pt-3 border-t border-white/10 [data-theme='clean-light']:border-slate-200 flex items-center justify-between text-[11px]">
                <span className={isActive ? "text-emerald-400 [data-theme='clean-light']:text-emerald-700 font-bold" : "text-slate-400 [data-theme='clean-light']:text-slate-500 font-medium"}>
                  {isActive ? 'Active Phase' : isCompleted ? 'Completed' : 'Upcoming'}
                </span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 [data-theme='clean-light']:text-emerald-600" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
