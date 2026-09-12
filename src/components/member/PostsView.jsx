import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";

/*
  Club posts, banded by priority as the canvas groups them. Rows show a
  trimmed preview; the full post opens in a modal, and an unread post keeps
  a marker until it has been opened once.
*/
const PREVIEW_LENGTH = 120;

export default function PostsView({ posts, clubNameOf, readPosts, onOpenPost }) {
  const { t, lang } = useLang();

  const bands = [
    { id: "high", label: t("Høy prioritet", "High priority") },
    { id: "other", label: t("Annet", "Other") },
  ]
    .map((band) => ({
      ...band,
      items: posts.filter((post) =>
        band.id === "high" ? post.priority === "high" : post.priority !== "high",
      ),
    }))
    .filter((band) => band.items.length > 0);

  return (
    <div className="mt-6 grid gap-6">
      {bands.map((band) => (
        <div key={band.id}>
          <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/50">
            {band.label}
          </div>

          <div className="grid gap-4">
            {band.items.map((post) => {
              const clubName = clubNameOf(post.club);
              const body = pick(post.text, lang);
              const preview =
                body.length > PREVIEW_LENGTH
                  ? `${body.slice(0, PREVIEW_LENGTH).trim()}…`
                  : body;
              const unread = !readPosts[post.id];

              return (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => onOpenPost(post.id)}
                  className={`block w-full cursor-pointer rounded-panel border bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 sm:p-7 ${
                    unread ? "border-grass/45 shadow-[0_10px_30px_rgba(116,205,133,0.14)]" : "border-ink/12"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-heading text-sm font-extrabold text-paper">
                      {clubName.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-heading text-base font-extrabold">{clubName}</div>
                      <div className="text-[13px] text-ink/55">{pick(post.when, lang)}</div>
                    </div>

                    {post.priority === "high" && (
                      <span className="shrink-0 whitespace-nowrap rounded-full bg-amber/30 px-3.5 py-1.5 text-xs font-semibold text-amber-ink">
                        {t("Høy prioritet", "High priority")}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 mt-4.5 font-heading text-[21px] font-extrabold">
                    {pick(post.title, lang)}
                  </h3>

                  <p className="m-0 text-[15px] leading-[1.65] text-ink/75">{preview}</p>

                  <div className="mt-4.5 text-sm text-ink/60">
                    {post.photo ? t("📷 bilde · ", "📷 photo · ") : ""}
                    {post.likes} {t("liker", "likes")} · {post.comments}{" "}
                    {t("kommentarer", "comments")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
