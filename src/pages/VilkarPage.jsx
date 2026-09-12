import KretzMark from "../components/KretzMark";

/*
  Vilkår — the terms of use.

  The canvas ships this artboard in Norwegian only, with no language toggle
  and no logic, so it stays a static Norwegian page: translating binding
  terms is not ours to do. Everything else on the site keeps its NO/EN
  switch; this page simply does not offer one.
*/

const UPDATED = "Sist oppdatert 5. mars 2026";

const INTRO =
  "Disse vilkårene regulerer bruken av Kretz med tilhørende tjenester og funksjonalitet, heretter omtalt som «Vilkårene».";

const SECTIONS = [
  {
    title: "1. Aksept av vilkårene",
    body: "Når du tar i bruk Kretz, inngår du en avtale med Kretz AS («Kretz», «vi» eller «oss») og aksepterer Vilkårene. Skal du opprette eller administrere grupper i Kretz, ber vi deg lese punkt 2 særlig nøye. Egne vilkår kan gjelde for enkelte tilleggstjenester; disse gjøres tilgjengelige sammen med tjenesten.",
  },
  {
    title: "2. Særlig for gruppeadministratorer",
    body: "En gruppeadministrator er den som oppretter en gruppe i Kretz, eller som på annen måte har fått tillatelse til å administrere en gruppe. Rollen medfører et særlig ansvar for medlemmene i gruppen og for opplysningene som behandles der. Tilleggsvilkår for administratorer gjelder sammen med, og inngår som en del av, disse Vilkårene.",
  },
  {
    title: "3. Aldersgrenser",
    body: "Du må være minst 15 år for å bruke Kretz. Barn under 15 år kan likevel registreres av en gruppeadministrator eller av foresatt. Du må være minst 15 år for å være gruppeadministrator. Enkelte deler av tjenesten kan ha andre aldersgrenser, og grensene kan variere mellom land.",
  },
  {
    title: "4. Endringer i vilkårene og tjenesten",
    body: "Vi kan endre Vilkårene. Ved vesentlige endringer varsler vi deg på hensiktsmessig måte; ellers publiseres nye vilkår på kretz.no. Fortsetter du å bruke Kretz etter dette, anses du å ha akseptert de nye vilkårene. Kretz utvikles fortløpende, og vi kan legge til, endre eller fjerne funksjonalitet. Ved større endringer får du beskjed.",
  },
  {
    title: "5. Din bruk av Kretz",
    body: "Du skal bruke tjenesten i samsvar med Vilkårene og med formålet bak Kretz. Det betyr blant annet at du ikke skal:",
    list: [
      "bruke Kretz til ulovlig virksomhet eller på en måte som kan skade tjenesten eller andre brukere",
      "publisere innhold som er upassende, støtende eller nedverdigende",
      "publisere innhold andre har rettigheter til, uten avtale med rettighetshaveren",
      "kopiere, videreselge, endre eller skaffe deg urettmessig tilgang til Kretz eller programvaren bak",
      "bruke personopplysninger om andre brukere til noe annet enn å opprette, administrere og delta i grupper og aktiviteter",
      "legge til deltakere i grupper eller aktiviteter uten at de har samtykket",
      "forsøke å omgå sikkerhetsfunksjoner i tjenesten, eller dele passordet ditt med andre",
    ],
    after:
      "Ved rimelig mistanke om brudd kan vi undersøke innhold, fjerne det, og suspendere eller stenge brukerkontoen og gruppetilganger med umiddelbar virkning.",
  },
  {
    title: "6. Tredjepartstjenester og betaling",
    body: "Noen tjenester som er tilgjengelige i Kretz leveres av andre enn oss, og kan være underlagt leverandørens egne vilkår. Vi er ikke ansvarlige for feil, unøyaktigheter eller manglende tilgjengelighet i slike tjenester, og kan erstatte eller avslutte dem. Oppretter du en utbetalingskonto, må du også godta vilkårene til vår betalingsleverandør. Du er selv ansvarlig for tvister, refusjoner og tilbakeføringer som oppstår fra transaksjoner på din konto, og for at saldoen på tilknyttet bankkonto holdes positiv.",
  },
  {
    title: "7. Avbrudd og feil",
    body: "Kretz kan være helt eller delvis utilgjengelig ved vedlikehold, oppdateringer eller av andre grunner. Vi retter feil så raskt vi kan etter at vi blir kjent med dem — meld gjerne fra til support@kretz.no. Det koster ingenting å bruke Kretz, og erstatning for økonomisk tap som følge av avbrudd eller feil kan derfor ikke kreves. Du kan alltid si opp avtalen, se punkt 9. Vilkårene innskrenker ikke rettigheter du har etter ufravikelig forbrukerlovgivning.",
  },
  {
    title: "8. Innhold og opphavsrett",
    body: "Kretz AS eier tjenesten og har alle immaterielle rettigheter til innhold vi har skapt. Du beholder rettighetene til ditt eget innhold, og innhold publisert av andre brukere tilhører dem. Du er selv ansvarlig for det du publiserer. Innhold som krenker andres rettigheter fjernes så raskt som mulig etter at vi blir kjent med det.",
  },
  {
    title: "9. Opphør av avtalen",
    body: "Avtalen gjelder inntil den sies opp av deg eller av oss. Du avslutter ved å slutte å bruke Kretz og slette brukerprofilen din. Ønsker vi å avslutte avtalen, varsler vi deg på forhånd så langt det er mulig.",
  },
  {
    title: "10. Personopplysninger",
    body: "Behandling av personopplysninger i Kretz er regulert i vår personvernerklæring. Dataene lagres på norske servere.",
  },
  {
    title: "11. Innsamling og dugnad",
    body: "Kretz Innsamling lar medlemmer, familie og andre inviterte bidra til lagets økonomi. Kampanjen opprettes av en gruppeadministrator, som er ansvarlig for å informere medlemmene. Avregning skjer omtrent 14 dager etter at kampanjen er avsluttet, og utbetaling går til gruppens oppgitte kontonummer. Tjenesten er bare tilgjengelig i utvalgte land.",
  },
  {
    title: "12. Tvister",
    body: "Avtalen reguleres av norsk rett. Tvister som ikke løses i minnelighet, avgjøres av Oslo tingrett.",
  },
  {
    title: "13. Meldinger og kontakt",
    body: "Meldinger fra oss gis via e-post, på kretz.no eller i tjenesten. Vil du kontakte oss, skriv til support@kretz.no.",
  },
];

export default function VilkarPage({ onBack }) {
  return (
    <div className="min-h-screen bg-paper font-body text-ink">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[880px] items-center gap-3.5 px-6 py-3.5">
          <button
            type="button"
            onClick={onBack}
            aria-label="Tilbake"
            className="grid h-10 w-10 flex-none cursor-pointer place-items-center rounded-full border border-ink/20 bg-transparent text-[17px] text-ink transition-colors duration-300 hover:bg-ink/8"
          >
            ←
          </button>

          <button
            type="button"
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2.5 bg-transparent font-heading text-[19px] font-extrabold text-ink"
          >
            <KretzMark size={24} />
            Kretz
          </button>

          <div className="flex-1" />

          <span className="text-[13px] text-ink/60">{UPDATED}</span>
        </div>
      </header>

      <main className="mx-auto max-w-[880px] px-6 pb-[90px] pt-[52px]">
        <h1 className="m-0 font-heading text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.04]">
          Vilkår for bruk av Kretz
        </h1>

        <p className="mt-[18px] max-w-[40em] text-[17px] leading-[1.7] text-ink/75">{INTRO}</p>

        <div className="my-10 h-0.5 bg-ink/16" />

        <div className="grid gap-[34px]">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2.5 mt-0 font-heading text-[22px] font-extrabold">
                {section.title}
              </h2>

              <p
                className={`m-0 text-base leading-[1.75] text-ink/78 ${
                  section.list ? "mb-3" : ""
                }`}
              >
                {section.body}
              </p>

              {section.list && (
                <ul className="m-0 grid gap-2 pl-[22px] text-base leading-[1.7] text-ink/78">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              {section.after && (
                <p className="mb-0 mt-3 text-base leading-[1.75] text-ink/78">{section.after}</p>
              )}
            </section>
          ))}
        </div>

        <div className="my-10 h-0.5 bg-ink/16" />

        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer rounded-full border border-ink/25 bg-transparent px-7 py-3.5 font-heading text-[15px] font-extrabold text-ink transition-colors duration-300 hover:bg-ink/8"
        >
          ← Tilbake til Kretz
        </button>
      </main>
    </div>
  );
}
