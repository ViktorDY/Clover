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
import "../../styles/pages/arlig-rapportering.css";

/* Port of "Kretz AR-oppgave.dc.html" — Årlig rapportering. */

const CHECKS = [
  ["a", "Årsmøte avholdt og protokoll signert", "Annual meeting held and minutes signed"],
  ["b", "Nytt styre meldt til Brønnøysund", "New board reported to Brønnøysund"],
  ["c", "Medlemstall kontrollert", "Membership numbers checked"],
  ["d", "Samordnet rapportering levert i KlubbAdmin", "Coordinated reporting filed in KlubbAdmin"],
  ["e", "Momskompensasjon søkt via NIF", "VAT compensation applied for via NIF"],
];

function Tick({ size = 13, stroke = 3 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#ffffff" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReportMockup() {
  const { t } = useLang();
  const steps = [
    [t("Hentet fra medlemsregisteret", "Taken from the member register"), t("612 medlemmer · 3 idretter", "612 members · 3 sports")],
    [t("Kontrollert", "Checked"), t("0 mangler funnet", "0 gaps found")],
    [t("Sendt til Altinn", "Sent to Altinn"), t("28. april kl. 11:02", "28 April at 11:02")],
    [t("Kvittering mottatt", "Receipt received"), t("Arkivert i dokumentsenteret", "Archived in the document centre")],
  ];
  return (
    <div
      data-kz-ar-mock
      style={{
        ...MOCK_FRAME,
        minHeight: 460,
        boxSizing: "border-box",
        padding: "56px 24px 40px",
        display: "flex",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div
        style={{
          flex: "1 1 0",
          minWidth: 0,
          maxWidth: 360,
          borderRadius: 22,
          background: "#ffffff",
          border: "1px solid rgba(116,205,133,.35)",
          boxShadow: "0 24px 60px rgba(31,122,58,.14)",
          padding: "22px 22px 26px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
          <span
            aria-hidden="true"
            style={{ flex: "0 0 auto", width: 40, height: 40, borderRadius: 12, background: "#e3f3e7", display: "grid", placeItems: "center" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="#1f7a3a" strokeWidth="1.8" />
              <path d="M7 9.5h10M7 13.5h6" stroke="#1f7a3a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>
              {t("Rapportering til Altinn", "Reporting to Altinn")}
            </div>
            <div style={{ fontSize: 12.5, color: "#4C5E50", marginTop: 2 }}>
              {t("Samordnet rapportering · tall for 2026", "Coordinated reporting · figures for 2026")}
            </div>
          </div>
        </div>
        <div>
          {steps.map(([title, meta], i) => {
            const last = i === steps.length - 1;
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "26px minmax(0, 1fr)",
                  gap: 14,
                  paddingBottom: last ? 0 : 22,
                }}
              >
                {!last && (
                  <span
                    aria-hidden="true"
                    style={{ position: "absolute", left: 12, top: 26, bottom: -4, width: 2, background: "#74cd85" }}
                  />
                )}
                <span
                  aria-hidden="true"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: 26,
                    height: 26,
                    borderRadius: 999,
                    background: "#1f7a3a",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 0 0 4px #ffffff",
                  }}
                >
                  <Tick />
                </span>
                <div style={{ minWidth: 0, paddingTop: 1 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15.5 }}>{title}</div>
                  <div style={{ marginTop: 3, fontSize: 12.5, color: "#4C5E50" }}>{meta}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div data-kz-hidetab style={{ flex: "0 0 auto", width: 158, display: "grid", gap: 16, alignSelf: "center", marginTop: 30 }}>
        <div
          style={{
            borderRadius: 20,
            background: "#ffffff",
            border: "1px solid rgba(116,205,133,.35)",
            boxShadow: "0 20px 48px rgba(31,122,58,.14)",
            padding: "18px 16px 16px",
          }}
        >
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#1f7a3a" }}>
            {t("Kvittering", "Receipt")}
          </div>
          <div style={{ marginTop: 6, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>SR-2026-4481</div>
          <div aria-hidden="true" style={{ display: "grid", gap: 7, margin: "16px 0 18px" }}>
            <span style={{ height: 6, borderRadius: 999, background: "#e6f1e8" }} />
            <span style={{ height: 6, width: "85%", borderRadius: 999, background: "#e6f1e8" }} />
            <span style={{ height: 6, width: "70%", borderRadius: 999, background: "#e6f1e8" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div>
              <div style={{ fontSize: 11.5, color: "#4C5E50" }}>{t("Mottatt", "Received")}</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13, marginTop: 2 }}>{t("28. april", "28 April")}</div>
            </div>
            <span
              aria-hidden="true"
              style={{
                flex: "0 0 auto",
                width: 46,
                height: 46,
                boxSizing: "border-box",
                borderRadius: 999,
                border: "2px dashed #74cd85",
                display: "grid",
                placeItems: "center",
              }}
            >
              <span style={{ width: 28, height: 28, borderRadius: 999, background: "#1f7a3a", display: "grid", placeItems: "center" }}>
                <Tick size={14} />
              </span>
            </span>
          </div>
        </div>
        <CheckPill style={{ padding: "11px 16px", boxShadow: "0 14px 34px rgba(31,122,58,.14)" }}>
          {t("Ingen avvik", "No deviations")}
        </CheckPill>
      </div>
    </div>
  );
}

export default function ArligRapporteringPage({ onOpenLogin, onOpenSignup, onOpenBooking }) {
  const { t, isEn } = useLang();
  const [checks, setChecks] = useState({ a: true, b: true, c: true, d: false, e: false });

  return (
    <div className="kz-sub">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} onOpenBooking={onOpenBooking} />

      <FeatureHero
        columns="minmax(0, 1.05fr) minmax(0, .95fr)"
        eyebrow={t("Kretz Økonomi · Årlig rapportering", "Kretz Finance · Annual reporting")}
        title={t("Klubbens årshjul.", "The club's annual cycle.")}
        accent={t("Klart før fristen.", "Done before the deadline.")}
        lead={t(
          "Årsmøte, samordnet rapportering til Altinn, nytt styre i Brønnøysund og søknad om momskompensasjon. Kretz henter tallene fra medlemsregisteret og regnskapet dere allerede har – og minner styret på hver frist.",
          "Annual meeting, coordinated reporting to Altinn, the new board in the Brønnøysund registers and the VAT compensation application. Kretz pulls the figures from the member register and accounts you already have – and reminds the board of every deadline.",
        )}
        ticks={[
          t("Medlemstall rett fra registeret", "Membership numbers straight from the register"),
          t("Påminnelser før fristene", "Reminders before deadlines"),
          t("Historikk for alle år", "History for every year"),
        ]}
      >
        <ReportMockup />
      </FeatureHero>

      <PainCards
        intro={t(
          "Fristene kommer hvert år – og som regel havner de hos en frivillig i styret.",
          "The deadlines come every year – and they usually land on a volunteer on the board.",
        )}
        items={[
          {
            title: t("Medlemstall i tre lister", "Membership numbers in three lists"),
            text: t(
              "Trenerne har én liste, kasserer en annen og KlubbAdmin en tredje. Hvem stemmer når NIF spør?",
              "The coaches have one list, the treasurer another and KlubbAdmin a third. Which one is right when NIF asks?",
            ),
          },
          {
            title: t("Nytt styre, gamle opplysninger", "New board, old details"),
            text: t(
              "Etter årsmøtet glemmer man å melde endringer til Brønnøysund – og banken og tilskuddene stopper opp.",
              "After the annual meeting, nobody remembers to report changes to Brønnøysund – and the bank and grants grind to a halt.",
            ),
          },
          {
            title: t("Glemte frister koster penger", "Missed deadlines cost money"),
            text: t(
              "Feil medlemstall gir mindre LAM-midler, og en glemt søknad betyr null kroner i momskompensasjon.",
              "Wrong membership numbers mean less LAM funding, and a forgotten application means zero kroner in VAT compensation.",
            ),
          },
        ]}
      />

      <HowItWorksBand
        title={t("Fra medlemsregister til levert rapport", "From member register to filed report")}
        steps={[
          {
            title: t("Hold registeret oppdatert", "Keep the register up to date"),
            text: t(
              "Innmeldinger, utmeldinger, kontingent og oppmøte føres gjennom sesongen – ikke i april.",
              "Sign-ups, cancellations, fees and attendance are recorded through the season – not in April.",
            ),
          },
          {
            title: t("Kontroller tallene", "Check the figures"),
            text: t(
              "Kretz fordeler medlemmer på alder, kjønn og idrett slik NIF ber om, og viser hvem som mangler fødselsdato eller betalt kontingent.",
              "Kretz breaks members down by age, gender and sport the way NIF asks, and shows who is missing a date of birth or a paid fee.",
            ),
          },
          {
            title: t("Lever og arkiver", "File and archive"),
            text: t(
              "Overfør til KlubbAdmin, og ta vare på grunnlaget. Neste styre finner alt på samme sted.",
              "Transfer to KlubbAdmin and keep the underlying data. The next board finds everything in the same place.",
            ),
          },
        ]}
        panelTitle={t("Årshjul · Nardo FK", "Annual cycle · Nardo FK")}
        panelRight={t("Frist", "Deadline")}
        rows={[
          {
            kind: "done",
            icon: "✓",
            label: t("Årsmøte med årsberetning og regnskap", "Annual meeting with annual report and accounts"),
            right: t("innen 31. mars", "by 31 March"),
          },
          {
            kind: "done",
            icon: "✓",
            label: t("Nytt styre meldt til Brønnøysund", "New board reported to Brønnøysund"),
            right: t("etter årsmøtet", "after the annual meeting"),
          },
          {
            kind: "active",
            icon: "→",
            label: t("Samordnet rapportering til Altinn", "Coordinated reporting to Altinn"),
            right: t("30. april", "30 April"),
          },
          { kind: "dashed", icon: "kr", label: t("Momskompensasjon via NIF", "VAT compensation via NIF"), right: t("sommer", "summer") },
          {
            kind: "dashed",
            icon: "↻",
            label: t("Politiattester for nye trenere", "Police certificates for new coaches"),
            right: t("løpende", "ongoing"),
          },
        ]}
      />

      <FeatureBody>
        <ChecklistRow
          title={t("Alt styret må levere – på én liste", "Everything the board must deliver – on one list")}
          text={t(
            "Kryss av mens dere går. Kretz holder orden på hva som er gjort, og hva som gjenstår før neste frist.",
            "Tick things off as you go. Kretz keeps track of what's done and what's left before the next deadline.",
          )}
        >
          <ChecklistCard
            title={t("Sjekkliste · Nardo FK 2027", "Checklist · Nardo FK 2027")}
            badge={(d, n) => t(`${d} av ${n} klare`, `${d} of ${n} done`)}
            items={CHECKS.map(([id, no, en]) => ({ id, label: isEn ? en : no }))}
            checked={checks}
            onToggle={(id) => setChecks((s) => ({ ...s, [id]: !s[id] }))}
          />
        </ChecklistRow>

        <BenefitGrid
          title={t("Det du trenger for å levere riktig", "What you need to file correctly")}
          text={t(
            "Oppgaven henger sammen med aksjeboken, så du jobber med ett sett tall hele året.",
            "The return is connected to the share register, so you work with one set of figures all year.",
          )}
          items={[
            {
              icon: ICONS.shield,
              title: t("Politiattester", "Police certificates"),
              text: t(
                "Oversikt over hvem som jobber med barn og har levert attest.",
                "An overview of who works with children and has handed in a certificate.",
              ),
            },
            {
              icon: ICONS.cash,
              title: t("Honorar og a-melding", "Fees and a-melding"),
              text: t(
                "Varsel når en trener passerer 10 000 kr i året og må rapporteres.",
                "An alert when a coach passes NOK 10,000 a year and must be reported.",
              ),
            },
            {
              icon: ICONS.bell,
              title: t("Påminnelser før hver frist", "Reminders before every deadline"),
              text: t("Styret får beskjed i god tid – på e-post og i appen.", "The board is notified in good time – by email and in the app."),
            },
            {
              icon: ICONS.people,
              title: t("Overlevering til nytt styre", "Handover to the new board"),
              text: t(
                "Tilganger, dokumenter og historikk følger rollen, ikke personen.",
                "Access, documents and history follow the role, not the person.",
              ),
            },
          ]}
        />
      </FeatureBody>

      <RelatedFeatures
        items={[
          {
            file: "Kretz Medlemsregister.dc.html",
            title: t("Medlemsregister", "Member register"),
            text: t(
              "Én sannhet om hvert medlem – grunnlaget for alle tallene dere rapporterer.",
              "One source of truth for every member – the basis for all the figures you report.",
            ),
          },
          {
            file: "Kretz Okonomi.dc.html",
            title: t("Økonomi og rapport", "Finance and reporting"),
            text: t(
              "Budsjett, regnskapseksport og søknader om støtte i samme flyt.",
              "Budget, accounting export and grant applications in the same flow.",
            ),
          },
          {
            file: "Kretz Roller.dc.html",
            title: t("Roller og tilgang", "Roles and access"),
            text: t(
              "Gi kasserer, kontrollutvalg og regnskapsfører tilgang – uten å dele passord.",
              "Give the treasurer, audit committee and accountant access – without sharing passwords.",
            ),
          },
        ]}
      />

      <FeatureCta
        title={t("Klar for et enklere årshjul?", "Ready for a simpler annual cycle?")}
        text={t(
          "Vi flytter medlemsregisteret inn for dere, og går gjennom første rapportering sammen.",
          "We move your member register in for you, and go through the first reporting together.",
        )}
      />

      <Footer />
    </div>
  );
}
