import { useState } from "react";
import FeatureDetail from "../../components/info/FeatureDetail";
import { sx } from "../../lib/sx";
import { useLang } from "../../lib/langContext";

/*
  Hallbooking — port of "Kretz Hallbooking.dc.html". The hero mockup is a
  small week grid for two courts: pick a day, pick a free hour, "pay" with
  Vipps. "Prøv bookingen" opens the real booking flow (onOpenBooking).
*/

const DAYS = [
  ["Man 17", "Mon 17"],
  ["Tir 18", "Tue 18"],
  ["Ons 19", "Wed 19"],
  ["Tor 20", "Thu 20"],
  ["Fre 21", "Fri 21"],
];
const TIMES = ["16:00", "17:00", "18:00", "19:00", "20:00"];
const BOOKED = [
  { A16: "G10", B16: "J10", A17: "G12", A18: "G14", B18: "J12", A19: "Senior" },
  { A16: "Allidrett", B17: "J14", A18: "G16", B19: "Old boys" },
  { A16: "G10", B16: "J10", A17: "G12", B17: "J12", A18: "G14", A20: "Senior" },
  { B16: "Allidrett", A17: "J14", A18: "G16", B18: "Keeper", A19: "Senior" },
  { A16: "G10", A17: "G12", B19: "Bedriftslag" },
];
// Team names that read differently in English.
const TEAM_EN = { Allidrett: "Multi-sport", Keeper: "Goalkeepers", Bedriftslag: "Company team" };

const CELL =
  "width: 100%; min-height: 34px; border-radius: 10px; font-family: var(--font-body); font-size: 13px; font-weight: 600; transition: background .2s, color .2s; ";

function dayStyle(on) {
  return (
    "padding: 7px 12px; border-radius: 999px; cursor: pointer; font-family: var(--font-body); font-size: 13px; font-weight: 600; " +
    (on
      ? "border: 1px solid #16241a; background: #16241a; color: #f6f8f3;"
      : "border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a;")
  );
}

function CourtMockup() {
  const { t, isEn } = useLang();
  const [day, setDay] = useState(2);
  const [picked, setPicked] = useState("");
  const [paid, setPaid] = useState(false);
  const booked = BOOKED[day];

  const cell = (court, time) => {
    const id = court + time.slice(0, 2);
    const team = booked[id];
    const on = picked === day + id;
    const label = team
      ? isEn && TEAM_EN[team]
        ? TEAM_EN[team]
        : team
      : on
        ? paid
          ? t("Booket ✓", "Booked ✓")
          : t("Valgt", "Selected")
        : t("Ledig", "Free");
    const style =
      CELL +
      (team
        ? "border: 0; background: #16241a; color: #f6f8f3; cursor: default;"
        : on
          ? "border: 0; background: #74cd85; color: #16241a; cursor: pointer;"
          : "border: 1.5px dashed rgba(31,122,58,.35); background: #f4f8f2; color: #1f7a3a; cursor: pointer;");
    return (
      <button
        type="button"
        disabled={!!team}
        aria-pressed={team ? undefined : on}
        onClick={() => {
          if (team) return;
          setPicked(on ? "" : day + id);
          setPaid(false);
        }}
        style={sx(style)}
      >
        {label}
      </button>
    );
  };

  const pk = picked ? { d: Number(picked[0]), court: picked[1], h: picked.slice(2) } : null;
  const pickLabel = pk
    ? `${DAYS[pk.d][isEn ? 1 : 0]} · ${t("Bane", "Court")} ${pk.court} · ${pk.h}:00–${Number(pk.h) + 1}:00`
    : "";

  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>
          {t("Nardohallen · uke 47", "Nardohallen · week 47")}
        </span>
        <span style={{ fontSize: 13, color: "#4C5E50" }}>{t("kr 450 per time", "NOK 450 per hour")}</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
        {DAYS.map((d, i) => (
          <button key={d[0]} type="button" onClick={() => setDay(i)} aria-pressed={i === day} style={sx(dayStyle(i === day))}>
            {d[isEn ? 1 : 0]}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "52px minmax(0,1fr) minmax(0,1fr)",
          gap: 8,
          marginTop: 16,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "#4C5E50",
        }}
      >
        <span />
        <span>{t("Bane A", "Court A")}</span>
        <span>{t("Bane B", "Court B")}</span>
      </div>
      <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
        {TIMES.map((time) => (
          <div
            key={day + time}
            style={{ display: "grid", gridTemplateColumns: "52px minmax(0,1fr) minmax(0,1fr)", gap: 8, alignItems: "center" }}
          >
            <span style={{ fontSize: 13, color: "#4C5E50" }}>{time}</span>
            {cell("A", time)}
            {cell("B", time)}
          </div>
        ))}
      </div>
      {pk ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "10px 14px",
            marginTop: 16,
            padding: "14px 16px",
            borderRadius: 16,
            background: "#f4f8f2",
          }}
        >
          <span style={{ flex: 1, minWidth: 0 }}>
            <b style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: 14.5 }}>{pickLabel}</b>
            <span style={{ fontSize: 12.5, color: "#4C5E50" }}>{t("kr 450 · betales ved booking", "NOK 450 · paid when booking")}</span>
          </span>
          <button
            type="button"
            onClick={() => setPaid(true)}
            style={sx(
              "padding: 11px 18px; border-radius: 999px; border: 0; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 14px; " +
                (paid ? "background: #eaf7ed; color: #1f7a3a;" : "background: #16241a; color: #f6f8f3;"),
            )}
          >
            {paid ? t("Betalt ✓", "Paid ✓") : t("Betal med Vipps", "Pay with Vipps")}
          </button>
        </div>
      ) : (
        <div
          style={{
            marginTop: 16,
            padding: "14px 16px",
            borderRadius: 16,
            border: "1.5px dashed rgba(31,122,58,.3)",
            fontSize: 13.5,
            color: "#4C5E50",
            textAlign: "center",
          }}
        >
          {t("Velg en ledig time for å booke", "Pick a free slot to book")}
        </div>
      )}
    </>
  );
}

export default function HallbookingPage(props) {
  const { t } = useLang();
  return (
    <FeatureDetail
      {...props}
      hero={{
        eyebrow: t("Kretz Anlegg · Hallbooking", "Kretz Facilities · Hall booking"),
        title: t("Ledig bane?", "Court free?"),
        accent: t("Book og betal på sekunder.", "Book and pay in seconds."),
        lead: t(
          "Medlemmer og lag ser hva som er ledig, booker baner og bord selv og betaler med Vipps i samme flyt. Hallansvarlig slipper SMS-er, regneark og purringer.",
          "Members and teams see what's free, book courts and tables themselves and pay with Vipps in the same flow. The hall manager is spared texts, spreadsheets and reminders.",
        ),
        secondary: { label: t("Prøv bookingen", "Try the booking"), onClick: props.onOpenBooking },
        ticks: [
          t("Ledige tider i sanntid", "Free slots in real time"),
          t("Vipps i samme flyt", "Vipps in the same flow"),
          t("Faste treningstider først", "Regular training times first"),
        ],
        mockup: <CourtMockup />,
        badge: t("Betalt med Vipps på sekunder", "Paid with Vipps in seconds"),
        badgeSide: "right",
      }}
      pain={{
        lead: t(
          "Hallen er full av folk – og hallansvarlig er full av meldinger.",
          "The hall is full of people – and the hall manager's phone is full of messages.",
        ),
        items: [
          [
            t("Dobbeltbookede baner", "Double-booked courts"),
            t(
              "To lag møter opp til samme tid fordi treningsplanen lå i ett regneark og byttene i en Messenger-tråd.",
              "Two teams turn up at the same time because the training plan was in a spreadsheet and the swaps in a Messenger thread.",
            ),
          ],
          [
            t("Leie som aldri blir betalt", "Rent that never gets paid"),
            t(
              "Utleie til bedriftslag og bursdager blir fakturert sent – eller glemt helt.",
              "Rentals to company teams and birthday parties are invoiced late – or forgotten entirely.",
            ),
          ],
          [
            t("Tomme timer ingen vet om", "Empty hours nobody knows about"),
            t(
              "Avlyste treninger blir aldri lagt ut igjen, så hallen står tom mens andre venter.",
              "Cancelled sessions are never put back up, so the hall stands empty while others wait.",
            ),
          ],
        ],
      }}
      how={{
        title: t("Fra ledig time til betalt booking", "From free slot to paid booking"),
        steps: [
          [
            t("Legg inn hallene", "Add the halls"),
            t(
              "Baner, bord og rom med priser, åpningstider og hvem som kan booke hva.",
              "Courts, tables and rooms with prices, opening hours and who can book what.",
            ),
          ],
          [
            t("Lås faste treningstider", "Lock regular training times"),
            t(
              "Treningsplanen for sesongen legges inn først. Resten blir ledig for booking.",
              "The season's training plan goes in first. The rest opens up for booking.",
            ),
          ],
          [
            t("Medlemmene booker selv", "Members book themselves"),
            t(
              "De ser ledige tider i appen, booker og betaler med Vipps – og får kvittering med en gang.",
              "They see free slots in the app, book and pay with Vipps – and get a receipt straight away.",
            ),
          ],
        ],
        listTitle: t("Nardohallen · torsdag", "Nardohallen · Thursday"),
        listRight: t("Status", "Status"),
        rows: [
          { kind: "done", label: t("Bane A · G14 trening", "Court A · G14 training"), value: t("Fast tid", "Regular slot") },
          { kind: "done", label: t("Bane B · Bursdag Emma", "Court B · Emma's birthday"), value: t("Betalt", "Paid") },
          { kind: "active", label: t("Bane A · Bedriftslaget", "Court A · Company team"), value: t("Venter betaling", "Awaiting payment") },
          { kind: "note", icon: "↺", label: t("Bane B · J12 avlyst", "Court B · J12 cancelled"), value: t("Lagt ut igjen", "Put back up") },
          { kind: "todo", label: t("Bane B · 20:00", "Court B · 20:00"), value: t("Ledig", "Free") },
        ],
      }}
      setup={{
        title: t("Regler som passer klubben", "Rules that suit your club"),
        lead: t(
          "Bestem hvem som kan booke hva, når og til hvilken pris – så går resten av seg selv.",
          "Decide who can book what, when and at what price – and the rest runs itself.",
        ),
        cardTitle: t("Oppsett · Nardohallen", "Set-up · Nardohallen"),
        items: [
          { key: "a", on: true, label: t("Baner og bord lagt inn", "Courts and tables added") },
          { key: "b", on: true, label: t("Priser for medlemmer og eksterne", "Prices for members and external renters") },
          { key: "c", on: true, label: t("Faste treningstider låst", "Regular training times locked") },
          { key: "d", on: false, label: t("Vipps koblet til", "Vipps connected") },
          { key: "e", on: false, label: t("Avbestillingsregler satt", "Cancellation rules set") },
        ],
      }}
      gets={{
        title: t("Mindre styr for hallansvarlig", "Less hassle for the hall manager"),
        lead: t(
          "Bookingene henger sammen med treningsplanen, medlemsregisteret og regnskapet.",
          "Bookings are connected to the training plan, the member register and the accounts.",
        ),
        items: [
          {
            title: t("Ulike priser", "Different prices"),
            text: t(
              "Medlemmer, lag og eksterne leietakere kan ha hver sin pris.",
              "Members, teams and external renters can each have their own price.",
            ),
            icon: (
              <>
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <circle cx="12" cy="12" r="2.5" />
              </>
            ),
          },
          {
            title: t("Kalender for hele anlegget", "Calendar for the whole facility"),
            text: t(
              "Se alle baner, rom og bord i én oversikt – per dag eller uke.",
              "See all courts, rooms and tables in one overview – by day or week.",
            ),
            icon: (
              <>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </>
            ),
          },
          {
            title: t("Avbestilling og venteliste", "Cancellation and waiting list"),
            text: t(
              "Ledig time går automatisk til nestemann på ventelisten.",
              "A freed-up slot goes automatically to the next person on the waiting list.",
            ),
            icon: (
              <>
                <path d="M4 12a8 8 0 1 0 3-6.2" />
                <path d="M4 4v4h4" />
              </>
            ),
          },
          {
            title: t("Inntekter rett i regnskapet", "Income straight into the accounts"),
            text: t(
              "Leieinntekter bokføres og kan eksporteres til regnskapssystemet.",
              "Rental income is booked and can be exported to your accounting system.",
            ),
            icon: (
              <>
                <path d="M4 19V5M4 19h16" />
                <path d="M8 15l3-4 3 2 4-6" />
              </>
            ),
          },
        ],
      }}
      related={[
        {
          file: "Kretz Okonomi.dc.html",
          title: t("Økonomi og rapport", "Finance and reporting"),
          text: t("Leieinntektene havner rett i budsjett og regnskap.", "Rental income lands straight in the budget and accounts."),
        },
        {
          file: "Kretz Aktiviteter.dc.html",
          title: t("Aktiviteter og påmelding", "Activities and sign-ups"),
          text: t("Treninger og kamper bruker de samme hallene og tidene.", "Training and matches use the same halls and times."),
        },
        {
          file: "Kretz Medlemsregister.dc.html",
          title: t("Medlemsregister", "Member register"),
          text: t("Medlemmer får medlemspris automatisk når de booker.", "Members get the member price automatically when they book."),
        },
      ]}
      cta={{
        title: t("Klar for en hall som booker seg selv?", "Ready for a hall that books itself?"),
        text: t(
          "Vi legger inn hallene og treningsplanen for dere, og går gjennom oppsettet sammen.",
          "We add the halls and the training plan for you, and go through the set-up together.",
        ),
      }}
    />
  );
}
