import { useLang } from "../lib/langContext";

export default function About() {
  const { t } = useLang();

  const principles = [
    {
      n: "01",
      title: t("Frivillige først", "Volunteers first"),
      body: t(
        "Trenger det en bruksanvisning, er vi ikke ferdige med designet.",
        "If it needs a manual, we have not finished designing it.",
      ),
    },
    {
      n: "02",
      title: t("Dataene blir i klubben", "Data stays in the club"),
      body: t(
        "Norske servere, GDPR som standard, eksport når du vil.",
        "Norwegian servers, GDPR by default, export whenever you want.",
      ),
    },
    {
      n: "03",
      title: t("Priset for klubbvirkelighet", "Priced for club reality"),
      body: t(
        "Én pris per medlem per sesong. Ingen moduler, ingen overraskelser.",
        "One price per member per season. No modules, no surprises.",
      ),
    },
  ];

  return (
    <section id="om-oss" className="relative isolate overflow-hidden bg-paper-2 px-5 pb-24 sm:px-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-140px] left-[-180px] -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(127,184,255,0.22),rgba(127,184,255,0)_70%)] blur-[24px]"
      />

      <div className="mx-auto max-w-[1200px] rounded-[28px] border border-ink/12 bg-white p-6 sm:rounded-slab sm:p-12">
        <div className="grid gap-7 lg:grid-cols-2 lg:gap-11">
          <div data-reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-moss-dark">
              {t("Om oss", "About us")}
            </div>
            <h2 className="my-4 font-heading text-[clamp(28px,3.4vw,42px)] font-extrabold tracking-[-0.03em]">
              {t(
                "Laget av folk som har sittet i styremøtet",
                "Built by people who have sat in the board meeting",
              )}
            </h2>
            <p className="m-0 text-base leading-[1.7] text-ink/70">
              {t(
                "Kretz startet i Trondheim, der frivillige brukte mer tid på fakturaer enn på spillerne. Vi bygger verktøyet vi selv skulle hatt — enkelt og raskt å lære.",
                "Kretz started in Trondheim, where volunteers spent more time on invoices than on the players. We build the tool we wished we had — simple and quick to learn.",
              )}
            </p>
          </div>

          <div data-reveal className="grid content-start gap-4">
            {principles.map((item, i) => (
              <div
                key={item.n}
                className={`flex items-start gap-4 ${
                  i < principles.length - 1 ? "border-b border-ink/12 pb-4" : ""
                }`}
              >
                <span className="font-heading font-extrabold text-moss-dark">{item.n}</span>
                <div>
                  <div className="font-heading text-lg font-extrabold">{item.title}</div>
                  <p className="mb-0 mt-1 text-[15px] text-ink/70">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
