import { sx, list } from "../adminRuntime";

// Board meeting details, files and minutes.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function MeetingDetailModal({ v }) {
  return (
    <div
      data-rsp-modal=""
      onClick={v.mdCloseBg}
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "96",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "rgba(22,36,26,.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <article
        style={{
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "30px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          boxShadow: "0 32px 80px rgba(22,36,26,.32)",
          padding: "26px 28px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={v.mdClose}
          aria-label={v.tClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            width: "36px",
            height: "36px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.14)",
            background: "#ffffff",
            color: "#16241a",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "#1f7a3a",
          }}
        >
          {v.mdKicker}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "24px",
            margin: "6px 40px 4px 0",
          }}
        >
          {v.mdTitle}
        </h3>
        <div style={{ fontSize: "14px", color: "rgba(22,36,26,.75)" }}>{v.mdWhen}</div>
        <div
          data-rsp="stack"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "20px",
            marginTop: "18px",
            alignItems: "start",
          }}
        >
          <div style={{ minWidth: "0" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <h4
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "16px",
                  margin: "0",
                  flex: "1",
                }}
              >
                {v.mdTAttendance}
              </h4>
              <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.75)" }}>{v.mdCounts}</span>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "340px",
                aspectRatio: "1 / 1",
                margin: "12px auto 0",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "44%",
                  height: "44%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "999px",
                  background: "radial-gradient(circle at 35% 30%, #3f9a58, #1d3a24 70%)",
                  boxShadow: "inset 0 -8px 18px rgba(0,0,0,.25), 0 14px 30px rgba(22,36,26,.25)",
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  color: "#f6f8f3",
                }}
              >
                <span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "22px",
                    }}
                  >
                    {v.mdYes}
                  </span>{" "}
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "#a3e2ae",
                    }}
                  >
                    {v.tComing}
                  </span>
                </span>
              </div>
              {list(v.mdSeats).map((st, i0) => (
                <div key={st.key ?? i0} title={st.tip} style={sx(st.style)}>
                  <span style={sx(st.avatarStyle)}>{st.initials}</span>
                  <span style={sx(st.badgeStyle)}>{st.badge}</span>
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "calc(100% + 4px)",
                      transform: "translateX(-50%)",
                      fontSize: "11px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      color: "rgba(22,36,26,.8)",
                    }}
                  >
                    {st.first}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px",
                marginTop: "20px",
                fontSize: "12.5px",
                color: "rgba(22,36,26,.78)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#1f7a3a" }}
                />
                {v.tAccepted}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#d9644f" }}
                />
                {v.tDeclined}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#b9bfb7" }}
                />
                {v.tNoAnswer}
              </span>
            </div>
          </div>
          <div style={{ minWidth: "0" }}>
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "16px",
                margin: "0 0 10px",
              }}
            >
              {v.tMeetingFiles}
            </h4>
            <div style={{ display: "grid", gap: "6px" }}>
              {list(v.mdFiles).map((fl, i0) => (
                <div
                  key={fl.key ?? i0}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "34px minmax(0,1fr) auto auto",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 10px",
                    borderRadius: "14px",
                    background: "#f7f9f5",
                    border: "1px solid rgba(22,36,26,.1)",
                  }}
                >
                  <span style={sx(fl.iconStyle)}>{fl.ext}</span>
                  <span style={{ minWidth: "0" }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: "13.5px",
                        fontWeight: "600",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fl.name}
                    </span>{" "}
                    <span style={{ display: "block", fontSize: "12px", color: "rgba(22,36,26,.7)" }}>
                      {fl.meta}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={fl.open}
                    style={{
                      padding: "7px 13px",
                      borderRadius: "999px",
                      border: "1px solid rgba(22,36,26,.2)",
                      background: "#ffffff",
                      color: "#16241a",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    className="kza-h3"
                  >
                    {v.tOpenFile}
                  </button>
                  <button
                    type="button"
                    onClick={fl.remove}
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
              {v.mdNoFiles ? (
                <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)" }}>{v.tNoFiles}</div>
              ) : null}
              <label
                style={{
                  position: "relative",
                  display: "inline-flex",
                  justifySelf: "start",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "4px",
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
                {" ＋ "}
                {v.tAddMeetingFiles}{" "}
                <input
                  type="file"
                  multiple
                  accept=".pdf,application/pdf,.xls,.xlsx,.csv,image/*"
                  onChange={v.mdAddFiles}
                  style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    opacity: "0",
                    pointerEvents: "none",
                  }}
                />
              </label>
              <div style={{ fontSize: "12px", color: "rgba(22,36,26,.65)" }}>{v.tFileTypes}</div>
            </div>
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "16px",
                margin: "18px 0 8px",
              }}
            >
              {v.tAgenda}
            </h4>
            <ol
              style={{
                margin: "0",
                paddingLeft: "20px",
                display: "grid",
                gap: "4px",
                fontSize: "14px",
                lineHeight: "1.5",
                color: "rgba(22,36,26,.85)",
              }}
            >
              {list(v.mdAgenda).map((ag, i0) => (
                <li key={ag.key ?? i0}>{ag.text}</li>
              ))}
            </ol>
          </div>
        </div>
      </article>
    </div>
  );
}
