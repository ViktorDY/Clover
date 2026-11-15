import { sx, list } from "../adminRuntime";

// Økonomi › Oppgjørsrapporter (settlement reports, Nov 2026 design).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function SettleView({ v }) {
  return (
    <div style={sx("margin-top: 4px; border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); overflow: hidden; min-width: 0")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: flex-start; gap: 12px 20px; padding: 24px 26px 18px")}>
        <div style={sx("flex: 1 1 320px; min-width: 0")}>
          <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 26px; letter-spacing: -.01em; margin: 0")}>
            {v.tStTitle}
          </h2>
          <p style={sx("margin: 8px 0 0; font-size: 14.5px; line-height: 1.55; color: rgba(22,36,26,.78); max-width: 70ch")}>
            {v.tStIntro}
          </p>
        </div>
      </div>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; padding: 14px 26px; border-top: 1px solid rgba(22,36,26,.1)")}>
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
          <label style={sx("display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(22,36,26,.7)")}>
            {v.tStFrom}
            <input type="date" value={v.stFrom ?? ""} onChange={v.onStFrom} aria-label={v.tStFrom} style={sx("padding: 9px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} className="kza-f7" />
          </label>
          <label style={sx("display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(22,36,26,.7)")}>
            {v.tStTo}
            <input type="date" value={v.stTo ?? ""} onChange={v.onStTo} aria-label={v.tStTo} style={sx("padding: 9px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} className="kza-f7" />
          </label>
          {v.stHasRange ? (
            <button type="button" onClick={v.stClearRange} style={sx("padding: 8px 14px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-h3">
              {v.tStClearRange}
            </button>
          ) : null}
        </div>
        <span style={sx("flex: 0 1 auto")} />
        <span style={sx("font-size: 14px; color: rgba(22,36,26,.75)")}>
          {v.stShowing}
        </span>
      </div>
      {v.stRange ? (
        <div style={sx("padding: 0 26px 12px; font-size: 13.5px; color: #1f7a3a; font-weight: 700")}>
          {v.stRange}
        </div>
      ) : null}
      {v.stSelAny ? (
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 0 26px 14px")}>
          <button type="button" onClick={v.stDownloadSel} style={sx("padding: 10px 18px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-ha">
            {v.tStDlSel}
          </button>
          <span style={sx("font-size: 14.5px")}>
            {v.stSelNote}{" "}
            <button type="button" onClick={v.stClearSel} style={sx("border: 0; background: transparent; padding: 0; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: #1f7a3a; text-decoration: underline")}>
              {v.tStClear}
            </button>
          </span>
        </div>
      ) : null}
      <div style={sx("overflow-x: auto; border-top: 1px solid rgba(22,36,26,.1)")}>
        <div style={sx("min-width: 780px")}>
          <div style={sx("display: grid; grid-template-columns: 44px 120px 120px 130px minmax(200px,1.4fr) 130px; gap: 12px; align-items: center; padding: 12px 26px; background: #f4f8f2; border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)")}>
            <input type="checkbox" aria-label={v.tSelectAll} checked={!!v.stAllChecked} onChange={v.stToggleAll} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
            <span>
              {v.tStPaid}
            </span>
            <span>
              {v.tStCreated}
            </span>
            <span style={sx("text-align: right")}>
              {v.tStSum}
            </span>
            <span>
              {v.tStAccName}
            </span>
            <span>
              {v.tStAccNo}
            </span>
          </div>
          <div style={sx("max-height: max(420px, calc(100vh - 560px)); overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin")}>
            {list(v.stRows).map((r, i1) => (
                <div key={r.key ?? i1} style={sx(`display: grid; grid-template-columns: 44px 120px 120px 130px minmax(200px,1.4fr) 130px; gap: 12px; align-items: center; min-height: 56px; padding: 0 26px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 14px; transition: background .2s; background: ${r.bg ?? ""}`)} className="kza-h6">
                  <input type="checkbox" aria-label={r.created} checked={!!r.checked} onChange={r.toggle} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
                  <span style={sx(r.paidStyle)}>
                    {r.paid}
                  </span>
                  <span style={sx("color: rgba(22,36,26,.8)")}>
                    {r.created}
                  </span>
                  <span style={sx("text-align: right; font-weight: 700")}>
                    {r.sum}
                  </span>
                  <span style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                    {r.accName}
                  </span>
                  <span style={sx("color: rgba(22,36,26,.8); letter-spacing: .04em")}>
                    {r.accNo}
                  </span>
                </div>
            ))}
            {v.stEmpty ? (
              <div style={sx("padding: 40px 26px; font-size: 14.5px; color: rgba(22,36,26,.7)")}>
                {v.tStNone}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
