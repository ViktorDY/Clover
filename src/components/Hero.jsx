export default function Hero() {
  const trustItems = [
    "Ingen binding",
    "GDPR-sikker",
    "Laget for norske klubber",
    "Tilpasset deg og dine behov",
  ];

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-stone-100 px-6 py-32 text-center"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        {/* Eyebrow badge */}
        <span className="mb-10 inline-flex items-center gap-2 rounded-full border border-green-300 bg-green-100/70 px-5 py-2 text-base text-green-800">
          <span className="h-2 w-2 rounded-full bg-green-700" />
          Nytt — nå tilgjengelig for norske idrettslag
        </span>

        {/* Headline */}
        <h1 className="text-6xl font-extrabold leading-[1.05] tracking-tight text-gray-950 sm:text-7xl">
          ALT KLUBBEN
          <br />
          TRENGER.
          <br />
          <span className="text-green-500">Ett sted.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-10 max-w-2xl text-xl text-gray-500">
          Clover samler økonomi, kommunikasjon, booking og administrasjon i en
          plattform — bygget spesielt for idrettslag.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#kom-i-gang"
            className="rounded-md bg-gradient-to-b from-green-400 to-green-500 px-8 py-4 text-base font-semibold text-white shadow-md hover:from-green-500 hover:to-green-600"
          >
            Start gratis prøveperiode --&gt;
          </a>
          <a
            href="#laer-mer"
            className="rounded-md bg-green-950 px-8 py-4 text-base font-semibold tracking-wide text-white hover:bg-green-900"
          >
            LÆR MER
          </a>
        </div>

        {/* Trust strip */}
        <ul className="mt-24 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base font-medium text-gray-500">
          {trustItems.map((item, i) => (
            <li key={item} className="flex items-center gap-4">
              <span>{item}</span>
              {i < trustItems.length - 1 && (
                <span className="text-gray-300">|</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}