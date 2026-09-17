/* Reads test e-mails sent to *@communautesurlaroute.com: SES stores the raw
   message in the private bucket csr-mail-730335301855/incoming/ (see
   second-brain/06-playbooks/communautesurlaroute-site.md), readable with the
   HEALTHYPLAN_AWS_* keys from the master .env (the account that owns the hub). Used by walk-flow.cjs to fetch the
   sign-in code and the one-tap link without a mailbox. Test addresses only. */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require(path.join(os.homedir(), 'wl-engine', 'node_modules', '@aws-sdk', 'client-s3'));

const env = {};
for (const l of fs.readFileSync(path.join(os.homedir(), '.claude', '.env'), 'utf8').split(/\r?\n/)) { const m = l.match(/^([A-Z0-9_]+)=(.*)$/); if (m) env[m[1]] = m[2].trim().replace(/^"|"$/g, ''); }
const s3 = new S3Client({ region: 'us-east-1', credentials: { accessKeyId: env.HEALTHYPLAN_AWS_ACCESS_KEY_ID, secretAccessKey: env.HEALTHYPLAN_AWS_SECRET_ACCESS_KEY } });
const BUCKET = 'csr-mail-730335301855';

function decode(raw) {
  // quoted-printable + base64 parts are both possible; keep it simple: decode
  // qp soft breaks, then base64 blocks that look like a body part.
  let text = raw.replace(/=\r?\n/g, '').replace(/=([0-9A-F]{2})/g, (m, h) => String.fromCharCode(parseInt(h, 16)));
  const b64 = text.match(/Content-Transfer-Encoding: base64\r?\n\r?\n([A-Za-z0-9+/=\r\n]+)/g) || [];
  for (const block of b64) { const body = block.split(/\r?\n\r?\n/)[1] || ''; try { text += '\n' + Buffer.from(body.replace(/\s/g, ''), 'base64').toString('utf8'); } catch { /* ignore */ } }
  return text;
}

async function latestMailTo(to, { sinceMs = 15 * 60 * 1000, subjectWord = '' } = {}) {
  const list = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: 'incoming/', MaxKeys: 1000 }));
  const recent = (list.Contents || []).filter((o) => Date.now() - new Date(o.LastModified).getTime() < sinceMs).sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
  for (const o of recent) {
    const obj = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: o.Key }));
    const raw = await obj.Body.transformToString('utf8');
    if (!new RegExp('^(To|Delivered-To|X-Original-To):[^\\r\\n]*' + to.replace(/[.+]/g, '\\$&'), 'im').test(raw)) continue;
    const text = decode(raw);
    const subject = (raw.match(/^Subject: (.*)$/m) || ['', ''])[1];
    if (subjectWord && !new RegExp(subjectWord, 'i').test(subject + ' ' + text)) continue;
    const code = (text.match(/(?:code[^\d\r\n]{0,40}|:\s*)(\d{6})\b/i) || text.match(/\b(\d{6})\b/) || ['', ''])[1];
    const links = [...new Set((text.match(/https:\/\/[^\s"<>)]+/g) || []).filter((l) => /ml=|\/plan\//.test(l)))];
    return { key: o.Key, subject, code, links, text: text.slice(0, 3000) };
  }
  return null;
}

async function waitForMail(to, opts = {}) {
  const deadline = Date.now() + (opts.timeoutMs || 120000);
  while (Date.now() < deadline) {
    const m = await latestMailTo(to, opts);
    if (m) return m;
    await new Promise((r) => setTimeout(r, 5000));
  }
  return null;
}

module.exports = { latestMailTo, waitForMail };
if (require.main === module) {
  latestMailTo(process.argv[2], { subjectWord: process.argv[3] || '' }).then((m) => { console.log(JSON.stringify(m ? { key: m.key, subject: m.subject, code: m.code, links: m.links } : null, null, 2)); });
}
