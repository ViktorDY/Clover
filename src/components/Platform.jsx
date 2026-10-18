import KretzMark from "./KretzMark";
import SectionLink from "./SectionLink";
import { useLang } from "../lib/langContext";

/*
  "Én plattform for en enklere klubbhverdag": a short pitch beside a mock of
  the admin dashboard, with the member app tilted over its corner.
*/
export default function Platform() {
  const { t } = useLang();

  const menu = [
    t("Medlemmer", "Members"),
    t("Økonomi", "Finance"),
    t("Aktiviteter", "Activities"),
    "Booking",
    t("Kommunikasjon", "Communication"),
    t("Sponsorer", "Sponsors"),
    t("Rapporter", "Reports"),
    t("Innstillinger", "Settings"),
  ];

  const kpis = [
    { label: t("Inntekter", "Income"), value: "425 000 kr", delta: "↑ 12 %" },
    { label: t("Kostnader", "Expenses"), value: "312 000 kr", delta: "↑ 8 %" },
    { label: t("Medlemmer", "Members"), value: "248", delta: "↑ 6 %" },
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", t("Mai", "May"), "Jun"];

  const upcoming = [
    { title: t("Trening – G2012", "Training – G2012"), when: t("I dag, 18:00 – 19:30", "Today, 18:00 – 19:30") },
    { title: t("Kamp – J2010", "Match – J2010"), when: t("Ons, 18:00 – 20:00", "Wed, 18:00 – 20:00") },
    { title: t("Turnering – Senior", "Tournament – Senior"), when: t("Lør, 10:00 – 16:00", "Sat, 10:00 – 16:00") },
  ];

  const quick = [
    t("Send melding", "Send message"),
    t("Registrer betaling", "Register payment"),
    t("Legg til medlem", "Add member"),
    t("Planlegg aktivitet", "Plan activity"),
  ];

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
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-10 max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:gap-7">
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
          <SectionLink
            to="funksjoner"
            className="kz-arrow-btn mt-[30px] inline-flex items-center gap-2.5 rounded-full bg-[#8BCB8B] px-[26px] py-[15px] font-heading text-[15px] font-extrabold text-ink hover:-translate-y-0.5 hover:bg-grass-soft"
          >
            {t("Utforsk funksjonene", "Explore the features")}{" "}
            <span className="kz-arr" aria-hidden="true">
              →
            </span>
          </SectionLink>
        </div>

        <div data-reveal className="relative min-h-[440px]">
          {/* Admin dashboard */}
          <div className="relative grid grid-cols-[124px_minmax(0,1fr)] overflow-hidden rounded-[22px] border border-[#D6E2D2] bg-white shadow-[0_30px_70px_rgba(22,36,26,0.16)]">
            <div className="border-r border-[#E3ECE0] bg-[#F4F7F1] px-3.5 py-4">
              <div className="flex items-center gap-2 font-heading text-[14px] font-extrabold text-ink">
                <KretzMark size={18} />
                Kretz
              </div>
              <div className="mt-4 grid gap-1 text-[11.5px] text-[#4C5E50]">
                <span className="rounded-[10px] bg-ink px-2.5 py-[7px] font-bold text-white">
                  {t("Oversikt", "Overview")}
                </span>
                {menu.map((item) => (
                  <span key={item} className="px-2.5 py-[7px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="min-w-0 px-[18px] pb-[18px] pt-4">
              <div className="flex items-center gap-2.5">
                <div className="min-w-0 flex-1">
                  <div className="whitespace-nowrap font-heading text-[17px] font-extrabold text-ink">
                    {t("Hei, Nardo FK 👋", "Hi, Nardo FK 👋")}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-[#4C5E50]">
                    {t("Her er oversikten for denne uken.", "Here's the overview for this week.")}
                  </div>
                </div>
                <span className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-[#D6E2D2] px-2.5 py-1.5 text-[11px] text-ink">
                  Nardo Fotballklubb ⌄
                </span>
                <span className="h-[26px] w-[26px] shrink-0 rounded-full bg-[#8BCB8B]" />
              </div>

              <div className="mt-3.5 grid grid-cols-3 gap-2.5">
                {kpis.map((k) => (
                  <div key={k.label} className="rounded-[14px] border border-[#E3ECE0] px-3 py-2.5">
                    <div className="text-[10.5px] text-[#4C5E50]">{k.label}</div>
                    <div className="mt-0.5 whitespace-nowrap font-heading text-[clamp(12px,1.3vw,16px)] font-extrabold text-ink">
                      {k.value}
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-moss">{k.delta}</div>
                  </div>
                ))}
              </div>

              <div className="mt-2.5 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-2.5">
                <div className="min-w-0 rounded-[14px] border border-[#E3ECE0] px-3 py-2.5">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[10.5px] text-[#4C5E50]">
                    <span className="flex-[1_1_100%] font-bold text-ink">
                      {t("Inntekter vs. kostnader", "Income vs. expenses")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="h-[7px] w-[7px] rounded-full bg-[#8BCB8B]" />
                      {t("Inntekter", "Income")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="h-[7px] w-[7px] rounded-full bg-moss" />
                      {t("Kostnader", "Expenses")}
                    </span>
                  </div>
                  <svg viewBox="0 0 220 90" className="mt-1.5 block h-auto w-full" aria-hidden="true">
                    <path d="M0 70 L220 70 M0 45 L220 45 M0 20 L220 20" stroke="#E3ECE0" strokeWidth="1" />
                    <path
                      d="M10 62 C40 58, 60 40, 90 48 S140 30, 170 36 S200 22, 212 18"
                      fill="none"
                      stroke="#8BCB8B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 70 C40 66, 60 56, 90 60 S140 50, 170 54 S200 44, 212 46"
                      fill="none"
                      stroke="#1f7a3a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="flex justify-between text-[9.5px] text-[#4C5E50]">
                    {months.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[14px] border border-[#E3ECE0] px-3 py-2.5">
                  <div className="text-[10.5px] font-bold text-ink">
                    {t("Kommende aktiviteter", "Upcoming activities")}
                  </div>
                  <div className="mt-2 grid gap-1.5">
                    {upcoming.map((u) => (
                      <div key={u.title} className="flex items-center gap-2">
                        <span className="h-6 w-6 shrink-0 rounded-lg bg-[#E4F3E4]" />
                        <span className="min-w-0">
                          <span className="block text-[11px] font-bold text-ink">{u.title}</span>
                          <span className="block text-[10px] text-[#4C5E50]">{u.when}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Member app, tilted over the corner */}
          <div className="absolute bottom-[-48px] left-[-36px] w-[180px] -rotate-6 rounded-[30px] bg-ink p-2.5 shadow-[0_28px_60px_rgba(22,36,26,0.32)]">
            <div className="min-h-[300px] rounded-[22px] bg-[#F4F7F1] px-3.5 pb-3.5 pt-4">
              <div className="font-heading text-[13px] font-extrabold text-ink">Kretz</div>
              <div className="mt-3.5 font-heading text-[18px] font-extrabold text-ink">{t("Hei!", "Hi!")}</div>
              <div className="mt-0.5 text-[11px] text-[#4C5E50]">
                {t("Hva vil du gjøre i dag?", "What would you like to do today?")}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {quick.map((q) => (
                  <div
                    key={q}
                    className="rounded-xl border border-[#D6E2D2] bg-white px-2 py-2.5 text-center text-[10px] font-bold text-ink"
                  >
                    <span className="mx-auto mb-1.5 block h-[22px] w-[22px] rounded-lg bg-[#E4F3E4]" />
                    {q}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[9.5px] text-[#4C5E50]">{t("Neste aktivitet", "Next activity")}</div>
              <div className="text-[11px] font-bold text-ink">{t("Trening – G2012", "Training – G2012")}</div>
              <div className="text-[10px] text-[#4C5E50]">{t("I dag kl. 18:00", "Today at 18:00")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
