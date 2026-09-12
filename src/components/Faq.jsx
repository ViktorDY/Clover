import { useLang } from "../lib/langContext";

export default function Faq() {
  const { t } = useLang();

  const items = [
    {
      q: t(
        "Hvor lang tid tar det å flytte fra dagens system?",
        "How long does it take to move from our current system?",
      ),
      a: t(
        "De fleste klubber er i gang på under en uke. Vi importerer medlemmer, lag og utestående kontingent for dere, og går gjennom tallene sammen før overgangen.",
        "Most clubs are live within a week. We import members, teams and outstanding fees for you, and check the numbers together before you switch.",
      ),
    },
    {
      q: t("Hva koster Kretz?", "What does Kretz cost?"),
      a: t(
        "Ingenting. Kretz er gratis for klubben — alle funksjoner, alle medlemmer, hele sesongen. Ingen lisens, ingen moduler å kjøpe i tillegg og ingen bindingstid.",
        "Nothing. Kretz is free for the club — every feature, every member, all season. No licence, no modules to buy on top and no lock-in.",
      ),
    },
    {
      q: t("Kan foreldre betale med Vipps?", "Can parents pay with Vipps?"),
      a: t(
        "Ja. Kontingent, avdrag og betaling for arrangementer går via Vipps, kort eller faktura — det familien foretrekker.",
        "Yes. Fees, instalments and event payments run through Vipps, card or invoice — whichever the family prefers.",
      ),
    },
    {
      q: t("Hvem kan se medlemsdataene?", "Who can see member data?"),
      a: t(
        "Dere bestemmer. Roller for styret, kasserer, trenere og foreldre gir hver person kun de dataene oppgaven krever. Alt lagres på norske servere.",
        "You decide. Roles for board, treasurer, coaches and parents give each person only the data their job needs. Everything is stored on Norwegian servers.",
      ),
    },
    {
      q: t(
        "Håndterer dere forbundsrapportering og støtteordninger?",
        "Do you work with the federation and grant reporting?",
      ),
      a: t(
        "Kretz eksporterer rapportene for medlemstall til forbundet og søknader om kommunal støtte, slik at tallene bare må stemme én gang.",
        "Kretz exports the reports for federation membership figures and municipal grant applications, so the numbers only have to be right once.",
      ),
    },
    {
      q: t("Hva om vi trenger hjelp midt i sesongen?", "What if we need help mid-season?"),
      a: t(
        "Support er mennesker, ikke en chatbot-kø. Hver klubb får en fast kontaktperson som kjenner oppsettet deres.",
        "Support is people, not a chatbot queue. Every club gets a named contact who knows how your club is set up.",
      ),
    },
  ];

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-paper-2 px-5 pb-25 sm:px-7">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-10 h-[380px] w-[380px] rounded-full border-[1.5px] border-dashed border-moss/20" />
        <div className="absolute bottom-[60px] right-[-90px] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,138,92,0.2),rgba(255,138,92,0)_70%)] blur-[18px]" />
      </div>

      <div className="mx-auto max-w-[900px]">
        <h2
          data-reveal
          className="mb-8 mt-0 font-heading text-[clamp(30px,3.8vw,46px)] font-extrabold tracking-[-0.03em]"
        >
          {t("Ofte stilte spørsmål", "Frequently asked questions")}
        </h2>

        {items.map((item) => (
          <details
            key={item.q}
            data-reveal
            className="mb-3.5 rounded-[26px] border border-ink/12 bg-white px-6 py-5.5"
          >
            <summary className="flex items-center gap-4.5 font-heading text-lg font-extrabold tracking-[-0.015em]">
              <span className="min-w-0 flex-1">{item.q}</span>
              <span className="kz-plus grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-grass/25 text-base text-moss-darker transition-transform duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]">
                +
              </span>
            </summary>
            <p className="mb-0 mt-3.5 text-base leading-[1.7] text-ink/70">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
