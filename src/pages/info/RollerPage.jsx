import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FeatureCta from "../../components/info/FeatureCta";
import RelatedFeatures from "../../components/info/RelatedFeatures";
import {
  BenefitGrid,
  CheckPill,
  ChecklistCard,
  ChecklistRow,
  FeatureBody,
  FeatureHero,
  HowItWorksBand,
  PainCards,
} from "../../components/info/FeatureSections";
import { ICONS, MOCK_FRAME } from "../../components/info/featureConstants";
import { useLang } from "../../lib/langContext";
import "../../styles/subpage.css";
import "../../styles/pages/roller.css";

/* Port of "Kretz Roller.dc.html" — Roller og tilgang. */

const RIGHTS = [
  ["Se medlemmer", "See members"],
  ["Se økonomi", "See finances"],
  ["Sende fakturaer", "Send invoices"],
  ["Se styremappen", "See the board folder"],
  ["Booke hall", "Book halls"],
  ["Registrere oppmøte", "Record attendance"],
];

const ROLES = {
  leder: { label: ["Styreleder", "Chair"], who: ["MS", "Marit Sunde", ["Styreleder · hele klubben", "Chair · whole club"]], on: [1, 1, 0, 1, 1, 0] },
  kasserer: { label: ["Kasserer", "Treasurer"], who: ["AB", "Anne Bjørk", ["Kasserer · hele klubben", "Treasurer · whole club"]], on: [1, 1, 1, 1, 0, 0] },
  trener: { label: ["Trener", "Coach"], who: ["JR", "Jonas Reite", ["Trener · G14", "Coach · G14"]], on: [1, 0, 0, 0, 1, 1] },
  forelder: { label: ["Forelder", "Parent"], who: ["KH", "Kari Hansen", ["Forelder · Emma (J12)", "Parent · Emma (J12)"]], on: [0, 0, 0, 0, 1, 0] },
};

const CHECKS = [
  ["a", "Se medlemmer på eget lag", "See members of own team"],
  ["b", "Sende beskjeder til foreldre", "Send messages to parents"],
  ["c", "Se kontingentstatus", "See membership fee status"],
  ["d", "Se økonomien for hele klubben", "See finances for the whole club"],
  ["e", "Se styremappen", "See the board folder"],
];

function RoleMockup() {
  const { t, isEn } = useLang();
  const [role, setRole] = useState("trener");
  const R = ROLES[role];
  const nOn = R.on.filter(Boolean).length;
  const L = (pair) => (isEn ? pair[1] : pair[0]);

  return (
    <div style={{ ...MOCK_FRAME, padding: 28 }}>
      <div
        style={{
          borderRadius: 22,
          background: "#ffffff",
          border: "1px solid rgba(116,205,133,.35)",
          boxShadow: "0 24px 60px rgba(31,122,58,.14)",
          padding: "20px 20px 22px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>
            {t("Roller · Nardo FK", "Roles · Nardo FK")}
          </span>
          <span style={{ fontSize: 13, color: "#4C5E50" }}>{t("4 roller · 38 personer", "4 roles · 38 people")}</span>
        </div>
        <div role="group" aria-label={t("Velg rolle", "Choose role")} style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
          {Object.keys(ROLES).map((k) => {
            const on = k === role;
            return (
              <button
                key={k}
                type="button"
                className="kz-role-btn"
                aria-pressed={on}
                onClick={() => setRole(k)}
                style={{
                  padding: "7px 13px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 600,
                  border: on ? "1px solid #16241a" : "1px solid rgba(22,36,26,.18)",
                  background: on ? "#16241a" : "#ffffff",
                  color: on ? "#f6f8f3" : "#16241a",
                }}
              >
                {L(ROLES[k].label)}
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 16,
            padding: "12px 14px",
            borderRadius: 16,
            background: "#f4f8f2",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              flex: "0 0 auto",
              width: 38,
              height: 38,
              borderRadius: 999,
              background: "#16241a",
              color: "#f6f8f3",
              display: "grid",
              placeItems: "center",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {R.who[0]}
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <b style={{ display: "block", fontSize: 14 }}>{R.who[1]}</b>
            <span style={{ fontSize: 12.5, color: "#4C5E50" }}>{L(R.who[2])}</span>
          </span>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: "#eaf7ed",
              color: "#1f7a3a",
              fontSize: 12,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {t(`${nOn} av ${RIGHTS.length} rettigheter`, `${nOn} of ${RIGHTS.length} permissions`)}
          </span>
        </div>
        <div style={{ marginTop: 8 }}>
          {RIGHTS.map((pair, i) => {
            const on = !!R.on[i];
            return (
              <div
                key={pair[0]}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 2px",
                  borderBottom: "1px solid rgba(22,36,26,.07)",
                  fontSize: 14,
                }}
              >
                <span style={{ flex: 1 }}>{L(pair)}</span>
                <span
                  role="img"
                  aria-label={on ? t("På", "On") : t("Av", "Off")}
                  style={{
                    position: "relative",
                    flex: "0 0 auto",
                    width: 38,
                    height: 22,
                    borderRadius: 999,
                    transition: "background .25s",
                    background: on ? "#1f7a3a" : "#d5ddd2",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      width: 16,
                      height: 16,
                      borderRadius: 999,
                      background: "#ffffff",
                      boxShadow: "0 1px 3px rgba(0,0,0,.2)",
                      transition: "left .25s",
                      left: on ? 19 : 3,
                    }}
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <CheckPill data-kz-hidetab style={{ position: "absolute", left: 12, bottom: -18 }}>
        {t("Tilgangen følger vervet", "Access follows the role")}
      </CheckPill>
    </div>
  );
}

export default function RollerPage({ onOpenLogin, onOpenSignup, onOpenBooking }) {
  const { t, isEn } = useLang();
  const [checks, setChecks] = useState({ a: true, b: true, c: true, d: false, e: false });

  return (
    <div className="kz-sub">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} onOpenBooking={onOpenBooking} />

      <FeatureHero
        eyebrow={t("Kretz Styre · Roller og tilgang", "Kretz Board · Roles and access")}
        title={t("Alle ser det de trenger.", "Everyone sees what they need.")}
        accent={t("Ingen ser mer.", "No one sees more.")}
        lead={t(
          "Styret, kasserer, trenere og foreldre får hver sin tilgang – til medlemmer, økonomi, dokumenter og booking. Tilgangen følger vervet, så den flytter seg når folk kommer og går.",
          "The board, treasurer, coaches and parents each get their own access – to members, finances, documents and booking. Access follows the role, so it moves when people come and go.",
        )}
        ticks={[
          t("Ferdige roller for idrettslag", "Ready-made roles for sports clubs"),
          t("Tilgang per lag", "Access per team"),
          t("Ingen delte passord", "No shared passwords"),
        ]}
      >
        <RoleMockup />
      </FeatureHero>

      <PainCards
        badge={t("Hverdagen uten system", "Everyday life without a system")}
        intro={t(
          "I mange klubber er det fortsatt ett passord – og det sitter på en lapp i klubbhuset.",
          "In many clubs there is still one password – and it's on a note in the clubhouse.",
        )}
        items={[
          {
            title: t("Delte passord", "Shared passwords"),
            text: t(
              "Hele styret bruker samme innlogging, og ingen vet hvem som endret hva.",
              "The whole board uses the same login, and nobody knows who changed what.",
            ),
          },
          {
            title: t("For mye eller for lite", "Too much or too little"),
            text: t(
              "Trenerne ser hele medlemsregisteret – eller får ikke se sitt eget lag uten å spørre kasserer.",
              "Coaches see the entire member register – or can't see their own team without asking the treasurer.",
            ),
          },
          {
            title: t("Tilgang som aldri forsvinner", "Access that never goes away"),
            text: t(
              "Gamle styremedlemmer og trenere har fortsatt tilgang flere år etter at de gikk av.",
              "Former board members and coaches still have access years after they stepped down.",
            ),
          },
        ]}
      />

      <HowItWorksBand
        title={t("Fra verv til riktig tilgang", "From role to the right access")}
        steps={[
          {
            title: t("Velg roller", "Choose roles"),
            text: t(
              "Start med ferdige roller som styreleder, kasserer, trener, lagleder og forelder – eller lag egne.",
              "Start with ready-made roles such as chair, treasurer, coach, team manager and parent – or create your own.",
            ),
          },
          {
            title: t("Knytt personer til verv", "Link people to roles"),
            text: t(
              "Gi rollen til en person for hele klubben eller for ett lag, med start- og sluttdato.",
              "Give the role to a person for the whole club or for one team, with a start and end date.",
            ),
          },
          {
            title: t("Tilgangen følger med", "Access follows along"),
            text: t(
              "Når vervet avsluttes etter årsmøtet, forsvinner tilgangen automatisk.",
              "When the role ends after the annual meeting, the access disappears automatically.",
            ),
          },
        ]}
        panelTitle={t("Nardo FK · etter årsmøtet", "Nardo FK · after the annual meeting")}
        panelRight={t("Endring", "Change")}
        rows={[
          { kind: "done", icon: "✓", label: t("Marit Sunde · Styreleder", "Marit Sunde · Chair"), right: t("Gjenvalgt", "Re-elected") },
          { kind: "done", icon: "✓", label: t("Anne Bjørk · Kasserer", "Anne Bjørk · Treasurer"), right: t("Ny i vervet", "New in role") },
          { kind: "active", icon: "→", label: t("Jonas Reite · Trener G14", "Jonas Reite · Coach G14"), right: t("Tilgang til G14", "Access to G14") },
          { kind: "muted", icon: "–", label: t("Per Olsen · Kasserer", "Per Olsen · Treasurer"), right: t("Tilgang fjernet", "Access removed") },
          {
            kind: "dashed",
            icon: "+",
            label: t("Ida Krogh · Kontrollutvalg", "Ida Krogh · Audit committee"),
            right: t("Lesetilgang økonomi", "Read access to finances"),
          },
        ]}
      />

      <FeatureBody>
        <ChecklistRow
          title={t("Juster tilgangen for hver rolle", "Adjust access for each role")}
          text={t(
            "Ferdige roller passer de fleste klubber, men du kan alltid finjustere for enkeltpersoner.",
            "Ready-made roles suit most clubs, but you can always fine-tune for individuals.",
          )}
        >
          <ChecklistCard
            title={t("Rettigheter · Lagleder J12", "Permissions · Team manager J12")}
            badge={(d, n) => t(`${d} av ${n} klare`, `${d} of ${n} set`)}
            items={CHECKS.map(([id, no, en]) => ({ id, label: isEn ? en : no }))}
            checked={checks}
            onToggle={(id) => setChecks((s) => ({ ...s, [id]: !s[id] }))}
          />
        </ChecklistRow>

        <BenefitGrid
          title={t("Trygt for både klubben og medlemmene", "Safe for both the club and its members")}
          text={t(
            "Rollene styrer tilgangen i hele Kretz – medlemsregister, økonomi, dokumenter, aktiviteter og booking.",
            "Roles control access across all of Kretz – member register, finances, documents, activities and booking.",
          )}
          items={[
            {
              icon: ICONS.people,
              title: t("Ferdige roller", "Ready-made roles"),
              text: t(
                "Roller for styre, trenere, lagledere, foreldre og kontrollutvalg er klare fra start.",
                "Roles for the board, coaches, team managers, parents and audit committee are ready from day one.",
              ),
            },
            {
              icon: ICONS.lock,
              title: t("Tilgang per lag", "Access per team"),
              text: t("Treneren ser sitt eget lag – ikke hele klubben.", "Coaches see their own team – not the whole club."),
            },
            {
              icon: ICONS.clock,
              title: t("Logg over endringer", "Change log"),
              text: t(
                "Se hvem som har gjort hva, og når – til glede for kontrollutvalget.",
                "See who did what, and when – to the delight of the audit committee.",
              ),
            },
            {
              icon: ICONS.shield,
              title: t("Sikker innlogging", "Secure sign-in"),
              text: t(
                "Hver person logger inn selv, med BankID eller engangskode.",
                "Everyone signs in on their own, with BankID or a one-time code.",
              ),
            },
          ]}
        />
      </FeatureBody>

      <RelatedFeatures
        items={[
          {
            file: "Kretz Dokumentsenter.dc.html",
            title: t("Dokumentsenter", "Document centre"),
            text: t(
              "Rollene bestemmer hvem som ser hvilke mapper og dokumenter.",
              "Roles decide who sees which folders and documents.",
            ),
          },
          {
            file: "Kretz Medlemsregister.dc.html",
            title: t("Medlemsregister", "Member register"),
            text: t(
              "Verv og roller lagres på medlemmet, sammen med lag og familie.",
              "Positions and roles are stored on the member, together with team and family.",
            ),
          },
          {
            file: "Kretz Okonomi.dc.html",
            title: t("Økonomi og rapport", "Finance and reporting"),
            text: t(
              "Kasserer og kontrollutvalg får akkurat den tilgangen de trenger.",
              "The treasurer and audit committee get exactly the access they need.",
            ),
          },
        ]}
      />

      <FeatureCta
        title={t("Klar for riktig tilgang for alle?", "Ready for the right access for everyone?")}
        text={t(
          "Vi setter opp rollene og vervene etter årsmøtet sammen med dere.",
          "We set up the roles and positions after the annual meeting together with you.",
        )}
      />

      <Footer />
    </div>
  );
}
