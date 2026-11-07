import {
  ClientWorkspace,
  SocialAccount,
  SocialPost,
  InboxConversation,
  AutomationWorkflow,
  MediaAsset,
  TeamMember,
  SubscriptionConfig
} from '../types';

/**
 * PRODUCTION MULTI-USER SYSTEM INITIAL STATE
 * 
 * In accordance with strict multi-tenant architecture and public open-source standards:
 * No hardcoded demo profiles, fake followers, sample posts, or simulated engagement metrics.
 * Every user starts with a completely clean slate and manages only their own verified data.
 */

export const INITIAL_CLIENT_WORKSPACES: ClientWorkspace[] = [];
export const INITIAL_SOCIAL_ACCOUNTS: SocialAccount[] = [];
export const INITIAL_SOCIAL_POSTS: SocialPost[] = [];
export const INITIAL_INBOX_CONVERSATIONS: InboxConversation[] = [];
export const INITIAL_AUTOMATIONS: AutomationWorkflow[] = [];
export const INITIAL_MEDIA_ASSETS: MediaAsset[] = [];
export const INITIAL_TEAM_MEMBERS: TeamMember[] = [];

export const INITIAL_SUBSCRIPTION_PLANS: SubscriptionConfig[] = [
  {
    planId: 'free',
    name: 'Free Trial',
    monthlyPrice: 0,
    annualPrice: 0,
    currency: 'INR',
    maxClients: 1,
    maxConnectedAccounts: 3,
    maxTeamMembers: 1,
    maxScheduledPostsPerMonth: 20,
    aiQueriesLimitPerMonth: 15,
    features: [
      '1 Personal Workspace',
      '3 Connected Social Accounts',
      '20 Scheduled Posts / month',
      'Unified Publishing Studio',
      'Basic Content Calendar',
      'Community & Docs Support'
    ]
  },
  {
    planId: 'starter',
    name: 'Starter Marketer',
    monthlyPrice: 1999,
    annualPrice: 19990,
    currency: 'INR',
    maxClients: 3,
    maxConnectedAccounts: 10,
    maxTeamMembers: 2,
    maxScheduledPostsPerMonth: 150,
    aiQueriesLimitPerMonth: 100,
    features: [
      'Up to 3 Client Workspaces',
      '10 Connected Social Accounts',
      '150 Scheduled Posts / month',
      'Unified Publishing Studio & Multi-device Preview',
      'Content Calendar (Month/Week views)',
      'AI Assistant (100 queries/mo)',
      'Basic Analytics & Follower Growth',
      'Email & WhatsApp Support'
    ]
  },
  {
    planId: 'professional',
    name: 'Growth Business',
    monthlyPrice: 4999,
    annualPrice: 49990,
    currency: 'INR',
    maxClients: 10,
    maxConnectedAccounts: 30,
    maxTeamMembers: 6,
    maxScheduledPostsPerMonth: 600,
    aiQueriesLimitPerMonth: 400,
    isPopular: true,
    features: [
      'Up to 10 Client Workspaces',
      '30 Connected Social Accounts',
      '600 Scheduled Posts / month',
      'Unified Inbox (IG, WhatsApp, FB, YouTube)',
      'Team Assignment & Internal Private Notes',
      'Automation Center (Keyword & Welcome Bots)',
      'AI Assistant (400 queries/mo)',
      'One-Click PDF Client Report Exports',
      'Priority Support SLA'
    ]
  },
  {
    planId: 'agency',
    name: 'Digital Agency Suite',
    monthlyPrice: 9999,
    annualPrice: 99990,
    currency: 'INR',
    maxClients: 25,
    maxConnectedAccounts: 100,
    maxTeamMembers: 15,
    maxScheduledPostsPerMonth: 2500,
    aiQueriesLimitPerMonth: 1500,
    features: [
      'Up to 25 Client Workspaces',
      '100 Connected Social Accounts',
      'Unlimited Scheduled Posts',
      'Client Approval Workflows (Client Portal)',
      'Role-based Access Control (6 distinct roles)',
      'White-label Branded Client Reports',
      'Advanced Automation & Webhooks',
      'AI Assistant (1,500 queries/mo)',
      'Dedicated Account Manager'
    ]
  },
  {
    planId: 'enterprise',
    name: 'Enterprise Scale',
    monthlyPrice: 19999,
    annualPrice: 199990,
    currency: 'INR',
    maxClients: 100,
    maxConnectedAccounts: 500,
    maxTeamMembers: 50,
    maxScheduledPostsPerMonth: 10000,
    aiQueriesLimitPerMonth: 5000,
    features: [
      'Unlimited Client Workspaces',
      'Custom Connected Social Accounts',
      'Custom High-Throughput API Quotas',
      'Custom Webhook Integrations',
      'Dedicated Cloud DB & Isolated Instances',
      'Custom AI Fine-Tuning on Brand Voice',
      '24/7 Dedicated Emergency Phone Support',
      'Custom SLA & Legal Contracts'
    ]
  }
];
