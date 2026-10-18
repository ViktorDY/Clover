import { useLang } from "../../lib/langContext";
import { useTimetableStore } from "../../lib/clubs";
import { MEMBER_CLUBS, clubShort, initialsOf } from "../../lib/memberData";
import useEscape from "./useEscape";

/*
  Ukeplan: each club's fixed weekly training timetable, in a sheet that
  slides down from the top. Reads the shared timetable store, so edits made
  in the administrator panel show up live.

  The time axis only covers hours that have sessions; a gap of empty hours
  between them is collapsed into a hatched break.
*/
const PX_PER_HOUR = 52;
const GAP_PX = 14;

const toMin = (time) => {
  const [h, m] = time.split(":");
  return parseInt(h, 10) * 60 + parseInt(m, 10);
};

function buildAxis(sessions) {
  const pxMin = PX_PER_HOUR / 60;
  const ranges = sessions
    .map((s) => [Math.floor(toMin(s[1]) / 60) * 60, Math.ceil(toMin(s[2]) / 60) * 60])
    .sort((a, b) => a[0] - b[0]);
  const segs = [];
  ranges.forEach((r) => {
    const last = segs[segs.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else segs.push([r[0], r[1]]);
  });
  if (!segs.length) segs.push([16 * 60, 20 * 60]);

  const tops = [];
  let total = 0;
  segs.forEach((g, i) => {
    tops.push(total);
    total += (g[1] - g[0]) * pxMin + (i < segs.length - 1 ? GAP_PX : 0);
  });
  const yOf = (m) => {
    for (let i = 0; i < segs.length; i++) {
      if (m >= segs[i][0] && m <= segs[i][1]) return tops[i] + (m - segs[i][0]) * pxMin;
    }
    return 0;
  };
  const pct = (y) => `${((y / total) * 100).toFixed(2)}%`;

  const marks = [];
  segs.forEach((g, i) => {
    const beforeBreak = i < segs.length - 1;
    for (let m = g[0]; m <= g[1]; m += 60) {
      marks.push({
        key: `h${i}-${m}`,
        label: beforeBreak && m === g[1] ? "" : `${String(m / 60).padStart(2, "0")}:00`,
        top: pct(yOf(m)),
      });
    }
    if (beforeBreak) {
      marks.push({ key: `brk${i}`, label: "", top: pct(tops[i] + (g[1] - g[0]) * pxMin + GAP_PX / 2), brk: true });
    }
  });
  return { yOf, total, marks, pct };
}

export default function WeekPlanDrawer({ open, club, planClub, onPlanClub, onClose }) {
  const { t, isEn } = useLang();
  const store = useTimetableStore();
  useEscape(onClose, open);

  const all = club === "all";
  const clubs = MEMBER_CLUBS.filter((c) => all || c.slug === club);
  const current = all ? (clubs.find((c) => c.slug === planClub) || clubs[0]).slug : club;
  const meta = MEMBER_CLUBS.find((c) => c.slug === current);
  const raw = store[current] || { groups: [], s: [] };
  const groups = (raw.groups || []).map((g) => ({ id: g.id, name: isEn ? g.en || g.no : g.no || g.en, color: g.color }));
  const sessions = raw.s || [];
  const axis = buildAxis(sessions);
  const groupOf = (id) => groups.find((g) => g.id === id) || { name: id, color: "#c9d8c4" };
  const dayNames = isEn
    ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    : ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
  const count = `${sessions.length}${t(" økter per uke · ", " sessions per week · ")}${groups.length}${t(" grupper", " groups")}`;

  const columns = dayNames.map((name, i) => {
    const day = sessions
      .filter((s) => s[0] === i)
      .map((s) => ({ a: toMin(s[1]), b: toMin(s[2]), s }))
      .sort((p, q) => p.a - q.a);
    // Overlapping sessions share the column side by side.
    const laneEnd = [];
    day.forEach((e) => {
      let lane = laneEnd.findIndex((end) => end <= e.a);
      if (lane === -1) {
        lane = laneEnd.length;
        laneEnd.push(e.b);
      } else laneEnd[lane] = e.b;
      e.lane = lane;
    });
    day.forEach((e) => {
      e.lanes = Math.max(1, day.filter((o) => o.a < e.b && o.b > e.a).reduce((m, o) => Math.max(m, o.lane + 1), 1));
    });
    return { name, i, items: day };
  });

  const navPill = (active) =>
    `cursor-pointer whitespace-nowrap rounded-full px-4.5 py-2.5 font-heading text-[13px] font-extrabold transition-colors duration-300 ${
      active ? "border border-ink bg-ink text-paper" : "border border-ink/20 bg-transparent text-ink hover:bg-ink/6"
    }`;

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`kz-plan-scrim fixed inset-0 z-[86] bg-ink/42 backdrop-blur-[6px] transition-opacity duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <section
        aria-label={t("Ukeplan", "Week plan")}
        aria-hidden={!open}
        inert={!open}
        className="kz-plan-sheet fixed left-1/2 top-0 z-[88] box-border flex h-[min(94vh,max(75vh,500px))] w-[min(1100px,94vw)] flex-col overflow-hidden rounded-b-[36px] bg-paper shadow-[0_34px_90px_rgba(22,36,26,0.3)] transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.75,0.18,1)] max-[600px]:w-screen max-[600px]:rounded-b-[28px]"
        style={{ transform: `translate(-50%, ${open ? "0" : "-105%"})` }}
      >
        <div className="flex flex-none flex-wrap items-center gap-3 border-b border-ink/10 bg-white px-5 pb-4 pt-5.5 sm:px-6.5">
          <div className="min-w-0 flex-1">
            <h2 className="m-0 font-heading text-[clamp(22px,3vw,30px)] font-extrabold">{t("Ukeplan", "Week plan")}</h2>
            <div className="mt-0.5 text-[13.5px] text-ink/75">
              {all ? t("Alle klubbene dine", "All your clubs") : clubShort(club)} ·{" "}
              {t("fast timeplan hver uke, alle grupper", "fixed weekly timetable, all groups")}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-ink/20 bg-white px-4 py-[9px] font-heading text-[13px] font-extrabold text-ink transition-colors hover:bg-grass-tint"
          >
            {t("Lukk", "Close")} <span className="text-xs">▴</span>
          </button>
        </div>

        <div className="flex min-h-0 flex-auto flex-col gap-3 overflow-hidden px-3 pb-4.5 pt-3.5 sm:px-[22px]">
          {all && clubs.length > 1 && (
            <div role="tablist" className="flex flex-none flex-wrap gap-2">
              {clubs.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  role="tab"
                  aria-selected={c.slug === current}
                  onClick={() => onPlanClub(c.slug)}
                  className={navPill(c.slug === current)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}

          <div className="flex min-h-0 min-w-0 flex-[1_1_0] flex-col rounded-3xl border border-ink/12 bg-white px-3 py-3 sm:px-4">
            {!(all && clubs.length > 1) && meta && (
              <div className="mb-2 flex flex-none items-center gap-2.5">
                <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-ink font-heading text-xs font-extrabold text-paper">
                  {initialsOf(meta.name)}
                </span>
                <h3 className="m-0 min-w-0 flex-1 font-heading text-lg font-extrabold">{meta.name}</h3>
                <span className="text-[13px] text-ink/75">{count}</span>
              </div>
            )}
            <div className="mb-2 flex flex-none flex-wrap items-center gap-1.5">
              {groups.map((g) => (
                <span key={g.id} className="rounded-full px-[11px] py-[5px] text-xs font-bold text-ink" style={{ background: g.color }}>
                  {g.name}
                </span>
              ))}
              <span className="flex-1" />
              <span className="text-[12.5px] text-ink/72">{count}</span>
            </div>

            <div className="kz-scroll flex min-h-0 flex-[1_1_0] flex-col overflow-x-auto overflow-y-hidden">
              <div className="flex min-h-0 min-w-[760px] flex-[1_1_0] flex-col">
                <div className="grid flex-none grid-cols-[52px_repeat(7,minmax(0,1fr))] gap-x-1.5 border-b-2 border-ink/14 pb-1">
                  <span />
                  {dayNames.map((name) => (
                    <span key={name} className="text-center font-heading text-[13px] font-extrabold">
                      {name}
                    </span>
                  ))}
                </div>
                <div className="relative grid min-h-[60px] flex-[1_1_0] grid-cols-[52px_repeat(7,minmax(0,1fr))] gap-x-1.5">
                  <div className="relative">
                    {axis.marks.map((mk) => (
                      <span
                        key={mk.key}
                        className="absolute right-2 -translate-y-1/2 text-[11px] text-ink/70"
                        style={{ top: mk.top }}
                      >
                        {mk.label}
                      </span>
                    ))}
                  </div>
                  {columns.map((col) => (
                    <div key={col.name} className={`relative rounded-[10px] ${col.i >= 5 ? "bg-[rgba(255,214,110,0.1)]" : "bg-mute-2"}`}>
                      {axis.marks.map((mk) =>
                        mk.brk ? (
                          <div
                            key={mk.key}
                            className="absolute left-0 right-0 h-1.5 rounded bg-[repeating-linear-gradient(135deg,rgba(22,36,26,0.1)_0_3px,transparent_3px_7px)]"
                            style={{ top: `calc(${mk.top} - 3px)` }}
                          />
                        ) : (
                          <div key={mk.key} className="absolute left-0 right-0 border-t border-dashed border-ink/10" style={{ top: mk.top }} />
                        ),
                      )}
                      {col.items.map((e, j) => {
                        const g = groupOf(e.s[3]);
                        const w = 100 / e.lanes;
                        return (
                          <div
                            key={`${col.i}-${j}`}
                            title={`${g.name} · ${col.name} ${e.s[1]}–${e.s[2]} · ${e.s[4]}`}
                            className="absolute box-border overflow-hidden rounded-lg px-1.5 py-[3px] text-ink shadow-[0_4px_10px_rgba(22,36,26,0.12)]"
                            style={{
                              top: `calc(${axis.pct(axis.yOf(e.a))} + 1px)`,
                              height: `calc(${axis.pct(axis.yOf(e.b) - axis.yOf(e.a))} - 2px)`,
                              left: `calc(${(e.lane * w).toFixed(2)}% + 2px)`,
                              width: `calc(${w.toFixed(2)}% - 4px)`,
                              background: g.color,
                            }}
                          >
                            <div className="truncate font-heading text-[11.5px] font-extrabold leading-[1.2]">{g.name}</div>
                            <div className="truncate text-[10.5px] leading-[1.2]">
                              {e.s[1]}–{e.s[2]}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
