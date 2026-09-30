import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sun, Moon, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ThemeId, ThemeConfig } from '../types';

export const FloatingThemeButton: React.FC = () => {
  const { theme, themeConfig, setTheme, cycleTheme, themes } = useTheme();
  const isLight = theme === 'clean-light' || !themeConfig.isDark;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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

  return (
    <div
      ref={containerRef}
      id="floating-theme-button-container"
      className="fixed bottom-20 sm:bottom-20 right-6 z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Floating Theme Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`mb-3 w-72 sm:w-80 rounded-3xl p-4 overflow-hidden backdrop-blur-2xl shadow-2xl transition-colors ${
              isLight
                ? 'bg-white border-2 border-slate-200 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.2)]'
                : 'bg-[#0a0f1d]/98 border border-white/15 text-white shadow-[0_20px_60px_rgba(0,0,0,0.7)]'
            }`}
          >
            {/* Popover Header */}
            <div
              className={`flex items-center justify-between pb-3 border-b mb-3 ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`
                  }}
                >
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold leading-tight ${
                      isLight ? 'text-slate-950 font-black' : 'text-white'
                    }`}
                  >
                    Select Theme
                  </h4>
                  <p
                    className={`text-[10px] font-mono ${
                      isLight ? 'text-slate-500' : 'text-neutral-400'
                    }`}
                  >
                    5 Distinct Visual Atmospheres
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCycleTheme}
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold transition-colors cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-emerald-700'
                      : 'bg-white/10 hover:bg-white/20 text-emerald-400'
                  }`}
                  title="Next theme in cycle"
                >
                  Next ↻
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={`p-1 rounded-full transition-colors cursor-pointer ${
                    isLight
                      ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Close theme menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List of 5 Themes */}
            <div className="space-y-2">
              {themes.map((t: ThemeConfig) => {
                const isSelected = t.id === theme;
                return (
                  <button
                    key={t.id}
                    id={`floating-theme-option-${t.id}`}
                    type="button"
                    onClick={() => handleSelectTheme(t.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? isLight
                          ? 'bg-emerald-50 border-2 border-emerald-500/60 text-slate-950 font-bold shadow-xs'
                          : 'bg-white/10 border-2 border-emerald-400 text-white font-bold shadow-md'
                        : isLight
                        ? 'bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-800'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Split Color Swatch Pill */}
                      <div
                        className={`relative flex items-center justify-center w-7 h-7 rounded-xl shrink-0 overflow-hidden shadow-xs border ${
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

                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs font-bold ${
                              isLight ? 'text-slate-950' : 'text-white'
                            }`}
                          >
                            {t.name}
                          </span>
                          {!t.isDark ? (
                            <Sun className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <Moon
                              className={`w-3 h-3 ${
                                isLight ? 'text-slate-500' : 'text-neutral-400'
                              }`}
                            />
                          )}
                        </div>
                        <p
                          className={`text-[10px] line-clamp-1 leading-tight ${
                            isLight ? 'text-slate-500' : 'text-neutral-400'
                          }`}
                        >
                          {t.personality}
                        </p>
                      </div>
                    </div>

                    {isSelected ? (
                      <div
                        className="p-1 rounded-full text-white shadow-xs shrink-0"
                        style={{ backgroundColor: t.primaryColor }}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <ChevronRight
                        className={`w-3.5 h-3.5 ${
                          isLight ? 'text-slate-400' : 'text-neutral-500'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Note */}
            <div
              className={`mt-3 pt-2 border-t text-center ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <span
                className={`text-[10px] font-mono ${
                  isLight ? 'text-slate-600' : 'text-neutral-400'
                }`}
              >
                Currently Active:{' '}
                <strong className={isLight ? 'text-slate-950' : 'text-white'}>
                  {themeConfig.name}
                </strong>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        id="floating-theme-toggle-btn"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`Open Theme Selector. Currently ${themeConfig.name}.`}
        title={`Change Theme (Currently ${themeConfig.name})`}
        className={`group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full border-2 transition-all cursor-pointer backdrop-blur-xl hover:scale-105 select-none ${
          isLight
            ? 'bg-slate-900 hover:bg-slate-950 border-slate-700 hover:border-emerald-400 text-white shadow-[0_10px_30px_rgba(15,23,42,0.25)] ring-1 ring-white/10'
            : 'bg-[#0a0f1d]/95 hover:bg-[#0f172a] border-white/20 hover:border-emerald-400 text-white shadow-[0_8px_25px_rgba(0,0,0,0.5)]'
        }`}
        style={{
          boxShadow: isLight
            ? `0 10px 30px rgba(15,23,42,0.25), 0 0 16px ${themeConfig.primaryColor}35`
            : `0 8px 25px ${themeConfig.primaryColor}35`
        }}
      >
        {/* Glowing Theme Color Indicator Dot */}
        <span
          className="theme-btn-dot w-3.5 h-3.5 rounded-full shrink-0 shadow-sm animate-pulse border border-white/30"
          style={{
            backgroundColor: themeConfig.primaryColor,
            boxShadow: `0 0 10px ${themeConfig.primaryColor}`
          }}
        />

        <Palette
          className={`w-4 h-4 group-hover:rotate-12 transition-all duration-200 ${
            isLight
              ? 'text-emerald-400 group-hover:text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'
              : 'text-white'
          }`}
        />

        <span className="theme-btn-label text-xs font-extrabold tracking-wide text-white">
          Theme
        </span>

        {/* Small Active Badge */}
        <span
          className={`theme-btn-badge text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold hidden md:inline-block uppercase ${
            isLight
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'border border-white/10'
          }`}
          style={
            !isLight
              ? {
                  backgroundColor: `${themeConfig.primaryColor}30`,
                  color: themeConfig.primaryColor
                }
              : undefined
          }
        >
          {themeConfig.name.split(' ')[0]}
        </span>
      </button>
    </div>
  );
};
