import { useState } from "react";
import { useLang } from "../../lib/langContext";
import { MEMBER_CLUBS } from "../../lib/memberData";
import useEscape from "./useEscape";

const CIRCLES = ["#1f7a3a", "#74cd85", "#a3e2ae", "#3E8A48", "#CDEFD3", "#16241a"];

/*
  "Klubber ▾": the club filter. All clubs, or one of the member's clubs —
  each with a star that pins it as the start page for the next visit.
*/
export default function ClubMenu({ club, pinned, onPick, onTogglePin }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  useEscape(() => setOpen(false), open);

  const current = MEMBER_CLUBS.find((c) => c.slug === club);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-ink/22 bg-white px-5 py-3 font-heading text-sm font-extrabold text-ink transition-colors duration-[250ms] hover:bg-grass-tint"
      >
        {current ? current.name : t("Klubber", "Clubs")}
        <span
          aria-hidden="true"
          className={`inline-block text-xs transition-transform duration-[250ms] ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+10px)] z-[31] box-border w-[min(320px,86vw)] rounded-3xl border border-ink/12 bg-white p-4 shadow-[0_22px_60px_rgba(22,36,26,0.2)] max-[700px]:left-0 max-[700px]:right-auto"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onPick("all");
                setOpen(false);
              }}
              className={`box-border flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-2xl px-3.5 py-3 font-body text-ink transition-colors duration-200 hover:border-grass hover:bg-grass-tint ${
                club === "all" ? "border border-grass bg-grass-tint" : "border border-ink/12 bg-white"
              }`}
            >
              <span className="font-heading text-sm font-extrabold">{t("Alle klubber", "All clubs")}</span>
              <span className="inline-flex items-center gap-2">
                <span className="rounded-full bg-ink/8 px-2.5 py-[3px] text-xs font-bold">
                  {MEMBER_CLUBS.length} {t("klubber", "clubs")}
                </span>
                <span
                  aria-hidden="true"
                  className={`font-extrabold text-moss ${club === "all" ? "visible" : "invisible"}`}
                >
                  ✓
                </span>
              </span>
            </button>

            <div className="mb-3 mt-3.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink/50">
              {t("Dine klubber", "Your clubs")}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {MEMBER_CLUBS.map((c, i) => {
                const isPinned = pinned === c.slug;
                const active = club === c.slug;
                const pinLabel = isPinned
                  ? t("Fjern som startside", "Unpin start page")
                  : t("Fest som startside", "Pin as start page");
                return (
                  <div key={c.slug} className="relative min-w-0">
                    <button
                      type="button"
                      role="menuitem"
                      title={c.name}
                      onClick={() => {
                        onPick(c.slug);
                        setOpen(false);
                      }}
                      className={`box-border grid w-full cursor-pointer justify-items-center rounded-[18px] px-1.5 py-3 font-body text-ink transition-colors duration-200 hover:border-grass hover:bg-mute ${
                        active ? "border border-grass bg-grass-tint" : "border border-ink/10 bg-white"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="block h-16 w-16 rounded-full shadow-[inset_0_0_0_4px_rgba(255,255,255,0.35)]"
                        style={{ background: CIRCLES[i % CIRCLES.length] }}
                      />
                      <span className="mt-2 block text-center font-heading text-[12.5px] font-extrabold leading-[1.25] [overflow-wrap:anywhere]">
                        {c.name}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onTogglePin(c.slug)}
                      aria-pressed={isPinned}
                      aria-label={pinLabel}
                      title={pinLabel}
                      className={`absolute right-1 top-1 h-[26px] w-[26px] cursor-pointer rounded-full border-0 p-0 text-[15px] leading-none transition-colors duration-200 ${
                        isPinned ? "bg-[rgba(255,210,63,0.35)] text-[#b58300]" : "bg-ink/5 text-ink/50"
                      }`}
                    >
                      {isPinned ? "★" : "☆"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
