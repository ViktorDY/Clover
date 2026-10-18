/*
  Seed content for the member dashboard, transcribed from the design canvas.

  Every user-facing string is a { no, en } pair so the NO/EN toggle works
  across the whole dashboard (`pick` in lib/pick.js reads either form). There
  is no backend for club data yet, so the dashboard treats this as its
  starting state and changes it in React state.

  The demo lives in a fixed week: "today" is Saturday 12 September 2026.
*/

export const TODAY = { year: 2026, m: 9, day: 12 };

export const MEMBER_CLUBS = [
  { slug: "vif", name: "Lade Kunstløp", short: "Lade Kunstløp" },
  { slug: "fana", name: "IL Fana Fotball", short: "IL Fana" },
  { slug: "varden", name: "Varden BTK", short: "Varden" },
];

export function clubShort(slug) {
  return (MEMBER_CLUBS.find((c) => c.slug === slug) || {}).short || "";
}

export function clubName(slug) {
  return (MEMBER_CLUBS.find((c) => c.slug === slug) || {}).name || "";
}

// Varden's bookable venue is registered under the bordtennis slug.
export function bookingSlugFor(club) {
  return club === "varden" ? "bordtennis" : club;
}

export const GROUPS = {
  vif: [
    { id: "g14", name: { no: "G14 jenter", en: "U14 girls" } },
    { id: "dugnad", name: { no: "Dugnadsgruppa", en: "Volunteer crew" } },
  ],
  fana: [{ id: "keeper", name: { no: "Keepergruppa", en: "Goalkeepers" } }],
  varden: [
    { id: "open", name: { no: "Åpen hall", en: "Open hall" } },
    { id: "turnering", name: { no: "Turneringsgruppa", en: "Tournament crew" } },
  ],
};

export function groupsFor(slug) {
  return GROUPS[slug] || [];
}

const same = (text) => ({ no: text, en: text });

/*
  Activities run September–December 2026. `locked` marks the ones too far
  out to answer yet — the calendar still shows them, but they do not open.
  kind: "signed" (already signed up), "pending" (answer missing), "dugnad"
  (volunteer shift) or "tournament" (has an entry fee to pay).
*/
export const ACTIVITIES = [
  { id: "a1", club: "vif", group: "g14", m: 9, day: 12, title: { no: "G14 trening", en: "U14 training" }, place: same("Leangen"), time: same("18:00–19:30"), leader: "ahmed", cap: 22, joined: 18, kind: "signed" },
  { id: "a2", club: "fana", group: "keeper", m: 9, day: 13, title: { no: "Keepertrening", en: "Goalkeeper session" }, place: { no: "Fana kunstgress", en: "Fana turf" }, time: same("17:00–18:15"), leader: "nora", cap: 8, joined: 5, kind: "signed" },
  { id: "a3", club: "vif", group: "g14", m: 9, day: 16, title: { no: "Seriekamp mot Skjetten", en: "League match vs Skjetten" }, place: same("Jordal"), time: same("19:00–20:30"), leader: "ahmed", cap: 16, joined: 14, kind: "signed" },
  { id: "a4", club: "varden", group: "open", m: 9, day: 18, title: { no: "Bordtennis, åpen hall", en: "Table tennis, open hall" }, place: same("Vardenhallen"), time: same("16:00–20:00"), leader: "thomas", cap: 40, joined: 12, kind: "signed" },
  { id: "a5", club: "vif", group: "dugnad", m: 9, day: 21, title: { no: "Kioskvakt, hjemmekamp", en: "Kiosk shift, home game" }, place: same("Leangen"), time: same("16:00–20:00"), leader: "board", cap: 6, joined: 4, kind: "dugnad" },
  { id: "a6", club: "fana", group: "keeper", m: 9, day: 27, title: { no: "Treningsleir, dag 1", en: "Training camp, day 1" }, place: same("Hamar"), time: { no: "hele dagen", en: "all day" }, leader: "camp", cap: 30, joined: 21, kind: "pending" },
  { id: "a7", club: "varden", group: "turnering", m: 9, day: 29, title: { no: "Dugnad: rigging til turnering", en: "Volunteer shift: tournament setup" }, place: same("Vardenhallen"), time: same("17:00–20:00"), leader: "ida", cap: 12, joined: 7, kind: "dugnad", locked: true },
  { id: "a8", club: "vif", group: "dugnad", m: 9, day: 30, title: { no: "Høstturneringen", en: "Autumn tournament" }, place: same("Jordal"), time: { no: "hele dagen", en: "all day" }, leader: "board", cap: 24, joined: 0, kind: "tournament", fee: 250 },
  { id: "a9", club: "vif", group: "g14", m: 10, day: 3, title: { no: "Seriekamp mot Nordstrand", en: "League match vs Nordstrand" }, place: same("Leangen"), time: same("14:00–15:30"), leader: "ahmed", cap: 16, joined: 9, kind: "pending", locked: true },
  { id: "a10", club: "varden", group: "turnering", m: 10, day: 3, title: { no: "Turnering, Varden Open", en: "Tournament, Varden Open" }, place: same("Vardenhallen"), time: { no: "hele dagen", en: "all day" }, leader: "ida", cap: 64, joined: 38, kind: "tournament", fee: 350 },
  { id: "a11", club: "fana", group: "keeper", m: 10, day: 12, title: { no: "Høstferieleir", en: "Autumn break camp" }, place: same("Fana"), time: same("10:00–15:00"), leader: "camp", cap: 40, joined: 12, kind: "pending", locked: true },
  { id: "a12", club: "vif", group: "dugnad", m: 11, day: 7, title: { no: "Klubbkveld og premieutdeling", en: "Club evening and awards" }, place: same("Leangen"), time: same("18:00–21:00"), leader: "board", cap: 120, joined: 44, kind: "pending", locked: true },
];

/*
  The people behind activities and invoices, opened from "Ansvarlig" and
  "Kontaktperson". `thread` points at an existing conversation; without one,
  "Send melding" starts a new direct chat.
*/
const BOARD_EMAIL = { vif: "styret@ladekunstlop.no", fana: "styret@ilfana.no", varden: "styret@vardenbtk.no" };

export function leaderFor(key, club) {
  const people = {
    ahmed: { key: "ahmed", name: { no: "Trener Ahmed", en: "Coach Ahmed" }, role: { no: "Trener · G14", en: "Coach · G14" }, club: "vif", phone: "+47 900 11 222", email: "ahmed@ladekunstlop.no" },
    thomas: { key: "thomas", name: same("Thomas Lie"), role: { no: "Hallansvarlig", en: "Hall manager" }, club: "varden", phone: "+47 900 33 444", email: "thomas@vardenbtk.no", thread: "t4" },
    nora: { key: "nora", name: { no: "Trener Nora", en: "Coach Nora" }, role: { no: "Keepertrener", en: "Goalkeeper coach" }, club: "fana", phone: "+47 900 55 666", email: "nora@ilfana.no" },
    camp: { key: "camp", name: { no: "Leirkomiteen", en: "Camp committee" }, role: { no: "Komité · 12 medlemmer", en: "Committee · 12 members" }, club: "fana", phone: "+47 900 77 888", email: "leir@ilfana.no" },
    ida: { key: "ida", name: same("Ida K."), role: { no: "Turneringsansvarlig", en: "Tournament lead" }, club: "varden", phone: "+47 900 22 818", email: "ida@vardenbtk.no" },
  };
  if (people[key]) return people[key];
  return {
    key: `board-${club}`,
    name: { no: "Styret", en: "The board" },
    role: { no: "Styret", en: "Board" },
    club,
    phone: "+47 900 99 000",
    email: BOARD_EMAIL[club] || "styret@kretz.no",
  };
}

export const PAYMENTS = [
  {
    id: "p-vif-host",
    club: "vif",
    title: { no: "Kontingent høst 2026", en: "Club dues, autumn 2026" },
    date: { no: "Forfaller 20. sep", en: "Due 20 Sep" },
    due: { no: "20. sep", en: "20 Sep" },
    amount: 1450,
    paid: false,
    info: {
      sent: { no: "1. sep", en: "1 Sep" },
      dueOn: { no: "20. sep", en: "20 Sep" },
      text: { no: "Høstkontingenten dekker treninger, dommer- og hallkostnader for sesongen. Betal med Vipps eller kort i Kretz for å unngå purregebyr.", en: "The autumn dues cover training, referee and hall costs for the season. Pay with Vipps or card in Kretz to avoid a reminder fee." },
      who: "Marit Solberg",
      role: { no: "Kasserer", en: "Treasurer" },
      phone: "+47 912 34 567",
      child: "Emma",
      ref: "KID 2026 0914 0021",
    },
  },
  {
    id: "p-vif-member",
    club: "vif",
    title: { no: "Medlemsavgift 2026", en: "Membership fee 2026" },
    date: { no: "Betalt 3. jan", en: "Paid 3 Jan" },
    amount: 350,
    paid: true,
    info: {
      sent: { no: "15. des", en: "15 Dec" },
      dueOn: { no: "10. jan", en: "10 Jan" },
      text: { no: "Årlig medlemsavgift til Lade Kunstløp. Gir stemmerett på årsmøtet og forsikring gjennom idrettsforbundet.", en: "Annual membership fee to Lade Kunstløp. Gives voting rights at the annual meeting and insurance through the sports federation." },
      who: "Marit Solberg",
      role: { no: "Kasserer", en: "Treasurer" },
      phone: "+47 912 34 567",
      child: "Emma",
      ref: "KID 2026 0101 0007",
    },
  },
  {
    id: "p-fana-member",
    club: "fana",
    title: { no: "Medlemsavgift 2026", en: "Membership fee 2026" },
    date: { no: "Betalt 2. sep", en: "Paid 2 Sep" },
    amount: 400,
    paid: true,
    info: {
      sent: { no: "20. aug", en: "20 Aug" },
      dueOn: { no: "5. sep", en: "5 Sep" },
      text: { no: "Medlemsavgift for IL Fana. Gjelder alle medlemmer i klubben og fornyes hvert år.", en: "Membership fee for IL Fana. Applies to all club members and renews every year." },
      who: "Leif Haugen",
      role: { no: "Kasserer", en: "Treasurer" },
      phone: "+47 934 11 208",
      child: "Emma",
      ref: "KID 2026 0830 0113",
    },
  },
  {
    id: "p-fana-hoodie",
    club: "fana",
    title: { no: "Klubbgenser (bestilt)", en: "Club hoodie (ordered)" },
    date: { no: "Forfaller 25. sep", en: "Due 25 Sep" },
    due: { no: "25. sep", en: "25 Sep" },
    amount: 549,
    paid: false,
    info: {
      sent: { no: "8. sep", en: "8 Sep" },
      dueOn: { no: "25. sep", en: "25 Sep" },
      text: { no: "Klubbgenseren du bestilte i nettbutikken er på vei. Betalingen må være registrert før utlevering på treningen.", en: "The club hoodie you ordered from the web shop is on its way. Payment must be registered before it is handed out at training." },
      who: "Leif Haugen",
      role: { no: "Ansvarlig klubbtøy", en: "Merch manager" },
      phone: "+47 934 11 208",
      child: "Emma",
      ref: "Ordre #1187",
    },
  },
  {
    id: "p-varden-member",
    club: "varden",
    title: { no: "Medlemsavgift 2026", en: "Membership fee 2026" },
    date: { no: "Forfaller 28. sep", en: "Due 28 Sep" },
    due: { no: "28. sep", en: "28 Sep" },
    amount: 450,
    paid: false,
    info: {
      sent: { no: "10. sep", en: "10 Sep" },
      dueOn: { no: "28. sep", en: "28 Sep" },
      text: { no: "Medlemsavgift for Varden BTK. Pengene går til vedlikehold av hallen og utstyr.", en: "Membership fee for Varden BTK. The money goes to hall maintenance and equipment." },
      who: "Thomas Lie",
      role: { no: "Hallansvarlig", en: "Hall manager" },
      phone: "+47 905 77 310",
      child: "Emma",
      ref: "KID 2026 0910 0064",
    },
  },
  {
    id: "p-vif-kit",
    club: "vif",
    title: { no: "Klubbtøy (merch)", en: "Club kit (merch)" },
    date: { no: "Betalt 18. aug", en: "Paid 18 Aug" },
    amount: 890,
    paid: true,
    info: {
      sent: { no: "2. aug", en: "2 Aug" },
      dueOn: { no: "20. aug", en: "20 Aug" },
      text: { no: "Treningsjakke og drakt fra klubbens nettbutikk. Betalt og utlevert.", en: "Training jacket and kit from the club web shop. Paid and handed out." },
      who: "Marit Solberg",
      role: { no: "Kasserer", en: "Treasurer" },
      phone: "+47 912 34 567",
      child: "Emma",
      ref: "Ordre #1042",
    },
  },
];

// The contact person on an invoice, in the same shape as leaderFor().
export function payContact(payment) {
  const who = payment.info.who;
  const first = who.split(" ")[0].toLowerCase();
  const domain = payment.club === "fana" ? "ilfana" : payment.club === "varden" ? "vardenbtk" : "ladekunstlop";
  return {
    key: first,
    name: same(who),
    role: payment.info.role,
    club: payment.club,
    phone: payment.info.phone,
    email: `${first}@${domain}.no`,
    thread: who === "Thomas Lie" ? "t4" : "",
  };
}

// The yellow "Viktig fra styret" card on the home page shows the first match.
export const BOARD_NOTICES = [
  { club: "vif", title: { no: "Dugnaden flyttes til lørdag 20. sept", en: "Dugnad moved to Saturday 20 Sept" }, text: { no: "Vi trenger to voksne til til kiosken — meld deg på under Aktiviteter.", en: "We need two more adults for the kiosk — sign up under Activities." }, when: { no: "Styret · i dag", en: "Board · today" } },
  { club: "varden", title: { no: "Kontingent forfaller 30. sept", en: "Membership fees due 30 Sept" }, text: { no: "Betal i appen med Vipps for å unngå purregebyr.", en: "Pay in the app with Vipps to avoid a reminder fee." }, when: { no: "Styret · i går", en: "Board · yesterday" } },
  { club: "fana", title: { no: "Nye treningstider fra oktober", en: "New training times from October" }, text: { no: "Ukeplanen er oppdatert — sjekk gruppa di.", en: "The week plan is updated — check your group." }, when: { no: "Styret · for 2 dager siden", en: "Board · 2 days ago" } },
];

/*
  Notifications. `go` says where tapping one takes you: the week plan, the
  home page (payments), a message thread, an activity or the booking page.
*/
export const NOTICES = [
  { id: "n1", club: "vif", from: "coach", unread: true, isNew: true, tone: "green", go: "plan", text: { no: "Treneren har flyttet torsdagstreningen til 17:30.", en: "The coach moved Thursday training to 17:30." }, detail: { no: "Torsdagstreningen starter nå 17:30 i stedet for 17:00. Ta med begge draktene. Ukeplanen er oppdatert.", en: "Thursday training now starts at 17:30 instead of 17:00. Bring both jerseys. The week plan has been updated." }, cta: { no: "Åpne ukeplan", en: "Open week plan" }, when: { no: "for 2 timer siden", en: "2 hours ago" } },
  { id: "n2", club: "vif", from: "board", unread: true, isNew: true, tone: "amber", go: "home", text: { no: "Faktura for høstkontingenten forfaller om 8 dager.", en: "The autumn fee invoice is due in 8 days." }, detail: { no: "Høstkontingenten på kr 1 450 forfaller 20. september. Betal med Vipps i appen for å unngå purregebyr.", en: "The autumn fee of kr 1 450 is due on 20 September. Pay with Vipps in the app to avoid a reminder fee." }, cta: { no: "Gå til betaling", en: "Go to payment" }, when: { no: "i går", en: "yesterday" } },
  { id: "n3", club: "fana", from: "board", unread: true, tone: "grey", go: "msg", thread: "t3", text: { no: "Ny melding fra styret om treningsleiren.", en: "New message from the board about the training camp." }, detail: { no: "Leirkomiteen trenger svar om treningsleiren innen fredag.", en: "The camp committee needs your reply about the training camp before Friday." }, cta: { no: "Åpne meldingen", en: "Open message" }, when: { no: "10. sep", en: "10 Sep" } },
  { id: "n4", club: "varden", from: "board", tone: "amber", go: "book", text: { no: "Halleien for høsten er nå tilgjengelig.", en: "Hall rent for the autumn is now available." }, detail: { no: "Nye tider for høsten kan bookes i Vardenhallen, mandag til fredag.", en: "New slots for the autumn are open for booking in Vardenhallen, Monday to Friday." }, cta: { no: "Åpne booking", en: "Open booking" }, when: { no: "9. sep", en: "9 Sep" } },
  { id: "n5", club: "vif", from: "board", tone: "grey", go: "event", activity: "a5", text: { no: "Kioskvakten din 21. september er bekreftet.", en: "Your kiosk shift on 21 September is confirmed." }, detail: { no: "Kioskvakt, hjemmekamp på Leangen, 16:00–20:00. Styret har deg på listen.", en: "Kiosk shift, home game at Leangen, 16:00–20:00. The board has you on the list." }, cta: { no: "Åpne arrangement", en: "Open event" }, when: { no: "8. sep", en: "8 Sep" } },
  { id: "n6", club: "fana", from: "coach", tone: "grey", go: "msg", thread: "t6", text: { no: "Trener Nora: Husk hansker til keepertreningen.", en: "Coach Nora: bring gloves for keeper training." }, detail: { no: "Trener Nora minner keeperteamet på å ta med hansker til treningen på mandag.", en: "Trainer Nora reminds the keeper team to bring gloves to Monday training." }, cta: { no: "Åpne meldingen", en: "Open message" }, when: { no: "7. sep", en: "7 Sep" } },
];

/*
  Club posts. `priority: "high"` floats a post into its own band; `from`
  drives the coach/board filters; `photo` reserves room for a picture.
*/
export const POSTS = [
  { id: "p1", club: "vif", from: "board", priority: "high", photo: true, when: { no: "for 2 dager siden", en: "2 days ago" }, title: { no: "Sesongåpningen endte 24–21", en: "Season opener ended 24–21" }, text: { no: "Fullsatt Leangen så jentene snu kampen på de siste ti minuttene. Takk til alle som møtte opp — og til foreldrene som holdt kiosken gående hele kvelden.", en: "A packed Leangen saw the girls turn the game around in the last ten minutes. Thanks to everyone who showed up — and to the parents who ran the kiosk all evening." }, likes: 48, comments: 6 },
  { id: "p2", club: "varden", from: "board", priority: "high", photo: false, when: { no: "forrige uke", en: "last week" }, title: { no: "Turneringen trenger tolv frivillige", en: "Tournament needs twelve volunteers" }, text: { no: "Meld deg på en vakt 3. oktober — to timer hver, og kioskpengene går rett tilbake til klubben.", en: "Sign up for a shift on 3 October — two hours each, and the kiosk money goes straight back into the club." }, likes: 17, comments: 9 },
  { id: "p3", club: "fana", from: "coach", priority: "normal", photo: true, when: { no: "for 4 dager siden", en: "4 days ago" }, title: { no: "Ny sponsor for ungdomslagene", en: "New sponsor for the youth teams" }, text: { no: "Fra oktober får alle lag fra G12 og opp nytt treningstøy, finansiert av vår nye lokale partner.", en: "From October, all teams from U12 up get new training kit — funded by our new local partner." }, likes: 31, comments: 3 },
  { id: "p4", club: "vif", from: "coach", priority: "normal", photo: false, when: { no: "for en uke siden", en: "1 week ago" }, title: { no: "Halltidene for høsten er satt", en: "Hall times for the autumn are set" }, text: { no: "Hele planen ligger i kalenderen. Si fra til treneren om en tid ser feil ut for gruppa di.", en: "The full schedule is in the calendar. Ask your coach if a slot looks wrong for your group." }, likes: 12, comments: 2 },
];

export const POST_SEED_COMMENTS = [
  { from: same("Marit S."), when: { no: "i går", en: "yesterday" }, text: { no: "Kjempekveld — jentene var fantastiske.", en: "Great evening — the girls were fantastic." } },
  { from: { no: "Styret", en: "The board" }, when: { no: "for 2 dager siden", en: "2 days ago" }, text: { no: "Bilder fra kampen kommer senere i uka.", en: "Photos from the match are coming later this week." } },
];

export function activitySeedComments(leaderName) {
  return [
    { from: leaderName, when: { no: "for 2 dager siden", en: "2 days ago" }, text: { no: "Ta med begge draktene og full flaske.", en: "Bring both jerseys and a full bottle." } },
    { from: same("Marit S."), when: { no: "i går", en: "yesterday" }, text: { no: "Vi kan kjøre to ekstra spillere.", en: "We can drive two extra players." } },
  ];
}

/* Volunteer days (Dugnad). st: "todo", "pending" (awaiting confirmation) or "ok". */
export const VOLUNTEER_DAYS = [
  { id: "v1", club: "vif", name: { no: "Høstdugnad på klubbhuset", en: "Autumn clean-up of the club house" }, date: "2026-09-19", time: "10:00", place: { no: "Klubbhuset", en: "Club house" }, hrs: 3, st: "ok", done: 3 },
  { id: "v4", club: "vif", name: { no: "Kioskvakt skøyteoppvisning", en: "Kiosk duty at the figure-skating show" }, date: "2026-10-03", time: "14:00", place: same("Lade arena"), hrs: 2.5, st: "pending", done: 2.5 },
  { id: "v2", club: "fana", name: { no: "Kioskvakt hjemmekamp", en: "Kiosk duty at the home match" }, date: "2026-10-17", time: "12:00", place: { no: "Fana stadion", en: "Fana stadium" }, hrs: 4, st: "todo" },
  { id: "v3", club: "varden", name: { no: "Oppsett til turnering", en: "Tournament set-up" }, date: "2026-11-06", time: "17:00", place: same("Vardenhallen"), hrs: 2, st: "todo" },
  { id: "v5", club: "vif", name: { no: "Julemarked", en: "Christmas market" }, date: "2026-12-05", time: "11:00", place: same("Lade arena"), hrs: 3, st: "todo" },
];

export const VOLUNTEER_GOAL_HOURS = 10;

/* Payment history in the profile's Betaling panel. */
const histItem = (no, en, amount) => [{ no, en }, amount];
export const PAY_HISTORY = [
  { id: "p1", dir: "paid", at: "2026-09-08T14:32", club: "vif", method: same("Vipps"), ref: "48120377", title: { no: "Kontingent høst 2026", en: "Membership fee, autumn 2026" }, items: [histItem("Medlemskontingent høst", "Membership fee, autumn", 1200), histItem("Treningsavgift", "Training fee", 250)] },
  { id: "p2", dir: "paid", at: "2026-09-03T18:05", club: "fana", method: same("Visa •••• 4242"), ref: "48099214", title: { no: "Cup-påmelding Hamar Cup", en: "Hamar Cup sign-up" }, items: [histItem("Påmelding", "Team sign-up", 450), histItem("Overnatting", "Accommodation", 300)] },
  { id: "p3", dir: "paid", at: "2026-09-01T09:12", club: "varden", method: same("Vipps"), ref: "48071560", title: { no: "Halltid Vardenhallen", en: "Hall booking, Vardenhallen" }, items: [histItem("Bord 3, 2 timer", "Table 3, 2 hours", 120)] },
  { id: "p4", dir: "paid", at: "2026-08-24T20:41", club: "fana", method: same("Visa •••• 4242"), ref: "47942881", title: { no: "Treningsleir august", en: "Training camp, August" }, items: [histItem("Leirpakke", "Camp package", 1800), histItem("Buss", "Bus", 250)] },
  { id: "p5", dir: "paid", at: "2026-08-12T17:20", club: "vif", method: same("Vipps"), ref: "47885432", title: { no: "Drakt og shorts", en: "Kit and shorts" }, items: [histItem("Drakt", "Jersey", 650), histItem("Shorts", "Shorts", 300), histItem("Trykk", "Name print", 100)] },
  { id: "p6", dir: "paid", at: "2026-08-05T10:03", club: "varden", method: same("Vipps"), ref: "47810096", title: { no: "Dugnadsfritak", en: "Volunteer exemption" }, items: [histItem("Dugnadsfritak", "Volunteer exemption", 500)] },
  { id: "p7", dir: "paid", at: "2026-06-18T19:15", club: "vif", method: same("Vipps"), ref: "46602718", title: { no: "Kontingent vår 2026", en: "Membership fee, spring 2026" }, items: [histItem("Medlemskontingent vår", "Membership fee, spring", 1200), histItem("Treningsavgift", "Training fee", 250)] },
  { id: "p8", dir: "paid", at: "2026-06-02T12:48", club: "fana", method: same("Visa •••• 4242"), ref: "46511903", title: { no: "Sommerleir", en: "Summer camp" }, items: [histItem("Leiravgift", "Camp fee", 1600)] },
  { id: "r1", dir: "recv", at: "2026-09-10T11:20", club: "fana", method: same("Vipps"), ref: "48140662", title: { no: "Refusjon avlyst kamp", en: "Refund, cancelled match" }, items: [histItem("Refusjon av kampavgift", "Refund of match fee", 300)] },
  { id: "r2", dir: "recv", at: "2026-08-29T15:37", club: "vif", method: { no: "Bankoverføring", en: "Bank transfer" }, ref: "47991340", title: { no: "Utlegg reiseregning", en: "Expense claim" }, items: [histItem("Bensin", "Fuel", 280), histItem("Bom", "Road toll", 140)] },
  { id: "r3", dir: "recv", at: "2026-06-25T09:00", club: "varden", method: same("Vipps"), ref: "46700215", title: { no: "Dugnadsgodtgjørelse", en: "Volunteer compensation" }, items: [histItem("Turneringsvakt", "Tournament shift", 600)] },
];

/* "Legg til ny gruppe" demo codes. */
export const GROUP_CODES = {
  482913: { club: "fana", name: { no: "Cup-laget 2026", en: "Cup squad 2026" } },
  735201: { club: "vif", name: { no: "Foreldregruppa", en: "Parent group" } },
  190466: { club: "varden", name: { no: "Ungdom", en: "Youth" } },
};

export const REGIONS = ["Agder", "Akershus", "Buskerud", "Finnmark", "Innlandet", "Møre og Romsdal", "Nordland", "Oslo", "Rogaland", "Telemark", "Troms", "Trøndelag", "Vestfold", "Vestland", "Østfold"];

export const NOTIF_DEFAULTS = {
  clubs: { vif: true, fana: true, varden: true },
  board: true,
  invites: true,
  posts: true,
  comments: "all",
  accepts: true,
  declines: false,
  taskAccept: true,
  taskDecline: true,
  reminder: true,
  avail: false,
  unavail: false,
  pre24: true,
  invitesOut: true,
};

export const NOTIF_FLAGS = ["board", "invites", "posts", "accepts", "declines", "taskAccept", "taskDecline", "reminder", "avail", "unavail", "pre24", "invitesOut"];

export function seedThreads() {
  const msg = (id, from, when, text, extra = {}) => ({ id, from, me: false, when, text, ...extra });
  const mine = (id, when, text) => ({ id, from: { no: "Du", en: "You" }, me: true, when, text });
  const files = (list) => [{ id: "general", name: { no: "Alle filer", en: "All files" }, files: list }];
  return [
    {
      id: "t1",
      club: "vif",
      name: { no: "G14 lag og foreldre", en: "U14 team and parents" },
      group: true,
      members: 24,
      msgs: [
        msg("m1", { no: "Trener Ahmed", en: "Coach Ahmed" }, { no: "i dag 09:12", en: "today 09:12" }, { no: "Torsdagstreningen flyttes til 17:30. Ta med begge draktene.", en: "Thursday training moves to 17:30. Bring both jerseys." }, { unread: true }),
        msg("m2", same("Marit S."), { no: "i dag 09:31", en: "today 09:31" }, { no: "Notert! Emma rekker det fint.", en: "Noted — Emma will make it." }),
        msg("m3", { no: "Trener Ahmed", en: "Coach Ahmed" }, { no: "i dag 09:44", en: "today 09:44" }, { no: "Her er treningsplanen for uka.", en: "Here is the training plan for the week." }, { unread: true, file: { name: { no: "Treningsplan uke 38.pdf", en: "Training plan week 38.pdf" }, kind: "doc", size: "240 kB" } }),
        mine("m4", { no: "i dag 10:02", en: "today 10:02" }, { no: "Takk! Kan noen ta med ekstra baller?", en: "Thanks! Can someone bring extra balls?" }),
      ],
      folders: [
        { id: "general", name: { no: "Alle filer", en: "All files" }, files: [{ id: "f1", name: { no: "Treningsplan uke 38.pdf", en: "Training plan week 38.pdf" }, kind: "doc", meta: { no: "240 kB · Trener Ahmed", en: "240 kB · Coach Ahmed" } }] },
        { id: "kamper", name: { no: "Kamprapporter", en: "Match reports" }, files: [{ id: "f2", name: { no: "Kamprapport Skjetten.docx", en: "Match report Skjetten.docx" }, kind: "doc", meta: { no: "88 kB · Styret", en: "88 kB · The board" } }] },
        { id: "bilder", name: { no: "Bilder", en: "Photos" }, files: [{ id: "f3", name: { no: "Lagbilde 2026.jpg", en: "Team photo 2026.jpg" }, kind: "img", meta: { no: "1,8 MB · Marit S.", en: "1.8 MB · Marit S." } }] },
      ],
    },
    {
      id: "t2",
      club: "vif",
      name: { no: "Styret i Lade Kunstløp", en: "The board at Lade Kunstløp" },
      group: true,
      members: 7,
      msgs: [
        msg("m1", { no: "Styret", en: "The board" }, { no: "i går 20:10", en: "yesterday 20:10" }, { no: "Høstkontingenten forfaller 20. september.", en: "The autumn fee is due 20 September." }, { unread: true }),
        msg("m2", { no: "Styret", en: "The board" }, { no: "i går 20:12", en: "yesterday 20:12" }, { no: "Fakturaoversikten ligger vedlagt.", en: "The invoice overview is attached." }, { unread: true, file: { name: { no: "Kontingent høst 2026.xlsx", en: "Autumn fee 2026.xlsx" }, kind: "doc", size: "54 kB" } }),
      ],
      folders: files([{ id: "f1", name: { no: "Kontingent høst 2026.xlsx", en: "Autumn fee 2026.xlsx" }, kind: "doc", meta: { no: "54 kB · Styret", en: "54 kB · The board" } }]),
    },
    {
      id: "t3",
      club: "fana",
      name: { no: "Leirkomiteen", en: "Camp committee" },
      group: true,
      members: 12,
      msgs: [
        msg("m1", { no: "Leirkomiteen", en: "Camp committee" }, { no: "10. sep", en: "10 Sep" }, { no: "Vi trenger svar om treningsleiren innen fredag.", en: "We need an answer about the training camp by Friday." }, { unread: true }),
        mine("m2", { no: "10. sep", en: "10 Sep" }, { no: "Emma blir med begge dagene.", en: "Emma will join both days." }),
      ],
      folders: files([{ id: "f1", name: { no: "Program treningsleir.pdf", en: "Training camp programme.pdf" }, kind: "doc", meta: { no: "310 kB · Leirkomiteen", en: "310 kB · Camp committee" } }]),
    },
    {
      id: "t5",
      club: "vif",
      name: { no: "Foreldregruppa G14", en: "U14 parent group" },
      group: true,
      members: 19,
      msgs: [
        msg("m1", same("Marit S."), { no: "11. sep", en: "11 Sep" }, { no: "Noen som kan kjøre til Jordal tirsdag?", en: "Can anyone drive to Jordal on Tuesday?" }),
        mine("m2", { no: "11. sep", en: "11 Sep" }, { no: "Jeg har plass til tre.", en: "I have room for three." }),
      ],
      folders: files([]),
    },
    {
      id: "t6",
      club: "fana",
      name: { no: "Keeperteam Fana", en: "Fana goalkeepers" },
      group: true,
      members: 6,
      msgs: [msg("m1", { no: "Trener Nora", en: "Coach Nora" }, { no: "10. sep", en: "10 Sep" }, { no: "Husk hansker til keepertreningen på mandag.", en: "Remember gloves for Monday goalkeeper training." })],
      folders: files([]),
    },
    {
      id: "t7",
      club: "varden",
      name: { no: "Turneringsgruppa", en: "Tournament crew" },
      group: true,
      members: 14,
      msgs: [msg("m1", same("Ida K."), { no: "8. sep", en: "8 Sep" }, { no: "Vaktlisten for 3. oktober er nesten full.", en: "The shift list for 3 October is almost full." }, { unread: true })],
      folders: files([]),
    },
    {
      id: "t8",
      club: "vif",
      name: { no: "Kasserer Anne", en: "Treasurer Anne" },
      group: false,
      members: 2,
      msgs: [msg("m1", same("Anne Bjørk"), { no: "5. sep", en: "5 Sep" }, { no: "Kvitteringen for treningstøyet er registrert.", en: "The receipt for the training kit is registered." })],
      folders: files([]),
    },
    {
      id: "t9",
      club: "fana",
      name: { no: "Cup-laget 2026", en: "Cup squad 2026" },
      group: true,
      members: 16,
      msgs: [msg("m1", same("Jonas R."), { no: "3. sep", en: "3 Sep" }, { no: "Vi er påmeldt til Hamar Cup. Gratulerer, alle sammen!", en: "We are signed up for Hamar Cup. Well done, everyone!" })],
      folders: files([]),
    },
    {
      id: "t4",
      club: "varden",
      name: { no: "Hallansvarlig Thomas", en: "Hall manager Thomas" },
      group: false,
      members: 2,
      msgs: [msg("m1", same("Thomas Lie"), { no: "9. sep", en: "9 Sep" }, { no: "Åpen hall utvides til 20:00 på fredager denne høsten.", en: "Open hall is extended to 20:00 on Fridays this autumn." })],
      folders: files([]),
    },
  ];
}

/*
  Group members. The canvas only knows the people who have written in a
  chat, so the rest of a group's roster is filled with stable made-up names,
  and each person's card (role, birthday, contact) is derived from a hash of
  their name so it stays the same between visits.
*/
const FIRST_NAMES = ["Kari", "Ola", "Sofie", "Henrik", "Ingrid", "Magnus", "Emilie", "Lars", "Hanne", "Erik", "Nina", "Per", "Camilla", "Kristian", "Maja", "Sander", "Thea", "Jon", "Vilde", "Mats", "Astrid", "Tobias", "Live", "Andreas"];
const LAST_NAMES = ["Berg", "Hansen", "Larsen", "Olsen", "Nilsen", "Johansen", "Pedersen", "Kristiansen", "Andersen", "Haugen", "Lund", "Dahl", "Moe", "Strand", "Aas", "Bakken"];
export const SUGGESTED_PEOPLE = ["Marit Sunde", "Jonas Reite", "Ida Krogh", "Thomas Lie", "Anne Bjørk", "Selma Hauge", "Nora Five", "Emil Aas"];

export function fillerNames(count, taken) {
  const used = new Set(taken);
  const out = [];
  for (let k = 0; out.length < count && k < 400; k++) {
    const name = `${FIRST_NAMES[(k * 7 + 3) % FIRST_NAMES.length]} ${LAST_NAMES[(k * 5 + 1) % LAST_NAMES.length]}`;
    if (!used.has(name)) {
      used.add(name);
      out.push(name);
    }
  }
  return out;
}

function nameHash(str) {
  return Array.from(String(str)).reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7);
}

const MONTHS_LONG = {
  no: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

export function memberCard(name, { isMe, lang, myEmail, myPhone }) {
  const h = nameHash(name);
  const coach = /^(Trener|Coach)\b/i.test(name);
  const fixedParent = /^(Marit S\.|Ida K\.|Jonas R\.|Thomas Lie|Anne Bjørk|Hanne|Nina)/.test(name);
  const en = lang === "en";
  const parent = en ? "Parent" : "Forelder";
  const role =
    isMe || fixedParent
      ? parent
      : coach
        ? en ? "Coach" : "Trener"
        : h % 5 < 2
          ? parent
          : h % 5 < 4
            ? en ? "Player" : "Spiller"
            : en ? "Coach" : "Trener";
  const player = !coach && !fixedParent && !isMe && h % 5 >= 2 && h % 5 < 4;
  const year = isMe ? 1988 : player ? 2010 + (h % 4) : 1974 + (h % 16);
  const minor = player && year > 2010;
  const day = isMe ? 14 : 1 + ((h >>> 3) % 28);
  const mon = isMe ? 4 : (h >>> 5) % 12;
  const slug = String(name)
    .toLowerCase()
    .replace(/^(trener|coach) /, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z ]/g, "")
    .trim()
    .replace(/\s+/g, ".");
  const digits = String(10000000 + (h % 89999999)).slice(0, 8);
  return {
    role,
    minor,
    email: isMe ? myEmail : `${slug}@example.no`,
    phone: isMe ? myPhone : `+47 ${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)}`,
    birthday: `${day}. ${MONTHS_LONG[en ? "en" : "no"][mon]}${minor ? "" : ` ${year}`}`,
    since: 2022 + (h % 4),
  };
}

// Pastel avatar tints, picked from a name so a person keeps their colour.
export const AVATAR_TINTS = ["#a3e2ae", "#ffd66e", "#b9d6ff", "#f4a88a", "#d9c9f5"];

export function tintIndex(name) {
  return Array.from(String(name)).reduce((a, ch) => a + ch.charCodeAt(0), 0) % AVATAR_TINTS.length;
}

export function initialsOf(name) {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");
}

// Clubs offered in the member's booking picker, split into own vs others.
export const MY_BOOK_CLUBS = [
  { slug: "vif", name: "Lade Kunstløp", meta: { no: "Leangen Ishall · Trondheim · 4 isflater", en: "Leangen Ishall · Trondheim · 4 rinks" } },
  { slug: "fana", name: "IL Fana Fotball", meta: { no: "Fana kunstgress · Bergen · 3 baner", en: "Fana turf · Bergen · 3 pitches" } },
  { slug: "bordtennis", name: "Varden BTK", meta: { no: "Vardenhallen · Oslo · 20 bord", en: "Vardenhallen · Oslo · 20 tables" } },
];

export const OTHER_BOOK_CLUBS = [
  { slug: "tennis", name: "Nordstrand Tennisklubb", meta: { no: "Nordstrandhallen · Oslo · 8 baner", en: "Nordstrandhallen · Oslo · 8 courts" } },
  { slug: "biljard", name: "Bergen Biljardklubb", meta: { no: "Nøstet Biljardsenter · Bergen · 14 bord", en: "Nøstet Biljardsenter · Bergen · 14 tables" } },
];

export const MONTHS_SHORT = {
  no: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export const MONTHS_FULL = MONTHS_LONG;

// "12. sep" / "12 Sep"
export function dayMonth(day, m, lang) {
  return lang === "en" ? `${day} ${MONTHS_SHORT.en[m - 1]}` : `${day}. ${MONTHS_SHORT.no[m - 1]}`;
}

// Norwegian number formatting with a space thousands separator, then " kr".
export function nok(amount, isEn) {
  return `${amount.toLocaleString(isEn ? "en-GB" : "nb-NO").replace(/[\s,]/g, " ")} kr`;
}

// "kr 1 450", the way the payment history writes sums.
export function kr(amount) {
  return `kr ${Math.round(amount).toLocaleString("nb-NO").replace(/\s/g, " ")}`;
}

// How many push-notification switches are on, for the profile box's subtitle.
export function notifCount(saved) {
  const nf = { ...NOTIF_DEFAULTS, ...(saved || {}) };
  const clubs = { ...NOTIF_DEFAULTS.clubs, ...((saved || {}).clubs || {}) };
  const flags = NOTIF_FLAGS.map((k) => !!nf[k]).concat(MEMBER_CLUBS.map((c) => !!clubs[c.slug]));
  return {
    on: flags.filter(Boolean).length + (nf.comments !== "none" ? 1 : 0),
    total: flags.length + 1,
  };
}
