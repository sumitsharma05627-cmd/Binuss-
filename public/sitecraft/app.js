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

    // Build realistic interactive mockup site inside #preview-viewport-container
    var viewport = document.getElementById('preview-viewport-container');
    viewport.innerHTML = [
      '<div style="font-family:\'Plus Jakarta Sans\', sans-serif; color:#0f172a; line-height:1.5;">',
      '  <!-- Navbar -->',
      '  <header style="display:flex; justify-content:space-between; align-items:center; padding:1.2rem 2rem; background:#ffffff; border-bottom:1px solid #e2e8f0; position:sticky; top:0; z-index:10;">',
      '    <div style="font-weight:800; font-size:1.2rem; color:' + template.primaryColor + ';" class="live-brand-text">' + template.name + '</div>',
      '    <div style="display:flex; gap:1.2rem; font-size:0.85rem; font-weight:600; color:#475569;">',
      '      <span>Home</span><span>Services</span><span>Testimonials</span><span>Contact</span>',
      '    </div>',
      '    <button style="padding:0.45rem 1rem; border-radius:9999px; background:' + template.primaryColor + '; color:#fff; font-size:0.8rem; font-weight:700; border:none; cursor:pointer;" onclick="SiteCraftExport.openWhatsAppOrder(\'' + template.id + '\')">Get Started</button>',
      '  </header>',
      '  <!-- Hero -->',
      '  <section style="padding:3.5rem 2rem; background:linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); text-align:center;">',
      '    <div style="display:inline-block; padding:0.3rem 0.8rem; border-radius:9999px; background:rgba(5,150,105,0.1); color:' + template.primaryColor + '; font-size:0.75rem; font-weight:700; margin-bottom:1rem;">Verified High-Conversion Design</div>',
      '    <h1 style="font-size:2.2rem; font-weight:800; max-width:800px; margin:0 auto 1rem; color:#0f172a;" class="live-brand-text">' + template.name + '</h1>',
      '    <p style="font-size:1rem; color:#475569; max-width:620px; margin:0 auto 1.5rem;">' + template.tagline + '</p>',
      '    <div style="display:flex; justify-content:center; gap:0.8rem; margin-bottom:2rem;">',
      '      <button style="padding:0.75rem 1.4rem; border-radius:0.75rem; background:' + template.primaryColor + '; color:#ffffff; font-weight:700; border:none; cursor:pointer;" onclick="SiteCraftExport.openWhatsAppOrder(\'' + template.id + '\')">Book Consultation Now</button>',
      '      <button style="padding:0.75rem 1.4rem; border-radius:0.75rem; background:#f1f5f9; color:#0f172a; font-weight:600; border:1px solid #cbd5e1; cursor:pointer;" onclick="SiteCraftExport.downloadSpecBrief(\'' + template.id + '\')">Download Specs</button>',
      '    </div>',
      '    <div style="max-width:900px; margin:0 auto; border-radius:1rem; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.12);">',
      '      <img src="' + template.heroImage + '" style="width:100%; height:380px; object-fit:cover;" alt="Hero visual" />',
      '    </div>',
      '  </section>',
      '  <!-- Key Features -->',
      '  <section style="padding:3rem 2rem; max-width:1000px; margin:0 auto;">',
      '    <h2 style="text-align:center; font-size:1.6rem; font-weight:800; margin-bottom:2rem;">Engineered For Tangible Business Growth</h2>',
      '    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.5rem;">',
      template.features.map(function(f) {
        return [
          '<div style="padding:1.5rem; border-radius:1rem; border:1px solid #e2e8f0; background:#f8fafc;">',
          '  <h3 style="font-size:1.05rem; font-weight:700; margin-bottom:0.5rem; color:#0f172a;">' + f.title + '</h3>',
          '  <p style="font-size:0.85rem; color:#64748b;">' + f.desc + '</p>',
          '</div>'
        ].join('');
      }).join(''),
      '    </div>',
      '  </section>',
      '  <!-- Direct Contact Bar -->',
      '  <section style="padding:2.5rem 2rem; background:#0f172a; color:#ffffff; text-align:center;">',
      '    <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:0.5rem;">Ready to launch your business online?</h3>',
      '    <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:1.2rem;">Direct delivery by GWL WebLab within ' + template.turnaround + ' • 100% Code Ownership</p>',
      '    <button style="padding:0.75rem 1.6rem; border-radius:9999px; background:#25D366; color:#ffffff; font-weight:700; border:none; cursor:pointer;" onclick="SiteCraftExport.openWhatsAppOrder(\'' + template.id + '\')">Order This Template on WhatsApp (' + template.price + ')</button>',
      '  </section>',
      '</div>'
    ].join('');

    overlay.classList.add('active');
  }

  function closePreview() {
    var overlay = document.getElementById('preview-modal');
    if (overlay) overlay.classList.remove('active');
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

    var brandInput = document.getElementById('live-custom-brand-input');
    if (brandInput) {
      brandInput.addEventListener('input', function(e) {
        if (window.SiteCraftAdvanced) window.SiteCraftAdvanced.updateLiveBrandName(e.target.value);
      });
    }
  }

  window.SiteCraftApp = {
    init: init,
    openPreview: openPreview,
    closePreview: closePreview
  };

  document.addEventListener('DOMContentLoaded', init);
})();
