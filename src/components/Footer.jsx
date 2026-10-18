import KretzMark from "./KretzMark";
import SectionLink from "./SectionLink";
import { useLang } from "../lib/langContext";

const socialClass =
  "grid h-7 w-7 place-items-center text-ink transition-[translate,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-75";
const linkClass =
  "block whitespace-nowrap py-[7px] text-[16px] text-[#4C5E50] transition-colors hover:text-ink";
const storeClass =
  "box-border flex w-[168px] items-center gap-3 rounded-[10px] border border-[#a6a6a6] bg-black px-3.5 py-[9px] text-white transition-colors hover:border-[#8BCB8B] hover:text-white";

// Social profiles that do not exist yet: keep the icons, go nowhere.
const noop = (e) => e.preventDefault();

export default function Footer() {
  const { t } = useLang();

  const columns = [
    {
      title: t("Funksjoner", "Features"),
      links: [
        [t("Medlemmer", "Members"), "funksjoner"],
        [t("Kontingent", "Fees"), "funksjoner"],
        [t("Aktiviteter", "Activities"), "funksjoner"],
        [t("Økonomi", "Finance"), "funksjoner"],
      ],
    },
    {
      title: t("For din idrettskrets", "For your sports district"),
      links: [
        [t("Oversikt over klubber", "Overview of clubs"), "om-oss"],
        [t("Felles booking", "Shared booking"), "funksjoner"],
        [t("Rapportering", "Reporting"), "funksjoner"],
        [t("Bli pilotklubb", "Become a pilot club"), "kom-i-gang"],
      ],
    },
    {
      title: t("Ressurser", "Resources"),
      links: [
        [t("Slik fungerer det", "How it works"), "slik"],
        [t("Appen", "The app"), "app"],
        [t("Kontakt", "Contact"), "kom-i-gang"],
        [t("Om Kretz", "About Kretz"), "om-oss"],
      ],
    },
    {
      title: t("Aktuelt", "Latest"),
      links: [
        [t("Nyheter", "News"), "om-oss"],
        [t("Veikart", "Roadmap"), "funksjoner"],
      ],
    },
  ];

  return (
    <footer className="kz-pad kz-pad-m pb-12 pt-[120px]">
      <div className="mx-auto max-w-[1200px] min-[1680px]:max-w-[1440px]">
        <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-12">
          <div className="grid justify-items-start gap-4">
            <SectionLink
              to="topp"
              className="flex items-center gap-3 font-heading text-[30px] font-extrabold tracking-[-0.03em] text-ink"
            >
              <KretzMark size={42} />
              Kretz
            </SectionLink>
            <div className="flex items-center gap-2.5">
              <a href="#" onClick={noop} aria-label="Facebook" title="Facebook" className={socialClass}>
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="12" fill="#16241A" />
                  <path
                    fill="#F4F7F1"
                    d="M16.7 15.4l.5-3.4h-3.3V9.8c0-.9.5-1.8 1.9-1.8h1.5V5.1s-1.3-.2-2.6-.2c-2.7 0-4.4 1.6-4.4 4.6V12H7.3v3.4h3v8.5a12 12 0 0 0 3.6 0v-8.5z"
                  />
                </svg>
              </a>
              <a href="#" onClick={noop} aria-label="Instagram" title="Instagram" className={socialClass}>
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#16241A" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="6" />
                  <circle cx="12" cy="12" r="4.6" />
                  <circle cx="17.6" cy="6.4" r="1.2" fill="#16241A" stroke="none" />
                </svg>
              </a>
              <a href="#" onClick={noop} aria-label="TikTok" title="TikTok" className={socialClass}>
                <svg width="20" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#16241A"
                    d="M16.6 2h-3.3v13.2a2.8 2.8 0 1 1-2.8-2.8c.3 0 .6 0 .8.1V9.1a6.1 6.1 0 1 0 5.3 6.1V8.6a7.5 7.5 0 0 0 4.4 1.4V6.7A4.4 4.4 0 0 1 16.6 2z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/kretz-no/posts/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Kretz på LinkedIn", "Kretz on LinkedIn")}
                title={t("Kretz på LinkedIn", "Kretz on LinkedIn")}
                className={socialClass}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="24" height="24" rx="3" fill="#16241A" />
                  <path
                    fill="#F4F7F1"
                    d="M18.5 18.5h-2.7v-4.1c0-1-.02-2.2-1.4-2.2-1.4 0-1.6 1.1-1.6 2.2v4.1h-2.7V9.8h2.6V11h.04c.4-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1zM6.7 8.6a1.6 1.6 0 1 1 0-3.1 1.6 1.6 0 0 1 0 3.1zM8.1 18.5H5.3V9.8h2.8z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-auto flex-wrap justify-end gap-x-14 gap-y-9">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="mb-[18px] font-heading text-[17px] font-extrabold text-ink">{col.title}</div>
                {col.links.map(([label, to]) => (
                  <SectionLink key={label} to={to} className={linkClass}>
                    {label}
                  </SectionLink>
                ))}
              </div>
            ))}
            <div>
              <div className="mb-[18px] font-heading text-[17px] font-extrabold text-ink">
                {t("Last ned Kretz", "Download Kretz")}
              </div>
              <div className="grid gap-3.5">
                <SectionLink to="app" className={storeClass}>
                  <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true">
                    <path d="M1 1.2 15 14 1 26.8z" fill="#00c3ff" />
                    <path d="M1 1.2 18.6 10.4 15 14z" fill="#18e087" />
                    <path d="M1 26.8 18.6 17.6 15 14z" fill="#f2425a" />
                    <path d="M18.6 10.4 24.4 13.4a.7.7 0 0 1 0 1.2L18.6 17.6 15 14z" fill="#ffd400" />
                  </svg>
                  <span className="grid gap-[3px] leading-none">
                    <span className="text-[10px] uppercase tracking-[0.06em]">Get it on</span>
                    <span className="font-heading text-[20px] font-bold tracking-[-0.01em]">Google Play</span>
                  </span>
                </SectionLink>
                <SectionLink to="app" className={storeClass}>
                  <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden="true">
                    <path
                      fill="#fff"
                      d="M19.6 14.8c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-3.9-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.3 1 3.9.9c1.6 0 2.7-1.5 3.7-3 1.1-1.7 1.6-3.3 1.6-3.4-.1 0-3.1-1.2-3.1-4.8zM16.6 5.9c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.4 2.3-1.3 3.7 1.4.1 2.7-.7 3.6-1.7z"
                    />
                  </svg>
                  <span className="grid gap-[3px] leading-none">
                    <span className="text-[10px] uppercase tracking-[0.06em]">Download on the</span>
                    <span className="font-heading text-[20px] font-bold tracking-[-0.01em]">App Store</span>
                  </span>
                </SectionLink>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-[#D6E2D2] pt-3.5 text-[14px] text-[#4C5E50]">
          <div className="flex flex-wrap items-center gap-x-[18px] gap-y-1.5">
            <span>{t("Støttet av:", "Supported by:")}</span>
            <span className="font-heading text-[16px] font-extrabold italic text-ink">ANEO Bidraget</span>
            <span className="font-heading text-[16px] font-extrabold text-ink">Spark*</span>
          </div>
          <div>© 2026 Kretz · Trondheim</div>
        </div>
      </div>
    </footer>
  );
}
