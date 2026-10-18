import KretzMark from "../KretzMark";
import { useLang } from "../../lib/langContext";

/*
  The dashboard's navigation: a fixed sidebar on wide screens that folds
  into a sticky top bar (logo, profile chip, wrapping pill links) at 900px
  and below.
*/
export default function MemberSidebar({
  view,
  planOpen,
  unread,
  unreadNotices,
  firstName,
  avatar,
  onHome,
  onNavigate,
  onOpenPlan,
  onBook,
}) {
  const { t } = useLang();

  const item = (active) =>
    `flex w-full items-center justify-start gap-2 rounded-xl border-0 px-4 py-3 text-left font-heading text-[15px] font-extrabold transition-colors duration-200 max-[900px]:w-auto max-[900px]:rounded-full max-[900px]:px-3.5 max-[900px]:py-[9px] cursor-pointer ${
      active ? "bg-[#1d3a24] text-paper" : "bg-transparent text-ink hover:bg-ink/7"
    }`;

  const badge = (active, value) => (
    <span
      className={`ml-auto grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold max-[900px]:ml-1 ${
        active ? "bg-paper/25 text-paper" : "bg-grass text-ink"
      }`}
    >
      {value}
    </span>
  );

  const is = (name) => view === name && !planOpen;

  return (
    <header className="fixed inset-y-0 left-0 z-20 box-border w-[240px] overflow-y-auto overflow-x-hidden border-r border-ink/10 bg-[#f5f7f1] [scrollbar-width:thin] max-[900px]:sticky max-[900px]:inset-auto max-[900px]:top-0 max-[900px]:w-auto max-[900px]:overflow-visible max-[900px]:border-b max-[900px]:border-r-0 max-[900px]:bg-[#f5f7f1]/95 max-[900px]:backdrop-blur-xl">
      <div className="box-border flex min-h-full flex-col items-stretch gap-1.5 px-4 pb-4 pt-[22px] max-[900px]:min-h-0 max-[900px]:flex-row max-[900px]:flex-wrap max-[900px]:items-center max-[900px]:gap-2 max-[900px]:px-4 max-[900px]:py-3">
        <a
          href="#/medlem"
          onClick={(e) => {
            e.preventDefault();
            onHome();
          }}
          className="flex items-center gap-2.5 font-heading text-xl font-extrabold text-ink"
        >
          <KretzMark size={26} />
          Kretz
        </a>

        <div className="h-[22px] max-[900px]:hidden" />

        <nav
          aria-label={t("Medlemsmeny", "Member menu")}
          className="flex flex-col items-stretch gap-1.5 max-[900px]:order-last max-[900px]:basis-full max-[900px]:flex-row max-[900px]:flex-wrap max-[900px]:gap-2"
        >
          <button
            type="button"
            aria-current={is("messages")}
            onClick={() => onNavigate("messages")}
            className={item(is("messages"))}
          >
            {t("Meldinger", "Messages")}
            {badge(is("messages"), unread)}
          </button>
          <button
            type="button"
            aria-current={is("posts")}
            onClick={() => onNavigate("posts")}
            className={item(is("posts"))}
          >
            {t("Innlegg", "Posts")}
          </button>
          <button
            type="button"
            aria-current={is("volunteer")}
            onClick={() => onNavigate("volunteer")}
            className={item(is("volunteer"))}
          >
            {t("Dugnad", "Volunteer days")}
          </button>
          <button
            type="button"
            aria-current={is("notices")}
            onClick={() => onNavigate("notices")}
            className={item(is("notices"))}
          >
            {t("Varsler", "Notifications")}
            {unreadNotices > 0 && badge(is("notices"), unreadNotices)}
          </button>

          <div role="separator" className="mx-1 my-2 h-px bg-ink/14 max-[900px]:hidden" />

          <button
            type="button"
            aria-current={planOpen}
            onClick={onOpenPlan}
            className={item(planOpen)}
          >
            {t("Ukeplan", "Week plan")}
          </button>
          <button type="button" onClick={onBook} className={item(false)}>
            Booking
          </button>
        </nav>

        <div className="flex-1 max-[900px]:hidden" />

        <div className="grid gap-2.5 border-t border-ink/10 pt-3.5 max-[900px]:ml-auto max-[900px]:border-t-0 max-[900px]:pt-0">
          <button
            type="button"
            onClick={() => onNavigate("profile")}
            aria-label={t("Min profil", "My profile")}
            title={t("Min profil", "My profile")}
            className={`box-border flex w-full cursor-pointer items-center gap-2.5 rounded-2xl border-0 py-1.5 pl-1 pr-2 text-left font-body text-ink transition-colors duration-[250ms] hover:bg-ink/7 ${
              view === "profile" ? "bg-ink/8" : "bg-transparent"
            }`}
          >
            {avatar}
            <span className="min-w-0">
              <span className="block truncate font-heading text-sm font-extrabold">{firstName}</span>
              <span className="block text-xs text-ink/60">{t("Medlem", "Member")}</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
