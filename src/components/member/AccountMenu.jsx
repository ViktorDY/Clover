import { useEffect, useRef, useState } from "react";
import { useLang } from "../../lib/langContext";
import { supabase } from "../../lib/supabase";
import DeleteAccountModal from "./DeleteAccountModal";

/*
  The initials badge in the dashboard header.

  Signed in with a real account, it opens a small menu showing which account
  is signed in and the way to delete it. With the demo login there is no
  account behind it, so it stays a plain badge.
*/
export default function AccountMenu({ initials, onDeleted }) {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (alive) setEmail(data.session?.user?.email || "");
    });
    return () => {
      alive = false;
    };
  }, []);

  // Close on a click elsewhere or Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const badgeClass =
    "grid h-[38px] w-[38px] place-items-center rounded-full bg-ink font-heading text-sm font-extrabold text-paper";

  if (!email) {
    return <span className={badgeClass}>{initials}</span>;
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("Kontoen min", "My account")}
        className={`${badgeClass} cursor-pointer border-0 transition-shadow duration-300 hover:shadow-[0_0_0_3px_rgba(116,205,133,0.55)]`}
      >
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] z-30 w-[260px] rounded-[22px] border border-ink/12 bg-white p-2 shadow-[0_24px_60px_rgba(22,36,26,0.18)]"
        >
          <div className="px-3.5 pb-2.5 pt-2">
            <div className="text-xs text-ink/55">{t("Logget inn som", "Signed in as")}</div>
            <div className="truncate font-heading text-sm font-extrabold text-ink">{email}</div>
          </div>
          <div className="mx-2 border-t border-ink/10" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              setConfirming(true);
            }}
            className="mt-1 w-full cursor-pointer rounded-[16px] bg-transparent px-3.5 py-2.5 text-left font-body text-sm text-clay transition-colors duration-200 hover:bg-clay/8"
          >
            {t("Slett konto …", "Delete account …")}
          </button>
        </div>
      )}

      {confirming && (
        <DeleteAccountModal
          email={email}
          onClose={() => setConfirming(false)}
          onDeleted={onDeleted}
        />
      )}
    </div>
  );
}
