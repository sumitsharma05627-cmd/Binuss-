import React, { useState } from 'react';
import { Check, Sliders, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CUSTOM_SERVICE_OPTIONS, CustomServiceOption } from '../data/pricing';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface PlanBuilderProps {
  onProceedWithCustomPlan: (details: {
    selectedServices: string[];
    recommendedTier: string;
    estimatedCost: string;
  }) => void;
}

export const PlanBuilder: React.FC<PlanBuilderProps> = ({ onProceedWithCustomPlan }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['website', 'seo', 'lead-generation']);
  const { ref, stage } = useSectionSequence('plan-builder');
  const { t } = useLanguage();

  const toggleService = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedServicesList = CUSTOM_SERVICE_OPTIONS.filter((s) => selectedIds.includes(s.id));
  const rawSum = selectedServicesList.reduce((acc, curr) => acc + curr.basePrice, 0);

  // Bundle discount logic
  const discountMultiplier =
    selectedIds.length >= 5 ? 0.8 : selectedIds.length >= 3 ? 0.9 : 1.0;
  const estimatedPrice = Math.round(rawSum * discountMultiplier);

  // Recommended Plan Tier
  let recommendedTier = 'Starter Custom';
  if (selectedIds.includes('creator-collab')) {
    recommendedTier = 'Creator & Growth Custom';
  } else if (selectedIds.includes('google-ads') || selectedIds.includes('ai-automation') || selectedIds.length >= 4) {
    recommendedTier = 'Growth Custom';
  } else if (selectedIds.includes('lead-generation') || selectedIds.length >= 2) {
    recommendedTier = 'Business Custom';
  }

  const handleProceed = () => {
    onProceedWithCustomPlan({
      selectedServices: selectedServicesList.map((s) => s.name),
      recommendedTier,
      estimatedCost: `₹${estimatedPrice.toLocaleString('en-IN')}`
    });
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="plan-builder"
      aria-label="Interactive Digital Package Builder"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full theme-badge text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t.planBuilder.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
          >
            {t.planBuilder.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7 }}
            className="text-neutral-400 text-base sm:text-lg"
          >
            {t.planBuilder.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Service Checkboxes */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              {t.planBuilder.selectedServices}
            </div>

            {CUSTOM_SERVICE_OPTIONS.map((srv) => {
              const isChecked = selectedIds.includes(srv.id);
              const isCreator = srv.id === 'creator-collab';
              return (
                <div
                  key={srv.id}
                  onClick={() => toggleService(srv.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? isCreator
                        ? 'bg-pink-950/40 border-pink-500/60 [data-theme=\'clean-light\']:bg-pink-50 [data-theme=\'clean-light\']:border-pink-300 shadow-[0_4px_20px_rgba(236,72,153,0.15)]'
                        : 'bg-emerald-950/30 border-emerald-500/40 [data-theme=\'clean-light\']:bg-emerald-50 [data-theme=\'clean-light\']:border-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.1)]'
                      : "bg-[#0a0f1d]/50 [data-theme='clean-light']:bg-white border-white/10 [data-theme='clean-light']:border-slate-200 hover:border-white/20 [data-theme='clean-light']:hover:border-slate-300 [data-theme='clean-light']:shadow-sm"
                  }`}
                >
                  <div
                    className={`mt-1 w-5 h-5 rounded flex items-center justify-center transition-colors ${
                      isChecked
                        ? isCreator
                          ? 'bg-pink-500 text-white'
                          : 'bg-emerald-400 text-black'
                        : "border border-neutral-600 bg-black/40 [data-theme='clean-light']:border-slate-300 [data-theme='clean-light']:bg-slate-100"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-display text-base font-bold ${
                          isCreator
                            ? "creator-opt-title font-extrabold"
                            : "text-white [data-theme='clean-light']:text-slate-900"
                        }`}
                      >
                        {srv.name}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          isCreator
                            ? "creator-opt-title"
                            : "text-emerald-400 [data-theme='clean-light']:text-emerald-700"
                        }`}
                      >
                        ₹{srv.basePrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-neutral-300 [data-theme='clean-light']:text-slate-600 text-xs mt-1 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Recommended Solution */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl p-6 sm:p-8 theme-card-bg border shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{t.planBuilder.recommendedTier}</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-1">
                {recommendedTier}
              </h3>
              <p className="text-neutral-400 text-xs mb-6">
                Personalized configuration tailored to your active selections.
              </p>

              {/* Price Estimate */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6">
                <div className="text-xs text-neutral-400 uppercase tracking-wider">
                  {t.planBuilder.estimatedCost}
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                    ₹{estimatedPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {selectedIds.length >= 3 && `(${t.planBuilder.savingsBadge})`}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  *Transparent baseline. Exact scope verified during free consultation.
                </p>
              </div>

              {/* Included list */}
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">
                  Included in this Package ({selectedServicesList.length} services):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedServicesList.map((s) => (
                    <span
                      key={s.id}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        s.id === 'creator-collab'
                          ? "bg-pink-950/50 border border-pink-500/40 text-pink-300 [data-theme='clean-light']:bg-pink-100 [data-theme='clean-light']:text-pink-800 [data-theme='clean-light']:border-pink-300"
                          : "bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 [data-theme='clean-light']:bg-emerald-100 [data-theme='clean-light']:text-emerald-800 [data-theme='clean-light']:border-emerald-300"
                      }`}
                    >
                      {s.name}
                    </span>
                  ))}
                  {selectedServicesList.length === 0 && (
                    <span className="text-xs text-neutral-400 [data-theme='clean-light']:text-slate-500 font-medium">
                      Select at least one service on the left
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={selectedServicesList.length === 0}
                onClick={handleProceed}
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wide theme-btn-primary transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{t.planBuilder.proceedBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-neutral-400 mt-3">
                No payment required now • 100% Free Consultation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
