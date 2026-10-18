import { sx, list } from "../adminRuntime";

// Edit/add a timetable session.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function TimetableEditModal({ v }) {
  return (
    <div
      data-rsp-modal=""
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "95",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "rgba(22,36,26,.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <form
        onSubmit={v.ttSaveEdit}
        style={{
          width: "100%",
          maxWidth: "460px",
          borderRadius: "30px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          boxShadow: "0 32px 80px rgba(22,36,26,.32)",
          padding: "26px 28px",
          display: "grid",
          gap: "12px",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "22px", margin: "0" }}>
          {v.ttEditTitle}
        </h3>
        <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.72)" }}>{v.ttEditSub}</div>
        <label
          style={{
            display: "grid",
            gap: "5px",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "rgba(22,36,26,.72)",
          }}
        >
          {v.tTTGroup}{" "}
          <select value={v.ttEGroup ?? ""} onChange={v.onTTEGroup} style={sx(v.inputStyle)}>
            {list(v.ttGroupOpts).map((o, i0) => (
              <option key={o.key ?? i0} value={o.id ?? ""}>
                {o.name}
              </option>
            ))}
          </select>
        </label>
        <label
          style={{
            display: "grid",
            gap: "5px",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "rgba(22,36,26,.72)",
          }}
        >
          {v.tTTDay}{" "}
          <select value={v.ttEDay ?? ""} onChange={v.onTTEDay} style={sx(v.inputStyle)}>
            {list(v.ttDayOpts).map((o, i0) => (
              <option key={o.key ?? i0} value={o.id ?? ""}>
                {o.name}
              </option>
            ))}
          </select>
        </label>
        <div
          data-rsp="stack"
          style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "10px" }}
        >
          <label
            style={{
              display: "grid",
              gap: "5px",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.72)",
            }}
          >
            {v.tTTStart}{" "}
            <input
              type="time"
              required
              value={v.ttEStart ?? ""}
              onChange={v.onTTEStart}
              style={sx(v.inputStyle)}
            />
          </label>
          <label
            style={{
              display: "grid",
              gap: "5px",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.72)",
            }}
          >
            {v.tTTEnd}{" "}
            <input
              type="time"
              required
              value={v.ttEEnd ?? ""}
              onChange={v.onTTEEnd}
              style={sx(v.inputStyle)}
            />
          </label>
        </div>
        <label
          style={{
            display: "grid",
            gap: "5px",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "rgba(22,36,26,.72)",
          }}
        >
          {v.tTTPlace}{" "}
          <input
            type="text"
            required
            value={v.ttEPlace ?? ""}
            onChange={v.onTTEPlace}
            style={sx(v.inputStyle)}
          />
        </label>
        {v.ttEError ? (
          <div
            style={{
              borderRadius: "14px",
              background: "rgba(236,48,19,.1)",
              border: "1px solid rgba(236,48,19,.35)",
              padding: "9px 12px",
              fontSize: "13px",
              color: "#8a1a08",
            }}
          >
            {v.ttEErrorText}
          </div>
        ) : null}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
          <button
            type="submit"
            style={{
              padding: "12px 22px",
              borderRadius: "999px",
              border: "0",
              background: "#1f7a3a",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background .3s",
            }}
            className="kza-ha"
          >
            {v.tTTSave}
          </button>
          <button
            type="button"
            onClick={v.ttCancel}
            style={{
              padding: "12px 18px",
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
            {v.tTTCancel}
          </button>
          <span style={{ flex: "1" }} />
          {v.ttCanDelete ? (
            <button
              type="button"
              onClick={v.ttDelete}
              style={{
                padding: "12px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(236,48,19,.45)",
                background: "#ffffff",
                color: "#b8240e",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "14px",
                cursor: "pointer",
                transition: "background .3s",
              }}
              className="kza-hc"
            >
              {v.tTTDelete}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
