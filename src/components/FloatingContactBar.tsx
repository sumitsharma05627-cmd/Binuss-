import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { openWhatsAppDirect } from '../utils/whatsapp';

interface FloatingContactBarProps {
  onStartConsultation: () => void;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({ onStartConsultation }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { t } = useLanguage();
  const { themeConfig } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
        setShowStickyBar(window.scrollY > 450);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    openWhatsAppDirect("Hello GWL Weblab, I'm interested in building a website and growing my business online. Could we discuss the right plan for me?");
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919755061139';
  };

  return (
    <>
      {/* Scroll Progress Bar at very top of screen */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent pointer-events-none">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            background: `linear-gradient(90deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`
          }}
        />
      </div>

      {/* Floating WhatsApp Action Pill (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <button
          onClick={handleWhatsAppClick}
          aria-label="Chat on WhatsApp with GWL Weblab"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] transition-all transform hover:-translate-y-1 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-black" />
          <span className="hidden sm:inline font-semibold">{t.floatingBar.chatWhatsApp}</span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#090e1c]/95 backdrop-blur-xl border-t border-white/10 p-3 flex items-center gap-2 shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 fill-[#25D366]" />
            <span>{t.floatingBar.whatsappShort}</span>
          </button>

          <button
            onClick={handleCallClick}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Phone className="w-4 h-4" />
            <span>{t.floatingBar.callUs}</span>
          </button>

          <button
            onClick={onStartConsultation}
            className="flex-[1.4] py-2.5 px-4 rounded-xl theme-btn-primary font-extrabold text-xs flex items-center justify-center cursor-pointer"
          >
            <span>{t.floatingBar.getStarted}</span>
          </button>
        </div>
      )}
    </>
  );
};
