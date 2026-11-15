import { sx, list } from "../adminRuntime";

// Medlemmer og lag › Grupper: departments and groups tree.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function DeptsView({ v }) {
  return (
    <div style={sx("margin-top: -30px; border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); overflow: hidden")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: flex-start; gap: 14px; padding: 22px 22px 18px")}>
        <div style={sx("flex: 1 1 300px; min-width: 0")}>
          <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 30px; letter-spacing: -.02em; color: #16241a; margin: 0")}>
            {v.tDeptHeading}
          </h2>
          <p style={sx("margin: 8px 0 0; font-size: 13.5px; line-height: 1.5; color: rgba(22,36,26,.75); max-width: 56ch")}>
            {v.tDeptIntro}
          </p>
        </div>
        <div style={sx("display: flex; flex-wrap: wrap; gap: 10px")}>
          <button type="button" onClick={v.pickImport} style={sx("padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; box-shadow: 0 1px 2px rgba(22,36,26,.1); transition: background .2s")} className="kza-h6">
            {v.tImportGroup}
          </button>
          <button type="button" onClick={v.openAddGroup} style={sx("padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; box-shadow: 0 1px 2px rgba(22,36,26,.1); transition: background .2s")} className="kza-h6">
            {v.tAddGroup}
          </button>
          <input data-dept-import="" type="file" accept=".csv,.txt" onChange={v.onImportFile} style={sx("display: none")} />
        </div>
      </div>
      {v.deptImportMsg ? (
        <div style={sx("padding: 0 22px 14px; font-size: 13px; color: #1f7a3a; font-weight: 700")}>
          {v.deptImportMsg}
        </div>
      ) : null}
      <div style={sx("display: flex; flex-wrap: wrap; gap: 10px; padding: 0 22px 12px")}>
        <button type="button" onClick={v.ciOpenInfo} style={sx("padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; box-shadow: 0 1px 2px rgba(22,36,26,.1); transition: background .2s")} className="kza-h6">
          {v.tCiInfoBtn}
        </button>
        <button type="button" onClick={v.ciOpenInvite} style={sx("padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; box-shadow: 0 1px 2px rgba(22,36,26,.1); transition: background .2s")} className="kza-h6">
          {v.tCiInviteBtn}
        </button>
      </div>
      <div style={sx("padding: 0 22px 18px")}>
        <input type="search" value={v.deptQ ?? ""} onChange={v.onDeptQ} placeholder={v.tDeptSearch} aria-label={v.tDeptSearch} style={sx("width: 100%; box-sizing: border-box; padding: 13px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-f7" />
      </div>
      <div style={sx("overflow-x: auto; border-top: 1px solid rgba(22,36,26,.12)")}>
        <div style={sx("min-width: 520px")}>
          <div style={sx("display: grid; grid-template-columns: minmax(0,1fr) 180px 56px; align-items: center; padding: 12px 18px; background: #f4f8f2; border-bottom: 1px solid rgba(22,36,26,.12); font-size: 12.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.7)")}>
            <span>
              {v.tColName}
            </span>
            <span>
              {v.tColCount}
            </span>
            <span />
          </div>
          {v.deptNone ? (
            <div style={sx("padding: 18px; font-size: 14px; color: rgba(22,36,26,.75)")}>
              {v.tDeptNone}
            </div>
          ) : null}
          {list(v.deptRows).map((r, i1) => (
              <div key={r.key ?? i1} style={sx("display: grid; grid-template-columns: minmax(0,1fr) 180px 56px; align-items: center; height: 46px; box-sizing: border-box; padding: 0 18px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 14px; transition: background .2s")} className="kza-h6">
                <span style={sx(`display: flex; align-items: center; gap: 8px; min-width: 0; padding-left: ${r.indent ?? ""}`)}>
                  {r.hasKids ? (
                    <button type="button" onClick={r.toggle} aria-label={r.name} aria-expanded={r.open} style={sx("width: 22px; height: 22px; flex: 0 0 auto; padding: 0; border: 0; background: transparent; cursor: pointer; display: grid; place-items: center; color: #1f7a3a")}>
                      <svg width="12" height="12" viewBox="0 0 12 12" style={sx(`transition: transform .2s; transform: ${r.chev ?? ""}`)}>
                        <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) : null}
                  {r.noKids ? (
                    <span style={sx("width: 22px; flex: 0 0 auto; display: grid; place-items: center")}>
                      <span style={sx(r.dotStyle)} />
                    </span>
                  ) : null}
                  <span style={sx(r.nameStyle)}>
                    {r.name}
                  </span>
                </span>
                <span style={sx(r.countStyle)}>
                  {r.count}
                </span>
                <span style={sx("position: relative; display: flex; justify-content: flex-end")}>
                  <button type="button" onClick={r.menu} aria-label={v.tMore} aria-haspopup="true" style={sx("width: 32px; height: 26px; border-radius: 6px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; cursor: pointer; color: #16241a; font-weight: 800; letter-spacing: .08em; line-height: 1; padding: 0 0 6px")} className="kza-h3">
                    ...
                  </button>
                  {r.menuOpen ? (
                    <>
                      <div onClick={v.closeDeptMenu} style={sx("position: fixed; inset: 0; z-index: 30")} />
                      <div style={sx("position: absolute; right: 0; top: calc(100% + 4px); z-index: 31; min-width: 200px; border-radius: 14px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 16px 40px rgba(22,36,26,.22); padding: 6px; display: grid; gap: 2px")}>
                      <button type="button" onClick={r.addHere} style={sx("text-align: left; padding: 10px 12px; border-radius: 10px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; color: #16241a")} className="kza-h3">
                        {v.tAddHere}
                      </button>
                      {r.canRemove ? (
                        <button type="button" onClick={r.remove} style={sx("text-align: left; padding: 10px 12px; border-radius: 10px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; color: #a3282f")} className="kza-hd">
                          {v.tRemove}
                        </button>
                      ) : null}
                    </div>
                    </>
                  ) : null}
                </span>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
