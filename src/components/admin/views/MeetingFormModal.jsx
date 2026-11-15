import { sx, list } from "../adminRuntime";

// New/edit board meeting form (Nov 2026 design: agenda items, templates,
// // place picker, attendee search, minutes text).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function MeetingFormModal({ v }) {
  return (
    <div data-rsp-modal="" style={sx("position: fixed; inset: 0; z-index: 97; display: grid; place-items: center; padding: 24px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)")}>
      <form onSubmit={v.saveMeeting} style={sx("width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto; border-radius: 28px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 32px 80px rgba(22,36,26,.32); padding: 26px 28px; box-sizing: border-box; display: grid; gap: 12px")}>
        <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 22px; margin: 0")}>
          {v.tNewMeetingTitle}
        </h3>
        <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 10px")}>
          <label style={sx(v.nsLabel)}>
            {v.tMfDate}
            <input type="date" required value={v.mfDate ?? ""} onChange={v.onMfDate} style={sx(v.inputStyle)} />
          </label>
          <label style={sx(v.nsLabel)}>
            {v.tMfTime}
            <input type="time" required value={v.mfTime ?? ""} onChange={v.onMfTime} style={sx(v.inputStyle)} />
          </label>
        </div>
        <div style={sx("display: grid; gap: 6px; position: relative")}>
          <label htmlFor="mf-place" style={sx(v.nsLabel)}>
            {v.tMfPlace}
          </label>
          <div style={sx("display: flex; gap: 6px")}>
            <input id="mf-place" type="text" required autoComplete="off" value={v.mfPlace ?? ""} onChange={v.onMfPlace} onFocus={v.mfPlaceOpenFn} placeholder={v.tMfPlacePh} style={sx(v.inputStyle)} />
            <button type="button" onClick={v.mfPlaceToggle} aria-label={v.tMfPlaceAll} aria-expanded={v.mfPlaceOpen} style={sx("flex: 0 0 auto; width: 44px; border-radius: 12px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; cursor: pointer; display: grid; place-items: center")}>
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {v.mfPlaceOpen ? (
            <div role="listbox" style={sx("position: absolute; left: 0; right: 0; top: 100%; z-index: 5; margin-top: 4px; max-height: 220px; overflow-y: auto; border-radius: 14px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 18px 40px rgba(22,36,26,.16); padding: 6px")}>
              {list(v.mfPlaceList).map((pl, i1) => (
                  <button key={pl.key ?? i1} type="button" role="option" onClick={pl.pick} style={sx(pl.style)} className="kza-h6">
                    {pl.label}
                  </button>
              ))}
              {v.mfPlaceCanAdd ? (
                <button type="button" onClick={v.mfPlaceAdd} style={sx("display: block; width: 100%; text-align: left; padding: 10px 12px; border-radius: 10px; border: 0; border-top: 1px solid rgba(22,36,26,.08); background: transparent; color: #1f7a3a; font-family: var(--font-body); font-size: 14px; font-weight: 700; cursor: pointer")} className="kza-h3">
                  {v.mfPlaceAddLabel}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
        <div style={sx("border-radius: 18px; border: 1px solid rgba(22,36,26,.12); padding: 14px 16px")}>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 4px")}>
            <b style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
              {v.tMfItems}
            </b>
            <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.6)")}>
              {v.mfItemsTotal}
            </span>
            <button type="button" onClick={v.mfToggleTpl} style={sx("padding: 7px 12px; border-radius: 10px; border: 1px solid #74cd85; background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-h3">
              {v.tAgFromTpl}
            </button>
          </div>
          {v.mfTplOpen ? (
            <div style={sx("display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; padding: 10px; border-radius: 12px; background: #f4f8f2")}>
              {list(v.mfTemplates).map((tp, i1) => (
                  <button key={tp.key ?? i1} type="button" onClick={tp.add} style={sx("padding: 6px 11px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 12.5px; font-weight: 600; cursor: pointer")} className="kza-hu">
                    + {tp.title}{" "}
                    <span style={sx("color: rgba(22,36,26,.55); font-weight: 500")}>
                      · {tp.mins}
                    </span>
                  </button>
              ))}
            </div>
          ) : null}
          {list(v.mfItems).map((ai, i1) => (
              <div key={ai.key ?? i1} style={sx("display: grid; grid-template-columns: 28px minmax(0, 1fr) auto auto; gap: 10px; align-items: center; padding: 9px 0; border-top: 1px solid rgba(22,36,26,.08)")}>
                <span style={sx("width: 26px; height: 26px; border-radius: 8px; background: #eaf7ed; color: #1f7a3a; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px")}>
                  {ai.num}
                </span>
                <span style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-width: 0; font-size: 14px")}>
                  {ai.title}
                  <button type="button" onClick={ai.toggleDec} style={sx(ai.decStyle)}>
                    <span aria-hidden="true" style={sx("width: 6px; height: 6px; border-radius: 999px; background: currentColor")} />
                    {v.tAgDecision}
                  </button>
                </span>
                <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.6); white-space: nowrap")}>
                  {ai.mins}
                </span>
                <button type="button" onClick={ai.remove} aria-label={v.tAgRemove} style={sx("width: 26px; height: 26px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; color: #16241a; cursor: pointer; font-size: 13px; line-height: 1")} className="kza-hv">
                  ×
                </button>
              </div>
          ))}
          <div style={sx("display: flex; gap: 6px; margin-top: 8px")}>
            <input type="text" value={v.mfNewItem ?? ""} onChange={v.onMfNewItem} onKeyDown={v.mfNewItemKey} placeholder={v.tMfNewItemPh} aria-label={v.tMfNewItemPh} style={sx("flex: 1; min-width: 0; box-sizing: border-box; padding: 10px 14px; border-radius: 10px; border: 1px dashed rgba(22,36,26,.25); background: #ffffff; font-family: var(--font-body); font-size: 14px; color: #16241a; outline: none")} />
            <button type="button" onClick={v.mfAddItem} style={sx("padding: 0 14px; border-radius: 10px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")}>
              {v.tMfAddItem}
            </button>
          </div>
        </div>
        <div style={sx("display: grid; gap: 8px")}>
          <div style={sx("display: flex; align-items: baseline; gap: 8px")}>
            <span style={sx(v.nsLabel)}>
              {v.tMfInvite}
            </span>
            <span style={sx("position: relative; flex: 1; min-width: 160px")}>
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={sx("position: absolute; left: 11px; top: 10px")}>
                <circle cx="11" cy="11" r="7" fill="none" stroke="#4C5E50" strokeWidth="2" />
                <path d="M20 20l-4-4" stroke="#4C5E50" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input type="search" value={v.mfQ ?? ""} onChange={v.onMfQ} placeholder={v.tMfSearchPh} aria-label={v.tMfSearchPh} style={sx("width: 100%; box-sizing: border-box; padding: 7px 12px 7px 32px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #f4f8f2; font-family: var(--font-body); font-size: 13px; color: #16241a; outline: none")} className="kza-f7" />
              {v.mfHasResults ? (
                <div role="listbox" style={sx("position: absolute; left: 0; right: 0; top: 100%; z-index: 6; margin-top: 4px; border-radius: 14px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); box-shadow: 0 18px 40px rgba(22,36,26,.16); padding: 6px")}>
                  {list(v.mfResults).map((rs, i1) => (
                      <button key={rs.key ?? i1} type="button" role="option" onClick={rs.add} style={sx("display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 8px 10px; border-radius: 10px; border: 0; background: transparent; cursor: pointer; font-family: var(--font-body)")} className="kza-h6">
                        <span aria-hidden="true" style={sx("width: 28px; height: 28px; border-radius: 999px; background: #16241a; color: #f6f8f3; display: grid; place-items: center; font-size: 10.5px; font-weight: 700")}>
                          {rs.ini}
                        </span>
                        <span style={sx("flex: 1; min-width: 0")}>
                          <b style={sx("display: block; font-size: 13.5px; color: #16241a")}>
                            {rs.name}
                          </b>
                          <span style={sx("display: block; font-size: 12px; color: rgba(22,36,26,.6)")}>
                            {rs.sub}
                          </span>
                        </span>
                        <span style={sx("font-size: 12px; font-weight: 700; color: #1f7a3a")}>
                          + {v.tMfInviteOne}
                        </span>
                      </button>
                  ))}
                </div>
              ) : null}
              {v.mfNoResults ? (
                <div style={sx("position: absolute; left: 0; right: 0; top: 100%; z-index: 6; margin-top: 4px; border-radius: 12px; background: #ffffff; border: 1px solid rgba(22,36,26,.14); padding: 10px 12px; font-size: 13px; color: rgba(22,36,26,.65)")}>
                  {v.tMfNoResults}
                </div>
              ) : null}
            </span>
            <button type="button" onClick={v.mfPickBoard} style={sx("padding: 5px 11px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 11.5px; cursor: pointer")}>
              {v.tMfWholeBoard}
            </button>
            <button type="button" onClick={v.mfPickNone} style={sx("padding: 5px 11px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 11.5px; cursor: pointer")}>
              {v.tMfNone}
            </button>
          </div>
          <div style={sx("display: flex; flex-wrap: wrap; gap: 6px; max-height: 150px; overflow-y: auto")}>
            {list(v.mfPeople).map((pp, i1) => (
                <button key={pp.key ?? i1} type="button" onClick={pp.toggle} style={sx(pp.style)}>
                  {pp.label}
                </button>
            ))}
          </div>
          <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.72)")}>
            {v.mfInviteCount}
          </span>
        </div>
        <div style={sx("display: grid; gap: 6px")}>
          <span style={sx("font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.72)")}>
            {v.tAttachLabel}
          </span>
          <div style={sx("border-radius: 14px; border: 1px solid rgba(116,205,133,.45); background: #f4f8f2; padding: 10px 12px; display: grid; gap: 8px")}>
            <div style={sx("display: grid; grid-template-columns: 34px minmax(0, 1fr) auto auto; gap: 10px; align-items: center")}>
              <span style={sx("width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; font-size: 10px; font-weight: 800; background: #16241a; color: #a3e2ae")}>
                PROT
              </span>
              <span style={sx("min-width: 0")}>
                <span style={sx("display: block; font-size: 13px; font-weight: 600")}>
                  {v.mfProtoName}
                </span>
                <span style={sx("display: block; font-size: 11.5px; color: rgba(22,36,26,.65)")}>
                  {v.mfProtoMeta}
                </span>
              </span>
              <button type="button" onClick={v.mfProtoToggle} aria-expanded={v.mfProtoOpen} style={sx("padding: 7px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer")} className="kza-h3">
                {v.tMfProtoEdit}
              </button>
              <button type="button" onClick={v.mfProtoToggleOn} aria-label={v.tMfProtoIncl} title={v.tMfProtoIncl} style={sx(v.mfProtoInclStyle)}>
                {v.mfProtoInclMark}
              </button>
            </div>
            {v.mfProtoOpen ? (
              <>
                <textarea rows="10" value={v.mfProtoText ?? ""} onChange={v.onMfProto} aria-label={v.mfProtoName} style={sx("width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 12px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; line-height: 1.55; color: #16241a; resize: vertical")} />
                <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px")}>
                <span style={sx("flex: 1; font-size: 12px; color: rgba(22,36,26,.6)")}>
                  {v.tMfProtoHint}
                </span>
                <button type="button" onClick={v.mfProtoReset} style={sx("padding: 6px 11px; border-radius: 999px; border: 1px dashed rgba(31,122,58,.6); background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 11.5px; cursor: pointer")}>
                  {v.tMfProtoReset}
                </button>
              </div>
              </>
            ) : null}
          </div>
          {list(v.mfFileRows).map((af, i1) => (
              <div key={af.key ?? i1} style={sx("display: grid; grid-template-columns: 34px minmax(0,1fr) 28px; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 14px; background: #f7f9f5; border: 1px solid rgba(22,36,26,.1)")}>
                <span style={sx(af.iconStyle)}>
                  {af.ext}
                </span>
                <span style={sx("min-width: 0")}>
                  <span style={sx("display: block; font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                    {af.name}
                  </span>
                  <span style={sx("display: block; font-size: 11.5px; color: rgba(22,36,26,.7)")}>
                    {af.meta}
                  </span>
                </span>
                <button type="button" onClick={af.remove} aria-label={v.tRemoveFile} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: rgba(22,36,26,.7); font-size: 14px; cursor: pointer")}>
                  ×
                </button>
              </div>
          ))}
          <label style={sx("position: relative; display: inline-flex; justify-self: start; align-items: center; gap: 8px; padding: 9px 15px; border-radius: 999px; border: 1px dashed rgba(31,122,58,.55); background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-h3">
            📎 {v.tAttachAdd}
            <input type="file" multiple accept=".pdf,application/pdf,.xls,.xlsx,.csv,.doc,.docx,image/*" onChange={v.onMfFiles} style={sx("position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none")} />
          </label>
          <span style={sx("font-size: 11.5px; color: rgba(22,36,26,.65)")}>
            {v.tAttachTypes}
          </span>
        </div>
        <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px")}>
          <button type="submit" style={sx("padding: 12px 22px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")} className="kza-ha">
            {v.tMfSave}
          </button>
          {v.mfSentShow ? (
            <a href={v.mfSentMailto} style={sx("align-self: center; font-size: 13px; color: #1f7a3a; text-decoration: underline")}>
              {v.tMfMailToo}
            </a>
          ) : null}
          <button type="button" onClick={v.closeMeetingForm} style={sx("padding: 12px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer")}>
            {v.tNoCancel}
          </button>
        </div>
      </form>
    </div>
  );
}
