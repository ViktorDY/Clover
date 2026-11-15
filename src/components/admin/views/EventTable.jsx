import { sx, list } from "../adminRuntime";

// Daglig drift: activities table with search, columns and paging.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function EventTable({ v }) {
  return (
    <div style={sx("margin-top: 18px; min-width: 0")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px")}>
        <div style={sx("position: relative; flex: 1 1 240px; min-width: 0")}>
          <input type="search" value={v.evQ ?? ""} onChange={v.onEvQ} placeholder={v.tEvSearch} aria-label={v.tEvSearch} style={sx("width: 100%; box-sizing: border-box; padding: 11px 16px; border-radius: 12px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} className="kza-fp" />
        </div>
        <div style={sx("position: relative")}>
          <button type="button" onClick={v.toggleEvCols} aria-haspopup="true" aria-expanded={v.evColsOpen} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 11px 16px; border-radius: 12px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer")} className="kza-h6">
            {v.tEvColumns}{" "}
            <span style={sx("font-size: 11px")}>
              ▾
            </span>
          </button>
          {v.evColsOpen ? (
            <>
              <div onClick={v.closeEvCols} style={sx("position: fixed; inset: 0; z-index: 30")} />
              <div role="menu" style={sx("position: absolute; right: 0; top: calc(100% + 8px); z-index: 31; width: 260px; border-radius: 18px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 22px 54px rgba(22,36,26,.24); padding: 12px")}>
              <input type="search" value={v.evColQ ?? ""} onChange={v.onEvColQ} placeholder={v.tEvColSearch} style={sx("width: 100%; box-sizing: border-box; padding: 10px 14px; border: 0; border-bottom: 1px solid rgba(22,36,26,.12); background: transparent; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} />
              <div style={sx("display: grid; gap: 2px; margin-top: 8px")}>
                {list(v.evColOpts).map((o, i1) => (
                    <label key={o.key ?? i1} style={sx("display: flex; align-items: center; gap: 12px; padding: 9px 8px; border-radius: 10px; cursor: pointer; font-size: 14.5px")}>
                      <input type="checkbox" checked={!!o.on} onChange={o.toggle} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
                      <span>
                        {o.label}
                      </span>
                    </label>
                ))}
              </div>
            </div>
            </>
          ) : null}
        </div>
      </div>
      <div style={sx("margin-top: 12px; font-size: 12.5px; color: rgba(22,36,26,.7)")}>
        {v.evShowing}
      </div>
      <div style={sx("overflow: auto; max-height: max(320px, calc(100vh - 400px)); overscroll-behavior: contain; scrollbar-width: thin; margin-top: 8px; border-top: 1px solid rgba(22,36,26,.12)")}>
        <div style={sx(`min-width: ${v.evMinW ?? ""}`)}>
          <div style={sx(`position: sticky; top: 0; z-index: 2; background: #eaf4e7; display: grid; grid-template-columns: ${v.evGrid ?? ""}; gap: 12px; align-items: center; padding: 14px 14px; border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.72)`)}>
            {list(v.evHead).map((h, i1) => (
                <button key={h.key ?? i1} type="button" onClick={h.sort} style={sx(h.style)}>
                  {h.label}
                  <span aria-hidden="true" style={sx("font-size: 9px; margin-left: 5px")}>
                    {h.caret}
                  </span>
                </button>
            ))}
          </div>
          {list(v.evRows).map((r, i1) => (
              <div key={r.key ?? i1} role="button" tabIndex="0" onClick={r.open} style={sx(`display: grid; grid-template-columns: ${v.evGrid ?? ""}; gap: 12px; align-items: center; min-height: 54px; box-sizing: border-box; padding: 6px 14px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 13.5px; cursor: pointer; transition: background .2s`)} className="kza-h6">
                {list(r.cells).map((c, i2) => (
                    <span key={c.key ?? i2} style={sx(c.style)} title={c.text}>
                      {c.isIcon ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16241a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d={c.icon} />
                        </svg>
                      ) : null}
                      {c.isText ? (
                        <>
                          {c.text}
                        </>
                      ) : null}
                    </span>
                ))}
              </div>
          ))}
          {v.evEmpty ? (
            <div style={sx("padding: 18px 14px; font-size: 14px; color: rgba(22,36,26,.72)")}>
              {v.tEvEmpty}
            </div>
          ) : null}
        </div>
      </div>
      {v.evMulti ? (
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 16px")}>
          <div style={sx("display: flex; flex-wrap: wrap; gap: 6px")}>
            {list(v.evPages).map((p, i1) => (
                <button key={p.key ?? i1} type="button" onClick={p.go} style={sx(p.style)}>
                  {p.label}
                </button>
            ))}
          </div>
          <span style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px; justify-content: flex-end")}>
            <label style={sx("display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(22,36,26,.8); white-space: nowrap")}>
              {v.tEvPer}
              <select value={v.evPer ?? ""} onChange={v.onEvPer} aria-label={v.tEvPer} style={sx("padding: 8px 10px; border-radius: 8px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")}>
                {list(v.evPerOpts).map((o, i1) => (
                    <option key={o.key ?? i1} value={o.v}>
                      {o.v}
                    </option>
                ))}
              </select>
            </label>
          </span>
        </div>
      ) : null}
    </div>
  );
}
