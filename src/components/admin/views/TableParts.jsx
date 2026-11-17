import { sx, list } from "../adminRuntime";

// [design 17 Nov] Pieces shared by the admin tables: the row of per-column
// search inputs under the header, the checkbox and the footer pager
// ("15 ▾  1–15 av 120  |« ‹ › »|").

const cellInput =
  "width: 100%; min-width: 0; box-sizing: border-box; height: 30px; padding: 0 10px; border-radius: 8px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; font-family: var(--font-body); font-size: 13px; color: #16241a; outline: none";

export function FilterCells({ cells }) {
  return list(cells).map((fc, i) => (
    <input
      key={fc.key ?? i}
      type="search"
      value={fc.val ?? ""}
      onChange={fc.onInput}
      placeholder={fc.ph}
      aria-label={fc.ph}
      style={sx(cellInput)}
      className="kza-fp"
    />
  ));
}

export function Check({ checked, onChange, label, size = 16 }) {
  return (
    <input
      type="checkbox"
      aria-label={label}
      checked={!!checked}
      onChange={onChange || (() => {})}
      style={sx(`width: ${size}px; height: ${size}px; margin: 0; accent-color: #1f7a3a; cursor: pointer`)}
    />
  );
}

const NAV = [
  ["first", "M7 5v14M18 6l-6 6 6 6"],
  ["prev", "M15 6l-6 6 6 6"],
  ["next", "M9 6l6 6-6 6"],
  ["last", "M17 5v14M6 6l6 6-6 6"],
];

// p: { per, onPer, perOpts?, range, total, atStart, atEnd, prevStyle, nextStyle,
//      first, prev, next, last, tPer, tOf, tFirst, tPrev, tNext, tLast }
export function Pager({ p }) {
  const opts = p.perOpts ? list(p.perOpts).map((o) => o.v) : [15, 50, 100, 250];
  const handlers = { first: p.first, prev: p.prev, next: p.next, last: p.last };
  const labels = { first: p.tFirst, prev: p.tPrev, next: p.tNext, last: p.tLast };
  return (
    <>
      <select
        value={p.per ?? ""}
        onChange={p.onPer}
        aria-label={p.tPer}
        title={p.tPer}
        style={sx("padding: 4px 6px; border-radius: 8px; border: 1px solid transparent; background: transparent; font-family: var(--font-body); font-size: 13.5px; color: #16241a; cursor: pointer")}
        className="kza-d17b"
      >
        {opts.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span>
        <b>{p.range}</b> {p.tOf} <b>{p.total}</b>
      </span>
      <span style={sx("display: inline-flex; gap: 2px")}>
        {NAV.map(([k, d]) => {
          const back = k === "first" || k === "prev";
          return (
            <button
              key={k}
              type="button"
              onClick={handlers[k]}
              disabled={!!(back ? p.atStart : p.atEnd)}
              aria-label={labels[k]}
              title={labels[k]}
              style={sx(back ? p.prevStyle : p.nextStyle)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </span>
    </>
  );
}

// Prefix form used by other views: reads v[p + "Per"], v[p + "Range"],
// v[p + "AtStart"], v[p + "First"] … from the flat view object.
export function TablePager({ v, p, total, onPer, label }) {
  return (
    <Pager
      p={{
        per: v[p + "Per"],
        onPer: onPer || v["on" + p[0].toUpperCase() + p.slice(1) + "Per"],
        range: v[p + "Range"],
        total: total ?? v[p + "Total"],
        atStart: v[p + "AtStart"],
        atEnd: v[p + "AtEnd"],
        prevStyle: v[p + "PrevStyle"],
        nextStyle: v[p + "NextStyle"],
        first: v[p + "First"],
        prev: v[p + "Prev"],
        next: v[p + "Next"],
        last: v[p + "Last"],
        tPer: label ?? v.tTblPer,
        tOf: v.tOf,
        tFirst: v.tFirstPage,
        tPrev: v.tPrevPage,
        tNext: v.tNextPage,
        tLast: v.tLastPage,
      }}
    />
  );
}
