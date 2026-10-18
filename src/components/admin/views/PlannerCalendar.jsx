import { sx, list } from "../adminRuntime";

// Overview: "Min planlegger" calendar.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function PlannerCalendar({ v }) {
  return (
    <div
      style={{
        borderRadius: "30px",
        background: "#ffffff",
        border: "1px solid rgba(22,36,26,.12)",
        padding: "24px",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "#1f7a3a",
          marginBottom: "6px",
        }}
      >
        {v.tMyPlanner}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "20px",
            margin: "0",
            flex: "1",
            minWidth: "0",
          }}
        >
          {v.calMonthLabel}
        </h2>
        <button
          type="button"
          onClick={v.calPrev}
          aria-label={v.tPrevMonth}
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.18)",
            background: "#ffffff",
            color: "#16241a",
            fontSize: "15px",
            cursor: "pointer",
            transition: "background .3s",
          }}
          className="kza-h3"
        >
          ←
        </button>
        <button
          type="button"
          onClick={v.calNext}
          aria-label={v.tNextMonth}
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.18)",
            background: "#ffffff",
            color: "#16241a",
            fontSize: "15px",
            cursor: "pointer",
            transition: "background .3s",
          }}
          className="kza-h3"
        >
          →
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0,1fr))",
          gap: "4px",
          marginTop: "16px",
        }}
      >
        {list(v.calWeekdays).map((w, i0) => (
          <div
            key={w.key ?? i0}
            style={{
              textAlign: "center",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.75)",
              paddingBottom: "4px",
            }}
          >
            {w.label}
          </div>
        ))}
        {list(v.calCells).map((c, i0) => (
          <button key={c.key ?? i0} type="button" onClick={c.pick} style={sx(c.style)}>
            {c.day}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gap: "8px", marginTop: "16px" }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "rgba(22,36,26,.75)",
          }}
        >
          {v.calDayLabel}
        </div>
        {list(v.calDayDeadlines).map((dl, i0) => (
          <div
            key={dl.key ?? i0}
            role="button"
            tabIndex="0"
            onClick={dl.go}
            title={dl.goHint}
            style={sx(dl.style)}
            className="kza-hm"
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span
                style={{
                  flex: "1",
                  minWidth: "0",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "14.5px",
                }}
              >
                {dl.title}
              </span>
              <span style={sx(dl.tagStyle)}>{dl.tag}</span>
            </div>
            <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.75)", marginTop: "3px" }}>{dl.meta}</div>
          </div>
        ))}
        {list(v.calDayActs).map((a, i0) => (
          <div
            key={a.key ?? i0}
            style={{
              borderRadius: "18px",
              background: "#f4f8f2",
              border: "1px solid rgba(22,36,26,.1)",
              padding: "12px 14px",
            }}
          >
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "14.5px" }}>
              {a.title}
            </div>
            <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.75)", marginTop: "2px" }}>{a.meta}</div>
          </div>
        ))}
        {list(v.calDayEntries).map((e, i0) => (
          <div
            key={e.key ?? i0}
            style={{
              borderRadius: "18px",
              background: "#fff4cf",
              border: "1px solid #f2d27a",
              padding: "12px 14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span
                style={{
                  flex: "1",
                  minWidth: "0",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "14.5px",
                }}
              >
                {e.title}
              </span>
              <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#6b4a00" }}>{e.time}</span>
            </div>
            {e.hasNote ? (
              <div style={{ fontSize: "13px", color: "#4a3a12", marginTop: "4px" }}>{e.note}</div>
            ) : null}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
              {list(e.people).map((p, i1) => (
                <span
                  key={p.key ?? i1}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,.8)",
                    fontSize: "12px",
                    color: "#3d2a00",
                  }}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        {v.calDayEmpty ? (
          <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.75)" }}>{v.tNoActs}</div>
        ) : null}
        {v.calCanAdd ? (
          <>
            {v.calAddClosed ? (
              <button
                type="button"
                onClick={v.openCalAdd}
                style={{
                  justifySelf: "start",
                  marginTop: "4px",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "1px solid #1f7a3a",
                  background: "#ffffff",
                  color: "#1f7a3a",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "background .3s",
                }}
                className="kza-h3"
              >
                {v.tAddToCal}
              </button>
            ) : null}
            {v.calAddOpen ? (
              <form
                onSubmit={v.saveCalEntry}
                style={{
                  display: "grid",
                  gap: "10px",
                  marginTop: "6px",
                  borderRadius: "22px",
                  background: "#f4f8f2",
                  border: "1px solid rgba(22,36,26,.12)",
                  padding: "16px",
                }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "15px" }}>
                  {v.tNewEntry}
                </div>
                <input
                  type="text"
                  required
                  value={v.ceTitle ?? ""}
                  onChange={v.onCeTitle}
                  placeholder={v.tCeTitlePh}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "12px 16px",
                    borderRadius: "16px",
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
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 120px) minmax(0, 1fr)",
                    gap: "10px",
                  }}
                >
                  <input
                    type="time"
                    required
                    value={v.ceTime ?? ""}
                    onChange={v.onCeTime}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "12px 14px",
                      borderRadius: "16px",
                      border: "1px solid rgba(22,36,26,.18)",
                      background: "#ffffff",
                      color: "#16241a",
                      fontFamily: "var(--font-body)",
                      fontSize: "14.5px",
                      outline: "none",
                    }}
                  />
                  <input
                    type="text"
                    value={v.ceNote ?? ""}
                    onChange={v.onCeNote}
                    placeholder={v.tCeNotePh}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "12px 16px",
                      borderRadius: "16px",
                      border: "1px solid rgba(22,36,26,.18)",
                      background: "#ffffff",
                      color: "#16241a",
                      fontFamily: "var(--font-body)",
                      fontSize: "14.5px",
                      outline: "none",
                    }}
                    className="kza-fp"
                  />
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.75)",
                  }}
                >
                  {v.tShareWith}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {list(v.ceColleagues).map((c, i0) => (
                    <button key={c.key ?? i0} type="button" onClick={c.toggle} style={sx(c.style)}>
                      {c.label}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "2px" }}>
                  <button
                    type="submit"
                    style={{
                      padding: "11px 20px",
                      borderRadius: "999px",
                      border: "0",
                      background: "#1f7a3a",
                      color: "#ffffff",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "13.5px",
                      cursor: "pointer",
                      transition: "background .3s",
                    }}
                    className="kza-ha"
                  >
                    {v.ceSaveLabel}
                  </button>
                  <button
                    type="button"
                    onClick={v.closeCalAdd}
                    style={{
                      padding: "11px 18px",
                      borderRadius: "999px",
                      border: "1px solid rgba(22,36,26,.2)",
                      background: "#ffffff",
                      color: "#16241a",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "13.5px",
                      cursor: "pointer",
                    }}
                  >
                    {v.tCancel}
                  </button>
                </div>
              </form>
            ) : null}
          </>
        ) : null}
        {v.ceSentVisible ? (
          <div
            style={{
              borderRadius: "16px",
              background: "rgba(116,205,133,.22)",
              border: "1px solid rgba(116,205,133,.5)",
              padding: "10px 14px",
              fontSize: "13px",
              color: "#16241a",
            }}
          >
            {v.ceSentText}
          </div>
        ) : null}
      </div>
    </div>
  );
}
