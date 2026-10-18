import { sx, list } from "../adminRuntime";

// Events table with columns, sorting and paging.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function EventTable({ v }) {
  return (
    <div style={{ marginTop: "18px", minWidth: "0" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
        <div style={{ position: "relative", flex: "1 1 240px", minWidth: "0" }}>
          <input
            type="search"
            value={v.evQ ?? ""}
            onChange={v.onEvQ}
            placeholder={v.tEvSearch}
            aria-label={v.tEvSearch}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "11px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(22,36,26,.16)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              outline: "none",
            }}
            className="kza-fp"
          />
        </div>
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={v.toggleEvCols}
            aria-haspopup="true"
            aria-expanded={v.evColsOpen}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(22,36,26,.16)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13.5px",
              cursor: "pointer",
            }}
            className="kza-h6"
          >
            {v.tEvColumns} <span style={{ fontSize: "11px" }}>▾</span>
          </button>
          {v.evColsOpen ? (
            <>
              <div onClick={v.closeEvCols} style={{ position: "fixed", inset: "0", zIndex: "30" }} />
              <div
                role="menu"
                style={{
                  position: "absolute",
                  right: "0",
                  top: "calc(100% + 8px)",
                  zIndex: "31",
                  width: "260px",
                  borderRadius: "18px",
                  background: "#ffffff",
                  border: "1px solid rgba(22,36,26,.12)",
                  boxShadow: "0 22px 54px rgba(22,36,26,.24)",
                  padding: "12px",
                }}
              >
                <input
                  type="search"
                  value={v.evColQ ?? ""}
                  onChange={v.onEvColQ}
                  placeholder={v.tEvColSearch}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 14px",
                    border: "0",
                    borderBottom: "1px solid rgba(22,36,26,.12)",
                    background: "transparent",
                    color: "#16241a",
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <div style={{ display: "grid", gap: "2px", marginTop: "8px" }}>
                  {list(v.evColOpts).map((o, i0) => (
                    <label
                      key={o.key ?? i0}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "9px 8px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "14.5px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!o.on}
                        onChange={o.toggle}
                        style={{
                          width: "18px",
                          height: "18px",
                          margin: "0",
                          accentColor: "#1f7a3a",
                          cursor: "pointer",
                        }}
                      />{" "}
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div style={{ marginTop: "12px", fontSize: "12.5px", color: "rgba(22,36,26,.7)" }}>{v.evShowing}</div>
      <div
        style={{
          overflow: "auto",
          maxHeight: "max(320px, calc(100vh - 400px))",
          overscrollBehavior: "contain",
          scrollbarWidth: "thin",
          marginTop: "8px",
          borderTop: "1px solid rgba(22,36,26,.12)",
        }}
      >
        <div style={sx(`min-width: ${v.evMinW ?? ""}`)}>
          <div
            style={sx(
              `position: sticky; top: 0; z-index: 2; background: #ffffff; display: grid; grid-template-columns: ${v.evGrid ?? ""}; gap: 12px; align-items: center; padding: 12px 14px; border-bottom: 1px solid rgba(22,36,26,.12); font-size: 11.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.72)`,
            )}
          >
            {list(v.evHead).map((h, i0) => (
              <button key={h.key ?? i0} type="button" onClick={h.sort} style={sx(h.style)}>
                {h.label}
                <span aria-hidden="true" style={{ fontSize: "9px", marginLeft: "5px" }}>
                  {h.caret}
                </span>
              </button>
            ))}
          </div>
          {list(v.evRows).map((r, i0) => (
            <div
              key={r.key ?? i0}
              role="button"
              tabIndex="0"
              onClick={r.open}
              style={sx(
                `display: grid; grid-template-columns: ${v.evGrid ?? ""}; gap: 12px; align-items: center; min-height: 54px; box-sizing: border-box; padding: 6px 14px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 13.5px; cursor: pointer; transition: background .2s`,
              )}
              className="kza-h6"
            >
              {list(r.cells).map((c, i1) => (
                <span key={c.key ?? i1} style={sx(c.style)} title={c.text}>
                  {c.isIcon ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16241a"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={c.icon} />
                    </svg>
                  ) : null}
                  {c.isText ? <>{c.text}</> : null}
                </span>
              ))}
            </div>
          ))}
          {v.evEmpty ? (
            <div style={{ padding: "18px 14px", fontSize: "14px", color: "rgba(22,36,26,.72)" }}>
              {v.tEvEmpty}
            </div>
          ) : null}
        </div>
      </div>
      {v.evMulti ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {list(v.evPages).map((p, i0) => (
              <button key={p.key ?? i0} type="button" onClick={p.go} style={sx(p.style)}>
                {p.label}
              </button>
            ))}
          </div>
          <span
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "12px",
              justifyContent: "flex-end",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "rgba(22,36,26,.8)",
                whiteSpace: "nowrap",
              }}
            >
              {v.tEvPer}{" "}
              <select
                value={v.evPer ?? ""}
                onChange={v.onEvPer}
                aria-label={v.tEvPer}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(22,36,26,.16)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {list(v.evPerOpts).map((o, i0) => (
                  <option key={o.key ?? i0} value={o.v ?? ""}>
                    {o.v}
                  </option>
                ))}
              </select>
            </label>
          </span>
        </div>
      ) : null}
    </div>
  );
}
