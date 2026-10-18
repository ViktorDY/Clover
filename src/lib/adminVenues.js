// Venue (bookable facility) settings managed from the admin portal. Stored in
// localStorage under the same key as the design so the booking page can read it.

const KEY = 'kretz-venues-v1';

function defaults() {
  return {
    vif: {
      hours: { 0: ['16:00', '22:00'], 1: ['16:00', '22:00'], 2: ['16:00', '22:00'], 3: ['16:00', '22:00'], 4: ['16:00', '21:00'], 5: ['09:00', '18:00'], 6: ['10:00', '18:00'] },
      closed: {}, price: 320, memberPrice: 180, slotMin: 60, maxHours: 2, leadDays: 14, note: '', cancelHours: 2, about: '', includes: [], unavailable: [] },
    fana: {
      hours: { 0: ['16:00', '22:00'], 1: ['16:00', '22:00'], 2: ['16:00', '22:00'], 3: ['16:00', '22:00'], 4: ['16:00', '21:00'], 5: ['09:00', '18:00'], 6: ['10:00', '18:00'] },
      closed: {}, price: 450, memberPrice: 250, slotMin: 60, maxHours: 2, leadDays: 14, note: '', cancelHours: 2, about: '', includes: [], unavailable: [] },
    bordtennis: {
      hours: { 0: ['10:00', '22:00'], 1: ['10:00', '22:00'], 2: ['10:00', '22:00'], 3: ['10:00', '22:00'], 4: ['10:00', '22:00'], 5: ['10:00', '20:00'], 6: ['10:00', '20:00'] },
      closed: {}, price: 120, memberPrice: 60, slotMin: 60, maxHours: 3, leadDays: 14, note: '', cancelHours: 2, about: '', includes: [], unavailable: [] },
    tennis: {
      hours: { 0: ['07:00', '23:00'], 1: ['07:00', '23:00'], 2: ['07:00', '23:00'], 3: ['07:00', '23:00'], 4: ['07:00', '23:00'], 5: ['08:00', '22:00'], 6: ['08:00', '22:00'] },
      closed: {}, price: 280, memberPrice: 160, slotMin: 60, maxHours: 2, leadDays: 14, note: '', cancelHours: 2, about: '', includes: [], unavailable: [] },
    biljard: {
      hours: { 0: ['12:00', '23:00'], 1: ['12:00', '23:00'], 2: ['12:00', '23:00'], 3: ['12:00', '23:00'], 4: ['12:00', '01:00'], 5: ['12:00', '01:00'], 6: ['12:00', '22:00'] },
      closed: {}, price: 160, memberPrice: 90, slotMin: 60, maxHours: 3, leadDays: 14, note: '', cancelHours: 2, about: '', includes: [], unavailable: [] }
  };
}

function load() {
  try {
    let raw = window.localStorage.getItem(KEY);
    if (raw) { let d = JSON.parse(raw); if (d && typeof d === 'object') return merge(defaults(), d); }
  } catch { /* storage unavailable */ }
  return defaults();
}

function merge(base, over) {
  Object.keys(over).forEach(function (k) { base[k] = Object.assign({}, base[k] || {}, over[k]); });
  return base;
}

function save(data) {
  try { window.localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* storage unavailable */ }
  try { window.dispatchEvent(new CustomEvent('kretz-venues', { detail: data })); } catch { /* storage unavailable */ }
}

function reset() {
  try { window.localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
  let d = defaults();
  try { window.dispatchEvent(new CustomEvent('kretz-venues', { detail: d })); } catch { /* storage unavailable */ }
  return d;
}

function subscribe(fn) {
  let onStorage = function (e) { if (!e || e.key === KEY || e.key === null) fn(load()); };
  let onLocal = function () { fn(load()); };
  window.addEventListener('storage', onStorage);
  window.addEventListener('kretz-venues', onLocal);
  return function () { window.removeEventListener('storage', onStorage); window.removeEventListener('kretz-venues', onLocal); };
}

// helpers
function toMin(t) { let p = String(t || '0:0').split(':'); let m = parseInt(p[0], 10) * 60 + parseInt(p[1], 10); return isNaN(m) ? 0 : m; }
function hoursFor(v, weekday) { let h = (v && v.hours && v.hours[weekday]) || null; return h && h[0] && h[1] ? h : null; }
function isClosed(v, iso) { return !!(v && v.closed && v.closed[iso]); }
function canBook(v, time, isMember) {
  if (!v) return true;
  let aud = v.audience || 'all';
  if (aud === 'members') return !!isMember;
  if (aud === 'window' && v.memberWindow && time) {
    let t = toMin(time), a = toMin(v.memberWindow[0]), b = toMin(v.memberWindow[1]);
    if (t >= a && t < b) return !!isMember;
  }
  return true;
}
function unitAudience(v, n, weekday) { if (weekday != null && ((v && v.dayAudience && v.dayAudience[weekday]) || []).indexOf(n) !== -1) return 'members'; return ((v && v.unitAudience) || {})[n] || 'all'; }
function manualTaken(v, iso, time) {
  let out = [];
  ((v && v.manual) || []).forEach(function (m) { if (m.date === iso && m.time === time) out.push(m.unit); });
  return out;
}
function leadDaysFor(v, isMember) { if (!v) return 14; return isMember && v.memberEarly ? Math.max(30, v.leadDays || 14) : (v.leadDays || 14); }
function unitsOff(v, weekday) { let g = (v && v.unavailable) || []; let d = (v && v.dayUnits && v.dayUnits[weekday]) || []; return g.concat(d.filter(function (n) { return g.indexOf(n) === -1; })); }
function slotsFor(v, weekday, iso) {
  if (!v || isClosed(v, iso)) return [];
  let h = hoursFor(v, weekday);
  if (!h) return [];
  let a = toMin(h[0]), b = toMin(h[1]);
  if (b <= a) b += 24 * 60;
  let step = v.slotMin || 60, out = [];
  for (let m = a; m + step <= b; m += step) {
    let hh = Math.floor((m % 1440) / 60), mm = m % 60;
    out.push(String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0'));
  }
  return out;
}

export const KretzVenues = { KEY, defaults, load, save, reset, subscribe, toMin, hoursFor, isClosed, slotsFor, unitsOff, canBook, unitAudience, manualTaken, leadDaysFor };
