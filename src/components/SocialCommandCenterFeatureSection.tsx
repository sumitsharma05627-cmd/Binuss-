import React from 'react';
import { 
  Share2, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Zap, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface SocialCommandCenterFeatureSectionProps {
  onLaunchCommandCenter: () => void;
}

export const SocialCommandCenterFeatureSection: React.FC<SocialCommandCenterFeatureSectionProps> = ({
  onLaunchCommandCenter
}) => {
  const highlights = [
    {
      title: '9 Integrated Networks',
      desc: 'Instagram, WhatsApp Business, YouTube, LinkedIn, X, Facebook Pages, Pinterest, Reddit & Telegram.',
      icon: Share2,
      color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      title: 'Unified Customer Inbox',
      desc: 'Respond to WhatsApp chats, Instagram DMs, Messenger & comments in one high-velocity team CRM.',
      icon: MessageSquare,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'GW Labs AI Assistant',
      desc: 'Powered by Gemini 3.8 Flash for multi-lingual captions, viral hooks, hashtag clusters & auto-replies.',
      icon: Sparkles,
      color: 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30'
    },
    {
      title: 'Agency Multi-Tenancy',
      desc: 'Separate client workspaces, role-based access control (RBAC), and branded client approval workflows.',
      icon: Building2,
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30'
    },
    {
      title: 'Visual Visual Publishing',
      desc: 'Interactive monthly/weekly calendar, real multi-device post previews, and scheduled cron dispatch.',
      icon: Calendar,
      color: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30'
    },
    {
      title: 'Automated Trigger Workflows',
      desc: 'Trigger-Condition-Action automation engine for instant lead captures, auto-replies & sentiment tagging.',
      icon: Zap,
      color: 'from-violet-500/20 to-blue-500/20 text-violet-400 border-violet-500/30'
    }
  ];

  return (
    <section id="social-command-center-feature" className="py-24 relative overflow-hidden bg-slate-950/70 border-y border-cyan-500/20">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Standalone Management Platform</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Gwalior Web Labs <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Social Media Command Center
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Operating separately from our traditional digital services website, our dedicated All-in-One Social Media Management Platform allows agencies, enterprises, and creators to publish, automate, monitor, and scale across 9 global networks.
          </p>

          {/* Primary Action Button */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchCommandCenter}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <span>Launch Standalone Command Center</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="https://wa.me/917587939722?text=Hello%20Gwalior%20Web%20Labs%2C%20I%20want%20a%20demo%20of%20the%20Social%20Command%20Center%20Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Book Platform Demo (+91 75879 39722)</span>
            </a>
          </div>
        </div>

        {/* 6 Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Metrics Showcase Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full Multi-Tenant Platform Architecture Active</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Ready to manage all client social channels from one screen?
            </h4>
            <p className="text-slate-400 text-xs max-w-xl">
              Equipped with Razorpay recurring subscription engine, Google Gemini 3.8 Flash AI Studio, and official REST/Graph API connection safeguards.
            </p>
          </div>

          <button
            onClick={onLaunchCommandCenter}
            className="shrink-0 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <span>Open Command Center</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
