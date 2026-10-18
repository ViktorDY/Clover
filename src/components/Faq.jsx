import { useState } from "react";
import { useLang } from "../lib/langContext";

export default function Faq() {
  const { t } = useLang();
  // Several answers can be open at once; the first starts open.
  const [open, setOpen] = useState({ 0: true });

  const items = [
    [
      t("Hvor lang tid tar det å flytte fra dagens system?", "How long does it take to move from your current system?"),
      t(
        "De fleste klubber er i gang på under en uke. Vi importerer medlemmer, lag og utestående kontingent for dere, og går gjennom tallene sammen før overgangen.",
        "Most clubs are up and running in under a week. We import members, teams and outstanding fees for you, and go through the numbers together before the switch.",
      ),
    ],
    [
      t("Hva koster Kretz?", "What does Kretz cost?"),
      t(
        "Én pris per medlem per sesong. Ingen moduler og ingen overraskelser. Ta kontakt, så regner vi ut hva det blir for klubben deres.",
        "One price per member per season. No modules and no surprises. Get in touch and we'll work out what it comes to for your club.",
      ),
    ],
    [
      t("Kan foreldre betale med Vipps?", "Can parents pay with Vipps?"),
      t(
        "Ja. Kontingent og avdrag kan betales med Vipps, og purringer sendes automatisk til de som ikke har betalt.",
        "Yes. Fees and instalments can be paid with Vipps, and reminders are sent automatically to those who haven't paid.",
      ),
    ],
    [
      t("Hvem kan se medlemsdataene?", "Who can see the member data?"),
      t(
        "Bare de klubben gir tilgang. Styret, trenere og foreldre ser det rollen deres trenger. Dataene ligger på norske servere, og dere kan eksportere dem når dere vil.",
        "Only those the club gives access. The board, coaches and parents see what their role needs. The data is stored on Norwegian servers, and you can export it whenever you want.",
      ),
    ],
    [
      t("Håndterer dere forbundsrapportering og støtteordninger?", "Do you handle federation reporting and grant schemes?"),
      t(
        "Ta kontakt, så går vi gjennom hvilke rapporter og ordninger klubben deres bruker, og hvordan Kretz kan hjelpe.",
        "Get in touch and we'll go through which reports and schemes your club uses, and how Kretz can help.",
      ),
    ],
    [
      t("Hva om vi trenger hjelp midt i sesongen?", "What if we need help in the middle of the season?"),
      t(
        "Onboarding er inkludert, og dere kan når som helst kontakte oss. Vi hjelper dere videre.",
        "Onboarding is included, and you can contact us at any time. We'll help you along.",
      ),
    ],
  ];

  const toggle = (i) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section id="faq" className="kz-pad kz-pad-m relative pt-[120px]">
      <div className="mx-auto max-w-[1200px] min-[1680px]:max-w-[1440px]">
        <h2
          data-reveal
          className="mx-0 mb-8 mt-0 text-center font-heading text-[clamp(38px,5.4vw,70px)] font-extrabold leading-none tracking-[-0.035em]! text-ink"
        >
          {t("Ofte stilte spørsmål", "Frequently asked questions")}
        </h2>
        <div className="mx-auto max-w-[860px]">
          {items.map(([q, a], i) => {
            const isOpen = !!open[i];
            const panelId = `kz-faq-${i}`;
            return (
              <div key={panelId} className="border-b border-[#D6E2D2]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="flex w-full cursor-pointer items-center gap-5 border-0 bg-transparent px-0 py-[22px] text-left font-heading text-[clamp(18px,1.8vw,22px)] font-extrabold tracking-[-0.02em] text-ink"
                >
                  <span className="min-w-0 flex-1">{q}</span>
                  <span
                    aria-hidden="true"
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-[#8BCB8B]" : "bg-[#E3ECDF]"
                    }`}
                  >
                    <span
                      className={`inline-block text-[22px] leading-none text-ink transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>
                <div
                  id={panelId}
                  className="grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="mx-0 mb-[22px] mt-0 max-w-[40em] text-[17px] leading-[1.65] text-[#4C5E50]">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
