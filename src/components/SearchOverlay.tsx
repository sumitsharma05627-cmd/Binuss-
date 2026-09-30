import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  Briefcase,
  HelpCircle,
  ShieldCheck,
  CornerDownLeft,
  SlidersHorizontal,
  Compass,
  BookOpen,
  Clock,
  Trash2,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import { FAQS_DATA, OBJECTIONS_DATA, PRICING_PLANS, CREATOR_COLLAB_TIERS, PricingPlan } from '../data/pricing';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { DIGITAL_INSIGHTS } from '../data/insights';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../utils/analytics';

export type SearchCategoryFilter = 'all' | 'services' | 'portfolio' | 'faq' | 'plans' | 'insights';

export interface SearchResultItem {
  id: string;
  type: 'service' | 'portfolio' | 'faq' | 'objection' | 'plan' | 'insight';
  title: string;
  subtitle?: string;
  description: string;
  categoryLabel: string;
  targetElementId: string;
  tags?: string[];
  extraMeta?: string;
  actionPayload?: any;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (serviceTitle: string) => void;
  onSelectPlan?: (plan: PricingPlan) => void;
}

const QUICK_SUGGESTIONS = [
  'Creator Collaboration',
  'Website Design',
  'SEO & Google Search',
  'Launchpad Plan (₹5,000 – ₹14,999)',
  'Starter Plan (₹14,999)',
  'Google Ads',
  'Influencer UGC Ads',
  'How much does a website cost?',
  'Social Media vs Website',
  'Turnaround Timeline'
];

const RECENT_SEARCHES_STORAGE_KEY = 'gwl_recent_searches';
const MAX_RECENT_SEARCHES = 8;

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onSelectPlan
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategoryFilter>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is string => typeof item === 'string' && item.trim().length > 0
          );
        }
      }
    } catch {
      // Safe fallback if localStorage is disabled or corrupted
    }
    return [];
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Save new search query to recent searches
  const addRecentSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed || trimmed.length < 2) return;
    trackEvent('search_query', { query: trimmed });
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      try {
        localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Storage full or unavailable
      }
      return updated;
    });
  };

  // Remove individual recent search
  const removeRecentSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item.toLowerCase() !== termToRemove.toLowerCase());
      try {
        localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Safe fallback
      }
      return updated;
    });
  };

  // Clear all recent searches
  const clearAllRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_STORAGE_KEY);
    } catch {
      // Safe fallback
    }
  };

  // Click on a recent search to re-run query
  const handleSelectRecentSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    addRecentSearch(searchTerm);
    inputRef.current?.focus();
  };

  // Compile all searchable data
  const allSearchableItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Services
    SERVICES.forEach((srv) => {
      items.push({
        id: `srv-${srv.id}`,
        type: 'service',
        title: srv.title,
        subtitle: srv.metrics,
        description: `${srv.shortDesc} ${srv.fullDesc}`,
        categoryLabel: 'Service',
        targetElementId: `service-card-${srv.id}`,
        tags: [...srv.deliverables, 'development', 'design', 'growth'],
        extraMeta: `${srv.deliverables.length} Deliverables included`,
        actionPayload: srv
      });
    });

    // 2. Portfolio Items
    PROJECTS.forEach((proj) => {
      items.push({
        id: `proj-${proj.id}`,
        type: 'portfolio',
        title: proj.title,
        subtitle: proj.category,
        description: `${proj.tagline}. ${proj.description}`,
        categoryLabel: 'Portfolio',
        targetElementId: `portfolio-item-${proj.id}`,
        tags: [proj.category, proj.clientType, ...proj.deliverables],
        extraMeta: proj.clientType,
        actionPayload: proj
      });
    });

    // 3. Objections
    OBJECTIONS_DATA.forEach((obj) => {
      items.push({
        id: `obj-${obj.id}`,
        type: 'objection',
        title: obj.objection.replace(/"/g, ''),
        subtitle: 'Honest Clarification',
        description: `${obj.answer} ${obj.gwlPoint || obj.kbsrPoint}`,
        categoryLabel: 'FAQ & Topic',
        targetElementId: `faq-objection-${obj.id}`,
        tags: ['clarification', 'decision', 'objection', 'advice'],
        extraMeta: obj.gwlPoint || obj.kbsrPoint,
        actionPayload: { id: obj.id, type: 'objection' }
      });
    });

    // 4. FAQs
    FAQS_DATA.forEach((faq) => {
      items.push({
        id: `faq-${faq.id}`,
        type: 'faq',
        title: faq.question,
        subtitle: 'Frequently Asked Question',
        description: faq.answer,
        categoryLabel: 'FAQ & Topic',
        targetElementId: `faq-item-${faq.id}`,
        tags: ['pricing', 'timeline', 'maintenance', 'deliverables', 'guarantee'],
        extraMeta: 'Direct Answer',
        actionPayload: { id: faq.id, type: 'faq' }
      });
    });

    // 5. Plans
    PRICING_PLANS.forEach((plan) => {
      items.push({
        id: `plan-${plan.id}`,
        type: 'plan',
        title: `${plan.name} Plan`,
        subtitle: `${plan.startingPrice} • ${plan.deliveryTime}`,
        description: `${plan.tagline} Target: ${plan.targetAudience}. Features: ${plan.features.join(', ')}`,
        categoryLabel: 'Growth Plan',
        targetElementId: `pricing-card-${plan.id}`,
        tags: [...plan.features, plan.billingPeriod, 'pricing', 'package', 'cost'],
        extraMeta: plan.targetAudience,
        actionPayload: plan
      });
    });

    // 5b. Creator Collaboration Tiers
    CREATOR_COLLAB_TIERS.forEach((tier) => {
      items.push({
        id: `collab-${tier.id}`,
        type: 'service',
        title: `${tier.name} (Creator Collab)`,
        subtitle: `${tier.priceDisplay} (${tier.priceNote}) • ${tier.turnaround}`,
        description: `${tier.tagline} Model: ${tier.modelType}. Deliverables: ${tier.deliverables.join(', ')}`,
        categoryLabel: 'Creator Collab',
        targetElementId: 'creator-collaboration-section',
        tags: [...tier.deliverables, 'creator', 'influencer', 'collab', 'ugc', 'rev-share', tier.modelType],
        extraMeta: `${tier.metrics} • Differentiated Pricing`,
        actionPayload: { id: tier.id, title: tier.name }
      });
    });

    // 6. Client Testimonials
    TESTIMONIALS_DATA.forEach((t) => {
      items.push({
        id: `testimonial-${t.id}`,
        type: 'portfolio',
        title: `${t.author} (${t.company})`,
        subtitle: `${t.highlightMetric} • ${t.industry}`,
        description: `${t.quote.en} ${t.quote.hi} ${t.quote.es}`,
        categoryLabel: 'Client Review',
        targetElementId: 'testimonials',
        tags: ['testimonial', 'review', 'rating', 'feedback', t.industry, t.location, t.serviceTag],
        extraMeta: `${t.rating} Stars • Verified Client`,
        actionPayload: t
      });
    });

    // 7. Digital Insights & Blueprints
    DIGITAL_INSIGHTS.forEach((ins) => {
      items.push({
        id: `ins-${ins.id}`,
        type: 'insight',
        title: ins.title,
        subtitle: `${ins.category} • ${ins.readingTime}`,
        description: `${ins.previewText} ${ins.keyTakeaway}`,
        categoryLabel: 'Digital Insight',
        targetElementId: 'insights',
        tags: [...ins.tags, ins.category, 'article', 'blueprint', 'guide', 'insights'],
        extraMeta: `${ins.impactMetric.label}: ${ins.impactMetric.value}`,
        actionPayload: ins
      });
    });

    // 8. Newsletter Signup
    items.push({
      id: 'newsletter-blueprints',
      type: 'insight',
      title: 'Tactical Growth Blueprints (Newsletter)',
      subtitle: 'Bi-Weekly Technical & Conversion Engineering Briefs',
      description: 'Subscribe to receive private engineering teardowns, sub-second latency optimizations, and high-converting funnel mechanics.',
      categoryLabel: 'Newsletter',
      targetElementId: 'growth-newsletter',
      tags: ['newsletter', 'blueprints', 'email', 'signup', 'insights', 'subscribe', 'updates', 'engineering'],
      extraMeta: 'Bi-Weekly Briefs'
    });

    // 9. Global Reach & Client Locations
    items.push({
      id: 'global-reach-mesh',
      type: 'portfolio',
      title: 'Global Reach & Client Deployments',
      subtitle: 'Gwalior HQ, Tier-2 Clusters & International Edge Nodes',
      description: 'Interactive map and 3D globe visualization displaying client platforms (Georgians Academy, Yanshi Physio, BrightEdge, Tell Well) and global CDN mesh.',
      categoryLabel: 'Global Reach',
      targetElementId: 'reach',
      tags: ['global reach', 'locations', 'map', '3d globe', 'clients', 'gwalior', 'dubai', 'london', 'new york', 'singapore'],
      extraMeta: '9 Active Nodes'
    });

    // 10. AI Doubt Resolver Chatbot
    items.push({
      id: 'ai-doubt-resolver',
      type: 'faq',
      title: 'AI Doubt Resolver & Technical Assistant',
      subtitle: 'Instant Answers on Pricing, Timelines, Ownership & SEO',
      description: 'Interactive AI Chatbot trained on GWL Weblab engineering standards to resolve common doubts 24/7.',
      categoryLabel: 'AI Chatbot',
      targetElementId: 'faqs',
      tags: ['doubt', 'doubts', 'chatbot', 'bot', 'chat', 'ask ai', 'questions', 'support', 'help', 'pricing'],
      extraMeta: 'Instant Resolution'
    });

    return items;
  }, []);

  // Filter items based on query and category
  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    return allSearchableItems.filter((item) => {
      // Category check
      if (selectedCategory === 'services' && item.type !== 'service') return false;
      if (selectedCategory === 'portfolio' && item.type !== 'portfolio') return false;
      if (
        selectedCategory === 'faq' &&
        item.type !== 'faq' &&
        item.type !== 'objection'
      )
        return false;
      if (selectedCategory === 'plans' && item.type !== 'plan') return false;
      if (selectedCategory === 'insights' && item.type !== 'insight') return false;

      // Query check
      if (!trimmed) return true;

      const titleMatch = item.title.toLowerCase().includes(trimmed);
      const subtitleMatch = item.subtitle?.toLowerCase().includes(trimmed);
      const descMatch = item.description.toLowerCase().includes(trimmed);
      const tagsMatch = item.tags?.some((t) => t.toLowerCase().includes(trimmed));

      return titleMatch || subtitleMatch || descMatch || tagsMatch;
    });
  }, [allSearchableItems, query, selectedCategory]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [filteredResults.length, selectedCategory]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedCategory('all');
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(
        `[data-search-index="${activeIndex}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  // Handle result selection
  const handleSelectItem = (item: SearchResultItem) => {
    if (query.trim()) {
      addRecentSearch(query);
    } else {
      addRecentSearch(item.title);
    }
    onClose();

    // 1. Specific custom triggers
    if (item.type === 'service' && onSelectService) {
      onSelectService(item.title);
    } else if (item.type === 'plan' && onSelectPlan) {
      onSelectPlan(item.actionPayload as PricingPlan);
    } else if (item.type === 'faq' || item.type === 'objection') {
      // Dispatch custom event to notify ObjectionFaqSection to expand this question
      window.dispatchEvent(
        new CustomEvent('gwl:select-faq', {
          detail: item.actionPayload
        })
      );
      window.dispatchEvent(
        new CustomEvent('kbsr:select-faq', {
          detail: item.actionPayload
        })
      );
    }

    // 2. Smooth scroll to target element with visual flash
    setTimeout(() => {
      const el = document.getElementById(item.targetElementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a temporary highlight pulse ring
        el.classList.add('ring-2', 'ring-emerald-400', 'ring-offset-4', 'ring-offset-[#050811]');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-emerald-400', 'ring-offset-4', 'ring-offset-[#050811]');
        }, 2400);
      } else {
        // Fallback section scroll
        const sectionMap: Record<string, string> = {
          service: 'services',
          portfolio: 'work',
          faq: 'faq',
          objection: 'faq',
          plan: 'plans',
          insight: 'insights'
        };
        const secId = sectionMap[item.type];
        if (secId) {
          document.getElementById(secId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 150);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev <= 0 ? Math.max(0, filteredResults.length - 1) : prev - 1
        );
      } else if (e.key === 'Enter') {
        if (query.trim()) {
          addRecentSearch(query);
        }
        if (filteredResults[activeIndex]) {
          e.preventDefault();
          handleSelectItem(filteredResults[activeIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, filteredResults, onClose]);

  // Highlight matching text helper
  const highlightMatch = (text: string, search: string) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-emerald-400 font-bold bg-emerald-950/60 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const getCategoryIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'service':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'portfolio':
        return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'faq':
      case 'objection':
        return <HelpCircle className="w-4 h-4 text-amber-400" />;
      case 'plan':
        return <ShieldCheck className="w-4 h-4 text-emerald-300" />;
      case 'insight':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getBadgeClass = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'service':
        return 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300';
      case 'portfolio':
        return 'bg-cyan-950/50 border-cyan-500/30 text-cyan-300';
      case 'faq':
      case 'objection':
        return 'bg-amber-950/50 border-amber-500/30 text-amber-300';
      case 'plan':
        return 'bg-teal-950/50 border-teal-500/30 text-teal-300';
      case 'insight':
        return 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300';
      default:
        return 'bg-white/10 border-white/10 text-white';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search services, portfolio, and FAQs"
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 lg:p-10"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Sliding Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#090e1c] border border-white/10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden z-10 flex flex-col max-h-[85vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#0a1122]">
              <Search className="w-5 h-5 text-emerald-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search.placeholder}
                className="w-full bg-transparent text-white placeholder:text-neutral-500 text-base sm:text-lg focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label={t.search.clear}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-400 text-xs font-mono">
                <span>{t.search.esc}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={t.search.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="px-4 py-2.5 bg-[#060a14] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
              <span className="text-neutral-500 mr-1 flex items-center gap-1 shrink-0">
                <SlidersHorizontal className="w-3 h-3" />
                Filter:
              </span>
              {[
                { id: 'all', label: t.search.allResults },
                { id: 'services', label: t.search.servicesFilter },
                { id: 'portfolio', label: t.search.portfolioFilter },
                { id: 'faq', label: t.search.faqFilter },
                { id: 'plans', label: t.search.plansFilter }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as SearchCategoryFilter)}
                  className={`px-3 py-1 rounded-full transition-all whitespace-nowrap cursor-pointer font-medium ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-400 text-black font-semibold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Recent Searches (when query is empty and user has past searches) */}
            {!query.trim() && recentSearches.length > 0 && (
              <div className="p-4 sm:p-5 border-b border-white/5 bg-[#080d1a]/95">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold text-neutral-300">{t.search.recentSearches}</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono">
                      {recentSearches.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={clearAllRecentSearches}
                    className="text-[11px] font-mono text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-white/5 cursor-pointer"
                    title={t.search.clearRecent}
                    aria-label={t.search.clearRecent}
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{t.search.clearRecent}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelectRecentSearch(term)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectRecentSearch(term);
                        }
                      }}
                      className="group inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-lg bg-white/[0.04] hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/40 text-xs text-neutral-200 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    >
                      <Clock className="w-3 h-3 text-emerald-400/80 group-hover:text-emerald-400 shrink-0" />
                      <span className="max-w-[200px] sm:max-w-[280px] truncate">{term}</span>
                      <button
                        type="button"
                        onClick={(e) => removeRecentSearch(e, term)}
                        className="p-1 rounded-md text-neutral-400 hover:text-rose-300 hover:bg-rose-500/20 transition-colors ml-0.5 cursor-pointer"
                        title={`Remove "${term}"`}
                        aria-label={`Remove "${term}"`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Suggestions (when query is empty) */}
            {!query.trim() && (
              <div className="p-4 sm:p-5 border-b border-white/5 bg-[#070c18]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.search.quickSuggestions}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => {
                        setQuery(sug);
                        addRecentSearch(sug);
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-emerald-500/30 text-xs text-neutral-300 hover:text-white transition-all cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results List */}
            <div
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 divide-y divide-white/[0.04]"
            >
              {filteredResults.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-neutral-500">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-1">
                    {t.search.noResults} {query ? `"${query}"` : ''}
                  </h4>
                  <p className="text-neutral-400 text-sm max-w-sm mx-auto mb-4">
                    {t.search.tryBroader}
                  </p>
                  <button
                    onClick={() => {
                      setQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 transition-colors cursor-pointer"
                  >
                    {t.search.clearFilter}
                  </button>
                </div>
              ) : (
                filteredResults.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={item.id}
                      data-search-index={idx}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`group p-3.5 sm:p-4 rounded-2xl transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isActive
                          ? 'bg-[#101a30] border border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.12)]'
                          : 'bg-[#0a0f1e]/40 border border-transparent hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                            isActive
                              ? 'bg-emerald-500/20 border-emerald-500/40'
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          {getCategoryIcon(item.type)}
                        </div>

                        <div className="min-w-0 flex-1">
                          {/* Title & Badge */}
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-display text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {highlightMatch(item.title, query)}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${getBadgeClass(
                                item.type
                              )}`}
                            >
                              {item.categoryLabel}
                            </span>
                            {item.subtitle && (
                              <span className="text-xs font-mono text-emerald-400/90 hidden sm:inline">
                                • {item.subtitle}
                              </span>
                            )}
                          </div>

                          {/* Description Snippet */}
                          <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                            {highlightMatch(item.description, query)}
                          </p>

                          {/* Extra Metadata tags */}
                          {item.extraMeta && (
                            <div className="mt-2 text-[11px] text-neutral-400 flex items-center gap-1.5">
                              <span className="font-mono text-emerald-400/80">HIGHLIGHT:</span>
                              <span className="truncate">{item.extraMeta}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center self-center shrink-0">
                        <div
                          className={`p-2 rounded-xl transition-all ${
                            isActive
                              ? 'bg-emerald-400 text-black translate-x-1'
                              : 'bg-white/5 text-neutral-500 group-hover:text-white'
                          }`}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className="p-3 bg-[#060a14] border-t border-white/5 px-5 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-neutral-300">
                    ↑↓
                  </span>
                  <span>{t.search.navigate}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-neutral-300 flex items-center">
                    <CornerDownLeft className="w-3 h-3" />
                  </span>
                  <span>{t.search.select}</span>
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-neutral-300">
                    ESC
                  </span>
                  <span>{t.search.close}</span>
                </span>
              </div>

              <div className="text-[11px] font-mono text-emerald-400">
                {filteredResults.length}{' '}
                {filteredResults.length === 1 ? t.search.resultCountSingle : t.search.resultCountPlural}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
