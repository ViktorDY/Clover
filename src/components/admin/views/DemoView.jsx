import { sx, list } from "../adminRuntime";

export default function DemoView({ v }) {
  return (
    <>
      <button
        type="button"
        onClick={v.toggleDemo}
        aria-label={v.tDemo}
        title={v.tDemo}
        aria-expanded={v.demoOpen}
        style={sx(
          `position: fixed; right: ${v.demoHandleRight ?? ""}; top: 50%; transform: translateY(-50%); z-index: 92; width: 40px; height: 46vh; padding: 0; border: 0; background: transparent; cursor: pointer; display: flex; justify-content: flex-end; align-items: center; transition: right .6s cubic-bezier(.2,.75,.18,1)`,
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
            {v.demoArrow}
          </span>
        </span>
      </button>
      <div
        onClick={v.closeDemo}
        aria-hidden="true"
        style={sx(
          `position: fixed; inset: 0; z-index: 88; background: rgba(22,36,26,.42); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); opacity: ${v.demoScrimOpacity ?? ""}; pointer-events: ${v.demoScrimPointer ?? ""}; transition: opacity .55s cubic-bezier(.2,.7,.2,1)`,
        )}
      />
      <aside
        data-rsp-sheet=""
        aria-label={v.tDemo}
        style={sx(
          `position: fixed; top: 0; right: 0; bottom: 0; z-index: 90; width: min(100vw, 520px); box-sizing: border-box; overflow-y: auto; padding: 28px 26px; background: #ffffff; border-radius: 34px 0 0 34px; box-shadow: -30px 0 80px rgba(0,0,0,.3); transform: ${v.demoTransform ?? ""}; transition: transform .6s cubic-bezier(.2,.75,.18,1)`,
        )}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "20px",
            margin: "0 0 4px",
          }}
        >
          {v.tDemo}
        </h2>
        <div style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{v.demoSub}</div>
        <div
          data-rsp="stack"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: "10px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              borderRadius: "20px",
              background: "#eaf7ed",
              border: "1px solid rgba(31,122,58,.3)",
              padding: "13px 15px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "999px", background: "#1f7a3a" }} />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "#16241a",
                }}
              >
                {v.tGirls}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "22px",
                marginTop: "6px",
              }}
            >
              {v.girlsTotal}
            </div>
          </div>
          <div
            style={{
              borderRadius: "20px",
              background: "#fff4cf",
              border: "1px solid #f2d27a",
              padding: "13px 15px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "999px", background: "#e0a100" }} />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "#16241a",
                }}
              >
                {v.tBoys}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "22px",
                marginTop: "6px",
              }}
            >
              {v.boysTotal}
            </div>
          </div>
        </div>
        <div style={{ position: "relative", marginTop: "20px", paddingLeft: "30px" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "30px",
              right: "0",
              top: "0",
              height: "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              pointerEvents: "none",
            }}
          >
            {list(v.ageTicks).map((t, i0) => (
              <div
                key={t.key ?? i0}
                style={{ position: "relative", height: "0", borderTop: "1px dashed rgba(22,36,26,.12)" }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "-30px",
                    top: "-8px",
                    width: "24px",
                    textAlign: "right",
                    fontSize: "11px",
                    color: "rgba(22,36,26,.6)",
                  }}
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0,1fr))",
              gap: "8px",
              height: "170px",
              alignItems: "end",
              borderBottom: "2px solid rgba(22,36,26,.2)",
            }}
          >
            {list(v.ageBands).map((b, i0) => (
              <div
                key={b.key ?? i0}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: "4px",
                  height: "100%",
                }}
              >
                <span
                  title={b.girlsTitle}
                  style={sx(
                    `flex: 0 1 16px; min-width: 8px; border-radius: 8px 8px 0 0; background: linear-gradient(180deg, #3f9a58, #1f7a3a); height: ${b.girlsH ?? ""}; transition: height .6s cubic-bezier(.2,.7,.2,1)`,
                  )}
                />
                <span
                  title={b.boysTitle}
                  style={sx(
                    `flex: 0 1 16px; min-width: 8px; border-radius: 8px 8px 0 0; background: linear-gradient(180deg, #ffd66e, #ffc94a); height: ${b.boysH ?? ""}; transition: height .6s cubic-bezier(.2,.7,.2,1)`,
                  )}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0,1fr))",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {list(v.ageBands).map((b, i0) => (
              <div key={b.key ?? i0} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "12px" }}>
                  {b.label}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(22,36,26,.65)", marginTop: "1px" }}>
                  {b.total}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            marginTop: "16px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(22,36,26,.1)",
            fontSize: "13px",
            color: "rgba(22,36,26,.78)",
          }}
        >
          <span>{v.demoAvgAge}</span>
          <span>{v.demoLargest}</span>
        </div>
      </aside>
    </>
  );
}
