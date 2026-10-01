import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SERVICES } from '../data/services';
import { ThemeSwitcher } from './ThemeSwitcher';
import { GwlLogo } from './GwlLogo';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.plans, href: '#plans' },
    { name: t.nav.work, href: '#work' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.insights, href: '#insights' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.contact, href: '#contact' }
  ];

  return (
    <footer className="relative bg-[#04060a] border-t border-white/5 pt-16 pb-12 text-sm text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <GwlLogo variant="full" size="lg" showSubtitle={true} />

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Gwalior WebLab • Global WebLab</span>
            </div>

            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
              {t.footer.aboutText}
            </p>

            <div className="pt-2 text-xs text-neutral-500 space-y-1">
              <div>
                {t.footer.directContact}: <a href="mailto:hello@gwlweblab.com" className="text-neutral-300 hover:text-emerald-400 transition-colors">hello@gwlweblab.com</a>
              </div>
              <div>
                WhatsApp: <a href="https://wa.me/919755061139" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-emerald-400 transition-colors">+91 97550 61139</a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.servicesCol}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-emerald-400 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.growthSystems}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.slice(4).map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-emerald-400 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Theme Segmented Switcher Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Interface Color Experience</span>
          </div>
          <ThemeSwitcher variant="segmented" showLabels={true} />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} GWL WebLab (Gwalior WebLab / Global WebLab). {t.footer.rights}
          </div>

          <div className="flex items-center gap-6">
            <span>Production-Ready Agency Architecture</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-emerald-400/20 text-neutral-400 hover:text-emerald-300 transition-colors cursor-pointer"
              aria-label={t.footer.backToTop}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
