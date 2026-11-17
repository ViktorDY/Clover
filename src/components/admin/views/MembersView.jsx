import { Fragment } from "react";
import { sx, list } from "../adminRuntime";
import { FilterCells, Check, Pager } from "./TableParts";
import { smallBtn } from "./tableStyles";

// Medlemmer › Medlemsregister ([design 17 Nov]): tabs (members / pending /
// age and gender), a "Behandle" menu for ticked members with a bulk-edit
// dialog, a "…" menu (columns, export, add), the member table with a search
// field per column and a compact pager, and — beside it — a card for the
// picked member (details, attendance chart, private notes).
const menuItem =
  "display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 10px 12px; border-radius: 10px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14px; color: #16241a";
const menuBox = (w) =>
  `position: absolute; right: 0; top: calc(100% + 6px); z-index: 41; width: ${w}; padding: 6px; border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 20px 48px rgba(22,36,26,.18); display: grid; gap: 2px`;
const capLbl = "display: grid; gap: 6px; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.7)";
const selectBox = "width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; font-family: var(--font-body); font-size: 14px; color: #16241a; text-transform: none; letter-spacing: 0; font-weight: 400";
const optBtn = "display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 10px 8px; border: 0; border-radius: 12px; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: #16241a";
const linkBtn = "border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px";
const PEND_COLS = "36px minmax(80px,1fr) minmax(80px,1fr) minmax(90px,.8fr) minmax(80px,.8fr) minmax(110px,1fr) 72px";
const card = "border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); min-width: 0; padding: 18px 20px 16px; display: grid; gap: 12px";

function Icon({ d }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={sx("flex: none; color: #1f7a3a")}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function pagerProps(v, pre, nav) {
  return {
    per: v[pre + "Per"], onPer: v["on" + pre[0].toUpperCase() + pre.slice(1) + "Per"], perOpts: v.tblPerOpts,
    range: v[pre + "Range"], total: v[pre + "Total"], atStart: v[pre + "AtStart"], atEnd: v[pre + "AtEnd"],
    prevStyle: v[pre + (nav ? "NavPrevStyle" : "PrevStyle")], nextStyle: v[pre + (nav ? "NavNextStyle" : "NextStyle")],
    first: v[pre + "First"], prev: v[pre + "Prev"], next: v[pre + "Next"], last: v[pre + "Last"],
    tPer: v.tTblPer, tOf: v.tOf, tFirst: v.tFirstPage, tPrev: v.tPrevPage, tNext: v.tNextPage, tLast: v.tLastPage,
  };
}

function Demo({ v }) {
  return (
    <div data-mem-tbl="demo" style={sx("margin-top: 10px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin")}>
      <div style={sx("font-size: 13px; color: rgba(22,36,26,.75)")}>{v.demoSub}</div>
      <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 10px; margin-top: 12px")}>
        {[
          ["#eaf7ed", "rgba(31,122,58,.3)", "#1f7a3a", v.tGirls, v.girlsTotal],
          ["#fff4cf", "#f2d27a", "#e0a100", v.tBoys, v.boysTotal],
        ].map(([bg, bd, dot, label, val]) => (
          <div key={dot} style={sx(`border-radius: 20px; background: ${bg}; border: 1px solid ${bd}; padding: 13px 15px`)}>
            <div style={sx("display: flex; align-items: center; gap: 8px")}>
              <span style={sx(`width: 10px; height: 10px; border-radius: 999px; background: ${dot}`)} />
              <span style={sx("font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #16241a")}>{label}</span>
            </div>
            <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin-top: 6px")}>{val}</div>
          </div>
        ))}
      </div>
      <div style={sx("position: relative; margin-top: 20px; padding-left: 30px")}>
        <div aria-hidden="true" style={sx("position: absolute; left: 30px; right: 0; top: 0; height: clamp(200px, calc(100vh - 560px), 360px); display: flex; flex-direction: column; justify-content: space-between; pointer-events: none")}>
          {list(v.ageTicks).map((t, i) => (
            <div key={t.key ?? i} style={sx("position: relative; height: 0; border-top: 1px dashed rgba(22,36,26,.12)")}>
              <span style={sx("position: absolute; left: -30px; top: -8px; width: 24px; text-align: right; font-size: 11px; color: rgba(22,36,26,.6)")}>{t.label}</span>
            </div>
          ))}
        </div>
        <div style={sx("position: relative; display: grid; grid-template-columns: repeat(6, minmax(0,1fr)); gap: 8px; height: clamp(200px, calc(100vh - 560px), 360px); align-items: end; border-bottom: 2px solid rgba(22,36,26,.2)")}>
          {list(v.ageBands).map((b, i) => (
            <div key={b.key ?? i} style={sx("display: flex; align-items: flex-end; justify-content: center; gap: 4px; height: 100%")}>
              <span title={b.girlsTitle} style={sx(`flex: 0 1 16px; min-width: 8px; border-radius: 8px 8px 0 0; background: linear-gradient(180deg, #3f9a58, #1f7a3a); height: ${b.girlsH}; transition: height .6s cubic-bezier(.2,.7,.2,1)`)} />
              <span title={b.boysTitle} style={sx(`flex: 0 1 16px; min-width: 8px; border-radius: 8px 8px 0 0; background: linear-gradient(180deg, #ffd66e, #ffc94a); height: ${b.boysH}; transition: height .6s cubic-bezier(.2,.7,.2,1)`)} />
            </div>
          ))}
        </div>
        <div style={sx("display: grid; grid-template-columns: repeat(6, minmax(0,1fr)); gap: 8px; margin-top: 8px")}>
          {list(v.ageBands).map((b, i) => (
            <div key={b.key ?? i} style={sx("text-align: center")}>
              <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 12px")}>{b.label}</div>
              <div style={sx("font-size: 11px; color: rgba(22,36,26,.65); margin-top: 1px")}>{b.total}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={sx("display: flex; flex-wrap: wrap; gap: 14px; margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(22,36,26,.1); font-size: 13px; color: rgba(22,36,26,.78)")}>
        <span>{v.demoAvgAge}</span>
        <span>{v.demoLargest}</span>
      </div>
    </div>
  );
}

function Pending({ v }) {
  return (
    <>
      <div data-mem-tbl="pend" style={sx("overflow-x: auto; margin-top: 10px")}>
        <div style={sx("min-width: 620px")}>
          <div style={sx(`display: grid; grid-template-columns: ${PEND_COLS}; gap: 12px; align-items: center; padding: 10px 14px; background: #eaf4e7; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)`)}>
            <Check label={v.tSelectAll} checked={v.pendAllChecked} onChange={v.pendToggleAll} />
            <span>{v.tFirst}</span>
            <span>{v.tLast}</span>
            <span>{v.tPGroupRole}</span>
            <span>{v.tPGroups}</span>
            <span>{v.tPPay}</span>
            <span />
          </div>
          <div style={sx(`display: grid; grid-template-columns: ${PEND_COLS}; gap: 12px; align-items: center; padding: 6px 14px; background: #f6f8f3; border-bottom: 1px solid rgba(22,36,26,.1)`)}>
            <span />
            <FilterCells cells={v.pendFilterCells} />
            <span />
          </div>
          {list(v.pendRows).map((r, i) => (
            <div key={r.key ?? i} style={sx(`display: grid; grid-template-columns: ${PEND_COLS}; gap: 12px; align-items: center; height: 40px; box-sizing: border-box; padding: 0 14px; border-bottom: 1px solid rgba(22,36,26,.07); font-size: 13.5px; background: ${r.bg ?? "transparent"}`)} className="kza-h6">
              <Check label={r.first} checked={r.checked} onChange={r.toggle} />
              <span style={sx("overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{r.first}</span>
              <span style={sx("overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{r.last}</span>
              <span style={sx("color: rgba(22,36,26,.8)")}>{r.role}</span>
              <span style={sx("color: rgba(22,36,26,.8)")}>{r.group}</span>
              <span style={sx("color: rgba(22,36,26,.8); overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{r.pay}</span>
              <span style={sx("display: flex; gap: 6px; justify-content: flex-end")}>
                <button type="button" onClick={r.approve} aria-label={v.tPendApprove} title={v.tPendApprove} style={sx("width: 28px; height: 28px; display: grid; place-items: center; padding: 0; border-radius: 8px; border: 0; background: #1f7a3a; color: #ffffff; cursor: pointer")} className="kza-ha">
                  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" onClick={r.reject} aria-label={v.tPendReject} title={v.tPendReject} style={sx("width: 28px; height: 28px; display: grid; place-items: center; padding: 0; border-radius: 8px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; cursor: pointer")} className="kza-d17f">
                  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </span>
            </div>
          ))}
          {v.pendEmpty ? <div style={sx("padding: 40px 20px; text-align: center; font-size: 14px; color: rgba(22,36,26,.65)")}>{v.tPendNone}</div> : null}
        </div>
      </div>
      <div data-mem-foot="" style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; padding: 10px 14px; border-top: 1px solid rgba(22,36,26,.1); font-size: 13.5px; color: #16241a")}>
        <span style={sx("font-weight: 600")}>{v.pendSelCount}</span>
        {v.pendSelAny ? (
          <>
            <button type="button" onClick={v.pendApproveSel} style={sx(smallBtn(true))} className="kza-ha">{v.tPendApproveSel}</button>
            <button type="button" onClick={v.pendRejectSel} style={sx(smallBtn(false))} className="kza-hv">{v.tPendRejectSel}</button>
          </>
        ) : null}
        <span style={sx("flex: 1")} />
        <Pager p={pagerProps(v, "pend", false)} />
      </div>
    </>
  );
}

function FilterPanel({ v }) {
  return (
    <>
      <div onClick={v.fClose} style={sx("position: fixed; inset: 0; z-index: 30")} />
      <div role="dialog" aria-label={v.tFilter} style={sx("position: absolute; left: 0; right: auto; top: calc(100% + 8px); z-index: 31; width: min(620px, 80vw); box-sizing: border-box; border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 24px 60px rgba(22,36,26,.2); overflow: hidden")}>
        <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0, 230px) minmax(0, 1fr)")}>
          <div style={sx("max-height: 400px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; padding: 12px; background: #f4f8f2; border-right: 1px solid rgba(22,36,26,.08)")}>
            <div style={sx("padding: 4px 10px 8px; font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>{v.tFHint}</div>
            {list(v.fCats).map((c, i) => (
              <button key={c.key ?? i} type="button" onClick={c.pick} style={sx(c.style)} className="kza-a1x2">
                <span style={sx("flex: 1; min-width: 0")}>{c.label}</span>
                {c.hasN ? <span style={sx("min-width: 20px; padding: 1px 7px; border-radius: 999px; background: #1f7a3a; color: #ffffff; font-size: 12px; font-weight: 700; text-align: center")}>{c.n}</span> : null}
              </button>
            ))}
          </div>
          <div style={sx("display: flex; flex-direction: column; min-width: 0")}>
            <div style={sx("display: flex; align-items: center; gap: 10px; padding: 16px 18px 8px")}>
              <span style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 17px")}>{v.fCatTitle}</span>
              <button type="button" onClick={v.fClearCat} style={sx(linkBtn + "; color: rgba(22,36,26,.65)")}>{v.tFClearCat}</button>
            </div>
            <div style={sx("max-height: 300px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; padding: 0 12px 10px; display: grid; gap: 2px; align-content: start")}>
              {list(v.fOpts).map((o, i) => (
                <button key={o.key ?? i} type="button" role="menuitemcheckbox" aria-checked={o.on} onClick={o.toggle} style={sx(optBtn)} className="kza-h6">
                  <span aria-hidden="true" style={sx(o.box)}>{o.mark}</span>
                  <span style={sx("flex: 1; min-width: 0")}>{o.label}</span>
                  <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.55)")}>{o.count}</span>
                </button>
              ))}
            </div>
            <div style={sx("display: flex; justify-content: flex-end; gap: 8px; padding: 12px 18px; border-top: 1px solid rgba(22,36,26,.08)")}>
              <button type="button" onClick={v.fClearAll} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-h3">{v.tFClearAll}</button>
              <button type="button" onClick={v.fClose} style={sx("padding: 10px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-ha">{v.tFDone}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MemberTable({ v }) {
  return (
    <>
      {v.fHasChips ? (
        <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px")}>
          {list(v.fChips).map((c, i) => (
            <span key={c.key ?? i} style={sx("display: inline-flex; align-items: center; gap: 6px; padding: 5px 6px 5px 12px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-size: 12.5px")}>
              {c.label}
              <button type="button" onClick={c.remove} aria-label={v.tRemoveL} style={sx("width: 20px; height: 20px; border-radius: 999px; border: 0; background: rgba(246,248,243,.2); color: #f6f8f3; cursor: pointer; font-size: 11px; line-height: 1")}>×</button>
            </span>
          ))}
        </div>
      ) : null}
      {v.memMsg ? (
        <div role="status" style={sx("margin-top: 12px; display: flex; align-items: center; gap: 12px; border-radius: 16px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.5); padding: 12px 16px; font-size: 14px")}>
          <span style={sx("flex: 1")}>{v.memMsg}</span>
          <button type="button" onClick={v.closeMemMsg} aria-label={v.tClose} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 0; background: rgba(22,36,26,.08); cursor: pointer")}>×</button>
        </div>
      ) : null}
      <div style={sx("position: relative; display: flex; justify-content: space-between; height: 0; margin: 0")}>
        <span style={sx("position: relative")}>{v.fOpen ? <FilterPanel v={v} /> : null}</span>
        <div style={sx("position: relative")}>
          {v.visOpen ? (
            <>
              <div onClick={v.closeVis} style={sx("position: fixed; inset: 0; z-index: 30")} />
              <div role="menu" aria-label={v.tVisHint} style={sx("position: absolute; right: 0; top: calc(100% + 8px); z-index: 31; width: min(320px, 92vw); box-sizing: border-box; border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 20px 50px rgba(22,36,26,.18); padding: 14px")}>
                <div style={sx("display: flex; align-items: center; gap: 10px; padding: 0 4px 8px")}>
                  <span style={sx("flex: 1; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.65)")}>{v.tVisHint}</span>
                  <button type="button" onClick={v.visAll} style={sx(linkBtn + "; color: #1f7a3a")}>{v.tVisAll}</button>
                  <button type="button" onClick={v.visReset} style={sx(linkBtn + "; color: rgba(22,36,26,.65)")}>{v.tVisReset}</button>
                </div>
                <div style={sx("max-height: 340px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; display: grid; gap: 2px")}>
                  {list(v.visCols).map((c, i) => (
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
      </div>
      {v.showGroupFilter ? (
        <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 10px")}>
          <span style={sx("font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.75); margin-right: 4px")}>{v.tGroupFilter}</span>
          {list(v.groupTabs).map((g, i) => (
            <button key={g.key ?? i} type="button" onClick={g.pick} style={sx(g.style)}>{g.label}</button>
          ))}
        </div>
      ) : null}
      <div data-mem-tbl="mem" style={sx("overflow-x: auto; margin-top: 10px")}>
        <div data-mem-minw="" style={sx(`min-width: ${v.tblMinW ?? ""}`)}>
          <div style={sx(`display: grid; grid-template-columns: ${v.tblGrid ?? ""}; gap: 12px; align-items: center; padding: 10px 14px; background: #eaf4e7; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)`)}>
            <Check label={v.tSelectAll} checked={v.tblAllChecked} onChange={v.tblToggleAll} size={18} />
            {list(v.tblHead).map((h, i) => (
              <span key={h.key ?? i} style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{h.label}</span>
            ))}
          </div>
          <div style={sx(`display: grid; grid-template-columns: ${v.tblGrid ?? ""}; gap: 12px; align-items: center; padding: 6px 14px; background: #f6f8f3; border-bottom: 1px solid rgba(22,36,26,.1)`)}>
            <div style={sx("position: relative; display: flex; align-items: center")}>
              <button type="button" onClick={v.fToggle} aria-haspopup="true" aria-expanded={!!v.fOpen} aria-label={v.tFilter} title={v.tFilter} style={sx("width: 30px; height: 30px; display: grid; place-items: center; position: relative; border-radius: 8px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; cursor: pointer; padding: 0")} className="kza-h3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 4h18l-7 8.5V20l-4-2v-5.5z" /></svg>
                {v.fBadge ? <span style={sx("position: absolute; top: -6px; right: -6px; min-width: 16px; height: 16px; padding: 0 4px; box-sizing: border-box; border-radius: 999px; background: #1f7a3a; color: #ffffff; font-size: 10px; font-weight: 700; display: grid; place-items: center")}>{v.fBadgeN}</span> : null}
              </button>
            </div>
            <FilterCells cells={v.tblFilterCells} />
          </div>
          <div data-mem-rows="" style={sx("max-height: max(450px, calc(100vh - 360px)); height: auto; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin")}>
            {list(v.tblRows).map((r, i) => (
              <div key={r.key ?? i} onClick={r.open} style={sx(r.rowStyle)} className="kza-h6">
                <span onClick={v.stopClick} style={sx("display: flex; align-items: center")}>
                  <Check label={r.name} checked={r.checked} onChange={r.toggle} size={18} />
                </span>
                {list(r.cells).map((c, j) => (
                  <Fragment key={c.key ?? j}>
                    {c.isStatus ? (
                      <span>
                        <span style={sx(r.statusStyle)}>{r.status}</span>
                      </span>
                    ) : null}
                    {c.isText ? <span style={sx("min-width: 0; color: rgba(22,36,26,.8); overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{c.val}</span> : null}
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div data-kza-tblfoot="" style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; padding: 10px 14px; border-top: 1px solid rgba(22,36,26,.1); font-size: 13.5px; color: #16241a")}>
          <span style={sx("font-weight: 600")}>{v.tblSelCount}</span>
          <button type="button" onClick={v.openAddMember} style={sx("display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 8px; border: 0; background: transparent; color: #16241a; font-family: var(--font-body); font-size: 13.5px; cursor: pointer")} className="kza-h6">
            <span aria-hidden="true" style={sx("font-size: 17px; line-height: 1")}>+</span>
            {v.tNewShort}
          </button>
          <span style={sx("flex: 1")} />
          <Pager p={pagerProps(v, "tbl", true)} />
        </div>
      </div>
      {v.impMsg ? (
        <div role="status" style={sx("margin-top: 12px; display: flex; align-items: center; gap: 12px; border-radius: 16px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.5); padding: 12px 16px; font-size: 14px")}>
          <span style={sx("flex: 1")}>{v.impMsg}</span>
          <button type="button" onClick={v.closeImpMsg} aria-label={v.tClose} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 0; background: rgba(22,36,26,.08); cursor: pointer")}>×</button>
        </div>
      ) : null}
    </>
  );
}

function BulkEdit({ v }) {
  return (
    <div style={sx("position: fixed; inset: 0; z-index: 90; background: rgba(22,36,26,.42); display: grid; place-items: center; padding: 16px")}>
      <form onSubmit={v.bhSave} role="dialog" aria-modal="true" aria-label={v.bhEditTitle} style={sx("width: min(460px, 100%); max-height: calc(100vh - 32px); overflow-y: auto; box-sizing: border-box; border-radius: 24px; background: #ffffff; padding: 24px; display: grid; gap: 16px; box-shadow: 0 30px 70px rgba(22,36,26,.3)")}>
        <div style={sx("display: flex; align-items: flex-start; gap: 12px")}>
          <div style={sx("flex: 1; min-width: 0")}>
            <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 21px; margin: 0")}>{v.bhEditTitle}</h2>
            <div style={sx("font-size: 13px; color: rgba(22,36,26,.7); margin-top: 4px")}>{v.bhEditNames}</div>
          </div>
          <button type="button" onClick={v.bhEditClose} aria-label={v.tClose} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; cursor: pointer; font-size: 15px; color: #16241a")}>✕</button>
        </div>
        <label style={sx(capLbl)}>
          {v.tBhGroup}
          <select value={v.bhGrp ?? ""} onChange={v.onBhGrp} style={sx(selectBox)}>
            {list(v.bhGrpOpts).map((o, i) => <option key={o.key ?? i} value={o.id}>{o.label}</option>)}
          </select>
        </label>
        <label style={sx(capLbl)}>
          {v.tBhType}
          <select value={v.bhType ?? ""} onChange={v.onBhType} style={sx(selectBox)}>
            {list(v.bhTypeOpts).map((o, i) => <option key={o.key ?? i} value={o.id}>{o.label}</option>)}
          </select>
        </label>
        <div style={sx("display: grid; gap: 6px")}>
          <span style={sx("font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.7)")}>Status</span>
          <label style={sx("display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(22,36,26,.18); cursor: pointer; font-size: 14px")}>
            <Check checked={v.bhActive} onChange={v.bhToggleActive} size={18} />
            <span style={sx("flex: 1")}>{v.tBhActive}</span>
            <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.6)")}>{v.bhActiveNote}</span>
          </label>
        </div>
        <div style={sx("display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px")}>
          <button type="button" onClick={v.bhEditClose} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-body); font-weight: 700; font-size: 14px; cursor: pointer")}>{v.tCancelL}</button>
          <button type="submit" style={sx("padding: 10px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-body); font-weight: 700; font-size: 14px; cursor: pointer")} className="kza-ha">{v.tBhSave}</button>
        </div>
      </form>
    </div>
  );
}

function Chart({ v }) {
  return (
    <div style={sx("display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 0")}>
        <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 18px; margin: 0; flex: 1; min-width: 0")}>{v.tAttendance}</h4>
        <select value={v.memPeriod ?? ""} onChange={v.onMemPeriod} style={sx("padding: 10px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; outline: none")}>
          {list(v.memPeriods).map((p, i) => <option key={p.key ?? i} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div style={sx("border-radius: 26px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); padding: 10px 14px 8px; margin-top: 8px; flex: 1 1 auto; display: flex; flex-direction: column; min-height: 200px")}>
        <div style={sx("font-size: 11.5px; color: rgba(22,36,26,.75); padding-left: 52px")}>{v.tYAxis}</div>
        <div style={sx("position: relative; width: 100%; flex: 1 1 auto; min-height: 150px; margin-top: 2px")}>
          <svg viewBox="0 0 520 260" preserveAspectRatio="none" style={sx("position: absolute; inset: 0; width: 100%; height: 100%; display: block")}>
            {list(v.chartGrid).map((g, i) => (
              <line key={g.key ?? i} x1="52" y1={g.y} x2="504" y2={g.y} stroke="rgba(22,36,26,.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            <line x1="52" y1="216" x2="504" y2="216" stroke="rgba(22,36,26,.28)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <line x1="52" y1="24" x2="52" y2="216" stroke="rgba(22,36,26,.28)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <defs>
              <linearGradient id="kzaAvgFill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c9d8c4" stopOpacity="0.55" />
                <stop offset="1" stopColor="#c9d8c4" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="kzaMemFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1f7a3a" stopOpacity="0.42" />
                <stop offset="1" stopColor="#1f7a3a" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <path d={v.avgArea} fill="url(#kzaAvgFill2)" stroke="none" />
            <path d={v.memArea} fill="url(#kzaMemFill)" stroke="none" />
            <path d={v.avgPath} fill="none" stroke="#8fae86" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="7 6" vectorEffect="non-scaling-stroke" />
            <path d={v.memPath} fill="none" stroke="#1f7a3a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            {list(v.memDots).map((d, i) => (
              <circle key={d.key ?? i} cx={d.x} cy={d.y} r="4.5" fill="#1f7a3a" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          {list(v.chartYTicks).map((t, i) => <span key={t.key ?? i} style={sx(t.style)}>{t.label}</span>)}
          {list(v.chartXTicks).map((t, i) => <span key={t.key ?? i} style={sx(t.style)}>{t.label}</span>)}
          {list(v.hoverZones).map((z, i) => <span key={z.key ?? i} onMouseEnter={z.enter} onMouseLeave={z.leave} style={sx(z.style)} />)}
          {v.hoverOn ? (
            <>
              <div style={sx(v.hoverStyle)}>
                <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 12.5px")}>{v.hoverLabel}</div>
                <div style={sx("display: flex; align-items: center; gap: 7px; margin-top: 5px; font-size: 12.5px")}>
                  <span style={sx("width: 12px; height: 3px; border-radius: 999px; background: #74cd85")} />
                  {v.hoverMem}
                </div>
                <div style={sx("display: flex; align-items: center; gap: 7px; margin-top: 3px; font-size: 12.5px; color: rgba(246,248,243,.75)")}>
                  <span style={sx("width: 12px; height: 3px; border-radius: 999px; background: #c9d8c4")} />
                  {v.hoverAvg}
                </div>
              </div>
              <span style={sx(v.hoverDotStyle)} />
            </>
          ) : null}
        </div>
        <div style={sx("display: flex; flex-wrap: wrap; gap: 18px; margin-top: 8px; padding-left: 6px")}>
          <span style={sx("display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(22,36,26,.75)")}>
            <span style={sx("width: 18px; height: 3px; border-radius: 999px; background: #1f7a3a")} />
            {v.memName}
          </span>
          <span style={sx("display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(22,36,26,.75)")}>
            <span style={sx("width: 18px; height: 3px; border-radius: 999px; background: #8fae86")} />
            {v.tClubAvg}
          </span>
        </div>
      </div>
    </div>
  );
}

function Notes({ v }) {
  return (
    <div style={sx("flex: 1 1 auto; overflow-y: auto; min-height: 0")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px")}>
        <span style={sx("padding: 5px 11px; border-radius: 999px; background: rgba(124,77,207,.14); color: #5a2fa3; font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase")}>{v.tNotesPrivate}</span>
      </div>
      <div style={sx("display: grid; gap: 10px; margin-top: 14px")}>
        {list(v.memNotes).map((n, i) => (
          <div key={n.key ?? i} style={sx("border-radius: 20px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); padding: 13px 16px")}>
            <div style={sx("display: flex; align-items: baseline; gap: 8px")}>
              <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 13.5px")}>{n.from}</span>
              <span style={sx("font-size: 12px; color: rgba(22,36,26,.75)")}>{n.when}</span>
            </div>
            <div style={sx("font-size: 14.5px; line-height: 1.55; margin-top: 4px; color: rgba(22,36,26,.8)")}>{n.text}</div>
          </div>
        ))}
        {v.noNotes ? <div style={sx("font-size: 14px; color: rgba(22,36,26,.75)")}>{v.tNoNotes}</div> : null}
      </div>
      <form onSubmit={v.addNote} style={sx("display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px")}>
        <input type="text" value={v.noteDraft ?? ""} onChange={v.onNoteDraft} placeholder={v.tNotePh} style={sx("flex: 1 1 200px; min-width: 0; padding: 13px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-f7" />
        <button type="submit" style={sx("padding: 13px 22px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer; transition: background .3s")} className="kza-ha">{v.tAddNote}</button>
      </form>
    </div>
  );
}

function MemberSide({ v }) {
  const none = v.mcNone ? <div style={sx("padding: 20px 4px; font-size: 14px; color: rgba(22,36,26,.6)")}>{v.tMcPick}</div> : null;
  return (
    <div data-kza-roles-right="" style={sx("display: grid; gap: 20px; align-content: start; min-width: 0")}>
      <div data-kza-rbox="" data-mc-card="" style={sx(card)}>
        {v.mcHas ? (
          <>
            <div style={sx("display: flex; align-items: center; gap: 12px")}>
              <span style={sx("width: 38px; height: 38px; flex: 0 0 auto; border-radius: 999px; background: #16241a; color: #f6f8f3; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 13px")}>{v.memInitials}</span>
              <span style={sx("flex: 1; min-width: 0")}>
                <b style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 17px")}>{v.memName}</b>
                <span style={sx("display: block; margin-top: 2px; font-size: 13px; color: rgba(22,36,26,.65)")}>{v.mcSub}</span>
              </span>
            </div>
            <div data-mc-fields="" style={sx("display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px 12px; align-content: start; padding-top: 8px; border-top: 1px solid rgba(22,36,26,.08)")}>
              {list(v.mcFields).map((f, i) => (
                <div key={f.key ?? i} style={sx(f.style)}>
                  <div style={sx("font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.55)")}>{f.label}</div>
                  <div title={f.value} style={sx("margin-top: 1px; font-size: 13px; line-height: 1.35; color: #16241a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{f.value}</div>
                </div>
              ))}
              <div style={sx("grid-column: 1 / -1")}>
                <div style={sx("font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.55)")}>{v.mcContactLabel}</div>
                <div style={sx("display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; margin-top: 4px")}>
                  {list(v.mcContacts).map((gc, i) => (
                    <div key={gc.key ?? i} title={gc.contact} style={sx("padding: 5px 9px; border-radius: 8px; background: #f6f8f3; font-size: 12.5px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                      <b style={sx("font-weight: 600")}>{gc.name}</b> <span style={sx("color: rgba(22,36,26,.6)")}>· {gc.relation} · {gc.phone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
        {none}
      </div>
      <div data-kza-rbox="" style={sx(card)}>
        {v.mcHas ? (
          <div data-mc-stats="" style={sx("display: flex; flex-direction: column; gap: 12px; min-height: 0; flex: 1 1 auto")}>
            <div role="tablist" style={sx("display: flex; gap: 4px; border-bottom: 1px solid rgba(22,36,26,.1); flex: 0 0 auto")}>
              {list(v.mcTabs).map((mt, i) => (
                <button key={mt.key ?? i} type="button" role="tab" aria-selected={mt.on} onClick={mt.pick} style={sx(mt.style)}>{mt.label}</button>
              ))}
            </div>
            {v.mcIsStats ? <Chart v={v} /> : null}
            {v.mcIsNotes ? <Notes v={v} /> : null}
          </div>
        ) : null}
        {none}
      </div>
    </div>
  );
}

export default function MembersView({ v }) {
  return (
    <div data-kza-mem="" style={sx("margin-top: 4px; display: grid; gap: 20px; align-items: start")}>
      <div data-mem-card="" style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 22px; min-width: 0")}>
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 0")}>
          <div style={sx("flex: 1 1 200px; min-width: 0")}>
            <div role="tablist" style={sx("display: flex; gap: 4px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
              {list(v.memTabs).map((mt, i) => (
                <button key={mt.key ?? i} type="button" role="tab" aria-selected={mt.on} onClick={mt.pick} style={sx(mt.style)}>{mt.label}</button>
              ))}
            </div>
          </div>
          {v.notPend ? (
            <span style={sx("position: relative; flex: 0 0 auto")}>
              <button type="button" onClick={v.bhToggle} aria-haspopup="menu" aria-expanded={!!v.bhOpen} style={sx(`height: 40px; display: inline-flex; align-items: center; gap: 8px; padding: 0 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.18); background: ${v.bhBtnBg ?? "#ffffff"}; color: ${v.bhBtnInk ?? "#16241a"}; font-family: var(--font-body); font-weight: 600; font-size: 14px; cursor: pointer`)} className="kza-d17e">
                {v.bhLabel}
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {v.bhOpen ? (
                <>
                  <div onClick={v.bhClose} style={sx("position: fixed; inset: 0; z-index: 40")} />
                  <div role="menu" style={sx(menuBox("270px"))}>
                    {v.bhNone ? <div style={sx("padding: 10px 12px; font-size: 13px; line-height: 1.45; color: rgba(22,36,26,.7)")}>{v.tBhNone}</div> : null}
                    {v.tblSelAny ? (
                      <>
                        <div style={sx("padding: 6px 12px 4px; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>{v.bhHead}</div>
                        <button type="button" role="menuitem" onClick={v.bhMessage} style={sx(menuItem)} className="kza-h6"><Icon d="M4 5h16v11H8l-4 4z" />{v.tBkMessage}</button>
                        <button type="button" role="menuitem" onClick={v.bhPriority} style={sx(menuItem)} className="kza-h6"><Icon d="M12 3l9 16H3zM12 10v4M12 17v.5" />{v.tBhPriority}</button>
                        <button type="button" role="menuitem" onClick={v.bhEditOpen} style={sx(menuItem)} className="kza-h6"><Icon d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4" />{v.tBhEdit}</button>
                        <button type="button" role="menuitem" onClick={v.bhExport} style={sx(menuItem)} className="kza-h6"><Icon d="M12 4v11M7 10l5 5 5-5M5 20h14" />{v.tBhExport}</button>
                      </>
                    ) : null}
                  </div>
                </>
              ) : null}
            </span>
          ) : null}
          {v.bhEditShown ? <BulkEdit v={v} /> : null}
          <span style={sx("position: relative; flex: 0 0 auto")}>
            <button type="button" onClick={v.memMenuToggle} aria-haspopup="menu" aria-expanded={!!v.memMenuOpen} aria-label={v.tMore} title={v.tMore} style={sx("width: 40px; height: 40px; display: grid; place-items: center; border-radius: 12px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; cursor: pointer; padding: 0")} className="kza-h6">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="5" cy="12" r="1.8" fill="currentColor" />
                <circle cx="12" cy="12" r="1.8" fill="currentColor" />
                <circle cx="19" cy="12" r="1.8" fill="currentColor" />
              </svg>
            </button>
            {v.memMenuOpen ? (
              <>
                <div onClick={v.memMenuToggle} style={sx("position: fixed; inset: 0; z-index: 40")} />
                <div role="menu" onClick={v.memMenuClose} style={sx(menuBox("240px"))}>
                  <button type="button" role="menuitem" onClick={v.toggleVis} style={sx(menuItem)} className="kza-h6">
                    <span style={sx("flex: 1")}>{v.tVisMenu}</span>
                    <span style={sx("font-size: 12px; color: rgba(22,36,26,.55)")}>{v.visCount}</span>
                  </button>
                  <button type="button" role="menuitem" onClick={v.exportMembers} style={sx(menuItem)} className="kza-h6">{v.tExportUsers}</button>
                  <button type="button" role="menuitem" onClick={v.openAddMember} style={sx(menuItem)} className="kza-h6">{v.tAddMember}</button>
                </div>
              </>
            ) : null}
          </span>
        </div>
        {v.memDemoOn ? <Demo v={v} /> : null}
        {v.pendOpen ? <Pending v={v} /> : null}
        {v.notPend ? <MemberTable v={v} /> : null}
      </div>
      <MemberSide v={v} />
    </div>
  );
}
