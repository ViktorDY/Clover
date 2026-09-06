const FEATURE_PILLS = [
  "Booking",
  "Meldinger",
  "Fillagring",
  "Betalinger",
  "Struktur",
  "Økonomi",
];

const PROBLEMS = [
  {
    title: "Data registreres flere ganger",
    body: "Spond, KlubbAdmin, Min Idrett og Excel — er aldri synkronisert.",
  },
  {
    title: "Informasjonen når ikke frem",
    body: "Sendes via Facebook, e-post og SMS — foreldrene går glipp av det.",
  },
  {
    title: "Regnskap uten styring",
    body: "Klubben har tall, men ingen oversikt over budsjett, likviditet eller prognose.",
  },
];

export default function Problem() {
  return (
    <section className="w-full bg-green-50/40 px-6 py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-2">
        {/* Left: text content */}
        <div>
          <span className="text-base font-semibold tracking-wide text-gray-500">
            PROBLEMET
          </span>
          <h2 className="mt-5 text-5xl font-extrabold leading-[1.1] text-gray-950">
            Åtte
            <br />
            systemmer.
            <br />
            En klubb.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-500">
            Norske idrettslag bruker i snitt 6-8 forskjellige verktøy. Data
            registreres dobbelt. Informasjon forsvinner. Og styret bruker tid
            på administrasjon i stedet for idrett
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {PROBLEMS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-[#f5ebe3] px-6 py-4"
              >
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: feature pills collapsing into one solution */}
        <div className="flex flex-col items-center">
          <div className="grid w-full grid-cols-2 gap-4">
            {FEATURE_PILLS.map((label) => (
              <div
                key={label}
                className="rounded-xl bg-[#f1ecdf] py-5 text-center text-lg font-medium text-green-800"
              >
                {label}
              </div>
            ))}
          </div>

          <svg
            width="32"
            height="48"
            viewBox="0 0 32 48"
            fill="none"
            className="my-6 text-green-500"
          >
            <path
              d="M16 0v36M4 28l12 16 12-16"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex w-full items-center justify-between rounded-2xl bg-green-950 px-8 py-5">
            <div className="flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C9 2 7 4.5 8 7c-2.5-1-5 1-4 3.5S7 13 9 12c-1 2.5.5 5 3 5s4-2.5 3-5c2 1 4.5-.5 5-3s-1.5-4.5-4-3.5c1-2.5-1-5-4-5Z"
                  fill="#4ADE80"
                />
                <rect x="11" y="14" width="2" height="7" rx="1" fill="#4ADE80" />
              </svg>
              <span className="text-xl font-bold text-white">clover</span>
            </div>
            <span className="text-base text-green-100/80">- En løsning</span>
          </div>
        </div>
      </div>
    </section>
  );
}
