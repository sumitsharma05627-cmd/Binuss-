import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { InboxConversation, SocialPlatformType } from '../../types';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  User,
  Tag,
  Send,
  Sparkles,
  Paperclip,
  Smile,
  ShieldCheck,
  Check,
  Plus,
  X,
  FileText,
  AlertCircle,
  HelpCircle,
  Archive,
  MoreVertical,
  ChevronRight,
  Inbox
} from 'lucide-react';

export const UnifiedInboxView: React.FC = () => {
  const {
    currentUser,
    conversations,
    sendReplyMessage,
    addInternalNote,
    assignConversation,
    updateConversationStatus,
    addConversationTag,
    teamMembers,
    activeClientId,
    clientWorkspaces
  } = useSocialCommand();

  const [selectedConversationId, setSelectedConversationId] = useState<string>(conversations[0]?.id || '');
  const [activePlatformFilter, setActivePlatformFilter] = useState<SocialPlatformType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [activeRightTab, setActiveRightTab] = useState<'profile' | 'notes' | 'templates'>('profile');
  const [newNoteInput, setNewNoteInput] = useState('');
  const [newTagInput, setNewTagInput] = useState('');

  // Professional Customer Support Templates
  const savedReplies = [
    {
      title: 'Standard Greeting & Welcome',
      text: 'Hello! Thank you for reaching out. How can our team assist you today?'
    },
    {
      title: 'Business Hours & Support Schedule',
      text: 'Thank you for contacting us! Our team is available Monday through Friday, 9:00 AM to 6:00 PM. We will review your message and reply promptly.'
    },
    {
      title: 'Consultation & Meeting Request',
      text: 'We would love to schedule a quick 15-minute consultation to understand your goals. What day and time works best for you this week?'
    },
    {
      title: 'Inquiry Follow-up',
      text: 'Following up on your inquiry. Please let us know if you need any additional details or assistance.'
    }
  ];

  const filteredConversations = conversations
    .filter((c) => (activeClientId === 'all' ? true : c.clientId === activeClientId))
    .filter((c) => (activePlatformFilter === 'all' ? true : c.platform === activePlatformFilter))
    .filter((c) => (statusFilter === 'all' ? true : c.status === statusFilter))
    .filter((c) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.customer.name.toLowerCase().includes(q) ||
        c.customer.handle.toLowerCase().includes(q) ||
        c.lastMessageSnippet.toLowerCase().includes(q) ||
        c.customer.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

  const activeConversation = conversations.find((c) => c.id === selectedConversationId) || filteredConversations[0] || null;

  const handleSendReply = () => {
    if (!replyInput.trim() || !activeConversation) return;
    sendReplyMessage(activeConversation.id, replyInput.trim());
    setReplyInput('');
  };

  const handleAddNote = () => {
    if (!newNoteInput.trim() || !activeConversation) return;
    addInternalNote(activeConversation.id, newNoteInput.trim(), currentUser?.name || 'Workspace Member');
    setNewNoteInput('');
  };

  const handleAddTag = () => {
    if (!newTagInput.trim() || !activeConversation) return;
    addConversationTag(activeConversation.id, newTagInput.trim());
    setNewTagInput('');
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-[#090f1f] border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              Centralized Customer Support & CRM
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Meta, WhatsApp, YouTube, X, Reddit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Unified Social Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Triage, respond, assign, and convert conversations from Instagram DMs, WhatsApp Business, Facebook Messenger, and YouTube comments from one screen.
          </p>
        </div>

        {/* Official API Clarification Note */}
        <div className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 max-w-xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Meta Cloud API</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Powered strictly via official business webhooks. Personal numbers/unsupported private chats are not intercepted.
          </p>
        </div>
      </div>

      {/* Main 3-Column Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[720px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060a14] shadow-xl dark:shadow-2xl">
        {/* =========================================================================
            COLUMN 1: Conversation List (3.5 cols)
           ========================================================================= */}
        <div className="lg:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full bg-slate-50/50 dark:bg-[#080d19]">
          {/* Search & Platform Filter Pills */}
          <div className="p-3.5 border-b border-slate-800 space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads, DMs, phone, tags..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            {/* Platform Filter Horizontal Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                onClick={() => setActivePlatformFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 cursor-pointer ${
                  activePlatformFilter === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                }`}
              >
                All
              </button>
              {(['whatsapp', 'instagram', 'facebook', 'youtube', 'reddit'] as SocialPlatformType[]).map((p) => {
                const meta = PLATFORM_REGISTRY[p];
                const isActive = activePlatformFilter === p;
                return (
                  <button
                    key={p}
                    onClick={() => setActivePlatformFilter(p)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 cursor-pointer ${
                      isActive
                        ? `${meta.bgBadge} ${meta.textColor} border ${meta.borderBadge}`
                        : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                    }`}
                  >
                    {getPlatformIcon(p, 'w-3 h-3')}
                    <span>{meta.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conversations Scrollable Stream */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No conversations match current filters.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = activeConversation?.id === conv.id;
                const meta = PLATFORM_REGISTRY[conv.platform];

                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversationId(conv.id)}
                    className={`p-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0f172a] border-l-4 border-emerald-400'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            src={conv.customer.avatarUrl}
                            alt={conv.customer.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-700"
                          />
                          <span
                            className={`absolute -bottom-1 -right-1 p-0.5 rounded-full ${meta.bgBadge} ${meta.textColor} border border-slate-900`}
                          >
                            {getPlatformIcon(conv.platform, 'w-2.5 h-2.5')}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-white truncate flex items-center gap-1.5">
                            <span>{conv.customer.name}</span>
                            {conv.customer.sentiment === 'urgent' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono truncate">
                            {conv.customer.handle}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[10px] font-mono text-slate-500">{conv.lastMessageTimestamp}</div>
                        {conv.unreadCount > 0 && (
                          <span className="inline-block px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-mono font-extrabold text-[9px] mt-0.5">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-1 mt-1 leading-snug">
                      {conv.lastMessageSnippet}
                    </p>

                    {/* Customer Tags */}
                    {conv.customer.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {conv.customer.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 text-[9px] font-mono border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* =========================================================================
            COLUMN 2: Chat Thread & Response Composer (5.5 cols)
           ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col h-full bg-[#070b16] border-r border-slate-800">
          {activeConversation ? (
            <>
              {/* Thread Header */}
              <div className="p-3.5 border-b border-slate-800 bg-[#090f1f] flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={activeConversation.customer.avatarUrl}
                    alt={activeConversation.customer.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-700"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm text-white truncate flex items-center gap-1.5">
                      <span>{activeConversation.customer.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 font-mono">
                        {activeConversation.platform.toUpperCase()}
                      </span>
                    </h3>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Customer Verified via Official Webhook</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateConversationStatus(
                        activeConversation.id,
                        activeConversation.status === 'resolved' ? 'open' : 'resolved'
                      )
                    }
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                      activeConversation.status === 'resolved'
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{activeConversation.status === 'resolved' ? 'Reopen' : 'Mark Resolved'}</span>
                  </button>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeConversation.messages.map((msg) => {
                  const isAgent = msg.sender === 'agent' || msg.sender === 'bot';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-slate-400 mb-1 font-mono">
                        {msg.senderName} • {msg.timestamp}
                      </div>
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isAgent
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-xs shadow-md'
                            : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Response Composer */}
              <div className="p-3 border-t border-slate-800 bg-[#090f1f] space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Replying as: <strong>{currentUser?.name || 'Support Agent'} ({currentUser?.role ? currentUser.role.replace('_', ' ') : 'Member'})</strong></span>
                  </span>
                  <button
                    onClick={() => setActiveRightTab('templates')}
                    className="text-sky-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Insert Saved Reply</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <textarea
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                    placeholder={`Write official reply to ${activeConversation.customer.name}... (Press Enter to send)`}
                    rows={2}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none font-sans"
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={!replyInput.trim()}
                    className="h-10 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs disabled:opacity-40 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-slate-500">
              Select a conversation from the left stream to inspect messages.
            </div>
          )}
        </div>

        {/* =========================================================================
            COLUMN 3: Customer Profile, Internal Notes & Templates (3 cols)
           ========================================================================= */}
        <div className="lg:col-span-3 flex flex-col h-full bg-[#080d19] overflow-y-auto">
          {activeConversation ? (
            <>
              {/* Tab Selector */}
              <div className="flex border-b border-slate-800 p-2 gap-1 bg-[#090f1f]">
                <button
                  onClick={() => setActiveRightTab('profile')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeRightTab === 'profile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveRightTab('notes')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeRightTab === 'notes' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Notes ({activeConversation.internalNotes.length})
                </button>
                <button
                  onClick={() => setActiveRightTab('templates')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeRightTab === 'templates' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Templates
                </button>
              </div>

              {/* Tab 1: Customer Profile */}
              {activeRightTab === 'profile' && (
                <div className="p-4 space-y-4 text-xs">
                  <div className="text-center pb-3 border-b border-slate-800">
                    <img
                      src={activeConversation.customer.avatarUrl}
                      alt={activeConversation.customer.name}
                      className="w-16 h-16 rounded-2xl mx-auto object-cover border border-slate-700 shadow-lg mb-2"
                    />
                    <h3 className="font-bold text-sm text-white">{activeConversation.customer.name}</h3>
                    <div className="text-slate-400 font-mono text-[11px]">{activeConversation.customer.handle}</div>
                    {activeConversation.customer.lifetimeOrdersOrValue && (
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                        {activeConversation.customer.lifetimeOrdersOrValue}
                      </span>
                    )}
                  </div>

                  {/* Assign to Team Member */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                      Assigned Agent:
                    </label>
                    <select
                      value={activeConversation.assignedTo || ''}
                      onChange={(e) => assignConversation(activeConversation.id, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                    >
                      <option value="">Unassigned</option>
                      {teamMembers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.role.replace('_', ' ')})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Contact Details */}
                  <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="font-bold text-slate-200">Contact Details</div>
                    <div className="text-[11px] text-slate-300">
                      <div className="text-slate-500 text-[10px]">Phone / WhatsApp:</div>
                      <div>{activeConversation.customer.phone || 'Direct Social DM'}</div>
                    </div>
                    {activeConversation.customer.email && (
                      <div className="text-[11px] text-slate-300">
                        <div className="text-slate-500 text-[10px]">Email:</div>
                        <div className="truncate">{activeConversation.customer.email}</div>
                      </div>
                    )}
                  </div>

                  {/* Tags Manager */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5">
                      Customer Labels & Tags:
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {activeConversation.customer.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-800 text-sky-300 font-mono text-[10px] border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        placeholder="Add tag (e.g. VIP Lead)..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Internal Notes (Private to Agency Team) */}
              {activeRightTab === 'notes' && (
                <div className="p-4 space-y-3 text-xs flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5 overflow-y-auto">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Internal Notes are 100% private to your team and invisible to the client.</span>
                    </div>

                    {activeConversation.internalNotes.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-xs">No internal notes yet.</div>
                    ) : (
                      activeConversation.internalNotes.map((note) => (
                        <div
                          key={note.id}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1"
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                            <span className="font-bold text-slate-200">{note.authorName}</span>
                            <span>{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed text-[11px]">{note.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <textarea
                      value={newNoteInput}
                      onChange={(e) => setNewNoteInput(e.target.value)}
                      placeholder="Add private note for team members..."
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white resize-none"
                    />
                    <button
                      onClick={handleAddNote}
                      disabled={!newNoteInput.trim()}
                      className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs disabled:opacity-50 cursor-pointer"
                    >
                      Post Internal Note
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Quick Reply Templates */}
              {activeRightTab === 'templates' && (
                <div className="p-4 space-y-2.5 text-xs overflow-y-auto">
                  <div className="text-slate-400 text-[11px]">
                    Tap any verified template to immediately populate into response composer:
                  </div>

                  {savedReplies.map((reply, idx) => (
                    <div
                      key={idx}
                      onClick={() => setReplyInput(reply.text)}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all cursor-pointer space-y-1"
                    >
                      <div className="font-bold text-white text-[11px] flex items-center justify-between">
                        <span>{reply.title}</span>
                        <span className="text-[9px] text-emerald-400 font-mono">Insert →</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
              <Inbox className="w-12 h-12 text-slate-600 mb-3 opacity-60" />
              <h3 className="text-base font-semibold text-slate-200">No incoming messages yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Direct messages, comments, and customer inquiries from your connected social channels will sync here automatically in real time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
