import { useEffect, useState } from "react";
import { useLang } from "../../lib/langContext";
import { forgetJoined } from "../../lib/memberJoin";
import { supabase } from "../../lib/supabase";

const SAVED_EMAIL_KEY = "kretz.login.email";

/*
  "Are you sure?" for deleting an account.

  The member types their password; the database function delete_own_account
  (supabase/schema.sql) checks it and deletes the account and its profile.
  After that the email address is free to sign up with again.
*/
export default function DeleteAccountModal({ email, onClose, onDeleted }) {
  const { t } = useLang();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (busy || !password) return;
    setBusy(true);
    setError("");

    const { error: rpcError } = await supabase.rpc("delete_own_account", {
      current_password: password,
    });

    if (rpcError) {
      setBusy(false);
      if (rpcError.message?.includes("wrong_password")) {
        setError(t("Feil passord.", "Wrong password."));
      } else if (rpcError.code === "PGRST202") {
        // The function isn't in the database yet: schema.sql hasn't been re-run.
        setError(
          t(
            "Sletting er ikke satt opp i databasen ennå.",
            "Deleting isn't set up in the database yet.",
          ),
        );
      } else {
        setError(
          t(
            "Kunne ikke slette kontoen akkurat nå. Prøv igjen om litt.",
            "Couldn't delete the account right now. Try again in a moment.",
          ),
        );
      }
      return;
    }

    // The account is gone; clear what this browser remembered about it.
    await supabase.auth.signOut({ scope: "local" });
    forgetJoined();
    try {
      if (window.localStorage.getItem(SAVED_EMAIL_KEY) === email) {
        window.localStorage.removeItem(SAVED_EMAIL_KEY);
      }
    } catch {
      // Nothing worth failing over.
    }
    onDeleted();
  };

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/45 p-6 backdrop-blur-[6px]"
      onClick={busy ? undefined : onClose}
      role="presentation"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-account-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-[440px] rounded-panel border border-ink/12 bg-white p-7 text-left shadow-[0_34px_90px_rgba(22,36,26,0.28)]"
      >
        <div className="grid h-11 w-11 place-items-center rounded-full bg-clay/10 font-heading text-xl font-extrabold text-clay">
          !
        </div>

        <h3
          id="delete-account-title"
          className="mb-2.5 mt-4 font-heading text-2xl font-extrabold tracking-[-0.025em] text-ink"
        >
          {t("Slette kontoen din?", "Delete your account?")}
        </h3>

        <p className="m-0 text-[15px] leading-[1.6] text-ink/70">
          {t(
            "Kontoen og alt vi har lagret om deg — navn, e-post og mobilnummer — blir slettet for godt. Dette kan ikke angres.",
            "Your account and everything we've stored about you — name, email and mobile number — will be deleted for good. This can't be undone.",
          )}
        </p>
        <p className="mb-0 mt-2 truncate text-sm font-semibold text-ink">{email}</p>

        <form onSubmit={onSubmit} className="mt-5 grid gap-3">
          <label className="grid gap-1.5 text-[13px] text-ink/70">
            {t("Skriv passordet ditt for å bekrefte", "Enter your password to confirm")}
            <input
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              className="w-full box-border rounded-full border border-ink/18 bg-mute px-5 py-3.5 font-body text-[15px] text-ink outline-none transition-colors duration-300 focus:border-clay"
            />
          </label>

          <div className="min-h-[18px] text-[13px] text-clay">{error}</div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="flex-1 cursor-pointer rounded-full border border-ink/18 bg-white px-6 py-3.5 font-heading text-[15px] font-extrabold text-ink transition-colors duration-300 hover:bg-grass-tint disabled:opacity-60"
            >
              {t("Avbryt", "Cancel")}
            </button>
            <button
              type="submit"
              disabled={busy || !password}
              className="flex-1 cursor-pointer rounded-full border-0 bg-clay px-6 py-3.5 font-heading text-[15px] font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {busy ? t("Sletter …", "Deleting …") : t("Slett kontoen", "Delete account")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
