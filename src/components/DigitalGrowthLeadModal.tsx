import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  CheckCircle2,
  Sparkles,
  FileText,
  ShieldCheck,
  Zap,
  TrendingUp,
  MessageSquare,
  Lock,
  ArrowRight,
  RefreshCw,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateDigitalGrowthBlueprintPdf } from '../utils/blueprintPdfGenerator';
import { openWhatsAppDirect, getWhatsAppUrl } from '../utils/whatsapp';

const STORAGE_DISMISSED_KEY = 'gwl_growth_blueprint_modal_dismissed';
const STORAGE_DOWNLOADED_KEY = 'gwl_growth_blueprint_downloaded';

export const DigitalGrowthLeadModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sendWhatsApp, setSendWhatsApp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 15-second delayed popup trigger
  useEffect(() => {
    // Check if user already dismissed or downloaded in this session
    try {
      const dismissed = sessionStorage.getItem(STORAGE_DISMISSED_KEY);
      const downloaded = localStorage.getItem(STORAGE_DOWNLOADED_KEY);
      if (dismissed || downloaded) {
        return;
      }
    } catch {
      // Storage unavailable, proceed with timer
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_DISMISSED_KEY, 'true');
    } catch {
      // Ignore
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
      setErrorMessage('Please enter a valid email address (e.g. name@company.com).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate and initiate download of the PDF
      generateDigitalGrowthBlueprintPdf({
        email: cleanEmail,
        name: name.trim() || undefined,
        phone: phone.trim() || undefined
      });

      try {
        localStorage.setItem(STORAGE_DOWNLOADED_KEY, 'true');
        sessionStorage.setItem(STORAGE_DISMISSED_KEY, 'true');
      } catch {
        // Ignore
      }

      // If user selected WhatsApp delivery or provided phone, forward formatted brief
      if (sendWhatsApp || phone.trim()) {
        const lines = [
          '📚 *DIGITAL GROWTH BLUEPRINT (PDF) CONFIRMATION*',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '👋 *Namaste & Hello GWL WebLab Team,*',
          '',
          'I just downloaded your 2026 Digital Growth Blueprint (PDF) from your website!',
          '',
          '📋 *RECIPIENT SPECIFICATIONS:*',
          `• *Name:* ${name.trim() || 'Executive Reader'}`,
          `• *Email:* ${cleanEmail}`,
          phone.trim() ? `• *Phone / WhatsApp:* ${phone.trim()}` : null,
          '• *Deliverable:* 2026 Digital Growth Blueprint (PDF)',
          '',
          '⚡ *NEXT STEPS:*',
          'Please verify my subscription and share upcoming technical audits and Core Web Vitals breakdowns on WhatsApp.',
          '',
          'Looking forward to reading! 🚀',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ].filter(Boolean);

        openWhatsAppDirect(lines.join('\n'));
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleDownloadAgain = () => {
    generateDigitalGrowthBlueprintPdf({
      email: email.trim() || 'subscriber@domain.com',
      name: name.trim() || undefined,
      phone: phone.trim() || undefined
    });
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="growth-blueprint-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-xl bg-[#070b16] [data-theme=clean-light]:bg-white border border-emerald-500/40 [data-theme=clean-light]:border-slate-200 rounded-3xl p-5 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] [data-theme=clean-light]:shadow-2xl overflow-hidden my-auto max-h-[92vh] overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: '#10b981' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: '#00f0ff' }}
        />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-neutral-400 hover:text-white [data-theme=clean-light]:text-slate-500 [data-theme=clean-light]:hover:text-slate-900 rounded-full hover:bg-white/10 [data-theme=clean-light]:hover:bg-slate-100 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="py-4 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>PDF Download Initiated Successfully</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white [data-theme=clean-light]:text-slate-900 leading-tight">
                Your Blueprint is on its Way!
              </h3>

              <p className="text-neutral-300 [data-theme=clean-light]:text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you{name ? `, ${name}` : ''}! The comprehensive <strong>Digital Growth Blueprint (2026 Edition)</strong> has been compiled and downloaded to your device for{' '}
                <span className="text-emerald-400 font-mono font-semibold">{email}</span>.
              </p>

              {/* Summary Deliverable Card */}
              <div className="p-4 rounded-2xl bg-black/50 [data-theme=clean-light]:bg-slate-50 border border-emerald-500/25 max-w-md mx-auto text-left text-xs font-mono space-y-2">
                <div className="text-emerald-400 uppercase font-bold text-[10px] tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Deliverable Package Details</span>
                </div>
                <div className="text-neutral-200 [data-theme=clean-light]:text-slate-700">
                  • File: <span className="font-bold text-white [data-theme=clean-light]:text-slate-900">GWL-WebLab-Digital-Growth-Blueprint-2026.pdf</span>
                </div>
                <div className="text-neutral-200 [data-theme=clean-light]:text-slate-700">
                  • Scope: Core Web Vitals, Google 3-Pack Schema & WhatsApp Funnels
                </div>
                <div className="text-neutral-200 [data-theme=clean-light]:text-slate-700">
                  • Support Hotline: <span className="font-bold text-emerald-400">+91 75879 39722</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadAgain}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl theme-btn-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Again</span>
                </button>

                <a
                  href={`https://wa.me/917587939722?text=${encodeURIComponent(
                    `📚 *Tactical Blueprint Discussion*\n\nHi GWL WebLab team, I just downloaded your Digital Growth Blueprint for ${email}. I would like to schedule a free 15-minute technical audit for our business.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Chat on WhatsApp (+91 75879 39722)</span>
                </a>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 [data-theme=clean-light]:bg-slate-100 [data-theme=clean-light]:hover:bg-slate-200 text-white [data-theme=clean-light]:text-slate-800 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          ) : (
            /* Lead Generation Form State */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* Eyebrow Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free Downloadable PDF • 2026 Edition</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Instant Access</span>
                </span>
              </div>

              {/* Title & Value Pitch */}
              <h2
                id="growth-blueprint-modal-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-white [data-theme=clean-light]:text-slate-900 tracking-tight leading-tight mb-2"
              >
                Claim the 2026 Digital Growth Blueprint
              </h2>

              <p className="text-neutral-300 [data-theme=clean-light]:text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                The executive engineering guide used by regional market leaders: how to cut mobile load times below 1 second, dominate the Google Local 3-Pack, and turn visits into 1-tap WhatsApp inquiries.
              </p>

              {/* 4 Feature Value Pills */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-[11px] leading-snug">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-0.5">
                    <Zap className="w-3.5 h-3.5 shrink-0" />
                    <span>Sub-Second Latency</span>
                  </div>
                  <span className="text-neutral-400 [data-theme=clean-light]:text-slate-500">
                    Core Web Vitals & 98+ Lighthouse code patterns.
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-[11px] leading-snug">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-0.5">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    <span>Google Local 3-Pack</span>
                  </div>
                  <span className="text-neutral-400 [data-theme=clean-light]:text-slate-500">
                    Schema.org JSON-LD templates & NAP citation rules.
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-[11px] leading-snug">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-0.5">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span>1-Tap WhatsApp Funnels</span>
                  </div>
                  <span className="text-neutral-400 [data-theme=clean-light]:text-slate-500">
                    Native mobile deep-linking for 4x form conversion.
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-[11px] leading-snug">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-0.5">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>Zero Vendor Tax</span>
                  </div>
                  <span className="text-neutral-400 [data-theme=clean-light]:text-slate-500">
                    100% full code ownership with zero SaaS lock-in.
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email (Required) */}
                  <div>
                    <label
                      htmlFor="blueprint-email"
                      className="block text-xs font-mono font-bold text-neutral-200 [data-theme=clean-light]:text-slate-800 uppercase tracking-wider mb-1"
                    >
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="blueprint-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="you@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] [data-theme=clean-light]:bg-slate-50 border border-emerald-500/35 [data-theme=clean-light]:border-slate-200 text-white [data-theme=clean-light]:text-slate-900 placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  {/* Name (Optional) */}
                  <div>
                    <label
                      htmlFor="blueprint-name"
                      className="block text-xs font-mono font-bold text-neutral-200 [data-theme=clean-light]:text-slate-800 uppercase tracking-wider mb-1 flex items-center justify-between"
                    >
                      <span>First Name</span>
                      <span className="text-[10px] text-neutral-500 font-normal">Optional</span>
                    </label>
                    <input
                      id="blueprint-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-white [data-theme=clean-light]:text-slate-900 placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                {/* WhatsApp Phone (Optional) */}
                <div>
                  <label
                    htmlFor="blueprint-phone"
                    className="block text-xs font-mono font-bold text-neutral-200 [data-theme=clean-light]:text-slate-800 uppercase tracking-wider mb-1 flex items-center justify-between"
                  >
                    <span>WhatsApp Number</span>
                    <span className="text-[10px] text-emerald-400 font-normal font-mono">+91 Supported</span>
                  </label>
                  <input
                    id="blueprint-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 75879 39722"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-white [data-theme=clean-light]:text-slate-900 placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                {/* WhatsApp Checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-0.5 select-none text-[11px] text-neutral-300 [data-theme=clean-light]:text-slate-600 leading-snug">
                  <input
                    type="checkbox"
                    checked={sendWhatsApp}
                    onChange={(e) => setSendWhatsApp(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                  />
                  <span>
                    Also open on <strong>WhatsApp (+91 75879 39722)</strong> for instant mobile download link and future tactical alerts.
                  </span>
                </label>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider theme-btn-primary shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Compiling & Generating PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Free Blueprint PDF (Instant)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Secondary Dismissal & Privacy Footer */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 [data-theme=clean-light]:text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero spam. No credit card required.</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="hover:text-white [data-theme=clean-light]:hover:text-slate-900 transition-colors underline cursor-pointer"
                  >
                    No thanks, continue browsing
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
