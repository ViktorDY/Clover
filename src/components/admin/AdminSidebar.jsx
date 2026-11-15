import { Fragment, useState } from "react";
import { sx, list } from "./adminRuntime";
import { designHref } from "../../lib/routes";
import markAlpha from "../../assets/design/kretz-mark-alpha.png";

// Sidebar on desktop (Nov 2026 design): icon + label navigation, a button
// that collapses it to an icons-only rail (v.toggleSide / data-mini on the
// root), and a "..." menu by the profile chip with help, feedback, support
// and log out. Below 1100px it becomes a sticky top bar with a menu button
// that folds the same navigation out underneath (see admin.css).
export default function AdminSidebar({ v }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Picking a page (anything but a section toggle) closes the phone menu.
  const closeOnPick = (e) => {
    if (!e.target.closest("[aria-haspopup]")) setMenuOpen(false);
  };

  return (
    <header data-kza-side="" data-kza-mopen={menuOpen ? "yes" : "no"} style={sx("position: fixed; left: 0; top: 0; bottom: 0; width: 240px; transition: width .3s cubic-bezier(.2,.7,.2,1); z-index: 40; backdrop-filter: blur(20px); background: #f5f7f1; border-right: 1px solid rgba(22,36,26,.1); overflow-x: hidden; overflow-y: auto; scrollbar-width: thin; box-sizing: border-box")}>
      <div data-kza-head="" style={sx("min-height: 100%; box-sizing: border-box; padding: 22px 16px 16px; display: flex; flex-direction: column; align-items: stretch; gap: 6px")}>
        <div className="kza-logo-row" style={sx("display: flex; align-items: center; justify-content: space-between; gap: 8px")}>
          <button type="button" className="kza-logo" onClick={v.goHome} style={sx("display: flex; align-items: center; gap: 10px; padding: 0; border: 0; background: transparent; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 20px; cursor: pointer; text-align: left")}>
            <img src={markAlpha} alt="Kretz" style={sx("width: 26px; height: 26px")} />
            <span className="kza-lbl">
              Kretz
            </span>
          </button>
          <button type="button" onClick={v.toggleSide} aria-label={v.tSideToggle} title={v.tSideToggle} aria-expanded={v.sideOpenAttr} style={sx("flex: 0 0 auto; width: 34px; height: 34px; border-radius: 10px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; color: #16241a; display: grid; place-items: center; cursor: pointer; padding: 0; transition: background .2s")} className="kza-collapse kza-a1x1">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9 4.5v15" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d={v.sideChevD} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <span className="kza-lbl" style={sx("align-self: flex-start; margin-top: 4px; padding: 6px 12px; border-radius: 999px; background: #1d3a24; color: #a3e2ae; font-family: var(--font-heading); font-weight: 800; font-size: 11px; letter-spacing: .1em; text-transform: uppercase")}>
          {v.tAdmin}
        </span>
        <div data-kza-gap="" style={sx("height: 18px")} />
        <div data-rsp-navlinks="" data-kza-nav="" id="kza-nav" onClick={closeOnPick} style={sx("display: flex; flex-direction: column; align-items: stretch; gap: 2px")}>
          {list(v.navTabs).map((n, i1) => (
            <Fragment key={n.key ?? i1}>
              {n.isMenu ? (
                <div style={sx("display: grid; gap: 2px")}>
                  <button type="button" data-act={n.act} onClick={n.pick} aria-haspopup="true" aria-expanded={n.open} title={n.label} style={sx(n.style)}>
                    <span className="kza-ic" aria-hidden="true" style={sx("flex: 0 0 auto; display: grid; place-items: center; width: 20px; height: 20px; margin-right: 10px")}>
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d={n.iconD} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="kza-lbl">
                      {n.label}
                    </span>
                    {" "}
                    <span className="kza-lbl" style={sx(`display: inline-block; margin-left: auto; font-size: 10px; transition: transform .3s; transform: ${n.chevron ?? ""}`)}>
                      ▾
                    </span>
                  </button>
                  {n.open ? (
                    <div className="kza-lbl" style={sx("display: grid; gap: 1px; margin: 0 0 4px 21px; padding-left: 8px; border-left: 2px solid rgba(116,205,133,.5)")}>
                      {list(n.items).map((it, i2) => (
                          <button key={it.key ?? i2} type="button" onClick={it.pick} style={sx(it.style)} className="kza-h0">
                            <span style={sx("display: block; font-family: var(--font-body); font-weight: 500; font-size: 13.5px")}>
                              {it.label}
                            </span>
                          </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {n.isPlain ? (
                <button type="button" data-act={n.act} onClick={n.pick} title={n.label} style={sx(n.style)}>
                  <span className="kza-ic" aria-hidden="true" style={sx("flex: 0 0 auto; display: grid; place-items: center; width: 20px; height: 20px; margin-right: 10px")}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d={n.iconD} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="kza-lbl">
                    {n.label}
                  </span>
                </button>
              ) : null}
            </Fragment>
          ))}
        </div>
        <div style={sx("flex: 1")} />
        <div data-kza-foot="" style={sx("position: relative; display: flex; align-items: center; gap: 4px; padding-top: 14px; border-top: 1px solid rgba(22,36,26,.1)")}>
          {v.pfmOpen ? (
            <>
            <div aria-hidden="true" onClick={v.pfmClose} style={sx("position: fixed; inset: 0; z-index: 1")} />
            <div role="menu" aria-label={v.tPfmMenu} style={sx("position: absolute; left: 0; right: 0; bottom: calc(100% + 6px); z-index: 2; padding: 6px; border-radius: 14px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 18px 44px rgba(22,36,26,.18)")}>
              <button role="menuitem" type="button" onClick={(e) => { setMenuOpen(false); v.pfmProfile(e); }} style={sx("display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; padding: 8px 10px; border-radius: 8px; border: 0; background: transparent; color: #16241a; font-family: var(--font-body); font-size: 14px; font-weight: 500; text-align: left; text-decoration: none; cursor: pointer")} className="kza-hg">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={sx("flex: 0 0 auto")}>
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {v.tMyProfile}
              </button>
              <div aria-hidden="true" style={sx("height: 1px; margin: 4px 6px; background: rgba(22,36,26,.1)")} />
              <a role="menuitem" href={designHref(v.pfmHelpHref)} onClick={v.pfmClose} style={sx("display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; padding: 8px 10px; border-radius: 8px; border: 0; background: transparent; color: #16241a; font-family: var(--font-body); font-size: 14px; font-weight: 500; text-align: left; text-decoration: none; cursor: pointer")} className="kza-hg">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={sx("flex: 0 0 auto")}>
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5h.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {v.tPfmHelp}
              </a>
              <a role="menuitem" href={designHref(v.pfmFeedbackHref)} onClick={v.pfmClose} style={sx("display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; padding: 8px 10px; border-radius: 8px; border: 0; background: transparent; color: #16241a; font-family: var(--font-body); font-size: 14px; font-weight: 500; text-align: left; text-decoration: none; cursor: pointer")} className="kza-hg">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={sx("flex: 0 0 auto")}>
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 15.5c1-1 2.2-1.5 3.5-1.5s2.5.5 3.5 1.5M9 9.5h.01M15 9.5h.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {v.tPfmFeedback}
              </a>
              <a role="menuitem" href={designHref(v.pfmSupportHref)} onClick={v.pfmClose} style={sx("display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; padding: 8px 10px; border-radius: 8px; border: 0; background: transparent; color: #16241a; font-family: var(--font-body); font-size: 14px; font-weight: 500; text-align: left; text-decoration: none; cursor: pointer")} className="kza-hg">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={sx("flex: 0 0 auto")}>
                  <path d="M5 3h14v18H5zM9 3v2h6V3M12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM8 18a4 4 0 0 1 8 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {v.tPfmSupport}
              </a>
              <div aria-hidden="true" style={sx("height: 1px; margin: 4px 6px; background: rgba(22,36,26,.1)")} />
              <a role="menuitem" href="#/" onClick={v.onLogOut} style={sx("display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; padding: 8px 10px; border-radius: 8px; border: 0; background: transparent; color: #16241a; font-family: var(--font-body); font-size: 14px; font-weight: 500; text-align: left; text-decoration: none; cursor: pointer")} className="kza-hg">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={sx("flex: 0 0 auto")}>
                  <path d="M12 3v8M6.4 6.6a8 8 0 1 0 11.2 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {v.tPfmLogout}
              </a>
            </div>
            </>
          ) : null}
          <button type="button" onClick={(e) => { setMenuOpen(false); v.goProfile(e); }} aria-label={v.tMyProfile} style={sx(v.profChipStyle)} className="kza-h1">
            <span style={sx(v.apAvatar38)}>
              {v.apAvatarText}
            </span>
            <span className="kza-lbl" style={sx("min-width: 0; flex: 1")}>
              <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14px")}>
                {v.firstName}
              </span>
              <span style={sx("display: block; font-size: 12px; color: rgba(22,36,26,.6)")}>
                {v.tMyProfile}
              </span>
            </span>
          </button>
          <button type="button" onClick={v.pfmToggle} aria-haspopup="menu" aria-expanded={v.pfmOpen} aria-label={v.tPfmMenu} title={v.tPfmMenu} style={sx(v.pfmDotsStyle)} className="kza-lbl kza-h1">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="5" cy="12" r="1.7" fill="currentColor" />
              <circle cx="12" cy="12" r="1.7" fill="currentColor" />
              <circle cx="19" cy="12" r="1.7" fill="currentColor" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          data-kza-burger=""
          aria-controls="kza-nav"
          aria-expanded={menuOpen}
          aria-label={v.tMenu}
          onClick={() => setMenuOpen((o) => !o)}
          className="hidden h-11 w-11 cursor-pointer place-items-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:bg-grass-tint"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
    </header>

  );
}
