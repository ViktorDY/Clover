import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";
import { MONTHS_FULL, MONTHS_SHORT, TODAY, clubShort, dayMonth, nok } from "../../lib/memberData";

/*
  The dashboard's home page: upcoming activities (with the browsable
  calendar) on the left; the board's notice, volunteer shifts and payments
  on the right.

  The season runs September–December 2026 and "today" is 12 September, so
  September is where the calendar opens and the earliest month it goes back
  to. Days before today are dead; picking any other day lists what is on it.
*/
const MIN_MONTH = TODAY.m;
const MAX_MONTH = 12;

// The upcoming list is banded by how soon the day is.
function bandOf(activity) {
  if (activity.m > TODAY.m) return 3;
  if (activity.day === TODAY.day) return 0;
  if (activity.day <= 20) return 1;
  if (activity.day <= 27) return 2;
  return 3;
}

export default function HomeView({
  club,
  showAll,
  activities,
  rsvp,
  onOpenActivity,
  calOpen,
  onToggleCalendar,
  calMonth,
  onMonthChange,
  calPick,
  onPickDay,
  boardNotice,
  dugnad,
  payments,
  tourPays,
  dueTotal,
  onOpenPayment,
  onPayNow,
}) {
  const { t, lang, isEn } = useLang();
  const shortMonths = MONTHS_SHORT[lang];

  /* ---- Calendar ---------------------------------------------------------- */

  const monthName = MONTHS_FULL[lang][calMonth - 1];
  const monthLabel = `${isEn ? monthName : monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${TODAY.year}`;
  const monthActivities = activities.filter((a) => a.m === calMonth);
  const busy = {};
  const tourney = {};
  monthActivities.forEach((a) => {
    busy[a.day] = true;
    if (a.kind === "tournament") tourney[a.day] = true;
  });
  const daysInMonth = new Date(TODAY.year, calMonth, 0).getDate();
  const leadBlanks = (new Date(TODAY.year, calMonth - 1, 1).getDay() + 6) % 7;

  const pickKey = calPick || (calMonth === MIN_MONTH ? `${MIN_MONTH}-${TODAY.day}` : "");
  const [pickMonth, pickDay] = pickKey ? pickKey.split("-").map((p) => parseInt(p, 10)) : [calMonth, 0];
  const dayItems = activities.filter((a) => a.m === pickMonth && a.day === pickDay);

  const navButton = (enabled) =>
    `grid h-[34px] w-[34px] flex-none place-items-center rounded-full text-[15px] transition-colors duration-300 ${
      enabled
        ? "cursor-pointer border border-ink/18 bg-white text-ink hover:bg-grass-tint"
        : "cursor-not-allowed border border-ink/10 bg-ink/4 text-ink/35"
    }`;
  const canBack = calMonth > MIN_MONTH;
  const canForward = calMonth < MAX_MONTH;

  /* ---- Activity list ----------------------------------------------------- */

  const bandLabels = isEn
    ? ["Today", "This week", "Next week", "Upcoming"]
    : ["I dag", "Denne uken", "Neste uke", "Kommende"];
  const bands = bandLabels
    .map((label, band) => ({ label, items: activities.filter((a) => bandOf(a) === band) }))
    .filter((band) => band.items.length > 0);

  const tagFor = (a) => {
    const answer = rsvp[a.id];
    if (a.locked) return { label: t("åpner senere", "opens later"), cls: "bg-ink/7 text-ink/55" };
    if (answer === "in") return { label: t("du kommer", "you are coming"), cls: "bg-grass/32 text-ink" };
    if (answer === "out") return { label: t("kan ikke", "declined"), cls: "bg-ink/10 text-ink/60" };
    if (a.kind === "dugnad") return { label: t("dugnad", "volunteer"), cls: "bg-amber/30 text-amber-ink" };
    return null; // Unanswered: the green edge says it instead.
  };

  const replyBy = (a) => {
    const d = new Date(TODAY.year, a.m - 1, a.day - 2);
    return isEn
      ? `Reply by ${d.getDate()} ${MONTHS_SHORT.en[d.getMonth()]}`
      : `Svar innen ${d.getDate()}. ${MONTHS_SHORT.no[d.getMonth()]}`;
  };

  return (
    <div className="mt-4.5 grid items-stretch gap-4.5 min-[981px]:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
      {/* Upcoming activities */}
      <div className="relative min-[981px]:h-full min-[981px]:min-h-[520px]">
        <div className="box-border flex flex-col rounded-panel border border-ink/12 bg-white p-5 sm:p-[30px] min-[981px]:absolute min-[981px]:inset-0">
          <div className="flex flex-none items-center gap-3.5">
            <h2 className="m-0 min-w-0 flex-1 font-heading text-2xl font-extrabold">
              {t("Kommende aktiviteter", "Upcoming activities")}
            </h2>
            <button
              type="button"
              onClick={onToggleCalendar}
              aria-expanded={calOpen}
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-ink/18 bg-mute px-4.5 py-2.5 font-heading text-[13px] font-extrabold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-grass-tint"
            >
              {calOpen ? t("Skjul kalender", "Hide calendar") : t("Kalender", "Calendar")}
            </button>
          </div>

          <div
            className="flex-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
            style={{ maxHeight: calOpen ? "620px" : "0px", opacity: calOpen ? 1 : 0 }}
          >
            <div className="mt-5 rounded-3xl border border-ink/10 bg-mute p-3.5 sm:p-4.5">
              <div className="mb-3 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => canBack && onMonthChange(calMonth - 1)}
                  disabled={!canBack}
                  aria-label={t("Forrige måned", "Previous month")}
                  className={navButton(canBack)}
                >
                  ←
                </button>
                <span className="min-w-0 flex-1 text-center font-heading text-[15px] font-extrabold">
                  {monthLabel}
                </span>
                <button
                  type="button"
                  onClick={() => canForward && onMonthChange(calMonth + 1)}
                  disabled={!canForward}
                  aria-label={t("Neste måned", "Next month")}
                  className={navButton(canForward)}
                >
                  →
                </button>
              </div>

              <div className="mb-3 text-center text-[13px] text-ink/60">
                {monthActivities.length}{" "}
                {t(
                  monthActivities.length === 1 ? "aktivitet" : "aktiviteter",
                  monthActivities.length === 1 ? "activity" : "activities",
                )}
              </div>

              <div className="mb-1.5 grid grid-cols-7 gap-1.5 text-center text-xs text-ink/55">
                {t("M T O T F L S", "M T W T F S S")
                  .split(" ")
                  .map((d, i) => (
                    <span key={`${d}-${i}`}>{d}</span>
                  ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: leadBlanks }, (_, i) => (
                  <div key={`blank-${i}`} className="h-[34px]" />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const past = calMonth === MIN_MONTH && day < TODAY.day;
                  const isToday = calMonth === MIN_MONTH && day === TODAY.day;
                  const picked = calPick === `${calMonth}-${day}`;
                  const tour = tourney[day];
                  let tone = "bg-white text-ink/70";
                  if (isToday) tone = `bg-ink font-bold text-paper ${tour ? "shadow-[0_0_0_3px_#2F6FE0]" : ""}`;
                  else if (tour) tone = "bg-[#2F6FE0] font-bold text-white";
                  else if (busy[day]) tone = "bg-grass/34 font-semibold text-ink";
                  return (
                    <button
                      key={`day-${calMonth}-${day}`}
                      type="button"
                      disabled={past}
                      onClick={() => onPickDay(`${calMonth}-${day}`)}
                      className={`grid h-[34px] place-items-center rounded-xl border font-body text-[13px] transition-colors duration-300 ${
                        past
                          ? "cursor-not-allowed border-transparent bg-ink/4 text-ink/30 opacity-55"
                          : `cursor-pointer ${picked ? "border-moss" : "border-transparent"} ${tone}`
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-ink/12 pt-3.5">
                <div className="font-heading text-[15px] font-extrabold">
                  {pickKey ? dayMonth(pickDay, pickMonth, lang) : t("Velg en dato", "Pick a date")}
                </div>
                <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)] gap-2">
                  {dayItems.map((a) => (
                    <button
                      key={`day-item-${a.id}`}
                      type="button"
                      onClick={() => !a.locked && onOpenActivity(a.id)}
                      className={`box-border flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-left font-body text-ink transition-colors duration-300 ${
                        a.locked
                          ? "cursor-default border border-ink/8 bg-mute-2 opacity-55"
                          : "cursor-pointer border border-ink/12 bg-white hover:bg-grass-tint"
                      }`}
                    >
                      <span className="flex-none font-heading text-sm font-extrabold">{pick(a.time, lang)}</span>
                      <span className="min-w-0 flex-1 truncate text-sm">{pick(a.title, lang)}</span>
                      <span className="hidden flex-none text-[13px] text-ink/60 sm:inline">
                        {showAll ? `${clubShort(a.club)} · ` : ""}
                        {pick(a.place, lang)}
                      </span>
                    </button>
                  ))}
                  {dayItems.length === 0 && (
                    <div className="text-sm text-ink/60">
                      {t("Ingenting planlagt den dagen.", "Nothing planned that day.")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="kz-scroll mt-5 grid grid-cols-[minmax(0,1fr)] content-start gap-[22px] overflow-x-hidden min-[981px]:min-h-0 min-[981px]:flex-auto min-[981px]:overflow-y-auto min-[981px]:pr-1.5">
            {bands.map((band) => (
              <div key={band.label}>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.13em] text-ink/55">
                    {band.label}
                  </span>
                  <span className="h-px flex-1 bg-ink/12" />
                  <span className="text-xs text-ink/50">
                    {band.items.length}{" "}
                    {t(
                      band.items.length === 1 ? "aktivitet" : "aktiviteter",
                      band.items.length === 1 ? "activity" : "activities",
                    )}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2.5">
                  {band.items.map((a) => {
                    const answer = rsvp[a.id];
                    const tag = tagFor(a);
                    const edge = a.locked
                      ? ""
                      : a.kind === "tournament"
                        ? "border-l-[6px] border-l-[#2F6FE0]"
                        : !answer
                          ? "border-l-[6px] border-l-moss"
                          : "";
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => !a.locked && onOpenActivity(a.id)}
                        className={`box-border flex w-full items-center gap-3 rounded-3xl px-3.5 py-4 text-left font-body text-ink transition-all duration-300 sm:gap-4 sm:px-4.5 ${
                          a.locked
                            ? "cursor-not-allowed border border-ink/8 bg-mute-2 opacity-45"
                            : "cursor-pointer border border-ink/10 bg-mute hover:bg-grass-tint"
                        } ${edge}`}
                      >
                        <span
                          className={`box-border w-14 flex-none rounded-2xl py-[9px] text-center transition-colors duration-300 ${
                            answer === "in" ? "bg-[#bfe8c6]" : answer === "out" ? "bg-ink/12" : "bg-transparent"
                          }`}
                        >
                          <span className="block font-heading text-xl font-extrabold leading-none">{a.day}</span>
                          <span className="block text-[11px] uppercase tracking-[0.1em] text-ink/55">
                            {shortMonths[a.m - 1]}
                          </span>
                        </span>
                        <span className="min-w-0 flex-1 text-left">
                          <span className="block font-heading text-[17px] font-extrabold">{pick(a.title, lang)}</span>
                          <span className="mt-[3px] block text-[13.5px] font-bold text-amber-ink">{replyBy(a)}</span>
                          <span className="mt-0.5 block text-sm text-ink/65">
                            {showAll ? `${clubShort(a.club)} · ` : ""}
                            {pick(a.place, lang)} · {pick(a.time, lang)}
                            {a.fee ? (isEn ? ` · fee NOK ${a.fee}` : ` · avgift ${a.fee} kr`) : ""}
                          </span>
                        </span>
                        {tag && (
                          <span className={`flex-none whitespace-nowrap rounded-full px-[13px] py-[7px] text-xs font-semibold ${tag.cls}`}>
                            {tag.label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <div className="rounded-3xl border border-ink/10 bg-mute px-4.5 py-4 text-sm text-ink/60">
                {t("Ingen aktiviteter her ennå.", "Nothing scheduled here yet.")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="grid content-start gap-4.5">
        {boardNotice && (
          <div
            role="region"
            aria-label={t("Viktig fra styret", "Important from the board")}
            className="box-border w-full rounded-3xl border-[1.5px] border-[#FFD23F] bg-[#FFF3C2] px-4.5 py-4 shadow-[0_14px_34px_rgba(255,210,63,0.28)]"
          >
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="grid h-[30px] w-[30px] flex-none place-items-center rounded-full bg-[#FFD23F] text-ink">
                <BellIcon />
              </span>
              <span className="min-w-0 flex-1 font-heading text-sm font-extrabold tracking-[0.02em] text-ink">
                {t("Viktig fra styret", "Important from the board")}
              </span>
              <span className="flex-none rounded-full bg-ink px-2.5 py-[3px] text-[11px] font-bold text-[#FFF3C2]">
                {t("1 ny", "1 new")}
              </span>
            </div>
            <div className="mt-3 border-t border-ink/12 pt-2.5">
              <div className="font-heading text-[14.5px] font-extrabold leading-[1.25] text-ink">
                {pick(boardNotice.title, lang)}
              </div>
              <div className="mt-[3px] text-[13px] leading-[1.45] text-ink/78">{pick(boardNotice.text, lang)}</div>
              <div className="mt-1 text-[11.5px] text-ink/60">
                {showAll ? `${clubShort(boardNotice.club)} · ` : ""}
                {pick(boardNotice.when, lang)}
              </div>
            </div>
          </div>
        )}

        <div className="rounded-[30px] border border-grass/50 bg-grass/18 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/60">
            {t("Dugnad igjen", "Volunteer shifts left")}
          </div>
          <div className="mt-3 font-heading text-[26px] font-extrabold">
            {dugnad.length}{" "}
            {t(dugnad.length === 1 ? "vakt" : "vakter", dugnad.length === 1 ? "shift" : "shifts")}
          </div>
          <div className="mt-1.5 text-sm text-ink/72">
            {dugnad.length
              ? dugnad.map((d) => dayMonth(d.day, d.m, lang)).join(" · ")
              : t("Ingen igjen", "None left")}
          </div>
        </div>

        <div className="rounded-panel border border-ink/12 bg-white p-5 sm:p-7">
          <h2 className="mb-1.5 mt-0 font-heading text-[22px] font-extrabold">{t("Betalinger", "Payments")}</h2>
          <p className="mb-4.5 mt-0 text-sm text-ink/65">
            {showAll
              ? t("Kontingent og avgifter i alle klubbene dine.", "Fees and charges across all your clubs.")
              : t(`Kontingent og avgifter i ${clubShort(club)}.`, `Fees and charges in ${clubShort(club)}.`)}
          </p>

          <div className="relative isolate overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#16241a,#1d3a24_60%,#16241a)] p-6 text-paper shadow-[0_20px_44px_rgba(22,36,26,0.22)]">
            <div aria-hidden="true" className="pointer-events-none absolute -right-[70px] -top-[70px] -z-10 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.5),rgba(116,205,133,0)_70%)] blur-[18px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-[70px] -left-[50px] -z-10 h-[200px] w-[200px] rounded-full border-[1.5px] border-dashed border-[rgba(163,226,174,0.28)]" />
            <div aria-hidden="true" className="kz-dots-due pointer-events-none absolute inset-0 -z-10" />
            <div className="flex items-center gap-2.5">
              <span className="kz-pulse h-2 w-2 rounded-full bg-grass" />
              <div className="text-xs uppercase tracking-[0.12em] text-paper/66">{t("Å betale nå", "Due now")}</div>
            </div>
            <div className="mt-2.5 font-heading text-[34px] font-extrabold tracking-[-0.03em]">{dueTotal}</div>
            <div className="mt-1 text-[13px] text-paper/66">
              {(() => {
                const next = payments.find((p) => !p.paid);
                return next
                  ? t(`Neste forfall ${pick(next.due, "no")}`, `Next due ${pick(next.due, "en")}`)
                  : t("Alt er betalt", "Everything is paid");
              })()}
            </div>
            <button
              type="button"
              onClick={onPayNow}
              className="mt-4 w-full cursor-pointer rounded-full border-0 bg-grass px-5 py-[13px] font-heading text-sm font-extrabold text-ink transition-colors duration-300 hover:bg-grass-soft"
            >
              {t("Betal med Vipps", "Pay with Vipps")}
            </button>
          </div>

          <div className="kz-scroll mt-4 grid max-h-80 gap-2.5 overflow-y-auto pr-1.5">
            {tourPays.map((a) => (
              <PaymentRow
                key={`tour-${a.id}`}
                tournament
                onOpen={() => onOpenActivity(a.id)}
                title={`${showAll ? `${clubShort(a.club)} · ` : ""}${pick(a.title, lang)} ${t("(turneringsavgift)", "(tournament fee)")}`}
                date={
                  isEn
                    ? `Tournament ${a.day} ${MONTHS_SHORT.en[a.m - 1]} · pay in the event`
                    : `Turnering ${a.day}. ${MONTHS_SHORT.no[a.m - 1]} · betal i arrangementet`
                }
                amount={nok(a.fee, isEn)}
                paid={false}
              />
            ))}
            {payments.map((p) => (
              <PaymentRow
                key={p.id}
                onOpen={() => onOpenPayment(p.id)}
                title={`${showAll ? `${clubShort(p.club)} · ` : ""}${pick(p.title, lang)}`}
                date={pick(p.date, lang)}
                amount={nok(p.amount, isEn)}
                paid={p.paid}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentRow({ title, date, amount, paid, onOpen, tournament = false }) {
  const { t } = useLang();
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex w-full cursor-pointer items-center gap-3 border-0 border-b border-ink/10 bg-transparent py-3 pr-0 text-left font-body leading-[1.55] text-ink ${
        tournament ? "border-l-[6px] border-l-[#2F6FE0] pl-3.5" : "pl-0"
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold">{title}</span>
        <span className="mt-0.5 block text-[13px] text-ink/60">{date}</span>
      </span>
      <span className="whitespace-nowrap font-heading text-[15px] font-extrabold">{amount}</span>
      <span
        className={`flex-none whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
          paid ? "bg-grass/28 text-ink" : "bg-amber/32 text-amber-ink"
        }`}
      >
        {paid ? t("betalt", "paid") : t("ubetalt", "unpaid")}
      </span>
    </button>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}
