# Gwalior Web Labs – Social Command Center

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)
[![Platform: Node.js / React](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Tailwind-blue.svg)](https://gwlweblab.com)
[![Multi-Tenant Architecture](https://img.shields.io/badge/Security-Supabase%20RLS%20Isolated-cyan.svg)](./supabase/migrations/20261107_social_command_center_rls.sql)

**Gwalior Web Labs – Social Command Center** is a modern, open-source, multi-user social media management platform designed for individual creators, freelancers, businesses, and digital marketing agencies.

Developed and maintained by **[Gwalior Web Labs](https://gwlweblab.com)**, this platform centralizes social publishing, cross-channel analytics, audience inbox management, and automated workflows into one unified command center.

---

## 🌟 Key Features

### 1. Multi-Tenant Architecture & Complete Data Isolation
- **Row-Level Security (RLS):** Every user receives an isolated private workspace upon registration. Users can never view or modify other tenants' connected channels, scheduled posts, analytics, or client accounts.
- **Role-Based Access Control (RBAC):** Supports Administrators, Workspace Owners, Content Creators, and Client Reviewers with granular permission controls.
- **Real-Time Data Only:** Zero invented statistics or synthetic demo numbers. All metrics (impressions, reach, likes, clicks, followers) come directly from live database records or verified third-party API callbacks.

### 2. Official Social Media Integrations (9 Platforms)
- **Instagram:** Professional & Creator account publishing, Reels, audience growth analytics.
- **Facebook Pages:** Scheduled page updates, carousel posts, community comments.
- **YouTube:** Video publishing, YouTube Shorts scheduling, subscriber metrics.
- **LinkedIn:** Personal profiles and Company Organization Pages broadcast scheduling.
- **X (Twitter):** Real-time tweet dispatch, thread composer, character counter.
- **WhatsApp Business Cloud API:** Automated customer communication and CRM conversations.
- **Pinterest:** Pin scheduling with destination URL tracking and board picker.
- **Reddit:** Subreddit post dispatch with markdown formatting and flair support.
- **Telegram:** Channel broadcast bot dispatch with rich formatting.

### 3. Omnichannel Publishing Studio & Content Calendar
- Multi-channel post composer with live device preview mockups (iPhone & Android UI).
- Interactive drag-and-drop content calendar with Month, Week, and Day timeline views.
- Media library with digital asset management (images, videos, graphics).
- Post approval workflows with client review checkpoints.

### 4. Unified Social Inbox & CRM
- Centralized inbox consolidating direct messages and comments across channels.
- Customer sentiment classification (Positive, Neutral, Negative, Urgent).
- Internal team collaboration notes and saved response templates.

### 5. Analytics & Executive Reporting
- Cross-channel reach, impression, and engagement velocity tracking.
- Dynamic leaderboard ranking highest-performing content assets.
- One-click branded executive PDF generation (`jspdf`) and CSV export.

### 6. AI Content Assistant
- AI caption generation, hashtag clustering, and tone calibration powered by Gemini.
- Best time to post recommendations based on audience activity windows.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18.x or 20.x
- npm 9.x+ (or Bun)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/gwaliorweblabs/social-command-center.git
cd social-command-center
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

### 3. Start the Full-Stack Application
```bash
npm run dev
```
Open your browser to `http://localhost:3000`.

---

## 🗄️ Database Setup & Supabase Migration

The platform includes two storage options:
1. **Local Persistent Storage (Default):** Runs immediately with `data/social_command_db.json`, maintaining full multi-tenant isolation, session tokens, and cryptographic password hashing out-of-the-box.
2. **Supabase / PostgreSQL with Row Level Security (Production Cloud):**
   - Create a project on [Supabase](https://supabase.com).
   - In Supabase SQL Editor, run the migration script:
     ```bash
     supabase/migrations/20261107_social_command_center_rls.sql
     ```
   - Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` in your `.env` file.

---

## 🔒 Security & Privacy

- **Token Protection:** Third-party OAuth tokens and API secrets are encrypted at rest using AES-256.
- **Authentication:** Salted PBKDF2/Bcrypt password hashing with JWT bearer session tokens.
- **Zero Mock Fallback:** When a new user logs in, the dashboard begins with a clean empty slate (`0 accounts`, `0 posts`), displaying guided empty state actions.
- **Developer Policies:** Complies with Meta Platform Terms, Google API Services User Data Policy, LinkedIn API Terms, and Twitter Developer Agreement.

---

## 📜 Legal & Compliance

- **[Terms of Service](./src/social-command-center/components/legal/TermsOfServiceModal.tsx)**
- **[Privacy Policy](./src/social-command-center/components/legal/PrivacyPolicyModal.tsx)**
- **[Help & Documentation](./src/social-command-center/components/support/HelpSupportModal.tsx)**

---

## 💼 Developer & Agency Contact

Developed by **Gwalior Web Labs**
- **Website:** [https://gwlweblab.com](https://gwlweblab.com)
- **Email:** gwaliorweblabs@gmail.com
- **Phone / WhatsApp:** +91 75879 39722
- **Headquarters:** Gwalior, Madhya Pradesh, India

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
