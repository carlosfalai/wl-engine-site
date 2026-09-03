/* wl-engine-site — shared app helpers: partner resolution, i18n, API client, GIS init */
(function (global) {
  'use strict';

  // ---------- language ----------
  function getLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'fr' || q === 'en') {
      try { localStorage.setItem('wl_lang', q); } catch (e) {}
      return q;
    }
    try {
      var stored = localStorage.getItem('wl_lang');
      if (stored) return stored;
    } catch (e) {}
    return 'fr';
  }

  var DICT = {
    fr: {
      signin: 'Se connecter avec Google',
      partners: 'Partenaires',
      home: 'Accueil',
      no_prices: '',
      coach_title: 'Coach',
      coach_desc: 'Plan d’entraînement hebdomadaire personnalisé, livré en PDF.',
      panier_title: 'Panier',
      panier_desc: 'Le panier d’épicerie parfait selon votre budget, livré en PDF.',
      generate_plan: 'Générer mon plan',
      generating: 'Analyse en cours, 30 à 90 secondes...',
      open_pdf: 'Ouvrir le PDF',
      my_plans: 'Mes plans',
      service_unavailable: 'Service temporairement indisponible. Veuillez réessayer plus tard.',
      error_generic: 'Une erreur est survenue. Veuillez réessayer.',
      signed_in_as: 'Connecté en tant que',
      sign_out: 'Déconnexion',
      no_plans_yet: 'Aucun plan généré pour l’instant.',
      billing_portal: 'Facture et paiement',
      your_link: 'Votre lien',
      copy: 'Copier',
      copied: 'Copié !',
      plans_this_month: 'Plans ce mois',
      estimated_amount: 'Montant estimé',
      members: 'Membres',
      recent_generations: 'Générations récentes',
      branding: 'Image de marque',
      save: 'Enregistrer',
      saved: 'Enregistré !',
      admin_login: 'Connexion admin',
      admin_code: 'Code admin',
      invalid_code: 'Code invalide.',
      edit_partner: 'Modifier',
      cancel_edit: 'Annuler',
      partner_label: 'Partenaire',
      new_partner: 'Nouveau partenaire',
      create: 'Créer',
      activate_billing: 'Activer la facturation',
      finance: 'Finances',
      loading: 'À charger...',
    },
    en: {
      signin: 'Sign in with Google',
      partners: 'Partners',
      home: 'Home',
      no_prices: '',
      coach_title: 'Coach',
      coach_desc: 'A personalized weekly training plan, delivered as a PDF.',
      panier_title: 'Panier',
      panier_desc: 'The perfect grocery basket for your budget, delivered as a PDF.',
      generate_plan: 'Generate my plan',
      generating: 'Analyzing, 30 to 90 seconds...',
      open_pdf: 'Open the PDF',
      my_plans: 'My plans',
      service_unavailable: 'Service temporarily unavailable. Please try again later.',
      error_generic: 'Something went wrong. Please try again.',
      signed_in_as: 'Signed in as',
      sign_out: 'Sign out',
      no_plans_yet: 'No plans generated yet.',
      billing_portal: 'Billing and payment',
      your_link: 'Your link',
      copy: 'Copy',
      copied: 'Copied!',
      plans_this_month: 'Plans this month',
      estimated_amount: 'Estimated amount',
      members: 'Members',
      recent_generations: 'Recent generations',
      branding: 'Branding',
      save: 'Save',
      saved: 'Saved!',
      admin_login: 'Admin login',
      admin_code: 'Admin code',
      invalid_code: 'Invalid code.',
      edit_partner: 'Edit',
      cancel_edit: 'Cancel',
      partner_label: 'Partner',
      new_partner: 'New partner',
      create: 'Create',
      activate_billing: 'Activate billing',
      finance: 'Finance',
      loading: 'Loading...',
    }
  };

  var lang = getLang();
  function t(key) { return (DICT[lang] && DICT[lang][key]) || (DICT.fr[key]) || key; }

  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
  }

  // ---------- partner resolution ----------
  function getPartner() {
    var q = new URLSearchParams(location.search).get('p');
    if (q) {
      try { localStorage.setItem('wl_partner', q); } catch (e) {}
      return q;
    }
    try {
      return localStorage.getItem('wl_partner') || '';
    } catch (e) { return ''; }
  }

  function withPartnerParam(path) {
    var p = getPartner();
    if (!p) return path;
    var sep = path.indexOf('?') === -1 ? '?' : '&';
    return path + sep + 'p=' + encodeURIComponent(p);
  }

  // ---------- token / session ----------
  function getToken() {
    try { return localStorage.getItem('wl_token') || ''; } catch (e) { return ''; }
  }
  function setToken(token) {
    try { localStorage.setItem('wl_token', token); } catch (e) {}
  }
  function clearToken() {
    try { localStorage.removeItem('wl_token'); } catch (e) {}
  }

  // ---------- API client ----------
  function apiUrl(path) {
    var base = (global.WL && global.WL.API_URL) || '';
    return base.replace(/\/$/, '') + path;
  }

  function api(path, options) {
    options = options || {};
    var headers = options.headers || {};
    var token = getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;

    var fetchOpts = {
      method: options.method || 'GET',
      headers: headers
    };

    if (options.formData) {
      fetchOpts.body = options.formData;
      // do not set Content-Type — browser sets multipart boundary
    } else if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
      fetchOpts.body = JSON.stringify(options.body);
    }

    return fetch(apiUrl(path), fetchOpts).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) {
          var err = new Error((data && data.error) || 'request_failed');
          err.data = data;
          err.status = res.status;
          throw err;
        }
        return data;
      });
    });
  }

  function fetchConfig() {
    var partner = getPartner();
    var params = new URLSearchParams();
    if (partner) params.set('partner', partner);
    params.set('host', location.hostname);
    return api('/config?' + params.toString()).catch(function (err) {
      // fallback brand per spec — apply it directly here, then re-throw so each
      // page's own .catch() still runs and shows the "service unavailable" banner.
      var fallback = { code: partner || '', type: 'both', name: 'Coach + Panier', tagline: '', colors: {} };
      if (global.applyBrand) global.applyBrand(fallback);
      throw err;
    });
  }

  // ---------- Google Identity Services ----------
  function loadGsiScript(cb) {
    if (global.google && global.google.accounts && global.google.accounts.id) {
      cb();
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.defer = true;
    s.onload = cb;
    s.onerror = function () { cb(new Error('gsi_load_failed')); };
    document.head.appendChild(s);
  }

  function initGoogleSignIn(buttonEl, onCredential) {
    loadGsiScript(function (err) {
      if (err || !global.google) {
        if (buttonEl) {
          buttonEl.innerHTML = '<div class="wl-alert wl-alert-warn">' + t('service_unavailable') + '</div>';
        }
        return;
      }
      try {
        global.google.accounts.id.initialize({
          client_id: (global.WL && global.WL.GOOGLE_CLIENT_ID) || '',
          callback: function (response) { onCredential(response.credential); }
        });
        if (buttonEl) {
          global.google.accounts.id.renderButton(buttonEl, {
            theme: 'outline', size: 'large', text: 'signin_with',
            locale: lang === 'fr' ? 'fr' : 'en'
          });
        }
      } catch (e) {
        if (buttonEl) {
          buttonEl.innerHTML = '<div class="wl-alert wl-alert-warn">' + t('service_unavailable') + '</div>';
        }
      }
    });
  }

  // ---------- misc helpers ----------
  function maskEmail(email) {
    if (!email || email.indexOf('@') === -1) return email || '';
    var parts = email.split('@');
    return parts[0].charAt(0) + '***@' + parts[1];
  }

  function centsToDollars(cents) {
    return ((cents || 0) / 100).toLocaleString(lang === 'fr' ? 'fr-CA' : 'en-CA', {
      style: 'currency', currency: 'CAD'
    });
  }

  function showError(container, message) {
    if (!container) return;
    container.innerHTML = '<div class="wl-alert wl-alert-error">' + message + '</div>';
  }

  global.WLApp = {
    lang: lang,
    t: t,
    applyI18n: applyI18n,
    getPartner: getPartner,
    withPartnerParam: withPartnerParam,
    getToken: getToken,
    setToken: setToken,
    clearToken: clearToken,
    api: api,
    apiUrl: apiUrl,
    fetchConfig: fetchConfig,
    initGoogleSignIn: initGoogleSignIn,
    maskEmail: maskEmail,
    centsToDollars: centsToDollars,
    showError: showError
  };
})(window);
