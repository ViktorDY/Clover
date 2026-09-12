import { useMemo, useState } from "react";
import KretzMark from "../components/KretzMark";
import StatTiles from "../components/member/StatTiles";
import UpcomingPanel from "../components/member/UpcomingPanel";
import PaymentsPanel from "../components/member/PaymentsPanel";
import NoticesPanel from "../components/member/NoticesPanel";
import MessagesView from "../components/member/MessagesView";
import PostsView from "../components/member/PostsView";
import MemberBookPicker from "../components/member/MemberBookPicker";
import { useLang } from "../lib/langContext";
import {
  ACTIVITIES,
  MEMBER_CLUBS,
  NOTICES,
  PAYMENTS,
  POSTS,
  nok,
  seedThreads,
} from "../lib/memberData";

const MEMBER_NAME = "Emma Sunde";
const PINNED_KEY = "kretz.member.pinnedClub";

function readPinnedClub() {
  try {
    const stored = window.localStorage.getItem(PINNED_KEY) || "";
    return MEMBER_CLUBS.some((c) => c.slug === stored) ? stored : "";
  } catch {
    // Storage unavailable — no pinned club, which is a fine default.
    return "";
  }
}

function formatSize(bytes) {
  return bytes > 1048576
    ? `${(bytes / 1048576).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} kB`;
}

export default function MemberPage({ onExit, onBook }) {
  const { t, lang, isEn, toggleLang } = useLang();

  // A pinned club is remembered between visits and becomes the default filter.
  const [pinned, setPinned] = useState(readPinnedClub);
  const [club, setClub] = useState(pinned || "all");
  const [view, setView] = useState("home");
  const [calOpen, setCalOpen] = useState(false);
  const [bookPickerOpen, setBookPickerOpen] = useState(false);
  const [threads, setThreads] = useState(seedThreads);
  // Conversation order: unread first initially, then most recently active.
  const [order, setOrder] = useState(() => {
    const seeded = seedThreads();
    return seeded
      .map((thread, i) => ({
        id: thread.id,
        unread: thread.msgs.filter((m) => !m.me && m.unread).length,
        i,
      }))
      .sort((a, b) => b.unread - a.unread || a.i - b.i)
      .map((entry) => entry.id);
  });

  const showAll = club === "all";
  const keep = (item) => showAll || item.club === club;
  const clubShortOf = (slug) => (MEMBER_CLUBS.find((c) => c.slug === slug) || {}).short || "";

  const activities = ACTIVITIES.filter(keep);
  const payments = PAYMENTS.filter(keep);
  const notices = NOTICES.filter(keep);
  const posts = POSTS.filter(keep);
  const visibleThreads = useMemo(() => {
    const filtered = threads.filter(keep);
    const rank = (thread) => {
      const i = order.indexOf(thread.id);
      return i === -1 ? order.length : i;
    };
    return filtered.slice().sort((a, b) => rank(a) - rank(b));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads, order, club]);

  const unpaid = payments.filter((p) => !p.paid);
  const dueSum = unpaid.reduce((sum, p) => sum + p.amount, 0);
  const dugnad = activities.filter((a) => a.kind === "dugnad");
  const unreadTotal = visibleThreads.reduce(
    (n, thread) => n + thread.msgs.filter((m) => !m.me && m.unread).length,
    0,
  );

  const firstName = MEMBER_NAME.split(/\s+/)[0];
  const initials = MEMBER_NAME.split(/\s+/)
    .slice(0, 2)
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");

  /* ---- Thread mutations ------------------------------------------------- */

  const updateThread = (id, mutate) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === id ? mutate(structuredClone(thread)) : thread,
      ),
    );
  };

  const bumpThread = (id) => {
    setOrder((prev) => [id, ...prev.filter((x) => x !== id)]);
  };

  const handleOpenThread = (id) => {
    updateThread(id, (thread) => {
      thread.msgs.forEach((message) => {
        if (!message.me) message.unread = false;
      });
      return thread;
    });
  };

  const stamp = () => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    return { no: `i dag ${time}`, en: `today ${time}` };
  };

  const handleSendMessage = (threadId, text) => {
    updateThread(threadId, (thread) => {
      thread.msgs.push({
        id: `n${Date.now()}`,
        from: { no: "Du", en: "You" },
        me: true,
        when: stamp(),
        text,
      });
      return thread;
    });
    bumpThread(threadId);
  };

  const handleAttach = (threadId, fileList, kind) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    const when = stamp();
    updateThread(threadId, (thread) => {
      const target = thread.folders[0];
      files.forEach((file, i) => {
        const resolved = file.type && file.type.startsWith("image") ? "img" : kind;
        const size = formatSize(file.size);
        thread.msgs.push({
          id: `a${Date.now()}${i}`,
          from: { no: "Du", en: "You" },
          me: true,
          when,
          file: { name: file.name, kind: resolved, size },
        });
        if (target) {
          target.files.push({
            id: `af${Date.now()}${i}`,
            name: file.name,
            kind: resolved,
            meta: { no: `${size} · Du`, en: `${size} · You` },
          });
        }
      });
      return thread;
    });
    bumpThread(threadId);
  };

  const handleAttachToFolder = (threadId, folderId, fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    updateThread(threadId, (thread) => {
      const folder = thread.folders.find((f) => f.id === folderId) || thread.folders[0];
      if (!folder) return thread;
      files.forEach((file, i) => {
        const kind = file.type && file.type.startsWith("image") ? "img" : "doc";
        const size = formatSize(file.size);
        folder.files.push({
          id: `uf${Date.now()}${i}`,
          name: file.name,
          kind,
          meta: { no: `${size} · Du`, en: `${size} · You` },
        });
      });
      return thread;
    });
  };

  const handleAddFolder = (threadId, name) => {
    const id = `fo${Date.now()}`;
    updateThread(threadId, (thread) => {
      thread.folders.push({ id, name, files: [] });
      return thread;
    });
    return id;
  };

  const handleMoveFile = (threadId, fromId, toId, fileId) => {
    updateThread(threadId, (thread) => {
      const from = thread.folders.find((f) => f.id === fromId);
      const to = thread.folders.find((f) => f.id === toId);
      if (!from || !to) return thread;
      const item = from.files.find((f) => f.id === fileId);
      if (!item) return thread;
      from.files = from.files.filter((f) => f.id !== fileId);
      to.files.push(item);
      return thread;
    });
  };

  const handleRemoveFile = (threadId, folderId, fileId) => {
    updateThread(threadId, (thread) => {
      const folder = thread.folders.find((f) => f.id === folderId);
      if (folder) folder.files = folder.files.filter((f) => f.id !== fileId);
      return thread;
    });
  };

  /* ---- Header + tabs ---------------------------------------------------- */

  const navClass = (active) =>
    `cursor-pointer whitespace-nowrap rounded-full px-4.5 py-2.5 font-heading text-[13px] font-extrabold transition-colors duration-300 ${
      active
        ? "border border-ink bg-ink text-paper"
        : "border border-ink/20 bg-transparent text-ink hover:bg-ink/8"
    }`;

  const togglePin = (slug) => {
    const next = pinned === slug ? "" : slug;
    try {
      window.localStorage.setItem(PINNED_KEY, next);
    } catch {
      // Pinning is a convenience; failing to persist it is not an error.
    }
    setPinned(next);
  };

  const nextActivity = activities[0];

  const tiles = [
    {
      label: t("Neste aktivitet", "Next activity"),
      value: nextActivity
        ? t(`${nextActivity.day}. sep`, `${nextActivity.day} Sep`)
        : t("Ingenting planlagt", "Nothing planned"),
      note: nextActivity
        ? `${nextActivity.meta[lang].split("· ")[1]} · ${nextActivity.title[lang]} · ${clubShortOf(nextActivity.club)}`
        : "—",
      variant: "plain",
    },
    {
      label: t("Ubetalte fakturaer", "Unpaid invoices"),
      value: unpaid.length ? `${unpaid.length} · ${nok(dueSum, isEn)}` : t("Ingen", "None"),
      note: unpaid.length
        ? t(`Neste forfall ${unpaid[0].due.no}`, `Next due ${unpaid[0].due.en}`)
        : t("Alt er betalt", "Everything is paid"),
      variant: "amber",
    },
    {
      label: t("Uleste meldinger", "Unread messages"),
      value: String(unreadTotal),
      note: t("Fra trener og styret", "From coach and board"),
      variant: "plain",
    },
    {
      label: t("Dugnad igjen", "Volunteer shifts left"),
      value: `${dugnad.length} ${t(dugnad.length === 1 ? "vakt" : "vakter", dugnad.length === 1 ? "shift" : "shifts")}`,
      note: dugnad.length
        ? dugnad.map((d) => t(`${d.day}. sep`, `${d.day} Sep`)).join(" · ")
        : t("Ingen igjen", "None left"),
      variant: "grass",
    },
  ];

  const clubTabs = [
    { slug: "all", label: t("Alle klubber", "All clubs"), pinnable: false },
    ...MEMBER_CLUBS.map((c) => ({ slug: c.slug, label: c.short, pinnable: true })),
  ];

  const handleBookClick = () => {
    if (showAll) {
      setBookPickerOpen(true);
      return;
    }
    // Varden's bookable venue is registered under the bordtennis slug.
    onBook(club === "varden" ? "bordtennis" : club);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-2.5 px-4 py-3.5 sm:gap-4 sm:px-6">
          <button
            type="button"
            onClick={onExit}
            className="flex cursor-pointer items-center gap-2.5 bg-transparent font-heading text-xl font-extrabold text-ink"
          >
            <KretzMark size={26} />
            Kretz
          </button>

          <div className="hidden flex-1 sm:block" />

          <button
            type="button"
            onClick={() => setView((v) => (v === "messages" ? "home" : "messages"))}
            className={`${navClass(view === "messages")} inline-flex items-center gap-2`}
          >
            {t("Meldinger", "Messages")}
            <span
              className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold ${
                view === "messages" ? "bg-paper/25 text-paper" : "bg-grass text-ink"
              }`}
            >
              {unreadTotal}
            </span>
          </button>

          <button type="button" onClick={handleBookClick} className={navClass(false)}>
            Booking
          </button>

          <button
            type="button"
            onClick={() => setView((v) => (v === "posts" ? "home" : "posts"))}
            className={navClass(view === "posts")}
          >
            {t("Innlegg", "Posts")}
          </button>

          <button
            type="button"
            onClick={toggleLang}
            className="cursor-pointer rounded-full border border-ink/20 bg-transparent px-3.5 py-2 font-heading text-xs font-extrabold tracking-[0.08em] text-ink transition-colors hover:bg-ink/10"
          >
            {isEn ? "NO" : "EN"}
          </button>

          <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-ink font-heading text-sm font-extrabold text-paper">
            {initials}
          </span>

          <button
            type="button"
            onClick={onExit}
            className="cursor-pointer whitespace-nowrap rounded-full border border-ink/22 px-4.5 py-2.5 font-heading text-[13px] font-extrabold text-ink transition-colors duration-300 hover:bg-ink/8"
          >
            {t("Logg ut", "Log out")}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1160px] px-5 pb-18 pt-10 sm:px-6">
        {view !== "home" && (
          <button
            type="button"
            onClick={() => setView("home")}
            className="mb-5.5 inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-ink/20 bg-white py-2.5 pl-3.5 pr-5 font-heading text-sm font-extrabold text-ink transition-all duration-300 hover:-translate-x-[3px] hover:bg-grass-tint"
          >
            <span className="text-[17px]">←</span>
            {t("Tilbake til hjemmesiden", "Back to my home page")}
          </button>
        )}

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            {view !== "messages" ? (
              <>
                <h1 className="m-0 font-heading text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.02]">
                  {t("Hei", "Hi")}, {firstName}
                </h1>
                <p className="mb-0 mt-2.5 text-[17px] text-ink/70">
                  {unpaid.length
                    ? t(
                        `Du har ${unpaid.length} ${unpaid.length === 1 ? "ubetalt faktura" : "ubetalte fakturaer"} og ${dugnad.length} dugnadsvakter igjen.`,
                        `You have ${unpaid.length} ${unpaid.length === 1 ? "unpaid invoice" : "unpaid invoices"} and ${dugnad.length} volunteer shifts left.`,
                      )
                    : t(
                        `Alt er betalt — ${dugnad.length} dugnadsvakter står igjen.`,
                        `Everything is paid — ${dugnad.length} volunteer shifts left.`,
                      )}
                </p>
              </>
            ) : (
              <h1 className="m-0 font-heading text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.04]">
                {t("Meldinger", "Messages")}
              </h1>
            )}
          </div>
          <span className="rounded-full border border-ink/12 bg-white px-4.5 py-2.5 text-sm text-ink/70">
            {t("Lørdag 12. september", "Saturday 12 September")}
          </span>
        </div>

        {/* Club filter with pin-as-start-page stars */}
        <div className="mt-6.5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
            {t("Klubb", "Club")}
          </span>
          {clubTabs.map((tab) => {
            const active = club === tab.slug;
            const isPinned = pinned === tab.slug;
            return (
              <span
                key={tab.slug}
                className={`inline-flex items-center overflow-hidden rounded-full transition-colors duration-[350ms] ${
                  active ? "border border-ink bg-ink" : "border border-ink/14 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setClub(tab.slug)}
                  className={`cursor-pointer whitespace-nowrap border-0 bg-transparent px-4 py-2.5 font-heading text-[13px] font-extrabold transition-colors duration-300 ${
                    active ? "text-paper" : "text-ink"
                  }`}
                >
                  {tab.label}
                </button>
                {tab.pinnable && (
                  <button
                    type="button"
                    onClick={() => togglePin(tab.slug)}
                    aria-label={t("Fest som startside", "Pin as start page")}
                    title={t("Fest som startside", "Pin as start page")}
                    className={`cursor-pointer border-0 bg-transparent py-2.5 pl-0.5 pr-3.5 text-sm leading-none transition-colors duration-300 ${
                      isPinned
                        ? active
                          ? "text-amber"
                          : "text-amber-pin"
                        : active
                          ? "text-paper/55"
                          : "text-ink/35"
                    }`}
                  >
                    {isPinned ? "★" : "☆"}
                  </button>
                )}
              </span>
            );
          })}
        </div>
        <div className="mt-2.5 text-[13px] text-ink/60">
          {pinned
            ? t(
                `★ ${clubShortOf(pinned)} er festet — den åpnes automatisk neste gang du logger inn.`,
                `★ ${clubShortOf(pinned)} is pinned — it opens automatically next time you log in.`,
              )
            : t(
                "Trykk på stjernen for å feste en klubb som startside.",
                "Tap the star to pin a club as your start page.",
              )}
        </div>

        {view === "home" && (
          <>
            <StatTiles tiles={tiles} />

            <div className="mt-4.5 grid gap-4.5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
              <UpcomingPanel
                activities={activities.map((activity) => ({
                  club: activity.club,
                  day: activity.day,
                  kind: activity.kind,
                  title: activity.title[lang],
                  meta: `${showAll ? `${clubShortOf(activity.club)} · ` : ""}${activity.meta[lang]}`,
                }))}
                calOpen={calOpen}
                onToggleCalendar={() => setCalOpen((prev) => !prev)}
              />

              <div className="grid content-start gap-4.5">
                <PaymentsPanel
                  scope={
                    showAll
                      ? t(
                          "Kontingent og avgifter i alle klubbene dine.",
                          "Fees and charges across all your clubs.",
                        )
                      : t(
                          `Kontingent og avgifter i ${clubShortOf(club)}.`,
                          `Fees and charges in ${clubShortOf(club)}.`,
                        )
                  }
                  dueTotal={nok(dueSum, isEn)}
                  payments={payments.map((payment) => ({
                    club: payment.club,
                    paid: payment.paid,
                    title: `${showAll ? `${clubShortOf(payment.club)} · ` : ""}${payment.title[lang]}`,
                    date: payment.date[lang],
                    amount: nok(payment.amount, isEn),
                  }))}
                />

                <NoticesPanel
                  title={t("Varsler", "Notifications")}
                  notices={notices.map((notice) => ({
                    club: notice.club,
                    tone: notice.tone,
                    text: notice.text[lang],
                    when: `${showAll ? `${clubShortOf(notice.club)} · ` : ""}${notice.when[lang]}`,
                  }))}
                />
              </div>
            </div>
          </>
        )}

        {view === "messages" && (
          <MessagesView
            threads={visibleThreads}
            clubShortOf={clubShortOf}
            onOpenThread={handleOpenThread}
            onSendMessage={handleSendMessage}
            onAttach={handleAttach}
            onAttachToFolder={handleAttachToFolder}
            onAddFolder={handleAddFolder}
            onMoveFile={handleMoveFile}
            onRemoveFile={handleRemoveFile}
          />
        )}

        {view === "posts" && (
          <PostsView
            posts={posts.map((post) => ({
              club: post.club,
              clubName: clubShortOf(post.club),
              initials: clubShortOf(post.club).slice(0, 2).toUpperCase(),
              when: post.when[lang],
              title: post.title[lang],
              text: post.text[lang],
              likes: post.likes[lang],
              comments: post.comments[lang],
            }))}
          />
        )}
      </main>

      {bookPickerOpen && (
        <MemberBookPicker
          onClose={() => setBookPickerOpen(false)}
          onPick={(slug) => {
            setBookPickerOpen(false);
            onBook(slug);
          }}
        />
      )}
    </div>
  );
}
