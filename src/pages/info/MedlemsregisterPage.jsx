import { useState } from "react";
import FeatureDetail from "../../components/info/FeatureDetail";
import { sx } from "../../lib/sx";
import { useLang } from "../../lib/langContext";

/*
  Medlemsregister — port of "Kretz Medlemsregister.dc.html". The page body is
  the shared feature template; the hero mockup is a member list filtered by
  team (Alle / G14 / J12 / Senior).
*/

const MEMBERS = [
  ["Emma Hansen", "J12", ["Forelder: Kari Hansen", "Parent: Kari Hansen"], "paid"],
  ["Noah Berg", "G14", ["Forelder: Ola Berg", "Parent: Ola Berg"], "unpaid"],
  ["Sara Nilsen", "J12", ["Søsken: Jonas Nilsen", "Sibling: Jonas Nilsen"], "paid"],
  ["Jonas Nilsen", "G14", ["Søsken: Sara Nilsen", "Sibling: Sara Nilsen"], "consent"],
  ["Ida Lie", "Senior", ["Også trener for G14", "Also coaches G14"], "paid"],
  ["Lars Moe", "Senior", ["Medlem siden 2009", "Member since 2009"], "paid"],
  ["Aksel Dahl", "G14", ["Forelder: Nina Dahl", "Parent: Nina Dahl"], "paid"],
];
const AVATAR = { J12: "#1f7a3a", G14: "#16241a", Senior: "#3f9a58" };
const STATUS = {
  paid: { no: "Betalt", en: "Paid", style: "background: #eaf7ed; color: #1f7a3a;" },
  unpaid: { no: "Ubetalt", en: "Unpaid", style: "background: #fff6d6; color: #6b5300;" },
  consent: { no: "Samtykke mangler", en: "Consent missing", style: "background: #e8f0fa; color: #24538a;" },
};
const TEAMS = ["Alle", "G14", "J12", "Senior"];

function pill(on) {
  return (
    "padding: 6px 13px; border-radius: 999px; cursor: pointer; font-family: var(--font-body); font-size: 13px; font-weight: 600; " +
    (on
      ? "border: 1px solid #16241a; background: #16241a; color: #f6f8f3;"
      : "border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a;")
  );
}

function MemberMockup() {
  const { t, isEn } = useLang();
  const [team, setTeam] = useState("Alle");
  const list = MEMBERS.filter((m) => team === "Alle" || m[1] === team).slice(0, 5);

  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>
          {t("Medlemmer · Nardo FK", "Members · Nardo FK")}
        </span>
        <span style={{ fontSize: 13, color: "#4C5E50" }}>{t("612 aktive", "612 active")}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 14,
          padding: "9px 14px",
          borderRadius: 999,
          background: "#eef7f0",
          fontSize: 13,
          color: "#4C5E50",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="#4C5E50" strokeWidth="2" />
          <path d="M20 20l-4-4" stroke="#4C5E50" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {t("Søk etter navn, lag eller forelder", "Search by name, team or parent")}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
        {TEAMS.map((tm) => (
          <button key={tm} type="button" onClick={() => setTeam(tm)} aria-pressed={tm === team} style={sx(pill(tm === team))}>
            {tm === "Alle" ? t("Alle", "All") : tm}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        {list.map(([name, tm, family, status]) => {
          const st = STATUS[status];
          return (
            <div
              key={team + name}
              style={{
                display: "grid",
                gridTemplateColumns: "36px minmax(0, 1fr) auto",
                gap: 12,
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid rgba(22,36,26,.07)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#ffffff",
                  background: AVATAR[tm],
                }}
              >
                {name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 14, fontWeight: 700 }}>
                  {name} <span style={{ fontWeight: 500, color: "#4C5E50" }}>· {tm}</span>
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#4C5E50",
                    marginTop: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isEn ? family[1] : family[0]}
                </span>
              </span>
              <span
                style={sx(
                  "padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; " + st.style,
                )}
              >
                {isEn ? st.en : st.no}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function MedlemsregisterPage(props) {
  const { t } = useLang();
  return (
    <FeatureDetail
      {...props}
      hero={{
        eyebrow: t("Kretz Medlem · Medlemsregister", "Kretz Member · Member register"),
        title: t("Én sannhet", "One source of truth"),
        accent: t("om hvert medlem.", "about every member."),
        lead: t(
          "Medlemmer, familier, lag, roller og samtykker i ett register som alltid er oppdatert. Innmelding skjer digitalt, og tallene til NIF og kontingenten henter Kretz rett herfra.",
          "Members, families, teams, roles and consents in one register that is always up to date. Sign-up is digital, and Kretz takes the NIF figures and the membership fees straight from here.",
        ),
        ticks: [
          t("Digital innmelding", "Digital sign-up"),
          t("Familier koblet sammen", "Families linked together"),
          t("GDPR som standard", "GDPR by default"),
        ],
        mockup: <MemberMockup />,
        badge: t("Lagret på norske servere", "Stored on Norwegian servers"),
        badgeSide: "left",
      }}
      pain={{
        lead: t(
          "Medlemslista er grunnlaget for alt – og ofte det mest rotete i klubben.",
          "The member list is the foundation for everything – and often the messiest thing in the club.",
        ),
        items: [
          [
            t("Lister i hver lomme", "A list in every pocket"),
            t(
              "Trenerne har sine lister, kasserer har en annen og styret en tredje. Ingen av dem stemmer.",
              "The coaches have their lists, the treasurer has another and the board a third. None of them match.",
            ),
          ],
          [
            t("Foreldre uten oversikt", "Parents without an overview"),
            t(
              "Søsken på ulike lag gir flere fakturaer, flere grupper og mer forvirring hjemme.",
              "Siblings on different teams mean more invoices, more groups and more confusion at home.",
            ),
          ],
          [
            t("Samtykker på papir", "Consents on paper"),
            t(
              "Fotosamtykke og helseopplysninger ligger i en perm – eller ingen steder.",
              "Photo consent and health information sit in a binder – or nowhere at all.",
            ),
          ],
        ],
      }}
      how={{
        title: t("Fra innmelding til riktig lag", "From sign-up to the right team"),
        steps: [
          [
            t("Medlemmet melder seg inn", "The member signs up"),
            t(
              "Et enkelt skjema på nett eller i appen – foreldre melder inn barna selv.",
              "A simple form online or in the app – parents sign up their children themselves.",
            ),
          ],
          [
            t("Plasser på lag og roller", "Assign teams and roles"),
            t(
              "Kretz foreslår lag ut fra alder, og du gir roller som trener, lagleder eller styremedlem.",
              "Kretz suggests a team based on age, and you assign roles such as coach, team manager or board member.",
            ),
          ],
          [
            t("Alt annet følger med", "Everything else follows"),
            t(
              "Kontingent, påmelding, tilgang og rapportering bruker de samme opplysningene.",
              "Fees, sign-ups, access and reporting all use the same information.",
            ),
          ],
        ],
        listTitle: t("Nye medlemmer · november", "New members · November"),
        listRight: t("Status", "Status"),
        rows: [
          { kind: "done", label: "Emma Hansen · J12", value: t("Plassert på lag", "Placed on team") },
          { kind: "done", label: t("Familie Nilsen · 2 barn", "Nilsen family · 2 children"), value: t("Én faktura", "One invoice") },
          { kind: "active", label: "Noah Berg · G14", value: t("Venter kontingent", "Awaiting fee") },
          { kind: "note", icon: "!", label: "Jonas Nilsen", value: t("Mangler fotosamtykke", "Missing photo consent") },
          { kind: "todo", label: "Aksel Dahl", value: t("Innmelding mottatt", "Sign-up received") },
        ],
      }}
      setup={{
        title: t("Registeret som rydder seg selv", "The register that tidies itself"),
        lead: t(
          "Sett opp lag og regler én gang – så holder Kretz registeret oppdatert gjennom hele sesongen.",
          "Set up teams and rules once – and Kretz keeps the register up to date all season.",
        ),
        cardTitle: t("Oppsett · medlemsregister", "Set-up · member register"),
        items: [
          { key: "a", on: true, label: t("Medlemmer importert", "Members imported") },
          { key: "b", on: true, label: t("Lag og aldersgrupper satt opp", "Teams and age groups set up") },
          { key: "c", on: true, label: t("Familier koblet sammen", "Families linked together") },
          { key: "d", on: false, label: t("Innmeldingsskjema publisert", "Sign-up form published") },
          { key: "e", on: false, label: t("Samtykker samlet inn", "Consents collected") },
        ],
      }}
      gets={{
        title: t("Alle opplysninger på ett sted", "All the information in one place"),
        lead: t(
          "Registeret er grunnlaget for kontingent, påmelding, tilganger og rapporteringen til NIF.",
          "The register is the basis for fees, sign-ups, access and reporting to NIF.",
        ),
        items: [
          {
            title: t("Familier koblet sammen", "Families linked together"),
            text: t(
              "Foreldre ser alle barna sine og får én samlet faktura.",
              "Parents see all their children and get one combined invoice.",
            ),
            icon: (
              <>
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
                <path d="M16 5.5a3 3 0 0 1 0 5.5M17.5 14.5A5.5 5.5 0 0 1 20.5 19" />
              </>
            ),
          },
          {
            title: t("Samtykker digitalt", "Digital consents"),
            text: t(
              "Fotosamtykke og andre samtykker samles inn og fornyes i appen.",
              "Photo consent and other consents are collected and renewed in the app.",
            ),
            icon: (
              <>
                <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </>
            ),
          },
          {
            title: t("Klart for rapportering", "Ready for reporting"),
            text: t(
              "Alder, kjønn og idrett er fordelt slik samordnet rapportering krever.",
              "Age, gender and sport are broken down the way NIF's coordinated reporting requires.",
            ),
            icon: (
              <>
                <path d="M4 19V5M4 19h16" />
                <path d="M8 16v-4M12 16V8M16 16v-6" />
              </>
            ),
          },
          {
            title: t("Eksport når du vil", "Export whenever you like"),
            text: t(
              "Dataene tilhører klubben og kan eksporteres når som helst.",
              "The data belongs to the club and can be exported at any time.",
            ),
            icon: (
              <>
                <path d="M12 4v11M7 10l5 5 5-5" />
                <path d="M4 19h16" />
              </>
            ),
          },
        ],
      }}
      related={[
        {
          file: "Kretz AR-oppgave.dc.html",
          title: t("Årlig rapportering", "Annual reporting"),
          text: t("Medlemstallene til NIF hentes rett fra registeret.", "Membership figures for NIF come straight from the register."),
        },
        {
          file: "Kretz Aktiviteter.dc.html",
          title: t("Aktiviteter og påmelding", "Activities and sign-ups"),
          text: t(
            "Invitasjoner går automatisk til riktige lag og foreldre.",
            "Invitations go automatically to the right teams and parents.",
          ),
        },
        {
          file: "Kretz Okonomi.dc.html",
          title: t("Økonomi og rapport", "Finance and reporting"),
          text: t("Kontingenten beregnes ut fra lag, alder og familie.", "Fees are calculated from team, age and family."),
        },
      ]}
      cta={{
        title: t("Klar for ett register for hele klubben?", "Ready for one register for the whole club?"),
        text: t(
          "Vi flytter medlemmene inn fra dagens system, og går gjennom lag og roller sammen.",
          "We move your members over from your current system, and go through teams and roles together.",
        ),
      }}
    />
  );
}
