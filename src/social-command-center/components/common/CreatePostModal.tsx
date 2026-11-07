import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { SocialPlatformType, PostStatus } from '../../types';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import { DevicePostPreview } from './DevicePostPreview';
import { requestSocialAi } from '../../services/socialAiService';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  Image,
  Video,
  Hash,
  Send,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  Layers,
  HelpCircle,
  Loader2
} from 'lucide-react';

export const CreatePostModal: React.FC = () => {
  const {
    isCreatePostModalOpen,
    closeCreatePostModal,
    activeClient,
    createPost,
    mediaAssets,
    clientWorkspaces,
    activeClientId,
    userUsage,
    openPaywall,
    currentUser
  } = useSocialCommand();

  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatformType[]>(['instagram', 'linkedin', 'twitter']);
  const [activePreviewPlatform, setActivePreviewPlatform] = useState<SocialPlatformType>('instagram');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>(['#GWLWebLabs', '#DigitalGrowth', '#TechInno']);
  const [newHashtagInput, setNewHashtagInput] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'carousel' | 'text_only'>('image');
  const [scheduledDate, setScheduledDate] = useState('2026-11-08');
  const [scheduledTime, setScheduledTime] = useState('11:00');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(activeClientId === 'all' ? 'client-gwl' : activeClientId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCreatePostModalOpen) return null;

  const currentWorkspace = clientWorkspaces.find((c) => c.id === selectedWorkspaceId) || clientWorkspaces[0];
  const charLimit = PLATFORM_REGISTRY[activePreviewPlatform].charLimit;
  const isOverLimit = caption.length > charLimit;

  const togglePlatform = (p: SocialPlatformType) => {
    setSelectedPlatforms((prev) => {
      const next = prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p];
      if (next.length > 0 && !next.includes(activePreviewPlatform)) {
        setActivePreviewPlatform(next[0]);
      }
      return next.length > 0 ? next : [p];
    });
  };

  const handleAddHashtag = () => {
    if (!newHashtagInput.trim()) return;
    const formatted = newHashtagInput.startsWith('#') ? newHashtagInput.trim() : `#${newHashtagInput.trim()}`;
    if (!hashtags.includes(formatted)) {
      setHashtags((prev) => [...prev, formatted]);
    }
    setNewHashtagInput('');
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  };

  const handleAiGenerateCaption = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    try {
      const res = await requestSocialAi({
        task: 'captions',
        prompt: aiPrompt,
        platform: activePreviewPlatform,
        industry: currentWorkspace.industry,
        tone: 'High Conversion & Engaging'
      });
      if (res.result) {
        setCaption(res.result);
        setShowAiDrawer(false);
      }
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (targetStatus: PostStatus) => {
    if (!caption.trim()) return;

    // Check monthly quota if publishing or scheduling
    if (userUsage && !userUsage.canCreatePost && targetStatus !== 'draft') {
      openPaywall({
        title: 'Monthly Post Quota Reached',
        description: `You have reached your limit of ${userUsage.postsLimit} scheduled posts on the ${userUsage.planName}. Upgrade your tier to unlock higher limits or unlimited multi-channel publishing.`,
        recommendedPlanId: 'professional',
        usageSnippet: `${userUsage.postsUsedThisMonth} of ${userUsage.postsLimit} posts used`
      });
      return;
    }

    setIsSubmitting(true);

    try {
      createPost({
        clientId: selectedWorkspaceId,
        title: caption.slice(0, 50),
        caption,
        platforms: selectedPlatforms,
        mediaUrls,
        mediaType,
        hashtags,
        status: targetStatus,
        scheduledFor: targetStatus === 'scheduled' ? `${scheduledDate}T${scheduledTime}:00Z` : undefined,
        publishedAt: targetStatus === 'published' ? new Date().toISOString() : undefined,
        authorName: currentUser?.name || 'Workspace Member',
        authorAvatar: currentUser?.avatar || '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
        clientApproved: !currentWorkspace.approvalRequired || targetStatus === 'draft'
      });

      closeCreatePostModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#090e1a] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1424]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Unified Publishing Studio</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">
                  Multi-Channel
                </span>
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Compose once, customize and dispatch to multiple official platforms simultaneously.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Workspace selector */}
            <select
              value={selectedWorkspaceId}
              onChange={(e) => setSelectedWorkspaceId(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 font-medium"
            >
              {clientWorkspaces.map((c) => (
                <option key={c.id} value={c.id}>
                  Workspace: {c.name}
                </option>
              ))}
            </select>

            <button
              onClick={closeCreatePostModal}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split 2 Columns */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Left Column: Form & Customizer (7 cols) */}
          <div className="lg:col-span-7 p-6 space-y-5">
            {/* 1. Target Platforms Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Select Target Platforms:
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PLATFORM_REGISTRY) as SocialPlatformType[]).map((platformKey) => {
                  const meta = PLATFORM_REGISTRY[platformKey];
                  const isSelected = selectedPlatforms.includes(platformKey);
                  return (
                    <button
                      key={platformKey}
                      type="button"
                      onClick={() => togglePlatform(platformKey)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? `${meta.bgBadge} ${meta.borderBadge} ${meta.textColor} shadow-md`
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {getPlatformIcon(platformKey, 'w-3.5 h-3.5')}
                      <span>{meta.name.split(' ')[0]}</span>
                      {isSelected && <CheckCircle2 className="w-3 h-3 ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Caption Area with GW Labs AI trigger */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Caption & Hook:</span>
                  <button
                    type="button"
                    onClick={() => setShowAiDrawer(!showAiDrawer)}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 text-indigo-300 hover:text-white text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                    <span>GW Labs AI Assistant</span>
                  </button>
                </div>

                <div className={`text-[11px] font-mono ${isOverLimit ? 'text-rose-400 font-bold' : 'text-slate-500'}`}>
                  {caption.length} / {charLimit} chars ({activePreviewPlatform})
                </div>
              </div>

              {/* AI Quick Generator Drawer */}
              {showAiDrawer && (
                <div className="mb-3 p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-2.5 animate-in slide-in-from-top-2">
                  <div className="flex items-center justify-between font-semibold text-indigo-200">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Instant AI Copywriter for {PLATFORM_REGISTRY[activePreviewPlatform].name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowAiDrawer(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g. Announcing new physics lab admissions or posture relief reel..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    />
                    <button
                      type="button"
                      disabled={isAiLoading || !aiPrompt.trim()}
                      onClick={handleAiGenerateCaption}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      {isAiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      <span>Generate</span>
                    </button>
                  </div>
                </div>
              )}

              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write your high-impact caption here... Include hooks, key takeaways, and call-to-actions."
                rows={5}
                className="w-full bg-[#070b14] border border-slate-800 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 leading-relaxed font-sans"
              />
            </div>

            {/* 3. Hashtags */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Hashtags:
              </label>
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-sky-300 text-xs font-mono"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHashtag(tag)}
                      className="hover:text-rose-400 ml-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Hash className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={newHashtagInput}
                    onChange={(e) => setNewHashtagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHashtag();
                      }
                    }}
                    placeholder="Add custom hashtag and press Enter..."
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddHashtag}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* 4. Media Attachments */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Media Attachments:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                {mediaAssets.slice(0, 4).map((asset) => {
                  const isSelected = mediaUrls.includes(asset.url);
                  return (
                    <div
                      key={asset.id}
                      onClick={() => {
                        setMediaUrls([asset.url]);
                        setMediaType(asset.type);
                      }}
                      className={`group relative aspect-video rounded-xl overflow-hidden border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-400 ring-2 ring-emerald-400/30'
                          : 'border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-slate-200 truncate max-w-[90%]">
                        {asset.title}
                      </span>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-400">
                  {mediaType.toUpperCase()}
                </span>
                <span>Select from media assets or upload new client creative in Media Library.</span>
              </div>
            </div>

            {/* 5. Scheduling Timing */}
            <div className="p-4 rounded-2xl bg-[#070b14] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Optimal Schedule Timing</span>
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Best Audience Peak: 11:00 AM IST
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono">Date:</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono">Time (IST):</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Mockup Device Preview (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-slate-50/70 dark:bg-[#060913] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Multi-Platform Preview:
                </span>

                {/* Preview Platform Tabs */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  {selectedPlatforms.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setActivePreviewPlatform(p)}
                      title={PLATFORM_REGISTRY[p].name}
                      className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        activePreviewPlatform === p
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                      }`}
                    >
                      {getPlatformIcon(p, 'w-3.5 h-3.5')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Render Device Preview Frame */}
              <div className="py-2">
                <DevicePostPreview
                  platform={activePreviewPlatform}
                  caption={caption}
                  mediaUrls={mediaUrls}
                  mediaType={mediaType}
                  authorName={currentWorkspace.name}
                  authorHandle={`@${currentWorkspace.slug}`}
                  authorAvatar={currentWorkspace.logoUrl}
                  hashtags={hashtags}
                  isReelOrShort={mediaType === 'video'}
                />
              </div>
            </div>

            {/* Client Approval Note if required */}
            {currentWorkspace.approvalRequired && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs text-amber-800 dark:text-amber-200/90 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Client Approval Enabled:</strong> Scheduled posts will be placed in the client approval queue before broadcast.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1424]">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            <span>Targeting {selectedPlatforms.length} official channels</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit('draft')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting || !caption.trim() || isOverLimit}
              onClick={() => handleSubmit('scheduled')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Schedule Post</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting || !caption.trim() || isOverLimit}
              onClick={() => handleSubmit('published')}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Immediately</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
