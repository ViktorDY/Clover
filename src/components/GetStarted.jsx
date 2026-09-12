import { useState } from "react";
import { useLang } from "../lib/langContext";

export default function GetStarted() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ club: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend in this repo yet — the design treats submit as a local
    // confirmation, so the button label is the only feedback.
    setSent(true);
  };

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSent(false);
  };

  const perks = [
    t("Gratis flytting fra gammelt system", "Free migration from your old system"),
    t("Onboarding inkludert", "Onboarding included"),
    t("Partnerprogram for sponsorer", "Partner programme for sponsors"),
  ];

  return (
    <section
      id="kom-i-gang"
      className="relative isolate overflow-hidden rounded-t-[34px] bg-[#e4f4e8] px-5 py-25 sm:px-7 md:rounded-t-bowl"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="kz-dots-cta absolute inset-0" />
        <div className="kz-orbit-fast absolute right-[-70px] top-[30px] h-[420px] w-[420px] rounded-full border-[1.5px] border-dashed border-moss/28" />
        <div className="kz-drift-slow absolute left-[26%] top-[-34%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(116,205,133,0.55),rgba(116,205,133,0)_70%)] blur-[34px]" />
      </div>

      <div className="mx-auto max-w-[940px]">
        <div data-reveal>
          <h2 className="m-0 font-heading text-[clamp(36px,5.2vw,66px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            {t("La oss se på klubben din sammen", "Let's look at your club together")}
          </h2>
          <p className="mb-0 mt-5 max-w-[33em] text-lg text-ink/75">
            {t(
              "Enten du vil ha en demo, har spørsmål, eller er klar til å starte — ta kontakt.",
              "Whether you want a demo, have questions, or are ready to start — get in touch.",
            )}
          </p>
        </div>

        <form
          data-reveal
          onSubmit={handleSubmit}
          className="mt-8 flex max-w-[680px] flex-wrap gap-3"
        >
          <input
            type="text"
            required
            value={form.club}
            onChange={update("club")}
            placeholder={t("Klubbnavn", "Club name")}
            aria-label={t("Klubbnavn", "Club name")}
            className="min-w-0 flex-[1_1_180px] rounded-full border border-ink/25 bg-ink/7 px-6 py-4 text-base text-ink outline-none transition-colors focus:border-grass focus:bg-ink/12"
          />
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder={t("E-post", "Work email")}
            aria-label={t("E-post", "Work email")}
            className="min-w-0 flex-[1_1_180px] rounded-full border border-ink/25 bg-ink/7 px-6 py-4 text-base text-ink outline-none transition-colors focus:border-grass focus:bg-ink/12"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full border-0 bg-grass px-8 py-4 font-heading text-base font-extrabold text-ink shadow-[0_16px_44px_rgba(116,205,133,0.32)] transition-all duration-300 hover:-translate-y-[3px] hover:bg-moss"
          >
            {sent
              ? t("Takk — vi tar kontakt", "Thanks — we'll be in touch")
              : t("Book demo", "Book a demo")}
          </button>
        </form>

        <div
          data-reveal
          className="mt-6.5 flex flex-wrap gap-6.5 text-sm text-ink/60"
        >
          {perks.map((perk) => (
            <span key={perk}>{perk}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
