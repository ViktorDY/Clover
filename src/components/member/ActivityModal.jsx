import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";
import { clubShort, dayMonth, initialsOf } from "../../lib/memberData";
import { CloseButton, Modal } from "./ui";

/*
  An activity's detail sheet: when, where, who is in charge (opens their
  contact card), how full it is, the RSVP buttons, the entry fee for
  tournaments, and a comment thread.
*/
export default function ActivityModal({
  activity,
  leader,
  rsvp,
  onRsvp,
  feePaid,
  onPayFee,
  comments,
  draft,
  onDraftChange,
  onSendComment,
  onOpenLeader,
  onClose,
}) {
  const { t, lang, isEn } = useLang();
  const joined = activity.joined + (rsvp === "in" ? 1 : 0);
  const fill = Math.round((100 * joined) / activity.cap);
  const leaderName = pick(leader.name, lang);
  const feeOpen = rsvp === "in";

  const rsvpButton = (active, yes) =>
    `flex-[1_1_150px] cursor-pointer rounded-full px-5 py-3.5 font-heading text-[15px] font-extrabold transition-all duration-300 ${
      active
        ? yes
          ? "-translate-y-0.5 border border-grass bg-grass text-ink"
          : "-translate-y-0.5 border border-ink bg-ink text-paper"
        : "border border-ink/20 bg-white text-ink hover:bg-grass-tint"
    }`;

  return (
    <Modal onClose={onClose} label={pick(activity.title, lang)} z="z-[75]" scrim="bg-ink/44 backdrop-blur-[8px]" className="max-w-[560px]">
      <div className="kz-scroll box-border max-h-[88vh] overflow-y-auto rounded-[36px] border border-ink/12 bg-white px-6 py-7 shadow-[0_36px_90px_rgba(22,36,26,0.3)] sm:px-8 sm:py-[30px]">
        <CloseButton onClick={onClose} label={t("Lukk", "Close")} className="absolute right-5 top-5 z-[3]" />

        <div className="text-xs font-semibold uppercase tracking-[0.13em] text-moss-dark">{clubShort(activity.club)}</div>
        <h3 className="mb-4 ml-0 mr-[34px] mt-2.5 font-heading text-[clamp(23px,3vw,30px)] font-extrabold tracking-[-0.03em]">
          {pick(activity.title, lang)}
        </h3>

        <div className="grid gap-4">
          <Detail label={t("Når", "When")} value={`${dayMonth(activity.day, activity.m, lang)} · ${pick(activity.time, lang)}`} />
          <Detail label={t("Hvor", "Where")} value={pick(activity.place, lang)} />
          <div>
            <div className="text-[11px] uppercase tracking-[0.12em] text-ink/55">{t("Ansvarlig", "Leader")}</div>
            <button
              type="button"
              onClick={onOpenLeader}
              className="mt-1 block cursor-pointer border-0 bg-transparent p-0 text-left font-heading text-base font-extrabold text-ink underline decoration-grass decoration-2 underline-offset-4 transition-colors hover:text-moss"
            >
              <span className="inline-flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="inline-grid h-8 w-8 flex-none place-items-center rounded-full border border-grass bg-[#CDEFD3] text-xs no-underline"
                >
                  {initialsOf(leaderName.replace(/^(Trener|Coach)\s+/i, ""))}
                </span>
                {leaderName} →
              </span>
            </button>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.12em] text-ink/55">{t("Påmeldte", "Signed up")}</div>
            <div className="mt-1 font-heading text-base font-extrabold">
              {joined} / {activity.cap}
            </div>
            <div className="mt-2.5 h-[7px] max-w-[280px] overflow-hidden rounded-full bg-ink/12">
              <div className="h-full rounded-full bg-moss transition-[width] duration-500" style={{ width: `${fill}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-4.5 flex flex-wrap gap-2.5">
          <button type="button" onClick={() => onRsvp("in")} className={rsvpButton(rsvp === "in", true)}>
            {t("Jeg kommer", "I am coming")}
          </button>
          <button type="button" onClick={() => onRsvp("out")} className={rsvpButton(rsvp === "out", false)}>
            {t("Kan ikke", "Cannot make it")}
          </button>
        </div>
        <div className="mt-2.5 min-h-[18px] text-[13px] text-ink/62">
          {rsvp === "in"
            ? t("Du er påmeldt. Ansvarlig ser svaret ditt.", "You are signed up. The leader can see your answer.")
            : rsvp === "out"
              ? t("Du er registrert som forhindret.", "You are marked as unavailable.")
              : t("Svar, så kan ansvarlig planlegge.", "Give an answer so the leader can plan.")}
        </div>

        {activity.fee ? (
          <div className="mt-3.5 flex flex-wrap items-center gap-3.5 rounded-[22px] border-[1.5px] border-[#2F6FE0] bg-[#E4EEFF] px-5 py-4.5">
            <div className="min-w-0 flex-[1_1_180px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1c4aa8]">
                {t("Deltakeravgift", "Entry fee")}
              </div>
              <div className="mt-1 font-heading text-[26px] font-extrabold text-ink">
                {isEn ? `NOK ${activity.fee}` : `kr ${activity.fee}`}
              </div>
            </div>
            {feePaid ? (
              <div className="rounded-full bg-[#bfe8c6] px-6.5 py-3.5 font-heading text-[15px] font-extrabold text-ink">
                {t("Betalt ✓ ", "Paid ✓ ")}
                {feePaid === "card" ? t("med kort", "by card") : "Vipps"}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!feeOpen}
                  onClick={() => onPayFee("vipps")}
                  className={`rounded-full border-0 bg-[#FF5B24] px-6 py-3.5 font-heading text-[15px] font-extrabold text-white ${
                    feeOpen ? "cursor-pointer" : "cursor-not-allowed opacity-40"
                  }`}
                >
                  {t("Betal med Vipps", "Pay with Vipps")}
                </button>
                <button
                  type="button"
                  disabled={!feeOpen}
                  onClick={() => onPayFee("card")}
                  className={`rounded-full border-2 border-[#2F6FE0] bg-white px-6 py-3.5 font-heading text-[15px] font-extrabold text-[#1c4aa8] ${
                    feeOpen ? "cursor-pointer" : "cursor-not-allowed opacity-40"
                  }`}
                >
                  {t("Betal med kort", "Pay by card")}
                </button>
              </div>
            )}
            {!feeOpen && !feePaid && (
              <div className="basis-full text-[13px] text-[#1c4aa8]">
                {t("Trykk «Jeg kommer» først for å låse opp betaling.", "Press “I am coming” first to unlock payment.")}
              </div>
            )}
          </div>
        ) : null}

        <div className="my-4.5 h-px bg-ink/12" />

        <CommentThread
          comments={comments}
          draft={draft}
          onDraftChange={onDraftChange}
          onSend={onSendComment}
        />
      </div>
    </Modal>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.12em] text-ink/55">{label}</div>
      <div className="mt-1 font-heading text-base font-extrabold">{value}</div>
    </div>
  );
}

// The comments block shared by activities and posts.
export function CommentThread({ comments, draft, onDraftChange, onSend }) {
  const { t, lang } = useLang();
  return (
    <>
      <div className="font-heading text-[17px] font-extrabold">{t("Kommentarer", "Comments")}</div>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2.5">
        {comments.map((c, i) => (
          <div
            key={`c${i}`}
            className={`rounded-[20px] px-4 py-3.5 ${
              c.me ? "border border-grass/45 bg-grass/20" : "border border-ink/10 bg-mute"
            }`}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-sm font-extrabold">{pick(c.from, lang)}</span>
              <span className="text-xs text-ink/50">{pick(c.when, lang)}</span>
            </div>
            <div className="mt-1 text-[15px] leading-[1.55] text-ink/80">{pick(c.text, lang)}</div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-sm text-ink/60">{t("Ingen kommentarer ennå.", "No comments yet.")}</div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="mt-3.5 flex flex-wrap gap-2"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder={t("Skriv en kommentar", "Write a comment")}
          aria-label={t("Skriv en kommentar", "Write a comment")}
          className="min-w-0 flex-[1_1_180px] rounded-full border border-ink/18 bg-mute px-5 py-3.5 font-body text-[15px] text-ink outline-none transition-colors focus:border-grass focus:bg-white"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full border-0 bg-grass px-6 py-3.5 font-heading text-sm font-extrabold text-ink transition-colors duration-300 hover:bg-grass-soft"
        >
          {t("Send", "Send")}
        </button>
      </form>
    </>
  );
}
