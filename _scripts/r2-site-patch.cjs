// Round-2 audit fixes on the site (one-shot; exact-string patches).
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
function patch(rel, pairs) {
  const p = path.join(root, rel);
  const raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.includes('\r\n');
  let s = raw.replace(/\r\n/g, '\n');
  for (const [a0, b0] of pairs) {
    const a = a0.replace(/\r\n/g, '\n'), b = b0.replace(/\r\n/g, '\n');
    if (!s.includes(a)) { if (s.includes(b)) continue; throw new Error(rel + ' missing: ' + a.slice(0, 80)); }
    s = s.replace(a, () => b);
  }
  fs.writeFileSync(p, crlf ? s.replace(/\n/g, '\r\n') : s);
  console.log('patched', rel);
}

// 1. Landing: sections visible by default; the reveal only animates once JS
//    confirms an observer exists (audit Panier H-6 / GymBro M-5).
patch('shared/landing.css', [
  [
    `body[data-product] .wl-reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s var(--wl-ease), transform .7s var(--wl-ease); }
body[data-product] .wl-reveal.wl-in { opacity: 1; transform: none; }`,
    `/* Content is visible by default: a print, a reader mode, a crawler or an
   in-app browser that never fires scroll events must not see a blank page.
   The .wl-reveal-ready class is added by the landing script only when an
   IntersectionObserver exists, and only then do sections start hidden. */
body[data-product].wl-reveal-ready .wl-reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s var(--wl-ease), transform .7s var(--wl-ease); }
body[data-product].wl-reveal-ready .wl-reveal.wl-in { opacity: 1; transform: none; }`,
  ],
]);
patch('index.html', [
  [
    `    var revealEls = document.querySelectorAll('.wl-reveal');
    if (!revealEls.length) return;
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('wl-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {`,
    `    var revealEls = document.querySelectorAll('.wl-reveal');
    if (!revealEls.length) return;
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('wl-in'); });
      return;
    }
    // Sections start visible (landing.css); hide them for the rise-in only
    // now that the observer is there, and reveal anything already on screen
    // at once. A safety timer reveals everything after 2,5 s regardless.
    document.body.classList.add('wl-reveal-ready');
    setTimeout(function () { revealEls.forEach(function (el) { el.classList.add('wl-in'); }); }, 2500);
    var io = new IntersectionObserver(function (entries) {`,
  ],
  // The page's <html lang> and dictionary follow the browser on a first visit.
  [
    `<script>
  WLApp.applyI18n();`,
    `<script>
  WLApp.applyI18n();
  document.documentElement.lang = WLApp.lang;`,
  ],
  // og:site_name per product (build-public.cjs stamps the rest per domain)
  [
    `<meta property="og:site_name" content="GymBro + Panier">`,
    `<meta property="og:site_name" id="wl-og-site-name" content="GymBro + Panier">`,
  ],
]);

// 2. app.js: browser language on first visit; free-only pricing card title
//    printed once; "1 plans" plural; draft expiry.
patch('shared/app.js', [
  [
    `    try {
      var stored = localStorage.getItem('wl_lang');
      if (LANGS.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    return 'fr';
  }`,
    `    try {
      var stored = localStorage.getItem('wl_lang');
      if (LANGS.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    // First visit: the browser's language (en-US -> en, es-MX -> es), French
    // otherwise. The toggle stores the choice from then on.
    try {
      var nav = String((navigator.languages && navigator.languages[0]) || navigator.language || '').slice(0, 2).toLowerCase();
      if (LANGS.indexOf(nav) !== -1) return nav;
    } catch (e) {}
    return 'fr';
  }`,
  ],
  [
    `    var memberCard = pricing.querySelector('.wl-card-member');
    if (memberCard) memberCard.classList.add('wl-hidden');`,
    `    var memberCard = pricing.querySelector('.wl-card-member');
    if (memberCard) memberCard.classList.add('wl-hidden');
    // One card left: its badge repeated its own title ("Gratuit Gratuit").
    var freeBadge = pricing.querySelector('.wl-card:not(.wl-card-member) .wl-badge');
    if (freeBadge) freeBadge.classList.add('wl-hidden');`,
  ],
  [
    `      plans_remaining_week: 'plans restants cette semaine',`,
    `      plans_remaining_week: 'plans restants cette semaine',
      plan_remaining_week: 'plan restant cette semaine',
      plan_remaining_month: 'plan restant ce mois',
      plan_remaining_today: 'plan restant aujourd’hui',`,
  ],
  [
    `      plans_remaining_week: 'plans left this week',`,
    `      plans_remaining_week: 'plans left this week',
      plan_remaining_week: 'plan left this week',
      plan_remaining_month: 'plan left this month',
      plan_remaining_today: 'plan left today',`,
  ],
  [
    `      plans_remaining_week: 'planes restantes esta semana',`,
    `      plans_remaining_week: 'planes restantes esta semana',
      plan_remaining_week: 'plan restante esta semana',
      plan_remaining_month: 'plan restante este mes',
      plan_remaining_today: 'plan restante hoy',`,
  ],
  [
    `    applyFreeOnlyLanding: applyFreeOnlyLanding`,
    `    applyFreeOnlyLanding: applyFreeOnlyLanding,
    // "1 plan restant" / "2 plans restants": singular below 2.
    remainingLabel: function (n, periodKey) { return n + ' ' + t((Number(n) === 1 ? periodKey.replace('plans_', 'plan_') : periodKey)); }`,
  ],
]);

// 3. flow.js: draft expires after 24 h on load and is cleared on the
//    "link used" path (shared device, audit engine L-3); a plan-ready link
//    opened a second time shows the plan by its key.
patch('shared/flow.js', [
  [
    `  function loadDraft(product) { try { return JSON.parse(localStorage.getItem(draftKey(product)) || 'null'); } catch (e) { return null; } }`,
    `  var DRAFT_MAX_AGE = 24 * 3600 * 1000;
  function loadDraft(product) {
    try {
      var d = JSON.parse(localStorage.getItem(draftKey(product)) || 'null');
      // A draft holds allergies, injuries and a postal code: on a shared
      // device it must not outlive the day it was typed.
      if (d && d.at && Date.now() - d.at > DRAFT_MAX_AGE) { localStorage.removeItem(draftKey(product)); return null; }
      return d;
    } catch (e) { return null; }
  }`,
  ],
  [
    `  function signInAgain(container, product, hideIds) {
    if (!linkFailed || A.getToken()) return false;`,
    `  function signInAgain(container, product, hideIds) {
    if (!linkFailed || A.getToken()) return false;
    clearDraft(product);`,
  ],
  [
    `  var linkFailed = false;`,
    `  var linkFailed = false;
  // The "plan ready" e-mail: ?plan=<id>&k=<key>. When the sign-in part of
  // the link is spent (second device, a double tap) the plan is still shown
  // from its key — never "this link was already used" with an empty box.
  function planByKey() {
    var id = qp('plan'), k = qp('k');
    if (!id || !k) return Promise.resolve(null);
    return A.api('/plans/' + encodeURIComponent(id) + '/view?k=' + encodeURIComponent(k)).catch(function () { return null; });
  }`,
  ],
  [
    `    ownWordsSummary: ownWordsSummary,`,
    `    ownWordsSummary: ownWordsSummary,
    planByKey: planByKey,`,
  ],
]);

// 4. panier/index.html + coach/index.html: second open of the ready link;
//    singular label; own-words jumps even when the postal lookup fails.
for (const page of ['panier/index.html', 'coach/index.html']) {
  const render = page.startsWith('panier') ? 'F.renderPanierResult' : 'F.renderCoachResult';
  patch(page, [
    [
      `  F.handleMagicLink(PRODUCT).then(function () {
    if (!A.getToken()) {`,
      `  F.handleMagicLink(PRODUCT).then(function () {
    if (!A.getToken() && F.qp('plan') && F.qp('k')) {
      // The one-tap link was already used (other device, double tap): the
      // plan itself still opens from its key, with the e-mail box below.
      return F.planByKey().then(function (p) {
        if (!p) return;
        F.dropParams(['plan', 'k']);
        showOnly(['wl-result', 'wl-email-step']);
        ${render}(el('wl-result'), { plan_id: p.id, pdf_key: p.pdf_key, summary: p.summary }, {});
        F.signInAgain(el('wl-email-step'), PRODUCT, ['wl-form-section']);
      });
    }
    if (!A.getToken()) {`,
    ],
    [
      `        F.dropParams(['plan']);`,
      `        F.dropParams(['plan', 'k']);`,
    ],
  ]);
}
patch('panier/index.html', [
  [
    `      el('wl-remaining-label').textContent = remaining.month !== undefined ? remaining.month + ' ' + A.t(periodKey) : '';`,
    `      el('wl-remaining-label').textContent = remaining.month !== undefined ? A.remainingLabel(remaining.month, periodKey) : '';`,
  ],
  [
    `        ['budget', 'adults', 'children', 'allergies_other', 'goals', 'preferences', 'max_stores', 'postal_code'].forEach(function (k) { if (f[k] !== undefined && form.elements[k]) form.elements[k].value = f[k]; });
        if (f.postal_code) { checkPostal(); nearbyDone = ''; }
        if (f.allergies) A.setChecked(el('wl-allergies'), f.allergies);
        if (f.diet) A.setChecked(el('wl-diet'), f.diet);
        wiz.sync();
        msg.textContent = A.tf('own_ok', { summary: F.ownWordsSummary(f) });
        wiz.goTo(form.elements.postal_code.value ? 'allergies' : 'location');`,
    `        ['budget', 'adults', 'children', 'allergies_other', 'goals', 'preferences', 'max_stores', 'postal_code'].forEach(function (k) { if (f[k] !== undefined && form.elements[k]) form.elements[k].value = f[k]; });
        if (f.postal_code) { postalInput.value = f.postal_code; try { checkPostal(); } catch (e) {} nearbyDone = ''; lastPoint = null; }
        if (f.allergies) A.setChecked(el('wl-allergies'), f.allergies);
        if (f.diet) A.setChecked(el('wl-diet'), f.diet);
        try { wiz.sync(); } catch (e) {}
        msg.textContent = A.tf('own_ok', { summary: F.ownWordsSummary(f) });
        // Straight to the allergy boxes (the safety step) when the sentence
        // gave a location; the store lookup runs in the background.
        wiz.goTo(postalInput.value.trim() ? 'allergies' : 'location');
        if (postalInput.value.trim()) { try { loadNearby(); } catch (e) {} }`,
  ],
]);
patch('coach/index.html', [
  [
    `      el('wl-remaining-label').textContent = remaining.month !== undefined ? remaining.month + ' ' + A.t(periodKey) : '';`,
    `      el('wl-remaining-label').textContent = remaining.month !== undefined ? A.remainingLabel(remaining.month, periodKey) : '';`,
  ],
]);

// 5. commanditaires: no "Coach + Panier"; the brand is filled per host.
patch('commanditaires/index.html', [
  [
    `<div class="wl-brand-name" data-brand-name>Coach + Panier</div>`,
    `<div class="wl-brand-name" data-brand-name></div>`,
  ],
]);

// 6. build-public.cjs: per-domain <title>, description, og:*, brand name and
//    legal contact stamped into the static HTML (crawlers and mail previews
//    run no JS; the legal page must not read "se joint à ." for 2 s).
patch('_scripts/build-public.cjs', [
  [
    `const SITES = {
  gymbro: { domain: 'https://gymbro.bot', paths: ['/', '/coach/', '/commanditaires/', '/confidentialite/', '/conditions/'] },
  panier: { domain: 'https://panier.bot', paths: ['/', '/panier/', '/commanditaires/', '/confidentialite/', '/conditions/'] },
};`,
    `const SITES = {
  gymbro: {
    domain: 'https://gymbro.bot', paths: ['/', '/coach/', '/commanditaires/', '/confidentialite/', '/conditions/'],
    name: 'GymBro', title: 'GymBro — coach d’entraînement par IA', description: 'GymBro : votre plan d’entraînement et de repas de la semaine, personnalisé par IA, gratuit. Recommandation d’IA, pas un avis professionnel.',
    image: 'https://gymbro.bot/shared/art/gymbro-hero.jpg', contact: 'info@gymbro.bot',
  },
  panier: {
    domain: 'https://panier.bot', paths: ['/', '/panier/', '/commanditaires/', '/confidentialite/', '/conditions/'],
    name: 'Panier', title: 'Panier — épicerie de la semaine par IA', description: 'Panier : la liste d’épicerie de la semaine aux prix des circulaires près de chez vous, allergies filtrées, gratuite. Recommandation d’IA.',
    image: 'https://panier.bot/shared/art/panier-hero.jpg', contact: 'info@panier.bot',
  },
};

// Static text a crawler or a mail preview sees without running JS.
function stampHead(html, site) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return html
    .replace(/<title>[^<]*<\\/title>/, \`<title>\${esc(site.title)}</title>\`)
    .replace(/(<meta name="description" id="wl-meta-description" content=")[^"]*(")/, \`$1\${esc(site.description)}$2\`)
    .replace(/(<meta property="og:site_name" id="wl-og-site-name" content=")[^"]*(")/, \`$1\${esc(site.name)}$2\`)
    .replace(/(<meta property="og:title" id="wl-og-title" content=")[^"]*(")/, \`$1\${esc(site.title)}$2\`)
    .replace(/(<meta property="og:description" id="wl-og-description" content=")[^"]*(")/, \`$1\${esc(site.description)}$2\`)
    .replace(/(<meta property="og:image" id="wl-og-image" content=")[^"]*(")/, \`$1\${site.image}$2\`)
    .replace(/(<meta property="og:url" id="wl-og-url" content=")[^"]*(")/, \`$1\${site.domain}/$2\`)
    .replace(/(<meta name="twitter:title" id="wl-twitter-title" content=")[^"]*(")/, \`$1\${esc(site.title)}$2\`)
    .replace(/(<meta name="twitter:description" id="wl-twitter-description" content=")[^"]*(")/, \`$1\${esc(site.description)}$2\`)
    .replace(/(<meta name="twitter:image" id="wl-twitter-image" content=")[^"]*(")/, \`$1\${site.image}$2\`);
}
// Legal pages: brand name and contact are static per domain (no empty
// "se joint à ." while /config loads).
function stampLegal(html, site) {
  return html
    .replace(/<span data-brand-name><\\/span>/g, \`<span data-brand-name>\${site.name}</span>\`)
    .replace(/<div class="wl-brand-name" data-brand-name><\\/div>/g, \`<div class="wl-brand-name" data-brand-name>\${site.name}</div>\`)
    .replace(/<a data-legal-contact href="#"><\\/a>/g, \`<a data-legal-contact href="mailto:\${site.contact}">\${site.contact}</a>\`);
}`,
  ],
  [
    `  console.log('wrote per-site robots.txt + sitemap.xml for', siteName);
}`,
    `  const site = SITES[siteName];
  const idx = path.join(out, 'index.html');
  fs.writeFileSync(idx, stampHead(fs.readFileSync(idx, 'utf8'), site));
  for (const page of ['confidentialite', 'conditions', 'commanditaires']) {
    const f = path.join(out, page, 'index.html');
    if (fs.existsSync(f)) fs.writeFileSync(f, stampLegal(fs.readFileSync(f, 'utf8'), site));
  }
  // A real 404 page and a favicon.ico (older clients and mail previews ask for it).
  fs.writeFileSync(path.join(out, '404.html'), notFoundPage(site));
  const ico = path.join(root, 'shared', 'icons', \`\${siteName}.ico\`);
  if (fs.existsSync(ico)) fs.copyFileSync(ico, path.join(out, 'favicon.ico'));
  console.log('wrote per-site robots.txt + sitemap.xml + head + 404 for', siteName);
}

function notFoundPage(site) {
  return \`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>\${site.name} — page introuvable</title>
<meta name="robots" content="noindex">
<link rel="stylesheet" href="/shared/ui.css">
</head>
<body>
<div class="wl-app">
  <main class="wl-card" style="max-width:520px;margin:48px auto;padding:28px">
    <h1>Page introuvable</h1>
    <p class="wl-muted">Cette adresse n’existe pas ou plus. / This page does not exist. / Esta página no existe.</p>
    <p><a class="wl-btn" href="/">\${site.name}</a></p>
  </main>
</div>
</body>
</html>
\`;
}`,
  ],
]);
console.log('site patched');
