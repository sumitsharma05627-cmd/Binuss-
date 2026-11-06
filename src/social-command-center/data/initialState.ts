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

export const INITIAL_CLIENT_WORKSPACES: ClientWorkspace[] = [
  {
    id: 'client-gwl',
    name: 'Gwalior Web Labs (HQ)',
    companyName: 'Gwalior Web Labs Digital Innovations',
    slug: 'gwl-hq',
    logoUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    industry: 'Digital Agency & Cloud Engineering',
    website: 'https://gwlweblab.com',
    primaryContact: {
      name: 'Sumit Sharma',
      email: 'gwaliorweblabs@gmail.com',
      phone: '+91 75879 39722'
    },
    planTier: 'enterprise',
    accountIds: ['acc-ig-gwl', 'acc-li-gwl', 'acc-yt-gwl', 'acc-x-gwl', 'acc-wa-gwl'],
    assignedTeamMemberIds: ['user-1', 'user-2', 'user-3'],
    approvalRequired: false,
    brandColors: {
      primary: '#10b981',
      secondary: '#3b82f6'
    },
    createdAt: '2026-01-10T10:00:00.000Z'
  },
  {
    id: 'client-georgians',
    name: 'Georgians Academy',
    companyName: 'Georgians Academy Higher Secondary School',
    slug: 'georgians-academy',
    logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
    industry: 'Education & Academic Coaching',
    website: 'https://georgians.gwlweblab.dev',
    primaryContact: {
      name: 'Director R. K. Sharma',
      email: 'admissions@georgiansacademy.edu.in',
      phone: '+91 75124 58900'
    },
    planTier: 'agency',
    accountIds: ['acc-ig-geo', 'acc-fb-geo', 'acc-yt-geo', 'acc-wa-geo'],
    assignedTeamMemberIds: ['user-2', 'user-4'],
    approvalRequired: true,
    brandColors: {
      primary: '#2563eb',
      secondary: '#f59e0b'
    },
    createdAt: '2026-02-15T09:30:00.000Z'
  },
  {
    id: 'client-yanshi',
    name: 'Yanshi Physiotherapy',
    companyName: 'Yanshi Neuro-Spine & Ortho Rehabilitation Center',
    slug: 'yanshi-physio',
    logoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80',
    industry: 'Healthcare & Clinical Practice',
    website: 'https://yanshi.gwlweblab.dev',
    primaryContact: {
      name: 'Dr. Neha Verma (PT)',
      email: 'care@yanshiphysio.com',
      phone: '+91 94251 12345'
    },
    planTier: 'professional',
    accountIds: ['acc-ig-yan', 'acc-fb-yan', 'acc-wa-yan'],
    assignedTeamMemberIds: ['user-3', 'user-5'],
    approvalRequired: true,
    brandColors: {
      primary: '#059669',
      secondary: '#06b6d4'
    },
    createdAt: '2026-03-01T11:00:00.000Z'
  },
  {
    id: 'client-brightedge',
    name: 'BrightEdge Academy',
    companyName: 'BrightEdge Pan-India NEET & JEE LMS',
    slug: 'brightedge',
    logoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80',
    industry: 'EdTech & Online Test Prep',
    website: 'https://brightedge.gwlweblab.dev',
    primaryContact: {
      name: 'Vikram Rajput',
      email: 'growth@brightedge.in',
      phone: '+91 98930 77112'
    },
    planTier: 'agency',
    accountIds: ['acc-yt-bright', 'acc-tg-bright', 'acc-x-bright', 'acc-ig-bright'],
    assignedTeamMemberIds: ['user-1', 'user-4'],
    approvalRequired: false,
    brandColors: {
      primary: '#7c3aed',
      secondary: '#ec4899'
    },
    createdAt: '2026-03-20T14:15:00.000Z'
  }
];

export const INITIAL_SOCIAL_ACCOUNTS: SocialAccount[] = [
  // GWL HQ Accounts
  {
    id: 'acc-ig-gwl',
    clientId: 'client-gwl',
    platform: 'instagram',
    accountName: 'Gwalior Web Labs Official',
    accountHandle: '@gwlweblabs',
    avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    profileUrl: 'https://instagram.com/gwlweblabs',
    status: 'connected',
    followersCount: 14280,
    followingCount: 230,
    postsCount: 312,
    connectedAt: '2026-01-12T10:00:00Z',
    tokenExpiresAt: '2026-12-31T23:59:59Z',
    permissions: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments', 'instagram_manage_messages'],
    capabilities: {
      canPublishFeed: true,
      canPublishReelOrShort: true,
      canPublishStory: true,
      canReadDirectMessages: true,
      canReadComments: true,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'meta-app-9081239102',
      authType: 'oauth2',
      scopeGranted: ['pages_show_list', 'instagram_basic', 'instagram_content_publish', 'pages_read_engagement'],
      rateLimitRemaining: 184,
      officialDocsUrl: 'https://developers.facebook.com/docs/instagram-platform'
    }
  },
  {
    id: 'acc-li-gwl',
    clientId: 'client-gwl',
    platform: 'linkedin',
    accountName: 'Gwalior Web Labs',
    accountHandle: 'company/gwalior-web-labs',
    avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    profileUrl: 'https://linkedin.com/company/gwalior-web-labs',
    status: 'connected',
    followersCount: 8940,
    followingCount: 88,
    postsCount: 184,
    connectedAt: '2026-01-14T11:00:00Z',
    tokenExpiresAt: '2026-08-20T10:00:00Z',
    permissions: ['w_member_social', 'w_organization_social', 'r_organization_social', 'rw_organization_admin'],
    capabilities: {
      canPublishFeed: true,
      canPublishReelOrShort: false,
      canPublishStory: false,
      canReadDirectMessages: false,
      canReadComments: true,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'linkedin-app-7849102',
      authType: 'oauth2',
      scopeGranted: ['w_organization_social', 'r_organization_social'],
      rateLimitRemaining: 490,
      officialDocsUrl: 'https://learn.microsoft.com/en-us/linkedin/marketing'
    }
  },
  {
    id: 'acc-yt-gwl',
    clientId: 'client-gwl',
    platform: 'youtube',
    accountName: 'GWL Web Labs – Tech & Systems',
    accountHandle: '@GWLWebLabs',
    avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    profileUrl: 'https://youtube.com/@GWLWebLabs',
    status: 'connected',
    followersCount: 32600,
    followingCount: 42,
    postsCount: 146,
    connectedAt: '2026-01-15T15:00:00Z',
    tokenExpiresAt: '2027-01-01T00:00:00Z',
    permissions: ['youtube.upload', 'youtube.readonly', 'youtubepartner'],
    capabilities: {
      canPublishFeed: false,
      canPublishReelOrShort: true,
      canPublishStory: false,
      canReadDirectMessages: false,
      canReadComments: true,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'google-cloud-project-gwl',
      authType: 'oauth2',
      scopeGranted: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.force-ssl'],
      rateLimitRemaining: 9400,
      officialDocsUrl: 'https://developers.google.com/youtube/v3'
    }
  },
  {
    id: 'acc-x-gwl',
    clientId: 'client-gwl',
    platform: 'twitter',
    accountName: 'GWL Web Labs',
    accountHandle: '@gwlweblabs',
    avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    profileUrl: 'https://x.com/gwlweblabs',
    status: 'connected',
    followersCount: 11450,
    followingCount: 310,
    postsCount: 1240,
    connectedAt: '2026-02-01T12:00:00Z',
    tokenExpiresAt: '2026-06-15T12:00:00Z',
    permissions: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    capabilities: {
      canPublishFeed: true,
      canPublishReelOrShort: true,
      canPublishStory: false,
      canReadDirectMessages: true,
      canReadComments: true,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'x-dev-v2-49182',
      authType: 'oauth2',
      scopeGranted: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
      rateLimitRemaining: 295,
      officialDocsUrl: 'https://developer.x.com/en/docs/x-api'
    }
  },
  {
    id: 'acc-wa-gwl',
    clientId: 'client-gwl',
    platform: 'whatsapp',
    accountName: 'GWL Web Labs Official WhatsApp',
    accountHandle: '+91 75879 39722',
    avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    profileUrl: 'https://wa.me/917587939722',
    status: 'connected',
    followersCount: 4890,
    followingCount: 0,
    postsCount: 0,
    connectedAt: '2026-01-10T10:00:00Z',
    tokenExpiresAt: null,
    permissions: ['whatsapp_business_messaging', 'whatsapp_business_management'],
    capabilities: {
      canPublishFeed: false,
      canPublishReelOrShort: false,
      canPublishStory: false,
      canReadDirectMessages: true,
      canReadComments: false,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'waba-phone-id-104928301',
      authType: 'cloud_api',
      scopeGranted: ['whatsapp_business_messaging'],
      rateLimitRemaining: 1000,
      officialDocsUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api'
    }
  },

  // Georgians Academy Accounts
  {
    id: 'acc-ig-geo',
    clientId: 'client-georgians',
    platform: 'instagram',
    accountName: 'Georgians Academy Gwalior',
    accountHandle: '@georgiansacademy_gwl',
    avatarUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://instagram.com/georgiansacademy_gwl',
    status: 'connected',
    followersCount: 19800,
    followingCount: 110,
    postsCount: 420,
    connectedAt: '2026-02-16T12:00:00Z',
    tokenExpiresAt: '2026-11-20T12:00:00Z',
    permissions: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments', 'instagram_manage_messages'],
    capabilities: {
      canPublishFeed: true,
      canPublishReelOrShort: true,
      canPublishStory: true,
      canReadDirectMessages: true,
      canReadComments: true,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'meta-app-georgians-291',
      authType: 'oauth2',
      scopeGranted: ['pages_show_list', 'instagram_basic', 'instagram_content_publish'],
      rateLimitRemaining: 192,
      officialDocsUrl: 'https://developers.facebook.com/docs/instagram-platform'
    }
  },
  {
    id: 'acc-fb-geo',
    clientId: 'client-georgians',
    platform: 'facebook',
    accountName: 'Georgians Academy Morar & Bada Gaon',
    accountHandle: 'georgiansacademygwalior',
    avatarUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://facebook.com/georgiansacademygwalior',
    status: 'connected',
    followersCount: 24500,
    followingCount: 35,
    postsCount: 580,
    connectedAt: '2026-02-16T12:30:00Z',
    tokenExpiresAt: '2026-12-10T12:00:00Z',
    permissions: ['pages_manage_posts', 'pages_read_engagement', 'pages_messaging'],
    capabilities: {
      canPublishFeed: true,
      canPublishReelOrShort: true,
      canPublishStory: true,
      canReadDirectMessages: true,
      canReadComments: true,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'meta-app-fb-geo-992',
      authType: 'oauth2',
      scopeGranted: ['pages_manage_posts', 'pages_read_engagement'],
      rateLimitRemaining: 198,
      officialDocsUrl: 'https://developers.facebook.com/docs/pages'
    }
  },
  {
    id: 'acc-yt-geo',
    clientId: 'client-georgians',
    platform: 'youtube',
    accountName: 'Georgians Academy Lectures & Events',
    accountHandle: '@GeorgiansAcademyGwalior',
    avatarUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://youtube.com/@GeorgiansAcademyGwalior',
    status: 'connected',
    followersCount: 45200,
    followingCount: 15,
    postsCount: 260,
    connectedAt: '2026-02-18T10:00:00Z',
    tokenExpiresAt: '2027-02-01T00:00:00Z',
    permissions: ['youtube.upload', 'youtube.readonly'],
    capabilities: {
      canPublishFeed: false,
      canPublishReelOrShort: true,
      canPublishStory: false,
      canReadDirectMessages: false,
      canReadComments: true,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'google-geo-yt-id',
      authType: 'oauth2',
      scopeGranted: ['https://www.googleapis.com/auth/youtube.upload'],
      rateLimitRemaining: 9850,
      officialDocsUrl: 'https://developers.google.com/youtube/v3'
    }
  },
  {
    id: 'acc-wa-geo',
    clientId: 'client-georgians',
    platform: 'whatsapp',
    accountName: 'Georgians Academy Admissions Desk',
    accountHandle: '+91 75124 58900',
    avatarUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://wa.me/917512458900',
    status: 'connected',
    followersCount: 8200,
    followingCount: 0,
    postsCount: 0,
    connectedAt: '2026-02-16T14:00:00Z',
    tokenExpiresAt: null,
    permissions: ['whatsapp_business_messaging'],
    capabilities: {
      canPublishFeed: false,
      canPublishReelOrShort: false,
      canPublishStory: false,
      canReadDirectMessages: true,
      canReadComments: false,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'waba-geo-id-8821',
      authType: 'cloud_api',
      scopeGranted: ['whatsapp_business_messaging'],
      rateLimitRemaining: 1000,
      officialDocsUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api'
    }
  },

  // Additional platforms for setup showcase (Pinterest, Reddit, Telegram)
  {
    id: 'acc-pin-gwl',
    clientId: 'client-gwl',
    platform: 'pinterest',
    accountName: 'GWL Web Designs & UI Showcase',
    accountHandle: 'gwlweblabs',
    avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    profileUrl: 'https://pinterest.com/gwlweblabs',
    status: 'connected',
    followersCount: 3920,
    followingCount: 140,
    postsCount: 95,
    connectedAt: '2026-02-25T14:00:00Z',
    tokenExpiresAt: '2026-09-15T00:00:00Z',
    permissions: ['boards:read', 'pins:read', 'pins:write'],
    capabilities: {
      canPublishFeed: true,
      canPublishReelOrShort: false,
      canPublishStory: false,
      canReadDirectMessages: false,
      canReadComments: false,
      hasAnalytics: true
    },
    apiDetails: {
      appId: 'pin-app-582910',
      authType: 'oauth2',
      scopeGranted: ['pins:write', 'boards:read'],
      rateLimitRemaining: 300,
      officialDocsUrl: 'https://developers.pinterest.com/docs/api/v5/'
    }
  },
  {
    id: 'acc-red-gwl',
    clientId: 'client-gwl',
    platform: 'reddit',
    accountName: 'u/gwl_digital_labs',
    accountHandle: 'u/gwl_digital_labs',
    avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    profileUrl: 'https://reddit.com/user/gwl_digital_labs',
    status: 'connected',
    followersCount: 1240,
    followingCount: 45,
    postsCount: 88,
    connectedAt: '2026-02-28T16:00:00Z',
    tokenExpiresAt: '2026-05-30T00:00:00Z',
    permissions: ['submit', 'read', 'privatemessages'],
    capabilities: {
      canPublishFeed: true,
      canPublishReelOrShort: false,
      canPublishStory: false,
      canReadDirectMessages: true,
      canReadComments: true,
      hasAnalytics: false
    },
    apiDetails: {
      appId: 'reddit-oauth-cli-2918',
      authType: 'oauth2',
      scopeGranted: ['submit', 'read'],
      rateLimitRemaining: 60,
      officialDocsUrl: 'https://www.reddit.com/dev/api'
    }
  },
  {
    id: 'acc-tg-bright',
    clientId: 'client-brightedge',
    platform: 'telegram',
    accountName: 'BrightEdge NEET & JEE Daily Quiz Channel',
    accountHandle: '@brightedge_neet_daily',
    avatarUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://t.me/brightedge_neet_daily',
    status: 'connected',
    followersCount: 54100,
    followingCount: 0,
    postsCount: 1420,
    connectedAt: '2026-03-21T09:00:00Z',
    tokenExpiresAt: null,
    permissions: ['send_messages', 'post_media', 'manage_chat'],
    capabilities: {
      canPublishFeed: true,
      canPublishReelOrShort: false,
      canPublishStory: false,
      canReadDirectMessages: true,
      canReadComments: true,
      hasAnalytics: false
    },
    apiDetails: {
      authType: 'bot_token',
      scopeGranted: ['sendMessage', 'sendPhoto', 'sendVideo'],
      rateLimitRemaining: 30,
      officialDocsUrl: 'https://core.telegram.org/bots/api'
    }
  }
];

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    clientId: 'client-gwl',
    title: 'Top 5 Core Web Vitals Optimization Secrets',
    caption: 'How we achieve 0.8s LCP scores for business websites in 2026:\n\n1. Zero unnecessary client bundles\n2. Edge image compression in WebP/AVIF\n3. Pre-connecting critical DNS nodes\n4. Server components with instant hydrations\n\nIs your current website passing Google Lighthouse audits? Drop your URL below for a free technical benchmark.',
    platforms: ['instagram', 'linkedin', 'twitter'],
    mediaUrls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
    mediaType: 'image',
    hashtags: ['#WebDevelopment', '#CoreWebVitals', '#SEO', '#GWLWebLabs', '#PerformanceFirst'],
    status: 'published',
    createdAt: '2026-10-20T08:30:00Z',
    publishedAt: '2026-10-20T10:00:00Z',
    authorName: 'Sumit Sharma',
    authorAvatar: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    metrics: {
      likes: 482,
      comments: 64,
      shares: 98,
      saves: 142,
      impressions: 18400,
      reach: 14900,
      clicks: 312
    }
  },
  {
    id: 'post-2',
    clientId: 'client-georgians',
    title: 'Admissions Open 2026-27 | Nursery to 12th',
    caption: 'Secure your child\'s academic future with holistic learning, experiential science laboratories, sports academies, and smart interactive classrooms.\n\nAdmissions Open for Session 2026-27.\n📍 Campuses: Morar Cantt & Bada Gaon, Gwalior\n📞 Direct Admissions Helpline: +91 75124 58900\n\nVisit our campus today or book a counselling session online.',
    platforms: ['instagram', 'facebook', 'whatsapp'],
    mediaUrls: ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'],
    mediaType: 'image',
    hashtags: ['#GeorgiansAcademy', '#GwaliorSchools', '#AdmissionsOpen2026', '#BestSchoolGwalior'],
    status: 'scheduled',
    scheduledFor: '2026-11-06T11:00:00Z',
    createdAt: '2026-11-02T14:20:00Z',
    authorName: 'Priya Joshi (Content Manager)',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    clientApproved: true
  },
  {
    id: 'post-3',
    clientId: 'client-yanshi',
    title: '5 Posture Exercises for Desk Workers & Coders',
    caption: 'Neck stiffness after 6 hours on the laptop? Try these 5 physical therapy stretches directly at your chair:\n\n1. Chin tucks (10 reps x 3 sets)\n2. Scapular retractions\n3. Upper trapezius stretch\n4. Doorway pectoral opener\n5. Seated spinal rotation\n\nSave this reel for your afternoon break!',
    platforms: ['instagram', 'facebook', 'youtube'],
    mediaUrls: ['https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'],
    mediaType: 'video',
    hashtags: ['#Physiotherapy', '#DeskJobPain', '#NeckPainRelief', '#YanshiPhysio', '#Ergonomics'],
    status: 'scheduled',
    scheduledFor: '2026-11-08T17:30:00Z',
    createdAt: '2026-11-03T10:15:00Z',
    authorName: 'Rohan Mehra (Creative)',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    clientApproved: true
  },
  {
    id: 'post-4',
    clientId: 'client-brightedge',
    title: 'NEET 2026 Organic Chemistry Formula Sheet Drop',
    caption: 'Full 1-page Reaction Roadmap for Named Organic Reactions is now live in our Telegram community! Over 42 reaction mechanisms condensed into high-yield visual mnemonics.\n\nLink in bio to download the free high-resolution PDF.',
    platforms: ['youtube', 'telegram', 'instagram'],
    mediaUrls: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'],
    mediaType: 'carousel',
    hashtags: ['#NEET2026', '#OrganicChemistry', '#BrightEdgeAcademy', '#MedicalAspirants'],
    status: 'published',
    createdAt: '2026-10-28T09:00:00Z',
    publishedAt: '2026-10-28T10:30:00Z',
    authorName: 'Sumit Sharma',
    authorAvatar: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    metrics: {
      likes: 1290,
      comments: 340,
      shares: 890,
      saves: 1450,
      impressions: 48900,
      reach: 39500,
      clicks: 1820
    }
  },
  {
    id: 'post-5',
    clientId: 'client-georgians',
    title: 'Annual Sports Meet 2026 Highlights Reel',
    caption: 'Energy, sportsmanship, and unforgettable victories! Watch the recap of the 2026 Inter-House Athletic Championships.',
    platforms: ['instagram', 'facebook', 'youtube'],
    mediaUrls: ['https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80'],
    mediaType: 'video',
    hashtags: ['#SportsMeet2026', '#GeorgiansAthletics', '#Champions', '#SchoolSpirit'],
    status: 'pending_approval',
    createdAt: '2026-11-04T08:00:00Z',
    authorName: 'Priya Joshi (Content Manager)',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    clientApproved: false,
    clientComments: ['Please verify the names of the winning gold medalists in the caption before publishing.']
  },
  {
    id: 'post-6',
    clientId: 'client-gwl',
    title: 'The Omnichannel Customer Engagement Blueprint',
    caption: 'Why isolated marketing fails: If your Instagram ads lead to an unresponsive WhatsApp inbox, you are burning 68% of your ad spend.\n\nDiscover how unified communication workflows increase qualified conversions by 310%.',
    platforms: ['linkedin', 'twitter'],
    mediaUrls: ['https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'],
    mediaType: 'image',
    hashtags: ['#DigitalStrategy', '#Omnichannel', '#ConversionFunnel', '#EnterpriseScale'],
    status: 'draft',
    createdAt: '2026-11-03T16:00:00Z',
    authorName: 'Sumit Sharma',
    authorAvatar: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png'
  }
];

export const INITIAL_INBOX_CONVERSATIONS: InboxConversation[] = [
  {
    id: 'conv-1',
    clientId: 'client-georgians',
    platform: 'whatsapp',
    customer: {
      id: 'cust-101',
      name: 'Sunil Agrawal',
      handle: '+91 98261 44521',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      phone: '+91 98261 44521',
      email: 'sunil.agrawal78@gmail.com',
      sentiment: 'positive',
      tags: ['Admissions 2026', 'Class 9 Admission', 'Hot Lead'],
      lifetimeOrdersOrValue: 'Prospective Parent'
    },
    lastMessageSnippet: 'Can we visit the Morar campus tomorrow morning around 11 AM for campus tour?',
    lastMessageTimestamp: '10 mins ago',
    unreadCount: 1,
    status: 'open',
    assignedTo: 'user-2',
    internalNotes: [
      {
        id: 'note-1',
        authorName: 'Priya Joshi',
        text: 'Father looking for Class 9 admission. Student has 92% in Class 8. Very enthusiastic about science lab.',
        createdAt: '2026-11-04T09:10:00Z'
      }
    ],
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        senderName: 'Sunil Agrawal',
        text: 'Hello, I saw your post regarding Class 9 admissions for Session 2026-27.',
        timestamp: '09:02 AM',
        delivered: true,
        read: true
      },
      {
        id: 'msg-2',
        sender: 'agent',
        senderName: 'Priya Joshi (Admissions Desk)',
        text: 'Greetings Mr. Agrawal! Welcome to Georgians Academy. Yes, registrations for Class 9 entrance assessment are currently open. We would be delighted to host you for a campus tour.',
        timestamp: '09:12 AM',
        delivered: true,
        read: true
      },
      {
        id: 'msg-3',
        sender: 'customer',
        senderName: 'Sunil Agrawal',
        text: 'Can we visit the Morar campus tomorrow morning around 11 AM for campus tour?',
        timestamp: '09:35 AM',
        delivered: true,
        read: false
      }
    ]
  },
  {
    id: 'conv-2',
    clientId: 'client-gwl',
    platform: 'instagram',
    customer: {
      id: 'cust-102',
      name: 'Aarav Singhania',
      handle: '@aarav_enterprises',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      sentiment: 'positive',
      tags: ['Custom Software', 'High Budget', 'VIP Client'],
      lifetimeOrdersOrValue: '₹1,50,000+ Potential'
    },
    lastMessageSnippet: 'We need a complete social command center and multi-client CRM built for our brand.',
    lastMessageTimestamp: '42 mins ago',
    unreadCount: 2,
    status: 'open',
    assignedTo: 'user-1',
    internalNotes: [
      {
        id: 'note-2',
        authorName: 'Sumit Sharma',
        text: 'Runs logistics & digital brand in Indore. Needs multi-platform automated pipeline.',
        createdAt: '2026-11-04T08:45:00Z'
      }
    ],
    messages: [
      {
        id: 'msg-10',
        sender: 'customer',
        senderName: 'Aarav Singhania',
        text: 'Hey team GWL! Loved your case study on Georgians Academy.',
        timestamp: '08:40 AM',
        delivered: true,
        read: true
      },
      {
        id: 'msg-11',
        sender: 'customer',
        senderName: 'Aarav Singhania',
        text: 'We need a complete social command center and multi-client CRM built for our brand. Can we jump on a call today?',
        timestamp: '08:42 AM',
        delivered: true,
        read: false
      }
    ]
  },
  {
    id: 'conv-3',
    clientId: 'client-yanshi',
    platform: 'facebook',
    customer: {
      id: 'cust-103',
      name: 'Kavita Chaurasia',
      handle: 'kavita.chaurasia.92',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      sentiment: 'urgent',
      tags: ['Spine Rehabilitation', 'Urgent Appointment'],
      lifetimeOrdersOrValue: 'Returning Patient'
    },
    lastMessageSnippet: 'Is Dr. Neha available this evening for acute lower back pain consultation?',
    lastMessageTimestamp: '1 hour ago',
    unreadCount: 1,
    status: 'open',
    assignedTo: 'user-3',
    internalNotes: [],
    messages: [
      {
        id: 'msg-20',
        sender: 'customer',
        senderName: 'Kavita Chaurasia',
        text: 'Is Dr. Neha available this evening for acute lower back pain consultation?',
        timestamp: '08:15 AM',
        delivered: true,
        read: false
      }
    ]
  },
  {
    id: 'conv-4',
    clientId: 'client-brightedge',
    platform: 'youtube',
    customer: {
      id: 'cust-104',
      name: 'Rajat_NEET_AIR1',
      handle: '@rajatkumar_neet',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      sentiment: 'positive',
      tags: ['Test Series Inquiry', 'Enthusiastic Student']
    },
    lastMessageSnippet: 'Sir does the test series include video solutions for the Physics mock tests?',
    lastMessageTimestamp: '2 hours ago',
    unreadCount: 0,
    status: 'resolved',
    assignedTo: 'user-4',
    internalNotes: [],
    messages: [
      {
        id: 'msg-30',
        sender: 'customer',
        senderName: 'Rajat_NEET_AIR1',
        text: 'Sir does the test series include video solutions for the Physics mock tests?',
        timestamp: '07:30 AM',
        delivered: true,
        read: true
      },
      {
        id: 'msg-31',
        sender: 'agent',
        senderName: 'BrightEdge Faculty',
        text: 'Yes Rajat! Every mock test features step-by-step video solutions by top Kota & Delhi faculty. You can review them immediately after submission.',
        timestamp: '07:45 AM',
        delivered: true,
        read: true
      }
    ]
  },
  {
    id: 'conv-5',
    clientId: 'client-gwl',
    platform: 'reddit',
    customer: {
      id: 'cust-105',
      name: 'u/dev_founder_india',
      handle: 'u/dev_founder_india',
      avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80',
      sentiment: 'neutral',
      tags: ['Technical Question', 'Reddit Inbound']
    },
    lastMessageSnippet: 'What tech stack do you recommend for real-time social post scheduling queues?',
    lastMessageTimestamp: '3 hours ago',
    unreadCount: 0,
    status: 'resolved',
    assignedTo: 'user-1',
    internalNotes: [],
    messages: [
      {
        id: 'msg-40',
        sender: 'customer',
        senderName: 'u/dev_founder_india',
        text: 'What tech stack do you recommend for real-time social post scheduling queues?',
        timestamp: '06:10 AM',
        delivered: true,
        read: true
      },
      {
        id: 'msg-41',
        sender: 'agent',
        senderName: 'Sumit Sharma',
        text: 'We utilize BullMQ on Redis with Node.js/Express, coupled with retry backoff and rate-limit circuit breakers for official Meta and Google APIs.',
        timestamp: '06:30 AM',
        delivered: true,
        read: true
      }
    ]
  }
];

export const INITIAL_AUTOMATIONS: AutomationWorkflow[] = [
  {
    id: 'auto-1',
    clientId: 'client-gwl',
    name: 'Instagram Comment "PRICE" -> Instant Lead DM',
    description: 'When someone comments with "PRICE", "COST", or "PLANS" on any IG reel or post, automatically trigger an instant DM with our transparent pricing blueprint.',
    triggerType: 'keyword_comment',
    triggerConfig: {
      platform: 'instagram',
      keywords: ['PRICE', 'COST', 'PLANS', 'KNOW MORE', 'QUOTE']
    },
    conditionConfig: {
      timeWindow: '24/7'
    },
    actionType: 'send_message',
    actionConfig: {
      replyText: 'Hey there! 👋 Thank you for your interest in GWL Web Labs. Here is our direct transparent pricing blueprint: https://gwlweblab.com/#plans. Would you like a free technical audit of your current digital setup?'
    },
    isActive: true,
    executionCount: 284,
    lastTriggeredAt: '2026-11-04T07:15:00Z'
  },
  {
    id: 'auto-2',
    clientId: 'client-georgians',
    name: 'WhatsApp Admissions Welcome & Brochure Bot',
    description: 'Instantly greets new WhatsApp inquiries with the 2026 Prospectus PDF and schedules a campus counselor callback.',
    triggerType: 'new_dm',
    triggerConfig: {
      platform: 'whatsapp'
    },
    conditionConfig: {},
    actionType: 'send_message',
    actionConfig: {
      replyText: 'Namaste & Welcome to Georgians Academy! 🎓 We have received your inquiry. Tap here to download our 2026-27 Prospectus: https://georgians.gwlweblab.dev/prospectus. Our admission counselor will connect with you within 30 minutes.'
    },
    isActive: true,
    executionCount: 612,
    lastTriggeredAt: '2026-11-04T09:05:00Z'
  },
  {
    id: 'auto-3',
    clientId: 'client-yanshi',
    name: 'After-Hours Emergency Appointment Auto-Triage',
    description: 'Sends emergency appointment details and direct clinic doctor contact if inquiry arrives between 8 PM and 8 AM.',
    triggerType: 'new_dm',
    triggerConfig: {
      platform: 'whatsapp'
    },
    conditionConfig: {
      timeWindow: '20:00 - 08:00'
    },
    actionType: 'send_message',
    actionConfig: {
      replyText: 'Thank you for reaching out to Yanshi Physiotherapy Center. For emergency acute spine or injury triage tonight, please call Dr. Neha directly at +91 94251 12345. Regular morning OPD begins at 9:00 AM.'
    },
    isActive: true,
    executionCount: 89,
    lastTriggeredAt: '2026-11-03T22:40:00Z'
  },
  {
    id: 'auto-4',
    clientId: 'client-gwl',
    name: 'VIP Lead Auto-Tagger & Slack Alert',
    description: 'Automatically tags leads mentioning "enterprise", "agency", or budget keywords as "Hot Lead" and assigns to Super Admin.',
    triggerType: 'new_lead',
    triggerConfig: {
      keywords: ['ENTERPRISE', 'AGENCY', 'PLATFORM', 'INVESTMENT', 'WHITE-LABEL']
    },
    conditionConfig: {},
    actionType: 'add_tag',
    actionConfig: {
      tagToAdd: 'VIP Client',
      assigneeId: 'user-1'
    },
    isActive: true,
    executionCount: 47,
    lastTriggeredAt: '2026-11-04T08:42:00Z'
  }
];

export const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'media-1',
    clientId: 'client-gwl',
    title: 'GWL Official Royal Crest Shield',
    url: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    type: 'image',
    fileSize: '1.4 MB',
    resolution: '1024x1024',
    folder: 'Brand Assets',
    tags: ['Logo', 'Crest', 'Master', 'Official'],
    createdAt: '2026-10-22T11:40:00Z'
  },
  {
    id: 'media-2',
    clientId: 'client-gwl',
    title: 'High Performance Core Web Vitals Chart',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    fileSize: '2.1 MB',
    resolution: '1920x1080',
    folder: 'Ad Creatives',
    tags: ['Tech', 'Infographic', 'Lighthouse', 'Speed'],
    createdAt: '2026-10-25T14:30:00Z'
  },
  {
    id: 'media-3',
    clientId: 'client-georgians',
    title: 'Campus Front View & Science Laboratories',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    fileSize: '3.4 MB',
    resolution: '2400x1600',
    folder: 'Client Logos',
    tags: ['Campus', 'Georgians', 'Admissions', 'Hero'],
    createdAt: '2026-10-28T11:00:00Z'
  },
  {
    id: 'media-4',
    clientId: 'client-yanshi',
    title: 'Spine & Joint Rehabilitation Demo Reel',
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    type: 'video',
    fileSize: '18.6 MB',
    resolution: '1080x1920 (9:16 Reel)',
    folder: 'Reels Assets',
    tags: ['Exercise', 'Ergonomics', 'Posture', 'Reel'],
    createdAt: '2026-11-01T10:00:00Z'
  },
  {
    id: 'media-5',
    clientId: 'client-brightedge',
    title: 'NEET Organic Reaction Formula Sheet Infographic',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    fileSize: '4.2 MB',
    resolution: '2048x2048',
    folder: 'Campaign Assets',
    tags: ['Notes', 'NEET', 'Study Material', 'High Yield'],
    createdAt: '2026-11-02T16:00:00Z'
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'user-1',
    name: 'Sumit Sharma',
    email: 'sumitsharma05599@gmail.com',
    avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
    role: 'super_admin',
    assignedClientIds: ['client-gwl', 'client-georgians', 'client-yanshi', 'client-brightedge'],
    status: 'active',
    joinedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'user-2',
    name: 'Priya Joshi',
    email: 'priya.j@gwlweblabs.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    role: 'manager',
    assignedClientIds: ['client-georgians', 'client-gwl'],
    status: 'active',
    joinedAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'user-3',
    name: 'Dr. Amit Trivedi',
    email: 'amit.t@gwlweblabs.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'agency_admin',
    assignedClientIds: ['client-yanshi', 'client-gwl'],
    status: 'active',
    joinedAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'user-4',
    name: 'Karan Malhotra',
    email: 'karan.m@gwlweblabs.com',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    role: 'content_creator',
    assignedClientIds: ['client-brightedge', 'client-georgians'],
    status: 'active',
    joinedAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'user-5',
    name: 'Ananya Saxena',
    email: 'ananya.s@gwlweblabs.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'customer_support',
    assignedClientIds: ['client-yanshi', 'client-georgians'],
    status: 'active',
    joinedAt: '2026-02-15T10:00:00Z'
  }
];

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
      '1 Client Workspace',
      '3 Connected Social Accounts',
      '20 Scheduled Posts / month',
      'Basic Post Publishing',
      'GW Labs AI (15 queries/mo)',
      'Community Support'
    ]
  },
  {
    planId: 'starter',
    name: 'Solo Creator',
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
      'GW Labs AI Assistant (100 queries/mo)',
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
      'GW Labs AI (400 queries/mo)',
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
      'GW Labs AI (1,500 queries/mo)',
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
