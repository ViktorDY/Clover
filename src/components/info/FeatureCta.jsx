import Hv from "../Hv";
import { designHref } from "../../lib/routes";
import { useLang } from "../../lib/langContext";

/*
  The light-green closing band the feature pages end on: a heading, a short
  line and two buttons (both lead to the landing page's "Kom i gang" form by
  default). Pass `primary` / `secondary` as { label, href } or
  { label, onClick } to override either button.

  Responsive rules (data-kz-cta padding) live in
  src/styles/pages/feature-detail.css, scoped to .kz-sub.
*/
export default function FeatureCta({ title, text, primary, secondary }) {
  const { t } = useLang();
  const start = designHref("Kretz.dc.html#kom-i-gang");
  const p = { label: t("Kom i gang gratis", "Get started for free"), href: start, ...primary };
  const s = { label: t("Book en demo", "Book a demo"), href: start, ...secondary };

  return (
    <section data-rsp-pad style={{ padding: "40px 28px 90px" }}>
      <div
        data-rsp-wide
        data-rsp="stack"
        data-kz-cta
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          boxSizing: "border-box",
          borderRadius: 34,
          background: "linear-gradient(135deg, #a3e2ae 0%, #74cd85 100%)",
          color: "#16241a",
          padding: "56px 64px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "28px 48px",
          alignItems: "center",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.4vw, 42px)",
              lineHeight: 1.08,
              margin: 0,
              color: "#16241a",
            }}
          >
            {title}
          </h2>
          <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "#22382a", maxWidth: "32em" }}>{text}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <CtaButton
            {...p}
            style="display: inline-flex; align-items: center; padding: 15px 26px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 15px; white-space: nowrap; border: 0; cursor: pointer; transition: background .3s, transform .3s cubic-bezier(.2,.7,.2,1)"
            hover="background: #1f3a27; color: #f6f8f3; transform: translateY(-2px)"
          />
          <CtaButton
            {...s}
            style="display: inline-flex; align-items: center; padding: 15px 26px; border-radius: 999px; background: transparent; border: 1px solid #16241a; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 15px; white-space: nowrap; cursor: pointer; transition: background .3s, color .3s, transform .3s cubic-bezier(.2,.7,.2,1)"
            hover="background: #16241a; color: #f6f8f3; transform: translateY(-2px)"
          />
        </div>
      </div>
    </section>
  );
}

function CtaButton({ label, href, onClick, style, hover }) {
  if (onClick) {
    return (
      <Hv as="button" type="button" onClick={onClick} style={style} hover={hover}>
        {label}
      </Hv>
    );
  }
  return (
    <Hv as="a" href={href} style={style} hover={hover}>
      {label}
    </Hv>
  );
}
