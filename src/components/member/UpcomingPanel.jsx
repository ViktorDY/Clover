import { useLang } from "../../lib/langContext";

// 1 September 2026 falls on a Tuesday, so the grid starts with one blank.
const LEAD_BLANKS = 1;
const DAYS_IN_MONTH = 30;
const TODAY = 12;

function tagFor(kind, t) {
  if (kind === "signed") {
    return {
      label: t("påmeldt", "signed up"),
      className: "bg-grass/28 text-ink",
    };
  }
  if (kind === "dugnad") {
    return {
      label: t("dugnad", "volunteer"),
      className: "bg-amber/30 text-amber-ink",
    };
  }
  return {
    label: t("svar mangler", "no answer"),
    className: "bg-amber/30 text-amber-ink",
  };
}

export default function UpcomingPanel({ activities, calOpen, onToggleCalendar }) {
  const { t } = useLang();

  const weekdays = t("M T O T F L S", "M T W T F S S").split(" ");

  // Which days of the month have something on them, and what kind.
  const eventDays = {};
  activities.forEach((activity) => {
    eventDays[parseInt(activity.day, 10)] = activity.kind;
  });

  const cells = [];
  for (let i = 0; i < LEAD_BLANKS; i++) {
    cells.push({ key: `blank-${i}`, label: "", blank: true });
  }
  for (let day = 1; day <= DAYS_IN_MONTH; day++) {
    cells.push({
      key: `day-${day}`,
      label: String(day),
      isToday: day === TODAY,
      hasEvent: eventDays[day] !== undefined,
    });
  }

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
        style={{ maxHeight: calOpen ? "340px" : "0px", opacity: calOpen ? 1 : 0 }}
      >
        <div className="mt-5 rounded-3xl border border-ink/10 bg-mute p-4.5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-heading text-[15px] font-extrabold">September 2026</span>
            <span className="text-[13px] text-ink/60">
              {activities.length}{" "}
              {t(
                activities.length === 1 ? "aktivitet" : "aktiviteter",
                activities.length === 1 ? "activity" : "activities",
              )}
            </span>
          </div>

          <div className="mb-1.5 grid grid-cols-7 gap-1.5 text-center text-xs text-ink/55">
            {weekdays.map((day, i) => (
              <span key={`${day}-${i}`}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((cell) =>
              cell.blank ? (
                <div key={cell.key} className="h-[34px]" />
              ) : (
                <div
                  key={cell.key}
                  className={`grid h-[34px] place-items-center rounded-xl text-[13px] transition-colors duration-300 ${
                    cell.isToday
                      ? "bg-ink font-bold text-paper"
                      : cell.hasEvent
                        ? "bg-grass/35 font-semibold text-ink"
                        : "bg-white text-ink/60"
                  }`}
                >
                  {cell.label}
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {activities.map((activity, i) => {
          const tag = tagFor(activity.kind, t);
          return (
            <div
              key={`${activity.club}-${activity.day}-${i}`}
              className="flex items-center gap-4 rounded-3xl border border-ink/10 bg-mute px-4.5 py-4 transition-all duration-300 hover:translate-x-[3px] hover:bg-grass-tint"
            >
              <div className="w-[52px] shrink-0 text-center">
                <div className="font-heading text-xl font-extrabold leading-none">
                  {activity.day}
                </div>
                <div className="text-[11px] uppercase tracking-[0.1em] text-ink/55">sep</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-heading text-[17px] font-extrabold">{activity.title}</div>
                <div className="mt-0.5 text-sm text-ink/65">{activity.meta}</div>
              </div>
              <span
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold ${tag.className}`}
              >
                {tag.label}
              </span>
            </div>
          );
        })}

        {activities.length === 0 && (
          <div className="rounded-3xl border border-ink/10 bg-mute px-4.5 py-4 text-sm text-ink/60">
            {t("Ingen aktiviteter her ennå.", "Nothing scheduled here yet.")}
          </div>
        )}
      </div>
    </div>
  );
}
