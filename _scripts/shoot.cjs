const { chromium } = require('playwright');
const OUT = "C:/Users/Carlos Faviel Font/.superpowers/sdd/2026-09-03-consumer-editions/site-shots";
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.addInitScript(() => { localStorage.setItem('wl_api', 'http://localhost:3011'); localStorage.setItem('wl_partner', 'GYMBRO'); });
  const shots = [
    ['index-fr', 'http://localhost:8080/index.html?p=GYMBRO&lang=fr'],
    ['index-en', 'http://localhost:8080/index.html?p=GYMBRO&lang=en'],
    ['index-panier-fr', 'http://localhost:8080/index.html?p=PANIER&lang=fr'],
    ['commanditaires-fr', 'http://localhost:8080/commanditaires/index.html?p=GYMBRO&lang=fr'],
    ['commanditaires-en', 'http://localhost:8080/commanditaires/index.html?p=GYMBRO&lang=en'],
    ['coach-fr', 'http://localhost:8080/coach/index.html?p=GYMBRO&lang=fr'],
    ['panier-fr', 'http://localhost:8080/panier/index.html?p=PANIER&lang=fr'],
    ['admin-fr', 'http://localhost:8080/admin/index.html?lang=fr']
  ];
  for (const [name, url] of shots) {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(400);
      await page.screenshot({ path: OUT + '/' + name + '.png', fullPage: true });
      console.log('OK', name);
    } catch (e) {
      console.log('FAIL', name, e.message);
    }
  }
  await browser.close();
})();
