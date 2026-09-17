/* Walks the new flow at phone width against a local copy of the site and the
   LIVE API (CORS headers are injected on the intercepted API responses so a
   localhost page can talk to api.healthyplan.ca).
     node _scripts/static-8080.cjs &   (serves this folder)
     node _scripts/walk-flow.cjs panier <email> [--generate]
     node _scripts/walk-flow.cjs coach <email> [--generate]
   Screenshots go to _scripts/flow-shots/. Never a real person's address:
   use something under @panier.bot / @gymbro.bot (catch-all -> info@instanthpi.ai). */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const product = process.argv[2] || 'panier';
const email = process.argv[3] || 'ux-test@panier.bot';
const generate = process.argv.includes('--generate');
const base = process.env.SITE_BASE || 'http://localhost:8080';
const partner = product === 'panier' ? 'PANIER' : 'GYMBRO';
const out = path.join(__dirname, 'flow-shots');
fs.mkdirSync(out, { recursive: true });
let n = 0;
const shot = async (page, name) => { n++; const f = path.join(out, `${product}-${String(n).padStart(2, '0')}-${name}.png`); await page.screenshot({ path: f }); console.log('shot', path.basename(f)); };

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-CA', geolocation: { latitude: 45.5265, longitude: -73.5811 }, permissions: ['geolocation'] });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') console.log('console error:', m.text()); });
  page.on('pageerror', (e) => console.log('page error:', e.message));
  await page.route('https://api.healthyplan.ca/**', async (route) => {
    const req = route.request();
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' } });
    const res = await route.fetch();
    const headers = { ...res.headers(), 'access-control-allow-origin': '*', 'access-control-expose-headers': '*' };
    delete headers['content-encoding']; delete headers['content-length'];
    route.fulfill({ status: res.status(), headers, body: await res.body() });
  });
  await page.goto(`${base}/${product === 'panier' ? 'panier' : 'coach'}/?p=${partner}&lang=fr`);
  await page.waitForTimeout(1500);
  await shot(page, 'q1');
  const wizCount = async () => (await page.textContent('.wl-wiz-count').catch(() => '')) || '';
  console.log('first screen:', await wizCount(), '|', (await page.textContent('.wl-q.wl-q-active h3')).trim());

  if (product === 'panier') {
    await page.click('#wl-geo-btn');
    await page.waitForSelector('#wl-nearby .wl-stores, #wl-nearby p', { timeout: 60000 });
    await page.waitForTimeout(500);
    await shot(page, 'location-found');
    console.log('reply:', (await page.textContent('.wl-q[data-q=location] .wl-reply').catch(() => '(none)')));
    await page.click('.wl-wiz-nav .wl-btn'); // continue
    await page.waitForTimeout(300);
    await page.click('.wl-q[data-q=adults] .wl-chip[data-value="2"]');
    await shot(page, 'adults');
    await page.click('.wl-wiz-nav .wl-btn');
    await page.click('.wl-q[data-q=children] .wl-chip[data-value="1"]');
    await page.click('.wl-wiz-nav .wl-btn');
    await page.click('.wl-q[data-q=budget] .wl-chip[data-value="150"]');
    await shot(page, 'budget');
    await page.click('.wl-wiz-nav .wl-btn');
    await page.check('#wl-allergies input[value=peanuts]');
    await shot(page, 'allergies');
    await page.click('.wl-wiz-nav .wl-btn');
    await page.click('.wl-wiz-nav .wl-btn'); // diet: skip
    await shot(page, 'extras');
    console.log('last screen:', await wizCount(), 'button:', (await page.textContent('.wl-wiz-nav .wl-btn')).trim());
  } else {
    await page.click('.wl-q[data-q=goal] .wl-tap[data-value=fat_loss]');
    await page.waitForTimeout(300);
    await shot(page, 'goal-tapped');
    await page.click('.wl-q[data-q=place] .wl-tap[data-value=home_equipment]');
    await page.waitForTimeout(300);
    await page.click('.wl-q[data-q=level] .wl-tap[data-value=beginner]');
    await page.waitForTimeout(300);
    await page.click('.wl-q[data-q=days] .wl-chip[data-value="3"]');
    await page.click('.wl-wiz-nav .wl-btn');
    await page.fill('input[name=height_cm]', '178'); await page.fill('input[name=weight_kg]', '92'); await page.fill('input[name=age]', '38'); await page.fill('input[name=first_name]', 'Marc');
    await shot(page, 'body');
    await page.click('.wl-wiz-nav .wl-btn');
    await page.click('#wl-add-injury');
    await page.selectOption('.wl-inj-zone', 'left_knee');
    await shot(page, 'injury');
    await page.click('.wl-wiz-nav .wl-btn');
    await page.click('.wl-wiz-nav .wl-btn'); // food: skip
    await page.fill('#wl-postal-input', 'H2X 3P2');
    await shot(page, 'postal');
    console.log('last screen:', await wizCount(), 'button:', (await page.textContent('.wl-wiz-nav .wl-btn')).trim());
  }
  // The paperwork, at the end.
  await page.click('.wl-wiz-nav .wl-btn');
  await page.waitForSelector('#wl-es-email', { timeout: 5000 });
  await shot(page, 'email-step');
  await page.fill('#wl-es-email', email);
  await page.check('#wl-es-terms');
  if (product === 'panier') await page.check('#wl-es-nudge');
  await page.click('#wl-es-btn');
  await page.waitForSelector('#wl-es-code:not(.wl-hidden)', { timeout: 15000 });
  await shot(page, 'code-sent');
  console.log('draft saved:', await page.evaluate((p) => Object.keys(JSON.parse(localStorage.getItem('wl_draft_' + p) || '{}')), product));
  // The e-mail: for *@communautesurlaroute.com addresses the raw message is
  // readable from the SES store, so the walk can follow the real one-tap
  // link (--magic) or type the real code.
  let codeArg = process.env.CODE;
  let magic = null;
  if (!codeArg && /@communautesurlaroute.com$/.test(email)) {
    const { waitForMail } = require('./csr-mail.cjs');
    const mail = await waitForMail(email, { subjectWord: 'code', timeoutMs: 120000 });
    console.log('mail:', mail ? { subject: mail.subject, code: mail.code, links: mail.links } : 'not found');
    if (mail) { codeArg = mail.code; magic = (mail.links || []).find((l) => /ml=/.test(l)) || null; }
  }
  if (!codeArg && !magic) { console.log('No code/link: stopping at the code step.'); await browser.close(); return; }
  if (process.argv.includes('--magic') && magic) {
    // Same device, same browser: the draft is in localStorage. The link
    // points at the LIVE domain; rewrite it to the local copy under test.
    const u = new URL(magic);
    const local = base + u.pathname + u.search;
    console.log('opening one-tap link on the local copy:', local.replace(/ml=[^&]+/, 'ml=…'));
    await page.goto(local);
  } else {
    await page.fill('#wl-es-code-input', codeArg);
    await page.click('#wl-es-code-form .wl-btn');
  }
  await page.waitForTimeout(2500);
  await shot(page, 'after-signin');
  console.log('page says:', ((await page.textContent('#wl-form-error').catch(() => '')) + ' | ' + (await page.textContent('#wl-es-code-msg').catch(() => ''))).trim());
  if (generate) {
    await page.waitForSelector('#wl-progress:not(.wl-hidden)', { timeout: 20000 });
    await page.waitForTimeout(4000);
    await shot(page, 'progress');
    await page.waitForSelector('#wl-result:not(.wl-hidden), #wl-form-error .wl-alert', { timeout: 240000 });
    await page.waitForTimeout(500);
    await shot(page, 'result');
    console.log('result text:', ((await page.textContent('#wl-result').catch(() => '')) || (await page.textContent('#wl-form-error'))).replace(/\s+/g, ' ').slice(0, 400));
  }
  await browser.close();
})().catch(async (e) => { console.error(String(e.message).slice(0, 300)); process.exit(1); });
