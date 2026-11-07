import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { ClientWorkspace, UserRole } from '../../types';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import {
  Users,
  Plus,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  FileCheck,
  Trash2,
  Edit,
  X,
  Mail,
  Phone,
  Globe,
  Lock,
  ArrowRight
} from 'lucide-react';

export const ClientManagementView: React.FC = () => {
  const {
    clientWorkspaces,
    addClientWorkspace,
    updateClientWorkspace,
    deleteClientWorkspace,
    socialAccounts,
    posts,
    approvePost,
    requestChangesOnPost,
    teamMembers,
    activeClientId,
    setActiveClientId,
    setActiveSection,
    userUsage,
    openPaywall
  } = useSocialCommand();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newIndustry, setNewIndustry] = useState('Healthcare & Clinics');
  const [newWebsite, setNewWebsite] = useState('https://');
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newPlanTier, setNewPlanTier] = useState<'starter' | 'professional' | 'agency' | 'enterprise'>('professional');
  const [newApprovalRequired, setNewApprovalRequired] = useState(true);

  // Client approval comment state
  const [reviewComment, setReviewComment] = useState('');
  const [activeReviewPostId, setActiveReviewPostId] = useState<string | null>(null);

  const pendingApprovalPosts = posts.filter((p) => p.status === 'pending_approval');

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newCompanyName.trim()) return;

    addClientWorkspace({
      name: newClientName.trim(),
      companyName: newCompanyName.trim(),
      slug: newClientName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      logoUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&q=80',
      industry: newIndustry,
      website: newWebsite,
      primaryContact: {
        name: newContactName || 'Director',
        email: newContactEmail || 'director@client.com',
        phone: newContactPhone || '+91 98000 00000'
      },
      planTier: newPlanTier,
      accountIds: [],
      assignedTeamMemberIds: ['user-1'],
      approvalRequired: newApprovalRequired,
      brandColors: {
        primary: '#3b82f6',
        secondary: '#10b981'
      }
    });

    setIsAddModalOpen(false);
    setNewClientName('');
    setNewCompanyName('');
    setNewContactName('');
    setNewContactEmail('');
    setNewContactPhone('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#090f1f] border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold">
              Agency Multi-Tenancy Architecture
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Isolated Workspaces & Role-Based Access Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client Workspaces & Approvals Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Manage distinct client organizations, assign agency team members, track client-specific performance, and handle approval queues with full isolation.
          </p>
        </div>

        <button
          onClick={() => {
            if (userUsage && !userUsage.canCreateWorkspace) {
              openPaywall({
                title: 'Client Workspace Limit Reached',
                description: `Your active plan allows up to ${userUsage.clientWorkspacesLimit} client workspaces. Upgrade to Professional or Agency to manage additional multi-tenant brand accounts with isolated approval flows.`,
                recommendedPlanId: 'professional',
                usageSnippet: `${userUsage.clientWorkspacesCount} of ${userUsage.clientWorkspacesLimit} client workspaces used`
              });
              return;
            }
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-blue-500/20 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Pending Client Approvals Queue (High Priority Banner if pending) */}
      {pendingApprovalPosts.length > 0 && (
        <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Client Review & Approval Queue ({pendingApprovalPosts.length} Items Pending)</span>
            </div>
            <span className="text-xs font-mono text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-500/20">
              Agency Mode Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingApprovalPosts.map((post) => {
              const client = clientWorkspaces.find((c) => c.id === post.clientId);
              return (
                <div
                  key={post.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#090e1a] border border-amber-200 dark:border-amber-500/30 space-y-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{client?.name}</span>
                    <span className="text-slate-400 font-mono text-[10px]">
                      Created by {post.authorName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{post.caption}</p>

                  {post.clientComments && post.clientComments.length > 0 && (
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-200">
                      <strong>Client Note:</strong> {post.clientComments[0]}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        const comment = prompt('Enter change request notes for your content team:');
                        if (comment) requestChangesOnPost(post.id, comment);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
                    >
                      Request Changes
                    </button>
                    <button
                      onClick={() => approvePost(post.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Schedule</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Client Workspaces Cards Grid */}
      {clientWorkspaces.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#090f1f] border border-dashed border-slate-300 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No client workspaces created yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
              Organize multiple brands, clients, or internal business units into isolated workspaces with separate channels, permissions, and approval flows.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Workspace</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientWorkspaces.map((client) => {
          const clientAccounts = socialAccounts.filter((a) => a.clientId === client.id);
          const clientPosts = posts.filter((p) => p.clientId === client.id);
          const isCurrentActive = activeClientId === client.id;
          const assignedMembers = teamMembers.filter((m) => client.assignedTeamMemberIds.includes(m.id));

          return (
            <div
              key={client.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                isCurrentActive
                  ? 'bg-blue-50/50 dark:bg-[#0f172a] border-blue-500/60 shadow-xl ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-[#080d19] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-md'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">{client.name}</h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{client.companyName}</div>
                      <div className="text-[10px] text-sky-600 dark:text-sky-400 font-mono mt-0.5">{client.industry}</div>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300 font-mono text-[10px] uppercase font-bold">
                    {client.planTier}
                  </span>
                </div>

                {/* Workspace Statistics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center mb-4 text-xs">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400 text-[10px]">Connected</div>
                    <div className="font-bold text-slate-900 dark:text-white font-mono mt-0.5">{clientAccounts.length} Accounts</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Posts</div>
                    <div className="font-bold text-white font-mono mt-0.5">{clientPosts.length}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Approval</div>
                    <div className="font-bold text-emerald-400 font-mono mt-0.5">
                      {client.approvalRequired ? 'Required' : 'Auto'}
                    </div>
                  </div>
                </div>

                {/* Primary Contact details */}
                <div className="p-3 rounded-xl bg-slate-900/30 border border-slate-800/80 text-xs text-slate-300 space-y-1 mb-4">
                  <div className="text-slate-400 text-[10px] font-mono uppercase">Primary Stakeholder:</div>
                  <div className="font-bold text-white">{client.primaryContact.name}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>{client.primaryContact.email}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{client.primaryContact.phone}</span>
                  </div>
                </div>

                {/* Assigned Team Members Avatars */}
                <div className="mb-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1.5">
                    Assigned Agency Team ({assignedMembers.length}):
                  </div>
                  <div className="flex items-center gap-1.5">
                    {assignedMembers.map((m) => (
                      <img
                        key={m.id}
                        src={m.avatarUrl}
                        alt={m.name}
                        title={`${m.name} (${m.role.replace('_', ' ')})`}
                        className="w-7 h-7 rounded-full object-cover border border-slate-700"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveClientId(client.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrentActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span>{isCurrentActive ? 'Active Workspace' : 'Switch Workspace'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete workspace "${client.name}"? All associated posts and configurations will be removed.`)) {
                        deleteClientWorkspace(client.id);
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete Client Workspace"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveClientId(client.id);
                      setActiveSection('publishing');
                    }}
                    className="text-slate-400 hover:text-emerald-400 font-semibold cursor-pointer"
                  >
                    Manage Posts
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-xl bg-[#090f1f] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">Create Client Workspace</h3>
                <div className="text-xs text-slate-400">Establish isolated client organization and RBAC profile</div>
              </div>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Workspace Name:</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Apex Media Agency"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Legal Company Name:</label>
                  <input
                    type="text"
                    required
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="e.g. Apex Global Enterprises"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Industry:</label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Education & Academic Coaching">Education & Coaching</option>
                    <option value="Healthcare & Clinical Practice">Healthcare & Clinic</option>
                    <option value="Real Estate & Infrastructure">Real Estate</option>
                    <option value="E-Commerce & Retail">E-Commerce</option>
                    <option value="Software & Cloud Tech">Software & Cloud Tech</option>
                    <option value="Creator & Media Brand">Creator & Influencer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Website:</label>
                  <input
                    type="url"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-slate-200">Primary Client Stakeholder</div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newContactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp Phone"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="font-bold text-white text-xs">Require Client Approval Before Broadcast</div>
                  <div className="text-[10px] text-slate-400">Posts scheduled by creators must be approved by the client</div>
                </div>
                <input
                  type="checkbox"
                  checked={newApprovalRequired}
                  onChange={(e) => setNewApprovalRequired(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold cursor-pointer shadow-md"
                >
                  Provision Client Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
