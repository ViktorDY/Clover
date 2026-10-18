import { sx, list } from "../adminRuntime";

export default function SponsorsView2({ v }) {
  return (
    <>
      <button
        type="button"
        onClick={v.toggleSpCal}
        aria-label={v.tSpCalToggle}
        title={v.tSpCalToggle}
        aria-expanded={v.spCalOpen}
        style={sx(
          `position: fixed; right: ${v.spCalHandleRight ?? ""}; top: 50%; transform: translateY(-50%); z-index: 92; width: 40px; height: 62vh; padding: 0; border: 0; background: transparent; cursor: pointer; display: flex; justify-content: flex-end; align-items: center; transition: right .6s cubic-bezier(.2,.75,.18,1)`,
        )}
      >
        <span
          style={{
            position: "relative",
            display: "block",
            width: "10px",
            height: "100%",
            borderRadius: "999px 0 0 999px",
            background: "linear-gradient(180deg, #1d3a24, #1f7a3a 50%, #1d3a24)",
            boxShadow: "-4px 0 18px rgba(22,36,26,.28)",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              width: "30px",
              height: "92px",
              borderRadius: "16px 0 0 16px",
              background: "#1f7a3a",
              boxShadow: "-6px 0 20px rgba(22,36,26,.3)",
              display: "grid",
              placeItems: "center",
              color: "#f6f8f3",
              fontSize: "18px",
              lineHeight: "1",
              transition: "width .3s cubic-bezier(.2,.7,.2,1), background .3s",
            }}
            className="kza-hl"
          >
            {v.spCalArrow}
          </span>
        </span>
      </button>
      <div
        onClick={v.closeSpCal}
        aria-hidden="true"
        style={sx(
          `position: fixed; inset: 0; z-index: 88; background: rgba(22,36,26,.42); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); opacity: ${v.spCalScrim ?? ""}; pointer-events: ${v.spCalScrimPointer ?? ""}; transition: opacity .55s cubic-bezier(.2,.7,.2,1)`,
        )}
      />
      <aside
        data-rsp-sheet=""
        data-kpi-panel=""
        aria-label={v.tSpCalTitle}
        style={sx(
          `position: fixed; top: 0; right: 0; bottom: 0; z-index: 90; width: 75vw; min-width: 320px; max-width: 100vw; overflow: hidden; box-sizing: border-box; padding: 22px 26px 24px; display: flex; flex-direction: column; background: linear-gradient(165deg, #16241a, #1d3a24 55%, #16241a); color: #f6f8f3; border-radius: 34px 0 0 34px; box-shadow: -30px 0 80px rgba(0,0,0,.35); transform: ${v.spCalTransform ?? ""}; transition: transform .6s cubic-bezier(.2,.75,.18,1)`,
        )}
      >
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              background: "#74cd85",
              animation: "kza-pulse 2.4s ease-in-out infinite",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "clamp(22px, 3vw, 30px)",
              margin: "0",
              flex: "1",
              minWidth: "0",
            }}
          >
            {v.tSpCalTitle}
          </h2>
          <span style={{ fontSize: "13px", color: "rgba(246,248,243,.75)" }}>{v.spCalSub}</span>
        </div>
        <div
          style={{
            flex: "1 1 0",
            minHeight: "0",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            width: "100%",
            maxWidth: "760px",
            margin: "0 auto",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              minHeight: "0",
              display: "flex",
              flexDirection: "column",
              borderRadius: "28px",
              background: "#ffffff",
              color: "#16241a",
              padding: "20px 22px",
            }}
          >
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "10px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "20px",
                  margin: "0",
                  flex: "1",
                  minWidth: "0",
                }}
              >
                {v.spCalMonthLabel}
              </h3>
              <button
                type="button"
                onClick={v.spCalPrev}
                aria-label={v.tPrevMonth}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.18)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                ←
              </button>
              <button
                type="button"
                onClick={v.spCalNext}
                aria-label={v.tNextMonth}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.18)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                →
              </button>
            </div>
            <div
              style={{
                flex: "0 0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(0,1fr))",
                gap: "4px",
                marginTop: "14px",
              }}
            >
              {list(v.calWeekdays).map((w, i0) => (
                <div
                  key={w.key ?? i0}
                  style={{
                    textAlign: "center",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.75)",
                    paddingBottom: "4px",
                  }}
                >
                  {w.label}
                </div>
              ))}
              {list(v.spCalCells).map((c, i0) => (
                <button key={c.key ?? i0} type="button" onClick={c.pick} style={sx(c.style)}>
                  {c.day}
                </button>
              ))}
            </div>
            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                marginTop: "12px",
                fontSize: "12.5px",
                color: "rgba(22,36,26,.78)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "3px",
                    background: "#fff4cf",
                    border: "2px solid #e0a100",
                  }}
                />
                {v.tLegendGrant}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "3px",
                    background: "#e6f0fc",
                    border: "2px solid #3b7dd8",
                  }}
                />
                {v.tLegendReport}
              </span>
            </div>
            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                marginTop: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "rgba(22,36,26,.75)",
                  flex: "1",
                }}
              >
                {v.tSpCalUpcoming}
              </div>
              <span style={{ fontSize: "12px", color: "rgba(22,36,26,.7)" }}>{v.spCalRange}</span>
            </div>
            <div
              style={{
                flex: "1 1 0",
                minHeight: "90px",
                overflowY: "auto",
                overscrollBehavior: "contain",
                display: "grid",
                gap: "8px",
                alignContent: "start",
                marginTop: "8px",
                paddingRight: "4px",
                scrollbarWidth: "thin",
              }}
            >
              {list(v.spCalUpcoming).map((dl, i0) => (
                <div
                  key={dl.key ?? i0}
                  role="button"
                  tabIndex="0"
                  onClick={dl.go}
                  title={dl.goHint}
                  style={sx(dl.style)}
                  className="kza-hm"
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span
                      style={{
                        flex: "1",
                        minWidth: "0",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "14.5px",
                      }}
                    >
                      {dl.title}
                    </span>
                    <span style={sx(dl.tagStyle)}>{dl.tag}</span>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.75)", marginTop: "3px" }}>
                    {dl.meta}
                  </div>
                </div>
              ))}
              {v.spCalUpEmpty ? (
                <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.75)" }}>{v.tSpCalUpEmpty}</div>
              ) : null}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
