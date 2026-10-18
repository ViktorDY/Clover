import { sx, list } from "./adminRuntime";

export default function AdminBand({ v }) {
  return (
    <div
      style={sx(
        `position: relative; z-index: 6; isolation: isolate; overflow-x: clip; overflow-y: visible; background: ${v.bandBg ?? ""}; color: ${v.bandInk ?? ""}`,
      )}
    >
      <div
        aria-hidden="true"
        style={sx(
          `z-index: -1; position: absolute; left: -150px; top: -170px; width: 620px; height: 620px; border-radius: 999px; background: radial-gradient(circle, rgba(116,205,133,.4), rgba(116,205,133,0) 68%); filter: blur(38px); pointer-events: none; opacity: ${v.bandDecor ?? ""}`,
        )}
      />
      <div
        aria-hidden="true"
        style={sx(
          `z-index: -1; position: absolute; right: -110px; top: -80px; width: 420px; height: 420px; border-radius: 999px; background: radial-gradient(circle, rgba(255,201,74,.24), rgba(255,201,74,0) 70%); filter: blur(30px); pointer-events: none; opacity: ${v.bandDecor ?? ""}`,
        )}
      />
      <div
        aria-hidden="true"
        style={sx(
          `z-index: -1; position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(rgba(238,243,236,.16) 1.3px, transparent 1.3px); background-size: 28px 28px; mask-image: radial-gradient(70% 90% at 28% 8%, #000, transparent 74%); -webkit-mask-image: radial-gradient(70% 90% at 28% 8%, #000, transparent 74%); opacity: ${v.bandDecor ?? ""}`,
        )}
      />
      <div
        aria-hidden="true"
        style={sx(
          `z-index: -1; position: absolute; right: 10%; bottom: -110px; width: 320px; height: 320px; border-radius: 999px; border: 1.5px dashed rgba(163,226,174,.26); pointer-events: none; opacity: ${v.bandDecor ?? ""}`,
        )}
      />
      <div
        data-rsp-wide=""
        data-rsp-pad=""
        style={{ maxWidth: "1160px", margin: "0 auto", padding: "46px 24px 26px" }}
      >
        {v.showBack ? (
          <nav
            aria-label={v.tCrumbLabel}
            style={sx(
              `display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: ${v.crumbMb ?? ""}; font-family: var(--font-heading); font-weight: 800; font-size: 14px`,
            )}
          >
            {v.crumbParent ? (
              <>
                <span style={{ color: "rgba(22,36,26,.6)" }}>{v.crumbParent}</span>
                <span aria-hidden="true" style={{ color: "rgba(22,36,26,.4)" }}>
                  ›
                </span>
              </>
            ) : null}
            <span aria-current="page" style={{ color: "#16241a" }}>
              {v.crumbCurrent}
            </span>
          </nav>
        ) : null}
        <div style={sx(v.topRowStyle)}>
          <div>
            {v.showGreeting ? (
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "clamp(32px, 5vw, 52px)",
                    lineHeight: "1.02",
                    margin: "0",
                  }}
                >
                  {v.tGreeting}
                  {", "}
                  {v.firstName}
                </h1>
                <p style={sx(`margin: 10px 0 0; font-size: 17px; color: ${v.bandMuted ?? ""}`)}>
                  {v.subline}
                </p>
              </div>
            ) : null}
            {v.showSectionTitle ? (
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  lineHeight: "1.04",
                  margin: "0",
                }}
              >
                {v.listTitle}
              </h1>
            ) : null}
          </div>
          {v.showGreeting ? (
            <button
              type="button"
              onClick={v.goBoard}
              title={v.tOpenBoard}
              style={{
                display: "grid",
                gridTemplateColumns: "46px minmax(0,1fr) auto",
                alignItems: "center",
                gap: "12px",
                minWidth: "260px",
                maxWidth: "380px",
                textAlign: "left",
                cursor: "pointer",
                padding: "12px 16px 12px 12px",
                borderRadius: "22px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.14)",
                boxShadow: "0 10px 24px rgba(22,36,26,.08)",
                fontFamily: "var(--font-body)",
                color: "#16241a",
                transition: "transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s",
              }}
              className="kza-h2"
            >
              <span
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "16px",
                  background: "#16241a",
                  color: "#f6f8f3",
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  lineHeight: "1",
                }}
              >
                <span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "17px",
                    }}
                  >
                    {v.nmDay}
                  </span>{" "}
                  <span
                    style={{
                      display: "block",
                      fontSize: "10px",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      marginTop: "2px",
                      color: "#a3e2ae",
                    }}
                  >
                    {v.nmMon}
                  </span>
                </span>
              </span>{" "}
              <span style={{ minWidth: "0" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#1f7a3a",
                  }}
                >
                  {v.tNextMeeting}
                </span>{" "}
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "15px",
                    marginTop: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.nmWhenShort}
                </span>{" "}
                <span
                  style={{
                    display: "block",
                    fontSize: "12.5px",
                    color: "rgba(22,36,26,.72)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.nmSummary}
                </span>
              </span>{" "}
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: "999px",
                  background: "rgba(116,205,133,.3)",
                  fontSize: "11.5px",
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                }}
              >
                {v.nmCountdown}
              </span>
            </button>
          ) : null}
          {v.showBandFilters ? (
            <div
              style={{
                position: "relative",
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {v.showVenueAdmin ? (
                <button
                  type="button"
                  onClick={v.venReset}
                  style={{
                    padding: "11px 16px",
                    borderRadius: "999px",
                    border: "1px solid rgba(22,36,26,.2)",
                    background: "#ffffff",
                    color: "#16241a",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "12.5px",
                    cursor: "pointer",
                  }}
                  className="kza-h3"
                >
                  {v.tVenReset}
                </button>
              ) : null}
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={v.clubsOpen}
                onClick={v.toggleClubs}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 20px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.22)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background .25s",
                }}
                className="kza-h3"
              >
                {v.tClubsBtn}
                <span
                  aria-hidden="true"
                  style={sx(
                    `font-size: 12px; display: inline-block; transition: transform .25s; transform: ${v.clubsArrow ?? ""}`,
                  )}
                >
                  ▾
                </span>
              </button>
              {v.clubsOpen ? (
                <>
                  <div onClick={v.closeClubs} style={{ position: "fixed", inset: "0", zIndex: "30" }} />
                  <div
                    role="menu"
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "calc(100% + 10px)",
                      zIndex: "31",
                      width: "min(320px, 86vw)",
                      boxSizing: "border-box",
                      padding: "16px",
                      borderRadius: "24px",
                      background: "#ffffff",
                      border: "1px solid rgba(22,36,26,.12)",
                      boxShadow: "0 22px 60px rgba(22,36,26,.2)",
                    }}
                  >
                    {v.hasAllClubs ? (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={v.pickAllClubs}
                        style={sx(v.allClubsStyle)}
                        className="kza-h4"
                      >
                        <span
                          style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "14px" }}
                        >
                          {v.tAllClubs}
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: "999px",
                              background: "rgba(22,36,26,.08)",
                              fontSize: "12px",
                              fontWeight: "700",
                            }}
                          >
                            {v.allClubsCount}
                          </span>
                          <span aria-hidden="true" style={sx(v.allClubsCheck)}>
                            ✓
                          </span>
                        </span>
                      </button>
                    ) : null}
                    <div
                      style={{
                        fontSize: "11.5px",
                        fontWeight: "700",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "rgba(22,36,26,.5)",
                        margin: "14px 0 12px",
                      }}
                    >
                      {v.tYourClubs}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: "10px",
                      }}
                    >
                      {list(v.clubCards).map((c, i0) => (
                        <button
                          key={c.key ?? i0}
                          type="button"
                          role="menuitem"
                          onClick={c.pick}
                          title={c.name}
                          style={sx(`${c.style ?? ""}; width: 100%; box-sizing: border-box; min-width: 0`)}
                          className="kza-h5"
                        >
                          <span aria-hidden="true" style={sx(c.circleStyle)} />{" "}
                          <span
                            style={{
                              display: "block",
                              fontFamily: "var(--font-heading)",
                              fontWeight: "800",
                              fontSize: "12.5px",
                              lineHeight: "1.25",
                              marginTop: "8px",
                              textAlign: "center",
                              overflowWrap: "anywhere",
                            }}
                          >
                            {c.name}
                          </span>
                        </button>
                      ))}
                    </div>
                    {v.cgShow ? (
                      <div
                        style={{
                          marginTop: "16px",
                          paddingTop: "14px",
                          borderTop: "1px solid rgba(22,36,26,.1)",
                        }}
                      >
                        {v.cgHasDepts ? (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px 10px",
                              marginBottom: "14px",
                            }}
                          >
                            {list(v.cgDepts).map((k, i0) => (
                              <button
                                key={k.key ?? i0}
                                type="button"
                                role="menuitem"
                                onClick={k.pick}
                                aria-pressed={k.on}
                                title={k.label}
                                style={sx(k.style)}
                                className="kza-h6"
                              >
                                <span aria-hidden="true" style={sx(k.circle)}>
                                  {k.initials}
                                </span>{" "}
                                <span
                                  style={{
                                    display: "block",
                                    marginTop: "6px",
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: "800",
                                    fontSize: "12px",
                                    lineHeight: "1.2",
                                    textAlign: "center",
                                    overflowWrap: "anywhere",
                                  }}
                                >
                                  {k.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        ) : null}
                        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                          <span
                            style={{
                              flex: "1",
                              fontFamily: "var(--font-heading)",
                              fontWeight: "800",
                              fontSize: "15px",
                              minWidth: "0",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {v.cgTitle}
                          </span>
                          <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.6)" }}>{v.cgCount}</span>
                        </div>
                        <input
                          type="search"
                          value={v.cgQ ?? ""}
                          onChange={v.onCgQ}
                          placeholder={v.tCgSearch}
                          aria-label={v.tCgSearch}
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            marginTop: "10px",
                            padding: "10px 16px",
                            borderRadius: "999px",
                            border: "1px solid rgba(22,36,26,.18)",
                            background: "#f4f8f2",
                            color: "#16241a",
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            outline: "none",
                          }}
                          className="kza-f7"
                        />
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
                          {list(v.cgCats).map((k, i0) => (
                            <button key={k.key ?? i0} type="button" onClick={k.pick} style={sx(k.style)}>
                              {k.label}
                            </button>
                          ))}
                        </div>
                        <div
                          style={{
                            marginTop: "10px",
                            maxHeight: "250px",
                            overflowY: "auto",
                            overscrollBehavior: "contain",
                            scrollbarWidth: "thin",
                            paddingRight: "4px",
                          }}
                        >
                          {list(v.cgSections).map((sec, i0) => (
                            <div key={sec.key ?? i0} style={{ marginBottom: "10px" }}>
                              <div
                                style={{
                                  position: "sticky",
                                  top: "0",
                                  background: "#ffffff",
                                  padding: "4px 0",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  letterSpacing: ".12em",
                                  textTransform: "uppercase",
                                  color: "rgba(22,36,26,.5)",
                                }}
                              >
                                {sec.title}
                              </div>
                              <div
                                style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}
                              >
                                {list(sec.items).map((g, i1) => (
                                  <button
                                    key={g.key ?? i1}
                                    type="button"
                                    role="menuitem"
                                    onClick={g.pick}
                                    style={sx(g.style)}
                                    className="kza-h8"
                                  >
                                    {g.name}
                                    {g.hot ? (
                                      <span
                                        aria-hidden="true"
                                        style={{
                                          width: "7px",
                                          height: "7px",
                                          borderRadius: "999px",
                                          background: "#1f7a3a",
                                        }}
                                      />
                                    ) : null}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                          {v.cgEmpty ? (
                            <div
                              style={{ fontSize: "13.5px", color: "rgba(22,36,26,.65)", padding: "6px 2px" }}
                            >
                              {v.tCgNone}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
