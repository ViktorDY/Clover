import { useState } from "react";
import FeatureDetail from "../../components/info/FeatureDetail";
import { sx } from "../../lib/sx";
import { useLang } from "../../lib/langContext";

/*
  Økonomi og rapport — port of "Kretz Okonomi.dc.html". The hero mockup is a
  finance overview with a Måned / År switch that swaps the KPI tiles and the
  income-vs-cost bars.
*/

const DATA = {
  month: {
    kpi: [
      [["Inntekter", "Income"], ["kr 386 000", "NOK 386,000"]],
      [["Kostnader", "Costs"], ["kr 298 000", "NOK 298,000"]],
      [["Resultat", "Result"], ["+ kr 88 000", "+ NOK 88,000"]],
    ],
    bars: [
      [["Jun", "Jun"], 310, 280],
      [["Jul", "Jul"], 180, 240],
      [["Aug", "Aug"], 420, 300],
      [["Sep", "Sep"], 390, 310],
      [["Okt", "Oct"], 360, 290],
      [["Nov", "Nov"], 386, 298],
    ],
  },
  year: {
    kpi: [
      [["Inntekter", "Income"], ["kr 4,1 mill", "NOK 4.1m"]],
      [["Kostnader", "Costs"], ["kr 3,6 mill", "NOK 3.6m"]],
      [["Resultat", "Result"], ["+ kr 560 000", "+ NOK 560,000"]],
    ],
    bars: [
      [["2021", "2021"], 2900, 2800],
      [["2022", "2022"], 3200, 3050],
      [["2023", "2023"], 3500, 3300],
      [["2024", "2024"], 3700, 3420],
      [["2025", "2025"], 3900, 3480],
      [["2026", "2026"], 4120, 3560],
    ],
  },
};

const BAR = {
  width: "40%",
  maxWidth: 16,
  borderRadius: "6px 6px 2px 2px",
  transition: "height .5s cubic-bezier(.2,.7,.2,1)",
};

function FinanceMockup() {
  const { t, isEn } = useLang();
  const [period, setPeriod] = useState("month");
  const cur = DATA[period];
  const max = Math.max(...cur.bars.map((b) => Math.max(b[1], b[2])));
  const pct = (v) => `${Math.round((v / max) * 100)}%`;
  const L = isEn ? 1 : 0;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>
          {t("Økonomi · Nardo FK", "Finance · Nardo FK")}
        </span>
        <span
          role="group"
          aria-label={t("Velg periode", "Choose period")}
          style={{ display: "inline-flex", padding: 3, borderRadius: 999, background: "#eef5ef" }}
        >
          {[
            ["month", t("Måned", "Month")],
            ["year", t("År", "Year")],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setPeriod(key)}
              aria-pressed={key === period}
              style={sx(
                "padding: 6px 14px; border-radius: 999px; border: 0; cursor: pointer; font-family: var(--font-body); font-size: 13px; font-weight: 600; " +
                  (key === period ? "background: #16241a; color: #f6f8f3;" : "background: transparent; color: #16241a;"),
              )}
            >
              {label}
            </button>
          ))}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10, marginTop: 16 }}>
        {cur.kpi.map(([label, value], i) => (
          <div
            key={label[0]}
            style={{ borderRadius: 16, padding: "12px 14px", minWidth: 0, background: i === 2 ? "#eaf7ed" : "#f4f8f2" }}
          >
            <div style={{ fontSize: 12, color: "#4C5E50" }}>{label[L]}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, marginTop: 4, whiteSpace: "nowrap" }}>
              {value[L]}
            </div>
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 12,
          height: 150,
          marginTop: 20,
          padding: "0 4px",
          borderBottom: "1px solid rgba(22,36,26,.1)",
        }}
      >
        {cur.bars.map(([, inc, exp], i) => (
          <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4, height: "100%" }}>
            <span style={{ ...BAR, height: pct(inc), background: "#74cd85" }} />
            <span style={{ ...BAR, height: pct(exp), background: "#e3bcb0" }} />
          </div>
        ))}
      </div>
      <div aria-hidden="true" style={{ display: "flex", gap: 12, padding: "6px 4px 0" }}>
        {cur.bars.map(([label]) => (
          <span key={label[0]} style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#4C5E50" }}>
            {label[L]}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12.5, color: "#4C5E50" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#74cd85" }} />
          {t("Inntekter", "Income")}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#e3bcb0" }} />
          {t("Kostnader", "Costs")}
        </span>
      </div>
    </>
  );
}

export default function OkonomiPage(props) {
  const { t } = useLang();
  return (
    <FeatureDetail
      {...props}
      hero={{
        eyebrow: t("Kretz Økonomi · Økonomi og rapport", "Kretz Finance · Finance and reporting"),
        title: t("Tallene på plass.", "The numbers in place."),
        accent: t("Hver dag, ikke bare i mars.", "Every day, not just in March."),
        lead: t(
          "Kontingent, leieinntekter, dugnad og sponsorer samles automatisk. Styret ser budsjett mot resultat i sanntid, og kasserer eksporterer til regnskapet med ett klikk.",
          "Fees, rental income, volunteering and sponsors are collected automatically. The board sees budget against results in real time, and the treasurer exports to the accounts with one click.",
        ),
        ticks: [
          t("Budsjett mot resultat", "Budget vs result"),
          t("Eksport til regnskapet", "Export to accounting"),
          t("Revisjonsspor på alt", "Audit trail on everything"),
        ],
        mockup: <FinanceMockup />,
        badge: t("Kontingent 92 % innbetalt", "Fees 92% paid"),
        badgeSide: "left",
      }}
      pain={{
        lead: t(
          "Kassereren er ofte den mest slitne frivillige i klubben.",
          "The treasurer is often the most worn-out volunteer in the club.",
        ),
        items: [
          [
            t("Tall fra fem steder", "Numbers from five places"),
            t(
              "Vipps, nettbank, kiosken og dugnadslister må limes sammen i et regneark før hvert styremøte.",
              "Vipps, online banking, the kiosk and volunteering lists have to be pasted into a spreadsheet before every board meeting.",
            ),
          ],
          [
            t("Ingen vet hvor vi står", "Nobody knows where we stand"),
            t(
              "Styret tar beslutninger på tall fra forrige kvartal – eller ingen tall i det hele tatt.",
              "The board makes decisions on last quarter's figures – or no figures at all.",
            ),
          ],
          [
            t("Revisjonen tar en helg", "The audit takes a weekend"),
            t(
              "Bilag mangler, posteringer er uklare, og kontrollutvalget må etterlyse alt på nytt.",
              "Receipts are missing, entries are unclear, and the control committee has to chase everything again.",
            ),
          ],
        ],
      }}
      how={{
        title: t("Fra innbetaling til ferdig rapport", "From payment to finished report"),
        steps: [
          [
            t("Pengene kommer inn", "The money comes in"),
            t(
              "Kontingent, leie og dugnad registreres automatisk når medlemmene betaler.",
              "Fees, rent and volunteering income are recorded automatically when members pay.",
            ),
          ],
          [
            t("Følg budsjettet", "Follow the budget"),
            t(
              "Sett opp budsjett per avdeling og lag, og se avvik så snart de oppstår.",
              "Set up a budget per department and team, and see deviations as soon as they occur.",
            ),
          ],
          [
            t("Rapporter og eksporter", "Report and export"),
            t(
              "Lag rapport til styremøtet og årsmøtet, og send bilagene til regnskapssystemet.",
              "Create reports for the board meeting and the annual meeting, and send the receipts to the accounting system.",
            ),
          ],
        ],
        listTitle: t("Nardo FK · november", "Nardo FK · November"),
        listRight: t("Status", "Status"),
        rows: [
          { kind: "done", label: t("Kontingent høst 2026", "Fees autumn 2026"), value: t("92 % betalt", "92% paid") },
          { kind: "done", label: t("Leieinntekter hall", "Hall rental income"), value: t("kr 41 200", "NOK 41,200") },
          { kind: "active", label: t("Rapport til styremøtet", "Report for the board meeting"), value: t("Klar", "Ready") },
          { kind: "note", icon: "!", label: t("Utstyr G14 over budsjett", "G14 equipment over budget"), value: "+ 12 %" },
          {
            kind: "todo",
            icon: "↗",
            label: t("Bilag til regnskapssystemet", "Receipts to the accounting system"),
            value: t("Eksporteres fredag", "Exported on Friday"),
          },
        ],
      }}
      setup={{
        title: t("Kontroll uten regneark", "Control without spreadsheets"),
        lead: t(
          "Sett opp økonomien én gang – så holder Kretz orden på resten gjennom sesongen.",
          "Set up your finances once – and Kretz keeps the rest in order all season.",
        ),
        cardTitle: t("Oppsett · økonomi 2027", "Set-up · finance 2027"),
        items: [
          { key: "a", on: true, label: t("Kontoplan for idrettslag", "Chart of accounts for sports clubs") },
          { key: "b", on: true, label: t("Budsjett per avdeling", "Budget per department") },
          { key: "c", on: true, label: t("Vipps og bankkonto koblet til", "Vipps and bank account connected") },
          { key: "d", on: false, label: t("Regnskapseksport satt opp", "Accounting export set up") },
          { key: "e", on: false, label: t("Kontrollutvalget har lesetilgang", "Control committee has read access") },
        ],
      }}
      gets={{
        title: t("Ett sett tall for hele klubben", "One set of numbers for the whole club"),
        lead: t(
          "Økonomien henger sammen med kontingent, hallbooking og medlemsregisteret, så ingenting må føres to ganger.",
          "Finance is connected to fees, hall booking and the member register, so nothing has to be entered twice.",
        ),
        items: [
          {
            title: t("Budsjett per avdeling", "Budget per department"),
            text: t(
              "Fotball, håndball og allidrett med egne budsjetter og egne ansvarlige.",
              "Football, handball and multi-sport each with their own budget and their own owner.",
            ),
            icon: (
              <>
                <path d="M4 19V5M4 19h16" />
                <path d="M8 16v-4M12 16V8M16 16v-6" />
              </>
            ),
          },
          {
            title: t("Eksport til regnskapet", "Export to accounting"),
            text: t(
              "Posteringer og bilag sendes til regnskapssystemet dere bruker.",
              "Entries and receipts are sent to the accounting system you use.",
            ),
            icon: (
              <>
                <path d="M12 4v11M7 10l5 5 5-5" />
                <path d="M4 19h16" />
              </>
            ),
          },
          {
            title: t("Søknader om støtte", "Grant applications"),
            text: t(
              "Tallene til LAM-midler og momskompensasjon er klare når fristen kommer.",
              "The figures for LAM grants and VAT compensation are ready when the deadline comes.",
            ),
            icon: <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8L12 3z" />,
          },
          {
            title: t("Revisjonsspor", "Audit trail"),
            text: t(
              "Hver endring logges, så kontrollutvalget ser hvem som gjorde hva.",
              "Every change is logged, so the control committee can see who did what.",
            ),
            icon: (
              <>
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l3 2" />
              </>
            ),
          },
        ],
      }}
      related={[
        {
          file: "Kretz AR-oppgave.dc.html",
          title: t("Årlig rapportering", "Annual reporting"),
          text: t("Regnskap og nøkkeltall er klare til årsmøtet.", "Accounts and key figures are ready for the annual meeting."),
        },
        {
          file: "Kretz Dokumentsenter.dc.html",
          title: t("Dokumentsenter", "Document centre"),
          text: t("Budsjett, regnskap og bilag lagres i riktig mappe.", "Budgets, accounts and receipts are stored in the right folder."),
        },
        {
          file: "Kretz Medlemsregister.dc.html",
          title: t("Medlemsregister", "Member register"),
          text: t(
            "Kontingenten følger medlemmene, lagene og familiene.",
            "Fees follow the members, the teams and the families.",
          ),
        },
      ]}
      cta={{
        title: t("Klar for orden i økonomien?", "Ready to get your finances in order?"),
        text: t(
          "Vi setter opp kontoplan og budsjett for dere, og kobler til regnskapssystemet dere bruker.",
          "We set up the chart of accounts and budget for you, and connect the accounting system you use.",
        ),
      }}
    />
  );
}
