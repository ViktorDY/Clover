import { useEffect, useRef } from "react";
import SectionLink from "./SectionLink";
import { useLang } from "../lib/langContext";

// Scroll distance (px) at which each staged element fades in: ring, kicker,
// lede, buttons + trust row.
const STAGE_AT = [2, 20, 45, 75];

function Check() {
  return (
    <span className="grid h-5 w-[18px] place-items-center rounded-full bg-[#8BCB8B] text-ink">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

/*
  The hero is a pinned stage. On arrival the headline sits large in the middle
  of the ring; as the page scrolls (or after a short automatic intro) it
  shrinks into place and the kicker, lede, buttons and trust row rise in.
*/
export default function Hero({ onOpenBooking }) {
  const { t, isEn } = useLang();
  const sectionRef = useRef(null);
  const blockRef = useRef(null);
  const h1Ref = useRef(null);
  const updateRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const blk = blockRef.current;
    const h1 = h1Ref.current;
    if (!section || !blk || !h1) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stages = Array.from(section.querySelectorAll("[data-kz-stage]"));

    let introY = 0;
    let introDone = false;

    const update = () => {
      const y = Math.max(window.scrollY || 0, introY);
      stages.forEach((el) =>
        el.classList.toggle("kz-in", y > STAGE_AT[Number(el.dataset.kzStage)]),
      );

      // Keep the headline centred in the ring until the stage has played.
      const off = blk.offsetHeight / 2 - (h1.offsetTop + h1.offsetHeight / 2);
      const pb = reduce ? 1 : Math.min(1, Math.max(0, y / 200));
      const eb = 1 - Math.pow(1 - pb, 2);
      blk.style.setProperty("--kz-off", `${Math.round(off)}px`);
      blk.style.setProperty("--kz-blk", (1 - eb).toFixed(4));

      // Start big (80% of the viewport, at most 2.2×) and settle at 1×.
      if (h1.firstChild) {
        const range = document.createRange();
        range.selectNodeContents(h1.firstChild);
        const current = parseFloat(h1.style.getPropertyValue("--kz-h1s") || "1.5") || 1;
        const natural = range.getBoundingClientRect().width / current;
        const big = Math.max(1, Math.min(2.2, (window.innerWidth * 0.8) / (natural || 1)));
        const p = reduce ? 1 : Math.min(1, Math.max(0, y / 190));
        const e = 1 - Math.pow(1 - p, 3);
        h1.style.setProperty("--kz-h1s", (big + (1 - big) * e).toFixed(4));
      }
    };
    updateRef.current = update;

    const finishIntro = () => {
      introDone = true;
      introY = 300;
      update();
    };
    const onScroll = () => {
      if (!introDone && (window.scrollY || 0) > 2) {
        introDone = true;
        introY = 300;
      }
      update();
    };

    let raf = 0;
    if (!reduce && (window.scrollY || 0) < 10) {
      const t0 = performance.now() + 900;
      const dur = 1300;
      const step = (now) => {
        if (introDone) return;
        if (now >= t0) {
          const p = Math.min(1, (now - t0) / dur);
          const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          introY = 300 * eased;
          update();
          if (p >= 1) {
            introDone = true;
            return;
          }
        }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    } else {
      introDone = true;
      introY = 300;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("wheel", finishIntro, { passive: true, once: true });
    window.addEventListener("touchmove", finishIntro, { passive: true, once: true });
    update();
    const late1 = window.setTimeout(update, 250);
    const late2 = window.setTimeout(update, 900);
    document.fonts?.ready?.then(() => updateRef.current && updateRef.current());

    return () => {
      introDone = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(late1);
      window.clearTimeout(late2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      window.removeEventListener("wheel", finishIntro);
      window.removeEventListener("touchmove", finishIntro);
      updateRef.current = null;
    };
  }, []);

  // The headline changes width with the language; re-measure.
  useEffect(() => {
    updateRef.current?.();
  }, [isEn]);

  const trust = [
    t("Enkel i bruk", "Easy to use"),
    t("Tilpasset norske klubber", "Built for Norwegian clubs"),
    t("Utviklet sammen med klubber i Midt-Norge", "Developed together with clubs in Central Norway"),
  ];

  return (
    <section
      id="topp"
      ref={sectionRef}
      className="kz-hero kz-pad kz-pad-m relative isolate block overflow-x-clip overflow-y-visible pt-0"
    >
      <div className="kz-hero-pin">
        <div
          ref={blockRef}
          data-reveal
          className="relative mx-auto w-[min(960px,78vw)] max-w-full px-3 text-center"
          style={{
            transform: "translateY(calc(var(--kz-blk, 1) * var(--kz-off, 66px)))",
            transition: "opacity .9s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <div
            data-kz-stage="0"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <svg
              viewBox="0 0 1000 1000"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(104vw,1120px)] w-[min(104vw,1120px)] max-w-none -translate-x-1/2 -translate-y-1/2"
            >
              <g transform="rotate(-60 500 500)">
                <circle
                  cx="500"
                  cy="500"
                  r="410"
                  fill="none"
                  stroke="rgba(139,203,139,.12)"
                  strokeWidth="90"
                />
              </g>
              <circle
                cx="500"
                cy="500"
                r="330"
                fill="none"
                stroke="rgba(22,36,26,.1)"
                strokeWidth="1.5"
                strokeDasharray="5 9"
              />
            </svg>
          </div>

          <div
            data-kz-stage="1"
            className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-grass-soft bg-transparent px-5 py-2 text-[12px] font-bold uppercase tracking-[0.16em] text-moss"
          >
            <span className="kz-pulse h-[7px] w-[7px] rounded-full bg-grass" />
            <span>{t("For klubber og lag", "For clubs and teams")}</span>
          </div>

          <h1
            ref={h1Ref}
            className="kz-hero-h1 mx-0 mb-0 mt-[18px] font-heading text-[clamp(36px,7.4vw,112px)] font-extrabold leading-none tracking-[-0.035em]!"
            style={{ transform: "scale(var(--kz-h1s, 1.5))" }}
          >
            {t("Alt klubben trenger.", "Everything your club needs.")}
            <br />
            <span className="inline-block rounded-[2px] border-b-[0.09em] border-[#FFD23F] pb-[0.04em] text-grass">
              {t("Ett sted.", "One place.")}
            </span>
          </h1>

          <p
            data-kz-stage="2"
            className="mx-auto mb-0 mt-4 max-w-[28em] text-[clamp(13.5px,1.1vw,16px)] leading-[1.5] text-ink/75"
          >
            {t(
              "Barn, ungdom, foreldre og styret i samme app: treninger, påmelding, kontingent og hallbooking. Mindre papir, mer spilletid.",
              "Kids, teens, parents and the board in one app: training, sign-ups, fees and hall booking. Less paperwork, more playing time.",
            )}
          </p>

          <div data-kz-stage="3" className="mt-6 flex flex-wrap justify-center gap-2.5">
            <SectionLink
              to="kom-i-gang"
              className="kz-arrow-btn inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-grass px-6 py-[13px] font-heading text-[14.5px] font-extrabold text-ink shadow-[0_16px_44px_rgba(116,205,133,0.32)] hover:-translate-y-[3px] hover:shadow-[0_22px_56px_rgba(116,205,133,0.42)]"
            >
              {t("Kontakt oss", "Contact us")}{" "}
              <span className="kz-arr" aria-hidden="true">
                →
              </span>
            </SectionLink>
            <button
              type="button"
              onClick={onOpenBooking}
              className="kz-book inline-flex cursor-pointer items-center gap-3.5 whitespace-nowrap rounded-[20px] border-2 border-dashed border-ink/35 bg-paper py-[11px] pl-4 pr-[22px] font-heading text-[14.5px] font-extrabold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-solid hover:border-grass hover:bg-white hover:shadow-[0_14px_34px_rgba(116,205,133,0.28)]"
            >
              <span aria-hidden="true" className="grid grid-cols-[repeat(3,9px)] gap-1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`h-[9px] w-[9px] rounded-[2px] bg-[#cfe6d3] ${
                      i === 3 ? "kz-book-dot transition-[background,transform] duration-300" : ""
                    }`}
                  />
                ))}
              </span>
              <span>{t("Book halltid", "Book a hall")}</span>
            </button>
          </div>

          <div
            data-kz-stage="3"
            className="mt-5 flex flex-wrap justify-center gap-x-[18px] gap-y-2"
          >
            {trust.map((label) => (
              <span key={label} className="inline-flex items-center gap-[7px] text-[13px] text-ink">
                <Check />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
