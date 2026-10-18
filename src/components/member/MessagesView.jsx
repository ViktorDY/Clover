import { useEffect, useRef, useState } from "react";
import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";
import {
  AVATAR_TINTS,
  SUGGESTED_PEOPLE,
  clubShort,
  fillerNames,
  initialsOf,
  memberCard,
  tintIndex,
} from "../../lib/memberData";
import { CountChip, Modal, PhotoSlot } from "./ui";
import useEscape from "./useEscape";

/*
  Meldinger: the member's conversations. A searchable, filterable list
  (all / unread / groups / archived) with a "…" menu per row, and the open
  chat beside it — messages with attachments that can be filed into
  folders, a Files tab, and for groups a "Gruppeinfo" panel (photo, name,
  members, mute, archive, leave).

  Thread data lives in the page; this view only asks it to change.
*/

const fileIcon = (kind) => (kind === "img" ? "🖼" : "📄");

function formatSize(bytes) {
  return bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} kB`;
}

function stamp() {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return { no: `i dag ${time}`, en: `today ${time}` };
}

const unreadOf = (thread) => thread.msgs.filter((m) => !m.me && m.unread).length;

const tintStyle = (name) => ({ background: AVATAR_TINTS[tintIndex(name)] });

export default function MessagesView({
  threads,
  order,
  keep,
  chat,
  onOpenChat,
  filter,
  onFilter,
  onUpdateThread,
  onRemoveThread,
  onBump,
  me,
}) {
  const { t, lang } = useLang();
  const [listQuery, setListQuery] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [tab, setTab] = useState("chat");
  const [folderId, setFolderId] = useState("general");
  const [draft, setDraft] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const [hover, setHover] = useState("");
  const [rowMenu, setRowMenu] = useState(null);
  const [rowAsk, setRowAsk] = useState(null);
  const [info, setInfo] = useState(null);
  const [groupPhotos, setGroupPhotos] = useState({});
  const scrollRef = useRef(null);

  useEscape(() => setAttachOpen(false), attachOpen);

  const kept = threads.filter(keep).filter((th) => !th.blocked);
  const archived = kept.filter((th) => th.archived);
  const active = kept.filter((th) => !th.archived);

  const needle = listQuery.trim().toLowerCase();
  const matches = (th) => {
    if (!needle) return true;
    if (pick(th.name, lang).toLowerCase().includes(needle)) return true;
    return th.msgs.some((m) => {
      const text = pick(m.text, lang).toLowerCase();
      const file = m.file ? pick(m.file.name, lang).toLowerCase() : "";
      return text.includes(needle) || file.includes(needle);
    });
  };
  const byFilter = (th) => (filter === "unread" ? unreadOf(th) > 0 : filter === "groups" ? !!th.group : true);
  const rank = (th) => {
    const i = order.indexOf(th.id);
    return i === -1 ? order.length : i;
  };
  const visible = (filter === "archived" ? archived : active)
    .filter(matches)
    .filter(byFilter)
    .sort((a, b) => rank(a) - rank(b));

  const open = threads.find((th) => th.id === chat) || null;

  // Keep the transcript pinned to the newest message.
  const lastId = open && open.msgs.length ? open.msgs[open.msgs.length - 1].id : "";
  useEffect(() => {
    if (!open || tab !== "chat") return;
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [open, tab, lastId]);

  const openThread = (th) => {
    onUpdateThread(th.id, (copy) => {
      copy.msgs.forEach((m) => {
        if (!m.me) m.unread = false;
      });
      return copy;
    });
    onOpenChat(th.id);
    setTab("chat");
    setChatQuery("");
    setFolderId((th.folders[0] || {}).id || "general");
    setInfo(null);
  };

  const closeChat = () => {
    onOpenChat("");
    setChatQuery("");
    setInfo(null);
  };

  /* ---- Sending and files --------------------------------------------- */

  const send = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !open) return;
    onUpdateThread(open.id, (th) => {
      th.msgs.push({ id: `n${Date.now()}`, from: { no: "Du", en: "You" }, me: true, when: stamp(), text });
      return th;
    });
    onBump(open.id);
    setDraft("");
  };

  const attach = (fileList, kind) => {
    const files = Array.from(fileList || []);
    if (!files.length || !open) return;
    const when = stamp();
    onUpdateThread(open.id, (th) => {
      const target = th.folders[0];
      files.forEach((file, i) => {
        const resolved = file.type && file.type.startsWith("image") ? "img" : kind;
        const size = formatSize(file.size);
        th.msgs.push({ id: `a${Date.now()}${i}`, from: { no: "Du", en: "You" }, me: true, when, file: { name: file.name, kind: resolved, size } });
        if (target) target.files.push({ id: `af${Date.now()}${i}`, name: file.name, kind: resolved, meta: { no: `${size} · Du`, en: `${size} · You` } });
      });
      return th;
    });
    onBump(open.id);
  };

  const uploadToFolder = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length || !open) return;
    onUpdateThread(open.id, (th) => {
      const folder = th.folders.find((f) => f.id === folderId) || th.folders[0];
      if (!folder) return th;
      files.forEach((file, i) => {
        const size = formatSize(file.size);
        folder.files.push({
          id: `uf${Date.now()}${i}`,
          name: file.name,
          kind: file.type && file.type.startsWith("image") ? "img" : "doc",
          meta: { no: `${size} · Du`, en: `${size} · You` },
        });
      });
      return th;
    });
  };

  // File a chat attachment into a folder (moving it if it is already filed).
  const fileInto = (message, to) => {
    if (!to || !open) return;
    const name = pick(message.file.name, "no");
    onUpdateThread(open.id, (th) => {
      const dest = th.folders.find((f) => f.id === to);
      if (!dest) return th;
      let item = null;
      th.folders.forEach((f) => {
        const hit = f.files.find((x) => pick(x.name, "no") === name);
        if (hit && !item) {
          item = hit;
          f.files = f.files.filter((x) => x !== hit);
        }
      });
      dest.files.push(
        item || {
          id: `cf${Date.now()}`,
          name: message.file.name,
          kind: message.file.kind,
          meta: { no: `${message.file.size} · ${pick(message.from, "no")}`, en: `${message.file.size} · ${pick(message.from, "en")}` },
        },
      );
      return th;
    });
  };

  /* ---- Row menu actions ---------------------------------------------- */

  const menuThread = rowMenu ? threads.find((th) => th.id === rowMenu.id) : null;
  const askThread = rowAsk ? threads.find((th) => th.id === rowAsk.id) : null;

  const confirmAsk = () => {
    if (!askThread) return;
    const id = askThread.id;
    if (rowAsk.kind === "block") {
      onUpdateThread(id, (th) => {
        th.blocked = true;
        return th;
      });
    } else {
      onRemoveThread(id);
    }
    if (chat === id) closeChat();
    setRowAsk(null);
    setRowMenu(null);
  };

  const askText = askThread
    ? {
        block: {
          title: t(`Blokker ${pick(askThread.name, "no")}?`, `Block ${pick(askThread.name, "en")}?`),
          text: t("Du får ikke lenger meldinger eller varsler fra denne samtalen, og den forsvinner fra listen din.", "You will no longer get messages or notifications from this chat, and it disappears from your list."),
          yes: t("Blokker", "Block"),
        },
        delete: {
          title: t("Slette samtalen?", "Delete this chat?"),
          text: t("Samtalen og filene forsvinner fra listen din. De andre medlemmene beholder sin kopi.", "The chat and its files disappear from your list. The other members keep their copy."),
          yes: t("Slett samtale", "Delete chat"),
        },
        leave: {
          title: t("Forlate gruppen?", "Leave this group?"),
          text: t("Du får ikke lenger meldinger fra gruppen, og du kommer bare tilbake hvis noen legger deg til igjen.", "You will no longer get messages from this group, and you can only rejoin if someone adds you again."),
          yes: t("Forlat gruppe", "Leave group"),
        },
      }[rowAsk.kind]
    : null;

  /* ---- Rendering -------------------------------------------------------- */

  const filters = [
    { id: "all", label: t("Alle", "All"), n: active.length },
    { id: "unread", label: t("Uleste", "Unread"), n: active.filter((th) => unreadOf(th) > 0).length },
    { id: "groups", label: t("Grupper", "Groups"), n: active.filter((th) => th.group).length },
    ...(archived.length ? [{ id: "archived", label: t("Arkivert", "Archived"), n: archived.length }] : []),
  ];

  const chatNeedle = chatQuery.trim().toLowerCase();
  const messages = !open
    ? []
    : chatNeedle
      ? open.msgs.filter((m) => {
          const text = pick(m.text, lang).toLowerCase();
          const file = m.file ? pick(m.file.name, lang).toLowerCase() : "";
          return text.includes(chatNeedle) || file.includes(chatNeedle);
        })
      : open.msgs;
  const folders = open ? open.folders : [];
  const activeFolder = folders.find((f) => f.id === folderId) || folders[0] || null;

  const tabClass = (on) =>
    `cursor-pointer rounded-full px-4 py-2.5 font-heading text-[13px] font-extrabold transition-colors duration-300 ${
      on ? "border border-ink bg-ink text-paper" : "border border-ink/20 bg-transparent text-ink hover:bg-ink/6"
    }`;
  const fieldClass =
    "box-border w-full rounded-full border border-ink/18 bg-mute px-4.5 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-grass focus:bg-white";

  const muted = open && open.mute && open.mute !== "off";

  return (
    <div
      className={`mt-[26px] grid items-start gap-4 transition-[grid-template-columns] duration-500 ${
        open ? "min-[901px]:grid-cols-[minmax(0,340px)_minmax(0,1fr)]" : "grid-cols-[minmax(0,1fr)]"
      }`}
    >
      {/* Conversation list */}
      <div className="min-w-0 rounded-[30px] border border-ink/12 bg-white p-4 sm:p-5">
        <input
          type="search"
          value={listQuery}
          onChange={(e) => setListQuery(e.target.value)}
          placeholder={t("Søk i samtaler", "Search chats")}
          aria-label={t("Søk i samtaler", "Search chats")}
          className={fieldClass}
        />
        <div role="tablist" aria-label={t("Filtrer samtaler", "Filter chats")} className="mt-3 flex flex-wrap gap-2">
          {filters.map((f) => (
            <CountChip
              key={f.id}
              active={filter === f.id}
              onClick={() => onFilter(f.id)}
              label={f.label}
              count={f.n}
              highlight={f.id === "unread" && f.n > 0}
            />
          ))}
        </div>

        <div className="kz-scroll mt-3.5 grid h-[58vh] min-h-[340px] grid-cols-[minmax(0,1fr)] content-start gap-2 overflow-y-auto overflow-x-hidden pr-1">
          {visible.map((th) => {
            const unread = unreadOf(th);
            const hot = unread > 0;
            const isOpen = chat === th.id;
            const name = pick(th.name, lang);
            const last = th.msgs[th.msgs.length - 1] || {};
            const preview = pick(last.text, lang) || (last.file ? pick(last.file.name, lang) : "");
            const dots = hover === th.id || (rowMenu && rowMenu.id === th.id);
            const ring = hot ? "#CDEFD3" : isOpen ? "#eaf7ed" : "#f7f9f5";
            let people = [];
            if (th.group) {
              th.msgs.filter((m) => !m.me).forEach((m) => {
                const n = pick(m.from, lang);
                if (n && !people.includes(n)) people.push(n);
              });
              people = people.slice(0, 2);
              while (people.length < 2) people.push(people.length === 0 ? name : me.name);
            }
            return (
              <div
                key={th.id}
                className="relative"
                onMouseEnter={() => setHover(th.id)}
                onMouseLeave={() => setHover((h) => (h === th.id ? "" : h))}
              >
                <button
                  type="button"
                  onClick={() => openThread(th)}
                  className={`box-border flex w-full cursor-pointer items-center gap-3 rounded-[22px] border-2 py-3.5 pl-3.5 text-left font-body text-ink transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:translate-x-[5px] hover:border-grass hover:shadow-[0_10px_26px_rgba(22,36,26,0.16)] ${
                    dots ? "pr-[58px]" : "pr-3.5"
                  } ${
                    isOpen
                      ? "border-grass-soft bg-grass-tint shadow-[0_0_0_3px_rgba(163,226,174,0.32)]"
                      : hot
                        ? "border-grass bg-[#CDEFD3]"
                        : "border-ink/10 bg-mute-2"
                  }`}
                >
                  <span className="inline-flex flex-none items-center">
                    {th.group ? (
                      people.map((p, k) => (
                        <span
                          key={`${p}-${k}`}
                          className={`box-border grid h-[34px] w-[34px] flex-none place-items-center rounded-full border-[2.5px] font-heading text-[11.5px] font-extrabold text-ink ${k === 1 ? "-ml-2" : ""}`}
                          style={{
                            borderColor: ring,
                            background: AVATAR_TINTS[k === 1 && tintIndex(people[1]) === tintIndex(people[0]) ? (tintIndex(people[0]) + 1) % AVATAR_TINTS.length : tintIndex(p)],
                          }}
                        >
                          {initialsOf(p)}
                        </span>
                      ))
                    ) : (
                      <span
                        className={`grid h-10 w-10 flex-none place-items-center rounded-full font-heading text-[13px] font-extrabold ${
                          hot || isOpen ? "bg-ink text-paper" : "bg-grass/28 text-ink"
                        }`}
                      >
                        {initialsOf(name)}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="min-w-0 flex-auto truncate font-heading text-[15px] font-extrabold">{name}</span>
                      {hot && (
                        <span className="grid h-[22px] min-w-[22px] flex-none place-items-center rounded-full bg-ink px-[7px] text-[11px] font-bold text-paper">
                          {unread}
                        </span>
                      )}
                    </span>
                    <span className="mt-[3px] flex min-w-0 items-baseline gap-2.5">
                      <span className={`min-w-0 flex-auto truncate text-[13px] ${hot ? "text-ink/74" : "text-ink/60"}`}>{preview}</span>
                      <span className={`ml-auto flex-none whitespace-nowrap text-[11px] ${hot ? "text-ink/80" : "text-ink/66"}`}>
                        {pick(last.when, lang)}
                      </span>
                    </span>
                  </span>
                </button>
                {dots && (
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-label={`${t("Flere valg: ", "More options: ")}${name}`}
                    title={`${t("Flere valg: ", "More options: ")}${name}`}
                    onClick={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      setRowMenu({ id: th.id, x: r.right, y: r.bottom, top: r.top });
                    }}
                    className="absolute right-3 top-1/2 z-[2] grid h-[34px] w-[34px] -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-ink/20 bg-white p-0 text-ink shadow-[0_4px_14px_rgba(22,36,26,0.14)] hover:border-grass hover:bg-grass-tint"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <circle cx="5" cy="12" r="1.9" />
                      <circle cx="12" cy="12" r="1.9" />
                      <circle cx="19" cy="12" r="1.9" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
          {visible.length === 0 && (
            <div className="p-4.5 text-sm text-ink/60">{t("Ingen samtaler matcher søket.", "No chats match your search.")}</div>
          )}
        </div>
      </div>

      {/* Open conversation */}
      {open && (
        <div className="min-h-[420px] min-w-0 rounded-[30px] border border-ink/12 bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={closeChat}
              aria-label={t("Tilbake", "Back")}
              className="grid h-[38px] w-[38px] flex-none cursor-pointer place-items-center rounded-full border border-ink/18 bg-white text-base text-ink transition-colors duration-300 hover:bg-grass-tint"
            >
              ←
            </button>
            <button
              type="button"
              disabled={!open.group}
              aria-label={t("Gruppeinfo", "Group info")}
              onClick={(e) => {
                const btn = e.currentTarget;
                const rect = btn.getBoundingClientRect();
                const nameEl = btn.querySelector("[data-chat-name]");
                const nameRight = nameEl ? nameEl.getBoundingClientRect().right + 30 : rect.right;
                setInfo({ anchor: { right: nameRight, top: rect.top - 6, left: rect.left, bottom: rect.bottom }, view: "" });
              }}
              className={`-mx-2 -my-1 min-w-[160px] flex-1 rounded-[14px] border-0 bg-transparent px-2 py-1 text-left font-body text-ink transition-colors duration-200 ${
                open.group ? "cursor-pointer hover:bg-ink/5" : "cursor-default"
              }`}
            >
              <span className="block font-heading text-[19px] font-extrabold">
                <span data-chat-name>{pick(open.name, lang)}</span>
                {open.group && (
                  <span aria-hidden="true" className="ml-2 font-semibold text-ink/45">
                    ›
                  </span>
                )}
              </span>
              <span className="block text-[13px] text-ink/60">
                {open.group ? `${open.members} ${t("medlemmer", "members")} · ${clubShort(open.club)}` : clubShort(open.club)}
                {muted ? t(" · Dempet", " · Muted") : ""}
                {open.archived ? t(" · Arkivert", " · Archived") : ""}
              </span>
            </button>
            <div className="flex gap-2">
              <button type="button" onClick={() => setTab("chat")} className={tabClass(tab === "chat")}>
                {t("Samtale", "Chat")}
              </button>
              <button type="button" onClick={() => setTab("files")} className={tabClass(tab === "files")}>
                {t("Filer", "Files")}
              </button>
            </div>
          </div>

          {tab === "chat" ? (
            <div>
              <input
                type="search"
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                placeholder={t("Søk i denne samtalen", "Search in this chat")}
                aria-label={t("Søk i denne samtalen", "Search in this chat")}
                className={`${fieldClass} mt-4`}
              />
              <div className="mt-2 min-h-[18px] text-[13px] text-ink/55">
                {chatNeedle
                  ? t(
                      `${messages.length} ${messages.length === 1 ? "melding matcher" : "meldinger matcher"} «${chatQuery.trim()}»`,
                      `${messages.length} ${messages.length === 1 ? "message matches" : "messages match"} "${chatQuery.trim()}"`,
                    )
                  : ""}
              </div>

              <div ref={scrollRef} className="kz-scroll mt-2.5 grid max-h-[420px] grid-cols-[minmax(0,1fr)] gap-3 overflow-y-auto overflow-x-hidden p-1">
                {messages.map((m) => {
                  const filedIn = m.file
                    ? folders.find((f, i) => i > 0 && f.files.some((x) => pick(x.name, "no") === pick(m.file.name, "no")))
                    : null;
                  const targets = m.file ? folders.filter((f, i) => i > 0 && f !== filedIn) : [];
                  return (
                    <div key={m.id} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[78%] rounded-3xl px-4.5 py-3.5 ${m.me ? "bg-ink text-paper" : "border border-ink/10 bg-mute text-ink"}`}>
                        <div className={`mb-1.5 font-heading text-[13px] font-extrabold ${m.me ? "text-paper/72" : "text-ink/60"}`}>
                          {m.me ? t("Du", "You") : pick(m.from, lang)}
                        </div>
                        {m.text && <div className="text-[15px] leading-[1.55]">{pick(m.text, lang)}</div>}
                        {m.file && (
                          <>
                            <div className={`mt-2.5 flex items-center gap-3 rounded-[18px] p-3 ${m.me ? "bg-paper/12" : "border border-ink/10 bg-white"}`}>
                              <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-xl bg-grass/30 text-[15px] text-ink">
                                {fileIcon(m.file.kind)}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold">{pick(m.file.name, lang)}</span>
                                <span className="block text-xs opacity-70">{m.file.size}</span>
                              </span>
                            </div>
                            {(filedIn || targets.length > 0) && (
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                {filedIn && (
                                  <span className="rounded-full border border-grass bg-[#CDEFD3] px-3 py-[5px] text-xs font-bold text-ink">
                                    {t("Mappe: ", "Folder: ")}
                                    {pick(filedIn.name, lang)}
                                  </span>
                                )}
                                {targets.length > 0 && (
                                  <select
                                    value=""
                                    onChange={(e) => fileInto(m, e.target.value)}
                                    aria-label={t("Legg filen i en mappe", "Put file in a folder")}
                                    className={`max-w-[180px] cursor-pointer rounded-full px-3 py-1.5 font-body text-xs ${
                                      m.me ? "border border-paper/40 bg-paper/12 text-paper" : "border border-ink/25 bg-white text-ink"
                                    }`}
                                  >
                                    <option value="">{filedIn ? t("Flytt til…", "Move to…") : t("Legg i mappe…", "Put in folder…")}</option>
                                    {targets.map((f) => (
                                      <option key={f.id} value={f.id}>
                                        {pick(f.name, lang)}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </div>
                            )}
                          </>
                        )}
                        <div className={`mt-2 text-[11px] ${m.me ? "text-paper/60" : "text-ink/50"}`}>{pick(m.when, lang)}</div>
                      </div>
                    </div>
                  );
                })}
                {messages.length === 0 && (
                  <div className="p-4 text-sm text-ink/60">
                    {chatNeedle
                      ? t("Ingen meldinger matcher søket.", "No messages match your search.")
                      : t("Ingen meldinger ennå. Si hei!", "No messages yet. Say hello!")}
                  </div>
                )}
              </div>

              <form onSubmit={send} className="mt-4 flex flex-wrap items-center gap-2">
                <span className="relative flex-none">
                  <button
                    type="button"
                    onClick={() => setAttachOpen((v) => !v)}
                    aria-label={t("Vedlegg", "Attachments")}
                    title={t("Vedlegg", "Attachments")}
                    aria-expanded={attachOpen}
                    className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full text-[22px] leading-none transition-all duration-300 ${
                      attachOpen ? "rotate-45 border border-ink bg-ink text-paper" : "border border-ink/18 bg-mute text-ink"
                    }`}
                  >
                    +
                  </button>
                  <span
                    className={`absolute bottom-[54px] left-0 z-[5] grid gap-1 rounded-[22px] border border-ink/12 bg-white p-2 shadow-[0_18px_40px_rgba(22,36,26,0.16)] transition-all duration-[250ms] ${
                      attachOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                    }`}
                  >
                    <label className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-2xl px-3.5 py-2.5 font-body text-sm transition-colors duration-200 hover:bg-grass-tint">
                      <span className="text-base">🖼</span>
                      {t("Legg til bilde", "Add photo")}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          setAttachOpen(false);
                          attach(e.target.files, "img");
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-2xl px-3.5 py-2.5 font-body text-sm transition-colors duration-200 hover:bg-grass-tint">
                      <span className="text-base">📄</span>
                      {t("Legg til dokument", "Add document")}
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          setAttachOpen(false);
                          attach(e.target.files, "doc");
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </span>
                </span>
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t("Skriv en melding", "Write a message")}
                  aria-label={t("Skriv en melding", "Write a message")}
                  className="min-w-0 flex-[1_1_180px] rounded-full border border-ink/18 bg-mute px-5 py-3.5 font-body text-[15px] text-ink outline-none transition-colors focus:border-grass focus:bg-white"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-full border-0 bg-grass px-6 py-3.5 font-heading text-sm font-extrabold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-grass-soft"
                >
                  {t("Send", "Send")}
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="mt-4.5 flex flex-wrap items-center gap-2">
                {folders.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFolderId(f.id)}
                    className={`cursor-pointer rounded-full px-4 py-[9px] font-heading text-[13px] font-extrabold transition-colors duration-300 ${
                      activeFolder && activeFolder.id === f.id ? "border border-grass bg-grass/32 text-ink" : "border border-ink/12 bg-mute-2 text-ink"
                    }`}
                  >
                    {pick(f.name, lang)} ({f.files.length})
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = newFolder.trim();
                  if (!name || !open) return;
                  const id = `fo${Date.now()}`;
                  onUpdateThread(open.id, (th) => {
                    th.folders.push({ id, name, files: [] });
                    return th;
                  });
                  setNewFolder("");
                  setFolderId(id);
                }}
                className="mt-3.5 flex flex-wrap gap-2"
              >
                <input
                  type="text"
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  placeholder={t("Navn på ny mappe", "New folder name")}
                  aria-label={t("Navn på ny mappe", "New folder name")}
                  className="min-w-0 flex-[1_1_200px] rounded-full border border-ink/18 bg-mute px-4.5 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-grass focus:bg-white"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-full border border-ink bg-transparent px-5 py-3 font-heading text-[13px] font-extrabold text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  {t("Opprett mappe", "Create folder")}
                </button>
              </form>

              <div className="mt-4.5 flex flex-wrap items-center gap-2.5">
                <span className="font-heading text-base font-extrabold">{activeFolder ? pick(activeFolder.name, lang) : ""}</span>
                <span className="text-[13px] text-ink/55">
                  {activeFolder
                    ? `${activeFolder.files.length} ${t(activeFolder.files.length === 1 ? "fil" : "filer", activeFolder.files.length === 1 ? "file" : "files")}`
                    : ""}
                </span>
                <span className="flex-1" />
                <label className="cursor-pointer rounded-full border border-ink/18 bg-mute px-4.5 py-[11px] font-heading text-[13px] font-extrabold transition-colors duration-300 hover:bg-grass-tint">
                  {t("Last opp hit", "Upload here")}
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      uploadToFolder(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>

              <div className="kz-scroll mt-3.5 grid max-h-[380px] grid-cols-[minmax(0,1fr)] gap-2.5 overflow-y-auto overflow-x-hidden">
                {(activeFolder ? activeFolder.files : []).map((file) => (
                  <div key={file.id} className="flex items-center gap-3.5 rounded-[22px] border border-ink/10 bg-mute px-4 py-3.5">
                    <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[14px] bg-grass/30 text-base">{fileIcon(file.kind)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold">{pick(file.name, lang)}</span>
                      <span className="mt-0.5 block text-[13px] text-ink/55">{pick(file.meta, lang)}</span>
                    </span>
                    {folders.length > 1 && (
                      <select
                        value=""
                        aria-label={t("Flytt til…", "Move to…")}
                        onChange={(e) => {
                          const to = e.target.value;
                          if (!to || !activeFolder) return;
                          onUpdateThread(open.id, (th) => {
                            const from = th.folders.find((f) => f.id === activeFolder.id);
                            const dest = th.folders.find((f) => f.id === to);
                            const item = from && from.files.find((x) => x.id === file.id);
                            if (!from || !dest || !item) return th;
                            from.files = from.files.filter((x) => x.id !== file.id);
                            dest.files.push(item);
                            return th;
                          });
                        }}
                        className="hidden max-w-[170px] flex-none cursor-pointer rounded-full border border-ink/16 bg-white px-3 py-[9px] font-body text-[13px] text-ink sm:block"
                      >
                        <option value="">{t("Flytt til…", "Move to…")}</option>
                        {folders
                          .filter((f) => !activeFolder || f.id !== activeFolder.id)
                          .map((f) => (
                            <option key={f.id} value={f.id}>
                              {pick(f.name, lang)}
                            </option>
                          ))}
                      </select>
                    )}
                    <button
                      type="button"
                      aria-label={t("Fjern", "Remove")}
                      onClick={() =>
                        activeFolder &&
                        onUpdateThread(open.id, (th) => {
                          const folder = th.folders.find((f) => f.id === activeFolder.id);
                          if (folder) folder.files = folder.files.filter((x) => x.id !== file.id);
                          return th;
                        })
                      }
                      className="grid h-[34px] w-[34px] flex-none cursor-pointer place-items-center rounded-full border border-ink/14 bg-white text-sm text-ink transition-colors duration-300 hover:bg-grass-tint"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {activeFolder && activeFolder.files.length === 0 && (
                  <div className="p-4 text-sm text-ink/60">{t("Denne mappen er tom.", "This folder is empty.")}</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {rowMenu && menuThread && (
        <RowMenu
          thread={menuThread}
          position={rowMenu}
          onClose={() => setRowMenu(null)}
          onRead={() => {
            onUpdateThread(menuThread.id, (th) => {
              th.msgs.forEach((m) => {
                if (!m.me) m.unread = false;
              });
              return th;
            });
            setRowMenu(null);
          }}
          onMute={() => {
            const isMuted = menuThread.mute && menuThread.mute !== "off";
            onUpdateThread(menuThread.id, (th) => {
              th.mute = isMuted ? "off" : "always";
              return th;
            });
            setRowMenu(null);
          }}
          onArchive={() => {
            onUpdateThread(menuThread.id, (th) => {
              th.archived = !th.archived;
              return th;
            });
            if (chat === menuThread.id) closeChat();
            setRowMenu(null);
          }}
          onAsk={(kind) => {
            setRowMenu(null);
            setRowAsk({ id: menuThread.id, kind });
          }}
        />
      )}

      {askText && (
        <Modal onClose={() => setRowAsk(null)} label={askText.title} role="alertdialog" z="z-[98]" scrim="bg-ink/60 backdrop-blur-[8px]" className="max-w-[400px]">
          <div className="box-border rounded-[28px] bg-white p-6.5 text-center shadow-[0_36px_90px_rgba(22,36,26,0.4)]">
            <h2 className="mb-2 mt-0 font-heading text-[21px] font-extrabold">{askText.title}</h2>
            <p className="m-0 text-[14.5px] leading-[1.5] text-ink/70">{askText.text}</p>
            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={confirmAsk}
                className="cursor-pointer rounded-full border-0 bg-[#c92a14] px-5 py-[13px] font-heading text-[15px] font-extrabold text-white hover:bg-[#a8200e]"
              >
                {askText.yes}
              </button>
              <button
                type="button"
                onClick={() => setRowAsk(null)}
                className="cursor-pointer rounded-full border border-ink/20 bg-white px-5 py-[13px] font-heading text-[15px] font-extrabold text-ink hover:bg-ink/6"
              >
                {t("Avbryt", "Cancel")}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {info && open && open.group && (
        <GroupInfo
          thread={open}
          anchor={info.anchor}
          view={info.view}
          onView={(view) => setInfo((prev) => ({ ...prev, view }))}
          onClose={() => setInfo(null)}
          me={me}
          photo={groupPhotos[open.id]}
          onPhoto={(url) => setGroupPhotos((prev) => ({ ...prev, [open.id]: url }))}
          onUpdate={(fn) => onUpdateThread(open.id, fn)}
          onRemove={() => {
            onRemoveThread(open.id);
            closeChat();
          }}
          onArchived={(wasArchived) => {
            closeChat();
            onFilter(wasArchived ? "all" : "archived");
          }}
        />
      )}
    </div>
  );
}

/* The "…" menu on a conversation row. */
function RowMenu({ thread, position, onClose, onRead, onMute, onArchive, onAsk }) {
  const { t } = useLang();
  useEscape(onClose);
  const unread = unreadOf(thread);
  const muted = thread.mute && thread.mute !== "off";
  const width = 236;
  const left = Math.max(8, Math.min(window.innerWidth - width - 8, position.x - width));
  const below = position.y + 290 <= window.innerHeight;
  const style = below ? { left, top: position.y + 6 } : { left, bottom: Math.max(8, window.innerHeight - position.top + 6) };

  const items = [
    { key: "read", label: t("Merk som lest", "Mark as read"), run: onRead, disabled: unread === 0 },
    { key: "mute", label: muted ? t("Slå på varsler", "Unmute notifications") : t("Demp varsler", "Mute notifications"), run: onMute },
    { key: "block", label: t("Blokker", "Block"), run: () => onAsk("block"), danger: true },
    { key: "archive", label: thread.archived ? t("Fjern fra arkiv", "Unarchive chat") : t("Arkiver samtale", "Archive chat"), run: onArchive },
    { key: "delete", label: t("Slett samtale", "Delete chat"), run: () => onAsk("delete"), danger: true },
    ...(thread.group ? [{ key: "leave", label: t("Forlat samtale", "Leave chat"), run: () => onAsk("leave"), danger: true }] : []),
  ];

  return (
    <>
      <div className="fixed inset-0 z-[94]" onClick={onClose} />
      <div
        role="menu"
        aria-label={t("Samtalevalg", "Chat options")}
        className="fixed z-[95] box-border w-[236px] rounded-[18px] border border-ink/12 bg-white p-2 shadow-[0_22px_60px_rgba(22,36,26,0.24)]"
        style={style}
      >
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            role="menuitem"
            disabled={it.disabled}
            onClick={it.run}
            className={`box-border block w-full rounded-xl border-0 bg-transparent px-3.5 py-[11px] text-left font-body text-[14.5px] font-semibold transition-colors duration-150 ${
              it.danger ? "text-[#c92a14] hover:bg-[rgba(201,42,20,0.08)]" : "text-ink hover:bg-grass-tint"
            } ${it.disabled ? "cursor-default opacity-40 hover:bg-transparent" : "cursor-pointer"}`}
          >
            {it.label}
          </button>
        ))}
      </div>
    </>
  );
}

/*
  Gruppeinfo: a popover beside the group's name with the group's photo,
  name, member list (each with a contact card), people to add, mute
  options, and delete / archive / leave.
*/
function GroupInfo({ thread, anchor, view, onView, onClose, me, photo, onPhoto, onUpdate, onRemove, onArchived }) {
  const { t, lang } = useLang();
  const [member, setMember] = useState("");
  const [query, setQuery] = useState("");
  const [name, setName] = useState(pick(thread.name, lang));
  const [saved, setSaved] = useState(false);
  const [newPerson, setNewPerson] = useState("");

  useEscape(() => {
    if (view === "member") onView("members");
    else if (view) onView("");
    else onClose();
  });

  const meLabel = t("Du", "You");
  const seen = [];
  thread.msgs
    .filter((m) => !m.me)
    .forEach((m) => {
      const n = pick(m.from, lang);
      if (n && !seen.includes(n) && !(thread.removed || []).includes(n)) seen.push(n);
    });
  const people = [meLabel, ...seen, ...(thread.extraMembers || []).filter((n) => !seen.includes(n))];
  const total = Math.max(people.length, thread.members || people.length);
  const roster = [...people, ...fillerNames(total - people.length, [...people, ...(thread.removed || [])])];
  const shownRoster = query.trim() ? roster.filter((n) => n.toLowerCase().includes(query.trim().toLowerCase())) : roster;
  const suggestions = SUGGESTED_PEOPLE.filter((n) => !people.includes(n) && !seen.some((x) => x.startsWith(n.split(" ")[0]))).slice(0, 4);
  const muteNow = thread.mute || "off";
  const muteLabels = {
    off: t("Av", "Off"),
    "1h": t("1 time", "1 hour"),
    "8h": t("8 timer", "8 hours"),
    "1w": t("1 uke", "1 week"),
    always: t("Alltid", "Always"),
  };

  const add = (n) =>
    onUpdate((th) => {
      th.extraMembers = [...(th.extraMembers || []), n];
      th.removed = (th.removed || []).filter((x) => x !== n);
      th.members = (th.members || 2) + 1;
      return th;
    });

  const card = (n) => memberCard(n, { isMe: n === meLabel, lang, myEmail: me.email, myPhone: me.phone });
  const initials = (n) => (n === meLabel ? initialsOf(me.name) : initialsOf(n));

  // Beside the name when there is room, otherwise underneath it.
  const availRight = window.innerWidth - 8 - anchor.right;
  const roomRight = availRight >= 240;
  const width = roomRight ? Math.min(400, availRight) : Math.min(400, window.innerWidth - 16);
  const left = roomRight ? anchor.right : Math.max(8, Math.min(anchor.left, window.innerWidth - width - 8));
  const top = roomRight ? Math.max(8, anchor.top) : Math.max(8, anchor.bottom + 10);

  const titles = {
    photo: t("Gruppebilde", "Group photo"),
    member,
    name: t("Gruppenavn", "Group name"),
    members: t("Medlemmer", "Members"),
    add: t("Legg til personer", "Add people"),
    mute: t("Demp varsler", "Mute notifications"),
    delete: t("Slett samtale", "Delete chat"),
    archive: thread.archived ? t("Fjern fra arkiv", "Unarchive chat") : t("Arkiver samtale", "Archive chat"),
    leave: t("Forlat gruppe", "Leave group"),
  };

  const menu = [
    { id: "photo", label: titles.photo },
    { id: "name", label: titles.name },
    { id: "members", label: titles.members },
    { id: "add", label: titles.add },
    { id: "mute", label: titles.mute, divider: true },
    { id: "delete", label: titles.delete, danger: true },
    { id: "archive", label: titles.archive },
    { id: "leave", label: titles.leave, danger: true },
  ];

  const small = "box-border w-full min-w-0 flex-1 rounded-[14px] border border-ink/18 bg-mute px-4 py-3 font-body text-[15px] text-ink outline-none focus:border-grass focus:bg-white";
  const dangerBtn = "w-full cursor-pointer rounded-full border-0 bg-[#c92a14] px-5 py-3.5 font-heading text-[15px] font-extrabold text-white hover:bg-[#a8200e]";
  const p = member ? card(member) : null;

  return (
    <div className="fixed inset-0 z-[96]" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="false"
        aria-label={t("Gruppeinfo", "Group info")}
        onClick={(e) => e.stopPropagation()}
        className={`kz-scroll fixed z-[97] box-border overflow-y-auto rounded-3xl border border-ink/12 bg-white shadow-[0_24px_64px_rgba(22,36,26,0.24)] ${view ? "p-4.5" : "p-2"}`}
        style={{ left, top, width, maxHeight: Math.max(240, window.innerHeight - top - 16) }}
      >
        {view && (
          <div className="mb-4 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onView(view === "member" ? "members" : "")}
              aria-label={t("Tilbake", "Back")}
              className="h-[34px] w-[34px] flex-none cursor-pointer rounded-full border border-ink/18 bg-white text-[15px] text-ink hover:bg-grass-tint"
            >
              ←
            </button>
            <h2 className="m-0 min-w-0 flex-1 font-heading text-[21px] font-extrabold">{titles[view]}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("Lukk", "Close")}
              className="h-[34px] w-[34px] flex-none cursor-pointer rounded-full border border-ink/18 bg-white text-base text-ink"
            >
              ×
            </button>
          </div>
        )}

        {!view && (
          <div className="grid gap-0.5">
            {menu.map((r) => (
              <div key={r.id}>
                {r.divider && <div role="separator" className="mx-1.5 mb-2 mt-1.5 h-px bg-ink/16" />}
                <button
                  type="button"
                  onClick={() => {
                    setSaved(false);
                    onView(r.id);
                  }}
                  className={`box-border block w-full cursor-pointer rounded-[10px] border-0 bg-transparent px-2.5 py-[11px] text-left font-heading text-[15px] font-extrabold transition-all duration-150 hover:pl-[18px] ${
                    r.danger ? "text-[#c92a14] hover:bg-[rgba(201,42,20,0.12)]" : "text-ink hover:bg-[#dcf0d9]"
                  }`}
                >
                  {r.label}
                </button>
              </div>
            ))}
          </div>
        )}

        {view === "name" && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const v = name.trim();
                if (!v || v === pick(thread.name, lang)) return;
                onUpdate((th) => {
                  th.name = v;
                  return th;
                });
                setSaved(true);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSaved(false);
                }}
                aria-label={t("Gruppenavn", "Group name")}
                className={small}
              />
              <button
                type="submit"
                disabled={!name.trim() || name.trim() === pick(thread.name, lang)}
                className="cursor-pointer rounded-full border-0 bg-moss px-5 font-heading text-sm font-extrabold text-white disabled:cursor-default disabled:opacity-40"
              >
                {t("Lagre", "Save")}
              </button>
            </form>
            {saved && <div className="mt-2 text-[13px] text-moss">{t("Navnet er lagret.", "Name saved.")}</div>}
          </>
        )}

        {view === "members" && (
          <>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Søk i medlemmer", "Search members")}
              aria-label={t("Søk i medlemmer", "Search members")}
              className={`${small} mb-2.5`}
            />
            <div className="mb-2 text-[12.5px] text-ink/60">
              {t(`Viser ${shownRoster.length} av ${roster.length} medlemmer`, `Showing ${shownRoster.length} of ${roster.length} members`)}
            </div>
            <div className="kz-scroll grid max-h-[360px] gap-1.5 overflow-y-auto pr-1">
              {shownRoster.map((n, i) => (
                <div key={`${n}-${i}`} className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMember(n);
                      onView("member");
                    }}
                    aria-label={`${t("Åpne profil: ", "Open profile: ")}${n}`}
                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-[14px] border-0 bg-mute px-2.5 py-2 text-left font-body text-ink transition-colors hover:bg-grass-tint"
                  >
                    <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full font-heading text-[11.5px] font-extrabold text-ink" style={tintStyle(n)}>
                      {initials(n)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14.5px] font-semibold">{n}</span>
                      <span className="block text-xs text-ink/60">{card(n).role}</span>
                    </span>
                    <span aria-hidden="true" className="text-lg opacity-40">
                      ›
                    </span>
                  </button>
                  {n !== meLabel && (
                    <button
                      type="button"
                      aria-label={`${t("Fjern ", "Remove ")}${n}`}
                      onClick={() =>
                        onUpdate((th) => {
                          th.extraMembers = (th.extraMembers || []).filter((x) => x !== n);
                          th.removed = [...(th.removed || []), n];
                          th.members = Math.max(1, (th.members || 2) - 1);
                          return th;
                        })
                      }
                      className="h-[30px] w-[30px] flex-none cursor-pointer rounded-full border border-ink/18 bg-white text-sm text-ink hover:bg-[rgba(236,48,19,0.08)]"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {shownRoster.length === 0 && <div className="p-3.5 text-sm text-ink/60">{t("Ingen medlemmer matcher.", "No members match.")}</div>}
            </div>
          </>
        )}

        {view === "member" && p && (
          <>
            <div className="mb-4 flex items-center gap-3.5">
              <span className="grid h-16 w-16 flex-none place-items-center rounded-full font-heading text-[21px] font-extrabold text-ink" style={tintStyle(member)}>
                {initials(member)}
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-xl font-extrabold">{member}</span>
                <span className="mt-0.5 block text-[13.5px] text-ink/62">{p.role}</span>
              </span>
            </div>
            <div className="grid gap-2">
              {[
                { label: t("E-post", "Email"), value: p.minor ? t("Via foresatt", "Via guardian") : p.email, href: p.minor ? "" : `mailto:${p.email}` },
                { label: t("Telefon", "Phone"), value: p.minor ? t("Via foresatt", "Via guardian") : p.phone, href: p.minor ? "" : `tel:${p.phone.replace(/\s/g, "")}` },
                { label: t("Fødselsdato", "Birthday"), value: p.birthday },
                { label: t("Rolle", "Role"), value: p.role },
                { label: t("Klubb", "Club"), value: clubShort(thread.club) },
                { label: t("Medlem siden", "Member since"), value: String(p.since) },
              ].map((f) => (
                <div key={f.label} className="rounded-[14px] bg-mute px-4 py-3">
                  <div className="text-[11.5px] font-bold uppercase tracking-[0.09em] text-ink/55">{f.label}</div>
                  {f.href ? (
                    <a href={f.href} className="mt-[3px] block text-[15.5px] font-semibold text-moss no-underline [overflow-wrap:anywhere]">
                      {f.value}
                    </a>
                  ) : (
                    <div className="mt-[3px] text-[15.5px] font-semibold [overflow-wrap:anywhere]">{f.value}</div>
                  )}
                </div>
              ))}
            </div>
            {p.minor && (
              <p className="mb-0 mt-3.5 text-[13px] leading-[1.5] text-ink/60">
                {t("Dette medlemmet er under 16 år, så kontakt skjer via foresatt.", "This member is under 16, so contact details go through a guardian.")}
              </p>
            )}
          </>
        )}

        {view === "photo" && (
          <div className="grid justify-items-center gap-4">
            <PhotoSlot
              src={photo}
              onPick={onPhoto}
              round
              hint={t("Legg til gruppebilde", "Add a group photo")}
              className="h-44 w-44 rounded-full bg-[#E3F3DF] shadow-[0_10px_30px_rgba(22,36,26,0.12)]"
            />
            <p className="m-0 max-w-[26em] text-center text-sm leading-[1.5] text-ink/68">
              {t(
                "Slipp et bilde i sirkelen, eller trykk på den for å velge ett. Alle i gruppen ser det nye bildet.",
                "Drop a photo into the circle, or click it to choose one. Everyone in the group sees the new photo.",
              )}
            </p>
          </div>
        )}

        {view === "add" && (
          <>
            {suggestions.length > 0 && (
              <>
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-ink/70">{t("Foreslåtte", "Suggested")}</div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {suggestions.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => add(n)}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/18 bg-white py-2 pl-2.5 pr-3.5 font-body text-sm text-ink hover:border-grass hover:bg-grass-tint"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full font-heading text-[10px] font-extrabold" style={tintStyle(n)}>
                        {initialsOf(n)}
                      </span>
                      {n}
                      <span aria-hidden="true" className="font-extrabold text-moss">
                        +
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const v = newPerson.trim();
                if (!v || people.includes(v)) return;
                add(v);
                setNewPerson("");
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={newPerson}
                onChange={(e) => setNewPerson(e.target.value)}
                placeholder={t("Skriv et navn …", "Type a name…")}
                aria-label={t("Legg til personer", "Add people")}
                className={small}
              />
              <button type="submit" className="cursor-pointer rounded-full border border-ink/20 bg-white px-5 font-heading text-sm font-extrabold text-ink hover:bg-grass-tint">
                {t("Legg til", "Add")}
              </button>
            </form>
          </>
        )}

        {view === "mute" && (
          <>
            <p className="mb-4.5 mt-0 text-[14.5px] leading-[1.55] text-ink/72">
              {t(
                "Du får fortsatt meldingene, men denne samtalen sender deg ingen varsler mens den er dempet.",
                "You will still get the messages, but this chat will not send you notifications while it is muted.",
              )}
            </p>
            <div role="radiogroup" aria-label={t("Demp varsler", "Mute notifications")} className="grid gap-2">
              {["off", "1h", "8h", "1w", "always"].map((id) => {
                const on = muteNow === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() =>
                      onUpdate((th) => {
                        th.mute = id;
                        return th;
                      })
                    }
                    className={`box-border flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3.5 font-body text-ink ${
                      on ? "border border-grass bg-grass-tint" : "border border-ink/12 bg-white"
                    }`}
                  >
                    <span className="flex-1 text-left font-heading text-[15px] font-extrabold">{muteLabels[id]}</span>
                    <span
                      aria-hidden="true"
                      className={`box-border h-5 w-5 rounded-full border-2 ${
                        on ? "border-moss bg-[radial-gradient(circle,#1f7a3a_45%,transparent_50%)]" : "border-ink/30 bg-white"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </>
        )}

        {view === "delete" && (
          <>
            <p className="mb-4.5 mt-0 text-[14.5px] leading-[1.55] text-ink/72">
              {t("Samtalen og filene forsvinner fra listen din. De andre medlemmene beholder sin kopi.", "The chat and its files disappear from your list. The other members keep their copy.")}
            </p>
            <button type="button" onClick={onRemove} className={dangerBtn}>
              {t("Slett samtale", "Delete chat")}
            </button>
          </>
        )}

        {view === "archive" && (
          <>
            <p className="mb-4.5 mt-0 text-[14.5px] leading-[1.55] text-ink/72">
              {thread.archived
                ? t("Flytt samtalen tilbake til hovedlisten din.", "Move this chat back to your main list.")
                : t("Samtalen flyttes ut av hovedlisten og inn under Arkivert. Nye meldinger henter den ikke tilbake.", "The chat moves out of your main list into Archived. New messages will not bring it back.")}
            </p>
            <button
              type="button"
              onClick={() => {
                const was = !!thread.archived;
                onUpdate((th) => {
                  th.archived = !was;
                  return th;
                });
                onArchived(was);
              }}
              className="w-full cursor-pointer rounded-full border-0 bg-moss px-5 py-3.5 font-heading text-[15px] font-extrabold text-white hover:bg-ink"
            >
              {titles.archive}
            </button>
          </>
        )}

        {view === "leave" && (
          <>
            <p className="mb-4.5 mt-0 text-[14.5px] leading-[1.55] text-ink/72">
              {t("Du får ikke lenger meldinger fra gruppen, og du kommer bare tilbake hvis noen legger deg til igjen.", "You will no longer get messages from this group, and you can only rejoin if someone adds you again.")}
            </p>
            <button type="button" onClick={onRemove} className={dangerBtn}>
              {t("Ja, forlat gruppen", "Yes, leave group")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
