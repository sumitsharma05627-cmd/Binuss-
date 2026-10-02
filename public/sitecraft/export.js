// SiteCraft Direct Inquiry & Specification Export Engine
(function() {
  window.SiteCraftExport = {
    whatsappNumber: '919755061139',

    generateWhatsAppUrl: function(templateId, customNotes) {
      var template = (window.SITECRAFT_TEMPLATES || []).find(function(t) { return t.id === templateId; }) || (window.SITECRAFT_TEMPLATES && window.SITECRAFT_TEMPLATES[0]);
      var brandName = window.SiteCraftAdvanced ? window.SiteCraftAdvanced.customBrand : '';
      var chosenColor = window.SiteCraftAdvanced ? window.SiteCraftAdvanced.currentColor : 'emerald';

      var lines = [
        '✨ *GWL WEBLAB — VIP TEMPLATE RESERVATION & FREE SETUP BRIEF* ✨',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '👋 *Namaste & Hello GWL WebLab Engineering Team,*',
        '',
        'I have tested and customized the *' + (template ? template.name : 'Web Engine') + '* architecture on your website and would like to claim the *100% Free Turnkey Setup* for my business!',
        '',
        '🏢 *MY CUSTOMIZED BUSINESS CONFIGURATION:*',
        '• *Base Architecture:* ' + (template ? template.name : 'Business Template') + (template ? ' (' + template.badge + ')' : ''),
        '• *My Business Name:* ' + (brandName || '[My Brand Name]'),
        '• *Chosen Accent Theme:* ' + chosenColor,
        '• *Special Notes / Focus:* ' + (customNotes || 'Turnkey setup + Local SEO + WhatsApp lead engine'),
        '',
        '🎁 *ACTIVE PROMOTION:*',
        '• *Setup Fee:* 100% FREE FOR NOW (₹0 Setup Cost • Saved ' + (template ? template.originalPrice : '₹24,999') + ')',
        '• *Turnaround SLA:* ' + (template ? template.turnaround : '3-5 Business Days'),
        '• *Ownership:* 100% Full Ownership • Zero Recurring Platform Fees',
        '',
        '⚡ *INCLUDED HIGH-PERFORMANCE DELIVERABLES:*',
        '✅ Sub-Second Mobile Speed (98+ Core Web Vitals Guaranteed)',
        '✅ Direct 1-Tap WhatsApp Lead Engine & Call Action Bar',
        '✅ Google Local 3-Pack Schema.org Structured Data',
        '✅ Mobile, Tablet & Desktop Fully Responsive UI',
        '',
        'Please review my brief and connect with me to launch our digital system. Looking forward to our launch! 🚀',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      ];

      var message = encodeURIComponent(lines.join('\n'));
      return 'https://wa.me/' + this.whatsappNumber + '?text=' + message;
    },

    openWhatsAppOrder: function(templateId, customNotes) {
      var url = this.generateWhatsAppUrl(templateId, customNotes);
      window.open(url, '_blank', 'noopener,noreferrer');
    },

    downloadSpecBrief: function(templateId) {
      var template = (window.SITECRAFT_TEMPLATES || []).find(function(t) { return t.id === templateId; }) || (window.SITECRAFT_TEMPLATES && window.SITECRAFT_TEMPLATES[0]);
      var brand = (window.SiteCraftAdvanced && window.SiteCraftAdvanced.customBrand) || 'My Business';
      
      var content = [
        '# GWL WebLab — Project Architecture & Template Brief',
        'Generated on: ' + new Date().toLocaleDateString(),
        '',
        '## 1. Selected Template',
        '- Name: ' + (template ? template.name : 'Business Template'),
        '- Industry: ' + (template ? template.badge : 'Commercial'),
        '- Ownership: 100% Full Ownership (Zero Recurring Platform Tax)',
        '- Fixed Launch Tier: 100% FREE FOR NOW (₹0 Setup)',
        '- Production Turnaround: ' + (template ? template.turnaround : '3-5 Business Days'),
        '',
        '## 2. Business Specifics',
        '- Client Brand Name: ' + brand,
        '- Official Inquiry / WhatsApp: +91 97550 61139',
        '- Guaranteed Speed SLA: 98+ Core Web Vitals Score',
        '',
        '## 3. Key High-Performance Deliverables',
        '- Sub-second mobile performance',
        '- Direct 1-tap WhatsApp triage & booking',
        '- Schema.org structured data for Google Local 3-Pack',
        '- Multi-device responsive layout (Desktop, Tablet, Mobile)',
        '',
        '## 4. Engineering Standards',
        '- Tech Stack: ' + (template && template.techStack ? template.techStack.join(', ') : 'React, Tailwind CSS, Schema.org'),
        '- 100% Client Ownership of Domain, Code & Assets'
      ].join('\n');

      var blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = (template ? template.id : 'sitecraft') + '-business-brief.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
})();
