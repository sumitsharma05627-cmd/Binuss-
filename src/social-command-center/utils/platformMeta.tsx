import React from 'react';
import { SocialPlatformType } from '../types';
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Send,
  MessageCircle,
  Share2,
  Bookmark
} from 'lucide-react';

export interface PlatformConfig {
  id: SocialPlatformType;
  name: string;
  brandColor: string;
  bgBadge: string;
  borderBadge: string;
  textColor: string;
  charLimit: number;
  supportsVideo: boolean;
  supportsCarousel: boolean;
  supportsReelsOrShorts: boolean;
  supportsDirectMessages: boolean;
  supportsComments: boolean;
  officialDeveloperUrl: string;
  authMethod: 'OAuth 2.0 (PKCE/Bearer)' | 'Bot Token' | 'Meta Cloud API System User';
  requiredScopes: string[];
  setupGuideSummary: string;
}

export const PLATFORM_REGISTRY: Record<SocialPlatformType, PlatformConfig> = {
  instagram: {
    id: 'instagram',
    name: 'Instagram Business',
    brandColor: '#E1306C',
    bgBadge: 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20',
    borderBadge: 'border-pink-500/30',
    textColor: 'text-pink-400',
    charLimit: 2200,
    supportsVideo: true,
    supportsCarousel: true,
    supportsReelsOrShorts: true,
    supportsDirectMessages: true,
    supportsComments: true,
    officialDeveloperUrl: 'https://developers.facebook.com/docs/instagram-platform',
    authMethod: 'OAuth 2.0 (PKCE/Bearer)',
    requiredScopes: [
      'instagram_basic',
      'instagram_content_publish',
      'instagram_manage_comments',
      'instagram_manage_messages',
      'pages_show_list',
      'pages_read_engagement'
    ],
    setupGuideSummary: 'Requires a Meta for Developers App connected to a Facebook Page linked to an Instagram Professional/Creator account.'
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook Pages',
    brandColor: '#1877F2',
    bgBadge: 'bg-blue-600/20',
    borderBadge: 'border-blue-500/30',
    textColor: 'text-blue-400',
    charLimit: 63206,
    supportsVideo: true,
    supportsCarousel: true,
    supportsReelsOrShorts: true,
    supportsDirectMessages: true,
    supportsComments: true,
    officialDeveloperUrl: 'https://developers.facebook.com/docs/pages',
    authMethod: 'OAuth 2.0 (PKCE/Bearer)',
    requiredScopes: [
      'pages_manage_posts',
      'pages_read_engagement',
      'pages_messaging',
      'pages_show_list'
    ],
    setupGuideSummary: 'Requires Page Admin role with pages_manage_posts and pages_messaging permissions approved by Meta App Review.'
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube & Shorts',
    brandColor: '#FF0000',
    bgBadge: 'bg-red-600/20',
    borderBadge: 'border-red-500/30',
    textColor: 'text-red-400',
    charLimit: 5000,
    supportsVideo: true,
    supportsCarousel: false,
    supportsReelsOrShorts: true,
    supportsDirectMessages: false,
    supportsComments: true,
    officialDeveloperUrl: 'https://developers.google.com/youtube/v3',
    authMethod: 'OAuth 2.0 (PKCE/Bearer)',
    requiredScopes: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtube.readonly'
    ],
    setupGuideSummary: 'Requires Google Cloud Console OAuth 2.0 Client credentials with YouTube Data API v3 enabled.'
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn Organization',
    brandColor: '#0A66C2',
    bgBadge: 'bg-sky-600/20',
    borderBadge: 'border-sky-500/30',
    textColor: 'text-sky-400',
    charLimit: 3000,
    supportsVideo: true,
    supportsCarousel: true,
    supportsReelsOrShorts: false,
    supportsDirectMessages: false,
    supportsComments: true,
    officialDeveloperUrl: 'https://learn.microsoft.com/en-us/linkedin/marketing',
    authMethod: 'OAuth 2.0 (PKCE/Bearer)',
    requiredScopes: [
      'w_organization_social',
      'r_organization_social',
      'rw_organization_admin'
    ],
    setupGuideSummary: 'Requires a LinkedIn Developer App with the "Share on LinkedIn" and "Community Management API" products added.'
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter)',
    brandColor: '#1D9BF0',
    bgBadge: 'bg-slate-700/25',
    borderBadge: 'border-slate-500/30',
    textColor: 'text-slate-200',
    charLimit: 280,
    supportsVideo: true,
    supportsCarousel: false,
    supportsReelsOrShorts: true,
    supportsDirectMessages: true,
    supportsComments: true,
    officialDeveloperUrl: 'https://developer.x.com/en/docs/x-api',
    authMethod: 'OAuth 2.0 (PKCE/Bearer)',
    requiredScopes: [
      'tweet.read',
      'tweet.write',
      'users.read',
      'offline.access',
      'dm.write'
    ],
    setupGuideSummary: 'Requires X Developer Portal App with OAuth 2.0 User Context enabled and read/write permissions.'
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest Boards',
    brandColor: '#BD081C',
    bgBadge: 'bg-rose-600/20',
    borderBadge: 'border-rose-500/30',
    textColor: 'text-rose-400',
    charLimit: 500,
    supportsVideo: true,
    supportsCarousel: false,
    supportsReelsOrShorts: false,
    supportsDirectMessages: false,
    supportsComments: false,
    officialDeveloperUrl: 'https://developers.pinterest.com/docs/api/v5/',
    authMethod: 'OAuth 2.0 (PKCE/Bearer)',
    requiredScopes: [
      'boards:read',
      'pins:read',
      'pins:write'
    ],
    setupGuideSummary: 'Requires a Pinterest Business account and approved Developer App from the Pinterest Developers portal.'
  },
  reddit: {
    id: 'reddit',
    name: 'Reddit Communities',
    brandColor: '#FF4500',
    bgBadge: 'bg-orange-600/20',
    borderBadge: 'border-orange-500/30',
    textColor: 'text-orange-400',
    charLimit: 40000,
    supportsVideo: true,
    supportsCarousel: false,
    supportsReelsOrShorts: false,
    supportsDirectMessages: true,
    supportsComments: true,
    officialDeveloperUrl: 'https://www.reddit.com/dev/api',
    authMethod: 'OAuth 2.0 (PKCE/Bearer)',
    requiredScopes: [
      'identity',
      'submit',
      'read',
      'privatemessages'
    ],
    setupGuideSummary: 'Requires Reddit App registration as "web app" with redirect URI and client credentials.'
  },
  telegram: {
    id: 'telegram',
    name: 'Telegram Channels & Groups',
    brandColor: '#229ED9',
    bgBadge: 'bg-cyan-600/20',
    borderBadge: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    charLimit: 4096,
    supportsVideo: true,
    supportsCarousel: true,
    supportsReelsOrShorts: false,
    supportsDirectMessages: true,
    supportsComments: true,
    officialDeveloperUrl: 'https://core.telegram.org/bots/api',
    authMethod: 'Bot Token',
    requiredScopes: [
      'sendMessage',
      'sendPhoto',
      'sendVideo',
      'sendDocument'
    ],
    setupGuideSummary: 'Generate an API token instantly via @BotFather and add your bot as an Administrator with post permissions to your channel.'
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    brandColor: '#25D366',
    bgBadge: 'bg-emerald-600/20',
    borderBadge: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    charLimit: 4096,
    supportsVideo: false,
    supportsCarousel: false,
    supportsReelsOrShorts: false,
    supportsDirectMessages: true,
    supportsComments: false,
    officialDeveloperUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api',
    authMethod: 'Meta Cloud API System User',
    requiredScopes: [
      'whatsapp_business_messaging',
      'whatsapp_business_management'
    ],
    setupGuideSummary: 'Uses Meta WhatsApp Cloud API (requires Phone Number ID, WABA ID, and Permanent System User Access Token). Note: Personal WhatsApp numbers are not accessible via official APIs.'
  }
};

export const getPlatformIcon = (platform: SocialPlatformType, className = 'w-4 h-4'): React.ReactNode => {
  switch (platform) {
    case 'instagram':
      return <Instagram className={className} />;
    case 'facebook':
      return <Facebook className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'twitter':
      return <Twitter className={className} />;
    case 'pinterest':
      return <Bookmark className={className} />;
    case 'reddit':
      return <Share2 className={className} />;
    case 'telegram':
      return <Send className={className} />;
    case 'whatsapp':
      return <MessageCircle className={className} />;
    default:
      return <Share2 className={className} />;
  }
};
