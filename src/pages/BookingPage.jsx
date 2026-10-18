import { useMemo, useState } from "react";
import {
  DEFAULT_INCLUDES,
  getVenue,
  takenUnits,
  useVenueStore,
  venueCanBook,
  venueHoursFor,
  venueIsClosed,
  venueLeadDays,
  venueManualTaken,
  venueSlotsFor,
  venueUnitAudience,
  venueUnitsOff,
} from "../lib/clubs";
import { useLang } from "../lib/langContext";
import pick from "../lib/pick";
import "../styles/member.css";

const DAY_NO = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];
const DAY_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON_NO = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];
const MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Fallback times for a venue the store knows nothing about.
const FALLBACK_TIMES = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

function isoOf(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

/*
  The bookable days: from today and as far ahead as the venue allows,
  skipping days it is closed or has no opening hours, at most seven chips.
*/
function bookableDays(venueRules, fromMember) {
  const lead = venueLeadDays(venueRules, fromMember);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const out = [];
  for (let k = 0; k < lead && out.length < 7; k++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + k);
    const weekday = (date.getDay() + 6) % 7;
    const iso = isoOf(date);
    if (venueRules && (venueIsClosed(venueRules, iso) || !venueHoursFor(venueRules, weekday))) {
      continue;
    }
    out.push({
      iso,
      weekday,
      label: {
        no: `${DAY_NO[date.getDay()]} ${date.getDate()}. ${MON_NO[date.getMonth()]}`,
        en: `${DAY_EN[date.getDay()]} ${date.getDate()} ${MON_EN[date.getMonth()]}`,
      },
    });
  }
  return out;
}

export default function BookingPage({ slug, fromMember, onBack }) {
  const { t, lang, isEn, toggleLang } = useLang();
  const venue = getVenue(slug);
  const store = useVenueStore();
  const rules = store[venue.slug] || null;

  const [dateIndex, setDateIndex] = useState(0);
  const [timeIndex, setTimeIndex] = useState(1);
  const [unit, setUnit] = useState(null);
  const [method, setMethod] = useState("vipps");
  const [email, setEmail] = useState("");
  const [paid, setPaid] = useState(false);

  const days = useMemo(() => bookableDays(rules, fromMember), [rules, fromMember]);
  const dayIdx = Math.min(dateIndex, Math.max(0, days.length - 1));
  const day = days[dayIdx] || { iso: isoOf(new Date()), weekday: 0, label: { no: "", en: "" } };

  const times = rules ? venueSlotsFor(rules, day.weekday, day.iso) : FALLBACK_TIMES;
  const timeIdx = Math.min(timeIndex, Math.max(0, times.length - 1));
  const time = times[timeIdx] || "";

  const taken = useMemo(
    () => takenUnits(venue.count, dayIdx, timeIdx),
    [venue.count, dayIdx, timeIdx],
  );

  const unitPlural = venue.unit[lang];
  const unitSingular = venue.unitOne[lang];
  const isCourts = venue.courts;
  const closed = venueIsClosed(rules, day.iso);
  const hours = rules ? venueHoursFor(rules, day.weekday) : null;
  const basePrice = rules ? rules.price : venue.price;
  const memberPrice = rules ? rules.memberPrice : venue.member;
  const price = fromMember && memberPrice ? memberPrice : basePrice;
  const cancelHours = rules && rules.cancelHours != null ? rules.cancelHours : 2;

  // Units that are closed today, booked by hand in the admin, or kept for members.
  const unitsOff = new Set(rules ? venueUnitsOff(rules, day.weekday) : []);
  const manual = rules ? venueManualTaken(rules, day.iso, time) : [];
  const allUnits = Array.from({ length: venue.count }, (_, i) => i + 1);
  const memberOnly = rules
    ? allUnits.filter((n) => venueUnitAudience(rules, n, day.weekday) === "members")
    : [];

  const stateOf = (n) => {
    if (unitsOff.has(n)) return "off";
    if (memberOnly.includes(n) && !fromMember) return "members";
    if (manual.includes(n) || taken.has(n)) return "taken";
    return unit === n ? "selected" : "free";
  };
  const statusLabel = {
    off: t("Stengt", "Closed"),
    members: t("Stengt for besøkende", "Members only"),
    taken: t("Opptatt", "Taken"),
    selected: t("Valgt", "Chosen"),
    free: t("Ledig", "Free"),
  };

  const guestLocked = fromMember
    ? []
    : memberOnly.filter((n) => !unitsOff.has(n) && !taken.has(n));
  const free =
    venue.count -
    taken.size -
    Array.from(unitsOff).filter((n) => !taken.has(n)).length -
    guestLocked.length;

  const allowed = venueCanBook(rules, time, fromMember);
  const ready = allowed && unit !== null && /.+@.+\..+/.test(email);

  const pickUnit = (n) => {
    const state = stateOf(n);
    if (state !== "free" && state !== "selected") return;
    setUnit(state === "selected" ? null : n);
    setPaid(false);
  };

  const chipClass = (active) =>
    `cursor-pointer rounded-full px-5 py-3 font-heading text-[14px] font-extrabold transition-all duration-300 ${
      active
        ? "border border-grass bg-grass text-ink shadow-[0_10px_28px_rgba(116,205,133,0.3)]"
        : "border border-ink/20 bg-ink/7 text-ink hover:bg-ink/12"
    }`;

  const openLabel = closed
    ? t("Stengt denne dagen", "Closed this day")
    : hours
      ? `${t("Åpent", "Open")} ${hours[0]}–${hours[1]}`
      : t("Åpen nå", "Open now");

  const includes =
    rules && rules.includes && rules.includes.length ? rules.includes : DEFAULT_INCLUDES;

  const audienceNote = allowed
    ? ""
    : rules && rules.audience === "members"
      ? t(
          "Bare medlemmer kan booke her. Logg inn som medlem for å booke.",
          "Only members can book here. Log in as a member to book.",
        )
      : t(
          `Kl. ${time} er forbeholdt medlemmer (${rules.memberWindow[0]}–${rules.memberWindow[1]}). Logg inn som medlem, eller velg et annet tidspunkt.`,
          `${time} is reserved for members (${rules.memberWindow[0]}–${rules.memberWindow[1]}). Log in as a member, or pick another time.`,
        );

  const summary =
    unit === null
      ? t(
          `Velg ${isCourts ? "en bane" : "et bord"} i hallen først.`,
          `Pick ${isCourts ? "a court" : "a table"} in the hall first.`,
        )
      : `${unitSingular} ${unit} · ${pick(day.label, lang)} ${t("kl.", "at")} ${time} · 1 ${t(
          "time",
          "hour",
        )} · ${price} kr`;

  const payLabel = paid
    ? t(`Booket — kvittering sendt til ${email}`, `Booked — receipt sent to ${email}`)
    : unit === null
      ? t(
          `Velg ${isCourts ? "en bane" : "et bord"} for å fortsette`,
          `Pick ${isCourts ? "a court" : "a table"} to continue`,
        )
      : t(
          `Betal ${price} kr med ${method === "vipps" ? "Vipps" : "kort"}`,
          `Pay ${price} kr by ${method === "vipps" ? "Vipps" : "card"}`,
        );

  return (
    <div className="kz-member min-h-screen overflow-x-hidden bg-paper font-body text-[15px] leading-[1.55] text-ink">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1080px] items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            aria-label={
              fromMember ? t("Tilbake til hjemmesiden", "Back to your home page") : t("Tilbake", "Back")
            }
            title={
              fromMember ? t("Tilbake til hjemmesiden", "Back to your home page") : t("Tilbake", "Back")
            }
            className="grid h-[42px] w-[42px] shrink-0 cursor-pointer place-items-center rounded-full border border-ink/22 text-[18px] text-ink transition-colors duration-300 hover:bg-ink/10"
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
            className="hidden cursor-pointer rounded-full border border-ink/20 px-3.5 py-2 font-heading text-[12px] font-extrabold tracking-[0.08em] text-ink transition-colors hover:bg-ink/10 sm:block"
          >
            {isEn ? "NO" : "EN"}
          </button>
          <span
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] ${
              closed
                ? "border border-[rgba(236,48,19,0.4)] bg-[rgba(236,48,19,0.1)] text-[#8a1a08]"
                : "border border-grass/35 bg-grass/15 text-moss"
            }`}
          >
            <span
              className={`h-[7px] w-[7px] rounded-full ${closed ? "bg-[#b8240e]" : "kz-pulse bg-grass"}`}
            />
            {openLabel}
          </span>
        </div>
      </header>

      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="kz-drift-slow pointer-events-none absolute left-[20%] top-[-180px] -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.5),rgba(116,205,133,0)_70%)] blur-[34px]"
        />

        <main className="mx-auto grid max-w-[1080px] gap-5.5 px-4 pb-20 pt-[34px] sm:px-6">
          {/* Venue summary + facts */}
          <section className="grid gap-5.5 min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="relative overflow-hidden rounded-[36px] border border-ink/14 bg-white">
              {/* The club drops a photo of the hall in here. */}
              <div className="grid h-[330px] place-items-center border-b border-dashed border-ink/20 bg-[#f3f4f1] text-center">
                <span className="grid justify-items-center gap-2.5 px-6 text-[13px] text-ink/60">
                  <PhotoIcon />
                  {t("Bilde av hallen legges inn av klubben", "The club adds a photo of the hall")}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3.5 px-6.5 py-5.5">
                <div>
                  <div className="font-heading text-[22px] font-extrabold tracking-[-0.02em]">
                    {venue.venue}
                  </div>
                  <div className="mt-1 text-[14px] text-ink/60">{venue.address}</div>
                </div>
                <a
                  href="#hall"
                  onClick={(e) => {
                    // Hash routing owns the URL hash, so scroll by hand.
                    e.preventDefault();
                    document.getElementById("hall")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full border border-ink/24 px-5.5 py-3 font-heading text-[14px] font-extrabold text-ink transition-colors duration-300 hover:bg-ink/10"
                >
                  {t("Se hallen", "See the hall")}
                </a>
              </div>
            </div>

            <div className="grid content-start gap-4.5 rounded-[36px] border border-ink/14 bg-white p-6.5">
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-moss">
                  {t("Om hallen", "About the hall")}
                </div>
                <p className="mb-0 mt-3 text-[15px] leading-[1.65] text-ink/75">
                  {rules && rules.about ? rules.about : venue.about[lang]}
                </p>
              </div>

              <div className="grid gap-3">
                <Fact label={t("Pris per time", "Price per hour")} value={`${basePrice} kr`} />
                <Fact
                  label={t("Medlemspris", "Member price")}
                  value={memberPrice ? `${memberPrice} kr` : "—"}
                  accent
                />
                <Fact
                  label={t("Åpningstid", "Opening hours")}
                  value={closed ? t("Stengt", "Closed") : hours ? `${hours[0]}–${hours[1]}` : "16–22"}
                />
                <Fact
                  label={t("Avbestilling", "Cancellation")}
                  value={
                    cancelHours === 0
                      ? t("Ingen gratis avbestilling", "No free cancellation")
                      : t(`Gratis inntil ${cancelHours} t før`, `Free up to ${cancelHours} h before`)
                  }
                  last
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {includes.map((item) => (
                  <span key={pick(item, "no")} className="rounded-full bg-ink/8 px-3.5 py-1.5 text-[13px]">
                    {pick(item, lang)}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Date + time */}
          <section className="rounded-[36px] border border-ink/14 bg-white p-6 sm:p-7">
            <div className="font-heading text-[20px] font-extrabold tracking-[-0.02em]">
              {t("Velg dato", "Pick a date")}
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {days.map((d, i) => (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => {
                    setDateIndex(i);
                    setUnit(null);
                    setPaid(false);
                  }}
                  className={chipClass(i === dayIdx)}
                >
                  {pick(d.label, lang)}
                </button>
              ))}
            </div>

            <div className="mt-7 font-heading text-[20px] font-extrabold tracking-[-0.02em]">
              {t("Velg tidspunkt", "Pick a time")}
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {times.map((slot, i) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    setTimeIndex(i);
                    setUnit(null);
                    setPaid(false);
                  }}
                  className={chipClass(i === timeIdx)}
                >
                  {slot}
                </button>
              ))}
            </div>

            {closed && (
              <div className="mt-3.5 rounded-[18px] border border-[rgba(236,48,19,0.35)] bg-[rgba(236,48,19,0.08)] px-4 py-3 text-[14px] text-[#8a1a08]">
                {rules && rules.note
                  ? rules.note
                  : t("Stedet er stengt for booking denne dagen.", "The venue is closed for booking this day.")}
              </div>
            )}
            {audienceNote && (
              <div className="mt-3 rounded-[18px] border border-[rgba(127,184,255,0.6)] bg-[rgba(127,184,255,0.16)] px-4 py-3 text-[14px] text-ink">
                {audienceNote}
              </div>
            )}
            {rules && (
              <div className="mt-3 text-[12.5px] text-ink/60">
                {t(
                  `Kan bookes inntil ${rules.leadDays || 14} dager fram · maks ${rules.maxHours || 2} t per booking`,
                  `Bookable up to ${rules.leadDays || 14} days ahead · max ${rules.maxHours || 2} h per booking`,
                )}
              </div>
            )}
          </section>

          {/* Hall map */}
          <section id="hall" className="scroll-mt-24 rounded-[36px] border border-ink/14 bg-white p-6 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="font-heading text-[20px] font-extrabold tracking-[-0.02em]">
                  {isCourts
                    ? t("Oversikt over banene", "Court overview")
                    : t("Oversikt over hallen", "Hall overview")}
                </div>
                <div className="mt-1 text-[14px] text-ink/60">
                  {t(
                    `Trykk på ${isCourts ? "en ledig bane" : "et ledig bord"} for å velge det.`,
                    `Tap ${isCourts ? "a free court" : "a free table"} to select it.`,
                  )}
                </div>
              </div>
              <div className="font-heading text-[14px] font-extrabold text-moss">
                {t(
                  `${free} av ${venue.count} ${unitPlural} ledige kl. ${time}`,
                  `${free} of ${venue.count} ${unitPlural} free at ${time}`,
                )}
              </div>
            </div>

            {venue.pitches ? (
              <PitchMap
                units={allUnits}
                stateOf={stateOf}
                statusLabel={statusLabel}
                onPick={pickUnit}
                label={(n) => `${unitSingular} ${n}`}
                clubhouse={t("Klubbhus", "Clubhouse")}
              />
            ) : (
              <div className="mt-5 rounded-[28px] border border-ink/10 bg-[linear-gradient(160deg,#eaf7ed,#d9f2e0)] p-4 sm:p-5.5">
                <div className="mb-4.5 flex gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-3 flex-1 rounded-full bg-ink/10" />
                  ))}
                </div>

                <div className="flex items-stretch gap-3 sm:gap-5">
                  <div className="hidden shrink-0 basis-24 place-items-center rounded-[20px] border border-dashed border-ink/22 p-2.5 text-center text-[12px] uppercase tracking-[0.1em] text-ink/50 sm:grid">
                    {t("Tribune", "Stands")}
                  </div>
                  <div className="grid min-w-0 flex-1 grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-3">
                    {allUnits.map((n) => {
                      const state = stateOf(n);
                      return (
                        <button
                          key={n}
                          type="button"
                          disabled={state === "taken" || state === "off" || state === "members"}
                          onClick={() => pickUnit(n)}
                          className={`flex aspect-[1/0.82] flex-col items-center justify-center gap-1 rounded-[18px] px-1 text-center font-body transition-all duration-300 ${UNIT_CLASS[state]}`}
                        >
                          <span className="font-heading text-[16px] font-extrabold">{n}</span>
                          <span className="text-[11px] uppercase leading-tight tracking-[0.06em]">
                            {statusLabel[state]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="rounded-[20px] bg-ink/7 px-4.5 py-3 text-[12px] uppercase tracking-[0.1em] text-ink/55">
                    {t("Inngang", "Entrance")}
                  </div>
                  <div className="flex flex-wrap gap-4.5 text-[13px] text-ink/70">
                    <Legend swatch="bg-ink/16" label={t("Ledig", "Free")} />
                    <Legend swatch="bg-grass" label={t("Valgt", "Chosen")} />
                    {!fromMember && memberOnly.length > 0 && (
                      <Legend
                        swatch="border border-dashed border-[#7fb8ff] bg-[rgba(127,184,255,0.25)]"
                        label={t("Kun medlemmer", "Members only")}
                      />
                    )}
                    <Legend swatch="bg-ink/6 border border-ink/14" label={t("Opptatt", "Taken")} />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Contact + payment */}
          <section className="rounded-[36px] border border-ink/14 bg-white p-6 sm:p-7">
            <div className="font-heading text-[20px] font-extrabold tracking-[-0.02em]">
              {t("Kontakt og betaling", "Contact and payment")}
            </div>
            <div className="mt-1.5 text-[14px] text-ink/60">{summary}</div>

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
              className="mt-2.5 box-border w-full rounded-full border border-ink/24 bg-ink/7 px-5.5 py-4 text-[16px] text-ink outline-none transition-colors focus:border-grass focus:bg-ink/12"
            />

            <div className="mt-4 grid gap-3 min-[900px]:grid-cols-2">
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
              className={`mt-4.5 w-full rounded-full border-0 px-6 py-5 font-heading text-[16px] font-extrabold transition-all duration-300 ${
                ready
                  ? "cursor-pointer bg-grass text-ink shadow-[0_16px_40px_rgba(116,205,133,0.32)] hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-ink/12 text-ink/45"
              }`}
            >
              {payLabel}
            </button>

            <div className="mt-3.5 text-[13px] text-ink/50">
              {t("Kvittering og hallkode kommer på e-post.", "The receipt and door code arrive by email.")}{" "}
              {cancelHours === 0
                ? t("Bookingen kan ikke avbestilles gratis.", "The booking cannot be cancelled for free.")
                : t(
                    `Gratis avbestilling inntil ${cancelHours} timer før.`,
                    `Free cancellation up to ${cancelHours} hours before.`,
                  )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const UNIT_CLASS = {
  free: "cursor-pointer border border-ink/22 bg-ink/14 text-ink hover:bg-ink/20",
  selected:
    "-translate-y-[3px] cursor-pointer border border-moss bg-grass text-ink shadow-[0_14px_34px_rgba(116,205,133,0.34)]",
  taken: "cursor-not-allowed border border-ink/12 bg-white text-ink/35",
  members:
    "cursor-not-allowed border border-dashed border-[#7fb8ff] bg-[rgba(127,184,255,0.25)] text-ink/60",
  off: "cursor-not-allowed border border-dashed border-ink/30 bg-[repeating-linear-gradient(135deg,rgba(22,36,26,0.05)_0_6px,rgba(22,36,26,0.12)_6px_12px)] text-ink/45",
};

const PITCH_CLASS = {
  free: "cursor-pointer border border-moss-deep bg-[linear-gradient(180deg,#3f9a58,#2c7a43)] text-white hover:-translate-y-0.5",
  selected:
    "-translate-y-[3px] cursor-pointer border-2 border-ink bg-[linear-gradient(180deg,#74cd85,#3f9a58)] text-ink shadow-[0_14px_34px_rgba(116,205,133,0.4)]",
  taken: "cursor-not-allowed border border-ink/20 bg-[linear-gradient(180deg,#b9c9bb,#a4b6a6)] text-ink/55",
  members: "cursor-not-allowed border border-dashed border-[#7fb8ff] bg-[linear-gradient(180deg,#b9c9bb,#a4b6a6)] text-ink/55",
  off: "cursor-not-allowed border border-dashed border-ink/40 bg-[repeating-linear-gradient(135deg,#9aa89b_0_8px,#8b998c_8px_16px)] text-ink",
};

/*
  Fana's three pitches drawn as a little site plan: two half-size pitches
  stacked on the left, the clubhouse in the middle and the big pitch on the
  right, each with its touch lines, centre circle and goal boxes.
*/
function PitchMap({ units, stateOf, statusLabel, onPick, label, clubhouse }) {
  const line = "pointer-events-none absolute border-white/75";
  return (
    <div className="mt-5 rounded-[28px] border border-ink/10 bg-[linear-gradient(160deg,#eaf7ed,#d9f2e0)] p-4 sm:p-5.5">
      <div className="grid h-[420px] grid-cols-[minmax(0,1.6fr)_44px_minmax(0,1fr)] grid-rows-2 gap-2.5 sm:grid-cols-[minmax(0,1.6fr)_72px_minmax(0,1fr)] sm:gap-3.5">
        {units.map((n) => {
          const state = stateOf(n);
          const big = n === 3;
          const place =
            n === 1 ? "col-start-1 row-start-1" : n === 2 ? "col-start-1 row-start-2" : "col-start-3 row-span-2 row-start-1";
          return (
            <button
              key={n}
              type="button"
              onClick={() => onPick(n)}
              title={`${label(n)} · ${statusLabel[state]}`}
              className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl font-body transition-all duration-300 ${place} ${PITCH_CLASS[state]}`}
            >
              <span aria-hidden="true" className={`${line} inset-2.5 rounded-md border-2`} />
              {big ? (
                <span aria-hidden="true" className={`${line} left-2.5 right-2.5 top-1/2 border-t-2`} />
              ) : (
                <span aria-hidden="true" className={`${line} bottom-2.5 left-1/2 top-2.5 border-l-2`} />
              )}
              <span
                aria-hidden="true"
                className={`${line} left-1/2 top-1/2 -ml-[26px] -mt-[26px] h-[52px] w-[52px] rounded-full border-2`}
              />
              {big ? (
                <>
                  <span aria-hidden="true" className={`${line} left-1/2 top-2.5 -ml-[30px] h-6 w-[60px] border-2 border-t-0`} />
                  <span aria-hidden="true" className={`${line} bottom-2.5 left-1/2 -ml-[30px] h-6 w-[60px] border-2 border-b-0`} />
                </>
              ) : (
                <>
                  <span aria-hidden="true" className={`${line} left-2.5 top-1/2 -mt-[30px] h-[60px] w-6 border-2 border-l-0`} />
                  <span aria-hidden="true" className={`${line} right-2.5 top-1/2 -mt-[30px] h-[60px] w-6 border-2 border-r-0`} />
                </>
              )}
              <span className="relative z-[1] block font-heading text-[16px] font-extrabold">{label(n)}</span>
              <span className="relative z-[1] mt-0.5 block text-[11px] uppercase tracking-[0.06em]">
                {statusLabel[state]}
              </span>
            </button>
          );
        })}
        <div className="col-start-2 row-span-2 row-start-1 grid rotate-180 place-items-center rounded-2xl bg-ink p-2 text-center text-[11px] uppercase tracking-[0.1em] text-paper [writing-mode:vertical-rl]">
          {clubhouse}
        </div>
      </div>
    </div>
  );
}

function PhotoIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.8" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function Fact({ label, value, accent = false, last = false }) {
  return (
    <div
      className={`flex justify-between gap-3 text-[14px] ${
        last ? "" : "border-b border-ink/12 pb-3"
      }`}
    >
      <span className="text-ink/60">{label}</span>
      <span className={`text-right font-heading font-extrabold ${accent ? "text-moss-deep" : ""}`}>
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
