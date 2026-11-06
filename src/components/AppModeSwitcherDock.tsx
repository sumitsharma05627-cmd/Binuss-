import React from 'react';
import { Globe, LayoutDashboard, Sparkles } from 'lucide-react';

interface AppModeSwitcherDockProps {
  currentMode: 'website' | 'social-command-center';
  onSwitchMode: (mode: 'website' | 'social-command-center') => void;
}

export const AppModeSwitcherDock: React.FC<AppModeSwitcherDockProps> = ({
  currentMode,
  onSwitchMode
}) => {
  return (
    <aside
      aria-label="App mode switcher"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-950/90 border border-slate-700/80 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Traditional Website Button */}
        <button
          onClick={() => onSwitchMode('website')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentMode === 'website'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Agency Website</span>
        </button>

        {/* Divider */}
        <span className="w-px h-4 bg-slate-800 mx-0.5" />

        {/* Social Command Center Button */}
        <button
          onClick={() => onSwitchMode('social-command-center')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            currentMode === 'social-command-center'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/30 font-extrabold'
              : 'text-cyan-300 hover:text-white hover:bg-cyan-500/10'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Social Command Center</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-400 text-slate-950 font-black uppercase">
            SUITE
          </span>
        </button>
      </div>
    </aside>
  );
};
