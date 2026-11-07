import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClientWorkspace,
  SocialAccount,
  SocialPost,
  InboxConversation,
  AutomationWorkflow,
  MediaAsset,
  TeamMember,
  SubscriptionConfig,
  SocialNavSection,
  UserRole,
  PostStatus,
  PaymentTransaction,
  UserUsageStats
} from '../types';
import {
  INITIAL_CLIENT_WORKSPACES,
  INITIAL_SOCIAL_ACCOUNTS,
  INITIAL_SOCIAL_POSTS,
  INITIAL_INBOX_CONVERSATIONS,
  INITIAL_AUTOMATIONS,
  INITIAL_MEDIA_ASSETS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_SUBSCRIPTION_PLANS
} from '../data/initialState';
import { FeatureGateModal } from '../components/common/FeatureGateModal';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  actionUrl?: string;
}

interface SocialCommandContextType {
  // Navigation & Workspace
  activeSection: SocialNavSection['id'];
  setActiveSection: (section: SocialNavSection['id']) => void;
  activeClientId: string; // 'all' or workspace id
  setActiveClientId: (id: string) => void;
  activeClient: ClientWorkspace | null;
  clientWorkspaces: ClientWorkspace[];
  addClientWorkspace: (workspace: Omit<ClientWorkspace, 'id' | 'createdAt'>) => ClientWorkspace;
  updateClientWorkspace: (id: string, updates: Partial<ClientWorkspace>) => void;
  deleteClientWorkspace: (id: string) => void;

  // Social Accounts
  socialAccounts: SocialAccount[];
  connectAccount: (account: Omit<SocialAccount, 'id' | 'connectedAt'>) => void;
  disconnectAccount: (id: string) => void;
  reconnectAccount: (id: string) => void;

  // Posts & Publishing
  posts: SocialPost[];
  createPost: (post: Omit<SocialPost, 'id' | 'createdAt'>) => SocialPost;
  updatePost: (id: string, updates: Partial<SocialPost>) => void;
  deletePost: (id: string) => void;
  publishPostNow: (id: string) => Promise<boolean>;
  approvePost: (id: string) => void;
  requestChangesOnPost: (id: string, comment: string) => void;

  // Unified Inbox
  conversations: InboxConversation[];
  sendReplyMessage: (conversationId: string, text: string, senderName?: string) => void;
  addInternalNote: (conversationId: string, text: string, authorName?: string) => void;
  assignConversation: (conversationId: string, teamMemberId: string) => void;
  updateConversationStatus: (conversationId: string, status: 'open' | 'resolved' | 'pending') => void;
  addConversationTag: (conversationId: string, tag: string) => void;

  // Automation
  automations: AutomationWorkflow[];
  toggleAutomation: (id: string) => void;
  addAutomation: (workflow: Omit<AutomationWorkflow, 'id' | 'executionCount'>) => void;
  deleteAutomation: (id: string) => void;

  // Media Library
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => void;
  deleteMediaAsset: (id: string) => void;

  // Team & Roles
  teamMembers: TeamMember[];
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  addTeamMember: (member: Omit<TeamMember, 'id' | 'joinedAt'>) => void;
  updateTeamMemberRole: (id: string, role: UserRole) => void;

  // Subscriptions, Payments & Monetization
  subscriptionPlans: SubscriptionConfig[];
  currentPlanId: string;
  updateSubscriptionPlan: (planId: string) => void;
  updateSubscriptionPlanConfig: (planId: string, updates: Partial<SubscriptionConfig>) => Promise<boolean>;
  userUsage: UserUsageStats | null;
  refreshUsageStats: () => Promise<void>;
  paymentHistory: PaymentTransaction[];
  refreshPaymentHistory: () => Promise<void>;
  initiateRazorpayPayment: (planId: string, billingCycle: 'monthly' | 'annual') => Promise<{ success: boolean; error?: string; invoiceNumber?: string }>;
  aiQueriesUsed: number;
  incrementAiUsage: () => void;
  isPaywallOpen: boolean;
  paywallConfig: {
    title?: string;
    description?: string;
    recommendedPlanId?: 'starter' | 'professional' | 'agency';
    usageSnippet?: string;
  };
  openPaywall: (config?: {
    title?: string;
    description?: string;
    recommendedPlanId?: 'starter' | 'professional' | 'agency';
    usageSnippet?: string;
  }) => void;
  closePaywall: () => void;

  // Global Modals & Notifications
  isCreatePostModalOpen: boolean;
  openCreatePostModal: () => void;
  closeCreatePostModal: () => void;
  notifications: AppNotification[];
  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;

  // Navigation back to Main Agency Website
  onExitToMainSite?: () => void;

  // Convenience Aliases for subviews
  currentTab: SocialNavSection['id'];
  setCurrentTab: (section: SocialNavSection['id']) => void;
  clients: ClientWorkspace[];
  currentClient: ClientWorkspace | null;
  setCurrentClientId: (id: string) => void;
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  currentUser: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
  };
  automationRules: any[];
  toggleAutomationRule: (id: string) => void;
  deleteAutomationRule: (id: string) => void;
  createAutomationRule: (rule: any) => void;
  mediaLibrary: any[];
  uploadMedia: (media: any) => void;
  deleteMedia: (id: string) => void;

  // Auth, Profile & Onboarding states and actions
  authToken: string | null;
  isAuthModalOpen: boolean;
  openAuthModal: (view?: 'login' | 'register' | 'forgot' | 'verify') => void;
  closeAuthModal: () => void;
  authModalView: 'login' | 'register' | 'forgot' | 'verify';
  setAuthModalView: (view: 'login' | 'register' | 'forgot' | 'verify') => void;
  pendingVerificationEmail: string | null;

  isOnboardingOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;

  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;

  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (profile?: { email: string; name: string; avatarUrl?: string }) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role: 'super_admin' | 'agency_admin' | 'freelancer') => Promise<void>;
  register: (data: any) => Promise<{ success: boolean; error?: string; verificationPin?: string }>;
  verifyEmailPin: (pin: string) => Promise<{ success: boolean; error?: string }>;
  submitOnboarding: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  refreshBackendData: () => Promise<void>;
}

const SocialCommandContext = createContext<SocialCommandContextType | null>(null);

const STORAGE_PREFIX = 'gwl_social_v2_';

export const SocialCommandProvider: React.FC<{
  children: React.ReactNode;
  onExitToMainSite?: () => void;
}> = ({ children, onExitToMainSite }) => {
  // Navigation & Workspace
  const [activeSection, setActiveSection] = useState<SocialNavSection['id']>('overview');
  const [activeClientId, setActiveClientId] = useState<string>('all');

  // Workspaces
  const [clientWorkspaces, setClientWorkspaces] = useState<ClientWorkspace[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}clients`);
      return saved ? JSON.parse(saved) : INITIAL_CLIENT_WORKSPACES;
    } catch {
      return INITIAL_CLIENT_WORKSPACES;
    }
  });

  // Social Accounts
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}accounts`);
      return saved ? JSON.parse(saved) : INITIAL_SOCIAL_ACCOUNTS;
    } catch {
      return INITIAL_SOCIAL_ACCOUNTS;
    }
  });

  // Posts
  const [posts, setPosts] = useState<SocialPost[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}posts`);
      return saved ? JSON.parse(saved) : INITIAL_SOCIAL_POSTS;
    } catch {
      return INITIAL_SOCIAL_POSTS;
    }
  });

  // Inbox
  const [conversations, setConversations] = useState<InboxConversation[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}conversations`);
      return saved ? JSON.parse(saved) : INITIAL_INBOX_CONVERSATIONS;
    } catch {
      return INITIAL_INBOX_CONVERSATIONS;
    }
  });

  // Automations
  const [automations, setAutomations] = useState<AutomationWorkflow[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}automations`);
      return saved ? JSON.parse(saved) : INITIAL_AUTOMATIONS;
    } catch {
      return INITIAL_AUTOMATIONS;
    }
  });

  // Media
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}media`);
      return saved ? JSON.parse(saved) : INITIAL_MEDIA_ASSETS;
    } catch {
      return INITIAL_MEDIA_ASSETS;
    }
  });

  // Team
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}team`);
      return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
    } catch {
      return INITIAL_TEAM_MEMBERS;
    }
  });

  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('super_admin');

  // Subscriptions & Dynamic Plans State
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionConfig[]>(INITIAL_SUBSCRIPTION_PLANS);
  const [currentPlanId, setCurrentPlanId] = useState<string>('agency');
  const [aiQueriesUsed, setAiQueriesUsed] = useState<number>(142);
  const [userUsage, setUserUsage] = useState<UserUsageStats | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentTransaction[]>([]);

  // Feature Gate / Paywall state
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallConfig, setPaywallConfig] = useState<{
    title?: string;
    description?: string;
    recommendedPlanId?: 'starter' | 'professional' | 'agency';
    usageSnippet?: string;
  }>({});

  const openPaywall = (config?: {
    title?: string;
    description?: string;
    recommendedPlanId?: 'starter' | 'professional' | 'agency';
    usageSnippet?: string;
  }) => {
    setPaywallConfig(config || {});
    setIsPaywallOpen(true);
  };

  const closePaywall = () => {
    setIsPaywallOpen(false);
  };

  // User Profile & Authentication State
  const [currentUserData, setCurrentUserData] = useState<{
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
    accountType?: string;
    onboardingCompleted?: boolean;
    phone?: string;
  } | null>(() => {
    try {
      const savedUser = localStorage.getItem('gwl_social_user');
      const savedToken = localStorage.getItem('gwl_social_token');
      if (savedUser && savedToken) {
        return JSON.parse(savedUser);
      }
      return null;
    } catch {
      return null;
    }
  });

  const [authToken, setAuthToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('gwl_social_token');
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(authToken && currentUserData);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register' | 'forgot' | 'verify'>('login');
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Modals & Notifications
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}clients`, JSON.stringify(clientWorkspaces));
      localStorage.setItem(`${STORAGE_PREFIX}accounts`, JSON.stringify(socialAccounts));
      localStorage.setItem(`${STORAGE_PREFIX}posts`, JSON.stringify(posts));
      localStorage.setItem(`${STORAGE_PREFIX}conversations`, JSON.stringify(conversations));
      localStorage.setItem(`${STORAGE_PREFIX}automations`, JSON.stringify(automations));
      localStorage.setItem(`${STORAGE_PREFIX}media`, JSON.stringify(mediaAssets));
      localStorage.setItem(`${STORAGE_PREFIX}team`, JSON.stringify(teamMembers));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [clientWorkspaces, socialAccounts, posts, conversations, automations, mediaAssets, teamMembers]);

  const activeClient = activeClientId === 'all'
    ? null
    : clientWorkspaces.find((c) => c.id === activeClientId) || null;

  // Client workspace management
  const addClientWorkspace = (workspaceData: Omit<ClientWorkspace, 'id' | 'createdAt'>): ClientWorkspace => {
    const newClient: ClientWorkspace = {
      ...workspaceData,
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setClientWorkspaces((prev) => [newClient, ...prev]);

    const token = authToken || localStorage.getItem('gwl_social_token');
    if (token) {
      fetch('/api/social/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newClient)
      }).catch(err => console.warn('Failed to persist client workspace to server:', err));
    }

    addNotification({
      title: 'New Client Workspace Created',
      message: `Workspace "${newClient.name}" has been configured successfully.`,
      type: 'success'
    });
    return newClient;
  };

  const updateClientWorkspace = (id: string, updates: Partial<ClientWorkspace>) => {
    setClientWorkspaces((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    const token = authToken || localStorage.getItem('gwl_social_token');
    if (token) {
      fetch(`/api/social/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      }).catch(err => console.warn('Failed to update workspace on server:', err));
    }
  };

  const deleteClientWorkspace = (id: string) => {
    setClientWorkspaces((prev) => prev.filter((c) => c.id !== id));
    if (activeClientId === id) {
      setActiveClientId('all');
    }
    const token = authToken || localStorage.getItem('gwl_social_token');
    if (token) {
      fetch(`/api/social/clients/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).catch(err => console.warn('Failed to delete workspace on server:', err));
    }
    addNotification({
      title: 'Workspace Removed',
      message: 'Client workspace deleted.',
      type: 'warning'
    });
  };

  // Social accounts
  const connectAccount = (accountData: Omit<SocialAccount, 'id' | 'connectedAt'>) => {
    const newAccount: SocialAccount = {
      ...accountData,
      id: `acc-${accountData.platform}-${Date.now()}`,
      connectedAt: new Date().toISOString(),
      status: 'connected',
      followersCount: accountData.followersCount || 0,
      followingCount: accountData.followingCount || 0,
      postsCount: accountData.postsCount || 0
    };
    setSocialAccounts((prev) => [newAccount, ...prev]);

    const token = authToken || localStorage.getItem('gwl_social_token');
    if (token) {
      fetch('/api/social/integrations/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newAccount)
      }).catch(err => console.warn('Failed to persist connected account to server:', err));
    }

    addNotification({
      title: 'Account Connected',
      message: `Successfully connected ${newAccount.accountName} (${newAccount.platform.toUpperCase()}).`,
      type: 'success'
    });
  };

  const disconnectAccount = (id: string) => {
    setSocialAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, status: 'disconnected', isConnected: false } : acc))
    );
    const token = authToken || localStorage.getItem('gwl_social_token');
    if (token) {
      fetch('/api/social/integrations/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ accountId: id })
      }).catch(err => console.warn('Failed to disconnect account on server:', err));
    }
    addNotification({
      title: 'Account Disconnected',
      message: 'Account connection was revoked.',
      type: 'warning'
    });
  };

  const reconnectAccount = (id: string) => {
    setSocialAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              status: 'connected',
              tokenExpiresAt: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString()
            }
          : acc
      )
    );
    addNotification({
      title: 'Account Token Refreshed',
      message: 'OAuth token refreshed with 90-day validity.',
      type: 'success'
    });
  };

  // Posts & Publishing
  const createPost = (postData: Omit<SocialPost, 'id' | 'createdAt'>): SocialPost => {
    const newPost: SocialPost = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      metrics: postData.metrics || {
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
        impressions: 0,
        reach: 0,
        clicks: 0
      }
    };
    setPosts((prev) => [newPost, ...prev]);

    const token = authToken || localStorage.getItem('gwl_social_token');
    if (token) {
      fetch('/api/social/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newPost)
      }).catch(err => console.warn('Failed to persist post to server:', err));
    }

    addNotification({
      title: postData.status === 'scheduled' ? 'Post Scheduled' : 'Draft Saved',
      message: `Post "${newPost.title || newPost.caption.slice(0, 30)}..." has been queued.`,
      type: 'info'
    });
    return newPost;
  };

  const updatePost = (id: string, updates: Partial<SocialPost>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    const token = authToken || localStorage.getItem('gwl_social_token');
    if (token) {
      fetch(`/api/social/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      }).catch(err => console.warn('Failed to update post on server:', err));
    }
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    const token = authToken || localStorage.getItem('gwl_social_token');
    if (token) {
      fetch(`/api/social/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(err => console.warn('Failed to delete post on server:', err));
    }
  };

  const publishPostNow = async (id: string): Promise<boolean> => {
    const post = posts.find((p) => p.id === id);
    if (!post) return false;

    const zeroMetrics = {
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      impressions: 0,
      reach: 0,
      clicks: 0
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: 'published',
              publishedAt: new Date().toISOString(),
              metrics: zeroMetrics
            }
          : p
      )
    );

    const token = authToken || localStorage.getItem('gwl_social_token');
    if (token) {
      fetch(`/api/social/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'published',
          publishedAt: new Date().toISOString(),
          metrics: zeroMetrics
        })
      }).catch(err => console.warn('Failed to update published post on server:', err));
    }

    addNotification({
      title: 'Post Published Now',
      message: `Dispatched to ${post.platforms.join(', ')}. Metrics will update as audience interacts.`,
      type: 'success'
    });

    return true;
  };

  const approvePost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, clientApproved: true, status: 'scheduled' } : p
      )
    );
    addNotification({
      title: 'Post Approved by Client',
      message: 'Client marked post as ready for automated broadcast.',
      type: 'success'
    });
  };

  const requestChangesOnPost = (id: string, comment: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              clientApproved: false,
              clientComments: [...(p.clientComments || []), comment]
            }
          : p
      )
    );
    addNotification({
      title: 'Client Requested Changes',
      message: comment,
      type: 'warning'
    });
  };

  // Inbox
  const sendReplyMessage = (conversationId: string, text: string, senderName?: string) => {
    const resolvedSender = senderName || currentUserData?.name || 'Support Agent';
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== conversationId) return conv;
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender: 'agent' as const,
          senderName: resolvedSender,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          delivered: true,
          read: true
        };
        return {
          ...conv,
          lastMessageSnippet: text,
          lastMessageTimestamp: 'Just now',
          unreadCount: 0,
          messages: [...conv.messages, newMsg]
        };
      })
    );
  };

  const addInternalNote = (conversationId: string, text: string, authorName = 'Agent') => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== conversationId) return conv;
        const newNote = {
          id: `note-${Date.now()}`,
          authorName,
          text,
          createdAt: new Date().toISOString()
        };
        return {
          ...conv,
          internalNotes: [...conv.internalNotes, newNote]
        };
      })
    );
  };

  const assignConversation = (conversationId: string, teamMemberId: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, assignedTo: teamMemberId } : conv
      )
    );
  };

  const updateConversationStatus = (conversationId: string, status: 'open' | 'resolved' | 'pending') => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, status, unreadCount: 0 } : conv
      )
    );
  };

  const addConversationTag = (conversationId: string, tag: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== conversationId) return conv;
        if (conv.customer.tags.includes(tag)) return conv;
        return {
          ...conv,
          customer: {
            ...conv.customer,
            tags: [...conv.customer.tags, tag]
          }
        };
      })
    );
  };

  // Automation
  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const addAutomation = (data: Omit<AutomationWorkflow, 'id' | 'executionCount'>) => {
    const newWorkflow: AutomationWorkflow = {
      ...data,
      id: `auto-${Date.now()}`,
      executionCount: 0
    };
    setAutomations((prev) => [newWorkflow, ...prev]);
  };

  const deleteAutomation = (id: string) => {
    setAutomations((prev) => prev.filter((a) => a.id !== id));
  };

  // Media
  const addMediaAsset = (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => {
    const newAsset: MediaAsset = {
      ...asset,
      id: `media-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
    addNotification({
      title: 'Asset Uploaded',
      message: `${newAsset.title} added to ${newAsset.folder}.`,
      type: 'info'
    });
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
  };

  // Team
  const addTeamMember = (member: Omit<TeamMember, 'id' | 'joinedAt'>) => {
    const newMember: TeamMember = {
      ...member,
      id: `user-${Date.now()}`,
      joinedAt: new Date().toISOString()
    };
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const updateTeamMemberRole = (id: string, role: UserRole) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m))
    );
  };

  // Subscription & Dynamic Monetization Methods
  const refreshUsageStats = async () => {
    try {
      const res = await fetch('/api/social/user/usage', {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data.usage) {
          setUserUsage(data.usage);
          if (data.usage.planTier) {
            setCurrentPlanId(data.usage.planTier);
          }
        }
      }
    } catch {
      // offline fallback
    }
  };

  const refreshPaymentHistory = async () => {
    try {
      const res = await fetch('/api/social/payments/history', {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data.payments) {
          setPaymentHistory(data.payments);
        }
      }
    } catch {
      // offline fallback
    }
  };

  const updateSubscriptionPlan = (planId: string) => {
    setCurrentPlanId(planId);
    addNotification({
      title: 'Plan Updated',
      message: `Workspace subscription updated to ${planId.toUpperCase()}.`,
      type: 'success'
    });
  };

  const updateSubscriptionPlanConfig = async (
    planId: string, 
    updates: Partial<SubscriptionConfig>
  ): Promise<boolean> => {
    try {
      const res = await fetch(`/api/social/plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const data = await res.json();
        setSubscriptionPlans((prev) =>
          prev.map((p) => (p.planId === planId ? { ...p, ...data.plan } : p))
        );
        addNotification({
          title: 'Plan Configuration Saved',
          message: `${updates.name || planId} pricing and limits updated across platform.`,
          type: 'success'
        });
        return true;
      }
      return false;
    } catch {
      setSubscriptionPlans((prev) =>
        prev.map((p) => (p.planId === planId ? { ...p, ...updates } : p))
      );
      return true;
    }
  };

  const initiateRazorpayPayment = async (
    planId: string,
    billingCycle: 'monthly' | 'annual' = 'monthly'
  ): Promise<{ success: boolean; error?: string; invoiceNumber?: string }> => {
    try {
      const res = await fetch('/api/social/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
        },
        body: JSON.stringify({ planId, billingCycle })
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      if (typeof (window as any).Razorpay === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Razorpay checkout script.'));
          document.body.appendChild(script);
        });
      }

      return new Promise((resolve) => {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount * 100,
          currency: 'INR',
          name: 'Gwalior Web Labs',
          description: `Social Command Center - ${orderData.planName} (${billingCycle})`,
          image: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
          order_id: orderData.orderId,
          handler: async (response: any) => {
            try {
              const verifyRes = await fetch('/api/social/payments/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
                },
                body: JSON.stringify({
                  orderId: response.razorpay_order_id || orderData.orderId,
                  paymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
                  signature: response.razorpay_signature || `sig_checkout_${Date.now()}`,
                  planId,
                  billingCycle
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                setCurrentPlanId(planId);
                addNotification({
                  title: 'Payment Verified & Tier Activated',
                  message: `Upgraded to ${orderData.planName}. Invoice: ${verifyData.payment?.invoiceNumber || orderData.invoiceNumber}`,
                  type: 'success'
                });
                await refreshUsageStats();
                await refreshPaymentHistory();
                resolve({ success: true, invoiceNumber: verifyData.payment?.invoiceNumber || orderData.invoiceNumber });
              } else {
                resolve({ success: false, error: verifyData.error || 'Payment verification failed.' });
              }
            } catch (err: any) {
              resolve({ success: false, error: err.message || 'Payment verification failed.' });
            }
          },
          prefill: {
            name: orderData.customer?.name || currentUserData.name,
            email: orderData.customer?.email || currentUserData.email,
            contact: orderData.customer?.contact || (currentUserData as any)?.phone || ''
          },
          theme: {
            color: '#06b6d4'
          },
          modal: {
            ondismiss: () => {
              resolve({ success: false, error: 'Payment modal closed.' });
            }
          }
        };

        try {
          const rzp = new (window as any).Razorpay(options);
          rzp.on('payment.failed', (resp: any) => {
            resolve({
              success: false,
              error: resp.error?.description || 'Payment failed. Please retry.'
            });
          });
          rzp.open();
        } catch {
          // Sandbox fallback if popup blocked
          fetch('/api/social/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
            },
            body: JSON.stringify({
              orderId: orderData.orderId,
              paymentId: `pay_sandbox_${Date.now()}`,
              signature: `sandbox_sig_${Date.now()}`,
              planId,
              billingCycle
            })
          }).then(async (vRes) => {
            const vData = await vRes.json();
            if (vData.success) {
              setCurrentPlanId(planId);
              await refreshUsageStats();
              await refreshPaymentHistory();
              resolve({ success: true, invoiceNumber: vData.payment?.invoiceNumber });
            } else {
              resolve({ success: false, error: vData.error });
            }
          }).catch((err) => resolve({ success: false, error: err.message }));
        }
      });
    } catch (err: any) {
      return { success: false, error: err.message || 'Payment initiation failed.' };
    }
  };

  const incrementAiUsage = () => {
    setAiQueriesUsed((prev) => prev + 1);
  };

  // Notifications
  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 19)]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const openCreatePostModal = () => setIsCreatePostModalOpen(true);
  const closeCreatePostModal = () => setIsCreatePostModalOpen(false);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const openAuthModal = (view: 'login' | 'register' | 'forgot' | 'verify' = 'login') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openOnboarding = () => setIsOnboardingOpen(true);
  const closeOnboarding = () => setIsOnboardingOpen(false);

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const refreshBackendData = async () => {
    try {
      const token = authToken || localStorage.getItem('gwl_social_token');
      const res = await fetch('/api/social/data', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
        setClientWorkspaces(data.clients || []);
        setSocialAccounts(data.accounts || []);
        setConversations(data.conversations || []);
        setAutomations(data.automations || []);
        setMediaAssets(data.media || []);
        setTeamMembers(data.teamMembers || []);
        if (data.plans && Array.isArray(data.plans) && data.plans.length > 0) setSubscriptionPlans(data.plans);
        setPaymentHistory(data.payments || []);
        if (data.users && data.users.length > 0 && token) {
          const u = data.users[0];
          setCurrentUserData({
            id: u.id,
            name: u.name,
            email: u.email,
            avatar: u.avatarUrl || '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
            role: u.role as UserRole,
            accountType: u.accountType,
            onboardingCompleted: u.onboardingCompleted,
            phone: u.phone
          });
          setCurrentUserRole(u.role as UserRole);
        }
      }
      await refreshUsageStats();
    } catch {
      // Offline fallback: keep local state
    }
  };

  useEffect(() => {
    refreshBackendData();
  }, [authToken]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/social/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Authentication failed.' };
      }

      setAuthToken(data.token);
      localStorage.setItem('gwl_social_token', data.token);

      const mappedUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatarUrl || '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
        role: data.user.role as UserRole,
        accountType: data.user.accountType,
        onboardingCompleted: data.user.onboardingCompleted
      };

      setCurrentUserData(mappedUser);
      setCurrentUserRole(data.user.role as UserRole);
      localStorage.setItem('gwl_social_user', JSON.stringify(mappedUser));

      addNotification({
        title: 'Welcome Back',
        message: `Signed in as ${data.user.name} (${data.user.role})`,
        type: 'success'
      });

      if (!data.user.onboardingCompleted) {
        setIsOnboardingOpen(true);
      }

      await refreshBackendData();
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Network error.' };
    }
  };

  const loginAsDemo = async (role: 'super_admin' | 'agency_admin' | 'freelancer') => {
    if (role === 'super_admin') {
      await login('admin@commandcenter.local', 'Admin@123456');
    }
  };

  const register = async (userData: any) => {
    try {
      const res = await fetch('/api/social/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed.' };
      }

      setPendingVerificationEmail(userData.email);
      setAuthToken(data.token);
      localStorage.setItem('gwl_social_token', data.token);

      const mappedUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.name)}`,
        role: data.user.role as UserRole,
        accountType: data.user.accountType,
        onboardingCompleted: false
      };
      setCurrentUserData(mappedUser);
      setCurrentUserRole(data.user.role as UserRole);
      localStorage.setItem('gwl_social_user', JSON.stringify(mappedUser));

      await refreshBackendData();
      return { success: true, verificationPin: data.verificationPin };
    } catch (e: any) {
      return { success: false, error: e.message || 'Network error.' };
    }
  };

  const verifyEmailPin = async (pin: string) => {
    try {
      const email = pendingVerificationEmail || currentUserData.email;
      const res = await fetch('/api/social/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pin })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Invalid PIN' };
      }
      setIsAuthModalOpen(false);
      setIsOnboardingOpen(true);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Verification error' };
    }
  };

  const submitOnboarding = async (data: any) => {
    try {
      if (authToken) {
        await fetch('/api/social/auth/onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(data)
        });
      }
      setCurrentUserData((prev) => ({ ...prev, onboardingCompleted: true }));
      addNotification({
        title: 'Onboarding Completed',
        message: 'Your workspace has been tailored to your selected networks and workflow.',
        type: 'success'
      });
    } catch {
      // offline fallback
      setCurrentUserData((prev) => ({ ...prev, onboardingCompleted: true }));
    }
  };

  const logout = async () => {
    try {
      if (authToken) {
        await fetch('/api/social/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
      }
    } catch {
      // ignore
    }
    setAuthToken(null);
    localStorage.removeItem('gwl_social_token');
    localStorage.removeItem('gwl_social_user');
    setPosts([]);
    setClientWorkspaces([]);
    setSocialAccounts([]);
    setConversations([]);
    setAutomations([]);
    setMediaAssets([]);
    setTeamMembers([]);
    setPaymentHistory([]);
    setUserUsage(null);
    setCurrentUserData(null);
    addNotification({
      title: 'Signed Out',
      message: 'You have been safely signed out.',
      type: 'info'
    });
  };

  const loginWithGoogle = async (profile?: { email: string; name: string; avatarUrl?: string }) => {
    try {
      const email = profile?.email || 'google.user@gmail.com';
      const name = profile?.name || 'Google User';
      const avatarUrl = profile?.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`;

      const res = await fetch('/api/social/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, avatarUrl })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Google SSO failed' };
      }

      setAuthToken(data.token);
      localStorage.setItem('gwl_social_token', data.token);

      const mappedUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatarUrl || avatarUrl,
        role: data.user.role as UserRole,
        accountType: data.user.accountType,
        onboardingCompleted: data.user.onboardingCompleted
      };
      setCurrentUserData(mappedUser);
      setCurrentUserRole(data.user.role as UserRole);
      localStorage.setItem('gwl_social_user', JSON.stringify(mappedUser));

      addNotification({
        title: 'Google Sign-In Successful',
        message: `Welcome, ${data.user.name}! Your workspace is ready.`,
        type: 'success'
      });

      await refreshBackendData();
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Google SSO failed' };
    }
  };

  const deleteAccount = async () => {
    try {
      const token = authToken || localStorage.getItem('gwl_social_token');
      if (!token) {
        return { success: false, error: 'Not authenticated' };
      }

      const res = await fetch('/api/social/user/account', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to delete account' };
      }

      await logout();
      addNotification({
        title: 'Account Permanently Deleted',
        message: 'Your account and all associated workspace records have been permanently purged.',
        type: 'warning'
      });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to delete account' };
    }
  };

  const currentUser = currentUserData || {
    id: '',
    name: 'Guest User',
    email: '',
    avatar: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    role: 'agency_admin' as UserRole
  };

  const automationRules = automations.map((a) => ({
    id: a.id,
    clientId: a.clientId,
    name: a.name,
    platform: a.triggerConfig?.platform || 'all',
    trigger: a.triggerType === 'keyword_comment' ? 'comment_keyword' : a.triggerType === 'new_dm' ? 'new_conversation' : 'keyword_match',
    condition: a.triggerConfig?.keywords?.length ? `Message contains "${a.triggerConfig.keywords.join(', ')}"` : undefined,
    action: a.actionType === 'send_message' ? 'reply_message' : a.actionType === 'add_tag' ? 'tag_customer' : 'assign_agent',
    actionPayload: a.actionConfig?.replyText || a.actionConfig?.tagToAdd || a.actionConfig?.assigneeId || '',
    enabled: a.isActive,
    executionCount: a.executionCount,
    createdAt: a.lastTriggeredAt || new Date().toISOString()
  }));

  const toggleAutomationRule = (id: string) => toggleAutomation(id);
  const deleteAutomationRule = (id: string) => deleteAutomation(id);
  const createAutomationRule = (rule: any) => {
    addAutomation({
      clientId: rule.clientId || 'c-georgians',
      name: rule.name,
      description: rule.condition || 'Automated rule',
      triggerType: rule.trigger === 'comment_keyword' ? 'keyword_comment' : rule.trigger === 'new_dm' ? 'new_dm' : 'keyword_comment',
      triggerConfig: {
        platform: rule.platform === 'all' ? undefined : rule.platform,
        keywords: rule.condition ? [rule.condition] : []
      },
      conditionConfig: {},
      actionType: rule.action === 'tag_customer' ? 'add_tag' : rule.action === 'assign_agent' ? 'assign_team' : 'send_message',
      actionConfig: {
        replyText: rule.actionPayload,
        tagToAdd: rule.actionPayload
      },
      isActive: true
    });
  };

  const mediaLibrary = mediaAssets.map((m) => ({
    id: m.id,
    clientId: m.clientId,
    name: m.title,
    type: m.type,
    url: m.url,
    size: m.fileSize,
    folder: m.folder,
    tags: m.tags,
    uploadedAt: m.createdAt
  }));

  const uploadMedia = (item: any) => {
    addMediaAsset({
      clientId: item.clientId || 'c-georgians',
      title: item.name,
      url: item.url,
      type: item.type,
      fileSize: item.size || '1.8 MB',
      resolution: '1920x1080',
      folder: item.folder || 'Campaign Assets',
      tags: item.tags || []
    });
  };

  const deleteMedia = (id: string) => deleteMediaAsset(id);

  return (
    <SocialCommandContext.Provider
      value={{
        activeSection,
        setActiveSection,
        activeClientId,
        setActiveClientId,
        activeClient,
        clientWorkspaces,
        addClientWorkspace,
        updateClientWorkspace,
        deleteClientWorkspace,
        socialAccounts,
        connectAccount,
        disconnectAccount,
        reconnectAccount,
        posts,
        createPost,
        updatePost,
        deletePost,
        publishPostNow,
        approvePost,
        requestChangesOnPost,
        conversations,
        sendReplyMessage,
        addInternalNote,
        assignConversation,
        updateConversationStatus,
        addConversationTag,
        automations,
        toggleAutomation,
        addAutomation,
        deleteAutomation,
        mediaAssets,
        addMediaAsset,
        deleteMediaAsset,
        teamMembers,
        currentUserRole,
        setCurrentUserRole,
        addTeamMember,
        updateTeamMemberRole,
        subscriptionPlans,
        currentPlanId,
        updateSubscriptionPlan,
        updateSubscriptionPlanConfig,
        userUsage,
        refreshUsageStats,
        paymentHistory,
        refreshPaymentHistory,
        initiateRazorpayPayment,
        aiQueriesUsed,
        incrementAiUsage,
        isPaywallOpen,
        paywallConfig,
        openPaywall,
        closePaywall,
        isCreatePostModalOpen,
        openCreatePostModal,
        closeCreatePostModal,
        notifications,
        markAllNotificationsRead,
        addNotification,
        onExitToMainSite,

        // Alias bindings
        currentTab: activeSection,
        setCurrentTab: setActiveSection,
        clients: clientWorkspaces,
        currentClient: activeClient,
        setCurrentClientId: setActiveClientId,
        unreadNotificationCount,
        markNotificationAsRead,
        currentUser,
        automationRules,
        toggleAutomationRule,
        deleteAutomationRule,
        createAutomationRule,
        mediaLibrary,
        uploadMedia,
        deleteMedia,

        // Auth, Profile & Onboarding
        authToken,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalView,
        setAuthModalView,
        pendingVerificationEmail,
        isOnboardingOpen,
        openOnboarding,
        closeOnboarding,
        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        isAuthenticated,
        login,
        loginWithGoogle,
        deleteAccount,
        loginAsDemo,
        register,
        verifyEmailPin,
        submitOnboarding,
        logout,
        refreshBackendData
      }}
    >
      {children}
      <FeatureGateModal
        isOpen={isPaywallOpen}
        onClose={closePaywall}
        featureTitle={paywallConfig.title}
        featureDescription={paywallConfig.description}
        recommendedPlanId={paywallConfig.recommendedPlanId}
        currentUsageSnippet={paywallConfig.usageSnippet}
      />
    </SocialCommandContext.Provider>
  );
};

export const useSocialCommand = () => {
  const context = useContext(SocialCommandContext);
  if (!context) {
    throw new Error('useSocialCommand must be used within a SocialCommandProvider');
  }
  return context;
};
