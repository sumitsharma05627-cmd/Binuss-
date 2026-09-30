import React from 'react';
import { X, Check, ArrowRight, MapPin, Phone, MessageSquare, Globe, Sparkles, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartInquiryWithProject: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onStartInquiryWithProject
}) => {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        className="relative w-full max-w-2xl theme-card-bg border rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5">
          <span
            className="text-xs font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider"
            style={{
              backgroundColor: `${project.accentColor}20`,
              color: project.accentColor,
              border: `1px solid ${project.accentColor}40`
            }}
          >
            {project.category}
          </span>

          {project.location && (
            <span className="inline-flex items-center gap-1 text-xs text-neutral-300 font-mono">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{project.location}</span>
            </span>
          )}
        </div>

        <h2 id="project-modal-title" className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-1.5">
          {project.title}
        </h2>
        
        <p className="text-neutral-300 text-sm font-medium mb-4">
          {project.tagline}
        </p>

        {/* Live Client Information Notice */}
        <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Delivered Client Platform:</strong> {project.clientType}
            </span>
          </div>

          {project.contactInfo?.whatsapp && (
            <a
              href={`https://wa.me/${project.contactInfo.whatsapp.replace(/\D/g, '')}?text=Hello%2C%20I%20saw%20your%20website%20developed%20by%20GWL%20Weblab`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 font-semibold text-xs whitespace-nowrap self-start sm:self-auto transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Client</span>
            </a>
          )}
        </div>

        {/* Project Description */}
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Highlights Pills */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
              Core Capabilities & Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((hl, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-neutral-200 font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                  {hl}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Implemented Deliverables */}
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
            Engineered System Deliverables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance & Impact Metrics */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/10 mb-6 text-center">
          {project.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col justify-center">
              <div
                className="font-display text-sm sm:text-base font-bold truncate mb-0.5"
                style={{ color: project.accentColor }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider truncate">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onStartInquiryWithProject(project.title);
              onClose();
            }}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold theme-btn-primary transition-all cursor-pointer"
          >
            <span>Request Similar System for Your Business</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
