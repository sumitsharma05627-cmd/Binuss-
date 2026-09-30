export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  tagline: string;
  startingPrice: string;
  currency: string;
  billingPeriod: string;
  targetAudience: string;
  includesText: string;
  features: string[];
  ctaLabel: string;
  deliveryTime: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'launchpad',
    name: 'LAUNCHPAD',
    badge: 'MICRO BUDGET',
    tagline: 'Fast, budget-friendly digital presence for solopreneurs & small local shops.',
    startingPrice: '₹5,000 – ₹14,999',
    currency: '₹',
    billingPeriod: 'one-time setup',
    targetAudience: 'Solopreneurs, small retail stores, individual tutors, cafés & local services seeking a quick, clean launch.',
    includesText: 'Essential Digital Entry',
    deliveryTime: '3 - 5 Business Days',
    features: [
      'Single-Page High-Converting Landing Page / Microsite',
      '100% Mobile-First Responsive Performance',
      'Direct WhatsApp Chat & Instant Call Triggers',
      'Google Maps Location & Business Info Embed',
      'Social Media Profiles & Catalog Linking',
      'Cloud Hosting Deployment & Free SSL Security',
      'High-Speed Core Web Vitals Optimization',
      '7 Days Free Post-Launch Handover Support'
    ],
    ctaLabel: 'Start Launchpad Plan'
  },
  {
    id: 'starter',
    name: 'STARTER',
    tagline: 'For businesses getting online and building credible presence.',
    startingPrice: '₹14,999',
    currency: '₹',
    billingPeriod: 'one-time setup',
    targetAudience: 'Local businesses, clinics, cafés & professionals with no website or an outdated profile.',
    includesText: 'Core Digital Foundation',
    deliveryTime: '7 - 10 Business Days',
    features: [
      'Bespoke Professional Website (Up to 5 Pages)',
      '100% Mobile & Tablet Responsive Design',
      'Direct WhatsApp & Click-to-Call Integration',
      'Google Maps & Local Business Integration',
      'On-Page Basic SEO & Meta Tag Setup',
      'Contact Form with Instant Email Alerts',
      'Fast Cloud Hosting Setup & SSL Security',
      'Business Information & Social Links Setup'
    ],
    ctaLabel: 'Start My Website'
  },
  {
    id: 'business',
    name: 'BUSINESS',
    badge: 'MOST POPULAR',
    isPopular: true,
    tagline: 'For businesses ready to generate consistent inbound leads and grow.',
    startingPrice: '₹29,999',
    currency: '₹',
    billingPeriod: 'one-time setup',
    targetAudience: 'Coaching institutes, growing service businesses, real estate, retail & specialty clinics.',
    includesText: 'Everything in Starter, plus:',
    deliveryTime: '12 - 16 Business Days',
    features: [
      'Advanced Custom Website (Up to 10 Pages)',
      'Conversion-Optimized Page Structure & Copy Guidance',
      'Comprehensive SEO Optimization (Keywords & Speed)',
      'Google Business Profile (GMB) Optimization',
      'High-Converting Lead-Generation Inbound Forms',
      'Google Analytics 4 & Search Console Setup',
      'Customer Inquiry Management & Triage Flow',
      'Ongoing 30-Day Launch Support & Marketing Guidance'
    ],
    ctaLabel: 'Choose Business'
  },
  {
    id: 'growth',
    name: 'GROWTH',
    tagline: 'For businesses serious about aggressive online market acquisition.',
    startingPrice: '₹54,999',
    currency: '₹',
    billingPeriod: 'growth partnership',
    targetAudience: 'High-growth companies, multi-location clinics, educational institutes & scaled service brands.',
    includesText: 'Everything in Business, plus:',
    deliveryTime: '20 - 25 Business Days',
    features: [
      'Advanced Multi-Page Custom Web Application',
      'Full-Funnel High-Intent SEO Architecture',
      'Google Ads & Search PPC Campaign Setup',
      'Social Media Content Strategy & Brand Playbook',
      'Multi-Channel Lead Qualification & CRM Integration',
      'Conversion Rate Optimization (CRO) & Heatmaps',
      'Automated Lead Nurturing & Email Follow-Ups',
      'Dedicated Growth Strategist & Bi-Weekly Reviews'
    ],
    ctaLabel: 'Talk About Growth'
  }
];

export interface CustomServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  timeframe: string;
  recommendedFor: string;
}

export const CUSTOM_SERVICE_OPTIONS: CustomServiceOption[] = [
  {
    id: 'website',
    name: 'Custom Website',
    description: 'High-speed, conversion-crafted modern web experience tailored to your business.',
    basePrice: 15000,
    timeframe: '7-12 days',
    recommendedFor: 'Essential for all businesses needing online credibility.'
  },
  {
    id: 'seo',
    name: 'SEO & Local Search',
    description: 'Rank on Google for commercial-intent queries and Google Maps local pack.',
    basePrice: 8000,
    timeframe: 'Continuous organic',
    recommendedFor: 'Businesses wanting sustainable, zero-ad-cost traffic.'
  },
  {
    id: 'google-ads',
    name: 'Google Ads & PPC',
    description: 'High-intent search campaigns capturing ready-to-buy prospective customers.',
    basePrice: 10000,
    timeframe: 'Live in 48 hours',
    recommendedFor: 'Businesses needing immediate inquiries and calls.'
  },
  {
    id: 'social-media',
    name: 'Social Media Marketing',
    description: 'Strategic visual content, brand positioning, and active audience engagement.',
    basePrice: 9000,
    timeframe: 'Monthly rhythm',
    recommendedFor: 'Brands looking to maintain trust and stay top of mind.'
  },
  {
    id: 'branding',
    name: 'Branding & Identity',
    description: 'Logos, color palettes, visual guidelines, and professional corporate toolkits.',
    basePrice: 7500,
    timeframe: '5-7 days',
    recommendedFor: 'Businesses needing a memorable, premium brand image.'
  },
  {
    id: 'lead-generation',
    name: 'Lead Gen & Funnels',
    description: 'Frictionless landing pages, inquiry triage forms, and automated CRM pipelines.',
    basePrice: 9500,
    timeframe: '7-10 days',
    recommendedFor: 'Companies seeking structured, warm inbound inquiries.'
  },
  {
    id: 'ai-automation',
    name: 'AI & Workflow Automation',
    description: '24/7 lead qualification bots, automated customer routing, and task syncs.',
    basePrice: 8500,
    timeframe: '5-8 days',
    recommendedFor: 'Teams that want to eliminate manual administrative repetitive work.'
  },
  {
    id: 'creator-collab',
    name: 'Creator Collaboration',
    description: 'Sponsored creator drops, UGC ad reels, creator media kits, and performance rev-share partnerships.',
    basePrice: 8500,
    timeframe: '4-7 days',
    recommendedFor: 'Brands looking for authentic audience reach and creators launching products.'
  }
];

export interface CreatorCollabTier {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  tagline: string;
  priceDisplay: string;
  priceNote: string;
  targetRole: 'brands' | 'creators' | 'both';
  deliverables: string[];
  metrics: string;
  turnaround: string;
  modelType: string;
}

export const CREATOR_COLLAB_TIERS: CreatorCollabTier[] = [
  {
    id: 'micro-creator-bundle',
    name: 'Micro-Creator Drop',
    badge: 'RAPID LAUNCH',
    modelType: 'Per Campaign',
    tagline: 'High-intent product placement & localized influencer shoutouts with zero agency bloat.',
    priceDisplay: '₹8,500 – ₹14,500',
    priceNote: 'per campaign drop',
    targetRole: 'brands',
    turnaround: '4 - 6 Business Days',
    metrics: '25K – 85K Verified Niche Reach',
    deliverables: [
      '1 Dedicated High-Retention Reel / Video + 2 Story sequences',
      'Targeted bio-link redirect landing page & WhatsApp trigger',
      'Trackable discount coupon code & UTM conversion link',
      '30-day whitelisting & commercial digital ad usage rights',
      'Direct audience engagement & comment moderation protocol',
      'Post-campaign reach & verified analytics diagnostic'
    ]
  },
  {
    id: 'creator-co-launch',
    name: 'Creator Co-Launch Kit',
    badge: 'CREATOR FAVORITE',
    isPopular: true,
    modelType: 'Product Launch & Store',
    tagline: 'Turn audience attention into a scalable digital business, courses, and paid brand partnerships.',
    priceDisplay: '₹18,500 – ₹27,500',
    priceNote: 'one-time turnkey setup',
    targetRole: 'creators',
    turnaround: '7 - 10 Business Days',
    metrics: '100% Direct Audience Monetization',
    deliverables: [
      'Bespoke High-Speed Link-in-Bio Digital Storefront / Hub',
      'Instant Razorpay/Stripe checkout for digital products & calls',
      'Automated Instagram DM-to-WhatsApp sponsor inquiry bot',
      'Professional 4-Page Media Kit & Rate Card PDF for brand pitches',
      'Custom branding domain & newsletter capture sequence',
      'Step-by-step launch playbook & 14-day priority technical support'
    ]
  },
  {
    id: 'creator-retainer-revshare',
    name: 'Brand x Creator Retainer',
    badge: 'HYBRID REV-SHARE',
    modelType: 'Monthly or Hybrid Performance',
    tagline: 'Continuous UGC content pipelines and performance-aligned creator network backing.',
    priceDisplay: '₹32,000 / mo',
    priceNote: 'or ₹12,000 base + 12% Rev-Share',
    targetRole: 'both',
    turnaround: 'Monthly Rolling Partnership',
    metrics: '3.5x – 5.2x Organic ROAS',
    deliverables: [
      'Roster of 4 to 6 vetted creator content integrations per month',
      'Full raw UGC video assets & unlimited commercial ad rights',
      'Affiliate commission tracking portal & automated partner payouts',
      'Creator legal contracts, script brief formulation & QA vetting',
      'Dedicated Collab Growth Producer & weekly metric reviews',
      'Cross-platform distribution on Instagram, YouTube Shorts & LinkedIn'
    ]
  }
];

export interface ObjectionItem {
  id: string;
  objection: string;
  answer: string;
  kbsrPoint: string;
  gwlPoint?: string;
}

export const OBJECTIONS_DATA: ObjectionItem[] = [
  {
    id: 'have-instagram',
    objection: '"I already have an Instagram or Facebook page. Do I really need a website?"',
    answer: 'Social media is rented land. Algorithms change, accounts get restricted, and visitors get distracted by thousands of competitor posts. A professional website is your digital real estate: it establishes institutional trust, ranks on Google when buyers search with high intent, and lets customers review your credentials without social media clutter.',
    kbsrPoint: 'Social builds awareness; your website closes the client.',
    gwlPoint: 'Social builds awareness; your website closes the client.'
  },
  {
    id: 'what-kind',
    objection: '"I don\'t know what kind of website or marketing my business needs."',
    answer: 'You do not need to figure that out alone. During our initial consultation, we diagnose your specific business type, target clients, and current bottlenecks to recommend the exact solution required—nothing bloated, nothing unnecessary.',
    kbsrPoint: 'We translate your business goals into the exact right digital scope.',
    gwlPoint: 'We translate your business goals into the exact right digital scope.'
  },
  {
    id: 'is-website-enough',
    objection: '"Is having a website alone enough to get new customers?"',
    answer: 'A website is your central conversion engine, but people need to find it. That is why GWL Weblab connects websites with search visibility (SEO), high-intent advertising (Google Ads), and local map optimization so prospective buyers actually discover you.',
    kbsrPoint: 'We build digital systems where website + visibility + marketing work together.',
    gwlPoint: 'We build digital systems where website + visibility + marketing work together.'
  },
  {
    id: 'no-tech-knowledge',
    objection: '"I don\'t have much technical knowledge. Will I be able to manage this?"',
    answer: 'You don\'t need any technical skills. GWL Weblab handles the architecture, hosting, performance, domain setup, integrations, and testing. Once live, we provide simple, straightforward guidance or manage updates for you.',
    kbsrPoint: 'Zero code or server stress for you—you focus on serving your customers.',
    gwlPoint: 'Zero code or server stress for you—you focus on serving your customers.'
  },
  {
    id: 'custom-needs',
    objection: '"My business has unique requirements. Can you build custom solutions?"',
    answer: 'Yes. Whether you need customized booking calendars, multi-branch service locators, student curriculum portals, or specialized CRM connections, our engineering team constructs modular architectures tailored specifically to your workflow.',
    kbsrPoint: 'Tailored digital solutions built around your exact commercial model.',
    gwlPoint: 'Tailored digital solutions built around your exact commercial model.'
  }
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'cost',
    question: 'How much does a website or digital growth system cost?',
    answer: 'Our transparent packages start at ₹5,000 – ₹14,999 for the Launchpad tier, ₹14,999 for the Starter foundation, ₹29,999 for the Business lead-generation setup, and ₹54,999 for full-funnel Growth partnerships. Custom enterprise scopes are tailored transparently based on your specific requirements.'
  },
  {
    id: 'timeline',
    question: 'How long does it take to build and launch?',
    answer: 'Most Starter websites launch in 7 to 10 business days. Comprehensive Business packages typically take 12 to 16 business days. Full-funnel growth setups usually launch within 20 to 25 business days.'
  },
  {
    id: 'assets-needed',
    question: 'What do I need to provide to get started?',
    answer: 'Only basic business details: your service list, phone/WhatsApp number, logo (if you have one), and any preferred photos. If you don\'t have copy or professional photography, our team helps draft clear copy and selects high-quality assets.'
  },
  {
    id: 'redesign',
    question: 'Can you redesign and modernize my existing outdated website?',
    answer: 'Absolutely. We specialize in overhauling sluggish, outdated websites into fast, modern conversion machines while preserving and improving your search engine rankings.'
  },
  {
    id: 'seo-included',
    question: 'Do you provide real SEO services?',
    answer: 'Yes. Every project includes clean technical SEO, schema markup, and speed tuning. Our Business and Growth plans include deep high-intent keyword positioning, local Google Maps optimization, and organic rank building.'
  },
  {
    id: 'google-ads',
    question: 'Can you run and manage Google Ads for my business?',
    answer: 'Yes. We build targeted search and performance campaigns that reach customers at the exact moment they are looking for your services, with negative-keyword safeguards to stop ad budget waste.'
  },
  {
    id: 'social-media',
    question: 'Do you provide social media marketing and brand design?',
    answer: 'Yes. We craft coherent visual branding, authority-building content calendars, and social campaigns that keep your business top of mind and build credibility with prospective clients.'
  },
  {
    id: 'maintenance',
    question: 'Can you maintain and update my website after launch?',
    answer: 'Yes. We offer continuous maintenance, security updates, uptime monitoring, and content modifications so your digital asset stays in peak operating condition.'
  },
  {
    id: 'custom-features',
    question: 'Can I request custom features like booking systems or calculators?',
    answer: 'Yes. We frequently build custom booking flows, quote calculators, gated client portals, and CRM automations designed to streamline operations.'
  },
  {
    id: 'after-contact',
    question: 'What happens immediately after I submit an inquiry or choose a plan?',
    answer: 'Within 2 to 4 business hours, an advisor from GWL WebLab reviews your requirements and reaches out via WhatsApp or phone. We provide a tailored recommendations brief, outline deliverables and timelines, and answer all your questions with zero pressure.'
  }
];

export const BEFORE_AFTER_DATA = [
  {
    category: 'First Impression & Trust',
    before: 'Outdated or non-existent website. Visitors question if the business is still active and trustworthy.',
    after: 'Crisp, modern website with bespoke typography, sub-second speed, and immediate institutional credibility.'
  },
  {
    category: 'Customer Discovery',
    before: 'Invisible on Google search and local maps. Customers find your competitors first.',
    after: 'Optimized Google Business profile, local search pack visibility, and targeted search rankings.'
  },
  {
    category: 'Contact & Inquiry Friction',
    before: 'Broken phone numbers, missing WhatsApp links, or slow confusing inquiry forms.',
    after: '1-click WhatsApp messaging, clear click-to-call buttons, and frictionless lead capture.'
  },
  {
    category: 'Mobile Experience',
    before: 'Pinch-to-zoom awkward layouts that frustrate mobile users and cause 70%+ drop-off.',
    after: 'Fluid mobile-first design with 44px+ touch targets, instantaneous navigation, and zero layout shift.'
  },
  {
    category: 'Business Growth',
    before: 'Word-of-mouth plateau with unpredictable revenue swings and missed opportunities.',
    after: 'A 24/7 digital representative that consistently captures inquiries even while you sleep.'
  }
];
