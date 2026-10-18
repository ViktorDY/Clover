import { useEffect, useState } from "react";
import KretzMark from "./KretzMark";
import { useLang } from "../lib/langContext";
import { siteUrl, supabase } from "../lib/supabase";
import { DEFAULT_PHONE_COUNTRY, normalizePhone, PHONE_COUNTRIES, phoneCountry } from "../lib/phone";

/*
  Sign-up.

  Creates a real account in Supabase. The login itself (email + hashed
  password) lives in Supabase Auth; first name, last name and phone travel
  along as metadata and a database trigger copies them into the profiles
  table (supabase/schema.sql).

  Two endings:
  - Email confirmation on (Supabase's default): no session yet, so the panel
    asks the member to open the link in their inbox. That link brings them
    back to the site, signed in, and App sends them to the dashboard.
  - Email confirmation off: a session comes straight back, the panel shows
    "Konto opprettet" for a beat and then opens the dashboard.
*/
export default function SignupModal({ onClose, onOpenTerms, onSignedIn }) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneCountry: DEFAULT_PHONE_COUNTRY,
    phone: "",
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  // null while filling in, "signed-in" or "check-email" once the account exists.
  const [done, setDone] = useState(null);

  // The modal is mounted only while open, so each opening starts clean; a
  // sign-up that came back signed in moves on to the dashboard by itself.
  useEffect(() => {
    if (done !== "signed-in") return undefined;
    const timer = setTimeout(onSignedIn, 1200);
    return () => clearTimeout(timer);
  }, [done, onSignedIn]);

  const field = (key) => ({
    value: form[key],
    onChange: (event) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
      setError("");
    },
  });

  const inputClass =
    "min-w-0 box-border rounded-full border border-ink/14 bg-white px-5 py-3.5 font-body text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-ink/45 focus:border-grass";

  const describeError = (err) => {
    switch (err?.code) {
      case "user_already_exists":
      case "email_exists":
        return t(
          "Det finnes allerede en konto med denne e-posten. Prøv å logge inn.",
          "An account with this email already exists. Try logging in.",
        );
      case "weak_password":
        return t(
          "Passordet er for svakt. Velg et lengre eller mindre vanlig passord.",
          "That password is too weak. Pick a longer or less common one.",
        );
      case "email_address_invalid":
        return t("E-postadressen ser ikke gyldig ut.", "That email address doesn't look valid.");
      case "over_email_send_rate_limit":
      case "over_request_rate_limit":
        return t(
          "For mange forsøk akkurat nå. Vent litt og prøv igjen.",
          "Too many attempts right now. Wait a moment and try again.",
        );
      default: {
        if (/sending confirmation email/i.test(err?.message || "")) {
          return t(
            "Kontoen kunne ikke opprettes fordi bekreftelses-e-posten ikke ble sendt. Prøv igjen om litt.",
            "The account couldn't be created because the confirmation email failed to send. Try again shortly.",
          );
        }
        // Keep Supabase's own message visible so problems can be traced.
        const detail = err?.message ? ` (${err.message})` : "";
        return (
          t(
            "Noe gikk galt. Sjekk nettforbindelsen og prøv igjen.",
            "Something went wrong. Check your connection and try again.",
          ) + detail
        );
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (busy || done) return;
    // One string, no spaces, dialling code first: "+4741234567".
    const phone = normalizePhone(form.phone, form.phoneCountry);
    if (!phone) {
      const country = phoneCountry(form.phoneCountry);
      setError(
        t(
          `Mobilnummeret ser ikke riktig ut. Skriv 8 siffer, for eksempel ${country.example}.`,
          `That mobile number doesn't look right. Enter 8 digits, for example ${country.example}.`,
        ),
      );
      return;
    }
    if (password.length < 8) {
      setError(
        t("Passordet må være minst 8 tegn.", "The password must be at least 8 characters."),
      );
      return;
    }
    setError("");
    setBusy(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: siteUrl(),
        data: {
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          phone,
        },
      },
    });
    setBusy(false);

    if (signUpError) {
      console.error("Kretz sign-up failed:", signUpError);
      setError(describeError(signUpError));
      return;
    }
    // With confirmation on, Supabase answers an existing address with a user
    // that has no identities instead of an error, so the address can't be
    // probed. Telling our own visitor is still the kind thing to do.
    if (data.user && data.user.identities?.length === 0) {
      setError(describeError({ code: "user_already_exists" }));
      return;
    }
    setDone(data.session ? "signed-in" : "check-email");
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

        {done === "check-email" ? (
          <div className="grid gap-4">
            <p className="m-0 text-[15px] leading-[1.6] text-ink/75">
              {t(
                `Kontoen er opprettet. Vi har sendt en bekreftelseslenke til ${form.email.trim()}. Åpne den for å aktivere kontoen — da blir du logget inn automatisk.`,
                `Your account is created. We've sent a confirmation link to ${form.email.trim()}. Open it to activate the account and you'll be signed in automatically.`,
              )}
            </p>
            <p className="m-0 text-[12.5px] leading-[1.45] text-ink/62">
              {t(
                "Finner du den ikke? Sjekk søppelpost-mappen.",
                "Can't find it? Check your spam folder.",
              )}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full border-0 bg-grass px-6 py-3.5 font-heading text-base font-extrabold text-ink shadow-[0_16px_40px_rgba(116,205,133,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss"
            >
              {t("Den er grei", "Got it")}
            </button>
          </div>
        ) : (
        <form onSubmit={onSubmit} className="grid gap-2.5">
          <input
            type="email"
            required
            name="email"
            autoComplete="email"
            {...field("email")}
            placeholder={t("E-post", "Email")}
            className={`w-full ${inputClass}`}
          />

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              required
              name="given-name"
              autoComplete="given-name"
              {...field("firstName")}
              placeholder={t("Fornavn", "First name")}
              className={`flex-[1_1_140px] ${inputClass}`}
            />
            <input
              type="text"
              required
              name="family-name"
              autoComplete="family-name"
              {...field("lastName")}
              placeholder={t("Etternavn", "Last name")}
              className={`flex-[1_1_140px] ${inputClass}`}
            />
          </div>

          <div className="flex gap-2.5">
            {/* The dialling code. Only Norway for now; add more in lib/phone.js. */}
            <div className="relative shrink-0">
              <select
                name="tel-country-code"
                autoComplete="tel-country-code"
                aria-label={t("Landkode", "Country code")}
                {...field("phoneCountry")}
                className={`h-full cursor-pointer appearance-none pr-10 ${inputClass}`}
              >
                {PHONE_COUNTRIES.map((country) => (
                  <option key={country.iso} value={country.iso}>
                    {country.flag} {country.dial} {lang === "en" ? country.name.en : country.name.no}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-ink/60"
              >
                ▼
              </span>
            </div>
            <input
              type="tel"
              required
              inputMode="tel"
              name="tel-national"
              autoComplete="tel-national"
              {...field("phone")}
              placeholder={t("Mobilnummer", "Mobile number")}
              className={`min-w-0 flex-1 ${inputClass}`}
            />
          </div>

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
            disabled={busy}
            className="cursor-pointer rounded-full border-0 bg-grass px-6 py-3.5 font-heading text-base font-extrabold text-ink shadow-[0_16px_40px_rgba(116,205,133,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss disabled:cursor-wait disabled:opacity-70"
          >
            {done === "signed-in"
              ? t("Konto opprettet", "Account created")
              : busy
                ? t("Oppretter konto …", "Creating account …")
                : t("Registrere meg", "Sign me up")}
          </button>
        </form>
        )}

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
