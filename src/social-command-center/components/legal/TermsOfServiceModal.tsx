import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-[#090f1f] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#070b16]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-display font-extrabold text-slate-900 dark:text-white">
                Terms of Service
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gwalior Web Labs – Social Command Center • Last Updated: November 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing, registering for, or using the <strong>Gwalior Web Labs – Social Command Center</strong> platform, you agree to be legally bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must not use or access the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              2. User Accounts and Multi-Tenant Isolation
            </h3>
            <p>
              Each user account is granted a private, isolated workspace environment governed by database-level Row Level Security (RLS). You are strictly responsible for maintaining the confidentiality of your account credentials, API access tokens, and all activities conducted through your authenticated sessions.
            </p>
            <p>
              Account sharing between unauthorized third parties is prohibited. Each organization or agency team member must maintain dedicated credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              3. Social Network API Compliance & Developer Guidelines
            </h3>
            <p>
              Social Command Center connects to third-party social media networks (including Instagram, Facebook, YouTube, LinkedIn, X, WhatsApp Business, Pinterest, Reddit, and Telegram) exclusively via official Developer APIs and OAuth authentication protocols.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>You agree to comply with all platform-specific terms and community guidelines (e.g., Meta Developer Policies, YouTube Terms of Service, X Developer Agreement).</li>
              <li>You will not use automated publishing tools to distribute spam, abusive, deceptive, fraudulent, or hateful content.</li>
              <li>We do not store plain-text account passwords for third-party social accounts; authentication occurs through tokenized OAuth flows.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              4. Subscription Plans, Billing & Fair Use
            </h3>
            <p>
              Subscription tiers (Free, Starter, Professional, Agency) are billed according to published pricing schedules in Indian Rupees (INR) or US Dollars (USD). Features such as scheduling limits, AI generation tokens, and workspace counts are governed by plan quotas.
            </p>
            <p>
              Paid subscriptions can be canceled at any time from your account settings. Subscriptions remain active until the conclusion of the paid billing cycle.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              5. Intellectual Property & Brand Ownership
            </h3>
            <p>
              All trademarks, service marks, platform architecture, and proprietary algorithms are the property of <strong>Gwalior Web Labs</strong>. Users retain full and exclusive ownership over all content, copy, graphics, and video media uploaded to the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              6. Limitation of Liability & Service Availability
            </h3>
            <p>
              While we strive for 99.9% uptime, Gwalior Web Labs is not liable for indirect, incidental, or third-party damages resulting from network interruptions, social network API outages, or rate limits imposed by external platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              7. Governing Law & Jurisdiction
            </h3>
            <p>
              These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Gwalior, Madhya Pradesh.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070b16] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Official Legal Terms • Gwalior Web Labs</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
