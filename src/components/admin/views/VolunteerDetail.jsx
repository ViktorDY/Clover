import { sx, list } from "../adminRuntime";

// Selected volunteer day: QR code and attendance.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function VolunteerDetail({ v }) {
  return (
    <div style={{ display: "grid", gap: "18px", minWidth: "0" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 220px) minmax(0, 1fr)",
          gap: "22px",
          alignItems: "center",
          borderRadius: "22px",
          background: "#f4f8f2",
          border: "1px solid rgba(22,36,26,.1)",
          padding: "20px",
        }}
        data-rsp="stack"
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "12px",
            border: "1px solid rgba(22,36,26,.1)",
          }}
        >
          <svg
            viewBox={v.qrView}
            width="100%"
            role="img"
            aria-label={v.tVgQrAlt}
            shapeRendering="crispEdges"
            style={{ display: "block" }}
          >
            <rect
              x="-4"
              y="-4"
              width="100"
              height="100"
              fill="#ffffff"
              style={{ width: "200%", height: "200%" }}
            />
            <path d={v.qrD} fill="#16241a" />
          </svg>
        </div>
        <div style={{ display: "grid", gap: "10px" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "20px" }}>
            {v.vgSelName}
          </div>
          <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.72)", lineHeight: "1.5" }}>
            {v.tVgQrHelp}
          </div>
          <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.55)", wordBreak: "break-all" }}>
            {v.qrText}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <button
              type="button"
              onClick={v.vgPrint}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "0",
                background: "#16241a",
                color: "#f6f8f3",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13px",
                cursor: "pointer",
              }}
              className="kza-hf"
            >
              {v.tVgPrint}
            </button>
            <button
              type="button"
              onClick={v.vgDownload}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13px",
                cursor: "pointer",
              }}
              className="kza-h3"
            >
              {v.tVgDownload}
            </button>
            <button
              type="button"
              onClick={v.vgRenew}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13px",
                cursor: "pointer",
              }}
              className="kza-h3"
            >
              {v.tVgRenew}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: "1", minWidth: "180px" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "18px" }}>
              {v.tVgAttend}
            </div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.65)", marginTop: "2px" }}>
              {v.vgTotals}
            </div>
          </div>
          <button
            type="button"
            onClick={v.vgSimulate}
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px dashed rgba(31,122,58,.6)",
              background: "#ffffff",
              color: "#1f7a3a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
            }}
            className="kza-h3"
          >
            {v.tVgSimulate}
          </button>
          <button
            type="button"
            onClick={v.vgConfirmAll}
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "0",
              background: "#1f7a3a",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
            }}
            className="kza-ha"
          >
            {v.tVgConfirmAll}
          </button>
          <button
            type="button"
            onClick={v.vgExport}
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(22,36,26,.2)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
            }}
            className="kza-h3"
          >
            {v.tVgExport}
          </button>
        </div>
        <div style={{ marginTop: "12px", overflowX: "auto" }}>
          <div style={{ minWidth: "520px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(120px, 1.6fr) 80px 120px 130px",
                gap: "10px",
                padding: "10px 0",
                borderBottom: "1px solid rgba(22,36,26,.14)",
                fontSize: "12.5px",
                fontWeight: "600",
                color: "rgba(22,36,26,.65)",
              }}
            >
              <span>{v.tVgPerson}</span>
              <span>{v.tVgIn}</span>
              <span>{v.tVgHrs}</span>
              <span>{v.tVgStatus}</span>
            </div>
            {list(v.vgPeople).map((p, i0) => (
              <div
                key={p.key ?? i0}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(120px, 1.6fr) 80px 120px 130px",
                  gap: "10px",
                  alignItems: "center",
                  minHeight: "52px",
                  borderBottom: "1px solid rgba(22,36,26,.08)",
                  fontSize: "14.5px",
                }}
              >
                <span style={{ fontWeight: "600" }}>{p.name}</span>
                <span style={{ color: "rgba(22,36,26,.75)" }}>{p.in}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={p.minus}
                    aria-label="−"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      border: "1px solid rgba(22,36,26,.18)",
                      background: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>
                  <span style={{ minWidth: "30px", textAlign: "center", fontWeight: "600" }}>{p.hours}</span>
                  <button
                    type="button"
                    onClick={p.plus}
                    aria-label="+"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      border: "1px solid rgba(22,36,26,.18)",
                      background: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </span>
                <button type="button" onClick={p.toggle} style={sx(p.btn)}>
                  {p.btnLabel}
                </button>
              </div>
            ))}
            {v.vgNoPeople ? (
              <div style={{ padding: "18px 0", fontSize: "14px", color: "rgba(22,36,26,.65)" }}>
                {v.tVgNoPeople}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
