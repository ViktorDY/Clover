import { sx, list } from "../adminRuntime";

// Home page planner calendar (left column).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function PlannerCalendar({ v }) {
  return (
    <div data-dash-cal="" style={sx("border-radius: 30px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 24px; height: 100%; box-sizing: border-box")}>
      <div style={sx("font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #1f7a3a; margin-bottom: 6px")}>
        {v.tMyPlanner}
      </div>
      <div style={sx("display: flex; align-items: center; gap: 10px")}>
        <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 20px; margin: 0; flex: 1; min-width: 0")}>
          {v.calMonthLabel}
        </h2>
        <button type="button" onClick={v.calPrev} aria-label={v.tPrevMonth} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-size: 15px; cursor: pointer; transition: background .3s")} className="kza-h3">
          ←
        </button>
        <button type="button" onClick={v.calNext} aria-label={v.tNextMonth} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-size: 15px; cursor: pointer; transition: background .3s")} className="kza-h3">
          →
        </button>
      </div>
      <div style={sx("display: grid; grid-template-columns: repeat(7, minmax(0,1fr)); gap: 4px; margin-top: 16px")}>
        {list(v.calWeekdays).map((w, i1) => (
            <div key={w.key ?? i1} style={sx("text-align: center; font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.75); padding-bottom: 4px")}>
              {w.label}
            </div>
        ))}
        {list(v.calCells).map((c, i1) => (
            <button key={c.key ?? i1} type="button" onClick={c.pick} style={sx(c.style)}>
              {c.day}
            </button>
        ))}
      </div>
      <div style={sx("display: grid; gap: 8px; margin-top: 16px")}>
        <div style={sx("font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.75)")}>
          {v.calDayLabel}
        </div>
        {list(v.calDayDeadlines).map((dl, i1) => (
            <div key={dl.key ?? i1} role="button" tabIndex="0" onClick={dl.go} title={dl.goHint} style={sx(dl.style)} className="kza-hm">
              <div style={sx("display: flex; align-items: baseline; gap: 8px")}>
                <span style={sx("flex: 1; min-width: 0; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
                  {dl.title}
                </span>
                <span style={sx(dl.tagStyle)}>
                  {dl.tag}
                </span>
              </div>
              <div style={sx("font-size: 12.5px; color: rgba(22,36,26,.75); margin-top: 3px")}>
                {dl.meta}
              </div>
            </div>
        ))}
        {list(v.calDayActs).map((a, i1) => (
            <div key={a.key ?? i1} style={sx("border-radius: 18px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); padding: 12px 14px")}>
              <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
                {a.title}
              </div>
              <div style={sx("font-size: 12.5px; color: rgba(22,36,26,.75); margin-top: 2px")}>
                {a.meta}
              </div>
            </div>
        ))}
        {list(v.calDayEntries).map((e, i1) => (
            <div key={e.key ?? i1} style={sx("border-radius: 18px; background: #fff4cf; border: 1px solid #f2d27a; padding: 12px 14px")}>
              <div style={sx("display: flex; align-items: baseline; gap: 8px")}>
                <span style={sx("flex: 1; min-width: 0; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
                  {e.title}
                </span>
                <span style={sx("font-size: 12.5px; font-weight: 700; color: #6b4a00")}>
                  {e.time}
                </span>
              </div>
              {e.hasNote ? (
                <div style={sx("font-size: 13px; color: #4a3a12; margin-top: 4px")}>
                  {e.note}
                </div>
              ) : null}
              <div style={sx("display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px")}>
                {list(e.people).map((p, i2) => (
                    <span key={p.key ?? i2} style={sx("padding: 4px 10px; border-radius: 999px; background: rgba(255,255,255,.8); font-size: 12px; color: #3d2a00")}>
                      {p.name}
                    </span>
                ))}
              </div>
            </div>
        ))}
        {v.calDayEmpty ? (
          <div style={sx("font-size: 13.5px; color: rgba(22,36,26,.75)")}>
            {v.tNoActs}
          </div>
        ) : null}
        {v.calCanAdd ? (
          <>
            {v.calAddClosed ? (
            <button type="button" onClick={v.openCalAdd} style={sx("justify-self: start; margin-top: 4px; padding: 10px 18px; border-radius: 999px; border: 1px solid #1f7a3a; background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .3s")} className="kza-h3">
              {v.tAddToCal}
            </button>
          ) : null}
            {v.calAddOpen ? (
            <form onSubmit={v.saveCalEntry} style={sx("display: grid; gap: 10px; margin-top: 6px; border-radius: 22px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.12); padding: 16px")}>
              <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
                {v.tNewEntry}
              </div>
              <input type="text" required value={v.ceTitle ?? ""} onChange={v.onCeTitle} placeholder={v.tCeTitlePh} style={sx("width: 100%; box-sizing: border-box; padding: 12px 16px; border-radius: 16px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-fp" />
              <div style={sx("display: grid; grid-template-columns: minmax(0, 120px) minmax(0, 1fr); gap: 10px")}>
                <input type="time" required value={v.ceTime ?? ""} onChange={v.onCeTime} style={sx("width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 16px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} />
                <input type="text" value={v.ceNote ?? ""} onChange={v.onCeNote} placeholder={v.tCeNotePh} style={sx("width: 100%; box-sizing: border-box; padding: 12px 16px; border-radius: 16px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-fp" />
              </div>
              <div style={sx("font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.75)")}>
                {v.tShareWith}
              </div>
              <div style={sx("display: flex; flex-wrap: wrap; gap: 6px")}>
                {list(v.ceColleagues).map((c, i1) => (
                    <button key={c.key ?? i1} type="button" onClick={c.toggle} style={sx(c.style)}>
                      {c.label}
                    </button>
                ))}
              </div>
              <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px")}>
                <button type="submit" style={sx("padding: 11px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .3s")} className="kza-ha">
                  {v.ceSaveLabel}
                </button>
                <button type="button" onClick={v.closeCalAdd} style={sx("padding: 11px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer")}>
                  {v.tCancel}
                </button>
              </div>
            </form>
          ) : null}
          </>
        ) : null}
        {v.ceSentVisible ? (
          <div style={sx("border-radius: 16px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.5); padding: 10px 14px; font-size: 13px; color: #16241a")}>
            {v.ceSentText}
          </div>
        ) : null}
      </div>
    </div>
  );
}
