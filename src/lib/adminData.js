// Mock data for the administrator portal, taken from the Kretz Admin design.
// Strings come in Norwegian and English; pass `en` to pick.

export function clubs() {
  return [
    { id: "vif", name: "Lade Kunstløp" },
    { id: "fana", name: "IL Fana Fotball" },
    { id: "varden", name: "Varden BTK" },
  ];
}

export function baseActs(en) {
  return [
    {
      id: "a1",
      club: "vif",
      m: 9,
      day: 16,
      time: "18:00",
      title: en ? "U14 training" : "G14 trening",
      place: "Leangen",
      leader: "Nora Five",
      cap: 24,
      signed: 19,
      members: ["m1", "m2", "m3"],
      answers: { m1: "yes", m2: "no", m3: "yes" },
      to: [en ? "U14" : "G14"],
      deadline: "14.09.2026",
      internal: en ? "Emil needs a lift — ask Marit." : "Emil trenger skyss — spør Marit.",
    },
    {
      id: "a2",
      club: "fana",
      m: 9,
      day: 18,
      time: "17:30",
      title: en ? "Goalkeeper session" : "Keepertrening",
      place: en ? "Fana turf" : "Fana kunstgress",
      leader: "Jonas Reite",
      cap: 12,
      signed: 8,
      members: ["m4", "m6"],
      answers: { m4: "yes", m6: "" },
      to: [en ? "Goalkeepers" : "Keeper"],
      deadline: "16.09.2026",
      internal: "",
    },
    {
      id: "a3",
      club: "varden",
      m: 9,
      day: 21,
      time: "19:00",
      title: en ? "Open hall" : "Åpen hall",
      place: "Vardenhallen",
      leader: "Thomas Lie",
      cap: 40,
      signed: 31,
      members: ["m7", "m8", "m9"],
      answers: { m7: "yes", m8: "yes", m9: "no" },
      to: [en ? "Open hall" : "Åpen hall"],
      deadline: "19.09.2026",
      internal: "",
    },
    {
      id: "a4",
      club: "vif",
      m: 10,
      day: 3,
      time: "09:00",
      title: en ? "Tournament volunteer shift" : "Dugnadsvakt turnering",
      place: "Jordal",
      leader: "Marit Sunde",
      cap: 12,
      signed: 5,
      members: ["m1", "m3"],
      answers: { m1: "yes", m3: "" },
      to: [en ? "U14" : "G14", en ? "Volunteer crew" : "Dugnadsgruppa"],
      deadline: "28.09.2026",
      internal: "",
    },
    {
      id: "a5",
      club: "fana",
      m: 10,
      day: 12,
      time: "11:00",
      title: en ? "Home match U16" : "Hjemmekamp G16",
      place: "Fana",
      leader: "Ida Krogh",
      cap: 30,
      signed: 22,
      members: ["m5", "m6"],
      answers: { m5: "yes", m6: "yes" },
      to: [en ? "U16" : "G16"],
      deadline: "08.10.2026",
      internal: "",
    },
    {
      id: "a6",
      club: "vif",
      m: 9,
      day: 23,
      time: "17:00",
      title: en ? "U16 training" : "G16 trening",
      place: "Leangen",
      leader: "Silje Haugen",
      cap: 22,
      signed: 18,
      members: ["m1", "m3"],
      answers: { m1: "yes", m3: "yes" },
      to: [en ? "U16" : "G16"],
      deadline: "21.09.2026",
      internal: "",
    },
    {
      id: "a7",
      club: "fana",
      m: 9,
      day: 26,
      time: "18:30",
      title: en ? "U12 training" : "G12 trening",
      place: en ? "Fana turf" : "Fana kunstgress",
      leader: "Anders Nes",
      cap: 20,
      signed: 16,
      members: ["m4", "m5", "m6"],
      answers: { m4: "yes", m5: "yes", m6: "no" },
      to: [en ? "U12" : "G12"],
      deadline: "24.09.2026",
      internal: "",
    },
    {
      id: "a8",
      club: "varden",
      m: 9,
      day: 29,
      time: "19:00",
      title: en ? "Beginners table tennis" : "Bordtennis nybegynnere",
      place: "Vardenhallen",
      leader: "Liv Strand",
      cap: 16,
      signed: 11,
      members: ["m7", "m8"],
      answers: { m7: "yes", m8: "" },
      to: [en ? "Beginners" : "Nybegynnere"],
      deadline: "27.09.2026",
      internal: "",
    },
    {
      id: "a9",
      club: "vif",
      m: 10,
      day: 7,
      time: "18:00",
      title: en ? "Parents meeting" : "Foreldremøte",
      place: en ? "Club house" : "Klubbhuset",
      leader: "Marit Sunde",
      cap: 40,
      signed: 26,
      members: ["m1", "m3"],
      answers: { m1: "yes", m3: "yes" },
      to: [en ? "U14" : "G14", en ? "U16" : "G16"],
      deadline: "05.10.2026",
      internal: "",
    },
    {
      id: "a10",
      club: "fana",
      m: 10,
      day: 17,
      time: "10:00",
      title: en ? "Autumn tournament" : "Høstturnering",
      place: "Fana",
      leader: "Ida Krogh",
      cap: 60,
      signed: 44,
      members: ["m4", "m5", "m6"],
      answers: { m4: "yes", m5: "yes", m6: "yes" },
      to: [en ? "U10" : "G10", en ? "U12" : "G12"],
      deadline: "10.10.2026",
      internal: en ? "Order extra medals." : "Bestill ekstra medaljer.",
    },
    {
      id: "a11",
      club: "varden",
      m: 10,
      day: 22,
      time: "19:30",
      title: en ? "Advanced table tennis" : "Bordtennis viderekomne",
      place: "Vardenhallen",
      leader: "Knut Aas",
      cap: 14,
      signed: 9,
      members: ["m7", "m9"],
      answers: { m7: "yes", m9: "no" },
      to: [en ? "Advanced" : "Viderekomne"],
      deadline: "20.10.2026",
      internal: "",
    },
    {
      id: "a12",
      club: "vif",
      m: 10,
      day: 28,
      time: "12:00",
      title: en ? "Home match U14" : "Hjemmekamp G14",
      place: "Leangen",
      leader: "Nora Five",
      cap: 26,
      signed: 20,
      members: ["m1", "m2", "m3"],
      answers: { m1: "yes", m2: "yes", m3: "" },
      to: [en ? "U14" : "G14"],
      deadline: "24.10.2026",
      internal: "",
    },
    {
      id: "a13",
      club: "fana",
      m: 11,
      day: 4,
      time: "17:00",
      title: en ? "Kiosk volunteer shift" : "Dugnadsvakt kiosk",
      place: "Fana",
      leader: "Gro Aarvik",
      cap: 8,
      signed: 3,
      members: ["m4", "m6"],
      answers: { m4: "yes", m6: "" },
      to: [en ? "Kiosk" : "Kiosk"],
      deadline: "30.10.2026",
      internal: "",
    },
    {
      id: "a14",
      club: "vif",
      m: 11,
      day: 12,
      time: "09:30",
      title: en ? "Winter camp" : "Vintersamling",
      place: "Jordal",
      leader: "Jonas Berg",
      cap: 30,
      signed: 12,
      members: ["m1", "m2"],
      answers: { m1: "yes", m2: "" },
      to: [en ? "U14" : "G14", en ? "U16" : "G16"],
      deadline: "05.11.2026",
      internal: "",
    },
    {
      id: "a15",
      club: "varden",
      m: 11,
      day: 19,
      time: "18:00",
      title: en ? "Club evening" : "Klubbkveld",
      place: "Vardenhallen",
      leader: "Thomas Lie",
      cap: 50,
      signed: 21,
      members: ["m8", "m9"],
      answers: { m8: "yes", m9: "yes" },
      to: [en ? "Open hall" : "Åpen hall"],
      deadline: "15.11.2026",
      internal: "",
    },
  ];
}

export function basePosts(en) {
  return [
    {
      id: "p1",
      club: "vif",
      high: true,
      when: en ? "2 days ago" : "for 2 dager siden",
      title: en ? "Season opener ended 24–21" : "Sesongåpningen endte 24–21",
      text: en
        ? "A packed Leangen saw the girls turn the game around in the last ten minutes."
        : "Fullsatt Leangen så jentene snu kampen på de siste ti minuttene.",
      reads: 212,
      comments: 6,
    },
    {
      id: "p2",
      club: "varden",
      high: true,
      when: en ? "last week" : "forrige uke",
      title: en ? "Tournament needs twelve volunteers" : "Turneringen trenger tolv frivillige",
      text: en
        ? "Sign up for a shift on 3 October — two hours each."
        : "Meld deg på en vakt 3. oktober — to timer hver.",
      reads: 168,
      comments: 9,
    },
    {
      id: "p3",
      club: "fana",
      high: false,
      when: en ? "4 days ago" : "for 4 dager siden",
      title: en ? "New sponsor for the youth teams" : "Ny sponsor for ungdomslagene",
      text: en
        ? "From October all teams from U12 up get new training kit."
        : "Fra oktober får alle lag fra G12 og opp nytt treningstøy.",
      reads: 140,
      comments: 3,
    },
  ];
}

export function members(en) {
  return [
    {
      id: "m1",
      club: "vif",
      name: "Marit Sunde",
      group: en ? "U14" : "G14",
      role: en ? "Parent" : "Forelder",
      due: 0,
      att: 21,
      avg: 18,
      seed: 3,
      born: "14.03.1985",
      age: 41,
      phone: "+47 402 11 987",
      email: "marit.sunde@example.no",
      address: "Sagveien 12, 0459 Oslo",
    },
    {
      id: "m2",
      club: "vif",
      name: "Emil Aas",
      group: en ? "U14" : "G14",
      role: en ? "Player" : "Spiller",
      due: 1,
      att: 14,
      avg: 18,
      seed: 7,
      born: "02.06.2012",
      age: 14,
      phone: "+47 468 22 104",
      email: "emil.aas@example.no",
      address: "Tøyengata 30, 0578 Oslo",
      guardians: [
        {
          id: "g1",
          name: "Kristin Aas",
          relation: en ? "Mother" : "Mor",
          born: "19.09.1983",
          phone: "+47 909 31 220",
          email: "kristin.aas@example.no",
        },
        {
          id: "g2",
          name: "Petter Aas",
          relation: en ? "Father" : "Far",
          born: "07.01.1981",
          phone: "+47 926 44 108",
          email: "petter.aas@example.no",
        },
      ],
    },
    {
      id: "m3",
      club: "vif",
      name: "Selma Hauge",
      group: en ? "U16" : "G16",
      role: en ? "Player" : "Spiller",
      due: 0,
      att: 24,
      avg: 18,
      seed: 2,
      born: "28.11.2011",
      age: 14,
      phone: "+47 413 77 560",
      email: "selma.hauge@example.no",
      address: "Kjelsåsveien 8, 0491 Oslo",
      guardians: [
        {
          id: "g3",
          name: "Hanne Hauge",
          relation: en ? "Mother" : "Mor",
          born: "03.05.1982",
          phone: "+47 917 60 445",
          email: "hanne.hauge@example.no",
        },
      ],
    },
    {
      id: "m4",
      club: "fana",
      name: "Jonas Reite",
      group: en ? "Goalkeepers" : "Keeper",
      role: en ? "Coach" : "Trener",
      due: 0,
      att: 26,
      avg: 19,
      seed: 5,
      born: "11.07.1979",
      age: 47,
      phone: "+47 481 30 902",
      email: "jonas.reite@example.no",
      address: "Fanaveien 44, 5244 Fana",
    },
    {
      id: "m5",
      club: "fana",
      name: "Ida Krogh",
      group: en ? "U16" : "G16",
      role: en ? "Parent" : "Forelder",
      due: 0,
      att: 17,
      avg: 19,
      seed: 9,
      born: "23.02.1987",
      age: 39,
      phone: "+47 455 12 337",
      email: "ida.krogh@example.no",
      address: "Nesttunveien 3, 5221 Nesttun",
    },
    {
      id: "m6",
      club: "fana",
      name: "Tobias Lund",
      group: en ? "U12" : "G12",
      role: en ? "Player" : "Spiller",
      due: 2,
      att: 11,
      avg: 19,
      seed: 4,
      born: "17.04.2014",
      age: 12,
      phone: "",
      email: "",
      address: "Sandslimarka 21, 5254 Bergen",
      guardians: [
        {
          id: "g4",
          name: "Nina Lund",
          relation: en ? "Mother" : "Mor",
          born: "30.08.1986",
          phone: "+47 930 55 118",
          email: "nina.lund@example.no",
        },
        {
          id: "g5",
          name: "Erik Lund",
          relation: en ? "Father" : "Far",
          born: "12.12.1984",
          phone: "+47 971 22 640",
          email: "erik.lund@example.no",
        },
      ],
    },
    {
      id: "m7",
      club: "varden",
      name: "Thomas Lie",
      group: en ? "Open hall" : "Åpen hall",
      role: en ? "Hall manager" : "Hallansvarlig",
      due: 2,
      att: 20,
      avg: 16,
      seed: 6,
      born: "05.10.1976",
      age: 49,
      phone: "+47 412 08 771",
      email: "thomas.lie@example.no",
      address: "Vardenveien 2, 0666 Oslo",
    },
    {
      id: "m8",
      club: "varden",
      name: "Anne Bjørk",
      group: en ? "Tournament crew" : "Turneringsgruppa",
      role: en ? "Treasurer" : "Kasserer",
      due: 0,
      att: 15,
      avg: 16,
      seed: 8,
      born: "21.01.1980",
      age: 46,
      phone: "+47 907 14 226",
      email: "anne.bjork@example.no",
      address: "Ekebergveien 91, 1162 Oslo",
    },
    {
      id: "m9",
      club: "varden",
      name: "Sara Nilsen",
      group: en ? "Youth" : "Ungdom",
      role: en ? "Player" : "Spiller",
      due: 0,
      att: 22,
      avg: 16,
      seed: 1,
      born: "09.09.2013",
      age: 13,
      phone: "",
      email: "",
      address: "Lambertseterveien 5, 1153 Oslo",
      guardians: [
        {
          id: "g6",
          name: "Camilla Nilsen",
          relation: en ? "Mother" : "Mor",
          born: "25.06.1985",
          phone: "+47 924 77 310",
          email: "camilla.nilsen@example.no",
        },
      ],
    },
  ];
}

// Volunteer days (dugnader) with check-ins.
export function volunteerDays(en) {
  return [
    {
      id: "v1",
      club: "vif",
      name: en ? "Autumn clean-up of the club house" : "Høstdugnad på klubbhuset",
      date: "2026-09-19",
      time: "10:00",
      place: en ? "Club house" : "Klubbhuset",
      lead: "Silje Aas",
      hrs: 3,
      people: [
        ["Marit Sunde", "10:02", 3, true],
        ["Ole Hauge", "10:05", 3, true],
        ["Emil Aas", "10:21", 2.5, false],
      ],
    },
    {
      id: "v2",
      club: "fana",
      name: en ? "Kiosk duty at the home match" : "Kioskvakt hjemmekamp",
      date: "2026-10-17",
      time: "12:00",
      place: en ? "Fana stadium" : "Fana stadion",
      lead: "Hanne Vik",
      hrs: 4,
      people: [],
    },
    {
      id: "v3",
      club: "varden",
      name: en ? "Tournament set-up" : "Oppsett til turnering",
      date: "2026-11-06",
      time: "17:00",
      place: "Vardenhallen",
      lead: "Ola Berg",
      hrs: 2,
      people: [],
    },
  ];
}

// Club documents in the archive.
export function documents() {
  return [
    {
      id: "d1",
      club: "vif",
      name: "Vedtekter 2026.pdf",
      cat: "law",
      by: "Sigrid Andersen",
      when: "2026-01-12",
      kb: 214,
    },
    {
      id: "d2",
      club: "vif",
      name: "Referat styremøte september.pdf",
      cat: "minutes",
      by: "Silje Aas",
      when: "2026-09-18",
      kb: 96,
    },
    {
      id: "d3",
      club: "vif",
      name: "Regnskap 2025.xlsx",
      cat: "acc",
      by: "Marit Sunde",
      when: "2026-03-02",
      kb: 388,
    },
    {
      id: "d4",
      club: "fana",
      name: "Sponsoravtale Sparebanken.pdf",
      cat: "contract",
      by: "Jonas Eide",
      when: "2026-02-20",
      kb: 540,
    },
    {
      id: "d5",
      club: "fana",
      name: "Referat årsmøte.pdf",
      cat: "minutes",
      by: "Hanne Vik",
      when: "2026-03-14",
      kb: 172,
    },
    {
      id: "d6",
      club: "varden",
      name: "Halleieavtale Vardenhallen.pdf",
      cat: "contract",
      by: "Ola Berg",
      when: "2026-01-30",
      kb: 305,
    },
    {
      id: "d7",
      club: "varden",
      name: "Budsjett 2026.xlsx",
      cat: "acc",
      by: "Kari Moe",
      when: "2026-01-08",
      kb: 121,
    },
  ];
}

// Planning board cards.
export function planningItems(en) {
  return [
    {
      id: "a1",
      club: "vif",
      name: en ? "Autumn tournament" : "Høstturnering",
      owner: "Silje Aas",
      date: "2026-11-07",
      st: "active",
    },
    {
      id: "a2",
      club: "vif",
      name: en ? "Christmas party" : "Juleavslutning",
      owner: "Marit Sunde",
      date: "2026-12-13",
      st: "planned",
    },
    {
      id: "a3",
      club: "fana",
      name: en ? "Training camp spring" : "Treningsleir våren",
      owner: "Jonas Eide",
      date: "2027-03-20",
      st: "idea",
    },
    {
      id: "a4",
      club: "fana",
      name: en ? "Kit order 2027" : "Draktbestilling 2027",
      owner: "Hanne Vik",
      date: "2026-10-30",
      st: "planned",
    },
    {
      id: "a5",
      club: "varden",
      name: en ? "Club championship" : "Klubbmesterskap",
      owner: "Ola Berg",
      date: "2026-11-21",
      st: "idea",
    },
    {
      id: "a6",
      club: "varden",
      name: en ? "Volunteer day" : "Dugnad på anlegget",
      owner: "Kari Moe",
      date: "2026-09-19",
      st: "done",
    },
  ];
}

// Budget lines (budget vs. actual).
export function budgetLines(en) {
  return [
    {
      id: "inc",
      title: en ? "Income" : "Inntekter",
      sign: 1,
      rows: [
        ["fee", en ? "Membership fees" : "Kontingent", 620000, 548000],
        ["spons", en ? "Sponsors" : "Sponsorer", 380000, 402000],
        ["kiosk", en ? "Kiosk" : "Kiosk", 150000, 118000],
        ["dugn", en ? "Volunteer work" : "Dugnad", 90000, 94000],
        ["evt", en ? "Events" : "Arrangementer", 120000, 76000],
      ],
    },
    {
      id: "exp",
      title: en ? "Expenses" : "Kostnader",
      sign: -1,
      rows: [
        ["hall", en ? "Hall rent" : "Halleie", 340000, 318000],
        ["equip", en ? "Equipment" : "Utstyr", 140000, 151000],
        ["ref", en ? "Referees" : "Dommere", 70000, 58000],
        ["trav", en ? "Travel" : "Reiser", 110000, 126000],
        ["mkt", en ? "Marketing" : "Markedsføring", 60000, 33000],
        ["ops", en ? "Operations" : "Drift", 180000, 139000],
      ],
    },
  ];
}

// Available integrations.
export function integrationDefs(en) {
  return [
    [
      "vipps",
      "Vipps",
      "VP",
      en ? "Payment" : "Betaling",
      en
        ? "Let members pay fees, tournaments and kiosk with Vipps."
        : "La medlemmer betale kontingent, turneringer og kiosk med Vipps.",
    ],
    [
      "bank",
      en ? "Bank account" : "Bankkonto",
      "BK",
      en ? "Bank" : "Bank",
      en
        ? "Import transactions daily so the team fund is always up to date."
        : "Hent inn bankbevegelser daglig, så lagkassen alltid er oppdatert.",
    ],
    [
      "fiken",
      "Fiken",
      "Fk",
      en ? "Accounting" : "Regnskap",
      en
        ? "Send posted invoices and payments straight to the accounts."
        : "Send bokførte fakturaer og innbetalinger rett til regnskapet.",
    ],
    [
      "tripletex",
      "Tripletex",
      "Tx",
      en ? "Accounting" : "Regnskap",
      en
        ? "Export vouchers and invoices to Tripletex automatically."
        : "Eksporter bilag og fakturaer til Tripletex automatisk.",
    ],
    [
      "visma",
      "Visma",
      "Vi",
      en ? "Accounting" : "Regnskap",
      en
        ? "Sync customers, invoices and budget with Visma."
        : "Synkroniser kunder, fakturaer og budsjett med Visma.",
    ],
    [
      "gcal",
      "Google Calendar",
      "GC",
      en ? "Calendar" : "Kalender",
      en
        ? "Show trainings and board meetings in your own calendar."
        : "Vis treninger og styremøter i din egen kalender.",
    ],
    [
      "idrett",
      "MinIdrett",
      "MI",
      en ? "Federation" : "Forbund",
      en
        ? "Report members and activities to the sports federation."
        : "Rapporter medlemmer og aktiviteter til idrettsforbundet.",
    ],
  ];
}

// Bank accounts per club.
export function bankAccounts() {
  return {
    vif: { no: "1503.22.48110", bank: "DNB" },
    fana: { no: "3624.51.07732", bank: "Sparebanken Vest" },
    varden: { no: "1206.40.95518", bank: "SpareBank 1 Østlandet" },
  };
}

// Recent bank transactions (team fund).
export function transactions(en) {
  return [
    {
      d: "2026-09-23",
      tx: "TX-48213",
      inv: "F-2026-0418",
      desc: en ? "Membership fee autumn" : "Kontingent høst",
      party: "Marit Sunde",
      club: "vif",
      n: 1450,
    },
    {
      d: "2026-09-22",
      tx: "TX-48207",
      inv: "L-7731",
      desc: en ? "Hall rent, September" : "Halleie, september",
      party: "Oslo kommune",
      club: "vif",
      n: -34000,
    },
    {
      d: "2026-09-21",
      tx: "TX-48199",
      inv: "F-2026-0412",
      desc: en ? "Tournament fee, away teams" : "Turneringsavgift, bortelag",
      party: "IL Fana Fotball",
      club: "varden",
      n: 6800,
    },
    {
      d: "2026-09-19",
      tx: "TX-48188",
      inv: "L-5520",
      desc: en ? "Match balls, 20 pcs" : "Kampballer, 20 stk",
      party: "Lade Sport AS",
      club: "vif",
      n: -8400,
    },
    {
      d: "2026-09-18",
      tx: "TX-48176",
      inv: "S-0092",
      desc: en ? "Sponsor instalment Q3" : "Sponsoravdrag 3. kvartal",
      party: "Vestland Bygg",
      club: "fana",
      n: 20000,
    },
    {
      d: "2026-09-16",
      tx: "TX-48160",
      inv: "L-3318",
      desc: en ? "Bus, away cup" : "Buss, bortecup",
      party: "Nettbuss",
      club: "fana",
      n: -12600,
    },
    {
      d: "2026-09-14",
      tx: "TX-48151",
      inv: "—",
      desc: en ? "Kiosk takings, Vipps" : "Kioskinntekt, Vipps",
      party: "Vipps MobilePay",
      club: "vif",
      n: 18600,
    },
    {
      d: "2026-09-11",
      tx: "TX-48133",
      inv: "L-9044",
      desc: en ? "Referee fees" : "Dommerhonorar",
      party: "Norges Fotballforbund",
      club: "fana",
      n: -6200,
    },
    {
      d: "2026-09-09",
      tx: "TX-48120",
      inv: "F-2026-0399",
      desc: en ? "Membership fee autumn" : "Kontingent høst",
      party: "Emil Aas",
      club: "vif",
      n: 1450,
    },
    {
      d: "2026-09-05",
      tx: "TX-48101",
      inv: "L-2210",
      desc: en ? "Kiosk restock" : "Påfyll kiosk",
      party: "Asko",
      club: "varden",
      n: -4800,
    },
    {
      d: "2026-08-28",
      tx: "TX-47988",
      inv: "S-0087",
      desc: en ? "Hall boards, annual" : "Hallskilt, årlig",
      party: "Varden Elektro",
      club: "varden",
      n: 38000,
    },
    {
      d: "2026-08-15",
      tx: "TX-47851",
      inv: "L-6602",
      desc: en ? "Training kit U12–U16" : "Treningstøy G12–G16",
      party: "Stadion Sport",
      club: "fana",
      n: -64000,
    },
    {
      d: "2026-06-30",
      tx: "TX-46902",
      inv: "T-2026-02",
      desc: en ? "Municipal activity grant" : "Kommunalt aktivitetstilskudd",
      party: "Oslo kommune",
      club: "vif",
      n: 75000,
    },
    {
      d: "2026-03-12",
      tx: "TX-44410",
      inv: "S-0061",
      desc: en ? "Main partner 2026" : "Hovedpartner 2026",
      party: "Lade Sport AS",
      club: "vif",
      n: 120000,
    },
  ];
}

// Year pattern used to generate older transactions.
export function yearPlan() {
  return [
    {
      m: 1,
      inc: [
        ["fee", 1.0],
        ["grant", 0.5],
      ],
      exp: [["ops", 0.4]],
    },
    {
      m: 2,
      inc: [["kiosk", 0.2]],
      exp: [
        ["equip", 1.0],
        ["ops", 0.5],
      ],
    },
    {
      m: 3,
      inc: [
        ["fee", 0.5],
        ["event", 0.4],
      ],
      exp: [["ops", 0.4]],
    },
    {
      m: 4,
      inc: [["kiosk", 0.25]],
      exp: [
        ["travel", 1.0],
        ["ops", 0.6],
      ],
    },
    {
      m: 5,
      inc: [
        ["event", 1.0],
        ["kiosk", 0.5],
      ],
      exp: [
        ["ops", 0.45],
        ["mkt", 0.2],
      ],
    },
    {
      m: 6,
      inc: [
        ["sponsor", 0.6],
        ["kiosk", 0.3],
      ],
      exp: [["coach", 0.4]],
    },
    {
      m: 7,
      inc: [["kiosk", 0.15]],
      exp: [
        ["travel", 0.9],
        ["coach", 0.5],
      ],
    },
    {
      m: 8,
      inc: [["fee", 0.35]],
      exp: [
        ["ops", 0.55],
        ["mkt", 0.25],
      ],
    },
    { m: 9, inc: [["event", 0.3]], exp: [["coach", 0.35]] },
  ];
}

// Transaction descriptions by category.
export function txWords(en) {
  return {
    fee: [en ? "Membership fee spring" : "Kontingent vår", en ? "Membership fee" : "Kontingent"],
    grant: [en ? "Activity grant, sports council" : "Aktivitetsmidler, idrettsrådet"],
    kiosk: [en ? "Kiosk takings, Vipps" : "Kioskinntekt, Vipps"],
    event: [en ? "Cup entry fees" : "Cupavgifter", en ? "Club day tickets" : "Klubbdag, billetter"],
    sponsor: [en ? "Sponsor instalment" : "Sponsoravdrag"],
    ops: [en ? "Hall rent" : "Halleie", en ? "Referee fees" : "Dommerhonorar"],
    equip: [en ? "Goals and nets" : "Mål og nett", en ? "Training equipment" : "Treningsutstyr"],
    travel: [en ? "Bus to away cup" : "Buss til bortecup", en ? "Summer camp travel" : "Reise sommerleir"],
    coach: [en ? "Coach fees" : "Trenerhonorar"],
    mkt: [
      en ? "Posters and flyers" : "Plakater og flygeblad",
      en ? "Social media ads" : "Annonser i sosiale medier",
    ],
  };
}

// Counterparties by category.
export function txParties() {
  return {
    fee: { vif: "Medlemmer Lade Kunstløp", fana: "Medlemmer Fana", varden: "Medlemmer Varden" },
    grant: { vif: "Oslo idrettskrets", fana: "Vestland idrettskrets", varden: "Oslo idrettskrets" },
    kiosk: { vif: "Vipps MobilePay", fana: "Vipps MobilePay", varden: "Vipps MobilePay" },
    event: { vif: "Deltakende lag", fana: "Deltakende lag", varden: "Deltakende lag" },
    sponsor: { vif: "Lade Sport AS", fana: "Vestland Bygg", varden: "Varden Elektro" },
    ops: { vif: "Oslo kommune", fana: "Bergen kommune", varden: "Oslo kommune" },
    equip: { vif: "Stadion Sport", fana: "Stadion Sport", varden: "Tibhar Norge" },
    travel: { vif: "Nettbuss", fana: "Tide Buss", varden: "Nettbuss" },
    coach: { vif: "Trenerteamet", fana: "Trenerteamet", varden: "Trenerteamet" },
    mkt: { vif: "Trykkeriet AS", fana: "Meta Platforms", varden: "Trykkeriet AS" },
  };
}

// Transaction category per keyword.
export function txCategories() {
  return {
    "TX-48213": "fee",
    "TX-48120": "fee",
    "TX-48176": "sponsor",
    "TX-47988": "sponsor",
    "TX-44410": "sponsor",
    "TX-48151": "kiosk",
    "TX-48199": "event",
    "TX-46902": "grant",
    "TX-48207": "ops",
    "TX-48133": "ops",
    "TX-48188": "equip",
    "TX-47851": "equip",
    "TX-48101": "equip",
    "TX-48160": "travel",
  };
}

// Result / balance series.
export function resultSeries() {
  return [
    [62000, 48000],
    [58000, 51000],
    [91000, 64000],
    [72000, 55000],
    [84000, 69000],
    [96000, 88000],
    [41000, 37000],
    [67000, 72000],
    [88000, 61000],
    null,
    null,
    null,
  ];
}

// Demo member list.
export function demoMembers() {
  return [
    { label: "6–9", g: 58, b: 64 },
    { label: "10–12", g: 71, b: 83 },
    { label: "13–15", g: 66, b: 72 },
    { label: "16–19", g: 38, b: 47 },
    { label: "20–39", g: 29, b: 41 },
    { label: "40+", g: 19, b: 24 },
  ];
}

// Where clubs can apply for grants.
export function grantSources(en) {
  return [
    {
      club: "vif",
      name: en ? "Municipal youth fund, Oslo" : "Kommunalt ungdomsfond, Oslo",
      meta: en ? "Activity for ages 6–19" : "Aktivitet for 6–19 år",
      amount: "kr 20–75 000",
      deadline: en ? "due 1 Oct" : "frist 1. okt",
      due: 1001,
      day: "1.",
      mon: en ? "Oct" : "okt",
      kind: "warn",
    },
    {
      club: "vif",
      name: "Sparebankstiftelsen DNB",
      meta: en ? "Equipment and facilities" : "Utstyr og anlegg",
      amount: "kr 50–500 000",
      deadline: en ? "due 15 Oct" : "frist 15. okt",
      due: 1015,
      day: "15.",
      mon: en ? "Oct" : "okt",
      kind: "neutral",
    },
    {
      club: "vif",
      name: en ? "Norsk Tipping, grassroots share" : "Norsk Tipping, grasrotandelen",
      meta: en ? "Paid out automatically" : "Utbetales automatisk",
      amount: en ? "ongoing" : "løpende",
      deadline: en ? "registered" : "registrert",
      due: 9999,
      kind: "ok",
    },
    {
      club: "vif",
      name: en ? "Local activity grant (LAM)" : "Lokale aktivitetsmidler (LAM)",
      meta: en ? "Via the sports council" : "Via idrettsrådet",
      amount: "kr 30–90 000",
      deadline: en ? "due 1 Nov" : "frist 1. nov",
      due: 1101,
      day: "1.",
      mon: en ? "Nov" : "nov",
      kind: "neutral",
    },
    {
      club: "fana",
      name: en ? "Vestland county sports grant" : "Vestland fylkeskommune, idrettstilskudd",
      meta: en ? "Inclusion and girls in sport" : "Inkludering og jenter i idrett",
      amount: "kr 25–150 000",
      deadline: en ? "due 1 Oct" : "frist 1. okt",
      due: 1001,
      day: "1.",
      mon: en ? "Oct" : "okt",
      kind: "warn",
    },
    {
      club: "fana",
      name: "Sparebanken Vest",
      meta: en ? "Local community fund" : "Allmennyttige midler",
      amount: "kr 10–200 000",
      deadline: en ? "due 20 Oct" : "frist 20. okt",
      due: 1020,
      day: "20.",
      mon: en ? "Oct" : "okt",
      kind: "neutral",
    },
    {
      club: "varden",
      name: en ? "Bingo and lottery funds" : "Bingo- og lotterimidler",
      meta: en ? "Oslo sports council" : "Oslo idrettskrets",
      amount: "kr 15–60 000",
      deadline: en ? "due 1 Nov" : "frist 1. nov",
      due: 1101,
      day: "1.",
      mon: en ? "Nov" : "nov",
      kind: "neutral",
    },
  ];
}

// Sponsor agreements.
export function sponsorAgreements(en) {
  return [
    {
      renewed: en ? "1 Jan 2026" : "1. jan 2026",
      until: en ? "31 Dec 2026" : "31. des 2026",
      person: "Hanne Berg",
      email: "sponsor@bislettsport.no",
      reports: [
        { title: en ? "Spring report" : "Vårrapport", date: en ? "15 Jun 2026" : "15. jun 2026", done: true },
        { title: en ? "Autumn report" : "Høstrapport", date: en ? "1 Oct 2026" : "1. okt 2026", soon: true },
        { title: en ? "Annual report" : "Årsrapport", date: en ? "15 Jan 2027" : "15. jan 2027" },
      ],
    },
    {
      renewed: en ? "1 Oct 2025" : "1. okt 2025",
      until: en ? "30 Sep 2026" : "30. sep 2026",
      person: "Ola Vik",
      email: "marked@vestlandbygg.no",
      reports: [
        {
          title: en ? "Kit photos and exposure" : "Draktbilder og eksponering",
          date: en ? "1 Mar 2026" : "1. mar 2026",
          done: true,
        },
        {
          title: en ? "Season report" : "Sesongrapport",
          date: en ? "28 Sep 2026" : "28. sep 2026",
          soon: true,
        },
      ],
    },
    {
      renewed: en ? "1 Aug 2025" : "1. aug 2025",
      until: en ? "31 Jul 2027" : "31. jul 2027",
      person: "Kari Nes",
      email: "post@vardenelektro.no",
      reports: [
        { title: en ? "Year 1 report" : "Rapport år 1", date: en ? "1 Aug 2026" : "1. aug 2026", done: true },
        { title: en ? "Halfway update" : "Halvveis-oppdatering", date: en ? "1 Feb 2027" : "1. feb 2027" },
      ],
    },
    {
      renewed: en ? "Not signed yet" : "Ikke signert",
      until: "–",
      person: "Jonas Lie",
      email: "samarbeid@oslofysio.no",
      reports: [
        {
          title: en ? "Proposal follow-up" : "Oppfølging av tilbud",
          date: en ? "30 Sep 2026" : "30. sep 2026",
          soon: true,
        },
      ],
    },
  ];
}

// Sponsor agreement body text.
export function agreementText(en) {
  return [
    {
      club: [
        en ? "Logo on all match kits for U12–senior" : "Logo på alle kampdrakter fra J12 til senior",
        en ? "Two roll-ups and one banner in Leangen hall" : "To roll-ups og ett banner i Leangen-hallen",
        en
          ? "Four sponsor posts per season on the club channels"
          : "Fire sponsorinnlegg per sesong i klubbens kanaler",
      ],
      sponsor: [
        en ? "NOK 120 000 per year, paid in two instalments" : "kr 120 000 per år, utbetalt i to avdrag",
        en ? "15 % discount on equipment for members" : "15 % rabatt på utstyr for medlemmer",
      ],
      terms: [
        en
          ? "Spring, autumn and annual report with photos and reach"
          : "Vår-, høst- og årsrapport med bilder og rekkevidde",
        en
          ? "Renews automatically unless cancelled by 1 Oct"
          : "Fornyes automatisk om den ikke sies opp innen 1. okt",
      ],
      signed: en
        ? "Signed 12 Dec 2025 by Marit Sunde (chair) and Hanne Berg (Lade Sport AS)."
        : "Signert 12. des 2025 av Marit Sunde (styreleder) og Hanne Berg (Lade Sport AS).",
    },
    {
      club: [
        en ? "Chest logo on training kit U12–U16" : "Brystlogo på treningstøy G12–G16",
        en ? "Name on the home-match programme" : "Navn i hjemmekampprogrammet",
      ],
      sponsor: [
        en ? "NOK 64 000 for the season" : "kr 64 000 for sesongen",
        en ? "Covers new training kit from October" : "Dekker nytt treningstøy fra oktober",
      ],
      terms: [
        en ? "Photos of the kit in use by 1 March" : "Bilder av tøyet i bruk innen 1. mars",
        en ? "Season report by 28 September" : "Sesongrapport innen 28. september",
      ],
      signed: en
        ? "Signed 20 Sep 2025 by Ida Krogh and Ola Vik (Vestland Bygg)."
        : "Signert 20. sep 2025 av Ida Krogh og Ola Vik (Vestland Bygg).",
    },
    {
      club: [
        en ? "Two hall boards facing the main table" : "To hallskilt mot hovedbordet",
        en ? "Logo on the club website" : "Logo på klubbens nettside",
      ],
      sponsor: [en ? "NOK 38 000 per year for two years" : "kr 38 000 per år i to år"],
      terms: [
        en ? "Yearly report on hall visitors" : "Årlig rapport om besøk i hallen",
        en ? "Two-year term, ends 31 July 2027" : "Toårig avtale, slutter 31. juli 2027",
      ],
      signed: en
        ? "Signed 25 Jul 2025 by Thomas Lie and Kari Nes (Varden Elektro)."
        : "Signert 25. jul 2025 av Thomas Lie og Kari Nes (Varden Elektro).",
    },
    {
      club: [en ? "Proposal: logo on warm-up tops" : "Tilbud: logo på oppvarmingstrøyer"],
      sponsor: [
        en
          ? "Proposal: NOK 45 000 and a physio evening per month"
          : "Tilbud: kr 45 000 og én fysiokveld i måneden",
      ],
      terms: [en ? "Not signed — proposal sent 6 September" : "Ikke signert — tilbud sendt 6. september"],
      signed: en ? "Draft — awaiting reply from Oslo Fysio." : "Utkast — venter på svar fra Oslo Fysio.",
    },
  ];
}

// Details for each grant source.
export function grantInfo(en) {
  return [
    {
      url: "https://www.oslo.kommune.no/tilskudd-legater-og-stipend/",
      site: "oslo.kommune.no",
      info: en
        ? "Operating and activity grants for organisations with regular activity for children and young people in Oslo. Apply with membership numbers, budget and a short activity plan."
        : "Drifts- og aktivitetstilskudd for lag med fast aktivitet for barn og unge i Oslo. Søk med medlemstall, budsjett og en kort aktivitetsplan.",
      who: en ? "Clubs in Oslo with members aged 6–19" : "Klubber i Oslo med medlemmer 6–19 år",
    },
    {
      url: "https://sparebankstiftelsen.no/",
      site: "sparebankstiftelsen.no",
      info: en
        ? "Gifts for equipment, facilities and projects that create activity and belonging locally. Larger projects need a clear plan and co-funding."
        : "Gaver til utstyr, anlegg og prosjekter som skaper aktivitet og fellesskap lokalt. Større prosjekter krever tydelig plan og egenandel.",
      who: en
        ? "Non-profit clubs building equipment or facilities"
        : "Ideelle lag som bygger utstyr eller anlegg",
    },
    {
      url: "https://www.norsk-tipping.no/grasrotandelen",
      site: "norsk-tipping.no",
      info: en
        ? "Players choose a club as their grassroots recipient and 7 % of their stake goes to the club. No application — only registration in the Volunteer Register."
        : "Spillere velger klubben som grasrotmottaker, og 7 % av innsatsen går til klubben. Ingen søknad — bare registrering i Frivillighetsregisteret.",
      who: en
        ? "All clubs registered in the Volunteer Register"
        : "Alle klubber registrert i Frivillighetsregisteret",
    },
    {
      url: "https://www.idrettsforbundet.no/tema/lokale-aktivitetsmidler/",
      site: "idrettsforbundet.no",
      info: en
        ? "State funds shared out by the local sports council, based on activity for ages 6–19. The council sets its own criteria and deadline."
        : "Statlige midler som fordeles av idrettsrådet, basert på aktivitet for 6–19 år. Idrettsrådet setter egne kriterier og frist.",
      who: en
        ? "Member clubs of the Norwegian sports federation"
        : "Klubber som er medlem av Norges idrettsforbund",
    },
    {
      url: "https://www.vestlandfylke.no/",
      site: "vestlandfylke.no",
      info: en
        ? "County grants for inclusion, girls in sport and low-threshold activity. Measures must reach new groups."
        : "Fylkestilskudd til inkludering, jenter i idrett og lavterskelaktivitet. Tiltakene må nå nye grupper.",
      who: en ? "Clubs in Vestland running inclusion projects" : "Klubber i Vestland med inkluderingstiltak",
    },
    {
      url: "https://www.spv.no/",
      site: "spv.no",
      info: en
        ? "Community funds for local culture and sport. Short online application with a budget."
        : "Allmennyttige midler til lokal kultur og idrett. Kort søknad på nett med budsjett.",
      who: en ? "Non-profit organisations in western Norway" : "Ideelle organisasjoner på Vestlandet",
    },
    {
      url: "https://lottstift.no/",
      site: "lottstift.no",
      info: en
        ? "Income from bingo and lotteries shared with approved organisations. Requires registration with the Gaming Authority."
        : "Inntekter fra bingo og lotterier fordeles til godkjente organisasjoner. Krever registrering hos Lotteri- og stiftelsestilsynet.",
      who: en ? "Clubs approved as lottery beneficiaries" : "Klubber godkjent som lotterimottakere",
    },
  ];
}

// "Important now" items.
export function focusList(en) {
  return [
    {
      club: "vif",
      title: en ? "Autumn tournament at Jordal" : "Høstturneringen på Jordal",
      text: en
        ? "24 teams, kiosk and 12 volunteer shifts — 7 shifts still open."
        : "24 lag, kiosk og 12 dugnadsvakter — 7 vakter står fortsatt åpne.",
      owner: "Marit Sunde",
      when: en ? "Sat 3 Oct · 09:00" : "lør 3. okt · 09:00",
      countdown: en ? "in 10 days" : "om 10 dager",
    },
    {
      club: "fana",
      title: en ? "Grant application, youth fund" : "Søknad kommunalt ungdomsfond",
      text: en
        ? "Membership numbers and budget must be attached before the deadline."
        : "Medlemstall og budsjett må legges ved før fristen.",
      owner: "Ida Krogh",
      when: en ? "Thu 1 Oct · 23:59" : "tor 1. okt · 23:59",
      countdown: en ? "in 8 days" : "om 8 dager",
    },
    {
      club: "varden",
      title: en ? "Regional table-tennis cup" : "Regionalt bordtenniscup",
      text: en
        ? "Hall booked, referees still missing for two courts."
        : "Hallen er booket, mangler dommere til to bord.",
      owner: "Thomas Lie",
      when: en ? "Sun 11 Oct · 10:00" : "søn 11. okt · 10:00",
      countdown: en ? "in 18 days" : "om 18 dager",
    },
  ];
}

// Rows per overview list.
export function rowSets(en) {
  return {
    finance: [
      {
        club: "vif",
        title: en ? "Membership fee autumn 2026" : "Kontingent høst 2026",
        meta: en ? "284 invoices · due 30 Sep" : "284 fakturaer · forfall 30. sep",
        amount: "kr 21 400",
        tag: en ? "18 unpaid" : "18 ubetalt",
        kind: "due",
      },
      {
        club: "fana",
        title: en ? "Training kit, U12–U16" : "Treningstøy, G12–G16",
        meta: en ? "Sponsor covered · invoiced" : "Dekket av sponsor · fakturert",
        amount: "kr 64 000",
        tag: en ? "paid" : "betalt",
        kind: "ok",
      },
      {
        club: "varden",
        title: en ? "Hall rent Q3" : "Halleie 3. kvartal",
        meta: en ? "Municipality · due 1 Oct" : "Kommunen · forfall 1. okt",
        amount: "kr 12 000",
        tag: en ? "due soon" : "forfaller snart",
        kind: "warn",
      },
      {
        club: "vif",
        title: en ? "Tournament kiosk income" : "Kioskinntekt turnering",
        meta: en ? "Settled 8 Sep" : "Oppgjort 8. sep",
        amount: "+ kr 18 600",
        tag: en ? "booked" : "bokført",
        kind: "ok",
      },
      {
        club: "fana",
        title: en ? "Grant, municipal youth fund" : "Støtte, kommunalt ungdomsfond",
        meta: en ? "Application due 1 Oct" : "Søknadsfrist 1. okt",
        amount: "kr 75 000",
        tag: en ? "draft" : "utkast",
        kind: "neutral",
      },
    ],
    booking: [
      {
        club: "vif",
        title: "Leangen · " + (en ? "court 1" : "bane 1"),
        meta: en ? "Mon 16 Sep · 18:00–19:30 · U14" : "man 16. sep · 18:00–19:30 · G14",
        amount: "",
        tag: en ? "confirmed" : "bekreftet",
        kind: "ok",
      },
      {
        club: "varden",
        title: "Vardenhallen · " + (en ? "tables 1–8" : "bord 1–8"),
        meta: en ? "Sun 21 Sep · 19:00–21:00 · open hall" : "søn 21. sep · 19:00–21:00 · åpen hall",
        amount: "",
        tag: en ? "confirmed" : "bekreftet",
        kind: "ok",
      },
      {
        club: "fana",
        title: en ? "Fana turf · pitch 2" : "Fana kunstgress · bane 2",
        meta: en ? "Fri 18 Sep · 17:30–19:00 · goalkeepers" : "fre 18. sep · 17:30–19:00 · keeper",
        amount: "",
        tag: en ? "awaiting hall" : "venter på hall",
        kind: "warn",
      },
      {
        club: "vif",
        title: "Jordal · " + (en ? "whole hall" : "hele hallen"),
        meta: en ? "Sat 3 Oct · 09:00–17:00 · tournament" : "lør 3. okt · 09:00–17:00 · turnering",
        amount: "",
        tag: en ? "confirmed" : "bekreftet",
        kind: "ok",
      },
    ],
    sponsors: [
      {
        club: "vif",
        title: "Lade Sport AS",
        meta: en ? "Main partner · renews 1 Jan" : "Hovedpartner · fornyes 1. jan",
        amount: "kr 120 000",
        tag: en ? "active" : "aktiv",
        kind: "ok",
      },
      {
        club: "fana",
        title: "Vestland Bygg",
        meta: en ? "Kit sponsor · renews 1 Oct" : "Draktsponsor · fornyes 1. okt",
        amount: "kr 64 000",
        tag: en ? "renewal due" : "fornyelse nær",
        kind: "warn",
      },
      {
        club: "varden",
        title: "Varden Elektro",
        meta: en ? "Hall boards · 2-year deal" : "Hallskilt · toårsavtale",
        amount: "kr 38 000",
        tag: en ? "active" : "aktiv",
        kind: "ok",
      },
      {
        club: "vif",
        title: "Oslo Fysio",
        meta: en ? "Proposal sent 6 Sep" : "Tilbud sendt 6. sep",
        amount: "kr 45 000",
        tag: en ? "in dialogue" : "i dialog",
        kind: "neutral",
      },
    ],
    messages: [
      {
        club: "vif",
        title: en ? "Parent group U14" : "Foreldregruppa G14",
        meta: en ? "Marit S.: Can anyone drive on Tuesday?" : "Marit S.: Noen som kan kjøre tirsdag?",
        amount: "",
        tag: "3 " + (en ? "unread" : "ulest"),
        kind: "due",
      },
      {
        club: "varden",
        title: en ? "Tournament crew" : "Turneringsgruppa",
        meta: en ? "Ida K.: The shift list is almost full." : "Ida K.: Vaktlisten er nesten full.",
        amount: "",
        tag: "1 " + (en ? "unread" : "ulest"),
        kind: "due",
      },
      {
        club: "fana",
        title: en ? "Coaches, all teams" : "Trenere, alle lag",
        meta: en ? "Jonas R.: Kit sizes needed by Friday." : "Jonas R.: Trenger størrelser innen fredag.",
        amount: "",
        tag: en ? "read" : "lest",
        kind: "neutral",
      },
      {
        club: "vif",
        title: en ? "Treasurer Anne" : "Kasserer Anne",
        meta: en ? "The receipt is registered." : "Kvitteringen er registrert.",
        amount: "",
        tag: en ? "read" : "lest",
        kind: "neutral",
      },
    ],
  };
}

// Club roles.
export function roleDefs(en) {
  return [
    {
      id: "chair",
      name: en ? "Chair" : "Styreleder",
      color: "#74cd85",
      perms: en
        ? ["All pages", "Approve members", "Sign agreements"]
        : ["Alle sider", "Godkjenne medlemmer", "Signere avtaler"],
    },
    {
      id: "treasurer",
      name: en ? "Treasurer" : "Kasserer",
      color: "#ffd66e",
      perms: en ? ["Finance", "Invoicing", "Team fund"] : ["Økonomi", "Fakturering", "Lagkasse"],
    },
    {
      id: "board",
      name: en ? "Board member" : "Styremedlem",
      color: "#6cc3c1",
      perms: en ? ["Follow-up", "Activities", "Read finance"] : ["Oppfølging", "Aktiviteter", "Lese økonomi"],
    },
    {
      id: "coach",
      name: en ? "Coach" : "Trener",
      color: "#8fb4ea",
      perms: en
        ? ["Own groups", "Attendance", "Player notes"]
        : ["Egne grupper", "Oppmøte", "Spillernotater"],
    },
    {
      id: "manager",
      name: en ? "General manager" : "Daglig leder",
      color: "#b9a3e8",
      perms: en
        ? ["Daily operations", "Staff and volunteers", "Booking and messages"]
        : ["Daglig drift", "Ansatte og frivillige", "Booking og meldinger"],
    },
    {
      id: "volunteer",
      name: en ? "Volunteer lead" : "Dugnadsansvarlig",
      color: "#f4a88a",
      perms: en ? ["Volunteer shifts", "Kiosk", "Messages"] : ["Dugnadsvakter", "Kiosk", "Meldinger"],
    },
  ];
}

// Member payments.
export function payments(en) {
  return [
    {
      id: "p1",
      club: "vif",
      supplier: "Oslo kommune",
      no: "2026-88412",
      desc: en ? "Hall rent October, Leangen" : "Halleie oktober, Leangen",
      n: 34000,
      due: "2026-09-30",
    },
    {
      id: "p2",
      club: "vif",
      supplier: "Stadion Sport",
      no: "SS-19033",
      desc: en ? "Match balls and cones" : "Kampballer og kjegler",
      n: 8400,
      due: "2026-10-05",
    },
    {
      id: "p3",
      club: "fana",
      supplier: "Tide Buss",
      no: "TB-55120",
      desc: en ? "Bus to away cup" : "Buss til bortecup",
      n: 12600,
      due: "2026-09-26",
    },
    {
      id: "p4",
      club: "fana",
      supplier: "Norges Fotballforbund",
      no: "NFF-7730",
      desc: en ? "Referee fees September" : "Dommerhonorar september",
      n: 6200,
      due: "2026-10-10",
    },
    {
      id: "p5",
      club: "varden",
      supplier: "Tibhar Norge",
      no: "TN-3021",
      desc: en ? "Nets and balls" : "Nett og baller",
      n: 4800,
      due: "2026-10-01",
    },
    {
      id: "p6",
      club: "varden",
      supplier: "Oslo kommune",
      no: "2026-88590",
      desc: en ? "Hall rent Q4, Vardenhallen" : "Halleie 4. kvartal, Vardenhallen",
      n: 12000,
      due: "2026-10-15",
    },
    {
      id: "p7",
      club: "vif",
      supplier: "Asko",
      no: "AS-40091",
      desc: en ? "Kiosk restock" : "Påfyll kiosk",
      n: 4800,
      due: "2026-09-18",
      paid: true,
    },
  ];
}

// Bookable venues.
export function venues(en) {
  return [
    {
      id: "vif",
      slug: "vif",
      name: "Lade Kunstløp",
      venue: "Leangen Ishall",
      count: 4,
      unit: en ? "court" : "bane",
      meta: en ? "Leangen Ishall · 4 courts" : "Leangen Ishall · 4 baner",
    },
    {
      id: "fana",
      slug: "fana",
      name: "IL Fana Fotball",
      venue: en ? "Fana turf" : "Fana kunstgress",
      count: 3,
      unit: en ? "pitch" : "bane",
      meta: en ? "Fana turf · 3 pitches" : "Fana kunstgress · 3 baner",
    },
    {
      id: "varden",
      slug: "bordtennis",
      name: "Varden BTK",
      venue: "Vardenhallen",
      count: 20,
      unit: en ? "table" : "bord",
      meta: en ? "Vardenhallen · 20 tables" : "Vardenhallen · 20 bord",
    },
  ];
}

// Board decisions and follow-up.
export function boardDecisions(en) {
  return [
    {
      id: "d1",
      title: en ? "Send autumn fee reminders" : "Sende purring på høstkontingent",
      owner: "Hanne Hauge",
      due: en ? "30 Sep" : "30. sep",
    },
    {
      id: "d2",
      title: en ? "Apply to the municipal youth fund" : "Søke kommunalt ungdomsfond",
      owner: "Ida Krogh",
      due: en ? "1 Oct" : "1. okt",
    },
    {
      id: "d3",
      title: en ? "Book referees for the tournament" : "Booke dommere til turneringen",
      owner: "Marit Sunde",
      due: en ? "28 Sep" : "28. sep",
    },
    {
      id: "d4",
      title: en ? "Renew the Vestland Bygg agreement" : "Fornye avtalen med Vestland Bygg",
      owner: "Sigrid A.",
      due: en ? "30 Sep" : "30. sep",
    },
    {
      id: "d5",
      title: en ? "Approve summer camp budget" : "Godkjenne budsjett sommerleir",
      owner: "Anne Bjørk",
      due: en ? "10 Jun" : "10. jun",
      done: true,
    },
  ];
}

// Board members.
export function boardMembers(en) {
  return [
    { id: "c1", name: "Marit Sunde", role: en ? "Chair" : "Styreleder" },
    { id: "c2", name: "Anne Bjørk", role: en ? "Treasurer" : "Kasserer" },
    { id: "c3", name: "Jonas Reite", role: en ? "Sports lead" : "Sportslig leder" },
    { id: "c4", name: "Thomas Lie", role: en ? "Hall manager" : "Hallansvarlig" },
    { id: "c5", name: "Ida Krogh", role: en ? "Partner manager" : "Partneransvarlig" },
  ];
}

// Income categories.
export function incomeCategories(en) {
  return [
    { id: "fee", label: en ? "Membership fees" : "Kontingent", color: "#16542a", base: 42 },
    { id: "sponsor", label: en ? "Sponsors" : "Sponsorer", color: "#1f7a3a", base: 24 },
    { id: "event", label: en ? "Events" : "Arrangementer", color: "#3f9a58", base: 14 },
    { id: "kiosk", label: "Kiosk", color: "#74cd85", base: 11 },
    { id: "grant", label: en ? "Grants" : "Tilskudd", color: "#b5e6bf", base: 9 },
  ];
}

// Expense categories.
export function expenseCategories(en) {
  return [
    { id: "ops", label: en ? "Operating costs" : "Driftskostnader", color: "#b8240e", base: 38 },
    { id: "equip", label: en ? "Equipment" : "Utstyr", color: "#ec3013", base: 22 },
    { id: "travel", label: en ? "Travel" : "Reiser", color: "#f5793a", base: 17 },
    { id: "coach", label: en ? "Coaching" : "Trenerhonorar", color: "#f7a93b", base: 14 },
    { id: "mkt", label: en ? "Marketing" : "Markedsføring", color: "#ffd66e", base: 9 },
  ];
}

// Season plan categories.
export function seasonCategories(en) {
  return [
    { label: en ? "Operating costs" : "Driftskostnader", n: 36, color: "#1f7a3a" },
    { label: en ? "Equipment" : "Utstyr", n: 24, color: "#74cd85" },
    { label: en ? "Travel" : "Reiser", n: 19, color: "#ffc94a" },
    { label: en ? "Coaching" : "Trenerhonorar", n: 13, color: "#a3e2ae" },
    { label: en ? "Marketing" : "Markedsføring", n: 8, color: "#c9d8c4" },
  ];
}
