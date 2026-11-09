import { jsPDF } from 'jspdf';

export interface BlueprintRecipient {
  email: string;
  name?: string;
  phone?: string;
}

/**
 * Generates an executive, multi-page "Digital Growth Blueprint (2026 Edition)" PDF
 * and initiates an immediate browser download.
 */
export function generateDigitalGrowthBlueprintPdf(recipient: BlueprintRecipient): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const currentYear = new Date().getFullYear();
  const dateFormatted = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const userName = recipient.name?.trim() || 'Executive Growth Partner';
  const userEmail = recipient.email.trim();

  // Helper: Draw standard page header & footer
  const drawPageChrome = (pageNum: number, totalPages: number, pageTitle: string) => {
    // Top bar
    doc.setFillColor(10, 15, 30);
    doc.rect(0, 0, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(52, 211, 153); // Emerald
    doc.text('GWL WEBLAB  •  TACTICAL DIGITAL BLUEPRINT', margin, 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(pageTitle, pageWidth - margin, 8, { align: 'right' });

    // Bottom footer
    doc.setFillColor(248, 250, 252);
    doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Official WhatsApp: +91 75879 39722  |  Email: gwaliorweblabs@gmail.com  |  https://gwlweblab.com`, margin, pageHeight - 5);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PAGE 1: COVER PAGE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Dark luxury cover background
  doc.setFillColor(6, 10, 20);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative Emerald Gradient bar
  doc.setFillColor(16, 185, 129);
  doc.rect(margin, 25, 40, 3, 'F');

  // Eyebrow
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(52, 211, 153);
  doc.text('TACTICAL ARCHITECTURE & REVENUE BLUEPRINT', margin, 38);

  // Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('Digital Growth Blueprint', margin, 52);

  doc.setFontSize(16);
  doc.setTextColor(148, 163, 184);
  doc.text(`${currentYear} Edition: High-Performance Web & SEO Systems`, margin, 62);

  // Subtitle / Abstract
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(203, 213, 225);
  const abstract =
    'An executive engineering teardown of how top-decile regional businesses, clinics, institutions, and modern brands turn web visitors into verified phone calls, instant WhatsApp consultations, and dominant Google local discovery.';
  const splitAbstract = doc.splitTextToSize(abstract, contentWidth);
  doc.text(splitAbstract, margin, 78);

  // Recipient Spec Box
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, 100, contentWidth, 38, 3, 3, 'F');
  doc.setDrawColor(52, 211, 153);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, 100, contentWidth, 38, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(52, 211, 153);
  doc.text('VERIFIED RECIPIENT SPECIFICATIONS', margin + 6, 108);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`Authorized For: ${userName}`, margin + 6, 116);
  doc.text(`Licensed Email: ${userEmail}`, margin + 6, 123);
  doc.text(`Release Date: ${dateFormatted}  |  Classification: Public Commercial Playbook`, margin + 6, 130);

  // Executive Table of Contents Box
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, 148, contentWidth, 90, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('EXECUTIVE PLAYBOOK ARCHITECTURE', margin + 6, 158);

  const tocItems = [
    { num: '01', title: 'Sub-Second Speed Protocol (<1s FCP & Core Web Vitals Mastery)' },
    { num: '02', title: 'Google Local 3-Pack Schema & Search Domination Blueprint' },
    { num: '03', title: '1-Tap Frictionless WhatsApp Lead Conversion Architecture' },
    { num: '04', title: 'Full Code Ownership & Zero Vendor Tax Lock-in Guarantee' },
    { num: '05', title: 'Executive Implementation Audit & Direct Engineer Consultation' }
  ];

  let tocY = 170;
  tocItems.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(52, 211, 153);
    doc.text(item.num, margin + 6, tocY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(226, 232, 240);
    doc.text(item.title, margin + 18, tocY);
    tocY += 13;
  });

  // Footer on cover
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Published by GWL WebLab • Gwalior WebLab • Global WebLab • WhatsApp Desk: +91 75879 39722',
    pageWidth / 2,
    pageHeight - 12,
    { align: 'center' }
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PAGE 2: SUB-SECOND SPEED PROTOCOL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  doc.addPage();
  drawPageChrome(2, 5, 'Chapter 01: Core Web Vitals');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text('01. Sub-Second Speed Architecture', margin, 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Every 100ms of latency reduction directly correlates with an 8-12% uplift in conversion. Slow websites leak traffic.',
    margin,
    33
  );

  // 3 Metric Cards
  const cardWidth = (contentWidth - 8) / 3;
  const metrics = [
    { label: 'LCP (Largest Contentful Paint)', val: '< 1.2s', sub: 'Target: 98+ Mobile Score' },
    { label: 'CLS (Cumulative Layout Shift)', val: '0.00', sub: 'Zero Visual Jitter' },
    { label: 'INP (Interaction to Next Paint)', val: '< 120ms', sub: 'Instant Touch Response' }
  ];

  metrics.forEach((m, idx) => {
    const x = margin + idx * (cardWidth + 4);
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(x, 42, cardWidth, 28, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(x, 42, cardWidth, 28, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, x + 3, 48, { maxWidth: cardWidth - 6 });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(5, 150, 105);
    doc.text(m.val, x + 3, 59);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(m.sub, x + 3, 66);
  });

  // Actionable Rules
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Key Technical Directives for Speed & Efficiency', margin, 80);

  const speedRules = [
    {
      title: 'Eliminate Heavy WordPress / Builder Bloat',
      body: 'Standard WP themes load 40-70 third-party JS/CSS plugins. Handcrafted React/Vite builds ship < 80KB gzipped code, enabling instant first paints on mobile.'
    },
    {
      title: 'Image & Asset Pipeline Optimization',
      body: 'Deliver next-gen WebP/AVIF formats with explicit width/height attributes to eliminate layout reflow. Lazy-load all offscreen elements.'
    },
    {
      title: 'Edge CDN Caching & Immutable Static Assets',
      body: 'Utilize global Edge networks (Cloudflare/Vercel/Fastly) with cache-control max-age=31536000 for static hashed chunks.'
    },
    {
      title: 'Sub-Zero Main Thread Script Blocking',
      body: 'Defer analytics, tracking pixels, and widgets until after requestIdleCallback() or first user interaction.'
    }
  ];

  let ruleY = 90;
  speedRules.forEach((rule) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(margin + 2, ruleY - 1, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(rule.title, margin + 7, ruleY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const splitBody = doc.splitTextToSize(rule.body, contentWidth - 7);
    doc.text(splitBody, margin + 7, ruleY + 5);
    ruleY += 24;
  });

  // Code Snippet Box
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, 192, contentWidth, 52, 2, 2, 'F');
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(52, 211, 153);
  doc.text('// Recommended HTML Preconnect & Resource Hint Header', margin + 5, 200);
  doc.setTextColor(241, 245, 249);
  doc.text('<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />', margin + 5, 206);
  doc.text('<link rel="preload" as="image" href="/hero-poster.webp" type="image/webp" />', margin + 5, 212);
  doc.text('<meta http-equiv="Cache-Control" content="public, max-age=31536000, immutable" />', margin + 5, 218);
  doc.setTextColor(148, 163, 184);
  doc.text('/* Result: First Contentful Paint drops from 2.8s down to 0.65s */', margin + 5, 226);
  doc.text('/* Lighthouse Mobile Audit: 98 to 100 guaranteed */', margin + 5, 232);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PAGE 3: GOOGLE LOCAL 3-PACK DOMINATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  doc.addPage();
  drawPageChrome(3, 5, 'Chapter 02: Local SEO Domination');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text('02. Google Local 3-Pack & Schema Architecture', margin, 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Over 74% of high-intent local purchase decisions start with Google Maps and the Local 3-Pack.',
    margin,
    33
  );

  // Architecture Pillars
  const seoPillars = [
    {
      title: '1. Machine-Readable Schema.org JSON-LD Markup',
      desc: 'Do not rely on Google guessing your services. Hardcode LocalBusiness, ProfessionalService, and MedicalBusiness structured data linking your geo-coordinates, telephone (+91 75879 39722), opening hours, and service catalogs.'
    },
    {
      title: '2. NAP Consistency Across City Directories',
      desc: 'Name, Address, and Phone must match character-for-character across your website, Google Business Profile, Justdial, and Indiamart. Any discrepancy degrades local pack ranking confidence.'
    },
    {
      title: '3. Hyperlocal Service-City Page Silos',
      desc: 'Build dedicated sub-routes for each core offering and geographic node (e.g., /services/orthopedic-center-city-centre) rather than collapsing all services into a generic, weak single page.'
    },
    {
      title: '4. High-Frequency Review Velocity & Response Protocols',
      desc: 'Active reviews with keyword-rich responses (mentioning specific procedures or services) signal fresh operational vitality to the Google Local algorithm.'
    }
  ];

  let seoY = 46;
  seoPillars.forEach((p) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, seoY, contentWidth, 30, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, seoY, contentWidth, 30, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(p.title, margin + 4, seoY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(p.desc, contentWidth - 8);
    doc.text(splitDesc, margin + 4, seoY + 14);

    seoY += 34;
  });

  // Schema snippet
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, 188, contentWidth, 54, 2, 2, 'F');
  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(52, 211, 153);
  doc.text('{', margin + 5, 196);
  doc.text('  "@context": "https://schema.org",', margin + 5, 201);
  doc.text('  "@type": "LocalBusiness",', margin + 5, 206);
  doc.text('  "name": "Your Brand / Practice",', margin + 5, 211);
  doc.text('  "telephone": "+91-7587939722",', margin + 5, 216);
  doc.text('  "areaServed": ["Gwalior", "Madhya Pradesh", "Regional Hubs"],', margin + 5, 221);
  doc.text('  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "142" }', margin + 5, 226);
  doc.text('}', margin + 5, 231);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PAGE 4: 1-TAP WHATSAPP FUNNEL MECHANICS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  doc.addPage();
  drawPageChrome(4, 5, 'Chapter 03: Conversion Funnels');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text('03. 1-Tap Frictionless WhatsApp Conversion', margin, 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Traditional 7-field contact forms lose 65%+ of mobile traffic. Modern users convert in WhatsApp within 10 seconds.',
    margin,
    33
  );

  // Funnel comparison box
  const colW = (contentWidth - 6) / 2;
  // Old form
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(margin, 42, colW, 64, 2, 2, 'F');
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, 42, colW, 64, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(185, 28, 28);
  doc.text('❌ TRADITIONAL WEB INQUIRY FORM', margin + 4, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(127, 29, 29);
  doc.text('• Requires 6-8 mandatory input fields', margin + 4, 58);
  doc.text('• Requires email address (high drop-off on mobile)', margin + 4, 65);
  doc.text('• Inquiry lands in unmonitored spam inbox', margin + 4, 72);
  doc.text('• Response takes 24-48 hours (lead cools off)', margin + 4, 79);
  doc.text('• Average Conversion Rate: 1.8% to 2.4%', margin + 4, 86);
  doc.text('• Zero instant conversational rapport', margin + 4, 93);

  // New WhatsApp funnel
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin + colW + 6, 42, colW, 64, 2, 2, 'F');
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin + colW + 6, 42, colW, 64, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(21, 128, 61);
  doc.text('✅ 1-TAP WHATSAPP ENGINE (GWL WEBLAB)', margin + colW + 10, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(20, 83, 45);
  doc.text('• 1 Tap launches native chat app directly', margin + colW + 10, 58);
  doc.text('• Pre-formats user budget, package & notes', margin + colW + 10, 65);
  doc.text('• Client phone number verified automatically', margin + colW + 10, 72);
  doc.text('• Under 5-minute response turnaround', margin + colW + 10, 79);
  doc.text('• Average Conversion Rate: 8.5% to 14.2%', margin + colW + 10, 86);
  doc.text('• Lifelong direct customer relationship', margin + colW + 10, 93);

  // Conversion Architecture Playbook
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('The 4 Rules of WhatsApp Conversion Architecture', margin, 116);

  const rules = [
    { title: 'A. Sticky Floating Action Pill', text: 'Persistent bottom-right thumb-accessible trigger on mobile viewports.' },
    { title: 'B. Contextual Intent Pre-population', text: 'Include service name and specific problem in message query so client never types from blank.' },
    { title: 'C. Zero-Intermediary Native Deep-Linking', text: 'Directs straight to WhatsApp without landing on generic intermediate contact gatekeeper pages.' },
    { title: 'D. Automated CRM Handshake', text: 'Synchronize inbound WhatsApp leads directly into Google Sheets or CRM with timestamped notes.' }
  ];

  let rY = 126;
  rules.forEach((r) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(5, 150, 105);
    doc.text(r.title, margin, rY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(r.text, margin, rY + 5);
    rY += 14;
  });

  // Checklist box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, 188, contentWidth, 54, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('IMMEDIATE TACTICAL AUDIT CHECKLIST:', margin + 5, 196);

  const checklist = [
    '[ ] Test website on Google PageSpeed Mobile (aim for score > 90)',
    '[ ] Verify NAP consistency across Google Maps and website footer',
    '[ ] Add 1-tap WhatsApp click-to-chat button with prefilled brief',
    '[ ] Ensure pricing tiers are transparent with clear starting points',
    '[ ] Confirm 100% full source code ownership without recurring platform fees'
  ];

  let cY = 205;
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  checklist.forEach((item) => {
    doc.text(item, margin + 5, cY);
    cY += 7;
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PAGE 5: EXECUTIVE ROADMAP & NEXT STEPS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  doc.addPage();
  drawPageChrome(5, 5, 'Chapter 04: Execution Roadmap');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text('04. Engineering Roadmap & Direct Audit', margin, 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Transforming your digital presence into an automated sales engine requires clear milestones.',
    margin,
    33
  );

  // 4 Execution Stages
  const stages = [
    {
      num: 'STAGE 1 (Days 1–3)',
      name: 'Diagnostic & Architecture Blueprint',
      desc: 'Deep audit of existing domain, competitors in Google Local 3-Pack, speed bottlenecks, and conversion leakage.'
    },
    {
      num: 'STAGE 2 (Days 4–7)',
      name: 'Sub-Second React/Vite Core Build',
      desc: 'Clean bespoke responsive code, 1-tap WhatsApp trigger integration, modern typography, zero bloat.'
    },
    {
      num: 'STAGE 3 (Days 8–11)',
      name: 'Schema.org & Google Local Indexing',
      desc: 'Machine-readable structured data injection, Google Search Console indexing, Core Web Vitals optimization.'
    },
    {
      num: 'STAGE 4 (Day 12+)',
      name: 'Launch & Zero-Tax Handover',
      desc: '100% full source code and domain ownership handed over. Zero recurring platform tax. 30-day technical warranty.'
    }
  ];

  let stY = 44;
  stages.forEach((st) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, stY, contentWidth, 26, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, stY, contentWidth, 26, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(16, 185, 129);
    doc.text(st.num, margin + 4, stY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(st.name, margin + 45, stY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const splitStDesc = doc.splitTextToSize(st.desc, contentWidth - 8);
    doc.text(splitStDesc, margin + 4, stY + 14);

    stY += 30;
  });

  // Callout Box for Direct Consultation
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, 172, contentWidth, 68, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Ready to Claim Your Digital Growth System?', margin + 8, 184);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  const consultText =
    'Our senior engineering desk provides a zero-obligation 15-minute technical audit. We review your live website performance, identify your #1 conversion leak, and outline a fixed milestone roadmap.';
  doc.text(doc.splitTextToSize(consultText, contentWidth - 16), margin + 8, 192);

  doc.setFillColor(16, 185, 129);
  doc.roundedRect(margin + 8, 212, contentWidth - 16, 20, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(6, 10, 20);
  doc.text('Direct WhatsApp: +91 75879 39722  |  Email: gwaliorweblabs@gmail.com', margin + 12, 222);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Message: "Hello GWL WebLab, I reviewed the Digital Growth Blueprint and would like an audit."', margin + 12, 228);

  // Trigger browser download of generated PDF
  doc.save(`GWL-WebLab-Digital-Growth-Blueprint-${currentYear}.pdf`);
}
