import { sx, list } from "../adminRuntime";

export default function PlanningView({ v }) {
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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
        <h2
          style={{
            flex: "1",
            minWidth: "200px",
            margin: "0",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "30px",
            letterSpacing: "-.02em",
            color: "#1f7a3a",
          }}
        >
          {v.tPlTitle}
        </h2>
        <button
          type="button"
          onClick={v.plToggleForm}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 22px",
            borderRadius: "999px",
            border: "0",
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
          {v.tPlAdd}
        </button>
      </div>
      {v.plFormOpen ? (
        <form
          onSubmit={v.plSave}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "12px",
            alignItems: "end",
            marginTop: "18px",
            borderRadius: "18px",
            background: "#f4f8f2",
            border: "1px solid rgba(22,36,26,.1)",
            padding: "16px",
          }}
        >
          <label
            style={{
              display: "grid",
              gap: "6px",
              fontSize: "11.5px",
              fontWeight: "600",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.6)",
            }}
          >
            {v.tPlName}
            <input
              type="text"
              required
              value={v.plName ?? ""}
              onChange={v.onPlName}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(22,36,26,.18)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
              }}
            />
          </label>
          <label
            style={{
              display: "grid",
              gap: "6px",
              fontSize: "11.5px",
              fontWeight: "600",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.6)",
            }}
          >
            {v.tPlOwner}
            <input
              type="text"
              required
              value={v.plOwner ?? ""}
              onChange={v.onPlOwner}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(22,36,26,.18)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
              }}
            />
          </label>
          <label
            style={{
              display: "grid",
              gap: "6px",
              fontSize: "11.5px",
              fontWeight: "600",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.6)",
            }}
          >
            {v.tPlDate}
            <input
              type="date"
              required
              value={v.plDate ?? ""}
              onChange={v.onPlDate}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(22,36,26,.18)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              padding: "13px 22px",
              borderRadius: "999px",
              border: "0",
              background: "#1f7a3a",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
            }}
            className="kza-ha"
          >
            {v.tSaveL}
          </button>
        </form>
      ) : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "14px",
          marginTop: "20px",
          alignItems: "start",
        }}
      >
        {list(v.plCols).map((col, i0) => (
          <div
            key={col.key ?? i0}
            style={sx(
              `border-radius: 20px; background: ${col.bg ?? ""}; border: 1px solid rgba(22,36,26,.08); padding: 14px; display: grid; gap: 10px; min-width: 0`,
            )}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={sx(`width: 10px; height: 10px; border-radius: 999px; background: ${col.dot ?? ""}`)}
              />
              <span
                style={{ flex: "1", fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "15px" }}
              >
                {col.title}
              </span>
              <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.6)" }}>{col.count}</span>
            </div>
            {list(col.cards).map((p, i1) => (
              <div
                key={p.key ?? i1}
                style={{
                  borderRadius: "14px",
                  background: "#ffffff",
                  border: "1px solid rgba(22,36,26,.1)",
                  padding: "12px 14px",
                  display: "grid",
                  gap: "6px",
                }}
              >
                <span style={{ fontWeight: "600", fontSize: "14.5px", lineHeight: "1.3" }}>{p.name}</span>
                <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.7)" }}>
                  {p.date}
                  {" · "}
                  {p.owner}
                </span>
                <span style={{ fontSize: "12px", color: "rgba(22,36,26,.55)" }}>{p.club}</span>
                <span style={{ display: "flex", gap: "6px", marginTop: "2px" }}>
                  <button
                    type="button"
                    onClick={p.back}
                    disabled={p.noBack}
                    aria-label={v.tPlBack}
                    style={sx(
                      `width: 34px; height: 28px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; cursor: pointer; opacity: ${p.backOp ?? ""}`,
                    )}
                    className="kza-h3"
                  >
                    ←
                  </button>{" "}
                  <button
                    type="button"
                    onClick={p.fwd}
                    disabled={p.noFwd}
                    aria-label={v.tPlFwd}
                    style={sx(
                      `width: 34px; height: 28px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; cursor: pointer; opacity: ${p.fwdOp ?? ""}`,
                    )}
                    className="kza-h3"
                  >
                    →
                  </button>{" "}
                  <button
                    type="button"
                    onClick={p.del}
                    aria-label={v.tDelete}
                    style={{
                      marginLeft: "auto",
                      width: "34px",
                      height: "28px",
                      borderRadius: "999px",
                      border: "1px solid rgba(22,36,26,.18)",
                      background: "#ffffff",
                      cursor: "pointer",
                      color: "rgba(22,36,26,.6)",
                    }}
                    className="kza-hv"
                  >
                    ×
                  </button>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
