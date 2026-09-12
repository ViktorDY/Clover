import { useMemo, useState } from "react";
import {
  BOOKING_DATES,
  BOOKING_TIMES,
  getVenue,
  takenUnits,
} from "../lib/clubs";
import { useLang } from "../lib/langContext";

const AMENITIES = [
  { no: "Garderobe", en: "Changing rooms" },
  { no: "Kiosk", en: "Kiosk" },
  { no: "Utstyrslån", en: "Equipment loan" },
  { no: "Trinnfri adkomst", en: "Step-free access" },
  { no: "Parkering", en: "Parking" },
];

export default function BookingPage({ slug, fromMember, onBack }) {
  const { t, lang, isEn, toggleLang } = useLang();
  const venue = getVenue(slug);

  const [dateIndex, setDateIndex] = useState(0);
  const [timeIndex, setTimeIndex] = useState(1);
  const [unit, setUnit] = useState(null);
  const [method, setMethod] = useState("vipps");
  const [email, setEmail] = useState("");
  const [paid, setPaid] = useState(false);

  const taken = useMemo(
    () => takenUnits(venue.count, dateIndex, timeIndex),
    [venue.count, dateIndex, timeIndex],
  );

  const unitPlural = venue.unit[lang];
  const unitSingular = venue.unitOne[lang];
  const isCourts = venue.unit.no === "baner";
  const free = venue.count - taken.size;
  const time = BOOKING_TIMES[timeIndex];
  const ready = unit !== null && /.+@.+\..+/.test(email);

  const chipClass = (active) =>
    `cursor-pointer rounded-full px-5 py-3 font-heading text-sm font-extrabold transition-all duration-300 ${
      active
        ? "border border-grass bg-grass text-ink shadow-[0_10px_28px_rgba(116,205,133,0.3)]"
        : "border border-ink/20 bg-ink/7 text-ink hover:bg-ink/12"
    }`;

  const summary =
    unit === null
      ? t(
          `Velg ${isCourts ? "en bane" : "et bord"} i hallen først.`,
          `Pick ${isCourts ? "a court" : "a table"} in the hall first.`,
        )
      : `${unitSingular} ${unit} · ${BOOKING_DATES[dateIndex][lang]} ${t("kl.", "at")} ${time} · 1 ${t("time", "hour")}`;

  const payLabel = paid
    ? t(`Booket — kvittering sendt til ${email}`, `Booked — receipt sent to ${email}`)
    : unit === null
      ? t(
          `Velg ${isCourts ? "en bane" : "et bord"} for å fortsette`,
          `Pick ${isCourts ? "a court" : "a table"} to continue`,
        )
      : t(
          `Betal ${venue.price} kr med ${method === "vipps" ? "Vipps" : "kort"}`,
          `Pay ${venue.price} kr by ${method === "vipps" ? "Vipps" : "card"}`,
        );

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1080px] items-center gap-4 px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            aria-label={
              fromMember ? t("Tilbake til hjemmesiden", "Back to your home page") : t("Tilbake", "Back")
            }
            className="grid h-[42px] w-[42px] shrink-0 cursor-pointer place-items-center rounded-full border border-ink/22 text-lg text-ink transition-colors duration-300 hover:bg-ink/10"
          >
            ←
          </button>
          <div className="min-w-0 flex-1">
            <div className="font-heading text-[19px] font-extrabold tracking-[-0.02em]">
              {venue.name}
            </div>
            <div className="text-[13px] text-ink/60">
              {venue.venue} · {venue.count} {unitPlural} · {venue.city}
            </div>
          </div>
          <button
            type="button"
            onClick={toggleLang}
            className="hidden cursor-pointer rounded-full border border-ink/20 px-3.5 py-2 font-heading text-xs font-extrabold tracking-[0.08em] text-ink transition-colors hover:bg-ink/10 sm:block"
          >
            {isEn ? "NO" : "EN"}
          </button>
          <span className="inline-flex items-center gap-2 rounded-full border border-grass/35 bg-grass/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-moss">
            <span className="kz-pulse h-[7px] w-[7px] rounded-full bg-grass" />
            {t("Åpen nå", "Open now")}
          </span>
        </div>
      </header>

      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="kz-drift-slow pointer-events-none absolute left-[20%] top-[-180px] -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.5),rgba(116,205,133,0)_70%)] blur-[34px]"
        />

        <main className="mx-auto grid max-w-[1080px] gap-5.5 px-5 pb-20 pt-8 sm:px-6">
          {/* Venue summary + facts */}
          <section className="grid gap-5.5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="relative overflow-hidden rounded-[36px] border border-ink/14 bg-white">
              {/* The design drops a photo of the hall in here. */}
              <div className="grid h-[330px] place-items-center bg-[linear-gradient(160deg,#eaf7ed,#d9f2e0)] text-center">
                <span className="px-6 text-sm text-ink/45">
                  {t("Bilde av hallen", "Photo of the hall")}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3.5 px-6 py-5.5">
                <div>
                  <div className="font-heading text-[22px] font-extrabold tracking-[-0.02em]">
                    {venue.venue}
                  </div>
                  <div className="mt-1 text-sm text-ink/60">{venue.address}</div>
                </div>
                <a
                  href="#hall"
                  className="rounded-full border border-ink/25 px-5 py-3 font-heading text-sm font-extrabold text-ink transition-colors duration-300 hover:bg-ink/10"
                >
                  {t("Se hallen", "See the hall")}
                </a>
              </div>
            </div>

            <div className="grid content-start gap-4.5 rounded-[36px] border border-ink/14 bg-white p-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-moss">
                  {t("Om hallen", "About the hall")}
                </div>
                <p className="mb-0 mt-3 text-[15px] leading-[1.65] text-ink/75">
                  {venue.about[lang]}
                </p>
              </div>

              <div className="grid gap-3">
                <Fact label={t("Pris per time", "Price per hour")} value={`${venue.price} kr`} />
                <Fact
                  label={t("Medlemspris", "Member price")}
                  value={`${venue.member} kr`}
                  accent
                />
                <Fact label={t("Åpningstid", "Opening hours")} value="16–22" />
                <Fact
                  label={t("Avbestilling", "Cancellation")}
                  value={t("Gratis inntil 2 t før", "Free up to 2 h before")}
                  last
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {AMENITIES.map((item) => (
                  <span
                    key={item.no}
                    className="rounded-full bg-ink/8 px-3.5 py-1.5 text-[13px]"
                  >
                    {item[lang]}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Date + time */}
          <section className="rounded-[36px] border border-ink/14 bg-white p-7">
            <div className="font-heading text-xl font-extrabold tracking-[-0.02em]">
              {t("Velg dato", "Pick a date")}
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {BOOKING_DATES.map((date, i) => (
                <button
                  key={date.no}
                  type="button"
                  onClick={() => {
                    setDateIndex(i);
                    setUnit(null);
                    setPaid(false);
                  }}
                  className={chipClass(i === dateIndex)}
                >
                  {date[lang]}
                </button>
              ))}
            </div>

            <div className="mt-7 font-heading text-xl font-extrabold tracking-[-0.02em]">
              {t("Velg tidspunkt", "Pick a time")}
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {BOOKING_TIMES.map((slot, i) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    setTimeIndex(i);
                    setUnit(null);
                    setPaid(false);
                  }}
                  className={chipClass(i === timeIndex)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </section>

          {/* Hall map */}
          <section id="hall" className="rounded-[36px] border border-ink/14 bg-white p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="font-heading text-xl font-extrabold tracking-[-0.02em]">
                  {isCourts
                    ? t("Oversikt over banene", "Court overview")
                    : t("Oversikt over hallen", "Hall overview")}
                </div>
                <div className="mt-1 text-sm text-ink/60">
                  {t(
                    `Trykk på ${isCourts ? "en ledig bane" : "et ledig bord"} for å velge det.`,
                    `Tap ${isCourts ? "a free court" : "a free table"} to select it.`,
                  )}
                </div>
              </div>
              <div className="font-heading text-sm font-extrabold text-moss">
                {t(
                  `${free} av ${venue.count} ${unitPlural} ledige kl. ${time}`,
                  `${free} of ${venue.count} ${unitPlural} free at ${time}`,
                )}
              </div>
            </div>

            <div className="mt-5 rounded-[28px] border border-ink/10 bg-[linear-gradient(160deg,#eaf7ed,#d9f2e0)] p-5.5">
              <div className="mb-4.5 flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-3 flex-1 rounded-full bg-ink/10" />
                ))}
              </div>

              <div className="flex items-stretch gap-5">
                <div className="grid shrink-0 basis-24 place-items-center rounded-[20px] border border-dashed border-ink/22 p-2.5 text-center text-xs uppercase tracking-[0.1em] text-ink/50">
                  {t("Tribune", "Stands")}
                </div>
                <div className="grid min-w-0 flex-1 grid-cols-3 gap-3 sm:grid-cols-5">
                  {Array.from({ length: venue.count }, (_, i) => i + 1).map((n) => {
                    const isTaken = taken.has(n);
                    const selected = unit === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        disabled={isTaken}
                        onClick={() => {
                          setUnit(selected ? null : n);
                          setPaid(false);
                        }}
                        className={`flex aspect-[1/0.82] flex-col items-center justify-center gap-1 rounded-[18px] font-body transition-all duration-300 ${
                          isTaken
                            ? "cursor-not-allowed border border-ink/12 bg-white text-ink/35"
                            : selected
                              ? "-translate-y-[3px] cursor-pointer border border-moss bg-grass text-ink shadow-[0_14px_34px_rgba(116,205,133,0.34)]"
                              : "cursor-pointer border border-ink/22 bg-ink/14 text-ink hover:bg-ink/20"
                        }`}
                      >
                        <span className="font-heading text-base font-extrabold">{n}</span>
                        <span className="text-[11px] uppercase tracking-[0.06em]">
                          {isTaken
                            ? t("Opptatt", "Taken")
                            : selected
                              ? t("Valgt", "Chosen")
                              : t("Ledig", "Free")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4.5 flex flex-wrap items-center justify-between gap-3">
                <div className="rounded-[20px] bg-ink/7 px-4.5 py-3 text-xs uppercase tracking-[0.1em] text-ink/55">
                  {t("Inngang", "Entrance")}
                </div>
                <div className="flex flex-wrap gap-4.5 text-[13px] text-ink/70">
                  <Legend swatch="bg-ink/16" label={t("Ledig", "Free")} />
                  <Legend swatch="bg-grass" label={t("Valgt", "Chosen")} />
                  <Legend swatch="bg-ink/6 border border-ink/14" label={t("Opptatt", "Taken")} />
                </div>
              </div>
            </div>
          </section>

          {/* Contact + payment */}
          <section className="rounded-[36px] border border-ink/14 bg-white p-7">
            <div className="font-heading text-xl font-extrabold tracking-[-0.02em]">
              {t("Kontakt og betaling", "Contact and payment")}
            </div>
            <div className="mt-1.5 text-sm text-ink/60">{summary}</div>

            <label
              htmlFor="booking-email"
              className="mt-5.5 block text-[13px] uppercase tracking-[0.06em] text-ink/55"
            >
              {t("E-postadresse", "Email address")}
            </label>
            <input
              id="booking-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setPaid(false);
              }}
              placeholder={t("navn@epost.no", "name@email.com")}
              className="mt-2.5 box-border w-full rounded-full border border-ink/25 bg-ink/7 px-5.5 py-4 text-base text-ink outline-none transition-colors focus:border-grass focus:bg-ink/12"
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <PayOption
                active={method === "vipps"}
                onClick={() => setMethod("vipps")}
                title={t("Betal med Vipps", "Pay with Vipps")}
                note={t("Bekreft i Vipps-appen", "Confirm in the Vipps app")}
              />
              <PayOption
                active={method === "card"}
                onClick={() => setMethod("card")}
                title={t("Betal med kort", "Pay by card")}
                note={t("Visa eller Mastercard", "Visa or Mastercard")}
              />
            </div>

            <button
              type="button"
              disabled={!ready}
              onClick={() => ready && setPaid(true)}
              className={`mt-4.5 w-full rounded-full border-0 px-6 py-5 font-heading text-base font-extrabold transition-all duration-300 ${
                ready
                  ? "cursor-pointer bg-grass text-ink shadow-[0_16px_40px_rgba(116,205,133,0.32)] hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-ink/12 text-ink/45"
              }`}
            >
              {payLabel}
            </button>

            <div className="mt-3.5 text-[13px] text-ink/50">
              {t(
                "Kvittering og hallkode kommer på e-post. Gratis avbestilling inntil to timer før.",
                "The receipt and door code arrive by email. Free cancellation up to two hours before.",
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Fact({ label, value, accent = false, last = false }) {
  return (
    <div
      className={`flex justify-between gap-3 text-sm ${
        last ? "" : "border-b border-ink/12 pb-3"
      }`}
    >
      <span className="text-ink/60">{label}</span>
      <span className={`font-heading font-extrabold ${accent ? "text-moss-deep" : ""}`}>
        {value}
      </span>
    </div>
  );
}

function Legend({ swatch, label }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${swatch}`} />
      {label}
    </span>
  );
}

function PayOption({ active, onClick, title, note }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer flex-col items-start gap-1 rounded-3xl px-5.5 py-4.5 text-left transition-colors duration-300 ${
        active
          ? "border border-grass bg-grass/16 text-ink"
          : "border border-ink/18 bg-ink/6 text-ink hover:bg-ink/10"
      }`}
    >
      <span className="font-heading text-[15px] font-extrabold">{title}</span>
      <span className="text-[13px] opacity-70">{note}</span>
    </button>
  );
}
