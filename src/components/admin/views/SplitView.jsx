import { sx, list } from "../adminRuntime";
import PlannerCalendar from "./PlannerCalendar";
import MainCard from "./MainCard";
import DailySide from "./DailySide";
import PlannerCalendar2 from "./PlannerCalendar2";
import VolunteerView from "./VolunteerView";
import DocsView from "./DocsView";
import PlanningView from "./PlanningView";
import CommsView from "./CommsView";
import BudgetView from "./BudgetView";
import SupplierView from "./SupplierView";

export default function SplitView({ v }) {
  return (
    <div
      data-kza-split=""
      data-rsp="stack"
      style={sx(
        `display: grid; grid-template-columns: ${v.splitCols ?? ""}; gap: 18px; margin-top: ${v.splitTop ?? ""}; align-items: ${v.splitAlign ?? ""}`,
      )}
    >
      <div
        style={sx(
          `display: grid; gap: 18px; align-content: start; min-width: 0; grid-template-columns: minmax(0, 1fr); grid-template-rows: ${v.leftRows ?? ""}`,
        )}
      >
        {v.showCalendar ? <PlannerCalendar v={v} /> : null}
        {v.showMainCard ? <MainCard v={v} /> : null}
      </div>
      <div style={{ display: "grid", gap: "16px", alignContent: "start" }}>
        {v.showFinance ? (
          <div style={{ display: "grid", gap: "16px" }}>
            <div
              style={{
                borderRadius: "30px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                padding: "24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "20px",
                  margin: "0 0 14px",
                }}
              >
                {v.tKpi}
              </h2>
              <div style={{ display: "grid", gap: "12px" }}>
                {list(v.kpis).map((k, i0) => (
                  <div key={k.key ?? i0} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{ flex: "1", minWidth: "0", fontSize: "14px", color: "rgba(22,36,26,.7)" }}>
                      {k.label}
                    </span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "17px" }}>
                      {k.value}
                    </span>
                    <span style={sx(k.chipStyle)}>{k.chip}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                borderRadius: "30px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                padding: "24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "20px",
                  margin: "0 0 14px",
                }}
              >
                {v.tLatestSpend}
              </h2>
              <div style={{ display: "grid", gap: "10px" }}>
                {list(v.spendings).map((s, i0) => (
                  <div
                    key={s.key ?? i0}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      borderRadius: "20px",
                      background: "#f4f8f2",
                      border: "1px solid rgba(22,36,26,.1)",
                      padding: "13px 16px",
                    }}
                  >
                    <span style={{ flex: "1", minWidth: "0" }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "14.5px",
                        }}
                      >
                        {s.title}
                      </span>{" "}
                      <span
                        style={{
                          display: "block",
                          fontSize: "12.5px",
                          color: "rgba(22,36,26,.75)",
                          marginTop: "2px",
                        }}
                      >
                        {s.meta}
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
                      {s.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        {v.showDailySide ? <DailySide v={v} /> : null}
        {v.showPostsBox ? (
          <div
            style={{
              borderRadius: "30px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.12)",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={v.togglePosts}
                aria-expanded={v.postsExpanded}
                style={{
                  flex: "1",
                  minWidth: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
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
                    fontSize: "20px",
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
            </div>
            {v.postsExpanded ? (
              <div style={sx(v.postListStyle)}>
                {list(v.posts).map((p, i0) => (
                  <div
                    key={p.key ?? i0}
                    style={{
                      borderRadius: "24px",
                      background: "#f4f8f2",
                      border: "1px solid rgba(22,36,26,.1)",
                      padding: "18px 20px",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "13.5px" }}
                      >
                        {p.club}
                      </span>
                      <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.75)" }}>{p.when}</span>
                      <span style={{ flex: "1" }} />
                      <span style={sx(p.flagStyle)}>{p.flag}</span>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "16.5px",
                        marginTop: "10px",
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontSize: "14.5px",
                        lineHeight: "1.6",
                        color: "rgba(22,36,26,.78)",
                        marginTop: "6px",
                      }}
                    >
                      {p.text}
                    </div>
                    <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.75)", marginTop: "10px" }}>
                      {p.meta}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        {v.showCalendar ? <PlannerCalendar2 v={v} /> : null}
        {v.showVolunteer ? <VolunteerView v={v} /> : null}
        {v.showDocs ? <DocsView v={v} /> : null}
        {v.showPlanning ? <PlanningView v={v} /> : null}
        {v.showComms ? <CommsView v={v} /> : null}
        {v.showBudget ? <BudgetView v={v} /> : null}
        {v.showIntegr ? (
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
              {v.tIntTitle}
            </h2>
            <div style={{ fontSize: "14px", color: "rgba(22,36,26,.7)", marginTop: "4px" }}>{v.tIntSub}</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "14px",
                marginTop: "20px",
              }}
            >
              {list(v.intCards).map((c, i0) => (
                <div
                  key={c.key ?? i0}
                  style={sx(
                    `display: grid; gap: 12px; align-content: start; border-radius: 20px; background: ${c.bg ?? ""}; border: 1px solid ${c.border ?? ""}; padding: 18px; transition: background .3s, border-color .3s`,
                  )}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                      style={{
                        width: "44px",
                        height: "44px",
                        flex: "0 0 auto",
                        borderRadius: "12px",
                        background: "#16241a",
                        color: "#8BCB8B",
                        display: "grid",
                        placeItems: "center",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "15px",
                      }}
                    >
                      {c.initials}
                    </span>
                    <span style={{ flex: "1", minWidth: "0" }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "16px",
                        }}
                      >
                        {c.name}
                      </span>
                      <span style={{ display: "block", fontSize: "12.5px", color: "rgba(22,36,26,.62)" }}>
                        {c.kind}
                      </span>
                    </span>
                    <span style={sx(c.pill)}>{c.status}</span>
                  </div>
                  <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "rgba(22,36,26,.78)" }}>
                    {c.desc}
                  </div>
                  <button type="button" onClick={c.toggle} style={sx(c.btn)}>
                    {c.btnLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {v.showSupplier ? <SupplierView v={v} /> : null}
        {v.showMsgBox ? (
          <div
            style={{
              borderRadius: "30px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.12)",
              padding: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "20px",
                margin: "0 0 4px",
              }}
            >
              {v.tMsgBox}
            </h2>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{v.msgBoxNote}</div>
            <form onSubmit={v.sendMsg} style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
              <select value={v.msgTo ?? ""} onChange={v.onMsgTo} style={sx(v.inputStyle)}>
                {list(v.msgTargets).map((o, i0) => (
                  <option key={o.key ?? i0} value={o.id ?? ""}>
                    {o.name}
                  </option>
                ))}
              </select>
              <textarea
                required
                value={v.msgText ?? ""}
                onChange={v.onMsgText}
                placeholder={v.tMsgPh}
                rows="3"
                style={sx(v.areaStyle)}
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
                {v.tSendMsg}
              </button>
            </form>
            <div style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
              {list(v.sentMsgs).map((m, i0) => (
                <div
                  key={m.key ?? i0}
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
                      {m.to}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(22,36,26,.75)" }}>{m.when}</span>
                  </div>
                  <div
                    style={{
                      fontSize: "14.5px",
                      lineHeight: "1.55",
                      marginTop: "4px",
                      color: "rgba(22,36,26,.78)",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {v.showSideDefault ? (
          <div style={{ display: "grid", gap: "16px" }}>
            {v.showOutstanding ? (
              <div
                style={{
                  position: "relative",
                  isolation: "isolate",
                  overflow: "hidden",
                  borderRadius: "30px",
                  background: "linear-gradient(150deg, #16241a, #1d3a24 60%, #16241a)",
                  color: "#f6f8f3",
                  padding: "24px",
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
                    background: "radial-gradient(circle, rgba(116,205,133,.46), rgba(116,205,133,0) 70%)",
                    filter: "blur(18px)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "999px",
                      background: "#74cd85",
                      animation: "kza-pulse 2.4s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "12px",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "rgba(246,248,243,.66)",
                    }}
                  >
                    {v.tOutstanding}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "32px",
                    marginTop: "10px",
                  }}
                >
                  {v.outstanding}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(246,248,243,.66)", marginTop: "4px" }}>
                  {v.outstandingNote}
                </div>
              </div>
            ) : null}
            <div
              style={{
                borderRadius: "30px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                padding: "24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "20px",
                  margin: "0 0 12px",
                }}
              >
                {v.tTodo}
              </h2>
              <div style={{ display: "grid", gap: "10px" }}>
                {list(v.todos).map((t, i0) => (
                  <div
                    key={t.key ?? i0}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                      borderRadius: "20px",
                      background: "#f4f8f2",
                      border: "1px solid rgba(22,36,26,.1)",
                      padding: "14px 16px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "999px",
                        background: "#74cd85",
                        marginTop: "7px",
                        flex: "0 0 auto",
                      }}
                    />
                    <span style={{ flex: "1", minWidth: "0" }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "15px",
                        }}
                      >
                        {t.title}
                      </span>{" "}
                      <span
                        style={{
                          display: "block",
                          fontSize: "13px",
                          color: "rgba(22,36,26,.75)",
                          marginTop: "2px",
                        }}
                      >
                        {t.meta}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
