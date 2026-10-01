import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Sparkles,
  Send,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  Building,
  User,
  MessageSquare,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialMessage?: string;
  initialSubject?: string;
  websiteUrl?: string;
  contextBenchmark?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialService = 'SEO & Google Search',
  initialMessage = '',
  initialSubject = 'Free Technical SEO Audit',
  websiteUrl = '',
  contextBenchmark
}) => {
  const { t } = useLanguage();
  const { themeConfig } = useTheme();

  const defaultSeoMessage =
    initialMessage ||
    `Hi GWL Weblab Team,\n\nI would like to request a Free Comprehensive SEO Audit for my website. Please analyze our technical Core Web Vitals, organic keyword rankings, on-page optimization, and backlink authority to identify traffic growth opportunities.`;

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    websiteUrl: websiteUrl || '',
    email: '',
    phone: '',
    serviceRequired: initialService,
    message: defaultSeoMessage
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update defaults when modal opens with new props
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: initialService || 'SEO & Google Search',
        websiteUrl: websiteUrl || prev.websiteUrl,
        message: initialMessage || defaultSeoMessage
      }));
      setIsSubmitted(false);
      setErrorMessage('');
    }
  }, [isOpen, initialService, initialMessage, websiteUrl]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name, email, and phone/WhatsApp number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `*Free SEO Audit Request - GWL Weblab*\n\n` +
      `*Name:* ${formData.name || 'Not provided'}\n` +
      `*Website:* ${formData.websiteUrl || 'To be shared'}\n` +
      `*Email:* ${formData.email || 'Not provided'}\n` +
      `*Message:* ${formData.message}`
    );
    window.open(`https://wa.me/919755061139?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#090e1a]/95 [data-theme=clean-light]:bg-white border border-emerald-500/35 [data-theme=clean-light]:border-slate-200 rounded-3xl p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] [data-theme=clean-light]:shadow-2xl overflow-hidden my-auto max-h-[92vh] overflow-y-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Specular Glow & Hairline */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: themeConfig.primaryColor }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white [data-theme=clean-light]:text-slate-500 [data-theme=clean-light]:hover:text-slate-900 rounded-full hover:bg-white/10 [data-theme=clean-light]:hover:bg-slate-100 transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 [data-theme=clean-light]:bg-emerald-100 [data-theme=clean-light]:text-emerald-700 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 [data-theme=clean-light]:text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Audit Request Dispatched</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white [data-theme=clean-light]:text-slate-900">
              Your Free SEO Audit is in Motion!
            </h3>

            <p className="text-neutral-300 [data-theme=clean-light]:text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our technical SEO architects are analyzing{' '}
              <span className="font-mono text-emerald-300 [data-theme=clean-light]:text-emerald-700 font-bold">
                {formData.websiteUrl || 'your domain'}
              </span>
              . You will receive a comprehensive Core Web Vitals and keyword ranking opportunity report within 24 hours.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 font-mono">
              <div className="text-neutral-400 [data-theme=clean-light]:text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                Audit Parameters:
              </div>
              <div className="text-neutral-200 [data-theme=clean-light]:text-slate-700">
                • Target: <span className="font-bold">{formData.websiteUrl || 'Provided Domain'}</span>
              </div>
              <div className="text-neutral-200 [data-theme=clean-light]:text-slate-700">
                • Report Recipient: <span className="font-bold">{formData.email}</span>
              </div>
              <div className="text-neutral-200 [data-theme=clean-light]:text-slate-700">
                • WhatsApp Updates: <span className="font-bold">{formData.phone}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Notify Team on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 [data-theme=clean-light]:bg-slate-100 [data-theme=clean-light]:hover:bg-slate-200 text-white [data-theme=clean-light]:text-slate-900 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div>
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 [data-theme=clean-light]:text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" />
                <span>Zero Obligation • 100% Free</span>
              </span>

              {contextBenchmark && (
                <span className="text-[11px] font-mono text-neutral-400 [data-theme=clean-light]:text-slate-500">
                  Based on: {contextBenchmark}
                </span>
              )}
            </div>

            <h2
              id="contact-modal-title"
              className="font-display text-2xl sm:text-3xl font-extrabold text-white [data-theme=clean-light]:text-slate-900 mb-1.5 tracking-tight"
            >
              Request Free SEO Audit
            </h2>

            <p className="text-neutral-300 [data-theme=clean-light]:text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
              Receive a diagnostic report analyzing your Google Search rankings, Core Web Vitals, technical crawl errors, and highest-volume keyword opportunities.
            </p>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 [data-theme=clean-light]:text-red-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-200 [data-theme=clean-light]:text-slate-800 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 [data-theme=clean-light]:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-white [data-theme=clean-light]:text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Website URL */}
                <div>
                  <label className="block text-xs font-bold text-neutral-200 [data-theme=clean-light]:text-slate-800 uppercase tracking-wider mb-1.5">
                    Website URL to Audit *
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-emerald-400 [data-theme=clean-light]:text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-50 border border-emerald-500/30 [data-theme=clean-light]:border-slate-200 text-white [data-theme=clean-light]:text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Work Email */}
                <div>
                  <label className="block text-xs font-bold text-neutral-200 [data-theme=clean-light]:text-slate-800 uppercase tracking-wider mb-1.5">
                    Work Email (For Audit Report) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 [data-theme=clean-light]:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@company.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-white [data-theme=clean-light]:text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-neutral-200 [data-theme=clean-light]:text-slate-800 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 [data-theme=clean-light]:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 97550 61139"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-white [data-theme=clean-light]:text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Pre-filled Message / Specific Focus Area */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-neutral-200 [data-theme=clean-light]:text-slate-800 uppercase tracking-wider">
                    Pre-filled Audit Scope &amp; Message
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400 [data-theme=clean-light]:text-emerald-700">
                    Editable
                  </span>
                </div>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200 text-white [data-theme=clean-light]:text-slate-900 text-xs leading-relaxed focus:outline-none focus:border-emerald-500 transition-colors resize-none font-sans"
                />
              </div>

              {/* Deliverable Guarantees */}
              <div className="p-3 rounded-xl bg-emerald-950/30 [data-theme=clean-light]:bg-emerald-50 border border-emerald-500/25 [data-theme=clean-light]:border-emerald-200 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-emerald-300 [data-theme=clean-light]:text-emerald-800">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>24-Hour Turnaround</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>No Credit Card / No Spam</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full PDF + Action Plan</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl theme-btn-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-[1.01] transition-all disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Dispatching Audit...' : 'Request Free SEO Audit'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-[#25D366]" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
