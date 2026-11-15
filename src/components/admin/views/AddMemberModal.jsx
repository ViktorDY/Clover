import { sx, list } from "../adminRuntime";

// Add member dialog (Nov 2026 design: guardians, groups with roles, payment).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function AddMemberModal({ v }) {
  return (
    <div data-rsp-modal="" onClick={v.closeAddMember} style={sx("position: fixed; inset: 0; z-index: 97; display: grid; place-items: center; padding: 20px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)")}>
      <form role="dialog" aria-modal="true" aria-label={v.tAddMember} onClick={v.stopClick} onSubmit={v.saveMember} style={sx("position: relative; width: 100%; max-width: 760px; max-height: calc(100vh - 40px); display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; border-radius: 26px; background: #f6f8f3; box-shadow: 0 32px 80px rgba(22,36,26,.32)")}>
        <div style={sx("display: flex; align-items: center; gap: 12px; padding: 20px 26px; background: #ffffff; border-bottom: 1px solid rgba(22,36,26,.1)")}>
          <h3 style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0")}>
            {v.tAddMember}
          </h3>
          <button type="button" onClick={v.closeAddMember} aria-label={v.tClose} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; font-size: 16px; cursor: pointer")}>
            ×
          </button>
        </div>
        <div style={sx("flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: thin; padding: 22px 26px; display: grid; gap: 16px")}>
          <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 14px; align-items: start")}>
            {list(v.amDDs).map((dd, i1) => (
                <div key={dd.key ?? i1} style={sx("display: grid; gap: 6px; font-size: 13.5px; position: relative")}>
                  {dd.label}
                  <button type="button" onClick={dd.toggle} aria-haspopup="listbox" aria-expanded={dd.open} style={sx("display: flex; align-items: center; gap: 8px; width: 100%; box-sizing: border-box; text-align: left; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; cursor: pointer")}>
                    <span style={sx(`flex: 1; min-width: 0; ${dd.valueStyle ?? ""}`)}>
                      {dd.value}
                    </span>
                    <span aria-hidden="true" style={sx("font-size: 10px")}>
                      ▾
                    </span>
                  </button>
                  {dd.open ? (
                    <div role="listbox" style={sx("position: absolute; left: 0; right: 0; top: calc(100% + 4px); z-index: 5; max-height: 200px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; border-radius: 14px; background: #ffffff; border: 1px solid rgba(22,36,26,.16); box-shadow: 0 16px 40px rgba(22,36,26,.18); padding: 6px")}>
                      {list(dd.options).map((o, i2) => (
                          <button key={o.key ?? i2} type="button" role="option" aria-selected={o.on} onClick={o.pick} style={sx(o.style)} className="kza-h3">
                            {o.label}
                          </button>
                      ))}
                    </div>
                  ) : null}
                </div>
            ))}
          </div>
          <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 14px")}>
            {list(v.amF1).map((f, i1) => (
                <label key={f.key ?? i1} style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                  {f.label}
                  <input type={f.type} value={f.value ?? ""} onChange={f.on} placeholder={f.ph} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-a1x4" />
                </label>
            ))}
          </div>
          <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 6px 0 0; padding-top: 16px; border-top: 1px solid rgba(22,36,26,.1)")}>
            {v.tAmAddress}
          </h4>
          <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 14px")}>
            {list(v.amF2).map((f, i1) => (
                <label key={f.key ?? i1} style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                  {f.label}
                  <input type={f.type} value={f.value ?? ""} onChange={f.on} placeholder={f.ph} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-a1x4" />
                </label>
            ))}
          </div>
          <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 14px")}>
            {list(v.amF3).map((f, i1) => (
                <label key={f.key ?? i1} style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                  {f.label}
                  <input type={f.type} value={f.value ?? ""} onChange={f.on} placeholder={f.ph} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-a1x4" />
                </label>
            ))}
          </div>
          <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 6px 0 0; padding-top: 16px; border-top: 1px solid rgba(22,36,26,.1)")}>
            {v.tAmGuardians}
          </h4>
          {list(v.amGuards).map((g, i1) => (
              <div key={g.key ?? i1} style={sx("border-radius: 18px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px; display: grid; gap: 12px")}>
                <div style={sx("display: flex; align-items: center; gap: 10px")}>
                  <span style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
                    {g.title}
                  </span>
                  <button type="button" onClick={g.remove} aria-label={v.tAmRemove} style={sx("padding: 6px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #a3282f; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-hv">
                    {v.tAmRemove}
                  </button>
                </div>
                <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 12px")}>
                  {list(g.fields).map((f, i2) => (
                      <label key={f.key ?? i2} style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                        {f.label}
                        <input type={f.type} value={f.value ?? ""} onChange={f.on} placeholder={f.ph} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-a1x4" />
                      </label>
                  ))}
                </div>
              </div>
          ))}
          <button type="button" onClick={v.addGuard} style={sx("justify-self: start; padding: 9px 16px; border-radius: 999px; border: 1px dashed rgba(31,122,58,.6); background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-h3">
            + {v.tAmAddGuardian}
          </button>
          <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 6px 0 0; padding-top: 16px; border-top: 1px solid rgba(22,36,26,.1)")}>
            {v.tAmPay}
          </h4>
          <p style={sx("margin: -6px 0 0; font-size: 13.5px; line-height: 1.5; color: rgba(22,36,26,.7)")}>
            {v.tAmPayHelp}
          </p>
          <select value={v.amPay ?? ""} onChange={v.onAmPay} aria-label={v.tAmPay} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none; max-width: 380px")}>
            {list(v.amPayOpts).map((o, i1) => (
                <option key={o.key ?? i1} value={o.id}>
                  {o.name}
                </option>
            ))}
          </select>
          {v.amPcShow ? (
            <div style={sx("display: grid; gap: 14px; max-width: 380px")}>
              {list(v.amPcFields).map((f, i1) => (
                  <label key={f.key ?? i1} style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                    {f.label}
                    <input type={f.type} value={f.value ?? ""} onChange={f.on} placeholder={f.ph} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-a1x4" />
                  </label>
              ))}
            </div>
          ) : null}
          <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 6px 0 0; padding-top: 16px; border-top: 1px solid rgba(22,36,26,.1)")}>
            {v.tAmGroups}
          </h4>
          {list(v.amGroupRows).map((g, i1) => (
              <div key={g.key ?? i1} style={sx("border-radius: 18px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px; display: grid; gap: 12px")}>
                <div style={sx("display: flex; align-items: center; gap: 10px")}>
                  <span style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
                    {g.title}
                  </span>
                  {g.canRemove ? (
                    <button type="button" onClick={g.remove} aria-label={v.tAmRemove} style={sx("padding: 6px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #a3282f; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-hv">
                      {v.tAmRemove}
                    </button>
                  ) : null}
                </div>
                <label style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                  {v.tAmGroupName}
                  <select value={g.value ?? ""} onChange={g.on} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")}>
                    {list(g.opts).map((o, i2) => (
                        <option key={o.key ?? i2} value={o.id}>
                          {o.name}
                        </option>
                    ))}
                  </select>
                </label>
                {list(g.roles).map((r, i2) => (
                    <div key={r.key ?? i2} style={sx("display: flex; align-items: flex-end; gap: 8px")}>
                      <label style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a; flex: 1; min-width: 0")}>
                        {v.tAmGroupRole}
                        <select value={r.value ?? ""} onChange={r.on} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")}>
                          {list(r.opts).map((o, i3) => (
                              <option key={o.key ?? i3} value={o.id}>
                                {o.name}
                              </option>
                          ))}
                        </select>
                      </label>
                      {r.canRemove ? (
                        <button type="button" onClick={r.remove} aria-label={v.tAmRemove} style={sx("height: 44px; width: 44px; border-radius: 12px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; cursor: pointer")}>
                          ×
                        </button>
                      ) : null}
                    </div>
                ))}
                <button type="button" onClick={g.addRole} style={sx("justify-self: start; padding: 9px 16px; border-radius: 999px; border: 1px dashed rgba(31,122,58,.6); background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-h3">
                  + {v.tAmAddRole}
                </button>
              </div>
          ))}
          <button type="button" onClick={v.addGroupRow} style={sx("justify-self: start; padding: 9px 16px; border-radius: 999px; border: 1px dashed rgba(31,122,58,.6); background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-h3">
            + {v.tAmAddGroup}
          </button>
        </div>
        <div style={sx("display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; padding: 16px 26px; background: #ffffff; border-top: 1px solid rgba(22,36,26,.1)")}>
          <button type="button" onClick={v.closeAddMember} style={sx("padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")}>
            {v.tCancelL}
          </button>
          <button type="submit" style={sx("padding: 12px 26px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")} className="kza-ha">
            {v.tAddMember}
          </button>
        </div>
      </form>
    </div>
  );
}
