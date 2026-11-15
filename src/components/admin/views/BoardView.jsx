import { sx, list } from "../adminRuntime";

// Medlemmer og lag › Styret: board meetings (Nov 2026 design: overview, minutes
// // with signing, agenda builder and calendar tabs).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function BoardView({ v }) {
  return (
    <div style={sx("margin-top: 4px; display: grid; gap: 16px")}>
      <div role="tablist" style={sx("display: flex; flex-wrap: wrap; gap: 4px; border-bottom: 1px solid rgba(22,36,26,.1)")}>
        {list(v.bdTabs).map((bt, i1) => (
            <button key={bt.key ?? i1} type="button" role="tab" aria-selected={bt.on} onClick={bt.pick} style={sx(bt.style)}>
              {bt.label}
            </button>
        ))}
      </div>
      {v.bdShowOverview ? (
        <div style={sx("display: grid; gap: 16px")}>
          <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; align-items: stretch")}>
            <div style={sx("position: relative; isolation: isolate; overflow: hidden; height: 100%; box-sizing: border-box; border-radius: 28px; background: linear-gradient(150deg, #16241a, #1d3a24 60%, #16241a); color: #f6f8f3; padding: 22px 24px")}>
              <div aria-hidden="true" style={sx("z-index: -1; position: absolute; right: -70px; top: -70px; width: 240px; height: 240px; border-radius: 999px; background: radial-gradient(circle, rgba(116,205,133,.42), rgba(116,205,133,0) 70%); filter: blur(16px); pointer-events: none")} />
              <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
                <span style={sx("width: 8px; height: 8px; border-radius: 999px; background: #74cd85; animation: kza-pulse 2.4s ease-in-out infinite")} />
                <span style={sx("font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: rgba(246,248,243,.72); flex: 1")}>
                  {v.tNextMeeting}
                </span>
                <span style={sx("padding: 5px 11px; border-radius: 999px; background: #a3e2ae; color: #16241a; font-size: 12px; font-weight: 700")}>
                  {v.nmCountdown}
                </span>
              </div>
              <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: clamp(22px, 2.6vw, 28px); margin: 12px 0 4px")}>
                {v.nmTitle}
              </h2>
              <div style={sx("font-size: 14px; color: rgba(246,248,243,.8)")}>
                {v.nmWhen}
              </div>
              <ol style={sx("margin: 14px 0 0; padding-left: 20px; display: grid; gap: 5px; font-size: 14.5px; line-height: 1.5; color: rgba(246,248,243,.9)")}>
                {list(v.nmAgenda).map((ag, i1) => (
                    <li key={ag.key ?? i1}>
                      {ag.text}
                    </li>
                ))}
              </ol>
              <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px")}>
                <a href={v.nmMailto} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 11px 18px; border-radius: 999px; background: #a3e2ae; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px")} className="kza-hi">
                  ✉ {v.tSendNotice}
                </a>
              </div>
            </div>
            <div style={sx("border-radius: 28px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 20px 22px; min-width: 0")}>
              <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 12px")}>
                <div role="tablist" aria-label={v.tMeetings} style={sx("flex: 1; min-width: 0; display: flex; flex-wrap: wrap; gap: 6px")}>
                  {list(v.bdListTabs).map((lt, i1) => (
                      <button key={lt.key ?? i1} type="button" role="tab" aria-selected={lt.on} onClick={lt.pick} style={sx(lt.style)}>
                        {lt.label}{" "}
                        <span style={sx(lt.countStyle)}>
                          {lt.count}
                        </span>
                      </button>
                  ))}
                </div>
                <button type="button" onClick={v.openMeetingForm} style={sx("padding: 10px 16px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .3s")} className="kza-ha">
                  {v.tNewMeeting}
                </button>
              </div>
              {v.bdListMeetings ? (
                <>
                  <input type="search" value={v.meetQ ?? ""} onChange={v.onMeetQ} placeholder={v.tMeetSearch} style={sx("width: 100%; box-sizing: border-box; margin-bottom: 12px; padding: 12px 18px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #f4f8f2; color: #16241a; font-family: var(--font-body); font-size: 14.5px; outline: none")} className="kza-f7" />
                  <div style={sx("display: grid; gap: 8px; max-height: 440px; overflow-y: auto; padding-right: 4px")}>
                  {v.meetSentShow ? (
                    <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; border-radius: 16px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.55); padding: 10px 14px; font-size: 13.5px")}>
                      <span style={sx("flex: 1; min-width: 0")}>
                        {v.meetSentText}
                      </span>
                      <a href={v.meetSentMailto} style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; color: #1f7a3a")}>
                        ✉ {v.tAlsoEmail}
                      </a>
                    </div>
                  ) : null}
                  {v.meetNone ? (
                    <div style={sx("font-size: 13.5px; color: rgba(22,36,26,.72)")}>
                      {v.tMeetNone}
                    </div>
                  ) : null}
                  {list(v.meetingRows).map((mt, i1) => (
                      <div key={mt.key ?? i1} role="button" tabIndex="0" onClick={mt.open} style={sx("display: grid; grid-template-columns: 52px minmax(0,1fr) auto; align-items: center; gap: 12px; border-radius: 18px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); padding: 10px 12px; cursor: pointer; transition: transform .2s, box-shadow .2s, border-color .2s")} className="kza-hj">
                        <span style={sx("text-align: center")}>
                          <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 19px")}>
                            {mt.day}
                          </span>
                          <span style={sx("display: block; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.7)")}>
                            {mt.mon}
                          </span>
                        </span>
                        <span style={sx("min-width: 0")}>
                          <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
                            {mt.title}
                          </span>
                          <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.72)")}>
                            {mt.meta}
                          </span>
                          {mt.hasHit ? (
                            <span style={sx("display: block; font-size: 12px; color: #1f7a3a; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                              {mt.hit}
                            </span>
                          ) : null}
                        </span>
                        {mt.hasMinutes ? (
                          <button type="button" onClick={mt.openMinutesOnly} style={sx("padding: 8px 14px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer; transition: background .3s")} className="kza-h3">
                            📄 {v.tMinutes}
                          </button>
                        ) : null}
                        {mt.upcoming ? (
                          <span style={sx("padding: 6px 12px; border-radius: 999px; background: rgba(116,205,133,.3); font-size: 12px; font-weight: 700")}>
                            {v.tPlanned}
                          </span>
                        ) : null}
                      </div>
                  ))}
                </div>
                </>
              ) : null}
              {v.bdListMembers ? (
                <div style={sx("max-height: 440px; overflow-y: auto")}>
                  <div style={sx("display: grid; gap: 8px")}>
                    {list(v.boardPeople).map((bp, i1) => (
                        <div key={bp.key ?? i1} style={sx("display: grid; grid-template-columns: 36px minmax(0,1fr) auto; align-items: center; gap: 10px")}>
                          <span style={sx("width: 36px; height: 36px; border-radius: 999px; background: #16241a; color: #f6f8f3; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 12px")}>
                            {bp.initials}
                          </span>
                          <span style={sx("min-width: 0")}>
                            <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
                              {bp.name}
                            </span>
                            <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.72)")}>
                              {bp.club}
                            </span>
                          </span>
                          <span style={sx(bp.roleStyle)}>
                            {bp.role}
                          </span>
                        </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {v.bdShowAgenda ? (
        <div style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 22px 24px; display: grid; gap: 16px")}>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: flex-start; gap: 10px 16px")}>
            <div style={sx("flex: 1; min-width: 220px")}>
              <h2 style={sx("margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 30px; letter-spacing: -.02em; color: #16241a")}>
                {v.agTitle2}
              </h2>
              <div style={sx("margin-top: 4px; font-size: 14px; color: rgba(22,36,26,.62)")}>
                {v.agMeta}
              </div>
            </div>
            <span style={sx(v.agStatusStyle)}>
              <span aria-hidden="true" style={sx(v.agStatusDot)} />
              {v.agStatus}
            </span>
          </div>
          <div style={sx("border-radius: 20px; border: 1px solid rgba(22,36,26,.12); padding: 16px 18px")}>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 6px")}>
              <b style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 16px")}>
                {v.tAgItems}
              </b>
              <span style={sx("font-size: 13px; color: rgba(22,36,26,.6)")}>
                {v.agTotal}
              </span>
              <button type="button" onClick={v.agToggleTpl} aria-expanded={v.agTplOpen} style={sx("padding: 8px 14px; border-radius: 10px; border: 1px solid #74cd85; background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-h3">
                {v.tAgFromTpl}
              </button>
            </div>
            {v.agTplOpen ? (
              <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 10px; padding: 12px; border-radius: 14px; background: #f4f8f2")}>
                {list(v.agTemplates).map((tp, i1) => (
                    <button key={tp.key ?? i1} type="button" onClick={tp.add} style={sx("padding: 7px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 13px; font-weight: 600; cursor: pointer")} className="kza-h8">
                      + {tp.title}{" "}
                      <span style={sx("color: rgba(22,36,26,.55); font-weight: 500")}>
                        · {tp.mins}
                      </span>
                    </button>
                ))}
              </div>
            ) : null}
            {list(v.agItems).map((ai, i1) => (
                <div key={ai.key ?? i1} style={sx("display: grid; grid-template-columns: 30px minmax(0, 1fr) auto auto; gap: 12px; align-items: center; padding: 11px 0; border-top: 1px solid rgba(22,36,26,.08)")}>
                  <span style={sx("width: 28px; height: 28px; border-radius: 8px; background: #eaf7ed; color: #1f7a3a; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 13px")}>
                    {ai.num}
                  </span>
                  <span style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-width: 0; font-size: 15px; color: #16241a")}>
                    {ai.title}
                    <button type="button" onClick={ai.toggleDec} title={v.tAgDecHint} style={sx(ai.decStyle)}>
                      <span aria-hidden="true" style={sx("width: 6px; height: 6px; border-radius: 999px; background: currentColor")} />
                      {v.tAgDecision}
                    </button>
                  </span>
                  <span style={sx("font-size: 13px; color: rgba(22,36,26,.6); white-space: nowrap")}>
                    {ai.mins}
                  </span>
                  <button type="button" onClick={ai.remove} aria-label={v.tAgRemove} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; color: #16241a; cursor: pointer; font-size: 14px; line-height: 1")} className="kza-hv">
                    ×
                  </button>
                </div>
            ))}
          </div>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px")}>
            {list(v.agFiles).map((af, i1) => (
                <span key={af.key ?? i1} style={sx("display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 10px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.08); font-size: 13px; color: #16241a")}>
                  <span aria-hidden="true">
                    📎
                  </span>
                  {af.name}
                </span>
            ))}
            <span style={sx("flex: 1")} />
            {v.agSentShow ? (
              <span style={sx("font-size: 13px; color: #1f7a3a; font-weight: 600")}>
                {v.agSentText}
              </span>
            ) : null}
            <button type="button" onClick={v.agPublish} disabled={!!v.agPublished} style={sx(v.agPublishStyle)}>
              {v.tAgPublish}
            </button>
          </div>
        </div>
      ) : null}
      {v.bdShowMinutes ? (
        <>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 14px")}>
          <span style={sx("font-size: 13px; font-weight: 700; color: rgba(22,36,26,.6); margin-right: 4px")}>
            {v.tPrPickMeet}
          </span>
          {list(v.prMeets).map((pm, i1) => (
              <button key={pm.key ?? i1} type="button" onClick={pm.pick} aria-pressed={pm.on} style={sx(pm.style)}>
                <span aria-hidden="true" style={sx(pm.dot)} />
                {pm.label}
              </button>
          ))}
        </div>
          <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, 1fr); gap: 18px; align-items: start")}>
          <article style={sx("border-radius: 18px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 24px 60px rgba(31,122,58,.10); padding: 24px 30px 30px; display: grid; gap: 14px; min-width: 0")}>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
              <div style={sx("flex: 1; font-size: 11.5px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #1f7a3a")}>
                {v.tPrKicker}
              </div>
              <span style={sx(v.prStatusStyle)}>
                {v.prStatus}
              </span>
              {v.prCanEdit ? (
                <div role="group" aria-label={v.tPrKicker} style={sx("display: inline-flex; padding: 3px; border-radius: 999px; background: #f1f3ef")}>
                  <button type="button" onClick={v.prViewMode} aria-pressed={v.prReading} style={sx(v.prReadStyle)}>
                    {v.tPrRead}
                  </button>
                  <button type="button" onClick={v.prEditMode} aria-pressed={v.prEditing} style={sx(v.prEditStyle)}>
                    ✎ {v.tPrEdit}
                  </button>
                </div>
              ) : null}
              {v.prLocked ? (
                <button type="button" onClick={v.prOpenPdf} style={sx("padding: 7px 14px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-h3">
                  📄 {v.tPrOpenPdf}
                </button>
              ) : null}
            </div>
            {v.prLocked ? (
              <div style={sx("display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 12px; background: #eaf7ed; border: 1px solid #a3e2ae; font-size: 13px; color: #16241a")}>
                <span aria-hidden="true">
                  🔒
                </span>
                {v.tPrLockedNote}
              </div>
            ) : null}
            {v.prEditing ? (
              <>
                <textarea rows="18" value={v.prText ?? ""} onChange={v.onPrText} aria-label={v.tPrKicker} style={sx("width: 100%; box-sizing: border-box; padding: 14px 16px; border-radius: 12px; border: 1px solid rgba(22,36,26,.18); background: #fbfcfa; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; line-height: 1.6; color: #16241a; resize: vertical; outline: none")} className="kza-f7" />
                <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px")}>
                <span style={sx("flex: 1; min-width: 180px; font-size: 12.5px; color: rgba(22,36,26,.62)")}>
                  {v.prEditHint}
                </span>
                <button type="button" onClick={v.prReset} style={sx("padding: 8px 13px; border-radius: 999px; border: 1px dashed rgba(31,122,58,.6); background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")}>
                  {v.tPrReset}
                </button>
                <button type="button" onClick={v.prViewMode} style={sx("padding: 8px 15px; border-radius: 999px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")}>
                  {v.tPrDoneEdit}
                </button>
              </div>
              </>
            ) : null}
            {v.prReading ? (
              <div style={sx("display: grid; gap: 4px; min-width: 0")}>
                {list(v.prLines).map((pz, i1) => (
                    <div key={pz.key ?? i1} style={sx(pz.style)}>
                      {pz.text}
                    </div>
                ))}
              </div>
            ) : null}
            <div style={sx("display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 10px")}>
              {list(v.prSigs).map((sg, i1) => (
                  <div key={sg.key ?? i1} style={sx("min-width: 0")}>
                    <div style={sx(sg.lineStyle)}>
                      {sg.mark}
                    </div>
                    <div style={sx("margin-top: 6px; font-size: 12px; color: rgba(22,36,26,.6); white-space: nowrap; overflow: hidden; text-overflow: ellipsis")}>
                      {sg.name}
                    </div>
                  </div>
              ))}
            </div>
          </article>
          <div style={sx("border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 18px 44px rgba(22,36,26,.08); padding: 22px; display: grid; gap: 12px")}>
            <div>
              <h3 style={sx("margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 22px; color: #16241a")}>
                {v.tPrSign}
              </h3>
              <div style={sx("margin-top: 4px; font-size: 14px; color: rgba(22,36,26,.62)")}>
                {v.tPrWho}
              </div>
            </div>
            <div role="radiogroup" aria-label={v.tPrWho} style={sx("display: grid; gap: 8px")}>
              {list(v.prOpts).map((po, i1) => (
                  <button key={po.key ?? i1} type="button" role="radio" aria-checked={po.on} onClick={po.pick} style={sx(po.style)}>
                    <span aria-hidden="true" style={sx(po.ring)}>
                      <span style={sx(po.dot)} />
                    </span>
                    {po.label}
                  </button>
              ))}
            </div>
            {v.prPickOpen ? (
              <div style={sx("display: grid; gap: 4px; padding: 10px 12px; border-radius: 12px; background: #f4f8f2")}>
                {list(v.prPeople).map((pp, i1) => (
                    <label key={pp.key ?? i1} style={sx("display: flex; align-items: center; gap: 10px; padding: 5px 2px; font-size: 14px; cursor: pointer")}>
                      <input type="checkbox" checked={!!pp.on} onChange={pp.toggle} style={sx("width: 18px; height: 18px; accent-color: #1f7a3a; margin: 0")} />
                      {pp.name}{" "}
                      <span style={sx("color: rgba(22,36,26,.55); font-size: 12.5px")}>
                        {pp.role}
                      </span>
                    </label>
                ))}
              </div>
            ) : null}
            <label style={sx("display: flex; align-items: flex-start; gap: 10px; font-size: 14px; line-height: 1.45; cursor: pointer; margin-top: 2px")}>
              <input type="checkbox" checked={!!v.prSendAll} onChange={v.prToggleSendAll} style={sx("width: 18px; height: 18px; accent-color: #1f7a3a; margin: 2px 0 0")} />
              {v.tPrSendAll}
            </label>
            <button type="button" onClick={v.prSend} disabled={!!v.prSendDisabled} style={sx(v.prSendStyle)}>
              {v.tPrSendBtn}
            </button>
            {v.prSentShow ? (
              <div style={sx("border-radius: 16px; border: 1px solid rgba(22,36,26,.12); padding: 14px 16px; display: grid; gap: 2px")}>
                <div style={sx("display: flex; align-items: center; gap: 10px; padding-bottom: 8px")}>
                  <b style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
                    {v.tPrSigners}
                  </b>
                  <span style={sx(v.prOverallStyle)}>
                    {v.prOverall}
                  </span>
                </div>
                {list(v.prSigners).map((sr, i1) => (
                    <div key={sr.key ?? i1} style={sx("display: flex; align-items: center; gap: 12px; padding: 9px 0; border-top: 1px solid rgba(22,36,26,.08)")}>
                      <span aria-hidden="true" style={sx(sr.avStyle)}>
                        {sr.ini}
                      </span>
                      <span style={sx("flex: 1; min-width: 0")}>
                        <span style={sx("display: block; font-size: 14.5px; font-weight: 600; color: #16241a")}>
                          {sr.name}
                        </span>
                        <span style={sx("display: block; font-size: 12px; color: rgba(22,36,26,.55)")}>
                          {sr.role}
                        </span>
                      </span>
                      <span style={sx(sr.pillStyle)}>
                        <span aria-hidden="true" style={sx(sr.dotStyle)} />
                        {sr.status}
                      </span>
                    </div>
                ))}
                <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding-top: 10px; border-top: 1px solid rgba(22,36,26,.08)")}>
                  <span style={sx("flex: 1; font-size: 13px; color: rgba(22,36,26,.7)")}>
                    {v.prSentHead} {v.prSentSub}
                  </span>
                  <button type="button" onClick={v.prSimulate} style={sx("padding: 7px 12px; border-radius: 999px; border: 1px dashed rgba(31,122,58,.6); background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")}>
                    {v.tPrSimulate}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        </>
      ) : null}
      {v.bdShowCal ? (
        <div style={sx("display: grid; gap: 16px")}>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px")}>
            <div style={sx("flex: 1; min-width: 220px")}>
              <h2 style={sx("margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 30px; letter-spacing: -.02em; color: #16241a")}>
                {v.tBdCal}
              </h2>
              <div style={sx("margin-top: 4px; font-size: 14px; color: rgba(22,36,26,.62)")}>
                {v.bdQLabel}
              </div>
            </div>
            <button type="button" onClick={v.bdQPrev} aria-label={v.tBdPrevQ} style={sx("width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; cursor: pointer; display: grid; place-items: center")} className="kza-h6">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={v.bdQNow} style={sx(v.bdQNowStyle)}>
              {v.tBdThisQ}
            </button>
            <button type="button" onClick={v.bdQNext} aria-label={v.tBdNextQ} style={sx("width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; cursor: pointer; display: grid; place-items: center")} className="kza-h6">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div data-rsp="stack" style={sx("display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(260px, 1.25fr); gap: 14px; align-items: stretch")}>
            {list(v.bdMonths).map((mo, i1) => (
                <div key={mo.key ?? i1} style={sx("min-height: max(280px, calc(100vh - 420px)); border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 16px 14px; display: flex; flex-direction: column; gap: 10px; box-sizing: border-box")}>
                  <b style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px")}>
                    {mo.name}
                  </b>
                  {list(mo.items).map((mi, i2) => (
                      <button key={mi.key ?? i2} type="button" onClick={mi.open} style={sx(mi.style)} className="kza-hu">
                        <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14px; color: #1f7a3a")}>
                          {mi.date}
                        </span>
                        <span style={sx("display: block; margin-top: 2px; font-size: 14px; font-weight: 600; color: #16241a")}>
                          {mi.title}
                        </span>
                        <span style={sx(mi.chipStyle)}>
                          <span aria-hidden="true" style={sx(mi.dotStyle)} />
                          {mi.status}
                        </span>
                      </button>
                  ))}
                  {mo.empty ? (
                    <span style={sx("font-size: 13px; color: rgba(22,36,26,.5)")}>
                      {v.tBdNoMeet}
                    </span>
                  ) : null}
                </div>
            ))}
            <div style={sx("border-radius: 20px; background: #f4f8f2; border: 1px solid rgba(116,205,133,.45); padding: 18px; display: flex; flex-direction: column; gap: 10px; box-sizing: border-box")}>
              <b style={sx("display: flex; align-items: center; gap: 8px; font-family: var(--font-heading); font-weight: 800; font-size: 16px")}>
                <span aria-hidden="true">
                  ✨
                </span>
                {v.tBdPlanTitle}
              </b>
              <div style={sx("font-size: 13px; color: rgba(22,36,26,.65); line-height: 1.45")}>
                {v.tBdPlanSub}
              </div>
              <div style={sx("display: grid; gap: 7px; margin-top: 4px")}>
                {list(v.bdPlan).map((pl, i1) => (
                    <div key={pl.key ?? i1} style={sx("display: flex; align-items: center; gap: 10px; font-size: 14px")}>
                      <span aria-hidden="true" style={sx("flex: 0 0 auto; width: 26px; height: 26px; border-radius: 8px; background: #ffffff; border: 1px solid rgba(116,205,133,.45); display: grid; place-items: center; font-size: 13px")}>
                        📅
                      </span>
                      <span style={sx("flex: 1; min-width: 0")}>
                        {pl.title}
                      </span>
                      <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.55); white-space: nowrap")}>
                        {pl.when}
                      </span>
                    </div>
                ))}
              </div>
              <span style={sx("flex: 1")} />
              <button type="button" onClick={v.bdAddPlan} disabled={!!v.bdPlanAdded} style={sx(v.bdAddStyle)}>
                {v.tBdAddPlan}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
