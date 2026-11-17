import { useEffect, useRef, useState } from "react";
import Hv from "./Hv";
import SiteLink from "./SiteLink";
import markAlpha from "../assets/design/kretz-mark-alpha.png";
import { useLang } from "../lib/langContext";
import { sx } from "../lib/sx";
import "../styles/landing.css";

/*
  The site header, used on the landing page and on every info page.

    <Navbar onOpenLogin onOpenSignup onOpenBooking onLanding? />

  `onLanding` is optional. Left out, the current hash route decides (see
  SiteLink): on the landing page the logo and section links scroll in place,
  elsewhere they go to "#/" or "#/?til=<section>".

  Above 1000px: links with a "Funksjoner" hover/focus dropdown. At 1000px and
  below the links fold into a <details> hamburger menu (.kz-mnav). Inline
  styles are the design's own style strings; the breakpoints live in
  styles/landing.css.
*/

const FEATURES = [
  {
    to: "Kretz Medlemsregister.dc.html",
    no: ["Medlemsregister", "Familie, lag og samtykker"],
    en: ["Member register", "Families, teams and consents"],
  },
  {
    // The design keeps fees on the landing page's feature section.
    to: "Kretz.dc.html#funksjoner",
    no: ["Kontingent og faktura", "Avdrag, purring og Vipps"],
    en: ["Fees and invoicing", "Instalments, reminders and Vipps"],
  },
  {
    to: "Kretz Aktiviteter.dc.html",
    no: ["Aktiviteter og påmelding", "Kalender, oppmøte og dugnad"],
    en: ["Activities and sign-ups", "Calendar, attendance and dugnad"],
    // The design's mobile menu words a few English labels differently.
    mEn: "Activities and sign-up",
  },
  {
    to: "Kretz Hallbooking.dc.html",
    no: ["Hallbooking", "Baner og bord, betalt i samme flyt"],
    en: ["Hall booking", "Courts and tables, paid in one flow"],
  },
  {
    to: "Kretz Okonomi.dc.html",
    no: ["Økonomi og rapport", "Budsjett, regnskapseksport og støtte"],
    en: ["Finance and reporting", "Budget, accounting export and grants"],
    mEn: "Finance and reports",
  },
  {
    to: "Kretz Roller.dc.html",
    no: ["Roller og tilgang", "Alle ser det de trenger"],
    en: ["Roles and access", "Everyone sees what they need"],
  },
  {
    to: "Kretz AR-oppgave.dc.html",
    no: ["Årlig rapportering", "Årsmøte, samordnet rapportering og momskompensasjon"],
    en: ["Annual reporting", "Annual meeting, NIF reporting and VAT compensation"],
  },
  {
    to: "Kretz Dokumentsenter.dc.html",
    no: ["Dokumentsenter", "Alle klubbens papirer, med tilgang per rolle"],
    en: ["Document centre", "All club papers, with access per role"],
  },
];

const S = {
  header:
    "position: sticky; top: 0; z-index: 30; background: transparent; border-bottom: 1px solid transparent; transition: background .4s, border-color .4s, backdrop-filter .4s",
  nav: "max-width: 1200px; margin: 0 auto; padding: 15px 28px; display: flex; align-items: center; gap: 28px",
  logo: "display: flex; align-items: center; gap: 11px; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 22px; letter-spacing: -.025em",
  logoImg: "width: 30px; height: 30px; filter: drop-shadow(0 0 14px rgba(116,205,133,.45))",
  links: "display: flex; align-items: center; gap: 24px; font-size: 15px; font-weight: 500",
  fddBtn:
    "display: inline-flex; align-items: center; gap: 6px; border: 0; background: transparent; padding: 0; margin: 0; cursor: pointer; font: inherit; font-family: inherit; font-size: inherit; font-weight: inherit; line-height: inherit; letter-spacing: inherit; color: rgba(22,36,26,.72); white-space: nowrap",
  fddMenu: "position: absolute; top: 100%; left: -22px; z-index: 40; width: 560px; padding-top: 16px",
  fddPanel:
    "border-radius: 24px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 24px 60px rgba(22,36,26,.16); padding: 14px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px",
  fddItem: "display: block; padding: 12px 14px; border-radius: 16px; color: #16241a",
  fddTitle: "display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px",
  fddSub: "display: block; margin-top: 3px; font-size: 13px; color: #4C5E50",
  fddAll: "grid-column: 1 / -1; padding: 10px 14px 4px; font-size: 13.5px; font-weight: 600; color: #1f7a3a",
  link: "color: rgba(22,36,26,.72); white-space: nowrap",
  linkBtn:
    "border: 0; background: transparent; padding: 0; cursor: pointer; font-family: var(--font-body); font-size: inherit; font-weight: 500; color: rgba(22,36,26,.72); white-space: nowrap; line-height: normal",
  linkHover: "color:#16241a",
  lang: "padding: 9px 15px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: transparent; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12px; letter-spacing: .08em; cursor: pointer; transition: background .3s; line-height: normal",
  langHover: "background: rgba(22,36,26,.1)",
  login:
    "padding: 12px 22px; border-radius: 999px; border: 0; background: #74cd85; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; white-space: nowrap; cursor: pointer; line-height: normal; box-shadow: 0 10px 28px rgba(116,205,133,.6), 0 2px 10px rgba(116,205,133,.5), 0 0 0 6px rgba(116,205,133,.14); transition: background .3s, transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s",
  loginHover:
    "background: #a3e2ae; transform: translateY(-2px); box-shadow: 0 16px 38px rgba(116,205,133,.7), 0 4px 14px rgba(116,205,133,.55), 0 0 0 8px rgba(116,205,133,.18)",
  signup:
    "padding: 12px 22px; border-radius: 999px; border: 1px solid #16241a; background: transparent; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; white-space: nowrap; cursor: pointer; line-height: normal; transition: background .3s, color .3s, transform .35s cubic-bezier(.2,.7,.2,1)",
  signupHover: "background: #16241a; color: #f6f8f3; transform: translateY(-2px)",
};

export default function Navbar({ onOpenLogin, onOpenSignup, onOpenBooking, onLanding }) {
  const { t, isEn, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const mnavRef = useRef(null);

  // The bar is transparent over the hero and frosts once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu once something in it is chosen.
  const closeMnav = (e) => {
    if (e.target.closest?.("a, button") && mnavRef.current) mnavRef.current.open = false;
  };
  // Let the hover/focus dropdown close after an in-page pick.
  const blur = (e) => e.currentTarget.blur();

  const label = (f) => (isEn ? f.en : f.no);
  const langLabel = isEn ? "NO" : "EN";

  return (
    <header data-kz-header className={`kz-nav-header ${scrolled ? "kz-scrolled" : ""}`} style={sx(S.header)}>
      <nav data-kz-nav style={sx(S.nav)}>
        <SiteLink to="#topp" onLanding={onLanding} style={S.logo} data-kz-logo>
          <img src={markAlpha} alt="Kretz" style={sx(S.logoImg)} />
          Kretz
        </SiteLink>

        <div data-kz-navlinks style={sx(S.links)}>
          <div className="kz-fdd" style={{ position: "relative" }}>
            <Hv as="button" type="button" className="kz-fdd-btn" aria-haspopup="true" style={S.fddBtn} hover={S.linkHover}>
              <span>{t("Funksjoner", "Features")}</span>
              <span
                className="kz-fdd-chev"
                aria-hidden="true"
                style={{ display: "inline-block", fontSize: 10, transition: "transform .3s" }}
              >
                ▾
              </span>
            </Hv>
            <div className="kz-fdd-menu" role="menu" style={sx(S.fddMenu)}>
              <div style={sx(S.fddPanel)}>
                {FEATURES.map((f) => (
                  <SiteLink
                    key={f.to}
                    to={f.to}
                    onLanding={onLanding}
                    role="menuitem"
                    className="kz-fdd-item"
                    style={S.fddItem}
                    onClick={blur}
                  >
                    <span style={sx(S.fddTitle)}>{label(f)[0]}</span>
                    <span style={sx(S.fddSub)}>{label(f)[1]}</span>
                  </SiteLink>
                ))}
                <SiteLink to="Kretz Funksjoner.dc.html" role="menuitem" style={S.fddAll}>
                  {t("Se alle funksjoner →", "See all features →")}
                </SiteLink>
              </div>
            </div>
          </div>
          <SiteLink to="Kretz Nytt.dc.html" style={S.link} hover={S.linkHover}>
            {t("Siste nytt", "Latest news")}
          </SiteLink>
          <Hv as="button" type="button" onClick={onOpenBooking} style={S.linkBtn} hover={S.linkHover}>
            Booking
          </Hv>
          <SiteLink to="Kretz For hvem.dc.html" style={S.link} hover={S.linkHover}>
            {t("For hvem", "Who it's for")}
          </SiteLink>
        </div>

        <div data-kz-spacer style={{ flex: 1 }} />

        <Hv as="button" type="button" onClick={toggleLang} data-kz-lang style={S.lang} hover={S.langHover}>
          {langLabel}
        </Hv>
        <Hv as="button" type="button" onClick={onOpenLogin} style={S.login} hover={S.loginHover}>
          {t("Logg inn", "Sign in")}
        </Hv>
        <Hv as="button" type="button" onClick={onOpenSignup} data-kz-mnav-hide style={S.signup} hover={S.signupHover}>
          {t("Registrer deg", "Sign up")}
        </Hv>

        <details className="kz-mnav" ref={mnavRef}>
          <summary aria-label={t("Meny", "Menu")}>
            <svg className="kz-mnav-b" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <svg className="kz-mnav-x" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="kz-mnav-panel" onClick={closeMnav}>
            <div className="kz-mnav-h">{t("Funksjoner", "Features")}</div>
            <div className="kz-mnav-grid">
              {FEATURES.map((f) => (
                <SiteLink key={f.to} to={f.to} onLanding={onLanding}>
                  {isEn ? f.mEn || f.en[0] : f.no[0]}
                </SiteLink>
              ))}
            </div>
            <SiteLink className="kz-mnav-all" to="Kretz Funksjoner.dc.html">
              {t("Se alle funksjoner →", "See all features →")}
            </SiteLink>
            <div className="kz-mnav-sep" />
            <SiteLink className="kz-mnav-l" to="Kretz Nytt.dc.html">
              {t("Siste nytt", "Latest news")}
            </SiteLink>
            <button type="button" className="kz-mnav-l" onClick={onOpenBooking}>
              Booking
            </button>
            <SiteLink className="kz-mnav-l" to="Kretz For hvem.dc.html">
              {t("For hvem", "Who it is for")}
            </SiteLink>
            <div className="kz-mnav-sep" />
            <div className="kz-mnav-row">
              <button type="button" className="kz-mnav-lang" onClick={toggleLang}>
                {langLabel}
              </button>
              <button type="button" className="kz-mnav-in" onClick={onOpenLogin}>
                {t("Logg inn", "Sign in")}
              </button>
              <button type="button" className="kz-mnav-up" onClick={onOpenSignup}>
                {t("Registrer deg", "Sign up")}
              </button>
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
