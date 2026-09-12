import { useEffect, useRef, useState } from "react";
import { useLang } from "../lib/langContext";

// How many cards sit side by side at a given viewport width.
function perViewFor(width) {
  if (width < 620) return 1;
  if (width < 980) return 2;
  return 3;
}

export default function Customers() {
  const { t } = useLang();

  const reviews = [
    {
      quote: t(
        "«Vi gikk fra fire regneark og en skoeske til én skjerm. Kassereren smiler faktisk i november nå.»",
        "“We went from four spreadsheets and a shoebox to one screen. The treasurer actually smiles in November now.”",
      ),
      who: t(
        "Marit Sunde · styreleder, Vålerenga Håndball",
        "Marit Sunde · board leader, Vålerenga Håndball",
      ),
    },
    {
      quote: t(
        "«Cup-påmelding tok før en hel helg. Nå tar det en kaffepause.»",
        "“Sign-ups for cups used to take a full weekend. Now it takes a coffee break.”",
      ),
      who: t("Jonas Reite · sportslig leder, IL Fana", "Jonas Reite · sports director, IL Fana"),
    },
    {
      quote: t(
        "«Sponsorene ser endelig hva de får. Fornyelser gikk fra ringerunde til formalitet.»",
        "“Our sponsors finally see what they get. Renewals went from a phone campaign to a formality.”",
      ),
      who: t("Ida Krogh · partneransvarlig, Molde Turn", "Ida Krogh · partner manager, Molde Turn"),
    },
    {
      quote: t(
        "«Foreldrene booker halltid selv. Telefonen min er stille på søndag kveld.»",
        "“Parents book hall time themselves. My phone is quiet on Sunday evenings.”",
      ),
      who: t("Thomas Lie · hallansvarlig, Varden BTK", "Thomas Lie · hall manager, Varden BTK"),
    },
    {
      quote: t(
        "«Søknaden om støtte tok én ettermiddag i stedet for tre helger.»",
        "“The grant report took one afternoon instead of three weekends.”",
      ),
      who: t("Anne Bjørk · kasserer, Fana Turn", "Anne Bjørk · treasurer, Fana Turn"),
    },
  ];

  const count = reviews.length;
  // `index` is deliberately unbounded so the track can slide in either
  // direction; it is rebased silently once it drifts a full lap.
  const [index, setIndex] = useState(0);
  const [noAnim, setNoAnim] = useState(false);
  const [width, setWidth] = useState(() =>
    typeof window === "undefined" ? 1200 : window.innerWidth,
  );
  const pausedUntil = useRef(0);

  useEffect(() => {
    let timer;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setWidth(window.innerWidth), 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setIndex((prev) => prev + 1);
    }, 6000);
    return () => window.clearInterval(tick);
  }, []);

  // Once the index has travelled a whole lap, snap it back to the equivalent
  // position without animating so the loop is seamless.
  useEffect(() => {
    if (index < count && index > -count) return;
    // Wait for the slide to finish, then jump back with animation disabled.
    const settle = window.setTimeout(() => {
      setNoAnim(true);
      setIndex(((index % count) + count) % count);
    }, 960);
    return () => window.clearTimeout(settle);
  }, [index, count]);

  useEffect(() => {
    if (!noAnim) return;
    const release = window.setTimeout(() => setNoAnim(false), 80);
    return () => window.clearTimeout(release);
  }, [noAnim]);

  const step = (dir) => {
    pausedUntil.current = Date.now() + 14000;
    setIndex((prev) => prev + dir);
  };

  const perView = perViewFor(width);
  const focusPos = count + index;
  const slotTrack = 100 / (3 * count);
  const trackWidth = (3 * count * (100 / perView)).toFixed(2);
  const shift = (-(focusPos - (perView >= 3 ? 1 : 0)) * slotTrack).toFixed(4);
  const position = ((index % count) + count) % count;

  // The list is tripled so there is always a card either side of the focus.
  const track = [];
  for (let copy = 0; copy < 3; copy++) {
    for (let i = 0; i < count; i++) {
      track.push({ key: `${copy}-${i}`, pos: copy * count + i, ...reviews[i] });
    }
  }

  return (
    <section id="kunder" className="relative isolate overflow-hidden bg-paper-2 px-5 py-24 sm:px-7">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-140px] top-[-120px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,201,74,0.28),rgba(255,201,74,0)_70%)] blur-[20px]" />
        <div className="absolute bottom-[-160px] right-[-100px] h-[520px] w-[520px] rounded-full border-[1.5px] border-moss/18" />
        <div className="kz-dots-plain absolute right-[60px] top-[70px] h-[220px] w-[220px] opacity-50" />
      </div>

      <div className="mx-auto max-w-[1200px]">
        <div data-reveal className="max-w-[32em]">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-moss-dark">
            {t("Kundehistorier", "Customer stories")}
          </div>
          <h2 className="m-0 mt-4 font-heading text-[clamp(32px,4vw,50px)] font-extrabold tracking-[-0.032em]">
            {t("Klubber som fikk kveldene tilbake", "Clubs that got their evenings back")}
          </h2>
        </div>

        <div data-reveal className="mt-11">
          <div className="-mx-1 overflow-hidden px-3.5 py-1.5">
            <div
              className="flex"
              style={{
                width: `${trackWidth}%`,
                transform: `translateX(${shift}%)`,
                transition: noAnim ? "none" : "transform .9s cubic-bezier(.3,.72,.18,1)",
              }}
            >
              {track.map((card) => {
                const focused = card.pos === focusPos;
                return (
                  <div
                    key={card.key}
                    className="min-w-0 px-3 py-6.5"
                    style={{ flex: `0 0 ${slotTrack.toFixed(4)}%` }}
                    aria-hidden={!focused}
                  >
                    <div
                      className={`box-border h-full rounded-[36px] bg-white transition-all duration-[900ms] ease-[cubic-bezier(0.3,0.72,0.18,1)] ${
                        focused
                          ? "scale-[1.07] border border-grass p-9 opacity-100 shadow-[0_30px_66px_rgba(22,36,26,0.16)]"
                          : "scale-[0.86] border border-ink/10 p-7 opacity-40"
                      }`}
                    >
                      <div className="flex gap-1 text-[15px] text-amber">★★★★★</div>
                      <p
                        className="m-0 mt-4 font-heading font-extrabold leading-[1.4] tracking-[-0.02em]"
                        style={{ fontSize: focused ? "23px" : "17px" }}
                      >
                        {card.quote}
                      </p>
                      <div className="mt-5 text-sm text-ink/60">{card.who}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t("Forrige omtale", "Previous review")}
              className="grid h-[52px] w-[52px] cursor-pointer place-items-center rounded-full border border-ink/20 bg-white text-xl text-ink transition-all duration-300 hover:-translate-x-0.5 hover:bg-grass-tint"
            >
              ←
            </button>
            <div className="min-w-[62px] text-center text-sm text-ink/60">
              {position + 1} / {count}
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t("Neste omtale", "Next review")}
              className="grid h-[52px] w-[52px] cursor-pointer place-items-center rounded-full border border-ink/20 bg-white text-xl text-ink transition-all duration-300 hover:translate-x-0.5 hover:bg-grass-tint"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
