import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OBJECTIONS_DATA, FAQS_DATA } from '../data/pricing';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface ObjectionFaqSectionProps {
  onStartConsultation: () => void;
}

export const ObjectionFaqSection: React.FC<ObjectionFaqSectionProps> = ({ onStartConsultation }) => {
  const [openObjectionId, setOpenObjectionId] = useState<string | null>(OBJECTIONS_DATA[0].id);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS_DATA[0].id);
  const { ref, stage } = useSectionSequence('faq');
  const { t } = useLanguage();

  useEffect(() => {
    const handleSelectFaq = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string; type: 'faq' | 'objection' }>;
      if (customEvent.detail?.type === 'objection') {
        setOpenObjectionId(customEvent.detail.id);
      } else if (customEvent.detail?.type === 'faq') {
        setOpenFaqId(customEvent.detail.id);
      }
    };

    window.addEventListener('gwl:select-faq', handleSelectFaq);
    window.addEventListener('kbsr:select-faq', handleSelectFaq);
    return () => {
      window.removeEventListener('gwl:select-faq', handleSelectFaq);
      window.removeEventListener('kbsr:select-faq', handleSelectFaq);
    };
  }, []);

  const toggleObjection = (id: string) => {
    setOpenObjectionId(openObjectionId === id ? null : id);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="faq"
      aria-label="Objections & FAQs"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5 bg-[#050811]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= PART 1: OBJECTION HANDLING ================= */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.faq.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
            >
              {t.faq.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7 }}
              className="text-neutral-400 text-base sm:text-lg"
            >
              {t.faq.subtitle}
            </motion.p>
          </div>

          {/* Objections Accordion */}
          <div className="max-w-4xl mx-auto space-y-4">
            {OBJECTIONS_DATA.map((obj) => {
              const isOpen = openObjectionId === obj.id;
              return (
                <div
                  key={obj.id}
                  id={`faq-objection-${obj.id}`}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#0a1020] border-emerald-500/40 shadow-[0_4px_24px_rgba(16,185,129,0.1)]'
                      : 'bg-[#080d18]/70 border-white/5 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => toggleObjection(obj.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-white">
                      {obj.objection}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-emerald-400 text-black' : 'bg-white/5 text-neutral-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-neutral-300 text-sm leading-relaxed border-t border-white/5 pt-4 space-y-3">
                          <p>{obj.answer}</p>
                          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 font-medium">
                            <span className="font-bold text-emerald-400">{t.faq.kbsrClarification}:</span> {obj.gwlPoint || obj.kbsrPoint}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= PART 2: FREQUENTLY ASKED QUESTIONS ================= */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {t.faq.faqsTab}
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base">
              Everything you need to know about timelines, deliverables, pricing, and ongoing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-14">
            {FAQS_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`rounded-2xl border transition-all duration-300 p-5 ${
                    isOpen
                      ? 'bg-[#0b1222] border-emerald-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                      : 'bg-[#080d1a]/60 border-white/5 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 mt-1 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-emerald-400' : 'text-neutral-500'
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-neutral-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 mt-3">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Need Consultation Box */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-sm text-neutral-300">
                {t.faq.ctaHeadline}
              </span>
              <button
                onClick={onStartConsultation}
                className="px-5 py-2.5 rounded-full text-xs font-bold theme-btn-primary shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
              >
                {t.faq.ctaBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
