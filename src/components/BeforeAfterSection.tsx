import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BEFORE_AFTER_DATA } from '../data/pricing';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

export const BeforeAfterSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'after' | 'compare'>('compare');
  const { ref, stage } = useSectionSequence('before-after');
  const { t } = useLanguage();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="before-after"
      aria-label="Before and After Transformation"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5 bg-[#050811]/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.beforeAfter.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
          >
            {t.beforeAfter.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7 }}
            className="text-neutral-400 text-base sm:text-lg"
          >
            {t.beforeAfter.subtitle}
          </motion.p>
        </div>

        {/* Transformation Cards Comparison Grid */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {BEFORE_AFTER_DATA.map((item, idx) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="rounded-2xl bg-[#090e1b] border border-white/5 overflow-hidden backdrop-blur-md"
            >
              {/* Category Header */}
              <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5 text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>{item.category}</span>
                <span className="text-[10px] text-emerald-400 font-bold">GWL WEBLAB UPGRADE</span>
              </div>

              {/* Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                {/* Before */}
                <div className="p-6 bg-rose-950/[0.07] flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-1">
                      {t.beforeAfter.beforeLabel}
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {item.before}
                    </p>
                  </div>
                </div>

                {/* After */}
                <div className="p-6 bg-emerald-950/[0.12] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
                      {t.beforeAfter.afterLabel}
                    </div>
                    <p className="text-neutral-200 text-sm leading-relaxed font-medium">
                      {item.after}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-10">
          <p className="text-xs text-neutral-400">
            *Comparison metrics represent structural and architectural standards implemented across all client deliverables.
          </p>
        </div>
      </div>
    </section>
  );
};
