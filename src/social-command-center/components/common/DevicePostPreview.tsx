import React from 'react';
import { SocialPlatformType } from '../../types';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2, ThumbsUp, Eye, Repeat, ArrowUp, ArrowDown } from 'lucide-react';

interface DevicePostPreviewProps {
  platform: SocialPlatformType;
  caption: string;
  mediaUrls: string[];
  mediaType: 'image' | 'video' | 'carousel' | 'text_only';
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
  hashtags?: string[];
  customCaption?: string;
  isReelOrShort?: boolean;
}

export const DevicePostPreview: React.FC<DevicePostPreviewProps> = ({
  platform,
  caption,
  mediaUrls,
  mediaType,
  authorName = 'Gwalior Web Labs',
  authorHandle = '@gwlweblabs',
  authorAvatar = '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
  hashtags = [],
  customCaption,
  isReelOrShort = false
}) => {
  const displayCaption = customCaption || caption || 'Your captivating caption will appear here...';
  const displayHashtags = hashtags.length > 0 ? hashtags.join(' ') : '';
  const firstMedia = mediaUrls[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
  const platformMeta = PLATFORM_REGISTRY[platform];

  return (
    <div className="w-full max-w-sm mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-3 shadow-2xl overflow-hidden select-none">
      {/* Device Top Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-900 text-[11px] text-slate-400 font-mono mb-2">
        <div className="flex items-center gap-1.5">
          {getPlatformIcon(platform, 'w-3.5 h-3.5')}
          <span className="font-semibold text-slate-200">{platformMeta.name}</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400">
          Live Mockup
        </span>
      </div>

      {/* Platform-Specific Preview Containers */}
      {platform === 'instagram' && (
        <div className="bg-black rounded-2xl border border-slate-900 overflow-hidden text-white text-xs">
          {/* IG Header */}
          <div className="flex items-center justify-between p-2.5">
            <div className="flex items-center gap-2">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-7 h-7 rounded-full object-cover border border-amber-400/50"
              />
              <div>
                <div className="font-bold text-slate-100 flex items-center gap-1">
                  <span>{authorHandle.replace('@', '')}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-[10px] text-slate-400">Gwalior, Madhya Pradesh</div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </div>

          {/* Media stage */}
          <div className={`relative bg-slate-900 ${isReelOrShort ? 'aspect-[9/16] max-h-72' : 'aspect-square'} overflow-hidden flex items-center justify-center`}>
            {mediaType !== 'text_only' ? (
              <img
                src={firstMedia}
                alt="Post Media Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="p-6 text-center font-display text-sm text-slate-300">
                {displayCaption.slice(0, 140)}...
              </div>
            )}
            {isReelOrShort && (
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-pink-300">
                REEL
              </span>
            )}
          </div>

          {/* Action bar */}
          <div className="p-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 text-slate-200">
                <Heart className="w-4 h-4 hover:text-rose-500 cursor-pointer" />
                <MessageCircle className="w-4 h-4 hover:text-sky-400 cursor-pointer" />
                <Send className="w-4 h-4 hover:text-emerald-400 cursor-pointer" />
              </div>
              <Bookmark className="w-4 h-4 text-slate-300 cursor-pointer" />
            </div>

            <div className="text-[11px] font-bold text-slate-200 mb-1">
              Liked by <span className="font-semibold text-slate-300">sumit_gwl</span> and 482 others
            </div>

            {/* Caption */}
            <div className="text-[11px] leading-relaxed text-slate-300 line-clamp-3">
              <span className="font-bold text-white mr-1.5">{authorHandle.replace('@', '')}</span>
              {displayCaption}
            </div>

            {displayHashtags && (
              <div className="text-[10px] text-sky-400 mt-1 font-mono truncate">
                {displayHashtags}
              </div>
            )}

            <div className="text-[9px] uppercase tracking-wider text-slate-500 mt-1.5">
              Just Now • Gwalior Web Labs Engine
            </div>
          </div>
        </div>
      )}

      {platform === 'linkedin' && (
        <div className="bg-[#1b1f23] rounded-2xl border border-slate-800 p-3 text-white text-xs">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-8 h-8 rounded-md object-cover border border-sky-400/50"
              />
              <div>
                <div className="font-bold text-slate-100">{authorName}</div>
                <div className="text-[10px] text-slate-400">Digital Solutions & Cloud Architecture • 14,280 followers</div>
                <div className="text-[9px] text-slate-500">Just now • 🌐</div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </div>

          {/* Caption */}
          <p className="text-[11px] text-slate-200 leading-relaxed mb-2.5 whitespace-pre-line line-clamp-4">
            {displayCaption}
          </p>

          {/* Media */}
          {mediaType !== 'text_only' && (
            <div className="rounded-xl overflow-hidden mb-2.5 border border-slate-800 max-h-52">
              <img src={firstMedia} alt="Post preview" className="w-full object-cover" />
            </div>
          )}

          {/* Engagement */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-sky-600 flex items-center justify-center text-[8px]">👍</span>
              <span>184 reactions</span>
            </div>
            <div>36 comments • 18 reposts</div>
          </div>
        </div>
      )}

      {platform === 'twitter' && (
        <div className="bg-black rounded-2xl border border-slate-800 p-3 text-white text-xs">
          <div className="flex items-start gap-2.5">
            <img src={authorAvatar} alt={authorName} className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-bold text-slate-100 truncate">{authorName}</span>
                <span className="text-slate-500 text-[11px]">{authorHandle}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-500 text-[11px]">1m</span>
              </div>

              <div className="text-[11px] leading-relaxed text-slate-200 mb-2 whitespace-pre-line">
                {displayCaption.length > 280 ? displayCaption.slice(0, 277) + '...' : displayCaption}
              </div>

              {mediaType !== 'text_only' && (
                <div className="rounded-xl overflow-hidden border border-slate-800 mb-2 max-h-48">
                  <img src={firstMedia} alt="Media" className="w-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1">
                <span className="flex items-center gap-1 hover:text-sky-400"><MessageCircle className="w-3.5 h-3.5" /> 24</span>
                <span className="flex items-center gap-1 hover:text-emerald-400"><Repeat className="w-3.5 h-3.5" /> 48</span>
                <span className="flex items-center gap-1 hover:text-pink-400"><Heart className="w-3.5 h-3.5" /> 192</span>
                <span className="flex items-center gap-1 hover:text-sky-400"><Eye className="w-3.5 h-3.5" /> 3.2k</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {platform === 'youtube' && (
        <div className="bg-[#0f0f0f] rounded-2xl border border-slate-800 p-2.5 text-white text-xs">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-2">
            <img src={firstMedia} alt="YouTube thumbnail" className="w-full h-full object-cover" />
            <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px]">
              {isReelOrShort ? 'SHORTS' : '04:12'}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <img src={authorAvatar} alt={authorName} className="w-7 h-7 rounded-full object-cover" />
            <div className="flex-1">
              <div className="font-bold text-slate-100 text-[11px] line-clamp-2 leading-snug">
                {displayCaption.slice(0, 65)}...
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {authorName} • 12K views • 2 hours ago
              </div>
            </div>
          </div>
        </div>
      )}

      {platform === 'facebook' && (
        <div className="bg-[#242526] rounded-2xl border border-slate-800 p-3 text-white text-xs">
          <div className="flex items-center gap-2 mb-2">
            <img src={authorAvatar} alt={authorName} className="w-7 h-7 rounded-full object-cover" />
            <div>
              <div className="font-bold text-slate-100">{authorName}</div>
              <div className="text-[9px] text-slate-400">Just now · 🌍</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-200 mb-2 leading-relaxed line-clamp-3">
            {displayCaption}
          </p>
          {mediaType !== 'text_only' && (
            <div className="rounded-xl overflow-hidden mb-2 max-h-48 border border-slate-700">
              <img src={firstMedia} alt="Facebook media" className="w-full object-cover" />
            </div>
          )}
          <div className="flex items-center justify-around pt-2 border-t border-slate-700 text-slate-300 text-[11px]">
            <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> Like</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> Comment</span>
            <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> Share</span>
          </div>
        </div>
      )}

      {platform === 'reddit' && (
        <div className="bg-[#1a1a1b] rounded-2xl border border-slate-800 p-3 text-white text-xs">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1.5">
            <span className="font-bold text-slate-200">r/webdev</span>
            <span>• Posted by {authorHandle} 2 hours ago</span>
          </div>
          <div className="font-bold text-[12px] text-slate-100 mb-1.5">
            {displayCaption.slice(0, 75)}...
          </div>
          {mediaType !== 'text_only' && (
            <div className="rounded-xl overflow-hidden mb-2 max-h-44 border border-slate-800">
              <img src={firstMedia} alt="Reddit media" className="w-full object-cover" />
            </div>
          )}
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-full">
              <ArrowUp className="w-3 h-3 text-orange-500" />
              <span className="font-bold text-orange-400">241</span>
              <ArrowDown className="w-3 h-3" />
            </div>
            <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 84 comments</span>
            <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> Share</span>
          </div>
        </div>
      )}

      {(platform === 'telegram' || platform === 'whatsapp') && (
        <div className="bg-[#17212b] rounded-2xl border border-slate-800 p-3 text-white text-xs">
          <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-800">
            <img src={authorAvatar} alt={authorName} className="w-6 h-6 rounded-full object-cover" />
            <div className="font-bold text-emerald-400 text-[11px]">{authorName} Broadcast</div>
          </div>
          {mediaType !== 'text_only' && (
            <div className="rounded-xl overflow-hidden mb-2 max-h-48">
              <img src={firstMedia} alt="Broadcast asset" className="w-full object-cover" />
            </div>
          )}
          <p className="text-[11px] text-slate-200 leading-relaxed whitespace-pre-line">
            {displayCaption}
          </p>
          <div className="text-right text-[9px] text-slate-400 mt-1 font-mono">
            10:45 AM ✓✓
          </div>
        </div>
      )}

      {platform === 'pinterest' && (
        <div className="bg-[#1c1c1c] rounded-2xl border border-slate-800 p-2 text-white text-xs">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-900 mb-2">
            <img src={firstMedia} alt="Pin Preview" className="w-full h-full object-cover" />
            <button className="absolute top-2 right-2 px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-[10px] shadow-lg">
              Save
            </button>
          </div>
          <div className="font-bold text-slate-100 line-clamp-1">{displayCaption.slice(0, 40)}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{authorName}</div>
        </div>
      )}
    </div>
  );
};
