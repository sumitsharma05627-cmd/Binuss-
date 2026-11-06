import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import { SocialPost, SocialPlatformType, PostStatus } from '../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Send,
  Eye,
  Filter,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Edit2
} from 'lucide-react';

export const ContentCalendarView: React.FC = () => {
  const { posts, updatePost, openCreatePostModal, activeClientId, clientWorkspaces } = useSocialCommand();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(10); // November (0-indexed: 10)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number>(4);
  const [filterPlatform, setFilterPlatform] = useState<SocialPlatformType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<PostStatus | 'all'>('all');

  // Reschedule modal state
  const [reschedulingPost, setReschedulingPost] = useState<SocialPost | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>('2026-11-06T15:30');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Filter posts
  const filteredPosts = posts
    .filter((p) => (activeClientId === 'all' ? true : p.clientId === activeClientId))
    .filter((p) => (filterPlatform === 'all' ? true : p.platforms.includes(filterPlatform)))
    .filter((p) => (filterStatus === 'all' ? true : p.status === filterStatus));

  // Generate days for current month view
  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay(); // 0 is Sunday
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Group posts by day of the month
  const getPostsForDay = (day: number) => {
    return filteredPosts.filter((post) => {
      const dateStr = post.scheduledFor || post.publishedAt || post.createdAt;
      const d = new Date(dateStr);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonthIndex && d.getDate() === day;
    });
  };

  const handlePrev = () => {
    if (viewMode === 'day') {
      setSelectedDay((d) => (d > 1 ? d - 1 : daysInMonth));
    } else {
      if (currentMonthIndex === 0) {
        setCurrentMonthIndex(11);
        setCurrentYear((y) => y - 1);
      } else {
        setCurrentMonthIndex((m) => m - 1);
      }
    }
  };

  const handleNext = () => {
    if (viewMode === 'day') {
      setSelectedDay((d) => (d < daysInMonth ? d + 1 : 1));
    } else {
      if (currentMonthIndex === 11) {
        setCurrentMonthIndex(0);
        setCurrentYear((y) => y + 1);
      } else {
        setCurrentMonthIndex((m) => m + 1);
      }
    }
  };

  const handleSaveReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (reschedulingPost) {
      updatePost(reschedulingPost.id, {
        scheduledFor: new Date(rescheduleDate).toISOString(),
        status: 'scheduled'
      });
      setReschedulingPost(null);
    }
  };

  const selectedDayPosts = getPostsForDay(selectedDay);

  // Week days calculation (centered around selectedDay)
  const getWeekDays = () => {
    const start = Math.max(1, selectedDay - 3);
    const result = [];
    for (let i = 0; i < 7; i++) {
      const dayNum = start + i;
      if (dayNum <= daysInMonth) {
        result.push(dayNum);
      }
    }
    return result;
  };

  const hoursTimeline = [
    '08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#090f1f] border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              Publishing Schedule
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Month • Week • Day Multi-View</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Omnichannel Content Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Schedule, rearrange, and inspect cross-network content pipelines with automated background dispatch.
          </p>
        </div>

        {/* View Switcher, Navigation & New Post */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Month / Week / Day Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            {(['month', 'week', 'day'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                  viewMode === mode
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Month Navigator */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-bold font-display text-slate-900 dark:text-white min-w-[130px] text-center">
              {viewMode === 'day' 
                ? `${monthNames[currentMonthIndex]} ${selectedDay}, ${currentYear}`
                : `${monthNames[currentMonthIndex]} ${currentYear}`
              }
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={openCreatePostModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Filters:</span>
          
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value as any)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1 text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <option value="all">All Networks</option>
            {Object.values(PLATFORM_REGISTRY).map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1 text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled Only</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="failed">Failed / Retry</option>
          </select>
        </div>

        <div className="text-slate-500 dark:text-slate-400 text-[11px]">
          Showing <strong>{filteredPosts.length}</strong> posts in pipeline
        </div>
      </div>

      {/* VIEW MODE 1: MONTH VIEW */}
      {viewMode === 'month' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar Grid (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Grid Cells */}
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                <div key={`blank-${idx}`} className="h-24 sm:h-28 rounded-2xl bg-slate-950/30 border border-slate-900/50 opacity-20" />
              ))}

              {daysArray.map((day) => {
                const dayPosts = getPostsForDay(day);
                const isSelected = selectedDay === day;
                const isToday = day === 4 && currentMonthIndex === 10 && currentYear === 2026;

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`h-24 sm:h-28 rounded-2xl p-2 border transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#101b33] border-cyan-400/80 shadow-md ring-1 ring-cyan-400/30'
                        : isToday
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-[#090f1e]/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-cyan-300' : isToday ? 'text-emerald-400' : 'text-slate-400'
                      }`}>
                        {day}
                      </span>
                      {dayPosts.length > 0 && (
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold flex items-center justify-center">
                          {dayPosts.length}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 overflow-hidden">
                      {dayPosts.slice(0, 2).map((post) => (
                        <div
                          key={post.id}
                          className="px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700/60 text-[9px] text-slate-200 truncate flex items-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="truncate">{post.title || post.caption}</span>
                        </div>
                      ))}
                      {dayPosts.length > 2 && (
                        <div className="text-[8px] text-slate-500 font-mono">
                          +{dayPosts.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Day Inspector Panel (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    {monthNames[currentMonthIndex]} {selectedDay}, {currentYear}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  {selectedDayPosts.length} Scheduled
                </span>
              </div>

              {selectedDayPosts.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
                  <p>No posts scheduled for this day.</p>
                  <button
                    onClick={openCreatePostModal}
                    className="mt-3 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs cursor-pointer"
                  >
                    + Add Post Here
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDayPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          {post.platforms.map((p) => (
                            <span key={p} className="text-slate-300">
                              {getPlatformIcon(p, 'w-3.5 h-3.5')}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[9px] px-2 py-0.5 rounded uppercase font-semibold ${
                            post.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : post.status === 'scheduled'
                              ? 'bg-cyan-500/10 text-cyan-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {post.status}
                          </span>
                          <button
                            onClick={() => {
                              setReschedulingPost(post);
                              setRescheduleDate(post.scheduledFor ? post.scheduledFor.slice(0, 16) : '2026-11-06T15:30');
                            }}
                            className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                            title="Reschedule Post"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-white line-clamp-1">{post.title || post.caption.slice(0, 30)}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{post.caption}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                        <span>Author: {post.authorName}</span>
                        <span className="font-mono text-cyan-400">
                          {post.scheduledFor ? new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '11:00 AM'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 mt-4">
              <button
                onClick={openCreatePostModal}
                className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>Schedule New Post for this Date</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: WEEK VIEW */}
      {viewMode === 'week' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl overflow-x-auto">
          <div className="grid grid-cols-7 gap-3 min-w-[700px]">
            {getWeekDays().map((dayNum) => {
              const dayPosts = getPostsForDay(dayNum);
              const isSelected = selectedDay === dayNum;
              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDay(dayNum)}
                  className={`rounded-2xl p-3 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-900/90 border-cyan-500 dark:border-cyan-400/80 shadow-md ring-1 ring-cyan-400/30'
                      : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-center pb-2 border-b border-slate-200 dark:border-slate-800 mb-3">
                    <div className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">
                      {new Date(currentYear, currentMonthIndex, dayNum).toLocaleDateString([], { weekday: 'short' })}
                    </div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{dayNum}</div>
                    <span className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400">{dayPosts.length} posts</span>
                  </div>

                  <div className="space-y-2">
                    {dayPosts.map((post) => (
                      <div
                        key={post.id}
                        className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] space-y-1 shadow-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {post.platforms.map((p) => (
                              <span key={p}>{getPlatformIcon(p, 'w-3 h-3')}</span>
                            ))}
                          </div>
                          <span className="text-[9px] text-cyan-600 dark:text-cyan-400 font-mono">
                            {post.scheduledFor ? new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{post.title || post.caption}</p>
                      </div>
                    ))}
                    {dayPosts.length === 0 && (
                      <div className="text-center py-6 text-slate-400 dark:text-slate-600 text-[10px]">
                        No posts
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 3: DAY VIEW (HOUR BY HOUR TIMELINE) */}
      {viewMode === 'day' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Hourly Timeline: {monthNames[currentMonthIndex]} {selectedDay}, {currentYear}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Inspect scheduled dispatches and optimal audience engagement hours.</p>
            </div>
            <button
              onClick={openCreatePostModal}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Post at this Day</span>
            </button>
          </div>

          <div className="space-y-3">
            {hoursTimeline.map((timeLabel, idx) => {
              const matchedPosts = selectedDayPosts.filter((_, pIdx) => pIdx % hoursTimeline.length === idx);
              return (
                <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl bg-slate-950/40 border border-slate-800/80">
                  <div className="w-20 font-mono text-xs text-slate-400 font-bold shrink-0 pt-1">
                    {timeLabel}
                  </div>
                  <div className="flex-1">
                    {matchedPosts.length > 0 ? (
                      <div className="space-y-2">
                        {matchedPosts.map((post) => (
                          <div
                            key={post.id}
                            className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                {post.platforms.map((p) => (
                                  <span key={p}>{getPlatformIcon(p, 'w-4 h-4')}</span>
                                ))}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-white">{post.title || post.caption.slice(0, 40)}</h4>
                                <p className="text-[10px] text-slate-400">{post.caption.slice(0, 60)}...</p>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setReschedulingPost(post);
                                setRescheduleDate(post.scheduledFor ? post.scheduledFor.slice(0, 16) : '2026-11-06T15:30');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-semibold"
                            >
                              Reschedule
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-8 flex items-center text-[11px] text-slate-600">
                        Open slot • Optimal time for Instagram &amp; LinkedIn
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RESCHEDULE MODAL */}
      {reschedulingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-white">
            <button
              onClick={() => setReschedulingPost(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold mb-1">Reschedule Post</h3>
            <p className="text-xs text-slate-400 mb-4 line-clamp-1">{reschedulingPost.title || reschedulingPost.caption}</p>

            <form onSubmit={handleSaveReschedule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">New Date &amp; Time (IST):</label>
                <input
                  type="datetime-local"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReschedulingPost(null)}
                  className="w-1/2 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Confirm &amp; Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
