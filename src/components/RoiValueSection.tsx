import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface RoiValueSectionProps {
  onStartProject: () => void;
}

export const RoiValueSection: React.FC<RoiValueSectionProps> = ({ onStartProject }) => {
  const [avgClientValue, setAvgClientValue] = useState<number>(5000);
  const [estMonthlyVisitors, setEstMonthlyVisitors] = useState<number>(800);
  const { ref, stage } = useSectionSequence('roi');
  const { t } = useLanguage();

  // Realistic estimates:
  // Conversion to inquiry: 3% (24 inquiries)
  // Inquiry to client closing: 25% (6 new clients)
  const estInquiries = Math.round(estMonthlyVisitors * 0.03);
  const estNewClients = Math.max(1, Math.round(estInquiries * 0.25));
  const estMonthlyRevenue = estNewClients * avgClientValue;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="roi"
      aria-label="ROI and Value Breakdown"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5 bg-[#060a14]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Conceptual Value Story */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.roi.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6"
            >
              {t.roi.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7 }}
              className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6"
            >
              {t.roi.subtitle}
            </motion.p>

            {/* Interactive Pipeline Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="p-5 rounded-2xl bg-[#0b111f] border border-white/10 mb-8 space-y-3"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                The Compounding Inbound Loop
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold">
                <span className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                  Website
                </span>
                <span className="text-neutral-500">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white">
                  Visitors
                </span>
                <span className="text-neutral-500">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white">
                  Enquiries
                </span>
                <span className="text-neutral-500">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white">
                  Leads
                </span>
                <span className="text-neutral-500">→</span>
                <span className="px-3 py-1.5 rounded-lg theme-badge font-bold">
                  Customers
                </span>
              </div>
              <p className="text-xs text-neutral-400 pt-2 border-t border-white/5">
                Even 2 to 4 additional customers per month frequently pays for the entire website setup many times over.
              </p>
            </motion.div>

            <button
              onClick={onStartProject}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold theme-btn-primary shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
            >
              <span>{t.roi.ctaButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Realistic Interactive ROI Calculator */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={stage >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl p-6 sm:p-8 bg-[#090f1d] border border-white/10 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  <span>{t.roi.calcTitle}</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded">
                  Simulation
                </span>
              </div>

              {/* Slider 1: Average Customer Value */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-neutral-300">{t.roi.avgCustomerValue}</span>
                  <span className="font-mono font-bold text-emerald-400 text-base">
                    ₹{avgClientValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={avgClientValue}
                  onChange={(e) => setAvgClientValue(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                  <span>₹1,000 (Retail/Food)</span>
                  <span>₹25,000 (Coaching/Clinic)</span>
                  <span>₹50,000+ (High-Ticket)</span>
                </div>
              </div>

              {/* Slider 2: Estimated Monthly Visitors */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-neutral-300">{t.roi.monthlyInquiries}</span>
                  <span className="font-mono font-bold text-emerald-400 text-base">
                    {estMonthlyVisitors.toLocaleString()} visits
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={estMonthlyVisitors}
                  onChange={(e) => setEstMonthlyVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                  <span>200 (Local Niche)</span>
                  <span>1,500 (Moderate City)</span>
                  <span>5,000 (Active Search & Ads)</span>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 text-center">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase">Est. Enquiries</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    ~{estInquiries}
                  </div>
                  <div className="text-[10px] text-neutral-400">at 3% conv.</div>
                </div>

                <div>
                  <div className="text-[11px] text-neutral-400 uppercase">New Clients</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-300 mt-1">
                    {estNewClients}
                  </div>
                  <div className="text-[10px] text-neutral-400">at 25% close rate</div>
                </div>

                <div>
                  <div className="text-[11px] text-neutral-400 uppercase">{t.roi.potentialRevenue}</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">
                    ₹{estMonthlyRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-neutral-400">potential / mo</div>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 leading-normal italic">
                *Disclaimer: Estimates are illustrative projections based on typical industry conversion averages. Actual revenue depends entirely on your industry, service quality, pricing, and local market demand.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
