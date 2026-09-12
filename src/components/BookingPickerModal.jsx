import { useEffect, useState } from "react";
import { BOOKABLE_CLUBS } from "../lib/clubs";
import { useLang } from "../lib/langContext";

// Mounted only while open, so the search box starts empty every time.
export default function BookingPickerModal({ onClose, onPick }) {
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
  const matches = BOOKABLE_CLUBS.filter(
    (club) => !needle || `${club.name} ${club.meta[lang]}`.toLowerCase().includes(needle),
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
        aria-label={t("Book halltid", "Book hall time")}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[460px] overflow-hidden rounded-panel border border-ink/12 bg-white p-7 shadow-[0_34px_90px_rgba(22,36,26,0.28)]"
      >
        <div aria-hidden="true" className="kz-dots-modal pointer-events-none absolute inset-0" />

        <button
          type="button"
          onClick={onClose}
          aria-label={t("Lukk", "Close")}
          className="absolute right-5 top-5 z-[3] h-9 w-9 cursor-pointer rounded-full border border-ink/15 bg-white text-base text-ink transition-colors duration-300 hover:bg-grass-tint"
        >
          ×
        </button>

        <div className="relative">
          <h3 className="mb-2 ml-0 mr-9 mt-0 font-heading text-2xl font-extrabold tracking-[-0.025em]">
            {t("Book halltid", "Book hall time")}
          </h3>
          <p className="mb-4.5 mt-0 text-[15px] leading-[1.6] text-ink/70">
            {t(
              "Velg hvilken klubb du ønsker å booke i, så viser vi ledige bord og baner.",
              "Tell us which club you want to book in, and we show the free tables.",
            )}
          </p>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Søk etter klubb eller sted", "Search for a club or place")}
            aria-label={t("Søk etter klubb eller sted", "Search for a club or place")}
            className="box-border w-full rounded-full border border-ink/18 bg-mute px-5 py-3.5 text-[15px] text-ink outline-none transition-colors focus:border-grass focus:bg-white"
          />

          <div className="mt-4 grid max-h-[320px] gap-2.5 overflow-auto">
            {matches.map((club) => (
              <button
                key={club.slug}
                type="button"
                onClick={() => onPick(club.slug)}
                className="flex cursor-pointer items-center gap-3.5 rounded-[22px] border border-ink/10 bg-mute p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-grass hover:bg-grass-tint"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-grass-tint-2 font-heading text-lg font-extrabold text-moss-deep">
                  {club.icon}
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-[17px] font-extrabold tracking-[-0.015em] text-ink">
                    {club.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink/60">{club.meta[lang]}</span>
                </span>
              </button>
            ))}

            {matches.length === 0 && (
              <div className="rounded-[22px] bg-[#fff3d1] p-4.5 text-[15px] text-ink/75">
                {t("Fant ingen klubber. Prøv et annet søk.", "No clubs match that search.")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
