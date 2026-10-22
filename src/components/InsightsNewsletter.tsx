import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  Download,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  FileCode,
  RefreshCw,
  MessageSquare,
  Bot,
  Layers,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openWhatsAppDirect, getWhatsAppUrl } from '../utils/whatsapp';
import { generateDigitalGrowthBlueprintPdf } from '../utils/blueprintPdfGenerator';

interface InsightsNewsletterProps {
  onSuccess?: (email: string) => void;
  className?: string;
}

export interface TacticalTopic {
  id: string;
  label: string;
  desc: string;
  icon: React.ElementType;
}

const TACTICAL_TOPICS: TacticalTopic[] = [
  {
    id: 'arch',
    label: 'Sub-Second Speed & Architecture',
    desc: 'Core Web Vitals, Vite/React caching, <1s FCP',
    icon: Zap
  },
  {
    id: 'seo',
    label: 'Local SEO & Google 3-Pack',
    desc: 'Schema.org JSON-LD, GMB ranking triggers, Maps citations',
    icon: TrendingUp
  },
  {
    id: 'cro',
    label: 'WhatsApp Funnel Mechanics',
    desc: '1-tap native deep-links, friction-free client onboarding',
    icon: MessageSquare
  },
  {
    id: 'ai',
    label: 'Autonomous AI Growth Systems',
    desc: 'Server-side Gemini AI chat, smart lead scoring',
    icon: Bot
  }
];

export const InsightsNewsletter: React.FC<InsightsNewsletterProps> = ({
  onSuccess,
  className = ''
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sendToWhatsApp, setSendToWhatsApp] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['arch', 'seo', 'cro']);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [hasDownloadedBlueprint, setHasDownloadedBlueprint] = useState(false);

  // Check past subscription for notification banner (without locking out the form)
  const [pastSubscriber, setPastSubscriber] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gwl_newsletter_subscriber');
      if (stored) {
        setPastSubscriber(stored);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((t) => t !== id) : prev) : [...prev, id]
    );
  };

  const generateBlueprintContent = (subscriberName: string, topics: string[]): string => {
    const topicLabels = TACTICAL_TOPICS.filter((t) => topics.includes(t.id))
      .map((t) => `• ${t.label} (${t.desc})`)
      .join('\n');

    return `# GWL WebLab — Tactical Engineering & Growth Blueprint (2026 Edition)
Document: Production Architectural Teardown & High-Conversion System Guide
Prepared for: ${subscriberName || 'Valued Subscriber'}
Generated on: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
Official Desk / WhatsApp: +91 75879 39722

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBSCRIBED FOCUS AREAS:
${topicLabels}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1. SUB-SECOND WEB PERFORMANCE (CORE WEB VITALS BENCHMARKS)
- Largest Contentful Paint (LCP): Must be < 1.2s on standard 4G mobile.
- Cumulative Layout Shift (CLS): Strictly 0.00. Pre-allocate image/banner aspect ratios.
- Interaction to Next Paint (INP): Under 150ms. Zero main-thread blocking scripts.
- Font Loading Strategy: Self-host WOFF2 with 'font-display: swap'. Inline critical CSS.

## 2. GOOGLE LOCAL 3-PACK DOMINATION (SCHEMA.ORG BLUEPRINT)
- Embed LocalBusiness + ProfessionalService JSON-LD on root and service pages.
- Ensure exact NAP (Name, Address, Phone) consistency matching Google Business Profile:
  Telephone: +91-7587939722
  Region: Gwalior, Madhya Pradesh & Global
- Link high-intent local services to dedicated landing pages with geotargeted headings.

## 3. FRICTIONLESS WHATSAPP CONVERSION MECHANICS
- Traditional multi-page inquiry forms suffer from 65%+ abandonment.
- 1-Tap WhatsApp Funnel Architecture:
  Deep-link directly via: 'https://wa.me/917587939722?text=[EncodedBrief]'
  Pre-populate user selections (service, plan, budget, domain) to reduce friction to zero.

## 4. CODE OWNERSHIP & ZERO VENDOR TAX
- Always demand full source code, GitHub repository access, and uncompiled assets.
- Avoid proprietary closed-source website builders with monthly platform rent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEED HELP IMPLEMENTING THIS ARCHITECTURE?
Chat directly with our senior engineering desk on WhatsApp:
https://wa.me/917587939722?text=Hi%20GWL%20WebLab%2C%20I%20downloaded%20the%20Tactical%20Blueprint%20and%20would%20like%20to%20discuss%20an%20audit.
`;
  };

  const handleDownloadBlueprint = () => {
    try {
      generateDigitalGrowthBlueprintPdf({
        email: email.trim() || submittedEmail || 'subscriber@domain.com',
        name: name.trim() || undefined,
        phone: phone.trim() || undefined
      });
      setHasDownloadedBlueprint(true);
    } catch (err) {
      console.error('PDF Download failed:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your work or personal email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setStatus('loading');

    // Build the formatted WhatsApp message if WhatsApp dispatch is requested
    const selectedTopicNames = TACTICAL_TOPICS.filter((t) => selectedTopics.includes(t.id))
      .map((t) => t.label)
      .join(', ');

    const whatsappLines = [
      '📚 *NEW TACTICAL BLUEPRINT SUBSCRIPTION*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '👋 *Namaste & Hello GWL WebLab Team,*',
      '',
      'I just subscribed to your Tactical Growth Blueprints newsletter!',
      '',
      '📋 *SUBSCRIBER SPECIFICATIONS:*',
      `• *Subscriber Name:* ${name.trim() || 'Reader'}`,
      `• *Email Address:* ${cleanEmail}`,
      phone.trim() ? `• *WhatsApp / Phone:* ${phone.trim()}` : null,
      `• *Chosen Focus Areas:* ${selectedTopicNames}`,
      '• *Frequency:* Bi-Weekly Tactical Engineering Briefs',
      '',
      '⚡ *REQUEST:*',
      'Please send me the latest "2026 Core Web Vitals & Local SEO Architecture Blueprint" and add me to your private VIP newsletter list.',
      '',
      'Thank you! 🚀',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    ].filter(Boolean);

    const whatsappMessage = whatsappLines.join('\n');

    setTimeout(() => {
      try {
        localStorage.setItem('gwl_newsletter_subscriber', cleanEmail);
        const subData = {
          email: cleanEmail,
          name: name.trim() || 'Reader',
          phone: phone.trim() || '',
          topics: selectedTopics,
          date: new Date().toISOString()
        };
        localStorage.setItem(`gwl_subscriber_${cleanEmail}`, JSON.stringify(subData));
      } catch {
        // Fallback gracefully
      }

      setSubmittedEmail(cleanEmail);
      setStatus('success');
      onSuccess?.(cleanEmail);

      // Auto-trigger tactical blueprint file download for immediate gratification
      handleDownloadBlueprint();

      // If user opted for WhatsApp delivery or entered a phone number, forward to WhatsApp
      if (sendToWhatsApp || phone.trim()) {
        openWhatsAppDirect(whatsappMessage);
      }
    }, 600);
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setName('');
    setPhone('');
    setSendToWhatsApp(false);
    setErrorMessage('');
    setHasDownloadedBlueprint(false);
  };

  return (
    <div
      id="growth-newsletter"
      className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 glass-card theme-card-bg border border-emerald-500/35 overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* Background Accent Mesh */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'var(--theme-primary, #10b981)' }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'var(--theme-accent, #00f0ff)' }}
      />

      <div className="relative z-10">
        {/* Top Eyebrow Badge & Metrics */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tactical Growth Blueprints Dispatch</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>1,850+ Founders & Engineers</span>
            </span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="hidden sm:inline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero spam, unsubscribe in 1 click</span>
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* Success / Active Subscription State */
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="py-6 text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-950/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Subscription Confirmed & Blueprint Ready</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-2">
                    You're On The VIP Blueprints List!
                  </h3>
                  <p className="text-neutral-300 text-sm max-w-xl leading-relaxed mb-3">
                    We have confirmed your subscription for{' '}
                    <strong className="text-emerald-400 font-mono">
                      {submittedEmail || email}
                    </strong>
                    . Your immediate download of{' '}
                    <em className="text-white font-medium">
                      "2026 Core Web Vitals & Local SEO Architecture Blueprint"
                    </em>{' '}
                    has been generated.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Instant Access Granted</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                      Frequency: Bi-Weekly Private Briefs
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                      Format: Production Code & Checklists
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Success State */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadBlueprint}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider theme-btn-primary shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  <span>{hasDownloadedBlueprint ? 'Download Blueprint Again' : 'Download Blueprint (.MD)'}</span>
                </button>

                <a
                  href={`https://wa.me/917587939722?text=${encodeURIComponent(
                    `📚 *Tactical Blueprint Download Confirmation*\n\nHi GWL WebLab team, I just subscribed to your Tactical Blueprints with email: ${submittedEmail || email}. Please verify my access and share upcoming architectural breakdowns on WhatsApp!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Send to WhatsApp (+91 75879 39722)</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Subscribe Another Address</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Unsubscribed Form State */
            <motion.div
              key="form-state"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Copy & Value Proposition */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Subscribe to Tactical Growth Blueprints
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Every two weeks, our senior software engineers publish real production architecture teardowns: sub-second latency optimizations, Google Local 3-Pack rank triggers, and high-converting WhatsApp lead funnels.
                </p>

                {/* Topics Selection Chips */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Choose Your Tactical Focus:</span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {selectedTopics.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TACTICAL_TOPICS.map((topic) => {
                      const Icon = topic.icon;
                      const isSelected = selectedTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          className={`text-left p-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer select-none border flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40 shadow-sm'
                              : 'bg-white/[0.03] text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.06] border-white/10'
                          }`}
                        >
                          <div className={`p-1 rounded-lg shrink-0 mt-0.5 ${isSelected ? 'bg-emerald-500/25 text-emerald-300' : 'bg-white/5 text-neutral-400'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-semibold block leading-tight">{topic.label}</span>
                            <span className="text-[10.5px] text-neutral-400 leading-tight block mt-0.5">{topic.desc}</span>
                          </div>
                          {isSelected && <span className="text-emerald-400 text-xs ml-auto shrink-0 font-bold">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Instant Deliverable Callout */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3 text-xs text-neutral-300">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Instant Free Bonus Included:</strong>
                    <span>
                      Get the <strong>"2026 Core Web Vitals & Local SEO Architecture Blueprint"</strong> download immediately upon submitting.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Form Inputs */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-6 sm:p-8 rounded-3xl bg-black/50 border border-white/15 backdrop-blur-xl space-y-4 shadow-2xl relative"
                >
                  {/* Subscriber Name */}
                  <div>
                    <label
                      htmlFor="newsletter-name"
                      className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5 flex items-center justify-between"
                    >
                      <span>Your First Name</span>
                      <span className="text-[11px] text-neutral-500 font-normal">Optional</span>
                    </label>
                    <input
                      id="newsletter-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul or Vikram"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-400 text-sm transition-colors"
                    />
                  </div>

                  {/* Subscriber Email */}
                  <div>
                    <label
                      htmlFor="newsletter-email"
                      className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5"
                    >
                      Work or Personal Email <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="you@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border text-white placeholder:text-neutral-500 focus:outline-none text-sm transition-colors ${
                        errorMessage
                          ? 'border-rose-500/80 focus:border-rose-400'
                          : 'border-white/15 focus:border-emerald-400'
                      }`}
                    />
                    {errorMessage && (
                      <p className="mt-1.5 text-xs text-rose-400 font-medium">
                        ⚠️ {errorMessage}
                      </p>
                    )}
                  </div>

                  {/* Optional WhatsApp Number */}
                  <div>
                    <label
                      htmlFor="newsletter-phone"
                      className="block text-xs font-mono font-semibold text-neutral-300 mb-1.5 flex items-center justify-between"
                    >
                      <span>WhatsApp Number (For Direct Blueprint Drop)</span>
                      <span className="text-[11px] text-emerald-400 font-normal font-mono">+91 Supported</span>
                    </label>
                    <input
                      id="newsletter-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 75879 39722"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-400 text-sm transition-colors"
                    />
                  </div>

                  {/* WhatsApp Direct Option Checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer pt-1 select-none">
                    <input
                      type="checkbox"
                      checked={sendToWhatsApp}
                      onChange={(e) => setSendToWhatsApp(e.target.checked)}
                      className="mt-0.5 rounded border-white/20 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                    />
                    <span className="text-xs text-neutral-300 leading-snug">
                      Also open on <strong>WhatsApp (+91 75879 39722)</strong> for instant mobile access to future briefs.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wide theme-btn-primary shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {status === 'loading' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Securing Access & Building Blueprint...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-950 fill-current" />
                        <span>Subscribe & Download Blueprint</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero spam. No promotional noise.</span>
                    </span>
                    <span className="font-mono text-neutral-400">
                      Bi-weekly delivery
                    </span>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
