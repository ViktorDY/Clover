const STEPS = [
  {
    number: "01",
    title: "Opprett klubben",
    body: "Registrer klubben din og inviter styremedlemmer og trenere på ett minutt.",
  },
  {
    number: "02",
    title: "Importer data",
    body: "Last opp eksisterende Excel-filer eller koble til Min Idrett for å importere medlemslisten automatisk.",
  },
  {
    number: "03",
    title: "Ta over styringen",
    body: "Dashboardet er klart. Send første kunngjøring, sett opp budsjettet og book hallene - alt fra en skjerm.",
  },
];

export default function SlikFungererDet() {
  return (
    <section
      id="slik-fungerer-det"
      className="relative w-full overflow-hidden bg-green-950 px-6 py-28 text-center"
    >
      <span className="text-base font-semibold tracking-wide text-green-400">
        SLIK FUNGERER DET
      </span>
      <h2 className="mx-auto mt-4 text-5xl font-extrabold text-white">
        Oppe på 5 minutter
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-green-100/80">
        Ingen IT-kunnskap nødvendig. CLOVER er designet for travle
        styreledere og trenere - ikke for utviklere.
      </p>

      <div className="relative z-10 mx-auto mt-20 grid max-w-6xl gap-12 text-left sm:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.number}>
            <span className="text-5xl font-extrabold text-green-800">
              {step.number}
            </span>
            <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-green-100/70">
              {step.body}
            </p>
          </div>
        ))}
      </div>

      
    </section>
  );
}
