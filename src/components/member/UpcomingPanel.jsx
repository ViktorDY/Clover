import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";

/*
  Upcoming activities, with the canvas's browsable calendar.

  The season runs September–December 2026 and "today" is 12 September, so
  September is where the calendar opens and the earliest month it will go
  back to. Days before today are dead; picking any other day lists what is
  on it underneath the grid.
*/
const YEAR = 2026;
const TODAY = 12;
const MIN_MONTH = 9;
const MAX_MONTH = 12;

const MONTHS_NO = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];
const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SHORT_NO = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];
const SHORT_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// The upcoming list is banded by how soon the day is.
function bandOf(day) {
  if (day === TODAY) return 0;
  if (day <= 20) return 1;
  if (day <= 27) return 2;
  return 3;
}

function tagFor(activity, rsvp, t) {
  if (activity.locked) {
    return { label: t("åpner senere", "opens later"), className: "bg-ink/7 text-ink/55" };
  }
  if (rsvp === "in") {
    return { label: t("du kommer", "you are coming"), className: "bg-grass/28 text-ink" };
  }
  if (rsvp === "out") {
    return { label: t("kan ikke", "declined"), className: "bg-ink/10 text-ink/65" };
  }
  if (activity.kind === "dugnad") {
    return { label: t("dugnad", "volunteer"), className: "bg-amber/30 text-amber-ink" };
  }
  return { label: t("svar mangler", "sign up"), className: "bg-amber/30 text-amber-ink" };
}

export default function UpcomingPanel({
  activities,
  showAll,
  clubShortOf,
  rsvp,
  onOpenActivity,
  calOpen,
  onToggleCalendar,
  calMonth,
  onMonthChange,
  calPick,
  onPickDay,
}) {
  const { t, lang, isEn } = useLang();

  const weekdays = t("M T O T F L S", "M T W T F S S").split(" ");
  const months = isEn ? MONTHS_EN : MONTHS_NO;
  const shortMonths = isEn ? SHORT_EN : SHORT_NO;

  const monthName = months[calMonth - 1];
  const monthLabel = `${isEn ? monthName : monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${YEAR}`;

  const monthActivities = activities.filter((activity) => activity.m === calMonth);

  // Which days of this month carry something.
  const busyDays = {};
  monthActivities.forEach((activity) => {
    busyDays[activity.day] = true;
  });

  const daysInMonth = new Date(YEAR, calMonth, 0).getDate();
  // JS weeks start on Sunday; the design's grid starts on Monday.
  const leadBlanks = (new Date(YEAR, calMonth - 1, 1).getDay() + 6) % 7;

  // The picked day, defaulting to today while September is on screen.
  const pickKey = calPick || (calMonth === MIN_MONTH ? `${MIN_MONTH}-${TODAY}` : "");
  const [pickMonth, pickDay] = pickKey
    ? pickKey.split("-").map((part) => parseInt(part, 10))
    : [calMonth, 0];

  const dayItems = activities.filter(
    (activity) => activity.m === pickMonth && activity.day === pickDay,
  );

  const dayTitle = pickKey
    ? t(`${pickDay}. ${SHORT_NO[pickMonth - 1]}`, `${pickDay} ${SHORT_EN[pickMonth - 1]}`)
    : t("Velg en dato", "Pick a date");

  const bandLabels = isEn
    ? ["Today", "This week", "Next week", "Upcoming"]
    : ["I dag", "Denne uken", "Neste uke", "Kommende"];

  const septemberActivities = activities.filter((activity) => activity.m === MIN_MONTH);
  const bands = bandLabels
    .map((label, band) => ({
      label,
      items:
        band === 3
          ? activities.filter(
              (activity) => activity.m > MIN_MONTH || bandOf(activity.day) === 3,
            )
          : septemberActivities.filter((activity) => bandOf(activity.day) === band),
    }))
    .filter((band) => band.items.length > 0);

  const navButton = (enabled) =>
    `grid h-[34px] w-[34px] flex-none place-items-center rounded-full text-[15px] transition-colors duration-300 ${
      enabled
        ? "cursor-pointer border border-ink/18 bg-white text-ink hover:bg-grass-tint"
        : "cursor-not-allowed border border-ink/10 bg-ink/4 text-ink/35"
    }`;

  const canGoBack = calMonth > MIN_MONTH;
  const canGoForward = calMonth < MAX_MONTH;

  return (
    <div className="rounded-panel border border-ink/12 bg-white p-6 sm:p-7">
      <div className="flex items-center gap-3.5">
        <h2 className="m-0 min-w-0 flex-1 font-heading text-2xl font-extrabold">
          {t("Kommende aktiviteter", "Upcoming activities")}
        </h2>
        <button
          type="button"
          onClick={onToggleCalendar}
          aria-expanded={calOpen}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/18 bg-mute px-4.5 py-2.5 font-heading text-[13px] font-extrabold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-grass-tint"
        >
          {calOpen ? t("Skjul kalender", "Hide calendar") : t("Kalender", "Calendar")}
        </button>
      </div>

      <div
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
        style={{ maxHeight: calOpen ? "620px" : "0px", opacity: calOpen ? 1 : 0 }}
      >
        <div className="mt-5 rounded-3xl border border-ink/10 bg-mute p-4.5">
          <div className="mb-3 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => canGoBack && onMonthChange(calMonth - 1)}
              disabled={!canGoBack}
              aria-label={t("Forrige måned", "Previous month")}
              className={navButton(canGoBack)}
            >
              ←
            </button>

            <span className="min-w-0 flex-1 text-center font-heading text-[15px] font-extrabold">
              {monthLabel}
            </span>

            <button
              type="button"
              onClick={() => canGoForward && onMonthChange(calMonth + 1)}
              disabled={!canGoForward}
              aria-label={t("Neste måned", "Next month")}
              className={navButton(canGoForward)}
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
            {weekdays.map((day, i) => (
              <span key={`${day}-${i}`}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: leadBlanks }, (_, i) => (
              <div key={`blank-${i}`} className="h-[34px]" />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const past = calMonth === MIN_MONTH && day < TODAY;
              const isToday = calMonth === MIN_MONTH && day === TODAY;
              const picked = pickKey === `${calMonth}-${day}`;

              return (
                <button
                  key={`day-${calMonth}-${day}`}
                  type="button"
                  disabled={past}
                  onClick={() => onPickDay(`${calMonth}-${day}`)}
                  className={`grid h-[34px] place-items-center rounded-xl border text-[13px] transition-colors duration-300 ${
                    past
                      ? "cursor-not-allowed border-transparent bg-ink/4 text-ink/30 opacity-55"
                      : "cursor-pointer"
                  } ${picked ? "border-moss-deep" : "border-transparent"} ${
                    past
                      ? ""
                      : isToday
                        ? "bg-ink font-bold text-paper"
                        : busyDays[day]
                          ? "bg-grass/35 font-semibold text-ink"
                          : "bg-white text-ink/60"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <div className="mb-2 font-heading text-[13px] font-extrabold text-ink/70">
              {dayTitle}
            </div>

            <div className="grid gap-2">
              {dayItems.map((activity) => (
                <button
                  key={`day-item-${activity.id}`}
                  type="button"
                  disabled={activity.locked}
                  onClick={() => onOpenActivity(activity.id)}
                  className={`flex w-full items-center gap-3 rounded-[18px] border px-4 py-3 text-left transition-colors duration-300 ${
                    activity.locked
                      ? "cursor-default border-ink/8 bg-[#f7f9f5] opacity-55"
                      : "cursor-pointer border-ink/12 bg-white hover:bg-grass-tint"
                  }`}
                >
                  <span className="flex-none font-heading text-[13px] font-extrabold">
                    {pick(activity.time, lang)}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {pick(activity.title, lang)}
                  </span>
                  <span className="flex-none text-[12px] text-ink/55">
                    {showAll ? `${clubShortOf(activity.club)} · ` : ""}
                    {pick(activity.place, lang)}
                  </span>
                </button>
              ))}

              {dayItems.length === 0 && (
                <div className="rounded-[18px] border border-ink/10 bg-white px-4 py-3 text-sm text-ink/60">
                  {t("Ingenting planlagt den dagen.", "Nothing planned that day.")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4.5">
        {bands.map((band) => (
          <div key={band.label}>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/50">
              {band.label}
            </div>

            <div className="grid gap-3">
              {band.items.map((activity) => {
                const tag = tagFor(activity, rsvp[activity.id], t);
                return (
                  <button
                    key={activity.id}
                    type="button"
                    disabled={activity.locked}
                    onClick={() => onOpenActivity(activity.id)}
                    className={`flex w-full items-center gap-4 rounded-3xl border px-4.5 py-4 text-left transition-all duration-300 ${
                      activity.locked
                        ? "cursor-not-allowed border-ink/8 bg-[#f7f9f5] opacity-45"
                        : "cursor-pointer border-ink/10 bg-mute hover:translate-x-[3px] hover:bg-grass-tint"
                    }`}
                  >
                    <div className="w-[52px] shrink-0 text-center">
                      <div className="font-heading text-xl font-extrabold leading-none">
                        {activity.day}
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.1em] text-ink/55">
                        {shortMonths[activity.m - 1]}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-heading text-[17px] font-extrabold">
                        {pick(activity.title, lang)}
                      </div>
                      <div className="mt-0.5 text-sm text-ink/65">
                        {showAll ? `${clubShortOf(activity.club)} · ` : ""}
                        {pick(activity.place, lang)} · {pick(activity.time, lang)}
                      </div>
                    </div>

                    <span
                      className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold ${tag.className}`}
                    >
                      {tag.label}
                    </span>
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
  );
}
