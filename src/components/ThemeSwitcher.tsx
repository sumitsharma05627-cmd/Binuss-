import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sun, Moon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ThemeId, ThemeConfig } from '../types';

export interface ThemeSwitcherProps {
  /**
   * Mode of display:
   * - 'segmented': An inline horizontal segmented pill control
   * - 'dropdown': A sleek dropdown button with popover list
   * - 'auto': Responsive (segmented on desktop lg+, dropdown on mobile/tablet)
   * - 'icon': Compact icon-only button that opens dropdown
   */
  variant?: 'segmented' | 'dropdown' | 'auto' | 'icon';
  className?: string;
  showLabels?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'dropdown',
  className = '',
  showLabels = true
}) => {
  const { theme, themeConfig, setTheme, cycleTheme, themes } = useTheme();
  const isLight = theme === 'clean-light' || !themeConfig.isDark;
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

  // Smooth switch helper ensuring document.documentElement attribute and classes are updated
  const handleSelectTheme = (newThemeId: ThemeId) => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', newThemeId);
    const target = themes.find((t) => t.id === newThemeId);
    if (target && !target.isDark) {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    }
    setTheme(newThemeId);
    setIsOpen(false);
  };

  const handleCycleTheme = () => {
    const currentIndex = themes.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextThemeId = themes[nextIndex].id;
    handleSelectTheme(nextThemeId);
  };

  // 1. Segmented Control UI
  const renderSegmented = () => (
    <div
      id="theme-switcher-segmented"
      role="radiogroup"
      aria-label="Select website theme"
      className={`relative inline-flex items-center p-1 rounded-full backdrop-blur-xl border shadow-md transition-colors duration-200 ${
        isLight
          ? 'bg-slate-200/90 border-slate-300'
          : 'bg-black/50 border-white/15'
      } ${className}`}
    >
      {themes.map((t: ThemeConfig) => {
        const isSelected = t.id === theme;
        return (
          <button
            key={t.id}
            id={`theme-switcher-tab-${t.id}`}
            role="radio"
            aria-checked={isSelected}
            onClick={() => handleSelectTheme(t.id)}
            className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              isSelected
                ? isLight
                  ? 'text-slate-950 font-bold'
                  : 'text-white font-bold'
                : isLight
                ? 'text-slate-600 hover:text-slate-950'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title={`${t.name} - ${t.subtitle}`}
          >
            {/* Animated Sliding Highlight Pill */}
            {isSelected && (
              <motion.div
                layoutId="theme-active-pill"
                className={`absolute inset-0 rounded-full border shadow-sm -z-10 ${
                  isLight
                    ? 'bg-white border-slate-300'
                    : 'bg-white/15 border-white/20'
                }`}
                style={{
                  boxShadow: `0 0 14px ${t.primaryColor}35`
                }}
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}

            {/* Glowing Color Swatch Dot */}
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-200 border border-black/10"
              style={{
                backgroundColor: t.primaryColor,
                boxShadow: isSelected ? `0 0 8px ${t.primaryColor}` : 'none'
              }}
            />

            {showLabels && (
              <span className="truncate whitespace-nowrap hidden sm:inline-block">
                {t.name}
              </span>
            )}

            {!t.isDark ? (
              <Sun className="w-3 h-3 text-amber-500 shrink-0" />
            ) : null}
          </button>
        );
      })}
    </div>
  );

  // 2. Dropdown UI
  const renderDropdown = () => (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        id="theme-switcher-dropdown-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Current theme: ${themeConfig.name}. Open theme menu.`}
        title={`Change Theme (Currently ${themeConfig.name})`}
        className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 select-none ${
          isLight
            ? isOpen
              ? 'bg-slate-200 border-slate-400 text-slate-950 shadow-sm ring-2 ring-emerald-500/25'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-300 hover:border-slate-400 text-slate-900 shadow-xs'
            : isOpen
            ? 'bg-white/15 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]'
            : 'bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/25 text-neutral-200 hover:text-white'
        }`}
      >
        {/* Animated Color Swatch */}
        <span
          className="w-3.5 h-3.5 rounded-full transition-transform duration-300 group-hover:scale-125 shrink-0 border border-black/15 shadow-xs"
          style={{
            backgroundColor: themeConfig.primaryColor,
            boxShadow: `0 0 8px ${themeConfig.primaryColor}`
          }}
        />

        <Palette
          className={`w-3.5 h-3.5 transition-colors ${
            isLight
              ? 'text-emerald-700 group-hover:text-emerald-800'
              : 'text-emerald-400 group-hover:text-white'
          }`}
        />

        {showLabels && (
          <span className="text-xs font-semibold tracking-wide hidden sm:inline-flex items-center gap-1.5">
            <span
              className={`font-bold transition-colors ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              Theme
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold hidden lg:inline-block transition-colors ${
                isLight
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-white/10 text-emerald-300 border border-white/10'
              }`}
            >
              {themeConfig.name.split(' ')[0]}
            </span>
          </span>
        )}

        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isLight ? 'text-slate-700' : 'text-neutral-300'
          } ${isOpen ? 'rotate-180 text-emerald-600' : ''}`}
        />
      </button>

      {/* Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl backdrop-blur-2xl p-3 z-50 overflow-hidden shadow-2xl transition-colors ${
              isLight
                ? 'bg-white border-2 border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
                : 'bg-[#0a0e17]/98 border border-white/15 text-white shadow-[0_20px_60px_rgba(0,0,0,0.7)]'
            }`}
          >
            {/* Header with Quick Cycle */}
            <div
              className={`flex items-center justify-between px-2 py-1.5 border-b mb-2 ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <div
                className={`flex items-center gap-1.5 text-xs font-bold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                <Palette
                  className={`w-3.5 h-3.5 ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}
                />
                <span>Theme Palette</span>
              </div>
              <button
                type="button"
                onClick={handleCycleTheme}
                className={`text-[11px] font-mono font-bold hover:underline cursor-pointer ${
                  isLight
                    ? 'text-emerald-700 hover:text-emerald-800'
                    : 'text-emerald-400 hover:text-emerald-300'
                }`}
                title="Cycle through themes sequentially"
              >
                Next Theme ↻
              </button>
            </div>

            {/* Themes List */}
            <div className="space-y-1.5" role="menu" aria-orientation="vertical">
              {themes.map((t: ThemeConfig) => {
                const isSelected = t.id === theme;
                return (
                  <button
                    key={t.id}
                    id={`theme-option-${t.id}`}
                    role="menuitem"
                    onClick={() => handleSelectTheme(t.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? isLight
                          ? 'bg-emerald-50 border-2 border-emerald-500/50 text-slate-950 font-bold shadow-xs'
                          : 'bg-emerald-500/20 border border-emerald-500/40 text-white font-bold shadow-sm'
                        : isLight
                        ? 'bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-800 hover:text-slate-950'
                        : 'bg-transparent hover:bg-white/5 border border-transparent text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Split Color Circle Swatch */}
                      <div
                        className={`relative flex items-center justify-center w-6 h-6 rounded-full shrink-0 overflow-hidden shadow-inner border ${
                          isLight ? 'border-slate-300' : 'border-white/20'
                        }`}
                      >
                        <div
                          className="absolute inset-0 w-1/2 h-full"
                          style={{ backgroundColor: t.primaryColor }}
                        />
                        <div
                          className="absolute inset-0 left-1/2 w-1/2 h-full"
                          style={{ backgroundColor: t.accentColor }}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-sm font-semibold ${
                              isLight ? 'text-slate-950' : 'text-white'
                            }`}
                          >
                            {t.name}
                          </span>
                          {t.isDark ? (
                            <Moon
                              className={`w-3 h-3 ${
                                isLight ? 'text-slate-500' : 'text-neutral-400'
                              }`}
                            />
                          ) : (
                            <Sun className="w-3 h-3 text-amber-500" />
                          )}
                        </div>
                        <div
                          className={`text-[11px] leading-tight ${
                            isLight ? 'text-slate-600' : 'text-neutral-400'
                          }`}
                        >
                          {t.subtitle}
                        </div>
                        <div
                          className={`text-[10px] font-mono mt-0.5 ${
                            isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-400/90'
                          }`}
                        >
                          {t.personality}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 ${
                          isLight ? 'bg-emerald-600' : 'bg-emerald-500'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div
              className={`mt-2.5 pt-2 border-t px-2 text-[10px] text-center font-mono ${
                isLight
                  ? 'border-slate-200 text-slate-500'
                  : 'border-white/10 text-neutral-400'
              }`}
            >
              Visual Palette &amp; Brand Atmosphere
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // 3. Compact Icon Variant (for mobile header)
  if (variant === 'icon') {
    return (
      <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
        <button
          id="mobile-nav-theme-btn"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change Theme"
          title={`Theme: ${themeConfig.name}. Click to change.`}
          className={`relative p-2 rounded-full border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
            isLight
              ? isOpen
                ? 'bg-slate-200 border-slate-400 text-slate-950 ring-2 ring-emerald-500/25'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              : isOpen
              ? 'bg-white/20 border-white/40 text-white'
              : 'bg-white/5 hover:bg-white/10 border-white/15 text-neutral-200'
          }`}
        >
          <Palette
            className={`w-4 h-4 ${
              isLight ? 'text-emerald-700' : 'text-emerald-400'
            }`}
          />
          <span
            className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-black/20 shadow-xs"
            style={{ backgroundColor: themeConfig.primaryColor }}
          />
        </button>

        {/* Dropdown Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className={`absolute right-0 mt-2 w-72 rounded-2xl backdrop-blur-2xl p-3 z-50 shadow-2xl ${
                isLight
                  ? 'bg-white border-2 border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
                  : 'bg-[#0a0e17]/98 border border-white/15 text-white shadow-[0_20px_60px_rgba(0,0,0,0.7)]'
              }`}
            >
              <div
                className={`flex items-center justify-between px-2 py-1.5 border-b mb-2 ${
                  isLight ? 'border-slate-200' : 'border-white/10'
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 text-xs font-bold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  <Palette
                    className={`w-3.5 h-3.5 ${
                      isLight ? 'text-emerald-700' : 'text-emerald-400'
                    }`}
                  />
                  <span>Choose Theme</span>
                </div>
                <button
                  type="button"
                  onClick={handleCycleTheme}
                  className={`text-[10px] font-mono font-bold hover:underline cursor-pointer ${
                    isLight
                      ? 'text-emerald-700 hover:text-emerald-800'
                      : 'text-emerald-400 hover:text-emerald-300'
                  }`}
                >
                  Next ↻
                </button>
              </div>

              <div className="space-y-1.5">
                {themes.map((t) => {
                  const isSelected = t.id === theme;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTheme(t.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected
                          ? isLight
                            ? 'bg-emerald-50 border-2 border-emerald-500/50 text-slate-950 font-bold'
                            : 'bg-emerald-500/20 border border-emerald-500/40 text-white font-bold'
                          : isLight
                          ? 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800'
                          : 'text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/15 shadow-xs"
                          style={{ backgroundColor: t.primaryColor }}
                        />
                        <span className="text-xs font-semibold">{t.name}</span>
                      </div>
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 stroke-[3] ${
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
  }

  if (variant === 'segmented') {
    return renderSegmented();
  }

  if (variant === 'auto') {
    return (
      <div className={className}>
        <div className="hidden xl:block">{renderSegmented()}</div>
        <div className="xl:hidden">{renderDropdown()}</div>
      </div>
    );
  }

  return renderDropdown();
};
