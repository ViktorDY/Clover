import { sx, list } from "../adminRuntime";

// Dokumenter og historikk.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function DocsView({ v }) {
  return (
    <div
      data-rsp="stack"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
        gap: "18px",
        alignItems: "start",
      }}
    >
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
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <h2
            style={{
              flex: "1",
              minWidth: "180px",
              margin: "0",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "30px",
              letterSpacing: "-.02em",
              color: "#1f7a3a",
            }}
          >
            {v.tDcTitle}
          </h2>
          <label
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 22px",
              borderRadius: "999px",
              background: "#16241a",
              color: "#f6f8f3",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background .3s",
            }}
            className="kza-hf"
          >
            <span aria-hidden="true" style={{ fontSize: "17px", lineHeight: "1" }}>
              +
            </span>{" "}
            {v.tDcUpload}{" "}
            <input
              type="file"
              multiple
              onChange={v.onDcFiles}
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                opacity: "0",
                pointerEvents: "none",
              }}
            />
          </label>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
          {list(v.dcCats).map((c, i0) => (
            <button key={c.key ?? i0} type="button" onClick={c.pick} style={sx(c.style)}>
              {c.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={v.dcQ ?? ""}
          onChange={v.onDcQ}
          placeholder={v.tDcSearch}
          aria-label={v.tDcSearch}
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: "14px",
            padding: "12px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.18)",
            background: "#ffffff",
            color: "#16241a",
            fontFamily: "var(--font-body)",
            fontSize: "14.5px",
            outline: "none",
          }}
          className="kza-fp"
        />
        <div
          style={{
            marginTop: "14px",
            maxHeight: "max(380px, calc(100vh - 430px))",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {list(v.dcRows).map((r, i0) => (
            <div
              key={r.key ?? i0}
              style={{
                display: "grid",
                gridTemplateColumns: "40px minmax(0, 1fr) auto",
                alignItems: "center",
                gap: "12px",
                padding: "12px 4px",
                borderBottom: "1px solid rgba(22,36,26,.08)",
              }}
            >
              <span style={sx(r.iconStyle)}>{r.ext}</span>
              <span style={{ minWidth: "0" }}>
                <span
                  style={{
                    display: "block",
                    fontWeight: "600",
                    fontSize: "14.5px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.name}
                </span>
                <span style={{ display: "block", fontSize: "12.5px", color: "rgba(22,36,26,.62)" }}>
                  {r.meta}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "#f4f8f2",
                    fontSize: "12px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.cat}
                </span>{" "}
                <button
                  type="button"
                  onClick={r.del}
                  aria-label={v.tDelete}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "999px",
                    border: "1px solid rgba(22,36,26,.16)",
                    background: "#ffffff",
                    color: "rgba(22,36,26,.6)",
                    cursor: "pointer",
                  }}
                  className="kza-hv"
                >
                  ×
                </button>
              </span>
            </div>
          ))}
          {v.dcEmpty ? (
            <div style={{ padding: "20px 4px", fontSize: "14px", color: "rgba(22,36,26,.7)" }}>
              {v.tDcEmpty}
            </div>
          ) : null}
        </div>
      </div>
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
        <h3
          style={{
            margin: "0 0 16px",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "22px",
          }}
        >
          {v.tHiTitle}
        </h3>
        <div
          style={{
            display: "grid",
            gap: "0",
            maxHeight: "max(420px, calc(100vh - 340px))",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {list(v.hiRows).map((h, i0) => (
            <div
              key={h.key ?? i0}
              style={{
                display: "grid",
                gridTemplateColumns: "14px minmax(0, 1fr)",
                gap: "12px",
                paddingBottom: "16px",
              }}
            >
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    marginTop: "5px",
                    borderRadius: "999px",
                    background: "#1f7a3a",
                  }}
                />
                <span
                  style={{ flex: "1", width: "2px", marginTop: "4px", background: "rgba(22,36,26,.12)" }}
                />
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "14.5px", lineHeight: "1.4" }}>{h.text}</span>
                <span
                  style={{
                    display: "block",
                    fontSize: "12.5px",
                    color: "rgba(22,36,26,.6)",
                    marginTop: "2px",
                  }}
                >
                  {h.meta}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
