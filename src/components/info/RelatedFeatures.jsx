import { designHref } from "../../lib/routes";
import { useLang } from "../../lib/langContext";

/*
  "Henger sammen med resten av Kretz" — the strip of three linked cards near
  the bottom of each feature page.

    <RelatedFeatures items={[{ file: "Kretz Roller.dc.html", title, text }]} />

  `file` is the design file name (resolved with designHref); `href` may be
  given instead. Cards use .kz-card hover from subpage.css.
*/
export default function RelatedFeatures({ title, items }) {
  const { t } = useLang();
  return (
    <section data-rsp-pad style={{ padding: "64px 28px 40px" }}>
      <div data-rsp-wide style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 34px)", margin: 0 }}>
          {title || t("Henger sammen med resten av Kretz", "Connected to the rest of Kretz")}
        </h2>
        <div
          data-rsp-cols="3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, marginTop: 24 }}
        >
          {items.map((it) => (
            <a
              key={it.file || it.href}
              href={it.href || designHref(it.file)}
              className="kz-card"
              style={{
                display: "block",
                borderRadius: 24,
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                padding: 26,
                color: "#16241a",
              }}
            >
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19 }}>{it.title}</h3>
              <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.55, color: "#4C5E50" }}>{it.text}</p>
              <span style={{ fontWeight: 600, color: "#1f7a3a" }}>
                {t("Les mer", "Read more")}{" "}
                <span className="kz-arr" aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
