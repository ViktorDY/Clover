import Hv from "../../Hv";
import { sx, list } from "../adminRuntime";

// Arrangementer › Planlegging: month calendar of tasks with tabs and filters
// (replaces the October kanban board). Renders `v` from adminPlanVals.
const CHEV = (
  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PLAIN =
  "display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 14px; border-radius: 10px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; cursor: pointer; white-space: nowrap";
const ROUND =
  "width: 38px; height: 38px; border-radius: 999px; border: 0; background: transparent; color: #16241a; cursor: pointer; display: grid; place-items: center";

function Arrow({ d }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PlanningView({ v }) {
  return (
    <div style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 24px; min-width: 0; box-sizing: border-box")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px")}>
        <h2 style={sx("flex: 1; min-width: 0; margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: clamp(22px, 2.4vw, 30px); letter-spacing: -.02em")}>{v.calTitle}</h2>
        <Hv as="button" type="button" onClick={v.calPrev} aria-label={v.tCalPrev} style={ROUND} hover="background: rgba(22,36,26,.07)">
          <Arrow d="M15 6l-6 6 6 6" />
        </Hv>
        <Hv
          as="button"
          type="button"
          onClick={v.calToday}
          style="height: 38px; padding: 0 16px; border-radius: 10px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; font-weight: 600; cursor: pointer"
          hover="background: #f4f8f2"
        >
          {v.tCalToday}
        </Hv>
        <Hv as="button" type="button" onClick={v.calNext} aria-label={v.tCalNext} style={ROUND} hover="background: rgba(22,36,26,.07)">
          <Arrow d="M9 6l6 6-6 6" />
        </Hv>
      </div>
      <div role="tablist" style={sx("display: flex; flex-wrap: wrap; gap: 4px; margin-top: 10px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
        {list(v.calTabs).map((ct, i) => (
          <button key={ct.key ?? i} type="button" role="tab" aria-selected={ct.sel} onClick={ct.pick} style={sx(ct.style)}>
            {ct.label} <span style={sx(ct.countStyle)}>{ct.count}</span>
          </button>
        ))}
      </div>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 10px")}>
        <label style={sx("position: relative; display: block; flex: 0 1 240px; min-width: 180px")}>
          <span style={sx("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>{v.tCalSearch}</span>
          <input
            type="search"
            value={v.calQ ?? ""}
            onChange={v.onCalQ}
            placeholder={v.tCalSearch}
            className="kza-fp"
            style={sx("width: 100%; box-sizing: border-box; height: 38px; padding: 0 36px 0 14px; border-radius: 10px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; font-family: var(--font-body); font-size: 14px; color: #16241a; outline: none")}
          />
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={sx("position: absolute; right: 12px; top: 11px")}>
            <circle cx="11" cy="11" r="7" fill="none" stroke="#4C5E50" strokeWidth="2" />
            <path d="M20 20l-4-4" stroke="#4C5E50" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </label>
        <button type="button" onClick={v.calToggleOpen} aria-pressed={v.calOpenOnlyAttr} style={sx(v.calOpenStyle)}>
          {v.tCalNotDone} {CHEV}
        </button>
        <Hv as="button" type="button" style={PLAIN} hover="background: #f4f8f2">
          {v.tCalStatus} {CHEV}
        </Hv>
        <button type="button" onClick={v.calToggleResp} aria-pressed={v.calRespAttr} style={sx(v.calRespStyle)}>
          {v.tCalResp} {CHEV}
        </button>
        <Hv as="button" type="button" style={PLAIN} hover="background: #f4f8f2">
          {v.tCalTeam} {CHEV}
        </Hv>
        <Hv as="button" type="button" style={PLAIN} hover="background: #f4f8f2">
          {v.tCalTags} {CHEV}
        </Hv>
        <Hv as="button" type="button" style={PLAIN} hover="background: #f4f8f2">
          {v.tCalMore} {CHEV}
        </Hv>
        <Hv as="button" type="button" onClick={v.calReset} style={PLAIN} hover="background: #f4f8f2">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          {v.tCalReset}
        </Hv>
      </div>
      <div style={sx("margin-top: 12px; border: 1px solid rgba(22,36,26,.12); border-radius: 16px; overflow: hidden; overflow-x: auto")}>
        <div style={sx("min-width: 720px")}>
          <div style={sx("display: grid; grid-template-columns: 46px repeat(7, minmax(0, 1fr)); background: #f4f8f2; border-bottom: 1px solid rgba(22,36,26,.12)")}>
            <span />
            {list(v.calDays).map((dn, i) => (
              <span key={dn.key ?? i} style={sx("padding: 8px 6px; text-align: center; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; border-left: 1px solid rgba(22,36,26,.1)")}>
                {dn.label}
              </span>
            ))}
          </div>
          {list(v.calWeeks).map((w, wi) => (
            <div key={w.key ?? wi} style={sx("display: grid; grid-template-columns: 46px repeat(7, minmax(0, 1fr)); border-bottom: 1px solid rgba(22,36,26,.1)")}>
              <span style={sx("padding: 8px 0 0; text-align: center; font-size: 12.5px; color: rgba(22,36,26,.5); background: #f4f8f2")}>{w.num}</span>
              {list(w.days).map((d, di) => (
                <div key={d.key ?? di} style={sx(d.cellStyle)}>
                  <div style={{ textAlign: "center" }}>
                    <span style={sx(d.numStyle)}>{d.n}</span>
                  </div>
                  <div style={sx("display: grid; gap: 3px; margin-top: 3px")}>
                    {list(d.tasks).map((tk, ti) => (
                      <span key={tk.key ?? ti} title={tk.tip} style={sx(tk.style)}>
                        {tk.title}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
