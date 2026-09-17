/* Live check of the way back: the "plan ready" e-mail link signs the person in and shows the plan + "Refaire avec mon profil". */
const { chromium } = require('playwright'); const path = require('path');
const { latestMailTo } = require('./csr-mail.cjs');
(async () => {
  const email = process.argv[2]; const word = process.argv[3] || 'pr';
  const mail = await latestMailTo(email, { sinceMs: 60 * 60 * 1000, subjectWord: word });
  const link = mail && mail.links.find((l) => /ml=/.test(l) && !/amp;/.test(l));
  if (!link) { console.log('no link'); process.exit(1); }
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, locale: 'fr-CA' }); const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') console.log('console error:', m.text()); });
  await page.goto(link); await page.waitForTimeout(5000);
  const name = path.join(__dirname, 'flow-shots', 'return-' + new URL(link).hostname + '.png');
  await page.screenshot({ path: name, fullPage: false });
  console.log('url now:', page.url());
  console.log('signed in:', await page.evaluate(() => Boolean(localStorage.getItem('wl_token'))));
  console.log('sees:', (await page.textContent('#wl-app-section')).replace(/\s+/g, ' ').slice(0, 260));
  const m = await ctx.request.get(new URL(link).origin + '/shared/manifest-' + (/gymbro/.test(link) ? 'gymbro' : 'panier') + '.webmanifest'); console.log('manifest', m.status(), m.headers()['content-type']);
  await b.close();
})();
