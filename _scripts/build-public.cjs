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
  gymbro: { domain: 'https://gymbro.bot', paths: ['/', '/coach/', '/commanditaires/', '/confidentialite/', '/conditions/'] },
  panier: { domain: 'https://panier.bot', paths: ['/', '/panier/', '/commanditaires/', '/confidentialite/', '/conditions/'] },
};
const siteName = process.argv[2];
if (siteName && SITES[siteName]) {
  const { domain, paths } = SITES[siteName];
  fs.writeFileSync(path.join(out, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /partenaire/\n\nSitemap: ${domain}/sitemap.xml\n`);
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths.map((p) => `  <url>\n    <loc>${domain}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n');
  fs.writeFileSync(path.join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  console.log('wrote per-site robots.txt + sitemap.xml for', siteName);
}

console.log('built', out);
