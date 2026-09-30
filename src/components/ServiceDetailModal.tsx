import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';
import { ServiceIcon2D } from './2d/ServiceIcon2D';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForInquiry: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectForInquiry
}) => {
  if (!service) return null;

  const accentColor = service.accentColor || '#10b981';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-[#090e1a]/95 border rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-2xl"
        style={{ borderColor: `${accentColor}35` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Specular Inner Hairline Highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Ambient Glow */}
        <div
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: accentColor }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span
            className="font-mono text-xs font-bold px-2.5 py-1 rounded-md border"
            style={{
              backgroundColor: `${accentColor}18`,
              borderColor: `${accentColor}40`,
              color: accentColor
            }}
          >
            SERVICE {service.number}
          </span>
          {service.categoryTag && (
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
              {service.categoryTag}
            </span>
          )}
          <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 ml-auto">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            {service.metrics}
          </span>
        </div>

        <h2 id="service-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          {service.title}
        </h2>

        {/* 2D Visual Blueprint in Modal */}
        <div className="w-full flex justify-center py-2 mb-5 bg-slate-950/60 rounded-xl border border-white/10 backdrop-blur-md">
          <ServiceIcon2D type={service.threeType} isHovered={true} />
        </div>

        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
          {service.fullDesc}
        </p>

        {/* Core Strategic Deliverables */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-wider text-neutral-300 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" style={{ color: accentColor }} />
              <span>Core Strategic Deliverables</span>
            </h3>
            <span className="text-[10px] text-neutral-500 font-mono">
              Production Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-neutral-200"
              >
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: accentColor }}
                />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onSelectForInquiry(service.title);
              onClose();
            }}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold theme-btn-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
          >
            <span>Inquire About {service.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
