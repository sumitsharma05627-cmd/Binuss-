import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Language, SUPPORTED_LANGUAGES } from '../i18n/translations';

export interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'pill' | 'toggle';
  className?: string;
  showText?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  className = '',
  showText = true
}) => {
  const { language, setLanguage, currentLanguage } = useLanguage();
  const { theme, themes } = useTheme();
  const isLight = theme === 'clean-light' || !themes.find((t) => t.id === theme)?.isDark;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // Pill variant (simple segmented pill)
  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center gap-1 p-1 rounded-full backdrop-blur-md border ${
          isLight
            ? 'bg-slate-200/90 border-slate-300'
            : 'bg-white/[0.04] border-white/10'
        } ${className}`}
        role="group"
        aria-label="Language selector"
      >
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = lang.code === language;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? isLight
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-emerald-400 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              aria-pressed={isSelected}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Toggle variant: direct toggle button
  if (variant === 'toggle') {
    return (
      <button
        onClick={() => {
          const nextIndex =
            (SUPPORTED_LANGUAGES.findIndex((l) => l.code === language) + 1) %
            SUPPORTED_LANGUAGES.length;
          setLanguage(SUPPORTED_LANGUAGES[nextIndex].code);
        }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
          isLight
            ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
            : 'bg-white/[0.05] hover:bg-white/10 border-white/10 text-neutral-300 hover:text-white'
        } ${className}`}
        aria-label={`Current language: ${currentLanguage.name}. Click to switch.`}
      >
        <Globe
          className={`w-3.5 h-3.5 ${
            isLight ? 'text-emerald-700' : 'text-emerald-400'
          }`}
        />
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.nativeName}</span>
      </button>
    );
  }

  // Dropdown variant (default)
  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        id="language-menu-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 select-none ${
          isLight
            ? isOpen
              ? 'bg-slate-200 border-slate-400 text-slate-950 ring-2 ring-emerald-500/20'
              : 'bg-slate-100 hover:bg-slate-200/90 border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-950 shadow-xs'
            : isOpen
            ? 'bg-white/15 border-white/30 text-white'
            : 'bg-white/[0.05] hover:bg-white/10 border-white/10 hover:border-emerald-500/40 text-neutral-300 hover:text-white'
        }`}
        aria-label={`Language selector. Current: ${currentLanguage.name}`}
      >
        <Globe
          className={`w-3.5 h-3.5 shrink-0 ${
            isLight ? 'text-emerald-700' : 'text-emerald-400'
          }`}
        />
        <span className="text-xs">{currentLanguage.flag}</span>
        {showText && (
          <span
            className={`font-semibold tracking-wide ${
              isLight ? 'text-slate-900' : 'text-neutral-200'
            }`}
          >
            {currentLanguage.nativeName}
          </span>
        )}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isLight ? 'text-slate-600' : 'text-neutral-400'
          } ${isOpen ? 'rotate-180 text-emerald-600' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            aria-labelledby="language-menu-button"
            className={`absolute right-0 mt-2 w-48 rounded-2xl border p-1.5 z-50 overflow-hidden shadow-2xl backdrop-blur-xl ${
              isLight
                ? 'bg-white border-2 border-slate-200 text-slate-900 shadow-[0_20px_40px_rgba(0,0,0,0.15)]'
                : 'bg-[#090e1c] border-white/10 text-white shadow-[0_20px_40px_rgba(0,0,0,0.7)]'
            }`}
          >
            <div
              className={`px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-widest border-b mb-1 ${
                isLight
                  ? 'border-slate-200 text-slate-500'
                  : 'border-white/5 text-neutral-400'
              }`}
            >
              Select Language / भाषा
            </div>

            <div className="space-y-1">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer text-left ${
                      isSelected
                        ? isLight
                          ? 'bg-emerald-50 text-slate-950 font-bold border border-emerald-500/40 shadow-xs'
                          : 'bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-500/30'
                        : isLight
                        ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-transparent'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <div>
                        <div
                          className={`font-medium ${
                            isLight ? 'text-slate-950' : 'text-white'
                          }`}
                        >
                          {lang.nativeName}
                        </div>
                        <div
                          className={`text-[10px] ${
                            isLight ? 'text-slate-500' : 'text-neutral-400'
                          }`}
                        >
                          {lang.name}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 shrink-0 ${
                          isLight ? 'text-emerald-700' : 'text-emerald-400'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
