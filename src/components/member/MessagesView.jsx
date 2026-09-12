import { useEffect, useRef, useState } from "react";
import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";

function initialsOf(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");
}

function fileIcon(kind) {
  return kind === "img" ? "🖼" : "📄";
}

export default function MessagesView({
  threads,
  clubShortOf,
  onOpenThread,
  onSendMessage,
  onAttach,
  onAttachToFolder,
  onAddFolder,
  onMoveFile,
  onRemoveFile,
}) {
  const { t, lang } = useLang();

  const [openId, setOpenId] = useState("");
  const [listQuery, setListQuery] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [tab, setTab] = useState("chat");
  const [folderId, setFolderId] = useState("");
  const [draft, setDraft] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const scrollRef = useRef(null);

  // Deriving the open thread from the list means a club filter that hides it
  // falls back to the list view on its own, and restores it on the way back.
  const open = threads.find((thread) => thread.id === openId) || null;

  // Keep the transcript pinned to the newest message.
  const lastMessageId = open && open.msgs.length ? open.msgs[open.msgs.length - 1].id : "";
  useEffect(() => {
    if (!open || tab !== "chat") return;
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [open, tab, lastMessageId]);

  const unreadOf = (thread) => thread.msgs.filter((m) => !m.me && m.unread).length;

  const needle = listQuery.trim().toLowerCase();
  const visible = threads.filter((thread) => {
    if (!needle) return true;
    if (pick(thread.name, lang).toLowerCase().includes(needle)) return true;
    return thread.msgs.some((m) => {
      const text = pick(m.text, lang).toLowerCase();
      const file = m.file ? pick(m.file.name, lang).toLowerCase() : "";
      return text.includes(needle) || file.includes(needle);
    });
  });

  const openThread = (thread) => {
    onOpenThread(thread.id);
    setOpenId(thread.id);
    setTab("chat");
    setChatQuery("");
    setFolderId((thread.folders[0] || {}).id || "general");
  };

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

  const tabClass = (active) =>
    `cursor-pointer rounded-full px-4 py-2.5 font-heading text-[13px] font-extrabold transition-colors duration-300 ${
      active ? "border border-ink bg-ink text-paper" : "border border-ink/20 bg-transparent text-ink"
    }`;

  const handleSend = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !open) return;
    onSendMessage(open.id, text);
    setDraft("");
  };

  return (
    <div
      className="mt-6 grid items-start gap-4 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
      style={{ gridTemplateColumns: "minmax(0, 1fr)" }}
    >
      <div className={open ? "grid gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]" : "grid"}>
        {/* Conversation list */}
        <div className="rounded-[30px] border border-ink/12 bg-white p-5">
          <input
            type="search"
            value={listQuery}
            onChange={(e) => setListQuery(e.target.value)}
            placeholder={t("Søk i samtaler", "Search chats")}
            aria-label={t("Søk i samtaler", "Search chats")}
            className="box-border w-full rounded-full border border-ink/18 bg-mute px-4.5 py-3 text-sm text-ink outline-none transition-colors focus:border-grass focus:bg-white"
          />

          <div className="kz-scroll mt-3.5 grid h-[58vh] min-h-[340px] grid-cols-[minmax(0,1fr)] gap-2 overflow-y-auto overflow-x-hidden pr-1">
            {visible.map((thread) => {
              const unread = unreadOf(thread);
              const hot = unread > 0;
              const active = openId === thread.id;
              const name = pick(thread.name, lang);
              const last = thread.msgs[thread.msgs.length - 1] || {};
              const preview = pick(last.text, lang) || (last.file ? pick(last.file.name, lang) : "");

              return (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => openThread(thread)}
                  className={`box-border flex w-full cursor-pointer items-center gap-3 rounded-[22px] p-3.5 text-left font-body transition-all duration-[350ms] ${
                    hot ? "bg-ink text-paper" : active ? "bg-grass-tint text-ink" : "bg-mute-2 text-ink"
                  } ${
                    active
                      ? "border-2 border-grass-soft shadow-[0_0_0_3px_rgba(163,226,174,0.32)]"
                      : hot
                        ? "border-2 border-ink"
                        : "border-2 border-ink/10"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-heading text-[13px] font-extrabold ${
                      hot
                        ? "bg-grass-soft/28 text-grass-soft"
                        : active
                          ? "bg-ink text-paper"
                          : "bg-grass/28 text-ink"
                    }`}
                  >
                    {initialsOf(name)}
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="min-w-0 flex-auto truncate font-heading text-[15px] font-extrabold">
                        {name}
                      </span>
                      {hot && (
                        <span className="grid h-[22px] min-w-[22px] shrink-0 place-items-center rounded-full bg-grass-soft px-1.5 text-[11px] font-bold text-ink">
                          {unread}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 flex min-w-0 items-baseline gap-2.5">
                      <span
                        className={`min-w-0 flex-auto truncate text-[13px] ${
                          hot ? "text-paper/75" : "text-ink/60"
                        }`}
                      >
                        {preview}
                      </span>
                      <span
                        className={`ml-auto shrink-0 whitespace-nowrap text-[11px] ${
                          hot ? "text-paper/60" : "text-ink/50"
                        }`}
                      >
                        {pick(last.when, lang)}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}

            {visible.length === 0 && (
              <div className="p-4.5 text-sm text-ink/60">
                {t("Ingen samtaler matcher søket.", "No chats match your search.")}
              </div>
            )}
          </div>
        </div>

        {/* Open conversation */}
        {open && (
          <div className="min-h-[420px] rounded-[30px] border border-ink/12 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpenId("");
                  setChatQuery("");
                }}
                aria-label={t("Tilbake", "Back")}
                className="grid h-[38px] w-[38px] shrink-0 cursor-pointer place-items-center rounded-full border border-ink/18 bg-white text-base text-ink transition-colors duration-300 hover:bg-grass-tint"
              >
                ←
              </button>
              <div className="min-w-[160px] flex-1">
                <div className="font-heading text-[19px] font-extrabold">
                  {pick(open.name, lang)}
                </div>
                <div className="text-[13px] text-ink/60">
                  {open.group
                    ? `${open.members} ${t("medlemmer", "members")} · ${clubShortOf(open.club)}`
                    : clubShortOf(open.club)}
                </div>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setTab("chat")} className={tabClass(tab === "chat")}>
                  {t("Samtale", "Chat")}
                </button>
                <button
                  type="button"
                  onClick={() => setTab("files")}
                  className={tabClass(tab === "files")}
                >
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
                  className="mt-4 box-border w-full rounded-full border border-ink/18 bg-mute px-4.5 py-3 text-sm text-ink outline-none transition-colors focus:border-grass focus:bg-white"
                />
                <div className="mt-2 min-h-[18px] text-[13px] text-ink/55">
                  {chatNeedle
                    ? t(
                        `${messages.length} ${messages.length === 1 ? "melding matcher" : "meldinger matcher"} «${chatQuery.trim()}»`,
                        `${messages.length} ${messages.length === 1 ? "message matches" : "messages match"} "${chatQuery.trim()}"`,
                      )
                    : ""}
                </div>

                <div
                  ref={scrollRef}
                  className="kz-scroll mt-2.5 grid max-h-[420px] grid-cols-[minmax(0,1fr)] gap-3 overflow-y-auto overflow-x-hidden p-1"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.me ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[78%] rounded-3xl px-4.5 py-3.5 ${
                          message.me
                            ? "bg-ink text-paper"
                            : "border border-ink/10 bg-mute text-ink"
                        }`}
                      >
                        <div
                          className={`mb-1.5 font-heading text-[13px] font-extrabold ${
                            message.me ? "text-paper/70" : "text-ink/60"
                          }`}
                        >
                          {pick(message.from, lang)}
                        </div>
                        {message.text && (
                          <div className="text-[15px] leading-[1.55]">
                            {pick(message.text, lang)}
                          </div>
                        )}
                        {message.file && (
                          <div
                            className={`mt-2.5 flex items-center gap-3 rounded-[18px] p-3 ${
                              message.me ? "bg-paper/12" : "border border-ink/10 bg-white"
                            }`}
                          >
                            <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-xl bg-grass/30 text-[15px] text-ink">
                              {fileIcon(message.file.kind)}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold">
                                {pick(message.file.name, lang)}
                              </span>
                              <span className="block text-xs opacity-70">{message.file.size}</span>
                            </span>
                          </div>
                        )}
                        <div
                          className={`mt-2 text-[11px] ${
                            message.me ? "text-paper/60" : "text-ink/50"
                          }`}
                        >
                          {pick(message.when, lang)}
                        </div>
                      </div>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div className="p-4 text-sm text-ink/60">
                      {t("Ingen meldinger matcher søket.", "No messages match your search.")}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSend} className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setAttachOpen((prev) => !prev)}
                      aria-label={t("Vedlegg", "Attachments")}
                      aria-expanded={attachOpen}
                      className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full text-[22px] leading-none transition-all duration-300 ${
                        attachOpen
                          ? "rotate-45 border border-ink bg-ink text-paper"
                          : "border border-ink/18 bg-mute text-ink"
                      }`}
                    >
                      +
                    </button>
                    <span
                      className={`absolute bottom-[54px] left-0 z-[5] grid gap-1 rounded-[22px] border border-ink/12 bg-white p-2 shadow-[0_18px_40px_rgba(22,36,26,0.16)] transition-all duration-[250ms] ${
                        attachOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-2 opacity-0"
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
                            onAttach(open.id, e.target.files, "img");
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
                            onAttach(open.id, e.target.files, "doc");
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
                    className="min-w-0 flex-[1_1_180px] rounded-full border border-ink/18 bg-mute px-5 py-3.5 text-[15px] text-ink outline-none transition-colors focus:border-grass focus:bg-white"
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
                  {folders.map((folder) => (
                    <button
                      key={folder.id}
                      type="button"
                      onClick={() => setFolderId(folder.id)}
                      className={`cursor-pointer rounded-full px-4 py-2.5 font-heading text-[13px] font-extrabold transition-colors duration-300 ${
                        activeFolder && activeFolder.id === folder.id
                          ? "border border-grass bg-grass/32 text-ink"
                          : "border border-ink/12 bg-mute-2 text-ink"
                      }`}
                    >
                      {pick(folder.name, lang)} ({folder.files.length})
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const name = newFolder.trim();
                    if (!name) return;
                    const id = onAddFolder(open.id, name);
                    setNewFolder("");
                    if (id) setFolderId(id);
                  }}
                  className="mt-3.5 flex flex-wrap gap-2"
                >
                  <input
                    type="text"
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    placeholder={t("Navn på ny mappe", "New folder name")}
                    aria-label={t("Navn på ny mappe", "New folder name")}
                    className="min-w-0 flex-[1_1_200px] rounded-full border border-ink/18 bg-mute px-4.5 py-3 text-sm text-ink outline-none transition-colors focus:border-grass focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer rounded-full border border-ink bg-transparent px-5 py-3 font-heading text-[13px] font-extrabold text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                  >
                    {t("Opprett mappe", "Create folder")}
                  </button>
                </form>

                <div className="mt-4.5 flex flex-wrap items-center gap-2.5">
                  <span className="font-heading text-base font-extrabold">
                    {activeFolder ? pick(activeFolder.name, lang) : ""}
                  </span>
                  <span className="text-[13px] text-ink/55">
                    {activeFolder
                      ? `${activeFolder.files.length} ${t(
                          activeFolder.files.length === 1 ? "fil" : "filer",
                          activeFolder.files.length === 1 ? "file" : "files",
                        )}`
                      : ""}
                  </span>
                  <span className="flex-1" />
                  <label className="cursor-pointer rounded-full border border-ink/18 bg-mute px-4.5 py-2.5 font-heading text-[13px] font-extrabold transition-colors duration-300 hover:bg-grass-tint">
                    {t("Last opp hit", "Upload here")}
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (activeFolder) onAttachToFolder(open.id, activeFolder.id, e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>

                <div className="kz-scroll mt-3.5 grid max-h-[380px] grid-cols-[minmax(0,1fr)] gap-2.5 overflow-y-auto overflow-x-hidden">
                  {(activeFolder ? activeFolder.files : []).map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3.5 rounded-[22px] border border-ink/10 bg-mute px-4 py-3.5"
                    >
                      <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[14px] bg-grass/30 text-base">
                        {fileIcon(file.kind)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-semibold">
                          {pick(file.name, lang)}
                        </span>
                        <span className="mt-0.5 block text-[13px] text-ink/55">
                          {pick(file.meta, lang)}
                        </span>
                      </span>

                      {folders.length > 1 && (
                        <select
                          defaultValue=""
                          aria-label={t("Flytt til…", "Move to…")}
                          onChange={(e) => {
                            const to = e.target.value;
                            e.target.value = "";
                            if (to && activeFolder) {
                              onMoveFile(open.id, activeFolder.id, to, file.id);
                            }
                          }}
                          className="max-w-[170px] shrink-0 cursor-pointer rounded-full border border-ink/16 bg-white px-3 py-2 font-body text-[13px] text-ink"
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
                        onClick={() => activeFolder && onRemoveFile(open.id, activeFolder.id, file.id)}
                        aria-label={t("Fjern", "Remove")}
                        className="grid h-[34px] w-[34px] shrink-0 cursor-pointer place-items-center rounded-full border border-ink/14 bg-white text-sm text-ink transition-colors duration-300 hover:bg-grass-tint"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {activeFolder && activeFolder.files.length === 0 && (
                    <div className="p-4 text-sm text-ink/60">
                      {t("Denne mappen er tom.", "This folder is empty.")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
