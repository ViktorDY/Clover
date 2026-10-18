import { useState } from "react";
import { useLang } from "../../lib/langContext";
import { Modal } from "./ui";

/*
  "Slette kontoen din?" — what deleting means, then type SLETT (DELETE) to
  confirm. A real account also asks for its password: the database function
  delete_own_account (supabase/schema.sql) checks it and deletes the account
  and its profile, after which the email address is free to sign up again.
*/
export default function DeleteAccountModal({ profile, onClose, onDeleted }) {
  const { t, isEn } = useLang();
  const [word, setWord] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const target = isEn ? "DELETE" : "SLETT";
  const ready = word.trim().toUpperCase() === target && (!profile.isReal || password.length > 0);

  const items = [
    t("Se aktivitetene dine, påmeldinger og ukeplanen", "See your activities, sign-ups and the week plan"),
    t("Lese eller sende meldinger og åpne filer fra klubbene dine", "Read or send messages and open files from your clubs"),
    t("Booke haller, eller se og betale fakturaene dine i Kretz", "Book halls, or see and pay your invoices through Kretz"),
    t("Beholde varselinnstillingene og profilopplysningene dine", "Keep your notification settings and saved profile details"),
    t("Angre — du må registrere deg på nytt og bli invitert tilbake av klubben", "Undo this — you would need to register again and be invited back by your club"),
  ];

  const confirm = async () => {
    if (!ready || busy) return;
    setBusy(true);
    setError("");
    const result = await profile.deleteAccount(password);
    setBusy(false);
    if (!result.ok) {
      setError(t(result.error.no, result.error.en));
      return;
    }
    onDeleted();
  };

  return (
    <Modal
      onClose={busy ? () => {} : onClose}
      role="alertdialog"
      label={t("Slette kontoen din?", "Delete your account?")}
      z="z-[110]"
      scrim="bg-ink/62 backdrop-blur-[10px]"
      closeOnScrim={!busy}
      className="max-w-[520px]"
    >
      <div className="box-border max-h-[90vh] overflow-y-auto rounded-[32px] border border-ink/12 bg-white px-6 pb-6.5 pt-[30px] shadow-[0_40px_100px_rgba(22,36,26,0.4)] sm:px-[30px]">
        <span aria-hidden="true" className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[rgba(201,42,20,0.12)] text-[#c92a14]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
        </span>
        <h2 className="mb-1.5 mt-4 font-heading text-[26px] font-extrabold tracking-[-0.02em]">{t("Slette kontoen din?", "Delete your account?")}</h2>
        <p className="m-0 text-[15px] leading-[1.55] text-ink/74">
          {t(
            "Les dette først. Å slette kontoen er permanent, og etterpå kan du ikke lenger:",
            "Please read this first. Deleting your account is permanent, and afterwards you will not be able to:",
          )}
        </p>
        <ul className="m-0 mt-4 grid list-none gap-2.5 p-0">
          {items.map((text) => (
            <li key={text} className="flex items-start gap-3 text-[14.5px] leading-[1.45] text-ink">
              <span aria-hidden="true" className="mt-px grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-[rgba(201,42,20,0.12)] text-[13px] font-extrabold text-[#c92a14]">
                ×
              </span>
              {text}
            </li>
          ))}
        </ul>
        {profile.isReal && (
          <label className="mt-5 grid gap-2 text-[13.5px] font-semibold text-ink">
            {t("Skriv passordet ditt", "Enter your password")}
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="rounded-full border-[1.5px] border-[rgba(201,42,20,0.4)] bg-white px-4.5 py-[13px] font-body text-[15px] text-ink outline-none focus:border-[#c92a14] focus:shadow-[0_0_0_4px_rgba(201,42,20,0.14)]"
            />
          </label>
        )}
        <label className="mt-5 grid gap-2 text-[13.5px] font-semibold text-ink">
          {t("For å bekrefte, skriv SLETT under", "To confirm, type DELETE below")}
          <input
            type="text"
            autoComplete="off"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              setError("");
            }}
            placeholder={target}
            className="rounded-full border-[1.5px] border-[rgba(201,42,20,0.4)] bg-white px-4.5 py-[13px] font-body text-[15px] tracking-[0.06em] text-ink outline-none focus:border-[#c92a14] focus:shadow-[0_0_0_4px_rgba(201,42,20,0.14)]"
          />
        </label>
        {error && (
          <div role="alert" className="mt-3 text-[13.5px] font-semibold text-[#c92a14]">
            {error}
          </div>
        )}
        <div className="mt-[22px] flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="flex-[1_1_160px] cursor-pointer rounded-full border-0 bg-ink px-5.5 py-3.5 font-heading text-[15px] font-extrabold text-paper transition-colors duration-300 hover:bg-moss disabled:opacity-60"
          >
            {t("Behold kontoen min", "Keep my account")}
          </button>
          <button
            type="button"
            disabled={!ready || busy}
            onClick={confirm}
            className={`flex-[1_1_200px] rounded-full border-0 bg-[#c92a14] px-5.5 py-3.5 font-heading text-[15px] font-extrabold text-white transition-opacity duration-300 ${
              ready && !busy ? "cursor-pointer" : "cursor-not-allowed opacity-35"
            }`}
          >
            {busy ? t("Sletter …", "Deleting …") : t("Ja, slett kontoen min", "Yes, delete my account")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
