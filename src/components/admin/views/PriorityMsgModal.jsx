import { sx, list } from "../adminRuntime";

// Priority message dialog: pick recipients (members, groups or chats) and send
// // a message shown in "Viktig fra styret" on the members' home page.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function PriorityMsgModal({ v }) {
  return (
    <div data-rsp-modal="" onClick={v.pmClose} style={sx("position: fixed; inset: 0; z-index: 97; display: grid; place-items: center; padding: 20px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)")}>
      <form role="dialog" aria-modal="true" aria-label={v.tPmBtn} onClick={v.stopClick} onSubmit={v.pmSend} style={sx("width: 100%; max-width: 560px; max-height: calc(100vh - 40px); display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; border-radius: 26px; background: #ffffff; box-shadow: 0 32px 80px rgba(22,36,26,.32)")}>
        <div style={sx("display: flex; align-items: center; gap: 12px; padding: 20px 26px; background: #FFF3C2; border-bottom: 1.5px solid #FFD23F")}>
          <span aria-hidden="true" style={sx("width: 34px; height: 34px; flex: 0 0 auto; border-radius: 999px; background: #FFD23F; display: grid; place-items: center")}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#16241a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
          </span>
          <h3 style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 21px; margin: 0")}>
            {v.tPmBtn}
          </h3>
          <button type="button" onClick={v.pmClose} aria-label={v.tClose} style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; font-size: 16px; cursor: pointer")}>
            ×
          </button>
        </div>
        <div style={sx("flex: 1; min-height: 0; overflow-y: auto; padding: 22px 26px; display: grid; gap: 14px")}>
          <p style={sx("margin: 0; font-size: 14px; line-height: 1.5; color: rgba(22,36,26,.78)")}>
            {v.tPmHelp}
          </p>
          <div style={sx("display: grid; gap: 6px")}>
            <span style={sx("font-size: 11.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.6)")}>
              {v.pmRecipHead}
            </span>
            {v.pmPicker ? (
              <>
                <div role="tablist" aria-label={v.tPmAddFrom} style={sx("display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; border-radius: 999px; background: #f4f6f1; justify-self: start")}>
                {list(v.pmSrcTabs).map((st, i1) => (
                    <button key={st.key ?? i1} type="button" role="tab" aria-selected={st.on} onClick={st.pick} style={sx(st.style)}>
                      {st.label}
                    </button>
                ))}
              </div>
                {v.pmSrcChats ? (
                <div style={sx("display: flex; flex-wrap: wrap; gap: 6px")}>
                  {list(v.pmChatOpts).map((g, i1) => (
                      <button key={g.key ?? i1} type="button" onClick={g.pick} style={sx(g.style)}>
                        {g.label}
                      </button>
                  ))}
                  {v.pmNoChats ? (
                    <span style={sx("font-size: 13px; color: rgba(22,36,26,.6)")}>
                      {v.tPmNoChats}
                    </span>
                  ) : null}
                </div>
              ) : null}
                {v.pmSrcGroups ? (
                <div style={sx("display: flex; flex-wrap: wrap; gap: 6px; max-height: 110px; overflow-y: auto")}>
                  {list(v.pmGroups).map((g, i1) => (
                      <button key={g.key ?? i1} type="button" onClick={g.pick} style={sx(g.style)}>
                        {g.label}
                      </button>
                  ))}
                </div>
              ) : null}
                {v.pmSrcAll ? (
                <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
                  <button type="button" onClick={v.pmAll.pick} style={sx(v.pmAll.style)}>
                    {v.pmAll.label}
                  </button>
                  <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.6)")}>
                    {v.tPmAllHint}
                  </span>
                </div>
              ) : null}
                {v.pmSrcSearch ? (
                <div style={sx("position: relative")}>
                  <input type="search" value={v.pmQ ?? ""} onChange={v.onPmQ} placeholder={v.tPmSearch} aria-label={v.tPmSearch} style={sx("width: 100%; box-sizing: border-box; padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14px; outline: none")} className="kza-a1x7" />
                  {v.pmHasRes ? (
                    <div role="listbox" style={sx("position: absolute; left: 0; right: 0; top: calc(100% + 4px); z-index: 3; padding: 6px; border-radius: 12px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 18px 40px rgba(22,36,26,.16)")}>
                      {list(v.pmRes).map((r, i1) => (
                          <button key={r.key ?? i1} type="button" role="option" onClick={r.add} style={sx("display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 8px 10px; border-radius: 8px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 13.5px; color: #16241a")} className="kza-a1x8">
                            <span style={sx("flex: 1; min-width: 0")}>
                              <b style={sx("font-weight: 600")}>
                                {r.name}
                              </b>
                              {" "}
                              <span style={sx("color: rgba(22,36,26,.55); font-size: 12px")}>
                                {r.sub}
                              </span>
                            </span>
                            <span style={sx("font-size: 12px; font-weight: 700; color: #6b5300")}>
                              + {v.tPmAdd}
                            </span>
                          </button>
                      ))}
                    </div>
                  ) : null}
                  {v.pmNoRes ? (
                    <div style={sx("margin-top: 6px; font-size: 13px; color: rgba(22,36,26,.6)")}>
                      {v.tPmNoRes}
                    </div>
                  ) : null}
                </div>
              ) : null}
                <div style={sx("border-radius: 14px; border: 1px solid rgba(22,36,26,.12); overflow: hidden")}>
                <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 9px 12px; background: #fbfaf3; border-bottom: 1px solid rgba(22,36,26,.08)")}>
                  <b style={sx("flex: 1; font-size: 13.5px")}>
                    {v.pmListHead}
                  </b>
                  {v.pmListAny ? (
                    <>
                      <button type="button" onClick={v.pmCheckAll} style={sx("padding: 4px 10px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 12px; font-weight: 600; cursor: pointer")}>
                      {v.tPmCheckAll}
                    </button>
                      <button type="button" onClick={v.pmClearList} style={sx("padding: 4px 10px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 12px; font-weight: 600; cursor: pointer")}>
                      {v.tPmClear}
                    </button>
                    </>
                  ) : null}
                </div>
                {v.pmListAny ? (
                  <div style={sx("position: relative; padding: 8px 12px; border-bottom: 1px solid rgba(22,36,26,.06)")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={sx("position: absolute; left: 23px; top: 18px")}>
                      <circle cx="11" cy="11" r="7" fill="none" stroke="#4C5E50" strokeWidth="2" />
                      <path d="M20 20l-4-4" stroke="#4C5E50" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input type="search" value={v.pmListQ ?? ""} onChange={v.onPmListQ} placeholder={v.tPmListSearch} aria-label={v.tPmListSearch} style={sx("width: 100%; box-sizing: border-box; padding: 7px 12px 7px 32px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; font-family: var(--font-body); font-size: 13px; color: #16241a; outline: none")} className="kza-a1x9" />
                  </div>
                ) : null}
                {v.pmListNoHit ? (
                  <div style={sx("padding: 12px; font-size: 13px; color: rgba(22,36,26,.6)")}>
                    {v.tPmListNoHit}
                  </div>
                ) : null}
                {v.pmListEmpty ? (
                  <div style={sx("padding: 14px 12px; font-size: 13px; color: rgba(22,36,26,.6)")}>
                    {v.tPmListEmpty}
                  </div>
                ) : null}
                <div style={sx("max-height: 200px; overflow-y: auto")}>
                  {list(v.pmListRows).map((lr, i1) => (
                      <label key={lr.key ?? i1} style={sx(lr.style)}>
                        <input type="checkbox" checked={!!lr.on} onChange={lr.toggle} style={sx("width: 17px; height: 17px; margin: 0; accent-color: #1f7a3a; flex: 0 0 auto")} />
                        <span style={sx("flex: 1; min-width: 0")}>
                          <span style={sx("display: block; font-size: 13.5px; font-weight: 600")}>
                            {lr.name}
                          </span>
                          <span style={sx("display: block; font-size: 11.5px; color: rgba(22,36,26,.55)")}>
                            {lr.sub}
                          </span>
                        </span>
                        <button type="button" onClick={lr.remove} aria-label={v.tPmRemove} style={sx("width: 22px; height: 22px; border-radius: 999px; border: 0; background: rgba(22,36,26,.07); color: #16241a; font-size: 12px; line-height: 1; cursor: pointer; padding: 0")}>
                          ×
                        </button>
                      </label>
                  ))}
                </div>
              </div>
              </>
            ) : null}
            {v.pmNotPicker ? (
              <div style={sx("display: flex; flex-wrap: wrap; gap: 6px; max-height: 96px; overflow-y: auto")}>
                {list(v.pmChips).map((c, i1) => (
                    <span key={c.key ?? i1} style={sx("padding: 5px 12px; border-radius: 999px; background: #eef2ec; font-size: 13px")}>
                      {c.name}
                    </span>
                ))}
              </div>
            ) : null}
          </div>
          <label style={sx("display: grid; gap: 6px; font-size: 13.5px")}>
            {v.tPmTitle}
            <input type="text" required maxLength="80" value={v.pmTitle ?? ""} onChange={v.onPmTitle} placeholder={v.tPmTitlePh} style={sx("width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-a1x7" />
          </label>
          <label style={sx("display: grid; gap: 6px; font-size: 13.5px")}>
            {v.tPmText}
            <textarea required rows="4" maxLength="400" value={v.pmText ?? ""} onChange={v.onPmText} style={sx("width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none; resize: none; line-height: 1.5")} className="kza-a1x7" />
          </label>
        </div>
        <div style={sx("display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; padding: 16px 26px; border-top: 1px solid rgba(22,36,26,.1)")}>
          <button type="button" onClick={v.pmClose} style={sx("padding: 12px 20px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")}>
            {v.tCancelL}
          </button>
          <button type="submit" style={sx("padding: 12px 26px; border-radius: 999px; border: 0; background: #FFD23F; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")} className="kza-a1x10">
            {v.tPmSend}
          </button>
        </div>
      </form>
    </div>
  );
}
