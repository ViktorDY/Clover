import { useEffect, useState } from "react";

/*
  Venue data for the booking flow, straight from the design canvas.

  `unit` drives the wording throughout the booking page ("bord" vs "baner"),
  which is why it carries both the plural and the singular form. `price` and
  `member` are only fallbacks: the bookable hours, prices and rules live in
  the venue store below, which the administrator panel edits.
*/
export const VENUES = {
  bordtennis: {
    slug: "bordtennis",
    name: "Varden BTK",
    venue: "Vardenhallen",
    city: "Oslo",
    address: "Vardeveien 12, 0674 Oslo",
    count: 20,
    unit: { no: "bord", en: "tables" },
    unitOne: { no: "Bord", en: "Table" },
    courts: false,
    price: 150,
    member: 90,
    about: {
      no: "20 faste bord, tribune for 180 og garderober i kjelleren. Hallen deles av klubbens lag på ettermiddagen og er åpen for medlemsbooking fra kl. 16.",
      en: "20 permanent tables, seating for 180 and changing rooms in the basement. The hall is shared with the club's own teams in the afternoon and opens for member booking at 16:00.",
    },
  },
  tennis: {
    slug: "tennis",
    name: "Nordstrand Tennisklubb",
    venue: "Nordstrandhallen",
    city: "Oslo",
    address: "Nordstrandveien 8, 1163 Oslo",
    count: 8,
    unit: { no: "baner", en: "courts" },
    unitOne: { no: "Bane", en: "Court" },
    courts: true,
    price: 260,
    member: 160,
    about: {
      no: "8 innendørsbaner med grus, oppvarmet klubbhus og ballmaskin til utlån. Banene er åpne for medlemsbooking fra kl. 16 på hverdager.",
      en: "8 indoor clay courts, a heated clubhouse and a ball machine you can borrow. Courts open for member booking from 16:00 on weekdays.",
    },
  },
  vif: {
    slug: "vif",
    name: "Lade Kunstløp",
    venue: "Leangen Ishall",
    city: "Trondheim",
    address: "Tungaveien 1, 7047 Trondheim",
    count: 4,
    unit: { no: "isflater", en: "rinks" },
    unitOne: { no: "Isflate", en: "Rink" },
    courts: true,
    price: 320,
    member: 180,
    about: {
      no: "Fire isflater med tribune, garderober og slipetjeneste. Isen er åpen for medlemsbooking utenom klubbens faste treningstider.",
      en: "Four rinks with seating, changing rooms and skate sharpening. The ice is open for member booking outside the club's fixed training times.",
    },
  },
  fana: {
    slug: "fana",
    name: "IL Fana Fotball",
    venue: "Fana kunstgress",
    city: "Bergen",
    address: "Fanaveien 120, 5244 Fana",
    count: 3,
    unit: { no: "baner", en: "pitches" },
    unitOne: { no: "Bane", en: "Pitch" },
    courts: true,
    pitches: true,
    price: 280,
    member: 0,
    about: {
      no: "Tre kunstgressbaner med lys, klubbhus og kiosk. Halv bane kan bookes på hverdager før kl. 16.",
      en: "Three floodlit artificial pitches, a clubhouse and a kiosk. Half a pitch can be booked on weekdays before 16:00.",
    },
  },
  biljard: {
    slug: "biljard",
    name: "Bergen Biljardklubb",
    venue: "Nøstet Biljardsenter",
    city: "Bergen",
    address: "Nøstegaten 44, 5011 Bergen",
    count: 14,
    unit: { no: "bord", en: "tables" },
    unitOne: { no: "Bord", en: "Table" },
    courts: false,
    price: 120,
    member: 70,
    about: {
      no: "14 turneringsbord i pool og snooker, kiosk og lagerplass for eget køutstyr. Senteret er åpent for medlemsbooking hele ettermiddagen.",
      en: "14 tournament pool and snooker tables, a kiosk and storage for your own cue. The centre is open for member booking all afternoon.",
    },
  },
};

export const DEFAULT_VENUE = "bordtennis";

export function getVenue(slug) {
  return VENUES[slug] || VENUES[DEFAULT_VENUE];
}

// What a venue includes when the club has not listed anything itself.
export const DEFAULT_INCLUDES = [
  { no: "Garderober", en: "Changing rooms" },
  { no: "Utlån av utstyr", en: "Equipment loan" },
  { no: "Trinnfri adkomst", en: "Step-free access" },
  { no: "Parkering", en: "Parking" },
];

// The clubs offered in the landing page's "book a hall" search.
export const BOOKABLE_CLUBS = [
  {
    slug: "vif",
    icon: "LK",
    name: "Lade Kunstløp",
    meta: { no: "Trondheim · Leangen Ishall · 4 isflater", en: "Trondheim · Leangen Ishall · 4 rinks" },
  },
  {
    slug: "fana",
    icon: "IF",
    name: "IL Fana Fotball",
    meta: { no: "Bergen · Fana kunstgress · 3 baner", en: "Bergen · Fana turf · 3 pitches" },
  },
  {
    slug: "bordtennis",
    icon: "BT",
    name: "Varden BTK",
    meta: { no: "Oslo · Vardenhallen · 20 bord", en: "Oslo · Vardenhallen · 20 tables" },
  },
  {
    slug: "tennis",
    icon: "TK",
    name: "Nordstrand Tennisklubb",
    meta: { no: "Oslo · Nordstrandhallen · 8 baner", en: "Oslo · Nordstrandhallen · 8 courts" },
  },
  {
    slug: "biljard",
    icon: "BK",
    name: "Bergen Biljardklubb",
    meta: { no: "Bergen · Nøstet · 14 bord", en: "Bergen · Nøstet · 14 tables" },
  },
];

/*
  Which units are already booked. Deterministic from the chosen date and
  time so the grid stays stable while you click around, and roughly a
  quarter of the hall is always taken.
*/
export function takenUnits(count, dateIndex, timeIndex) {
  const seed = dateIndex * 7 + timeIndex * 3;
  const taken = new Set();
  const n = Math.max(2, Math.round(count * 0.26));
  for (let i = 0; i < n; i++) {
    taken.add(((seed + i * 5 + i * i) % count) + 1);
  }
  return taken;
}

/* ---- Shared stores ---------------------------------------------------------

  The canvas keeps two small stores in localStorage that the administrator
  panel writes and the member-facing pages read: the venues' opening hours,
  prices and rules (kretz-venues-v1) and the clubs' weekly timetables
  (kretz-timetable-v1). Same keys, same shapes and same change events as the
  canvas's kretz-venues.js / kretz-timetable.js, so anything that edits them
  is picked up live — also across tabs.

  Weekdays are Monday-first: 0 = Monday … 6 = Sunday.
*/

const VENUE_KEY = "kretz-venues-v1";
const VENUE_EVENT = "kretz-venues";
const TIMETABLE_KEY = "kretz-timetable-v1";
const TIMETABLE_EVENT = "kretz-timetable";

function hoursAll(weekday, saturday, sunday) {
  return {
    0: weekday,
    1: weekday,
    2: weekday,
    3: weekday,
    4: weekday,
    5: saturday,
    6: sunday,
  };
}

function venueRules(extra) {
  return {
    closed: {},
    slotMin: 60,
    leadDays: 14,
    note: "",
    cancelHours: 2,
    about: "",
    includes: [],
    unavailable: [],
    ...extra,
  };
}

export function defaultVenueStore() {
  const evening = ["16:00", "22:00"];
  const friday = ["16:00", "21:00"];
  return {
    vif: venueRules({
      hours: { ...hoursAll(evening, ["09:00", "18:00"], ["10:00", "18:00"]), 4: friday },
      price: 320,
      memberPrice: 180,
      maxHours: 2,
    }),
    fana: venueRules({
      hours: { ...hoursAll(evening, ["09:00", "18:00"], ["10:00", "18:00"]), 4: friday },
      price: 450,
      memberPrice: 250,
      maxHours: 2,
    }),
    bordtennis: venueRules({
      hours: hoursAll(["10:00", "22:00"], ["10:00", "20:00"], ["10:00", "20:00"]),
      price: 120,
      memberPrice: 60,
      maxHours: 3,
    }),
    tennis: venueRules({
      hours: hoursAll(["07:00", "23:00"], ["08:00", "22:00"], ["08:00", "22:00"]),
      price: 280,
      memberPrice: 160,
      maxHours: 2,
    }),
    biljard: venueRules({
      hours: {
        ...hoursAll(["12:00", "23:00"], ["12:00", "01:00"], ["12:00", "22:00"]),
        4: ["12:00", "01:00"],
      },
      price: 160,
      memberPrice: 90,
      maxHours: 3,
    }),
  };
}

function readJson(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && typeof data === "object" ? data : null;
  } catch {
    // Unreadable or blocked storage: fall back to the defaults.
    return null;
  }
}

function subscribeTo(key, eventName, read, fn) {
  const onStorage = (event) => {
    if (!event || event.key === key || event.key === null) fn(read());
  };
  const onLocal = () => fn(read());
  window.addEventListener("storage", onStorage);
  window.addEventListener(eventName, onLocal);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(eventName, onLocal);
  };
}

function writeJson(key, eventName, data) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Not persisted, but the page that saved still shows the change.
  }
  try {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  } catch {
    // Old browsers without CustomEvent: other listeners simply miss it.
  }
}

export function loadVenueStore() {
  const base = defaultVenueStore();
  const saved = readJson(VENUE_KEY);
  if (saved) {
    Object.keys(saved).forEach((slug) => {
      base[slug] = { ...(base[slug] || {}), ...saved[slug] };
    });
  }
  return base;
}

export function saveVenueStore(data) {
  writeJson(VENUE_KEY, VENUE_EVENT, data);
}

export function subscribeVenueStore(fn) {
  return subscribeTo(VENUE_KEY, VENUE_EVENT, loadVenueStore, fn);
}

/* Helpers mirroring the canvas's KretzVenues API. */

export function toMinutes(time) {
  const [h, m] = String(time || "0:0").split(":");
  const minutes = parseInt(h, 10) * 60 + parseInt(m, 10);
  return Number.isNaN(minutes) ? 0 : minutes;
}

export function venueHoursFor(venue, weekday) {
  const hours = venue && venue.hours && venue.hours[weekday];
  return hours && hours[0] && hours[1] ? hours : null;
}

export function venueIsClosed(venue, iso) {
  return !!(venue && venue.closed && venue.closed[iso]);
}

export function venueSlotsFor(venue, weekday, iso) {
  if (!venue || venueIsClosed(venue, iso)) return [];
  const hours = venueHoursFor(venue, weekday);
  if (!hours) return [];
  const start = toMinutes(hours[0]);
  let end = toMinutes(hours[1]);
  if (end <= start) end += 24 * 60;
  const step = venue.slotMin || 60;
  const out = [];
  for (let m = start; m + step <= end; m += step) {
    const hh = Math.floor((m % 1440) / 60);
    const mm = m % 60;
    out.push(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return out;
}

export function venueUnitsOff(venue, weekday) {
  const always = (venue && venue.unavailable) || [];
  const day = (venue && venue.dayUnits && venue.dayUnits[weekday]) || [];
  return always.concat(day.filter((n) => !always.includes(n)));
}

export function venueCanBook(venue, time, isMember) {
  if (!venue) return true;
  const audience = venue.audience || "all";
  if (audience === "members") return !!isMember;
  if (audience === "window" && venue.memberWindow && time) {
    const t = toMinutes(time);
    if (t >= toMinutes(venue.memberWindow[0]) && t < toMinutes(venue.memberWindow[1])) {
      return !!isMember;
    }
  }
  return true;
}

export function venueUnitAudience(venue, unit, weekday) {
  const dayMembers = (venue && venue.dayAudience && venue.dayAudience[weekday]) || [];
  if (weekday != null && dayMembers.includes(unit)) return "members";
  return ((venue && venue.unitAudience) || {})[unit] || "all";
}

export function venueManualTaken(venue, iso, time) {
  return ((venue && venue.manual) || [])
    .filter((entry) => entry.date === iso && entry.time === time)
    .map((entry) => entry.unit);
}

export function venueLeadDays(venue, isMember) {
  if (!venue) return 14;
  return isMember && venue.memberEarly ? Math.max(30, venue.leadDays || 14) : venue.leadDays || 14;
}

/* Timetables: the fixed weekly training plan for each member club. */

const PALETTE = ["#74cd85", "#6cc3c1", "#8fb4ea", "#b9a3e8", "#ffd66e", "#f4a88a", "#9fd8a0", "#c7b3ef"];

export function defaultTimetableStore() {
  return {
    vif: {
      groups: [
        { id: "g10", no: "G10 mix", en: "U10 mixed", color: PALETTE[0] },
        { id: "g12", no: "J12", en: "U12 girls", color: PALETTE[1] },
        { id: "g14", no: "J14", en: "U14 girls", color: PALETTE[2] },
        { id: "g16", no: "G16", en: "U16 boys", color: PALETTE[3] },
        { id: "sen", no: "Senior", en: "Seniors", color: PALETTE[4] },
      ],
      s: [
        [0, "16:00", "17:00", "g10", "Leangen"],
        [0, "17:00", "18:30", "g14", "Leangen"],
        [0, "18:30", "20:00", "g16", "Leangen"],
        [1, "16:30", "17:45", "g12", "Jordal"],
        [1, "18:00", "19:30", "sen", "Jordal"],
        [2, "17:00", "18:30", "g14", "Jordal"],
        [2, "17:00", "18:30", "g16", "Leangen"],
        [2, "19:00", "20:30", "sen", "Leangen"],
        [3, "16:00", "17:00", "g10", "Leangen"],
        [3, "16:30", "17:45", "g12", "Leangen"],
        [3, "18:00", "19:30", "g16", "Jordal"],
        [4, "17:00", "18:30", "g14", "Leangen"],
        [5, "10:00", "11:30", "g12", "Jordal"],
      ],
    },
    fana: {
      groups: [
        { id: "g8", no: "G8", en: "U8", color: PALETTE[0] },
        { id: "g12", no: "G12", en: "U12", color: PALETTE[1] },
        { id: "kp", no: "Keeper", en: "Goalkeepers", color: PALETTE[2] },
        { id: "g16", no: "G16", en: "U16", color: PALETTE[3] },
      ],
      s: [
        [0, "17:00", "18:00", "g8", "Fana kunstgress"],
        [0, "18:00", "19:30", "g12", "Fana kunstgress"],
        [1, "17:30", "18:30", "kp", "Fana kunstgress"],
        [1, "18:30", "20:00", "g16", "Fana kunstgress"],
        [2, "17:00", "18:00", "g8", "Fanahallen"],
        [2, "18:00", "19:30", "g12", "Fana kunstgress"],
        [3, "18:30", "20:00", "g16", "Fana kunstgress"],
        [3, "17:30", "18:30", "kp", "Fanahallen"],
        [4, "17:00", "18:30", "g12", "Fana kunstgress"],
      ],
    },
    varden: {
      groups: [
        { id: "kids", no: "Barn 7–11", en: "Kids 7–11", color: PALETTE[0] },
        { id: "youth", no: "Ungdom", en: "Youth", color: PALETTE[1] },
        { id: "open", no: "Åpen hall", en: "Open hall", color: PALETTE[2] },
        { id: "elite", no: "Elite", en: "Elite", color: PALETTE[3] },
      ],
      s: [
        [0, "16:30", "17:30", "kids", "Vardenhallen"],
        [0, "18:00", "20:30", "open", "Vardenhallen"],
        [1, "17:00", "18:30", "youth", "Vardenhallen"],
        [1, "18:30", "20:30", "elite", "Vardenhallen"],
        [2, "16:30", "17:30", "kids", "Vardenhallen"],
        [2, "17:30", "19:00", "youth", "Vardenhallen"],
        [3, "18:00", "20:30", "open", "Vardenhallen"],
        [3, "18:30", "20:30", "elite", "Vardenhallen"],
        [5, "10:00", "13:00", "open", "Vardenhallen"],
      ],
    },
  };
}

export const TIMETABLE_PALETTE = PALETTE;

export function loadTimetableStore() {
  return readJson(TIMETABLE_KEY) || defaultTimetableStore();
}

export function saveTimetableStore(data) {
  writeJson(TIMETABLE_KEY, TIMETABLE_EVENT, data);
}

export function subscribeTimetableStore(fn) {
  return subscribeTo(TIMETABLE_KEY, TIMETABLE_EVENT, loadTimetableStore, fn);
}

/* React bindings: the current store, re-read whenever it changes. */

export function useVenueStore() {
  const [store, setStore] = useState(loadVenueStore);
  useEffect(() => subscribeVenueStore(setStore), []);
  return store;
}

export function useTimetableStore() {
  const [store, setStore] = useState(loadTimetableStore);
  useEffect(() => subscribeTimetableStore(setStore), []);
  return store;
}
