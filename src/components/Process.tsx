import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROCESS_STAGES } from '../data/process';
import { ProcessPath2D } from './2d/ProcessPath2D';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

export const Process: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const activeProcess = PROCESS_STAGES[currentStep];
  const { ref } = useSectionSequence('process');
  const { t } = useLanguage();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="process"
      aria-label="How We Build - Process"
      className="relative py-24 sm:py-32 overflow-hidden bg-[#060a12]/50 [data-theme='clean-light']:bg-slate-50 border-y border-white/5 [data-theme='clean-light']:border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Guaranteed High-Contrast Visibility */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-badge text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.process.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-main)] tracking-tight leading-tight mb-4"
          >
            {t.process.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--theme-text-muted)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {t.process.subtitle}
          </motion.p>
        </div>

        {/* 2D Process Path */}
        <div className="mb-10">
          <ProcessPath2D
            currentStep={currentStep}
            onSelectStep={(step) => setCurrentStep(step)}
          />
        </div>

        {/* Step Selector Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          {PROCESS_STAGES.map((stageItem, idx) => {
            const isActive = idx === currentStep;
            return (
              <button
                key={stageItem.step}
                id={`process-step-btn-${stageItem.step}`}
                onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-105'
                    : 'bg-white/5 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-main)] hover:bg-white/10 border border-white/10 [data-theme="clean-light"]:bg-white [data-theme="clean-light"]:border-slate-200 [data-theme="clean-light"]:text-slate-700 [data-theme="clean-light"]:hover:bg-slate-100'
                }`}
              >
                <span className="font-mono text-[11px] opacity-80">{stageItem.step}</span>
                <span>{stageItem.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Step Deep-Dive Card with Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto glass-card theme-card-bg rounded-2xl p-6 sm:p-8 border border-white/10 [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:bg-white shadow-2xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProcess.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 [data-theme='clean-light']:border-slate-200 pb-4 mb-6">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-mono text-xs text-emerald-400 [data-theme='clean-light']:text-emerald-700 font-bold px-2.5 py-1 rounded-md bg-emerald-950/60 [data-theme='clean-light']:bg-emerald-50 border border-emerald-500/30">
                    {t.process.stagePrefix} {activeProcess.step}
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--theme-text-main)]">
                    {activeProcess.title}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-[var(--theme-text-muted)] italic">
                  {activeProcess.tagline}
                </span>
              </div>

              <p className="text-[var(--theme-text-muted)] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {activeProcess.description}
              </p>

              {/* Activities and Outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7">
                  <h4 className="text-xs uppercase tracking-wider text-[var(--theme-text-muted)] font-bold mb-3">
                    {t.process.activitiesLabel}
                  </h4>
                  <div className="space-y-2.5">
                    {activeProcess.activities.map((act, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-[var(--theme-text-main)] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 [data-theme='clean-light']:text-emerald-600 mt-0.5 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 p-5 rounded-xl bg-slate-950/60 [data-theme='clean-light']:bg-slate-50 border border-white/10 [data-theme='clean-light']:border-slate-200 flex flex-col justify-center shadow-inner">
                  <div className="text-xs uppercase tracking-wider text-[var(--theme-text-muted)] font-bold mb-1.5">
                    {t.process.outcomeLabel}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-emerald-300 [data-theme='clean-light']:text-emerald-700 flex items-start gap-2 leading-snug">
                    <ArrowRight className="w-4 h-4 text-emerald-400 [data-theme='clean-light']:text-emerald-600 mt-0.5 shrink-0" />
                    <span>{activeProcess.outcome}</span>
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
