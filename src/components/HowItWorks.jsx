import { useLang } from "../lib/langContext";

// Keeps the scroll-reveal fade while adding the hover lift.
const REVEAL_AND_LIFT =
  "opacity 1s cubic-bezier(.2,.7,.2,1), transform 1s cubic-bezier(.2,.7,.2,1), translate .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s";

function PeopleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2z" />
      <circle cx="17.5" cy="8.5" r="2.5" opacity=".65" />
      <path d="M16 14h1.5a4.5 4.5 0 0 1 4.5 4.5V21h-5z" opacity=".65" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 4h14a2 2 0 0 1 2 2v3H3V6a2 2 0 0 1 2-2z" />
      <path d="M3 10h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" opacity=".75" />
      <rect x="7" y="1.5" width="2" height="4" rx="1" />
      <rect x="15" y="1.5" width="2" height="4" rx="1" />
      <circle cx="9" cy="14" r="1.2" fill="#F3F8F0" />
      <circle cx="15" cy="14" r="1.2" fill="#F3F8F0" />
      <path d="M9 17.5c1.5 1.5 4.5 1.5 6 0" stroke="#F3F8F0" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function BarsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="4" y="12" width="4" height="8" rx="1" opacity=".7" />
      <rect x="10" y="5" width="4" height="15" rx="1" />
      <rect x="16" y="9" width="4" height="11" rx="1" opacity=".7" />
    </svg>
  );
}

export default function HowItWorks() {
  const { t } = useLang();

  const steps = [
    {
      n: "01",
      icon: <PeopleIcon />,
      title: t("Hent inn klubben", "Import the club"),
      body: t(
        "Medlemmer, lag og fjorårets kontingent flyttes rett over fra gamle lister og regneark.",
        "Bring members, teams and last season's fees straight over from your old lists and spreadsheets.",
      ),
    },
    {
      n: "02",
      icon: <CalendarIcon />,
      title: t("Sett opp lag og aktiviteter", "Set up teams and activities"),
      body: t(
        "Treninger, kamper, cuper og dugnad i én felles kalender med påmelding og roller.",
        "Training, matches, cups and dugnad go into one shared calendar with sign-ups and roles.",
      ),
    },
    {
      n: "03",
      icon: <BarsIcon />,
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
      className="kz-pad kz-pad-m relative isolate overflow-hidden rounded-t-bowl bg-paper-2 pb-[88px] pt-24 text-ink"
    >
      <div aria-hidden="true" className="kz-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-[1200px] min-[1680px]:max-w-[1440px]">
        <div data-reveal className="max-w-[34em]">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-moss-dark">
            {t("Slik fungerer det", "How it works")}
          </div>
          <h2 className="mb-0 mt-4 font-heading text-[clamp(40px,5.4vw,72px)] font-extrabold leading-none tracking-[-0.035em]!">
            {t("I gang på en ettermiddag", "Up and running in an afternoon")}
          </h2>
          <p className="mb-0 mt-4 max-w-[32em] text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-ink/72">
            {t(
              "Tre steg fra regneark og skoesker til én oversikt hele klubben bruker.",
              "Three steps from spreadsheets and shoeboxes to one overview the whole club uses.",
            )}
          </p>
        </div>

        <div className="mt-[50px] grid grid-cols-[repeat(auto-fit,minmax(258px,1fr))] gap-[22px]">
          {steps.map((step) => (
            <div
              key={step.n}
              data-reveal
              className="rounded-card border border-ink/12 bg-white p-8 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(22,36,26,0.14)]"
              style={{ transition: REVEAL_AND_LIFT }}
            >
              <div className="flex items-center gap-3.5">
                <div className="grid h-[46px] w-[46px] place-items-center rounded-full bg-grass/24 font-heading font-extrabold text-moss-darker">
                  {step.n}
                </div>
                <span className="grid h-11 w-11 place-items-center text-[#1F6B2E]">{step.icon}</span>
              </div>
              <h3 className="mb-2.5 mt-[22px] font-heading text-[24px] leading-[1.12] font-extrabold tracking-[-0.02em]!">
                {step.title}
              </h3>
              <p className="m-0 text-[16px] leading-[1.65] text-ink/72">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
