/* Local mock of the wl-engine backend contract, for verifying the consumer
   front-end (Task 15a) without the real backend. NOT deployed — lives outside
   the static site tree conceptually but kept in _scripts/ so it never ships. */
const http = require('http');

function send(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { resolve({}); }
    });
  });
}

const SPONSORS = [
  { id: 's1', name: 'Gym du Coin', logo_url: '', message: 'Fier partenaire de votre santé.', product: 'coach', active: true },
  { id: 's2', name: 'Marché Local', logo_url: '', message: 'Manger bien, dépenser moins.', product: 'panier', active: true }
];

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3011');
  const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'fr';
  const partner = url.searchParams.get('partner') || 'GYMBRO';

  if (req.method === 'OPTIONS') return send(res, 200, {});

  if (url.pathname === '/config') {
    const isPanier = partner === 'PANIER';
    return send(res, 200, {
      code: partner,
      type: isPanier ? 'panier' : 'coach',
      name: isPanier ? 'Panier' : 'GymBro',
      tagline: lang === 'en'
        ? (isPanier ? 'The perfect grocery basket for your budget.' : 'Your pocket coach, built for you.')
        : (isPanier ? "Le panier d'épicerie parfait pour votre budget." : 'Votre coach de poche, fait pour vous.'),
      colors: { primary: '#1a2744', accent: '#ff7a1a', dark: '#0d1526' },
      billing_mode: 'member',
      member_price_label: lang === 'en' ? '$9.99/month' : '9,99 $/mois',
      sponsors_enabled: true,
      products: [isPanier ? 'panier' : 'coach'],
      contact_email: 'info@centremedicalfont.ca'
    });
  }

  if (url.pathname === '/sponsors') {
    const product = url.searchParams.get('product') || 'coach';
    return send(res, 200, { sponsors: SPONSORS.filter((s) => s.product === product && s.active) });
  }

  if (url.pathname === '/me' && req.method === 'GET') {
    const free = !req.headers.authorization || req.headers.authorization.includes('free');
    return send(res, 200, {
      user: { email: 'demo@example.com' },
      tier: free ? 'free' : 'member',
      tier_until: null,
      limits: free ? { perMonth: 1 } : { perDay: 3 },
      remaining: free ? { month: 1 } : { today: 3 },
      billing_mode: 'member'
      // member_price_label lives on /config only, per contract — not duplicated here.
    });
  }

  if (url.pathname === '/me/preferences' && req.method === 'POST') {
    const body = await readBody(req);
    return send(res, 200, { user: { language: body.language || 'fr' } });
  }

  if (url.pathname === '/auth/google' && req.method === 'POST') {
    return send(res, 200, { token: 'member-demo-token', user: { email: 'demo@example.com' } });
  }

  if (url.pathname === '/billing/checkout' && req.method === 'POST') {
    return send(res, 200, { url: 'https://checkout.stripe.com/pay/mock_session' });
  }

  if (url.pathname === '/billing/portal' && req.method === 'POST') {
    return send(res, 200, { url: 'https://billing.stripe.com/p/mock_portal' });
  }

  if (url.pathname === '/plans') return send(res, 200, { plans: [] });

  if (url.pathname === '/coach/profile' && req.method === 'POST') return send(res, 200, { ok: true });
  if (url.pathname === '/coach/generate' && req.method === 'POST') return send(res, 200, { pdf_url: '#' });
  if (url.pathname === '/panier/generate' && req.method === 'POST') return send(res, 200, { pdf_url: '#' });

  if (url.pathname === '/admin/sponsors') {
    return send(res, 200, { sponsors: SPONSORS });
  }
  if (url.pathname === '/admin/state') {
    return send(res, 200, { partners: [{ code: 'GYMBRO', name: 'GymBro', type: 'coach', demo: true, billing_active: true, month: { plans: 4, amount_cents: 3996 }, members: 4 }] });
  }
  if (url.pathname === '/admin/finance') return send(res, 200, { months: [], active_subscriptions: 4 });
  if (url.pathname.startsWith('/admin/sponsor')) return send(res, 200, { ok: true });

  send(res, 404, { error: 'not_found' });
});

server.listen(3011, () => console.log('mock backend on :3011'));
