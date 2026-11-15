import Hv from "../../Hv";
import { sx, list } from "../adminRuntime";

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
const POP_ITEM =
  "text-align: left; padding: 12px 14px; border-radius: 14px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 14px; color: #16241a";
const stop = (e) => e.stopPropagation();

export default function SupplierView({ v }) {
  return (
    <div style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 24px 24px 8px; min-width: 0; max-width: 100%; box-sizing: border-box")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: flex-end; gap: 16px 20px; justify-content: space-between")}>
        <div>
          <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 30px; margin: 0; letter-spacing: -.02em")}>{v.tSvTitle}</h2>
          <div style={sx("font-size: 13.5px; color: #1f7a3a; font-weight: 600; margin-top: 4px")}>{v.svCountLabel}</div>
        </div>
        <div data-kza-invbar="" style={sx("position: relative; display: flex; flex-wrap: nowrap; align-items: center; gap: 10px")}>
          <div style={{ position: "relative" }}>
            <Hv
              as="button"
              type="button"
              onClick={v.svToggleExp}
              aria-expanded={!!v.svExpOpen}
              style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 999px; border: 0; background: #7c4dcf; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .3s"
              hover="background: #5a2fa3"
            >
              <span aria-hidden="true" style={sx("font-size: 16px; line-height: .6")}>⋮</span> {v.tSvMore}
            </Hv>
            {v.svExpOpen ? (
              <>
                <div onClick={v.svClosePops} style={sx("position: fixed; inset: 0; z-index: 30")} />
                <div style={sx("position: absolute; left: 0; top: calc(100% + 8px); z-index: 31; width: min(300px, 92vw); box-sizing: border-box; border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 20px 50px rgba(22,36,26,.18); padding: 8px; display: grid; gap: 2px")}>
                  <Hv as="button" type="button" onClick={v.svExportCsv} style={POP_ITEM} hover="background: #eaf7ed">
                    {v.tSvExportCsv}
                  </Hv>
                  <Hv as="button" type="button" onClick={v.svExportPrint} style={POP_ITEM} hover="background: #eaf7ed">
                    {v.tSvExportPdf}
                  </Hv>
                </div>
              </>
            ) : null}
          </div>
          <label style={sx("position: relative; display: block; width: 240px; flex: 0 1 240px; min-width: 150px")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(22,36,26,.55)" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={sx("position: absolute; left: 16px; top: 50%; transform: translateY(-50%)")}>
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={v.svQ ?? ""}
              onChange={v.onSvQ}
              placeholder={v.tSvSearch}
              aria-label={v.tSvSearch}
              className="kza-fp"
              style={sx("width: 100%; box-sizing: border-box; padding: 12px 18px 12px 42px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")}
            />
          </label>
          <div style={{ position: "relative" }}>
            <Hv
              as="button"
              type="button"
              onClick={v.svToggleFilt}
              aria-expanded={!!v.svFiltOpen}
              style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer"
              hover="background: #eaf7ed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 4h18l-7 8.5V20l-4-2v-5.5z" />
              </svg>
              {v.tSvFilter} <span aria-hidden="true" style={{ fontSize: "10px" }}>▾</span>
            </Hv>
            {v.svFiltOpen ? (
              <>
                <div onClick={v.svClosePops} style={sx("position: fixed; inset: 0; z-index: 30")} />
                <div style={sx("position: absolute; right: 0; top: calc(100% + 8px); z-index: 31; width: min(420px, 92vw); box-sizing: border-box; border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 20px 50px rgba(22,36,26,.18); padding: 18px; display: grid; gap: 14px")}>
                  {[
                    [v.tSvBooked, v.svBookedChips],
                    [v.tSvReceived, v.svRecvChips],
                  ].map(([label, chips], gi) => (
                    <div key={gi} style={sx("display: grid; gap: 8px")}>
                      <span style={sx("font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.7)")}>{label}</span>
                      <div style={sx("display: flex; flex-wrap: wrap; gap: 8px")}>
                        {list(chips).map((c, i) => (
                          <button key={c.key ?? i} type="button" onClick={c.pick} style={sx(c.style)}>
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <label
            className="kza-hf"
            style={sx("position: relative; display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; white-space: nowrap; transition: background .3s")}
          >
            <span aria-hidden="true" style={sx("font-size: 16px; line-height: 1")}>+</span> {v.tSvCreate}
            <input type="file" accept=".pdf,application/pdf" multiple onChange={v.onPayableFiles} style={sx("position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none")} />
          </label>
        </div>
      </div>
      <div style={sx("margin: 18px -24px 0; overflow-x: auto")}>
        <div style={sx("min-width: 1314px")}>
          <div
            data-kza-svhead=""
            style={sx("display: grid; grid-template-columns: " + v.svCols + "; gap: 12px; padding: 14px 24px; background: #eaf4e7; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: rgba(22,36,26,.7); align-items: center")}
          >
            <span>
              <input type="checkbox" checked={!!v.svAllSel} onChange={v.svToggleAll} aria-label={v.tSvSelectAll} style={sx("width: 17px; height: 17px; accent-color: #1f7a3a; cursor: pointer")} />
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
            <span>{v.tSvDetails}</span>
          </div>
          <div style={sx("max-height: max(380px, calc(100vh - 430px)); overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin")}>
            {list(v.svRows).map((r, i) => (
              <Hv
                key={r.key ?? i}
                onClick={r.look}
                style={"display: grid; grid-template-columns: " + v.svCols + "; gap: 12px; align-items: center; padding: 0 24px; height: 54px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 13.5px; cursor: pointer; transition: background .2s; background: " + r.rowBg}
                hover="background: #f1f8ee"
              >
                <span onClick={stop} style={{ display: "grid" }}>
                  <input type="checkbox" checked={!!r.sel} onChange={r.toggleSel} aria-label={r.no} style={sx("width: 17px; height: 17px; accent-color: #1f7a3a; cursor: pointer")} />
                </span>
                <span style={sx("color: rgba(22,36,26,.8)")}>{r.no}</span>
                <span>{r.type}</span>
                <span style={sx("color: rgba(22,36,26,.8)")}>{r.due}</span>
                <span style={sx("color: rgba(22,36,26,.8)")}>{r.po}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={sx("display: block; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{r.supplier}</span>
                  {r.showClub ? <span style={sx("display: block; font-size: 12px; color: rgba(22,36,26,.6)")}>{r.club}</span> : null}
                </span>
                <span style={sx("overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{r.title}</span>
                <span>
                  <span style={sx(r.bookedStyle)}>{r.booked}</span>
                </span>
                <span>
                  <span style={sx(r.recvStyle)}>{r.recv}</span>
                </span>
                <span style={sx("text-align: right; font-weight: 500; white-space: nowrap")}>{r.total}</span>
                <span onClick={stop} style={sx("display: flex; gap: 6px")}>
                  <Hv
                    as="button"
                    type="button"
                    onClick={r.look}
                    aria-label={v.tSvPreview}
                    title={v.tSvPreview}
                    style="width: 38px; height: 28px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; display: grid; place-items: center; cursor: pointer; transition: background .2s"
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
            {v.svEmpty ? <div style={sx("padding: 22px 24px; font-size: 14px; color: rgba(22,36,26,.72)")}>{v.tPayEmpty}</div> : null}
          </div>
          <div style={sx("display: flex; justify-content: flex-end; padding: 14px 24px 16px; font-size: 14.5px; font-weight: 600; border-top: 1px solid rgba(22,36,26,.12)")}>{v.svTotalAll}</div>
        </div>
      </div>
    </div>
  );
}
