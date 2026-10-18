import { sx, list } from "../adminRuntime";
import EventTable from "./EventTable";
import FinanceMain from "./FinanceMain";
import InvoicingView from "./InvoicingView";

// Activities card (Arrangementer › Aktiviteter).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function MainCard({ v }) {
  return (
    <div
      style={{
        borderRadius: "34px",
        background: "#ffffff",
        border: "1px solid rgba(22,36,26,.12)",
        padding: "28px",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
        {v.showCardTitle ? (
          <button
            type="button"
            onClick={v.toggleActs}
            aria-expanded={v.actsExpanded}
            style={{
              flex: "1",
              minWidth: "0",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "0",
              border: "0",
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
              color: "#16241a",
            }}
          >
            <h2
              style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "23px", margin: "0" }}
            >
              {v.listTitle}
            </h2>
            <span style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{v.actCountLabel}</span>{" "}
            <span
              style={sx(
                `flex: 0 0 auto; width: 30px; height: 30px; border-radius: 999px; background: #eaf7ed; color: #1f7a3a; display: grid; place-items: center; font-size: 13px; transition: transform .35s cubic-bezier(.2,.7,.2,1); transform: ${v.actChevron ?? ""}; display: ${v.chevDisplay ?? ""}`,
              )}
            >
              ▾
            </span>
          </button>
        ) : null}
        {v.showCompose ? (
          <button
            type="button"
            onClick={v.openCompose}
            style={{
              padding: "12px 20px",
              borderRadius: "999px",
              border: "0",
              background: "#1f7a3a",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background .3s, transform .3s cubic-bezier(.2,.7,.2,1)",
            }}
            className="kza-hq"
          >
            {v.composeLabel}
          </button>
        ) : null}
      </div>
      <div
        style={sx(`display: grid; grid-template-columns: ${v.cardCols ?? ""}; gap: 22px; align-items: start`)}
      >
        {v.showActCards ? (
          <div style={sx(v.actListStyle)}>
            {list(v.activities).map((a, i0) => (
              <button
                key={a.key ?? i0}
                type="button"
                onClick={a.open}
                style={{
                  display: "block",
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  color: "#16241a",
                  borderRadius: "26px",
                  background: "#f4f8f2",
                  border: "1px solid rgba(22,36,26,.1)",
                  padding: "18px 20px",
                  transition: "transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s",
                }}
                className="kza-hr"
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
                  <span style={{ flex: "0 0 auto", width: "52px", textAlign: "center" }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "21px",
                      }}
                    >
                      {a.day}
                    </span>{" "}
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        color: "rgba(22,36,26,.75)",
                      }}
                    >
                      {a.month}
                    </span>
                  </span>
                  <span style={{ flex: "1", minWidth: "0" }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "17px",
                      }}
                    >
                      {a.title}
                    </span>{" "}
                    <span
                      style={{
                        display: "block",
                        fontSize: "13.5px",
                        color: "rgba(22,36,26,.78)",
                        marginTop: "2px",
                      }}
                    >
                      {a.meta}
                    </span>
                  </span>
                  <span style={sx(a.tagStyle)}>{a.tag}</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    borderRadius: "999px",
                    background: "rgba(22,36,26,.1)",
                    marginTop: "14px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={sx(
                      `height: 100%; border-radius: 999px; background: linear-gradient(90deg, #74cd85, #1f7a3a); width: ${a.fill ?? ""}`,
                    )}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginTop: "10px",
                    fontSize: "13px",
                    color: "rgba(22,36,26,.75)",
                  }}
                >
                  <span>{a.signed}</span>
                  <span>{a.leader}</span>
                </div>
              </button>
            ))}
          </div>
        ) : null}
        {v.showActTable ? <EventTable v={v} /> : null}
        {v.showPostsInCard ? (
          <div style={{ minWidth: "0" }}>
            <div
              style={sx(`display: flex; align-items: center; gap: 10px; margin-top: ${v.postsTopGap ?? ""}`)}
            >
              <button
                type="button"
                onClick={v.togglePosts}
                aria-expanded={v.postsExpanded}
                style={{
                  flex: "1",
                  minWidth: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "0",
                  border: "0",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "#16241a",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "23px",
                    margin: "0",
                  }}
                >
                  {v.tPostsHeading}
                </h2>
                <span style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{v.postCountLabel}</span>{" "}
                <span
                  style={sx(
                    `flex: 0 0 auto; width: 30px; height: 30px; border-radius: 999px; background: #eaf7ed; color: #1f7a3a; display: grid; place-items: center; font-size: 13px; transition: transform .35s cubic-bezier(.2,.7,.2,1); transform: ${v.postChevron ?? ""}; display: ${v.chevDisplay ?? ""}`,
                  )}
                >
                  ▾
                </span>
              </button>
              {v.showPostHeadBtn ? (
                <button
                  type="button"
                  onClick={v.openPostCompose}
                  style={{
                    padding: "9px 16px",
                    borderRadius: "999px",
                    border: "1px solid rgba(22,36,26,.2)",
                    background: "#ffffff",
                    color: "#16241a",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "background .3s",
                  }}
                  className="kza-h3"
                >
                  {v.tNewPost}
                </button>
              ) : null}
            </div>
            {v.postsExpanded ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: "12px",
                  marginTop: "14px",
                }}
              >
                {list(v.posts).map((p, i0) => (
                  <div
                    key={p.key ?? i0}
                    style={{
                      borderRadius: "26px",
                      background: "#f4f8f2",
                      border: "1px solid rgba(22,36,26,.1)",
                      padding: "20px 22px",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "14px" }}
                      >
                        {p.club}
                      </span>
                      <span style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{p.when}</span>
                      <span style={{ flex: "1" }} />
                      <span style={sx(p.flagStyle)}>{p.flag}</span>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "18px",
                        marginTop: "10px",
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.6",
                        color: "rgba(22,36,26,.72)",
                        marginTop: "6px",
                      }}
                    >
                      {p.text}
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(22,36,26,.75)", marginTop: "12px" }}>
                      {p.meta}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {v.showFinance ? <FinanceMain v={v} /> : null}
      {v.showGrants ? (
        <>
          <div
            style={{
              borderRadius: "26px",
              background: "#eaf7ed",
              border: "1px solid #74cd85",
              padding: "20px 22px",
              marginTop: "18px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "19px",
                  margin: "0",
                  flex: "1",
                  minWidth: "0",
                }}
              >
                {v.tGrantsHeading}
              </h3>
              <span style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{v.grantsSub}</span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr)",
                gap: "10px",
                marginTop: "14px",
              }}
            >
              {list(v.grants).map((g, i0) => (
                <div
                  key={g.key ?? i0}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "12px",
                    borderRadius: "22px",
                    background: "#ffffff",
                    border: "1px solid rgba(22,36,26,.1)",
                    padding: "15px 18px",
                  }}
                >
                  <span style={{ flex: "1", minWidth: "180px" }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "15.5px",
                      }}
                    >
                      {g.name}
                    </span>{" "}
                    <span
                      style={{
                        display: "block",
                        fontSize: "13px",
                        color: "rgba(22,36,26,.75)",
                        marginTop: "2px",
                      }}
                    >
                      {g.meta}
                    </span>
                  </span>
                  <span
                    style={{
                      flex: "0 0 auto",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "14.5px",
                    }}
                  >
                    {g.amount}
                  </span>
                  <span style={sx(g.tagStyle)}>{g.tag}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.75)",
              marginTop: "24px",
            }}
          >
            {v.tSponsorAgreements}
          </div>
        </>
      ) : null}
      {v.showRows ? (
        <div
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "10px", marginTop: "18px" }}
        >
          {list(v.rows).map((r, i0) => (
            <div
              key={r.key ?? i0}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "12px",
                borderRadius: "24px",
                background: "#f4f8f2",
                border: "1px solid rgba(22,36,26,.1)",
                padding: "16px 20px",
              }}
            >
              <span style={{ flex: "1", minWidth: "0" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "16px",
                  }}
                >
                  {r.title}
                </span>{" "}
                <span
                  style={{
                    display: "block",
                    fontSize: "13.5px",
                    color: "rgba(22,36,26,.75)",
                    marginTop: "2px",
                  }}
                >
                  {r.meta}
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
                {r.amount}
              </span>
              <span style={sx(r.tagStyle)}>{r.tag}</span>
            </div>
          ))}
        </div>
      ) : null}
      {v.showInvoicing ? <InvoicingView v={v} /> : null}
    </div>
  );
}
