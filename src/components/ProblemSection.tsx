import React from 'react';
import { AlertCircle, TrendingDown, EyeOff, Search, MessageSquareX, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface ProblemSectionProps {
  onExploreSolution: () => void;
}

const PROBLEM_ICONS = [EyeOff, Search, TrendingDown, MessageSquareX, Compass, AlertCircle];

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onExploreSolution }) => {
  const { ref, stage } = useSectionSequence('problem');
  const { t } = useLanguage();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="problem"
      aria-label="The Digital Problem"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5 problem-section-bg transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="problem-reality-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 transition-all shadow-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{t.problem.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-main)] tracking-tight leading-tight mb-6"
          >
            {t.problem.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--theme-text-muted)] text-base sm:text-lg leading-relaxed"
          >
            {t.problem.subtitle}
          </motion.p>
        </div>

        {/* 6 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {t.problem.problems.map((prob, idx) => {
            const Icon = PROBLEM_ICONS[idx % PROBLEM_ICONS.length];
            return (
              <motion.div
                key={prob.title}
                id={`problem-card-${idx}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group relative rounded-2xl p-6 problem-card transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl problem-icon-box flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--theme-text-main)] mb-2 group-hover:text-rose-400 transition-colors">
                    {prob.title}
                  </h3>
                  <p className="text-[var(--theme-text-muted)] text-sm leading-relaxed">
                    {prob.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="font-mono text-rose-400 font-semibold tracking-wider">RISK / IMPACT</span>
                  <span className="text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text-main)] transition-colors font-medium">{prob.impact}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Transition Bridge: "We Fix That" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-8 sm:p-12 glass-card theme-card-bg border border-emerald-500/30 text-center max-w-4xl mx-auto shadow-[0_0_50px_rgba(16,185,129,0.12)]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 [data-theme='clean-light']:text-emerald-700 text-xs font-semibold uppercase tracking-widest mb-3">
            GWL WebLab System
          </div>
          <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-main)] mb-4">
            We Fix That.
          </h3>
          <p className="text-[var(--theme-text-muted)] text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.problem.fixCallout}
          </p>
          <button
            onClick={onExploreSolution}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold theme-btn-primary shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{t.problem.fixButton}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
