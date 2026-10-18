import { useMemo, useState } from "react";
import MemberSidebar from "../components/member/MemberSidebar";
import ClubMenu from "../components/member/ClubMenu";
import HomeView from "../components/member/HomeView";
import ActivityModal from "../components/member/ActivityModal";
import { LeaderModal, PayInfoModal } from "../components/member/ContactModals";
import VolunteerView from "../components/member/VolunteerView";
import MessagesView from "../components/member/MessagesView";
import NoticesView from "../components/member/NoticesView";
import PostsView, { PostFormModal, PostModal } from "../components/member/PostsView";
import WeekPlanDrawer from "../components/member/WeekPlanDrawer";
import ProfileView from "../components/member/ProfileView";
import JoinClub from "../components/member/JoinClub";
import MemberBookPicker from "../components/member/MemberBookPicker";
import useMemberProfile from "../components/member/useMemberProfile";
import { Avatar } from "../components/member/ui";
import { useLang } from "../lib/langContext";
import { readJoined } from "../lib/memberJoin";
import pick from "../lib/pick";
import {
  ACTIVITIES,
  BOARD_NOTICES,
  MEMBER_CLUBS,
  NOTICES,
  PAYMENTS,
  POSTS,
  POST_SEED_COMMENTS,
  activitySeedComments,
  bookingSlugFor,
  clubShort,
  groupsFor,
  initialsOf,
  leaderFor,
  nok,
  payContact,
  seedThreads,
} from "../lib/memberData";
import "../styles/member.css";

/*
  Medlem: the member dashboard.

  A sidebar (a top bar on small screens) leads to Messages, Posts, Volunteer
  days, Notifications, the Week plan sheet and Booking; the profile chip at
  the bottom opens My profile. The "Klubber" menu filters everything by
  club, and a pinned club becomes the start page next visit.

  Club content is demo data (lib/memberData) changed in React state; the
  member's own profile and account come from useMemberProfile, which talks
  to Supabase when a real account is signed in.
*/

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

function nowStamp() {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return { no: `i dag ${time}`, en: `today ${time}` };
}

// Initial conversation order: unread first, then as seeded.
function initialOrder() {
  return seedThreads()
    .map((th, i) => ({ id: th.id, unread: th.msgs.filter((m) => !m.me && m.unread).length, i }))
    .sort((a, b) => b.unread - a.unread || a.i - b.i)
    .map((entry) => entry.id);
}

export default function MemberPage({ onExit, onLogOut = onExit, onBook }) {
  const { t, lang, isEn } = useLang();
  const profile = useMemberProfile();

  const [pinned, setPinned] = useState(readPinnedClub);
  const [club, setClub] = useState(() => readPinnedClub() || "all");
  const [group, setGroup] = useState("all");
  const [view, setView] = useState("home");
  const [planOpen, setPlanOpen] = useState(false);
  const [planClub, setPlanClub] = useState("");
  const [joined, setJoined] = useState(readJoined);
  const [bookPicker, setBookPicker] = useState(false);

  // Home: calendar and activities.
  const [calOpen, setCalOpen] = useState(true);
  const [calMonth, setCalMonth] = useState(9);
  const [calPick, setCalPick] = useState("");
  const [openActivity, setOpenActivity] = useState("");
  const [rsvp, setRsvp] = useState({});
  const [activityComments, setActivityComments] = useState({});
  const [commentDraft, setCommentDraft] = useState("");
  const [feePaid, setFeePaid] = useState({});
  const [openPayment, setOpenPayment] = useState("");
  const [payDone, setPayDone] = useState({});
  const [contactOpen, setContactOpen] = useState(false);

  // Posts.
  const [myPosts, setMyPosts] = useState([]);
  const [openPost, setOpenPost] = useState("");
  const [postRead, setPostRead] = useState({});
  const [postReactions, setPostReactions] = useState({});
  const [postComments, setPostComments] = useState({});
  const [postDraft, setPostDraft] = useState("");
  const [postPhotos, setPostPhotos] = useState({});
  const [postForm, setPostForm] = useState(false);

  // Notifications.
  const [noticeGone, setNoticeGone] = useState([]);
  const [noticeRead, setNoticeRead] = useState([]);

  // Messages.
  const [threads, setThreads] = useState(seedThreads);
  const [order, setOrder] = useState(initialOrder);
  const [chat, setChat] = useState("");
  const [msgFilter, setMsgFilter] = useState("all");

  // Volunteer days.
  const [vlResults, setVlResults] = useState({});
  const [vlActive, setVlActive] = useState(null);

  /* ---- Filters ------------------------------------------------------------ */

  const showAll = club === "all";
  const keep = (item) => showAll || item.club === club;
  const myGroups = showAll ? [] : groupsFor(club);
  const groupAll = group === "all" || showAll || !myGroups.some((g) => g.id === group);

  const activities = ACTIVITIES.filter(keep).filter((a) => groupAll || a.group === group);
  const payments = PAYMENTS.filter(keep).map((p) =>
    payDone[p.id]
      ? {
          ...p,
          paid: true,
          date:
            payDone[p.id] === "card"
              ? { no: "Betalt i dag med kort", en: "Paid today by card" }
              : { no: "Betalt i dag med Vipps", en: "Paid today with Vipps" },
        }
      : p,
  );
  const unpaid = payments.filter((p) => !p.paid);
  const dugnad = activities.filter((a) => a.kind === "dugnad");
  const tourPays = activities.filter((a) => a.kind === "tournament" && a.fee && rsvp[a.id] === "in" && !feePaid[a.id]);
  const dueTotal = nok(
    unpaid.reduce((sum, p) => sum + p.amount, 0) + tourPays.reduce((sum, a) => sum + a.fee, 0),
    isEn,
  );

  const notices = NOTICES.filter(keep).filter((n) => !noticeGone.includes(n.id));
  const isNoticeUnread = (n) => !!n.unread && !noticeRead.includes(n.id);
  const unreadNotices = notices.filter(isNoticeUnread).length;
  const boardNotice = BOARD_NOTICES.filter(keep)[0] || null;

  const allPosts = [...myPosts, ...POSTS].filter(keep);
  const isPostRead = (p) => !!p.mine || !!postRead[p.id];

  const unreadMessages = threads
    .filter(keep)
    .filter((th) => !th.archived && !th.blocked)
    .reduce((n, th) => n + th.msgs.filter((m) => !m.me && m.unread).length, 0);

  const initials = initialsOf(profile.fullName);
  const avatar = <Avatar size={38} fontSize={14} photo={profile.local.photo} initials={initials} />;

  /* ---- Threads ------------------------------------------------------------ */

  const updateThread = (id, mutate) => {
    setThreads((prev) => prev.map((th) => (th.id === id ? mutate(structuredClone(th)) : th)));
  };
  const removeThread = (id) => {
    setThreads((prev) => prev.filter((th) => th.id !== id));
    setOrder((prev) => prev.filter((x) => x !== id));
  };
  const bumpThread = (id) => setOrder((prev) => [id, ...prev.filter((x) => x !== id)]);

  // Opening another chat drops a just-started direct chat nobody wrote in.
  const openChat = (id) => {
    setThreads((prev) => prev.filter((th) => !(th.draft && th.msgs.length === 0 && th.id !== id)));
    setChat(id);
  };

  const markThreadRead = (id) =>
    updateThread(id, (th) => {
      th.msgs.forEach((m) => {
        if (!m.me) m.unread = false;
      });
      return th;
    });

  /* ---- Navigation ----------------------------------------------------------- */

  const go = (next) => {
    setPlanOpen(false);
    if (next !== "messages") openChat("");
    setView((current) => (current === next && next !== "profile" ? "home" : next));
  };

  const goHome = () => {
    setPlanOpen(false);
    openChat("");
    setView("home");
    setOpenActivity("");
    setOpenPost("");
    window.scrollTo(0, 0);
  };

  const book = () => {
    if (showAll) setBookPicker(true);
    else onBook(bookingSlugFor(club));
  };

  const togglePin = (slug) => {
    const next = pinned === slug ? "" : slug;
    try {
      window.localStorage.setItem(PINNED_KEY, next);
    } catch {
      // Pinning is a convenience; failing to persist it is not an error.
    }
    setPinned(next);
  };

  const followNotice = (n) => {
    setNoticeRead((prev) => (prev.includes(n.id) ? prev : [...prev, n.id]));
    if (n.go === "plan") setPlanOpen(true);
    else if (n.go === "home") {
      setView("home");
      setPlanOpen(false);
    } else if (n.go === "msg") {
      markThreadRead(n.thread);
      setMsgFilter("all");
      openChat(n.thread);
      setView("messages");
      setPlanOpen(false);
    } else if (n.go === "event") {
      setView("home");
      setPlanOpen(false);
      const a = ACTIVITIES.find((x) => x.id === n.activity);
      if (a) {
        setCalMonth(a.m);
        setCalPick(`${a.m}-${a.day}`);
      }
      setCommentDraft("");
      setOpenActivity(n.activity);
    } else if (n.go === "book") {
      onBook("bordtennis");
    }
  };

  /* ---- Contact people -------------------------------------------------------- */

  const activeActivity = ACTIVITIES.find((a) => a.id === openActivity) || null;
  const activePayment = payments.find((p) => p.id === openPayment) || null;
  const contact = activeActivity
    ? leaderFor(activeActivity.leader, activeActivity.club)
    : activePayment
      ? payContact(activePayment)
      : null;

  const messageContact = () => {
    if (!contact) return;
    const id = contact.thread || `dm-${contact.key}`;
    const exists = threads.some((th) => th.id === id);
    if (exists) {
      markThreadRead(id);
    } else {
      setThreads((prev) => [
        {
          id,
          club: contact.club,
          name: contact.name,
          group: false,
          members: 2,
          msgs: [],
          draft: true,
          folders: [{ id: "general", name: { no: "Alle filer", en: "All files" }, files: [] }],
        },
        ...prev,
      ]);
    }
    setOrder((prev) => [id, ...prev.filter((x) => x !== id)]);
    setContactOpen(false);
    setOpenActivity("");
    setOpenPayment("");
    setMsgFilter("all");
    setChat(id);
    setPlanOpen(false);
    setView("messages");
  };

  /* ---- Header ------------------------------------------------------------------ */

  const titles = {
    messages: t("Meldinger", "Messages"),
    posts: t("Innlegg", "Posts"),
    notices: t("Varsler", "Notifications"),
    volunteer: t("Dugnad", "Volunteer days"),
    profile: t("Min profil", "My profile"),
  };
  const subline = unpaid.length
    ? t(
        `Du har ${unpaid.length} ${unpaid.length === 1 ? "ubetalt faktura" : "ubetalte fakturaer"} og ${dugnad.length} dugnadsvakter igjen.`,
        `You have ${unpaid.length} ${unpaid.length === 1 ? "unpaid invoice" : "unpaid invoices"} and ${dugnad.length} volunteer shifts left.`,
      )
    : t(`Alt er betalt — ${dugnad.length} dugnadsvakter står igjen.`, `Everything is paid — ${dugnad.length} volunteer shifts left.`);

  const activityComments0 = useMemo(
    () => (activeActivity ? activitySeedComments(leaderFor(activeActivity.leader, activeActivity.club).name) : []),
    [activeActivity],
  );

  const activePost = [...myPosts, ...POSTS].find((p) => p.id === openPost) || null;

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-white pl-[240px] kz-member font-body text-[15px] leading-[1.55] text-ink max-[900px]:pl-0">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-40 -top-[180px] -z-20 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.22),rgba(116,205,133,0)_70%)] blur-[44px]"
      />

      <MemberSidebar
        view={view}
        planOpen={planOpen}
        unread={unreadMessages}
        unreadNotices={unreadNotices}
        firstName={profile.firstName}
        avatar={avatar}
        onHome={goHome}
        onNavigate={go}
        onOpenPlan={() => setPlanOpen(true)}
        onBook={book}
      />

      <div className="relative">
        <div className="mx-auto max-w-[1160px] px-4 pb-1.5 pt-7 min-[1680px]:max-w-[1440px] sm:px-6">
          {view !== "home" && (
            <button
              type="button"
              onClick={goHome}
              className="mb-[22px] inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-ink/20 bg-white/86 py-[11px] pl-3.5 pr-5 font-heading text-sm font-extrabold text-ink transition-all duration-300 hover:-translate-x-[3px] hover:bg-white"
            >
              <span className="text-[17px]">←</span>
              {t("Tilbake til hjemmesiden", "Back to my home page")}
            </button>
          )}
          <div className="flex flex-wrap items-start justify-between gap-x-7 gap-y-4">
            <div className="min-w-0 flex-[1_1_340px]">
              {view === "home" ? (
                <>
                  <h1 className="m-0 font-heading text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.02]">
                    {t("Hei", "Hi")}, {profile.firstName}
                  </h1>
                  <p className="mb-0 mt-2.5 text-[17px] text-ink/72">{subline}</p>
                </>
              ) : (
                <h1 className="m-0 font-heading text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.04]">{titles[view]}</h1>
              )}
              {view !== "profile" && myGroups.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                    {t("Treningsgruppe", "Training group")}
                  </span>
                  {[{ id: "all", name: { no: "Alle grupper", en: "All groups" } }, ...myGroups].map((g) => {
                    const active = groupAll ? g.id === "all" : g.id === group;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGroup(g.id)}
                        className={`cursor-pointer whitespace-nowrap rounded-full px-[15px] py-2 font-heading text-[12.5px] font-extrabold text-ink transition-colors duration-300 ${
                          active ? "border border-grass bg-grass/32" : "border border-ink/14 bg-white"
                        }`}
                      >
                        {pick(g.name, lang)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <ClubMenu
              club={club}
              pinned={pinned}
              onPick={(slug) => {
                setClub(slug);
                setGroup("all");
              }}
              onTogglePin={togglePin}
            />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1160px] px-4 pb-[72px] pt-1.5 min-[1680px]:max-w-[1440px] sm:px-6">
        {view !== "profile" && (
          <div className="mt-2.5 text-[13px] text-ink/60">
            {pinned
              ? t(
                  `★ ${clubShort(pinned)} er festet — den åpnes automatisk neste gang du logger inn.`,
                  `★ ${clubShort(pinned)} is pinned — it opens automatically next time you log in.`,
                )
              : t(
                  "Åpne Klubber og trykk på stjernen for å feste en klubb som startside.",
                  "Open Clubs and tap the star to pin a club as your start page.",
                )}
          </div>
        )}

        {view === "home" && (
          <HomeView
            club={club}
            showAll={showAll}
            activities={activities}
            rsvp={rsvp}
            onOpenActivity={(id) => {
              setCommentDraft("");
              setOpenActivity(id);
            }}
            calOpen={calOpen}
            onToggleCalendar={() => setCalOpen((v) => !v)}
            calMonth={calMonth}
            onMonthChange={(m) => {
              setCalMonth(m);
              setCalPick("");
            }}
            calPick={calPick}
            onPickDay={setCalPick}
            boardNotice={boardNotice}
            dugnad={dugnad}
            payments={payments}
            tourPays={tourPays}
            dueTotal={dueTotal}
            onOpenPayment={setOpenPayment}
            onPayNow={() => {
              if (unpaid[0]) setOpenPayment(unpaid[0].id);
              else if (tourPays[0]) setOpenActivity(tourPays[0].id);
            }}
          />
        )}

        {view === "volunteer" && (
          <VolunteerView
            keep={keep}
            results={vlResults}
            active={vlActive}
            onCheckIn={(id) => setVlActive({ id, since: Date.now() })}
            onCheckOut={(id, hours) => {
              setVlResults((prev) => ({ ...prev, [id]: { st: "pending", h: hours } }));
              setVlActive(null);
            }}
          />
        )}

        {view === "messages" && (
          <MessagesView
            threads={threads}
            order={order}
            keep={keep}
            chat={chat}
            onOpenChat={openChat}
            filter={msgFilter}
            onFilter={setMsgFilter}
            onUpdateThread={updateThread}
            onRemoveThread={removeThread}
            onBump={bumpThread}
            me={{ name: profile.fullName, email: profile.email, phone: profile.phone }}
          />
        )}

        {view === "notices" && (
          <NoticesView
            notices={notices}
            showAll={showAll}
            isUnread={isNoticeUnread}
            onGo={followNotice}
            onDelete={(id) => setNoticeGone((prev) => [...prev, id])}
          />
        )}

        {view === "posts" && (
          <PostsView
            posts={allPosts}
            isRead={isPostRead}
            photos={postPhotos}
            onPhoto={(id, url) => setPostPhotos((prev) => ({ ...prev, [id]: url }))}
            reactions={postReactions}
            extraComments={postComments}
            onOpen={(id) => {
              setPostRead((prev) => ({ ...prev, [id]: true }));
              setPostDraft("");
              setOpenPost(id);
            }}
            onNewPost={() => setPostForm(true)}
          />
        )}

        {view === "profile" && (
          <ProfileView profile={profile} initials={initials} onLogOut={onLogOut} onDeleted={onExit} />
        )}
      </main>

      <WeekPlanDrawer
        open={planOpen}
        club={club}
        planClub={planClub}
        onPlanClub={setPlanClub}
        onClose={() => setPlanOpen(false)}
      />

      {activeActivity && (
        <ActivityModal
          activity={activeActivity}
          leader={leaderFor(activeActivity.leader, activeActivity.club)}
          rsvp={rsvp[activeActivity.id] || ""}
          onRsvp={(answer) => setRsvp((prev) => ({ ...prev, [activeActivity.id]: answer }))}
          feePaid={feePaid[activeActivity.id] || ""}
          onPayFee={(method) => setFeePaid((prev) => ({ ...prev, [activeActivity.id]: method }))}
          comments={[...activityComments0, ...(activityComments[activeActivity.id] || [])]}
          draft={commentDraft}
          onDraftChange={setCommentDraft}
          onSendComment={() => {
            const text = commentDraft.trim();
            if (!text) return;
            setActivityComments((prev) => ({
              ...prev,
              [activeActivity.id]: [...(prev[activeActivity.id] || []), { from: { no: "Du", en: "You" }, when: nowStamp(), text, me: true }],
            }));
            setCommentDraft("");
          }}
          onOpenLeader={() => setContactOpen(true)}
          onClose={() => {
            setOpenActivity("");
            setContactOpen(false);
          }}
        />
      )}

      {activePayment && !activeActivity && (
        <PayInfoModal
          payment={activePayment}
          onPay={(method) => setPayDone((prev) => ({ ...prev, [activePayment.id]: method }))}
          onOpenContact={() => setContactOpen(true)}
          onClose={() => {
            setOpenPayment("");
            setContactOpen(false);
          }}
        />
      )}

      {contactOpen && contact && (
        <LeaderModal person={contact} onMessage={messageContact} onClose={() => setContactOpen(false)} />
      )}

      {activePost && (
        <PostModal
          post={activePost}
          photo={postPhotos[activePost.id]}
          onPhoto={(url) => setPostPhotos((prev) => ({ ...prev, [activePost.id]: url }))}
          reaction={postReactions[activePost.id] || ""}
          onReact={(kind) => setPostReactions((prev) => ({ ...prev, [activePost.id]: prev[activePost.id] === kind ? "" : kind }))}
          comments={[...(activePost.mine ? [] : POST_SEED_COMMENTS), ...(postComments[activePost.id] || [])]}
          draft={postDraft}
          onDraftChange={setPostDraft}
          onSendComment={() => {
            const text = postDraft.trim();
            if (!text) return;
            setPostComments((prev) => ({
              ...prev,
              [activePost.id]: [...(prev[activePost.id] || []), { from: { no: "Du", en: "You" }, when: nowStamp(), text, me: true }],
            }));
            setPostDraft("");
          }}
          onClose={() => setOpenPost("")}
        />
      )}

      {postForm && (
        <PostFormModal
          defaultClub={showAll ? MEMBER_CLUBS[0].slug : club}
          onClose={() => setPostForm(false)}
          onPublish={({ club: postClub, title, text, photo }) => {
            setMyPosts((prev) => [
              {
                id: `mp${Date.now()}`,
                club: postClub,
                from: "member",
                priority: "normal",
                photo,
                mine: true,
                when: { no: "akkurat nå", en: "just now" },
                title,
                text,
                likes: 0,
                comments: 0,
              },
              ...prev,
            ]);
            setPostForm(false);
          }}
        />
      )}

      {bookPicker && (
        <MemberBookPicker
          onClose={() => setBookPicker(false)}
          onPick={(slug) => {
            setBookPicker(false);
            onBook(slug);
          }}
        />
      )}

      {!joined && <JoinClub firstName={profile.firstName} onBack={onExit} onJoined={() => setJoined(true)} />}
    </div>
  );
}
