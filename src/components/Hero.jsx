import { useLang } from "../lib/langContext";

export default function Hero({ onOpenBooking }) {
  const { t } = useLang();

  return (
    <section
      id="topp"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#dceade,#e8f1e6_62%,#f6f8f3)] px-5 py-24 sm:px-7"
    >
      {/* Decorative backdrop: drifting glows, a panning dot field, a slow ring. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-10%] top-[-20%] -z-10 h-[820px]"
      >
        <div className="kz-drift absolute left-[8%] top-[6%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.5),rgba(116,205,133,0)_70%)] blur-[34px]" />
        <div className="kz-dots kz-pan absolute inset-0" />
        <div className="kz-orbit absolute left-1/2 top-[4%] -ml-[260px] h-[520px] w-[520px] rounded-full border-[1.5px] border-moss/20" />
        <div className="kz-drift2 absolute right-[4%] top-[20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,201,74,0.4),rgba(255,201,74,0)_70%)] blur-[40px]" />
      </div>

      <div data-reveal className="mx-auto max-w-[900px] text-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-grass/40 bg-grass/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-moss-deep">
          <span className="kz-pulse h-[7px] w-[7px] rounded-full bg-grass" />
          {t("For klubber og lag", "For clubs and teams")}
        </div>

        <h1 className="m-0 mt-6 text-pretty font-heading text-[clamp(42px,6vw,82px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          {t("Alt klubben trenger.", "Everything the club needs.")}
          <br />
          <span className="text-grass">{t("Ett sted.", "One place.")}</span>
        </h1>

        <p className="mx-auto mt-5 max-w-[34em] text-lg leading-[1.65] text-ink/70">
          {t(
            "Barn, ungdom, foreldre og styret i samme app: treninger, påmelding, kontingent og hallbooking. Mindre papir, mer spilletid.",
            "Kids, teens, parents and the board in one app: training, sign-ups, fees and hall booking. Less paperwork, more playing time.",
          )}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <a
            href="#kom-i-gang"
            className="whitespace-nowrap rounded-full bg-grass px-8 py-4 font-heading text-base font-extrabold text-ink shadow-[0_16px_44px_rgba(116,205,133,0.32)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_22px_56px_rgba(116,205,133,0.42)]"
          >
            {t("Book demo", "Book a demo")}
          </a>
          <button
            type="button"
            onClick={onOpenBooking}
            className="cursor-pointer whitespace-nowrap rounded-full border border-ink/25 bg-transparent px-8 py-4 font-heading text-base font-extrabold text-ink transition-colors duration-300 hover:border-ink/40 hover:bg-ink/8"
          >
            {t("Book halltid", "Book a hall")}
          </button>
        </div>
      </div>
    </section>
  );
}
