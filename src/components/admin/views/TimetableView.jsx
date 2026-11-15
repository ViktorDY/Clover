import { sx, list } from "../adminRuntime";

// Treningstider: weekly timetable editor (Nov 2026 design: season or single-week scope).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function TimetableView({ v }) {
  return (
    <div style={sx("margin-top: -30px; display: grid; gap: 14px")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
        {v.ttHasTabs ? (
          <div role="tablist" style={sx("display: flex; flex-wrap: wrap; gap: 8px")}>
            {list(v.ttTabs).map((t, i1) => (
                <button key={t.key ?? i1} type="button" role="tab" aria-selected={t.active} onClick={t.pick} style={sx(t.style)}>
                  {t.label}
                </button>
            ))}
          </div>
        ) : null}
        <span style={sx("flex: 1")} />
        <button type="button" onClick={v.ttReset} style={sx("padding: 10px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .3s")} className="kza-h3">
          {v.tTTReset}
        </button>
        <button type="button" onClick={v.ttNew} style={sx("padding: 11px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .3s")} className="kza-ha">
          {v.tTTNew}
        </button>
      </div>
      {v.ttSavedShow ? (
        <div style={sx("display: flex; align-items: center; gap: 10px; border-radius: 18px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.55); padding: 11px 16px; font-size: 14px; color: #16241a")}>
          <span style={sx("width: 8px; height: 8px; border-radius: 999px; background: #1f7a3a")} />
          {v.ttSavedText}
        </div>
      ) : null}
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; border-radius: 20px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.08); padding: 10px 12px")}>
        <div role="group" aria-label={v.tTTScope} style={sx("display: inline-flex; padding: 3px; border-radius: 999px; background: #ffffff; border: 1px solid rgba(22,36,26,.12)")}>
          {list(v.ttScopes).map((sc, i1) => (
              <button key={sc.key ?? i1} type="button" onClick={sc.pick} aria-pressed={sc.pressed} style={sx(sc.style)}>
                {sc.label}
              </button>
          ))}
        </div>
        {v.ttIsWeek ? (
          <>
            <div style={sx("display: inline-flex; align-items: center; gap: 4px")}>
            <button type="button" onClick={v.ttWkPrev} aria-label={v.tTTPrevWk} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 0; background: transparent; color: #16241a; cursor: pointer; display: grid; place-items: center")} className="kza-h1">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span style={sx("min-width: 150px; text-align: center; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
              {v.ttWkLabel}
            </span>
            <button type="button" onClick={v.ttWkNext} aria-label={v.tTTNextWk} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 0; background: transparent; color: #16241a; cursor: pointer; display: grid; place-items: center")} className="kza-h1">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
            <span style={sx(v.ttWkBadgeStyle)}>
            {v.ttWkBadge}
          </span>
            {v.ttWkHasOv ? (
            <button type="button" onClick={v.ttWkRevert} style={sx("padding: 8px 14px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-h3">
              {v.tTTWkRevert}
            </button>
          ) : null}
          </>
        ) : null}
        <span style={sx("flex: 1")} />
        <span style={sx("font-size: 13px; color: rgba(22,36,26,.7)")}>
          {v.ttScopeHelp}
        </span>
      </div>
      <div style={sx("border-radius: 28px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 18px 20px")}>
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 12px")}>
          <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 19px; margin: 0 8px 0 0")}>
            {v.ttClubName}
          </h2>
          {list(v.ttLegend).map((g, i1) => (
              <span key={g.key ?? i1} style={sx(g.style)}>
                {g.name}
              </span>
          ))}
          <form onSubmit={v.ttAddGroup} style={sx("display: flex; align-items: center; gap: 6px")}>
            <input type="text" value={v.ttGroupDraft ?? ""} onChange={v.onTTGroupDraft} placeholder={v.tTTGroupPh} style={sx("width: 130px; padding: 7px 12px; border-radius: 999px; border: 1px dashed rgba(22,36,26,.3); background: #f7f9f5; color: #16241a; font-family: var(--font-body); font-size: 12.5px; outline: none")} className="kza-f7" />
            <button type="submit" style={sx("padding: 7px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer")}>
              {v.tTTAddGroup}
            </button>
          </form>
          <span style={sx("flex: 1")} />
          <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.72)")}>
            {v.ttCount}
          </span>
        </div>
        <div style={sx("overflow-x: auto")}>
          <div style={sx("min-width: 760px")}>
            <div style={sx("display: grid; grid-template-columns: 52px repeat(7, minmax(0,1fr)); gap: 0 6px; padding-bottom: 6px; border-bottom: 2px solid rgba(22,36,26,.14)")}>
              <span />
              {list(v.ttDays).map((dn, i1) => (
                  <span key={dn.key ?? i1} style={sx("text-align: center; font-family: var(--font-heading); font-weight: 800; font-size: 13px")}>
                    {dn.name}
                  </span>
              ))}
            </div>
            <div style={sx(`position: relative; display: grid; grid-template-columns: 52px repeat(7, minmax(0,1fr)); gap: 0 6px; height: ${v.ttBodyH ?? ""}`)}>
              <div style={sx("position: relative")}>
                {list(v.ttHours).map((h, i1) => (
                    <span key={h.key ?? i1} style={sx(`position: absolute; right: 8px; top: ${h.top ?? ""}; transform: translateY(-50%); font-size: 11px; color: rgba(22,36,26,.7)`)}>
                      {h.label}
                    </span>
                ))}
              </div>
              {list(v.ttCols).map((c, i1) => (
                  <div key={c.key ?? i1} data-tt-day={c.day} onDoubleClick={c.addHere} title={v.tTTDblHint} style={sx(`position: relative; background: ${c.bg ?? ""}; border-radius: 10px`)}>
                    {list(v.ttHours).map((h, i2) => (
                        <div key={h.key ?? i2} style={sx(h.lineStyle)} />
                    ))}
                    {list(c.items).map((it, i2) => (
                        <button key={it.key ?? i2} type="button" onClick={it.edit} onPointerDown={it.down} onPointerMove={v.ttMove} onPointerUp={v.ttUp} onPointerCancel={v.ttCancelDrag} title={it.tip} style={sx(it.style)} className="kza-hk">
                          <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 11.5px; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                            {it.group}
                          </span>
                          <span style={sx("display: block; font-size: 11px; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                            {it.time}
                          </span>
                          <span style={sx("display: block; font-size: 10.5px; line-height: 1.25; opacity: .8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                            {it.place}
                          </span>
                        </button>
                    ))}
                  </div>
              ))}
            </div>
          </div>
        </div>
        <div style={sx("font-size: 12.5px; color: rgba(22,36,26,.7); margin-top: 10px")}>
          {v.tTTHelp}
        </div>
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(22,36,26,.1)")}>
          <span style={sx(v.ttDirtyDot)} />
          <span style={sx("font-size: 13.5px; color: rgba(22,36,26,.8)")}>
            {v.ttDirtyText}
          </span>
          <span style={sx("flex: 1")} />
          {v.ttDirty ? (
            <button type="button" onClick={v.ttDiscard} style={sx("padding: 11px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .3s")} className="kza-h3">
              {v.tTTDiscard}
            </button>
          ) : null}
          <button type="button" onClick={v.ttPublish} disabled={!!v.ttClean} style={sx(v.ttSaveStyle)}>
            {v.tTTPublish}
          </button>
        </div>
      </div>
    </div>
  );
}
