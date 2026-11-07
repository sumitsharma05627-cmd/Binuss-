export type SocialPlatformType =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'linkedin'
  | 'twitter'
  | 'pinterest'
  | 'tiktok'
  | 'reddit'
  | 'telegram'
  | 'whatsapp';

export type AccountConnectionStatus = 'connected' | 'disconnected' | 'expiring_soon' | 'action_required';

export interface SocialAccount {
  id: string;
  clientId: string; // workspace association
  platform: SocialPlatformType;
  accountName: string;
  accountHandle: string;
  avatarUrl: string;
  profileUrl: string;
  status: AccountConnectionStatus;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  connectedAt: string;
  tokenExpiresAt: string | null;
  permissions: string[];
  capabilities: {
    canPublishFeed: boolean;
    canPublishReelOrShort: boolean;
    canPublishStory: boolean;
    canReadDirectMessages: boolean;
    canReadComments: boolean;
    hasAnalytics: boolean;
  };
  apiDetails: {
    appId?: string;
    authType: 'oauth2' | 'bot_token' | 'cloud_api';
    scopeGranted: string[];
    rateLimitRemaining?: number;
    officialDocsUrl: string;
  };
}

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed' | 'pending_approval';

export interface SocialPost {
  id: string;
  clientId: string;
  title?: string;
  caption: string;
  platforms: SocialPlatformType[];
  mediaUrls: string[];
  mediaType: 'image' | 'video' | 'carousel' | 'text_only';
  hashtags: string[];
  status: PostStatus;
  createdAt: string;
  scheduledFor?: string;
  publishedAt?: string;
  authorName: string;
  authorAvatar: string;
  metrics?: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    impressions: number;
    reach: number;
    clicks: number;
  };
  platformCustomizations?: Partial<Record<SocialPlatformType, {
    customCaption?: string;
    firstCommentHashtags?: string;
    pinBoardId?: string;
    subreddit?: string;
    reelOrShort?: boolean;
    callToActionUrl?: string;
  }>>;
  failureReason?: string;
  clientApproved?: boolean;
  clientComments?: string[];
}

export interface ClientWorkspace {
  id: string;
  name: string;
  companyName: string;
  slug: string;
  logoUrl: string;
  industry: string;
  website: string;
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  planTier: 'starter' | 'professional' | 'agency' | 'enterprise';
  accountIds: string[];
  assignedTeamMemberIds: string[];
  approvalRequired: boolean;
  brandColors: {
    primary: string;
    secondary: string;
  };
  createdAt: string;
}

export type UserRole =
  | 'super_admin'
  | 'agency_admin'
  | 'manager'
  | 'content_creator'
  | 'customer_support'
  | 'client';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  avatar?: string;
  role: UserRole;
  assignedClientIds: string[];
  status: 'active' | 'invited' | 'disabled';
  joinedAt?: string;
}

export interface InboxConversation {
  id: string;
  clientId: string;
  platform: SocialPlatformType;
  customer: {
    id: string;
    name: string;
    handle: string;
    avatarUrl: string;
    email?: string;
    phone?: string;
    sentiment?: 'positive' | 'neutral' | 'negative' | 'urgent';
    tags: string[];
    lifetimeOrdersOrValue?: string;
  };
  lastMessageSnippet: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  status: 'open' | 'resolved' | 'pending';
  assignedTo?: string; // TeamMember id
  internalNotes: Array<{
    id: string;
    authorName: string;
    text: string;
    createdAt: string;
  }>;
  messages: Array<{
    id: string;
    sender: 'customer' | 'agent' | 'bot';
    senderName: string;
    text: string;
    mediaUrl?: string;
    timestamp: string;
    delivered?: boolean;
    read?: boolean;
  }>;
}

export interface AutomationWorkflow {
  id: string;
  clientId: string;
  name: string;
  description: string;
  triggerType: 'new_dm' | 'keyword_comment' | 'new_lead' | 'no_reply_24h';
  triggerConfig: {
    platform?: SocialPlatformType;
    keywords?: string[];
  };
  conditionConfig: {
    tagCheck?: string;
    timeWindow?: string;
  };
  actionType: 'send_message' | 'assign_team' | 'add_tag' | 'notify_slack_or_email';
  actionConfig: {
    replyText?: string;
    assigneeId?: string;
    tagToAdd?: string;
  };
  isActive: boolean;
  executionCount: number;
  lastTriggeredAt?: string;
}

export interface MediaAsset {
  id: string;
  clientId: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  fileSize: string;
  resolution: string;
  folder: string;
  tags: string[];
  createdAt: string;
}

export interface SubscriptionConfig {
  planId: 'free' | 'starter' | 'professional' | 'agency' | 'enterprise';
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  currency: 'INR' | 'USD';
  maxClients: number;
  maxConnectedAccounts: number;
  maxTeamMembers: number;
  maxScheduledPostsPerMonth: number;
  aiQueriesLimitPerMonth: number;
  features: string[];
  isPopular?: boolean;
}

export interface SocialNavSection {
  id:
    | 'overview'
    | 'accounts'
    | 'publishing'
    | 'calendar'
    | 'inbox'
    | 'ai_assistant'
    | 'clients'
    | 'analytics'
    | 'automation'
    | 'media'
    | 'team'
    | 'subscriptions'
    | 'super_admin';
  label: string;
  badge?: number | string;
}

export interface AutomationRule {
  id: string;
  clientId?: string;
  name: string;
  platform: 'all' | SocialPlatformType;
  trigger: 'keyword_match' | 'comment_keyword' | 'new_conversation' | 'unanswered_time';
  condition?: string;
  action: 'reply_message' | 'tag_customer' | 'assign_agent' | 'create_lead';
  actionPayload: string;
  enabled: boolean;
  executionCount: number;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  clientId?: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  size: string;
  folder: string;
  tags: string[];
  uploadedAt: string;
}

export interface SubscriptionPlan {
  id: string;
  tier: 'free' | 'starter' | 'professional' | 'agency' | 'enterprise';
  name: string;
  priceMonthly: number;
  priceYearly: number;
  maxClients: number;
  maxAccounts: number;
  features: {
    maxScheduledPosts: number;
    aiGenerationsPerMonth: number;
    analyticsExport: boolean;
    whiteLabeling: boolean;
  };
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  orderId: string;
  paymentId?: string;
  signature?: string;
  planId: 'free' | 'starter' | 'professional' | 'agency' | 'enterprise';
  planName: string;
  billingCycle: 'monthly' | 'annual';
  amount: number;
  currency: 'INR';
  status: 'created' | 'verified' | 'failed' | 'refunded';
  invoiceNumber: string;
  method?: string;
  createdAt: string;
  verifiedAt?: string;
}

export interface UserUsageStats {
  planTier: 'free' | 'starter' | 'professional' | 'agency' | 'enterprise';
  planName: string;
  status: 'active' | 'trialing' | 'past_due' | 'cancelled' | 'expired';
  billingCycle: 'monthly' | 'annual';
  expiresAt: string;
  postsUsedThisMonth: number;
  postsLimit: number;
  aiQueriesUsedThisMonth: number;
  aiQueriesLimit: number;
  connectedAccountsCount: number;
  connectedAccountsLimit: number;
  clientWorkspacesCount: number;
  clientWorkspacesLimit: number;
  canCreatePost: boolean;
  canRunAiQuery: boolean;
  canConnectAccount: boolean;
  canCreateWorkspace: boolean;
  canExportPdf: boolean;
  canWhiteLabel: boolean;
}
