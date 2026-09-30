import React, { useState, useMemo } from 'react';
import { Sparkles, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data/services';
import { ServiceItem } from '../types';
import { ServiceCard2D } from './ServiceCard2D';
import { ServiceDetailModal } from './ServiceDetailModal';
import { CreatorCollaborationSection } from './CreatorCollaborationSection';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

type FilterCategory = 'all' | 'engineering' | 'growth' | 'brand' | 'creator';

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const { ref, stage } = useSectionSequence('services');
  const { t } = useLanguage();

  const filterTabs: { id: FilterCategory; label: string; count: number }[] = useMemo(() => [
    { id: 'all', label: 'All Capabilities', count: SERVICES.length },
    {
      id: 'engineering',
      label: 'Web & AI',
      count: SERVICES.filter((s) => s.threeType === 'website' || s.threeType === 'ai').length
    },
    {
      id: 'growth',
      label: 'Search & Paid Media',
      count: SERVICES.filter((s) => s.threeType === 'seo' || s.threeType === 'ads' || s.threeType === 'leads').length
    },
    {
      id: 'brand',
      label: 'Brand & Advisory',
      count: SERVICES.filter((s) => s.threeType === 'branding' || s.threeType === 'social' || s.threeType === 'growth').length
    },
    {
      id: 'creator',
      label: 'Creator Collaboration',
      count: SERVICES.filter((s) => s.threeType === 'creator').length
    }
  ], []);

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return SERVICES;
    if (activeCategory === 'engineering') {
      return SERVICES.filter((s) => s.threeType === 'website' || s.threeType === 'ai');
    }
    if (activeCategory === 'growth') {
      return SERVICES.filter((s) => s.threeType === 'seo' || s.threeType === 'ads' || s.threeType === 'leads');
    }
    if (activeCategory === 'brand') {
      return SERVICES.filter((s) => s.threeType === 'branding' || s.threeType === 'social' || s.threeType === 'growth');
    }
    if (activeCategory === 'creator') {
      return SERVICES.filter((s) => s.threeType === 'creator');
    }
    return SERVICES;
  }, [activeCategory]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="services"
      aria-label="GWL Weblab Services"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/[0.04] [data-theme='clean-light']:hidden rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Synchronized Sequence */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full theme-badge text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.services.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-main)] tracking-tight leading-tight mb-4"
          >
            {t.services.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--theme-text-muted)] text-base sm:text-lg font-normal leading-relaxed"
          >
            {t.services.subtitle}
          </motion.p>

          {/* Interactive Category Segment Filter */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-slate-950/60 [data-theme='clean-light']:bg-white [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:shadow-sm border border-white/10 backdrop-blur-xl w-fit mx-auto"
          >
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              const isCreator = tab.id === 'creator';
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? isCreator
                        ? 'text-white font-bold shadow-md shadow-pink-500/30'
                        : 'text-black font-bold shadow-md'
                      : isCreator
                      ? "text-pink-300 [data-theme='clean-light']:text-pink-700 hover:text-white hover:bg-pink-500/10 [data-theme='clean-light']:hover:bg-pink-50"
                      : "text-neutral-300 hover:text-white hover:bg-white/[0.06] [data-theme='clean-light']:text-slate-700 [data-theme='clean-light']:hover:text-slate-900 [data-theme='clean-light']:hover:bg-slate-100"
                  }`}
                  style={isActive && isCreator ? { color: '#ffffff' } : {}}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeServiceTabPill"
                      className={`absolute inset-0 rounded-full ${
                        isCreator ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-emerald-400'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10" style={isActive && isCreator ? { color: '#ffffff' } : {}}>{tab.label}</span>
                  <span
                    className={`relative z-10 font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? isCreator
                          ? 'bg-black/30 text-white'
                          : 'bg-black/20 text-black'
                        : isCreator
                        ? "bg-pink-500/20 text-pink-300 [data-theme='clean-light']:bg-pink-100 [data-theme='clean-light']:text-pink-800"
                        : "bg-white/10 text-neutral-300 [data-theme='clean-light']:bg-slate-100 [data-theme='clean-light']:text-slate-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* 2D Glassmorphic Service Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredServices.map((service, idx) => (
              <ServiceCard2D
                key={service.id}
                service={service}
                index={idx}
                isHovered={hoveredId === service.id}
                onHover={setHoveredId}
                onClick={() => setActiveModalService(service)}
                onInquire={(e) => {
                  e.stopPropagation();
                  onSelectServiceForInquiry(service.title);
                }}
                isVisible={true}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dedicated Creator Collaboration & Co-Launch Section with Differentiated Pricing */}
        <CreatorCollaborationSection onSelectCollabForInquiry={onSelectServiceForInquiry} />

        {/* Bottom Custom Stack Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 rounded-2xl p-6 sm:p-8 glass-card theme-card-bg border border-emerald-500/20 [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:bg-white backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white [data-theme='clean-light']:text-slate-900 text-base sm:text-lg">
                Need a synchronized multi-channel architecture?
              </h4>
              <p className="text-neutral-400 [data-theme='clean-light']:text-slate-600 text-xs sm:text-sm mt-0.5">
                We combine web development, SEO, and paid performance into an integrated digital growth engine.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="#plan-builder"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 [data-theme='clean-light']:bg-emerald-50 [data-theme='clean-light']:text-emerald-700 [data-theme='clean-light']:border-emerald-300 transition-colors text-center cursor-pointer"
            >
              Build Custom Plan
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold theme-btn-primary transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 text-center cursor-pointer"
            >
              <span>Consult an Engineer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onSelectForInquiry={onSelectServiceForInquiry}
      />
    </section>
  );
};
