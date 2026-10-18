import { useState } from "react";
import KretzMark from "../KretzMark";
import { useLang } from "../../lib/langContext";
import { rememberJoined } from "../../lib/memberJoin";

/*
  The first-run dialog: a member who has not joined a club yet sees the
  dashboard blurred behind a "Hei, Emma" card asking for the club code.

  Whether it shows is remembered in localStorage under `kretz.member.joined`
  (lib/memberJoin), which the landing page's login clears when you sign in
  with the first-time password. The valid code is 000000, matching the
  canvas's prototype.
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
      setError(t("Koden er ikke gyldig. Sjekk den med klubben din.", "That code is not valid. Check it with your club."));
      return;
    }
    setError("");
    setOk(true);
    rememberJoined();
    window.setTimeout(onJoined, 900);
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/50 p-3 backdrop-blur-[10px] sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="kz-join-title"
        className="relative isolate box-border w-full max-w-[560px] overflow-hidden rounded-[40px] border border-ink/12 bg-[linear-gradient(170deg,#ffffff,#f2f8ee_60%,#eef6e6)] px-6 py-[34px] text-center shadow-[0_40px_100px_rgba(22,36,26,0.32)] sm:px-9"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-[90px] -top-[90px] -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.45),rgba(116,205,133,0)_70%)] blur-[24px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-[90px] -left-20 -z-10 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,201,74,0.34),rgba(255,201,74,0)_70%)] blur-[22px]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-5 -z-10 -ml-40 h-80 w-80 rounded-full border-[1.5px] border-dashed border-moss/20" />

        <button
          type="button"
          onClick={onBack}
          aria-label={t("Tilbake", "Back")}
          title={t("Tilbake", "Back")}
          className="absolute left-[22px] top-[22px] z-[3] grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-full border border-ink/20 bg-white/90 text-[17px] text-ink transition-all duration-300 hover:-translate-x-[3px] hover:bg-grass-tint"
        >
          ←
        </button>

        <div className="flex justify-center">
          <KretzMark size={46} className="drop-shadow-[0_10px_24px_rgba(31,122,58,0.22)]" />
        </div>

        <h2 id="kz-join-title" className="mb-2.5 mt-4 font-heading text-[clamp(26px,3.4vw,36px)] font-extrabold leading-[1.06] tracking-[-0.03em]">
          {t("Hei", "Hi")}, {firstName}
        </h2>
        <p className="mx-auto mb-5 mt-0 max-w-[30em] text-base leading-[1.6] text-ink/72">
          {t(
            "Skriv inn den sekssifrede koden fra klubben din for å bli med i fellesskapet på Kretz.",
            "Enter the six-digit code from your club to join their community on Kretz.",
          )}
        </p>

        <form onSubmit={onSubmit} className="mx-auto grid max-w-[360px] gap-3">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            required
            value={code}
            onChange={(event) => {
              setCode(event.target.value.replace(/[^0-9]/g, ""));
              setError("");
            }}
            placeholder={t("Klubbkode", "Club code")}
            aria-label={t("Klubbkode", "Club code")}
            className="box-border w-full rounded-full border border-ink/20 bg-white/90 px-5.5 py-4 text-center font-heading text-xl font-extrabold tracking-[0.18em] text-ink outline-none transition-colors focus:border-grass focus:bg-white"
          />
          <div className={`min-h-[18px] text-[13px] ${ok ? "text-moss" : "text-clay"}`}>
            {ok ? t("Velkommen inn — laster klubben din…", "Welcome in — loading your club…") : error}
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-full border-0 bg-grass px-6.5 py-4 font-heading text-base font-extrabold text-ink shadow-[0_16px_40px_rgba(116,205,133,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss"
          >
            {ok ? t("Du er med", "Joined") : t("Bli med i klubben", "Join the club")}
          </button>
        </form>

        <p className="mx-auto mb-0 mt-4 text-[13px] leading-[1.55] text-ink/60">
          {t(
            "Koden får du av treneren eller styret i klubben. Du kan legge til flere klubber senere.",
            "You get the code from your coach or the club board. You can add more clubs later.",
          )}
        </p>
      </div>
    </div>
  );
}
