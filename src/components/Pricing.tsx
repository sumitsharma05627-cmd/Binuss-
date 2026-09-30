import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  Sparkles,
  Flame,
  Percent,
  Video,
  CheckCircle2,
  Clock,
  Code2,
  Lock,
  Layers,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_PLANS, CREATOR_COLLAB_TIERS, PricingPlan, CreatorCollabTier } from '../data/pricing';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface PricingProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onRequestCustomPlan: () => void;
  onSelectCollabForInquiry?: (tierName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({
  onSelectPlan,
  onRequestCustomPlan,
  onSelectCollabForInquiry
}) => {
  const { ref, stage } = useSectionSequence('pricing');
  const { t } = useLanguage();
  const { theme, themeConfig } = useTheme();
  const isLight = theme === 'clean-light' || !themeConfig.isDark;

  // Tab switcher: 'web' (Web Engineering & Lead Systems) vs 'creator' (Creator Hubs & Storefront Partnerships)
  const [activeCategory, setActiveCategory] = useState<'web' | 'creator'>('web');
  const [creatorRoleFilter, setCreatorRoleFilter] = useState<'all' | 'creators' | 'brands'>('all');

  const filteredCreatorTiers = CREATOR_COLLAB_TIERS.filter((tier) => {
    if (creatorRoleFilter === 'all') return true;
    return tier.targetRole === creatorRoleFilter || tier.targetRole === 'both';
  });

  const handleCreatorInquiry = (tierName: string) => {
    if (onSelectCollabForInquiry) {
      onSelectCollabForInquiry(tierName);
    } else {
      onRequestCustomPlan();
    }
  };

  // Distinct Action-Oriented CTA Label Generator for each Web Plan
  const getWebPlanCtaText = (plan: PricingPlan): string => {
    switch (plan.id) {
      case 'launchpad':
        return 'Select Launchpad Plan (from ₹5k)';
      case 'starter':
        return 'Select Starter Plan (₹14,999)';
      case 'business':
        return 'Scale with Business Plan (₹29,999) ⭐';
      case 'growth':
        return 'Select Growth Partnership (₹54,999)';
      default:
        return plan.ctaLabel || 'Select This Plan';
    }
  };

  // Distinct Action-Oriented CTA Label Generator for each Creator Tier
  const getCreatorTierCtaText = (tier: CreatorCollabTier): string => {
    switch (tier.id) {
      case 'micro-creator-bundle':
        return 'Book Campaign Drop (from ₹8,500)';
      case 'creator-co-launch':
        return 'Launch Creator Storefront (Turnkey) 🚀';
      case 'creator-retainer-revshare':
        return 'Start Monthly Retainer (₹32,000 / mo)';
      default:
        return `Inquire for ${tier.name}`;
    }
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="plans"
      aria-label="GWL WebLab Growth Plans & Pricing"
      className={`relative py-24 sm:py-32 overflow-hidden border-t ${
        isLight ? 'border-slate-200 bg-slate-50/50' : 'border-white/10'
      }`}
    >
      {/* Dynamic Background Ambient Gradients */}
      {!isLight && (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[480px] bg-emerald-500/[0.05] rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none -z-10" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md shadow-sm ${
              isLight
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                : 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
            <span>GWL WebLab Transparent Investment</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            {t.pricing.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal ${
              isLight ? 'text-slate-700' : 'text-neutral-200'
            }`}
          >
            {t.pricing.subtitle}
          </motion.p>

          {/* Interactive Category Selector (Web Systems vs Creator Partnerships) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={stage >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`inline-flex items-center p-1.5 rounded-full border-2 shadow-xl backdrop-blur-2xl ${
              isLight
                ? 'bg-slate-100 border-slate-300'
                : 'bg-slate-950/95 border-white/20'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveCategory('web')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeCategory === 'web'
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Web & Business Engineering</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-extrabold ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-slate-950/20 text-slate-950'
                }`}
              >
                4 Plans
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('creator')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 relative ${
                activeCategory === 'creator'
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black shadow-lg shadow-pink-500/35'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Video className="w-4 h-4 text-pink-400" />
              <span>Creator Hubs & Partnerships</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/30 text-pink-100 font-mono font-extrabold">
                HOT
              </span>
            </button>
          </motion.div>
        </div>

        {/* Value & Trust Assurances Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-14 max-w-5xl mx-auto"
        >
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 text-xs shadow-md ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900'
                : 'bg-[#0b101d] border-white/10 text-white'
            }`}
          >
            <Code2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
            <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
              100% Code Ownership
            </span>
          </div>
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 text-xs shadow-md ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900'
                : 'bg-[#0b101d] border-white/10 text-white'
            }`}
          >
            <Zap className={`w-4 h-4 shrink-0 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
            <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
              Sub-Second Load Speeds
            </span>
          </div>
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 text-xs shadow-md ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900'
                : 'bg-[#0b101d] border-white/10 text-white'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 shrink-0 ${isLight ? 'text-teal-600' : 'text-teal-400'}`} />
            <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
              Zero Hidden Charges
            </span>
          </div>
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 text-xs shadow-md ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900'
                : 'bg-[#0b101d] border-white/10 text-white'
            }`}
          >
            <Clock className={`w-4 h-4 shrink-0 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
            <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
              Guaranteed Milestones
            </span>
          </div>
        </motion.div>

        {/* Tab 1: Web & Business Engineering Plans (Modern High-Contrast Grid) */}
        {activeCategory === 'web' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-7 items-stretch mb-16">
            {PRICING_PLANS.map((plan, idx) => {
              const isPopular = plan.isPopular;
              const hasBadge = Boolean(plan.badge || isPopular);
              return (
                <motion.div
                  key={plan.id}
                  id={`pricing-card-${plan.id}`}
                  initial={{ opacity: 0, y: 32 }}
                  animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? isLight
                        ? 'bg-white border-2 border-emerald-500 shadow-[0_20px_50px_rgba(16,185,129,0.18)] xl:-translate-y-3 z-20'
                        : 'bg-gradient-to-b from-[#0f1d2e] via-[#09111f] to-[#060b14] border-2 border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.35)] xl:-translate-y-3 z-20'
                      : isLight
                      ? 'bg-white border-2 border-slate-300 hover:border-emerald-500 shadow-xl'
                      : 'bg-[#090e1a] border-2 border-white/15 hover:border-emerald-500/50 shadow-xl'
                  } backdrop-blur-2xl`}
                >
                  {/* Plan Badge */}
                  {hasBadge && (
                    <div
                      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-black text-[11px] tracking-wider uppercase flex items-center gap-1.5 whitespace-nowrap shadow-xl ${
                        isPopular
                          ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 font-black'
                          : isLight
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-500/60'
                      }`}
                    >
                      {isPopular && <Star className="w-3.5 h-3.5 fill-current text-slate-950" />}
                      <span>{plan.badge || t.pricing.badgePopular}</span>
                    </div>
                  )}

                  <div>
                    {/* Plan Name & Turnaround */}
                    <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                      <h3 className={`font-display text-2xl font-black tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        {plan.name}
                      </h3>
                      <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border shrink-0 font-bold flex items-center gap-1 ${
                        isLight
                          ? 'text-emerald-800 bg-emerald-50 border-emerald-300'
                          : 'text-emerald-300 bg-emerald-950/70 border-emerald-500/30'
                      }`}>
                        <Clock className={`w-3 h-3 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                        <span>{plan.deliveryTime}</span>
                      </span>
                    </div>

                    <p className={`text-xs sm:text-sm mb-5 min-h-[42px] leading-relaxed font-normal ${isLight ? 'text-slate-700' : 'text-neutral-200'}`}>
                      {plan.tagline}
                    </p>

                    {/* Price Tag Box */}
                    <div className={`p-4 rounded-2xl mb-5 shadow-inner border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.04] border-white/10'
                    }`}>
                      <div className={`text-[10px] uppercase font-mono font-bold tracking-wider mb-1 ${
                        isLight ? 'text-emerald-700' : 'text-emerald-400'
                      }`}>
                        {t.pricing.perProject}
                      </div>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span
                          className={`font-display font-black tracking-tight ${
                            isLight ? 'text-slate-950' : 'text-white'
                          } ${
                            plan.startingPrice.length > 10
                              ? 'text-2xl sm:text-3xl'
                              : 'text-3xl sm:text-4xl'
                          }`}
                        >
                          {plan.startingPrice}
                        </span>
                        <span className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-neutral-300'}`}>
                          / {plan.billingPeriod}
                        </span>
                      </div>
                      <p className={`text-[11px] mt-2 leading-relaxed font-medium ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                        <strong className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>Ideal for:</strong> {plan.targetAudience}
                      </p>
                    </div>

                    {/* Included Features: High Contrast & Crystal Clear */}
                    <div className={`mb-6 p-4 rounded-2xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#060a14] border-white/10'
                    }`}>
                      <div className={`text-xs font-black uppercase tracking-wider flex items-center justify-between mb-3.5 pb-2 border-b ${
                        isLight ? 'text-emerald-800 border-slate-200' : 'text-emerald-300 border-white/10'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                          <span className={`font-extrabold text-xs ${isLight ? 'text-slate-950' : 'text-white'}`}>
                            {plan.includesText || t.pricing.includesLabel}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${
                          isLight ? 'text-emerald-800 bg-emerald-100 border-emerald-300' : 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
                        }`}>
                          {plan.features.length} Features
                        </span>
                      </div>
                      <ul className="space-y-2.5">
                        {plan.features.map((feat) => (
                          <li
                            key={feat}
                            className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-snug ${
                              isLight ? 'text-slate-800' : 'text-neutral-100'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Clear Call-To-Action Button for this plan tier */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectPlan(plan)}
                      aria-label={`Select ${plan.name} Plan at ${plan.startingPrice}`}
                      className={`w-full py-3.5 px-5 rounded-2xl font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.99] ${
                        isPopular
                          ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 shadow-emerald-500/35 hover:shadow-emerald-500/50'
                          : isLight
                          ? 'bg-slate-900 hover:bg-emerald-600 text-white shadow-md'
                          : 'bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/40 hover:border-emerald-500 shadow-md'
                      }`}
                    >
                      <span>{getWebPlanCtaText(plan)}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <p className={`text-center text-[10px] mt-2 font-medium ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                      ✓ Instant consultation • Zero hidden charges • 100% Code Ownership
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Creator Hubs & Storefront Partnerships (Modern High-Contrast Grid) */}
        {activeCategory === 'creator' && (
          <div className="space-y-8 mb-16">
            {/* Filter by Goal */}
            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
              <span className="text-xs text-neutral-300 data-[theme=clean-light]:text-slate-700 font-bold mr-2">
                Filter by Goal:
              </span>
              <div className="inline-flex items-center p-1.5 rounded-full bg-slate-950/90 data-[theme=clean-light]:bg-slate-100 border-2 border-white/20 data-[theme=clean-light]:border-slate-300 text-xs shadow-lg">
                <button
                  type="button"
                  onClick={() => setCreatorRoleFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    creatorRoleFilter === 'all'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-neutral-300 data-[theme=clean-light]:text-slate-700 hover:text-white'
                  }`}
                >
                  All Partnerships
                </button>
                <button
                  type="button"
                  onClick={() => setCreatorRoleFilter('creators')}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    creatorRoleFilter === 'creators'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-neutral-300 data-[theme=clean-light]:text-slate-700 hover:text-white'
                  }`}
                >
                  For Creators & Influencers
                </button>
                <button
                  type="button"
                  onClick={() => setCreatorRoleFilter('brands')}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    creatorRoleFilter === 'brands'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-neutral-300 data-[theme=clean-light]:text-slate-700 hover:text-white'
                  }`}
                >
                  For Brands & D2C
                </button>
              </div>
            </div>

            {/* Creator Partnership Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {filteredCreatorTiers.map((tier) => {
                const isFeatured = tier.isPopular;
                return (
                  <div
                    key={tier.id}
                    id={`creator-pricing-${tier.id}`}
                    className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-2xl ${
                      isFeatured
                        ? isLight
                          ? 'bg-white border-2 border-pink-500 shadow-[0_20px_50px_rgba(236,72,153,0.18)] lg:-translate-y-3 z-20'
                          : 'bg-gradient-to-b from-[#200c1e] via-[#120814] to-[#0a050d] border-2 border-pink-400 shadow-[0_0_55px_rgba(236,72,153,0.35)] lg:-translate-y-3 z-20'
                        : isLight
                        ? 'bg-white border-2 border-slate-300 hover:border-pink-400 shadow-xl'
                        : 'bg-[#090e1a] border-2 border-pink-500/30 hover:border-pink-500/60 shadow-xl'
                    }`}
                  >
                    {/* Badge */}
                    {tier.badge && (
                      <div
                        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl ${
                          isFeatured
                            ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white ring-2 ring-pink-300/40'
                            : 'bg-pink-950 text-pink-200 border border-pink-500/60 data-[theme=clean-light]:bg-pink-100 data-[theme=clean-light]:text-pink-900'
                        }`}
                      >
                        {isFeatured ? (
                          <Flame className="w-3.5 h-3.5 fill-current text-amber-300" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        )}
                        <span>{tier.badge}</span>
                      </div>
                    )}

                    <div>
                      {/* Model Type & Turnaround */}
                      <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full font-bold border ${
                          isLight
                            ? 'text-pink-800 bg-pink-100 border-pink-300'
                            : 'text-pink-300 bg-pink-950/70 border-pink-500/40'
                        }`}>
                          {tier.modelType}
                        </span>
                        <span className={`text-[11px] font-mono flex items-center gap-1 font-bold ${
                          isLight ? 'text-slate-700' : 'text-neutral-200'
                        }`}>
                          <Clock className="w-3.5 h-3.5 text-pink-400" />
                          <span>{tier.turnaround}</span>
                        </span>
                      </div>

                      {/* Tier Name */}
                      <h4 className={`font-display text-2xl sm:text-3xl font-black tracking-tight mt-1 ${
                        isLight ? 'text-slate-950' : 'text-white'
                      }`}>
                        {tier.name}
                      </h4>

                      <p className={`text-xs sm:text-sm mt-2 mb-5 leading-relaxed font-normal min-h-[44px] ${
                        isLight ? 'text-slate-700' : 'text-neutral-200'
                      }`}>
                        {tier.tagline}
                      </p>

                      {/* Price Box */}
                      <div className={`p-4 rounded-2xl mb-5 shadow-inner border ${
                        isLight
                          ? 'bg-pink-50/70 border-pink-200'
                          : 'bg-white/[0.04] border-pink-500/30'
                      }`}>
                        <div className={`text-[10px] uppercase font-mono tracking-wider font-extrabold mb-1 flex items-center gap-1.5 ${
                          isLight ? 'text-pink-700' : 'text-pink-400'
                        }`}>
                          <Percent className="w-3.5 h-3.5" />
                          <span>Commercial Partnership Model</span>
                        </div>
                        <div className={`text-3xl sm:text-4xl font-display font-black ${
                          isLight ? 'text-pink-950' : 'text-white'
                        }`}>
                          {tier.priceDisplay}
                        </div>
                        <div className={`text-xs mt-1 italic font-semibold ${
                          isLight ? 'text-slate-600' : 'text-pink-200'
                        }`}>
                          {tier.priceNote}
                        </div>
                      </div>

                      {/* Reach / Performance Metric Highlight */}
                      <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold mb-6 border ${
                        isLight
                          ? 'bg-pink-100/90 border-pink-200 text-pink-900'
                          : 'bg-pink-950/50 border-pink-500/30 text-pink-100'
                      }`}>
                        <Zap className={`w-4 h-4 shrink-0 ${isLight ? 'text-pink-700' : 'text-pink-400'}`} />
                        <span>{tier.metrics}</span>
                      </div>

                      {/* DELIVERABLES: HIGH CONTRAST & MAXIMUM READABILITY */}
                      <div className={`mb-6 p-5 rounded-2xl border-2 shadow-md ${
                        isLight
                          ? 'bg-pink-50/90 border-pink-300'
                          : 'bg-[#0d1428] border-pink-500/40'
                      }`}>
                        <div className={`text-xs font-black uppercase tracking-wider flex items-center justify-between gap-2 mb-4 pb-2.5 border-b ${
                          isLight
                            ? 'text-pink-800 border-pink-200'
                            : 'text-pink-300 border-pink-500/20'
                        }`}>
                          <div className="flex items-center gap-2">
                            <Sparkles className={`w-4 h-4 shrink-0 ${isLight ? 'text-pink-600' : 'text-pink-400'}`} />
                            <span className={`font-black text-xs sm:text-sm tracking-wide ${
                              isLight ? 'text-slate-950' : 'text-white'
                            }`}>
                              Included in this Partnership:
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isLight
                              ? 'bg-pink-200 text-pink-900 border-pink-300'
                              : 'bg-pink-500/20 text-pink-200 border-pink-500/30'
                          }`}>
                            {tier.deliverables.length} Deliverables
                          </span>
                        </div>

                        <ul className="space-y-3">
                          {tier.deliverables.map((item, i) => (
                            <li
                              key={i}
                              className={`flex items-start gap-3 text-xs sm:text-sm font-semibold leading-relaxed group ${
                                isLight ? 'text-slate-900' : 'text-white'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </span>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Clear Call-To-Action Button for this Creator Tier */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleCreatorInquiry(tier.name)}
                        aria-label={`Inquire for ${tier.name} collaboration`}
                        className={`w-full py-3.5 px-5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.99] ${
                          isFeatured
                            ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 text-white shadow-pink-500/40 hover:shadow-pink-500/50'
                            : isLight
                            ? 'bg-slate-900 hover:bg-pink-600 text-white shadow-md'
                            : 'bg-pink-500/20 hover:bg-pink-500 text-pink-200 hover:text-white border border-pink-500/40 hover:border-pink-500 shadow-md'
                        }`}
                      >
                        <span>{getCreatorTierCtaText(tier)}</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                      <p className={`text-center text-[10px] mt-2 font-medium ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                        ✓ Turnkey commercial agreement • Direct WhatsApp onboarding
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Custom Plan Callout & Interactive Package Builder Bridge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl p-6 sm:p-8 border-2 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-5xl mx-auto shadow-2xl backdrop-blur-2xl ${
            isLight
              ? 'bg-white border-slate-300'
              : 'bg-gradient-to-r from-emerald-950/40 via-slate-950/90 to-teal-950/40 border-emerald-500/40'
          }`}
        >
          <div>
            <div className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
              isLight ? 'text-emerald-800' : 'text-emerald-400'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>GWL WebLab Bespoke Systems</span>
            </div>
            <h4 className={`font-display text-xl sm:text-2xl font-black mb-1 ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              {t.pricing.customPlanTitle || 'Need a Custom Enterprise Solution?'}
            </h4>
            <p className={`text-sm max-w-xl font-medium ${
              isLight ? 'text-slate-700' : 'text-neutral-200'
            }`}>
              Looking for custom full-stack web applications, e-commerce stores, CRM integrations, or continuous monthly engineering? GWL WebLab builds tailored high-velocity solutions for your commercial objectives.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={onRequestCustomPlan}
              className="px-6 py-3 rounded-full text-sm font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all cursor-pointer shadow-lg shadow-emerald-500/25 hover:scale-105"
            >
              {t.pricing.customPlanBtn || 'Request Custom Plan'}
            </button>
            <a
              href="#builder"
              className={`px-5 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 hover:scale-105 ${
                isLight
                  ? 'text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300'
                  : 'text-white bg-white/10 hover:bg-white/20 border border-white/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Package Builder</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
