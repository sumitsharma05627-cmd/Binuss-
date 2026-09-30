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
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InsightsNewsletterProps {
  onSuccess?: (email: string) => void;
  className?: string;
}

const TOPICS = [
  { id: 'arch', label: 'Web Speed & Architecture', icon: Zap },
  { id: 'seo', label: 'Local SEO & Google Ads', icon: TrendingUp },
  { id: 'cro', label: 'Conversion Optimization (CRO)', icon: FileCode }
];

export const InsightsNewsletter: React.FC<InsightsNewsletterProps> = ({
  onSuccess,
  className = ''
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['arch', 'seo', 'cro']);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [savedSubscriber, setSavedSubscriber] = useState<string | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('gwl_newsletter_subscriber') || localStorage.getItem('kbsr_newsletter_subscriber');
      if (stored) {
        setSavedSubscriber(stored);
      }
    } catch {
      // Storage unavailable or blocked
    }
  }, []);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((t) => t !== id) : prev) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid work or personal email.');
      return;
    }

    setStatus('loading');

    // Simulate reliable subscription sequence
    setTimeout(() => {
      try {
        localStorage.setItem('gwl_newsletter_subscriber', cleanEmail);
        const subData = {
          email: cleanEmail,
          name: name.trim() || 'Reader',
          topics: selectedTopics,
          date: new Date().toISOString()
        };
        localStorage.setItem(`gwl_subscriber_${cleanEmail}`, JSON.stringify(subData));
      } catch {
        // Fallback gracefully
      }

      setSavedSubscriber(cleanEmail);
      setStatus('success');
      onSuccess?.(cleanEmail);
    }, 700);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('gwl_newsletter_subscriber');
      localStorage.removeItem('kbsr_newsletter_subscriber');
    } catch {
      // Ignore
    }
    setSavedSubscriber(null);
    setStatus('idle');
    setEmail('');
    setName('');
  };

  return (
    <div
      id="growth-newsletter"
      className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 glass-card theme-card-bg border border-emerald-500/30 overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
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
        {/* Top Eyebrow Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>Tactical Growth Blueprints</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero fluff. Bi-weekly private briefs.</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' || savedSubscriber ? (
            /* Success / Active Subscription State */
            <motion.div
              key="success-state"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="py-6 text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
                    You're Subscribed to Growth Blueprints!
                  </h3>
                  <p className="text-neutral-300 text-sm max-w-xl leading-relaxed">
                    Check your inbox at{' '}
                    <strong className="text-emerald-400 font-mono">
                      {savedSubscriber || email}
                    </strong>
                    . We have queued your welcome breakdown: <em>"The 2026 Core Web Vitals & Local SEO Architecture Blueprint"</em>.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                      ✓ Instant Access Active
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                      Frequency: Bi-Weekly
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold theme-btn-primary transition-all flex items-center justify-center gap-1.5 shadow-lg whitespace-nowrap cursor-pointer text-center"
                >
                  <span>Request Custom Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Subscribe with another email"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Use Another Email</span>
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
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Copy & Value Proposition */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Get Private Technical & Conversion Blueprints
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Every two weeks, our senior software engineers break down real architectural strategies, performance audits, sub-second latency optimizations, and high-converting funnel mechanics.
                </p>

                {/* Topics Selection */}
                <div className="pt-2">
                  <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                    Select Your Tactical Focus:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((topic) => {
                      const Icon = topic.icon;
                      const isSelected = selectedTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none ${
                            isSelected
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                              : 'bg-white/5 text-neutral-400 hover:text-neutral-200 border border-white/10'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{topic.label}</span>
                          {isSelected && <span className="text-emerald-400 text-[10px]">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-2 text-xs text-neutral-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    Includes instant access to our <strong>"2026 Core Web Vitals Optimization Checklist"</strong>.
                  </span>
                </div>
              </div>

              {/* Right Column: Form Inputs */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-5 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-3.5 shadow-xl"
                >
                  <div>
                    <label
                      htmlFor="newsletter-name"
                      className="block text-xs font-mono font-medium text-neutral-300 mb-1"
                    >
                      First Name <span className="text-neutral-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="newsletter-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex or Sumit"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-400 text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newsletter-email"
                      className="block text-xs font-mono font-medium text-neutral-300 mb-1"
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
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border text-white placeholder:text-neutral-400 focus:outline-none text-sm transition-colors ${
                        errorMessage
                          ? 'border-rose-500/80 focus:border-rose-400'
                          : 'border-white/15 focus:border-emerald-400'
                      }`}
                    />
                    {errorMessage && (
                      <p className="mt-1 text-xs text-rose-400 font-medium">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3 px-6 rounded-full font-bold text-sm tracking-wide theme-btn-primary shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
                  >
                    {status === 'loading' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Securing Access...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Tactical Blueprints</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Zero spam. Unsubscribe anytime.
                    </span>
                    <span className="font-mono text-neutral-400">
                      1,850+ Engineers & Founders
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
