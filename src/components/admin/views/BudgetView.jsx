import { sx, list } from "../adminRuntime";

// Økonomi › Budsjett.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function BudgetView({ v }) {
  return (
    <div
      style={{
        borderRadius: "26px",
        background: "#ffffff",
        border: "1px solid rgba(22,36,26,.12)",
        padding: "24px",
        minWidth: "0",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "12px 20px" }}>
        <div style={{ flex: "1", minWidth: "220px" }}>
          <h2
            style={{
              margin: "0",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "30px",
              letterSpacing: "-.02em",
              color: "#1f7a3a",
            }}
          >
            {v.tBgTitle}
          </h2>
          <div style={{ fontSize: "14px", color: "rgba(22,36,26,.7)", marginTop: "4px" }}>{v.bgScope}</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {list(v.bgPeriods).map((c, i0) => (
            <button key={c.key ?? i0} type="button" onClick={c.pick} style={sx(c.style)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        {list(v.bgKpis).map((k, i0) => (
          <div
            key={k.key ?? i0}
            style={sx(
              `border-radius: 18px; background: ${k.bg ?? ""}; border: 1px solid rgba(22,36,26,.1); padding: 14px 16px`,
            )}
          >
            <div
              style={{
                fontSize: "11.5px",
                fontWeight: "600",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.6)",
              }}
            >
              {k.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "24px",
                marginTop: "4px",
              }}
            >
              {k.value}
            </div>
            <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.7)", marginTop: "2px" }}>{k.note}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "22px", display: "grid", gap: "22px", overflowX: "auto" }}>
        {list(v.bgGroups).map((g, i0) => (
          <div key={g.key ?? i0} style={{ minWidth: "628px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(140px, 1.3fr) minmax(110px, .8fr) minmax(110px, .8fr) minmax(130px, 1.4fr) minmax(90px, .6fr)",
                gap: "12px",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid rgba(22,36,26,.14)",
                fontSize: "13px",
                fontWeight: "600",
                color: "rgba(22,36,26,.7)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "16px",
                  color: "#16241a",
                }}
              >
                {g.title}
              </span>
              <span>{v.tBgBudget}</span>
              <span>{v.tBgActual}</span>
              <span>{v.tBgUsed}</span>
              <span style={{ textAlign: "right" }}>{v.tBgDiff}</span>
            </div>
            {list(g.rows).map((r, i1) => (
              <div
                key={r.key ?? i1}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(140px, 1.3fr) minmax(110px, .8fr) minmax(110px, .8fr) minmax(130px, 1.4fr) minmax(90px, .6fr)",
                  gap: "12px",
                  alignItems: "center",
                  minHeight: "52px",
                  borderBottom: "1px solid rgba(22,36,26,.08)",
                  fontSize: "14.5px",
                }}
              >
                <span>{r.label}</span>
                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input
                    type="number"
                    min="0"
                    value={r.budget ?? ""}
                    onChange={r.edit}
                    aria-label={v.tBgBudget}
                    style={{
                      width: "100%",
                      maxWidth: "110px",
                      boxSizing: "border-box",
                      padding: "7px 10px",
                      borderRadius: "10px",
                      border: "1px solid rgba(22,36,26,.18)",
                      background: "#ffffff",
                      color: "#16241a",
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      outline: "none",
                    }}
                    className="kza-fp"
                  />
                </label>
                <span>{r.actual}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      flex: "1",
                      height: "8px",
                      borderRadius: "999px",
                      background: "rgba(22,36,26,.08)",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={sx(
                        `display: block; height: 100%; width: ${r.pct ?? ""}; border-radius: 999px; background: ${r.bar ?? ""}; transition: width .5s`,
                      )}
                    />
                  </span>
                  <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.7)", minWidth: "36px" }}>
                    {r.pctLabel}
                  </span>
                </span>
                <span style={sx(`text-align: right; font-weight: 600; color: ${r.diffInk ?? ""}`)}>
                  {r.diff}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
