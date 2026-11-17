import { sx, list } from "../adminRuntime";
import ImageSlot from "../ImageSlot";

// Hallbooking › Innstillinger ([design 17 Nov]): save bar with an in-page
// preview of the booking page, then three compact columns — content and
// prices; rules and manual bookings; opening hours and closed days.
const card = "border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 16px 18px; min-width: 0";
const col = "display: grid; gap: 12px; align-content: start; min-width: 0";
const h2 = "font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 0 0 10px";
const cap = "font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.7)";
const kr = "flex: none; font-size: 13px; font-weight: 600; letter-spacing: 0; text-transform: none; color: rgba(22,36,26,.7)";
const pillBtn = "padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer";

export default function VenueAdminView({ v }) {
  const lbl = (extra) => sx((v.nsLabel ?? "") + (extra ? "; " + extra : ""));
  const inp = (extra) => sx((v.inputStyle ?? "") + (extra ? "; " + extra : ""));
  return (
    <div style={sx("margin-top: 0; display: grid; gap: 10px")}>
      {v.venSavedShow ? (
        <div style={sx("display: flex; align-items: center; gap: 10px; border-radius: 18px; background: rgba(116,205,133,.22); border: 1px solid rgba(116,205,133,.55); padding: 11px 16px; font-size: 14px; color: #16241a")}>
          <span style={sx("width: 8px; height: 8px; border-radius: 999px; background: #1f7a3a")} />
          {v.venSavedText}
        </div>
      ) : null}

      <div data-bk-save="" style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px")}>
        <button type="button" onClick={v.venSave} disabled={!!v.venClean} style={sx(v.venSaveStyle)}>{v.tVenSave}</button>
        <button type="button" onClick={v.venDiscard} disabled={!!v.venClean} style={sx(pillBtn)}>{v.tVenDiscard}</button>
        <button type="button" onClick={v.bkPreviewOpen} style={sx("margin-left: auto; display: inline-flex; align-items: center; gap: 8px; " + pillBtn)} className="kza-h3">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          {v.tVenPreview}
        </button>
        {v.bkPreviewShown ? (
          <div role="dialog" aria-modal="true" aria-label={v.tVenPreview} style={sx("position: fixed; inset: 0; z-index: 200; display: flex; flex-direction: column; background: #f6f8f3")}>
            <div style={sx("flex: none; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; padding: 10px 16px; background: #16241a; color: #f6f8f3")}>
              <button type="button" onClick={v.bkPreviewClose} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 999px; border: 0; background: #74cd85; color: #16241a; font-family: var(--font-body); font-weight: 700; font-size: 13.5px; cursor: pointer")} className="kza-h11">
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {v.tBkPreviewBack}
              </button>
              <span style={sx("font-size: 13.5px; color: rgba(246,248,243,.85)")}>{v.tBkPreviewNote}</span>
            </div>
            <iframe src={v.bkPreviewSrc} title={v.tVenPreview} style={sx("flex: 1; width: 100%; border: 0; background: #ffffff")} />
          </div>
        ) : null}
      </div>

      <div data-rsp="stack" data-bk-grid="" style={sx("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.1fr); gap: 12px; align-items: start")}>
        <div data-bk-col="" style={sx(col)}>
          <div data-bk-card="" style={sx(card)}>
            <h2 style={sx(h2)}>{v.tVenContent}</h2>
            <div style={sx(cap)}>{v.tVenPhoto}</div>
            <div style={sx("position: relative; width: 100%; height: 84px; border-radius: 14px; overflow: hidden; margin-top: 8px")}>
              <ImageSlot id={v.venPhotoId} shape="rounded" radius="20" placeholder={v.tVenPhotoPh} />
            </div>
            <div style={sx("font-size: 11.5px; line-height: 1.35; color: rgba(22,36,26,.6); margin-top: 4px")}>{v.tVenPhotoNote}</div>
            <label style={lbl("margin-top: 12px")}>
              {v.tVenAbout}
              <textarea rows="3" value={v.venAbout ?? ""} onChange={v.onVenAbout} placeholder={v.tVenAboutPh} style={sx(v.areaStyle)} />
            </label>
            <label style={lbl("margin-top: 10px")}>
              {v.tVenCancel}
              <div style={sx("display: flex; align-items: center; gap: 8px")}>
                <input type="number" min="0" max="72" value={v.venCancel ?? ""} onChange={v.onVenCancel} style={inp()} />
                <span style={sx("font-size: 13px; color: rgba(22,36,26,.7); white-space: nowrap")}>{v.tVenCancelUnit}</span>
              </div>
            </label>
            <div style={sx(cap + "; margin-top: 12px")}>{v.tVenIncludes}</div>
            <div style={sx("display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px")}>
              {list(v.venIncludes).map((inc, i) => (
                <button key={inc.key ?? i} type="button" onClick={inc.remove} title={v.tVenRemoveInc} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: rgba(22,36,26,.06); color: #16241a; font-size: 13px; cursor: pointer")} className="kza-he">
                  {inc.label} <span aria-hidden="true" style={sx("opacity: .6")}>×</span>
                </button>
              ))}
              <form onSubmit={v.venAddInc} style={sx("display: flex; align-items: center; gap: 6px")}>
                <input type="text" value={v.venIncDraft ?? ""} onChange={v.onVenIncDraft} placeholder={v.tVenIncPh} style={sx("width: 150px; padding: 7px 12px; border-radius: 999px; border: 1px dashed rgba(22,36,26,.3); background: #f7f9f5; color: #16241a; font-family: var(--font-body); font-size: 12.5px; outline: none")} className="kza-f7" />
                <button type="submit" style={sx("padding: 7px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12px; cursor: pointer")}>{v.tVenIncAdd}</button>
              </form>
            </div>
          </div>
          <div data-bk-card="" style={sx(card.replace("padding: 16px 18px", "padding: 14px 18px"))}>
            <div style={sx("display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px")}>
              <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 0")}>{v.tVenPrices}</h2>
              <span style={sx("font-size: 12px; color: rgba(22,36,26,.6)")}>{v.tPerHour}</span>
            </div>
            <div style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 8px")}>
              <label style={lbl()}>
                {v.tVenPrice}
                <span style={sx("display: flex; align-items: center; gap: 6px")}>
                  <input type="number" min="0" step="10" value={v.venPrice ?? ""} onChange={v.onVenPrice} style={inp("flex: 1; min-width: 0; text-align: right")} />
                  <span style={sx(kr)}>kr</span>
                </span>
              </label>
              <label style={lbl()}>
                {v.tVenMemberPrice}
                <span style={sx("display: flex; align-items: center; gap: 6px")}>
                  <input type="number" min="0" step="10" value={v.venMemberPrice ?? ""} onChange={v.onVenMemberPrice} style={inp("flex: 1; min-width: 0; text-align: right")} />
                  <span style={sx(kr)}>kr</span>
                </span>
              </label>
            </div>
            <div style={sx("margin-top: 6px; font-size: 12px; color: #1f7a3a")}>{v.venDiscountNote}</div>
          </div>
        </div>

        <div data-bk-col="" style={sx(col)}>
          <div data-bk-card="" style={sx(card)}>
            <h2 style={sx(h2)}>{v.tVenRules}</h2>
            <div data-rsp="stack" style={sx("display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 8px; align-items: end")}>
              <label style={lbl()}>
                {v.tVenSlot}
                <select value={v.venSlot ?? ""} onChange={v.onVenSlot} style={inp()}>
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                </select>
              </label>
              <label style={lbl()}>
                {v.tVenMax}
                <input type="number" min="1" max="8" value={v.venMax ?? ""} onChange={v.onVenMax} style={inp()} />
              </label>
              <label style={lbl()}>
                {v.tVenLead}
                <input type="number" min="1" max="365" value={v.venLead ?? ""} onChange={v.onVenLead} style={inp()} />
              </label>
            </div>
            <div style={sx(cap + "; margin-top: 10px")}>{v.tVenWho}</div>
            <div style={sx("display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px")}>
              {list(v.venAudienceOpts).map((ao, i) => (
                <button key={ao.key ?? i} type="button" onClick={ao.pick} style={sx(ao.style)}>{ao.label}</button>
              ))}
            </div>
            <div style={sx("font-size: 12.5px; color: rgba(22,36,26,.65); margin-top: 6px")}>{v.venAudienceNote}</div>
            {v.venShowMemberWindow ? (
              <>
                <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 10px; margin-top: 10px")}>
                  <label style={lbl()}>
                    {v.tVenMemberFrom}
                    <input type="time" value={v.venMemberFrom ?? ""} onChange={v.onVenMemberFrom} style={inp()} />
                  </label>
                  <label style={lbl()}>
                    {v.tVenMemberTo}
                    <input type="time" value={v.venMemberTo ?? ""} onChange={v.onVenMemberTo} style={inp()} />
                  </label>
                </div>
                <div style={sx("font-size: 12.5px; color: rgba(22,36,26,.65); margin-top: 6px")}>{v.tVenMemberWindowNote}</div>
              </>
            ) : null}
            <label style={sx("display: flex; align-items: center; gap: 10px; margin-top: 8px; font-size: 13px; color: #16241a; cursor: pointer")}>
              <input type="checkbox" checked={!!v.venMemberEarly} onChange={v.onVenMemberEarly} style={sx("width: 16px; height: 16px; accent-color: #1f7a3a")} />
              {v.tVenMemberEarly}
            </label>
            <label style={lbl("margin-top: 10px")}>
              {v.tVenNote}
              <textarea rows="2" value={v.venNote ?? ""} onChange={v.onVenNote} placeholder={v.tVenNotePh} style={sx(v.areaStyle)} />
            </label>
          </div>

          <div data-bk-card="" style={sx(card)}>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px")}>
              <h2 title={v.tManualHint} style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 0; flex: 1; min-width: 0")}>{v.tManual}</h2>
              <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.7); white-space: nowrap")}>{v.manualCount}</span>
            </div>
            <form onSubmit={v.mbSubmit} style={sx("display: grid; gap: 8px; margin-top: 10px")}>
              <div style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr) minmax(0,.8fr); gap: 8px")}>
                <label style={lbl("min-width: 0")}>
                  {v.tMbDate}
                  <input type="date" required value={v.mbDate ?? ""} onChange={v.onMbDate} style={inp("min-width: 0")} />
                </label>
                <label style={lbl("min-width: 0")}>
                  {v.tMbTime}
                  <input type="time" required value={v.mbTime ?? ""} onChange={v.onMbTime} style={inp("min-width: 0")} />
                </label>
                <label style={lbl()}>
                  {v.tMbUnit}
                  <select value={v.mbUnit ?? ""} onChange={v.onMbUnit} style={inp()}>
                    {list(v.mbUnitOpts).map((o, i) => (
                      <option key={o.key ?? i} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 10px")}>
                <label style={lbl()}>
                  {v.tMbName}
                  <input type="text" required value={v.mbName ?? ""} onChange={v.onMbName} placeholder={v.tMbNamePh} style={inp()} />
                </label>
                <label style={lbl()}>
                  {v.tMbNote}
                  <input type="text" value={v.mbNote ?? ""} onChange={v.onMbNote} placeholder={v.tMbNotePh} style={inp()} />
                </label>
              </div>
              <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px")}>
                <button type="submit" style={sx("padding: 11px 20px; border-radius: 999px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 13.5px; cursor: pointer; transition: background .3s")} className="kza-hf">{v.tMbAdd}</button>
                {v.mbSavedShow ? <span style={sx("font-size: 13px; color: #1f7a3a")}>{v.mbSavedText}</span> : null}
              </div>
            </form>
            {v.manualHas ? (
              <div style={sx("display: grid; gap: 6px; margin-top: 14px; max-height: 220px; overflow-y: auto; padding-right: 4px")}>
                {list(v.manualList).map((mb, i) => (
                  <div key={mb.key ?? i} style={sx("display: grid; grid-template-columns: 60px minmax(0,1fr) auto; align-items: center; gap: 10px; border-radius: 16px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); padding: 9px 12px")}>
                    <span style={sx("text-align: center")}>
                      <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 16px")}>{mb.day}</span>
                      <span style={sx("display: block; font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase; color: rgba(22,36,26,.65)")}>{mb.mon}</span>
                    </span>
                    <span style={sx("min-width: 0")}>
                      <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{mb.who}</span>
                      <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.7)")}>{mb.meta}</span>
                    </span>
                    <button type="button" onClick={mb.remove} title={v.tMbRemove} style={sx("width: 30px; height: 30px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; color: #16241a; cursor: pointer; font-size: 14px")}>×</button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div data-bk-col="" style={sx(col)}>
          <div data-bk-card="" style={sx(card)}>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px")}>
              <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; margin: 0; flex: 1; min-width: 0")}>{v.tVenSchedule}</h2>
              <span style={sx("font-size: 13px; color: rgba(22,36,26,.7)")}>{v.venMeta}</span>
            </div>
            <div style={sx("font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.7); margin-top: 8px")}>{v.tVenHours}</div>
            <div style={sx("font-size: 12px; line-height: 1.4; color: rgba(22,36,26,.65); margin-top: 2px")}>{v.tVenHoursHint}</div>
            <div style={sx("display: grid; gap: 4px; margin-top: 6px")}>
              {list(v.venDays).map((d, i) => (
                <div key={d.key ?? i} style={sx(`display: grid; grid-template-columns: 74px auto minmax(0,1fr) 10px minmax(0,1fr); align-items: center; gap: 4px 6px; padding: 3px 10px; border-radius: 12px; background: ${d.bg ?? "transparent"}`)}>
                  <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 14px")}>{d.name}</span>
                  <label style={sx("display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: rgba(22,36,26,.75); white-space: nowrap; cursor: pointer")}>
                    <input type="checkbox" checked={!!d.open} onChange={d.toggle} style={sx("width: 16px; height: 16px; accent-color: #1f7a3a")} />
                    {d.openLabel}
                  </label>
                  <input type="time" value={d.from ?? ""} onChange={d.onFrom} disabled={!!d.disabled} style={sx(d.inputStyle)} />
                  <span style={sx("text-align: center; color: rgba(22,36,26,.6)")}>–</span>
                  <input type="time" value={d.to ?? ""} onChange={d.onTo} disabled={!!d.disabled} style={sx(d.inputStyle)} />
                  {d.open ? (
                    <div style={sx("grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding-top: 4px")}>
                      <span style={sx("font-size: 11.5px; color: rgba(22,36,26,.7); margin-right: 2px")}>{d.unitsLabel}</span>
                      {list(d.units).map((u, j) => (
                        <button key={u.key ?? j} type="button" onClick={u.toggle} title={u.tip} style={sx(u.style)}>{u.label}</button>
                      ))}
                      <button type="button" onClick={d.allUnits} style={sx("margin-left: 4px; padding: 5px 10px; border-radius: 999px; border: 1px solid rgba(22,36,26,.18); background: transparent; color: rgba(22,36,26,.72); font-family: var(--font-heading); font-weight: 800; font-size: 11px; cursor: pointer")} className="kza-h3">{d.allLabel}</button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div style={sx("font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(22,36,26,.7); margin-top: 10px")}>{v.tVenClosed}</div>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 8px")}>
              <input type="date" value={v.venCloseDate ?? ""} onChange={v.onVenCloseDate} style={sx("padding: 9px 14px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 13.5px")} />
              <button type="button" onClick={v.venAddClosed} style={sx("padding: 9px 14px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")} className="kza-h3">{v.tVenAddClosed}</button>
              {list(v.venClosedList).map((c, i) => (
                <button key={c.key ?? i} type="button" onClick={c.remove} title={v.tVenRemove} style={sx("display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 999px; border: 1px solid rgba(236,48,19,.4); background: rgba(236,48,19,.08); color: #8a1a08; font-size: 12.5px; font-weight: 600; cursor: pointer")}>
                  {c.label} <span aria-hidden="true">×</span>
                </button>
              ))}
              {v.venNoClosed ? <span style={sx("font-size: 12.5px; color: rgba(22,36,26,.6)")}>{v.tVenNoClosed}</span> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
