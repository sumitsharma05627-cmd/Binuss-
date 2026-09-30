import React from 'react';
import {
  Globe,
  Search,
  Megaphone,
  Users,
  Filter,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { ECOSYSTEM_NODES } from '../../data/growth';
import { useTheme } from '../../context/ThemeContext';

interface Ecosystem2DProps {
  activeNodeIndex: number;
  onHoverNode: (index: number) => void;
  isVisible?: boolean;
}

const NODE_ICONS = [Globe, Search, Megaphone, Users, Filter, TrendingUp];

export const Ecosystem2D: React.FC<Ecosystem2DProps> = ({
  activeNodeIndex,
  onHoverNode,
  isVisible = true
}) => {
  const { themeConfig } = useTheme();

  if (!isVisible) return null;

  // 6 nodes positioned in a circle around center (cx=190, cy=180, r=120)
  const cx = 190;
  const cy = 180;
  const radius = 120;

  return (
    <div className="relative w-full h-[360px] flex items-center justify-center select-none">
      {/* SVG Radial Connector Circuits */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 380 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Orbital guide circle */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={themeConfig.primaryColor}
          strokeOpacity="0.15"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* Lines from center to each node */}
        {ECOSYSTEM_NODES.map((_, idx) => {
          const angle = (idx * 60 - 90) * (Math.PI / 180);
          const nx = cx + Math.cos(angle) * radius;
          const ny = cy + Math.sin(angle) * radius;
          const isActive = idx === activeNodeIndex;

          return (
            <g key={idx}>
              <line
                x1={cx}
                y1={cy}
                x2={nx}
                y2={ny}
                stroke={isActive ? themeConfig.primaryColor : 'rgba(255,255,255,0.12)'}
                strokeWidth={isActive ? '2' : '1'}
                strokeDasharray={isActive ? undefined : '3 3'}
              />
              {isActive && (
                <circle
                  cx={(cx + nx) / 2}
                  cy={(cy + ny) / 2}
                  r="3"
                  fill={themeConfig.accentColor}
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Central Nexus Node */}
      <div
        className="relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center p-2 backdrop-blur-xl bg-slate-950/90 border border-white/20 shadow-2xl"
        style={{
          boxShadow: `0 0 35px -5px ${themeConfig.primaryColor}60`
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center mb-1"
          style={{
            background: `linear-gradient(135deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`
          }}
        >
          <Cpu className="w-4 h-4 text-slate-950" />
        </div>
        <span className="text-[10px] font-black text-white tracking-wider">GWL</span>
        <span className="text-[8px] font-mono text-emerald-400">ENGINE</span>
      </div>

      {/* 6 Circular Surrounding Nodes */}
      {ECOSYSTEM_NODES.map((node, idx) => {
        const angle = (idx * 60 - 90) * (Math.PI / 180);
        // Position relative to container center
        const xOffset = Math.cos(angle) * radius;
        const yOffset = Math.sin(angle) * radius;
        const isActive = idx === activeNodeIndex;
        const Icon = NODE_ICONS[idx] || Globe;

        return (
          <button
            key={node.step}
            type="button"
            onMouseEnter={() => onHoverNode(idx)}
            onClick={() => onHoverNode(idx)}
            style={{
              transform: `translate(${xOffset}px, ${yOffset}px)`
            }}
            className={`absolute z-20 w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
              isActive
                ? 'scale-125 shadow-xl border-2 z-30'
                : 'bg-slate-900/80 border border-white/10 hover:border-white/30 hover:scale-110'
            }`}
            aria-label={`${node.name}: ${node.role}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center mb-0.5 transition-colors ${
                isActive
                  ? 'text-slate-950'
                  : 'text-slate-300'
              }`}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${themeConfig.primaryColor}, ${themeConfig.accentColor})`
                  : 'rgba(255,255,255,0.06)'
              }}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span
              className={`text-[9px] font-bold tracking-tight truncate max-w-[56px] ${
                isActive ? 'text-white' : 'text-slate-400'
              }`}
            >
              {node.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};
