import { sx, list } from "../adminRuntime";

export default function SponsorsView({ v }) {
  return (
    <div
      data-rsp="stack"
      style={{
        marginTop: "4px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
        gap: "16px",
        alignItems: "start",
      }}
    >
      <div
        style={{
          borderRadius: "28px",
          background: "#eaf7ed",
          border: "1px solid #74cd85",
          padding: "20px 22px",
          minWidth: "0",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px" }}>
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
            {v.tGrantsHeading}
          </h2>
          <span style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{v.grantsSub}</span>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "10px", marginTop: "14px" }}
        >
          {list(v.grants).map((g, i0) => (
            <div key={g.key ?? i0} id={g.anchor} style={sx(g.cardStyle)}>
              <button
                type="button"
                onClick={g.toggle}
                aria-expanded={g.open}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) 26px",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "15px 18px",
                  border: "0",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "var(--font-body)",
                  color: "#16241a",
                }}
              >
                <span
                  style={{
                    minWidth: "0",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "8px 12px",
                  }}
                >
                  <span style={{ flex: "1 1 160px", minWidth: "0" }}>
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
                  </span>{" "}
                  <span style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {g.amount}
                    </span>{" "}
                    <span style={sx(g.tagStyle)}>{g.tag}</span>
                  </span>
                </span>{" "}
                <span
                  style={sx(
                    ` width: 26px; height: 26px; border-radius: 999px; background: #eaf7ed; color: #1f7a3a; display: grid; place-items: center; font-size: 12px; transition: transform .3s; transform: ${g.chevron ?? ""}`,
                  )}
                >
                  ▾
                </span>
              </button>
              {g.open ? (
                <div style={{ padding: "0 18px 16px", display: "grid", gap: "10px" }}>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "14.5px",
                      lineHeight: "1.6",
                      color: "rgba(22,36,26,.82)",
                    }}
                  >
                    {g.info}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", fontSize: "13.5px" }}>
                    <span style={{ fontWeight: "700", color: "#1f7a3a" }}>{v.tGrantWho}</span>
                    <span style={{ color: "rgba(22,36,26,.82)" }}>{g.who}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "11px 18px",
                        borderRadius: "999px",
                        background: "#1f7a3a",
                        color: "#ffffff",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "13.5px",
                        transition: "background .3s",
                      }}
                      className="kza-hb"
                    >
                      {v.tGrantGo} <span aria-hidden="true">↗</span>
                    </a>
                    <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.7)" }}>{g.site}</span>
                  </div>
                </div>
              ) : null}
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
          minWidth: "0",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
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
            {v.tSponsorAgreements}
          </h2>
          <button
            type="button"
            onClick={v.openNewSponsor}
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
            {v.tNewSponsor}
          </button>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "10px", marginTop: "14px" }}
        >
          {list(v.sponsorRows).map((r, i0) => (
            <div key={r.key ?? i0} id={r.anchor} style={sx(r.cardStyle)}>
              <div
                style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 40px", alignItems: "center" }}
              >
                <button
                  type="button"
                  onClick={r.toggle}
                  aria-expanded={r.open}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1fr) 26px",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px 6px 14px 16px",
                    border: "0",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-body)",
                    color: "#16241a",
                  }}
                >
                  <span
                    style={{
                      minWidth: "0",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "8px 12px",
                    }}
                  >
                    <span style={{ flex: "1 1 150px", minWidth: "0" }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "15px",
                        }}
                      >
                        {r.title}
                      </span>{" "}
                      <span
                        style={{
                          display: "block",
                          fontSize: "13px",
                          color: "rgba(22,36,26,.75)",
                          marginTop: "2px",
                        }}
                      >
                        {r.meta}
                      </span>
                    </span>{" "}
                    <span style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.amount}
                      </span>{" "}
                      <span style={sx(r.tagStyle)}>{r.tag}</span>
                    </span>
                  </span>{" "}
                  <span
                    style={sx(
                      `width: 26px; height: 26px; border-radius: 999px; background: #eaf7ed; color: #1f7a3a; display: grid; place-items: center; font-size: 12px; transition: transform .3s; transform: ${r.chevron ?? ""}`,
                    )}
                  >
                    ▾
                  </span>
                </button>
                <div style={{ position: "relative", justifySelf: "center" }}>
                  <button
                    type="button"
                    onClick={r.toggleMenu}
                    aria-label={v.tMoreOptions}
                    aria-haspopup="true"
                    aria-expanded={r.menuOpen}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "999px",
                      border: "0",
                      background: "transparent",
                      color: "#16241a",
                      fontSize: "18px",
                      lineHeight: "1",
                      cursor: "pointer",
                      transition: "background .25s",
                    }}
                    className="kza-h1"
                  >
                    ⋮
                  </button>
                  {r.menuOpen ? (
                    <div
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "calc(100% + 6px)",
                        zIndex: "40",
                        minWidth: "210px",
                        borderRadius: "18px",
                        background: "#ffffff",
                        border: "1px solid rgba(22,36,26,.12)",
                        boxShadow: "0 18px 44px rgba(22,36,26,.24)",
                        padding: "6px",
                        display: "grid",
                        gap: "2px",
                      }}
                    >
                      <label
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 12px",
                          borderRadius: "12px",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#16241a",
                          transition: "background .2s",
                        }}
                        className="kza-h3"
                      >
                        <span aria-hidden="true" style={{ width: "18px", textAlign: "center" }}>
                          ＋
                        </span>
                        {v.tMenuAddFile}{" "}
                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          multiple
                          onChange={r.addFiles}
                          style={{
                            position: "absolute",
                            width: "1px",
                            height: "1px",
                            opacity: "0",
                            pointerEvents: "none",
                          }}
                        />
                      </label>
                      {r.active ? (
                        <button
                          type="button"
                          onClick={r.askInactive}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            textAlign: "left",
                            padding: "10px 12px",
                            borderRadius: "12px",
                            border: "0",
                            background: "transparent",
                            cursor: "pointer",
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            color: "#b8240e",
                            transition: "background .2s",
                          }}
                          className="kza-hc"
                        >
                          <span aria-hidden="true" style={{ width: "18px", textAlign: "center" }}>
                            ⊘
                          </span>
                          {v.tMenuInactive}
                        </button>
                      ) : null}
                      {r.inactive ? (
                        <button
                          type="button"
                          onClick={r.reactivate}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            textAlign: "left",
                            padding: "10px 12px",
                            borderRadius: "12px",
                            border: "0",
                            background: "transparent",
                            cursor: "pointer",
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            color: "#1f7a3a",
                            transition: "background .2s",
                          }}
                          className="kza-h3"
                        >
                          <span aria-hidden="true" style={{ width: "18px", textAlign: "center" }}>
                            ↺
                          </span>
                          {v.tMenuReactivate}
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
              {r.open ? (
                <div style={{ padding: "0 16px 16px", display: "grid", gap: "10px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                      gap: "8px",
                    }}
                  >
                    {list(r.facts).map((f, i1) => (
                      <div key={f.key ?? i1} style={sx(f.style)}>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            color: "rgba(22,36,26,.7)",
                          }}
                        >
                          {f.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: "800",
                            fontSize: "14.5px",
                            marginTop: "3px",
                          }}
                        >
                          {f.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "rgba(22,36,26,.7)",
                      marginTop: "2px",
                    }}
                  >
                    {v.tReportPlan}
                  </div>
                  <div style={{ display: "grid", gap: "6px" }}>
                    {list(r.reports).map((rp, i1) => (
                      <div
                        key={rp.key ?? i1}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "minmax(0,1fr) auto",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 12px",
                          borderRadius: "14px",
                          background: "#ffffff",
                          border: "1px solid rgba(22,36,26,.1)",
                        }}
                      >
                        <span style={{ minWidth: "0" }}>
                          <span style={{ display: "block", fontSize: "13.5px", fontWeight: "600" }}>
                            {rp.title}
                          </span>{" "}
                          <span style={{ display: "block", fontSize: "12px", color: "rgba(22,36,26,.7)" }}>
                            {rp.date}
                          </span>
                        </span>
                        <span style={sx(rp.tagStyle)}>{rp.tag}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "rgba(22,36,26,.7)",
                      marginTop: "2px",
                    }}
                  >
                    {v.tSponsorFiles}
                  </div>
                  <div style={{ display: "grid", gap: "6px" }}>
                    {list(r.files).map((fl, i1) => (
                      <div
                        key={fl.key ?? i1}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "30px minmax(0,1fr) auto auto",
                          alignItems: "center",
                          gap: "10px",
                          padding: "8px 10px",
                          borderRadius: "14px",
                          background: "#ffffff",
                          border: "1px solid rgba(22,36,26,.1)",
                        }}
                      >
                        <span
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "10px",
                            background: "#eaf7ed",
                            color: "#1f7a3a",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "11px",
                            fontWeight: "800",
                          }}
                        >
                          {fl.ext}
                        </span>
                        <span style={{ minWidth: "0" }}>
                          <span
                            style={{
                              display: "block",
                              fontSize: "13.5px",
                              fontWeight: "600",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {fl.name}
                          </span>{" "}
                          <span style={{ display: "block", fontSize: "12px", color: "rgba(22,36,26,.7)" }}>
                            {fl.meta}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={fl.open}
                          style={{
                            padding: "7px 13px",
                            borderRadius: "999px",
                            border: "1px solid rgba(22,36,26,.2)",
                            background: "#ffffff",
                            color: "#16241a",
                            fontFamily: "var(--font-heading)",
                            fontWeight: "800",
                            fontSize: "12px",
                            cursor: "pointer",
                            transition: "background .3s",
                          }}
                          className="kza-h3"
                        >
                          {v.tOpenFile}
                        </button>
                        <button
                          type="button"
                          onClick={fl.remove}
                          aria-label={v.tRemoveFile}
                          title={v.tRemoveFile}
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "999px",
                            border: "1px solid rgba(22,36,26,.16)",
                            background: "#ffffff",
                            color: "rgba(22,36,26,.7)",
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {r.noFiles ? (
                      <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)" }}>{v.tNoFiles}</div>
                    ) : null}
                    <label
                      style={{
                        display: "inline-flex",
                        justifySelf: "start",
                        alignItems: "center",
                        gap: "8px",
                        padding: "9px 15px",
                        borderRadius: "999px",
                        border: "1px dashed rgba(31,122,58,.55)",
                        background: "#ffffff",
                        color: "#1f7a3a",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "12.5px",
                        cursor: "pointer",
                        transition: "background .3s",
                      }}
                      className="kza-h3"
                    >
                      <span aria-hidden="true">＋</span> {v.tAttachFile}{" "}
                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        multiple
                        onChange={r.addFiles}
                        style={{
                          position: "absolute",
                          width: "1px",
                          height: "1px",
                          opacity: "0",
                          pointerEvents: "none",
                        }}
                      />
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "4px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={r.openAgreement}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "11px 18px",
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
                      <span aria-hidden="true">📄</span> {v.tSeeAgreement}
                    </button>
                    <a
                      href={r.mailto}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "11px 18px",
                        borderRadius: "999px",
                        background: "#1f7a3a",
                        color: "#ffffff",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "13.5px",
                        transition: "background .3s",
                      }}
                      className="kza-hb"
                    >
                      <span aria-hidden="true">✉</span> {v.tSendReport}
                    </a>
                    <span style={{ fontSize: "13px", color: "rgba(22,36,26,.8)" }}>{r.contact}</span>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
