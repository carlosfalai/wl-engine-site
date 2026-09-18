// Copies the public site files into _site/ for the gymbro.bot / panier.bot
// CloudFront sites (second-brain/06-playbooks/scripts/aws-static-site).
// Never copies _scripts, admin or partner pages, or dotfiles.
//
// Optional first CLI arg = site name ("gymbro" | "panier"). When given,
// robots.txt and sitemap.xml in _site/ are overwritten with content for
// that domain specifically (og:title/description/image are already
// per-host via JS in index.html — see shared/app.js + the inline script —
// robots.txt/sitemap.xml are static files a crawler reads directly, so
// they need real per-host content, not a script to run first).
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, '_site');
const INCLUDE = ['index.html', 'robots.txt', 'coach', 'panier', 'commanditaires', 'confidentialite', 'conditions', 'shared', 'videos', 'exemples'];
fs.rmSync(out, { recursive: true, force: true });
for (const item of INCLUDE) {
  const src = path.join(root, item);
  if (!fs.existsSync(src)) continue;
  fs.cpSync(src, path.join(out, item), { recursive: true, filter: (p) => !path.basename(p).startsWith('.') });
}

const SITES = {
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
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(site.title)}</title>`)
    .replace(/(<meta name="description" id="wl-meta-description" content=")[^"]*(")/, `$1${esc(site.description)}$2`)
    .replace(/(<meta property="og:site_name" id="wl-og-site-name" content=")[^"]*(")/, `$1${esc(site.name)}$2`)
    .replace(/(<meta property="og:title" id="wl-og-title" content=")[^"]*(")/, `$1${esc(site.title)}$2`)
    .replace(/(<meta property="og:description" id="wl-og-description" content=")[^"]*(")/, `$1${esc(site.description)}$2`)
    .replace(/(<meta property="og:image" id="wl-og-image" content=")[^"]*(")/, `$1${site.image}$2`)
    .replace(/(<meta property="og:url" id="wl-og-url" content=")[^"]*(")/, `$1${site.domain}/$2`)
    .replace(/(<meta name="twitter:title" id="wl-twitter-title" content=")[^"]*(")/, `$1${esc(site.title)}$2`)
    .replace(/(<meta name="twitter:description" id="wl-twitter-description" content=")[^"]*(")/, `$1${esc(site.description)}$2`)
    .replace(/(<meta name="twitter:image" id="wl-twitter-image" content=")[^"]*(")/, `$1${site.image}$2`);
}
// Legal pages: brand name and contact are static per domain (no empty
// "se joint à ." while /config loads).
function stampLegal(html, site) {
  return html
    .replace(/<span data-brand-name><\/span>/g, `<span data-brand-name>${site.name}</span>`)
    .replace(/<div class="wl-brand-name" data-brand-name><\/div>/g, `<div class="wl-brand-name" data-brand-name>${site.name}</div>`)
    .replace(/<a data-legal-contact href="#"><\/a>/g, `<a data-legal-contact href="mailto:${site.contact}">${site.contact}</a>`);
}
const siteName = process.argv[2];
if (siteName && SITES[siteName]) {
  const { domain, paths } = SITES[siteName];
  fs.writeFileSync(path.join(out, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /partenaire/\n\nSitemap: ${domain}/sitemap.xml\n`);
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths.map((p) => `  <url>\n    <loc>${domain}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n');
  fs.writeFileSync(path.join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  const site = SITES[siteName];
  const idx = path.join(out, 'index.html');
  fs.writeFileSync(idx, stampHead(fs.readFileSync(idx, 'utf8'), site));
  for (const page of ['confidentialite', 'conditions', 'commanditaires']) {
    const f = path.join(out, page, 'index.html');
    if (fs.existsSync(f)) fs.writeFileSync(f, stampLegal(fs.readFileSync(f, 'utf8'), site));
  }
  // A real 404 page and a favicon.ico (older clients and mail previews ask for it).
  fs.writeFileSync(path.join(out, '404.html'), notFoundPage(site));
  const ico = path.join(root, 'shared', 'icons', `${siteName}.ico`);
  if (fs.existsSync(ico)) fs.copyFileSync(ico, path.join(out, 'favicon.ico'));
  console.log('wrote per-site robots.txt + sitemap.xml + head + 404 for', siteName);
}

function notFoundPage(site) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${site.name} — page introuvable</title>
<meta name="robots" content="noindex">
<link rel="stylesheet" href="/shared/ui.css">
</head>
<body>
<div class="wl-app">
  <main class="wl-card" style="max-width:520px;margin:48px auto;padding:28px">
    <h1>Page introuvable</h1>
    <p class="wl-muted">Cette adresse n’existe pas ou plus. / This page does not exist. / Esta página no existe.</p>
    <p><a class="wl-btn" href="/">${site.name}</a></p>
  </main>
</div>
</body>
</html>
`;
}

console.log('built', out);
