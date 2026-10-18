import { sx, list } from "../adminRuntime";

export default function TeamFundView2({ v }) {
  return (
    <>
      <button
        type="button"
        onClick={v.toggleKpiPanel}
        aria-label={v.tKpiToggle}
        title={v.tKpiToggle}
        aria-expanded={v.kpiOpen}
        style={sx(
          `position: fixed; right: ${v.kpiHandleRight ?? ""}; top: 50%; transform: translateY(-50%); z-index: 92; width: 40px; height: 62vh; padding: 0; border: 0; background: transparent; cursor: pointer; display: flex; justify-content: flex-end; align-items: center; transition: right .6s cubic-bezier(.2,.75,.18,1)`,
        )}
      >
        <span
          style={{
            position: "relative",
            display: "block",
            width: "10px",
            height: "100%",
            borderRadius: "999px 0 0 999px",
            background: "linear-gradient(180deg, #1d3a24, #1f7a3a 50%, #1d3a24)",
            boxShadow: "-4px 0 18px rgba(22,36,26,.28)",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              width: "30px",
              height: "92px",
              borderRadius: "16px 0 0 16px",
              background: "#1f7a3a",
              boxShadow: "-6px 0 20px rgba(22,36,26,.3)",
              display: "grid",
              placeItems: "center",
              color: "#f6f8f3",
              fontSize: "18px",
              lineHeight: "1",
              transition: "width .3s cubic-bezier(.2,.7,.2,1), background .3s",
            }}
            className="kza-hl"
          >
            {v.kpiArrow}
          </span>
        </span>
      </button>
      <div
        onClick={v.closeKpiPanel}
        aria-hidden="true"
        style={sx(
          `position: fixed; inset: 0; z-index: 88; background: rgba(22,36,26,.42); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); opacity: ${v.kpiScrimOpacity ?? ""}; pointer-events: ${v.kpiScrimPointer ?? ""}; transition: opacity .55s cubic-bezier(.2,.7,.2,1)`,
        )}
      />
      <aside
        data-kpi-panel=""
        data-rsp-sheet=""
        aria-label={v.tKpiPanel}
        style={sx(
          `position: fixed; top: 0; right: 0; bottom: 0; z-index: 90; width: max(75vw, min(100vw, 900px)); min-width: 320px; max-width: 100vw; overflow: hidden; box-sizing: border-box; padding: 20px 26px 22px; display: flex; flex-direction: column; gap: 14px; background: linear-gradient(165deg, #16241a, #1d3a24 55%, #16241a); color: #f6f8f3; border-radius: 34px 0 0 34px; box-shadow: -30px 0 80px rgba(0,0,0,.35); transform: ${v.kpiPanelTransform ?? ""}; transition: transform .6s cubic-bezier(.2,.75,.18,1); isolation: isolate`,
        )}
      >
        <div
          aria-hidden="true"
          style={{
            zIndex: "-1",
            position: "absolute",
            right: "-120px",
            top: "-120px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "radial-gradient(circle, rgba(116,205,133,.3), rgba(116,205,133,0) 70%)",
            filter: "blur(24px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              background: "#74cd85",
              animation: "kza-pulse 2.4s ease-in-out infinite",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "clamp(24px, 3vw, 32px)",
              margin: "0",
              flex: "1",
              minWidth: "0",
            }}
          >
            {v.tKpiPanel}
          </h2>
          <span style={{ fontSize: "13px", color: "rgba(246,248,243,.72)" }}>{v.kpiPanelSub}</span>
        </div>
        <div
          data-rsp="stack"
          style={{
            flex: "0 1 auto",
            minHeight: "0",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(220px, 260px)",
            gap: "14px",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              borderRadius: "26px",
              background: "#ffffff",
              color: "#16241a",
              padding: "18px 22px",
              minWidth: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              data-rsp="stack"
              style={{
                flex: "1",
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                gap: "22px",
                marginTop: "0",
              }}
            >
              {list(v.donuts).map((d, i0) => (
                <div key={d.key ?? i0} style={{ padding: "6px 2px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 10px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        letterSpacing: ".11em",
                        textTransform: "uppercase",
                        color: "#16241a",
                      }}
                    >
                      {d.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "15px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.full}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      alignItems: "center",
                      gap: "14px",
                      marginTop: "10px",
                      minWidth: "0",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "min(46%, clamp(90px, 18vh, 190px))",
                        aspectRatio: "1",
                        flex: "0 0 auto",
                        containerType: "inline-size",
                        filter: "drop-shadow(0 10px 18px rgba(22,36,26,.14))",
                      }}
                    >
                      <svg viewBox="0 0 160 160" style={{ width: "100%", height: "100%", display: "block" }}>
                        <g transform="rotate(-90 80 80)">
                          <circle
                            cx="80"
                            cy="80"
                            r="62"
                            fill="none"
                            stroke="rgba(22,36,26,.07)"
                            strokeWidth="24"
                          />
                          {list(d.slices).map((sl, i1) => (
                            <circle
                              key={sl.key ?? i1}
                              cx="80"
                              cy="80"
                              r="62"
                              fill="none"
                              stroke={sl.color}
                              strokeWidth="24"
                              strokeDasharray={sl.dash}
                              strokeDashoffset={sl.offset}
                              strokeLinecap="butt"
                            />
                          ))}
                        </g>
                      </svg>
                      <div
                        style={{
                          position: "absolute",
                          inset: "0",
                          display: "grid",
                          placeItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ width: "62%", overflow: "hidden" }}>
                          <div
                            style={{
                              fontSize: "clamp(11px, 8cqw, 14px)",
                              lineHeight: "1",
                              fontWeight: "700",
                              color: "rgba(22,36,26,.7)",
                            }}
                          >
                            {d.sub}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontWeight: "800",
                              fontSize: "clamp(15px, 17cqw, 30px)",
                              lineHeight: "1.05",
                              whiteSpace: "nowrap",
                              letterSpacing: "-.02em",
                              marginTop: "1px",
                            }}
                          >
                            {d.total}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: "1 1 0", minWidth: "0", display: "grid", gap: "5px" }}>
                      {list(d.legend).map((l, i1) => (
                        <div
                          key={l.key ?? i1}
                          title={l.label}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "11px minmax(0,1fr) auto",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span
                            style={sx(
                              `width: 12px; height: 12px; border-radius: 999px; background: ${l.color ?? ""}`,
                            )}
                          />
                          <span
                            style={{
                              minWidth: "0",
                              fontSize: "12.5px",
                              lineHeight: "1.2",
                              overflowWrap: "anywhere",
                              hyphens: "auto",
                              color: "rgba(22,36,26,.8)",
                            }}
                          >
                            {l.label}
                          </span>
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              fontFamily: "var(--font-heading)",
                              fontWeight: "800",
                              fontSize: "12.5px",
                            }}
                          >
                            {l.pct}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "12px",
                    }}
                  >
                    <span style={sx(d.chipStyle)}>{d.chip}</span>
                    <span style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{d.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", minHeight: "200px", color: "#16241a", minWidth: "0" }}>
            <div style={{ position: "absolute", inset: "0", display: "grid" }}>
              <div
                style={{
                  borderRadius: "26px",
                  background: "#ffffff",
                  border: "1px solid rgba(22,36,26,.12)",
                  padding: "12px 16px",
                  minHeight: "0",
                  overflow: "hidden",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2
                  style={{
                    flex: "0 0 auto",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "17px",
                    margin: "0 0 4px",
                  }}
                >
                  {v.tKpi}
                </h2>
                <div
                  style={{
                    flex: "1 1 0",
                    minHeight: "0",
                    display: "grid",
                    gridAutoRows: "minmax(0, 1fr)",
                    gap: "0",
                  }}
                >
                  {list(v.kpis).map((k, i0) => (
                    <div
                      key={k.key ?? i0}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0,1fr) auto",
                        alignItems: "center",
                        columnGap: "8px",
                        padding: "2px 0",
                        borderBottom: "1px solid rgba(22,36,26,.08)",
                      }}
                    >
                      <span
                        style={{
                          minWidth: "0",
                          fontSize: "12px",
                          lineHeight: "1.2",
                          overflowWrap: "anywhere",
                          color: "rgba(22,36,26,.75)",
                        }}
                      >
                        {k.label}
                        <span style={{ display: "block", marginTop: "2px" }}>
                          <span style={sx(k.chipStyle)}>{k.chip}</span>
                        </span>
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "clamp(14px, 2.6vh, 18px)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {k.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: "1 1 200px",
            minHeight: "190px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "26px",
            background: "#ffffff",
            color: "#16241a",
            padding: "16px 20px 12px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "18px",
                margin: "0",
                flex: "1",
                minWidth: "0",
              }}
            >
              {v.tMonthlyResult}
            </h2>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "4px",
                  background: "rgba(31,122,58,.35)",
                  border: "1px solid rgba(31,122,58,.5)",
                  boxSizing: "border-box",
                }}
              />
              {v.tIncomeLegend}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "4px",
                  background: "rgba(236,48,19,.35)",
                  border: "1px solid rgba(236,48,19,.5)",
                  boxSizing: "border-box",
                }}
              />
              {v.tExpenseLegend}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
              <span style={{ width: "18px", height: "3px", borderRadius: "999px", background: "#16241a" }} />
              {v.tResultLegend}
            </span>
            <span
              style={{
                padding: "7px 13px",
                borderRadius: "999px",
                background: "#eaf7ed",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13px",
              }}
            >
              {v.yearResultLabel}
            </span>
          </div>
          <div
            style={{
              flex: "1 1 0",
              minHeight: "0",
              display: "grid",
              gridTemplateColumns: "70px minmax(0,1fr)",
              marginTop: "12px",
            }}
          >
            <div style={{ position: "relative", height: "100%", minHeight: "0" }}>
              {list(v.resTicks).map((t, i0) => (
                <span key={t.key ?? i0} style={sx(t.labelStyle)}>
                  {t.label}
                </span>
              ))}
            </div>
            <div style={{ position: "relative", height: "100%", minHeight: "0" }}>
              {list(v.resTicks).map((t, i0) => (
                <div key={t.key ?? i0} style={sx(t.lineStyle)} />
              ))}
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  display: "grid",
                  gridTemplateColumns: "repeat(12, minmax(0,1fr))",
                }}
              >
                {list(v.resMonths).map((m, i0) => (
                  <div
                    key={m.key ?? i0}
                    onMouseEnter={m.enter}
                    onMouseLeave={v.resLeave}
                    style={sx(
                      `position: relative; height: 100%; cursor: default; opacity: ${m.opacity ?? ""}`,
                    )}
                  >
                    <span
                      style={sx(
                        `position: absolute; left: 22%; right: 22%; bottom: 50%; height: ${m.incH ?? ""}; border-radius: 8px 8px 0 0; background: ${m.incBg ?? ""}; border: 1px solid rgba(31,122,58,.45); border-bottom: 0; box-sizing: border-box; transition: height .6s cubic-bezier(.2,.7,.2,1), background .25s`,
                      )}
                    />
                    <span
                      style={sx(
                        `position: absolute; left: 22%; right: 22%; top: 50%; height: ${m.expH ?? ""}; border-radius: 0 0 8px 8px; background: ${m.expBg ?? ""}; border: 1px solid rgba(236,48,19,.4); border-top: 0; box-sizing: border-box; transition: height .6s cubic-bezier(.2,.7,.2,1), background .25s`,
                      )}
                    />
                  </div>
                ))}
              </div>
              <svg
                viewBox="0 0 1200 340"
                preserveAspectRatio="none"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "0",
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  overflow: "visible",
                }}
              >
                <path
                  d={v.resWave}
                  fill="none"
                  stroke="#16241a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {list(v.resDots).map((d, i0) => (
                <span
                  key={d.key ?? i0}
                  style={sx(
                    `position: absolute; left: ${d.left ?? ""}; top: ${d.top ?? ""}; width: ${d.size ?? ""}; height: ${d.size ?? ""}; transform: translate(-50%, -50%); border-radius: 999px; background: #ffffff; border: 3px solid #16241a; box-sizing: border-box; pointer-events: none; transition: width .2s, height .2s`,
                  )}
                />
              ))}
              {v.resTipShow ? (
                <div
                  style={sx(
                    `position: absolute; z-index: 5; left: ${v.resTipLeft ?? ""}; top: 8px; transform: translateX(${v.resTipShift ?? ""}); min-width: 190px; border-radius: 18px; background: #16241a; color: #f6f8f3; padding: 12px 14px; box-shadow: 0 16px 36px rgba(22,36,26,.3); pointer-events: none`,
                  )}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    {v.resTipMonth}
                  </div>
                  <div style={{ display: "grid", gap: "5px", fontSize: "13px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#74cd85" }}
                      />
                      <span style={{ flex: "1" }}>{v.tIncomeLegend}</span>
                      <b>{v.resTipInc}</b>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#ff7a61" }}
                      />
                      <span style={{ flex: "1" }}>{v.tExpenseLegend}</span>
                      <b>{v.resTipExp}</b>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "3px",
                        paddingTop: "7px",
                        borderTop: "1px solid rgba(246,248,243,.2)",
                      }}
                    >
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "999px",
                          border: "2px solid #f6f8f3",
                          boxSizing: "border-box",
                        }}
                      />
                      <span style={{ flex: "1" }}>{v.tResultLegend}</span>
                      <b style={sx(`color: ${v.resTipResColor ?? ""}`)}>{v.resTipRes}</b>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div
            style={{
              flex: "0 0 auto",
              display: "grid",
              gridTemplateColumns: "70px repeat(12, minmax(0,1fr))",
              marginTop: "6px",
            }}
          >
            <span />
            {list(v.resMonths).map((m, i0) => (
              <span
                key={m.key ?? i0}
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "rgba(22,36,26,.78)",
                }}
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
