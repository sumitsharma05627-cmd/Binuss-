import React from 'react';
import { X, Lock, ShieldCheck, EyeOff, Database, Mail } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-display font-extrabold text-slate-900 dark:text-white">
                Privacy Policy & Data Security
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gwalior Web Labs – Social Command Center • GDPR & DPDP Compliant • Last Updated: November 2026
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
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              1. Our Data Privacy Commitment
            </h3>
            <p>
              At <strong>Gwalior Web Labs</strong>, we hold user privacy and data sovereignty as fundamental engineering principles. We never sell, rent, monetize, or trade your personal data, client communications, post schedules, or social credentials to advertisers or data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              2. Information We Collect
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li><strong>Registration Information:</strong> Full name, verified email address, organization type, and secure cryptographic password hashes.</li>
              <li><strong>OAuth Tokens & Account Identifiers:</strong> Scoped access tokens and refresh tokens received during official OAuth handshakes with Meta, LinkedIn, Google, X, etc.</li>
              <li><strong>Content Broadcast Data:</strong> Scheduled text, post media attachments, publication timestamps, and response queues.</li>
              <li><strong>Aggregated Analytical Metrics:</strong> Cross-channel impressions, reach, engagements, and click-through counts retrieved directly via authorized platform APIs.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              3. Encryption & Row-Level Security (RLS)
            </h3>
            <p>
              All communication with our servers is encrypted in transit via Transport Layer Security (TLS 1.3). Sensitive credentials and OAuth refresh tokens are encrypted at rest using AES-256-GCM.
            </p>
            <p>
              Our database implements strict tenant isolation via Row Level Security (RLS). A user session is cryptographically bound to their tenant workspace ID, rendering cross-tenant data leakage mathematically impossible.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-500" />
              4. Social Network API Compliance
            </h3>
            <p>
              Our platform strictly adheres to the developer policies of all integrated platforms:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li><strong>Google API Services User Data Policy:</strong> YouTube API data usage adheres to Google Limited Use requirements.</li>
              <li><strong>Meta Platform Terms:</strong> Instagram Graph API and Facebook Pages data are accessed solely to fulfill user-requested scheduling and inbox synchronizations.</li>
              <li><strong>LinkedIn API Terms:</strong> Profile and page posting privileges are revoked immediately upon user disconnection.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-500" />
              5. Data Retention, Right to Deletion & Contact
            </h3>
            <p>
              You maintain the absolute right to export or permanently purge all your stored data, posts, and social tokens. Disconnecting any social channel will immediately delete the corresponding OAuth tokens from our persistent database.
            </p>
            <p>
              For privacy audits or data deletion requests, contact our Data Protection Team at <strong>privacy@commandcenter.local</strong> or submit a ticket through the in-app Help Desk.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070b16] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted & Privacy Protected • Gwalior Web Labs</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
          >
            Close Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};
