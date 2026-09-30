import React, { useState } from 'react';
import { ChevronRight, Zap, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GROWTH_PIPELINE_STAGES } from '../data/growth';
import { GrowthPipeline2D } from './2d/GrowthPipeline2D';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

export const GrowthSystem: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = GROWTH_PIPELINE_STAGES[activeStageIndex];
  const { ref, isVisible, stage } = useSectionSequence('growth-system');
  const { t } = useLanguage();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="growth-system"
      aria-label="Growth System Pipeline"
      className="relative py-24 sm:py-32 overflow-hidden bg-[#070b14]/60 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Synchronized Sequence */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{t.growthSystem.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
          >
            {t.growthSystem.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-300 text-base sm:text-lg"
          >
            {t.growthSystem.subtitle}
          </motion.p>
        </div>

        {/* 2D Pipeline Visualizer */}
        <div className="mb-8">
          <GrowthPipeline2D
            activeStageIndex={activeStageIndex}
            onSelectStage={(idx) => setActiveStageIndex(idx)}
            isVisible={isVisible}
          />
        </div>

        {/* Stage Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
        >
          {GROWTH_PIPELINE_STAGES.map((stageItem, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stageItem.id}
                id={`growth-stage-btn-${stageItem.id}`}
                onClick={() => setActiveStageIndex(idx)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-105'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span className="font-mono text-[11px] opacity-80">{stageItem.step}</span>
                <span>{stageItem.title}</span>
                {idx < GROWTH_PIPELINE_STAGES.length - 1 && (
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-black/60' : 'text-neutral-600'}`} />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Detailed Explanation Panel for Active Stage with Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-white/10 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/20">
                    PHASE {activeStage.step}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    {activeStage.subtitle}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                  {activeStage.title}
                </h3>
                <p className="text-neutral-300 text-base leading-relaxed mb-4">
                  {activeStage.description}
                </p>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5">
                  <Target className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white">Core Action: </strong>
                    {activeStage.keyAction}
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-3.5 pt-4 md:pt-0 md:border-l md:border-white/10 md:pl-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                    Impact Metric
                  </div>
                  <div className="font-display text-base font-bold text-emerald-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    {activeStage.impactMetric}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
                    {t.growthSystem.advantageLabel}
                  </div>
                  <div className="text-xs text-neutral-300 leading-normal">
                    {activeStage.gwlAdvantage || activeStage.kbsrAdvantage}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
