import { useRef, useState } from "react";
import { useLang } from "../../lib/langContext";

// Stand-in for the design's <image-slot>: an empty, dashed drop zone that
// shows a local preview (object URL) once a picture is chosen or dropped.
// Previews are kept per slot id for the lifetime of the page.
const previews = new Map();

export default function ImageSlot({ id, radius = 20, placeholder }) {
  const { t } = useLang();
  const input = useRef(null);
  const [, bump] = useState(0);
  const [over, setOver] = useState(false);
  const src = previews.get(id);

  const take = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const old = previews.get(id);
    if (old) URL.revokeObjectURL(old);
    previews.set(id, URL.createObjectURL(file));
    bump((n) => n + 1);
  };
  const clear = (e) => {
    e.stopPropagation();
    const old = previews.get(id);
    if (old) URL.revokeObjectURL(old);
    previews.delete(id);
    bump((n) => n + 1);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={placeholder || t("Last opp bilde", "Upload image")}
      onClick={() => input.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          input.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        take(e.dataTransfer.files?.[0]);
      }}
      className="group absolute inset-0 cursor-pointer overflow-hidden"
      style={{ borderRadius: Number(radius) || 0 }}
    >
      {src ? (
        <>
          <img src={src} alt="" className="h-full w-full object-cover" />
          <span className="absolute right-2.5 top-2.5 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="rounded-full bg-black/65 px-2.5 py-1.5 text-[11px] font-semibold text-white">
              {t("Bytt bilde", "Replace")}
            </span>
            <button
              type="button"
              onClick={clear}
              className="cursor-pointer rounded-full border-0 bg-black/65 px-2.5 py-1.5 text-[11px] font-semibold text-white"
            >
              {t("Fjern", "Remove")}
            </button>
          </span>
        </>
      ) : (
        <span
          className={`absolute inset-0 grid place-items-center border-[1.5px] border-dashed text-center transition-colors ${
            over ? "border-moss bg-grass-tint" : "border-ink/30 bg-ink/[0.04] group-hover:bg-ink/[0.07]"
          }`}
          style={{ borderRadius: Number(radius) || 0 }}
        >
          <span className="grid justify-items-center gap-2 px-4 text-[13px] font-semibold text-ink/60">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <circle cx="9" cy="10" r="2" />
              <path d="m21 16-5-5-9 9" />
            </svg>
            {placeholder || t("Slipp et bilde her", "Drop an image")}
          </span>
        </span>
      )}
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          take(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
