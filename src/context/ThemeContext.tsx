import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig, ThemeId } from '../types';

export const THEMES: ThemeConfig[] = [
  {
    id: 'cyber-emerald',
    name: 'Cyber Emerald',
    subtitle: 'Futuristic Emerald & Obsidian (Default)',
    isDark: true,
    primaryColor: '#10b981',
    accentColor: '#2dd4bf',
    bgHex: '#05070c',
    motto: 'Engineering-First Digital Systems & Sub-Second Web Architecture',
    personality: 'Precision Performance & Algorithmic Growth',
    accentTag: 'PRECISION RUNTIME'
  },
  {
    id: 'neon-violet',
    name: 'Neon Violet',
    subtitle: 'Cyberpunk Electric Purple & Magenta',
    isDark: true,
    primaryColor: '#a855f7',
    accentColor: '#ec4899',
    bgHex: '#070514',
    motto: 'Next-Gen Interactive Experiences & High-Conversion Digital Edge',
    personality: 'Bold Electric Innovation & Disruption',
    accentTag: 'CREATIVE LABS'
  },
  {
    id: 'quantum-cyan',
    name: 'Quantum Cyan',
    subtitle: 'Deep Space Azure & Cobalt',
    isDark: true,
    primaryColor: '#06b6d4',
    accentColor: '#3b82f6',
    bgHex: '#030a16',
    motto: 'Enterprise Cloud Scalability & High-Velocity Data Infrastructure',
    personality: 'Data-Driven Scaling & Global Architecture',
    accentTag: 'QUANTUM SCALE'
  },
  {
    id: 'solar-amber',
    name: 'Solar Amber',
    subtitle: 'Radiant Gold & Warm Amber',
    isDark: true,
    primaryColor: '#f59e0b',
    accentColor: '#fb923c',
    bgHex: '#0c0906',
    motto: 'High-Impact Commercial ROI & Premium Institutional Authority',
    personality: 'Prestige Authority & Revenue Acceleration',
    accentTag: 'GOLD STANDARD'
  },
  {
    id: 'crimson-ember',
    name: 'Crimson Ember',
    subtitle: 'Aggressive Ruby & Vivid Coral Flare',
    isDark: true,
    primaryColor: '#f43f5e',
    accentColor: '#fb7185',
    bgHex: '#0a0507',
    motto: 'High-Octane Growth, Aggressive Market Acquisition & Brand Dominance',
    personality: 'Maximum Velocity & Category Leadership',
    accentTag: 'HIGH VELOCITY'
  },
  {
    id: 'stealth-mono',
    name: 'Stealth Mono',
    subtitle: 'Executive Platinum & Titanium Minimal',
    isDark: true,
    primaryColor: '#e2e8f0',
    accentColor: '#94a3b8',
    bgHex: '#09090b',
    motto: 'Subtlety as Strength — Pure Technical Execution & Institutional Weight',
    personality: 'Minimalist Executive Power & Industrial Precision',
    accentTag: 'TITANIUM MONO'
  },
  {
    id: 'clean-light',
    name: 'Clean Light',
    subtitle: 'Modernist Architectural Light Mode',
    isDark: false,
    primaryColor: '#059669',
    accentColor: '#0284c7',
    bgHex: '#f8fafc',
    motto: 'Architectural Minimalist Clarity & Distraction-Free Usability',
    personality: 'Editorial Elegance & Human-Centric Design',
    accentTag: 'STUDIO EDITORIAL'
  },
  {
    id: 'nordic-frost',
    name: 'Nordic Frost',
    subtitle: 'Crisp Glacier Azure & Arctic Light',
    isDark: false,
    primaryColor: '#0284c7',
    accentColor: '#0d9488',
    bgHex: '#f0f4f8',
    motto: 'Nordic Engineering Precision, Sub-Second Purity & Alpine Clarity',
    personality: 'Alpine Clarity & Distraction-Free Structure',
    accentTag: 'NORDIC PURITY'
  }
];

interface ThemeContextType {
  theme: ThemeId;
  themeConfig: ThemeConfig;
  setTheme: (id: ThemeId) => void;
  cycleTheme: () => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'gwl_selected_theme';
const FALLBACK_STORAGE_KEY = 'kbsr_selected_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_KEY) || localStorage.getItem(FALLBACK_STORAGE_KEY)) as ThemeId | null;
      if (saved && THEMES.some(t => t.id === saved)) {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'cyber-emerald';
  });

  const activeConfig = THEMES.find(t => t.id === theme) || THEMES[0];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore in private storage
    }

    // Apply data-theme and color-scheme to document root
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (activeConfig.isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Update dynamic meta theme-color for browser chrome
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', activeConfig.bgHex);
  }, [theme, activeConfig]);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
  };

  const cycleTheme = () => {
    setThemeState(current => {
      const currentIndex = THEMES.findIndex(t => t.id === current);
      const nextIndex = (currentIndex + 1) % THEMES.length;
      return THEMES[nextIndex].id;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeConfig: activeConfig,
        setTheme,
        cycleTheme,
        themes: THEMES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
