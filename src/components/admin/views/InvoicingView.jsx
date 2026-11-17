import Hv from "../../Hv";
import { sx, list } from "../adminRuntime";
import { FilterCells, TablePager } from "./TableParts";
import InvoiceAddPanel from "./InvoiceAddPanel";
import InvoiceDetail from "./InvoiceDetail";

// Økonomi › Betalingsforespørsler: payment requests list (Nov 2026 design:
// // tabs, row selection with archive, segment picker, per-request statistics).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function InvoicingView({ v }) {
  return (
    <>
      {/* [design 17 Nov] compact card: tabs with a ⋯ menu (new request, bulk SMS, export),
          per-column search row, 40px rows, footer with selection actions and paging. */}
      <div data-inv-card="" style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 22px; margin-top: 0")}>
      <div style={sx("display: flex; align-items: center; gap: 10px")}>
        <div role="tablist" style={sx("flex: 1; min-width: 0; display: flex; gap: 4px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
          {list(v.invTabs).map((t, i1) => (
              <button key={t.key ?? i1} type="button" role="tab" aria-selected={t.on} onClick={t.pick} style={sx(t.style)}>
                {t.label}
              </button>
          ))}
        </div>
        <div style={sx("position: relative; flex: none")}>
          <Hv as="button" type="button" onClick={v.toggleInvMore} aria-haspopup="true" aria-expanded={!!v.invMoreOpen} aria-label={v.tInvMore} title={v.tInvMore} style="width: 40px; height: 40px; display: grid; place-items: center; border-radius: 12px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; cursor: pointer; padding: 0; font-size: 18px; line-height: 1" hover="background: #eaf4e7">
            ⋯
          </Hv>
          {v.invMoreOpen ? (
            <>
              <div onClick={v.closeInvPops} style={sx("position: fixed; inset: 0; z-index: 30")} />
              <div style={sx("position: absolute; right: 0; top: calc(100% + 6px); z-index: 31; width: min(300px, 92vw); box-sizing: border-box; border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 18px 40px rgba(22,36,26,.2); padding: 6px; display: grid; gap: 2px")}>
                <Hv as="button" type="button" onClick={v.openInvAdd} style="display: block; width: 100%; text-align: left; padding: 10px 12px; border-radius: 10px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14px; color: #16241a" hover="background: #eaf4e7">
                  + {v.tInvAdd}
                </Hv>
                <Hv as="button" type="button" onClick={v.sendBulkSms} style="text-align: left; padding: 10px 12px; border-radius: 10px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-body); color: #16241a" hover="background: #eaf4e7">
                  <span style={sx("display: block; font-size: 14px; color: #16241a")}>{v.tBulkSms}</span>
                  <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.7); margin-top: 3px")}>{v.bulkSmsNote}</span>
                </Hv>
                <Hv as="button" type="button" onClick={v.exportInvoices} style="text-align: left; padding: 10px 12px; border-radius: 10px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14px; color: #16241a" hover="background: #eaf7ed">
                  {v.tInvExport}
                </Hv>
              </div>
            </>
          ) : null}
        </div>
      </div>
      {v.invSent ? (
        <div role="status" style={sx("margin-top: 16px; border-radius: 16px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.5); padding: 12px 16px; font-size: 14px")}>
          {v.invSentText}
        </div>
      ) : null}
      <div data-inv-tbl="" style={sx("overflow-x: auto; margin-top: 10px")}>
        <div data-inv-minw="" style={sx("min-width: 960px")}>
          <div style={sx(`display: grid; grid-template-columns: ${v.invCols ?? ""}; gap: 12px; align-items: center; padding: 10px 14px; background: #eaf4e7; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)`)}>
            <input type="checkbox" checked={!!v.invAllOn} onChange={v.invToggleAll} aria-label={v.tInvSelAll} style={sx("width: 16px; height: 16px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
            <span>ID</span>
            <span>{v.tColType}</span>
            <span>{v.tColNumber}</span>
            <span>{v.tColIssued}</span>
            <span>{v.tColName}</span>
            <span>{v.tColAmount}</span>
            <span>{v.tColStatus}</span>
            <span style={sx("text-align: right")}>{v.tColDetails}</span>
          </div>
          <div style={sx(`display: grid; grid-template-columns: ${v.invCols ?? ""}; gap: 12px; align-items: center; padding: 6px 14px; background: #f6f8f3; border-bottom: 1px solid rgba(22,36,26,.1)`)}>
            <span />
            <FilterCells cells={v.invFilterCells} />
            <span />
          </div>
          <div data-inv-rows="" style={sx("max-height: max(400px, calc(100vh - 380px)); overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin")}>
            {list(v.invRows).map((r, i1) => (
                <div key={r.key ?? i1} style={sx(`display: grid; grid-template-columns: ${v.invCols ?? ""}; gap: 12px; align-items: center; padding: 0 14px; height: 40px; box-sizing: border-box; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13.5px; transition: background .2s; cursor: pointer; background: ${r.rowBg ?? ""}`)} onClick={r.openStats} className="kza-a1x11">
                  <span onClick={v.stopClick} style={sx("display: grid")}>
                    <input type="checkbox" checked={!!r.sel} onChange={r.toggleSel} aria-label={r.id} style={sx("width: 16px; height: 16px; accent-color: #1f7a3a; cursor: pointer; margin: 0")} />
                  </span>
                  <span style={sx("color: rgba(22,36,26,.8)")}>{r.id}</span>
                  <span style={sx("overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{r.type}</span>
                  <span style={sx("color: rgba(22,36,26,.8)")}>{r.number}</span>
                  <span style={sx("color: rgba(22,36,26,.8)")}>{r.date}</span>
                  <span style={sx("overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500")}>{r.name}</span>
                  <span style={sx("font-weight: 500")}>{r.amount}</span>
                  <span>
                    <span style={sx(r.statusStyle)}>{r.statusLabel}</span>
                  </span>
                  <span onClick={v.stopClick} style={sx("display: flex; gap: 4px; justify-content: flex-end")}>
                    <button type="button" onClick={r.view} aria-label={v.tView} title={v.tView} style={sx("width: 30px; height: 26px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; display: grid; place-items: center; cursor: pointer; transition: background .2s, color .2s")} className="kza-h3">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button type="button" onClick={r.arch} aria-label={v.tArchiveRow} title={v.tArchiveRow} style={sx("width: 30px; height: 26px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; display: grid; place-items: center; cursor: pointer; transition: background .2s, color .2s")} className="kza-h3">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="3" width="20" height="5" rx="1" />
                        <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
                        <path d="M10 12h4" />
                      </svg>
                    </button>
                    <button type="button" onClick={r.del} aria-label={v.tDelete} title={v.tDelete} style={sx("width: 30px; height: 26px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; display: grid; place-items: center; cursor: pointer; transition: background .2s, color .2s")} className="kza-h3">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 6h18" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </span>
                </div>
            ))}
            {v.invEmpty ? (
              <div style={sx("padding: 30px 14px; text-align: center; font-size: 14px; color: rgba(22,36,26,.65)")}>
                {v.tInvEmpty}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div data-inv-foot="" style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; padding: 10px 14px; border-top: 1px solid rgba(22,36,26,.1); font-size: 13.5px; color: #16241a")}>
        <span style={sx("font-weight: 600")}>{v.invSelText}</span>
        {v.invSelBar ? (
          <>
            <Hv as="button" type="button" onClick={v.invArchiveSel} style="padding: 5px 12px; border-radius: 999px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-body); font-weight: 700; font-size: 12.5px; cursor: pointer" hover="background: #1f7a3a">
              {v.invArchiveLabel}
            </Hv>
            <button type="button" onClick={v.invClearSel} style={sx("padding: 5px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-body); font-weight: 700; font-size: 12.5px; cursor: pointer")}>
              {v.tCancelL}
            </button>
          </>
        ) : null}
        <Hv as="button" type="button" onClick={v.openInvAdd} style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 8px; border: 0; background: transparent; color: #16241a; font-family: var(--font-body); font-size: 13.5px; cursor: pointer" hover="background: #eaf4e7">
          + {v.tNewShort}
        </Hv>
        <span style={sx("flex: 1")} />
        <TablePager v={v} p="inv" total={v.invTotal} onPer={v.onInvPer} label={v.tTblPer} />
      </div>
    </div>
      {v.segPickOpen ? (
      <div data-rsp-modal="" onClick={v.closeSegPick} style={sx("position: fixed; inset: 0; z-index: 99; display: grid; place-items: center; padding: 20px; background: rgba(22,36,26,.55); backdrop-filter: blur(8px)")}>
        <div role="dialog" aria-modal="true" aria-label={v.tSegDialog} onClick={v.stopClick} style={sx("width: 100%; max-width: 460px; max-height: calc(100vh - 40px); overflow-y: auto; box-sizing: border-box; border-radius: 22px; background: #ffffff; box-shadow: 0 32px 80px rgba(22,36,26,.35)")}>
          <div style={sx("display: flex; align-items: center; gap: 12px; padding: 22px 26px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
            <h3 style={sx("flex: 1; margin: 0; font-family: var(--font-heading); font-weight: 600; font-size: 21px")}>
              {v.tSegDialog}
            </h3>
            <button type="button" onClick={v.closeSegPick} aria-label={v.tClose} style={sx("width: 34px; height: 34px; border: 0; background: transparent; font-size: 22px; cursor: pointer")}>
              ×
            </button>
          </div>
          {list(v.segOptions).map((o, i1) => (
              <button key={o.key ?? i1} type="button" onClick={o.pick} style={sx("display: flex; align-items: flex-start; gap: 18px; width: 100%; box-sizing: border-box; text-align: left; padding: 22px 26px; border: 0; border-bottom: 1px solid rgba(22,36,26,.1); background: #ffffff; cursor: pointer; font-family: var(--font-body); color: #16241a; transition: background .2s")} className="kza-h6">
                <span aria-hidden="true" style={sx("flex: 0 0 34px; width: 34px; height: 34px; margin-top: 2px; border-radius: 999px; background: #eaf7ed; color: #1f7a3a; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
                  {o.glyph}
                </span>
                <span style={sx("flex: 1; min-width: 0")}>
                  <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 16px")}>
                    {o.title}
                  </span>
                  <span style={sx("display: block; font-size: 14.5px; line-height: 1.5; margin-top: 6px; color: rgba(22,36,26,.8)")}>
                    {o.text}
                  </span>
                </span>
              </button>
          ))}
          <div style={sx("display: flex; justify-content: flex-end; padding: 18px 26px")}>
            <button type="button" onClick={v.closeSegPick} style={sx("padding: 11px 22px; border-radius: 10px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 15px; cursor: pointer")} className="kza-h6">
              {v.tCancelL}
            </button>
          </div>
        </div>
      </div>
    ) : null}
      {v.invAddOpen ? <InvoiceAddPanel v={v} /> : null}
      {v.stOpen ? (
      <div data-rsp-modal="" onClick={v.closeStats} style={sx("position: fixed; inset: 0; z-index: 98; display: grid; place-items: center; padding: 20px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)")}>
        <div role="dialog" aria-modal="true" aria-label={v.stTitle} onClick={v.stopClick} style={sx("width: 100%; max-width: 1060px; max-height: calc(100vh - 40px); display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; border-radius: 26px; background: #f6f8f3; box-shadow: 0 32px 80px rgba(22,36,26,.32)")}>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; padding: 20px 26px; background: #ffffff; border-bottom: 1px solid rgba(22,36,26,.1)")}>
            <div style={sx("flex: 1; min-width: 220px")}>
              <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0")}>
                {v.stTitle}
              </h3>
              <div style={sx("font-size: 13.5px; color: rgba(22,36,26,.65); margin-top: 3px")}>
                {v.stSub}
              </div>
            </div>
            <span style={sx(v.stStatusStyle)}>
              {v.stStatus}
            </span>
            <button type="button" onClick={v.closeStats} aria-label={v.tClose} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; font-size: 16px; cursor: pointer")}>
              ×
            </button>
          </div>
          <div style={sx("flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: thin; padding: 22px 26px; display: grid; gap: 20px")}>
            <div style={sx("display: grid; grid-template-columns: repeat(auto-fit, minmax(138px, 1fr)); gap: 12px")}>
              <div style={sx("border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px 16px; min-width: 0")}>
                <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.tStPaidAmt}
                </div>
                <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin-top: 6px; color: #1f7a3a")}>
                  {v.stPaidAmt}
                </div>
              </div>
              <div style={sx("border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px 16px; min-width: 0")}>
                <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.tStOutAmt}
                </div>
                <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin-top: 6px; color: #7c4dcf")}>
                  {v.stOutAmt}
                </div>
              </div>
              <div style={sx("border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px 16px; min-width: 0")}>
                <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.tStRecips}
                </div>
                <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin-top: 6px; ")}>
                  {v.stRecips}
                </div>
              </div>
              <div style={sx("border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px 16px; min-width: 0")}>
                <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.tStPaidN}
                </div>
                <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin-top: 6px; ")}>
                  {v.stPaidN}
                </div>
              </div>
              <div style={sx("border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px 16px; min-width: 0")}>
                <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.tStUnpaidN}
                </div>
                <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin-top: 6px; ")}>
                  {v.stUnpaidN}
                </div>
              </div>
              <div style={sx("border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px 16px; min-width: 0")}>
                <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.tStExemptN}
                </div>
                <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin-top: 6px; ")}>
                  {v.stExemptN}
                </div>
              </div>
            </div>
            <div>
              <div style={sx("height: 10px; border-radius: 999px; background: rgba(22,36,26,.08); overflow: hidden")}>
                <div style={sx(`height: 100%; width: ${v.stPct ?? ""}; border-radius: 999px; background: #74cd85; transition: width .5s`)} />
              </div>
              <div style={sx("font-size: 12.5px; color: rgba(22,36,26,.65); margin-top: 6px")}>
                {v.stPctText}
              </div>
            </div>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; border-radius: 18px; background: rgba(148,92,214,.1); border: 1px solid rgba(148,92,214,.3); padding: 14px 18px")}>
              <div style={sx("flex: 1; min-width: 200px; font-size: 14px; color: #4b2a85")}>
                {v.stRemindNote}
              </div>
              <button type="button" onClick={v.stRemind} disabled={!!v.stRemindOff} style={sx(`padding: 12px 22px; border-radius: 999px; border: 0; background: #7c4dcf; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer; transition: background .3s; opacity: ${v.stRemindOpacity ?? ""}`)} className="kza-hz">
                {v.stRemindLabel}
              </button>
            </div>
            {v.stRemindSent ? (
              <div role="status" style={sx("margin-top: -8px; font-size: 14px; color: #1f7a3a; font-weight: 600")}>
                {v.stRemindSent}
              </div>
            ) : null}
            <div style={sx("border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 20px 22px")}>
              <div style={sx("display: flex; align-items: center; gap: 12px; margin-bottom: 14px")}>
                <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 17px; margin: 0; flex: 1")}>
                  {v.tStDetails}
                </h4>
                {v.stNotEditing ? (
                  <button type="button" onClick={v.stStartEdit} style={sx("display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-h3">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                    </svg>
                    {v.tEditL}
                  </button>
                ) : null}
              </div>
              {v.stEditing ? (
                <form onSubmit={v.stSaveDetails} style={sx("margin-top: 4px; display: grid; gap: 14px")}>
                  <div style={sx("display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px")}>
                    <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tStType}
                      <input type="text" required value={v.stDType ?? ""} onChange={v.onStDType} style={sx("width: 100%; box-sizing: border-box; padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-fp" />
                    </label>
                    <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tStDue}
                      <input type="date" required value={v.stDDue ?? ""} onChange={v.onStDDue} style={sx("width: 100%; box-sizing: border-box; padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-fp" />
                    </label>
                    <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tStAmount} (NOK)
                      <input type="number" min="1" required value={v.stDAmt ?? ""} onChange={v.onStDAmt} style={sx("width: 100%; box-sizing: border-box; padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-fp" />
                    </label>
                    <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tStAccount}
                      <input type="text" required value={v.stDAcct ?? ""} onChange={v.onStDAcct} style={sx("width: 100%; box-sizing: border-box; padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-fp" />
                    </label>
                  </div>
                  <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                    {v.tStDesc}
                    <textarea rows="3" value={v.stDDesc ?? ""} onChange={v.onStDDesc} style={sx("width: 100%; box-sizing: border-box; padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none; resize: vertical; line-height: 1.5")} className="kza-fp" />
                  </label>
                  <label style={sx("display: flex; align-items: flex-start; gap: 10px; font-size: 14px; line-height: 1.5; cursor: pointer")}>
                    <input type="checkbox" checked={!!v.stDFee} onChange={v.onStDFee} style={sx("width: 18px; height: 18px; margin-top: 2px; accent-color: #1f7a3a")} />
                    <span>
                      {v.tStFeeIncl}
                    </span>
                  </label>
                  <div style={sx("display: flex; flex-wrap: wrap; gap: 10px")}>
                    <button type="submit" style={sx("padding: 12px 24px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")} className="kza-ha">
                      {v.tSaveL}
                    </button>
                    <button type="button" onClick={v.stCancelEdit} style={sx("padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")}>
                      {v.tCancelL}
                    </button>
                  </div>
                </form>
              ) : null}
              {v.stNotEditing ? (
                <>
                  {v.stSavedMsg ? (
                  <div role="status" style={sx("margin: -4px 0 12px; font-size: 14px; color: #1f7a3a; font-weight: 600")}>
                    {v.stSavedMsg}
                  </div>
                ) : null}
                  <div style={sx("display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px 24px")}>
                  <div style={sx("min-width: 0")}>
                    <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tStType}
                    </div>
                    <div style={sx("font-size: 15px; margin-top: 4px; line-height: 1.45; overflow-wrap: anywhere")}>
                      {v.stType}
                    </div>
                  </div>
                  <div style={sx("min-width: 0")}>
                    <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tStSentTo}
                    </div>
                    <div style={sx("font-size: 15px; margin-top: 4px; line-height: 1.45; overflow-wrap: anywhere")}>
                      {v.stSentTo}
                    </div>
                  </div>
                  <div style={sx("min-width: 0")}>
                    <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tStDue}
                    </div>
                    <div style={sx("font-size: 15px; margin-top: 4px; line-height: 1.45; overflow-wrap: anywhere")}>
                      {v.stDue}
                    </div>
                  </div>
                  <div style={sx("min-width: 0")}>
                    <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tStAccount}
                    </div>
                    <div style={sx("font-size: 15px; margin-top: 4px; line-height: 1.45; overflow-wrap: anywhere")}>
                      {v.stAccount}
                    </div>
                  </div>
                </div>
                  <div style={sx("margin-top: 16px")}>
                  <div style={sx("min-width: 0")}>
                    <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tStDesc}
                    </div>
                    <div style={sx("font-size: 15px; margin-top: 4px; line-height: 1.45; overflow-wrap: anywhere")}>
                      {v.stDesc}
                    </div>
                  </div>
                </div>
                  <div style={sx("margin-top: 16px; border-radius: 14px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.08); padding: 14px 16px")}>
                  <div style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                    {v.tStFee}
                  </div>
                  <div style={sx("font-size: 15px; margin-top: 4px; font-weight: 600")}>
                    {v.stFee}
                  </div>
                  <div style={sx("font-size: 13.5px; color: rgba(22,36,26,.7); margin-top: 4px; line-height: 1.5")}>
                    {v.stFeeNote}
                  </div>
                </div>
                </>
              ) : null}
            </div>
            <div style={sx("border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 20px 22px 8px")}>
              <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px 16px")}>
                <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 17px; margin: 0; flex: 1; min-width: 140px")}>
                  {v.tStMembers}
                </h4>
                <input type="search" value={v.stQ ?? ""} onChange={v.onStQ} placeholder={v.tStSearch} aria-label={v.tStSearch} style={sx("flex: 0 1 280px; min-width: 160px; box-sizing: border-box; padding: 11px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} className="kza-fp" />
              </div>
              <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px")}>
                {list(v.stFilters).map((f, i1) => (
                    <button key={f.key ?? i1} type="button" onClick={f.pick} style={sx(f.style)}>
                      {f.label}
                    </button>
                ))}
              </div>
              <div style={sx("margin: 14px -22px 0; overflow-x: auto")}>
                <div style={sx("min-width: 860px")}>
                  <div style={sx(`display: grid; grid-template-columns: ${v.stCols ?? ""}; gap: 12px; padding: 12px 22px; background: #f4f8f2; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.7)`)}>
                    <span>
                      {v.tStFirst}
                    </span>
                    <span>
                      {v.tStLast}
                    </span>
                    <span>
                      {v.tStStatusCol}
                    </span>
                    <span>
                      {v.tStFeeCol}
                    </span>
                    <span>
                      {v.tStPaidCol}
                    </span>
                    <span>
                      {v.tStOutCol}
                    </span>
                    <span>
                      {v.tStDueCol}
                    </span>
                  </div>
                  <div style={sx("max-height: 300px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin")}>
                    {list(v.stRows).map((m, i1) => (
                        <div key={m.key ?? i1} style={sx(`display: grid; grid-template-columns: ${v.stCols ?? ""}; gap: 12px; align-items: center; padding: 0 22px; min-height: 50px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 14px`)}>
                          <span style={sx("font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                            {m.first}
                          </span>
                          <span style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                            {m.last}
                          </span>
                          <span>
                            <span style={sx(m.statusStyle)}>
                              {m.status}
                            </span>
                          </span>
                          <span>
                            {m.editing ? (
                              <form onSubmit={m.saveFee} style={sx("margin: 0")}>
                                <input type="number" min="0" autoFocus={!!true} value={v.stFeeDraft ?? ""} onChange={v.onStFeeDraft} onBlur={m.saveFee} aria-label={v.tStFeeCol} style={sx("width: 100%; box-sizing: border-box; padding: 7px 10px; border-radius: 10px; border: 1.5px solid #74cd85; background: #ffffff; font-family: var(--font-body); font-size: 14px; outline: none")} />
                              </form>
                            ) : null}
                            {m.notEditing ? (
                              <button type="button" onClick={m.editFee} title={v.tStEditFee} style={sx("display: inline-flex; align-items: center; gap: 6px; padding: 5px 9px; margin: 0 -9px; border: 0; border-radius: 10px; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14px; color: #16241a")} className="kza-h3">
                                {m.fee}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(22,36,26,.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M12 20h9" />
                                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                                </svg>
                              </button>
                            ) : null}
                          </span>
                          <span>
                            {m.paid}
                          </span>
                          <span style={sx(m.outStyle)}>
                            {m.out}
                          </span>
                          <span>
                            {m.due}
                          </span>
                        </div>
                    ))}
                    {v.stEmpty ? (
                      <div style={sx("padding: 18px 22px; font-size: 14px; color: rgba(22,36,26,.65)")}>
                        {v.tStNone}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null}
      {v.invDetail ? <InvoiceDetail v={v} /> : null}
    </>
  );
}
