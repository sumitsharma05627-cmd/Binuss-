import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { AutomationRule } from '../../types';
import { 
  Zap, 
  Play, 
  Pause, 
  Plus, 
  Trash2, 
  Clock, 
  MessageSquare, 
  UserCheck, 
  Tag, 
  Send, 
  AlertTriangle,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export const AutomationCenterView: React.FC = () => {
  const { 
    currentClient, 
    automationRules, 
    toggleAutomationRule, 
    deleteAutomationRule, 
    createAutomationRule 
  } = useSocialCommand();

  const [activeTab, setActiveTab] = useState<'workflows' | 'logs' | 'recipes'>('workflows');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter rules by client
  const clientRules = automationRules.filter(
    rule => !rule.clientId || (currentClient && rule.clientId === currentClient.id)
  );

  // Form state for new rule
  const [ruleName, setRuleName] = useState('');
  const [ruleTrigger, setRuleTrigger] = useState<AutomationRule['trigger']>('keyword_match');
  const [triggerKeyword, setTriggerKeyword] = useState('');
  const [ruleAction, setRuleAction] = useState<AutomationRule['action']>('reply_message');
  const [actionPayload, setActionPayload] = useState('');
  const [platform, setPlatform] = useState<AutomationRule['platform']>('all');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName.trim()) return;

    createAutomationRule({
      clientId: currentClient?.id,
      name: ruleName.trim(),
      platform,
      trigger: ruleTrigger,
      condition: triggerKeyword ? `Message contains "${triggerKeyword}"` : undefined,
      action: ruleAction,
      actionPayload: actionPayload.trim(),
      enabled: true,
      executionCount: 0,
      createdAt: new Date().toISOString()
    });

    setRuleName('');
    setTriggerKeyword('');
    setActionPayload('');
    setShowCreateModal(false);
  };

  const prebuiltRecipes = [
    {
      title: 'Instagram Instant Lead DM from Reel Comments',
      desc: 'When users comment "PRICE" or "DEMO" on any Instagram reel, automatically send them the brochure link via Instagram DM.',
      platform: 'instagram' as const,
      trigger: 'comment_keyword' as const,
      keyword: 'PRICE, DEMO',
      action: 'reply_message' as const,
      response: 'Hey! Thanks for your interest in our services. Here is our direct brochure and catalog link: https://gwaliorweblabs.com'
    },
    {
      title: 'WhatsApp Business 24/7 Welcome Protocol',
      desc: 'Instantly acknowledge first-time inbound WhatsApp queries with agency hours and emergency hotline (+91 75879 39722).',
      platform: 'whatsapp' as const,
      trigger: 'new_conversation' as const,
      keyword: 'First message',
      action: 'reply_message' as const,
      response: 'Namaste! Welcome to Gwalior Web Labs. We have received your query. An account manager will connect shortly. For urgent inquiries call +91 75879 39722.'
    },
    {
      title: 'High-Intent Customer Auto-Tagging',
      desc: 'Automatically tag conversations as "VIP Lead" whenever keywords like "budget", "quote", or "enterprise" are detected.',
      platform: 'all' as const,
      trigger: 'keyword_match' as const,
      keyword: 'quote, budget, proposal',
      action: 'tag_customer' as const,
      response: 'VIP_LEAD'
    },
    {
      title: 'Round-Robin Lead Assignment',
      desc: 'Automatically assign incoming queries to on-duty team members to ensure response time stays below 5 minutes.',
      platform: 'all' as const,
      trigger: 'new_conversation' as const,
      keyword: 'Inbound message',
      action: 'assign_agent' as const,
      response: 'Round-robin to Online Support'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Zap className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Automation Center</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Build compliant visual Trigger &rarr; Condition &rarr; Action workflows across WhatsApp, Instagram, Messenger, and Telegram.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('workflows')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'workflows' ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Active Workflows ({clientRules.length})
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'recipes' ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Recipes &amp; Templates
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'logs' ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Execution Logs
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Rule</span>
          </button>
        </div>
      </div>

      {/* Compliance Note */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-blue-300">Platform Policy Guard: </span>
          All automations respect Meta&apos;s 24-hour messaging window, WhatsApp Business template policies, and Instagram anti-spam rate limits. Automated unsolicited cold direct messages are strictly disabled to protect client account health.
        </div>
      </div>

      {/* TAB 1: WORKFLOWS */}
      {activeTab === 'workflows' && (
        <div className="space-y-4">
          {clientRules.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
              <Zap className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">No automation workflows configured</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Set up auto-replies, keyword triggers, or team assignment rules for {currentClient?.name || 'this workspace'}.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" /> Create First Rule
              </button>
            </div>
          ) : (
            clientRules.map((rule) => (
              <div 
                key={rule.id}
                className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all hover:border-slate-300 dark:hover:border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs"
              >
                {/* Left: Info & Workflow Blocks */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${rule.enabled ? 'bg-emerald-500 dark:bg-emerald-400 shadow-md shadow-emerald-500/50' : 'bg-slate-400 dark:bg-slate-600'}`} />
                    <h3 className="font-semibold text-slate-900 dark:text-white text-base">{rule.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {rule.platform}
                    </span>
                  </div>

                  {/* Visual Node Flow */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                    {/* Trigger block */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Trigger: {rule.trigger.replace('_', ' ')}</span>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />

                    {/* Condition block */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-medium">
                      <Filter className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>If: {rule.condition || 'Always True'}</span>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />

                    {/* Action block */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-medium max-w-xs truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="truncate">Then: {rule.action.replace('_', ' ')} &rarr; &quot;{rule.actionPayload}&quot;</span>
                    </div>
                  </div>
                </div>

                {/* Right: Metrics & Controls */}
                <div className="flex items-center gap-6 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200 dark:border-slate-800 justify-between lg:justify-end">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Runs</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{rule.executionCount.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAutomationRule(rule.id)}
                      className={`p-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                        rule.enabled 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20' 
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title={rule.enabled ? 'Pause Workflow' : 'Activate Workflow'}
                    >
                      {rule.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => deleteAutomationRule(rule.id)}
                      className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                      title="Delete Rule"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: RECIPES */}
      {activeTab === 'recipes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prebuiltRecipes.map((recipe, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    {recipe.platform}
                  </span>
                  <span className="text-xs text-slate-500">Official Template</span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-base">{recipe.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{recipe.desc}</p>
                
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  &quot;{recipe.response}&quot;
                </div>
              </div>

              <button
                onClick={() => {
                  createAutomationRule({
                    clientId: currentClient?.id,
                    name: recipe.title,
                    platform: recipe.platform,
                    trigger: recipe.trigger,
                    condition: `Message contains "${recipe.keyword}"`,
                    action: recipe.action,
                    actionPayload: recipe.response,
                    enabled: true,
                    executionCount: 0,
                    createdAt: new Date().toISOString()
                  });
                  setActiveTab('workflows');
                }}
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Install Recipe to Workspace</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Real-time Automation Audit Trail</h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live webhook listener active
            </span>
          </div>

          <div className="divide-y divide-slate-800/60 font-mono text-xs">
            {[
              { time: '2 mins ago', rule: 'Instagram Auto-Lead Response', event: 'Keyword match: "FEES"', status: 'Executed', latency: '42ms' },
              { time: '14 mins ago', rule: 'WhatsApp Business 24/7 Welcome', event: 'New contact: +91 94251 *****', status: 'Executed', latency: '68ms' },
              { time: '41 mins ago', rule: 'High-Intent Customer Auto-Tagging', event: 'Customer inquiry tagged [VIP_LEAD]', status: 'Executed', latency: '21ms' },
              { time: '1 hour ago', rule: 'Round-Robin Lead Assignment', event: 'Assigned thread #INB-9842 to Rohit V.', status: 'Executed', latency: '35ms' },
              { time: '2 hours ago', rule: 'Instagram Auto-Lead Response', event: 'Keyword match: "DEMO"', status: 'Executed', latency: '54ms' },
            ].map((log, index) => (
              <div key={index} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/30 transition-all">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-white font-medium">{log.rule}</span>
                    <span className="text-slate-500 ml-2">&rarr; {log.event}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-400 shrink-0 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {log.status} ({log.latency})
                  </span>
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE RULE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create Automation Workflow</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Design a trigger-condition-action workflow</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-800 dark:hover:text-white text-lg font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Workflow Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., WhatsApp After-Hours Auto Responder"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">All Channels</option>
                    <option value="instagram">Instagram</option>
                    <option value="whatsapp">WhatsApp Business</option>
                    <option value="facebook">Facebook Messenger</option>
                    <option value="telegram">Telegram</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Trigger Event</label>
                  <select
                    value={ruleTrigger}
                    onChange={(e) => setRuleTrigger(e.target.value as any)}
                    className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="keyword_match">Keyword Match in Message</option>
                    <option value="comment_keyword">Comment Contains Keyword</option>
                    <option value="new_conversation">First Inbound Contact</option>
                    <option value="unanswered_time">No Reply within 15 Minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Trigger Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., price, cost, demo, contact, quotation"
                  value={triggerKeyword}
                  onChange={(e) => setTriggerKeyword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Action to Execute</label>
                <select
                  value={ruleAction}
                  onChange={(e) => setRuleAction(e.target.value as any)}
                  className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="reply_message">Send Automated Reply Message</option>
                  <option value="tag_customer">Tag Customer Profile</option>
                  <option value="assign_agent">Assign to Dedicated Team Member</option>
                  <option value="create_lead">Push Lead to CRM / Webhook</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Action Content / Message / Tag
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter the automated response message or tag value..."
                  value={actionPayload}
                  onChange={(e) => setActionPayload(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  Save &amp; Activate Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
