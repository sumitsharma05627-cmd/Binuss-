import React, { useState, useEffect } from 'react';
import { ScrollSequenceProvider } from './context/ScrollSequenceContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { BackgroundParticles2D } from './components/2d/BackgroundParticles2D';
import { Navbar } from './components/Navbar';
import { SearchOverlay } from './components/SearchOverlay';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { Services } from './components/Services';
import { GrowthSystem } from './components/GrowthSystem';
import { Pricing } from './components/Pricing';
import { PlanBuilder } from './components/PlanBuilder';
import { RoiValueSection } from './components/RoiValueSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { WhyKBSR } from './components/WhyKBSR';
import { TrustSection } from './components/TrustSection';
import { Portfolio } from './components/Portfolio';
import { TestimonialSlider } from './components/TestimonialSlider';
import { Process } from './components/Process';
import { DigitalInsights } from './components/DigitalInsights';
import { ObjectionFaqSection } from './components/ObjectionFaqSection';
import { TransparencyCommitment } from './components/TransparencyCommitment';
import { About } from './components/About';
import { GlobalReach } from './components/GlobalReach';
import { Contact } from './components/Contact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingContactBar } from './components/FloatingContactBar';
import { FloatingThemeButton } from './components/FloatingThemeButton';
import { PlanOnboardingModal } from './components/PlanOnboardingModal';
import { DoubtResolverChatbot } from './components/DoubtResolverChatbot';
import { PricingPlan } from './data/pricing';
import { trackCtaClick, trackEvent } from './utils/analytics';
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App() {
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('Website');
  const [selectedMessageForInquiry, setSelectedMessageForInquiry] = useState<string>('');
  const [activeOnboardingPlan, setActiveOnboardingPlan] = useState<PricingPlan | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Focus the name input after scroll completes
      setTimeout(() => {
        const input = document.getElementById('contact-name');
        if (input) input.focus();
      }, 600);
    }
  };

  const handleViewPlans = () => {
    trackCtaClick('View Plans', {
      source: 'Hero / Navigation CTA'
    });
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServices = () => {
    trackCtaClick('Explore Services', {
      source: 'Section Action Button'
    });
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
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
    // Close modal and forward to contact section with pre-filled details
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
        <div className="relative min-h-screen text-slate-900 dark:text-white selection:bg-emerald-500/30 selection:text-emerald-200 transition-colors duration-300">
          {/* Ambient 2D Particle Constellation in Background */}
          <BackgroundParticles2D />

          {/* Floating Navigation with Search */}
          <Navbar
            onOpenProjectModal={() => handleStartProject()}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Quick Search Sliding Overlay */}
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectService={(serviceTitle) => handleStartProject(serviceTitle)}
            onSelectPlan={(plan) => handlePlanSelect(plan)}
          />

          <main className="relative z-10">
            {/* 1. 3D Hero Section */}
            <Hero
              onStartProject={() => handleStartProject()}
              onViewPlans={handleViewPlans}
            />

            {/* 2. Problem Section ("Your Business May Be Losing Customers") */}
            <ProblemSection onExploreSolution={handleExploreServices} />

            {/* 3. Solution / Services Section (8 Interactive 3D Service Cards) */}
            <Services
              onSelectServiceForInquiry={(serviceTitle) => handleStartProject(serviceTitle)}
            />

            {/* 4. Customer Journey & Growth System Pipeline ("From Attention to Growth") */}
            <GrowthSystem />

            {/* 5. Transparent Pricing & Growth Plans (Starter, Business, Growth & Creator Partnerships) */}
            <Pricing
              onSelectPlan={handlePlanSelect}
              onRequestCustomPlan={() => handleStartProject('Custom Plan')}
              onSelectCollabForInquiry={(tierName) => handleStartProject(tierName)}
            />

            {/* 6. Interactive Plan & Package Builder */}
            <PlanBuilder onProceedWithCustomPlan={handleProceedWithCustomPlan} />

            {/* 7. ROI & Value Breakdown Section (24/7 Digital Representative + Calculator) */}
            <RoiValueSection onStartProject={() => handleStartProject()} />

            {/* 8. Before and After Transformation Comparison */}
            <BeforeAfterSection />

            {/* 9. Why GWL Weblab ("We Build Digital Growth Systems" 3D Ecosystem) */}
            <WhyKBSR />

            {/* 10. Why Smart Businesses Trust GWL Weblab (6 Trust Pillars) */}
            <TrustSection onStartConversation={() => handleStartProject()} />

            {/* 11. 3D Portfolio ("Selected Work" Floating 3D Screens) */}
            <Portfolio
              onSelectProjectForInquiry={(projectName) => handleStartProject(projectName)}
            />

            {/* 12. Client Testimonials Swiper Slider (Verified Outcomes & Social Proof) */}
            <TestimonialSlider
              onStartProject={() => handleStartProject()}
              onExploreServices={handleExploreServices}
            />

            {/* 13. 3D Process ("How We Build" 5-Stage Journey Road) */}
            <Process />

            {/* 14. Digital Insights & Tactical Blueprints (Engineering Blog & Knowledge Base) */}
            <DigitalInsights onSelectInsightForInquiry={(topic) => handleStartProject(topic)} />

            {/* 15. Objections & FAQs Section */}
            <ObjectionFaqSection onStartConsultation={() => handleStartProject()} />

            {/* 14. Professional Integrity & Guarantee Commitment */}
            <TransparencyCommitment />

            {/* 15. About ("Built for Businesses Ready to Grow" 3D Globe) */}
            <About />

            {/* 16. Global Reach Visualization (Client Locations & 3D Orbital Globe) */}
            <GlobalReach onSelectClientForInquiry={(clientName) => handleStartProject(clientName)} />

            {/* 17. Contact Form with 3D Confirmation Animation */}
            <Contact
              initialService={selectedServiceForInquiry}
              initialMessage={selectedMessageForInquiry}
            />

            {/* 17. Final CTA Full-screen Closing Scene with 3D Core Visual Loop */}
            <FinalCTA
              onStartProject={() => handleStartProject()}
              onExploreServices={handleExploreServices}
            />
          </main>

          {/* Persistent Floating WhatsApp & Mobile Conversion Bar */}
          <FloatingContactBar onStartConsultation={() => handleStartProject()} />

          {/* Persistent Floating Separate Theme Button */}
          <FloatingThemeButton />

          {/* AI Doubt Resolver Chatbot */}
          <DoubtResolverChatbot />

          {/* Smart Sales Flow: Mini Onboarding Modal for selected plans */}
          <PlanOnboardingModal
            plan={activeOnboardingPlan}
            onClose={() => setActiveOnboardingPlan(null)}
            onSubmitOnboarding={handleOnboardingSubmit}
          />

          {/* Footer */}
          <Footer />

          {/* Vercel Speed Insights */}
          <SpeedInsights />
        </div>
      </ScrollSequenceProvider>
    </LanguageProvider>
  </ThemeProvider>
);
}
