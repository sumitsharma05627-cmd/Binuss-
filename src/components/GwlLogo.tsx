import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface GwlLogoProps {
  variant?: 'icon' | 'full' | 'stacked';
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
  const primaryColor = themeConfig?.primaryColor || '#10b981';
  const accentColor = themeConfig?.accentColor || '#2dd4bf';

  // Dimension scaling for the emblem mark
  const emblemSizes = {
    sm: { width: 28, height: 28, viewBox: '0 0 48 48' },
    md: { width: 36, height: 36, viewBox: '0 0 48 48' },
    lg: { width: 44, height: 44, viewBox: '0 0 48 48' },
    xl: { width: 60, height: 60, viewBox: '0 0 48 48' }
  };

  const currentSize = emblemSizes[size];

  const Emblem = (
    <div className="relative flex items-center justify-center shrink-0 group">
      {/* Ambient Pulsating Glow */}
      <div
        className="absolute inset-0 rounded-xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle, ${primaryColor} 0%, ${accentColor} 100%)` }}
      />

      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="gwlGradientPrimary" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>

          <linearGradient id="gwlGradientShield" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="gwlBorderGlow" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Outer Shield / Hexagonal Precision Lab Frame */}
        <polygon
          points="24,3 43,12 43,36 24,45 5,36 5,12"
          fill="url(#gwlGradientShield)"
          stroke="url(#gwlBorderGlow)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          className="drop-shadow-md"
        />

        {/* Global Meridian / Orbital Ring */}
        <ellipse
          cx="24"
          cy="24"
          rx="17"
          ry="7"
          transform="rotate(-20 24 24)"
          stroke="url(#gwlGradientPrimary)"
          strokeWidth="1.2"
          strokeDasharray="3 2"
          opacity="0.75"
        />

        {/* Interconnected WebLab Monogram Path (G - W - L) */}
        {/* 'G' outer crescent flow */}
        <path
          d="M20,13 C14,14 10,18 10,24 C10,30 14,34 20,35 C23,35 25,33.5 26,31"
          stroke="url(#gwlGradientPrimary)"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 'W' central lab circuit waveform */}
        <path
          d="M17,20 L21,30 L24,22 L27,30 L31,20"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'L' forward velocity shelf */}
        <path
          d="M33,16 L33,32 L39,32"
          stroke="url(#gwlGradientPrimary)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Telemetry Node Points (representing Gwalior hub + Global network) */}
        <circle cx="24" cy="22" r="2" fill={accentColor} />
        <circle cx="21" cy="30" r="1.5" fill="#ffffff" />
        <circle cx="27" cy="30" r="1.5" fill="#ffffff" />
        <circle cx="39" cy="32" r="2" fill={primaryColor} />
        <circle cx="10" cy="24" r="1.5" fill={primaryColor} />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return Emblem;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        {Emblem}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display text-2xl font-black tracking-widest ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              GWL
            </span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase"
              style={{
                backgroundColor: `${primaryColor}20`,
                color: primaryColor,
                border: `1px solid ${primaryColor}40`
              }}
            >
              WEBLAB
            </span>
          </div>
          {showSubtitle && (
            <span
              className={`text-[10px] font-mono tracking-wider mt-0.5 ${
                isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              Gwalior WebLab • Global WebLab
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default 'full' horizontal variant
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Emblem}
      <div className="flex flex-col justify-center text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-display text-lg sm:text-xl font-black tracking-wider uppercase ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            GWL
          </span>
          <span
            className="text-xs sm:text-sm font-semibold tracking-widest uppercase font-mono"
            style={{ color: primaryColor }}
          >
            WEBLAB
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`text-[9px] sm:text-[10px] font-mono tracking-wider uppercase leading-tight mt-1 flex items-center gap-1 ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            <span className={isLight ? 'text-slate-900 font-semibold' : 'text-white/80'}>
              Gwalior WebLab
            </span>
            <span className={isLight ? 'text-slate-400' : 'text-neutral-500'}>•</span>
            <span style={{ color: accentColor }}>Global WebLab</span>
          </span>
        )}
      </div>
    </div>
  );
};
