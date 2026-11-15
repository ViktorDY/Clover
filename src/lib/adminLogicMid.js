// Admin portal logic ported from the November design (Kretz Admin.dc.html,
// logic class lines ~4280–6120). These methods are mixed into AdminLogic's
// prototype at the bottom of src/lib/adminLogic.js, so `this` is the
// controller (this.state / this.setState) exactly as in the design.
/* eslint-disable no-unused-vars -- kept as in the design logic */

export const midMethods = {
  // ---- Dokumenter: folder grid, folder tree with subfolders, search ----
  adminDocsVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]), set = (o) => this.setState(o);
    const FOLDERS = [
      { id: 'board', name: en ? 'Board meetings' : 'Styremøter', who: en ? 'Board' : 'Styret', color: '#5fb36a', front: '#8BCB8B' },
      { id: 'agm', name: en ? 'Annual meeting' : 'Årsmøte', who: en ? 'Members' : 'Medlemmer', color: '#2f8a5a', front: '#6cc49a' },
      { id: 'contract', name: en ? 'Agreements' : 'Avtaler', who: en ? 'Board' : 'Styret', color: '#e0a100', front: '#FFD23F' },
      { id: 'grant', name: en ? 'Grants and funding' : 'Søknader og støtte', who: en ? 'Board' : 'Styret', color: '#5b8fd1', front: '#9cc0ee' },
      { id: 'acc', name: en ? 'Accounts and reports' : 'Regnskap og rapporter', who: en ? 'Board and auditors' : 'Styret og kontrollutvalg', color: '#d9667c', front: '#f2a7b5' },
      { id: 'law', name: en ? 'Statutes and rules' : 'Vedtekter og lover', who: en ? 'Everyone' : 'Alle', color: '#9aa596', front: '#c9d1c6' }
    ];
    const base = [
      { id: 'd1', club: 'vif', name: 'Vedtekter 2026.pdf', f: 'law', by: 'Sigrid Andersen', when: '2026-01-12', kb: 214 },
      { id: 'd2', club: 'vif', name: 'Referat styremøte september.pdf', f: 'board-2026', by: 'Silje Aas', when: '2026-09-18', kb: 96 },
      { id: 'd2b', club: 'vif', name: 'Sakliste styremøte oktober.docx', f: 'board-2026', by: 'Silje Aas', when: '2026-10-06', kb: 48 },
      { id: 'd2c', club: 'vif', name: 'Referat styremøte oktober.pdf', f: 'board-2026', by: 'Silje Aas', when: '2026-10-09', kb: 102 },
      { id: 'd3', club: 'vif', name: 'Regnskap 2025.xlsx', f: 'acc-arsr', by: 'Marit Sunde', when: '2026-03-02', kb: 388 },
      { id: 'd3b', club: 'vif', name: 'Kontrollutvalgets beretning 2025.pdf', f: 'acc', by: 'Marit Sunde', when: '2026-03-04', kb: 142 },
      { id: 'd3c', club: 'vif', name: 'Søknad ungdomsfond.docx', f: 'grant', by: 'Ida Krogh', when: '2026-09-28', kb: 64 },
      { id: 'd3d', club: 'vif', name: 'Innkalling årsmøte 2026.pdf', f: 'agm', by: 'Sigrid Andersen', when: '2026-02-20', kb: 88 },
      { id: 'd4', club: 'fana', name: 'Sponsoravtale Sparebanken.pdf', f: 'contract-spons', by: 'Jonas Eide', when: '2026-02-20', kb: 540 },
      { id: 'd5', club: 'fana', name: 'Referat årsmøte.pdf', f: 'agm', by: 'Hanne Vik', when: '2026-03-14', kb: 172 },
      { id: 'd5b', club: 'fana', name: 'Momskompensasjon 2026.pdf', f: 'grant', by: 'Hanne Vik', when: '2026-06-01', kb: 210 },
      { id: 'd6', club: 'varden', name: 'Halleieavtale Vardenhallen.pdf', f: 'contract-hall', by: 'Ola Berg', when: '2026-01-30', kb: 305 },
      { id: 'd7', club: 'varden', name: 'Budsjett 2026.xlsx', f: 'acc-budget', by: 'Kari Moe', when: '2026-01-08', kb: 121 },
      { id: 'd8', club: 'varden', name: 'Lov for Varden BTK.pdf', f: 'law', by: 'Ola Berg', when: '2025-03-20', kb: 190 },
      { id: 'd9', club: 'vif', name: 'Referat styremøte juni 2025.pdf', f: 'board-2025', by: 'Silje Aas', when: '2025-06-12', kb: 91 },
      { id: 'd9b', club: 'vif', name: 'Budsjett 2027 utkast.xlsx', f: 'board-2026', by: 'Marit Sunde', when: '2026-11-02', kb: 88 }
    ];
    const SUB0 = [
      { id: 'board-2026', parent: 'board', name: en ? 'Meetings 2026' : 'Møter 2026' }, { id: 'board-2025', parent: 'board', name: en ? 'Meetings 2025' : 'Møter 2025' },
      { id: 'acc-arsr', parent: 'acc', name: en ? 'Annual accounts' : 'Årsregnskap' }, { id: 'acc-budget', parent: 'acc', name: en ? 'Budgets' : 'Budsjett' },
      { id: 'contract-spons', parent: 'contract', name: en ? 'Sponsors' : 'Sponsorer' }, { id: 'contract-hall', parent: 'contract', name: en ? 'Halls and facilities' : 'Haller og anlegg' }
    ];
    const subs = SUB0.concat(v('dcSubs', []));
    const nodeOf = (id) => FOLDERS.find(x => x.id === id) || subs.find(x => x.id === id) || null;
    const parentOf = (id) => { const s = subs.find(x => x.id === id); return s ? s.parent : null; };
    const kids = (id) => subs.filter(x => x.parent === id);
    const descIds = (id) => { const out = [id]; kids(id).forEach(k => descIds(k.id).forEach(z => out.push(z))); return out; };
    const chainOf = (id) => { const out = []; let k = id, g = 0; while (k && g++ < 30) { const n = nodeOf(k); if (!n) break; out.unshift(n); k = parentOf(k); } return out; };
    const folder = v('dcFolder', ''), q = (v('dcQ', '') || '').trim().toLowerCase(), del = v('dcDel', {});
    const all = (v('dcNew', [])).concat(base).filter(d => (c.all || d.club === c.sel) && !del[d.id]);
    const cur = nodeOf(folder);
    const chain = cur ? chainOf(cur.id) : [];
    const root = chain.length ? FOLDERS.find(x => x.id === chain[0].id) || null : null;
    const openIds = {}; chain.forEach(n => { openIds[n.id] = 1; });
    const tree = []; const walk = (n, depth, rf) => { tree.push({ n: n, depth: depth, rf: rf }); if (openIds[n.id]) kids(n.id).forEach(k => walk(k, depth + 1, rf)); };
    FOLDERS.forEach(f => walk(f, 0, f));
    const countIn = (id) => { const ids = descIds(id); return all.filter(d => ids.indexOf(d.f) !== -1).length; };
    const extBg = (ext) => ext === 'PDF' ? '#d9465a' : (/XLS|CSV/.test(ext) ? '#1f7a3a' : (/DOC/.test(ext) ? '#16241a' : (/PNG|JPG|JPEG|GIF|WEBP|HEIC/.test(ext) ? '#2a5fae' : '#6b7a6e')));
    const extTint = (ext) => ext === 'PDF' ? ['#fde4e7', '#f7c4cb'] : (/XLS|CSV/.test(ext) ? ['#e3f3e6', '#c4e5cb'] : (/DOC/.test(ext) ? ['#e8ece7', '#cdd5cb'] : ['#e6eefb', '#c8d8f3']));
    const newSub = v('dcNewSub', null);
    const makeSub = () => { const nm = (newSub || '').trim(); if (!nm || !cur) return; set(s2 => ({ dcSubs: (s2.dcSubs || []).concat([{ id: 'sf' + Date.now(), parent: cur.id, name: nm }]), dcNewSub: null })); };
    const searching = !!q;
    const rows = all.filter(d => searching && d.name.toLowerCase().includes(q));
    const here = cur ? all.filter(d => d.f === cur.id) : [];
    const fd = (iso) => { const p = iso.split('-'); return p[2] + '.' + p[1] + '.' + p[0]; };
    const fname = (id) => chainOf(id).map(n => n.name).join(' › ');
    const filesWord = (n) => n + (en ? (n === 1 ? ' file' : ' files') : (n === 1 ? ' fil' : ' filer'));
    return {
      tDcTitle: en ? 'Documents' : 'Dokumenter', tDcUpload: en ? 'Upload document' : 'Last opp dokument', tDcSearch: en ? 'Search meetings, items and documents…' : 'Søk i møter, saker og dokumenter…', tDcEmpty: en ? 'No documents match.' : 'Ingen dokumenter matcher.',
      dcHeading: searching ? (en ? 'Search results' : 'Søkeresultater') : (root ? root.name : (en ? 'Documents' : 'Dokumenter')),
      dcSub: searching ? filesWord(rows.length) : (root ? filesWord(countIn(root.id)) + ' · ' + (en ? 'Access: ' : 'Tilgang: ') + root.who : (en ? 'Access controlled per folder · full audit log' : 'Tilgangsstyrt per mappe · full revisjonslogg')),
      dcInFolder: !!cur && !searching, dcFolderName: chain.map(n => n.name).join(' › '), dcBack: () => set({ dcFolder: '', dcNewSub: null }),
      dcShowGrid: !cur && !searching, dcShowFiles: searching, dcShowFolder: !!cur && !searching,
      dcTree: tree.map(x => { const on = cur && x.n.id === cur.id; return { key: 'dt' + x.n.id, name: x.n.name, pick: () => set({ dcFolder: x.n.id, dcNewSub: null }), on: on ? 'true' : 'false',
        color: x.depth === 0 ? x.rf.color : x.rf.front, colorFront: x.depth === 0 ? x.rf.front : '#ffffff',
        style: 'display: flex; align-items: center; gap: 10px; width: 100%; box-sizing: border-box; text-align: left; padding: 9px 12px 9px ' + (12 + x.depth * 20) + 'px; border-radius: 12px; border: 0; cursor: pointer; font-family: var(--font-body); font-size: ' + (x.depth === 0 ? '15px; font-weight: 700;' : '14.5px; font-weight: 600;') + (on ? ' background: #e3f3e6; color: #1f7a3a;' : ' background: transparent; color: #16241a;') }; }),
      dcCurName: cur ? cur.name : '', dcCurCount: filesWord(here.length),
      dcSubTiles: cur ? kids(cur.id).map(k => ({ key: 'dst' + k.id, name: k.name, meta: filesWord(countIn(k.id)), color: root ? root.color : '#74cd85', colorFront: root ? root.front : '#a3e2ae', open: () => set({ dcFolder: k.id, dcNewSub: null }) })) : [],
      dcHasSubs: !!cur && kids(cur.id).length > 0,
      dcCards: here.map(d => { const ext = (d.name.split('.').pop() || '').toUpperCase().slice(0, 4); const tn = extTint(ext); return { key: 'dfc' + d.id, name: d.name, base: d.name.replace(/\.[^.]+$/, ''), ext: ext, meta: ext + ' · ' + d.kb + ' kB', tint: tn[0], fold: tn[1],
        badgeStyle: 'position: absolute; left: 0; bottom: 8px; padding: 2px 6px; border-radius: 5px; font-size: 10px; font-weight: 800; letter-spacing: .02em; color: #ffffff; background: ' + extBg(ext),
        del: () => set(s2 => ({ dcDel: Object.assign({}, s2.dcDel || {}, { [d.id]: true }) })) }; }),
      dcNoCards: !!cur && here.length === 0 && kids(cur.id).length === 0,
      tDcFolderEmpty: en ? 'This folder is empty. Upload files or make a subfolder.' : 'Mappen er tom. Last opp filer eller lag en undermappe.',
      tDcNewSub: en ? '+ New subfolder' : '+ Ny undermappe', tDcSubPh: en ? 'Name of the subfolder' : 'Navn på undermappen', tDcMake: en ? 'Create' : 'Lag mappe', tDcCancel: en ? 'Cancel' : 'Avbryt',
      dcNewSubOpen: newSub !== null, dcNewSubVal: newSub || '', dcOpenNewSub: () => set({ dcNewSub: '' }), dcCancelSub: () => set({ dcNewSub: null }),
      onDcNewSub: (e) => set({ dcNewSub: e.target.value }), dcMakeSub: makeSub, dcNewSubKey: (e) => { if (e.key === 'Enter') { e.preventDefault(); makeSub(); } else if (e.key === 'Escape') set({ dcNewSub: null }); },
      dcFolders: FOLDERS.map(f => ({ key: 'df' + f.id, name: f.name, color: f.color, colorFront: f.front, meta: filesWord(countIn(f.id)) + ' · ' + f.who + (kids(f.id).length ? ' · ' + kids(f.id).length + (en ? ' subfolders' : ' undermapper') : ''), open: () => set({ dcFolder: f.id }) })),
      dcQ: v('dcQ', ''), onDcQ: (e) => set({ dcQ: e.target.value }), dcEmpty: rows.length === 0,
      onDcFiles: (ev) => { const list = Array.from(ev.target.files || []); ev.target.value = ''; if (!list.length) return; const club = c.all ? 'vif' : c.sel; const add = list.map((f, i) => ({ id: 'dn' + Date.now() + i, club: club, name: f.name, f: folder || 'board', by: 'Sigrid Andersen', when: '2026-11-12', kb: Math.max(1, Math.round((f.size || 0) / 1000)) })); set(s2 => ({ dcNew: add.concat(s2.dcNew || []), dcFolder: s2.dcFolder || 'board' })); },
      dcRows: rows.map(d => { const ext = (d.name.split('.').pop() || '').toUpperCase().slice(0, 4); return { key: 'dr' + d.id, name: d.name, ext: ext, cat: fname(d.f), meta: d.by + ' · ' + fd(d.when) + ' · ' + d.kb + ' kB' + (c.all ? ' · ' + c.clubOf(d.club) : ''),
        iconStyle: 'width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; font-size: 10.5px; font-weight: 800; ' + (ext === 'PDF' ? 'background: #fbe9e5; color: #b8240e;' : (/XLS|CSV/.test(ext) ? 'background: #eaf7ed; color: #1f7a3a;' : (/DOC/.test(ext) ? 'background: #e6f0fc; color: #2a5fae;' : 'background: #f4f8f2; color: #4C5E50;'))),
        del: () => set(s2 => ({ dcDel: Object.assign({}, s2.dcDel || {}, { [d.id]: true }) })) }; })
    };
  },

  // ---- Planlegging: month calendar of tasks (replaces the kanban board) ----
  adminPlanVals(c) {
    const en = c.en, st = this.state, v = (k, d) => (st[k] === undefined ? d : st[k]), set = (o) => this.setState(o);
    const now = new Date();
    const y = v('calY', now.getFullYear()), mo = v('calMo', now.getMonth());
    const tab = v('calTab', 'mine'), q = v('calQ', '').trim().toLowerCase(), openOnly = v('calOpenOnly', true), respOn = v('calResp', false);
    const ME = 'Sigrid A.';
    const TASKS = [
      { id: 't1', date: '2026-11-03', title: en ? 'Send autumn fee reminder' : 'Send purring høstkontingent', who: ME, collab: false, done: false, area: 'okonomi' },
      { id: 't2', date: '2026-11-05', title: en ? 'Order kits G14' : 'Bestille drakter G14', who: ME, collab: false, done: true, area: 'lag' },
      { id: 't3', date: '2026-11-10', title: en ? 'Board meeting agenda' : 'Sakliste styremøte', who: ME, collab: true, done: false, area: 'styret' },
      { id: 't4', date: '2026-11-12', title: en ? 'Book referees' : 'Booke dommere', who: 'Marit Sunde', collab: true, done: false, area: 'arrangement' },
      { id: 't5', date: '2026-11-17', title: en ? 'Youth fund application' : 'Søknad ungdomsfond', who: 'Ida Krogh', collab: false, done: false, area: 'okonomi' },
      { id: 't6', date: '2026-11-19', title: en ? 'Renew Vestland Bygg deal' : 'Fornye avtale Vestland Bygg', who: ME, collab: false, done: false, area: 'okonomi' },
      { id: 't7', date: '2026-11-21', title: en ? 'Prizes club championship' : 'Premier klubbmesterskap', who: '', collab: false, done: false, area: 'arrangement' },
      { id: 't8', date: '2026-11-25', title: en ? 'Budget 2027 draft' : 'Budsjett 2027 – utkast', who: ME, collab: true, done: false, area: 'okonomi' },
      { id: 't9', date: '2026-11-28', title: en ? 'Christmas party venue' : 'Lokale juleavslutning', who: '', collab: false, done: false, area: 'arrangement' },
      { id: 't10', date: '2026-12-02', title: en ? 'Kiosk rota December' : 'Kioskvakter desember', who: ME, collab: false, done: false, area: 'lag' }
    ];
    const TABS = [['all', en ? 'All tasks' : 'Alle oppgaver'], ['mine', en ? 'Assigned to me' : 'Tildelt meg'], ['collab', en ? 'Collaborating on' : 'Samarbeider om'], ['team', en ? 'My teams' : 'Mine lag'], ['none', en ? 'Unassigned' : 'Ikke tildelt']];
    const inTab = (x, k) => k === 'all' ? true : k === 'mine' ? x.who === ME : k === 'collab' ? x.collab : k === 'team' ? x.area === 'lag' : !x.who;
    const pass = (x) => (!openOnly || !x.done) && (!respOn || x.area === 'okonomi') && (!q || x.title.toLowerCase().includes(q));
    const shown = TASKS.filter(x => inTab(x, tab) && pass(x));
    const pad = (n) => (n < 10 ? '0' : '') + n;
    const iso = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    const weekNo = (d) => { const t2 = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const dn = t2.getUTCDay() || 7; t2.setUTCDate(t2.getUTCDate() + 4 - dn); const y0 = new Date(Date.UTC(t2.getUTCFullYear(), 0, 1)); return Math.ceil(((t2 - y0) / 86400000 + 1) / 7); };
    const first = new Date(y, mo, 1), offset = (first.getDay() + 6) % 7;
    const start = new Date(y, mo, 1 - offset);
    const lastDay = new Date(y, mo + 1, 0).getDate();
    const nWeeks = Math.ceil((offset + lastDay) / 7);
    const todayIso = iso(now);
    const MONTHS = en ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] : ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
    const DAYS = en ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] : ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
    const weeks = [];
    for (let w = 0; w < nWeeks; w++) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + i);
        const di = iso(d), inMonth = d.getMonth() === mo, isToday = di === todayIso;
        days.push({
          key: 'cd' + di, n: String(d.getDate()),
          cellStyle: 'height: max(64px, calc((100vh - 430px) / ' + nWeeks + ')); overflow: hidden; padding: 6px 6px; border-left: 1px solid rgba(22,36,26,.1); box-sizing: border-box; min-width: 0; ' + (inMonth ? 'background: #ffffff;' : 'background: #fafbf9;'),
          numStyle: 'display: inline-grid; place-items: center; min-width: 24px; height: 24px; padding: 0 4px; box-sizing: border-box; border-radius: 999px; font-size: 14px; ' + (isToday ? 'background: #1f7a3a; color: #ffffff; font-weight: 700;' : inMonth ? 'color: #16241a;' : 'color: rgba(22,36,26,.45);'),
          tasks: shown.filter(x => x.date === di).map(x => ({ key: 'tk' + x.id, title: x.title, tip: x.title + (x.who ? ' · ' + x.who : (en ? ' · unassigned' : ' · ikke tildelt')),
            style: 'display: block; padding: 2px 7px; border-radius: 6px; font-size: 11.5px; font-weight: 600; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; '
              + (x.done ? 'background: #f1f3ef; color: rgba(22,36,26,.55); text-decoration: line-through;' : !x.who ? 'background: #fff6d6; color: #6b5300;' : 'background: #e3f3e7; color: #16542a; border-left: 3px solid #1f7a3a;') }))
        });
      }
      weeks.push({ key: 'wk' + y + mo + w, num: String(weekNo(new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7))), days });
    }
    const go = (dm) => { const d = new Date(y, mo + dm, 1); set({ calY: d.getFullYear(), calMo: d.getMonth() }); };
    const chipOn = 'display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 14px; border-radius: 10px; border: 1px solid #74cd85; background: #eaf7ed; color: #1f7a3a; font-family: var(--font-body); font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap';
    const chipOff = 'display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 14px; border-radius: 10px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; cursor: pointer; white-space: nowrap';
    return {
      calTitle: (en ? 'Calendar: ' : 'Kalender: ') + MONTHS[mo] + ' ' + y,
      tCalPrev: en ? 'Previous month' : 'Forrige måned', tCalNext: en ? 'Next month' : 'Neste måned', tCalToday: en ? 'Today' : 'I dag',
      calPrev: () => go(-1), calNext: () => go(1), calToday: () => set({ calY: now.getFullYear(), calMo: now.getMonth() }),
      calTabs: TABS.map(tb => ({ key: 'ctb' + tb[0], label: tb[1], sel: tb[0] === tab ? 'true' : 'false', count: String(TASKS.filter(x => inTab(x, tb[0]) && pass(x)).length), pick: () => set({ calTab: tb[0] }),
        style: 'display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; margin-bottom: -1px; border: 0; border-bottom: 2px solid ' + (tb[0] === tab ? '#1f7a3a' : 'transparent') + '; border-radius: 10px 10px 0 0; background: ' + (tb[0] === tab ? '#f4f8f2' : 'transparent') + '; color: ' + (tb[0] === tab ? '#1f7a3a' : 'rgba(22,36,26,.7)') + '; font-family: var(--font-body); font-size: 15px; font-weight: ' + (tb[0] === tab ? 700 : 500) + '; cursor: pointer',
        countStyle: 'padding: 1px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; background: ' + (tb[0] === tab ? '#1f7a3a; color: #ffffff' : 'rgba(22,36,26,.08); color: rgba(22,36,26,.7)') })),
      tCalSearch: en ? 'Search tasks' : 'Søk etter oppgave', calQ: v('calQ', ''), onCalQ: (e) => set({ calQ: e.target.value }),
      tCalNotDone: en ? 'Not done' : 'Ikke ferdig', calToggleOpen: () => set({ calOpenOnly: !openOnly }), calOpenOnlyAttr: openOnly ? 'true' : 'false', calOpenStyle: openOnly ? chipOn : chipOff,
      tCalStatus: 'Status', tCalTeam: en ? 'Team' : 'Lag', tCalTags: en ? 'Tags' : 'Tagger', tCalMore: en ? 'More…' : 'Mer…',
      tCalResp: en ? 'Responsible: Finance' : 'Ansvarlig: Økonomi', calToggleResp: () => set({ calResp: !respOn }), calRespAttr: respOn ? 'true' : 'false', calRespStyle: respOn ? chipOn : chipOff,
      tCalReset: en ? 'Reset' : 'Nullstille', calReset: () => set({ calQ: '', calTab: 'all', calOpenOnly: false, calResp: false }),
      calDays: DAYS.map((d, i) => ({ key: 'dn' + i, label: d })),
      calWeeks: weeks
    };
  },
  // ---- Fakturering: invoices, archive, recipients, settlement details, PDF ----
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
    const seedGrp = [
      { id: '#3601', club: 'fana', type: en ? 'Membership fee' : 'Kontingent', number: '31/9/2026', date: '2026-09-12', name: 'IL Fana Fotball (24)', amt: 1500, due: '2026-10-12', status: 'unpaid', count: 24, scopeLabel: en ? 'Whole club' : 'Hele klubben', desc: en ? 'Membership fee autumn 2026 for all members.' : 'Kontingent høst 2026 for alle medlemmer.' },
      { id: '#3602', club: 'fana', type: en ? 'Tournament fee' : 'Turneringsavgift', number: '32/9/2026', date: '2026-10-05', name: 'G14 (14)', amt: 650, due: '2026-11-05', status: 'unpaid', count: 14, scopeLabel: en ? 'Training group G14' : 'Treningsgruppe G14', desc: en ? 'Entry fee for the November tournament.' : 'Deltakeravgift for novemberturneringen.' },
      { id: '#3604', club: 'fana', type: en ? 'Membership fee' : 'Medlemsavgift', number: '34/8/2026', date: '2026-08-20', name: 'IL Fana Fotball (133)', amt: 1500, due: '2026-09-20', status: 'unpaid', count: 133, scopeLabel: en ? 'Whole club' : 'Hele klubben', desc: en ? 'Annual membership fee 2026/27 for all 133 members.' : 'Årlig medlemsavgift 2026/27 for alle 133 medlemmer.' },
      { id: '#3605', club: 'fana', type: en ? 'Tournament fee' : 'Turneringsavgift', number: '35/10/2026', date: '2026-10-08', name: en ? 'G12, G13, G14, G16 (60)' : 'G12, G13, G14, G16 (60)', amt: 1500, due: '2026-11-08', status: 'unpaid', count: 60, scopeLabel: en ? 'Several groups' : 'Flere grupper', desc: en ? 'Entry and travel for the winter cup.' : 'Deltaker- og reiseavgift til vintercupen.' },
      { id: '#3606', club: 'fana', type: en ? 'Training fee' : 'Treningsavgift', number: '36/9/2026', date: '2026-09-02', name: en ? 'Senior A and B (38)' : 'Senior A og B (38)', amt: 2400, due: '2026-10-02', status: 'unpaid', count: 38, scopeLabel: en ? 'Several groups' : 'Flere grupper', desc: en ? 'Training fee autumn season.' : 'Treningsavgift høstsesongen.' },
      { id: '#3603', club: 'vif', type: en ? 'Kit' : 'Drakt', number: '33/10/2026', date: '2026-10-10', name: en ? 'Skating show cast (9)' : 'Oppvisningsgruppa (9)', amt: 899, due: '2026-11-10', status: 'unpaid', count: 9, scopeLabel: en ? 'Several groups' : 'Flere grupper', desc: en ? 'Show costume for the winter show.' : 'Kostyme til vinteroppvisningen.' }
    ].filter(x => c.all || x.club === c.sel);
    const created = (v('invNewList', [])).filter(x => c.all || x.club === c.sel).concat([]);
    const del = v('invDel', {}), ov = v('invOv', {});
    const stat = v('invStatus', 'all'), q = (v('invQ', '') || '').trim().toLowerCase();
    const merged = created.concat(seedGrp).concat(base).filter(x => !del[x.id]).map(x => Object.assign({}, x, ov[x.id] || {}, (v('stDet', {})[x.id]) || {}));
    const arch = v('invArch', {}), tabK = v('invTab', 'active');
    const nAct = merged.filter(x => !arch[x.id]).length, nArc = merged.filter(x => arch[x.id]).length;
    const shown = merged.filter(x => (tabK === 'archived' ? !!arch[x.id] : !arch[x.id]) && (stat === 'all' || x.status === stat) && (!q || (x.id + ' ' + x.type + ' ' + x.number + ' ' + x.name + ' ' + x.date).toLowerCase().includes(q)));
    const sl = { paid: en ? 'Paid' : 'Betalt', unpaid: en ? 'Unpaid' : 'Ubetalt', overdue: en ? 'Overdue' : 'Forfalt' };
    const ss = { paid: 'background: rgba(116,205,133,.3); color: #16241a', unpaid: 'background: rgba(148,92,214,.18); color: #4b2a85', overdue: 'background: #fbe9e5; color: #a3280e' };
    const pillSt = (k) => 'display: inline-block; padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; ' + ss[k];
    const set = (o) => this.setState(o);
    const selInv = v('invSel', {});
    const TODAY = '2026-10-25';
    const fn = ['Emil', 'Selma', 'Jonas', 'Kari', 'Hanne', 'Ola', 'Silje', 'Marit', 'Nora', 'Lars', 'Ingrid', 'Henrik', 'Sofie', 'Magnus', 'Thea', 'Oskar', 'Maja', 'Jakob', 'Ida', 'Filip', 'Lea', 'Mats', 'Emma', 'Noah', 'Aksel', 'Frida', 'Tobias', 'Julie', 'Sander', 'Mia'];
    const ln = ['Aas', 'Hauge', 'Eide', 'Moe', 'Vik', 'Berg', 'Sunde', 'Nilsen', 'Hansen', 'Larsen', 'Olsen', 'Dahl', 'Lund', 'Bakke', 'Strand', 'Haugen', 'Solberg', 'Myhre', 'Rud', 'Foss'];
    const hash = (str) => { let h = 7; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 100003; return h; };
    const feeOv = v('stFee', {});
    const recipsOf = (x) => {
      const cnt = Math.max(1, x.count || 1), seed = hash(x.id), out = [];
      for (let i = 0; i < cnt; i++) {
        let first, last;
        if (cnt === 1) { const p = String(x.name).replace(/\s*\(\d+\)\s*$/, '').split(/\s+/); first = p[0] || ''; last = p.slice(1).join(' '); }
        else { first = fn[(seed + i * 7) % fn.length]; last = ln[(seed * 3 + i * 5) % ln.length]; }
        let stt;
        if (cnt === 1) stt = x.status === 'paid' ? 'paid' : 'unpaid'; else { const h = (seed + i * 11) % 10; stt = h < 6 ? 'paid' : (h === 9 ? 'exempt' : 'unpaid'); }
        const key = x.id + ':' + i, base = parseInt(feeOv[key] !== undefined ? feeOv[key] : x.amt, 10) || 0;
        out.push({ key: key, first: first, last: last, st: stt, fee: stt === 'exempt' ? 0 : base, feeBase: base });
      }
      return out;
    };
    const clubOfSafe = (id) => c.clubOf(id);
    const accts = { vif: ['Lade Kunstløp – Driftskonto', '3000 12 34567'], fana: ['IL Fana Fotball – Driftskonto', '1503 61 98765'], varden: ['Varden BTK – Driftskonto', '4202 33 12480'] };
    const supP = (c.payAll || []).find(p => p.id === v('svPdfId', ''));
    const supPdf = supP ? { id: supP.id, fileId: String(supP.no).replace(/[^A-Za-z0-9-]/g, ''), club: supP.club, type: en ? 'Supplier invoice' : 'Leverandørfaktura', number: supP.no, date: (() => { const q = supP.due.split('-').map(Number), t = new Date(q[0], q[1] - 1, q[2] - 30); return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0'); })(), name: c.clubOf(supP.club), amt: supP.n, count: 1, due: supP.due, desc: supP.desc, status: supP.isPaid ? 'paid' : 'unpaid', supplier: supP.supplier } : null;
    const pdfX = merged.find(x => x.id === v('pdfId', '')) || supPdf;
    const mkPdf = (x) => {
      const acc = x.acct ? [x.acct, ''] : (accts[x.club] || ['Driftskonto', '1503 00 00000']);
      const nm = String(x.name).replace(/\s*\(\d+\)\s*$/, ''), cnt = Math.max(1, x.count || 1), price = parseInt(x.amt, 10) || 0;
      const kid = '00' + String(1000000 + hash(x.id) * 7).slice(0, 9);
      const di = (iso) => String(iso).split('-').reverse().join('.');
      const club = x.supplier || c.clubOf(x.club);
      return { club: club, num: (en ? 'Invoice ' : 'Faktura ') + (x.supplier ? x.number : x.id.replace('#', '') + ' · ' + x.number), acctName: x.supplier ? '' : acc[0].replace(club + ' – ', ''), to: nm + (cnt > 1 ? ' (' + cnt + (en ? ' recipients)' : ' mottakere)') : ''), date: di(x.date), type: x.type, due: di(x.due), desc: (x.desc || ((en ? 'Payment for ' : 'Betaling for ') + String(x.type).toLowerCase())) + (cnt > 1 ? ' – ' + nm : ''), qty: cnt, price: price, sum: price * cnt, acct: x.acct || acc[1] || acc[0], kid: kid,
        footer: en ? 'Pay by the due date, stating the KID number. Questions: contact the club or reply to this invoice in Kretz.' : 'Betales innen forfall med KID-nummer oppgitt. Spørsmål: kontakt klubben eller svar på fakturaen i Kretz.' };
    };
    const pdfBytes = (p) => {
      const clean = (t) => String(t).replace(/[–—−]/g, '-').replace(/[·•]/g, '-').replace(/[’‘]/g, "'").replace(/[\u00a0\u202f]/g, ' ').replace(/[^\x20-\x7e¡-ÿ]/g, '?').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
      const kr2 = (n) => 'kr ' + Number(n).toLocaleString('nb-NO').replace(/[\u00a0\u202f]/g, ' ');
      let o = '';
      const txt = (t, x, y, size, bold, gray, right) => { const w = clean(t).length * size * (bold ? 0.55 : 0.5); o += 'BT /F' + (bold ? '2' : '1') + ' ' + size + ' Tf ' + (gray ? '0.42 0.46 0.42 rg' : '0.086 0.141 0.102 rg') + ' ' + (right ? Math.max(40, x - w) : x).toFixed(1) + ' ' + y + ' Td (' + clean(t) + ') Tj ET\n'; };
      const rect = (x, y, w, h, rgb) => { o += rgb + ' rg ' + x + ' ' + y + ' ' + w + ' ' + h + ' re f\n'; };
      txt(en ? 'Invoice' : 'Faktura', 50, 770, 28, true); txt(p.num, 50, 750, 10, false, true);
      txt(p.club, 545, 770, 14, true, false, true); txt(p.acctName, 545, 754, 10, false, true, true);
      rect(50, 728, 50, 3, '0.455 0.804 0.522');
      const L = [[en ? 'TO' : 'TIL', p.to, 50, 700], [en ? 'INVOICE DATE' : 'FAKTURADATO', p.date, 310, 700], [en ? 'TYPE' : 'TYPE', p.type, 50, 654], [en ? 'DUE DATE' : 'FORFALLSDATO', p.due, 310, 654]];
      L.forEach(l => { txt(l[0], l[2], l[3], 8, false, true); txt(l[1], l[2], l[3] - 15, 11, true); });
      rect(50, 580, 495, 22, '0.957 0.973 0.949');
      txt(en ? 'DESCRIPTION' : 'BESKRIVELSE', 56, 587, 8, false, true); txt(en ? 'QTY' : 'ANTALL', 380, 587, 8, false, true, true); txt(en ? 'PRICE' : 'PRIS', 455, 587, 8, false, true, true); txt(en ? 'SUM' : 'SUM', 540, 587, 8, false, true, true);
      o += '0.086 0.141 0.102 RG 0.8 w 50 602 m 545 602 l S\n';
      txt(p.desc.length > 62 ? p.desc.slice(0, 60) + '...' : p.desc, 56, 562, 10, false); txt(String(p.qty), 380, 562, 10, false, false, true); txt(kr2(p.price), 455, 562, 10, false, false, true); txt(kr2(p.sum), 540, 562, 10, false, false, true);
      o += '0.8 0.82 0.8 RG 0.5 w 50 548 m 545 548 l S\n';
      txt(en ? 'VAT' : 'MVA', 440, 526, 10, false, true); txt('kr 0', 540, 526, 10, false, true, true);
      o += '0.086 0.141 0.102 RG 0.8 w 400 512 m 545 512 l S\n';
      txt(en ? 'Total' : 'Å betale', 410, 494, 12, true); txt(kr2(p.sum), 540, 494, 13, true, false, true);
      rect(50, 400, 495, 62, '0.957 0.973 0.949');
      txt(en ? 'ACCOUNT NUMBER' : 'KONTONUMMER', 62, 440, 8, false, true); txt(p.acct, 62, 422, 12, true); txt('KID', 310, 440, 8, false, true); txt(p.kid, 310, 422, 12, true);
      txt(p.footer.length > 96 ? p.footer.slice(0, 94) + '...' : p.footer, 50, 372, 8.5, false, true);
      const objs = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>', '<< /Length ' + o.length + ' >>\nstream\n' + o + 'endstream'];
      let out = '%PDF-1.4\n'; const offs = [];
      objs.forEach((b, i) => { offs.push(out.length); out += (i + 1) + ' 0 obj\n' + b + '\nendobj\n'; });
      const xr = out.length; out += 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + offs.map(n => String(n).padStart(10, '0') + ' 00000 n \n').join('') + 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + xr + '\n%%EOF';
      const u = new Uint8Array(out.length); for (let i = 0; i < out.length; i++) u[i] = out.charCodeAt(i) & 255;
      return u;
    };
    const npType = v('npType', 'once');
    const clubAccts = (c.all ? Object.keys(accts) : [c.sel]).filter(k => accts[k]).map(k => ({ key: 'ac' + k, id: k, name: accts[k][0] + ' · ' + accts[k][1] }));
    if (!clubAccts.length) clubAccts.push({ key: 'ac0', id: 'x', name: 'Driftskonto' });
    const segType = v('npSeg', '');
    const segClub = c.invClub || (c.all ? 'vif' : c.sel);
    const deptMap2 = { vif: ['Kunstløp', 'Ishockey'], fana: ['Fotball', 'Håndball'], varden: ['Bordtennis', 'Badminton'] };
    const memTypes = [en ? 'Active member' : 'Aktivt medlem', en ? 'Child member' : 'Barnemedlem', en ? 'Youth member' : 'Ungdomsmedlem', en ? 'Adult member' : 'Voksenmedlem', en ? 'Family membership' : 'Familiemedlemskap', en ? 'Supporting member' : 'Støttemedlem'];
    const segDefs = segType === 'groups' ? this.groupsOf(segClub, en).map(g => ({ id: 'g' + g, name: g, count: this.members(en).filter(m => m.club === segClub && m.group === g).length * 3 + 6 }))
      : segType === 'sub' ? (deptMap2[segClub] || [en ? 'Main' : 'Hoved']).map(g => ({ id: 's' + g, name: g, count: 18 + hash(segClub + g) % 40 }))
      : segType === 'types' ? memTypes.map(g => ({ id: 't' + g, name: g, count: 6 + hash(segClub + g) % 45 })) : [];
    const segSel = v('npSegSel', {}), segPrice = v('npSegPrice', {});
    const segRowsAll = segDefs.map(g => ({ key: 'sg' + g.id, name: g.name, count: g.count + (en ? ' members' : ' medlemmer'), n: g.count, on: segSel[g.id] !== false && !!segSel[g.id], price: segPrice[g.id] !== undefined ? segPrice[g.id] : (st.invAmount || ''),
      toggle: () => set(s2 => ({ npSegSel: Object.assign({}, s2.npSegSel || {}, { [g.id]: !(s2.npSegSel || {})[g.id] }) })), setPrice: (e) => { const val = e.target.value; set(s2 => ({ npSegPrice: Object.assign({}, s2.npSegPrice || {}, { [g.id]: val }) })); } }));
    const segPicked = segRowsAll.filter(r => r.on);
    const segTitle = { groups: en ? 'Groups' : 'Grupper', sub: en ? 'Sub-groups' : 'Undergrupper', types: en ? 'Membership types' : 'Medlemstyper' }[segType] || '';
    const segTotal = segPicked.reduce((n, r) => n + r.n, 0);
    const segRowsOut = () => segPicked.map((r, k) => ({ nm: r.name + ' (' + r.n + ')', n: r.n, price: parseInt(r.price, 10) || parseInt(st.invAmount, 10) || 0, lbl: segTitle + ': ' + r.name }));
    const stX = merged.find(x => x.id === v('stId', ''));
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
      tInvFilter: en ? 'Filter' : 'Filter', tInvAdd: en ? 'New payment' : 'Ny betaling', tInvMore: en ? 'More' : 'Mer',
      invFilterOpen: !!v('invFilterOpen', false), invMoreOpen: !!v('invMoreOpen', false),
      toggleInvFilter: () => set({ invFilterOpen: !v('invFilterOpen', false), invMoreOpen: false }),
      toggleInvMore: () => set({ invMoreOpen: !v('invMoreOpen', false), invFilterOpen: false }),
      closeInvPops: () => set({ invFilterOpen: false, invMoreOpen: false }),
      tStatus: en ? 'Status' : 'Status',
      invStatusTabs: [['all', en ? 'All' : 'Alle'], ['paid', sl.paid], ['unpaid', sl.unpaid], ['overdue', sl.overdue]].map(o => ({ key: 'is' + o[0], label: o[1], pick: () => set({ invStatus: o[0] }), style: chip(stat === o[0]) })),
      tInvExport: en ? 'Export invoices (CSV)' : 'Eksporter fakturaer (CSV)',
      exportInvoices: () => {
        const qv = (x) => '"' + String(x).replace(/"/g, '""') + '"';
        const lines = [['ID', en ? 'Type' : 'Type', en ? 'Number' : 'Nummer', en ? 'Issued' : 'Utstedt', en ? 'Name' : 'Navn', en ? 'Amount (NOK)' : 'Beløp (NOK)', 'Status'].map(qv).join(';')].concat(shown.map(x => [x.id, x.type, x.number, x.date, x.name, x.amt * Math.max(1, x.count || 1), sl[x.status]].map(qv).join(';')));
        const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'fakturaer.csv'; document.body.appendChild(a); a.click(); a.remove(); set({ invMoreOpen: false });
      },
      invTabs: [['active', (en ? 'Active' : 'Aktive') + ' (' + nAct + ')'], ['archived', (en ? 'Archived' : 'Arkiverte') + ' (' + nArc + ')']].map(t => ({ key: 'it' + t[0], label: t[1], on: tabK === t[0], pick: () => set({ invTab: t[0], invSel: {} }),
        style: 'padding: 16px 2px 14px; margin-bottom: -1px; cursor: pointer; background: transparent; border: 0; border-bottom: 4px solid ' + (tabK === t[0] ? '#8BCB8B' : 'transparent') + '; font-family: var(--font-body); font-size: 18px; font-weight: 500; color: ' + (tabK === t[0] ? '#3E8A48' : 'rgba(22,36,26,.55)') + '; transition: color .2s, border-color .2s' })),
      invSelBar: shown.some(x => selInv[x.id]),
      invSelText: shown.filter(x => selInv[x.id]).length + (en ? ' selected' : ' valgt'),
      invArchiveLabel: tabK === 'archived' ? (en ? 'Restore' : 'Gjenopprett') : (en ? 'Archive' : 'Arkiver'),
      invArchiveSel: () => set(s2 => { const a = Object.assign({}, s2.invArch || {}); shown.forEach(x => { if (selInv[x.id]) { if (tabK === 'archived') delete a[x.id]; else a[x.id] = true; } }); return { invArch: a, invSel: {} }; }),
      invClearSel: () => set({ invSel: {} }),
      invCols: '24px 72px minmax(110px,1.2fr) minmax(90px,.8fr) minmax(100px,1fr) minmax(130px,1.4fr) minmax(90px,.9fr) minmax(90px,.9fr) 134px',
      tColType: en ? 'Type' : 'Type', tColNumber: en ? 'Number' : 'Nummer', tColIssued: en ? 'Date of issue' : 'Utstedt', tColName: en ? 'Name' : 'Navn', tColAmount: en ? 'Amount' : 'Beløp', tColStatus: 'Status', tColDetails: en ? 'Details' : 'Detaljer',
      tView: en ? 'View' : 'Vis', tEditL: en ? 'Edit' : 'Rediger', tDelete: en ? 'Delete' : 'Slett',
      tInvEmpty: tabK === 'archived' ? (en ? 'No archived invoices.' : 'Ingen arkiverte fakturaer.') : (en ? 'No invoices match.' : 'Ingen fakturaer matcher.'), invEmpty: shown.length === 0,
      tInvSelAll: en ? 'Select all' : 'Velg alle',
      invAllOn: shown.length > 0 && shown.every(x => selInv[x.id]),
      invToggleAll: () => { const on = shown.length > 0 && shown.every(x => selInv[x.id]); set(s2 => { const n = Object.assign({}, s2.invSel || {}); shown.forEach(x => { if (on) delete n[x.id]; else n[x.id] = true; }); return { invSel: n }; }); },
      tArchiveRow: tabK === 'archived' ? (en ? 'Restore' : 'Gjenopprett') : (en ? 'Archive' : 'Arkiver'),
      ...(() => {
        const p = pdfX ? mkPdf(pdfX) : null, kr3 = kr;
        return { pdfOpen: !!pdfX, closePdf: () => set({ pdfId: '', svPdfId: '' }), tClose2: '', tPdfDownload: en ? 'Download PDF' : 'Last ned PDF', tPdfInvoice: en ? 'Invoice' : 'Faktura',
          tPdfTo: en ? 'To' : 'Til', tPdfDate: en ? 'Invoice date' : 'Fakturadato', tPdfType: 'Type', tPdfDue: en ? 'Due date' : 'Forfallsdato', tPdfDesc: en ? 'Description' : 'Beskrivelse', tPdfQty: en ? 'Qty' : 'Antall', tPdfPrice: en ? 'Price' : 'Pris', tPdfSum: 'Sum', tPdfVat: en ? 'VAT' : 'MVA', tPdfTotal: en ? 'Total' : 'Å betale', tPdfAcct: en ? 'Account number' : 'Kontonummer', tPdfKid: 'KID',
          pdfFileName: pdfX ? (en ? 'invoice-' : 'faktura-') + (pdfX.fileId || pdfX.id.replace('#', '')) + '.pdf' : '', pdfMeta: pdfX ? '1 ' + (en ? 'page' : 'side') + ' · A4' : '',
          pdfNumber: p ? p.num : '', pdfClub: p ? p.club : '', pdfAcctName: p ? p.acctName : '', pdfTo: p ? p.to : '', pdfDate: p ? p.date : '', pdfType: p ? p.type : '', pdfDue: p ? p.due : '', pdfDesc: p ? p.desc : '', pdfQty: p ? String(p.qty) : '', pdfPrice: p ? kr3(p.price) : '', pdfSum: p ? kr3(p.sum) : '', pdfTotal: p ? kr3(p.sum) : '', pdfAcct: p ? p.acct : '', pdfKid: p ? p.kid : '', pdfFooter: p ? p.footer : '',
          downloadPdf: () => { if (!pdfX) return; const blob = new Blob([pdfBytes(mkPdf(pdfX))], { type: 'application/pdf' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = (en ? 'invoice-' : 'faktura-') + (pdfX.fileId || pdfX.id.replace('#', '')) + '.pdf'; document.body.appendChild(a); a.click(); a.remove(); } };
      })(),
      stOpen: !!stX, closeStats: () => set({ stId: '', stFeeKey: '' }), ...(() => {
        if (!stX) return {};
        const rec = recipsOf(stX), od = stX.due < TODAY;
        const paidN = rec.filter(r => r.st === 'paid').length, exN = rec.filter(r => r.st === 'exempt').length, unN = rec.length - paidN - exN;
        const paidAmt = rec.filter(r => r.st === 'paid').reduce((n, r) => n + r.fee, 0), outAmt = rec.filter(r => r.st === 'unpaid').reduce((n, r) => n + r.fee, 0);
        const totalAmt = paidAmt + outAmt;
        const lab = { paid: en ? 'Paid' : 'Betalt', unpaid: en ? 'Unpaid' : 'Ubetalt', overdue: en ? 'Overdue' : 'Forfalt', exempt: en ? 'Exempt' : 'Fritatt' };
        const eff = (r) => r.st === 'unpaid' && od ? 'overdue' : r.st;
        const pillC = { paid: 'background: rgba(116,205,133,.3); color: #16241a', unpaid: 'background: rgba(148,92,214,.18); color: #4b2a85', overdue: 'background: #fbe9e5; color: #a3280e', exempt: 'background: rgba(22,36,26,.08); color: rgba(22,36,26,.7)' };
        const pill = (k) => 'display: inline-block; padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; ' + pillC[k];
        const overall = unN === 0 ? 'paid' : (od ? 'overdue' : 'unpaid');
        const q = (v('stQ', '') || '').trim().toLowerCase(), f = v('stF', 'all');
        const rowsAll = rec.filter(r => (f === 'all' || (f === 'unpaid' ? r.st === 'unpaid' : r.st === f)) && (!q || (r.first + ' ' + r.last).toLowerCase().includes(q)));
        const acct = { vif: ['Lade Kunstløp – Driftskonto', '3000 12 34567'], fana: ['IL Fana Fotball – Driftskonto', '1503 61 98765'], varden: ['Varden BTK – Driftskonto', '4202 33 12480'] }[stX.club] || ['Driftskonto', '1503 00 00000'];
        const feeKr = Math.round((parseInt(stX.amt, 10) || 0) * 0.02), net = (parseInt(stX.amt, 10) || 0) - feeKr, remSent = v('stRem', {})[stX.id];
        const nrem = unN, ed = v('stFeeKey', '');
        const chip = (on) => 'cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; padding: 7px 14px; border-radius: 999px; border: 1px solid ' + (on ? '#16241a' : 'rgba(22,36,26,.18)') + '; background: ' + (on ? '#16241a' : '#ffffff') + '; color: ' + (on ? '#f6f8f3' : '#16241a');
        const cnt = (k) => k === 'all' ? rec.length : rec.filter(r => r.st === k).length;
        return {
          stTitle: stX.id + ' · ' + stX.type, stSub: (stX.count > 1 ? String(stX.name).replace(/\s*\(\d+\)\s*$/, '') + ' · ' : stX.name + ' · ') + clubOfSafe(stX.club), stStatus: lab[overall], stStatusStyle: pill(overall),
          tStPaidAmt: en ? 'Amount paid' : 'Beløp betalt', stPaidAmt: kr(paidAmt), tStOutAmt: en ? 'Outstanding' : 'Utestående', stOutAmt: kr(outAmt),
          tStRecips: en ? 'Recipients' : 'Antall mottakere', stRecips: String(rec.length), tStPaidN: en ? 'Paid' : 'Antall betalt', stPaidN: String(paidN), tStUnpaidN: en ? 'Not paid' : 'Antall ikke betalt', stUnpaidN: String(unN), tStExemptN: en ? 'Exempt' : 'Antall fritatte', stExemptN: String(exN),
          stPct: (totalAmt ? Math.round(paidAmt / totalAmt * 100) : 100) + '%', stPctText: (totalAmt ? Math.round(paidAmt / totalAmt * 100) : 100) + (en ? '% of the amount is paid' : ' % av beløpet er betalt'),
          stRemindNote: unN ? (en ? unN + ' members have not paid yet. Send them a reminder.' : unN + ' medlemmer har ikke betalt ennå. Send dem en påminnelse.') : (en ? 'Everyone has paid or is exempt.' : 'Alle har betalt eller er fritatt.'),
          stRemindLabel: en ? 'Send reminder to ' + unN : 'Send påminnelse til ' + unN, stRemindOff: unN === 0, stRemindOpacity: unN === 0 ? '.45' : '1',
          stRemind: () => { if (!nrem) return; set(s2 => ({ stRem: Object.assign({}, s2.stRem || {}, { [stX.id]: nrem }) })); },
          stRemindSent: remSent ? (en ? 'Reminder sent to ' + remSent + (remSent === 1 ? ' member.' : ' members.') : 'Påminnelse sendt til ' + remSent + (remSent === 1 ? ' medlem.' : ' medlemmer.')) : '',
          tStDetails: en ? 'Details' : 'Detaljer', tStAmount: en ? 'Amount per person' : 'Beløp per person', tStFeeIncl: en ? 'Include Kretz’s transaction fee in the price' : 'Inkluder Kretz sin transaksjonsavgift i prisen', tEditL: en ? 'Edit' : 'Rediger',
          stEditing: v('stEditId', '') === stX.id, stNotEditing: v('stEditId', '') !== stX.id, stSavedMsg: v('stSavedId', '') === stX.id ? (en ? 'Details saved.' : 'Detaljene er lagret.') : '',
          stStartEdit: () => set({ stEditId: stX.id, stSavedId: '', stDT: stX.type, stDD: stX.due, stDA: String(stX.amt), stDAc: stX.acct || acct[0] + ' · ' + acct[1], stDDs: stX.desc || '', stDF: stX.feeIncl !== false }),
          stCancelEdit: () => set({ stEditId: '' }),
          stDType: v('stDT', stX.type), stDDue: v('stDD', stX.due), stDAmt: v('stDA', String(stX.amt)), stDAcct: v('stDAc', ''), stDDesc: v('stDDs', ''), stDFee: v('stDF', true),
          onStDType: (e) => set({ stDT: e.target.value }), onStDDue: (e) => set({ stDD: e.target.value }), onStDAmt: (e) => set({ stDA: e.target.value }), onStDAcct: (e) => set({ stDAc: e.target.value }), onStDDesc: (e) => set({ stDDs: e.target.value }), onStDFee: (e) => set({ stDF: !!e.target.checked }),
          stSaveDetails: (ev) => { ev.preventDefault(); const amt = parseInt(v('stDA', stX.amt), 10) || stX.amt; set(s2 => ({ stDet: Object.assign({}, s2.stDet || {}, { [stX.id]: { type: v('stDT', stX.type), due: v('stDD', stX.due), amt: amt, acct: v('stDAc', ''), desc: v('stDDs', ''), feeIncl: !!v('stDF', true) } }), stFee: Object.assign({}, s2.stFee || {}), stEditId: '', stSavedId: stX.id })); }, tStType: en ? 'Type' : 'Type', stType: stX.type, tStSentTo: en ? 'Sent to' : 'Sendt til', stSentTo: stX.scopeLabel || (en ? 'Single member' : 'Enkeltmedlem'),
          tStDue: en ? 'Payment deadline' : 'Betalingsfrist', stDue: stX.due.split('-').reverse().join('.'), tStAccount: en ? 'Pays into account' : 'Opplyst konto', stAccount: stX.acct || (acct[0] + ' · ' + acct[1]),
          tStDesc: en ? 'Description' : 'Beskrivelse', stDesc: stX.desc || ((en ? 'Payment for ' : 'Betaling for ') + String(stX.type).toLowerCase() + ' – ' + clubOfSafe(stX.club) + '.'),
          tStFee: en ? 'Transaction fee' : 'Transaksjonsavgift', stFee: stX.feeIncl === false ? (en ? 'Not included – added on top · ' + kr(feeKr) + ' per payment (2 %)' : 'Ikke inkludert – legges på toppen · ' + kr(feeKr) + ' per betaling (2 %)') : (en ? 'Included in the price · ' + kr(feeKr) + ' per payment (2 %)' : 'Inkludert i prisen · ' + kr(feeKr) + ' per betaling (2 %)'),
          stFeeNote: stX.feeIncl === false ? (en ? 'The payer covers the fee in addition to the price, so the club receives the full ' + kr(stX.amt) + ' per payment.' : 'Betaleren dekker gebyret i tillegg til prisen, så klubben mottar hele ' + kr(stX.amt) + ' per betaling.') : en ? 'When Kretz’s transaction fee is included in the price, the club receives the product price minus the fee: ' + kr(stX.amt) + ' − ' + kr(feeKr) + ' = ' + kr(net) + ' per payment.' : 'Når Kretz sin transaksjonsavgift er inkludert i prisen, mottar klubben prisen på produktet minus transaksjonsgebyret: ' + kr(stX.amt) + ' − ' + kr(feeKr) + ' = ' + kr(net) + ' per betaling.',
          tStMembers: en ? 'Members' : 'Medlemmer', tStSearch: en ? 'Search member' : 'Søk etter medlem', stQ: v('stQ', ''), onStQ: (e) => set({ stQ: e.target.value }),
          stFilters: [['all', en ? 'All' : 'Alle'], ['paid', lab.paid], ['unpaid', lab.unpaid], ['exempt', lab.exempt]].map(o => ({ key: 'sf' + o[0], label: o[1] + ' ' + cnt(o[0]), pick: () => set({ stF: o[0] }), style: chip(f === o[0]) })),
          stCols: 'minmax(100px,1fr) minmax(100px,1fr) 110px 130px 110px 110px 110px',
          tStFirst: en ? 'First name' : 'Fornavn', tStLast: en ? 'Last name' : 'Etternavn', tStStatusCol: 'Status', tStFeeCol: en ? 'Fee' : 'Beløp', tStPaidCol: en ? 'Paid' : 'Betalt', tStOutCol: en ? 'Outstanding' : 'Utestående', tStDueCol: en ? 'Due date' : 'Forfallsdato', tStEditFee: en ? 'Edit fee' : 'Endre beløp', tStNone: en ? 'No members match.' : 'Ingen medlemmer matcher.', stEmpty: rowsAll.length === 0,
          stFeeDraft: v('stFeeDraft', ''), onStFeeDraft: (e) => set({ stFeeDraft: e.target.value }),
          stRows: rowsAll.map(r => { const e2 = eff(r); return { key: 'sr' + r.key, first: r.first, last: r.last, status: lab[e2], statusStyle: pill(e2), fee: r.st === 'exempt' ? '–' : kr(r.fee), paid: r.st === 'paid' ? kr(r.fee) : kr(0), out: r.st === 'unpaid' ? kr(r.fee) : kr(0), outStyle: r.st === 'unpaid' ? 'font-weight: 700; color: #7c4dcf' : 'color: rgba(22,36,26,.5)', due: r.st === 'exempt' ? '–' : stX.due.split('-').reverse().join('.'),
            editing: ed === r.key, notEditing: ed !== r.key && r.st !== 'exempt',
            editFee: () => set({ stFeeKey: r.key, stFeeDraft: String(r.feeBase) }),
            saveFee: (ev) => { if (ev && ev.preventDefault) ev.preventDefault(); const val = parseInt(v('stFeeDraft', ''), 10); set(s2 => ({ stFee: Object.assign({}, s2.stFee || {}, isNaN(val) ? {} : { [r.key]: Math.max(0, val) }), stFeeKey: '' })); } }; })
        };
      })(),
      invRows: shown.map((x, xi) => ({ key: 'ir' + x.id + '-' + xi, openStats: () => set({ stId: x.id, stQ: '', stF: 'all', stFeeKey: '' }), arch: () => set(s2 => { const a = Object.assign({}, s2.invArch || {}); if (a[x.id]) delete a[x.id]; else a[x.id] = true; const n = Object.assign({}, s2.invSel || {}); delete n[x.id]; return { invArch: a, invSel: n }; }), sel: !!selInv[x.id], rowBg: selInv[x.id] ? '#eaf7ed' : 'transparent', toggleSel: () => set(s2 => { const n = Object.assign({}, s2.invSel || {}); if (n[x.id]) delete n[x.id]; else n[x.id] = true; return { invSel: n }; }), id: x.id, type: x.type, number: x.number, date: x.date, name: x.name, amount: kr(x.amt * Math.max(1, x.count || 1)), statusLabel: sl[x.status], statusStyle: pillSt(x.status),
        view: () => set({ pdfId: x.id }),
        edit: () => set({ invModal: { id: x.id, edit: true }, invDType: x.type, invDAmt: String(x.amt), invDDue: x.due, invDStatus: x.status }),
        del: () => set(s2 => ({ invDel: Object.assign({}, s2.invDel || {}, { [x.id]: true }) })) })),
      invAddOpen: !!v('invAddOpen', false), openInvAdd: () => set({ invAddOpen: true, invSent: false, invFilterOpen: false, invMoreOpen: false, npType: 'once', npInst: '6', npDiscountOn: false, npNifFee: false, npNifTrain: false, npDescT: '', npFeeInfoOpen: false }),
      tSegment: en ? 'Payment segment' : 'Betalingssegment', tSegDialog: en ? 'Add payment segment based on' : 'Legg til betalingssegment basert på', tSegClear: en ? 'Remove segment' : 'Fjern segment',
      segLabel: segType ? segTitle + (segPicked.length ? ' · ' + segPicked.length + (en ? ' selected' : ' valgt') : '') : (en ? 'No segment – whole club' : 'Ingen segment – hele klubben'),
      segHint: segType ? '' : (en ? 'Choose a segment to set different prices per group, sub-group or membership type.' : 'Velg et segment for å sette ulik pris per gruppe, undergruppe eller medlemstype.'),
      segChosen: !!segType, segHeading: en ? 'Choose ' + segTitle.toLowerCase() : 'Velg ' + segTitle.toLowerCase(), tSegPriceHelp: en ? 'Tick the ones that should receive the payment and set a price for each.' : 'Kryss av de som skal motta betalingen, og sett en pris for hver.', segRows: segRowsAll,
      segPickOpen: !!v('segPick', false), openSegPick: () => set({ segPick: true }), closeSegPick: () => set({ segPick: false }), clearSeg: () => set({ npSeg: '', npSegSel: {} }),
      segOptions: [['groups', en ? 'Groups' : 'Grupper', en ? 'Choose this if you want to send out training fees where the price differs by the group the members belong to.' : 'Velg denne dersom du for eksempel vil sende ut treningsavgifter hvor prisen skal være forskjellig utfra hvilken gruppe medlemmene tilhører.', 'M12 4v5M6 14v-3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3M12 9v2'], ['sub', en ? 'Sub-groups' : 'Undergrupper', en ? 'Choose this if you want to send separate payment requests to members in a sub-group.' : 'Velg dette hvis du for eksempel vil sende ut separate betalingsforespørsler til medlemmer som i en undergruppe.', 'M6 4v14h6M6 8h8'], ['types', en ? 'Membership types' : 'Medlemstyper', en ? 'Choose this if you want to send out membership fees where the price differs by the members’ membership type.' : 'Velg denne dersom du for eksempel vil sende ut kontingent hvor prisen skal være forskjellig utfra hvilken medlemstype medlemmene har.', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 21a8 8 0 0 1 16 0z']].map(o => ({ key: 'so' + o[0], title: o[1], text: o[2], glyph: o[0] === 'groups' ? '⋔' : (o[0] === 'sub' ? '↳' : '●'), pick: () => set({ npSeg: o[0], npSegSel: {}, segPick: false }) })),
      tNpTitle: en ? 'Title' : 'Tittel', tNpDesc: en ? 'Description' : 'Beskrivelse', tNpDescPh: en ? 'What is the payment for?' : 'Hva gjelder betalingen?', tNpAccount: en ? 'Club account' : 'Klubbkonto', tNpType: 'Type', tNpAmount: en ? 'Amount (NOK)' : 'Beløp (NOK)', tNpDue: en ? 'Payment deadline' : 'Betalingsfrist', tNpInst: en ? 'Number of monthly payments' : 'Antall månedlige trekk',
      npDesc: v('npDescT', ''), onNpDesc: (e) => set({ npDescT: e.target.value }),
      npAcct: v('npAcctV', clubAccts[0].id), onNpAcct: (e) => set({ npAcctV: e.target.value }), npAccts: clubAccts,
      npTypes: [['once', en ? 'One-time payment' : 'Engangsbetaling', en ? 'The whole amount is paid at once.' : 'Hele beløpet betales samlet.'], ['split', en ? 'Instalments' : 'Delbetaling', en ? 'Split the payment into automatic monthly withdrawals.' : 'Del opp betalingen i månedlige automatiske trekk.'], ['flex', en ? 'Flexible payment' : 'Fleksibel betaling', en ? 'Let the recipient choose between paying at once or monthly withdrawals.' : 'La mottaker velge selv om å betale samlet eller i månedlige trekk.']].map(o => { const on = npType === o[0]; return { key: 'npt' + o[0], label: o[1], note: o[2], on: on, pick: () => set({ npType: o[0] }),
        style: 'display: flex; align-items: flex-start; gap: 12px; width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 14px; cursor: pointer; font-family: var(--font-body); color: #16241a; transition: border-color .2s, background .2s; border: 1.5px solid ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.14)') + '; background: ' + (on ? '#eaf7ed' : '#ffffff'),
        dot: 'flex: 0 0 auto; width: 18px; height: 18px; margin-top: 2px; border-radius: 999px; box-sizing: border-box; border: 2px solid ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.35)') + '; background: ' + (on ? 'radial-gradient(circle, #1f7a3a 45%, #ffffff 50%)' : '#ffffff') }; }),
      npInstShow: npType !== 'once', npInst: v('npInst', '6'), onNpInst: (e) => set({ npInst: e.target.value }), npInstOpts: [2, 3, 4, 6, 9, 12].map(n => ({ key: 'ni' + n, id: String(n), name: n + (en ? ' months' : ' måneder') })),
      npInstNote: (() => { const amt = parseInt(st.invAmount, 10) || 0, n = parseInt(v('npInst', '6'), 10) || 6; return amt ? (en ? 'About ' : 'Ca. ') + kr(Math.ceil(amt / n)) + (en ? ' per month.' : ' per måned.') : ''; })(),
      tNpDiscount: en ? 'Open for discount' : 'Åpne for rabatt', tNpDiscountNote: en ? 'Lets you give individual members a reduced price afterwards.' : 'Lar deg gi enkeltmedlemmer redusert pris i etterkant.', npDiscount: !!v('npDiscountOn', false), onNpDiscount: (e) => set({ npDiscountOn: !!e.target.checked }),
      tNpNifTitle: en ? 'Reporting of payment to NIF' : 'Rapportering av betaling til NIF', tNpNifText: en ? 'If this payment contains membership fees or training fees that must be reported to NIF, you must state this below. You can also choose both. The Sports Assembly 2019 decided on a minimum rate for membership fees in sports clubs of NOK 50.' : 'Dersom denne betalingen vil inneholde kontingent eller treningsavgift som skal rapporteres inn til NIF, må du angi dette nedenfor. Du kan også velge begge. Idrettstinget 2019 vedtok en minstesats for medlemskontingent i idrettslag på kr 50.',
      tNpNifFee: en ? 'The payment will include membership fees.' : 'Betalingen skal inneholde kontingent.', tNpNifTrain: en ? 'The payment will include training fees.' : 'Betalingen skal inneholde treningsavgift.',
      npNifFee: !!v('npNifFee', false), npNifTrain: !!v('npNifTrain', false), onNpNifFee: (e) => set({ npNifFee: !!e.target.checked }), onNpNifTrain: (e) => set({ npNifTrain: !!e.target.checked }),
      tNpFee: en ? 'We have a transaction fee of 2.99 % + NOK 2.' : 'Vi har et transaksjonsgebyr på 2,99 % + 2 kr.', tNpFeeLink: en ? 'Read more about how it works.' : 'Les mer om hvordan det fungerer.', npFeeInfoOpen: !!v('npFeeInfoOpen', false),
      npFeeInfo: (e) => { e.preventDefault(); set({ npFeeInfoOpen: !v('npFeeInfoOpen', false) }); },
      tNpFeeExplain: en ? 'The fee is charged per payment. If it is included in the price, the club receives the price minus the fee.' : 'Gebyret belastes per betaling. Er det inkludert i prisen, mottar klubben prisen minus gebyret.', closeInvAdd: () => set({ invAddOpen: false }),
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
      invRecipients: (segType && segPicked.length ? segTotal + manual.length : totalCount) + (en ? (totalCount === 1 ? ' recipient' : ' recipients') : (totalCount === 1 ? ' mottaker' : ' mottakere')),
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
        const mk = (k, name, club, cnt, lbl) => ({ count: cnt || 1, scopeLabel: lbl || (en ? 'Single member' : 'Enkeltmedlem'), desc: st.npDescT || st.invTitle || '', acct: (accts[st.npAcctV] ? accts[st.npAcctV][0].replace(/ – .*/, '') + ' · ' + accts[st.npAcctV][1] : ''), payType: st.npType || 'once', inst: parseInt(st.npInst, 10) || 0, discount: !!st.npDiscountOn, nif: [st.npNifFee ? 'fee' : '', st.npNifTrain ? 'train' : ''].filter(Boolean), id: '#' + (3700 + n + k), club: club, type: st.invTitle || (en ? 'Invoice' : 'Faktura'), number: (200 + n + k) + '/10/2026', date: '2026-10-15', name: name, amt: parseInt(st.invAmount, 10) || 0, due: st.invDue, status: 'unpaid' });
        const segRows = segRowsOut().map((r, k) => Object.assign(mk(k, r.nm, c.invClub, r.n, r.lbl), { amt: r.price }));
        const scopeLbl = c.scope === 'club' ? (en ? 'Whole club' : 'Hele klubben') : (c.scope === 'group' ? (en ? 'Training group ' : 'Treningsgruppe ') + tg : (c.scope === 'event' ? (en ? 'Signed up: ' : 'Påmeldte: ') + nm : (en ? 'Single member' : 'Enkeltmedlem')));
        const multi = c.scope === 'club' || c.scope === 'group' || c.scope === 'event';
        const rows = (segRows.length ? segRows : [mk(0, nm + (c.scope === 'club' || c.scope === 'group' ? ' (' + c.invCount + ')' : ''), c.invClub, multi ? c.invCount : 1, scopeLbl)]).concat(manual.map((id, k) => { const m = allM.find(x => x.id === id); return mk(k + 1, m.name, m.club); }));
        set({ invSent: true, invSentN: segRows.length ? segTotal + manual.length : totalCount, npSeg: '', npSegSel: {}, npSegPrice: {}, invTitle: '', invAddOpen: false, invManual: [], invManQ: '', invPQ: '', invNewList: rows.reverse().concat(st.invNewList || []) });
      }
    };
  },

  // ---- Medlemmer › Legg til medlem: full registration form ----
  adminAddMemVals(c) {
    const en = c.en, st = this.state, set = (o) => this.setState(o), T = (a, b) => en ? a : b;
    const F = st.amF || {}, val = (k) => F[k] || '';
    const setF = (k) => (e) => { const v = e.target.value; set(s2 => ({ amF: Object.assign({}, s2.amF || {}, { [k]: v }) })); };
    const club = c.all ? 'vif' : c.sel;
    const tf = (k, label, type, ph) => ({ key: 'af' + k, label: label, type: type || 'text', ph: ph || '', value: val(k), on: setF(k) });
    const types = [T('Active member', 'Aktivt medlem'), T('Passive member', 'Passivt medlem'), T('Supporting member', 'Støttemedlem'), T('Family membership', 'Familiemedlemskap'), T('Child member', 'Barnemedlem'), T('Youth member', 'Ungdomsmedlem'), T('Adult member', 'Voksenmedlem'), T('Company member', 'Bedriftsmedlem'), T('Honorary member', 'Æresmedlem'), T('Coach', 'Trener'), T('Volunteer', 'Frivillig'), T('Referee', 'Dommer')];
    const genders = [T('Male', 'Mann'), T('Female', 'Kvinne'), T('Other', 'Annet')];
    const dd = (id, label, opts, ph) => { const open = st.amDD === id, cur = val(id); return { key: 'dd' + id, label: label, open: open, value: cur || ph, valueStyle: cur ? '' : 'color: rgba(22,36,26,.5)', toggle: () => set({ amDD: open ? '' : id }),
      options: opts.map(o => ({ key: 'o' + id + o, label: o, on: cur === o, pick: () => set(s2 => ({ amF: Object.assign({}, s2.amF || {}, { [id]: o }), amDD: '' })),
        style: 'display: block; width: 100%; text-align: left; padding: 10px 12px; border: 0; border-radius: 10px; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: #16241a; background: ' + (cur === o ? '#eaf7ed' : 'transparent') + '; font-weight: ' + (cur === o ? '700' : '400') })) }; };
    const guards = st.amGuard || [];
    const setG = (i, k) => (e) => { const v = e.target.value; set(s2 => ({ amGuard: (s2.amGuard || []).map((g, j) => j === i ? Object.assign({}, g, { [k]: v }) : g) })); };
    const gname = (g) => ((g.first || '') + ' ' + (g.last || '')).trim();
    const groupsAvail = this.groupsOf(club, en);
    const groupRows = st.amGroups || [{ g: '', roles: [''] }];
    const roleOpts = [['', T('– Select –', '– Velg –')]].concat([T('Player', 'Spiller'), T('Coach', 'Trener'), T('Assistant coach', 'Assistenttrener'), T('Team leader', 'Lagleder'), T('Parent contact', 'Foreldrekontakt'), T('Support staff', 'Støtteapparat')].map(x => [x, x]));
    const payV = val('pay') || 'none';
    const personalFirst = val('first') || val('last') ? ((val('first') + ' ' + val('last')).trim()) : '';
    const payOpts = [{ key: 'pn', id: 'none', name: T('No payment contact', 'Ingen betalingskontakt') }];
    if (personalFirst && (val('email') || val('phone'))) payOpts.push({ key: 'ps', id: 'self', name: personalFirst });
    guards.forEach((g, i) => { if (gname(g) && (g.email || g.phone)) payOpts.push({ key: 'pg' + i, id: 'g' + i, name: gname(g) + ' (' + T('guardian', 'foresatt') + ')' }); });
    payOpts.push({ key: 'pc', id: 'custom', name: T('Custom payment contact', 'Egendefinert betalingskontakt') });
    const curPay = payOpts.some(o => o.id === payV) ? payV : 'none';
    const resetUp = (extra) => set(Object.assign({ addMemOpen: true, amF: {}, amGuard: [], amGroups: [{ g: '', roles: [''] }], amDD: '' }, extra || {}));
    return {
      openAddMember: () => resetUp(), tCancelL: T('Cancel', 'Avbryt'),
      amDDs: [dd('type', T('Membership type', 'Medlemstype'), types, T('– Select –', '– Velg –')), dd('gender', T('Gender', 'Kjønn'), genders, T('– Select –', '– Velg –'))],
      amF1: [tf('first', T('First name', 'Fornavn'), 'text', T('E.g. Ola', 'F.eks. Ola')), tf('last', T('Last name', 'Etternavn'), 'text', T('E.g. Nordmann', 'F.eks. Nordmann')), tf('nat', T('Nationality', 'Nasjonalitet'), 'text', T('E.g. Norwegian', 'F.eks. Norsk')), tf('ssn', T('National ID / D-number', 'Fødselsnummer/d-nummer'), 'text', '11 ' + T('digits', 'siffer')), tf('phone', T('Phone', 'Telefon'), 'tel', 'F.eks. +47 987 65 432'), tf('email', T('Email', 'E-post'), 'email', 'F.eks. ola.nordmann@klubbnavnet.no')],
      amF2: [tf('street', T('Street', 'Gate'), 'text', ''), tf('zip', T('Postal code', 'Postnummer'), 'text', ''), tf('city', T('City', 'Poststed'), 'text', ''), tf('country', T('Country', 'Land'), 'text', T('Norway', 'Norge'))],
      amF3: [tf('born', T('Date of birth', 'Fødselsdato'), 'date'), tf('joined', T('Joining date', 'Innmeldingsdato'), 'date')],
      tAmAddress: T('Address', 'Adresse'), tAmGuardians: T('Guardians', 'Foresatte'), tAmAddGuardian: T('Add guardian', 'Legg til foresatt'), tAmRemove: T('Remove', 'Fjern'),
      addGuard: () => set(s2 => ({ amGuard: (s2.amGuard || []).concat([{ first: '', last: '', email: '', phone: '' }]) })),
      amGuards: guards.map((g, i) => ({ key: 'ag' + i, title: T('Guardian ', 'Foresatt ') + (i + 1), remove: () => set(s2 => ({ amGuard: (s2.amGuard || []).filter((x, j) => j !== i) })),
        fields: [['first', T('First name', 'Fornavn'), 'text'], ['last', T('Last name', 'Etternavn'), 'text'], ['email', T('Email', 'E-post'), 'email'], ['phone', T('Phone', 'Telefon'), 'tel']].map(f => ({ key: 'agf' + i + f[0], label: f[1], type: f[2], ph: '', value: g[f[0]] || '', on: setG(i, f[0]) })) })),
      tAmPay: T('Payment contact', 'Betalingskontakt'), tAmPayHelp: T('Members or guardians who have a phone number or email address can be set as payment contact. You can also set a custom payment contact with a name and email address.', 'Medlemmer eller foresatte som har telefonnummer eller e-postadresse kan angis som betalingskontakt. Du kan også sette en egendefinert betalingskontakt med et navn og e-postadresse.'),
      amPay: curPay, amPayOpts: payOpts, onAmPay: (e) => setF('pay')(e), amPcShow: curPay === 'custom',
      amPcFields: [tf('pcFirst', T('First name', 'Fornavn'), 'text', T('E.g.: Ola Nordmann', 'F.eks.: Ola Nordmann')), tf('pcLast', T('Last name', 'Etternavn'), 'text', T('E.g. Larsen', 'F.eks. Larsen')), tf('pcEmail', T('Email', 'E-post'), 'email', 'F.eks. ola.nordmann@klubbnavnet.no'), tf('pcPhone', T('Phone', 'Telefon'), 'tel', 'F.eks. +47 987 65 432')],
      tAmGroups: T('Groups', 'Grupper'), tAmGroupName: T('Group name', 'Gruppenavn'), tAmGroupRole: T('Group role', 'Grupperolle'), tAmAddGroup: T('Add group', 'Legg til gruppe'), tAmAddRole: T('Add group role', 'Legg til grupperolle'),
      addGroupRow: () => set(s2 => ({ amGroups: (s2.amGroups || [{ g: '', roles: [''] }]).concat([{ g: '', roles: [''] }]) })),
      amGroupRows: groupRows.map((g, gi) => ({ key: 'agr' + gi, title: T('Group ', 'Gruppe ') + (gi + 1), canRemove: groupRows.length > 1, remove: () => set(s2 => ({ amGroups: (s2.amGroups || []).filter((x, j) => j !== gi) })),
        value: g.g, on: (e) => { const v = e.target.value; set(s2 => ({ amGroups: (s2.amGroups || groupRows).map((x, j) => j === gi ? Object.assign({}, x, { g: v }) : x) })); },
        opts: [{ key: 'go0', id: '', name: T('– Select –', '– Velg –') }].concat(groupsAvail.map((n, k) => ({ key: 'go' + k, id: n, name: n }))),
        addRole: () => set(s2 => ({ amGroups: (s2.amGroups || groupRows).map((x, j) => j === gi ? Object.assign({}, x, { roles: x.roles.concat(['']) }) : x) })),
        roles: g.roles.map((r, ri) => ({ key: 'arr' + gi + '-' + ri, value: r, canRemove: g.roles.length > 1, opts: roleOpts.map((o, k) => ({ key: 'ro' + k, id: o[0], name: o[1] })),
          on: (e) => { const v = e.target.value; set(s2 => ({ amGroups: (s2.amGroups || groupRows).map((x, j) => j === gi ? Object.assign({}, x, { roles: x.roles.map((y, q) => q === ri ? v : y) }) : x) })); },
          remove: () => set(s2 => ({ amGroups: (s2.amGroups || groupRows).map((x, j) => j === gi ? Object.assign({}, x, { roles: x.roles.filter((y, q) => q !== ri) }) : x) })) })) })),
      saveMember: (e) => {
        e.preventDefault();
        const first = val('first').trim(), last = val('last').trim(); if (!first || !last) return;
        const dm = (iso) => { const p = String(iso || '').split('-'); return p.length === 3 ? p[2] + '.' + p[1] + '.' + p[0] : ''; };
        const bornIso = val('born'), age = bornIso ? Math.floor((new Date(2026, 9, 25) - new Date(bornIso)) / 31557600000) : null;
        const gs = guards.filter(g => gname(g)).map((g, i) => ({ id: 'ng' + Date.now() + i, name: gname(g), relation: T('Guardian', 'Foresatt'), born: '', phone: g.phone || '', email: g.email || '' }));
        const payName = curPay === 'self' ? first + ' ' + last : (curPay === 'custom' ? (val('pcFirst') + ' ' + val('pcLast')).trim() : (curPay.charAt(0) === 'g' ? gname(guards[parseInt(curPay.slice(1), 10)] || {}) : ''));
        const grp = groupRows.filter(g => g.g);
        const joined = val('joined'), jd = joined ? dm(joined) : '';
        this.setState(st2 => ({ addedMems: (st2.addedMems || []).concat([{ id: 'new' + Date.now(), club: club, name: first + ' ' + last, email: val('email').trim(), type: val('type') || T('Active member', 'Aktivt medlem'), gender: val('gender'), phone: val('phone'), born: dm(bornIso), age: age, address: [val('street'), val('zip') + ' ' + val('city'), val('country')].filter(x => x.trim()).join(', '), group: grp[0] ? grp[0].g : '', role: grp[0] ? (grp[0].roles.find(r => r) || '') : '', guardians: gs, payName: payName, ssn: val('ssn'), nat: val('nat'), joinedStr: jd, seed: Date.now() % 97 }]), addMemOpen: false, amDD: '' }));
      }
    };
  },

  // ---- Medlemmer › Innsending til NIF ----
  adminNifVals(c) {
    const en = c.en, st = this.state, set = (o) => this.setState(o), T = (a, b) => en ? a : b;
    const seed = [
      ['n1', 'vif', 'Kasper', 'Dahl', '04.09.2010', 'G16', 'kasper.dahl@example.no', 'wait'], ['n2', 'vif', 'Amalie', 'Berg', '21.01.2013', 'J12', '+47 906 12 330', 'wait'], ['n3', 'fana', 'Henrik', 'Roll', '15.06.2011', 'G14', 'henrik.roll@example.no', 'wait'], ['n4', 'fana', 'Sara', 'Lunde', '02.12.1998', 'Senior A', 'sara.lunde@example.no', 'wait'],
      ['n5', 'vif', 'Oskar', 'Fjeld', '30.03.2012', 'G14', 'oskar.fjeld@example.no', 'miss', T('National ID', 'Fødselsnummer')], ['n6', 'fana', 'Iben', 'Strøm', '11.10.2009', 'J16', '+47 415 88 201', 'miss', T('Email', 'E-post')], ['n7', 'varden', 'Mathias', 'Aune', '19.07.2005', T('Open hall', 'Åpen hall'), 'mathias.aune@example.no', 'miss', T('Mobile number', 'Mobilnummer')]
    ].map(a => ({ id: a[0], club: a[1], first: a[2], last: a[3], born: a[4], group: a[5], contact: a[6], kind: a[7], missing: a[8] || '' }));
    const ov = st.nifOv || {}, kindOf = (r) => ov[r.id] || r.kind;
    const inClub = seed.filter(r => c.all || r.club === c.sel);
    const q = (st.nifQ || '').trim().toLowerCase();
    const tab0 = st.nifTab || 'wait';
    const toR = (r) => ({ id: r.id, name: r.first + ' ' + r.last, email: /@/.test(r.contact) ? r.contact : '', paid: true, type: T('Active member', 'Aktivt medlem'), src: r,
      raw: { id: r.id, club: r.club, name: r.first + ' ' + r.last, group: r.group, role: T('Player', 'Spiller'), born: r.born, age: 2026 - parseInt(r.born.split('.')[2], 10), phone: /@/.test(r.contact) ? '' : r.contact, seed: parseInt(r.id.slice(1), 10) * 3 } });
    const tabAll = inClub.filter(r => kindOf(r) === (tab0 === 'wait' ? 'wait' : 'miss')).map(toR);
    const cats = c.makeCats(tabAll);
    const nfSel = st.nifFilt || {};
    const nfFacts = new Map(); tabAll.forEach(r => nfFacts.set(r, c.facts(r)));
    const passCats = (r) => cats.every(cd => { const ch = Object.keys(nfSel[cd.k] || {}).filter(x => nfSel[cd.k][x]); if (!ch.length) return true; const got = cd.get(r, nfFacts.get(r)); return ch.some(x => got.indexOf(x) !== -1); });
    const passIds = {}; tabAll.forEach(r => { if (passCats(r)) passIds[r.id] = true; });
    const applyF = (r) => passIds[r.id] && (!q || (r.first + ' ' + r.last + ' ' + r.group + ' ' + r.contact).toLowerCase().includes(q));
    const nfCat = cats.some(x => x.k === st.nifCat) ? st.nifCat : cats[0].k, curCat = cats.find(x => x.k === nfCat);
    const nSel = (k) => Object.keys(nfSel[k] || {}).filter(x => nfSel[k][x]).length;
    const totalSel = cats.reduce((n, x) => n + nSel(x.k), 0);
    const toggleOpt = (k, id) => set(s2 => { const cur = Object.assign({}, (s2.nifFilt || {})[k] || {}); if (cur[id]) delete cur[id]; else cur[id] = true; return { nifFilt: Object.assign({}, s2.nifFilt || {}, { [k]: cur }) }; });
    const waitAll = inClub.filter(r => kindOf(r) === 'wait'), missAll = inClub.filter(r => kindOf(r) === 'miss');
    const tab = st.nifTab || 'wait';
    const rows = (tab === 'wait' ? waitAll : missAll).filter(applyF);
    const groups = Array.from(new Set(inClub.map(r => r.group)));
    const dl = (name, content) => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); };
    const tabSt = (on) => 'padding: 16px 18px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 17px; margin-bottom: -1px; color: ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.55)') + '; border-bottom: 3px solid ' + (on ? '#74cd85' : 'transparent');
    const nifSel = st.nifSel || {}, chosen = rows.filter(r => nifSel[r.id]);
    const colDefs = [
      { k: 'first', w: 'minmax(110px,1fr)', mn: 110, label: T('First name', 'Fornavn'), on: true }, { k: 'last', w: 'minmax(110px,1fr)', mn: 110, label: T('Last name', 'Etternavn'), on: true },
      { k: 'born', w: '110px', mn: 110, label: T('Date of birth', 'Fødselsdato'), on: true }, { k: 'group', w: '90px', mn: 90, label: T('Group', 'Gruppe'), on: true },
      { k: 'email', w: 'minmax(190px,1.4fr)', mn: 190, label: T('Email', 'E-post'), on: true },
      { k: 'status', w: 'minmax(130px,1fr)', mn: 130, label: 'Status', on: true },
      { k: 'gender', w: '90px', mn: 90, label: T('Gender', 'Kjønn') }, { k: 'submit', w: '130px', mn: 130, label: T('Submission date', 'Dato for innsending') },
      { k: 'address', w: 'minmax(190px,1.4fr)', mn: 190, label: T('Address', 'Adresse') }, { k: 'phone', w: '130px', mn: 130, label: T('Phone', 'Telefon') }, { k: 'nat', w: '110px', mn: 110, label: T('Nationality', 'Nasjonalitet') }
    ];
    const colOv = st.nifCols || {}, colOn = (x) => colOv[x.k] !== undefined ? colOv[x.k] : !!x.on, colsOn = colDefs.filter(colOn);
    const streets = ['Fanaveien 44', 'Sagveien 12', 'Nesttunveien 3', 'Tøyengata 30', 'Kjelsåsveien 8', 'Sandslimarka 21', 'Ladeveien 15'], cities = { vif: '7041 Trondheim', fana: '5244 Fana', varden: '7010 Trondheim' };
    const val = (k, r) => {
      const isMail = /@/.test(r.contact), n = parseInt(r.id.slice(1), 10);
      if (k === 'first') return r.first; if (k === 'last') return r.last; if (k === 'born') return r.born; if (k === 'group') return r.group;
      if (k === 'email') return isMail ? r.contact : (r.first + '.' + r.last).toLowerCase().replace(/ø/g, 'o').replace(/å/g, 'a').replace(/æ/g, 'ae') + '@example.no';
      if (k === 'phone') return isMail ? '+47 9' + String(10 + n * 7).slice(-2) + ' ' + String(40 + n * 3).slice(-2) + ' ' + String(100 + n * 11).slice(-3) : r.contact;
      if (k === 'gender') return c.facts(toR(r)).gender; if (k === 'submit') return tab === 'wait' ? '01.11.2026' : '–';
      if (k === 'address') return streets[n % streets.length] + ', ' + (cities[r.club] || cities.vif); if (k === 'nat') return T('Norwegian', 'Norsk');
      return '';
    };
    const send = (list) => set(s2 => ({ nifSel: {}, nifOv: Object.assign({}, s2.nifOv || {}, list.reduce((o, r) => { o[r.id] = 'sent'; return o; }, {})), nifMsg: T(list.length + (list.length === 1 ? ' member submitted to NIF.' : ' members submitted to NIF.'), list.length + (list.length === 1 ? ' medlem er sendt inn til NIF.' : ' medlemmer er sendt inn til NIF.')) }));
    return {
      tNifTitle: T('Submission to NIF', 'Innsending til NIF'), tNifDownload: T('Download basis for coordinated reporting 2026', 'Last ned grunnlag for samordnet rapportering 2026'),
      nifDownload: () => { const qv = (x) => '"' + String(x).replace(/"/g, '""') + '"'; dl('grunnlag-samordnet-rapportering-2026.csv', '\ufeff' + [[T('First name', 'Fornavn'), T('Last name', 'Etternavn'), T('Date of birth', 'Fødselsdato'), T('Group', 'Gruppe'), T('Contact', 'Kontakt'), 'Status']].concat(inClub.filter(r => kindOf(r) !== 'sent').map(r => [r.first, r.last, r.born, r.group, r.contact, kindOf(r) === 'wait' ? T('Waiting', 'Venter på innsendelse') : T('Missing information', 'Mangler informasjon')])).map(l => l.map(qv).join(';')).join('\n')); },
      nifTabs: [['wait', T('Waiting for submission', 'Venter på innsendelse'), waitAll.length], ['miss', T('Missing information', 'Mangler informasjon'), missAll.length]].map(t => ({ key: 'nt' + t[0], label: t[1] + ' (' + t[2] + ')', on: tab === t[0], style: tabSt(tab === t[0]), pick: () => set({ nifTab: t[0], nifMsg: '', nifSel: {} }) })),
      nifInfo: tab === 'miss' ? T('We can help you collect missing information by sending a link to a form by email to members/guardians. In the form they can enter the missing information required by NIF. The form is available for 7 days from when you send it. Tick the members below that you want to send the link to. Members must have an email address registered.', 'Vi kan hjelpe deg med å innhente manglende informasjon ved å sende lenke til et skjema via e-post til medlemmer/foresatte. Via skjemaet kan de skrive inn manglende informasjon som er påkrevd av NIF. Skjemaet vil være tilgjengelig i 7 dager fra du sender det. Kryss av medlemmene nedenfor som du ønsker å sende lenken til. Medlemmene må være lagt inn med e-postadresse.') : T('Members already registered with NIF are verified automatically. Some members will receive a message from NIF asking them to confirm that they want to be a member of the club. If the member has not been registered with NIF before, the message is sent to the email address shown below. If you want to use another email address or mobile number for individual members, you must open that member and send the message from there.', 'Medlemmer som allerede er registrert hos NIF blir automatisk verifisert. Noen medlemmer vil derimot motta en melding fra NIF med beskjed om å bekrefte at de ønsker å bli medlem av klubben. Dersom medlemmet ikke tidligere er registrert hos NIF, sendes meldingen til e-postadressen som er oppgitt nedenfor. Ønsker du å bruke en annen e-postadresse eller et annet mobilnummer for enkelte medlemmer, må du gå inn på det aktuelle medlemmet og sende meldingen derfra.'),
      tFilter: T('Filter', 'Filter'), tFHint: T('Filter members by', 'Filtrer medlemmer etter'), tFClearCat: T('Clear', 'Fjern valg'), tFClearAll: T('Clear all', 'Nullstill alle'), tFDone: T('Done', 'Ferdig'), tRemoveL: T('Remove', 'Fjern'),
      nfOpen: !!st.nifFiltOpen, nfToggle: () => set({ nifFiltOpen: !st.nifFiltOpen }), nfClose: () => set({ nifFiltOpen: false }), nfBadge: totalSel > 0, nfBadgeN: String(totalSel),
      nfClearAll: () => set({ nifFilt: {} }), nfClearCat: () => set(s2 => ({ nifFilt: Object.assign({}, s2.nifFilt || {}, { [nfCat]: {} }) })),
      nfCats: cats.map(cd => ({ key: 'nfc' + cd.k, label: cd.label, n: String(nSel(cd.k)), hasN: nSel(cd.k) > 0, pick: () => set({ nifCat: cd.k }),
        style: 'display: flex; align-items: center; gap: 8px; width: 100%; box-sizing: border-box; text-align: left; padding: 10px 12px; border: 0; border-radius: 12px; cursor: pointer; font-family: var(--font-body); font-size: 14px; color: #16241a; background: ' + (cd.k === nfCat ? '#eaf7ed' : 'transparent') + '; font-weight: ' + (cd.k === nfCat ? '700' : '400') })),
      nfCatTitle: curCat.label,
      nfOpts: curCat.opts.map(o => { const on = !!(nfSel[curCat.k] || {})[o.id]; const cnt = tabAll.filter(r => curCat.get(r, nfFacts.get(r)).indexOf(o.id) !== -1).length;
        return { key: 'nfo' + curCat.k + o.id, label: o.label, count: String(cnt), on: on, mark: on ? '✓' : '', toggle: () => toggleOpt(curCat.k, o.id),
          box: 'width: 20px; height: 20px; flex: 0 0 auto; box-sizing: border-box; border-radius: 6px; display: grid; place-items: center; font-size: 13px; line-height: 1; border: 1.5px solid ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.3)') + '; background: ' + (on ? '#1f7a3a' : '#ffffff') + '; color: #ffffff' }; }),
      nfChips: cats.reduce((a, cd) => a.concat(Object.keys(nfSel[cd.k] || {}).filter(x => nfSel[cd.k][x]).map(id => ({ key: 'nfch' + cd.k + id, label: cd.label + ': ' + (cd.opts.find(o => o.id === id) || { label: id }).label, remove: () => toggleOpt(cd.k, id) }))), []), nfHasChips: totalSel > 0,
      nifQ: st.nifQ || '', onNifQ: (e) => set({ nifQ: e.target.value }), tNifSearch: T('Search', 'Søk'),
      nifCanSend: tab === 'wait' && rows.length > 0, tNifSendAll: T('Submit all (', 'Send inn alle (') + rows.length + ')', nifSendAll: () => send(rows),
      nifMsg: st.nifMsg || '', nifCloseMsg: () => set({ nifMsg: '' }),
      nifShowing: rows.length === (tab === 'wait' ? waitAll.length : missAll.length) ? T('Showing all ' + rows.length + ' members.', 'Viser alle ' + rows.length + ' medlemmer.') : T('Showing ' + rows.length + ' of ' + (tab === 'wait' ? waitAll.length : missAll.length) + ' members.', 'Viser ' + rows.length + ' av ' + (tab === 'wait' ? waitAll.length : missAll.length) + ' medlemmer.'),
      nvOpen: !!st.nifVisOpen, nvToggle: () => set({ nifVisOpen: !st.nifVisOpen }), nvCount: colsOn.length + '/' + colDefs.length,
      nvReset: () => set({ nifCols: {} }), nvAll: () => set({ nifCols: colDefs.reduce((o, x) => { o[x.k] = true; return o; }, {}) }),
      nvCols: colDefs.map(x => { const on = colOn(x); return { key: 'nv' + x.k, label: x.label, on: on, mark: on ? '✓' : '', toggle: () => set(s2 => ({ nifCols: Object.assign({}, s2.nifCols || {}, { [x.k]: !(((s2.nifCols || {})[x.k] !== undefined) ? (s2.nifCols || {})[x.k] : !!x.on) }) })),
        box: 'width: 20px; height: 20px; flex: 0 0 auto; box-sizing: border-box; border-radius: 6px; display: grid; place-items: center; font-size: 13px; line-height: 1; border: 1.5px solid ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.3)') + '; background: ' + (on ? '#1f7a3a' : '#ffffff') + '; color: #ffffff' }; }),
      tVis: T('Show', 'Vis'), tVisHint: T('Choose columns', 'Velg kolonner'), tVisAll: T('Show all', 'Vis alle'), tVisReset: T('Reset', 'Nullstill'),
      nifGrid: '30px ' + colsOn.map(x => x.w).join(' ') + ' 150px', nifMinW: (30 + colsOn.reduce((n, x) => n + x.mn, 0) + 150 + 12 * (colsOn.length + 1) + 52) + 'px',
      nifHead: colsOn.map(x => ({ key: 'nh' + x.k, label: x.k === 'status' ? (tab === 'wait' ? 'Status' : T('Missing', 'Mangler')) : x.label })),
      nifAllChecked: rows.length > 0 && rows.every(r => nifSel[r.id]),
      nifToggleAll: () => set(s2 => { const cur = s2.nifSel || {}; const every = rows.length > 0 && rows.every(r => cur[r.id]); const nx = {}; if (!every) rows.forEach(r => { nx[r.id] = true; }); return { nifSel: nx }; }),
      nifSelAny: chosen.length > 0, nifClearSel: () => set({ nifSel: {} }),
      nifSelNote: T('Selected ' + chosen.length + (chosen.length === 1 ? ' member.' : ' members.'), 'Valgt ' + chosen.length + (chosen.length === 1 ? ' medlem.' : ' medlemmer.')),
      tNifActSel: tab === 'wait' ? T('Submit selected', 'Send inn valgte') : T('Send form link to selected', 'Send skjemalenke til valgte'),
      nifActSel: () => { if (tab === 'wait') send(chosen); else set({ nifSel: {}, nifMsg: T('Form link sent by email to ' + chosen.length + (chosen.length === 1 ? ' member.' : ' members.') + ' It is available for 7 days.', 'Skjemalenke er sendt på e-post til ' + chosen.length + (chosen.length === 1 ? ' medlem.' : ' medlemmer.') + ' Den er tilgjengelig i 7 dager.') }); },
      tSelectAll: T('Select all', 'Velg alle'), tBkClear: T('Clear selection', 'Fjern valg'),
      nifRows: rows.map(r => ({ key: 'nr' + r.id, checked: !!nifSel[r.id], bg: nifSel[r.id] ? '#eaf7ed' : 'transparent',
        toggle: () => set(s2 => { const nx = Object.assign({}, s2.nifSel || {}); if (nx[r.id]) delete nx[r.id]; else nx[r.id] = true; return { nifSel: nx }; }), name: r.first + ' ' + r.last, born: r.born, group: r.group, contact: r.contact,
        cells: colsOn.map(x => ({ key: 'nc' + x.k, isStatus: x.k === 'status', isText: x.k !== 'status', style: x.k === 'first' ? 'min-width: 0; font-family: var(--font-heading); font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap' : 'min-width: 0; color: rgba(22,36,26,.8); overflow: hidden; text-overflow: ellipsis; white-space: nowrap', val: x.k === 'status' ? (tab === 'wait' ? T('Ready to submit', 'Klar til innsending') : r.missing) : val(x.k, r) })),
        pill: 'display: inline-block; padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; ' + (tab === 'wait' ? 'background: rgba(116,205,133,.3); color: #16241a;' : 'background: #fff4cf; color: #6b4a00;'),
        actLabel: tab === 'wait' ? T('Submit', 'Send inn') : T('Mark as completed', 'Marker som utfylt'),
        btn: 'padding: 8px 14px; border-radius: 999px; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; white-space: nowrap; ' + (tab === 'wait' ? 'border: 0; background: #1f7a3a; color: #ffffff;' : 'border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a;'),
        act: () => tab === 'wait' ? send([r]) : set(s2 => ({ nifOv: Object.assign({}, s2.nifOv || {}, { [r.id]: 'wait' }), nifMsg: T(r.first + ' ' + r.last + ' now has all required information and is ready for submission.', r.first + ' ' + r.last + ' har nå all nødvendig informasjon og er klar til innsending.') })) })),
      nifEmpty: rows.length === 0, tNifNone: tab === 'wait' ? T('No members are waiting for submission', 'Ingen medlemmer venter på innsendelse') : T('No members are missing information', 'Ingen medlemmer mangler informasjon')
    };
  },

  // ---- Medlemmer: club info and invitation code dialogs ----
  adminClubInfoVals(c) {
    const en = c.en, st = this.state, set = (o) => this.setState(o), T = (a, b) => en ? a : b;
    const club = c.all ? 'vif' : c.sel;
    const defs = { vif: { name: c.clubOf('vif'), desc: T('Figure skating and ice hockey in Trondheim for children, youth and adults.', 'Kunstløp og ishockey i Trondheim for barn, ungdom og voksne.'), activity: T('Figure skating', 'Kunstløp'), age: T('Children / youth', 'Barn / ungdom'), members: 284, nif: T('Skating', 'Skøyter'), code: '000000' },
      fana: { name: c.clubOf('fana'), desc: T('Football and handball in Fana, with teams from mini to senior.', 'Fotball og håndball i Fana, med lag fra minior til senior.'), activity: T('Football', 'Fotball'), age: T('All ages', 'Alle aldre'), members: 221, nif: T('Football', 'Fotball'), code: '251904' },
      varden: { name: c.clubOf('varden'), desc: T('Table tennis and badminton at Vardenhallen.', 'Bordtennis og badminton i Vardenhallen.'), activity: T('Table tennis', 'Bordtennis'), age: T('Adults', 'Voksne'), members: 107, nif: T('Table tennis', 'Bordtennis'), code: '738260' } };
    const base = Object.assign({ criteria: '', pay: { vipps: true, card: true, invoice: true, cash: false } }, defs[club]);
    const saved = Object.assign({}, base, (st.ciSaved || {})[club] || {});
    const draft = Object.assign({}, saved, st.ciDraft || {});
    const view = st.ciView || '';
    const inv = Object.assign({ on: club === 'vif', code: base.code }, (st.ciInv || {})[club] || {});
    const setD = (k) => (e) => { const v = e.target.value; set(s2 => ({ ciDraft: Object.assign({}, s2.ciDraft || {}, { [k]: v }) })); };
    const sel = (k, label, opts) => ({ key: 'cis' + k, label: label, value: draft[k], on: setD(k), opts: opts.concat(opts.indexOf(draft[k]) === -1 && draft[k] ? [draft[k]] : []).map((o, i) => ({ key: 'o' + k + i, id: o, name: o })) });
    const payDefs = [['vipps', 'Vipps'], ['card', T('Card', 'Kort')], ['invoice', T('Invoice', 'Faktura')], ['cash', T('Cash', 'Kontant')]];
    const sw = (on) => ({ t: 'flex: 0 0 auto; width: 48px; height: 28px; padding: 0; border: 0; border-radius: 999px; cursor: pointer; position: relative; transition: background .25s; background: ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.22)'), k: 'position: absolute; top: 3px; left: ' + (on ? '23px' : '3px') + '; width: 22px; height: 22px; border-radius: 999px; background: #ffffff; box-shadow: 0 1px 4px rgba(22,36,26,.3); transition: left .25s' });
    const swv = sw(inv.on), link = 'https://kretz.no/bli-med/' + inv.code;
    const setInv = (o) => set(s2 => ({ ciInv: Object.assign({}, s2.ciInv || {}, { [club]: Object.assign({}, inv, o) }) }));
    const copy = (txt, msg) => { try { if (navigator.clipboard) navigator.clipboard.writeText(txt); } catch { /* ignore */ } set({ ciCopied: msg }); };
    return {
      tCiInfoBtn: T('Club info', 'Klubbinfo'), tCiInviteBtn: T('Invitation code', 'Invitasjonskode'),
      ciOpenInfo: () => set({ ciView: 'info', ciDraft: {}, ciCopied: '' }), ciOpenInvite: () => set({ ciView: 'invite', ciCopied: '' }), ciClose: () => set({ ciView: '', ciDraft: {} }),
      ciOpen: !!view, ciIsInfo: view === 'info', ciIsInvite: view === 'invite',
      ciTitle: view === 'invite' ? T('Invitation code', 'Invitasjonskode') : T('Club info', 'Klubbinfo') + ' – ' + saved.name, ciCloseLabel: view === 'invite' ? T('Close', 'Lukk') : T('Cancel', 'Avbryt'),
      tCiName: T('Club name', 'Klubbnavn'), tCiDesc: T('Description', 'Beskrivelse'), tCiMembers: T('Members', 'Medlemmer'), tCiCriteria: T('Group criteria', 'Gruppekriterier'), tCiCriteriaPh: T('E.g. age range or level for who can join', 'F.eks. alder eller nivå for hvem som kan bli med'), tCiPay: T('Available payment methods', 'Tilgjengelige utbetalingsmåter'),
      ciName: draft.name, onCiName: setD('name'), ciDesc: draft.desc, onCiDesc: setD('desc'), ciCriteria: draft.criteria, onCiCriteria: setD('criteria'), ciMembers: saved.members + (en ? ' members' : ' medlemmer'),
      ciSelects: [sel('activity', T('Activity', 'Aktivitet'), [T('Football', 'Fotball'), T('Handball', 'Håndball'), T('Figure skating', 'Kunstløp'), T('Ice hockey', 'Ishockey'), T('Table tennis', 'Bordtennis'), T('Badminton', 'Badminton'), T('Other', 'Annet')]), sel('age', T('Age group', 'Aldersgruppe'), [T('Children / youth', 'Barn / ungdom'), T('Adults', 'Voksne'), T('All ages', 'Alle aldre')]), sel('nif', T('NIF sport', 'NIF-gren'), [T('Football', 'Fotball'), T('Handball', 'Håndball'), T('Skating', 'Skøyter'), T('Ice hockey', 'Ishockey'), T('Table tennis', 'Bordtennis'), T('Badminton', 'Badminton')])],
      ciPay: payDefs.map(p => { const on = !!draft.pay[p[0]]; return { key: 'cip' + p[0], label: p[1], on: on, mark: on ? '✓' : '', toggle: () => set(s2 => ({ ciDraft: Object.assign({}, s2.ciDraft || {}, { pay: Object.assign({}, draft.pay, { [p[0]]: !on }) }) })),
        style: 'display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 999px; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 13px; border: 1px solid ' + (on ? '#1f7a3a' : 'rgba(22,36,26,.2)') + '; background: ' + (on ? '#eaf7ed' : '#ffffff') + '; color: #16241a' }; }),
      ciSave: (e) => { e.preventDefault(); set(s2 => ({ ciSaved: Object.assign({}, s2.ciSaved || {}, { [club]: Object.assign({}, saved, s2.ciDraft || {}) }), ciView: '', ciDraft: {} })); },
      tCiInviteText: T("You can enable self-registration for this group and then share the invitation code or link. Members who are not in the group must first be accepted by the group administrator. They will then appear in the 'Pending' tab where you can approve them as club members.", "Du kan aktivere selvregistrering for denne gruppen og deretter dele invitasjonskoden eller lenken. Medlemmer som ikke er i gruppen må først godtas av gruppeadministratoren. De vil da vises i 'Ubehandlet'-fanen hvor du kan godkjenne dem som klubbmedlem."),
      tCiSelfReg: T('Self-registration', 'Selvregistrering'), ciInvOn: inv.on, ciToggleInv: () => setInv({ on: !inv.on }), ciSwTrack: swv.t, ciSwKnob: swv.k,
      tCiCode: T('Invitation code', 'Invitasjonskode'), tCiLink: T('Link', 'Lenke'), tCiCopy: T('Copy', 'Kopier'), tCiNewCode: T('New code', 'Ny kode'), ciCode: inv.code.slice(0, 3) + ' ' + inv.code.slice(3), ciLink: link,
      ciNewCode: () => setInv({ code: String(Math.floor(100000 + Math.random() * 900000)) }), ciCopyCode: () => copy(inv.code, T('Code copied.', 'Koden er kopiert.')), ciCopyLink: () => copy(link, T('Link copied.', 'Lenken er kopiert.')), ciCopied: st.ciCopied || ''
    };
  },

  // ---- Minimal .xlsx writer (stored ZIP, inline strings) for settlement exports ----
  xlsxBook(sheets) {
    const enc = new TextEncoder();
    const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const col = (i) => { let n = i + 1, r = ''; while (n > 0) { const m = (n - 1) % 26; r = String.fromCharCode(65 + m) + r; n = Math.floor((n - 1) / 26); } return r; };
    const sheetXml = (sh) => {
      const rows = sh.rows.map((row, ri) => '<row r="' + (ri + 1) + '">' + row.map((cell, ci) => {
        if (cell === null || cell === undefined || cell === '') return '';
        const c = typeof cell === 'object' ? cell : { v: cell }, ref = col(ci) + (ri + 1), sty = c.s ? ' s="' + c.s + '"' : '';
        return typeof c.v === 'number' ? '<c r="' + ref + '"' + sty + '><v>' + c.v + '</v></c>' : '<c r="' + ref + '"' + sty + ' t="inlineStr"><is><t xml:space="preserve">' + esc(c.v) + '</t></is></c>';
      }).join('') + '</row>').join('');
      const cols = '<cols>' + sh.widths.map((w, i) => '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + w + '" customWidth="1"/>').join('') + '</cols>';
      return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"' + (sh.freeze ? '><pane ySplit="' + sh.freeze + '" topLeftCell="A' + (sh.freeze + 1) + '" activePane="bottomLeft" state="frozen"/></sheetView>' : '/>') + '</sheetViews>' + cols + '<sheetData>' + rows + '</sheetData></worksheet>';
    };
    const files = [
      ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' + sheets.map((x, i) => '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>').join('') + '</Types>'],
      ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
      ['xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' + sheets.map((x, i) => '<sheet name="' + esc(x.name) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>').join('') + '</sheets></workbook>'],
      ['xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + sheets.map((x, i) => '<Relationship Id="rId' + (i + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>').join('') + '<Relationship Id="rId' + (sheets.length + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
      ['xl/styles.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0"/></numFmts><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="14"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1F7A3A"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="164" fontId="2" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1"/></cellXfs></styleSheet>']
    ].concat(sheets.map((x, i) => ['xl/worksheets/sheet' + (i + 1) + '.xml', sheetXml(x)]));
    const table = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; table[n] = c >>> 0; }
    const crc = (b) => { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = table[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
    const parts = [], central = []; let offset = 0;
    files.forEach(f => {
      const name = enc.encode(f[0]), data = enc.encode(f[1]), c = crc(data);
      const lh = new DataView(new ArrayBuffer(30)); lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(8, 0, true); lh.setUint16(10, 0, true); lh.setUint16(12, 0x21, true); lh.setUint32(14, c, true); lh.setUint32(18, data.length, true); lh.setUint32(22, data.length, true); lh.setUint16(26, name.length, true); lh.setUint16(28, 0, true);
      parts.push(new Uint8Array(lh.buffer), name, data);
      const ch = new DataView(new ArrayBuffer(46)); ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true); ch.setUint16(10, 0, true); ch.setUint16(12, 0, true); ch.setUint16(14, 0x21, true); ch.setUint32(16, c, true); ch.setUint32(20, data.length, true); ch.setUint32(24, data.length, true); ch.setUint16(28, name.length, true); ch.setUint32(42, offset, true);
      central.push(new Uint8Array(ch.buffer), name);
      offset += 30 + name.length + data.length;
    });
    const cdSize = central.reduce((n, p) => n + p.length, 0);
    const eo = new DataView(new ArrayBuffer(22)); eo.setUint32(0, 0x06054b50, true); eo.setUint16(8, files.length, true); eo.setUint16(10, files.length, true); eo.setUint32(12, cdSize, true); eo.setUint32(16, offset, true);
    return new Blob(parts.concat(central, [new Uint8Array(eo.buffer)]), { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  },

  // ---- Økonomi › Oppgjørsrapporter (monthly settlement reports) ----
  adminSettleVals(c) {
    const en = c.en, st = this.state, set = (o) => this.setState(o), T = (a, b) => en ? a : b;
    const clubs = [['fana', 1, 'Hovedkonto', '7305']];
    const yearSel = st.stYear || 2026;
    const kr = (n) => 'kr ' + Math.round(n).toLocaleString('nb-NO').replace(/\u00a0/g, ' ');
    const pad = (n) => String(n).padStart(2, '0');
    const all = [];
    [2025, 2026].forEach(y => { for (let m = 0; m < 12; m++) { if (y === 2025 && m < 6) continue; if (y === 2026 && m > 9) continue;
      const wave = 1 + 0.35 * Math.sin((m + 1) * 1.3) + (m >= 7 && m <= 9 ? 0.25 : 0) + (m === 0 || m === 6 ? -0.3 : 0);
      const evDefs = [['Medlemsavgift', 'club', 500, 0.12, (mm) => 0.2 + (mm === 0 || mm === 7 || mm === 8 ? 0.22 : 0)], ['Lisens', 'club', 350, 0, (mm) => 0.05 + (mm <= 2 || mm === 7 ? 0.1 : 0)], ['Treningsavgift', 'group', 900, 0.1, (mm) => 0.3 + (mm === 0 || mm === 8 ? 0.15 : 0)], ['Turneringsavgift', 'group', 450, 0.05, (mm) => 0.06 + ([3, 4, 5, 8, 9].indexOf(mm) !== -1 ? 0.16 : 0)], ['Utstyr / drakt', 'group', 650, 0, (mm) => 0.03 + (mm === 7 || mm === 8 ? 0.1 : 0)], ['Dugnadsavgift', 'club', 600, 0, (mm) => 0.03 + (mm === 10 || mm === 3 ? 0.04 : 0)]];
      const wsum = evDefs.reduce((n, e) => n + e[4](m), 0);
      const mkLines = (cl) => evDefs.map(e => { const G = 86000 * wave * cl[1] * e[4](m) / wsum, n = Math.max(0, Math.round(G / (e[2] * (1 - e[3])))), fam = Math.round(n * e[2] * e[3]), gross = n * e[2] - fam, fee = Math.round(gross * 0.016); return { ev: e[0], scope: e[1], n: n, price: e[2], fam: fam, gross: gross, fee: fee, net: gross - fee }; }).filter(l => l.n > 0);
      clubs.forEach(cl => { const lines = mkLines(cl), sum = lines.reduce((n, l) => n + l.net, 0), last = new Date(y, m + 1, 0).getDate(), pm = m === 11 ? 0 : m + 1, py = m === 11 ? y + 1 : y, cur = y === 2026 && m === 9;
        all.push({ key: 'st' + y + m + cl[0], y: y, mi: m, club: cl[0], id: y + '-' + m + '-' + cl[0], sum: sum, lines: lines, created: pad(last) + '.' + pad(m + 1) + '.' + y, paid: cur ? T('Pending', 'Venter') : '05.' + pad(pm + 1) + '.' + py, cur: cur, accName: c.clubOf(cl[0]) + ' – ' + cl[2], accNo: '**' + cl[3] }); }); } });
    const fmt = (d) => pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear();
    const parseD = (v) => { const p = String(v || '').split('-'); return p.length === 3 && p[0] ? new Date(+p[0], +p[1] - 1, +p[2]) : null; };
    const fromD = parseD(st.stFrom), toD = parseD(st.stTo);
    const hasRange = !!(fromD || toD);
    const cd = (r) => { const p = r.created.split('.'); return new Date(+p[2], +p[1] - 1, +p[0]); };
    const base = hasRange ? all.filter(r => { const d = cd(r); return (!fromD || d >= fromD) && (!toD || d <= toD); }) : all.slice();
    const list = base.sort((a, b) => b.y - a.y || b.mi - a.mi || a.club.localeCompare(b.club));
    const sel = st.stSel || {}, chosen = list.filter(r => sel[r.id]);
    const total = list.reduce((n, r) => n + r.sum, 0), paidOut = list.filter(r => !r.cur).reduce((n, r) => n + r.sum, 0), pending = list.filter(r => r.cur).reduce((n, r) => n + r.sum, 0);
    const dl = (name, rows) => {
      const fromS = fromD ? fmt(fromD) : '', toS = toD ? fmt(toD) : '';
      const periodTxt = hasRange ? T('Period: ', 'Periode: ') + (fromS || '…') + ' – ' + (toS || '…') : T('Period: all settlements', 'Periode: alle oppgjør');
      const clubName = c.clubOf('fana');
      const sorted = rows.slice().sort((a, b) => (a.y - b.y) || (a.mi - b.mi));
      const H = (arr) => arr.map(v => ({ v: v, s: 1 })), N = (v) => ({ v: v, s: 2 });
      const top = (title) => [[{ v: clubName + ' – ' + title, s: 3 }], [periodTxt], []];
      const pd = (r) => r.cur ? T('Pending', 'Venter') : r.paid;
      // Utbetalinger
      const u = top(T('Payouts', 'Utbetalinger')); u.push(H([T('Payout date', 'Utbetalingsdato'), T('Event', 'Hendelse'), T('Count', 'Antall'), T('Price', 'Pris'), T('Family discount', 'Familierabatt'), T('Gross', 'Brutto'), T('Fees', 'Avgifter'), T('Net', 'Netto')]));
      const tot = { n: 0, fam: 0, gross: 0, fee: 0, net: 0 };
      sorted.forEach(r => r.lines.forEach(l => { u.push([pd(r), l.ev, N(l.n), N(l.price), N(-l.fam), N(l.gross), N(-l.fee), N(l.net)]); tot.n += l.n; tot.fam += l.fam; tot.gross += l.gross; tot.fee += l.fee; tot.net += l.net; }));
      u.push([]); u.push([{ v: T('Total', 'Sum'), s: 3 }, '', { v: tot.n, s: 4 }, '', { v: -tot.fam, s: 4 }, { v: tot.gross, s: 4 }, { v: -tot.fee, s: 4 }, { v: tot.net, s: 4 }]);
      // Betalinger klubb
      const kl = top(T('Club payments', 'Betalinger klubb')); kl.push(H([T('Payout date', 'Utbetalingsdato'), T('Payment', 'Betaling'), T('Method', 'Metode'), T('Count', 'Antall'), T('Gross', 'Brutto'), T('Fees', 'Avgifter'), T('Net', 'Netto')]));
      const meths = [['Vipps', 0.55], ['Kort', 0.3], ['Faktura', 0.15]]; const kt = { n: 0, g: 0, f: 0, nt: 0 };
      sorted.forEach(r => r.lines.filter(l => l.scope === 'club').forEach(l => { let rn = l.n, rg = l.gross, rf = l.fee; meths.forEach((mt, k) => { const last = k === meths.length - 1; const n = last ? rn : Math.round(l.n * mt[1]), g = last ? rg : Math.round(l.gross * mt[1]), f = last ? rf : Math.round(l.fee * mt[1]); rn -= n; rg -= g; rf -= f; if (n > 0) { kl.push([pd(r), l.ev, mt[0], N(n), N(g), N(-f), N(g - f)]); kt.n += n; kt.g += g; kt.f += f; kt.nt += g - f; } }); }));
      kl.push([]); kl.push([{ v: T('Total', 'Sum'), s: 3 }, '', '', { v: kt.n, s: 4 }, { v: kt.g, s: 4 }, { v: -kt.f, s: 4 }, { v: kt.nt, s: 4 }]);
      // Betalinger grupper
      const gr = top(T('Group payments', 'Betalinger grupper')); gr.push(H([T('Payout date', 'Utbetalingsdato'), T('Group', 'Gruppe'), T('Payment', 'Betaling'), T('Count', 'Antall'), T('Gross', 'Brutto'), T('Fees', 'Avgifter'), T('Net', 'Netto')]));
      const groups = [['G12', 0.14], ['G14', 0.2], ['G16', 0.18], ['J12', 0.12], ['J14', 0.14], ['Keeper', 0.08], ['Senior A', 0.14]]; const gt = { n: 0, g: 0, f: 0, nt: 0 };
      sorted.forEach(r => r.lines.filter(l => l.scope === 'group').forEach(l => { let rn = l.n, rg = l.gross, rf = l.fee; groups.forEach((gp, k) => { const last = k === groups.length - 1; const n = last ? rn : Math.round(l.n * gp[1]), g = last ? rg : Math.round(l.gross * gp[1]), f = last ? rf : Math.round(l.fee * gp[1]); rn -= n; rg -= g; rf -= f; if (n > 0) { gr.push([pd(r), gp[0], l.ev, N(n), N(g), N(-f), N(g - f)]); gt.n += n; gt.g += g; gt.f += f; gt.nt += g - f; } }); }));
      gr.push([]); gr.push([{ v: T('Total', 'Sum'), s: 3 }, '', '', { v: gt.n, s: 4 }, { v: gt.g, s: 4 }, { v: -gt.f, s: 4 }, { v: gt.nt, s: 4 }]);
      const blob = this.xlsxBook([{ name: 'Utbetalinger', rows: u, widths: [18, 24, 10, 10, 16, 14, 14, 14], freeze: 4 }, { name: 'Betalinger klubb', rows: kl, widths: [18, 24, 12, 10, 14, 14, 14], freeze: 4 }, { name: 'Betalinger grupper', rows: gr, widths: [18, 14, 24, 10, 14, 14, 14], freeze: 4 }]);
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
    };
    const chip = (on) => 'padding: 8px 15px; border-radius: 999px; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 13px; transition: background .2s, color .2s; border: 1px solid ' + (on ? '#16241a' : 'rgba(22,36,26,.2)') + '; background: ' + (on ? '#16241a' : '#ffffff') + '; color: ' + (on ? '#f6f8f3' : '#16241a');
    return {
      tStTitle: T('Settlement reports', 'Oppgjørsrapporter'), tStIntro: T('One settlement per month: all payments received through Vipps, card and invoices are collected and paid out to the club account.', 'Ett oppgjør per måned: alle innbetalinger via Vipps, kort og faktura samles og utbetales til klubbens konto.'),
      tStExport: T('Export list', 'Eksporter liste'), stExport: () => dl('oppgjorsrapporter.xlsx', list),
      stSums: [[T('Paid out in ' + yearSel, 'Utbetalt i ' + yearSel), kr(paidOut)], [T('Pending payout', 'Venter på utbetaling'), kr(pending)], [T('Settlements', 'Oppgjør'), String(list.length)]].map((k, i) => ({ key: 'sk' + i, label: k[0], value: k[1] })),
      stYears: [2026, 2025].map(y => ({ key: 'sy' + y, label: String(y), style: chip(yearSel === y), pick: () => set({ stYear: y, stSel: {} }) })),
      stShowing: T('Showing ' + list.length + ' settlements', 'Viser ' + list.length + ' oppgjør'),
      stFrom: st.stFrom || '', stTo: st.stTo || '', onStFrom: (e) => set({ stFrom: e.target.value, stSel: {} }), onStTo: (e) => set({ stTo: e.target.value, stSel: {} }),
      tStFrom: T('From', 'Fra'), tStTo: T('To', 'Til'), stHasRange: hasRange, tStClearRange: T('Clear period', 'Fjern periode'), stClearRange: () => set({ stFrom: '', stTo: '', stSel: {} }),
      stRange: hasRange ? T('Settlements created ', 'Oppgjør opprettet ') + (fromD ? fmt(fromD) : '…') + ' – ' + (toD ? fmt(toD) : '…') : '',
      tStPaid: T('Paid out', 'Utbetalt'), tStCreated: T('Created', 'Opprettet'), tStSum: 'Sum', tStAccName: T('Account name', 'Kontonavn'), tStAccNo: T('Account number', 'Kontonummer'), tSelectAll: T('Select all', 'Velg alle'), tStClear: T('Clear selection', 'Fjern valg'),
      stAllChecked: list.length > 0 && chosen.length === list.length, stToggleAll: () => set(s2 => { const cur = s2.stSel || {}; const every = list.length > 0 && list.every(r => cur[r.id]); const nx = {}; if (!every) list.forEach(r => { nx[r.id] = true; }); return { stSel: nx }; }),
      stSelAny: chosen.length > 0, stClearSel: () => set({ stSel: {} }), tStDlSel: T('Download selected', 'Last ned valgte'), stDownloadSel: () => dl('oppgjor-valgte.xlsx', chosen),
      stSelNote: T('Selected ' + chosen.length + (chosen.length === 1 ? ' settlement.' : ' settlements.'), 'Valgt ' + chosen.length + (chosen.length === 1 ? ' oppgjør.' : ' oppgjør.')),
      stRows: list.map(r => ({ key: r.key, checked: !!sel[r.id], bg: sel[r.id] ? '#eaf7ed' : 'transparent', toggle: () => set(s2 => { const nx = Object.assign({}, s2.stSel || {}); if (nx[r.id]) delete nx[r.id]; else nx[r.id] = true; return { stSel: nx }; }),
        paid: r.paid, paidStyle: r.cur ? 'color: #6b4a00; font-weight: 700' : 'color: rgba(22,36,26,.85)', created: r.created, sum: kr(r.sum), accName: r.accName, accNo: r.accNo })),
      stEmpty: list.length === 0, tStNone: T('No settlements for this selection.', 'Ingen oppgjør for dette valget.')
    };
  },

  // ---- Helpers from the Nov design (dashboard fit, timetable resize/week scope) ----
  dashFit() {
    if (!this._dashRs) { this._dashRs = () => this.dashFit(); window.addEventListener('resize', this._dashRs); }
    cancelAnimationFrame(this._dashRaf);
    this._dashRaf = requestAnimationFrame(() => {
      const els = document.querySelectorAll('[data-kza-split]');
      els.forEach(el => {
        const on = !!el.closest('[data-kza-root][data-dash="true"]') && window.innerWidth >= 981;
        if (!on) { if (el.style.height) el.style.height = ''; return; }
        const top = el.getBoundingClientRect().top + (window.scrollY || 0);
        const h = Math.max(380, Math.floor(window.innerHeight - top - 16)) + 'px';
        if (el.style.height !== h) el.style.height = h;
      });
    });
  },

  ttWatchResize() {
    if (this._ttRs) return;
    this._ttRs = () => { clearTimeout(this._ttRsT); this._ttRsT = setTimeout(() => this.forceUpdate(), 120); };
    window.addEventListener('resize', this._ttRs);
  },

  ttRowsOf(c) {
    if (this._ttScopeWeek) {
      c.wk = c.wk || {};
      if (!c.wk[this._ttWkKey]) c.wk[this._ttWkKey] = JSON.parse(JSON.stringify(c.s || []));
      return c.wk[this._ttWkKey];
    }
    return c.s || (c.s = []);
  },

};
