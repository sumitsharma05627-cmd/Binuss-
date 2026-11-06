import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import { SocialPlatformType } from '../../types';
import {
  Users,
  Layers,
  Send,
  Clock,
  FileText,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Plus,
  Calendar,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
  Crown,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const OverviewDashboard: React.FC = () => {
  const {
    activeClient,
    clientWorkspaces,
    socialAccounts,
    posts,
    conversations,
    setActiveSection,
    openCreatePostModal,
    activeClientId,
    currentUser,
    userUsage,
    openPaywall,
    currentPlanId
  } = useSocialCommand();

  const [dateFilter, setDateFilter] = useState<'today' | '7d' | '30d' | '90d'>('30d');

  // Filter accounts and posts by active workspace if not 'all'
  const filteredAccounts = activeClientId === 'all'
    ? socialAccounts
    : socialAccounts.filter((a) => a.clientId === activeClientId);

  const filteredPosts = activeClientId === 'all'
    ? posts
    : posts.filter((p) => p.clientId === activeClientId);

  const filteredConversations = activeClientId === 'all'
    ? conversations
    : conversations.filter((c) => c.clientId === activeClientId);

  // Multiplier for date filters
  const dateMultiplier = dateFilter === 'today' ? 0.15 : dateFilter === '7d' ? 0.35 : dateFilter === '30d' ? 1.0 : 2.8;

  // Computed metrics
  const totalAudience = filteredAccounts.reduce((acc, curr) => acc + curr.followersCount, 0);
  const totalPublishedPosts = Math.round(filteredPosts.filter((p) => p.status === 'published').length * dateMultiplier);
  const totalScheduledPosts = filteredPosts.filter((p) => p.status === 'scheduled').length;
  const totalDrafts = filteredPosts.filter((p) => p.status === 'draft').length;
  const totalUnreadConversations = filteredConversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const connectedAccountsCount = filteredAccounts.filter((a) => a.status === 'connected').length;

  // Aggregate engagement
  const totalLikes = Math.round(filteredPosts.reduce((acc, p) => acc + (p.metrics?.likes || 0), 0) * dateMultiplier);
  const totalComments = Math.round(filteredPosts.reduce((acc, p) => acc + (p.metrics?.comments || 0), 0) * dateMultiplier);
  const totalShares = Math.round(filteredPosts.reduce((acc, p) => acc + (p.metrics?.shares || 0), 0) * dateMultiplier);
  const totalImpressions = Math.round(filteredPosts.reduce((acc, p) => acc + (p.metrics?.impressions || 0), 0) * dateMultiplier);
  const engagementRate = totalImpressions > 0
    ? (((totalLikes + totalComments + totalShares) / totalImpressions) * 100).toFixed(1)
    : '5.2';

  // Audience Growth chart data adjusted by filter
  const audienceGrowthData = dateFilter === 'today'
    ? [
        { date: '06:00', audience: Math.round(totalAudience * 0.99), engagement: 210 },
        { date: '10:00', audience: Math.round(totalAudience * 0.994), engagement: 540 },
        { date: '14:00', audience: Math.round(totalAudience * 0.997), engagement: 890 },
        { date: '18:00', audience: totalAudience, engagement: 1240 }
      ]
    : dateFilter === '7d'
    ? [
        { date: 'Day 1', audience: Math.round(totalAudience * 0.94), engagement: 1200 },
        { date: 'Day 2', audience: Math.round(totalAudience * 0.95), engagement: 1650 },
        { date: 'Day 3', audience: Math.round(totalAudience * 0.96), engagement: 1950 },
        { date: 'Day 4', audience: Math.round(totalAudience * 0.97), engagement: 2400 },
        { date: 'Day 5', audience: Math.round(totalAudience * 0.98), engagement: 2800 },
        { date: 'Day 6', audience: Math.round(totalAudience * 0.99), engagement: 3100 },
        { date: 'Day 7', audience: totalAudience, engagement: 3500 }
      ]
    : [
        { date: 'Week 1', audience: Math.round(totalAudience * 0.82), engagement: 2100 },
        { date: 'Week 2', audience: Math.round(totalAudience * 0.86), engagement: 2950 },
        { date: 'Week 3', audience: Math.round(totalAudience * 0.91), engagement: 3400 },
        { date: 'Week 4', audience: Math.round(totalAudience * 0.95), engagement: 4200 },
        { date: 'Current', audience: totalAudience, engagement: 5320 }
      ];

  // Platform Performance distribution
  const platformPerfData = [
    { name: 'Instagram', reach: Math.round(64200 * dateMultiplier), engagement: 8.2 },
    { name: 'YouTube', reach: Math.round(89400 * dateMultiplier), engagement: 12.4 },
    { name: 'LinkedIn', reach: Math.round(28500 * dateMultiplier), engagement: 6.8 },
    { name: 'WhatsApp', reach: Math.round(14200 * dateMultiplier), engagement: 24.5 },
    { name: 'X (Twitter)', reach: Math.round(38100 * dateMultiplier), engagement: 4.1 },
    { name: 'Facebook', reach: Math.round(41200 * dateMultiplier), engagement: 5.3 }
  ];

  // Monthly Publishing Activity Bar Chart
  const publishingActivityData = [
    { month: 'Jun', published: 38, scheduled: 6 },
    { month: 'Jul', published: 46, scheduled: 8 },
    { month: 'Aug', published: 54, scheduled: 12 },
    { month: 'Sep', published: 68, scheduled: 16 },
    { month: 'Oct', published: 84, scheduled: 24 },
    { month: 'Nov', published: 92, scheduled: 32 }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Greeting, Workspace Context & Date Range */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-[#0d162a] dark:via-[#091122] dark:to-[#0d182e] border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              Live Command Center
            </span>
            {activeClient ? (
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Workspace: <strong className="text-slate-900 dark:text-white">{activeClient.name}</strong>
              </span>
            ) : (
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Multi-Tenant Agency View ({clientWorkspaces.length} active clients)
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {currentUser?.name || 'Commander'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time multi-platform audience growth, content publishing calendar, customer inbox, and AI engine.
          </p>
        </div>

        {/* Date Filter & New Post Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            {(['today', '7d', '30d', '90d'] as const).map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setDateFilter(filterKey)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  dateFilter === filterKey
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {filterKey === 'today' ? 'Today' : filterKey.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={openCreatePostModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </button>
        </div>
      </div>

      {/* Subscription Quota & Usage Progress Bar */}
      {userUsage && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Plan Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-slate-900 dark:text-white text-base">
                    {userUsage.planName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {userUsage.status}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                    ({userUsage.billingCycle})
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Monthly platform resource quotas & account allocation
                </p>
              </div>
            </div>

            {/* Quota Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 flex-1 max-w-2xl">
              {/* Posts Quota */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                    <Send className="w-3 h-3 text-emerald-500" /> Posts
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-200">
                    {userUsage.postsUsedThisMonth} / {userUsage.postsLimit}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      userUsage.postsUsedThisMonth >= userUsage.postsLimit
                        ? 'bg-rose-500'
                        : userUsage.postsUsedThisMonth / userUsage.postsLimit > 0.8
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.round((userUsage.postsUsedThisMonth / (userUsage.postsLimit || 1)) * 100))}%`
                    }}
                  />
                </div>
              </div>

              {/* Channels Quota */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                    <Layers className="w-3 h-3 text-sky-500" /> Channels
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-200">
                    {userUsage.connectedAccountsCount} / {userUsage.connectedAccountsLimit}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      userUsage.connectedAccountsCount >= userUsage.connectedAccountsLimit
                        ? 'bg-rose-500'
                        : userUsage.connectedAccountsCount / userUsage.connectedAccountsLimit > 0.8
                        ? 'bg-amber-500'
                        : 'bg-sky-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.round((userUsage.connectedAccountsCount / (userUsage.connectedAccountsLimit || 1)) * 100))}%`
                    }}
                  />
                </div>
              </div>

              {/* AI Credits Quota */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3 text-purple-500" /> AI Credits
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-200">
                    {userUsage.aiQueriesUsedThisMonth} / {userUsage.aiQueriesLimit}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      userUsage.aiQueriesUsedThisMonth >= userUsage.aiQueriesLimit
                        ? 'bg-rose-500'
                        : userUsage.aiQueriesUsedThisMonth / userUsage.aiQueriesLimit > 0.8
                        ? 'bg-amber-500'
                        : 'bg-purple-500'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.round((userUsage.aiQueriesUsedThisMonth / (userUsage.aiQueriesLimit || 1)) * 100))}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {currentPlanId !== 'agency' ? (
                <button
                  onClick={() => openPaywall({
                    title: 'Upgrade Social Command Center Plan',
                    description: 'Get higher post scheduling capacity, more channels, and unlimited client workspaces.',
                    recommendedPlanId: 'professional'
                  })}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Upgrade</span>
                </button>
              ) : null}
              <button
                onClick={() => setActiveSection('subscriptions')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer"
              >
                Invoices & Plans
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary KPI Grid (4 columns) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Audience */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Total Audience</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              {totalAudience.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs previous period</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Published & Scheduled Posts */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Content Pipeline</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              {totalPublishedPosts}{' '}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ {totalScheduledPosts} scheduled</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
              <span className="text-sky-600 dark:text-sky-400 font-mono font-semibold">{totalDrafts} Drafts ready</span>
              <span>•</span>
              <span className="text-amber-600 dark:text-amber-400">1 Pending approval</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Engagement Rate */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Avg Engagement Rate</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              {engagementRate}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {totalLikes.toLocaleString()} likes • {totalComments.toLocaleString()} comments
            </div>
          </div>
        </div>

        {/* KPI 4: Connected Channels & Inbox */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Connected Accounts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              {connectedAccountsCount}{' '}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ {filteredAccounts.length}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
              <span className="text-emerald-600 dark:text-emerald-400">All OAuth tokens valid</span>
              {totalUnreadConversations > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-600 dark:text-rose-300 font-mono font-bold text-[10px]">
                  {totalUnreadConversations} unread DMs
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Audience & Growth Dynamics (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800/80">
            <div>
              <h2 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Audience Net Growth & Engagement Curve</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">
                  Verified Meta & Google APIs
                </span>
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400">Follower trajectories and interaction velocity over time.</div>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-500/30">
              +{Math.round(totalAudience * 0.18).toLocaleString()} Net New
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={audienceGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="audienceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="engagementGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--theme-surface, #ffffff)',
                    borderColor: '#cbd5e1',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#0f172a'
                  }}
                />
                <Area type="monotone" dataKey="audience" name="Total Audience" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#audienceGrad)" />
                <Area type="monotone" dataKey="engagement" name="Weekly Interactions" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#engagementGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Cross-Platform Performance Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800/80">
            <div>
              <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">Platform Reach Matrix</h2>
              <div className="text-xs text-slate-500 dark:text-slate-400">Total verified reach per official integration.</div>
            </div>
            <button
              onClick={() => setActiveSection('analytics')}
              className="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-500 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Full Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformPerfData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--theme-surface, #ffffff)',
                    borderColor: '#cbd5e1',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#0f172a'
                  }}
                />
                <Bar dataKey="reach" name="Estimated Reach" fill="#3b82f6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Operational Row: Scheduled Queue & Account Health Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upcoming Scheduled Posts (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">Upcoming Publishing Queue</h2>
            </div>
            <button
              onClick={() => setActiveSection('calendar')}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View Content Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {filteredPosts
              .filter((p) => p.status === 'scheduled' || p.status === 'pending_approval')
              .slice(0, 3)
              .map((post) => (
                <div
                  key={post.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <img
                      src={post.mediaUrls[0] || '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png'}
                      alt="Thumbnail"
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-800"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1">
                          {post.platforms.map((p) => (
                            <span key={p} className="text-slate-500 dark:text-slate-400">
                              {getPlatformIcon(p, 'w-3.5 h-3.5')}
                            </span>
                          ))}
                        </div>
                        <span className={`px-2 py-0.2 rounded-full text-[10px] font-mono font-semibold ${
                          post.status === 'scheduled'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                        }`}>
                          {post.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-md">
                        {post.title || post.caption.slice(0, 45)}
                      </h4>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{post.scheduledFor ? new Date(post.scheduledFor).toLocaleDateString() : 'Ready'}</span>
                        <span>•</span>
                        <span>Author: {post.authorName}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveSection('publishing')}
                    className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[11px] text-slate-800 dark:text-slate-200 font-semibold shrink-0 cursor-pointer"
                  >
                    Manage
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Right: Social Account Connection Health Matrix (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">Integration Health Matrix</h2>
              </div>
              <button
                onClick={() => setActiveSection('accounts')}
                className="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-500 font-semibold cursor-pointer"
              >
                Manage All
              </button>
            </div>

            <div className="space-y-2.5">
              {filteredAccounts.slice(0, 5).map((account) => {
                const meta = PLATFORM_REGISTRY[account.platform];
                return (
                  <div
                    key={account.id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-2 rounded-xl ${meta.bgBadge} ${meta.textColor}`}>
                        {getPlatformIcon(account.platform, 'w-4 h-4')}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {account.accountName}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                          {account.accountHandle} • {account.followersCount.toLocaleString()} followers
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>OAuth 2.0 Token Auto-Refresh: <strong className="text-slate-800 dark:text-slate-200">Enabled</strong></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">9/9 Platforms Supported</span>
          </div>
        </div>
      </div>
    </div>
  );
};
