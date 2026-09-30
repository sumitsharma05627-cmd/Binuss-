import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroCore2D } from './2d/HeroCore2D';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface FinalCTAProps {
  onStartProject: () => void;
  onExploreServices: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartProject, onExploreServices }) => {
  const { ref, isVisible, stage } = useSectionSequence('final-cta');
  const { t } = useLanguage();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="final-cta"
      aria-label="Final Call to Action"
      className="relative min-h-[90vh] flex items-center justify-center py-24 sm:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Background glow and circular aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Central Returning 2D Object (Visual Loop) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-45 sm:opacity-60 pointer-events-none -z-10">
        <div className="w-[320px] h-[320px] sm:w-[540px] sm:h-[540px]">
          <HeroCore2D isCompact={true} isVisible={isVisible} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{t.finalCta.badge}</span>
        </motion.div>

        {/* Large Text */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto"
        >
          {t.finalCta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.finalCta.subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="final-cta-start-project"
            onClick={onStartProject}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold theme-btn-primary shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:shadow-[0_0_45px_rgba(16,185,129,0.6)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
          >
            <span>{t.finalCta.startProject}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="final-cta-explore-services"
            onClick={onExploreServices}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
          >
            <span>{t.finalCta.exploreServices}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
