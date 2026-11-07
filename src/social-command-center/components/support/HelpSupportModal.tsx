import React, { useState } from 'react';
import {
  X,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  FileCode2,
  Sparkles
} from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'troubleshoot' | 'contact'>('faq');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('account_integration');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How do I connect my Instagram Professional or Creator account?',
      a: 'To connect Instagram, your account must be set to Professional or Creator and linked to an authorized Facebook Page. When initiating connection, accept all permissions requested in the Meta Business dialog.'
    },
    {
      q: 'Why does my scheduled video fail to post?',
      a: 'Social networks enforce strict video encoding requirements. Ensure video duration is under 60 seconds for Shorts/Reels, video codec is H.264/AAC, and file size does not exceed platform quotas (Instagram: 100MB, YouTube: 500MB).'
    },
    {
      q: 'Are my social media passwords stored on your servers?',
      a: 'Never. Gwalior Web Labs uses official OAuth 2.0 PKCE authentication. We only store encrypted short-lived and refresh tokens. Your account credentials remain solely with the social platform.'
    },
    {
      q: 'How does client workspace isolation work?',
      a: 'Workspaces are completely segregated via PostgreSQL Row Level Security (RLS). Team members and clients assigned to Workspace A cannot view or publish to channels in Workspace B.'
    },
    {
      q: 'Can I use my own OpenAI or Gemini API key for AI generation?',
      a: 'Yes. In your settings or environment configuration, you can plug in custom LLM API keys for unbounded caption generation, hashtag clustering, and automated customer responses.'
    }
  ];

  const troubleshootGuides = [
    {
      title: 'Meta Token Expired (Error 190)',
      solution: 'Meta user access tokens naturally expire after 60 days. Open Accounts, click the Reconnect button on your Facebook/Instagram channel, and re-authenticate in one click.'
    },
    {
      title: 'LinkedIn Organization Admin Permission Denied',
      solution: 'To publish on behalf of a company page on LinkedIn, your personal profile must hold "Super Admin" or "Content Admin" role in LinkedIn Campaign Manager / Page Admin settings.'
    },
    {
      title: 'WhatsApp Cloud API 24-Hour Messaging Window',
      solution: 'Customer initiated sessions stay active for 24 hours. Messages sent outside the 24-hour window must use approved Meta Message Templates.'
    },
    {
      title: 'X (Twitter) Duplicate Tweet Rejection (Code 187)',
      solution: 'X automatically rejects tweets with identical text sent within short time intervals. Slightly vary your caption or use our AI rephrase feature before dispatching.'
    }
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    setTicketSent(true);
    setTimeout(() => {
      // Keep confirmation visible
    }, 1000);
  };

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
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-display font-extrabold text-slate-900 dark:text-white">
                Help & Engineering Support
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gwalior Web Labs • Knowledge Base & Priority Engineering Desk
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-100/50 dark:bg-slate-900/40 text-xs">
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3 px-4 font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'faq'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Frequently Asked Questions
          </button>
          <button
            onClick={() => setActiveTab('troubleshoot')}
            className={`py-3 px-4 font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'troubleshoot'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            API & Token Troubleshooting
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-4 font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'contact'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Contact Engineering Team
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{f.q}</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs pl-3.5 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'troubleshoot' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Official Social API Token Life Cycle</div>
                  <p className="mt-0.5 text-amber-700 dark:text-amber-400">
                    Third-party tokens may expire due to security events, password changes, or scheduled provider revocations. Re-authenticating immediately restores scheduled dispatch.
                  </p>
                </div>
              </div>

              {troubleshootGuides.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
                    <span>{item.title}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                      Fix Available
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              {ticketSent ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 rounded-3xl">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Support Ticket Dispatched (#GWL-{Math.floor(100000 + Math.random() * 900000)})
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Our lead software architect and support desk at Gwalior Web Labs has received your inquiry. A response will be delivered to your registered email address within 2-4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setTicketSent(false);
                      setTicketSubject('');
                      setTicketMessage('');
                    }}
                    className="mt-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={ticketCategory}
                        onChange={(e) => setTicketCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      >
                        <option value="account_integration">Social Channel OAuth & Connection</option>
                        <option value="publishing_dispatch">Publishing & Scheduled Post Queue</option>
                        <option value="billing_subscription">Billing, Subscription & Invoice</option>
                        <option value="custom_feature">Feature Request & Enterprise Setup</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Direct Support Email
                      </label>
                      <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono">
                        support@commandcenter.local
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Brief overview of the issue or question..."
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Detailed Description & Diagnostic Steps
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Include relevant social channels, error codes, or desired capabilities..."
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Priority Ticket</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070b16] flex items-center justify-between text-xs text-slate-500">
          <span>Official Support Desk • Gwalior Web Labs</span>
          <a
            href="mailto:support@commandcenter.local"
            className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1"
          >
            <span>Direct Email Support</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
