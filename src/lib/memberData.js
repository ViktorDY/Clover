/*
  Seed content for the member dashboard, transcribed from the design canvas.

  Every user-facing string is a { no, en } pair so the NO/EN toggle works
  across the whole dashboard. There is no backend in this repo, so the
  dashboard treats this as its starting state and mutates it in React state.
*/

export const MEMBER_CLUBS = [
  { slug: "vif", name: "Vålerenga Håndball", short: "Vålerenga" },
  { slug: "fana", name: "IL Fana Fotball", short: "IL Fana" },
  { slug: "varden", name: "Varden BTK", short: "Varden" },
];

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

/*
  Activities run September–December 2026. `locked` marks the ones too far
  out to answer yet — the calendar still shows them, but they do not open.
*/
export const ACTIVITIES = [
  {
    id: "a1",
    club: "vif",
    group: "g14",
    m: 9,
    day: 12,
    title: { no: "G14 trening", en: "U14 training" },
    place: { no: "Bislett", en: "Bislett" },
    time: { no: "18:00–19:30", en: "18:00–19:30" },
    leader: { no: "Trener Ahmed", en: "Coach Ahmed" },
    cap: 22,
    joined: 18,
    kind: "signed",
  },
  {
    id: "a2",
    club: "fana",
    group: "keeper",
    m: 9,
    day: 13,
    title: { no: "Keepertrening", en: "Goalkeeper session" },
    place: { no: "Fana kunstgress", en: "Fana turf" },
    time: { no: "17:00–18:15", en: "17:00–18:15" },
    leader: { no: "Trener Nora", en: "Coach Nora" },
    cap: 8,
    joined: 5,
    kind: "signed",
  },
  {
    id: "a3",
    club: "vif",
    group: "g14",
    m: 9,
    day: 16,
    title: { no: "Seriekamp mot Skjetten", en: "League match vs Skjetten" },
    place: { no: "Jordal", en: "Jordal" },
    time: { no: "19:00–20:30", en: "19:00–20:30" },
    leader: { no: "Trener Ahmed", en: "Coach Ahmed" },
    cap: 16,
    joined: 14,
    kind: "signed",
  },
  {
    id: "a4",
    club: "varden",
    group: "open",
    m: 9,
    day: 18,
    title: { no: "Bordtennis, åpen hall", en: "Table tennis, open hall" },
    place: { no: "Vardenhallen", en: "Vardenhallen" },
    time: { no: "16:00–20:00", en: "16:00–20:00" },
    leader: { no: "Thomas Lie", en: "Thomas Lie" },
    cap: 40,
    joined: 12,
    kind: "signed",
  },
  {
    id: "a5",
    club: "vif",
    group: "dugnad",
    m: 9,
    day: 21,
    title: { no: "Kioskvakt, hjemmekamp", en: "Kiosk shift, home game" },
    place: { no: "Bislett", en: "Bislett" },
    time: { no: "16:00–20:00", en: "16:00–20:00" },
    leader: { no: "Styret", en: "The board" },
    cap: 6,
    joined: 4,
    kind: "dugnad",
  },
  {
    id: "a6",
    club: "fana",
    group: "keeper",
    m: 9,
    day: 27,
    title: { no: "Treningsleir, dag 1", en: "Training camp, day 1" },
    place: { no: "Hamar", en: "Hamar" },
    time: { no: "hele dagen", en: "all day" },
    leader: { no: "Leirkomiteen", en: "Camp committee" },
    cap: 30,
    joined: 21,
    kind: "pending",
  },
  {
    id: "a7",
    club: "varden",
    group: "turnering",
    m: 9,
    day: 29,
    title: { no: "Dugnad: rigging til turnering", en: "Volunteer shift: tournament setup" },
    place: { no: "Vardenhallen", en: "Vardenhallen" },
    time: { no: "17:00–20:00", en: "17:00–20:00" },
    leader: { no: "Ida K.", en: "Ida K." },
    cap: 12,
    joined: 7,
    kind: "dugnad",
    locked: true,
  },
  {
    id: "a8",
    club: "vif",
    group: "dugnad",
    m: 9,
    day: 30,
    title: { no: "Høstturneringen", en: "Autumn tournament" },
    place: { no: "Jordal", en: "Jordal" },
    time: { no: "hele dagen", en: "all day" },
    leader: { no: "Styret", en: "The board" },
    cap: 24,
    joined: 0,
    kind: "pending",
    locked: true,
  },
  {
    id: "a9",
    club: "vif",
    group: "g14",
    m: 10,
    day: 3,
    title: { no: "Seriekamp mot Nordstrand", en: "League match vs Nordstrand" },
    place: { no: "Bislett", en: "Bislett" },
    time: { no: "14:00–15:30", en: "14:00–15:30" },
    leader: { no: "Trener Ahmed", en: "Coach Ahmed" },
    cap: 16,
    joined: 9,
    kind: "pending",
    locked: true,
  },
  {
    id: "a10",
    club: "varden",
    group: "turnering",
    m: 10,
    day: 3,
    title: { no: "Turnering, Varden Open", en: "Tournament, Varden Open" },
    place: { no: "Vardenhallen", en: "Vardenhallen" },
    time: { no: "hele dagen", en: "all day" },
    leader: { no: "Ida K.", en: "Ida K." },
    cap: 64,
    joined: 38,
    kind: "pending",
    locked: true,
  },
  {
    id: "a11",
    club: "fana",
    group: "keeper",
    m: 10,
    day: 12,
    title: { no: "Høstferieleir", en: "Autumn break camp" },
    place: { no: "Fana", en: "Fana" },
    time: { no: "10:00–15:00", en: "10:00–15:00" },
    leader: { no: "Leirkomiteen", en: "Camp committee" },
    cap: 40,
    joined: 12,
    kind: "pending",
    locked: true,
  },
  {
    id: "a12",
    club: "vif",
    group: "dugnad",
    m: 11,
    day: 7,
    title: { no: "Klubbkveld og premieutdeling", en: "Club evening and awards" },
    place: { no: "Bislett", en: "Bislett" },
    time: { no: "18:00–21:00", en: "18:00–21:00" },
    leader: { no: "Styret", en: "The board" },
    cap: 120,
    joined: 44,
    kind: "pending",
    locked: true,
  },
];
export const PAYMENTS = [
  {
    club: "vif",
    title: { no: "Kontingent høst 2026", en: "Autumn fee 2026" },
    date: { no: "Forfaller 20. sep", en: "Due 20 Sep" },
    due: { no: "20. sep", en: "20 Sep" },
    amount: 1450,
    paid: false,
  },
  {
    club: "fana",
    title: { no: "Cup-avgift, Hamar", en: "Cup fee, Hamar" },
    date: { no: "Betalt 2. sep", en: "Paid 2 Sep" },
    amount: 600,
    paid: true,
  },
  {
    club: "varden",
    title: { no: "Halleie høst", en: "Hall rent, autumn" },
    date: { no: "Forfaller 28. sep", en: "Due 28 Sep" },
    due: { no: "28. sep", en: "28 Sep" },
    amount: 740,
    paid: false,
  },
  {
    club: "vif",
    title: { no: "Treningstøy", en: "Training kit" },
    date: { no: "Betalt 18. aug", en: "Paid 18 Aug" },
    amount: 890,
    paid: true,
  },
];

export const NOTICES = [
  {
    club: "vif",
    text: {
      no: "Treneren har flyttet torsdagstreningen til 17:30.",
      en: "The coach moved Thursday training to 17:30.",
    },
    when: { no: "for 2 timer siden", en: "2 hours ago" },
    tone: "green",
  },
  {
    club: "vif",
    text: {
      no: "Faktura for høstkontingenten forfaller om 8 dager.",
      en: "The autumn fee invoice is due in 8 days.",
    },
    when: { no: "i går", en: "yesterday" },
    tone: "amber",
  },
  {
    club: "fana",
    text: {
      no: "Ny melding fra styret om treningsleiren.",
      en: "New message from the board about the training camp.",
    },
    when: { no: "10. sep", en: "10 Sep" },
    tone: "grey",
  },
  {
    club: "varden",
    text: {
      no: "Halleien for høsten er nå tilgjengelig.",
      en: "Hall rent for the autumn is now available.",
    },
    when: { no: "9. sep", en: "9 Sep" },
    tone: "amber",
  },
  {
    club: "vif",
    text: {
      no: "Kioskvakten din 21. september er bekreftet.",
      en: "Your kiosk shift on 21 September is confirmed.",
    },
    when: { no: "8. sep", en: "8 Sep" },
    tone: "grey",
  },
];

/*
  Club posts. `priority: "high"` floats a post into its own band, and `photo`
  marks the ones the canvas shows with a picture — the handoff ships no
  images for them, so the flag only shows as a marker in the post's meta line.
*/
export const POSTS = [
  {
    id: "p1",
    club: "vif",
    priority: "high",
    photo: true,
    when: { no: "for 2 dager siden", en: "2 days ago" },
    title: { no: "Sesongåpningen endte 24–21", en: "Season opener ended 24–21" },
    text: {
      no: "Fullsatt Bislett så jentene snu kampen på de siste ti minuttene. Takk til alle som møtte opp — og til foreldrene som holdt kiosken gående hele kvelden.",
      en: "A packed Bislett saw the girls turn the game around in the last ten minutes. Thanks to everyone who showed up — and to the parents who ran the kiosk all evening.",
    },
    likes: 48,
    comments: 6,
  },
  {
    id: "p2",
    club: "varden",
    priority: "high",
    photo: false,
    when: { no: "forrige uke", en: "last week" },
    title: { no: "Turneringen trenger tolv frivillige", en: "Tournament needs twelve volunteers" },
    text: {
      no: "Meld deg på en vakt 3. oktober — to timer hver, og kioskpengene går rett tilbake til klubben.",
      en: "Sign up for a shift on 3 October — two hours each, and the kiosk money goes straight back into the club.",
    },
    likes: 17,
    comments: 9,
  },
  {
    id: "p3",
    club: "fana",
    priority: "normal",
    photo: true,
    when: { no: "for 4 dager siden", en: "4 days ago" },
    title: { no: "Ny sponsor for ungdomslagene", en: "New sponsor for the youth teams" },
    text: {
      no: "Fra oktober får alle lag fra G12 og opp nytt treningstøy, finansiert av vår nye lokale partner.",
      en: "From October, all teams from U12 up get new training kit — funded by our new local partner.",
    },
    likes: 31,
    comments: 3,
  },
  {
    id: "p4",
    club: "vif",
    priority: "normal",
    photo: false,
    when: { no: "for en uke siden", en: "1 week ago" },
    title: { no: "Halltidene for høsten er satt", en: "Hall times for the autumn are set" },
    text: {
      no: "Hele planen ligger i kalenderen. Si fra til treneren om en tid ser feil ut for gruppa di.",
      en: "The full schedule is in the calendar. Ask your coach if a slot looks wrong for your group.",
    },
    likes: 12,
    comments: 2,
  },
];

export function seedThreads() {
  return [
    {
      id: "t1",
      club: "vif",
      name: { no: "G14 lag og foreldre", en: "U14 team and parents" },
      group: true,
      members: 24,
      msgs: [
        {
          id: "m1",
          from: { no: "Trener Ahmed", en: "Coach Ahmed" },
          me: false,
          when: { no: "i dag 09:12", en: "today 09:12" },
          text: {
            no: "Torsdagstreningen flyttes til 17:30. Ta med begge draktene.",
            en: "Thursday training moves to 17:30. Bring both jerseys.",
          },
          unread: true,
        },
        {
          id: "m2",
          from: { no: "Marit S.", en: "Marit S." },
          me: false,
          when: { no: "i dag 09:31", en: "today 09:31" },
          text: { no: "Notert! Emma rekker det fint.", en: "Noted — Emma will make it." },
        },
        {
          id: "m3",
          from: { no: "Trener Ahmed", en: "Coach Ahmed" },
          me: false,
          when: { no: "i dag 09:44", en: "today 09:44" },
          text: {
            no: "Her er treningsplanen for uka.",
            en: "Here is the training plan for the week.",
          },
          file: {
            name: { no: "Treningsplan uke 38.pdf", en: "Training plan week 38.pdf" },
            kind: "doc",
            size: "240 kB",
          },
          unread: true,
        },
        {
          id: "m4",
          from: { no: "Du", en: "You" },
          me: true,
          when: { no: "i dag 10:02", en: "today 10:02" },
          text: {
            no: "Takk! Kan noen ta med ekstra baller?",
            en: "Thanks! Can someone bring extra balls?",
          },
        },
      ],
      folders: [
        {
          id: "general",
          name: { no: "Alle filer", en: "All files" },
          files: [
            {
              id: "f1",
              name: { no: "Treningsplan uke 38.pdf", en: "Training plan week 38.pdf" },
              kind: "doc",
              meta: { no: "240 kB · Trener Ahmed", en: "240 kB · Coach Ahmed" },
            },
          ],
        },
        {
          id: "kamper",
          name: { no: "Kamprapporter", en: "Match reports" },
          files: [
            {
              id: "f2",
              name: { no: "Kamprapport Skjetten.docx", en: "Match report Skjetten.docx" },
              kind: "doc",
              meta: { no: "88 kB · Styret", en: "88 kB · The board" },
            },
          ],
        },
        {
          id: "bilder",
          name: { no: "Bilder", en: "Photos" },
          files: [
            {
              id: "f3",
              name: { no: "Lagbilde 2026.jpg", en: "Team photo 2026.jpg" },
              kind: "img",
              meta: { no: "1,8 MB · Marit S.", en: "1.8 MB · Marit S." },
            },
          ],
        },
      ],
    },
    {
      id: "t2",
      club: "vif",
      name: { no: "Styret i Vålerenga", en: "The board at Vålerenga" },
      group: true,
      members: 7,
      msgs: [
        {
          id: "m1",
          from: { no: "Styret", en: "The board" },
          me: false,
          when: { no: "i går 20:10", en: "yesterday 20:10" },
          text: {
            no: "Høstkontingenten forfaller 20. september.",
            en: "The autumn fee is due 20 September.",
          },
          unread: true,
        },
        {
          id: "m2",
          from: { no: "Styret", en: "The board" },
          me: false,
          when: { no: "i går 20:12", en: "yesterday 20:12" },
          text: { no: "Fakturaoversikten ligger vedlagt.", en: "The invoice overview is attached." },
          file: {
            name: { no: "Kontingent høst 2026.xlsx", en: "Autumn fee 2026.xlsx" },
            kind: "doc",
            size: "54 kB",
          },
          unread: true,
        },
      ],
      folders: [
        {
          id: "general",
          name: { no: "Alle filer", en: "All files" },
          files: [
            {
              id: "f1",
              name: { no: "Kontingent høst 2026.xlsx", en: "Autumn fee 2026.xlsx" },
              kind: "doc",
              meta: { no: "54 kB · Styret", en: "54 kB · The board" },
            },
          ],
        },
      ],
    },
    {
      id: "t3",
      club: "fana",
      name: { no: "Leirkomiteen", en: "Camp committee" },
      group: true,
      members: 12,
      msgs: [
        {
          id: "m1",
          from: { no: "Leirkomiteen", en: "Camp committee" },
          me: false,
          when: { no: "10. sep", en: "10 Sep" },
          text: {
            no: "Vi trenger svar om treningsleiren innen fredag.",
            en: "We need an answer about the training camp by Friday.",
          },
          unread: true,
        },
        {
          id: "m2",
          from: { no: "Du", en: "You" },
          me: true,
          when: { no: "10. sep", en: "10 Sep" },
          text: { no: "Emma blir med begge dagene.", en: "Emma will join both days." },
        },
      ],
      folders: [
        {
          id: "general",
          name: { no: "Alle filer", en: "All files" },
          files: [
            {
              id: "f1",
              name: { no: "Program treningsleir.pdf", en: "Training camp programme.pdf" },
              kind: "doc",
              meta: { no: "310 kB · Leirkomiteen", en: "310 kB · Camp committee" },
            },
          ],
        },
      ],
    },
    {
      id: "t5",
      club: "vif",
      name: { no: "Foreldregruppa G14", en: "U14 parent group" },
      group: true,
      members: 19,
      msgs: [
        {
          id: "m1",
          from: { no: "Marit S.", en: "Marit S." },
          me: false,
          when: { no: "11. sep", en: "11 Sep" },
          text: {
            no: "Noen som kan kjøre til Jordal tirsdag?",
            en: "Can anyone drive to Jordal on Tuesday?",
          },
        },
        {
          id: "m2",
          from: { no: "Du", en: "You" },
          me: true,
          when: { no: "11. sep", en: "11 Sep" },
          text: { no: "Jeg har plass til tre.", en: "I have room for three." },
        },
      ],
      folders: [{ id: "general", name: { no: "Alle filer", en: "All files" }, files: [] }],
    },
    {
      id: "t6",
      club: "fana",
      name: { no: "Keeperteam Fana", en: "Fana goalkeepers" },
      group: true,
      members: 6,
      msgs: [
        {
          id: "m1",
          from: { no: "Trener Nora", en: "Coach Nora" },
          me: false,
          when: { no: "10. sep", en: "10 Sep" },
          text: {
            no: "Husk hansker til keepertreningen på mandag.",
            en: "Remember gloves for Monday goalkeeper training.",
          },
        },
      ],
      folders: [{ id: "general", name: { no: "Alle filer", en: "All files" }, files: [] }],
    },
    {
      id: "t7",
      club: "varden",
      name: { no: "Turneringsgruppa", en: "Tournament crew" },
      group: true,
      members: 14,
      msgs: [
        {
          id: "m1",
          from: { no: "Ida K.", en: "Ida K." },
          me: false,
          when: { no: "8. sep", en: "8 Sep" },
          text: {
            no: "Vaktlisten for 3. oktober er nesten full.",
            en: "The shift list for 3 October is almost full.",
          },
          unread: true,
        },
      ],
      folders: [{ id: "general", name: { no: "Alle filer", en: "All files" }, files: [] }],
    },
    {
      id: "t8",
      club: "vif",
      name: { no: "Kasserer Anne", en: "Treasurer Anne" },
      group: false,
      members: 2,
      msgs: [
        {
          id: "m1",
          from: { no: "Anne Bjørk", en: "Anne Bjørk" },
          me: false,
          when: { no: "5. sep", en: "5 Sep" },
          text: {
            no: "Kvitteringen for treningstøyet er registrert.",
            en: "The receipt for the training kit is registered.",
          },
        },
      ],
      folders: [{ id: "general", name: { no: "Alle filer", en: "All files" }, files: [] }],
    },
    {
      id: "t9",
      club: "fana",
      name: { no: "Cup-laget 2026", en: "Cup squad 2026" },
      group: true,
      members: 16,
      msgs: [
        {
          id: "m1",
          from: { no: "Jonas R.", en: "Jonas R." },
          me: false,
          when: { no: "3. sep", en: "3 Sep" },
          text: {
            no: "Vi er påmeldt til Hamar Cup. Gratulerer, alle sammen!",
            en: "We are signed up for Hamar Cup. Well done, everyone!",
          },
        },
      ],
      folders: [{ id: "general", name: { no: "Alle filer", en: "All files" }, files: [] }],
    },
    {
      id: "t4",
      club: "varden",
      name: { no: "Hallansvarlig Thomas", en: "Hall manager Thomas" },
      group: false,
      members: 2,
      msgs: [
        {
          id: "m1",
          from: { no: "Thomas Lie", en: "Thomas Lie" },
          me: false,
          when: { no: "9. sep", en: "9 Sep" },
          text: {
            no: "Åpen hall utvides til 20:00 på fredager denne høsten.",
            en: "Open hall is extended to 20:00 on Fridays this autumn.",
          },
        },
      ],
      folders: [{ id: "general", name: { no: "Alle filer", en: "All files" }, files: [] }],
    },
  ];
}

// Clubs offered in the member's booking picker, split into own vs others.
export const MY_BOOK_CLUBS = [
  {
    slug: "vif",
    name: "Vålerenga Håndball",
    meta: { no: "Bislett Hall · Oslo · 4 baner", en: "Bislett Hall · Oslo · 4 courts" },
  },
  {
    slug: "fana",
    name: "IL Fana Fotball",
    meta: { no: "Fana kunstgress · Bergen · 3 baner", en: "Fana turf · Bergen · 3 pitches" },
  },
  {
    slug: "bordtennis",
    name: "Varden Bordtennisklubb",
    meta: { no: "Vardenhallen · Oslo · 20 bord", en: "Vardenhallen · Oslo · 20 tables" },
  },
];

export const OTHER_BOOK_CLUBS = [
  {
    slug: "tennis",
    name: "Nordstrand Tennisklubb",
    meta: { no: "Nordstrandhallen · Oslo · 8 baner", en: "Nordstrandhallen · Oslo · 8 courts" },
  },
  {
    slug: "biljard",
    name: "Bergen Biljardklubb",
    meta: {
      no: "Nøstet Biljardsenter · Bergen · 14 bord",
      en: "Nøstet Biljardsenter · Bergen · 14 tables",
    },
  },
];

// Norwegian number formatting with a space thousands separator, then " kr".
export function nok(amount, isEn) {
  return `${amount.toLocaleString(isEn ? "en-GB" : "nb-NO").replace(/[\s,]/g, " ")} kr`;
}
