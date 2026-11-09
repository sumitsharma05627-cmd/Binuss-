import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { UserRole, TeamMember } from '../../types';
import { 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Mail, 
  CheckCircle, 
  XCircle, 
  MoreVertical,
  Building,
  Key,
  Lock,
  Edit2
} from 'lucide-react';

export const TeamManagementView: React.FC = () => {
  const { currentClient, clients, currentUser } = useSocialCommand();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('gwl_social_team_members');
      if (saved) return JSON.parse(saved);
    } catch {}
    if (currentUser) {
      return [
        {
          id: currentUser.id || 'tm-owner',
          name: currentUser.name || 'Workspace Owner',
          email: currentUser.email || 'user@example.com',
          avatarUrl: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          role: currentUser.role || 'agency_admin',
          assignedClientIds: clients.length > 0 ? clients.map(c => c.id) : ['workspace-default'],
          status: 'active'
        }
      ];
    }
    return [];
  });

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('content_creator');
  const [inviteClientId, setInviteClientId] = useState<string>(currentClient?.id || (clients[0]?.id || 'workspace-default'));

  const roleDefinitions: Record<UserRole, { label: string; color: string; desc: string }> = {
    super_admin: {
      label: 'Super Admin',
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      desc: 'Unrestricted access to all agency clients, billing, API credentials, and developer settings.'
    },
    agency_admin: {
      label: 'Agency Admin',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      desc: 'Manages multiple assigned client accounts, oversees teams, and approves social campaigns.'
    },
    manager: {
      label: 'Campaign Manager',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      desc: 'Schedules posts, reviews drafts, delegates inbox threads, and exports analytical reports.'
    },
    content_creator: {
      label: 'Content Creator',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      desc: 'Creates drafts in Publishing Studio, uploads assets, and requests manager/client approval.'
    },
    customer_support: {
      label: 'Customer Support',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      desc: 'Replies to Unified Inbox inquiries across WhatsApp, Instagram, and Messenger.'
    },
    client: {
      label: 'Client Portal View',
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      desc: 'Strictly restricted to their own single client workspace. Can view metrics and approve posts.'
    }
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      role: inviteRole,
      assignedClientIds: [inviteClientId],
      status: 'invited'
    };

    setTeamMembers(prev => {
      const updated = [...prev, newMember];
      try {
        localStorage.setItem('gwl_social_team_members', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setInviteName('');
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Team &amp; Role-Based Access Control</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Manage agency personnel, client reviewers, and granular permissions across workspaces.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-600/20"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Permissions Matrix Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['super_admin', 'agency_admin', 'content_creator'].map((roleKey) => {
          const role = roleDefinitions[roleKey as UserRole];
          return (
            <div key={roleKey} className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${role.color}`}>
                  {role.label}
                </span>
                <ShieldCheck className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{role.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Team Roster */}
      <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Active Agency &amp; Client Users</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Showing {teamMembers.length} users with assigned workspace permissions</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400" /> Active
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 dark:bg-amber-400 ml-2" /> Invited
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Accessible Workspaces</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {teamMembers.map((member) => {
                const role = roleDefinitions[member.role];
                return (
                  <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{member.name}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">{member.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${role.color}`}>
                        {role.label}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {member.assignedClientIds.map((cId) => {
                          const client = clients.find(c => c.id === cId);
                          return (
                            <span
                              key={cId}
                              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px]"
                            >
                              {client?.name || cId}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        member.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-amber-500 dark:bg-amber-400'}`} />
                        {member.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                          title="Edit Permissions"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVITE MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Invite Team Member</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Assign agency role and workspace permissions</p>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-slate-400 hover:text-slate-800 dark:hover:text-white text-lg font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rohit V."
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@gwaliorweblabs.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Role Assignment</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as UserRole)}
                  className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="content_creator">Content Creator (Drafts &amp; Media)</option>
                  <option value="customer_support">Customer Support (Inbox &amp; Replies)</option>
                  <option value="manager">Campaign Manager (Publishing &amp; Analytics)</option>
                  <option value="agency_admin">Agency Admin (Multi-Client Supervisor)</option>
                  <option value="client">Client Portal Reviewer (Restricted View)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Workspace</label>
                <select
                  value={inviteClientId}
                  onChange={(e) => setInviteClientId(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-md shadow-purple-600/20 cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
