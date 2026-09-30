import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { ECOSYSTEM_NODES, WHY_KBSR_POINTS } from '../data/growth';
import { Ecosystem2D } from './2d/Ecosystem2D';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface WhyKBSRProps {
  onViewCaseStudies?: () => void;
  onScheduleCall?: () => void;
}

export const WhyKBSR: React.FC<WhyKBSRProps> = ({ onViewCaseStudies, onScheduleCall }) => {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const { ref, isVisible, stage } = useSectionSequence('why-kbsr');
  const { t } = useLanguage();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="why-kbsr"
      aria-label="Why GWL WebLab Ecosystem"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headings & Feature Points with Synchronized Sequence */}
          <div className="lg:col-span-7">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t.whyKbsr.badge}</span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 24 }}
                animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8"
              >
                {t.whyKbsr.headline}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8"
              >
                {t.whyKbsr.subtitle}
              </motion.p>
            </div>

            {/* Quick visual pipeline indicator - Enters at Stage 3 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-10 text-xs font-mono text-neutral-300"
            >
              {ECOSYSTEM_NODES.map((node, i) => (
                <React.Fragment key={node.name}>
                  <button
                    onClick={() => setActiveNodeIndex(i)}
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      i === activeNodeIndex
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {node.name}
                  </button>
                  {i < ECOSYSTEM_NODES.length - 1 && (
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500 -rotate-90 hidden sm:inline-block" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* 5 Feature Points with Staggered Entrance at Stage 4 */}
            <div className="space-y-4">
              {WHY_KBSR_POINTS.map((pt, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-0.5">
                      {pt.title}
                    </h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Ecosystem Node Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            <div className="w-full glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Growth Architecture System
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  TIER {activeNodeIndex + 1}/6: {ECOSYSTEM_NODES[activeNodeIndex].name}
                </span>
              </div>

              {/* 2D Ecosystem Render */}
              <Ecosystem2D
                activeNodeIndex={activeNodeIndex}
                onHoverNode={(idx) => setActiveNodeIndex(idx)}
                isVisible={isVisible}
              />

              {/* Highlight card for current node */}
              <div className="mt-2 p-3.5 rounded-xl bg-black/60 border border-emerald-500/20 text-center">
                <div className="text-xs font-mono text-emerald-400 uppercase mb-1">
                  {ECOSYSTEM_NODES[activeNodeIndex].role}
                </div>
                <div className="text-sm text-neutral-200">
                  {ECOSYSTEM_NODES[activeNodeIndex].desc}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
