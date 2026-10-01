import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { ContactFormData } from '../types';
import { Success2D } from './2d/Success2D';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface ContactProps {
  initialService?: string;
  initialMessage?: string;
}

const SERVICE_OPTIONS = [
  'Website',
  'SEO & Google Search',
  'Google Ads & PPC',
  'Social Media Marketing',
  'Branding & Logo',
  'Lead Generation & CRM',
  'Creator Collaboration (Drop / UGC / Rev-Share)',
  'Creator Co-Launch & Digital Store Kit',
  'Launchpad Plan (₹5,000 – ₹14,999)',
  'Starter Plan (₹14,999)',
  'Business Plan (₹29,999)',
  'Growth Plan (₹54,999)',
  'Custom Enterprise Scope'
];

const BUDGET_RANGES = [
  '₹5,000 – ₹14,999',
  '₹15,000 – ₹29,999',
  '₹30,000 – ₹60,000',
  '₹60,000 – ₹1,20,000',
  '₹1,20,000+'
];

export const Contact: React.FC<ContactProps> = ({ initialService, initialMessage }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    serviceRequired: initialService || 'Website',
    budgetRange: '₹14,999 – ₹29,999',
    message: initialMessage || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { ref, stage } = useSectionSequence('contact');
  const { t } = useLanguage();

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, serviceRequired: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.businessName.trim()) {
      setErrorMessage(t.contact.validationError);
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable project dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      businessName: '',
      email: '',
      phone: '',
      serviceRequired: 'Website',
      budgetRange: '₹14,999 – ₹29,999',
      message: ''
    });
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      aria-label="Contact GWL Weblab"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Context with Synchronized Sequence */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-badge text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.contact.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
            >
              {t.contact.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-300 text-base sm:text-lg mb-8 leading-relaxed"
            >
              {t.contact.subtitle}
            </motion.p>

            {/* Quick Contact Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 mb-6"
            >
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Direct Inquiries</div>
                  <a href="mailto:hello@gwlweblab.com" className="text-white hover:text-emerald-400 transition-colors font-medium">
                    hello@gwlweblab.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <div className="p-2 rounded-lg bg-[#25D366]/15 text-[#25D366]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">WhatsApp / Direct Call</div>
                  <a
                    href="https://wa.me/919755061139?text=Hello%20GWL%20Weblab%2C%20I%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 transition-colors font-medium inline-flex items-center gap-1.5"
                  >
                    <span>+91 97550 61139</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#25D366]/20 text-[#25D366] font-mono font-semibold">Active</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Response Protocol</div>
                  <div className="text-white font-medium">Within 24 Business Hours</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Consultation Strategy</div>
                  <div className="text-white font-medium">Zero-Obligation Growth Diagnostic</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form or 3D Confirmation Animation */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
              {isSubmitted ? (
                <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-300">
                  {/* Polished 2D Confirmation Animation */}
                  <div className="mb-4">
                    <Success2D />
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    {t.contact.transmissionReceived}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    {t.contact.thankYou}, {formData.name}.
                  </h3>

                  <p className="text-neutral-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                    {t.contact.confirmationMsg}
                  </p>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                  >
                    {t.contact.submitAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        {t.contact.nameLabel} <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.contact.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                      />
                    </div>

                    {/* Business Name */}
                    <div>
                      <label htmlFor="contact-business" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        {t.contact.businessLabel} <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-business"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder={t.contact.businessPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        {t.contact.emailLabel} <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        {t.contact.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.contact.phonePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Service Required */}
                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        {t.contact.serviceLabel}
                      </label>
                      <select
                        id="contact-service"
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0f1d] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all cursor-pointer"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        {t.contact.budgetLabel}
                      </label>
                      <select
                        id="contact-budget"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0f1d] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all cursor-pointer"
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold theme-btn-primary transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin"></span>
                        {t.contact.submitting}
                      </span>
                    ) : (
                      <>
                        <span>{t.contact.submitBtn}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
