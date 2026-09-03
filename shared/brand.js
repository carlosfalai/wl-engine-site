/* wl-engine-site — brand application helper
   applyBrand(config) sets CSS variables, logo, title and [data-brand-*] nodes
   from a /config API response: { code, type, name, tagline, logo_url, colors:{primary,accent,dark} } */
(function (global) {
  function applyBrand(config) {
    config = config || {};
    var colors = config.colors || {};
    var root = document.documentElement;
    if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
    if (colors.accent) root.style.setProperty('--color-accent', colors.accent);
    if (colors.dark) root.style.setProperty('--color-dark', colors.dark);

    var name = config.name || 'Coach + Panier';
    var tagline = config.tagline || '';

    document.querySelectorAll('[data-brand-name]').forEach(function (el) {
      el.textContent = name;
    });
    document.querySelectorAll('[data-brand-tagline]').forEach(function (el) {
      el.textContent = tagline;
    });
    document.querySelectorAll('[data-brand-logo]').forEach(function (el) {
      if (config.logo_url) {
        el.src = config.logo_url;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    if (name) {
      var titleSuffix = document.title.split(' — ')[1] || document.title.split(' - ')[1];
      document.title = titleSuffix ? name + ' — ' + titleSuffix : name;
    }

    return config;
  }

  global.applyBrand = applyBrand;
})(window);
