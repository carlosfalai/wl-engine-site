// Copies the public site files into _site/ for the gymbro.bot / panier.bot
// CloudFront sites (second-brain/06-playbooks/scripts/aws-static-site).
// Never copies _scripts, admin or partner pages, or dotfiles.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, '_site');
const INCLUDE = ['index.html', 'coach', 'panier', 'commanditaires', 'shared', 'videos', 'exemples'];
fs.rmSync(out, { recursive: true, force: true });
for (const item of INCLUDE) {
  const src = path.join(root, item);
  if (!fs.existsSync(src)) continue;
  fs.cpSync(src, path.join(out, item), { recursive: true, filter: (p) => !path.basename(p).startsWith('.') });
}
console.log('built', out);
