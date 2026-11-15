import SiteLink from "./SiteLink";
import { useLang } from "../lib/langContext";
import adminShot from "../assets/design/admin-shot-dashboard.png";
import appHomeShot from "../assets/design/app-shot-home.png";

/*
  "Én plattform for en enklere klubbhverdag": a short pitch beside a screenshot of
  the admin dashboard, with the member app tilted over its corner.
*/
export default function Platform() {
  const { t } = useLang();

  return (
    <section
      id="plattform"
      aria-label={t("Én plattform for en enklere klubbhverdag", "One platform for an easier club life")}
      className="kz-pad relative isolate overflow-hidden bg-[linear-gradient(180deg,#f6f8f3_0%,#e4efe2_100%)] pb-[88px] pt-[72px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-260px] left-[-200px] -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.42),rgba(116,205,133,0)_70%)] blur-[40px]"
      />
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] items-center gap-12 max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:gap-7">
        <div data-reveal>
          <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#4C5E50]">
            {t("Alt klubben trenger – på ett sted", "Everything the club needs – in one place")}
          </div>
          <h2 className="mb-0 mt-3.5 font-heading text-[clamp(34px,4.4vw,56px)] font-extrabold leading-[1.02] tracking-[-0.03em]! text-ink [text-wrap:pretty]">
            {t("Én plattform for en enklere klubbhverdag", "One platform for an easier club life")}
          </h2>
          <p className="mb-0 mt-[18px] max-w-[30em] text-[17px] leading-[1.65] text-[#4C5E50]">
            {t(
              "Kretz samler medlemmene, økonomien, aktivitetene og kommunikasjonen i én brukervennlig plattform – utviklet for norske idrettslag.",
              "Kretz brings members, finances, activities and communication together in one user-friendly platform – built for Norwegian sports clubs.",
            )}
          </p>
          <SiteLink
            to="Kretz Funksjoner.dc.html"
            className="kz-arrow-btn mt-[30px] inline-flex items-center gap-2.5 rounded-full bg-[#8BCB8B] px-[26px] py-[15px] font-heading text-[15px] font-extrabold text-ink hover:-translate-y-0.5 hover:bg-grass-soft"
          >
            {t("Utforsk funksjonene", "Explore the features")}{" "}
            <span className="kz-arr" aria-hidden="true">
              →
            </span>
          </SiteLink>
        </div>

        <div data-reveal className="relative grid min-h-[520px] items-center pl-16">
          {/* Admin dashboard screenshot; above 900px it is 142% wide and bleeds off the right edge. */}
          <div className="kz-plat-shot relative overflow-hidden rounded-[22px] border border-[#D6E2D2] bg-white shadow-[0_30px_70px_rgba(22,36,26,0.16)]">
            <img
              src={adminShot}
              alt={t(
                "Kretz for administratorer: dashbord med nøkkeltall, planlegger og neste viktige oppgave",
                "Kretz for administrators: dashboard with key figures, planner and the next important task",
              )}
              className="block h-auto w-full"
            />
          </div>

          {/* Member app, tilted over the corner */}
          <div className="kz-plat-phone absolute bottom-[-40px] left-[-28px] w-[210px] -rotate-6 rounded-[30px] bg-ink p-2.5 shadow-[0_28px_60px_rgba(22,36,26,0.32)]">
            <img
              src={appHomeShot}
              alt={t("Kretz-appen: Hei, Kari – ukens aktiviteter", "The Kretz app: Hi, Kari – this week's activities")}
              className="block h-auto w-full rounded-[22px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
