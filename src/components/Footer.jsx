import KretzMark from "./KretzMark";
import { useLang } from "../lib/langContext";

export default function Footer({ onOpenBooking }) {
  const { t } = useLang();

  const links = [
    { label: t("Funksjoner", "Features"), href: "#funksjoner" },
    { label: t("Kunder", "Customers"), href: "#kunder" },
    { label: t("App", "App"), href: "#app" },
    { label: t("Kontakt", "Contact"), href: "#kom-i-gang" },
  ];

  return (
    <footer className="border-t border-ink/12 px-5 py-10 sm:px-7">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 text-sm text-ink/50">
        <div className="flex items-center gap-2.5 font-heading text-lg font-extrabold text-ink">
          <KretzMark size={22} />
          Kretz
        </div>

        <div className="flex flex-wrap gap-6">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-ink/50 hover:text-ink">
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenBooking}
            className="cursor-pointer whitespace-nowrap bg-transparent text-sm text-ink/50 hover:text-ink"
          >
            Booking
          </button>
        </div>

        <span>© 2026 Kretz · Oslo</span>
      </div>
    </footer>
  );
}
