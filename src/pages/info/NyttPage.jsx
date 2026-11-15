import { useState } from "react";
import SubpageHeader from "../../components/SubpageHeader";
import Hv from "../../components/Hv";
import { designHref } from "../../lib/routes";
import { useLang } from "../../lib/langContext";
import { sx } from "../../lib/sx";
import "../../styles/subpage.css";
import "../../styles/pages/nytt.css";

/*
  "Kretz Nytt.dc.html" — news from NIF and the national federations, with a
  source filter. The first story of the current filter is the featured one.
  The news itself is Norwegian only (it is quoted from the sources); the page
  chrome around it is translated.
*/

const NEWS = [
  {
    source: "NIF",
    sourceName: ["Norges idrettsforbund", "Norwegian Olympic and Paralympic Committee and Confederation of Sports"],
    tag: "Foreldrevett",
    date: ["5. nov 2026", "5 Nov 2026"],
    title: "Foreldrevettpatruljen rykker ut – med humor og glimt i øyet",
    summary:
      "NIF lanserer en kampanje med sju korte humorfilmer om ivrige idrettsforeldre – nyttig å dele med foreldregruppa før neste kamp.",
    url: "https://www.idrettsforbundet.no/nyheter/2026/foreldrevettpatruljen-rykker-ut--med-humor-og-glimt-i-oyet/",
  },
  {
    source: "NIF",
    sourceName: ["Norges idrettsforbund", "Norwegian Olympic and Paralympic Committee and Confederation of Sports"],
    tag: "Trenerutvikling",
    date: ["3. nov 2026", "3 Nov 2026"],
    title: "Samlet trenerutviklere fra hele norsk idrett",
    summary:
      "Rundt 50 trenerutviklere fra særforbund og idrettskretser møttes for å styrke støtten til dem som utvikler trenerne i klubbene.",
    url: "https://www.idrettsforbundet.no/nyheter/2026/samlet-trenerutviklere-fra-hele-norsk-idrett/",
  },
  {
    source: "NIF",
    sourceName: ["Norges idrettsforbund", "Norwegian Olympic and Paralympic Committee and Confederation of Sports"],
    tag: "Team Norway",
    date: ["3. nov 2026", "3 Nov 2026"],
    title: "Søk blant alle norske OL-utøvere gjennom tidene",
    summary: "Nytt søkeverktøy samler alle norske olympiere i historien på ett sted.",
    url: "https://www.idrettsforbundet.no/nyheter/2026/sok-blant-alle-norske-ol-utovere-gjennom-tidene/",
  },
  {
    source: "NIF",
    sourceName: ["Norges idrettsforbund", "Norwegian Olympic and Paralympic Committee and Confederation of Sports"],
    tag: "Statsbudsjett",
    date: ["22. okt 2026", "22 Oct 2026"],
    title: "Statsbudsjettet 2027: Høringsinnspill til næringskomiteen",
    summary:
      "NIF ber om en forutsigbar ramme på minst 100 millioner kroner for å hente flere internasjonale idrettsarrangementer til Norge.",
    url: "https://www.idrettsforbundet.no/nyheter/2026/statsbudsjettet-2027-horingsinnspill-til-naringskomiteen-pa-stortinget/",
  },
  {
    source: "NFF",
    sourceName: ["Norges Fotballforbund", "Football Association of Norway"],
    tag: "Klubbutvikling",
    date: ["2026", "2026"],
    title: "Breddeseminar – med hjerte i klubben",
    summary: "NFFs breddeseminar for klubbene – les mer om program og tema hos fotball.no.",
    url: "https://www.fotball.no/tema/nff-nyheter/2026/breddeseminar--med-hjerte-i-klubben/",
  },
  {
    source: "NFF",
    sourceName: ["Norges Fotballforbund", "Football Association of Norway"],
    tag: "Eliteserien",
    date: ["2026", "2026"],
    title: "Runde 12 i Eliteserien flyttes til 25. oktober",
    summary: "Kampene i runde 12 er flyttet. Sjekk terminlista hvis klubben har planlagt felles kamptur.",
    url: "https://www.fotball.no/turneringer/eliteserien/2026/runde-12-i-eliteserien-flyttes-til-25.-oktober",
  },
  {
    source: "NFF",
    sourceName: ["Norges Fotballforbund", "Football Association of Norway"],
    tag: "Regelverk",
    date: ["2026", "2026"],
    title: "Endringer i breddereglementet for 2026",
    summary:
      "Oversikt over hva som er nytt i breddereglementet – relevant for alle lagledere og trenere i barne- og ungdomsfotballen.",
    url: "https://www.fotball.no/kretser/hordaland/aktivitet/artikkel/2026/breddereglementet-endringer-for-2026/",
  },
  {
    source: "NFF",
    sourceName: ["Norges Fotballforbund", "Football Association of Norway"],
    tag: "Spilleregler",
    date: ["2026", "2026"],
    title: "Nye spilleregler for 2026",
    summary: "Kretsen går gjennom endringene i spillereglene som gjelder fra 2026-sesongen.",
    url: "https://www.fotball.no/kretser/rogaland/aktivitet/2026/nye-spilleregler-for-2026/",
  },
];

const BADGE = {
  NIF: "padding: 4px 10px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-weight: 700; font-size: 12px; letter-spacing: .04em",
  NFF: "padding: 4px 10px; border-radius: 999px; background: #FFD23F; color: #16241a; font-weight: 700; font-size: 12px; letter-spacing: .04em",
};

const FILTER_BASE =
  "cursor: pointer; padding: 10px 18px; border-radius: 999px; font-family: var(--font-body); font-size: 14px; font-weight: 600; transition: background .3s, color .3s, border-color .3s;";
const FILTER_ON = " background: #16241a; color: #f6f8f3; border: 1px solid #16241a;";
const FILTER_OFF = " background: transparent; color: #16241a; border: 1px solid rgba(22,36,26,.25);";

const count = (src) => NEWS.filter((n) => n.source === src).length;

export default function NyttPage() {
  const { t } = useLang();
  const [filter, setFilter] = useState("alle");

  const list = NEWS.filter((n) => filter === "alle" || n.source === filter);
  const featured = list[0];
  const items = list.slice(1);

  const filters = [
    { id: "alle", label: t("Alle", "All"), count: NEWS.length },
    { id: "NIF", label: t("Idrettsforbundet (NIF)", "Sports confederation (NIF)"), count: count("NIF") },
    { id: "NFF", label: t("Fotball (NFF)", "Football (NFF)"), count: count("NFF") },
  ];

  return (
    <div className="kz-sub kz-nytt">
      <SubpageHeader>
        <span data-kz-hidemob style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "#4C5E50" }}>
          <span
            aria-hidden="true"
            style={{ width: 8, height: 8, borderRadius: 999, background: "#3fa45a", boxShadow: "0 0 0 4px rgba(63,164,90,.18)" }}
          />
          {t("Oppdatert 7. november 2026", "Updated 7 November 2026")}
        </span>
      </SubpageHeader>

      <main data-rsp-wide data-rsp-pad style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 96px" }}>
        <div
          style={sx(
            "display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px; border-radius: 999px; border: 1.5px solid #a3e2ae; font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #1f7a3a",
          )}
        >
          {t("Siste nytt", "Latest news")}
        </div>
        <h1
          style={sx(
            "font-family: var(--font-heading); font-weight: 800; font-size: clamp(34px, 5.4vw, 60px); line-height: 1.02; margin: 18px 0 0; max-width: 14em",
          )}
        >
          {t("Nytt fra norsk idrett – samlet for klubben din", "News from Norwegian sport – gathered for your club")}
        </h1>
        <p style={sx("margin: 18px 0 0; font-size: 17px; line-height: 1.65; color: #4C5E50; max-width: 38em")}>
          {t(
            "Oppdateringer fra Norges idrettsforbund og særforbundene, på ett sted. Foreløpig henter vi fra NIF og Norges Fotballforbund – flere særforbund kommer.",
            "Updates from the Norwegian sports confederation and the national federations, in one place. For now we collect from NIF and the Football Association of Norway – more federations are coming. The stories themselves are in Norwegian.",
          )}
        </p>

        <div
          role="group"
          aria-label={t("Filtrer etter kilde", "Filter by source")}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 34 }}
        >
          {filters.map((f) => {
            const on = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                className="kzn-filter"
                onClick={() => setFilter(f.id)}
                aria-pressed={on ? "true" : "false"}
                style={sx(FILTER_BASE + (on ? FILTER_ON : FILTER_OFF))}
              >
                {f.label} <span style={{ opacity: 0.7, fontWeight: 600 }}>{f.count}</span>
              </button>
            );
          })}
        </div>

        {featured && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener"
            lang="nb"
            className="kz-card"
            data-rsp="stack"
            style={sx(
              "display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); margin-top: 28px; border-radius: 30px; overflow: hidden; background: #16241a; color: #f6f8f3; border: 1px solid #16241a",
            )}
          >
            <div
              aria-hidden="true"
              style={sx(
                "position: relative; min-height: 280px; background: radial-gradient(120% 90% at 20% 20%, #74cd85 0%, #2f7a45 45%, #16241a 100%); overflow: hidden",
              )}
            >
              <svg
                viewBox="0 0 400 300"
                preserveAspectRatio="xMidYMid slice"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              >
                <circle cx="300" cy="80" r="140" fill="none" stroke="rgba(246,248,243,.18)" strokeWidth="2" />
                <circle
                  cx="300"
                  cy="80"
                  r="90"
                  fill="none"
                  stroke="rgba(246,248,243,.12)"
                  strokeWidth="2"
                  strokeDasharray="5 8"
                />
                <circle cx="90" cy="250" r="70" fill="rgba(255,210,63,.85)" />
              </svg>
              <span
                style={sx(
                  "position: absolute; left: 24px; bottom: 22px; font-family: var(--font-heading); font-weight: 800; font-size: 64px; letter-spacing: -.04em; color: rgba(246,248,243,.92)",
                )}
              >
                {featured.source}
              </span>
            </div>
            <div style={{ padding: "36px 36px 34px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                lang={t("nb", "en")}
                style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(246,248,243,.75)" }}
              >
                <span
                  style={sx(
                    "padding: 4px 10px; border-radius: 999px; background: #FFD23F; color: #16241a; font-weight: 700; font-size: 12px",
                  )}
                >
                  {t("Hovedsak", "Top story")}
                </span>
                <span>{t(...featured.sourceName)}</span>
                <span aria-hidden="true">·</span>
                <span>{t(...featured.date)}</span>
              </div>
              <h2
                style={sx(
                  "margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: clamp(24px, 2.6vw, 34px); line-height: 1.1; color: #f6f8f3",
                )}
              >
                {featured.title}
              </h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "rgba(246,248,243,.8)" }}>{featured.summary}</p>
              <div style={{ flex: 1 }} />
              <span
                lang={t("nb", "en")}
                style={sx(
                  "display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-heading); font-weight: 800; font-size: 15px; color: #a3e2ae",
                )}
              >
                {t("Les hele saken", "Read the full story")}{" "}
                <span className="kz-arr" aria-hidden="true">
                  ↗
                </span>
              </span>
            </div>
          </a>
        )}

        <div
          data-rsp-cols="3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, marginTop: 18 }}
        >
          {items.map((it) => (
            <a
              key={it.url}
              href={it.url}
              target="_blank"
              rel="noopener"
              lang="nb"
              className="kz-card"
              style={sx(
                "display: flex; flex-direction: column; gap: 12px; padding: 24px 24px 22px; border-radius: 24px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); color: #16241a; min-height: 230px",
              )}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#4C5E50" }}>
                <span style={sx(BADGE[it.source])}>{it.source}</span>
                <span>{it.tag}</span>
                <span style={{ flex: 1 }} />
                <span lang={t("nb", "en")}>{t(...it.date)}</span>
              </div>
              <h3
                style={sx(
                  "margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 20px; line-height: 1.18; color: #16241a",
                )}
              >
                {it.title}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#4C5E50" }}>{it.summary}</p>
              <div style={{ flex: 1 }} />
              <span
                lang={t("nb", "en")}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#1f7a3a" }}
              >
                {t(`Les hos ${it.source}`, `Read at ${it.source}`)}{" "}
                <span className="kz-arr" aria-hidden="true">
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>

        <div
          data-rsp="stack"
          style={sx(
            "display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 20px; align-items: center; margin-top: 48px; padding: 28px 30px; border-radius: 26px; border: 2px dashed rgba(22,36,26,.22)",
          )}
        >
          <div>
            <h2 style={sx("margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 22px")}>
              {t("Savner du ditt særforbund?", "Missing your federation?")}
            </h2>
            <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.6, color: "#4C5E50" }}>
              {t(
                "Håndball, ski, svømming og flere er på vei. Si fra hvilket forbund klubben din hører til, så prioriterer vi det.",
                "Handball, skiing, swimming and more are on the way. Tell us which federation your club belongs to, and we will prioritise it.",
              )}
            </p>
          </div>
          <Hv
            as="a"
            href={designHref("Kretz.dc.html#kom-i-gang")}
            style="display: inline-flex; align-items: center; gap: 10px; padding: 14px 24px; border-radius: 999px; background: #74cd85; color: #16241a; font-family: var(--font-heading); font-weight: 800; font-size: 15px; white-space: nowrap; transition: background .3s, transform .3s cubic-bezier(.2,.7,.2,1)"
            hover="background: #a3e2ae; transform: translateY(-2px)"
          >
            {t("Gi oss beskjed →", "Let us know →")}
          </Hv>
        </div>

        <p style={{ margin: "28px 0 0", fontSize: 13, lineHeight: 1.6, color: "#4C5E50" }}>
          {t(
            "Sakene er hentet fra idrettsforbundet.no og fotball.no. Titler og innhold tilhører kildene – klikk deg videre for hele saken.",
            "The stories come from idrettsforbundet.no and fotball.no. Titles and content belong to the sources – click through for the full story.",
          )}
        </p>
      </main>
    </div>
  );
}
