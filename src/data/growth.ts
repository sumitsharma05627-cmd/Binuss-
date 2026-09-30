import { GrowthStage } from '../types';

export const GROWTH_PIPELINE_STAGES: GrowthStage[] = [
  {
    id: 'discover',
    step: '01',
    title: 'DISCOVER',
    subtitle: 'High-Intent Search & Organic Reach',
    description: 'Prospective clients actively searching for your services find your brand through technical SEO, Google Ads, and targeted authority positioning.',
    keyAction: 'Capturing prospective clients at the exact moment of commercial need.',
    impactMetric: 'Qualified Impressions & CTR',
    kbsrAdvantage: 'Zero reliance on blind ad spend; focused on high-intent buyer queries.',
    gwlAdvantage: 'Zero reliance on blind ad spend; focused on high-intent buyer queries.'
  },
  {
    id: 'trust',
    step: '02',
    title: 'TRUST',
    subtitle: 'Institutional Polish & Clear Positioning',
    description: 'First impressions matter. A clean, high-performance website and cohesive branding immediately confirm your competence and legitimacy.',
    keyAction: 'Eliminating hesitation through crisp proof, speed, and design authority.',
    impactMetric: 'Bounce Rate Reduction & Dwell Time',
    kbsrAdvantage: 'Sub-second speeds with bespoke typography and frictionless clarity.',
    gwlAdvantage: 'Sub-second speeds with bespoke typography and frictionless clarity.'
  },
  {
    id: 'engage',
    step: '03',
    title: 'ENGAGE',
    subtitle: 'Compelling Value & Interactive Touchpoints',
    description: 'Visitors explore your core offerings, transparent service pathways, and case evidence through interactive user experiences designed without clutter.',
    keyAction: 'Guiding the user journey directly toward the logical next decision.',
    impactMetric: 'Page Depth & Micro-Conversions',
    kbsrAdvantage: 'User experience architected with psychological hierarchy.',
    gwlAdvantage: 'User experience architected with psychological hierarchy.'
  },
  {
    id: 'convert',
    step: '04',
    title: 'CONVERT',
    subtitle: 'Frictionless Inbound Opportunity Capture',
    description: 'Friction-free intake forms, one-click calls, and automated qualification ensure every interested prospect is cleanly captured into your sales pipeline.',
    keyAction: 'Transforming digital traffic into structured, qualified business inquiries.',
    impactMetric: 'Conversion Rate & Lead Cost',
    kbsrAdvantage: 'Instant notification routing and smart triage workflows.',
    gwlAdvantage: 'Instant notification routing and smart triage workflows.'
  },
  {
    id: 'grow',
    step: '05',
    title: 'GROW',
    subtitle: 'Compounding Revenue & Continuous Optimization',
    description: 'Data analytics, conversion rate iteration, automated nurture sequences, and channel scaling compound your business results month over month.',
    keyAction: 'Continuous feedback loops converting initial wins into market dominance.',
    impactMetric: 'Customer Lifetime Value & Scalable Pipeline',
    kbsrAdvantage: 'Real-time analytics and transparent iterative engineering.',
    gwlAdvantage: 'Real-time analytics and transparent iterative engineering.'
  }
];

export const ECOSYSTEM_NODES = [
  {
    step: 1,
    name: 'Website',
    role: 'Core Foundation',
    desc: 'Bespoke, blazing fast digital home that converts visitors into customers.'
  },
  {
    step: 2,
    name: 'SEO',
    role: 'Organic Engine',
    desc: 'Technical architecture and keyword authority for sustainable discovery.'
  },
  {
    step: 3,
    name: 'Marketing',
    role: 'Multi-Channel Reach',
    desc: 'Targeted Google Ads and strategic social channels amplifying your message.'
  },
  {
    step: 4,
    name: 'Traffic',
    role: 'Qualified Flow',
    desc: 'Steady, high-intent prospective buyers flowing to your digital assets.'
  },
  {
    step: 5,
    name: 'Leads',
    role: 'Verified Inquiries',
    desc: 'Actionable phone calls, project inquiries, and sales meetings.'
  },
  {
    step: 6,
    name: 'Growth',
    role: 'Compounding Revenue',
    desc: 'Sustainable commercial scale and market authority.'
  }
];

export const WHY_GWL_POINTS = [
  {
    title: 'Business-focused strategy',
    description: 'We prioritize commercial outcomes—leads, sales, and client acquisition—over superficial metrics.'
  },
  {
    title: 'Modern technology',
    description: 'Built with modern frameworks, high performance standards, and automated workflows.'
  },
  {
    title: 'Conversion-focused design',
    description: 'Every layout, typography pairing, and call-to-action is engineered to convert interest into action.'
  },
  {
    title: 'Transparent communication',
    description: 'Clear reporting, direct timelines, and straightforward collaboration without jargon or excuses.'
  },
  {
    title: 'Long-term growth mindset',
    description: 'We don’t just launch and disappear; we build systems designed to compound in value over time.'
  }
];

export const WHY_KBSR_POINTS = WHY_GWL_POINTS;
