import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ScrollSequenceProvider } from './context/ScrollSequenceContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppModeSwitcherDock } from './components/AppModeSwitcherDock';
import { LazySection, requestMountSection } from './components/LazySection';
import { PricingPlan } from './data/pricing';
import { trackCtaClick, trackEvent } from './utils/analytics';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Code-split heavy Social Command Center suite so Agency Website loads instantaneously
const SocialCommandApp = lazy(() => import('./social-command-center/SocialCommandApp'));

// Code-split ambient 3D particles & overlays to keep First Contentful Paint unblocked
const BackgroundParticles3D = lazy(() =>
  import('./components/3d/BackgroundParticles3D').then((m) => ({ default: m.BackgroundParticles3D }))
);
const SearchOverlay = lazy(() =>
  import('./components/SearchOverlay').then((m) => ({ default: m.SearchOverlay }))
);
const FloatingContactBar = lazy(() =>
  import('./components/FloatingContactBar').then((m) => ({ default: m.FloatingContactBar }))
);
const FloatingThemeButton = lazy(() =>
  import('./components/FloatingThemeButton').then((m) => ({ default: m.FloatingThemeButton }))
);
const PlanOnboardingModal = lazy(() =>
  import('./components/PlanOnboardingModal').then((m) => ({ default: m.PlanOnboardingModal }))
);
const DoubtResolverChatbot = lazy(() =>
  import('./components/DoubtResolverChatbot').then((m) => ({ default: m.DoubtResolverChatbot }))
);
const DigitalGrowthLeadModal = lazy(() =>
  import('./components/DigitalGrowthLeadModal').then((m) => ({ default: m.DigitalGrowthLeadModal }))
);

// Code-split all below-the-fold Agency Website sections
const ProblemSection = lazy(() =>
  import('./components/ProblemSection').then((m) => ({ default: m.ProblemSection }))
);
const Services = lazy(() =>
  import('./components/Services').then((m) => ({ default: m.Services }))
);
const SocialCommandCenterFeatureSection = lazy(() =>
  import('./components/SocialCommandCenterFeatureSection').then((m) => ({
    default: m.SocialCommandCenterFeatureSection
  }))
);
const GrowthSystem = lazy(() =>
  import('./components/GrowthSystem').then((m) => ({ default: m.GrowthSystem }))
);
const Pricing = lazy(() =>
  import('./components/Pricing').then((m) => ({ default: m.Pricing }))
);
const PlanBuilder = lazy(() =>
  import('./components/PlanBuilder').then((m) => ({ default: m.PlanBuilder }))
);
const RoiValueSection = lazy(() =>
  import('./components/RoiValueSection').then((m) => ({ default: m.RoiValueSection }))
);
const BeforeAfterSection = lazy(() =>
  import('./components/BeforeAfterSection').then((m) => ({ default: m.BeforeAfterSection }))
);
const WhyKBSR = lazy(() =>
  import('./components/WhyKBSR').then((m) => ({ default: m.WhyKBSR }))
);
const TrustSection = lazy(() =>
  import('./components/TrustSection').then((m) => ({ default: m.TrustSection }))
);
const Portfolio = lazy(() =>
  import('./components/Portfolio').then((m) => ({ default: m.Portfolio }))
);
const WebsiteTemplates = lazy(() =>
  import('./components/WebsiteTemplates').then((m) => ({ default: m.WebsiteTemplates }))
);
const TestimonialSlider = lazy(() =>
  import('./components/TestimonialSlider').then((m) => ({ default: m.TestimonialSlider }))
);
const Process = lazy(() =>
  import('./components/Process').then((m) => ({ default: m.Process }))
);
const DigitalInsights = lazy(() =>
  import('./components/DigitalInsights').then((m) => ({ default: m.DigitalInsights }))
);
const ObjectionFaqSection = lazy(() =>
  import('./components/ObjectionFaqSection').then((m) => ({ default: m.ObjectionFaqSection }))
);
const TransparencyCommitment = lazy(() =>
  import('./components/TransparencyCommitment').then((m) => ({ default: m.TransparencyCommitment }))
);
const About = lazy(() =>
  import('./components/About').then((m) => ({ default: m.About }))
);
const GlobalReach = lazy(() =>
  import('./components/GlobalReach').then((m) => ({ default: m.GlobalReach }))
);
const Contact = lazy(() =>
  import('./components/Contact').then((m) => ({ default: m.Contact }))
);
const FinalCTA = lazy(() =>
  import('./components/FinalCTA').then((m) => ({ default: m.FinalCTA }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);

export default function App() {
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('Website');
  const [selectedMessageForInquiry, setSelectedMessageForInquiry] = useState<string>('');
  const [activeOnboardingPlan, setActiveOnboardingPlan] = useState<PricingPlan | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [idleReady, setIdleReady] = useState(false);

  const [viewMode, setViewMode] = useState<'website' | 'social-command-center'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const appParam = urlParams.get('app') || urlParams.get('mode') || urlParams.get('view');
      if (
        appParam === 'social-command-center' ||
        appParam === 'command-center' ||
        window.location.hash === '#social-command-center' ||
        window.location.hash === '#command-center'
      ) {
        return 'social-command-center';
      }
    }
    return 'website';
  });

  // Defer ambient 3D particles & secondary overlays until browser is idle after initial paint
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdleReady(true), { timeout: 600 });
      return () => w.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(() => setIdleReady(true), 350);
    return () => window.clearTimeout(timer);
  }, []);

  // Initial page view tracking
  useEffect(() => {
    trackEvent('page_view', {
      url: window.location.href,
      referrer: document.referrer || 'direct'
    });
  }, []);

  // Global keyboard shortcut (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Synchronize hash with viewMode
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#social-command-center' || hash === '#command-center') {
        setViewMode('social-command-center');
      } else if (
        hash === '' ||
        hash === '#agency' ||
        hash === '#agency-services' ||
        hash === '#website' ||
        hash === '#home'
      ) {
        setViewMode('website');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSwitchMode = (mode: 'website' | 'social-command-center') => {
    setViewMode(mode);
    if (mode === 'social-command-center') {
      window.location.hash = '#social-command-center';
    } else if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenSocialCommandCenter = () => handleSwitchMode('social-command-center');

  const scrollToLazySection = (sectionId: string, focusInputId?: string) => {
    requestMountSection(sectionId);
    const attemptScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        if (focusInputId) {
          setTimeout(() => {
            const input = document.getElementById(focusInputId);
            if (input) input.focus();
          }, 550);
        }
      }
    };
    attemptScroll();
    setTimeout(attemptScroll, 140);
  };

  const handleStartProject = (serviceName?: string, message?: string) => {
    trackCtaClick('Start Project', {
      service: serviceName || 'General Inquiry',
      hasCustomMessage: Boolean(message)
    });

    if (serviceName) {
      setSelectedServiceForInquiry(serviceName);
    }
    if (message) {
      setSelectedMessageForInquiry(message);
    }
    scrollToLazySection('contact', 'contact-name');
  };

  const handleViewPlans = () => {
    trackCtaClick('View Plans', {
      source: 'Hero / Navigation CTA'
    });
    scrollToLazySection('plans');
  };

  const handleExploreServices = () => {
    trackCtaClick('Explore Services', {
      source: 'Section Action Button'
    });
    scrollToLazySection('services');
  };

  const handlePlanSelect = (plan: PricingPlan) => {
    trackCtaClick('Select Plan', {
      planId: plan.id,
      planName: plan.name,
      price: plan.startingPrice
    });
    setActiveOnboardingPlan(plan);
  };

  const handleOnboardingSubmit = (data: {
    planName: string;
    businessName: string;
    contactName: string;
    phoneOrWhatsApp: string;
    email: string;
    notes: string;
  }) => {
    trackEvent('onboarding_submit', {
      planName: data.planName,
      hasBusinessName: Boolean(data.businessName),
      hasEmail: Boolean(data.email)
    });
    setActiveOnboardingPlan(null);
    setSelectedServiceForInquiry(`${data.planName} Plan`);
    handleStartProject(`${data.planName} Plan`);
  };

  const handleProceedWithCustomPlan = (details: {
    selectedServices: string[];
    recommendedTier: string;
    estimatedCost: string;
  }) => {
    trackCtaClick('Proceed Custom Plan', {
      recommendedTier: details.recommendedTier,
      estimatedCost: details.estimatedCost,
      servicesCount: details.selectedServices.length,
      services: details.selectedServices
    });
    setSelectedServiceForInquiry(`${details.recommendedTier} (${details.estimatedCost})`);
    handleStartProject(`${details.recommendedTier} (${details.estimatedCost})`);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScrollSequenceProvider>
          {viewMode === 'social-command-center' ? (
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400 text-sm font-semibold">
                  Loading Social Command Center...
                </div>
              }
            >
              <SocialCommandApp onBackToWebsite={() => handleSwitchMode('website')} />
              <AppModeSwitcherDock currentMode="social-command-center" onSwitchMode={handleSwitchMode} />
              {idleReady && <DoubtResolverChatbot />}
            </Suspense>
          ) : (
            <div className="relative min-h-screen text-slate-900 dark:text-white selection:bg-emerald-500/30 selection:text-emerald-200 transition-colors duration-300">
              {/* Ambient 3D Particle Constellation deferred until idle */}
              {idleReady && (
                <Suspense fallback={null}>
                  <BackgroundParticles3D />
                </Suspense>
              )}

              {/* Floating Navigation with Search & Social Command Suite Button */}
              <Navbar
                onOpenProjectModal={() => handleStartProject()}
                onOpenSearch={() => setIsSearchOpen(true)}
                onOpenSocialCommandCenter={handleOpenSocialCommandCenter}
              />

              {/* Quick Search Sliding Overlay (fetched on demand) */}
              {isSearchOpen && (
                <Suspense fallback={null}>
                  <SearchOverlay
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    onSelectService={(serviceTitle) => handleStartProject(serviceTitle)}
                    onSelectPlan={(plan) => handlePlanSelect(plan)}
                  />
                </Suspense>
              )}

              <main className="relative z-10">
                {/* 1. 3D Hero Section (Eager above-the-fold) */}
                <Hero
                  onStartProject={() => handleStartProject()}
                  onViewPlans={handleViewPlans}
                />

                {/* 2. Problem Section */}
                <LazySection anchorId="problem" minHeight="420px">
                  <ProblemSection onExploreSolution={handleExploreServices} />
                </LazySection>

                {/* 3. Solution / Services Section */}
                <LazySection anchorId="services" minHeight="680px">
                  <Services
                    onSelectServiceForInquiry={(serviceTitle) => handleStartProject(serviceTitle)}
                  />
                </LazySection>

                {/* Standalone Platform Feature Showcase & Launchpad */}
                <LazySection anchorId="social-command-center-feature" minHeight="520px">
                  <SocialCommandCenterFeatureSection
                    onLaunchCommandCenter={() => handleSwitchMode('social-command-center')}
                  />
                </LazySection>

                {/* 4. Customer Journey & Growth System Pipeline */}
                <LazySection anchorId="growth-system" minHeight="560px">
                  <GrowthSystem />
                </LazySection>

                {/* 5. Transparent Pricing & Growth Plans */}
                <LazySection anchorId="plans" minHeight="720px">
                  <Pricing
                    onSelectPlan={handlePlanSelect}
                    onRequestCustomPlan={() => handleStartProject('Custom Plan')}
                    onSelectCollabForInquiry={(tierName) => handleStartProject(tierName)}
                  />
                </LazySection>

                {/* 6. Interactive Plan & Package Builder */}
                <LazySection anchorId="plan-builder" minHeight="540px">
                  <PlanBuilder onProceedWithCustomPlan={handleProceedWithCustomPlan} />
                </LazySection>

                {/* 7. ROI & Value Breakdown Section */}
                <LazySection anchorId="roi" minHeight="480px">
                  <RoiValueSection onStartProject={() => handleStartProject()} />
                </LazySection>

                {/* 8. Before and After Transformation Comparison */}
                <LazySection anchorId="before-after" minHeight="480px">
                  <BeforeAfterSection />
                </LazySection>

                {/* 9. Why GWL Weblab */}
                <LazySection anchorId="why-gwl" minHeight="560px">
                  <WhyKBSR />
                </LazySection>

                {/* 10. Trust Section */}
                <LazySection anchorId="trust" minHeight="440px">
                  <TrustSection onStartConversation={() => handleStartProject()} />
                </LazySection>

                {/* 11. 3D Portfolio */}
                <LazySection anchorId="work" minHeight="680px">
                  <Portfolio
                    onSelectProjectForInquiry={(projectName) => handleStartProject(projectName)}
                  />
                </LazySection>

                {/* 12. SiteCraft Live Turnkey Website Templates */}
                <LazySection anchorId="templates" minHeight="680px">
                  <WebsiteTemplates
                    onSelectTemplateForInquiry={(templateName) => handleStartProject(templateName)}
                  />
                </LazySection>

                {/* 13. Client Testimonials Swiper Slider */}
                <LazySection anchorId="testimonials" minHeight="500px">
                  <TestimonialSlider
                    onStartProject={() => handleStartProject()}
                    onExploreServices={handleExploreServices}
                  />
                </LazySection>

                {/* 14. 3D Process */}
                <LazySection anchorId="process" minHeight="540px">
                  <Process />
                </LazySection>

                {/* 15. Digital Insights */}
                <LazySection anchorId="insights" minHeight="600px">
                  <DigitalInsights onSelectInsightForInquiry={(topic) => handleStartProject(topic)} />
                </LazySection>

                {/* 16. Objections & FAQs Section */}
                <LazySection anchorId="faq" minHeight="520px">
                  <ObjectionFaqSection onStartConsultation={() => handleStartProject()} />
                </LazySection>

                {/* 17. Transparency Commitment */}
                <LazySection anchorId="transparency" minHeight="400px">
                  <TransparencyCommitment />
                </LazySection>

                {/* 18. About */}
                <LazySection anchorId="about" minHeight="480px">
                  <About />
                </LazySection>

                {/* 19. Global Reach Visualization */}
                <LazySection anchorId="global-reach" minHeight="520px">
                  <GlobalReach onSelectClientForInquiry={(clientName) => handleStartProject(clientName)} />
                </LazySection>

                {/* 20. Contact Form */}
                <LazySection anchorId="contact" minHeight="580px">
                  <Contact
                    initialService={selectedServiceForInquiry}
                    initialMessage={selectedMessageForInquiry}
                  />
                </LazySection>

                {/* 21. Final CTA */}
                <LazySection anchorId="final-cta" minHeight="400px">
                  <FinalCTA
                    onStartProject={() => handleStartProject()}
                    onExploreServices={handleExploreServices}
                  />
                </LazySection>
              </main>

              {/* Persistent Floating Bars & Modals deferred until idle */}
              {idleReady && (
                <Suspense fallback={null}>
                  <FloatingContactBar onStartConsultation={() => handleStartProject()} />
                  <FloatingThemeButton />
                  <DoubtResolverChatbot />
                  <DigitalGrowthLeadModal />
                </Suspense>
              )}

              {/* Plan Onboarding Modal (fetched on demand) */}
              {activeOnboardingPlan && (
                <Suspense fallback={null}>
                  <PlanOnboardingModal
                    plan={activeOnboardingPlan}
                    onClose={() => setActiveOnboardingPlan(null)}
                    onSubmitOnboarding={handleOnboardingSubmit}
                  />
                </Suspense>
              )}

              {/* Floating App Mode Switcher Dock */}
              <AppModeSwitcherDock currentMode="website" onSwitchMode={handleSwitchMode} />

              {/* Footer */}
              <LazySection minHeight="320px">
                <Footer />
              </LazySection>

              {/* Vercel Speed Insights */}
              <SpeedInsights />
            </div>
          )}
        </ScrollSequenceProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
