import { sx, list } from "../adminRuntime";

export default function BoardView({ v }) {
  return (
    <div style={{ marginTop: "4px", display: "grid", gap: "16px" }}>
      <div
        data-rsp="stack"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "16px",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            position: "relative",
            isolation: "isolate",
            overflow: "hidden",
            height: "100%",
            boxSizing: "border-box",
            borderRadius: "28px",
            background: "linear-gradient(150deg, #16241a, #1d3a24 60%, #16241a)",
            color: "#f6f8f3",
            padding: "22px 24px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              zIndex: "-1",
              position: "absolute",
              right: "-70px",
              top: "-70px",
              width: "240px",
              height: "240px",
              borderRadius: "999px",
              background: "radial-gradient(circle, rgba(116,205,133,.42), rgba(116,205,133,0) 70%)",
              filter: "blur(16px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                background: "#74cd85",
                animation: "kza-pulse 2.4s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "rgba(246,248,243,.72)",
                flex: "1",
              }}
            >
              {v.tNextMeeting}
            </span>
            <span
              style={{
                padding: "5px 11px",
                borderRadius: "999px",
                background: "#a3e2ae",
                color: "#16241a",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              {v.nmCountdown}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "clamp(22px, 2.6vw, 28px)",
              margin: "12px 0 4px",
            }}
          >
            {v.nmTitle}
          </h2>
          <div style={{ fontSize: "14px", color: "rgba(246,248,243,.8)" }}>{v.nmWhen}</div>
          <ol
            style={{
              margin: "14px 0 0",
              paddingLeft: "20px",
              display: "grid",
              gap: "5px",
              fontSize: "14.5px",
              lineHeight: "1.5",
              color: "rgba(246,248,243,.9)",
            }}
          >
            {list(v.nmAgenda).map((ag, i0) => (
              <li key={ag.key ?? i0}>{ag.text}</li>
            ))}
          </ol>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "18px" }}>
            <a
              href={v.nmMailto}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 18px",
                borderRadius: "999px",
                background: "#a3e2ae",
                color: "#16241a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13.5px",
              }}
              className="kza-hi"
            >
              {"✉ "}
              {v.tSendNotice}
            </a>
          </div>
        </div>
        <div
          style={{
            borderRadius: "28px",
            background: "#ffffff",
            border: "1px solid rgba(22,36,26,.12)",
            padding: "20px 22px",
            minWidth: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "19px",
                margin: "0",
                flex: "1",
                minWidth: "0",
              }}
            >
              {v.tMeetings}
            </h2>
            <button
              type="button"
              onClick={v.openMeetingForm}
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                border: "0",
                background: "#1f7a3a",
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13px",
                cursor: "pointer",
                transition: "background .3s",
              }}
              className="kza-ha"
            >
              {v.tNewMeeting}
            </button>
          </div>
          <input
            type="search"
            value={v.meetQ ?? ""}
            onChange={v.onMeetQ}
            placeholder={v.tMeetSearch}
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginBottom: "12px",
              padding: "12px 18px",
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
          <div
            style={{
              display: "grid",
              gap: "8px",
              maxHeight: "440px",
              overflowY: "auto",
              paddingRight: "4px",
            }}
          >
            {v.meetSentShow ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "16px",
                  background: "rgba(116,205,133,.22)",
                  border: "1px solid rgba(116,205,133,.55)",
                  padding: "10px 14px",
                  fontSize: "13.5px",
                }}
              >
                <span style={{ flex: "1", minWidth: "0" }}>{v.meetSentText}</span>
                <a
                  href={v.meetSentMailto}
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "12.5px",
                    color: "#1f7a3a",
                  }}
                >
                  {"✉ "}
                  {v.tAlsoEmail}
                </a>
              </div>
            ) : null}
            {v.meetNone ? (
              <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.72)" }}>{v.tMeetNone}</div>
            ) : null}
            {list(v.meetingRows).map((mt, i0) => (
              <div
                key={mt.key ?? i0}
                role="button"
                tabIndex="0"
                onClick={mt.open}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px minmax(0,1fr) auto",
                  alignItems: "center",
                  gap: "12px",
                  borderRadius: "18px",
                  background: "#f4f8f2",
                  border: "1px solid rgba(22,36,26,.1)",
                  padding: "10px 12px",
                  cursor: "pointer",
                  transition: "transform .2s, box-shadow .2s, border-color .2s",
                }}
                className="kza-hj"
              >
                <span style={{ textAlign: "center" }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "19px",
                    }}
                  >
                    {mt.day}
                  </span>{" "}
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "rgba(22,36,26,.7)",
                    }}
                  >
                    {mt.mon}
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "14.5px",
                    }}
                  >
                    {mt.title}
                  </span>{" "}
                  <span style={{ display: "block", fontSize: "12.5px", color: "rgba(22,36,26,.72)" }}>
                    {mt.meta}
                  </span>{" "}
                  {mt.hasHit ? (
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        color: "#1f7a3a",
                        marginTop: "2px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {mt.hit}
                    </span>
                  ) : null}
                </span>
                {mt.hasMinutes ? (
                  <button
                    type="button"
                    onClick={mt.openMinutesOnly}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "999px",
                      border: "1px solid rgba(22,36,26,.2)",
                      background: "#ffffff",
                      color: "#16241a",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "12.5px",
                      cursor: "pointer",
                      transition: "background .3s",
                    }}
                    className="kza-h3"
                  >
                    {"📄 "}
                    {v.tMinutes}
                  </button>
                ) : null}
                {mt.upcoming ? (
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      background: "rgba(116,205,133,.3)",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    {v.tPlanned}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        data-rsp="stack"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "16px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            borderRadius: "28px",
            background: "#ffffff",
            border: "1px solid rgba(22,36,26,.12)",
            padding: "20px 22px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "19px",
              margin: "0 0 12px",
            }}
          >
            {v.tBoardMembers}
          </h2>
          <div style={{ display: "grid", gap: "8px" }}>
            {list(v.boardPeople).map((bp, i0) => (
              <div
                key={bp.key ?? i0}
                style={{
                  display: "grid",
                  gridTemplateColumns: "36px minmax(0,1fr) auto",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    background: "#16241a",
                    color: "#f6f8f3",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "12px",
                  }}
                >
                  {bp.initials}
                </span>
                <span style={{ minWidth: "0" }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "14.5px",
                    }}
                  >
                    {bp.name}
                  </span>{" "}
                  <span style={{ display: "block", fontSize: "12.5px", color: "rgba(22,36,26,.72)" }}>
                    {bp.club}
                  </span>
                </span>
                <span style={sx(bp.roleStyle)}>{bp.role}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            borderRadius: "28px",
            background: "#ffffff",
            border: "1px solid rgba(22,36,26,.12)",
            padding: "20px 22px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "19px",
              margin: "0 0 12px",
            }}
          >
            {v.tDecisions}
          </h2>
          <div style={{ display: "grid", gap: "8px" }}>
            {list(v.decisions).map((dc, i0) => (
              <button
                key={dc.key ?? i0}
                type="button"
                onClick={dc.toggle}
                style={{
                  display: "grid",
                  gridTemplateColumns: "22px minmax(0,1fr) auto",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  borderRadius: "16px",
                  background: "#f7f9f5",
                  border: "1px solid rgba(22,36,26,.1)",
                  padding: "10px 12px",
                  fontFamily: "var(--font-body)",
                  color: "#16241a",
                }}
              >
                <span style={sx(dc.boxStyle)}>{dc.mark}</span>{" "}
                <span style={{ minWidth: "0" }}>
                  <span style={sx(dc.titleStyle)}>{dc.title}</span>{" "}
                  <span style={{ display: "block", fontSize: "12px", color: "rgba(22,36,26,.7)" }}>
                    {dc.meta}
                  </span>
                </span>{" "}
                <span style={sx(dc.tagStyle)}>{dc.tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
