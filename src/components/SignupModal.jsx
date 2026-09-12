import { useEffect, useState } from "react";
import KretzMark from "./KretzMark";
import { useLang } from "../lib/langContext";

/*
  Sign-up.

  A prototype form, like the login modal: nothing is sent anywhere. The only
  real rule is the canvas's — a password under 8 characters is rejected — and
  on success the panel shows "Konto opprettet" for a beat before closing.
*/
export default function SignupModal({ onClose, onOpenTerms }) {
  const { t } = useLang();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // The modal is mounted only while open, so each opening starts clean; the
  // success state then closes itself.
  useEffect(() => {
    if (!done) return undefined;
    const timer = setTimeout(onClose, 1200);
    return () => clearTimeout(timer);
  }, [done, onClose]);

  const inputClass =
    "min-w-0 box-border rounded-full border border-ink/14 bg-white px-5 py-3.5 font-body text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-ink/45 focus:border-grass";

  const onSubmit = (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setError(
        t("Passordet må være minst 8 tegn.", "The password must be at least 8 characters."),
      );
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/42 p-6 backdrop-blur-[6px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="kz-noscroll relative isolate max-h-[92vh] w-full max-w-[620px] overflow-y-auto rounded-[40px] border border-ink/12 bg-[linear-gradient(170deg,#ffffff,#f2f8ee_60%,#eef6e6)] p-8 shadow-[0_34px_90px_rgba(22,36,26,0.28)] sm:p-10"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* The canvas's backdrop: two glows, a dashed ring and a dot field. */}
        <div aria-hidden="true" className="pointer-events-none">
          <div className="absolute -right-[90px] -top-[90px] -z-10 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.45),rgba(116,205,133,0)_70%)] blur-[10px]" />
          <div className="absolute -bottom-[100px] -left-20 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,201,74,0.34),rgba(255,201,74,0)_70%)] blur-[10px]" />
          <div className="absolute -left-[60px] top-[30px] -z-10 h-[300px] w-[300px] rounded-full border-[1.5px] border-dashed border-moss-deep/20" />
          <div className="kz-dots-plain absolute bottom-[30px] right-10 -z-10 h-40 w-40 opacity-70" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={t("Lukk", "Close")}
          className="absolute right-5 top-5 z-[3] h-9 w-9 cursor-pointer rounded-full border border-ink/14 bg-white/70 text-base text-ink transition-colors duration-300 hover:bg-white"
        >
          ×
        </button>

        <KretzMark size={34} className="drop-shadow-[0_10px_24px_rgba(31,122,58,0.22)]" />

        <h3 className="mb-3.5 ml-0 mr-9 mt-2.5 font-heading text-[clamp(22px,2.8vw,27px)] font-extrabold tracking-[-0.03em] text-ink">
          {t("Registrer deg i Kretz", "Create your Kretz account")}
        </h3>

        <form onSubmit={onSubmit} className="grid gap-2.5">
          <input
            type="email"
            required
            name="email"
            autoComplete="email"
            placeholder={t("E-post", "Email")}
            className={`w-full ${inputClass}`}
          />

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              required
              name="given-name"
              autoComplete="given-name"
              placeholder={t("Fornavn", "First name")}
              className={`flex-[1_1_140px] ${inputClass}`}
            />
            <input
              type="text"
              required
              name="family-name"
              autoComplete="family-name"
              placeholder={t("Etternavn", "Last name")}
              className={`flex-[1_1_140px] ${inputClass}`}
            />
          </div>

          <input
            type="tel"
            required
            name="tel"
            autoComplete="tel"
            placeholder={t("Mobilnummer", "Mobile number")}
            className={`w-full ${inputClass}`}
          />

          <input
            type="password"
            required
            minLength={8}
            name="new-password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            placeholder={t("Lag et passord", "Create a password")}
            className={`w-full ${inputClass}`}
          />

          <p className="m-0 text-[12.5px] leading-[1.45] text-ink/62">
            {t(
              "Minst 8 tegn. Unngå passord du har andre steder.",
              "At least 8 characters. Avoid a password you use elsewhere.",
            )}
          </p>

          <div className="text-[13px] text-[#b3401c]">{error}</div>

          <button
            type="submit"
            className="cursor-pointer rounded-full border-0 bg-grass px-6 py-3.5 font-heading text-base font-extrabold text-ink shadow-[0_16px_40px_rgba(116,205,133,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss"
          >
            {done ? t("Konto opprettet", "Account created") : t("Registrere meg", "Sign me up")}
          </button>
        </form>

        <p className="mb-0 mt-3.5 text-[12.5px] leading-[1.5] text-ink/62">
          {t("Ved registrering godtar du vår ", "By signing up you accept our ")}
          <button
            type="button"
            onClick={onOpenTerms}
            className="cursor-pointer bg-transparent p-0 font-body text-[12.5px] text-moss-deep underline"
          >
            {t("sluttbrukeravtale", "end-user agreement")}
          </button>
          .
        </p>
      </div>
    </div>
  );
}
