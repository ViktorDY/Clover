import { useEffect, useRef, useState } from "react";
import SectionLink from "./SectionLink";
import { useLang } from "../lib/langContext";
import { designHref } from "../lib/routes";
import coach from "../assets/design/about-coach.jpg";
import tripletex from "../assets/design/logo-tripletex.svg";
import fiken from "../assets/design/logo-fiken.svg";
import unimicro from "../assets/design/logo-unimicro.svg";
import nif from "../assets/design/logo-nif.svg";
import vipps from "../assets/design/logo-vipps.svg";
import ms365 from "../assets/design/logo-ms365.svg";
import brreg from "../assets/design/logo-brreg.png";
import altinn from "../assets/design/logo-altinn.png";

// Counts from 0 to `to` (ease-out, 1.4 s) the first time it scrolls into view.
function CountUp({ to }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const run = () => {
      if (reduce) {
        setValue(to);
        return;
      }
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / 1400);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{value}</span>;
}

// Logo tiles around the integrations pitch (positions from the design).
const TILES = [
  { name: "Tripletex", logo: tripletex, w: 40, h: 40, pos: { left: "13%", top: "7%" }, delay: "0s", rot: "-3deg" },
  { name: "Fiken", logo: fiken, w: 40, h: 40, pos: { left: "3%", top: "31%" }, delay: "1.1s", rot: "2deg" },
  { name: "Uni Micro", logo: unimicro, w: 40, h: 40, pos: { left: "3%", top: "55%" }, delay: ".5s", rot: "-2deg" },
  { name: "Brønnøysundregistrene", logo: brreg, w: 44, h: 44, pos: { left: "13%", top: "78%" }, delay: "1.6s", rot: "3deg" },
  { name: "Vipps", logo: vipps, w: 56, h: 28, pos: { right: "13%", top: "7%" }, delay: ".8s", rot: "3deg" },
  { name: "NIF", logo: nif, w: 40, h: 40, pos: { right: "3%", top: "31%" }, delay: "1.4s", rot: "-2deg" },
  { name: "Microsoft 365", logo: ms365, w: 40, h: 40, pos: { right: "3%", top: "55%" }, delay: ".3s", rot: "2deg" },
  { name: "Altinn", logo: altinn, w: 44, h: 44, pos: { right: "13%", top: "78%" }, delay: "1.9s", rot: "-3deg" },
];

const statNumber =
  "font-heading text-[clamp(30px,3.4vw,44px)] font-extrabold tracking-[-0.03em]";
const statLabel = "mt-1 text-[14px] leading-[1.4] text-[#4C5E50]";

export default function Features() {
  const { t } = useLang();

  return (
    <section id="funksjoner" className="kz-pad kz-pad-m relative pt-6 max-[560px]:mx-2 max-[560px]:my-4 max-[560px]:pb-[52px] max-[560px]:pt-12">
      {/* Made for volunteers */}
      <div
        data-reveal
        className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-[clamp(28px,4vw,56px)] max-[760px]:grid-cols-[minmax(0,1fr)] min-[1680px]:max-w-[1440px]"
      >
        <div>
          <h2 className="m-0 font-heading text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-0.035em]! text-ink">
            {t("Skapt for frivillige.", "Made for volunteers.")}
            <br />
            {t("Bygget sammen med klubber i Midt-Norge.", "Built together with clubs in Central Norway.")}
          </h2>
          <p className="mb-0 mt-[18px] max-w-[32em] text-[17px] leading-[1.65] text-[#4C5E50]">
            {t(
              "Kretz startet i Trondheim, der frivillige brukte mer tid på fakturaer enn på spillerne. Vi bygger verktøyet vi selv skulle hatt – sammen med klubber i Midt-Norge.",
              "Kretz started in Trondheim, where volunteers spent more time on invoices than on the players. We're building the tool we wished we had – together with clubs in Central Norway.",
            )}
          </p>
          <div className="mt-8 grid grid-cols-3">
            <div className="border-r border-[#D6E2D2] pr-5">
              <div className={`${statNumber} text-ink`}>
                <CountUp to={500} />+
              </div>
              <div className={statLabel}>
                {t("klubber", "clubs")}
                <br />
                {t("undersøkt", "surveyed")}
              </div>
            </div>
            <div className="border-r border-[#D6E2D2] px-5">
              <div className={`${statNumber} text-ink`}>
                <CountUp to={10} />+
              </div>
              <div className={statLabel}>
                {t("idretter", "sports")}
                <br />
                {t("i kontakt", "in contact")}
              </div>
            </div>
            <div className="pl-5">
              <div className={`${statNumber} text-[#5FA866]`}>
                <CountUp to={62} />%
              </div>
              <div className={statLabel}>
                {t("tar beslutninger uten", "make decisions without")}
                <br />
                {t("oppdaterte økonomitall", "up-to-date financial figures")}
              </div>
            </div>
          </div>
          <SectionLink
            to="om-oss"
            className="kz-arrow-btn mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#8BCB8B] px-6 py-3.5 font-heading text-[15px] font-extrabold text-ink"
          >
            {t("Les mer om oss", "Read more about us")}{" "}
            <span className="kz-arr" aria-hidden="true">
              →
            </span>
          </SectionLink>
        </div>

        <div className="relative min-h-[380px]">
          <div className="absolute inset-0 overflow-hidden rounded-[36px] shadow-[0_30px_70px_rgba(22,36,26,0.18)]">
            <img
              src={coach}
              alt={t("Trener samler laget på kunstgresset", "Coach gathers the team on the artificial turf")}
              className="block h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-9 left-[-24px] flex max-w-[320px] items-start gap-3 rounded-3xl border border-[#D6E2D2] bg-[#F4F7F1] px-5 py-[18px] shadow-[0_20px_44px_rgba(22,36,26,0.14)]">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E3ECDF] text-[14px] font-extrabold text-[#5FA866]">
              “
            </span>
            <span>
              <span className="block text-[15px] font-bold leading-[1.45] text-ink">
                {t(
                  "«Endelig et system som faktisk er laget for idrettslag.»",
                  "“Finally a system that's actually made for sports clubs.”",
                )}
              </span>
              <span className="mt-1.5 block text-[13px] text-[#4C5E50]">
                {t("– Trener, G14", "– Coach, G14")}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Integrations: centred pitch with the partner logos floating around it */}
      <div
        data-reveal
        data-kz-int
        className="relative mx-auto mt-12 box-border flex min-h-[520px] max-w-[1200px] flex-col justify-center overflow-hidden rounded-[40px] bg-[#E3ECDF] px-[clamp(28px,4.5vw,56px)] py-[72px] min-[1680px]:max-w-[1440px]"
      >
        <svg
          data-kz-int-lines
          aria-hidden="true"
          viewBox="0 0 1200 520"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path d="M150 260 H1050" fill="none" stroke="rgba(31,122,58,.28)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path
            d="M330 110 V200 Q330 258 388 258 H812 Q870 258 870 200 V110"
            fill="none"
            stroke="rgba(31,122,58,.22)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M330 410 V320 Q330 262 388 262 H812 Q870 262 870 320 V410"
            fill="none"
            stroke="rgba(31,122,58,.22)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="relative z-[1] mx-auto max-w-[540px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(116,205,133,0.45)] bg-white/75 px-5 py-2.5 text-[15px] font-semibold text-ink">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.8L12 3z"
                fill="none"
                stroke="#16241A"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            <span>{t("Integrasjoner", "Integrations")}</span>
          </span>
          <h2 className="relative top-[-10px] mb-0 mt-2.5 font-heading text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.06] tracking-[-0.035em]! text-ink">
            {t("Sømløse integrasjoner – rett i Kretz", "Seamless integrations – right in Kretz")}
          </h2>
          <p className="mx-auto mb-0 mt-[22px] max-w-[30em] text-[16.5px] leading-[1.75] text-[#3b4d3f]">
            {t(
              "Koble Kretz til systemene du allerede bruker – som Tripletex, Vipps, Brønnøysundregistrene og Altinn. Mindre dobbeltarbeid, mer effektiv flyt.",
              "Connect Kretz to the systems you already use – like Tripletex, Vipps, the Brønnøysund Register Centre and Altinn. Less double work, a smoother flow.",
            )}
          </p>
          <a
            href={designHref("Kretz Integrasjoner.dc.html")}
            className="mt-[18px] inline-flex items-center gap-1.5 text-[15px] font-semibold text-moss transition-colors hover:text-ink"
          >
            {t("Se alle integrasjoner ↗", "See all integrations ↗")}
          </a>
        </div>
        <div data-kz-int-tiles className="pointer-events-none absolute inset-0">
          {TILES.map((tile) => (
            <div
              key={tile.name}
              className="kz-int-tile pointer-events-auto absolute grid h-[84px] w-[84px] place-items-center rounded-3xl border border-[rgba(116,205,133,0.4)] bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.35),0_16px_36px_rgba(31,122,58,0.14)]"
              title={tile.name}
              style={{ ...tile.pos, animationDelay: tile.delay, "--rot": tile.rot }}
            >
              {tile.logo ? (
                <img src={tile.logo} alt={tile.name} style={{ width: tile.w, height: tile.h, objectFit: "contain" }} />
              ) : (
                // Logo file not in the repo yet: neutral stand-in of the same size.
                <span
                  role="img"
                  aria-label={tile.name}
                  className="grid h-11 w-11 place-items-center rounded-xl bg-[#E3ECDF] font-heading text-[13px] font-extrabold text-[#3b4d3f]"
                >
                  {tile.short}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
