import { useEffect, useState } from "react";
import KretzMark from "./KretzMark";
import { useLang } from "../lib/langContext";

const SAVED_EMAIL_KEY = "kretz.login.email";

// Demo credentials, carried over from the design canvas.
const DEMO_EMAILS = ["test@kretz.no", "test@kredz.no"];
const DEMO_PASSWORD = "000000";

function readSavedEmail() {
  try {
    return window.localStorage.getItem(SAVED_EMAIL_KEY) || "";
  } catch {
    // Storage unavailable — no remembered account, which is fine.
    return "";
  }
}

export default function LoginModal({ isOpen, onClose, onMemberSignIn }) {
  const { t } = useLang();
  const [savedEmail] = useState(readSavedEmail);
  const [role, setRole] = useState("member");
  const [email, setEmail] = useState(savedEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(true);

  // Close on Escape, like any modal should.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isAdmin = role === "admin";

  const handleSubmit = (e) => {
    e.preventDefault();
    const mail = email.trim().toLowerCase();
    const ok = DEMO_EMAILS.includes(mail) && password === DEMO_PASSWORD;

    if (!ok) {
      setError(t("Feil e-post eller passord.", "Wrong email or password."));
      return;
    }

    try {
      if (remember) window.localStorage.setItem(SAVED_EMAIL_KEY, mail);
      else window.localStorage.removeItem(SAVED_EMAIL_KEY);
    } catch {
      // Not being able to remember the address is not worth failing over.
    }

    if (isAdmin) {
      setError(t("Administratorportalen kommer snart.", "Administrator portal is coming soon."));
      return;
    }

    onMemberSignIn();
  };

  const inputClass = `w-full box-border rounded-full px-5 py-3.5 font-body text-[15px] outline-none transition-colors duration-[450ms] focus:border-grass ${
    isAdmin
      ? "border border-paper/25 bg-paper/8 text-paper placeholder:text-paper/50"
      : "border border-ink/18 bg-mute text-ink placeholder:text-ink/45"
  }`;

  const roleButton = (selected, variant) => {
    const base =
      "cursor-pointer rounded-[22px] p-4 text-left font-body transition-all duration-[450ms]";
    if (variant === "member") {
      return selected
        ? `${base} -translate-y-0.5 border border-grass bg-grass-tint text-ink`
        : `${base} border border-paper/22 bg-paper/8 text-paper`;
    }
    return selected
      ? `${base} -translate-y-0.5 border border-grass-soft bg-grass-soft text-ink`
      : `${base} border border-ink-soft bg-ink-soft text-paper/90`;
  };

  return (
    <div
      className="fixed inset-0 z-70 grid place-items-center bg-ink/45 p-6 backdrop-blur-[6px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("Logg inn i Kretz", "Log in to Kretz")}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[420px] overflow-hidden rounded-panel p-7 shadow-[0_34px_90px_rgba(22,36,26,0.28)] transition-colors duration-[450ms] ${
          isAdmin ? "border border-paper/16 bg-ink" : "border border-ink/12 bg-white"
        }`}
      >
        <div aria-hidden="true" className="kz-dots-modal pointer-events-none absolute inset-0" />

        <button
          type="button"
          onClick={onClose}
          aria-label={t("Lukk", "Close")}
          className={`absolute right-5 top-5 z-[3] h-9 w-9 cursor-pointer rounded-full text-base transition-colors duration-300 ${
            isAdmin
              ? "border border-paper/25 bg-paper/8 text-paper hover:bg-paper/15"
              : "border border-ink/15 bg-white text-ink hover:bg-grass-tint"
          }`}
        >
          ×
        </button>

        <div className="relative">
          {/* The two tones cross-fade as the role switches, matching the panel. */}
          <div className="relative h-11 w-11">
            <KretzMark
              size={44}
              tone="dark"
              className={`absolute inset-0 transition-opacity duration-[350ms] ${
                isAdmin ? "opacity-0" : "opacity-100"
              }`}
            />
            <KretzMark
              size={44}
              tone="light"
              className={`absolute inset-0 transition-opacity duration-[350ms] ${
                isAdmin ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <h3
            className={`mb-3.5 ml-0 mr-9 mt-4 font-heading text-2xl font-extrabold tracking-[-0.025em] ${
              isAdmin ? "text-paper" : "text-ink"
            }`}
          >
            {t("Logg inn i Kretz", "Log in to Kretz")}
          </h3>

          <div className="mb-4 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setRole("member")}
              className={roleButton(!isAdmin, "member")}
            >
              <div className="font-heading text-[15px] font-extrabold">{t("Medlem", "Member")}</div>
              <div className="mt-1 text-xs opacity-70">
                {t("Foreldre og spillere", "Parents and players")}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={roleButton(isAdmin, "admin")}
            >
              <div className="font-heading text-[15px] font-extrabold">
                {t("Administrator", "Administrator")}
              </div>
              <div className="mt-1 text-xs opacity-70">
                {t("Styret og trenere", "Board and coaches")}
              </div>
            </button>
          </div>

          <p
            className={`mb-4.5 mt-0 text-[15px] leading-[1.6] ${
              isAdmin ? "text-paper/70" : "text-ink/70"
            }`}
          >
            {isAdmin
              ? t(
                  "Full tilgang til medlemmer, kontingent og rapporter.",
                  "Full access to members, fees and reports.",
                )
              : t(
                  "For foreldre og spillere: påmelding, kontingent og meldinger.",
                  "For parents and players: sign-ups, fees and messages.",
                )}
          </p>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              type="email"
              required
              name="email"
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder={t("E-post", "Email")}
              aria-label={t("E-post", "Email")}
              className={inputClass}
            />
            <input
              type="password"
              required
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder={t("Passord", "Password")}
              aria-label={t("Passord", "Password")}
              className={inputClass}
            />

            {savedEmail && (
              <button
                type="button"
                onClick={() => {
                  setEmail(savedEmail);
                  setPassword(DEMO_PASSWORD);
                  setError("");
                }}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-[22px] p-3 px-4 font-body transition-all duration-300 ${
                  isAdmin
                    ? "border border-paper/25 bg-paper/8 text-paper"
                    : "border border-ink/14 bg-mute text-ink"
                }`}
              >
                <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-grass/28 font-heading text-xs font-extrabold text-ink">
                  {savedEmail.slice(0, 1).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block font-heading text-sm font-extrabold">{savedEmail}</span>
                  <span className="block text-xs opacity-70">
                    {t(
                      "Lagret på denne enheten — trykk for å fylle ut",
                      "Saved on this device — tap to fill",
                    )}
                  </span>
                </span>
                <span className="shrink-0 text-base">→</span>
              </button>
            )}

            <label
              className={`flex cursor-pointer items-center gap-2.5 text-[13px] ${
                isAdmin ? "text-paper/70" : "text-ink/70"
              }`}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-grass"
              />
              <span>{t("Husk innloggingen min", "Remember my details")}</span>
            </label>

            <button
              type="submit"
              className="cursor-pointer rounded-full border-0 bg-grass px-6 py-3.5 font-heading text-[15px] font-extrabold text-ink shadow-[0_12px_30px_rgba(116,205,133,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss"
            >
              {t("Logg inn", "Log in")}
            </button>
          </form>

          <div className="mt-3 min-h-[18px] text-[13px] text-clay">{error}</div>

          <div
            className={`mt-1 flex flex-wrap gap-4 text-[13px] ${
              isAdmin ? "text-paper/70" : "text-ink/70"
            }`}
          >
            <span>{t("Glemt passord?", "Forgot your password?")}</span>
            <span>{t("Ny klubb? Book demo.", "New club? Book a demo.")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
