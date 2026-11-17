import { sx, list } from "../adminRuntime";
import { Check, Pager } from "./TableParts";
import { smallBtn } from "./tableStyles";

// Økonomi › Oppgjørsrapporter ([design 17 Nov]): a selectable settlement
// table with a date range, a selection/total footer and a compact pager.
const COLS = "44px 120px 120px 130px minmax(200px,1.4fr) 130px";
const dateInput =
  "padding: 9px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none";
const dateLabel = "display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(22,36,26,.7)";

export default function SettleView({ v }) {
  return (
    <div data-st-card="" style={sx("margin-top: 4px; border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); overflow: hidden; min-width: 0")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: flex-start; gap: 12px 20px; padding: 24px 26px 18px")}>
        <div style={sx("flex: 1 1 320px; min-width: 0")}>
          <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 26px; letter-spacing: -.01em; margin: 0")}>{v.tStTitle}</h2>
          <p style={sx("margin: 8px 0 0; font-size: 14.5px; line-height: 1.55; color: rgba(22,36,26,.78); max-width: 70ch")}>{v.tStIntro}</p>
        </div>
      </div>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; padding: 14px 26px; border-top: 1px solid rgba(22,36,26,.1)")}>
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
          <label style={sx(dateLabel)}>
            {v.tStFrom}
            <input type="date" value={v.stFrom ?? ""} onChange={v.onStFrom} aria-label={v.tStFrom} style={sx(dateInput)} className="kza-f7" />
          </label>
          <label style={sx(dateLabel)}>
            {v.tStTo}
            <input type="date" value={v.stTo ?? ""} onChange={v.onStTo} aria-label={v.tStTo} style={sx(dateInput)} className="kza-f7" />
          </label>
          {v.stHasRange ? (
            <button type="button" onClick={v.stClearRange} style={sx("padding: 8px 14px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-h3">
              {v.tStClearRange}
            </button>
          ) : null}
        </div>
      </div>
      {v.stRange ? <div style={sx("padding: 0 26px 12px; font-size: 13.5px; color: #1f7a3a; font-weight: 700")}>{v.stRange}</div> : null}
      <div data-st-tbl="" style={sx("overflow-x: auto; border-top: 1px solid rgba(22,36,26,.1)")}>
        <div data-st-minw="" style={sx("min-width: 780px")}>
          <div style={sx(`display: grid; grid-template-columns: ${COLS}; gap: 12px; align-items: center; padding: 10px 26px; background: #eaf4e7; border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)`)}>
            <Check label={v.tSelectAll} checked={v.stAllChecked} onChange={v.stToggleAll} />
            <span>{v.tStPaid}</span>
            <span>{v.tStCreated}</span>
            <span style={sx("text-align: right")}>{v.tStSum}</span>
            <span>{v.tStAccName}</span>
            <span>{v.tStAccNo}</span>
          </div>
          <div data-st-rows="" style={sx("max-height: max(420px, calc(100vh - 560px)); overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain; scrollbar-width: thin")}>
            {list(v.stRows).map((r, i) => (
              <div key={r.key ?? i} style={sx(`display: grid; grid-template-columns: ${COLS}; gap: 12px; align-items: center; height: 40px; box-sizing: border-box; padding: 0 26px; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13.5px; transition: background .2s; background: ${r.bg ?? "transparent"}`)} className="kza-h6">
                <Check label={r.created} checked={r.checked} onChange={r.toggle} />
                <span style={sx(r.paidStyle)}>{r.paid}</span>
                <span style={sx("color: rgba(22,36,26,.8)")}>{r.created}</span>
                <span style={sx("text-align: right; font-weight: 700")}>{r.sum}</span>
                <span style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{r.accName}</span>
                <span style={sx("color: rgba(22,36,26,.8); letter-spacing: .04em")}>{r.accNo}</span>
              </div>
            ))}
            {v.stEmpty ? <div style={sx("padding: 40px 26px; font-size: 14.5px; color: rgba(22,36,26,.7)")}>{v.tStNone}</div> : null}
          </div>
        </div>
      </div>
      <div data-st-foot="" style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; padding: 10px 26px; border-top: 1px solid rgba(22,36,26,.1); font-size: 13.5px; color: #16241a")}>
        <span style={sx("font-weight: 600")}>{v.stSelCount}</span>
        {v.stSelAny ? (
          <>
            <button type="button" onClick={v.stDownloadSel} style={sx(smallBtn(true))} className="kza-ha">{v.tStDlSel}</button>
            <button type="button" onClick={v.stClearSel} style={sx(smallBtn(false))}>{v.tStClear}</button>
          </>
        ) : null}
        <span style={sx("flex: 1")} />
        <span style={sx("color: rgba(22,36,26,.72)")}>
          Sum <b style={sx("color: #16241a")}>{v.stSumAll}</b>
        </span>
        <Pager
          p={{
            per: v.stPer, onPer: v.onStPer, range: v.stRangeTxt, total: v.stTotal,
            atStart: v.stAtStart, atEnd: v.stAtEnd, prevStyle: v.stPrevStyle, nextStyle: v.stNextStyle,
            first: v.stFirst, prev: v.stPrev, next: v.stNext, last: v.stLast,
            tPer: v.tTblPer, tOf: v.tOf, tFirst: v.tFirstPage, tPrev: v.tPrevPage, tNext: v.tNextPage, tLast: v.tLastPage,
          }}
        />
      </div>
    </div>
  );
}
