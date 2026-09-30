import { ProcessStage } from '../types';

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'DISCOVER',
    tagline: 'Understand the business and its goals.',
    description: 'We begin by diagnosing your business model, customer psychology, competitive landscape, and key commercial targets to identify the highest-leverage growth opportunities.',
    activities: [
      'In-depth business & revenue alignment',
      'Target client persona & search intent audit',
      'Competitor breakdown & positioning review',
      'Technical baseline evaluation'
    ],
    outcome: 'Clear strategic brief and commercial milestones.'
  },
  {
    step: '02',
    title: 'STRATEGY',
    tagline: 'Create the right digital roadmap.',
    description: 'We develop a tailored architecture linking design, technical SEO, advertising funnels, and automated operations into a unified execution plan.',
    activities: [
      'Information architecture & conversion wireframes',
      'High-intent keyword & search mapping',
      'Ad campaign & messaging framework',
      'Technology stack & integration specifications'
    ],
    outcome: 'Actionable blueprint ready for build execution.'
  },
  {
    step: '03',
    title: 'BUILD',
    tagline: 'Design and develop the solution.',
    description: 'Our team crafts your custom website and digital infrastructure using modern web technologies, pristine typography, mobile optimization, and conversion-focused design.',
    activities: [
      'Bespoke modern UI/UX design',
      'Clean, accessible, high-speed engineering',
      'On-page SEO structuring & schema markup',
      'Analytics, tag managers & CRM integrations'
    ],
    outcome: 'Tested, blazing-fast production digital asset.'
  },
  {
    step: '04',
    title: 'LAUNCH',
    tagline: 'Deploy, optimize and connect marketing tools.',
    description: 'We manage flawless deployment, activate targeted advertising campaigns, configure domain and DNS settings, and monitor initial user flows in real time.',
    activities: [
      'Zero-downtime production deployment',
      'Live conversion & lead tracking verification',
      'Google Ads & paid traffic campaign launch',
      'Search engine indexation & local map verification'
    ],
    outcome: 'Live digital system generating initial inquiries.'
  },
  {
    step: '05',
    title: 'GROW',
    tagline: 'Continuously improve visibility and conversions.',
    description: 'We analyze data, refine conversion touchpoints, optimize ad spending, and implement automated workflows to compound your competitive advantage over time.',
    activities: [
      'Ongoing conversion rate optimization (CRO)',
      'Search ranking & backlink expansion',
      'Ad budget efficiency & negative keyword tuning',
      'Continuous feature and AI workflow enhancements'
    ],
    outcome: 'Compounding pipeline and sustained market growth.'
  }
];
