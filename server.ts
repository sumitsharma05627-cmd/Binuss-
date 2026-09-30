import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

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
   - WhatsApp / Phone: Instant consultation via WhatsApp (+91 97550 61139)
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
      reply: 'At GWL WebLab, we engineer high-performance web systems and local SEO. Let\'s connect directly via WhatsApp (+91 97550 61139) to review your project!'
    });
  }
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
        port: PORT
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KBSR Digital Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
