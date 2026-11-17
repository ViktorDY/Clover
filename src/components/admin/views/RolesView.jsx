import { sx, list } from "../adminRuntime";
import PickAccordion from "./PickAccordion";

// Medlemmer og lag › Roller ([design 17 Nov]): 1) pick clubs / groups /
// members, 2) give a role (with its access menu), 3) approve pending role
// requests; plus the "give role" (scope) dialog, assign-role and add-role.
const card = "border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); min-width: 0";
const step = "display: inline-grid; place-items: center; width: 24px; height: 24px; margin-right: 8px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-family: var(--font-body); font-size: 12px; font-weight: 700; vertical-align: 3px";
const ghost = "padding: 9px 14px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer";
const search = "width: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #f4f8f2; font-family: var(--font-body); font-size: 13px; color: #16241a; outline: none";
const count = "font-family: var(--font-body); font-weight: 600; font-size: 13px; color: rgba(22,36,26,.55)";
const overlay = "position: fixed; inset: 0; z-index: 97; display: grid; place-items: center; padding: 24px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)";
const closeX = "position: absolute; top: 16px; right: 16px; width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; font-size: 16px; cursor: pointer";
const cap = "font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.65)";
const personRow = "display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 14px; border: 1px solid rgba(22,36,26,.1)";

function Person({ p, children }) {
  return (
    <div style={sx(personRow)}>
      <span style={sx("flex: 1; min-width: 0")}>
        <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
          {p.name} <span style={sx("font-family: var(--font-body); font-weight: 600; font-size: 13px; color: rgba(22,36,26,.7)")}>· {p.role}</span>
        </span>
        <span style={sx("display: block; margin-top: 2px; font-size: 12.5px; line-height: 1.45; color: rgba(22,36,26,.6)")}>{p.meta}</span>
      </span>
      <span style={sx("display: flex; gap: 6px; flex: 0 0 auto")}>{children}</span>
    </div>
  );
}

export default function RolesView({ v }) {
  return (
    <div data-kza-roles="" style={sx("margin-top: 4px; display: grid; gap: 20px; align-items: start")}>
      <div style={sx(card + "; padding: 18px 16px; display: grid; gap: 12px; align-content: start; max-height: calc(100vh - 190px); overflow-y: auto; box-sizing: border-box")}>
        <div>
          <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 20px; margin: 0")}>
            <span aria-hidden="true" style={sx(step)}>1</span>
            {v.tRfHead}
          </h2>
          <p style={sx("margin: 5px 0 0; font-size: 13px; line-height: 1.5; color: rgba(22,36,26,.65)")}>{v.tRfSub}</p>
        </div>
        <PickAccordion m={v.rfmClubs} none={v.tRfNone} />
        <PickAccordion m={v.rfmGroups} none={v.tRfNone} />
        <PickAccordion m={v.rfmMembers} none={v.tRfNone} />
        <div style={sx("padding: 12px 14px; border-radius: 12px; background: #f6f8f3; font-size: 13px; line-height: 1.5; color: #16241a")}>
          <b>{v.rfSelCount}</b> · {v.tRfSelHint}
        </div>
      </div>

      <div style={sx(card + "; align-self: start")}>
        <div style={sx("display: flex; flex-wrap: wrap; align-items: flex-start; gap: 12px; padding: 20px 22px 16px")}>
          <div style={sx("flex: 1 1 240px; min-width: 0")}>
            <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 26px; letter-spacing: -.02em; color: #16241a; margin: 0")}>
              <span aria-hidden="true" style={sx(step)}>2</span>
              {v.tRolesHeading}
            </h2>
            <p style={sx("margin: 5px 0 0; font-size: 13.5px; line-height: 1.5; color: rgba(22,36,26,.7)")}>{v.tRolesSub}</p>
          </div>
          <div style={sx("display: flex; flex-wrap: wrap; gap: 8px")}>
            <button type="button" onClick={v.openAssign} style={sx(ghost)} className="kza-h6">{v.tAssignBtn2}</button>
            <button type="button" onClick={v.openAddRole} style={sx(ghost)} className="kza-h6">{v.tAddRole}</button>
          </div>
        </div>
        <div style={sx("border-top: 1px solid rgba(22,36,26,.1)")}>
          {list(v.roleCards).map((rc, i) => (
            <div key={rc.key ?? i} style={sx(rc.style)}>
              <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px")}>
                <button type="button" onClick={rc.pick} aria-pressed={rc.onAttr} style={sx("display: flex; align-items: baseline; gap: 10px; flex: 1 1 180px; min-width: 0; padding: 0; border: 0; background: transparent; cursor: pointer; text-align: left; color: #16241a")}>
                  <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{rc.name}</span>
                  <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.55); white-space: nowrap")}>{rc.numLabel}</span>
                </button>
                <span style={sx("position: relative")}>
                  <button type="button" onClick={rc.edit} aria-haspopup="true" aria-expanded={!!rc.editOpen} style={sx(rc.editStyle)}>
                    {rc.editLabel} <span aria-hidden="true" style={sx("font-size: 10px")}>▾</span>
                  </button>
                  {rc.editOpen ? (
                    <>
                      <div onClick={rc.edit} style={sx("position: fixed; inset: 0; z-index: 40")} />
                      <div role="menu" style={sx("position: absolute; right: 0; top: calc(100% + 6px); z-index: 41; width: 270px; max-height: 360px; overflow-y: auto; padding: 8px; border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 20px 48px rgba(22,36,26,.18)")}>
                        <div style={sx("display: flex; align-items: center; gap: 8px; padding: 4px 6px 8px; border-bottom: 1px solid rgba(22,36,26,.08); margin-bottom: 4px")}>
                          <span style={sx("flex: 1; font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>{rc.menuHead}</span>
                          <button type="button" onClick={rc.permAll} style={sx("padding: 4px 10px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 12px; font-weight: 600; cursor: pointer")}>{rc.permAllLbl}</button>
                        </div>
                        {list(rc.perms).map((pm2, j) => (
                          <label key={pm2.key ?? j} role="menuitemcheckbox" aria-checked={pm2.on} style={sx("display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 9px; font-size: 14px; cursor: pointer")} className="kza-h6">
                            <input type="checkbox" checked={!!pm2.on} onChange={pm2.toggle} style={sx("width: 16px; height: 16px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto")} />
                            <span>{pm2.name}</span>
                          </label>
                        ))}
                      </div>
                    </>
                  ) : null}
                </span>
                <button type="button" onClick={rc.give} disabled={!!rc.giveOff} title={rc.giveTitle} style={sx(rc.giveStyle)}>{rc.giveLabel}</button>
                {rc.canRemove ? (
                  <button type="button" onClick={rc.remove} aria-label={v.tRemove} title={v.tRemove} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; color: #16241a; cursor: pointer; font-size: 13px; padding: 0")}>×</button>
                ) : null}
              </div>
              <div style={sx("margin-top: 6px; font-size: 13px; line-height: 1.5; color: rgba(22,36,26,.62)")}>{rc.accessText}</div>
            </div>
          ))}
        </div>
      </div>

      {v.rgOpen ? (
        <div data-rsp-modal="" onClick={v.rgClose} style={sx(overlay)}>
          <form onClick={v.stopClick} onSubmit={v.rgSend} style={sx("position: relative; width: 100%; max-width: 560px; max-height: calc(100vh - 48px); overflow-y: auto; box-sizing: border-box; border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 32px 80px rgba(22,36,26,.32); padding: 26px; display: grid; gap: 16px")}>
            <button type="button" onClick={v.rgClose} aria-label={v.tClose} style={sx(closeX)}>×</button>
            <div style={sx("margin-right: 40px")}>
              <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0")}>{v.rgTitle}</h3>
              <p style={sx("margin: 6px 0 0; font-size: 13.5px; line-height: 1.5; color: rgba(22,36,26,.7)")}>{v.rgPeople}</p>
            </div>
            <div style={sx("display: grid; gap: 8px")}>
              <div style={sx("font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>{v.tRgWhere}</div>
              <label style={sx(`display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border-radius: 14px; cursor: pointer; ${v.rgClubStyle ?? ""}`)}>
                <input type="radio" name="rg-scope" checked={!!v.rgIsClub} onChange={v.rgPickClub} style={sx("width: 17px; height: 17px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto; margin-top: 2px")} />
                <span>
                  <b style={sx("display: block; font-size: 14.5px")}>{v.tRgClub}</b>
                  <span style={sx("display: block; margin-top: 2px; font-size: 12.5px; color: rgba(22,36,26,.62)")}>{v.tRgClubSub}</span>
                </span>
              </label>
              <label style={sx(`display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border-radius: 14px; cursor: pointer; ${v.rgGroupsStyle ?? ""}`)}>
                <input type="radio" name="rg-scope" checked={!!v.rgIsGroups} onChange={v.rgPickGroups} style={sx("width: 17px; height: 17px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto; margin-top: 2px")} />
                <span>
                  <b style={sx("display: block; font-size: 14.5px")}>{v.tRgGroups}</b>
                  <span style={sx("display: block; margin-top: 2px; font-size: 12.5px; color: rgba(22,36,26,.62)")}>{v.tRgGroupsSub}</span>
                </span>
              </label>
              {v.rgIsGroups ? (
                <div style={sx("display: grid; gap: 6px; padding: 10px; border-radius: 14px; border: 1px solid rgba(22,36,26,.1)")}>
                  <input type="search" value={v.rgQ ?? ""} onChange={v.onRgQ} placeholder={v.tRgSearch} aria-label={v.tRgSearch} style={sx(search)} className="kza-f7" />
                  <div style={sx("display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 2px 8px; max-height: 200px; overflow-y: auto")}>
                    {list(v.rgGroupList).map((gg, i) => (
                      <label key={gg.key ?? i} style={sx("display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 9px; font-size: 14px; cursor: pointer")} className="kza-h6">
                        <input type="checkbox" checked={!!gg.on} onChange={gg.toggle} style={sx("width: 17px; height: 17px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto")} />
                        <span style={sx("flex: 1; min-width: 0")}>{gg.name}</span>
                        <span style={sx("font-size: 12px; color: rgba(22,36,26,.55)")}>{gg.meta}</span>
                      </label>
                    ))}
                  </div>
                  {v.rgNoGroups ? <div style={sx("font-size: 12.5px; color: #a3282f")}>{v.tRgPickOne}</div> : null}
                </div>
              ) : null}
            </div>
            <div style={sx("padding: 12px 14px; border-radius: 14px; background: #f6f8f3; font-size: 13px; line-height: 1.55; color: #16241a")}>
              <b>{v.tRgAccess}</b> {v.rgAccess}
              <br />
              <span style={sx("color: rgba(22,36,26,.6)")}>{v.rgSummary}</span>
            </div>
            <div style={sx("display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px")}>
              <button type="button" onClick={v.rgClose} style={sx("padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")}>{v.tCancel2}</button>
              <button type="submit" disabled={!!v.rgDisabled} style={sx(`padding: 12px 22px; border-radius: 999px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer; opacity: ${v.rgBtnOpacity ?? 1}`)}>{v.tRgSend}</button>
            </div>
          </form>
        </div>
      ) : null}

      {v.taOpen ? (
        <div data-rsp-modal="" onClick={v.closeAssign} style={sx(overlay)}>
          <form onClick={v.stopClick} onSubmit={v.saveAssign} style={sx("position: relative; width: 100%; max-width: 480px; max-height: calc(100vh - 48px); overflow-y: auto; box-sizing: border-box; border-radius: 28px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 32px 80px rgba(22,36,26,.32); padding: 26px; display: grid; gap: 12px")}>
            <button type="button" onClick={v.closeAssign} aria-label={v.tClose} style={sx(closeX)}>×</button>
            <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0 40px 4px 0")}>{v.tAssignBtn2}</h3>
            <div style={sx(cap)}>{v.tTaPerson}</div>
            <input type="search" value={v.taQ ?? ""} onChange={v.onTaQ} placeholder={v.tTaSearch} style={sx("width: 100%; box-sizing: border-box; padding: 13px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-f7" />
            <div style={sx("display: grid; gap: 6px; max-height: 190px; overflow-y: auto; padding-right: 2px")}>
              {list(v.taResults).map((p, i) => (
                <button key={p.key ?? i} type="button" onClick={p.pick} style={sx(p.style)} className="kza-h3">
                  <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 14px")}>{p.name}</span>
                  <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.7)")}>{p.meta}</span>
                </button>
              ))}
              {v.taNone ? <div style={sx("padding: 10px 4px; font-size: 13.5px; color: rgba(22,36,26,.7)")}>{v.tRoleEmpty}</div> : null}
            </div>
            <div style={sx(cap + "; margin-top: 4px")}>{v.tTaClub}</div>
            <select value={v.taClub ?? ""} onChange={v.onTaClub} style={sx(v.inputStyle)}>
              {list(v.taClubOpts).map((o, i) => (
                <option key={o.key ?? i} value={o.id}>{o.name}</option>
              ))}
            </select>
            <div style={sx(cap + "; margin-top: 4px")}>{v.tTaRole}</div>
            <select value={v.taRole ?? ""} onChange={v.onTaRole} style={sx(v.inputStyle)}>
              {list(v.roleOpts).map((o, i) => (
                <option key={o.key ?? i} value={o.id}>{o.name}</option>
              ))}
            </select>
            <button type="submit" disabled={!!v.taDisabled} style={sx(`padding: 14px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 15px; cursor: pointer; opacity: ${v.taBtnOpacity ?? 1}`)}>{v.tAssignBtn2}</button>
          </form>
        </div>
      ) : null}

      {v.roleModal ? (
        <div data-rsp-modal="" onClick={v.closeRoleModal} style={sx(overlay)}>
          <form onClick={v.stopClick} onSubmit={v.saveRole} style={sx("position: relative; width: 100%; max-width: 420px; box-sizing: border-box; border-radius: 28px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 32px 80px rgba(22,36,26,.32); padding: 26px; display: grid; gap: 12px")}>
            <button type="button" onClick={v.closeRoleModal} aria-label={v.tClose} style={sx(closeX)}>×</button>
            <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0 40px 4px 0")}>{v.tAddRole}</h3>
            <input type="text" required value={v.roleName ?? ""} onChange={v.onRoleName} placeholder={v.tRoleName} style={sx(v.inputStyle)} />
            <button type="submit" style={sx("padding: 14px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 15px; cursor: pointer")}>{v.tSave}</button>
          </form>
        </div>
      ) : null}

      <div data-kza-roles-right="" style={sx("display: grid; gap: 20px; align-content: start; min-width: 0")}>
        <div data-kza-rbox="" style={sx(card + "; padding: 18px 18px 16px; display: grid; gap: 10px")}>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 6px")}>
            <h2 style={sx("flex: 1; min-width: 0; font-family: var(--font-heading); font-weight: 800; font-size: 19px; margin: 0")}>
              {v.tRoleGiven} <span style={sx(count)}>{v.roleGivenCount}</span>
            </h2>
            {v.roleFiltered ? (
              <button type="button" onClick={v.clearRoleFilter} style={sx("padding: 5px 11px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer")}>
                {v.roleFilterLabel} ×
              </button>
            ) : null}
          </div>
          <input type="search" value={v.roleQ ?? ""} onChange={v.onRoleQ} placeholder={v.tRoleSearch} aria-label={v.tRoleSearch} style={sx(search + "; padding: 9px 14px")} className="kza-f7" />
          <div data-kza-rlist="" style={sx("display: grid; gap: 8px; max-height: calc(50vh - 150px); min-height: 140px; overflow-y: auto; padding-right: 2px")}>
            {list(v.roleRows).map((rr, i) => (
              <Person key={rr.key ?? i} p={rr}>
                <button type="button" onClick={rr.remove} aria-label={v.tRemoveRole} title={v.tRemoveRole} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: rgba(22,36,26,.7); font-size: 14px; cursor: pointer; padding: 0")}>×</button>
              </Person>
            ))}
            {v.roleEmpty ? <div style={sx("padding: 8px 4px; font-size: 13px; color: rgba(22,36,26,.6)")}>{v.tRoleEmpty}</div> : null}
          </div>
        </div>
        <div data-kza-rbox="" style={sx(card + "; padding: 18px 18px 16px; display: grid; gap: 10px")}>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 6px")}>
            <h2 style={sx("flex: 1; min-width: 0; font-family: var(--font-heading); font-weight: 800; font-size: 19px; margin: 0")}>
              <span aria-hidden="true" style={sx(step)}>3</span>
              {v.tRolePending} <span style={sx(count)}>{v.rolePendCount}</span>
            </h2>
            {v.rolePendAny ? (
              <button type="button" onClick={v.rolePendAll} style={sx("padding: 6px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer")} className="kza-h6">
                {v.tRolePendAll}
              </button>
            ) : null}
          </div>
          <div data-kza-rlist="" style={sx("display: grid; gap: 8px; max-height: calc(50vh - 120px); min-height: 110px; overflow-y: auto; padding-right: 2px")}>
            {list(v.rolePendRows).map((rp, i) => (
              <Person key={rp.key ?? i} p={rp}>
                <button type="button" onClick={rp.reject} style={sx("padding: 7px 11px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer")} className="kza-h6">{v.tRoleReject}</button>
                <button type="button" onClick={rp.accept} style={sx("padding: 7px 13px; border-radius: 999px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer")} className="kza-hf">{v.tRoleAccept}</button>
              </Person>
            ))}
            {v.rolePendNone ? <div style={sx("padding: 8px 4px; font-size: 13px; color: rgba(22,36,26,.6)")}>{v.tRolePendNone}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
