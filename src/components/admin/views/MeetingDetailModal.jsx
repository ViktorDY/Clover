import { sx, list } from "../adminRuntime";

// Board meeting details dialog.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function MeetingDetailModal({ v }) {
  return (
    <div data-rsp-modal="" onClick={v.mdCloseBg} style={sx("position: fixed; inset: 0; z-index: 96; display: grid; place-items: center; padding: 24px; background: rgba(22,36,26,.5); backdrop-filter: blur(8px)")}>
      <article style={sx("width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto; border-radius: 30px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 32px 80px rgba(22,36,26,.32); padding: 26px 28px; box-sizing: border-box; position: relative")}>
        <button type="button" onClick={v.mdClose} aria-label={v.tClose} style={sx("position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; color: #16241a; font-size: 16px; cursor: pointer")}>
          ×
        </button>
        <div style={sx("font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #1f7a3a")}>
          {v.mdKicker}
        </div>
        <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 24px; margin: 6px 40px 4px 0")}>
          {v.mdTitle}
        </h3>
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
          <span style={sx("flex: 1; font-size: 14px; color: rgba(22,36,26,.75)")}>
            {v.mdWhen}
          </span>
          <button type="button" onClick={v.mdToProto} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")} className="kza-ha">
            📄 {v.tMdToProto}{" "}
            <span style={sx(v.mdProtoPill)}>
              {v.mdProtoState}
            </span>
          </button>
        </div>
        <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 20px; margin-top: 18px; align-items: start")}>
          <div style={sx("min-width: 0")}>
            <div style={sx("display: flex; align-items: baseline; gap: 8px")}>
              <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 0; flex: 1")}>
                {v.mdTAttendance}
              </h4>
              <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.75)")}>
                {v.mdCounts}
              </span>
            </div>
            <div style={sx("position: relative; width: 100%; max-width: 340px; aspect-ratio: 1 / 1; margin: 12px auto 0")}>
              <div style={sx("position: absolute; left: 50%; top: 50%; width: 44%; height: 44%; transform: translate(-50%, -50%); border-radius: 999px; background: radial-gradient(circle at 35% 30%, #3f9a58, #1d3a24 70%); box-shadow: inset 0 -8px 18px rgba(0,0,0,.25), 0 14px 30px rgba(22,36,26,.25); display: grid; place-items: center; text-align: center; color: #f6f8f3")}>
                <span>
                  <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 22px")}>
                    {v.mdYes}
                  </span>
                  <span style={sx("display: block; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #a3e2ae")}>
                    {v.tComing}
                  </span>
                </span>
              </div>
              {list(v.mdSeats).map((st, i1) => (
                  <div key={st.key ?? i1} title={st.tip} style={sx(st.style)}>
                    <span style={sx(st.avatarStyle)}>
                      {st.initials}
                    </span>
                    <span style={sx(st.badgeStyle)}>
                      {st.badge}
                    </span>
                    <span style={sx("position: absolute; left: 50%; top: calc(100% + 4px); transform: translateX(-50%); font-size: 11px; font-weight: 600; white-space: nowrap; color: rgba(22,36,26,.8)")}>
                      {st.first}
                    </span>
                  </div>
              ))}
            </div>
            <div style={sx("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 20px; font-size: 12.5px; color: rgba(22,36,26,.78)")}>
              <span style={sx("display: flex; align-items: center; gap: 6px")}>
                <span style={sx("width: 12px; height: 12px; border-radius: 999px; background: #1f7a3a")} />
                {v.tAccepted}
              </span>
              <span style={sx("display: flex; align-items: center; gap: 6px")}>
                <span style={sx("width: 12px; height: 12px; border-radius: 999px; background: #d9644f")} />
                {v.tDeclined}
              </span>
              <span style={sx("display: flex; align-items: center; gap: 6px")}>
                <span style={sx("width: 12px; height: 12px; border-radius: 999px; background: #b9bfb7")} />
                {v.tNoAnswer}
              </span>
            </div>
          </div>
          <div style={sx("min-width: 0")}>
            <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 0 0 10px")}>
              {v.tMeetingFiles}
            </h4>
            <div style={sx("display: grid; gap: 6px")}>
              {list(v.mdFiles).map((fl, i1) => (
                  <div key={fl.key ?? i1} style={sx("display: grid; grid-template-columns: 34px minmax(0,1fr) auto auto; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 14px; background: #f7f9f5; border: 1px solid rgba(22,36,26,.1)")}>
                    <span style={sx(fl.iconStyle)}>
                      {fl.ext}
                    </span>
                    <span style={sx("min-width: 0")}>
                      <span style={sx("display: block; font-size: 13.5px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                        {fl.name}
                      </span>
                      <span style={sx("display: block; font-size: 12px; color: rgba(22,36,26,.7)")}>
                        {fl.meta}
                      </span>
                    </span>
                    <button type="button" onClick={fl.open} style={sx("padding: 7px 13px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer")} className="kza-h3">
                      {v.tOpenFile}
                    </button>
                    <button type="button" onClick={fl.remove} aria-label={v.tRemoveFile} style={sx("width: 28px; height: 28px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: rgba(22,36,26,.7); font-size: 14px; cursor: pointer")}>
                      ×
                    </button>
                  </div>
              ))}
              {v.mdNoFiles ? (
                <div style={sx("font-size: 13px; color: rgba(22,36,26,.7)")}>
                  {v.tNoFiles}
                </div>
              ) : null}
              <label style={sx("position: relative; display: inline-flex; justify-self: start; align-items: center; gap: 8px; margin-top: 4px; padding: 9px 15px; border-radius: 999px; border: 1px dashed rgba(31,122,58,.55); background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-h3">
                ＋ {v.tAddMeetingFiles}
                <input type="file" multiple accept=".pdf,application/pdf,.xls,.xlsx,.csv,image/*" onChange={v.mdAddFiles} style={sx("position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none")} />
              </label>
              <div style={sx("font-size: 12px; color: rgba(22,36,26,.65)")}>
                {v.tFileTypes}
              </div>
            </div>
            <h4 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 18px 0 8px")}>
              {v.tAgenda}
            </h4>
            <ol style={sx("margin: 0; padding-left: 20px; display: grid; gap: 4px; font-size: 14px; line-height: 1.5; color: rgba(22,36,26,.85)")}>
              {list(v.mdAgenda).map((ag, i1) => (
                  <li key={ag.key ?? i1}>
                    {ag.text}
                  </li>
              ))}
            </ol>
          </div>
        </div>
      </article>
    </div>
  );
}
