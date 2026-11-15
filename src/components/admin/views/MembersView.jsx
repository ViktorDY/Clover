import { Fragment } from "react";
import { sx, list } from "../adminRuntime";

// Medlemmer og lag › Medlemmer: member register (Nov 2026 design: pending
// // approvals, filter and column pickers, bulk actions, priority message).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function MembersView({ v }) {
  return (
    <div style={sx("margin-top: 4px; border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 22px; min-width: 0")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 16px")}>
        <div style={sx("flex: 1 1 200px; min-width: 0")}>
          <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 30px; letter-spacing: -.02em; color: #16241a; margin: 0")}>
            {v.tTblTitle}
          </h2>
          <div style={sx("font-size: 13px; color: rgba(22,36,26,.72); margin-top: 2px")}>
            {v.tblSub}
          </div>
        </div>
        <button type="button" onClick={v.togglePend} aria-expanded={v.pendOpen} style={sx(`display: inline-flex; align-items: center; gap: 8px; padding: 11px 18px; border-radius: 999px; border: 0; background: #7c4dcf; color: #ffffff; box-shadow: ${v.pendBtnRing ?? ""}; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .25s`)} className="kza-hz">
          {v.tPendTitle}
          <span style={sx("min-width: 20px; padding: 1px 7px; border-radius: 999px; background: rgba(255,255,255,.25); font-size: 12px; text-align: center")}>
            {v.pendCount}
          </span>
        </button>
        <button type="button" onClick={v.exportMembers} style={sx("padding: 11px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .25s")} className="kza-h3">
          {v.tExportUsers}
        </button>
        <button type="button" onClick={v.openAddMember} style={sx("padding: 11px 18px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .25s")} className="kza-ha">
          {v.tAddMember}
        </button>
      </div>
      {v.pendOpen ? (
        <div style={sx("margin: 14px -22px -22px; border-top: 1px solid rgba(22,36,26,.1); padding-top: 14px; min-width: 0")}>
          <div style={sx("padding: 4px 22px 0")}>
            <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 19px; margin: 0")}>
              {v.tPendTitle}
            </h3>
          </div>
          <p style={sx("margin: 0; padding: 8px 24px 18px; font-size: 14.5px; line-height: 1.5; color: rgba(22,36,26,.78); border-bottom: 1px solid rgba(22,36,26,.1)")}>
            {v.tPendIntro}
          </p>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 14px 24px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
            {v.pendSelAny ? (
              <>
                <button type="button" onClick={v.pendApproveSel} style={sx("padding: 10px 18px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-ha">
                {v.tPendApproveSel}
              </button>
                <button type="button" onClick={v.pendRejectSel} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-hv">
                {v.tPendRejectSel}
              </button>
              </>
            ) : null}
            <span style={sx("flex: 1")} />
            <input type="search" value={v.pendQ ?? ""} onChange={v.onPendQ} placeholder={v.tPendSearch} aria-label={v.tPendSearch} style={sx("width: min(260px, 100%); box-sizing: border-box; padding: 10px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} className="kza-f7" />
          </div>
          <div style={sx("overflow-x: auto")}>
            <div style={sx("min-width: 760px")}>
              <div style={sx("display: grid; grid-template-columns: 44px minmax(120px,1fr) minmax(120px,1fr) minmax(110px,.8fr) minmax(110px,.8fr) minmax(140px,1fr) 190px; gap: 12px; align-items: center; padding: 14px 24px; background: #f4f8f2; border-bottom: 1px solid rgba(22,36,26,.1); padding: 0; font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)")}>
                <input type="checkbox" aria-label={v.tSelectAll} checked={!!v.pendAllChecked} onChange={v.pendToggleAll} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #7c4dcf; cursor: pointer")} />
                <span>
                  {v.tFirst}
                </span>
                <span>
                  {v.tLast}
                </span>
                <span>
                  {v.tPGroupRole}
                </span>
                <span>
                  {v.tPGroups}
                </span>
                <span>
                  {v.tPPay}
                </span>
                <span />
              </div>
              {list(v.pendRows).map((r, i1) => (
                  <div key={r.key ?? i1} style={sx(`display: grid; grid-template-columns: 44px minmax(120px,1fr) minmax(120px,1fr) minmax(110px,.8fr) minmax(110px,.8fr) minmax(140px,1fr) 190px; gap: 12px; align-items: center; min-height: 60px; padding: 0 24px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 14px; background: ${r.bg ?? ""}`)}>
                    <input type="checkbox" aria-label={r.first} checked={!!r.checked} onChange={r.toggle} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #7c4dcf; cursor: pointer")} />
                    <span style={sx("font-family: var(--font-heading); font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                      {r.first}
                    </span>
                    <span style={sx("overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                      {r.last}
                    </span>
                    <span style={sx("color: rgba(22,36,26,.8)")}>
                      {r.role}
                    </span>
                    <span style={sx("color: rgba(22,36,26,.8)")}>
                      {r.group}
                    </span>
                    <span style={sx("color: rgba(22,36,26,.8); overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                      {r.pay}
                    </span>
                    <span style={sx("display: flex; gap: 6px; justify-content: flex-end")}>
                      <button type="button" onClick={r.approve} style={sx("padding: 8px 14px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-ha">
                        {v.tPendApprove}
                      </button>
                      <button type="button" onClick={r.reject} style={sx("padding: 8px 14px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-hv">
                        {v.tPendReject}
                      </button>
                    </span>
                  </div>
              ))}
              {v.pendEmpty ? (
                <div style={sx("display: grid; justify-items: center; gap: 18px; padding: 70px 20px 80px; color: rgba(22,36,26,.7)")}>
                  <svg width="56" height="64" viewBox="0 0 56 64" fill="none" stroke="rgba(22,36,26,.7)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <rect x="3" y="3" width="50" height="58" rx="4" />
                    <path d="M14 18h28M14 29h28M14 40h28M14 51h28" />
                  </svg>
                  <span style={sx("font-size: 16px")}>
                    {v.tPendNone}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {v.notPend ? (
        <>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 4px")}>
          <input type="search" value={v.memQ ?? ""} onChange={v.onMemQ} placeholder={v.tSearchMembers} style={sx("flex: 1 1 220px; min-width: 0; box-sizing: border-box; padding: 13px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-f7" />
          <div style={sx("position: relative; flex: 0 0 auto")}>
            <button type="button" onClick={v.fToggle} aria-haspopup="true" aria-expanded={v.fOpen} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 13px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer; transition: background .25s")} className="kza-h3">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 4h18l-7 8.5V20l-4-2v-5.5z" />
              </svg>
              {v.tFilter}
              {v.fBadge ? (
                <span style={sx("min-width: 20px; padding: 1px 7px; border-radius: 999px; background: #1f7a3a; color: #ffffff; font-size: 12px; font-weight: 700; text-align: center")}>
                  {v.fBadgeN}
                </span>
              ) : null}
            </button>
            {v.fOpen ? (
              <>
                <div onClick={v.fClose} style={sx("position: fixed; inset: 0; z-index: 30")} />
                <div role="dialog" aria-label={v.tFilter} style={sx("position: absolute; right: 0; top: calc(100% + 8px); z-index: 31; width: min(660px, 92vw); box-sizing: border-box; border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 24px 60px rgba(22,36,26,.2); overflow: hidden")}>
                <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0, 230px) minmax(0, 1fr)")}>
                  <div style={sx("max-height: 400px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; padding: 12px; background: #f4f8f2; border-right: 1px solid rgba(22,36,26,.08)")}>
                    <div style={sx("padding: 4px 10px 8px; font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tFHint}
                    </div>
                    {list(v.fCats).map((c, i1) => (
                        <button key={c.key ?? i1} type="button" onClick={c.pick} style={sx(c.style)} className="kza-a1x2">
                          <span style={sx("flex: 1; min-width: 0")}>
                            {c.label}
                          </span>
                          {c.hasN ? (
                            <span style={sx("min-width: 20px; padding: 1px 7px; border-radius: 999px; background: #1f7a3a; color: #ffffff; font-size: 12px; font-weight: 700; text-align: center")}>
                              {c.n}
                            </span>
                          ) : null}
                        </button>
                    ))}
                  </div>
                  <div style={sx("display: flex; flex-direction: column; min-width: 0")}>
                    <div style={sx("display: flex; align-items: center; gap: 10px; padding: 16px 18px 8px")}>
                      <span style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 17px")}>
                        {v.fCatTitle}
                      </span>
                      <button type="button" onClick={v.fClearCat} style={sx("border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; color: rgba(22,36,26,.65)")}>
                        {v.tFClearCat}
                      </button>
                    </div>
                    <div style={sx("max-height: 300px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; padding: 0 12px 10px; display: grid; gap: 2px; align-content: start")}>
                      {list(v.fOpts).map((o, i1) => (
                          <button key={o.key ?? i1} type="button" role="menuitemcheckbox" aria-checked={o.on} onClick={o.toggle} style={sx("display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 10px 8px; border: 0; border-radius: 12px; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: #16241a")} className="kza-h6">
                            <span aria-hidden="true" style={sx(o.box)}>
                              {o.mark}
                            </span>
                            <span style={sx("flex: 1; min-width: 0")}>
                              {o.label}
                            </span>
                            <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.55)")}>
                              {o.count}
                            </span>
                          </button>
                      ))}
                    </div>
                    <div style={sx("display: flex; justify-content: flex-end; gap: 8px; padding: 12px 18px; border-top: 1px solid rgba(22,36,26,.08)")}>
                      <button type="button" onClick={v.fClearAll} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-h3">
                        {v.tFClearAll}
                      </button>
                      <button type="button" onClick={v.fClose} style={sx("padding: 10px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-ha">
                        {v.tFDone}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </>
            ) : null}
          </div>
        </div>
          {v.fHasChips ? (
          <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px")}>
            {list(v.fChips).map((c, i1) => (
                <span key={c.key ?? i1} style={sx("display: inline-flex; align-items: center; gap: 6px; padding: 5px 6px 5px 12px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-size: 12.5px")}>
                  {c.label}
                  <button type="button" onClick={c.remove} aria-label={v.tRemoveL} style={sx("width: 20px; height: 20px; border-radius: 999px; border: 0; background: rgba(246,248,243,.2); color: #f6f8f3; cursor: pointer; font-size: 11px; line-height: 1")}>
                    ×
                  </button>
                </span>
            ))}
          </div>
        ) : null}
          {v.memMsg ? (
          <div role="status" style={sx("margin-top: 12px; display: flex; align-items: center; gap: 12px; border-radius: 16px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.5); padding: 12px 16px; font-size: 14px")}>
            <span style={sx("flex: 1")}>
              {v.memMsg}
            </span>
            <button type="button" onClick={v.closeMemMsg} aria-label={v.tClose} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 0; background: rgba(22,36,26,.08); cursor: pointer")}>
              ×
            </button>
          </div>
        ) : null}
          {v.tblSelAny ? (
          <div style={sx("margin-top: 14px; padding-bottom: 12px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
            <div style={sx("position: relative; display: flex; flex-wrap: wrap; align-items: center; gap: 8px")}>
              <button type="button" onClick={v.bkMessage} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .2s")} className="kza-h3">
                {v.tBkMessage}
              </button>
              <button type="button" onClick={v.pmOpenForm} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px; border: 1.5px solid #FFD23F; background: #FFD23F; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .2s, box-shadow .2s")} className="kza-a1x5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                {v.tPmBtn}
              </button>
              <button type="button" onClick={v.bkEdit} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .2s")} disabled={!!v.bkEditOff} className="kza-h3">
                {v.tBkEdit}
              </button>
              <span style={sx("position: relative")}>
                <button type="button" onClick={v.bkToggleAdd} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .2s")} className="kza-h3">
                  {v.tBkAdd}
                </button>
                {v.bkGroupMenu ? (
                  <>
                    <div onClick={v.bkCloseMenu} style={sx("position: fixed; inset: 0; z-index: 30")} />
                    <div role="menu" style={sx("position: absolute; left: 0; top: calc(100% + 8px); z-index: 31; width: 240px; max-height: 260px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 20px 50px rgba(22,36,26,.18); padding: 6px")}>
                    {list(v.bkGroups).map((g, i1) => (
                        <button key={g.key ?? i1} type="button" role="menuitem" onClick={g.pick} style={sx("display: block; width: 100%; text-align: left; padding: 10px 12px; border: 0; border-radius: 10px; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: #16241a")} className="kza-h3">
                          {g.name}
                        </button>
                    ))}
                  </div>
                  </>
                ) : null}
              </span>
              <button type="button" onClick={v.bkRemoveGroup} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .2s")} className="kza-h3">
                {v.tBkRemove}
              </button>
              <button type="button" onClick={v.bkMerge} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .2s")} disabled={!!v.bkMergeOff} className="kza-h3">
                {v.tBkMerge}
              </button>
              <button type="button" onClick={v.bkExport} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .2s")} className="kza-h3">
                {v.tBkExport}
              </button>
              <button type="button" onClick={v.bkDeactivate} style={sx("padding: 10px 20px; border-radius: 999px; border: 0; background: #c94f4a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .2s")} className="kza-a1x6">
                {v.tBkDeactivate}
              </button>
            </div>
            <div style={sx("margin-top: 12px; font-size: 14.5px")}>
              {v.tblSelNote}{" "}
              <button type="button" onClick={v.bkClear} style={sx("border: 0; background: transparent; padding: 0; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: #1f7a3a; text-decoration: underline")}>
                {v.tBkClear}
              </button>
            </div>
          </div>
        ) : null}
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 16px; margin-top: 10px")}>
          <span role="status" aria-live="polite" style={sx("font-size: 13.5px; color: rgba(22,36,26,.72)")}>
            {v.tblShowing}
          </span>
          <div style={sx("position: relative")}>
            <button type="button" onClick={v.toggleVis} aria-haspopup="true" aria-expanded={v.visOpen} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .25s")} className="kza-h3">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 5h18M3 12h18M3 19h18" />
                <path d="M9 3v4M15 10v4M8 17v4" />
              </svg>
              {v.tVis}{" "}
              <span style={sx("font-weight: 600; font-size: 12px; color: rgba(22,36,26,.6)")}>
                {v.visCount}
              </span>
            </button>
            {v.visOpen ? (
              <>
                <div onClick={v.closeVis} style={sx("position: fixed; inset: 0; z-index: 30")} />
                <div role="menu" aria-label={v.tVisHint} style={sx("position: absolute; right: 0; top: calc(100% + 8px); z-index: 31; width: min(320px, 92vw); box-sizing: border-box; border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 20px 50px rgba(22,36,26,.18); padding: 14px")}>
                <div style={sx("display: flex; align-items: center; gap: 10px; padding: 0 4px 8px")}>
                  <span style={sx("flex: 1; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.65)")}>
                    {v.tVisHint}
                  </span>
                  <button type="button" onClick={v.visAll} style={sx("border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; color: #1f7a3a")}>
                    {v.tVisAll}
                  </button>
                  <button type="button" onClick={v.visReset} style={sx("border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; color: rgba(22,36,26,.65)")}>
                    {v.tVisReset}
                  </button>
                </div>
                <div style={sx("max-height: 340px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; display: grid; gap: 2px")}>
                  {list(v.visCols).map((c, i1) => (
                      <button key={c.key ?? i1} type="button" role="menuitemcheckbox" aria-checked={c.on} onClick={c.toggle} style={sx("display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 9px 8px; border: 0; border-radius: 12px; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: #16241a")} className="kza-h6">
                        <span aria-hidden="true" style={sx(c.box)}>
                          {c.mark}
                        </span>
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
            <span style={sx("font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.75); margin-right: 4px")}>
              {v.tGroupFilter}
            </span>
            {list(v.groupTabs).map((g, i1) => (
                <button key={g.key ?? i1} type="button" onClick={g.pick} style={sx(g.style)}>
                  {g.label}
                </button>
            ))}
          </div>
        ) : null}
          <div style={sx("overflow-x: auto; margin-top: 14px")}>
          <div style={sx(`min-width: ${v.tblMinW ?? ""}`)}>
            <div style={sx(`display: grid; grid-template-columns: ${v.tblGrid ?? ""}; gap: 12px; align-items: center; padding: 14px 14px; background: #eaf4e7; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)`)}>
              <input type="checkbox" aria-label={v.tSelectAll} checked={!!v.tblAllChecked} onChange={v.tblToggleAll} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
              {list(v.tblHead).map((h, i1) => (
                  <span key={h.key ?? i1} style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                    {h.label}
                  </span>
              ))}
            </div>
            <div style={sx("max-height: max(450px, calc(100vh - 360px)); height: auto; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin")}>
              {list(v.tblRows).map((r, i1) => (
                  <div key={r.key ?? i1} onClick={r.open} style={sx(r.rowStyle)} className="kza-h6">
                    <span onClick={v.stopClick} style={sx("display: flex; align-items: center")}>
                      <input type="checkbox" aria-label={r.name} checked={!!r.checked} onChange={r.toggle} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
                    </span>
                    {list(r.cells).map((c, i2) => (
                      <Fragment key={c.key ?? i2}>
                        {c.isStatus ? (
                          <span>
                            <span style={sx(r.statusStyle)}>
                              {r.status}
                            </span>
                          </span>
                        ) : null}
                        {c.isText ? (
                          <span style={sx("min-width: 0; color: rgba(22,36,26,.8); overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                            {c.val}
                          </span>
                        ) : null}
                      </Fragment>
                    ))}
                  </div>
              ))}
            </div>
          </div>
          {v.tblMulti ? (
            <div style={sx("display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 16px")}>
              <div style={sx("display: flex; flex-wrap: wrap; gap: 6px")}>
                {list(v.tblPages).map((p, i1) => (
                    <button key={p.key ?? i1} type="button" onClick={p.go} style={sx(p.style)}>
                      {p.label}
                    </button>
                ))}
              </div>
              <label style={sx("display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(22,36,26,.8); white-space: nowrap")}>
                {v.tTblPer}
                <select value={v.tblPer ?? ""} onChange={v.onTblPer} aria-label={v.tTblPer} style={sx("padding: 8px 10px; border-radius: 8px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")}>
                  {list(v.tblPerOpts).map((o, i1) => (
                      <option key={o.key ?? i1} value={o.v}>
                        {o.v}
                      </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}
        </div>
          {v.impMsg ? (
          <div role="status" style={sx("margin-top: 12px; display: flex; align-items: center; gap: 12px; border-radius: 16px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.5); padding: 12px 16px; font-size: 14px")}>
            <span style={sx("flex: 1")}>
              {v.impMsg}
            </span>
            <button type="button" onClick={v.closeImpMsg} aria-label={v.tClose} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 0; background: rgba(22,36,26,.08); cursor: pointer")}>
              ×
            </button>
          </div>
        ) : null}
        </>
      ) : null}
    </div>
  );
}
