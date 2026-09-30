import React from 'react';
import { ShieldAlert, CheckCircle2, Award, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

export const TransparencyCommitment: React.FC = () => {
  const { ref, stage } = useSectionSequence('transparency');
  const { t } = useLanguage();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="commitment"
      aria-label="Commitment to Transparency"
      className="relative py-16 sm:py-20 overflow-hidden border-t border-white/5 bg-[#03060c]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-widest mb-4"
        >
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.commitment.badge}</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4"
        >
          {t.commitment.headline}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7 }}
          className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8"
        >
          {t.commitment.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wide mb-1">{t.commitment.point1Title}</div>
              <p className="text-xs text-neutral-400">{t.commitment.point1Desc}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wide mb-1">{t.commitment.point2Title}</div>
              <p className="text-xs text-neutral-400">{t.commitment.point2Desc}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wide mb-1">{t.commitment.point3Title}</div>
              <p className="text-xs text-neutral-400">{t.commitment.point3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
