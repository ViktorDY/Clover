import { sx, list } from "../adminRuntime";

export default function FinanceMain({ v }) {
  return (
    <>
      <div
        data-rsp="stack"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "14px",
          marginTop: "14px",
        }}
      >
        {list(v.donuts).map((d, i0) => (
          <div key={d.key ?? i0} style={{ padding: "6px 2px" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".11em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.75)",
              }}
            >
              {d.label}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "20px",
                marginTop: "16px",
              }}
            >
              <div style={{ position: "relative", width: "168px", height: "168px", flex: "0 0 auto" }}>
                <svg viewBox="0 0 160 160" style={{ width: "100%", height: "100%", display: "block" }}>
                  <g transform="rotate(-90 80 80)">
                    <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(22,36,26,.08)" strokeWidth="17" />
                    {list(d.slices).map((sl, i1) => (
                      <circle
                        key={sl.key ?? i1}
                        cx="80"
                        cy="80"
                        r="64"
                        fill="none"
                        stroke={sl.color}
                        strokeWidth="17"
                        strokeDasharray={sl.dash}
                        strokeDashoffset={sl.offset}
                      />
                    ))}
                  </g>
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: "0",
                    display: "grid",
                    placeItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "17px",
                        lineHeight: "1.1",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.total}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(22,36,26,.75)", marginTop: "2px" }}>
                      {d.sub}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ flex: "1", minWidth: "130px", display: "grid", gap: "8px" }}>
                {list(d.legend).map((l, i1) => (
                  <div key={l.key ?? i1} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <span
                      style={sx(
                        `width: 10px; height: 10px; flex: 0 0 auto; border-radius: 999px; background: ${l.color ?? ""}`,
                      )}
                    />
                    <span
                      style={{ flex: "1", minWidth: "0", fontSize: "13.5px", color: "rgba(22,36,26,.75)" }}
                    >
                      {l.label}
                    </span>
                    <span
                      style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "13.5px" }}
                    >
                      {l.pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
              <span style={sx(d.chipStyle)}>{d.chip}</span>
              <span style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{d.note}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "14px", marginTop: "14px" }}>
        <div
          style={{
            borderRadius: "26px",
            background: "#ffffff",
            border: "1px solid rgba(22,36,26,.12)",
            padding: "22px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: ".11em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.75)",
            }}
          >
            {v.tResult}
          </div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "34px",
              marginTop: "10px",
              color: "#1f7a3a",
            }}
          >
            {v.resultVal}
          </div>
          <div style={{ fontSize: "14px", color: "rgba(22,36,26,.78)", marginTop: "6px" }}>
            {v.tMargin} {v.marginVal}
          </div>
          <div
            style={{
              height: "8px",
              borderRadius: "999px",
              background: "rgba(22,36,26,.1)",
              marginTop: "14px",
              overflow: "hidden",
            }}
          >
            <div
              style={sx(
                `height: 100%; border-radius: 999px; background: linear-gradient(90deg, #74cd85, #1f7a3a); width: ${v.marginFill ?? ""}`,
              )}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          borderRadius: "26px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          padding: "22px",
          marginTop: "14px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px" }}>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "18px",
              margin: "0",
              flex: "1",
              minWidth: "0",
            }}
          >
            {v.tPending}
          </h3>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "17px" }}>
            {v.pendingTotal}
          </span>
        </div>
        <div style={{ display: "grid", gap: "10px", marginTop: "14px" }}>
          {list(v.pending).map((p, i0) => (
            <div
              key={p.key ?? i0}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "12px",
                borderRadius: "20px",
                background: "#f4f8f2",
                border: "1px solid rgba(22,36,26,.1)",
                padding: "14px 16px",
              }}
            >
              <span style={{ flex: "1", minWidth: "0" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "15px",
                  }}
                >
                  {p.title}
                </span>{" "}
                <span
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "rgba(22,36,26,.75)",
                    marginTop: "2px",
                  }}
                >
                  {p.meta}
                </span>
              </span>
              <span
                style={{
                  flex: "0 0 auto",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "15px",
                }}
              >
                {p.amount}
              </span>
              <span style={sx(p.tagStyle)}>{p.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
