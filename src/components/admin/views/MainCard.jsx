import { sx, list } from "../adminRuntime";
import EventTable from "./EventTable";
import FinanceMain from "./FinanceMain";
import InvoicingView from "./InvoicingView";

// Main card of the two-column layout: activities, posts, finance, grants,
// // generic rows and payment requests, depending on the page.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function MainCard({ v }) {
  return (
    <div data-dash-main="" style={sx(v.mainCardStyle)}>
      <div style={sx("display: flex; flex-wrap: wrap; gap: 12px; align-items: center")}>
        {v.showCardTitle ? (
          <button type="button" onClick={v.toggleActs} aria-expanded={v.actsExpanded} style={sx("flex: 1; min-width: 0; display: flex; align-items: center; gap: 12px; padding: 0; border: 0; background: transparent; cursor: pointer; text-align: left; color: #16241a")}>
            <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 30px; letter-spacing: -.02em; color: #16241a; margin: 0")}>
              {v.listTitle}
            </h2>
            <span style={sx("font-size: 13px; color: rgba(22,36,26,.75)")}>
              {v.actCountLabel}
            </span>
            <span style={sx(`flex: 0 0 auto; width: 30px; height: 30px; border-radius: 999px; background: #eaf7ed; color: #1f7a3a; display: grid; place-items: center; font-size: 13px; transition: transform .35s cubic-bezier(.2,.7,.2,1); transform: ${v.actChevron ?? ""}; display: ${v.chevDisplay ?? ""}`)}>
              ▾
            </span>
          </button>
        ) : null}
        {v.showCompose ? (
          <button type="button" onClick={v.openCompose} style={sx("padding: 12px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer; transition: background .3s, transform .3s cubic-bezier(.2,.7,.2,1)")} className="kza-hq">
            {v.composeLabel}
          </button>
        ) : null}
      </div>
      <div style={sx(`display: grid; grid-template-columns: ${v.cardCols ?? ""}; gap: 22px; align-items: start`)}>
        {v.showActCards ? (
          <div style={sx(v.actListStyle)}>
            {list(v.activities).map((a, i1) => (
                <button key={a.key ?? i1} type="button" onClick={a.open} style={sx("display: block; width: 100%; box-sizing: border-box; text-align: left; cursor: pointer; font-family: var(--font-body); color: #16241a; border-radius: 26px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); padding: 18px 20px; transition: transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s")} className="kza-hr">
                  <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px")}>
                    <span style={sx("flex: 0 0 auto; width: 52px; text-align: center")}>
                      <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 21px")}>
                        {a.day}
                      </span>
                      <span style={sx("display: block; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.75)")}>
                        {a.month}
                      </span>
                    </span>
                    <span style={sx("flex: 1; min-width: 0")}>
                      <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 17px")}>
                        {a.title}
                      </span>
                      <span style={sx("display: block; font-size: 13.5px; color: rgba(22,36,26,.78); margin-top: 2px")}>
                        {a.meta}
                      </span>
                    </span>
                    <span style={sx(a.tagStyle)}>
                      {a.tag}
                    </span>
                  </div>
                  <div style={sx("height: 8px; border-radius: 999px; background: rgba(22,36,26,.1); margin-top: 14px; overflow: hidden")}>
                    <div style={sx(`height: 100%; border-radius: 999px; background: linear-gradient(90deg, #74cd85, #1f7a3a); width: ${a.fill ?? ""}`)} />
                  </div>
                  <div style={sx("display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; font-size: 13px; color: rgba(22,36,26,.75)")}>
                    <span>
                      {a.signed}
                    </span>
                    <span>
                      {a.leader}
                    </span>
                  </div>
                </button>
            ))}
          </div>
        ) : null}
        {v.showActTable ? <EventTable v={v} /> : null}
        {v.showPostsInCard ? (
          <div style={sx("min-width: 0")}>
            <div style={sx(`display: flex; align-items: center; gap: 10px; margin-top: ${v.postsTopGap ?? ""}`)}>
              <button type="button" onClick={v.togglePosts} aria-expanded={v.postsExpanded} style={sx("flex: 1; min-width: 0; display: flex; align-items: center; gap: 12px; padding: 0; border: 0; background: transparent; cursor: pointer; text-align: left; color: #16241a")}>
                <h2 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 23px; margin: 0")}>
                  {v.tPostsHeading}
                </h2>
                <span style={sx("font-size: 13px; color: rgba(22,36,26,.75)")}>
                  {v.postCountLabel}
                </span>
                <span style={sx(`flex: 0 0 auto; width: 30px; height: 30px; border-radius: 999px; background: #eaf7ed; color: #1f7a3a; display: grid; place-items: center; font-size: 13px; transition: transform .35s cubic-bezier(.2,.7,.2,1); transform: ${v.postChevron ?? ""}; display: ${v.chevDisplay ?? ""}`)}>
                  ▾
                </span>
              </button>
              {v.showPostHeadBtn ? (
                <button type="button" onClick={v.openPostCompose} style={sx("padding: 9px 16px; border-radius: 999px; border: 1px solid rgba(22,36,26,.2); background: #ffffff; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer; transition: background .3s")} className="kza-h3">
                  {v.tNewPost}
                </button>
              ) : null}
            </div>
            {v.postsExpanded ? (
              <div style={sx("display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; margin-top: 14px")}>
                {list(v.posts).map((p, i1) => (
                    <div key={p.key ?? i1} style={sx("border-radius: 26px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); padding: 20px 22px")}>
                      <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px")}>
                        <span style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 14px")}>
                          {p.club}
                        </span>
                        <span style={sx("font-size: 13px; color: rgba(22,36,26,.75)")}>
                          {p.when}
                        </span>
                        <span style={sx("flex: 1")} />
                        <span style={sx(p.flagStyle)}>
                          {p.flag}
                        </span>
                      </div>
                      <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 18px; margin-top: 10px")}>
                        {p.title}
                      </div>
                      <div style={sx("font-size: 15px; line-height: 1.6; color: rgba(22,36,26,.72); margin-top: 6px")}>
                        {p.text}
                      </div>
                      <div style={sx("font-size: 13px; color: rgba(22,36,26,.75); margin-top: 12px")}>
                        {p.meta}
                      </div>
                    </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {v.showFinance ? <FinanceMain v={v} /> : null}
      {v.showGrants ? (
        <>
          <div style={sx("border-radius: 26px; background: #eaf7ed; border: 1px solid #74cd85; padding: 20px 22px; margin-top: 18px")}>
          <div style={sx("display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px")}>
            <h3 style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 19px; margin: 0; flex: 1; min-width: 0")}>
              {v.tGrantsHeading}
            </h3>
            <span style={sx("font-size: 13px; color: rgba(22,36,26,.75)")}>
              {v.grantsSub}
            </span>
          </div>
          <div style={sx("display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; margin-top: 14px")}>
            {list(v.grants).map((g, i1) => (
                <div key={g.key ?? i1} style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px; border-radius: 22px; background: #ffffff; border: 1px solid rgba(22,36,26,.1); padding: 15px 18px")}>
                  <span style={sx("flex: 1; min-width: 180px")}>
                    <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 15.5px")}>
                      {g.name}
                    </span>
                    <span style={sx("display: block; font-size: 13px; color: rgba(22,36,26,.75); margin-top: 2px")}>
                      {g.meta}
                    </span>
                  </span>
                  <span style={sx("flex: 0 0 auto; font-family: var(--font-heading); font-weight: 800; font-size: 14.5px")}>
                    {g.amount}
                  </span>
                  <span style={sx(g.tagStyle)}>
                    {g.tag}
                  </span>
                </div>
            ))}
          </div>
        </div>
          <div style={sx("font-size: 12px; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; color: rgba(22,36,26,.75); margin-top: 24px")}>
          {v.tSponsorAgreements}
        </div>
        </>
      ) : null}
      {v.showRows ? (
        <div style={sx("display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; margin-top: 18px")}>
          {list(v.rows).map((r, i1) => (
              <div key={r.key ?? i1} style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 12px; border-radius: 24px; background: #f4f8f2; border: 1px solid rgba(22,36,26,.1); padding: 16px 20px")}>
                <span style={sx("flex: 1; min-width: 0")}>
                  <span style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 16px")}>
                    {r.title}
                  </span>
                  <span style={sx("display: block; font-size: 13.5px; color: rgba(22,36,26,.75); margin-top: 2px")}>
                    {r.meta}
                  </span>
                </span>
                <span style={sx("flex: 0 0 auto; font-family: var(--font-heading); font-weight: 800; font-size: 15px")}>
                  {r.amount}
                </span>
                <span style={sx(r.tagStyle)}>
                  {r.tag}
                </span>
              </div>
          ))}
        </div>
      ) : null}
      {v.showInvoicing ? <InvoicingView v={v} /> : null}
    </div>
  );
}
