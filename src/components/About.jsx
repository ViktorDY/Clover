import { useLang } from "../lib/langContext";

export default function About() {
  const { t } = useLang();

  const values = [
    {
      title: t("Frivillige først", "Volunteers first"),
      body: t(
        "Trenger det en bruksanvisning, er vi ikke ferdige med designet.",
        "If it needs a manual, we're not done designing it.",
      ),
    },
    {
      title: t("Dataene blir i klubben", "The data stays in the club"),
      body: t(
        "Norske servere, GDPR som standard, eksport når du vil.",
        "Norwegian servers, GDPR by default, export whenever you want.",
      ),
    },
    {
      title: t("Priset for klubbvirkelighet", "Priced for club reality"),
      body: t(
        "Én pris per medlem per sesong. Ingen moduler, ingen overraskelser.",
        "One price per member per season. No modules, no surprises.",
      ),
    },
  ];

  return (
    <section id="om-oss" className="kz-pad kz-pad-m relative pt-[120px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-[clamp(32px,5vw,72px)] max-[900px]:rounded-[34px] max-[900px]:p-[30px] max-[760px]:grid-cols-[minmax(0,1fr)] max-[560px]:rounded-[28px] max-[560px]:p-6 min-[1680px]:max-w-[1440px]">
        <div data-reveal>
          <h2 className="m-0 font-heading text-[clamp(38px,5.4vw,70px)] font-extrabold leading-none tracking-[-0.035em]! text-ink">
            {t("Laget av folk som har sittet i styremøtet", "Made by people who've sat in the board meeting")}
          </h2>
          <p className="mb-0 mt-6 max-w-[32em] text-[17px] leading-[1.65] text-[#4C5E50]">
            {t(
              "Kretz startet i Trondheim, der frivillige brukte mer tid på fakturaer enn på spillerne. Vi bygger verktøyet vi selv skulle hatt: enkelt og raskt å lære.",
              "Kretz started in Trondheim, where volunteers spent more time on invoices than on the players. We're building the tool we wished we had: simple and quick to learn.",
            )}
          </p>
        </div>
        <div data-reveal className="grid">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`flex items-start gap-4 py-[22px] ${
                i < values.length - 1 ? "border-b border-[#D6E2D2]" : ""
              }`}
            >
              <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded bg-[#8BCB8B]" />
              <span>
                <span className="block font-heading text-[20px] font-extrabold text-ink">{v.title}</span>
                <span className="mt-1 block text-[16px] leading-[1.55] text-[#4C5E50]">{v.body}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
