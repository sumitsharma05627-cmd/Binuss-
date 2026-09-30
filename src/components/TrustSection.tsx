import React from 'react';
import { Check, ShieldAlert, Zap, Layers, RefreshCw, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface TrustSectionProps {
  onStartConversation: () => void;
}

const TRUST_PILLARS = [
  {
    icon: Layers,
    title: 'Business-First Mindset',
    description: 'We don’t build art experiments. Every layout, button, headline, and pixel exists to drive customer inquiries, phone calls, and revenue for your business.'
  },
  {
    icon: Zap,
    title: 'Speed & Conversion Focused',
    description: 'Ultra-fast load times under 1.2s, optimized mobile touchpoints, and instant WhatsApp triggers to eliminate customer drop-off.'
  },
  {
    icon: ShieldAlert,
    title: 'Transparent Pricing & Delivery',
    description: 'Fixed packages with no hidden retainers or confusing scope revisions. You know exactly what you get, how much it costs, and when it launches.'
  },
  {
    icon: RefreshCw,
    title: 'No Tech Burden on You',
    description: 'We handle the domain DNS, high-speed hosting, mobile responsiveness, SSL security, and form routing so you can focus entirely on running your operations.'
  },
  {
    icon: Award,
    title: 'Full Cohesive System',
    description: 'We don’t just deliver a template and disappear. We connect your website with Google Search, local map discovery, and direct customer communication channels.'
  },
  {
    icon: Check,
    title: 'Post-Launch Guidance',
    description: 'Every project includes dedicated launch assistance and straightforward instructions to help your team start receiving and handling inquiries.'
  }
];

export const TrustSection: React.FC<TrustSectionProps> = ({ onStartConversation }) => {
  const { ref, stage } = useSectionSequence('trust');
  const { t } = useLanguage();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="trust"
      aria-label="Why Trust GWL Weblab"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5 bg-[#050813]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <span>{t.trust.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
          >
            {t.trust.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7 }}
            className="text-neutral-400 text-base sm:text-lg"
          >
            {t.trust.subtitle}
          </motion.p>
        </div>

        {/* 6 Trust Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-[#090f1e]/60 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400/80">
                  {t.trust.badgeStandard}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee / Reassurance callout */}
        <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-neutral-300 text-sm mb-4">
            {t.trust.bottomNotice}
          </p>
          <button
            onClick={onStartConversation}
            className="px-6 py-2.5 rounded-full text-xs font-bold theme-btn-primary transition-all cursor-pointer"
          >
            {t.trust.scheduleCallBtn}
          </button>
        </div>
      </div>
    </section>
  );
};
