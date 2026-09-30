import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Clock, MessageSquare, Phone, Mail } from 'lucide-react';
import { PricingPlan } from '../data/pricing';
import { useLanguage } from '../context/LanguageContext';

interface PlanOnboardingModalProps {
  plan: PricingPlan | null;
  onClose: () => void;
  onSubmitOnboarding: (data: {
    planName: string;
    businessName: string;
    contactName: string;
    phoneOrWhatsApp: string;
    email: string;
    notes: string;
  }) => void;
}

export const PlanOnboardingModal: React.FC<PlanOnboardingModalProps> = ({
  plan,
  onClose,
  onSubmitOnboarding
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phoneOrWhatsApp: '',
    email: '',
    notes: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useLanguage();

  if (!plan) return null;

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.phoneOrWhatsApp) {
      setErrorMsg(t.modal.validationError);
      return;
    }

    onSubmitOnboarding({
      planName: plan.name,
      ...formData
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        className="relative w-full max-w-xl bg-[#0a0f1e] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_16px_50px_rgba(0,0,0,0.8)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          /* Step 1: Confirmation & Plan Overview */
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.modal.greatChoice}</span>
            </div>

            <h2 id="onboarding-modal-title" className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {t.modal.selectedPrefix} {plan.name} {t.modal.selectedSuffix}
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              {plan.tagline}
            </p>

            {/* Price & Turnaround block */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">{t.modal.startingInvestment}</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  {plan.startingPrice}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">{t.modal.estimatedTimeline}</span>
                <div className="text-sm font-mono text-white flex items-center gap-1.5 justify-end mt-0.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{plan.deliveryTime}</span>
                </div>
              </div>
            </div>

            {/* Key Deliverables preview */}
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">
                {t.modal.includedLabel}:
              </div>
              <ul className="space-y-2">
                {plan.features.slice(0, 5).map((f) => (
                  <li key={f} className="text-xs text-neutral-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
                {plan.features.length > 5 && (
                  <li className="text-xs text-emerald-400 font-medium pl-5">
                    + {plan.features.length - 5} {t.modal.moreFeatures}
                  </li>
                )}
              </ul>
            </div>

            {/* Next Step Expectations */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-neutral-300 mb-6 space-y-1">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.modal.nextStepTitle}</span>
              </div>
              <p className="text-neutral-400">
                {t.modal.nextStepDesc}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wide theme-btn-primary shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.modal.continueBtn} {plan.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Step 2: Contact & Project Details */
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">{t.modal.step2Of2}</span>
              <h2 className="font-display text-2xl font-extrabold text-white mt-1">
                {t.modal.step2Headline}
              </h2>
              <p className="text-neutral-400 text-xs mt-1">
                Selected Plan: <strong className="text-emerald-400">{plan.name} ({plan.startingPrice})</strong>
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs mb-4">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  {t.modal.fullName} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.fullNamePlaceholder}
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  {t.modal.businessBrand}
                </label>
                <input
                  type="text"
                  placeholder={t.modal.businessBrandPlaceholder}
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-400 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t.modal.phoneWhatsapp} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t.modal.phoneWhatsappPlaceholder}
                    value={formData.phoneOrWhatsApp}
                    onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {t.modal.emailAddress}
                  </label>
                  <input
                    type="email"
                    placeholder={t.modal.emailAddressPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  {t.modal.goalsNotes}
                </label>
                <textarea
                  rows={2}
                  placeholder={t.modal.goalsNotesPlaceholder}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-400 text-sm resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-full text-xs font-semibold text-neutral-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
              >
                {t.modal.backBtn}
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-full font-bold text-sm tracking-wide theme-btn-primary shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.modal.submitInquiryBtn} {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-[11px] text-neutral-400 mt-3">
              {t.modal.privacyNote}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
