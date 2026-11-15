import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FeatureCta from "../../components/info/FeatureCta";
import RelatedFeatures from "../../components/info/RelatedFeatures";
import {
  BenefitGrid,
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
import "../../styles/pages/dokumentsenter.css";

/* Port of "Kretz Dokumentsenter.dc.html". */

const ONLY_BOARD = ["Kun styret har tilgang", "Only the board has access"];

const FOLDERS = [
  {
    id: "styret",
    name: ["Styret", "Board"],
    depth: 0,
    access: ONLY_BOARD,
    count: 14,
    files: [
      [["Styreinstruks", "Board instructions"], "PDF", "180 kB"],
      [["Rolleoversikt", "Role overview"], "XLS", "42 kB"],
      [["Årshjul styret", "Board annual cycle"], "PDF", "96 kB"],
      [["Kontaktliste", "Contact list"], "DOC", "28 kB"],
    ],
  },
  {
    id: "moter",
    name: ["Møter 2026", "Meetings 2026"],
    depth: 1,
    access: ONLY_BOARD,
    count: 8,
    files: [
      [["Protokoll", "Minutes"], "PDF", "240 kB"],
      [["Budsjett", "Budget"], "XLS", "88 kB"],
      [["Agenda", "Agenda"], "PDF", "120 kB"],
      [["Vedlegg", "Attachments"], "DOC", "64 kB"],
    ],
  },
  {
    id: "vedtekter",
    name: ["Vedtekter", "Statutes"],
    depth: 1,
    access: ["Alle medlemmer kan lese", "All members can read"],
    count: 3,
    files: [
      [["Lov for Nardo FK", "Statutes of Nardo FK"], "PDF", "310 kB"],
      [["Endringer 2026", "Amendments 2026"], "DOC", "45 kB"],
      [["Lovnorm NIF", "NIF model statutes"], "PDF", "520 kB"],
      [["Lov 2023 (arkiv)", "Statutes 2023 (archive)"], "PDF", "298 kB"],
    ],
  },
  {
    id: "regnskap",
    name: ["Årsregnskap", "Annual accounts"],
    depth: 1,
    access: ["Styret og kontrollutvalget", "Board and audit committee"],
    count: 6,
    files: [
      [["Årsregnskap 2026", "Annual accounts 2026"], "PDF", "410 kB"],
      [["Hovedbok", "General ledger"], "XLS", "1,2 MB"],
      [["Kontrollutvalgets rapport", "Audit committee report"], "PDF", "150 kB"],
      [["Noter", "Notes"], "DOC", "72 kB"],
    ],
  },
  {
    id: "avtaler",
    name: ["Avtaler", "Agreements"],
    depth: 1,
    access: ONLY_BOARD,
    count: 11,
    files: [
      [["Sponsoravtale", "Sponsor agreement"], "PDF", "230 kB"],
      [["Hallleie", "Hall rental"], "PDF", "180 kB"],
      [["Draktavtale", "Kit agreement"], "PDF", "205 kB"],
      [["Prisliste", "Price list"], "XLS", "36 kB"],
    ],
  },
  {
    id: "arkiv",
    name: ["Arkiv", "Archive"],
    depth: 0,
    access: ONLY_BOARD,
    count: 57,
    files: [
      [["Protokoller 2025", "Minutes 2025"], "PDF", "2,1 MB"],
      [["Regnskap 2025", "Accounts 2025"], "XLS", "940 kB"],
      [["Årsberetning 2025", "Annual report 2025"], "PDF", "380 kB"],
      [["Gamle avtaler", "Old agreements"], "DOC", "120 kB"],
    ],
  },
];

const TYPES = {
  PDF: { tint: "#fbe3e7", fold: "#f4c3cc", badge: "#d9485f", ext: "PDF" },
  XLS: { tint: "#e2f3e6", fold: "#bfe3c7", badge: "#1f7a3a", ext: "XLSX" },
  DOC: { tint: "#e3ece6", fold: "#c3d4c8", badge: "#16241a", ext: "DOCX" },
};

const CHECKS = [
  ["a", "Se dokumenter for eget lag", "See documents for own team"],
  ["b", "Laste opp og redigere", "Upload and edit"],
  ["c", "Se styremappen", "See the board folder"],
  ["d", "Dele med foreldre", "Share with parents"],
];

function DocBrowser() {
  const { t, isEn } = useLang();
  const [folder, setFolder] = useState("moter");
  const cur = FOLDERS.find((f) => f.id === folder) || FOLDERS[1];
  const L = (pair) => (isEn ? pair[1] : pair[0]);

  return (
    <div style={{ ...MOCK_FRAME, padding: 28 }}>
      <div
        style={{
          borderRadius: 22,
          background: "#ffffff",
          border: "1px solid rgba(116,205,133,.35)",
          boxShadow: "0 24px 60px rgba(31,122,58,.14)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "60px minmax(0, 1fr) 60px",
            alignItems: "center",
            gap: 10,
            padding: "12px 18px",
            borderBottom: "1px solid rgba(116,205,133,.25)",
          }}
        >
          <span aria-hidden="true" style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 9, height: 9, borderRadius: 999, background: "#c7e6cd" }} />
            ))}
          </span>
          <span
            style={{
              justifySelf: "center",
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "min(100%, 230px)",
              boxSizing: "border-box",
              padding: "7px 14px",
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
            {t("Søk i dokumenter", "Search documents")}
          </span>
          <span />
        </div>
        <div data-rsp="stack" style={{ display: "grid", gridTemplateColumns: "170px minmax(0, 1fr)" }}>
          <div
            data-kz-doc-tree
            style={{
              padding: "18px 12px 64px",
              borderRight: "1px solid rgba(116,205,133,.25)",
              display: "grid",
              gap: 4,
              alignContent: "start",
            }}
          >
            {FOLDERS.map((f) => {
              const on = f.id === cur.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  className="kz-doc-folder"
                  aria-pressed={on}
                  onClick={() => setFolder(f.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textAlign: "left",
                    border: 0,
                    cursor: "pointer",
                    padding: "8px 10px",
                    borderRadius: 10,
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    marginLeft: f.depth * 12,
                    width: `calc(100% - ${f.depth * 12}px)`,
                    background: on ? "#e3f3e7" : "transparent",
                    color: on ? "#1f7a3a" : "#16241a",
                    fontWeight: on ? 700 : f.depth === 0 ? 700 : 500,
                  }}
                >
                  <svg width="20" height="16" viewBox="0 0 20 16" aria-hidden="true" style={{ flex: "0 0 auto" }}>
                    <path
                      d="M1 3a2 2 0 0 1 2-2h4.2l2 2H17a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z"
                      fill={on ? "#1f7a3a" : "#a3d9ae"}
                    />
                  </svg>
                  <span>{L(f.name)}</span>
                </button>
              );
            })}
          </div>
          <div style={{ padding: "18px 20px 22px", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
              <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>{L(cur.name)}</span>
              <span style={{ fontSize: 13, color: "#4C5E50" }}>{t(`${cur.count} filer`, `${cur.count} files`)}</span>
            </div>
            <div data-kz-doc-files style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
              {cur.files.map(([name, type, size], i) => {
                const ty = TYPES[type];
                return (
                  <div key={cur.id + i} className="kz-doc-file">
                    <span aria-hidden="true" style={{ position: "relative", flex: "0 0 auto", width: 40, height: 46 }}>
                      <svg width="34" height="42" viewBox="0 0 34 42" style={{ position: "absolute", right: 0, top: 0 }}>
                        <path d="M3 1h20l10 10v28a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" fill={ty.tint} />
                        <path d="M23 1v8a2 2 0 0 0 2 2h8" fill={ty.fold} />
                      </svg>
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          bottom: 6,
                          padding: "2px 5px",
                          borderRadius: 4,
                          fontSize: 9,
                          fontWeight: 800,
                          letterSpacing: ".04em",
                          color: "#ffffff",
                          background: ty.badge,
                        }}
                      >
                        {type}
                      </span>
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 800,
                          fontSize: 14.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {L(name)}
                      </span>
                      <span style={{ display: "block", marginTop: 3, fontSize: 12, color: "#4C5E50", whiteSpace: "nowrap" }}>
                        {ty.ext} · {size}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        data-kz-doc-access
        style={{
          position: "absolute",
          left: 12,
          bottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 18px",
          borderRadius: 999,
          background: "#ffffff",
          border: "1px solid rgba(116,205,133,.4)",
          boxShadow: "0 14px 34px rgba(31,122,58,.16)",
          fontSize: 14,
          fontWeight: 600,
          color: "#16241a",
        }}
      >
        <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
          <rect x="1" y="8" width="14" height="9" rx="2.5" fill="#1f7a3a" />
          <path d="M4 8V5.5a4 4 0 0 1 8 0V8" fill="none" stroke="#1f7a3a" strokeWidth="2" />
        </svg>
        {L(cur.access)}
      </div>
    </div>
  );
}

export default function DokumentsenterPage({ onOpenLogin, onOpenSignup, onOpenBooking }) {
  const { t, isEn } = useLang();
  const [checks, setChecks] = useState({ a: true, b: true, c: false, d: true });

  return (
    <div className="kz-sub">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} onOpenBooking={onOpenBooking} />

      <FeatureHero
        eyebrow={t("Kretz Styre · Dokumentsenter", "Kretz Board · Document centre")}
        title={t("Alle klubbens papirer.", "All the club's papers.")}
        accent={t("Ett sted.", "One place.")}
        lead={t(
          "Vedtekter, styreprotokoller, årsmøtepapirer, sponsoravtaler og treningsplaner – samlet i én mappestruktur. Du bestemmer hvem som ser hva, og avtaler signeres der de ligger.",
          "Statutes, board minutes, annual meeting papers, sponsor agreements and training plans – gathered in one folder structure. You decide who sees what, and agreements are signed where they are stored.",
        )}
        ticks={[
          t("Tilgang per rolle", "Access per role"),
          t("Signering med BankID", "Signing with BankID"),
          t("Følger med til neste styre", "Carries over to the next board"),
        ]}
      >
        <DocBrowser />
      </FeatureHero>

      <PainCards
        badge={t("Hverdagen uten system", "Everyday life without a system")}
        intro={t(
          "Klubbens dokumenter ligger der den siste som hadde vervet la dem.",
          "The club's documents are wherever the last person in the role left them.",
        )}
        items={[
          {
            title: t("Spredt overalt", "Scattered everywhere"),
            text: t(
              "E-post, Facebook-grupper, minnepinner og noens private Google Drive. Hvilken versjon av vedtektene gjelder egentlig?",
              "Email, Facebook groups, USB sticks and someone's private Google Drive. Which version of the statutes actually applies?",
            ),
          },
          {
            title: t("Alt eller ingenting", "All or nothing"),
            text: t(
              "Enten ser alle trenere og foreldre styrepapirene, eller så sender du filer én og én.",
              "Either every coach and parent sees the board papers, or you send files one by one.",
            ),
          },
          {
            title: t("Borte med forrige styre", "Gone with the previous board"),
            text: t(
              "Når lederen går av, forsvinner protokoller, avtaler og passord med henne.",
              "When the chair steps down, minutes, agreements and passwords leave with her.",
            ),
          },
        ]}
      />

      <HowItWorksBand
        title={t("Ett arkiv for hele klubben", "One archive for the whole club")}
        steps={[
          {
            title: t("Lag mappene", "Create the folders"),
            text: t(
              "Start med vår mal for idrettslag – styre, årsmøte, avtaler, lag – og dra dokumentene på plass.",
              "Start with our template for sports clubs – board, annual meeting, agreements, teams – and drag the documents into place.",
            ),
          },
          {
            title: t("Styr tilgangen", "Control access"),
            text: t(
              "Styret ser styremappen, trenerne ser sitt lag, og foreldre får bare det som er delt med dem.",
              "The board sees the board folder, coaches see their team, and parents only get what is shared with them.",
            ),
          },
          {
            title: t("Del og signer", "Share and sign"),
            text: t(
              "Send årsmøteprotokollen eller sponsoravtalen til signering, og finn den signerte versjonen i samme mappe.",
              "Send the annual meeting minutes or the sponsor agreement for signing, and find the signed version in the same folder.",
            ),
          },
        ]}
        panelTitle={t("Nardo FK · Styret", "Nardo FK · Board")}
        panelRight={t("Tilgang per rolle", "Access per role")}
        rows={[
          { kind: "done", icon: "✓", label: t("Protokoll årsmøte 2026", "Annual meeting minutes 2026"), right: t("Signert", "Signed") },
          {
            kind: "active",
            icon: "✎",
            label: t("Sponsoravtale Sparebanken", "Sponsor agreement Sparebanken"),
            right: t("Til signering", "Awaiting signature"),
          },
          { kind: "muted", icon: "…", label: t("Budsjett 2027", "Budget 2027"), right: t("Utkast", "Draft") },
          {
            kind: "muted",
            icon: "↗",
            label: t("Årsregnskap 2026", "Annual accounts 2026"),
            right: t("Delt med kontrollutvalget", "Shared with the audit committee"),
          },
          {
            kind: "dashed",
            icon: "👁",
            label: t("Treningsplan G14", "Training plan G14"),
            right: t("Lesetilgang for foreldre", "Read access for parents"),
          },
        ]}
      />

      <FeatureBody>
        <ChecklistRow
          title={t("Riktig tilgang for hver rolle", "The right access for every role")}
          text={t(
            "Kasserer, trener eller forelder – velg hva hver rolle kan gjøre, og juster for enkeltpersoner ved behov.",
            "Treasurer, coach or parent – choose what each role can do, and adjust for individuals when needed.",
          )}
        >
          <ChecklistCard
            title={t("Rettigheter · Trener G14", "Permissions · Coach G14")}
            badge={(d, n) => t(`${d} av ${n} rettigheter`, `${d} of ${n} permissions`)}
            items={CHECKS.map(([id, no, en]) => ({ id, label: isEn ? en : no }))}
            checked={checks}
            onToggle={(id) => setChecks((s) => ({ ...s, [id]: !s[id] }))}
          />
        </ChecklistRow>

        <BenefitGrid
          title={t("Orden i papirene – uten ekstra arbeid", "Papers in order – without extra work")}
          text={t(
            "Dokumentene henger sammen med styremøter, årsmøtet og medlemsregisteret, så ingenting må lastes opp to ganger.",
            "Documents are linked to board meetings, the annual meeting and the member register, so nothing has to be uploaded twice.",
          )}
          items={[
            {
              icon: ICONS.folder,
              title: t("Mal for idrettslag", "Template for sports clubs"),
              text: t(
                "Ferdige mapper for styre, årsmøte, avtaler og lag – endre når dere vil.",
                "Ready-made folders for the board, annual meeting, agreements and teams – change them whenever you like.",
              ),
            },
            {
              icon: ICONS.lock,
              title: t("Privat som standard", "Private by default"),
              text: t(
                "Styremappen er lukket for alle andre til du gir tilgang.",
                "The board folder is closed to everyone else until you grant access.",
              ),
            },
            {
              icon: ICONS.pen,
              title: t("Signering med BankID", "Signing with BankID"),
              text: t(
                "Protokoller og avtaler signeres der de ligger, og lagres signert.",
                "Minutes and agreements are signed where they are stored, and saved signed.",
              ),
            },
            {
              icon: ICONS.people,
              title: t("Overlevering til nytt styre", "Handover to the new board"),
              text: t(
                "Tilgangen følger vervet, så arkivet blir i klubben når folk går av.",
                "Access follows the role, so the archive stays with the club when people step down.",
              ),
            },
          ]}
        />
      </FeatureBody>

      <RelatedFeatures
        items={[
          {
            file: "Kretz AR-oppgave.dc.html",
            title: t("Årlig rapportering", "Annual reporting"),
            text: t(
              "Årsmøtepapirer og rapporter havner automatisk i riktig mappe.",
              "Annual meeting papers and reports land in the right folder automatically.",
            ),
          },
          {
            file: "Kretz Roller.dc.html",
            title: t("Roller og tilgang", "Roles and access"),
            text: t("De samme rollene styrer hvem som ser hvilke dokumenter.", "The same roles control who sees which documents."),
          },
          {
            file: "Kretz Okonomi.dc.html",
            title: t("Økonomi og rapport", "Finance and reporting"),
            text: t(
              "Budsjett og regnskap lagres sammen med bilag og avtaler.",
              "Budget and accounts are stored together with receipts and agreements.",
            ),
          },
        ]}
      />

      <FeatureCta
        title={t("Klar for orden i klubbens papirer?", "Ready to get the club's papers in order?")}
        text={t(
          "Kom i gang selv, eller book en demo – så viser vi hvordan dokumentsenteret settes opp for styret og trenerne.",
          "Get started yourself, or book a demo – and we'll show you how the document centre is set up for the board and coaches.",
        )}
      />

      <Footer />
    </div>
  );
}
