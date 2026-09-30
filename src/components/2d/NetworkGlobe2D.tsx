import React, { useState } from 'react';
import { Globe2, Activity, Wifi, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface NetworkGlobe2DProps {
  isVisible?: boolean;
}

interface HubNode {
  id: string;
  city: string;
  region: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  ping: string;
  status: string;
}

const HUBS: HubNode[] = [
  { id: '1', city: 'Ahmedabad', region: 'India (HQ)', x: 67, y: 48, ping: '12ms', status: 'Active Core' },
  { id: '2', city: 'Mumbai', region: 'India', x: 66, y: 54, ping: '14ms', status: 'High Traffic' },
  { id: '3', city: 'Madrid', region: 'Spain (EU)', x: 47, y: 38, ping: '18ms', status: 'Active Hub' },
  { id: '4', city: 'London', region: 'United Kingdom', x: 48, y: 28, ping: '20ms', status: 'Active Hub' },
  { id: '5', city: 'New York', region: 'United States', x: 28, y: 36, ping: '24ms', status: 'Cloud CDN' },
  { id: '6', city: 'Dubai', region: 'UAE', x: 59, y: 46, ping: '16ms', status: 'Active Hub' }
];

export const NetworkGlobe2D: React.FC<NetworkGlobe2DProps> = ({ isVisible = true }) => {
  const { themeConfig } = useTheme();
  const [activeHub, setActiveHub] = useState<HubNode>(HUBS[0]);

  if (!isVisible) return null;

  return (
    <div className="relative w-full max-w-[540px] h-[340px] sm:h-[380px] flex flex-col items-center justify-between select-none py-2">
      {/* Visual Radar / World Grid Area */}
      <div className="relative w-full flex-1 rounded-2xl bg-slate-950/80 border border-white/10 p-4 overflow-hidden flex items-center justify-center">
        {/* Radar Concentric Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[380px] h-[380px] rounded-full border border-emerald-400/40" />
          <div className="absolute w-[260px] h-[260px] rounded-full border border-emerald-400/30" />
          <div className="absolute w-[140px] h-[140px] rounded-full border border-emerald-400/40" />
          <div className="absolute w-full h-px bg-white/15" />
          <div className="absolute h-full w-px bg-white/15" />
        </div>

        {/* World Map Dot Matrix / Grid Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Subtle connecting arcs between hubs */}
          <path
            d="M 67 48 Q 57 30 47 38"
            fill="none"
            stroke={themeConfig.primaryColor}
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.7"
          />
          <path
            d="M 47 38 Q 38 25 28 36"
            fill="none"
            stroke={themeConfig.accentColor}
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.7"
          />
          <path
            d="M 67 48 Q 63 42 59 46"
            fill="none"
            stroke={themeConfig.primaryColor}
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.7"
          />
          <path
            d="M 47 38 Q 48 32 48 28"
            fill="none"
            stroke={themeConfig.accentColor}
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.7"
          />
        </svg>

        {/* Hub Interactive Markers */}
        {HUBS.map((hub) => {
          const isSelected = activeHub.id === hub.id;
          return (
            <button
              key={hub.id}
              type="button"
              onClick={() => setActiveHub(hub)}
              onMouseEnter={() => setActiveHub(hub)}
              style={{
                left: `${hub.x}%`,
                top: `${hub.y}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              aria-label={`${hub.city}, ${hub.region}`}
            >
              <div className="relative flex items-center justify-center">
                {/* Ping wave */}
                <span
                  className={`absolute rounded-full animate-ping opacity-60 ${
                    isSelected ? 'w-7 h-7 bg-emerald-400' : 'w-4 h-4 bg-teal-400'
                  }`}
                />
                {/* Core dot */}
                <span
                  className={`relative rounded-full border-2 border-slate-950 transition-all ${
                    isSelected
                      ? 'w-4 h-4 bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/50'
                      : 'w-3 h-3 bg-teal-400 group-hover:scale-125'
                  }`}
                />
              </div>

              {/* City Label Tag */}
              <div
                className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-bold tracking-tight pointer-events-none transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                    : 'bg-slate-900/90 text-slate-300 border border-white/10 opacity-70 group-hover:opacity-100'
                }`}
              >
                {hub.city}
              </div>
            </button>
          );
        })}

        {/* Selected Hub Telemetry Card overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-30 p-2.5 rounded-xl backdrop-blur-md bg-slate-900/90 border border-white/10 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Wifi className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>{activeHub.city}</span>
                <span className="text-[10px] text-slate-400 font-normal">({activeHub.region})</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">
                Latency: {activeHub.ping} • {activeHub.status}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-white/[0.04] px-2 py-1 rounded border border-white/5">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>99.98% SLA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
