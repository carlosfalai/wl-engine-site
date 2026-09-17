// Every i18n key a page or shared/flow.js uses must exist in the dictionary
// (shared/app.js + shared/flow.js additions), in all three languages.
//   node _scripts/check-page-keys.cjs
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const dict = read('shared/app.js') + read('shared/flow.js') + read('coach/index.html') + read('panier/index.html');
const has = (k) => new RegExp('\\b' + k + ':\\s') .test(dict);
let bad = 0;
for (const page of ['panier/index.html', 'coach/index.html', 'shared/flow.js']) {
  const src = read(page);
  const keys = new Set();
  for (const m of src.matchAll(/data-i18n(?:-placeholder)?="([a-z_0-9]+)"/g)) keys.add(m[1]);
  for (const m of src.matchAll(/\b(?:A\.)?tf?\('([a-z_0-9]+)'/g)) keys.add(m[1]);
  // keys ending in "_" are prefixes completed at runtime (zone_neck, step_pdf…)
  const missing = [...keys].filter((k) => !k.endsWith('_') && !has(k));
  if (missing.length) { bad += missing.length; console.log(page, 'missing:', missing.join(', ')); }
  else console.log(page, keys.size, 'keys ok');
}
process.exit(bad ? 1 : 0);
