export default function FinalCta({ onOpenLogin }) {
  const footerColumns = [
    {
      title: "Produkt",
      links: ["Funksjoner", "Slik fungerer det", "Priser", "Nyheter"],
    },
    {
      title: "Selskapet",
      links: ["Om oss", "Kontakt", "Karriere", "Presse"],
    },
    {
      title: "Juridisk",
      links: ["Personvern", "Vilkår", "GDPR", "Cookies"],
    },
  ];

  return (
    <>
      <section className="w-full bg-green-950 px-6 py-28 text-center">
        <span className="text-base font-semibold tracking-wide text-green-400">
          KLAR TIL Å STARTE?
        </span>
        <h2 className="mx-auto mt-5 max-w-3xl text-5xl font-extrabold leading-[1.1] text-white">
          Gi klubben din et nytt hjem
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-green-100/80">
          Prøv CLOVER gratis i 30 dager. Ingen binding. Kom i gang på 5
          minutter.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#kom-i-gang"
            className="rounded-md bg-gradient-to-b from-green-400 to-green-500 px-8 py-4 text-base font-semibold text-white shadow-md hover:from-green-500 hover:to-green-600"
          >
            Start gratis prøveperiode --&gt;
          </a>
          <button
            onClick={onOpenLogin}
            className="rounded-md border border-green-700 bg-green-900 px-8 py-4 text-base font-semibold text-white hover:bg-green-800"
          >
            Logg inn
          </button>
        </div>
      </section>

      <footer className="w-full bg-green-950 px-6 py-16 text-green-100/70">
        <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C9 2 7 4.5 8 7c-2.5-1-5 1-4 3.5S7 13 9 12c-1 2.5.5 5 3 5s4-2.5 3-5c2 1 4.5-.5 5-3s-1.5-4.5-4-3.5c1-2.5-1-5-4-5Z"
                  fill="#4ADE80"
                />
                <rect x="11" y="14" width="2" height="7" rx="1" fill="#4ADE80" />
              </svg>
              <span className="text-xl font-bold text-white">clover</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Idrettslagets nye hjem. Økonomi, kommunikasjon, booking og
              administrasjon - samlet i en plattform.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-green-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-2 text-sm sm:flex-row">
            <span>© 2026 Clover AS · Trondheim/Bergen, Norge</span>
            <span>Laget med ♥ for norsk idrett</span>
          </div>
        </div>
      </footer>
    </>
  );
}
