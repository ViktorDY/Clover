import { sx, list } from "../adminRuntime";
import InvoiceAddPanel from "./InvoiceAddPanel";
import InvoiceDetail from "./InvoiceDetail";

export default function InvoicingView({ v }) {
  return (
    <>
      <div
        style={{
          borderRadius: "26px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          padding: "24px 24px 8px",
          marginTop: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            gap: "16px 20px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "30px",
                margin: "0",
                letterSpacing: "-.02em",
              }}
            >
              {v.tInvoices}
            </h2>
            <div style={{ fontSize: "13.5px", color: "#1f7a3a", fontWeight: "600", marginTop: "4px" }}>
              {v.invCountLabel}
            </div>
          </div>
          <div
            data-kza-invbar=""
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={v.toggleInvMore}
                aria-expanded={v.invMoreOpen}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  border: "0",
                  background: "#7c4dcf",
                  color: "#ffffff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "13.5px",
                  cursor: "pointer",
                  transition: "background .3s",
                }}
                className="kza-hz"
              >
                <span aria-hidden="true" style={{ fontSize: "16px", lineHeight: ".6" }}>
                  ⋮
                </span>{" "}
                {v.tInvMore}
              </button>
              {v.invMoreOpen ? (
                <>
                  <div onClick={v.closeInvPops} style={{ position: "fixed", inset: "0", zIndex: "30" }} />
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "calc(100% + 8px)",
                      zIndex: "31",
                      width: "min(340px, 92vw)",
                      boxSizing: "border-box",
                      borderRadius: "20px",
                      background: "#ffffff",
                      border: "1px solid rgba(22,36,26,.14)",
                      boxShadow: "0 20px 50px rgba(22,36,26,.18)",
                      padding: "8px",
                      display: "grid",
                      gap: "2px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={v.sendBulkSms}
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        borderRadius: "14px",
                        border: "0",
                        background: "transparent",
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                        color: "#16241a",
                      }}
                      className="kza-h10"
                    >
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "14px",
                          color: "#5a2fa3",
                        }}
                      >
                        {v.tBulkSms}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "12.5px",
                          color: "rgba(22,36,26,.7)",
                          marginTop: "3px",
                        }}
                      >
                        {v.bulkSmsNote}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={v.exportInvoices}
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        borderRadius: "14px",
                        border: "0",
                        background: "transparent",
                        cursor: "pointer",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "14px",
                        color: "#16241a",
                      }}
                      className="kza-h3"
                    >
                      {v.tInvExport}
                    </button>
                  </div>
                </>
              ) : null}
            </div>
            <label
              style={{
                position: "relative",
                display: "block",
                width: "240px",
                flex: "0 1 240px",
                minWidth: "150px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(22,36,26,.55)"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="search"
                value={v.invQ ?? ""}
                onChange={v.onInvQ}
                placeholder={v.tInvSearch}
                aria-label={v.tInvSearch}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "12px 18px 12px 42px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.18)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  outline: "none",
                }}
                className="kza-fp"
              />
            </label>
            <button
              type="button"
              onClick={v.toggleInvFilter}
              aria-expanded={v.invFilterOpen}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13.5px",
                cursor: "pointer",
              }}
              className="kza-h3"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 4h18l-7 8.5V20l-4-2v-5.5z" />
              </svg>
              {v.tInvFilter}{" "}
              <span aria-hidden="true" style={{ fontSize: "10px" }}>
                ▾
              </span>
            </button>
            <button
              type="button"
              onClick={v.openInvAdd}
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
                fontSize: "13.5px",
                cursor: "pointer",
                transition: "background .3s",
              }}
              className="kza-hf"
            >
              <span aria-hidden="true" style={{ fontSize: "16px", lineHeight: "1" }}>
                +
              </span>{" "}
              {v.tInvAdd}
            </button>
            {v.invFilterOpen ? (
              <>
                <div onClick={v.closeInvPops} style={{ position: "fixed", inset: "0", zIndex: "30" }} />
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "calc(100% + 8px)",
                    zIndex: "31",
                    width: "min(420px, 92vw)",
                    boxSizing: "border-box",
                    borderRadius: "20px",
                    background: "#ffffff",
                    border: "1px solid rgba(22,36,26,.14)",
                    boxShadow: "0 20px 50px rgba(22,36,26,.18)",
                    padding: "18px",
                    display: "grid",
                    gap: "14px",
                  }}
                >
                  <div style={{ display: "grid", gap: "8px" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "rgba(22,36,26,.7)",
                      }}
                    >
                      {v.tStatus}
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {list(v.invStatusTabs).map((c, i0) => (
                        <button key={c.key ?? i0} type="button" onClick={c.pick} style={sx(c.style)}>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "8px" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "rgba(22,36,26,.7)",
                      }}
                    >
                      {v.tClub}
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {list(v.clubTabs).map((c, i0) => (
                        <button key={c.key ?? i0} type="button" onClick={c.pick} style={sx(c.style)}>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        {v.invSent ? (
          <div
            role="status"
            style={{
              marginTop: "16px",
              borderRadius: "16px",
              background: "rgba(116,205,133,.22)",
              border: "1px solid rgba(116,205,133,.5)",
              padding: "12px 16px",
              fontSize: "14px",
            }}
          >
            {v.invSentText}
          </div>
        ) : null}
        <div style={{ margin: "18px -24px 0", overflowX: "auto" }}>
          <div style={{ minWidth: "940px" }}>
            <div
              style={sx(
                `display: grid; grid-template-columns: ${v.invCols ?? ""}; gap: 12px; padding: 14px 24px; background: #f4f8f2; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 12px; font-weight: 600; color: rgba(22,36,26,.7)`,
              )}
            >
              <span>ID</span>
              <span>{v.tColType}</span>
              <span>{v.tColNumber}</span>
              <span>{v.tColIssued}</span>
              <span>{v.tColName}</span>
              <span>{v.tColAmount}</span>
              <span>{v.tColStatus}</span>
              <span>{v.tColDetails}</span>
            </div>
            <div
              style={{
                maxHeight: "max(420px, calc(100vh - 430px))",
                overflowY: "auto",
                overscrollBehavior: "contain",
                scrollbarWidth: "thin",
              }}
            >
              {list(v.invRows).map((r, i0) => (
                <div
                  key={r.key ?? i0}
                  style={sx(
                    `display: grid; grid-template-columns: ${v.invCols ?? ""}; gap: 12px; align-items: center; padding: 0 24px; height: 54px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 13.5px; transition: background .2s`,
                  )}
                  className="kza-hx"
                >
                  <span style={{ color: "rgba(22,36,26,.8)" }}>{r.id}</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.type}
                  </span>
                  <span style={{ color: "rgba(22,36,26,.8)" }}>{r.number}</span>
                  <span style={{ color: "rgba(22,36,26,.8)" }}>{r.date}</span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontWeight: "500",
                    }}
                  >
                    {r.name}
                  </span>
                  <span style={{ fontWeight: "500" }}>{r.amount}</span>
                  <span>
                    <span style={sx(r.statusStyle)}>{r.statusLabel}</span>
                  </span>
                  <span style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={r.view}
                      aria-label={v.tView}
                      title={v.tView}
                      style={{
                        width: "38px",
                        height: "28px",
                        borderRadius: "999px",
                        border: "1px solid rgba(22,36,26,.18)",
                        background: "#ffffff",
                        color: "#16241a",
                        display: "grid",
                        placeItems: "center",
                        cursor: "pointer",
                        transition: "background .2s, color .2s",
                      }}
                      className="kza-h3"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={r.edit}
                      aria-label={v.tEditL}
                      title={v.tEditL}
                      style={{
                        width: "38px",
                        height: "28px",
                        borderRadius: "999px",
                        border: "1px solid rgba(22,36,26,.18)",
                        background: "#ffffff",
                        color: "#16241a",
                        display: "grid",
                        placeItems: "center",
                        cursor: "pointer",
                        transition: "background .2s, color .2s",
                      }}
                      className="kza-h3"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={r.del}
                      aria-label={v.tDelete}
                      title={v.tDelete}
                      style={{
                        width: "38px",
                        height: "28px",
                        borderRadius: "999px",
                        border: "1px solid rgba(22,36,26,.18)",
                        background: "#ffffff",
                        color: "#16241a",
                        display: "grid",
                        placeItems: "center",
                        cursor: "pointer",
                        transition: "background .2s, color .2s",
                      }}
                      className="kza-h3"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </span>
                </div>
              ))}
              {v.invEmpty ? (
                <div style={{ padding: "22px 24px", fontSize: "14px", color: "rgba(22,36,26,.72)" }}>
                  {v.tInvEmpty}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {v.invAddOpen ? <InvoiceAddPanel v={v} /> : null}
      {v.invDetail ? <InvoiceDetail v={v} /> : null}
    </>
  );
}
