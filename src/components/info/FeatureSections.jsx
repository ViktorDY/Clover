import Hv from "../Hv";
import { designHref } from "../../lib/routes";
import { useLang } from "../../lib/langContext";
import "../../styles/pages/feature-sections.css";

/*
  Building blocks the "Kretz Styre / Kretz Økonomi" feature pages share in the
  design (Roller, Årlig rapportering, Dokumentsenter …): the split hero, the
  "Kjenner du deg igjen?" pain cards, the dark how-it-works band, the
  interactive checklist card and the "Dette får du" icon grid.

  Use together with FeatureCta and RelatedFeatures from this folder.
  Responsive / hover rules live in src/styles/pages/feature-sections.css.
*/

const H2 = {
  fontFamily: "var(--font-heading)",
  fontWeight: 800,
  fontSize: "clamp(28px, 3.6vw, 44px)",
  lineHeight: 1.05,
  margin: 0,
};

/* ---------- Hero ---------- */

export function FeatureHero({ eyebrow, title, accent, lead, ticks, columns, children }) {
  const { t } = useLang();
  const start = designHref("Kretz.dc.html#kom-i-gang");
  return (
    <section data-rsp-pad style={{ position: "relative", overflow: "hidden", padding: "64px 28px 72px" }}>
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1000"
        style={{ position: "absolute", right: -260, top: -200, width: 900, height: 900, pointerEvents: "none" }}
      >
        <circle cx="500" cy="500" r="410" fill="none" stroke="rgba(139,203,139,.14)" strokeWidth="90" />
        <circle cx="500" cy="500" r="300" fill="none" stroke="rgba(22,36,26,.1)" strokeWidth="1.5" strokeDasharray="5 9" />
      </svg>
      <div
        data-rsp="stack"
        data-rsp-wide
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: columns || "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              border: "1.5px solid #a3e2ae",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "#1f7a3a",
            }}
          >
            {eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(38px, 5.6vw, 68px)",
              lineHeight: 1,
              margin: "20px 0 0",
            }}
          >
            {title}
            <br />
            <span style={{ color: "#1f7a3a" }}>{accent}</span>
          </h1>
          <p style={{ margin: "22px 0 0", fontSize: 18, lineHeight: 1.6, color: "#4C5E50", maxWidth: "32em" }}>{lead}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
            <a
              href={start}
              className="kz-arrow-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 26px",
                borderRadius: 999,
                background: "#16241a",
                color: "#f6f8f3",
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              {t("Kom i gang gratis", "Get started for free")}{" "}
              <span className="kz-arr" aria-hidden="true">
                →
              </span>
            </a>
            <Hv
              as="a"
              href={start}
              style="display: inline-flex; align-items: center; padding: 15px 26px; border-radius: 999px; border: 1px solid #16241a; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 15px; transition: background .3s, color .3s"
              hover="background: #16241a; color: #f6f8f3"
            >
              {t("Book en demo", "Book a demo")}
            </Hv>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px", marginTop: 28, fontSize: 14, color: "#4C5E50" }}>
            {ticks.map((tick) => (
              <span key={tick}>✓ {tick}</span>
            ))}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/* Small white pill with a green check that floats on the hero mockups. */
export function CheckPill({ children, style, ...rest }) {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 18px",
        borderRadius: 999,
        background: "#ffffff",
        border: "1px solid rgba(116,205,133,.4)",
        boxShadow: "0 14px 34px rgba(31,122,58,.16)",
        fontSize: 14,
        fontWeight: 600,
        color: "#16241a",
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: 20, height: 20, borderRadius: 999, background: "#1f7a3a", display: "grid", placeItems: "center" }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24">
          <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {children}
    </div>
  );
}

/* ---------- Pain cards ---------- */

export function PainCards({ badge, title, intro, items }) {
  const { t } = useLang();
  return (
    <section data-rsp-pad style={{ padding: "24px 28px 72px" }}>
      <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
        {badge && (
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(255,210,63,.28)",
                border: "1.5px solid rgba(224,161,0,.55)",
                color: "#6b5300",
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: 15,
                letterSpacing: ".02em",
              }}
            >
              {badge}
            </span>
          </div>
        )}
        <h2 style={{ ...H2, textAlign: "center" }}>{title || t("Kjenner du deg igjen?", "Sound familiar?")}</h2>
        <p style={{ margin: "12px auto 0", fontSize: 17, color: "#4C5E50", maxWidth: "36em", textAlign: "center" }}>{intro}</p>
        <div data-rsp-cols="3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, marginTop: 32 }}>
          {items.map((it, i) => (
            <div
              key={it.title}
              style={{ borderRadius: 26, background: "#ffffff", border: "1px solid rgba(22,36,26,.12)", padding: 28 }}
            >
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 40, color: "#74cd85", lineHeight: 1 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ margin: "16px 0 8px", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20 }}>{it.title}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#4C5E50" }}>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Dark how-it-works band ---------- */

const ROW_STYLE = {
  done: { row: { background: "rgba(246,248,243,.08)" }, dot: "filled", right: { color: "#a3e2ae" } },
  active: {
    row: { background: "#74cd85", color: "#16241a" },
    dot: "dark",
    label: { fontWeight: 700 },
    right: { fontWeight: 600 },
  },
  muted: { row: { background: "rgba(246,248,243,.08)" }, dot: "ring", right: { color: "rgba(246,248,243,.75)" } },
  dashed: { row: { border: "1.5px dashed rgba(246,248,243,.3)" }, dot: "ring", right: { color: "rgba(246,248,243,.75)" } },
};

const DOT = {
  filled: { background: "#74cd85", color: "#16241a", fontWeight: 800, fontSize: 13 },
  dark: { background: "#16241a", color: "#a3e2ae", fontWeight: 800, fontSize: 13 },
  ring: { border: "1.5px solid rgba(246,248,243,.5)", fontSize: 12 },
};

/*
  steps: [{ title, text }]
  rows:  [{ kind: "done" | "active" | "muted" | "dashed", icon, label, right }]
*/
export function HowItWorksBand({ title, steps, panelTitle, panelRight, rows }) {
  const { t } = useLang();
  return (
    <section
      data-kz-band
      style={{ margin: "0 16px", padding: "72px 28px", borderRadius: 48, background: "#16241a", color: "#f6f8f3" }}
    >
      <div
        data-rsp-wide
        data-rsp="stack"
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#a3e2ae" }}>
            {t("Slik fungerer det", "How it works")}
          </div>
          <h2 style={{ ...H2, margin: "12px 0 0", color: "#f6f8f3" }}>{title}</h2>
          <div style={{ display: "grid", gap: 22, marginTop: 34 }}>
            {steps.map((s, i) => (
              <div key={s.title} style={{ display: "grid", gridTemplateColumns: "48px minmax(0,1fr)", gap: 16 }}>
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    background: "#74cd85",
                    color: "#16241a",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: 18,
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 style={{ margin: "4px 0 6px", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, color: "#f6f8f3" }}>
                    {s.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "rgba(246,248,243,.75)" }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 28, background: "rgba(246,248,243,.06)", border: "1px solid rgba(246,248,243,.14)", padding: 26 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              fontSize: 13,
              color: "rgba(246,248,243,.75)",
            }}
          >
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "#f6f8f3" }}>{panelTitle}</span>
            <span>{panelRight}</span>
          </div>
          <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
            {rows.map((r) => {
              const k = ROW_STYLE[r.kind] || ROW_STYLE.muted;
              return (
                <div
                  key={r.label}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 18, ...k.row }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "0 0 auto",
                      width: 28,
                      height: 28,
                      boxSizing: "border-box",
                      borderRadius: 999,
                      display: "grid",
                      placeItems: "center",
                      ...DOT[k.dot],
                    }}
                  >
                    {r.icon}
                  </span>
                  <span style={{ flex: 1, ...k.label }}>{r.label}</span>
                  <span style={{ fontSize: 13, textAlign: "right", ...k.right }}>{r.right}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Checklist card (interactive) ---------- */

/*
  items: [{ id, label }], checked: { [id]: bool }, onToggle(id)
  badge: e.g. "3 av 5 klare"
*/
export function ChecklistCard({ title, badge, items, checked, onToggle }) {
  const done = items.filter((it) => checked[it.id]).length;
  const pct = Math.round((done / items.length) * 100) + "%";
  return (
    <div
      style={{
        borderRadius: 28,
        background: "#ffffff",
        border: "1px solid rgba(22,36,26,.12)",
        padding: 24,
        boxShadow: "0 20px 50px rgba(22,36,26,.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{title}</span>
        <span
          style={{
            padding: "5px 12px",
            borderRadius: 999,
            background: "#eaf7ed",
            color: "#1f7a3a",
            fontSize: 13,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {badge(done, items.length)}
        </span>
      </div>
      <div aria-hidden="true" style={{ height: 8, borderRadius: 999, background: "#eef2ec", margin: "14px 0 6px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: pct,
            borderRadius: 999,
            background: "#74cd85",
            transition: "width .5s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </div>
      <div style={{ display: "grid", gap: 2, marginTop: 8 }}>
        {items.map((it) => (
          <label
            key={it.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 6px",
              borderBottom: "1px solid rgba(22,36,26,.07)",
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            <input
              type="checkbox"
              checked={!!checked[it.id]}
              onChange={() => onToggle(it.id)}
              style={{ width: 20, height: 20, accentColor: "#1f7a3a", margin: 0 }}
            />
            <span style={{ flex: 1 }}>{it.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

/* The "intro text left, checklist card right" row above the benefit grid. */
export function ChecklistRow({ title, text, children }) {
  return (
    <div
      data-rsp="stack"
      style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 48, alignItems: "center" }}
    >
      <div>
        <h2 style={H2}>{title}</h2>
        <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4C5E50", maxWidth: "30em" }}>{text}</p>
      </div>
      {children}
    </div>
  );
}

/* ---------- "Dette får du" icon grid ---------- */

export function IconTile({ children }) {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: "0 0 auto",
        width: 52,
        height: 52,
        borderRadius: 16,
        background: "linear-gradient(180deg, #f3faf4 0%, #e6f4e9 100%)",
        border: "1px solid rgba(116,205,133,.35)",
        boxShadow: "0 8px 20px rgba(31,122,58,.10)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1f7a3a"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

/* items: [{ icon: <svg children>, title, text }] */
export function BenefitGrid({ title, text, items }) {
  const { t } = useLang();
  return (
    <>
      <div style={{ marginTop: 56, textAlign: "center" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 22px",
            borderRadius: 999,
            background: "rgba(116,205,133,.18)",
            border: "1.5px solid rgba(116,205,133,.55)",
            color: "#1f7a3a",
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: ".02em",
          }}
        >
          {t("Dette får du", "What you get")}
        </span>
        <h2 style={{ ...H2, margin: "18px 0 0" }}>{title}</h2>
        <p style={{ margin: "12px auto 0", fontSize: 17, lineHeight: 1.6, color: "#4C5E50", maxWidth: "36em" }}>{text}</p>
      </div>
      <div
        data-rsp-cols="2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "40px 64px",
          maxWidth: 900,
          margin: "48px auto 0",
        }}
      >
        {items.map((it) => (
          <div key={it.title} style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
            <IconTile>{it.icon}</IconTile>
            <div style={{ minWidth: 0, paddingTop: 2 }}>
              <b style={{ display: "block", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, color: "#16241a" }}>
                {it.title}
              </b>
              <span style={{ display: "block", marginTop: 6, fontSize: 15, lineHeight: 1.55, color: "#4C5E50" }}>{it.text}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* Section wrapper for the checklist row + benefit grid. */
export function FeatureBody({ children }) {
  return (
    <section data-rsp-pad style={{ padding: "80px 28px 40px" }}>
      <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
        {children}
      </div>
    </section>
  );
}
