import React, { useState, useRef } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Play,
  Pause,
  Building2,
  MapPin,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { TESTIMONIALS_DATA } from '../data/testimonials';
import { useLanguage } from '../context/LanguageContext';
import { useSectionSequence } from '../context/ScrollSequenceContext';
import { motion } from 'motion/react';

interface TestimonialSliderProps {
  onStartProject?: () => void;
  onExploreServices?: () => void;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  onStartProject,
  onExploreServices
}) => {
  const { ref, stage } = useSectionSequence('testimonials');
  const { t, language } = useLanguage();
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const toggleAutoplay = () => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperRef.current.autoplay.start();
      setIsPlaying(true);
    }
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="testimonials"
      aria-label="Client Testimonials and Feedback"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5 bg-[#050813]"
    >
      {/* Subtle Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.testimonials.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4"
            >
              {t.testimonials.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base sm:text-lg text-slate-300/90 leading-relaxed"
            >
              {t.testimonials.subtitle}
            </motion.p>
          </div>

          {/* Navigation & Autoplay Controls */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            {/* Autoplay Pause / Resume Pill */}
            <button
              id="testimonial-autoplay-toggle"
              type="button"
              onClick={toggleAutoplay}
              aria-label={isPlaying ? 'Pause testimonial autoplay' : 'Start testimonial autoplay'}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-md bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Pause Autoplay</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Resume Autoplay</span>
                </>
              )}
            </button>

            {/* Prev Arrow */}
            <button
              id="testimonial-swiper-prev"
              type="button"
              aria-label="Previous testimonial"
              className="swiper-btn-prev w-11 h-11 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Arrow */}
            <button
              id="testimonial-swiper-next"
              type="button"
              aria-label="Next testimonial"
              className="swiper-btn-next w-11 h-11 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Aggregate Ratings Metric Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 p-4 sm:p-5 rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white">5.0 / 5.0</div>
              <div className="text-xs text-slate-400">{t.testimonials.ratingScore}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white">100%</div>
              <div className="text-xs text-slate-400">{t.testimonials.satisfactionRate}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white">45+ Reviews</div>
              <div className="text-xs text-slate-400">{t.testimonials.reviewsCount}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-emerald-300">Live Feedback</div>
              <div className="text-xs text-slate-400">{t.testimonials.dragSwipeHint}</div>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
            speed={700}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              prevEl: '.swiper-btn-prev',
              nextEl: '.swiper-btn-next'
            }}
            pagination={{
              clickable: true,
              el: '.swiper-custom-pagination'
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16
              },
              640: {
                slidesPerView: 1.25,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24
              },
              1024: {
                slidesPerView: 2.6,
                spaceBetween: 24
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 28
              }
            }}
            className="pb-14!"
          >
            {TESTIMONIALS_DATA.map((item) => {
              const clientQuote = item.quote[language] || item.quote.en;
              const metricDesc = item.metricLabel[language] || item.metricLabel.en;

              return (
                <SwiperSlide key={item.id} className="h-auto">
                  <div className="relative flex flex-col justify-between h-full min-h-[380px] p-6 sm:p-7 rounded-2xl backdrop-blur-xl bg-slate-900/50 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 group">
                    {/* Background Decorative Gradient Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-tr-2xl blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

                    {/* Card Top: Stars & ROI Metric Chip */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-5">
                        {/* 5 Stars */}
                        <div className="flex items-center gap-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>

                        {/* Impact Highlight Pill */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold tracking-tight">
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          <span>{item.highlightMetric}</span>
                        </div>
                      </div>

                      {/* Metric description subtitle */}
                      <div className="text-[11px] uppercase tracking-wider text-emerald-400/90 font-semibold mb-3">
                        {metricDesc}
                      </div>

                      {/* Quote Text */}
                      <div className="relative mb-6">
                        <Quote className="absolute -top-2 -left-1 w-6 h-6 text-white/5 pointer-events-none -z-10" />
                        <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal italic">
                          &ldquo;{clientQuote}&rdquo;
                        </p>
                      </div>

                      {/* Service Delivered Tag */}
                      <div className="mb-6">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] border border-white/10 text-slate-300">
                          {item.serviceTag}
                        </span>
                      </div>
                    </div>

                    {/* Card Bottom: Client Info */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar / Photo with verified icon */}
                        <div className="relative shrink-0">
                          {item.avatarUrl ? (
                            <img
                              src={item.avatarUrl}
                              alt={item.author}
                              referrerPolicy="no-referrer"
                              className="w-11 h-11 rounded-full object-cover border border-emerald-500/30"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-300 text-sm">
                              {item.author.charAt(0)}
                            </div>
                          )}
                          {item.verified && (
                            <div
                              title="Verified Client"
                              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md"
                            >
                              <ShieldCheck className="w-3 h-3 text-slate-950" />
                            </div>
                          )}
                        </div>

                        {/* Name and Company */}
                        <div className="min-w-0">
                          <div className="font-display font-semibold text-sm sm:text-base text-white truncate group-hover:text-emerald-300 transition-colors">
                            {item.author}
                          </div>
                          <div className="text-xs text-slate-400 truncate">
                            {item.role}, <span className="text-slate-300">{item.company}</span>
                          </div>
                        </div>
                      </div>

                      {/* Location or Industry Pill */}
                      <div className="shrink-0 hidden sm:flex items-center gap-1 text-[11px] text-slate-400 bg-white/[0.03] px-2 py-1 rounded border border-white/5">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span className="truncate max-w-[90px]">{item.location.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Sleek Pagination Container */}
          <div className="swiper-custom-pagination flex items-center justify-center gap-2 mt-6" />
        </div>

        {/* Footer Call-to-Action inside Testimonial Section */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Ready to Achieve Measurable Results for Your Business?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Transparent packages, fixed delivery timeline, and zero tech lock-in.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onExploreServices && (
              <button
                type="button"
                onClick={onExploreServices}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                {t.testimonials.viewWork}
              </button>
            )}
            {onStartProject && (
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
              >
                <span>{t.testimonials.startProject}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
