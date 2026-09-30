import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ThemeId } from '../types';

export interface ThemeToggleProps {
  id?: string;
  variant?: 'pill' | 'icon' | 'switch';
  className?: string;
  showText?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  id = 'global-theme-toggle-btn',
  variant = 'pill',
  className = '',
  showText = true
}) => {
  const { themeConfig, setTheme, themes } = useTheme();
  const isLightMode = !themeConfig.isDark;

  const handleToggle = () => {
    // Toggle between primary dark theme (cyber-emerald) and primary light theme (clean-light)
    const nextTheme: ThemeId = isLightMode ? 'cyber-emerald' : 'clean-light';
    const target = themes.find((t) => t.id === nextTheme);

    // 1. Immediately update the 'data-theme' attribute on the <html> root tag
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', nextTheme);

    // 2. Synchronize color-scheme helper classes
    if (target && !target.isDark) {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    }

    // 3. Update the global ThemeContext and localStorage
    setTheme(nextTheme);
  };

  // Compact Icon-only button (ideal for mobile nav and dense headers)
  if (variant === 'icon') {
    return (
      <button
        id={id}
        type="button"
        onClick={handleToggle}
        aria-label={`Current mode: ${isLightMode ? 'Light' : 'Dark'}. Click to switch theme mode.`}
        title={isLightMode ? 'Switch to Dark mode' : 'Switch to Light mode'}
        className={`relative p-2 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 group overflow-hidden ${
          isLightMode
            ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-700 shadow-sm'
            : 'bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
        } ${className}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLightMode ? (
            <motion.div
              key="sun-icon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            </motion.div>
          ) : (
            <motion.div
              key="moon-icon"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    );
  }

  // Full Interactive Pill Toggle for Desktop Navbar
  return (
    <button
      id={id}
      type="button"
      onClick={handleToggle}
      role="switch"
      aria-checked={isLightMode}
      aria-label={`Switch theme between Dark and Light mode (Currently ${
        isLightMode ? 'Light' : 'Dark'
      })`}
      title={
        isLightMode
          ? 'Currently in Light mode. Click to switch to Dark mode.'
          : 'Currently in Dark mode. Click to switch to Light mode.'
      }
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        isLightMode
          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm'
          : 'bg-[#0a121e]/80 hover:bg-[#0f1b2c] border-emerald-500/30 hover:border-emerald-500/50 text-neutral-200 shadow-[0_0_15px_rgba(16,185,129,0.12)]'
      } ${className}`}
    >
      {/* Sliding indicator track / thumb */}
      <div
        className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
          isLightMode
            ? 'bg-amber-100 text-amber-600 shadow-inner'
            : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLightMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -60, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 60, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Sun className="w-3.5 h-3.5 fill-amber-500/30 text-amber-600" />
            </motion.div>
          ) : (
            <motion.div
              key="sparkles"
              initial={{ rotate: 60, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -60, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode Label */}
      {showText && (
        <div className="flex items-center gap-1.5 pr-1">
          <span
            className={`text-xs font-semibold tracking-wide transition-colors ${
              isLightMode
                ? 'text-slate-800'
                : 'text-neutral-200 group-hover:text-white'
            }`}
          >
            {isLightMode ? 'Light' : 'Dark'}
          </span>

          {/* Glowing Status Dot */}
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isLightMode
                ? 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]'
                : 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
            }`}
          />
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;
export { ThemeSwitcher } from './ThemeSwitcher';
