import { sx, list } from "../adminRuntime";
import VolunteerDetail from "./VolunteerDetail";

// Arrangementer › Dugnader: QR check-in and hours.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function VolunteerView({ v }) {
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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "12px 20px" }}>
        <div style={{ flex: "1", minWidth: "240px" }}>
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
            {v.tVgTitle}
          </h2>
          <div
            style={{
              fontSize: "14px",
              lineHeight: "1.5",
              color: "rgba(22,36,26,.72)",
              marginTop: "6px",
              maxWidth: "640px",
            }}
          >
            {v.tVgIntro}
          </div>
        </div>
        <button
          type="button"
          onClick={v.vgToggleForm}
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
          {v.tVgNew}
        </button>
      </div>
      {v.vgFormOpen ? (
        <form
          onSubmit={v.vgSave}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
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
            {v.tVgName}
            <input
              type="text"
              required
              value={v.vgName ?? ""}
              onChange={v.onVgName}
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
            {v.tVgDate}
            <input
              type="date"
              required
              value={v.vgDate ?? ""}
              onChange={v.onVgDate}
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
            {v.tVgTime}
            <input
              type="time"
              required
              value={v.vgTime ?? ""}
              onChange={v.onVgTime}
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
            {v.tVgPlace}
            <input
              type="text"
              required
              value={v.vgPlace ?? ""}
              onChange={v.onVgPlace}
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
            {v.tVgLead}
            <input
              type="text"
              required
              value={v.vgLead ?? ""}
              onChange={v.onVgLead}
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
            {v.tVgHours}
            <input
              type="number"
              min="0.5"
              step="0.5"
              required
              value={v.vgHours ?? ""}
              onChange={v.onVgHours}
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
            {v.tVgCreate}
          </button>
        </form>
      ) : null}
      <div
        data-rsp="stack"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.7fr)",
          gap: "18px",
          marginTop: "20px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "10px",
            maxHeight: "max(420px, calc(100vh - 380px))",
            overflowY: "auto",
            scrollbarWidth: "thin",
            padding: "2px",
          }}
        >
          {list(v.vgList).map((g, i0) => (
            <button key={g.key ?? i0} type="button" onClick={g.pick} style={sx(g.style)} className="kza-hu">
              <span style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
                <span
                  style={{
                    flex: "1",
                    minWidth: "0",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "15.5px",
                    textAlign: "left",
                  }}
                >
                  {g.name}
                </span>
                <span style={sx(g.pill)}>{g.status}</span>
              </span>{" "}
              <span
                style={{
                  display: "block",
                  fontSize: "13px",
                  color: "rgba(22,36,26,.7)",
                  textAlign: "left",
                  marginTop: "4px",
                }}
              >
                {g.when}
                {" · "}
                {g.place}
              </span>{" "}
              <span
                style={{
                  display: "block",
                  fontSize: "12.5px",
                  color: "rgba(22,36,26,.6)",
                  textAlign: "left",
                  marginTop: "2px",
                }}
              >
                {g.sum}
              </span>
            </button>
          ))}
        </div>
        {v.vgHasSel ? <VolunteerDetail v={v} /> : null}
      </div>
    </div>
  );
}
