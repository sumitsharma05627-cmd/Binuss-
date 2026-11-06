import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { SocialPlatformType, SocialAccount } from '../../types';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import {
  ShieldCheck,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Key,
  HelpCircle,
  X,
  Trash2,
  Check,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

export const SocialAccountsView: React.FC = () => {
  const {
    socialAccounts,
    connectAccount,
    disconnectAccount,
    reconnectAccount,
    activeClient,
    activeClientId,
    clientWorkspaces,
    userUsage,
    openPaywall
  } = useSocialCommand();

  const [connectModalPlatform, setConnectModalPlatform] = useState<SocialPlatformType | null>(null);
  const [appIdInput, setAppIdInput] = useState('');
  const [appSecretInput, setAppSecretInput] = useState('');
  const [customHandleInput, setCustomHandleInput] = useState('');
  const [customNameInput, setCustomNameInput] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [selectedTargetWorkspace, setSelectedTargetWorkspace] = useState(activeClientId === 'all' ? 'client-gwl' : activeClientId);
  const [selectedTab, setSelectedTab] = useState<'all' | 'connected' | 'disconnected'>('all');

  const filteredAccounts = activeClientId === 'all'
    ? socialAccounts
    : socialAccounts.filter((a) => a.clientId === activeClientId);

  const displayAccounts = filteredAccounts.filter((acc) => {
    if (selectedTab === 'connected') return acc.status === 'connected';
    if (selectedTab === 'disconnected') return acc.status === 'disconnected';
    return true;
  });

  const handleOpenConnect = (platform: SocialPlatformType) => {
    if (userUsage && !userUsage.canConnectAccount) {
      openPaywall({
        title: 'Social Channel Limit Reached',
        description: `Your current plan allows up to ${userUsage.connectedAccountsLimit} connected social accounts. Upgrade your tier to integrate all 9 major networks.`,
        recommendedPlanId: 'professional',
        usageSnippet: `${userUsage.connectedAccountsCount} of ${userUsage.connectedAccountsLimit} channels connected`
      });
      return;
    }

    setConnectModalPlatform(platform);
    setAppIdInput('');
    setAppSecretInput('');
    setCustomHandleInput('');
    setCustomNameInput('');
  };

  const handleExecuteConnect = () => {
    if (!connectModalPlatform) return;
    setIsAuthorizing(true);

    const platformMeta = PLATFORM_REGISTRY[connectModalPlatform];
    const targetWorkspace = clientWorkspaces.find((c) => c.id === selectedTargetWorkspace) || clientWorkspaces[0];

    setTimeout(() => {
      connectAccount({
        clientId: selectedTargetWorkspace,
        platform: connectModalPlatform,
        accountName: customNameInput.trim() || `${targetWorkspace.name} (${platformMeta.name.split(' ')[0]})`,
        accountHandle: customHandleInput.trim() || `@${targetWorkspace.slug}_${connectModalPlatform}`,
        avatarUrl: targetWorkspace.logoUrl,
        profileUrl: `https://${connectModalPlatform}.com/${targetWorkspace.slug}`,
        status: 'connected',
        followersCount: Math.floor(Math.random() * 8000) + 1200,
        followingCount: 140,
        postsCount: 45,
        tokenExpiresAt: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString(),
        permissions: platformMeta.requiredScopes,
        capabilities: {
          canPublishFeed: platformMeta.charLimit > 0,
          canPublishReelOrShort: platformMeta.supportsReelsOrShorts,
          canPublishStory: connectModalPlatform === 'instagram' || connectModalPlatform === 'facebook',
          canReadDirectMessages: platformMeta.supportsDirectMessages,
          canReadComments: platformMeta.supportsComments,
          hasAnalytics: true
        },
        apiDetails: {
          appId: appIdInput || `app-${connectModalPlatform}-${Date.now()}`,
          authType: connectModalPlatform === 'telegram' ? 'bot_token' : connectModalPlatform === 'whatsapp' ? 'cloud_api' : 'oauth2',
          scopeGranted: platformMeta.requiredScopes,
          rateLimitRemaining: 200,
          officialDocsUrl: platformMeta.officialDeveloperUrl
        }
      });

      setIsAuthorizing(false);
      setConnectModalPlatform(null);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#090f1f] border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              Multi-Platform Authorization Vault
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Official OAuth 2.0 & Cloud APIs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connected Social Accounts & Integrations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Monitor API token health, granular permission scopes, connection renewals, and platform-specific capabilities across all 9 supported networks.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              selectedTab === 'all' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Accounts ({filteredAccounts.length})
          </button>
          <button
            onClick={() => setSelectedTab('connected')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              selectedTab === 'connected' ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Active ({filteredAccounts.filter((a) => a.status === 'connected').length})
          </button>
          <button
            onClick={() => setSelectedTab('disconnected')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              selectedTab === 'disconnected' ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Disconnected
          </button>
        </div>
      </div>

      {/* 9 Supported Platforms Quick Connect Tray */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>Connect New Official Account:</span>
          <span className="text-[11px] text-emerald-400">9 Enterprise Platforms Available</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
          {(Object.keys(PLATFORM_REGISTRY) as SocialPlatformType[]).map((pKey) => {
            const meta = PLATFORM_REGISTRY[pKey];
            return (
              <button
                key={pKey}
                onClick={() => handleOpenConnect(pKey)}
                className={`p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-all flex flex-col items-center text-center group cursor-pointer hover:-translate-y-0.5 shadow-sm`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${meta.bgBadge} ${meta.textColor} group-hover:scale-110 transition-transform`}>
                  {getPlatformIcon(pKey, 'w-4 h-4')}
                </div>
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {meta.name.split(' ')[0]}
                </span>
                <span className="text-[9px] font-mono text-slate-400 mt-0.5 flex items-center gap-0.5">
                  <Plus className="w-2.5 h-2.5" /> Connect
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayAccounts.map((account) => {
          const meta = PLATFORM_REGISTRY[account.platform];
          const isConnected = account.status === 'connected';

          return (
            <div
              key={account.id}
              className={`rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                isConnected
                  ? 'bg-[#090f1f] border-slate-800 hover:border-slate-700 shadow-xl'
                  : 'bg-slate-950/60 border-slate-900 opacity-60'
              }`}
            >
              <div>
                {/* Account Card Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={account.avatarUrl}
                      alt={account.accountName}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white truncate">{account.accountName}</h4>
                        <span className={`p-1 rounded-md ${meta.bgBadge} ${meta.textColor}`}>
                          {getPlatformIcon(account.platform, 'w-3 h-3')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono truncate">{account.accountHandle}</div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isConnected
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {account.status}
                  </span>
                </div>

                {/* Audience stats */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center mb-3 text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Followers</div>
                    <div className="font-bold text-white font-mono mt-0.5">
                      {account.followersCount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Posts</div>
                    <div className="font-bold text-white font-mono mt-0.5">{account.postsCount}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Rate Limit</div>
                    <div className="font-bold text-emerald-400 font-mono mt-0.5">
                      {account.apiDetails.rateLimitRemaining || 200}/hr
                    </div>
                  </div>
                </div>

                {/* Permissions pills */}
                <div className="mb-3">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Approved Scopes:</span>
                    <span className="text-emerald-400">{account.permissions.length} Granted</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {account.permissions.slice(0, 3).map((perm) => (
                      <span
                        key={perm}
                        className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono text-[9px] border border-slate-700/60"
                      >
                        ✓ {perm}
                      </span>
                    ))}
                    {account.permissions.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[9px]">
                        +{account.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Token Expiry Status */}
                <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>OAuth Token Expiry:</span>
                  </div>
                  <span className="font-mono text-white">
                    {account.tokenExpiresAt ? 'Valid for 90 days' : 'Permanent Key'}
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <a
                  href={meta.officialDeveloperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Dev Docs</span>
                </a>

                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <>
                      <button
                        onClick={() => reconnectAccount(account.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title="Refresh OAuth Token"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => disconnectAccount(account.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/20 transition-colors cursor-pointer"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => reconnectAccount(account.id)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      Reconnect
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official OAuth Connect Modal */}
      {connectModalPlatform && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-xl bg-[#090f1f] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden">
            <button
              onClick={() => setConnectModalPlatform(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center ${PLATFORM_REGISTRY[connectModalPlatform].bgBadge} ${PLATFORM_REGISTRY[connectModalPlatform].textColor}`}
              >
                {getPlatformIcon(connectModalPlatform, 'w-6 h-6')}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Connect {PLATFORM_REGISTRY[connectModalPlatform].name}
                </h3>
                <div className="text-xs text-slate-400 font-mono">
                  Authentication Method: {PLATFORM_REGISTRY[connectModalPlatform].authMethod}
                </div>
              </div>
            </div>

            {/* Platform Official Setup Notice */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                <Info className="w-4 h-4" />
                <span>Official API Integration Standard:</span>
              </div>
              <p>{PLATFORM_REGISTRY[connectModalPlatform].setupGuideSummary}</p>
              <div className="pt-1">
                <a
                  href={PLATFORM_REGISTRY[connectModalPlatform].officialDeveloperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-400 hover:underline font-semibold"
                >
                  <span>Open Official {PLATFORM_REGISTRY[connectModalPlatform].name} Developer Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3 mb-5 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-mono">Assign to Client Workspace:</label>
                <select
                  value={selectedTargetWorkspace}
                  onChange={(e) => setSelectedTargetWorkspace(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 font-medium"
                >
                  {clientWorkspaces.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.companyName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Account Display Name:</label>
                  <input
                    type="text"
                    value={customNameInput}
                    onChange={(e) => setCustomNameInput(e.target.value)}
                    placeholder="e.g. Official Brand Page"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Social Handle / Channel ID:</label>
                  <input
                    type="text"
                    value={customHandleInput}
                    onChange={(e) => setCustomHandleInput(e.target.value)}
                    placeholder="e.g. @brand_official"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">
                  {connectModalPlatform === 'telegram'
                    ? 'Bot Token (@BotFather):'
                    : connectModalPlatform === 'whatsapp'
                    ? 'WhatsApp Cloud API Permanent System User Token:'
                    : 'App Client ID / Public Key:'}
                </label>
                <input
                  type="text"
                  value={appIdInput}
                  onChange={(e) => setAppIdInput(e.target.value)}
                  placeholder="Paste official credential or Leave blank for sandbox demonstration..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Required Scopes to Grant:</label>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 max-h-24 overflow-y-auto space-y-1">
                  {PLATFORM_REGISTRY[connectModalPlatform].requiredScopes.map((scope) => (
                    <div key={scope} className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{scope}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConnectModalPlatform(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isAuthorizing}
                onClick={handleExecuteConnect}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
              >
                {isAuthorizing ? 'Authorizing OAuth...' : `Authorize & Connect Account`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
