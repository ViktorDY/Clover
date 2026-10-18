import { sx, list } from "../adminRuntime";
import ImageSlot from "../ImageSlot";

export default function EventModal({ v }) {
  return (
    <div
      data-rsp-modal=""
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "80",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "rgba(22,36,26,.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
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
          onClick={v.closeEvent}
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
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "26px",
            margin: "0 34px 6px 0",
          }}
        >
          {v.eventTitle}
        </h3>
        <div style={{ fontSize: "14px", color: "rgba(22,36,26,.75)" }}>{v.eventMeta}</div>
        {v.eventHasPhoto ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "200px",
              borderRadius: "24px",
              overflow: "hidden",
              marginTop: "16px",
            }}
          >
            <ImageSlot id={v.eventPhotoId} shape="rounded" radius="24" placeholder={v.tDropPhoto} />
          </div>
        ) : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
            marginTop: "18px",
          }}
        >
          {list(v.eventStats).map((s, i0) => (
            <div
              key={s.key ?? i0}
              style={{
                borderRadius: "22px",
                background: "#f4f8f2",
                border: "1px solid rgba(22,36,26,.1)",
                padding: "16px 18px",
              }}
            >
              <div
                style={{
                  fontSize: "11.5px",
                  fontWeight: "600",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "rgba(22,36,26,.75)",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "22px",
                  marginTop: "8px",
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
        {v.eventHasInternal ? (
          <div
            style={{
              borderRadius: "22px",
              background: "rgba(124,77,207,.08)",
              border: "1px solid rgba(124,77,207,.35)",
              padding: "16px 18px",
              marginTop: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: "600",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#4a2589",
                }}
              >
                {v.tInternalText}
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "#7c4dcf",
                  color: "#ffffff",
                  fontSize: "10.5px",
                  fontWeight: "700",
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                }}
              >
                {v.tAdminsOnly}
              </span>
            </div>
            <div
              style={{ fontSize: "14.5px", lineHeight: "1.6", marginTop: "8px", color: "rgba(22,36,26,.82)" }}
            >
              {v.eventInternal}
            </div>
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "10px",
            margin: "22px 0 12px",
          }}
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
            {v.tAnswers}
          </h4>
          {list(v.answerFilters).map((f, i0) => (
            <button key={f.key ?? i0} type="button" onClick={f.pick} style={sx(f.style)}>
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gap: "10px" }}>
          {list(v.eventAnswers).map((p, i0) => (
            <div
              key={p.key ?? i0}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "12px",
                borderRadius: "22px",
                background: "#f4f8f2",
                border: "1px solid rgba(22,36,26,.1)",
                padding: "13px 16px",
              }}
            >
              <span
                style={{
                  width: "34px",
                  height: "34px",
                  flex: "0 0 auto",
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
                {p.initials}
              </span>
              <span style={{ flex: "1", minWidth: "0" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "14.5px",
                  }}
                >
                  {p.name}
                </span>{" "}
                <span style={{ display: "block", fontSize: "12.5px", color: "rgba(22,36,26,.75)" }}>
                  {p.meta}
                </span>
              </span>
              <span style={sx(p.tagStyle)}>{p.tag}</span>
            </div>
          ))}
          {v.answersEmpty ? (
            <div style={{ fontSize: "14px", color: "rgba(22,36,26,.75)" }}>{v.tNoAnswers}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
