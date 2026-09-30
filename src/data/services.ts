import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'websites',
    number: '01',
    title: 'Websites',
    shortDesc: 'High-performance websites designed to turn visitors into customers.',
    fullDesc: 'Custom-engineered digital experiences combining ultra-fast performance, bespoke visual design, and conversion-optimized architectures that transform casual browsers into long-term commercial clients.',
    deliverables: ['Custom Design & Development', 'Mobile Optimization', 'Conversion Rate Architecture', 'Modern CMS & Speed Tuning'],
    threeType: 'website',
    metrics: 'Sub-second load times & conversion focus',
    categoryTag: 'Engineering',
    accentColor: '#10b981',
    keyPills: ['0.8s LCP', 'Mobile-First', 'Conversion CRO']
  },
  {
    id: 'seo',
    number: '02',
    title: 'SEO',
    shortDesc: 'Help your business become easier to discover through search.',
    fullDesc: 'Comprehensive search engine optimization built around technical excellence, high-intent keyword positioning, quality content frameworks, and sustainable organic authority.',
    deliverables: ['Technical SEO Audit & Fixes', 'High-Intent Keyword Strategy', 'On-Page Structure & Schema', 'Local Search & Maps Authority'],
    threeType: 'seo',
    metrics: 'Sustainable organic customer acquisition',
    categoryTag: 'Organic Rank',
    accentColor: '#14b8a6',
    keyPills: ['Top 3 Maps', 'High-Intent Keywords', 'Schema Markup']
  },
  {
    id: 'google-ads',
    number: '03',
    title: 'Google Ads',
    shortDesc: 'Reach customers when they\'re actively searching for your services.',
    fullDesc: 'Targeted pay-per-click campaigns engineered to capture ready-to-buy intent, eliminating ad waste with rigorous negative keyword pruning and landing page alignment.',
    deliverables: ['Search & Performance Max Campaigns', 'Targeted Bidding Strategies', 'Ad Copy & Creative Testing', 'Conversion Tracking & ROAS Optimization'],
    threeType: 'ads',
    metrics: 'Direct intent-driven lead generation',
    categoryTag: 'Paid Media',
    accentColor: '#06b6d4',
    keyPills: ['Negative Pruning', 'Intent Bidding', '4.8x ROAS']
  },
  {
    id: 'social-media',
    number: '04',
    title: 'Social Media',
    shortDesc: 'Build a consistent and engaging presence across social platforms.',
    fullDesc: 'Strategic social marketing focused on consistent brand narratives, authority-building content, and engagement channels that foster trust with prospective buyers.',
    deliverables: ['Platform Positioning Strategy', 'Content Creation & Scheduling', 'Community Engagement Protocols', 'Paid Social Amplification'],
    threeType: 'social',
    metrics: 'Continuous brand resonance & audience growth',
    categoryTag: 'Audience',
    accentColor: '#8b5cf6',
    keyPills: ['Brand Authority', 'Content Scheduling', 'Reels & Stories']
  },
  {
    id: 'branding',
    number: '05',
    title: 'Branding',
    shortDesc: 'Create a professional identity that customers remember.',
    fullDesc: 'Distinctive brand identities tailored for market credibility. From visual identity guidelines to voice principles, we ensure your business looks commanding and memorable.',
    deliverables: ['Brand Positioning & Messaging', 'Visual Identity & Design Systems', 'Typography & Palette Specifications', 'Digital & Print Asset Toolkits'],
    threeType: 'branding',
    metrics: 'Instant market credibility & recognition',
    categoryTag: 'Visual Identity',
    accentColor: '#f59e0b',
    keyPills: ['Design System', 'Typography Scale', 'Asset Toolkit']
  },
  {
    id: 'lead-generation',
    number: '06',
    title: 'Lead Generation',
    shortDesc: 'Turn digital attention into meaningful business enquiries.',
    fullDesc: 'End-to-end inbound and outbound funnel mechanics designed to capture qualified prospects, qualify their requirements, and deliver warm conversations directly to your sales pipeline.',
    deliverables: ['Dedicated Funnel Landing Pages', 'Lead Qualification Workflows', 'CRM Integration & Alerts', 'Multi-Channel Attribution'],
    threeType: 'leads',
    metrics: 'Measurable pipeline & predictable enquiries',
    categoryTag: 'Funnel Tech',
    accentColor: '#10b981',
    keyPills: ['Direct WhatsApp', 'Instant Lead Alerts', 'CRM Sync']
  },
  {
    id: 'growth-strategy',
    number: '07',
    title: 'Growth Strategy',
    shortDesc: 'Build a practical digital roadmap around your business goals.',
    fullDesc: 'Holistic digital auditing and competitive analysis that uncovers untapped growth channels, aligns marketing spend, and maps realistic revenue milestones.',
    deliverables: ['Market & Competitor Diagnostic', 'Digital Channel Prioritization', 'Unit Economics & CAC Review', 'Quarterly Execution Milestones'],
    threeType: 'growth',
    metrics: 'Clear roadmap eliminating guesswork',
    categoryTag: 'Consulting',
    accentColor: '#3b82f6',
    keyPills: ['Channel Diagnostics', 'CAC Optimization', 'Quarterly Roadmap']
  },
  {
    id: 'ai-automation',
    number: '08',
    title: 'AI Automation',
    shortDesc: 'Use modern AI workflows to reduce repetitive work and improve efficiency.',
    fullDesc: 'Custom AI agent integrations, automated customer inquiry handling, smart CRM updates, and content distribution workflows that save hours of operational overhead.',
    deliverables: ['Inquiry Triage & Auto-Routing', 'Automated Lead Qualification Bots', 'Internal Workflow Syncs', 'Custom AI Pipeline Connectors'],
    threeType: 'ai',
    metrics: '24/7 responsiveness & operational speed',
    categoryTag: 'Automation',
    accentColor: '#2dd4bf',
    keyPills: ['24/7 Auto Triage', 'Qualifying Bots', 'Zero Manual Ops']
  },
  {
    id: 'creator-collaboration',
    number: '09',
    title: 'Creator Collaboration',
    shortDesc: 'Partner with creators and co-produce high-converting influencer campaigns & digital kits.',
    fullDesc: 'End-to-end creator partnership architecture. From sponsored content matching and UGC ad creative to dedicated creator digital storefronts, media kits, and performance revenue-share models that turn audience attention into measurable commercial sales.',
    deliverables: [
      'Brand x Creator Matching & Vetting',
      'UGC Video Production & Whitelisted Ads',
      'Creator Link-in-Bio & Launch Storefronts',
      'Trackable Affiliate & Rev-Share Tracking'
    ],
    threeType: 'creator',
    metrics: 'High-trust audience engagement & viral ROI',
    categoryTag: 'Creator Network',
    accentColor: '#ec4899',
    keyPills: ['Brand x Creator', 'UGC Ads', 'Differentiated Pricing']
  }
];
