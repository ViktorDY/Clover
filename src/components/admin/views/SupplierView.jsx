import { sx, list } from "../adminRuntime";

export default function SupplierView({ v }) {
  return (
    <div
      style={{
        borderRadius: "26px",
        background: "#ffffff",
        border: "1px solid rgba(22,36,26,.12)",
        padding: "22px 24px 8px",
        minWidth: "0",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
        <h2
          style={{
            flex: "1",
            minWidth: "220px",
            margin: "0",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "30px",
            letterSpacing: "-.02em",
          }}
        >
          <span style={{ color: "#1f7a3a" }}>{v.tSvTitle}</span>
        </h2>
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={v.svToggleExp}
            aria-expanded={v.svExpOpen}
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
              fontSize: "14px",
              cursor: "pointer",
            }}
            className="kza-h3"
          >
            {v.tSvExport}{" "}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {v.svExpOpen ? (
            <>
              <div onClick={v.svClosePops} style={{ position: "fixed", inset: "0", zIndex: "30" }} />
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  top: "calc(100% + 8px)",
                  zIndex: "31",
                  minWidth: "220px",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid rgba(22,36,26,.14)",
                  boxShadow: "0 20px 50px rgba(22,36,26,.18)",
                  padding: "6px",
                  display: "grid",
                }}
              >
                <button
                  type="button"
                  onClick={v.svExportCsv}
                  style={{
                    textAlign: "left",
                    padding: "11px 14px",
                    border: "0",
                    borderRadius: "12px",
                    background: "transparent",
                    cursor: "pointer",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "14px",
                    color: "#16241a",
                  }}
                  className="kza-h3"
                >
                  {v.tSvExportCsv}
                </button>
                <button
                  type="button"
                  onClick={v.svExportPrint}
                  style={{
                    textAlign: "left",
                    padding: "11px 14px",
                    border: "0",
                    borderRadius: "12px",
                    background: "transparent",
                    cursor: "pointer",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "14px",
                    color: "#16241a",
                  }}
                  className="kza-h3"
                >
                  {v.tSvExportPdf}
                </button>
              </div>
            </>
          ) : null}
        </div>
        <label
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 22px",
            borderRadius: "999px",
            background: "#16241a",
            color: "#f6f8f3",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background .3s",
          }}
          className="kza-hf"
        >
          <span aria-hidden="true" style={{ fontSize: "17px", lineHeight: "1" }}>
            +
          </span>{" "}
          {v.tSvCreate}{" "}
          <input
            type="file"
            accept=".pdf,application/pdf"
            multiple
            onChange={v.onPayableFiles}
            style={{ position: "absolute", width: "1px", height: "1px", opacity: "0", pointerEvents: "none" }}
          />
        </label>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          marginTop: "18px",
          border: "1px solid rgba(22,36,26,.18)",
          borderRadius: "16px",
          background: "#ffffff",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={v.svToggleFilt}
          aria-expanded={v.svFiltOpen}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 20px",
            border: "0",
            borderRight: "1px solid rgba(22,36,26,.18)",
            borderRadius: "15px 0 0 15px",
            background: "#f4f8f2",
            color: "#16241a",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "14px",
            cursor: "pointer",
          }}
          className="kza-h3"
        >
          {v.tSvFilter}{" "}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <input
          type="search"
          value={v.svQ ?? ""}
          onChange={v.onSvQ}
          placeholder={v.tSvSearch}
          aria-label={v.tSvSearch}
          style={{
            flex: "1",
            minWidth: "0",
            padding: "15px 16px",
            border: "0",
            background: "transparent",
            color: "#16241a",
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={v.svRemember}
          style={sx(
            `padding: 0 20px; border: 0; border-left: 1px solid rgba(22,36,26,.18); border-radius: 0 15px 15px 0; background: ${v.svRememberBg ?? ""}; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer`,
          )}
          className="kza-h3"
        >
          {v.svRememberLabel}
        </button>
        {v.svFiltOpen ? (
          <>
            <div onClick={v.svClosePops} style={{ position: "fixed", inset: "0", zIndex: "30" }} />
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "calc(100% + 8px)",
                zIndex: "31",
                width: "min(420px, 92vw)",
                boxSizing: "border-box",
                borderRadius: "18px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.14)",
                boxShadow: "0 20px 50px rgba(22,36,26,.18)",
                padding: "16px",
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
                  {v.tSvBooked}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {list(v.svBookedChips).map((c, i0) => (
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
                  {v.tSvReceived}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {list(v.svRecvChips).map((c, i0) => (
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
      <div style={{ margin: "18px -24px 0", overflowX: "auto" }}>
        <div style={{ minWidth: "1000px", padding: "0 24px" }}>
          <div
            style={sx(
              `display: grid; grid-template-columns: ${v.svCols ?? ""}; gap: 8px; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(22,36,26,.12); font-size: 13.5px; font-weight: 600; color: rgba(22,36,26,.75)`,
            )}
          >
            <span />
            <button
              type="button"
              onClick={v.svSortNo}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "0",
                border: "0",
                background: "transparent",
                color: "inherit",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              {v.tSvNumber}
              <span
                style={{ display: "inline-flex", flexDirection: "column", lineHeight: "0", opacity: ".5" }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 14l5-5 5 5" />
                </svg>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </span>
            </button>
            <span>{v.tSvType}</span>
            <span>{v.tSvDue}</span>
            <span>{v.tSvPO}</span>
            <span>{v.tSvSupplier}</span>
            <span>{v.tSvTitleCol}</span>
            <button
              type="button"
              onClick={v.svSortBooked}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "0",
                border: "0",
                background: "transparent",
                color: "inherit",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              {v.tSvBookedCol}
              <span
                style={{ display: "inline-flex", flexDirection: "column", lineHeight: "0", opacity: ".5" }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 14l5-5 5 5" />
                </svg>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </span>
            </button>
            <span>{v.tSvReceivedCol}</span>
            <span style={{ textAlign: "right" }}>
              <button
                type="button"
                onClick={v.svSortTotal}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0",
                  border: "0",
                  background: "transparent",
                  color: "inherit",
                  font: "inherit",
                  cursor: "pointer",
                }}
              >
                {v.tSvTotal}
                <span
                  style={{ display: "inline-flex", flexDirection: "column", lineHeight: "0", opacity: ".5" }}
                >
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 14l5-5 5 5" />
                  </svg>
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 10l5 5 5-5" />
                  </svg>
                </span>
              </button>
            </span>
            <span />
          </div>
          <div
            style={{
              maxHeight: "max(380px, calc(100vh - 470px))",
              overflowY: "auto",
              overscrollBehavior: "contain",
              scrollbarWidth: "thin",
            }}
          >
            {list(v.svRows).map((r, i0) => (
              <div key={r.key ?? i0} style={{ borderBottom: "1px solid rgba(22,36,26,.1)" }}>
                <div
                  style={sx(
                    `display: grid; grid-template-columns: ${v.svCols ?? ""}; gap: 8px; align-items: center; min-height: 54px; font-size: 14.5px; transition: background .2s`,
                  )}
                  className="kza-hx"
                >
                  <button
                    type="button"
                    onClick={r.toggle}
                    aria-expanded={r.open}
                    aria-label={v.tSvExpand}
                    style={sx(
                      `width: 30px; height: 30px; border: 0; background: transparent; color: rgba(22,36,26,.6); display: grid; place-items: center; cursor: pointer; transition: transform .25s; transform: ${r.chevRot ?? ""}`,
                    )}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <span style={{ color: "#1f7a3a", fontWeight: "600" }}>{r.no}</span>
                  <span>{r.type}</span>
                  <span>{r.due}</span>
                  <span style={{ color: "#1f7a3a" }}>{r.po}</span>
                  <span style={{ minWidth: "0" }}>
                    <span
                      style={{
                        display: "block",
                        color: "#1f7a3a",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.supplier}
                    </span>
                    {r.showClub ? (
                      <span style={{ display: "block", fontSize: "12px", color: "rgba(22,36,26,.6)" }}>
                        {r.club}
                      </span>
                    ) : null}
                  </span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.title}
                  </span>
                  <span>
                    <span style={sx(r.bookedStyle)}>{r.booked}</span>
                  </span>
                  <span>
                    <span style={sx(r.recvStyle)}>{r.recv}</span>
                  </span>
                  <span style={{ textAlign: "right", fontWeight: "500", whiteSpace: "nowrap" }}>
                    {r.total}
                  </span>
                  <span
                    style={{ position: "relative", display: "flex", justifyContent: "flex-end" }}
                    onMouseLeave={r.menuOut}
                  >
                    <button
                      type="button"
                      onMouseEnter={r.menuIn}
                      onClick={r.menuIn}
                      aria-label={v.tSvActions}
                      style={sx(
                        `width: 38px; height: 30px; border: 1px solid ${r.dotsBorder ?? ""}; border-radius: 6px; background: transparent; color: rgba(22,36,26,.6); cursor: pointer; font-size: 18px; line-height: 1; letter-spacing: 1px`,
                      )}
                    >
                      ···
                    </button>{" "}
                    {r.menuShown ? (
                      <div
                        style={{
                          position: "absolute",
                          right: "46px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: "20",
                          display: "flex",
                          alignItems: "center",
                          padding: "4px",
                          borderRadius: "12px",
                          background: "#16241a",
                          boxShadow: "0 12px 30px rgba(22,36,26,.3)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={r.undo}
                          onMouseEnter={r.undoIn}
                          onMouseLeave={r.tipOut}
                          aria-label={v.tSvUndoBook}
                          style={{
                            width: "44px",
                            height: "38px",
                            border: "0",
                            background: "transparent",
                            color: "#f6f8f3",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                            borderRadius: "8px",
                          }}
                          className="kza-hy"
                        >
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                            <path d="M3 3v5h5" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={r.copy}
                          onMouseEnter={r.copyIn}
                          onMouseLeave={r.tipOut}
                          aria-label={v.tSvCopy}
                          style={{
                            width: "44px",
                            height: "38px",
                            border: "0",
                            background: "transparent",
                            color: "#f6f8f3",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                            borderRadius: "8px",
                          }}
                          className="kza-hy"
                        >
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="8" y="8" width="13" height="13" rx="2" />
                            <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={r.look}
                          onMouseEnter={r.lookIn}
                          onMouseLeave={r.tipOut}
                          aria-label={v.tSvPreview}
                          style={{
                            width: "44px",
                            height: "38px",
                            border: "0",
                            background: "transparent",
                            color: "#f6f8f3",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                            borderRadius: "8px",
                          }}
                          className="kza-hy"
                        >
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <circle cx="11" cy="11" r="7" />
                            <path d="M21 21l-4.3-4.3" />
                          </svg>
                        </button>
                        {r.tipShown ? (
                          <span
                            style={{
                              position: "absolute",
                              bottom: "calc(100% + 8px)",
                              right: "0",
                              padding: "9px 14px",
                              borderRadius: "10px",
                              background: "#16241a",
                              color: "#f6f8f3",
                              fontSize: "14px",
                              whiteSpace: "nowrap",
                              pointerEvents: "none",
                            }}
                          >
                            {r.tipText}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </span>
                </div>
                {r.open ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "14px 28px",
                      padding: "4px 0 18px 42px",
                      fontSize: "13.5px",
                      color: "rgba(22,36,26,.8)",
                    }}
                  >
                    <span>
                      <b style={{ fontWeight: "600", color: "rgba(22,36,26,.55)" }}>{v.tSvDesc}:</b> {r.desc}
                    </span>
                    <span>
                      <b style={{ fontWeight: "600", color: "rgba(22,36,26,.55)" }}>{v.tSvDue}:</b> {r.due}
                    </span>
                    <span style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
                      <button
                        type="button"
                        onClick={r.look}
                        style={{
                          padding: "8px 15px",
                          borderRadius: "999px",
                          border: "1px solid rgba(22,36,26,.2)",
                          background: "#ffffff",
                          color: "#16241a",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "12.5px",
                          cursor: "pointer",
                        }}
                        className="kza-h3"
                      >
                        {v.tOpenInvoice}
                      </button>{" "}
                      <button
                        type="button"
                        onClick={r.payToggle}
                        style={sx(
                          `padding: 8px 15px; border-radius: 999px; border: 0; background: ${r.payBg ?? ""}; color: ${r.payInk ?? ""}; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer`,
                        )}
                      >
                        {r.payLabel}
                      </button>
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
            {v.svEmpty ? (
              <div style={{ padding: "22px 0", fontSize: "14px", color: "rgba(22,36,26,.72)" }}>
                {v.tPayEmpty}
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "14px 0 16px",
              fontSize: "15px",
              fontWeight: "500",
              borderTop: "1px solid rgba(22,36,26,.12)",
              paddingRight: "52px",
            }}
          >
            {v.svTotalAll}
          </div>
        </div>
      </div>
    </div>
  );
}
