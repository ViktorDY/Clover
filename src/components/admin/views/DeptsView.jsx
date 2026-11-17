import { sx, list } from "../adminRuntime";
import PickAccordion from "./PickAccordion";

// Medlemmer og lag › Grupper ([design 17 Nov]): a filter column (clubs,
// groups, invite/import buttons), a list of sub-groups and a member list with
// a "Behandle" (process) menu, plus the invite and group-message dialogs.
const card = "border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); min-width: 0";
const search =
  "width: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #f4f8f2; font-family: var(--font-body); font-size: 13px; color: #16241a; outline: none";
const ghost =
  "padding: 9px 14px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer";
const pill =
  "padding: 4px 10px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap";
const h2 = "flex: 1; min-width: 0; font-family: var(--font-heading); font-weight: 800; font-size: 19px; margin: 0";
const count = "font-family: var(--font-body); font-weight: 600; font-size: 13px; color: rgba(22,36,26,.55)";
const menuItem = "text-align: left; padding: 10px 12px; border-radius: 10px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px";
const overlay = "position: fixed; inset: 0; z-index: 97; display: grid; place-items: center; padding: 24px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)";
const formBox = (w) =>
  `position: relative; width: 100%; max-width: ${w}; max-height: calc(100vh - 48px); overflow-y: auto; box-sizing: border-box; border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 32px 80px rgba(22,36,26,.32); padding: 26px; display: grid; gap: 14px`;
const closeX = "position: absolute; top: 16px; right: 16px; width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; font-size: 16px; cursor: pointer";
const capLabel = "display: grid; gap: 6px; font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)";
const cancelBtn = "padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer";
const sendBtn = (op) => `padding: 12px 22px; border-radius: 999px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer; opacity: ${op ?? 1}`;
const field = (base) => `${base ?? ""}; text-transform: none; letter-spacing: 0; font-weight: 500`;

export default function DeptsView({ v }) {
  return (
    <>
      <div data-kza-grp="" style={sx("margin-top: 4px; display: grid; gap: 20px; align-items: start")}>
        <div style={sx(card + "; padding: 18px 16px; display: grid; gap: 12px; align-content: start; box-sizing: border-box")}>
          <div>
            <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 24px; letter-spacing: -.02em; margin: 0")}>{v.tDeptHeading}</h2>
            <p style={sx("margin: 5px 0 0; font-size: 13px; line-height: 1.5; color: rgba(22,36,26,.65)")}>{v.tGrpSub}</p>
          </div>
          <PickAccordion m={v.grpmClubs} none={v.tRfNone} />
          <PickAccordion m={v.grpmGroups} none={v.tRfNone} />
          <div style={sx("display: grid; gap: 8px; padding-top: 4px")}>
            <button type="button" onClick={v.grpInviteClub} style={sx("padding: 9px 15px; border-radius: 999px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; border-radius: 12px; padding: 11px 14px")}>
              {v.tGrpInviteClub}
            </button>
            <div style={sx("display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px")}>
              <button type="button" onClick={v.ciOpenInvite} style={sx(ghost)} className="kza-h6">{v.tCiInviteBtn}</button>
              <button type="button" onClick={v.ciOpenInfo} style={sx(ghost)} className="kza-h6">{v.tCiInfoBtn}</button>
              <button type="button" onClick={v.pickImport} style={sx(ghost)} className="kza-h6">{v.tImportGroup}</button>
            </div>
            <input data-dept-import="" type="file" accept=".csv,.txt" onChange={v.onImportFile} style={sx("display: none")} />
            {v.deptImportMsg ? <div style={sx("padding: 9px 12px; border-radius: 10px; background: #eaf7ed; font-size: 13px")}>{v.deptImportMsg}</div> : null}
            {v.grpMsg ? (
              <div style={sx("display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 10px; background: #eaf7ed; font-size: 13px")}>
                <span style={sx("flex: 1")}>✓ {v.grpMsg}</span>
                {v.grpCanUndo ? <button type="button" onClick={v.grpUndo} style={sx(pill)}>{v.tGrpUndo}</button> : null}
              </div>
            ) : null}
          </div>
        </div>
        <div data-kza-roles-right="" style={sx("display: grid; gap: 20px; align-content: start; min-width: 0")}>
          <div data-kza-rbox="" style={sx(card + "; padding: 18px 18px 14px; display: grid; gap: 10px")}>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
              <h2 style={sx(h2)}>
                {v.tGrpSubs} <span style={sx(count)}>{v.grpSubCount}</span>
              </h2>
              <button type="button" onClick={v.openAddGroup} style={sx("padding: 6px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-h6">
                + {v.tAddGroup}
              </button>
              {v.grpAnySel ? <button type="button" onClick={v.grpClearSel} style={sx(pill)}>{v.tGrpClearSel}</button> : null}
            </div>
            <input type="search" value={v.grpQs ?? ""} onChange={v.onGrpQs} placeholder={v.tDeptSearch} aria-label={v.tDeptSearch} style={sx(search + "; padding: 9px 14px")} className="kza-f7" />
            <div data-kza-rlist="" style={sx("display: grid; gap: 2px; align-content: start; max-height: calc(50vh - 150px); min-height: 120px; overflow-y: auto; border-top: 1px solid rgba(22,36,26,.08); padding-top: 4px")}>
              {list(v.grpSubRows).map((sr, i) => (
                <div key={sr.key ?? i} style={sx(sr.style)} className="kza-h6">
                  <label style={sx(`display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; cursor: pointer; padding-left: ${sr.indent ?? 0}`)}>
                    <input type="checkbox" checked={!!sr.on} onChange={sr.toggle} style={sx("width: 16px; height: 16px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto")} />
                    <span style={sx(sr.nameStyle)}>{sr.name}</span>
                    <span style={sx("font-size: 12px; color: rgba(22,36,26,.5); white-space: nowrap")}>{sr.path}</span>
                  </label>
                  <span style={sx("font-size: 13px; color: rgba(22,36,26,.65); white-space: nowrap")}>{sr.count}</span>
                  <span style={sx("position: relative")}>
                    <button type="button" onClick={sr.menu} aria-label={v.tMore} aria-haspopup="true" style={sx("width: 30px; height: 26px; border-radius: 6px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; cursor: pointer; color: #16241a; font-weight: 800; letter-spacing: .08em; line-height: 1; padding: 0 0 6px")} className="kza-h3">
                      ...
                    </button>
                    {sr.menuOpen ? (
                      <>
                        <div onClick={v.closeDeptMenu} style={sx("position: fixed; inset: 0; z-index: 30")} />
                        <div style={sx("position: absolute; right: 0; top: calc(100% + 4px); z-index: 31; min-width: 210px; border-radius: 14px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 16px 40px rgba(22,36,26,.22); padding: 6px; display: grid; gap: 2px")}>
                          <button type="button" onClick={sr.invite} style={sx(menuItem + "; color: #16241a")} className="kza-h3">{v.tGrpInviteHere}</button>
                          <button type="button" onClick={sr.addHere} style={sx(menuItem + "; color: #16241a")} className="kza-h3">{v.tAddHere}</button>
                          <button type="button" onClick={sr.remove} style={sx(menuItem + "; color: #a3282f")} className="kza-hd">{v.tRemove}</button>
                        </div>
                      </>
                    ) : null}
                  </span>
                </div>
              ))}
              {v.grpSubNone ? <div style={sx("padding: 12px 6px; font-size: 13px; color: rgba(22,36,26,.6)")}>{v.tGrpSubNone}</div> : null}
            </div>
          </div>
          <div data-kza-rbox="" style={sx(card + "; padding: 18px 18px 14px; display: grid; gap: 10px")}>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
              <h2 style={sx(h2)}>
                {v.tGrpMembers} <span style={sx(count)}>{v.grpMemCount}</span>
              </h2>
              <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.6)")}>{v.grpSelInfo}</span>
              <span style={sx("position: relative")}>
                <button type="button" onClick={v.grpBehToggle} aria-haspopup="true" aria-expanded={!!v.grpBehOpen} style={sx("padding: 8px 14px; border-radius: 999px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")}>
                  {v.tGrpBeh} <span aria-hidden="true" style={sx("font-size: 10px")}>▾</span>
                </button>
                {v.grpBehOpen ? (
                  <>
                    <div onClick={v.grpBehToggle} style={sx("position: fixed; inset: 0; z-index: 40")} />
                    <div role="menu" style={sx("position: absolute; right: 0; top: calc(100% + 6px); z-index: 41; width: 250px; padding: 6px; border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 20px 48px rgba(22,36,26,.18); display: grid; gap: 2px")}>
                      {list(v.grpBehItems).map((bi, i) => (
                        <button key={bi.key ?? i} type="button" role="menuitem" onClick={bi.run} disabled={!!bi.off} style={sx(bi.style)} className="kza-h6">
                          {bi.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}
              </span>
            </div>
            <input type="search" value={v.grpQm ?? ""} onChange={v.onGrpQm} placeholder={v.tGrpMemSearch} aria-label={v.tGrpMemSearch} style={sx(search + "; padding: 9px 14px")} className="kza-f7" />
            <div data-kza-rlist="" style={sx("display: grid; align-content: start; max-height: calc(50vh - 120px); min-height: 120px; overflow-y: auto; border-top: 1px solid rgba(22,36,26,.08)")}>
              {v.grpMemHead !== false ? (
                <div style={sx("position: sticky; top: 0; z-index: 1; display: grid; grid-template-columns: 22px minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1.3fr) 80px; gap: 12px; align-items: center; padding: 8px 10px; background: #ffffff; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  <input type="checkbox" checked={!!v.grpMemAllOn} onChange={v.grpMemAllToggle || (() => {})} aria-label={v.tGrpSelAll} title={v.tGrpSelAll} style={sx("width: 16px; height: 16px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto")} />
                  <span>{v.tColName}</span>
                  <span>{v.tGrpColGroup}</span>
                  <span>{v.tGrpColEmail}</span>
                  <span>Status</span>
                </div>
              ) : null}
              {list(v.grpMemRows).map((mr, i) => (
                <label key={mr.key ?? i} style={sx(mr.rowStyle)} className="kza-d17d">
                  <input type="checkbox" checked={!!mr.on} onChange={mr.toggle} aria-label={mr.name} style={sx("width: 16px; height: 16px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto")} />
                  <span style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                    <b style={sx("font-weight: 600")}>{mr.name}</b> <span style={sx("font-size: 12px; color: rgba(22,36,26,.55)")}>· {mr.role}</span>
                  </span>
                  <span style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(22,36,26,.75)")}>{mr.group}</span>
                  <span style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(22,36,26,.75)")}>{mr.email}</span>
                  <span style={sx(mr.statusStyle)}>{mr.status}</span>
                </label>
              ))}
              {v.grpMemNone ? <div style={sx("padding: 14px 6px; font-size: 13px; color: rgba(22,36,26,.6)")}>{v.grpMemNoneText}</div> : null}
            </div>
          </div>
        </div>
      </div>

      {v.giOpen ? (
        <div data-rsp-modal="" onClick={v.giClose} style={sx(overlay)}>
          <form onClick={v.stopClick} onSubmit={v.giSend} style={sx(formBox("560px"))}>
            <button type="button" onClick={v.giClose} aria-label={v.tClose} style={sx(closeX)}>×</button>
            <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0 40px 0 0")}>{v.tGiTitle}</h3>
            <label style={sx(capLabel)}>
              {v.tGiTo}
              <select value={v.giTarget ?? ""} onChange={v.onGiTarget} style={sx(field(v.inputStyle))}>
                {list(v.giTargets).map((o, i) => (
                  <option key={o.key ?? i} value={o.id}>{o.name}</option>
                ))}
              </select>
            </label>
            <div style={sx("display: grid; gap: 6px")}>
              <div style={sx("font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>{v.tGiPick}</div>
              <input type="search" value={v.giQ ?? ""} onChange={v.onGiQ} placeholder={v.tGiSearch} aria-label={v.tGiSearch} style={sx(search + "; padding: 10px 14px")} className="kza-f7" />
              <div style={sx("display: grid; gap: 2px; max-height: 160px; overflow-y: auto")}>
                {list(v.giResults).map((gr, i) => (
                  <label key={gr.key ?? i} style={sx("display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 9px; font-size: 14px; cursor: pointer")} className="kza-h6">
                    <input type="checkbox" checked={!!gr.on} onChange={gr.toggle} style={sx("width: 16px; height: 16px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto")} />
                    <span style={sx("flex: 1; min-width: 0")}>{gr.name}</span>
                    <span style={sx("font-size: 12px; color: rgba(22,36,26,.55)")}>{gr.meta}</span>
                  </label>
                ))}
              </div>
            </div>
            <label style={sx(capLabel)}>
              {v.tGiNew}
              <textarea rows="3" value={v.giText ?? ""} onChange={v.onGiText} placeholder={v.tGiNewPh} style={sx(field(v.inputStyle) + "; resize: vertical")} />
            </label>
            <div style={sx("padding: 10px 14px; border-radius: 12px; background: #f6f8f3; font-size: 13px; color: #16241a")}>{v.giSummary}</div>
            <div style={sx("display: flex; justify-content: flex-end; gap: 10px")}>
              <button type="button" onClick={v.giClose} style={sx(cancelBtn)}>{v.tCancel2}</button>
              <button type="submit" disabled={!!v.giOff} style={sx(sendBtn(v.giOpacity))}>{v.tGiSend}</button>
            </div>
          </form>
        </div>
      ) : null}

      {v.gmOpen ? (
        <div data-rsp-modal="" onClick={v.gmClose} style={sx(overlay)}>
          <form onClick={v.stopClick} onSubmit={v.gmSend} style={sx(formBox("540px"))}>
            <button type="button" onClick={v.gmClose} aria-label={v.tClose} style={sx(closeX)}>×</button>
            <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0 40px 0 0")}>{v.gmTitle}</h3>
            <p style={sx("margin: -6px 0 0; font-size: 13.5px; color: rgba(22,36,26,.7)")}>{v.gmWho}</p>
            {v.gmIsMove ? (
              <label style={sx(capLabel)}>
                {v.tGmMoveTo}
                <select value={v.gmTarget ?? ""} onChange={v.onGmTarget} style={sx(field(v.inputStyle))}>
                  {list(v.gmTargets).map((o, i) => (
                    <option key={o.key ?? i} value={o.id}>{o.name}</option>
                  ))}
                </select>
              </label>
            ) : null}
            {v.gmIsMsg ? (
              <>
                <label style={sx(capLabel)}>
                  {v.tGmSubject}
                  <input type="text" value={v.gmSubject ?? ""} onChange={v.onGmSubject} style={sx(field(v.inputStyle))} />
                </label>
                <label style={sx(capLabel)}>
                  {v.tGmBody}
                  <textarea rows="5" value={v.gmBody ?? ""} onChange={v.onGmBody} style={sx(field(v.inputStyle) + "; resize: vertical")} />
                </label>
              </>
            ) : null}
            <div style={sx("display: flex; justify-content: flex-end; gap: 10px")}>
              <button type="button" onClick={v.gmClose} style={sx(cancelBtn)}>{v.tCancel2}</button>
              <button type="submit" disabled={!!v.gmOff} style={sx(sendBtn(v.gmOpacity))}>{v.gmSendLabel}</button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
