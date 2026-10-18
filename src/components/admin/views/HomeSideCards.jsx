// Overview side column: "Viktig nå", grants and quick actions.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function HomeSideCards({ v }) {
  return (
    <>
      <div
        data-rsp-pad=""
        style={{
          position: "relative",
          isolation: "isolate",
          overflow: "hidden",
          borderRadius: "30px",
          background: "#fff4cf",
          border: "1px solid #f2d27a",
          padding: "22px 24px",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            zIndex: "-1",
            position: "absolute",
            right: "-60px",
            top: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "999px",
            background: "radial-gradient(circle, rgba(255,201,74,.55), rgba(255,201,74,0) 70%)",
            filter: "blur(14px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "999px",
              background: "#e0a100",
              animation: "kza-pulse 2.4s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#6b4a00",
            }}
          >
            {v.tFocusKicker}
          </span>
          <span style={{ flex: "1" }} />
          <span
            style={{
              padding: "5px 11px",
              borderRadius: "999px",
              background: "#ffc94a",
              color: "#3d2a00",
              fontSize: "12px",
              fontWeight: "700",
              whiteSpace: "nowrap",
            }}
          >
            {v.focusCountdown}
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "21px",
            lineHeight: "1.2",
            marginTop: "12px",
            color: "#16241a",
          }}
        >
          {v.focusTitle}
        </div>
        <div style={{ fontSize: "14px", lineHeight: "1.55", color: "#4a3a12", marginTop: "6px" }}>
          {v.focusText}
        </div>
        <div
          data-rsp="stack"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: "10px",
            marginTop: "14px",
          }}
        >
          <div style={{ borderRadius: "18px", background: "rgba(255,255,255,.7)", padding: "11px 14px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: ".09em",
                textTransform: "uppercase",
                color: "#6b4a00",
              }}
            >
              {v.tResponsible}
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "14.5px",
                marginTop: "3px",
                color: "#16241a",
              }}
            >
              {v.focusOwner}
            </div>
          </div>
          <div style={{ borderRadius: "18px", background: "rgba(255,255,255,.7)", padding: "11px 14px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: ".09em",
                textTransform: "uppercase",
                color: "#6b4a00",
              }}
            >
              {v.tWhen}
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "14.5px",
                marginTop: "3px",
                color: "#16241a",
              }}
            >
              {v.focusWhen}
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={v.goSponsors}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          width: "100%",
          boxSizing: "border-box",
          marginTop: "16px",
          textAlign: "left",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          color: "#16241a",
          borderRadius: "26px",
          background: "#eaf7ed",
          border: "1px solid #74cd85",
          padding: "18px 20px",
          transition: "transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s, background .3s",
        }}
        className="kza-hs"
      >
        <span
          style={{
            width: "46px",
            height: "46px",
            flex: "0 0 auto",
            borderRadius: "999px",
            background: "#1f7a3a",
            color: "#ffffff",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "18px",
          }}
        >
          {v.grantCount}
        </span>{" "}
        <span style={{ flex: "1", minWidth: "0" }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "16px",
            }}
          >
            {v.grantTitle}
          </span>{" "}
          <span
            style={{ display: "block", fontSize: "13.5px", color: "rgba(22,36,26,.75)", marginTop: "2px" }}
          >
            {v.grantNote}
          </span>
        </span>{" "}
        <span style={{ flex: "0 0 auto", fontSize: "18px", color: "#1f7a3a" }}>→</span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0,1fr))",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        <button
          type="button"
          onClick={v.openCompose}
          style={{
            display: "grid",
            gap: "8px",
            alignContent: "start",
            textAlign: "left",
            cursor: "pointer",
            minWidth: "0",
            borderRadius: "22px",
            background: "#ffffff",
            border: "1px solid rgba(22,36,26,.12)",
            padding: "16px",
            fontFamily: "var(--font-body)",
            color: "#16241a",
            transition: "transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s",
          }}
          className="kza-ht"
        >
          <span
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              background: "#1f7a3a",
              color: "#ffffff",
              display: "grid",
              placeItems: "center",
              fontSize: "18px",
              fontWeight: "800",
            }}
          >
            ＋
          </span>{" "}
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "15px" }}>
            {v.tQuickAct}
          </span>{" "}
          <span style={{ fontSize: "12.5px", lineHeight: "1.4", color: "rgba(22,36,26,.72)" }}>
            {v.tQuickActNote}
          </span>
        </button>
        <button
          type="button"
          onClick={v.openPostCompose}
          style={{
            display: "grid",
            gap: "8px",
            alignContent: "start",
            textAlign: "left",
            cursor: "pointer",
            minWidth: "0",
            borderRadius: "22px",
            background: "#ffffff",
            border: "1px solid rgba(22,36,26,.12)",
            padding: "16px",
            fontFamily: "var(--font-body)",
            color: "#16241a",
            transition: "transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s",
          }}
          className="kza-ht"
        >
          <span
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              background: "#3b7dd8",
              color: "#ffffff",
              display: "grid",
              placeItems: "center",
              fontSize: "18px",
              fontWeight: "800",
            }}
          >
            ✎
          </span>{" "}
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "15px" }}>
            {v.tQuickPost}
          </span>{" "}
          <span style={{ fontSize: "12.5px", lineHeight: "1.4", color: "rgba(22,36,26,.72)" }}>
            {v.tQuickPostNote}
          </span>
        </button>
      </div>
    </>
  );
}
