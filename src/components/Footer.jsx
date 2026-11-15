import Hv from "./Hv";
import SiteLink from "./SiteLink";
import markAlpha from "../assets/design/kretz-mark-alpha.png";
import { useLang } from "../lib/langContext";
import { sx } from "../lib/sx";
import "../styles/landing.css";

/*
  The site footer, used on the landing page and on every info page.

    <Footer onLanding? />

  `onLanding` is optional. Left out, the current hash route decides (see
  SiteLink): landing-section links ("#funksjoner") scroll in place on the
  landing page and become "#/?til=<id>" everywhere else.
*/

const S = {
  footer: "padding: 120px 28px 48px",
  wrap: "max-width: 1200px; margin: 0 auto",
  top: "display: flex; flex-wrap: wrap; gap: 48px 64px; align-items: flex-start; justify-content: space-between",
  brand: "display: grid; gap: 16px; justify-items: start",
  logo: "display: flex; align-items: center; gap: 12px; font-family: var(--font-heading); font-weight: 800; color: #16241A; font-size: 30px; letter-spacing: -.03em",
  mail: "display: inline-flex; align-items: center; gap: 10px; height: 46px; padding: 0 18px; border-radius: 14px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 6px 18px rgba(22,36,26,.06); color: #16241a; font-size: 15px; font-weight: 500; white-space: nowrap; transition: border-color .25s, transform .25s",
  mailHover: "border-color: #74cd85; transform: translateY(-2px)",
  social: "display: grid; place-items: center; width: 28px; height: 28px; color: #16241A; transition: transform .2s, opacity .2s",
  socialHover: "transform: translateY(-2px); opacity: .75",
  cols: "display: flex; flex-wrap: wrap; gap: 36px 56px; flex: 1 1 auto; justify-content: flex-end",
  colTitle: "font-family: var(--font-heading); font-weight: 800; font-size: 17px; color: #16241A; margin-bottom: 18px",
  link: "display: block; padding: 7px 0; font-size: 16px; color: #4C5E50; white-space: nowrap",
  linkHover: "color: #16241A",
  store: "display: flex; align-items: center; gap: 12px; min-width: 168px; white-space: nowrap; box-sizing: border-box; padding: 9px 14px; border-radius: 10px; background: #000000; border: 1px solid #a6a6a6; color: #ffffff",
  storeHover: "border-color: #8BCB8B",
  bottom: "margin-top: 48px; padding-top: 14px; border-top: 1px solid #D6E2D2; font-size: 14px; color: #4C5E50; display: flex; align-items: center; justify-content: space-between; gap: 20px 32px; flex-wrap: wrap",
  legal: "color: #4C5E50; text-decoration: none",
  legalHover: "color: #16241A; text-decoration: underline",
};

const CONTACT_EMAIL = "kontakt@kretz.no";
const LINKEDIN = "https://www.linkedin.com/company/kretz-no/posts/?viewAsMember=true";

// Pages the design links to that do not exist yet: keep the link, go nowhere.
const noop = (e) => e.preventDefault();

export default function Footer({ onLanding }) {
  const { t } = useLang();

  const columns = [
    {
      title: t("Funksjoner", "Features"),
      links: [
        [t("Medlemmer", "Members"), "Kretz Medlemsregister.dc.html"],
        [t("Kontingent", "Fees"), "#funksjoner"],
        [t("Aktiviteter", "Activities"), "Kretz Aktiviteter.dc.html"],
        [t("Økonomi", "Finance"), "Kretz Okonomi.dc.html"],
        [t("Årlig rapportering", "Annual reporting"), "Kretz AR-oppgave.dc.html"],
        [t("Dokumentsenter", "Document centre"), "Kretz Dokumentsenter.dc.html"],
      ],
    },
    {
      title: t("For din idrettskrets", "For your sports district"),
      links: [
        [t("Oversikt over klubber", "Overview of clubs"), "#om-oss"],
        [t("Felles booking", "Shared booking"), "Kretz Hallbooking.dc.html"],
        [t("Rapportering", "Reporting"), "#funksjoner"],
        [t("Bli pilotklubb", "Become a pilot club"), "#kom-i-gang"],
      ],
    },
    {
      title: t("Ressurser", "Resources"),
      links: [
        [t("Slik fungerer det", "How it works"), "#slik"],
        [t("Appen", "The app"), "#app"],
        [t("Kontakt", "Contact"), "#kom-i-gang"],
        [t("Om Kretz", "About Kretz"), "#om-oss"],
      ],
    },
    {
      title: t("Aktuelt", "Latest"),
      links: [
        [t("Nyheter", "News"), "#om-oss"],
        [t("Veikart", "Roadmap"), "#funksjoner"],
      ],
    },
  ];

  const legal = [
    [t("Personvernerklæring", "Privacy policy"), null],
    [t("Informasjonskapsler", "Cookies"), null],
    [t("Brukervilkår", "Terms of use"), "Kretz Vilkar.dc.html"],
    [t("Databehandleravtale", "Data processing agreement"), null],
  ];

  return (
    <footer data-kz-footer className="kz-footer" style={sx(S.footer)}>
      <div data-kz-fwrap style={sx(S.wrap)}>
        <div data-kz-ftop style={sx(S.top)}>
          <div style={sx(S.brand)}>
            <SiteLink to="#topp" onLanding={onLanding} style={S.logo}>
              <img src={markAlpha} alt="" style={{ width: 42, height: 42 }} />
              Kretz
            </SiteLink>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
              <Hv as="a" href={`mailto:${CONTACT_EMAIL}`} style={S.mail} hover={S.mailHover}>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
                {CONTACT_EMAIL}
              </Hv>
              <Hv
                as="a"
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Kretz på LinkedIn", "Kretz on LinkedIn")}
                title="LinkedIn"
                style={S.social}
                hover={S.socialHover}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
                  <path
                    d="M7 10v7M7 7v.01M11 17v-7M11 13.5c0-2 1.2-3.5 3-3.5s2.5 1.3 2.5 3V17"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Hv>
              <Hv as="a" href="#" onClick={noop} aria-label="Instagram" title="Instagram" style={S.social} hover={S.socialHover}>
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
                </svg>
              </Hv>
            </div>
          </div>

          <div data-kz-flinks style={sx(S.cols)}>
            {columns.map((col) => (
              <div key={col.title}>
                <div style={sx(S.colTitle)}>{col.title}</div>
                {col.links.map(([text, to]) => (
                  <SiteLink key={text} to={to} onLanding={onLanding} style={S.link} hover={S.linkHover}>
                    {text}
                  </SiteLink>
                ))}
              </div>
            ))}
            <div>
              <div style={sx(S.colTitle)}>{t("Last ned Kretz", "Download Kretz")}</div>
              <div style={{ display: "grid", gap: 14 }}>
                <SiteLink to="#app" onLanding={onLanding} style={S.store} hover={S.storeHover}>
                  <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true">
                    <path d="M1 1.2 15 14 1 26.8z" fill="#00c3ff" />
                    <path d="M1 1.2 18.6 10.4 15 14z" fill="#18e087" />
                    <path d="M1 26.8 18.6 17.6 15 14z" fill="#f2425a" />
                    <path d="M18.6 10.4 24.4 13.4a.7.7 0 0 1 0 1.2L18.6 17.6 15 14z" fill="#ffd400" />
                  </svg>
                  <span style={{ display: "grid", lineHeight: 1, gap: 3 }}>
                    <span style={{ fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase" }}>Get it on</span>
                    <span style={sx("font-family: var(--font-heading); font-weight: 700; font-size: 20px; letter-spacing: -.01em")}>
                      Google Play
                    </span>
                  </span>
                </SiteLink>
                <SiteLink to="#app" onLanding={onLanding} style={S.store} hover={S.storeHover}>
                  <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden="true">
                    <path
                      fill="#fff"
                      d="M19.6 14.8c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-3.9-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.3 1 3.9.9c1.6 0 2.7-1.5 3.7-3 1.1-1.7 1.6-3.3 1.6-3.4-.1 0-3.1-1.2-3.1-4.8zM16.6 5.9c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.4 2.3-1.3 3.7 1.4.1 2.7-.7 3.6-1.7z"
                    />
                  </svg>
                  <span style={{ display: "grid", lineHeight: 1, gap: 3 }}>
                    <span style={{ fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase" }}>Download on the</span>
                    <span style={sx("font-family: var(--font-heading); font-weight: 700; font-size: 20px; letter-spacing: -.01em")}>
                      App Store
                    </span>
                  </span>
                </SiteLink>
              </div>
            </div>
          </div>
        </div>

        <div style={sx(S.bottom)}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px 18px" }}>
            <span>{t("Støttet av:", "Supported by:")}</span>
            <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; color: #16241A; font-style: italic")}>
              ANEO Bidraget
            </span>
            <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; color: #16241A")}>Spark*</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px 20px" }}>
            {legal.map(([text, to]) =>
              to ? (
                <SiteLink key={text} to={to} style={S.legal} hover={S.legalHover}>
                  {text}
                </SiteLink>
              ) : (
                <Hv key={text} as="a" href="#" onClick={noop} style={S.legal} hover={S.legalHover}>
                  {text}
                </Hv>
              ),
            )}
            <span>© 2026 Kretz · Trondheim</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
