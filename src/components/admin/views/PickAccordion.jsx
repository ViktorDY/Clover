import { sx, list } from "../adminRuntime";

// [design 17 Nov] Collapsible multi-select used on the groups and roles pages
// (clubs / groups / members): header with label and summary, search field,
// "all" toggle and a checkbox list. `m` is one of v.grpmClubs, v.rfmGroups …
export default function PickAccordion({ m, none }) {
  if (!m) return null;
  return (
    <div style={sx("border-radius: 14px; border: 1px solid rgba(22,36,26,.1); overflow: clip; flex: 0 0 auto")}>
      <button type="button" onClick={m.toggle} aria-expanded={!!m.open} style={sx("display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 14px; border: 0; background: #f6f8f3; cursor: pointer; text-align: left; font-family: var(--font-body); color: #16241a")} className="kza-d17c">
        <span style={sx("flex: 1; min-width: 0")}>
          <b style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>{m.label}</b>
          <span style={sx("display: block; margin-top: 1px; font-size: 12.5px; color: rgba(22,36,26,.6); overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{m.summary}</span>
        </span>
        <span aria-hidden="true" style={sx(m.chev)}>▾</span>
      </button>
      {m.open ? (
        <div style={sx("display: grid; gap: 8px; padding: 10px 10px 8px; border-top: 1px solid rgba(22,36,26,.08)")}>
          <div style={sx("display: flex; gap: 6px; align-items: center")}>
            <input type="search" value={m.q ?? ""} onChange={m.onQ} placeholder={m.ph} aria-label={m.ph} style={sx("width: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #f4f8f2; font-family: var(--font-body); font-size: 13px; color: #16241a; outline: none")} className="kza-f7" />
            <button type="button" onClick={m.all} style={sx("padding: 4px 10px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap")} className="kza-h3">
              {m.allLbl}
            </button>
          </div>
          <div style={sx("display: grid; gap: 1px; max-height: 240px; overflow-y: auto")}>
            {list(m.items).map((it, i) => (
              <label key={it.key ?? i} style={sx("display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 9px; font-size: 14px; cursor: pointer")} className="kza-h6">
                <input type="checkbox" checked={!!it.on} onChange={it.toggle} style={sx("width: 16px; height: 16px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto")} />
                <span style={sx("flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{it.name}</span>
                <span style={sx("font-size: 12px; color: rgba(22,36,26,.55); white-space: nowrap")}>{it.meta}</span>
              </label>
            ))}
            {m.empty ? <div style={sx("padding: 6px 8px; font-size: 13px; color: rgba(22,36,26,.55)")}>{none}</div> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
