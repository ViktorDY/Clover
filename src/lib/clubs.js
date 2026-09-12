/*
  Venue data for the booking flow, straight from the design canvas.

  `unit` drives the wording throughout the booking page ("bord" vs "baner"),
  which is why it carries both the plural and the singular form.
*/
export const VENUES = {
  bordtennis: {
    slug: "bordtennis",
    name: "Varden Bordtennisklubb",
    venue: "Vardenhallen",
    city: "Oslo",
    address: "Vardeveien 12, 0674 Oslo",
    count: 20,
    unit: { no: "bord", en: "tables" },
    unitOne: { no: "Bord", en: "Table" },
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
    price: 260,
    member: 160,
    about: {
      no: "8 innendørsbaner med grus, oppvarmet klubbhus og ballmaskin til utlån. Banene er åpne for medlemsbooking fra kl. 16 på hverdager.",
      en: "8 indoor clay courts, a heated clubhouse and a ball machine you can borrow. Courts open for member booking from 16:00 on weekdays.",
    },
  },
  vif: {
    slug: "vif",
    name: "Vålerenga Håndball",
    venue: "Bislett Hall",
    city: "Oslo",
    address: "Sofies gate 7, 0170 Oslo",
    count: 4,
    unit: { no: "baner", en: "courts" },
    unitOne: { no: "Bane", en: "Court" },
    price: 320,
    member: 0,
    about: {
      no: "Fire håndballbaner med tribune, garderober og styrkerom. Banene er åpne for medlemsbooking utenom lagenes faste treningstider.",
      en: "Four handball courts with seating, changing rooms and a weights room. Open for member booking outside the teams' fixed training slots.",
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

// The three clubs offered in the landing page's "book a hall" search.
export const BOOKABLE_CLUBS = [
  {
    slug: "bordtennis",
    icon: "BT",
    name: "Varden Bordtennisklubb",
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

export const BOOKING_DATES = [
  { no: "Tir 8. sep", en: "Tue 8 Sep" },
  { no: "Ons 9. sep", en: "Wed 9 Sep" },
  { no: "Tor 10. sep", en: "Thu 10 Sep" },
  { no: "Fre 11. sep", en: "Fri 11 Sep" },
  { no: "Lør 12. sep", en: "Sat 12 Sep" },
];

export const BOOKING_TIMES = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

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
