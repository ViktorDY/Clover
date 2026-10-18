import { sx, list } from "../adminRuntime";

// New board meeting form.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function MeetingFormModal({ v }) {
  return (
    <div
      data-rsp-modal=""
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "97",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "rgba(22,36,26,.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <form
        onSubmit={v.saveMeeting}
        style={{
          width: "100%",
          maxWidth: "480px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "28px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          boxShadow: "0 32px 80px rgba(22,36,26,.32)",
          padding: "26px 28px",
          boxSizing: "border-box",
          display: "grid",
          gap: "12px",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "22px", margin: "0" }}>
          {v.tNewMeetingTitle}
        </h3>
        <div
          data-rsp="stack"
          style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "10px" }}
        >
          <label style={sx(v.nsLabel)}>
            {v.tMfDate}
            <input
              type="date"
              required
              value={v.mfDate ?? ""}
              onChange={v.onMfDate}
              style={sx(v.inputStyle)}
            />
          </label>
          <label style={sx(v.nsLabel)}>
            {v.tMfTime}
            <input
              type="time"
              required
              value={v.mfTime ?? ""}
              onChange={v.onMfTime}
              style={sx(v.inputStyle)}
            />
          </label>
        </div>
        <label style={sx(v.nsLabel)}>
          {v.tMfPlace}
          <input
            type="text"
            required
            value={v.mfPlace ?? ""}
            onChange={v.onMfPlace}
            style={sx(v.inputStyle)}
          />
        </label>
        <label style={sx(v.nsLabel)}>
          {v.tMfAgenda}
          <textarea
            rows="4"
            value={v.mfAgenda ?? ""}
            onChange={v.onMfAgenda}
            placeholder={v.tMfAgendaPh}
            style={sx(v.areaStyle)}
          />
        </label>
        <div style={{ display: "grid", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={sx(v.nsLabel)}>{v.tMfInvite}</span>
            <span style={{ flex: "1" }} />
            <button
              type="button"
              onClick={v.mfPickBoard}
              style={{
                padding: "5px 11px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "11.5px",
                cursor: "pointer",
              }}
            >
              {v.tMfWholeBoard}
            </button>
            <button
              type="button"
              onClick={v.mfPickNone}
              style={{
                padding: "5px 11px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "11.5px",
                cursor: "pointer",
              }}
            >
              {v.tMfNone}
            </button>
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxHeight: "150px", overflowY: "auto" }}
          >
            {list(v.mfPeople).map((pp, i0) => (
              <button key={pp.key ?? i0} type="button" onClick={pp.toggle} style={sx(pp.style)}>
                {pp.label}
              </button>
            ))}
          </div>
          <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.72)" }}>{v.mfInviteCount}</span>
        </div>
        <div style={{ display: "grid", gap: "6px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.72)",
            }}
          >
            {v.tAttachLabel}
          </span>
          {list(v.mfFileRows).map((af, i0) => (
            <div
              key={af.key ?? i0}
              style={{
                display: "grid",
                gridTemplateColumns: "34px minmax(0,1fr) 28px",
                alignItems: "center",
                gap: "10px",
                padding: "7px 10px",
                borderRadius: "14px",
                background: "#f7f9f5",
                border: "1px solid rgba(22,36,26,.1)",
              }}
            >
              <span style={sx(af.iconStyle)}>{af.ext}</span>
              <span style={{ minWidth: "0" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {af.name}
                </span>{" "}
                <span style={{ display: "block", fontSize: "11.5px", color: "rgba(22,36,26,.7)" }}>
                  {af.meta}
                </span>
              </span>
              <button
                type="button"
                onClick={af.remove}
                aria-label={v.tRemoveFile}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.16)",
                  background: "#ffffff",
                  color: "rgba(22,36,26,.7)",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          ))}
          <label
            style={{
              position: "relative",
              display: "inline-flex",
              justifySelf: "start",
              alignItems: "center",
              gap: "8px",
              padding: "9px 15px",
              borderRadius: "999px",
              border: "1px dashed rgba(31,122,58,.55)",
              background: "#ffffff",
              color: "#1f7a3a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "12.5px",
              cursor: "pointer",
            }}
            className="kza-h3"
          >
            {" 📎 "}
            {v.tAttachAdd}{" "}
            <input
              type="file"
              multiple
              accept=".pdf,application/pdf,.xls,.xlsx,.csv,.doc,.docx,image/*"
              onChange={v.onMfFiles}
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                opacity: "0",
                pointerEvents: "none",
              }}
            />
          </label>
          <span style={{ fontSize: "11.5px", color: "rgba(22,36,26,.65)" }}>{v.tAttachTypes}</span>
        </div>
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
            }}
            className="kza-ha"
          >
            {v.tMfSave}
          </button>
          {v.mfSentShow ? (
            <a
              href={v.mfSentMailto}
              style={{ alignSelf: "center", fontSize: "13px", color: "#1f7a3a", textDecoration: "underline" }}
            >
              {v.tMfMailToo}
            </a>
          ) : null}
          <button
            type="button"
            onClick={v.closeMeetingForm}
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
            {v.tNoCancel}
          </button>
        </div>
      </form>
    </div>
  );
}
