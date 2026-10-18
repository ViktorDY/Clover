import { sx, list } from "../adminRuntime";

// Member profile dialog.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function MemberModal({ v }) {
  return (
    <div
      data-rsp-modal=""
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "82",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "rgba(22,36,26,.75)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "88vh",
          overflowY: "auto",
          borderRadius: "34px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          boxShadow: "0 36px 90px rgba(22,36,26,.32)",
          padding: "30px 32px",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <button
          type="button"
          onClick={v.closeMember}
          aria-label={v.tClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "36px",
            height: "36px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.14)",
            background: "#ffffff",
            color: "#16241a",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background .3s",
          }}
          className="kza-h3"
        >
          ×
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span
            style={{
              width: "48px",
              height: "48px",
              flex: "0 0 auto",
              borderRadius: "999px",
              background: "#16241a",
              color: "#f6f8f3",
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "15px",
            }}
          >
            {v.memInitials}
          </span>
          <div style={{ flex: "1", minWidth: "0" }}>
            <h3
              style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "24px", margin: "0" }}
            >
              {v.memName}
            </h3>
            <div style={{ fontSize: "14px", color: "rgba(22,36,26,.75)", marginTop: "2px" }}>{v.memMeta}</div>
          </div>
        </div>
        {v.hasDue ? (
          <div
            style={{
              borderRadius: "26px",
              background: "rgba(124,77,207,.1)",
              border: "1.5px solid #7c4dcf",
              padding: "20px 22px",
              marginTop: "22px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
              <h4
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "17px",
                  margin: "0",
                  flex: "1",
                  minWidth: "0",
                  color: "#4a2589",
                }}
              >
                {v.tUnpaid}
              </h4>
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: "999px",
                  background: "#7c4dcf",
                  color: "#ffffff",
                  fontSize: "11.5px",
                  fontWeight: "700",
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                }}
              >
                {v.dueBadge}
              </span>
            </div>
            <div style={{ display: "grid", gap: "10px", marginTop: "14px" }}>
              {list(v.dueInvoices).map((d, i0) => (
                <div
                  key={d.key ?? i0}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "12px",
                    borderRadius: "20px",
                    background: "#ffffff",
                    border: "1px solid rgba(124,77,207,.3)",
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
                      {d.title}
                    </span>{" "}
                    <span
                      style={{
                        display: "block",
                        fontSize: "13px",
                        color: "rgba(22,36,26,.75)",
                        marginTop: "2px",
                      }}
                    >
                      {d.due}
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
                    {d.amount}
                  </span>
                  <span style={sx(d.tagStyle)}>{d.tag}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                alignItems: "center",
                marginTop: "14px",
              }}
            >
              <button
                type="button"
                onClick={v.sendSms}
                style={{
                  padding: "13px 22px",
                  borderRadius: "999px",
                  border: "0",
                  background: "#7c4dcf",
                  color: "#ffffff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background .3s, transform .3s cubic-bezier(.2,.7,.2,1)",
                }}
                className="kza-hn"
              >
                {v.tSendSms}
              </button>
              {v.smsSent ? (
                <span style={{ fontSize: "13.5px", color: "#4a2589" }}>{v.smsSentText}</span>
              ) : null}
            </div>
          </div>
        ) : null}
        <div style={{ marginTop: "22px" }}>
          <div
            style={{
              borderRadius: "26px",
              background: "#f4f8f2",
              border: "1px solid rgba(22,36,26,.1)",
              padding: "20px 22px",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "17px",
                margin: "0 0 12px",
              }}
            >
              {v.tProfile}
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
              }}
            >
              {list(v.memProfile).map((f, i0) => (
                <div key={f.key ?? i0}>
                  <div
                    style={{
                      fontSize: "11.5px",
                      fontWeight: "600",
                      letterSpacing: ".09em",
                      textTransform: "uppercase",
                      color: "rgba(22,36,26,.75)",
                    }}
                  >
                    {f.label}
                  </div>
                  <div style={{ fontSize: "15px", marginTop: "3px" }}>{f.value}</div>
                </div>
              ))}
            </div>
            {v.hasGuardians ? (
              <div style={{ marginTop: "18px" }}>
                <div
                  style={{
                    fontSize: "11.5px",
                    fontWeight: "600",
                    letterSpacing: ".09em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.75)",
                  }}
                >
                  {v.tGuardians}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                  {list(v.guardians).map((g, i0) => (
                    <button
                      key={g.key ?? i0}
                      type="button"
                      onClick={g.open}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "10px 16px 10px 10px",
                        borderRadius: "999px",
                        background: "#ffffff",
                        border: "1px solid rgba(22,36,26,.16)",
                        fontFamily: "var(--font-body)",
                        color: "#16241a",
                        transition: "background .3s, transform .3s cubic-bezier(.2,.7,.2,1)",
                      }}
                      className="kza-ho"
                    >
                      <span
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "999px",
                          background: "#16241a",
                          color: "#f6f8f3",
                          display: "grid",
                          placeItems: "center",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "11px",
                        }}
                      >
                        {g.initials}
                      </span>{" "}
                      <span
                        style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "14px" }}
                      >
                        {g.name}
                      </span>{" "}
                      <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.75)" }}>{g.relation}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginTop: "24px" }}
        >
          <h4
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "18px",
              margin: "0",
              flex: "1",
              minWidth: "0",
            }}
          >
            {v.tAttendance}
          </h4>
          <select
            value={v.memPeriod ?? ""}
            onChange={v.onMemPeriod}
            style={{
              padding: "10px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(22,36,26,.18)",
              background: "#f4f8f2",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {list(v.memPeriods).map((p, i0) => (
              <option key={p.key ?? i0} value={p.id ?? ""}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            borderRadius: "26px",
            background: "#f4f8f2",
            border: "1px solid rgba(22,36,26,.1)",
            padding: "20px 18px 14px",
            marginTop: "14px",
          }}
        >
          <div style={{ fontSize: "11.5px", color: "rgba(22,36,26,.75)", paddingLeft: "52px" }}>
            {v.tYAxis}
          </div>
          <div style={{ position: "relative", width: "100%", aspectRatio: "520 / 260", marginTop: "2px" }}>
            <svg
              viewBox="0 0 520 260"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: "0", width: "100%", height: "100%", display: "block" }}
            >
              {list(v.chartGrid).map((g, i0) => (
                <line
                  key={g.key ?? i0}
                  x1="52"
                  y1={g.y}
                  x2="504"
                  y2={g.y}
                  stroke="rgba(22,36,26,.12)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <line
                x1="52"
                y1="216"
                x2="504"
                y2="216"
                stroke="rgba(22,36,26,.28)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="52"
                y1="24"
                x2="52"
                y2="216"
                stroke="rgba(22,36,26,.28)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="kzaAvgFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#c9d8c4" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#c9d8c4" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="kzaMemFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1f7a3a" stopOpacity="0.42" />
                  <stop offset="1" stopColor="#1f7a3a" stopOpacity="0.04" />
                </linearGradient>
              </defs>
              <path d={v.avgArea} fill="url(#kzaAvgFill)" stroke="none" />
              <path d={v.memArea} fill="url(#kzaMemFill)" stroke="none" />
              <path
                d={v.avgPath}
                fill="none"
                stroke="#8fae86"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="7 6"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={v.memPath}
                fill="none"
                stroke="#1f7a3a"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              {list(v.memDots).map((d, i0) => (
                <circle
                  key={d.key ?? i0}
                  cx={d.x}
                  cy={d.y}
                  r="4.5"
                  fill="#1f7a3a"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {list(v.chartYTicks).map((t, i0) => (
              <span key={t.key ?? i0} style={sx(t.style)}>
                {t.label}
              </span>
            ))}
            {list(v.chartXTicks).map((t, i0) => (
              <span key={t.key ?? i0} style={sx(t.style)}>
                {t.label}
              </span>
            ))}
            {list(v.hoverZones).map((z, i0) => (
              <span key={z.key ?? i0} onMouseEnter={z.enter} onMouseLeave={z.leave} style={sx(z.style)} />
            ))}
            {v.hoverOn ? (
              <div style={sx(v.hoverStyle)}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "12.5px" }}>
                  {v.hoverLabel}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    marginTop: "5px",
                    fontSize: "12.5px",
                  }}
                >
                  <span
                    style={{ width: "12px", height: "3px", borderRadius: "999px", background: "#74cd85" }}
                  />
                  {v.hoverMem}{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    marginTop: "3px",
                    fontSize: "12.5px",
                    color: "rgba(246,248,243,.75)",
                  }}
                >
                  <span
                    style={{ width: "12px", height: "3px", borderRadius: "999px", background: "#c9d8c4" }}
                  />
                  {v.hoverAvg}{" "}
                </div>
              </div>
            ) : null}
            {v.hoverOn ? <span style={sx(v.hoverDotStyle)} /> : null}
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "18px", marginTop: "8px", paddingLeft: "6px" }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "rgba(22,36,26,.75)",
              }}
            >
              <span style={{ width: "18px", height: "3px", borderRadius: "999px", background: "#1f7a3a" }} />
              {v.memName}{" "}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "rgba(22,36,26,.75)",
              }}
            >
              <span style={{ width: "18px", height: "3px", borderRadius: "999px", background: "#8fae86" }} />
              {v.tClubAvg}{" "}
            </span>
          </div>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "14px", marginTop: "22px" }}
        >
          <div
            style={{
              borderRadius: "26px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.14)",
              padding: "20px 22px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px" }}>
              <h4
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "17px",
                  margin: "0",
                  flex: "1",
                  minWidth: "0",
                }}
              >
                {v.tNotes}
              </h4>
              <span
                style={{
                  padding: "5px 11px",
                  borderRadius: "999px",
                  background: "rgba(124,77,207,.14)",
                  color: "#5a2fa3",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                }}
              >
                {v.tNotesPrivate}
              </span>
            </div>
            <div style={{ display: "grid", gap: "10px", marginTop: "14px" }}>
              {list(v.memNotes).map((n, i0) => (
                <div
                  key={n.key ?? i0}
                  style={{
                    borderRadius: "20px",
                    background: "#f4f8f2",
                    border: "1px solid rgba(22,36,26,.1)",
                    padding: "13px 16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span
                      style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "13.5px" }}
                    >
                      {n.from}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(22,36,26,.75)" }}>{n.when}</span>
                  </div>
                  <div
                    style={{
                      fontSize: "14.5px",
                      lineHeight: "1.55",
                      marginTop: "4px",
                      color: "rgba(22,36,26,.8)",
                    }}
                  >
                    {n.text}
                  </div>
                </div>
              ))}
              {v.noNotes ? (
                <div style={{ fontSize: "14px", color: "rgba(22,36,26,.75)" }}>{v.tNoNotes}</div>
              ) : null}
            </div>
            <form
              onSubmit={v.addNote}
              style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}
            >
              <input
                type="text"
                value={v.noteDraft ?? ""}
                onChange={v.onNoteDraft}
                placeholder={v.tNotePh}
                style={{
                  flex: "1 1 200px",
                  minWidth: "0",
                  padding: "13px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.18)",
                  background: "#f4f8f2",
                  color: "#16241a",
                  fontFamily: "var(--font-body)",
                  fontSize: "14.5px",
                  outline: "none",
                }}
                className="kza-f7"
              />
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
                  transition: "background .3s",
                }}
                className="kza-ha"
              >
                {v.tAddNote}
              </button>
            </form>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
          <button
            type="button"
            onClick={v.invoiceThisMember}
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
              transition: "background .3s",
            }}
            className="kza-ha"
          >
            {v.tInvoiceMember}
          </button>
          <button
            type="button"
            onClick={v.closeMember}
            style={{
              padding: "13px 22px",
              borderRadius: "999px",
              border: "1px solid rgba(22,36,26,.2)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background .3s",
            }}
            className="kza-h3"
          >
            {v.tClose}
          </button>
        </div>
      </div>
    </div>
  );
}
