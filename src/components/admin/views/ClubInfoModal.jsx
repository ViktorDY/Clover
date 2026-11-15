import { sx, list } from "../adminRuntime";

// Club info / self-registration invite dialog (Nov 2026 design).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function ClubInfoModal({ v }) {
  return (
    <div data-rsp-modal="" onClick={v.ciClose} style={sx("position: fixed; inset: 0; z-index: 97; display: grid; place-items: center; padding: 20px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)")}>
      <form role="dialog" aria-modal="true" aria-label={v.ciTitle} onClick={v.stopClick} onSubmit={v.ciSave} style={sx("width: 100%; max-width: 640px; max-height: calc(100vh - 40px); display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; border-radius: 26px; background: #f6f8f3; box-shadow: 0 32px 80px rgba(22,36,26,.32)")}>
        <div style={sx("display: flex; align-items: center; gap: 12px; padding: 20px 26px; background: #ffffff; border-bottom: 1px solid rgba(22,36,26,.1)")}>
          <h3 style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0")}>
            {v.ciTitle}
          </h3>
          <button type="button" onClick={v.ciClose} aria-label={v.tClose} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; font-size: 16px; cursor: pointer")}>
            ×
          </button>
        </div>
        <div style={sx("flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: thin; padding: 22px 26px; display: grid; gap: 16px")}>
          {v.ciIsInfo ? (
            <div style={sx("display: grid; gap: 16px")}>
              <label style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                {v.tCiName}
                <input type="text" required value={v.ciName ?? ""} onChange={v.onCiName} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-a1x4" />
              </label>
              <label style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                {v.tCiDesc}
                <textarea rows="3" value={v.ciDesc ?? ""} onChange={v.onCiDesc} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none; resize: none; line-height: 1.5")} className="kza-a1x4" />
              </label>
              <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 14px")}>
                {list(v.ciSelects).map((f, i1) => (
                    <label key={f.key ?? i1} style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                      {f.label}
                      <select value={f.value ?? ""} onChange={f.on} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")}>
                        {list(f.opts).map((o, i2) => (
                            <option key={o.key ?? i2} value={o.id}>
                              {o.name}
                            </option>
                        ))}
                      </select>
                    </label>
                ))}
                <div style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                  {v.tCiMembers}
                  <div style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none; background: #eef2ec; color: rgba(22,36,26,.8)")}>
                    {v.ciMembers}
                  </div>
                </div>
              </div>
              <label style={sx("display: grid; gap: 6px; font-size: 13.5px; color: #16241a")}>
                {v.tCiCriteria}
                <textarea rows="2" value={v.ciCriteria ?? ""} onChange={v.onCiCriteria} placeholder={v.tCiCriteriaPh} style={sx("width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none; resize: none; line-height: 1.5")} className="kza-a1x4" />
              </label>
              <div style={sx("display: grid; gap: 8px")}>
                <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.tCiPay}
                </span>
                <div style={sx("display: flex; flex-wrap: wrap; gap: 8px")}>
                  {list(v.ciPay).map((p, i1) => (
                      <button key={p.key ?? i1} type="button" role="checkbox" aria-checked={p.on} onClick={p.toggle} style={sx(p.style)}>
                        <span aria-hidden="true">
                          {p.mark}
                        </span>
                        {p.label}
                      </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          {v.ciIsInvite ? (
            <div style={sx("display: grid; gap: 18px")}>
              <p style={sx("margin: 0; font-size: 14.5px; line-height: 1.55; color: rgba(22,36,26,.85)")}>
                {v.tCiInviteText}
              </p>
              <div style={sx("display: flex; align-items: center; gap: 14px; border-radius: 18px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px 16px")}>
                <span style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
                  {v.tCiSelfReg}
                </span>
                <button type="button" role="switch" aria-checked={v.ciInvOn} aria-label={v.tCiSelfReg} onClick={v.ciToggleInv} style={sx(v.ciSwTrack)}>
                  <span style={sx(v.ciSwKnob)} />
                </button>
              </div>
              {v.ciInvOn ? (
                <div style={sx("display: grid; gap: 12px")}>
                  <div style={sx("display: grid; gap: 6px")}>
                    <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tCiCode}
                    </span>
                    <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
                      <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 34px; letter-spacing: .14em")}>
                        {v.ciCode}
                      </span>
                      <button type="button" onClick={v.ciCopyCode} style={sx("padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; box-shadow: 0 1px 2px rgba(22,36,26,.1); transition: background .2s")} className="kza-h6">
                        {v.tCiCopy}
                      </button>
                      <button type="button" onClick={v.ciNewCode} style={sx("padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; box-shadow: 0 1px 2px rgba(22,36,26,.1); transition: background .2s")} className="kza-h6">
                        {v.tCiNewCode}
                      </button>
                    </div>
                  </div>
                  <div style={sx("display: grid; gap: 6px")}>
                    <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                      {v.tCiLink}
                    </span>
                    <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
                      <span style={sx("flex: 1; min-width: 0; padding: 11px 14px; border-radius: 12px; background: #eef2ec; font-size: 14px; word-break: break-all")}>
                        {v.ciLink}
                      </span>
                      <button type="button" onClick={v.ciCopyLink} style={sx("padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; box-shadow: 0 1px 2px rgba(22,36,26,.1); transition: background .2s")} className="kza-h6">
                        {v.tCiCopy}
                      </button>
                    </div>
                  </div>
                  {v.ciCopied ? (
                    <div role="status" style={sx("font-size: 13.5px; color: #1f7a3a; font-weight: 700")}>
                      {v.ciCopied}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <div style={sx("display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; padding: 16px 26px; background: #ffffff; border-top: 1px solid rgba(22,36,26,.1)")}>
          <button type="button" onClick={v.ciClose} style={sx("padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")}>
            {v.ciCloseLabel}
          </button>
          {v.ciIsInfo ? (
            <button type="submit" style={sx("padding: 12px 26px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")} className="kza-ha">
              {v.tSaveL}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
