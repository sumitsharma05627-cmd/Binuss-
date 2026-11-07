import React from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Key, 
  Building2,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useSocialCommand } from '../../context/SocialCommandContext';

export const UserProfileModal: React.FC = () => {
  const { 
    isProfileModalOpen, 
    closeProfileModal, 
    currentUser, 
    logout, 
    deleteAccount,
    openAuthModal, 
    openOnboarding,
    clientWorkspaces 
  } = useSocialCommand();

  if (!isProfileModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProfileModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Avatar & Name */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 p-1 flex items-center justify-center shrink-0">
            <img
              src={currentUser.avatar || '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png'}
              alt={currentUser.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{currentUser.name}</h2>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-500/30">
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        {/* Profile Details List */}
        <div className="space-y-3 mb-6 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Active Client Workspaces</span>
            </div>
            <span className="font-bold text-white">{clientWorkspaces.length} Managed</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security &amp; Encryption</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">Node Scrypt 64-Byte Salted</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Session Status</span>
            </div>
            <span className="text-[11px] text-slate-300">Authenticated Active</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              closeProfileModal();
              openOnboarding();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Launch Onboarding Setup Wizard Again</span>
          </button>

          <button
            onClick={async () => {
              closeProfileModal();
              await logout();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Sign Out to Public Page</span>
          </button>

          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                if (window.confirm("CRITICAL WARNING: Are you sure you want to permanently delete your account?\n\nThis will permanently purge your workspace, all connected social accounts, scheduled posts, analytics, and client data from the database. This action CANNOT be undone.")) {
                  deleteAccount().then((res) => {
                    if (res.success) {
                      closeProfileModal();
                    } else {
                      alert(res.error || 'Failed to delete account');
                    }
                  });
                }
              }}
              className="w-full py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Permanently Delete My Account &amp; Workspace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
