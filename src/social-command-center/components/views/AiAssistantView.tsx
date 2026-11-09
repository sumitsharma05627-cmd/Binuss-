import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { SocialPlatformType } from '../../types';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import { requestSocialAi } from '../../services/socialAiService';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  Layers,
  Calendar,
  Languages,
  MessageCircle,
  Hash,
  FileText,
  Lightbulb,
  Clock,
  ArrowRight,
  Loader2
} from 'lucide-react';

export const AiAssistantView: React.FC = () => {
  const {
    activeClient,
    openCreatePostModal,
    setActiveSection,
    incrementAiUsage,
    aiQueriesUsed
  } = useSocialCommand();

  const [selectedTask, setSelectedTask] = useState<
    'captions' | 'hashtags' | 'ideas' | 'calendar' | 'rewrite' | 'reply' | 'translate'
  >('captions');
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatformType>('instagram');
  const [industry, setIndustry] = useState(activeClient?.industry || 'Digital Marketing & Web Agency');
  const [targetAudience, setTargetAudience] = useState('Pan-India & Global Decision Makers');
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Hinglish'>('English');
  const [tone, setTone] = useState<'Engaging & Authoritative' | 'Conversational & Friendly' | 'Direct & Urgent' | 'Luxury & Premium' | 'Humorous & Relatable'>('Engaging & Authoritative');
  const [objective, setObjective] = useState<'Lead Generation' | 'Brand Authority' | 'Viral Reach' | 'Community Engagement'>('Lead Generation');
  const [promptInput, setPromptInput] = useState('Announcing our sub-second Core Web Vitals engineering milestone and transparent pricing blueprint.');
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const taskOptions = [
    { id: 'captions', label: 'Viral Captions', icon: FileText, desc: '3 hooks, body copy, and CTAs' },
    { id: 'ideas', label: 'Content Ideas', icon: Lightbulb, desc: 'Viral reels & carousels concepts' },
    { id: 'hashtags', label: 'Hashtag Matrix', icon: Hash, desc: 'High-reach & niche tag clusters' },
    { id: 'calendar', label: '7-Day Calendar', icon: Calendar, desc: 'Daily hooks & strategic pillars' },
    { id: 'rewrite', label: 'Caption Rewriter', icon: RefreshCw, desc: 'Polish tone, clarity, and punch' },
    { id: 'reply', label: 'Comment Responder', icon: MessageCircle, desc: 'High-converting comment replies' },
    { id: 'translate', label: 'Hindi / Hinglish', icon: Languages, desc: 'Cultural and linguistic adaptation' }
  ];

  const handleGenerate = async () => {
    if (!promptInput.trim()) return;
    setIsLoading(true);
    try {
      const res = await requestSocialAi({
        task: selectedTask,
        prompt: promptInput.trim(),
        platform: selectedPlatform,
        industry,
        targetAudience,
        language,
        tone,
        objective
      });

      setGeneratedOutput(res.result);
      incrementAiUsage();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendToComposer = () => {
    openCreatePostModal();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-indigo-950/60 dark:via-[#0a1128] dark:to-[#0d1c38] border border-slate-200 dark:border-indigo-500/30 shadow-lg dark:shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400/20 to-indigo-500/20 border border-amber-400/30 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300 animate-spin-slow" />
              <span>GW Labs AI Assistant</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Powered by Google Gemini 3.8 Flash</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Strategic Social Media Content Architect
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Generate high-retention hooks, tailored captions, hashtags, content calendars, and bilingual translations calibrated for maximum reach and conversion.
          </p>
        </div>

        {/* AI Quotas indicator */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-right shrink-0">
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">AI Queries Usage</div>
          <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white">
            {aiQueriesUsed} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ 1,500 mo</span>
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">High-Speed Quota Active</div>
        </div>
      </div>

      {/* Main 2-Column Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* =========================================================================
            LEFT COLUMN: Controls & Prompt Formulation (5.5 cols)
           ========================================================================= */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl space-y-4">
          {/* 1. Task Selector Chips */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
              Select AI Task:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {taskOptions.map((task) => {
                const IconComponent = task.icon;
                const isSelected = selectedTask === task.id;
                return (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTask(task.id as any)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500/60 text-indigo-700 dark:text-white shadow-md'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <div>
                      <div className="font-bold text-xs">{task.label}</div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{task.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Platform Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
              Target Channel:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['instagram', 'linkedin', 'youtube', 'twitter', 'facebook', 'whatsapp'] as SocialPlatformType[]).map((p) => {
                const meta = PLATFORM_REGISTRY[p];
                const isSelected = selectedPlatform === p;
                return (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? `${meta.bgBadge} ${meta.borderBadge} ${meta.textColor} shadow-sm`
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {getPlatformIcon(p, 'w-3.5 h-3.5')}
                    <span>{meta.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Dropdown Controls: Language, Tone & Objective */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase mb-1">Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Hinglish">Hinglish (Colloquial)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase mb-1">Campaign Objective:</label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
              >
                <option value="Lead Generation">Lead Generation</option>
                <option value="Brand Authority">Brand Authority</option>
                <option value="Viral Reach">Viral Reach</option>
                <option value="Community Engagement">Community Engagement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase mb-1">Voice & Tone:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white"
            >
              <option value="Engaging & Authoritative">Engaging & Authoritative</option>
              <option value="Conversational & Friendly">Conversational & Friendly</option>
              <option value="Direct & Urgent">Direct & Urgent (High Conversion)</option>
              <option value="Luxury & Premium">Luxury & Premium</option>
              <option value="Humorous & Relatable">Humorous & Relatable</option>
            </select>
          </div>

          {/* 4. Prompt Input */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
              Topic, Concept, or Customer Inquiry:
            </label>
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Describe your subject, key points, offer, or customer comment..."
              rows={4}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 leading-relaxed font-sans"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading || !promptInput.trim()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-extrabold text-xs transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Crafting Strategy with Gemini 3.8 Flash...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate with GW Labs AI</span>
              </>
            )}
          </button>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Strategic Output & Quick Actions (6.5 cols)
           ========================================================================= */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl flex flex-col justify-between">
          <div>
            {/* Output Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse"></span>
                <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">AI Content Output</h3>
              </div>

              {generatedOutput && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer border border-slate-200 dark:border-transparent"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy Copy'}</span>
                  </button>

                  <button
                    onClick={handleSendToComposer}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open in Publishing Studio</span>
                  </button>
                </div>
              )}
            </div>

            {/* Content Output Box */}
            {generatedOutput ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 max-h-[520px] overflow-y-auto text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {generatedOutput}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500 text-xs space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-amber-500 dark:text-amber-300" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-300">Ready to engineer your next viral post</h4>
                <p className="max-w-sm mx-auto text-slate-600 dark:text-slate-400">
                  Select your task, channel, voice, and topic on the left. GW Labs AI will tailor hooks, captions, and hashtag strategies instantly.
                </p>
              </div>
            )}
          </div>

          {/* Bottom helper tip */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Optimal Peak Time for {PLATFORM_REGISTRY[selectedPlatform].name}: <strong>11:00 AM – 1:30 PM IST</strong></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">Sub-second Latency</span>
          </div>
        </div>
      </div>
    </div>
  );
};
