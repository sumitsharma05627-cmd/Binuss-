import React, { useState } from 'react';
import {
  Video,
  Flame,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Check,
  TrendingUp,
  Share2,
  Percent,
  ShieldCheck,
  Zap,
  MessageCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CREATOR_COLLAB_TIERS, CreatorCollabTier } from '../data/pricing';

interface CreatorCollaborationSectionProps {
  onSelectCollabForInquiry: (tierName: string) => void;
  className?: string;
}

type RoleFilter = 'all' | 'brands' | 'creators';

export const CreatorCollaborationSection: React.FC<CreatorCollaborationSectionProps> = ({
  onSelectCollabForInquiry,
  className = ''
}) => {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [activeTab, setActiveTab] = useState<'tiers' | 'calculator'>('tiers');

  // Mini Reach & Budget Estimator state
  const [reachTier, setReachTier] = useState<'micro' | 'mid' | 'macro'>('micro');
  const [campaignGoal, setCampaignGoal] = useState<'awareness' | 'product_launch' | 'ugc_ads'>('awareness');

  const filteredTiers = CREATOR_COLLAB_TIERS.filter((tier) => {
    if (roleFilter === 'all') return true;
    return tier.targetRole === roleFilter || tier.targetRole === 'both';
  });

  const getEstimatorResult = () => {
    if (reachTier === 'micro') {
      return {
        estimatedReach: '25,000 – 60,000 Impressions',
        recommendedModel: 'Micro-Creator Drop (Per Campaign)',
        priceRange: '₹8,500 – ₹14,500',
        bestFor: 'Local stores, clinics, indie brands & boutique products wanting immediate community buzz.'
      };
    } else if (reachTier === 'mid') {
      return {
        estimatedReach: '75,000 – 200,000 Impressions',
        recommendedModel: 'Creator Co-Launch Kit or Dual-Drop',
        priceRange: '₹18,500 – ₹27,500',
        bestFor: 'Course launches, coaches, wellness brands & direct-to-consumer product releases.'
      };
    } else {
      return {
        estimatedReach: '250,000+ Multi-Creator Viral Reach',
        recommendedModel: 'Brand x Creator Retainer / Hybrid Rev-Share',
        priceRange: '₹32,000/mo or ₹12,000 + 12% Rev-Share',
        bestFor: 'Scaled D2C brands wanting continuous UGC video ad assets and affiliate revenue pipelines.'
      };
    }
  };

  const estimate = getEstimatorResult();

  return (
    <div
      id="creator-collaboration-section"
      className={`relative mt-20 pt-16 border-t border-pink-500/20 ${className}`}
    >
      {/* Ambient background glow specifically for Creator section */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-pink-500/[0.07] [data-theme='clean-light']:hidden rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-500/[0.05] [data-theme='clean-light']:hidden rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/60 [data-theme='clean-light']:bg-pink-100 border border-pink-500/40 [data-theme='clean-light']:border-pink-300 text-pink-300 [data-theme='clean-light']:text-pink-800 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md shadow-sm">
          <Video className="w-4 h-4 text-pink-400 [data-theme='clean-light']:text-pink-700" />
          <span>Creator Network & Partnerships</span>
        </div>

        <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          <span className="creator-header-highlight">
            Creator Collaboration
          </span>{' '}
          <span className="creator-header-suffix">
            &amp; Co-Launch
          </span>
        </h3>

        <p className="text-neutral-200 [data-theme='clean-light']:text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          High-trust influencer drops, authentic UGC video ad assets, and revenue-share models.
          Because creator partnerships operate on audience engagement and commercial licensing, their pricing is structured completely differently from static website engineering.
        </p>

        {/* Mode Selector Toggle */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center p-1 rounded-full bg-slate-950/80 [data-theme='clean-light']:bg-white [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:shadow-sm border border-white/15 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('tiers')}
              data-creator-gradient={activeTab === 'tiers' ? 'true' : undefined}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tiers'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30'
                  : "text-neutral-300 [data-theme='clean-light']:text-slate-700 hover:text-white [data-theme='clean-light']:hover:text-slate-900"
              }`}
              style={activeTab === 'tiers' ? { color: '#ffffff' } : {}}
            >
              Collaboration Pricing Models
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('calculator')}
              data-creator-gradient={activeTab === 'calculator' ? 'true' : undefined}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30'
                  : "text-neutral-300 [data-theme='clean-light']:text-slate-700 hover:text-white [data-theme='clean-light']:hover:text-slate-900"
              }`}
              style={activeTab === 'calculator' ? { color: '#ffffff' } : {}}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Reach & Cost Estimator</span>
            </button>
          </div>

          {activeTab === 'tiers' && (
            <div className="flex items-center p-1 rounded-full bg-slate-950/80 [data-theme='clean-light']:bg-white [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:shadow-sm border border-white/15 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setRoleFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  roleFilter === 'all'
                    ? "bg-white/20 text-white font-bold [data-theme='clean-light']:bg-slate-900 [data-theme='clean-light']:text-white"
                    : "text-neutral-300 [data-theme='clean-light']:text-slate-700 hover:text-white [data-theme='clean-light']:hover:text-slate-900"
                }`}
              >
                All Models
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('brands')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  roleFilter === 'brands'
                    ? "creator-filter-active-brands font-bold"
                    : "text-neutral-300 [data-theme='clean-light']:text-slate-700 hover:text-white [data-theme='clean-light']:hover:text-slate-900"
                }`}
              >
                For Brands
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('creators')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  roleFilter === 'creators'
                    ? "creator-filter-active-creators font-bold"
                    : "text-neutral-300 [data-theme='clean-light']:text-slate-700 hover:text-white [data-theme='clean-light']:hover:text-slate-900"
                }`}
              >
                For Creators
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'tiers' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {filteredTiers.map((tier) => {
            const isFavorite = tier.isPopular;
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
                  isFavorite
                    ? "bg-gradient-to-b from-pink-950/40 via-slate-950/80 to-slate-950 [data-theme='clean-light']:bg-white [data-theme='clean-light']:from-white [data-theme='clean-light']:via-white [data-theme='clean-light']:to-white border-2 border-pink-500/60 [data-theme='clean-light']:border-pink-400 shadow-[0_0_40px_rgba(236,72,153,0.2)] [data-theme='clean-light']:shadow-[0_12px_36px_rgba(236,72,153,0.12)] md:-translate-y-2"
                    : "bg-[#0a0f1e]/80 [data-theme='clean-light']:bg-white border border-pink-500/20 [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:shadow-sm hover:border-pink-500/40 [data-theme='clean-light']:hover:border-pink-300"
                }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div
                    data-creator-gradient={isFavorite ? 'true' : undefined}
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md ${
                      isFavorite
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : "bg-pink-500/25 text-pink-200 border border-pink-500/50 [data-theme='clean-light']:bg-pink-100 [data-theme='clean-light']:text-pink-800 [data-theme='clean-light']:border-pink-300"
                    }`}
                    style={isFavorite ? { color: '#ffffff' } : {}}
                  >
                    {isFavorite ? <Flame className="w-3 h-3 fill-current text-amber-300" /> : <Sparkles className="w-3 h-3 text-pink-400" />}
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  {/* Model Header */}
                  <div className="flex items-center justify-between gap-2 mb-2 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-pink-300 bg-pink-950/60 [data-theme='clean-light']:bg-pink-50 [data-theme='clean-light']:text-pink-800 border border-pink-500/40 [data-theme='clean-light']:border-pink-300 px-2.5 py-0.5 rounded-full font-semibold">
                      {tier.modelType}
                    </span>
                    <span className="creator-turnaround-text text-[11px] font-mono font-medium">
                      {tier.turnaround}
                    </span>
                  </div>

                  <h4 className="creator-tier-name font-display text-xl sm:text-2xl font-bold tracking-wide mt-2">
                    {tier.name}
                  </h4>

                  <p className="creator-tagline-text text-xs sm:text-sm mt-2 min-h-[44px] leading-relaxed font-normal">
                    {tier.tagline}
                  </p>

                  {/* Distinct Price Tag */}
                  <div className="creator-price-box my-5 p-4 rounded-2xl">
                    <div className="creator-price-label text-[10px] uppercase font-mono tracking-wider font-bold mb-1 flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-pink-400 [data-theme='clean-light']:text-pink-700" />
                      <span>Differentiated Pricing Model</span>
                    </div>
                    <div className="creator-price-figure text-2xl sm:text-3xl font-display">
                      {tier.priceDisplay}
                    </div>
                    <div className="creator-price-note text-xs mt-1 font-semibold italic">
                      {tier.priceNote}
                    </div>
                  </div>

                  {/* Metrics highlight */}
                  <div className="creator-metrics-box flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs mb-5 font-semibold">
                    <TrendingUp className="w-4 h-4 text-pink-400 [data-theme='clean-light']:text-pink-700 shrink-0" />
                    <span>{tier.metrics}</span>
                  </div>

                  {/* Deliverables Box: High-Contrast & Maximum Readability */}
                  <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#0d1428] [data-theme='clean-light']:bg-pink-50/90 border-2 border-pink-500/40 [data-theme='clean-light']:border-pink-300 shadow-md">
                    <div className="text-xs font-black uppercase tracking-wider text-pink-300 [data-theme='clean-light']:text-pink-800 flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-pink-500/20 [data-theme='clean-light']:border-pink-200">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-pink-400 [data-theme='clean-light']:text-pink-600 shrink-0" />
                        <span className="creator-deliverables-header text-white [data-theme='clean-light']:text-slate-950 font-black text-xs sm:text-sm tracking-wide">
                          Included in this Partnership:
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-pink-500/25 text-pink-200 [data-theme='clean-light']:bg-pink-200 [data-theme='clean-light']:text-pink-900 border border-pink-500/30">
                        {tier.deliverables.length} Items
                      </span>
                    </div>
                    <div className="space-y-3">
                      {tier.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs sm:text-sm leading-snug group">
                          <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                          <span className="creator-deliverable-text text-white [data-theme='clean-light']:text-slate-900 leading-snug font-semibold">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => onSelectCollabForInquiry(tier.name)}
                  data-creator-gradient={isFavorite ? 'true' : undefined}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isFavorite
                      ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 text-white shadow-pink-500/30'
                      : "bg-white/10 hover:bg-pink-500/20 text-white [data-theme='clean-light']:text-slate-900 hover:text-pink-200 [data-theme='clean-light']:hover:text-pink-700 border border-white/15 [data-theme='clean-light']:border-slate-300 hover:border-pink-500/40 [data-theme='clean-light']:bg-slate-100 [data-theme='clean-light']:hover:bg-pink-50"
                  }`}
                  style={isFavorite ? { color: '#ffffff' } : {}}
                >
                  <span style={isFavorite ? { color: '#ffffff' } : {}}>Inquire for {tier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" style={isFavorite ? { color: '#ffffff' } : {}} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Interactive Reach & Cost Estimator */
        <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-8 bg-slate-950/80 [data-theme='clean-light']:bg-white border border-pink-500/30 [data-theme='clean-light']:border-pink-200 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10 [data-theme='clean-light']:border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 [data-theme='clean-light']:bg-pink-100 border border-pink-500/40 [data-theme='clean-light']:border-pink-300 flex items-center justify-center text-pink-400 [data-theme='clean-light']:text-pink-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white [data-theme='clean-light']:text-slate-900 text-lg sm:text-xl">
                Creator Collaboration Scope & Budget Calculator
              </h4>
              <p className="text-neutral-400 [data-theme='clean-light']:text-slate-600 text-xs sm:text-sm">
                Estimate expected reach, campaign structure, and budget tiers for your business.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Step 1: Reach Scale */}
            <div>
              <label className="creator-opt-label block text-xs font-bold uppercase tracking-wider mb-2">
                1. Select Target Audience Reach:
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setReachTier('micro')}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    reachTier === 'micro'
                      ? "bg-pink-950/60 border-pink-400 text-white [data-theme='clean-light']:bg-pink-50 [data-theme='clean-light']:border-pink-500 [data-theme='clean-light']:text-slate-900 shadow-sm"
                      : "bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white [data-theme='clean-light']:bg-white [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:text-slate-700 [data-theme='clean-light']:hover:bg-slate-50"
                  }`}
                >
                  <div className="creator-opt-title text-xs">Micro Niche (10k - 50k Reach)</div>
                  <div className="creator-opt-desc text-[11px] mt-0.5 font-medium">High engagement in localized Indian markets</div>
                </button>

                <button
                  type="button"
                  onClick={() => setReachTier('mid')}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    reachTier === 'mid'
                      ? "bg-pink-950/60 border-pink-400 text-white [data-theme='clean-light']:bg-pink-50 [data-theme='clean-light']:border-pink-500 [data-theme='clean-light']:text-slate-900 shadow-sm"
                      : "bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white [data-theme='clean-light']:bg-white [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:text-slate-700 [data-theme='clean-light']:hover:bg-slate-50"
                  }`}
                >
                  <div className="creator-opt-title text-xs">Mid-Tier Authority (50k - 200k Reach)</div>
                  <div className="creator-opt-desc text-[11px] mt-0.5 font-medium">Established vertical educators, fitness & tech creators</div>
                </button>

                <button
                  type="button"
                  onClick={() => setReachTier('macro')}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    reachTier === 'macro'
                      ? "bg-pink-950/60 border-pink-400 text-white [data-theme='clean-light']:bg-pink-50 [data-theme='clean-light']:border-pink-500 [data-theme='clean-light']:text-slate-900 shadow-sm"
                      : "bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white [data-theme='clean-light']:bg-white [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:text-slate-700 [data-theme='clean-light']:hover:bg-slate-50"
                  }`}
                >
                  <div className="creator-opt-title text-xs">Network / Scaled (200k+ Multi-Creator)</div>
                  <div className="creator-opt-desc text-[11px] mt-0.5 font-medium">Omni-channel UGC ad rights & affiliate revenue share</div>
                </button>
              </div>
            </div>

            {/* Step 2: Primary Goal */}
            <div>
              <label className="creator-opt-label block text-xs font-bold uppercase tracking-wider mb-2">
                2. Select Primary Objective:
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setCampaignGoal('awareness')}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    campaignGoal === 'awareness'
                      ? "bg-pink-950/60 border-pink-400 text-white [data-theme='clean-light']:bg-pink-50 [data-theme='clean-light']:border-pink-500 [data-theme='clean-light']:text-slate-900 shadow-sm"
                      : "bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white [data-theme='clean-light']:bg-white [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:text-slate-700 [data-theme='clean-light']:hover:bg-slate-50"
                  }`}
                >
                  <div className="creator-opt-title text-xs">Brand Awareness & Local Trust</div>
                  <div className="creator-opt-desc text-[11px] mt-0.5 font-medium">Sponsored reel, stories & trackable WhatsApp link</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCampaignGoal('product_launch')}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    campaignGoal === 'product_launch'
                      ? "bg-pink-950/60 border-pink-400 text-white [data-theme='clean-light']:bg-pink-50 [data-theme='clean-light']:border-pink-500 [data-theme='clean-light']:text-slate-900 shadow-sm"
                      : "bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white [data-theme='clean-light']:bg-white [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:text-slate-700 [data-theme='clean-light']:hover:bg-slate-50"
                  }`}
                >
                  <div className="creator-opt-title text-xs">Course / Product / Storefront Launch</div>
                  <div className="creator-opt-desc text-[11px] mt-0.5 font-medium">Dedicated link-in-bio checkout + automated DM-bot</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCampaignGoal('ugc_ads')}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    campaignGoal === 'ugc_ads'
                      ? "bg-pink-950/60 border-pink-400 text-white [data-theme='clean-light']:bg-pink-50 [data-theme='clean-light']:border-pink-500 [data-theme='clean-light']:text-slate-900 shadow-sm"
                      : "bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white [data-theme='clean-light']:bg-white [data-theme='clean-light']:border-slate-200 [data-theme='clean-light']:text-slate-700 [data-theme='clean-light']:hover:bg-slate-50"
                  }`}
                >
                  <div className="creator-opt-title text-xs">UGC Video Assets for Paid Ads</div>
                  <div className="creator-opt-desc text-[11px] mt-0.5 font-medium">High-converting creator testimonials with ad rights</div>
                </button>
              </div>
            </div>
          </div>

          {/* Calculator Output Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-950/70 to-slate-900 [data-theme='clean-light']:from-pink-50 [data-theme='clean-light']:to-rose-50 border border-pink-500/40 [data-theme='clean-light']:border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1.5">
              <span className="creator-price-label text-[10px] font-mono uppercase tracking-wider font-bold">
                Recommended Architecture
              </span>
              <h5 className="creator-tier-name font-display font-bold text-base sm:text-lg">
                {estimate.recommendedModel}
              </h5>
              <div className="creator-turnaround-text text-xs sm:text-sm font-medium">
                Estimated Cost: <strong className="creator-estimator-price font-mono text-sm sm:text-base font-extrabold">{estimate.priceRange}</strong>
              </div>
              <div className="creator-tagline-text text-xs mt-1 font-normal">
                {estimate.bestFor}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectCollabForInquiry(`${estimate.recommendedModel} (${estimate.priceRange})`)}
              data-creator-gradient="true"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xs whitespace-nowrap shadow-lg shadow-pink-500/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <span style={{ color: '#ffffff' }}>Inquire for this Scope</span>
              <ArrowRight className="w-3.5 h-3.5" style={{ color: '#ffffff' }} />
            </button>
          </div>
        </div>
      )}

      {/* Why Creator Collaboration Pricing is Different - Architectural Transparency Card */}
      <div className="creator-diff-card mt-12 rounded-2xl p-6 sm:p-7 backdrop-blur-xl">
        <div className="creator-diff-title flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          <HelpCircle className="w-4 h-4 text-pink-400 [data-theme='clean-light']:text-pink-700 shrink-0" />
          <span>Why is Creator Collaboration Pricing Different from Web Engineering?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="creator-subcard p-4 rounded-xl space-y-1.5">
            <div className="creator-subcard-title flex items-center gap-1.5">
              <Award className="w-4 h-4 text-pink-400 [data-theme='clean-light']:text-pink-700 shrink-0" />
              <span>Audience Attention & Social Proof</span>
            </div>
            <p className="creator-subcard-desc">
              Unlike code files that sit on a server, creator collaborations leverage warm, loyal community trust that drives instant social validation and immediate inbound traffic.
            </p>
          </div>

          <div className="creator-subcard p-4 rounded-xl space-y-1.5">
            <div className="creator-subcard-title flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-pink-400 [data-theme='clean-light']:text-pink-700 shrink-0" />
              <span>Commercial Ad Rights & UGC</span>
            </div>
            <p className="creator-subcard-desc">
              Pricing includes whitelisting permissions to use the creator's face and video assets across your own Meta & Google ad campaigns for 30–90 days with zero licensing friction.
            </p>
          </div>

          <div className="creator-subcard p-4 rounded-xl space-y-1.5">
            <div className="creator-subcard-title flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-pink-400 [data-theme='clean-light']:text-pink-700 shrink-0" />
              <span>Performance & Rev-Share Alignment</span>
            </div>
            <p className="creator-subcard-desc">
              We offer hybrid models with reduced upfront bases and revenue share incentives, ensuring our growth engineers and creators are directly rewarded when your business sells.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 [data-theme='clean-light']:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="creator-partner-prompt font-medium">Are you an influencer or digital creator looking to launch your brand?</span>
          <a
            href="#contact"
            onClick={() => onSelectCollabForInquiry('Creator Co-Launch / Storefront Inquiry')}
            className="creator-partner-link font-bold underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Partner with GWL Weblab as a Creator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
