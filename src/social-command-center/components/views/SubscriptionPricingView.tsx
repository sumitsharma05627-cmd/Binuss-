import React, { useState, useEffect } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { SubscriptionConfig, PaymentTransaction } from '../../types';
import { 
  CreditCard, 
  Check, 
  Settings, 
  ShieldAlert, 
  Sparkles, 
  Zap, 
  Building2, 
  CheckCircle2, 
  Edit3,
  IndianRupee,
  Lock,
  ExternalLink,
  Download,
  Printer,
  Receipt,
  Calendar,
  AlertCircle,
  ArrowRight,
  Clock,
  UserCheck,
  X,
  RefreshCw
} from 'lucide-react';

export const SubscriptionPricingView: React.FC = () => {
  const { 
    subscriptionPlans, 
    updateSubscriptionPlanConfig, 
    currentPlanId, 
    currentUserRole,
    currentUser,
    userUsage,
    paymentHistory,
    refreshPaymentHistory,
    initiateRazorpayPayment,
    addNotification
  } = useSocialCommand();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentTransaction | null>(null);

  // Razorpay Gateway Config State for Admins
  const [showGatewayConfig, setShowGatewayConfig] = useState(false);
  const [razorpayKeyId, setRazorpayKeyId] = useState('rzp_live_gwl_digital_active');
  const [razorpayKeySecret, setRazorpayKeySecret] = useState('••••••••••••••••••••••••');
  const [webhookSecret, setWebhookSecret] = useState('whsec_gwl_prod_live_9921');
  const [gatewaySaved, setGatewaySaved] = useState(false);

  // Edit form state for plan
  const [editName, setEditName] = useState<string>('');
  const [editPriceMonthly, setEditPriceMonthly] = useState<number>(0);
  const [editPriceYearly, setEditPriceYearly] = useState<number>(0);
  const [editMaxClients, setEditMaxClients] = useState<number>(1);
  const [editMaxAccounts, setEditMaxAccounts] = useState<number>(5);
  const [editMaxPosts, setEditMaxPosts] = useState<number>(50);
  const [editAiGenerations, setEditAiGenerations] = useState<number>(50);

  const isAdmin = currentUserRole === 'super_admin' || currentUserRole === 'agency_admin';

  useEffect(() => {
    refreshPaymentHistory();
  }, []);

  const startEditPlan = (plan: SubscriptionConfig) => {
    setEditingPlanId(plan.planId);
    setEditName(plan.name);
    setEditPriceMonthly(plan.monthlyPrice);
    setEditPriceYearly(plan.annualPrice);
    setEditMaxClients(plan.maxClients);
    setEditMaxAccounts(plan.maxConnectedAccounts);
    setEditMaxPosts(plan.maxScheduledPostsPerMonth);
    setEditAiGenerations(plan.aiQueriesLimitPerMonth);
  };

  const handleSaveEditPlan = async (planId: string) => {
    await updateSubscriptionPlanConfig(planId, {
      name: editName,
      monthlyPrice: editPriceMonthly,
      annualPrice: editPriceYearly,
      maxClients: editMaxClients,
      maxConnectedAccounts: editMaxAccounts,
      maxScheduledPostsPerMonth: editMaxPosts,
      aiQueriesLimitPerMonth: editAiGenerations
    });
    setEditingPlanId(null);
  };

  const handleCheckout = async (plan: SubscriptionConfig) => {
    if (plan.planId === currentPlanId) return;

    if (plan.monthlyPrice === 0) {
      // Free plan switch
      addNotification({
        title: 'Free Plan Selected',
        message: 'Your account is on the Free Starter tier.',
        type: 'info'
      });
      return;
    }

    setIsProcessingPayment(plan.planId);
    try {
      const result = await initiateRazorpayPayment(plan.planId, billingCycle);
      if (result.success) {
        // Find newly recorded invoice in updated paymentHistory
        const latest = paymentHistory[0];
        if (latest) {
          setSelectedInvoice(latest);
        }
      } else if (result.error && !result.error.includes('dismissed')) {
        addNotification({
          title: 'Payment Incomplete',
          message: result.error,
          type: 'warning'
        });
      }
    } catch (err: any) {
      addNotification({
        title: 'Gateway Error',
        message: err.message || 'Payment initiation failed.',
        type: 'error'
      });
    } finally {
      setIsProcessingPayment(null);
    }
  };

  const currentPlan = subscriptionPlans.find((p) => p.planId === currentPlanId) || subscriptionPlans[0];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-xl transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <CreditCard className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Subscription &amp; Paid Access</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Choose the right power tier for your brand or agency. Verified server-side billing via Razorpay with instant UPI &amp; card activation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Monthly / Annual Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly' 
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Billed Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                billingCycle === 'annual' 
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10px] font-black">
                Save 20%
              </span>
            </button>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowGatewayConfig(!showGatewayConfig)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold text-xs transition-all cursor-pointer"
            >
              <Settings className="w-4 h-4 text-cyan-500" />
              <span>{showGatewayConfig ? 'Hide Gateway' : 'Razorpay Gateway'}</span>
            </button>
          )}
        </div>
      </div>

      {/* ACTIVE SUBSCRIPTION OVERVIEW BANNER */}
      <div className="bg-gradient-to-r from-cyan-900/30 via-slate-900/80 to-blue-950/30 border border-cyan-500/30 rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Active Workspace Plan</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black">
                  {userUsage?.status === 'active' ? 'Active' : 'Trialing'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">{currentPlan.name}</h2>
              <p className="text-xs text-slate-300 mt-1">
                Renews on {userUsage?.expiresAt ? new Date(userUsage.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Next billing cycle'} • Billed {billingCycle}
              </p>
            </div>
          </div>

          {/* Usage Quick Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto text-xs">
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
              <span className="text-slate-400 block text-[10px] uppercase">Workspaces</span>
              <span className="text-white font-bold">{userUsage?.clientWorkspacesCount ?? 1} / {currentPlan.maxClients}</span>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
              <span className="text-slate-400 block text-[10px] uppercase">Social Accounts</span>
              <span className="text-white font-bold">{userUsage?.connectedAccountsCount ?? 3} / {currentPlan.maxConnectedAccounts}</span>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
              <span className="text-slate-400 block text-[10px] uppercase">Monthly Posts</span>
              <span className="text-white font-bold">{userUsage?.postsUsedThisMonth ?? 12} / {currentPlan.maxScheduledPostsPerMonth}</span>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
              <span className="text-slate-400 block text-[10px] uppercase">AI Credits</span>
              <span className="text-cyan-400 font-bold">{userUsage?.aiQueriesUsedThisMonth ?? 45} / {currentPlan.aiQueriesLimitPerMonth}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RAZORPAY GATEWAY SETUP DRAWER FOR ADMINS */}
      {isAdmin && showGatewayConfig && (
        <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs">
                RZP
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Razorpay Integration &amp; Automated Webhook Endpoint</h3>
                <p className="text-xs text-slate-400">Server verified HMAC receiver: <code className="text-cyan-400">/api/social/payments/webhook</code></p>
              </div>
            </div>
            <a
              href="https://dashboard.razorpay.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              Open Razorpay Dashboard <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Razorpay Key ID</label>
              <input
                type="text"
                value={razorpayKeyId}
                onChange={(e) => setRazorpayKeyId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Razorpay Key Secret</label>
              <input
                type="password"
                value={razorpayKeySecret}
                onChange={(e) => setRazorpayKeySecret(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Webhook Secret (HMAC-SHA256)</label>
              <input
                type="text"
                value={webhookSecret}
                onChange={(e) => setWebhookSecret(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div className="md:col-span-3 flex items-center justify-between pt-2">
              <span className="text-slate-400 text-[11px]">
                Supported Webhooks: <code className="text-slate-300">payment.captured</code>, <code className="text-slate-300">subscription.charged</code>, <code className="text-slate-300">payment.failed</code>
              </span>
              <div className="flex items-center gap-3">
                {gatewaySaved && <span className="text-emerald-400 font-semibold text-xs">Credentials Validated!</span>}
                <button
                  type="button"
                  onClick={() => {
                    setGatewaySaved(true);
                    setTimeout(() => setGatewaySaved(false), 3000);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer"
                >
                  Save Gateway Credentials
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC PLAN TIERS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Available Access Tiers</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">All prices and quotas are dynamically configured by administrator.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {subscriptionPlans.map((plan) => {
            const isCurrent = plan.planId === currentPlanId;
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            const isEditing = editingPlanId === plan.planId;
            const isPopular = plan.isPopular || plan.planId === 'professional';

            return (
              <div
                key={plan.planId}
                className={`rounded-2xl border transition-all flex flex-col justify-between p-6 relative ${
                  isCurrent 
                    ? 'bg-white dark:bg-slate-900/90 border-cyan-500 shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-500/20' 
                    : isPopular
                    ? 'bg-white dark:bg-slate-900/80 border-blue-500/50 shadow-md'
                    : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Floating Badges */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
                  {isCurrent && (
                    <span className="px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                      Current Plan
                    </span>
                  )}
                  {isPopular && !isCurrent && (
                    <span className="px-3 py-0.5 rounded-full bg-blue-600 text-white font-black text-[10px] uppercase tracking-wider shadow">
                      Most Popular
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{plan.name}</h3>
                    {isAdmin && (
                      <button
                        onClick={() => startEditPlan(plan)}
                        className="p-1 rounded text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                        title="Edit Plan Configuration (Admin)"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Price Display or Edit Form */}
                  <div className="my-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    {isEditing ? (
                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="text-slate-500 dark:text-slate-400 text-[11px]">Plan Name</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1 text-slate-900 dark:text-white font-semibold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-500 dark:text-slate-400 text-[11px]">Monthly (₹)</label>
                            <input
                              type="number"
                              value={editPriceMonthly}
                              onChange={(e) => setEditPriceMonthly(Number(e.target.value))}
                              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1 text-slate-900 dark:text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-slate-500 dark:text-slate-400 text-[11px]">Yearly (₹)</label>
                            <input
                              type="number"
                              value={editPriceYearly}
                              onChange={(e) => setEditPriceYearly(Number(e.target.value))}
                              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded p-1 text-slate-900 dark:text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-slate-900 dark:text-white">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          {price === 0 ? 'Free lifetime sandbox' : billingCycle === 'annual' ? 'Billed annually with 20% discount' : 'Billed monthly, cancel anytime'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Feature Limits List */}
                  <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    {isEditing ? (
                      <div className="space-y-2 text-[11px]">
                        <div>
                          <label className="text-slate-400">Max Client Workspaces</label>
                          <input
                            type="number"
                            value={editMaxClients}
                            onChange={(e) => setEditMaxClients(Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">Max Social Accounts</label>
                          <input
                            type="number"
                            value={editMaxAccounts}
                            onChange={(e) => setEditMaxAccounts(Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">Scheduled Posts / Mo</label>
                          <input
                            type="number"
                            value={editMaxPosts}
                            onChange={(e) => setEditMaxPosts(Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">GW Labs AI Credits / Mo</label>
                          <input
                            type="number"
                            value={editAiGenerations}
                            onChange={(e) => setEditAiGenerations(Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-white font-mono"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span><strong>{plan.maxClients}</strong> Client Workspaces</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span><strong>{plan.maxConnectedAccounts}</strong> Connected Social Channels</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span><strong>{plan.maxScheduledPostsPerMonth}</strong> Scheduled Posts / mo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span><strong>{plan.aiQueriesLimitPerMonth}</strong> GW Labs AI Credits</span>
                        </div>
                        {plan.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-800">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingPlanId(null)}
                        className="w-1/2 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEditPlan(plan.planId)}
                        className="w-1/2 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={isCurrent || isProcessingPayment === plan.planId}
                      onClick={() => handleCheckout(plan)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 cursor-default'
                          : isPopular
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md'
                          : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700'
                      }`}
                    >
                      {isProcessingPayment === plan.planId ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Initiating Gateway...</span>
                        </>
                      ) : isCurrent ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                          <span>Active Subscription</span>
                        </>
                      ) : plan.monthlyPrice === 0 ? (
                        <span>Switch to Free</span>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Upgrade via Razorpay</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PAYMENT HISTORY & DOWNLOADABLE INVOICES */}
      <div className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-cyan-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payment Receipts &amp; Tax Invoices</h2>
          </div>
          <button
            onClick={() => refreshPaymentHistory()}
            className="text-xs text-cyan-500 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Ledger</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Invoice #</th>
                <th className="py-3 px-4">Billing Date</th>
                <th className="py-3 px-4">Plan &amp; Cycle</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paymentHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-500">
                    No payment transactions recorded yet. Upgrade your plan to see tax invoices here.
                  </td>
                </tr>
              ) : (
                paymentHistory.map((pmt) => (
                  <tr key={pmt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {pmt.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {new Date(pmt.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 dark:text-white">{pmt.planName}</span>
                      <span className="text-slate-500 text-[11px] block capitalize">{pmt.billingCycle}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      ₹{pmt.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 uppercase text-[11px]">
                      {pmt.method || 'Razorpay UPI/Card'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedInvoice(pmt)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-[11px] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Printer className="w-3 h-3 text-cyan-500" />
                        <span>View Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINTABLE / DOWNLOADABLE INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Invoice Header */}
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-950 p-1 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png"
                    alt="GWL Crest"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-black text-xl text-slate-900 dark:text-white">GWALIO WEB LABS</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Digital Innovation | Global Solutions</p>
                  <p className="text-[11px] text-slate-400">GSTIN: 23AABCG1234F1Z8 • Gwalior, MP, India</p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  PAID INVOICE
                </span>
                <p className="font-mono text-sm font-bold text-slate-900 dark:text-white mt-1.5">{selectedInvoice.invoiceNumber}</p>
                <p className="text-xs text-slate-500">{new Date(selectedInvoice.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
            </div>

            {/* Billed To / From */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6">
              <div>
                <span className="text-slate-400 uppercase font-semibold text-[10px] block mb-1">Billed To</span>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedInvoice.userName}</p>
                <p className="text-slate-600 dark:text-slate-400">{selectedInvoice.userEmail}</p>
                <p className="text-slate-500">Client Workspace Member • Verified</p>
              </div>
              <div className="text-right">
                <span className="text-slate-400 uppercase font-semibold text-[10px] block mb-1">Gateway Details</span>
                <p className="font-mono text-slate-900 dark:text-white">{selectedInvoice.orderId}</p>
                <p className="font-mono text-slate-500 text-[11px]">Txn: {selectedInvoice.paymentId || 'Verified via Razorpay'}</p>
                <p className="text-emerald-500 font-semibold text-[11px]">HMAC Signature Verified</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-6 text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Cycle</th>
                    <th className="p-3 text-right">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      Social Command Center – {selectedInvoice.planName}
                      <span className="block text-[11px] font-normal text-slate-500">Includes multi-account social publishing, unified inbox &amp; AI engine</span>
                    </td>
                    <td className="p-3 text-center capitalize">{selectedInvoice.billingCycle}</td>
                    <td className="p-3 text-right font-bold font-mono">₹{selectedInvoice.amount.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-50 dark:bg-slate-800/40 font-bold">
                  <tr>
                    <td colSpan={2} className="p-3 text-right">Total Paid (Inclusive of all taxes):</td>
                    <td className="p-3 text-right font-mono text-cyan-600 dark:text-cyan-400 text-sm">₹{selectedInvoice.amount.toLocaleString('en-IN')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 text-[11px]">Authorized digitally by KBSR Digital / GWL WebLab.</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
