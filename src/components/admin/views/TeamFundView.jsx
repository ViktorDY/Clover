import { sx, list } from "../adminRuntime";

export default function TeamFundView({ v }) {
  return (
    <div style={{ marginTop: "4px", display: "grid", gap: "16px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
        {list(v.tfPeriods).map((p, i0) => (
          <button key={p.key ?? i0} type="button" onClick={p.pick} style={sx(p.style)}>
            {p.label}
          </button>
        ))}
        {v.tfCustom ? (
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
            <input
              type="date"
              value={v.tfFrom ?? ""}
              onChange={v.onTfFrom}
              style={{
                padding: "9px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "13.5px",
              }}
            />
            <span style={{ fontSize: "13px", color: "rgba(22,36,26,.7)" }}>–</span>
            <input
              type="date"
              value={v.tfTo ?? ""}
              onChange={v.onTfTo}
              style={{
                padding: "9px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "13.5px",
              }}
            />
          </div>
        ) : null}
        <span style={{ flex: "1" }} />
        <span style={{ fontSize: "13px", color: "rgba(22,36,26,.72)" }}>{v.tfRange}</span>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}
      >
        {list(v.tfCards).map((c, i0) => (
          <div key={c.key ?? i0} style={sx(c.style)}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={sx(c.dotStyle)} />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: ".11em",
                  textTransform: "uppercase",
                  color: "rgba(22,36,26,.72)",
                }}
              >
                {c.label}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "30px",
                marginTop: "10px",
              }}
            >
              {c.value}
            </div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", marginTop: "4px" }}>{c.note}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr)",
          borderRadius: "26px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          overflow: "hidden",
        }}
      >
        {list(v.tfFlow).map((f, i0) => (
          <div key={f.key ?? i0} style={sx(f.style)}>
            <div
              style={{
                fontSize: "11.5px",
                fontWeight: "600",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.7)",
              }}
            >
              {f.label}
            </div>
            <div style={sx(f.valueStyle)}>{f.value}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          borderRadius: "26px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          padding: "22px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "21px",
              margin: "0",
              flex: "1",
              minWidth: "0",
            }}
          >
            {v.tTfTx}
          </h2>
          <span style={{ fontSize: "13px", color: "rgba(22,36,26,.72)" }}>{v.tfTxCount}</span>
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={v.toggleExport}
              aria-haspopup="true"
              aria-expanded={v.exportOpen}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid #1f7a3a",
                background: "#ffffff",
                color: "#1f7a3a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13.5px",
                cursor: "pointer",
                transition: "background .3s",
              }}
              className="kza-h3"
            >
              {v.tExport} <span style={{ fontSize: "11px" }}>▾</span>
            </button>
            {v.exportOpen ? (
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  top: "calc(100% + 8px)",
                  zIndex: "30",
                  minWidth: "230px",
                  borderRadius: "20px",
                  background: "#ffffff",
                  border: "1px solid rgba(22,36,26,.12)",
                  boxShadow: "0 20px 46px rgba(22,36,26,.24)",
                  padding: "8px",
                  display: "grid",
                  gap: "4px",
                }}
              >
                <button
                  type="button"
                  onClick={v.exportExcel}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    padding: "11px 14px",
                    borderRadius: "14px",
                    border: "0",
                    background: "transparent",
                    fontFamily: "var(--font-body)",
                    color: "#16241a",
                    transition: "background .25s",
                  }}
                  className="kza-h3"
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "14px",
                    }}
                  >
                    Excel
                  </span>{" "}
                  <span
                    style={{
                      display: "block",
                      fontSize: "12.5px",
                      color: "rgba(22,36,26,.72)",
                      marginTop: "2px",
                    }}
                  >
                    {v.tExportExcelNote}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={v.exportPdf}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    padding: "11px 14px",
                    borderRadius: "14px",
                    border: "0",
                    background: "transparent",
                    fontFamily: "var(--font-body)",
                    color: "#16241a",
                    transition: "background .25s",
                  }}
                  className="kza-h3"
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "14px",
                    }}
                  >
                    PDF
                  </span>{" "}
                  <span
                    style={{
                      display: "block",
                      fontSize: "12.5px",
                      color: "rgba(22,36,26,.72)",
                      marginTop: "2px",
                    }}
                  >
                    {v.tExportPdfNote}
                  </span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <input
          type="search"
          value={v.tfQ ?? ""}
          onChange={v.onTfQ}
          placeholder={v.tTfSearch}
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: "14px",
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
        <div style={{ overflowX: "auto", marginTop: "14px" }}>
          <div style={sx(`min-width: ${v.tfMinW ?? ""}`)}>
            <div
              style={sx(
                `display: grid; grid-template-columns: ${v.tfCols ?? ""}; gap: 12px; padding: 0 14px 10px; border-bottom: 2px solid rgba(22,36,26,.14); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)`,
              )}
            >
              <span>{v.tColDate}</span>
              <span>{v.tColTx}</span>
              {v.tfShowAcc ? <span>{v.tColAcc}</span> : null}
              <span>{v.tColInv}</span>
              <span>{v.tColDesc}</span>
              <span>{v.tColParty}</span>
              <span style={{ textAlign: "right" }}>{v.tColSum}</span>
            </div>
            <div
              style={{
                maxHeight: "372px",
                height: "auto",
                overflowY: "auto",
                overscrollBehavior: "contain",
                scrollbarWidth: "thin",
              }}
            >
              {list(v.tfTx).map((t, i0) => (
                <div
                  key={t.key ?? i0}
                  style={sx(
                    `display: grid; grid-template-columns: ${v.tfCols ?? ""}; gap: 12px; align-items: center; height: 62px; box-sizing: border-box; overflow: hidden; padding: 0 14px; border-bottom: 1px solid rgba(22,36,26,.08); font-size: 14px; transition: background .2s`,
                  )}
                  className="kza-h6"
                >
                  <span style={{ color: "rgba(22,36,26,.8)" }}>{t.date}</span>
                  <span
                    style={{
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontSize: "12.5px",
                      color: "rgba(22,36,26,.75)",
                    }}
                  >
                    {t.tx}
                  </span>
                  {t.hasClub ? (
                    <span style={{ minWidth: "0" }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "12.5px",
                          color: "#16241a",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.club}
                      </span>{" "}
                      <span
                        style={{
                          display: "block",
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                          fontSize: "12px",
                          color: "rgba(22,36,26,.75)",
                          marginTop: "2px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.acc}
                      </span>
                    </span>
                  ) : null}
                  <span
                    style={{
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontSize: "12.5px",
                      color: "rgba(22,36,26,.75)",
                    }}
                  >
                    {t.inv}
                  </span>
                  <span style={{ minWidth: "0" }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.desc}
                    </span>
                  </span>
                  <span
                    style={{
                      minWidth: "0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      color: "rgba(22,36,26,.8)",
                    }}
                  >
                    {t.party}
                  </span>
                  <span style={sx(t.sumStyle)}>{t.sum}</span>
                </div>
              ))}
              {v.tfEmpty ? (
                <div style={{ padding: "18px 14px", fontSize: "14px", color: "rgba(22,36,26,.72)" }}>
                  {v.tTfEmpty}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
            marginTop: "14px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(22,36,26,.1)",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "rgba(22,36,26,.78)",
            }}
          >
            {" "}
            {v.tPerPage}{" "}
            <select
              value={v.tfPageSize ?? ""}
              onChange={v.onTfPageSize}
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              <option value="50">50</option>
              <option value="250">250</option>
              <option value="750">750</option>
              <option value="1000">1000</option>
            </select>
          </label>
          <span style={{ flex: "1" }} />
          <span style={{ fontSize: "13px", color: "rgba(22,36,26,.78)" }}>{v.tfPageLabel}</span>
          <button
            type="button"
            onClick={v.tfPrev}
            disabled={v.tfNoPrev}
            aria-label={v.tPrevPage}
            style={sx(
              `width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-size: 15px; cursor: pointer; opacity: ${v.tfPrevOpacity ?? ""}`,
            )}
          >
            ←
          </button>
          <button
            type="button"
            onClick={v.tfNext}
            disabled={v.tfNoNext}
            aria-label={v.tNextPage}
            style={sx(
              `width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-size: 15px; cursor: pointer; opacity: ${v.tfNextOpacity ?? ""}`,
            )}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
