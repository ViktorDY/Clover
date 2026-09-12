import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";

/*
  Activity detail.

  Opens from the calendar or the upcoming list. The answer ("Jeg kommer" /
  "Kan ikke") is kept in the page's `rsvp` map and counts towards the signed-
  up figure straight away, so the meter moves as you answer. Comments start
  from two seeded ones per activity and anything typed here joins them for
  the rest of the session.
*/
export default function ActivityModal({
  activity,
  clubNameOf,
  rsvp,
  onRsvp,
  comments,
  draft,
  onDraftChange,
  onSendComment,
  onClose,
}) {
  const { t, lang, isEn } = useLang();

  const answer = rsvp || "";
  const joined = activity.joined + (answer === "in" ? 1 : 0);
  const fill = Math.round((100 * joined) / activity.cap);

  const seeded = [
    {
      from: pick(activity.leader, lang),
      when: t("for 2 dager siden", "2 days ago"),
      text: t(
        "Ta med begge draktene og full flaske.",
        "Bring both jerseys and a full bottle.",
      ),
    },
    {
      from: "Marit S.",
      when: t("i går", "yesterday"),
      text: t("Vi kan kjøre to ekstra spillere.", "We can drive two extra players."),
    },
  ];
  const allComments = seeded.concat(comments || []);

  const rsvpButton = (active, yes) =>
    `flex-[1_1_150px] cursor-pointer rounded-full px-5 py-3.5 font-heading text-[15px] font-extrabold transition-all duration-300 ${
      active
        ? yes
          ? "-translate-y-0.5 border border-grass bg-grass text-ink"
          : "-translate-y-0.5 border border-ink bg-ink text-paper"
        : "border border-ink/20 bg-white text-ink hover:bg-grass-tint"
    }`;

  const facts = [
    { label: t("Når", "When"), value: t(`${activity.day}. sep · `, `${activity.day} Sep · `) + pick(activity.time, lang) },
    { label: t("Hvor", "Where"), value: pick(activity.place, lang) },
    { label: t("Ansvarlig", "Leader"), value: pick(activity.leader, lang) },
  ];

  const note =
    answer === "in"
      ? t("Du er påmeldt. Ansvarlig ser svaret ditt.", "You are signed up. The leader can see your answer.")
      : answer === "out"
        ? t("Du er registrert som forhindret.", "You are marked as unavailable.")
        : t("Svar, så kan ansvarlig planlegge.", "Give an answer so the leader can plan.");

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/42 p-5 backdrop-blur-[6px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="kz-scroll relative max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-panel border border-ink/12 bg-white p-7 shadow-[0_34px_90px_rgba(22,36,26,0.28)]"
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

        <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/55">
          {clubNameOf(activity.club)}
        </div>

        <h3 className="mb-5 mr-9 mt-1.5 font-heading text-2xl font-extrabold tracking-[-0.025em]">
          {pick(activity.title, lang)}
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-3xl border border-ink/10 bg-mute px-4 py-3.5">
              <div className="text-[11px] uppercase tracking-[0.1em] text-ink/55">{fact.label}</div>
              <div className="mt-1 font-heading text-[15px] font-extrabold">{fact.value}</div>
            </div>
          ))}

          <div className="rounded-3xl border border-ink/10 bg-mute px-4 py-3.5">
            <div className="text-[11px] uppercase tracking-[0.1em] text-ink/55">
              {t("Påmeldte", "Signed up")}
            </div>
            <div className="mt-1 font-heading text-[15px] font-extrabold">
              {joined} / {activity.cap}
            </div>
            <div className="mt-1.5 h-[7px] overflow-hidden rounded-full bg-ink/12">
              <div
                className="h-full rounded-full bg-grass transition-[width] duration-500"
                style={{ width: `${fill}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onRsvp(activity.id, "in")}
            className={rsvpButton(answer === "in", true)}
          >
            {t("Jeg kommer", "I am coming")}
          </button>
          <button
            type="button"
            onClick={() => onRsvp(activity.id, "out")}
            className={rsvpButton(answer === "out", false)}
          >
            {t("Kan ikke", "Cannot make it")}
          </button>
        </div>

        <div className="mt-3 text-[13px] text-ink/62">{note}</div>

        <div className="my-6 h-px bg-ink/10" />

        <div className="mb-3 font-heading text-[15px] font-extrabold">
          {t("Kommentarer", "Comments")}
        </div>

        <div className="grid gap-2.5">
          {allComments.map((comment, i) => (
            <div
              key={`comment-${i}`}
              className={`rounded-[20px] px-4 py-3.5 ${
                comment.me
                  ? "border border-grass/45 bg-grass/20"
                  : "border border-ink/10 bg-[#f4f8f2]"
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-[13px] font-extrabold">{comment.from}</span>
                <span className="text-[11px] text-ink/50">{comment.when}</span>
              </div>
              <div className="mt-1 text-sm text-ink/78">{comment.text}</div>
            </div>
          ))}

          {allComments.length === 0 && (
            <div className="rounded-[20px] border border-ink/10 bg-mute px-4 py-3.5 text-sm text-ink/60">
              {t("Ingen kommentarer ennå.", "No comments yet.")}
            </div>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSendComment(activity.id);
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
            {isEn ? "Send" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
