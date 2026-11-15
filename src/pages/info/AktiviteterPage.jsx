import { useState } from "react";
import FeatureDetail from "../../components/info/FeatureDetail";
import { sx } from "../../lib/sx";
import { useLang } from "../../lib/langContext";

/*
  Aktiviteter og påmelding — port of "Kretz Aktiviteter.dc.html". The hero
  mockup is a training invite: answer Kommer / Kan ikke and the counts,
  progress bar, avatar stack and the reminder badge all follow.
*/

const SQUAD = 22;
const AVATARS = [
  ["EH", "#1f7a3a"],
  ["NB", "#16241a"],
  ["SN", "#3f9a58"],
  ["JL", "#2f6fb3"],
  ["MK", "#1f7a3a"],
  ["OT", "#16241a"],
];

function rsvpStyle(on, green) {
  return (
    "padding: 12px 10px; border-radius: 999px; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 14px; transition: background .2s, color .2s; " +
    (on
      ? green
        ? "border: 1px solid #1f7a3a; background: #1f7a3a; color: #ffffff;"
        : "border: 1px solid #16241a; background: #16241a; color: #f6f8f3;"
      : "border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a;")
  );
}

function counts(rsvp) {
  const yes = 17 + (rsvp === "yes" ? 1 : 0);
  const no = 2 + (rsvp === "no" ? 1 : 0);
  return { yes, no, waiting: SQUAD - yes - no };
}

function ActivityMockup({ rsvp, setRsvp }) {
  const { t } = useLang();
  const { yes, no, waiting } = counts(rsvp);
  const toggle = (v) => setRsvp((r) => (r === v ? "" : v));

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span
          aria-hidden="true"
          style={{
            flex: "0 0 auto",
            width: 52,
            height: 56,
            borderRadius: 14,
            background: "#16241a",
            color: "#f6f8f3",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          <span>
            <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: ".12em", color: "#a3e2ae" }}>NOV</span>
            <span style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, marginTop: 3 }}>12</span>
          </span>
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>{t("Trening G14", "G14 training")}</div>
          <div style={{ fontSize: 13, color: "#4C5E50", marginTop: 2 }}>
            {t("I dag 18:00–19:30 · Nardohallen bane A", "Today 18:00–19:30 · Nardohallen court A")}
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
        <button type="button" onClick={() => toggle("yes")} aria-pressed={rsvp === "yes"} style={sx(rsvpStyle(rsvp === "yes", true))}>
          {t("Kommer", "Coming")}
        </button>
        <button type="button" onClick={() => toggle("no")} aria-pressed={rsvp === "no"} style={sx(rsvpStyle(rsvp === "no", false))}>
          {t("Kan ikke", "Can't come")}
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, fontSize: 13 }} aria-live="polite">
        <span style={{ flex: 1, color: "#4C5E50" }}>
          <b style={{ color: "#16241a", fontFamily: "var(--font-heading)" }}>
            {t(`${yes} av ${SQUAD}`, `${yes} of ${SQUAD}`)}
          </b>{" "}
          {t("kommer", "coming")}
        </span>
        <span style={{ color: "#4C5E50" }}>
          {t(`${no} kan ikke · ${waiting} ikke svart`, `${no} can't · ${waiting} not answered`)}
        </span>
      </div>
      <div aria-hidden="true" style={{ height: 8, borderRadius: 999, background: "#eef2ec", marginTop: 8, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${Math.round((yes / SQUAD) * 100)}%`,
            borderRadius: 999,
            background: "#74cd85",
            transition: "width .4s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </div>
      <div aria-hidden="true" style={{ display: "flex", marginTop: 14 }}>
        {AVATARS.map(([ini, bg], i) => (
          <span
            key={ini + i}
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#ffffff",
              border: "2px solid #ffffff",
              background: bg,
              marginLeft: i ? -8 : 0,
            }}
          >
            {ini}
          </span>
        ))}
        <span style={{ marginLeft: 8, alignSelf: "center", fontSize: 12.5, color: "#4C5E50" }}>+{yes - AVATARS.length}</span>
      </div>
      <div
        style={{
          marginTop: 18,
          paddingTop: 14,
          borderTop: "1px solid rgba(22,36,26,.08)",
          display: "grid",
          gap: 10,
          fontSize: 13.5,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#4C5E50" }}>
          {t("Kommende", "Upcoming")}
        </div>
        {[
          ["#1f7a3a", t("Kamp mot Byåsen", "Match vs Byåsen"), t("Lør 12:00", "Sat 12:00")],
          ["#e0a100", t("Kioskdugnad · 2 vakter ledige", "Kiosk volunteering · 2 shifts open"), t("Søn 10:00", "Sun 10:00")],
          ["#1f7a3a", t("Foreldremøte G14", "G14 parents' meeting"), t("Tir 19:00", "Tue 19:00")],
        ].map(([dot, label, when]) => (
          <div key={dot + when} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: dot }} />
            <span style={{ flex: 1 }}>{label}</span>
            <span style={{ color: "#4C5E50" }}>{when}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function AktiviteterPage(props) {
  const { t } = useLang();
  // Lifted here because the floating badge outside the card shows the count too.
  const [rsvp, setRsvp] = useState("");
  const { waiting } = counts(rsvp);

  return (
    <FeatureDetail
      {...props}
      hero={{
        eyebrow: t("Kretz Aktivitet · Aktiviteter og påmelding", "Kretz Activity · Activities and sign-ups"),
        title: t("Hvem kommer?", "Who's coming?"),
        accent: t("Du vet det før treningen.", "You'll know before training."),
        lead: t(
          "Treninger, kamper, cuper og dugnader i én kalender. Spillere og foreldre svarer med ett trykk, og de som glemmer det får en påminnelse – ikke treneren.",
          "Training, matches, tournaments and volunteering in one calendar. Players and parents answer with one tap, and those who forget get a reminder – not the coach.",
        ),
        ticks: [
          t("Svar med ett trykk", "Answer with one tap"),
          t("Automatiske påminnelser", "Automatic reminders"),
          t("Dugnadsvakter i appen", "Volunteer shifts in the app"),
        ],
        mockup: <ActivityMockup rsvp={rsvp} setRsvp={setRsvp} />,
        badge: t(`Påminnelse sendt til ${waiting} som ikke har svart`, `Reminder sent to ${waiting} who haven't answered`),
        badgeSide: "right",
      }}
      pain={{
        lead: t(
          "Treneren skal trene laget – ikke jage svar i fem chatgrupper.",
          "The coach should be coaching the team – not chasing answers in five group chats.",
        ),
        items: [
          [
            t("Svar i alle kanaler", "Answers in every channel"),
            t(
              "Noen svarer i én app, noen på SMS og noen i Facebook-gruppa. Ingen vet hvor mange som kommer.",
              "Some answer in one app, some by text and some in the Facebook group. Nobody knows how many are coming.",
            ),
          ],
          [
            t("Dugnad i siste liten", "Last-minute volunteering"),
            t(
              "Kioskvakter fordeles på en papirliste, og de samme foreldrene ender opp med alt.",
              "Kiosk shifts are handed out on a paper list, and the same parents end up doing everything.",
            ),
          ],
          [
            t("Oppmøte ingen fører", "Attendance nobody records"),
            t(
              "Klubben vet ikke hvem som faktisk trener – og det trengs til både rapportering og frafall.",
              "The club doesn't know who actually trains – and that's needed for both reporting and spotting drop-outs.",
            ),
          ],
        ],
      }}
      how={{
        title: t("Fra kalender til oppmøte", "From calendar to attendance"),
        steps: [
          [
            t("Legg inn aktivitetene", "Add the activities"),
            t(
              "Faste treninger for sesongen, kamper og dugnader – med sted, tid og hvem som er invitert.",
              "Regular training for the season, matches and volunteering – with place, time and who is invited.",
            ),
          ],
          [
            t("Alle svarer i appen", "Everyone answers in the app"),
            t(
              "Spillere og foreldre svarer Kommer eller Kan ikke. De som ikke svarer får påminnelse.",
              "Players and parents answer Coming or Can't come. Those who don't answer get a reminder.",
            ),
          ],
          [
            t("Registrer oppmøte", "Record attendance"),
            t(
              "Treneren krysser av hvem som kom. Tallene brukes i rapporter og samordnet rapportering.",
              "The coach ticks off who came. The figures are used in reports and NIF's coordinated reporting.",
            ),
          ],
        ],
        listTitle: t("G14 · denne uken", "G14 · this week"),
        listRight: t("Påmeldt", "Signed up"),
        rows: [
          { kind: "done", label: t("Trening tirsdag", "Tuesday training"), value: t("20 av 22", "20 of 22") },
          { kind: "active", label: t("Trening torsdag", "Thursday training"), value: t("17 av 22", "17 of 22") },
          { kind: "note", icon: "⚽", label: t("Kamp mot Byåsen", "Match vs Byåsen"), value: t("14 av 16", "14 of 16") },
          { kind: "note", icon: "!", label: t("Kioskdugnad søndag", "Sunday kiosk volunteering"), value: t("2 vakter ledige", "2 shifts open") },
          { kind: "todo", label: t("Foreldremøte tirsdag", "Tuesday parents' meeting"), value: t("Invitasjon sendt", "Invitation sent") },
        ],
      }}
      setup={{
        title: t("Satt opp på et kvarter", "Set up in fifteen minutes"),
        lead: t(
          "Lag sesongens treninger én gang, så fyller Kretz kalenderen og sender varslene.",
          "Create the season's training sessions once, and Kretz fills the calendar and sends the notifications.",
        ),
        cardTitle: t("Oppsett · G14 høst 2026", "Set-up · G14 autumn 2026"),
        items: [
          { key: "a", on: true, label: t("Lag og spillere lagt inn", "Teams and players added") },
          { key: "b", on: true, label: t("Treningstider for sesongen", "Training times for the season") },
          { key: "c", on: false, label: t("Foreldre koblet til barna", "Parents linked to their children") },
          { key: "d", on: true, label: t("Påminnelse 24 timer før", "Reminder 24 hours before") },
          { key: "e", on: false, label: t("Dugnadsvakter publisert", "Volunteer shifts published") },
        ],
      }}
      gets={{
        title: t("Mer trening, mindre koordinering", "More training, less coordinating"),
        lead: t(
          "Aktivitetene henger sammen med hallbookingen, medlemsregisteret og økonomien, så alt oppdateres samtidig.",
          "Activities are connected to hall booking, the member register and finance, so everything updates at once.",
        ),
        items: [
          {
            title: t("Gjentakende aktiviteter", "Recurring activities"),
            text: t(
              "Ukentlige treninger for hele sesongen legges inn på én gang.",
              "Weekly training for the whole season is added in one go.",
            ),
            icon: (
              <>
                <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
                <path d="M18 3v4h-4M6 21v-4h4" />
              </>
            ),
          },
          {
            title: t("Påminnelser som virker", "Reminders that work"),
            text: t(
              "Push og e-post til dem som ikke har svart – automatisk.",
              "Push and email to those who haven't answered – automatically.",
            ),
            icon: (
              <>
                <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z" />
                <path d="M10 20.5a2 2 0 0 0 4 0" />
              </>
            ),
          },
          {
            title: t("Dugnadsvakter", "Volunteer shifts"),
            text: t("Foreldre tar vakter selv, og alle får like mange.", "Parents pick shifts themselves, and everyone gets the same number."),
            icon: (
              <>
                <path d="M4 20V9l8-5 8 5v11" />
                <path d="M9 20v-6h6v6" />
              </>
            ),
          },
          {
            title: t("Oppmøte og statistikk", "Attendance and statistics"),
            text: t(
              "Se hvem som trener, og fang opp dem som er i ferd med å falle fra.",
              "See who is training, and catch those who are about to drop out.",
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
          file: "Kretz Hallbooking.dc.html",
          title: t("Hallbooking", "Hall booking"),
          text: t(
            "Treningene bruker hallene og tidene dere allerede har booket.",
            "Training uses the halls and times you have already booked.",
          ),
        },
        {
          file: "Kretz Medlemsregister.dc.html",
          title: t("Medlemsregister", "Member register"),
          text: t(
            "Invitasjoner går til riktige lag og foreldre automatisk.",
            "Invitations go to the right teams and parents automatically.",
          ),
        },
        {
          file: "Kretz Okonomi.dc.html",
          title: t("Økonomi og rapport", "Finance and reporting"),
          text: t(
            "Cup-påmeldinger og dugnadsinntekter føres rett i økonomien.",
            "Tournament entries and volunteering income go straight into the accounts.",
          ),
        },
      ]}
      cta={{
        title: t("Klar for færre «kommer du?»-meldinger?", "Ready for fewer “are you coming?” messages?"),
        text: t(
          "Vi legger inn lagene og treningsplanen for dere, og hjelper trenerne i gang.",
          "We add the teams and the training schedule for you, and help the coaches get started.",
        ),
      }}
    />
  );
}
