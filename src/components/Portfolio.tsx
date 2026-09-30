import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, MapPin, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { ProjectItem } from '../types';
import { PortfolioScreen2D } from './2d/PortfolioScreen2D';
import { ProjectModal } from './ProjectModal';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { useLanguage } from '../context/LanguageContext';

interface PortfolioProps {
  onSelectProjectForInquiry: (projectName: string) => void;
}

type CategoryTab = 'all' | 'education' | 'healthcare' | 'language';

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProjectForInquiry }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const { ref, stage } = useSectionSequence('portfolio');
  const { t } = useLanguage();

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'education') {
      return project.id === 'georgians-academy' || project.id === 'brightedge-academy';
    }
    if (activeTab === 'healthcare') {
      return project.id === 'yanshi-physiotherapy';
    }
    if (activeTab === 'language') {
      return project.id === 'tell-well-institute';
    }
    return true;
  });

  const categories: { id: CategoryTab; label: string; count: number }[] = [
    { id: 'all', label: 'All Projects', count: PROJECTS.length },
    { id: 'education', label: 'Education & Academies', count: 2 },
    { id: 'healthcare', label: 'Healthcare & Clinical', count: 1 },
    { id: 'language', label: 'Language & Skills', count: 1 }
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="work"
      aria-label="GWL Weblab Selected Work"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Synchronized Sequence */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.portfolio.badge}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              {t.portfolio.headline}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-400 text-base max-w-md"
          >
            {t.portfolio.subtitle}
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5 mr-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            Filter Work:
          </span>
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'theme-btn-primary shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-inherit' : 'bg-white/10 text-neutral-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Floating Screen Projects with Staggered Entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredProjectId === project.id;
              return (
                <motion.div
                  key={project.id}
                  id={`portfolio-item-${project.id}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.45,
                    delay: (idx % 2) * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => setSelectedModalProject(project)}
                  className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isHovered
                      ? 'bg-[#0b101e]/90 border-emerald-500/40 shadow-[0_16px_50px_rgba(16,185,129,0.18)] -translate-y-1'
                      : 'bg-[#080d19]/60 border-white/5 hover:border-white/15'
                  } border backdrop-blur-md`}
                >
                  {/* 2D Floating Screen Preview */}
                  <div className="w-full flex items-center justify-center my-2">
                    <PortfolioScreen2D
                      project={project}
                      isHovered={isHovered}
                      isVisible={stage >= 4}
                    />
                  </div>

                  {/* Project Information */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span
                        className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${project.accentColor}15`,
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}30`
                        }}
                      >
                        {project.category}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE CLIENT
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>

                    {project.location && (
                      <p className="text-xs text-neutral-400 flex items-center gap-1 mb-2 font-mono">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {project.location}
                      </p>
                    )}

                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* CTA Button & Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                        {project.stats.slice(0, 2).map((s, i) => (
                          <span key={i} className="truncate">
                            <strong className="text-neutral-200">{s.label}:</strong> {s.value}
                          </span>
                        ))}
                      </div>

                      <button
                        id={`view-project-${project.id}`}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isHovered
                            ? 'theme-btn-primary shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                            : 'bg-white/5 text-neutral-300 group-hover:text-white'
                        }`}
                      >
                        <span>{t.portfolio.viewLive}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
        onStartInquiryWithProject={onSelectProjectForInquiry}
      />
    </section>
  );
};
