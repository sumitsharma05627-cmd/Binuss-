import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  Globe, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  KeyRound
} from 'lucide-react';
import { useSocialCommand } from '../../context/SocialCommandContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalView, 
    setAuthModalView,
    login,
    register,
    verifyEmailPin,
    loginAsDemo,
    pendingVerificationEmail
  } = useSocialCommand();

  // Mode: 'login' | 'register' | 'forgot' | 'verify'
  const currentView = authModalView;

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register specific
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [accountType, setAccountType] = useState<
    'individual' | 'freelancer' | 'agency' | 'business_owner' | 'marketing_team'
  >('agency');

  // Verification PIN
  const [pin, setPin] = useState('');
  const [lastGeneratedPin, setLastGeneratedPin] = useState<string | null>(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        closeAuthModal();
      } else {
        setErrorMessage(res.error || 'Invalid email or password.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        name,
        email,
        password,
        phone,
        country,
        accountType
      });

      if (res.success) {
        if (res.verificationPin) {
          setLastGeneratedPin(res.verificationPin);
        }
        setSuccessMessage('Account created! Please verify your 6-digit PIN code.');
        setAuthModalView('verify');
      } else {
        setErrorMessage(res.error || 'Registration failed.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await verifyEmailPin(pin);
      if (res.success) {
        setSuccessMessage('Email verified successfully! Loading your workspace...');
        setTimeout(() => {
          closeAuthModal();
        }, 1000);
      } else {
        setErrorMessage(res.error || 'Invalid PIN code. Try 123456 or the code shown.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email address first.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/social/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.pinDemo) {
        setLastGeneratedPin(data.pinDemo);
        setSuccessMessage(`Reset code generated: ${data.pinDemo}. Enter it to continue.`);
      } else {
        setSuccessMessage(data.message || 'Password reset code dispatched.');
      }
    } catch (err: any) {
      setErrorMessage('Failed to request reset code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-lg my-8 bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Crest & Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 p-1 flex items-center justify-center">
            <img
              src="/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png"
              alt="GWL Crest"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-black text-lg text-white tracking-tight">Gwalior Web Labs</h3>
            <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Social Command Center</p>
          </div>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* VIEW 1: SIGN IN (LOGIN) */}
        {currentView === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white">Sign In to Command Center</h2>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  setAuthModalView('register');
                }}
                className="text-xs text-cyan-400 hover:underline font-semibold cursor-pointer"
              >
                Create Account &rarr;
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setAuthModalView('forgot');
                  }}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Instant Logins */}
            <div className="pt-3 border-t border-slate-800">
              <p className="text-[11px] text-slate-400 font-mono uppercase mb-2 text-center">
                Instant 1-Click Sandbox Credentials
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginAsDemo('super_admin')}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-300 hover:text-white font-semibold transition-all text-left flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <div className="font-bold text-white text-[11px]">Super Admin</div>
                    <div className="text-[9px] text-slate-400">Sumit Sharma (HQ)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAsDemo('agency_admin')}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-300 hover:text-white font-semibold transition-all text-left flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <div className="font-bold text-white text-[11px]">Agency Admin</div>
                    <div className="text-[9px] text-slate-400">Aarav Gupta</div>
                  </div>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* VIEW 2: CREATE ACCOUNT (REGISTRATION) */}
        {currentView === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white">Create New Workspace</h2>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  setAuthModalView('login');
                }}
                className="text-xs text-cyan-400 hover:underline font-semibold cursor-pointer"
              >
                &larr; Back to Sign In
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sumit Sharma"
                    className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 75879 39722"
                    className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Country</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="India"
                    className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* 5 Distinct Account Types */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Account Type</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as any)}
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white cursor-pointer"
              >
                <option value="agency">3. Digital Marketing Agency (Multi-Client &amp; Team)</option>
                <option value="freelancer">2. Freelancer (Multi-Channel Solo)</option>
                <option value="business_owner">4. Business Owner (In-House Brand)</option>
                <option value="individual">1. Individual Marketer / Creator</option>
                <option value="marketing_team">5. Marketing Team (Enterprise Department)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? <span>Creating Workspace...</span> : <span>Create Account &amp; Continue &rarr;</span>}
            </button>
          </form>
        )}

        {/* VIEW 3: EMAIL VERIFICATION */}
        {currentView === 'verify' && (
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Enter 6-Digit Verification PIN</h2>
              <p className="text-xs text-slate-400">
                A verification PIN was dispatched for <strong className="text-white">{pendingVerificationEmail || email || 'your account'}</strong>.
              </p>
            </div>

            {lastGeneratedPin && (
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/30 text-center">
                <div className="text-[10px] text-cyan-300 font-mono uppercase">Simulation Sandbox Code:</div>
                <div className="text-2xl font-black text-white tracking-widest my-1">{lastGeneratedPin}</div>
                <button
                  type="button"
                  onClick={() => setPin(lastGeneratedPin)}
                  className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                >
                  Click to Auto-Fill PIN &rarr;
                </button>
              </div>
            )}

            <div>
              <input
                type="text"
                required
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="123456"
                className="w-full bg-slate-950 border border-slate-700 text-center text-2xl font-mono tracking-widest text-cyan-400 py-3 rounded-xl focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading || pin.length < 4}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? <span>Verifying PIN...</span> : <span>Confirm &amp; Proceed to Onboarding &rarr;</span>}
            </button>
          </form>
        )}

        {/* VIEW 4: FORGOT PASSWORD */}
        {currentView === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Reset Your Password</h2>
              <p className="text-xs text-slate-400 mb-3">
                Enter your registered email. We will generate an authentic verification PIN to reset your credentials.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Account Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gwaliorweblabs@gmail.com"
                  className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            {lastGeneratedPin && (
              <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs">
                <div>Recovery PIN: <strong className="font-mono text-white text-base">{lastGeneratedPin}</strong></div>
                <div className="text-[11px] mt-1 text-slate-400">Use this code along with your new password.</div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              {loading ? <span>Dispatching PIN...</span> : <span>Send Reset PIN</span>}
            </button>

            <button
              type="button"
              onClick={() => setAuthModalView('login')}
              className="w-full text-center text-xs text-slate-400 hover:text-white"
            >
              &larr; Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
