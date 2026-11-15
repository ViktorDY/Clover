import { sx, list } from "../adminRuntime";

// Invoice detail side panel.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function InvoiceDetail({ v }) {
  return (
    <div data-rsp-modal="" onClick={v.closeInvDetail} style={sx("position: fixed; inset: 0; z-index: 98; display: grid; place-items: center; padding: 20px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)")}>
      <form role="dialog" aria-modal="true" aria-label={v.invDTitleHead} onClick={v.stopClick} onSubmit={v.saveInvDetail} style={sx("width: 100%; max-width: 520px; max-height: calc(100vh - 40px); overflow-y: auto; box-sizing: border-box; border-radius: 26px; background: #ffffff; box-shadow: 0 32px 80px rgba(22,36,26,.32); padding: 24px; display: grid; gap: 14px")}>
        <div style={sx("display: flex; align-items: center; gap: 12px")}>
          <h3 style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0")}>
            {v.invDTitleHead}
          </h3>
          <button type="button" onClick={v.closeInvDetail} aria-label={v.tClose} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; font-size: 16px; cursor: pointer")}>
            ×
          </button>
        </div>
        <div style={sx("display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px")}>
          <div style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
            {v.tColName}
            <span style={sx("font-size: 15px; letter-spacing: 0; text-transform: none; font-weight: 500; color: #16241a")}>
              {v.invDName}
            </span>
          </div>
          <div style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
            {v.tColNumber}
            <span style={sx("font-size: 15px; letter-spacing: 0; text-transform: none; font-weight: 500; color: #16241a")}>
              {v.invDNumber}
            </span>
          </div>
          <div style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
            {v.tColIssued}
            <span style={sx("font-size: 15px; letter-spacing: 0; text-transform: none; font-weight: 500; color: #16241a")}>
              {v.invDDate}
            </span>
          </div>
        </div>
        <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
          {v.tColType}
          <input type="text" disabled={!!v.invDRead} value={v.invDType ?? ""} onChange={v.onInvDType} style={sx(v.inputStyleWhite)} />
        </label>
        <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 12px")}>
          <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
            {v.tColAmount} (NOK)
            <input type="number" min="1" disabled={!!v.invDRead} value={v.invDAmt ?? ""} onChange={v.onInvDAmt} style={sx(v.inputStyleWhite)} />
          </label>
          <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
            {v.tInvDue}
            <input type="date" disabled={!!v.invDRead} value={v.invDDue ?? ""} onChange={v.onInvDDue} style={sx(v.inputStyleWhite)} />
          </label>
        </div>
        <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
          {v.tColStatus}
          <select disabled={!!v.invDRead} value={v.invDStatus ?? ""} onChange={v.onInvDStatus} style={sx(v.inputStyleWhite)}>
            {list(v.invStatusOpts).map((o, i1) => (
                <option key={o.key ?? i1} value={o.id}>
                  {o.name}
                </option>
            ))}
          </select>
        </label>
        <div style={sx("display: flex; flex-wrap: wrap; gap: 10px")}>
          {v.invDEdit ? (
            <button type="submit" style={sx("padding: 12px 24px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")} className="kza-ha">
              {v.tSaveL}
            </button>
          ) : null}
          {v.invDRead ? (
            <button type="button" onClick={v.invDToEdit} style={sx("padding: 12px 24px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")} className="kza-h3">
              {v.tEditL}
            </button>
          ) : null}
          <button type="button" onClick={v.closeInvDetail} style={sx("padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")}>
            {v.tCancelL}
          </button>
        </div>
      </form>
    </div>
  );
}
