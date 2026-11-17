import Hv from "../../Hv";
import { sx, list } from "../adminRuntime";
import { FilterCells, TablePager } from "./TableParts";

// Økonomi › Leverandørfakturaer: table with selection, sorting, filters,
// export menu and a preview button per row (opens the PDF preview modal).
// Renders `v` from adminSupVals in src/lib/adminLogic.js.
const SORT = (
  <span style={sx("display: inline-flex; flex-direction: column; line-height: 0; opacity: .5")}>
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 14l5-5 5 5" />
    </svg>
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 10l5 5 5-5" />
    </svg>
  </span>
);
const SORT_BTN = sx("display: inline-flex; align-items: center; gap: 6px; padding: 0; border: 0; background: transparent; color: inherit; font: inherit; cursor: pointer");
const stop = (e) => e.stopPropagation();

// [design 17 Nov] compact table: tab header with a ⋯ menu, per-column search
// row, 40px rows and a footer with selection count, sum and pagination.
const MENU_ITEM =
  "display: block; width: 100%; text-align: left; padding: 10px 12px; border-radius: 10px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14px; color: #16241a";

export default function SupplierView({ v }) {
  return (
    <div data-sv-card="" style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 22px; min-width: 0; max-width: 100%; box-sizing: border-box")}>
      <div style={sx("display: flex; align-items: center; gap: 10px")}>
        <div style={sx("flex: 1; min-width: 0; display: flex; gap: 4px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
          <span style={sx("padding: 8px 14px; margin-bottom: -1px; border-radius: 8px 8px 0 0; font-size: 14px; font-weight: 600; color: #16241a; background: #eaf7ed; box-shadow: inset 0 -3px 0 #16241a")}>
            {v.tSvTitle} ({v.svCount})
          </span>
        </div>
        <div style={sx("position: relative; flex: none")}>
          <Hv
            as="button"
            type="button"
            onClick={v.svToggleExp}
            aria-haspopup="true"
            aria-expanded={!!v.svExpOpen}
            aria-label={v.tSvMore}
            title={v.tSvMore}
            style="width: 40px; height: 40px; display: grid; place-items: center; border-radius: 12px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; cursor: pointer; padding: 0; font-size: 18px; line-height: 1"
            hover="background: #eaf4e7"
          >
            ⋯
          </Hv>
          {v.svExpOpen ? (
            <>
              <div onClick={v.svClosePops} style={sx("position: fixed; inset: 0; z-index: 30")} />
              <div style={sx("position: absolute; right: 0; top: calc(100% + 6px); z-index: 31; width: min(280px, 92vw); box-sizing: border-box; border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 18px 40px rgba(22,36,26,.2); padding: 6px; display: grid; gap: 2px")}>
                <Hv as="label" style={MENU_ITEM + "; position: relative"} hover="background: #eaf4e7">
                  + {v.tSvCreate}
                  <input type="file" accept=".pdf,application/pdf" multiple onChange={v.onPayableFiles} style={sx("position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none")} />
                </Hv>
                <Hv as="button" type="button" onClick={v.svExportCsv} style={MENU_ITEM} hover="background: #eaf4e7">
                  {v.tSvExportCsv}
                </Hv>
                <Hv as="button" type="button" onClick={v.svExportPrint} style={MENU_ITEM} hover="background: #eaf4e7">
                  {v.tSvExportPdf}
                </Hv>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div data-sv-tbl="" style={sx("overflow-x: auto; margin-top: 10px")}>
        <div data-sv-minw="" style={sx("min-width: 1080px")}>
          <div
            data-kza-svhead=""
            style={sx("display: grid; grid-template-columns: " + v.svCols + "; gap: 10px; padding: 10px 14px; background: #eaf4e7; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72); align-items: center")}
          >
            <span>
              <input type="checkbox" checked={!!v.svAllSel} onChange={v.svToggleAll} aria-label={v.tSvSelectAll} style={sx("width: 16px; height: 16px; margin: 0; accent-color: #1f7a3a; cursor: pointer; display: block")} />
            </span>
            <button type="button" onClick={v.svSortNo} style={SORT_BTN}>
              {v.tSvNumber}
              {SORT}
            </button>
            <span>{v.tSvType}</span>
            <span>{v.tSvDue}</span>
            <span>{v.tSvPO}</span>
            <span>{v.tSvSupplier}</span>
            <span>{v.tSvTitleCol}</span>
            <button type="button" onClick={v.svSortBooked} style={SORT_BTN}>
              {v.tSvBookedCol}
              {SORT}
            </button>
            <span>{v.tSvReceivedCol}</span>
            <span style={{ textAlign: "right" }}>
              <button type="button" onClick={v.svSortTotal} style={SORT_BTN}>
                {v.tSvTotal}
                {SORT}
              </button>
            </span>
            <span />
          </div>
          <div style={sx("display: grid; grid-template-columns: " + v.svCols + "; gap: 10px; align-items: center; padding: 6px 14px; background: #f6f8f3; border-bottom: 1px solid rgba(22,36,26,.1)")}>
            <span />
            <FilterCells cells={v.svFilterCells} />
            <span />
          </div>
          <div data-sv-rows="" style={sx("max-height: max(380px, calc(100vh - 400px)); overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain; scrollbar-width: thin")}>
            {list(v.svRows).map((r, i) => (
              <Hv
                key={r.key ?? i}
                onClick={r.look}
                style={"display: grid; grid-template-columns: " + v.svCols + "; gap: 10px; align-items: center; padding: 0 14px; height: 40px; box-sizing: border-box; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13.5px; cursor: pointer; transition: background .2s; background: " + r.rowBg}
                hover="background: #f1f8ee"
              >
                <span onClick={stop} style={{ display: "grid" }}>
                  <input type="checkbox" checked={!!r.sel} onChange={r.toggleSel} aria-label={r.no} style={sx("width: 16px; height: 16px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
                </span>
                <span style={sx("color: rgba(22,36,26,.8)")}>{r.no}</span>
                <span>{r.type}</span>
                <span style={sx("color: rgba(22,36,26,.8)")}>{r.due}</span>
                <span style={sx("color: rgba(22,36,26,.8)")}>{r.po}</span>
                <span title={r.club} style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                  <span style={sx("font-weight: 500")}>{r.supplier}</span>
                  {r.showClub ? <> <span style={sx("font-size: 12px; color: rgba(22,36,26,.6)")}>· {r.club}</span></> : null}
                </span>
                <span style={sx("overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{r.title}</span>
                <span>
                  <span style={sx(r.bookedStyle)}>{r.booked}</span>
                </span>
                <span>
                  <span style={sx(r.recvStyle)}>{r.recv}</span>
                </span>
                <span style={sx("text-align: right; font-weight: 500; white-space: nowrap")}>{r.total}</span>
                <span onClick={stop} style={sx("display: flex; gap: 4px; justify-content: flex-end")}>
                  <Hv
                    as="button"
                    type="button"
                    onClick={r.look}
                    aria-label={v.tSvPreview}
                    title={v.tSvPreview}
                    style="width: 30px; height: 26px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; display: grid; place-items: center; cursor: pointer; transition: background .2s"
                    hover="background: #eaf7ed"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </Hv>
                </span>
              </Hv>
            ))}
            {v.svEmpty ? <div style={sx("padding: 30px 14px; text-align: center; font-size: 14px; color: rgba(22,36,26,.65)")}>{v.tPayEmpty}</div> : null}
          </div>
        </div>
      </div>
      <div data-sv-foot="" style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; padding: 10px 14px; border-top: 1px solid rgba(22,36,26,.1); font-size: 13.5px; color: #16241a")}>
        <span style={sx("font-weight: 600")}>{v.svSelCount}</span>
        <Hv as="label" style="position: relative; display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 8px; cursor: pointer; font-size: 13.5px" hover="background: #eaf4e7">
          + {v.tNewShort}
          <input type="file" accept=".pdf,application/pdf" multiple onChange={v.onPayableFiles} style={sx("position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none")} />
        </Hv>
        <span style={sx("flex: 1")} />
        <span style={sx("color: rgba(22,36,26,.72)")}>
          {v.tSvSumLabel} <b style={sx("color: #16241a")}>{v.svTotalAll}</b>
        </span>
        <TablePager v={v} p="sv" total={v.svCount} onPer={v.onSvPer} label={v.tTblPer} />
      </div>
    </div>
  );
}
