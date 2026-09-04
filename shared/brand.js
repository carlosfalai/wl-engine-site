/* wl-engine-site — brand application helper
   applyBrand(config) sets CSS variables, logo, title and [data-brand-*] nodes
   from a /config API response: { code, type, name, tagline, tagline_i18n:{fr,en,es},
   logo_url, colors:{primary,accent,dark} } */
(function (global) {
  // Kept so the language toggle (a full page reload today, per app.js
  // initLangToggle) can still re-apply client-side if that ever changes to
  // an in-place switch instead of a navigation.
  var lastConfig = null;

  function resolveTagline(config) {
    var currentLang = (global.WLApp && global.WLApp.lang) || 'fr';
    var i18n = config.tagline_i18n || {};
    return i18n[currentLang] || i18n.fr || config.tagline || '';
  }

  function applyBrand(config) {
    config = config || {};
    lastConfig = config;
    var colors = config.colors || {};
    var root = document.documentElement;
    if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
    if (colors.accent) root.style.setProperty('--color-accent', colors.accent);
    if (colors.dark) root.style.setProperty('--color-dark', colors.dark);

    var name = config.name || 'Coach + Panier';
    var tagline = resolveTagline(config);

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

  // The language toggle in app.js (initLangToggle) navigates to a new URL
  // with ?lang=<next>, which reloads the page and re-fetches /config with
  // that lang — applyBrand then runs fresh and resolveTagline picks it up
  // via WLApp.lang. reapplyBrand is exposed for the same-page case (e.g. a
  // future in-place toggle, or a page that already has a config cached).
  global.applyBrand = applyBrand;
  global.reapplyBrand = function () {
    if (lastConfig) applyBrand(lastConfig);
  };
})(window);
