const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/lib/analytics.ts'), 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}}).outputText;
function setup(blocked = false) {
  const values = new Map(), cookies = new Map(), scripts = [];
  const module = {exports: {}};
  const window = {location: new URL('https://www.montebiuro.pl/?utm_source=google&utm_medium=cpc&gclid=click123&gbraid=braid123&wbraid=web123&email=private#secret'), localStorage: Object.fromEntries(['getItem', 'setItem', 'removeItem'].map(method => [method, (key, value) => {
    if (blocked) throw new Error('Storage blocked');
    return method === 'getItem' ? values.get(key) : method === 'setItem' ? values.set(key, value) : values.delete(key);
  }]))};
  const document = {referrer: '', head: {appendChild: script => scripts.push(script)}, createElement: () => ({addEventListener() {}, remove() {}}), querySelectorAll: () => scripts};
  Object.defineProperty(document, 'cookie', {get: () => [...cookies].map(([k,v]) => `${k}=${v}`).join('; '), set: value => {const [key, val] = value.split(';')[0].split('='); if (value.includes('max-age=0')) cookies.delete(key); else cookies.set(key, val);}});
  vm.runInNewContext(source, {module, exports: module.exports, window, document, URL, Date, console});
  const commands = () => JSON.parse(JSON.stringify((window.dataLayer || []).map(value => Array.from(value))));
  return {api: module.exports, window, commands, values, cookies, scripts};
}
for (const [analytics, marketing] of [['denied','denied'], ['granted','denied'], ['denied','granted'], ['granted','granted']]) {
  const s = setup();
  s.api.applyConsent(null);
  assert.equal(s.scripts.length, 0);
  s.api.applyConsent(s.api.saveConsent(analytics, marketing));
  assert.equal(s.scripts.length, analytics === 'granted' || marketing === 'granted' ? 1 : 0);
  const cmd = s.commands();
  if (cmd.length) {
    assert.equal(cmd[0][1], 'default');
    assert.ok(Object.values(cmd[0][2]).every(value => value === 'denied'));
    const consent = cmd.find(c => c[1] === 'update')[2];
    assert.equal(consent.analytics_storage, analytics);
    for (const key of ['ad_storage','ad_user_data','ad_personalization']) assert.equal(consent[key], marketing);
  }
  const location = s.api.sanitizePageLocation(s.window.location.href);
  assert.ok(location.includes('utm_medium=cpc'));
  for (const key of ['gclid','gbraid','wbraid']) assert.equal(location.includes(key), marketing === 'granted');
  assert.ok(!location.includes('private') && !location.includes('secret'));
  assert.equal(s.api.trackPageView({path: '/', href: s.window.location.href, title: 'Test'}), analytics === 'granted');
  assert.equal(s.api.trackPageView({path: '/', href: s.window.location.href, title: 'Test'}), false);
  s.api.trackEvent('generate_lead', {component: 'contact'});
  s.api.trackEvent('click_phone', {component: 'header'});
  s.api.trackEvent('click_email', {component: 'footer'});
  const events = s.commands().filter(c => c[0] === 'event').map(c => c[1]);
  assert.equal(events.includes('generate_lead'), analytics === 'granted' || marketing === 'granted');
  assert.equal(events.includes('click_phone'), analytics === 'granted' || marketing === 'granted');
  assert.equal(events.includes('click_email'), analytics === 'granted');
  s.cookies.set('_ga', 'test'); s.cookies.set('_gcl_aw', 'test');
  s.api.withdrawConsent();
  assert.equal(s.api.getMeasurementState(), 0);
  assert.equal(s.api.readConsent(), null);
  assert.equal(s.cookies.size, 0);
  assert.equal(s.window['ga-disable-G-2GL77N6KWP'], true);
  assert.ok(!s.commands().some(c => c[0] === 'event'), 'Pending events must be discarded after withdrawal');
}
const s = setup();
s.api.applyConsent(s.api.saveConsent('granted', 'granted'));
s.api.trackEvent('generate_lead', {component: 'contact'});
s.api.applyConsent(s.api.saveConsent('granted', 'denied'));
assert.ok(!s.commands().some(c => JSON.stringify(c).includes('click123')), 'Revoked marketing IDs must not remain queued');
assert.equal(s.api.readConsent(Date.now() + 181 * 86400000), null);
s.values.set(s.api.CONSENT_STORAGE_KEY, JSON.stringify({v: 2, analytics: 'granted', decidedAt: new Date().toISOString()}));
assert.equal(s.api.readConsent(), null);
const blocked = setup(true);
blocked.api.saveConsent('denied', 'granted');
assert.equal(blocked.api.readConsent().marketing, 'granted');
blocked.api.withdrawConsent();
assert.equal(blocked.api.readConsent(), null);
console.log('PASS all four consent choices, click IDs, events, revocation, pending queue, expiry, legacy records, blocked storage');
