// Verifies fr/en/es key parity in shared/app.js DICT without a bundler.
// Loads app.js in a sandbox with stub browser globals, then inspects the
// module-scoped DICT via a small eval hook exposed on globalThis.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appPath = path.join(__dirname, '..', 'shared', 'app.js');
let src = fs.readFileSync(appPath, 'utf8');

// Expose DICT for inspection: after the IIFE assigns global.WLApp, we can't
// see DICT directly (it's closed over), so patch a temporary export.
src = src.replace('global.WLApp = {', 'global.__DICT__ = DICT; global.WLApp = {');

function FakeStorage() {
  this._d = {};
}
FakeStorage.prototype.getItem = function (k) { return Object.prototype.hasOwnProperty.call(this._d, k) ? this._d[k] : null; };
FakeStorage.prototype.setItem = function (k, v) { this._d[k] = String(v); };
FakeStorage.prototype.removeItem = function (k) { delete this._d[k]; };

const sandbox = {
  window: {},
  location: { search: '', href: 'http://localhost/', hostname: 'localhost', pathname: '/' },
  localStorage: new FakeStorage(),
  document: {
    documentElement: {},
    querySelectorAll: function () { return []; },
    createElement: function () { return { style: {}, addEventListener: function () {} }; },
    head: { appendChild: function () {} }
  },
  URLSearchParams: URLSearchParams,
  URL: URL,
  fetch: function () { return Promise.resolve({ ok: true, json: function () { return Promise.resolve({}); } }); },
  console: console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: 'app.js' });

const DICT = sandbox.__DICT__;
if (!DICT || !DICT.fr || !DICT.en || !DICT.es) {
  console.error('FAIL: DICT missing fr/en/es blocks');
  process.exit(1);
}

const langs = ['fr', 'en', 'es'];
const keySets = {};
langs.forEach(function (l) { keySets[l] = Object.keys(DICT[l]).sort(); });

const allKeys = new Set();
langs.forEach(function (l) { keySets[l].forEach(function (k) { allKeys.add(k); }); });

let ok = true;
allKeys.forEach(function (k) {
  const missing = langs.filter(function (l) { return !Object.prototype.hasOwnProperty.call(DICT[l], k); });
  if (missing.length) {
    ok = false;
    console.error('MISSING key "' + k + '" in: ' + missing.join(', '));
  }
});

// flag empty es values where fr/en are non-empty (placeholder detection)
langs.forEach(function (l) {
  Object.keys(DICT[l]).forEach(function (k) {
    const v = DICT[l][k];
    if (typeof v !== 'string') {
      ok = false;
      console.error('NON-STRING value for "' + k + '" in ' + l);
    }
  });
});

if (!ok) {
  console.error('i18n check FAILED');
  process.exit(1);
}

console.log('i18n check OK: ' + allKeys.size + ' keys, parity across ' + langs.join('/'));
process.exit(0);
