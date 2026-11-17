import Hv from "../../Hv";
import { sx, list } from "../adminRuntime";
import { TablePager } from "./TableParts";

// Daglig drift: activities table. [design 17 Nov] compact layout: the column
// picker sits in the per-column search row, rows are 40px, and the footer
// carries "+ New", rows-per-page and first/prev/next/last paging.
// Renders the view object `v` from src/lib/adminLogic.js.
const FILTER_INPUT =
  "width: 100%; min-width: 0; box-sizing: border-box; height: 30px; padding: 0 10px; border-radius: 8px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; font-family: var(--font-body); font-size: 13px; color: #16241a; outline: none";

export default function EventTable({ v }) {
  return (
    <div data-ev-card="" style={sx("min-width: 0")}>
      <div data-fit-keep="" style={sx("position: relative; height: 0")}>
        {v.evColsOpen ? (
          <>
            <div onClick={v.closeEvCols} style={sx("position: fixed; inset: 0; z-index: 30")} />
            <div role="menu" style={sx("position: absolute; left: 0; top: 92px; z-index: 31; width: 260px; border-radius: 18px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 22px 54px rgba(22,36,26,.24); padding: 12px")}>
              <input type="search" value={v.evColQ ?? ""} onChange={v.onEvColQ} placeholder={v.tEvColSearch} style={sx("width: 100%; box-sizing: border-box; padding: 10px 14px; border: 0; border-bottom: 1px solid rgba(22,36,26,.12); background: transparent; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} />
              <div style={sx("display: grid; gap: 2px; margin-top: 8px")}>
                {list(v.evColOpts).map((o, i1) => (
                  <label key={o.key ?? i1} style={sx("display: flex; align-items: center; gap: 12px; padding: 9px 8px; border-radius: 10px; cursor: pointer; font-size: 14.5px")}>
                    <input type="checkbox" checked={!!o.on} onChange={o.toggle} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div data-ev-tbl="" style={sx("overflow-x: auto")}>
        <div data-ev-minw="" style={sx(`min-width: ${v.evMinW ?? ""}`)}>
          <div style={sx(`background: #eaf4e7; display: grid; grid-template-columns: ${v.evGrid ?? ""}; gap: 12px; align-items: center; padding: 10px 14px; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.72)`)}>
            {list(v.evHead).map((h, i1) => (
              <button key={h.key ?? i1} type="button" onClick={h.sort} style={sx(h.style)}>
                {h.label}
                <span aria-hidden="true" style={sx("font-size: 9px; margin-left: 5px")}>
                  {h.caret}
                </span>
              </button>
            ))}
          </div>
          <div style={sx(`display: grid; grid-template-columns: ${v.evGrid ?? ""}; gap: 12px; align-items: center; padding: 6px 14px; background: #f6f8f3; border-bottom: 1px solid rgba(22,36,26,.1)`)}>
            {list(v.evFilterCells).map((fc, i1) =>
              fc.isBtn ? (
                <Hv
                  as="button"
                  key={fc.key ?? i1}
                  type="button"
                  onClick={v.toggleEvCols}
                  aria-label={v.tEvColumns}
                  title={v.tEvColumns}
                  aria-expanded={!!v.evColsOpen}
                  style="justify-self: center; width: 30px; height: 30px; display: grid; place-items: center; padding: 0; border-radius: 8px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; cursor: pointer"
                  hover="border-color: #74cd85"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 6h16M4 12h16M4 18h16M9 4v4M15 10v4M8 16v4" />
                  </svg>
                </Hv>
              ) : fc.isInput ? (
                <input key={fc.key ?? i1} type="search" value={fc.val ?? ""} onChange={fc.onInput} placeholder={fc.ph} aria-label={fc.ph} className="kza-fp" style={sx(FILTER_INPUT)} />
              ) : (
                <span key={fc.key ?? i1} />
              ),
            )}
          </div>
          <div data-ev-rows="" style={sx("max-height: max(320px, calc(100vh - 330px)); overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain; scrollbar-width: thin")}>
            {list(v.evRows).map((r, i1) => (
              <div key={r.key ?? i1} role="button" tabIndex="0" onClick={r.open} style={sx(`display: grid; grid-template-columns: ${v.evGrid ?? ""}; gap: 12px; align-items: center; height: 40px; box-sizing: border-box; padding: 0 14px; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13.5px; cursor: pointer; transition: background .2s`)} className="kza-h6">
                {list(r.cells).map((c, i2) => (
                  <span key={c.key ?? i2} style={sx(c.style)} title={c.text}>
                    {c.isIcon ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16241a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d={c.icon} />
                      </svg>
                    ) : null}
                    {c.isText ? c.text : null}
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
      </div>
      <div data-ev-foot="" style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; padding: 10px 14px; border-top: 1px solid rgba(22,36,26,.1); font-size: 13.5px; color: #16241a")}>
        <Hv as="button" type="button" onClick={v.openCompose} style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 8px; border: 0; background: transparent; color: #16241a; font-family: var(--font-body); font-size: 13.5px; cursor: pointer" hover="background: #eaf4e7">
          + {v.tEvNew}
        </Hv>
        <span style={sx("flex: 1")} />
        <TablePager v={v} p="ev" total={v.evTotal} onPer={v.onEvPer} label={v.tEvPer} />
      </div>
    </div>
  );
}
