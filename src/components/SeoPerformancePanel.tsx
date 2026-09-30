import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  TrendingUp,
  Award,
  Zap,
  ShieldCheck,
  Calendar,
  Sparkles,
  Target,
  BarChart3,
  DollarSign,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

// Client Benchmark Case Studies
export interface SeoCaseStudy {
  id: string;
  name: string;
  industry: string;
  badge: string;
  tagline: string;
  summary: string;
  baselineMetrics: {
    startVisits: string;
    endVisits: string;
    trafficGrowth: string;
    top10Keywords: number;
    top3Keywords: number;
    monthlyValue: string;
    avgCtr: string;
  };
  keywords: Array<{
    term: string;
    volume: string;
    initialRank: number;
    currentRank: number;
    difficulty: 'Easy' | 'Medium' | 'Competitive';
    intent: 'Commercial' | 'Transactional' | 'Local';
    serpFeature: string;
  }>;
  monthlyData: Array<{
    month: string;
    monthShort: string;
    visits: number;
    impressions: number; // in thousands
    top3: number;
    top10: number;
    top30: number;
    milestone?: string;
  }>;
}

export const SEO_CASE_STUDIES: SeoCaseStudy[] = [
  {
    id: 'b2b-tech',
    name: 'Enterprise B2B & Cloud Architecture',
    industry: 'Enterprise Software & Dev',
    badge: 'B2B Scale',
    tagline: 'High-Intent Solution Keywords & Global Technical SEO',
    summary:
      'Engineered topic clusters, headless Next.js speed optimizations (Core Web Vitals 99/100), and deep programmatic technical schema. Moved high-intent commercial keywords from deep page 4 directly into #1–#3 SERP real estate.',
    baselineMetrics: {
      startVisits: '2,400',
      endVisits: '26,800',
      trafficGrowth: '+1,016%',
      top10Keywords: 218,
      top3Keywords: 84,
      monthlyValue: '₹4.8L / mo',
      avgCtr: '8.6%'
    },
    keywords: [
      {
        term: 'custom enterprise web development company',
        volume: '4,400/mo',
        initialRank: 44,
        currentRank: 2,
        difficulty: 'Competitive',
        intent: 'Commercial',
        serpFeature: 'SiteLinks'
      },
      {
        term: 'headless e-commerce migration services',
        volume: '2,900/mo',
        initialRank: 38,
        currentRank: 1,
        difficulty: 'Medium',
        intent: 'Transactional',
        serpFeature: 'Featured Snippet'
      },
      {
        term: 'next.js development agency india',
        volume: '5,200/mo',
        initialRank: 51,
        currentRank: 2,
        difficulty: 'Competitive',
        intent: 'Commercial',
        serpFeature: 'People Also Ask'
      },
      {
        term: 'b2b SaaS conversion optimization experts',
        volume: '1,800/mo',
        initialRank: 29,
        currentRank: 1,
        difficulty: 'Medium',
        intent: 'Transactional',
        serpFeature: 'Knowledge Card'
      },
      {
        term: 'core web vitals audit and performance fix',
        volume: '3,600/mo',
        initialRank: 42,
        currentRank: 3,
        difficulty: 'Medium',
        intent: 'Commercial',
        serpFeature: 'Direct Answer'
      }
    ],
    monthlyData: [
      { month: 'Month 1', monthShort: 'M1', visits: 2400, impressions: 32, top3: 6, top10: 18, top30: 45, milestone: 'Technical Audit & Schema Fix' },
      { month: 'Month 2', monthShort: 'M2', visits: 3100, impressions: 48, top3: 9, top10: 27, top30: 62 },
      { month: 'Month 3', monthShort: 'M3', visits: 4800, impressions: 78, top3: 15, top10: 42, top30: 89, milestone: 'Core Web Vitals 99 Boost' },
      { month: 'Month 4', monthShort: 'M4', visits: 7200, impressions: 115, top3: 24, top10: 65, top30: 120 },
      { month: 'Month 5', monthShort: 'M5', visits: 10400, impressions: 168, top3: 36, top10: 92, top30: 155 },
      { month: 'Month 6', monthShort: 'M6', visits: 13900, impressions: 220, top3: 48, top10: 124, top30: 195, milestone: 'Pillar Cluster Indexation' },
      { month: 'Month 7', monthShort: 'M7', visits: 16800, impressions: 275, top3: 57, top10: 148, top30: 230 },
      { month: 'Month 8', monthShort: 'M8', visits: 19500, impressions: 320, top3: 64, top10: 168, top30: 260 },
      { month: 'Month 9', monthShort: 'M9', visits: 21800, impressions: 365, top3: 71, top10: 185, top30: 285, milestone: 'Digital PR & High-DA Mentions' },
      { month: 'Month 10', monthShort: 'M10', visits: 23600, impressions: 410, top3: 76, top10: 198, top30: 305 },
      { month: 'Month 11', monthShort: 'M11', visits: 25200, impressions: 445, top3: 80, top10: 208, top30: 320 },
      { month: 'Month 12', monthShort: 'M12', visits: 26800, impressions: 480, top3: 84, top10: 218, top30: 335, milestone: 'Market Leader Dominance' }
    ]
  },
  {
    id: 'healthcare-local',
    name: 'Multi-Specialty Healthcare & Regional Clinic',
    industry: 'Healthcare & Diagnostics',
    badge: 'Local Authority',
    tagline: 'Google Maps Pack Dominance & Zero-Click Conversion Funnels',
    summary:
      'Hyper-localized medical schema, Google Business Profile cluster optimization, and symptoms-to-appointment landing pages. Achieved 100% Top 3 map rank across 14 target service radiuses.',
    baselineMetrics: {
      startVisits: '1,100',
      endVisits: '15,400',
      trafficGrowth: '+1,300%',
      top10Keywords: 162,
      top3Keywords: 72,
      monthlyValue: '₹3.2L / mo',
      avgCtr: '11.2%'
    },
    keywords: [
      {
        term: 'best multispeciality hospital gwalior',
        volume: '6,600/mo',
        initialRank: 28,
        currentRank: 1,
        difficulty: 'Competitive',
        intent: 'Local',
        serpFeature: 'Map Pack #1'
      },
      {
        term: '24x7 emergency cardiology doctor near me',
        volume: '3,800/mo',
        initialRank: 35,
        currentRank: 1,
        difficulty: 'Medium',
        intent: 'Local',
        serpFeature: 'Direct Call Button'
      },
      {
        term: 'laparoscopic surgery specialist central india',
        volume: '2,400/mo',
        initialRank: 40,
        currentRank: 2,
        difficulty: 'Medium',
        intent: 'Commercial',
        serpFeature: 'Knowledge Panel'
      },
      {
        term: 'advanced orthopaedic clinic in mp',
        volume: '1,900/mo',
        initialRank: 22,
        currentRank: 1,
        difficulty: 'Easy',
        intent: 'Local',
        serpFeature: 'Map Pack #1'
      }
    ],
    monthlyData: [
      { month: 'Month 1', monthShort: 'M1', visits: 1100, impressions: 18, top3: 4, top10: 12, top30: 32, milestone: 'GBP Overhaul & Geo-Tags' },
      { month: 'Month 2', monthShort: 'M2', visits: 1800, impressions: 32, top3: 8, top10: 22, top30: 48 },
      { month: 'Month 3', monthShort: 'M3', visits: 3200, impressions: 60, top3: 16, top10: 40, top30: 75, milestone: 'Doctor Profile Schema' },
      { month: 'Month 4', monthShort: 'M4', visits: 5100, impressions: 98, top3: 26, top10: 62, top30: 104 },
      { month: 'Month 5', monthShort: 'M5', visits: 7400, impressions: 140, top3: 38, top10: 84, top30: 135 },
      { month: 'Month 6', monthShort: 'M6', visits: 9600, impressions: 185, top3: 47, top10: 106, top30: 160, milestone: 'Patient FAQ Snippets' },
      { month: 'Month 7', monthShort: 'M7', visits: 11200, impressions: 220, top3: 53, top10: 122, top30: 182 },
      { month: 'Month 8', monthShort: 'M8', visits: 12600, impressions: 250, top3: 59, top10: 135, top30: 200 },
      { month: 'Month 9', monthShort: 'M9', visits: 13800, impressions: 278, top3: 64, top10: 146, top30: 215, milestone: 'Authority Health Citations' },
      { month: 'Month 10', monthShort: 'M10', visits: 14500, impressions: 295, top3: 68, top10: 153, top30: 225 },
      { month: 'Month 11', monthShort: 'M11', visits: 15000, impressions: 310, top3: 70, top10: 158, top30: 232 },
      { month: 'Month 12', monthShort: 'M12', visits: 15400, impressions: 325, top3: 72, top10: 162, top30: 240, milestone: 'Regional Category Leader' }
    ]
  },
  {
    id: 'ecommerce-retail',
    name: 'D2C Lifestyle & Omnichannel Retail',
    industry: 'E-Commerce / Direct-to-Consumer',
    badge: 'Transactional SEO',
    tagline: 'Product Schema, Category Hubs & High-Converting Long Tail',
    summary:
      'Implemented automated Product & Review schema, faceted navigation indexing control, and zero-loss Shopify headless migration. Drove 7x increase in non-branded organic revenue.',
    baselineMetrics: {
      startVisits: '6,500',
      endVisits: '58,200',
      trafficGrowth: '+795%',
      top10Keywords: 412,
      top3Keywords: 146,
      monthlyValue: '₹9.4L / mo',
      avgCtr: '6.9%'
    },
    keywords: [
      {
        term: 'buy organic ayurvedic wellness products online',
        volume: '14,200/mo',
        initialRank: 52,
        currentRank: 2,
        difficulty: 'Competitive',
        intent: 'Transactional',
        serpFeature: 'Product Grid + Stars'
      },
      {
        term: 'pure cold pressed herbal skincare india',
        volume: '8,900/mo',
        initialRank: 36,
        currentRank: 1,
        difficulty: 'Medium',
        intent: 'Transactional',
        serpFeature: 'Rich Snippet Price'
      },
      {
        term: 'best natural hair rejuvenation serum',
        volume: '11,400/mo',
        initialRank: 48,
        currentRank: 3,
        difficulty: 'Competitive',
        intent: 'Commercial',
        serpFeature: 'Review Star Badges'
      },
      {
        term: 'chemical free daily sun protection lotion',
        volume: '6,100/mo',
        initialRank: 31,
        currentRank: 1,
        difficulty: 'Medium',
        intent: 'Transactional',
        serpFeature: 'Featured Snippet'
      }
    ],
    monthlyData: [
      { month: 'Month 1', monthShort: 'M1', visits: 6500, impressions: 85, top3: 12, top10: 34, top30: 95, milestone: 'Product Schema & Speed 95+' },
      { month: 'Month 2', monthShort: 'M2', visits: 9200, impressions: 125, top3: 20, top10: 55, top30: 135 },
      { month: 'Month 3', monthShort: 'M3', visits: 14500, impressions: 210, top3: 35, top10: 90, top30: 200, milestone: 'Category Content Hubs' },
      { month: 'Month 4', monthShort: 'M4', visits: 21000, impressions: 320, top3: 54, top10: 138, top30: 275 },
      { month: 'Month 5', monthShort: 'M5', visits: 29500, impressions: 450, top3: 74, top10: 195, top30: 360 },
      { month: 'Month 6', monthShort: 'M6', visits: 37800, impressions: 580, top3: 95, top10: 250, top30: 440, milestone: 'Long-Tail Buying Guides' },
      { month: 'Month 7', monthShort: 'M7', visits: 43200, impressions: 690, top3: 110, top10: 295, top30: 510 },
      { month: 'Month 8', monthShort: 'M8', visits: 48100, impressions: 780, top3: 122, top10: 330, top30: 570 },
      { month: 'Month 9', monthShort: 'M9', visits: 51900, impressions: 850, top3: 132, top10: 362, top30: 620, milestone: 'Seasonal Sale Cluster Dominance' },
      { month: 'Month 10', monthShort: 'M10', visits: 54800, impressions: 910, top3: 138, top10: 385, top30: 660 },
      { month: 'Month 11', monthShort: 'M11', visits: 56700, impressions: 955, top3: 142, top10: 400, top30: 690 },
      { month: 'Month 12', monthShort: 'M12', visits: 58200, impressions: 990, top3: 146, top10: 412, top30: 715, milestone: '7.9x Recurring Organic ARR' }
    ]
  }
];

export interface SeoPerformancePanelProps {
  onAuditRequest?: (context?: string) => void;
  onRequestSeoAudit?: (context?: string) => void;
}

export const SeoPerformancePanel: React.FC<SeoPerformancePanelProps> = ({
  onAuditRequest,
  onRequestSeoAudit
}) => {
  const { themeConfig } = useTheme();

  const handleAuditClick = (context?: string) => {
    if (onRequestSeoAudit) {
      onRequestSeoAudit(context);
    } else if (onAuditRequest) {
      onAuditRequest(context);
    }
  };

  // Active state
  const [selectedCaseId, setSelectedCaseId] = useState<string>('b2b-tech');
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '12m'>('12m');
  const [activeChartTab, setActiveChartTab] = useState<'traffic' | 'keywords'>('traffic');
  const [showKeywordDetail, setShowKeywordDetail] = useState(false);

  // Selected Case Study
  const activeCase = useMemo(() => {
    return SEO_CASE_STUDIES.find((c) => c.id === selectedCaseId) || SEO_CASE_STUDIES[0];
  }, [selectedCaseId]);

  // Sliced data based on timeRange
  const chartData = useMemo(() => {
    const raw = activeCase.monthlyData;
    if (timeRange === '3m') return raw.slice(-3);
    if (timeRange === '6m') return raw.slice(-6);
    return raw;
  }, [activeCase, timeRange]);

  // Primary brand colors for chart lines & bars
  const primaryColor = themeConfig.primaryColor || '#10b981';
  const accentColor = themeConfig.accentColor || '#059669';

  return (
    <div className="relative rounded-3xl theme-card-bg border border-white/10 [data-theme=clean-light]:border-slate-200 [data-theme=clean-light]:bg-white [data-theme=clean-light]:shadow-xl overflow-hidden transition-all duration-300">
      {/* Decorative top accent gradient */}
      <div
        className="h-1.5 w-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${primaryColor}, ${accentColor}, #3b82f6)`
        }}
      />

      <div className="p-5 sm:p-8 lg:p-10">
        {/* Panel Top Header: Badge, Title & Case Study Switcher */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10 [data-theme=clean-light]:border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider theme-badge mb-3">
              <TrendingUp className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>Real Verified Client Case Benchmarks</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white [data-theme=clean-light]:text-slate-900 tracking-tight">
              SEO Performance & Organic Growth Trends
            </h3>
            <p className="text-neutral-400 [data-theme=clean-light]:text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Explore how our full-funnel technical and topical authority SEO generates measurable organic visitors, top-3 Google rankings, and high-converting commercial leads.
            </p>
          </div>

          {/* Timeframe & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            {/* Timeframe Selector */}
            <div className="flex items-center p-1 rounded-xl bg-white/[0.04] [data-theme=clean-light]:bg-slate-100 border border-white/10 [data-theme=clean-light]:border-slate-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 [data-theme=clean-light]:text-slate-500 px-2 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Range:</span>
              </span>
              {(['3m', '6m', '12m'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    timeRange === r
                      ? 'theme-btn-primary shadow-sm'
                      : 'text-neutral-400 [data-theme=clean-light]:text-slate-600 hover:text-white [data-theme=clean-light]:hover:text-slate-900'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Audit CTA */}
            <button
              type="button"
              onClick={() => handleAuditClick(`SEO Audit Request for ${activeCase.name}`)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl theme-btn-primary text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer hover:scale-[1.03]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Request Free SEO Audit</span>
            </button>
          </div>
        </div>

        {/* Case Study Archetype Selector Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 [data-theme=clean-light]:text-slate-600 flex items-center gap-1.5 mr-1 font-mono">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Select Benchmark:</span>
          </span>

          {SEO_CASE_STUDIES.map((c) => {
            const isSelected = selectedCaseId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCaseId(c.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'theme-btn-primary font-bold shadow-md border-transparent'
                    : 'bg-white/[0.03] [data-theme=clean-light]:bg-white border-white/10 [data-theme=clean-light]:border-slate-200 text-neutral-300 [data-theme=clean-light]:text-slate-700 hover:border-white/20 [data-theme=clean-light]:hover:bg-slate-50'
                }`}
              >
                <span>{c.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-black/25 text-current'
                      : 'bg-white/10 [data-theme=clean-light]:bg-slate-100 text-neutral-400 [data-theme=clean-light]:text-slate-600'
                  }`}
                >
                  {c.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Benchmark Highlight Card */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/[0.02] [data-theme=clean-light]:bg-slate-50 border border-white/5 [data-theme=clean-light]:border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 [data-theme=clean-light]:text-emerald-700">
                {activeCase.industry}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-xs text-neutral-300 [data-theme=clean-light]:text-slate-700 font-medium">
                {activeCase.tagline}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 [data-theme=clean-light]:text-slate-600 max-w-3xl leading-relaxed">
              {activeCase.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowKeywordDetail(!showKeywordDetail)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white/5 [data-theme=clean-light]:bg-white border border-white/10 [data-theme=clean-light]:border-slate-200 text-neutral-300 [data-theme=clean-light]:text-slate-700 hover:text-white [data-theme=clean-light]:hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showKeywordDetail ? 'Hide Top Keywords' : 'View Target Keywords'}</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6">
          {/* Card 1: Traffic Growth */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] [data-theme=clean-light]:bg-white border border-white/5 [data-theme=clean-light]:border-slate-200 [data-theme=clean-light]:shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 [data-theme=clean-light]:text-slate-500 text-xs mb-2">
              <span className="font-mono uppercase tracking-wider">Organic Traffic</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white [data-theme=clean-light]:text-slate-900">
                {activeCase.baselineMetrics.trafficGrowth}
              </div>
              <div className="text-[11px] text-neutral-400 [data-theme=clean-light]:text-slate-600 mt-1 flex items-center gap-1 font-mono">
                <span>{activeCase.baselineMetrics.startVisits}</span>
                <span>→</span>
                <strong className="text-emerald-400 [data-theme=clean-light]:text-emerald-700">
                  {activeCase.baselineMetrics.endVisits} / mo
                </strong>
              </div>
            </div>
          </div>

          {/* Card 2: Top 3 & Top 10 Keywords */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] [data-theme=clean-light]:bg-white border border-white/5 [data-theme=clean-light]:border-slate-200 [data-theme=clean-light]:shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 [data-theme=clean-light]:text-slate-500 text-xs mb-2">
              <span className="font-mono uppercase tracking-wider">Top 3 Rankings</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white [data-theme=clean-light]:text-slate-900">
                {activeCase.baselineMetrics.top3Keywords}{' '}
                <span className="text-xs font-normal text-neutral-400 [data-theme=clean-light]:text-slate-500 font-sans">
                  keywords
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 [data-theme=clean-light]:text-slate-600 mt-1 font-mono">
                <span className="text-amber-400 font-semibold">{activeCase.baselineMetrics.top10Keywords}</span> keywords in Google Top 10
              </div>
            </div>
          </div>

          {/* Card 3: Avg CTR */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] [data-theme=clean-light]:bg-white border border-white/5 [data-theme=clean-light]:border-slate-200 [data-theme=clean-light]:shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 [data-theme=clean-light]:text-slate-500 text-xs mb-2">
              <span className="font-mono uppercase tracking-wider">Search CTR</span>
              <Eye className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white [data-theme=clean-light]:text-slate-900">
                {activeCase.baselineMetrics.avgCtr}
              </div>
              <div className="text-[11px] text-neutral-400 [data-theme=clean-light]:text-slate-600 mt-1 font-mono">
                Enhanced SERP snippets & rich reviews
              </div>
            </div>
          </div>

          {/* Card 4: Organic PPC Value Equivalent */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] [data-theme=clean-light]:bg-white border border-white/5 [data-theme=clean-light]:border-slate-200 [data-theme=clean-light]:shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 [data-theme=clean-light]:text-slate-500 text-xs mb-2">
              <span className="font-mono uppercase tracking-wider">Ad Spend Saved</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 [data-theme=clean-light]:text-emerald-700">
                {activeCase.baselineMetrics.monthlyValue}
              </div>
              <div className="text-[11px] text-neutral-400 [data-theme=clean-light]:text-slate-600 mt-1 font-mono">
                Equivalent monthly Google Adwords PPC cost
              </div>
            </div>
          </div>
        </div>

        {/* Keyword Table (Expandable / Toggled) */}
        <AnimatePresence>
          {showKeywordDetail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-5 rounded-2xl bg-slate-950/70 [data-theme=clean-light]:bg-slate-50 border border-white/10 [data-theme=clean-light]:border-slate-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 [data-theme=clean-light]:border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 [data-theme=clean-light]:text-slate-800 font-mono flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sample Tracked Target Keywords & SERP Positions</span>
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 [data-theme=clean-light]:text-slate-500">
                    Live Verified In Google Search Console
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-neutral-400 [data-theme=clean-light]:text-slate-500 border-b border-white/5 [data-theme=clean-light]:border-slate-200 font-mono text-[11px]">
                        <th className="pb-2 font-semibold">Keyword Phrase</th>
                        <th className="pb-2 font-semibold">Search Volume</th>
                        <th className="pb-2 font-semibold">Initial Rank</th>
                        <th className="pb-2 font-semibold">Current Rank</th>
                        <th className="pb-2 font-semibold">Rank Delta</th>
                        <th className="pb-2 font-semibold">SERP Feature</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 [data-theme=clean-light]:divide-slate-200">
                      {activeCase.keywords.map((kw, idx) => {
                        const delta = kw.initialRank - kw.currentRank;
                        return (
                          <tr key={idx} className="hover:bg-white/[0.02] [data-theme=clean-light]:hover:bg-white transition-colors">
                            <td className="py-2.5 font-medium text-white [data-theme=clean-light]:text-slate-900 pr-4">
                              <span className="font-mono text-emerald-400 mr-1.5">•</span>
                              {kw.term}
                            </td>
                            <td className="py-2.5 font-mono text-neutral-300 [data-theme=clean-light]:text-slate-700">{kw.volume}</td>
                            <td className="py-2.5 font-mono text-neutral-400 [data-theme=clean-light]:text-slate-500">#{kw.initialRank}</td>
                            <td className="py-2.5">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono font-bold text-xs ${
                                  kw.currentRank <= 3
                                    ? 'bg-emerald-500/20 text-emerald-400 [data-theme=clean-light]:bg-emerald-100 [data-theme=clean-light]:text-emerald-800 border border-emerald-500/30'
                                    : 'bg-white/10 text-white'
                                }`}
                              >
                                #{kw.currentRank}
                              </span>
                            </td>
                            <td className="py-2.5 font-mono font-bold text-emerald-400 [data-theme=clean-light]:text-emerald-600">
                              +{delta} positions
                            </td>
                            <td className="py-2.5 font-mono text-[11px] text-neutral-400 [data-theme=clean-light]:text-slate-600">
                              {kw.serpFeature}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual Charts Container with Chart Mode Switcher */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 [data-theme=clean-light]:bg-slate-50/80 border border-white/10 [data-theme=clean-light]:border-slate-200">
          {/* Chart Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveChartTab('traffic')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeChartTab === 'traffic'
                    ? 'theme-btn-primary shadow-sm font-bold'
                    : 'bg-white/5 [data-theme=clean-light]:bg-white text-neutral-400 [data-theme=clean-light]:text-slate-600 hover:text-white [data-theme=clean-light]:hover:text-slate-900 border border-white/5 [data-theme=clean-light]:border-slate-200'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Organic Traffic & Impressions</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveChartTab('keywords')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeChartTab === 'keywords'
                    ? 'theme-btn-primary shadow-sm font-bold'
                    : 'bg-white/5 [data-theme=clean-light]:bg-white text-neutral-400 [data-theme=clean-light]:text-slate-600 hover:text-white [data-theme=clean-light]:hover:text-slate-900 border border-white/5 [data-theme=clean-light]:border-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Keyword Rankings Distribution</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 [data-theme=clean-light]:text-slate-600">
              {activeChartTab === 'traffic' ? (
                <>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <span>Monthly Visits</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span>GSC Impressions (k)</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>Top 3</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Top 4–10</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                    <span>Top 11–30</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Recharts Area / Bar Visualizer */}
          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeChartTab === 'traffic' ? (
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="seoVisitsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={primaryColor} stopOpacity={0.45} />
                      <stop offset="95%" stopColor={primaryColor} stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="seoImpressionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255, 255, 255, 0.07)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="monthShort"
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    tickLine={false}
                    tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val)}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload[0].payload;
                      return (
                        <div className="p-3.5 rounded-xl bg-slate-950/95 [data-theme=clean-light]:bg-white border border-white/15 [data-theme=clean-light]:border-slate-200 shadow-2xl backdrop-blur-xl text-xs font-mono">
                          <div className="font-bold text-white [data-theme=clean-light]:text-slate-900 mb-1.5 flex items-center justify-between gap-4">
                            <span>{item.month}</span>
                            {item.milestone && (
                              <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 [data-theme=clean-light]:bg-emerald-100 [data-theme=clean-light]:text-emerald-800">
                                Milestone
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 text-[11px]">
                            <div className="flex items-center justify-between gap-3 text-emerald-400 [data-theme=clean-light]:text-emerald-700">
                              <span>Organic Visits:</span>
                              <strong>{item.visits?.toLocaleString()} / mo</strong>
                            </div>
                            <div className="flex items-center justify-between gap-3 text-cyan-400 [data-theme=clean-light]:text-cyan-700">
                              <span>GSC Impressions:</span>
                              <strong>{item.impressions}k search views</strong>
                            </div>
                            {item.milestone && (
                              <div className="pt-2 mt-1 border-t border-white/10 [data-theme=clean-light]:border-slate-200 font-sans text-neutral-300 [data-theme=clean-light]:text-slate-600 text-[11px]">
                                🎯 {item.milestone}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    name="Organic Visits"
                    stroke={primaryColor}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#seoVisitsGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="impressions"
                    name="GSC Impressions"
                    stroke="#22d3ee"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#seoImpressionGrad)"
                  />
                </AreaChart>
              ) : (
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255, 255, 255, 0.07)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="monthShort"
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    tickLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload[0].payload;
                      return (
                        <div className="p-3.5 rounded-xl bg-slate-950/95 [data-theme=clean-light]:bg-white border border-white/15 [data-theme=clean-light]:border-slate-200 shadow-2xl backdrop-blur-xl text-xs font-mono">
                          <div className="font-bold text-white [data-theme=clean-light]:text-slate-900 mb-1.5">
                            {item.month} Keyword Distribution
                          </div>
                          <div className="space-y-1 text-[11px]">
                            <div className="flex items-center justify-between gap-3 text-emerald-400 [data-theme=clean-light]:text-emerald-700">
                              <span>Top 1–3 Positions:</span>
                              <strong>{item.top3}</strong>
                            </div>
                            <div className="flex items-center justify-between gap-3 text-amber-400 [data-theme=clean-light]:text-amber-700">
                              <span>Top 4–10 Positions:</span>
                              <strong>{item.top10}</strong>
                            </div>
                            <div className="flex items-center justify-between gap-3 text-indigo-400 [data-theme=clean-light]:text-indigo-700">
                              <span>Page 2–3 (11–30):</span>
                              <strong>{item.top30}</strong>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="top3" name="Top 1–3" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="top10" name="Top 4–10" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="top30" name="Top 11–30" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Timeline Milestones Ticker */}
          <div className="mt-4 pt-3 border-t border-white/5 [data-theme=clean-light]:border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-neutral-400 [data-theme=clean-light]:text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Black-Hat or PBN Risk: 100% Google Helpful Content Aligned</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Average Core Web Vitals: Mobile 96+ | Desktop 100</span>
            </span>
          </div>
        </div>

        {/* Tangible SEO Value Callout & Audit Trigger */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/20 [data-theme=clean-light]:from-emerald-50 [data-theme=clean-light]:via-white [data-theme=clean-light]:to-emerald-50 border border-emerald-500/30 [data-theme=clean-light]:border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 [data-theme=clean-light]:text-emerald-700 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Organic SEO Outperforms Paid Ads</span>
            </div>
            <h4 className="font-display text-base sm:text-lg font-bold text-white [data-theme=clean-light]:text-slate-900">
              Stop Paying the Daily "Ad Tax" — Own Your Search Real Estate
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 [data-theme=clean-light]:text-slate-600 max-w-2xl leading-relaxed">
              When Google Ads campaigns stop, traffic drops to zero instantly. High-authority programmatic SEO builds durable digital equity that compounds month after month with zero per-click charges.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => handleAuditClick('Full Website SEO & Core Web Vitals Audit')}
              className="w-full md:w-auto px-6 py-3 rounded-xl theme-btn-primary font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md text-center cursor-pointer hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Request Free SEO Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
