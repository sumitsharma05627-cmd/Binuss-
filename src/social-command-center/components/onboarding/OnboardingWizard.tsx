import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Share2, 
  Building2, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  CheckCircle2, 
  Layers, 
  Send,
  Zap,
  Globe,
  HelpCircle,
  X
} from 'lucide-react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { useTheme } from '../../../context/ThemeContext';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';

export const OnboardingWizard: React.FC = () => {
  const { themeConfig } = useTheme();
  const isLight = !themeConfig.isDark;

  const { 
    isOnboardingOpen, 
    closeOnboarding, 
    submitOnboarding, 
    currentUser, 
    socialAccounts, 
    connectAccount 
  } = useSocialCommand();

  const [step, setStep] = useState<number>(1);

  // Step 2: Persona
  const [selectedPersona, setSelectedPersona] = useState<string>('Agency Owner');

  // Step 3: Target Platforms
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([
    'instagram',
    'linkedin',
    'youtube',
    'whatsapp'
  ]);

  // Step 4: Management Scope
  const [managementScope, setManagementScope] = useState<string>('Multiple clients');

  // Step 6: Active tour index
  const [activeTourCard, setActiveTourCard] = useState<number>(0);

  if (!isOnboardingOpen) return null;

  const toggleNetwork = (id: string) => {
    setSelectedNetworks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    await submitOnboarding({
      persona: selectedPersona,
      selectedNetworks,
      managementScope
    });
    closeOnboarding();
  };

  const personas = [
    { id: 'Beginner Marketer', title: 'Beginner Marketer', desc: 'Learning multi-channel social growth step-by-step with AI guidance.' },
    { id: 'Social Media Manager', title: 'Social Media Manager', desc: 'Managing day-to-day posting calendars and follower engagement.' },
    { id: 'Freelancer', title: 'Freelancer', desc: 'Delivering end-to-end content and reporting for personal clients.' },
    { id: 'Agency Owner', title: 'Agency Owner', desc: 'Scaling multi-client brand operations with team delegation and approvals.' },
    { id: 'Business Owner', title: 'Business Owner', desc: 'Generating direct leads, bookings, and sales for my local or digital enterprise.' }
  ];

  const scopes = [
    { id: 'Their own business', title: 'My Own Business', desc: 'Focusing on single brand dominance, direct WhatsApp leads, and sales.' },
    { id: 'Multiple clients', title: 'Multiple Client Workspaces', desc: 'Isolated workspaces, client approval workflows, and separate reporting.' },
    { id: 'A company marketing team', title: 'Company Marketing Team', desc: 'Internal department collaboration with role-based member permissions.' }
  ];

  const tourCards = [
    {
      title: '1. Connect Accounts',
      desc: 'Link Instagram, WhatsApp Business, LinkedIn, YouTube, X, and more with official OAuth & Graph APIs.',
      icon: Share2,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      title: '2. Create Posts',
      desc: 'Write once, customize captions, add hashtags, preview live mobile and desktop feeds with one click.',
      icon: Send,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    {
      title: '3. Schedule Content',
      desc: 'Select future dates or recurring schedules. Our server daemon automatically dispatches posts 24/7.',
      icon: Calendar,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      title: '4. Unified Inbox',
      desc: 'Respond to WhatsApp chats, Instagram DMs, Facebook comments, and inquiries in a 3-column team CRM.',
      icon: MessageSquare,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      title: '5. Read Analytics',
      desc: 'Track cross-network follower growth, top-performing posts, engagement rates, and export PDF summaries.',
      icon: BarChart3,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    {
      title: '6. Add Clients',
      desc: 'Create isolated client workspaces with unique brand colors, assigned team members, and custom approvals.',
      icon: Building2,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    }
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto ${
      isLight ? 'bg-slate-900/40' : 'bg-slate-950/85'
    }`}>
      <div 
        className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-10 shadow-2xl my-8 overflow-hidden border ${
          isLight 
            ? 'bg-white border-slate-200 text-slate-900' 
            : 'bg-slate-900 border-cyan-500/30 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className={`absolute top-0 right-0 w-80 h-40 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-cyan-500/10' : 'bg-cyan-500/15'
        }`} />

        {/* Progress Bar & Header */}
        <div className={`flex items-center justify-between mb-8 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl border p-1 flex items-center justify-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-700'
            }`}>
              <img
                src="/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png"
                alt="GWL Crest"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className={`text-xs font-mono uppercase ${isLight ? 'text-cyan-700 font-bold' : 'text-cyan-400'}`}>Step {step} of 6</div>
              <h3 className={`font-bold text-sm ${isLight ? 'text-slate-950 font-black' : 'text-white'}`}>Onboarding Setup</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFinish}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Skip Setup
            </button>
            <button
              onClick={closeOnboarding}
              className={`p-1.5 rounded-lg ${isLight ? 'text-slate-400 hover:text-slate-900' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="space-y-6 text-center py-4">
            <div className={`w-16 h-16 rounded-3xl border flex items-center justify-center mx-auto shadow-lg ${
              isLight 
                ? 'bg-cyan-50 border-cyan-200 text-cyan-700' 
                : 'bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400'
            }`}>
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                Welcome to Gwalior Web Labs <br />
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Social Command Center
                </span>
              </h2>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Hello <strong className={isLight ? 'text-slate-900' : 'text-white'}>{currentUser?.name || 'Marketer'}</strong>! You now have a unified command center designed for publishing across 9 networks, customer inbox triage, and automated growth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
              <div className={`p-3.5 rounded-2xl border text-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div className={`font-bold mb-1 ${isLight ? 'text-cyan-800' : 'text-cyan-300'}`}>9 Global Networks</div>
                <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Instagram, WhatsApp, YouTube, LinkedIn, X, and more in one view.</div>
              </div>
              <div className={`p-3.5 rounded-2xl border text-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div className={`font-bold mb-1 ${isLight ? 'text-emerald-800' : 'text-emerald-300'}`}>Unified Customer Inbox</div>
                <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Direct messages and comments converted into client CRM leads.</div>
              </div>
              <div className={`p-3.5 rounded-2xl border text-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div className={`font-bold mb-1 ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>GW Labs AI Assistant</div>
                <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Powered by Gemini 3.8 Flash for multilingual captions &amp; hooks.</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <span>Get Started (Step 2)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: USER PERSONA */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-xl font-bold mb-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>What describes your role best?</h2>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                We will optimize default presets and templates based on your profile.
              </p>
            </div>

            <div className="space-y-2.5">
              {personas.map((p) => {
                const isSelected = selectedPersona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPersona(p.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? (isLight 
                            ? 'bg-cyan-50 border-cyan-400 shadow-sm' 
                            : 'bg-cyan-500/15 border-cyan-500/50 shadow-md text-white')
                        : (isLight 
                            ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800' 
                            : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300')
                    }`}
                  >
                    <div>
                      <div className={`font-bold text-sm ${isLight ? 'text-slate-900 font-extrabold' : 'text-white'}`}>{p.title}</div>
                      <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{p.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected 
                        ? (isLight ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-cyan-400 bg-cyan-500 text-slate-950') 
                        : (isLight ? 'border-slate-300' : 'border-slate-700')
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <button
                onClick={() => setStep(1)}
                className={`px-4 py-2 text-xs font-semibold flex items-center gap-1 ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PLATFORMS */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-xl font-bold mb-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>What platforms do you want to manage?</h2>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Select networks to pin to your active publishing and inbox pipelines.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.values(PLATFORM_REGISTRY).map((plat) => {
                const isSelected = selectedNetworks.includes(plat.id);
                return (
                  <button
                    key={plat.id}
                    onClick={() => toggleNetwork(plat.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? (isLight ? 'bg-cyan-50 border-cyan-400 shadow-sm' : 'bg-cyan-500/15 border-cyan-400/60 shadow-sm')
                        : (isLight ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-950/60 border-slate-800 hover:border-slate-700')
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${plat.bgBadge} ${plat.textColor} border ${plat.borderBadge}`}>
                        {getPlatformIcon(plat.id, 'w-4 h-4')}
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected 
                          ? (isLight ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-cyan-400 bg-cyan-400 text-slate-950') 
                          : (isLight ? 'border-slate-300' : 'border-slate-700')
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <div>
                      <div className={`font-bold text-xs ${isLight ? 'text-slate-900 font-extrabold' : 'text-white'}`}>{plat.name}</div>
                      <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{plat.authMethod}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <button
                onClick={() => setStep(2)}
                className={`px-4 py-2 text-xs font-semibold flex items-center gap-1 ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={selectedNetworks.length === 0}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                Next Step ({selectedNetworks.length} selected) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: MANAGEMENT SCOPE */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-xl font-bold mb-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>What will you be managing?</h2>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Select your structural workspace requirements.
              </p>
            </div>

            <div className="space-y-3">
              {scopes.map((s) => {
                const isSelected = managementScope === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setManagementScope(s.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? (isLight ? 'bg-cyan-50 border-cyan-400 shadow-sm' : 'bg-cyan-500/15 border-cyan-500/50 shadow-md text-white')
                        : (isLight ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800' : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300')
                    }`}
                  >
                    <div>
                      <div className={`font-bold text-sm ${isLight ? 'text-slate-900 font-extrabold' : 'text-white'}`}>{s.title}</div>
                      <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{s.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected 
                        ? (isLight ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-cyan-400 bg-cyan-500 text-slate-950') 
                        : (isLight ? 'border-slate-300' : 'border-slate-700')
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <button
                onClick={() => setStep(3)}
                className={`px-4 py-2 text-xs font-semibold flex items-center gap-1 ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONNECT SOCIAL ACCOUNTS */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-xl font-bold mb-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>Connect Your Social Accounts</h2>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                You can authenticate your chosen networks now or skip and connect anytime in the Accounts tab.
              </p>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              {socialAccounts.slice(0, 5).map((acc) => {
                const meta = PLATFORM_REGISTRY[acc.platform];
                return (
                  <div
                    key={acc.id}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${meta.bgBadge} ${meta.textColor} border ${meta.borderBadge}`}>
                        {getPlatformIcon(acc.platform, 'w-4 h-4')}
                      </div>
                      <div>
                        <div className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{acc.accountName}</div>
                        <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>@{acc.accountHandle} • {meta.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {acc.status === 'connected' ? (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" /> Connected
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-400'
                        }`}>
                          Ready to Link
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <button
                onClick={() => setStep(4)}
                className={`px-4 py-2 text-xs font-semibold flex items-center gap-1 ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(6)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                Continue to Tour (Step 6) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: QUICK INTERACTIVE TUTORIAL */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold mb-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>Quick Feature Walkthrough</h2>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Explore the 6 core pillars of Gwalior Web Labs Social Command Center.
                </p>
              </div>
              <button
                onClick={handleFinish}
                className={`text-xs font-semibold hover:underline ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}
              >
                Skip Tutorial &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tourCards.map((card, idx) => {
                const Icon = card.icon;
                const isSelected = activeTourCard === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveTourCard(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? (isLight 
                            ? 'bg-cyan-50 border-cyan-400 shadow-md' 
                            : 'bg-slate-950/90 border-cyan-500/60 shadow-lg')
                        : (isLight 
                            ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' 
                            : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700')
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-xl border ${card.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className={`font-bold text-xs ${isLight ? 'text-slate-950 font-extrabold' : 'text-white'}`}>{card.title}</h4>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <button
                onClick={() => setStep(5)}
                className={`px-4 py-2 text-xs font-semibold flex items-center gap-1 ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={handleFinish}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete &amp; Launch Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
