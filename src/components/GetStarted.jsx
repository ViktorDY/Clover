import { useState } from "react";
import { useLang } from "../lib/langContext";

// There is no form backend yet: like the design, a valid message opens the
// visitor's email app with everything filled in.
const CONTACT_EMAIL = "support@kretz.no";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldLabel =
  "grid gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-paper/82";
const fieldInput =
  "box-border w-full border border-paper/16 font-normal normal-case tracking-normal bg-paper/10 px-[18px] font-body text-[16px] text-paper outline-none transition-[box-shadow,border-color] duration-200 placeholder:text-paper/45 focus:border-[#8BCB8B] focus:shadow-[0_0_0_4px_rgba(139,203,139,0.3)]";

export default function GetStarted() {
  const { t } = useLang();
  const [form, setForm] = useState({ club: "", sport: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
    setDone(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = form.message.trim();
    const email = form.email.trim();
    if (!message) {
      setError(t("Skriv noen ord om hva det gjelder.", "Write a few words about what it's about."));
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError(
        t(
          "Skriv inn en gyldig e-postadresse, for eksempel navn@klubben.no.",
          "Enter a valid email address, for example name@club.com.",
        ),
      );
      return;
    }
    const body = `${message}\n\nKlubb: ${form.club.trim() || "—"}\nIdrett: ${form.sport.trim() || "—"}\nFra: ${email}`;
    setDone(true);
    setError("");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      "Henvendelse fra kretz.no",
    )}&body=${encodeURIComponent(body)}`;
  };

  const perks = [
    t("Gratis flytting fra gammelt system", "Free migration from your old system"),
    t("Onboarding inkludert", "Onboarding included"),
    t("Partnerprogram for sponsorer", "Partner programme for sponsors"),
  ];

  return (
    <section id="kom-i-gang" className="kz-pad kz-pad-m relative pt-[120px]">
      <div
        data-reveal
        className="relative isolate mx-auto max-w-[1200px] overflow-hidden rounded-[40px] bg-[#1d2a23] p-[clamp(32px,5.5vw,72px)] min-[1680px]:max-w-[1440px]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 1000"
          className="pointer-events-none absolute right-[-8%] top-[-42%] -z-10 aspect-square w-[min(70%,760px)]"
        >
          <circle cx="500" cy="500" r="498" fill="none" stroke="rgba(139,203,139,.28)" strokeWidth="2" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 1000"
          className="pointer-events-none absolute bottom-[-230px] left-[calc(44%-min(18%,210px))] -z-10 aspect-square w-[min(36%,420px)]"
        >
          <circle
            cx="500"
            cy="500"
            r="496"
            fill="none"
            stroke="#FFD23F"
            strokeWidth="5"
            strokeDasharray="1 14"
            strokeLinecap="round"
          />
        </svg>

        <div className="text-[13px] font-extrabold uppercase tracking-[0.24em] text-paper">
          {t("Kontakt oss", "Contact us")}
        </div>
        <h2 className="mb-0 mt-[26px] font-heading text-[clamp(34px,5.2vw,74px)] font-extrabold leading-none tracking-[-0.04em]! text-paper">
          {t("La oss se på", "Let's take a look at")}{" "}
          <span className="text-[#8BCB8B]">{t("klubben din sammen", "your club together")}</span>
        </h2>
        <p className="mb-0 mt-7 max-w-[30em] text-[clamp(17px,1.8vw,24px)] leading-[1.55] text-paper/82">
          {t(
            "Enten du vil ha en demo, har spørsmål eller er klar til å starte, ta kontakt.",
            "Whether you want a demo, have questions or are ready to get started – get in touch.",
          )}
        </p>
        <div className="mt-[26px] flex flex-wrap gap-x-7 gap-y-2.5">
          {perks.map((perk) => (
            <div key={perk} className="flex items-center gap-3 text-[16px] text-paper/86">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[rgba(139,203,139,0.2)] text-[13px] font-extrabold text-[#8BCB8B]">
                ✓
              </span>
              {perk}
            </div>
          ))}
        </div>

        <div className="mt-11 max-w-[880px] rounded-[36px] border border-paper/14 bg-paper/5 p-[clamp(24px,4vw,48px)]">
          <div className="mb-[22px] text-[12px] font-extrabold uppercase tracking-[0.24em] text-paper/70">
            {t("Send melding", "Send message")}
          </div>
          <form onSubmit={handleSubmit} noValidate className="grid content-start gap-[18px]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-[18px]">
              <label className={fieldLabel}>
                {t("Klubbnavn", "Club name")}
                <input
                  type="text"
                  value={form.club}
                  onChange={update("club")}
                  placeholder="Vika IL"
                  className={`${fieldInput} rounded-full py-[15px] leading-[normal]`}
                />
              </label>
              <label className={fieldLabel}>
                {t("Idrett", "Sport")}
                <input
                  type="text"
                  value={form.sport}
                  onChange={update("sport")}
                  placeholder={t("Håndball", "Handball")}
                  className={`${fieldInput} rounded-full py-[15px] leading-[normal]`}
                />
              </label>
              <label className={fieldLabel}>
                {t("E-post", "Email")}
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder={t("navn@klubben.no", "name@club.com")}
                  autoComplete="email"
                  className={`${fieldInput} rounded-full py-[15px] leading-[normal]`}
                />
              </label>
            </div>
            <label className={fieldLabel}>
              {t("Fortell kort hva det gjelder", "Briefly tell us what it's about")}
              <textarea
                rows={3}
                value={form.message}
                onChange={update("message")}
                placeholder={t(
                  "Vi er en fotballklubb med rundt 300 medlemmer og vil gjerne se en demo.",
                  "We're a football club with around 300 members and would like to see a demo.",
                )}
                className={`${fieldInput} resize-none rounded-[20px] py-4 leading-[1.5]`}
              />
            </label>
            {error && (
              <div role="alert" className="text-[14px] text-[#ffb4a3]">
                {error}
              </div>
            )}
            {done && (
              <div role="status" className="text-[14px] font-semibold text-[#8BCB8B]">
                {t(
                  "E-postprogrammet ditt åpnes med meldingen klar til sending.",
                  "Your email app opens with the message ready to send.",
                )}
              </div>
            )}
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-3 justify-self-start rounded-full border-0 bg-[#8BCB8B] px-9 py-5 font-heading text-[18px] font-extrabold text-ink transition-[background,translate] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-0.5 hover:bg-grass-soft"
            >
              {t("Send melding", "Send message")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
