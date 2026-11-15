import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hv from "../../components/Hv";
import { designHref } from "../../lib/routes";
import { useLang } from "../../lib/langContext";
import { sx } from "../../lib/sx";
import shotStyret from "../../assets/design/kretz-shot-styret.png";
import shotDashboard from "../../assets/design/kretz-shot-dashboard.png";
import "../../styles/subpage.css";
import "../../styles/pages/for-hvem.css";

/*
  "Kretz For hvem.dc.html" — who Kretz is for: a hero, six role cards (each
  with a small mock; hovering or focusing a card slides in what Kretz helps
  that role with) and a demo CTA with two product screenshots.
*/

const STAGE =
  "position: relative; background-color: #eaf6ec; background-image: radial-gradient(rgba(31,122,58,.16) 1px, transparent 1.2px), linear-gradient(160deg, #f1faf2 0%, #e2f2e6 100%); background-size: 16px 16px, 100% 100%; border-radius: 0; padding: 26px; min-height: 230px; display: flex; align-items: center; justify-content: center";
const PANEL =
  "border-radius: 22px; background: #ffffff; border: 1px solid rgba(116,205,133,.35); box-shadow: 0 24px 60px rgba(31,122,58,.14); padding: 16px";
const ROW = "display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13px";
const FREE = "border: 1.5px dashed rgba(31,122,58,.35); background: #f4f8f2; color: #1f7a3a;";
const TAKEN = "background: #16241a; color: #f6f8f3;";

function Check({ ink = "#16241a", bg = "#74cd85", style }) {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: "0 0 auto",
        width: 20,
        height: 20,
        borderRadius: 999,
        background: bg,
        display: "grid",
        placeItems: "center",
        ...style,
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24">
        <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={ink} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Progress({ pct }) {
  return (
    <div style={{ height: 8, borderRadius: 999, background: "#eef2ec", marginTop: 8, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 999, background: "#74cd85" }} />
    </div>
  );
}

/* Mini mocks, one per role. */

function MockBoard() {
  const { t } = useLang();
  return (
    <div style={sx(PANEL + "; max-width: 420px")}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 40, height: 46, borderRadius: 8, background: "#fbe3e7", position: "relative", flex: "0 0 auto" }}>
          <span
            style={sx(
              "position: absolute; left: -4px; bottom: 6px; padding: 2px 5px; border-radius: 4px; background: #d9485f; color: #fff; font-size: 9px; font-weight: 800",
            )}
          >
            PDF
          </span>
        </span>
        <span style={{ flex: 1 }}>
          <b style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: 15 }}>
            {t("Protokoll årsmøte 2026", "Annual meeting minutes 2026")}
          </b>
          <span style={{ fontSize: 12.5, color: "#4C5E50" }}>{t("2 av 2 har signert", "2 of 2 have signed")}</span>
        </span>
        <Check ink="#ffffff" bg="#1f7a3a" />
      </div>
      <div style={sx(ROW)}>
        <span style={{ flex: 1 }}>{t("Innkalling sendt", "Notice sent")}</span>
        <span style={{ color: "#4C5E50" }}>{t("1. mars", "1 March")}</span>
      </div>
      <div style={sx(ROW)}>
        <span style={{ flex: 1 }}>{t("Nytt styre meldt", "New board reported")}</span>
        <span style={{ color: "#4C5E50" }}>Brønnøysund ✓</span>
      </div>
    </div>
  );
}

function MockTreasurer() {
  const { t } = useLang();
  return (
    <div style={sx(PANEL)}>
      <b style={{ fontFamily: "var(--font-heading)", fontSize: 15 }}>{t("Kontingent høst 2026", "Fees autumn 2026")}</b>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13 }}>
        <span>{t("563 av 612 betalt", "563 of 612 paid")}</span>
        <b style={{ color: "#1f7a3a" }}>{t("92 %", "92%")}</b>
      </div>
      <Progress pct={92} />
      <div
        style={sx(
          "display: inline-flex; margin-top: 12px; padding: 6px 12px; border-radius: 999px; background: #fff6d6; color: #6b5300; font-size: 12.5px; font-weight: 700",
        )}
      >
        {t("Purring sendt til 49", "Reminder sent to 49")}
      </div>
    </div>
  );
}

const AVATARS = [
  ["EH", "#1f7a3a"],
  ["NB", "#16241a"],
  ["SN", "#3f9a58"],
  ["JL", "#2f6fb3"],
  ["MK", "#1f7a3a"],
];

function MockCoach() {
  const { t } = useLang();
  return (
    <div style={sx(PANEL)}>
      <b style={{ fontFamily: "var(--font-heading)", fontSize: 15 }}>{t("Trening G14 · i dag 18:00", "Training B14 · today 18:00")}</b>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13 }}>
        <span>{t("18 av 22 kommer", "18 of 22 coming")}</span>
        <span style={{ color: "#4C5E50" }}>{t("2 ikke svart", "2 not replied")}</span>
      </div>
      <Progress pct={82} />
      <div style={{ display: "flex", marginTop: 12 }}>
        {AVATARS.map(([ini, bg], i) => (
          <span
            key={ini}
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              border: "2px solid #fff",
              background: bg,
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 10,
              fontWeight: 700,
              marginLeft: i ? -7 : 0,
            }}
          >
            {ini}
          </span>
        ))}
      </div>
    </div>
  );
}

function MockTeamLead() {
  const { t } = useLang();
  return (
    <div style={sx(PANEL)}>
      <b style={{ fontFamily: "var(--font-heading)", fontSize: 15 }}>{t("Melding til foreldre · J12", "Message to parents · G12")}</b>
      <div
        style={sx(
          "margin-top: 10px; padding: 12px 14px; border-radius: 14px 14px 14px 4px; background: #f4f8f2; font-size: 13px; line-height: 1.5",
        )}
      >
        {t(
          "Husk drakt og drikkeflaske til cupen lørdag! Oppmøte 08:30.",
          "Remember kit and a water bottle for the cup on Saturday! Meet at 08:30.",
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12.5, color: "#4C5E50" }}>
        <span>{t("Sendt til 22 foreldre", "Sent to 22 parents")}</span>
        <b style={{ color: "#1f7a3a" }}>{t("19 har lest", "19 have read")}</b>
      </div>
    </div>
  );
}

function MockParent() {
  const { t } = useLang();
  return (
    <div style={sx("margin: 0 auto; width: 210px; border-radius: 28px; background: #16241a; padding: 8px; box-shadow: 0 24px 50px rgba(31,122,58,.25)")}>
      <div style={{ borderRadius: 22, background: "#ffffff", padding: "16px 14px" }}>
        <div style={{ fontSize: 11, color: "#4C5E50" }}>{t("Hei, Kari 👋", "Hi, Kari 👋")}</div>
        <b style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: 14, marginTop: 4 }}>
          {t("Emma · J12", "Emma · G12")}
        </b>
        <div style={{ marginTop: 10, padding: 10, borderRadius: 12, background: "#f4f8f2", fontSize: 12 }}>
          <b style={{ display: "block" }}>{t("Trening i dag 18:00", "Training today 18:00")}</b>
          <span
            style={sx(
              "display: inline-block; margin-top: 6px; padding: 3px 9px; border-radius: 999px; background: #1f7a3a; color: #fff; font-weight: 700",
            )}
          >
            {t("Kommer ✓", "Coming ✓")}
          </span>
        </div>
        <div style={{ marginTop: 8, padding: 10, borderRadius: 12, background: "#eaf7ed", fontSize: 12 }}>
          <b>{t("Kontingent betalt", "Fee paid")}</b> · Vipps
        </div>
      </div>
    </div>
  );
}

function MockHall() {
  const { t } = useLang();
  const cell = (v) => {
    const base = "padding: 7px 4px; border-radius: 8px; text-align: center; font-size: 12px; font-weight: 600; ";
    return v ? <span style={sx(base + TAKEN)}>{v}</span> : <span style={sx(base + FREE)}>{t("Ledig", "Free")}</span>;
  };
  const rows = [
    ["17:00", t("G12", "B12"), null],
    ["18:00", t("G14", "B14"), t("J12", "G12")],
    ["19:00", null, t("Bursdag", "Birthday")],
  ];
  return (
    <div style={sx(PANEL)}>
      <b style={{ fontFamily: "var(--font-heading)", fontSize: 15 }}>{t("Nardohallen · onsdag", "Nardohallen · Wednesday")}</b>
      {rows.map(([time, a, b]) => (
        <div key={time} style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr", gap: 6, alignItems: "center", marginTop: 7 }}>
          <span style={{ fontSize: 12, color: "#4C5E50" }}>{time}</span>
          {cell(a)}
          {cell(b)}
        </div>
      ))}
    </div>
  );
}

const ROLES = [
  {
    href: "Kretz AR-oppgave.dc.html",
    Mock: MockBoard,
    title: ["Styreledere", "Board chairs"],
    help: ["Kretz hjelper styreledere med", "Kretz helps board chairs with"],
    text: [
      "Bruker du mer tid på papirer enn på å lede klubben? Få årsmøte, protokoller og frister samlet på ett sted.",
      "Spending more time on paperwork than on leading the club? Get the annual meeting, minutes and deadlines in one place.",
    ],
    points: [
      ["Årsmøte med innkalling, saksliste og protokoll", "Annual meeting with notice, agenda and minutes"],
      ["Signering av protokoller og avtaler", "Signing of minutes and agreements"],
      ["Årshjul med påminnelser før fristene", "Annual calendar with reminders before deadlines"],
      ["Melding om nytt styre til Brønnøysund", "Reporting the new board to the Brønnøysund Register"],
    ],
  },
  {
    href: "Kretz Okonomi.dc.html",
    Mock: MockTreasurer,
    title: ["Kasserere", "Treasurers"],
    help: ["Kretz hjelper kasserere med", "Kretz helps treasurers with"],
    text: [
      "Limer du sammen Vipps, nettbank og regneark før hvert styremøte? Få kontingent og regnskap som oppdaterer seg selv.",
      "Stitching together Vipps, online banking and spreadsheets before every board meeting? Get fees and accounts that update themselves.",
    ],
    points: [
      ["Automatisk kontingent og purringer", "Automatic fees and reminders"],
      ["Alle Vipps-innbetalinger samlet", "All Vipps payments in one place"],
      ["Budsjett mot resultat i sanntid", "Budget against actuals in real time"],
      ["Eksport til regnskapssystemet", "Export to the accounting system"],
    ],
  },
  {
    href: "Kretz Aktiviteter.dc.html",
    Mock: MockCoach,
    title: ["Trenere", "Coaches"],
    help: ["Kretz hjelper trenere med", "Kretz helps coaches with"],
    text: [
      "Jager du svar i fem chatgrupper før hver trening? Se hvem som kommer – og la Kretz sende påminnelsene.",
      "Chasing replies in five group chats before every session? See who is coming – and let Kretz send the reminders.",
    ],
    points: [
      ["Påmelding med ett trykk for spillerne", "One-tap sign-up for players"],
      ["Automatiske påminnelser til dem som ikke svarer", "Automatic reminders to those who don't reply"],
      ["Oppmøte registrert på sekunder", "Attendance recorded in seconds"],
      ["Kontaktinfo til foreldrene på laget", "Contact details for the team's parents"],
    ],
  },
  {
    href: "Kretz Medlemsregister.dc.html",
    Mock: MockTeamLead,
    title: ["Lagledere", "Team managers"],
    help: ["Kretz hjelper lagledere med", "Kretz helps team managers with"],
    text: [
      "Skal beskjeden nå alle foreldre, og bare dem? Send meldinger og kamptropper til riktig lag med ett trykk.",
      "Need a message to reach every parent, and only them? Send messages and match squads to the right team with one tap.",
    ],
    points: [
      ["Meldinger til riktig lag og foreldre", "Messages to the right team and parents"],
      ["Kamptropper og cup-påmelding", "Match squads and cup registration"],
      ["Dugnadsvakter fordelt rettferdig", "Volunteer shifts shared fairly"],
      ["Oversikt over spillere og foresatte", "Overview of players and guardians"],
    ],
  },
  {
    href: "Kretz Aktiviteter.dc.html",
    Mock: MockParent,
    title: ["Foreldre", "Parents"],
    help: ["Kretz hjelper foreldre med", "Kretz helps parents with"],
    text: [
      "Vil du ha treninger, betaling og dugnad for alle barna i én app? Svar, betal og ta vakter fra sidelinja.",
      "Want training, payments and volunteering for all your children in one app? Reply, pay and take shifts from the sideline.",
    ],
    points: [
      ["Alle barna samlet i én app", "All your children in one app"],
      ["Svar på treninger og kamper", "Reply to training and matches"],
      ["Betal kontingent med Vipps", "Pay fees with Vipps"],
      ["Ta dugnadsvakter selv", "Pick volunteer shifts yourself"],
    ],
  },
  {
    href: "Kretz Hallbooking.dc.html",
    Mock: MockHall,
    title: ["Hallansvarlige", "Hall managers"],
    help: ["Kretz hjelper hallansvarlige med", "Kretz helps hall managers with"],
    text: [
      "Får du SMS om ledige timer på søndagskvelden? La medlemmene booke og betale selv.",
      "Getting texts about free slots on Sunday evenings? Let members book and pay themselves.",
    ],
    points: [
      ["Treningsplanen for hele sesongen", "The training schedule for the whole season"],
      ["Medlemmer som booker og betaler selv", "Members who book and pay themselves"],
      ["Venteliste når noen avbestiller", "A waiting list when someone cancels"],
      ["Leieinntekter rett i regnskapet", "Rental income straight into the accounts"],
    ],
  },
];

export default function ForHvemPage({ onOpenLogin, onOpenSignup, onOpenBooking }) {
  const { t } = useLang();
  const L = (pair) => t(pair[0], pair[1]);

  return (
    <div className="kz-sub kz-fh">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} onOpenBooking={onOpenBooking} />

      {/* HERO */}
      <section data-rsp-pad style={{ padding: "40px 28px 24px" }}>
        <div
          data-rsp-wide
          data-kz-cta
          style={sx(
            "position: relative; overflow: hidden; max-width: 1200px; margin: 0 auto; box-sizing: border-box; padding: 72px 48px 76px; border-radius: 40px; text-align: center; background-color: #e3f3e7; background-image: radial-gradient(rgba(31,122,58,.16) 1px, transparent 1.2px), linear-gradient(160deg, #eef9f0 0%, #d6efdc 100%); background-size: 16px 16px, 100% 100%",
          )}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 1000"
            style={sx(
              "position: absolute; left: 50%; top: 50%; width: 1100px; height: 1100px; max-width: none; transform: translate(-50%, -50%); pointer-events: none",
            )}
          >
            <circle cx="500" cy="500" r="410" fill="none" stroke="rgba(116,205,133,.18)" strokeWidth="80" />
            <circle cx="500" cy="500" r="300" fill="none" stroke="rgba(22,36,26,.08)" strokeWidth="1.5" strokeDasharray="5 9" />
          </svg>
          <div
            style={sx(
              "position: relative; display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px; border-radius: 999px; border: 1.5px solid #74cd85; background: rgba(255,255,255,.6); font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #1f7a3a",
            )}
          >
            {t("For hvem", "Who it's for")}
          </div>
          <h1
            style={sx(
              "position: relative; font-family: var(--font-heading); font-weight: 800; font-size: clamp(38px, 5.6vw, 68px); line-height: 1; margin: 20px auto 0",
            )}
          >
            {t("Laget for alle", "Made for everyone")}
            <br />
            <span style={{ color: "#1f7a3a" }}>{t("som holder klubben i gang", "who keeps the club going")}</span>
          </h1>
          <p style={sx("position: relative; margin: 20px auto 0; font-size: 18px; line-height: 1.6; color: #3b4d3f; max-width: 40em")}>
            {t(
              "Kretz gir styret, trenerne, foreldrene og de frivillige en felles oversikt over medlemmer, aktiviteter, økonomi og anlegg – så hver enkelt ser akkurat det de trenger.",
              "Kretz gives the board, coaches, parents and volunteers a shared overview of members, activities, finances and facilities – so each person sees exactly what they need.",
            )}
          </p>
        </div>
      </section>

      {/* ROLES */}
      <section data-rsp-pad style={{ padding: "48px 28px 40px" }}>
        <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center" }}>
            <span
              style={sx(
                "display: inline-flex; align-items: center; padding: 10px 22px; border-radius: 999px; background: rgba(116,205,133,.18); border: 1.5px solid rgba(116,205,133,.55); color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 15px; letter-spacing: .02em",
              )}
            >
              {t("Roller", "Roles")}
            </span>
            <h2
              style={sx(
                "font-family: var(--font-heading); font-weight: 800; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; margin: 18px 0 0",
              )}
            >
              {t("Fart og orden i alle ledd", "Pace and order at every level")}
            </h2>
            <p style={sx("margin: 12px auto 0; font-size: 17px; line-height: 1.6; color: #4C5E50; max-width: 36em")}>
              {t(
                "Finn rollen din, og se hvordan Kretz gjør hverdagen enklere for akkurat deg.",
                "Find your role, and see how Kretz makes everyday life easier for you.",
              )}
            </p>
          </div>
          <div
            data-rsp-cols="3"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, marginTop: 36 }}
          >
            {ROLES.map(({ href, Mock, title, help, text, points }) => (
              <a
                key={title[0]}
                href={designHref(href)}
                className="kz-card kzh-role"
                data-reveal
                style={sx(
                  "position: relative; display: flex; flex-direction: column; border-radius: 28px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); overflow: hidden; color: #16241a",
                )}
              >
                <div style={sx(STAGE)}>
                  <div style={{ width: "100%", maxWidth: 360 }}>
                    <Mock />
                  </div>
                </div>
                <div style={{ padding: "22px 26px 24px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <b style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px")}>{L(title)}</b>
                  <span style={{ fontSize: 15, lineHeight: 1.55, color: "#4C5E50" }}>{L(text)}</span>
                  <span style={{ marginTop: "auto", paddingTop: 8, fontWeight: 600, color: "#1f7a3a" }}>
                    {t("Les mer", "Read more")}{" "}
                    <span className="kz-arr" aria-hidden="true">
                      →
                    </span>
                  </span>
                </div>
                <div
                  className="kzh-help"
                  style={sx(
                    "position: absolute; inset: 0; z-index: 2; display: flex; flex-direction: column; padding: 28px; border-radius: 28px; background: #16241a; color: #f6f8f3",
                  )}
                >
                  <span
                    style={sx(
                      "font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #a3e2ae",
                    )}
                  >
                    {L(help)}
                  </span>
                  <b
                    style={sx(
                      "display: block; margin-top: 8px; font-family: var(--font-heading); font-weight: 800; font-size: 24px; color: #f6f8f3",
                    )}
                  >
                    {L(title)}
                  </b>
                  <ul
                    style={sx(
                      "list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 12px; font-size: 15.5px; line-height: 1.45; color: rgba(246,248,243,.92)",
                    )}
                  >
                    {points.map((p) => (
                      <li key={p[0]} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Check style={{ marginTop: 1 }} />
                        <span>{L(p)}</span>
                      </li>
                    ))}
                  </ul>
                  <span style={{ marginTop: "auto", paddingTop: 16, fontWeight: 700, color: "#a3e2ae" }}>
                    {t("Les mer", "Read more")}{" "}
                    <span className="kz-arr" aria-hidden="true">
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-rsp-pad style={{ padding: "40px 28px 90px" }}>
        <div
          data-rsp-wide
          data-rsp="stack"
          data-kz-cta
          data-reveal
          style={sx(
            "max-width: 1200px; margin: 0 auto; box-sizing: border-box; border-radius: 34px; background: linear-gradient(135deg, #a3e2ae 0%, #74cd85 100%); color: #16241a; position: relative; overflow: hidden; min-height: 420px; padding: 0 0 0 64px; display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 32px 56px; align-items: stretch",
          )}
        >
          <div style={{ minWidth: 0, alignSelf: "center", padding: "56px 0" }}>
            <h2
              style={sx(
                "font-family: var(--font-heading); font-weight: 800; font-size: clamp(28px, 3.4vw, 42px); line-height: 1.08; margin: 0; color: #16241a",
              )}
            >
              {t("Book en demo av Kretz i dag", "Book a Kretz demo today")}
            </h2>
            <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "#22382a", maxWidth: "30em" }}>
              {t(
                "Vi viser hvordan Kretz fungerer for akkurat din rolle – enten du leder styret, trener et lag eller holder orden på økonomien.",
                "We show how Kretz works for your role – whether you lead the board, coach a team or keep the finances in order.",
              )}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
              <Hv
                as="a"
                href={designHref("Kretz.dc.html#kom-i-gang")}
                style="display: inline-flex; align-items: center; padding: 15px 26px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 15px; white-space: nowrap; transition: background .3s, transform .3s cubic-bezier(.2,.7,.2,1)"
                hover="background: #1f3a27; color: #f6f8f3; transform: translateY(-2px)"
              >
                {t("Book en demo", "Book a demo")}
              </Hv>
              <Hv
                as="a"
                href={designHref("Kretz Funksjoner.dc.html")}
                style="display: inline-flex; align-items: center; padding: 15px 26px; border-radius: 999px; background: transparent; border: 1px solid #16241a; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 15px; white-space: nowrap; transition: background .3s, color .3s"
                hover="background: #16241a; color: #f6f8f3"
              >
                {t("Se alle funksjoner", "See all features")}
              </Hv>
            </div>
          </div>
          <div data-kz-hidetab style={{ position: "relative", minHeight: 480 }}>
            <img
              src={shotStyret}
              alt={t("Kretz: styret med neste styremøte, styremøter og vedtak", "Kretz: the board with the next meeting, meetings and decisions")}
              style={sx(
                "position: absolute; left: 0; bottom: -40px; width: 108%; max-width: none; height: auto; border-radius: 16px 16px 0 0; box-shadow: 0 24px 60px rgba(22,36,26,.22); border: 1px solid rgba(22,36,26,.08)",
              )}
            />
            <img
              src={shotDashboard}
              alt={t(
                "Kretz: oversikt for administrator med nøkkeltall og planlegger",
                "Kretz: administrator overview with key figures and planner",
              )}
              style={sx(
                "position: absolute; left: 24%; bottom: -16px; width: 140%; max-width: none; height: auto; border-radius: 16px 0 0 0; box-shadow: 0 30px 70px rgba(22,36,26,.28); border: 1px solid rgba(22,36,26,.08)",
              )}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
