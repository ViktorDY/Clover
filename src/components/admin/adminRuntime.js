// Small helpers shared by the admin components. The portal's controller
// (src/lib/adminLogic.js) hands most computed styles over as CSS strings, so
// they are parsed into React style objects here (and cached, since the same
// strings come back on every render).
const cache = new Map();

function camel(prop) {
  if (prop.startsWith("--")) return prop;
  const p = prop.replace(/^-(webkit|moz|ms)-/, (_, v) => v[0].toUpperCase() + v.slice(1) + "-");
  return p.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function parse(css) {
  const out = {};
  let depth = 0;
  let start = 0;
  const take = (decl) => {
    const i = decl.indexOf(":");
    if (i < 0) return;
    const prop = decl.slice(0, i).trim();
    if (!prop) return;
    out[camel(prop)] = decl.slice(i + 1).trim();
  };
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if (c === ";" && depth === 0) {
      take(css.slice(start, i));
      start = i + 1;
    }
  }
  take(css.slice(start));
  return out;
}

export function sx(style) {
  if (!style) return undefined;
  if (typeof style !== "string") return style;
  let hit = cache.get(style);
  if (!hit) {
    hit = parse(style);
    if (cache.size > 4000) cache.clear();
    cache.set(style, hit);
  }
  return hit;
}

export function list(value) {
  return Array.isArray(value) ? value : [];
}
