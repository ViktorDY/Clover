import { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Hv from "../Hv";
import FeatureCta from "./FeatureCta";
import RelatedFeatures from "./RelatedFeatures";
import { designHref } from "../../lib/routes";
import { useLang } from "../../lib/langContext";
import "../../styles/subpage.css";
import "../../styles/pages/feature-detail.css";

/*
  The shared template behind the four feature detail pages in the design
  (Medlemsregister, Aktiviteter, Hallbooking, Økonomi). Every one has the
  same run of sections; only the copy and the interactive hero mockup
  differ, so each page passes its content in and renders its own mockup:

    hero      eyebrow, two-line h1, lead, two buttons, ✓ ticks, mockup + badge
    pain      "Kjenner du deg igjen?" — three numbered problem cards
    how       dark band: three steps + a status list
    setup     heading + an interactive set-up checklist with progress bar
    gets      "Dette får du" — four icon + text benefits
    related   three linked cards (RelatedFeatures)
    cta       green closing band (FeatureCta)

  All text arrives already translated (pages call t()).
*/
export default function FeatureDetail({ onOpenLogin, onOpenSignup, onOpenBooking, hero, pain, how, setup, gets, related, cta }) {
  return (
    <div className="kz-sub kz-fd">
      <Navbar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} onOpenBooking={onOpenBooking} />
      <main>
        <Hero {...hero} />
        <Pain {...pain} />
        <HowBand {...how} />
        <section data-rsp-pad style={{ padding: "80px 28px 40px" }}>
          <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Setup {...setup} />
            <Gets {...gets} />
          </div>
        </section>
        <RelatedFeatures items={related} />
        <FeatureCta {...cta} />
      </main>
      <Footer />
    </div>
  );
}

const H2 = {
  fontFamily: "var(--font-heading)",
  fontWeight: 800,
  fontSize: "clamp(28px, 3.6vw, 44px)",
  lineHeight: 1.05,
  margin: 0,
};

/* ---------------------------------------------------------------- hero */

function Hero({ eyebrow, title, accent, lead, secondary, ticks, mockup, badge, badgeSide = "left" }) {
  const { t } = useLang();
  return (
    <section data-rsp-pad style={{ position: "relative", overflow: "hidden", padding: "64px 28px 72px" }}>
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1000"
        style={{ position: "absolute", right: -260, top: -200, width: 900, height: 900, pointerEvents: "none", maxWidth: "none" }}
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
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
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
              href={designHref("Kretz.dc.html#kom-i-gang")}
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
            <SecondaryButton {...(secondary || { label: t("Book en demo", "Book a demo") })} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px", marginTop: 28, fontSize: 14, color: "#4C5E50" }}>
            {ticks.map((tick) => (
              <span key={tick}>✓ {tick}</span>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            padding: 28,
            borderRadius: 34,
            backgroundColor: "#eaf6ec",
            backgroundImage:
              "radial-gradient(rgba(31,122,58,.16) 1px, transparent 1.2px), linear-gradient(160deg, #f1faf2 0%, #e2f2e6 100%)",
            backgroundSize: "16px 16px, 100% 100%",
          }}
        >
          <div
            style={{
              borderRadius: 22,
              background: "#ffffff",
              border: "1px solid rgba(116,205,133,.35)",
              boxShadow: "0 24px 60px rgba(31,122,58,.14)",
              padding: "20px 20px 22px",
            }}
          >
            {mockup}
          </div>
          {badge && (
            <div
              data-kz-hidetab
              style={{
                position: "absolute",
                ...(badgeSide === "right" ? { right: 16 } : { left: 12 }),
                bottom: -18,
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
              {badge}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const SECONDARY_STYLE =
  "display: inline-flex; align-items: center; padding: 15px 26px; border-radius: 999px; border: 1px solid #16241a; background: transparent; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 15px; cursor: pointer; transition: background .3s, color .3s";
const SECONDARY_HOVER = "background: #16241a; color: #f6f8f3";

function SecondaryButton({ label, href, onClick }) {
  if (onClick) {
    return (
      <Hv as="button" type="button" onClick={onClick} style={SECONDARY_STYLE} hover={SECONDARY_HOVER}>
        {label}
      </Hv>
    );
  }
  return (
    <Hv as="a" href={href || designHref("Kretz.dc.html#kom-i-gang")} style={SECONDARY_STYLE} hover={SECONDARY_HOVER}>
      {label}
    </Hv>
  );
}

/* ---------------------------------------------------------------- pain */

function Pain({ lead, items }) {
  const { t } = useLang();
  return (
    <section data-rsp-pad style={{ padding: "24px 28px 72px" }}>
      <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
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
            {t("Hverdagen uten system", "Everyday life without a system")}
          </span>
        </div>
        <h2 style={{ ...H2, textAlign: "center" }}>{t("Kjenner du deg igjen?", "Sound familiar?")}</h2>
        <p style={{ margin: "12px auto 0", fontSize: 17, color: "#4C5E50", maxWidth: "36em", textAlign: "center" }}>{lead}</p>
        <div
          data-rsp-cols="3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, marginTop: 32 }}
        >
          {items.map(([title, text], i) => (
            <div
              key={title}
              style={{ borderRadius: 26, background: "#ffffff", border: "1px solid rgba(22,36,26,.12)", padding: 28 }}
            >
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 40, color: "#74cd85", lineHeight: 1 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ margin: "16px 0 8px", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20 }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#4C5E50" }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ how band */

/*
  rows: { kind, label, value, icon }
    kind "done"   — filled green ✓ circle, value in light green
    kind "active" — whole row green, dark → circle, bold label
    kind "note"   — outlined circle with `icon`, value muted
    kind "todo"   — dashed row, outlined circle with `icon` (default +)
*/
function HowBand({ title, steps, listTitle, listRight, rows }) {
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
            {steps.map(([h, p], i) => (
              <div key={h} style={{ display: "grid", gridTemplateColumns: "48px minmax(0,1fr)", gap: 16 }}>
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
                    {h}
                  </h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "rgba(246,248,243,.75)" }}>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{ borderRadius: 28, background: "rgba(246,248,243,.06)", border: "1px solid rgba(246,248,243,.14)", padding: 26 }}
        >
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
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "#f6f8f3" }}>{listTitle}</span>
            <span>{listRight}</span>
          </div>
          <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
            {rows.map((r) => (
              <StatusRow key={r.label} {...r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CIRCLE = { width: 28, height: 28, borderRadius: 999, display: "grid", placeItems: "center", flex: "0 0 auto" };

function StatusRow({ kind, label, value, icon }) {
  const row = { display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 18 };
  if (kind === "active") {
    return (
      <div style={{ ...row, background: "#74cd85", color: "#16241a" }}>
        <span aria-hidden="true" style={{ ...CIRCLE, background: "#16241a", color: "#a3e2ae", fontWeight: 800, fontSize: 13 }}>
          →
        </span>
        <span style={{ flex: 1, fontWeight: 700 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{value}</span>
      </div>
    );
  }
  if (kind === "done") {
    return (
      <div style={{ ...row, background: "rgba(246,248,243,.08)" }}>
        <span aria-hidden="true" style={{ ...CIRCLE, background: "#74cd85", color: "#16241a", fontWeight: 800, fontSize: 13 }}>
          ✓
        </span>
        <span style={{ flex: 1 }}>{label}</span>
        <span style={{ fontSize: 13, color: "#a3e2ae" }}>{value}</span>
      </div>
    );
  }
  const todo = kind === "todo";
  return (
    <div style={{ ...row, ...(todo ? { border: "1.5px dashed rgba(246,248,243,.3)" } : { background: "rgba(246,248,243,.08)" }) }}>
      <span aria-hidden="true" style={{ ...CIRCLE, border: "1.5px solid rgba(246,248,243,.5)", fontSize: 12 }}>
        {icon || (todo ? "+" : "!")}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ fontSize: 13, color: "rgba(246,248,243,.75)" }}>{value}</span>
    </div>
  );
}

/* --------------------------------------------------- set-up checklist */

function Setup({ title, lead, cardTitle, items }) {
  const { t } = useLang();
  const [checks, setChecks] = useState(() => Object.fromEntries(items.map((it) => [it.key, !!it.on])));
  const done = items.filter((it) => checks[it.key]).length;
  const pct = `${Math.round((done / items.length) * 100)}%`;

  return (
    <div
      data-rsp="stack"
      style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 48, alignItems: "center" }}
    >
      <div>
        <h2 style={H2}>{title}</h2>
        <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4C5E50", maxWidth: "30em" }}>{lead}</p>
      </div>
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
          <span style={{ flex: 1, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{cardTitle}</span>
          <span style={{ padding: "5px 12px", borderRadius: 999, background: "#eaf7ed", color: "#1f7a3a", fontSize: 13, fontWeight: 700 }}>
            {t(`${done} av ${items.length} klare`, `${done} of ${items.length} ready`)}
          </span>
        </div>
        <div
          aria-hidden="true"
          style={{ height: 8, borderRadius: 999, background: "#eef2ec", margin: "14px 0 6px", overflow: "hidden" }}
        >
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
              key={it.key}
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
                checked={!!checks[it.key]}
                onChange={() => setChecks((c) => ({ ...c, [it.key]: !c[it.key] }))}
                style={{ width: 20, height: 20, accentColor: "#1f7a3a", margin: 0 }}
              />
              <span style={{ flex: 1 }}>{it.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ "dette får du" */

function Gets({ title, lead, items }) {
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
        <p style={{ margin: "12px auto 0", fontSize: 17, lineHeight: 1.6, color: "#4C5E50", maxWidth: "36em" }}>{lead}</p>
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
                {it.icon}
              </svg>
            </span>
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
