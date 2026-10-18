import { useState } from "react";
import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";
import { MEMBER_CLUBS, clubShort } from "../../lib/memberData";
import { CloseButton, CountChip, Modal, PhotoSlot } from "./ui";
import { CommentThread } from "./ActivityModal";

/*
  Innlegg: the clubs' posts, high priority first, with filters and a button
  to write one yourself. Unread posts are tinted (amber for high priority,
  green otherwise) until opened.
*/
export default function PostsView({ posts, isRead, photos, onPhoto, reactions, extraComments, onOpen, onNewPost }) {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState("all");

  const tests = {
    all: () => true,
    unread: (p) => !isRead(p),
    coach: (p) => p.from === "coach",
    board: (p) => p.from === "board",
  };
  const filtered = posts.filter(tests[filter]);
  const bands = [
    { id: "high", label: t("Høy prioritet", "High priority"), items: filtered.filter((p) => p.priority === "high") },
    { id: "other", label: t("Annet", "Other"), items: filtered.filter((p) => p.priority !== "high") },
  ].filter((band) => band.items.length > 0);

  const filters = [
    { id: "all", label: t("Alle", "All") },
    { id: "unread", label: t("Uleste", "Unread") },
    { id: "coach", label: t("Fra trenerteam", "From the coaches") },
    { id: "board", label: t("Fra styret", "From the board") },
  ];

  return (
    <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label={t("Filtrer innlegg", "Filter posts")} className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <CountChip
              key={f.id}
              active={filter === f.id}
              onClick={() => setFilter(f.id)}
              label={f.label}
              count={posts.filter(tests[f.id]).length}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onNewPost}
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border-0 bg-moss px-6 py-[13px] font-heading text-[15px] font-extrabold text-white shadow-[0_12px_30px_rgba(31,122,58,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
        >
          <span aria-hidden="true" className="text-[19px] leading-none">+</span>
          {t("Lag innlegg", "Make a post")}
        </button>
      </div>

      {bands.map((band) => (
        <div key={band.id}>
          <div className="flex items-baseline gap-2.5">
            <span className={`text-xs font-semibold uppercase tracking-[0.13em] ${band.id === "high" ? "text-amber-ink" : "text-ink/55"}`}>
              {band.label}
            </span>
            <span className="h-px flex-1 bg-ink/12" />
            <span className="text-xs text-ink/50">
              {band.items.length} {t("innlegg", band.items.length === 1 ? "post" : "posts")}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3">
            {band.items.map((p) => {
              const unread = !isRead(p);
              const high = p.priority === "high";
              const tone = unread
                ? high
                  ? "bg-[#E8B923] border-[#E8B923]"
                  : "bg-[#CDEFD3] border-grass"
                : "bg-white border-ink/12";
              const ring = high ? "border-2 border-[#FFD23F]! shadow-[0_0_0_4px_rgba(255,210,63,0.2)]" : "border";
              const title = pick(p.title, lang);
              const open = () => onOpen(p.id);
              return (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={open}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      open();
                    }
                  }}
                  aria-label={`${t("Åpne innlegg: ", "Open post: ")}${title}`}
                  className={`box-border block w-full cursor-pointer rounded-[30px] px-5 py-5 text-left font-body text-ink transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-[3px] hover:shadow-[0_22px_46px_rgba(22,36,26,0.14)] sm:px-6 sm:py-[22px] ${tone} ${ring}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full bg-ink font-heading text-[13px] font-extrabold text-paper">
                      {clubShort(p.club).slice(0, 2).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block font-heading text-[15px] font-extrabold">{clubShort(p.club)}</span>
                      <span className={`mt-0.5 block text-[13px] ${unread ? "text-ink/82" : "text-ink/66"}`}>{pick(p.when, lang)}</span>
                    </span>
                    {high && (
                      <span
                        className={`flex-none whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] ${
                          unread ? "bg-ink text-paper" : "bg-amber/34 text-amber-ink"
                        }`}
                      >
                        {t("Høy prioritet", "High priority")}
                      </span>
                    )}
                  </span>
                  {p.photo && (
                    <PhotoSlot
                      src={photos[p.id]}
                      onPick={(url) => onPhoto(p.id, url)}
                      hint={t("Legg til bilde i innlegget", "Add a photo to this post")}
                      tone={unread ? "onColor" : "plain"}
                      className="mt-3.5 h-[clamp(170px,24vw,260px)] w-full rounded-[18px]"
                    />
                  )}
                  <span className="mt-3.5 block text-left font-heading text-[19px] font-extrabold tracking-[-0.02em]">{title}</span>
                  <span className={`kz-clamp-3 mt-2 text-left text-[15px] leading-[1.6] ${unread ? "text-ink/82" : "text-ink/72"}`}>
                    {pick(p.text, lang)}
                  </span>
                  <span
                    className={`mt-4 flex items-center gap-4.5 border-t pt-3.5 text-left text-sm text-ink/78 ${
                      unread ? "border-ink/18" : "border-ink/10"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <HeartIcon />
                      {p.likes + (reactions[p.id] === "like" ? 1 : 0)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CommentIcon />
                      {p.comments + (extraComments[p.id] || []).length}
                    </span>
                    <span className="ml-auto font-heading text-[13.5px] font-extrabold">{t("Les mer", "Read more")} →</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="rounded-[22px] border border-dashed border-ink/25 p-7 text-[15px] text-ink/68">
          {t("Ingen innlegg matcher dette filteret.", "No posts match this filter.")}
        </div>
      )}
    </div>
  );
}

export function PostModal({ post, photo, onPhoto, reaction, onReact, comments, draft, onDraftChange, onSendComment, onClose }) {
  const { t, lang } = useLang();
  const likes = post.likes + (reaction === "like" ? 1 : 0);
  const react = (active) =>
    `cursor-pointer rounded-full px-5 py-3 font-heading text-sm font-extrabold transition-all duration-300 ${
      active ? "-translate-y-0.5 border border-grass bg-grass text-ink" : "border border-ink/20 bg-white text-ink hover:bg-grass-tint"
    }`;
  return (
    <Modal onClose={onClose} label={pick(post.title, lang)} z="z-[78]" className="max-w-[600px]">
      <div className="kz-scroll box-border max-h-[88vh] overflow-y-auto rounded-[36px] border border-ink/12 bg-white px-6 py-7 shadow-[0_36px_90px_rgba(22,36,26,0.3)] sm:px-8 sm:py-[30px]">
        <CloseButton onClick={onClose} label={t("Lukk", "Close")} className="absolute right-5 top-5 z-[3]" />
        <div className="flex items-center gap-3">
          <span className="grid h-[42px] w-[42px] flex-none place-items-center rounded-full bg-ink font-heading text-sm font-extrabold text-paper">
            {clubShort(post.club).slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-heading text-base font-extrabold">{clubShort(post.club)}</div>
            <div className="text-[13px] text-ink/55">{pick(post.when, lang)}</div>
          </div>
        </div>
        <h3 className="mb-3 ml-0 mr-[34px] mt-4 font-heading text-[clamp(22px,3vw,30px)] font-extrabold tracking-[-0.03em]">
          {pick(post.title, lang)}
        </h3>
        {post.photo && (
          <PhotoSlot
            src={photo}
            onPick={onPhoto}
            hint={t("Slipp inn et bilde fra klubben", "Drop a photo from the club")}
            className="mb-4 h-[260px] w-full rounded-3xl"
          />
        )}
        <p className="m-0 text-base leading-[1.7] text-ink/80">{pick(post.text, lang)}</p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <button type="button" onClick={() => onReact("like")} className={react(reaction === "like")}>
            {reaction === "like" ? "♥ " : "♡ "}
            {t("Liker", "Like")} · {likes}
          </button>
          <button type="button" onClick={() => onReact("cheer")} className={react(reaction === "cheer")}>
            {reaction === "cheer" ? "★ " : "☆ "}
            {t("Heia", "Cheer")}
          </button>
        </div>

        <div className="my-4.5 h-px bg-ink/12" />
        <CommentThread comments={comments} draft={draft} onDraftChange={onDraftChange} onSend={onSendComment} />
      </div>
    </Modal>
  );
}

/* "Lag innlegg": write a post to one of your clubs. */
export function PostFormModal({ defaultClub, onPublish, onClose }) {
  const { t } = useLang();
  const [club, setClub] = useState(defaultClub || MEMBER_CLUBS[0].slug);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(false);
  const [error, setError] = useState("");

  const field =
    "box-border w-full rounded-[18px] border border-ink/18 bg-mute px-4.5 py-[13px] font-body text-[15px] font-normal normal-case tracking-normal text-ink outline-none transition-colors focus:border-grass focus:bg-white";
  const label = "grid gap-[7px] text-[12.5px] font-bold uppercase tracking-[0.08em] text-ink/70";

  return (
    <Modal onClose={onClose} label={t("Lag innlegg", "Make a post")} z="z-[95]" scrim="bg-ink/50 backdrop-blur-[8px]" className="max-w-[520px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !text.trim()) {
            setError(t("Skriv en tittel og en melding.", "Add a title and a message."));
            return;
          }
          onPublish({ club, title: title.trim(), text: text.trim(), photo });
        }}
        className="box-border grid max-h-[90vh] gap-3.5 overflow-y-auto rounded-[28px] bg-white px-6.5 pb-[22px] pt-6.5 shadow-[0_36px_90px_rgba(22,36,26,0.35)]"
      >
        <div className="flex items-center gap-2.5">
          <h2 className="m-0 flex-1 font-heading text-[22px] font-extrabold">{t("Lag innlegg", "Make a post")}</h2>
          <CloseButton onClick={onClose} label={t("Lukk", "Close")} />
        </div>
        <label className={label}>
          {t("Klubb", "Club")}
          <select value={club} onChange={(e) => setClub(e.target.value)} className={field}>
            {MEMBER_CLUBS.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          {t("Tittel", "Title")}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder={t("Hva handler det om?", "What is it about?")}
            className={field}
          />
        </label>
        <label className={label}>
          {t("Melding", "Message")}
          <textarea
            rows={5}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            placeholder={t("Skriv noe til klubben …", "Write something for the club…")}
            className={`${field} resize-none leading-[1.5]`}
          />
        </label>
        <div className="flex items-center gap-2.5 rounded-[14px] border border-[rgba(255,210,63,0.6)] bg-[rgba(255,210,63,0.18)] px-3.5 py-2.5 text-[13px] text-ink">
          <span aria-hidden="true" className="h-2.5 w-2.5 flex-none rounded-full bg-[#FFD23F]" />
          {t("Innlegg med høy prioritet kan bare lages av styret.", "High-priority posts can only be made by the board.")}
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
          <input
            type="checkbox"
            checked={photo}
            onChange={(e) => setPhoto(e.target.checked)}
            className="h-[17px] w-[17px] accent-moss"
          />
          {t("Legg til bilde", "Add a photo")}
        </label>
        {error && (
          <div role="alert" className="text-[13.5px] font-semibold text-[#c92a14]">
            {error}
          </div>
        )}
        <div className="mt-0.5 flex gap-2">
          <button type="submit" className="cursor-pointer rounded-full border-0 bg-moss px-6.5 py-[13px] font-heading text-[15px] font-extrabold text-white hover:bg-ink">
            {t("Publiser innlegg", "Publish post")}
          </button>
          <button type="button" onClick={onClose} className="cursor-pointer rounded-full border border-ink/20 bg-white px-5.5 py-[13px] font-heading text-[15px] font-extrabold text-ink">
            {t("Avbryt", "Cancel")}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
