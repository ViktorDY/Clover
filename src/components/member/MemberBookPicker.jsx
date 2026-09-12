import { useEffect, useState } from "react";
import { MY_BOOK_CLUBS, OTHER_BOOK_CLUBS } from "../../lib/memberData";
import { useLang } from "../../lib/langContext";

function initialsOf(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");
}

// Mounted only while open, so the search box starts empty every time.
export default function MemberBookPicker({ onClose, onPick }) {
  const { t, lang } = useLang();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const needle = query.trim().toLowerCase();
  const filter = (list) =>
    list.filter((club) => !needle || `${club.name} ${club.meta[lang]}`.toLowerCase().includes(needle));

  const mine = filter(MY_BOOK_CLUBS);
  const others = filter(OTHER_BOOK_CLUBS);

  const row = (club, own) => (
    <button
      key={club.slug}
      type="button"
      onClick={() => onPick(club.slug)}
      className={`flex w-full cursor-pointer items-center gap-3.5 rounded-3xl p-4 text-left text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-grass-tint ${
        own ? "border border-grass/45 bg-mute" : "border border-ink/12 bg-mute-2"
      }`}
    >
      <span
        className={`grid h-[42px] w-[42px] shrink-0 place-items-center rounded-2xl font-heading text-sm font-extrabold ${
          own ? "bg-grass/32" : "bg-ink/7"
        }`}
      >
        {initialsOf(club.name)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-base font-extrabold">{club.name}</span>
        <span className="mt-0.5 block text-[13px] text-ink/60">{club.meta[lang]}</span>
      </span>
      <span className="shrink-0 text-base">→</span>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-60 grid place-items-center bg-ink/45 p-6 backdrop-blur-[6px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("Hvor vil du booke?", "Where do you want to book?")}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[84vh] w-full max-w-[520px] overflow-y-auto rounded-panel border border-ink/12 bg-white p-7 shadow-[0_34px_90px_rgba(22,36,26,0.28)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Lukk", "Close")}
          className="absolute right-5 top-5 z-[3] h-9 w-9 cursor-pointer rounded-full border border-ink/15 bg-white text-base text-ink transition-colors duration-300 hover:bg-grass-tint"
        >
          ×
        </button>

        <h3 className="mb-2 ml-0 mr-9 mt-0 font-heading text-2xl font-extrabold tracking-[-0.025em]">
          {t("Hvor vil du booke?", "Where do you want to book?")}
        </h3>
        <p className="mb-4.5 mt-0 text-[15px] leading-[1.6] text-ink/70">
          {t(
            "Velg en av dine egne klubber, eller book tid hos en annen klubb på Kretz.",
            "Pick one of your own clubs, or book time at another club on Kretz.",
          )}
        </p>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("Søk etter klubb, anlegg eller sted", "Search for a club, venue or city")}
          aria-label={t("Søk etter klubb, anlegg eller sted", "Search for a club, venue or city")}
          className="mb-5 box-border w-full rounded-full border border-ink/18 bg-mute px-5 py-3.5 text-[15px] text-ink outline-none transition-colors focus:border-grass focus:bg-white"
        />

        {mine.length > 0 && (
          <>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/55">
              {t("Mine klubber", "My clubs")}
            </div>
            <div className="mt-3 grid gap-2.5">{mine.map((club) => row(club, true))}</div>
          </>
        )}

        {others.length > 0 && (
          <>
            <div className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-ink/55">
              {t("Andre klubber", "Other clubs")}
            </div>
            <div className="mt-3 grid gap-2.5">{others.map((club) => row(club, false))}</div>
          </>
        )}

        {mine.length === 0 && others.length === 0 && (
          <div className="pb-1 pt-5 text-[15px] text-ink/60">
            {t("Ingen klubber matcher søket.", "No clubs match your search.")}
          </div>
        )}
      </div>
    </div>
  );
}
