import { Fragment } from "react";
import { sx, list } from "../adminRuntime";
import { FilterCells, Check, Pager } from "./TableParts";
import { smallBtn } from "./tableStyles";

// Medlemmer › NIF-rapportering ([design 17 Nov]): tabs, download and column
// picker in the head; filter button + per-column search row in the table;
// selection footer with a compact pager.
const optBtn =
  "display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 10px 8px; border: 0; border-radius: 12px; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: #16241a";
const linkBtn = "border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px";

export default function NifView({ v }) {
  return (
    <div data-nif-card="" style={sx("margin-top: 4px; border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); overflow: hidden; min-width: 0")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; padding: 22px 26px 0")}>
        <div role="tablist" style={sx("flex: 1 1 300px; min-width: 0; display: flex; flex-wrap: wrap; gap: 4px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
          {list(v.nifTabs).map((t, i) => (
            <button key={t.key ?? i} type="button" role="tab" aria-selected={t.on} onClick={t.pick} style={sx(t.style)}>
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={v.nifDownload} style={sx("flex: 0 1 auto; max-width: 100%; box-sizing: border-box; text-align: left; display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-body); font-weight: 600; font-size: 13.5px; cursor: pointer; transition: background .2s")} className="kza-h3">
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4v11M7 10l5 5 5-5M5 20h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {v.tNifDownload}
        </button>
        <button type="button" onClick={v.nvToggle} aria-label={v.tVisHint} title={v.tVisHint} style={sx("flex: none; width: 38px; height: 38px; display: grid; place-items: center; border-radius: 12px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; cursor: pointer; padding: 0")} className="kza-h3">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="5" cy="12" r="1.8" fill="currentColor" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
            <circle cx="19" cy="12" r="1.8" fill="currentColor" />
          </svg>
        </button>
      </div>
      {v.nfHasChips ? (
        <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 26px 0")}>
          {list(v.nfChips).map((c, i) => (
            <span key={c.key ?? i} style={sx("display: inline-flex; align-items: center; gap: 6px; padding: 5px 6px 5px 12px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-size: 12.5px")}>
              {c.label}
              <button type="button" onClick={c.remove} aria-label={v.tRemoveL} style={sx("width: 20px; height: 20px; border-radius: 999px; border: 0; background: rgba(246,248,243,.2); color: #f6f8f3; cursor: pointer; font-size: 11px; line-height: 1")}>×</button>
            </span>
          ))}
        </div>
      ) : null}
      {v.nifMsg ? (
        <div role="status" style={sx("display: flex; align-items: center; gap: 12px; margin: 14px 26px 0; border-radius: 16px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.5); padding: 12px 16px; font-size: 14px")}>
          <span style={sx("flex: 1")}>{v.nifMsg}</span>
          <button type="button" onClick={v.nifCloseMsg} aria-label={v.tClose} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 0; background: rgba(22,36,26,.08); cursor: pointer")}>×</button>
        </div>
      ) : null}
      <div data-fit-keep="" style={sx("position: relative; height: 0")}>
        {v.nfOpen ? (
          <>
            <div onClick={v.nfClose} style={sx("position: fixed; inset: 0; z-index: 30")} />
            <div role="dialog" aria-label={v.tFilter} style={sx("position: absolute; left: 26px; top: 92px; z-index: 31; width: min(660px, 92vw); box-sizing: border-box; border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 24px 60px rgba(22,36,26,.2); overflow: hidden")}>
              <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0, 230px) minmax(0, 1fr)")}>
                <div style={sx("max-height: 400px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; padding: 12px; background: #f4f8f2; border-right: 1px solid rgba(22,36,26,.08)")}>
                  <div style={sx("padding: 4px 10px 8px; font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>{v.tFHint}</div>
                  {list(v.nfCats).map((c, i) => (
                    <button key={c.key ?? i} type="button" onClick={c.pick} style={sx(c.style)} className="kza-a1x2">
                      <span style={sx("flex: 1; min-width: 0")}>{c.label}</span>
                      {c.hasN ? <span style={sx("min-width: 20px; padding: 1px 7px; border-radius: 999px; background: #1f7a3a; color: #ffffff; font-size: 12px; font-weight: 700; text-align: center")}>{c.n}</span> : null}
                    </button>
                  ))}
                </div>
                <div style={sx("display: flex; flex-direction: column; min-width: 0")}>
                  <div style={sx("display: flex; align-items: center; gap: 10px; padding: 16px 18px 8px")}>
                    <span style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 17px")}>{v.nfCatTitle}</span>
                    <button type="button" onClick={v.nfClearCat} style={sx(linkBtn + "; color: rgba(22,36,26,.65)")}>{v.tFClearCat}</button>
                  </div>
                  <div style={sx("max-height: 300px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; padding: 0 12px 10px; display: grid; gap: 2px; align-content: start")}>
                    {list(v.nfOpts).map((o, i) => (
                      <button key={o.key ?? i} type="button" role="menuitemcheckbox" aria-checked={o.on} onClick={o.toggle} style={sx(optBtn)} className="kza-h6">
                        <span aria-hidden="true" style={sx(o.box)}>{o.mark}</span>
                        <span style={sx("flex: 1; min-width: 0")}>{o.label}</span>
                        <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.55)")}>{o.count}</span>
                      </button>
                    ))}
                  </div>
                  <div style={sx("display: flex; justify-content: flex-end; gap: 8px; padding: 12px 18px; border-top: 1px solid rgba(22,36,26,.08)")}>
                    <button type="button" onClick={v.nfClearAll} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-h3">{v.tFClearAll}</button>
                    <button type="button" onClick={v.nfClose} style={sx("padding: 10px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-ha">{v.tFDone}</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {v.nvOpen ? (
          <>
            <div onClick={v.nvToggle} style={sx("position: fixed; inset: 0; z-index: 30")} />
            <div role="menu" style={sx("position: absolute; right: 26px; top: 6px; z-index: 31; width: min(320px, 92vw); box-sizing: border-box; border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 20px 50px rgba(22,36,26,.18); padding: 14px")}>
              <div style={sx("display: flex; align-items: center; gap: 10px; padding: 0 4px 8px")}>
                <span style={sx("flex: 1; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.65)")}>{v.tVisHint}</span>
                <button type="button" onClick={v.nvAll} style={sx(linkBtn + "; color: #1f7a3a")}>{v.tVisAll}</button>
                <button type="button" onClick={v.nvReset} style={sx(linkBtn + "; color: rgba(22,36,26,.65)")}>{v.tVisReset}</button>
              </div>
              <div style={sx("max-height: 340px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; display: grid; gap: 2px")}>
                {list(v.nvCols).map((c, i) => (
                  <button key={c.key ?? i} type="button" role="menuitemcheckbox" aria-checked={c.on} onClick={c.toggle} style={sx(optBtn.replace("padding: 10px 8px", "padding: 9px 8px"))} className="kza-h6">
                    <span aria-hidden="true" style={sx(c.box)}>{c.mark}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div data-nif-tbl="" style={sx("overflow-x: auto; margin-top: 10px")}>
        <div data-nif-minw="" style={sx(`min-width: ${v.nifMinW ?? ""}`)}>
          <div style={sx(`display: grid; grid-template-columns: ${v.nifGrid ?? ""}; gap: 12px; align-items: center; padding: 10px 26px; background: #eaf4e7; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)`)}>
            <Check label={v.tSelectAll} checked={v.nifAllChecked} onChange={v.nifToggleAll} />
            {list(v.nifHead).map((h, i) => (
              <span key={h.key ?? i} style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{h.label}</span>
            ))}
            <span />
          </div>
          <div style={sx(`display: grid; grid-template-columns: ${v.nifGrid ?? ""}; gap: 12px; align-items: center; padding: 6px 26px; background: #f6f8f3; border-bottom: 1px solid rgba(22,36,26,.1)`)}>
            <button type="button" onClick={v.nfToggle} aria-label={v.tFilter} title={v.tFilter} aria-expanded={!!v.nfOpen} style={sx(`position: relative; width: 30px; height: 30px; display: grid; place-items: center; padding: 0; border-radius: 8px; border: 1px solid rgba(22,36,26,.16); background: ${v.nfBtnBg ?? "#ffffff"}; color: ${v.nfBtnInk ?? "#16241a"}; cursor: pointer`)} className="kza-hu">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 4h18l-7 8.5V20l-4-2v-5.5z" />
              </svg>
              {v.nfBadge ? (
                <span style={sx("position: absolute; top: -6px; right: -6px; min-width: 16px; padding: 0 4px; box-sizing: border-box; border-radius: 999px; background: #1f7a3a; color: #ffffff; font-size: 10.5px; font-weight: 700; line-height: 16px; text-align: center")}>{v.nfBadgeN}</span>
              ) : null}
            </button>
            <FilterCells cells={v.nifFilterCells} />
            <span />
          </div>
          <div data-nif-rows="" style={sx("max-height: max(380px, calc(100vh - 400px)); overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain; scrollbar-width: thin")}>
            {list(v.nifRows).map((r, i) => (
              <div key={r.key ?? i} style={sx(`display: grid; grid-template-columns: ${v.nifGrid ?? ""}; gap: 12px; align-items: center; height: 40px; box-sizing: border-box; padding: 0 26px; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13.5px; transition: background .2s; background: ${r.bg ?? "transparent"}`)} className="kza-h6">
                <Check label={r.name} checked={r.checked} onChange={r.toggle} />
                {list(r.cells).map((c, j) => (
                  <Fragment key={c.key ?? j}>
                    {c.isStatus ? (
                      <span>
                        <span style={sx(r.pill)}>{c.val}</span>
                      </span>
                    ) : null}
                    {c.isText ? <span style={sx(c.style)}>{c.val}</span> : null}
                  </Fragment>
                ))}
                {v.nifHasAct ? (
                  <span style={sx("display: flex; justify-content: flex-end")}>
                    <button type="button" onClick={r.act} style={sx(r.btn)} className="kza-a1x3">{r.actLabel}</button>
                  </span>
                ) : null}
                {v.nifNoAct ? <span /> : null}
              </div>
            ))}
            {v.nifEmpty ? (
              <div style={sx("display: grid; justify-items: center; gap: 14px; padding: 60px 20px 70px; color: rgba(22,36,26,.7)")}>
                <svg width="52" height="60" viewBox="0 0 56 64" fill="none" stroke="rgba(22,36,26,.7)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <rect x="3" y="3" width="50" height="58" rx="4" />
                  <path d="M14 18h28M14 29h28M14 40h28M14 51h28" />
                </svg>
                <span style={sx("font-size: 16px")}>{v.tNifNone}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div data-nif-foot="" style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; padding: 10px 26px; border-top: 1px solid rgba(22,36,26,.1); font-size: 13.5px; color: #16241a")}>
        <span style={sx("font-weight: 600")}>{v.nifSelCount}</span>
        {v.nifSelAny ? (
          <>
            <button type="button" onClick={v.nifActSel} style={sx(smallBtn(true))} className="kza-ha">{v.tNifActSel}</button>
            <button type="button" onClick={v.nifClearSel} style={sx(smallBtn(false))}>{v.tBkClear}</button>
          </>
        ) : null}
        <span style={sx("flex: 1")} />
        <Pager
          p={{
            per: v.nifPer, onPer: v.onNifPer, range: v.nifRange, total: v.nifTotal,
            atStart: v.nifAtStart, atEnd: v.nifAtEnd, prevStyle: v.nifPrevStyle, nextStyle: v.nifNextStyle,
            first: v.nifFirst, prev: v.nifPrev, next: v.nifNext, last: v.nifLast,
            tPer: v.tTblPer, tOf: v.tOf, tFirst: v.tFirstPage, tPrev: v.tPrevPage, tNext: v.tNextPage, tLast: v.tLastPage,
          }}
        />
      </div>
    </div>
  );
}
