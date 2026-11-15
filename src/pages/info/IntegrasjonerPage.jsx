import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hv from "../../components/Hv";
import { IconTile } from "../../components/info/FeatureSections";
import { ICONS } from "../../components/info/featureConstants";
import { designHref } from "../../lib/routes";
import { useLang } from "../../lib/langContext";
import useReveal from "../../lib/useReveal";
import logoTripletex from "../../assets/design/logo-tripletex.svg";
import logoFiken from "../../assets/design/logo-fiken.svg";
import logoUniMicro from "../../assets/design/logo-unimicro.svg";
import logoVipps from "../../assets/design/logo-vipps.svg";
import logoNif from "../../assets/design/logo-nif.svg";
import logoMs365 from "../../assets/design/logo-ms365.svg";
import "../../styles/subpage.css";
import "../../styles/pages/integrasjoner.css";

/*
  Port of "Kretz Integrasjoner.dc.html".

  logo-brreg.png, logo-altinn.png, kretz-shot-styret.png and
  kretz-shot-dashboard.png from the design are not in the repo yet; neutral
  placeholders of the same size stand in for them (see LogoImg / ShotSlot).
*/

const H2 = {
  fontFamily: "var(--font-heading)",
  fontWeight: 800,
  fontSize: "clamp(28px, 3.6vw, 44px)",
  lineHeight: 1.05,
  margin: 0,
};

// [name, logo src (null = missing asset), w, h, category id, NO text, EN text]
const INTS = [
  ["Tripletex", logoTripletex, 40, 40, "acc", "Innbetalinger, fakturaer og bilag overføres automatisk til regnskapet.", "Payments, invoices and receipts are transferred to the accounts automatically."],
  ["Fiken", logoFiken, 40, 40, "acc", "Bokfør kontingent, leie og dugnad uten å taste inn noe på nytt.", "Book fees, rentals and dugnad income without typing anything twice."],
  ["Uni Micro", logoUniMicro, 40, 40, "acc", "Eksporter posteringer og kunderegister rett til Uni Micro.", "Export entries and the customer register straight to Uni Micro."],
  ["Vipps", logoVipps, 56, 28, "pay", "Medlemmene betaler kontingent, halleie og cup-påmelding med Vipps.", "Members pay fees, hall rental and tournament sign-ups with Vipps."],
  ["NIF · Min idrett", logoNif, 40, 40, "sport", "Medlemstall og samordnet rapportering i takt med idrettens egne systemer.", "Membership numbers and coordinated reporting in step with the sports federation's own systems."],
  ["Microsoft 365", logoMs365, 40, 40, "office", "Kalender og e-post i sync med aktiviteter, kamper og styremøter.", "Calendar and email in sync with activities, matches and board meetings."],
  ["Brønnøysundregistrene", null, 40, 40, "public", "Hent klubbens opplysninger og meld inn nytt styre etter årsmøtet.", "Fetch the club's details and register the new board after the annual meeting."],
  ["Altinn", null, 40, 40, "public", "Send og hent oppgaver for klubben, som a-melding og AR-oppgave.", "Send and fetch returns for the club, such as the a-melding and annual return."],
];

const CATS = [
  ["all", "Alle", "All"],
  ["acc", "Regnskap", "Accounting"],
  ["pay", "Betaling", "Payments"],
  ["public", "Offentlig", "Public"],
  ["sport", "Idrett", "Sport"],
  ["office", "Kontor", "Office"],
];

const QUOTES = [
  [
    "«Vi gikk fra fire regneark og en skoeske til én skjerm. Kassereren smiler faktisk i november nå.»",
    "“We went from four spreadsheets and a shoebox to one screen. Our treasurer actually smiles in November now.”",
    "Marit Sunde · styreleder, Lade Kunstløp",
    "Marit Sunde · chair, Lade Kunstløp",
  ],
  [
    "«Cup-påmelding tok før en hel helg. Nå tar det en kaffepause.»",
    "“Tournament sign-up used to take a whole weekend. Now it takes a coffee break.”",
    "Jonas Reite · sportslig leder, IL Fana",
    "Jonas Reite · head of sport, IL Fana",
  ],
  [
    "«Sponsorene ser endelig hva de får. Fornyelser gikk fra ringerunde til formalitet.»",
    "“Sponsors finally see what they get. Renewals went from a round of phone calls to a formality.”",
    "Ida Krogh · partneransvarlig, Molde Turn",
    "Ida Krogh · partnerships lead, Molde Turn",
  ],
  [
    "«Foreldrene booker halltid selv. Telefonen min er stille på søndag kveld.»",
    "“Parents book hall time themselves. My phone is quiet on Sunday evenings.”",
    "Thomas Lie · hallansvarlig, Varden BTK",
    "Thomas Lie · hall manager, Varden BTK",
  ],
  [
    "«Søknaden om støtte tok én ettermiddag i stedet for tre helger.»",
    "“The grant application took one afternoon instead of three weekends.”",
    "Anne Bjørk · kasserer, Fana Turn",
    "Anne Bjørk · treasurer, Fana Turn",
  ],
];

/* A logo, or a neutral placeholder of the same box when the asset is missing. */
function LogoImg({ src, name, w, h, alt }) {
  if (src) return <img src={src} alt={alt} style={{ width: w, height: h, objectFit: "contain" }} />;
  const initials = name === "Altinn" ? "A" : "BR";
  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      title={name}
      style={{
        width: w,
        height: h,
        borderRadius: 10,
        background: "#e6ece4",
        color: "#4C5E50",
        display: "grid",
        placeItems: "center",
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: ".02em",
      }}
    >
      {initials}
    </span>
  );
}

function LogoTile({ it, decorative }) {
  return (
    <div className="kz-int-tile">
      <LogoImg src={it[1]} name={it[0]} w={it[2]} h={it[3]} alt={decorative ? "" : it[0]} />
    </div>
  );
}

/* Placeholder for the product screenshots used in the closing CTA. */
function ShotSlot({ label, style }) {
  return (
    <div role="img" aria-label={label} className="kz-int-shot" style={style}>
      <div style={{ display: "flex", gap: 6, padding: "12px 14px", borderBottom: "1px solid rgba(22,36,26,.08)" }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: "#d5ddd2" }} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "22% minmax(0,1fr)", gap: 14, padding: 16 }}>
        <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
          {[90, 70, 80, 60, 75].map((w, i) => (
            <span key={i} style={{ height: 8, width: `${w}%`, borderRadius: 999, background: "#e6ece4" }} />
          ))}
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ height: 54, borderRadius: 12, background: i === 0 ? "#e3f3e7" : "#f1f4ef" }} />
            ))}
          </div>
          <span style={{ height: 120, borderRadius: 12, background: "#f1f4ef" }} />
          <span style={{ height: 60, borderRadius: 12, background: "#f1f4ef" }} />
        </div>
      </div>
    </div>
  );
}

export default function IntegrasjonerPage({ onOpenLogin, onOpenSignup, onOpenBooking }) {
  const { t, isEn, lang } = useLang();
  const [cat, setCat] = useState("all");
  useReveal(lang);

  const start = designHref("Kretz.dc.html#kom-i-gang");
  const catLabel = Object.fromEntries(CATS.map(([id, no, en]) => [id, isEn ? en : no]));
  const shown = INTS.filter((i) => cat === "all" || i[4] === cat);

  return (
    <div className="kz-sub kz-int">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} onOpenBooking={onOpenBooking} />

      {/* HERO */}
      <section data-rsp-pad style={{ padding: "40px 28px 24px" }}>
        <div
          data-rsp-wide
          data-kz-cta
          style={{
            position: "relative",
            overflow: "hidden",
            maxWidth: 1200,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "76px 48px 80px",
            borderRadius: 40,
            textAlign: "center",
            backgroundColor: "#e3f3e7",
            backgroundImage:
              "radial-gradient(rgba(31,122,58,.16) 1px, transparent 1.2px), linear-gradient(160deg, #eef9f0 0%, #d6efdc 100%)",
            backgroundSize: "16px 16px, 100% 100%",
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 1000"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 1100,
              height: 1100,
              maxWidth: "none",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <circle cx="500" cy="500" r="410" fill="none" stroke="rgba(116,205,133,.18)" strokeWidth="80" />
            <circle cx="500" cy="500" r="300" fill="none" stroke="rgba(22,36,26,.08)" strokeWidth="1.5" strokeDasharray="5 9" />
          </svg>
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              border: "1.5px solid #74cd85",
              background: "rgba(255,255,255,.6)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "#1f7a3a",
            }}
          >
            {t("Integrasjoner", "Integrations")}
          </div>
          <h1
            style={{
              position: "relative",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(38px, 5.6vw, 68px)",
              lineHeight: 1,
              margin: "20px auto 0",
              maxWidth: "13em",
            }}
          >
            {t("Kretz – ryggraden i klubbens ", "Kretz – the backbone of the club's ")}
            <span style={{ color: "#1f7a3a" }}>{t("systemer", "systems")}</span>
          </h1>
          <p style={{ position: "relative", margin: "20px auto 0", fontSize: 18, lineHeight: 1.6, color: "#3b4d3f", maxWidth: "38em" }}>
            {t(
              "Kretz kobler seg til verktøyene klubben allerede bruker – regnskap, betaling og offentlige registre – så dere slipper å taste det samme to ganger.",
              "Kretz connects to the tools your club already uses – accounting, payments and public registers – so you never have to type the same thing twice.",
            )}
          </p>
          <div style={{ position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 30 }}>
            <a
              href={start}
              className="kz-arrow-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 26px",
                borderRadius: 999,
                background: "#16241a",
                color: "#f6f8f3",
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              {t("Be om integrasjon", "Request an integration")}{" "}
              <span className="kz-arr" aria-hidden="true">
                →
              </span>
            </a>
            <Hv
              as="a"
              href={start}
              style="display: inline-flex; align-items: center; padding: 15px 26px; border-radius: 999px; border: 1px solid #16241a; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 15px; transition: background .3s, color .3s"
              hover="background: #16241a; color: #f6f8f3"
            >
              {t("Book en demo", "Book a demo")}
            </Hv>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section data-rsp-pad style={{ padding: "48px 28px 24px" }}>
        <div
          data-rsp-wide
          data-rsp-cols="3"
          style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "32px 48px" }}
        >
          {[
            [
              <path key="l" d="M9 7H7a5 5 0 0 0 0 10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" />,
              t("Koblet til det dere bruker", "Connected to what you use"),
              t(
                "Regnskap, betaling, idrettens systemer og offentlige registre – samlet i Kretz.",
                "Accounting, payments, the sports federation's systems and public registers – together in Kretz.",
              ),
            ],
            [
              <path key="b" d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />,
              t("Enkelt oppsett", "Easy setup"),
              t(
                "Koble til på minutter, uten teknisk kunnskap. Vi hjelper dere i gang.",
                "Connect in minutes, no technical knowledge needed. We'll help you get started.",
              ),
            ],
            [
              ICONS.shield,
              t("Trygt og skalerbart", "Secure and scalable"),
              t(
                "Sikre koblinger som fungerer like godt for små lag som for store fleridrettslag.",
                "Secure connections that work just as well for small teams as for large multi-sport clubs.",
              ),
            ],
          ].map(([icon, title, text]) => (
            <div key={title} data-reveal style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
              <IconTile>{icon}</IconTile>
              <div style={{ minWidth: 0, paddingTop: 2 }}>
                <b style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, color: "#16241a" }}>{title}</b>
                <span style={{ display: "block", marginTop: 6, fontSize: 15, lineHeight: 1.55, color: "#4C5E50" }}>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIST */}
      <section data-rsp-pad style={{ padding: "56px 28px 40px" }}>
        <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(116,205,133,.18)",
                border: "1.5px solid rgba(116,205,133,.55)",
                color: "#1f7a3a",
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: 15,
                letterSpacing: ".02em",
              }}
            >
              {t("Integrasjoner", "Integrations")}
            </span>
            <h2 style={{ ...H2, margin: "18px 0 0" }}>
              {t("Sømløse integrasjoner på tvers av systemer", "Seamless integrations across systems")}
            </h2>
            <p style={{ margin: "12px auto 0", fontSize: 17, lineHeight: 1.6, color: "#4C5E50", maxWidth: "36em" }}>
              {t(
                "Koble Kretz til regnskap, betaling, idrettens systemer og offentlige registre – og få alt samlet på ett sted.",
                "Connect Kretz to accounting, payments, the sports federation's systems and public registers – and get everything in one place.",
              )}
            </p>
          </div>
          <div
            role="group"
            aria-label={t("Filtrer etter kategori", "Filter by category")}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 30 }}
          >
            {CATS.map(([id]) => {
              const on = id === cat;
              return (
                <button
                  key={id}
                  type="button"
                  className="kz-int-cat"
                  aria-pressed={on}
                  onClick={() => setCat(id)}
                  style={{
                    padding: "9px 16px",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 600,
                    border: on ? "1px solid #16241a" : "1px solid rgba(22,36,26,.18)",
                    background: on ? "#16241a" : "#ffffff",
                    color: on ? "#f6f8f3" : "#16241a",
                  }}
                >
                  {catLabel[id]}
                </button>
              );
            })}
          </div>
          <div data-rsp-cols="4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, marginTop: 28 }}>
            {shown.map((it) => (
              <div
                key={cat + it[0]}
                className="kz-card kz-panel-in"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  borderRadius: 24,
                  background: "#ffffff",
                  border: "1px solid rgba(22,36,26,.12)",
                  padding: 24,
                  color: "#16241a",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <span
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background: "#ffffff",
                      border: "1px solid rgba(116,205,133,.4)",
                      boxShadow: "0 10px 24px rgba(31,122,58,.10)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <LogoImg src={it[1]} name={it[0]} w={it[2]} h={it[3]} alt="" />
                  </span>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "#eaf7ed",
                      color: "#1f7a3a",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {catLabel[it[4]]}
                  </span>
                </div>
                <b style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>{it[0]}</b>
                <span style={{ fontSize: 14.5, lineHeight: 1.55, color: "#4C5E50" }}>{isEn ? it[6] : it[5]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MORE */}
      <section data-rsp-pad style={{ padding: "40px 28px" }}>
        <div
          data-rsp-wide
          data-reveal
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            borderRadius: 40,
            background: "#16241a",
            color: "#f6f8f3",
            padding: "64px 0 56px",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div style={{ padding: "0 28px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#a3e2ae" }}>
              {t("… og flere er på vei", "… and more are on the way")}
            </div>
            <h2 style={{ ...H2, margin: "14px 0 0", color: "#f6f8f3" }}>
              {t("Én plattform – mange integrasjoner", "One platform – many integrations")}
            </h2>
            <p style={{ margin: "14px auto 0", fontSize: 17, lineHeight: 1.6, color: "rgba(246,248,243,.78)", maxWidth: "34em" }}>
              {t(
                "Bruker klubben et system vi ikke kobler til ennå? Si fra, så ser vi på det sammen med dere.",
                "Does your club use a system we don't connect to yet? Let us know, and we'll look into it together with you.",
              )}
            </p>
            <Hv
              as="a"
              href={start}
              style="display: inline-flex; align-items: center; margin-top: 24px; padding: 15px 26px; border-radius: 999px; background: #74cd85; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 15px; transition: background .3s, transform .3s cubic-bezier(.2,.7,.2,1)"
              hover="background: #a3e2ae; color: #16241a; transform: translateY(-2px)"
            >
              {t("Kontakt oss", "Contact us")}
            </Hv>
          </div>
          <div className="kz-marquee-wrap" style={{ marginTop: 40 }}>
            <div className="kz-marquee">
              {[false, true].map((copy) => (
                <div key={String(copy)} aria-hidden={copy || undefined} style={{ display: "flex" }}>
                  {[...INTS, ...INTS].map((it, i) => (
                    <LogoTile key={i} it={it} decorative={copy} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <section style={{ padding: "56px 0 40px" }}>
        <h2 data-reveal style={{ ...H2, margin: "0 16px", textAlign: "center" }}>
          {t("Hva klubbene sier", "What the clubs say")}
        </h2>
        <div className="kz-marquee-wrap" style={{ marginTop: 32 }}>
          <div className="kz-marquee kz-slow">
            {[false, true].map((copy) => (
              <div key={String(copy)} aria-hidden={copy || undefined} style={{ display: "flex" }}>
                {QUOTES.map((q) => (
                  <figure key={q[2]} className="kz-int-quote">
                    <div aria-hidden="true" style={{ color: "#e0a100", letterSpacing: 2 }}>
                      ★★★★★
                    </div>
                    <blockquote style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.55, fontWeight: 600, color: "#16241a" }}>
                      {isEn ? q[1] : q[0]}
                    </blockquote>
                    <figcaption style={{ marginTop: 14, fontSize: 13.5, color: "#4C5E50" }}>{isEn ? q[3] : q[2]}</figcaption>
                  </figure>
                ))}
              </div>
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
          data-kz-int-cta
          data-reveal
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            boxSizing: "border-box",
            borderRadius: 34,
            background: "linear-gradient(135deg, #a3e2ae 0%, #74cd85 100%)",
            color: "#16241a",
            position: "relative",
            overflow: "hidden",
            minHeight: 420,
            padding: "0 0 0 64px",
            display: "grid",
            gridTemplateColumns: "minmax(0, .85fr) minmax(0, 1.15fr)",
            gap: "32px 56px",
            alignItems: "stretch",
          }}
        >
          <div style={{ minWidth: 0, alignSelf: "center", padding: "56px 0" }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(28px, 3.4vw, 42px)",
                lineHeight: 1.08,
                margin: 0,
                color: "#16241a",
              }}
            >
              {t("Book et møte i dag", "Book a meeting today")}
            </h2>
            <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "#22382a", maxWidth: "30em" }}>
              {t(
                "Klar for neste steg? Vi viser hvordan Kretz kobles til systemene klubben allerede bruker – på en kort samtale.",
                "Ready for the next step? We'll show you how Kretz connects to the systems your club already uses – in a short call.",
              )}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
              <Hv
                as="a"
                href={start}
                style="display: inline-flex; align-items: center; padding: 15px 26px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 15px; white-space: nowrap; transition: background .3s, transform .3s cubic-bezier(.2,.7,.2,1)"
                hover="background: #1f3a27; color: #f6f8f3; transform: translateY(-2px)"
              >
                {t("Book et møte", "Book a meeting")}
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
            <ShotSlot
              label={t(
                "Kretz: styret med neste styremøte, styremøter og vedtak",
                "Kretz: the board with the next board meeting, meetings and resolutions",
              )}
              style={{ left: 0, bottom: -40, width: "108%", aspectRatio: "16 / 10", borderRadius: "16px 16px 0 0", boxShadow: "0 24px 60px rgba(22,36,26,.22)" }}
            />
            <ShotSlot
              label={t(
                "Kretz: oversikt for administrator med nøkkeltall og planlegger",
                "Kretz: administrator overview with key figures and planner",
              )}
              style={{ left: "24%", bottom: -16, width: "140%", aspectRatio: "16 / 10", borderRadius: "16px 0 0 0", boxShadow: "0 30px 70px rgba(22,36,26,.28)" }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
