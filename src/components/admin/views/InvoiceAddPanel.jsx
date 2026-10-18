import { sx, list } from "../adminRuntime";

export default function InvoiceAddPanel({ v }) {
  return (
    <div
      data-rsp-modal=""
      onClick={v.closeInvAdd}
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "98",
        display: "grid",
        placeItems: "center",
        padding: "20px",
        background: "rgba(22,36,26,.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label={v.tInvAdd}
        onClick={v.stopClick}
        onSubmit={v.sendInvoice}
        style={{
          width: "100%",
          maxWidth: "960px",
          maxHeight: "calc(100vh - 40px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxSizing: "border-box",
          borderRadius: "26px",
          background: "#ffffff",
          boxShadow: "0 32px 80px rgba(22,36,26,.32)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "20px 24px",
            borderBottom: "1px solid rgba(22,36,26,.1)",
          }}
        >
          <h3
            style={{
              flex: "1",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "22px",
              margin: "0",
            }}
          >
            {v.tInvoiceMerged}
          </h3>
          <button
            type="button"
            onClick={v.closeInvAdd}
            aria-label={v.tClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "999px",
              border: "1px solid rgba(22,36,26,.14)",
              background: "#ffffff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <div
          data-rsp="stack"
          style={{
            flex: "1",
            minHeight: "0",
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)",
            alignItems: "stretch",
            alignContent: "stretch",
          }}
        >
          <div style={{ display: "grid", gap: "14px", padding: "22px 24px" }}>
            <p style={{ margin: "0", fontSize: "14px", color: "rgba(22,36,26,.75)" }}>{v.tInvoiceNote}</p>
            <label
              style={{
                display: "grid",
                gap: "6px",
                fontSize: "11.5px",
                fontWeight: "600",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.6)",
              }}
            >
              {v.tSendTo}{" "}
              <select value={v.invScope ?? ""} onChange={v.onInvScope} style={sx(v.inputStyleWhite)}>
                {list(v.invScopes).map((o, i0) => (
                  <option key={o.key ?? i0} value={o.id ?? ""}>
                    {o.name}
                  </option>
                ))}
              </select>
            </label>
            {v.pickClub ? (
              <label
                style={{
                  display: "grid",
                  gap: "6px",
                  fontSize: "11.5px",
                  fontWeight: "600",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "rgba(22,36,26,.6)",
                }}
              >
                {v.tClub}{" "}
                <select value={v.invTarget ?? ""} onChange={v.onInvTarget} style={sx(v.inputStyleWhite)}>
                  {list(v.invTargets).map((o, i0) => (
                    <option key={o.key ?? i0} value={o.id ?? ""}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            {v.pickChosen ? (
              <div
                style={{
                  borderRadius: "16px",
                  background: "rgba(116,205,133,.2)",
                  border: "1px solid rgba(116,205,133,.5)",
                  padding: "10px 14px",
                  fontSize: "14px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "11.5px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.6)",
                  }}
                >
                  {v.tChosen}
                </span>
                <span style={{ display: "block", fontWeight: "600", marginTop: "3px" }}>{v.chosenName}</span>
              </div>
            ) : null}
            <input
              type="text"
              required
              value={v.invTitle ?? ""}
              onChange={v.onInvTitle}
              placeholder={v.tInvTitlePh}
              style={sx(v.inputStyleWhite)}
            />
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "12px" }}>
              <input
                type="number"
                min="1"
                required
                value={v.invAmount ?? ""}
                onChange={v.onInvAmount}
                placeholder={v.tInvAmountPh}
                style={sx(v.inputStyleWhite)}
              />
              <input
                type="date"
                required
                value={v.invDue ?? ""}
                onChange={v.onInvDue}
                style={sx(v.inputStyleWhite)}
              />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <button
                type="submit"
                style={{
                  padding: "14px 24px",
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
                {v.tSendInvoice}
              </button>
              <span style={{ fontSize: "13.5px", color: "rgba(22,36,26,.78)" }}>{v.invRecipients}</span>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gap: "18px",
              alignContent: "start",
              padding: "22px 24px",
              background: "#f4f8f2",
              borderLeft: "1px solid rgba(22,36,26,.08)",
            }}
          >
            {v.pickList ? (
              <div style={{ display: "grid", gap: "10px" }}>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.6)",
                  }}
                >
                  {v.pickHeading}
                </span>
                <input
                  type="search"
                  value={v.invPQ ?? ""}
                  onChange={v.onInvPQ}
                  placeholder={v.tPickSearch}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px 16px",
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
                <div
                  style={{
                    display: "grid",
                    gap: "6px",
                    maxHeight: "220px",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                  }}
                >
                  {list(v.pickRows).map((p, i0) => (
                    <button key={p.key ?? i0} type="button" onClick={p.pick} style={sx(p.style)}>
                      <span style={{ display: "block", fontWeight: "600", fontSize: "14px" }}>{p.label}</span>
                      <span style={{ display: "block", fontSize: "12.5px", opacity: ".72" }}>{p.sub}</span>
                    </button>
                  ))}
                  {v.pickEmpty ? (
                    <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.7)" }}>{v.tInvNoMatch}</div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {v.pickEvent ? (
              <div style={{ display: "grid", gap: "10px" }}>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.6)",
                  }}
                >
                  {v.tEvSearchHead}
                </span>
                <input
                  type="search"
                  value={v.invEvQ ?? ""}
                  onChange={v.onInvEvQ}
                  placeholder={v.tEvSearchPh}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px 16px",
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
                {v.evHasQuery ? (
                  <div
                    style={{
                      display: "grid",
                      gap: "6px",
                      maxHeight: "200px",
                      overflowY: "auto",
                      scrollbarWidth: "thin",
                    }}
                  >
                    {list(v.evResults).map((p, i0) => (
                      <button key={p.key ?? i0} type="button" onClick={p.pick} style={sx(p.style)}>
                        <span style={{ display: "block", fontWeight: "600", fontSize: "14px" }}>
                          {p.label}
                        </span>
                        <span style={{ display: "block", fontSize: "12.5px", opacity: ".72" }}>{p.sub}</span>
                      </button>
                    ))}
                    {v.evResEmpty ? (
                      <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.7)" }}>{v.tInvNoMatch}</div>
                    ) : null}
                  </div>
                ) : null}
                <span
                  style={{
                    marginTop: "6px",
                    fontSize: "11.5px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.6)",
                  }}
                >
                  {v.tPickEvent}
                </span>
                <div
                  style={{
                    borderRadius: "18px",
                    background: "#ffffff",
                    border: "1px solid rgba(22,36,26,.1)",
                    padding: "14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <button
                      type="button"
                      onClick={v.ivCalPrev}
                      aria-label={v.ivTPrev}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "999px",
                        border: "1px solid rgba(22,36,26,.16)",
                        background: "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      ‹
                    </button>
                    <span
                      style={{
                        flex: "1",
                        textAlign: "center",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "15px",
                      }}
                    >
                      {v.ivCalTitle}
                    </span>
                    <button
                      type="button"
                      onClick={v.ivCalNext}
                      aria-label={v.ivTNext}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "999px",
                        border: "1px solid rgba(22,36,26,.16)",
                        background: "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      ›
                    </button>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                      gap: "4px",
                      textAlign: "center",
                    }}
                  >
                    {list(v.ivCalHead).map((h, i0) => (
                      <span
                        key={h.key ?? i0}
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "rgba(22,36,26,.55)",
                          padding: "2px 0",
                        }}
                      >
                        {h.label}
                      </span>
                    ))}
                    {list(v.ivCalCells).map((c, i0) => (
                      <button
                        key={c.key ?? i0}
                        type="button"
                        onClick={c.pick}
                        disabled={c.off}
                        style={sx(c.style)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gap: "6px" }}>
                  {list(v.ivCalEvents).map((p, i0) => (
                    <button key={p.key ?? i0} type="button" onClick={p.pick} style={sx(p.style)}>
                      <span style={{ display: "block", fontWeight: "600", fontSize: "14px" }}>{p.label}</span>
                      <span style={{ display: "block", fontSize: "12.5px", opacity: ".72" }}>{p.sub}</span>
                    </button>
                  ))}
                  {v.ivCalNoEvents ? (
                    <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.7)" }}>{v.ivTCalHint}</div>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div style={sx(`display: grid; gap: 10px; ${v.manualTop ?? ""}`)}>
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: "600",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "rgba(22,36,26,.6)",
                }}
              >
                {v.tManual}
              </span>
              <input
                type="search"
                value={v.invManQ ?? ""}
                onChange={v.onInvManQ}
                placeholder={v.tManualSearch}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "11px 16px",
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
              {v.manHasRes ? (
                <div
                  style={{
                    display: "grid",
                    gap: "4px",
                    borderRadius: "16px",
                    background: "#ffffff",
                    border: "1px solid rgba(22,36,26,.1)",
                    padding: "6px",
                  }}
                >
                  {list(v.manRes).map((p, i0) => (
                    <button
                      key={p.key ?? i0}
                      type="button"
                      onClick={p.add}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textAlign: "left",
                        width: "100%",
                        padding: "8px 10px",
                        border: "0",
                        borderRadius: "12px",
                        background: "transparent",
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                        color: "#16241a",
                      }}
                      className="kza-h3"
                    >
                      <span style={{ flex: "1", minWidth: "0" }}>
                        <span style={{ display: "block", fontWeight: "600", fontSize: "14px" }}>
                          {p.name}
                        </span>
                        <span style={{ display: "block", fontSize: "12.5px", color: "rgba(22,36,26,.65)" }}>
                          {p.sub}
                        </span>
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "13px",
                          color: "#1f7a3a",
                        }}
                      >
                        {"+ "}
                        {v.tAddL}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
              {v.manHasChips ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {list(v.manChips).map((p, i0) => (
                    <span
                      key={p.key ?? i0}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 6px 6px 12px",
                        borderRadius: "999px",
                        background: "#16241a",
                        color: "#f6f8f3",
                        fontSize: "13px",
                      }}
                    >
                      {p.name}
                      <button
                        type="button"
                        onClick={p.remove}
                        aria-label={v.tRemoveL}
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "999px",
                          border: "0",
                          background: "rgba(246,248,243,.2)",
                          color: "#f6f8f3",
                          cursor: "pointer",
                          fontSize: "12px",
                          lineHeight: "1",
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
