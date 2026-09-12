const VARIANTS = {
  plain: "border-ink/12 bg-white",
  amber: "border-amber/55 bg-white",
  grass: "border-grass/50 bg-grass/18",
};

const NOTE_TONE = {
  plain: "text-ink/65",
  amber: "text-amber-note",
  grass: "text-ink/70",
};

export default function StatTiles({ tiles }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className={`rounded-[28px] border p-6 transition-all duration-[400ms] hover:-translate-y-[5px] hover:shadow-[0_22px_48px_rgba(22,36,26,0.1)] ${
            VARIANTS[tile.variant] || VARIANTS.plain
          }`}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/55">
            {tile.label}
          </div>
          <div className="mt-3 whitespace-nowrap font-heading text-[26px] font-extrabold">
            {tile.value}
          </div>
          <div className={`mt-1.5 text-sm ${NOTE_TONE[tile.variant] || NOTE_TONE.plain}`}>
            {tile.note}
          </div>
        </div>
      ))}
    </div>
  );
}
