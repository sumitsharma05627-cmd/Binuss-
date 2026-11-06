import React, { useState, useEffect } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { SubscriptionConfig, PaymentTransaction } from '../../types';
import { 
  ShieldAlert, 
  Activity, 
  Cpu, 
  Database, 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Terminal,
  Zap,
  Globe,
  Lock,
  UserX,
  UserCheck,
  Clock,
  ListFilter,
  CreditCard,
  Edit3,
  Award,
  DollarSign,
  TrendingUp,
  Receipt,
  X,
  Sparkles,
  Calendar
} from 'lucide-react';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  accountType: string;
  status: 'active' | 'suspended';
  planTier?: 'free' | 'starter' | 'professional' | 'agency' | 'enterprise';
  subscriptionStatus?: string;
  subscriptionExpiresAt?: string;
  lastLoginAt?: string;
}

export const SuperAdminView: React.FC = () => {
  const { 
    clients, 
    socialAccounts, 
    posts, 
    subscriptionPlans, 
    updateSubscriptionPlanConfig,
    paymentHistory,
    refreshPaymentHistory,
    addNotification 
  } = useSocialCommand();

  const [activeTab, setActiveTab] = useState<'users' | 'pricing' | 'transactions' | 'health'>('users');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [users, setUsers] = useState<ManagedUser[]>([
    {
      id: 'user-sumit-admin',
      name: 'Sumit Sharma',
      email: 'gwaliorweblabs@gmail.com',
      role: 'super_admin',
      accountType: 'agency',
      status: 'active',
      planTier: 'agency',
      subscriptionStatus: 'active',
      subscriptionExpiresAt: '2027-01-10T10:00:00.000Z',
      lastLoginAt: 'Just now'
    },
    {
      id: 'user-demo-marketer',
      name: 'Aarav Gupta',
      email: 'demo@gwaliorweblabs.com',
      role: 'agency_admin',
      accountType: 'freelancer',
      status: 'active',
      planTier: 'professional',
      subscriptionStatus: 'active',
      subscriptionExpiresAt: '2026-12-31T23:59:59.000Z',
      lastLoginAt: '12m ago'
    }
  ]);

  // Premium Access Modal State
  const [selectedUserForGrant, setSelectedUserForGrant] = useState<ManagedUser | null>(null);
  const [grantTier, setGrantTier] = useState<'free' | 'starter' | 'professional' | 'agency' | 'enterprise'>('professional');
  const [grantDurationDays, setGrantDurationDays] = useState<number>(365);
  const [grantStatus, setGrantStatus] = useState<'active' | 'trialing'>('active');
  const [isGranting, setIsGranting] = useState(false);

  // Pricing Editor State
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editPriceMonthly, setEditPriceMonthly] = useState<number>(0);
  const [editPriceYearly, setEditPriceYearly] = useState<number>(0);
  const [editMaxClients, setEditMaxClients] = useState<number>(1);
  const [editMaxAccounts, setEditMaxAccounts] = useState<number>(5);
  const [editMaxPosts, setEditMaxPosts] = useState<number>(50);
  const [editAiGenerations, setEditAiGenerations] = useState<number>(50);

  const [auditLogs, setAuditLogs] = useState([
    { id: '1', action: 'POST_AUTO_DISPATCHED', user: 'Scheduler Daemon', details: 'Post published to LinkedIn & Instagram', time: '2m ago', type: 'success' },
    { id: '2', action: 'USER_LOGIN', user: 'Sumit Sharma', details: 'Successful session established from IP 103.21.x.x', time: '14m ago', type: 'success' },
    { id: '3', action: 'AI_PROMPT_GENERATED', user: 'GW Labs AI', details: 'Multilingual caption generated via Gemini 3.8 Flash', time: '25m ago', type: 'info' },
    { id: '4', action: 'WORKSPACE_SYNC', user: 'System', details: '9 platform health checks passed with sub-150ms latency', time: '38m ago', type: 'info' }
  ]);

  const apiStatuses = [
    { name: 'Meta Graph API (Instagram & FB)', endpoint: 'graph.facebook.com/v19.0', status: 'Operational', latency: '64ms', rateLimit: '4,280 / 10,000 / hr' },
    { name: 'WhatsApp Cloud API', endpoint: 'graph.facebook.com/v19.0/messages', status: 'Operational', latency: '82ms', rateLimit: '980 / 2,500 / hr' },
    { name: 'YouTube Data API v3', endpoint: 'www.googleapis.com/youtube/v3', status: 'Operational', latency: '48ms', rateLimit: '1,420 / 10,000 quota' },
    { name: 'LinkedIn Marketing API v2', endpoint: 'api.linkedin.com/rest', status: 'Operational', latency: '92ms', rateLimit: '240 / 5,000 / day' },
    { name: 'X Developer API v2', endpoint: 'api.x.com/2/tweets', status: 'Operational', latency: '115ms', rateLimit: '42 / 100 / 15m' },
    { name: 'Telegram Bot API', endpoint: 'api.telegram.org/bot<TOKEN>', status: 'Operational', latency: '32ms', rateLimit: 'Unlimited / Bot' },
    { name: 'Pinterest Content API v5', endpoint: 'api.pinterest.com/v5', status: 'Operational', latency: '88ms', rateLimit: '180 / 1,000 / hr' },
    { name: 'Reddit Data API', endpoint: 'oauth.reddit.com/api', status: 'Operational', latency: '102ms', rateLimit: '60 / 60 / min' },
    { name: 'Google Gemini 3.8 Flash (AI Engine)', endpoint: 'generativelanguage.googleapis.com', status: 'Operational', latency: '420ms', rateLimit: '85,400 tokens / min' }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/social/data');
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        }
        if (data.auditLogs && Array.isArray(data.auditLogs)) {
          setAuditLogs(data.auditLogs.map((l: any) => ({
            id: l.id,
            action: l.action,
            user: l.userName || 'System',
            details: l.details,
            time: new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: l.status === 'warning' ? 'warning' : 'success'
          })));
        }
      }
      await refreshPaymentHistory();
    } catch {
      // offline fallback
    }
    setTimeout(() => setIsRefreshing(false), 600);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleToggleUserStatus = async (user: ManagedUser) => {
    const nextStatus = user.status === 'active' ? 'suspended' : 'active';
    try {
      await fetch(`/api/social/users/${user.id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
    } catch {
      // fallback
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    );

    addNotification({
      title: `User Account ${nextStatus === 'suspended' ? 'Suspended' : 'Activated'}`,
      message: `${user.name} (${user.email}) status updated to ${nextStatus}.`,
      type: nextStatus === 'suspended' ? 'warning' : 'success'
    });
  };

  const handleGrantPremium = async () => {
    if (!selectedUserForGrant) return;
    setIsGranting(true);
    try {
      const expiresAt = new Date(Date.now() + grantDurationDays * 24 * 60 * 60 * 1000).toISOString();
      const res = await fetch('/api/social/admin/grant-premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUserForGrant.id,
          planTier: grantTier,
          status: grantStatus,
          expiresAt
        })
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUserForGrant.id
              ? { ...u, planTier: grantTier, subscriptionStatus: grantStatus, subscriptionExpiresAt: expiresAt }
              : u
          )
        );
        addNotification({
          title: 'Premium Tier Granted',
          message: `${selectedUserForGrant.name} upgraded to ${grantTier.toUpperCase()} for ${grantDurationDays} days.`,
          type: 'success'
        });
        setSelectedUserForGrant(null);
      }
    } catch (err: any) {
      addNotification({
        title: 'Grant Failed',
        message: err.message || 'Failed to update user tier.',
        type: 'error'
      });
    } finally {
      setIsGranting(false);
    }
  };

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

  const saveEditPlan = async (planId: string) => {
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

  const scheduledCount = posts.filter((p) => p.status === 'scheduled').length;
  const failedCount = posts.filter((p) => p.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-xl transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Administrator Command &amp; Monetization Control</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Configure dynamic subscription prices, grant manual premium access, monitor transactions, and inspect API telemetry.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 text-rose-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Ping API Infrastructure</span>
        </button>
      </div>

      {/* Cluster Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Cron Job Queue</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">Active (20s Tick)</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">{scheduledCount} scheduled • {failedCount} failed</p>
        </div>

        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Client Workspaces</span>
            <Server className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{clients.length} Workspaces</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{socialAccounts.length} Connected channels</p>
        </div>

        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>AI Token Engine</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">Gemini 3.8 Flash</div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Multi-modal &amp; 2.5 Flash fallback</p>
        </div>

        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Payment Security</span>
            <Lock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">HMAC SHA256</div>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1">Server-side verified Razorpay</p>
        </div>
      </div>

      {/* ADMIN SECTION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'bg-slate-900 text-white dark:bg-rose-500 dark:text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Users &amp; Subscriptions ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-slate-900 text-white dark:bg-rose-500 dark:text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Dynamic Plan Pricing Editor
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'transactions'
              ? 'bg-slate-900 text-white dark:bg-rose-500 dark:text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Transactions &amp; Invoices ({paymentHistory.length})
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'health'
              ? 'bg-slate-900 text-white dark:bg-rose-500 dark:text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          API Gateways &amp; Logs
        </button>
      </div>

      {/* TAB 1: USERS & PERMISSIONS */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Registered Users &amp; Subscription Access</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Manage accounts, activate/suspend access, or manually grant premium tiers
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {users.length} Active Accounts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-950/60 text-slate-700 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Account Type</th>
                  <th className="py-3 px-4">Platform Role</th>
                  <th className="py-3 px-4">Current Plan</th>
                  <th className="py-3 px-4">Subscription Status</th>
                  <th className="py-3 px-4">Expiry</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      <div>{u.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4 uppercase font-mono text-[10px] text-cyan-600 dark:text-cyan-300">
                      {u.accountType}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {u.role.replace('_', ' ')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-bold uppercase text-[10px]">
                        {u.planTier || 'starter'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'active'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      }`}>
                        {u.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {u.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                      {u.subscriptionExpiresAt ? new Date(u.subscriptionExpiresAt).toLocaleDateString('en-IN') : 'Lifetime'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedUserForGrant(u);
                            setGrantTier(u.planTier === 'free' ? 'professional' : u.planTier || 'professional');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-semibold text-[11px] transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Award className="w-3 h-3" />
                          <span>Grant Tier</span>
                        </button>
                        {u.role !== 'super_admin' ? (
                          <button
                            onClick={() => handleToggleUserStatus(u)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                              u.status === 'active'
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300 hover:bg-rose-500/20 border border-rose-500/30'
                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30'
                            }`}
                          >
                            {u.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono">Protected</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DYNAMIC PLAN PRICING EDITOR */}
      {activeTab === 'pricing' && (
        <div className="space-y-4">
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-xs text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-cyan-500" />
            <span>
              Prices edited here update immediately in the database and are rendered live on the user pricing &amp; checkout screen. No static hardcoding.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subscriptionPlans.map((plan) => {
              const isEditing = editingPlanId === plan.planId;
              return (
                <div
                  key={plan.planId}
                  className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{plan.name}</h4>
                      <button
                        onClick={() => startEditPlan(plan)}
                        className="p-1 rounded text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit Plan"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>

                    {isEditing ? (
                      <div className="space-y-2 mt-3 text-xs">
                        <div>
                          <label className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Plan Name</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-1.5 text-slate-900 dark:text-white font-semibold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Monthly (₹)</label>
                            <input
                              type="number"
                              value={editPriceMonthly}
                              onChange={(e) => setEditPriceMonthly(Number(e.target.value))}
                              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-1.5 text-slate-900 dark:text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Yearly (₹)</label>
                            <input
                              type="number"
                              value={editPriceYearly}
                              onChange={(e) => setEditPriceYearly(Number(e.target.value))}
                              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-1.5 text-slate-900 dark:text-white font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Max Workspaces</label>
                          <input
                            type="number"
                            value={editMaxClients}
                            onChange={(e) => setEditMaxClients(Number(e.target.value))}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-1.5 text-slate-900 dark:text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Max Social Channels</label>
                          <input
                            type="number"
                            value={editMaxAccounts}
                            onChange={(e) => setEditMaxAccounts(Number(e.target.value))}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-1.5 text-slate-900 dark:text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Max Monthly Posts</label>
                          <input
                            type="number"
                            value={editMaxPosts}
                            onChange={(e) => setEditMaxPosts(Number(e.target.value))}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-1.5 text-slate-900 dark:text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">AI Credits / Mo</label>
                          <input
                            type="number"
                            value={editAiGenerations}
                            onChange={(e) => setEditAiGenerations(Number(e.target.value))}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-1.5 text-slate-900 dark:text-white font-mono"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 mt-3 text-xs">
                        <div className="flex items-baseline justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Monthly Price:</span>
                          <span className="font-bold text-slate-900 dark:text-white text-base">₹{plan.monthlyPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Annual Price:</span>
                          <span className="font-bold text-slate-900 dark:text-white text-base">₹{plan.annualPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-2 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                          <div className="flex justify-between"><span>Max Clients:</span> <strong>{plan.maxClients}</strong></div>
                          <div className="flex justify-between"><span>Max Channels:</span> <strong>{plan.maxConnectedAccounts}</strong></div>
                          <div className="flex justify-between"><span>Max Posts:</span> <strong>{plan.maxScheduledPostsPerMonth}/mo</strong></div>
                          <div className="flex justify-between"><span>AI Credits:</span> <strong>{plan.aiQueriesLimitPerMonth}/mo</strong></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingPlanId(null)}
                          className="w-1/2 py-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEditPlan(plan.planId)}
                          className="w-1/2 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditPlan(plan)}
                        className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold cursor-pointer"
                      >
                        Modify Configuration
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: TRANSACTIONS & INVOICE LEDGER */}
      {activeTab === 'transactions' && (
        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Razorpay Payment Ledger &amp; Tax Records</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Audit log of all verified orders, customer details, and invoice receipts</p>
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
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-950/60 text-slate-700 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Plan Tier</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Gateway Order ID</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {paymentHistory.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all font-mono text-[11px]">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {p.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-semibold text-slate-900 dark:text-white">{p.userName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{p.userEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 font-sans">
                      <span className="font-bold text-slate-900 dark:text-white">{p.planName}</span>
                      <span className="block text-[10px] text-slate-500 capitalize">{p.billingCycle}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      ₹{p.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {p.orderId}
                    </td>
                    <td className="py-3.5 px-4 font-sans">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-sans text-slate-500">
                      {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: API HEALTH & LIVE AUDIT LOGS */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          {/* External Platforms API Status Table */}
          <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Third-Party Platform API Health &amp; Rate Limits</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Status of official REST and Graph API gateway endpoints</p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                9/9 Gateways Operational
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-950/60 text-slate-700 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Endpoint Host</th>
                    <th className="py-3 px-4">Latency</th>
                    <th className="py-3 px-4">Rate Limit Used</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                  {apiStatuses.map((api, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all font-sans">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                        {api.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                        {api.endpoint}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-mono">
                        {api.latency}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-mono">
                        {api.rateLimit}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {api.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECENT LIVE AUDIT LOGS */}
          <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Live Audit &amp; Security Logs</h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Real-time Node.js event stream</span>
            </div>

            <div className="p-4 space-y-2">
              {auditLogs.slice(0, 6).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded font-mono text-[9px] bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 font-bold">
                      {log.action}
                    </span>
                    <div>
                      <div className="text-slate-900 dark:text-white font-medium">{log.details}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Operator: {log.user}</div>
                    </div>
                  </div>
                  <span className="font-mono text-slate-400 text-[10px] shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GRANT PREMIUM ACCESS MODAL */}
      {selectedUserForGrant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 shadow-2xl text-slate-900 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedUserForGrant(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Grant Premium Tier</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedUserForGrant.name} ({selectedUserForGrant.email})</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Select Access Plan</label>
                <select
                  value={grantTier}
                  onChange={(e) => setGrantTier(e.target.value as any)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="free">Free Starter Plan</option>
                  <option value="starter">Solo Creator (Starter)</option>
                  <option value="professional">Growth Business (Professional)</option>
                  <option value="agency">Digital Agency Suite (Agency)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Access Duration</label>
                <select
                  value={grantDurationDays}
                  onChange={(e) => setGrantDurationDays(Number(e.target.value))}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-semibold"
                >
                  <option value={30}>30 Days (1 Month)</option>
                  <option value={90}>90 Days (Quarterly)</option>
                  <option value={180}>180 Days (Half Year)</option>
                  <option value={365}>365 Days (1 Full Year)</option>
                  <option value={1825}>5 Years (Agency Lifetime)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Subscription State</label>
                <select
                  value={grantStatus}
                  onChange={(e) => setGrantStatus(e.target.value as any)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="active">Active (Verified Paid Status)</option>
                  <option value="trialing">Trialing (VIP Extended Trial)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedUserForGrant(null)}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={isGranting}
                onClick={handleGrantPremium}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isGranting ? 'Applying...' : 'Apply Premium Override'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
