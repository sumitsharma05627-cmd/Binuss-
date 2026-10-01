import { de } from './locales/de';
import { fr } from './locales/fr';

export type Language = 'en' | 'hi' | 'es' | 'de' | 'fr';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
];

export interface Translations {
  nav: {
    home: string;
    services: string;
    plans: string;
    work: string;
    process: string;
    insights: string;
    faq: string;
    contact: string;
    startProject: string;
    quickSearch: string;
    searchShortcut: string;
    searchPlaceholder: string;
    theme: string;
    language: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    headlineGradient: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustHighPerf: string;
    trustConversion: string;
  };
  problem: {
    badge: string;
    headline: string;
    subtitle: string;
    fixCallout: string;
    fixButton: string;
    problems: {
      title: string;
      description: string;
      impact: string;
    }[];
  };
  services: {
    badge: string;
    headline: string;
    subtitle: string;
    inquireBtn: string;
    deliverablesLabel: string;
    modalDeliverablesTitle: string;
    modalTimeline: string;
    modalTarget: string;
    modalStartBtn: string;
    modalCloseBtn: string;
  };
  growthSystem: {
    badge: string;
    headline: string;
    subtitle: string;
    stepPrefix: string;
    actionLabel: string;
    metricLabel: string;
    advantageLabel: string;
  };
  pricing: {
    badge: string;
    headline: string;
    subtitle: string;
    perProject: string;
    deliveryTimeLabel: string;
    timelineLabel: string;
    idealForLabel: string;
    includesLabel: string;
    selectPlanBtn: string;
    customPlanTitle: string;
    customPlanSubtitle: string;
    customPlanBtn: string;
    badgePopular: string;
    modalTitle: string;
    modalSubtitle: string;
    modalStep1: string;
    modalStep2: string;
    modalProceed: string;
    modalBack: string;
    modalSubmit: string;
    modalName: string;
    modalBusiness: string;
    modalPhone: string;
    modalEmail: string;
    modalNotes: string;
  };
  planBuilder: {
    badge: string;
    headline: string;
    subtitle: string;
    selectedServices: string;
    estimatedCost: string;
    recommendedTier: string;
    estimatedDelivery: string;
    savingsBadge: string;
    proceedBtn: string;
    resetBtn: string;
  };
  roi: {
    badge: string;
    headline: string;
    subtitle: string;
    calcTitle: string;
    monthlyInquiries: string;
    avgCustomerValue: string;
    estimatedGrowth: string;
    potentialRevenue: string;
    ctaButton: string;
  };
  beforeAfter: {
    badge: string;
    headline: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    sliderHint: string;
  };
  whyKbsr: {
    badge: string;
    headline: string;
    subtitle: string;
    viewCaseStudies: string;
    scheduleCall: string;
  };
  trust: {
    badge: string;
    headline: string;
    subtitle: string;
    badgeStandard: string;
    bottomNotice: string;
    scheduleCallBtn: string;
  };
  portfolio: {
    badge: string;
    headline: string;
    subtitle: string;
    viewLive: string;
    discussSimilar: string;
    resultsLabel: string;
  };
  process: {
    badge: string;
    headline: string;
    subtitle: string;
    stagePrefix: string;
    activitiesLabel: string;
    outcomeLabel: string;
  };
  faq: {
    badge: string;
    headline: string;
    subtitle: string;
    objectionsTab: string;
    faqsTab: string;
    kbsrClarification: string;
    ctaHeadline: string;
    ctaSubtitle: string;
    ctaBtn: string;
  };
  commitment: {
    badge: string;
    headline: string;
    subtitle: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
  };
  testimonials: {
    badge: string;
    headline: string;
    subtitle: string;
    verifiedClient: string;
    ratingScore: string;
    reviewsCount: string;
    satisfactionRate: string;
    viewWork: string;
    startProject: string;
    autoPlayNotice: string;
    dragSwipeHint: string;
  };
  about: {
    badge: string;
    headline: string;
    subtitle: string;
    p1: string;
    p2: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
  };
  contact: {
    badge: string;
    headline: string;
    subtitle: string;
    formName: string;
    formBusiness: string;
    formPhone: string;
    formEmail: string;
    formService: string;
    formBudget: string;
    formMessage: string;
    formSubmit: string;
    formSubmitting: string;
    nameLabel: string;
    namePlaceholder: string;
    businessLabel: string;
    businessPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    budgetLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitting: string;
    validationError: string;
    transmissionReceived: string;
    thankYou: string;
    confirmationMsg: string;
    submitAnother: string;
    successTitle: string;
    successMessage: string;
    whatsappDirect: string;
    phoneDirect: string;
    emailDirect: string;
    chatWhatsAppBtn: string;
  };
  finalCta: {
    badge: string;
    headline: string;
    subtitle: string;
    primaryBtn: string;
    secondaryBtn: string;
    startProject: string;
    exploreServices: string;
  };
  floatingBar: {
    chatWhatsApp: string;
    callDirect: string;
    quickConsult: string;
    whatsappShort: string;
    callUs: string;
    getStarted: string;
  };
  footer: {
    tagline: string;
    rights: string;
    designedWith: string;
    navigation: string;
    services: string;
    directContact: string;
    aboutText: string;
    servicesCol: string;
    growthSystems: string;
    backToTop: string;
  };
  modal: {
    greatChoice: string;
    selectedPrefix: string;
    selectedSuffix: string;
    startingInvestment: string;
    estimatedTimeline: string;
    includedLabel: string;
    moreFeatures: string;
    nextStepTitle: string;
    nextStepDesc: string;
    continueBtn: string;
    step2Of2: string;
    step2Headline: string;
    validationError: string;
    fullName: string;
    fullNamePlaceholder: string;
    businessBrand: string;
    businessBrandPlaceholder: string;
    phoneWhatsapp: string;
    phoneWhatsappPlaceholder: string;
    emailAddress: string;
    emailAddressPlaceholder: string;
    goalsNotes: string;
    goalsNotesPlaceholder: string;
    backBtn: string;
    submitInquiryBtn: string;
    privacyNote: string;
  };
  search: {
    title: string;
    placeholder: string;
    clear: string;
    esc: string;
    allResults: string;
    servicesFilter: string;
    portfolioFilter: string;
    faqFilter: string;
    plansFilter: string;
    quickSuggestions: string;
    recentSearches: string;
    clearRecent: string;
    noRecentSearches: string;
    noResults: string;
    tryBroader: string;
    clearFilter: string;
    navigate: string;
    select: string;
    close: string;
    resultCountSingle: string;
    resultCountPlural: string;
  };
  insights: {
    badge: string;
    headline: string;
    subtitle: string;
    readTime: string;
    readArticle: string;
    filterAll: string;
    keyTakeawayLabel: string;
    frameworkChecklist: string;
    discussStrategy: string;
    closeReader: string;
    searchPlaceholder: string;
    noResults: string;
    clearFilter: string;
    authorPrefix: string;
    estimatedRead: string;
    impactLabel: string;
    viewAllCta: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      plans: 'Plans',
      work: 'Work',
      process: 'Process',
      insights: 'Insights',
      faq: 'FAQ',
      contact: 'Contact',
      startProject: 'Start Project',
      quickSearch: 'Quick Search',
      searchShortcut: '⌘K',
      searchPlaceholder: 'Search services, portfolio, FAQ topics...',
      theme: 'Theme',
      language: 'Language'
    },
    hero: {
      badge: 'Website • SEO • Google Ads • Social Media • Branding',
      headlinePart1: 'Build Your',
      headlinePart2: 'Digital Presence.',
      headlineGradient: 'Turn Attention Into Business Growth.',
      subtitle:
        'Websites, marketing and digital growth solutions designed to help businesses look professional, reach more customers and grow online.',
      primaryCta: 'Get My Business Online',
      secondaryCta: 'View Plans',
      trustHighPerf: 'Custom High-Performance Architecture',
      trustConversion: 'Conversion-First Engineering'
    },
    problem: {
      badge: 'The Reality Most Businesses Face',
      headline: 'Your Business May Be Losing Customers Right Now',
      subtitle:
        'Most business owners don’t realize how many prospective clients search for their services every day, only to bounce over to competitors with a faster, cleaner digital presence.',
      fixCallout: 'We fix every single one of these problems with our complete digital growth systems.',
      fixButton: 'Explore Our Solutions',
      problems: [
        {
          title: 'No Real Website Presence',
          description: 'Relying purely on social media pages or word-of-mouth creates credibility doubts for premium clients.',
          impact: 'Lost Credibility & High-Ticket Leads'
        },
        {
          title: 'Invisible on Google Search',
          description: 'When potential customers in your area search for what you do, your competitors show up first.',
          impact: 'Zero Inbound Commercial Search Traffic'
        },
        {
          title: 'Slow, Broken Mobile Experience',
          description: 'Over 78% of local searches happen on mobile. If your page takes 4+ seconds to load, prospects leave.',
          impact: 'Instant Drop-off & Wasted Marketing'
        },
        {
          title: 'Friction in Customer Contact',
          description: 'No direct WhatsApp trigger, no clear phone button, and complicated inquiry forms kill impulse inquiries.',
          impact: 'Missed Calls & Lost Inquiries'
        },
        {
          title: 'Competitors Stealing Your Clients',
          description: 'Competitors investing in digital look bigger, more reliable, and win contracts before you even speak.',
          impact: 'Market Share Erosion'
        },
        {
          title: 'Trapped in Referral Dependency',
          description: 'Without an automated digital inquiry system, your revenue rollercoasters month to month.',
          impact: 'Unpredictable Cash Flow'
        }
      ]
    },
    services: {
      badge: 'Core Growth Capabilities',
      headline: 'Everything Your Business Needs to Grow Online',
      subtitle: 'Engineered for real business results, not technical vanity.',
      inquireBtn: 'Inquire About This Service',
      deliverablesLabel: 'What We Deliver',
      modalDeliverablesTitle: 'Deliverables & Specifications',
      modalTimeline: 'Estimated Delivery',
      modalTarget: 'Ideal For',
      modalStartBtn: 'Start With This Service',
      modalCloseBtn: 'Close'
    },
    growthSystem: {
      badge: 'Pipeline Architecture',
      headline: 'How We Turn Strangers Into Paying Customers',
      subtitle: 'A systematic 4-phase growth engine engineered to capture, convince, and convert your target market.',
      stepPrefix: 'Phase',
      actionLabel: 'Core Action',
      metricLabel: 'Primary Impact',
      advantageLabel: 'GWL Advantage'
    },
    pricing: {
      badge: 'Transparent Growth Plans',
      headline: 'Predictable Investment. Measurable Returns.',
      subtitle: 'No hidden retainers, surprise fees, or convoluted contracts. Clear milestones with fixed delivery.',
      perProject: 'fixed investment',
      deliveryTimeLabel: 'Launch Timeline',
      timelineLabel: 'Timeline',
      idealForLabel: 'Best Suited For',
      includesLabel: 'Included Deliverables',
      selectPlanBtn: 'Select Plan',
      customPlanTitle: 'Need a Tailored Enterprise Solution?',
      customPlanSubtitle: 'Custom multisite architecture, custom web apps, automated CRM pipelines, or specialized multi-region campaigns.',
      customPlanBtn: 'Discuss Custom Solution',
      badgePopular: 'Most Popular Choice',
      modalTitle: 'Start Your Growth Plan',
      modalSubtitle: 'Review the plan scope and tell us about your business to get started immediately.',
      modalStep1: 'Scope & Deliverables',
      modalStep2: 'Business Information',
      modalProceed: 'Proceed to Details',
      modalBack: 'Back',
      modalSubmit: 'Confirm & Send Request',
      modalName: 'Your Full Name',
      modalBusiness: 'Business / Company Name',
      modalPhone: 'WhatsApp / Phone Number',
      modalEmail: 'Email Address',
      modalNotes: 'Specific Goals or Existing Website URL'
    },
    planBuilder: {
      badge: 'Interactive Estimator',
      headline: 'Build Your Custom Growth Package',
      subtitle: 'Select the exact capabilities your business needs. Watch the bundle pricing, estimated timeline, and recommended tier update in real-time.',
      selectedServices: 'Selected Services',
      estimatedCost: 'Estimated Package Cost',
      recommendedTier: 'Recommended Tier',
      estimatedDelivery: 'Estimated Delivery',
      savingsBadge: 'Bundle Savings Applied',
      proceedBtn: 'Proceed With This Package',
      resetBtn: 'Reset Selection'
    },
    roi: {
      badge: 'Commercial Perspective',
      headline: 'A Website is Your 24/7 Digital Sales Representative',
      subtitle: 'A high-converting website never sleeps, takes leave, or forgets to pitch your value. Compare the math yourself.',
      calcTitle: 'Interactive Inbound Inquiry Simulator',
      monthlyInquiries: 'Expected Monthly Visitors',
      avgCustomerValue: 'Average Customer Value (₹)',
      estimatedGrowth: 'Estimated Inquiry Rate',
      potentialRevenue: 'Estimated Annual Added Revenue',
      ctaButton: 'Unlock This Growth'
    },
    beforeAfter: {
      badge: 'Transformation Impact',
      headline: 'Before vs After Working With GWL WebLab',
      subtitle: 'See the practical difference between a struggling digital presence and a conversion-engineered growth engine.',
      beforeLabel: 'Before GWL WebLab',
      afterLabel: 'After GWL WebLab',
      sliderHint: 'Drag the slider to compare'
    },
    whyKbsr: {
      badge: 'Strategic Architecture',
      headline: 'We Don’t Just Make Websites. We Build Growth Systems.',
      subtitle: 'Combining high-speed engineering, commercial clarity, and direct lead generation.',
      viewCaseStudies: 'View Portfolio Work',
      scheduleCall: 'Schedule Free Strategy Call'
    },
    trust: {
      badge: 'Instituted Standards',
      headline: 'Why Smart Businesses Trust GWL WebLab',
      subtitle: 'A technology and growth partner built on commercial clarity, measurable execution, and dependable delivery.',
      badgeStandard: 'VERIFIED STANDARD',
      bottomNotice: 'No jargon. No unnecessary complexities. Just honest guidance and high-converting execution tailored to your market.',
      scheduleCallBtn: 'Schedule Free Strategy Call'
    },
    portfolio: {
      badge: 'Proven Execution',
      headline: 'Real Businesses, Real Commercial Impact',
      subtitle: 'Explore recent digital platforms engineered for credibility, high engagement, and inbound lead generation.',
      viewLive: 'View Live Experience',
      discussSimilar: 'Build Similar Platform',
      resultsLabel: 'Key Result'
    },
    process: {
      badge: 'Execution Framework',
      headline: 'From Concept to Commercial Launch in 5 Stages',
      subtitle: 'A transparent, collaborative, and deadline-driven engineering process with zero guesswork.',
      stagePrefix: 'Step',
      activitiesLabel: 'What Happens in this Stage',
      outcomeLabel: 'Stage Outcome'
    },
    faq: {
      badge: 'Answers & Clarifications',
      headline: 'Common Business Questions & Real Truths',
      subtitle: 'We believe in 100% upfront clarity. No sales deflection, no confusing tech speak.',
      objectionsTab: 'Honest Business Objections',
      faqsTab: 'Frequently Asked Questions',
      kbsrClarification: 'The GWL Reality',
      ctaHeadline: 'Still have a specific question about your business?',
      ctaSubtitle: 'Talk directly with a technical founder. No high-pressure sales reps.',
      ctaBtn: 'Ask Us Directly'
    },
    commitment: {
      badge: 'Professional Integrity',
      headline: 'Our Guarantee to Every Business Client',
      subtitle: 'We do not use inflated claims or dark patterns. If our initial diagnostic reveals your business doesn’t currently need a full website or paid ads, we will tell you upfront.',
      point1Title: 'Clear Scope',
      point1Desc: 'Fixed milestones agreed in writing before any work commences.',
      point2Title: 'Guaranteed Delivery',
      point2Desc: 'Strict adherence to launch timetables (7-25 business days).',
      point3Title: 'Zero Tech Lock-in',
      point3Desc: 'You retain 100% full ownership of your domain, code, and content.'
    },
    testimonials: {
      badge: 'Client Endorsements & ROI',
      headline: 'Trusted by Leaders Who Value Commercial Outcomes',
      subtitle: 'See how regional businesses and growing brands turn website visits into qualified phone calls, WhatsApp consultations, and verified revenue.',
      verifiedClient: 'Verified Client Review',
      ratingScore: '5.0 / 5.0 Rating',
      reviewsCount: '45+ Reviews Across Google & Direct',
      satisfactionRate: '100% Milestone Delivery',
      viewWork: 'Explore Case Studies',
      startProject: 'Start Your Transformation',
      autoPlayNotice: 'Autoplay active (pauses on hover or swipe)',
      dragSwipeHint: 'Drag or swipe to browse client feedback'
    },
    about: {
      badge: 'About GWL WebLab',
      headline: 'Built for Businesses Ready to Scale',
      subtitle: 'A digital growth agency eliminating the gap between high-end web technology and everyday commercial success.',
      p1: 'GWL WebLab (Gwalior WebLab / Global WebLab) was founded on a simple observation: local and growing businesses were being charged massive fees for outdated websites that failed to generate a single new customer.',
      p2: 'We bridge that divide. We treat your web presence as an active sales asset—engineered for instant speed, effortless mobile contact, and dominant local search discovery.',
      stat1Label: 'Target Load Time',
      stat2Label: 'Client Satisfaction',
      stat3Label: 'Code & Asset Ownership'
    },
    contact: {
      badge: 'Get In Touch',
      headline: 'Let’s Build Something That Grows Your Business',
      subtitle: 'Reach out for a complimentary digital consultation, site audit, or detailed quote.',
      formName: 'Your Name',
      formBusiness: 'Business / Company Name',
      formPhone: 'Phone or WhatsApp Number',
      formEmail: 'Email Address',
      formService: 'Service or Plan Required',
      formBudget: 'Estimated Budget',
      formMessage: 'Tell us briefly about your goals',
      formSubmit: 'Submit Inquiry',
      formSubmitting: 'Sending Inquiry...',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Rahul Sharma',
      businessLabel: 'Business / Company Name',
      businessPlaceholder: 'e.g. Apex Diagnostics Clinic',
      emailLabel: 'Email Address',
      emailPlaceholder: 'e.g. rahul@example.com',
      phoneLabel: 'Phone or WhatsApp Number',
      phonePlaceholder: '+91 9XXXXXXXXX',
      serviceLabel: 'Service / Solution Needed',
      budgetLabel: 'Estimated Project Budget',
      messageLabel: 'Brief Project Scope / Notes',
      messagePlaceholder: 'Tell us about your business goals, target timeline, or current website challenges...',
      submitBtn: 'Submit Inquiry',
      submitting: 'Submitting...',
      validationError: 'Please fill in all required fields (Name, Business, Email).',
      transmissionReceived: 'Transmission Received & Verified',
      thankYou: 'Thank you',
      confirmationMsg: 'We have received your project details. Our technical team is reviewing your requirements and will reach out with a clear scope proposal within 24 hours.',
      submitAnother: 'Submit Another Inquiry',
      successTitle: 'Inquiry Received!',
      successMessage: 'Thank you for reaching out. We will review your requirements and get back to you within 24 hours.',
      whatsappDirect: 'Chat on WhatsApp',
      phoneDirect: 'Call Us Directly',
      emailDirect: 'Email Our Team',
      chatWhatsAppBtn: 'Start WhatsApp Chat'
    },
    finalCta: {
      badge: 'Start Today',
      headline: 'Ready to Turn Attention into Business Growth?',
      subtitle: 'Stop losing prospective customers to competitors. Let’s build a high-performance digital presence tailored to your goals.',
      primaryBtn: 'Start Your Project',
      secondaryBtn: 'Explore Services',
      startProject: 'Start Your Project',
      exploreServices: 'Explore Services'
    },
    floatingBar: {
      chatWhatsApp: 'Chat on WhatsApp',
      callDirect: 'Call Us Now',
      quickConsult: 'Get Quick Quote',
      whatsappShort: 'WhatsApp',
      callUs: 'Call Us',
      getStarted: 'Get Started'
    },
    footer: {
      tagline: 'High-performance websites, local search discovery, and digital growth systems for serious businesses.',
      rights: 'All rights reserved.',
      designedWith: 'Crafted for commercial growth & performance.',
      navigation: 'Quick Links',
      services: 'Services',
      directContact: 'Direct Contact',
      aboutText: 'Engineered for commercial speed, high conversion rates, and real local customer acquisition.',
      servicesCol: 'Services',
      growthSystems: 'Growth Systems',
      backToTop: 'Back to top'
    },
    modal: {
      greatChoice: 'Great Choice',
      selectedPrefix: 'Selected:',
      selectedSuffix: '',
      startingInvestment: 'Starting Investment',
      estimatedTimeline: 'Estimated Delivery',
      includedLabel: 'What is Included',
      moreFeatures: 'more strategic deliverables',
      nextStepTitle: 'Transparent Onboarding Guarantee',
      nextStepDesc: 'No surprise charges, no high-pressure sales calls. We review your requirements and provide a fixed milestone roadmap.',
      continueBtn: 'Continue with',
      step2Of2: 'Step 2 of 2: Project Scope',
      step2Headline: 'Tell Us About Your Business',
      validationError: 'Please provide your full name and phone/WhatsApp number.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Amit Patel',
      businessBrand: 'Business / Brand Name',
      businessBrandPlaceholder: 'e.g. Patel Healthcare Ltd',
      phoneWhatsapp: 'Phone / WhatsApp',
      phoneWhatsappPlaceholder: '+91 9XXXXXXXXX',
      emailAddress: 'Email Address',
      emailAddressPlaceholder: 'amit@patelhealth.com',
      goalsNotes: 'Specific Goals or Requirements',
      goalsNotesPlaceholder: 'Tell us any existing website links, target launch date, or specific features needed...',
      backBtn: 'Back',
      submitInquiryBtn: 'Request Proposal for',
      privacyNote: '🔒 Zero spam guarantee. We respect your business privacy.'
    },
    search: {
      title: 'Quick Search',
      placeholder: 'Search services, portfolio, FAQ topics, plans...',
      clear: 'Clear query',
      esc: 'ESC',
      allResults: 'All Results',
      servicesFilter: 'Services (8)',
      portfolioFilter: 'Portfolio (4)',
      faqFilter: 'FAQ & Topics (15)',
      plansFilter: 'Growth Plans (3)',
      quickSuggestions: 'Quick Navigation & Popular Searches',
      recentSearches: 'Recent Searches',
      clearRecent: 'Clear History',
      noRecentSearches: 'No recent searches',
      noResults: 'No results found',
      tryBroader: 'Try searching for broader keywords like "Websites", "SEO", "Pricing", or "Timeline".',
      clearFilter: 'Clear Filter',
      navigate: 'Navigate',
      select: 'Select',
      close: 'Close',
      resultCountSingle: 'result',
      resultCountPlural: 'results'
    },
    insights: {
      badge: 'Engineering & Growth Insights',
      headline: 'Digital Insights & Tactical Blueprints',
      subtitle:
        'Battle-tested strategies on sub-second web performance, local & global SEO dominance, conversion funnels, and AI automation for serious businesses.',
      readTime: 'min read',
      readArticle: 'Read Full Insight',
      filterAll: 'All Insights',
      keyTakeawayLabel: 'Key Commercial Takeaway',
      frameworkChecklist: 'Execution Checklist & Framework',
      discussStrategy: 'Implement This Strategy For My Business',
      closeReader: 'Close Reader',
      searchPlaceholder: 'Search insights by keyword, stack, or topic...',
      noResults: 'No insights found matching your search.',
      clearFilter: 'Reset Filters',
      authorPrefix: 'Engineered by',
      estimatedRead: 'Estimated Reading Time',
      impactLabel: 'Observed Commercial Impact',
      viewAllCta: 'Explore All Case Studies & Plans'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      services: 'सेवाएं',
      plans: 'प्लान्स',
      work: 'पोर्टफोलियो',
      process: 'प्रक्रिया',
      insights: 'इनसाइट्स',
      faq: 'एफएक्यू',
      contact: 'संपर्क',
      startProject: 'प्रोजेक्ट शुरू करें',
      quickSearch: 'त्वरित खोज',
      searchShortcut: '⌘K',
      searchPlaceholder: 'सेवाएं, पोर्टफोलियो, सामान्य प्रश्न खोजें...',
      theme: 'थीम',
      language: 'भाषा'
    },
    hero: {
      badge: 'वेबसाइट • एसईओ • गूगल ऐड्स • सोशल मीडिया • ब्रांडिंग',
      headlinePart1: 'अपनी डिजिटल',
      headlinePart2: 'पहचान बनाएं।',
      headlineGradient: 'ग्राहकों का ध्यान व्यापार वृद्धि में बदलें।',
      subtitle:
        'आधुनिक वेबसाइटें, मार्केटिंग और डिजिटल समाधान जो आपके व्यवसाय को पेशेवर बनाते हैं, नए ग्राहकों तक पहुंचाते हैं और ऑनलाइन बिक्री बढ़ाते हैं।',
      primaryCta: 'मेरा व्यवसाय ऑनलाइन लाएं',
      secondaryCta: 'प्लान्स देखें',
      trustHighPerf: 'कस्टम हाई-परफॉर्मेंस आर्किटेक्चर',
      trustConversion: 'कन्वर्जन-फोकस्ड इंजीनियरिंग'
    },
    problem: {
      badge: 'अधिकांश व्यवसायों की कड़वी सच्चाई',
      headline: 'हो सकता है आपका व्यवसाय अभी नए ग्राहक खो रहा हो',
      subtitle:
        'अधिकांश व्यापार मालिकों को यह अंदाजा नहीं होता कि कितने संभावित ग्राहक हर रोज उनकी सेवाएं खोजते हैं, लेकिन कमजोर डिजिटल उपस्थिति के कारण प्रतिस्पर्धियों के पास चले जाते हैं।',
      fixCallout: 'हम अपने संपूर्ण डिजिटल ग्रोथ सिस्टम के साथ इनमें से हर एक समस्या को ठीक करते हैं।',
      fixButton: 'हमारे समाधान देखें',
      problems: [
        {
          title: 'कोई पेशेवर वेबसाइट न होना',
          description: 'केवल सोशल मीडिया या पुराने रेफरल पर निर्भर रहने से ग्राहकों के मन में विश्वसनीयता की कमी रहती है।',
          impact: 'कम साख और मूल्यवान ग्राहकों का नुकसान'
        },
        {
          title: 'गूगल सर्च पर गायब होना',
          description: 'जब आपके क्षेत्र के ग्राहक आपकी सेवाएं गूगल पर खोजते हैं, तो आपके प्रतिस्पर्धी पहले दिखाई देते हैं।',
          impact: 'शून्य सर्च लीड्स'
        },
        {
          title: 'धीमी और खराब मोबाइल स्पीड',
          description: '78% से अधिक स्थानीय खोजें मोबाइल पर होती हैं। यदि पेज 4 सेकंड में लोड नहीं होता, तो ग्राहक तुरंत वापस चला जाता है।',
          impact: 'ग्राहक ड्रॉप-ऑफ और मार्केटिंग का नुकसान'
        },
        {
          title: 'संपर्क करने में बाधा',
          description: 'सीधा व्हाट्सएप बटन, डायरेक्ट कॉल विकल्प या आसान फॉर्म न होने से ग्राहक पूछताछ छोड़ देते हैं।',
          impact: 'मिस्ड कॉल्स और खोई हुई पूछताछ'
        },
        {
          title: 'प्रतिस्पर्धी आपके ग्राहक छीन रहे हैं',
          description: 'डिजिटल में निवेश करने वाले प्रतिस्पर्धी अधिक आधुनिक दिखते हैं और आपसे पहले ग्राहक हासिल कर लेते हैं।',
          impact: 'बाजार हिस्सेदारी का नुकसान'
        },
        {
          title: 'केवल सिफारिशों (Referrals) पर निर्भरता',
          description: 'स्वचालित डिजिटल लीड सिस्टम के बिना, आपका मासिक राजस्व हर महीने ऊपर-नीचे होता रहता है।',
          impact: 'अनिश्चित कैश फ्लो'
        }
      ]
    },
    services: {
      badge: 'प्रमुख डिजिटल क्षमताएं',
      headline: 'आपके व्यवसाय को ऑनलाइन बढ़ाने के लिए सब कुछ',
      subtitle: 'वास्तविक व्यावसायिक परिणामों और ग्राहकों के लिए निर्मित।',
      inquireBtn: 'इस सेवा के बारे में पूछें',
      deliverablesLabel: 'हम क्या प्रदान करते हैं',
      modalDeliverablesTitle: 'डिलिवरेबल्स और विशेषताएं',
      modalTimeline: 'अनुमानित समय',
      modalTarget: 'किसके लिए सर्वोत्तम',
      modalStartBtn: 'इस सेवा के साथ शुरू करें',
      modalCloseBtn: 'बंद करें'
    },
    growthSystem: {
      badge: 'पाइपलाइन आर्किटेक्चर',
      headline: 'अजनबियों को वास्तविक ग्राहकों में कैसे बदलें',
      subtitle: 'एक व्यवस्थित 4-चरणीय ग्रोथ इंजन जो ग्राहकों को आकर्षित, संतुष्ट और कन्वर्ट करता है।',
      stepPrefix: 'चरण',
      actionLabel: 'मुख्य कार्य',
      metricLabel: 'प्राथमिक प्रभाव',
      advantageLabel: 'GWL का लाभ'
    },
    pricing: {
      badge: 'पारदर्शी मूल्य निर्धारण',
      headline: 'स्पष्ट निवेश। मापने योग्य परिणाम।',
      subtitle: 'कोई छिपा हुआ शुल्क, आश्चर्यजनक खर्चे या जटिल शर्तें नहीं। निश्चित डिलीवरी के साथ स्पष्ट मील के पत्थर।',
      perProject: 'निश्चित निवेश',
      deliveryTimeLabel: 'लॉन्च समय-सीमा',
      timelineLabel: 'समय-सीमा',
      idealForLabel: 'किसके लिए उपयुक्त',
      includesLabel: 'शामिल विशेषताएं',
      selectPlanBtn: 'प्लान चुनें',
      customPlanTitle: 'क्या आपको कस्टम एंटरप्राइज समाधान चाहिए?',
      customPlanSubtitle: 'मल्टी-साइट आर्किटेक्चर, कस्टम वेब ऍप्लिकेशन्स, सीआरएम इंटीग्रेशन या बड़े क्षेत्रीय अभियान।',
      customPlanBtn: 'कस्टम प्लान पर बात करें',
      badgePopular: 'सबसे लोकप्रिय पसंद',
      modalTitle: 'अपना ग्रोथ प्लान शुरू करें',
      modalSubtitle: 'प्लान का दायरा देखें और तुरंत शुरू करने के लिए अपने व्यवसाय का विवरण साझा करें।',
      modalStep1: 'स्कोप और डिलीवरेबल्स',
      modalStep2: 'व्यवसाय की जानकारी',
      modalProceed: 'विवरण भरें',
      modalBack: 'वापस',
      modalSubmit: 'पुष्टि करें और भेजें',
      modalName: 'आपका पूरा नाम',
      modalBusiness: 'व्यवसाय / कंपनी का नाम',
      modalPhone: 'व्हाट्सएप / फोन नंबर',
      modalEmail: 'ईमेल पता',
      modalNotes: 'विशिष्ट लक्ष्य या मौजूदा वेबसाइट का लिंक'
    },
    planBuilder: {
      badge: 'इंटरैक्टिव पैकेज बिल्डर',
      headline: 'अपना कस्टम ग्रोथ पैकेज खुद तैयार करें',
      subtitle: 'अपने व्यवसाय के लिए आवश्यक सेवाएं चुनें। बंडल छूट, अनुमानित समय और अनुशंसित प्लान तुरंत देखें।',
      selectedServices: 'चयनित सेवाएं',
      estimatedCost: 'अनुमानित पैकेज लागत',
      recommendedTier: 'अनुशंसित टीयर',
      estimatedDelivery: 'अनुमानित समय',
      savingsBadge: 'बंडल छूट लागू',
      proceedBtn: 'इस पैकेज के साथ आगे बढ़ें',
      resetBtn: 'रीसेट करें'
    },
    roi: {
      badge: 'व्यावसायिक दृष्टिकोण',
      headline: 'वेबसाइट आपका 24/7 डिजिटल सेल्स प्रतिनिधि है',
      subtitle: 'एक हाई-कन्वर्जन वेबसाइट कभी सोती नहीं, छुट्टी नहीं लेती और कभी आपकी विशेषता बताना नहीं भूलती।',
      calcTitle: 'इंटरैक्टिव बिजनेस लीड सिम्युलेटर',
      monthlyInquiries: 'अनुमानित मासिक विजिटर्स',
      avgCustomerValue: 'औसत ग्राहक मूल्य (₹)',
      estimatedGrowth: 'अनुमानित पूछताछ दर',
      potentialRevenue: 'अनुमानित अतिरिक्त वार्षिक राजस्व',
      ctaButton: 'यह ग्रोथ हासिल करें'
    },
    beforeAfter: {
      badge: 'रूपांतरण का प्रभाव',
      headline: 'GWL वेबलैब से पहले बनाम बाद में',
      subtitle: 'एक सामान्य उपस्थिति और रूपांतरण-इंजीनियर वेबसाइट के बीच का वास्तविक अंतर देखें।',
      beforeLabel: 'GWL वेबलैब से पहले',
      afterLabel: 'GWL वेबलैब के बाद',
      sliderHint: 'तुलना करने के लिए स्लाइडर खींचें'
    },
    whyKbsr: {
      badge: 'रणनीतिक आर्किटेक्चर',
      headline: 'हम सिर्फ वेबसाइट नहीं बनाते। हम ग्रोथ सिस्टम तैयार करते हैं।',
      subtitle: 'सुपर-फास्ट स्पीड, व्यावसायिक स्पष्टता और सीधी लीड जेनरेशन का सही तालमेल।',
      viewCaseStudies: 'पोर्टफोलियो देखें',
      scheduleCall: 'मुफ्त रणनीति कॉल बुक करें'
    },
    trust: {
      badge: 'स्थापित मानक',
      headline: 'स्मार्ट व्यवसायी GWL वेबलैब पर क्यों भरोसा करते हैं',
      subtitle: 'व्यावसायिक स्पष्टता, मापने योग्य निष्पादन और भरोसेमंद डिलीवरी पर आधारित डिजिटल पार्टनर।',
      badgeStandard: 'सत्यापित मानक',
      bottomNotice: 'कोई जटिल तकनीकी भाषा नहीं। केवल ईमानदार मार्गदर्शन और आपके बाजार के अनुसार उच्च परिणाम।',
      scheduleCallBtn: 'मुफ्त रणनीति कॉल बुक करें'
    },
    portfolio: {
      badge: 'प्रमाणित परिणाम',
      headline: 'वास्तविक व्यवसाय, वास्तविक प्रभाव',
      subtitle: 'विश्वसनीयता, ग्राहक सहभागिता और लीड जेनरेशन के लिए निर्मित हालिया डिजिटल प्लेटफॉर्म देखें।',
      viewLive: 'लाइव अनुभव देखें',
      discussSimilar: 'समान प्लेटफॉर्म बनाएं',
      resultsLabel: 'मुख्य परिणाम'
    },
    process: {
      badge: 'कार्यप्रणाली फ्रेमवर्क',
      headline: 'अवधारणा से लॉन्च तक 5 स्पष्ट चरण',
      subtitle: 'पारदर्शी, सहयोगात्मक और समय-सीमा पर आधारित इंजीनियरिंग प्रक्रिया जिसमें कोई भ्रम नहीं है।',
      stagePrefix: 'कदम',
      activitiesLabel: 'इस चरण में क्या होता है',
      outcomeLabel: 'चरण का परिणाम'
    },
    faq: {
      badge: 'उत्तर और स्पष्टीकरण',
      headline: 'सामान्य व्यावसायिक प्रश्न और वास्तविक सच्चाई',
      subtitle: 'हम 100% स्पष्टता में विश्वास करते हैं। कोई बिक्री दबाव नहीं, कोई जटिल तकनीकी शब्द नहीं।',
      objectionsTab: 'ईमानदार व्यावसायिक शंकाएं',
      faqsTab: 'अक्सर पूछे जाने वाले प्रश्न',
      kbsrClarification: 'GWL का यथार्थ',
      ctaHeadline: 'क्या आपके मन में अभी भी कोई विशेष प्रश्न है?',
      ctaSubtitle: 'सीधे तकनीकी संस्थापक से बात करें। कोई आक्रामक सेल्स प्रतिनिधि नहीं।',
      ctaBtn: 'हमसे सीधे पूछें'
    },
    commitment: {
      badge: 'व्यावसायिक ईमानदारी',
      headline: 'प्रत्येक व्यावसायिक ग्राहक के लिए हमारी गारंटी',
      subtitle: 'हम बढ़ा-चढ़ाकर दावे नहीं करते। यदि हमारे प्रारंभिक विश्लेषण में पता चलता है कि आपके व्यवसाय को अभी वेबसाइट या विज्ञापन की आवश्यकता नहीं है, तो हम आपको स्पष्ट बताएंगे।',
      point1Title: 'स्पष्ट दायरा (Scope)',
      point1Desc: 'काम शुरू होने से पहले लिखित में सहमत निश्चित माइलस्टोन।',
      point2Title: 'गारंटीकृत डिलीवरी',
      point2Desc: 'लॉन्च समय-सीमा (7-25 कार्य दिवस) का कड़ाई से पालन।',
      point3Title: 'शून्य टेक लॉक-इन',
      point3Desc: 'डोमेन, कोड और सामग्री पर आपका 100% पूर्ण स्वामित्व रहता है।'
    },
    testimonials: {
      badge: 'क्लाइंट अनुभव और वास्तविक परिणाम',
      headline: 'व्यावसायिक परिणामों को महत्व देने वाले उद्यमियों द्वारा विश्वसनीय',
      subtitle: 'देखें कैसे विभिन्न व्यवसायों ने अपनी वेबसाइट विजिट्स को योग्य फोन कॉल, व्हाट्सएप पूछताछ और सत्यापित राजस्व में बदला।',
      verifiedClient: 'सत्यापित ग्राहक समीक्षा',
      ratingScore: '5.0 / 5.0 रेटिंग',
      reviewsCount: '45+ गूगल और डायरेक्ट समीक्षाएं',
      satisfactionRate: '100% माइलस्टोन डिलीवरी',
      viewWork: 'केस स्टडीज देखें',
      startProject: 'अपना प्रोजेक्ट शुरू करें',
      autoPlayNotice: 'ऑटोप्ले सक्रिय (होवर या स्वाइप पर रुकता है)',
      dragSwipeHint: 'क्लाइंट समीक्षाएं देखने के लिए स्वाइप या ड्रैग करें'
    },
    about: {
      badge: 'GWL वेबलैब (ग्वालियर वेबलैब / ग्लोबल वेबलैब)',
      headline: 'विकास के लिए तैयार व्यवसायों के लिए निर्मित',
      subtitle: 'एक ऐसी डिजिटल एजेंसी जो उन्नत वेब तकनीक और दैनिक व्यावसायिक सफलता के बीच की दूरी मिटाती है।',
      p1: 'GWL वेबलैब (ग्वालियर वेबलैब / ग्लोबल वेबलैब) की शुरुआत एक सरल अवलोकन से हुई: स्थानीय और विकासशील व्यवसायों से पुरानी तकनीकों के लिए भारी शुल्क लिया जा रहा था जो एक भी नया ग्राहक नहीं ला पा रहे थे।',
      p2: 'हम उस अंतर को पाटते हैं। हम आपकी वेब उपस्थिति को एक सक्रिय बिक्री साधन मानते हैं—तेज गति, आसान मोबाइल संपर्क और स्थानीय गूगल खोज के लिए अनुकूलित।',
      stat1Label: 'लक्ष्य लोड समय',
      stat2Label: 'क्लाइंट संतुष्टि',
      stat3Label: 'कोड और डेटा स्वामित्व'
    },
    contact: {
      badge: 'संपर्क करें',
      headline: 'आइए कुछ ऐसा बनाएं जो आपके व्यवसाय को बढ़ाए',
      subtitle: 'मुफ्त डिजिटल परामर्श, वेबसाइट ऑडिट या विस्तृत कोटेशन के लिए संपर्क करें।',
      formName: 'आपका नाम',
      formBusiness: 'व्यवसाय / कंपनी का नाम',
      formPhone: 'फोन या व्हाट्सएप नंबर',
      formEmail: 'ईमेल पता',
      formService: 'आवश्यक सेवा या प्लान',
      formBudget: 'अनुमानित बजट',
      formMessage: 'अपने लक्ष्यों के बारे में संक्षेप में बताएं',
      formSubmit: 'पूछताछ सबमिट करें',
      formSubmitting: 'भेज रहा है...',
      nameLabel: 'आपका नाम',
      namePlaceholder: 'उदा. राहुल शर्मा',
      businessLabel: 'व्यवसाय / कंपनी का नाम',
      businessPlaceholder: 'उदा. अपैक्स क्लिनिक',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'rahul@example.com',
      phoneLabel: 'फोन या व्हाट्सएप नंबर',
      phonePlaceholder: '+91 9XXXXXXXXX',
      serviceLabel: 'आवश्यक सेवा / समाधान',
      budgetLabel: 'अनुमानित प्रोजेक्ट बजट',
      messageLabel: 'संक्षिप्त प्रोजेक्ट विवरण',
      messagePlaceholder: 'अपने लक्ष्यों, समय-सीमा या वर्तमान वेबसाइट की चुनौतियों के बारे में बताएं...',
      submitBtn: 'पूछताछ भेजें',
      submitting: 'भेज रहे हैं...',
      validationError: 'कृपया सभी आवश्यक फ़ील्ड भरें (नाम, व्यवसाय, ईमेल)।',
      transmissionReceived: 'पूछताछ प्राप्त और सत्यापित',
      thankYou: 'धन्यवाद',
      confirmationMsg: 'हमें आपके प्रोजेक्ट का विवरण प्राप्त हो गया है। हमारी तकनीकी टीम आपकी आवश्यकताओं की समीक्षा कर रही है और 24 घंटों के भीतर विस्तृत प्रस्ताव के साथ संपर्क करेगी।',
      submitAnother: 'दूसरी पूछताछ भेजें',
      successTitle: 'पूछताछ प्राप्त हुई!',
      successMessage: 'संपर्क करने के लिए धन्यवाद। हम आपकी आवश्यकताओं की समीक्षा करेंगे और 24 घंटों के भीतर आपसे संपर्क करेंगे।',
      whatsappDirect: 'व्हाट्सएप पर चैट करें',
      phoneDirect: 'हमें सीधे कॉल करें',
      emailDirect: 'हमारी टीम को ईमेल करें',
      chatWhatsAppBtn: 'व्हाट्सएप चैट शुरू करें'
    },
    finalCta: {
      badge: 'आज ही शुरू करें',
      headline: 'ग्राहकों के ध्यान को व्यवसाय वृद्धि में बदलने के लिए तैयार हैं?',
      subtitle: 'प्रतिस्पर्धियों के हाथों संभावित ग्राहक खोना बंद करें। आइए आपके लक्ष्यों के अनुसार उच्च-प्रदर्शन डिजिटल उपस्थिति तैयार करें।',
      primaryBtn: 'प्रोजेक्ट शुरू करें',
      secondaryBtn: 'सेवाएं देखें',
      startProject: 'प्रोजेक्ट शुरू करें',
      exploreServices: 'सेवाएं देखें'
    },
    floatingBar: {
      chatWhatsApp: 'व्हाट्सएप चैट',
      callDirect: 'सीधे कॉल करें',
      quickConsult: 'त्वरित कोटेशन',
      whatsappShort: 'व्हाट्सएप',
      callUs: 'कॉल करें',
      getStarted: 'शुरू करें'
    },
    footer: {
      tagline: 'गंभीर व्यवसायों के लिए उच्च-प्रदर्शन वेबसाइटें, स्थानीय सर्च डिस्कवरी और डिजिटल ग्रोथ सिस्टम।',
      rights: 'सर्वाधिकार सुरक्षित।',
      designedWith: 'व्यावसायिक विकास और प्रदर्शन के लिए निर्मित।',
      navigation: 'त्वरित लिंक',
      services: 'सेवाएं',
      directContact: 'सीधा संपर्क',
      aboutText: 'व्यावसायिक गति, उच्च रूपांतरण दर और वास्तविक स्थानीय ग्राहकों को आकर्षित करने के लिए निर्मित।',
      servicesCol: 'सेवाएं',
      growthSystems: 'ग्रोथ सिस्टम्स',
      backToTop: 'ऊपर जाएं'
    },
    modal: {
      greatChoice: 'उत्कृष्ट चयन',
      selectedPrefix: 'चयनित:',
      selectedSuffix: '',
      startingInvestment: 'प्रारंभिक निवेश',
      estimatedTimeline: 'अनुमानित डिलीवरी',
      includedLabel: 'शामिल सुविधाएं',
      moreFeatures: 'और अधिक रणनीतिक सुविधाएं',
      nextStepTitle: 'पारदर्शी ऑनबोर्डिंग गारंटी',
      nextStepDesc: 'कोई छिपा हुआ शुल्क नहीं। हम आपकी आवश्यकताओं की समीक्षा करते हैं और एक स्पष्ट रोडमैप प्रदान करते हैं।',
      continueBtn: 'आगे बढ़ें',
      step2Of2: 'चरण 2 / 2: प्रोजेक्ट विवरण',
      step2Headline: 'अपने व्यवसाय के बारे में बताएं',
      validationError: 'कृपया अपना पूरा नाम और फोन/व्हाट्सएप नंबर दर्ज करें।',
      fullName: 'पूरा नाम',
      fullNamePlaceholder: 'उदा. अमित पटेल',
      businessBrand: 'व्यवसाय / ब्रांड का नाम',
      businessBrandPlaceholder: 'उदा. पटेल हेल्थकेयर',
      phoneWhatsapp: 'फोन / व्हाट्सएप',
      phoneWhatsappPlaceholder: '+91 9XXXXXXXXX',
      emailAddress: 'ईमेल पता',
      emailAddressPlaceholder: 'amit@patelhealth.com',
      goalsNotes: 'विशिष्ट लक्ष्य या आवश्यकताएं',
      goalsNotesPlaceholder: 'मौजूदा वेबसाइट लिंक, लक्षित लॉन्च तिथि या आवश्यक सुविधाओं के बारे में बताएं...',
      backBtn: 'वापस',
      submitInquiryBtn: 'प्रस्ताव अनुरोध करें',
      privacyNote: '🔒 गोपनीयता गारंटी। हम आपके व्यावसायिक डेटा का पूरा सम्मान करते हैं।'
    },
    search: {
      title: 'त्वरित खोज',
      placeholder: 'सेवाएं, पोर्टफोलियो, सामान्य प्रश्न, प्लान्स खोजें...',
      clear: 'खोज साफ़ करें',
      esc: 'ESC',
      allResults: 'सभी परिणाम',
      servicesFilter: 'सेवाएं (8)',
      portfolioFilter: 'पोर्टफोलियो (4)',
      faqFilter: 'सामान्य प्रश्न (15)',
      plansFilter: 'ग्रोथ प्लान्स (3)',
      quickSuggestions: 'त्वरित नेविगेशन और लोकप्रिय खोजें',
      recentSearches: 'हाल की खोजें',
      clearRecent: 'इतिहास साफ़ करें',
      noRecentSearches: 'कोई हाल की खोज नहीं',
      noResults: 'कोई परिणाम नहीं मिला',
      tryBroader: 'व्यापक शब्द खोजें जैसे "वेबसाइट", "एसईओ", "मूल्य", या "समय-सीमा"।',
      clearFilter: 'फ़िल्टर साफ़ करें',
      navigate: 'नेविगेट करें',
      select: 'चुनें',
      close: 'बंद करें',
      resultCountSingle: 'परिणाम',
      resultCountPlural: 'परिणाम'
    },
    insights: {
      badge: 'इंजीनियरिंग एवं ग्रोथ इनसाइट्स',
      headline: 'डिजिटल इनसाइट्स एवं व्यावहारिक रणनीतियां',
      subtitle:
        'सब-सेकंड वेब परफॉर्मेंस, लोकल एवं ग्लोबल एसईओ, कन्वर्जन फनल्स और एआई ऑटोमेशन पर प्रमाणित व्यापारिक विश्लेषण।',
      readTime: 'मिनट का पठन',
      readArticle: 'पूरा इनसाइट पढ़ें',
      filterAll: 'सभी इनसाइट्स',
      keyTakeawayLabel: 'मुख्य व्यापारिक निष्कर्ष',
      frameworkChecklist: 'क्रियान्वयन चेकलिस्ट एवं फ्रेमवर्क',
      discussStrategy: 'मेरे व्यवसाय के लिए यह रणनीति लागू करें',
      closeReader: 'रीडर बंद करें',
      searchPlaceholder: 'कीवर्ड या विषय के आधार पर इनसाइट्स खोजें...',
      noResults: 'आपकी खोज से मेल खाता कोई इनसाइट नहीं मिला।',
      clearFilter: 'फ़िल्टर रीसेट करें',
      authorPrefix: 'द्वारा तैयार',
      estimatedRead: 'अनुमानित पठन समय',
      impactLabel: 'प्रमाणित व्यापारिक प्रभाव',
      viewAllCta: 'सभी केस स्टडीज व प्लान्स देखें'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      plans: 'Planes',
      work: 'Portafolio',
      process: 'Proceso',
      insights: 'Perspectivas',
      faq: 'Preguntas',
      contact: 'Contacto',
      startProject: 'Iniciar Proyecto',
      quickSearch: 'Búsqueda Rápida',
      searchShortcut: '⌘K',
      searchPlaceholder: 'Buscar servicios, proyectos, preguntas...',
      theme: 'Tema',
      language: 'Idioma'
    },
    hero: {
      badge: 'Sitios Web • SEO • Google Ads • Redes Sociales • Marca',
      headlinePart1: 'Construya Su',
      headlinePart2: 'Presencia Digital.',
      headlineGradient: 'Convierta la Atención en Crecimiento Comercial.',
      subtitle:
        'Sitios web, marketing y soluciones de crecimiento digital diseñados para ayudar a las empresas a proyectar profesionalismo, captar clientes y crecer online.',
      primaryCta: 'Llevar Mi Negocio a Internet',
      secondaryCta: 'Ver Planes',
      trustHighPerf: 'Arquitectura Personalizada de Alto Rendimiento',
      trustConversion: 'Ingeniería Enfocada en Conversión'
    },
    problem: {
      badge: 'La Realidad de la Mayoría de Empresas',
      headline: 'Su Negocio Podría Estar Perdiendo Clientes Ahora Mismo',
      subtitle:
        'Muchos empresarios no saben cuántos clientes potenciales buscan sus servicios a diario y terminan contratando a la competencia debido a una mejor presencia digital.',
      fixCallout: 'Solucionamos cada uno de estos problemas con nuestros sistemas integrales de crecimiento digital.',
      fixButton: 'Explorar Nuestras Soluciones',
      problems: [
        {
          title: 'Sin Presencia Web Real',
          description: 'Depender solo de redes sociales genera dudas de credibilidad en clientes de alto valor.',
          impact: 'Pérdida de credibilidad y clientes premium'
        },
        {
          title: 'Invisible en Google',
          description: 'Cuando los clientes buscan lo que usted ofrece, sus competidores aparecen primero.',
          impact: 'Cero tráfico de búsqueda entrante'
        },
        {
          title: 'Experiencia Móvil Lenta o Deficiente',
          description: 'Más del 78% de las búsquedas locales son móviles. Si tarda más de 4 segundos, el usuario se marcha.',
          impact: 'Abandono instantáneo y pérdida de presupuesto'
        },
        {
          title: 'Fricción al Contactar',
          description: 'La falta de WhatsApp directo o botones de llamada inmediata frustra el contacto espontáneo.',
          impact: 'Llamadas perdidas y prospectos desaprovechados'
        },
        {
          title: 'La Competencia Captando Sus Clientes',
          description: 'Empresas que invierten en digital transmiten mayor solidez y cierran ventas antes que usted.',
          impact: 'Pérdida de cuota de mercado'
        },
        {
          title: 'Dependencia Exclusiva de Recomendaciones',
          description: 'Sin un sistema automatizado de captación, los ingresos mensuales son una montaña rusa.',
          impact: 'Flujo de caja impredecible'
        }
      ]
    },
    services: {
      badge: 'Capacidades Centrales',
      headline: 'Todo lo Que Su Negocio Necesita Para Crecer en Internet',
      subtitle: 'Diseñado para resultados comerciales reales, sin vanidad técnica.',
      inquireBtn: 'Consultar Sobre Este Servicio',
      deliverablesLabel: 'Qué Entregamos',
      modalDeliverablesTitle: 'Entregables y Especificaciones',
      modalTimeline: 'Plazo Estimado',
      modalTarget: 'Ideal Para',
      modalStartBtn: 'Comenzar con Este Servicio',
      modalCloseBtn: 'Cerrar'
    },
    growthSystem: {
      badge: 'Arquitectura de Embudo',
      headline: 'Cómo Convertimos Desconocidos en Clientes de Pago',
      subtitle: 'Un motor de 4 fases diseñado para captar, convencer y convertir a su mercado objetivo.',
      stepPrefix: 'Fase',
      actionLabel: 'Acción Principal',
      metricLabel: 'Impacto Primario',
      advantageLabel: 'Ventaja GWL'
    },
    pricing: {
      badge: 'Planes Transparentes',
      headline: 'Inversión Predecible. Retorno Medible.',
      subtitle: 'Sin tarifas ocultas ni contratos complicados. Hitos claros con entregas garantizadas.',
      perProject: 'inversión fija',
      deliveryTimeLabel: 'Plazo de Lanzamiento',
      timelineLabel: 'Plazo',
      idealForLabel: 'Ideal Para',
      includesLabel: 'Entregables Incluidos',
      selectPlanBtn: 'Seleccionar Plan',
      customPlanTitle: '¿Requiere una Solución Empresarial a Medida?',
      customPlanSubtitle: 'Arquitectura multisitio, aplicaciones web personalizadas, integración CRM o campañas multirregión.',
      customPlanBtn: 'Hablar de Solución a Medida',
      badgePopular: 'Opción Más Popular',
      modalTitle: 'Inicie Su Plan de Crecimiento',
      modalSubtitle: 'Revise los entregables y comparta los datos de su negocio para comenzar de inmediato.',
      modalStep1: 'Alcance y Entregables',
      modalStep2: 'Información de su Negocio',
      modalProceed: 'Continuar a Datos',
      modalBack: 'Atrás',
      modalSubmit: 'Confirmar y Enviar Solicitud',
      modalName: 'Su Nombre Completo',
      modalBusiness: 'Nombre del Negocio / Empresa',
      modalPhone: 'WhatsApp / Teléfono',
      modalEmail: 'Correo Electrónico',
      modalNotes: 'Objetivos Específicos o Sitio Web Actual'
    },
    planBuilder: {
      badge: 'Cotizador Interactivo',
      headline: 'Diseñe su Paquete de Crecimiento Personalizado',
      subtitle: 'Seleccione las capacidades exactas que su empresa necesita y observe la tarifa con descuento en tiempo real.',
      selectedServices: 'Servicios Seleccionados',
      estimatedCost: 'Costo Estimado del Paquete',
      recommendedTier: 'Nivel Recomendado',
      estimatedDelivery: 'Tiempo de Entrega',
      savingsBadge: 'Ahorro por Paquete Aplicado',
      proceedBtn: 'Continuar con Este Paquete',
      resetBtn: 'Reiniciar Selección'
    },
    roi: {
      badge: 'Perspectiva Comercial',
      headline: 'Un Sitio Web es su Representante Comercial 24/7',
      subtitle: 'Un sitio optimizado no duerme, no toma vacaciones y nunca olvida presentar su propuesta de valor.',
      calcTitle: 'Simulador Interactivo de Captación',
      monthlyInquiries: 'Visitantes Mensuales Estimados',
      avgCustomerValue: 'Valor Promedio por Cliente (₹)',
      estimatedGrowth: 'Tasa Estimada de Contacto',
      potentialRevenue: 'Ingresos Anuales Adicionales Estimados',
      ctaButton: 'Desbloquear Este Crecimiento'
    },
    beforeAfter: {
      badge: 'Impacto de la Transformación',
      headline: 'Antes vs Después de Trabajar con GWL WebLab',
      subtitle: 'Vea la diferencia práctica entre una presencia descuidada y un sistema diseñado para la conversión.',
      beforeLabel: 'Antes de GWL WebLab',
      afterLabel: 'Después de GWL WebLab',
      sliderHint: 'Deslice para comparar'
    },
    whyKbsr: {
      badge: 'Arquitectura Estratégica',
      headline: 'No Solo Hacemos Sitios Web. Construimos Sistemas de Crecimiento.',
      subtitle: 'Ingeniería veloz, claridad comercial y generación directa de clientes potenciales.',
      viewCaseStudies: 'Ver Casos de Éxito',
      scheduleCall: 'Agendar Consulta Estratégica'
    },
    trust: {
      badge: 'Estándares Instituidos',
      headline: 'Por Qué Empresas Exitosas Confían en GWL WebLab',
      subtitle: 'Un socio tecnológico y comercial cimentado en claridad, ejecución medible y entregas confiables.',
      badgeStandard: 'ESTÁNDAR VERIFICADO',
      bottomNotice: 'Sin tecnicismos innecesarios. Asesoría honesta y diseño de alta conversión para su mercado.',
      scheduleCallBtn: 'Agendar Consulta Estratégica'
    },
    portfolio: {
      badge: 'Ejecución Comprobada',
      headline: 'Negocios Reales, Impacto Comercial Real',
      subtitle: 'Conozca plataformas digitales recientes diseñadas para generar credibilidad y captar clientes potenciales.',
      viewLive: 'Ver Experiencia en Vivo',
      discussSimilar: 'Crear Plataforma Similar',
      resultsLabel: 'Resultado Clave'
    },
    process: {
      badge: 'Metodología de Trabajo',
      headline: 'Del Concepto al Lanzamiento en 5 Fases',
      subtitle: 'Un proceso transparente, colaborativo y con plazos fijos sin sorpresas.',
      stagePrefix: 'Paso',
      activitiesLabel: 'Qué Sucede en Esta Fase',
      outcomeLabel: 'Resultado de la Fase'
    },
    faq: {
      badge: 'Respuestas Claras',
      headline: 'Preguntas Frecuentes y Realidades Comerciales',
      subtitle: 'Claridad 100% desde el inicio. Sin rodeos de ventas ni tecnicismos confusos.',
      objectionsTab: 'Objeciones Comerciales Reales',
      faqsTab: 'Preguntas Frecuentes',
      kbsrClarification: 'La Realidad GWL',
      ctaHeadline: '¿Tiene una duda específica sobre su negocio?',
      ctaSubtitle: 'Hable directamente con un fundador técnico. Sin comerciales agresivos.',
      ctaBtn: 'Pregúntenos Directamente'
    },
    commitment: {
      badge: 'Integridad Profesional',
      headline: 'Nuestra Garantía para Cada Cliente',
      subtitle: 'No usamos promesas infladas. Si en el diagnóstico inicial vemos que su negocio no necesita una web completa o pauta publicitaria, se lo diremos con franqueza.',
      point1Title: 'Alcance Claro',
      point1Desc: 'Hitos definidos por escrito antes de comenzar cualquier trabajo.',
      point2Title: 'Entrega Garantizada',
      point2Desc: 'Cumplimiento estricto del cronograma acordado (7-25 días hábiles).',
      point3Title: 'Cero Ataduras Técnicas',
      point3Desc: 'Usted mantiene la propiedad total del dominio, código y contenidos.'
    },
    testimonials: {
      badge: 'Testimonios y Retorno Real',
      headline: 'La Elección de Líderes Que Buscan Resultados Comerciales',
      subtitle: 'Compruebe cómo empresas regionales y marcas en crecimiento transforman visitas web en llamadas, consultas por WhatsApp y ventas cuantificables.',
      verifiedClient: 'Opinión de Cliente Verificado',
      ratingScore: 'Calificación 5.0 / 5.0',
      reviewsCount: 'Más de 45 Reseñas Verificadas',
      satisfactionRate: '100% de Cumplimiento de Hitos',
      viewWork: 'Ver Casos de Éxito',
      startProject: 'Comience su Proyecto',
      autoPlayNotice: 'Reproducción automática activa (se pausa al pasar el cursor o deslizar)',
      dragSwipeHint: 'Deslice horizontalmente para ver testimonios'
    },
    about: {
      badge: 'Acerca de GWL WebLab',
      headline: 'Creado para Negocios Listos para Escalar',
      subtitle: 'Una agencia de crecimiento digital que une la alta tecnología web con el éxito comercial cotidiano.',
      p1: 'GWL WebLab (Gwalior WebLab / Global WebLab) nació al observar cómo negocios locales pagaban cifras excesivas por sitios obsoletos que no generaban ni una sola venta.',
      p2: 'Cerramos esa brecha convirtiendo su sitio web en un activo comercial activo: ultrarrápido, fácil de contactar en móvil y visible en Google.',
      stat1Label: 'Tiempo de Carga Objetivo',
      stat2Label: 'Satisfacción de Clientes',
      stat3Label: 'Propiedad Total del Código'
    },
    contact: {
      badge: 'Contacto',
      headline: 'Construyamos Algo Que Haga Crecer su Empresa',
      subtitle: 'Contáctenos para una asesoría gratuita, auditoría de su sitio o cotización detallada.',
      formName: 'Su Nombre',
      formBusiness: 'Nombre de su Empresa / Negocio',
      formPhone: 'Teléfono o WhatsApp',
      formEmail: 'Correo Electrónico',
      formService: 'Servicio o Plan Requerido',
      formBudget: 'Presupuesto Estimado',
      formMessage: 'Cuéntenos brevemente sobre sus metas',
      formSubmit: 'Enviar Consulta',
      formSubmitting: 'Enviando Consulta...',
      nameLabel: 'Su Nombre',
      namePlaceholder: 'ej. Carlos Mendoza',
      businessLabel: 'Nombre de su Empresa / Negocio',
      businessPlaceholder: 'ej. Clínica Médica Santa Fe',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'carlos@ejemplo.com',
      phoneLabel: 'Teléfono o WhatsApp',
      phonePlaceholder: '+34 612 34 56 78',
      serviceLabel: 'Servicio / Solución Requerida',
      budgetLabel: 'Presupuesto Estimado',
      messageLabel: 'Detalles del Proyecto',
      messagePlaceholder: 'Cuéntenos sus metas comerciales, fecha deseada de lanzamiento...',
      submitBtn: 'Enviar Consulta',
      submitting: 'Enviando...',
      validationError: 'Por favor complete todos los campos obligatorios (Nombre, Negocio, Correo).',
      transmissionReceived: 'Consulta Recibida y Verificada',
      thankYou: 'Muchas gracias',
      confirmationMsg: 'Hemos recibido los detalles de su proyecto. Nuestro equipo técnico analizará sus requerimientos y responderá con una propuesta clara en menos de 24 horas.',
      submitAnother: 'Enviar Otra Consulta',
      successTitle: '¡Consulta Recibida!',
      successMessage: 'Gracias por comunicarse. Analizaremos sus requerimientos y responderemos en menos de 24 horas.',
      whatsappDirect: 'Chatear por WhatsApp',
      phoneDirect: 'Llamar Directamente',
      emailDirect: 'Escribir a Nuestro Equipo',
      chatWhatsAppBtn: 'Iniciar Chat de WhatsApp'
    },
    finalCta: {
      badge: 'Comience Hoy',
      headline: '¿Listo Para Convertir la Atención en Crecimiento Comercial?',
      subtitle: 'Deje de perder clientes frente a sus competidores. Construyamos una presencia digital de alto rendimiento para su empresa.',
      primaryBtn: 'Iniciar su Proyecto',
      secondaryBtn: 'Explorar Servicios',
      startProject: 'Iniciar su Proyecto',
      exploreServices: 'Explorar Servicios'
    },
    floatingBar: {
      chatWhatsApp: 'Chat en WhatsApp',
      callDirect: 'Llamar Ahora',
      quickConsult: 'Cotización Rápida',
      whatsappShort: 'WhatsApp',
      callUs: 'Llamar',
      getStarted: 'Comenzar'
    },
    footer: {
      tagline: 'Sitios web de alto rendimiento, posicionamiento local y sistemas de crecimiento para empresas serias.',
      rights: 'Todos los derechos reservados.',
      designedWith: 'Diseñado para el crecimiento comercial y rendimiento.',
      navigation: 'Enlaces Rápidos',
      services: 'Servicios',
      directContact: 'Contacto Directo',
      aboutText: 'Diseñado para velocidad comercial, altas tasas de conversión y adquisición real de clientes locales.',
      servicesCol: 'Servicios',
      growthSystems: 'Sistemas de Crecimiento',
      backToTop: 'Volver arriba'
    },
    modal: {
      greatChoice: 'Excelente Elección',
      selectedPrefix: 'Seleccionado:',
      selectedSuffix: '',
      startingInvestment: 'Inversión Inicial',
      estimatedTimeline: 'Plazo Estimado',
      includedLabel: 'Qué Incluye',
      moreFeatures: 'entregables estratégicos adicionales',
      nextStepTitle: 'Garantía de Inicio Transparente',
      nextStepDesc: 'Sin costos ocultos ni presión comercial. Revisamos sus requerimientos y presentamos una hoja de ruta con hitos claros.',
      continueBtn: 'Continuar con',
      step2Of2: 'Paso 2 de 2: Alcance del Proyecto',
      step2Headline: 'Cuéntenos sobre su Empresa',
      validationError: 'Por favor ingrese su nombre completo y número de teléfono/WhatsApp.',
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'ej. Alejandro Ruiz',
      businessBrand: 'Nombre del Negocio / Marca',
      businessBrandPlaceholder: 'ej. Ruiz Abogados',
      phoneWhatsapp: 'Teléfono / WhatsApp',
      phoneWhatsappPlaceholder: '+34 612 345 678',
      emailAddress: 'Correo Electrónico',
      emailAddressPlaceholder: 'alejandro@ruizabogados.com',
      goalsNotes: 'Objetivos o Requerimientos Específicos',
      goalsNotesPlaceholder: 'Indique enlaces de sitios de referencia, fecha deseada o funcionalidades especiales...',
      backBtn: 'Atrás',
      submitInquiryBtn: 'Solicitar Propuesta para',
      privacyNote: '🔒 Cero spam. Respetamos la privacidad de su negocio.'
    },
    search: {
      title: 'Búsqueda Rápida',
      placeholder: 'Buscar servicios, proyectos, preguntas frecuentes, planes...',
      clear: 'Borrar búsqueda',
      esc: 'ESC',
      allResults: 'Todos los Resultados',
      servicesFilter: 'Servicios (8)',
      portfolioFilter: 'Portafolio (4)',
      faqFilter: 'Preguntas Frecuentes (15)',
      plansFilter: 'Planes de Crecimiento (3)',
      quickSuggestions: 'Navegación Rápida y Búsquedas Populares',
      recentSearches: 'Búsquedas Recientes',
      clearRecent: 'Borrar Historial',
      noRecentSearches: 'No hay búsquedas recientes',
      noResults: 'No se encontraron resultados',
      tryBroader: 'Intente buscar palabras más generales como "Web", "SEO", "Precios" o "Plazos".',
      clearFilter: 'Borrar Filtro',
      navigate: 'Navegar',
      select: 'Seleccionar',
      close: 'Cerrar',
      resultCountSingle: 'resultado',
      resultCountPlural: 'resultados'
    },
    insights: {
      badge: 'Perspectivas de Ingeniería y Crecimiento',
      headline: 'Perspectivas Digitales y Estrategias Tácticas',
      subtitle:
        'Estrategias probadas sobre rendimiento web sub-segundo, posicionamiento SEO local y global, embudos de conversión y automatización con IA.',
      readTime: 'min de lectura',
      readArticle: 'Leer Artículo Completo',
      filterAll: 'Todas las Perspectivas',
      keyTakeawayLabel: 'Conclusión Comercial Clave',
      frameworkChecklist: 'Lista de Verificación y Metodología',
      discussStrategy: 'Implementar Esta Estrategia en Mi Negocio',
      closeReader: 'Cerrar Lector',
      searchPlaceholder: 'Buscar artículos por palabra clave, tecnología o tema...',
      noResults: 'No se encontraron artículos con esa búsqueda.',
      clearFilter: 'Restablecer Filtros',
      authorPrefix: 'Escrito por',
      estimatedRead: 'Tiempo Estimado de Lectura',
      impactLabel: 'Impacto Comercial Comprobado',
      viewAllCta: 'Ver Casos de Éxito y Planes'
    }
  },
  de,
  fr
};
