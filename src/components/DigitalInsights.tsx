import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Search,
  X,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Tag,
  Calendar,
  Layers,
  Zap,
  ExternalLink,
  Code2,
  Globe,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DIGITAL_INSIGHTS,
  INSIGHT_CATEGORIES,
  InsightArticle,
  InsightCategorySlug
} from '../data/insights';
import { InsightsNewsletter } from './InsightsNewsletter';
import { SeoPerformancePanel } from './SeoPerformancePanel';
import { ContactModal } from './ContactModal';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface DigitalInsightsProps {
  onSelectInsightForInquiry?: (insightTitle: string) => void;
}

export const DigitalInsights: React.FC<DigitalInsightsProps> = ({
  onSelectInsightForInquiry
}) => {
  const { t } = useLanguage();
  const { themeConfig } = useTheme();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeViewTab, setActiveViewTab] = useState<'articles' | 'seo-performance'>('articles');
  const [sortBy, setSortBy] = useState<'newest' | 'reading-asc' | 'reading-desc' | 'impact' | 'title'>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [checkedChecklistItems, setCheckedChecklistItems] = useState<Record<string, boolean>>({});

  // Contact Modal state for Free SEO Audit
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [auditModalContext, setAuditModalContext] = useState<{
    benchmarkTitle?: string;
    prefilledMessage?: string;
  }>({});

  const handleOpenSeoAuditModal = (context?: string) => {
    const contextTitle = context || 'Technical SEO & Keyword Ranking Audit';
    const prefilledMessage = `Hi GWL Weblab Team,\n\nI would like to request a Free Comprehensive SEO Audit for my website${
      context ? ` (Reference: ${context})` : ''
    }. Please analyze our technical Core Web Vitals, organic keyword rankings, on-page optimization, and backlink authority to identify traffic growth opportunities.`;

    setAuditModalContext({
      benchmarkTitle: contextTitle,
      prefilledMessage
    });
    setIsContactModalOpen(true);
    onSelectInsightForInquiry?.(contextTitle);
  };

  // Dynamic category icon resolver
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'all':
        return Layers;
      case 'seo':
        return Search;
      case 'web-dev':
      case 'web-arch':
        return Code2;
      case 'digital-marketing':
      case 'ads':
        return TrendingUp;
      case 'cro':
        return Zap;
      case 'ai':
        return Sparkles;
      case 'branding':
        return Palette;
      default:
        return BookOpen;
    }
  };

  // Article count breakdown per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: DIGITAL_INSIGHTS.length
    };
    INSIGHT_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = DIGITAL_INSIGHTS.filter((item) => {
          if (cat.id === 'web-dev') return item.categorySlug === 'web-dev' || item.categorySlug === 'web-arch';
          if (cat.id === 'digital-marketing') return item.categorySlug === 'digital-marketing' || item.categorySlug === 'ads';
          return item.categorySlug === cat.id;
        }).length;
      }
    });
    return counts;
  }, []);

  // Active Category Meta Information
  const activeCategoryObj = useMemo(() => {
    return INSIGHT_CATEGORIES.find((c) => c.id === activeCategory) || INSIGHT_CATEGORIES[0];
  }, [activeCategory]);

  // Filter & sort insights based on category, search query, and sort mode
  const filteredInsights = useMemo(() => {
    const list = DIGITAL_INSIGHTS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        item.categorySlug === activeCategory ||
        (activeCategory === 'web-dev' && item.categorySlug === 'web-arch') ||
        (activeCategory === 'digital-marketing' && item.categorySlug === 'ads');

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.previewText.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        item.keyTakeaway.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });

    return list.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime();
        case 'reading-asc':
          return a.readingMinutes - b.readingMinutes;
        case 'reading-desc':
          return b.readingMinutes - a.readingMinutes;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'impact':
          return b.readingMinutes - a.readingMinutes;
        default:
          return 0;
      }
    });
  }, [activeCategory, searchQuery, sortBy]);

  // Handle code snippet copy
  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Handle share article link
  const handleShare = (article: InsightArticle) => {
    const url = `${window.location.origin}${window.location.pathname}#insights-${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // Toggle checklist item state in reader
  const toggleChecklistItem = (itemText: string) => {
    setCheckedChecklistItems((prev) => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  // Reset checklist when article changes
  useEffect(() => {
    setCheckedChecklistItems({});
  }, [activeArticle]);

  // Lock body scroll when reader modal is open
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeArticle]);

  // Structured Data (Schema.org JSON-LD) for SEO
  const schemaStructuredData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': 'https://gwlweblab.com/#insights-blog',
      name: 'GWL WebLab Digital Insights',
      description:
        'Tactical engineering and growth insights on web performance, local SEO, conversion funnels, and AI automation.',
      publisher: {
        '@type': 'Organization',
        name: 'GWL WebLab',
        alternateName: 'Gwalior WebLab / Global WebLab',
        url: 'https://gwlweblab.com/'
      },
      blogPost: DIGITAL_INSIGHTS.map((article) => ({
        '@type': 'BlogPosting',
        '@id': `https://gwlweblab.com/#insights-${article.slug}`,
        headline: article.title,
        description: article.previewText,
        datePublished: article.isoDate,
        dateModified: article.isoDate,
        inLanguage: 'en',
        author: {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role
        },
        publisher: {
          '@type': 'Organization',
          name: 'GWL WebLab'
        },
        timeRequired: `PT${article.readingMinutes}M`,
        keywords: article.tags.join(', '),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://gwlweblab.com/#insights-${article.slug}`
        }
      }))
    };
  }, []);

  return (
    <section
      id="insights"
      aria-label="Digital Insights & Knowledge Base"
      className="relative py-24 sm:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Schema.org BlogPosting Injection for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaStructuredData) }}
      />

      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${themeConfig.primaryColor}, transparent 70%)`
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[350px] rounded-full blur-[160px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${themeConfig.accentColor}, transparent 75%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-badge text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md"
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: themeConfig.primaryColor }} />
            <span>{t.insights.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 font-outfit"
          >
            {t.insights.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            {t.insights.subtitle}
          </motion.p>
        </div>

        {/* View Mode Switcher: Knowledge Guides vs Live SEO Performance Panel */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] [data-theme='clean-light']:bg-slate-100 border border-white/10 [data-theme='clean-light']:border-slate-200 backdrop-blur-md shadow-lg">
            <button
              type="button"
              onClick={() => setActiveViewTab('articles')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeViewTab === 'articles'
                  ? 'theme-btn-primary shadow-md'
                  : "text-neutral-400 [data-theme='clean-light']:text-slate-600 hover:text-white [data-theme='clean-light']:hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Tactical Growth Guides</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/20 text-current">
                {DIGITAL_INSIGHTS.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveViewTab('seo-performance')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeViewTab === 'seo-performance'
                  ? 'theme-btn-primary shadow-md'
                  : "text-neutral-400 [data-theme='clean-light']:text-slate-600 hover:text-white [data-theme='clean-light']:hover:text-slate-900"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>SEO Performance Panel</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 [data-theme='clean-light']:text-emerald-800 font-bold uppercase tracking-wider">
                Recharts Live
              </span>
            </button>
          </div>
        </div>

        {activeViewTab === 'seo-performance' ? (
          /* Interactive SEO Performance Panel */
          <div className="mb-12">
            <SeoPerformancePanel
              onRequestSeoAudit={handleOpenSeoAuditModal}
              onAuditRequest={handleOpenSeoAuditModal}
            />
          </div>
        ) : (
          /* Articles & Engineering Knowledge Base View */
          <>
            {/* Filter Bar, Quick Topics & Search/Sort Controls */}
            <div className="mb-12 space-y-4">
              {/* Quick Topic Filter Chips */}
              <div className="flex flex-wrap items-center gap-2 pb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mr-1 font-mono">
                  <Filter className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Quick Topics:</span>
                </span>

                {[
                  { id: 'seo' as const, label: 'SEO', icon: Search, count: categoryCounts['seo'] },
                  { id: 'web-dev' as const, label: 'Web Development', icon: Code2, count: categoryCounts['web-dev'] },
                  { id: 'digital-marketing' as const, label: 'Digital Marketing', icon: TrendingUp, count: categoryCounts['digital-marketing'] },
                  { id: 'cro' as const, label: 'Conversion', icon: Zap, count: categoryCounts['cro'] },
                  { id: 'ai' as const, label: 'AI & Automation', icon: Sparkles, count: categoryCounts['ai'] }
                ].map((topic) => {
                  const isTopicActive = activeCategory === topic.id;
                  const IconComp = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setActiveCategory(isTopicActive ? 'all' : topic.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isTopicActive
                          ? 'theme-btn-primary shadow-sm'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/10'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{topic.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isTopicActive ? 'bg-black/30 text-current font-bold' : 'bg-white/10 text-neutral-400'
                        }`}
                      >
                        {topic.count || 0}
                      </span>
                    </button>
                  );
                })}

                {/* Direct Shortcut to SEO Performance Panel */}
                <button
                  type="button"
                  onClick={() => setActiveViewTab('seo-performance')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Keyword & Traffic Visualizer</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-emerald-500/30 text-emerald-200 font-bold">
                    Recharts
                  </span>
                </button>

                {activeCategory !== 'all' && (
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-neutral-400 hover:text-white underline cursor-pointer ml-1"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

          {/* Full Category Tabs & Controls Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Scrollable Tabs */}
            <div
              role="tablist"
              aria-label="Filter insights by topic"
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full"
            >
              {INSIGHT_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count = categoryCounts[cat.id] ?? 0;
                const Icon = getCategoryIcon(cat.id);
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategory(cat.id)}
                    style={
                      isSelected
                        ? {
                            backgroundColor: `${themeConfig.primaryColor}22`,
                            borderColor: `${themeConfig.primaryColor}55`,
                            color: themeConfig.primaryColor,
                            boxShadow: `0 0 16px ${themeConfig.primaryColor}30`
                          }
                        : {}
                    }
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? 'font-semibold'
                        : 'bg-white/[0.03] border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.06] hover:border-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.id === 'all' ? t.insights.filterAll : cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                        isSelected
                          ? 'bg-black/40 text-current'
                          : 'bg-white/[0.06] text-neutral-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sort & Keyword Search Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              {/* Quick Sort Dropdown */}
              <div className="relative min-w-[170px]">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort insights"
                  className="w-full pl-8 pr-7 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500/50 cursor-pointer appearance-none transition-all"
                >
                  <option value="newest">Sort: Latest Published</option>
                  <option value="reading-asc">Sort: Fastest Read (4-5 min)</option>
                  <option value="reading-desc">Sort: In-Depth Study (6+ min)</option>
                  <option value="title">Sort: Alphabetical (A - Z)</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[9px]">
                  ▼
                </div>
              </div>

              {/* Keyword Search Input */}
              <div className="relative min-w-[200px] sm:min-w-[240px]">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.insights.searchPlaceholder}
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white p-0.5 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Active Topic Context Banner */}
          {activeCategory !== 'all' && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 sm:p-4 rounded-xl theme-card-bg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg theme-badge">
                  {React.createElement(getCategoryIcon(activeCategory), { className: 'w-4 h-4' })}
                </span>
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    <span>Topic: {activeCategoryObj.label}</span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      ({filteredInsights.length} {filteredInsights.length === 1 ? 'blueprint' : 'blueprints'})
                    </span>
                  </div>
                  <p className="text-neutral-400 text-[11px] mt-0.5">
                    {activeCategoryObj.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-neutral-500 text-[11px] hidden md:inline">Quick switch:</span>
                {(['seo', 'web-dev', 'digital-marketing'] as const)
                  .filter((catId) => catId !== activeCategory)
                  .map((catId) => {
                    const cat = INSIGHT_CATEGORIES.find((c) => c.id === catId);
                    if (!cat) return null;
                    return (
                      <button
                        key={catId}
                        onClick={() => setActiveCategory(catId)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] transition-colors cursor-pointer"
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-[11px] transition-colors cursor-pointer"
                >
                  View All
                </button>
              </div>
            </motion.div>
          )}

          {/* Quick results counter */}
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1 font-mono">
            <span>
              Showing {filteredInsights.length} of {DIGITAL_INSIGHTS.length} strategic articles
              {activeCategory !== 'all' && ` • Topic: ${activeCategoryObj.label}`}
              {sortBy !== 'newest' && ` • Sorted`}
            </span>
            {(activeCategory !== 'all' || searchQuery || sortBy !== 'newest') && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setSortBy('newest');
                }}
                className="text-emerald-400 hover:underline cursor-pointer"
              >
                {t.insights.clearFilter}
              </button>
            )}
          </div>
        </div>

        {/* Smart Callout when viewing SEO Topic in Articles mode */}
        {activeCategory === 'seo' && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-emerald-950/30 [data-theme='clean-light']:from-emerald-50 [data-theme='clean-light']:to-teal-50 border border-emerald-500/30 [data-theme='clean-light']:border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white [data-theme='clean-light']:text-slate-900 font-display">
                  Interactive SEO Performance & Keyword Rankings Panel
                </div>
                <div className="text-xs text-neutral-300 [data-theme='clean-light']:text-slate-600">
                  Visualize real keyword rank jumps, Google Search Console impressions, and CPC cost savings using Recharts.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveViewTab('seo-performance')}
              className="px-4 py-2 rounded-xl theme-btn-primary text-xs font-bold whitespace-nowrap cursor-pointer hover:scale-[1.02] transition-transform shadow-md"
            >
              Open SEO Visualizer →
            </button>
          </div>
        )}

        {/* Empty Search State */}
        {filteredInsights.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/5 my-8">
            <BookOpen className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <p className="text-white font-medium mb-1">{t.insights.noResults}</p>
            <p className="text-xs text-neutral-500 mb-5">
              No matching insights under current filter. Try one of our primary topics:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <button
                onClick={() => {
                  setActiveCategory('seo');
                  setSearchQuery('');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-emerald-400" />
                <span>SEO Guides</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('web-dev');
                  setSearchQuery('');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Web Development</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('digital-marketing');
                  setSearchQuery('');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Digital Marketing</span>
              </button>
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSortBy('newest');
              }}
              className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
            >
              {t.insights.clearFilter}
            </button>
          </div>
        )}

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredInsights.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              onClick={() => setActiveArticle(article)}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl theme-card-bg border transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden"
            >
              {/* Subtle top glowing bar on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`
                }}
              />

              <div>
                {/* Meta Top Line: Category & Reading Time */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategory(article.categorySlug);
                    }}
                    title={`Filter by ${article.category}`}
                    className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase theme-badge hover:opacity-85 transition-opacity cursor-pointer"
                  >
                    {article.category}
                  </button>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{article.readingTime}</span>
                  </div>
                </div>

                {/* Impact Highlight Badge */}
                <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[11px] font-mono text-neutral-300">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-neutral-400">{article.impactMetric.label}:</span>
                  <span className="text-emerald-400 font-bold">{article.impactMetric.value}</span>
                </div>

                {/* Article Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white font-outfit mb-3 group-hover:text-emerald-300 transition-colors duration-200 line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                {/* Preview Text (as requested) */}
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                  {article.previewText}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {article.tags.slice(0, 3).map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery(tag);
                      }}
                      title={`Search tagged #${tag}`}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-neutral-400 hover:text-white border border-white/5 hover:border-white/15 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Footer: Author + Read Article Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-emerald-300">
                    {article.author.avatarInitials}
                  </div>
                  <div>
                    <span className="text-neutral-300 font-medium block leading-tight">
                      {article.author.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 leading-tight">
                      {article.publishedDate}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform duration-200">
                  <span>{t.insights.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        </>
        )}

        {/* Tactical Growth Blueprints Newsletter Signup */}
        <div className="mt-16">
          <InsightsNewsletter />
        </div>

        {/* Bottom Banner with Inquiry Callout */}
        <div className="mt-12 p-8 rounded-2xl glass-card theme-card-bg border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="text-lg font-bold text-white font-outfit mb-1">
              Have specific questions about scaling your digital infrastructure?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Our engineering team analyzes your existing website speed, SEO profile, and conversion bottlenecks with a zero-obligation technical audit.
            </p>
          </div>
          <button
            onClick={() => onSelectInsightForInquiry?.('General Architecture Consultation')}
            className="px-5 py-2.5 rounded-xl theme-btn-primary font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md whitespace-nowrap cursor-pointer"
          >
            Request Technical Audit
          </button>
        </div>
      </div>

      {/* In-Depth Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#080d1a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 text-neutral-200"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#060a14]/90 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveCategory(activeArticle.categorySlug);
                      setActiveArticle(null);
                    }}
                    title={`Filter all ${activeArticle.category} articles`}
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider theme-badge hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    {activeArticle.category}
                  </button>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeArticle.readingTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(activeArticle)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Share insight link"
                  >
                    {shareSuccess ? (
                      <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title={t.insights.closeReader}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Article Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-8 scrollbar-thin">
                {/* Article Header */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit mb-4 leading-snug">
                    {activeArticle.title}
                  </h2>

                  {/* Author & Date metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pb-6 border-b border-white/10 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center font-bold text-[10px] text-emerald-300">
                        {activeArticle.author.avatarInitials}
                      </div>
                      <span>
                        {t.insights.authorPrefix} <strong className="text-neutral-200">{activeArticle.author.name}</strong> ({activeArticle.author.role})
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{activeArticle.publishedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Key Commercial Takeaway Callout */}
                <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3.5">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 mb-1">
                      {t.insights.keyTakeawayLabel}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                      {activeArticle.keyTakeaway}
                    </p>
                  </div>
                </div>

                {/* Article Introduction */}
                <div className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  <p>{activeArticle.fullContent.introduction}</p>
                </div>

                {/* Article In-Depth Sections */}
                <div className="space-y-6">
                  {activeArticle.fullContent.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white font-outfit">
                        {section.heading}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {section.body}
                      </p>

                      {section.bulletPoints && (
                        <ul className="space-y-2 pl-2">
                          {section.bulletPoints.map((bp, bpIdx) => (
                            <li key={bpIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2"></span>
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.codeSnippet && (
                        <div className="relative rounded-xl bg-[#03060d] border border-white/10 p-4 font-mono text-xs overflow-x-auto my-3">
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] text-neutral-500">
                            <span>{section.codeLanguage?.toUpperCase() || 'CODE'}</span>
                            <button
                              onClick={() => handleCopyCode(section.codeSnippet!, sIdx)}
                              className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                            >
                              {copiedCodeIndex === sIdx ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Snippet</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
                            {section.codeSnippet}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Interactive Checklist & Audit Framework */}
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider font-outfit">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{t.insights.frameworkChecklist}</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Audit your current setup against this blueprint. Click items to verify completion:
                  </p>
                  <div className="space-y-2.5 pt-2">
                    {activeArticle.fullContent.checklist.map((item, cIdx) => {
                      const isChecked = !!checkedChecklistItems[item];
                      return (
                        <div
                          key={cIdx}
                          onClick={() => toggleChecklistItem(item)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 line-through opacity-75'
                              : 'bg-white/[0.02] border-white/5 text-neutral-300 hover:border-white/15'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 rounded border-white/20 text-emerald-500 focus:ring-0 cursor-pointer"
                          />
                          <span className="leading-snug">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actionable Takeaway Box */}
                <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  <strong className="text-white block mb-1">Bottom Line:</strong>
                  {activeArticle.fullContent.actionableTakeaway}
                </div>

                {/* Embedded Newsletter Callout inside Article Reader */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">
                      Liked this technical teardown?
                    </h5>
                    <p className="text-xs text-neutral-300">
                      Join 1,850+ founders & engineers receiving our bi-weekly Tactical Growth Blueprints.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveArticle(null);
                      setTimeout(() => {
                        const el = document.getElementById('growth-newsletter');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          const emailInput = document.getElementById('newsletter-email');
                          if (emailInput) emailInput.focus();
                        }
                      }, 200);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs whitespace-nowrap transition-colors cursor-pointer"
                  >
                    Subscribe to Blueprints
                  </button>
                </div>

                {/* Tags Footer */}
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-neutral-400">
                  <Tag className="w-3.5 h-3.5 text-neutral-500" />
                  {activeArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-[#060a14] flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
                <div className="text-xs text-neutral-400 text-center sm:text-left">
                  Need help executing this blueprint?
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    {t.insights.closeReader}
                  </button>

                  <button
                    onClick={() => {
                      const articleTitle = activeArticle.title;
                      setActiveArticle(null);
                      onSelectInsightForInquiry?.(`Strategy Consultation: ${articleTitle}`);
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl theme-btn-primary font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  >
                    <span>{t.insights.discussStrategy}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Free SEO Audit Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialService="SEO & Google Search"
        initialSubject="Free Technical SEO Audit"
        initialMessage={auditModalContext.prefilledMessage}
        contextBenchmark={auditModalContext.benchmarkTitle}
      />
    </section>
  );
};
