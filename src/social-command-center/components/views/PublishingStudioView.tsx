import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { SocialPost, SocialPlatformType, PostStatus } from '../../types';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import { DevicePostPreview } from '../common/DevicePostPreview';
import {
  Send,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Copy,
  Trash2,
  Calendar,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  Eye,
  SlidersHorizontal,
  Upload,
  ArrowUpRight
} from 'lucide-react';

export const PublishingStudioView: React.FC = () => {
  const {
    posts,
    createPost,
    deletePost,
    publishPostNow,
    openCreatePostModal,
    activeClientId,
    clientWorkspaces,
    setActiveSection
  } = useSocialCommand();

  const [activeTab, setActiveTab] = useState<PostStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPostForInspection, setSelectedPostForInspection] = useState<SocialPost | null>(null);
  const [activePreviewPlatform, setActivePreviewPlatform] = useState<SocialPlatformType>('instagram');
  const [isRetryingId, setIsRetryingId] = useState<string | null>(null);

  const filteredPosts = posts
    .filter((p) => (activeClientId === 'all' ? true : p.clientId === activeClientId))
    .filter((p) => (activeTab === 'all' ? true : p.status === activeTab))
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (p.title && p.title.toLowerCase().includes(q)) ||
        p.caption.toLowerCase().includes(q) ||
        p.hashtags.some((h) => h.toLowerCase().includes(q))
      );
    });

  const activePost = selectedPostForInspection || filteredPosts[0] || null;

  const handleDuplicatePost = (post: SocialPost) => {
    createPost({
      clientId: post.clientId,
      title: `${post.title || 'Post'} (Copy)`,
      caption: post.caption,
      platforms: post.platforms,
      mediaUrls: post.mediaUrls,
      mediaType: post.mediaType,
      hashtags: post.hashtags,
      status: 'draft',
      authorName: post.authorName,
      authorAvatar: post.authorAvatar,
      clientApproved: false
    });
  };

  const handleRetryFailed = async (postId: string) => {
    setIsRetryingId(postId);
    await publishPostNow(postId);
    setIsRetryingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#090f1f] border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              Publishing Studio & Dispatch Engine
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Multi-Channel Social Orchestration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Content Composer & Scheduled Pipelines
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Create once, optimize per channel, preview on live device mockups, and schedule across Instagram, LinkedIn, YouTube, X, Facebook, Pinterest, Reddit, Telegram, and WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveSection('calendar')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Calendar View</span>
          </button>

          <button
            onClick={openCreatePostModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Broadcast Post</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Content' },
            { id: 'published', label: 'Published' },
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'draft', label: 'Drafts' },
            { id: 'pending_approval', label: 'Pending Approval' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search captions, tags, campaigns..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* Studio Workspace: Left Post List + Right Dynamic Inspection & Live Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Posts Table / List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-[#080d19] border border-slate-200 dark:border-slate-800">
              <FileText className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">No content matching this filter</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Create a new multi-channel post or adjust your filters above.
              </p>
              <button
                onClick={openCreatePostModal}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
              >
                Create First Post
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isSelected = activePost?.id === post.id;
              const client = clientWorkspaces.find((c) => c.id === post.clientId);

              return (
                <div
                  key={post.id}
                  onClick={() => {
                    setSelectedPostForInspection(post);
                    if (post.platforms.length > 0) {
                      setActivePreviewPlatform(post.platforms[0]);
                    }
                  }}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/60 dark:bg-[#0f172a] border-emerald-500/60 shadow-xl ring-1 ring-emerald-500/20'
                      : 'bg-white dark:bg-[#080d19] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                        {client?.name || 'Workspace'}
                      </span>
                      <div className="flex items-center gap-1">
                        {post.platforms.map((p) => (
                          <span
                            key={p}
                            className={`p-1 rounded-md text-slate-700 dark:text-slate-300 ${PLATFORM_REGISTRY[p].bgBadge}`}
                            title={PLATFORM_REGISTRY[p].name}
                          >
                            {getPlatformIcon(p, 'w-3 h-3')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                        post.status === 'published'
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                          : post.status === 'scheduled'
                          ? 'bg-blue-500/15 border border-blue-500/30 text-blue-400'
                          : post.status === 'pending_approval'
                          ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {post.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5 line-clamp-1">
                    {post.title || post.caption.slice(0, 50)}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-2">
                    {post.caption}
                  </p>

                  {/* Post Footer & Quick Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      {post.status === 'published' && post.metrics && (
                        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
                          <span>❤️ {post.metrics.likes}</span>
                          <span>💬 {post.metrics.comments}</span>
                          <span>🔄 {post.metrics.shares}</span>
                        </div>
                      )}
                      {post.status === 'scheduled' && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-blue-300">
                          <Clock className="w-3 h-3" />
                          <span>{post.scheduledFor ? new Date(post.scheduledFor).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Pending'}</span>
                        </span>
                      )}
                      {post.status === 'pending_approval' && (
                        <span className="text-[11px] text-amber-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Awaiting client approval</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDuplicatePost(post)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Duplicate Post"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {post.status !== 'published' && (
                        <button
                          onClick={() => publishPostNow(post.id)}
                          className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-[11px] flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Publish Now</span>
                        </button>
                      )}

                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Inspection & Interactive Device Preview (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl flex flex-col justify-between">
          {activePost ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Live Device Preview</h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Inspect exact cross-platform rendering
                  </div>
                </div>

                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  {activePost.platforms.map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePreviewPlatform(p)}
                      className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        activePreviewPlatform === p
                          ? 'bg-slate-800 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={PLATFORM_REGISTRY[p].name}
                    >
                      {getPlatformIcon(p, 'w-3.5 h-3.5')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Render Device Preview */}
              <div className="py-2">
                <DevicePostPreview
                  platform={activePreviewPlatform}
                  caption={activePost.caption}
                  mediaUrls={activePost.mediaUrls}
                  mediaType={activePost.mediaType}
                  authorName={activePost.authorName}
                  authorAvatar={activePost.authorAvatar}
                  hashtags={activePost.hashtags}
                  isReelOrShort={activePost.mediaType === 'video'}
                />
              </div>

              {/* Performance Diagnostics if published */}
              {activePost.status === 'published' && activePost.metrics && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>Performance Analytics</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">High Engagement</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-transparent">
                      <div className="text-slate-500 dark:text-slate-400 text-[9px]">Impressions</div>
                      <div className="font-bold text-slate-900 dark:text-white mt-0.5">{activePost.metrics.impressions.toLocaleString()}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-transparent">
                      <div className="text-slate-500 dark:text-slate-400 text-[9px]">Saves / Bookmarks</div>
                      <div className="font-bold text-slate-900 dark:text-white mt-0.5">{activePost.metrics.saves}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-transparent">
                      <div className="text-slate-500 dark:text-slate-400 text-[9px]">Clicks</div>
                      <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{activePost.metrics.clicks}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-10 text-center text-slate-500 text-xs">
              Select any post to inspect device preview.
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Official APIs Verified: <strong>Meta, Google & X</strong></span>
            <button
              onClick={openCreatePostModal}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              + Create New Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
