import { useEffect, useState } from "react";
import KretzMark from "./KretzMark";
import SectionLink from "./SectionLink";
import { useLang } from "../lib/langContext";

const linkClass =
  "whitespace-nowrap text-ink/72 transition-colors hover:text-ink min-[1440px]:text-[17px] min-[1800px]:text-[19px]";

const btnSize =
  "max-[620px]:px-3.5 max-[620px]:text-[13px] min-[1440px]:px-6.5 min-[1440px]:py-3.5 min-[1440px]:text-[16px] min-[1800px]:px-7.5 min-[1800px]:py-4 min-[1800px]:text-[18px]";

export default function Navbar({ onOpenLogin, onOpenSignup, onOpenBooking }) {
  const { t, isEn, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  // The bar is transparent over the hero and frosts once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`kz-header sticky top-0 z-30 ${scrolled ? "kz-scrolled" : ""}`}>
      <nav className="mx-auto flex max-w-[1200px] items-center gap-7 px-7 py-[15px] max-[1080px]:gap-4 max-[1080px]:px-[18px] max-[760px]:flex-wrap max-[760px]:gap-y-2.5 max-[760px]:px-4 max-[620px]:gap-2 min-[1440px]:max-w-[1440px] min-[1440px]:gap-9 min-[1440px]:py-5 min-[1800px]:max-w-[1680px]">
        <SectionLink
          to="topp"
          className="flex items-center gap-[11px] font-heading text-[22px] font-extrabold tracking-[-0.025em] text-ink min-[1440px]:gap-[13px] min-[1440px]:text-[28px] min-[1800px]:text-[32px]"
        >
          <KretzMark
            size={30}
            className="drop-shadow-[0_0_14px_rgba(116,205,133,0.45)] min-[1440px]:h-[38px]! min-[1440px]:w-[38px]! min-[1800px]:h-11! min-[1800px]:w-11!"
          />
          Kretz
        </SectionLink>

        <div className="flex items-center gap-6 text-[14px] font-medium max-[1080px]:gap-4 max-[1080px]:text-[13.5px] max-[1000px]:hidden min-[1440px]:gap-8 min-[1800px]:gap-10">
          <SectionLink to="funksjoner" className={linkClass}>
            {t("Funksjoner", "Features")}
          </SectionLink>
          <button
            type="button"
            onClick={onOpenBooking}
            className={`cursor-pointer border-0 bg-transparent p-0 font-body text-[14px] font-medium max-[1080px]:text-[13.5px] ${linkClass}`}
          >
            Booking
          </button>
          <SectionLink to="om-oss" className={linkClass}>
            {t("Om oss", "About us")}
          </SectionLink>
          <SectionLink to="kom-i-gang" className={linkClass}>
            {t("Kontakt oss", "Contact us")}
          </SectionLink>
        </div>

        {/* Spacer; on phones it becomes a line break so the buttons wrap below the logo. */}
        <div className="flex-1 max-[620px]:h-0 max-[620px]:basis-full" />

        <button
          type="button"
          onClick={toggleLang}
          className={`cursor-pointer rounded-full border border-ink/22 bg-transparent px-[15px] py-[9px] font-heading text-[12px] font-extrabold tracking-[0.08em] text-ink transition-colors duration-300 hover:bg-ink/10 ${btnSize}`}
        >
          {isEn ? "NO" : "EN"}
        </button>
        <button
          type="button"
          onClick={onOpenLogin}
          className={`cursor-pointer whitespace-nowrap rounded-full border-0 bg-grass px-[22px] py-3 font-heading text-[14px] font-extrabold text-ink shadow-[0_10px_28px_rgba(116,205,133,0.6),0_2px_10px_rgba(116,205,133,0.5),0_0_0_6px_rgba(116,205,133,0.14)] transition-[background,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-grass-soft hover:shadow-[0_16px_38px_rgba(116,205,133,0.7),0_4px_14px_rgba(116,205,133,0.55),0_0_0_8px_rgba(116,205,133,0.18)] ${btnSize}`}
        >
          {t("Logg inn", "Sign in")}
        </button>
        <button
          type="button"
          onClick={onOpenSignup}
          className={`cursor-pointer whitespace-nowrap rounded-full border border-ink bg-transparent px-[22px] py-3 font-heading text-[14px] font-extrabold text-ink transition-[background,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-paper ${btnSize}`}
        >
          {t("Registrer deg", "Sign up")}
        </button>
      </nav>
    </header>
  );
}
