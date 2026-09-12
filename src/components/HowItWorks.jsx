import { useLang } from "../lib/langContext";

export default function HowItWorks() {
  const { t } = useLang();

  const steps = [
    {
      n: "01",
      title: t("Hent inn klubben", "Import the club"),
      body: t(
        "Medlemmer, lag og fjorårets kontingent flyttes rett over fra gamle lister og regneark.",
        "Bring members, teams and last season's fees straight over from your old lists and spreadsheets.",
      ),
    },
    {
      n: "02",
      title: t("Sett opp lag og aktiviteter", "Set up teams and activities"),
      body: t(
        "Treninger, kamper, cuper og dugnad i én felles kalender med påmelding og roller.",
        "Training, matches, cups and dugnad go into one shared calendar with sign-ups and roles.",
      ),
    },
    {
      n: "03",
      title: t("La økonomien gå av seg selv", "Let the money run itself"),
      body: t(
        "Kontingent, purringer og regnskapseksport går automatisk. Styret leser bare tallene.",
        "Fees, reminders and accounting exports run on schedule — the board just reads the numbers.",
      ),
    },
  ];

  return (
    <section
      id="slik"
      className="relative isolate overflow-hidden rounded-t-[34px] bg-paper-2 px-5 py-24 sm:px-7 md:rounded-t-bowl"
    >
      <div aria-hidden="true" className="kz-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-[1200px]">
        <div data-reveal className="max-w-[34em]">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-moss-dark">
            {t("Slik funker det", "How it works")}
          </div>
          <h2 className="m-0 mt-4 font-heading text-[clamp(34px,4.2vw,54px)] font-extrabold leading-[1.02] tracking-[-0.032em]">
            {t("I gang på en ettermiddag", "Up and running in an afternoon")}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(258px,1fr))] gap-5.5">
          {steps.map((step) => (
            <div
              key={step.n}
              data-reveal
              className="rounded-card border border-ink/12 bg-white p-8 transition-all duration-[450ms] hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(22,36,26,0.14)]"
            >
              <div className="grid h-[46px] w-[46px] place-items-center rounded-full bg-grass/25 font-heading font-extrabold text-moss-darker">
                {step.n}
              </div>
              <h3 className="mb-2.5 mt-5.5 font-heading text-2xl font-extrabold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="m-0 text-base leading-[1.65] text-ink/70">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
