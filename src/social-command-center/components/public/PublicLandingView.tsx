import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { useTheme } from '../../../context/ThemeContext';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import { SocialPlatformType } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Share2,
  Calendar,
  MessageSquare,
  BarChart3,
  Lock,
  Database,
  CheckCircle2,
  Users,
  Layers,
  ChevronRight,
  HelpCircle,
  FileText,
  ExternalLink,
  Bot
} from 'lucide-react';

interface PublicLandingViewProps {
  onBackToWebsite: () => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
  onOpenHelp?: () => void;
}

export const PublicLandingView: React.FC<PublicLandingViewProps> = ({
  onBackToWebsite,
  onOpenTerms,
  onOpenPrivacy,
  onOpenHelp
}) => {
  const { openAuthModal, subscriptionPlans } = useSocialCommand();
  const { theme, themeConfig } = useTheme();
  const isLight = theme === 'clean-light' || !themeConfig.isDark;

  const [activeFeatureTab, setActiveFeatureTab] = useState<'composer' | 'calendar' | 'inbox' | 'ai' | 'analytics'>('composer');

  const platforms: SocialPlatformType[] = [
    'instagram',
    'facebook',
    'linkedin',
    'youtube',
    'twitter',
    'pinterest',
    'tiktok',
    'whatsapp',
    'telegram'
  ];

  const featurePillars = {
    composer: {
      title: 'Unified Cross-Network Post Composer',
      description: 'Write once, optimize per channel, preview on live device mockups, and broadcast across 9 platforms simultaneously.',
      points: [
        'Live iPhone & Android device preview mockups',
        'Platform-specific character limits and format validation',
        'Automatic hashtag clustering and first-comment scheduling',
        'Multi-image carousel and high-bitrate video upload validation'
      ],
      badge: 'Publishing Engine'
    },
    calendar: {
      title: 'Visual Multi-Tier Content Calendar',
      description: 'Seamlessly visualize, rearrange, and manage scheduled publishing pipelines across days, weeks, and months.',
      points: [
        'Month, week, and day multi-perspective timeline views',
        'Instant rescheduling with drag-and-drop mechanics',
        'Real-time status markers (Draft, Scheduled, Published, Failed)',
        'Color-coded client workspace and brand separation'
      ],
      badge: 'Visual Scheduler'
    },
    inbox: {
      title: 'Unified Social Inbox & Customer CRM',
      description: 'Consolidate conversations, inquiries, direct messages, and post comments into one centralized real-time workspace.',
      points: [
        'Aggregated Meta, WhatsApp, YouTube, and X interactions',
        'Automated sentiment detection (Positive, Neutral, Urgent)',
        'Internal team collaboration notes and ticket assignment',
        'One-click saved response templates for instant resolution'
      ],
      badge: 'Customer Support'
    },
    ai: {
      title: 'GW Labs AI Content Engine',
      description: 'Deploy advanced server-side Gemini intelligence to craft viral hooks, localized Hindi/Hinglish copy, and high-converting CTAs.',
      points: [
        'Platform-adapted copywriting (B2B LinkedIn vs viral TikTok)',
        'Strategic hook generators and caption rephrasing',
        'Audience activity window and best time to post suggestions',
        'Zero API key configuration required for registered users'
      ],
      badge: 'AI Strategist'
    },
    analytics: {
      title: 'Executive Performance Intelligence & Audits',
      description: 'Granular reach velocity, verified impressions, and cross-channel leaderboards derived strictly from real API telemetry.',
      points: [
        'Zero invented statistics or synthetic demo numbers',
        'Interactive trajectory area charts and network comparison bars',
        'Top-performing content asset leaderboards',
        'One-click branded executive PDF and CSV report downloads'
      ],
      badge: 'ROI Auditing'
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-cyan-500 selection:text-black ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#05070c] text-slate-100'
    }`}>
      {/* 1. TOP GLOBAL NAVIGATION */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${
        isLight ? 'bg-white/90 border-slate-200' : 'bg-[#060913]/90 border-slate-800/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
                Gwalior Web Labs
              </span>
              <span className="block text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold leading-none">
                Social Command Center
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-cyan-500 transition-colors">Features</a>
            <a href="#platforms" className="hover:text-cyan-500 transition-colors">Supported Platforms</a>
            <a href="#pricing" className="hover:text-cyan-500 transition-colors">Plans & Pricing</a>
            <a href="#security" className="hover:text-cyan-500 transition-colors">Architecture & Security</a>
            <button
              onClick={() => onOpenHelp && onOpenHelp()}
              className="hover:text-cyan-500 transition-colors cursor-pointer"
            >
              Docs & Help
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToWebsite}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isLight 
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' 
                  : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300'
              }`}
              title="Return to Digital Agency Services"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Agency Site</span>
            </button>

            <button
              onClick={() => openAuthModal('login')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => openAuthModal('register')}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 cursor-pointer transition-all"
            >
              Create Account
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Ambient Gradient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            <span>Public Multi-User Open Architecture • PostgreSQL RLS Isolated</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            The All-in-One Multi-Channel{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-400">
              Social Command Center
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Allow creators, digital marketing agencies, and modern businesses to compose, schedule, monitor customer conversations, and analyze growth across 9 major platforms from one centralized cockpit.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => openAuthModal('register')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                isLight 
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800' 
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
              }`}
            >
              View Pricing & Plans
            </button>
          </div>

          {/* Security & Tech Trust Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left text-xs">
            <div className={`p-3.5 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tenant Isolation</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Supabase PostgreSQL Row Level Security (RLS).
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>OAuth 2.0 PKCE</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                AES-256 token encryption. Passwords never stored.
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                <span>Zero Fake Data</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                100% verified real telemetry or clean zero state.
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-amber-400" />
                <span>GW Labs AI</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Gemini content strategy, hooks, and captions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUPPORTED PLATFORMS SECTION */}
      <section id="platforms" className={`py-16 border-t ${
        isLight ? 'bg-slate-100/60 border-slate-200' : 'bg-[#080d1a] border-slate-800/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold">
              Official API Integration Matrix
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2">
              9 Priority Networks Supported
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Connect your official business or creator credentials with granular permission authorization and token health monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((p) => {
              const meta = PLATFORM_REGISTRY[p];
              return (
                <div
                  key={p}
                  className={`p-5 rounded-3xl border transition-all ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-cyan-300 shadow-sm' 
                      : 'bg-[#090f1e] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${meta.bgBadge} ${meta.textColor}`}>
                        {getPlatformIcon(p, 'w-5 h-5')}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">{meta.name}</h3>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {meta.authMethod}
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-semibold">
                      Official API
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
                    {meta.setupGuideSummary}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">
                      Max {meta.charLimit ? `${meta.charLimit.toLocaleString()} chars` : 'Full Video'}
                    </span>
                    <a
                      href={meta.officialDeveloperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                    >
                      <span>Dev Docs</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FEATURE PILLARS */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
            Built for Modern Workflows
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2">
            Powerful Platform Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Engineered to be simple enough for individual creators and robust enough for digital marketing agencies.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(
            [
              { id: 'composer', label: 'Post Composer', icon: Share2 },
              { id: 'calendar', label: 'Visual Calendar', icon: Calendar },
              { id: 'inbox', label: 'Unified Inbox', icon: MessageSquare },
              { id: 'ai', label: 'GW Labs AI', icon: Bot },
              { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 }
            ] as const
          ).map((t) => {
            const Icon = t.icon;
            const isActive = activeFeatureTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveFeatureTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : isLight
                    ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Deep Dive Card */}
        {(() => {
          const feat = featurePillars[activeFeatureTab];
          return (
            <div className={`p-8 rounded-3xl border transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-xl' : 'bg-[#080d19] border-slate-800 shadow-2xl'
            }`}>
              <div className="max-w-3xl">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-xs font-mono font-bold">
                  {feat.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white mt-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {feat.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
                  {feat.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => openAuthModal('register')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
                  >
                    <span>Try this feature in your workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 5. PRICING & SUBSCRIPTION SECTION */}
      <section id="pricing" className={`py-20 border-t ${
        isLight ? 'bg-slate-100/60 border-slate-200' : 'bg-[#080d1a] border-slate-800/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
              Transparent Access Levels
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mt-2">
              Simple, Milestone-Driven Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Start with the 14-day Free Trial. Upgrade anytime to unlock agency multi-tenancy, team collaboration, and client approval workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.map((plan) => {
              const isPopular = plan.isPopular;
              return (
                <div
                  key={plan.planId}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                    isPopular
                      ? 'bg-gradient-to-b from-cyan-950/30 to-[#090f1f] border-cyan-500/50 shadow-xl ring-2 ring-cyan-500/20'
                      : isLight
                      ? 'bg-white border-slate-200 shadow-sm'
                      : 'bg-[#090f1f] border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{plan.name}</h3>
                      {isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[10px] uppercase">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="my-4">
                      <div className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                        {plan.monthlyPrice === 0 ? 'Free' : `₹${plan.monthlyPrice.toLocaleString()}`}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {plan.monthlyPrice === 0 ? '14-day evaluation trial' : 'per month (billed monthly)'}
                      </div>
                    </div>

                    <div className="space-y-2 py-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Up to {plan.maxConnectedAccounts} Connected Channels</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{plan.maxClients} Client Workspace{plan.maxClients > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        <span>{plan.maxScheduledPostsPerMonth.toLocaleString()} Scheduled Posts / mo</span>
                      </div>

                      <div className="pt-2 space-y-1.5">
                        {plan.features.slice(0, 5).map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                            <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      onClick={() => openAuthModal('register')}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        isPopular
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                          : isLight
                          ? 'bg-slate-900 hover:bg-slate-800 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
                      }`}
                    >
                      {plan.monthlyPrice === 0 ? 'Start Free Trial' : 'Choose Plan'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SECURITY & OPEN ARCHITECTURE SECTION */}
      <section id="security" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
              Engineering Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
              Database Row-Level Security & Open-Source Integrity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Unlike monolithic platforms that pool customer data into shared collections, Social Command Center enforces mathematical tenant boundary isolation. Each authenticated session is bound to your user ID via PostgreSQL Row Level Security (RLS).
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Zero Cross-Tenant Leakage:</strong>
                  <p className="text-slate-500 dark:text-slate-400">User A cannot query, read, or dispatch content from User B’s connected social tokens or client workspaces.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">AES-256 OAuth Token Vault:</strong>
                  <p className="text-slate-500 dark:text-slate-400">All third-party access and refresh tokens are encrypted at rest with hardware-accelerated cryptographic primitives.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">MIT Licensed & Open Source:</strong>
                  <p className="text-slate-500 dark:text-slate-400">Complete SQL migrations, schema blueprints, and documentation included for independent cloud deployment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className={`p-6 rounded-3xl border font-mono text-xs ${
              isLight ? 'bg-slate-900 text-cyan-300 border-slate-800' : 'bg-black/90 text-cyan-300 border-slate-800'
            }`}>
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] ml-2">supabase/migrations/20261107_social_command_center_rls.sql</span>
              </div>
              <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
{`-- Row Level Security (RLS) Enforcement
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their authorized workspace"
    ON public.social_accounts FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only publish to verified owned channels"
    ON public.social_posts FOR ALL
    USING (auth.uid() = user_id);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PUBLIC FOOTER */}
      <footer className={`mt-auto border-t py-12 ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#04060b] border-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              GW
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Gwalior Web Labs – Social Command Center</p>
              <p className="text-[10px] text-slate-400">Engineering High-Performance Digital Systems • Gwalior, MP, India</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => onOpenTerms && onOpenTerms()}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenPrivacy && onOpenPrivacy()}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenHelp && onOpenHelp()}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Help & Documentation
            </button>
            <button
              onClick={onBackToWebsite}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Digital Agency Website &rarr;
            </button>
          </div>

          <div>
            <p className="text-center md:text-right">
              &copy; {new Date().getFullYear()} Gwalior Web Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
