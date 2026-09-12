import { useState } from "react";
import { useLang } from "../lib/langContext";

export default function Features() {
  const { t } = useLang();
  // -1 means no panel open; the chips toggle.
  const [open, setOpen] = useState(-1);

  const features = [
    {
      label: t("Medlemmer", "Members"),
      title: t("Medlemsregister", "Member register"),
      body: t(
        "Én sannhet om hvert medlem: familie, lag, samtykker og historikk — alltid oppdatert.",
        "One truth about every member: family links, teams, consents and history — always up to date.",
      ),
    },
    {
      label: t("Kontingent", "Fees"),
      title: t("Kontingent og faktura", "Fees and invoicing"),
      body: t(
        "Automatisk kontingent, avdrag, purring og Vipps — uten en eneste manuell liste.",
        "Automatic fees, instalments, reminders and Vipps — without a single manual list.",
      ),
    },
    {
      label: t("Aktiviteter", "Activities"),
      title: t("Aktiviteter og påmelding", "Activities and sign-ups"),
      body: t(
        "Kalender, oppmøte og dugnadsvakter foreldrene fikser fra sidelinja.",
        "Calendar, attendance and dugnad shifts the parents can handle from the sideline.",
      ),
    },
    {
      label: "Booking",
      title: t("Hallbooking", "Hall booking"),
      body: t(
        "Medlemmene booker bord og baner selv, og betaler i samme flyt.",
        "Members book tables and courts themselves, and pay in the same flow.",
      ),
    },
    {
      label: t("Økonomi", "Finance"),
      title: t("Økonomi og rapport", "Finance and reporting"),
      body: t(
        "Budsjett, regnskapseksport, søknader om støtte og revisjonsspor i én flyt.",
        "Budget, accounting export, grant applications and audit trail in one flow.",
      ),
    },
    {
      label: t("Tilgang", "Access"),
      title: t("Roller og tilgang", "Roles and access"),
      body: t(
        "Trenere, kasserer, styret og foreldre ser presis det de trenger.",
        "Coaches, treasurer, board and parents each see exactly what they need.",
      ),
    },
  ];

  const isOpen = open >= 0 && open < features.length;
  const active = features[isOpen ? open : 0];

  return (
    <section
      id="funksjoner"
      className="relative isolate mx-2 my-6 overflow-hidden rounded-[34px] bg-[linear-gradient(170deg,#dff0e0,#eaf7e4_58%,#f4f7ea)] px-4 py-14 sm:px-7 sm:py-18 md:rounded-bowl"
    >
      {/* Decorative blobs, dots and dashed ring from the artboard. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-40px] -ml-[350px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.36),rgba(116,205,133,0)_66%)] blur-[30px]" />
        <div className="absolute right-[-90px] top-[-70px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,201,74,0.5),rgba(255,201,74,0)_68%)] blur-[26px]" />
        <div className="absolute left-[8%] top-[30px] h-[9px] w-[9px] rounded-full bg-amber" />
        <div className="absolute bottom-[60px] right-[12%] h-[7px] w-[7px] rounded-full bg-grass" />
        <div className="absolute bottom-[40px] right-[-130px] h-[420px] w-[420px] rounded-full border-[1.5px] border-dashed border-moss/20" />
        <div className="absolute bottom-[-90px] left-[-110px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,201,74,0.34),rgba(255,201,74,0)_70%)] blur-[20px]" />
      </div>

      <div className="mx-auto max-w-[1200px]">
        <div data-reveal className="mx-auto mb-8 max-w-[34em] text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-moss-dark">
            {t("I plattformen", "In the platform")}
          </div>
          <h2 className="mb-3 mt-3.5 font-heading text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.04] tracking-[-0.032em]">
            {t("Én plattform, hele klubben", "One platform, the whole club")}
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ink/70">
            {t("Trykk på en funksjon for å se hva den gjør.", "Tap a function to see what it does.")}
          </p>
        </div>

        <div data-reveal className="flex flex-wrap justify-center gap-2.5">
          {features.map((feature, i) => {
            const on = isOpen && i === open;
            return (
              <button
                key={feature.title}
                type="button"
                aria-expanded={on}
                onClick={() => setOpen((prev) => (prev === i ? -1 : i))}
                className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-2.5 font-heading text-[13px] font-extrabold transition-all duration-300 ${
                  on
                    ? "-translate-y-0.5 border border-ink bg-ink text-paper"
                    : "border border-ink/16 bg-white text-ink hover:border-ink/30"
                }`}
              >
                {feature.label}
              </button>
            );
          })}
        </div>

        <div
          className="mx-auto max-w-[720px] overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ maxHeight: isOpen ? "340px" : "0px", opacity: isOpen ? 1 : 0 }}
        >
          <div className="mt-4.5 rounded-[30px] border border-grass/50 bg-white px-8 py-7 text-center shadow-[0_22px_50px_rgba(22,36,26,0.1)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
              {t("I plattformen", "In the platform")} · {(isOpen ? open : 0) + 1}/{features.length}
            </div>
            <h3 className="my-2.5 font-heading text-[clamp(21px,2.4vw,30px)] font-extrabold leading-[1.12] tracking-[-0.03em]">
              {active.title}
            </h3>
            <p className="mx-auto my-0 max-w-[34em] text-base leading-[1.6] text-ink/75">
              {active.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
