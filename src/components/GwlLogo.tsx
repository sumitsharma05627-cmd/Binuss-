import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const GWL_LOGO_IMAGE_PATH = '/assets/gwl-crest.webp';

interface GwlLogoProps {
  variant?: 'icon' | 'full' | 'stacked' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const GwlLogo: React.FC<GwlLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showSubtitle = true
}) => {
  const { themeConfig } = useTheme();
  const isLight = themeConfig?.id === 'clean-light' || !themeConfig?.isDark;
  const [imageError, setImageError] = useState(false);

  // Scaled dimensions tailored for the crest logo
  const sizeConfig = {
    sm: {
      container: 'w-7 h-7 sm:w-8 sm:h-8',
      textMain: 'text-base sm:text-lg',
      tagText: 'text-[9px]',
      subText: 'text-[9px]'
    },
    md: {
      container: 'w-9 h-9 sm:w-10 sm:h-10',
      textMain: 'text-lg sm:text-xl',
      tagText: 'text-[10px]',
      subText: 'text-[9px] sm:text-[10px]'
    },
    lg: {
      container: 'w-12 h-12 sm:w-14 sm:h-14',
      textMain: 'text-xl sm:text-2xl',
      tagText: 'text-xs',
      subText: 'text-xs'
    },
    xl: {
      container: 'w-16 h-16 sm:w-20 sm:h-20',
      textMain: 'text-2xl sm:text-3xl',
      tagText: 'text-sm',
      subText: 'text-sm'
    }
  }[size];

  // The Crest Emblem with royal sapphire & gold specular aura
  const Emblem = (
    <div
      className={`relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden group select-none ${sizeConfig.container}`}
    >
      {/* Royal sapphire & gold ambient glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600/30 via-amber-400/20 to-sky-400/30 blur-sm opacity-60 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

      {/* Crest Logo Image */}
      {!imageError ? (
        <img
          src={GWL_LOGO_IMAGE_PATH}
          alt="GWL (Gwalior Web Labs) Logo"
          onError={() => setImageError(true)}
          className="relative z-10 w-full h-full object-cover object-center rounded-xl shadow-md border border-amber-400/40 group-hover:border-amber-300/80 transition-all duration-300 transform group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
      ) : (
        // Elegant SVG fallback in case network blocked the PNG
        <div className="relative z-10 w-full h-full bg-[#0a1226] border border-amber-400/50 rounded-xl flex items-center justify-center text-amber-300 font-bold font-serif text-xs">
          GWL
        </div>
      )}

      {/* Specular Edge Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} title="GWL WebLab (Gwalior Web Labs)">
        {Emblem}
      </div>
    );
  }

  // Full showcase badge with framed crest
  if (variant === 'badge') {
    return (
      <div className={`flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-[#0a1226]/80 to-[#060a14]/90 border border-amber-400/30 shadow-2xl backdrop-blur-xl text-center ${className}`}>
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-xl border-2 border-amber-400/60 mb-2.5 relative group">
          <img
            src={GWL_LOGO_IMAGE_PATH}
            alt="GWL Crest"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-wider uppercase">
          GWALIOR WEB LABS
        </span>
        <span className="text-[10px] font-mono text-amber-300/90 tracking-widest uppercase mt-0.5">
          Digital Innovation • Global Solutions
        </span>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        {Emblem}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display ${sizeConfig.textMain} font-black tracking-widest ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              GWL
            </span>
            <span className={`px-1.5 py-0.5 rounded ${sizeConfig.tagText} font-mono font-bold tracking-widest uppercase bg-amber-400/15 border border-amber-400/30 text-amber-500 [data-theme='clean-light']:text-amber-700`}>
              WEB LABS
            </span>
          </div>
          {showSubtitle && (
            <span
              className={`font-mono tracking-wider mt-0.5 ${sizeConfig.subText} ${
                isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              Digital Innovation • Global Solutions
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default 'full' horizontal variant
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {Emblem}
      <div className="flex flex-col justify-center text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-display ${sizeConfig.textMain} font-black tracking-wider uppercase ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            GWL
          </span>
          <span
            className={`font-bold tracking-wider uppercase font-mono px-1.5 py-0.5 rounded bg-amber-400/15 border border-amber-400/30 text-amber-500 [data-theme='clean-light']:text-amber-700 ${sizeConfig.tagText}`}
          >
            WEB LABS
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-mono tracking-wider uppercase leading-tight mt-1 flex items-center gap-1 ${sizeConfig.subText} ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            <span className={isLight ? 'text-slate-900 font-semibold' : 'text-white/90'}>
              Gwalior Web Labs
            </span>
            <span className="text-amber-400/70">•</span>
            <span className="text-sky-400 [data-theme='clean-light']:text-sky-700 font-medium">
              Global Solutions
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
