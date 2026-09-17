/* Deletes fictional test accounts through POST /admin/member/delete.
     node _scripts/delete-test-member.cjs GYMBRO info+uxgymbro3@communautesurlaroute.com [...more emails] */
const fs = require('fs'); const os = require('os'); const path = require('path');
const env = {}; for (const l of fs.readFileSync(path.join(os.homedir(), '.claude', '.env'), 'utf8').split(/\r?\n/)) { const m = l.match(/^([A-Z0-9_]+)=(.*)$/); if (m) env[m[1]] = m[2].trim().replace(/^"|"$/g, ''); }
const [partner, ...emails] = process.argv.slice(2);
(async () => { for (const email of emails) { if (!/^info\+ux|@example\.|^ux-/.test(email)) { console.log('refusing non-test address', email); continue; } const r = await fetch('https://api.healthyplan.ca/admin/member/delete', { method: 'POST', headers: { 'content-type': 'application/json', 'x-admin-code': env.WL_ADMIN_CODE }, body: JSON.stringify({ partner_code: partner, email }) }); console.log(email, r.status, (await r.text()).slice(0, 120)); } })();
