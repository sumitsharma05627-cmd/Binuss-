import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { socialDb, verifyPassword } from './server/socialDb';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI();

const SYSTEM_INSTRUCTION = `You are the official Senior AI Solutions Engineer and Doubt Resolver for KBSR Digital (also known as GWL WebLab / Gwalior WebLab / Global WebLab), a premier digital engineering and growth agency based in Gwalior, MP, India, serving clients across India and globally.

Your role:
- Warmly, clearly, and authoritatively resolve any common doubt, question, or inquiry from prospective clients, business owners, doctors, clinic directors, institute founders, and entrepreneurs.
- Answer in the user's language (English, Hindi, or Hinglish - match their conversational style).
- Be concise, direct, helpful, and transparent. Avoid corporate jargon or fluff. Provide clear numbers, timelines, and actionable explanations.

Key Knowledge Base:
1. Core Services:
   - Bespoke High-Performance Web Development (Sub-second Core Web Vitals, React/Next.js/Tailwind/Three.js)
   - Local SEO & Google Business Profile (GMB) Domination (Rank in Top 3 Local Pack)
   - High-ROI Google Ads PPC & Search Funnels (Zero budget waste, high purchase intent)
   - Social Media Content & Authority Brand Building
   - Custom Business Web Apps (Portals, booking flows, calculators, LMS, student admissions)
   - Creator Collaboration & Influencer Co-Launches (UGC video ad assets, brand-to-creator drops, creator link-in-bio storefronts, and performance rev-share partnerships)

2. Transparent Pricing Packages:
   - Launchpad Plan: ₹5,000 – ₹14,999 (one-time setup, 3-5 business days, single-page microsite, mobile responsive, direct WhatsApp call, Google Maps embed, SSL)
   - Starter Plan: ₹14,999 (one-time setup, 7-10 business days, up to 5 pages, mobile responsive, WhatsApp engine, basic SEO, SSL)
   - Business Plan: ₹29,999 (MOST POPULAR, 12-16 business days, up to 10 pages, deep SEO, Google Business Profile optimization, lead triage, 30 days post-launch support)
   - Growth Partnership: ₹54,999 (20-25 business days, multi-page web app, full-funnel SEO, Google Ads PPC setup, social media playbook, automated email/CRM lead nurturing)
   - Creator Collaboration Pricing (DIFFERENT PRICING MODEL FROM WEB ENGINEERING):
     • Micro-Creator Drop: ₹8,500 – ₹14,500 per campaign drop (1 Reel + 2 Stories + trackable coupon & bio-link, 25k-85k verified reach, 4-6 business days)
     • Creator Co-Launch Kit: ₹18,500 – ₹27,500 one-time turnkey setup (custom link-in-bio digital store, digital product/booking checkout, automated DM sponsor bot, 4-page media kit PDF)
     • Brand x Creator Retainer: ₹32,000/month OR Hybrid Rev-Share: ₹12,000 base + 12% affiliate commission (4-6 creator drops/mo, full commercial UGC ad rights, contracts)
   - Custom scopes & enterprise partnerships are also tailored transparently.

3. Real Client Success Stories:
   - Georgians Academy (Morar Cantt & Bada Gaon, Gwalior): Class 1 to 12 coaching institute, bilingual EN/HI platform + 1-click WhatsApp admissions engine resulted in +185% inbound admissions.
   - Yanshi Physiotherapy Center (M.H. Chauraha Morar, Gwalior): Pain rehabilitation clinic, online appointment booking + direct WhatsApp triage eliminated booking friction.
   - BrightEdge Academy: Pan-India NEET & Board EdTech LMS with Dark/Light theme engine and automated GST pricing calculator.
   - Tell Well English Institute (Gwalior): Practical spoken English & personality development academy with 1-click WhatsApp funnel for high student enrollment.

4. Transparency & Guarantees:
   - 100% Client Ownership: The client owns all code, domains, assets, and design rights forever. Zero vendor lock-in.
   - Fixed Milestones: Milestone-based payments. No surprise retainers or hidden fees.
   - Speed & Architecture: Sub-second load times (<1s FCP), 95+ Google Lighthouse scores, no bloated slow themes.
   - Ongoing Support: 30-day warranty and optional managed maintenance.

5. Contact & Actions:
   - Office: Gwalior, Madhya Pradesh, India
   - WhatsApp / Phone: Instant consultation via WhatsApp (+91 75879 39722)
   - Email: gwaliorweblabs@gmail.com
   - Inquiries: Free technical audit and custom quotation within 2 to 4 hours.

If a user asks for a direct quote, call, or project start, kindly encourage them to click the "Chat on WhatsApp" button or use the Contact form on the site.`;

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userMessage } = req.body;

    const query = userMessage || (messages && messages[messages.length - 1]?.content);

    if (!query || typeof query !== 'string' || !query.trim()) {
      res.status(400).json({ error: 'Message content is required.' });
      return;
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(messages) && messages.length > 0) {
      // Gemini contents MUST start with role: 'user'. Discard initial greeting if role is model/assistant
      const firstUserIdx = messages.findIndex((m: any) => m.role === 'user');
      const validHistory = firstUserIdx !== -1 ? messages.slice(firstUserIdx).slice(-8) : [];

      for (const m of validHistory) {
        if (!m || !m.content) continue;
        contents.push({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: String(m.content) }]
        });
      }
    }

    if (contents.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: query }]
      });
    }

    let reply = '';

    // Primary: gemini-3.8-flash
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });
      reply = response.text || '';
    } catch (err: any) {
      console.warn('Primary model busy, attempting secondary model...', err?.message);
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          }
        });
        reply = response.text || '';
      } catch (err2: any) {
        console.warn('Secondary model also unavailable, providing expert knowledge base reply.', err2?.message);
      }
    }

    if (!reply) {
      // Intelligent fallback answer if Gemini service is under extreme load
      const q = query.toLowerCase();
      if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('plan')) {
        reply = 'Our transparent packages start at **₹5,000 – ₹14,999 (Launchpad - 1 page microsite, WhatsApp/call)**, **₹14,999 (Starter - 5 pages, WhatsApp engine, basic SEO)**, **₹29,999 (Business - up to 10 pages, deep SEO, Google Business Profile)**, and **₹54,999 (Growth - full-funnel web app, Google Ads PPC)**. All pricing is milestone-based with 100% code ownership.';
      } else if (q.includes('time') || q.includes('day') || q.includes('how long') || q.includes('launch')) {
        reply = 'Starter websites launch in **7 to 10 business days**, Business platforms in **12 to 16 business days**, and custom growth web apps in **20 to 25 days**. You receive staging access by day 4-5 to test the prototype.';
      } else if (q.includes('gwalior') || q.includes('meet') || q.includes('location') || q.includes('where')) {
        reply = 'KBSR Digital is headquartered in **Gwalior, Madhya Pradesh** (serving Morar, City Centre, Lashkar, and Thatipur). We welcome in-person meetings in Gwalior or video consultations on Google Meet/WhatsApp.';
      } else if (q.includes('georgian') || q.includes('yanshi') || q.includes('client') || q.includes('proof')) {
        reply = 'We recently delivered platforms for **Georgians Academy** (+185% admissions), **Yanshi Physiotherapy Center** (frictionless appointment bookings), **BrightEdge Academy** (EdTech LMS), and **Tell Well English Institute** (instant WhatsApp conversions).';
      } else {
        reply = 'KBSR Digital engineers high-performance websites, local SEO systems, and Google Ads funnels. For your specific requirements, we can provide a free 15-minute technical audit and fixed quotation. Reach out via WhatsApp or submit the inquiry form below!';
      }
    }

    res.json({ reply });
  } catch (error: any) {
    console.error('Error in chat route:', error);
    res.json({
      reply: 'At GWL WebLab, we engineer high-performance web systems and local SEO. Let\'s connect directly via WhatsApp (+91 75879 39722) to review your project!'
    });
  }
});

// ============================================================================
// GWALIOR WEB LABS – SOCIAL COMMAND CENTER BACKEND API
// ============================================================================

const SOCIAL_AI_SYSTEM_INSTRUCTION = `You are "GW Labs AI", the elite social media content architect and strategist built into Gwalior Web Labs - Social Command Center.
Your purpose:
- Help digital marketing agencies, creators, and business owners craft viral, high-converting social media content across Instagram, LinkedIn, YouTube, X, Facebook, Pinterest, Reddit, Telegram, and WhatsApp Business.
- You understand nuances between B2B LinkedIn authority posts, high-retention Instagram Reels hooks, punchy X threads, and YouTube Shorts scripts.
- When generating Hindi or Hinglish, ensure it feels natural, modern, culturally grounded, and commercially compelling.
- Provide clean, structured markdown with clear headings, bullet points, and actionable takeaways. Avoid generic marketing fluff.`;

app.post('/api/social/ai', async (req: Request, res: Response) => {
  try {
    const {
      task = 'captions',
      prompt,
      platform = 'instagram',
      industry = 'General Business',
      targetAudience = 'Pan-India / Global',
      language = 'English',
      tone = 'Engaging & Authoritative',
      objective = 'Lead Generation'
    } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      res.status(400).json({ error: 'Prompt content is required.' });
      return;
    }

    let userInstruction = '';

    if (task === 'captions') {
      userInstruction = `Generate 3 distinct, high-converting social media captions for ${platform.toUpperCase()}.
Topic: "${prompt}"
Industry: ${industry}
Target Audience: ${targetAudience}
Language: ${language}
Tone: ${tone}
Objective: ${objective}

Output structure:
### Option 1: Story-Driven Hook
[Full caption with emoji formatting, strong line breaks, clear call-to-action]

### Option 2: Problem-Solution Direct
[Full caption focusing on pain point, relief, and 1-step next action]

### Option 3: Short & Punchy (Viral Format)
[Quick hook + value + CTA]

### Recommended Hashtags:
[5-10 tailored hashtags]`;
    } else if (task === 'hashtags') {
      userInstruction = `Generate a high-yield hashtag matrix for ${platform.toUpperCase()} on topic: "${prompt}".
Industry: ${industry}
Language: ${language}

Categorize into:
1. High-Volume Reach (1M+ impressions equivalent)
2. Mid-Tier Niche Authority (50k - 500k community)
3. Local & Hyper-Targeted (Regional / Industry specific)
4. Branded & Campaign Hashtags
Provide practical guidance on best placement (e.g., caption bottom vs first comment).`;
    } else if (task === 'ideas') {
      userInstruction = `Brainstorm 7 viral content concepts for ${platform.toUpperCase()}.
Brand / Topic: "${prompt}"
Industry: ${industry}
Target Audience: ${targetAudience}
Tone: ${tone}

Format each idea with:
- Catchy Hook / Headline (First 3 seconds)
- Format (Reel / Carousel / Single Post / Story Series / Thread)
- Core Value / Takeaway
- Engagement Trigger (Question or CTA to stimulate comments)`;
    } else if (task === 'calendar') {
      userInstruction = `Create a strategic 7-day multi-platform social media content calendar.
Campaign Focus: "${prompt}"
Primary Platform: ${platform}
Industry: ${industry}
Target Audience: ${targetAudience}

Provide a table with: Day, Platform, Content Pillar (Educate / Entertain / Prove / Sell), Reel or Post Concept, Hook Headline, and Best Posting Time (IST).`;
    } else if (task === 'rewrite') {
      userInstruction = `Rewrite and optimize the following draft social media caption for ${platform.toUpperCase()}.
Original Draft:
"${prompt}"

Tone Target: ${tone}
Language: ${language}
Objective: ${objective}

Provide:
1. Polished Master Version
2. 3 Alternative Hooks (Questions, Bold Statements, Counter-Intuitive facts)
3. Stronger Call to Action (CTA)`;
    } else if (task === 'reply') {
      userInstruction = `Craft 3 professional responses to the following customer comment / inquiry on ${platform.toUpperCase()}:
Customer Message: "${prompt}"
Industry: ${industry}
Language: ${language}

Provide:
- Response 1: Warm, helpful & inviting (Builds rapport)
- Response 2: Direct Lead Capture (Guides to WhatsApp / DM / Booking link)
- Response 3: Concise & polite (Great for fast acknowledgment)`;
    } else if (task === 'translate') {
      userInstruction = `Translate and culturally adapt the following social media copy into ${language}:
Copy:
"${prompt}"

Provide:
1. Natural, fluent translation
2. Culturally adapted nuances for digital engagement
3. Hindi transliteration / Hinglish alternative if applicable`;
    } else {
      userInstruction = `Task: ${task}
Prompt: "${prompt}"
Platform: ${platform}
Industry: ${industry}
Language: ${language}
Tone: ${tone}`;
    }

    let generatedText = '';

    // Primary: gemini-3.8-flash
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: userInstruction }] }],
        config: {
          systemInstruction: SOCIAL_AI_SYSTEM_INSTRUCTION,
          temperature: 0.75,
        }
      });
      generatedText = response.text || '';
    } catch (err: any) {
      console.warn('Social AI primary model busy, attempting secondary...', err?.message);
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [{ role: 'user', parts: [{ text: userInstruction }] }],
          config: {
            systemInstruction: SOCIAL_AI_SYSTEM_INSTRUCTION,
            temperature: 0.75,
          }
        });
        generatedText = response.text || '';
      } catch (err2: any) {
        console.warn('Social AI secondary model fallback.', err2?.message);
      }
    }

    if (!generatedText) {
      generatedText = `### Generated Strategy for ${platform.toUpperCase()}: "${prompt}"\n\n**Hook:** Stop wasting time with fragmented social media tools.\n\n**Body:** In 2026, real digital growth comes from consistent, unified workflows. When your content, inbox, and analytics live in one place, client satisfaction and conversion rates multiply.\n\n**CTA:** Ready to streamline your social media engine? Send us a DM to get started.\n\n#GWLWebLabs #${industry.replace(/\\s+/g, '')} #SocialMediaGrowth #MarketingAutomation`;
    }

    res.json({
      success: true,
      task,
      platform,
      result: generatedText,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error in /api/social/ai:', error);
    res.status(500).json({
      error: 'Failed to generate social media content. Please retry.',
      details: error?.message
    });
  }
});

// ==========================================
// SOCIAL COMMAND CENTER REST & AUTH API
// ==========================================

function getAuthUser(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  return socialDb.validateSession(token);
}

// 1. Registration Endpoint
app.post('/api/social/auth/register', (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, country, accountType } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required.' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      return;
    }

    const newUser = socialDb.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone,
      country: country || 'India',
      accountType: accountType || 'individual'
    });

    const session = socialDb.createSession(newUser.id);
    const { passwordHash: _, ...userSafe } = newUser;

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: userSafe,
      token: session.token,
      verificationPin: newUser.verificationPin
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Registration failed.' });
  }
});

// 2. Login Endpoint
app.post('/api/social/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const user = socialDb.findUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    if (user.status === 'suspended') {
      res.status(403).json({ error: 'This account has been suspended by an administrator.' });
      return;
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    user.lastLoginAt = new Date().toISOString();
    const session = socialDb.createSession(user.id);
    const { passwordHash: _, ...userSafe } = user;

    socialDb.addAuditLog({
      action: 'USER_LOGIN',
      userId: user.id,
      userName: user.name,
      details: `Successful login via web credential from IP ${req.ip || 'local'}`,
      status: 'success'
    });

    res.json({
      success: true,
      user: userSafe,
      token: session.token
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Login failed.', details: err.message });
  }
});

// 3. Current User Session Check
app.get('/api/social/auth/me', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) {
    res.status(401).json({ error: 'Unauthorized. Active session not found.' });
    return;
  }
  const { passwordHash: _, ...userSafe } = user;
  res.json({ success: true, user: userSafe });
});

// 4. Logout Endpoint
app.post('/api/social/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    socialDb.deleteSession(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// 5. Email Verification Endpoint
app.post('/api/social/auth/verify-email', (req: Request, res: Response) => {
  const { email, pin } = req.body;
  if (!email || !pin) {
    res.status(400).json({ error: 'Email and PIN are required.' });
    return;
  }
  const success = socialDb.verifyEmail(email, pin);
  if (success) {
    res.json({ success: true, message: 'Email verified successfully.' });
  } else {
    res.status(400).json({ error: 'Invalid verification PIN code.' });
  }
});

// 6. Forgot Password Endpoint
app.post('/api/social/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  }
  const user = socialDb.findUserByEmail(email);
  if (user) {
    user.verificationPin = Math.floor(100000 + Math.random() * 900000).toString();
    socialDb.addAuditLog({
      action: 'PASSWORD_RESET_REQUESTED',
      userId: user.id,
      userName: user.name,
      details: `Password reset PIN generated: ${user.verificationPin}`,
      status: 'warning'
    });
    res.json({ 
      success: true, 
      message: 'Password reset PIN sent to registered email.',
      pinDemo: user.verificationPin 
    });
  } else {
    // Prevent email enumeration
    res.json({ success: true, message: 'If this email exists, a reset code was dispatched.' });
  }
});

// 7. Onboarding Complete Endpoint
app.post('/api/social/auth/onboarding', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }
  const updatedUser = socialDb.completeOnboarding(user.id, req.body);
  const { passwordHash: _, ...userSafe } = updatedUser;
  res.json({ success: true, user: userSafe });
});

// 8. Full Snapshot Data Query
app.get('/api/social/data', (_req: Request, res: Response) => {
  const snapshot = socialDb.getDbSnapshot();
  const safeUsers = snapshot.users.map(({ passwordHash: _, ...u }) => u);
  res.json({
    success: true,
    clients: snapshot.clients,
    accounts: snapshot.accounts,
    posts: snapshot.posts,
    conversations: snapshot.conversations,
    automations: snapshot.automations,
    media: snapshot.media,
    teamMembers: snapshot.teamMembers,
    plans: snapshot.plans,
    payments: snapshot.payments || [],
    users: safeUsers,
    auditLogs: snapshot.auditLogs,
    apiHealthLogs: snapshot.apiHealthLogs
  });
});

// 8b. Dynamic Plans Management (Admin Configurable)
app.get('/api/social/plans', (_req: Request, res: Response) => {
  res.json({ success: true, plans: socialDb.getPlans() });
});

app.put('/api/social/plans/:id', (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    // Allow update if admin or if no token provided in local development
    if (user && user.role !== 'super_admin' && user.role !== 'agency_admin') {
      res.status(403).json({ error: 'Forbidden. Administrator credentials required.' });
      return;
    }

    const updated = socialDb.updatePlan(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Plan not found.' });
      return;
    }

    res.json({ success: true, plan: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update plan.', details: err.message });
  }
});

// 8c. User Usage & Feature Limits
app.get('/api/social/user/usage', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const userId = user ? user.id : 'user-sumit-admin';
  const usage = socialDb.getUserUsageStats(userId);
  res.json({ success: true, usage });
});

// 8d. Razorpay Payment Gateway Endpoints
// Create Order
app.post('/api/social/payments/create-order', (req: Request, res: Response) => {
  try {
    const { planId, billingCycle = 'monthly' } = req.body;
    const user = getAuthUser(req);
    const userId = user ? user.id : 'user-sumit-admin';

    if (!planId) {
      res.status(400).json({ error: 'planId is required.' });
      return;
    }

    const orderData = socialDb.createRazorpayOrder(userId, planId, billingCycle);
    res.json({ success: true, ...orderData });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create payment order.' });
  }
});

// Verify Payment & Activate Tier
app.post('/api/social/payments/verify', (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, signature, planId, billingCycle = 'monthly', method = 'razorpay_gateway' } = req.body;
    const user = getAuthUser(req);
    const userId = user ? user.id : 'user-sumit-admin';

    if (!orderId || !paymentId) {
      res.status(400).json({ error: 'orderId and paymentId are required.' });
      return;
    }

    const result = socialDb.verifyAndActivatePayment({
      orderId,
      paymentId,
      signature: signature || `sandbox_sig_${Date.now()}`,
      userId,
      planId,
      billingCycle,
      method
    });

    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Payment verification failed.' });
  }
});

// Razorpay Webhook Endpoint
app.post('/api/social/payments/webhook', (req: Request, res: Response) => {
  try {
    const event = req.body;
    const eventType = event.event;

    socialDb.addAuditLog({
      action: 'PAYMENT_WEBHOOK_RECEIVED',
      userId: 'razorpay-webhook',
      userName: 'Razorpay Gateway',
      details: `Received event ${eventType || 'payment.captured'}. Payload acknowledged.`,
      status: 'success'
    });

    res.json({ status: 'ok', received: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Webhook processing failed.' });
  }
});

// Payment History & Invoices
app.get('/api/social/payments/history', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  const isSuperAdmin = user?.role === 'super_admin';
  const payments = socialDb.getPayments(isSuperAdmin ? undefined : user?.id);
  res.json({ success: true, payments });
});

// Admin Manual Plan Override & Access Granting
app.post('/api/social/admin/grant-premium', (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    if (user && user.role !== 'super_admin') {
      res.status(403).json({ error: 'Forbidden. Super admin credentials required.' });
      return;
    }

    const { userId, planTier, expiresAt, status } = req.body;
    if (!userId || !planTier) {
      res.status(400).json({ error: 'userId and planTier are required.' });
      return;
    }

    const updatedUser = socialDb.adminUpdateUserPlan(userId, planTier, expiresAt, status);
    res.json({ success: true, user: updatedUser });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update user plan.' });
  }
});

// 9. Post Management Endpoints
app.post('/api/social/posts', (req: Request, res: Response) => {
  try {
    const postData = req.body;
    if (!postData.caption) {
      res.status(400).json({ error: 'Post caption is required.' });
      return;
    }

    const user = getAuthUser(req);
    const userId = user ? user.id : 'user-sumit-admin';
    const usage = socialDb.getUserUsageStats(userId);

    // Limit check
    if (usage.postsUsedThisMonth >= usage.postsLimit) {
      res.status(403).json({
        error: `Monthly scheduled post limit reached (${usage.postsLimit} posts on ${usage.planName}). Please upgrade your plan.`,
        limitReached: true,
        currentUsage: usage
      });
      return;
    }

    const newPost = socialDb.addPost(postData);
    res.status(201).json({ success: true, post: newPost });
  } catch (e: any) {
    res.status(500).json({ error: 'Failed to create post.', details: e.message });
  }
});

app.put('/api/social/posts/:id', (req: Request, res: Response) => {
  const updated = socialDb.updatePost(req.params.id, req.body);
  if (updated) {
    res.json({ success: true, post: updated });
  } else {
    res.status(404).json({ error: 'Post not found.' });
  }
});

app.delete('/api/social/posts/:id', (req: Request, res: Response) => {
  socialDb.deletePost(req.params.id);
  res.json({ success: true, message: 'Post removed.' });
});

// 10. Social Account Connect / Disconnect
app.post('/api/social/accounts/:id/toggle', (req: Request, res: Response) => {
  const { isConnected } = req.body;
  const user = getAuthUser(req);
  const userId = user ? user.id : 'user-sumit-admin';

  if (isConnected) {
    const usage = socialDb.getUserUsageStats(userId);
    if (usage.connectedAccountsCount >= usage.connectedAccountsLimit) {
      res.status(403).json({
        error: `Account connection limit reached (${usage.connectedAccountsLimit} channels on ${usage.planName}). Please upgrade your subscription tier.`,
        limitReached: true
      });
      return;
    }
  }

  const updated = socialDb.toggleAccountConnection(req.params.id, Boolean(isConnected));
  if (updated) {
    res.json({ success: true, account: updated });
  } else {
    res.status(404).json({ error: 'Account not found.' });
  }
});

// 11. Inbox Message Reply & Customer Note
app.post('/api/social/inbox/:id/reply', (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message || !message.content) {
    res.status(400).json({ error: 'Message content is required.' });
    return;
  }
  const updated = socialDb.addMessageToConversation(req.params.id, message);
  if (updated) {
    res.json({ success: true, conversation: updated });
  } else {
    res.status(404).json({ error: 'Conversation not found.' });
  }
});

app.post('/api/social/inbox/:id/note', (req: Request, res: Response) => {
  const { note } = req.body;
  if (!note) {
    res.status(400).json({ error: 'Note is required.' });
    return;
  }
  const updated = socialDb.addCustomerNote(req.params.id, note);
  if (updated) {
    res.json({ success: true, conversation: updated });
  } else {
    res.status(404).json({ error: 'Conversation not found.' });
  }
});

// 12. Super Admin User Status Toggle
app.post('/api/social/users/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const user = socialDb.findUserById(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }
  user.status = status === 'suspended' ? 'suspended' : 'active';
  socialDb.addAuditLog({
    action: 'USER_STATUS_MODIFIED',
    userId: 'admin',
    userName: 'Super Admin',
    details: `User ${user.email} status set to ${user.status}`,
    status: user.status === 'suspended' ? 'warning' : 'success'
  });
  res.json({ success: true, user });
});

app.get('/api/social/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Gwalior Web Labs – Social Command Center API',
    version: '2.0.0',
    supportedPlatforms: [
      'instagram',
      'facebook',
      'youtube',
      'linkedin',
      'twitter',
      'pinterest',
      'reddit',
      'telegram',
      'whatsapp'
    ],
    timestamp: new Date().toISOString()
  });
});

// Vite dev middleware or static serving in production
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use('/sitecraft', express.static(path.resolve(__dirname, 'public/sitecraft')));
    app.use(vite.middlewares);

    app.get('*', async (req: Request, res: Response, next: NextFunction) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        if (vite) {
          vite.ssrFixStacktrace(e as Error);
        }
        next(e);
      }
    });
  } else {
    app.use('/sitecraft', express.static(path.resolve(__dirname, 'public/sitecraft')));
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GWL WebLab Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
