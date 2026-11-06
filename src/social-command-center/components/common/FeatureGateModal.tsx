import React from 'react';
import { 
  Lock, 
  X, 
  Zap, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { useSocialCommand } from '../../context/SocialCommandContext';

export interface FeatureGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureTitle?: string;
  featureDescription?: string;
  recommendedPlanId?: 'starter' | 'professional' | 'agency';
  currentUsageSnippet?: string;
}

export const FeatureGateModal: React.FC<FeatureGateModalProps> = ({
  isOpen,
  onClose,
  featureTitle = 'Premium Feature Locked',
  featureDescription = 'Upgrade your subscription tier to unlock unlimited publishing, advanced analytics, AI content generation, and multi-client workspaces.',
  recommendedPlanId = 'professional',
  currentUsageSnippet
}) => {
  const { subscriptionPlans, setActiveSection } = useSocialCommand();

  if (!isOpen) return null;

  const handleGoToPricing = () => {
    onClose();
    setActiveSection('subscriptions');
  };

  const recommendedPlan = subscriptionPlans.find((p) => p.planId === recommendedPlanId) || subscriptionPlans[2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
              Subscription Plan Limit
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{featureTitle}</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-lg">{featureDescription}</p>
          </div>
        </div>

        {/* Current Usage Banner if provided */}
        {currentUsageSnippet && (
          <div className="mb-6 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Current Usage:</span>
            </div>
            <span className="font-semibold text-white">{currentUsageSnippet}</span>
          </div>
        )}

        {/* Recommended Upgrade Highlight */}
        {recommendedPlan && (
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-cyan-500/40 rounded-2xl p-5 mb-6 relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              Recommended Tier
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <h4 className="text-lg font-bold text-white">{recommendedPlan.name}</h4>
              <span className="text-xl font-black text-cyan-400">
                ₹{recommendedPlan.monthlyPrice.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 mb-4">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Up to {recommendedPlan.maxClients} Client Workspaces</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{recommendedPlan.maxConnectedAccounts} Connected Social Channels</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{recommendedPlan.maxScheduledPostsPerMonth} Posts Scheduled / month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{recommendedPlan.aiQueriesLimitPerMonth} GW Labs AI Content Credits</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400">
              Instant activation with Razorpay (UPI, Credit/Debit Cards, Net Banking). Verified server-side.
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
          >
            Stay on Current Plan
          </button>
          <button
            onClick={handleGoToPricing}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>View All Plans &amp; Upgrade</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
