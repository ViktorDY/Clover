import { useEffect, useRef, useState } from "react";
import SectionLink from "./SectionLink";
import { useLang } from "../lib/langContext";
import coach from "../assets/design/about-coach.jpg";
import tripletex from "../assets/design/logo-tripletex.svg";
import fiken from "../assets/design/logo-fiken.svg";
import unimicro from "../assets/design/logo-unimicro.svg";
import nif from "../assets/design/logo-nif.svg";
import vipps from "../assets/design/logo-vipps.svg";
import ms365 from "../assets/design/logo-ms365.svg";

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

const INTEGRATIONS = [
  { name: "Tripletex", logo: tripletex },
  { name: "Fiken", logo: fiken },
  { name: "Uni Micro", logo: unimicro },
  { name: "NIF", logo: nif, sub: "Min idrett" },
  { name: "Vipps", logo: vipps, wordmark: true },
  { name: "Microsoft 365", logo: ms365 },
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

      {/* Integrations */}
      <div
        data-reveal
        className="mx-auto mt-12 grid max-w-[1200px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-[clamp(28px,4vw,56px)] rounded-[40px] bg-[#E3ECDF] p-[clamp(28px,4.5vw,56px)] max-[760px]:grid-cols-[minmax(0,1fr)] min-[1680px]:max-w-[1440px]"
      >
        <div>
          <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#4C5E50]">
            {t("Integrasjoner", "Integrations")}
          </div>
          <h2 className="mb-0 mt-3 font-heading text-[clamp(28px,3.6vw,46px)] font-extrabold leading-[1.04] tracking-[-0.035em]! text-ink">
            {t("Fungerer med verktøyene dere allerede bruker", "Works with the tools you already use")}
          </h2>
          <p className="mb-0 mt-4 max-w-[30em] text-[16px] leading-[1.6] text-[#4C5E50]">
            {t(
              "Kretz integrerer med populære systemer, slik at dere får alt samlet på ett sted.",
              "Kretz integrates with popular systems, so you get everything in one place.",
            )}
          </p>
        </div>
        <div className="relative mb-[92px]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            {INTEGRATIONS.map((item) => (
              <div
                key={item.name}
                className="box-border flex min-h-[72px] items-center gap-3 rounded-[20px] border border-[#D6E2D2] bg-white px-5 py-[18px] transition-[translate,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(22,36,26,0.1)]"
              >
                {item.wordmark ? (
                  <img src={item.logo} alt={item.name} className="h-7 w-16 shrink-0 object-contain" />
                ) : (
                  <>
                    <img src={item.logo} alt="" className="h-7 w-7 shrink-0 object-contain" />
                    <span>
                      <span className="block text-[15px] font-bold text-ink">{item.name}</span>
                      {item.sub && <span className="block text-[12px] text-[#4C5E50]">{item.sub}</span>}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="kz-hand pointer-events-none absolute bottom-[-92px] right-2 -rotate-8 text-center text-[20px] leading-[1.1] text-ink"
          >
            {t("Automatisk", "Automatic")}
            <br />
            {t("og oppdatert", "and up to date")}
            <svg
              width="46"
              height="34"
              viewBox="0 0 46 34"
              fill="none"
              stroke="#16241A"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="mx-auto mt-0.5 block rotate-10"
            >
              <path d="M40 2c-6 16-20 26-36 28" />
              <path d="M10 25l-6 5 7 2" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
