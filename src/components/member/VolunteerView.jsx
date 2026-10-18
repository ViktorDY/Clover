import { useEffect, useRef, useState } from "react";
import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";
import { MONTHS_SHORT, VOLUNTEER_DAYS, VOLUNTEER_GOAL_HOURS, clubShort } from "../../lib/memberData";
import { CloseButton, Modal } from "./ui";

/*
  Dugnad: the member's volunteer days. Check in by scanning the organiser's
  QR code (or typing its code), check out when the shift ends, and the hours
  wait for the organiser to confirm them. A season goal tracks confirmed
  hours.

  `results` ({ [id]: { st, h } }) and `active` ({ id, since }) live in the
  page so a running shift survives switching views.
*/
const PILL = {
  todo: "bg-[#fff4cf] text-[#6b4a00]",
  active: "bg-ink text-[#8BCB8B]",
  pending: "bg-[rgba(148,92,214,0.18)] text-[#4b2a85]",
  ok: "bg-grass/40 text-ink",
};

const pad = (n) => String(n).padStart(2, "0");
const decimal = (n, isEn) => (isEn ? String(n) : String(n).replace(".", ","));

export default function VolunteerView({ keep, results, active, onCheckIn, onCheckOut }) {
  const { t, lang, isEn } = useLang();
  const [filter, setFilter] = useState("all");
  const [scanOpen, setScanOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [now, setNow] = useState(() => Date.now());

  // Tick the shift timer once a second while checked in.
  useEffect(() => {
    if (!active) return undefined;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [active]);

  const stateOf = (d) => (active && active.id === d.id ? "active" : results[d.id] ? results[d.id].st : d.st);
  const hoursOf = (d) => (results[d.id] ? results[d.id].h : d.done || 0);
  const isDone = (d) => stateOf(d) === "ok" || stateOf(d) === "pending";

  const list = VOLUNTEER_DAYS.filter(keep);
  const okHours = list.reduce((n, d) => n + (stateOf(d) === "ok" ? hoursOf(d) : 0), 0);
  const shown = list
    .filter((d) =>
      filter === "all" ? true : filter === "todo" ? !isDone(d) : isDone(d),
    )
    .sort((a, b) => (filter === "done" ? (a.date < b.date ? 1 : -1) : a.date < b.date ? -1 : 1));

  const activeDay = active ? VOLUNTEER_DAYS.find((d) => d.id === active.id) : null;
  const elapsed = active ? Math.max(0, Math.floor((now - active.since) / 1000)) : 0;
  const next = VOLUNTEER_DAYS.filter((d) => keep(d) && stateOf(d) === "todo").sort((a, b) =>
    a.date < b.date ? -1 : 1,
  )[0];

  const checkIn = (day) => {
    if (active) return t("Du er allerede på en dugnad. Sjekk ut først.", "You are already on a shift. Check out first.");
    if (!day) return t("Fant ikke denne koden.", "That code was not recognised.");
    if (isDone(day)) return t("Du har allerede gjort denne dugnaden.", "You have already done this one.");
    onCheckIn(day.id);
    setScanOpen(false);
    setToast(t("Du er registrert – lykke til med dugnaden!", "Checked in – have a good shift!"));
    return "";
  };

  const checkOut = () => {
    if (!activeDay) return;
    const hours = Math.max(0.5, Math.ceil(((now - active.since) / 3600000) * 2) / 2);
    onCheckOut(activeDay.id, hours);
    setToast(
      t(
        `Du er sjekket ut – ${decimal(hours, false)} timer er registrert. Ansvarlig bekrefter dem.`,
        `Checked out – ${hours} hours registered. The organiser will confirm them.`,
      ),
    );
  };

  const statusLabel = {
    todo: t("Å gjøre", "To do"),
    active: t("Pågår", "In progress"),
    pending: t("Venter på bekreftelse", "Awaiting confirmation"),
    ok: t("Bekreftet", "Confirmed"),
  };
  const unitH = isEn ? " h" : " t";
  const since = active ? new Date(active.since) : null;

  return (
    <div className="mt-[22px] grid max-w-[880px] gap-4">
      {activeDay ? (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[30px] bg-ink px-6.5 py-6 text-paper">
          <div className="min-w-[220px] flex-1">
            <div className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[#8BCB8B]">
              {t("Du er på dugnad", "You are on a shift")}
            </div>
            <div className="mt-1 font-heading text-[22px] font-extrabold">{pick(activeDay.name, lang)}</div>
            <div className="mt-0.5 text-sm opacity-80">
              {pick(activeDay.place, lang)} · {clubShort(activeDay.club)} · {t("siden", "since")} {pad(since.getHours())}:
              {pad(since.getMinutes())}
            </div>
          </div>
          <div className="font-heading text-[38px] font-extrabold tracking-[-0.02em] text-[#8BCB8B]">
            {pad(Math.floor(elapsed / 3600))}:{pad(Math.floor(elapsed / 60) % 60)}:{pad(elapsed % 60)}
          </div>
          <button
            type="button"
            onClick={checkOut}
            className="cursor-pointer rounded-full border-0 bg-grass px-7 py-[15px] font-heading text-[15px] font-extrabold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-grass-soft"
          >
            {t("Sjekk ut", "Check out")}
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-[22px] gap-y-3.5 rounded-[30px] border border-grass bg-[#CDEFD3] px-6.5 py-6">
          <div className="min-w-[220px] flex-1">
            <div className="font-heading text-xl font-extrabold">{t("Skann QR-koden", "Scan the QR code")}</div>
            <div className="mt-1 text-sm leading-[1.5] text-ink/80">
              {t(
                "Skann koden arrangøren har hengt opp når du møter opp. Sjekk ut når vakten din er ferdig.",
                "Scan the code the organiser has put up when you arrive. Check out when your shift is over.",
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setToast("");
              setScanOpen(true);
            }}
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border-0 bg-ink px-7 py-[15px] font-heading text-[15px] font-extrabold text-paper transition-colors duration-300 hover:bg-moss"
          >
            <ScanIcon />
            {t("Skann QR-kode", "Scan QR code")}
          </button>
        </div>
      )}

      {toast && (
        <div role="status" className="rounded-[18px] border border-grass/60 bg-grass/30 px-4.5 py-3 text-[14.5px]">
          {toast}
        </div>
      )}

      <div className="rounded-[30px] border border-ink/12 bg-white px-5 py-6 sm:px-6.5">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <div className="min-w-[200px] flex-1">
            <h2 className="m-0 font-heading text-[22px] font-extrabold">{t("Mine dugnader", "My volunteer days")}</h2>
            <div className="mt-[3px] text-[13.5px] text-ink/65">
              {list.filter(isDone).length}
              {t(" gjort · ", " done · ")}
              {list.filter((d) => !isDone(d)).length}
              {t(" å gjøre", " to do")}
            </div>
          </div>
          <div className="min-w-[200px] flex-[0_1_260px]">
            <div className="mb-1.5 flex justify-between text-[12.5px] text-ink/65">
              <span>{t("Sesongmål", "Season goal")}</span>
              <span>
                {decimal(okHours, isEn)} / {VOLUNTEER_GOAL_HOURS}
                {unitH}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-ink/8">
              <div
                className="h-full rounded-full bg-grass transition-[width] duration-500"
                style={{ width: `${Math.min(100, Math.round((okHours / VOLUNTEER_GOAL_HOURS) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        <div role="tablist" className="mt-4.5 flex flex-wrap gap-2">
          {[
            ["all", t("Alle", "All")],
            ["todo", t("Å gjøre", "To do")],
            ["done", t("Gjort", "Done")],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={filter === id}
              onClick={() => setFilter(id)}
              className={`cursor-pointer rounded-full px-4 py-[9px] font-heading text-[13.5px] font-extrabold ${
                filter === id ? "border border-ink bg-ink text-paper" : "border border-ink/18 bg-white text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-2.5">
          {shown.map((d) => {
            const st = stateOf(d);
            const done = st === "ok" || st === "pending";
            const [y, m, day] = d.date.split("-");
            return (
              <div
                key={d.id}
                className={`grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-3.5 rounded-[22px] border px-4 py-3.5 ${
                  st === "active" ? "border-grass bg-[#CDEFD3]" : done ? "border-ink/10 bg-mute-2" : "border-ink/10 bg-white"
                }`}
              >
                <span
                  className={`grid h-[54px] w-[54px] place-content-center rounded-2xl text-center ${
                    done ? "bg-grass/30" : "bg-mute"
                  }`}
                >
                  <span className="block font-heading text-lg font-extrabold leading-none">{parseInt(day, 10)}</span>
                  <span className="mt-[3px] block text-[11px] uppercase tracking-[0.06em]">
                    {MONTHS_SHORT[lang][parseInt(m, 10) - 1]}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-[15.5px] font-extrabold">{pick(d.name, lang)}</span>
                  <span className="mt-0.5 block text-[13px] text-ink/68">
                    {day}.{m}.{y} {d.time} · {pick(d.place, lang)} · {clubShort(d.club)}
                  </span>
                </span>
                <span className="grid justify-items-end gap-1.5">
                  <span className={`whitespace-nowrap rounded-full px-[11px] py-1 text-xs font-bold ${PILL[st]}`}>
                    {statusLabel[st]}
                  </span>
                  <span className="text-[13px] font-semibold">
                    {done
                      ? `${decimal(hoursOf(d), isEn)}${unitH}`
                      : `${t("ca. ", "about ")}${decimal(d.hrs, isEn)}${unitH}`}
                  </span>
                </span>
              </div>
            );
          })}
          {shown.length === 0 && (
            <div className="px-0.5 py-2.5 text-sm text-ink/65">{t("Ingen dugnader her.", "No volunteer days here.")}</div>
          )}
        </div>
      </div>

      {scanOpen && (
        <ScanModal
          onClose={() => setScanOpen(false)}
          onSubmit={(code) => {
            const match = String(code || "")
              .trim()
              .match(/dugnad\/([A-Za-z0-9]+)/i);
            const id = (match ? match[1] : String(code || "").trim()).toLowerCase();
            return checkIn(VOLUNTEER_DAYS.find((d) => d.id === id));
          }}
          demo={next}
          onDemo={() => checkIn(next)}
        />
      )}
    </div>
  );
}

/*
  The scanner: the back camera with a frame to aim at, reading QR codes where
  the browser can (BarcodeDetector), and a field to type the code otherwise.
*/
function ScanModal({ onClose, onSubmit, demo, onDemo }) {
  const { t, lang } = useLang();
  const videoRef = useRef(null);
  const [cam, setCam] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const submitRef = useRef(onSubmit);
  useEffect(() => {
    submitRef.current = onSubmit;
  });

  useEffect(() => {
    let stream = null;
    let timer = null;
    let alive = true;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // Reported on the next tick so the effect itself sets no state.
      timer = window.setTimeout(() => setCam("none"), 0);
      return () => window.clearTimeout(timer);
    }
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        if (!alive) {
          s.getTracks().forEach((track) => track.stop());
          return;
        }
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play?.().catch(() => {});
        }
        if ("BarcodeDetector" in window) {
          const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
          setCam("live");
          timer = window.setInterval(() => {
            const video = videoRef.current;
            if (!video || !video.videoWidth) return;
            detector
              .detect(video)
              .then((codes) => {
                if (codes && codes[0]) {
                  const message = submitRef.current(codes[0].rawValue);
                  if (message) setError(message);
                }
              })
              .catch(() => {});
          }, 500);
        } else {
          setCam("nodetect");
        }
      })
      .catch(() => {
        if (alive) setCam("denied");
      });
    return () => {
      alive = false;
      if (timer) window.clearInterval(timer);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const camNote = {
    live: t("Hold kameraet mot QR-koden fra arrangøren.", "Point the camera at the QR code from the organiser."),
    none: t("Kamera er ikke tilgjengelig her. Skriv inn koden i stedet.", "Camera is not available here. Type the code instead."),
    denied: t("Ingen tilgang til kamera. Skriv inn koden fra QR-plakaten i stedet.", "No camera access. Type the code from the QR poster instead."),
    nodetect: t("Denne nettleseren kan ikke lese QR-koder automatisk. Skriv inn koden i stedet.", "This browser cannot read QR codes automatically. Type the code instead."),
    "": t("Starter kamera …", "Starting camera…"),
  }[cam];

  return (
    <Modal onClose={onClose} label={t("Skann QR-kode", "Scan QR code")} z="z-[98]" scrim="bg-ink/55 backdrop-blur-[8px]" className="max-w-[440px]">
      <div className="box-border grid gap-3.5 rounded-[28px] bg-white p-[22px] shadow-[0_32px_80px_rgba(22,36,26,0.35)]">
        <div className="flex items-center gap-3">
          <h3 className="m-0 flex-1 font-heading text-[21px] font-extrabold">{t("Skann QR-kode", "Scan QR code")}</h3>
          <CloseButton onClick={onClose} label={t("Lukk", "Close")} />
        </div>
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[20px] bg-ink">
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 h-full w-full object-cover" />
          <span className="relative aspect-square w-[62%] rounded-[22px] border-[3px] border-[#8BCB8B] shadow-[0_0_0_999px_rgba(22,36,26,0.35)]" />
        </div>
        <div className="text-[13.5px] leading-[1.5] text-ink/72">{camNote}</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError(onSubmit(code) || "");
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            placeholder={t("Kode eller lenke fra QR-koden", "Code or link from the QR code")}
            aria-label={t("Kode eller lenke fra QR-koden", "Code or link from the QR code")}
            className="min-w-0 flex-1 rounded-full border border-ink/18 bg-mute px-4.5 py-[13px] font-body text-[14.5px] text-ink outline-none focus:border-grass focus:bg-white"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full border-0 bg-moss px-5.5 py-[13px] font-heading text-sm font-extrabold text-white hover:bg-ink"
          >
            {t("Registrer", "Check in")}
          </button>
        </form>
        {error && (
          <div role="alert" className="text-[13.5px] text-[#a3282f]">
            {error}
          </div>
        )}
        {demo && (
          <button
            type="button"
            onClick={() => setError(onDemo() || "")}
            className="cursor-pointer justify-self-start rounded-full border border-dashed border-moss/60 bg-white px-4 py-[9px] font-heading text-[12.5px] font-extrabold text-moss hover:bg-grass-tint"
          >
            {t("Demo: simuler skanning av ", "Demo: simulate scanning ")}«{pick(demo.name, lang)}»
          </button>
        )}
      </div>
    </Modal>
  );
}

function ScanIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M7 12h10" />
    </svg>
  );
}
