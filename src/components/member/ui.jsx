import useEscape from "./useEscape";

/*
  Small building blocks shared by the member dashboard's views and dialogs.
*/

/*
  A centred dialog over a blurred scrim. `onClose` runs on Escape and on a
  click outside the panel (unless `closeOnScrim` is false).
*/
export function Modal({
  onClose,
  label,
  role = "dialog",
  z = "z-[90]",
  scrim = "bg-ink/46 backdrop-blur-[8px]",
  closeOnScrim = true,
  className = "",
  children,
}) {
  useEscape(onClose);
  return (
    <div
      className={`fixed inset-0 ${z} grid place-items-center p-3 sm:p-6 ${scrim}`}
      onClick={closeOnScrim ? onClose : undefined}
      role="presentation"
    >
      <div
        role={role}
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
        className={`relative box-border w-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export function CloseButton({ onClick, label, className = "", variant = "outline" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full text-base text-ink transition-colors duration-300 ${
        variant === "soft"
          ? "border-0 bg-ink/8 text-xl hover:bg-ink/12"
          : "border border-ink/14 bg-white hover:bg-grass-tint"
      } ${className}`}
    >
      ×
    </button>
  );
}

export function Switch({ on, onToggle, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-[26px] w-11 shrink-0 cursor-pointer rounded-full border-0 p-0 transition-colors duration-[250ms] ${
        on ? "bg-grass" : "bg-ink/20"
      }`}
    >
      <span
        className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-[0_1px_4px_rgba(22,36,26,0.3)] transition-[left] duration-[250ms] ${
          on ? "left-[21px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

// A pill-shaped segmented control: [{ id, label }].
export function Segmented({ options, value, onChange, label, size = "md", stretch = false }) {
  return (
    <span
      role="group"
      aria-label={label}
      className={`${stretch ? "flex" : "inline-flex w-fit max-w-full"} gap-1 rounded-full bg-ink/7 ${
        size === "lg" ? "p-1" : "p-[3px]"
      }`}
    >
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className={`cursor-pointer rounded-full border-0 font-heading font-extrabold normal-case tracking-normal transition-colors duration-200 ${
              stretch ? "flex-1" : ""
            } ${size === "lg" ? "px-4 py-2.5 text-sm" : size === "sm" ? "px-3.5 py-[7px] text-[12.5px]" : "px-4.5 py-2 text-[13px]"} ${
              on ? "bg-ink text-paper" : "bg-transparent text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </span>
  );
}

// A filter chip with a count bubble, used by posts, notices and messages.
export function CountChip({ active, onClick, label, count, highlight = false }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-[9px] font-heading text-[13.5px] font-extrabold transition-colors duration-[250ms] ${
        active ? "border border-ink bg-ink text-paper" : "border border-ink/20 bg-white text-ink hover:bg-grass-tint"
      }`}
    >
      {label}
      <span
        className={`min-w-5 rounded-full px-[7px] py-px text-center text-[11.5px] font-bold ${
          active ? "bg-paper/20" : highlight ? "bg-[#ffd23f] text-ink" : "bg-ink/8 text-ink/70"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

/*
  A spot for a photo. The canvas leaves these as drop zones; here a click
  (or a drop) picks a picture from the device and shows it for this visit.
*/
export function PhotoSlot({ src, onPick, hint, className = "", round = false, tone = "plain" }) {
  const choose = (file) => {
    if (!file || !file.type || !file.type.startsWith("image")) return;
    onPick(URL.createObjectURL(file));
  };
  return (
    <label
      onClick={(e) => e.stopPropagation()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        choose(e.dataTransfer.files && e.dataTransfer.files[0]);
      }}
      className={`relative block cursor-pointer overflow-hidden ${round ? "rounded-full" : ""} ${className}`}
    >
      {src ? (
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span
          className={`absolute inset-0 grid place-items-center border border-dashed text-center ${
            round ? "rounded-full" : "rounded-[inherit]"
          } ${tone === "onColor" ? "border-ink/25 bg-white/30" : "border-ink/25 bg-[#f3f4f1]"}`}
        >
          <span className="grid justify-items-center gap-2 px-4 text-[13px] text-ink/65">
            <PhotoIcon />
            {hint}
          </span>
        </span>
      )}
      <input
        type="file"
        accept="image/*"
        className="absolute h-px w-px opacity-0"
        onChange={(e) => {
          choose(e.target.files && e.target.files[0]);
          e.target.value = "";
        }}
      />
    </label>
  );
}

export function PhotoIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.8" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

// The member's round avatar: their photo if they added one, else initials.
export function Avatar({ size = 38, fontSize = 14, photo, initials }) {
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-ink bg-cover bg-center bg-no-repeat font-heading font-extrabold text-paper"
      style={{
        width: size,
        height: size,
        fontSize,
        backgroundImage: photo ? `url("${photo}")` : undefined,
      }}
    >
      {photo ? "" : initials}
    </span>
  );
}
