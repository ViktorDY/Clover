import { useState } from "react";
import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";
import { clubShort } from "../../lib/memberData";
import { CountChip } from "./ui";

/*
  Varsler: every notification, split into new and earlier. Hovering (or
  focusing) one unfolds its detail and a delete button; clicking it marks it
  read and takes you where it points.
*/
export default function NoticesView({ notices, showAll, isUnread, onGo, onDelete }) {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState("all");
  const [hover, setHover] = useState("");

  const tests = {
    all: () => true,
    unread: isUnread,
    coach: (n) => n.from === "coach",
    board: (n) => n.from === "board",
  };
  const shown = notices.filter(tests[filter]);
  const fresh = shown.filter((n) => n.isNew);
  const earlier = shown.filter((n) => !n.isNew);

  const filters = [
    { id: "all", label: t("Alle", "All") },
    { id: "unread", label: t("Uleste", "Unread") },
    { id: "coach", label: t("Fra trenere", "From the coaches") },
    { id: "board", label: t("Fra styret", "From the board") },
  ];

  const row = (n) => {
    const hov = hover === n.id;
    const unread = isUnread(n);
    const board = n.from === "board";
    let tone;
    if (board) {
      tone = unread
        ? hov ? "bg-[#FFD84D] border-[#E8B400]" : "bg-[#FFE27A] border-[#FFD23F]"
        : hov ? "bg-[#FFEBA3] border-[#E8B400]" : "bg-[#FFF3C2] border-[#FFD23F]";
    } else if (unread) {
      tone = hov ? "bg-[#bfe8c6] border-[#4fb765]" : "bg-[#CDEFD3] border-grass";
    } else {
      tone = hov ? "bg-[#f3f8ef] border-ink/30" : "bg-white border-ink/12";
    }
    const dot = board
      ? "bg-[#E8B400]"
      : n.tone === "green"
        ? "bg-grass"
        : n.tone === "amber"
          ? "bg-amber"
          : "bg-ink/25";
    return (
      <div
        key={n.id}
        role="button"
        tabIndex={0}
        onClick={() => {
          setHover("");
          onGo(n);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setHover("");
            onGo(n);
          }
        }}
        onMouseEnter={() => setHover(n.id)}
        onMouseLeave={() => setHover((h) => (h === n.id ? "" : h))}
        onFocus={() => setHover(n.id)}
        onBlur={() => setHover((h) => (h === n.id ? "" : h))}
        className={`flex cursor-pointer items-start gap-3.5 rounded-[22px] border px-4 py-4.5 transition-[background,border-color,box-shadow] duration-200 sm:px-5 ${tone} ${
          hov ? "shadow-[0_6px_18px_rgba(22,36,26,0.08)]" : ""
        }`}
      >
        <span className={`mt-1.5 inline-block h-2.5 w-2.5 flex-none rounded-full ${dot}`} />
        <div className="min-w-0 flex-1">
          <div className={`text-base font-semibold leading-[1.4] ${hov ? "" : "truncate"}`}>{pick(n.text, lang)}</div>
          <div className="mt-1 text-[13px] text-ink/58">
            {showAll ? `${clubShort(n.club)} · ` : ""}
            {pick(n.when, lang)}
          </div>
          <div
            className={`overflow-hidden transition-all duration-[250ms] ${
              hov ? "mt-2.5 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0"
            }`}
          >
            <div className="text-[15px] leading-[1.5] text-ink/80">{pick(n.detail, lang)}</div>
            <div className="mt-2 font-heading text-[13.5px] font-extrabold">{pick(n.cta, lang)} →</div>
          </div>
        </div>
        <button
          type="button"
          aria-label={t("Slett varsel", "Delete notification")}
          title={t("Slett varsel", "Delete notification")}
          onClick={(e) => {
            e.stopPropagation();
            setHover("");
            onDelete(n.id);
          }}
          className={`-my-1.5 -mr-2 grid h-[38px] w-[38px] flex-none cursor-pointer place-items-center rounded-xl border-0 text-[#c92a14] transition-[opacity,background] duration-200 focus:opacity-100 ${
            hov ? "pointer-events-auto bg-[rgba(201,42,20,0.1)] opacity-100" : "pointer-events-none bg-transparent opacity-0"
          }`}
        >
          <TrashIcon />
        </button>
      </div>
    );
  };

  return (
    <>
      <div role="tablist" aria-label={t("Filtrer varsler", "Filter notifications")} className="mt-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <CountChip
            key={f.id}
            active={filter === f.id}
            onClick={() => setFilter(f.id)}
            label={f.label}
            count={notices.filter(tests[f.id]).length}
          />
        ))}
      </div>
      <div className="kz-scroll mt-4 grid max-w-[760px] grid-cols-[minmax(0,1fr)] content-start gap-3 py-1 pr-1.5 min-[901px]:max-h-[calc(100vh-240px)] min-[901px]:overflow-y-auto">
        {fresh.length > 0 && (
          <>
            <div className="font-heading text-lg font-extrabold">{t("Nye", "New")}</div>
            {fresh.map(row)}
          </>
        )}
        {earlier.length > 0 && (
          <>
            <div className="mt-3 font-heading text-lg font-extrabold">{t("Tidligere", "Earlier")}</div>
            {earlier.map(row)}
          </>
        )}
        {shown.length === 0 && (
          <div className="rounded-[22px] border border-dashed border-ink/25 p-6 text-[15px] text-ink/60">
            {t("Ingen varsler akkurat nå.", "No notifications right now.")}
          </div>
        )}
      </div>
    </>
  );
}

function TrashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M6 6l1 14h10l1-14" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
