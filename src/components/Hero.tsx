import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroCore2D } from './2d/HeroCore2D';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onStartProject: () => void;
  onViewPlans: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onViewPlans }) => {
  const { ref, isVisible, stage } = useSectionSequence('hero');
  const { t } = useLanguage();
  const { theme, themeConfig } = useTheme();
  const isLight = theme === 'clean-light' || !themeConfig.isDark;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="home"
      aria-label="GWL WebLab (Gwalior WebLab / Global WebLab) Hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 lg:py-0 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none -z-10 transition-colors duration-700"
        style={{
          background: isLight
            ? `radial-gradient(circle, ${themeConfig.primaryColor}15 0%, ${themeConfig.accentColor}08 50%, transparent 75%)`
            : `radial-gradient(circle, ${themeConfig.primaryColor}28 0%, ${themeConfig.accentColor}15 50%, transparent 75%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Hero Content with Synchronized Motion Sequence */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left z-10">
            {/* Small text / badge with Theme-Adaptive Pill - Enters at Stage 2 */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-md ${
                  isLight
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                    : 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                {t.hero.badge}
              </motion.div>

              <motion.div
                key={themeConfig.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono ${
                  isLight
                    ? 'bg-slate-100 border border-slate-300 text-slate-700'
                    : 'bg-white/[0.04] border border-white/10 text-neutral-300'
                }`}
              >
                <Zap className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-600 font-semibold">{themeConfig.accentTag}</span>
                <span className={`hidden sm:inline ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>• {themeConfig.personality}</span>
              </motion.div>
            </div>

            {/* Primary Headline - Enters at Stage 2 with slight stagger */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display font-extrabold tracking-tight text-4xl sm:text-6xl xl:text-7xl leading-[1.08] mb-4 ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              <span>{t.hero.headlinePart1}</span>
              <br />
              <span className={isLight ? 'text-slate-950' : 'text-white'}>{t.hero.headlinePart2}</span>
              <br />
              <span className="theme-gradient-text">
                {t.hero.headlineGradient}
              </span>
            </motion.h1>

            {/* Supporting Text - Enters at Stage 3 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mb-8 ${
                isLight ? 'text-slate-700' : 'text-neutral-300'
              }`}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Action Buttons - Enters at Stage 3 with slight offset */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <button
                id="hero-start-project-btn"
                onClick={onStartProject}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-bold theme-btn-primary transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer shadow-lg"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-view-plans-btn"
                onClick={onViewPlans}
                className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold backdrop-blur-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                  isLight
                    ? 'text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 shadow-xs'
                    : 'text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25'
                }`}
              >
                <span>{t.hero.secondaryCta}</span>
              </button>
            </motion.div>

            {/* Trust highlights - Enters at Stage 4 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={stage >= 4 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7 }}
              className={`flex flex-wrap items-center gap-6 pt-6 border-t text-xs sm:text-sm ${
                isLight
                  ? 'border-slate-200 text-slate-600'
                  : 'border-white/10 text-neutral-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                <span className={isLight ? 'text-slate-700 font-medium' : ''}>{t.hero.trustHighPerf}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                <span className={isLight ? 'text-slate-700 font-medium' : ''}>{t.hero.trustConversion}</span>
              </div>
            </motion.div>
          </div>

          {/* Right 3D Scene - Starts at Stage 1 synchronized with text entry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative h-[380px] sm:h-[480px] lg:h-[600px] w-full flex items-center justify-center"
          >
            {/* Ambient ring accent behind 3D core */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-emerald-500/15 animate-spin-slow"></div>
            </div>

            {/* Central 2D Interactive Digital Growth Nexus */}
            <HeroCore2D isVisible={isVisible} className="w-full h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
