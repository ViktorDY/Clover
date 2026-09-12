import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";

/*
  Post detail.

  The canvas gives a post two reactions — a heart and a star — that are
  mutually exclusive, with the heart counting into the post's like total.
  Comments work like the activity modal's: none are seeded, and anything
  typed here stays for the rest of the session.
*/
export default function PostModal({
  post,
  clubNameOf,
  reaction,
  onReact,
  comments,
  draft,
  onDraftChange,
  onSendComment,
  onClose,
}) {
  const { t, lang } = useLang();

  const clubName = clubNameOf(post.club);
  const likes = post.likes + (reaction === "like" ? 1 : 0);

  const reactButton = (active) =>
    `cursor-pointer rounded-full px-5 py-3 font-heading text-sm font-extrabold transition-all duration-300 ${
      active
        ? "-translate-y-0.5 border border-grass bg-grass text-ink"
        : "border border-ink/20 bg-white text-ink hover:bg-grass-tint"
    }`;

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/42 p-5 backdrop-blur-[6px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="kz-scroll relative max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-panel border border-ink/12 bg-white p-7 shadow-[0_34px_90px_rgba(22,36,26,0.28)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Lukk", "Close")}
          className="absolute right-5 top-5 h-9 w-9 cursor-pointer rounded-full border border-ink/14 bg-white text-base text-ink transition-colors duration-300 hover:bg-mute"
        >
          ×
        </button>

        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-heading text-sm font-extrabold text-paper">
            {clubName.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-heading text-base font-extrabold">{clubName}</div>
            <div className="text-[13px] text-ink/55">{pick(post.when, lang)}</div>
          </div>
        </div>

        <h3 className="mb-3 mr-9 mt-5 font-heading text-[23px] font-extrabold tracking-[-0.025em]">
          {pick(post.title, lang)}
        </h3>

        <p className="m-0 text-[15px] leading-[1.7] text-ink/78">{pick(post.text, lang)}</p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => onReact(post.id, "like")}
            className={reactButton(reaction === "like")}
          >
            {reaction === "like" ? "♥" : "♡"} {t("Liker", "Like")} · {likes}
          </button>
          <button
            type="button"
            onClick={() => onReact(post.id, "cheer")}
            className={reactButton(reaction === "cheer")}
          >
            {reaction === "cheer" ? "★" : "☆"} {t("Heia", "Cheer")}
          </button>
        </div>

        <div className="my-6 h-px bg-ink/10" />

        <div className="mb-3 font-heading text-[15px] font-extrabold">
          {t("Kommentarer", "Comments")}
        </div>

        <div className="grid gap-2.5">
          {(comments || []).map((comment, i) => (
            <div
              key={`post-comment-${i}`}
              className="rounded-[20px] border border-grass/45 bg-grass/20 px-4 py-3.5"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-[13px] font-extrabold">{comment.from}</span>
                <span className="text-[11px] text-ink/50">{comment.when}</span>
              </div>
              <div className="mt-1 text-sm text-ink/78">{comment.text}</div>
            </div>
          ))}

          {(comments || []).length === 0 && (
            <div className="rounded-[20px] border border-ink/10 bg-mute px-4 py-3.5 text-sm text-ink/60">
              {t("Ingen kommentarer ennå.", "No comments yet.")}
            </div>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSendComment(post.id);
          }}
          className="mt-3.5 flex flex-wrap gap-2.5"
        >
          <input
            type="text"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder={t("Skriv en kommentar", "Write a comment")}
            aria-label={t("Skriv en kommentar", "Write a comment")}
            className="min-w-0 flex-1 rounded-full border border-ink/14 bg-mute px-5 py-3.5 font-body text-sm text-ink outline-none transition-colors focus:border-grass"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full border-0 bg-grass px-6 py-3.5 font-heading text-sm font-extrabold text-ink transition-colors duration-300 hover:bg-moss"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
