import { sx, list } from "../adminRuntime";

// Betalingsforespørsler › Ny betaling: side panel (Nov 2026 design: payment
// // type, instalments, account, discount, NIF fee, recipients by segment).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function InvoiceAddPanel({ v }) {
  return (
    <div data-rsp-modal="" onClick={v.closeInvAdd} style={sx("position: fixed; inset: 0; z-index: 98; display: grid; place-items: center; padding: 20px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)")}>
      <form role="dialog" aria-modal="true" aria-label={v.tInvAdd} onClick={v.stopClick} onSubmit={v.sendInvoice} style={sx("width: 100%; max-width: 960px; max-height: calc(100vh - 40px); display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; border-radius: 26px; background: #ffffff; box-shadow: 0 32px 80px rgba(22,36,26,.32)")}>
        <div style={sx("display: flex; align-items: center; gap: 12px; padding: 20px 24px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
          <h3 style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0")}>
            {v.tInvoiceModal}
          </h3>
          <button type="button" onClick={v.closeInvAdd} aria-label={v.tClose} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; font-size: 16px; cursor: pointer")}>
            ×
          </button>
        </div>
        <div data-rsp="stack" style={sx("flex: 1; min-height: 0; overflow-y: auto; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); align-items: stretch; align-content: stretch")}>
          <div style={sx("display: grid; gap: 14px; padding: 22px 24px")}>
            <p style={sx("margin: 0; font-size: 14px; color: rgba(22,36,26,.75)")}>
              {v.tInvoiceNote}
            </p>
            <div style={sx("display: grid; gap: 6px")}>
              <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                {v.tSegment}
              </span>
              <button type="button" onClick={v.openSegPick} aria-haspopup="dialog" style={sx("display: flex; align-items: center; gap: 10px; width: 100%; box-sizing: border-box; text-align: left; padding: 11px 16px; border-radius: 14px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; cursor: pointer; transition: border-color .2s")} className="kza-hu">
                <span style={sx("flex: 1; min-width: 0")}>
                  {v.segLabel}
                </span>
                <span aria-hidden="true" style={sx("font-size: 10px")}>
                  ▾
                </span>
              </button>
              {v.segChosen ? (
                <button type="button" onClick={v.clearSeg} style={sx("justify-self: start; padding: 0; border: 0; background: transparent; color: #1f7a3a; font-family: var(--font-body); font-size: 13px; text-decoration: underline; cursor: pointer")}>
                  {v.tSegClear}
                </button>
              ) : null}
              <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.65); letter-spacing: 0; text-transform: none; font-weight: 400")}>
                {v.segHint}
              </span>
            </div>
            <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
              {v.tNpTitle}
              <input type="text" required value={v.invTitle ?? ""} onChange={v.onInvTitle} placeholder={v.tInvTitlePh} style={sx(v.inputStyleWhite)} />
            </label>
            <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
              {v.tNpDesc}
              <textarea rows="3" value={v.npDesc ?? ""} onChange={v.onNpDesc} placeholder={v.tNpDescPh} style={sx(`${v.inputStyleWhite ?? ""}; resize: vertical; line-height: 1.5`)} />
            </label>
            <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
              {v.tNpAccount}
              <select value={v.npAcct ?? ""} onChange={v.onNpAcct} style={sx(v.inputStyleWhite)}>
                {list(v.npAccts).map((o, i1) => (
                    <option key={o.key ?? i1} value={o.id}>
                      {o.name}
                    </option>
                ))}
              </select>
            </label>
            <div style={sx("display: grid; gap: 8px")}>
              <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                {v.tNpType}
              </span>
              {list(v.npTypes).map((o, i1) => (
                  <button key={o.key ?? i1} type="button" role="radio" aria-checked={o.on} onClick={o.pick} style={sx(o.style)} className="kza-hu">
                    <span aria-hidden="true" style={sx(o.dot)} />
                    <span style={sx("flex: 1; min-width: 0; text-align: left")}>
                      <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14px")}>
                        {o.label}
                      </span>
                      <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.68); margin-top: 2px; font-family: var(--font-body); font-weight: 400; letter-spacing: 0; text-transform: none")}>
                        {o.note}
                      </span>
                    </span>
                  </button>
              ))}
            </div>
            <div style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 12px")}>
              <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                {v.tNpAmount}
                <input type="number" min="1" required value={v.invAmount ?? ""} onChange={v.onInvAmount} placeholder={v.tInvAmountPh} style={sx(v.inputStyleWhite)} />
              </label>
              <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                {v.tNpDue}
                <input type="date" required value={v.invDue ?? ""} onChange={v.onInvDue} style={sx(v.inputStyleWhite)} />
              </label>
            </div>
            {v.npInstShow ? (
              <label style={sx("display: grid; gap: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                {v.tNpInst}
                <select value={v.npInst ?? ""} onChange={v.onNpInst} style={sx(v.inputStyleWhite)}>
                  {list(v.npInstOpts).map((o, i1) => (
                      <option key={o.key ?? i1} value={o.id}>
                        {o.name}
                      </option>
                  ))}
                </select>
                <span style={sx("font-size: 12.5px; letter-spacing: 0; text-transform: none; font-weight: 400; color: rgba(22,36,26,.68)")}>
                  {v.npInstNote}
                </span>
              </label>
            ) : null}
            <label style={sx("display: flex; align-items: flex-start; gap: 10px; font-size: 14px; line-height: 1.45; cursor: pointer")}>
              <input type="checkbox" checked={!!v.npDiscount} onChange={v.onNpDiscount} style={sx("width: 18px; height: 18px; margin-top: 2px; accent-color: #1f7a3a")} />
              <span>
                <span style={sx("display: block; font-weight: 600")}>
                  {v.tNpDiscount}
                </span>
                <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.68)")}>
                  {v.tNpDiscountNote}
                </span>
              </span>
            </label>
            <div style={sx("border-radius: 16px; background: #f7fafc; border: 1px solid rgba(22,36,26,.1); padding: 16px 18px; display: grid; gap: 10px")}>
              <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
                {v.tNpNifTitle}
              </div>
              <div style={sx("font-size: 13px; line-height: 1.5; color: rgba(22,36,26,.7)")}>
                {v.tNpNifText}
              </div>
              <label style={sx("display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer")}>
                <input type="checkbox" checked={!!v.npNifFee} onChange={v.onNpNifFee} style={sx("width: 18px; height: 18px; accent-color: #1f7a3a")} />
                {v.tNpNifFee}
              </label>
              <label style={sx("display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer")}>
                <input type="checkbox" checked={!!v.npNifTrain} onChange={v.onNpNifTrain} style={sx("width: 18px; height: 18px; accent-color: #1f7a3a")} />
                {v.tNpNifTrain}
              </label>
            </div>
          </div>
          <div style={sx("display: grid; gap: 18px; align-content: start; padding: 22px 24px; background: #f4f8f2; border-left: 1px solid rgba(22,36,26,.08)")}>
            {v.segChosen ? (
              <div style={sx("display: grid; gap: 10px")}>
                <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.segHeading}
                </span>
                <div style={sx("font-size: 13px; color: rgba(22,36,26,.68)")}>
                  {v.tSegPriceHelp}
                </div>
                <div style={sx("display: grid; gap: 6px; max-height: 300px; overflow-y: auto; scrollbar-width: thin")}>
                  {list(v.segRows).map((g, i1) => (
                      <div key={g.key ?? i1} style={sx("display: grid; grid-template-columns: 22px minmax(0,1fr) 110px; gap: 10px; align-items: center; padding: 8px 12px; border-radius: 14px; background: #ffffff; border: 1px solid rgba(22,36,26,.1)")}>
                        <input type="checkbox" checked={!!g.on} onChange={g.toggle} aria-label={g.name} style={sx("width: 18px; height: 18px; accent-color: #1f7a3a")} />
                        <span style={sx("min-width: 0")}>
                          <span style={sx("display: block; font-weight: 600; font-size: 14px")}>
                            {g.name}
                          </span>
                          <span style={sx("display: block; font-size: 12px; color: rgba(22,36,26,.6)")}>
                            {g.count}
                          </span>
                        </span>
                        <input type="number" min="0" value={g.price ?? ""} onChange={g.setPrice} placeholder={v.tNpAmount} aria-label={v.tNpAmount} style={sx("width: 100%; box-sizing: border-box; padding: 8px 10px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; font-family: var(--font-body); font-size: 13.5px; outline: none")} className="kza-fp" />
                      </div>
                  ))}
                </div>
              </div>
            ) : null}
            {v.pickList ? (
              <div style={sx("display: grid; gap: 10px")}>
                <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.pickHeading}
                </span>
                <input type="search" value={v.invPQ ?? ""} onChange={v.onInvPQ} placeholder={v.tPickSearch} style={sx("width: 100%; box-sizing: border-box; padding: 11px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} className="kza-fp" />
                <div style={sx("display: grid; gap: 6px; max-height: 220px; overflow-y: auto; scrollbar-width: thin")}>
                  {list(v.pickRows).map((p, i1) => (
                      <button key={p.key ?? i1} type="button" onClick={p.pick} style={sx(p.style)}>
                        <span style={sx("display: block; font-weight: 600; font-size: 14px")}>
                          {p.label}
                        </span>
                        <span style={sx("display: block; font-size: 12.5px; opacity: .72")}>
                          {p.sub}
                        </span>
                      </button>
                  ))}
                  {v.pickEmpty ? (
                    <div style={sx("font-size: 13.5px; color: rgba(22,36,26,.7)")}>
                      {v.tInvNoMatch}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {v.pickEvent ? (
              <div style={sx("display: grid; gap: 10px")}>
                <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.tEvSearchHead}
                </span>
                <input type="search" value={v.invEvQ ?? ""} onChange={v.onInvEvQ} placeholder={v.tEvSearchPh} style={sx("width: 100%; box-sizing: border-box; padding: 11px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} className="kza-fp" />
                {v.evHasQuery ? (
                  <div style={sx("display: grid; gap: 6px; max-height: 200px; overflow-y: auto; scrollbar-width: thin")}>
                    {list(v.evResults).map((p, i1) => (
                        <button key={p.key ?? i1} type="button" onClick={p.pick} style={sx(p.style)}>
                          <span style={sx("display: block; font-weight: 600; font-size: 14px")}>
                            {p.label}
                          </span>
                          <span style={sx("display: block; font-size: 12.5px; opacity: .72")}>
                            {p.sub}
                          </span>
                        </button>
                    ))}
                    {v.evResEmpty ? (
                      <div style={sx("font-size: 13.5px; color: rgba(22,36,26,.7)")}>
                        {v.tInvNoMatch}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <span style={sx("margin-top: 6px; font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                  {v.tPickEvent}
                </span>
                <div style={sx("border-radius: 18px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 14px")}>
                  <div style={sx("display: flex; align-items: center; gap: 8px; margin-bottom: 10px")}>
                    <button type="button" onClick={v.ivCalPrev} aria-label={v.ivTPrev} style={sx("width: 32px; height: 32px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; cursor: pointer")}>
                      ‹
                    </button>
                    <span style={sx("flex: 1; text-align: center; font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
                      {v.ivCalTitle}
                    </span>
                    <button type="button" onClick={v.ivCalNext} aria-label={v.ivTNext} style={sx("width: 32px; height: 32px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; cursor: pointer")}>
                      ›
                    </button>
                  </div>
                  <div style={sx("display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; text-align: center")}>
                    {list(v.ivCalHead).map((h, i1) => (
                        <span key={h.key ?? i1} style={sx("font-size: 11px; font-weight: 600; color: rgba(22,36,26,.55); padding: 2px 0")}>
                          {h.label}
                        </span>
                    ))}
                    {list(v.ivCalCells).map((c, i1) => (
                        <button key={c.key ?? i1} type="button" onClick={c.pick} disabled={!!c.off} style={sx(c.style)}>
                          {c.label}
                        </button>
                    ))}
                  </div>
                </div>
                <div style={sx("display: grid; gap: 6px")}>
                  {list(v.ivCalEvents).map((p, i1) => (
                      <button key={p.key ?? i1} type="button" onClick={p.pick} style={sx(p.style)}>
                        <span style={sx("display: block; font-weight: 600; font-size: 14px")}>
                          {p.label}
                        </span>
                        <span style={sx("display: block; font-size: 12.5px; opacity: .72")}>
                          {p.sub}
                        </span>
                      </button>
                  ))}
                  {v.ivCalNoEvents ? (
                    <div style={sx("font-size: 13.5px; color: rgba(22,36,26,.7)")}>
                      {v.ivTCalHint}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div style={sx(`display: grid; gap: 10px; ${v.manualTop ?? ""}`)}>
              <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                {v.tManual}
              </span>
              <input type="search" value={v.invManQ ?? ""} onChange={v.onInvManQ} placeholder={v.tManualSearch} style={sx("width: 100%; box-sizing: border-box; padding: 11px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} className="kza-fp" />
              {v.manHasRes ? (
                <div style={sx("display: grid; gap: 4px; border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 6px")}>
                  {list(v.manRes).map((p, i1) => (
                      <button key={p.key ?? i1} type="button" onClick={p.add} style={sx("display: flex; align-items: center; gap: 10px; text-align: left; width: 100%; padding: 8px 10px; border: 0; border-radius: 12px; background: transparent; cursor: pointer; font-family: var(--font-body); color: #16241a")} className="kza-h3">
                        <span style={sx("flex: 1; min-width: 0")}>
                          <span style={sx("display: block; font-weight: 600; font-size: 14px")}>
                            {p.name}
                          </span>
                          <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.65)")}>
                            {p.sub}
                          </span>
                        </span>
                        <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 13px; color: #1f7a3a")}>
                          + {v.tAddL}
                        </span>
                      </button>
                  ))}
                </div>
              ) : null}
              {v.manHasChips ? (
                <div style={sx("display: flex; flex-wrap: wrap; gap: 8px")}>
                  {list(v.manChips).map((p, i1) => (
                      <span key={p.key ?? i1} style={sx("display: inline-flex; align-items: center; gap: 6px; padding: 6px 6px 6px 12px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-size: 13px")}>
                        {p.name}
                        <button type="button" onClick={p.remove} aria-label={v.tRemoveL} style={sx("width: 22px; height: 22px; border-radius: 999px; border: 0; background: rgba(246,248,243,.2); color: #f6f8f3; cursor: pointer; font-size: 12px; line-height: 1")}>
                          ×
                        </button>
                      </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; padding: 16px 24px; background: #ffffff; border-top: 1px solid rgba(22,36,26,.1)")}>
          <span style={sx("flex: 1; min-width: 240px; font-size: 13.5px; color: rgba(22,36,26,.78)")}>
            {v.tNpFee}{" "}
            <a href="#" onClick={v.npFeeInfo} style={sx("color: #1f7a3a; text-decoration: underline")}>
              {v.tNpFeeLink}
            </a>
            {v.npFeeInfoOpen ? (
              <span style={sx("display: block; margin-top: 4px; color: rgba(22,36,26,.65)")}>
                {v.tNpFeeExplain}
              </span>
            ) : null}
          </span>
          <span style={sx("font-size: 13.5px; color: rgba(22,36,26,.78)")}>
            {v.invRecipients}
          </span>
          <button type="button" onClick={v.closeInvAdd} style={sx("padding: 12px 22px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")} className="kza-h6">
            {v.tCancelL}
          </button>
          <button type="submit" style={sx("padding: 12px 26px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer; transition: background .3s")} className="kza-ha">
            {v.tSendInvoice}
          </button>
        </div>
      </form>
    </div>
  );
}
