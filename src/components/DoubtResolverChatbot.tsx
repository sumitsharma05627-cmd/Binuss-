import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageSquareCode,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  Phone,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { FAQS_DATA, PRICING_PLANS } from '../data/pricing';

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    actionType: 'whatsapp' | 'call' | 'contact' | 'portfolio' | 'pricing' | 'services';
    targetId?: string;
  };
}

export const COMMON_DOUBTS = [
  {
    id: 'pricing-doubt',
    question: 'How much does a website or digital system cost?',
    shortLabel: '💰 Pricing & Packages',
    answer:
      'We offer 4 transparent, fixed-milestone tiers with zero hidden fees:\n\n' +
      '• **Launchpad (₹5,000 – ₹14,999)**: High-speed single-page microsite, direct WhatsApp and call integration, Google Maps embed, launched in 3-5 days for micro-businesses & solopreneurs.\n' +
      '• **Starter (₹14,999)**: Bespoke 5-page responsive site, WhatsApp engine, basic SEO, SSL security, launched in 7-10 days.\n' +
      '• **Business (₹29,999 - Most Popular)**: Up to 10 pages, comprehensive SEO, Google Maps/GMB domination, lead capture triage, 30 days support.\n' +
      '• **Growth (₹54,999)**: Full-funnel web app, Google Ads PPC setup, social media playbook, automated CRM nurturing.\n\n' +
      'Custom scopes are also tailored with fixed milestone deliverables.',
    action: { label: 'Explore Pricing Plans', actionType: 'pricing' as const, targetId: 'pricing' }
  },
  {
    id: 'timeline-doubt',
    question: 'How long does development take from start to launch?',
    shortLabel: '⏱️ Launch Timelines',
    answer:
      'We work with strict delivery milestones and daily communication:\n\n' +
      '• **Starter Websites**: 7 to 10 business days\n' +
      '• **Business Platforms**: 12 to 16 business days\n' +
      '• **Growth & Custom Web Apps**: 20 to 25 business days\n\n' +
      'You receive staging access within the first 4-5 days to review architecture and progress in real time.',
    action: { label: 'Request Timeline Estimate', actionType: 'contact' as const }
  },
  {
    id: 'ownership-doubt',
    question: 'Do I own 100% of the code, domain, and assets?',
    shortLabel: '🔒 100% Client Ownership',
    answer:
      '**Yes, 100% without exception.** Once the project is delivered:\n\n' +
      '• You hold complete admin rights to your domain, cloud hosting, and Git source code.\n' +
      '• Zero vendor lock-in or recurring proprietary license fees.\n' +
      '• You are completely free to manage it yourself or retain us for ongoing upgrades.',
    action: { label: 'Read Transparency Pledge', actionType: 'contact' as const }
  },
  {
    id: 'gwalior-local-doubt',
    question: 'Where are you based? Can we meet in Gwalior or consult online?',
    shortLabel: '📍 Gwalior HQ & In-Person Meet',
    answer:
      'GWL Weblab is headquartered right here in **Gwalior, Madhya Pradesh** (serving Morar, City Centre, Lashkar, Thatipur, and surrounding regions), while serving clients across India and globally.\n\n' +
      'We welcome in-person discovery meetings in Gwalior or fast video consultations over Google Meet / WhatsApp.',
    action: { label: 'Meet on WhatsApp', actionType: 'whatsapp' as const }
  },
  {
    id: 'clients-proof-doubt',
    question: 'What real results have you achieved for clients?',
    shortLabel: '🏆 Client Outcomes & Case Studies',
    answer:
      'Real production outcomes engineered by GWL Weblab:\n\n' +
      '• **Georgians Academy** (Morar Cantt & Bada Gaon, Gwalior): +185% inbound student admissions via a bilingual portal & 1-click WhatsApp engine.\n' +
      '• **Yanshi Physiotherapy Center** (Morar, Gwalior): Zero booking friction with clinical appointment flows & direct triage.\n' +
      '• **BrightEdge Academy**: Pan-India NEET & Board EdTech LMS with Dark/Light theme toggle & automated fee calculator.\n' +
      '• **Tell Well English Institute**: Instant WhatsApp student conversions for spoken English mastery.',
    action: { label: 'View Portfolio Showcase', actionType: 'portfolio' as const, targetId: 'work' }
  },
  {
    id: 'seo-ads-doubt',
    question: 'How do you help us get more customers via SEO & Google Ads?',
    shortLabel: '📈 Local SEO & Google Ads',
    answer:
      'We connect code directly to revenue:\n\n' +
      '1. **Local Pack Domination**: We optimize your Google Business Profile (GMB), local schema, and citations to rank in the top 3 on Google Maps.\n' +
      '2. **High-Intent Keywords**: We target high-commercial searches (e.g. "best coaching in Gwalior", "physiotherapy clinic near me").\n' +
      '3. **Google Ads PPC**: Laser-targeted search ads with negative-keyword shields to prevent wasted budget.',
    action: { label: 'Audit My Current Ranking', actionType: 'contact' as const }
  },
  {
    id: 'migration-doubt',
    question: 'Can you overhaul or migrate my slow WordPress or Wix site?',
    shortLabel: '🔄 Slow Website Overhaul',
    answer:
      'Yes! Many clients come to us with bloated 8-second WordPress or Wix sites. We migrate your content into modern, high-speed architectures (React / Next.js / Tailwind) achieving **< 1s load times, 95+ Core Web Vitals**, and preserving your existing search URLs.',
    action: { label: 'Request Speed Audit', actionType: 'contact' as const }
  },
  {
    id: 'payment-milestones-doubt',
    question: 'How do your payment terms and milestones work?',
    shortLabel: '💳 Payment Milestones',
    answer:
      'We operate on transparent milestone stages:\n\n' +
      '• **50% Kickoff Deposit** upon requirements confirmation & architecture blueprint.\n' +
      '• **25% Mid-Milestone** upon staging review and feature approval.\n' +
      '• **25% Final Launch** upon deployment to your live domain with SSL & QA sign-off.\n\n' +
      'All payments are backed by clear milestone invoices.',
    action: { label: 'Start Project', actionType: 'contact' as const }
  },
  {
    id: 'creator-collab-doubt',
    question: 'How does Creator Collaboration work and why is its pricing different?',
    shortLabel: '🎬 Creator Collabs & Pricing',
    answer:
      'Creator Collaboration is structured around **authentic audience reach, UGC ad assets, and revenue share**—distinct from traditional code engineering:\n\n' +
      '• **Micro-Creator Drop (₹8,500 – ₹14,500 / drop)**: 1 Dedicated Reel + 2 Stories + trackable coupon & bio link for 25k–85k local/niche reach.\n' +
      '• **Creator Co-Launch Kit (₹18,500 – ₹27,500)**: Turnkey link-in-bio storefront, instant course/consultation checkout, automated DM sponsor funnel, and 4-page media kit.\n' +
      '• **Brand x Creator Retainer / Rev-Share (₹32,000/mo or ₹12,000 + 12% Rev-Share)**: 4-6 vetted creator integrations/month, full UGC ad rights, and performance revenue-share.\n\n' +
      'Pricing differs because you acquire genuine social proof and 30-90 day whitelisted ad licensing rather than static code files.',
    action: { label: 'Explore Creator Collabs', actionType: 'services' as const, targetId: 'creator-collaboration-section' }
  }
];

export const DoubtResolverChatbot: React.FC = () => {
  const { themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "Hello! I'm the **GWL Weblab AI Assistant**.\n\nI can instantly answer any doubt about our **website development, Gwalior local SEO, Google Ads, pricing packages, timelines, or client results**.\n\nSelect a common doubt below or type your question!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat container to ensure most recent message is always visible in chatbot-messages-scroll
  const scrollToLatestMessage = useCallback((smooth = true) => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const performScroll = () => {
      container.scrollTo({
        top: container.scrollHeight + 1500,
        behavior: smooth ? 'smooth' : 'auto'
      });
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: smooth ? 'smooth' : 'auto',
          block: 'end',
          inline: 'nearest'
        });
      }
    };

    // Immediate attempt
    performScroll();

    // Next browser animation frame after DOM mount
    requestAnimationFrame(performScroll);

    // Staggered microtask timeouts for DOM reflow, markdown formatting and font measurements
    setTimeout(performScroll, 50);
    setTimeout(performScroll, 160);
    setTimeout(performScroll, 320);
  }, []);

  // Auto-scroll when messages, open state, minimized state, or loading state changes
  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToLatestMessage(true);
    }
  }, [messages, isOpen, isMinimized, isLoading, scrollToLatestMessage]);

  // MutationObserver to guarantee immediate auto-scroll whenever child elements/assistant responses are added to chatbot-messages-scroll
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      if (isOpen && !isMinimized) {
        scrollToLatestMessage(true);
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [isOpen, isMinimized, scrollToLatestMessage]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 250);
      setHasUnread(false);
    }
  }, [isOpen, isMinimized]);

  // Helper to format bold **text**, bullet points and lines cleanly
  const renderFormattedMessage = (content: string) => {
    if (!content) return null;
    const paragraphs = content.split('\n\n');
    return paragraphs.map((paragraph, pIdx) => {
      const lines = paragraph.split('\n');
      return (
        <div key={pIdx} className="space-y-1">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            const isBullet = trimmed.startsWith('•') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed);

            // Match **bold** tokens
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
              <p
                key={lIdx}
                className={`leading-relaxed text-xs ${isBullet ? 'pl-2 text-[11.5px]' : ''}`}
              >
                {parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={i} className="font-bold">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </p>
            );
          })}
        </div>
      );
    });
  };

  const handleActionClick = (action: ChatMessage['suggestedAction']) => {
    if (!action) return;

    if (action.actionType === 'whatsapp') {
      const text = encodeURIComponent('Hi GWL Weblab, I was chatting with your AI assistant and have a project inquiry.');
      window.open(`https://wa.me/919755061139?text=${text}`, '_blank');
    } else if (action.actionType === 'call') {
      window.location.href = 'tel:+919755061139';
    } else if (action.targetId) {
      const el = document.getElementById(action.targetId);
      if (el) {
        setIsOpen(false);
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        setIsOpen(false);
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectDoubt = async (doubt: typeof COMMON_DOUBTS[0]) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: doubt.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const assistantMsg: ChatMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant',
      content: doubt.answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: doubt.action
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    scrollToLatestMessage(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    scrollToLatestMessage(true);

    try {
      // 1. First attempt: Server-Side Gemini API via /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: query,
          messages: messages.concat(userMsg).map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.reply || 'Thank you for reaching out!';

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedAction: {
              label: 'Chat on WhatsApp with Engineer',
              actionType: 'whatsapp'
            }
          }
        ]);
        setIsLoading(false);
        scrollToLatestMessage(true);
        return;
      }
    } catch {
      // Fallback below
    }

    // 2. Intelligent Client-Side Semantic Fallback
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let matchedDoubt = COMMON_DOUBTS.find((d) =>
        lowerQuery.includes(d.id.replace('-doubt', '')) ||
        d.question.toLowerCase().split(' ').some((word) => word.length > 4 && lowerQuery.includes(word))
      );

      let fallbackReply = '';
      let action: ChatMessage['suggestedAction'] = {
        label: 'Chat on WhatsApp with Founder',
        actionType: 'whatsapp'
      };

      if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('rate') || lowerQuery.includes('package')) {
        fallbackReply = 'Our transparent packages start at **₹5,000 – ₹14,999 (Launchpad)**, **₹14,999 (Starter)**, **₹29,999 (Business - Most Popular)**, and **₹54,999 (Growth)**. All packages include high-speed responsive design, SEO, WhatsApp engine, and zero vendor lock-in.';
        action = { label: 'View Pricing Table', actionType: 'pricing', targetId: 'pricing' };
      } else if (lowerQuery.includes('time') || lowerQuery.includes('how long') || lowerQuery.includes('day') || lowerQuery.includes('delivery')) {
        fallbackReply = 'Starter websites launch in **7-10 business days**, Business packages in **12-16 business days**, and custom growth architectures in **20-25 days**. You receive staging access within 4 days to review progress.';
        action = { label: 'Discuss Your Timeline', actionType: 'contact' };
      } else if (lowerQuery.includes('gwalior') || lowerQuery.includes('location') || lowerQuery.includes('office') || lowerQuery.includes('meet') || lowerQuery.includes('city')) {
        fallbackReply = 'We are proudly based in **Gwalior, Madhya Pradesh**! We regularly meet local founders, doctors, and school directors across Morar, City Centre, Lashkar, and Thatipur, while collaborating seamlessly online.';
        action = { label: 'Connect on WhatsApp', actionType: 'whatsapp' };
      } else if (lowerQuery.includes('seo') || lowerQuery.includes('google') || lowerQuery.includes('rank') || lowerQuery.includes('maps')) {
        fallbackReply = 'We specialize in **Local SEO & Google Business Profile (GMB) domination**. We optimize keywords, schema markup, and speed to help you secure top-3 Local Pack positions on Google Maps.';
        action = { label: 'Request Free SEO Audit', actionType: 'contact' };
      } else if (lowerQuery.includes('client') || lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('georgian') || lowerQuery.includes('yanshi')) {
        fallbackReply = 'We recently built high-performance platforms for **Georgians Academy** (+185% admissions), **Yanshi Physiotherapy Center** (frictionless appointment bookings), **BrightEdge Academy** (online EdTech LMS), and **Tell Well English Institute**.';
        action = { label: 'View Selected Work', actionType: 'portfolio', targetId: 'work' };
      } else {
        fallbackReply = `Thank you for asking! At GWL Weblab, we engineer bespoke high-performance websites, local SEO systems, and conversion funnels. For specific requirements regarding "${query}", let's connect directly on WhatsApp or over a quick phone call.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: action
        }
      ]);
      setIsLoading(false);
      scrollToLatestMessage(true);
    }, 450);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          "Chat cleared! How can I help resolve your doubts about GWL Weblab's web engineering, local SEO, or pricing?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Left, safely elevated on mobile above sticky action bars) */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setIsMinimized(false);
          }}
          aria-label="Open AI Doubt Resolver Chatbot"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full glass-card theme-card-bg border border-emerald-500/40 text-white font-bold text-xs sm:text-sm shadow-[0_8px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.55)] transition-all transform hover:-translate-y-1 cursor-pointer"
        >
          {/* Avatar Icon */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400">
            <Bot className="w-4 h-4" />
            {/* Green Online Dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] sm:text-xs font-display font-extrabold tracking-wide text-white flex items-center gap-1">
              <span>Ask AI Assistant</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </span>
            <span className="text-[9px] font-mono text-emerald-400 hidden sm:inline">
              Resolve Common Doubts
            </span>
          </div>

          {/* Unread notification badge */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] shadow-sm animate-bounce">
              1
            </span>
          )}
        </button>
      </div>

      {/* Chatbot Window (Modal/Slide-up overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? '60px' : '520px'
            }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 sm:bottom-20 left-3 sm:left-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[420px] max-h-[calc(100vh-6rem)] rounded-3xl chatbot-modal-window flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Window Header */}
            <div className="px-4 py-3 chatbot-window-header flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="header-title text-xs font-bold font-display">
                      GWL Weblab Solutions Engineer
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                      AI Live
                    </span>
                  </div>
                  <div className="header-subtitle text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Doubts & Technical Consultation</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized((prev) => !prev)}
                  title={isMinimized ? 'Expand window' : 'Minimize window'}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Minimize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg hover:bg-rose-500/20 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Window Content (Hidden if minimized) */}
            {!isMinimized && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Quick Doubt Chips Horizontal Strip */}
                <div className="px-3 py-2 chatbot-doubts-bar flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] shrink-0">
                  <span className="chatbot-doubts-label text-[10px] font-mono uppercase tracking-wider shrink-0 px-1">
                    Common Doubts:
                  </span>
                  {COMMON_DOUBTS.slice(0, 5).map((doubt) => (
                    <button
                      key={doubt.id}
                      type="button"
                      onClick={() => handleSelectDoubt(doubt)}
                      className="shrink-0 px-2.5 py-1 rounded-full chatbot-doubt-chip transition-all whitespace-nowrap cursor-pointer text-xs font-medium"
                    >
                      {doubt.shortLabel}
                    </button>
                  ))}
                </div>

                {/* Messages Scroll Area */}
                <div
                  ref={messagesContainerRef}
                  className="flex-1 min-h-0 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 text-xs overscroll-contain chatbot-messages-scroll"
                >
                  {messages.map((msg) => {
                    const isAssistant = msg.role === 'assistant';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isAssistant ? 'items-start' : 'items-end justify-end'}`}
                      >
                        {isAssistant && (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-sm transition-all ${
                            isAssistant
                              ? 'chatbot-msg-assistant'
                              : 'chatbot-msg-user ml-auto'
                          }`}
                        >
                          <div className="space-y-1.5 break-words">
                            {renderFormattedMessage(msg.content)}
                          </div>

                          {/* Action Button inside Assistant Bubble */}
                          {isAssistant && msg.suggestedAction && (
                            <div className="mt-2.5 pt-2 border-t border-white/15">
                              <button
                                type="button"
                                onClick={() => handleActionClick(msg.suggestedAction)}
                                className="action-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                              >
                                {msg.suggestedAction.actionType === 'whatsapp' ? (
                                  <MessageCircle className="w-3.5 h-3.5" />
                                ) : (
                                  <ArrowRight className="w-3.5 h-3.5" />
                                )}
                                <span>{msg.suggestedAction.label}</span>
                              </button>
                            </div>
                          )}

                          <div className="text-[9px] mt-1.5 text-right font-mono chat-timestamp opacity-80">
                            {msg.timestamp}
                          </div>
                        </div>

                        {!isAssistant && (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 flex items-center justify-center shrink-0 mb-0.5">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs py-1">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl chatbot-loading-bubble shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                        <span className="ml-1 text-[11px] font-mono">Consulting GWL AI...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} className="h-1.5 w-full shrink-0 pointer-events-none" />
                </div>

                {/* Input Area */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 chatbot-input-bar flex items-center gap-2 shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your doubt or question (EN / HI)..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl chatbot-input-field focus:outline-none focus:border-emerald-400 text-xs transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2.5 rounded-xl theme-btn-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center shrink-0 shadow-md"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Bottom Quick Escalate Pill */}
                <div className="px-3 py-2 chatbot-escalate-bar flex items-center justify-between text-[10px] shrink-0">
                  <span>Need human consultation?</span>
                  <button
                    type="button"
                    onClick={() => {
                      const text = encodeURIComponent('Hi GWL Weblab team, I want to talk directly to an engineer.');
                      window.open(`https://wa.me/919755061139?text=${text}`, '_blank');
                    }}
                    className="font-semibold inline-flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp Engineer</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
