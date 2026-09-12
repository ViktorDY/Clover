import { useLang } from "../lib/langContext";

export default function AppPromo() {
  const { t } = useLang();

  return (
    <section id="app" className="bg-paper-2 px-5 pb-24 sm:px-7">
      <div
        data-reveal
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#d9f2e0,#a3e2ae)] p-8 sm:rounded-slab sm:p-12"
      >
        <div
          aria-hidden="true"
          className="kz-drift2 pointer-events-none absolute bottom-[-60%] left-[40%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.32),rgba(116,205,133,0)_68%)] blur-[30px]"
        />

        <div className="relative max-w-[46em]">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-moss">
            {t("Appen", "The app")}
          </div>
          <h2 className="my-3.5 font-heading text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-[-0.03em]">
            {t("Klubben i lomma til hver forelder", "The club in the pocket of every parent")}
          </h2>
          <p className="mb-7 mt-0 max-w-[30em] text-base leading-[1.7] text-ink/70">
            {t(
              "Påmelding, meldinger, kontingent og dugnadsvakter — samme plattform, laget for sidelinja.",
              "Sign-ups, messages, fees and dugnad shifts — the same platform, made for the sideline.",
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#kom-i-gang"
              className="flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 font-heading text-[15px] font-extrabold text-ink transition-transform duration-300 hover:-translate-y-[3px]"
            >
              App Store
            </a>
            <a
              href="#kom-i-gang"
              className="flex items-center gap-2.5 rounded-full border border-ink/28 px-6 py-3.5 font-heading text-[15px] font-extrabold text-ink transition-colors duration-300 hover:bg-ink/10"
            >
              Google Play
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
