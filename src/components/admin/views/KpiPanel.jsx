import Hv from "../../Hv";
import { sx, list } from "../adminRuntime";

// Slide-out key-figures panel on the team fund page.
// [design 17 Nov] light panel (#f6f8f3) with a period filter next to the
// title, slimmer donuts and white cards.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function KpiPanel({ v }) {
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
        <span style={sx("position: relative; display: block; width: 10px; height: 100%; border-radius: 999px 0 0 999px; background: linear-gradient(180deg, #1d3a24, #1f7a3a 50%, #1d3a24); box-shadow: -4px 0 18px rgba(22,36,26,.28)")}>
          <span
            style={sx("position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 30px; height: 92px; border-radius: 16px 0 0 16px; background: #1f7a3a; box-shadow: -6px 0 20px rgba(22,36,26,.3); display: grid; place-items: center; color: #f6f8f3; font-size: 18px; line-height: 1; transition: width .3s cubic-bezier(.2,.7,.2,1), background .3s")}
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
          `position: fixed; top: 0; right: 0; bottom: 0; z-index: 90; width: max(75vw, min(100vw, 900px)); min-width: 320px; max-width: 100vw; overflow: hidden; box-sizing: border-box; padding: 26px 30px 26px; display: flex; flex-direction: column; gap: 16px; background: #f6f8f3; color: #16241a; border-left: 1px solid rgba(22,36,26,.12); border-radius: 28px 0 0 28px; box-shadow: -24px 0 60px rgba(22,36,26,.14); transform: ${v.kpiPanelTransform ?? ""}; transition: transform .6s cubic-bezier(.2,.75,.18,1); isolation: isolate`,
        )}
      >
        <div style={sx("flex: 0 0 auto; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; padding-bottom: 14px; border-bottom: 1px solid rgba(22,36,26,.12)")}>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; flex: 1; min-width: 0")}>
            <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: clamp(24px, 2.6vw, 30px); letter-spacing: -.02em; margin: 0")}>{v.tKpiPanel}</h2>
            <div style={sx("position: relative")}>
              <Hv
                as="button"
                type="button"
                onClick={v.tfPerToggle}
                aria-haspopup="true"
                aria-expanded={!!v.tfPerOpen}
                style="display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-weight: 600; font-size: 13.5px; cursor: pointer"
                hover="background: #eaf4e7"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 5h16l-6 7.5V19l-4 1v-7.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                {v.tfPerLabel}
                <span style={sx("font-size: 10px")}>▾</span>
              </Hv>
              {v.tfPerOpen ? (
                <div style={sx("position: absolute; left: 0; top: calc(100% + 6px); z-index: 40; min-width: 240px; border-radius: 16px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); box-shadow: 0 18px 40px rgba(22,36,26,.22); padding: 6px; display: grid; gap: 2px")}>
                  {list(v.tfPerItems).map((p, i) => (
                    <Hv as="button" key={p.key ?? i} type="button" onClick={p.pick} style={p.style} hover="background: #eaf4e7">
                      <span>{p.label}</span>
                      <span style={sx("color: #1f7a3a; font-weight: 800")}>{p.mark}</span>
                    </Hv>
                  ))}
                  {v.tfCustom ? (
                    <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px 8px 4px; border-top: 1px solid rgba(22,36,26,.1); margin-top: 4px")}>
                      <input type="date" value={v.tfFrom ?? ""} onChange={v.onTfFrom} style={sx("padding: 7px 12px; border-radius: 10px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 13px")} />
                      <span style={sx("font-size: 13px; color: rgba(22,36,26,.7)")}>–</span>
                      <input type="date" value={v.tfTo ?? ""} onChange={v.onTfTo} style={sx("padding: 7px 12px; border-radius: 10px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 13px")} />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          <span style={sx("font-size: 13.5px; color: rgba(22,36,26,.6)")}>{v.kpiPanelSub}</span>
        </div>
        <div data-rsp="stack" style={sx("flex: 0 1 auto; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr) minmax(220px, 260px); gap: 14px; align-items: stretch")}>
          <div style={sx("border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); color: #16241a; padding: 20px 24px; min-width: 0; display: flex; align-items: center")}>
            <div data-rsp="stack" style={sx("flex: 1; display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 22px; margin-top: 0")}>
              {list(v.donuts).map((d, i0) => (
                <div key={d.key ?? i0} style={sx("padding: 6px 2px")}>
                  <div style={sx("display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px")}>
                    <span style={sx("font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(22,36,26,.62)")}>{d.label}</span>
                    <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 17px; white-space: nowrap")}>{d.full}</span>
                  </div>
                  <div style={sx("display: flex; flex-wrap: nowrap; align-items: center; gap: 14px; margin-top: 10px; min-width: 0")}>
                    <div style={sx("position: relative; width: min(46%, clamp(90px, 18vh, 190px)); aspect-ratio: 1; flex: 0 0 auto; container-type: inline-size")}>
                      <svg viewBox="0 0 160 160" style={sx("width: 100%; height: 100%; display: block")}>
                        <g transform="rotate(-90 80 80)">
                          <circle cx="80" cy="80" r="62" fill="none" stroke="rgba(22,36,26,.06)" strokeWidth="13" />
                          {list(d.slices).map((sl, i1) => (
                            <circle key={sl.key ?? i1} cx="80" cy="80" r="62" fill="none" stroke={sl.color} strokeWidth="13" strokeDasharray={sl.dash} strokeDashoffset={sl.offset} strokeLinecap="butt" />
                          ))}
                        </g>
                      </svg>
                      <div style={sx("position: absolute; inset: 0; display: grid; place-items: center; text-align: center")}>
                        <div style={sx("width: 62%; overflow: hidden")}>
                          <div style={sx("font-size: clamp(11px, 8cqw, 14px); line-height: 1; font-weight: 700; color: rgba(22,36,26,.7)")}>{d.sub}</div>
                          <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: clamp(15px, 17cqw, 30px); line-height: 1.05; white-space: nowrap; letter-spacing: -.02em; margin-top: 1px")}>{d.total}</div>
                        </div>
                      </div>
                    </div>
                    <div style={sx("flex: 1 1 0; min-width: 0; display: grid; gap: 5px")}>
                      {list(d.legend).map((l, i1) => (
                        <div key={l.key ?? i1} title={l.label} style={sx("display: grid; grid-template-columns: 11px minmax(0,1fr) auto; align-items: center; gap: 6px")}>
                          <span style={sx(`width: 9px; height: 9px; border-radius: 999px; background: ${l.color ?? ""}`)} />
                          <span style={sx("min-width: 0; font-size: 12.5px; line-height: 1.2; overflow-wrap: anywhere; hyphens: auto; color: rgba(22,36,26,.8)")}>{l.label}</span>
                          <span style={sx("white-space: nowrap; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px")}>{l.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 12px")}>
                    <span style={sx(d.chipStyle)}>{d.chip}</span>
                    <span style={sx("font-size: 13px; color: rgba(22,36,26,.75)")}>{d.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx("position: relative; min-height: 200px; color: #16241a; min-width: 0")}>
            <div style={sx("position: absolute; inset: 0; display: grid")}>
              <div style={sx("border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 16px 20px; min-height: 0; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column")}>
                <h2 style={sx("flex: 0 0 auto; font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 0 0 6px")}>{v.tKpi}</h2>
                <div style={sx("flex: 1 1 0; min-height: 0; display: grid; grid-auto-rows: minmax(0, 1fr); gap: 0")}>
                  {list(v.kpis).map((k, i0) => (
                    <div key={k.key ?? i0} style={sx("display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; column-gap: 8px; padding: 2px 0; border-bottom: 1px solid rgba(22,36,26,.08)")}>
                      <span style={sx("min-width: 0; font-size: 12px; line-height: 1.2; overflow-wrap: anywhere; color: rgba(22,36,26,.75)")}>
                        {k.label}
                        <span style={sx("display: block; margin-top: 2px")}>
                          <span style={sx(k.chipStyle)}>{k.chip}</span>
                        </span>
                      </span>
                      <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: clamp(14px, 2.6vh, 18px); white-space: nowrap")}>{k.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={sx("flex: 1 1 200px; min-height: 190px; display: flex; flex-direction: column; border-radius: 20px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); color: #16241a; padding: 18px 22px 14px")}>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 14px")}>
            <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 0; flex: 1; min-width: 0")}>{v.tMonthlyResult}</h2>
            <span style={sx("display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: rgba(22,36,26,.72)")}>
              <span style={sx("width: 10px; height: 10px; border-radius: 3px; background: #74cd85")} />
              {v.tIncomeLegend}
            </span>
            <span style={sx("display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: rgba(22,36,26,.72)")}>
              <span style={sx("width: 10px; height: 10px; border-radius: 3px; background: #e3bcb0")} />
              {v.tExpenseLegend}
            </span>
            <span style={sx("display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: rgba(22,36,26,.72)")}>
              <span style={sx("width: 16px; height: 2px; border-radius: 999px; background: #16241a")} />
              {v.tResultLegend}
            </span>
            <span style={sx("padding: 6px 12px; border-radius: 999px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); font-family: var(--font-heading); font-weight: 800; font-size: 13px")}>{v.yearResultLabel}</span>
          </div>
          <div style={sx("flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: 70px minmax(0,1fr); margin-top: 12px")}>
            <div style={sx("position: relative; height: 100%; min-height: 0")}>
              {list(v.resTicks).map((t, i0) => (
                <span key={t.key ?? i0} style={sx(t.labelStyle)}>{t.label}</span>
              ))}
            </div>
            <div style={sx("position: relative; height: 100%; min-height: 0")}>
              {list(v.resTicks).map((t, i0) => (
                <div key={t.key ?? i0} style={sx(t.lineStyle)} />
              ))}
              <div style={sx("position: absolute; inset: 0; display: grid; grid-template-columns: repeat(12, minmax(0,1fr))")}>
                {list(v.resMonths).map((m, i0) => (
                  <div key={m.key ?? i0} onMouseEnter={m.enter} onMouseLeave={v.resLeave} style={sx(`position: relative; height: 100%; cursor: default; opacity: ${m.opacity ?? ""}; background: ${m.band ?? ""}; border-radius: 10px; transition: background .25s`)}>
                    <span style={sx(`position: absolute; left: 24%; right: 24%; bottom: calc(50% + 1px); height: ${m.incH ?? ""}; border-radius: 7px 7px 2px 2px; background: ${m.incBg ?? ""}; box-sizing: border-box; transition: height .6s cubic-bezier(.2,.7,.2,1), background .25s`)} />
                    <span style={sx(`position: absolute; left: 24%; right: 24%; top: calc(50% + 1px); height: ${m.expH ?? ""}; border-radius: 2px 2px 7px 7px; background: ${m.expBg ?? ""}; box-sizing: border-box; transition: height .6s cubic-bezier(.2,.7,.2,1), background .25s`)} />
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 1200 340" preserveAspectRatio="none" aria-hidden="true" style={sx("position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible")}>
                <path d={v.resWave} fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" opacity=".9" />
                <path d={v.resWave} fill="none" stroke="#16241a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
              {list(v.resDots).map((d, i0) => (
                <span key={d.key ?? i0} style={sx(`position: absolute; left: ${d.left ?? ""}; top: ${d.top ?? ""}; width: ${d.size ?? ""}; height: ${d.size ?? ""}; transform: translate(-50%, -50%); border-radius: 999px; background: #16241a; border: 2px solid #ffffff; box-shadow: 0 0 0 1px rgba(22,36,26,.25); box-sizing: border-box; pointer-events: none; transition: width .2s, height .2s`)} />
              ))}
              {v.resTipShow ? (
                <div style={sx(`position: absolute; z-index: 5; left: ${v.resTipLeft ?? ""}; top: 8px; transform: translateX(${v.resTipShift ?? ""}); min-width: 190px; border-radius: 18px; background: #16241a; color: #f6f8f3; padding: 12px 14px; box-shadow: 0 16px 36px rgba(22,36,26,.3); pointer-events: none`)}>
                  <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 14px; margin-bottom: 8px")}>{v.resTipMonth}</div>
                  <div style={sx("display: grid; gap: 5px; font-size: 13px")}>
                    <div style={sx("display: flex; align-items: center; gap: 8px")}>
                      <span style={sx("width: 10px; height: 10px; border-radius: 3px; background: #74cd85")} />
                      <span style={sx("flex: 1")}>{v.tIncomeLegend}</span>
                      <b>{v.resTipInc}</b>
                    </div>
                    <div style={sx("display: flex; align-items: center; gap: 8px")}>
                      <span style={sx("width: 10px; height: 10px; border-radius: 3px; background: #ff7a61")} />
                      <span style={sx("flex: 1")}>{v.tExpenseLegend}</span>
                      <b>{v.resTipExp}</b>
                    </div>
                    <div style={sx("display: flex; align-items: center; gap: 8px; margin-top: 3px; padding-top: 7px; border-top: 1px solid rgba(246,248,243,.2)")}>
                      <span style={sx("width: 10px; height: 10px; border-radius: 999px; border: 2px solid #f6f8f3; box-sizing: border-box")} />
                      <span style={sx("flex: 1")}>{v.tResultLegend}</span>
                      <b style={sx(`color: ${v.resTipResColor ?? ""}`)}>{v.resTipRes}</b>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div style={sx("flex: 0 0 auto; display: grid; grid-template-columns: 70px repeat(12, minmax(0,1fr)); margin-top: 6px")}>
            <span />
            {list(v.resMonths).map((m, i0) => (
              <span key={m.key ?? i0} style={sx(m.labelStyle)}>{m.label}</span>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
