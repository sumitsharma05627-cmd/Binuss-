import React from 'react';
import { Globe2, Terminal, Code2, LineChart, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { NetworkGlobe2D } from './2d/NetworkGlobe2D';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

const STRATEGIC_PILLARS = [
  {
    icon: Code2,
    title: 'Modern Code',
    desc: 'High speed, accessibility & modular structure.'
  },
  {
    icon: LineChart,
    title: 'Intent Search',
    desc: 'Targeting buyers at the point of commercial need.'
  },
  {
    icon: Cpu,
    title: 'Smart Automation',
    desc: 'Eliminating manual friction in lead intake.'
  },
  {
    icon: Terminal,
    title: 'Direct Collaboration',
    desc: 'Zero middle layers or confusing agency jargon.'
  }
];

export const About: React.FC = () => {
  const { ref, isVisible, stage } = useSectionSequence('about');
  const { t } = useLanguage();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      aria-label="About GWL WebLab (Gwalior WebLab / Global WebLab)"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Brand Positioning with Synchronized Sequence */}
          <div className="lg:col-span-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4"
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>{t.about.badge}</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6"
              >
                {t.about.headline}
              </motion.h2>

              <motion.blockquote
                initial={{ opacity: 0, y: 18 }}
                animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-xl text-emerald-300 font-medium leading-relaxed mb-6 border-l-2 border-emerald-400 pl-4"
              >
                {t.about.subtitle}
              </motion.blockquote>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-neutral-300 text-base leading-relaxed mb-8"
              >
                {t.about.p1}
              </motion.p>
            </div>

            {/* Strategic Pillars with Staggered Entrance */}
            <div className="grid grid-cols-2 gap-4">
              {STRATEGIC_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-emerald-400 mb-2" />
                    <div className="text-sm font-semibold text-white mb-1">{pillar.title}</div>
                    <div className="text-xs text-neutral-400">{pillar.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Network Globe with Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center"
          >
            <div className="w-full glass-card rounded-2xl p-4 sm:p-6 border border-white/10 relative overflow-hidden flex flex-col items-center">
              <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 mb-2 text-xs">
                <span className="text-neutral-400 uppercase tracking-wider font-semibold">
                  Global Digital Connectivity
                </span>
                <span className="font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE NODES
                </span>
              </div>

              <NetworkGlobe2D isVisible={isVisible} />

              <div className="w-full flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 mt-3 pt-3 border-t border-white/10 gap-2">
                <span>Deployments across India & International Nodes</span>
                <a
                  href="#reach"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  <span>Explore Global Reach Map</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
