import { sx, list } from "../adminRuntime";
import { FilterCells, Check, Pager } from "./TableParts";
import { footStyle, headRow, filterRow } from "./tableStyles";

// Økonomi › Lagkasse: the transaction table ([design 17 Nov]: selectable
// rows, a search field per column, compact pager). Period, balance and cash
// flow live in the KPI panel. Renders the view object `v` from adminLogic.js.
const mono = "font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; color: rgba(22,36,26,.75)";
const ell = "min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap";
const menuBtn =
  "display: block; width: 100%; text-align: left; cursor: pointer; padding: 11px 14px; border-radius: 14px; border: 0; background: transparent; font-family: var(--font-body); color: #16241a; transition: background .25s";

export default function TeamFundView({ v }) {
  return (
    <div style={sx("margin-top: 4px; display: grid; gap: 16px")}>
      <div data-tf-card="" style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 22px")}>
        <div style={sx("display: flex; flex-wrap: wrap; gap: 12px; align-items: center")}>
          <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 21px; margin: 0; flex: 1; min-width: 0")}>{v.tTfTx}</h2>
          <span style={sx("font-size: 13px; color: rgba(22,36,26,.72)")}>{v.tfTxCount}</span>
          <div style={sx("position: relative")}>
            <button type="button" onClick={v.toggleExport} aria-haspopup="true" aria-expanded={!!v.exportOpen} style={sx("display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px; border: 1px solid #1f7a3a; background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .3s")} className="kza-h3">
              {v.tExport} <span style={sx("font-size: 11px")}>▾</span>
            </button>
            {v.exportOpen ? (
              <div style={sx("position: absolute; right: 0; top: calc(100% + 8px); z-index: 30; min-width: 230px; border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 20px 46px rgba(22,36,26,.24); padding: 8px; display: grid; gap: 4px")}>
                <button type="button" onClick={v.exportExcel} style={sx(menuBtn)} className="kza-h3">
                  <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14px")}>Excel</span>
                  <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.72); margin-top: 2px")}>{v.tExportExcelNote}</span>
                </button>
                <button type="button" onClick={v.exportPdf} style={sx(menuBtn)} className="kza-h3">
                  <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14px")}>PDF</span>
                  <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.72); margin-top: 2px")}>{v.tExportPdfNote}</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div data-tf-tbl="" style={sx("overflow-x: auto; margin-top: 12px")}>
          <div data-tf-minw="" style={sx(`min-width: ${v.tfMinW ?? ""}`)}>
            <div style={sx(headRow(v.tfCols))}>
              <Check label={v.tSelectAll} checked={v.tfAllChecked} onChange={v.tfToggleAll} />
              <span>{v.tColDate}</span>
              <span>{v.tColTx}</span>
              {v.tfShowAcc ? <span>{v.tColAcc}</span> : null}
              <span>{v.tColInv}</span>
              <span>{v.tColDesc}</span>
              <span>{v.tColParty}</span>
              <span style={sx("text-align: right")}>{v.tColSum}</span>
            </div>
            <div style={sx(filterRow(v.tfCols))}>
              <span />
              <FilterCells cells={v.tfFilterCells} />
            </div>
            <div data-tf-rows="" style={sx("max-height: max(400px, calc(100vh - 380px)); height: auto; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin")}>
              {list(v.tfTx).map((t, i) => (
                <div key={t.key ?? i} style={sx(`display: grid; grid-template-columns: ${v.tfCols ?? ""}; gap: 12px; align-items: center; height: 40px; box-sizing: border-box; padding: 0 14px; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13.5px; background: ${t.bg ?? "transparent"}`)} className="kza-h6">
                  <Check label={t.tx} checked={t.checked} onChange={t.toggle} />
                  <span style={sx("color: rgba(22,36,26,.8)")}>{t.date}</span>
                  <span style={sx(mono)}>{t.tx}</span>
                  {t.hasClub ? (
                    <span title={t.acc} style={sx(ell)}>
                      {t.club} <span style={sx("font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: rgba(22,36,26,.65)")}>{t.acc}</span>
                    </span>
                  ) : null}
                  <span style={sx(mono)}>{t.inv}</span>
                  <span style={sx(ell)}>{t.desc}</span>
                  <span style={sx(ell + "; color: rgba(22,36,26,.8)")}>{t.party}</span>
                  <span style={sx(t.sumStyle)}>{t.sum}</span>
                </div>
              ))}
              {v.tfEmpty ? (
                <div style={sx("padding: 30px 14px; text-align: center; font-size: 14px; color: rgba(22,36,26,.65)")}>{v.tTfEmpty}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div data-tf-foot="" style={sx(footStyle)}>
          <span style={sx("font-weight: 600")}>{v.tfSelCount}</span>
          <span style={sx("flex: 1")} />
          <Pager
            p={{
              per: v.tfPageSize, onPer: v.onTfPageSize, range: v.tfRangeOnly, total: v.tfTotal,
              atStart: v.tfNoPrev, atEnd: v.tfNoNext, prevStyle: v.tfPrevStyle, nextStyle: v.tfNextStyle,
              first: v.tfFirst, prev: v.tfPrev, next: v.tfNext, last: v.tfLast,
              tPer: v.tPerPage, tOf: v.tOf, tFirst: v.tFirstPage, tPrev: v.tPrevPage, tNext: v.tNextPage, tLast: v.tLastPage,
            }}
          />
        </div>
      </div>
    </div>
  );
}
