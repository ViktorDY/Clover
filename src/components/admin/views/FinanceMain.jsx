import { sx, list } from "../adminRuntime";

// Økonomi overview: main card content (results chart, KPIs).
// Renders the view object `v` from src/lib/adminLogic.js.
export default function FinanceMain({ v }) {
  return (
    <>
      <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 14px; margin-top: 14px")}>
      {list(v.donuts).map((d, i1) => (
          <div key={d.key ?? i1} style={sx("padding: 6px 2px")}>
            <div style={sx("font-size: 12px; font-weight: 600; letter-spacing: .11em; text-transform: uppercase; color: rgba(22,36,26,.75)")}>
              {d.label}
            </div>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 20px; margin-top: 16px")}>
              <div style={sx("position: relative; width: 168px; height: 168px; flex: 0 0 auto")}>
                <svg viewBox="0 0 160 160" style={sx("width: 100%; height: 100%; display: block")}>
                  <g transform="rotate(-90 80 80)">
                    <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(22,36,26,.08)" strokeWidth="17" />
                    {list(d.slices).map((sl, i2) => (
                        <circle key={sl.key ?? i2} cx="80" cy="80" r="64" fill="none" stroke={sl.color} strokeWidth="17" strokeDasharray={sl.dash} strokeDashoffset={sl.offset} />
                    ))}
                  </g>
                </svg>
                <div style={sx("position: absolute; inset: 0; display: grid; place-items: center; text-align: center")}>
                  <div>
                    <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 17px; line-height: 1.1; white-space: nowrap")}>
                      {d.total}
                    </div>
                    <div style={sx("font-size: 11px; color: rgba(22,36,26,.75); margin-top: 2px")}>
                      {d.sub}
                    </div>
                  </div>
                </div>
              </div>
              <div style={sx("flex: 1; min-width: 130px; display: grid; gap: 8px")}>
                {list(d.legend).map((l, i2) => (
                    <div key={l.key ?? i2} style={sx("display: flex; align-items: center; gap: 9px")}>
                      <span style={sx(`width: 10px; height: 10px; flex: 0 0 auto; border-radius: 999px; background: ${l.color ?? ""}`)} />
                      <span style={sx("flex: 1; min-width: 0; font-size: 13.5px; color: rgba(22,36,26,.75)")}>
                        {l.label}
                      </span>
                      <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 13.5px")}>
                        {l.pct}
                      </span>
                    </div>
                ))}
              </div>
            </div>
            <div style={sx("display: flex; align-items: center; gap: 8px; margin-top: 16px")}>
              <span style={sx(d.chipStyle)}>
                {d.chip}
              </span>
              <span style={sx("font-size: 13px; color: rgba(22,36,26,.75)")}>
                {d.note}
              </span>
            </div>
          </div>
      ))}
    </div>
      <div style={sx("display: grid; grid-template-columns: minmax(0,1fr); gap: 14px; margin-top: 14px")}>
      <div style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 22px")}>
        <div style={sx("font-size: 12px; font-weight: 600; letter-spacing: .11em; text-transform: uppercase; color: rgba(22,36,26,.75)")}>
          {v.tResult}
        </div>
        <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 34px; margin-top: 10px; color: #1f7a3a")}>
          {v.resultVal}
        </div>
        <div style={sx("font-size: 14px; color: rgba(22,36,26,.78); margin-top: 6px")}>
          {v.tMargin} {v.marginVal}
        </div>
        <div style={sx("height: 8px; border-radius: 999px; background: rgba(22,36,26,.1); margin-top: 14px; overflow: hidden")}>
          <div style={sx(`height: 100%; border-radius: 999px; background: linear-gradient(90deg, #74cd85, #1f7a3a); width: ${v.marginFill ?? ""}`)} />
        </div>
      </div>
    </div>
      <div style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 22px; margin-top: 14px")}>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px")}>
        <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 18px; margin: 0; flex: 1; min-width: 0")}>
          {v.tPending}
        </h3>
        <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 17px")}>
          {v.pendingTotal}
        </span>
      </div>
      <div style={sx("display: grid; gap: 10px; margin-top: 14px")}>
        {list(v.pending).map((p, i1) => (
            <div key={p.key ?? i1} style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px; border-radius: 20px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); padding: 14px 16px")}>
              <span style={sx("flex: 1; min-width: 0")}>
                <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
                  {p.title}
                </span>
                <span style={sx("display: block; font-size: 13px; color: rgba(22,36,26,.75); margin-top: 2px")}>
                  {p.meta}
                </span>
              </span>
              <span style={sx("flex: 0 0 auto; font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
                {p.amount}
              </span>
              <span style={sx(p.tagStyle)}>
                {p.tag}
              </span>
            </div>
        ))}
      </div>
    </div>
    </>
  );
}
