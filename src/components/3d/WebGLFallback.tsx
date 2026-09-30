import React from 'react';
import { Layers } from 'lucide-react';

interface WebGLFallbackProps {
  title?: string;
  description?: string;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  title = 'Interactive 3D Experience',
  description = 'Accelerated graphics enabled for modern web standards.'
}) => {
  return (
    <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#0a0f1d]/60 border border-white/10 flex flex-col items-center justify-center p-6 text-center">
      <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-3">
        <Layers className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-neutral-400 max-w-xs">{description}</p>
    </div>
  );
};
