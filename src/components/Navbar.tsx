import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Search, Palette } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { GwlLogo } from './GwlLogo';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenProjectModal: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProjectModal, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const { t, language, setLanguage, languages } = useLanguage();

  const isLight = theme === 'clean-light' || !themes.find((th) => th.id === theme)?.isDark;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home', id: 'home' },
    { name: t.nav.services, href: '#services', id: 'services' },
    { name: t.nav.plans, href: '#plans', id: 'plans' },
    { name: t.nav.templates || 'Templates', href: '#templates', id: 'templates' },
    { name: t.nav.work, href: '#work', id: 'work' },
    { name: t.nav.process, href: '#process', id: 'process' },
    { name: t.nav.insights, href: '#insights', id: 'insights' },
    { name: t.nav.faq, href: '#faq', id: 'faq' },
    { name: t.nav.contact, href: '#contact', id: 'contact' }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('close-all-overlays'));
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Main Navigation"
          className={`flex items-center justify-between px-4 sm:px-6 rounded-full transition-all duration-300 ${
            isLight
              ? isScrolled
                ? 'bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2.5'
                : 'bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm py-3'
              : isScrolled
                ? 'bg-[#0a0e17]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-2.5'
                : 'bg-[#0a0e17]/40 backdrop-blur-md border border-white/5 py-3'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            id="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg"
            aria-label="GWL WebLab (Gwalior WebLab / Global WebLab) Home"
          >
            <GwlLogo variant="full" size="md" showSubtitle={true} />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA & Multi-Theme Button */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2.5">
            {/* Desktop Search Trigger */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-medium group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200/90 border-slate-300 text-slate-700 hover:text-slate-950 shadow-xs'
                  : 'bg-white/[0.05] hover:bg-white/10 border-white/10 hover:border-emerald-500/40 text-neutral-400 hover:text-white'
              }`}
              aria-label="Quick search services, portfolio, and FAQ"
            >
              <Search
                className={`w-3.5 h-3.5 transition-colors ${
                  isLight
                    ? 'text-slate-600 group-hover:text-emerald-700'
                    : 'text-neutral-400 group-hover:text-emerald-400'
                }`}
              />
              <span
                className={`hidden lg:inline ${
                  isLight
                    ? 'text-slate-700 group-hover:text-slate-950 font-semibold'
                    : 'text-neutral-300 group-hover:text-white'
                }`}
              >
                {t.nav.quickSearch}
              </span>
              <kbd
                className={`hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                  isLight
                    ? 'bg-white text-slate-600 border-slate-300 shadow-xs'
                    : 'bg-white/10 text-neutral-400 border-white/5'
                }`}
              >
                <span>⌘</span>K
              </kbd>
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher variant="dropdown" />

            {/* Separate Dedicated Theme Palette Button */}
            <ThemeSwitcher variant="dropdown" showLabels={true} />

            {/* Global Theme Toggle Button: switches between Cyber Emerald and Clean Light modes dynamically */}
            <ThemeToggle id="global-theme-toggle-btn" />

            <button
              id="nav-start-project-btn"
              onClick={onOpenProjectModal}
              className="group relative inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full theme-btn-primary transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
            >
              <span>{t.nav.startProject}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Actions: Search + Language + Separate Theme Button + Quick Light/Dark Toggle + Menu Toggle */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <button
              id="mobile-nav-search-btn"
              onClick={onOpenSearch}
              className={`p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                isLight
                  ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
              aria-label="Open search"
            >
              <Search
                className={`w-5 h-5 ${
                  isLight ? 'text-emerald-700' : 'text-emerald-400'
                }`}
              />
            </button>
            <LanguageSwitcher variant="dropdown" showText={false} />
            <ThemeSwitcher variant="icon" />
            <ThemeToggle id="mobile-global-theme-toggle-btn" variant="icon" />
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                isLight
                  ? 'text-slate-800 hover:text-slate-950 hover:bg-slate-100'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-dropdown-menu"
            className={`md:hidden mt-2 p-5 backdrop-blur-2xl rounded-2xl shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 border ${
              isLight
                ? 'bg-white/98 border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
                : 'bg-[#0a0e17]/95 border-white/10 text-white shadow-2xl'
            }`}
          >
            {/* Quick Search Bar in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-white/[0.05] hover:bg-white/[0.08] border-white/10 text-neutral-300 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Search
                  className={`w-4 h-4 ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}
                />
                <span>{t.nav.searchPlaceholder}</span>
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                  isLight
                    ? 'bg-white text-slate-600 border-slate-300'
                    : 'bg-white/10 text-neutral-400 border-white/5'
                }`}
              >
                ⌘K
              </span>
            </button>

            {/* Language Selector in Mobile Menu */}
            <div
              className={`p-3 rounded-xl border ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-white/[0.03] border-white/10'
              }`}
            >
              <div
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isLight ? 'text-slate-600' : 'text-neutral-400'
                }`}
              >
                {t.nav.language} / Language
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      language === l.code
                        ? isLight
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold'
                        : isLight
                        ? 'bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                        : 'bg-white/5 text-neutral-400 hover:text-white border border-transparent'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Global Theme & Visual Atmosphere Palette */}
            <div
              className={`p-3 rounded-2xl border ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-white/[0.04] border-white/10'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span
                  className={`flex items-center gap-1.5 ${
                    isLight ? 'text-slate-800' : 'text-neutral-300'
                  }`}
                >
                  <Palette
                    className={`w-3.5 h-3.5 ${
                      isLight ? 'text-emerald-700' : 'text-emerald-400'
                    }`}
                  />
                  <span>Website Theme Palette</span>
                </span>
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}
                >
                  {themes.find((th) => th.id === theme)?.name}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {themes.map((th) => {
                  const isSelected = th.id === theme;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      id={`mobile-drawer-theme-${th.id}`}
                      onClick={() => {
                        const htmlElement = document.documentElement;
                        htmlElement.setAttribute('data-theme', th.id);
                        if (th.id === 'clean-light') {
                          htmlElement.classList.add('light');
                          htmlElement.classList.remove('dark');
                        } else {
                          htmlElement.classList.add('dark');
                          htmlElement.classList.remove('light');
                        }
                        setTheme(th.id);
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? isLight
                            ? 'bg-emerald-50 border-2 border-emerald-500/50 text-slate-950 font-bold shadow-xs'
                            : 'bg-emerald-500/20 text-white border border-emerald-500/40 shadow-sm'
                          : isLight
                          ? 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-800'
                          : 'bg-white/5 text-neutral-400 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm border border-black/10"
                          style={{ backgroundColor: th.primaryColor }}
                        />
                        <span>{th.name}</span>
                      </div>
                      {isSelected && (
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            isLight ? 'text-emerald-700' : 'text-emerald-400'
                          }`}
                        >
                          ACTIVE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`px-4 py-2.5 text-base font-medium rounded-xl transition-colors ${
                    isLight
                      ? 'text-slate-800 hover:text-slate-950 hover:bg-slate-100'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div
              className={`pt-2 border-t ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl theme-btn-primary shadow-lg transition-colors cursor-pointer"
              >
                <span>{t.nav.startProject}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
