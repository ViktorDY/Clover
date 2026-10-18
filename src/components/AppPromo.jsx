import { useEffect, useState } from "react";
import KretzMark from "./KretzMark";
import { useLang } from "../lib/langContext";
import fieldPhoto from "../assets/design/slot-app-hero-photo.webp";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const CalendarGlyph = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const PeopleGlyph = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const CoinsGlyph = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

function CheckDot() {
  return (
    <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#5FB36A] text-white">
      <svg width="14" height="14" viewBox="0 0 24 24" {...stroke} strokeWidth={3}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

// "Coming soon" dialog for the store buttons — the app is not published yet.
function SoonDialog({ onClose }) {
  const { t } = useLang();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/45 p-5 backdrop-blur-[6px]"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("Kommer snart", "Coming soon")}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[400px] rounded-[30px] border border-ink/10 bg-white px-[30px] pb-[30px] pt-9 text-center shadow-[0_34px_90px_rgba(22,36,26,0.3)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Lukk", "Close")}
          className="absolute right-4 top-4 h-[34px] w-[34px] cursor-pointer rounded-full border border-ink/14 bg-white text-[18px] text-ink"
        >
          ×
        </button>
        <span className="inline-block rounded-full bg-[#FFD23F] px-4 py-[7px] font-heading text-[13px] font-extrabold uppercase tracking-[0.08em] text-ink">
          {t("Kommer snart", "Coming soon")}
        </span>
        <h3 className="mb-2 mt-[18px] font-heading text-[28px] leading-[1.12] font-extrabold tracking-[-0.03em]! text-ink">
          {t("Appen er på vei", "The app is on its way")}
        </h3>
        <p className="mb-[22px] mt-0 text-[16px] leading-[1.55] text-[#4C5E50]">
          {t(
            "Kretz-appen er ikke i App Store eller Google Play ennå. Kom tilbake snart.",
            "The Kretz app is not in the App Store or Google Play yet. Check back soon.",
          )}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-full border-0 bg-ink px-7 py-3 font-heading text-[15px] font-extrabold text-white"
        >
          {t("Skjønner", "Got it")}
        </button>
      </div>
    </div>
  );
}

export default function AppPromo() {
  const { t } = useLang();
  const [soon, setSoon] = useState(false);

  const openSoon = (e) => {
    e.preventDefault();
    setSoon(true);
  };

  const storeBtn =
    "inline-flex items-center gap-2.5 rounded-[14px] bg-[#0B0F0C] py-2.5 pl-3.5 pr-5 text-white no-underline transition-[translate] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:text-white";

  const signups = [
    { title: t("Trening – G12", "Training – G12"), when: t("I dag 18:00", "Today 18:00"), done: true },
    { title: t("Kamp – J10", "Match – J10"), when: t("Ons 18:00", "Wed 18:00"), done: false },
  ];

  const tiles = [
    { label: t("Meldinger", "Messages"), icon: <PeopleGlyph /> },
    { label: t("Kontingent", "Fees"), icon: <CoinsGlyph /> },
    { label: t("Dugnader", "Volunteer days"), icon: <CalendarGlyph size={22} /> },
    { label: t("Lag og medlemmer", "Teams and members"), icon: <PeopleGlyph /> },
  ];

  const perks = [
    t("Alltid oppdatert", "Always up to date"),
    t("Enklere hverdag", "Simpler everyday"),
    t("Mer tid til idretten", "More time for the sport"),
  ];

  return (
    <section id="app" className="kz-pad kz-pad-m relative pt-[120px]">
      <div
        data-reveal
        className="relative isolate mx-auto max-w-[1200px] overflow-hidden rounded-[40px] border border-[#DCE8D8] bg-[linear-gradient(135deg,#F3F8F0,#E9F3E6)] text-ink shadow-[0_30px_80px_rgba(22,36,26,0.08)] max-[900px]:rounded-[34px] max-[900px]:p-8 min-[1680px]:max-w-[1440px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[38%] top-[30%] -z-10 h-[180px] w-[180px] -rotate-45 rounded-[50%_50%_50%_0] border-[3px] border-[rgba(139,203,139,0.35)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-40px] top-[18%] -z-10 h-80 w-80 rounded-full border-r-[3px] border-[rgba(139,203,139,0.45)]"
        />

        <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] items-stretch gap-6 max-[760px]:grid-cols-[minmax(0,1fr)]">
          <div className="flex flex-col justify-center py-[clamp(32px,5vw,56px)] pl-[clamp(24px,4vw,48px)] pr-0">
            <div className="flex items-center gap-2.5">
              <span className="rounded-full border-2 border-[#8BCB8B] bg-[#E3F3DF] px-[18px] py-2 font-heading text-[14px] font-extrabold uppercase tracking-[0.14em] text-[#3E8A48]">
                {t("Appen", "The app")}
              </span>
              <span className="rounded-full bg-[#FFD23F] px-4 py-2 font-heading text-[14px] font-extrabold uppercase tracking-[0.08em] text-ink">
                {t("Kommer snart", "Coming soon")}
              </span>
              <svg width="40" height="30" viewBox="0 0 40 30" fill="none" stroke="#3E8A48" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 24 L12 16" />
                <path d="M14 26 L18 19" />
                <path d="M22 28 L24 21" />
              </svg>
            </div>
            <h2 className="mb-0 mt-[22px] font-heading text-[clamp(36px,4.8vw,62px)] font-extrabold leading-none tracking-[-0.035em]! [text-wrap:pretty]">
              <span>{t("Klubben i lomma til", "The club in the pocket of")}</span>
              <br />
              <span className="relative inline-block text-[#5FB36A]">
                <span>{t("hver forelder", "every parent")}</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-6px] left-0 right-0 h-1.5 rounded-full bg-[#FFD23F]"
                />
              </span>
            </h2>
            <p className="mb-0 mt-[26px] max-w-[28em] text-[18px] leading-[1.6] text-[#4C5E50]">
              {t(
                "Påmelding, meldinger, kontingent og dugnadsvakter – samme plattform, laget for sidelinja.",
                "Sign-ups, messages, fees and dugnad shifts — the same platform, made for the sideline.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a href="#app" onClick={openSoon} className={storeBtn}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.4 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.7zM14.2 5.8c.6-.8 1.1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1.1.1 2.1-.5 2.8-1.3z" />
                </svg>
                <span className="grid leading-[1.05]">
                  <span className="text-[11px]">{t("Last ned i", "Download in")}</span>
                  <span className="font-heading text-[18px] font-extrabold">App Store</span>
                </span>
              </a>
              <a href="#app" onClick={openSoon} className={storeBtn}>
                <svg width="24" height="26" viewBox="0 0 24 26" aria-hidden="true">
                  <path d="M2 2.5v21l11-10.5z" fill="#34A853" />
                  <path d="M2 2.5l11 10.5 3.6-3.5L4.4 1.7C3.4 1.2 2.4 1.5 2 2.5z" fill="#4285F4" />
                  <path d="M13 13 2 23.5c.4 1 1.4 1.3 2.4.8l12.2-7.8z" fill="#EA4335" />
                  <path d="M16.6 9.5 13 13l3.6 3.5 4.6-2.6c1.1-.6 1.1-1.6 0-2.2z" fill="#FBBC04" />
                </svg>
                <span className="grid leading-[1.05]">
                  <span className="text-[11px] uppercase tracking-[0.06em]">{t("Tilgjengelig på", "Available on")}</span>
                  <span className="font-heading text-[18px] font-extrabold">Google Play</span>
                </span>
              </a>
            </div>
          </div>

          <div className="kz-app-col relative min-h-[600px]">
            <div className="kz-app-photo absolute inset-0 overflow-hidden rounded-tl-[36px]">
              <img
                src={fieldPhoto}
                alt={t("Barn som spiller fotball på treningsfeltet", "Kids playing football on the training field")}
                className="block h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(243,248,240,0.85),rgba(243,248,240,0)_20%)]"
              />
            </div>

            <div
              className="kz-app-phone kz-float absolute bottom-[-44px] left-[6%] w-[clamp(215px,38%,240px)] rounded-[36px] bg-[#0B0F0C] p-2 shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
              style={{ "--rot": "-3deg", transform: "rotate(-3deg)" }}
            >
              <div className="relative overflow-hidden rounded-[30px] bg-paper px-3 pb-3 pt-4">
                <div className="mx-auto mb-3 mt-[-6px] h-5 w-[70px] rounded-full bg-[#0B0F0C]" />
                <div className="flex items-center gap-2">
                  <KretzMark size={22} />
                  <span className="font-heading text-[13px] font-extrabold">Kretz</span>
                  <span className="ml-auto text-ink">
                    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
                      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                    </svg>
                  </span>
                </div>
                <div className="mt-3 font-heading text-[16px] font-extrabold">{t("Påmelding", "Sign-up")}</div>
                {signups.map((s, i) => (
                  <div
                    key={s.title}
                    className={`flex items-center gap-[7px] rounded-xl border border-[#E3ECE0] bg-white p-2 ${i === 0 ? "mt-2" : "mt-1.5"}`}
                  >
                    <CalendarGlyph />
                    <span className="min-w-0 flex-1">
                      <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-[10.5px] font-bold">{s.title}</span>
                      <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-[9px] text-[#4C5E50]">{s.when}</span>
                    </span>
                    <span
                      className={`shrink-0 whitespace-nowrap rounded-full px-[7px] py-1 text-[9px] font-bold ${
                        s.done ? "bg-[#D9F0D6] text-[#1F6B2E]" : "bg-[#EEF2EC] text-[#4C5E50]"
                      }`}
                    >
                      {s.done ? t("Påmeldt", "Signed up") : t("Påmeld", "Sign up")}
                    </span>
                  </div>
                ))}
                <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                  {tiles.map((tile) => (
                    <div
                      key={tile.label}
                      className="grid justify-items-center gap-1.5 rounded-[14px] border border-[#E3ECE0] bg-white px-2 py-3 text-ink"
                    >
                      {tile.icon}
                      <span className="text-center text-[10.5px] font-semibold">{tile.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-around border-t border-[#E3ECE0] pt-2.5 text-[9px] text-[#4C5E50]">
                  <span className="grid justify-items-center gap-0.5 font-bold text-[#1F6B2E]">
                    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
                      <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z" />
                    </svg>
                    {t("Hjem", "Home")}
                  </span>
                  <span className="grid justify-items-center gap-0.5">
                    <CalendarGlyph />
                    {t("Aktiviteter", "Activities")}
                  </span>
                  <span className="grid justify-items-center gap-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {t("Meldinger", "Messages")}
                  </span>
                  <span className="grid justify-items-center gap-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
                      <circle cx="5" cy="12" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="19" cy="12" r="1.5" />
                    </svg>
                    {t("Mer", "More")}
                  </span>
                </div>
              </div>
            </div>

            <div className="kz-hand absolute right-9 top-[22px] -rotate-6 text-center text-[24px] leading-[1.1] text-[#1F6B2E] max-[980px]:hidden">
              <svg width="44" height="30" viewBox="0 0 44 30" fill="none" stroke="#1F6B2E" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="mx-auto mb-0.5 block">
                <path d="M8 24 L14 14" />
                <path d="M20 22 L22 12" />
                <path d="M32 24 L28 14" />
              </svg>
              {t("Enklere", "Simpler")}
              <br />
              {t("for foreldre", "for parents")}
              <br />
              {t("og trenere", "and coaches")}
              <svg width="40" height="34" viewBox="0 0 40 34" fill="none" stroke="#1F6B2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mx-auto mt-1 block">
                <path d="M30 4 C 26 14, 20 22, 10 28" />
                <path d="M10 28 l8 -1 M10 28 l1 -8" />
              </svg>
            </div>

            <div
              className="kz-app-card kz-float-late absolute right-[18px] top-[48%] grid w-[clamp(170px,30%,205px)] gap-3 rounded-[22px] bg-white px-[18px] py-4 shadow-[0_20px_50px_rgba(22,36,26,0.18)]"
              style={{ "--rot": "2deg", transform: "rotate(2deg)" }}
            >
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2.5 whitespace-nowrap text-[13px] font-bold">
                  <CheckDot />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {soon && <SoonDialog onClose={() => setSoon(false)} />}
    </section>
  );
}
