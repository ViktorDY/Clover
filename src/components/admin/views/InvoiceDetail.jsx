import { sx, list } from "../adminRuntime";

// Invoice detail view.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function InvoiceDetail({ v }) {
  return (
    <div
      data-rsp-modal=""
      onClick={v.closeInvDetail}
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "98",
        display: "grid",
        placeItems: "center",
        padding: "20px",
        background: "rgba(22,36,26,.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label={v.invDTitleHead}
        onClick={v.stopClick}
        onSubmit={v.saveInvDetail}
        style={{
          width: "100%",
          maxWidth: "520px",
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto",
          boxSizing: "border-box",
          borderRadius: "26px",
          background: "#ffffff",
          boxShadow: "0 32px 80px rgba(22,36,26,.32)",
          padding: "24px",
          display: "grid",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h3
            style={{
              flex: "1",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "22px",
              margin: "0",
            }}
          >
            {v.invDTitleHead}
          </h3>
          <button
            type="button"
            onClick={v.closeInvDetail}
            aria-label={v.tClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "999px",
              border: "1px solid rgba(22,36,26,.14)",
              background: "#ffffff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "12px",
          }}
        >
          <div
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
            {v.tColName}
            <span
              style={{
                fontSize: "15px",
                letterSpacing: "0",
                textTransform: "none",
                fontWeight: "500",
                color: "#16241a",
              }}
            >
              {v.invDName}
            </span>
          </div>
          <div
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
            {v.tColNumber}
            <span
              style={{
                fontSize: "15px",
                letterSpacing: "0",
                textTransform: "none",
                fontWeight: "500",
                color: "#16241a",
              }}
            >
              {v.invDNumber}
            </span>
          </div>
          <div
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
            {v.tColIssued}
            <span
              style={{
                fontSize: "15px",
                letterSpacing: "0",
                textTransform: "none",
                fontWeight: "500",
                color: "#16241a",
              }}
            >
              {v.invDDate}
            </span>
          </div>
        </div>
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
          {v.tColType}
          <input
            type="text"
            disabled={v.invDRead}
            value={v.invDType ?? ""}
            onChange={v.onInvDType}
            style={sx(v.inputStyleWhite)}
          />
        </label>
        <div
          data-rsp="stack"
          style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "12px" }}
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
            {v.tColAmount}
            {" (NOK)"}
            <input
              type="number"
              min="1"
              disabled={v.invDRead}
              value={v.invDAmt ?? ""}
              onChange={v.onInvDAmt}
              style={sx(v.inputStyleWhite)}
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
            {v.tInvDue}
            <input
              type="date"
              disabled={v.invDRead}
              value={v.invDDue ?? ""}
              onChange={v.onInvDDue}
              style={sx(v.inputStyleWhite)}
            />
          </label>
        </div>
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
          {v.tColStatus}{" "}
          <select
            disabled={v.invDRead}
            value={v.invDStatus ?? ""}
            onChange={v.onInvDStatus}
            style={sx(v.inputStyleWhite)}
          >
            {list(v.invStatusOpts).map((o, i0) => (
              <option key={o.key ?? i0} value={o.id ?? ""}>
                {o.name}
              </option>
            ))}
          </select>
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {v.invDEdit ? (
            <button
              type="submit"
              style={{
                padding: "12px 24px",
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
          ) : null}
          {v.invDRead ? (
            <button
              type="button"
              onClick={v.invDToEdit}
              style={{
                padding: "12px 24px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "14px",
                cursor: "pointer",
              }}
              className="kza-h3"
            >
              {v.tEditL}
            </button>
          ) : null}
          <button
            type="button"
            onClick={v.closeInvDetail}
            style={{
              padding: "12px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(22,36,26,.2)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {v.tCancelL}
          </button>
        </div>
      </form>
    </div>
  );
}
