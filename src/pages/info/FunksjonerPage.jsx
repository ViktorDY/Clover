import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hv from "../../components/Hv";
import FeatureCta from "../../components/info/FeatureCta";
import markAlpha from "../../assets/design/kretz-mark-alpha.png";
import { designHref } from "../../lib/routes";
import { useLang } from "../../lib/langContext";
import { sx } from "../../lib/sx";
import "../../styles/subpage.css";
import "../../styles/pages/funksjoner.css";

/*
  "Kretz Funksjoner.dc.html" — the all-features overview: hero with a
  product mock and rotating toasts, an auto-advancing tab showcase, the
  module grid, a bento of mini mocks and the closing CTA. (The quote
  marquee was removed from the design after 15 Nov 2026.)
*/

// The dotted light-green "stage" the design puts mock UIs on, and the
// white card that sits on it.
const STAGE =
  "position: relative; padding: 28px; border-radius: 34px; background-color: #eaf6ec; background-image: radial-gradient(rgba(31,122,58,.16) 1px, transparent 1.2px), linear-gradient(160deg, #f1faf2 0%, #e2f2e6 100%); background-size: 16px 16px, 100% 100%";
const PANEL =
  "border-radius: 22px; background: #ffffff; border: 1px solid rgba(116,205,133,.35); box-shadow: 0 24px 60px rgba(31,122,58,.14)";
const FREE = "border: 1.5px dashed rgba(31,122,58,.35); background: #f4f8f2; color: #1f7a3a;";
const TAKEN = "background: #16241a; color: #f6f8f3;";

const TAB_MS = 6000;
const TOAST_MS = 3600;

const TABS = [
  {
    id: "mr",
    label: ["Medlemsregister", "Member register"],
    desc: [
      "Ett oppdatert register med familier, lag og samtykker – grunnlaget for alt annet.",
      "One up-to-date register with families, teams and consents – the foundation for everything else.",
    ],
    href: "Kretz Medlemsregister.dc.html",
  },
  {
    id: "ak",
    label: ["Aktiviteter og påmelding", "Activities and sign-ups"],
    desc: [
      "Spillere og foreldre svarer med ett trykk. De som glemmer det får en påminnelse.",
      "Players and parents reply with one tap. Anyone who forgets gets a reminder.",
    ],
    href: "Kretz Aktiviteter.dc.html",
  },
  {
    id: "ok",
    label: ["Økonomi og rapport", "Finance and reporting"],
    desc: [
      "Kontingent, leie og dugnad samles automatisk, og styret ser budsjett mot resultat.",
      "Fees, rentals and fundraising are collected automatically, and the board sees budget against actuals.",
    ],
    href: "Kretz Okonomi.dc.html",
  },
  {
    id: "hb",
    label: ["Hallbooking", "Hall booking"],
    desc: [
      "Ledige baner i sanntid. Medlemmene booker og betaler selv.",
      "Free courts in real time. Members book and pay themselves.",
    ],
    href: "Kretz Hallbooking.dc.html",
  },
  {
    id: "ds",
    label: ["Dokumentsenter", "Document centre"],
    desc: [
      "Vedtekter, protokoller og avtaler samlet – med tilgang per rolle.",
      "Statutes, minutes and agreements in one place – with access per role.",
    ],
    href: "Kretz Dokumentsenter.dc.html",
  },
];

const TOASTS = [
  ["👋", ["Ny innmelding", "New member"], ["Emma Hansen · J12", "Emma Hansen · G12"]],
  ["💳", ["kr 450 mottatt", "NOK 450 received"], ["Vipps · Bane B torsdag", "Vipps · Court B Thursday"]],
  ["✅", ["18 av 22 kommer", "18 of 22 coming"], ["Trening G14 i dag", "Training B14 today"]],
  ["📄", ["Protokoll lastet opp", "Minutes uploaded"], ["Styret · Møter 2026", "Board · Meetings 2026"]],
];

const NAV = [
  ["Oversikt", "Overview"],
  ["Medlemmer", "Members"],
  ["Aktiviteter", "Activities"],
  ["Økonomi", "Finance"],
  ["Booking", "Booking"],
  ["Dokumenter", "Documents"],
  ["Roller", "Roles"],
];

const STATS = [
  [["Medlemmer", "Members"], "612", ["+ 14 i november", "+ 14 in November"], "#f4f8f2"],
  [["Påmeldt denne uken", "Signed up this week"], "148", ["83 % svart", "83% replied"], "#f4f8f2"],
  [["Kontingent", "Fees"], ["92 %", "92%"], ["innbetalt", "paid"], "#eaf7ed"],
  [["Ledige halltimer", "Free hall slots"], "6", ["denne uken", "this week"], "#f4f8f2"],
];

const UPCOMING = [
  [["Trening G14", "Training B14"], ["I dag 18:00", "Today 18:00"], "#1f7a3a"],
  [["Kamp J12 mot Byåsen", "Match G12 vs Byåsen"], ["Lør 12:00", "Sat 12:00"], "#1f7a3a"],
  [["Kioskdugnad", "Kiosk shift"], ["Søn 10:00", "Sun 10:00"], "#e0a100"],
  [["Styremøte", "Board meeting"], ["Tir 19:00", "Tue 19:00"], "#16241a"],
];

// Income / cost pairs for the little bar chart.
const BARS = [
  [62, 55],
  [40, 52],
  [88, 64],
  [80, 66],
  [74, 60],
  [84, 63],
  [70, 58],
  [92, 66],
];

const ICON_PATHS = {
  members: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5M17.5 14.5A5.5 5.5 0 0 1 20.5 19" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
    </>
  ),
  hall: (
    <>
      <path d="M3 20V9l9-5 9 5v11" />
      <path d="M7 20v-6h10v6M12 14v6" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5M4 19h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
};

const MODULES = [
  ["members", "Kretz Medlemsregister.dc.html", ["Medlemsregister", "Member register"], [
    "Medlemmer, familier, lag og samtykker i ett register som alltid er oppdatert.",
    "Members, families, teams and consents in one register that is always up to date.",
  ]],
  ["calendar", "Kretz Aktiviteter.dc.html", ["Aktiviteter og påmelding", "Activities and sign-ups"], [
    "Treninger, kamper og dugnader – med svar, påminnelser og oppmøte.",
    "Training, matches and volunteer shifts – with replies, reminders and attendance.",
  ]],
  ["hall", "Kretz Hallbooking.dc.html", ["Hallbooking", "Hall booking"], [
    "Ledige baner og bord i sanntid, booket og betalt med Vipps.",
    "Free courts and tables in real time, booked and paid with Vipps.",
  ]],
  ["card", "Kretz Okonomi.dc.html", ["Kontingent og faktura", "Fees and invoicing"], [
    "Automatisk kontingent, avdrag og purringer – uten manuelle lister.",
    "Automatic fees, instalments and reminders – no manual lists.",
  ]],
  ["chart", "Kretz Okonomi.dc.html", ["Økonomi og rapport", "Finance and reporting"], [
    "Budsjett mot resultat, eksport til regnskapet og revisjonsspor.",
    "Budget against actuals, export to accounting and an audit trail.",
  ]],
  ["clock", "Kretz AR-oppgave.dc.html", ["Årlig rapportering", "Annual reporting"], [
    "Årsmøte, samordnet rapportering og momskompensasjon før fristen.",
    "Annual meeting, NIF reporting and VAT compensation before the deadline.",
  ]],
  ["folder", "Kretz Dokumentsenter.dc.html", ["Dokumentsenter", "Document centre"], [
    "Vedtekter, protokoller og avtaler i én mappestruktur.",
    "Statutes, minutes and agreements in one folder structure.",
  ]],
  ["lock", "Kretz Roller.dc.html", ["Roller og tilgang", "Roles and access"], [
    "Styret, trenere og foreldre ser akkurat det de trenger.",
    "The board, coaches and parents see exactly what they need.",
  ]],
];

const SECTION_H2 =
  "font-family: var(--font-heading); font-weight: 800; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; margin: 0";

export default function FunksjonerPage({ onOpenLogin, onOpenSignup, onOpenBooking }) {
  const { t } = useLang();
  const L = (pair) => (Array.isArray(pair) ? t(pair[0], pair[1]) : pair);

  return (
    <div className="kz-sub kz-fn">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} onOpenBooking={onOpenBooking} />
      <Hero L={L} />
      <Showcase L={L} />

      {/* MODULES */}
      <section data-rsp-pad style={{ padding: "56px 28px 40px" }}>
        <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 data-reveal style={sx(SECTION_H2 + "; text-align: center")}>
            {t("Alle modulene for klubben", "Every module for the club")}
          </h2>
          <p
            data-reveal
            style={sx("margin: 12px auto 0; font-size: 17px; line-height: 1.6; color: #4C5E50; max-width: 34em; text-align: center")}
          >
            {t(
              "Bruk det dere trenger nå, og slå på resten når klubben er klar.",
              "Use what you need now, and switch on the rest when the club is ready.",
            )}
          </p>
          <div
            data-rsp-cols="4"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, marginTop: 36 }}
          >
            {MODULES.map(([icon, href, title, desc]) => (
              <a
                key={title[0]}
                href={designHref(href)}
                className="kz-card"
                data-reveal
                style={sx(
                  "display: flex; flex-direction: column; gap: 14px; border-radius: 24px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 24px; color: #16241a",
                )}
              >
                <span
                  aria-hidden="true"
                  style={sx(
                    "flex: 0 0 auto; width: 48px; height: 48px; border-radius: 15px; background: linear-gradient(180deg, #f3faf4 0%, #e6f4e9 100%); border: 1px solid rgba(116,205,133,.35); box-shadow: 0 8px 20px rgba(31,122,58,.10); display: grid; place-items: center",
                  )}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1f7a3a"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICON_PATHS[icon]}
                  </svg>
                </span>
                <span>
                  <b style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 18px")}>{L(title)}</b>
                  <span style={sx("display: block; margin-top: 6px; font-size: 14.5px; line-height: 1.55; color: #4C5E50")}>
                    {L(desc)}
                  </span>
                </span>
                <span style={{ marginTop: "auto", fontWeight: 600, color: "#1f7a3a" }}>
                  {t("Les mer", "Read more")}{" "}
                  <span className="kz-arr" aria-hidden="true">
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Bento />

      <FeatureCta
        title={t("Prøv Kretz gratis", "Try Kretz for free")}
        text={t(
          "Alle modulene er med fra start. Vi flytter medlemmene inn for dere, og går gjennom oppsettet sammen.",
          "Every module is included from the start. We move your members in for you and go through the setup together.",
        )}
      />

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero({ L }) {
  const { t } = useLang();
  const [toast, setToast] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (!document.hidden) setToast((n) => n + 1);
    }, TOAST_MS);
    return () => clearInterval(id);
  }, []);

  const [icon, title, sub] = TOASTS[toast % TOASTS.length];
  const start = designHref("Kretz.dc.html#kom-i-gang");

  return (
    <section data-rsp-pad style={{ position: "relative", overflow: "hidden", padding: "72px 28px 40px", textAlign: "center" }}>
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1000"
        style={sx(
          "position: absolute; left: 50%; top: -380px; width: 1200px; height: 1200px; transform: translateX(-50%); pointer-events: none; max-width: none",
        )}
      >
        <circle cx="500" cy="500" r="410" fill="none" stroke="rgba(139,203,139,.14)" strokeWidth="90" />
        <circle cx="500" cy="500" r="300" fill="none" stroke="rgba(22,36,26,.1)" strokeWidth="1.5" strokeDasharray="5 9" />
      </svg>
      <div data-rsp-wide style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={sx(
            "display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px; border-radius: 999px; border: 1.5px solid #a3e2ae; font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #1f7a3a",
          )}
        >
          {t("Kretz · Alle funksjoner", "Kretz · All features")}
        </div>
        <h1
          style={sx(
            "font-family: var(--font-heading); font-weight: 800; font-size: clamp(38px, 6vw, 76px); line-height: 1; margin: 20px auto 0; max-width: 14em",
          )}
        >
          {t("Smartere klubbdrift,", "Smarter club admin,")}
          <br />
          <span style={{ color: "#1f7a3a" }}>{t("mer tid til idretten", "more time for the sport")}</span>
        </h1>
        <p style={sx("margin: 22px auto 0; font-size: 18px; line-height: 1.6; color: #4C5E50; max-width: 36em")}>
          {t(
            "Medlemmer, aktiviteter, kontingent, hallbooking, økonomi og styrearbeid – samlet i én plattform laget for norske idrettslag.",
            "Members, activities, fees, hall booking, finance and board work – together in one platform built for Norwegian sports clubs.",
          )}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 30 }}>
          <a
            href={start}
            className="kzf-arrow-btn"
            style={sx(
              "display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 15px",
            )}
          >
            {t("Kom i gang gratis", "Get started for free")}{" "}
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

        {/* Hero product mock */}
        <div style={sx(STAGE + "; margin: 56px auto 0; max-width: 1080px; text-align: left; padding: 36px")}>
          <div style={sx(PANEL + "; overflow: hidden")}>
            <div
              style={sx(
                "display: grid; grid-template-columns: 60px minmax(0, 1fr) 60px; align-items: center; gap: 10px; padding: 12px 18px; border-bottom: 1px solid rgba(116,205,133,.25)",
              )}
            >
              <span aria-hidden="true" style={{ display: "flex", gap: 6 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 9, height: 9, borderRadius: 999, background: "#c7e6cd" }} />
                ))}
              </span>
              <span
                style={sx(
                  "justify-self: center; padding: 6px 16px; border-radius: 999px; background: #eef7f0; font-size: 12.5px; color: #4C5E50",
                )}
              >
                app.kretz.no / nardo-fk
              </span>
              <span />
            </div>
            <div data-rsp="stack" style={{ display: "grid", gridTemplateColumns: "190px minmax(0, 1fr)" }}>
              <div
                data-kz-hidetab
                style={sx(
                  "padding: 18px 12px; border-right: 1px solid rgba(116,205,133,.25); display: grid; gap: 2px; align-content: start",
                )}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 10px 14px" }}>
                  <img src={markAlpha} alt="" style={{ width: 22, height: 22 }} />
                  <b style={{ fontFamily: "var(--font-heading)", fontSize: 16 }}>Kretz</b>
                </div>
                {NAV.map((item, i) => (
                  <div
                    key={item[0]}
                    style={sx(
                      "display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; font-size: 13.5px; " +
                        (i === 0 ? "background: #e3f3e7; color: #1f7a3a; font-weight: 700" : "color: #16241a"),
                    )}
                  >
                    <span
                      style={{ width: 8, height: 8, borderRadius: 3, background: i === 0 ? "#1f7a3a" : "#a3d9ae" }}
                    />
                    {L(item)}
                  </div>
                ))}
              </div>
              <div style={{ padding: "22px 24px 26px", minWidth: 0 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "6px 14px" }}>
                  <span style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 22px")}>
                    {t("Hei, Nardo FK 👋", "Hi, Nardo FK 👋")}
                  </span>
                  <span style={{ fontSize: 13, color: "#4C5E50" }}>{t("Her er uken din", "Here is your week")}</span>
                </div>
                <div
                  data-rsp-cols="4"
                  style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10, marginTop: 16 }}
                >
                  {STATS.map(([label, value, note, bg]) => (
                    <div key={label[0]} style={{ borderRadius: 16, padding: "14px 16px", background: bg, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: "#4C5E50" }}>{L(label)}</div>
                      <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin-top: 4px")}>
                        {L(value)}
                      </div>
                      <div style={{ fontSize: 12, color: "#1f7a3a", marginTop: 2 }}>{L(note)}</div>
                    </div>
                  ))}
                </div>
                <div
                  data-rsp="stack"
                  style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 16, marginTop: 16 }}
                >
                  <div style={{ borderRadius: 16, border: "1px solid rgba(116,205,133,.3)", padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                      <b style={{ flex: 1, fontFamily: "var(--font-heading)", fontSize: 14.5 }}>
                        {t("Inntekter og kostnader", "Income and costs")}
                      </b>
                      <Legend color="#74cd85" label={t("Inn", "In")} />
                      <Legend color="#e3bcb0" label={t("Ut", "Out")} />
                    </div>
                    <BarChart />
                  </div>
                  <div style={{ borderRadius: 16, border: "1px solid rgba(116,205,133,.3)", padding: "14px 16px" }}>
                    <b style={{ fontFamily: "var(--font-heading)", fontSize: 14.5 }}>{t("Kommende", "Upcoming")}</b>
                    {UPCOMING.map(([what, when, dot]) => (
                      <div
                        key={what[0]}
                        style={sx(
                          "display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13px",
                        )}
                      >
                        <span style={{ width: 8, height: 8, borderRadius: 999, background: dot }} />
                        <span style={sx("flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis")}>
                          {L(what)}
                        </span>
                        <span style={{ color: "#4C5E50", whiteSpace: "nowrap" }}>{L(when)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-kz-hidetab style={{ position: "absolute", right: -14, top: 90, width: 270 }} aria-live="polite">
            <div
              key={toast}
              className="kzf-toast"
              style={sx(
                "display: flex; align-items: center; gap: 10px; background: #ffffff; border: 1px solid rgba(116,205,133,.4); box-shadow: 0 14px 34px rgba(31,122,58,.16); font-size: 14px; font-weight: 600; color: #16241a; border-radius: 18px; padding: 12px 16px",
              )}
            >
              <span
                aria-hidden="true"
                style={sx(
                  "flex: 0 0 auto; width: 30px; height: 30px; border-radius: 10px; background: #e3f3e7; display: grid; place-items: center; font-size: 15px",
                )}
              >
                {icon}
              </span>
              <span style={{ minWidth: 0 }}>
                <b style={{ display: "block", fontSize: 13.5 }}>{L(title)}</b>
                <span style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#4C5E50" }}>{L(sub)}</span>
              </span>
            </div>
          </div>
          <div
            className="kzf-float"
            data-kz-hidetab
            style={sx(
              "--rot: -3deg; position: absolute; left: -18px; bottom: 40px; display: flex; align-items: center; gap: 10px; padding: 11px 18px; border-radius: 999px; background: #ffffff; border: 1px solid rgba(116,205,133,.4); box-shadow: 0 14px 34px rgba(31,122,58,.16); font-size: 14px; font-weight: 600; color: #16241a",
            )}
          >
            <Check />
            {t("Protokoll signert 2 av 2", "Minutes signed 2 of 2")}
          </div>
        </div>
      </div>
    </section>
  );
}

function Legend({ color, label }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#4C5E50" }}>
      <span style={{ width: 9, height: 9, borderRadius: 3, background: color }} />
      {label}
    </span>
  );
}

function BarChart({ marginTop = 14 }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, marginTop }}>
      {BARS.map(([inn, ut], i) => (
        <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3, height: "100%" }}>
          <span
            className="kzf-bar"
            style={{ flex: 1, height: `${inn}%`, borderRadius: "5px 5px 2px 2px", background: "#74cd85", animationDelay: `${i * 70}ms` }}
          />
          <span
            className="kzf-bar"
            style={{
              flex: 1,
              height: `${ut}%`,
              borderRadius: "5px 5px 2px 2px",
              background: "#e3bcb0",
              animationDelay: `${i * 70 + 35}ms`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Check({ ink = "#ffffff", bg = "#1f7a3a" }) {
  return (
    <span
      aria-hidden="true"
      style={{ flex: "0 0 auto", width: 20, height: 20, borderRadius: 999, background: bg, display: "grid", placeItems: "center" }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24">
        <path
          d="M5 12.5l4.5 4.5L19 7.5"
          fill="none"
          stroke={ink}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* -------------------------------------------------------------- showcase */

function Showcase({ L }) {
  const { t } = useLang();
  const [tab, setTab] = useState(0);
  // Bumped on every change so the progress bar restarts its animation.
  const [tick, setTick] = useState(0);
  const timer = useRef(null);

  const arm = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      if (document.hidden) return;
      setTab((n) => (n + 1) % TABS.length);
      setTick((n) => n + 1);
    }, TAB_MS);
  }, []);

  useEffect(() => {
    arm();
    return () => clearInterval(timer.current);
  }, [arm]);

  const pick = (i) => {
    arm();
    setTab(i);
    setTick((n) => n + 1);
  };

  const cur = TABS[tab].id;

  return (
    <section data-rsp-pad style={{ padding: "72px 28px 40px" }}>
      <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div data-reveal style={{ textAlign: "center" }}>
          <span
            style={sx(
              "display: inline-flex; align-items: center; padding: 10px 22px; border-radius: 999px; background: rgba(116,205,133,.18); border: 1.5px solid rgba(116,205,133,.55); color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 15px; letter-spacing: .02em",
            )}
          >
            {t("Én plattform", "One platform")}
          </span>
          <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: clamp(28px, 3.8vw, 48px); line-height: 1.05; margin: 18px 0 0")}>
            {t("Mye mer enn et medlemsregister", "Much more than a member register")}
          </h2>
          <p style={sx("margin: 14px auto 0; font-size: 17px; line-height: 1.6; color: #4C5E50; max-width: 38em")}>
            {t(
              "Kretz tar over det frivillige gjør i regneark, chatgrupper og permer – fra innmelding og påmelding til kontingent, booking og årsmøte.",
              "Kretz takes over what volunteers do in spreadsheets, group chats and binders – from joining and sign-ups to fees, booking and the annual meeting.",
            )}
          </p>
        </div>
        <div
          data-kz-tabs
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, .9fr) minmax(0, 1.1fr)",
            gap: 32,
            alignItems: "center",
            marginTop: 44,
          }}
        >
          <div role="tablist" aria-label={t("Funksjoner", "Features")} style={{ display: "grid", gap: 10 }}>
            {TABS.map((item, i) => {
              const on = i === tab;
              return (
                <div
                  key={item.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={on ? "true" : "false"}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => {
                    if (e.target !== e.currentTarget) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      pick(i);
                    }
                  }}
                  className="kzf-tab"
                  style={sx(
                    "display: block; width: 100%; box-sizing: border-box; text-align: left; cursor: pointer; padding: 18px 20px; border-radius: 22px; font-family: var(--font-body); font-size: 15px; " +
                      (on
                        ? "background: #ffffff; border: 1px solid rgba(116,205,133,.5); box-shadow: 0 18px 40px rgba(31,122,58,.10);"
                        : "background: transparent; border: 1px solid transparent;"),
                  )}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span
                      style={sx(
                        "flex: 0 0 auto; width: 32px; height: 32px; border-radius: 999px; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 14px; " +
                          (on ? "background: #1f7a3a; color: #ffffff;" : "background: #e3f3e7; color: #1f7a3a;"),
                      )}
                    >
                      {i + 1}
                    </span>
                    <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 17px; color: #16241a")}>
                      {L(item.label)}
                    </span>
                  </span>
                  {on && (
                    <>
                      <span style={sx("display: block; margin: 8px 0 0 46px; font-size: 14.5px; line-height: 1.55; color: #4C5E50")}>
                        {L(item.desc)}
                      </span>
                      <a
                        href={designHref(item.href)}
                        style={sx("display: inline-block; margin: 8px 0 0 46px; font-size: 14px; font-weight: 600; color: #1f7a3a")}
                      >
                        {t("Les mer →", "Read more →")}
                      </a>
                      <span
                        aria-hidden="true"
                        style={sx(
                          "display: block; height: 3px; margin: 14px 0 0 46px; border-radius: 999px; background: #e3eee5; overflow: hidden",
                        )}
                      >
                        <span
                          key={tick}
                          className="kzf-tabfill"
                          style={{ display: "block", height: "100%", borderRadius: 999, background: "#1f7a3a" }}
                        />
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div style={sx(STAGE + "; padding: 32px")}>
            <div key={cur} className="kzf-panel-in" style={sx(PANEL + "; padding: 22px")}>
              {cur === "mr" && <PanelMembers L={L} />}
              {cur === "ak" && <PanelActivities />}
              {cur === "ok" && <PanelFinance />}
              {cur === "hb" && <PanelHall L={L} />}
              {cur === "ds" && <PanelDocs L={L} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelHead({ title, meta }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
      <b style={{ flex: 1, fontFamily: "var(--font-heading)", fontSize: 17 }}>{title}</b>
      <span style={{ fontSize: 13, color: "#4C5E50" }}>{meta}</span>
    </div>
  );
}

const STATUS = {
  unpaid: [["Ubetalt", "Unpaid"], "background: #fff6d6; color: #6b5300;"],
  consent: [["Samtykke mangler", "Consent missing"], "background: #e8f0fa; color: #24538a;"],
  paid: [["Betalt", "Paid"], "background: #eaf7ed; color: #1f7a3a;"],
};

const MEMBERS = [
  ["NB", "Noah Berg", ["Forelder: Ola Berg", "Parent: Ola Berg"], "unpaid"],
  ["JN", "Jonas Nilsen", ["Søsken: Sara (J12)", "Sibling: Sara (G12)"], "consent"],
  ["AD", "Aksel Dahl", ["Forelder: Nina Dahl", "Parent: Nina Dahl"], "paid"],
  ["ML", "Magnus Lie", ["Forelder: Ida Lie", "Parent: Ida Lie"], "paid"],
];

function PanelMembers({ L }) {
  const { t } = useLang();
  return (
    <>
      <PanelHead title={t("Medlemmer · G14", "Members · B14")} meta={t("24 spillere", "24 players")} />
      {MEMBERS.map(([ini, name, rel, status]) => (
        <div
          key={ini}
          style={sx(
            "display: grid; grid-template-columns: 34px minmax(0,1fr) auto; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(22,36,26,.07)",
          )}
        >
          <span
            style={sx(
              "width: 34px; height: 34px; border-radius: 999px; background: #16241a; color: #f6f8f3; display: grid; place-items: center; font-size: 11px; font-weight: 700",
            )}
          >
            {ini}
          </span>
          <span style={{ minWidth: 0 }}>
            <b style={{ display: "block", fontSize: 14 }}>{name}</b>
            <span style={{ fontSize: 12, color: "#4C5E50" }}>{L(rel)}</span>
          </span>
          <span
            style={sx(
              "padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; " + STATUS[status][1],
            )}
          >
            {L(STATUS[status][0])}
          </span>
        </div>
      ))}
    </>
  );
}

function PanelActivities() {
  const { t } = useLang();
  return (
    <>
      <PanelHead title={t("Trening G14 · i dag 18:00", "Training B14 · today 18:00")} meta="Nardohallen" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <span
          style={sx(
            "padding: 12px; border-radius: 999px; background: #1f7a3a; color: #fff; text-align: center; font-family: var(--font-heading); font-weight: 800; font-size: 14px",
          )}
        >
          {t("Kommer", "Coming")}
        </span>
        <span
          style={sx(
            "padding: 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); text-align: center; font-family: var(--font-heading); font-weight: 800; font-size: 14px",
          )}
        >
          {t("Kan ikke", "Can't make it")}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontSize: 13 }}>
        <b>{t("18 av 22 kommer", "18 of 22 coming")}</b>
        <span style={{ color: "#4C5E50" }}>{t("2 ikke svart", "2 not replied")}</span>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: "#eef2ec", marginTop: 8, overflow: "hidden" }}>
        <div
          className="kzf-tabfill"
          style={{ height: "100%", borderRadius: 999, background: "#74cd85", maxWidth: "82%", animationDuration: "1.2s" }}
        />
      </div>
      <div style={{ marginTop: 16, display: "grid", gap: 8, fontSize: 13.5 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ flex: 1 }}>{t("Kamp mot Byåsen", "Match vs Byåsen")}</span>
          <span style={{ color: "#4C5E50" }}>{t("Lør 12:00", "Sat 12:00")}</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ flex: 1 }}>{t("Kioskdugnad · 2 ledige vakter", "Kiosk shift · 2 open slots")}</span>
          <span style={{ color: "#4C5E50" }}>{t("Søn 10:00", "Sun 10:00")}</span>
        </div>
      </div>
    </>
  );
}

function PanelFinance() {
  const { t } = useLang();
  const tiles = [
    [t("Inntekter", "Income"), t("kr 386 000", "NOK 386,000"), "#f4f8f2"],
    [t("Kostnader", "Costs"), t("kr 298 000", "NOK 298,000"), "#f4f8f2"],
    [t("Resultat", "Result"), t("+ 88 000", "+ 88,000"), "#eaf7ed"],
  ];
  return (
    <>
      <PanelHead title={t("Økonomi · november", "Finance · November")} meta="Nardo FK" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8 }}>
        {tiles.map(([label, value, bg]) => (
          <div key={label} style={{ borderRadius: 14, background: bg, padding: 12 }}>
            <div style={{ fontSize: 12, color: "#4C5E50" }}>{label}</div>
            <b style={{ fontFamily: "var(--font-heading)", fontSize: 16 }}>{value}</b>
          </div>
        ))}
      </div>
      <BarChart marginTop={16} />
    </>
  );
}

const HALL_ROWS = [
  ["16:00", ["G10", "B10"], ["J10", "G10"]],
  ["17:00", ["G12", "B12"], null],
  ["18:00", ["G14", "B14"], ["J12", "G12"]],
  ["19:00", null, "chosen"],
  ["20:00", ["Senior", "Senior"], null],
];

function PanelHall({ L }) {
  const { t } = useLang();
  const cell = (v) => {
    const base = "padding: 9px 6px; border-radius: 9px; text-align: center; font-size: 12.5px; font-weight: 600; ";
    if (v === "chosen") return <span style={sx(base + "background: #74cd85; color: #16241a;")}>{t("Valgt ✓", "Selected ✓")}</span>;
    if (!v) return <span style={sx(base + FREE)}>{t("Ledig", "Free")}</span>;
    return <span style={sx(base + TAKEN)}>{L(v)}</span>;
  };
  return (
    <>
      <PanelHead title={t("Nardohallen · onsdag", "Nardohallen · Wednesday")} meta={t("kr 450 per time", "NOK 450 per hour")} />
      {HALL_ROWS.map(([time, a, b]) => (
        <div
          key={time}
          style={{ display: "grid", gridTemplateColumns: "48px 1fr 1fr", gap: 8, alignItems: "center", marginTop: 8 }}
        >
          <span style={{ fontSize: 12.5, color: "#4C5E50" }}>{time}</span>
          {cell(a)}
          {cell(b)}
        </div>
      ))}
      <div
        style={sx(
          "display: flex; align-items: center; gap: 10px; margin-top: 14px; padding: 12px 14px; border-radius: 14px; background: #f4f8f2; font-size: 13px",
        )}
      >
        <b style={{ flex: 1 }}>{t("Bane B · 19:00–20:00", "Court B · 19:00–20:00")}</b>
        <span style={sx("padding: 8px 14px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-weight: 700")}>
          {t("Betal med Vipps", "Pay with Vipps")}
        </span>
      </div>
    </>
  );
}

const DOCS = [
  ["PDF", "#d9485f", ["Protokoll oktober", "October minutes"], ["PDF · 240 kB · signert", "PDF · 240 kB · signed"]],
  ["XLS", "#1f7a3a", ["Budsjett 2027", "Budget 2027"], ["XLSX · 88 kB · utkast", "XLSX · 88 kB · draft"]],
  ["DOC", "#16241a", ["Sakliste november", "November agenda"], ["DOCX · 64 kB", "DOCX · 64 kB"]],
];

function PanelDocs({ L }) {
  const { t } = useLang();
  return (
    <>
      <PanelHead title={t("Styret · Møter 2026", "Board · Meetings 2026")} meta={t("8 filer", "8 files")} />
      {DOCS.map(([ext, bg, name, meta]) => (
        <div
          key={ext}
          style={sx("display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(22,36,26,.07)")}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: bg,
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 10,
              fontWeight: 800,
            }}
          >
            {ext}
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <b style={{ display: "block", fontSize: 14 }}>{L(name)}</b>
            <span style={{ fontSize: 12, color: "#4C5E50" }}>{L(meta)}</span>
          </span>
        </div>
      ))}
      <div
        style={sx(
          "display: inline-flex; align-items: center; gap: 8px; margin-top: 14px; padding: 8px 14px; border-radius: 999px; background: #eaf7ed; color: #1f7a3a; font-size: 13px; font-weight: 700",
        )}
      >
        {t("🔒 Kun styret har tilgang", "🔒 Board only")}
      </div>
    </>
  );
}

/* ----------------------------------------------------------------- bento */

const BENTO_CARD =
  "display: flex; flex-direction: column; border-radius: 28px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); overflow: hidden; color: #16241a";
const BENTO_STAGE = STAGE + "; border-radius: 0; padding: 22px; flex: 1";
const MINI = PANEL + "; padding: 16px";
const ROW = "display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13px";

function BentoCard({ href, span = 1, title, text, children }) {
  return (
    <a href={designHref(href)} className="kz-card" data-reveal style={sx(`grid-column: span ${span}; ` + BENTO_CARD)}>
      <div style={sx(BENTO_STAGE)}>
        <div style={sx(MINI)}>{children}</div>
      </div>
      <div style={{ padding: "20px 24px 22px" }}>
        <b style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 18px")}>{title}</b>
        <span style={sx("display: block; margin-top: 6px; font-size: 14.5px; line-height: 1.55; color: #4C5E50")}>{text}</span>
      </div>
    </a>
  );
}

function Toggle({ on }) {
  return (
    <span style={{ position: "relative", width: 34, height: 20, borderRadius: 999, background: on ? "#1f7a3a" : "#d5ddd2" }}>
      <span
        style={{ position: "absolute", top: 3, left: on ? 17 : 3, width: 14, height: 14, borderRadius: 999, background: "#fff" }}
      />
    </span>
  );
}

// The design keeps the bento at three columns on every width; it also gets
// data-rsp-cols="3" here so it falls to two and then one column on phones.
function Bento() {
  const { t } = useLang();
  const shiftBase = "padding: 10px 4px; border-radius: 10px; text-align: center; font-size: 12px; font-weight: 700; ";
  return (
    <section data-rsp-pad style={{ padding: "56px 28px 40px" }}>
      <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div data-reveal style={{ textAlign: "center" }}>
          <h2 style={sx(SECTION_H2)}>{t("Utforsk modulene", "Explore the modules")}</h2>
          <p style={sx("margin: 12px auto 0; font-size: 17px; line-height: 1.6; color: #4C5E50; max-width: 36em")}>
            {t(
              "Alt styret trenger samlet i én plattform – fra møter og årshjul til dokumenter og signering.",
              "Everything the board needs in one platform – from meetings and the annual calendar to documents and signing.",
            )}
          </p>
        </div>
        <div data-kz-bento data-rsp-cols="3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, marginTop: 36 }}>
          <BentoCard
            href="Kretz Medlemsregister.dc.html"
            span={2}
            title={t("Hele klubben på én skjerm", "The whole club on one screen")}
            text={t(
              "Lag, medlemmer, betalinger og oppmøte – oppdatert hele tiden.",
              "Teams, members, payments and attendance – always up to date.",
            )}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: "#16241a", display: "grid", placeItems: "center" }}>
                <img src={markAlpha} alt="" style={{ width: 22, height: 22 }} />
              </span>
              <span>
                <b style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: 15 }}>
                  {t("Nardo FK · sesong 2026", "Nardo FK · season 2026")}
                </b>
                <span style={{ fontSize: 12.5, color: "#4C5E50" }}>
                  {t("18 lag · 612 medlemmer · 54 trenere", "18 teams · 612 members · 54 coaches")}
                </span>
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8, marginTop: 14 }}>
              {[
                [t("Betalt", "Paid"), t("92 %", "92%"), "#f4f8f2"],
                [t("Oppmøte", "Attendance"), t("81 %", "81%"), "#f4f8f2"],
                [t("Nye", "New"), "+ 14", "#eaf7ed"],
              ].map(([l, v, bg]) => (
                <div key={l} style={{ borderRadius: 12, background: bg, padding: 10 }}>
                  <div style={{ fontSize: 11.5, color: "#4C5E50" }}>{l}</div>
                  <b style={{ fontFamily: "var(--font-heading)" }}>{v}</b>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            href="Kretz Okonomi.dc.html"
            title={t("Kontingent som kommer inn", "Fees that come in")}
            text={t("Automatiske fakturaer, Vipps og purringer.", "Automatic invoices, Vipps and reminders.")}
          >
            <b style={{ fontFamily: "var(--font-heading)", fontSize: 15 }}>{t("Kontingent høst 2026", "Fees autumn 2026")}</b>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13 }}>
              <span>{t("563 av 612 betalt", "563 of 612 paid")}</span>
              <b style={{ color: "#1f7a3a" }}>{t("92 %", "92%")}</b>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: "#eef2ec", marginTop: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "92%", borderRadius: 999, background: "#74cd85" }} />
            </div>
            <div
              style={sx(
                "display: inline-flex; margin-top: 12px; padding: 6px 12px; border-radius: 999px; background: #fff6d6; color: #6b5300; font-size: 12.5px; font-weight: 700",
              )}
            >
              {t("Purring sendt til 49", "Reminder sent to 49")}
            </div>
          </BentoCard>

          <BentoCard
            href="Kretz AR-oppgave.dc.html"
            title={t("Årshjulet", "The annual calendar")}
            text={t(
              "Fristene til NIF, Brønnøysund og årsmøtet – med påminnelser.",
              "Deadlines for NIF, the Brønnøysund Register and the annual meeting – with reminders.",
            )}
          >
            <b style={{ fontFamily: "var(--font-heading)", fontSize: 15 }}>{t("Årshjul 2027", "Annual calendar 2027")}</b>
            {[
              [true, t("Årsmøte", "Annual meeting"), t("31. mars", "31 March")],
              [true, t("Samordnet rapportering", "NIF reporting"), t("30. april", "30 April")],
              [false, t("Momskompensasjon", "VAT compensation"), t("Sommer", "Summer")],
            ].map(([done, what, when]) => (
              <div key={what} style={sx(ROW)}>
                {done ? (
                  <Check />
                ) : (
                  <span style={{ width: 20, height: 20, borderRadius: 999, background: "#d5ddd2", flex: "0 0 auto" }} />
                )}
                <span style={{ flex: 1 }}>{what}</span>
                <span style={{ color: "#4C5E50" }}>{when}</span>
              </div>
            ))}
          </BentoCard>

          <BentoCard
            href="Kretz Roller.dc.html"
            title={t("Roller og tilgang", "Roles and access")}
            text={t("Treneren ser sitt lag. Kasserer ser økonomien.", "The coach sees their team. The treasurer sees the finances.")}
          >
            <b style={{ fontFamily: "var(--font-heading)", fontSize: 15 }}>{t("Roller · Trener G14", "Roles · Coach B14")}</b>
            {[
              [t("Se eget lag", "See own team"), true],
              [t("Registrere oppmøte", "Record attendance"), true],
              [t("Se økonomi", "See finances"), false],
            ].map(([label, on]) => (
              <div key={label} style={sx(ROW)}>
                <span style={{ flex: 1 }}>{label}</span>
                <Toggle on={on} />
              </div>
            ))}
          </BentoCard>

          <BentoCard
            href="Kretz Aktiviteter.dc.html"
            title={t("Dugnad uten papirlister", "Volunteering without paper lists")}
            text={t(
              "Foreldrene tar vakter selv, og alle får like mange.",
              "Parents pick their own shifts, and everyone gets the same number.",
            )}
          >
            <b style={{ fontFamily: "var(--font-heading)", fontSize: 15 }}>{t("Kioskdugnad søndag", "Kiosk shifts Sunday")}</b>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 6, marginTop: 12 }}>
              {[
                ["10–12", true],
                ["12–14", true],
                ["14–16", false],
                ["16–18", false],
              ].map(([slot, taken]) => (
                <span key={slot} style={sx(shiftBase + (taken ? TAKEN : FREE))}>
                  {slot}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: "#4C5E50" }}>
              {t("2 vakter ledige · foreldre tar dem selv", "2 shifts open · parents take them themselves")}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
