import { useState } from "react";
import KretzMark from "../KretzMark";
import { useLang } from "../../lib/langContext";
import { rememberJoined } from "../../lib/memberJoin";

/*
  The first-run screen: a member who has not joined a club yet.

  Whether it shows is remembered in localStorage under `kretz.member.joined`,
  which the landing page's login clears when you sign in with the first-time
  password. The valid code is 000000, matching the canvas's prototype.
*/
const VALID_CODE = "000000";

export default function JoinClub({ firstName, onBack, onJoined }) {
  const { t } = useLang();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (code !== VALID_CODE) {
      setError(
        t("Koden er ikke gyldig. Sjekk den med klubben din.", "That code is not valid. Check it with your club."),
      );
      return;
    }
    setError("");
    setOk(true);
    rememberJoined();
    setTimeout(onJoined, 900);
  };

  const note = ok
    ? t("Velkommen inn — laster klubben din…", "Welcome in — loading your club…")
    : error;

  return (
    <div className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-paper px-5 py-16 font-body text-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="kz-drift absolute -right-[90px] -top-[90px] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.45),rgba(116,205,133,0)_70%)] blur-[22px]" />
        <div className="absolute -bottom-[90px] -left-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,201,74,0.34),rgba(255,201,74,0)_70%)] blur-[22px]" />
        <div className="kz-dots-plain absolute bottom-10 right-10 h-40 w-40 opacity-60" />
      </div>

      <div className="relative w-full max-w-[520px] rounded-panel border border-ink/12 bg-white p-8 shadow-[0_28px_70px_rgba(22,36,26,0.12)] sm:p-10">
        <button
          type="button"
          onClick={onBack}
          aria-label={t("Tilbake", "Back")}
          title={t("Tilbake", "Back")}
          className="absolute left-6 top-6 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-ink/20 bg-transparent text-[15px] text-ink transition-colors duration-300 hover:bg-ink/8"
        >
          ←
        </button>

        <div className="flex justify-center">
          <KretzMark size={40} />
        </div>

        <h2 className="mt-5 text-center font-heading text-[26px] font-extrabold tracking-[-0.025em]">
          {t("Hei", "Hi")}, {firstName}
        </h2>

        <p className="mx-auto mt-3 max-w-[34em] text-center text-[15px] leading-[1.65] text-ink/70">
          {t(
            "Skriv inn den sekssifrede koden fra klubben din for å bli med i fellesskapet på Kretz.",
            "Enter the six-digit code from your club to join their community on Kretz.",
          )}
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            required
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setError("");
            }}
            placeholder={t("Klubbkode", "Club code")}
            aria-label={t("Klubbkode", "Club code")}
            className="w-full rounded-full border border-ink/14 bg-mute px-6 py-4 text-center font-heading text-xl font-extrabold tracking-[0.3em] text-ink outline-none transition-colors focus:border-grass"
          />

          <div
            className={`min-h-[20px] text-center text-[13px] ${
              ok ? "text-moss-deep" : "text-[#b3401c]"
            }`}
          >
            {note}
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-full border-0 bg-grass px-6 py-4 font-heading text-base font-extrabold text-ink shadow-[0_16px_40px_rgba(116,205,133,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss"
          >
            {ok ? t("Du er med", "Joined") : t("Bli med i klubben", "Join the club")}
          </button>
        </form>

        <p className="mx-auto mb-0 mt-4 max-w-[34em] text-center text-[13px] leading-[1.5] text-ink/60">
          {t(
            "Koden får du av treneren eller styret i klubben. Du kan legge til flere klubber senere.",
            "You get the code from your coach or the club board. You can add more clubs later.",
          )}
        </p>
      </div>
    </div>
  );
}
