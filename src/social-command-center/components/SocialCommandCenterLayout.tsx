import React, { useState } from 'react';
import { useSocialCommand } from '../context/SocialCommandContext';
import { 
  LayoutDashboard, 
  Share2, 
  Send, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Sparkles, 
  Building, 
  BarChart3, 
  Zap, 
  Folder, 
  Users, 
  CreditCard, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  Search, 
  Plus, 
  ArrowLeft, 
  Menu, 
  X, 
  Check, 
  ExternalLink,
  ChevronDown,
  Layers,
  Globe,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { ThemeToggle } from '../../components/ThemeToggle';

// Subviews
import { OverviewDashboard } from './views/OverviewDashboard';
import { SocialAccountsView } from './views/SocialAccountsView';
import { PublishingStudioView } from './views/PublishingStudioView';
import { ContentCalendarView } from './views/ContentCalendarView';
import { UnifiedInboxView } from './views/UnifiedInboxView';
import { AiAssistantView } from './views/AiAssistantView';
import { ClientManagementView } from './views/ClientManagementView';
import { AnalyticsReportingView } from './views/AnalyticsReportingView';
import { AutomationCenterView } from './views/AutomationCenterView';
import { MediaLibraryView } from './views/MediaLibraryView';
import { TeamManagementView } from './views/TeamManagementView';
import { SubscriptionPricingView } from './views/SubscriptionPricingView';
import { SuperAdminView } from './views/SuperAdminView';
import { CreatePostModal } from './common/CreatePostModal';
import { AuthModal } from './auth/AuthModal';
import { OnboardingWizard } from './onboarding/OnboardingWizard';
import { UserProfileModal } from './auth/UserProfileModal';
import { TermsOfServiceModal } from './legal/TermsOfServiceModal';
import { PrivacyPolicyModal } from './legal/PrivacyPolicyModal';
import { HelpSupportModal } from './support/HelpSupportModal';
import { PublicLandingView } from './public/PublicLandingView';

interface SocialCommandCenterLayoutProps {
  onBackToWebsite: () => void;
}

export const SocialCommandCenterLayout: React.FC<SocialCommandCenterLayoutProps> = ({ onBackToWebsite }) => {
  const { 
    currentTab, 
    setCurrentTab, 
    clients, 
    currentClient, 
    setCurrentClientId, 
    notifications, 
    unreadNotificationCount, 
    markNotificationAsRead,
    conversations,
    currentUser,
    openCreatePostModal,
    openAuthModal,
    openOnboarding,
    openProfileModal,
    currentPlanId,
    userUsage,
    isAuthenticated,
    logout
  } = useSocialCommand();

  const { theme, themeConfig } = useTheme();
  const isLight = theme === 'clean-light' || !themeConfig.isDark;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Unread inbox count for current client
  const unreadInboxCount = conversations.filter(c => 
    c.unreadCount > 0 && (!c.clientId || (currentClient && c.clientId === currentClient.id))
  ).length;

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'accounts', label: 'Social Accounts', icon: Share2, badge: '9 Channels' },
    { id: 'publishing', label: 'Publishing Studio', icon: Send },
    { id: 'calendar', label: 'Content Calendar', icon: CalendarIcon },
    { id: 'inbox', label: 'Unified Inbox', icon: MessageSquare, count: unreadInboxCount },
    { id: 'ai_assistant', label: 'GW Labs AI', icon: Sparkles, highlight: true },
    { id: 'clients', label: 'Agency Clients', icon: Building, badge: `${clients.length}` },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'automation', label: 'Automation Center', icon: Zap },
    { id: 'media', label: 'Media & Assets', icon: Folder },
    { id: 'team', label: 'Team & RBAC', icon: Users },
    { id: 'subscriptions', label: 'Billing & Plans', icon: CreditCard },
    { id: 'super_admin', label: 'Super Admin', icon: ShieldAlert, adminOnly: true },
  ];

  const visibleNavItems = navigationItems.filter(
    item => !item.adminOnly || currentUser?.role === 'super_admin'
  );

  const renderActiveView = () => {
    switch (currentTab) {
      case 'overview': return <OverviewDashboard />;
      case 'accounts': return <SocialAccountsView />;
      case 'publishing': return <PublishingStudioView />;
      case 'calendar': return <ContentCalendarView />;
      case 'inbox': return <UnifiedInboxView />;
      case 'ai_assistant': return <AiAssistantView />;
      case 'clients': return <ClientManagementView />;
      case 'analytics': return <AnalyticsReportingView />;
      case 'automation': return <AutomationCenterView />;
      case 'media': return <MediaLibraryView />;
      case 'team': return <TeamManagementView />;
      case 'subscriptions': return <SubscriptionPricingView />;
      case 'super_admin': return <SuperAdminView />;
      default: return <OverviewDashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative">
        <PublicLandingView 
          onBackToWebsite={onBackToWebsite}
          onOpenTerms={() => setIsTermsOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
        />
        <AuthModal />
        <TermsOfServiceModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
        <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <HelpSupportModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      </div>
    );
  }

  return (
    <div className={`social-command-root min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-cyan-500 selection:text-black ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#05070c] text-slate-100'
    }`}>
      {/* GLOBAL TOP ANNOUNCEMENT BAR */}
      <div className={`border-b px-4 py-2 flex items-center justify-between text-xs transition-colors ${
        isLight 
          ? 'bg-white border-slate-200 text-slate-700' 
          : 'bg-gradient-to-r from-blue-950/70 via-indigo-950/70 to-slate-950 border-indigo-900/40 text-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-cyan-400">Gwalior Web Labs – Social Command Center</span>
          <span className="hidden sm:inline text-slate-400">| Flagship Social Media Management Suite</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHelpOpen(true)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
            title="Open Documentation & Help Desk"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Help & Docs</span>
          </button>

          <button
            onClick={onBackToWebsite}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 hover:text-white border-indigo-500/30'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Switch to Agency Website &rarr;</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <aside
          className={`hidden md:flex flex-col border-r backdrop-blur-2xl transition-all duration-300 relative z-20 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-slate-900/80 border-slate-800/80 text-slate-100'
          } ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
        >
          {/* Brand Crest & Title */}
          <div className={`p-4 border-b flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
            {!isSidebarCollapsed ? (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl overflow-hidden border p-1 shrink-0 flex items-center justify-center ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-700/80'
                }`}>
                  <img
                    src="/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png"
                    alt="GWL Crest"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="truncate">
                  <h2 className={`font-bold text-sm tracking-tight leading-none ${isLight ? 'text-slate-950 font-black' : 'text-white'}`}>
                    Social Command
                  </h2>
                  <p className={`text-[10px] font-semibold tracking-wider uppercase mt-1 ${isLight ? 'text-emerald-700 font-bold' : 'text-cyan-400'}`}>
                    Gwalior Web Labs
                  </p>
                </div>
              </div>
            ) : (
              <div className={`w-10 h-10 mx-auto rounded-xl overflow-hidden border p-1 flex items-center justify-center ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-700/80'
              }`}>
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png"
                  alt="GWL Crest"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`p-1.5 rounded-lg transition-all ml-auto ${
                isLight
                  ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Post Button */}
          <div className="p-3">
            <button
              onClick={openCreatePostModal}
              className={`w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer ${
                isSidebarCollapsed ? 'px-0' : ''
              }`}
            >
              <Plus className="w-4 h-4" />
              {!isSidebarCollapsed && <span>New Social Post</span>}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? (isLight
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold shadow-xs'
                          : 'bg-gradient-to-r from-blue-600/30 to-indigo-600/20 text-cyan-300 border border-cyan-500/30 shadow-sm')
                      : item.highlight
                      ? (isLight ? 'text-amber-700 font-bold hover:bg-amber-50' : 'text-amber-400 hover:bg-amber-500/10')
                      : isLight
                      ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-medium'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  title={item.label}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />

                  {!isSidebarCollapsed && (
                    <>
                      <span className="truncate flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                          {item.badge}
                        </span>
                      )}
                      {typeof item.count === 'number' && item.count > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold">
                          {item.count}
                        </span>
                      )}
                    </>
                  )}

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* User Profile Mini Footer */}
          <div className={`p-3 border-t space-y-2 ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800/80 bg-slate-950/40'
          }`}>
            <button
              onClick={openProfileModal}
              className={`w-full flex items-center gap-2.5 p-1.5 rounded-xl transition-colors text-left cursor-pointer ${
                isLight ? 'hover:bg-slate-200/70' : 'hover:bg-slate-800/60'
              } ${isSidebarCollapsed ? 'justify-center' : ''}`}
              title="View User Profile & Security Settings"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className={`w-8 h-8 rounded-full object-cover border shrink-0 ${
                  isLight ? 'border-slate-300' : 'border-slate-700'
                }`}
              />
              {!isSidebarCollapsed && (
                <div className="truncate flex-1">
                  <p className={`text-xs font-bold truncate ${isLight ? 'text-slate-950 font-black' : 'text-white'}`}>{currentUser.name}</p>
                  <p className={`text-[10px] uppercase font-semibold ${isLight ? 'text-cyan-700 font-bold' : 'text-cyan-400'}`}>{currentUser.role.replace('_', ' ')}</p>
                </div>
              )}
            </button>

            {!isSidebarCollapsed && (
              <div className="space-y-1.5 pt-1">
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={openOnboarding}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-all border ${
                      isLight 
                        ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-2xs' 
                        : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border-transparent'
                    }`}
                    title="Launch Step-by-Step Onboarding Setup"
                  >
                    <Sparkles className={`w-3 h-3 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
                    <span>Setup Guide</span>
                  </button>
                  <button
                    onClick={logout}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                      isLight 
                        ? 'bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border-slate-200 shadow-2xs' 
                        : 'bg-slate-800/80 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border-transparent'
                    }`}
                    title="Sign Out of Social Command Center"
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 px-1">
                  <button
                    onClick={() => setIsHelpOpen(true)}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    Help
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setIsTermsOpen(true)}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    Terms
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setIsPrivacyOpen(true)}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* MOBILE DRAWER */}
        {isMobileSidebarOpen && (
          <div className={`fixed inset-0 z-50 md:hidden backdrop-blur-md flex ${
            isLight ? 'bg-slate-900/40' : 'bg-slate-950/80'
          }`}>
            <div className={`w-72 border-r p-4 flex flex-col h-full ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}>
              <div className={`flex items-center justify-between pb-4 border-b ${
                isLight ? 'border-slate-200' : 'border-slate-800'
              }`}>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png"
                    alt="Logo"
                    className="w-8 h-8 object-contain"
                  />
                  <h3 className={`font-bold text-sm ${isLight ? 'text-slate-950 font-black' : 'text-white'}`}>Social Command</h3>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={`p-1 rounded-lg ${isLight ? 'text-slate-400 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-3">
                <button
                  onClick={() => {
                    openCreatePostModal();
                    setIsMobileSidebarOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> New Post
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1">
                {visibleNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id as any);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                        isActive 
                          ? (isLight ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold' : 'bg-cyan-500/20 text-cyan-300 font-bold') 
                          : (isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white')
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {typeof item.count === 'number' && item.count > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className={`mt-auto space-y-2 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <button
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    logout();
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={onBackToWebsite}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer border ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' 
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Return to Website
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
          </div>
        )}

        {/* MAIN APPLICATION CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* TOP APP HEADER BAR */}
          <header className={`h-16 border-b backdrop-blur-xl px-4 md:px-8 flex items-center justify-between gap-4 z-10 shrink-0 ${
            isLight
              ? 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
              : 'bg-slate-900/60 border-slate-800/80 text-white'
          }`}>
            {/* Left: Mobile trigger & Workspace Selector */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className={`md:hidden p-2 rounded-xl border ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Multi-Tenant Workspace Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-semibold cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-900'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/80 text-white'
                  }`}
                >
                  <Building className="w-4 h-4 text-cyan-400" />
                  <span className={`max-w-[150px] sm:max-w-[200px] truncate ${isLight ? 'text-slate-950 font-bold' : 'text-white'}`}>
                    {currentClient ? currentClient.name : 'All Clients (Master View)'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showWorkspaceMenu && (
                  <div className={`absolute left-0 mt-2 w-64 rounded-2xl shadow-2xl p-2 z-50 border ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                  }`}>
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Switch Client Workspace
                    </div>
                    {clients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => {
                          setCurrentClientId(client.id);
                          setShowWorkspaceMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          currentClient?.id === client.id
                            ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold'
                            : isLight
                            ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <img
                            src={client.logoUrl}
                            alt={client.name}
                            className="w-5 h-5 rounded-full object-cover shrink-0"
                          />
                          <span className="truncate">{client.name}</span>
                        </div>
                        {currentClient?.id === client.id && <Check className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Search, Notifications, Quick Actions */}
            <div className="flex items-center gap-3">
              {/* Notification Center */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-xl border transition-all relative ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700/80'
                  }`}
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {unreadNotificationCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl overflow-hidden z-50 border ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                  }`}>
                    <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">Notifications</span>
                      <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">{unreadNotificationCount} unread</span>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-slate-400 dark:text-slate-500">No notifications</div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationAsRead(n.id)}
                            className={`p-3 cursor-pointer transition-all ${
                              isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-800/50'
                            } ${!n.read ? 'bg-cyan-500/10' : ''}`}
                          >
                            <p className="font-semibold text-slate-900 dark:text-white text-xs">{n.title}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{n.message}</p>
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Current Subscription Tier & Upgrade Pill */}
              <button
                onClick={() => setCurrentTab('subscriptions')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  currentPlanId === 'agency' || currentPlanId === 'enterprise'
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-300'
                    : currentPlanId === 'professional'
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-300'
                    : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/20'
                }`}
                title="Manage Subscription & Quotas"
              >
                <CreditCard className="w-3.5 h-3.5 text-cyan-500" />
                <span className="capitalize">{currentPlanId} Plan</span>
                {currentPlanId !== 'agency' && currentPlanId !== 'enterprise' ? (
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                    Upgrade
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-300 font-bold text-[9px] uppercase">
                    Pro
                  </span>
                )}
              </button>

              {/* Global Theme Palette Switcher */}
              <ThemeSwitcher variant="dropdown" showLabels={false} />

              {/* Theme Light/Dark Mode Toggle */}
              <ThemeToggle id="social-command-theme-toggle" />

              {/* Help Desk & Support Trigger */}
              <button
                onClick={() => setIsHelpOpen(true)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-semibold transition-all cursor-pointer"
                title="Help Desk & Documentation"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Support &amp; Docs</span>
              </button>

              {/* Direct Switch to Traditional Agency Website */}
              <button
                onClick={onBackToWebsite}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                    : 'bg-slate-800/90 hover:bg-slate-700 border-slate-700 text-slate-200 hover:text-white'
                }`}
                title="View Gwalior Web Labs Traditional Digital Agency Services & Work"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agency Site</span>
              </button>
            </div>
          </header>

          {/* MAIN SCROLLABLE CONTENT BODY */}
          <main className={`flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar transition-colors ${
            isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
          }`}>
            <div className="max-w-7xl mx-auto">
              {renderActiveView()}
            </div>
          </main>
        </div>
      </div>

      {/* GLOBAL CREATE POST MODAL */}
      <CreatePostModal />

      {/* AUTHENTICATION & LOGIN MODAL */}
      <AuthModal />

      {/* STEP-BY-STEP ONBOARDING WIZARD */}
      <OnboardingWizard />

      {/* USER PROFILE & SECURITY CREDENTIALS MODAL */}
      <UserProfileModal />

      {/* PUBLIC LEGAL & COMPLIANCE MODALS */}
      <TermsOfServiceModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

      {/* HELP & ENGINEERING SUPPORT MODAL */}
      <HelpSupportModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};
