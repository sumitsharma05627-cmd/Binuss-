import JSZip from 'jszip';
import { WebsiteTemplate } from '../components/WebsiteTemplates';

export interface CustomizationData {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  primaryColor: string;
  ctaText: string;
  aboutStory?: string;
  workingHours?: string;
}

export function generateStaticHtml(
  page: 'index' | 'about' | 'services' | 'pricing' | 'contact',
  template: WebsiteTemplate,
  data: CustomizationData
): string {
  const brand = data.businessName.trim() || template.name;
  const tagline = data.tagline.trim() || template.tagline;
  const phone = data.phone.trim() || '+91 97550 61139';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const email = data.email.trim() || 'contact@' + brand.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
  const address = data.address.trim() || 'Medical Enclave / Commercial Plaza, Main City Center';
  const color = data.primaryColor || template.primaryColor;
  const cta = data.ctaText.trim() || template.defaultCta;
  const aboutStory = data.aboutStory?.trim() || `${brand} is dedicated to delivering industry-leading excellence, customer-first service, and transparent solutions. Engineered for modern clients who expect speed, reliability, and precision.`;
  const workingHours = data.workingHours?.trim() || 'Mon – Sat: 09:00 AM – 08:00 PM (Emergency: 24/7)';

  const waBase = `https://wa.me/${cleanPhone || '919755061139'}?text=` + encodeURIComponent(`Hello ${brand}, I would like to inquire regarding your services.`);

  const pageTitles: Record<string, string> = {
    index: `${brand} — Official Website`,
    about: `About Us — ${brand}`,
    services: `Services & Offerings — ${brand}`,
    pricing: `Transparent Packages & Plans — ${brand}`,
    contact: `Contact & Bookings — ${brand}`
  };

  const navItems = [
    { href: 'index.html', label: 'Home', active: page === 'index' },
    { href: 'about.html', label: 'About', active: page === 'about' },
    { href: 'services.html', label: 'Services', active: page === 'services' },
    { href: 'pricing.html', label: 'Pricing', active: page === 'pricing' },
    { href: 'contact.html', label: 'Contact', active: page === 'contact' }
  ];

  let bodyContent = '';

  if (page === 'index') {
    bodyContent = `
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="badge">⚡ Sub-Second Performance Guaranteed</div>
          <h1>${brand}</h1>
          <p class="hero-sub">${tagline}</p>
          <div class="btn-group">
            <a href="${waBase}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${cta}</a>
            <a href="services.html" class="btn btn-outline">Explore Offerings</a>
          </div>
          <div class="hero-image-wrap">
            <img src="${template.heroImage}" alt="${brand}" class="hero-img" loading="lazy" />
          </div>
        </div>
      </section>

      <!-- Key Highlights -->
      <section class="section bg-alt">
        <div class="container">
          <div class="section-header">
            <h2>Why Choose ${brand}</h2>
            <p>Built with enterprise standards, sub-second response times, and customer-first care.</p>
          </div>
          <div class="grid grid-3">
            ${template.highlights.map(h => `
              <div class="card feature-card">
                <div class="feature-icon">✓</div>
                <h3>${h}</h3>
                <p>Designed to deliver guaranteed outcomes without unnecessary friction.</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Services Teaser -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2>Featured Services</h2>
            <p>Comprehensive solutions tailored to your unique requirements.</p>
          </div>
          <div class="grid grid-3">
            ${template.features.map(f => `
              <div class="card">
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
                <a href="${waBase}" target="_blank" rel="noopener noreferrer" class="link-cta">Inquire Now →</a>
              </div>
            `).join('')}
          </div>
          <div style="text-align:center; margin-top:2.5rem;">
            <a href="services.html" class="btn btn-primary">View All Services</a>
          </div>
        </div>
      </section>
    `;
  } else if (page === 'about') {
    bodyContent = `
      <section class="page-header">
        <div class="container">
          <div class="badge">Who We Are</div>
          <h1>About ${brand}</h1>
          <p class="hero-sub">Committed to excellence, integrity, and verified results.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="grid grid-2">
            <div>
              <h2>Our Story & Mission</h2>
              <p style="margin-bottom:1.5rem; line-height:1.7;">${aboutStory}</p>
              <p style="line-height:1.7;">We leverage modern technology, transparent communication, and verified benchmarks to ensure our clients consistently achieve top-tier satisfaction.</p>
              <div style="margin-top:2rem;">
                <a href="${waBase}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Connect with Founder</a>
              </div>
            </div>
            <div>
              <img src="${template.heroImage}" alt="${brand} Team" class="rounded-img" style="width:100%; border-radius:1rem; box-shadow:0 10px 25px rgba(0,0,0,0.1);" />
            </div>
          </div>
        </div>
      </section>

      <section class="section bg-alt">
        <div class="container">
          <div class="section-header">
            <h2>Our Core Values</h2>
            <p>Principles that guide every consultation and service delivery.</p>
          </div>
          <div class="grid grid-3">
            <div class="card">
              <h3>Uncompromised Speed</h3>
              <p>We respect your time. Zero bureaucratic waiting and instant direct communication.</p>
            </div>
            <div class="card">
              <h3>Complete Transparency</h3>
              <p>No hidden charges, no sudden upsells, and 100% upfront clarity on deliverables.</p>
            </div>
            <div class="card">
              <h3>Client-First Outcomes</h3>
              <p>Your satisfaction is our primary benchmark. We build relationships, not just transactions.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  } else if (page === 'services') {
    bodyContent = `
      <section class="page-header">
        <div class="container">
          <div class="badge">Engineered Offerings</div>
          <h1>Our Core Services</h1>
          <p class="hero-sub">Specialized solutions engineered for quality, turnaround, and satisfaction.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="grid grid-3">
            ${template.features.map((f, idx) => `
              <div class="card service-card">
                <span class="service-number">0${idx + 1}</span>
                <h3>${f.title}</h3>
                <p style="margin-bottom:1.5rem;">${f.desc}</p>
                <div class="card-footer">
                  <span class="service-badge">Turnkey SLA</span>
                  <a href="${waBase}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Book Service</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  } else if (page === 'pricing') {
    bodyContent = `
      <section class="page-header">
        <div class="container">
          <div class="badge">Transparent Pricing</div>
          <h1>Packages & Plans</h1>
          <p class="hero-sub">Simple, predictable pricing with zero recurring platform tax.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="grid grid-3">
            <div class="card pricing-card">
              <h3>Standard Launch</h3>
              <p class="pricing-desc">Ideal for small clinics, offices, and emerging brands.</p>
              <div class="price">₹14,999</div>
              <ul class="pricing-list">
                <li>Essential Multipage Architecture</li>
                <li>WhatsApp 1-Tap Booking System</li>
                <li>Sub-Second Mobile Optimization</li>
                <li>Google Maps Local SEO Setup</li>
              </ul>
              <a href="${waBase}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="width:100%;">Get Started</a>
            </div>

            <div class="card pricing-card featured">
              <div class="featured-badge">MOST POPULAR</div>
              <h3>Growth Accelerator</h3>
              <p class="pricing-desc">Complete end-to-end digital setup with automated booking.</p>
              <div class="price">₹24,999</div>
              <ul class="pricing-list">
                <li>Everything in Standard Launch</li>
                <li>Dynamic Schema.org Local Pack Top 3</li>
                <li>Interactive Fee / Estimation Calculator</li>
                <li>VIP Priority Support (15-Min Response)</li>
              </ul>
              <a href="${waBase}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width:100%;">Select Growth Plan</a>
            </div>

            <div class="card pricing-card">
              <h3>Enterprise & Custom</h3>
              <p class="pricing-desc">Bespoke integrations, CRM sync, and multi-location setups.</p>
              <div class="price">₹44,999</div>
              <ul class="pricing-list">
                <li>Multi-Location Architecture</li>
                <li>Custom Client Intake Webhook</li>
                <li>Full Dedicated Engineer Assignment</li>
                <li>Lifetime 100% Code Ownership</li>
              </ul>
              <a href="${waBase}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="width:100%;">Request Proposal</a>
            </div>
          </div>
        </div>
      </section>
    `;
  } else if (page === 'contact') {
    bodyContent = `
      <section class="page-header">
        <div class="container">
          <div class="badge">Get in Touch</div>
          <h1>Contact ${brand}</h1>
          <p class="hero-sub">We are here to assist you. Connect directly or schedule a visit.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="grid grid-2">
            <div>
              <h2>Contact Details</h2>
              <div class="contact-info-list">
                <div class="contact-item">
                  <strong>📞 Phone / WhatsApp:</strong>
                  <p><a href="tel:${cleanPhone}">${phone}</a></p>
                </div>
                <div class="contact-item">
                  <strong>✉️ Official Email:</strong>
                  <p><a href="mailto:${email}">${email}</a></p>
                </div>
                <div class="contact-item">
                  <strong>📍 Physical Address:</strong>
                  <p>${address}</p>
                </div>
                <div class="contact-item">
                  <strong>⏰ Operating Hours:</strong>
                  <p>${workingHours}</p>
                </div>
              </div>
            </div>

            <div>
              <div class="card">
                <h3>Send an Instant Message</h3>
                <p style="margin-bottom:1.5rem; font-size:0.9rem;">Fill in your details below to connect directly via our prioritized WhatsApp triage.</p>
                <form id="contact-form" onsubmit="event.preventDefault(); var n=document.getElementById('c-name').value; var m=document.getElementById('c-msg').value; window.open('${waBase}&text=' + encodeURIComponent('Inquiry from ' + n + ': ' + m), '_blank');">
                  <div style="margin-bottom:1rem;">
                    <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.4rem;">Your Name</label>
                    <input type="text" id="c-name" required placeholder="Enter full name" style="width:100%; padding:0.65rem 0.85rem; border-radius:0.5rem; border:1px solid #cbd5e1; font-size:0.9rem;" />
                  </div>
                  <div style="margin-bottom:1rem;">
                    <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.4rem;">Message / Inquiry</label>
                    <textarea id="c-msg" required rows="3" placeholder="Tell us about your requirements" style="width:100%; padding:0.65rem 0.85rem; border-radius:0.5rem; border:1px solid #cbd5e1; font-size:0.9rem;"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary" style="width:100%;">Dispatch to WhatsApp</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitles[page] || brand}</title>
  <meta name="description" content="${tagline}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css" />
  <style>
    :root {
      --primary: ${color};
      --primary-hover: ${color}ee;
      --primary-light: ${color}15;
    }
  </style>
</head>
<body>
  <!-- Navigation Header -->
  <header class="site-header">
    <div class="container nav-container">
      <a href="index.html" class="logo">${brand}</a>
      <nav class="nav-menu">
        ${navItems.map(item => `
          <a href="${item.href}" class="nav-link ${item.active ? 'active' : ''}">${item.label}</a>
        `).join('')}
      </nav>
      <div class="nav-action">
        <a href="${waBase}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">${cta}</a>
      </div>
    </div>
  </header>

  <main>
    ${bodyContent}
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container footer-container">
      <div>
        <div class="footer-logo">${brand}</div>
        <p class="footer-desc">${tagline}</p>
        <p class="footer-contact">📞 ${phone} • ✉️ ${email}</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>Navigation</h4>
          <a href="index.html">Home</a>
          <a href="about.html">About Us</a>
          <a href="services.html">Services</a>
          <a href="pricing.html">Pricing</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Assurance</h4>
          <span>✓ Sub-Second Speed</span>
          <span>✓ 100% Code Ownership</span>
          <span>✓ Local SEO Schema</span>
          <span>✓ Zero Recurring Tax</span>
        </div>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© ${new Date().getFullYear()} ${brand}. All rights reserved.</p>
      <p style="font-size:0.8rem; color:#64748b;">Engineered with GWL WebLab High-Performance Architecture</p>
    </div>
  </footer>
</body>
</html>`;
}

export function generateStyleCss(primaryColor: string): string {
  return `/* Clean Modern Production Stylesheet — Ready for Any Host */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #0f172a;
  background-color: #ffffff;
  line-height: 1.6;
}

.container {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

/* Header & Nav */
.site-header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
  z-index: 100;
  padding: 1rem 0;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: #475569;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.active {
  color: var(--primary, #059669);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.4rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-sm {
  padding: 0.45rem 1rem;
  font-size: 0.8rem;
}

.btn-primary {
  background-color: var(--primary, #059669);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  filter: brightness(0.92);
  transform: translateY(-1px);
}

.btn-outline {
  background: #f8fafc;
  color: #1e293b;
  border: 1px solid #cbd5e1;
}

.btn-outline:hover {
  background: #f1f5f9;
}

/* Hero Section */
.hero {
  padding: 4rem 0 3rem;
  text-align: center;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
}

.badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background-color: var(--primary-light, rgba(5,150,105,0.1));
  color: var(--primary, #059669);
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-sub {
  font-size: 1.15rem;
  color: #64748b;
  max-width: 650px;
  margin: 0 auto 2rem;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.hero-image-wrap {
  max-width: 900px;
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.hero-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;
}

/* Sections */
.section {
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #64748b;
  font-size: 1rem;
}

.bg-alt {
  background-color: #f8fafc;
}

.page-header {
  padding: 3rem 0 2rem;
  text-align: center;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

/* Grid & Cards */
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  align-items: center;
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px -2px rgba(0,0,0,0.08);
}

.feature-icon {
  width: 2rem;
  height: 2rem;
  background: var(--primary-light, rgba(5,150,105,0.1));
  color: var(--primary, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
}

.service-number {
  font-size: 0.8rem;
  font-weight: 800;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.service-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary, #059669);
}

.link-cta {
  color: var(--primary, #059669);
  font-weight: 700;
  text-decoration: none;
  font-size: 0.9rem;
}

/* Pricing Cards */
.pricing-card {
  text-align: center;
  position: relative;
}

.pricing-card.featured {
  border: 2px solid var(--primary, #059669);
  box-shadow: 0 10px 25px rgba(5, 150, 105, 0.15);
}

.featured-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary, #059669);
  color: white;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.8rem;
  border-radius: 9999px;
  letter-spacing: 0.05em;
}

.price {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 1rem 0;
  color: #0f172a;
}

.pricing-desc {
  font-size: 0.85rem;
  color: #64748b;
}

.pricing-list {
  list-style: none;
  text-align: left;
  margin: 1.5rem 0 2rem;
  font-size: 0.85rem;
}

.pricing-list li {
  padding: 0.4rem 0;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pricing-list li::before {
  content: '✓';
  color: var(--primary, #059669);
  font-weight: bold;
}

/* Contact List */
.contact-info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.contact-item strong {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.contact-item a {
  color: var(--primary, #059669);
  text-decoration: none;
  font-weight: 600;
}

/* Footer */
.site-footer {
  background: #0f172a;
  color: #f8fafc;
  padding: 4rem 0 2rem;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.footer-logo {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.footer-desc {
  color: #94a3b8;
  max-width: 320px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.footer-contact {
  color: #cbd5e1;
  font-size: 0.85rem;
}

.footer-links {
  display: flex;
  gap: 3rem;
}

.footer-col h4 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-bottom: 1rem;
}

.footer-col a, .footer-col span {
  display: block;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: #ffffff;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #1e293b;
  padding-top: 2rem;
  font-size: 0.85rem;
  color: #64748b;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (max-width: 768px) {
  h1 { font-size: 2rem; }
  .nav-menu { display: none; }
  .footer-container { flex-direction: column; gap: 2rem; }
  .footer-links { flex-direction: column; gap: 1.5rem; }
}
`;
}

export function generateDeployGuide(brand: string): string {
  return `# Deployment Guide for ${brand} Website
Generated by GWL WebLab Multipage Web Engine.

Your website is 100% static, fast, and dependency-free. It can be hosted on ANY hosting provider in under 60 seconds without installing Node.js or databases.

---

## Option 1: Host on cPanel / Hostinger / GoDaddy (Shared Web Hosting)
1. Log in to your hosting account (cPanel or Hostinger hPanel).
2. Open **File Manager** and navigate to your domain's public folder (usually \`public_html\`).
3. Click **Upload** and upload the extracted files:
   - \`index.html\`
   - \`about.html\`
   - \`services.html\`
   - \`pricing.html\`
   - \`contact.html\`
   - \`style.css\`
4. Visit your domain in your browser — your website is immediately live!

---

## Option 2: Host on Netlify (100% Free with Automatic SSL)
1. Visit https://app.netlify.com and log in / create a free account.
2. Go to **Sites** and drag & drop the entire unzipped website folder into the upload dropzone.
3. Your site is live in ~10 seconds!
4. Add your custom domain under **Domain Management** with 1-click free SSL.

---

## Option 3: Host on Vercel (100% Free with Global CDN)
1. Visit https://vercel.com/new
2. Connect your GitHub repository or drag and drop your folder using Vercel CLI (\`vercel --prod\`).
3. Set root directory to \`./\` and click **Deploy**.

---

## Option 4: Free White-Glove Launch by GWL WebLab
If you want our engineering team to handle DNS configuration, domain SSL, and CDN setup for you at ₹0 cost under our promotion:
- WhatsApp us directly at: **+91 97550 61139**
- Message: *"Hi GWL WebLab, I downloaded my ${brand} template package and would like free white-glove hosting setup on my domain."*
`;
}

export async function downloadMultipageZip(
  template: WebsiteTemplate,
  data: CustomizationData
): Promise<void> {
  const zip = new JSZip();
  const brand = data.businessName.trim() || template.name;
  const folderName = brand.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'multipage-site';

  // Generate all 5 HTML pages
  const indexHtml = generateStaticHtml('index', template, data);
  const aboutHtml = generateStaticHtml('about', template, data);
  const servicesHtml = generateStaticHtml('services', template, data);
  const pricingHtml = generateStaticHtml('pricing', template, data);
  const contactHtml = generateStaticHtml('contact', template, data);
  const styleCss = generateStyleCss(data.primaryColor || template.primaryColor);
  const deployGuide = generateDeployGuide(brand);

  // Add files to zip
  zip.file('index.html', indexHtml);
  zip.file('about.html', aboutHtml);
  zip.file('services.html', servicesHtml);
  zip.file('pricing.html', pricingHtml);
  zip.file('contact.html', contactHtml);
  zip.file('style.css', styleCss);
  zip.file('DEPLOY_GUIDE.md', deployGuide);

  // Generate zip blob
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `${folderName}-multipage-website.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
