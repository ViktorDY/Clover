// Weekly training timetable shared between the admin portal and member pages.
// Stored in localStorage (same key as the design) so edits made by an admin
// show up for members in the same browser.

const KEY = 'kretz-timetable-v1';
const PALETTE = ['#74cd85', '#6cc3c1', '#8fb4ea', '#b9a3e8', '#ffd66e', '#f4a88a', '#9fd8a0', '#c7b3ef'];

function defaults() {
  return {
    vif: {
      groups: [
        { id: 'g10', no: 'G10 mix', en: 'U10 mixed', color: PALETTE[0] },
        { id: 'g12', no: 'J12', en: 'U12 girls', color: PALETTE[1] },
        { id: 'g14', no: 'J14', en: 'U14 girls', color: PALETTE[2] },
        { id: 'g16', no: 'G16', en: 'U16 boys', color: PALETTE[3] },
        { id: 'sen', no: 'Senior', en: 'Seniors', color: PALETTE[4] }
      ],
      s: [
        [0, '16:00', '17:00', 'g10', 'Leangen'], [0, '17:00', '18:30', 'g14', 'Leangen'], [0, '18:30', '20:00', 'g16', 'Leangen'],
        [1, '16:30', '17:45', 'g12', 'Jordal'], [1, '18:00', '19:30', 'sen', 'Jordal'],
        [2, '17:00', '18:30', 'g14', 'Jordal'], [2, '17:00', '18:30', 'g16', 'Leangen'], [2, '19:00', '20:30', 'sen', 'Leangen'],
        [3, '16:00', '17:00', 'g10', 'Leangen'], [3, '16:30', '17:45', 'g12', 'Leangen'], [3, '18:00', '19:30', 'g16', 'Jordal'],
        [4, '17:00', '18:30', 'g14', 'Leangen'],
        [5, '10:00', '11:30', 'g12', 'Jordal']
      ]
    },
    fana: {
      groups: [
        { id: 'g8', no: 'G8', en: 'U8', color: PALETTE[0] },
        { id: 'g12', no: 'G12', en: 'U12', color: PALETTE[1] },
        { id: 'kp', no: 'Keeper', en: 'Goalkeepers', color: PALETTE[2] },
        { id: 'g16', no: 'G16', en: 'U16', color: PALETTE[3] }
      ],
      s: [
        [0, '17:00', '18:00', 'g8', 'Fana kunstgress'], [0, '18:00', '19:30', 'g12', 'Fana kunstgress'],
        [1, '17:30', '18:30', 'kp', 'Fana kunstgress'], [1, '18:30', '20:00', 'g16', 'Fana kunstgress'],
        [2, '17:00', '18:00', 'g8', 'Fanahallen'], [2, '18:00', '19:30', 'g12', 'Fana kunstgress'],
        [3, '18:30', '20:00', 'g16', 'Fana kunstgress'], [3, '17:30', '18:30', 'kp', 'Fanahallen'],
        [4, '17:00', '18:30', 'g12', 'Fana kunstgress']
      ]
    },
    varden: {
      groups: [
        { id: 'kids', no: 'Barn 7–11', en: 'Kids 7–11', color: PALETTE[0] },
        { id: 'youth', no: 'Ungdom', en: 'Youth', color: PALETTE[1] },
        { id: 'open', no: 'Åpen hall', en: 'Open hall', color: PALETTE[2] },
        { id: 'elite', no: 'Elite', en: 'Elite', color: PALETTE[3] }
      ],
      s: [
        [0, '16:30', '17:30', 'kids', 'Vardenhallen'], [0, '18:00', '20:30', 'open', 'Vardenhallen'],
        [1, '17:00', '18:30', 'youth', 'Vardenhallen'], [1, '18:30', '20:30', 'elite', 'Vardenhallen'],
        [2, '16:30', '17:30', 'kids', 'Vardenhallen'], [2, '17:30', '19:00', 'youth', 'Vardenhallen'],
        [3, '18:00', '20:30', 'open', 'Vardenhallen'], [3, '18:30', '20:30', 'elite', 'Vardenhallen'],
        [5, '10:00', '13:00', 'open', 'Vardenhallen']
      ]
    }
  };
}

function load() {
  try {
    let raw = window.localStorage.getItem(KEY);
    if (raw) {
      let data = JSON.parse(raw);
      if (data && typeof data === 'object') return data;
    }
  } catch { /* storage unavailable */ }
  return defaults();
}

function save(data) {
  try { window.localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* storage unavailable */ }
  try { window.dispatchEvent(new CustomEvent('kretz-timetable', { detail: data })); } catch { /* storage unavailable */ }
}

function reset() {
  try { window.localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
  let d = defaults();
  try { window.dispatchEvent(new CustomEvent('kretz-timetable', { detail: d })); } catch { /* storage unavailable */ }
  return d;
}

function subscribe(fn) {
  let onStorage = function (e) { if (!e || e.key === KEY || e.key === null) fn(load()); };
  let onLocal = function () { fn(load()); };
  window.addEventListener('storage', onStorage);
  window.addEventListener('kretz-timetable', onLocal);
  return function () {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('kretz-timetable', onLocal);
  };
}

export const KretzTimetable = { KEY, PALETTE, defaults, load, save, reset, subscribe };
