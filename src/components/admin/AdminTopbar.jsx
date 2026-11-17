import { sx, list } from "./adminRuntime";
import { designHref } from "../../lib/routes";

// [design 17 Nov] Slim sticky top bar above the band: breadcrumb
// ("Kretz / section / page"), a feedback link, help, and a notification bell
// with an unread badge and a drop-down list. Below 640px only the current
// page, help and the bell remain (see admin.css).
const iconBtn =
  "width: 36px; height: 36px; display: grid; place-items: center; border-radius: 10px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; cursor: pointer; padding: 0; position: relative; text-decoration: none";

export default function AdminTopbar({ v }) {
  const current = v.tbCurrent ?? v.crumbCurrent;
  return (
    <div data-kza-topbar="" style={sx("position: sticky; top: 0; z-index: 30; height: 56px; box-sizing: border-box; display: flex; align-items: center; gap: 12px; padding: 0 24px; background: rgba(246,248,243,.94); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(22,36,26,.1)")}>
      <nav aria-label={v.tCrumbLabel} style={sx("flex: 1; min-width: 0; display: flex; align-items: center; gap: 10px; font-size: 14.5px; white-space: nowrap; overflow: hidden")}>
        <button type="button" onClick={v.tbHome ?? v.goHome} style={sx("padding: 0; border: 0; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 14.5px; color: rgba(22,36,26,.72)")} className="kza-d17a">
          Kretz
        </button>
        {v.crumbParent ? (
          <>
            <span aria-hidden="true" style={sx("color: rgba(22,36,26,.4)")}>/</span>
            <span style={sx("color: rgba(22,36,26,.72); overflow: hidden; text-overflow: ellipsis")}>{v.crumbParent}</span>
          </>
        ) : null}
        <span aria-hidden="true" style={sx("color: rgba(22,36,26,.4)")}>/</span>
        <span aria-current="page" style={sx("font-weight: 700; color: #16241a; overflow: hidden; text-overflow: ellipsis")}>{current}</span>
      </nav>
      <a href={designHref(v.pfmFeedbackHref)} data-kza-tbtext="" style={sx("display: inline-flex; align-items: center; height: 36px; box-sizing: border-box; padding: 0 16px; border-radius: 10px; border: 1px solid rgba(22,36,26,.3); background: #ffffff; color: #16241a; font-size: 13.5px; font-weight: 600; text-decoration: none; white-space: nowrap")} className="kza-h6">
        {v.tTbFeedback}
      </a>
      <a href={designHref(v.pfmHelpHref)} aria-label={v.tPfmHelp} title={v.tPfmHelp} style={sx(iconBtn)} className="kza-h6">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5h.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <span style={sx("position: relative")}>
        <button type="button" onClick={v.tbBellToggle} aria-label={v.tTbBell} title={v.tTbBell} aria-expanded={!!v.tbBellOpen} style={sx(iconBtn)} className="kza-h6">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {v.tbUnreadAny ? (
            <span style={sx("position: absolute; top: -5px; right: -5px; min-width: 17px; height: 17px; padding: 0 4px; box-sizing: border-box; border-radius: 999px; background: #c9363f; color: #ffffff; font-size: 10.5px; font-weight: 700; display: grid; place-items: center")}>
              {v.tbUnread}
            </span>
          ) : null}
        </button>
        {v.tbBellOpen ? (
          <>
            <div onClick={v.tbBellToggle} style={sx("position: fixed; inset: 0; z-index: 60")} />
            <div style={sx("position: absolute; right: 0; top: calc(100% + 8px); z-index: 61; border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 20px 48px rgba(22,36,26,.18); width: 340px; max-width: calc(100vw - 24px); padding: 8px; display: grid; gap: 2px")}>
              <div style={sx("display: flex; align-items: center; gap: 8px; padding: 8px 10px 10px")}>
                <b style={sx("flex: 1; font-family: var(--font-heading); font-weight: 800; font-size: 16px")}>{v.tTbBell}</b>
                <button type="button" onClick={v.tbReadAll} style={sx("padding: 4px 10px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; font-size: 12px; font-weight: 600; cursor: pointer; color: #16241a")}>
                  {v.tTbReadAll}
                </button>
              </div>
              {list(v.tbNotes).map((nt, i) => (
                <button key={nt.key ?? i} type="button" onClick={nt.go} style={sx(nt.style)} className="kza-h6">
                  <span style={sx(nt.dot)} />
                  <span style={sx("flex: 1; min-width: 0")}>
                    <span style={sx("display: block; font-size: 13.5px; font-weight: 600")}>{nt.title}</span>
                    <span style={sx("display: block; margin-top: 2px; font-size: 12px; color: rgba(22,36,26,.6)")}>{nt.meta}</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </span>
    </div>
  );
}
