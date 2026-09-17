/* wl-engine-site — the conversational flow (2026-09-18)
   One question per screen with big tap buttons, the form BEFORE the e-mail,
   a one-tap sign-in link, live progress while the plan is built, the result
   on the page, and the way back next week. Used by panier/ and coach/.
   Depends on shared/app.js (WLApp). */
(function (global) {
  'use strict';
  var A = global.WLApp;
  if (!A) return;

  A.addDict({
    fr: {
      wiz_of: '{i} de {n}',
      wiz_back: 'Retour',
      wiz_next: 'Continuer',
      wiz_skip: 'Passer',
      wiz_all: 'Tout voir sur une page',
      wiz_one: 'Une question à la fois',
      wiz_required: 'Répondez à cette question pour continuer.',
      wiz_done_btn: 'Générer mon plan',
      own_title: 'Dites-le dans vos mots',
      own_help: 'Une phrase suffit, on remplit le reste pour vous. Vous confirmez les allergies ensuite.',
      own_placeholder: 'ex. 350 $ par semaine, 4 personnes, un diabétique, pas d’arachides',
      own_btn: 'Remplir pour moi',
      own_ok: 'Compris : {summary}. Vérifiez les allergies avant de continuer.',
      own_fail: 'Je n’ai pas compris. Répondez aux questions ci-dessous.',
      own_budget: '{n} $ par semaine',
      own_people: '{a} adulte(s), {c} enfant(s)',
      email_step_title: 'Où envoyer votre plan ?',
      email_step_help: 'Pas de mot de passe. Vous recevez un lien : un geste et votre plan se génère.',
      email_send_link: 'Recevoir mon lien',
      email_sent_title: 'Regardez vos courriels',
      email_sent_help: 'Ouvrez le courriel envoyé à {email} et touchez « Me connecter ». Ou entrez le code à 6 chiffres ici.',
      email_resend: 'Renvoyer',
      email_change: 'Changer de courriel',
      nudge_opt_label: 'Me prévenir le jeudi quand les circulaires changent (un courriel par semaine, désabonnement en un clic).',
      nudge_saved: 'Rappel du jeudi : activé.',
      nudge_off: 'Rappel du jeudi : désactivé.',
      rate_limited_retry: 'Trop d’essais depuis cette connexion. Réessayez dans quelques minutes.',
      prog_title: 'On prépare votre plan',
      prog_hint: 'Vous pouvez fermer cette page : le plan vous sera envoyé par courriel.',
      step_flyers: 'Lecture des circulaires de la semaine',
      step_flyers_found: 'Circulaires trouvées : {stores} magasins, {items} produits',
      step_stores: 'Magasins retenus : {list}',
      step_filtering: 'Filtrage selon vos allergies',
      step_filtering_d: '{n} produits écartés avant même de choisir',
      step_basket: 'Construction du panier sous votre budget',
      step_checking: 'Vérification des prix et des repas',
      step_pdf: 'Création du PDF',
      step_photo: 'Analyse de la photo',
      step_workouts: 'Vos entraînements de la semaine',
      step_meals: 'Vos repas et votre épicerie',
      step_done: 'Prêt',
      job_failed: 'La génération a échoué ; votre quota n’a pas été consommé. Réessayez.',
      job_lost: 'Le serveur a redémarré pendant la génération. Réessayez.',
      res_title_panier: 'Votre panier de la semaine',
      res_title_coach: 'Votre plan de la semaine',
      res_stops: '{n} magasin(s), du plus proche au plus loin',
      res_items: '{n} articles',
      res_budget_of: 'sur un budget de {b}',
      res_under: '{d} sous le budget',
      res_over: '{d} au-dessus du budget',
      res_open_pdf: 'Ouvrir le PDF complet',
      res_pdf_help: 'Les menus de la semaine, la liste à cocher et le trajet sont dans le PDF.',
      res_pdf_help_coach: 'Tous les exercices en détail, vos repas et votre épicerie sont dans le PDF.',
      res_filtered: 'Filtré selon : {list}.',
      res_sent: 'Une copie vous a été envoyée par courriel.',
      res_today: 'Aujourd’hui : {day}',
      res_week: 'Votre semaine',
      res_rest: 'Repos',
      res_cal: 'calories / jour',
      res_protein: 'g de protéines',
      res_carbs: 'g de glucides',
      res_fat: 'g de lipides',
      res_more: 'Voir tous les articles',
      res_less: 'Réduire',
      res_estimated: 'estimé',
      return_title: 'Bon retour',
      return_help: 'Votre profil est enregistré. Un geste et votre nouveau plan est prêt.',
      redo_btn: 'Refaire avec mon profil',
      edit_btn: 'Modifier mes réponses',
      redo_panier_help: 'Les circulaires changent le jeudi : refaites votre panier chaque semaine.',
      home_hint: 'Astuce : ajoutez cette page à votre écran d’accueil (menu du navigateur › « Sur l’écran d’accueil ») pour la retrouver comme une application.',
      photo_take: 'Prendre une photo',
      photo_pick: 'Choisir une photo',
      photo_none: 'Aucune photo (facultatif)',
      photo_lost_msg: 'La photo n’a pas suivi la connexion : le plan est généré sans photo. Vous pourrez en ajouter une à la prochaine génération.',
      terms_short: 'J’ai 18 ans ou plus et j’accepte les',
      terms_and: 'et la',
      free_used_title: 'Plan gratuit utilisé',
      free_used_body: 'Votre prochain plan gratuit arrive le {date}. Membre : 3 plans par jour, GymBro et Panier.',
      plan_ready_title: 'Votre plan est prêt',
      loc_found_stores: 'Trouvé : {list}',
      loc_checking: 'Recherche des magasins près de chez vous...',
      loc_none: 'Aucune circulaire ici : les prix seront estimés.',
      link_used_msg: 'Ce lien a déjà servi ou est expiré. Entrez votre courriel pour en recevoir un nouveau.',
      chip_custom: 'Autre',
      yes: 'Oui', no: 'Non',
    },
    en: {
      wiz_of: '{i} of {n}',
      wiz_back: 'Back',
      wiz_next: 'Continue',
      wiz_skip: 'Skip',
      wiz_all: 'Show everything on one page',
      wiz_one: 'One question at a time',
      wiz_required: 'Answer this question to continue.',
      wiz_done_btn: 'Generate my plan',
      own_title: 'Say it in your own words',
      own_help: 'One sentence is enough, we fill in the rest. You confirm the allergies after.',
      own_placeholder: 'e.g. $350 a week, 4 people, one diabetic, no peanuts',
      own_btn: 'Fill it in for me',
      own_ok: 'Got it: {summary}. Check the allergies before continuing.',
      own_fail: 'I did not understand. Answer the questions below.',
      own_budget: '${n} a week',
      own_people: '{a} adult(s), {c} child(ren)',
      email_step_title: 'Where should we send your plan?',
      email_step_help: 'No password. You get a link: one tap and your plan is generated.',
      email_send_link: 'Send me my link',
      email_sent_title: 'Check your email',
      email_sent_help: 'Open the email sent to {email} and tap "Sign me in". Or enter the 6-digit code here.',
      email_resend: 'Resend',
      email_change: 'Use another email',
      nudge_opt_label: 'Tell me on Thursdays when the flyers change (one email a week, one-click unsubscribe).',
      nudge_saved: 'Thursday reminder: on.',
      nudge_off: 'Thursday reminder: off.',
      rate_limited_retry: 'Too many tries from this connection. Try again in a few minutes.',
      prog_title: 'Building your plan',
      prog_hint: 'You can close this page: the plan will be emailed to you.',
      step_flyers: 'Reading this week\'s flyers',
      step_flyers_found: 'Flyers found: {stores} stores, {items} products',
      step_stores: 'Stores kept: {list}',
      step_filtering: 'Filtering for your allergies',
      step_filtering_d: '{n} products set aside before choosing',
      step_basket: 'Building the basket under your budget',
      step_checking: 'Checking prices and meals',
      step_pdf: 'Creating the PDF',
      step_photo: 'Analyzing the photo',
      step_workouts: 'Your week\'s workouts',
      step_meals: 'Your meals and groceries',
      step_done: 'Ready',
      job_failed: 'Generation failed; your quota was not used. Try again.',
      job_lost: 'The server restarted during generation. Try again.',
      res_title_panier: 'Your basket for the week',
      res_title_coach: 'Your plan for the week',
      res_stops: '{n} store(s), nearest first',
      res_items: '{n} items',
      res_budget_of: 'of a {b} budget',
      res_under: '{d} under budget',
      res_over: '{d} over budget',
      res_open_pdf: 'Open the full PDF',
      res_pdf_help: 'The week\'s menus, the checklist and the route are in the PDF.',
      res_pdf_help_coach: 'Every exercise in detail, your meals and your groceries are in the PDF.',
      res_filtered: 'Filtered for: {list}.',
      res_sent: 'A copy was emailed to you.',
      res_today: 'Today: {day}',
      res_week: 'Your week',
      res_rest: 'Rest',
      res_cal: 'calories / day',
      res_protein: 'g protein',
      res_carbs: 'g carbs',
      res_fat: 'g fat',
      res_more: 'Show all items',
      res_less: 'Show less',
      res_estimated: 'estimated',
      return_title: 'Welcome back',
      return_help: 'Your profile is saved. One tap and your new plan is ready.',
      redo_btn: 'Redo with my profile',
      edit_btn: 'Change my answers',
      redo_panier_help: 'Flyers change on Thursdays: redo your basket every week.',
      home_hint: 'Tip: add this page to your home screen (browser menu › "Add to Home Screen") to open it like an app.',
      photo_take: 'Take a photo',
      photo_pick: 'Choose a photo',
      photo_none: 'No photo (optional)',
      photo_lost_msg: 'The photo did not survive the sign-in: the plan is generated without it. You can add one next time.',
      terms_short: 'I am 18 or older and I accept the',
      terms_and: 'and the',
      free_used_title: 'Free plan used',
      free_used_body: 'Your next free plan comes on {date}. Member: 3 plans a day, GymBro and Panier.',
      plan_ready_title: 'Your plan is ready',
      loc_found_stores: 'Found: {list}',
      loc_checking: 'Looking for stores near you...',
      loc_none: 'No flyers here: prices will be estimated.',
      link_used_msg: 'This link was already used or has expired. Enter your email to get a new one.',
      chip_custom: 'Other',
      yes: 'Yes', no: 'No',
    },
    es: {
      wiz_of: '{i} de {n}',
      wiz_back: 'Atrás',
      wiz_next: 'Continuar',
      wiz_skip: 'Saltar',
      wiz_all: 'Ver todo en una página',
      wiz_one: 'Una pregunta a la vez',
      wiz_required: 'Responde esta pregunta para continuar.',
      wiz_done_btn: 'Generar mi plan',
      own_title: 'Dilo con tus palabras',
      own_help: 'Una frase basta, llenamos el resto. Confirmas las alergias después.',
      own_placeholder: 'ej. 350 $ por semana, 4 personas, un diabético, sin cacahuetes',
      own_btn: 'Llenar por mí',
      own_ok: 'Entendido: {summary}. Revisa las alergias antes de continuar.',
      own_fail: 'No entendí. Responde las preguntas de abajo.',
      own_budget: '{n} $ por semana',
      own_people: '{a} adulto(s), {c} niño(s)',
      email_step_title: '¿Adónde enviamos tu plan?',
      email_step_help: 'Sin contraseña. Recibes un enlace: un toque y tu plan se genera.',
      email_send_link: 'Recibir mi enlace',
      email_sent_title: 'Revisa tu correo',
      email_sent_help: 'Abre el correo enviado a {email} y toca «Entrar». O escribe aquí el código de 6 dígitos.',
      email_resend: 'Reenviar',
      email_change: 'Usar otro correo',
      nudge_opt_label: 'Avisarme los jueves cuando cambien los folletos (un correo por semana, baja en un clic).',
      nudge_saved: 'Recordatorio del jueves: activado.',
      nudge_off: 'Recordatorio del jueves: desactivado.',
      rate_limited_retry: 'Demasiados intentos desde esta conexión. Inténtalo en unos minutos.',
      prog_title: 'Preparando tu plan',
      prog_hint: 'Puedes cerrar esta página: el plan te llegará por correo.',
      step_flyers: 'Leyendo los folletos de la semana',
      step_flyers_found: 'Folletos encontrados: {stores} tiendas, {items} productos',
      step_stores: 'Tiendas elegidas: {list}',
      step_filtering: 'Filtrando según tus alergias',
      step_filtering_d: '{n} productos apartados antes de elegir',
      step_basket: 'Armando la canasta bajo tu presupuesto',
      step_checking: 'Verificando precios y comidas',
      step_pdf: 'Creando el PDF',
      step_photo: 'Analizando la foto',
      step_workouts: 'Tus entrenamientos de la semana',
      step_meals: 'Tus comidas y tu compra',
      step_done: 'Listo',
      job_failed: 'La generación falló; tu cuota no se consumió. Inténtalo de nuevo.',
      job_lost: 'El servidor se reinició durante la generación. Inténtalo de nuevo.',
      res_title_panier: 'Tu canasta de la semana',
      res_title_coach: 'Tu plan de la semana',
      res_stops: '{n} tienda(s), de la más cercana a la más lejana',
      res_items: '{n} artículos',
      res_budget_of: 'de un presupuesto de {b}',
      res_under: '{d} por debajo del presupuesto',
      res_over: '{d} por encima del presupuesto',
      res_open_pdf: 'Abrir el PDF completo',
      res_pdf_help: 'Los menús de la semana, la lista y la ruta están en el PDF.',
      res_pdf_help_coach: 'Todos los ejercicios en detalle, tus comidas y tu compra están en el PDF.',
      res_filtered: 'Filtrado según: {list}.',
      res_sent: 'Te enviamos una copia por correo.',
      res_today: 'Hoy: {day}',
      res_week: 'Tu semana',
      res_rest: 'Descanso',
      res_cal: 'calorías / día',
      res_protein: 'g de proteína',
      res_carbs: 'g de carbohidratos',
      res_fat: 'g de grasa',
      res_more: 'Ver todos los artículos',
      res_less: 'Ver menos',
      res_estimated: 'estimado',
      return_title: 'Bienvenido de nuevo',
      return_help: 'Tu perfil está guardado. Un toque y tu nuevo plan está listo.',
      redo_btn: 'Rehacer con mi perfil',
      edit_btn: 'Cambiar mis respuestas',
      redo_panier_help: 'Los folletos cambian los jueves: rehaz tu canasta cada semana.',
      home_hint: 'Consejo: agrega esta página a tu pantalla de inicio (menú del navegador › «Añadir a inicio») para abrirla como una app.',
      photo_take: 'Tomar una foto',
      photo_pick: 'Elegir una foto',
      photo_none: 'Sin foto (opcional)',
      photo_lost_msg: 'La foto no sobrevivió al inicio de sesión: el plan se genera sin ella. Podrás añadir una la próxima vez.',
      terms_short: 'Tengo 18 años o más y acepto las',
      terms_and: 'y la',
      free_used_title: 'Plan gratuito usado',
      free_used_body: 'Tu próximo plan gratuito llega el {date}. Miembro: 3 planes al día, GymBro y Panier.',
      plan_ready_title: 'Tu plan está listo',
      loc_found_stores: 'Encontrado: {list}',
      loc_checking: 'Buscando tiendas cerca de ti...',
      loc_none: 'No hay folletos aquí: los precios serán estimados.',
      link_used_msg: 'Este enlace ya se usó o venció. Escribe tu correo para recibir uno nuevo.',
      chip_custom: 'Otro',
      yes: 'Sí', no: 'No',
    }
  });

  var t = A.t, tf = A.tf, esc = A.escapeHtml;

  // ---------- draft (survives the e-mail round trip, same device) ----------
  function draftKey(product) { return 'wl_draft_' + product; }
  function saveDraft(product, obj) { try { localStorage.setItem(draftKey(product), JSON.stringify(obj)); } catch (e) {} }
  function loadDraft(product) { try { return JSON.parse(localStorage.getItem(draftKey(product)) || 'null'); } catch (e) { return null; } }
  function clearDraft(product) { try { localStorage.removeItem(draftKey(product)); } catch (e) {} }

  // ---------- query helpers ----------
  function qp(name) { return new URLSearchParams(location.search).get(name); }
  function dropParams(names) {
    var url = new URL(location.href);
    names.forEach(function (n) { url.searchParams.delete(n); });
    history.replaceState(null, '', url.pathname + (url.search || '') + url.hash);
  }
  function returnUrl() {
    var url = new URL(location.href);
    ['ml', 'plan', 'redo', 'checkout', 'upgrade'].forEach(function (n) { url.searchParams.delete(n); });
    return url.toString();
  }

  // ---------- one-tap sign-in from the e-mail ----------
  // Resolves to the user when ?ml= signs in, null otherwise. The draft says
  // whether terms were accepted on the form before the e-mail was sent.
  function handleMagicLink(product) {
    var token = qp('ml');
    if (!token) return Promise.resolve(null);
    var draft = loadDraft(product) || {};
    return A.api('/auth/email/magic', { method: 'POST', body: { token: token, partner: A.getPartner(), accept_terms: draft.terms === true } })
      .then(function (data) { A.setToken(data.token); dropParams(['ml']); return data.user; })
      .catch(function () { dropParams(['ml']); linkFailed = true; return null; });
  }
  // A link that was already used (or expired) and no session: ask for the
  // e-mail again right away instead of showing an empty form.
  var linkFailed = false;
  function signInAgain(container, product, hideIds) {
    if (!linkFailed || A.getToken()) return false;
    (hideIds || []).forEach(function (id) { var n = document.getElementById(id); if (n) n.classList.add('wl-hidden'); });
    container.classList.remove('wl-hidden');
    emailStep(container, { product: product, nudge: false, draft: function () { return loadDraft(product) || {}; }, onSignedIn: function () { location.reload(); } });
    var note = document.createElement('div');
    note.className = 'wl-alert wl-alert-warn';
    note.textContent = t('link_used_msg');
    container.insertBefore(note, container.firstChild);
    return true;
  }

  // ---------- money / date ----------
  function money(n, currency) {
    try { return new Intl.NumberFormat(A.lang === 'en' ? 'en-CA' : (A.lang === 'es' ? 'es' : 'fr-CA'), { style: 'currency', currency: currency || 'CAD' }).format(Number(n)); }
    catch (e) { return String(n); }
  }
  function km(v) { return v == null ? '' : (v < 0.1 ? t('km_under_100m') : tf('km_away', { km: String(v).replace('.', A.lang === 'en' ? '.' : ',') })); }

  // ---------- wizard: one .wl-q at a time ----------
  // Each `.wl-q` in the form: data-type = tap (a <select> becomes big
  // buttons) | chips (number input with data-quick="1,2,3") | checks |
  // location | text | custom. data-optional lets it be skipped.
  function wizard(form, opts) {
    opts = opts || {};
    var allQs = Array.prototype.slice.call(form.querySelectorAll('.wl-q'));
    // Questions hidden by the page (the photo step for free accounts) are
    // not counted: the list is re-read whenever the position changes.
    var qs = allQs.slice();
    function refreshQs() { qs = allQs.filter(function (q) { return !q.classList.contains('wl-hidden'); }); }
    var idx = 0;
    var allOpen = false;
    var box = document.createElement('div');
    box.className = 'wl-wiz';
    form.insertBefore(box, form.firstChild);
    var top = document.createElement('div'); top.className = 'wl-wiz-top';
    var count = document.createElement('span'); count.className = 'wl-wiz-count';
    var toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'wl-link-btn'; toggle.textContent = t('wiz_all');
    top.appendChild(count); top.appendChild(toggle);
    var bar = document.createElement('div'); bar.className = 'wl-wiz-bar'; bar.innerHTML = '<span></span>';
    var body = document.createElement('div'); body.className = 'wl-wiz-body';
    var nav = document.createElement('div'); nav.className = 'wl-wiz-nav';
    var back = document.createElement('button'); back.type = 'button'; back.className = 'wl-link-btn'; back.textContent = t('wiz_back');
    var next = document.createElement('button'); next.type = 'button'; next.className = 'wl-btn'; next.textContent = t('wiz_next');
    var err = document.createElement('div');
    nav.appendChild(back); nav.appendChild(next);
    box.appendChild(top); box.appendChild(bar); box.appendChild(body); box.appendChild(err); box.appendChild(nav);
    allQs.forEach(function (q) { body.appendChild(q); decorate(q); });
    var submitBtn = form.querySelector('[type=submit]');

    function decorate(q) {
      var type = q.getAttribute('data-type') || 'text';
      var native = q.querySelector('.wl-q-native') || q;
      if (type === 'tap') {
        var sel = q.querySelector('select');
        if (!sel) return;
        var grid = document.createElement('div'); grid.className = 'wl-tap-grid' + (sel.options.length > 4 ? ' wl-tap-2' : '');
        Array.prototype.slice.call(sel.options).forEach(function (o) {
          if (o.value === '' && !o.hasAttribute('data-keep')) return;
          var b = document.createElement('button'); b.type = 'button'; b.className = 'wl-tap';
          b.innerHTML = '<span>' + esc(o.textContent) + '</span>';
          b.setAttribute('data-value', o.value);
          b.addEventListener('click', function () {
            sel.value = o.value;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
            syncTap(q);
            if (!allOpen) setTimeout(function () { goNext(); }, 120);
          });
          grid.appendChild(b);
        });
        // Nothing is chosen until the person taps (a select would silently
        // pre-pick its first option).
        if (!sel.hasAttribute('data-keep-default')) sel.selectedIndex = -1;
        native.classList.add('wl-q-native', 'wl-q-hidden');
        q.insertBefore(grid, native);
        syncTap(q);
      } else if (type === 'chips') {
        var input = q.querySelector('input[type=number]');
        if (!input) return;
        var quick = (input.getAttribute('data-quick') || '').split(',').filter(Boolean);
        if (!quick.length) return;
        var chips = document.createElement('div'); chips.className = 'wl-chips';
        quick.forEach(function (v) {
          var c = document.createElement('button'); c.type = 'button'; c.className = 'wl-chip'; c.textContent = v.replace('_', ' ');
          c.setAttribute('data-value', v);
          c.addEventListener('click', function () { input.value = v; input.dispatchEvent(new Event('input', { bubbles: true })); syncChips(q); });
          chips.appendChild(c);
        });
        q.insertBefore(chips, q.querySelector('.wl-field') || null);
        input.addEventListener('input', function () { syncChips(q); });
        syncChips(q);
      }
    }
    function syncTap(q) {
      var sel = q.querySelector('select');
      Array.prototype.slice.call(q.querySelectorAll('.wl-tap')).forEach(function (b) { b.setAttribute('aria-pressed', sel && b.getAttribute('data-value') === sel.value ? 'true' : 'false'); });
    }
    function syncChips(q) {
      var input = q.querySelector('input[type=number]');
      Array.prototype.slice.call(q.querySelectorAll('.wl-chip')).forEach(function (c) { c.setAttribute('aria-pressed', input && c.getAttribute('data-value') === String(input.value) ? 'true' : 'false'); });
    }
    function validStep(q) {
      var fields = Array.prototype.slice.call(q.querySelectorAll('input, select, textarea'));
      for (var i = 0; i < fields.length; i++) {
        if (fields[i].offsetParent === null && fields[i].type !== 'hidden' && !fields[i].closest('.wl-q-hidden')) continue;
        if (!fields[i].checkValidity()) { try { fields[i].reportValidity(); } catch (e) {} return false; }
      }
      if (q.getAttribute('data-type') === 'tap') { var sel = q.querySelector('select'); if (sel && sel.required && !sel.value) return false; }
      return true;
    }
    function show(i) {
      refreshQs();
      idx = Math.max(0, Math.min(qs.length - 1, i));
      allQs.forEach(function (q) { q.classList.remove('wl-q-active'); });
      qs.forEach(function (q, k) { q.classList.toggle('wl-q-active', k === idx); });
      count.textContent = tf('wiz_of', { i: idx + 1, n: qs.length });
      bar.firstChild.style.width = Math.round(((idx + 1) / qs.length) * 100) + '%';
      back.style.visibility = idx === 0 ? 'hidden' : 'visible';
      var last = idx === qs.length - 1;
      next.textContent = last ? (opts.lastLabel || t('wiz_done_btn')) : (qs[idx].hasAttribute('data-optional') && !answered(qs[idx]) ? t('wiz_skip') : t('wiz_next'));
      err.innerHTML = '';
      if (opts.onShow) opts.onShow(qs[idx].getAttribute('data-q'), qs[idx]);
      var first = qs[idx].querySelector('input:not([type=checkbox]):not([type=hidden]):not(.wl-q-hidden input), textarea');
      if (first && !allOpen && window.innerWidth > 700) { try { first.focus({ preventScroll: true }); } catch (e) {} }
      box.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    function answered(q) {
      var fields = Array.prototype.slice.call(q.querySelectorAll('input, select, textarea'));
      return fields.some(function (f) { return f.type === 'checkbox' ? f.checked : (f.type === 'file' ? f.files && f.files.length : String(f.value || '').trim() !== ''); });
    }
    function goNext() {
      var q = qs[idx];
      if (!validStep(q)) { err.innerHTML = '<div class="wl-alert wl-alert-warn">' + esc(t('wiz_required')) + '</div>'; return; }
      var proceed = function () {
        if (idx === qs.length - 1) { if (submitBtn) submitBtn.click(); else form.requestSubmit(); return; }
        show(idx + 1);
      };
      var hook = opts.onAnswer ? opts.onAnswer(q.getAttribute('data-q'), q) : null;
      if (hook && typeof hook.then === 'function') { next.disabled = true; hook.then(function () { next.disabled = false; proceed(); }, function () { next.disabled = false; proceed(); }); }
      else proceed();
    }
    next.addEventListener('click', goNext);
    back.addEventListener('click', function () { show(idx - 1); });
    form.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !allOpen && e.target && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') { e.preventDefault(); goNext(); }
    });
    function setAllOpen(on) {
      allOpen = on;
      form.classList.toggle('wl-all-open', on);
      top.style.display = on ? 'none' : ''; bar.style.display = on ? 'none' : ''; nav.style.display = on ? 'none' : '';
      if (submitBtn) submitBtn.classList.toggle('wl-hidden', !on);
      allQs.forEach(function (q) { if (on) q.classList.remove('wl-q-active'); });
      Array.prototype.slice.call(form.querySelectorAll('.wl-q-native')).forEach(function (n) { n.classList.toggle('wl-q-hidden', !on); });
      if (!on) show(idx);
      var back2 = form.querySelector('.wl-wiz-one');
      if (on && !back2) {
        back2 = document.createElement('button'); back2.type = 'button'; back2.className = 'wl-link-btn wl-wiz-one'; back2.textContent = t('wiz_one');
        back2.addEventListener('click', function () { setAllOpen(false); back2.remove(); });
        form.appendChild(back2);
      }
    }
    toggle.addEventListener('click', function () { setAllOpen(true); });
    if (submitBtn) submitBtn.classList.add('wl-hidden');
    show(0);
    return {
      goTo: function (id) { var i = qs.findIndex(function (q) { return q.getAttribute('data-q') === id; }); if (i >= 0) { if (allOpen) setAllOpen(false); show(i); } },
      restart: function () { if (allOpen) setAllOpen(false); show(0); },
      sync: function () { qs.forEach(function (q) { syncTap(q); syncChips(q); }); },
      reply: function (id, text) {
        var q = qs.find(function (x) { return x.getAttribute('data-q') === id; });
        if (!q) return;
        var r = q.querySelector('.wl-reply');
        if (!text) { if (r) r.remove(); return; }
        if (!r) { r = document.createElement('div'); r.className = 'wl-reply'; q.appendChild(r); }
        r.textContent = text;
      },
      setAllOpen: setAllOpen,
      box: box
    };
  }

  // ---------- "Où envoyer votre plan ?" (the paperwork, at the end) ----------
  // Renders the e-mail step. onSignedIn(user, { termsAccepted }) fires
  // when the code is typed; the magic link path lands on handleMagicLink.
  function emailStep(container, opts) {
    var product = opts.product;
    var nudge = opts.nudge === true;
    container.innerHTML =
      '<div class="wl-wiz wl-email-step">' +
        '<h3>' + esc(t('email_step_title')) + '</h3>' +
        '<p class="wl-q-help">' + esc(t('email_step_help')) + '</p>' +
        '<form novalidate id="wl-es-form">' +
          '<div class="wl-field"><label for="wl-es-email">' + esc(t('email_label')) + '</label><input type="email" id="wl-es-email" autocomplete="email" inputmode="email" required></div>' +
          '<label class="wl-choice wl-consent"><input type="checkbox" id="wl-es-terms" required> <span>' + esc(t('terms_short')) + ' <a href="../conditions/" target="_blank" rel="noopener">' + esc(t('terms_link')) + '</a> ' + esc(t('terms_and')) + ' <a href="../confidentialite/" target="_blank" rel="noopener">' + esc(t('privacy_link')) + '</a>. ' + esc(t('ai_disclaimer')) + '</span></label>' +
          (nudge ? '<label class="wl-choice wl-consent"><input type="checkbox" id="wl-es-nudge"> <span>' + esc(t('nudge_opt_label')) + '</span></label>' : '') +
          '<div id="wl-es-msg" style="margin-top:10px"></div>' +
          '<div class="wl-wiz-nav"><button type="submit" class="wl-btn" id="wl-es-btn">' + esc(t('email_send_link')) + '</button></div>' +
        '</form>' +
        '<div id="wl-es-code" class="wl-hidden">' +
          '<h3>' + esc(t('email_sent_title')) + '</h3><p class="wl-q-help" id="wl-es-sent"></p>' +
          '<form novalidate id="wl-es-code-form"><div class="wl-field"><label for="wl-es-code-input">' + esc(t('otp_code_label')) + '</label><input type="text" id="wl-es-code-input" inputmode="numeric" autocomplete="one-time-code" maxlength="7" pattern="[0-9 ]{6,7}"></div>' +
          '<div id="wl-es-code-msg"></div>' +
          '<div class="wl-wiz-nav"><button type="submit" class="wl-btn">' + esc(t('verify_code')) + '</button><button type="button" class="wl-link-btn" id="wl-es-resend">' + esc(t('email_resend')) + '</button><button type="button" class="wl-link-btn" id="wl-es-change">' + esc(t('email_change')) + '</button></div></form>' +
        '</div>' +
      '</div>';
    var form = container.querySelector('#wl-es-form');
    var emailInput = container.querySelector('#wl-es-email');
    var terms = container.querySelector('#wl-es-terms');
    var nudgeBox = container.querySelector('#wl-es-nudge');
    var msg = container.querySelector('#wl-es-msg');
    var btn = container.querySelector('#wl-es-btn');
    var codeBox = container.querySelector('#wl-es-code');
    var codeForm = container.querySelector('#wl-es-code-form');
    var codeInput = container.querySelector('#wl-es-code-input');
    var codeMsg = container.querySelector('#wl-es-code-msg');
    var email = '';
    if (opts.prefillEmail) emailInput.value = opts.prefillEmail;

    function send() {
      email = emailInput.value.trim();
      msg.innerHTML = '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { A.showError(msg, esc(t('email_invalid'))); return; }
      if (!terms.checked) { A.showError(msg, esc(t('terms_required_msg'))); return; }
      btn.disabled = true;
      // The draft carries the answers + consent through the e-mail round trip.
      var draft = opts.draft ? opts.draft() : {};
      draft.terms = true; draft.email = email; draft.nudge = nudgeBox ? nudgeBox.checked : false; draft.at = Date.now();
      saveDraft(product, draft);
      A.api('/auth/email/start', { method: 'POST', body: { email: email, partner: A.getPartner(), language: A.lang, return_url: returnUrl() } })
        .then(function () { showCode(); })
        .catch(function (err) {
          var code = err && err.data && err.data.error;
          if (code === 'code_recently_sent') showCode();
          else if (err && (err.status === 429 || code === 'too_many_codes' || code === 'rate_limited')) A.showError(msg, esc(t('rate_limited_retry')));
          else A.showError(msg, esc(code === 'invalid_email' ? t('email_invalid') : t('service_unavailable')));
        })
        .finally(function () { btn.disabled = false; });
    }
    function showCode() {
      form.classList.add('wl-hidden');
      codeBox.classList.remove('wl-hidden');
      container.querySelector('#wl-es-sent').textContent = tf('email_sent_help', { email: email });
      codeInput.focus();
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); send(); });
    container.querySelector('#wl-es-resend').addEventListener('click', function () { codeMsg.innerHTML = ''; send(); });
    container.querySelector('#wl-es-change').addEventListener('click', function () { codeBox.classList.add('wl-hidden'); form.classList.remove('wl-hidden'); codeInput.value = ''; codeMsg.innerHTML = ''; emailInput.focus(); });
    codeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      codeMsg.innerHTML = '';
      A.api('/auth/email/verify', { method: 'POST', body: { email: email, code: codeInput.value.replace(/\s+/g, ''), partner: A.getPartner(), accept_terms: true } })
        .then(function (data) { A.setToken(data.token); opts.onSignedIn(data.user, { nudge: nudgeBox ? nudgeBox.checked : false }); })
        .catch(function (err) { A.showError(codeMsg, esc(err && err.status === 429 ? t('rate_limited_retry') : t('code_invalid'))); });
    });
    emailInput.focus();
  }

  // ---------- progress while the server works ----------
  var STEP_ORDER = {
    panier: ['flyers', 'filtering', 'basket', 'checking', 'pdf'],
    coach: ['photo', 'workouts', 'meals', 'checking', 'pdf']
  };
  function stepLabel(s) {
    if (s.step === 'flyers_found' && s.detail) return tf('step_flyers_found', { stores: s.detail.stores, items: s.detail.items });
    if (s.step === 'stores' && s.detail && s.detail.stores) return tf('step_stores', { list: s.detail.stores.map(function (x) { return x.chain + (x.distance_km != null ? ' (' + String(x.distance_km).replace('.', A.lang === 'en' ? '.' : ',') + ' km)' : ''); }).join(', ') });
    if (s.step === 'filtering' && s.detail && s.detail.excluded) return t('step_filtering') + ' — ' + tf('step_filtering_d', { n: s.detail.excluded });
    return t('step_' + s.step);
  }
  function progressView(container, product, withPhoto) {
    var order = STEP_ORDER[product].filter(function (s) { return s !== 'photo' || withPhoto; });
    container.innerHTML = '<div class="wl-progress"><div class="wl-spinner"></div><div><strong>' + esc(t('prog_title')) + '</strong></div><ul class="wl-steps" id="wl-steps"></ul><p class="wl-muted" style="margin:12px 0 0">' + esc(t('prog_hint')) + '</p></div>';
    var ul = container.querySelector('#wl-steps');
    order.forEach(function (s) { var li = document.createElement('li'); li.setAttribute('data-step', s); li.innerHTML = '<span class="wl-dot"></span><span>' + esc(t('step_' + s)) + '</span>'; ul.appendChild(li); });
    var detailFor = {};
    return function update(job) {
      var seen = {};
      (job.steps || []).forEach(function (s) {
        var key = s.step === 'flyers_found' ? 'flyers' : (s.step === 'stores' ? 'filtering' : s.step);
        seen[key] = true;
        if (s.step === 'flyers_found' || s.step === 'stores' || (s.step === 'filtering' && s.detail)) detailFor[key] = stepLabel(s);
      });
      var current = job.step === 'flyers_found' ? 'flyers' : (job.step === 'stores' ? 'filtering' : job.step);
      var reached = false;
      order.forEach(function (s) {
        var li = ul.querySelector('[data-step="' + s + '"]');
        var done = job.status === 'done' || (seen[s] && s !== current);
        var now = job.status !== 'done' && s === current;
        li.className = done ? 'wl-step-done' : (now ? 'wl-step-now' : '');
        if (!reached && !seen[s]) reached = true;
        var d = li.querySelector('.wl-step-detail');
        if (detailFor[s]) { if (!d) { d = document.createElement('span'); d.className = 'wl-step-detail'; li.lastChild.appendChild(d); } d.textContent = detailFor[s]; }
      });
    };
  }
  // Polls GET /jobs/:id until done or failed. onUpdate(job) each time.
  function pollJob(jobId, onUpdate) {
    return new Promise(function (resolve, reject) {
      var tries = 0;
      (function tick() {
        A.api('/jobs/' + encodeURIComponent(jobId)).then(function (job) {
          if (onUpdate) onUpdate(job);
          if (job.status === 'done') { resolve(job.result); return; }
          if (job.status === 'failed') { var e = new Error(job.error || 'generation_failed'); e.data = { error: job.error === 'server_restarted' ? 'job_lost' : job.error, reason: job.detail && job.detail.reason }; reject(e); return; }
          tries++;
          setTimeout(tick, tries < 10 ? 1500 : 3000);
        }).catch(function (err) {
          tries++;
          if (tries > 200) { reject(err); return; }
          setTimeout(tick, 3000);
        });
      })();
    });
  }
  // POST the generation as a job, show progress in `container`, resolve the result.
  function generateWithProgress(container, product, request) {
    var update = progressView(container, product, request.withPhoto);
    container.classList.remove('wl-hidden');
    // request.before: work to do first (GymBro saves the profile), with the
    // step list already on screen. request.build() then makes the body.
    var first = request.before ? request.before() : Promise.resolve();
    return first.then(function () { if (request.build) { var b = request.build(); request.formData = b.formData; request.body = b.body; request.withPhoto = b.withPhoto; } return A.api(request.path, request.formData ? { method: 'POST', formData: request.formData } : { method: 'POST', body: request.body }); })
      .then(function (data) {
        if (data.job_id) return pollJob(data.job_id, update);
        return data; // an older server answered synchronously
      });
  }

  // ---------- the result on the page ----------
  function renderPanierResult(container, res, opts) {
    opts = opts || {};
    var s = res.summary || {};
    var cur = s.currency || 'CAD';
    var html = '<div class="wl-result-card"><h2>' + esc(t('res_title_panier')) + '</h2>';
    if (s.total != null) {
      html += '<div class="wl-result-total">' + esc(money(s.total, cur)) + (s.budget ? '<small>' + esc(tf('res_budget_of', { b: money(s.budget, cur) })) + '</small>' : '') + '</div>';
      if (s.budget) { var d = s.budget - s.total; html += '<p class="wl-muted" style="margin:0 0 10px">' + esc(d >= 0 ? tf('res_under', { d: money(d, cur) }) : tf('res_over', { d: money(-d, cur) })) + '</p>'; }
    }
    var stops = s.store_totals || (s.nearest || []).map(function (n) { return { chain: n.chain, address: n.address, distance_km: n.distance_km }; });
    if (stops.length) {
      html += '<p style="margin:0 0 4px"><strong>' + esc(tf('res_stops', { n: stops.length })) + '</strong></p><ul class="wl-stops">';
      stops.forEach(function (st) {
        html += '<li><div class="wl-stop-head"><span><span class="wl-stop-name">' + esc(st.chain) + '</span> <span class="wl-stop-km">' + esc(km(st.distance_km)) + (st.items ? ' · ' + esc(tf('res_items', { n: st.items })) : '') + '</span></span>' + (st.total != null ? '<span class="wl-stop-total">' + esc(money(st.total, cur)) + '</span>' : '') + '</div>' + (st.address ? '<div class="wl-stop-addr">' + esc(st.address) + '</div>' : '') + '</li>';
      });
      html += '</ul>';
    }
    if (s.lines && s.lines.length) {
      html += '<button type="button" class="wl-link-btn" id="wl-lines-toggle">' + esc(t('res_more')) + '</button><ul class="wl-lines wl-hidden" id="wl-lines">';
      s.lines.forEach(function (l) { html += '<li><span>' + esc((l.qty > 1 ? l.qty + ' × ' : '') + l.name) + ' <small class="wl-muted">' + esc(l.store || '') + '</small></span><span>' + esc(money(l.total, cur)) + (l.approx ? ' <small>' + esc(t('res_estimated')) + '</small>' : '') + '</span></li>'; });
      html += '</ul>';
    }
    var notes = [];
    if (s.removed_for_safety && s.removed_for_safety.length) notes.push(tf('removed_for_safety_msg', { items: s.removed_for_safety.join(', ') }));
    if (s.trimmed_for_budget && s.trimmed_for_budget.length) notes.push(tf('trimmed_for_budget_msg', { items: s.trimmed_for_budget.join(', ') }));
    if (s.meals_removed_for_safety && s.meals_removed_for_safety.length) notes.push(tf('meals_removed_msg', { n: s.meals_removed_for_safety.length }));
    if (s.moved_to_avoid_detour && s.moved_to_avoid_detour.length) notes.push(tf('moved_msg', { items: s.moved_to_avoid_detour.map(function (x) { return x.from + ' › ' + x.to; }).join('; ') }));
    if (s.dropped_small_stop && s.dropped_small_stop.length) notes.push(tf('dropped_msg', { items: s.dropped_small_stop.join(', ') }));
    if (s.prices_stale && s.priceDate) notes.push(tf('stale_prices_msg', { date: s.priceDate }));
    if (notes.length) html += '<p class="wl-muted" style="margin:10px 0 0">' + esc(notes.join(' · ')) + '</p>';
    html += '<p class="wl-safety-line">' + (s.declared ? esc(tf('res_filtered', { list: s.declared })) + ' ' : '') + esc(t('allergy_check_label')) + '</p>';
    html += '<div class="wl-result-actions"><a class="wl-btn" id="wl-res-pdf" href="#" target="_blank" rel="noopener">' + esc(t('res_open_pdf')) + '</a></div>';
    html += '<p class="wl-muted" style="margin:8px 0 0">' + esc(t('res_pdf_help')) + (opts.sent ? ' ' + esc(t('res_sent')) : '') + '</p>';
    html += '</div>';
    container.innerHTML = html;
    wirePdf(container, res);
    var tg = container.querySelector('#wl-lines-toggle');
    if (tg) tg.addEventListener('click', function () { var ul = container.querySelector('#wl-lines'); var open = ul.classList.toggle('wl-hidden'); tg.textContent = open ? t('res_more') : t('res_less'); });
  }

  function renderCoachResult(container, res, opts) {
    opts = opts || {};
    var s = res.summary || {};
    var html = '<div class="wl-result-card"><h2>' + esc(t('res_title_coach')) + '</h2>';
    if (s.today && s.today_exercises && s.today_exercises.length) {
      html += '<div class="wl-session"><h4>' + esc(tf('res_today', { day: s.today })) + '</h4><ol>';
      s.today_exercises.forEach(function (e) { html += '<li>' + esc(e.name) + (e.sets ? ' <span class="wl-muted">' + esc(e.sets + ' × ' + (e.reps || '')) + '</span>' : '') + '</li>'; });
      html += '</ol></div>';
    }
    if (s.overview && s.overview.length) {
      html += '<h4 style="margin:14px 0 0">' + esc(t('res_week')) + '</h4><div class="wl-week">';
      s.overview.forEach(function (d) { var rest = d.type === 'rest' || !d.exercises.length; html += '<div class="' + (rest ? 'wl-rest' : '') + '"><strong>' + esc(d.day) + '</strong>' + esc(rest ? t('res_rest') : d.exercises.slice(0, 3).map(function (e) { return e.name; }).join(', ') + (d.exercises.length > 3 ? '…' : '')) + '</div>'; });
      html += '</div>';
    }
    var m = s.macro_split || {};
    if (s.daily_calorie_target) {
      html += '<div class="wl-numbers"><div><strong>' + esc(String(s.daily_calorie_target)) + '</strong>' + esc(t('res_cal')) + '</div>';
      if (m.protein_g) html += '<div><strong>' + esc(String(m.protein_g)) + '</strong>' + esc(t('res_protein')) + '</div>';
      if (m.carbs_g) html += '<div><strong>' + esc(String(m.carbs_g)) + '</strong>' + esc(t('res_carbs')) + '</div>';
      if (m.fat_g) html += '<div><strong>' + esc(String(m.fat_g)) + '</strong>' + esc(t('res_fat')) + '</div>';
      html += '</div>';
    }
    var notes = [];
    if (res.scan_error) notes.push(t('photo_unreadable_msg'));
    if (opts.photoLost) notes.push(t('photo_lost_msg'));
    if (res.checks && res.checks.meals_removed) notes.push(tf('meals_removed_msg', { n: res.checks.meals_removed }));
    if (notes.length) html += '<p class="wl-muted" style="margin:10px 0 0">' + esc(notes.join(' ')) + '</p>';
    html += '<p class="wl-safety-line">' + esc(t('privacy_note_coach')) + '</p>';
    html += '<div class="wl-result-actions"><a class="wl-btn" id="wl-res-pdf" href="#" target="_blank" rel="noopener">' + esc(t('res_open_pdf')) + '</a></div>';
    html += '<p class="wl-muted" style="margin:8px 0 0">' + esc(t('res_pdf_help_coach')) + (opts.sent ? ' ' + esc(t('res_sent')) : '') + '</p></div>';
    container.innerHTML = html;
    wirePdf(container, res);
  }

  function wirePdf(container, res) {
    var a = container.querySelector('#wl-res-pdf');
    if (!a) return;
    var friendly = A.planUrl(res.plan_id, res.pdf_key);
    if (friendly) a.href = friendly;
    else if (res.pdf_url) a.href = res.pdf_url;
    a.addEventListener('click', function (e) { if (!friendly && res.plan_id) { e.preventDefault(); A.openPlan(res.plan_id); } });
  }

  // "Bon retour" card for people with a saved profile.
  function returnCard(container, opts) {
    container.innerHTML = '<div class="wl-return-card"><h3 style="margin:0 0 4px">' + esc(t('return_title')) + '</h3><p class="wl-muted" style="margin:0 0 6px">' + esc(t('return_help')) + (opts.product === 'panier' ? ' ' + esc(t('redo_panier_help')) : '') + '</p>' +
      '<button type="button" class="wl-btn" id="wl-redo-btn">' + esc(t('redo_btn')) + '</button><button type="button" class="wl-btn wl-btn-outline" id="wl-edit-btn">' + esc(t('edit_btn')) + '</button>' +
      '<div id="wl-return-note" class="wl-muted wl-hidden" style="margin-top:8px"></div></div>';
    container.querySelector('#wl-redo-btn').addEventListener('click', opts.onRedo);
    container.querySelector('#wl-edit-btn').addEventListener('click', opts.onEdit);
    container.classList.remove('wl-hidden');
  }

  // Free allowance used: the button is off, the date and the plan are shown.
  function freeUsedCard(container, me) {
    container.innerHTML = '<div class="wl-card"><h3 style="margin:0 0 6px;color:var(--color-primary)">' + esc(t('free_used_title')) + '</h3><p style="margin:0">' + esc(tf('free_used_body', { date: me.next_free_plan ? A.formatDate(me.next_free_plan) : '' })) + '</p></div>';
    container.classList.remove('wl-hidden');
  }

  function ownWordsSummary(f) {
    var parts = [];
    if (f.budget) parts.push(tf('own_budget', { n: f.budget }));
    if (f.adults !== undefined) parts.push(tf('own_people', { a: f.adults, c: f.children || 0 }));
    if (f.allergies && f.allergies.length) parts.push(f.allergies.map(function (id) { return t('allergy_' + id); }).join(', '));
    if (f.diet && f.diet.length) parts.push(f.diet.map(function (id) { return t('diet_' + id); }).join(', '));
    if (f.postal_code) parts.push(f.postal_code);
    return parts.join(' · ');
  }

  global.WLFlow = {
    saveDraft: saveDraft, loadDraft: loadDraft, clearDraft: clearDraft,
    qp: qp, dropParams: dropParams, returnUrl: returnUrl,
    handleMagicLink: handleMagicLink,
    signInAgain: signInAgain,
    wizard: wizard,
    emailStep: emailStep,
    generateWithProgress: generateWithProgress,
    pollJob: pollJob,
    renderPanierResult: renderPanierResult,
    renderCoachResult: renderCoachResult,
    returnCard: returnCard,
    freeUsedCard: freeUsedCard,
    ownWordsSummary: ownWordsSummary,
    money: money,
    km: km
  };
})(window);
