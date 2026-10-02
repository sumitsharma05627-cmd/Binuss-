// SiteCraft Advanced Interactive Runtime
(function() {
  window.SiteCraftAdvanced = {
    currentDevice: 'desktop',
    currentColor: 'emerald',
    customBrand: '',
    customPhone: '+91 97550 61139',

    setDevice: function(device) {
      this.currentDevice = device;
      var container = document.getElementById('preview-viewport-container');
      if (!container) return;

      container.classList.remove('device-desktop', 'device-tablet', 'device-mobile');
      container.classList.add('device-' + device);

      var buttons = document.querySelectorAll('.device-btn');
      buttons.forEach(function(b) {
        if (b.dataset.device === device) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    },

    setColorTheme: function(colorName, primaryHex, accentHex) {
      this.currentColor = colorName;
      document.documentElement.style.setProperty('--template-primary', primaryHex);
      document.documentElement.style.setProperty('--template-accent', accentHex);

      var pills = document.querySelectorAll('.color-pill');
      pills.forEach(function(p) {
        if (p.dataset.color === colorName) {
          p.classList.add('active-ring');
        } else {
          p.classList.remove('active-ring');
        }
      });
    },

    updateLiveBrandName: function(name) {
      this.customBrand = name.trim();
      var brandDoms = document.querySelectorAll('.live-brand-text');
      var fallback = 'Your Business Name';
      var textToSet = this.customBrand || fallback;
      brandDoms.forEach(function(el) {
        el.textContent = textToSet;
      });
    },

    updateLivePhone: function(phone) {
      this.customPhone = phone.trim() || '+91 97550 61139';
      var phoneDoms = document.querySelectorAll('.live-phone-text');
      phoneDoms.forEach(function(el) {
        el.textContent = window.SiteCraftAdvanced.customPhone;
      });
    }
  };
})();
