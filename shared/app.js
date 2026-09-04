/* wl-engine-site — shared app helpers: partner resolution, i18n, API client, GIS init */
(function (global) {
  'use strict';

  // ---------- language ----------
  var LANGS = ['fr', 'en', 'es'];

  function getLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) !== -1) {
      try { localStorage.setItem('wl_lang', q); } catch (e) {}
      return q;
    }
    try {
      var stored = localStorage.getItem('wl_lang');
      if (LANGS.indexOf(stored) !== -1) return stored;
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
      tier_free: 'Gratuit',
      tier_member: 'Membre',
      per_month_plan: '1 plan par mois',
      per_day_plans: '3 plans par jour',
      photo_scan_included: 'Analyse photo incluse',
      no_photo_scan: 'Sans analyse photo',
      history_included: 'Historique complet',
      sponsor_line: 'Offert grâce à un commanditaire',
      start_free: 'Commencer gratuitement',
      become_member: 'Devenir membre',
      sponsors_strip_title: 'Offert grâce à nos commanditaires',
      become_sponsor: 'Devenir commanditaire',
      your_tier: 'Votre forfait',
      plans_remaining_today: 'plans restants aujourd’hui',
      plans_remaining_month: 'plans restants ce mois',
      manage_subscription: 'Gérer mon abonnement',
      upgrade_card_title: 'Passez au forfait Membre',
      upgrade_card_body: 'Plus de plans, analyse photo et historique complet.',
      quota_exceeded_msg: 'Limite atteinte pour votre forfait. Revenez plus tard ou devenez membre.',
      upgrade_required_msg: 'L’analyse photo est réservée aux membres. Devenez membre pour l’utiliser.',
      rate_limited_msg: 'Trop de demandes. Veuillez patienter un instant.',
      checkout_thanks: 'Merci ! Votre abonnement est actif.',
      checkout_activating: 'Paiement reçu, activation en cours...',
      country_label: 'Pays',
      postal_label: 'Code postal',
      sponsor_pitch_title: 'Devenez commanditaire',
      sponsor_pitch_body: '500 $ par mois pour soutenir cette communauté gratuitement pour tous. Votre nom, votre logo et un court message apparaissent auprès de chaque utilisateur du forfait gratuit, et vous recevez un bilan d’impact mensuel.',
      sponsor_pitch_gets_title: 'Ce que vous recevez',
      contact_us: 'Nous joindre',
      current_sponsors: 'Commanditaires actuels',
      sponsors_panel: 'Commanditaires',
      add_sponsor: 'Ajouter un commanditaire',
      sponsor_name: 'Nom',
      sponsor_logo: 'URL du logo',
      sponsor_message: 'Message (120 car. max)',
      sponsor_product: 'Produit',
      sponsor_active: 'Actif',
      sponsor_email: 'Courriel de facturation',
      no_sponsors_yet: 'Aucun commanditaire pour l’instant.',
      sponsor_price_500: '500 $ par mois',
      country_other_hint: 'Pays non listé — nous traiterons votre demande manuellement.',
      sponsor_message_too_long: 'Le message ne doit pas dépasser 120 caractères.',
      profile_saved: 'Profil enregistré',
      diet_restrictions_label: 'Restrictions alimentaires (séparées par des virgules)',
      generate_with_profile: 'Générer avec mon profil',
      height_label: 'Taille (cm)',
      weight_label: 'Poids (kg)',
      age_label: 'Âge',
      gender_label: 'Sexe',
      gender_male: 'Homme',
      gender_female: 'Femme',
      gender_other: 'Autre',
      goal_label: 'Objectif',
      goal_fat_loss: 'Perte de gras',
      goal_muscle_gain: 'Gain musculaire',
      goal_maintenance: 'Maintien',
      days_per_week_label: 'Jours par semaine',
      target_weight_label: 'Poids cible (kg)',
      weekly_food_budget_label: 'Budget épicerie / semaine',
      nearest_gym_label: 'Gym le plus proche',
      injuries_label: 'Blessures (facultatif)',
      injuries_placeholder: 'ex. genou gauche, léger, depuis 2024',
      diet_restrictions_placeholder: 'ex. sans gluten, sans arachides',
      photo_label: 'Photo (facultatif)',
      panier_budget_label: 'Budget / semaine',
      people_label: 'Nombre de personnes',
      goals_label: 'Objectifs santé (facultatif)',
      goals_placeholder: 'ex. moins de sucre, plus de protéines',
      preferences_label: 'Préférences / restrictions (facultatif)',
      preferences_placeholder: 'ex. végétarien, sans gluten, allergies',
      tagline_label: 'Slogan',
      primary_color_label: 'Couleur primaire',
      accent_color_label: 'Couleur accent',
      dark_color_label: 'Couleur foncée',
      partner_type_label: 'Type',
      product_type_both: 'Coach + Panier',
      product_type_coach_only: 'Coach seulement',
      product_type_panier_only: 'Panier seulement',
      demo_label: 'Démo',
      billing_label: 'Facturation',
      code_label: 'Code',
      month_label: 'Mois',
      paid_label: 'Payé',
      active_subscriptions_label: 'Abonnements actifs : ',
      link_colon_label: 'Lien : ',
      embed_snippet_label: "Snippet d'intégration :",
      date_label: 'Date',
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
      tier_free: 'Free',
      tier_member: 'Member',
      per_month_plan: '1 plan per month',
      per_day_plans: '3 plans per day',
      photo_scan_included: 'Photo scan included',
      no_photo_scan: 'No photo scan',
      history_included: 'Full history',
      sponsor_line: 'Made possible by a sponsor',
      start_free: 'Start for free',
      become_member: 'Become a member',
      sponsors_strip_title: 'Made possible by our sponsors',
      become_sponsor: 'Become a sponsor',
      your_tier: 'Your plan',
      plans_remaining_today: 'plans left today',
      plans_remaining_month: 'plans left this month',
      manage_subscription: 'Manage my subscription',
      upgrade_card_title: 'Upgrade to the Member plan',
      upgrade_card_body: 'More plans, photo scan, and full history.',
      quota_exceeded_msg: 'Limit reached for your plan. Come back later or become a member.',
      upgrade_required_msg: 'Photo scan is a member feature. Become a member to use it.',
      rate_limited_msg: 'Too many requests. Please wait a moment.',
      checkout_thanks: 'Thank you! Your subscription is active.',
      checkout_activating: 'Payment received, activating...',
      country_label: 'Country',
      postal_label: 'Postal / ZIP code',
      sponsor_pitch_title: 'Become a sponsor',
      sponsor_pitch_body: '$500 per month to keep this community free for everyone. Your name, logo and a short message appear to every free-tier user, and you get a monthly impact email.',
      sponsor_pitch_gets_title: 'What you get',
      contact_us: 'Contact us',
      current_sponsors: 'Current sponsors',
      sponsors_panel: 'Sponsors',
      add_sponsor: 'Add a sponsor',
      sponsor_name: 'Name',
      sponsor_logo: 'Logo URL',
      sponsor_message: 'Message (120 chars max)',
      sponsor_product: 'Product',
      sponsor_active: 'Active',
      sponsor_email: 'Billing email',
      no_sponsors_yet: 'No sponsors yet.',
      sponsor_price_500: '$500 per month',
      country_other_hint: 'Country not listed — we will handle your request manually.',
      sponsor_message_too_long: 'Message must be at most 120 characters.',
      profile_saved: 'Profile saved',
      diet_restrictions_label: 'Dietary restrictions (comma-separated)',
      generate_with_profile: 'Generate with my profile',
      height_label: 'Height (cm)',
      weight_label: 'Weight (kg)',
      age_label: 'Age',
      gender_label: 'Gender',
      gender_male: 'Male',
      gender_female: 'Female',
      gender_other: 'Other',
      goal_label: 'Goal',
      goal_fat_loss: 'Fat loss',
      goal_muscle_gain: 'Muscle gain',
      goal_maintenance: 'Maintenance',
      days_per_week_label: 'Days per week',
      target_weight_label: 'Target weight (kg)',
      weekly_food_budget_label: 'Grocery budget / week',
      nearest_gym_label: 'Nearest gym',
      injuries_label: 'Injuries (optional)',
      injuries_placeholder: 'e.g. left knee, mild, since 2024',
      diet_restrictions_placeholder: 'e.g. gluten-free, no peanuts',
      photo_label: 'Photo (optional)',
      panier_budget_label: 'Budget / week',
      people_label: 'Number of people',
      goals_label: 'Health goals (optional)',
      goals_placeholder: 'e.g. less sugar, more protein',
      preferences_label: 'Preferences / restrictions (optional)',
      preferences_placeholder: 'e.g. vegetarian, gluten-free, allergies',
      tagline_label: 'Tagline',
      primary_color_label: 'Primary color',
      accent_color_label: 'Accent color',
      dark_color_label: 'Dark color',
      partner_type_label: 'Type',
      product_type_both: 'Coach + Panier',
      product_type_coach_only: 'Coach only',
      product_type_panier_only: 'Panier only',
      demo_label: 'Demo',
      billing_label: 'Billing',
      code_label: 'Code',
      month_label: 'Month',
      paid_label: 'Paid',
      active_subscriptions_label: 'Active subscriptions: ',
      link_colon_label: 'Link: ',
      embed_snippet_label: 'Embed snippet:',
      date_label: 'Date',
    },
    es: {
      signin: 'Iniciar sesión con Google',
      partners: 'Socios',
      home: 'Inicio',
      no_prices: '',
      coach_title: 'Coach',
      coach_desc: 'Plan de entrenamiento semanal personalizado, entregado en PDF.',
      panier_title: 'Canasta',
      panier_desc: 'La canasta de compras perfecta según tu presupuesto, entregada en PDF.',
      generate_plan: 'Generar mi plan',
      generating: 'Analizando, de 30 a 90 segundos...',
      open_pdf: 'Abrir el PDF',
      my_plans: 'Mis planes',
      service_unavailable: 'Servicio temporalmente no disponible. Inténtalo de nuevo más tarde.',
      error_generic: 'Ocurrió un error. Inténtalo de nuevo.',
      signed_in_as: 'Sesión iniciada como',
      sign_out: 'Cerrar sesión',
      no_plans_yet: 'Aún no se ha generado ningún plan.',
      billing_portal: 'Facturación y pago',
      your_link: 'Tu enlace',
      copy: 'Copiar',
      copied: '¡Copiado!',
      plans_this_month: 'Planes este mes',
      estimated_amount: 'Monto estimado',
      members: 'Miembros',
      recent_generations: 'Generaciones recientes',
      branding: 'Imagen de marca',
      save: 'Guardar',
      saved: '¡Guardado!',
      admin_login: 'Acceso de administrador',
      admin_code: 'Código de administrador',
      invalid_code: 'Código inválido.',
      edit_partner: 'Editar',
      cancel_edit: 'Cancelar',
      partner_label: 'Socio',
      new_partner: 'Nuevo socio',
      create: 'Crear',
      activate_billing: 'Activar facturación',
      finance: 'Finanzas',
      loading: 'Cargando...',
      tier_free: 'Gratis',
      tier_member: 'Miembro',
      per_month_plan: '1 plan por mes',
      per_day_plans: '3 planes por día',
      photo_scan_included: 'Análisis de foto incluido',
      no_photo_scan: 'Sin análisis de foto',
      history_included: 'Historial completo',
      sponsor_line: 'Ofrecido gracias a un patrocinador',
      start_free: 'Comenzar gratis',
      become_member: 'Hazte miembro',
      sponsors_strip_title: 'Ofrecido gracias a nuestros patrocinadores',
      become_sponsor: 'Conviértete en patrocinador',
      your_tier: 'Tu plan',
      plans_remaining_today: 'planes restantes hoy',
      plans_remaining_month: 'planes restantes este mes',
      manage_subscription: 'Administrar mi suscripción',
      upgrade_card_title: 'Pasa al plan Miembro',
      upgrade_card_body: 'Más planes, análisis de foto e historial completo.',
      quota_exceeded_msg: 'Límite alcanzado para tu plan. Vuelve más tarde o hazte miembro.',
      upgrade_required_msg: 'El análisis de foto es exclusivo para miembros. Hazte miembro para usarlo.',
      rate_limited_msg: 'Demasiadas solicitudes. Espera un momento, por favor.',
      checkout_thanks: '¡Gracias! Tu suscripción está activa.',
      checkout_activating: 'Pago recibido, activando...',
      country_label: 'País',
      postal_label: 'Código postal',
      sponsor_pitch_title: 'Conviértete en patrocinador',
      sponsor_pitch_body: '500 $ al mes para mantener esta comunidad gratuita para todos. Tu nombre, tu logo y un mensaje corto aparecen ante cada usuario del plan gratuito, y recibes un informe de impacto mensual.',
      sponsor_pitch_gets_title: 'Lo que recibes',
      contact_us: 'Contáctanos',
      current_sponsors: 'Patrocinadores actuales',
      sponsors_panel: 'Patrocinadores',
      add_sponsor: 'Agregar un patrocinador',
      sponsor_name: 'Nombre',
      sponsor_logo: 'URL del logo',
      sponsor_message: 'Mensaje (máx. 120 caracteres)',
      sponsor_product: 'Producto',
      sponsor_active: 'Activo',
      sponsor_email: 'Correo de facturación',
      no_sponsors_yet: 'Aún no hay patrocinadores.',
      sponsor_price_500: '500 $ al mes',
      country_other_hint: 'País no listado — procesaremos tu solicitud manualmente.',
      sponsor_message_too_long: 'El mensaje no debe superar los 120 caracteres.',
      profile_saved: 'Perfil guardado',
      diet_restrictions_label: 'Restricciones alimentarias (separadas por comas)',
      generate_with_profile: 'Generar con mi perfil',
      height_label: 'Estatura (cm)',
      weight_label: 'Peso (kg)',
      age_label: 'Edad',
      gender_label: 'Sexo',
      gender_male: 'Hombre',
      gender_female: 'Mujer',
      gender_other: 'Otro',
      goal_label: 'Objetivo',
      goal_fat_loss: 'Pérdida de grasa',
      goal_muscle_gain: 'Ganancia muscular',
      goal_maintenance: 'Mantenimiento',
      days_per_week_label: 'Días por semana',
      target_weight_label: 'Peso objetivo (kg)',
      weekly_food_budget_label: 'Presupuesto de comida / semana',
      nearest_gym_label: 'Gimnasio más cercano',
      injuries_label: 'Lesiones (opcional)',
      injuries_placeholder: 'ej. rodilla izquierda, leve, desde 2024',
      diet_restrictions_placeholder: 'ej. sin gluten, sin maní',
      photo_label: 'Foto (opcional)',
      panier_budget_label: 'Presupuesto / semana',
      people_label: 'Número de personas',
      goals_label: 'Objetivos de salud (opcional)',
      goals_placeholder: 'ej. menos azúcar, más proteína',
      preferences_label: 'Preferencias / restricciones (opcional)',
      preferences_placeholder: 'ej. vegetariano, sin gluten, alergias',
      tagline_label: 'Eslogan',
      primary_color_label: 'Color primario',
      accent_color_label: 'Color de acento',
      dark_color_label: 'Color oscuro',
      partner_type_label: 'Tipo',
      product_type_both: 'Coach + Canasta',
      product_type_coach_only: 'Solo Coach',
      product_type_panier_only: 'Solo Canasta',
      demo_label: 'Demo',
      billing_label: 'Facturación',
      code_label: 'Código',
      month_label: 'Mes',
      paid_label: 'Pagado',
      active_subscriptions_label: 'Suscripciones activas: ',
      link_colon_label: 'Enlace: ',
      embed_snippet_label: 'Fragmento de integración:',
      date_label: 'Fecha',
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

  // ---------- language toggle (FR -> EN -> ES cycling) ----------
  function nextLang(current) {
    var idx = LANGS.indexOf(current);
    return LANGS[(idx + 1) % LANGS.length];
  }

  function langToggleLabel(current) {
    return LANGS.map(function (l) {
      var up = l.toUpperCase();
      return l === current ? '<strong>' + up + '</strong>' : up;
    }).join(' | ');
  }

  function initLangToggle(btn, opts) {
    if (!btn) return;
    opts = opts || {};
    btn.innerHTML = langToggleLabel(lang);
    btn.addEventListener('click', function () {
      var next = nextLang(lang);
      if (opts.postPreference && getToken()) {
        api('/me/preferences', { method: 'POST', body: { language: next } }).catch(function () {});
      }
      var url = new URL(location.href);
      url.searchParams.set('lang', next);
      location.href = url.toString();
    });
  }

  // ---------- localized video with graceful fallback to French ----------
  // Tries videos/<dir><baseName>-<lang>.mp4 first; if that source errors
  // (the file does not exist yet, e.g. Spanish not recorded), falls back to
  // the French file, then finally shows the sibling .wl-video-fallback text
  // node (existing inline behavior) by letting the error bubble untouched.
  function initLocalizedVideo(videoEl, sourceEl, baseName, dir) {
    if (!videoEl || !sourceEl) return;
    dir = dir || 'videos/';
    var candidates = [lang];
    if (lang !== 'fr') candidates.push('fr');
    var i = 0;
    function tryNext() {
      if (i >= candidates.length) return;
      sourceEl.src = dir + baseName + '-' + candidates[i] + '.mp4';
      videoEl.poster = dir + baseName + '-' + candidates[i] + '.jpg';
      videoEl.load();
    }
    videoEl.addEventListener('error', function () {
      i++;
      if (i < candidates.length) {
        tryNext();
      } else if (videoEl.nextElementSibling) {
        videoEl.style.display = 'none';
        videoEl.nextElementSibling.style.display = 'flex';
      }
    });
    tryNext();
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

  // After a Stripe checkout redirect (?checkout=success), the member webhook
  // that flips tier to 'member' can land a few seconds after the browser
  // returns — poll /me every 5s (up to 60s) until the tier updates instead
  // of showing "active" before it actually is. onUpdate(user) is called on
  // every poll (including the first, immediate one) so the caller can
  // refresh its own UI; polling stops once tier === 'member' or the 60s
  // budget runs out.
  function pollForMembership(onUpdate) {
    var attempts = 0;
    var maxAttempts = 12; // 12 * 5s = 60s
    function poll() {
      api('/me').then(function (data) {
        var user = data.user || data;
        onUpdate(user);
        if (user.tier !== 'member' && attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 5000);
        }
      }).catch(function () {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 5000);
        }
      });
    }
    poll();
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
            locale: lang === 'fr' ? 'fr' : (lang === 'es' ? 'es' : 'en')
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
    return ((cents || 0) / 100).toLocaleString(lang === 'fr' ? 'fr-CA' : (lang === 'es' ? 'es-MX' : 'en-CA'), {
      style: 'currency', currency: 'CAD'
    });
  }

  function showError(container, message) {
    if (!container) return;
    container.innerHTML = '<div class="wl-alert wl-alert-error">' + message + '</div>';
  }

  // ---------- postal / country detection ----------
  var CA_POSTAL = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  var US_ZIP = /^\d{5}(-\d{4})?$/;
  function looksLikeCaOrUs(value) {
    value = (value || '').trim();
    return CA_POSTAL.test(value) || US_ZIP.test(value);
  }
  // '' is the "not listed" option — the select must only ever send a real
  // ISO-2 code or nothing at all, never a sentinel string.
  var COUNTRIES = [
    ['CA', 'Canada'], ['US', 'United States'], ['FR', 'France'], ['GB', 'United Kingdom'],
    ['BE', 'Belgium'], ['CH', 'Switzerland'], ['DE', 'Germany'], ['MX', 'Mexico'],
    ['HT', 'Haïti'], ['MA', 'Maroc'], ['SN', 'Sénégal'], ['CI', "Côte d'Ivoire"],
    ['DZ', 'Algérie'], ['TN', 'Tunisie'], ['AU', 'Australia'],
    ['', lang === 'fr' ? 'Autre' : (lang === 'es' ? 'Otro' : 'Other')]
  ];

  // ---------- generation error mapping ----------
  function genErrorMessage(err) {
    var code = err && err.data && err.data.error;
    if (code === 'quota_exceeded') return t('quota_exceeded_msg');
    if (code === 'upgrade_required') return t('upgrade_required_msg');
    if (code === 'rate_limited') return t('rate_limited_msg');
    return t('error_generic');
  }

  // ---------- safe sponsor rendering ----------
  // Sponsor name/message/logo_url come from the API (partner-submitted data)
  // and must NEVER be concatenated into innerHTML. Build DOM nodes instead
  // and use textContent; only set an <img src> when it is an https:// URL.
  function renderSponsors(container, sponsors) {
    if (!container) return;
    container.innerHTML = '';
    if (!sponsors || !sponsors.length) {
      var empty = document.createElement('p');
      empty.textContent = t('no_sponsors_yet');
      container.appendChild(empty);
      return;
    }
    sponsors.forEach(function (s) {
      var item = document.createElement('div');
      item.className = 'wl-sponsor-item';
      if (s.logo_url && /^https:\/\//i.test(s.logo_url)) {
        var img = document.createElement('img');
        img.src = s.logo_url;
        img.alt = s.name || '';
        item.appendChild(img);
      }
      var textWrap = document.createElement('div');
      var nameEl = document.createElement('div');
      nameEl.className = 'wl-sponsor-name';
      nameEl.textContent = s.name || '';
      textWrap.appendChild(nameEl);
      if (s.message) {
        var msgEl = document.createElement('div');
        msgEl.className = 'wl-sponsor-message';
        msgEl.textContent = s.message;
        textWrap.appendChild(msgEl);
      }
      item.appendChild(textWrap);
      container.appendChild(item);
    });
  }

  global.WLApp = {
    lang: lang,
    t: t,
    applyI18n: applyI18n,
    initLangToggle: initLangToggle,
    initLocalizedVideo: initLocalizedVideo,
    getPartner: getPartner,
    withPartnerParam: withPartnerParam,
    getToken: getToken,
    setToken: setToken,
    clearToken: clearToken,
    api: api,
    apiUrl: apiUrl,
    fetchConfig: fetchConfig,
    pollForMembership: pollForMembership,
    initGoogleSignIn: initGoogleSignIn,
    maskEmail: maskEmail,
    centsToDollars: centsToDollars,
    showError: showError,
    looksLikeCaOrUs: looksLikeCaOrUs,
    countries: COUNTRIES,
    genErrorMessage: genErrorMessage,
    renderSponsors: renderSponsors
  };
})(window);
