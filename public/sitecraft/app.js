// SiteCraft Main Application Engine
(function() {
  var activeCategory = 'all';
  var currentTemplateId = null;

  function init() {
    renderFilterTabs();
    renderTemplates();
    setupEventListeners();
  }

  function renderFilterTabs() {
    var container = document.getElementById('filter-tabs-container');
    if (!container) return;

    var categories = [
      { id: 'all', label: 'All Templates' },
      { id: 'healthcare', label: 'Doctors & Clinics' },
      { id: 'education', label: 'EdTech & Coaching' },
      { id: 'realestate', label: 'Real Estate' },
      { id: 'restaurant', label: 'Bistro & Cafes' },
      { id: 'corporate', label: 'Corporate & Law' },
      { id: 'saas', label: 'Tech & SaaS' },
      { id: 'ecommerce', label: 'D2C & Retail' },
      { id: 'creator', label: 'Creator Storefronts' }
    ];

    container.innerHTML = categories.map(function(c) {
      return '<button class="filter-tab ' + (c.id === activeCategory ? 'active' : '') + '" data-category="' + c.id + '">' + c.label + '</button>';
    }).join('');

    container.querySelectorAll('.filter-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        container.querySelectorAll('.filter-tab').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        renderTemplates();
      });
    });
  }

  function renderTemplates() {
    var grid = document.getElementById('templates-grid');
    if (!grid) return;

    var templates = window.SITECRAFT_TEMPLATES || [];
    var filtered = activeCategory === 'all' 
      ? templates 
      : templates.filter(function(t) { return t.category === activeCategory; });

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">No templates found for this industry.</div>';
      return;
    }

    grid.innerHTML = filtered.map(function(t) {
      return [
        '<div class="template-card" data-id="' + t.id + '">',
        '  <div class="template-media">',
        '    <img src="' + t.heroImage + '" alt="' + t.name + '" loading="lazy" />',
        '    <span class="template-badge-pill">' + t.badge + '</span>',
        '    <span class="template-speed-badge">⚡ ' + t.sampleMetrics.lighthouse + ' Score</span>',
        '  </div>',
        '  <div class="template-content">',
        '    <h4 class="template-name">' + t.name + '</h4>',
        '    <p class="template-tagline">' + t.tagline + '</p>',
        '    <ul class="template-highlights">',
        t.highlights.slice(0, 3).map(function(h) { return '<li>' + h + '</li>'; }).join(''),
        '    </ul>',
        '    <div class="template-footer">',
        '      <div class="template-price-wrap">',
        '        <span class="template-price" style="color:#10b981; font-weight:800;">FREE</span>',
        '        <span class="template-time"><del style="color:#64748b; font-size:0.75rem;">' + t.originalPrice + '</del> • ' + t.turnaround + '</span>',
        '      </div>',
        '      <div class="template-actions">',
        '        <button class="btn-preview" onclick="SiteCraftApp.openPreview(\'' + t.id + '\')">Live Demo</button>',
        '        <button class="btn-whatsapp" onclick="SiteCraftExport.openWhatsAppOrder(\'' + t.id + '\')">Claim Free</button>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');
  }

  function openPreview(templateId) {
    currentTemplateId = templateId;
    var template = (window.SITECRAFT_TEMPLATES || []).find(function(t) { return t.id === templateId; });
    if (!template) return;

    var overlay = document.getElementById('preview-modal');
    if (!overlay) return;

    document.getElementById('modal-template-title').textContent = template.name;
    document.getElementById('modal-template-badge').textContent = template.badge + ' • ' + template.turnaround;

    // Reset or initialize configuration controls
    var initialColor = template.primaryColor || '#059669';
    var initialFont = template.fontFamily || 'Plus Jakarta Sans';
    
    if (window.SiteCraftAdvanced) {
      window.SiteCraftAdvanced.currentTemplateId = templateId;
      window.SiteCraftAdvanced.defaultColor = initialColor;
      window.SiteCraftAdvanced.defaultFont = initialFont;
      window.SiteCraftAdvanced.currentColor = initialColor;
      window.SiteCraftAdvanced.currentFont = initialFont;
      window.SiteCraftAdvanced.customBrand = '';
      
      var colorPicker = document.getElementById('config-color-picker');
      if (colorPicker) colorPicker.value = initialColor;
      var colorVal = document.getElementById('config-color-val');
      if (colorVal) colorVal.textContent = initialColor;
      var fontSelect = document.getElementById('config-font-family');
      if (fontSelect) fontSelect.value = initialFont;

      var pills = document.querySelectorAll('.color-pill');
      pills.forEach(function(p) {
        if (p.dataset.color && p.dataset.color.toLowerCase() === initialColor.toLowerCase()) {
          p.classList.add('active-ring');
        } else {
          p.classList.remove('active-ring');
        }
      });
    }

    var brandName = (window.SiteCraftAdvanced && window.SiteCraftAdvanced.customBrand) || template.name;
    var brandInput = document.getElementById('live-custom-brand-input');
    if (brandInput) brandInput.value = brandName === template.name ? '' : brandName;

    // Render interactive mockup inside #preview-iframe
    var iframe = document.getElementById('preview-iframe');
    if (iframe) {
      var iframeHtml = [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '  <meta charset="utf-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '  <link rel="preconnect" href="https://fonts.googleapis.com">',
        '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">',
        '  <style id="dynamic-sitecraft-styles">',
        '    :root { --primary: ' + initialColor + '; --template-primary: ' + initialColor + '; }',
        '    * { margin:0; padding:0; box-sizing:border-box; font-family: \'' + initialFont + '\', sans-serif; }',
        '    body { background:#ffffff; color:#0f172a; line-height:1.6; -webkit-font-smoothing:antialiased; }',
        '    .btn-primary { background-color: var(--primary); color:#fff; border:none; padding:0.65rem 1.4rem; border-radius:0.6rem; font-weight:700; cursor:pointer; transition:transform 0.2s, box-shadow 0.2s; box-shadow:0 4px 12px rgba(0,0,0,0.1); }',
        '    .btn-primary:hover { transform:translateY(-1px); }',
        '    .dynamic-brand-color { color: var(--primary); }',
        '    .card { background:#ffffff; border:1px solid #e2e8f0; border-radius:1rem; padding:1.75rem; transition:transform 0.2s, box-shadow 0.2s; box-shadow:0 4px 12px rgba(0,0,0,0.03); }',
        '    .card:hover { transform:translateY(-3px); box-shadow:0 12px 24px rgba(0,0,0,0.08); }',
        '  </style>',
        '</head>',
        '<body>',
        '  <!-- Navigation -->',
        '  <header style="display:flex; justify-content:space-between; align-items:center; padding:1rem 2rem; background:rgba(255,255,255,0.95); backdrop-filter:blur(10px); border-bottom:1px solid #e2e8f0; position:sticky; top:0; z-index:100;">',
        '    <div style="font-weight:800; font-size:1.25rem; color:' + initialColor + '; display:flex; align-items:center; gap:0.4rem;" class="live-brand-text dynamic-brand-color"><span>●</span> ' + brandName + '</div>',
        '    <div style="display:flex; gap:1.5rem; font-size:0.88rem; font-weight:600; color:#475569;">',
        '      <span style="color:' + initialColor + '; border-bottom:2px solid ' + initialColor + '; padding-bottom:2px;">Home</span><span>About</span><span>Services</span><span>Pricing</span><span>Contact</span>',
        '    </div>',
        '    <button class="btn-primary" onclick="window.parent.SiteCraftExport.openWhatsAppOrder(\'' + template.id + '\')">' + (template.defaultCta || 'Get Started') + '</button>',
        '  </header>',
        '  <!-- Hero -->',
        '  <section style="padding:4rem 2rem 3rem; background:radial-gradient(circle at 50% 10%, rgba(5,150,105,0.06) 0%, #ffffff 80%); text-align:center;">',
        '    <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.4rem 1rem; border-radius:9999px; background:rgba(5,150,105,0.1); color:' + initialColor + '; font-size:0.8rem; font-weight:700; margin-bottom:1.25rem;" class="dynamic-brand-color"><span>●</span> ⚡ 99+ Core Web Vitals Guaranteed</div>',
        '    <h1 style="font-size:2.5rem; font-weight:800; max-width:820px; margin:0 auto 1rem; color:#0f172a; letter-spacing:-0.03em; line-height:1.2;" class="live-brand-text">' + brandName + '</h1>',
        '    <p style="font-size:1.1rem; color:#64748b; max-width:650px; margin:0 auto 2rem; line-height:1.6;">' + template.tagline + '</p>',
        '    <div style="display:flex; justify-content:center; gap:1rem; margin-bottom:2.5rem;">',
        '      <button class="btn-primary" style="padding:0.8rem 1.8rem; font-size:0.95rem;" onclick="window.parent.SiteCraftExport.openWhatsAppOrder(\'' + template.id + '\')">' + (template.defaultCta || 'Book Appointment') + ' →</button>',
        '      <button style="padding:0.8rem 1.6rem; border-radius:0.6rem; background:#ffffff; color:#0f172a; font-weight:600; border:1px solid #cbd5e1; cursor:pointer;" onclick="window.parent.SiteCraftExport.downloadSpecBrief(\'' + template.id + '\')">Explore Packages</button>',
        '    </div>',
        '    <div style="max-width:900px; margin:0 auto; border-radius:1.2rem; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.12); border:1px solid #e2e8f0; position:relative;">',
        '      <div style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:0.6rem 1rem; display:flex; gap:0.4rem; font-size:0.75rem; color:#64748b; align-items:center;">',
        '        <span style="width:8px; height:8px; border-radius:50%; background:#f87171;"></span><span style="width:8px; height:8px; border-radius:50%; background:#fbbf24;"></span><span style="width:8px; height:8px; border-radius:50%; background:#34d399;"></span>',
        '        <span style="margin:0 auto; font-family:monospace; background:#fff; padding:0.15rem 0.8rem; border-radius:4px; border:1px solid #e2e8f0;">https://' + brandName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com</span>',
        '      </div>',
        '      <img src="' + template.heroImage + '" style="width:100%; height:380px; object-fit:cover; display:block;" alt="Hero visual" />',
        '    </div>',
        '  </section>',
        '  <!-- Stats Ribbon -->',
        '  <section style="background:#0f172a; color:#fff; padding:2rem 2rem; display:flex; justify-content:space-around; text-align:center; flex-wrap:wrap; gap:1rem;">',
        '    <div><span style="font-size:1.8rem; font-weight:800; color:' + initialColor + ';" class="dynamic-brand-color">99.8%</span><p style="font-size:0.8rem; color:#94a3b8;">PageSpeed Score</p></div>',
        '    <div><span style="font-size:1.8rem; font-weight:800; color:' + initialColor + ';" class="dynamic-brand-color">' + template.turnaround + '</span><p style="font-size:0.8rem; color:#94a3b8;">Launch Turnaround</p></div>',
        '    <div><span style="font-size:1.8rem; font-weight:800; color:' + initialColor + ';" class="dynamic-brand-color">100%</span><p style="font-size:0.8rem; color:#94a3b8;">Code Ownership</p></div>',
        '    <div><span style="font-size:1.8rem; font-weight:800; color:' + initialColor + ';" class="dynamic-brand-color">₹0</span><p style="font-size:0.8rem; color:#94a3b8;">Monthly Setup Tax</p></div>',
        '  </section>',
        '  <!-- Key Features -->',
        '  <section style="padding:4rem 2rem; max-width:1050px; margin:0 auto;">',
        '    <h2 style="text-align:center; font-size:1.8rem; font-weight:800; margin-bottom:0.5rem; color:#0f172a;">Engineered Turnkey Deliverables</h2>',
        '    <p style="text-align:center; color:#64748b; font-size:1rem; margin-bottom:2.5rem;">5-Page Full Architecture ready to host anywhere.</p>',
        '    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem;">',
        template.features.map(function(f, i) {
          return [
            '<div class="card">',
            '  <span style="font-size:0.75rem; font-weight:800; color:' + initialColor + '; text-transform:uppercase; letter-spacing:0.05em;" class="dynamic-brand-color">Capability 0' + (i+1) + '</span>',
            '  <h3 style="font-size:1.15rem; font-weight:700; margin:0.4rem 0 0.5rem; color:#0f172a;">' + f.title + '</h3>',
            '  <p style="font-size:0.88rem; color:#64748b; line-height:1.5;">' + f.desc + '</p>',
            '</div>'
          ].join('');
        }).join(''),
        '    </div>',
        '  </section>',
        '  <!-- Direct Contact Bar -->',
        '  <section style="padding:3rem 2rem; background:#0b0f19; color:#ffffff; text-align:center; border-top:1px solid rgba(255,255,255,0.08);">',
        '    <h3 style="font-size:1.4rem; font-weight:800; margin-bottom:0.5rem;">Ready to deploy this website on your host?</h3>',
        '    <p style="font-size:0.9rem; color:#94a3b8; margin-bottom:1.5rem;">Turnkey setup delivered by GWL WebLab within ' + template.turnaround + ' • 100% Free For Now</p>',
        '    <button class="btn-primary" style="background:#25D366; padding:0.85rem 2rem; border-radius:9999px; font-size:0.95rem;" onclick="window.parent.SiteCraftExport.openWhatsAppOrder(\'' + template.id + '\')">Claim Free on WhatsApp →</button>',
        '  </section>',
        '</body>',
        '</html>'
      ].join('\n');

      iframe.srcdoc = iframeHtml;
      iframe.onload = function() {
        if (window.SiteCraftAdvanced) window.SiteCraftAdvanced.updateIframeStyles();
      };
    }

    overlay.classList.add('active');
  }

  function closePreview() {
    var overlay = document.getElementById('preview-modal');
    if (overlay) overlay.classList.remove('active');
  }

  function orderCurrentTemplate() {
    if (currentTemplateId) {
      SiteCraftExport.openWhatsAppOrder(currentTemplateId);
    }
  }

  function setupEventListeners() {
    var closeBtn = document.getElementById('close-preview-modal');
    if (closeBtn) closeBtn.addEventListener('click', closePreview);

    var overlay = document.getElementById('preview-modal');
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closePreview();
      });
    }

    // Keyboard Esc close support
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closePreview();
    });
  }

  window.SiteCraftApp = {
    init: init,
    openPreview: openPreview,
    closePreview: closePreview,
    orderCurrentTemplate: orderCurrentTemplate,
    getCurrentTemplateId: function() { return currentTemplateId; }
  };

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  }
})();
