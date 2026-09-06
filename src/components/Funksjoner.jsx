const MODULES = [
  {
    title: "Økonomi og styringsanalyse",
    body: "Fra passiv regnskapsføring til aktiv styring. Se budsjettet i sanntid og sett inn tiltak før det er for sent.",
    bullets: [
      "Budsjett vs faktisk per lag og aktivitet",
      "Likviditetsprognose og kontantstrøm",
      "Styredashboard klart for hvert møte",
      "Inntekts- og kostnadsfordeling",
    ],
  },
  {
    title: "Sponsorhåndtering",
    body: "Gjør sponsorforholdet profesjonelt og forutsigbart. Aldri glem en avtalefornying igjen.",
    bullets: [
      "CRM for alle sponsoravtaler",
      "Automatiske fornyelsespåminnelser",
      "Sponsorrapporter med ett klikk",
      "Dokumentasjon av sponsorverdi",
    ],
  },
  {
    title: "Klubbledelse",
    body: "Strukturer styrearbeidet. Fordel oppgaver, samle dokumenter og hold oversikt over årshjulet.",
    bullets: [
      "Hallbooking og treningsoversikt",
      "Dokumentarkiv — PDF, Word, PPT",
      "Frivillige og dugnadsoversikt",
      "Meldinger og kunngjøringer",
    ],
  },
  {
    title: "Samlet innsikt",
    body: "Alle nøkkeltall samlet i ett dashboard. Ta beslutninger basert på data, ikke magefølelse.",
    bullets: [
      "Medlemsvekst og frafallsanalyse",
      "Betalingsoversikt og purringer",
      "Anleggskapasitet og bookingrate",
      "Aktivitets- og deltakelsesrapporter",
    ],
  },
];

export default function Funksjoner() {
  return (
    <section className="w-full bg-[#f1ecdf] px-6 py-28 text-center">
      <span className="text-base font-semibold tracking-wide text-gray-500">
        FUNKSJONER
      </span>
      <h2 className="mx-auto mt-4 text-5xl font-extrabold leading-[1.1] text-gray-950">
        Fire moduler.
        <br />
        En plattform.
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
        CLOVER løser de fire størrste utfordringene for idrettslag - i ett
        system som snakker sammen
      </p>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
        {MODULES.map((mod) => (
          <div
            key={mod.title}
            className="rounded-3xl bg-white p-8 text-left shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-700">{mod.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
              {mod.body}
            </p>
            <ul className="mt-5 flex flex-col gap-2">
              {mod.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-[15px] text-gray-600"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
