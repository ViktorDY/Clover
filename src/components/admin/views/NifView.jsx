import { Fragment } from "react";
import { sx, list } from "../adminRuntime";

// Medlemmer og lag › Innsending til NIF (Nov 2026 design).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function NifView({ v }) {
  return (
    <div style={sx("margin-top: 4px; border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); overflow: hidden; min-width: 0")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; padding: 24px 26px")}>
        <h2 style={sx("flex: 1 1 260px; min-width: 0; font-family: var(--font-heading); font-weight: 800; font-size: 30px; letter-spacing: -.02em; color: #16241a; margin: 0")}>
          {v.tNifTitle}
        </h2>
        <button type="button" onClick={v.nifDownload} style={sx("padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .2s")} className="kza-h3">
          {v.tNifDownload}
        </button>
      </div>
      <div role="tablist" style={sx("display: flex; flex-wrap: wrap; gap: 4px; padding: 0 20px; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1)")}>
        {list(v.nifTabs).map((t, i1) => (
            <button key={t.key ?? i1} type="button" role="tab" aria-selected={t.on} onClick={t.pick} style={sx(t.style)}>
              {t.label}
            </button>
        ))}
      </div>
      <div style={sx("display: flex; align-items: flex-start; gap: 14px; padding: 18px 26px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
        <span aria-hidden="true" style={sx("flex: 0 0 auto; width: 26px; height: 26px; border-radius: 999px; background: #16241a; color: #ffffff; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 14px; margin-top: 2px")}>
          i
        </span>
        <p style={sx("margin: 0; font-size: 14.5px; line-height: 1.55; color: rgba(22,36,26,.85); max-width: 110ch")}>
          {v.nifInfo}
        </p>
      </div>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 14px 26px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
        <div style={sx("position: relative")}>
          <button type="button" onClick={v.nfToggle} aria-haspopup="true" aria-expanded={v.nfOpen} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .25s")} className="kza-h3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 4h18l-7 8.5V20l-4-2v-5.5z" />
            </svg>
            {v.tFilter}
            {v.nfBadge ? (
              <span style={sx("min-width: 20px; padding: 1px 7px; border-radius: 999px; background: #1f7a3a; color: #ffffff; font-size: 12px; font-weight: 700; text-align: center")}>
                {v.nfBadgeN}
              </span>
            ) : null}
          </button>
          {v.nfOpen ? (
            <>
              <div onClick={v.nfClose} style={sx("position: fixed; inset: 0; z-index: 30")} />
              <div role="dialog" aria-label={v.tFilter} style={sx("position: absolute; left: 0; top: calc(100% + 8px); z-index: 31; width: min(660px, 92vw); box-sizing: border-box; border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 24px 60px rgba(22,36,26,.2); overflow: hidden")}>
              <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0, 230px) minmax(0, 1fr)")}>
                <div style={sx("max-height: 400px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; padding: 12px; background: #f4f8f2; border-right: 1px solid rgba(22,36,26,.08)")}>
                  <div style={sx("padding: 4px 10px 8px; font-size: 11.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
                    {v.tFHint}
                  </div>
                  {list(v.nfCats).map((c, i1) => (
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
                      {v.nfCatTitle}
                    </span>
                    <button type="button" onClick={v.nfClearCat} style={sx("border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; color: rgba(22,36,26,.65)")}>
                      {v.tFClearCat}
                    </button>
                  </div>
                  <div style={sx("max-height: 300px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; padding: 0 12px 10px; display: grid; gap: 2px; align-content: start")}>
                    {list(v.nfOpts).map((o, i1) => (
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
                    <button type="button" onClick={v.nfClearAll} style={sx("padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-h3">
                      {v.tFClearAll}
                    </button>
                    <button type="button" onClick={v.nfClose} style={sx("padding: 10px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-ha">
                      {v.tFDone}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </>
          ) : null}
        </div>
        <div style={sx("position: relative")}>
          <button type="button" onClick={v.nvToggle} aria-haspopup="true" aria-expanded={v.nvOpen} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .25s")} className="kza-h3">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 5h18M3 12h18M3 19h18" />
              <path d="M9 3v4M15 10v4M8 17v4" />
            </svg>
            {v.tVis}{" "}
            <span style={sx("font-weight: 600; font-size: 12px; color: rgba(22,36,26,.6)")}>
              {v.nvCount}
            </span>
          </button>
          {v.nvOpen ? (
            <>
              <div onClick={v.nvToggle} style={sx("position: fixed; inset: 0; z-index: 30")} />
              <div role="menu" style={sx("position: absolute; left: 0; top: calc(100% + 8px); z-index: 31; width: min(320px, 92vw); box-sizing: border-box; border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 20px 50px rgba(22,36,26,.18); padding: 14px")}>
              <div style={sx("display: flex; align-items: center; gap: 10px; padding: 0 4px 8px")}>
                <span style={sx("flex: 1; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.65)")}>
                  {v.tVisHint}
                </span>
                <button type="button" onClick={v.nvAll} style={sx("border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; color: #1f7a3a")}>
                  {v.tVisAll}
                </button>
                <button type="button" onClick={v.nvReset} style={sx("border: 0; background: transparent; cursor: pointer; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; color: rgba(22,36,26,.65)")}>
                  {v.tVisReset}
                </button>
              </div>
              <div style={sx("max-height: 340px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; display: grid; gap: 2px")}>
                {list(v.nvCols).map((c, i1) => (
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
        <span style={sx("flex: 1")} />
        {v.nifCanSend ? (
          <button type="button" onClick={v.nifSendAll} style={sx("padding: 10px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer")} className="kza-ha">
            {v.tNifSendAll}
          </button>
        ) : null}
        <input type="search" value={v.nifQ ?? ""} onChange={v.onNifQ} placeholder={v.tNifSearch} aria-label={v.tNifSearch} style={sx("width: 100%; box-sizing: border-box; padding: 10px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none; width: min(260px, 100%)")} className="kza-f7" />
      </div>
      {v.nfHasChips ? (
        <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 26px 0")}>
          {list(v.nfChips).map((c, i1) => (
              <span key={c.key ?? i1} style={sx("display: inline-flex; align-items: center; gap: 6px; padding: 5px 6px 5px 12px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-size: 12.5px")}>
                {c.label}
                <button type="button" onClick={c.remove} aria-label={v.tRemoveL} style={sx("width: 20px; height: 20px; border-radius: 999px; border: 0; background: rgba(246,248,243,.2); color: #f6f8f3; cursor: pointer; font-size: 11px; line-height: 1")}>
                  ×
                </button>
              </span>
          ))}
        </div>
      ) : null}
      {v.nifMsg ? (
        <div role="status" style={sx("display: flex; align-items: center; gap: 12px; margin: 14px 26px 0; border-radius: 16px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.5); padding: 12px 16px; font-size: 14px")}>
          <span style={sx("flex: 1")}>
            {v.nifMsg}
          </span>
          <button type="button" onClick={v.nifCloseMsg} aria-label={v.tClose} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 0; background: rgba(22,36,26,.08); cursor: pointer")}>
            ×
          </button>
        </div>
      ) : null}
      {v.nifSelAny ? (
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 14px 26px 0")}>
          <button type="button" onClick={v.nifActSel} style={sx("padding: 10px 18px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-ha">
            {v.tNifActSel}
          </button>
          <span style={sx("font-size: 14.5px")}>
            {v.nifSelNote}{" "}
            <button type="button" onClick={v.nifClearSel} style={sx("border: 0; background: transparent; padding: 0; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: #1f7a3a; text-decoration: underline")}>
              {v.tBkClear}
            </button>
          </span>
        </div>
      ) : null}
      <div style={sx("padding: 16px 26px 6px; font-size: 14.5px; color: rgba(22,36,26,.85)")}>
        {v.nifShowing}
      </div>
      <div style={sx("overflow-x: auto")}>
        <div style={sx(`min-width: ${v.nifMinW ?? ""}`)}>
          <div style={sx(`display: grid; grid-template-columns: ${v.nifGrid ?? ""}; gap: 12px; align-items: center; padding: 12px 26px; background: #f4f8f2; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)`)}>
            <input type="checkbox" aria-label={v.tSelectAll} checked={!!v.nifAllChecked} onChange={v.nifToggleAll} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
            {list(v.nifHead).map((h, i1) => (
                <span key={h.key ?? i1} style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                  {h.label}
                </span>
            ))}
            <span />
          </div>
          {list(v.nifRows).map((r, i1) => (
              <div key={r.key ?? i1} style={sx(`display: grid; grid-template-columns: ${v.nifGrid ?? ""}; gap: 12px; align-items: center; min-height: 60px; padding: 0 26px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 14px; transition: background .2s; background: ${r.bg ?? ""}`)} className="kza-h6">
                <input type="checkbox" aria-label={r.name} checked={!!r.checked} onChange={r.toggle} style={sx("width: 18px; height: 18px; margin: 0; accent-color: #1f7a3a; cursor: pointer")} />
                {list(r.cells).map((c, i2) => (
                  <Fragment key={c.key ?? i2}>
                    {c.isStatus ? (
                      <span>
                        <span style={sx(r.pill)}>
                          {c.val}
                        </span>
                      </span>
                    ) : null}
                    {c.isText ? (
                      <span style={sx(c.style)}>
                        {c.val}
                      </span>
                    ) : null}
                  </Fragment>
                ))}
                <span style={sx("display: flex; justify-content: flex-end")}>
                  <button type="button" onClick={r.act} style={sx(r.btn)} className="kza-a1x3">
                    {r.actLabel}
                  </button>
                </span>
              </div>
          ))}
          {v.nifEmpty ? (
            <div style={sx("display: grid; justify-items: center; gap: 14px; padding: 60px 20px 70px; color: rgba(22,36,26,.7)")}>
              <svg width="52" height="60" viewBox="0 0 56 64" fill="none" stroke="rgba(22,36,26,.7)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="3" width="50" height="58" rx="4" />
                <path d="M14 18h28M14 29h28M14 40h28M14 51h28" />
              </svg>
              <span style={sx("font-size: 16px")}>
                {v.tNifNone}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
