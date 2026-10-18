import { Fragment, useState } from "react";
import { sx, list } from "./adminRuntime";
import markAlpha from "../../assets/design/kretz-mark-alpha.png";

// Sidebar on desktop. Below 1100px it collapses into a sticky top bar with a
// menu button that folds the same navigation out underneath (see admin.css).
export default function AdminSidebar({ v }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Picking a page (anything but a section toggle) closes the phone menu.
  const closeOnPick = (e) => {
    if (!e.target.closest("[aria-haspopup]")) setMenuOpen(false);
  };

  return (
    <header
      data-kza-side=""
      data-kza-mopen={menuOpen ? "yes" : "no"}
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        bottom: "0",
        width: "240px",
        zIndex: "40",
        backdropFilter: "blur(20px)",
        background: "#f5f7f1",
        borderRight: "1px solid rgba(22,36,26,.1)",
        overflowX: "hidden",
        overflowY: "auto",
        scrollbarWidth: "thin",
        boxSizing: "border-box",
      }}
    >
      <div
        data-kza-head=""
        style={{
          minHeight: "100%",
          boxSizing: "border-box",
          padding: "22px 16px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "6px",
        }}
      >
        <button
          type="button"
          onClick={v.goHome}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0",
            border: "0",
            background: "transparent",
            color: "#16241a",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "20px",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <img src={markAlpha} alt="Kretz" style={{ width: "26px", height: "26px" }} />
          {" Kretz "}
        </button>
        <span
          style={{
            alignSelf: "flex-start",
            marginTop: "4px",
            padding: "6px 12px",
            borderRadius: "999px",
            background: "#1d3a24",
            color: "#a3e2ae",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "11px",
            letterSpacing: ".1em",
            textTransform: "uppercase",
          }}
        >
          {v.tAdmin}
        </span>
        <div data-kza-gap="" style={{ height: "18px" }} />
        <div
          data-rsp-navlinks=""
          data-kza-nav=""
          id="kza-nav"
          onClick={closeOnPick}
          style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "6px" }}
        >
          {list(v.navTabs).map((n, i0) => (
            <Fragment key={n.key ?? i0}>
              {n.isMenu ? (
                <div style={{ display: "grid", gap: "4px" }}>
                  <button
                    type="button"
                    data-act={n.act}
                    onClick={n.pick}
                    aria-haspopup="true"
                    aria-expanded={n.open}
                    style={sx(n.style)}
                  >
                    {n.label}{" "}
                    <span
                      style={sx(
                        `display: inline-block; margin-left: auto; font-size: 11px; transition: transform .3s; transform: ${n.chevron ?? ""}`,
                      )}
                    >
                      ▾
                    </span>
                  </button>
                  {n.open ? (
                    <div
                      style={{
                        display: "grid",
                        gap: "2px",
                        margin: "0 0 6px 14px",
                        paddingLeft: "8px",
                        borderLeft: "2px solid rgba(116,205,133,.5)",
                      }}
                    >
                      {list(n.items).map((it, i1) => (
                        <button
                          key={it.key ?? i1}
                          type="button"
                          onClick={it.pick}
                          style={sx(it.style)}
                          className="kza-h0"
                        >
                          <span
                            style={{
                              display: "block",
                              fontFamily: "var(--font-heading)",
                              fontWeight: "800",
                              fontSize: "14px",
                            }}
                          >
                            {it.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {n.isPlain ? (
                <button type="button" data-act={n.act} onClick={n.pick} style={sx(n.style)}>
                  {n.label}
                </button>
              ) : null}
            </Fragment>
          ))}
        </div>
        <div style={{ flex: "1" }} />
        <div
          data-kza-foot=""
          style={{
            display: "grid",
            gap: "10px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(22,36,26,.1)",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              setMenuOpen(false);
              v.goProfile(e);
            }}
            aria-label={v.tMyProfile}
            style={sx(v.profChipStyle)}
            className="kza-h1"
          >
            <span style={sx(v.apAvatar38)}>{v.apAvatarText}</span>{" "}
            <span style={{ minWidth: "0", flex: "1" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                {v.firstName}
              </span>
              <span style={{ display: "block", fontSize: "12px", color: "rgba(22,36,26,.6)" }}>
                {v.tMyProfile}
              </span>
            </span>
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
