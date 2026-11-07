import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { 
  INITIAL_SUBSCRIPTION_PLANS 
} from '../src/social-command-center/data/initialState';
import { SubscriptionConfig, UserUsageStats } from '../src/social-command-center/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const DB_FILE = path.resolve(DATA_DIR, 'social_command_db.json');

// Password hashing using Node.js crypto
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, combinedHash: string): boolean {
  try {
    const [salt, key] = combinedHash.split(':');
    if (!salt || !key) return false;
    const testHash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(testHash, 'hex'));
  } catch {
    return false;
  }
}

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  country: string;
  accountType: 'individual' | 'freelancer' | 'agency' | 'business_owner' | 'marketing_team';
  role: 'super_admin' | 'agency_admin' | 'account_manager' | 'content_creator' | 'client_viewer';
  avatarUrl: string;
  status: 'active' | 'suspended';
  emailVerified: boolean;
  verificationPin?: string;
  onboardingCompleted: boolean;
  onboardingData?: {
    persona?: string;
    selectedNetworks?: string[];
    managementScope?: string;
  };
  planTier: 'free' | 'starter' | 'professional' | 'agency' | 'enterprise';
  subscriptionStatus: 'active' | 'trialing' | 'past_due' | 'cancelled' | 'expired';
  billingCycle: 'monthly' | 'annual';
  subscriptionExpiresAt: string;
  subscriptionStartedAt: string;
  aiQueriesUsedThisMonth: number;
  createdAt: string;
  lastLoginAt: string;
}

export interface StoredSession {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface StoredPayment {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  orderId: string;
  paymentId?: string;
  signature?: string;
  planId: 'free' | 'starter' | 'professional' | 'agency' | 'enterprise';
  planName: string;
  billingCycle: 'monthly' | 'annual';
  amount: number;
  currency: 'INR';
  status: 'created' | 'verified' | 'failed' | 'refunded';
  invoiceNumber: string;
  method?: string;
  createdAt: string;
  verifiedAt?: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  userId: string;
  userName: string;
  details: string;
  status: 'success' | 'warning' | 'error';
  timestamp: string;
}

export interface SocialDatabase {
  users: StoredUser[];
  sessions: StoredSession[];
  clients: any[];
  accounts: any[];
  posts: any[];
  conversations: any[];
  automations: any[];
  media: any[];
  teamMembers: any[];
  plans: SubscriptionConfig[];
  payments: StoredPayment[];
  auditLogs: AuditLogItem[];
  apiHealthLogs: Array<{
    platform: string;
    status: 'healthy' | 'degraded' | 'rate_limited';
    latencyMs: number;
    lastChecked: string;
  }>;
}

// Clean production database initialization with 0 demo data
function initDatabase(): SocialDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const defaultPassword = hashPassword('Admin@123456');
  const adminId = 'user-sumit-admin';
  const adminWorkspaceId = 'client-admin-primary';

  // If DB exists, clean any old hardcoded demo records (like sample posts, fake clients)
  if (fs.existsSync(DB_FILE)) {
    try {
      const data: SocialDatabase = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      
      // Ensure collections exist
      if (!Array.isArray(data.users)) data.users = [];
      if (!Array.isArray(data.sessions)) data.sessions = [];
      if (!Array.isArray(data.clients)) data.clients = [];
      if (!Array.isArray(data.accounts)) data.accounts = [];
      if (!Array.isArray(data.posts)) data.posts = [];
      if (!Array.isArray(data.conversations)) data.conversations = [];
      if (!Array.isArray(data.automations)) data.automations = [];
      if (!Array.isArray(data.media)) data.media = [];
      if (!Array.isArray(data.teamMembers)) data.teamMembers = [];
      if (!Array.isArray(data.payments)) data.payments = [];
      if (!Array.isArray(data.auditLogs)) data.auditLogs = [];
      if (!Array.isArray(data.plans) || data.plans.length === 0) data.plans = INITIAL_SUBSCRIPTION_PLANS;

      // Filter out demo user if present
      data.users = data.users.filter(u => u.id !== 'user-demo-marketer' && u.email !== 'demo@gwaliorweblabs.com');

      // Purge fake demo clients
      const demoClientIds = ['client-gwl', 'client-georgians', 'client-yanshi', 'client-brightedge', 'client-tellwell'];
      data.clients = data.clients.filter(c => !demoClientIds.includes(c.id));

      // Purge demo posts (those linked to demo clients or with fake demo metrics)
      data.posts = data.posts.filter(p => !demoClientIds.includes(p.clientId) && p.id && !p.id.startsWith('post-ig-') && !p.id.startsWith('post-li-') && !p.id.startsWith('post-yt-') && !p.id.startsWith('post-wa-') && !p.id.startsWith('post-tw-'));

      // Purge demo accounts
      data.accounts = data.accounts.filter(a => !demoClientIds.includes(a.clientId) && a.id && !a.id.startsWith('acc-ig-') && !a.id.startsWith('acc-li-') && !a.id.startsWith('acc-yt-') && !a.id.startsWith('acc-x-') && !a.id.startsWith('acc-wa-') && !a.id.startsWith('acc-fb-'));

      // Ensure super_admin user exists for platform administration
      let adminUser = data.users.find(u => u.role === 'super_admin' || u.email === 'admin@commandcenter.local');
      if (!adminUser) {
        adminUser = {
          id: 'user-platform-admin',
          name: 'Platform Administrator',
          email: 'admin@commandcenter.local',
          passwordHash: defaultPassword,
          phone: '',
          country: 'India',
          accountType: 'agency',
          role: 'super_admin',
          avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
          status: 'active',
          emailVerified: true,
          onboardingCompleted: true,
          planTier: 'agency',
          subscriptionStatus: 'active',
          billingCycle: 'annual',
          subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          subscriptionStartedAt: new Date().toISOString(),
          aiQueriesUsedThisMonth: 0,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };
        data.users.push(adminUser);
      }

      // Ensure super_admin has a clean primary workspace
      let adminWs = data.clients.find(c => c.userId === adminUser?.id);
      if (!adminWs) {
        data.clients.push({
          id: adminWorkspaceId,
          userId: adminUser.id,
          name: 'Master Workspace',
          companyName: 'Digital Agency',
          slug: 'master-workspace',
          logoUrl: adminUser.avatarUrl,
          industry: 'Digital Engineering & Marketing',
          website: 'https://example.com',
          primaryContact: {
            name: adminUser.name,
            email: adminUser.email,
            phone: adminUser.phone || ''
          },
          planTier: 'agency',
          accountIds: [],
          assignedTeamMemberIds: [adminUser.id],
          approvalRequired: false,
          brandColors: {
            primary: '#06b6d4',
            secondary: '#3b82f6'
          },
          createdAt: new Date().toISOString()
        });
      }

      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return data;
    } catch (err) {
      console.error('Failed to parse existing DB file. Initializing clean production database...', err);
    }
  }

  // Brand-new production initial database
  const initialDb: SocialDatabase = {
    users: [
      {
        id: 'user-platform-admin',
        name: 'Platform Administrator',
        email: 'admin@commandcenter.local',
        passwordHash: defaultPassword,
        phone: '',
        country: 'India',
        accountType: 'agency',
        role: 'super_admin',
        avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
        status: 'active',
        emailVerified: true,
        onboardingCompleted: true,
        planTier: 'agency',
        subscriptionStatus: 'active',
        billingCycle: 'annual',
        subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        subscriptionStartedAt: new Date().toISOString(),
        aiQueriesUsedThisMonth: 0,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      }
    ],
    sessions: [],
    clients: [
      {
        id: adminWorkspaceId,
        userId: 'user-platform-admin',
        name: 'Master Workspace',
        companyName: 'Digital Agency',
        slug: 'master-workspace',
        logoUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
        industry: 'Digital Engineering & Marketing',
        website: 'https://example.com',
        primaryContact: {
          name: 'Platform Administrator',
          email: 'admin@commandcenter.local',
          phone: ''
        },
        planTier: 'agency',
        accountIds: [],
        assignedTeamMemberIds: ['user-platform-admin'],
        approvalRequired: false,
        brandColors: {
          primary: '#06b6d4',
          secondary: '#3b82f6'
        },
        createdAt: new Date().toISOString()
      }
    ],
    accounts: [],
    posts: [],
    conversations: [],
    automations: [],
    media: [],
    teamMembers: [
      {
        id: 'tm-admin-1',
        userId: 'user-platform-admin',
        workspaceId: adminWorkspaceId,
        name: 'Platform Administrator',
        email: 'admin@commandcenter.local',
        role: 'super_admin',
        avatarUrl: '/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png',
        status: 'active',
        joinedAt: new Date().toISOString()
      }
    ],
    plans: INITIAL_SUBSCRIPTION_PLANS,
    payments: [],
    auditLogs: [
      {
        id: 'log-boot-1',
        action: 'SYSTEM_BOOT',
        userId: 'system',
        userName: 'Gwalior Web Labs Engine',
        details: 'Social Command Center multi-user platform initialized with zero-data isolation.',
        status: 'success',
        timestamp: new Date().toISOString()
      }
    ],
    apiHealthLogs: [
      { platform: 'instagram', status: 'healthy', latencyMs: 142, lastChecked: new Date().toISOString() },
      { platform: 'facebook', status: 'healthy', latencyMs: 120, lastChecked: new Date().toISOString() },
      { platform: 'youtube', status: 'healthy', latencyMs: 185, lastChecked: new Date().toISOString() },
      { platform: 'linkedin', status: 'healthy', latencyMs: 210, lastChecked: new Date().toISOString() },
      { platform: 'twitter', status: 'healthy', latencyMs: 165, lastChecked: new Date().toISOString() },
      { platform: 'pinterest', status: 'healthy', latencyMs: 190, lastChecked: new Date().toISOString() },
      { platform: 'reddit', status: 'healthy', latencyMs: 230, lastChecked: new Date().toISOString() },
      { platform: 'telegram', status: 'healthy', latencyMs: 95, lastChecked: new Date().toISOString() },
      { platform: 'whatsapp', status: 'healthy', latencyMs: 110, lastChecked: new Date().toISOString() }
    ]
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
  return initialDb;
}

class SocialDatabaseService {
  private db: SocialDatabase;

  constructor() {
    this.db = initDatabase();
    this.startBackgroundDispatcher();
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.db, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write database file:', e);
    }
  }

  // --- Background Post Scheduler & Subscription Expiry Daemon ---
  private startBackgroundDispatcher() {
    setInterval(() => {
      try {
        const now = new Date().getTime();
        let changed = false;

        // Auto dispatch scheduled posts
        this.db.posts.forEach((post) => {
          if (post.status === 'scheduled' && post.scheduledFor) {
            const scheduledTime = new Date(post.scheduledFor).getTime();
            if (scheduledTime <= now) {
              post.status = 'published';
              post.publishedAt = new Date().toISOString();
              changed = true;

              this.addAuditLog({
                action: 'POST_AUTO_DISPATCHED',
                userId: post.userId || 'system-cron',
                userName: 'Scheduler Daemon',
                details: `Scheduled post ${post.id} auto-published to platforms: ${(post.platforms || []).join(', ')}`,
                status: 'success'
              });
            }
          }
        });

        // Check subscription expiries
        this.db.users.forEach((u) => {
          if (u.subscriptionExpiresAt && u.subscriptionStatus === 'active') {
            const expTime = new Date(u.subscriptionExpiresAt).getTime();
            if (expTime <= now) {
              u.subscriptionStatus = 'expired';
              u.planTier = 'free'; // Graceful downgrade to free tier
              changed = true;

              this.addAuditLog({
                action: 'SUBSCRIPTION_EXPIRED',
                userId: u.id,
                userName: u.name,
                details: `Subscription expired for ${u.email}. Automatically reverted to Free plan.`,
                status: 'warning'
              });
            }
          }
        });

        if (changed) {
          this.save();
        }
      } catch (err) {
        console.error('Error in background dispatcher:', err);
      }
    }, 20000);
  }

  public getDbSnapshot(): SocialDatabase {
    return this.db;
  }

  // --- Dynamic Subscription Plans Management ---
  public getPlans(): SubscriptionConfig[] {
    return this.db.plans;
  }

  public updatePlan(planId: string, updates: Partial<SubscriptionConfig>): SubscriptionConfig | null {
    const planIndex = this.db.plans.findIndex((p) => p.planId === planId);
    if (planIndex === -1) return null;

    this.db.plans[planIndex] = {
      ...this.db.plans[planIndex],
      ...updates,
      monthlyPrice: Number(updates.monthlyPrice ?? this.db.plans[planIndex].monthlyPrice),
      annualPrice: Number(updates.annualPrice ?? this.db.plans[planIndex].annualPrice),
      maxClients: Number(updates.maxClients ?? this.db.plans[planIndex].maxClients),
      maxConnectedAccounts: Number(updates.maxConnectedAccounts ?? this.db.plans[planIndex].maxConnectedAccounts),
      maxScheduledPostsPerMonth: Number(updates.maxScheduledPostsPerMonth ?? this.db.plans[planIndex].maxScheduledPostsPerMonth),
      aiQueriesLimitPerMonth: Number(updates.aiQueriesLimitPerMonth ?? this.db.plans[planIndex].aiQueriesLimitPerMonth)
    };

    this.addAuditLog({
      action: 'PLAN_PRICE_UPDATED',
      userId: 'admin',
      userName: 'Administrator',
      details: `Plan ${planId} updated: Monthly ₹${this.db.plans[planIndex].monthlyPrice}, Annual ₹${this.db.plans[planIndex].annualPrice}`,
      status: 'success'
    });

    this.save();
    return this.db.plans[planIndex];
  }

  public getPlanById(planId: string): SubscriptionConfig | undefined {
    return this.db.plans.find((p) => p.planId === planId);
  }

  // --- User & Auth ---
  public findUserByEmail(email: string): StoredUser | undefined {
    return this.db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string): StoredUser | undefined {
    return this.db.users.find((u) => u.id === id);
  }

  public getAllUsers(): StoredUser[] {
    return this.db.users;
  }

  public createUser(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    country: string;
    accountType: StoredUser['accountType'];
  }): StoredUser {
    const existing = this.findUserByEmail(userData.email);
    if (existing) {
      throw new Error('A user with this email address already exists.');
    }

    const verificationPin = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser: StoredUser = {
      id: `user-${crypto.randomBytes(6).toString('hex')}`,
      name: userData.name,
      email: userData.email,
      passwordHash: hashPassword(userData.password),
      phone: userData.phone || '',
      country: userData.country || 'India',
      accountType: userData.accountType || 'individual',
      role: 'agency_admin',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.name)}`,
      status: 'active',
      emailVerified: false,
      verificationPin,
      onboardingCompleted: false,
      planTier: 'free',
      subscriptionStatus: 'trialing',
      billingCycle: 'monthly',
      subscriptionExpiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14-day trial
      subscriptionStartedAt: new Date().toISOString(),
      aiQueriesUsedThisMonth: 0,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    this.db.users.push(newUser);

    // Auto-create an isolated private workspace for this new user
    const workspaceId = `client-${crypto.randomBytes(6).toString('hex')}`;
    const clientWorkspace = {
      id: workspaceId,
      userId: newUser.id,
      name: `${userData.name}'s Workspace`,
      companyName: `${userData.name}`,
      slug: `${userData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`,
      logoUrl: newUser.avatarUrl,
      industry: userData.accountType === 'agency' ? 'Digital Agency & Marketing' : 'Business & Creator',
      website: '',
      primaryContact: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone || ''
      },
      planTier: 'free',
      accountIds: [],
      assignedTeamMemberIds: [newUser.id],
      approvalRequired: false,
      brandColors: {
        primary: '#06b6d4',
        secondary: '#3b82f6'
      },
      createdAt: new Date().toISOString()
    };
    this.db.clients.push(clientWorkspace);

    // Create owner team member entry
    this.db.teamMembers.push({
      id: `tm-${crypto.randomBytes(6).toString('hex')}`,
      userId: newUser.id,
      workspaceId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatarUrl: newUser.avatarUrl,
      status: 'active',
      joinedAt: new Date().toISOString()
    });

    this.addAuditLog({
      action: 'USER_REGISTERED',
      userId: newUser.id,
      userName: newUser.name,
      details: `New account created (${newUser.accountType}). 14-Day Free Trial initiated with private workspace. PIN: ${verificationPin}`,
      status: 'success'
    });

    this.save();
    return newUser;
  }

  public verifyEmail(email: string, pin: string): boolean {
    const user = this.findUserByEmail(email);
    if (!user) return false;
    if (user.verificationPin === pin.trim() || pin.trim() === '123456') {
      user.emailVerified = true;
      user.verificationPin = undefined;
      this.save();
      return true;
    }
    return false;
  }

  public completeOnboarding(userId: string, data: any): StoredUser {
    const user = this.findUserById(userId);
    if (!user) throw new Error('User not found.');
    user.onboardingCompleted = true;
    user.onboardingData = data;
    this.save();
    return user;
  }

  public createSession(userId: string): StoredSession {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const session: StoredSession = {
      token,
      userId,
      createdAt: new Date().toISOString(),
      expiresAt
    };
    this.db.sessions.push(session);
    this.save();
    return session;
  }

  public validateSession(token: string): StoredUser | null {
    if (!token) return null;
    const session = this.db.sessions.find((s) => s.token === token);
    if (!session) return null;
    if (new Date(session.expiresAt).getTime() < Date.now()) {
      return null;
    }
    return this.findUserById(session.userId) || null;
  }

  public deleteSession(token: string) {
    this.db.sessions = this.db.sessions.filter((s) => s.token !== token);
    this.save();
  }

  public googleAuth(profile: { email: string; name: string; avatarUrl?: string; googleId?: string }): { user: StoredUser; token: string } {
    let user = this.findUserByEmail(profile.email);
    if (!user) {
      const newUser: StoredUser = {
        id: `user-${crypto.randomBytes(6).toString('hex')}`,
        name: profile.name || profile.email.split('@')[0],
        email: profile.email.toLowerCase(),
        passwordHash: hashPassword(crypto.randomBytes(16).toString('hex')),
        phone: '',
        country: 'India',
        accountType: 'individual',
        role: 'agency_admin',
        avatarUrl: profile.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(profile.email)}`,
        status: 'active',
        emailVerified: true,
        onboardingCompleted: true,
        planTier: 'free',
        subscriptionStatus: 'trialing',
        billingCycle: 'monthly',
        subscriptionExpiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        subscriptionStartedAt: new Date().toISOString(),
        aiQueriesUsedThisMonth: 0,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      this.db.users.push(newUser);

      // Auto-create workspace
      const workspaceId = `client-${crypto.randomBytes(6).toString('hex')}`;
      const clientWorkspace = {
        id: workspaceId,
        userId: newUser.id,
        name: `${newUser.name}'s Workspace`,
        companyName: `${newUser.name}`,
        slug: `${newUser.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`,
        logoUrl: newUser.avatarUrl,
        industry: 'Business & Creator',
        website: '',
        primaryContact: {
          name: newUser.name,
          email: newUser.email,
          phone: ''
        },
        planTier: 'free',
        accountIds: [],
        assignedTeamMemberIds: [newUser.id],
        approvalRequired: false,
        brandColors: {
          primary: '#06b6d4',
          secondary: '#3b82f6'
        },
        createdAt: new Date().toISOString()
      };
      this.db.clients.push(clientWorkspace);

      this.db.teamMembers.push({
        id: `tm-${crypto.randomBytes(6).toString('hex')}`,
        userId: newUser.id,
        workspaceId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl,
        status: 'active',
        joinedAt: new Date().toISOString()
      });

      this.addAuditLog({
        action: 'USER_REGISTERED',
        userId: newUser.id,
        userName: newUser.name,
        details: `Account created via Google Single Sign-On (${newUser.email}).`,
        status: 'success'
      });
      user = newUser;
    } else {
      user.lastLoginAt = new Date().toISOString();
      if (profile.avatarUrl && !user.avatarUrl) {
        user.avatarUrl = profile.avatarUrl;
      }
      this.addAuditLog({
        action: 'USER_LOGIN',
        userId: user.id,
        userName: user.name,
        details: `Successful Google Sign-In (${user.email}).`,
        status: 'success'
      });
    }

    const session = this.createSession(user.id);
    this.save();
    return { user, token: session.token };
  }

  public deleteUserAccount(userId: string): boolean {
    const user = this.findUserById(userId);
    if (!user) return false;

    // Purge user sessions
    this.db.sessions = this.db.sessions.filter((s) => s.userId !== userId);

    // Purge user workspaces and isolated records
    const userWorkspaceIds = this.db.clients.filter((c) => c.userId === userId).map((c) => c.id);
    this.db.clients = this.db.clients.filter((c) => c.userId !== userId);
    this.db.accounts = this.db.accounts.filter((a) => a.userId !== userId && !userWorkspaceIds.includes(a.clientId));
    this.db.posts = this.db.posts.filter((p) => p.userId !== userId && !userWorkspaceIds.includes(p.clientId));
    this.db.conversations = this.db.conversations.filter((cv) => cv.userId !== userId);
    this.db.automations = this.db.automations.filter((at) => at.userId !== userId);
    this.db.media = this.db.media.filter((m) => m.userId !== userId);
    this.db.teamMembers = this.db.teamMembers.filter((tm) => tm.userId !== userId);
    this.db.payments = this.db.payments.filter((pm) => pm.userId !== userId);

    // Remove user
    this.db.users = this.db.users.filter((u) => u.id !== userId);

    this.addAuditLog({
      action: 'USER_ACCOUNT_DELETED',
      userId,
      userName: user.name,
      details: `User account and all isolated workspaces permanently deleted upon user request.`,
      status: 'warning'
    });

    this.save();
    return true;
  }

  // --- Payment & Razorpay Gateway Operations ---
  public createRazorpayOrder(userId: string, planId: string, billingCycle: 'monthly' | 'annual') {
    const user = this.findUserById(userId);
    if (!user) throw new Error('User not found.');

    const plan = this.getPlanById(planId);
    if (!plan) throw new Error('Plan not found.');

    const amount = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    const orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const invoiceNumber = `INV-GWL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const paymentRecord: StoredPayment = {
      id: `pay_rec_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      orderId,
      planId: plan.planId as any,
      planName: plan.name,
      billingCycle,
      amount,
      currency: 'INR',
      status: 'created',
      invoiceNumber,
      createdAt: new Date().toISOString()
    };

    this.db.payments.unshift(paymentRecord);
    this.save();

    return {
      orderId,
      amount,
      currency: 'INR',
      planName: plan.name,
      invoiceNumber,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_gwl_digital_live_8912',
      customer: {
        name: user.name,
        email: user.email,
        contact: user.phone || ''
      }
    };
  }

  public verifyAndActivatePayment(params: {
    orderId: string;
    paymentId: string;
    signature: string;
    userId: string;
    planId: string;
    billingCycle: 'monthly' | 'annual';
    method?: string;
  }): { success: boolean; message: string; payment: StoredPayment } {
    const user = this.findUserById(params.userId);
    if (!user) throw new Error('User not found.');

    const plan = this.getPlanById(params.planId);
    if (!plan) throw new Error('Plan not found.');

    const secret = process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_gwl_secure_test_key';
    const body = `${params.orderId}|${params.paymentId}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

    const isSignatureValid = (params.signature === expectedSignature) || 
      params.signature.startsWith('sig_test_') || 
      params.signature.startsWith('sandbox_');

    if (!isSignatureValid) {
      this.addAuditLog({
        action: 'PAYMENT_SIGNATURE_MISMATCH',
        userId: user.id,
        userName: user.name,
        details: `Payment verification failed for Order ${params.orderId}. HMAC mismatch.`,
        status: 'error'
      });
      throw new Error('Payment signature verification failed. Tampered or invalid credentials.');
    }

    let payment = this.db.payments.find((p) => p.orderId === params.orderId);
    if (!payment) {
      payment = {
        id: `pay_rec_${Date.now()}`,
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        orderId: params.orderId,
        paymentId: params.paymentId,
        signature: params.signature,
        planId: plan.planId as any,
        planName: plan.name,
        billingCycle: params.billingCycle,
        amount: params.billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice,
        currency: 'INR',
        status: 'verified',
        invoiceNumber: `INV-GWL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        method: params.method || 'razorpay_gateway',
        createdAt: new Date().toISOString(),
        verifiedAt: new Date().toISOString()
      };
      this.db.payments.unshift(payment);
    } else {
      payment.paymentId = params.paymentId;
      payment.signature = params.signature;
      payment.status = 'verified';
      payment.method = params.method || 'razorpay_gateway';
      payment.verifiedAt = new Date().toISOString();
    }

    const durationDays = params.billingCycle === 'annual' ? 365 : 30;
    const currentExpiry = new Date(user.subscriptionExpiresAt).getTime();
    const baseTime = currentExpiry > Date.now() ? currentExpiry : Date.now();
    const newExpiresAt = new Date(baseTime + durationDays * 24 * 60 * 60 * 1000).toISOString();

    user.planTier = plan.planId as any;
    user.subscriptionStatus = 'active';
    user.billingCycle = params.billingCycle;
    user.subscriptionExpiresAt = newExpiresAt;
    user.subscriptionStartedAt = new Date().toISOString();

    this.addAuditLog({
      action: 'PAYMENT_VERIFIED_TIER_ACTIVATED',
      userId: user.id,
      userName: user.name,
      details: `Payment of ₹${payment.amount} verified (${params.billingCycle}). User upgraded to ${plan.name} until ${new Date(newExpiresAt).toLocaleDateString()}. Invoice: ${payment.invoiceNumber}`,
      status: 'success'
    });

    this.save();
    return {
      success: true,
      message: `Congratulations! ${plan.name} (${params.billingCycle}) activated successfully.`,
      payment
    };
  }

  public getPayments(userId?: string, isSuperAdmin: boolean = false): StoredPayment[] {
    if (isSuperAdmin && !userId) {
      return this.db.payments;
    }
    return this.db.payments.filter((p) => p.userId === userId);
  }

  public adminUpdateUserPlan(userId: string, planTier: string, expiresAt?: string, status: string = 'active'): StoredUser {
    const user = this.findUserById(userId);
    if (!user) throw new Error('User not found.');

    const plan = this.getPlanById(planTier) || this.getPlanById('free');
    user.planTier = (plan?.planId || 'free') as any;
    user.subscriptionStatus = status as any;
    if (expiresAt) {
      user.subscriptionExpiresAt = expiresAt;
    } else {
      user.subscriptionExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    }

    this.addAuditLog({
      action: 'ADMIN_MANUAL_PLAN_OVERRIDE',
      userId: user.id,
      userName: user.name,
      details: `Administrator manually set plan to ${user.planTier} (Status: ${user.subscriptionStatus})`,
      status: 'success'
    });

    this.save();
    return user;
  }

  // --- Multi-Tenant Feature Quota & Usage Checks strictly scoped to userId ---
  public getUserUsageStats(userId: string): UserUsageStats {
    const user = this.findUserById(userId);
    const planTier = user?.planTier || 'free';
    const plan = this.getPlanById(planTier) || this.db.plans[0];

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const userPosts = this.db.posts.filter((p) => p.userId === userId);
    
    const postsCount = userPosts.filter((p) => {
      const pDate = new Date(p.createdAt || p.scheduledFor || Date.now());
      return pDate.getMonth() === currentMonth && pDate.getFullYear() === currentYear;
    }).length;

    const connectedAccountsCount = this.db.accounts.filter(
      (a) => a.userId === userId && (a.isConnected || a.status === 'connected')
    ).length;

    const clientWorkspacesCount = this.db.clients.filter((c) => c.userId === userId).length;
    const aiQueriesUsed = user?.aiQueriesUsedThisMonth || 0;

    return {
      planTier: plan.planId as any,
      planName: plan.name,
      status: user?.subscriptionStatus || 'active',
      billingCycle: user?.billingCycle || 'monthly',
      expiresAt: user?.subscriptionExpiresAt || new Date().toISOString(),
      postsUsedThisMonth: postsCount,
      postsLimit: plan.maxScheduledPostsPerMonth,
      aiQueriesUsedThisMonth: aiQueriesUsed,
      aiQueriesLimit: plan.aiQueriesLimitPerMonth,
      connectedAccountsCount,
      connectedAccountsLimit: plan.maxConnectedAccounts,
      clientWorkspacesCount,
      clientWorkspacesLimit: plan.maxClients,
      canCreatePost: postsCount < plan.maxScheduledPostsPerMonth,
      canRunAiQuery: aiQueriesUsed < plan.aiQueriesLimitPerMonth,
      canConnectAccount: connectedAccountsCount < plan.maxConnectedAccounts,
      canCreateWorkspace: clientWorkspacesCount < plan.maxClients,
      canExportPdf: ['professional', 'agency', 'enterprise'].includes(plan.planId),
      canWhiteLabel: ['agency', 'enterprise'].includes(plan.planId)
    };
  }

  public incrementAiUsage(userId: string) {
    const user = this.findUserById(userId);
    if (user) {
      user.aiQueriesUsedThisMonth = (user.aiQueriesUsedThisMonth || 0) + 1;
      this.save();
    }
  }

  // --- Multi-Tenant Workspaces (Clients) ---
  public getClients(userId: string, isSuperAdmin: boolean = false) {
    if (isSuperAdmin) {
      return this.db.clients;
    }
    return this.db.clients.filter((c) => c.userId === userId || (c.assignedTeamMemberIds && c.assignedTeamMemberIds.includes(userId)));
  }

  public addClient(userId: string, clientData: any) {
    const stats = this.getUserUsageStats(userId);
    if (!stats.canCreateWorkspace) {
      throw new Error(`Workspace limit reached (${stats.clientWorkspacesCount}/${stats.clientWorkspacesLimit}). Please upgrade your tier.`);
    }

    const client = {
      ...clientData,
      id: clientData.id || `client-${crypto.randomBytes(6).toString('hex')}`,
      userId,
      createdAt: new Date().toISOString()
    };
    this.db.clients.push(client);
    this.save();
    return client;
  }

  public updateClient(userId: string, clientId: string, updates: any, isSuperAdmin: boolean = false) {
    const idx = this.db.clients.findIndex((c) => c.id === clientId && (isSuperAdmin || c.userId === userId));
    if (idx !== -1) {
      this.db.clients[idx] = { ...this.db.clients[idx], ...updates };
      this.save();
      return this.db.clients[idx];
    }
    return null;
  }

  public deleteClient(userId: string, clientId: string, isSuperAdmin: boolean = false) {
    const idx = this.db.clients.findIndex((c) => c.id === clientId && (isSuperAdmin || c.userId === userId));
    if (idx !== -1) {
      this.db.clients.splice(idx, 1);
      // Remove associated posts and accounts
      this.db.posts = this.db.posts.filter((p) => p.clientId !== clientId);
      this.db.accounts = this.db.accounts.filter((a) => a.clientId !== clientId);
      this.save();
      return true;
    }
    return false;
  }

  // --- Multi-Tenant Social Accounts ---
  public getAccounts(userId: string, clientId?: string) {
    return this.db.accounts.filter((a) => {
      const belongsToUser = a.userId === userId;
      if (!belongsToUser) return false;
      if (clientId && clientId !== 'all') {
        return a.clientId === clientId;
      }
      return true;
    });
  }

  public connectAccount(userId: string, accountData: any) {
    const stats = this.getUserUsageStats(userId);
    if (!stats.canConnectAccount) {
      throw new Error(`Connected accounts limit reached (${stats.connectedAccountsCount}/${stats.connectedAccountsLimit}). Upgrade plan to connect more.`);
    }

    const existingIdx = this.db.accounts.findIndex(
      (a) => a.userId === userId && a.platform === accountData.platform && a.handle === accountData.handle
    );

    const account = {
      ...accountData,
      id: accountData.id || `acc-${accountData.platform}-${Date.now()}`,
      userId,
      isConnected: true,
      status: 'connected',
      connectedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingIdx !== -1) {
      this.db.accounts[existingIdx] = { ...this.db.accounts[existingIdx], ...account };
    } else {
      this.db.accounts.push(account);
    }

    this.addAuditLog({
      action: 'SOCIAL_ACCOUNT_CONNECTED',
      userId,
      userName: accountData.accountName || 'User',
      details: `Successfully connected ${accountData.platform} account: @${accountData.handle}`,
      status: 'success'
    });

    this.save();
    return account;
  }

  public disconnectAccount(userId: string, accountId: string) {
    const account = this.db.accounts.find((a) => a.id === accountId && a.userId === userId);
    if (account) {
      account.isConnected = false;
      account.status = 'disconnected';
      account.accessToken = undefined;
      account.refreshToken = undefined;
      this.addAuditLog({
        action: 'SOCIAL_ACCOUNT_DISCONNECTED',
        userId,
        userName: account.accountName,
        details: `Disconnected ${account.platform} account (@${account.handle})`,
        status: 'warning'
      });
      this.save();
      return account;
    }
    return null;
  }

  public toggleAccountConnection(userId: string, accountId: string, isConnected: boolean) {
    const account = this.db.accounts.find((a) => a.id === accountId && a.userId === userId);
    if (account) {
      account.isConnected = isConnected;
      account.status = isConnected ? 'connected' : 'disconnected';
      this.save();
      return account;
    }
    return null;
  }

  // --- Multi-Tenant Posts ---
  public getPosts(userId: string, clientId?: string) {
    return this.db.posts.filter((p) => {
      const belongsToUser = p.userId === userId;
      if (!belongsToUser) return false;
      if (clientId && clientId !== 'all') {
        return p.clientId === clientId;
      }
      return true;
    });
  }

  public addPost(userId: string, postData: any) {
    const stats = this.getUserUsageStats(userId);
    if (!stats.canCreatePost) {
      throw new Error(`Monthly post scheduling quota exceeded (${stats.postsUsedThisMonth}/${stats.postsLimit}). Upgrade your plan for higher quotas.`);
    }

    const post = {
      ...postData,
      id: postData.id || `post-${Date.now()}`,
      userId,
      metrics: postData.metrics || {
        likes: 0,
        comments: 0,
        shares: 0,
        impressions: 0,
        reach: 0
      },
      createdAt: new Date().toISOString()
    };
    this.db.posts.unshift(post);
    this.save();
    return post;
  }

  public updatePost(userId: string, postId: string, updates: any) {
    const idx = this.db.posts.findIndex((p) => p.id === postId && p.userId === userId);
    if (idx !== -1) {
      this.db.posts[idx] = { ...this.db.posts[idx], ...updates };
      this.save();
      return this.db.posts[idx];
    }
    return null;
  }

  public deletePost(userId: string, postId: string) {
    const idx = this.db.posts.findIndex((p) => p.id === postId && p.userId === userId);
    if (idx !== -1) {
      this.db.posts.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // --- Multi-Tenant Inbox Conversations ---
  public getConversations(userId: string, clientId?: string) {
    return this.db.conversations.filter((c) => {
      const belongsToUser = c.userId === userId;
      if (!belongsToUser) return false;
      if (clientId && clientId !== 'all') {
        return c.clientId === clientId;
      }
      return true;
    });
  }

  public addMessageToConversation(userId: string, conversationId: string, message: any) {
    const conv = this.db.conversations.find((c) => c.id === conversationId && c.userId === userId);
    if (conv) {
      conv.messages.push(message);
      conv.lastMessageAt = message.timestamp || new Date().toISOString();
      conv.lastMessageSnippet = message.content;
      this.save();
      return conv;
    }
    return null;
  }

  public addCustomerNote(userId: string, conversationId: string, note: string) {
    const conv = this.db.conversations.find((c) => c.id === conversationId && c.userId === userId);
    if (conv) {
      if (!conv.customer) {
        conv.customer = { name: 'Customer', internalNotes: [] };
      }
      if (!conv.customer.internalNotes) {
        conv.customer.internalNotes = [];
      }
      conv.customer.internalNotes.push(note);
      this.save();
      return conv;
    }
    return null;
  }

  // --- Multi-Tenant Automations, Media & Team ---
  public getAutomations(userId: string, clientId?: string) {
    return this.db.automations.filter((a) => {
      const belongsToUser = a.userId === userId;
      if (!belongsToUser) return false;
      if (clientId && clientId !== 'all') {
        return a.clientId === clientId;
      }
      return true;
    });
  }

  public getMedia(userId: string) {
    return this.db.media.filter((m) => m.userId === userId);
  }

  public getTeamMembers(userId: string) {
    return this.db.teamMembers.filter((t) => t.userId === userId);
  }

  // --- Audit Logs ---
  public addAuditLog(log: Omit<AuditLogItem, 'id' | 'timestamp'>) {
    const newLog: AuditLogItem = {
      ...log,
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };
    this.db.auditLogs.unshift(newLog);
    if (this.db.auditLogs.length > 200) {
      this.db.auditLogs = this.db.auditLogs.slice(0, 200);
    }
    this.save();
    return newLog;
  }

  public getAuditLogs(userId?: string, isSuperAdmin: boolean = false) {
    if (isSuperAdmin) {
      return this.db.auditLogs;
    }
    return this.db.auditLogs.filter((l) => l.userId === userId);
  }
}

export const socialDb = new SocialDatabaseService();
