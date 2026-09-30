export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  threeType: 'website' | 'seo' | 'ads' | 'social' | 'branding' | 'leads' | 'growth' | 'ai' | 'creator';
  metrics: string;
  categoryTag?: string;
  accentColor?: string;
  keyPills?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  deliverables: string[];
  stats: { label: string; value: string }[];
  accentColor: string;
  previewType: 'healthcare' | 'education' | 'local' | 'ecommerce' | 'physiotherapy' | 'academy' | 'language' | 'edtech';
  clientType: string;
  location?: string;
  contactInfo?: { phone?: string; whatsapp?: string; email?: string; address?: string };
  websiteUrl?: string;
  highlights?: string[];
}

export interface GrowthStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  keyAction: string;
  impactMetric: string;
  kbsrAdvantage: string;
  gwlAdvantage?: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  tagline: string;
  description: string;
  activities: string[];
  outcome: string;
}

export interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  budgetRange: string;
  message: string;
}

export type ThemeId =
  | 'cyber-emerald'
  | 'neon-violet'
  | 'quantum-cyan'
  | 'solar-amber'
  | 'crimson-ember'
  | 'stealth-mono'
  | 'clean-light'
  | 'nordic-frost';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  isDark: boolean;
  primaryColor: string;
  accentColor: string;
  bgHex: string;
  motto: string;
  personality: string;
  accentTag: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  location: string;
  avatarUrl?: string;
  rating: number;
  highlightMetric: string;
  metricLabel: {
    en: string;
    hi: string;
    es: string;
  };
  quote: {
    en: string;
    hi: string;
    es: string;
  };
  serviceTag: string;
  verified: boolean;
}

export type { InsightArticle, InsightSection, InsightAuthor } from './data/insights';

