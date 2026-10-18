import { useState } from "react";
import { useLang } from "../../lib/langContext";
import { MEMBER_CLUBS, notifCount } from "../../lib/memberData";
import { Avatar } from "./ui";
import { fieldLabelClass, inputClass } from "./styles";
import ProfilePanel from "./ProfilePanels";
import { readPhoto } from "./photo";

/*
  Min profil: photo, name and clubs; contact details (editable); a grid of
  settings boxes that open as panels; and the language switch and log-out.
*/

export default function ProfileView({ profile, onLogOut, onDeleted, initials }) {
  const { t, isEn, toggleLang } = useLang();
  const [editing, setEditing] = useState(false);
  const [draftEmail, setDraftEmail] = useState("");
  const [draftPhone, setDraftPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [panel, setPanel] = useState("");

  const photo = profile.local.photo || "";
  const onPhoto = (e) => {
    readPhoto(e.target.files && e.target.files[0], (url) => profile.save({ photo: url }));
    e.target.value = "";
  };

  const notifOn = notifCount(profile.local.notif);
  const share = t(
    "Hei! Jeg bruker Kretz til å holde styr på trening, kontingent og meldinger fra klubben – verdt en titt: https://kretz.no",
    "Hi! I use Kretz to keep track of training, fees and messages from the club — worth a look: https://kretz.no",
  );

  const boxes = [
    { id: "account", title: t("Profil og konto", "Profile and account"), sub: t("Navn, språk og e-post", "Name, language and email") },
    { id: "security", title: t("Sikkerhet", "Security"), sub: t("Passord og innlogging", "Password and sign-in") },
    { id: "groups", title: t("Gruppemedlemskap", "Group memberships"), sub: t("Lag og grupper du tilhører", "Teams and groups you belong to") },
    { id: "payment", title: t("Betaling", "Payment"), sub: t("Vipps, kort og fakturaer", "Vipps, card and invoices") },
    {
      id: "push",
      title: t("Push-varsler", "Push notifications"),
      sub: notifOn.on === 0 ? t("Alle av", "All off") : t(`${notifOn.on} av ${notifOn.total} på`, `${notifOn.on} of ${notifOn.total} on`),
    },
    { id: "calendar", title: t("Kalenderinnstillinger", "Calendar settings"), sub: t("Synkronisering og påminnelser", "Sync and reminders") },
    {
      id: "help",
      title: t("Hjelpesenter", "Help centre"),
      sub: t("Spørsmål? Skriv til oss", "Questions? Write to us"),
      href: `mailto:kontakt@kretz.no?subject=${encodeURIComponent(t("Hjelp med Kretz", "Help with Kretz"))}`,
    },
    {
      id: "recommend",
      title: t("Anbefal Kretz", "Recommend Kretz"),
      sub: t("Fortell en venn eller en annen klubb", "Tell a friend or another club"),
      href: `mailto:?subject=${encodeURIComponent(t("Ta en titt på Kretz", "Have a look at Kretz"))}&body=${encodeURIComponent(share)}`,
    },
    {
      id: "privacy",
      title: t("Personvern og vilkår", "Privacy and Terms"),
      sub: t("Slik behandler vi dataene dine", "How we handle your data"),
      href: "#/vilkar",
    },
  ];

  const saveContact = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const result = await profile.saveContact({ email: draftEmail, phone: draftPhone });
    setBusy(false);
    if (!result.ok) {
      setStatus({ error: true, text: result.error });
      return;
    }
    setEditing(false);
    setStatus({ text: result.info || { no: "Kontaktinformasjonen er lagret.", en: "Contact information saved." } });
  };

  const smallButton =
    "relative cursor-pointer rounded-full border border-ink/20 bg-white px-4 py-[9px] font-heading text-[13px] font-extrabold text-ink transition-colors duration-300 hover:bg-grass-tint";

  return (
    <div className="mt-5 grid max-w-[760px] gap-4.5">
      <div className="flex flex-wrap items-center gap-[22px] rounded-[30px] border border-ink/12 bg-white px-5 py-6 sm:px-6.5">
        <div className="relative flex-none">
          <Avatar size={112} fontSize={36} photo={photo} initials={initials} />
          <label
            title={t("Endre bilde", "Change photo")}
            className="absolute -bottom-0.5 -right-0.5 grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-full border-[3px] border-white bg-ink text-paper transition-colors duration-300 hover:bg-moss"
          >
            <CameraIcon />
            <input type="file" accept="image/*" onChange={onPhoto} aria-label={t("Endre bilde", "Change photo")} className="absolute h-px w-px overflow-hidden opacity-0" />
          </label>
        </div>
        <div className="min-w-[200px] flex-1">
          <div className="font-heading text-[clamp(24px,3.4vw,34px)] font-extrabold leading-[1.05] tracking-[-0.03em]">{profile.fullName}</div>
          <div className="mt-1.5 text-sm text-ink/62">
            {t("Medlem", "Member")} · {MEMBER_CLUBS.map((c) => c.name).join(" · ")}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <label className={smallButton}>
              {t("Endre bilde", "Change photo")}
              <input type="file" accept="image/*" onChange={onPhoto} aria-label={t("Endre bilde", "Change photo")} className="absolute h-px w-px overflow-hidden opacity-0" />
            </label>
            {photo && (
              <button
                type="button"
                onClick={() => profile.save({ photo: "" })}
                className="cursor-pointer rounded-full border border-ink/14 bg-transparent px-4 py-[9px] font-heading text-[13px] font-extrabold text-ink/70 hover:bg-ink/6"
              >
                {t("Fjern", "Remove")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-[30px] border border-ink/12 bg-white px-5 py-[22px] sm:px-6.5">
        <div className="flex items-center gap-3">
          <h2 className="m-0 flex-1 font-heading text-[19px] font-extrabold">{t("Kontaktinformasjon", "Contact information")}</h2>
          {!editing && (
            <button
              type="button"
              onClick={() => {
                setDraftEmail(profile.email);
                setDraftPhone(profile.phone);
                setStatus(null);
                setEditing(true);
              }}
              className="cursor-pointer rounded-full border border-ink/20 bg-white px-4 py-2 font-heading text-[13px] font-extrabold text-ink hover:bg-grass-tint"
            >
              {t("Endre", "Edit")}
            </button>
          )}
        </div>
        {editing ? (
          <form onSubmit={saveContact} className="mt-4 grid gap-3">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
              <label className={fieldLabelClass}>
                {t("E-post", "Email")}
                <input type="email" required value={draftEmail} onChange={(e) => setDraftEmail(e.target.value)} className={inputClass} />
              </label>
              <label className={fieldLabelClass}>
                {t("Telefonnummer", "Phone number")}
                <input type="tel" value={draftPhone} onChange={(e) => setDraftPhone(e.target.value)} className={inputClass} />
              </label>
            </div>
            {status && status.error && (
              <div role="alert" className="text-[13.5px] font-semibold text-[#c92a14]">
                {t(status.text.no, status.text.en)}
              </div>
            )}
            <div className="flex gap-2">
              <button type="submit" disabled={busy} className="cursor-pointer rounded-full border-0 bg-moss px-5.5 py-[11px] font-heading text-sm font-extrabold text-white hover:bg-ink disabled:opacity-60">
                {t("Lagre", "Save")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setStatus(null);
                }}
                className="cursor-pointer rounded-full border border-ink/20 bg-white px-4.5 py-[11px] font-heading text-sm font-extrabold text-ink"
              >
                {t("Avbryt", "Cancel")}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
            <div>
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink/55">{t("E-post", "Email")}</div>
              <div className="mt-1 break-all text-base">{profile.email}</div>
            </div>
            <div>
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink/55">{t("Telefonnummer", "Phone number")}</div>
              <div className="mt-1 text-base">{profile.phone || "—"}</div>
            </div>
          </div>
        )}
        {!editing && status && !status.error && (
          <div role="status" className="mt-3 text-[13.5px] font-semibold text-moss">
            {t(status.text.no, status.text.en)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
        {boxes.map((b) => (
          <a
            key={b.id}
            href={b.href || "#/medlem"}
            onClick={(e) => {
              if (b.href) return;
              e.preventDefault();
              setPanel(b.id);
            }}
            className={`flex cursor-pointer items-center gap-3.5 rounded-[22px] border px-4.5 py-4 text-ink no-underline transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-grass hover:text-ink ${
              panel === b.id ? "border-grass bg-grass-tint" : "border-ink/12 bg-white"
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-[15px] font-extrabold">{b.title}</span>
              <span className="mt-0.5 block text-[12.5px] text-ink/62">{b.sub}</span>
            </span>
            <span aria-hidden="true" className="text-lg text-ink/45">
              ›
            </span>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap gap-2.5 pt-1.5">
        <button
          type="button"
          onClick={toggleLang}
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-ink/22 bg-white px-5 py-3 font-heading text-sm font-extrabold text-ink transition-colors duration-300 hover:bg-grass-tint"
        >
          <GlobeIcon />
          {isEn ? "Norsk" : "English"}
        </button>
        <button
          type="button"
          onClick={onLogOut}
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-ink/22 bg-ink px-5 py-3 font-heading text-sm font-extrabold text-paper transition-colors duration-300 hover:bg-moss"
        >
          <LogoutIcon />
          {t("Logg ut", "Log out")}
        </button>
      </div>

      {panel && (
        <ProfilePanel
          id={panel}
          title={boxes.find((b) => b.id === panel).title}
          profile={profile}
          initials={initials}
          onClose={() => setPanel("")}
          onDeleted={onDeleted}
        />
      )}
    </div>
  );
}

function CameraIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5M21 12H9" />
    </svg>
  );
}
