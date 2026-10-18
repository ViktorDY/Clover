/* eslint-disable no-unused-vars, no-empty */
// Controller for the administrator portal. Ported from the design's logic
// class: it holds the portal's state and, on every render, derives the flat
// object of labels, styles and handlers that the admin components read as `v`.
import { KretzTimetable } from "./adminTimetable";
import { KretzVenues } from "./adminVenues";
import {
  clubs,
  baseActs,
  basePosts,
  members,
  agreementText,
  bankAccounts,
  boardDecisions,
  boardMembers,
  budgetLines,
  demoMembers,
  documents,
  expenseCategories,
  focusList,
  grantInfo,
  grantSources,
  incomeCategories,
  integrationDefs,
  payments,
  planningItems,
  resultSeries,
  roleDefs,
  rowSets,
  seasonCategories,
  sponsorAgreements,
  transactions,
  txCategories,
  txParties,
  txWords,
  venues,
  volunteerDays,
  yearPlan,
} from "./adminData";

// Minimal stand-in for the design runtime's base class: synchronous merge,
// then ask React to re-render.
class LogicBase {
  constructor(host) {
    this.__host = host;
    this.__callbacks = [];
    this.props = {};
  }

  attach(host) {
    this.__host = host;
  }

  setState(update, cb) {
    const prev = this.state;
    const patch = typeof update === "function" ? update(prev) : update;
    if (patch) this.state = { ...prev, ...patch };
    if (cb) this.__callbacks.push(cb);
    if (this.__host) this.__host(patch || {});
  }

  forceUpdate() {
    if (this.__host) this.__host({});
  }

  flushCallbacks() {
    const cbs = this.__callbacks;
    this.__callbacks = [];
    cbs.forEach((cb) => cb());
  }

  // The flat object the admin components render, in the given language.
  view(lang) {
    if (this.state.lang !== lang) this.state = { ...this.state, lang };
    return this.renderVals();
  }
}

export class AdminLogic extends LogicBase {
  state = {
    lang: 'no', club: 'all', tab: 'activities', navMenu: '', grantOpen: -1, sponsorOpen: -1, agreementFor: -1, sponsorFiles: null, sponsorMenu: -1, meetQ: '', meetSent: null, formFiles: [], payPaid: {}, payExtra: [], meetings: null, meetingForm: null, decDone: {}, meetingOpenId: '', meetingFiles: {}, roleFilter: '', roleQ: '', roleAssign: null, raName: '', raRole: 'coach', raClub: 'vif', raMsg: '', spCal: false, spCalMonth: (new Date().getFullYear() === 2026 ? new Date().getMonth() + 1 : 9), spCalPick: 0, confirmInactive: -1, inactiveSponsors: {}, extraSponsors: [], newSponsor: null, ttClub: '', venClub: '', venDraft: null, venSaved: '', venCloseDate: '', venIncDraft: '', venDay: -1, bcMonth: 9, bcDay: '', bcPanel: false, mbDate: '', mbTime: '18:00', mbUnit: 1, mbName: '', mbNote: '', mbSaved: '', ttEdit: null, ttDrag: null, ttDraft: null, ttGroupDraft: '', ttSaved: '', ttTick: 0, tfPeriod: 'month', tfPageSize: 50, tfPage: 0, exportOpen: false, kpiPanel: false, resHover: -1, tfFrom: '2026-08-01', tfTo: '2026-09-24', tfQ: '', compose: false, composeKind: 'activity', composeDone: false,
    memQ: '', member: '', guardian: '', hover: -1, smsSent: '', bulkSms: 0, bulkSmsAt: '', memGroup: 'all', signups: {}, msgTo: 'club', msgText: '', sentMsgs: [], calMonth: (new Date().getFullYear() === 2026 ? new Date().getMonth() + 1 : 9), calPick: 0, calEntries: [], calAdd: false, ceTitle: '', ceTime: '18:00', ceNote: '', ceShare: [], ceSent: '', formTitle2: '', postTo: 'club', actDone: false, postDone: false, memPeriod: 'month', notes: {}, noteDraft: '', invScope: 'club', invTarget: 'vif', invTitle: '', invAmount: '', invDue: '2026-10-01', invSent: false,
    formClub: 'vif', formTitle: '', formDate: '2026-09-20', formTime: '18:00',
    formPlace: '', formLeader: '', formCap: '20', formText: '', formHigh: false,
    actsOpen: false, postsOpen: false,
    formDeadline: '2026-09-18', formInternal: '', formTo: [], event: '', answerFilter: 'all',
    newActs: [], newPosts: []
  };

  componentDidMount() {
    const hook = () => {
      if (!KretzTimetable) return false;
      this._ttUnsub = KretzTimetable.subscribe(() => this.setState(st => ({ ttTick: st.ttTick + 1 })));
      if (KretzVenues) this._venUnsub = KretzVenues.subscribe(() => this.setState(st => ({ ttTick: st.ttTick + 1 })));
      this.setState(st => ({ ttTick: st.ttTick + 1 }));
      return true;
    };
    if (!hook()) this._ttPoll = setInterval(() => { if (hook()) { clearInterval(this._ttPoll); this._ttPoll = null; } }, 150);
  }

  componentWillUnmount() {
    if (this._ttUnsub) this._ttUnsub();
    if (this._venUnsub) this._venUnsub();
    if (this._ttPoll) clearInterval(this._ttPoll);
    if (this._ttSavedT) clearTimeout(this._ttSavedT);
  }

  ttData() {
    const src = this.state.ttDraft || (KretzTimetable ? KretzTimetable.load() : { vif: { groups: [], s: [] }, fana: { groups: [], s: [] }, varden: { groups: [], s: [] } });
    return JSON.parse(JSON.stringify(src));
  }

  ttCommit(data, msg) {
    if (this._ttSavedT) clearTimeout(this._ttSavedT);
    this.setState({ ttDraft: data, ttSaved: msg, ttEdit: null });
    this._ttSavedT = setTimeout(() => this.setState({ ttSaved: '' }), 4000);
  }

  makePdf(title, lines) {
    const map = { 'æ': '\\346', 'ø': '\\370', 'å': '\\345', 'Æ': '\\306', 'Ø': '\\330', 'Å': '\\305', 'é': '\\351', '–': '\\226', '—': '\\227', '×': '\\327', '«': '\\253', '»': '\\273', '·': '\\267', '’': '\\222', '%': '%' };
    const esc = (t) => String(t).replace(/[\\()]/g, m => '\\' + m).replace(/[æøåÆØÅé–—×«»·’]/g, c => map[c] || '?').replace(/[^\x20-\x7e\\]/g, '?');
    const wrap = (t, n) => { const out = []; String(t).split('\n').forEach(par => { let line = ''; par.split(' ').forEach(w => { if ((line + ' ' + w).trim().length > n) { out.push(line.trim()); line = w; } else line += ' ' + w; }); out.push(line.trim()); }); return out; };
    let y = 790;
    let body = 'BT /F2 18 Tf 56 ' + y + ' Td (' + esc(title) + ') Tj ET\n';
    y -= 30;
    lines.forEach(item => {
      const isHead = item && item.h;
      const txt = isHead ? item.h : item;
      wrap(txt, isHead ? 60 : 88).forEach(l => {
        if (y < 60) return;
        body += 'BT /' + (isHead ? 'F2 12' : 'F1 10.5') + ' Tf 56 ' + y + ' Td (' + esc(l) + ') Tj ET\n';
        y -= isHead ? 18 : 15;
      });
      if (isHead) y -= 2; else y -= 3;
    });
    const objs = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
      '<< /Length ' + body.length + ' >>\nstream\n' + body + 'endstream'
    ];
    let pdf = '%PDF-1.4\n';
    const offs = [];
    objs.forEach((o, i) => { offs.push(pdf.length); pdf += (i + 1) + ' 0 obj\n' + o + '\nendobj\n'; });
    const xref = pdf.length;
    pdf += 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + offs.map(o => String(o).padStart(10, '0') + ' 00000 n \n').join('');
    pdf += 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';
    const bytes = new Uint8Array(pdf.length);
    for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 255;
    return URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
  }

  clubs() {
    return clubs();
  }

  baseActs(en) {
    return baseActs(en);
  }

  basePosts(en) {
    return basePosts(en);
  }

  members(en) {
    return members(en);
  }

  groupsOf(slug, en) {
    return this.members(en).filter(m => m.club === slug).map(m => m.group).filter((g, i, a) => a.indexOf(g) === i);
  }

  smoothPath(pts) {
    if (!pts.length) return '';
    if (pts.length < 3) return 'M ' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
    let d = 'M ' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const t = 0.2;
      const c1x = p1[0] + (p2[0] - p0[0]) * t, c1y = p1[1] + (p2[1] - p0[1]) * t;
      const c2x = p2[0] - (p3[0] - p1[0]) * t, c2y = p2[1] - (p3[1] - p1[1]) * t;
      d += ' C ' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ', ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ', ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    return d;
  }

  series(seed, base, n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const wob = Math.sin((i + seed) * 1.1) * 0.22 + Math.cos((i + seed) * 0.7) * 0.14;
      out.push(Math.max(0, Math.round(base * (1 + wob) * 10) / 10));
    }
    return out;
  }

  qrMatrix(text) {
    const bytes = Array.from(unescape(encodeURIComponent(text))).map(ch => ch.charCodeAt(0));
    const caps = [17, 32, 53, 78, 106, 134], total = [26, 44, 70, 100, 134, 172], ecc = [7, 10, 15, 20, 26, 18], blocksN = [1, 1, 1, 1, 1, 2], align = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34]];
    let ver = caps.findIndex(c => c >= bytes.length); if (ver < 0) ver = 5;
    const size = 17 + 4 * (ver + 1), dataCw = total[ver] - ecc[ver] * blocksN[ver];
    const bits = []; const put = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
    put(4, 4); put(bytes.length, 8); bytes.forEach(b => put(b, 8));
    for (let i = 0; i < 4 && bits.length < dataCw * 8; i++) bits.push(0);
    while (bits.length % 8) bits.push(0);
    for (let pad = 0xEC; bits.length < dataCw * 8; pad ^= 0xEC ^ 0x11) put(pad, 8);
    const data = []; for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(''), 2));
    const mul = (x, y) => { let z = 0; for (let i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11D); z ^= ((y >>> i) & 1) * x; } return z; };
    const d = ecc[ver], gen = new Array(d).fill(0); gen[d - 1] = 1; let root = 1;
    for (let i = 0; i < d; i++) { for (let j = 0; j < d; j++) { gen[j] = mul(gen[j], root); if (j + 1 < d) gen[j] ^= gen[j + 1]; } root = mul(root, 2); }
    const rs = (blk) => { const r = new Array(d).fill(0); blk.forEach(b => { const f = b ^ r.shift(); r.push(0); gen.forEach((g, i) => { r[i] ^= mul(g, f); }); }); return r; };
    const nb = blocksN[ver], shortN = nb - total[ver] % nb, shortLen = Math.floor(total[ver] / nb), blocks = []; let k = 0;
    for (let i = 0; i < nb; i++) { const len = shortLen - d + (i < shortN ? 0 : 1); const dat = data.slice(k, k + len); k += len; const e = rs(dat); if (i < shortN) dat.push(0); blocks.push(dat.concat(e)); }
    const cw = []; for (let i = 0; i < blocks[0].length; i++) blocks.forEach((b, j) => { if (i !== shortLen - d || j >= shortN) cw.push(b[i]); });
    const mod = Array.from({ length: size }, () => new Array(size).fill(false)), fn = Array.from({ length: size }, () => new Array(size).fill(false));
    const setF = (x, y, dark) => { if (x >= 0 && x < size && y >= 0 && y < size) { mod[y][x] = dark; fn[y][x] = true; } };
    for (let i = 0; i < size; i++) { setF(6, i, i % 2 === 0); setF(i, 6, i % 2 === 0); }
    [[3, 3], [size - 4, 3], [3, size - 4]].forEach(p => { for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const dist = Math.max(Math.abs(dx), Math.abs(dy)); setF(p[0] + dx, p[1] + dy, dist !== 2 && dist !== 4); } });
    const ap = align[ver]; ap.forEach((a, i) => ap.forEach((b, j) => { if ((i === 0 && j === 0) || (i === 0 && j === ap.length - 1) || (i === ap.length - 1 && j === 0)) return; for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setF(a + dx, b + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }));
    let rem = 1 << 3 | 0; const fdata = rem; rem = fdata; for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const fb = ((fdata << 10) | rem) ^ 0x5412, bit = (i) => ((fb >>> i) & 1) !== 0;
    for (let i = 0; i <= 5; i++) setF(8, i, bit(i)); setF(8, 7, bit(6)); setF(8, 8, bit(7)); setF(7, 8, bit(8)); for (let i = 9; i < 15; i++) setF(14 - i, 8, bit(i));
    for (let i = 0; i < 8; i++) setF(size - 1 - i, 8, bit(i)); for (let i = 8; i < 15; i++) setF(8, size - 15 + i, bit(i)); setF(8, size - 8, true);
    let idx = 0;
    for (let right = size - 1; right >= 1; right -= 2) { if (right === 6) right = 5; for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) { const x = right - j, up = ((right + 1) & 2) === 0, y = up ? size - 1 - vert : vert; if (!fn[y][x] && idx < cw.length * 8) { mod[y][x] = ((cw[idx >>> 3] >>> (7 - (idx & 7))) & 1) !== 0; idx++; } } }
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fn[y][x] && (x + y) % 2 === 0) mod[y][x] = !mod[y][x];
    return { size: size, mod: mod };
  }

  adminVolVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]), set = (o) => this.setState(o);
    const fd = (iso) => { const p = iso.split('-'); return p[2] + '.' + p[1] + '.' + p[0]; };
    const base = volunteerDays(en);
    const items = base.concat(v('vgNew', [])).filter(g => c.all || g.club === c.sel);
    const today = '2026-10-15';
    const selId = items.some(g => g.id === v('vgSel', '')) ? v('vgSel', '') : (items[0] ? items[0].id : '');
    const sel = items.find(g => g.id === selId);
    const scans = v('vgScans', {}), ok = v('vgOk', {}), hrsOv = v('vgHrs', {}), tok = v('vgTok', {});
    const peopleOf = (g) => g.people.map((p, i) => ({ id: g.id + ':' + i, name: p[0], in: p[1], h: p[2], ok: p[3] })).concat((scans[g.id] || []).map((p, i) => ({ id: g.id + ':s' + i, name: p[0], in: p[1], h: p[2], ok: false }))).map(p => Object.assign({}, p, { h: hrsOv[p.id] !== undefined ? hrsOv[p.id] : p.h, ok: ok[p.id] !== undefined ? ok[p.id] : p.ok }));
    const sumOf = (g) => { const ps = peopleOf(g); const hh = ps.reduce((n, p) => n + p.h, 0); return ps.length + (en ? ' volunteers · ' : ' frivillige · ') + hh + (en ? ' hours' : ' timer'); };
    const pad = (n) => String(n).padStart(2, '0');
    const now = () => { const t = new Date(); return pad(t.getHours()) + ':' + pad(t.getMinutes()); };
    const url = sel ? 'https://kretz.no/dugnad/' + sel.id + '?k=' + (tok[sel.id] || 1) + 'x' + sel.id.length + sel.name.length : '';
    let qrD = '', qrView = '0 0 10 10';
    if (sel) { const q = this.qrMatrix(url); qrView = '-4 -4 ' + (q.size + 8) + ' ' + (q.size + 8); const parts = []; for (let y = 0; y < q.size; y++) for (let x = 0; x < q.size; x++) if (q.mod[y][x]) parts.push('M' + x + ' ' + y + 'h1v1h-1z'); qrD = parts.join(''); }
    const people = sel ? peopleOf(sel) : [];
    const confirmed = people.filter(p => p.ok);
    const pill = (g) => { const past = g.date < today, isToday = g.date === today; return 'padding: 4px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; ' + (isToday ? 'background: rgba(116,205,133,.4); color: #16241a;' : (past ? 'background: rgba(22,36,26,.08); color: rgba(22,36,26,.7);' : 'background: #fff4cf; color: #6b4a00;')); };
    const statusOf = (g) => g.date === today ? (en ? 'Today' : 'I dag') : (g.date < today ? (en ? 'Finished' : 'Avsluttet') : (en ? 'Planned' : 'Planlagt'));
    const dl = (name, type, content) => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type: type })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); };
    const svgDoc = () => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + qrView + '" width="640" height="640"><rect x="-4" y="-4" width="200" height="200" fill="#fff"/><path d="' + qrD + '" fill="#16241a"/></svg>';
    return {
      tVgTitle: en ? 'Volunteer days' : 'Dugnader', tVgIntro: en ? 'Volunteers scan a QR code on arrival. Kretz registers attendance and hours, which the person in charge can confirm and use to document volunteer effort.' : 'Frivillige skanner en QR-kode ved oppmøte. Kretz registrerer deltakelse og timer, som kan bekreftes av ansvarlig og brukes til å dokumentere dugnadsinnsats.',
      tVgNew: en ? 'New volunteer day' : 'Ny dugnad', tVgName: en ? 'Name' : 'Navn', tVgDate: en ? 'Date' : 'Dato', tVgTime: en ? 'Start' : 'Start', tVgPlace: en ? 'Place' : 'Sted', tVgLead: en ? 'Responsible' : 'Ansvarlig', tVgHours: en ? 'Hours per person' : 'Timer per person', tVgCreate: en ? 'Create and generate QR' : 'Opprett og lag QR-kode',
      vgFormOpen: !!v('vgForm', false), vgToggleForm: () => set({ vgForm: !v('vgForm', false) }),
      vgName: v('vgName', ''), vgDate: v('vgDate', '2026-11-14'), vgTime: v('vgTime', '10:00'), vgPlace: v('vgPlace', ''), vgLead: v('vgLead', ''), vgHours: v('vgHours', '3'),
      onVgName: (e) => set({ vgName: e.target.value }), onVgDate: (e) => set({ vgDate: e.target.value }), onVgTime: (e) => set({ vgTime: e.target.value }), onVgPlace: (e) => set({ vgPlace: e.target.value }), onVgLead: (e) => set({ vgLead: e.target.value }), onVgHours: (e) => set({ vgHours: e.target.value }),
      vgSave: (e) => { e.preventDefault(); const id = 'vn' + Date.now(); set(s2 => ({ vgNew: (s2.vgNew || []).concat([{ id: id, club: c.all ? 'vif' : c.sel, name: v('vgName', ''), date: v('vgDate', '2026-11-14'), time: v('vgTime', '10:00'), place: v('vgPlace', ''), lead: v('vgLead', ''), hrs: parseFloat(v('vgHours', '3')) || 3, people: [] }]), vgSel: id, vgForm: false, vgName: '', vgPlace: '', vgLead: '' })); },
      vgList: items.map(g => ({ key: 'vl' + g.id, name: g.name, status: statusOf(g), pill: pill(g), when: fd(g.date) + ' ' + g.time, place: g.place + (c.all ? ' · ' + c.clubOf(g.club) : ''), sum: sumOf(g), pick: () => set({ vgSel: g.id }),
        style: 'display: block; width: 100%; box-sizing: border-box; padding: 14px 16px; border-radius: 18px; cursor: pointer; font-family: var(--font-body); color: #16241a; transition: border-color .2s; border: 1.5px solid ' + (g.id === selId ? '#1f7a3a' : 'rgba(22,36,26,.12)') + '; background: ' + (g.id === selId ? '#eaf7ed' : '#ffffff') })),
      vgHasSel: !!sel, vgSelName: sel ? sel.name + ' · ' + fd(sel.date) : '', qrD: qrD, qrView: qrView, qrText: url, tVgQrAlt: en ? 'QR code for check-in' : 'QR-kode for oppmøte',
      tVgQrHelp: en ? 'Put this code up at the entrance. Volunteers scan it with their phone to check in.' : 'Heng opp koden ved inngangen. Frivillige skanner den med mobilen for å registrere oppmøte.',
      tVgPrint: en ? 'Print' : 'Skriv ut', tVgDownload: en ? 'Download' : 'Last ned', tVgRenew: en ? 'New code' : 'Ny kode',
      vgPrint: () => { const w = window.open('', '_blank'); if (!w) return; w.document.write('<title>' + sel.name + '</title><body style="font-family:sans-serif;text-align:center;padding:40px"><h1>' + sel.name + '</h1><p>' + fd(sel.date) + ' ' + sel.time + ' · ' + sel.place + '</p>' + svgDoc().replace('width="640" height="640"', 'width="480" height="480"') + '<p>' + (en ? 'Scan to check in' : 'Skann for å registrere oppmøte') + '</p></body>'); w.document.close(); setTimeout(() => w.print(), 300); },
      vgDownload: () => dl('dugnad-qr-' + sel.id + '.svg', 'image/svg+xml', svgDoc()),
      vgRenew: () => set({ vgTok: Object.assign({}, tok, { [selId]: (tok[selId] || 1) + 1 }) }),
      tVgAttend: en ? 'Attendance and hours' : 'Oppmøte og timer', vgTotals: people.length + (en ? ' checked in · ' : ' registrert · ') + confirmed.length + (en ? ' confirmed · ' : ' bekreftet · ') + people.reduce((n, p) => n + p.h, 0) + (en ? ' hours' : ' timer') + (en ? ' (' : ' (') + confirmed.reduce((n, p) => n + p.h, 0) + (en ? ' confirmed)' : ' bekreftet)'),
      tVgSimulate: en ? 'Simulate scan' : 'Simuler skanning', tVgConfirmAll: en ? 'Confirm all' : 'Bekreft alle', tVgExport: en ? 'Export documentation' : 'Eksporter dokumentasjon',
      tVgPerson: en ? 'Volunteer' : 'Frivillig', tVgIn: en ? 'Checked in' : 'Inn', tVgHrs: en ? 'Hours' : 'Timer', tVgStatus: 'Status', tVgNoPeople: en ? 'No one has checked in yet.' : 'Ingen har registrert oppmøte ennå.', vgNoPeople: people.length === 0,
      vgSimulate: () => { const names = ['Selma Hauge', 'Jonas Eide', 'Kari Moe', 'Hanne Vik', 'Ola Berg', 'Silje Aas']; const used = people.map(p => p.name); const nm = names.find(n => used.indexOf(n) === -1) || names[Math.floor(Math.random() * names.length)] + ' ' + (people.length + 1); set(s2 => ({ vgScans: Object.assign({}, s2.vgScans || {}, { [selId]: ((s2.vgScans || {})[selId] || []).concat([[nm, now(), sel.hrs]]) }) })); },
      vgConfirmAll: () => set(s2 => ({ vgOk: Object.assign({}, s2.vgOk || {}, people.reduce((o, p) => { o[p.id] = true; return o; }, {})) })),
      vgExport: () => { const qv = (x) => '"' + String(x).replace(/"/g, '""') + '"'; const rows = [[en ? 'Volunteer' : 'Frivillig', en ? 'Day' : 'Dugnad', en ? 'Date' : 'Dato', en ? 'Checked in' : 'Inn', en ? 'Hours' : 'Timer', en ? 'Confirmed' : 'Bekreftet']].concat(people.map(p => [p.name, sel.name, sel.date, p.in, p.h, p.ok ? (en ? 'Yes' : 'Ja') : (en ? 'No' : 'Nei')])); dl('dugnadstimer-' + sel.id + '.csv', 'text/csv;charset=utf-8', '\ufeff' + rows.map(r => r.map(qv).join(';')).join('\n')); },
      vgPeople: people.map(p => ({ key: 'vp' + p.id, name: p.name, in: p.in, hours: String(p.h),
        minus: () => set(s2 => ({ vgHrs: Object.assign({}, s2.vgHrs || {}, { [p.id]: Math.max(0, p.h - 0.5) }) })), plus: () => set(s2 => ({ vgHrs: Object.assign({}, s2.vgHrs || {}, { [p.id]: p.h + 0.5 }) })),
        toggle: () => set(s2 => ({ vgOk: Object.assign({}, s2.vgOk || {}, { [p.id]: !p.ok }) })), btnLabel: p.ok ? (en ? 'Confirmed ✓' : 'Bekreftet ✓') : (en ? 'Confirm' : 'Bekreft'),
        btn: 'padding: 8px 14px; border-radius: 999px; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; ' + (p.ok ? 'border: 0; background: rgba(116,205,133,.4); color: #16241a;' : 'border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a;') }))
    };
  }

  adminDocsVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]), set = (o) => this.setState(o);
    const cats = [['all', en ? 'All' : 'Alle'], ['law', en ? 'Statutes' : 'Vedtekter'], ['minutes', en ? 'Minutes' : 'Referater'], ['acc', en ? 'Accounts' : 'Regnskap'], ['contract', en ? 'Contracts' : 'Avtaler']];
    const catName = (id) => (cats.find(x => x[0] === id) || [0, ''])[1];
    const base = documents();
    const cat = v('dcCat', 'all'), q = (v('dcQ', '') || '').trim().toLowerCase(), del = v('dcDel', {});
    const all = (v('dcNew', [])).concat(base).filter(d => (c.all || d.club === c.sel) && !del[d.id]);
    const rows = all.filter(d => (cat === 'all' || d.cat === cat) && (!q || d.name.toLowerCase().includes(q)));
    const fd = (iso) => { const p = iso.split('-'); return p[2] + '.' + p[1] + '.' + p[0]; };
    const chip = (on) => 'cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; padding: 8px 15px; border-radius: 999px; border: 1px solid ' + (on ? '#16241a' : 'rgba(22,36,26,.16)') + '; background: ' + (on ? '#16241a' : '#ffffff') + '; color: ' + (on ? '#f6f8f3' : '#16241a');
    const hist = (v('dcHist', [])).concat([
      { id: 'h1', text: en ? 'Sigrid Andersen changed the opening hours for Vardenhallen' : 'Sigrid Andersen endret åpningstidene for Vardenhallen', when: en ? 'Today 09:12' : 'I dag 09:12' },
      { id: 'h2', text: en ? 'Silje Aas uploaded "Referat styremøte september"' : 'Silje Aas lastet opp «Referat styremøte september»', when: en ? 'Yesterday 16:40' : 'I går 16:40' },
      { id: 'h3', text: en ? 'New invoice sent to 24 members' : 'Ny faktura sendt til 24 medlemmer', when: en ? 'Yesterday 11:05' : 'I går 11:05' },
      { id: 'h4', text: en ? 'Marit Sunde was given the role Treasurer' : 'Marit Sunde fikk rollen Økonomiansvarlig', when: en ? '2 days ago' : '2 dager siden' },
      { id: 'h5', text: en ? 'Activity "Autumn tournament" created' : 'Aktiviteten «Høstturnering» ble opprettet', when: en ? '4 days ago' : '4 dager siden' },
      { id: 'h6', text: en ? 'Timetable for autumn season saved' : 'Ukeplanen for høstsesongen ble lagret', when: en ? 'Last week' : 'Forrige uke' }
    ]);
    return {
      tDcTitle: en ? 'Documents and history' : 'Dokumenter og historikk', tDcUpload: en ? 'Upload document' : 'Last opp dokument', tDcSearch: en ? 'Search documents' : 'Søk i dokumenter', tDcEmpty: en ? 'No documents match.' : 'Ingen dokumenter matcher.', tHiTitle: en ? 'History' : 'Historikk',
      dcCats: cats.map(o => ({ key: 'dk' + o[0], label: o[1], pick: () => set({ dcCat: o[0] }), style: chip(cat === o[0]) })),
      dcQ: v('dcQ', ''), onDcQ: (e) => set({ dcQ: e.target.value }), dcEmpty: rows.length === 0,
      onDcFiles: (ev) => { const list = Array.from(ev.target.files || []); ev.target.value = ''; if (!list.length) return; const club = c.all ? 'vif' : c.sel; const add = list.map((f, i) => ({ id: 'dn' + Date.now() + i, club: club, name: f.name, cat: cat === 'all' ? 'minutes' : cat, by: 'Sigrid Andersen', when: '2026-10-15', kb: Math.max(1, Math.round((f.size || 0) / 1000)) })); set(s2 => ({ dcNew: add.concat(s2.dcNew || []), dcHist: add.map(a => ({ id: 'hn' + a.id, text: (en ? 'Sigrid Andersen uploaded "' : 'Sigrid Andersen lastet opp «') + a.name + (en ? '"' : '»'), when: en ? 'Just now' : 'Nå nettopp' })).concat(s2.dcHist || []) })); },
      dcRows: rows.map(d => { const ext = (d.name.split('.').pop() || '').toUpperCase().slice(0, 4); return { key: 'dr' + d.id, name: d.name, ext: ext, cat: catName(d.cat) || (en ? 'Other' : 'Annet'), meta: d.by + ' · ' + fd(d.when) + ' · ' + d.kb + ' kB' + (c.all ? ' · ' + c.clubOf(d.club) : ''),
        iconStyle: 'width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; font-size: 10.5px; font-weight: 800; ' + (ext === 'PDF' ? 'background: #fbe9e5; color: #b8240e;' : (/XLS|CSV/.test(ext) ? 'background: #eaf7ed; color: #1f7a3a;' : (/DOC/.test(ext) ? 'background: #e6f0fc; color: #2a5fae;' : 'background: #f3eefc; color: #5a2fa3;'))),
        del: () => set(s2 => ({ dcDel: Object.assign({}, s2.dcDel || {}, { [d.id]: true }) })) }; }),
      hiRows: hist.map(h => ({ key: 'hr' + h.id, text: h.text, meta: h.when }))
    };
  }

  adminPlanVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]), set = (o) => this.setState(o);
    const cols = [['idea', en ? 'Ideas' : 'Idéer', '#f4f8f2', '#b9c9b4'], ['planned', en ? 'Planned' : 'Planlagt', '#fff9e5', '#e8b923'], ['active', en ? 'In progress' : 'Pågår', '#eaf4fb', '#4a90c4'], ['done', en ? 'Done' : 'Ferdig', '#eaf7ed', '#1f7a3a']];
    const base = planningItems(en);
    const items = base.concat(v('plNew', [])).filter(p => c.all || p.club === c.sel).map(p => Object.assign({}, p, { st: (v('plMove', {}))[p.id] || p.st })).filter(p => !(v('plDel', {}))[p.id]);
    const fd = (iso) => { const q = iso.split('-'); return q[2] + '.' + q[1] + '.' + q[0]; };
    const moveTo = (p, k) => set(s2 => ({ plMove: Object.assign({}, s2.plMove || {}, { [p.id]: cols[k][0] }) }));
    return {
      tPlTitle: en ? 'Planning' : 'Planlegging', tPlAdd: en ? 'Add item' : 'Legg til', tPlName: en ? 'Name' : 'Navn', tPlOwner: en ? 'Responsible' : 'Ansvarlig', tPlDate: en ? 'Date' : 'Dato', tPlBack: en ? 'Move back' : 'Flytt tilbake', tPlFwd: en ? 'Move forward' : 'Flytt videre',
      plFormOpen: !!v('plForm', false), plToggleForm: () => set({ plForm: !v('plForm', false) }),
      plName: v('plName', ''), plOwner: v('plOwner', ''), plDate: v('plDate', '2026-11-15'),
      onPlName: (e) => set({ plName: e.target.value }), onPlOwner: (e) => set({ plOwner: e.target.value }), onPlDate: (e) => set({ plDate: e.target.value }),
      plSave: (e) => { e.preventDefault(); set(s2 => ({ plNew: (s2.plNew || []).concat([{ id: 'n' + Date.now(), club: c.all ? 'vif' : c.sel, name: v('plName', ''), owner: v('plOwner', ''), date: v('plDate', '2026-11-15'), st: 'idea' }]), plName: '', plOwner: '', plForm: false })); },
      plCols: cols.map((col, k) => { const list = items.filter(p => p.st === col[0]).sort((a, b) => a.date < b.date ? -1 : 1); return { key: 'pc' + col[0], title: col[1], bg: col[2], dot: col[3], count: list.length, cards: list.map(p => ({ key: 'pp' + p.id, name: p.name, owner: p.owner, date: fd(p.date), club: c.clubOf(p.club), noBack: k === 0, noFwd: k === cols.length - 1, backOp: k === 0 ? .35 : 1, fwdOp: k === cols.length - 1 ? .35 : 1, back: () => k > 0 && moveTo(p, k - 1), fwd: () => k < cols.length - 1 && moveTo(p, k + 1), del: () => set(s2 => ({ plDel: Object.assign({}, s2.plDel || {}, { [p.id]: true }) })) })) }; })
    };
  }

  adminCommsVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]), set = (o) => this.setState(o);
    const vis = c.clubs.filter(cl => c.all || cl.id === c.sel);
    const opts = [];
    vis.forEach(cl => { opts.push({ key: 'ct' + cl.id, id: 'c:' + cl.id, name: cl.name + ' – ' + (en ? 'whole club' : 'hele klubben'), club: cl.id, label: en ? 'Whole club' : 'Hele klubben' }); this.groupsOf(cl.id, en).forEach((g, i) => opts.push({ key: 'ct' + cl.id + i, id: 'g:' + cl.id + ':' + g, name: cl.name + ' – ' + g, club: cl.id, label: g })); });
    const first = (id) => (c.clubs[0] || {}).id;
    const seed = [
      { id: 't1', name: en ? 'Parents G14' : 'Foreldre G14', club: vis[0] ? vis[0].id : first(), group: true, people: ['Marit Sunde', 'Ole Hauge'], msgs: [
        { id: 'm1', from: 'Marit Sunde', text: en ? 'Can someone drive to the away match on Saturday?' : 'Kan noen kjøre til bortekampen på lørdag?', when: en ? 'yesterday 18:12' : 'i går 18:12', unread: true },
        { id: 'm2', from: en ? 'You' : 'Du', me: true, text: en ? 'Yes, we are collecting names – reply here.' : 'Ja, vi samler navn – svar her.', when: en ? 'yesterday 18:30' : 'i går 18:30' } ] },
      { id: 't2', name: en ? 'Coaches' : 'Trenerteam', club: vis[0] ? vis[0].id : first(), group: true, people: ['Jonas Eide', 'Silje Aas'], msgs: [
        { id: 'm3', from: 'Jonas Eide', text: en ? 'New training plan is attached.' : 'Ny treningsplan er lagt ved.', when: en ? 'today 09:05' : 'i dag 09:05', unread: true, file: { name: 'Treningsplan høst.pdf', kind: 'doc', size: '184 kB' } } ] },
      { id: 't3', name: 'Silje Aas', club: vis[0] ? vis[0].id : first(), group: false, people: ['Silje Aas'], msgs: [
        { id: 'm4', from: 'Silje Aas', text: en ? 'The hall key is back at the office.' : 'Hallnøkkelen er tilbake på kontoret.', when: en ? '2 days ago' : '2 dager siden' } ] },
      { id: 't4', name: en ? 'Board' : 'Styret', club: vis[0] ? vis[0].id : first(), group: true, people: ['Kari Moe', 'Ola Berg'], msgs: [
        { id: 'm5', from: 'Kari Moe', text: en ? 'Agenda for the next board meeting is ready.' : 'Sakslisten til neste styremøte er klar.', when: en ? '3 days ago' : '3 dager siden' } ] }
    ];
    const extra = v('cmExtra', []);
    const add = v('cmAdd', {});
    const threads = seed.concat(extra).filter(t => c.all || t.club === c.sel).map(t => Object.assign({}, t, { msgs: t.msgs.concat(add[t.id] || []) }));
    const read = v('cmRead', {});
    const unreadOf = (t) => read[t.id] ? 0 : t.msgs.filter(m => !m.me && m.unread).length;
    const filt = v('cmFilter', 'all'), lq = (v('cmListQ', '') || '').trim().toLowerCase();
    const chatId = v('cmChat', ''), open = threads.find(t => t.id === chatId);
    const list = threads.filter(t => (filt === 'all' || (filt === 'unread' ? unreadOf(t) > 0 : t.group)) && (!lq || (t.name + ' ' + t.msgs.map(m => m.text || '').join(' ')).toLowerCase().includes(lq)));
    const tints = ['#a3e2ae', '#ffd66e', '#b9d6ff', '#f4a88a', '#d9c9f5'];
    const ini = (n) => String(n).split(/\s+/).slice(0, 2).map(x => x.slice(0, 1).toUpperCase()).join('');
    const tint = (n) => tints[Array.from(String(n)).reduce((a, ch) => a + ch.charCodeAt(0), 0) % tints.length];
    const chip = (on) => 'display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 999px; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; transition: background .2s, color .2s; ' + (on ? 'background: #16241a; border: 1px solid #16241a; color: #f6f8f3;' : 'background: #ffffff; border: 1px solid rgba(22,36,26,.18); color: #16241a;');
    const tabSt = (on) => 'padding: 10px 16px; border-radius: 999px; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; ' + (on ? 'background: #16241a; border: 1px solid #16241a; color: #f6f8f3;' : 'background: transparent; border: 1px solid rgba(22,36,26,.2); color: #16241a;');
    const cq = (v('cmChatQ', '') || '').trim().toLowerCase();
    const msgsAll = open ? open.msgs : [];
    const shown = msgsAll.filter(m => !cq || ((m.text || '') + ' ' + (m.file ? m.file.name : '')).toLowerCase().includes(cq));
    const tab = v('cmTab', 'chat'), att = !!v('cmAttach', false);
    const stamp = () => { const n = new Date(); return (en ? 'today ' : 'i dag ') + String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0'); };
    const push = (msg) => { if (!open) return; set(s2 => ({ cmAdd: Object.assign({}, s2.cmAdd || {}, { [open.id]: ((s2.cmAdd || {})[open.id] || []).concat([msg]) }), cmDraft: '', cmAttach: false })); setTimeout(() => { const el = document.querySelector('[data-kza-cmscroll]'); if (el) el.scrollTop = el.scrollHeight; }, 60); };
    const pickFiles = (kind) => (ev) => { const fs = Array.from(ev.target.files || []); ev.target.value = ''; fs.forEach((f, i) => push({ id: 'f' + Date.now() + i, from: en ? 'You' : 'Du', me: true, when: stamp(), file: { name: f.name, kind: kind, size: Math.max(1, Math.round((f.size || 0) / 1000)) + ' kB' } })); };
    const unreadAll = threads.filter(t => unreadOf(t) > 0).length;
    const cgOn = c.tab === 'comms' && !c.all;
    const cgClub = cgOn ? c.clubs.find(x => x.id === c.sel) : null;
    const deptMap = { vif: ['Kunstløp', 'Ishockey'], fana: ['Fotball', 'Håndball'], varden: ['Bordtennis', 'Badminton'] };
    const depts = deptMap[c.sel] || [en ? 'Main' : 'Hovedavdeling'];
    const cgAll = [];
    depts.forEach((dp, di) => {
      const lo = di === 0 ? 8 : 9, hi = di === 0 ? 19 : 17;
      for (let a = lo; a <= hi; a++) cgAll.push({ dept: dp, cat: en ? 'Boys' : 'Gutter', name: 'G' + a });
      for (let a = lo; a <= hi; a++) cgAll.push({ dept: dp, cat: en ? 'Girls' : 'Jenter', name: 'J' + a });
      ['Senior A', 'Senior B'].concat(di === 0 ? [en ? 'Women senior' : 'Damer senior', 'Old boys'] : [en ? 'Women senior' : 'Damer senior']).forEach(n => cgAll.push({ dept: dp, cat: 'Senior', name: n }));
      [en ? 'Coaches' : 'Trenerteam', en ? 'Parent contacts' : 'Foreldrekontakter', en ? 'Volunteer group' : 'Dugnadsgruppa'].forEach(n => cgAll.push({ dept: dp, cat: en ? 'Support' : 'Støtte', name: n }));
    });
    const cgQ = (v('cgQ', '') || '').trim().toLowerCase(), cgCat = v('cgCat', ''), cgDept = depts.indexOf(v('cgDept', '')) === -1 ? '' : v('cgDept', '');
    const cats = []; cgAll.forEach(g => { if (cats.indexOf(g.cat) === -1) cats.push(g.cat); });
    const tname = (g) => depts.length > 1 ? g.dept + ' ' + g.name : g.name;
    const openGroup = (g) => { const nm = tname(g); const ex = threads.find(t => t.name === nm && t.club === c.sel); if (ex) return set({ cmChat: ex.id, cmTab: 'chat', clubsOpen: false, cmFilter: 'all', cmListQ: '', cmRead: Object.assign({}, v('cmRead', {}), { [ex.id]: true }) }); const nid = 'tg' + Date.now(); set(s2 => ({ cmExtra: (s2.cmExtra || []).concat([{ id: nid, name: nm, club: c.sel, group: true, people: [], msgs: [] }]), cmChat: nid, cmTab: 'chat', clubsOpen: false, cmListQ: '' })); };
    const cgSections = []; (cgDept ? [cgDept] : depts).forEach(dp => cats.filter(k => !cgCat || k === cgCat).forEach(k => {
      const items = cgAll.filter(g => g.dept === dp && g.cat === k && (!cgQ || (dp + ' ' + g.name + ' ' + k).toLowerCase().includes(cgQ))).map(g => { const ex = threads.find(t => t.name === tname(g) && t.club === c.sel); return { key: 'cg' + dp + g.name, name: !cgDept && depts.length > 1 ? g.name : g.name, hot: !!ex && unreadOf(ex) > 0, pick: () => openGroup(g),
        style: 'display: inline-flex; align-items: center; gap: 6px; padding: 7px 13px; border-radius: 999px; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; color: #16241a; transition: background .2s, border-color .2s; border: 1px solid ' + (ex ? '#74cd85' : 'rgba(22,36,26,.16)') + '; background: ' + (ex ? '#f4faf3' : '#ffffff') }; });
      if (items.length) cgSections.push({ key: 'cgs' + dp + k, title: (!cgDept && depts.length > 1 ? dp + ' · ' : '') + k, items: items });
    }));
    const cgTotal = cgSections.reduce((n, sec) => n + sec.items.length, 0);
    return {
      cgShow: cgOn && !!cgClub, cgTitle: cgClub ? (en ? 'Groups in ' : 'Grupper i ') + cgClub.name : '', cgCount: cgTotal + (en ? (cgTotal === 1 ? ' group' : ' groups') : (cgTotal === 1 ? ' gruppe' : ' grupper')),
      cgQ: v('cgQ', ''), onCgQ: (e) => set({ cgQ: e.target.value }), tCgSearch: en ? 'Search groups (e.g. G14)' : 'Søk etter gruppe (f.eks. G14)', tCgNone: en ? 'No groups match.' : 'Ingen grupper matcher.', cgEmpty: cgSections.length === 0,
      cgHasDepts: depts.length > 1,
      cgDepts: [''].concat(depts).map((k, ki) => ({ key: 'cgd' + k, label: k || (en ? 'All sports' : 'Alle grener'), on: cgDept === k, initials: k ? k.slice(0, 2) : '∗', pick: () => set({ cgDept: k }),
        circle: 'display: grid; place-items: center; width: 52px; height: 52px; border-radius: 999px; font-family: var(--font-heading); font-weight: 800; font-size: 15px; background: ' + (k ? ['#1f7a3a', '#74cd85', '#3E8A48', '#a3e2ae'][(ki - 1) % 4] : '#16241a') + '; color: ' + (k && (ki - 1) % 4 === 1 || k && (ki - 1) % 4 === 3 ? '#16241a' : '#ffffff'),
        style: 'display: grid; justify-items: center; width: 84px; padding: 8px 4px; border-radius: 18px; cursor: pointer; font-family: var(--font-body); color: #16241a; transition: background .2s, border-color .2s; background: ' + (cgDept === k ? '#eaf7ed' : '#ffffff') + '; border: 1.5px solid ' + (cgDept === k ? '#1f7a3a' : 'rgba(22,36,26,.1)') })),
      cgCats: [''].concat(cats).map(k => ({ key: 'cgc' + k, label: k || (en ? 'All' : 'Alle'), pick: () => set({ cgCat: k }), style: 'padding: 5px 12px; border-radius: 999px; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12px; border: 1px solid ' + (cgCat === k ? '#16241a' : 'rgba(22,36,26,.16)') + '; background: ' + (cgCat === k ? '#16241a' : '#ffffff') + '; color: ' + (cgCat === k ? '#f6f8f3' : '#16241a') })),
      cgSections: cgSections,
      tCmSearchChats: en ? 'Search chats' : 'Søk i samtaler', tCmNew: en ? '+ New message' : '+ Ny melding', tCmNoChats: en ? 'No chats.' : 'Ingen samtaler.', tBackL: en ? 'Back' : 'Tilbake',
      tCmChatTab: en ? 'Chat' : 'Samtale', tCmFilesTab: en ? 'Files' : 'Filer', tCmSearchIn: en ? 'Search in chat' : 'Søk i samtalen', tCmAttach: en ? 'Attach' : 'Legg ved', tCmPhoto: en ? 'Photo' : 'Bilde', tCmDoc: en ? 'Document or file' : 'Dokument eller fil', tCmWrite: en ? 'Write a message' : 'Skriv en melding', tCmSend: en ? 'Send' : 'Send', tCmNoMatches: en ? 'No matches.' : 'Ingen treff.', tCmNoFiles: en ? 'No files shared yet.' : 'Ingen filer delt ennå.',
      cmCols: open ? 'minmax(0, 340px) minmax(0, 1fr)' : 'minmax(0, 1fr)', cmToOpts: opts,
      cmListQ: v('cmListQ', ''), onCmListQ: (e) => set({ cmListQ: e.target.value }),
      onCmNew: (e) => { const id = e.target.value; e.target.value = ''; const o = opts.find(x => x.id === id); if (!o) return; const ex = threads.find(t => t.name === o.label && t.club === o.club); if (ex) return set({ cmChat: ex.id }); const nid = 'tn' + Date.now(); set(s2 => ({ cmExtra: (s2.cmExtra || []).concat([{ id: nid, name: o.label === (en ? 'Whole club' : 'Hele klubben') ? o.name : o.label, club: o.club, group: true, people: [], msgs: [] }]), cmChat: nid, cmTab: 'chat' })); },
      cmFilters: [['all', en ? 'All' : 'Alle', threads.length], ['unread', en ? 'Unread' : 'Uleste', unreadAll], ['groups', en ? 'Groups' : 'Grupper', threads.filter(t => t.group).length]].map(f => ({ key: 'cf' + f[0], label: f[1], count: String(f[2]), pick: () => set({ cmFilter: f[0] }), style: chip(filt === f[0]),
        countStyle: 'min-width: 20px; padding: 1px 7px; border-radius: 999px; font-size: 11.5px; font-weight: 700; text-align: center; ' + (filt === f[0] ? 'background: rgba(246,248,243,.2); color: #f6f8f3;' : 'background: rgba(22,36,26,.08);') })),
      cmChatList: list.map(t => { const last = t.msgs[t.msgs.length - 1] || {}, un = unreadOf(t), hot = un > 0, act = chatId === t.id; const ring = hot ? '#CDEFD3' : (act ? '#eaf7ed' : '#f7f9f5');
        const people = t.group ? (t.people.concat([en ? 'You' : 'Du']).slice(0, 2)) : [t.name];
        return { key: 'cl' + t.id, name: t.name, preview: last.file ? '📎 ' + last.file.name : (last.text || (en ? 'No messages yet' : 'Ingen meldinger ennå')), when: last.when || '', hasUnread: hot, unread: String(un),
          badgeStyle: 'min-width: 22px; padding: 2px 7px; border-radius: 999px; background: #74cd85; color: #16241a; font-size: 12px; font-weight: 800; text-align: center',
          previewStyle: 'flex: 1; min-width: 0; font-size: 13.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; ' + (hot ? 'color: #16241a; font-weight: 600;' : 'color: rgba(22,36,26,.62);'),
          avatars: people.map((n, k) => t.group ? { key: 'a' + k, initials: ini(n), style: 'width: 34px; height: 34px; flex: 0 0 auto; border-radius: 999px; box-sizing: border-box; border: 2.5px solid ' + ring + '; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 11.5px; color: #16241a; background: ' + tint(n) + ';' + (k > 0 ? ' margin-left: -12px;' : '') } : { key: 'a' + k, initials: ini(n), style: 'width: 40px; height: 40px; flex: 0 0 auto; border-radius: 999px; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 13px; ' + (hot || act ? 'background: #16241a; color: #f6f8f3;' : 'background: rgba(116,205,133,.28); color: #16241a;') }),
          style: 'display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 22px; cursor: pointer; font-family: var(--font-body); color: #16241a; transition: transform .25s, box-shadow .25s, border-color .25s; border: 1px solid ' + (act ? '#74cd85' : (hot ? '#74cd85' : 'rgba(22,36,26,.1)')) + '; background: ' + (hot ? '#CDEFD3' : (act ? '#eaf7ed' : '#ffffff')) + ';',
          open: () => { set(s2 => ({ cmChat: t.id, cmTab: 'chat', cmChatQ: '', cmRead: Object.assign({}, s2.cmRead || {}, { [t.id]: true }) })); setTimeout(() => { const el = document.querySelector('[data-kza-cmscroll]'); if (el) el.scrollTop = el.scrollHeight; }, 120); } }; }),
      cmNoChats: list.length === 0,
      cmChatOpen: !!open, cmClose: () => set({ cmChat: '', cmChatQ: '' }),
      cmChatName: open ? open.name : '', cmChatMeta: open ? (open.group ? (open.people.length + 1) + (en ? ' members' : ' medlemmer') : (en ? 'Direct message' : 'Direktemelding')) + ' · ' + c.clubOf(open.club) : '',
      cmShowChat: () => set({ cmTab: 'chat' }), cmShowFiles: () => set({ cmTab: 'files' }), cmTabChatStyle: tabSt(tab === 'chat'), cmTabFilesStyle: tabSt(tab === 'files'), cmOnChat: tab === 'chat', cmOnFiles: tab === 'files',
      cmChatQ: v('cmChatQ', ''), onCmChatQ: (e) => set({ cmChatQ: e.target.value }), cmSearchNote: cq ? shown.length + (en ? ' matches' : ' treff') : '',
      cmMessages: shown.map(m => ({ key: 'mm' + m.id, from: m.from, text: m.text || '', hasText: !!m.text, hasFile: !!m.file, fileIcon: m.file && m.file.kind === 'img' ? '🖼' : '📄', fileName: m.file ? m.file.name : '', fileMeta: m.file ? m.file.size : '', when: m.when,
        rowStyle: 'display: flex; justify-content: ' + (m.me ? 'flex-end' : 'flex-start') + ';',
        bubbleStyle: 'max-width: 78%; box-sizing: border-box; padding: 12px 16px; border-radius: 22px; ' + (m.me ? 'background: #74cd85; color: #16241a; border-bottom-right-radius: 8px;' : 'background: #f4f8f2; border: 1px solid rgba(22,36,26,.08); border-bottom-left-radius: 8px;'),
        fromStyle: 'font-size: 12px; font-weight: 700; margin-bottom: 4px; opacity: .7', whenStyle: 'font-size: 11.5px; margin-top: 6px; opacity: .6; text-align: right' })),
      cmNoMatches: !!open && shown.length === 0,
      cmDraft: v('cmDraft', ''), onCmDraft: (e) => set({ cmDraft: e.target.value }),
      cmSend: (e) => { e.preventDefault(); const t = (v('cmDraft', '') || '').trim(); if (!t) return; push({ id: 'n' + Date.now(), from: en ? 'You' : 'Du', me: true, text: t, when: stamp() }); },
      cmToggleAttach: () => set({ cmAttach: !att }),
      cmAttachBtnStyle: 'width: 48px; height: 48px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: ' + (att ? '#16241a' : '#ffffff') + '; color: ' + (att ? '#f6f8f3' : '#16241a') + '; font-size: 24px; line-height: 1; cursor: pointer; transition: background .25s, color .25s',
      cmAttachMenuStyle: 'position: absolute; left: 0; bottom: calc(100% + 10px); z-index: 20; display: grid; padding: 8px; border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 18px 44px rgba(22,36,26,.2); transition: opacity .2s, transform .2s; ' + (att ? 'opacity: 1; transform: none; pointer-events: auto;' : 'opacity: 0; transform: translateY(8px); pointer-events: none;'),
      cmPickImages: pickFiles('img'), cmPickDocs: pickFiles('doc'),
      cmFiles: msgsAll.filter(m => m.file).map(m => ({ key: 'cfl' + m.id, icon: m.file.kind === 'img' ? '🖼' : '📄', name: m.file.name, meta: m.file.size + ' · ' + m.from + ' · ' + m.when })), cmNoFiles: !msgsAll.some(m => m.file)
    };
  }

  adminBudgetVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]), set = (o) => this.setState(o);
    const fmt = (n) => 'kr ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    const per = v('bgPer', 'ytd');
    const fac = c.all ? 1 : ({ vif: .45, fana: .35, varden: .2 }[c.sel] || .3);
    const defs = budgetLines(en);
    const ov = v('bgEdit', {}), pf = per === 'ytd' ? 1 : 1 / 0.75;
    const key = (id) => (c.all ? 'all' : c.sel) + ':' + per + ':' + id;
    let incB = 0, incA = 0, expB = 0, expA = 0;
    const groups = defs.map(g => ({ key: 'bg' + g.id, title: g.title, rows: g.rows.map(r => {
      const bud = ov[key(r[0])] !== undefined ? ov[key(r[0])] : Math.round(r[2] * fac * (per === 'ytd' ? .75 : 1) / 1000) * 1000, act = Math.round(r[3] * fac * (per === 'ytd' ? 1 : pf * .98) / 1000) * 1000;
      if (g.sign > 0) { incB += bud; incA += act; } else { expB += bud; expA += act; }
      const pct = bud ? act / bud : 0, d = g.sign * (act - bud), good = d >= 0;
      return { key: 'br' + r[0], label: r[1], budget: String(bud), actual: fmt(act), pct: Math.min(100, Math.round(pct * 100)) + '%', pctLabel: Math.round(pct * 100) + '%',
        bar: g.sign > 0 ? '#74cd85' : (pct > 1 ? '#d9644f' : (pct > .9 ? '#e8b923' : '#1f7a3a')), diff: (d >= 0 ? '+' : '−') + fmt(Math.abs(d)).replace('kr ', ''), diffInk: good ? '#1f7a3a' : '#b8240e',
        edit: (e) => set({ bgEdit: Object.assign({}, ov, { [key(r[0])]: Math.max(0, parseInt(e.target.value, 10) || 0) }) }) };
    }) }));
    const resB = incB - expB, resA = incA - expA;
    const chipSt = (on) => 'cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 13px; padding: 9px 18px; border-radius: 999px; border: 1px solid ' + (on ? '#16241a' : 'rgba(22,36,26,.16)') + '; background: ' + (on ? '#16241a' : '#ffffff') + '; color: ' + (on ? '#f6f8f3' : '#16241a');
    return {
      tBgTitle: en ? 'Budget' : 'Budsjett', bgScope: (c.all ? (en ? 'All clubs' : 'Alle klubber') : c.clubOf(c.sel)) + ' · 2026',
      bgPeriods: [['ytd', en ? 'Year to date' : 'Hittil i år'], ['year', en ? 'Full year' : 'Hele året']].map(o => ({ key: 'bp' + o[0], label: o[1], pick: () => set({ bgPer: o[0] }), style: chipSt(per === o[0]) })),
      bgKpis: [
        { key: 'k1', label: en ? 'Budgeted result' : 'Budsjettert resultat', value: fmt(resB), note: en ? 'Income minus expenses' : 'Inntekter minus kostnader', bg: '#f4f8f2' },
        { key: 'k2', label: en ? 'Actual result' : 'Faktisk resultat', value: fmt(resA), note: en ? 'So far' : 'Hittil', bg: resA >= resB ? 'rgba(116,205,133,.25)' : '#fbe9e5' },
        { key: 'k3', label: en ? 'Deviation' : 'Avvik', value: (resA - resB >= 0 ? '+' : '−') + fmt(Math.abs(resA - resB)).replace('kr ', ''), note: resA >= resB ? (en ? 'Ahead of budget' : 'Foran budsjett') : (en ? 'Behind budget' : 'Bak budsjett'), bg: '#ffffff' }
      ],
      bgGroups: groups, tBgBudget: en ? 'Budget (NOK)' : 'Budsjett (NOK)', tBgActual: en ? 'Actual' : 'Faktisk', tBgUsed: en ? 'Used' : 'Brukt', tBgDiff: en ? 'Deviation' : 'Avvik'
    };
  }

  adminIntegrVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]), set = (o) => this.setState(o);
    const on = v('intOn', { vipps: true, bank: true });
    const defs = integrationDefs(en);
    return {
      tIntTitle: en ? 'Integrations' : 'Integrasjoner', tIntSub: en ? 'Connect the tools the club already uses.' : 'Koble til verktøyene klubben allerede bruker.',
      intCards: defs.map(d => { const o = !!on[d[0]]; return { key: 'ic' + d[0], name: d[1], initials: d[2], kind: d[3], desc: d[4], bg: o ? '#f4f8f2' : '#ffffff', border: o ? '#74cd85' : 'rgba(22,36,26,.12)',
        status: o ? (en ? 'Connected' : 'Tilkoblet') : (en ? 'Not connected' : 'Ikke tilkoblet'),
        pill: 'padding: 4px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; ' + (o ? 'background: rgba(116,205,133,.35); color: #16241a;' : 'background: rgba(22,36,26,.07); color: rgba(22,36,26,.65);'),
        btnLabel: o ? (en ? 'Disconnect' : 'Koble fra') : (en ? 'Connect' : 'Koble til'),
        btn: 'justify-self: start; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 13px; padding: 10px 20px; border-radius: 999px; ' + (o ? 'border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a;' : 'border: 0; background: #1f7a3a; color: #ffffff;'),
        toggle: () => set({ intOn: Object.assign({}, on, { [d[0]]: !o }) }) }; })
    };
  }

  adminSupVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]), set = (o) => this.setState(o);
    const money = (n) => Number(n).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' NOK';
    const fd = (iso) => { const p = iso.split('-'); return p[2] + '-' + p[1] + '-' + p[0]; };
    const bookedOv = v('svBooked', {}), openMap = v('svOpen', {}), q = (v('svQ', '') || '').trim().toLowerCase();
    const fB = v('svFB', 'all'), fR = v('svFR', 'all'), sort = v('svSort', { k: 'due', d: 1 }), menu = v('svMenu', ''), tip = v('svTip', '');
    const rows = c.payAll.map((p, i) => {
      const booked = bookedOv[p.id] !== undefined ? bookedOv[p.id] : (p.isPaid || i % 3 !== 0);
      const po = (i % 3 === 1) ? String(1001 + i) : '';
      const recv = (p.isPaid || booked) ? 'recv' : (po ? 'order' : 'none');
      return { p: p, i: i, booked: booked, po: po, recv: recv };
    });
    const bl = { yes: en ? 'Booked' : 'Bokført', no: en ? 'Draft' : 'Utkast' };
    const rl = { recv: en ? 'Received' : 'Mottatt', order: en ? 'See order' : 'Se ordre', none: en ? 'Not received' : 'Ikke mottatt' };
    const shown = rows.filter(r => (fB === 'all' || (fB === 'yes') === r.booked) && (fR === 'all' || fR === r.recv) && (!q || (r.p.no + ' ' + r.p.supplier + ' ' + r.p.desc + ' ' + r.po + ' ' + c.clubOf(r.p.club)).toLowerCase().includes(q)))
      .sort((a, b) => { const x = sort.k === 'no' ? a.p.no : (sort.k === 'total' ? a.p.n : (sort.k === 'booked' ? Number(a.booked) : a.p.due)); const y = sort.k === 'no' ? b.p.no : (sort.k === 'total' ? b.p.n : (sort.k === 'booked' ? Number(b.booked) : b.p.due)); return (x < y ? -1 : x > y ? 1 : 0) * sort.d; });
    const pill = (on, kind) => 'display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 13.5px; white-space: nowrap; ' + (on ? 'background: rgba(116,205,133,.35); color: #16241a;' : 'color: rgba(22,36,26,.6);');
    const chip = (on) => 'cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; padding: 8px 15px; border-radius: 999px; white-space: nowrap; border: 1px solid ' + (on ? '#16241a' : 'rgba(22,36,26,.16)') + '; background: ' + (on ? '#16241a' : '#ffffff') + '; color: ' + (on ? '#f6f8f3' : '#16241a');
    const sortBy = (k) => () => set({ svSort: { k: k, d: sort.k === k ? -sort.d : 1 } });
    const csvRows = () => [['Nummer', 'Type', 'Forfallsdato', 'Innkjøpsordre', 'Leverandør', 'Overskrift', 'Bokført', 'Mottatt', 'Total (NOK)']].concat(shown.map(r => [r.p.no, 'Faktura', fd(r.p.due), r.po, r.p.supplier, r.p.desc, r.booked ? bl.yes : bl.no, rl[r.recv], r.p.n]));
    const rowsOut = shown.map(r => {
      const p = r.p, isOpen = !!openMap[p.id], mShown = menu === p.id, pr = c.payRows.find(x => x.key === 'pb' + p.id);
      const tipFor = (t) => () => set({ svTip: t });
      return {
        key: 'sv' + p.id, no: p.no, type: en ? 'Invoice' : 'Faktura', due: fd(p.due), po: r.po, supplier: p.supplier, club: c.clubOf(p.club), showClub: c.all, title: p.desc,
        booked: r.booked ? bl.yes : bl.no, bookedStyle: pill(r.booked), recv: rl[r.recv], recvStyle: pill(r.recv !== 'none'), total: money(p.n),
        open: isOpen, chevRot: isOpen ? 'rotate(180deg)' : 'none', desc: p.desc,
        toggle: () => set({ svOpen: Object.assign({}, openMap, { [p.id]: !isOpen }) }),
        menuIn: () => set({ svMenu: p.id, svTip: '' }), menuOut: () => set({ svMenu: '', svTip: '' }), tipOut: () => set({ svTip: '' }),
        menuShown: mShown, dotsBorder: mShown ? '#1f7a3a' : 'transparent', tipShown: mShown && !!tip, tipText: tip,
        undo: () => set({ svBooked: Object.assign({}, bookedOv, { [p.id]: !r.booked }), svMenu: '' }), undoIn: tipFor(en ? 'Undo posting' : 'Angre bokføring'),
        copy: () => set(s2 => ({ payExtra: (s2.payExtra || []).concat([{ id: 'px' + Date.now(), club: p.club, supplier: p.supplier, no: p.no + '-K', desc: p.desc, n: p.n, due: p.due, url: p.url }]), svMenu: '' })), copyIn: tipFor(en ? 'Copy invoice' : 'Kopier faktura'),
        look: () => pr && pr.open(), lookIn: tipFor(en ? 'Preview invoice' : 'Forhåndsvis faktura'),
        payToggle: () => set(s2 => ({ payPaid: Object.assign({}, s2.payPaid, { [p.id]: !p.isPaid }) })),
        payLabel: p.isPaid ? (en ? 'Undo paid' : 'Angre betalt') : (en ? 'Mark as paid' : 'Merk som betalt'),
        payBg: p.isPaid ? '#ffffff' : '#1f7a3a', payInk: p.isPaid ? '#16241a' : '#ffffff'
      };
    });
    return {
      svCount: shown.length, tSvTitle: en ? 'Supplier invoices' : 'Leverandørfakturaer',
      svCols: '30px minmax(80px,.8fr) minmax(66px,.6fr) minmax(94px,.8fr) minmax(76px,.6fr) minmax(104px,1fr) minmax(120px,1.4fr) minmax(76px,.6fr) minmax(96px,.8fr) minmax(108px,.8fr) 44px',
      tSvExport: en ? 'Export' : 'Eksporter', tSvExportCsv: en ? 'Export as CSV' : 'Eksporter som CSV', tSvExportPdf: en ? 'Print / save as PDF' : 'Skriv ut / lagre som PDF',
      svExpOpen: !!v('svExpOpen', false), svToggleExp: () => set({ svExpOpen: !v('svExpOpen', false), svFiltOpen: false }),
      svClosePops: () => set({ svExpOpen: false, svFiltOpen: false }),
      svExportCsv: () => { const qv = (x) => '"' + String(x).replace(/"/g, '""') + '"'; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\ufeff' + csvRows().map(r => r.map(qv).join(';')).join('\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'leverandorfakturaer.csv'; document.body.appendChild(a); a.click(); a.remove(); set({ svExpOpen: false }); },
      svExportPrint: () => { set({ svExpOpen: false }); setTimeout(() => window.print(), 80); },
      tSvCreate: en ? 'Create new' : 'Opprett ny',
      tSvFilter: en ? 'Filters' : 'Filtre', tSvSearch: en ? 'Search' : 'Søk', svQ: v('svQ', ''), onSvQ: (e) => set({ svQ: e.target.value }),
      svFiltOpen: !!v('svFiltOpen', false), svToggleFilt: () => set({ svFiltOpen: !v('svFiltOpen', false), svExpOpen: false }),
      tSvBooked: en ? 'Posting' : 'Bokføring', tSvReceived: en ? 'Received' : 'Mottatt',
      svBookedChips: [['all', en ? 'All' : 'Alle'], ['yes', bl.yes], ['no', bl.no]].map(o => ({ key: 'fb' + o[0], label: o[1], pick: () => set({ svFB: o[0] }), style: chip(fB === o[0]) })),
      svRecvChips: [['all', en ? 'All' : 'Alle'], ['recv', rl.recv], ['order', rl.order], ['none', rl.none]].map(o => ({ key: 'fr' + o[0], label: o[1], pick: () => set({ svFR: o[0] }), style: chip(fR === o[0]) })),
      svRememberLabel: v('svRem', false) ? (en ? 'Saved ✓' : 'Husket ✓') : (en ? 'Remember' : 'Husk'), svRememberBg: v('svRem', false) ? 'rgba(116,205,133,.3)' : '#f4f8f2',
      svRemember: () => { const on = !v('svRem', false); try { if (on) localStorage.setItem('kretzSupFilter', JSON.stringify({ q: v('svQ', ''), fB: fB, fR: fR })); else localStorage.removeItem('kretzSupFilter'); } catch (e) {} set({ svRem: on }); },
      tSvNumber: en ? 'Number' : 'Nummer', tSvType: en ? 'Invoice type' : 'Fakturatype', tSvDue: en ? 'Due date' : 'Forfallsdato', tSvPO: en ? 'Purchase order' : 'Innkjøpsordre', tSvSupplier: en ? 'Supplier' : 'Leverandør', tSvTitleCol: en ? 'Title' : 'Overskrift', tSvBookedCol: en ? 'Posted' : 'Bokført', tSvReceivedCol: en ? 'Received' : 'Mottatt', tSvTotal: 'Total',
      svSortNo: sortBy('no'), svSortBooked: sortBy('booked'), svSortTotal: sortBy('total'),
      svRows: rowsOut, svEmpty: rowsOut.length === 0, svTotalAll: money(shown.reduce((n, r) => n + r.p.n, 0)),
      tSvExpand: en ? 'Show details' : 'Vis detaljer', tSvActions: en ? 'Actions' : 'Handlinger', tSvDesc: en ? 'Description' : 'Beskrivelse',
      tSvUndoBook: en ? 'Undo posting' : 'Angre bokføring', tSvCopy: en ? 'Copy invoice' : 'Kopier faktura', tSvPreview: en ? 'Preview invoice' : 'Forhåndsvis faktura'
    };
  }

  adminInvVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]);
    const pad = (n) => String(n).padStart(2, '0');
    const kr = (n) => 'kr ' + Number(n).toLocaleString('nb-NO').replace(/\u00a0/g, ' ');
    const types = [en ? 'Membership fee' : 'Kontingent', en ? 'Tournament fee' : 'Turneringsavgift', en ? 'Kit' : 'Drakt', en ? 'Season fee' : 'Sesongavgift'];
    const amts = [1200, 650, 899, 1500];
    const addDays = (iso, n) => { const p = iso.split('-').map(Number); const d = new Date(p[0], p[1] - 1, p[2] + n); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
    const base = this.members(en).filter(c.keep).map((m, i) => {
      const n = parseInt(m.id.slice(1), 10) || i + 1;
      const issue = '2026-09-' + pad(1 + (n * 5) % 26);
      return { id: '#' + (3500 + n * 13), club: m.club, type: types[(m.seed || n) % 4], number: (n * 3 + 8) + '/9/2026', date: issue, name: m.name, amt: amts[(m.seed || n) % 4], due: addDays(issue, 14), status: m.due > 1 ? 'overdue' : (m.due > 0 ? 'unpaid' : 'paid') };
    });
    const created = (v('invNewList', [])).filter(x => c.all || x.club === c.sel);
    const del = v('invDel', {}), ov = v('invOv', {});
    const stat = v('invStatus', 'all'), q = (v('invQ', '') || '').trim().toLowerCase();
    const merged = created.concat(base).filter(x => !del[x.id]).map(x => Object.assign({}, x, ov[x.id] || {}));
    const shown = merged.filter(x => (stat === 'all' || x.status === stat) && (!q || (x.id + ' ' + x.type + ' ' + x.number + ' ' + x.name + ' ' + x.date).toLowerCase().includes(q)));
    const sl = { paid: en ? 'Paid' : 'Betalt', unpaid: en ? 'Unpaid' : 'Ubetalt', overdue: en ? 'Overdue' : 'Forfalt' };
    const ss = { paid: 'background: rgba(116,205,133,.3); color: #16241a', unpaid: 'background: rgba(148,92,214,.18); color: #4b2a85', overdue: 'background: #fbe9e5; color: #a3280e' };
    const pillSt = (k) => 'display: inline-block; padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; ' + ss[k];
    const set = (o) => this.setState(o);
    const dm = v('invModal', null); const dRow = dm ? merged.find(x => x.id === dm.id) : null;
    const chip = (on) => 'cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; padding: 8px 15px; border-radius: 999px; white-space: nowrap; border: 1px solid ' + (on ? '#16241a' : 'rgba(22,36,26,.16)') + '; background: ' + (on ? '#16241a' : '#ffffff') + '; color: ' + (on ? '#f6f8f3' : '#16241a');
    const draft = (k, d) => v(k, d);
    const allM = this.members(en);
    const manual = v('invManual', []);
    const totalCount = c.invCount + manual.length;
    const chosen = c.invTargets.find(t => t.id === st.invTarget);
    const pq = (v('invPQ', '') || '').trim().toLowerCase();
    const pickRows = (c.scope === 'person' || c.scope === 'group') ? c.invTargets.filter(t => !pq || t.name.toLowerCase().includes(pq)).map(t => { const m = c.scope === 'person' ? allM.find(x => x.id === t.id) : null; return { key: 'pk' + t.id, label: t.name, sub: m ? (m.group + ' · ' + c.clubOf(m.club)) : '', pick: () => set({ invTarget: t.id, invSent: false }),
      style: 'text-align: left; width: 100%; box-sizing: border-box; cursor: pointer; padding: 10px 14px; border-radius: 14px; font-family: var(--font-body); border: 1px solid ' + (st.invTarget === t.id ? '#1f7a3a' : 'rgba(22,36,26,.1)') + '; background: ' + (st.invTarget === t.id ? '#1f7a3a' : '#ffffff') + '; color: ' + (st.invTarget === t.id ? '#ffffff' : '#16241a') }; }) : [];
    const calM = v('invCalM', 10), invDay = v('invDay', 0);
    const evAll = (c.allActs || []).filter(a => c.all || a.club === c.sel);
    const evDays = {}; evAll.forEach(a => { if (a.m === calM) (evDays[a.day] = evDays[a.day] || []).push(a); });
    const lead = (new Date(2026, calM - 1, 1).getDay() + 6) % 7, nd = new Date(2026, calM, 0).getDate();
    const calCells = []; for (let i = 0; i < lead; i++) calCells.push({ key: 'cp' + i, label: '', off: true, pick: () => {}, style: 'visibility: hidden; height: 34px' });
    for (let d2 = 1; d2 <= nd; d2++) { const has = !!evDays[d2], on = invDay === d2; calCells.push({ key: 'cd' + d2, label: String(d2), off: !has, pick: () => set({ invDay: d2 }),
      style: 'height: 34px; border-radius: 10px; font-family: var(--font-body); font-size: 13.5px; border: 1px solid ' + (on ? '#16241a' : (has ? '#74cd85' : 'transparent')) + '; background: ' + (on ? '#16241a' : (has ? 'rgba(116,205,133,.3)' : 'transparent')) + '; color: ' + (on ? '#f6f8f3' : (has ? '#16241a' : 'rgba(22,36,26,.35)')) + '; cursor: ' + (has ? 'pointer' : 'default') + '; font-weight: ' + (has ? '800' : '400') }); }
    const dayEvents = (evDays[invDay] || []).map(a => ({ key: 'de' + a.id, label: a.title, sub: a.time + ' · ' + c.clubOf(a.club) + (a.signed ? ' · ' + a.signed + (en ? ' signed up' : ' påmeldt') : ''), pick: () => set({ invTarget: a.id, invSent: false }),
      style: 'text-align: left; width: 100%; box-sizing: border-box; cursor: pointer; padding: 10px 14px; border-radius: 14px; font-family: var(--font-body); border: 1px solid ' + (st.invTarget === a.id ? '#1f7a3a' : 'rgba(22,36,26,.1)') + '; background: ' + (st.invTarget === a.id ? '#1f7a3a' : '#ffffff') + '; color: ' + (st.invTarget === a.id ? '#ffffff' : '#16241a') }));
    const evQ = (v('invEvQ', '') || '').trim().toLowerCase();
    const evResults = evQ ? evAll.filter(a => (a.title + ' ' + c.clubOf(a.club)).toLowerCase().includes(evQ)).slice(0, 8).map(a => ({ key: 'er' + a.id, label: a.title, sub: a.day + '.' + a.m + ' · ' + a.time + ' · ' + c.clubOf(a.club) + (a.signed ? ' · ' + a.signed + (en ? ' signed up' : ' påmeldt') : ''), pick: () => set({ invTarget: a.id, invCalM: a.m, invDay: a.day, invSent: false }),
      style: 'text-align: left; width: 100%; box-sizing: border-box; cursor: pointer; padding: 10px 14px; border-radius: 14px; font-family: var(--font-body); border: 1px solid ' + (st.invTarget === a.id ? '#1f7a3a' : 'rgba(22,36,26,.1)') + '; background: ' + (st.invTarget === a.id ? '#1f7a3a' : '#ffffff') + '; color: ' + (st.invTarget === a.id ? '#ffffff' : '#16241a') })) : [];
    const mqq = (v('invManQ', '') || '').trim().toLowerCase();
    const manRes = mqq ? allM.filter(m => manual.indexOf(m.id) === -1 && m.name.toLowerCase().includes(mqq)).slice(0, 5).map(m => ({ key: 'mr' + m.id, name: m.name, sub: m.group + ' · ' + c.clubOf(m.club), add: () => set({ invManual: manual.concat([m.id]), invManQ: '' }) })) : [];
    const manChips = manual.map(id => { const m = allM.find(x => x.id === id); return { key: 'mc' + id, name: m ? m.name : id, remove: () => set({ invManual: manual.filter(x => x !== id) }) }; });
    return {
      tInvoices: en ? 'Invoices' : 'Fakturaer',
      invCountLabel: (en ? 'Number of invoices: ' : 'Antall fakturaer: ') + shown.length,
      invQ: v('invQ', ''), onInvQ: (e) => set({ invQ: e.target.value }),
      tInvSearch: en ? 'Search for invoice' : 'Søk etter faktura',
      tInvFilter: en ? 'Filter' : 'Filter', tInvAdd: en ? 'Add invoice' : 'Legg til faktura', tInvMore: en ? 'More' : 'Mer',
      invFilterOpen: !!v('invFilterOpen', false), invMoreOpen: !!v('invMoreOpen', false),
      toggleInvFilter: () => set({ invFilterOpen: !v('invFilterOpen', false), invMoreOpen: false }),
      toggleInvMore: () => set({ invMoreOpen: !v('invMoreOpen', false), invFilterOpen: false }),
      closeInvPops: () => set({ invFilterOpen: false, invMoreOpen: false }),
      tStatus: en ? 'Status' : 'Status',
      invStatusTabs: [['all', en ? 'All' : 'Alle'], ['paid', sl.paid], ['unpaid', sl.unpaid], ['overdue', sl.overdue]].map(o => ({ key: 'is' + o[0], label: o[1], pick: () => set({ invStatus: o[0] }), style: chip(stat === o[0]) })),
      tInvExport: en ? 'Export invoices (CSV)' : 'Eksporter fakturaer (CSV)',
      exportInvoices: () => {
        const qv = (x) => '"' + String(x).replace(/"/g, '""') + '"';
        const lines = [['ID', en ? 'Type' : 'Type', en ? 'Number' : 'Nummer', en ? 'Issued' : 'Utstedt', en ? 'Name' : 'Navn', en ? 'Amount (NOK)' : 'Beløp (NOK)', 'Status'].map(qv).join(';')].concat(shown.map(x => [x.id, x.type, x.number, x.date, x.name, x.amt, sl[x.status]].map(qv).join(';')));
        const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'fakturaer.csv'; document.body.appendChild(a); a.click(); a.remove(); set({ invMoreOpen: false });
      },
      invCols: '72px minmax(110px,1.2fr) minmax(90px,.8fr) minmax(100px,1fr) minmax(130px,1.4fr) minmax(90px,.9fr) minmax(90px,.9fr) 140px',
      tColType: en ? 'Type' : 'Type', tColNumber: en ? 'Number' : 'Nummer', tColIssued: en ? 'Date of issue' : 'Utstedt', tColName: en ? 'Name' : 'Navn', tColAmount: en ? 'Amount' : 'Beløp', tColStatus: 'Status', tColDetails: en ? 'Details' : 'Detaljer',
      tView: en ? 'View' : 'Vis', tEditL: en ? 'Edit' : 'Rediger', tDelete: en ? 'Delete' : 'Slett',
      tInvEmpty: en ? 'No invoices match.' : 'Ingen fakturaer matcher.', invEmpty: shown.length === 0,
      invRows: shown.map(x => ({ key: 'ir' + x.id, id: x.id, type: x.type, number: x.number, date: x.date, name: x.name, amount: kr(x.amt), statusLabel: sl[x.status], statusStyle: pillSt(x.status),
        view: () => set({ invModal: { id: x.id, edit: false }, invDType: x.type, invDAmt: String(x.amt), invDDue: x.due, invDStatus: x.status }),
        edit: () => set({ invModal: { id: x.id, edit: true }, invDType: x.type, invDAmt: String(x.amt), invDDue: x.due, invDStatus: x.status }),
        del: () => set(s2 => ({ invDel: Object.assign({}, s2.invDel || {}, { [x.id]: true }) })) })),
      invAddOpen: !!v('invAddOpen', false), openInvAdd: () => set({ invAddOpen: true, invSent: false, invFilterOpen: false, invMoreOpen: false }), closeInvAdd: () => set({ invAddOpen: false }),
      invDetail: !!dRow, closeInvDetail: () => set({ invModal: null }),
      invDTitleHead: dRow ? dRow.id + ' · ' + dRow.type : '',
      invDName: dRow ? dRow.name : '', invDNumber: dRow ? dRow.number : '', invDDate: dRow ? dRow.date : '',
      invDRead: !(dm && dm.edit), invDEdit: !!(dm && dm.edit), invDToEdit: () => set({ invModal: Object.assign({}, dm, { edit: true }) }),
      invDType: draft('invDType', ''), invDAmt: draft('invDAmt', ''), invDDue: draft('invDDue', ''), invDStatus: draft('invDStatus', 'unpaid'),
      onInvDType: (e) => set({ invDType: e.target.value }), onInvDAmt: (e) => set({ invDAmt: e.target.value }), onInvDDue: (e) => set({ invDDue: e.target.value }), onInvDStatus: (e) => set({ invDStatus: e.target.value }),
      tInvDue: en ? 'Due date' : 'Forfallsdato',
      invStatusOpts: ['paid', 'unpaid', 'overdue'].map(k => ({ key: 'so' + k, id: k, name: sl[k] })),
      saveInvDetail: (e) => { e.preventDefault(); if (!dRow) return; set(s2 => ({ invOv: Object.assign({}, s2.invOv || {}, { [dRow.id]: { type: v('invDType', dRow.type), amt: parseInt(v('invDAmt', dRow.amt), 10) || dRow.amt, due: v('invDDue', dRow.due), status: v('invDStatus', dRow.status) } }), invModal: null })); },
      invSent: !!v('invSent', false),
      invSentText: (() => { const n = v('invSentN', totalCount); return en ? ('Invoice sent to ' + n + (n === 1 ? ' member.' : ' members.')) : ('Faktura sendt til ' + n + (n === 1 ? ' medlem.' : ' medlemmer.')); })(),
      invRecipients: totalCount + (en ? (totalCount === 1 ? ' recipient' : ' recipients') : (totalCount === 1 ? ' mottaker' : ' mottakere')),
      onInvScope: (e) => set({ invScope: e.target.value, invTarget: c.defaultTarget(e.target.value), invSent: false, invPQ: '', invEvQ: '', invDay: 0 }),
      tSendTo: en ? 'Send to' : 'Send til', tChosen: en ? 'Chosen' : 'Valgt',
      pickClub: c.scope === 'club', pickList: c.scope === 'person' || c.scope === 'group', pickEvent: c.scope === 'event',
      pickChosen: c.scope !== 'club' && !!chosen, chosenName: chosen ? chosen.name : '',
      pickHeading: c.scope === 'group' ? (en ? 'Choose training group' : 'Velg treningsgruppe') : (en ? 'Choose member' : 'Velg medlem'),
      tPickSearch: c.scope === 'group' ? (en ? 'Search training group' : 'Søk etter treningsgruppe') : (en ? 'Search member by name' : 'Søk etter medlem'),
      invPQ: v('invPQ', ''), onInvPQ: (e) => set({ invPQ: e.target.value }),
      pickRows: pickRows, pickEmpty: pickRows.length === 0, tInvNoMatch: en ? 'No matches.' : 'Ingen treff.',
      tPickEvent: en ? 'Or pick the event in the calendar' : 'Eller velg aktivitet i kalenderen',
      tEvSearchHead: en ? 'Search for the event' : 'Søk etter aktivitet', tEvSearchPh: en ? 'Event name' : 'Navn på aktivitet',
      invEvQ: v('invEvQ', ''), onInvEvQ: (e) => set({ invEvQ: e.target.value }),
      evHasQuery: evQ.length > 0, evResults: evResults, evResEmpty: evResults.length === 0,
      ivCalTitle: new Date(2026, calM - 1, 1).toLocaleDateString(en ? 'en-GB' : 'nb-NO', { month: 'long', year: 'numeric' }),
      ivCalPrev: () => set({ invCalM: Math.max(1, calM - 1), invDay: 0 }), ivCalNext: () => set({ invCalM: Math.min(12, calM + 1), invDay: 0 }),
      ivTPrev: en ? 'Previous month' : 'Forrige måned', ivTNext: en ? 'Next month' : 'Neste måned',
      ivCalHead: (en ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] : ['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø']).map((l, i) => ({ key: 'ch' + i, label: l })),
      ivCalCells: calCells, ivCalEvents: dayEvents, ivCalNoEvents: dayEvents.length === 0,
      ivTCalHint: invDay ? (en ? 'No events this day.' : 'Ingen aktiviteter denne dagen.') : (en ? 'Highlighted days have events. Click a day.' : 'Markerte dager har aktiviteter. Klikk på en dag.'),
      tManual: en ? 'Add people manually' : 'Legg til personer manuelt', tManualSearch: en ? 'Search a name to add' : 'Søk etter navn for å legge til',
      manualTop: (c.scope === 'person' || c.scope === 'group' || c.scope === 'event') ? 'padding-top: 18px; border-top: 1px solid rgba(22,36,26,.1)' : '',
      invManQ: v('invManQ', ''), onInvManQ: (e) => set({ invManQ: e.target.value }),
      manRes: manRes, manHasRes: manRes.length > 0, manChips: manChips, manHasChips: manChips.length > 0,
      tAddL: en ? 'Add' : 'Legg til', tRemoveL: en ? 'Remove' : 'Fjern',
      sendInvoice: (e) => {
        e.preventDefault();
        const tg = (c.invTargets.find(t => t.id === st.invTarget) || {}).name || '';
        const nm = c.scope === 'event' ? tg.replace(/ · .*$/, '') : tg;
        const n = (st.invNewList || []).length;
        const mk = (k, name, club) => ({ id: '#' + (3700 + n + k), club: club, type: st.invTitle || (en ? 'Invoice' : 'Faktura'), number: (200 + n + k) + '/10/2026', date: '2026-10-15', name: name, amt: parseInt(st.invAmount, 10) || 0, due: st.invDue, status: 'unpaid' });
        const rows = [mk(0, nm + (c.scope === 'club' || c.scope === 'group' ? ' (' + c.invCount + ')' : ''), c.invClub)].concat(manual.map((id, k) => { const m = allM.find(x => x.id === id); return mk(k + 1, m.name, m.club); }));
        set({ invSent: true, invSentN: totalCount, invTitle: '', invAddOpen: false, invManual: [], invManQ: '', invPQ: '', invNewList: rows.reverse().concat(st.invNewList || []) });
      }
    };
  }

  adminProfileVals(en, clubs) {
    const st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]);
    const first = v('apFirst', 'Sigrid'), last = v('apLast', 'Andersen'), full = first + ' ' + last;
    const ini = ((first[0] || '') + (last[0] || '')).toUpperCase();
    const email = v('apEmail', 'test@kretz.no'), phone = v('apPhone', '+47 900 12 345');
    const photo = v('apPhoto', '');
    const av = (n, f) => 'width: ' + n + 'px; height: ' + n + 'px; flex: 0 0 auto; border-radius: 999px; box-sizing: border-box; display: grid; place-items: center; background: ' + (photo ? 'url(' + photo + ') center / cover' : '#CDEFD3') + '; border: ' + (n > 60 ? '3' : '1') + 'px solid #74cd85; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: ' + f + 'px';
    const input = 'width: 100%; box-sizing: border-box; padding: 13px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 15px; outline: none';
    const sw = (on) => ({ track: 'flex: 0 0 auto; width: 48px; height: 28px; padding: 0; border: 0; border-radius: 999px; cursor: pointer; position: relative; transition: background .25s; background: ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.22)'),
      knob: 'position: absolute; top: 3px; left: ' + (on ? '23px' : '3px') + '; width: 22px; height: 22px; border-radius: 999px; background: #ffffff; box-shadow: 0 1px 4px rgba(22,36,26,.3); transition: left .25s' });
    const open = v('apOpen', '');
    const set = (o) => this.setState(o);
    const nSw = v('apNotif', {});
    const nDefs = [['posts', en ? 'New posts from members' : 'Nye innlegg fra medlemmer', true], ['signups', en ? 'Sign-ups to activities' : 'Påmeldinger til aktiviteter', true], ['declines', en ? 'Declined attendance' : 'Avmeldinger fra aktiviteter', false], ['invoices', en ? 'Overdue invoices' : 'Forfalte fakturaer', true], ['board', en ? 'Board meeting reminders' : 'Påminnelser om styremøter', true], ['deadlines', en ? 'Grant and report deadlines' : 'Frister for støtte og rapporter', true], ['booking', en ? 'New bookings' : 'Nye bookinger', false]];
    const bx = (id, title, sub) => ({ key: 'apb' + id, title: title, sub: sub, open: () => set({ apOpen: id, apAcctSaved: false, apPwOpen: false, apPwErr: '', apPwDone: false, apDFirst: first, apDLast: last, apDBirth: v('apBirth', '1984-03-14'), apDRegion: v('apRegion', 'Trøndelag') }) });
    const titles = { account: en ? 'Profile and account' : 'Profil og konto', security: en ? 'Security' : 'Sikkerhet', notifs: en ? 'Notifications' : 'Varsler', clubs: en ? 'Clubs I administer' : 'Klubber jeg administrerer', help: en ? 'Help centre' : 'Hjelpesenter', privacy: en ? 'Privacy and terms' : 'Personvern og vilkår' };
    const two = !!v('apTwo', false);
    const tw = sw(two);
    const langs = [['no', 'Norsk'], ['en', 'English']];
    return {
      initials: ini, firstName: first,
      goProfile: () => set({ tab: 'profile', navMenu: '', apOpen: '', apEdit: false, apContactSaved: false }),
      tMyProfile: en ? 'My profile' : 'Min profil',
      profChipStyle: 'display: flex; align-items: center; gap: 10px; width: 100%; box-sizing: border-box; padding: 6px 8px 6px 4px; border: 0; border-radius: 16px; text-align: left; cursor: pointer; font-family: var(--font-body); color: #16241a; transition: background .25s; background: ' + (st.tab === 'profile' ? 'rgba(22,36,26,.08)' : 'transparent'),
      apAvatar38: av(38, 13), apAvatar112: av(112, 36), apAvatarText: photo ? '' : ini, apHasPhoto: !!photo,
      apFullName: full, apRoleLine: (en ? 'Administrator · ' : 'Administrator · ') + clubs.length + (en ? ' clubs' : ' klubber'),
      showProfile: st.tab === 'profile',
      tChangePhoto: en ? 'Change photo' : 'Endre bilde', tRemovePhoto: en ? 'Remove photo' : 'Fjern bilde',
      apOnPhoto: (e) => {
        const f = e.target.files && e.target.files[0]; if (!f) return;
        const rd = new FileReader();
        rd.onload = () => { const img = new Image(); img.onload = () => { const side = 256, c = document.createElement('canvas'); c.width = c.height = side; const m = Math.min(img.width, img.height); c.getContext('2d').drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, side, side); set({ apPhoto: c.toDataURL('image/jpeg', 0.86) }); }; img.src = rd.result; };
        rd.readAsDataURL(f); e.target.value = '';
      },
      apRemovePhoto: () => set({ apPhoto: '' }),
      tContactInfo: en ? 'Contact information' : 'Kontaktinformasjon', tEmailL: en ? 'Email' : 'E-post', tPhoneL: en ? 'Phone number' : 'Telefonnummer',
      tEdit: en ? 'Edit' : 'Endre', tSaveL: en ? 'Save' : 'Lagre', tCancelL: en ? 'Cancel' : 'Avbryt', tContactSaved: en ? 'Contact information saved.' : 'Kontaktinformasjonen er lagret.',
      apEmail: email, apPhone: phone, apEditing: !!v('apEdit', false), apNotEditing: !v('apEdit', false), apContactSaved: !!v('apContactSaved', false),
      apDraftEmail: v('apDEmail', email), apDraftPhone: v('apDPhone', phone),
      apOnDraftEmail: (e) => set({ apDEmail: e.target.value }), apOnDraftPhone: (e) => set({ apDPhone: e.target.value }),
      apStartEdit: () => set({ apEdit: true, apDEmail: email, apDPhone: phone, apContactSaved: false }),
      apCancelEdit: () => set({ apEdit: false }),
      apSaveContact: (e) => { e.preventDefault(); set({ apEmail: v('apDEmail', email).trim(), apPhone: v('apDPhone', phone).trim(), apEdit: false, apContactSaved: true }); },
      apInput: input,
      apBoxes: [bx('account', titles.account, en ? 'Name, birth date, region and language' : 'Navn, fødselsdato, region og språk'), bx('security', titles.security, en ? 'Password and two-step verification' : 'Passord og tostegsverifisering'), bx('notifs', titles.notifs, en ? 'Choose what you are notified about' : 'Velg hva du får varsel om'), bx('clubs', titles.clubs, clubs.length + (en ? ' clubs' : ' klubber')), bx('help', titles.help, en ? 'Questions and support' : 'Spørsmål og støtte'), bx('privacy', titles.privacy, en ? 'How Kretz handles your data' : 'Slik behandler Kretz dataene dine')],
      tLangBtn: en ? 'Norsk' : 'English',
      apDetail: !!open, apDetailTitle: titles[open] || '', apCloseDetail: () => set({ apOpen: '' }),
      apIsAccount: open === 'account', apIsSecurity: open === 'security', apIsNotifs: open === 'notifs', apIsClubs: open === 'clubs', apIsHelp: open === 'help', apIsPrivacy: open === 'privacy',
      tFirst: en ? 'First name' : 'Fornavn', tLast: en ? 'Last name' : 'Etternavn', tBirth: en ? 'Date of birth' : 'Fødselsdato', tRegion: en ? 'Region in Norway' : 'Region i Norge', tLanguage: en ? 'Language' : 'Språk',
      apDFirst: v('apDFirst', first), apDLast: v('apDLast', last), apDBirth: v('apDBirth', v('apBirth', '1984-03-14')), apDRegion: v('apDRegion', v('apRegion', 'Trøndelag')),
      apOnDFirst: (e) => set({ apDFirst: e.target.value }), apOnDLast: (e) => set({ apDLast: e.target.value }), apOnDBirth: (e) => set({ apDBirth: e.target.value }), apOnDRegion: (e) => set({ apDRegion: e.target.value }),
      apRegions: ['Agder', 'Innlandet', 'Møre og Romsdal', 'Nordland', 'Oslo', 'Rogaland', 'Troms', 'Trøndelag', 'Vestfold og Telemark', 'Vestland', 'Østfold og Akershus'].map(r => ({ key: 'rg' + r, v: r })),
      apLangOpts: langs.map(l => ({ key: 'lg' + l[0], label: l[1], pick: () => set({ lang: l[0] }), style: 'cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 14px; padding: 10px 20px; border-radius: 999px; border: 1px solid ' + (st.lang === l[0] ? '#16241a' : 'rgba(22,36,26,.2)') + '; background: ' + (st.lang === l[0] ? '#16241a' : '#ffffff') + '; color: ' + (st.lang === l[0] ? '#f6f8f3' : '#16241a') })),
      apAcctSaved: !!v('apAcctSaved', false), tSavedShort: en ? 'Saved.' : 'Lagret.',
      apSaveAccount: (e) => { e.preventDefault(); set({ apFirst: v('apDFirst', first).trim() || first, apLast: v('apDLast', last).trim() || last, apBirth: v('apDBirth', ''), apRegion: v('apDRegion', 'Trøndelag'), apAcctSaved: true }); },
      apPwOpen: !!v('apPwOpen', false), apPwBtnLabel: v('apPwOpen', false) ? (en ? 'Cancel' : 'Avbryt') : (en ? 'Change password' : 'Endre passord'),
      apPwBtnStyle: 'justify-self: start; padding: 12px 22px; border-radius: 999px; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 14px; ' + (v('apPwOpen', false) ? 'border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a;' : 'border: 0; background: #16241a; color: #f6f8f3;'),
      apTogglePw: () => set({ apPwOpen: !v('apPwOpen', false), apPwCur: '', apPwNew: '', apPwRep: '', apPwErr: '', apPwDone: false }),
      tCurPw: en ? 'Current password' : 'Nåværende passord', tNewPw: en ? 'New password' : 'Nytt passord', tRepPw: en ? 'Repeat new password' : 'Gjenta nytt passord',
      apPwCur: v('apPwCur', ''), apPwNew: v('apPwNew', ''), apPwRep: v('apPwRep', ''), apPwErr: v('apPwErr', ''), apPwDone: !!v('apPwDone', false), tPwDone: en ? 'Password changed.' : 'Passordet er endret.',
      apOnPwCur: (e) => set({ apPwCur: e.target.value }), apOnPwNew: (e) => set({ apPwNew: e.target.value }), apOnPwRep: (e) => set({ apPwRep: e.target.value }),
      apSavePw: (e) => { e.preventDefault(); const n = v('apPwNew', ''), r = v('apPwRep', ''); if (v('apPwCur', '') !== v('apCurPass', '000000')) return set({ apPwErr: en ? 'The current password is wrong.' : 'Nåværende passord er feil.' }); if (n.length < 8) return set({ apPwErr: en ? 'The new password must be at least 8 characters.' : 'Nytt passord må være minst 8 tegn.' }); if (n !== r) return set({ apPwErr: en ? 'The passwords do not match.' : 'Passordene er ikke like.' }); set({ apCurPass: n, apPwOpen: false, apPwErr: '', apPwDone: true }); },
      tTwoStep: en ? 'Two-step verification' : 'Tostegsverifisering', tTwoStepSub: en ? 'Get a code by SMS when you log in.' : 'Få en kode på SMS når du logger inn.',
      apTwoOn: two, apTwoTrack: tw.track, apTwoKnob: tw.knob, apToggleTwo: () => set({ apTwo: !two }),
      tCodePhone: en ? 'Send the code to' : 'Send koden til', apTwoPhone: v('apTwoPhone', phone), apOnTwoPhone: (e) => set({ apTwoPhone: e.target.value }),
      apTwoNote: en ? 'You can use another number than your contact number.' : 'Du kan bruke et annet nummer enn kontaktnummeret ditt.',
      apNotifRows: nDefs.map(d => { const on = nSw[d[0]] === undefined ? d[2] : nSw[d[0]]; const x = sw(on); return { key: 'an' + d[0], label: d[1], on: on, track: x.track, knob: x.knob, toggle: () => set({ apNotif: Object.assign({}, nSw, { [d[0]]: !on }) }) }; }),
      apClubList: clubs.map(c => ({ key: 'ac' + c.id, name: c.name, initials: c.name.split(/\s+/).slice(0, 2).map(w => w.charAt(0)).join('') })), tAdminRole: 'Administrator',
      tHelpText: en ? 'Stuck, or missing something? Write to us and we will get back to you as soon as we can.' : 'Står du fast, eller mangler noe? Skriv til oss, så svarer vi så fort vi kan.',
      tPrivacyText: en ? 'Kretz stores club data on Norwegian servers. Only people the club gives access can see member data.' : 'Kretz lagrer klubbdata på norske servere. Bare de klubben gir tilgang kan se medlemsdata.',
      tTermsLink: en ? 'Terms of use for Kretz' : 'Vilkår for bruk av Kretz'
    };
  }

  renderVals() {
    const en = this.state.lang === 'en';
    const sel = this.state.club;
    const all = sel === 'all';
    const keep = (x) => all || x.club === sel;
    const clubs = this.clubs();
    const clubOf = (id) => (clubs.find(c => c.id === id) || {}).name || id;
    const shortNo = ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'];
    const shortEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const tab = this.state.tab;

    const acts = this.baseActs(en).concat(this.state.newActs).filter(keep)
      .sort((a, b) => a.m - b.m || a.day - b.day);
    const posts = this.state.newPosts.concat(this.basePosts(en)).filter(keep);
    const evColDefs = [
      { id: 'type', label: en ? 'Type' : 'Type', w: '56px' },
      { id: 'title', label: en ? 'Title' : 'Tittel', w: 'minmax(150px, 2fr)' },
      { id: 'date', label: en ? 'Start date' : 'Startdato', w: '112px' },
      { id: 'group', label: en ? 'Group' : 'Gruppe', w: 'minmax(110px, 1.2fr)' },
      { id: 'host', label: en ? 'Host' : 'Vert', w: 'minmax(110px, 1fr)' },
      { id: 'place', label: en ? 'Location' : 'Sted', w: 'minmax(100px, 1fr)' },
      { id: 'part', label: en ? 'Participants' : 'Deltakere', w: '96px', right: true }
    ];
    const evColsOn = Object.assign({ type: true, title: true, date: true, group: true, host: true, place: false, part: true }, this.state.evCols || {});
    const evCq = (this.state.evColQ || '').trim().toLowerCase();
    const evVisCols = evColDefs.filter(c => evColsOn[c.id]);
    const evSort = this.state.evSortS || { k: 'date', dir: 1 };
    const evIcons = { training: 'M21 12a9 9 0 1 1-3-6.7M21 4v5h-5', match: 'M5 21V4M5 4h11l-2 4 2 4H5', crew: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8', cup: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3', event: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4' };
    const evType = (t) => /trening|training|session|keeper|åpen hall|open hall/i.test(t) ? ['training', en ? 'Training' : 'Trening'] : /kamp|match/i.test(t) ? ['match', en ? 'Match' : 'Kamp'] : /dugnad|volunteer/i.test(t) ? ['crew', en ? 'Volunteer' : 'Dugnad'] : /turnering|tournament|cup/i.test(t) ? ['cup', en ? 'Tournament' : 'Turnering'] : ['event', en ? 'Event' : 'Arrangement'];
    const evAll = acts.map(a => {
      const yes = Object.keys(a.answers || {}).filter(k => (a.answers || {})[k] === 'yes').length;
      const signedN = (a.members && a.members.length) ? yes : a.signed;
      const ty = evType(a.title);
      return { id: a.id, icon: evIcons[ty[0]], typeLabel: ty[1], title: a.title, date: String(a.day).padStart(2, '0') + '.' + String(a.m).padStart(2, '0') + '.2026', sortDate: a.m * 100 + a.day, group: (a.to || []).join(', ') || '–', host: a.leader, place: a.place, part: String(signedN), partN: signedN, club: a.club,
        open: () => this.setState({ event: a.id, answerFilter: 'all' }) };
    });
    const evQl = (this.state.evQ || '').trim().toLowerCase();
    const evFiltered = evAll.filter(r => !evQl || (r.title + ' ' + r.group + ' ' + r.host + ' ' + r.place + ' ' + r.typeLabel).toLowerCase().includes(evQl)).sort((x, y) => {
      const k = evSort.k;
      const v = (r) => k === 'date' ? r.sortDate : k === 'part' ? r.partN : k === 'type' ? r.typeLabel : String(r[k] || '').toLowerCase();
      return (v(x) > v(y) ? 1 : v(x) < v(y) ? -1 : 0) * evSort.dir;
    });
    const evShowAll = !!this.state.evAllRows;
    const evPerPage = [15, 25, 50, 100, 250].indexOf(this.state.evPer) !== -1 ? this.state.evPer : 15;
    const evPageCount = Math.max(1, Math.ceil(evFiltered.length / evPerPage));
    const evPageN = Math.min(this.state.evPage || 1, evPageCount);
    const evPageRows = evShowAll ? evFiltered : evFiltered.slice((evPageN - 1) * evPerPage, evPageN * evPerPage);

    const mem = this.members(en).filter(keep);

    const chip = (active, dark) => 'cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 13px; padding: 9px 16px; border-radius: 999px; white-space: nowrap; transition: background .3s, color .3s, border-color .3s;'
      + (active
        ? (dark ? ' background: #a3e2ae; border: 1px solid #a3e2ae; color: #16241a;' : ' background: #16241a; border: 1px solid #16241a; color: #f6f8f3;')
        : (dark ? ' background: rgba(246,248,243,.1); border: 1px solid rgba(246,248,243,.26); color: #f6f8f3;' : ' background: #ffffff; border: 1px solid rgba(22,36,26,.16); color: #16241a;'));

    const navItem = (active) => 'display: flex; align-items: center; width: 100%; box-sizing: border-box; text-align: left; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 15px; padding: 12px 16px; border-radius: 12px; border: 0; transition: background .2s, color .2s;' + (active ? ' background: #1d3a24; color: #f6f8f3;' : ' background: transparent; color: #16241a;');
    const tabs = [
      { id: 'finance', label: en ? 'Finance' : 'Økonomi' },
      { id: 'daily', label: en ? 'Activities' : 'Aktiviteter' },
      { id: 'members', label: en ? 'Members' : 'Medlemmer' },
      { id: 'booking', label: 'Booking' },
      { id: 'sponsors', label: en ? 'Sponsors' : 'Sponsorer' },
      { id: 'timetable', label: en ? 'Week plan' : 'Ukeplan' },
      { id: 'depts', label: en ? 'Departments and groups' : 'Avdelinger og grupper' },
      { id: 'roles', label: en ? 'Roles' : 'Roller' },
      { id: 'board', label: en ? 'Board' : 'Styret' },
      { id: 'comms', label: en ? 'Communication' : 'Kommunikasjon' },
      { id: 'docs', label: en ? 'Documents and history' : 'Dokumenter og historikk' },
      { id: 'volunteer', label: en ? 'Volunteer days' : 'Dugnader' }
    ];
    const menus = {
      finance: {
        label: en ? 'Finance' : 'Økonomi',
        subs: [
          { id: 'teamfund', label: en ? 'Team fund' : 'Lagkasse', note: en ? 'Bank balance and transactions' : 'Saldo og bankbevegelser' },
          { id: 'invoicing', label: en ? 'Member invoicing' : 'Medlem fakturering', note: en ? 'Send invoices to members' : 'Send faktura til medlemmer' },
          { id: 'supplier', label: en ? 'Supplier invoices' : 'Leverandørfaktura', note: en ? 'Invoices the club must pay' : 'Fakturaer klubben skal betale' },
          { id: 'sponsors', label: en ? 'Sponsors' : 'Sponsorer', note: en ? 'Agreements, grants and funding' : 'Avtaler, støtte og midler' },
          { id: 'budget', label: en ? 'Budget' : 'Budsjett', note: en ? 'Budget versus actuals' : 'Budsjett mot regnskap' },
          { id: 'integr', label: en ? 'Integrations' : 'Integrasjoner', note: en ? 'Connect accounting, payment and bank' : 'Koble regnskap, betaling og bank' }
        ]
      },
      people: {
        label: en ? 'Members and teams' : 'Medlemmer og lag',
        subs: [
          { id: 'members', label: en ? 'Members' : 'Medlemmer', note: en ? 'Profiles, attendance and notes' : 'Profiler, oppmøte og notater' },
          { id: 'depts', label: en ? 'Departments and groups' : 'Avdelinger og grupper', note: en ? 'Sports, teams and who leads them' : 'Idretter, lag og hvem som leder dem' },
          { id: 'roles', label: en ? 'Roles' : 'Roller', note: en ? 'Who does what, and what they can access' : 'Hvem gjør hva, og hva de har tilgang til' },
          { id: 'board', label: en ? 'Board' : 'Styret', note: en ? 'Board meetings, files and decisions' : 'Styremøter, filer og vedtak' }
        ]
      },
      followup: {
        label: en ? 'Events' : 'Arrangementer',
        subs: [
          { id: 'daily', label: en ? 'Activities' : 'Aktiviteter', note: en ? 'Events, sign-ups and posts' : 'Arrangementer, påmelding og innlegg' },
          { id: 'planning', label: en ? 'Planning' : 'Planlegging', note: en ? 'Season plan and projects' : 'Sesongplan og prosjekter' },
          { id: 'volunteer', label: en ? 'Volunteer days' : 'Dugnader', note: en ? 'QR check-in and volunteer hours' : 'QR-oppmøte og dugnadstimer' }
        ]
      }
    };
    const navDefs = [
      { menu: 'finance' },
      { menu: 'people' },
      { menu: 'followup' },
      { id: 'comms', label: en ? 'Communication' : 'Kommunikasjon' },
      { id: 'docs', label: en ? 'Documents and history' : 'Dokumenter og historikk' },
      { id: 'booking', label: 'Booking' },
      { id: 'timetable', label: en ? 'Week plan' : 'Ukeplan' }
    ];

    const totalSigned = acts.reduce((n, a) => n + a.signed, 0);
    const openShifts = acts.reduce((n, a) => n + Math.max(0, a.cap - a.signed), 0);
    const dueCount = mem.reduce((n, m) => n + m.due, 0);

    const tfAccounts = bankAccounts();
    const tfAcc = (id) => tfAccounts[id] ? tfAccounts[id].bank + ' · ' + tfAccounts[id].no : '';
    const tfToday = '2026-09-24';
    const tfBounds = this.state.tfPeriod === 'year' ? ['2026-01-01', tfToday]
      : this.state.tfPeriod === 'week' ? ['2026-09-21', tfToday]
      : this.state.tfPeriod === 'custom' ? [this.state.tfFrom || '2000-01-01', this.state.tfTo || tfToday]
      : ['2026-09-01', tfToday];
    const sgn = (n, fmt) => { const r = Math.round(n) || 0; return (r > 0 ? '+ ' : (r < 0 ? '− ' : '')) + fmt(Math.abs(r)); };
    const ttAll = this.ttData();
    const ttClubId = (clubs.find(c => c.id === this.state.ttClub) || clubs.find(c => c.id === sel) || clubs[0]).id;
    const ttC = ttAll[ttClubId] || { groups: [], s: [] };
    const ttGroups = ttC.groups || [];
    const ttSessions = ttC.s || [];
    const ttDefaultPlace = (ttSessions[0] && ttSessions[0][4]) || '';
    const ttE = this.state.ttEdit;
    const ttDayNames = en ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] : ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    const ttMin = (t) => { const p = String(t).split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); };
    const ttAx = (() => {
      const pxMin = 56 / 60, gapPx = 18;
      const ranges = ttSessions.map(x => [Math.floor(ttMin(x[1]) / 60) * 60, Math.ceil(ttMin(x[2]) / 60) * 60]).sort((p, q) => p[0] - q[0]);
      const segs = [];
      ranges.forEach(r => { const l = segs[segs.length - 1]; if (l && r[0] <= l[1]) l[1] = Math.max(l[1], r[1]); else segs.push([r[0], r[1]]); });
      if (!segs.length) segs.push([16 * 60, 20 * 60]);
      const tops = []; let acc = 0;
      segs.forEach((g, i) => { tops.push(acc); acc += (g[1] - g[0]) * pxMin + (i < segs.length - 1 ? gapPx : 0); });
      const yOf = (m) => { for (let i = 0; i < segs.length; i++) if (m >= segs[i][0] && m <= segs[i][1]) return tops[i] + (m - segs[i][0]) * pxMin; return 0; };
      const mOf = (y) => {
        if (y <= 0) return segs[0][0];
        for (let i = 0; i < segs.length; i++) {
          const top = tops[i], len = (segs[i][1] - segs[i][0]) * pxMin;
          if (y <= top + len) return segs[i][0] + (y - top) / pxMin;
          if (i < segs.length - 1 && y < tops[i + 1]) return (y - (top + len)) < (tops[i + 1] - y) ? segs[i][1] : segs[i + 1][0];
        }
        return segs[segs.length - 1][1];
      };
      const hours = [];
      segs.forEach((g, i) => {
        const brk = i < segs.length - 1;
        for (let m = g[0]; m <= g[1]; m += 60) {
          const y = yOf(m);
          hours.push({ key: 'th' + i + '-' + m, label: brk && m === g[1] ? '' : String(m / 60).padStart(2, '0') + ':00', top: y + 'px', lineStyle: 'position: absolute; left: 0; right: 0; top: ' + y + 'px; border-top: 1px dashed rgba(22,36,26,.1)' });
        }
        if (brk) {
          const y = tops[i] + (g[1] - g[0]) * pxMin + gapPx / 2;
          hours.push({ key: 'tb' + i, label: '', top: y + 'px', lineStyle: 'position: absolute; left: 0; right: 0; top: ' + (y - 3) + 'px; height: 6px; background: repeating-linear-gradient(135deg, rgba(22,36,26,.1) 0 3px, transparent 3px 7px); border-radius: 4px' });
        }
      });
      return { yOf: yOf, mOf: mOf, total: acc, hours: hours };
    })();
    const ttFmt = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(Math.round(m % 60)).padStart(2, '0');
    const ttDg = this.state.ttDrag;
    const ttCols = ttDayNames.map((nm, di) => {
      const day = ttSessions.map((x, idx) => ({ x: x, idx: idx, a: ttMin(x[1]), b: ttMin(x[2]) })).filter(e => e.x[0] === di).sort((p, q) => p.a - q.a);
      const laneEnd = [];
      day.forEach(e => { let l = laneEnd.findIndex(end => end <= e.a); if (l === -1) { l = laneEnd.length; laneEnd.push(e.b); } else laneEnd[l] = e.b; e.lane = l; });
      day.forEach(e => { e.lanes = Math.max(1, day.filter(o => o.a < e.b && o.b > e.a).reduce((m, o) => Math.max(m, o.lane + 1), 1)); });
      return {
        key: 'tc' + ttClubId + di,
        day: String(di),
        bg: ttDg && ttDg.day === di ? 'rgba(116,205,133,.18)' : (di >= 5 ? 'rgba(255,214,110,.1)' : '#f7f9f5'),
        addHere: () => this.setState({ ttEdit: { idx: -1, d: di, a: '17:00', b: '18:30', g: (ttGroups[0] || {}).id || '', p: ttDefaultPlace, err: '' } }),
        items: day.map(e => {
          const g = ttGroups.find(q => q.id === e.x[3]) || { no: e.x[3], en: e.x[3], color: '#c9d8c4' };
          const gname = en ? (g.en || g.no) : (g.no || g.en);
          const w = 100 / e.lanes;
          const dragging = !!(ttDg && ttDg.idx === e.idx && ttDg.moved);
          return {
            key: 'ti' + ttClubId + e.idx,
            group: gname,
            time: dragging ? ttFmt(ttDg.a) + '–' + ttFmt(ttDg.b) : e.x[1] + '–' + e.x[2],
            down: (ev) => {
              if (ev.button !== undefined && ev.button !== 0) return;
              try { ev.currentTarget.setPointerCapture(ev.pointerId); } catch (err) {}
              this._ttDrag = { idx: e.idx, x0: ev.clientX, y0: ev.clientY, a: e.a, b: e.b, d: e.x[0], moved: false };
            },
            place: e.x[4],
            tip: gname + ' · ' + nm + ' ' + e.x[1] + '–' + e.x[2] + ' · ' + e.x[4],
            edit: () => { if (this._ttSkipClick) return; this.setState({ ttEdit: { idx: e.idx, d: e.x[0], a: e.x[1], b: e.x[2], g: e.x[3], p: e.x[4], err: '' } }); },
            style: 'position: absolute; box-sizing: border-box; overflow: hidden; text-align: left; cursor: ' + (dragging ? 'grabbing' : 'grab') + '; touch-action: none; user-select: none;'
              + (dragging ? ' transform: translate(' + ttDg.dx + 'px, ' + (ttAx.yOf(ttDg.a) - ttAx.yOf(e.a)) + 'px); z-index: 5; opacity: .92;' : '')
              + '  border: 0; padding: 5px 7px; border-radius: 10px; font-family: var(--font-body); color: #16241a; '
              + 'top: ' + (ttAx.yOf(e.a) + 1).toFixed(1) + 'px; height: ' + (ttAx.yOf(e.b) - ttAx.yOf(e.a) - 2).toFixed(1) + 'px; '
              + 'left: calc(' + (e.lane * w).toFixed(2) + '% + 2px); width: calc(' + w.toFixed(2) + '% - 4px); '
              + 'background: ' + g.color + '; box-shadow: ' + (dragging ? '0 14px 30px rgba(22,36,26,.3)' : '0 4px 10px rgba(22,36,26,.12)') + '; transition: ' + (dragging ? 'none' : 'box-shadow .2s, transform .2s')
          };
        })
      };
    });
    const tfKr = (n) => 'kr ' + Math.round(n).toLocaleString('nb-NO').replace(/\u00a0/g, ' ');
    const tfPeriodDefs = [
      { id: 'year', label: en ? 'This year' : 'I år' },
      { id: 'month', label: en ? 'This month' : 'Denne måneden' },
      { id: 'week', label: en ? 'This week' : 'Denne uken' },
      { id: 'custom', label: en ? 'Set period' : 'Velg periode' }
    ];
    const tfAll = transactions(en);
    (() => {
      const plan = yearPlan();
      const size = { vif: 42000, fana: 31000, varden: 16000 };
      const words = txWords(en);
      const parties = txParties();
      let seq = 30000;
      const jitter = (k) => 0.85 + ((k * 37) % 30) / 100;
      ['vif', 'fana', 'varden'].forEach((club, ci) => {
        plan.forEach(p => {
          const mm = String(p.m).padStart(2, '0');
          const addRows = (list, sign) => list.forEach((pair, j) => {
            seq += 7;
            const day = Math.min(p.m === 9 ? 20 : 27, 3 + ((ci * 5 + j * 9 + p.m * 3) % 24));
            const w = words[pair[0]];
            tfAll.push({
              d: '2026-' + mm + '-' + String(day).padStart(2, '0'),
              tx: 'TX-' + seq,
              inv: sign > 0 ? 'F-2026-' + String(seq % 10000).padStart(4, '0') : 'L-' + String(seq % 10000).padStart(4, '0'),
              desc: w[(j + p.m) % w.length],
              party: parties[pair[0]][club],
              club: club,
              cat: pair[0],
              n: sign * Math.round(size[club] * pair[1] * jitter(seq) / 100) * 100
            });
          });
          addRows(p.inc, 1);
          addRows(p.exp, -1);
        });
      });
      tfAll.sort((a, b) => a.d < b.d ? 1 : (a.d > b.d ? -1 : 0));
    })();
    const tfFmt = (iso) => { const p = iso.split('-'); return p[2] + '.' + p[1] + '.' + p[0]; };
    const tfRangeLabel = tfFmt(tfBounds[0]) + ' – ' + tfFmt(tfBounds[1]);
    const tfCatOf = txCategories();
    const tfClubRows = tfAll.filter(keep);
    const tfInPeriod = tfClubRows.filter(t => t.d >= tfBounds[0] && t.d <= tfBounds[1]);
    const tfOpening = all ? 412000 : (sel === 'vif' ? 188000 : (sel === 'fana' ? 146000 : 78000));
    const tfBefore = tfClubRows.filter(t => t.d < tfBounds[0]).reduce((n, t) => n + t.n, 0);
    const tfStart = tfOpening + tfBefore - tfClubRows.filter(t => t.d < '2026-01-01').reduce((n, t) => n + t.n, 0);
    const tfIn = tfInPeriod.filter(t => t.n > 0).reduce((n, t) => n + t.n, 0);
    const tfOut = Math.abs(tfInPeriod.filter(t => t.n < 0).reduce((n, t) => n + t.n, 0)) || 0;
    const tfInN = tfInPeriod.filter(t => t.n > 0).length;
    const tfOutN = tfInPeriod.filter(t => t.n < 0).length;
    const tfChange = tfIn - tfOut;
    const tfEnd = tfStart + tfChange;
    const tfNow = tfOpening + tfClubRows.filter(t => t.d >= '2026-01-01' && t.d <= tfToday).reduce((n, t) => n + t.n, 0);
    const tfQ = this.state.tfQ.trim().toLowerCase();
    const tfRows = tfInPeriod
      .filter(t => !tfQ || [tfFmt(t.d), t.tx, t.inv, t.desc, t.party].join(' ').toLowerCase().includes(tfQ))
      .map((t, i) => ({
        key: 'tr' + t.tx,
        date: tfFmt(t.d),
        tx: t.tx,
        inv: t.inv,
        desc: t.desc,
        club: clubOf(t.club),
        acc: tfAccounts[t.club] ? tfAccounts[t.club].no : '',
        hasClub: all,
        party: t.party,
        sum: (t.n >= 0 ? '+ ' : '− ') + tfKr(Math.abs(t.n)),
        sumStyle: 'text-align: right; font-family: var(--font-heading); font-weight: 800; white-space: nowrap; color: ' + (t.n >= 0 ? '#1f7a3a' : '#16241a')
      }));
    const tfPs = this.state.tfPageSize || 50;
    const tfPages = Math.max(1, Math.ceil(tfRows.length / tfPs));
    const tfPg = Math.min(this.state.tfPage || 0, tfPages - 1);
    const tfPageRows = tfRows.slice(tfPg * tfPs, tfPg * tfPs + tfPs);
    const tfFrom1 = tfRows.length ? tfPg * tfPs + 1 : 0;
    const tfTo1 = Math.min(tfRows.length, tfPg * tfPs + tfPs);
    const tColsE = {
      date: en ? 'Date' : 'Dato', tx: en ? 'Transaction no.' : 'Transaksjonsnr.', inv: en ? 'Invoice no.' : 'Fakturanr.',
      acc: en ? 'Receiving account' : 'Mottakerkonto',
      desc: en ? 'Description' : 'Beskrivelse', club: en ? 'Club' : 'Klubb', party: en ? 'Customer/supplier' : 'Kunde/leverandør', sum: en ? 'Sum (NOK)' : 'Sum (kr)'
    };
    const tfExport = tfInPeriod
      .filter(t => !tfQ || [tfFmt(t.d), t.tx, t.inv, t.desc, t.party].join(' ').toLowerCase().includes(tfQ))
      .map(t => ({
        date: tfFmt(t.d), tx: t.tx, inv: t.inv, desc: t.desc, club: clubOf(t.club), party: t.party,
        acc: tfAccounts[t.club] ? tfAccounts[t.club].no : '',
        amount: t.n, sumText: (t.n >= 0 ? '+ ' : '− ') + tfKr(Math.abs(t.n))
      }));
    const pgRaw = tfExport.slice(tfPg * tfPs, tfPg * tfPs + tfPs);
    const pgNewer = tfExport.slice(0, tfPg * tfPs).reduce((n, r) => n + r.amount, 0);
    const pgIn = pgRaw.filter(r => r.amount > 0).reduce((n, r) => n + r.amount, 0);
    const pgOut = Math.abs(pgRaw.filter(r => r.amount < 0).reduce((n, r) => n + r.amount, 0)) || 0;
    const pgInN = pgRaw.filter(r => r.amount > 0).length;
    const pgOutN = pgRaw.filter(r => r.amount < 0).length;
    const pgEnd = tfEnd - pgNewer;
    const pgChange = pgIn - pgOut;
    const pgStart = pgEnd - pgChange;
    const pgRange = tfRows.length ? (tfFrom1 + '–' + tfTo1) : '0';
    const pgNoteSuffix = (en ? ' · rows ' : ' · rad ') + pgRange;
    const tfFileBase = 'kretz-lagkasse-' + (all ? 'alle-klubber' : sel) + '-' + tfBounds[0] + '_' + tfBounds[1];
    const tfClubName = all ? (en ? 'All clubs' : 'Alle klubber') : clubOf(sel);
    const tfAccLine = all
      ? (en ? 'Accounts: ' : 'Kontoer: ') + Object.keys(tfAccounts).map(k => clubOf(k) + ' ' + tfAccounts[k].no).join(', ')
      : (en ? 'Account: ' : 'Konto: ') + tfAcc(sel);
    const tfTitle = (en ? 'Team fund — transactions' : 'Lagkasse — transaksjoner') + ' · ' + (all ? (en ? 'All clubs' : 'Alle klubber') : clubOf(sel));
    const tfSubtitle = tfRangeLabel + (tfQ ? (en ? ' · search: "' : ' · søk: «') + this.state.tfQ.trim() + (en ? '"' : '»') : '') + ' · ' + tfExport.length + (en ? ' entries' : ' posteringer');
    const tfSummary = [
      { label: en ? 'Balance at start' : 'Saldo ved periodestart', value: tfKr(tfStart) },
      { label: en ? 'Incoming' : 'Innkommende', value: sgn(tfIn, tfKr) },
      { label: en ? 'Outgoing' : 'Utgående', value: sgn(-tfOut, tfKr) },
      { label: en ? 'Balance at end' : 'Saldo ved periodeslutt', value: tfKr(tfEnd) }
    ];
    const resKr = (n) => 'kr ' + Math.round(n).toLocaleString('nb-NO').replace(/\u00a0/g, ' ');
    const resScale = all ? 1 : (sel === 'vif' ? 0.46 : (sel === 'fana' ? 0.34 : 0.2));
    const resBase = resultSeries();
    const resNamesNo = ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'];
    const resNamesEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const resFromTx = tab === 'teamfund';
    const resVals = resFromTx
      ? resBase.map((_, i) => {
          const mm = String(i + 1).padStart(2, '0');
          const rows = tfInPeriod.filter(t => t.d.slice(0, 7) === '2026-' + mm);
          if (!rows.length) return null;
          return [rows.filter(t => t.n > 0).reduce((n, t) => n + t.n, 0), -rows.filter(t => t.n < 0).reduce((n, t) => n + t.n, 0)];
        })
      : resBase.map(v => v ? [v[0] * resScale, v[1] * resScale] : null);
    const resMax = Math.max.apply(null, [1].concat(resVals.filter(Boolean).map(v => Math.max(v[0], v[1]))));
    const resNice = [1000, 2000, 5000, 10000, 20000, 25000, 50000];
    const resStep = resNice.find(n => n * 5 >= resMax) || 50000;
    const resTop = resStep * 5;
    const resYear = resVals.filter(Boolean).reduce((n, v) => n + v[0] - v[1], 0);
    const resTicks = [];
    for (let k = 5; k >= -5; k--) {
      const v = k * resStep;
      const top = ((5 - k) / 10 * 100).toFixed(2) + '%';
      resTicks.push({
        key: 'rt' + k,
        label: (v > 0 ? '' : (v < 0 ? '−' : '')) + Math.abs(v).toLocaleString('nb-NO').replace(/\u00a0/g, ' '),
        labelStyle: 'position: absolute; right: 10px; top: ' + top + '; transform: translateY(-50%); font-size: 11px; color: rgba(22,36,26,.72); white-space: nowrap;' + (k === 0 ? ' font-weight: 800; color: #16241a;' : ''),
        lineStyle: 'position: absolute; left: 0; right: 0; top: ' + top + '; height: 0; ' + (k === 0 ? 'border-top: 2px solid rgba(22,36,26,.55);' : 'border-top: 1px dashed rgba(22,36,26,.12);')
      });
    }
    const resHov = this.state.resHover;
    const pM0 = parseInt(tfBounds[0].slice(5, 7), 10) - 1;
    const pM1 = parseInt(tfBounds[1].slice(5, 7), 10) - 1;
    const pY0 = tfBounds[0].slice(0, 4), pY1 = tfBounds[1].slice(0, 4);
    const inP = (i) => (pY0 < '2026' || (pY0 === '2026' && i >= pM0)) && (pY1 > '2026' || (pY1 === '2026' && i <= pM1));
    const resPeriod = resFromTx ? tfInPeriod.reduce((n, t) => n + t.n, 0) : resVals.reduce((n, v, i) => n + (v && inP(i) ? v[0] - v[1] : 0), 0);
    const resMonths = resVals.map((v, i) => ({
      key: 'rm' + i,
      enter: () => { if (v) this.setState({ resHover: i }); },
      incBg: resHov === i ? 'rgba(31,122,58,.55)' : 'rgba(31,122,58,.3)',
      expBg: resHov === i ? 'rgba(236,48,19,.5)' : 'rgba(236,48,19,.26)',
      label: en ? resNamesEn[i] : resNamesNo[i],
      incH: v ? (v[0] / resTop * 50).toFixed(2) + '%' : '0%',
      expH: v ? (v[1] / resTop * 50).toFixed(2) + '%' : '0%',
      opacity: !v ? '.3' : (resFromTx || inP(i) ? '1' : '.32'),
      title: v
        ? (en ? resNamesEn[i] : resNamesNo[i]) + ' — ' + (en ? 'Income ' : 'Inntekt ') + resKr(v[0]) + ' · ' + (en ? 'Expenses ' : 'Utgift ') + resKr(v[1]) + ' · ' + (en ? 'Result ' : 'Resultat ') + (v[0] - v[1] >= 0 ? '+ ' : '− ') + resKr(Math.abs(v[0] - v[1]))
        : (resFromTx ? (en ? 'No transactions in the period' : 'Ingen transaksjoner i perioden') : (en ? 'No figures yet' : 'Ingen tall ennå'))
    }));
    const resPts = [];
    resVals.forEach((v, i) => { if (v) resPts.push([(i + 0.5) * 100, 170 - ((v[0] - v[1]) / resTop) * 170]); });
    const resWave = this.smoothPath(resPts);
    const resDots = resVals.map((v, i) => v ? ({
      key: 'rd' + i,
      left: ((i + 0.5) / 12 * 100).toFixed(2) + '%',
      top: (50 - ((v[0] - v[1]) / resTop) * 50).toFixed(2) + '%',
      size: resHov === i ? '14px' : '10px'
    }) : null).filter(Boolean);
    const resTipV = resHov >= 0 ? resVals[resHov] : null;
    const resTip = resTipV ? {
      left: ((resHov + 0.5) / 12 * 100).toFixed(2) + '%',
      shift: resHov <= 1 ? '-10%' : (resHov >= 10 ? '-90%' : '-50%'),
      month: (en ? ['January','February','March','April','May','June','July','August','September','October','November','December'] : ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'])[resHov] + ' 2026',
      inc: resKr(resTipV[0]),
      exp: resKr(resTipV[1]),
      res: sgn(resTipV[0] - resTipV[1], resKr),
      resColor: resTipV[0] - resTipV[1] >= 0 ? '#a3e2ae' : '#ff9a86'
    } : null;
    const rowTabs = ['booking', 'sponsors', 'messages'];
    const pill = (kind) => {
      const base = 'flex: 0 0 auto; padding: 7px 13px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap; ';
      if (kind === 'due') return base + 'background: #7c4dcf; color: #ffffff;';
      if (kind === 'ok') return base + 'background: rgba(116,205,133,.32); color: #16241a;';
      if (kind === 'warn') return base + 'background: rgba(255,201,74,.34); color: #7a5406;';
      return base + 'background: rgba(22,36,26,.08); color: rgba(22,36,26,.75);';
    };
    const fmtDate = (iso) => {
      const p = String(iso || '').split('-');
      return p.length === 3 ? (p[2] + '.' + p[1] + '.' + p[0]) : String(iso || '');
    };
    const expandTo = (list, clubId) => {
      const out = [];
      list.forEach(x => {
        if (x.indexOf('m:') === 0) { if (out.indexOf(x.slice(2)) === -1) out.push(x.slice(2)); return; }
        if (x.indexOf('g:') === 0) {
          this.members(en).filter(m => m.club === clubId && m.group === x.slice(2))
            .forEach(m => { if (out.indexOf(m.id) === -1) out.push(m.id); });
        }
      });
      return out;
    };
    const labelTo = (list, clubId) => list.map(x => {
      if (x.indexOf('g:') === 0) return x.slice(2);
      const m = this.members(en).find(y => y.id === x.slice(2));
      return m ? m.name : x.slice(2);
    });

    const demoBase = demoMembers();
    const demoShare = all ? 1 : (sel === 'vif' ? 284 / 612 : (sel === 'fana' ? 221 / 612 : 107 / 612));
    const demoTarget = all ? 612 : (sel === 'vif' ? 284 : (sel === 'fana' ? 221 : 107));
    const demo = demoBase.map(d => ({ label: d.label, g: Math.round(d.g * demoShare), b: Math.round(d.b * demoShare) }));
    const demoDiff = demoTarget - demo.reduce((n, d) => n + d.g + d.b, 0);
    if (demoDiff !== 0) {
      const big = demo.reduce((a, d) => (d.g + d.b) > (a.g + a.b) ? d : a, demo[0]);
      big.b = Math.max(0, big.b + demoDiff);
    }
    const girlsSum = demo.reduce((n, d) => n + d.g, 0);
    const boysSum = demo.reduce((n, d) => n + d.b, 0);
    const totalMembers = girlsSum + boysSum;
    const maxRaw = Math.max.apply(null, demo.map(d => Math.max(d.g, d.b)));
    const tickStep = maxRaw > 60 ? 30 : (maxRaw > 30 ? 15 : (maxRaw > 12 ? 5 : 2));
    const maxBand = Math.max(tickStep, Math.ceil(maxRaw / tickStep) * tickStep);
    const ageTicks = [];
    for (let v = maxBand; v >= 0; v -= tickStep) ageTicks.push({ key: 'at' + v, label: String(v) });
    const ageRows = demo.map((d, i) => ({
      key: 'ab' + i,
      label: d.label,
      girlsH: (d.g / maxBand * 100).toFixed(1) + '%',
      boysH: (d.b / maxBand * 100).toFixed(1) + '%',
      girlsTitle: (en ? 'Girls ' : 'Jenter ') + d.g,
      boysTitle: (en ? 'Boys ' : 'Gutter ') + d.b,
      total: String(d.g + d.b)
    }));
    const mids = [7.5, 11, 14, 17.5, 29.5, 48];
    const avgAge = Math.round(demo.reduce((n, d, i) => n + (d.g + d.b) * mids[i], 0) / totalMembers);
    const largest = demo.reduce((a, d) => (d.g + d.b) > (a.g + a.b) ? d : a, demo[0]);

    const formToList = this.state.formTo;
    const recipientOptions = this.groupsOf(this.state.formClub, en).map((g, i) => ({ id: 'g:' + g, name: g, key: 'ro' + i }))
      .concat(this.members(en).filter(m => m.club === this.state.formClub).map(m => ({ id: 'm:' + m.id, name: m.name, key: 'rm' + m.id })))
      .map(o => ({
        key: o.key,
        label: o.name,
        toggle: () => this.setState(st => ({
          formTo: st.formTo.indexOf(o.id) === -1 ? st.formTo.concat([o.id]) : st.formTo.filter(x => x !== o.id)
        })),
        style: 'cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; padding: 8px 15px; border-radius: 999px; white-space: nowrap; transition: background .3s, color .3s, border-color .3s;'
          + (formToList.indexOf(o.id) !== -1
            ? ' background: #16241a; border: 1px solid #16241a; color: #f6f8f3;'
            : ' background: #ffffff; border: 1px solid rgba(22,36,26,.16); color: #16241a;')
      }));

    const openEvent = this.baseActs(en).concat(this.state.newActs).find(a => a.id === this.state.event) || null;
    const answerTag = (v) => v === 'yes'
      ? { text: en ? 'coming' : 'kommer', kind: 'ok' }
      : (v === 'no' ? { text: en ? 'cannot' : 'kan ikke', kind: 'neutral' } : { text: en ? 'no answer' : 'ikke svart', kind: 'warn' });
    const yesCount = openEvent ? Object.keys(openEvent.answers || {}).filter(k => openEvent.answers[k] === 'yes').length : 0;
    const answerOf = (id) => ((openEvent || {}).answers || {})[id] || '';
    const answerCounts = {
      all: openEvent ? (openEvent.members || []).length : 0,
      yes: openEvent ? (openEvent.members || []).filter(id => answerOf(id) === 'yes').length : 0,
      no: openEvent ? (openEvent.members || []).filter(id => answerOf(id) === 'no').length : 0,
      none: openEvent ? (openEvent.members || []).filter(id => !answerOf(id)).length : 0
    };
    const af = this.state.answerFilter;
    const eventAnswers = openEvent ? (openEvent.members || []).filter(id => {
      if (af === 'all') return true;
      if (af === 'none') return !answerOf(id);
      return answerOf(id) === af;
    }).map(id => {
      const m = this.members(en).find(x => x.id === id) || { name: id, group: '', role: '' };
      const tg = answerTag((openEvent.answers || {})[id] || '');
      return {
        key: 'ea' + id,
        name: m.name,
        initials: m.name.split(/\s+/).slice(0, 2).map(x => x.slice(0, 1)).join(''),
        meta: m.group + ' · ' + m.role,
        tag: tg.text,
        tagStyle: pill(tg.kind)
      };
    }) : [];

    const grantSources = grantSources(en);
    const sponsorInfo = sponsorAgreements(en);
    const agreementText = agreementText(en);
    const seedSponsorFiles = () => ({
      0: [{ id: 's0a', name: en ? 'Sponsorship agreement 2026.pdf' : 'Sponsoravtale 2026.pdf', size: 248000, when: en ? '12 Dec 2025' : '12. des 2025', agreement: true }, { id: 's0b', name: en ? 'Spring report 2026.pdf' : 'Vårrapport 2026.pdf', size: 1320000, when: en ? '15 Jun 2026' : '15. jun 2026' }],
      1: [{ id: 's1a', name: en ? 'Kit agreement Vestland Bygg.pdf' : 'Draktavtale Vestland Bygg.pdf', size: 186000, when: en ? '20 Sep 2025' : '20. sep 2025', agreement: true }],
      2: [{ id: 's2a', name: en ? 'Hall boards agreement.pdf' : 'Avtale hallskilt.pdf', size: 142000, when: en ? '25 Jul 2025' : '25. jul 2025', agreement: true }],
      3: [{ id: 's3a', name: en ? 'Proposal Oslo Fysio.pdf' : 'Tilbud Oslo Fysio.pdf', size: 64000, when: en ? '6 Sep 2026' : '6. sep 2026', agreement: true }]
    });
    const sfAll = this.state.sponsorFiles || seedSponsorFiles();
    const sizeTxt = (b) => b >= 1000000 ? (b / 1000000).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1000)) + ' kB';
    const sponsorFileList = (si) => (sfAll[si] || []).map(f => {
      const ext = (f.name.split('.').pop() || '').slice(0, 4).toUpperCase();
      return {
        key: 'fl' + si + f.id,
        name: f.name,
        ext: ext,
        meta: sizeTxt(f.size || 0) + ' · ' + (f.when || ''),
        open: () => {
          let url = f.url;
          if (!url) {
            const sp = (rowSets.sponsors || [])[si] || (this.state.extraSponsors.find(e => e.si === si) || {});
            const info = Object.assign({}, sponsorInfo[si] || sp.info || {}, agreementText[si] || {});
            const head = (h) => ({ h: h });
            const lines = f.agreement
              ? [ (en ? 'Parties: ' : 'Parter: ') + clubOf(sp.club) + ' × ' + (sp.title || ''),
                  (en ? 'Value: ' : 'Verdi: ') + (sp.amount || '') + (en ? ' per year' : ' per år'),
                  (en ? 'Renewed: ' : 'Fornyet: ') + (info.renewed || '–') + '   ' + (en ? 'Runs until: ' : 'Gjelder til: ') + (info.until || '–'),
                  (en ? 'Contact: ' : 'Kontakt: ') + (info.person || '') + ' <' + (info.email || '') + '>',
                  head(en ? 'The club delivers' : 'Klubben leverer') ].concat((info.club || []).map(t => '- ' + t))
                .concat([head(en ? 'The sponsor delivers' : 'Sponsoren leverer')]).concat((info.sponsor || []).map(t => '- ' + t))
                .concat([head(en ? 'Reporting and terms' : 'Rapportering og vilkår')]).concat((info.terms || []).map(t => '- ' + t))
                .concat(['', info.signed || ''])
              : [ clubOf(sp.club) + ' × ' + (sp.title || ''), (en ? 'Date: ' : 'Dato: ') + (f.when || ''),
                  head(en ? 'Summary' : 'Sammendrag'),
                  en ? 'Sponsor exposure this period: logo on kits, hall banners and four posts on the club channels.' : 'Sponsoreksponering i perioden: logo på drakter, bannere i hallen og fire innlegg i klubbens kanaler.',
                  en ? 'Reach: about 12 400 people on social media and 3 100 spectators at home matches.' : 'Rekkevidde: om lag 12 400 personer i sosiale medier og 3 100 tilskuere på hjemmekamper.',
                  head(en ? 'Next steps' : 'Videre'),
                  en ? 'Next report follows the plan in the agreement.' : 'Neste rapport følger planen i avtalen.' ];
            url = this.makePdf(f.name.replace(/\.[a-z]+$/i, ''), lines);
          }
          window.open(url, '_blank', 'noopener');
        },
        remove: () => this.setState(st => {
          const all2 = Object.assign({}, st.sponsorFiles || seedSponsorFiles());
          all2[si] = (all2[si] || []).filter(x => x.id !== f.id);
          return { sponsorFiles: all2 };
        })
      };
    });
    const grantInfo = grantInfo(en);
    const grantRows = grantSources.map((g, gi) => Object.assign({ gi: gi }, g)).filter(keep).map((g, i) => {
      const extra = grantInfo[g.gi] || {};
      const open = this.state.grantOpen === g.gi;
      return {
        key: 'gr' + g.gi,
        anchor: 'grant-' + g.gi,
        name: g.name,
        meta: (all ? clubOf(g.club) + ' · ' : '') + g.meta,
        amount: g.amount,
        tag: g.deadline,
        tagStyle: pill(g.kind),
        open: open,
        toggle: () => this.setState(st => ({ grantOpen: st.grantOpen === g.gi ? -1 : g.gi })),
        chevron: open ? 'rotate(180deg)' : 'rotate(0deg)',
        info: extra.info || '',
        who: extra.who || '',
        url: extra.url || '#',
        site: extra.site || '',
        cardStyle: 'border-radius: 22px; background: #ffffff; border: 1px solid ' + (open ? '#74cd85' : 'rgba(22,36,26,.1)') + '; transition: border-color .3s, box-shadow .3s;' + (open ? ' box-shadow: 0 14px 30px rgba(22,36,26,.1);' : '')
      };
    });
    const grantN = grantRows.length;
    const nextGrant = grantSources.filter(keep).filter(g => g.due < 9999).sort((a, b) => a.due - b.due)[0] || null;
    const grantDue = nextGrant ? (nextGrant.day + ' ' + nextGrant.mon) : '';
    const placesWord = (n) => en ? (n === 1 ? ' place' : ' places') : (n === 1 ? ' sted' : ' steder');
    const focusList = focusList(en);
    const focusRaw = all ? focusList[1] : (focusList.find(f => f.club === sel) || focusList[0]);
    const focus = Object.assign({}, focusRaw, { title: (all ? clubOf(focusRaw.club) + ': ' : '') + focusRaw.title });

    const rowSets = rowSets(en);
    const monShort = { jan: 1, feb: 2, mar: 3, apr: 4, mai: 5, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, okt: 10, oct: 10, nov: 11, des: 12, dec: 12 };
    const parseDay = (str) => {
      const m = String(str || '').toLowerCase().match(/(\d{1,2})\.?\s+([a-zæøå]{3})[a-zæøå]*\.?\s+(\d{4})/);
      if (!m || !monShort[m[2]]) return null;
      return { y: parseInt(m[3], 10), m: monShort[m[2]], d: parseInt(m[1], 10) };
    };
    const deadlines = [];
    grantSources.map((g, gi) => Object.assign({ gi: gi }, g)).filter(keep).forEach((g, i) => {
      if (!(g.due < 9999)) return;
      deadlines.push({ gi: g.gi, key: 'dg' + g.gi, y: 2026, m: Math.floor(g.due / 100), d: g.due % 100, kind: 'grant', title: g.name, meta: (all ? clubOf(g.club) + ' · ' : '') + (en ? 'Grant application deadline · ' : 'Søknadsfrist støtte · ') + g.amount });
    });
    (rowSets.sponsors || []).map((r, si) => Object.assign({ si: si }, r)).concat(this.state.extraSponsors).filter(keep).forEach(r => {
      if (this.state.inactiveSponsors[r.si]) return;
      const x = r.info || sponsorInfo[r.si] || {};
      (x.reports || []).forEach((p, pi) => {
        if (p.done) return;
        const dt = parseDay(p.date);
        if (!dt) return;
        deadlines.push({ si: r.si, key: 'dr' + r.si + '-' + pi, y: dt.y, m: dt.m, d: dt.d, kind: 'report', title: p.title + ' — ' + r.title, meta: (all ? clubOf(r.club) + ' · ' : '') + (en ? 'Sponsor report due · ' : 'Rapportfrist sponsor · ') + (x.email || '') });
      });
    });
    const DL = { grant: { bg: '#fff4cf', bd: '#e0a100', tag: '#e0a100', ink: '#3d2a00' }, report: { bg: '#e6f0fc', bd: '#3b7dd8', tag: '#3b7dd8', ink: '#ffffff' } };
    const goDeadline = (x) => {
      const id = x.kind === 'grant' ? 'grant-' + x.gi : 'sponsor-' + x.si;
      this.setState(x.kind === 'grant'
        ? { tab: 'sponsors', navMenu: '', spCal: false, grantOpen: x.gi, sponsorOpen: -1 }
        : { tab: 'sponsors', navMenu: '', spCal: false, sponsorOpen: x.si, grantOpen: -1 });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.pageYOffset - 110;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        el.animate && el.animate([{ boxShadow: '0 0 0 0 rgba(224,161,0,0)' }, { boxShadow: '0 0 0 6px rgba(59,125,216,.28)' }, { boxShadow: '0 0 0 0 rgba(224,161,0,0)' }], { duration: 1200 });
      }, 650);
    };
    const dlCardOf = (x) => ({
      key: x.key, title: x.title, meta: x.meta,
      tag: x.kind === 'grant' ? (en ? 'Grant' : 'Støtte') : (en ? 'Report' : 'Rapport'),
      tagStyle: 'flex: 0 0 auto; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; white-space: nowrap; background: ' + DL[x.kind].tag + '; color: ' + DL[x.kind].ink + ';',
      style: 'border-radius: 18px; padding: 12px 14px; cursor: pointer; transition: transform .2s, box-shadow .2s; background: ' + DL[x.kind].bg + '; border: 1px solid ' + DL[x.kind].bd + ';',
      go: () => goDeadline(x),
      goHint: x.kind === 'grant' ? (en ? 'Open this grant in Sponsors' : 'Åpne søknaden under Sponsorer') : (en ? 'Open this sponsor in Sponsors' : 'Åpne rapporten under Sponsorer')
    });
    const dlOn = (m, d) => deadlines.filter(x => x.y === 2026 && x.m === m && x.d === d);
    const dlRing = (m, d) => {
      const l = dlOn(m, d);
      if (!l.length) return '';
      const g = l.some(x => x.kind === 'grant'), r = l.some(x => x.kind === 'report');
      return ' box-shadow: inset 0 0 0 2px ' + (g && r ? '#e0a100, inset 0 0 0 4px #3b7dd8' : (g ? '#e0a100' : '#3b7dd8')) + ';';
    };
    const spBase = this.state.spCalPick ? new Date(2026, this.state.spCalMonth - 1, this.state.spCalPick) : new Date(2026, 8, 24);
    const spMon = new Date(spBase.getFullYear(), spBase.getMonth(), spBase.getDate() - ((spBase.getDay() + 6) % 7));
    const spEnd = new Date(spMon.getFullYear(), spMon.getMonth(), spMon.getDate() + 13);
    const spKey = (dt) => dt.getFullYear() * 10000 + (dt.getMonth() + 1) * 100 + dt.getDate();
    const spWeekNo = (dt) => { const t = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate())); const dn = (t.getUTCDay() + 6) % 7; t.setUTCDate(t.getUTCDate() - dn + 3); const f = new Date(Date.UTC(t.getUTCFullYear(), 0, 4)); return 1 + Math.round(((t - f) / 86400000 - 3 + ((f.getUTCDay() + 6) % 7)) / 7); };
    const spWindow = deadlines.filter(x => { const k = x.y * 10000 + x.m * 100 + x.d; return k >= spKey(spMon) && k <= spKey(spEnd); }).sort((a, b) => (a.m * 100 + a.d) - (b.m * 100 + b.d));
    const spRangeLabel = (en ? 'Weeks ' : 'Uke ') + spWeekNo(spMon) + '–' + spWeekNo(new Date(spMon.getFullYear(), spMon.getMonth(), spMon.getDate() + 7)) + ' · ' + spMon.getDate() + '.' + (spMon.getMonth() + 1) + '.–' + spEnd.getDate() + '.' + (spEnd.getMonth() + 1) + '.';
    const roleDefs = roleDefs(en);
    (this.state.addedRoleDefs || []).forEach(r => roleDefs.push({ id: r.id, name: r.name, color: '#8fb4ea', perms: [], custom: true }));
    const seedRoles = () => [
      { id: 'r1', name: 'Marit Sunde', role: 'chair', club: 'vif', scope: '' },
      { id: 'r2', name: 'Anne Bjørk', role: 'treasurer', club: 'varden', scope: '' },
      { id: 'r3', name: 'Sigrid A.', role: 'board', club: 'vif', scope: '' },
      { id: 'r4', name: 'Nora Five', role: 'coach', club: 'vif', scope: en ? 'U14 girls' : 'J14' },
      { id: 'r5', name: 'Jonas Reite', role: 'coach', club: 'fana', scope: en ? 'Goalkeepers' : 'Keeper' },
      { id: 'r6', name: 'Ida Krogh', role: 'manager', club: 'fana', scope: '' },
      { id: 'r7', name: 'Thomas Lie', role: 'volunteer', club: 'varden', scope: en ? 'Tournament 3 Oct' : 'Turnering 3. okt' },
      { id: 'r8', name: 'Kristin Aas', role: 'manager', club: 'vif', scope: '' },
      { id: 'r9', name: 'Erik Lund', role: 'coach', club: 'fana', scope: en ? 'U12' : 'G12' },
      { id: 'r10', name: 'Camilla Nilsen', role: 'volunteer', club: 'varden', scope: 'Kiosk' },
      { id: 'r11', name: 'Petter Aas', role: 'board', club: 'fana', scope: '' },
      { id: 'r12', name: 'Hanne Hauge', role: 'treasurer', club: 'vif', scope: '' }
    ];
    const roleList = (this.state.roleAssign || seedRoles()).filter(keep);
    const boardList = roleList.filter(a => ['chair', 'treasurer', 'board', 'manager'].indexOf(a.role) !== -1);
    const boardNames = boardList.map(a => a.name);
    const boardEmails = boardList.map(a => a.name.toLowerCase().replace(/[^a-zæøå ]/g, '').trim().replace(/\s+/g, '.').replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a') + '@kretz.no');
    const rq = this.state.roleQ.trim().toLowerCase();
    const roleShown = roleList
      .filter(a => !this.state.roleFilter || a.role === this.state.roleFilter)
      .filter(a => !rq || (a.name + ' ' + ((roleDefs.find(r => r.id === a.role) || {}).name || '') + ' ' + (a.scope || '')).toLowerCase().includes(rq));
    const pickFiles = (ev) => {
      const list = Array.from(ev.target.files || []);
      ev.target.value = '';
      return list.map((f, k) => ({ id: 'af' + Date.now() + k, name: f.name, size: f.size, url: URL.createObjectURL(f), when: en ? 'just now' : 'nå nettopp' }));
    };
    const attRows = (files, remove) => files.map(f => {
      const ext = (f.name.split('.').pop() || '').slice(0, 4).toUpperCase();
      const isImg = /PNG|JPG|JPEG|GIF|WEBP|HEIC/.test(ext);
      return {
        key: 'at' + f.id,
        name: f.name,
        ext: isImg ? 'IMG' : ext,
        meta: f.size >= 1000000 ? (f.size / 1000000).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round((f.size || 0) / 1000)) + ' kB',
        iconStyle: 'width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; font-size: 10.5px; font-weight: 800; ' + (ext === 'PDF' ? 'background: #fbe9e5; color: #b8240e;' : (/XLS|CSV/.test(ext) ? 'background: #eaf7ed; color: #1f7a3a;' : (/DOC/.test(ext) ? 'background: #e6f0fc; color: #2a5fae;' : 'background: #f3eefc; color: #5a2fa3;'))),
        remove: () => remove(f.id)
      };
    });
    const payBase = payments(en);
    const payFmt = (iso) => { const p = iso.split('-'); return parseInt(p[2], 10) + '.' + parseInt(p[1], 10) + '.' + p[0]; };
    const payAll = payBase.concat(this.state.payExtra || []).filter(keep).map(p => Object.assign({}, p, { isPaid: this.state.payPaid[p.id] !== undefined ? this.state.payPaid[p.id] : !!p.paid, dueLabel: payFmt(p.due) }));
    const payUnpaid = payAll.filter(p => !p.isPaid).sort((a, b) => a.due < b.due ? -1 : 1);
    const payRows = payAll.slice().sort((a, b) => (a.isPaid - b.isPaid) || (a.due < b.due ? -1 : 1)).map(p => {
      const overdue = !p.isPaid && p.due < '2026-09-24';
      const soon = !p.isPaid && !overdue && p.due <= '2026-10-01';
      return {
        key: 'pb' + p.id,
        supplier: p.supplier,
        meta: (all ? clubOf(p.club) + ' · ' : '') + p.desc + ' · ' + (en ? 'no. ' : 'nr. ') + p.no,
        amount: p.n ? 'kr ' + p.n.toLocaleString('nb-NO').replace(/\u00a0/g, ' ') : '—',
        tag: p.isPaid ? (en ? 'paid' : 'betalt') : (overdue ? (en ? 'overdue ' : 'forfalt ') + p.dueLabel : (en ? 'due ' : 'forfall ') + p.dueLabel),
        tagStyle: 'display: inline-block; margin-top: 3px; padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 700; white-space: nowrap; '
          + (p.isPaid ? 'background: rgba(116,205,133,.3); color: #16241a;' : (overdue ? 'background: #d9644f; color: #ffffff;' : (soon ? 'background: #fff4cf; color: #6b4a00;' : 'background: rgba(22,36,26,.07); color: rgba(22,36,26,.75);'))),
        cardStyle: 'border-radius: 18px; padding: 12px 14px; ' + (p.isPaid ? 'background: #f7f9f5; border: 1px solid rgba(22,36,26,.08); opacity: .75;' : (overdue ? 'background: #fff7f5; border: 1px solid rgba(217,100,79,.45);' : 'background: #f4f8f2; border: 1px solid rgba(22,36,26,.1);')),
        unpaid: !p.isPaid,
        paid: p.isPaid,
        markPaid: () => this.setState(st => ({ payPaid: Object.assign({}, st.payPaid, { [p.id]: true }) })),
        markUnpaid: () => this.setState(st => ({ payPaid: Object.assign({}, st.payPaid, { [p.id]: false }) })),
        open: () => {
          if (p.url) { window.open(p.url, '_blank', 'noopener'); return; }
          window.open(this.makePdf((en ? 'Invoice ' : 'Faktura ') + p.no, [
            (en ? 'From: ' : 'Fra: ') + p.supplier,
            (en ? 'To: ' : 'Til: ') + clubOf(p.club),
            (en ? 'Invoice date: ' : 'Fakturadato: ') + payFmt(p.due.replace(/-(\d\d)$/, (m, d) => '-' + String(Math.max(1, parseInt(d, 10) - 14)).padStart(2, '0'))),
            (en ? 'Due date: ' : 'Forfallsdato: ') + p.dueLabel,
            { h: en ? 'Specification' : 'Spesifikasjon' },
            p.desc + '   kr ' + p.n.toLocaleString('nb-NO').replace(/\u00a0/g, ' '),
            { h: en ? 'Total to pay' : 'Å betale' },
            'kr ' + p.n.toLocaleString('nb-NO').replace(/\u00a0/g, ' '),
            (en ? 'Account: ' : 'Konto: ') + '1503.40.' + String(10000 + (p.n % 90000)).slice(0, 5),
            (en ? 'KID: ' : 'KID: ') + String(p.no).replace(/\D/g, '') + '7'
          ]), '_blank', 'noopener');
        }
      };
    });
    const invitePool = (() => {
      const seen = {};
      const out = [];
      roleList.forEach(a => { if (seen[a.name]) return; seen[a.name] = 1; const d = roleDefs.find(r => r.id === a.role); out.push({ name: a.name, role: d ? d.name : '', board: ['chair', 'treasurer', 'board', 'manager'].indexOf(a.role) !== -1 }); });
      out.sort((x, y) => (y.board - x.board) || x.name.localeCompare(y.name));
      return out;
    })();
    const venClubs = venues(en);
    const venCur = venClubs.find(c => c.id === sel) || venClubs[0] || null;
    const venStore = KretzVenues ? KretzVenues.load() : {};
    const venSaved = venCur ? (venStore[venCur.slug] || { hours: {}, closed: {}, price: 0, memberPrice: 0, slotMin: 60, maxHours: 2, leadDays: 14, note: '' }) : null;
    const venDraft = this.state.venDraft && venCur && this.state.venDraft.slug === venCur.slug ? this.state.venDraft : null;
    const venV = venDraft ? venDraft.data : venSaved;
    const venClean = !venDraft;
    const venUpd = (fn) => this.setState(st => {
      const base = st.venDraft && venCur && st.venDraft.slug === venCur.slug ? st.venDraft.data : JSON.parse(JSON.stringify(venSaved));
      const next = JSON.parse(JSON.stringify(base));
      fn(next);
      return { venDraft: { slug: venCur.slug, data: next }, venSaved: '' };
    });
    const venSel = this.state.venDay;
    const unitState = (n, day) => {
      if (!venV) return 'closed';
      if (((venV.unavailable) || []).indexOf(n) !== -1) return 'alldays';
      if (day >= 0 && ((venV.dayUnits && venV.dayUnits[day]) || []).indexOf(n) !== -1) return 'closed';
      if (day >= 0 && ((venV.dayAudience && venV.dayAudience[day]) || []).indexOf(n) !== -1) return 'members';
      const aud = (venV.unitAudience || {})[n] || 'all';
      return aud === 'members' ? 'members' : 'all';
    };
    const unitStyleFor = (st, base) => base + (st === 'alldays'
      ? 'background: rgba(22,36,26,.2); border: 1px solid rgba(22,36,26,.3); color: rgba(22,36,26,.6);'
      : st === 'closed' ? 'background: repeating-linear-gradient(135deg, rgba(22,36,26,.05) 0 6px, rgba(22,36,26,.12) 6px 12px); border: 1px dashed rgba(22,36,26,.35); color: rgba(22,36,26,.5);'
      : st === 'members' ? 'background: rgba(127,184,255,.35); border: 1px solid #7fb8ff; color: #16241a;'
      : 'background: rgba(116,205,133,.28); border: 1px solid #74cd85; color: #16241a;');
    const unitStatusText = (st) => st === 'alldays' ? (en ? 'closed all days' : 'stengt alle dager') : st === 'closed' ? (en ? 'closed' : 'stengt') : st === 'members' ? (en ? 'members' : 'medlemmer') : (en ? 'everyone' : 'alle');
    const cycleUnit = (n) => venUpd(v => {
      v.unitAudience = v.unitAudience || {};
      v.dayUnits = v.dayUnits || {};
      v.unavailable = v.unavailable || [];
      const cur = unitState(n, venSel);
      if (venSel === -1) {
        // all-days mode: everyone -> members -> closed all days -> everyone
        if (cur === 'all') v.unitAudience[n] = 'members';
        else if (cur === 'members') { v.unitAudience[n] = 'all'; v.unavailable.push(n); v.unavailable.sort((a, b) => a - b); }
        else { v.unavailable = v.unavailable.filter(x => x !== n); v.unitAudience[n] = 'all'; }
      } else {
        // day mode: open <-> closed this day (audience unchanged)
        if (cur === 'alldays') { v.unavailable = v.unavailable.filter(x => x !== n); }
        else if (cur === 'closed') { v.dayUnits[venSel] = (v.dayUnits[venSel] || []).filter(x => x !== n); }
        else { v.dayUnits[venSel] = (v.dayUnits[venSel] || []).concat([n]).sort((a, b) => a - b); }
      }
    });
    const venDayNames = en ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] : ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    const bcMonthNames = en ? ['January','February','March','April','May','June','July','August','September','October','November','December'] : ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'];
    const bcSeed = venCur ? [
      { date: '2026-09-29', time: '18:00', unit: 1, name: 'Marit Sunde', member: true },
      { date: '2026-09-29', time: '19:00', unit: 2, name: 'Bergen Bedriftsidrett', member: false },
      { date: '2026-10-02', time: '17:00', unit: 1, name: 'Emil Aas', member: true },
      { date: '2026-10-04', time: '10:00', unit: 3, name: 'Familien Berg', member: false },
      { date: '2026-10-04', time: '11:00', unit: 3, name: 'Familien Berg', member: false },
      { date: '2026-10-09', time: '18:00', unit: 2, name: 'Ida Krogh', member: true },
      { date: '2026-10-15', time: '20:00', unit: 1, name: 'Nabolaget Sør', member: false },
      { date: '2026-11-06', time: '18:00', unit: 2, name: 'Selma Hauge', member: true }
    ].filter(b => b.unit <= venCur.count) : [];
    const bcAll = bcSeed.concat(((venV && venV.manual) || []).map(m => ({ date: m.date, time: m.time, unit: m.unit, name: m.name, member: false, manual: true, note: m.note })));
    const bcM = this.state.bcMonth;
    const bcDays = new Date(2026, bcM, 0).getDate();
    const bcLead = (new Date(2026, bcM - 1, 1).getDay() + 6) % 7;
    const bcIso = (d) => '2026-' + String(bcM).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    const bcTodayIso = '2026-09-28';
    const bcMonthPrefix = '2026-' + String(bcM).padStart(2, '0') + '-';
    const bcMonthB = bcAll.filter(b => b.date.indexOf(bcMonthPrefix) === 0);
    const bcSlotH = (venV && venV.slotMin ? venV.slotMin : 60) / 60;
    const bcPriceOf = (b) => ((b.member && venV && venV.memberPrice) ? venV.memberPrice : (venV ? venV.price : 0)) * bcSlotH;
    const bcRevMem = bcMonthB.filter(b => b.member).reduce((n, b) => n + bcPriceOf(b), 0);
    const bcRevGuest = bcMonthB.filter(b => !b.member).reduce((n, b) => n + bcPriceOf(b), 0);
    const bcRevTotal = bcRevMem + bcRevGuest;
    const bcCells = [];
    for (let k = 0; k < bcLead; k++) bcCells.push({ key: 'pad' + k, day: '', dots: [], disabled: true, tip: '', style: 'visibility: hidden; min-height: 44px', pick: () => {} });
    for (let d = 1; d <= bcDays; d++) {
      const iso = bcIso(d);
      const wk = (new Date(2026, bcM - 1, d).getDay() + 6) % 7;
      const closed = !venV || !KretzVenues || KretzVenues.isClosed(venV, iso) || !KretzVenues.hoursFor(venV, wk);
      const past = iso < bcTodayIso;
      const dayB = bcAll.filter(b => b.date === iso);
      const hasG = dayB.some(b => !b.member), hasM = dayB.some(b => b.member);
      const sel = this.state.bcDay === iso;
      const dots = [];
      if (hasG) dots.push({ key: 'g', style: 'width: 6px; height: 6px; border-radius: 999px; background: ' + (sel ? '#a3e2ae' : '#1f7a3a') });
      if (hasM) dots.push({ key: 'm', style: 'width: 6px; height: 6px; border-radius: 999px; background: ' + (sel ? '#bcd6ff' : '#4f8fe0') });
      const ring = hasG && hasM ? '#4f8fe0' : (hasM ? '#4f8fe0' : (hasG ? '#1f7a3a' : ''));
      bcCells.push({
        key: 'bc' + iso, day: String(d), dots: [], disabled: past,
        tip: closed ? (en ? 'Closed' : 'Stengt') : (dayB.length ? dayB.length + (en ? ' bookings' : ' bookinger') : (en ? 'No bookings' : 'Ingen bookinger')),
        pick: () => this.setState(st => ({ bcDay: st.bcDay === iso ? '' : iso })),
        style: 'min-height: 44px; padding: 6px 2px; border-radius: 12px; font-family: var(--font-body); cursor: ' + (past ? 'default' : 'pointer') + '; transition: background .2s, box-shadow .2s; '
          + (sel ? 'background: #16241a; color: #f6f8f3; border: 2px solid #16241a;'
            : past ? 'background: transparent; color: rgba(22,36,26,.3); border: 2px solid transparent;'
            : closed ? 'background: rgba(22,36,26,.06); color: rgba(22,36,26,.5); border: 2px dashed rgba(22,36,26,.25);'
            : dayB.length ? 'background: ' + (hasM && !hasG ? 'rgba(127,184,255,.16)' : (hasG && !hasM ? 'rgba(116,205,133,.2)' : 'linear-gradient(135deg, rgba(116,205,133,.2), rgba(127,184,255,.16))')) + '; color: #16241a; border: 2px solid ' + ring + '; font-weight: 800;'
            : 'background: #ffffff; color: #16241a; border: 2px solid rgba(22,36,26,.08);')
      });
    }
    let bcSel = null;
    if (this.state.bcDay && venV && KretzVenues) {
      const iso = this.state.bcDay;
      const p = iso.split('-');
      const dObj = new Date(2026, parseInt(p[1], 10) - 1, parseInt(p[2], 10));
      const wk = (dObj.getDay() + 6) % 7;
      const closedDay = KretzVenues.isClosed(venV, iso) || !KretzVenues.hoursFor(venV, wk);
      const slotTimes = closedDay ? [] : KretzVenues.slotsFor(venV, wk, iso);
      const dayB = bcAll.filter(b => b.date === iso);
      const unitWord = venCur ? venCur.unit.charAt(0).toUpperCase() + venCur.unit.slice(1) : '';
      const openUnits = venCur ? Array.from({ length: venCur.count }, (_, i) => i + 1).filter(n => { const st = unitState(n, wk); return st === 'all' || st === 'members'; }) : [];
      bcSel = {
        title: venDayNames[wk] + ' ' + parseInt(p[2], 10) + '. ' + bcMonthNames[parseInt(p[1], 10) - 1].toLowerCase(),
        sub: closedDay ? (en ? 'Closed' : 'Stengt') : (dayB.length + (en ? ' bookings · ' : ' bookinger · ') + openUnits.length + ' ' + (venCur ? (en ? (openUnits.length === 1 ? venCur.unit : venCur.unit + 's') : (venCur.unit === 'bane' ? (openUnits.length === 1 ? 'bane' : 'baner') : venCur.unit)) : '') + (en ? ' open' : ' åpne')),
        closed: closedDay,
        slots: slotTimes.map(tm => {
          const list = dayB.filter(b => b.time === tm);
          const nG = list.filter(b => !b.member).length, nM = list.filter(b => b.member).length;
          const free = Math.max(0, openUnits.length - list.length);
          return {
            key: 'sl' + tm, time: tm,
            summary: list.length ? (free + (en ? ' free · ' : ' ledig · ') + list.length + (en ? ' booked' : ' booket')) : (en ? 'All ' + openUnits.length + ' free' : 'Alle ' + openUnits.length + ' ledige'),
            hasBookings: list.length > 0,
            bookings: list.map((b, i) => ({
              key: 'bk' + tm + i,
              unit: unitWord + ' ' + b.unit,
              who: b.name + (b.manual ? (en ? ' (manual)' : ' (manuell)') : ''),
              tip: (b.member ? (en ? 'Member' : 'Medlem') : (en ? 'Visitor' : 'Besøkende')) + (b.note ? ' · ' + b.note : ''),
              style: 'display: inline-flex; align-items: center; gap: 4px; padding: 6px 11px; border-radius: 999px; font-size: 12.5px; color: #ffffff; white-space: nowrap; max-width: 100%; overflow: hidden; text-overflow: ellipsis; background: ' + (b.member ? '#4f8fe0' : '#1f7a3a')
            })),
            style: 'border-radius: 16px; padding: 10px 14px; border: 1px solid rgba(22,36,26,.1); background: ' + (list.length ? (nM && !nG ? 'rgba(127,184,255,.14)' : nG && !nM ? 'rgba(116,205,133,.16)' : 'linear-gradient(90deg, rgba(116,205,133,.16), rgba(127,184,255,.14))') : '#f7f9f5')
          };
        })
      };
    }
    const venFmtDate = (iso) => { const p = iso.split('-'); return p[2] + '.' + p[1] + '.' + p[0]; };
    const seedMeetings = () => [
      { id: 'm1', m: 6, d: 10, time: '19:00', place: en ? 'Club house' : 'Klubbhuset', title: en ? 'Board meeting' : 'Styremøte', agenda: en ? ['Spring accounts', 'Summer camp', 'Sponsor status'] : ['Vårregnskap', 'Sommerleir', 'Status sponsorer'], decisions: en ? ['Summer camp approved within NOK 60 000'] : ['Sommerleir godkjent innenfor kr 60 000'] },
      { id: 'm2', m: 8, d: 19, time: '19:00', place: 'Teams', title: en ? 'Board meeting' : 'Styremøte', agenda: en ? ['Autumn fees', 'Hall times', 'Tournament 3 Oct'] : ['Høstkontingent', 'Halltider', 'Turnering 3. okt'], decisions: en ? ['Fees unchanged for autumn', 'Marit leads the tournament group'] : ['Kontingent uendret for høsten', 'Marit leder turneringsgruppa'] },
      { id: 'm3', m: 10, d: 8, time: '19:00', place: en ? 'Club house' : 'Klubbhuset', title: en ? 'Board meeting' : 'Styremøte', agenda: en ? ['Tournament evaluation', 'Budget 2027 — first draft', 'Grant applications', 'Any other business'] : ['Evaluering av turneringen', 'Budsjett 2027 — første utkast', 'Søknader om støtte', 'Eventuelt'], upcoming: true }
    ];
    const meetingList = (this.state.meetings || seedMeetings()).slice().sort((a, b) => (a.m * 100 + a.d) - (b.m * 100 + b.d));
    const nmRaw = meetingList.find(m => m.upcoming && (m.m * 100 + m.d) >= 924) || null;
    const nextMeeting = nmRaw ? (() => {
      const days = Math.round((new Date(2026, nmRaw.m - 1, nmRaw.d) - new Date(2026, 8, 24)) / 86400000);
      const wd = (en ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] : ['søn','man','tir','ons','tor','fre','lør'])[new Date(2026, nmRaw.m - 1, nmRaw.d).getDay()];
      return Object.assign({}, nmRaw, { when: wd + ' ' + nmRaw.d + '.' + nmRaw.m + '. ' + (en ? 'at ' : 'kl. ') + nmRaw.time, countdown: days <= 0 ? (en ? 'today' : 'i dag') : (en ? 'in ' + days + ' days' : 'om ' + days + ' dager') });
    })() : null;
    const seedMeetingFiles = (id) => ({
      m1: [{ id: 'f1', name: en ? 'Minutes June.pdf' : 'Referat juni.pdf', size: 184000, when: '10.6.2026', gen: 'minutes' }, { id: 'f2', name: en ? 'Summer camp budget.csv' : 'Budsjett sommerleir.csv', size: 9000, when: '8.6.2026', gen: 'budget' }],
      m2: [{ id: 'f3', name: en ? 'Minutes August.pdf' : 'Referat august.pdf', size: 176000, when: '19.8.2026', gen: 'minutes' }],
      m3: [{ id: 'f4', name: en ? 'Agenda October.pdf' : 'Saksliste oktober.pdf', size: 92000, when: '24.9.2026', gen: 'agenda' }, { id: 'f5', name: en ? 'Budget 2027 draft.csv' : 'Budsjett 2027 utkast.csv', size: 12000, when: '22.9.2026', gen: 'budget' }]
    })[id] || [];
    const meetQv = this.state.meetQ.trim().toLowerCase();
    const monNm = en ? ['january','february','march','april','may','june','july','august','september','october','november','december'] : ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'];
    const meetShown = meetingList.map(m => {
      if (!meetQv) return m;
      const files = (this.state.meetingFiles[m.id] || seedMeetingFiles(m.id)).map(f => f.name);
      const fileHits = files.filter(n => n.toLowerCase().includes(meetQv));
      const agendaHits = m.agenda.filter(t => t.toLowerCase().includes(meetQv));
      const base = [m.title, m.place, m.time, m.d + '.' + m.m + '.', m.d + '. ' + monNm[m.m - 1], monNm[m.m - 1]].join(' ').toLowerCase();
      if (!fileHits.length && !agendaHits.length && !base.includes(meetQv)) return null;
      const hit = fileHits.length ? (en ? 'File: ' : 'Fil: ') + fileHits.join(', ') : (agendaHits.length ? (en ? 'Item: ' : 'Sak: ') + agendaHits.join(', ') : '');
      return Object.assign({}, m, { _hit: hit });
    }).filter(Boolean);
    const openMinutesOf = (m) => window.open(this.makePdf((en ? 'Minutes — ' : 'Referat — ') + m.title + ' ' + m.d + '.' + m.m + '.2026',
      [(en ? 'Place: ' : 'Sted: ') + m.place + '   ' + (en ? 'Time: ' : 'Tid: ') + m.time, (en ? 'Present: ' : 'Til stede: ') + boardNames.join(', '), { h: en ? 'Items' : 'Saker' }]
        .concat(m.agenda.map((t, i) => (i + 1) + '. ' + t + (en ? ' — discussed and noted.' : ' — drøftet og tatt til orientering.')))
        .concat([{ h: en ? 'Decisions' : 'Vedtak' }]).concat((m.decisions || []).map(t => '- ' + t))
        .concat(['', (en ? 'Minutes taken by Sigrid A.' : 'Referent: Sigrid A.')])), '_blank', 'noopener');
    const mdM = this.state.meetingOpenId ? (this.state.meetings || seedMeetings()).find(m => m.id === this.state.meetingOpenId) || null : null;
    const rsvpSeed = { m1: 'yyyyy', m2: 'yynyy', m3: 'yn?y?' };
    const mdAns = (i) => { if (mdM && mdM.invitees) return 'wait'; const code = (mdM && rsvpSeed[mdM.id]) || ''; const c = code[i % Math.max(1, code.length)] || '?'; return c === 'y' ? 'yes' : (c === 'n' ? 'no' : 'wait'); };
    const mdPeople = mdM ? (mdM.invitees ? mdM.invitees.map(nm => roleList.find(a => a.name === nm) || { id: 'x' + nm, name: nm, role: '' }) : boardList).slice(0, 12) : [];
    const mdSeatList = mdPeople.map((a, i) => {
      const n = mdPeople.length;
      const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
      const rr = 40;
      const x = 50 + rr * Math.cos(ang), y = 50 + rr * Math.sin(ang);
      const ans = mdAns(i);
      const ring = ans === 'yes' ? '#1f7a3a' : (ans === 'no' ? '#d9644f' : '#b9bfb7');
      const d = roleDefs.find(r => r.id === a.role) || { name: '' };
      return {
        key: 'seat' + a.id,
        initials: a.name.split(/\s+/).slice(0, 2).map(q => q.slice(0, 1)).join(''),
        first: a.name.split(/\s+/)[0],
        tip: a.name + ' · ' + d.name + ' · ' + (ans === 'yes' ? (en ? 'accepted' : 'kommer') : (ans === 'no' ? (en ? 'declined' : 'kan ikke') : (en ? 'no answer yet' : 'ikke svart'))),
        style: 'position: absolute; left: ' + x.toFixed(2) + '%; top: ' + y.toFixed(2) + '%; width: 17%; aspect-ratio: 1 / 1; transform: translate(-50%, -50%);',
        avatarStyle: 'position: absolute; inset: 0; border-radius: 999px; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 14px; box-shadow: 0 0 0 3px ' + ring + ', 0 6px 14px rgba(22,36,26,.18); '
          + (ans === 'wait' ? 'background: #d6dad4; color: #6b716a; filter: grayscale(1);' : (ans === 'no' ? 'background: #fbe9e5; color: #8a2f1f;' : 'background: #16241a; color: #f6f8f3;')),
        badge: ans === 'yes' ? '✓' : (ans === 'no' ? '×' : '?'),
        badgeStyle: 'position: absolute; right: -4px; bottom: -2px; width: 18px; height: 18px; border-radius: 999px; display: grid; place-items: center; font-size: 11px; font-weight: 800; color: #ffffff; border: 2px solid #ffffff; background: ' + ring
      };
    });
    const mdYesN = mdSeatList.filter((_, i) => mdAns(i) === 'yes').length;
    const mdNoN = mdSeatList.filter((_, i) => mdAns(i) === 'no').length;
    const mdWaitN = mdSeatList.length - mdYesN - mdNoN;
    const mdFileSrc = mdM ? (this.state.meetingFiles[mdM.id] || seedMeetingFiles(mdM.id)) : [];
    const extColor = (ext) => ext === 'PDF' ? 'background: #fbe9e5; color: #b8240e;' : (/XLS|CSV/.test(ext) ? 'background: #eaf7ed; color: #1f7a3a;' : 'background: #e6f0fc; color: #2a5fae;');
    const mdFileRows = mdFileSrc.map(f => {
      const ext = (f.name.split('.').pop() || '').slice(0, 4).toUpperCase();
      return {
        key: 'mdf' + f.id,
        name: f.name,
        ext: /PNG|JPG|JPEG|GIF|WEBP|HEIC/.test(ext) ? 'IMG' : ext,
        iconStyle: 'width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; font-size: 10.5px; font-weight: 800; ' + extColor(ext),
        meta: (f.size >= 1000000 ? (f.size / 1000000).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round((f.size || 0) / 1000)) + ' kB') + ' · ' + (f.when || ''),
        open: () => {
          if (f.url) { window.open(f.url, '_blank', 'noopener'); return; }
          if (f.gen === 'minutes') { openMinutesOf(mdM); return; }
          if (f.gen === 'agenda') { window.open(this.makePdf((en ? 'Agenda — ' : 'Saksliste — ') + mdM.title + ' ' + mdM.d + '.' + mdM.m + '.2026', [(en ? 'Place: ' : 'Sted: ') + mdM.place + '   ' + (en ? 'Time: ' : 'Tid: ') + mdM.time, { h: en ? 'Items' : 'Saker' }].concat(mdM.agenda.map((t, i) => (i + 1) + '. ' + t))), '_blank', 'noopener'); return; }
          const rows = [[en ? 'Item' : 'Post', en ? 'Budget (NOK)' : 'Budsjett (kr)'], [en ? 'Hall rent' : 'Halleie', '104000'], [en ? 'Equipment' : 'Utstyr', '68000'], [en ? 'Travel' : 'Reiser', '54000'], [en ? 'Coaching' : 'Trenerhonorar', '42000'], [en ? 'Income: fees' : 'Inntekt: kontingent', '310000']];
          const csv = '\ufeff' + rows.map(r => r.map(c => '"' + c + '"').join(';')).join('\r\n');
          const a = document.createElement('a');
          a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
          a.download = f.name; document.body.appendChild(a); a.click(); a.remove();
        },
        remove: () => this.setState(st => { const m2 = Object.assign({}, st.meetingFiles); m2[mdM.id] = (m2[mdM.id] || seedMeetingFiles(mdM.id)).filter(x => x.id !== f.id); return { meetingFiles: m2 }; })
      };
    });
    const decisionList = boardDecisions(en);
    const meetMarks = (this.state.meetings || seedMeetings()).map(m => ({ key: 'mm' + m.id, y: 2026, m: m.m, d: m.d, kind: 'meeting', id: m.id, title: m.title + ' ' + (en ? 'at ' : 'kl. ') + m.time, meta: m.place + ' · ' + m.agenda.length + (m.agenda.length === 1 ? (en ? ' item' : ' sak') : (en ? ' items' : ' saker')) }));
    const homeOn = (m, d) => dlOn(m, d).concat(meetMarks.filter(x => x.m === m && x.d === d));
    const homeRing = (m, d) => {
      const l = homeOn(m, d);
      if (!l.length) return '';
      const cols = [];
      if (l.some(x => x.kind === 'meeting')) cols.push('#16241a');
      if (l.some(x => x.kind === 'grant')) cols.push('#e0a100');
      if (l.some(x => x.kind === 'report')) cols.push('#3b7dd8');
      return ' box-shadow: ' + cols.map((c, i) => 'inset 0 0 0 ' + (2 + i * 2) + 'px ' + c).join(', ') + ';';
    };
    const homeCardOf = (x) => x.kind !== 'meeting' ? dlCardOf(x) : ({
      key: x.key, title: x.title, meta: x.meta,
      tag: en ? 'Board meeting' : 'Styremøte',
      tagStyle: 'flex: 0 0 auto; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; white-space: nowrap; background: #16241a; color: #f6f8f3;',
      style: 'border-radius: 18px; padding: 12px 14px; cursor: pointer; transition: transform .2s, box-shadow .2s; background: #eef2ec; border: 1px solid rgba(22,36,26,.35);',
      go: () => this.setState({ tab: 'board', navMenu: '', meetingOpenId: x.id }),
      goHint: en ? 'Open this meeting' : 'Åpne styremøtet'
    });
    const nowD = new Date();
    const todayKey = nowD.getFullYear() * 10000 + (nowD.getMonth() + 1) * 100 + nowD.getDate();
    const isPast = (m, d) => (2026 * 10000 + m * 100 + d) < todayKey;
    const isToday = (m, d) => (2026 * 10000 + m * 100 + d) === todayKey;
    const pastStyle = ' background: #eceeea; border: 1px solid rgba(22,36,26,.06); color: rgba(22,36,26,.38); font-weight: 400;';
    const calM = this.state.calMonth;
    const monthNames = en
      ? ['January','February','March','April','May','June','July','August','September','October','November','December']
      : ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'];
    const monthName = monthNames[calM - 1];
    const monthLabel = (monthName.charAt(0).toUpperCase() + monthName.slice(1)) + ' 2026';
    const calActs = this.baseActs(en).concat(this.state.newActs).filter(x => all || x.club === sel).filter(a => a.m === calM);
    const daysIn = new Date(2026, calM, 0).getDate();
    const firstDow = (new Date(2026, calM - 1, 1).getDay() + 6) % 7;
    const calCells = [];
    for (let i = 0; i < firstDow; i++) calCells.push({ key: 'blank' + i, day: '', pick: () => {}, style: 'border: 0; background: transparent; height: 34px' });
    for (let d = 1; d <= daysIn; d++) {
      const has = calActs.some(a => a.day === d);
      const mine = this.state.calEntries.some(e => e.m === calM && e.day === d && (all || e.club === sel || e.club === 'all'));
      const picked = this.state.calPick === d;
      const day = d;
      calCells.push({
        key: 'cd' + d,
        day: String(d),
        pick: () => this.setState({ calPick: day, calAdd: false, ceSent: '' }),
        style: 'height: 34px; border-radius: 12px; cursor: pointer; font-family: var(--font-body); font-size: 13px; transition: background .25s, color .25s, border-color .25s;'
          + (picked
            ? ' background: #16241a; border: 1px solid #16241a; color: #f6f8f3; font-weight: 700;'
            : (has
              ? ' background: rgba(116,205,133,.32); color: #16241a; font-weight: 700;' + (mine ? ' border: 2px solid #e0a100;' : ' border: 1px solid rgba(116,205,133,.6);')
              : (mine
                ? ' background: #fff4cf; border: 2px solid #e0a100; color: #3d2a00; font-weight: 700;'
                : ' background: #f7f9f5; border: 1px solid rgba(22,36,26,.08); color: rgba(22,36,26,.7);')))
          + (picked ? '' : (isPast(calM, d) ? pastStyle : '') + homeRing(calM, d) + (homeOn(calM, d).length && !isPast(calM, d) ? ' font-weight: 700;' : '') + (isToday(calM, d) ? ' outline: 2px solid #1f7a3a; outline-offset: 1px;' : ''))
      });
    }
    const dayActs = this.state.calPick ? calActs.filter(a => a.day === this.state.calPick) : [];
    const colleagues = boardMembers(en);
    const boardIds = ['c1', 'c2', 'c3', 'c5'];
    const dayEntries = this.state.calPick
      ? this.state.calEntries.filter(e => e.m === calM && e.day === this.state.calPick && (all || e.club === sel || e.club === 'all'))
      : [];
    const shareN = this.state.ceShare.length;
    const scale = all ? 1 : (sel === 'vif' ? 0.46 : (sel === 'fana' ? 0.34 : 0.2));
    const kr = (n) => 'kr ' + (Math.round(n) || 0).toLocaleString('nb-NO').replace(/\u00a0/g, ' ').replace(/^[−-]0$/, '0');
    const pDays = Math.max(1, Math.round((new Date(tfBounds[1]) - new Date(tfBounds[0])) / 86400000) + 1);
    const pFactor = tab === 'teamfund' ? pDays / 30 : 1;
    const pWord = tab !== 'teamfund' ? (en ? 'this month' : 'denne måneden')
      : this.state.tfPeriod === 'year' ? (en ? 'this year' : 'i år')
      : this.state.tfPeriod === 'week' ? (en ? 'this week' : 'denne uken')
      : this.state.tfPeriod === 'custom' ? (en ? 'in the period' : 'i perioden')
      : (en ? 'this month' : 'denne måneden');
    const onTf = tab === 'teamfund';
    const incomeNum = onTf ? tfIn : 386000 * scale * pFactor, incomeBudget = 352000 * scale * pFactor * (onTf ? 0.12 : 1);
    const expenseNum = onTf ? tfOut : 298000 * scale * pFactor, expenseBudget = 312000 * scale * pFactor * (onTf ? 0.14 : 1);
    const resultNum = incomeNum - expenseNum;
    const marginPct = incomeNum > 0 ? Math.round(resultNum / incomeNum * 100) : null;
    const deltaChip = (diff, goodWhenOver) => {
      const good = goodWhenOver ? diff >= 0 : diff <= 0;
      const pct = Math.abs(Math.round(diff / (goodWhenOver ? incomeBudget : expenseBudget) * 100));
      return {
        text: (diff >= 0 ? '+' : '−') + pct + '%',
        style: 'flex: 0 0 auto; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; '
          + (good ? 'background: rgba(116,205,133,.34); color: #16241a;' : 'background: rgba(124,77,207,.16); color: #5a2fa3;')
      };
    };
    const incChip = deltaChip(incomeNum - incomeBudget, true);
    const expChip = deltaChip(expenseNum - expenseBudget, false);
    const kpiChip = (good) => 'flex: 0 0 auto; padding: 5px 11px; border-radius: 999px; font-size: 11px; font-weight: 700; white-space: nowrap; '
      + (good ? 'background: rgba(116,205,133,.34); color: #16241a;' : 'background: rgba(255,201,74,.36); color: #7a5406;');
    const pctFrom = (defs, sign) => {
      const sums = {};
      tfInPeriod.forEach(t => {
        if (sign > 0 ? t.n <= 0 : t.n >= 0) return;
        const c = t.cat || tfCatOf[t.tx] || defs[defs.length - 1].id;
        sums[c] = (sums[c] || 0) + Math.abs(t.n);
      });
      const tot = Object.keys(sums).reduce((n, k) => n + sums[k], 0);
      const raw = defs.map(d => ({ label: d.label, color: d.color, v: sums[d.id] || 0 }));
      let pcts = raw.map(r => tot ? Math.round(r.v / tot * 100) : 0);
      const drift = tot ? 100 - pcts.reduce((a, b) => a + b, 0) : 0;
      if (drift) { const big = pcts.indexOf(Math.max.apply(null, pcts)); pcts[big] += drift; }
      return raw.map((r, i) => ({ label: r.label, color: r.color, n: pcts[i] }));
    };
    const incDefs = incomeCategories(en);
    const expDefs = expenseCategories(en);
    const incomeCats = onTf ? pctFrom(incDefs, 1) : incDefs.map(d => ({ label: d.label, color: d.color, n: d.base }));
    const expenseCats = onTf ? pctFrom(expDefs, -1) : expDefs.map(d => ({ label: d.label, color: d.color, n: d.base }));
    const CIRC = 2 * Math.PI * 64;
    const donutSlices = (cats) => {
      let acc = 0;
      const out = [];
      const live = cats.filter(c => c.n > 0).length;
      cats.forEach((c, i) => {
        if (!(c.n > 0)) return;
        const len = CIRC * c.n / 100;
        const off = -CIRC * acc / 100;
        acc += c.n;
        const gap = live > 1 ? Math.min(2, len / 2) : 0;
        const vis = Math.max(0.1, len - gap);
        out.push({ key: 'sl' + i, color: c.color, dash: vis.toFixed(1) + ' ' + (CIRC - vis).toFixed(1), offset: off.toFixed(1) });
      });
      return out;
    };
    const donutLegend = (cats) => cats.map((c, i) => ({ key: 'lg' + i, label: c.label, pct: c.n + ' %', color: c.color }));
    const seasonNum = expenseNum * 4.3;
    const outstandingVal = all ? 'kr 48 200' : (sel === 'vif' ? 'kr 21 400' : (sel === 'fana' ? 'kr 14 800' : 'kr 12 000'));
    const seasonCats = seasonCategories(en);

    const agSpRaw = this.state.agreementFor >= 0 ? ((rowSets.sponsors || [])[this.state.agreementFor] || this.state.extraSponsors.find(e => e.si === this.state.agreementFor)) : null;
    const agSp = agSpRaw || null;
    const agX = agSp ? Object.assign({}, sponsorInfo[this.state.agreementFor] || agSp.info || {}, agreementText[this.state.agreementFor] || agSp.text || {}) : {};
    const rows = (rowSets[tab] || []).filter(keep).map((r, i) => ({
      key: 'rw' + tab + i,
      title: r.title,
      meta: (all ? clubOf(r.club) + ' · ' : '') + r.meta,
      amount: r.amount,
      tag: r.tag,
      tagStyle: pill(r.kind)
    }));

    const allActs = this.baseActs(en).concat(this.state.newActs);
    const memGroup = this.state.memGroup;
    const groupOptions = all
      ? []
      : this.groupsOf(sel, en).map((g, i) => ({ id: 'g:' + g, name: g, key: 'gf' + i }))
          .concat(allActs.filter(a => a.club === sel).map((a, i) => ({ id: 'e:' + a.id, name: a.title, key: 'ef' + i })));
    const inGroupFilter = (m) => {
      if (memGroup === 'all') return true;
      if (memGroup.indexOf('g:') === 0) return m.group === memGroup.slice(2);
      if (memGroup.indexOf('e:') === 0) {
        const ev = allActs.find(a => a.id === memGroup.slice(2));
        return !!(ev && (ev.members || []).indexOf(m.id) !== -1);
      }
      return true;
    };
    const memAll = this.members(en).filter(keep).filter(inGroupFilter);
    const mq = this.state.memQ.trim().toLowerCase();
    const memList = mq ? memAll.filter(m => (m.name + ' ' + m.group + ' ' + m.role).toLowerCase().includes(mq)) : memAll;
    const unpaidList = memAll.filter(m => m.due > 0);
    const deptTree = [
      { id: 'c-vif', kind: 'club', club: 'vif', name: clubOf('vif'), kids: [
        { id: 'd-vif-f', name: en ? 'Football' : 'Fotball', kids: [
          { id: 'd-vif-fg', name: en ? 'Boys' : 'Gutter', kids: [
            { id: 'd-vif-g14', name: en ? 'U14' : 'G14', kids: [{ id: 'd-vif-g14a', name: 'Team A', n: 11, dot: '#2f6fb3' }, { id: 'd-vif-g14b', name: 'Team B', n: 13, dot: '#c9363f' }] },
            { id: 'd-vif-g16', name: en ? 'U16' : 'G16', n: 21 }] },
          { id: 'd-vif-fj', name: en ? 'Girls' : 'Jenter', kids: [{ id: 'd-vif-j12', name: en ? 'U12 girls' : 'J12', n: 5 }] },
          { id: 'd-vif-k', name: en ? 'Goalkeepers' : 'Keeper', n: 8 }] },
        { id: 'd-vif-h', name: en ? 'Handball' : 'Håndball', kids: [{ id: 'd-vif-hj', name: en ? 'U12 girls' : 'J12', n: 18 }, { id: 'd-vif-hu', name: en ? 'Youth' : 'Ungdom', n: 15 }] }] },
      { id: 'c-fana', kind: 'club', club: 'fana', name: clubOf('fana'), kids: [
        { id: 'd-fana-f', name: en ? 'Football' : 'Fotball', kids: [{ id: 'd-fana-10', name: en ? 'U10' : 'G10', n: 22 }, { id: 'd-fana-12', name: en ? 'U12' : 'G12', kids: [{ id: 'd-fana-12a', name: 'Team A', n: 10, dot: '#2f6fb3' }, { id: 'd-fana-12b', name: 'Team B', n: 10, dot: '#c9363f' }] }, { id: 'd-fana-s', name: en ? 'Seniors' : 'Senior', n: 26 }] },
        { id: 'd-fana-t', name: en ? 'Tournament crew' : 'Turneringsgruppa', kids: [{ id: 'd-fana-ti', name: 'Kiosk', n: 9 }, { id: 'd-fana-tb', name: en ? 'Pitch and set-up' : 'Bane og oppsett', n: 7 }] }] },
      { id: 'c-varden', kind: 'club', club: 'varden', name: clubOf('varden'), kids: [
        { id: 'd-varden-b', name: en ? 'Table tennis' : 'Bordtennis', kids: [{ id: 'd-varden-n', name: en ? 'Beginners' : 'Nybegynnere', n: 14 }, { id: 'd-varden-v', name: en ? 'Advanced' : 'Viderekomne', n: 11 }] }] }
    ];
    const deptAdded = this.state.deptAdded || [], deptGone = this.state.deptGone || {}, deptOpenMap = this.state.deptOpenMap || {};
    const deptVisibleRoots = deptTree.filter(c => all || c.club === sel);
    const deptRootId = (deptVisibleRoots[0] || deptTree[0]).id;
    const deptParents = [];
    const deptRows = [];
    const dotColors = ['#2f6fb3', '#c9363f', '#E0A100', '#7a52c2'];
    const deptSum = (n) => { const kids = (n.kids || []).concat(deptAdded.filter(a => a.parent === n.id)).filter(k => !deptGone[k.id]); return (n.n || 0) + kids.reduce((t, k) => t + deptSum(k), 0); };
    const deptQl = (this.state.deptQ || '').trim().toLowerCase();
    const deptKids = (n) => (n.kids || []).concat(deptAdded.filter(a => a.parent === n.id)).filter(k => !deptGone[k.id]);
    const deptHas = (n) => !deptQl || n.name.toLowerCase().includes(deptQl) || deptKids(n).some(deptHas);
    const deptWalk = (n, depth, club) => {
      if (!deptHas(n)) return;
      const kids = deptKids(n).filter(k => !deptQl || deptHas(k));
      const open = deptQl ? true : deptOpenMap[n.id] !== false;
      const isClub = n.kind === 'club';
      const isLeafDot = !kids.length && depth >= 2;
      deptParents.push({ id: n.id, kind: n.kind || 'node', label: (isClub ? '' : '— '.repeat(Math.max(0, depth - 1))) + n.name + (isClub || !all ? '' : ' · ' + clubOf(club)) });
      const added = !!deptAdded.find(a => a.id === n.id);
      deptRows.push({
        key: 'dr' + n.id, name: n.name, indent: (depth * 20) + 'px',
        hasKids: kids.length > 0 && !isClub, noKids: !(kids.length > 0 && !isClub), open: open, chev: open ? 'rotate(0deg)' : 'rotate(-90deg)',
        dotStyle: n.dot || isLeafDot ? 'width: 10px; height: 10px; border-radius: 999px; background: ' + (n.dot || dotColors[(n.id.length + depth) % dotColors.length]) : 'display: none',
        nameStyle: 'min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: ' + (depth <= 1 || kids.length ? 800 : 500) + '; font-family: ' + (depth <= 1 ? 'var(--font-heading)' : 'var(--font-body)'),
        count: deptSum(n) + (en ? ' Members' : ' medlemmer'),
        countStyle: 'font-weight: ' + (depth <= 1 ? 700 : 500),
        toggle: () => this.setState(st => ({ deptOpenMap: Object.assign({}, st.deptOpenMap || {}, { [n.id]: (st.deptOpenMap || {})[n.id] === false }) })),
        menu: () => this.setState(st => ({ deptMenu: st.deptMenu === n.id ? '' : n.id })),
        menuOpen: this.state.deptMenu === n.id,
        canRemove: !isClub,
        addHere: () => this.setState({ deptMenu: '', deptModal: 'group', dmName: '', gmShort: '', gmFull: '', gmDesc: '', gmContact: '', dmParent: n.id }),
        remove: () => this.setState(st => ({ deptGone: Object.assign({}, st.deptGone || {}, { [n.id]: true }), deptMenu: '' }))
      });
      if (kids.length && (open || isClub)) kids.forEach(k => deptWalk(k, depth + 1, club));
    };
    deptVisibleRoots.forEach(c => deptWalk(c, 0, c.club));
    const typeNames = { active: en ? 'Active member' : 'Aktivt medlem', support: en ? 'Supporting member' : 'Støttemedlem', coach: en ? 'Coach' : 'Trener', family: en ? 'Family membership' : 'Familiemedlemskap' };
    const typeOfRole = (m) => /trener|coach/i.test(m.role) ? 'coach' : /forelder|parent/i.test(m.role) ? 'support' : 'active';
    const addedAll = (this.state.addedMems || []).filter(m => all || m.club === sel);
    const tblSrc = memList.map(m => ({ open: () => this.setState({ member: m.id }), id: m.id, name: m.name, email: m.email, type: typeNames[typeOfRole(m)], paid: m.due === 0 })).concat(addedAll.filter(m => !mq || (m.name + ' ' + m.email).toLowerCase().includes(mq)).map(m => ({ id: m.id, name: m.name, email: m.email, type: typeNames[m.type] || m.type, paid: true, isNew: true, open: () => {} })));
    const tblAll = !!this.state.tblAll;
    const tblPer = [15, 25, 50, 100, 250].indexOf(this.state.tblPer) !== -1 ? this.state.tblPer : 15;
    const tblPageCount = Math.max(1, Math.ceil(tblSrc.length / tblPer));
    const tblPageN = Math.min(this.state.tblPage || 1, tblPageCount);
    const tblShown = tblAll ? tblSrc : tblSrc.slice((tblPageN - 1) * tblPer, tblPageN * tblPer);
    const tblSel = this.state.tblSel || {};
    const tblChecked = tblSrc.filter(r => tblSel[r.id]);
    const bulkKey = sel + '|' + memGroup + '|' + this.state.memQ.trim().toLowerCase();
    const openMem = this.members(en).find(m => m.id === this.state.member) || null;
    let openGuardian = null;
    this.members(en).forEach(m => (m.guardians || []).forEach(g => { if (g.id === this.state.guardian) openGuardian = g; }));
    const seedNotes = openMem ? [
      { from: 'Nora Five', when: en ? '2 weeks ago' : 'for 2 uker siden', text: en ? 'Strong progress on defence positioning. Keep pairing with the older group.' : 'God framgang på forsvarsplassering. Fortsett å parre med den eldre gruppa.' },
      { from: 'Sigrid A.', when: en ? 'last month' : 'forrige måned', text: en ? 'Missed three sessions in a row — parents contacted, all good now.' : 'Tre økter uten oppmøte — foresatte kontaktet, alt i orden nå.' }
    ] : [];
    const noteList = (openMem ? seedNotes.concat(this.state.notes[openMem.id] || []) : []).map((n, i) => ({
      key: 'nt' + i, from: n.from, when: n.when, text: n.text
    }));

    const scope = this.state.invScope;
    const invClub = all ? (scope === 'club' ? this.state.invTarget : 'vif') : sel;
    const defaultTarget = (sc2) => {
      if (sc2 === 'club') return all ? 'vif' : sel;
      if (sc2 === 'group') return (this.groupsOf(all ? 'vif' : sel, en)[0] || '');
      if (sc2 === 'event') return (allActs.filter(a => all || a.club === sel)[0] || {}).id || '';
      return (this.members(en).filter(m => all || m.club === sel)[0] || {}).id || '';
    };
    const invTargets = scope === 'club'
      ? clubs.map(c => ({ key: 'it' + c.id, id: c.id, name: c.name }))
      : (scope === 'group'
        ? this.groupsOf(invClub, en).map((g, i) => ({ key: 'ig' + i, id: g, name: g }))
        : (scope === 'event'
          ? allActs.filter(a => all || a.club === sel).map(a => ({ key: 'ie' + a.id, id: a.id, name: a.title + ' · ' + a.day + '.' + a.m }))
          : this.members(en).filter(m => all || m.club === sel).map(m => ({ key: 'ip' + m.id, id: m.id, name: m.name }))));
    const invCount = scope === 'club'
      ? (this.state.invTarget === 'vif' ? 284 : (this.state.invTarget === 'fana' ? 221 : 107))
      : (scope === 'group'
        ? 18
        : (scope === 'event'
          ? ((allActs.find(a => a.id === this.state.invTarget) || {}).signed || 0)
          : 1));

    const period = this.state.memPeriod;
    const labels = period === 'week'
      ? (en ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : ['man','tir','ons','tor','fre','lør','søn'])
      : (period === 'month'
        ? (en ? ['Week 1','Week 2','Week 3','Week 4','Week 5'] : ['Uke 1','Uke 2','Uke 3','Uke 4','Uke 5'])
        : (en ? ['Jan','Mar','May','Jul','Sep','Nov'] : ['jan','mar','mai','jul','sep','nov']));
    const baseMem = period === 'week' ? 1.1 : (period === 'month' ? 3.2 : 14);
    const baseAvg = period === 'week' ? 0.9 : (period === 'month' ? 2.7 : 12);
    const ratio = openMem ? openMem.att / Math.max(1, openMem.avg) : 1;
    const memSeries = this.series(openMem ? openMem.seed : 3, baseMem * ratio, labels.length);
    const avgSeries = this.series(2, baseAvg, labels.length);
    const rawMax = Math.max.apply(null, memSeries.concat(avgSeries));
    const peak = Math.max(4, 4 * Math.ceil(rawMax / 4));
    const x0 = 52, x1 = 504, y0 = 216, y1 = 24;
    const px = (i) => labels.length === 1 ? x0 : x0 + (x1 - x0) * i / (labels.length - 1);
    const py = (v) => y0 - (y0 - y1) * (v / peak);
    const memPts = memSeries.map((v, i) => [px(i), py(v)]);
    const avgPts = avgSeries.map((v, i) => [px(i), py(v)]);
    const memPath = this.smoothPath(memPts);
    const avgPath = this.smoothPath(avgPts);
    const closeArea = (d, pts) => d ? d + ' L ' + pts[pts.length - 1][0].toFixed(1) + ' ' + y0 + ' L ' + pts[0][0].toFixed(1) + ' ' + y0 + ' Z' : '';
    const chart = {
      grid: [], yTicks: [], xTicks: [],
      memPath: memPath,
      avgPath: avgPath,
      memArea: closeArea(memPath, memPts),
      avgArea: closeArea(avgPath, avgPts),
      memDots: memSeries.map((v, i) => ({ key: 'md' + i, x: px(i).toFixed(1), y: py(v).toFixed(1) }))
    };
    for (let i = 0; i <= 4; i++) {
      const v = peak * i / 4;
      chart.grid.push({ key: 'gr' + i, y: py(v).toFixed(1) });
      chart.yTicks.push({
        key: 'yt' + i,
        label: String(Math.round(v)),
        style: 'position: absolute; right: ' + (100 - 48 / 520 * 100).toFixed(2) + '%; top: ' + (py(v) / 260 * 100).toFixed(2) + '%; transform: translateY(-50%); font-size: 11.5px; color: rgba(22,36,26,.75); white-space: nowrap'
      });
    }
    const hoverIdx = this.state.hover >= 0 && this.state.hover < labels.length ? this.state.hover : -1;
    const zoneW = (x1 - x0) / Math.max(1, labels.length - 1);
    labels.forEach((l, i) => chart.xTicks.push({
      key: 'xt' + i,
      label: l,
      style: 'position: absolute; left: ' + (px(i) / 520 * 100).toFixed(2) + '%; top: ' + (224 / 260 * 100).toFixed(2) + '%; transform: translateX(-50%); font-size: 11.5px; color: rgba(22,36,26,.75); white-space: nowrap'
    }));

    const inputStyle = 'width: 100%; box-sizing: border-box; padding: 14px 18px; border-radius: 18px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 15px; outline: none';

    return {
      tAdmin: en ? 'Administrator' : 'Administrator',
      langLabel: en ? 'NO' : 'EN',
      toggleLang: () => this.setState(s => ({ lang: s.lang === 'no' ? 'en' : 'no' })),
      initials: 'SA',
      tLogout: en ? 'Log out' : 'Logg ut',
      tGreeting: en ? 'Hi' : 'Hei',
      firstName: 'Sigrid',
      ...this.adminProfileVals(en, clubs),
      subline: all
        ? (en ? 'You administer ' + clubs.length + ' clubs in the sports association.' : 'Du administrerer ' + clubs.length + ' klubber i idrettslaget.')
        : (en ? 'You are administering ' + clubOf(sel) + '.' : 'Du administrerer ' + clubOf(sel) + '.'),
      today: en ? 'Sunday 13 September' : 'Søndag 13. september',
      tClub: en ? 'Club' : 'Klubb',
      demoOpen: !!this.state.demoPanel,
      toggleDemo: () => this.setState(st => ({ demoPanel: !st.demoPanel })),
      closeDemo: () => this.setState({ demoPanel: false }),
      demoArrow: this.state.demoPanel ? '›' : '‹',
      demoHandleRight: this.state.demoPanel ? 'min(100vw, 520px)' : '0px',
      demoTransform: this.state.demoPanel ? 'translateX(0)' : 'translateX(105%)',
      demoScrimOpacity: this.state.demoPanel ? '1' : '0',
      demoScrimPointer: this.state.demoPanel ? 'auto' : 'none',
      tTblTitle: en ? 'Member register' : 'Medlemsregister',
      tblSub: tblSrc.length + (en ? ' members' : ' medlemmer') + ' · ' + (all ? (en ? 'all clubs' : 'alle klubber') : clubOf(sel)),
      tExportUsers: en ? 'Export users' : 'Eksporter brukere',
      tAddMember: en ? 'Add member' : 'Legg til medlem',
      tSelectAll: en ? 'Select all' : 'Velg alle',
      tColName: en ? 'Name' : 'Navn', tColEmail: en ? 'Email' : 'E-post', tColType: en ? 'Membership type' : 'Medlemskapstype', tColStatus: 'Status',
      tblAllChecked: tblSrc.length > 0 && tblChecked.length === tblSrc.length,
      tblToggleAll: () => this.setState(st => { const cur = st.tblSel || {}; const every = tblSrc.length > 0 && tblSrc.every(r => cur[r.id]); const nx = Object.assign({}, cur); tblSrc.forEach(r => { if (every) delete nx[r.id]; else nx[r.id] = true; }); return { tblSel: nx }; }),
      tblRows: tblShown.map(r => ({ key: 'tr' + r.id, name: r.name, email: r.email, type: r.type, checked: !!tblSel[r.id],
        status: r.paid ? (en ? 'Active' : 'Aktiv') : (en ? 'Unpaid' : 'Ubetalt'),
        statusStyle: 'display: inline-block; padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; ' + (r.paid ? 'background: rgba(116,205,133,.3); color: #16241a;' : 'background: rgba(148,92,214,.18); color: #4b2a85;'),
        rowStyle: 'display: grid; grid-template-columns: 44px minmax(150px,1.3fr) minmax(190px,1.6fr) minmax(140px,1fr) 100px; gap: 12px; align-items: center; height: 62px; box-sizing: border-box; overflow: hidden; padding: 0 14px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 14px; cursor: pointer; transition: background .2s; background: ' + (tblSel[r.id] ? '#eaf7ed' : 'transparent') + ';',
        open: r.open,
        toggle: () => this.setState(st => { const nx = Object.assign({}, st.tblSel || {}); if (nx[r.id]) delete nx[r.id]; else nx[r.id] = true; return { tblSel: nx }; })
      })),

      tblMulti: tblSrc.length > 0,
      tTblPer: en ? 'Members per page' : 'Medlemmer per side',
      tblPer: String(tblPer),
      onTblPer: (e) => this.setState({ tblPer: parseInt(e.target.value, 10), tblPage: 1, tblAll: false }),
      tblPerOpts: [15, 25, 50, 100, 250].map(v => ({ key: 'tpo' + v, v: v })),
      tblPages: (() => {
        const n = tblPageCount, cur = tblPageN;
        const btn = (key, label, go, on, dis, wide) => ({ key: key, label: label, go: dis ? () => {} : go, aria: label,
          style: 'min-width: ' + (wide ? '72px' : '36px') + '; height: 36px; padding: 0 10px; border-radius: 8px; font-family: var(--font-heading); font-weight: 800; font-size: 13px; border: 1px solid ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.14)') + '; background: ' + (on ? '#1f7a3a' : '#ffffff') + '; color: ' + (on ? '#ffffff' : '#16241a') + '; cursor: ' + (dis ? 'default' : 'pointer') + '; opacity: ' + (dis ? '.4' : '1') + '; box-shadow: ' + (on ? 'none' : '0 1px 2px rgba(22,36,26,.08)') });
        const out = [btn('tp-first', '«', () => this.setState({ tblPage: 1, tblAll: false }), false, cur === 1 && !tblAll)];
        let nums = [];
        if (n <= 7) { for (let i = 1; i <= n; i++) nums.push(i); }
        else if (cur <= 4) nums = [1, 2, 3, 4, 5, '…', n];
        else if (cur >= n - 3) nums = [1, '…', n - 4, n - 3, n - 2, n - 1, n];
        else nums = [1, '…', cur - 1, cur, cur + 1, '…', n];
        nums.forEach((v, i) => {
          if (v === '…') out.push({ key: 'tp-dots' + i, label: '…', go: () => {}, aria: '', style: 'min-width: 24px; height: 36px; display: grid; place-items: center; border: 0; background: transparent; color: rgba(22,36,26,.6); font-weight: 800' });
          else out.push(btn('tp' + v, String(v), () => this.setState({ tblPage: v, tblAll: false }), !tblAll && v === cur, false));
        });
        out.push(btn('tp-all', en ? 'Show all' : 'Vis alle', () => this.setState(st => ({ tblAll: !st.tblAll, tblPage: 1 })), tblAll, false, true));
        out.push(btn('tp-last', '»', () => this.setState({ tblPage: n, tblAll: false }), false, cur === n && !tblAll));
        return out;
      })(),
      tblSelAny: tblChecked.length > 0,
      tblSelNote: tblChecked.length + (en ? ' selected — export includes only these.' : ' valgt – eksporten tar bare med disse.'),
      exportMembers: () => {
        const rows = (tblChecked.length ? tblChecked : tblSrc);
        const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
        const csv = '\ufeff' + [[en ? 'Name' : 'Navn', en ? 'Email' : 'E-post', en ? 'Membership type' : 'Medlemskapstype', 'Status']].concat(rows.map(r => [r.name, r.email, r.type, r.paid ? (en ? 'Active' : 'Aktiv') : (en ? 'Unpaid' : 'Ubetalt')])).map(l => l.map(q).join(';')).join('\r\n');
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        a.download = (en ? 'members' : 'medlemmer') + '.csv';
        document.body.appendChild(a); a.click(); a.remove();
      },
      addMemOpen: !!this.state.addMemOpen,
      openAddMember: () => this.setState({ addMemOpen: true, amName: '', amEmail: '', amType: 'active' }),
      closeAddMember: () => this.setState({ addMemOpen: false }),
      amName: this.state.amName || '', amEmail: this.state.amEmail || '', amType: this.state.amType || 'active',
      onAmName: (e) => this.setState({ amName: e.target.value }),
      onAmEmail: (e) => this.setState({ amEmail: e.target.value }),
      onAmType: (e) => this.setState({ amType: e.target.value }),
      amTypes: ['active', 'support', 'coach', 'family'].map(k => ({ key: 'am' + k, id: k, name: typeNames[k] })),
      saveMember: (e) => {
        e.preventDefault();
        const nm = (this.state.amName || '').trim(), em = (this.state.amEmail || '').trim();
        if (!nm || !em) return;
        const club = all ? 'vif' : sel;
        this.setState(st => ({ addedMems: (st.addedMems || []).concat([{ id: 'new' + Date.now(), club: club, name: nm, email: em, type: st.amType || 'active' }]), addMemOpen: false }));
      },
      stopClick: (e) => e.stopPropagation(),

      navTabs: navDefs.map(t => {
        if (t.menu) {
          const m = menus[t.menu];
          const isOpen = !!(this.state.navOpen || {})[t.menu];
          const active = m.subs.some(x => x.id === tab);
          return {
            key: 'nv' + t.menu,
            label: m.label,
            isMenu: true,
            isPlain: false,
            open: isOpen,
            chevron: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            pick: () => this.setState(st => ({ navOpen: Object.assign({}, st.navOpen || {}, { [t.menu]: !(st.navOpen || {})[t.menu] }) })),
            style: navItem(active), act: active ? 'yes' : 'no',
            items: m.subs.map(sub => ({
              key: 'sub' + sub.id,
              label: sub.label,
              note: sub.note,
              pick: () => this.setState({ tab: sub.id, navMenu: '', kpiPanel: false, spCal: false, bulkSms: 0, bulkSmsAt: '' }),
              style: 'display: block; width: 100%; box-sizing: border-box; text-align: left; cursor: pointer; padding: 9px 12px; border-radius: 10px; border: 0; font-family: var(--font-body); color: #16241a; transition: background .25s;'
                + (tab === sub.id ? ' background: rgba(116,205,133,.26);' : ' background: transparent;')
            }))
          };
        }
        return {
          key: 'nv' + t.id,
          label: t.label,
          isMenu: false,
          isPlain: true,
          open: false,
          chevron: '',
          items: [],
          pick: () => this.setState(st => ({ tab: t.id, navMenu: '', kpiPanel: false, spCal: false, bulkSms: 0, bulkSmsAt: '' , club: (t.id === 'booking' && st.club === 'all') ? 'vif' : st.club, venDraft: null, venSaved: '' })),
          style: navItem(tab === t.id), act: tab === t.id ? 'yes' : 'no'
        };
      }),
      showInvoicing: tab === 'invoicing',
      showSupplier: tab === 'supplier',
      showBudget: tab === 'budget',
      showComms: tab === 'comms',
      showPlanning: tab === 'planning',
      showDocs: tab === 'docs',
      showVolunteer: tab === 'volunteer',
      showIntegr: tab === 'integr',
      showTeamFund: tab === 'teamfund',
      tOpenKpi: en ? 'Open key figures' : 'Åpne nøkkeltall',
      tKpiPanel: en ? 'Key figures' : 'Nøkkeltall',
      kpiPanelSub: (all ? (en ? 'All clubs' : 'Alle klubber') : clubOf(sel)) + ' · ' + tfRangeLabel,
      openKpiPanel: () => this.setState({ kpiPanel: true, exportOpen: false }),
      closeKpiPanel: () => this.setState({ kpiPanel: false }),
      kpiPanelTransform: this.state.kpiPanel ? 'translateX(0)' : 'translateX(105%)',
      kpiScrimOpacity: this.state.kpiPanel ? '1' : '0',
      kpiScrimPointer: this.state.kpiPanel ? 'auto' : 'none',
      kpiOpen: this.state.kpiPanel,
      tMonthlyResult: en ? 'Result by month · 2026' : 'Resultat per måned · 2026',
      tIncomeLegend: en ? 'Income' : 'Inntekt',
      tExpenseLegend: en ? 'Expenses' : 'Utgift',
      yearResultLabel: (this.state.tfPeriod === 'year' ? (en ? 'Year to date ' : 'Hittil i år ') : (en ? 'Period ' : 'Perioden ')) + sgn(resPeriod, resKr),
      resTicks: resTicks,
      resMonths: resMonths,
      resLeave: () => this.setState({ resHover: -1 }),
      tResultLegend: en ? 'Result' : 'Resultat',
      resWave: resWave,
      resDots: resDots,
      resTipShow: !!resTip,
      resTipLeft: resTip ? resTip.left : '0%',
      resTipShift: resTip ? resTip.shift : '0',
      resTipMonth: resTip ? resTip.month : '',
      resTipInc: resTip ? resTip.inc : '',
      resTipExp: resTip ? resTip.exp : '',
      resTipRes: resTip ? resTip.res : '',
      resTipResColor: resTip ? resTip.resColor : '#f6f8f3',
      toggleKpiPanel: () => this.setState(st => ({ kpiPanel: !st.kpiPanel, exportOpen: false })),
      tKpiToggle: this.state.kpiPanel ? (en ? 'Close key figures' : 'Lukk nøkkeltall') : (en ? 'Open key figures' : 'Åpne nøkkeltall'),
      kpiArrow: this.state.kpiPanel ? '›' : '‹',
      kpiHandleRight: this.state.kpiPanel ? 'min(max(75vw, min(100vw, 900px)), 100vw - 40px)' : '0px',
      showSplit: tab !== 'members' && tab !== 'teamfund' && tab !== 'timetable' && tab !== 'sponsors' && tab !== 'roles' && tab !== 'depts' && tab !== 'board' && tab !== 'booking',
      showBoard: tab === 'board',
      showRoles: tab === 'roles',
      showDepts: tab === 'depts',
      tDeptHeading: en ? 'Departments and groups' : 'Avdelinger og grupper',
      tDeptIntro: en ? 'Departments organise groups in a hierarchy. When you create a new group and add members, the group is automatically visible to members in the Kretz app.' : 'Avdelinger brukes til å organisere grupper i et hierarki. Når du oppretter en ny gruppe og legger til medlemmer, blir gruppen automatisk synlig for medlemmene i Kretz-appen.',
      tAddDept: en ? 'Create department' : 'Opprett avdeling',
      tImportGroup: en ? 'Import group' : 'Importer gruppe',
      tAddGroup: en ? 'Create group' : 'Opprett gruppe',
      tColCount: en ? 'Count' : 'Antall',
      tMore: en ? 'More' : 'Mer', tAddHere: en ? 'Create group here' : 'Opprett gruppe her', tRemove: en ? 'Remove' : 'Fjern',
      tSave: en ? 'Save' : 'Lagre',
      deptRows: deptRows,
      deptQ: this.state.deptQ || '',
      onDeptQ: (e) => this.setState({ deptQ: e.target.value }),
      tDeptSearch: en ? 'Search group names…' : 'Søk etter gruppenavn …',
      tDeptNone: en ? 'No groups match your search.' : 'Ingen grupper matcher søket.',
      deptNone: deptRows.length === 0,
      deptImportMsg: this.state.deptImportMsg || '',
      closeDeptMenu: () => this.setState({ deptMenu: '' }),
      pickImport: () => { const el = this._root && this._root.querySelector ? this._root.querySelector('[data-dept-import]') : document.querySelector('[data-dept-import]'); if (el) el.click(); },
      onImportFile: (e) => {
        const f = e.target.files && e.target.files[0]; if (!f) return;
        const rd = new FileReader();
        rd.onload = () => {
          const names = String(rd.result).split(/\r?\n/).map(l => l.split(/[;,\t]/)[0].replace(/^"|"$/g, '').trim()).filter(Boolean).slice(0, 60);
          const parent = deptParents[0] ? deptParents[0].id : '';
          if (!names.length || !parent) return;
          this.setState(st => ({ deptAdded: (st.deptAdded || []).concat(names.map((n, i) => ({ id: 'imp' + Date.now() + i, parent: parent, name: n, count: 0 }))), deptImportMsg: names.length + (en ? ' groups imported.' : ' grupper importert.') }));
          setTimeout(() => this.setState({ deptImportMsg: '' }), 4000);
        };
        rd.readAsText(f); e.target.value = '';
      },
      openAddDept: () => this.setState({ deptModal: 'dept', dmName: '', dmParent: deptRootId }),
      openAddGroup: () => this.setState({ deptModal: 'group', dmName: '', gmShort: '', gmFull: '', gmDesc: '', gmContact: '', dmParent: (deptParents.find(p => p.kind !== 'club') || deptParents[0] || {}).id || '' }),
      closeDeptModal: () => this.setState({ deptModal: '' }),
      deptModal: !!this.state.deptModal,
      deptModalIsGroup: this.state.deptModal === 'group',
      deptModalIsDept: this.state.deptModal === 'dept',
      tNewGroup: en ? 'New group' : 'Ny gruppe',
      tGmDept: en ? 'Department' : 'Avdeling', tGmDeptHelp: '',
      tSelectList: en ? '- Select from list -' : '- Velg fra liste -',
      tGmShort: en ? 'Short group name' : 'Kort gruppenavn', tGmShortHelp: en ? 'Shown together with the club and department name. Max. 30 characters.' : 'Vises sammen med klubb- og avdelingsnavnet. Maks 30 tegn.', tGmShortPh: en ? 'For example: U11' : 'For eksempel: G11',
      tGmFull: en ? 'Full group name' : 'Fullt gruppenavn', tGmFullHelp: en ? 'This is how the group is displayed in the Kretz app. Max. 60 characters.' : 'Slik vises gruppen i Kretz-appen. Maks 60 tegn.', tGmFullPh: en ? 'For example: Fana football 2015' : 'For eksempel: Fana fotball 2015',
      tGmDesc: en ? 'Description' : 'Beskrivelse', tGmDescHelp: en ? 'Description of the group. Max. 250 characters.' : 'Beskrivelse av gruppen. Maks 250 tegn.', tOptional: en ? 'Optional' : 'Valgfritt',
      tGmContact: en ? 'Contact person' : 'Kontaktperson', tGmContactHelp: en ? 'This person receives all general inquiries about the group. They can be a group manager or a club administrator.' : 'Denne personen mottar alle generelle henvendelser om gruppen. Det kan være en gruppeleder eller en klubbadministrator.',
      tGmActivity: en ? 'Activity' : 'Aktivitet', tGmAge: en ? 'Age group' : 'Aldersgruppe', tCancel: en ? 'Cancel' : 'Avbryt',
      gmShort: this.state.gmShort || '', onGmShort: (e) => this.setState({ gmShort: e.target.value }),
      gmFull: this.state.gmFull || '', onGmFull: (e) => this.setState({ gmFull: e.target.value }),
      gmDesc: this.state.gmDesc || '', onGmDesc: (e) => this.setState({ gmDesc: e.target.value }),
      gmContact: this.state.gmContact || '', onGmContact: (e) => this.setState({ gmContact: e.target.value }),
      gmActivity: this.state.gmActivity || (en ? 'Football' : 'Fotball'), onGmActivity: (e) => this.setState({ gmActivity: e.target.value }),
      gmAge: this.state.gmAge || (en ? 'Children / young people' : 'Barn / ungdom'), onGmAge: (e) => this.setState({ gmAge: e.target.value }),
      gmContactOpts: (() => { const seen = {}; return this.members(en).filter(m => { if (seen[m.name]) return false; seen[m.name] = 1; return true; }).map(m => ({ key: 'gc' + m.id, name: m.name })); })(),
      gmActivityOpts: (en ? ['Football', 'Handball', 'Table tennis', 'Other'] : ['Fotball', 'Håndball', 'Bordtennis', 'Annet']).map(n => ({ key: 'ga' + n, name: n })),
      gmAgeOpts: (en ? ['Children / young people', 'Adults', 'All ages'] : ['Barn / ungdom', 'Voksne', 'Alle aldre']).map(n => ({ key: 'gg' + n, name: n })),
      deptModalTitle: this.state.deptModal === 'group' ? (en ? 'Create group' : 'Opprett gruppe') : (en ? 'Create department' : 'Opprett avdeling'),
      dmPlaceholder: this.state.deptModal === 'group' ? (en ? 'Group name' : 'Gruppenavn') : (en ? 'Department name' : 'Navn på avdeling'),
      dmName: this.state.dmName || '', dmParent: this.state.dmParent || '',
      onDmName: (e) => this.setState({ dmName: e.target.value }),
      onDmParent: (e) => this.setState({ dmParent: e.target.value }),
      dmParentOptions: (this.state.deptModal === 'dept' ? deptParents.filter(p => p.kind === 'club') : deptParents).map(p => ({ key: 'dp' + p.id, id: p.id, name: p.label })),
      saveDeptModal: (e) => {
        e.preventDefault();
        const isG = this.state.deptModal === 'group';
        const nm = ((isG ? this.state.gmShort : this.state.dmName) || '').trim(), pr = this.state.dmParent || deptRootId; if (!nm) return;
        const extra = isG ? { full: (this.state.gmFull || '').trim(), desc: (this.state.gmDesc || '').trim(), contact: this.state.gmContact || '', activity: this.state.gmActivity || '', age: this.state.gmAge || '' } : {};
        this.setState(st => ({ deptAdded: (st.deptAdded || []).concat([Object.assign({ id: 'n' + Date.now(), parent: pr, name: nm, count: 0 }, extra)]), deptOpenMap: Object.assign({}, st.deptOpenMap || {}, { [pr]: true }), deptModal: '' }));
      },
      showSponsorsPage: tab === 'sponsors',
      sponsorRows: (rowSets.sponsors || []).map((r, si) => Object.assign({ si: si }, r)).concat(this.state.extraSponsors).filter(keep).map(r => {
        const x = r.info || sponsorInfo[r.si] || {};
        const inactive = !!this.state.inactiveSponsors[r.si];
        const open = this.state.sponsorOpen === r.si;
        const nextRep = (x.reports || []).find(p => !p.done);
        const subject = (en ? 'Report — ' : 'Rapport — ') + clubOf(r.club) + ' × ' + r.title + (nextRep ? ' (' + nextRep.title + ')' : '');
        const body = (en ? 'Hi ' : 'Hei ') + (x.person || '') + ',\n\n'
          + (en ? 'Attached is our report for ' : 'Vedlagt er vår rapport for ') + (nextRep ? nextRep.title.toLowerCase() : (en ? 'the period' : 'perioden')) + (en ? ' under our sponsorship agreement.' : ' i sponsoravtalen vår.') + '\n\n'
          + (en ? 'Best regards\n' : 'Vennlig hilsen\n') + 'Sigrid A.\n' + clubOf(r.club);
        return {
          key: 'sp' + r.si,
          anchor: 'sponsor-' + r.si,
          title: r.title,
          meta: (all ? clubOf(r.club) + ' · ' : '') + r.meta,
          amount: r.amount,
          tag: inactive ? (en ? 'inactive' : 'inaktiv') : r.tag,
          tagStyle: inactive ? 'flex: 0 0 auto; padding: 7px 13px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; background: #b8240e; color: #ffffff;' : pill(r.kind),
          active: !inactive,
          inactive: inactive,
          menuOpen: this.state.sponsorMenu === r.si,
          toggleMenu: () => this.setState(st => ({ sponsorMenu: st.sponsorMenu === r.si ? -1 : r.si })),
          askInactive: () => this.setState({ sponsorMenu: -1, meetQ: '', meetSent: null, formFiles: [], payPaid: {}, payExtra: [], meetings: null, meetingForm: null, decDone: {}, meetingOpenId: '', meetingFiles: {}, roleFilter: '', roleQ: '', roleAssign: null, raName: '', raRole: 'coach', raClub: 'vif', raMsg: '', spCal: false, spCalMonth: 9, spCalPick: 0, confirmInactive: r.si }),
          reactivate: () => this.setState(st => { const m = Object.assign({}, st.inactiveSponsors); delete m[r.si]; return { inactiveSponsors: m, sponsorMenu: -1 }; }),
          open: open,
          toggle: () => this.setState(st => ({ sponsorOpen: st.sponsorOpen === r.si ? -1 : r.si })),
          chevron: open ? 'rotate(180deg)' : 'rotate(0deg)',
          cardStyle: inactive
            ? 'border-radius: 20px; background: #e9ebe7; border: 1.5px solid #b8240e; color: rgba(22,36,26,.55); transition: background .3s, border-color .3s;'
            : 'border-radius: 20px; background: #f4f8f2; border: 1px solid ' + (open ? '#74cd85' : 'rgba(22,36,26,.1)') + '; transition: border-color .3s, box-shadow .3s;' + (open ? ' box-shadow: 0 14px 30px rgba(22,36,26,.1);' : ''),
          facts: [
            { key: 'f1', label: en ? 'Renewed' : 'Fornyet', value: x.renewed || '–', tone: 'plain' },
            { key: 'f2', label: en ? 'Runs until' : 'Gjelder til', value: x.until || '–', tone: 'plain' },
            { key: 'f3', label: en ? 'Next report' : 'Neste rapport', value: nextRep ? nextRep.date : (en ? 'none due' : 'ingen'), tone: nextRep && nextRep.soon ? 'soon' : 'plain' }
          ].map(f => ({ key: f.key, label: f.label, value: f.value, style: 'border-radius: 14px; padding: 10px 12px; ' + (f.tone === 'soon' ? 'background: #fff4cf; border: 1px solid #f2d27a;' : 'background: #ffffff; border: 1px solid rgba(22,36,26,.1);') })),
          reports: (x.reports || []).map((p, pi) => ({
            key: 'rp' + r.si + pi,
            title: p.title,
            date: (p.done ? (en ? 'Sent ' : 'Sendt ') : (en ? 'Due ' : 'Frist ')) + p.date,
            tag: p.done ? (en ? 'sent' : 'sendt') : (p.soon ? (en ? 'due soon' : 'snart') : (en ? 'upcoming' : 'kommer')),
            tagStyle: pill(p.done ? 'ok' : (p.soon ? 'warn' : 'neutral'))
          })),
          files: sponsorFileList(r.si),
          noFiles: sponsorFileList(r.si).length === 0,
          addFiles: (ev) => {
            const list = Array.from(ev.target.files || []).filter(f => f.type === 'application/pdf' || /\.pdf$/i.test(f.name));
            ev.target.value = '';
            if (!list.length) { this.setState({ sponsorMenu: -1 }); return; }
            const si = r.si;
            this.setState(st => {
              const all2 = Object.assign({}, st.sponsorFiles || seedSponsorFiles());
              all2[si] = (all2[si] || []).concat(list.map((f, k) => ({ id: 'f' + Date.now() + k, name: f.name, size: f.size, url: URL.createObjectURL(f), when: en ? 'just now' : 'nå nettopp' })));
              return { sponsorFiles: all2, sponsorMenu: -1, meetQ: '', meetSent: null, formFiles: [], payPaid: {}, payExtra: [], meetings: null, meetingForm: null, decDone: {}, meetingOpenId: '', meetingFiles: {}, roleFilter: '', roleQ: '', roleAssign: null, raName: '', raRole: 'coach', raClub: 'vif', raMsg: '', spCal: false, spCalMonth: 9, spCalPick: 0, sponsorOpen: si };
            });
          },
          openAgreement: () => this.setState({ agreementFor: r.si }),
          mailto: 'mailto:' + (x.email || '') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body),
          contact: (x.person ? x.person + ' · ' : '') + (x.email || '')
        };
      }),
      tReportPlan: en ? 'Reports' : 'Rapporter',
      venTabs: [],
      venName: venCur ? venCur.venue : '',
      venMeta: venCur ? venCur.meta : '',
      venClubSlug: venCur ? venCur.slug : '',
      tVenReset: en ? 'Reset all venues' : 'Tilbakestill alle steder',
      venReset: () => { if (KretzVenues) KretzVenues.reset(); this.setState({ venDraft: null, venSaved: en ? 'All venues reset to default.' : 'Alle steder er tilbakestilt.' }); },
      venSavedShow: !!this.state.venSaved,
      venSavedText: this.state.venSaved,
      tVenHours: en ? 'Opening hours for booking' : 'Åpningstider for booking',
      tVenHoursHint: en ? 'Per day: set the hours and click each unit — once = everyone (green), twice = members only (blue), three times = closed.' : 'Per dag: sett tidene og klikk på hver enhet — én gang = alle (grønn), to ganger = kun medlemmer (blå), tre ganger = stengt.',
      venDays: venDayNames.map((nm, i) => {
        const h = venV && venV.hours ? venV.hours[i] : null;
        const open = !!(h && h[0] && h[1]);
        return {
          key: 'vd' + i, name: nm, open: open, disabled: !open,
          focusDay: () => this.setState({ venDay: venSel === i ? -1 : i }),
          focusTip: en ? 'Show this day in Available units' : 'Vis denne dagen i Tilgjengelige enheter',
          nameStyle: 'text-align: left; padding: 4px 8px; margin-left: -8px; border-radius: 999px; border: 0; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 14px; ' + (venSel === i ? 'background: #16241a; color: #f6f8f3;' : 'background: transparent; color: #16241a;'),
          openLabel: open ? (en ? 'open' : 'åpent') : (en ? 'closed' : 'stengt'),
          from: open ? h[0] : '', to: open ? h[1] : '',
          bg: open ? '#f4f8f2' : 'rgba(22,36,26,.05)',
          inputStyle: 'width: 100%; box-sizing: border-box; padding: 8px 10px; border-radius: 12px; border: 1px solid rgba(22,36,26,.18); background: ' + (open ? '#ffffff' : 'transparent') + '; color: #16241a; font-family: var(--font-body); font-size: 13.5px; outline: none;' + (open ? '' : ' opacity: .45;'),
          toggle: () => venUpd(v => { v.hours = v.hours || {}; if (open) delete v.hours[i]; else v.hours[i] = ['16:00', '22:00']; }),
          unitsLabel: en ? 'Bookable:' : 'Kan bookes:',
          units: venCur ? Array.from({ length: venCur.count }, (_, k) => {
            const n = k + 1;
            const stU = unitState(n, i);
            const isOn = stU === 'all' || stU === 'members';
            const isMem = stU === 'members';
            return {
              key: 'du' + i + '-' + n,
              label: (venCur.unit === 'bord' || venCur.unit === 'table' ? '' : (venCur.unit.charAt(0).toUpperCase() + venCur.unit.slice(1)) + ' ') + n,
              tip: isMem ? (en ? 'Members only this day · click to close' : 'Kun medlemmer denne dagen · klikk for å stenge') : (isOn ? (en ? 'Bookable by everyone this day · click for members only' : 'Alle kan booke denne dagen · klikk for kun medlemmer') : (en ? 'Closed this day · click to open' : 'Stengt denne dagen · klikk for å åpne')),
              toggle: () => venUpd(v => {
                v.dayUnits = v.dayUnits || {}; v.dayAudience = v.dayAudience || {}; v.unavailable = (v.unavailable || []).filter(x => x !== n);
                const closedList = (v.dayUnits[i] || []).slice();
                const memList = (v.dayAudience[i] || []).slice();
                const ci = closedList.indexOf(n), mi = memList.indexOf(n);
                if (ci !== -1) { closedList.splice(ci, 1); }
                else if (mi === -1) { memList.push(n); }
                else { memList.splice(mi, 1); closedList.push(n); }
                v.dayUnits[i] = closedList.sort((a, b) => a - b);
                v.dayAudience[i] = memList.sort((a, b) => a - b);
              }),
              style: 'padding: 6px 12px; border-radius: 999px; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer; transition: background .2s, color .2s, border-color .2s; '
                + (isMem ? 'background: rgba(127,184,255,.38); border: 1px solid #4f8fe0; color: #16241a;'
                  : isOn ? 'background: rgba(116,205,133,.3); border: 1px solid #74cd85; color: #16241a;'
                  : 'background: repeating-linear-gradient(135deg, rgba(22,36,26,.05) 0 4px, rgba(22,36,26,.12) 4px 8px); border: 1px dashed rgba(22,36,26,.35); color: rgba(22,36,26,.5); text-decoration: line-through;')
            };
          }) : [],
          allLabel: ((venV && venV.dayUnits && venV.dayUnits[i]) || []).length ? (en ? 'Open all' : 'Åpne alle') : (en ? 'All open' : 'Alle åpne'),
          allUnits: () => venUpd(v => { v.dayUnits = v.dayUnits || {}; v.dayAudience = v.dayAudience || {}; v.dayUnits[i] = []; v.dayAudience[i] = []; v.unavailable = []; }),
          onFrom: (e) => { const val = e.target.value; venUpd(v => { v.hours[i] = [val, (v.hours[i] || ['', '22:00'])[1]]; }); },
          onTo: (e) => { const val = e.target.value; venUpd(v => { v.hours[i] = [(v.hours[i] || ['16:00', ''])[0], val]; }); }
        };
      }),
      tVenClosed: en ? 'Closed dates' : 'Stengte datoer',
      venCloseDate: this.state.venCloseDate,
      onVenCloseDate: (e) => this.setState({ venCloseDate: e.target.value }),
      tVenAddClosed: en ? '+ Close this date' : '+ Steng denne datoen',
      venAddClosed: () => { const d = this.state.venCloseDate; if (!d) return; venUpd(v => { v.closed = v.closed || {}; v.closed[d] = true; }); this.setState({ venCloseDate: '' }); },
      venClosedList: Object.keys((venV && venV.closed) || {}).sort().map(d => ({ key: 'vc' + d, label: venFmtDate(d), remove: () => venUpd(v => { delete v.closed[d]; }) })),
      venNoClosed: !Object.keys((venV && venV.closed) || {}).length,
      tVenNoClosed: en ? 'No closed dates.' : 'Ingen stengte datoer.',
      tVenRemove: en ? 'Open again' : 'Åpne igjen',
      tVenPrices: en ? 'Prices' : 'Priser',
      tVenPrice: en ? 'Standard price' : 'Ordinær pris',
      tVenMemberPrice: en ? 'Member price' : 'Medlemspris',
      tPerHour: en ? 'per hour' : 'per time',
      venPrice: venV ? String(venV.price || 0) : '0',
      venMemberPrice: venV ? String(venV.memberPrice || 0) : '0',
      onVenPrice: (e) => { const n = parseInt(e.target.value, 10) || 0; venUpd(v => { v.price = n; }); },
      onVenMemberPrice: (e) => { const n = parseInt(e.target.value, 10) || 0; venUpd(v => { v.memberPrice = n; }); },
      venDiscountNote: venV && venV.price > 0
        ? (en ? 'Members save ' + Math.max(0, Math.round((1 - (venV.memberPrice || 0) / venV.price) * 100)) + ' % — shown automatically when a member books.' : 'Medlemmer sparer ' + Math.max(0, Math.round((1 - (venV.memberPrice || 0) / venV.price) * 100)) + ' % — vises automatisk når et medlem booker.')
        : (en ? 'Set a standard price to calculate the member discount.' : 'Sett ordinær pris for å regne ut medlemsrabatten.'),
      tVenRules: en ? 'Booking rules' : 'Bookingregler',
      tVenWho: en ? 'Who can book' : 'Hvem kan booke',
      venAudienceOpts: [
        { id: 'all', label: en ? 'Everyone' : 'Alle' },
        { id: 'members', label: en ? 'Members only' : 'Kun medlemmer' },
        { id: 'window', label: en ? 'Members first, then everyone' : 'Medlemmer først, så alle' }
      ].map(o => ({
        key: 'aud' + o.id, label: o.label,
        pick: () => venUpd(v => { v.audience = o.id; }),
        style: 'padding: 8px 14px; border-radius: 999px; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer; ' + ((venV && (venV.audience || 'all')) === o.id ? 'background: #16241a; border: 1px solid #16241a; color: #f6f8f3;' : 'background: #ffffff; border: 1px solid rgba(22,36,26,.2); color: #16241a;')
      })),
      venAudienceNote: (venV && venV.audience) === 'members'
        ? (en ? 'Visitors see the venue but cannot book. Members log in to book.' : 'Besøkende ser stedet, men kan ikke booke. Medlemmer logger inn for å booke.')
        : (venV && venV.audience) === 'window'
          ? (en ? 'Set the hours where only members can book. Outside that window everyone can.' : 'Sett tidsrommet der bare medlemmer kan booke. Utenom det kan alle booke.')
          : (en ? 'Anyone can book. Members get the member price automatically.' : 'Alle kan booke. Medlemmer får medlemspris automatisk.'),
      venShowMemberWindow: (venV && venV.audience) === 'window',
      tVenMemberFrom: en ? 'Members only from' : 'Kun medlemmer fra',
      tVenMemberTo: en ? 'until' : 'til',
      venMemberFrom: venV && venV.memberWindow ? venV.memberWindow[0] : '16:00',
      venMemberTo: venV && venV.memberWindow ? venV.memberWindow[1] : '20:00',
      onVenMemberFrom: (e) => { const t = e.target.value; venUpd(v => { v.memberWindow = [t, (v.memberWindow || ['16:00', '20:00'])[1]]; }); },
      onVenMemberTo: (e) => { const t = e.target.value; venUpd(v => { v.memberWindow = [(v.memberWindow || ['16:00', '20:00'])[0], t]; }); },
      tVenMemberWindowNote: en ? 'Applies every open day. Units marked "members only" are always reserved for members.' : 'Gjelder hver åpne dag. Enheter merket «kun medlemmer» er alltid forbeholdt medlemmer.',
      venMemberEarly: !!(venV && venV.memberEarly),
      onVenMemberEarly: (e) => { const on = e.target.checked; venUpd(v => { v.memberEarly = on; }); },
      tVenMemberEarly: en ? 'Members can book 30 days ahead (others follow the limit above)' : 'Medlemmer kan booke 30 dager fram (andre følger grensen over)',
      tBookCal: en ? 'Bookings' : 'Bookinger',
      tPrevMonth: en ? 'Previous month' : 'Forrige måned',
      tNextMonth: en ? 'Next month' : 'Neste måned',
      bcMonthLabel: bcMonthNames[this.state.bcMonth - 1] + ' 2026',
      bcPrev: () => this.setState(st => ({ bcMonth: Math.max(9, st.bcMonth - 1), bcDay: '' })),
      bcNext: () => this.setState(st => ({ bcMonth: Math.min(12, st.bcMonth + 1), bcDay: '' })),
      tLegGuest: en ? 'Visitor booking' : 'Besøkende har booket',
      tLegMember: en ? 'Member booking' : 'Medlem har booket',
      tLegClosedDay: en ? 'Closed' : 'Stengt',
      bcDow: (en ? ['Mo','Tu','We','Th','Fr','Sa','Su'] : ['Ma','Ti','On','To','Fr','Lø','Sø']).map((d, i) => ({ key: 'dow' + i, label: d })),
      bcCells: bcCells,
      bcToggle: () => this.setState(st => ({ bcPanel: !st.bcPanel })),
      bcClosePanel: () => this.setState({ bcPanel: false }),
      bcArrow: this.state.bcPanel ? 'rotate(180deg)' : 'rotate(0deg)',
      bcBoxStyle: 'overflow: hidden; transition: max-height .5s cubic-bezier(.2,.7,.2,1), opacity .35s; max-height: ' + (this.state.bcPanel ? '2400px' : '0px') + '; opacity: ' + (this.state.bcPanel ? '1' : '0') + ';',
      bcBoxSub: this.state.bcPanel ? (en ? 'Click a day to see its bookings' : 'Klikk på en dag for å se bookingene') : (en ? 'Open to see the booking calendar' : 'Åpne for å se bookingkalenderen'),
      bcBoxCount: bcAll.filter(b => b.date >= bcTodayIso).length + (en ? ' upcoming' : ' kommende'),
      bcCols: 'minmax(0, 1fr)',
      tBcRevenue: (en ? 'Booking revenue · ' : 'Bookinginntekt · ') + bcMonthNames[this.state.bcMonth - 1] + ' 2026',
      bcRevenue: kr(bcRevTotal),
      bcRevMembers: (en ? 'Members ' : 'Medlemmer ') + kr(bcRevMem),
      bcRevGuests: (en ? 'Visitors ' : 'Besøkende ') + kr(bcRevGuest),
      bcRevCount: bcMonthB.length + (en ? ' bookings' : ' bookinger'),
      bcOpen: !!this.state.bcDay,
      bcClose: () => this.setState({ bcDay: '' }),
      bcDayTitle: bcSel ? bcSel.title : '',
      bcDaySub: bcSel ? bcSel.sub : '',
      bcDayClosed: !!(bcSel && bcSel.closed),
      tDayClosedNote: en ? 'The venue is closed for booking this day.' : 'Stedet er stengt for booking denne dagen.',
      bcSlots: bcSel ? bcSel.slots : [],
      tManual: en ? 'Manual bookings' : 'Manuelle bookinger',
      tManualHint: en ? 'Book on behalf of someone — also far beyond the public limit. Shows as taken on the booking page.' : 'Book på vegne av noen — også langt forbi den offentlige grensen. Vises som opptatt på bookingsiden.',
      manualCount: ((venV && venV.manual) || []).length + (en ? ' bookings' : ' bookinger'),
      manualHas: ((venV && venV.manual) || []).length > 0,
      manualList: ((venV && venV.manual) || []).slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).map((m) => {
        const p = m.date.split('-');
        return {
          key: 'mb' + m.id, day: p[2], mon: (en ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] : ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'])[parseInt(p[1], 10) - 1],
          who: m.name, meta: m.time + ' · ' + (venCur ? venCur.unit + ' ' + m.unit : m.unit) + (m.note ? ' · ' + m.note : ''),
          remove: () => venUpd(v => { v.manual = (v.manual || []).filter(x => x.id !== m.id); })
        };
      }),
      tMbDate: en ? 'Date' : 'Dato', tMbTime: en ? 'Time' : 'Tid', tMbUnit: venCur ? venCur.unit.charAt(0).toUpperCase() + venCur.unit.slice(1) : (en ? 'Unit' : 'Enhet'),
      tMbName: en ? 'Booked for' : 'Booket for', tMbNamePh: en ? 'Name or group' : 'Navn eller gruppe',
      tMbNote: en ? 'Note' : 'Notat', tMbNotePh: en ? 'e.g. birthday, paid by invoice' : 'f.eks. bursdag, betaler faktura',
      tMbAdd: en ? '+ Add booking' : '+ Legg til booking',
      tMbRemove: en ? 'Remove booking' : 'Fjern booking',
      mbDate: this.state.mbDate, onMbDate: (e) => this.setState({ mbDate: e.target.value, mbSaved: '' }),
      mbTime: this.state.mbTime, onMbTime: (e) => this.setState({ mbTime: e.target.value }),
      mbUnit: String(this.state.mbUnit), onMbUnit: (e) => this.setState({ mbUnit: parseInt(e.target.value, 10) || 1 }),
      mbUnitOpts: venCur ? Array.from({ length: venCur.count }, (_, i) => ({ key: 'mbu' + (i + 1), id: String(i + 1), name: venCur.unit.charAt(0).toUpperCase() + venCur.unit.slice(1) + ' ' + (i + 1) })) : [],
      mbName: this.state.mbName, onMbName: (e) => this.setState({ mbName: e.target.value }),
      mbNote: this.state.mbNote, onMbNote: (e) => this.setState({ mbNote: e.target.value }),
      mbSavedShow: !!this.state.mbSaved, mbSavedText: this.state.mbSaved,
      mbSubmit: (e) => {
        e.preventDefault();
        const st = this.state;
        if (!st.mbDate || !st.mbName.trim()) return;
        venUpd(v => { v.manual = (v.manual || []).concat([{ id: 'mb' + Date.now(), date: st.mbDate, time: st.mbTime, unit: st.mbUnit, name: st.mbName.trim(), note: st.mbNote.trim() }]); });
        this.setState({ mbName: '', mbNote: '', mbSaved: en ? 'Added — remember to save and publish.' : 'Lagt til — husk å lagre og publisere.' });
      },
      tVenSlot: en ? 'Slot length' : 'Lengde per økt',
      tVenMax: en ? 'Max hours per booking' : 'Maks timer per booking',
      tVenLead: en ? 'Bookable days ahead' : 'Dager fram i tid',
      tVenNote: en ? 'Message to bookers' : 'Melding til de som booker',
      tVenNotePh: en ? 'E.g. Closed for maintenance in week 42' : 'F.eks. Stengt for vedlikehold i uke 42',
      venSlot: venV ? String(venV.slotMin || 60) : '60',
      venMax: venV ? String(venV.maxHours || 2) : '2',
      venLead: venV ? String(venV.leadDays || 14) : '14',
      venNote: venV ? (venV.note || '') : '',
      onVenSlot: (e) => { const n = parseInt(e.target.value, 10) || 60; venUpd(v => { v.slotMin = n; }); },
      onVenMax: (e) => { const n = parseInt(e.target.value, 10) || 1; venUpd(v => { v.maxHours = n; }); },
      onVenLead: (e) => { const n = parseInt(e.target.value, 10) || 1; venUpd(v => { v.leadDays = n; }); },
      onVenNote: (e) => { const t = e.target.value; venUpd(v => { v.note = t; }); },
      tVenContent: en ? 'Content on the booking page' : 'Innhold på bookingsiden',
      tVenPhoto: en ? 'Photo' : 'Bilde',
      venPhotoId: venCur ? 'venue-photo-' + venCur.slug : 'venue-photo-none',
      tVenPhotoPh: en ? 'Drop a photo of the venue here' : 'Slipp inn et bilde av hallen her',
      tVenPhotoNote: en ? 'Shown to members and visitors on the booking page. Saved as soon as you drop it.' : 'Vises for medlemmer og besøkende på bookingsiden. Lagres med en gang du slipper det inn.',
      tVenAbout: en ? 'About the venue' : 'Om hallen',
      tVenAboutPh: en ? 'Describe the venue, facilities and who can book…' : 'Beskriv hallen, fasilitetene og hvem som kan booke …',
      venAbout: venV ? (venV.about || '') : '',
      onVenAbout: (e) => { const t = e.target.value; venUpd(v => { v.about = t; }); },
      tVenCancel: en ? 'Free cancellation until' : 'Gratis avbestilling inntil',
      tVenCancelUnit: en ? 'hours before (0 = none)' : 'timer før (0 = ingen)',
      venCancel: venV ? String(venV.cancelHours != null ? venV.cancelHours : 2) : '2',
      onVenCancel: (e) => { const n = Math.max(0, parseInt(e.target.value, 10) || 0); venUpd(v => { v.cancelHours = n; }); },
      tVenIncludes: en ? 'Included in the booking' : 'Inkludert i bookingen',
      tVenRemoveInc: en ? 'Remove' : 'Fjern',
      tVenIncPh: en ? 'Add e.g. Changing rooms' : 'Legg til f.eks. Garderober',
      tVenIncAdd: en ? 'Add' : 'Legg til',
      venIncludes: ((venV && venV.includes && venV.includes.length) ? venV.includes : []).map((x, i) => ({ key: 'vi' + i, label: x, remove: () => venUpd(v => { v.includes = (v.includes || []).filter((_, j) => j !== i); }) })),
      venIncDraft: this.state.venIncDraft,
      onVenIncDraft: (e) => this.setState({ venIncDraft: e.target.value }),
      venAddInc: (e) => { e.preventDefault(); const t = this.state.venIncDraft.trim(); if (!t) return; venUpd(v => { v.includes = (v.includes || []).concat([t]); }); this.setState({ venIncDraft: '' }); },
      tVenMap: en ? 'Available units' : 'Tilgjengelige enheter',
      tVenMapHint: venSel === -1
        ? (en ? 'Click a unit to cycle: everyone → members only → closed all days.' : 'Klikk på en enhet for å bytte: alle → kun medlemmer → stengt alle dager.')
        : (en ? 'Showing ' + venDayNames[venSel] + '. Click a unit to open or close it for this day.' : 'Viser ' + venDayNames[venSel].toLowerCase() + '. Klikk på en enhet for å åpne eller stenge den denne dagen.'),
      tVenAllDays: en ? 'All days' : 'Alle dager',
      venDayAll: () => this.setState({ venDay: -1 }),
      venDayAllStyle: 'padding: 6px 12px; border-radius: 999px; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer; ' + (venSel === -1 ? 'background: #16241a; border: 1px solid #16241a; color: #f6f8f3;' : 'background: #ffffff; border: 1px solid rgba(22,36,26,.2); color: #16241a;'),
      venDayPicks: venDayNames.map((nm, i) => {
        const h = venV && venV.hours ? venV.hours[i] : null;
        const isOpen = !!(h && h[0] && h[1]);
        const nClosed = ((venV && venV.dayUnits && venV.dayUnits[i]) || []).length;
        return {
          key: 'vdp' + i,
          label: nm.slice(0, 3) + (nClosed ? ' · ' + nClosed : ''),
          tip: isOpen ? (nClosed ? nClosed + (en ? ' units closed this day' : ' enheter stengt denne dagen') : (en ? 'All open units available' : 'Alle åpne enheter tilgjengelige')) : (en ? 'Venue closed this day' : 'Stedet er stengt denne dagen'),
          pick: () => this.setState({ venDay: i }),
          style: 'padding: 6px 11px; border-radius: 999px; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer; '
            + (venSel === i ? 'background: #16241a; border: 1px solid #16241a; color: #f6f8f3;' : (isOpen ? 'background: #ffffff; border: 1px solid rgba(22,36,26,.2); color: #16241a;' : 'background: rgba(22,36,26,.06); border: 1px dashed rgba(22,36,26,.3); color: rgba(22,36,26,.5);'))
        };
      }),
      tLegAll: en ? 'Everyone' : 'Alle',
      tLegMembers: en ? 'Members only' : 'Kun medlemmer',
      tLegClosed: en ? 'Closed this day' : 'Stengt denne dagen',
      tLegAllDays: en ? 'Closed all days' : 'Stengt alle dager',
      venIsPitches: !!(venCur && venCur.id === 'fana'),
      venGridDisplay: venCur && venCur.id === 'fana' ? 'none' : 'grid',
      tVenHall: en ? 'Club house' : 'Klubbhus',
      venPitches: venCur && venCur.id === 'fana' ? [1, 2, 3].map((n, i) => {
        const st = unitState(n, venSel);
        const off = st === 'alldays' || st === 'closed';
        return {
          key: 'vp' + n,
          label: (en ? 'Pitch ' : 'Bane ') + n,
          status: unitStatusText(st),
          tip: (en ? 'Pitch ' : 'Bane ') + n + ' — ' + unitStatusText(st) + (en ? ' · click to change' : ' · klikk for å endre'),
          hallAfter: i === 1,
          midLine: n === 3
            ? 'position: absolute; left: 10px; right: 10px; top: 50%; border-top: 2px solid rgba(255,255,255,.75); pointer-events: none'
            : 'position: absolute; top: 10px; bottom: 10px; left: 50%; border-left: 2px solid rgba(255,255,255,.75); pointer-events: none',
          goalA: n === 3
            ? 'position: absolute; left: 50%; top: 10px; width: 60px; height: 24px; margin-left: -30px; border: 2px solid rgba(255,255,255,.75); border-top: 0; pointer-events: none'
            : 'position: absolute; top: 50%; left: 10px; height: 60px; width: 24px; margin-top: -30px; border: 2px solid rgba(255,255,255,.75); border-left: 0; pointer-events: none',
          goalB: n === 3
            ? 'position: absolute; left: 50%; bottom: 10px; width: 60px; height: 24px; margin-left: -30px; border: 2px solid rgba(255,255,255,.75); border-bottom: 0; pointer-events: none'
            : 'position: absolute; top: 50%; right: 10px; height: 60px; width: 24px; margin-top: -30px; border: 2px solid rgba(255,255,255,.75); border-right: 0; pointer-events: none',
          toggle: () => cycleUnit(n),
          style: 'position: relative; overflow: hidden; cursor: pointer; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: var(--font-body); transition: filter .25s, transform .25s; '
            + (n === 1 ? 'grid-column: 1; grid-row: 1; ' : (n === 2 ? 'grid-column: 1; grid-row: 2; ' : 'grid-column: 3; grid-row: 1 / span 2; '))
            + (st === 'alldays' ? 'cursor: pointer; background: linear-gradient(180deg, #6f7d70, #55635a); border: 1px solid rgba(22,36,26,.4); color: #f6f8f3;'
              : st === 'closed' ? 'background: repeating-linear-gradient(135deg, #9aa89b 0 8px, #8b998c 8px 16px); border: 1px dashed rgba(22,36,26,.4); color: #16241a;'
              : st === 'members' ? 'cursor: pointer; background: linear-gradient(180deg, #7fb8ff, #4f8fe0); border: 1px solid #2f6db8; color: #16241a;'
              : 'background: linear-gradient(180deg, #3f9a58, #2c7a43); border: 1px solid #1f6b34; color: #ffffff;')
        };
      }) : [],
      venMapCount: venCur ? Array.from({ length: venCur.count }, (_, i) => unitState(i + 1, venSel)).filter(x => x === 'all' || x === 'members').length + ' / ' + venCur.count + (en ? ' open' : ' åpne') : '',
      venUnits: venCur ? Array.from({ length: venCur.count }, (_, i) => {
        const n = i + 1;
        const st = unitState(n, venSel);
        return {
          key: 'vu' + n, n: String(n),
          status: unitStatusText(st),
          tip: venCur.unit + ' ' + n + ' — ' + unitStatusText(st) + (en ? ' · click to change' : ' · klikk for å endre'),
          toggle: () => cycleUnit(n),
          style: unitStyleFor(st, 'cursor: pointer; padding: 10px 6px; border-radius: 14px; text-align: center; font-family: var(--font-body); transition: background .25s, border-color .25s; ')
        };
      }) : [],
      venClean: venClean,
      tVenSave: en ? 'Save and publish' : 'Lagre og publiser',
      tVenDiscard: en ? 'Discard changes' : 'Forkast endringer',
      tVenPreview: en ? 'Open booking page' : 'Åpne bookingsiden',
      venSaveStyle: 'padding: 13px 22px; border-radius: 999px; border: 0; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: ' + (venClean ? 'default' : 'pointer') + '; background: ' + (venClean ? 'rgba(22,36,26,.12)' : '#1f7a3a') + '; color: ' + (venClean ? 'rgba(22,36,26,.5)' : '#ffffff') + '; transition: background .3s',
      venSave: () => {
        if (!venDraft || !KretzVenues) return;
        const all2 = KretzVenues.load();
        all2[venCur.slug] = venDraft.data;
        KretzVenues.save(all2);
        this.setState({ venDraft: null, venSaved: (en ? 'Published — ' : 'Publisert — ') + venCur.venue + (en ? ' now shows the new hours and prices on the booking page.' : ' viser nå de nye tidene og prisene på bookingsiden.') });
      },
      venDiscard: () => this.setState({ venDraft: null, venSaved: '' }),
      tNextMeeting: en ? 'Next board meeting' : 'Neste styremøte',
      goBoard: () => this.setState({ tab: 'board', navMenu: '' }),
      tOpenBoard: en ? 'Open the board page' : 'Åpne Styret',
      nmDay: nextMeeting ? String(nextMeeting.d) : '–',
      nmMon: nextMeeting ? (en ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] : ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'])[nextMeeting.m - 1] : '',
      nmWhenShort: nextMeeting ? nextMeeting.when + ' · ' + nextMeeting.place : (en ? 'No meeting planned' : 'Ingen møte planlagt'),
      nmSummary: nextMeeting ? nextMeeting.agenda.length + (nextMeeting.agenda.length === 1 ? (en ? ' agenda item · ' : ' sak · ') : (en ? ' agenda items · ' : ' saker · ')) + nextMeeting.agenda[0] : (en ? 'Plan one under Board' : 'Planlegg et under Styret'),
      nmCountdown: nextMeeting ? nextMeeting.countdown : '',
      nmTitle: nextMeeting ? nextMeeting.title : (en ? 'No meeting planned' : 'Ingen møte planlagt'),
      nmWhen: nextMeeting ? nextMeeting.when + ' · ' + nextMeeting.place : '',
      nmAgenda: nextMeeting ? nextMeeting.agenda.map((t, i) => ({ key: 'ag' + i, text: t })) : [],
      nmMailto: nextMeeting ? 'mailto:' + boardEmails.join(',') + '?subject=' + encodeURIComponent((en ? 'Reminder: ' : 'Påminnelse: ') + nextMeeting.title + ' — ' + nextMeeting.when) + '&body=' + encodeURIComponent((en ? 'Hi all,\n\nA reminder about ' : 'Hei alle,\n\nPåminnelse om ') + nextMeeting.title.toLowerCase() + ' ' + nextMeeting.when + ', ' + nextMeeting.place + '.\n\n' + (en ? 'Agenda:\n' : 'Saksliste:\n') + nextMeeting.agenda.map((t, i) => (i + 1) + '. ' + t).join('\n') + '\n\n' + (en ? 'Best regards\n' : 'Vennlig hilsen\n') + 'Sigrid A.') : '#',
      tSendNotice: en ? 'Send reminder to the board' : 'Send påminnelse til styret',
      tNewMeeting: en ? '+ New board meeting' : '+ Nytt styremøte',
      tMeetings: en ? 'Board meetings' : 'Styremøter',
      tMinutes: en ? 'Minutes' : 'Referat',
      tPlanned: en ? 'planned' : 'planlagt',
      meetQ: this.state.meetQ,
      onMeetQ: (e) => this.setState({ meetQ: e.target.value }),
      tMeetSearch: en ? 'Search meetings, agenda items or files…' : 'Søk etter møte, sak eller fil …',
      meetNone: meetShown.length === 0,
      tMeetNone: en ? 'No meetings or files match.' : 'Ingen møter eller filer matcher.',
      meetingRows: meetShown.map(m => ({
        hasHit: !!m._hit,
        hit: m._hit || '',
        key: 'mt' + m.id, day: String(m.d), mon: (en ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] : ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'])[m.m - 1],
        title: m.title, meta: m.time + ' · ' + m.place + ' · ' + m.agenda.length + (m.agenda.length === 1 ? (en ? ' item' : ' sak') : (en ? ' items' : ' saker')),
        upcoming: m.upcoming, hasMinutes: !m.upcoming,
        open: () => this.setState({ meetingOpenId: m.id }),
        openMinutesOnly: (ev) => { if (ev && ev.stopPropagation) ev.stopPropagation(); openMinutesOf(m); },
        openMinutes: () => window.open(this.makePdf((en ? 'Minutes — ' : 'Referat — ') + m.title + ' ' + m.d + '.' + m.m + '.2026',
          [(en ? 'Place: ' : 'Sted: ') + m.place + '   ' + (en ? 'Time: ' : 'Tid: ') + m.time, (en ? 'Present: ' : 'Til stede: ') + boardNames.join(', '), { h: en ? 'Items' : 'Saker' }]
            .concat(m.agenda.map((t, i) => (i + 1) + '. ' + t + (en ? ' — discussed and noted.' : ' — drøftet og tatt til orientering.')))
            .concat([{ h: en ? 'Decisions' : 'Vedtak' }]).concat((m.decisions || []).map(t => '- ' + t))
            .concat(['', (en ? 'Minutes taken by Sigrid A.' : 'Referent: Sigrid A.')])), '_blank', 'noopener')
      })),
      mdOpen: !!mdM,
      mdClose: () => this.setState({ meetingOpenId: '' }),
      mdCloseBg: (e) => { if (e.target === e.currentTarget) this.setState({ meetingOpenId: '' }); },
      mdKicker: mdM ? (mdM.upcoming ? (en ? 'Planned board meeting' : 'Planlagt styremøte') : (en ? 'Held board meeting' : 'Avholdt styremøte')) : '',
      mdTitle: mdM ? mdM.title + ' ' + mdM.d + '.' + mdM.m + '.2026' : '',
      mdWhen: mdM ? mdM.time + ' · ' + mdM.place : '',
      mdTAttendance: en ? 'Who is coming' : 'Hvem kommer',
      mdCounts: mdM ? mdYesN + (en ? ' yes · ' : ' ja · ') + mdNoN + (en ? ' no · ' : ' nei · ') + mdWaitN + (en ? ' no answer' : ' ikke svart') : '',
      mdYes: mdM ? mdYesN + '/' + mdSeatList.length : '',
      tComing: en ? 'coming' : 'kommer',
      mdSeats: mdSeatList,
      tAccepted: en ? 'Accepted' : 'Kommer',
      tDeclined: en ? 'Declined' : 'Kan ikke',
      tNoAnswer: en ? 'No answer yet' : 'Ikke svart',
      tMeetingFiles: en ? 'Files' : 'Filer',
      tAddMeetingFiles: en ? 'Add files' : 'Legg til filer',
      tFileTypes: en ? 'PDF, Excel and photos' : 'PDF, Excel og bilder',
      tAgenda: en ? 'Agenda' : 'Saksliste',
      mdAgenda: mdM ? mdM.agenda.map((t, i) => ({ key: 'mda' + i, text: t })) : [],
      mdFiles: mdFileRows,
      mdNoFiles: mdFileRows.length === 0,
      mdAddFiles: (ev) => {
        const list = Array.from(ev.target.files || []).filter(f => /\.(pdf|xlsx?|csv|png|jpe?g|gif|webp|heic)$/i.test(f.name) || /^image\//.test(f.type) || f.type === 'application/pdf');
        ev.target.value = '';
        if (!list.length || !mdM) return;
        const id = mdM.id;
        this.setState(st => {
          const m2 = Object.assign({}, st.meetingFiles);
          m2[id] = (m2[id] || seedMeetingFiles(id)).concat(list.map((f, k) => ({ id: 'mf' + Date.now() + k, name: f.name, size: f.size, url: URL.createObjectURL(f), when: en ? 'just now' : 'nå nettopp' })));
          return { meetingFiles: m2 };
        });
      },
      tBoardMembers: en ? 'Board members' : 'Styremedlemmer',
      boardPeople: boardList.map(a => {
        const d = roleDefs.find(r => r.id === a.role) || { name: a.role, color: '#c9d8c4' };
        return { key: 'bp' + a.id, name: a.name, initials: a.name.split(/\s+/).slice(0, 2).map(x => x.slice(0, 1)).join(''), club: clubOf(a.club), role: d.name, roleStyle: 'padding: 5px 11px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; color: #16241a; background: ' + d.color };
      }),
      tDecisions: en ? 'Decisions and follow-up' : 'Vedtak og oppfølging',
      decisions: decisionList.map(dv => {
        const done = !!this.state.decDone[dv.id] || dv.done;
        return {
          key: 'dc' + dv.id, title: dv.title, meta: dv.owner + ' · ' + (en ? 'due ' : 'frist ') + dv.due,
          mark: done ? '✓' : '',
          boxStyle: 'width: 20px; height: 20px; border-radius: 6px; display: grid; place-items: center; font-size: 12px; font-weight: 800; ' + (done ? 'background: #1f7a3a; color: #ffffff; border: 1px solid #1f7a3a;' : 'background: #ffffff; border: 1.5px solid rgba(22,36,26,.3);'),
          titleStyle: 'display: block; font-size: 14px; font-weight: 600;' + (done ? ' text-decoration: line-through; color: rgba(22,36,26,.55);' : ''),
          tag: done ? (en ? 'done' : 'ferdig') : (en ? 'open' : 'åpen'),
          tagStyle: pill(done ? 'ok' : 'warn'),
          toggle: () => this.setState(st => { const m2 = Object.assign({}, st.decDone); m2[dv.id] = !(m2[dv.id] || dv.done); return { decDone: m2 }; })
        };
      }),
      meetingFormOpen: !!this.state.meetingForm,
      openMeetingForm: () => this.setState({ meetingForm: { date: '2026-11-05', time: '19:00', place: en ? 'Club house' : 'Klubbhuset', agenda: '', invite: boardList.map(a => a.name) } }),
      closeMeetingForm: () => this.setState({ meetingForm: null }),
      tNewMeetingTitle: en ? 'New board meeting' : 'Nytt styremøte',
      tMfDate: en ? 'Date' : 'Dato', tMfTime: en ? 'Time' : 'Tid', tMfPlace: en ? 'Place' : 'Sted',
      tMfAgenda: en ? 'Agenda (one item per line)' : 'Saksliste (én sak per linje)',
      tMfAgendaPh: en ? 'Budget 2027\nNew coaches\nAny other business' : 'Budsjett 2027\nNye trenere\nEventuelt',
      tMfSave: en ? 'Create and invite' : 'Opprett og inviter',
      tMfInvite: en ? 'Invite' : 'Inviter',
      tMyPlanner: en ? 'My planner' : 'Min planlegger',
      tQuickAct: en ? 'New activity' : 'Ny aktivitet',
      tQuickActNote: en ? 'Training, match or event with sign-up' : 'Trening, kamp eller arrangement med påmelding',
      tQuickPost: en ? 'New post' : 'Nytt innlegg',
      tQuickPostNote: en ? 'Share news with a club or group' : 'Del nyheter med en klubb eller gruppe',
      tInvoiceMerged: en ? 'Invoicing members' : 'Fakturering av medlemmer',
      tPayables: en ? 'Invoices the club must pay' : 'Fakturaer klubben skal betale',
      tAddPayable: en ? 'Add invoice (PDF)' : 'Legg til faktura (PDF)',
      tPayDue: en ? 'Unpaid' : 'Ubetalt',
      tPayNext: en ? 'Next due date' : 'Neste forfall',
      payDueTotal: 'kr ' + payUnpaid.reduce((n, p) => n + p.n, 0).toLocaleString('nb-NO').replace(/\u00a0/g, ' '),
      payNextDate: payUnpaid.length ? payUnpaid[0].dueLabel : '–',
      tOpenInvoice: en ? 'Open invoice' : 'Åpne faktura',
      tMarkPaid: en ? 'Mark as paid' : 'Merk som betalt',
      tUndoPaid: en ? 'Undo' : 'Angre',
      payEmpty: payRows.length === 0,
      tPayEmpty: en ? 'No invoices for this club.' : 'Ingen fakturaer for denne klubben.',
      payables: payRows,
      ...this.adminSupVals({ en, payAll, payRows, all, clubOf }),
      ...this.adminBudgetVals({ en, all, sel, clubOf }),
      ...(() => { try { return this.adminCommsVals({ en, all, sel, clubs, clubOf, tab }); } catch (e) { window.__cmErr = String(e && e.stack); throw e; } })(),
      ...this.adminPlanVals({ en, all, sel, clubOf }),
      ...this.adminDocsVals({ en, all, sel, clubOf }),
      ...this.adminVolVals({ en, all, sel, clubOf }),
      ...this.adminIntegrVals({ en }),
      onPayableFiles: (ev) => {
        const list = Array.from(ev.target.files || []).filter(f => f.type === 'application/pdf' || /\.pdf$/i.test(f.name));
        ev.target.value = '';
        if (!list.length) return;
        const club = all ? 'vif' : sel;
        this.setState(st => ({ payExtra: st.payExtra.concat(list.map((f, k) => ({ id: 'px' + Date.now() + k, club: club, supplier: f.name.replace(/\.pdf$/i, ''), no: '—', desc: en ? 'Uploaded invoice' : 'Opplastet faktura', n: 0, due: '2026-10-15', url: URL.createObjectURL(f) }))) }));
      },
      tAttachLabel: en ? 'Attachments' : 'Vedlegg',
      tAttachAdd: en ? 'Attach files' : 'Legg ved filer',
      tAttachTypes: en ? 'PDF, Excel, Word and photos' : 'PDF, Excel, Word og bilder',
      formFileRows: attRows(this.state.formFiles || [], (id) => this.setState(st => ({ formFiles: (st.formFiles || []).filter(f => f.id !== id) }))),
      onFormFiles: (ev) => { const add = pickFiles(ev); if (add.length) this.setState(st => ({ formFiles: (st.formFiles || []).concat(add) })); },
      mfFileRows: attRows(((this.state.meetingForm || {}).files) || [], (id) => this.setState(st => ({ meetingForm: Object.assign({}, st.meetingForm, { files: ((st.meetingForm || {}).files || []).filter(f => f.id !== id) }) }))),
      onMfFiles: (ev) => { const add = pickFiles(ev); if (add.length) this.setState(st => ({ meetingForm: Object.assign({}, st.meetingForm, { files: ((st.meetingForm || {}).files || []).concat(add) }) })); },
      tMfWholeBoard: en ? 'Whole board' : 'Hele styret',
      tMfNone: en ? 'None' : 'Ingen',
      mfPickBoard: () => this.setState(st => ({ meetingForm: Object.assign({}, st.meetingForm, { invite: boardList.map(a => a.name) }) })),
      mfPickNone: () => this.setState(st => ({ meetingForm: Object.assign({}, st.meetingForm, { invite: [] }) })),
      mfPeople: invitePool.map(p => {
        const on = ((this.state.meetingForm || {}).invite || []).indexOf(p.name) !== -1;
        return {
          key: 'mp' + p.name,
          label: (on ? '✓ ' : '') + p.name + (p.role ? ' · ' + p.role : ''),
          toggle: () => this.setState(st => {
            const cur = (st.meetingForm && st.meetingForm.invite) || [];
            const next = cur.indexOf(p.name) !== -1 ? cur.filter(n => n !== p.name) : cur.concat([p.name]);
            return { meetingForm: Object.assign({}, st.meetingForm, { invite: next }) };
          }),
          style: 'cursor: pointer; padding: 7px 12px; border-radius: 999px; font-family: var(--font-body); font-size: 12.5px; transition: background .2s, color .2s;' + (on ? ' background: #1f7a3a; border: 1px solid #1f7a3a; color: #ffffff;' : ' background: #ffffff; border: 1px solid rgba(22,36,26,.18); color: #16241a;')
        };
      }),
      mfInviteCount: (((this.state.meetingForm || {}).invite || []).length) + (en ? ' invited' : ' invitert'),
      mfSentShow: false,
      mfSentMailto: '#',
      tMfMailToo: '',
      meetSentShow: !!this.state.meetSent,
      meetSentText: this.state.meetSent ? this.state.meetSent.text : '',
      meetSentMailto: this.state.meetSent ? this.state.meetSent.mailto : '#',
      tAlsoEmail: en ? 'Also send by email' : 'Send også på e-post',
      mfDate: (this.state.meetingForm || {}).date || '', mfTime: (this.state.meetingForm || {}).time || '', mfPlace: (this.state.meetingForm || {}).place || '', mfAgenda: (this.state.meetingForm || {}).agenda || '',
      onMfDate: (e) => { const v = e.target.value; this.setState(st => ({ meetingForm: Object.assign({}, st.meetingForm, { date: v }) })); },
      onMfTime: (e) => { const v = e.target.value; this.setState(st => ({ meetingForm: Object.assign({}, st.meetingForm, { time: v }) })); },
      onMfPlace: (e) => { const v = e.target.value; this.setState(st => ({ meetingForm: Object.assign({}, st.meetingForm, { place: v }) })); },
      onMfAgenda: (e) => { const v = e.target.value; this.setState(st => ({ meetingForm: Object.assign({}, st.meetingForm, { agenda: v }) })); },
      saveMeeting: (e) => {
        e.preventDefault();
        const f = this.state.meetingForm;
        if (!f) return;
        const p = f.date.split('-');
        const items = f.agenda.split('\n').map(x => x.trim()).filter(Boolean);
        const agenda = items.length ? items : [en ? 'Any other business' : 'Eventuelt'];
        const newId = 'm' + Date.now();
        const attached = (f.files || []).slice();
        const inv = (f.invite || []).slice();
        const emailOf = (nm) => nm.toLowerCase().replace(/[^a-zæøå ]/g, '').trim().replace(/\s+/g, '.').replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a') + '@kretz.no';
        const d = parseInt(p[2], 10), mo = parseInt(p[1], 10);
        const subject = (en ? 'Notice: board meeting ' : 'Innkalling: styremøte ') + d + '.' + mo + '. ' + (en ? 'at ' : 'kl. ') + f.time;
        const attLine = (f.files || []).length ? '\n' + (en ? 'Attachments in Kretz: ' : 'Vedlegg i Kretz: ') + (f.files || []).map(x => x.name).join(', ') + '\n' : '';
        const body = (en ? 'Hi,\n\nYou are invited to a board meeting ' : 'Hei,\n\nDu innkalles til styremøte ') + d + '.' + mo + '. ' + (en ? 'at ' : 'kl. ') + f.time + ', ' + f.place + '.\n\n' + (en ? 'Agenda:\n' : 'Saksliste:\n') + agenda.map((t, i) => (i + 1) + '. ' + t).join('\n') + '\n\n' + attLine + (en ? 'Please answer in Kretz.\n' : 'Svar i Kretz.\n');
        this.setState(st => ({
          meetings: (st.meetings || seedMeetings()).concat([{ id: newId, m: mo, d: d, time: f.time, place: f.place, title: en ? 'Board meeting' : 'Styremøte', agenda: agenda, upcoming: true, invitees: inv }]),
          meetingForm: null,
          meetingFiles: attached.length ? Object.assign({}, st.meetingFiles, { [newId]: attached }) : st.meetingFiles,
          meetSent: { text: (en ? 'Board meeting created — ' : 'Styremøtet er opprettet — ') + inv.length + (en ? ' people got an invitation in Kretz.' : ' personer har fått invitasjon i Kretz.'), mailto: 'mailto:' + inv.map(emailOf).join(',') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body) }
        }));
      },
      tRolesHeading: en ? 'Roles in the club' : 'Roller i klubben',
      tRolesSub: en ? 'Click a role to see who has it.' : 'Klikk på en rolle for å se hvem som har den.',
      roleCards: roleDefs.map(r => {
        const n = roleList.filter(a => a.role === r.id).length;
        const on = this.state.roleFilter === r.id;
        return {
          key: 'rc' + r.id,
          name: r.name, num: n,
          dotStyle: 'width: 10px; height: 10px; flex: 0 0 auto; border-radius: 999px; background: ' + r.color,
          pick: () => this.setState(st => ({ roleFilter: st.roleFilter === r.id ? '' : r.id })),
          menu: (e) => { e.stopPropagation(); this.setState(st => ({ roleMenu: st.roleMenu === r.id ? '' : r.id })); },
          menuOpen: this.state.roleMenu === r.id,
          closeMenu: (e) => { e.stopPropagation(); this.setState({ roleMenu: '' }); },
          showLabel: on ? (en ? 'Show all people' : 'Vis alle personer') : (en ? 'Show people' : 'Vis personer'),
          show: (e) => { e.stopPropagation(); this.setState(st => ({ roleFilter: st.roleFilter === r.id ? '' : r.id, roleMenu: '' })); },
          canRemove: !!r.custom,
          remove: (e) => { e.stopPropagation(); this.setState(st => ({ addedRoleDefs: (st.addedRoleDefs || []).filter(x => x.id !== r.id), roleMenu: '', roleFilter: st.roleFilter === r.id ? '' : st.roleFilter })); },
          style: 'display: grid; grid-template-columns: minmax(0,1fr) 110px 56px; align-items: center; height: 46px; box-sizing: border-box; padding: 0 18px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 14px; cursor: pointer; transition: background .2s;' + (on ? ' background: #eaf7ed; font-weight: 700;' : '')
        };
      }),
      roleGridCols: this.state.roleFilter ? 'minmax(0, 1fr) minmax(0, 1.35fr)' : 'minmax(0, 1fr)',
      tAssignBtn2: en ? 'Assign role' : 'Tildel rolle',
      tTaPerson: en ? 'Person' : 'Person', tTaClub: en ? 'Club' : 'Klubb', tTaRole: en ? 'Role' : 'Rolle',
      tTaSearch: en ? 'Search member by name…' : 'Søk etter medlem på navn …',
      taOpen: !!this.state.taOpen,
      openAssign: () => this.setState({ taOpen: true, taQ: '', taPerson: '', taClub: '', taRole: (roleDefs[0] || {}).id || '' }),
      closeAssign: () => this.setState({ taOpen: false }),
      taQ: this.state.taQ || '',
      onTaQ: (e) => this.setState({ taQ: e.target.value, taPerson: '' }),
      taResults: (() => {
        const q = (this.state.taQ || '').trim().toLowerCase();
        const seen = {};
        return this.members(en).filter(m => { const k = m.name.toLowerCase(); if (seen[k]) return false; seen[k] = 1; return !q || k.includes(q); }).slice(0, 12).map(m => {
          const on = this.state.taPerson === m.id;
          return { key: 'tp' + m.id, name: m.name, meta: clubOf(m.club) + ' · ' + m.role,
            style: 'display: flex; justify-content: space-between; align-items: center; gap: 10px; width: 100%; box-sizing: border-box; text-align: left; padding: 10px 14px; border-radius: 14px; cursor: pointer; font-family: var(--font-body); color: #16241a; transition: background .2s; border: 1.5px solid ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.1)') + '; background: ' + (on ? '#eaf7ed' : '#ffffff') + ';',
            pick: () => this.setState({ taPerson: m.id, taClub: m.club }) };
        });
      })(),
      taNone: this.members(en).filter(m => { const q = (this.state.taQ || '').trim().toLowerCase(); return !q || m.name.toLowerCase().includes(q); }).length === 0,
      taClub: this.state.taClub || '',
      onTaClub: (e) => this.setState({ taClub: e.target.value }),
      taClubOpts: clubs.map(c => ({ key: 'tc' + c.id, id: c.id, name: c.name })),
      taRole: this.state.taRole || (roleDefs[0] || {}).id || '',
      onTaRole: (e) => this.setState({ taRole: e.target.value }),
      taDisabled: !this.state.taPerson,
      taBtnOpacity: this.state.taPerson ? '1' : '.45',
      saveAssign: (e) => {
        e.preventDefault();
        const m = this.members(en).find(x => x.id === this.state.taPerson); if (!m) return;
        const club = this.state.taClub || m.club, role = this.state.taRole || (roleDefs[0] || {}).id;
        this.setState(st => ({ roleAssign: (st.roleAssign || seedRoles()).concat([{ id: 'r' + Date.now(), name: m.name, role: role, club: club, scope: '' }]), taOpen: false, roleFilter: role }));
      },
      tAddRole: en ? 'Add role' : 'Legg til rolle',
      tRoleName: en ? 'Role name' : 'Navn på rolle',
      roleModal: !!this.state.roleModal,
      openAddRole: () => this.setState({ roleModal: true, roleName: '' }),
      closeRoleModal: () => this.setState({ roleModal: false }),
      roleName: this.state.roleName || '',
      onRoleName: (e) => this.setState({ roleName: e.target.value }),
      saveRole: (e) => { e.preventDefault(); const nm = (this.state.roleName || '').trim(); if (!nm) return; this.setState(st => ({ addedRoleDefs: (st.addedRoleDefs || []).concat([{ id: 'cr' + Date.now(), name: nm }]), roleModal: false })); },
      tRolePeople: en ? 'People with roles' : 'Personer med roller',
      roleFiltered: !!this.state.roleFilter,
      roleFilterLabel: (roleDefs.find(r => r.id === this.state.roleFilter) || {}).name || '',
      clearRoleFilter: () => this.setState({ roleFilter: '' }),
      roleQ: this.state.roleQ,
      onRoleQ: (e) => this.setState({ roleQ: e.target.value }),
      tRoleSearch: en ? 'Search name or role…' : 'Søk på navn eller rolle …',
      roleRows: roleShown.map(a => {
        const d = roleDefs.find(r => r.id === a.role) || { name: a.role, color: '#c9d8c4' };
        return {
          key: 'ra' + a.id,
          name: a.name,
          initials: a.name.split(/\s+/).slice(0, 2).map(x => x.slice(0, 1)).join(''),
          meta: (all ? clubOf(a.club) + ' · ' : '') + (a.scope || (en ? 'Whole club' : 'Hele klubben')),
          role: d.name,
          roleStyle: 'flex: 0 0 auto; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; color: #16241a; background: ' + d.color,
          remove: () => this.setState(st => ({ roleAssign: (st.roleAssign || seedRoles()).filter(x => x.id !== a.id) }))
        };
      }),
      roleEmpty: roleShown.length === 0,
      tRoleEmpty: en ? 'Nobody matches.' : 'Ingen treff.',
      tRemoveRole: en ? 'Remove role' : 'Fjern rolle',
      tAssignRole: en ? 'Give someone a role' : 'Gi en person en rolle',
      tRaNamePh: en ? 'Name' : 'Navn',
      tAssignBtn: en ? 'Assign role' : 'Tildel rolle',
      raName: this.state.raName,
      raRole: this.state.raRole,
      raClub: this.state.raClub,
      raMsg: this.state.raMsg,
      onRaName: (e) => this.setState({ raName: e.target.value, raMsg: '' }),
      onRaRole: (e) => this.setState({ raRole: e.target.value }),
      onRaClub: (e) => this.setState({ raClub: e.target.value }),
      roleOpts: roleDefs.map(r => ({ key: 'ro' + r.id, id: r.id, name: r.name })),
      peopleOpts: this.members(en).map((m, i) => ({ key: 'po' + i, name: m.name })),
      addRole: (e) => {
        e.preventDefault();
        const nm = this.state.raName.trim();
        if (!nm) return;
        const d = roleDefs.find(r => r.id === this.state.raRole) || {};
        this.setState(st => ({
          roleAssign: (st.roleAssign || seedRoles()).concat([{ id: 'r' + Date.now(), name: nm, role: st.raRole, club: st.raClub, scope: '' }]),
          raName: '',
          raMsg: (en ? nm + ' is now ' : nm + ' er nå ') + (d.name || '').toLowerCase() + '.'
        }));
      },
      spCalOpen: this.state.spCal,
      toggleSpCal: () => this.setState(st => ({ spCal: !st.spCal })),
      closeSpCal: () => this.setState({ spCal: false }),
      tSpCalToggle: this.state.spCal ? (en ? 'Close deadlines calendar' : 'Lukk fristkalender') : (en ? 'Open deadlines calendar' : 'Åpne fristkalender'),
      spCalArrow: this.state.spCal ? '›' : '‹',
      spCalHandleRight: this.state.spCal ? 'min(75vw, 100vw - 40px)' : '0px',
      spCalTransform: this.state.spCal ? 'translateX(0)' : 'translateX(105%)',
      spCalScrim: this.state.spCal ? '1' : '0',
      spCalScrimPointer: this.state.spCal ? 'auto' : 'none',
      tSpCalTitle: en ? 'Deadlines' : 'Frister',
      spCalSub: (all ? (en ? 'All clubs' : 'Alle klubber') : clubOf(sel)) + (en ? ' · grants and sponsor reports' : ' · støtte og sponsorrapporter'),
      spCalMonthLabel: (() => { const nm = monthNames[this.state.spCalMonth - 1]; return nm.charAt(0).toUpperCase() + nm.slice(1) + ' 2026'; })(),
      spCalPrev: () => this.setState(st => ({ spCalMonth: Math.max(1, st.spCalMonth - 1), spCalPick: 0 })),
      spCalNext: () => this.setState(st => ({ spCalMonth: Math.min(12, st.spCalMonth + 1), spCalPick: 0 })),
      spCalCells: (() => {
        const M = this.state.spCalMonth;
        const n = new Date(2026, M, 0).getDate();
        const first = (new Date(2026, M - 1, 1).getDay() + 6) % 7;
        const cells = [];
        for (let i = 0; i < first; i++) cells.push({ key: 'sb' + i, day: '', pick: () => {}, style: 'border: 0; background: transparent; height: 34px' });
        for (let d = 1; d <= n; d++) {
          const l = dlOn(M, d);
          const picked = this.state.spCalPick === d;
          const g = l.some(x => x.kind === 'grant'), r = l.some(x => x.kind === 'report');
          const day = d;
          cells.push({
            key: 'sc' + d, day: String(d) + (isToday(M, d) ? '' : ''),
            pick: () => this.setState({ spCalPick: day }),
            style: 'height: 34px; border-radius: 12px; cursor: pointer; font-family: var(--font-body); font-size: 13px; transition: background .25s, color .25s;'
              + (picked ? ' background: #16241a; border: 1px solid #16241a; color: #f6f8f3; font-weight: 700;'
                : isPast(M, d) ? pastStyle + (l.length ? ' box-shadow: inset 0 0 0 2px ' + (g ? 'rgba(224,161,0,.45)' : 'rgba(59,125,216,.45)') + ';' : '')
                : (l.length ? ' background: ' + (g && !r ? '#fff4cf' : '#e6f0fc') + '; border: 2px solid ' + (g && !r ? '#e0a100' : '#3b7dd8') + '; color: #16241a; font-weight: 700;' + (g && r ? ' box-shadow: inset 0 0 0 2px #e0a100;' : '')
                  : ' background: #f7f9f5; border: 1px solid rgba(22,36,26,.08); color: rgba(22,36,26,.7);'))
          });
        }
        return cells;
      })(),
      tLegendGrant: en ? 'Grant deadline' : 'Søknadsfrist støtte',
      tLegendReport: en ? 'Sponsor report' : 'Rapport til sponsor',
      spCalDayLabel: this.state.spCalPick ? (this.state.spCalPick + '. ' + monthNames[this.state.spCalMonth - 1]) : (en ? 'Pick a day' : 'Velg en dag'),
      spCalDayItems: this.state.spCalPick ? dlOn(this.state.spCalMonth, this.state.spCalPick).map(dlCardOf) : [],
      spCalDayEmpty: this.state.spCalPick ? dlOn(this.state.spCalMonth, this.state.spCalPick).length === 0 : true,
      tSpCalEmpty: this.state.spCalPick ? (en ? 'No deadlines that day.' : 'Ingen frister den dagen.') : (en ? 'Marked days have a deadline.' : 'Markerte dager har en frist.'),
      tSpCalUpcoming: en ? 'Deadlines this and next week' : 'Frister denne og neste uke',
      spCalUpcoming: spWindow.map(x => Object.assign(dlCardOf(x), { meta: x.d + '. ' + monthNames[x.m - 1] + ' · ' + x.meta, key: 'up' + x.key })),
      spCalRange: spRangeLabel,
      spCalUpEmpty: spWindow.length === 0,
      tSpCalUpEmpty: en ? 'No deadlines in these two weeks.' : 'Ingen frister disse to ukene.',
      tNewSponsor: en ? '+ New sponsor' : '+ Ny sponsor',
      tMoreOptions: en ? 'More options' : 'Flere valg',
      tMenuAddFile: en ? 'Add file (PDF)' : 'Legg til fil (PDF)',
      tMenuInactive: en ? 'Set as inactive' : 'Sett som inaktiv',
      tMenuReactivate: en ? 'Make active again' : 'Gjør aktiv igjen',
      confirmInactiveOpen: this.state.confirmInactive !== -1,
      ciTitle: en ? 'Set sponsor as inactive?' : 'Sette sponsoren som inaktiv?',
      ciText: (() => {
        const sp = (rowSets.sponsors || [])[this.state.confirmInactive] || this.state.extraSponsors.find(e => e.si === this.state.confirmInactive);
        const nm = sp ? sp.title : '';
        return en ? 'The agreement with ' + nm + ' will be marked inactive. Files and history are kept, and you can make it active again later.' : 'Avtalen med ' + nm + ' merkes som inaktiv. Filer og historikk beholdes, og du kan gjøre den aktiv igjen senere.';
      })(),
      tNoCancel: en ? 'Cancel' : 'Avbryt',
      tYesInactive: en ? 'Yes, set inactive' : 'Ja, sett som inaktiv',
      ciNo: () => this.setState({ confirmInactive: -1 }),
      ciYes: () => this.setState(st => { const m = Object.assign({}, st.inactiveSponsors); m[st.confirmInactive] = true; return { inactiveSponsors: m, confirmInactive: -1, sponsorOpen: st.sponsorOpen === st.confirmInactive ? -1 : st.sponsorOpen }; }),
      newSponsorOpen: !!this.state.newSponsor,
      openNewSponsor: () => this.setState({ newSponsor: { name: '', club: all ? 'vif' : sel, type: '', amount: '', from: '2026-10-01', to: '2027-09-30', person: '', email: '' } }),
      closeNewSponsor: () => this.setState({ newSponsor: null }),
      tNewSponsorTitle: en ? 'New sponsor' : 'Ny sponsor',
      nsLabel: 'display: grid; gap: 5px; font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.72)',
      tNsName: en ? 'Sponsor name' : 'Sponsornavn',
      tNsClub: en ? 'Club' : 'Klubb',
      tNsType: en ? 'Type of agreement' : 'Type avtale',
      tNsTypePh: en ? 'e.g. Kit sponsor' : 'f.eks. Draktsponsor',
      tNsAmount: en ? 'Amount per year (NOK)' : 'Beløp per år (kr)',
      tNsFrom: en ? 'Start' : 'Start',
      tNsTo: en ? 'End' : 'Slutt',
      tNsPerson: en ? 'Contact person' : 'Kontaktperson',
      tNsEmail: en ? 'Report email' : 'E-post for rapporter',
      tNsSave: en ? 'Add sponsor' : 'Legg til sponsor',
      nsClubs: clubs.map(c => ({ key: 'nc' + c.id, id: c.id, name: c.name })),
      nsName: (this.state.newSponsor || {}).name || '',
      nsClub: (this.state.newSponsor || {}).club || 'vif',
      nsType: (this.state.newSponsor || {}).type || '',
      nsAmount: (this.state.newSponsor || {}).amount || '',
      nsFrom: (this.state.newSponsor || {}).from || '',
      nsTo: (this.state.newSponsor || {}).to || '',
      nsPerson: (this.state.newSponsor || {}).person || '',
      nsEmail: (this.state.newSponsor || {}).email || '',
      onNsName: (e) => { const v = e.target.value; this.setState(st => ({ newSponsor: Object.assign({}, st.newSponsor, { name: v }) })); },
      onNsClub: (e) => { const v = e.target.value; this.setState(st => ({ newSponsor: Object.assign({}, st.newSponsor, { club: v }) })); },
      onNsType: (e) => { const v = e.target.value; this.setState(st => ({ newSponsor: Object.assign({}, st.newSponsor, { type: v }) })); },
      onNsAmount: (e) => { const v = e.target.value; this.setState(st => ({ newSponsor: Object.assign({}, st.newSponsor, { amount: v }) })); },
      onNsFrom: (e) => { const v = e.target.value; this.setState(st => ({ newSponsor: Object.assign({}, st.newSponsor, { from: v }) })); },
      onNsTo: (e) => { const v = e.target.value; this.setState(st => ({ newSponsor: Object.assign({}, st.newSponsor, { to: v }) })); },
      onNsPerson: (e) => { const v = e.target.value; this.setState(st => ({ newSponsor: Object.assign({}, st.newSponsor, { person: v }) })); },
      onNsEmail: (e) => { const v = e.target.value; this.setState(st => ({ newSponsor: Object.assign({}, st.newSponsor, { email: v }) })); },
      saveNewSponsor: (e) => {
        e.preventDefault();
        const n = this.state.newSponsor;
        if (!n) return;
        const fmtD = (iso) => { const p = String(iso || '').split('-'); return p.length === 3 ? parseInt(p[2], 10) + '.' + parseInt(p[1], 10) + '.' + p[0] : '–'; };
        const si = 100 + this.state.extraSponsors.length;
        const amt = 'kr ' + (parseInt(n.amount, 10) || 0).toLocaleString('nb-NO').replace(/\u00a0/g, ' ');
        const row = {
          si: si, club: n.club, title: n.name.trim(), meta: (n.type.trim() || (en ? 'Sponsor' : 'Sponsor')) + (en ? ' · until ' : ' · til ') + fmtD(n.to), amount: amt, tag: en ? 'new' : 'ny', kind: 'ok',
          info: { renewed: fmtD(n.from), until: fmtD(n.to), person: n.person.trim(), email: n.email.trim(), reports: [{ title: en ? 'First report' : 'Første rapport', date: fmtD(n.to) }] },
          text: { club: [en ? 'Obligations to be added' : 'Forpliktelser legges inn senere'], sponsor: [amt + (en ? ' per year' : ' per år')], terms: [(en ? 'Period ' : 'Periode ') + fmtD(n.from) + ' – ' + fmtD(n.to)], signed: en ? 'Created in Kretz — attach the signed PDF.' : 'Opprettet i Kretz — legg ved signert PDF.' }
        };
        this.setState(st => ({ extraSponsors: st.extraSponsors.concat([row]), newSponsor: null, sponsorOpen: si }));
      },
      tSponsorFiles: en ? 'Files' : 'Filer',
      tOpenFile: en ? 'Open' : 'Åpne',
      tRemoveFile: en ? 'Remove file' : 'Fjern fil',
      tNoFiles: en ? 'No files yet.' : 'Ingen filer ennå.',
      tAttachFile: en ? 'Attach files' : 'Legg ved filer',
      tSeeAgreement: en ? 'View agreement' : 'Se avtalen',
      tAgreementKicker: en ? 'Sponsorship agreement' : 'Sponsoravtale',
      agreeOpen: !!agSp,
      closeAgreement: () => this.setState({ agreementFor: -1 }),
      closeAgreementBg: (e) => { if (e.target === e.currentTarget) this.setState({ agreementFor: -1 }); },
      agTitle: agSp ? agSp.title : '',
      agParties: agSp ? (clubOf(agSp.club) + ' × ' + agSp.title) : '',
      agFacts: agSp ? [
        { key: 'a1', label: en ? 'Value' : 'Verdi', value: agSp.amount + (en ? ' / year' : ' / år') },
        { key: 'a2', label: en ? 'Renewed' : 'Fornyet', value: agX.renewed || '–' },
        { key: 'a3', label: en ? 'Runs until' : 'Gjelder til', value: agX.until || '–' },
        { key: 'a4', label: en ? 'Contact' : 'Kontakt', value: agX.person || '–' }
      ] : [],
      agSections: agSp ? [
        { key: 's1', title: en ? 'The club delivers' : 'Klubben leverer', items: (agX.club || []).map((t, i) => ({ key: 'c' + i, text: t })) },
        { key: 's2', title: en ? 'The sponsor delivers' : 'Sponsoren leverer', items: (agX.sponsor || []).map((t, i) => ({ key: 'p' + i, text: t })) },
        { key: 's3', title: en ? 'Reporting and terms' : 'Rapportering og vilkår', items: (agX.terms || []).map((t, i) => ({ key: 't' + i, text: t })) }
      ] : [],
      agSigned: agSp ? (agX.signed || '') : '',
      tSendReport: en ? 'Email report' : 'Send rapport på e-post',
      tGrantWho: en ? 'Relevant for' : 'Relevant for',
      tGrantGo: en ? 'Go to application' : 'Gå til søknaden',
      showTT: tab === 'timetable',
      ttHasTabs: true,
      ttTabs: clubs.map(c => ({
        key: 'tt' + c.id, label: c.name, active: c.id === ttClubId,
        pick: () => this.setState({ ttClub: c.id }),
        style: chip(c.id === ttClubId, false)
      })),
      ttClubName: clubOf(ttClubId),
      ttLegend: ttGroups.map(g => ({ key: 'tl' + g.id, name: en ? (g.en || g.no) : (g.no || g.en), style: 'padding: 5px 11px; border-radius: 999px; font-size: 12px; font-weight: 700; background: ' + g.color + '; color: #16241a' })),
      ttCount: ttSessions.length + (en ? ' sessions per week' : ' økter per uke'),
      ttDays: ttDayNames.map((n, i) => ({ key: 'td' + i, name: n })),
      ttHours: ttAx.hours,
      ttBodyH: ttAx.total + 'px',
      ttCols: ttCols,
      ttMove: (ev) => {
        const dg = this._ttDrag;
        if (!dg) return;
        const dx = ev.clientX - dg.x0, dy = ev.clientY - dg.y0;
        if (!dg.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
        dg.moved = true;
        const dur = dg.b - dg.a;
        let na = Math.round(ttAx.mOf(ttAx.yOf(dg.a) + dy) / 15) * 15;
        na = Math.max(6 * 60, Math.min(23 * 60 - dur, na));
        let day = dg.d;
        const hit = (document.elementsFromPoint ? document.elementsFromPoint(ev.clientX, ev.clientY) : []).find(el => el && el.dataset && el.dataset.ttDay !== undefined);
        if (hit) day = parseInt(hit.dataset.ttDay, 10);
        dg.na = na; dg.day = day;
        this.setState({ ttDrag: { idx: dg.idx, moved: true, dx: dx, a: na, b: na + dur, day: day } });
      },
      ttUp: () => {
        const dg = this._ttDrag;
        this._ttDrag = null;
        if (!dg) return;
        if (!dg.moved) { this.setState({ ttDrag: null }); return; }
        this._ttSkipClick = true;
        setTimeout(() => { this._ttSkipClick = false; }, 60);
        const data = this.ttData();
        const c = data[ttClubId];
        const row = c && c.s[dg.idx];
        const na = dg.na !== undefined ? dg.na : dg.a;
        const nd = dg.day !== undefined ? dg.day : dg.d;
        this.setState({ ttDrag: null });
        if (!row || (na === dg.a && nd === dg.d)) return;
        row[0] = nd; row[1] = ttFmt(na); row[2] = ttFmt(na + (dg.b - dg.a));
        const gObj = ttGroups.find(q => q.id === row[3]);
        const gname = gObj ? (en ? (gObj.en || gObj.no) : (gObj.no || gObj.en)) : row[3];
        this.ttCommit(data, (en ? 'Moved ' : 'Flyttet ') + gname + (en ? ' to ' : ' til ') + ttDayNames[nd].toLowerCase() + ' ' + row[1] + '–' + row[2] + (en ? ' — not saved yet.' : ' — ikke lagret ennå.'));
      },
      ttCancelDrag: () => { this._ttDrag = null; this.setState({ ttDrag: null }); },
      tTTNew: en ? '+ New session' : '+ Ny økt',
      tTTReset: en ? 'Reset to default' : 'Tilbakestill',
      tTTHelp: en ? 'Drag a session to move it to another time or day · click it to edit · double-click an empty day to add one. Press Save week plan to publish the changes to members.' : 'Dra en økt for å flytte den til en annen tid eller dag · klikk for å endre · dobbeltklikk på en tom dag for å legge til. Trykk Lagre ukeplan for å publisere endringene til medlemmene.',
      tTTDblHint: en ? 'Double-click to add a session' : 'Dobbeltklikk for å legge til økt',
      ttNew: () => this.setState({ ttEdit: { idx: -1, d: 0, a: '17:00', b: '18:30', g: (ttGroups[0] || {}).id || '', p: ttDefaultPlace, err: '' } }),
      ttReset: () => {
        const d = KretzTimetable ? KretzTimetable.defaults() : null;
        if (d) this.ttCommit(d, en ? 'Default week plans loaded — press Save to publish.' : 'Standard ukeplaner er lastet inn — trykk Lagre for å publisere.');
      },
      ttDirty: !!this.state.ttDraft,
      ttClean: !this.state.ttDraft,
      ttDirtyText: this.state.ttDraft
        ? (en ? 'Unsaved changes — members still see the previous week plan.' : 'Ulagrede endringer — medlemmene ser fortsatt forrige ukeplan.')
        : (en ? 'All changes saved. Members see this week plan.' : 'Alt er lagret. Medlemmene ser denne ukeplanen.'),
      ttDirtyDot: 'width: 9px; height: 9px; border-radius: 999px; background: ' + (this.state.ttDraft ? '#e0a100' : '#1f7a3a'),
      tTTDiscard: en ? 'Discard changes' : 'Forkast endringer',
      tTTPublish: en ? 'Save week plan' : 'Lagre ukeplan',
      ttSaveStyle: 'padding: 12px 24px; border-radius: 999px; border: 0; font-family: var(--font-heading); font-weight: 800; font-size: 14px; transition: background .3s, opacity .3s; '
        + (this.state.ttDraft ? 'background: #1f7a3a; color: #ffffff; cursor: pointer;' : 'background: rgba(22,36,26,.12); color: rgba(22,36,26,.55); cursor: default;'),
      ttDiscard: () => {
        if (this._ttSavedT) clearTimeout(this._ttSavedT);
        this.setState({ ttDraft: null, ttEdit: null, ttSaved: en ? 'Changes discarded.' : 'Endringene er forkastet.' });
        this._ttSavedT = setTimeout(() => this.setState({ ttSaved: '' }), 4000);
      },
      ttPublish: () => {
        if (!this.state.ttDraft) return;
        if (KretzTimetable) KretzTimetable.save(this.state.ttDraft);
        if (this._ttSavedT) clearTimeout(this._ttSavedT);
        this.setState(st => ({ ttDraft: null, ttEdit: null, ttTick: st.ttTick + 1, ttSaved: en ? 'Saved — members now see the updated week plan.' : 'Lagret — medlemmene ser nå den oppdaterte ukeplanen.' }));
        this._ttSavedT = setTimeout(() => this.setState({ ttSaved: '' }), 5000);
      },
      ttSavedShow: !!this.state.ttSaved,
      ttSavedText: this.state.ttSaved,
      ttGroupDraft: this.state.ttGroupDraft,
      onTTGroupDraft: (e) => this.setState({ ttGroupDraft: e.target.value }),
      tTTGroupPh: en ? 'New group…' : 'Ny gruppe …',
      tTTAddGroup: en ? 'Add' : 'Legg til',
      ttAddGroup: (e) => {
        e.preventDefault();
        const name = this.state.ttGroupDraft.trim();
        if (!name) return;
        const data = this.ttData();
        const c = data[ttClubId] || (data[ttClubId] = { groups: [], s: [] });
        const pal = (KretzTimetable && KretzTimetable.PALETTE) || ['#74cd85'];
        c.groups.push({ id: 'g' + Date.now(), no: name, en: name, color: pal[c.groups.length % pal.length] });
        this.setState({ ttGroupDraft: '' });
        this.ttCommit(data, (en ? 'Group added to ' : 'Gruppen er lagt til i ') + clubOf(ttClubId) + (en ? ' — not saved yet.' : ' — ikke lagret ennå.'));
      },
      ttEditOpen: !!ttE,
      ttEditTitle: ttE && ttE.idx >= 0 ? (en ? 'Edit session' : 'Endre økt') : (en ? 'New session' : 'Ny økt'),
      ttEditSub: clubOf(ttClubId) + (en ? ' · published when you press Save' : ' · publiseres når du trykker Lagre'),
      tTTGroup: en ? 'Group' : 'Gruppe',
      tTTDay: en ? 'Day' : 'Dag',
      tTTStart: en ? 'Start' : 'Start',
      tTTEnd: en ? 'End' : 'Slutt',
      tTTPlace: en ? 'Place' : 'Sted',
      tTTSave: en ? 'Save' : 'Lagre',
      tTTCancel: en ? 'Cancel' : 'Avbryt',
      tTTDelete: en ? 'Delete' : 'Slett',
      ttGroupOpts: ttGroups.map(g => ({ key: 'go' + g.id, id: g.id, name: en ? (g.en || g.no) : (g.no || g.en) })),
      ttDayOpts: ttDayNames.map((n, i) => ({ key: 'do' + i, id: String(i), name: n })),
      ttEGroup: ttE ? ttE.g : '',
      ttEDay: ttE ? String(ttE.d) : '0',
      ttEStart: ttE ? ttE.a : '',
      ttEEnd: ttE ? ttE.b : '',
      ttEPlace: ttE ? ttE.p : '',
      onTTEGroup: (e) => { const v = e.target.value; this.setState(st => ({ ttEdit: Object.assign({}, st.ttEdit, { g: v }) })); },
      onTTEDay: (e) => { const v = parseInt(e.target.value, 10) || 0; this.setState(st => ({ ttEdit: Object.assign({}, st.ttEdit, { d: v }) })); },
      onTTEStart: (e) => { const v = e.target.value; this.setState(st => ({ ttEdit: Object.assign({}, st.ttEdit, { a: v, err: '' }) })); },
      onTTEEnd: (e) => { const v = e.target.value; this.setState(st => ({ ttEdit: Object.assign({}, st.ttEdit, { b: v, err: '' }) })); },
      onTTEPlace: (e) => { const v = e.target.value; this.setState(st => ({ ttEdit: Object.assign({}, st.ttEdit, { p: v }) })); },
      ttEError: !!(ttE && ttE.err),
      ttEErrorText: ttE ? ttE.err : '',
      ttCanDelete: !!(ttE && ttE.idx >= 0),
      ttCancel: () => this.setState({ ttEdit: null }),
      ttDelete: () => {
        const ed = this.state.ttEdit;
        if (!ed || ed.idx < 0) return;
        const data = this.ttData();
        const c = data[ttClubId];
        if (c) c.s.splice(ed.idx, 1);
        this.ttCommit(data, (en ? 'Session deleted — not saved yet.' : 'Økten er slettet — ikke lagret ennå.'));
      },
      ttSaveEdit: (e) => {
        e.preventDefault();
        const ed = this.state.ttEdit;
        if (!ed) return;
        const tm = (t) => { const p = String(t || '').split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); };
        if (!(tm(ed.b) > tm(ed.a))) { this.setState({ ttEdit: Object.assign({}, ed, { err: en ? 'End time must be after the start.' : 'Sluttid må være etter start.' }) }); return; }
        const data = this.ttData();
        const c = data[ttClubId] || (data[ttClubId] = { groups: [], s: [] });
        const row = [ed.d, ed.a, ed.b, ed.g, (ed.p || '').trim() || ttDefaultPlace];
        if (ed.idx >= 0) c.s[ed.idx] = row; else c.s.push(row);
        this.ttCommit(data, (en ? 'Session updated — not saved yet.' : 'Økten er oppdatert — ikke lagret ennå.'));
      },
      tfPeriods: tfPeriodDefs.map(p => ({
        key: 'tp' + p.id,
        label: p.label,
        pick: () => this.setState({ tfPeriod: p.id, tfPage: 0 }),
        style: chip(this.state.tfPeriod === p.id, false)
      })),
      tfCustom: this.state.tfPeriod === 'custom',
      tfFrom: this.state.tfFrom,
      tfTo: this.state.tfTo,
      onTfFrom: (e) => this.setState({ tfFrom: e.target.value }),
      onTfTo: (e) => this.setState({ tfTo: e.target.value }),
      tfRange: tfRangeLabel,
      tfCards: [
        { key: 'tc1', label: en ? 'Current balance' : 'Saldo nå', value: kr(tfNow), note: all ? (en ? 'Combined · 3 bank accounts' : 'Samlet · 3 bankkontoer') : tfAcc(sel), dot: '#16241a', tint: '#ffffff' },
        { key: 'tc2', label: en ? 'Incoming' : 'Innkommende', value: sgn(pgIn, kr), note: pgInN + (en ? ' transactions' : ' transaksjoner') + pgNoteSuffix, dot: '#1f7a3a', tint: '#eaf7ed' },
        { key: 'tc3', label: en ? 'Outgoing' : 'Utgående', value: sgn(-pgOut, kr), note: pgOutN + (en ? ' transactions' : ' transaksjoner') + pgNoteSuffix, dot: '#d9644f', tint: '#fbe9e5' }
      ].map(c => ({
        key: c.key, label: c.label, value: c.value, note: c.note,
        style: 'border-radius: 26px; background: ' + c.tint + '; border: 1px solid rgba(22,36,26,.12); padding: 22px',
        dotStyle: 'width: 9px; height: 9px; border-radius: 999px; background: ' + c.dot
      })),
      tfFlow: [
        { key: 'fl1', label: en ? 'Balance before these rows' : 'Saldo før disse radene', value: kr(pgStart), tone: 'plain' },
        { key: 'fl2', label: en ? 'Change' : 'Endring', value: sgn(pgChange, kr), tone: pgChange > 0 ? 'up' : (pgChange < 0 ? 'down' : 'plain') },
        { key: 'fl3', label: en ? 'Balance after these rows' : 'Saldo etter disse radene', value: kr(pgEnd), tone: 'plain' }
      ].map((f, i) => ({
        key: f.key, label: f.label, value: f.value,
        style: 'display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding: 16px 22px;' + (i < 2 ? ' border-bottom: 1px solid rgba(22,36,26,.1);' : ' background: #f4f8f2;'),
        valueStyle: 'font-family: var(--font-heading); font-weight: 800; font-size: 20px; white-space: nowrap; color: ' + (f.tone === 'up' ? '#1f7a3a' : (f.tone === 'down' ? '#7a5406' : '#16241a'))
      })),
      tTfTx: en ? 'Transactions and movements' : 'Transaksjoner og bevegelser',
      tfTxCount: tfRows.length + (en ? ' entries' : ' posteringer'),
      tTfSearch: en ? 'Search date, number, description or customer/supplier…' : 'Søk på dato, nummer, beskrivelse eller kunde/leverandør …',
      tfQ: this.state.tfQ,
      onTfQ: (e) => this.setState({ tfQ: e.target.value, tfPage: 0 }),
      tColDate: en ? 'Date' : 'Dato',
      tColTx: en ? 'Transaction no.' : 'Transaksjonsnr.',
      tColInv: en ? 'Invoice no.' : 'Fakturanr.',
      tColAcc: en ? 'Receiving account' : 'Mottakerkonto',
      tfShowAcc: all,
      tfCols: all ? '96px 140px 170px 120px minmax(0,1.6fr) minmax(0,1.2fr) 120px' : '96px 140px 120px minmax(0,1.6fr) minmax(0,1.2fr) 120px',
      tfMinW: all ? '990px' : '820px',
      tColDesc: en ? 'Description' : 'Beskrivelse',
      tColParty: en ? 'Customer/supplier' : 'Kunde/leverandør',
      tColSum: en ? 'Sum' : 'Sum',
      tfTx: tfPageRows,
      tPerPage: en ? 'Show per page' : 'Vis per side',
      tfPageSize: String(this.state.tfPageSize),
      onTfPageSize: (e) => this.setState({ tfPageSize: parseInt(e.target.value, 10) || 50, tfPage: 0 }),
      tfPageLabel: tfRows.length ? (tfFrom1 + '–' + tfTo1 + (en ? ' of ' : ' av ') + tfRows.length) : '',
      tPrevPage: en ? 'Previous page' : 'Forrige side',
      tNextPage: en ? 'Next page' : 'Neste side',
      tfNoPrev: tfPg === 0,
      tfNoNext: tfPg >= tfPages - 1,
      tfPrevOpacity: tfPg === 0 ? '.4' : '1',
      tfNextOpacity: tfPg >= tfPages - 1 ? '.4' : '1',
      tfPrev: () => this.setState({ tfPage: Math.max(0, tfPg - 1) }),
      tfNext: () => this.setState({ tfPage: Math.min(tfPages - 1, tfPg + 1) }),
      tExport: en ? 'Export' : 'Eksporter',
      exportOpen: this.state.exportOpen,
      toggleExport: () => this.setState(st => ({ exportOpen: !st.exportOpen })),
      tExportExcelNote: tfRows.length + (en ? ' rows as spreadsheet (.csv)' : ' rader som regneark (.csv)'),
      tExportPdfNote: en ? 'Printable report — save as PDF' : 'Utskriftsvennlig rapport — lagre som PDF',
      exportExcel: () => {
        const head = [tColsE.date, tColsE.tx].concat(all ? [tColsE.acc] : []).concat([tColsE.inv, tColsE.desc]).concat(all ? [tColsE.club] : []).concat([tColsE.party, tColsE.sum]);
        const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
        const lines = [
          q(tfClubName),
          q(tfAccLine),
          q((en ? 'Period: ' : 'Periode: ') + tfRangeLabel),
          '',
          head.map(q).join(';')
        ].concat(tfExport.map(r => [r.date, r.tx].concat(all ? [r.acc] : []).concat([r.inv, r.desc]).concat(all ? [r.club] : []).concat([r.party, r.amount]).map(q).join(';')));
        const blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = tfFileBase + '.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
        this.setState({ exportOpen: false });
      },
      exportPdf: () => {
        const esc = (v) => String(v).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
        const rowsHtml = tfExport.map(r => '<tr><td>' + esc(r.date) + '</td><td class="m">' + esc(r.tx) + '</td>' + (all ? '<td class="m">' + esc(r.acc) + '</td>' : '') + '<td class="m">' + esc(r.inv) + '</td><td><b>' + esc(r.desc) + '</b>' + (all ? '<div class="c">' + esc(r.club) + '</div>' : '') + '</td><td>' + esc(r.party) + '</td><td class="r ' + (r.amount >= 0 ? 'in' : '') + '">' + esc(r.sumText) + '</td></tr>').join('');
        const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc(tfClubName + ' · ' + tfRangeLabel) + '</title><style>'
          + '@page{size:A4 landscape;margin:14mm}body{font-family:Helvetica,Arial,sans-serif;color:#16241a;font-size:10.5pt}'
          + 'h1{font-size:18pt;margin:0 0 4px}.sub{color:#4a5a4e;margin-bottom:14px}'
          + '.sum{display:flex;gap:24px;margin:0 0 16px}.sum div{border:1px solid #cfd8cc;border-radius:10px;padding:8px 12px}.sum b{display:block;font-size:12pt}'
          + 'table{width:100%;border-collapse:collapse}th{text-align:left;font-size:8.5pt;letter-spacing:.06em;text-transform:uppercase;border-bottom:2px solid #16241a;padding:6px}'
          + 'td{border-bottom:1px solid #dde4da;padding:6px;vertical-align:top}.m{font-family:Menlo,monospace;font-size:9pt}.r{text-align:right;white-space:nowrap;font-weight:700}.in{color:#1f7a3a}.c{color:#5b6b5f;font-size:8.5pt}'
          + '</style></head><body><h1>' + esc(tfClubName) + '</h1><div class="sub">' + esc(tfAccLine) + '<br>' + esc((en ? 'Period: ' : 'Periode: ') + tfRangeLabel) + '</div>'
          + '<table><thead><tr><th>' + esc(tColsE.date) + '</th><th>' + esc(tColsE.tx) + '</th>' + (all ? '<th>' + esc(tColsE.acc) + '</th>' : '') + '<th>' + esc(tColsE.inv) + '</th><th>' + esc(tColsE.desc) + '</th><th>' + esc(tColsE.party) + '</th><th style="text-align:right">' + esc(tColsE.sum) + '</th></tr></thead><tbody>' + rowsHtml + '</tbody></table></body></html>';
        const frame = document.createElement('iframe');
        frame.setAttribute('aria-hidden', 'true');
        frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
        document.body.appendChild(frame);
        const doc = frame.contentWindow.document;
        doc.open(); doc.write(html); doc.close();
        setTimeout(() => {
          try { frame.contentWindow.focus(); frame.contentWindow.print(); } catch (err) {}
          setTimeout(() => frame.remove(), 2000);
        }, 300);
        this.setState({ exportOpen: false });
      },
      tfEmpty: tfRows.length === 0,
      tTfEmpty: en ? 'No movements match.' : 'Ingen bevegelser matcher.',
      tMembersHeading: en ? 'Members' : 'Medlemmer',

      tClubsBtn: en ? 'Groups' : 'Grupper',
      clubsOpen: !!this.state.clubsOpen,
      clubsArrow: this.state.clubsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      toggleClubs: () => this.setState(st => ({ clubsOpen: !st.clubsOpen })),
      closeClubs: () => this.setState({ clubsOpen: false }),
      hasAllClubs: false,
      tAllClubs: en ? 'All clubs' : 'Alle klubber',
      allClubsCount: clubs.length + (en ? ' clubs' : ' klubber'),
      tYourClubs: en ? 'Your clubs' : 'Dine klubber',
      allClubsStyle: 'display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 16px; cursor: pointer; font-family: var(--font-body); color: #16241a; transition: background .2s, border-color .2s; border: 1px solid ' + (sel === 'all' ? '#74cd85' : 'rgba(22,36,26,.12)') + '; background: ' + (sel === 'all' ? '#eaf7ed' : '#ffffff') + ';',
      allClubsCheck: 'color: #1f7a3a; font-weight: 800; visibility: ' + (sel === 'all' ? 'visible' : 'hidden'),
      pickAllClubs: () => this.setState({ club: 'all', formClub: 'vif', memGroup: 'all', bulkSms: 0, bulkSmsAt: '', msgTo: 'club', venDraft: null, venSaved: '', clubsOpen: false, cgQ: '', cgCat: '', cgDept: '' }),
      clubCards: clubs.filter(c => c.id !== 'vif' && c.id !== 'varden').map((c, ci) => ({ key: 'cc' + c.id, name: c.name, slotId: 'club-photo-' + c.id,
        circleStyle: 'display: block; width: 64px; height: 64px; border-radius: 999px; background: ' + ['#1f7a3a', '#74cd85', '#a3e2ae', '#3E8A48', '#CDEFD3', '#16241a'][ci % 6] + '; box-shadow: inset 0 0 0 4px rgba(255,255,255,.35)', initials: c.name.split(/\s+/).slice(0, 2).map(w => w.charAt(0)).join(''),
        style: 'display: grid; justify-items: center; padding: 12px 6px; border-radius: 18px; border: 1px solid ' + (sel === c.id ? '#74cd85' : 'rgba(22,36,26,.1)') + '; background: ' + (sel === c.id ? '#eaf7ed' : '#ffffff') + '; cursor: pointer; font-family: var(--font-body); color: #16241a; transition: background .2s, border-color .2s;',
        pick: () => this.setState({ club: c.id, formClub: c.id, memGroup: 'all', bulkSms: 0, bulkSmsAt: '', msgTo: 'club', venDraft: null, venSaved: '', clubsOpen: this.state.tab === 'comms', cgQ: '', cgCat: '', cgDept: '' })
      })),
      clubTabs: (tab === 'booking' ? clubs : [{ id: 'all', name: en ? 'All clubs' : 'Alle klubber' }].concat(clubs)).map(c => ({
        key: 'cl' + c.id,
        label: c.name,
        pick: () => this.setState({ club: c.id, formClub: c.id === 'all' ? 'vif' : c.id, memGroup: 'all', bulkSms: 0, bulkSmsAt: '', msgTo: 'club', venDraft: null, venSaved: '' }),
        style: chip(sel === c.id, false)
      })),

      stats: [
        { key: 's1', label: en ? 'Members' : 'Medlemmer', value: all ? '612' : (sel === 'vif' ? '284' : (sel === 'fana' ? '221' : '107')), note: en ? 'active this season' : 'aktive denne sesongen' },
        { key: 's2', label: en ? 'Sign-ups' : 'Påmeldinger', value: String(totalSigned), note: en ? 'across upcoming activities' : 'på kommende aktiviteter' },
        { key: 's3', label: en ? 'Open spots' : 'Ledige plasser', value: String(openShifts), note: en ? 'still to be filled' : 'gjenstår å fylle' },
        { key: 's4', label: en ? 'Unpaid' : 'Ubetalt', value: String(dueCount), note: en ? 'invoices past due' : 'fakturaer forfalt' }
      ],

      listTitle: tab === 'teamfund' ? (en ? 'Team fund' : 'Lagkasse') : tab === 'invoicing' ? (en ? 'Member invoicing' : 'Medlem fakturering') : tab === 'finance' ? (en ? 'Key figures' : 'Nøkkeltall') : tab === 'daily' ? 'Events' : (tab === 'activities' ? (en ? 'Coming activities' : 'Kommende aktiviteter') : ((tabs.find(t => t.id === tab) || {}).label || '')),
      composeLabel: en ? '+ New activity' : '+ Ny aktivitet',
      showCompose: tab === 'activities' || tab === 'daily',
      showCardTitle: tab === 'activities' || tab === 'daily',
      showPostsInCard: tab === 'activities',
      showPostsBox: false,
      cardCols: 'minmax(0, 1fr)',
      postsTopGap: tab === 'daily' ? '18px' : '26px',
      showPostHeadBtn: tab === 'activities',
      showActivities: tab === 'activities' || tab === 'daily',
      splitTop: (tab === 'daily' || tab === 'invoicing' || (tab === 'supplier' || tab === 'budget' || tab === 'integr' || tab === 'comms' || tab === 'planning' || tab === 'docs' || tab === 'volunteer')) ? '4px' : '18px',
      showMainCard: tab !== 'activities' && tab !== 'supplier' && tab !== 'budget' && tab !== 'integr' && tab !== 'comms' && tab !== 'planning' && tab !== 'docs' && tab !== 'volunteer',
      splitAlign: tab === 'activities' ? 'stretch' : 'start',
      leftRows: tab === 'activities' ? '1fr' : 'auto',
      showActCards: tab === 'activities' && !!this.state.actsOpen,
      showActTable: tab === 'daily',
      actsExpanded: tab === 'daily' || this.state.actsOpen,
      postsExpanded: tab === 'daily' || this.state.postsOpen,
      toggleActs: () => { if (tab !== 'daily') this.setState(st => ({ actsOpen: !st.actsOpen })); },
      togglePosts: () => { if (tab !== 'daily') this.setState(st => ({ postsOpen: !st.postsOpen })); },
      chevDisplay: tab === 'daily' ? 'none' : 'grid',
      actListStyle: 'display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; margin-top: 18px; align-content: start;' + (tab === 'daily' ? ' max-height: 560px; overflow-y: auto; overscroll-behavior: contain; padding-right: 6px; scrollbar-width: thin;' : ''),
      postListStyle: 'display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; margin-top: 16px; align-content: start;' + (tab === 'daily' ? ' max-height: 560px; overflow-y: auto; overscroll-behavior: contain; padding-right: 6px; scrollbar-width: thin;' : ''),
      actChevron: this.state.actsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      postChevron: this.state.postsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      actCountLabel: acts.length + (en ? (acts.length === 1 ? ' activity' : ' activities') : (acts.length === 1 ? ' aktivitet' : ' aktiviteter')),
      postCountLabel: posts.length + (en ? (posts.length === 1 ? ' post' : ' posts') : ' innlegg'),
      showPosts: tab === 'activities' || tab === 'daily',
      showMembers: tab === 'members',
      showRows: rowTabs.indexOf(tab) !== -1 && tab !== 'booking',
      showVenueAdmin: tab === 'booking',
      showGrants: tab === 'sponsors',
      tGrantsHeading: en ? 'Grants and funding' : 'Støtte og midler',
      grantsSub: en ? grantN + placesWord(grantN) + ' you can apply' : grantN + placesWord(grantN) + ' dere kan søke',
      grants: grantRows,
      tSponsorAgreements: en ? 'Sponsor agreements' : 'Sponsoravtaler',
      showFinance: tab === 'finance',
      showSideDefault: false,
      showDailySide: false,
      splitCols: (tab === 'daily' || tab === 'invoicing' || (tab === 'supplier' || tab === 'budget' || tab === 'integr' || tab === 'comms' || tab === 'planning' || tab === 'docs' || tab === 'volunteer')) ? 'minmax(0, 1fr)' : 'minmax(0, 1.5fr) minmax(0, 1fr)',
      showBandFilters: tab !== 'invoicing' && tab !== 'timetable' && tab !== 'depts' && tab !== 'profile',
      showMsgBox: false,
      showDemo: tab === 'members',
      tDemo: en ? 'Age and gender' : 'Alder og kjønn',
      demoSub: en ? totalMembers + ' members · ' + (all ? 'all clubs' : clubOf(sel)) : totalMembers + ' medlemmer · ' + (all ? 'alle klubber' : clubOf(sel)),
      tGirls: en ? 'Girls / women' : 'Jenter / kvinner',
      tBoys: en ? 'Boys / men' : 'Gutter / menn',
      girlsTotal: girlsSum + ' · ' + Math.round(girlsSum / totalMembers * 100) + ' %',
      boysTotal: boysSum + ' · ' + Math.round(boysSum / totalMembers * 100) + ' %',
      ageBands: ageRows,
      ageTicks: ageTicks,
      demoAvgAge: (en ? 'Average age ' : 'Snittalder ') + avgAge + (en ? ' yrs' : ' år'),
      demoLargest: (en ? 'Largest group ' : 'Største gruppe ') + largest.label,
      showStats: false,
      showOutstanding: false,
      showCalendar: tab === 'activities',
      showSummary: tab === 'activities',
      
      tNewActivity: en ? 'Create activity' : 'Opprett aktivitet',
      tNewActivityNote: en ? 'Members can sign up as soon as you publish.' : 'Medlemmene kan melde seg på så snart du publiserer.',
      tPublishActivity: en ? 'Publish activity' : 'Publiser aktivitet',
      tActDone: en ? 'Published — sign-up is open.' : 'Publisert — påmeldingen er åpen.',
      actDone: this.state.actDone,
      quickActivity: (e) => {
        e.preventDefault();
        const d = this.state.formDate.split('-');
        this.setState(st => ({
          newActs: st.newActs.concat([{
            id: 'na' + Date.now(), club: st.formClub,
            m: parseInt(d[1], 10) || 9, day: parseInt(d[2], 10) || 20,
            time: st.formTime, title: st.formTitle, place: st.formPlace,
            leader: st.formLeader, cap: parseInt(st.formCap, 10) || 20, signed: 0,
            members: expandTo(st.formTo, st.formClub),
            answers: {}, to: labelTo(st.formTo, st.formClub), deadline: fmtDate(st.formDeadline), internal: st.formInternal
          }]),
          actDone: true, formTitle: '', formPlace: '', formLeader: ''
        }));
      },
      tNewPostBox: en ? 'Write a post' : 'Skriv et innlegg',
      tNewPostNote: en ? 'Choose the club or training group that should see it.' : 'Velg klubben eller treningsgruppa som skal se det.',
      tPublishPost: en ? 'Publish post' : 'Publiser innlegg',
      tPostDone: en ? 'Published — members can see it now.' : 'Publisert — medlemmene ser det nå.',
      postDone: this.state.postDone,
      postTo: this.state.postTo,
      onPostTo: (e) => this.setState({ postTo: e.target.value, postDone: false }),
      postTargets: clubs.map(c => ({ key: 'pt' + c.id, id: c.id, name: c.name }))
        .concat(clubs.reduce((acc, c) => acc.concat(this.groupsOf(c.id, en).map((g, i) => ({ key: 'ptg' + c.id + i, id: c.id + '|' + g, name: c.name + ' · ' + g }))), [])),
      formTitle2: this.state.formTitle2,
      onFormTitle2: (e) => this.setState({ formTitle2: e.target.value, postDone: false }),
      quickPost: (e) => {
        e.preventDefault();
        const target = this.state.postTo;
        const clubId = target.indexOf('|') > -1 ? target.split('|')[0] : target;
        const group = target.indexOf('|') > -1 ? target.split('|')[1] : '';
        this.setState(st => ({
          newPosts: [{
            id: 'np' + Date.now(), club: clubId, high: st.formHigh,
            when: en ? 'just now' : 'akkurat nå',
            title: (group ? group + ': ' : '') + st.formTitle2,
            text: st.formText, reads: 0, comments: 0
          }].concat(st.newPosts),
          postDone: true, formTitle2: '', formText: '', formHigh: false
        }));
      },
      grantCount: String(grantN),
      grantTitle: en ? grantN + placesWord(grantN) + ' you can apply for funding' : grantN + placesWord(grantN) + ' dere kan søke støtte og midler',
      grantNote: grantDue ? (en ? 'Next deadline ' + grantDue.replace('.', '') + ' · see all in Sponsors' : 'Neste frist ' + grantDue + ' · se alle under Sponsorer') : (en ? 'See all in Sponsors' : 'Se alle under Sponsorer'),
      goSponsors: () => { this.setState({ tab: 'sponsors' }); window.scrollTo({ top: 0, behavior: 'smooth' }); },
      tFocusKicker: en ? 'Needs attention' : 'Viktig nå',
      tResponsible: en ? 'Responsible' : 'Ansvarlig',
      tWhen: en ? 'When' : 'Når',
      focusCountdown: focus.countdown,
      focusTitle: focus.title,
      focusText: focus.text,
      focusOwner: focus.owner,
      focusWhen: focus.when,
      calMonthLabel: monthLabel,
      calPrev: () => this.setState(st => ({ calMonth: Math.max(1, st.calMonth - 1), calPick: 0 })),
      calNext: () => this.setState(st => ({ calMonth: Math.min(12, st.calMonth + 1), calPick: 0 })),
      calWeekdays: (en ? ['M','T','W','T','F','S','S'] : ['M','T','O','T','F','L','S']).map((w, i) => ({ key: 'wd' + i, label: w })),
      calCells: calCells,
      calDayLabel: this.state.calPick ? (this.state.calPick + '. ' + monthName) : (en ? 'Pick a day' : 'Velg en dag'),
      calDayActs: dayActs.map(a => ({
        key: 'cda' + a.id,
        title: a.title,
        meta: (all ? clubOf(a.club) + ' · ' : '') + a.place + ' · ' + a.time + ' · ' + ((a.members && a.members.length) ? Object.keys(a.answers || {}).filter(k => (a.answers || {})[k] === 'yes').length : a.signed) + '/' + a.cap
      })),
      calDayEmpty: dayActs.length === 0 && dayEntries.length === 0 && (this.state.calPick ? homeOn(calM, this.state.calPick).length === 0 : true),
      calDayDeadlines: this.state.calPick ? homeOn(calM, this.state.calPick).map(homeCardOf) : [],
      calDayEntries: dayEntries.map(e => ({
        key: 'ce' + e.id,
        title: e.title,
        time: e.time,
        note: e.note,
        hasNote: !!e.note,
        people: [{ key: 'me', name: en ? 'You' : 'Deg' }].concat(e.share.map(id => {
          const c = colleagues.find(x => x.id === id);
          return { key: 'p' + id, name: c ? c.name : id };
        }))
      })),
      calCanAdd: !!this.state.calPick,
      calAddOpen: this.state.calAdd,
      calAddClosed: !this.state.calAdd,
      tAddToCal: en ? '+ Add to calendar' : '+ Legg til i kalenderen',
      openCalAdd: () => this.setState({ calAdd: true, ceSent: '', ceTitle: '', ceNote: '', ceShare: [] }),
      closeCalAdd: () => this.setState({ calAdd: false }),
      tNewEntry: this.state.calPick ? ((en ? 'New entry · ' : 'Ny oppføring · ') + this.state.calPick + '. ' + monthName) : '',
      tCeTitlePh: en ? 'What, e.g. Board meeting' : 'Hva, f.eks. Styremøte',
      tCeNotePh: en ? 'Place or note (optional)' : 'Sted eller notat (valgfritt)',
      tShareWith: en ? 'Share with' : 'Del med',
      ceTitle: this.state.ceTitle,
      ceTime: this.state.ceTime,
      ceNote: this.state.ceNote,
      onCeTitle: (e) => this.setState({ ceTitle: e.target.value }),
      onCeTime: (e) => this.setState({ ceTime: e.target.value }),
      onCeNote: (e) => this.setState({ ceNote: e.target.value }),
      ceColleagues: [{ id: 'board', name: en ? 'Whole board' : 'Hele styret', role: '' }].concat(colleagues).map(c => {
        const on = c.id === 'board'
          ? boardIds.every(id => this.state.ceShare.indexOf(id) !== -1)
          : this.state.ceShare.indexOf(c.id) !== -1;
        return {
          key: 'cc' + c.id,
          label: c.role ? c.name + ' · ' + c.role : c.name,
          toggle: () => this.setState(st => {
            let list = st.ceShare.slice();
            if (c.id === 'board') {
              list = on ? list.filter(id => boardIds.indexOf(id) === -1) : Array.from(new Set(list.concat(boardIds)));
            } else {
              list = on ? list.filter(id => id !== c.id) : list.concat([c.id]);
            }
            return { ceShare: list };
          }),
          style: 'cursor: pointer; padding: 8px 13px; border-radius: 999px; font-family: var(--font-body); font-size: 12.5px; transition: background .25s, border-color .25s, color .25s;'
            + (on
              ? ' background: #1f7a3a; border: 1px solid #1f7a3a; color: #ffffff; font-weight: 600;'
              : ' background: #ffffff; border: 1px solid rgba(22,36,26,.18); color: #16241a;')
        };
      }),
      ceSaveLabel: shareN
        ? (en ? 'Save and share with ' + shareN : 'Lagre og del med ' + shareN)
        : (en ? 'Save' : 'Lagre'),
      saveCalEntry: (e) => {
        e.preventDefault();
        const t = this.state.ceTitle.trim();
        if (!t || !this.state.calPick) return;
        const n = this.state.ceShare.length;
        const names = this.state.ceShare.map(id => (colleagues.find(x => x.id === id) || {}).name).filter(Boolean);
        this.setState(st => ({
          calEntries: st.calEntries.concat([{
            id: 'e' + Date.now(), club: all ? 'all' : sel, m: calM, day: st.calPick,
            title: t, time: st.ceTime, note: st.ceNote.trim(), share: st.ceShare.slice()
          }]),
          calAdd: false, ceTitle: '', ceNote: '', ceShare: [],
          ceSent: n
            ? (en ? 'Saved and shared — ' + names.join(', ') + ' got an invite.' : 'Lagret og delt — ' + names.join(', ') + ' har fått invitasjon.')
            : (en ? 'Saved in your calendar.' : 'Lagret i kalenderen din.')
        }));
      },
      ceSentVisible: !!this.state.ceSent,
      ceSentText: this.state.ceSent,
      tNoActs: this.state.calPick
        ? (en ? 'No activities that day.' : 'Ingen aktiviteter den dagen.')
        : (en ? 'Green days have activities, yellow rings are your own entries.' : 'Grønne dager har aktiviteter, gule ringer er dine egne oppføringer.'),
      summary: [
        {
          key: 'sm1',
          label: en ? 'Revenue year to date' : 'Inntekter hittil i år',
          value: kr(incomeNum * 8.4),
          chip: '+6,2 %',
          chipStyle: 'flex: 0 0 auto; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; background: rgba(116,205,133,.34); color: #16241a;',
          note: en ? 'vs last month' : 'mot forrige måned',
          cellStyle: 'padding: 22px 24px; border-right: 1px solid rgba(22,36,26,.1)'
        },
        {
          key: 'sm2',
          label: en ? 'Total members' : 'Medlemmer totalt',
          value: all ? '612' : (sel === 'vif' ? '284' : (sel === 'fana' ? '221' : '107')),
          chip: '+1,8 %',
          chipStyle: 'flex: 0 0 auto; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; background: rgba(116,205,133,.34); color: #16241a;',
          note: en ? 'vs last month' : 'mot forrige måned',
          cellStyle: 'padding: 22px 24px; border-right: 1px solid rgba(22,36,26,.1)'
        },
        {
          key: 'sm3',
          label: en ? 'Unpaid invoices' : 'Ubetalte fakturaer',
          value: String(dueCount),
          chip: outstandingVal,
          chipStyle: 'flex: 0 0 auto; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; background: rgba(124,77,207,.16); color: #5a2fa3;',
          note: en ? 'outstanding' : 'utestående',
          cellStyle: 'padding: 22px 24px'
        }
      ],
      donuts: [
        {
          key: 'dn-income',
          label: (en ? 'Income ' : 'Inntekter ') + pWord,
          total: ((n) => { const v = Math.abs(n); const sign = n < 0 ? '−' : ''; if (v >= 1e6) return sign + (v / 1e6).toFixed(1).replace('.', ',').replace(',0', '') + ' mill'; if (v >= 1000) return sign + Math.round(v / 1000) + 'k'; return sign + Math.round(v); })(incomeNum),
          full: kr(incomeNum),
          sub: 'kr',
          chip: onTf ? '' : incChip.text,
          chipStyle: onTf ? 'display: none' : incChip.style,
          note: onTf ? (tfInN + (en ? ' incoming transactions' : ' innbetalinger')) : (en ? 'vs budget ' : 'mot budsjett ') + kr(incomeBudget),
          slices: donutSlices(incomeCats),
          legend: donutLegend(incomeCats)
        },
        {
          key: 'dn-expense',
          label: (en ? 'Expenses ' : 'Utgifter ') + pWord,
          total: ((n) => { const v = Math.abs(n); const sign = n < 0 ? '−' : ''; if (v >= 1e6) return sign + (v / 1e6).toFixed(1).replace('.', ',').replace(',0', '') + ' mill'; if (v >= 1000) return sign + Math.round(v / 1000) + 'k'; return sign + Math.round(v); })(expenseNum),
          full: kr(expenseNum),
          sub: 'kr',
          chip: onTf ? '' : expChip.text,
          chipStyle: onTf ? 'display: none' : expChip.style,
          note: onTf ? (tfOutN + (en ? ' outgoing transactions' : ' utbetalinger')) : (en ? 'vs budget ' : 'mot budsjett ') + kr(expenseBudget),
          slices: donutSlices(expenseCats),
          legend: donutLegend(expenseCats)
        }
      ],
      tIncome: en ? 'Income this month' : 'Inntekter denne måneden',
      incomeVal: kr(incomeNum),
      incomeChip: incChip.text,
      incomeChipStyle: incChip.style,
      incomeNote: (en ? 'vs budget ' : 'mot budsjett ') + kr(incomeBudget),
      tExpense: en ? 'Expenses this month' : 'Utgifter denne måneden',
      expenseVal: kr(expenseNum),
      expenseChip: expChip.text,
      expenseChipStyle: expChip.style,
      expenseNote: (en ? 'vs budget ' : 'mot budsjett ') + kr(expenseBudget),
      tKpi: en ? 'Key figures' : 'Nøkkeltall',
      kpis: [
        { key: 'k1', label: en ? 'Profitability' : 'Lønnsomhet', value: marginPct === null ? '–' : marginPct + ' %', chip: marginPct === null ? (en ? 'no income' : 'ingen inntekt') : (marginPct >= 10 ? (en ? 'on target' : 'på mål') : (en ? 'below target' : 'under mål')), chipStyle: kpiChip(marginPct !== null && marginPct >= 10) },
        { key: 'k2', label: en ? 'Liquidity ratio' : 'Likviditetsgrad', value: '2,4', chip: en ? 'healthy' : 'sunn', chipStyle: kpiChip(true) },
        { key: 'k3', label: en ? 'Equity ratio' : 'Egenkapitalandel', value: '61 %', chip: en ? 'stable' : 'stabil', chipStyle: kpiChip(true) },
        { key: 'k4', label: en ? 'Fee collection rate' : 'Innbetalingsgrad kontingent', value: '94 %', chip: en ? 'watch' : 'følg opp', chipStyle: kpiChip(false) },
        { key: 'k5', label: en ? 'Cost per member' : 'Kostnad per medlem', value: kr(expenseNum / (all ? 612 : (sel === 'vif' ? 284 : (sel === 'fana' ? 221 : 107)))), chip: en ? 'down 4%' : 'ned 4 %', chipStyle: kpiChip(true) }
      ],
      tResult: en ? 'Result so far' : 'Resultat hittil',
      resultVal: kr(resultNum),
      tMargin: en ? 'Margin' : 'Margin',
      marginVal: marginPct === null ? '–' : marginPct + ' %',
      marginFill: Math.max(4, Math.min(100, (marginPct || 0) * 2)) + '%',
      tPending: en ? 'Pending payments' : 'Ventende betalinger',
      pendingTotal: kr(76400 * scale),
      pending: [
        { key: 'pd1', title: en ? 'Membership fee autumn' : 'Kontingent høst', meta: en ? '18 members · overdue 12 days' : '18 medlemmer · 12 dager forfalt', amount: kr(21400 * scale), tag: en ? 'overdue' : 'forfalt', kind: 'due' },
        { key: 'pd2', title: en ? 'Tournament fee, away teams' : 'Turneringsavgift, bortelag', meta: en ? 'Invoiced 6 Sep · due 20 Sep' : 'Fakturert 6. sep · forfall 20. sep', amount: kr(28000 * scale), tag: en ? 'due soon' : 'forfaller snart', kind: 'warn' },
        { key: 'pd3', title: en ? 'Sponsor instalment, Vestland Bygg' : 'Sponsoravdrag, Vestland Bygg', meta: en ? 'Agreed · due 1 Oct' : 'Avtalt · forfall 1. okt', amount: kr(20000 * scale), tag: en ? 'on schedule' : 'i rute', kind: 'ok' },
        { key: 'pd4', title: en ? 'Kit refund, supplier' : 'Refusjon drakter, leverandør', meta: en ? 'Credit note received' : 'Kreditnota mottatt', amount: kr(7000 * scale), tag: en ? 'processing' : 'behandles', kind: 'neutral' }
      ].map(p => ({ key: p.key, title: p.title, meta: p.meta, amount: p.amount, tag: p.tag, tagStyle: pill(p.kind) })),
      tExpenseStats: en ? 'Expense breakdown' : 'Utgiftsfordeling',
      expenseStatsNote: (en ? 'Season to date · ' : 'Hittil i sesongen · ') + kr(seasonNum),
      expenseBars: seasonCats.map((c, i) => ({
        key: 'eb' + i,
        label: c.label,
        value: kr(seasonNum * c.n / 100),
        share: c.n + ' %',
        fill: Math.round(c.n / seasonCats[0].n * 100) + '%',
        color: c.color
      })),
      tLatestSpend: en ? 'Latest spendings' : 'Siste utgifter',
      spendings: [
        { key: 'sp1', title: en ? 'Hall rent, September' : 'Halleie, september', meta: en ? 'Oslo municipality · 11 Sep' : 'Oslo kommune · 11. sep', amount: '− ' + kr(34000 * scale) },
        { key: 'sp2', title: en ? 'Match balls, 20 pcs' : 'Kampballer, 20 stk', meta: en ? 'Leangen Sport · 9 Sep' : 'Leangen Sport · 9. sep', amount: '− ' + kr(8400 * scale) },
        { key: 'sp3', title: en ? 'Bus, away cup' : 'Buss, bortecup', meta: en ? 'Nettbuss · 7 Sep' : 'Nettbuss · 7. sep', amount: '− ' + kr(12600 * scale) },
        { key: 'sp4', title: en ? 'Referee fees' : 'Dommerhonorar', meta: en ? 'Federation · 5 Sep' : 'Forbundet · 5. sep', amount: '− ' + kr(6200 * scale) },
        { key: 'sp5', title: en ? 'Kiosk restock' : 'Påfyll kiosk', meta: en ? 'Asko · 3 Sep' : 'Asko · 3. sep', amount: '− ' + kr(4800 * scale) }
      ],
      bandBg: 'transparent',
      bandInk: '#16241a',
      bandMuted: 'rgba(22,36,26,.75)',
      bandLine: 'rgba(22,36,26,.18)',
      bandBtnBg: '#ffffff',
      bandDecor: '0',
      showGreeting: tab === 'activities',
      showSectionTitle: tab !== 'activities' && tab !== 'daily' && tab !== 'depts' && tab !== 'roles' && tab !== 'booking' && tab !== 'timetable' && tab !== 'board' && tab !== 'sponsors' && tab !== 'members' && tab !== 'teamfund' && tab !== 'invoicing' && tab !== 'supplier' && tab !== 'budget' && tab !== 'integr' && tab !== 'comms' && tab !== 'planning' && tab !== 'docs' && tab !== 'volunteer' && tab !== 'profile',
      topRowStyle: (tab === 'roles' || tab === 'board' || tab === 'sponsors' || tab === 'members' || tab === 'teamfund' || tab === 'invoicing' || (tab === 'supplier' || tab === 'budget' || tab === 'integr' || tab === 'comms' || tab === 'planning' || tab === 'docs' || tab === 'volunteer') || tab === 'booking' || tab === 'daily') ? 'display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; justify-content: flex-end; height: 0; margin-top: ' + (tab === 'booking' ? '-71px' : '-51px') + '; position: relative; z-index: 5' : 'display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-end; justify-content: space-between',
      showBack: tab !== 'activities',
      goHome: () => this.setState({ tab: 'activities' }),
      crumbMb: tab === 'booking' ? '38px' : '18px',
      tCrumbLabel: en ? 'You are here' : 'Du er her',
      crumbParent: (() => { const k = Object.keys(menus).find(k => menus[k].subs.some(x => x.id === tab)); return k ? menus[k].label : ''; })(),
      crumbCurrent: (() => { const k = Object.keys(menus).find(k => menus[k].subs.some(x => x.id === tab)); if (k) return menus[k].subs.find(x => x.id === tab).label; if (tab === 'profile') return en ? 'My profile' : 'Min profil'; const t = tabs.find(x => x.id === tab); return t ? t.label : ''; })(),
      rows: rows,
      tPostsHeading: en ? 'Posts' : 'Innlegg',
      tNewPost: en ? '+ New post' : '+ Nytt innlegg',
      openPostCompose: () => this.setState({ compose: true, composeKind: 'post', composeDone: false, formTitle: '', formText: '' }),

      evQ: this.state.evQ || '', onEvQ: (e) => this.setState({ evQ: e.target.value, evPage: 1 }),
      tEvSearch: en ? 'Search events…' : 'Søk i aktiviteter …',
      tEvColumns: en ? 'Columns' : 'Kolonner', tEvColSearch: en ? 'Search' : 'Søk',
      tEvEmpty: en ? 'No events match.' : 'Ingen aktiviteter matcher.',
      evColsOpen: !!this.state.evColsOpen,
      toggleEvCols: () => this.setState(st => ({ evColsOpen: !st.evColsOpen, evColQ: '' })),
      closeEvCols: () => this.setState({ evColsOpen: false }),
      evColQ: this.state.evColQ || '', onEvColQ: (e) => this.setState({ evColQ: e.target.value }),
      evColOpts: evColDefs.filter(c => !evCq || c.label.toLowerCase().includes(evCq)).map(c => ({ key: 'eco' + c.id, label: c.label, on: !!evColsOn[c.id], toggle: () => this.setState(st => ({ evCols: Object.assign({}, evColsOn, { [c.id]: !evColsOn[c.id] }) })) })),
      evGrid: evVisCols.map(c => c.w).join(' '),
      evMinW: Math.max(420, evVisCols.length * 120) + 'px',
      evHead: evVisCols.map(c => ({ key: 'eh' + c.id, label: c.label, caret: evSort.k === c.id ? (evSort.dir === 1 ? '▲' : '▼') : '▾',
        style: 'border: 0; background: transparent; padding: 0; cursor: pointer; font: inherit; letter-spacing: inherit; text-transform: inherit; color: inherit; text-align: ' + (c.right ? 'right' : 'left'),
        sort: () => this.setState(st => ({ evSortS: { k: c.id, dir: (evSort.k === c.id && evSort.dir === 1) ? -1 : 1 }, evPage: 1 })) })),
      evRows: evPageRows.map(r => ({ key: 'er' + r.id, open: r.open,
        cells: evVisCols.map(c => ({ key: 'ec' + r.id + c.id, isIcon: c.id === 'type', isText: c.id !== 'type', icon: r.icon, text: c.id === 'type' ? r.typeLabel : r[c.id],
          style: 'min-width: 0; display: flex; align-items: center; ' + (c.id === 'title' ? 'font-family: var(--font-heading); font-weight: 800; font-size: 14px; ' : 'color: rgba(22,36,26,.85); ') + (c.right ? 'justify-content: flex-end; ' : '') + (c.id === 'type' ? '' : 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;') })) })),
      evShowing: evFiltered.length === acts.length ? (en ? 'Showing all ' + acts.length + ' rows.' : 'Viser alle ' + acts.length + ' rader.') : (en ? 'Showing ' + evFiltered.length + ' of ' + acts.length + ' rows.' : 'Viser ' + evFiltered.length + ' av ' + acts.length + ' rader.'),
      evEmpty: evFiltered.length === 0,
      evMulti: evFiltered.length > 0,
      tEvPer: en ? 'Events per page' : 'Aktiviteter per side',
      evPer: String(evPerPage),
      onEvPer: (e) => this.setState({ evPer: parseInt(e.target.value, 10), evPage: 1, evAllRows: false }),
      evPerOpts: [15, 25, 50, 100, 250].map(v => ({ key: 'epo' + v, v: v })),
      evRange: evShowAll ? (en ? 'Showing all ' + evFiltered.length + ' per page' : 'Viser alle ' + evFiltered.length + ' per side') : (en ? 'Showing ' + ((evPageN - 1) * evPerPage + 1) + '–' + Math.min(evPageN * evPerPage, evFiltered.length) + ' of ' + evFiltered.length + ' · ' + evPerPage + ' per page' : 'Viser ' + ((evPageN - 1) * evPerPage + 1) + '–' + Math.min(evPageN * evPerPage, evFiltered.length) + ' av ' + evFiltered.length + ' · ' + evPerPage + ' per side'),
      evPages: (() => {
        const n = evPageCount, cur = evPageN;
        const btn = (key, label, go, on, dis, wide) => ({ key: key, label: label, go: dis ? () => {} : go, aria: label,
          style: 'min-width: ' + (wide ? '72px' : '36px') + '; height: 36px; padding: 0 10px; border-radius: 8px; font-family: var(--font-heading); font-weight: 800; font-size: 13px; border: 1px solid ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.14)') + '; background: ' + (on ? '#1f7a3a' : '#ffffff') + '; color: ' + (on ? '#ffffff' : '#16241a') + '; cursor: ' + (dis ? 'default' : 'pointer') + '; opacity: ' + (dis ? '.4' : '1') + '; box-shadow: ' + (on ? 'none' : '0 1px 2px rgba(22,36,26,.08)') });
        const out = [btn('ep-first', '«', () => this.setState({ evPage: 1, evAllRows: false }), false, cur === 1 && !evShowAll)];
        let nums = [];
        if (n <= 7) { for (let i = 1; i <= n; i++) nums.push(i); }
        else if (cur <= 4) nums = [1, 2, 3, 4, 5, '…', n];
        else if (cur >= n - 3) nums = [1, '…', n - 4, n - 3, n - 2, n - 1, n];
        else nums = [1, '…', cur - 1, cur, cur + 1, '…', n];
        nums.forEach((v, i) => {
          if (v === '…') out.push({ key: 'ep-dots' + i, label: '…', go: () => {}, aria: '', style: 'min-width: 24px; height: 36px; display: grid; place-items: center; border: 0; background: transparent; color: rgba(22,36,26,.6); font-weight: 800' });
          else out.push(btn('ep' + v, String(v), () => this.setState({ evPage: v, evAllRows: false }), !evShowAll && v === cur, false));
        });
        out.push(btn('ep-all', en ? 'Show all' : 'Vis alle', () => this.setState(st => ({ evAllRows: !st.evAllRows, evPage: 1 })), evShowAll, false, true));
        out.push(btn('ep-last', '»', () => this.setState({ evPage: n, evAllRows: false }), false, cur === n && !evShowAll));
        return out;
      })(),
      activities: acts.map(a => {
        const yes = Object.keys(a.answers || {}).filter(k => (a.answers || {})[k] === 'yes').length;
        const signedN = (a.members && a.members.length) ? yes : a.signed;
        const full = signedN >= a.cap;
        return {
          key: 'ac' + a.id,
          open: () => this.setState({ event: a.id, answerFilter: 'all' }),
          day: String(a.day),
          month: en ? shortEn[a.m - 1] : shortNo[a.m - 1],
          title: a.title,
          meta: (all ? clubOf(a.club) + ' · ' : '') + a.place + ' · ' + a.time,
          tag: full ? (en ? 'full' : 'fullt') : (en ? 'open' : 'åpen'),
          tagStyle: 'flex: 0 0 auto; padding: 7px 13px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap; '
            + (full ? 'background: rgba(22,36,26,.1); color: rgba(22,36,26,.78);' : 'background: rgba(116,205,133,.32); color: #16241a;'),
          fill: Math.min(100, Math.round(signedN / a.cap * 100)) + '%',
          signed: signedN + ' / ' + a.cap + (en ? ' signed up' : ' påmeldt'),
          leader: (en ? 'Led by ' : 'Ledes av ') + a.leader + ((a.files && a.files.length) ? ' · 📎 ' + a.files.length + (en ? (a.files.length === 1 ? ' attachment' : ' attachments') : ' vedlegg') : '')
        };
      }),

      posts: posts.map(p => ({
        key: 'po' + p.id,
        club: clubOf(p.club),
        when: p.when,
        title: p.title,
        text: p.text,
        flag: p.high ? (en ? 'High priority' : 'Høy prioritet') : (en ? 'Normal' : 'Normal'),
        flagStyle: 'flex: 0 0 auto; padding: 6px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; '
          + (p.high ? 'background: rgba(255,201,74,.34); color: #7a5406;' : 'background: rgba(22,36,26,.08); color: rgba(22,36,26,.75);'),
        meta: p.reads + (en ? ' reads · ' : ' lest · ') + p.comments + (en ? ' comments' : ' kommentarer')
      })),

      members: memList.map((m) => ({
        key: 'me' + m.id,
        name: m.name,
        initials: m.name.split(/\s+/).slice(0, 2).map(x => x.slice(0, 1)).join(''),
        meta: (all ? clubOf(m.club) + ' · ' : '') + m.group + ' · ' + m.role,
        due: m.due > 0 ? (m.due + (en ? ' unpaid' : ' ubetalt')) : (en ? 'up to date' : 'à jour'),
        open: () => this.setState({ member: m.id }),
        dueStyle: 'flex: 0 0 auto; padding: 7px 13px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap; '
          + (m.due > 0 ? 'background: #7c4dcf; color: #ffffff;' : 'background: rgba(116,205,133,.3); color: #16241a;')
      })),
      noMembers: memList.length === 0,
      tNoMembers: en ? 'No members match that search.' : 'Ingen medlemmer passer søket.',
      memQ: this.state.memQ,
      onMemQ: (e) => this.setState({ memQ: e.target.value, bulkSms: 0, bulkSmsAt: '' }),
      tSearchMembers: en ? 'Search members…' : 'Søk etter medlemmer …',
      tInvoice: en ? 'Send invoice' : 'Send faktura',
      tInvoiceNote: en ? 'Choose the whole club, one training group, or a single member.' : 'Velg hele klubben, én treningsgruppe eller ett enkelt medlem.',
      invScopes: [
        { key: 'is1', id: 'club', name: en ? 'Whole club' : 'Hele klubben' },
        { key: 'is2', id: 'group', name: en ? 'Training group' : 'Treningsgruppe' },
        { key: 'is4', id: 'event', name: en ? 'Event participants' : 'Påmeldte til aktivitet' },
        { key: 'is3', id: 'person', name: en ? 'Single member' : 'Enkeltmedlem' }
      ],
      showGroupFilter: tab === 'members' && !all && groupOptions.length > 0,
      tGroupFilter: en ? 'Group / event' : 'Gruppe / aktivitet',
      groupTabs: [{ id: 'all', name: en ? 'Everyone' : 'Alle', key: 'gfall' }].concat(groupOptions).map(g => ({
        key: g.key,
        label: g.name,
        pick: () => this.setState({ memGroup: g.id, bulkSms: 0, bulkSmsAt: '' }),
        style: chip(memGroup === g.id, false)
      })),
      tMsgBox: en ? 'Message members' : 'Send melding',
      msgBoxNote: en ? 'Goes straight to the members inbox in Kretz.' : 'Går rett til medlemmenes innboks i Kretz.',
      msgTargets: [{ key: 'mt-club', id: 'club', name: all ? (en ? 'All clubs' : 'Alle klubber') : clubOf(sel) }]
        .concat(all ? [] : this.groupsOf(sel, en).map((g, i) => ({ key: 'mt' + i, id: 'g:' + g, name: g })))
        .concat(all ? [] : allActs.filter(a => a.club === sel).map(a => ({ key: 'mte' + a.id, id: 'e:' + a.id, name: (en ? 'Signed up: ' : 'Påmeldte: ') + a.title }))),
      msgTo: this.state.msgTo,
      onMsgTo: (e) => this.setState({ msgTo: e.target.value }),
      msgText: this.state.msgText,
      onMsgText: (e) => this.setState({ msgText: e.target.value }),
      tMsgPh: en ? 'Write a message to the members…' : 'Skriv en melding til medlemmene …',
      tSendMsg: en ? 'Send message' : 'Send melding',
      sendMsg: (e) => {
        e.preventDefault();
        const txt = this.state.msgText.trim();
        if (!txt) return;
        const target = this.state.msgTo;
        const name = target === 'club'
          ? (all ? (en ? 'All clubs' : 'Alle klubber') : clubOf(sel))
          : (target.indexOf('g:') === 0
            ? target.slice(2)
            : ((en ? 'Signed up: ' : 'Påmeldte: ') + ((allActs.find(a => a.id === target.slice(2)) || {}).title || '')));
        this.setState(st => ({
          sentMsgs: [{ to: name, when: en ? 'just now' : 'akkurat nå', text: txt }].concat(st.sentMsgs),
          msgText: ''
        }));
      },
      sentMsgs: this.state.sentMsgs.map((m, i) => ({ key: 'sm' + i, to: m.to, when: m.when, text: m.text })),
      tBulkSms: en ? 'SMS reminder to everyone unpaid' : 'SMS-påminnelse til alle ubetalte',
      bulkSmsNote: (this.state.bulkSmsAt === bulkKey && this.state.bulkSms > 0)
        ? (en
          ? 'Reminder sent to ' + this.state.bulkSms + (this.state.bulkSms === 1 ? ' member.' : ' members.')
          : 'Påminnelse sendt til ' + this.state.bulkSms + (this.state.bulkSms === 1 ? ' medlem.' : ' medlemmer.'))
        : (en
          ? unpaidList.length + (unpaidList.length === 1 ? ' member has' : ' members have') + ' unpaid invoices in this selection'
          : unpaidList.length + (unpaidList.length === 1 ? ' medlem har' : ' medlemmer har') + ' ubetalt i dette utvalget'),
      sendBulkSms: () => this.setState({ bulkSms: unpaidList.length, bulkSmsAt: bulkKey }),
      invScope: this.state.invScope,
      onInvScope: (e) => this.setState({ invScope: e.target.value, invTarget: defaultTarget(e.target.value), invSent: false }),
      invTargets: invTargets,
      invTarget: this.state.invTarget,
      onInvTarget: (e) => this.setState({ invTarget: e.target.value, invSent: false }),
      invTitle: this.state.invTitle,
      onInvTitle: (e) => this.setState({ invTitle: e.target.value, invSent: false }),
      invAmount: this.state.invAmount,
      onInvAmount: (e) => this.setState({ invAmount: e.target.value, invSent: false }),
      invDue: this.state.invDue,
      onInvDue: (e) => this.setState({ invDue: e.target.value, invSent: false }),
      tInvTitlePh: en ? 'What is it for' : 'Hva gjelder det',
      tInvAmountPh: en ? 'Amount in NOK' : 'Beløp i NOK',
      tSendInvoice: en ? 'Send invoice' : 'Send faktura',
      invRecipients: invCount + (en ? (invCount === 1 ? ' recipient' : ' recipients') : (invCount === 1 ? ' mottaker' : ' mottakere')),
      invSent: this.state.invSent,
      invSentText: en ? ('Invoice sent to ' + invCount + (invCount === 1 ? ' member.' : ' members.')) : ('Faktura sendt til ' + invCount + (invCount === 1 ? ' medlem.' : ' medlemmer.')),
      ...this.adminInvVals({ en, all, sel, keep, invTargets, invCount, scope, invClub, clubOf, allActs, defaultTarget }),

      memberOpen: !!openMem,
      closeMember: () => this.setState({ member: '', smsSent: '' }),
      memName: openMem ? openMem.name : '',
      memInitials: openMem ? openMem.name.split(/\s+/).slice(0, 2).map(x => x.slice(0, 1)).join('') : '',
      memMeta: openMem ? (clubOf(openMem.club) + ' · ' + openMem.group + ' · ' + openMem.role) : '',
      memStats: openMem ? [
        { key: 'ms1', label: en ? 'Attendance' : 'Oppmøte', value: openMem.att + (en ? ' sessions' : ' økter') },
        { key: 'ms2', label: en ? 'Club average' : 'Snitt i klubben', value: openMem.avg + (en ? ' sessions' : ' økter') },
        { key: 'ms3', label: en ? 'vs average' : 'Mot snittet', value: (openMem.att >= openMem.avg ? '+' : '−') + Math.abs(Math.round((openMem.att - openMem.avg) / openMem.avg * 100)) + ' %' },
        { key: 'ms4', label: en ? 'Unpaid' : 'Ubetalt', value: openMem.due > 0 ? String(openMem.due) : (en ? 'none' : 'ingen') }
      ] : [],
      memPeriods: [
        { key: 'mp1', id: 'week', name: en ? 'Weekly' : 'Ukentlig' },
        { key: 'mp2', id: 'month', name: en ? 'Monthly' : 'Månedlig' },
        { key: 'mp3', id: 'year', name: en ? 'Yearly' : 'Årlig' }
      ],
      memPeriod: this.state.memPeriod,
      onMemPeriod: (e) => this.setState({ memPeriod: e.target.value }),
      tAttendance: en ? 'Attendance vs club average' : 'Oppmøte mot klubbsnittet',
      tClubAvg: en ? 'Club average' : 'Snitt i klubben',
      tYAxis: en ? 'sessions attended' : 'økter møtt opp på',
      tInvoiceMember: en ? 'Invoice this member' : 'Fakturer dette medlemmet',
      invoiceThisMember: () => { this.setState({ member: '', tab: 'invoicing', invScope: 'person', invTarget: this.state.member, invSent: false }); window.scrollTo({ top: 0, behavior: 'smooth' }); },
      chartGrid: chart.grid,
      chartYTicks: chart.yTicks,
      chartXTicks: chart.xTicks,
      memPath: chart.memPath,
      avgPath: chart.avgPath,
      memArea: chart.memArea,
      avgArea: chart.avgArea,
      memDots: chart.memDots,
      hasDue: !!(openMem && openMem.due > 0),
      tUnpaid: en ? 'Unpaid invoices' : 'Ubetalte fakturaer',
      dueBadge: openMem && openMem.due > 0 ? (openMem.due + (en ? (openMem.due === 1 ? ' invoice' : ' invoices') : (openMem.due === 1 ? ' faktura' : ' fakturaer'))) : '',
      dueInvoices: (openMem && openMem.due > 0 ? [
        { title: en ? 'Membership fee autumn 2026' : 'Kontingent høst 2026', due: en ? 'Due 30 Sep 2026 · 12 days overdue' : 'Forfall 30. sep 2026 · 12 dager på overtid', amount: 'kr 1 200', tag: en ? 'overdue' : 'forfalt', kind: 'due' },
        { title: en ? 'Tournament fee, Hamar Cup' : 'Turneringsavgift, Hamar Cup', due: en ? 'Due 1 Oct 2026' : 'Forfall 1. okt 2026', amount: 'kr 650', tag: en ? 'due soon' : 'forfaller snart', kind: 'warn' }
      ].slice(0, openMem.due) : []).map((d, i) => ({
        key: 'di' + i, title: d.title, due: d.due, amount: d.amount, tag: d.tag, tagStyle: pill(d.kind)
      })),
      tSendSms: en ? 'Send SMS reminder' : 'Send SMS-påminnelse',
      smsSent: !!(openMem && this.state.smsSent === openMem.id),
      smsSentText: openMem
        ? (en ? 'Reminder sent to ' + (openMem.phone || (openMem.guardians && openMem.guardians[0] ? openMem.guardians[0].phone : '')) : 'Påminnelse sendt til ' + (openMem.phone || (openMem.guardians && openMem.guardians[0] ? openMem.guardians[0].phone : '')))
        : '',
      sendSms: () => { if (openMem) this.setState({ smsSent: openMem.id }); },
      hoverZones: labels.map((l, i) => ({
        key: 'hz' + i,
        enter: () => this.setState({ hover: i }),
        leave: () => this.setState({ hover: -1 }),
        style: 'position: absolute; top: 0; bottom: 14%; left: ' + ((px(i) - zoneW / 2) / 520 * 100).toFixed(2) + '%; width: ' + (zoneW / 520 * 100).toFixed(2) + '%; cursor: crosshair'
      })),
      hoverOn: hoverIdx >= 0,
      hoverLabel: hoverIdx >= 0 ? labels[hoverIdx] : '',
      hoverMem: hoverIdx >= 0 ? (memSeries[hoverIdx] + (en ? ' sessions' : ' økter')) : '',
      hoverAvg: hoverIdx >= 0 ? ((en ? 'avg ' : 'snitt ') + avgSeries[hoverIdx] + (en ? ' sessions' : ' økter')) : '',
      hoverStyle: hoverIdx >= 0
        ? 'position: absolute; z-index: 3; pointer-events: none; left: ' + (px(hoverIdx) / 520 * 100).toFixed(2) + '%; top: ' + (py(memSeries[hoverIdx]) / 260 * 100).toFixed(2) + '%; transform: translate(' + (hoverIdx > labels.length / 2 ? '-108%' : '8%') + ', -118%); background: #16241a; color: #f6f8f3; border-radius: 16px; padding: 10px 13px; box-shadow: 0 14px 30px rgba(22,36,26,.3); white-space: nowrap'
        : 'display: none',
      hoverDotStyle: hoverIdx >= 0
        ? 'position: absolute; z-index: 2; pointer-events: none; width: 12px; height: 12px; border-radius: 999px; background: #1f7a3a; border: 2.5px solid #ffffff; box-shadow: 0 4px 10px rgba(22,36,26,.3); left: ' + (px(hoverIdx) / 520 * 100).toFixed(2) + '%; top: ' + (py(memSeries[hoverIdx]) / 260 * 100).toFixed(2) + '%; transform: translate(-50%, -50%)'
        : 'display: none',
      tProfile: en ? 'Profile' : 'Profil',
      memProfile: openMem ? [
        { key: 'pf1', label: en ? 'Name' : 'Navn', value: openMem.name },
        { key: 'pf2', label: en ? 'Date of birth' : 'Fødselsdato', value: openMem.born + ' (' + openMem.age + (en ? ' yrs)' : ' år)') },
        { key: 'pf3', label: en ? 'Phone' : 'Telefon', value: openMem.phone || (en ? 'via guardian' : 'via foresatt') },
        { key: 'pf4', label: en ? 'Email' : 'E-post', value: openMem.email || (en ? 'via guardian' : 'via foresatt') },
        { key: 'pf5', label: en ? 'Address' : 'Adresse', value: openMem.address }
      ] : [],
      hasGuardians: !!(openMem && openMem.age < 16 && openMem.guardians && openMem.guardians.length),
      tGuardians: en ? 'Guardians' : 'Foresatte',
      guardians: (openMem && openMem.age < 16 && openMem.guardians ? openMem.guardians : []).map(g => ({
        key: 'gd' + g.id,
        name: g.name,
        relation: g.relation,
        initials: g.name.split(/\s+/).slice(0, 2).map(x => x.slice(0, 1)).join(''),
        open: () => this.setState({ guardian: g.id })
      })),
      guardianOpen: !!openGuardian,
      closeGuardian: () => this.setState({ guardian: '' }),
      guardianName: openGuardian ? openGuardian.name : '',
      guardianRelation: openGuardian ? openGuardian.relation : '',
      guardianInitials: openGuardian ? openGuardian.name.split(/\s+/).slice(0, 2).map(x => x.slice(0, 1)).join('') : '',
      guardianFields: openGuardian ? [
        { key: 'gf1', label: en ? 'Date of birth' : 'Fødselsdato', value: openGuardian.born },
        { key: 'gf2', label: en ? 'Phone' : 'Telefon', value: openGuardian.phone },
        { key: 'gf3', label: en ? 'Email' : 'E-post', value: openGuardian.email }
      ] : [],
      tNotes: en ? 'Internal notes' : 'Interne notater',
      tNotesPrivate: en ? 'Not visible to the member' : 'Ikke synlig for medlemmet',
      tNoNotes: en ? 'No notes yet.' : 'Ingen notater ennå.',
      tNotePh: en ? 'Write a note about progress…' : 'Skriv et notat om utvikling …',
      tAddNote: en ? 'Save note' : 'Lagre notat',
      memNotes: noteList,
      noNotes: noteList.length === 0,
      noteDraft: this.state.noteDraft,
      onNoteDraft: (e) => this.setState({ noteDraft: e.target.value }),
      addNote: (e) => {
        e.preventDefault();
        const txt = this.state.noteDraft.trim();
        if (!txt || !openMem) return;
        const id = openMem.id;
        this.setState(st => {
          const n = Object.assign({}, st.notes);
          n[id] = (n[id] || []).concat([{ from: 'Sigrid A.', when: en ? 'just now' : 'akkurat nå', text: txt }]);
          return { notes: n, noteDraft: '' };
        });
      },

      tOutstanding: en ? 'Outstanding fees' : 'Utestående kontingent',
      outstanding: outstandingVal,
      outstandingNote: en
        ? (dueCount === 0 ? 'No invoices past due — everything is settled' : dueCount + (dueCount === 1 ? ' invoice' : ' invoices') + ' past due — reminders go out Monday')
        : (dueCount === 0 ? 'Ingen fakturaer forfalt — alt er oppgjort' : dueCount + (dueCount === 1 ? ' faktura' : ' fakturaer') + ' forfalt — purring sendes mandag'),
      tTodo: en ? 'Needs your attention' : 'Krever handling',
      todos: [
        { key: 't1', title: en ? 'Approve four new members' : 'Godkjenn fire nye medlemmer', meta: en ? 'Waiting since 9 September' : 'Venter siden 9. september' },
        { key: 't2', title: en ? 'Tournament shifts half filled' : 'Turneringsvakter halvfylte', meta: en ? '5 of 12 shifts signed up' : '5 av 12 vakter påmeldt' },
        { key: 't3', title: en ? 'Grant report due 1 October' : 'Søknadsfrist støtte 1. oktober', meta: en ? 'Numbers ready for export' : 'Tallene er klare for eksport' }
      ],

      composeOpen: this.state.compose,
      isActivity: this.state.composeKind !== 'post',
      isPost: this.state.composeKind === 'post',
      composeTitle: this.state.composeKind === 'post' ? (en ? 'New post' : 'Nytt innlegg') : (en ? 'New activity' : 'Ny aktivitet'),
      composeNote: this.state.composeKind === 'post'
        ? (en ? 'Published to every member of the chosen club.' : 'Publiseres til alle medlemmer i valgt klubb.')
        : (en ? 'Members can sign up as soon as you publish.' : 'Medlemmene kan melde seg på så snart du publiserer.'),
      composeCta: this.state.composeKind === 'post' ? (en ? 'Publish post' : 'Publiser innlegg') : (en ? 'Publish activity' : 'Publiser aktivitet'),
      composeDone: this.state.composeDone,
      composeDoneText: this.state.composeKind === 'post'
        ? (en ? 'Published — members can see it now.' : 'Publisert — medlemmene ser det nå.')
        : (en ? 'Published — sign-up is open.' : 'Publisert — påmeldingen er åpen.'),
      tClose: en ? 'Close' : 'Lukk',
      openCompose: () => this.setState({ compose: true, composeKind: 'activity', composeDone: false, formTitle: '', formText: '', formPlace: '', formLeader: '' }),
      closeCompose: () => this.setState({ compose: false }),
      inputStyle: inputStyle,
      inputStyleWhite: inputStyle.replace('background: #f4f8f2', 'background: #ffffff'),
      areaStyle: inputStyle + '; resize: none; line-height: 1.6',
      formClubs: clubs.map(c => ({ key: 'fc' + c.id, id: c.id, name: c.name })),
      formClub: this.state.formClub,
      onFormClub: (e) => this.setState({ formClub: e.target.value }),
      formTitle: this.state.formTitle,
      onFormTitle: (e) => this.setState({ formTitle: e.target.value, composeDone: false }),
      formDate: this.state.formDate,
      onFormDate: (e) => this.setState({ formDate: e.target.value }),
      formTime: this.state.formTime,
      onFormTime: (e) => this.setState({ formTime: e.target.value }),
      formPlace: this.state.formPlace,
      onFormPlace: (e) => this.setState({ formPlace: e.target.value }),
      formLeader: this.state.formLeader,
      onFormLeader: (e) => this.setState({ formLeader: e.target.value }),
      formCap: this.state.formCap,
      onFormCap: (e) => this.setState({ formCap: e.target.value }),
      formText: this.state.formText,
      onFormText: (e) => this.setState({ formText: e.target.value, composeDone: false }),
      formHigh: this.state.formHigh,
      onFormHigh: (e) => this.setState({ formHigh: e.target.checked }),
      tRecipients: en ? 'Send to' : 'Send til',
      recipientOptions: recipientOptions,
      recipientNote: this.state.formTo.length
        ? (en ? 'Goes to ' + this.state.formTo.length + (this.state.formTo.length === 1 ? ' group/member' : ' groups/members') : 'Sendes til ' + this.state.formTo.length + (this.state.formTo.length === 1 ? ' gruppe/medlem' : ' grupper/medlemmer'))
        : (en ? 'Pick at least one group or member' : 'Velg minst én gruppe eller ett medlem'),
      eventSlotId: 'event-new',
      tDropPhoto: en ? 'Drop a photo for the event' : 'Slipp inn et bilde til aktiviteten',
      tAnswerBy: en ? 'Answer by' : 'Svarfrist',
      formDeadline: this.state.formDeadline,
      onFormDeadline: (e) => this.setState({ formDeadline: e.target.value }),
      tInternalText: en ? 'Internal note' : 'Intern tekst',
      tAdminsOnly: en ? 'Admins only' : 'Kun for admin',
      tInternalPh: en ? 'Only visible to administrators…' : 'Kun synlig for administratorer …',
      formInternal: this.state.formInternal,
      onFormInternal: (e) => this.setState({ formInternal: e.target.value }),

      eventOpen: !!openEvent,
      closeEvent: () => this.setState({ event: '', answerFilter: 'all' }),
      eventTitle: openEvent ? openEvent.title : '',
      eventMeta: openEvent ? (clubOf(openEvent.club) + ' · ' + openEvent.place + ' · ' + openEvent.day + '.' + openEvent.m + ' ' + openEvent.time) : '',
      eventHasPhoto: true,
      eventPhotoId: openEvent ? 'event-' + openEvent.id : 'event-none',
      eventStats: openEvent ? [
        { key: 'es1', label: en ? 'Coming' : 'Kommer', value: yesCount + ' / ' + openEvent.cap },
        { key: 'es2', label: en ? 'Sent to' : 'Sendt til', value: (openEvent.to || []).join(', ') || clubOf(openEvent.club) },
        { key: 'es3', label: en ? 'Answer by' : 'Svarfrist', value: openEvent.deadline || '—' }
      ] : [],
      eventHasInternal: !!(openEvent && openEvent.internal),
      eventInternal: openEvent ? openEvent.internal : '',
      tAnswers: en ? 'Who has answered' : 'Hvem har svart',
      eventAnswers: eventAnswers,
      answersEmpty: eventAnswers.length === 0,
      tNoAnswers: en ? 'Nobody in this category yet.' : 'Ingen i denne kategorien ennå.',
      answerFilters: [
        { id: 'all', label: en ? 'All' : 'Alle' },
        { id: 'yes', label: en ? 'Coming' : 'Kommer' },
        { id: 'no', label: en ? 'Cannot' : 'Kan ikke' },
        { id: 'none', label: en ? 'No answer' : 'Ikke svart' }
      ].map(f => ({
        key: 'af' + f.id,
        label: f.label + ' (' + answerCounts[f.id] + ')',
        pick: () => this.setState({ answerFilter: f.id }),
        style: 'cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12px; padding: 7px 13px; border-radius: 999px; white-space: nowrap; transition: background .3s, color .3s, border-color .3s;'
          + (this.state.answerFilter === f.id
            ? ' background: #16241a; border: 1px solid #16241a; color: #f6f8f3;'
            : ' background: #ffffff; border: 1px solid rgba(22,36,26,.16); color: #16241a;')
      })),
      tTitlePh: en ? 'Title' : 'Tittel',
      tPlacePh: en ? 'Place' : 'Sted',
      tLeaderPh: en ? 'Who leads it' : 'Hvem leder den',
      tCapPh: en ? 'Max participants' : 'Maks antall',
      tTextPh: en ? 'Write the details members should read…' : 'Skriv det medlemmene skal lese …',
      tHighPriority: en ? 'Mark as high priority' : 'Merk som høy prioritet',
      submitCompose: (e) => {
        e.preventDefault();
        const isPost = this.state.composeKind === 'post';
        if (isPost) {
          this.setState(st => ({
            newPosts: [{
              id: 'np' + Date.now(), club: st.formClub, high: st.formHigh,
              when: en ? 'just now' : 'akkurat nå', title: st.formTitle, text: st.formText,
              reads: 0, comments: 0
            }].concat(st.newPosts),
            composeDone: true, postsOpen: true, formTitle: '', formText: '', formHigh: false
          }));
          return;
        }
        const d = this.state.formDate.split('-');
        this.setState(st => ({
          newActs: st.newActs.concat([{
            id: 'na' + Date.now(), club: st.formClub,
            m: parseInt(d[1], 10) || 9, day: parseInt(d[2], 10) || 20,
            time: st.formTime, title: st.formTitle, place: st.formPlace,
            leader: st.formLeader, cap: parseInt(st.formCap, 10) || 20, signed: 0,
            members: expandTo(st.formTo, st.formClub),
            answers: {}, to: labelTo(st.formTo, st.formClub), deadline: fmtDate(st.formDeadline), internal: st.formInternal, files: (st.formFiles || []).slice()
          }]),
          composeDone: true, actsOpen: true, formTitle: '', formText: '', formPlace: '', formLeader: '', formFiles: []
        }));
      }
    };
  }
}
