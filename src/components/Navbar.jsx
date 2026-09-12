import KretzMark from "./KretzMark";
import { useLang } from "../lib/langContext";

export default function Navbar({ onOpenLogin, onOpenBooking }) {
  const { t, isEn, toggleLang } = useLang();
  const langLabel = isEn ? "NO" : "EN";

  const links = [
    { label: t("Slik funker det", "How it works"), href: "#slik" },
    { label: t("Funksjoner", "Features"), href: "#funksjoner" },
    { label: t("Spørsmål", "FAQ"), href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-4 px-4 py-4 sm:gap-7 sm:px-7">
        <a
          href="#topp"
          className="flex items-center gap-2.5 font-heading text-[22px] font-extrabold tracking-[-0.025em] text-ink"
        >
          <KretzMark size={30} className="drop-shadow-[0_0_14px_rgba(116,205,133,0.45)]" />
          Kretz
        </a>

        <div className="hidden flex-1 md:block" />

        <div className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenBooking}
            className="cursor-pointer whitespace-nowrap bg-transparent text-sm font-medium text-ink/70 transition-colors hover:text-ink"
          >
            Booking
          </button>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2.5 sm:gap-3.5">
          <button
            type="button"
            onClick={toggleLang}
            className="cursor-pointer rounded-full border border-ink/20 px-3.5 py-2 font-heading text-xs font-extrabold tracking-[0.08em] text-ink transition-colors hover:bg-ink/10"
          >
            {langLabel}
          </button>
          <a
            href="#kom-i-gang"
            className="whitespace-nowrap rounded-full bg-grass px-4 py-3 font-heading text-sm font-extrabold text-ink shadow-[0_10px_30px_rgba(116,205,133,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss sm:px-5.5"
          >
            {t("Book demo", "Book a demo")}
          </a>
          <button
            type="button"
            onClick={onOpenLogin}
            className="cursor-pointer whitespace-nowrap rounded-full border border-ink bg-transparent px-4 py-3 font-heading text-sm font-extrabold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-paper sm:px-5.5"
          >
            {t("Logg inn", "Log in")}
          </button>
        </div>
      </nav>
    </header>
  );
}
